namespace RIAPP.MOD.collection {
    import constsMOD = RIAPP.consts;
    import utilsMOD = RIAPP.MOD.utils;
    import errorsMOD = RIAPP.MOD.errors;
            
    //local variables for optimization
    var ValidationError = errorsMOD.ValidationError,
        valueUtils = utilsMOD.valueUtils, baseUtils = RIAPP.baseUtils, utils: utilsMOD.Utils;
    RIAPP.global.addOnInitialize((s, args) => {
        utils = s.utils;
    });

    collection._isCollection = (obj) => { return (obj instanceof BaseCollection); };
    collection._getItemByProp = (obj: any, prop: string) => {
        if (obj instanceof BaseDictionary) {
            return (<BaseDictionary<IListItem, any>>obj).getItemByKey(prop);
        }
        else if (obj instanceof BaseCollection) {
            (<BaseCollection<ICollectionItem>>obj).getItemByPos(parseInt(prop, 10));
        }
        else
            return null;
    };

    export const enum STATUS { NONE = 0, ADDED = 1, UPDATED = 2, DELETED = 3 }
    export const enum COLL_CHANGE_TYPE { REMOVE = 0, ADDED = 1, RESET = 2, REMAP_KEY = 3 }
    export const enum SORT_ORDER { ASC = 0, DESC = 1 }
    export const enum FILTER_TYPE { Equals = 0, Between = 1, StartsWith = 2, EndsWith = 3, Contains = 4, Gt = 5, Lt = 6, GtEq = 7, LtEq = 8, NotEq = 9 }

    export interface IPermissions { canAddRow: boolean; canEditRow: boolean; canDeleteRow: boolean; canRefreshRow: boolean; }
    export function fn_getPropertyByName(name: string, props: IFieldInfo[]): IFieldInfo {
        var arrProps = props.filter((f) => { return f.fieldName == name; });
        if (!arrProps || arrProps.length != 1)
            throw new Error(utils.format(RIAPP.ERRS.ERR_ASSERTION_FAILED, "arrProps.length == 1"));
        return arrProps[0];
    }

    export function fn_traverseField(fld: IFieldInfo, fn: (name: string, fld: IFieldInfo) => void) {
        function _fn_traverseField(name: string, fld: IFieldInfo, fn: (name: string, fld: IFieldInfo) => void) {
            if (fld.fieldType == constsMOD.FIELD_TYPE.Object) {
                fn(name, fld);
                //for object fields traverse their nested properties
                if (!!fld.nested && fld.nested.length > 0) {
                    var prop: IFieldInfo, i: number, len = fld.nested.length;
                    for (i = 0; i < len; i += 1) {
                        prop = fld.nested[i];
                        if (prop.fieldType == constsMOD.FIELD_TYPE.Object) {
                            _fn_traverseField(name + '.' + prop.fieldName, prop, fn);
                        }
                        else {
                            fn(name + '.' + prop.fieldName, prop);
                        }
                    }
                }
            }
            else {
                fn(name, fld);
            }
        }
        _fn_traverseField(fld.fieldName, fld, fn);
    }

    export interface ICollectionItem extends RIAPP.IBaseObject {
        _aspect: ItemAspect<ICollectionItem>;
        _key: string;
    }

    var ITEM_EVENTS = {
        errors_changed: 'errors_changed'
    };
    var PROP_NAME = {
        isEditing: 'isEditing',
        currentItem: 'currentItem',
        count: 'count',
        totalCount: 'totalCount',
        pageCount: 'pageCount',
        pageSize: 'pageSize',
        pageIndex: 'pageIndex',
        isUpdating: 'isUpdating',
        isLoading: 'isLoading'
    };

