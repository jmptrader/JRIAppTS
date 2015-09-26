namespace RIAPP.MOD.listbox {
    import utilsMOD = RIAPP.MOD.utils;
    import parserMOD = RIAPP.MOD.parser;
    import bindMOD = RIAPP.MOD.binding;
    import collMOD = RIAPP.MOD.collection;
    import elviewMOD = RIAPP.MOD.baseElView;
    import contentMOD = RIAPP.MOD.baseContent;

    var utils: utilsMOD.Utils, parser: parserMOD.Parser;
    RIAPP.global.addOnInitialize((s, args) => {
        utils = s.utils;
        parser = s.parser;
    });

    export interface IListBoxOptions {
        valuePath: string;
        textPath: string;
        statePath?: string;
    }

    export interface IListBoxConstructorOptions extends IListBoxOptions {
        app: Application;
        el: HTMLSelectElement;
        dataSource: collMOD.BaseCollection<collMOD.ICollectionItem>;
    }
    export interface IMappedItem {
        item: collMOD.ICollectionItem;
        op: HTMLOptionElement;
    }

    var PROP_NAME = {
        dataSource: 'dataSource',
        selectedItem: 'selectedItem',
        selectedValue: 'selectedValue',
        valuePath: 'valuePath',
        textPath: 'textPath',
        isEnabled: 'isEnabled',
        listBox: 'listBox',
        value: 'value',
        textProvider: 'textProvider',
        stateProvider: 'stateProvider'
    };
    export interface IOptionStateProvider {
        getCSS(item: collMOD.ICollectionItem, itemIndex: number, val: any): string;
    }

    export interface IOptionTextProvider {
        getText(item: collMOD.ICollectionItem, itemIndex: number, text: string): string;
    }

    export class ListBox extends RIAPP.BaseObject {
        private _$el: JQuery;
        private _objId: string;
        private _isRefreshing: boolean;
        private _isDSFilling: boolean;
        private _selectedItem: collMOD.ICollectionItem;
        private _prevSelected: collMOD.ICollectionItem;
        private _keyMap: { [key: string]: IMappedItem; };
        private _valMap: { [val: string]: IMappedItem; };
        private _savedValue: string;
        private _tempValue: any;
        private _options: IListBoxConstructorOptions;
        private _fn_state: (item: RIAPP.BaseObject, args?: any) => void;
        private _textProvider: IOptionTextProvider;
        private _stateProvider: IOptionStateProvider;

        constructor(options: IListBoxConstructorOptions) {
            super();
            var self = this;
            options = utils.extend(false,
                {
                    app: null,
                    el: null,
                    dataSource: null,
                    valuePath: null,
                    textPath: null,
                    statePath: null
                }, options);
            if (!!options.dataSource && !(options.dataSource instanceof collMOD.BaseCollection))
                throw new Error(RIAPP.ERRS.ERR_LISTBOX_DATASRC_INVALID);
            this._$el = global.$(options.el);
            this._options = options;
            this._objId = 'lst' + baseUtils.getNewID();
            this._$el.on('change.' + this._objId, function (e) {
                e.stopPropagation();
                if (self._isRefreshing)
                    return;
                self._onChanged();
            });
            this._textProvider = null;
            this._stateProvider = null;
            this._isDSFilling = false;
            this._isRefreshing = false;
            this._selectedItem = null;
            this._prevSelected = null;
            this._keyMap = {};
            this._valMap = {};
            this._savedValue = undefined;
            this._tempValue = undefined;
            var ds = this._options.dataSource;
            this._options.dataSource = null;
            this.dataSource = ds;
            this._fn_state = (sender) => {
                var item = <collMOD.ICollectionItem><any>sender;
                var data: IMappedItem = self._keyMap[item._key];
                if (!data)
                    return;
                var css = self._onOptionStateChanged(data);
                data.op.className = css;
            };
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            this._unbindDS();
            this._$el.off('.' + this._objId);
            this._clear(true);
            this._$el = null;
            this._tempValue = undefined;
            this._selectedItem = null;
            this._prevSelected = null;
            this._savedValue = null;
            this._options = <any>{};
            this._textProvider = null;
            this._stateProvider = null;
            super.destroy();
        }
        protected _onChanged() {
            var op: any = null, key: string, data: IMappedItem;
            if (this.el.selectedIndex >= 0) {
                op = this.el.options[this.el.selectedIndex];
                key = op.value;
                data = this._keyMap[key];
            }

            if (!data && !!this._selectedItem) {
                this.selectedItem = null;
            }
            else if (data.item !== this._selectedItem) {
                this.selectedItem = data.item;
            }
        }
        protected _getStringValue(item: collMOD.ICollectionItem): string {
            var v = this._getValue(item);
            if (utils.check.isNt(v))
                return '';
            return '' + v;
        }
        protected _getValue(item: collMOD.ICollectionItem): any {
            if (!item)
                return null;
            if (!!this._options.valuePath) {
                return parser.resolvePath(item, this._options.valuePath);
            }
            else
                return undefined;
        }
        protected _getText(item: collMOD.ICollectionItem, index: number): string {
            var res = '';
            if (!item)
                return res;

            if (!!this._options.textPath) {
                var t = global.parser.resolvePath(item, this._options.textPath);
                if (utils.check.isNt(t))
                    return '';
                res = '' + t;
            }
            else {
                res = this._getStringValue(item);
            }

            if (!this._textProvider)
                return res;
            res = this._textProvider.getText(item, index, res);
            return res;
        }
        protected _onDSCollectionChanged(sender: any, args: collMOD.ICollChangedArgs<collMOD.ICollectionItem>) {
            var self = this, data: any;
            switch (args.changeType) {
                case collMOD.COLL_CHANGE_TYPE.RESET:
                    if (!this._isDSFilling)
                        this._refresh();
                    break;
                case collMOD.COLL_CHANGE_TYPE.ADDED:
                    //if items are filling then it will be appended when the fill ends
                    if (!this._isDSFilling) {
                        args.items.forEach(function (item) {
                            self._addOption(item, item._aspect.isNew);
                        });
                    }
                    break;
                case collMOD.COLL_CHANGE_TYPE.REMOVE:
                    args.items.forEach(function (item) {
                        self._removeOption(item);
                    });
                    if (!!self._textProvider)
                        self._resetText();
                    break;
                case collMOD.COLL_CHANGE_TYPE.REMAP_KEY:
                    {
                        data = self._keyMap[args.old_key];
                        if (!!data) {
                            delete self._keyMap[args.old_key];
                            self._keyMap[args.new_key] = data;
                            data.op.value = args.new_key;
                        }
                    }
            }
        }
        protected _onDSFill(sender: any, args: collMOD.ICollFillArgs<collMOD.ICollectionItem>) {
            var isEnd = !args.isBegin;
            if (isEnd) {
                this._isDSFilling = false;
                this._refresh();
            }
            else {
                this._isDSFilling = true;
            }
        }
        protected _onEdit(item: collMOD.ICollectionItem, isBegin: boolean, isCanceled: boolean) {
            var self = this, key: string, data: IMappedItem, oldVal: string, val: string;
            if (isBegin) {
                this._savedValue = this._getStringValue(item);
            }
            else {
                oldVal = this._savedValue;
                this._savedValue = undefined;
                if (!isCanceled) {
                    key = item._key;
                    data = self._keyMap[key];
                    if (!!data) {
                        data.op.text = self._getText(item, data.op.index);
                        val = this._getStringValue(item);
                        if (oldVal !== val) {
                            if (!!oldVal) {
                                delete self._valMap[oldVal];
                            }
                            if (!!val) {
                                self._valMap[val] = data;
                            }
                        }
                    }
                    else {
                        if (!!oldVal) {
                            delete self._valMap[oldVal];
                        }
                    }
                }
            }
        }
        protected _onStatusChanged(item: collMOD.ICollectionItem, oldStatus: collMOD.STATUS) {
            var newStatus = item._aspect.status;
            if (newStatus === collMOD.STATUS.DELETED) {
                this._removeOption(item);
                if (!!this._textProvider)
                    this._resetText();
            }
        }
        protected _onCommitChanges(item: collMOD.ICollectionItem, isBegin: boolean, isRejected: boolean, status: collMOD.STATUS) {
            var self = this, oldVal: any, val: any, data: any;
            if (isBegin) {
                if (isRejected && status === collMOD.STATUS.ADDED) {
                    return;
                }
                else if (!isRejected && status === collMOD.STATUS.DELETED) {
                    return;
                }

                this._savedValue = this._getStringValue(item);
            }
            else {
                oldVal = this._savedValue;
                this._savedValue = undefined;

                if (isRejected && status === collMOD.STATUS.DELETED) {
                    this._addOption(item, true);
                    return;
                }
                val = this._getStringValue(item);
                data = self._keyMap[item._key];
                if (oldVal !== val) {
                    if (oldVal !== '') {
                        delete self._valMap[oldVal];
                    }
                    if (!!data && val !== '') {
                        self._valMap[val] = data;
                    }
                }
                if (!!data) {
                    data.op.text = self._getText(item, data.op.index);
                }
            }
        }
        protected _onOptionStateChanged(data: IMappedItem): string {
            if (!this._stateProvider)
                return '';
            return this._stateProvider.getCSS(data.item, data.op.index, parser.resolvePath(data.item, this.statePath));
        }
        private _bindDS() {
            var self = this, ds = this.dataSource;
            if (!ds) return;
            ds.addOnCollChanged(self._onDSCollectionChanged, self._objId, self);
            ds.addOnFill(self._onDSFill, self._objId, self);
            ds.addOnBeginEdit(function (sender, args) {
                self._onEdit(args.item, true, undefined);
            }, self._objId);
            ds.addOnEndEdit(function (sender, args) {
                self._onEdit(args.item, false, args.isCanceled);
            }, self._objId);
            ds.addOnStatusChanged(function (sender, args) {
                self._onStatusChanged(args.item, args.oldStatus);
            }, self._objId);
            ds.addOnCommitChanges(function (sender, args) {
                self._onCommitChanges(args.item, args.isBegin, args.isRejected, args.status);
            }, self._objId);
        }
        private _unbindDS() {
            var self = this, ds = this.dataSource;
            if (!ds) return;
            ds.removeNSHandlers(self._objId);
        }
        private _addOption(item: collMOD.ICollectionItem, first: boolean) {
            if (this._isDestroyCalled)
                return null;
            var oOption: HTMLOptionElement, key = '', val: string, text: string;
            if (!!item) {
                key = item._key;
            }
            if (!!this._keyMap[key]) {
                return null;
            }
            var selEl = this.el;
            text = this._getText(item, selEl.options.length);
            val = this._getStringValue(item);
            oOption = global.document.createElement("option");
            oOption.text = text;
            oOption.value = key;
            var data: IMappedItem = { item: item, op: oOption };
            this._keyMap[key] = data;
            if (!!val)
                this._valMap[val] = data;
            if (!!first) {
                if (selEl.options.length < 2)
                    selEl.add(oOption, null);
                else
                    selEl.add(oOption, selEl.options[1]);
            }
            else
                selEl.add(oOption, null);
            if (!!this.statePath && !!item) {
                item.addOnPropertyChange(this.statePath, this._fn_state, this._objId, this);
                this._fn_state(<RIAPP.BaseObject><any>item);
            }
            return oOption;
        }
        private _mapByValue() {
            var self = this;
            this._valMap = {};
            utils.forEachProp(this._keyMap, (key) => {
                var data = self._keyMap[key], val = self._getStringValue(data.item);
                if (!!val)
                    self._valMap[val] = data;
            });
        }
        private _resetText() {
            var self = this;
            utils.forEachProp(this._keyMap, (key) => {
                var data = self._keyMap[key];
                data.op.text = self._getText(data.item, data.op.index);
            });
        }
        private _removeOption(item: collMOD.ICollectionItem) {
            if (this._isDestroyCalled)
                return;
            var key = '', data: IMappedItem, val: string;
            if (!!item) {
                key = item._key;
                data = this._keyMap[key];
                if (!data) {
                    return;
                }
                item.removeNSHandlers(this._objId);
                this.el.remove(data.op.index);
                val = this._getStringValue(item);
                delete this._keyMap[key];
                if (!!val)
                    delete this._valMap[val];
                if (this._prevSelected === item) {
                    this._prevSelected = null;
                }
                if (this.selectedItem === item) {
                    this.selectedItem = this._prevSelected;
                }
            }
        }
        private _clear(isDestroy: boolean) {
            var self = this;
            utils.forEachProp(this._keyMap, (key) => {
                var data = self._keyMap[key];
                if (!!data.item)
                    data.item.removeNSHandlers(self._objId);
            });
            this.el.options.length = 0;
            this._keyMap = {};
            this._valMap = {};
            this._prevSelected = null;
            if (!isDestroy) {
                this._addOption(null, false);
                this.selectedItem = null;
            }
            else
                this.selectedItem = null;
        }
        private _refresh() {
            var self = this, ds = this.dataSource, oldItem = this._selectedItem, tmp = self._tempValue;
            this._isRefreshing = true;
            try {
                this.clear();
                if (!!ds) {
                    ds.forEach(function (item) {
                        self._addOption(item, false);
                    });
                    if (utils.check.isUndefined(tmp)) {
                        self.el.selectedIndex = self._findItemIndex(oldItem);
                    }
                    else {
                        oldItem = self.findItemByValue(tmp);
                        self.selectedItem = oldItem;
                        if (!oldItem)
                            self._tempValue = tmp;
                        else
                            self._tempValue = undefined;
                    }
                }

            } finally {
                self._isRefreshing = false;
            }
            self._onChanged();
        }
        private _findItemIndex(item: collMOD.ICollectionItem) {
            if (!item || item.getIsDestroyCalled())
                return 0;
            var data: IMappedItem = this._keyMap[item._key];
            if (!data)
                return 0;
            return data.op.index;
        }
        protected _setIsEnabled(el: HTMLSelectElement, v: boolean) {
            el.disabled = !v;
        }
        protected _getIsEnabled(el: HTMLSelectElement) {
            return !el.disabled;
        }
        clear() {
            this._clear(false);
        }
        findItemByValue(val: any): collMOD.ICollectionItem {
            if (utils.check.isNt(val))
                return null;
            val = '' + val;
            var data: IMappedItem = this._valMap[val];
            if (!data)
                return null;
            return data.item;
        }
        getTextByValue(val: any): string {
            if (utils.check.isNt(val))
                return '';
            val = '' + val;
            var data: IMappedItem = this._valMap[val];
            if (!data)
                return '';
            else
                return data.op.text;
        }
        toString() {
            return 'ListBox';
        }
        get dataSource() { return this._options.dataSource; }
        set dataSource(v) {
            if (this.dataSource !== v) {
                if (!!this.dataSource) {
                    this._tempValue = this.selectedValue;
                    this._unbindDS();
                }
                this._options.dataSource = v;
                if (!!this.dataSource) {
                    this._bindDS();
                }
                this._refresh();
                if (!!this.dataSource)
                    this._tempValue = undefined;
                this.raisePropertyChanged(PROP_NAME.dataSource);
                this.raisePropertyChanged(PROP_NAME.selectedItem);
                this.raisePropertyChanged(PROP_NAME.selectedValue);
            }
        }
        get selectedValue() {
            if (!!this.dataSource)
                return this._getValue(this.selectedItem);
            else
                return undefined;
        }
        set selectedValue(v) {
            var self = this;
            if (!!this.dataSource) {
                if (this.selectedValue !== v) {
                    var item = self.findItemByValue(v);
                    self.selectedItem = item;
                    if (!utils.check.isUndefined(v) && !item)
                        self._tempValue = v;
                    else
                        self._tempValue = undefined;
                }
            }
            else {
                if (this._tempValue !== v) {
                    this._selectedItem = null;
                    this._tempValue = v;
                    this.raisePropertyChanged(PROP_NAME.selectedItem);
                    this.raisePropertyChanged(PROP_NAME.selectedValue);
                }
            }
        }
        get selectedItem() {
            if (!!this.dataSource)
                return this._selectedItem;
            else
                return undefined;
        }
        set selectedItem(v: collMOD.ICollectionItem) {
            if (this._selectedItem !== v) {
                if (!!this._selectedItem) {
                    this._prevSelected = this._selectedItem;
                }
                this._selectedItem = v;
                this.el.selectedIndex = this._findItemIndex(this._selectedItem);
                this.raisePropertyChanged(PROP_NAME.selectedItem);
                this.raisePropertyChanged(PROP_NAME.selectedValue);
            }
        }
        get valuePath() { return this._options.valuePath; }
        set valuePath(v: string) {
            if (v !== this.valuePath) {
                this._options.valuePath = v;
                this._mapByValue();
                this.raisePropertyChanged(PROP_NAME.valuePath);
            }
        }
        get textPath() { return this._options.textPath; }
        set textPath(v: string) {
            if (v !== this.textPath) {
                this._options.textPath = v;
                this._resetText();
                this.raisePropertyChanged(PROP_NAME.textPath);
            }
        }
        get statePath() { return this._options.statePath; }
        get isEnabled() { return this._getIsEnabled(this.el); }
        set isEnabled(v) {
            if (v !== this.isEnabled) {
                this._setIsEnabled(this.el, v);
                this.raisePropertyChanged(PROP_NAME.isEnabled);
            }
        }
        get textProvider() { return this._textProvider; }
        set textProvider(v: IOptionTextProvider) {
            if (v !== this._textProvider) {
                this._textProvider = v;
                this.raisePropertyChanged(PROP_NAME.textProvider);
                this._resetText();
            }
        }
        get stateProvider() { return this._stateProvider; }
        set stateProvider(v: IOptionStateProvider) {
            if (v !== this._stateProvider) {
                this._stateProvider = v;
                this.raisePropertyChanged(PROP_NAME.stateProvider);
            }
        }
        get el() { return this._options.el; }
    }

    export interface ISelectViewOptions extends IListBoxOptions, elviewMOD.IViewOptions {
    }

    export class SelectElView extends elviewMOD.BaseElView {
        private _listBox: ListBox;
        private _options: ISelectViewOptions;
        constructor(app: Application, el: HTMLSelectElement, options: ISelectViewOptions) {
            var self = this;
            self._options = options;
            var opts: IListBoxConstructorOptions = utils.extend(false,
                {
                    app: app,
                    el: el,
                    dataSource: null
                }, this._options);
            self._listBox = new ListBox(opts);
            self._listBox.addOnDestroyed(function () {
                self._listBox = null;
                self.invokePropChanged(PROP_NAME.listBox);
                self.raisePropertyChanged(PROP_NAME.listBox);
            }, this.uniqueID);
            self._listBox.addOnPropertyChange('*', function (sender, args) {
                switch (args.property) {
                    case PROP_NAME.dataSource:
                    case PROP_NAME.isEnabled:
                    case PROP_NAME.selectedValue:
                    case PROP_NAME.selectedItem:
                    case PROP_NAME.valuePath:
                    case PROP_NAME.textPath:
                    case PROP_NAME.textProvider:
                    case PROP_NAME.stateProvider:
                        self.raisePropertyChanged(args.property);
                        break;
                }
            }, self.uniqueID);
            super(app, el, options);
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            if (!!this._listBox && !this._listBox.getIsDestroyCalled()) {
                this._listBox.destroy();
            }
            this._listBox = null;
            super.destroy();
        }
        toString() {
            return 'SelectElView';
        }
        get isEnabled() {
            if (this._isDestroyCalled)
                return false;
            return !this.el.disabled;
        }
        set isEnabled(v: boolean) {
            v = !!v;
            if (v !== this.isEnabled) {
                this.el.disabled = !v;
                this.raisePropertyChanged(PROP_NAME.isEnabled);
            }
        }
        get el() { return <HTMLSelectElement>this._el; }
        get dataSource() {
            if (this._isDestroyCalled)
                return undefined;
            return this._listBox.dataSource;
        }
        set dataSource(v) {
            var self = this;
            if (self.dataSource !== v) {
                self._listBox.dataSource = v;
            }
        }
        get selectedValue() {
            if (this.getIsDestroyCalled())
                return undefined;
            return this._listBox.selectedValue;
        }
        set selectedValue(v) {
            if (this._listBox.selectedValue !== v) {
                this._listBox.selectedValue = v;
            }
        }
        get selectedItem() {
            if (this.getIsDestroyCalled())
                return undefined;
            return this._listBox.selectedItem;
        }
        set selectedItem(v: collMOD.ICollectionItem) {
            this._listBox.selectedItem = v;
        }
        get valuePath() { return this._listBox.valuePath; }
        set valuePath(v: string) {
            this._listBox.valuePath = v;
        }
        get textPath() { return this._listBox.textPath; }
        set textPath(v: string) {
            this._listBox.textPath = v;
        }
        get textProvider() { return this._listBox.textProvider; }
        set textProvider(v: IOptionTextProvider) {
            this._listBox.textProvider = v;
        }
        get stateProvider() { return this._listBox.stateProvider; }
        set stateProvider(v: IOptionStateProvider) {
            this._listBox.stateProvider = v;
        }
        get listBox() { return this._listBox; }
    }


    export interface ILookupOptions {
        dataSource: string;
        valuePath: string;
        textPath: string;
        statePath?: string;
    }

    var LOOKUP_EVENTS = {
        obj_created: 'object_created',
        obj_needed: 'object_needed'
    };
    export type TObjCreatedArgs = { objectKey: string; object: BaseObject; isCachedExternally: boolean; };
    export type TObjNeededArgs = { objectKey: string; object: BaseObject; };

    export class LookupContent extends contentMOD.BindingContent implements contentMOD.IExternallyCachable {
        private _spanView: elviewMOD.SpanElView;
        private _valBinding: bindMOD.Binding;
        private _listBinding: bindMOD.Binding;
        private _selectView: SelectElView;
        private _isListBoxCachedExternally: boolean;
        private _value: any;

        constructor(app: RIAPP.Application, options: contentMOD.IConstructorContentOptions) {
            if (options.contentOptions.name != 'lookup') {
                throw new Error(utils.format(RIAPP.ERRS.ERR_ASSERTION_FAILED, "contentOptions.name == 'lookup'"));
            }
            this._spanView = null;
            this._selectView = null;
            this._isListBoxCachedExternally = false;
            this._valBinding = null;
            this._listBinding = null;
            this._value = null;
            super(app, options);
        }
        protected init() {
            if (!!this._options.initContentFn) {
                this._options.initContentFn(this);
            }
        }
        protected _getEventNames() {
            var base_events = super._getEventNames();
            return [LOOKUP_EVENTS.obj_created, LOOKUP_EVENTS.obj_needed].concat(base_events);
        }
        addOnObjectCreated(fn: (sender: any, args: TObjCreatedArgs) => void, nmspace?: string) {
            this._addHandler(LOOKUP_EVENTS.obj_created, fn, nmspace);
        }
        removeOnObjectCreated(nmspace?: string) {
            this._removeHandler(LOOKUP_EVENTS.obj_created, nmspace);
        }
        addOnObjectNeeded(fn: (sender: any, args: TObjNeededArgs) => void, nmspace?: string) {
            this._addHandler(LOOKUP_EVENTS.obj_needed, fn, nmspace);
        }
        removeOnObjectNeeded(nmspace?: string) {
            this._removeHandler(LOOKUP_EVENTS.obj_needed, nmspace);
        }
        protected getSelectView(): SelectElView {
            if (!!this._selectView)
                return this._selectView;
            var lookUpOptions: ILookupOptions = this._options.options, objectKey = 'selectElView';
            var args1: TObjNeededArgs = { objectKey: objectKey, object: null };
            //try get externally externally cached listBox
            this.raiseEvent(LOOKUP_EVENTS.obj_needed, args1);
            if (!!args1.object) {
                this._isListBoxCachedExternally = true;
                this._selectView = <SelectElView>args1.object;
            }
            if (!!this._selectView)
                return this._selectView;
            //proceed creating new selectElView
            var dataSource = parser.resolvePath(this.app, lookUpOptions.dataSource),
                options = { valuePath: lookUpOptions.valuePath, textPath: lookUpOptions.textPath, statePath: (!lookUpOptions.statePath) ? null : lookUpOptions.statePath };
            var el = <HTMLSelectElement>global.document.createElement('select');
            el.setAttribute('size', '1');
            var selectElView = this.createSelectElView(el, options);
            selectElView.dataSource = dataSource;
            var args2: TObjCreatedArgs = { objectKey: objectKey, object: selectElView, isCachedExternally: false };
            //this allows to cache listBox externally
            this.raiseEvent(LOOKUP_EVENTS.obj_created, args2);
            this._isListBoxCachedExternally = args2.isCachedExternally;
            this._selectView = selectElView;
            return this._selectView;
        }
        protected createSelectElView(el: HTMLSelectElement, options: ISelectViewOptions): SelectElView {
            var elView = this.app._getInternal().getElView(el);
            if (!!elView)
                return <SelectElView>elView;
            elView = new SelectElView(this.app, el, options);
            return <SelectElView>elView;
        }
        protected updateTextValue() {
            var spanView = this.getSpanView();
            spanView.value = this.getLookupText();
        }
        protected getLookupText() {
            var listBoxView = this.getSelectView();
            return listBoxView.listBox.getTextByValue(this.value);
        }
        protected getSpanView() {
            if (!!this._spanView) {
                return this._spanView;
            }
            var el = global.document.createElement('span'), displayInfo = this._options.displayInfo;
            var spanView = new elviewMOD.SpanElView(this.app, el, {});
            if (!!displayInfo) {
                if (!!displayInfo.displayCss) {
                    spanView.$el.addClass(displayInfo.displayCss);
                }
            }
            this._spanView = spanView;
            return this._spanView;
        }
        protected render() {
            this.cleanUp();
            this.createTargetElement();
            this._parentEl.appendChild(this._el);
        }
        protected createTargetElement(): elviewMOD.BaseElView {
            var tgt: elviewMOD.BaseElView, el: HTMLElement, selectView: SelectElView, spanView: elviewMOD.SpanElView;
            if (this.isEditing && this.getIsCanBeEdited()) {
                selectView = this.getSelectView();
                this._listBinding = this.bindToList(selectView);
                tgt = selectView;
            }
            else {
                spanView = this.getSpanView();
                this._valBinding = this.bindToValue();
                tgt = spanView;
            }
            this._el = tgt.el;
            this.updateCss();
            return tgt;
        }
        protected cleanUp() {
            if (!!this._el) {
                utils.removeNode(this._el);
                this._el = null;
            }
            if (!!this._listBinding) {
                this._listBinding.destroy();
                this._listBinding = null;
            }
            if (!!this._valBinding) {
                this._valBinding.destroy();
                this._valBinding = null;
            }

            if (!!this._selectView && this._isListBoxCachedExternally) {
                this._selectView = null;
            }
        }
        protected updateBindingSource() {
            if (!!this._valBinding) {
                this._valBinding.source = this._dataContext;
            }
            if (!!this._listBinding) {
                this._listBinding.source = this._dataContext;
            }
        }
        protected bindToValue() {
            if (!this._options.fieldName)
                return null;

            var options: bindMOD.IBindingOptions = {
                target: this, source: this._dataContext,
                targetPath: PROP_NAME.value, sourcePath: this._options.fieldName,
                mode: bindMOD.BINDING_MODE.OneWay,
                converter: null, converterParam: null, isSourceFixed: false
            };
            return this.app.bind(options);
        }
        protected bindToList(selectView: SelectElView) {
            if (!this._options.fieldName)
                return null;

            var options: bindMOD.IBindingOptions = {
                target: selectView, source: this._dataContext,
                targetPath: PROP_NAME.selectedValue, sourcePath: this._options.fieldName,
                mode: bindMOD.BINDING_MODE.TwoWay,
                converter: null, converterParam: null, isSourceFixed: false
            };
            return this.app.bind(options);
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            this.cleanUp();
            if (!!this._selectView && !this._isListBoxCachedExternally) {
                this._selectView.destroy();
            }
            this._selectView = null;
            if (!!this._spanView) {
                this._spanView.destroy();
            }
            this._spanView = null;
            super.destroy();
        }
        toString() {
            return 'LookupContent';
        }
        get value() { return this._value; }
        set value(v) {
            if (this._value !== v) {
                this._value = v;
                this.updateTextValue();
                this.raisePropertyChanged(PROP_NAME.value);
            }
        }
    }

    export class ContentFactory implements contentMOD.IContentFactory {
        private _app: Application;
        private _nextFactory: contentMOD.IContentFactory;

        constructor(app: Application, nextFactory?: contentMOD.IContentFactory) {
            this._app = app;
            this._nextFactory = nextFactory;
        }

        getContentType(options: contentMOD.IContentOptions): contentMOD.IContentType {
            if (options.name == 'lookup') {
                return LookupContent;
            }
            if (!!this._nextFactory)
                return this._nextFactory.getContentType(options);
            else
                throw new Error(RIAPP.ERRS.ERR_BINDING_CONTENT_NOT_FOUND);
        }

        createContent(options: contentMOD.IConstructorContentOptions): contentMOD.IContent {
            var contentType = this.getContentType(options);
            return new contentType(this.app, options);
        }

        isExternallyCachable(contentType: contentMOD.IContentType): boolean {
            if (LookupContent === contentType)
                return true;
            return this._nextFactory.isExternallyCachable(contentType);
        }
        get app() { return this._app; }
    }

    //this module function (if present) is executed by the application on its startup
    //it allows to initialize resources specific to the application
    _initModule = (app: Application) => {
        app._getInternal().addContentFactory((nextFactory?: contentMOD.IContentFactory) => {
            return new ContentFactory(app, nextFactory);
        });
    };

    global.registerElView('select', SelectElView);
    _isModuleLoaded = true;
}