    export class ItemAspect<TItem extends ICollectionItem> extends RIAPP.BaseObject implements IErrorNotification, RIAPP.IEditable, RIAPP.ISubmittable {
        private __key: string;
        private __isEditing: boolean;
        private _collection: BaseCollection<TItem>;
        protected _status: STATUS;
        protected _saveVals: IIndexer<any>;
        protected _vals: IIndexer<any>;
        protected _notEdited: boolean;
        protected get _isEditing(): boolean {
            return this.__isEditing;
        }
        protected set _isEditing(v: boolean) {
            if (this.__isEditing != v) {
                this.__isEditing = v;
                this.raisePropertyChanged(PROP_NAME.isEditing);
            }
        }
        constructor(collection: BaseCollection<TItem>) {
            super();
            this.__key = null;
            this.__isEditing = false;
            this._collection = collection;
            this._status = STATUS.NONE;
            this._saveVals = null;
            this._vals = {};
            this._notEdited = true;
        }
        protected _getEventNames() {
            var base_events = super._getEventNames();
            return [ITEM_EVENTS.errors_changed].concat(base_events);
        }
        protected _onErrorsChanged(args: any) {
            this.raiseEvent(ITEM_EVENTS.errors_changed, args);
        }
        handleError(error: any, source: any): boolean {
            var isHandled = super.handleError(error, source);
            if (!isHandled) {
                return this.collection.handleError(error, source);
            }
            return isHandled;
        }
        protected _beginEdit(): boolean {
            var coll = this.collection, isHandled: boolean;
            if (coll.isEditing) {
                var eitem = coll._getInternal().getEditingItem();
                if (eitem._aspect === this)
                    return false;
                try {
                    eitem._aspect.endEdit();
                    if (eitem._aspect.getIsHasErrors()) {
                        this.handleError(new ValidationError(eitem._aspect.getAllErrors(), eitem), eitem);
                        eitem._aspect.cancelEdit();
                    }
                } catch (ex) {
                    isHandled = this.handleError(ex, eitem);
                    eitem._aspect.cancelEdit();
                    RIAPP.reThrow(ex, isHandled);
                }
            }
            if (!this.key) //detached item
                return false;
            this._isEditing = true;
            this._saveVals = utils.cloneObj(this._vals);
            this.collection.currentItem = this.getItem();
            return true;
        }
        protected _endEdit(): boolean {
            if (!this.__isEditing)
                return false;
            var coll = this.collection, self = this;
            if (this.getIsHasErrors()) {
                return false;
            }
            //revalidate all
            coll._getInternal().removeAllErrors(this.getItem());
            var validation_errors = this._validateAll();
            if (validation_errors.length > 0) {
                coll._getInternal().addErrors(self.getItem(), validation_errors);
            }
            if (this.getIsHasErrors()) {
                return false;
            }
            this._isEditing = false;
            this._saveVals = null;
            return true;
        }
        protected _cancelEdit(): boolean {
            if (!this._isEditing)
                return false;
            var coll = this.collection, isNew = this.isNew, self = this;
            var changes = this._saveVals;
            this._vals = this._saveVals;
            this._saveVals = null;
            coll._getInternal().removeAllErrors(this.getItem());
            //refresh User interface when values restored
            coll.getFieldNames().forEach(function (name) {
                if (changes[name] !== self._vals[name])
                    self.raisePropertyChanged(name);
            });
            this._isEditing = false;
            if (isNew && this._notEdited)
                coll.removeItem(this.getItem());
            return true;
        }
        protected _validate(): RIAPP.IValidationInfo {
            return this.collection._getInternal().validateItem(this.getItem());
        }
        protected _skipValidate(fieldInfo: IFieldInfo, val: any) {
            return false;
        }
        protected _validateField(fieldName: string): RIAPP.IValidationInfo {
            var val: any, fieldInfo = this.getFieldInfo(fieldName), res: RIAPP.IValidationInfo = null;
            try {
                val = baseUtils.getValue(this._vals, fieldName);
                if (this._skipValidate(fieldInfo, val))
                    return res;
                if (this.isNew) {
                    if (val === null && !fieldInfo.isNullable && !fieldInfo.isReadOnly && !fieldInfo.isAutoGenerated)
                        throw new Error(RIAPP.ERRS.ERR_FIELD_ISNOT_NULLABLE);
                }
                else {
                    if (val === null && !fieldInfo.isNullable && !fieldInfo.isReadOnly)
                        throw new Error(RIAPP.ERRS.ERR_FIELD_ISNOT_NULLABLE);
                }
            } catch (ex) {
                res = { fieldName: fieldName, errors: [ex.message] };
            }
            var tmp = this.collection._getInternal().validateItemField(this.getItem(), fieldName);
            if (!!res && !!tmp) {
                res.errors = res.errors.concat(tmp.errors);
            }
            else if (!!tmp)
                res = tmp;
            return res;
        }
        protected _validateAll(): RIAPP.IValidationInfo[] {
            var self = this, fieldInfos = this.collection.getFieldInfos(), errs: RIAPP.IValidationInfo[] = [];
            fieldInfos.forEach(function (fld) {
                fn_traverseField(fld, (name, fld) => {
                    if (fld.fieldType != constsMOD.FIELD_TYPE.Object) {
                        var res = self._validateField(name);
                        if (!!res) {
                            errs.push(res);
                        }
                    }
                });
            });

            var res = self._validate();
            if (!!res) {
                errs.push(res);
            }
            return errs;
        }
        protected _checkVal(fieldInfo: IFieldInfo, val: any): any {
            var res = val, ERRS = RIAPP.ERRS;
            if (this._skipValidate(fieldInfo, val))
                return res;
            if (fieldInfo.isReadOnly && !(fieldInfo.allowClientDefault && this.isNew))
                throw new Error(ERRS.ERR_FIELD_READONLY);
            if ((val === null || (utils.check.isString(val) && !val)) && !fieldInfo.isNullable)
                throw new Error(ERRS.ERR_FIELD_ISNOT_NULLABLE);

            if (val === null)
                return val;

            switch (fieldInfo.dataType) {
                case constsMOD.DATA_TYPE.None:
                    break;
                case constsMOD.DATA_TYPE.Guid:
                case constsMOD.DATA_TYPE.String:
                    if (!utils.check.isString(val)) {
                        throw new Error(utils.format(ERRS.ERR_FIELD_WRONG_TYPE, val, 'String'));
                    }
                    if (fieldInfo.maxLength > 0 && val.length > fieldInfo.maxLength)
                        throw new Error(utils.format(ERRS.ERR_FIELD_MAXLEN, fieldInfo.maxLength));
                    if (fieldInfo.isNullable && val === '')
                        res = null;
                    if (!!fieldInfo.regex) {
                        var reg = new RegExp(fieldInfo.regex, "i");
                        if (!reg.test(val)) {
                            throw new Error(utils.format(ERRS.ERR_FIELD_REGEX, val));
                        }
                    }
                    break;
                case constsMOD.DATA_TYPE.Binary:
                    if (!utils.check.isArray(val)) {
                        throw new Error(utils.format(ERRS.ERR_FIELD_WRONG_TYPE, val, 'Array'));
                    }
                    if (fieldInfo.maxLength > 0 && val.length > fieldInfo.maxLength)
                        throw new Error(utils.format(ERRS.ERR_FIELD_MAXLEN, fieldInfo.maxLength));
                    break;
                case constsMOD.DATA_TYPE.Bool:
                    if (!utils.check.isBoolean(val))
                        throw new Error(utils.format(ERRS.ERR_FIELD_WRONG_TYPE, val, 'Boolean'));
                    break;
                case constsMOD.DATA_TYPE.Integer:
                case constsMOD.DATA_TYPE.Decimal:
                case constsMOD.DATA_TYPE.Float:
                    if (!utils.check.isNumber(val))
                        throw new Error(utils.format(ERRS.ERR_FIELD_WRONG_TYPE, val, 'Number'));
                    if (!!fieldInfo.range) {
                        utils.validation.checkNumRange(Number(val), fieldInfo.range);
                    }
                    break;
                case constsMOD.DATA_TYPE.DateTime:
                case constsMOD.DATA_TYPE.Date:
                    if (!utils.check.isDate(val))
                        throw new Error(utils.format(ERRS.ERR_FIELD_WRONG_TYPE, val, 'Date'));
                    if (!!fieldInfo.range) {
                        utils.validation.checkDateRange(val, fieldInfo.range);
                    }
                    break;
                case constsMOD.DATA_TYPE.Time:
                    if (!utils.check.isDate(val))
                        throw new Error(utils.format(ERRS.ERR_FIELD_WRONG_TYPE, val, 'Time'));
                    break;
                default:
                    throw new Error(utils.format(ERRS.ERR_PARAM_INVALID, 'dataType', fieldInfo.dataType));
            }
            return res;
        }
        protected _resetIsNew() {
            //can reset isNew on all items in the collection
            //the list descendant does it
        }
        _onAttaching(): void {
        }
        _onAttach(): void {
        }
        raiseErrorsChanged(args: any) {
            this._onErrorsChanged(args);
        }
        getFieldInfo(fieldName: string) {
            return this.collection.getFieldInfo(fieldName);
        }
        getFieldNames() {
            return this.collection.getFieldNames();
        }
        getErrorString(): string {
            var itemErrors = this.collection._getInternal().getErrors(this.getItem());
            if (!itemErrors)
                return '';
            var res: string[] = [];
            utils.forEachProp(itemErrors, function (name) {
                res.push(baseUtils.format('{0}: {1}', name, itemErrors[name]));
            });
            return res.join('|');
        }
        submitChanges(): IVoidPromise {
            var deffered = utils.createDeferred();
            deffered.reject();
            return deffered.promise();
        }
        rejectChanges(): void {
        }
        beginEdit(): boolean {
            var coll = this.collection;
            if (!this._beginEdit())
                return false;
            coll._getInternal().onEditing(this.getItem(), true, false);
            return true;
        }
        endEdit(): boolean {
            var coll = this.collection;
            if (!this._endEdit())
                return false;
            coll._getInternal().onEditing(this.getItem(), false, false);
            this._notEdited = false;
            return true;
        }
        cancelEdit(): boolean {
            var coll = this.collection;
            if (!this._cancelEdit())
                return false;
            coll._getInternal().onEditing(this.getItem(), false, true);
            return true;
        }
        deleteItem(): boolean {
            var coll = this.collection;
            if (!this.key)
                return false;
            var args: ICancellableArgs<TItem> = { item: this.getItem(), isCancel: false };
            coll._getInternal().onItemDeleting(args);
            if (args.isCancel) {
                return false;
            }
            coll.removeItem(this.getItem());
            return true;
        }
        getIsHasErrors() {
            var itemErrors = this.collection._getInternal().getErrors(this.getItem());
            return !!itemErrors;
        }
        addOnErrorsChanged(fn: TEventHandler<ItemAspect<TItem>, any>, nmspace?: string, context?: any) {
            this._addHandler(ITEM_EVENTS.errors_changed, fn, nmspace, context);
        }
        removeOnErrorsChanged(nmspace?: string) {
            this._removeHandler(ITEM_EVENTS.errors_changed, nmspace);
        }
        getFieldErrors(fieldName: string): RIAPP.IValidationInfo[] {
            var itemErrors = this.collection._getInternal().getErrors(this.getItem());
            if (!itemErrors)
                return [];
            var name = fieldName;
            if (!fieldName)
                fieldName = '*';
            if (!itemErrors[fieldName])
                return [];
            if (fieldName == '*')
                name = null;
            return [
                { fieldName: name, errors: itemErrors[fieldName] }
            ];
        }
        getAllErrors(): RIAPP.IValidationInfo[] {
            var itemErrors = this.collection._getInternal().getErrors(this.getItem());
            if (!itemErrors)
                return [];
            var res: RIAPP.IValidationInfo[] = [];
            utils.forEachProp(itemErrors, function (name) {
                var fieldName: string = null;
                if (name !== '*') {
                    fieldName = name;
                }
                res.push({ fieldName: fieldName, errors: itemErrors[name] });
            });
            return res;
        }
        getIErrorNotification(): IErrorNotification {
            return this;
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            var coll = this._collection;
            var item = this.getItem();
            if (!!coll && !coll.getIsClearing() && !!item && !!item._key) {
                coll.removeItem(item);
            }
            if (!!item && !item.getIsDestroyCalled()) {
                item.destroy();
            }
            this.__key = null;
            this._saveVals = null;
            this._vals = {};
            this._isEditing = false;
            this._collection = null;
            super.destroy();
        }
        toString() {
            return 'ItemAspect';
        }
        getItem(): TItem {
            throw new Error('Not implemented');
        }
        get isCanSubmit(): boolean { return false; }
        get status(): STATUS { return this._status; }
        get isNew(): boolean {
            return false;
        }
        get isDeleted(): boolean { return false; }
        get key(): string { return this.__key; }
        set key(v: string) {
            if (v !== null)
                v = '' + v;
            this.__key = v;
        }
        get collection(): BaseCollection<TItem> { return this._collection; }
        get isUpdating(): boolean {
            var coll = this.collection;
            if (!coll)
                return false;
            return coll.isUpdating;
        }
        get isEditing(): boolean { return this.__isEditing; }
        get isHasChanges(): boolean { return this._status !== STATUS.NONE; }
    }

    export interface ICollectionOptions {
        enablePaging: boolean; pageSize: number;
    }
    export interface IErrors {
        [fieldName: string]: string[];
    }
    export interface IErrorsList {
        [item_key: string]: IErrors;
    }
    export interface ICollChangedArgs<TItem extends ICollectionItem> { changeType: COLL_CHANGE_TYPE; items: TItem[]; pos?: number[]; old_key?: string; new_key?: string; }
    export interface ICollFillArgs<TItem extends ICollectionItem> { isBegin: boolean; rowCount: number; time: Date; isPageChanged: boolean; resetUI?: boolean; fetchedItems?: TItem[]; newItems?: TItem[]; }
    export interface ICollValidateArgs<TItem extends ICollectionItem> { item: TItem; fieldName: string; errors: string[]; }
    export interface ICollItemStatusArgs<TItem extends ICollectionItem> { item: TItem; oldStatus: STATUS; key: string; }
    export interface ICollItemAddedArgs<TItem extends ICollectionItem> { item: TItem; isAddNewHandled: boolean; }
    export interface ICommitChangesArgs<TItem extends ICollectionItem> { item: TItem; isBegin: boolean; isRejected: boolean; status: STATUS; }
    export interface ICollItemArgs<TItem extends ICollectionItem> { item: TItem; }
    export interface IPageChangingArgs { page: number; isCancel: boolean; }
    export interface ICancellableArgs<TItem extends ICollectionItem> { item: TItem; isCancel: boolean; }
    export interface IItemAddedArgs<TItem extends ICollectionItem> { item: TItem; isAddNewHandled: boolean; }
    export interface ICollEndEditArgs<TItem extends ICollectionItem> { item: TItem; isCanceled: boolean; }
    export interface ICurrentChangingArgs<TItem extends ICollectionItem> { newCurrent: TItem; }

    var COLL_EVENTS = {
        begin_edit: 'begin_edit',
        end_edit: 'end_edit',
        fill: 'fill',
        collection_changed: 'coll_changed',
        item_deleting: 'item_deleting',
        item_adding: 'item_adding',
        item_added: 'item_added',
        validate: 'validate',
        current_changing: 'current_changing',
        page_changing: 'page_changing',
        errors_changed: 'errors_changed',
        status_changed: 'status_changed',
        clearing: 'clearing',
        cleared: 'cleared',
        commit_changes: 'commit_changes'
    };

    export interface IInternalCollMethods<TItem extends ICollectionItem> {
        getEditingItem(): TItem;
        getStrValue(val: any, fieldInfo: IFieldInfo): string;
        onEditing(item: TItem, isBegin: boolean, isCanceled: boolean): void;
        onCommitChanges(item: TItem, isBegin: boolean, isRejected: boolean, status: STATUS): void;
        validateItem(item: TItem): RIAPP.IValidationInfo;
        validateItemField(item: TItem, fieldName: string): RIAPP.IValidationInfo;
        addErrors(item: TItem, errors: RIAPP.IValidationInfo[]): void;
        addError(item: TItem, fieldName: string, errors: string[]): void;
        removeError(item: TItem, fieldName: string): void;
        removeAllErrors(item: TItem): void;
        getErrors(item: TItem): IErrors;
        onErrorsChanged(item: TItem): void;
        onItemDeleting(args: ICancellableArgs<TItem>): boolean;
    }

    export class BaseCollection<TItem extends ICollectionItem> extends RIAPP.BaseObject {
        protected _options: ICollectionOptions;
        protected _isLoading: boolean;
        protected _EditingItem: TItem;
        protected _perms: IPermissions;
        protected _totalCount: number;
        protected _pageIndex: number;
        protected _items: TItem[];
        protected _itemsByKey: IIndexer<TItem>;
        protected _currentPos: number;
        protected _newKey: number;
        protected _fieldMap: IIndexer<IFieldInfo>;
        protected _fieldInfos: IFieldInfo[];
        protected _errors: IErrorsList;
        protected _ignoreChangeErrors: boolean;
        protected _pkInfo: IFieldInfo[];
        protected _isUpdating: boolean;
        protected _isClearing: boolean;
        protected _waitQueue: utilsMOD.WaitQueue;
        protected _internal: IInternalCollMethods<TItem>;
        constructor() {
            super();
            var self = this;
            this._options = { enablePaging: false, pageSize: 50 };
            this._isLoading = false;
            this._isClearing = false;
            this._isUpdating = false;

            this._EditingItem = null;
            this._perms = { canAddRow: true, canEditRow: true, canDeleteRow: true, canRefreshRow: false };
            //includes stored on server
            this._totalCount = 0;
            this._pageIndex = 0;
            this._items = [];
            this._itemsByKey = {};
            this._currentPos = -1;
            this._newKey = 0;
            this._fieldMap = {};
            this._fieldInfos = [];
            this._errors = {};
            this._ignoreChangeErrors = false;
            this._pkInfo = null;
            this._waitQueue = new utilsMOD.WaitQueue(this);
            this._internal = {
                getEditingItem: () => {
                    return self._getEditingItem();
                },
                getStrValue: (val: any, fieldInfo: IFieldInfo) => {
                    return self._getStrValue(val, fieldInfo);
                },
                onEditing: (item: TItem, isBegin: boolean, isCanceled: boolean) => {
                    self._onEditing(item, isBegin, isCanceled);
                },
                onCommitChanges: (item: TItem, isBegin: boolean, isRejected: boolean, status: STATUS) => {
                    self._onCommitChanges(item, isBegin, isRejected, status);
                },
                validateItem: (item: TItem) => {
                    return self._validateItem(item);
                },
                validateItemField: (item: TItem, fieldName: string) => {
                    return self._validateItemField(item, fieldName);
                },
                addErrors: (item: TItem, errors: RIAPP.IValidationInfo[]) => {
                    self._addErrors(item, errors);
                },
                addError: (item: TItem, fieldName: string, errors: string[]) => {
                    self._addError(item, fieldName, errors);
                },
                removeError: (item: TItem, fieldName: string) => {
                    self._removeError(item, fieldName);
                },
                removeAllErrors: (item: TItem) => {
                    self._removeAllErrors(item);
                },
                getErrors: (item: TItem) => {
                    return self._getErrors(item);
                },
                onErrorsChanged: (item: TItem) => {
                    self._onErrorsChanged(item);
                },
                onItemDeleting: (args: ICancellableArgs<TItem>) => {
                    return self._onItemDeleting(args);
                }
            };
        }

        static getEmptyFieldInfo(fieldName: string) {
            var fieldInfo: IFieldInfo = {
                fieldName: fieldName,
                isPrimaryKey: 0,
                dataType: constsMOD.DATA_TYPE.None,
                isNullable: true,
                maxLength: -1,
                isReadOnly: false,
                isAutoGenerated: false,
                allowClientDefault: false,
                dateConversion: constsMOD.DATE_CONVERSION.None,
                fieldType: constsMOD.FIELD_TYPE.ClientOnly,
                isNeedOriginal: false,
                range: null,
                regex: null,
                nested: null,
                dependentOn: null,
                fullName: null
            };
            return fieldInfo;
        }
        protected _getEventNames() {
            var base_events = super._getEventNames();
            var events = Object.keys(COLL_EVENTS).map((key, i, arr) => { return <string>(<any>COLL_EVENTS)[key]; });
            return events.concat(base_events);
        }
        handleError(error: any, source: any): boolean {
            var isHandled = super.handleError(error, source);
            if (!isHandled) {
                return global.handleError(error, source);
            }
            return isHandled;
        }
        addOnClearing(fn: TEventHandler<BaseCollection<TItem>, any>, nmspace?: string, context?: BaseObject, prepend?: boolean) {
            this._addHandler(COLL_EVENTS.clearing, fn, nmspace, context, prepend);
        }
        removeOnClearing(nmspace?: string) {
            this._removeHandler(COLL_EVENTS.clearing, nmspace);
        }
        addOnCleared(fn: TEventHandler<BaseCollection<TItem>, any>, nmspace?: string, context?: BaseObject, prepend?: boolean) {
            this._addHandler(COLL_EVENTS.cleared, fn, nmspace, context, prepend);
        }
        removeOnCleared(nmspace?: string) {
            this._removeHandler(COLL_EVENTS.cleared, nmspace);
        }
        addOnFill(fn: TEventHandler<BaseCollection<TItem>, ICollFillArgs<TItem>>, nmspace?: string, context?: BaseObject, prepend?: boolean) {
            this._addHandler(COLL_EVENTS.fill, fn, nmspace, context, prepend);
        }
        removeOnFill(nmspace?: string) {
            this._removeHandler(COLL_EVENTS.fill, nmspace);
        }
        addOnCollChanged(fn: TEventHandler<BaseCollection<TItem>, ICollChangedArgs<TItem>>, nmspace?: string, context?: BaseObject, prepend?: boolean) {
            this._addHandler(COLL_EVENTS.collection_changed, fn, nmspace, context, prepend);
        }
        removeOnCollChanged(nmspace?: string) {
            this._removeHandler(COLL_EVENTS.collection_changed, nmspace);
        }
        addOnValidate(fn: TEventHandler<BaseCollection<TItem>, ICollValidateArgs<TItem>>, nmspace?: string, context?: BaseObject, prepend?: boolean) {
            this._addHandler(COLL_EVENTS.validate, fn, nmspace, context, prepend);
        }
        removeOnValidate(nmspace?: string) {
            this._removeHandler(COLL_EVENTS.validate, nmspace);
        }
        addOnItemDeleting(fn: TEventHandler<BaseCollection<TItem>, ICancellableArgs<TItem>>, nmspace?: string, context?: BaseObject, prepend?: boolean) {
            this._addHandler(COLL_EVENTS.item_deleting, fn, nmspace, context, prepend);
        }
        removeOnItemDeleting(nmspace?: string) {
            this._removeHandler(COLL_EVENTS.item_deleting, nmspace);
        }
        addOnItemAdding(fn: TEventHandler<BaseCollection<TItem>, ICancellableArgs<TItem>>, nmspace?: string, context?: BaseObject, prepend?: boolean) {
            this._addHandler(COLL_EVENTS.item_adding, fn, nmspace, context, prepend);
        }
        removeOnItemAdding(nmspace?: string) {
            this._removeHandler(COLL_EVENTS.item_adding, nmspace);
        }
        addOnItemAdded(fn: TEventHandler<BaseCollection<TItem>, IItemAddedArgs<TItem>>, nmspace?: string, context?: BaseObject, prepend?: boolean) {
            this._addHandler(COLL_EVENTS.item_added, fn, nmspace, context, prepend);
        }
        removeOnItemAdded(nmspace?: string) {
            this._removeHandler(COLL_EVENTS.item_added, nmspace);
        }
        addOnCurrentChanging(fn: TEventHandler<BaseCollection<TItem>, ICurrentChangingArgs<TItem>>, nmspace?: string, context?: BaseObject, prepend?: boolean) {
            this._addHandler(COLL_EVENTS.current_changing, fn, nmspace, context, prepend);
        }
        removeOnCurrentChanging(nmspace?: string) {
            this._removeHandler(COLL_EVENTS.current_changing, nmspace);
        }
        addOnPageChanging(fn: TEventHandler<BaseCollection<TItem>, IPageChangingArgs>, nmspace?: string, context?: BaseObject, prepend?: boolean) {
            this._addHandler(COLL_EVENTS.page_changing, fn, nmspace, context, prepend);
        }
        removeOnPageChanging(nmspace?: string) {
            this._removeHandler(COLL_EVENTS.page_changing, nmspace);
        }
        addOnErrorsChanged(fn: TEventHandler<BaseCollection<TItem>, ICollItemArgs<TItem>>, nmspace?: string, context?: BaseObject, prepend?: boolean) {
            this._addHandler(COLL_EVENTS.errors_changed, fn, nmspace, context, prepend);
        }
        removeOnErrorsChanged(nmspace?: string) {
            this._removeHandler(COLL_EVENTS.errors_changed, nmspace);
        }
        addOnBeginEdit(fn: TEventHandler<BaseCollection<TItem>, ICollItemArgs<TItem>>, nmspace?: string, context?: BaseObject, prepend?: boolean) {
            this._addHandler(COLL_EVENTS.begin_edit, fn, nmspace, context, prepend);
        }
        removeOnBeginEdit(nmspace?: string) {
            this._removeHandler(COLL_EVENTS.begin_edit, nmspace);
        }
        addOnEndEdit(fn: TEventHandler<BaseCollection<TItem>, ICollEndEditArgs<TItem>>, nmspace?: string, context?: BaseObject, prepend?: boolean) {
            this._addHandler(COLL_EVENTS.end_edit, fn, nmspace, context, prepend);
        }
        removeOnEndEdit(nmspace?: string) {
            this._removeHandler(COLL_EVENTS.end_edit, nmspace);
        }
        addOnCommitChanges(fn: TEventHandler<BaseCollection<TItem>, ICommitChangesArgs<TItem>>, nmspace?: string, context?: BaseObject, prepend?: boolean) {
            this._addHandler(COLL_EVENTS.commit_changes, fn, nmspace, context, prepend);
        }
        removeOnCommitChanges(nmspace?: string) {
            this._removeHandler(COLL_EVENTS.commit_changes, nmspace);
        }
        addOnStatusChanged(fn: TEventHandler<BaseCollection<TItem>, ICollItemStatusArgs<TItem>>, nmspace?: string, context?: BaseObject, prepend?: boolean) {
            this._addHandler(COLL_EVENTS.status_changed, fn, nmspace, context, prepend);
        }
        removeOnStatusChanged(nmspace?: string) {
            this._removeHandler(COLL_EVENTS.status_changed, nmspace);
        }
        addOnPageIndexChanged(handler: TPropChangedHandler, nmspace?: string, context?: BaseObject): void {
            this.addOnPropertyChange(PROP_NAME.pageIndex, handler, nmspace, context);
        }
        addOnPageSizeChanged(handler: TPropChangedHandler, nmspace?: string, context?: BaseObject): void {
            this.addOnPropertyChange(PROP_NAME.pageSize, handler, nmspace, context);
        }
        addOnTotalCountChanged(handler: TPropChangedHandler, nmspace?: string, context?: BaseObject): void {
            this.addOnPropertyChange(PROP_NAME.totalCount, handler, nmspace, context);
        }
        addOnCurrentChanged(handler: TPropChangedHandler, nmspace?: string, context?: BaseObject): void {
            this.addOnPropertyChange(PROP_NAME.currentItem, handler, nmspace, context);
        }
        protected _getPKFieldInfos(): IFieldInfo[] {
            if (!!this._pkInfo)
                return this._pkInfo;
            var fldMap = this._fieldMap, pk: IFieldInfo[] = [];
            utils.forEachProp(fldMap, function (fldName) {
                if (fldMap[fldName].isPrimaryKey > 0) {
                    pk.push(fldMap[fldName]);
                }
            });
            pk.sort(function (a, b) {
                return a.isPrimaryKey - b.isPrimaryKey;
            });
            this._pkInfo = pk;
            return this._pkInfo;
        }
        protected _onCurrentChanging(newCurrent: TItem) {
            try {
                this.endEdit();
            } catch (ex) {
                RIAPP.reThrow(ex, this.handleError(ex, this));
            }
            this.raiseEvent(COLL_EVENTS.current_changing, <ICurrentChangingArgs<TItem>>{ newCurrent: newCurrent });
        }
        protected _onCurrentChanged() {
            this.raisePropertyChanged(PROP_NAME.currentItem);
        }
        protected _onCountChanged() {
            this.raisePropertyChanged(PROP_NAME.count);
        }
        protected _onEditingChanged() {
            this.raisePropertyChanged(PROP_NAME.isEditing);
        }
        //occurs when item status Changed (not used in simple collections)
        protected _onItemStatusChanged(item: TItem, oldStatus: STATUS) {
            this.raiseEvent(COLL_EVENTS.status_changed, <ICollItemStatusArgs<TItem>>{ item: item, oldStatus: oldStatus, key: item._key });
        }
        protected _onFillStart(args: ICollFillArgs<TItem>) {
            this.raiseEvent(COLL_EVENTS.fill, args);
        }
        protected _onFillEnd(args: ICollFillArgs<TItem>) {
            this.raiseEvent(COLL_EVENTS.fill, args);
        }
        protected _onCollectionChanged(args: ICollChangedArgs<TItem>) {
            this.raiseEvent(COLL_EVENTS.collection_changed, args);
        }
        //new item is being added, but is not in the collection now
        protected _onItemAdding(item: TItem) {
            var args: ICancellableArgs<TItem> = { item: item, isCancel: false };
            this.raiseEvent(COLL_EVENTS.item_adding, args);
            if (args.isCancel)
                RIAPP.throwDummy(new Error('operation canceled'));
        }
        //new item has been added and now is in editing state and is currentItem
        protected _onItemAdded(item: TItem) {
            var args: IItemAddedArgs<TItem> = { item: item, isAddNewHandled: false };
            this.raiseEvent(COLL_EVENTS.item_added, args);
        }
        protected _createNew(): TItem {
            throw new Error('_createNew Not implemented');
        }
        protected _attach(item: TItem, itemPos?: number) {
            if (!!this._itemsByKey[item._key]) {
                throw new Error(RIAPP.ERRS.ERR_ITEM_IS_ATTACHED);
            }
            try {
                this.endEdit();
            } catch (ex) {
                RIAPP.reThrow(ex, this.handleError(ex, this));
            }
            var pos: number;
            item._aspect._onAttaching();
            if (utils.check.isNt(itemPos)) {
                pos = this._items.length;
                this._items.push(item);
            }
            else {
                pos = itemPos;
                utils.insertIntoArray(this._items, item, pos);
            }
            this._itemsByKey[item._key] = item;
            this._onCollectionChanged({ changeType: COLL_CHANGE_TYPE.ADDED, items: [item], pos: [pos] });
            item._aspect._onAttach();
            this.raisePropertyChanged(PROP_NAME.count);
            this._onCurrentChanging(item);
            this._currentPos = pos;
            this._onCurrentChanged();
            return pos;
        }
        protected _onRemoved(item: TItem, pos: number) {
            try {
                this._onCollectionChanged({ changeType: COLL_CHANGE_TYPE.REMOVE, items: [item], pos: [pos] });
            }
            finally {
                this.raisePropertyChanged(PROP_NAME.count);
            }
        }
        protected _onPageSizeChanged() {
        }
        protected _onPageChanging() {
            var args: IPageChangingArgs = { page: this.pageIndex, isCancel: false };
            this._raiseEvent(COLL_EVENTS.page_changing, args);
            if (!args.isCancel) {
                try {
                    this.endEdit();
                } catch (ex) {
                    RIAPP.reThrow(ex, this.handleError(ex, this));
                }
            }
            return !args.isCancel;
        }
        protected _onPageChanged() {
        }
        protected _setCurrentItem(v: TItem) {
            var self = this, oldPos = self._currentPos;
            if (!v) {
                if (oldPos !== -1) {
                    self._onCurrentChanging(null);
                    self._currentPos = -1;
                    self._onCurrentChanged();
                }
                return;
            }
            if (!v._key)
                throw new Error(RIAPP.ERRS.ERR_ITEM_IS_DETACHED);
            var oldItem: TItem, pos: number, item = self.getItemByKey(v._key);
            if (!item) {
                throw new Error(RIAPP.ERRS.ERR_ITEM_IS_NOTFOUND);
            }
            oldItem = self.getItemByPos(oldPos);
            pos = self._items.indexOf(v);
            if (pos < 0)
                throw new Error(RIAPP.ERRS.ERR_ITEM_IS_NOTFOUND);
            if (oldPos !== pos || oldItem !== v) {
                self._onCurrentChanging(v);
                self._currentPos = pos;
                self._onCurrentChanged();
            }
        }
        protected _destroyItems() {
            this._items.forEach(function (item) {
                item._aspect.destroy();
            });
        }
        protected _isHasProp(prop: string) {
            //first check for indexed property name
            if (baseUtils.startsWith(prop, '[')) {
                var res = global.parser.resolveProp(this, prop);
                return !baseUtils.isUndefined(res);
            }
            return super._isHasProp(prop);
        }
        protected _getEditingItem() {
            return this._EditingItem;
        }
        protected _getStrValue(val: any, fieldInfo: IFieldInfo): string {
            var dcnv = fieldInfo.dateConversion, stz = utils.get_timeZoneOffset();
            return valueUtils.stringifyValue(val, dcnv, fieldInfo.dataType, stz);
        }
        protected _onEditing(item: TItem, isBegin: boolean, isCanceled: boolean): void {
            if (this._isUpdating)
                return;
            if (isBegin) {
                this._EditingItem = item;
                this.raiseEvent(COLL_EVENTS.begin_edit, <ICollItemArgs<TItem>>{ item: item });
                this._onEditingChanged();
            }
            else {
                this._EditingItem = null;
                this.raiseEvent(COLL_EVENTS.end_edit, { item: item, isCanceled: isCanceled });
                this._onEditingChanged();
            }
        }
        //used by descendants when commiting submits for items
        protected _onCommitChanges(item: TItem, isBegin: boolean, isRejected: boolean, status: STATUS): void {
            this.raiseEvent(COLL_EVENTS.commit_changes, <ICommitChangesArgs<TItem>>{ item: item, isBegin: isBegin, isRejected: isRejected, status: status });
        }
        protected _validateItem(item: TItem): RIAPP.IValidationInfo {
            var args: ICollValidateArgs<TItem> = { item: item, fieldName: null, errors: [] };
            this.raiseEvent(COLL_EVENTS.validate, args);
            if (!!args.errors && args.errors.length > 0)
                return { fieldName: null, errors: args.errors };
            else
                return null;
        }
        protected _validateItemField(item: TItem, fieldName: string): RIAPP.IValidationInfo {
            var args: ICollValidateArgs<TItem> = { item: item, fieldName: fieldName, errors: [] };
            this.raiseEvent(COLL_EVENTS.validate, args);
            if (!!args.errors && args.errors.length > 0)
                return { fieldName: fieldName, errors: args.errors };
            else
                return null;
        }
        protected _addErrors(item: TItem, errors: RIAPP.IValidationInfo[]): void {
            var self = this;
            this._ignoreChangeErrors = true;
            try {
                errors.forEach(function (err) {
                    self._addError(item, err.fieldName, err.errors);
                });
            } finally {
                this._ignoreChangeErrors = false;
            }
            this._onErrorsChanged(item);
        }
        protected _addError(item: TItem, fieldName: string, errors: string[]): void {
            if (!fieldName)
                fieldName = '*';
            if (!(utils.check.isArray(errors) && errors.length > 0)) {
                this._removeError(item, fieldName);
                return;
            }
            if (!this._errors[item._key])
                this._errors[item._key] = {};
            var itemErrors = this._errors[item._key];
            itemErrors[fieldName] = errors;
            if (!this._ignoreChangeErrors)
                this._onErrorsChanged(item);
        }
        protected _removeError(item: TItem, fieldName: string): void {
            var itemErrors = this._errors[item._key];
            if (!itemErrors)
                return;
            if (!fieldName)
                fieldName = '*';
            if (!itemErrors[fieldName])
                return;
            delete itemErrors[fieldName];
            if (utils.getProps(itemErrors).length === 0) {
                delete this._errors[item._key];
            }
            this._onErrorsChanged(item);
        }
        protected _removeAllErrors(item: TItem): void {
            var self = this, itemErrors = this._errors[item._key];
            if (!itemErrors)
                return;
            delete this._errors[item._key];
            self._onErrorsChanged(item);
        }
        protected _getErrors(item: TItem): IErrors {
            return this._errors[item._key];
        }
        protected _onErrorsChanged(item: TItem): void {
            var args: ICollItemArgs<TItem> = { item: item };
            this.raiseEvent(COLL_EVENTS.errors_changed, args);
            item._aspect.raiseErrorsChanged({});
        }
        protected _onItemDeleting(args: ICancellableArgs<TItem>): boolean {
            this.raiseEvent(COLL_EVENTS.item_deleting, args);
            return !args.isCancel;
        }
        _getInternal(): IInternalCollMethods<TItem> {
            return this._internal;
        }
        getFieldInfo(fieldName: string): IFieldInfo {
            var parts = fieldName.split('.'), fld = this._fieldMap[parts[0]];
            if (parts.length == 1) {
                return fld;
            }
            if (fld.fieldType == constsMOD.FIELD_TYPE.Object) {
                for (var i = 1; i < parts.length; i += 1) {
                    fld = fn_getPropertyByName(parts[i], fld.nested);
                }
                return fld;
            }
            throw new Error(baseUtils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'fieldName', fieldName));
        }
        getFieldNames(): string[] {
            return this.getFieldInfos().map((f) => {
                return f.fieldName;
            });
        }
        getIsClearing(): boolean {
            return this._isClearing;
        }
        getFieldInfos(): IFieldInfo[] {
            return this._fieldInfos;
        }
        cancelEdit() {
            if (this.isEditing)
                this._EditingItem._aspect.cancelEdit();
        }
        endEdit() {
            var EditingItem: TItem;
            if (this.isEditing) {
                EditingItem = this._EditingItem;
                if (!EditingItem._aspect.endEdit() && EditingItem._aspect.getIsHasErrors()) {
                    this.handleError(new ValidationError(EditingItem._aspect.getAllErrors(), EditingItem), EditingItem);
                    this.cancelEdit();
                }
            }
        }
        getItemsWithErrors(): TItem[] {
            var self = this, res: TItem[] = [];
            utils.forEachProp(this._errors, function (key) {
                var item = self.getItemByKey(key);
                res.push(item);
            });
            return res;
        }
        addNew() {
            var item: TItem, isHandled: boolean;
            item = this._createNew();
            this._onItemAdding(item);
            this._attach(item, null);
            try {
                this.currentItem = item;
                item._aspect.beginEdit();
                this._onItemAdded(item);
            }
            catch (ex) {
                isHandled = this.handleError(ex, this);
                item._aspect.cancelEdit();
                RIAPP.reThrow(ex, isHandled);
            }
            return item;
        }
        getItemByPos(pos: number): TItem {
            if (pos < 0 || pos >= this._items.length)
                return null;
            return this._items[pos];
        }
        getItemByKey(key: string): TItem {
            if (!key)
                throw new Error(RIAPP.ERRS.ERR_KEY_IS_EMPTY);
            return this._itemsByKey['' + key];
        }
        findByPK(...vals: any[]): TItem {
            if (arguments.length === 0)
                return null;
            var self = this, pkInfo = self._getPKFieldInfos(), arr: string[] = [], key: string, values: any[] = [];
            if (vals.length === 1 && utils.check.isArray(vals[0])) {
                values = vals[0];
            }
            else
                values = vals;
            if (values.length !== pkInfo.length) {
                return null;
            }
            for (var i = 0, len = pkInfo.length; i < len; i += 1) {
                arr.push(self._getStrValue(values[i], pkInfo[i]));
            }

            key = arr.join(';');
            return self.getItemByKey(key);
        }
        moveFirst(skipDeleted?: boolean): boolean {
            var pos = 0, old = this._currentPos;
            if (old === pos)
                return false;
            var item = this.getItemByPos(pos);
            if (!item)
                return false;
            if (!!skipDeleted) {
                if (item._aspect.isDeleted) {
                    return this.moveNext(true);
                }
            }
            this._onCurrentChanging(item);
            this._currentPos = pos;
            this._onCurrentChanged();
            return true;
        }
        movePrev(skipDeleted?: boolean): boolean {
            var pos = -1, old = this._currentPos;
            var item = this.getItemByPos(old);
            if (!!item) {
                pos = old;
                pos -= 1;
            }
            item = this.getItemByPos(pos);
            if (!item)
                return false;
            if (!!skipDeleted) {
                if (item._aspect.isDeleted) {
                    this._currentPos = pos;
                    return this.movePrev(true);
                }
            }
            this._onCurrentChanging(item);
            this._currentPos = pos;
            this._onCurrentChanged();
            return true;
        }
        moveNext(skipDeleted?: boolean): boolean {
            var pos = -1, old = this._currentPos;
            var item = this.getItemByPos(old);
            if (!!item) {
                pos = old;
                pos += 1;
            }
            item = this.getItemByPos(pos);
            if (!item)
                return false;
            if (!!skipDeleted) {
                if (item._aspect.isDeleted) {
                    this._currentPos = pos;
                    return this.moveNext(true);
                }
            }
            this._onCurrentChanging(item);
            this._currentPos = pos;
            this._onCurrentChanged();
            return true;
        }
        moveLast(skipDeleted?: boolean): boolean {
            var pos = this._items.length - 1, old = this._currentPos;
            if (old === pos)
                return false;
            var item = this.getItemByPos(pos);
            if (!item)
                return false;
            if (!!skipDeleted) {
                if (item._aspect.isDeleted) {
                    return this.movePrev(true);
                }
            }
            this._onCurrentChanging(item);
            this._currentPos = pos;
            this._onCurrentChanged();
            return true;
        }
        goTo(pos: number): boolean {
            var old = this._currentPos;
            if (old === pos)
                return false;
            var item = this.getItemByPos(pos);
            if (!item)
                return false;
            this._onCurrentChanging(item);
            this._currentPos = pos;
            this._onCurrentChanged();
            return true;
        }
        forEach(callback: (item: TItem) => void, thisObj?: any) {
            this._items.forEach(callback, thisObj);
        }
        removeItem(item: TItem) {
            if (!item._key) {
                throw new Error(RIAPP.ERRS.ERR_ITEM_IS_DETACHED);
            }
            if (!this._itemsByKey[item._key])
                return;
            var oldPos = utils.removeFromArray(this._items, item);
            if (oldPos < 0) {
                throw new Error(RIAPP.ERRS.ERR_ITEM_IS_NOTFOUND);
            }
            delete this._itemsByKey[item._key];
            delete this._errors[item._key];
            this._onRemoved(item, oldPos);
            item._key = null;
            item._aspect.removeNSHandlers(null);
            var test = this.getItemByPos(oldPos), curPos = this._currentPos;

            //if detached item was current item
            if (curPos === oldPos) {
                if (!test) { //it was the last item
                    this._currentPos = curPos - 1;
                }
                this._onCurrentChanged();
            }

            if (curPos > oldPos) {
                this._currentPos = curPos - 1;
                this._onCurrentChanged();
            }
        }
        getIsHasErrors(): boolean {
            if (!this._errors)
                return false;
            return (utils.getProps(this._errors).length > 0);
        }
        sort(fieldNames: string[], sortOrder: SORT_ORDER): IPromise<any> {
            return this.sortLocal(fieldNames, sortOrder);
        }
        sortLocal(fieldNames: string[], sortOrder: SORT_ORDER): IPromise<any> {
            var self = this;
            var mult = 1;
            if (sortOrder === SORT_ORDER.DESC)
                mult = -1;
            var fn_sort = function (a: any, b: any): number {
                var res = 0, i: number, len: number, af: any, bf: any, fieldName: string;
                for (i = 0, len = fieldNames.length; i < len; i += 1) {
                    fieldName = fieldNames[i];
                    af = a[fieldName];
                    bf = b[fieldName];
                    if (af < bf)
                        res = -1 * mult;
                    else if (af > bf)
                        res = mult;
                    else
                        res = 0;

                    if (res !== 0)
                        return res;
                }
                return res;
            };
            return self.sortLocalByFunc(fn_sort);
        }
        sortLocalByFunc(fn: (a: any, b: any) => number): IPromise<any> {
            var self = this, deffered = utils.createDeferred();
            this.waitForNotLoading(function () {
                var cur = self.currentItem;
                self.isLoading = true;
                try {
                    self._items.sort(fn);
                    self._onCollectionChanged({ changeType: COLL_CHANGE_TYPE.RESET, items: [], pos: [] });
                } finally {
                    self.isLoading = false;
                    deffered.resolve();
                }
                self.currentItem = null;
                self.currentItem = cur;
            }, [], false, null);

            return deffered.promise();
        }
        clear() {
            this._isClearing = true;
            try {
                this.raiseEvent(COLL_EVENTS.clearing, {});
                this.cancelEdit();
                this._EditingItem = null;
                this._newKey = 0;
                this.currentItem = null;
                this._destroyItems();
                this._items = [];
                this._itemsByKey = {};
                this._errors = {};
                this._onCollectionChanged({ changeType: COLL_CHANGE_TYPE.RESET, items: [], pos: [] });
            }
            finally {
                this._isClearing = false;
            }
            this.raiseEvent(COLL_EVENTS.cleared, {});
            this.raisePropertyChanged(PROP_NAME.count);
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            this._waitQueue.destroy();
            this._waitQueue = null;
            this.clear();
            this._fieldMap = {};
            this._fieldInfos = [];
            super.destroy();
        }
        waitForNotLoading(callback: (...args: any[]) => any, callbackArgs: any[], syncCheck: boolean, groupName: string) {
            this._waitQueue.enQueue({
                prop: PROP_NAME.isLoading,
                groupName: null,
                predicate: function (val: any) {
                    return !val;
                },
                action: callback,
                actionArgs: callbackArgs,
                lastWins: !!groupName,
                syncCheck: !!syncCheck
            });
        }
        toString() {
            return 'Collection';
        }
        get options() { return this._options; }
        get currentItem() { return this.getItemByPos(this._currentPos); }
        set currentItem(v: TItem) { this._setCurrentItem(v); }
        get count() { return this._items.length; }
        get totalCount() { return this._totalCount; }
        set totalCount(v: number) {
            if (v != this._totalCount) {
                this._totalCount = v;
                this.raisePropertyChanged(PROP_NAME.totalCount);
                this.raisePropertyChanged(PROP_NAME.pageCount);
            }
        }
        get pageSize() { return this._options.pageSize; }
        set pageSize(v: number) {
            if (this._options.pageSize !== v) {
                this._options.pageSize = v;
                this.raisePropertyChanged(PROP_NAME.pageSize);
                this._onPageSizeChanged();
            }
        }
        get pageIndex() { return this._pageIndex; }
        set pageIndex(v: number) {
            if (v !== this._pageIndex && this.isPagingEnabled) {
                if (v < 0)
                    return;
                if (!this._onPageChanging()) {
                    return;
                }
                this._pageIndex = v;
                this._onPageChanged();
                this.raisePropertyChanged(PROP_NAME.pageIndex);
            }
        }
        get items() { return this._items; }
        get isPagingEnabled() { return this._options.enablePaging; }
        get permissions() { return this._perms; }
        get isEditing() { return !!this._EditingItem; }
        get isLoading() { return this._isLoading; }
        set isLoading(v: boolean) {
            if (this._isLoading !== v) {
                this._isLoading = v;
                this.raisePropertyChanged(PROP_NAME.isLoading);
            }
        }
        get isUpdating() { return this._isUpdating; }
        set isUpdating(v: boolean) {
            if (this._isUpdating !== v) {
                this._isUpdating = v;
                this.raisePropertyChanged(PROP_NAME.isUpdating);
            }
        }
        get pageCount() {
            var rowCount = this.totalCount, rowPerPage = this.pageSize, result: number;

            if ((rowCount === 0) || (rowPerPage === 0)) {
                return 0;
            }

            if ((rowCount % rowPerPage) === 0) {
                result = (rowCount / rowPerPage);
            }
            else {
                result = (rowCount / rowPerPage);
                result = Math.floor(result) + 1;
            }
            return result;
        }
    }

    export interface IListItem extends ICollectionItem {
        _aspect: ListItemAspect<IListItem, any>;
    }
    export interface IListItemAspectConstructor<TItem extends IListItem, TObj> {
        new (coll: BaseList<TItem, TObj>, itemType: IListItemConstructor<TItem, TObj>, obj?: TObj): ListItemAspect<TItem, TObj>;
    }
    export interface IListItemConstructor<TItem extends IListItem, TObj> {
        new (aspect: ListItemAspect<TItem, TObj>): TItem;
    }
    export interface IPropInfo { name: string; dtype: number; }

    export class CollectionItem<TAspect extends ItemAspect<ICollectionItem>> extends RIAPP.BaseObject implements ICollectionItem {
        private f_aspect: TAspect;
        constructor(aspect: TAspect) {
            super();
            this.f_aspect = aspect;
        }
        get _aspect() { return this.f_aspect; }
        get _key(): string { return !!this.f_aspect ? this.f_aspect.key : null; }
        set _key(v: string) { if (!this.f_aspect) return; this.f_aspect.key = v; }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            if (!!this.f_aspect && !this.f_aspect.getIsDestroyCalled()) {
                this.f_aspect.destroy();
            }
            //this.f_aspect = null;
            super.destroy();
        }
        toString() {
            return 'CollectionItem';
        }
    }

    export class ListItemAspect<TItem extends IListItem, TObj> extends ItemAspect<TItem> {
        protected __isNew: boolean;
        protected _item: TItem;

        constructor(coll: BaseList<TItem, TObj>, itemType: IListItemConstructor<TItem, TObj>, obj?: TObj) {
            super(coll);
            var self = this;
            this.__isNew = !obj ? true : false;
            this._item = null;
            if (!!obj)
                this._vals = <any>obj;
            else
                this._vals = ListItemAspect._initVals(coll, obj);
            this._item = new itemType(this);
        }
        protected static _initVals(coll: BaseList<IListItem, any>, obj?: any): any {
            var vals = obj || {};
            if (!!obj) {
                //if no object then set all values to nulls
                var fieldInfos = coll.getFieldInfos();
                fieldInfos.forEach(function (fld) {
                    if (fld.fieldType != constsMOD.FIELD_TYPE.Object) {
                        vals[fld.fieldName] = null;
                    }
                    else {
                        //object field
                        fn_traverseField(fld, (name, fld) => {
                            if (fld.fieldType == constsMOD.FIELD_TYPE.Object)
                                baseUtils.setValue(vals, name, {}, false);
                            else
                                baseUtils.setValue(vals, name, null, false);
                        });
                    }
                });
            }
            return vals;
        }
        _setProp(name: string, val: any) {
            var validation_error: RIAPP.IValidationInfo, error: errorsMOD.ValidationError, coll = this.collection;
            if (this._getProp(name) !== val) {
                try {
                    baseUtils.setValue(this._vals, name, val, false);
                    this.getItem().raisePropertyChanged(name);
                    coll._getInternal().removeError(this.getItem(), name);
                    validation_error = this._validateField(name);
                    if (!!validation_error) {
                        throw new ValidationError([validation_error], this);
                    }
                } catch (ex) {
                    if (ex instanceof ValidationError) {
                        error = ex;
                    }
                    else {
                        error = new ValidationError([
                            { fieldName: name, errors: [ex.message] }
                        ], this);
                    }
                    coll._getInternal().addError(this.getItem(), name, error.errors[0].errors);
                    throw error;
                }
            }
        }
        _getProp(name: string) {
            return baseUtils.getValue(this._vals, name);
        }
        _resetIsNew() {
            this.__isNew = false;
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            super.destroy();
            this._item = null;
        }
        getItem(): TItem {
            return this._item;
        }
        toString() {
            if (!this._item)
                return 'ListItemAspect';
            return this._item.toString() + 'Aspect';
        }
        get vals() { return this._vals; }
        get isNew() { return this.__isNew; }
    }

    export class BaseList<TItem extends IListItem, TObj> extends BaseCollection<TItem> {
        protected _itemType: IListItemConstructor<TItem, TObj>;
        constructor(itemType: IListItemConstructor<TItem, TObj>, props: IPropInfo[]) {
            super();
            this._itemType = itemType;
            if (!!props)
                this._updateFieldMap(props);
        }
        private _updateFieldMap(props: IPropInfo[]) {
            var self = this;
            if (!utils.check.isArray(props) || props.length == 0)
                throw new Error(baseUtils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'props', props));

            self._fieldMap = {};
            self._fieldInfos = [];
            props.forEach(function (prop) {
                var fldInfo = BaseCollection.getEmptyFieldInfo(prop.name);
                fldInfo.dataType = prop.dtype;
                self._fieldMap[prop.name] = fldInfo;
                self._fieldInfos.push(fldInfo);
                fn_traverseField(fldInfo, (fullName, fld) => {
                    fld.dependents = null;
                    fld.fullName = fullName;
                });
            });
        }
        protected _attach(item: TItem) {
            try {
                this.endEdit();
            } catch (ex) {
                RIAPP.reThrow(ex, this.handleError(ex, this));
            }
            return super._attach(item);
        }
        protected _createNew(): TItem {
            var aspect = new ListItemAspect<TItem, TObj>(this, this._itemType, null);
            //a new client item ID
            aspect.key = this._getNewKey(null);
            return aspect.getItem();
        }
        //the item parameter is not used here, but can be used in descendants
        protected _getNewKey(item: TItem) {
            //client's item ID
            var key = 'clkey_' + this._newKey;
            this._newKey += 1;
            return key;
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            this._itemType = null;
            super.destroy();
        }
        fillItems(objArray: TObj[], clearAll?: boolean) {
            var self = this, newItems: TItem[] = [], positions: number[] = [], fetchedItems: TItem[] = [];
            if (!objArray)
                objArray = [];
            this._onFillStart({ isBegin: true, rowCount: objArray.length, time: new Date(), isPageChanged: false });
            try {
                if (!!clearAll) this.clear();
                objArray.forEach(function (obj) {
                    var aspect: ListItemAspect<TItem, TObj> = new ListItemAspect<TItem, TObj>(self, self._itemType, obj);
                    var item = aspect.getItem();
                    aspect.key = self._getNewKey(item);
                    var oldItem = self._itemsByKey[aspect.key];
                    if (!oldItem) {
                        self._items.push(item);
                        self._itemsByKey[aspect.key] = item;
                        newItems.push(item);
                        positions.push(self._items.length - 1);
                        fetchedItems.push(item);
                    }
                    else {
                        fetchedItems.push(oldItem);
                    }
                });

                if (newItems.length > 0) {
                    this._onCollectionChanged({ changeType: COLL_CHANGE_TYPE.ADDED, items: newItems, pos: positions });
                    this.raisePropertyChanged(PROP_NAME.count);
                }
            }
            finally {
                this._onFillEnd({
                    isBegin: false, rowCount: fetchedItems.length, time: new Date(), resetUI: !!clearAll,
                    fetchedItems: fetchedItems, newItems: newItems, isPageChanged: false
                });
            }
            this.moveFirst();
        }
        toArray() {
            return this.items.map((item, index, arr) => {
                return <TObj>utils.cloneObj(item._aspect.vals);
            });
        }
        getNewObjects() {
            return this._items.filter(function (item) {
                return item._aspect.isNew;
            });
        }
        resetNewObjects() {
            this._items.forEach(function (item) {
                item._aspect._resetIsNew();
            });
        }
        toString() {
            return 'BaseList';
        }
    }

    export class BaseDictionary<TItem extends IListItem, TObj> extends BaseList<TItem, TObj>{
        private _keyName: string;
        constructor(itemType: IListItemConstructor<TItem, TObj>, keyName: string, props: IPropInfo[]) {
            if (!keyName)
                throw new Error(baseUtils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'keyName', keyName));
            this._keyName = keyName;
            super(itemType, props);
            var keyFld = this.getFieldInfo(keyName);
            if (!keyFld)
                throw new Error(baseUtils.format(RIAPP.ERRS.ERR_DICTKEY_IS_NOTFOUND, keyName));
            keyFld.isPrimaryKey = 1;
        }
        protected _getNewKey(item: TItem) {
            if (!item) {
                return super._getNewKey(null);
            }
            var key = (<any>item)[this._keyName];
            if (utils.check.isNt(key))
                throw new Error(baseUtils.format(RIAPP.ERRS.ERR_DICTKEY_IS_EMPTY, this.keyName));
            return '' + key;
        }
        protected _onItemAdded(item: TItem) {
            super._onItemAdded(item);
            var key = (<any>item)[this._keyName];
            this.raisePropertyChanged('[' + key + ']');
        }
        protected _onRemoved(item: TItem, pos: number) {
            var key = (<any>item)[this._keyName];
            super._onRemoved(item, pos);
            this.raisePropertyChanged('[' + key + ']');
        }
        get keyName() {
            return this._keyName;
        }
        toString() {
            return 'BaseDictionary';
        }
    }

    _isModuleLoaded = true;
}
