namespace RIAPP.MOD.db {
    import constsMOD = RIAPP.consts;
    import utilsMOD = RIAPP.MOD.utils;
    import collMOD = RIAPP.MOD.collection;
    import errMOD = RIAPP.MOD.errors;

    var HEAD_MARK_RX = /^<head:(\d{1,6})>/;
    //local variables for optimization
    var ValidationError = errMOD.ValidationError,
        valueUtils = utilsMOD.valueUtils,
        baseUtils = RIAPP.baseUtils,
        utils: utilsMOD.Utils;
    RIAPP.global.addOnInitialize((s, args) => {
        utils = s.utils;
    });

    export const enum FLAGS { None = 0, Changed = 1, Setted = 2, Refreshed = 4 }
    export const enum REFRESH_MODE { NONE = 0, RefreshCurrent = 1, MergeIntoCurrent = 2, CommitChanges = 3 }
    export const enum DELETE_ACTION { NoAction = 0, Cascade = 1, SetNulls = 2 }
    export const enum DATA_OPER { SUBMIT, LOAD, INVOKE, REFRESH, INIT }

    var DATA_SVC_METH = {
        Invoke: 'invoke', LoadData: 'query', GetPermissions: 'permissions',
        Submit: 'save', Refresh: 'refresh'
    };

    export class DataOperationError extends errMOD.BaseError {
        private _operationName: DATA_OPER;
        constructor(ex: any, operationName: DATA_OPER) {
            var message: string;
            if (!!ex)
                message = ex.message;
            if (!message)
                message = '' + ex;
            super(message);
            this.origError = ex;
            this._operationName = operationName;
        }
        get operationName() { return this._operationName; }
    }
    export class AccessDeniedError extends DataOperationError { }
    export class ConcurrencyError extends DataOperationError { }
    export class SvcValidationError extends DataOperationError { }
    export class SubmitError extends DataOperationError {
        private _allSubmitted: IEntityItem[];
        private _notValidated: IEntityItem[];

        constructor(origError: any, allSubmitted: IEntityItem[], notValidated: IEntityItem[]) {
            var message = origError.message || ('' + origError);
            this.origError = origError;
            this._allSubmitted = allSubmitted || [];
            this._notValidated = notValidated || [];
            if (this._notValidated.length > 0) {
                var res = [message + ':'];
                this._notValidated.forEach(function (item) {
                    res.push(baseUtils.format('item key:{0} errors:{1}', item._key, item._aspect.getErrorString()));
                });
                message = res.join('\r\n');
            }
            super(message, DATA_OPER.SUBMIT);
        }
        get allSubmitted() { return this._allSubmitted; }
        get notValidated() { return this._notValidated; }
    }

    function __checkError(svcError: { name: string; message?: string; }, oper: DATA_OPER) {
        if (!svcError)
            return;
        switch (svcError.name) {
            case "AccessDeniedException":
                throw new AccessDeniedError(RIAPP.ERRS.ERR_ACCESS_DENIED, oper);
                break;
            case "ConcurrencyException":
                throw new ConcurrencyError(RIAPP.ERRS.ERR_CONCURRENCY, oper);
                break;
            case "ValidationException":
                throw new SvcValidationError(utils.format(RIAPP.ERRS.ERR_VALIDATION,
                    svcError.message), oper);
                break;
            case "DomainServiceException":
                throw new DataOperationError(utils.format(RIAPP.ERRS.ERR_SVC_ERROR,
                    svcError.message), oper);
                break;
            default:
                throw new DataOperationError(utils.format(RIAPP.ERRS.ERR_UNEXPECTED_SVC_ERROR,
                    svcError.message), oper);
        }
    };
    export interface IFieldName {
        n: string; //field's name
        p: IFieldName[]; //for object field contains its properties, for others is null
    }
    export interface ICachedPage { items: IEntityItem[]; pageIndex: number; }
    export interface IQueryParamInfo {
        dataType: constsMOD.DATA_TYPE;
        dateConversion: constsMOD.DATE_CONVERSION;
        isArray: boolean;
        isNullable: boolean;
        name: string;
        ordinal: number;
    }
    export interface IQueryInfo {
        isQuery: boolean;
        methodName: string;
        methodResult: boolean;
        parameters: IQueryParamInfo[];
    }
    export interface IFilterInfo { filterItems: { fieldName: string; kind: collMOD.FILTER_TYPE; values: any[]; }[]; }
    export interface ISortInfo { sortItems: { fieldName: string; sortOrder: collMOD.SORT_ORDER; }[]; }
    export interface IValueChange {
        val: any;
        orig: any;
        fieldName: string;
        flags: number;
        nested: IValueChange[];
    }
    export interface IValidationErrorInfo {
        fieldName: string;
        message: string;
    }
    export interface IRowInfo {
        values: IValueChange[];
        changeType: number;
        serverKey: string;
        clientKey: string;
        error: string;
        invalid?: IValidationErrorInfo[];
    }
    export interface IPermissions extends collMOD.IPermissions { dbSetName: string; }
    export interface IPermissionsInfo {
        serverTimezone: number;
        permissions: IPermissions[];
    }

    export interface IParamInfo { parameters: { name: string; value: any; }[]; }
    export interface IErrorInfo { name: string; message: string; }
    export interface IInvokeRequest { methodName: string; paramInfo: IParamInfo; }
    export interface IInvokeResponse {
        result: any;
        error: IErrorInfo;
    }
    export interface IDbSetInfo {
        dbSetName: string;
        enablePaging: boolean;
        pageSize: number;
        fieldInfos: IFieldInfo[];
    }
    export interface IRefreshRowInfo {
        dbSetName: string;
        rowInfo: IRowInfo;
        error: { name: string; message: string; };
    }
    export interface IDbSetConstuctorOptions {
        dbContext: DbContext;
        dbSetInfo: IDbSetInfo;
        childAssoc: IAssociationInfo[];
        parentAssoc: IAssociationInfo[];
    }
    export interface IAssocConstructorOptions {
        dbContext: DbContext;
        parentName: string;
        childName: string;
        onDeleteAction: DELETE_ACTION;
        parentKeyFields: string[];
        childKeyFields: string[];
        parentToChildrenName: string;
        childToParentName: string;
        name: string;
    }
    export interface IAssociationInfo {
        childDbSetName: string;
        childToParentName: string;
        name: string;
        onDeleteAction: number;
        parentDbSetName: string;
        parentToChildrenName: string;
        fieldRels: { childField: string; parentField: string; }[];
    }
    export interface IDbSetOptions extends collMOD.ICollectionOptions {
        dbSetName: string;
    }

    export interface IMetadata {
        associations: IAssociationInfo[];
        dbSets: IDbSetInfo[];
        methods: IQueryInfo[];
        serverTimezone: number;
    }
    export interface ITrackAssoc {
        assocName: string;
        parentKey: string;
        childKey: string;
    }
    export interface IChangeSet {
        dbSets: { dbSetName: string; rows: IRowInfo[]; }[];
        error: { name: string; message: string; };
        trackAssocs: ITrackAssoc[];
    }
    export interface IQueryRequest {
        dbSetName: string;
        pageIndex: number;
        pageSize: number;
        pageCount: number;
        isIncludeTotalCount: boolean;
        filterInfo: IFilterInfo;
        sortInfo: ISortInfo;
        paramInfo: IParamInfo;
        queryName: string;
    }
    export interface IRowData {
        k: string; v: any[]; //key and values
    }
    export interface IQueryResult<TItem extends IEntityItem> { fetchedItems: TItem[]; newItems: TItem[]; isPageChanged: boolean; outOfBandData: any; }
    export interface IIncludedResult {
        names: IFieldName[];
        rows: IRowData[];
        rowCount: number;
        dbSetName: string;
    }
    export interface IQueryResponse {
        names: IFieldName[];
        rows: IRowData[];
        rowCount: number;
        dbSetName: string;
        pageIndex: number;
        pageCount: number;
        totalCount: number;
        extraInfo: any;
        error: IErrorInfo;
        included: IIncludedResult[];
    }
    export interface IEntityAspectConstructor<TItem extends IEntityItem, TDbContext extends DbContext> {
        new (dbSet: DbSet<TItem, TDbContext>, itemType: IEntityConstructor<TItem>, row: IRowData, names: IFieldName[]): EntityAspect<TItem, TDbContext>;
    }
    export interface IEntityConstructor<TItem extends IEntityItem> {
        new (aspect: EntityAspect<TItem, DbContext>): TItem;
    }
    export interface IDbSetConstructor<TItem extends IEntityItem> {
        new (dbContext: DbContext): DbSet<TItem, DbContext>;
    }
    export interface IEntityItem extends collMOD.ICollectionItem {
        _aspect: EntityAspect<IEntityItem, DbContext>;
    }
    export interface ICalcFieldImpl<TItem extends IEntityItem> {
        getFunc: (item: TItem) => any;
    }
    export interface INavFieldImpl<TItem extends IEntityItem> {
        getFunc: (item: TItem) => any;
        setFunc: (v: any) => void;
    } 

    //don't submit these types of fields to the server
    function fn_isNotSubmittable(fieldInfo: IFieldInfo) {
        return (fieldInfo.fieldType == constsMOD.FIELD_TYPE.ClientOnly || fieldInfo.fieldType == constsMOD.FIELD_TYPE.Navigation || fieldInfo.fieldType == constsMOD.FIELD_TYPE.Calculated || fieldInfo.fieldType == constsMOD.FIELD_TYPE.ServerCalculated);
    }

    function fn_traverseChanges(val: IValueChange, fn: (name: string, val: IValueChange) => void): void {
        function _fn_traverseChanges(name: string, val: IValueChange, fn: (name: string, val: IValueChange) => void) {
            if (!!val.nested && val.nested.length > 0) {
                var prop: IValueChange, i: number, len = val.nested.length;
                for (i = 0; i < len; i += 1) {
                    prop = val.nested[i];
                    if (!!prop.nested && prop.nested.length > 0) {
                        _fn_traverseChanges(name + '.' + prop.fieldName, prop, fn);
                    }
                    else {
                        fn(name + '.' + prop.fieldName, prop);
                    }
                }
            }
            else {
                fn(name, val);
            }
        }
        _fn_traverseChanges(val.fieldName, val, fn);
    }

    var PROP_NAME = {
        isHasChanges: 'isHasChanges',
        isSubmitOnDelete: 'isSubmitOnDelete',
        isInitialized: 'isInitialized',
        isBusy: 'isBusy',
        isSubmiting: 'isSubmiting',
        isPagingEnabled: 'isPagingEnabled',
        parentItem: 'parentItem',
        totalCount: 'totalCount',
        loadPageCount: 'loadPageCount',
        isClearCacheOnEveryLoad: 'isClearCacheOnEveryLoad',
        isRefreshing: 'isRefreshing'
    };

    export class DataCache extends RIAPP.BaseObject {
        private _query: DataQuery<IEntityItem>;
        private _cache: ICachedPage[];
        private _totalCount: number;
        private _itemsByKey: { [key: string]: IEntityItem; };

        constructor(query: DataQuery<IEntityItem>) {
            super();
            this._query = query;
            this._cache = [];
            this._totalCount = 0;
            this._itemsByKey = {};
        }
        getCachedPage(pageIndex: number) {
            var res: ICachedPage[] = this._cache.filter(function (page: ICachedPage) {
                return page.pageIndex === pageIndex;
            });
            if (res.length == 0)
                return null;
            if (res.length != 1)
                throw new Error(baseUtils.format(RIAPP.ERRS.ERR_ASSERTION_FAILED, "res.length == 1"));
            return res[0];
        }
        //reset items key index
        reindexCache() {
            var self = this, page: ICachedPage;
            this._itemsByKey = {};
            for (var i = 0; i < this._cache.length; i += 1) {
                page = this._cache[i];
                page.items.forEach(function (item) {
                    self._itemsByKey[item._key] = item;
                });
            }
        }
        getPrevCachedPageIndex(currentPageIndex: number) {
            var pageIndex = -1, cachePageIndex: number;
            for (var i = 0; i < this._cache.length; i += 1) {
                cachePageIndex = this._cache[i].pageIndex;
                if (cachePageIndex > pageIndex && cachePageIndex < currentPageIndex)
                    pageIndex = cachePageIndex;
            }
            return pageIndex;
        }
        getNextRange(pageIndex: number) {
            var half = Math.floor(((this.loadPageCount - 1) / 2));
            var above = (pageIndex + half) + ((this.loadPageCount - 1) % 2);
            var below = (pageIndex - half), prev = this.getPrevCachedPageIndex(pageIndex);
            if (below < 0) {
                above += (0 - below);
                below = 0;
            }
            if (below <= prev) {
                above += (prev - below + 1);
                below += (prev - below + 1);
            }
            if (this._pageCount > this.loadPageCount && above > (this._pageCount - 1)) {
                below -= (above - (this._pageCount - 1));

                if (below < 0) {
                    below = 0;
                }

                above = this._pageCount - 1;
            }
            //once again check for previous cached range
            if (below <= prev) {
                above += (prev - below + 1);
                below += (prev - below + 1);
            }

            var cnt = above - below + 1;
            if (cnt < this.loadPageCount) {
                above += this.loadPageCount - cnt;
                cnt = above - below + 1;
            }
            var start = below;
            var end = above;
            return { start: start, end: end, cnt: cnt };
        }
        fillCache(start: number, items: IEntityItem[]) {
            var item: IEntityItem, keyMap = this._itemsByKey;
            var i: number, j: number, k: number, len = items.length, pageIndex: number, page: ICachedPage, pageSize = this.pageSize;
            for (i = 0; i < this.loadPageCount; i += 1) {
                pageIndex = start + i;
                page = this.getCachedPage(pageIndex);
                if (!page) {
                    page = { items: [], pageIndex: pageIndex };
                    this._cache.push(page);
                }
                for (j = 0; j < pageSize; j += 1) {
                    k = (i * pageSize) + j;
                    if (k < len) {
                        item = items[k];
                        if (!!keyMap[item._key]) {
                            continue;
                        }
                        page.items.push(item);
                        keyMap[item._key] = item;
                        item._aspect.isCached = true;
                    }
                    else {
                        return;
                    }
                }
            }
        }
        clear() {
            var i: number, j: number, items: IEntityItem[], item: IEntityItem, dbSet = this._query.dbSet;
            for (i = 0; i < this._cache.length; i += 1) {
                items = this._cache[i].items;
                for (j = 0; j < items.length; j += 1) {
                    item = items[j];
                    if (!!item && !!item._aspect && !!item._aspect.key) {
                        item._aspect.isCached = false;
                        if (!dbSet.getItemByKey(item._key))
                            item._aspect.destroy();
                    }
                }
            }
            this._cache = [];
            this._itemsByKey = {};
        }
        clearCacheForPage(pageIndex: number) {
            var page: ICachedPage = this.getCachedPage(pageIndex), dbSet = this._query.dbSet;
            if (!page)
                return;
            var j: number, items: IEntityItem[], item: IEntityItem, index = this._cache.indexOf(page);
            items = page.items;
            for (j = 0; j < items.length; j += 1) {
                item = items[j];
                if (!!item && item._key !== null) {
                    delete this._itemsByKey[item._key];
                    item._aspect.isCached = false;
                    if (!dbSet.getItemByKey(item._key))
                        item._aspect.destroy();
                }
            }
            this._cache.splice(index, 1);
        }
        hasPage(pageIndex: number) {
            for (var i = 0; i < this._cache.length; i += 1) {
                if (this._cache[i].pageIndex === pageIndex)
                    return true;
            }
            return false;
        }
        getItemByKey(key: string) {
            return this._itemsByKey[key];
        }
        getPageByItem(item: IEntityItem) {
            item = this._itemsByKey[item._key];
            if (!item)
                return -1;
            for (var i = 0; i < this._cache.length; i += 1) {
                if (this._cache[i].items.indexOf(item) > -1) {
                    return this._cache[i].pageIndex;
                }
            }
            return -1;
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            this.clear();
            super.destroy();
        }
        toString() {
            return 'DataCache';
        }
        get _pageCount() {
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
        get pageSize() { return this._query.pageSize; }
        get loadPageCount() { return this._query.loadPageCount; }
        get totalCount() { return this._totalCount; }
        set totalCount(v: number) {
            if (utils.check.isNt(v))
                v = 0;
            if (v !== this._totalCount) {
                this._totalCount = v;
                this.raisePropertyChanged(PROP_NAME.totalCount);
            }
        }
        get cacheSize() { return this._cache.length; }
    }

    export interface IInternalQueryMethods<TItem extends IEntityItem> {
        clearCache(): void;
        getCache(): DataCache;
        reindexCache(): void;
        isPageCached(pageIndex: number): boolean;
        getQueryInfo(): IQueryInfo;
    }

    export class DataQuery<TItem extends IEntityItem> extends RIAPP.BaseObject {
        private _dbSet: DbSet<TItem, DbContext>;
        private __queryInfo: IQueryInfo;
        private _filterInfo: IFilterInfo;
        private _sortInfo: ISortInfo;
        private _isIncludeTotalCount: boolean;
        private _isClearPrevData: boolean;
        private _pageSize: number;
        private _pageIndex: number;
        private _params: { [name: string]: any; };
        private _loadPageCount: number;
        private _isClearCacheOnEveryLoad: boolean;
        private _dataCache: DataCache;
        private _cacheInvalidated: boolean;
        private _internal: IInternalQueryMethods<TItem>;

        constructor(dbSet: DbSet<TItem, DbContext>, queryInfo: IQueryInfo) {
            super();
            var self = this;
            this._dbSet = dbSet;
            this.__queryInfo = queryInfo;
            this._filterInfo = { filterItems: [] };
            this._sortInfo = { sortItems: [] };
            this._isIncludeTotalCount = true;
            this._isClearPrevData = true;
            this._pageSize = dbSet.pageSize;
            this._pageIndex = dbSet.pageIndex;
            this._params = {};
            this._loadPageCount = 1;
            this._isClearCacheOnEveryLoad = true;
            this._dataCache = null;
            this._cacheInvalidated = false;
            this._internal = {
                clearCache: () => {
                    self._clearCache();
                },
                getCache: () => {
                    return self._getCache();
                },
                reindexCache: () => {
                    self._reindexCache();
                },
                isPageCached: (pageIndex: number) => {
                    return self._isPageCached(pageIndex);
                },
                getQueryInfo: () => {
                    return self.__queryInfo;
                }
            };
        }
        private _addSort(fieldName: string, sortOrder: collMOD.SORT_ORDER) {
            var ord = collMOD.SORT_ORDER.ASC;
            if (!utils.check.isNt(sortOrder))
                ord = sortOrder;

            var sortItem = { fieldName: fieldName, sortOrder: ord };
            this._sortInfo.sortItems.push(sortItem);
            this._cacheInvalidated = true;
        }
        private _addFilterItem(fieldName: string, operand: collMOD.FILTER_TYPE, value: any[]) {
            var fkind = collMOD.FILTER_TYPE.Equals;
            var fld = this.getFieldInfo(fieldName);
            if (!fld)
                throw new Error(utils.format(RIAPP.ERRS.ERR_DBSET_INVALID_FIELDNAME, this.dbSetName, fieldName));
            var stz = this.serverTimezone, dcnv = fld.dateConversion, vals: any[] = [];
            if (!utils.check.isArray(value))
                vals = [value];
            else
                vals = value;
            var tmpVals = RIAPP.ArrayHelper.clone(vals);
            vals = tmpVals.map(function (v) {
                return valueUtils.stringifyValue(v, dcnv, fld.dataType, stz);
            });

            switch (operand) {
                case collMOD.FILTER_TYPE.Equals:
                case collMOD.FILTER_TYPE.NotEq:
                case collMOD.FILTER_TYPE.StartsWith:
                case collMOD.FILTER_TYPE.EndsWith:
                case collMOD.FILTER_TYPE.Contains:
                case collMOD.FILTER_TYPE.Gt:
                case collMOD.FILTER_TYPE.GtEq:
                case collMOD.FILTER_TYPE.Lt:
                case collMOD.FILTER_TYPE.LtEq:
                    fkind = operand;
                    break;
                case collMOD.FILTER_TYPE.Between:
                    fkind = operand;
                    if (value.length != 2)
                        throw new Error(RIAPP.ERRS.ERR_QUERY_BETWEEN);
                    break;
                default:
                    throw new Error(utils.format(RIAPP.ERRS.ERR_QUERY_OPERATOR_INVALID, operand));
            }
            var filterItem = { fieldName: fieldName, kind: fkind, values: vals };
            this._filterInfo.filterItems.push(filterItem);
            this._cacheInvalidated = true;
        }
        private _resetCacheInvalidated() {
            this._cacheInvalidated = false;
        }
        private _clearCache(): void {
            if (!!this._dataCache) {
                this._dataCache.destroy();
                this._dataCache = null;
            }
            this._resetCacheInvalidated();
        }
        private _getCache(): DataCache {
            if (!this._dataCache) {
                this._dataCache = new DataCache(this);
            }
            return this._dataCache;
        }
        private _reindexCache(): void {
            if (!this._dataCache) {
                return;
            }
            this._dataCache.reindexCache();
        }
        private _isPageCached(pageIndex: number): boolean {
            if (!this._dataCache) {
                return false;
            }
            return this._dataCache.hasPage(pageIndex);
        }
        _getInternal(): IInternalQueryMethods<TItem> {
            return this._internal;
        }
        where(fieldName: string, operand: collMOD.FILTER_TYPE, value: any) {
            this._addFilterItem(fieldName, operand, value);
            return this;
        }
        and(fieldName: string, operand: collMOD.FILTER_TYPE, value: any) {
            this._addFilterItem(fieldName, operand, value);
            return this;
        }
        orderBy(fieldName: string, sortOrder?: collMOD.SORT_ORDER) {
            this._addSort(fieldName, sortOrder);
            return this;
        }
        thenBy(fieldName: string, sortOrder?: collMOD.SORT_ORDER) {
            this._addSort(fieldName, sortOrder);
            return this;
        }
        clearSort() {
            this._sortInfo.sortItems = [];
            this._cacheInvalidated = true;
            return this;
        }
        clearFilter() {
            this._filterInfo.filterItems = [];
            this._cacheInvalidated = true;
            return this;
        }
        clearParams() {
            this._params = {};
            this._cacheInvalidated = true;
            return this;
        }
        getFieldInfo(fieldName: string) {
            return this._dbSet.getFieldInfo(fieldName);
        }
        getFieldNames() {
            return this._dbSet.getFieldNames();
        }
        load(): IPromise<IQueryResult<TItem>> {
            return <IPromise<IQueryResult<TItem>>>this.dbSet.dbContext.load(this);
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            this._clearCache();
            super.destroy();
        }
        toString() {
            return 'DataQuery';
        }
        get serverTimezone() { return this._dbSet.dbContext.serverTimezone; }
        get entityType() { return this._dbSet.entityType; }
        get dbSet() { return this._dbSet; }
        get dbSetName() { return this._dbSet.dbSetName; }
        get queryName() { return this.__queryInfo.methodName; }
        get filterInfo() { return this._filterInfo; }
        get sortInfo() { return this._sortInfo; }
        get isIncludeTotalCount() { return this._isIncludeTotalCount; }
        set isIncludeTotalCount(v: boolean) { this._isIncludeTotalCount = v; }
        get isClearPrevData() { return this._isClearPrevData; }
        set isClearPrevData(v: boolean) { this._isClearPrevData = v; }
        get pageSize() { return this._pageSize; }
        set pageSize(v: number) {
            if (this._pageSize != v) {
                this._pageSize = v;
            }
        }
        get pageIndex() { return this._pageIndex; }
        set pageIndex(v: number) {
            if (this._pageIndex != v) {
                this._pageIndex = v;
            }
        }
        get params() { return this._params; }
        set params(v: any) {
            if (this._params !== v) {
                this._params = v;
                this._cacheInvalidated = true;
            }
        }
        get isPagingEnabled() { return this._pageIndex >= 0 && this._dbSet.isPagingEnabled; }
        set isPagingEnabled(v: boolean) {
            if (this.isPagingEnabled != v) {
                if (this._dbSet.isPagingEnabled) {
                    this._pageIndex = !v ? -1 : this._dbSet.pageIndex;
                }
                else {
                    if (!!v) {
                        var err = new Error("Paging is disabled on the server side and can not be enabled here.");
                        this._dbSet.handleError(err, this);
                        RIAPP.throwDummy(err);
                    }
                }
            }
        }
        get loadPageCount() { return this._loadPageCount; }
        set loadPageCount(v: number) {
            if (v < 1) {
                v = 1;
            }
            if (this._loadPageCount != v) {
                this._loadPageCount = v;
                if (v === 1) {
                    this._clearCache();
                }
                this.raisePropertyChanged(PROP_NAME.loadPageCount);
            }
        }
        get isClearCacheOnEveryLoad() { return this._isClearCacheOnEveryLoad; }
        set isClearCacheOnEveryLoad(v) {
            if (this._isClearCacheOnEveryLoad != v) {
                this._isClearCacheOnEveryLoad = v;
                this.raisePropertyChanged(PROP_NAME.isClearCacheOnEveryLoad);
            }
        }
        get isCacheValid() { return !!this._dataCache && !this._cacheInvalidated; }
    }

    export class TDataQuery extends DataQuery<IEntityItem>{
    }

    var ENTITYASPECT_EVENTS = {
        destroyed: 'destroyed'
    };


    export class EntityAspect<TItem extends IEntityItem, TDbContext extends DbContext> extends collMOD.ItemAspect<TItem> {
        private __srvKey: string;
        private _isRefreshing: boolean;
        private _isCached: boolean;
        private _origVals: IIndexer<any>;
        private _savedStatus: collMOD.STATUS;
        protected _item: TItem;

        constructor(dbSet: DbSet<TItem, TDbContext>, itemType: IEntityConstructor<TItem>, row: IRowData, names: IFieldName[]) {
            super(dbSet);
            var self = this;
            this.__srvKey = null;
            this._isRefreshing = false;
            this._isCached = false;
            this._origVals = null;
            this._savedStatus = null;
            var fieldInfos = this.dbSet.getFieldInfos(), fld: IFieldInfo;
            for (var i = 0, len = fieldInfos.length; i < len; i += 1) {
                fld = fieldInfos[i];
                if (fld.fieldType != constsMOD.FIELD_TYPE.Object) {
                    self._vals[fld.fieldName] = null;
                }
                else {
                    //object field
                    collMOD.fn_traverseField(fld, (name, f) => {
                        if (f.fieldType == constsMOD.FIELD_TYPE.Object)
                            baseUtils.setValue(self._vals, name, {}, false);
                        else
                            baseUtils.setValue(self._vals, name, null, false);
                    });
                }

            }
            this._initRowInfo(row, names);
            this._item = new itemType(this);
        }
        private _fakeDestroy() {
            if (this._isDestroyCalled || !this._item)
                return;
            this.raiseEvent(ENTITYASPECT_EVENTS.destroyed, {});
            this._item.raiseEvent(ENTITYASPECT_EVENTS.destroyed, {});
            this.removeNSHandlers(null);
            this._item.removeNSHandlers(null);
        }
        protected _initRowInfo(row: IRowData, names: IFieldName[]) {
            if (!row)
                return;
            this.__srvKey = row.k;
            this.key = row.k;
            this._processValues('', row.v, names);
        }
        protected _processValues(path: string, values: any[], names: IFieldName[]) {
            var self = this, stz = self.serverTimezone;
            values.forEach(function (value, index) {
                var name: IFieldName = names[index], fieldName = path + name.n, fld = self.dbSet.getFieldInfo(fieldName), val: any;
                if (!fld)
                    throw new Error(baseUtils.format(RIAPP.ERRS.ERR_DBSET_INVALID_FIELDNAME, self.dbSetName, fieldName));

                if (fld.fieldType == constsMOD.FIELD_TYPE.Object) {
                    //for object fields the value should be an array of values - recursive processing
                    self._processValues(fieldName + '.', <any[]>value, name.p);
                }
                else {
                    //for other fields the value is a string, which is parsed to a typed value
                    val = valueUtils.parseValue(value, fld.dataType, fld.dateConversion, stz);
                    baseUtils.setValue(self._vals, fieldName, val, false);
                }
            });
        }
        protected _onFieldChanged(fieldName: string, fieldInfo: IFieldInfo) {
            var self = this;
            if (this._isDestroyCalled)
                return;
            self.getItem().raisePropertyChanged(fieldName);
            if (!!fieldInfo.dependents && fieldInfo.dependents.length > 0) {
                fieldInfo.dependents.forEach(function (d) {
                    self.getItem().raisePropertyChanged(d);
                });
            }
        }
        protected _getValueChange(fullName: string, fieldInfo: IFieldInfo, changedOnly: boolean): IValueChange {
            var self = this, dbSet = self.dbSet, res: IValueChange, i: number, len: number, tmp: IValueChange;
            if (fn_isNotSubmittable(fieldInfo))
                return <IValueChange>null;

            if (fieldInfo.fieldType == constsMOD.FIELD_TYPE.Object) {
                res = { fieldName: fieldInfo.fieldName, val: null, orig: null, flags: FLAGS.None, nested: [] };
                len = fieldInfo.nested.length;
                for (i = 0; i < len; i += 1) {
                    tmp = self._getValueChange(fullName + '.' + fieldInfo.nested[i].fieldName, fieldInfo.nested[i], changedOnly);
                    if (!!tmp) {
                        res.nested.push(tmp);
                    }
                }
            }
            else {
                var newVal = dbSet._getInternal().getStrValue(baseUtils.getValue(self._vals, fullName), fieldInfo),
                    oldV = self._origVals === null ? newVal : dbSet._getInternal().getStrValue(baseUtils.getValue(self._origVals, fullName), fieldInfo),
                    isChanged = (oldV !== newVal);
                if (isChanged)
                    res = { fieldName: fieldInfo.fieldName, val: newVal, orig: oldV, flags: (FLAGS.Changed | FLAGS.Setted), nested: null };
                else if (fieldInfo.isPrimaryKey > 0 || fieldInfo.fieldType == constsMOD.FIELD_TYPE.RowTimeStamp || fieldInfo.isNeedOriginal)
                    res = { fieldName: fieldInfo.fieldName, val: newVal, orig: oldV, flags: FLAGS.Setted, nested: null };
                else
                    res = { fieldName: fieldInfo.fieldName, val: null, orig: null, flags: FLAGS.None, nested: null };
            }

            if (changedOnly) {
                if (fieldInfo.fieldType == constsMOD.FIELD_TYPE.Object) {
                    if (res.nested.length > 0)
                        return res;
                    else
                        return null;
                }
                else if ((res.flags & FLAGS.Changed) === FLAGS.Changed)
                    return res;
                else
                    return null;
            }
            else {
                return res;
            }
        }
        protected _getValueChanges(changedOnly: boolean): IValueChange[] {
            var self = this, flds = this.dbSet.getFieldInfos();
            var res = flds.map((fld) => {
                return self._getValueChange(fld.fieldName, fld, changedOnly);
            });

            //remove nulls
            var res2 = res.filter((vc) => {
                return !!vc;
            });
            return res2;
        }
        protected _fldChanging(fieldName: string, fieldInfo: IFieldInfo, oldV: any, newV: any) {
            if (!this._origVals) {
                this._origVals = utils.cloneObj(this._vals);
            }
            return true;
        }
        protected _skipValidate(fieldInfo: IFieldInfo, val: any) {
            var childToParentNames = this.dbSet._getInternal().getChildToParentNames(fieldInfo.fieldName), res = false;
            if (!!childToParentNames && val === null) {
                for (var i = 0, len = childToParentNames.length; i < len; i += 1) {
                    res = !!this._getFieldVal(childToParentNames[i]);
                    if (res)
                        break;
                }
            }
            return res;
        }
        protected _beginEdit() {
            if (!super._beginEdit())
                return false;
            this._savedStatus = this.status;
            return true;
        }
        protected _endEdit() {
            if (!super._endEdit())
                return false;
            this._savedStatus = null;
            return true;
        }
        protected _cancelEdit() {
            if (!this._isEditing)
                return false;
            var self = this, changes = this._getValueChanges(true), isNew = this.isNew, dbSet = this.dbSet;
            this._vals = this._saveVals;
            this._saveVals = null;
            this.setStatus(this._savedStatus);
            this._savedStatus = null;
            dbSet._getInternal().removeAllErrors(this.getItem());
            changes.forEach(function (v) {
                var fld = self.dbSet.getFieldInfo(v.fieldName);
                if (!fld)
                    throw new Error(baseUtils.format(RIAPP.ERRS.ERR_DBSET_INVALID_FIELDNAME, self.dbSetName, v.fieldName));
                self._onFieldChanged(v.fieldName, fld);
            });
            this._isEditing = false;
            if (isNew && this._notEdited) {
                dbSet.removeItem(this.getItem());
            }
            return true;
        }
        protected getDbSet() {
            return this.dbSet;
        }
        protected setStatus(v: collMOD.STATUS) {
            if (this._status !== v) {
                var oldStatus = this._status;
                this._status = v;
                if (v !== collMOD.STATUS.NONE)
                    this.dbSet._getInternal().addToChanged(this.getItem());
                else
                    this.dbSet._getInternal().removeFromChanged(this.key);
                this.dbSet._getInternal().onItemStatusChanged(this.getItem(), oldStatus);
            }
        }
        _updateKeys(srvKey: string) {
            this.__srvKey = srvKey;
            this.key = srvKey;
        }
        _checkCanRefresh() {
            if (this.key === null || this.status === collMOD.STATUS.ADDED) {
                throw new Error(RIAPP.ERRS.ERR_OPER_REFRESH_INVALID);
            }
        }
        _refreshValue(val: any, fullName: string, refreshMode: REFRESH_MODE) {
            var self = this, fld = self.dbSet.getFieldInfo(fullName);
            if (!fld)
                throw new Error(baseUtils.format(RIAPP.ERRS.ERR_DBSET_INVALID_FIELDNAME, self.dbSetName, fullName));
            var stz = self.serverTimezone, newVal: any, oldVal: any, oldValOrig: any, dataType = fld.dataType, dcnv = fld.dateConversion;
            newVal = valueUtils.parseValue(val, dataType, dcnv, stz);
            oldVal = baseUtils.getValue(self._vals, fullName);
            switch (refreshMode) {
                case REFRESH_MODE.CommitChanges:
                    {
                        if (!valueUtils.compareVals(newVal, oldVal, dataType)) {
                            baseUtils.setValue(self._vals, fullName, newVal, false);
                            self._onFieldChanged(fullName, fld);
                        }
                    }
                    break;
                case REFRESH_MODE.RefreshCurrent:
                    {
                        if (!!self._origVals) {
                            baseUtils.setValue(self._origVals, fullName, newVal, false);
                        }
                        if (!!self._saveVals) {
                            baseUtils.setValue(self._saveVals, fullName, newVal, false);
                        }
                        if (!valueUtils.compareVals(newVal, oldVal, dataType)) {
                            baseUtils.setValue(self._vals, fullName, newVal, false);
                            self._onFieldChanged(fullName, fld);
                        }
                    }
                    break;
                case REFRESH_MODE.MergeIntoCurrent:
                    {
                        if (!!self._origVals) {
                            oldValOrig = baseUtils.getValue(self._origVals, fullName);
                            baseUtils.setValue(self._origVals, fullName, newVal, false);
                        }
                        if (oldValOrig === undefined || valueUtils.compareVals(oldValOrig, oldVal, dataType)) {
                            //unmodified
                            if (!valueUtils.compareVals(newVal, oldVal, dataType)) {
                                baseUtils.setValue(self._vals, fullName, newVal, false);
                                self._onFieldChanged(fullName, fld);
                            }
                        }
                    }
                    break;
                default:
                    throw new Error(baseUtils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'refreshMode', refreshMode));
            }
        }
        _refreshValues(rowInfo: IRowInfo, refreshMode: REFRESH_MODE) {
            var self = this, oldStatus = this.status;
            if (!this._isDestroyed) {
                if (!refreshMode) {
                    refreshMode = REFRESH_MODE.RefreshCurrent;
                }
                rowInfo.values.forEach(function (val) {
                    fn_traverseChanges(val, (fullName, vc) => {
                        if (!((vc.flags & FLAGS.Refreshed) === FLAGS.Refreshed))
                            return;
                        self._refreshValue(vc.val, fullName, refreshMode);
                    });
                });

                if (oldStatus === collMOD.STATUS.UPDATED) {
                    var changes = this._getValueChanges(true);
                    if (changes.length === 0) {
                        this._origVals = null;
                        this.setStatus(collMOD.STATUS.NONE);
                    }
                }
            }
        }
        _getRowInfo() {
            var res: IRowInfo = {
                values: this._getValueChanges(false),
                changeType: this.status,
                serverKey: this._srvKey,
                clientKey: this.key,
                error: null
            };
            return res;
        }
        _getCalcFieldVal(fieldName: string) {
            if (this._isDestroyCalled)
                return null;
            return this.dbSet._getInternal().getCalcFieldVal(fieldName, this.getItem());
        }
        _getNavFieldVal(fieldName: string) {
            if (this._isDestroyCalled) {
                return null;
            }
            return this.dbSet._getInternal().getNavFieldVal(fieldName, this.getItem());
        }
        _setNavFieldVal(fieldName: string, value: any) {
            var dbSet = this.dbSet
            dbSet._getInternal().setNavFieldVal(fieldName, this.getItem(), value)
        }
        _clearFieldVal(fieldName: string) {
            baseUtils.setValue(this._vals, fieldName, null, false);
        }
        _getFieldVal(fieldName: string) {
            if (this._isDestroyCalled)
                return null;
            return baseUtils.getValue(this._vals, fieldName);
        }
        _setFieldVal(fieldName: string, val: any): boolean {
            var validation_error: IValidationInfo, error: any, dbSetName = this.dbSetName, dbSet = this.dbSet,
                ERRS = RIAPP.ERRS, oldV = this._getFieldVal(fieldName), newV = val,
                fieldInfo = this.getFieldInfo(fieldName), res = false;
            if (!fieldInfo)
                throw new Error(baseUtils.format(ERRS.ERR_DBSET_INVALID_FIELDNAME, dbSetName, fieldName));
            if (!this._isEditing && !this.isUpdating)
                this.beginEdit();
            try {
                newV = this._checkVal(fieldInfo, newV);
                if (oldV != newV) {
                    if (this._fldChanging(fieldName, fieldInfo, oldV, newV)) {
                        baseUtils.setValue(this._vals, fieldName, newV, false);
                        if (!(fieldInfo.fieldType == constsMOD.FIELD_TYPE.ClientOnly || fieldInfo.fieldType == constsMOD.FIELD_TYPE.ServerCalculated)) {
                            switch (this.status) {
                                case collMOD.STATUS.NONE:
                                    this.setStatus(collMOD.STATUS.UPDATED);
                                    break;
                            }
                        }
                        this._onFieldChanged(fieldName, fieldInfo);
                        res = true;
                    }
                }
                dbSet._getInternal().removeError(this.getItem(), fieldName);
                validation_error = this._validateField(fieldName);
                if (!!validation_error) {
                    throw new ValidationError([validation_error], this);
                }
            } catch (ex) {
                if (ex instanceof ValidationError) {
                    error = ex;
                }
                else {
                    error = new ValidationError([
                        { fieldName: fieldName, errors: [ex.message] }
                    ], this);
                }
                dbSet._getInternal().addError(this.getItem(), fieldName, error.errors[0].errors);
                throw error;
            }
            return res;
        }
        _acceptChanges(rowInfo?: IRowInfo): void {
            var oldStatus = this.status, dbSet = this.dbSet, internal = dbSet._getInternal();
            if (this.key === null)
                return;
            if (oldStatus !== collMOD.STATUS.NONE) {
                internal.onCommitChanges(this.getItem(), true, false, oldStatus);
                if (oldStatus === collMOD.STATUS.DELETED) {
                    dbSet.removeItem(this.getItem());
                    return;
                }
                this._origVals = null;
                if (!!this._saveVals)
                    this._saveVals = utils.cloneObj(this._vals);
                this.setStatus(collMOD.STATUS.NONE);
                internal.removeAllErrors(this.getItem());
                if (!!rowInfo)
                    this._refreshValues(rowInfo, REFRESH_MODE.CommitChanges);
                internal.onCommitChanges(this.getItem(), false, false, oldStatus);
            }
        }
        _onAttaching(): void {
            super._onAttaching();
            this._status = collMOD.STATUS.ADDED;
        }
        _onAttach(): void {
            super._onAttach();
            if (this.key === null)
                throw new Error(RIAPP.ERRS.ERR_ITEM_IS_DETACHED);
            this.dbSet._getInternal().addToChanged(this.getItem());
        }
        deleteItem(): boolean {
            return this.deleteOnSubmit();
        }
        deleteOnSubmit(): boolean {
            var oldStatus = this.status, dbSet = this.dbSet, args: collMOD.ICancellableArgs<TItem> = { item: this.getItem(), isCancel: false };
            dbSet._getInternal().onItemDeleting(args);
            if (args.isCancel) {
                return false;
            }
            if (this.key === null)
                return false;
            if (oldStatus === collMOD.STATUS.ADDED) {
                dbSet.removeItem(this.getItem());
                return true;
            }
            this.setStatus(collMOD.STATUS.DELETED);
            return true;
        }
        acceptChanges(): void {
            this._acceptChanges(null);
        }
        rejectChanges(): void {
            var self = this, oldStatus = self.status, dbSet = self.dbSet, internal = dbSet._getInternal();
            if (!self.key)
                return;
            if (oldStatus !== collMOD.STATUS.NONE) {
                internal.onCommitChanges(self.getItem(), true, true, oldStatus);
                if (oldStatus === collMOD.STATUS.ADDED) {
                    dbSet.removeItem(this.getItem());
                    return;
                }

                var changes = self._getValueChanges(true);
                if (!!self._origVals) {
                    self._vals = utils.cloneObj(self._origVals);
                    self._origVals = null;
                    if (!!self._saveVals) {
                        self._saveVals = utils.cloneObj(self._vals);
                    }
                }
                self.setStatus(collMOD.STATUS.NONE);
                internal.removeAllErrors(this.getItem());
                changes.forEach(function (v) {
                    fn_traverseChanges(v, (fullName, vc) => {
                        self._onFieldChanged(fullName, dbSet.getFieldInfo(fullName));
                    });
                });
                internal.onCommitChanges(this.getItem(), false, true, oldStatus);
            }
        }
        submitChanges(): IVoidPromise {
            var dbxt = this.dbSet.dbContext, uniqueID = utils.uuid();
            dbxt.addOnSubmitError(function (sender, args) {
                if (args.error instanceof db.SubmitError) {
                    var submitErr: db.SubmitError = args.error;
                    if (submitErr.notValidated.length > 0) {
                        //don't reject changes,so the user can see errors in the edit dialog
                        args.isHandled = true;
                    }
                }
            }, uniqueID);

            var promise = dbxt.submitChanges();
            promise.always(function () {
                dbxt.removeOnSubmitError(uniqueID);
            });
            return promise;
        }
        refresh(): IPromise<TItem> {
            var dbxt = this.dbSet.dbContext;
            return dbxt._getInternal().refreshItem(this.getItem());
        }
        getItem(): TItem {
            return this._item;
        }
        toString() {
            return 'EntityAspect';
        }
        destroy() {
            if (this._isDestroyed)
                return;
            if (this.isCached) {
                this._fakeDestroy();
                return;
            }
            this._isDestroyCalled = true;
            this.__srvKey = null;
            this._origVals = null;
            this._savedStatus = null;
            this._isRefreshing = false;
            this._isCached = false;
            super.destroy();
            this._item = null;
        }
        get _entityType() { return this.dbSet.entityType; }
        get _srvKey(): string { return this.__srvKey; }
        get isCanSubmit(): boolean { return true; }
        get isNew(): boolean { return this._status === collMOD.STATUS.ADDED; }
        get isDeleted(): boolean { return this._status === collMOD.STATUS.DELETED; }
        get dbSetName() { return this.dbSet.dbSetName; }
        get serverTimezone() { return this.dbSet.dbContext.serverTimezone; }
        get dbSet() { return <DbSet<TItem, TDbContext>>this.collection; }
        get isRefreshing(): boolean { return this._isRefreshing; }
        set isRefreshing(v: boolean) {
            if (this._isRefreshing !== v) {
                this._isRefreshing = v;
                this.raisePropertyChanged(PROP_NAME.isRefreshing);
            }
        }
        get isCached(): boolean { return this._isCached; }
        set isCached(v: boolean) { this._isCached = v; }
    }

    export interface IDbSetLoadedArgs<TItem extends IEntityItem> { items: TItem[]; }

    export interface IInternalDbSetMethods<TItem extends IEntityItem> extends collMOD.IInternalCollMethods<TItem> {
        getCalcFieldVal(fieldName: string, item: IEntityItem): any;
        getNavFieldVal(fieldName: string, item: IEntityItem): any;
        setNavFieldVal(fieldName: string, item: IEntityItem, value: any): void;
        beforeLoad(query: DataQuery<TItem>, oldQuery: DataQuery<TItem>): void;
        updatePermissions(perms: IPermissions): void;
        getChildToParentNames(childFieldName: string): string[];
        fillFromService(data: { res: IQueryResponse; isPageChanged: boolean; fn_beforeFillEnd: () => void; }): IQueryResult<TItem>;
        fillFromCache(data: { isPageChanged: boolean; fn_beforeFillEnd: () => void; }): IQueryResult<TItem>;
        commitChanges(rows: IRowInfo[]): void;
        setItemInvalid(row: IRowInfo): TItem;
        getChanges(): IRowInfo[];
        getTrackAssocInfo(): ITrackAssoc[];
        addToChanged(item: TItem): void;
        removeFromChanged(key: string): void;
        onItemStatusChanged(item: TItem, oldStatus: collMOD.STATUS): void;
    }

    var DBSET_EVENTS = {
        loaded: 'loaded'
    };

    export class DbSet<TItem extends IEntityItem, TDbContext extends DbContext> extends collMOD.BaseCollection<TItem> {
        private _dbContext: TDbContext;
        private _isSubmitOnDelete: boolean;
        private _trackAssoc: { [name: string]: IAssociationInfo; };
        private _trackAssocMap: { [childFieldName: string]: string[]; };
        private _childAssocMap: { [fieldName: string]: IAssociationInfo; };
        private _parentAssocMap: { [fieldName: string]: IAssociationInfo; };
        private _changeCount: number;
        private _changeCache: { [key: string]: TItem; };
        protected _options: IDbSetOptions;
        protected _navfldMap: { [fieldName: string]: INavFieldImpl<TItem>; };
        protected _calcfldMap: { [fieldName: string]: ICalcFieldImpl<TItem>; };
        protected _itemsByKey: { [key: string]: TItem; };
        protected _entityType: IEntityConstructor<TItem>;
        protected _ignorePageChanged: boolean;
        protected _query: DataQuery<TItem>;

        constructor(opts: IDbSetConstuctorOptions, entityType: IEntityConstructor<TItem>) {
            super();
            var self = this, dbContext = opts.dbContext, dbSetInfo = opts.dbSetInfo, fieldInfos = dbSetInfo.fieldInfos;
            this._dbContext = <TDbContext>dbContext;
            this._options.dbSetName = dbSetInfo.dbSetName;
            this._options.enablePaging = dbSetInfo.enablePaging;
            this._options.pageSize = dbSetInfo.pageSize;
            this._query = null;
            this._entityType = entityType;
            this._isSubmitOnDelete = false;
            this._navfldMap = {};
            this._calcfldMap = {};
            this._fieldInfos = fieldInfos;

            //association infos maped by name
            //we should track changes in navigation properties for this associations
            this._trackAssoc = {};
            //map childToParentName by childField as a key
            this._trackAssocMap = {};
            //map association infos by childToParent fieldname
            this._childAssocMap = {};
            //map association infos by parentToChildren fieldname
            this._parentAssocMap = {};

            this._changeCount = 0;
            this._changeCache = {};
            this._ignorePageChanged = false;
            fieldInfos.forEach(function (f) {
                self._fieldMap[f.fieldName] = f;
                collMOD.fn_traverseField(f, (fullName, fld) => {
                    fld.dependents = [];
                    fld.fullName = fullName;
                });
            });

            fieldInfos.forEach(function (f) {
                collMOD.fn_traverseField(f, (fullName, fld) => {
                    if (fld.fieldType == constsMOD.FIELD_TYPE.Navigation) {
                        //navigation fields can NOT be on nested fields
                        self._navfldMap[fld.fieldName] = self._doNavigationField(opts, fld);
                    }
                    else if (fld.fieldType == constsMOD.FIELD_TYPE.Calculated) {
                        //calculated fields can be on nested fields
                        baseUtils.setValue(self._calcfldMap, fullName, self._doCalculatedField(opts, fld), true);
                    }
                });
            });

            self._mapAssocFields();
            Object.freeze(this._perms);
            var internalObj = {
                getCalcFieldVal: (fieldName: string, item: TItem) => {
                    return self._getCalcFieldVal(fieldName, item);
                },
                getNavFieldVal: (fieldName: string, item: TItem) => {
                    return self._getNavFieldVal(fieldName, item);
                },
                setNavFieldVal: (fieldName: string, item: TItem, value: any) => {
                    self._setNavFieldVal(fieldName, item, value);
                },
                beforeLoad: (query: DataQuery<TItem>, oldQuery: DataQuery<TItem>) => {
                    self._beforeLoad(query, oldQuery);
                },
                updatePermissions: (perms: IPermissions) => {
                    self._updatePermissions(perms);
                },
                getChildToParentNames: (childFieldName: string) => {
                    return self._getChildToParentNames(childFieldName);
                },
                fillFromService: (data: { res: IQueryResponse; isPageChanged: boolean; fn_beforeFillEnd: () => void; }) => {
                    return self._fillFromService(data);
                },
                fillFromCache: (data: { isPageChanged: boolean; fn_beforeFillEnd: () => void; }) => {
                    return self._fillFromCache(data);
                },
                commitChanges: (rows: IRowInfo[]) => {
                    self._commitChanges(rows);
                },
                setItemInvalid: (row: IRowInfo) => {
                    return self._setItemInvalid(row);
                },
                getChanges: () => {
                    return self._getChanges();
                },
                getTrackAssocInfo: () => {
                    return self._getTrackAssocInfo();
                },
                addToChanged: (item: TItem) => {
                    self._addToChanged(item);
                },
                removeFromChanged: (key: string) => {
                    self._removeFromChanged(key);
                },
                onItemStatusChanged: (item: TItem, oldStatus: collMOD.STATUS) => {
                    self._onItemStatusChanged(item, oldStatus);
                }
            };
            utils.mergeObj(internalObj, this._internal);
        }
        handleError(error: any, source: any): boolean {
            return this.dbContext.handleError(error, source);
        }
        protected _getEventNames() {
            var base_events = super._getEventNames();
            return [DBSET_EVENTS.loaded].concat(base_events);
        }
        protected _mapAssocFields() {
            var trackAssoc = this._trackAssoc, assoc: IAssociationInfo, tasKeys = Object.keys(trackAssoc),
                frel: { childField: string; parentField: string; },
                trackAssocMap = this._trackAssocMap;
            for (var i = 0, len = tasKeys.length; i < len; i += 1) {
                assoc = trackAssoc[tasKeys[i]];
                for (var j = 0, len2 = assoc.fieldRels.length; j < len2; j += 1) {
                    frel = assoc.fieldRels[j];
                    if (!utils.check.isArray(trackAssocMap[frel.childField])) {
                        trackAssocMap[frel.childField] = [assoc.childToParentName];
                    }
                    else {
                        trackAssocMap[frel.childField].push(assoc.childToParentName);
                    }
                }
            }
        }
        protected _doNavigationField(opts: IDbSetConstuctorOptions, fieldInfo: IFieldInfo): INavFieldImpl<TItem> {
            var self = this, isChild = true, result: INavFieldImpl<TItem> = { getFunc: (item) => { throw new Error('Function is not implemented'); }, setFunc: function (v: any) { throw new Error('Function is not implemented'); } };
            var assocs = opts.childAssoc.filter(function (a) {
                return a.childToParentName == fieldInfo.fieldName;
            });

            if (assocs.length === 0) {
                assocs = opts.parentAssoc.filter(function (a) {
                    return a.parentToChildrenName == fieldInfo.fieldName;
                });
                isChild = false;
            }

            if (assocs.length != 1)
                throw new Error(baseUtils.format(RIAPP.ERRS.ERR_PARAM_INVALID_TYPE, 'assocs', 'Array'));
            var assocName = assocs[0].name;
            fieldInfo.isReadOnly = true;
            if (isChild) {
                fieldInfo.isReadOnly = false;
                self._childAssocMap[assocs[0].childToParentName] = assocs[0];
                assocs[0].fieldRels.forEach(function (frel) {
                    var chf = self.getFieldInfo(frel.childField);
                    if (!fieldInfo.isReadOnly && chf.isReadOnly) {
                        fieldInfo.isReadOnly = true;
                    }
                });
                //this property should return parent
                result.getFunc = function (item: TItem) {
                    var assoc = self.dbContext.getAssociation(assocName);
                    return assoc.getParentItem(item);
                };

                if (!fieldInfo.isReadOnly) {
                    //should track this association for new items parent - child relationship changes
                    self._trackAssoc[assocName] = assocs[0];

                    result.setFunc = function (v) {
                        var entity: TItem = this, i: number, len: number, assoc = self.dbContext.getAssociation(assocName);
                        if (!!v && !(v instanceof assoc.parentDS.entityType)) {
                            throw new Error(baseUtils.format(RIAPP.ERRS.ERR_PARAM_INVALID_TYPE, 'value', assoc.parentDS.dbSetName));
                        }
                        if (!!v && !!v._aspect && (<IEntityItem>v)._aspect.isNew) {
                            entity._aspect._setFieldVal(fieldInfo.fieldName, (<IEntityItem>v)._key);
                        }
                        else if (!!v) {
                            for (i = 0, len = assoc.childFldInfos.length; i < len; i += 1) {
                                (<any>entity)[assoc.childFldInfos[i].fieldName] = v[assoc.parentFldInfos[i].fieldName];
                            }
                        }
                        else {
                            var oldKey = entity._aspect._getFieldVal(fieldInfo.fieldName);
                            if (!!oldKey) {
                                entity._aspect._setFieldVal(fieldInfo.fieldName, null);
                            }
                            for (i = 0, len = assoc.childFldInfos.length; i < len; i += 1) {
                                (<any>entity)[assoc.childFldInfos[i].fieldName] = null;
                            }
                        }
                    }
                }
            } //if (isChild)
            else {
                self._parentAssocMap[assocs[0].parentToChildrenName] = assocs[0];
              //returns items children
                result.getFunc = function (item: TItem) {
                    return self.dbContext.getAssociation(assocName).getChildItems(item);
                };
            }
            return result;
        }
        protected _doCalculatedField(opts: IDbSetConstuctorOptions, fieldInfo: IFieldInfo): ICalcFieldImpl<TItem> {
            var self = this, result: ICalcFieldImpl<TItem> = { getFunc: (item) => { throw new Error(utils.format("Calculated field:'{0}' is not initialized", fieldInfo.fieldName)); } };
            function doDependences(info: IFieldInfo) {
                if (!info.dependentOn)
                    return;
                var deps: string[] = info.dependentOn.split(',');
                deps.forEach(function (depOn) {
                    var depOnFld = self.getFieldInfo(depOn);
                    if (!depOnFld)
                        throw new Error(utils.format(RIAPP.ERRS.ERR_CALC_FIELD_DEFINE, depOn));
                    if (info === depOnFld)
                        throw new Error(utils.format(RIAPP.ERRS.ERR_CALC_FIELD_SELF_DEPEND, depOn));
                    if (depOnFld.dependents.indexOf(info.fullName) < 0) {
                        depOnFld.dependents.push(info.fullName);
                    }
                });
            };
            fieldInfo.isReadOnly = true;
            if (!!fieldInfo.dependentOn) {
                doDependences(fieldInfo);
            }
            return result;
        }
        protected _refreshValues(path: string, item: IEntityItem, values: any[], names: IFieldName[], rm: REFRESH_MODE): void {
            var self = this;
            values.forEach(function (value, index) {
                var name: IFieldName = names[index], fieldName = path + name.n, fld = self.getFieldInfo(fieldName);
                if (!fld)
                    throw new Error(baseUtils.format(RIAPP.ERRS.ERR_DBSET_INVALID_FIELDNAME, self.dbSetName, fieldName));

                if (fld.fieldType == constsMOD.FIELD_TYPE.Object) {
                    //for object fields the value should be an array of values - recursive processing
                    self._refreshValues(fieldName + '.', item, <any[]>value, name.p, rm);
                }
                else {
                    //for other fields the value is a string
                    item._aspect._refreshValue(value, fieldName, rm);
                }
            });
        }
        protected _setCurrentItem(v: TItem) {
            if (!!v && !(v instanceof this._entityType)) {
                throw new Error(baseUtils.format(RIAPP.ERRS.ERR_PARAM_INVALID_TYPE, 'currentItem', this._options.dbSetName));
            }
            super._setCurrentItem(v);
        }
        protected _getNewKey(item: TItem) {
            //client's item ID
            var key = 'clkey_' + this._newKey;
            this._newKey += 1;
            return key;
        }
        protected _createNew(): TItem {
            var aspect = new EntityAspect<TItem, TDbContext>(this, this._entityType, null, null);
            var item = aspect.getItem();
            aspect.key = this._getNewKey(item);
            return item;
        }
        protected _clearChangeCache() {
            var old = this._changeCount;
            this._changeCache = {};
            this._changeCount = 0;
            if (old !== this._changeCount)
                this.raisePropertyChanged(PROP_NAME.isHasChanges);
        }
        protected _onPageChanging() {
            var res = super._onPageChanging();
            if (!res) {
                return res;
            }
            if (this.isHasChanges) {
                this.rejectChanges();
            }
            return res;
        }
        protected _onPageChanged() {
            this.cancelEdit();
            super._onPageChanged();
            if (this._ignorePageChanged)
                return;
            this.query.pageIndex = this.pageIndex;
            this.dbContext._getInternal().load(this.query, true);
        }
        protected _onPageSizeChanged() {
            super._onPageSizeChanged();
            if (!!this._query)
                this._query.pageSize = this.pageSize;
        }
        protected _defineCalculatedField(fullName: string, getFunc: (item: TItem) => any) {
            var calcDef: ICalcFieldImpl<TItem> = baseUtils.getValue(this._calcfldMap, fullName);
            if (!calcDef) {
                throw new Error(baseUtils.format(ERRS.ERR_PARAM_INVALID, 'calculated fieldName', fullName));
            }
            calcDef.getFunc = getFunc;
        }
        protected _onLoaded(items: TItem[]) {
            this.raiseEvent(DBSET_EVENTS.loaded, { items: items });
        }
        protected _getStrValue(val: any, fieldInfo: IFieldInfo) {
            var dcnv = fieldInfo.dateConversion, stz = this.dbContext.serverTimezone;
            return valueUtils.stringifyValue(val, dcnv, fieldInfo.dataType, stz);
        }
        protected _getCalcFieldVal(fieldName: string, item: TItem): any {
            var val: ICalcFieldImpl<TItem> = baseUtils.getValue(this._calcfldMap, fieldName);
            return val.getFunc.call(item, item);
        }
        protected _getNavFieldVal(fieldName: string, item: TItem): any {
            var val: INavFieldImpl<TItem> = baseUtils.getValue(this._navfldMap, fieldName);
            return val.getFunc.call(item, item);
        }
        protected _setNavFieldVal(fieldName: string, item: TItem, value: any): void {
            var val: INavFieldImpl<TItem> = baseUtils.getValue(this._navfldMap, fieldName);
            val.setFunc.call(item, value);
        }
        protected _beforeLoad(query: DataQuery<TItem>, oldQuery: DataQuery<TItem>): void {
            if (query && oldQuery !== query) {
                this._query = query;
                this.pageIndex = 0;
            }
            if (!!oldQuery && oldQuery !== query) {
                oldQuery.destroy();
            }

            if (query.pageSize !== this.pageSize) {
                this._ignorePageChanged = true;
                try {
                    this.pageIndex = 0;
                    this.pageSize = query.pageSize;
                }
                finally {
                    this._ignorePageChanged = false;
                }
            }

            if (query.pageIndex !== this.pageIndex) {
                this._ignorePageChanged = true;
                try {
                    this.pageIndex = query.pageIndex;
                }
                finally {
                    this._ignorePageChanged = false;
                }
            }

            if (!query.isCacheValid) {
                query._getInternal().clearCache();
            }
        }
        protected _updatePermissions(perms: IPermissions): void {
            this._perms = perms;
        }
        protected _getChildToParentNames(childFieldName: string): string[] { return this._trackAssocMap[childFieldName]; }
        protected _fillFromService(data: { res: IQueryResponse; isPageChanged: boolean; fn_beforeFillEnd: () => void; }): IQueryResult<TItem> {
            data = utils.extend(false, {
                res: { names: [], rows: [], pageIndex: null, pageCount: null, dbSetName: this.dbSetName, totalCount: null },
                isPageChanged: false,
                fn_beforeFillEnd: null
            }, data);

            var self = this, res = data.res, fieldNames = res.names, rows = res.rows || [], rowCount = rows.length,
                newItems: TItem[] = [], positions: number[] = [], items: TItem[] = [],
                selectedItems: TItem[] = [], fetchedItems: TItem[] = [],
                isPagingEnabled = this.isPagingEnabled, query = this.query, clearAll = true, dataCache: DataCache;

            this._onFillStart({ isBegin: true, rowCount: rowCount, time: new Date(), isPageChanged: data.isPageChanged });
            try {
                if (!!query) {
                    clearAll = query.isClearPrevData;
                    if (query.isClearCacheOnEveryLoad)
                        query._getInternal().clearCache();
                    if (clearAll) this.clear();
                    query._getInternal().reindexCache();
                    if (query.loadPageCount > 1 && isPagingEnabled) {
                        dataCache = query._getInternal().getCache();
                        if (query.isIncludeTotalCount && !utils.check.isNt(res.totalCount))
                            dataCache.totalCount = res.totalCount;
                    }
                }

                fetchedItems = rows.map(function (row) {
                    //row.key already a string value generated on server (no need to convert to string)
                    var key = row.k;
                    if (!key)
                        throw new Error(RIAPP.ERRS.ERR_KEY_IS_EMPTY);

                    var item = self._itemsByKey[key], aspect: EntityAspect<TItem, TDbContext>;
                    if (!item) {
                        if (!!dataCache) {
                            item = <TItem>dataCache.getItemByKey(key);
                        }
                        if (!item) {
                            aspect = new EntityAspect<TItem, TDbContext>(self, self._entityType, row, fieldNames);
                            item = aspect.getItem();
                        }
                        else {
                            self._refreshValues('', item, row.v, fieldNames, REFRESH_MODE.RefreshCurrent);
                        }
                    }
                    else {
                        self._refreshValues('', item, row.v, fieldNames, REFRESH_MODE.RefreshCurrent);
                    }
                    return item;
                });

                selectedItems = fetchedItems;

                if (!!query) {
                    if (query.isIncludeTotalCount && !utils.check.isNt(res.totalCount)) {
                        this.totalCount = res.totalCount;
                    }

                    if (query.loadPageCount > 1 && isPagingEnabled) {
                        dataCache.fillCache(res.pageIndex, fetchedItems);
                        var page = dataCache.getCachedPage(query.pageIndex);
                        if (!page)
                            selectedItems = [];
                        else
                            selectedItems = <TItem[]>page.items;
                    }
                }

                selectedItems.forEach(function (item) {
                    var oldItem = self._itemsByKey[item._key];
                    if (!oldItem) {
                        self._items.push(item);
                        positions.push(self._items.length - 1);
                        self._itemsByKey[item._key] = item;
                        newItems.push(item);
                        items.push(item);
                    }
                    else
                        items.push(oldItem);
                });

                if (newItems.length > 0) {
                    this._onCollectionChanged({ changeType: collMOD.COLL_CHANGE_TYPE.ADDED, items: newItems, pos: positions });
                    this._onCountChanged();
                }

                if (!!data.fn_beforeFillEnd) {
                    data.fn_beforeFillEnd();
                }

                this._onLoaded(fetchedItems);
            }
            finally {
                this._onFillEnd({
                    isBegin: false, rowCount: items.length, time: new Date(), resetUI: clearAll,
                    fetchedItems: items, newItems: newItems, isPageChanged: data.isPageChanged
                });
            }
            if (clearAll)
                this.moveFirst();
            return <IQueryResult<TItem>>{ fetchedItems: items, newItems: newItems, isPageChanged: data.isPageChanged, outOfBandData: data.res.extraInfo };
        }
        protected _fillFromCache(data: { isPageChanged: boolean; fn_beforeFillEnd: () => void; }): IQueryResult<TItem> {
            data = utils.extend(false, {
                isPageChanged: false,
                fn_beforeFillEnd: null
            }, data);
            var self = this, positions: number[] = [], fetchedItems: TItem[] = [], query = this.query;
            if (!query)
                throw new Error(utils.format(RIAPP.ERRS.ERR_ASSERTION_FAILED, 'query is not null'));
            var dataCache = query._getInternal().getCache(), cachedPage = dataCache.getCachedPage(query.pageIndex),
                items = !cachedPage ? <TItem[]>[] : <TItem[]>cachedPage.items;

            this._onFillStart({ isBegin: true, rowCount: items.length, time: new Date(), isPageChanged: data.isPageChanged });
            try {
                this.clear();
                this._items = items;

                items.forEach(function (item, index) {
                    self._itemsByKey[item._key] = item;
                    positions.push(index);
                    fetchedItems.push(item);
                });

                if (!!data.fn_beforeFillEnd) {
                    data.fn_beforeFillEnd();
                }

                if (fetchedItems.length > 0) {
                    this._onCollectionChanged({ changeType: collMOD.COLL_CHANGE_TYPE.ADDED, items: fetchedItems, pos: positions });
                    this._onCountChanged();
                }
            }
            finally {
                this._onFillEnd({
                    isBegin: false, rowCount: fetchedItems.length, time: new Date(), resetUI: true,
                    fetchedItems: fetchedItems, newItems: fetchedItems, isPageChanged: data.isPageChanged
                });
            }
            this.moveFirst();
            return { fetchedItems: fetchedItems, newItems: fetchedItems, isPageChanged: data.isPageChanged, outOfBandData: null };
        }
        protected _commitChanges(rows: IRowInfo[]): void {
            var self = this;

            rows.forEach(function (rowInfo) {
                var key = rowInfo.clientKey, item: TItem = self._itemsByKey[key];
                if (!item) {
                    throw new Error(baseUtils.format(RIAPP.ERRS.ERR_KEY_IS_NOTFOUND, key));
                }
                var itemStatus = item._aspect.status;
                item._aspect._acceptChanges(rowInfo);
                if (itemStatus === collMOD.STATUS.ADDED) {
                    //on insert
                    delete self._itemsByKey[key];
                    item._aspect._updateKeys(rowInfo.serverKey);
                    self._itemsByKey[item._key] = item;
                    self._onCollectionChanged({
                        changeType: collMOD.COLL_CHANGE_TYPE.REMAP_KEY,
                        items: [item],
                        old_key: key,
                        new_key: item._key
                    })
                }
            });
        }
        protected _setItemInvalid(row: IRowInfo): TItem {
            var keyMap = this._itemsByKey, item: TItem = keyMap[row.clientKey];
            var errors: any = {};
            row.invalid.forEach(function (err) {
                if (!err.fieldName)
                    err.fieldName = '*';
                if (!!errors[err.fieldName]) {
                    errors[err.fieldName].push(err.message);
                }
                else
                    errors[err.fieldName] = [err.message];
            });
            var res: RIAPP.IValidationInfo[] = [];
            utils.forEachProp(errors, function (fieldName) {
                res.push({ fieldName: fieldName, errors: (<any>errors)[fieldName] });
            });
            this._addErrors(item, res);
            return item;
        }
        protected _getChanges(): IRowInfo[] {
            var changes: IRowInfo[] = [];
            var csh = this._changeCache;
            utils.forEachProp(csh, function (key) {
                var item = csh[key];
                changes.push(item._aspect._getRowInfo());
            });
            return changes;
        }
        protected _getTrackAssocInfo(): ITrackAssoc[] {
            var self = this, res: ITrackAssoc[] = [];
            var csh: { [key: string]: IEntityItem; } = this._changeCache, assocNames = Object.keys(self._trackAssoc);
            utils.forEachProp(csh, function (key) {
                var item = csh[key];
                assocNames.forEach(function (assocName) {
                    var assocInfo = self._trackAssoc[assocName],
                        parentKey = item._aspect._getFieldVal(assocInfo.childToParentName),
                        childKey = item._key;
                    if (!!parentKey && !!childKey) {
                        res.push({ assocName: assocName, parentKey: parentKey, childKey: childKey });
                    }
                });
            });
            return res;
        }
        protected _addToChanged(item: TItem): void {
            if (item._key === null)
                return;
            if (!this._changeCache[item._key]) {
                this._changeCache[item._key] = item;
                this._changeCount += 1;
                if (this._changeCount === 1)
                    this.raisePropertyChanged(PROP_NAME.isHasChanges);
            }
        }
        protected _removeFromChanged(key: string): void {
            if (key === null)
                return;
            if (!!this._changeCache[key]) {
                delete this._changeCache[key];
                this._changeCount -= 1;
                if (this._changeCount === 0)
                    this.raisePropertyChanged(PROP_NAME.isHasChanges);
            }
        }
        //occurs when item Status Changed (not used in simple collections)
        protected _onItemStatusChanged(item: TItem, oldStatus: collMOD.STATUS): void {
            super._onItemStatusChanged(item, oldStatus);
            if (item._aspect.isDeleted && this.isSubmitOnDelete) {
                this.dbContext.submitChanges();
            }
        }
        protected _onRemoved(item: TItem, pos: number): void {
            this._removeFromChanged(item._key);
            super._onRemoved(item, pos);
        }
        //overrides base method
        _getInternal(): IInternalDbSetMethods<TItem> {
            return <IInternalDbSetMethods<TItem>>this._internal;
        }
        addOnLoaded(fn: TEventHandler<DbSet<TItem, TDbContext>, IDbSetLoadedArgs<TItem>>, nmspace?: string, context?: BaseObject) {
            this._addHandler(DBSET_EVENTS.loaded, fn, nmspace, context, false);
        }
        removeOnLoaded(nmspace?: string) {
            this._removeHandler(DBSET_EVENTS.loaded, nmspace);
        }
        getFieldInfo(fieldName: string): IFieldInfo {
            var assoc: IAssociationInfo, parentDB: DbSet<IEntityItem, DbContext>, parts = fieldName.split('.');
            var fld = this._fieldMap[parts[0]];
            if (parts.length == 1) {
                return fld;
            }

            if (fld.fieldType == constsMOD.FIELD_TYPE.Object) {
                for (var i = 1; i < parts.length; i += 1) {
                    fld = collMOD.fn_getPropertyByName(parts[i], fld.nested);
                }
                return fld;
            }
            else if (fld.fieldType == constsMOD.FIELD_TYPE.Navigation) {
                //for example Customer.Name
                assoc = this._childAssocMap[fld.fieldName];
                if (!!assoc) {
                    parentDB = this.dbContext.getDbSet(assoc.parentDbSetName);
                    return parentDB.getFieldInfo(parts.slice(1).join('.'));
                }
            }

            throw new Error(baseUtils.format(RIAPP.ERRS.ERR_DBSET_INVALID_FIELDNAME, this.dbSetName, fieldName));
        }
        sort(fieldNames: string[], sortOrder: collMOD.SORT_ORDER) {
            var ds = this, query = ds.query;
            if (!!query) {
                query.clearSort();
                for (var i = 0; i < fieldNames.length; i += 1) {
                    if (i == 0)
                        query.orderBy(fieldNames[i], sortOrder);
                    else
                        query.thenBy(fieldNames[i], sortOrder);
                }

                query.isClearPrevData = true;
                query.pageIndex = 0;
                return ds.dbContext.load(query);
            }
            else {
                return super.sort(fieldNames, sortOrder);
            }
        }
        //manually fill data from result when page is first loaded
        //from data stored inside page (without ajax request)
        //convenient for loading classifiers (for lookup data)
        fillItems(data: {
            names: IFieldName[];
            rows: IRowData[];
        }) {
            var res: IQueryResponse = utils.extend(false, {
                names: [],
                rows: [],
                pageIndex: (!!this.query) ? this.query.pageIndex : null,
                pageCount: null,
                dbSetName: this.dbSetName,
                totalCount: null,
                rowCount: data.rows.length,
                extraInfo: null,
                error: null,
                included: []
            }, data);

            var filldata = {
                res: res,
                isPageChanged: false,
                fn_beforeFillEnd: <() => void>null
            };
            this._fillFromService(filldata);
        }
        acceptChanges() {
            var csh = this._changeCache;
            utils.forEachProp(csh, function (key) {
                var item = csh[key];
                item._aspect.acceptChanges();
            });
            this._changeCount = 0;
        }
        rejectChanges() {
            var csh = this._changeCache;
            utils.forEachProp(csh, function (key) {
                var item = csh[key];
                item._aspect.rejectChanges();
            });
        }
        deleteOnSubmit(item: TItem) {
            item._aspect.deleteOnSubmit();
        }
        clear() {
            this._clearChangeCache();
            super.clear();
        }
        createQuery(name: string): DataQuery<TItem> {
            var queryInfo = this.dbContext._getInternal().getQueryInfo(name);
            if (!queryInfo) {
                throw new Error(baseUtils.format(RIAPP.ERRS.ERR_QUERY_NAME_NOTFOUND, name));
            }
            return new DataQuery<TItem>(this, queryInfo);
        }
        clearCache() {
            var query = this._query;
            if (!!query) {
                query._getInternal().clearCache();
            }
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            var query = this._query;
            this._query = null;
            if (!!query) {
                query.destroy();
            }
            this._navfldMap = {};
            this._calcfldMap = {};
            super.destroy();
        }
        toString() {
            return this._options.dbSetName;
        }
        get items() { return this._items; }
        get dbContext(): TDbContext {
            return this._dbContext;
        }
        get dbSetName() { return this._options.dbSetName; }
        get entityType() { return this._entityType; }
        get query() { return this._query; }
        get isHasChanges(): boolean { return this._changeCount > 0; }
        get cacheSize(): number {
            var query = this._query, dataCache: DataCache;
            if (!!query && query.isCacheValid) {
                dataCache = query._getInternal().getCache();
                return dataCache.cacheSize;
            }
            return 0;
        }
        get isSubmitOnDelete(): boolean { return this._isSubmitOnDelete; }
        set isSubmitOnDelete(v: boolean) {
            if (this._isSubmitOnDelete !== v) {
                this._isSubmitOnDelete = !!v;
                this.raisePropertyChanged(PROP_NAME.isSubmitOnDelete);
            }
        }
    }

    export class TDbSet extends DbSet<IEntityItem, DbContext>{
    }

    //implements a lazy initialization pattern for creation of DbSet's instances
    export class DbSets extends RIAPP.BaseObject {
        protected _dbSetNames: string[];
        private _dbContext: DbContext;
        private _dbSets: { [name: string]: () => DbSet<IEntityItem, DbContext>; };
        private _arrDbSets: DbSet<IEntityItem, DbContext>[];

        constructor(dbContext: DbContext) {
            super();
            this._dbContext = dbContext;
            this._arrDbSets = [];
            this._dbSets = {};
            this._dbSetNames = [];
        }
        protected _dbSetCreated(dbSet: DbSet<IEntityItem, DbContext>) {
            var self = this;
            this._arrDbSets.push(dbSet);
            dbSet.addOnPropertyChange(PROP_NAME.isHasChanges, function (sender, args) {
                self._dbContext._getInternal().onDbSetHasChangesChanged(sender);
            }, null);
        }
        protected _createDbSet(name: string, dbSetType: IDbSetConstructor<IEntityItem>) {
            var self = this, dbContext = this._dbContext;
            self._dbSets[name] = function () {
                var t = new dbSetType(dbContext);
                var f = function () {
                    return t;
                };
                self._dbSets[name] = f;
                self._dbSetCreated(t);
                return f();
            };
        }
        get dbSetNames() {
            return this._dbSetNames;
        }
        get arrDbSets() {
            return this._arrDbSets;
        }
        getDbSet(name: string) {
            var f = this._dbSets[name];
            if (!f)
                throw new Error(baseUtils.format(RIAPP.ERRS.ERR_DBSET_NAME_INVALID, name));
            return f();
        }
        destroy() {
            this._arrDbSets.forEach(function (dbSet) {
                dbSet.destroy();
            });
            this._arrDbSets = [];
            this._dbSets = null;
            this._dbContext = null;
            super.destroy();
        }
    }

    export interface IInternalDbxtMethods {
        onItemRefreshed(res: IRefreshRowInfo, item: IEntityItem): void;
        refreshItem(item: IEntityItem): IPromise<IEntityItem>;
        getQueryInfo(name: string): IQueryInfo;
        onDbSetHasChangesChanged(eSet: DbSet<IEntityItem, DbContext>): void;
        load(query: DataQuery<IEntityItem>, isPageChanged: boolean): IPromise<IQueryResult<IEntityItem>>;
    }

    var DBCTX_EVENTS = {
        submit_err: 'submit_error'
    };

    export class DbContext extends RIAPP.BaseObject {
        protected _isInitialized: boolean;
        protected _dbSets: DbSets;
        //_svcMethods: { [methodName: string]: (args: { [paramName: string]: any; }) => IPromise<any>; };
        protected _svcMethods: any;
        //_assoc:  { [getname: string]: () => Association; }
        protected _assoc: any;
        private _arrAssoc: Association[];
        private _queryInf: { [queryName: string]: IQueryInfo; };
        private _serviceUrl: string;
        private _isBusy: number;
        private _isSubmiting: boolean;
        private _isHasChanges: boolean;
        private _pendingSubmit: { deferred: IDeferred<any>; };
        private _serverTimezone: number;
        private _waitQueue: utilsMOD.WaitQueue;
        private _internal: IInternalDbxtMethods;

        constructor() {
            super();
            var self = this;
            this._isInitialized = false;
            this._dbSets = null;
            this._svcMethods = {};
            this._assoc = {};
            this._arrAssoc = [];
            this._queryInf = {};
            this._serviceUrl = null;
            this._isBusy = 0;
            this._isSubmiting = false;
            this._isHasChanges = false;
            this._pendingSubmit = null;
            this._serverTimezone = utils.get_timeZoneOffset();
            this._waitQueue = new utilsMOD.WaitQueue(this);
            this._internal = {
                onItemRefreshed: (res: IRefreshRowInfo, item: IEntityItem) => {
                    self._onItemRefreshed(res, item);
                },
                refreshItem: (item: IEntityItem) => {
                    return self._refreshItem(item);
                },
                getQueryInfo: (name: string) => {
                    return self._getQueryInfo(name);
                },
                onDbSetHasChangesChanged: (eSet: DbSet<IEntityItem, DbContext>) => {
                    self._onDbSetHasChangesChanged(eSet);
                },
                load: (query: DataQuery<IEntityItem>, isPageChanged: boolean) => {
                    return self._load(query, isPageChanged);
                }
            };
        }
        protected _getEventNames() {
            var base_events = super._getEventNames();
            return [DBCTX_EVENTS.submit_err].concat(base_events);
        }
        protected _initDbSets() {
            if (this._isInitialized)
                throw new Error(RIAPP.ERRS.ERR_DOMAIN_CONTEXT_INITIALIZED);
        }
        protected _initAssociations(associations: IAssociationInfo[]) {
            var self = this;
            associations.forEach(function (assoc) {
                self._initAssociation(assoc);
            });
        }
        protected _initMethods(methods: IQueryInfo[]) {
            var self = this;
            methods.forEach(function (info) {
                if (info.isQuery)
                    self._queryInf[info.methodName] = info;
                else {
                    //service method info
                    self._initMethod(info);
                }
            });
        }
        protected _updatePermissions(info: IPermissionsInfo) {
            var self = this;
            this._serverTimezone = info.serverTimezone;
            info.permissions.forEach(function (perms) {
                self.getDbSet(perms.dbSetName)._getInternal().updatePermissions(perms);
            });
        }
        protected _initAssociation(assoc: IAssociationInfo) {
            var self = this, options: IAssocConstructorOptions = {
                dbContext: self,
                parentName: assoc.parentDbSetName,
                childName: assoc.childDbSetName,
                onDeleteAction: assoc.onDeleteAction,
                parentKeyFields: assoc.fieldRels.map(function (f) {
                    return f.parentField;
                }),
                childKeyFields: assoc.fieldRels.map(function (f) {
                    return f.childField;
                }),
                parentToChildrenName: assoc.parentToChildrenName,
                childToParentName: assoc.childToParentName,
                name: assoc.name
            };
            var name = "get" + assoc.name;

            //lazy initialization pattern
            this._assoc[name] = function () {
                var t = new Association(options);
                self._arrAssoc.push(t);
                var f = function () {
                    return t;
                };
                self._assoc[name] = f;
                return f();
            };

        }
        protected _initMethod(methodInfo: IQueryInfo) {
            var self = this;
            //function expects method parameters
            this._svcMethods[methodInfo.methodName] = function (args: { [paramName: string]: any; }) {
                var deferred = utils.createDeferred();
                var callback = function (res: { result: any; error: any; }) {
                    if (!res.error) {
                        deferred.resolve(res.result);
                    }
                    else {
                        deferred.reject();
                    }
                };

                try {
                    var data = self._getMethodParams(methodInfo, args);
                    self._invokeMethod(methodInfo, data, callback);
                } catch (ex) {
                    if (!RIAPP.checkIsDummy(ex)) {
                        self.handleError(ex, self);
                        callback({ result: null, error: ex });
                    }
                }

                return deferred.promise();
            };
        }
        protected _getMethodParams(methodInfo: IQueryInfo, args: { [paramName: string]: any; }): IInvokeRequest {
            var self = this, methodName: string = methodInfo.methodName,
                data: IInvokeRequest = { methodName: methodName, paramInfo: { parameters: [] } };
            var i: number, parameterInfos = methodInfo.parameters, len = parameterInfos.length, pinfo: IQueryParamInfo, val: any, value: any;
            if (!args)
                args = {};
            for (i = 0; i < len; i += 1) {
                pinfo = parameterInfos[i];
                val = args[pinfo.name];
                if (!pinfo.isNullable && !pinfo.isArray && !(pinfo.dataType == constsMOD.DATA_TYPE.String || pinfo.dataType == constsMOD.DATA_TYPE.Binary) && utils.check.isNt(val)) {
                    throw new Error(utils.format(RIAPP.ERRS.ERR_SVC_METH_PARAM_INVALID, pinfo.name, val, methodInfo.methodName));
                }
                if (utils.check.isFunction(val)) {
                    throw new Error(utils.format(RIAPP.ERRS.ERR_SVC_METH_PARAM_INVALID, pinfo.name, val, methodInfo.methodName));
                }
                if (pinfo.isArray && !utils.check.isNt(val) && !utils.check.isArray(val)) {
                    val = [val];
                }
                value = null;
                //byte arrays are optimized for serialization
                if (pinfo.dataType == constsMOD.DATA_TYPE.Binary && utils.check.isArray(val)) {
                    value = JSON.stringify(val);
                }
                else if (utils.check.isArray(val)) {
                    var arr = new Array(val.length);
                    for (var k = 0; k < val.length; k += 1) {
                        //first convert all values to string
                        arr[k] = valueUtils.stringifyValue(val[k], pinfo.dateConversion, pinfo.dataType, self.serverTimezone);
                    }
                    value = JSON.stringify(arr);
                }
                else
                    value = valueUtils.stringifyValue(val, pinfo.dateConversion, pinfo.dataType, self.serverTimezone);

                data.paramInfo.parameters.push({ name: pinfo.name, value: value });
            }

            return data;
        }
        protected _invokeMethod(methodInfo: IQueryInfo, data: IInvokeRequest, callback: (res: { result: any; error: any; }) => void) {
            var self = this, operType = DATA_OPER.INVOKE, postData: string, invokeUrl: string;
            var fn_onComplete = function (res: IInvokeResponse) {
                try {
                    if (!res)
                        throw new Error(utils.format(RIAPP.ERRS.ERR_UNEXPECTED_SVC_ERROR, 'operation result is undefined'));
                    __checkError(res.error, operType);
                    callback({ result: res.result, error: null });
                } catch (ex) {
                    if (RIAPP.checkIsDummy(ex)) {
                        return;
                    }
                    self._onDataOperError(ex, operType);
                    callback({ result: null, error: ex });
                }
            };

            this.isBusy = true;
            try {
                postData = JSON.stringify(data);
                invokeUrl = this._getUrl(DATA_SVC_METH.Invoke);
                utils.performAjaxCall(
                    invokeUrl,
                    postData,
                    true,
                    function (res) { //success
                        fn_onComplete(JSON.parse(res));
                        self.isBusy = false;
                    },
                    function (er) { //error
                        fn_onComplete({ result: null, error: er });
                        self.isBusy = false;
                    }, null);
            }
            catch (ex) {
                if (RIAPP.checkIsDummy(ex)) {
                    RIAPP.throwDummy(ex);
                }
                this.isBusy = false;
                this._onDataOperError(ex, operType);
                callback({ result: null, error: ex });
                RIAPP.throwDummy(ex);
            }
        }
        protected _loadFromCache(query: DataQuery<IEntityItem>, isPageChanged: boolean): IQueryResult<IEntityItem> {
            var operType = DATA_OPER.LOAD, dbSet = query.dbSet, methRes: IQueryResult<IEntityItem>;
            try {
                methRes = dbSet._getInternal().fillFromCache({ isPageChanged: isPageChanged, fn_beforeFillEnd: null });
            } catch (ex) {
                if (RIAPP.checkIsDummy(ex)) {
                    RIAPP.throwDummy(ex);
                }
                this._onDataOperError(ex, operType);
                RIAPP.throwDummy(ex);
            }
            return methRes;
        }
        protected _loadIncluded(res: IQueryResponse) {
            var self = this, hasIncluded = !!res.included && res.included.length > 0;
            if (!hasIncluded)
                return;
            res.included.forEach(function (subset) {
                var dbSet = self.getDbSet(subset.dbSetName);
                dbSet.fillItems(subset);
            });
        }
        protected _onLoaded(res: IQueryResponse, isPageChanged: boolean): IQueryResult<IEntityItem> {
            var self = this, operType = DATA_OPER.LOAD, dbSetName: string, dbSet: DbSet<IEntityItem, DbContext>, loadRes: IQueryResult<IEntityItem>;
            try {
                if (!res)
                    throw new Error(baseUtils.format(RIAPP.ERRS.ERR_UNEXPECTED_SVC_ERROR, 'null result'));
                dbSetName = res.dbSetName;
                dbSet = self.getDbSet(dbSetName);
                if (!dbSet)
                    throw new Error(baseUtils.format(RIAPP.ERRS.ERR_DBSET_NAME_INVALID, dbSetName));
                __checkError(res.error, operType);
                loadRes = dbSet._getInternal().fillFromService(
                    {
                        res: res,
                        isPageChanged: isPageChanged,
                        fn_beforeFillEnd: function () {
                            self._loadIncluded(res);
                        }
                    });
            } catch (ex) {
                if (RIAPP.checkIsDummy(ex)) {
                    RIAPP.throwDummy(ex);
                }
                this._onDataOperError(ex, operType);
                RIAPP.throwDummy(ex);
            }
            return loadRes;
        }
        protected _dataSaved(res: IChangeSet) {
            var self = this, submitted: IEntityItem[] = [], notvalid: IEntityItem[] = [];
            try {
                try {
                    __checkError(res.error, DATA_OPER.SUBMIT);
                }
                catch (ex) {
                    res.dbSets.forEach(function (jsDB) {
                        var eSet = self._dbSets.getDbSet(jsDB.dbSetName);
                        jsDB.rows.forEach(function (row) {
                            var item = eSet.getItemByKey(row.clientKey);
                            if (!item) {
                                throw new Error(baseUtils.format(RIAPP.ERRS.ERR_KEY_IS_NOTFOUND, row.clientKey));
                            }
                            submitted.push(item);
                            if (!!row.invalid) {
                                eSet._getInternal().setItemInvalid(row);
                                notvalid.push(item);
                            }
                        });
                    });
                    throw new SubmitError(ex, submitted, notvalid);
                }

                res.dbSets.forEach(function (jsDB) {
                    self._dbSets.getDbSet(jsDB.dbSetName)._getInternal().commitChanges(jsDB.rows);
                });
            }
            catch (ex) {
                if (RIAPP.checkIsDummy(ex)) {
                    RIAPP.throwDummy(ex);
                }
                this._onSubmitError(ex);
                RIAPP.throwDummy(ex);
            }
        }
        protected _getChanges(): IChangeSet {
            var changeSet: IChangeSet = { dbSets: [], error: null, trackAssocs: [] };
            this._dbSets.arrDbSets.forEach(function (eSet) {
                eSet.endEdit();
                var changes: IRowInfo[] = eSet._getInternal().getChanges();
                if (changes.length === 0)
                    return;
                //it needs to apply updates in parent-child relationship order on the server
                //and provides child to parent map of the keys for the new entities
                var trackAssoc: ITrackAssoc[] = eSet._getInternal().getTrackAssocInfo();
                var jsDB = { dbSetName: eSet.dbSetName, rows: changes };
                changeSet.dbSets.push(jsDB);
                changeSet.trackAssocs = changeSet.trackAssocs.concat(trackAssoc);
            });
            return changeSet;
        }
        protected _getUrl(action: string): string {
            var loadUrl = this.service_url;
            if (!utils.str.endsWith(loadUrl, '/'))
                loadUrl = loadUrl + '/';
            loadUrl = loadUrl + [action, ''].join('/');
            return loadUrl;
        }
        handleError(error: any, source: any): boolean {
            var isHandled = super.handleError(error, source);
            if (!isHandled) {
                return global.handleError(error, source);
            }
            return isHandled;
        }
        protected _onDataOperError(ex: any, oper: DATA_OPER): boolean {
            if (RIAPP.checkIsDummy(ex))
                return true;
            var er: any;
            if (ex instanceof DataOperationError)
                er = ex;
            else
                er = new DataOperationError(ex, oper);
            return this.handleError(er, this);
        }
        protected _onSubmitError(error: any) {
            var args = { error: error, isHandled: false };
            this.raiseEvent(DBCTX_EVENTS.submit_err, args);
            if (!args.isHandled) {
                this.rejectChanges();
                this._onDataOperError(error, DATA_OPER.SUBMIT);
            }
        }
        protected waitForNotBusy(callback: (...args: any[]) => any, callbackArgs: any) {
            this._waitQueue.enQueue({
                prop: PROP_NAME.isBusy,
                groupName: null,
                predicate: function (val: any) {
                    return !val;
                },
                action: callback,
                actionArgs: callbackArgs
            });
        }
        protected waitForNotSubmiting(callback: (...args: any[]) => any, callbackArgs: any, groupName: string) {
            this._waitQueue.enQueue({
                prop: PROP_NAME.isSubmiting,
                predicate: function (val: any) {
                    return !val;
                },
                action: callback,
                actionArgs: callbackArgs,
                groupName: groupName,
                lastWins: !!groupName
            });
        }
        protected waitForInitialized(callback: (...args: any[]) => any, callbackArgs: any) {
            this._waitQueue.enQueue({
                prop: PROP_NAME.isInitialized,
                groupName: 'dbContext',
                predicate: function (val: any) {
                    return !!val;
                },
                action: callback,
                actionArgs: callbackArgs
            });
        }
        protected _loadInternal(context: {
            query: DataQuery<IEntityItem>;
            isPageChanged: boolean;
            loadPageCount: number;
            pageIndex: number;
            isPagingEnabled: boolean;
            dbSetName: string;
            dbSet: DbSet<IEntityItem, DbContext>;
            fn_onStart: () => void;
            fn_onEnd: () => void;
            fn_onOK: (res: IQueryResult<IEntityItem>) => void;
            fn_onErr: (ex: any) => void;
            fn_onErr2: (ex: any) => void;
        }) {
            var self = this,
                oldQuery = context.dbSet.query,
                loadRes: IQueryResult<IEntityItem>,
                range: { start: number; end: number; cnt: number; },
                pageCount = 1,
                pageIndex = context.pageIndex,
                loadPageCount = context.loadPageCount,
                isPagingEnabled = context.isPagingEnabled;

            context.fn_onStart();
            try {
                //restore pageIndex
                context.query.pageIndex = pageIndex;
                context.dbSet._getInternal().beforeLoad(context.query, oldQuery);

                if (loadPageCount > 1 && isPagingEnabled) {
                    if (context.query._getInternal().isPageCached(pageIndex)) {
                        loadRes = self._loadFromCache(context.query, context.isPageChanged);
                        context.fn_onOK(loadRes);
                        return;
                    }
                    else {
                        range = context.query._getInternal().getCache().getNextRange(pageIndex);
                        pageIndex = range.start;
                        pageCount = range.cnt;
                    }
                }


                var requestInfo: IQueryRequest = {
                    dbSetName: context.dbSetName,
                    pageIndex: pageIndex,
                    pageSize: context.query.pageSize,
                    pageCount: pageCount,
                    isIncludeTotalCount: context.query.isIncludeTotalCount,
                    filterInfo: context.query.filterInfo,
                    sortInfo: context.query.sortInfo,
                    paramInfo: self._getMethodParams(context.query._getInternal().getQueryInfo(), context.query.params).paramInfo,
                    queryName: context.query.queryName
                };

                function fn_deserialize(res: string): IQueryResponse {
                    var parts: string[] = [], matches: string[], header_size: number;
                    matches = res.match(HEAD_MARK_RX);
                    if (!!matches) { 
                        //rows were serialized after the header
                        header_size = parseInt(matches[1]);
                        //the first item is serialized QueryResponse
                        parts.push(res.substr(matches[0].length, header_size));
                        //the rest is serialized rows
                        parts.push(res.substr(matches[0].length + header_size));
                    }
                    else {
                        //all the response is serialized as a QueryResponse
                        parts.push(res);
                    }

                    var data: any[] = parts.map(function (txt) {
                        return JSON.parse(txt);
                    });

                    var response: IQueryResponse = data[0];

                    function fn_reassembleParts(response: IQueryResponse, allRows: IRowData[]): IQueryResponse {
                        var hasIncluded = !!response.included && response.included.length > 0;
                        if (allRows && allRows.length > 0) {
                            if (hasIncluded) {
                                response.included.forEach(function (subset) {
                                    subset.rows = allRows.splice(0, subset.rowCount);
                                    if (subset.rowCount != subset.rows.length) {
                                        throw new Error(utils.format(RIAPP.ERRS.ERR_ASSERTION_FAILED, 'subset.rowCount == subset.rows.length'));
                                    }
                                });
                            }
                            response.rows = allRows;
                            if (response.rowCount != response.rows.length) {
                                throw new Error(utils.format(RIAPP.ERRS.ERR_ASSERTION_FAILED, 'QueryResponse.rowCount == QueryResponse.rows.length'));
                            }
                        }
                        return response;
                    };

                    //if the rows were serialized after the header
                    if (data.length > 1)
                        response = fn_reassembleParts(data[0], data[1]);

                    return response;
                };

                utils.performAjaxCall(
                    self._getUrl(DATA_SVC_METH.LoadData),
                    JSON.stringify(requestInfo),
                    true,
                    function (res: string) { //success
                        try {
                            var response = fn_deserialize(res);
                            loadRes = self._onLoaded(response, context.isPageChanged);
                            context.fn_onOK(loadRes);
                        }
                        catch (ex) {
                            context.fn_onErr(ex);
                        }
                    },
                    function (er) {
                        context.fn_onErr2(er);
                    }, null);
            }
            catch (ex) {
                context.fn_onErr(ex);
            }
        }
        protected _onItemRefreshed(res: IRefreshRowInfo, item: IEntityItem): void {
            var operType = DATA_OPER.REFRESH;
            try {
                __checkError(res.error, operType);
                if (!res.rowInfo) {
                    item._aspect.dbSet.removeItem(item);
                    item._aspect.destroy();
                    throw new Error(RIAPP.ERRS.ERR_ITEM_DELETED_BY_ANOTHER_USER);
                }
                else
                    item._aspect._refreshValues(res.rowInfo, REFRESH_MODE.MergeIntoCurrent);
            }
            catch (ex) {
                if (RIAPP.checkIsDummy(ex)) {
                    RIAPP.throwDummy(ex);
                }
                this._onDataOperError(ex, operType);
                RIAPP.throwDummy(ex);
            }
        }
        protected _refreshItem(item: IEntityItem): IPromise<IEntityItem> {
            var deferred = utils.createDeferred(),
                fn_onComplete = function (isOk: boolean) {
                    if (isOk) {
                        deferred.resolve(item);
                    }
                    else {
                        deferred.reject();
                    }
                };

            var self = this;
            var context = {
                item: item,
                dbSet: item._aspect.dbSet,
                fn_onStart: function () {
                    context.item._aspect.isRefreshing = true;
                    self.isBusy = true;
                    context.dbSet.isLoading = true;
                },
                fn_onEnd: function () {
                    self.isBusy = false;
                    context.dbSet.isLoading = false;
                    context.item._aspect.isRefreshing = false;
                },
                fn_onErr: function (ex: any) {
                    context.fn_onEnd();
                    self._onDataOperError(ex, DATA_OPER.REFRESH);
                    fn_onComplete(false);
                },
                fn_onErr2: function (ex: any) {
                    context.fn_onEnd();
                    self._onDataOperError(ex, DATA_OPER.REFRESH);
                    fn_onComplete(false);
                },
                fn_onOK: function (res: IRefreshRowInfo) {
                    self._onItemRefreshed(res, item);
                    context.fn_onEnd();
                    fn_onComplete(true);
                }
            };

            function fn_refresh(context: {
                item: IEntityItem;
                dbSet: DbSet<IEntityItem, DbContext>;
                fn_onStart: () => void;
                fn_onEnd: () => void;
                fn_onErr: (ex: any) => void;
                fn_onErr2: (ex: any) => void;
                fn_onOK: (res: IRefreshRowInfo) => void;
            }) {
                context.fn_onStart();
                try {
                    var request: IRefreshRowInfo = {
                        dbSetName: context.item._aspect.dbSetName,
                        rowInfo: context.item._aspect._getRowInfo(),
                        error: null
                    };
                    context.item._aspect._checkCanRefresh();
                    utils.performAjaxCall(
                        self._getUrl(DATA_SVC_METH.Refresh),
                        JSON.stringify(request),
                        true,
                        function (res) { //success
                            try {
                                context.fn_onOK(JSON.parse(res));
                            }
                            catch (ex) {
                                context.fn_onErr(ex);
                            }
                        },
                        function (er) { //error
                            context.fn_onErr2(er);
                        }, null);
                }
                catch (ex) {
                    context.fn_onErr(ex);
                }
            };

            this.waitForNotSubmiting(function () {
                context.dbSet.waitForNotLoading(() => fn_refresh(context), [], true, null);
            }, [], null);

            return deferred.promise();
        }
        protected _getQueryInfo(name: string): IQueryInfo {
            return this._queryInf[name];
        }
        protected _onDbSetHasChangesChanged(eSet: DbSet<IEntityItem, DbContext>): void {
            var old = this._isHasChanges, test: DbSet<IEntityItem, DbContext>;
            this._isHasChanges = false;
            if (eSet.isHasChanges) {
                this._isHasChanges = true;
            }
            else {
                for (var i = 0, len = this._dbSets.arrDbSets.length; i < len; i += 1) {
                    test = this._dbSets.arrDbSets[i];
                    if (test.isHasChanges) {
                        this._isHasChanges = true;
                        break;
                    }
                }
            }
            if (this._isHasChanges !== old) {
                this.raisePropertyChanged(PROP_NAME.isHasChanges);
            }
        }
        protected _load(query: DataQuery<IEntityItem>, isPageChanged: boolean): IPromise<IQueryResult<IEntityItem>> {
            if (!query) {
                throw new Error(RIAPP.ERRS.ERR_DB_LOAD_NO_QUERY);
            }
            var self = this,
                deferred = utils.createDeferred(),
                fn_onComplete = function (isOk: boolean, res: IQueryResult<IEntityItem>) {
                    if (isOk) {
                        deferred.resolve(res);
                    }
                    else {
                        deferred.reject();
                    }
                };

            var context = {
                query: query,
                isPageChanged: isPageChanged,
                loadPageCount: query.loadPageCount,
                pageIndex: query.pageIndex,
                isPagingEnabled: query.isPagingEnabled,
                dbSetName: query.dbSetName,
                dbSet: self.getDbSet(query.dbSetName),
                fn_onStart: function () {
                    context.dbSet.isLoading = true;
                    self.isBusy = true;
                },
                fn_onEnd: function () {
                    context.dbSet.isLoading = false;
                    self.isBusy = false;
                },
                fn_onOK: function (res: IQueryResult<IEntityItem>) {
                    context.fn_onEnd();
                    fn_onComplete(true, res);
                },
                fn_onErr: function (ex: any) {
                    context.fn_onEnd();
                    self._onDataOperError(ex, DATA_OPER.LOAD);
                    fn_onComplete(false, null);
                },
                fn_onErr2: function (ex: any) {
                    context.fn_onEnd();
                    self._onDataOperError(ex, DATA_OPER.LOAD);
                    fn_onComplete(false, null);
                }
            };
                   
            //this wait is asynchronous
            this.waitForNotSubmiting(function () {
                context.dbSet.waitForNotLoading(() => self._loadInternal(context), [], true, isPageChanged ? 'paging' : null);
            }, [], isPageChanged ? 'paging' : null);

            return deferred.promise();
        }
        initialize(options: { serviceUrl: string; permissions?: IPermissionsInfo; }) {
            if (this._isInitialized)
                return;
            var self = this, opts: {
                serviceUrl: string;
                permissions: IPermissionsInfo;
            } = utils.extend(false, {
                serviceUrl: null,
                permissions: null
            }, options), loadUrl: string, operType: DATA_OPER;

            try {
                if (!utils.check.isString(opts.serviceUrl)) {
                    throw new Error(utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, "serviceUrl", opts.serviceUrl));
                }
                this._serviceUrl = opts.serviceUrl;
                this._initDbSets();

                if (!!opts.permissions) {
                    self._updatePermissions(opts.permissions);
                    self._isInitialized = true;
                    self.raisePropertyChanged(PROP_NAME.isInitialized);
                    return;
                }

                //initialize by obtaining metadata from the data service by ajax call
                loadUrl = this._getUrl(DATA_SVC_METH.GetPermissions), operType = DATA_OPER.INIT;
            }
            catch (ex) {
                this.handleError(ex, this);
                RIAPP.throwDummy(ex);
            }

            try {
                this.isBusy = true;
                utils.performAjaxGet(loadUrl).done((permissions: string) => {
                    try {
                        self._updatePermissions(JSON.parse(permissions));
                        self.isBusy = false;
                        self._isInitialized = true;
                        self.raisePropertyChanged(PROP_NAME.isInitialized);
                    }
                    catch (ex) {
                        self.isBusy = false;
                        self._onDataOperError(ex, operType);
                        RIAPP.throwDummy(ex);
                    }
                }).fail((er) => {
                    self.isBusy = false;
                    self._onDataOperError(er, operType);
                });
            }
            catch (ex) {
                this.isBusy = false;
                this._onDataOperError(ex, operType);
                RIAPP.throwDummy(ex);
            }
        }
        addOnSubmitError(fn: TEventHandler<DbContext, { error: any; isHandled: boolean; }>, nmspace?: string, context?: BaseObject): void {
            this._addHandler(DBCTX_EVENTS.submit_err, fn, nmspace, context);
        }
        removeOnSubmitError(nmspace?: string): void {
            this._removeHandler(DBCTX_EVENTS.submit_err, nmspace);
        }
        _getInternal(): IInternalDbxtMethods {
            return this._internal;
        }
        getDbSet(name: string) {
            return this._dbSets.getDbSet(name);
        }
        getAssociation(name: string): Association {
            var name2 = "get" + name;
            var f = this._assoc[name2];
            if (!f)
                throw new Error(baseUtils.format(RIAPP.ERRS.ERR_ASSOC_NAME_INVALID, name));
            return f();
        }
        submitChanges(): IVoidPromise {
            //don't submit when another submit is already in the queue
            if (!!this._pendingSubmit) {
                return this._pendingSubmit.deferred.promise();
            }

            var self = this, submitState = { deferred: utils.createDeferred() };
            var fn_onComplete = function (isOk: boolean) {
                if (isOk) {
                    submitState.deferred.resolve();
                }
                else {
                    submitState.deferred.reject();
                }
            };

            this._pendingSubmit = submitState;

            var context = {
                fn_onStart: function () {
                    self.isBusy = true;
                    self.isSubmiting = true;
                    //allow to post new submit
                    self._pendingSubmit = null;
                },
                fn_onEnd: function () {
                    self.isBusy = false;
                    self.isSubmiting = false;
                },
                fn_onErr: function (ex: any) {
                    context.fn_onEnd();
                    self._onDataOperError(ex, DATA_OPER.SUBMIT);
                    fn_onComplete(false);
                },
                fn_onErr2: function (ex: any) {
                    context.fn_onEnd();
                    self._onSubmitError(ex);
                    fn_onComplete(false);
                },
                fn_onOk: function () {
                    context.fn_onEnd();
                    fn_onComplete(true);
                }
            };

            function fn_submit(context: {
                fn_onStart: () => void;
                fn_onEnd: () => void;
                fn_onErr: (ex: any) => void;
                fn_onErr2: (ex: any) => void;
                fn_onOk: () => void;
            }) {
                var changeSet: IChangeSet;
                context.fn_onStart();
                try {
                    changeSet = self._getChanges();

                    if (changeSet.dbSets.length === 0) {
                        context.fn_onOk();
                        return;
                    }

                    utils.performAjaxCall(
                        self._getUrl(DATA_SVC_METH.Submit),
                        JSON.stringify(changeSet),
                        true,
                        function (res: string) { //success
                            try {
                                self._dataSaved(JSON.parse(res));
                                context.fn_onOk();
                            }
                            catch (ex) {
                                context.fn_onErr(ex);
                            }
                        },
                        function (er) { //submit error
                            context.fn_onErr2(er);
                        }, null);
                }
                catch (ex) {
                    context.fn_onErr(ex);
                }
            };

            //this wait is asynchronous
            this.waitForNotBusy(() => fn_submit(context), []);
            return submitState.deferred.promise();
        }
        load(query: DataQuery<IEntityItem>): IPromise<IQueryResult<IEntityItem>> {
            return this._load(query, false);
        }
        acceptChanges(): void {
            this._dbSets.arrDbSets.forEach(function (eSet) {
                eSet.acceptChanges();
            });
        }
        rejectChanges(): void {
            this._dbSets.arrDbSets.forEach(function (eSet) {
                eSet.rejectChanges();
            });
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            this._waitQueue.destroy();
            this._waitQueue = null;
            this._arrAssoc.forEach(function (assoc) {
                assoc.destroy();
            });
            this._arrAssoc = [];
            this._assoc = {};
            this._dbSets.destroy();
            this._dbSets = null;
            this._svcMethods = {};
            this._queryInf = {};
            this._serviceUrl = null;
            this._isInitialized = false;
            this._isBusy = 0;
            this._isSubmiting = false;
            this._isHasChanges = false;
            super.destroy();
        }
        get service_url() { return this._serviceUrl; }
        get isInitialized() { return this._isInitialized; }
        get isBusy() { return this._isBusy > 0; }
        set isBusy(v: boolean) {
            var old = this._isBusy > 0, cur: any;
            if (!v) {
                this._isBusy -= 1;
                if (this._isBusy < 0)
                    this._isBusy = 0;
            }
            else {
                this._isBusy += 1;
            }
            cur = this._isBusy > 0;
            if (cur != old) {
                this.raisePropertyChanged(PROP_NAME.isBusy);
            }
        }
        get isSubmiting() { return this._isSubmiting; }
        set isSubmiting(v) {
            if (this._isSubmiting !== v) {
                this._isSubmiting = v;
                this.raisePropertyChanged(PROP_NAME.isSubmiting);
            }
        }
        get serverTimezone() { return this._serverTimezone; }
        get dbSets() { return this._dbSets; }
        get serviceMethods() { return this._svcMethods; }
        get isHasChanges() { return this._isHasChanges; }
    }

    export class Association extends RIAPP.BaseObject {
        private _objId: string;
        private _name: string;
        private _dbContext: DbContext;
        private _onDeleteAction: DELETE_ACTION;
        private _parentDS: DbSet<IEntityItem, DbContext>;
        private _childDS: DbSet<IEntityItem, DbContext>;
        private _parentFldInfos: IFieldInfo[];
        private _childFldInfos: IFieldInfo[];
        private _parentToChildrenName: string;
        private _childToParentName: string;
        private _parentMap: { [key: string]: IEntityItem; };
        private _childMap: { [key: string]: IEntityItem[]; };
        private _isParentFilling: boolean;
        private _isChildFilling: boolean;
        private _saveParentFKey: string;
        private _saveChildFKey: string;
        private _changedTimeout: number;
        private _changed: { [key: string]: number; };

        constructor(options: IAssocConstructorOptions) {
            super();
            var self = this;
            this._objId = 'ass' + baseUtils.getNewID();
            var opts: IAssocConstructorOptions = utils.extend(false, {
                dbContext: null,
                parentName: '',
                childName: '',
                parentKeyFields: [],
                childKeyFields: [],
                parentToChildrenName: null,
                childToParentName: null,
                name: this._objId,
                onDeleteAction: DELETE_ACTION.NoAction
            }, options);

            this._name = opts.name;
            this._dbContext = opts.dbContext;
            this._onDeleteAction = opts.onDeleteAction;
            this._parentDS = opts.dbContext.getDbSet(opts.parentName);
            this._childDS = opts.dbContext.getDbSet(opts.childName);
            this._parentFldInfos = opts.parentKeyFields.map(function (name) {
                return self._parentDS.getFieldInfo(name);
            });
            this._childFldInfos = opts.childKeyFields.map(function (name) {
                return self._childDS.getFieldInfo(name);
            });
            this._parentToChildrenName = opts.parentToChildrenName;
            this._childToParentName = opts.childToParentName;
            this._parentMap = {};
            this._childMap = {};
            this._isParentFilling = false;
            this._isChildFilling = false;
            this._bindParentDS();
            var changed1 = this._mapParentItems(this._parentDS.items);
            this._bindChildDS();
            var changed2 = this._mapChildren(this._childDS.items);
            this._saveParentFKey = null;
            this._saveChildFKey = null;
            this._changedTimeout = null;
            this._changed = {};
            self._notifyParentChanged(changed1);
            self._notifyChildrenChanged(changed2);
        }
        handleError(error: any, source: any): boolean {
            var isHandled = super.handleError(error, source);
            if (!isHandled) {
                return global.handleError(error, source);
            }
            return isHandled;
        }
        protected _bindParentDS() {
            var self = this, ds = this._parentDS;
            if (!ds) return;
            ds.addOnCollChanged(function (sender, args) {
                self._onParentCollChanged(args);
            }, self._objId, null, true);
            ds.addOnFill(function (sender, args) {
                self._onParentFill(args);
            }, self._objId, null, true);
            ds.addOnBeginEdit(function (sender, args) {
                self._onParentEdit(args.item, true, undefined);
            }, self._objId, null, true);
            ds.addOnEndEdit(function (sender, args) {
                self._onParentEdit(args.item, false, args.isCanceled);
            }, self._objId, null, true);
            ds.addOnItemDeleting(function (sender, args) {
            }, self._objId, null, true);
            ds.addOnStatusChanged(function (sender, args) {
                self._onParentStatusChanged(args.item, args.oldStatus);
            }, self._objId, null, true);
            ds.addOnCommitChanges(function (sender, args) {
                self._onParentCommitChanges(args.item, args.isBegin, args.isRejected, args.status);
            }, self._objId, null, true);
        }
        protected _bindChildDS() {
            var self = this, ds = this._childDS;
            if (!ds) return;
            ds.addOnCollChanged(function (sender, args) {
                self._onChildCollChanged(args);
            }, self._objId, null, true);
            ds.addOnFill(function (sender, args) {
                self._onChildFill(args);
            }, self._objId, null, true);
            ds.addOnBeginEdit(function (sender, args) {
                self._onChildEdit(args.item, true, undefined);
            }, self._objId, null, true);
            ds.addOnEndEdit(function (sender, args) {
                self._onChildEdit(args.item, false, args.isCanceled);
            }, self._objId, null, true);
            ds.addOnStatusChanged(function (sender, args) {
                self._onChildStatusChanged(args.item, args.oldStatus);
            }, self._objId, null, true);
            ds.addOnCommitChanges(function (sender, args) {
                self._onChildCommitChanges(args.item, args.isBegin, args.isRejected, args.status);
            }, self._objId, null, true);
        }
        protected _onParentCollChanged(args: collMOD.ICollChangedArgs<IEntityItem>) {
            var self = this, item: IEntityItem, items = args.items, changed: string[] = [], changedKeys: any = {};
            switch (args.changeType) {
                case collMOD.COLL_CHANGE_TYPE.RESET:
                    if (!self._isParentFilling)
                        changed = self.refreshParentMap();
                    break;
                case collMOD.COLL_CHANGE_TYPE.ADDED:
                    if (!this._isParentFilling) //if items are filling then it will be appended when fill ends
                        changed = self._mapParentItems(items);
                    break;
                case collMOD.COLL_CHANGE_TYPE.REMOVE:
                    items.forEach(function (item) {
                        var key = self._unMapParentItem(item);
                        if (!!key) {
                            changedKeys[key] = null;
                        }
                    });
                    changed = Object.keys(changedKeys);
                    break;
                case collMOD.COLL_CHANGE_TYPE.REMAP_KEY:
                    {
                        if (!!args.old_key) {
                            item = this._parentMap[args.old_key];
                            if (!!item) {
                                delete this._parentMap[args.old_key];
                                changed = this._mapParentItems([item]);
                            }
                        }
                    }
                    break;
                default:
                    throw new Error(baseUtils.format(RIAPP.ERRS.ERR_COLLECTION_CHANGETYPE_INVALID, args.changeType));
            }
            self._notifyParentChanged(changed);
        }
        protected _onParentFill(args: collMOD.ICollFillArgs<IEntityItem>) {
            var isEnd = !args.isBegin, self = this, changed: any;
            if (isEnd) {
                self._isParentFilling = false;
                if (args.resetUI) {
                    changed = self.refreshParentMap();
                }
                else
                    changed = self._mapParentItems(<IEntityItem[]>args.newItems);
                self._notifyParentChanged(changed);
            }
            else {
                self._isParentFilling = true;
            }
        }
        protected _onParentEdit(item: IEntityItem, isBegin: boolean, isCanceled: boolean) {
            var self = this;
            if (isBegin) {
                self._storeParentFKey(item);
            }
            else {
                if (!isCanceled)
                    self._checkParentFKey(item);
                else
                    self._saveParentFKey = null;
            }
        }
        protected _onParentCommitChanges(item: IEntityItem, isBegin: boolean, isRejected: boolean, status: collMOD.STATUS) {
            var self = this, fkey: string;
            if (isBegin) {
                if (isRejected && status === collMOD.STATUS.ADDED) {
                    fkey = this._unMapParentItem(item);
                    if (!!fkey)
                        self._notifyParentChanged([fkey]);
                    return;
                }
                else if (!isRejected && status === collMOD.STATUS.DELETED) {
                    fkey = this._unMapParentItem(item);
                    if (!!fkey)
                        self._notifyParentChanged([fkey]);
                    return;
                }

                self._storeParentFKey(item);
            }
            else {
                self._checkParentFKey(item);
            }
        }
        protected _storeParentFKey(item: IEntityItem) {
            var self = this, fkey = self.getParentFKey(item);
            if (fkey !== null && !!self._parentMap[fkey]) {
                self._saveParentFKey = fkey;
            }
        }
        protected _checkParentFKey(item: IEntityItem) {
            var self = this, fkey: string, savedKey = self._saveParentFKey;
            self._saveParentFKey = null;
            fkey = self.getParentFKey(item);
            if (fkey !== savedKey) {
                if (!!savedKey) {
                    delete self._parentMap[savedKey];
                    self._notifyChildrenChanged([savedKey]);
                    self._notifyParentChanged([savedKey]);
                }

                if (!!fkey) {
                    self._mapParentItems([item]);
                    self._notifyChildrenChanged([fkey]);
                    self._notifyParentChanged([fkey]);
                }
            }
        }
        protected _onParentStatusChanged(item: IEntityItem, oldStatus: collMOD.STATUS) {
            var self = this, newStatus = item._aspect.status, fkey: string = null;
            var children: IEntityItem[];
            if (newStatus === collMOD.STATUS.DELETED) {
                children = self.getChildItems(item);
                fkey = this._unMapParentItem(item);
                switch (self.onDeleteAction) {
                    case DELETE_ACTION.NoAction:
                        //nothing
                        break;
                    case DELETE_ACTION.Cascade:
                        children.forEach(function (child) {
                            child._aspect.deleteItem();
                        });
                        break;
                    case DELETE_ACTION.SetNulls:
                        children.forEach(function (child) {
                            var isEdit = child._aspect.isEditing;
                            if (!isEdit)
                                child._aspect.beginEdit();
                            try {
                                self._childFldInfos.forEach(function (f) {
                                    (<any>child)[f.fieldName] = null;
                                });
                                if (!isEdit)
                                    child._aspect.endEdit();
                            }
                            finally {
                                if (!isEdit)
                                    child._aspect.cancelEdit();
                            }
                        });
                        break;
                }
                if (!!fkey) {
                    self._notifyParentChanged([fkey]);
                }
            }
        }
        protected _onChildCollChanged(args: collMOD.ICollChangedArgs<IEntityItem>) {
            var self = this, item: IEntityItem, items = args.items, changed: string[] = [], changedKeys = {};
            switch (args.changeType) {
                case collMOD.COLL_CHANGE_TYPE.RESET:
                    if (!self._isChildFilling)
                        changed = self.refreshChildMap();
                    break;
                case collMOD.COLL_CHANGE_TYPE.ADDED:
                    if (!this._isChildFilling) //if items are filling then it will be appended when fill ends
                        changed = self._mapChildren(items);
                    break;
                case collMOD.COLL_CHANGE_TYPE.REMOVE:
                    items.forEach(function (item) {
                        var key = self._unMapChildItem(item);
                        if (!!key) {
                            (<any>changedKeys)[key] = null;
                        }
                    });
                    changed = Object.keys(changedKeys);
                    break;
                case collMOD.COLL_CHANGE_TYPE.REMAP_KEY:
                    {
                        if (!!args.old_key) {
                            item = items[0];
                            if (!!item) {
                                var parentKey = item._aspect._getFieldVal(this._childToParentName);
                                if (!!parentKey) {
                                    delete this._childMap[parentKey];
                                    item._aspect._clearFieldVal(this._childToParentName);
                                }
                                changed = this._mapChildren([item]);
                            }
                        }
                    }
                    break;
                default:
                    throw new Error(baseUtils.format(RIAPP.ERRS.ERR_COLLECTION_CHANGETYPE_INVALID, args.changeType));
            }
            self._notifyChildrenChanged(changed);
        }
        protected _notifyChildrenChanged(changed: string[]) {
            this._notifyChanged([], changed);
        }
        protected _notifyParentChanged(changed: string[]) {
            this._notifyChanged(changed, []);
        }
        protected _notifyChanged(changed_pkeys: string[], changed_ckeys: string[]) {
            var self = this;
            if (changed_pkeys.length > 0 || changed_ckeys.length > 0) {
                changed_pkeys.forEach(function (key) {
                    var res = self._changed[key];
                    if (!res)
                        res = 1;
                    else
                        res = res | 1;
                    self._changed[key] = res;
                });
                changed_ckeys.forEach(function (key) {
                    var res = self._changed[key];
                    if (!res)
                        res = 2;
                    else
                        res = res | 2;
                    self._changed[key] = res;
                });

                if (!this._changedTimeout) {
                    this._changedTimeout = setTimeout(function () {
                        if (self._isDestroyCalled)
                            return;
                        self._changedTimeout = null;
                        var changed = self._changed;
                        self._changed = {};
                        var keys = Object.keys(changed);
                        keys.forEach(function (fkey) {
                            var res = changed[fkey];
                            if ((res & 1) == 1) {
                                self._onParentChanged(fkey);
                            }
                            if ((res & 2) == 2) {
                                self._onChildrenChanged(fkey);
                            }
                        });
                    }, 50);
                }
            }
        }
        protected _onChildFill(args: collMOD.ICollFillArgs<IEntityItem>): void {
            var isEnd = !args.isBegin, self = this, changed: any;
            if (isEnd) {
                self._isChildFilling = false;
                if (args.resetUI) {
                    changed = self.refreshChildMap();
                }
                else
                    changed = self._mapChildren(<IEntityItem[]>args.newItems);
                self._notifyChildrenChanged(changed);
            }
            else {
                self._isChildFilling = true;
            }
        }
        protected _onChildEdit(item: IEntityItem, isBegin: boolean, isCanceled: boolean): void {
            var self = this;
            if (isBegin) {
                self._storeChildFKey(item);
            }
            else {
                if (!isCanceled)
                    self._checkChildFKey(item);
                else {
                    self._saveChildFKey = null;
                }
            }
        }
        protected _onChildCommitChanges(item: IEntityItem, isBegin: boolean, isRejected: boolean, status: collMOD.STATUS): void {
            var self = this, fkey: string;
            if (isBegin) {
                if (isRejected && status === collMOD.STATUS.ADDED) {
                    fkey = this._unMapChildItem(item);
                    if (!!fkey)
                        self._notifyChildrenChanged([fkey]);
                    return;
                }
                else if (!isRejected && status === collMOD.STATUS.DELETED) {
                    fkey = self._unMapChildItem(item);
                    if (!!fkey)
                        self._notifyChildrenChanged([fkey]);
                    return;
                }

                self._storeChildFKey(item);
            }
            else {
                self._checkChildFKey(item);
            }
        }
        protected _storeChildFKey(item: IEntityItem): void {
            var self = this, fkey = self.getChildFKey(item), arr: IEntityItem[];
            if (!!fkey) {
                arr = self._childMap[fkey];
                if (!!arr && arr.indexOf(item) > -1) {
                    self._saveChildFKey = fkey;
                }
            }
        }
        protected _checkChildFKey(item: IEntityItem): void {
            var self = this, savedKey = self._saveChildFKey, fkey: string, arr: IEntityItem[];
            self._saveChildFKey = null;
            fkey = self.getChildFKey(item);
            if (fkey !== savedKey) {
                if (!!savedKey) {
                    arr = self._childMap[savedKey];
                    utils.removeFromArray(arr, item);
                    if (arr.length == 0) {
                        delete self._childMap[savedKey];
                    }
                    self._notifyParentChanged([savedKey]);
                    self._notifyChildrenChanged([savedKey]);
                }
                if (!!fkey) {
                    self._mapChildren([item]);
                    self._notifyParentChanged([fkey]);
                    self._notifyChildrenChanged([fkey]);
                }
            }
        }
        protected _onChildStatusChanged(item: IEntityItem, oldStatus: collMOD.STATUS): void {
            var self = this, newStatus = item._aspect.status, fkey = self.getChildFKey(item);
            if (!fkey)
                return;
            if (newStatus === collMOD.STATUS.DELETED) {
                fkey = self._unMapChildItem(item);
                if (!!fkey)
                    self._notifyChildrenChanged([fkey]);
            }
        }
        protected _getItemKey(finf: IFieldInfo[], ds: DbSet<IEntityItem, DbContext>, item: IEntityItem): string {
            var arr: string[] = [], val: any, strval: string, internal = ds._getInternal();
            for (var i = 0, len = finf.length; i < len; i += 1) {
                val = (<any>item)[finf[i].fieldName];
                strval = internal.getStrValue(val, finf[i]);
                if (strval === null)
                    return null;
                arr.push(strval);
            }
            return arr.join(';');
        }
        protected _resetChildMap(): void {
            var self = this, fkeys = Object.keys(this._childMap);
            this._childMap = {};
            self._notifyChildrenChanged(fkeys);
        }
        protected _resetParentMap(): void {
            var self = this, fkeys = Object.keys(this._parentMap);
            this._parentMap = {};
            self._notifyParentChanged(fkeys);
        }
        protected _unMapChildItem(item: IEntityItem) {
            var fkey: string, arr: IEntityItem[], idx: number, changedKey: string = null;
            fkey = this.getChildFKey(item);
            if (!!fkey) {
                arr = this._childMap[fkey];
                if (!!arr) {
                    idx = utils.removeFromArray(arr, item);
                    if (idx > -1) {
                        if (arr.length == 0)
                            delete this._childMap[fkey];
                        changedKey = fkey;
                    }
                }
            }
            return changedKey;
        }
        protected _unMapParentItem(item: IEntityItem) {
            var fkey: string, changedKey: string = null;
            fkey = this.getParentFKey(item);
            if (!!fkey && !!this._parentMap[fkey]) {
                delete this._parentMap[fkey];
                changedKey = fkey;
            }
            return changedKey;
        }
        protected _mapParentItems(items: IEntityItem[]) {
            var item: IEntityItem, fkey: string, status: collMOD.STATUS, old: IEntityItem, chngedKeys: any = {};
            for (var i = 0, len = items.length; i < len; i += 1) {
                item = items[i];
                status = item._aspect.status;
                if (status === collMOD.STATUS.DELETED)
                    continue;
                fkey = this.getParentFKey(item);
                if (!!fkey) {
                    old = this._parentMap[fkey];
                    if (old !== item) {
                        //map items by foreign keys
                        this._parentMap[fkey] = item;
                        chngedKeys[fkey] = null;
                    }
                }
            }
            return Object.keys(chngedKeys);
        }
        protected _onChildrenChanged(fkey: string) {
            if (!!fkey && !!this._parentToChildrenName) {
                var obj = this._parentMap[fkey];
                if (!!obj) {
                    obj.raisePropertyChanged(this._parentToChildrenName);
                }
            }
        }
        protected _onParentChanged(fkey: string) {
            var self = this, arr: IEntityItem[];
            if (!!fkey && !!this._childToParentName) {
                arr = this._childMap[fkey];
                if (!!arr) {
                    arr.forEach(function (item) {
                        item.raisePropertyChanged(self._childToParentName);
                    });
                }
            }
        }
        protected _mapChildren(items: IEntityItem[]) {
            var item: IEntityItem, fkey: string, arr: IEntityItem[], status: collMOD.STATUS, chngedKeys: any = {};
            for (var i = 0, len = items.length; i < len; i += 1) {
                item = items[i];
                status = item._aspect.status;
                if (status === collMOD.STATUS.DELETED)
                    continue;
                fkey = this.getChildFKey(item);
                if (!!fkey) {
                    arr = this._childMap[fkey];
                    if (!arr) {
                        arr = [];
                        this._childMap[fkey] = arr;
                    }
                    if (arr.indexOf(item) < 0) {
                        arr.push(item);
                        if (!chngedKeys[fkey])
                            chngedKeys[fkey] = null;
                    }
                }
            }
            return Object.keys(chngedKeys);
        }
        protected _unbindParentDS() {
            var self = this, ds = this.parentDS;
            if (!ds) return;
            ds.removeNSHandlers(self._objId);
        }
        protected _unbindChildDS() {
            var self = this, ds = this.childDS;
            if (!ds) return;
            ds.removeNSHandlers(self._objId);
        }
        getParentFKey(item: IEntityItem): string {
            if (!!item && item._aspect.isNew)
                return item._key;
            return this._getItemKey(this._parentFldInfos, this._parentDS, item);
        }
        getChildFKey(item: IEntityItem): string {
            if (!!item && !!this._childToParentName) {
                //_getFieldVal for childToParentName can store temporary parent's key (which is generated on the client)
                // we first check if it returns it
                var parentKey = item._aspect._getFieldVal(this._childToParentName);
                if (!!parentKey) {
                    return parentKey;
                }
            }
            //if keys are permanent (stored to the server), then return normal foreign keys
            return this._getItemKey(this._childFldInfos, this._childDS, item);
        }
        //get all childrens for parent item
        getChildItems(item: IEntityItem): IEntityItem[] {
            if (!item)
                return [];
            var fkey = this.getParentFKey(item), arr = this._childMap[fkey];
            if (!arr)
                return [];
            return arr;
        }
        //get the parent for child item
        getParentItem(item: IEntityItem): IEntityItem {
            if (!item)
                return null;
            var fkey = this.getChildFKey(item);
            var obj = this._parentMap[fkey];
            if (!!obj)
                return obj;
            else
                return null;
        }
        refreshParentMap() {
            this._resetParentMap();
            return this._mapParentItems(this._parentDS.items);
        }
        refreshChildMap() {
            this._resetChildMap();
            return this._mapChildren(this._childDS.items);
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            clearTimeout(this._changedTimeout);
            this._changedTimeout = null;
            this._changed = {};
            this._unbindParentDS();
            this._unbindChildDS();
            this._parentMap = null;
            this._childMap = null;
            this._parentFldInfos = null;
            this._childFldInfos = null;
            super.destroy();
        }
        toString() {
            return this._name;
        }
        get name() { return this._name; }
        get parentToChildrenName() { return this._parentToChildrenName; }
        get childToParentName() { return this._childToParentName; }
        get parentDS() { return this._parentDS; }
        get childDS() { return this._childDS; }
        get parentFldInfos() { return this._parentFldInfos; }
        get childFldInfos() { return this._childFldInfos; }
        get onDeleteAction() { return this._onDeleteAction; }
    }


    var VIEW_EVENTS = {
        refreshed: 'view_refreshed'
    };

    export class DataView<TItem extends collMOD.ICollectionItem> extends collMOD.BaseCollection<TItem> {
        private _dataSource: collMOD.BaseCollection<TItem>;
        private _fn_filter: (item: TItem) => boolean;
        private _fn_sort: (item1: TItem, item2: TItem) => number;
        private _fn_itemsProvider: (ds: collMOD.BaseCollection<TItem>) => TItem[];
        private _isDSFilling: boolean;
        private _isAddingNew: boolean;
        private _objId: string;

        constructor(options: {
            dataSource: collMOD.BaseCollection<TItem>;
            fn_filter?: (item: TItem) => boolean;
            fn_sort?: (item1: TItem, item2: TItem) => number;
            fn_itemsProvider?: (ds: collMOD.BaseCollection<TItem>) => TItem[];
        }) {
            super();
            var opts: typeof options = utils.extend(false, {
                dataSource: null,
                fn_filter: null,
                fn_sort: null,
                fn_itemsProvider: null
            }, options);

            if (!opts.dataSource || !(opts.dataSource instanceof collMOD.BaseCollection))
                throw new Error(RIAPP.ERRS.ERR_DATAVIEW_DATASRC_INVALID);
            if (!opts.fn_filter || !utils.check.isFunction(opts.fn_filter))
                throw new Error(RIAPP.ERRS.ERR_DATAVIEW_FILTER_INVALID);
            this._objId = 'dvw' + baseUtils.getNewID();
            this._dataSource = opts.dataSource;
            this._fn_filter = opts.fn_filter;
            this._fn_sort = opts.fn_sort;
            this._fn_itemsProvider = opts.fn_itemsProvider;
            this._isDSFilling = false;
            this._isAddingNew = false;
            var self = this, ds = this._dataSource;
            ds.getFieldNames().forEach(function (prop) {
                self._fieldMap[prop] = utils.extend(false, {}, ds.getFieldInfo(prop));
            });
            this._bindDS();
        }
        protected _getEventNames() {
            var base_events = super._getEventNames();
            return [VIEW_EVENTS.refreshed].concat(base_events);
        }
        addOnViewRefreshed(fn: TEventHandler<DataView<TItem>, any>, nmspace?: string) {
            this._addHandler(VIEW_EVENTS.refreshed, fn, nmspace);
        }
        removeOnViewRefreshed(nmspace?: string) {
            this._removeHandler(VIEW_EVENTS.refreshed, nmspace);
        }
        protected _filterForPaging(items: TItem[]) {
            var skip = 0, take = 0, pos = -1, cnt = -1, result: TItem[] = [];
            skip = this.pageSize * this.pageIndex;
            take = this.pageSize;
            items.forEach(function (item) {
                cnt += 1;
                if (cnt < skip) {
                    return;
                }
                pos += 1;
                if (pos < take) {
                    result.push(item);
                }
            });
            return result;
        }
        protected _onViewRefreshed(args: {}) {
            this.raiseEvent(VIEW_EVENTS.refreshed, args);
        }
        protected _clear(isPageChanged: boolean) {
            this.cancelEdit();
            this._EditingItem = null;
            this._newKey = 0;
            this.currentItem = null;
            this._items = [];
            this._itemsByKey = {};
            this._errors = {};
            this._onCollectionChanged({ changeType: collMOD.COLL_CHANGE_TYPE.RESET, items: [] });
            if (!isPageChanged)
                this.pageIndex = 0;
            this._onCountChanged();
        }
        protected _refresh(isPageChanged: boolean): void {
            var items: TItem[];
            var ds = this._dataSource;
            if (!ds) {
                return;
            }
            if (!!this._fn_itemsProvider) {
                items = this._fn_itemsProvider(ds);
            }
            else
                items = ds.items;
            if (!!this._fn_filter) {
                items = items.filter(this._fn_filter);
            }
            if (!!this._fn_sort) {
                items = items.sort(this._fn_sort);
            }
            this._fillItems({ items: items, isPageChanged: !!isPageChanged, clear: true, isAppend: false });
            this._onViewRefreshed({});
        }
        protected _fillItems(data: {
            items: TItem[];
            isPageChanged: boolean;
            clear: boolean;
            isAppend: boolean;
        }) {
            data = utils.extend(false, {
                items: [],
                isPageChanged: false,
                clear: true,
                isAppend: false
            }, data);
            var self = this, items: TItem[], newItems: TItem[] = [], positions: number[] = [], fetchedItems: TItem[] = [];
            this._onFillStart({ isBegin: true, rowCount: data.items.length, time: new Date(), isPageChanged: data.isPageChanged });
            try {
                if (!!data.clear)
                    this._clear(data.isPageChanged);
                if (this.isPagingEnabled && !data.isAppend) {
                    items = this._filterForPaging(data.items);
                }
                else
                    items = data.items;

                items.forEach(function (item) {
                    var oldItem = self._itemsByKey[item._key];
                    if (!oldItem) {
                        self._itemsByKey[item._key] = item;
                        newItems.push(item);
                        positions.push(self._items.length - 1);
                        self._items.push(item);
                        fetchedItems.push(item);
                    }
                    else {
                        fetchedItems.push(oldItem);
                    }
                });

                if (newItems.length > 0) {
                    this._onCollectionChanged({ changeType: collMOD.COLL_CHANGE_TYPE.ADDED, items: newItems, pos: positions });
                    this._onCountChanged();
                }
            } finally {
                this._onFillEnd({
                    isBegin: false, rowCount: fetchedItems.length, time: new Date(), resetUI: !!data.clear,
                    fetchedItems: fetchedItems, newItems: newItems, isPageChanged: data.isPageChanged
                });
            }
            if (!!data.clear)
                this.totalCount = data.items.length;
            else
                this.totalCount = this.totalCount + newItems.length;
            this.moveFirst();
            return newItems;
        }
        protected _onDSCollectionChanged(sender: any, args: collMOD.ICollChangedArgs<TItem>) {
            var self = this, item: collMOD.ICollectionItem, items = args.items;
            switch (args.changeType) {
                case collMOD.COLL_CHANGE_TYPE.RESET:
                    if (!this._isDSFilling)
                        this._refresh(false);
                    break;
                case collMOD.COLL_CHANGE_TYPE.ADDED:
                    if (!this._isAddingNew && !this._isDSFilling) {
                        if (!!self._fn_filter) {
                            items = items.filter(self._fn_filter);
                        }
                        self.appendItems(items);
                    }
                    break;
                case collMOD.COLL_CHANGE_TYPE.REMOVE:
                    items.forEach(function (item) {
                        var key = item._key;
                        item = self._itemsByKey[key];
                        if (!!item) {
                            self.removeItem(item);
                        }
                    });
                    break;
                case collMOD.COLL_CHANGE_TYPE.REMAP_KEY:
                    {
                        item = self._itemsByKey[args.old_key];
                        if (!!item) {
                            delete self._itemsByKey[args.old_key];
                            self._itemsByKey[args.new_key] = <any>item;
                            this._onCollectionChanged(args);
                        }
                    }
                    break;
                default:
                    throw new Error(baseUtils.format(RIAPP.ERRS.ERR_COLLECTION_CHANGETYPE_INVALID, args.changeType));
            }
        }
        protected _onDSFill(sender: any, args: collMOD.ICollFillArgs<TItem>) {
            var self = this, items = args.fetchedItems, isEnd = !args.isBegin;
            if (isEnd) {
                this._isDSFilling = false;
                if (args.resetUI)
                    this._refresh(false);
                else {
                    if (!!self._fn_filter) {
                        items = items.filter(self._fn_filter);
                    }
                    self.appendItems(items);
                }
            }
            else {
                this._isDSFilling = true;
            }
        }
        protected _onDSStatusChanged(sender: any, args: collMOD.ICollItemStatusArgs<TItem>) {
            var self = this, item = args.item, key = args.key, oldStatus = args.oldStatus, isOk: boolean, canFilter = !!self._fn_filter;
            if (!!self._itemsByKey[key]) {
                self._onItemStatusChanged(item, oldStatus);

                if (canFilter) {
                    isOk = self._fn_filter(item);
                    if (!isOk) {
                        self.removeItem(item);
                    }
                }
            }
            else {
                if (canFilter) {
                    isOk = self._fn_filter(item);
                    if (isOk) {
                        self.appendItems([item]);
                    }
                }
            }
        }
        protected _bindDS() {
            var self = this, ds = this._dataSource;
            if (!ds) return;
            ds.addOnCollChanged(self._onDSCollectionChanged, self._objId, self);
            ds.addOnFill(self._onDSFill, self._objId, self);
            ds.addOnBeginEdit(function (sender, args) {
                if (!!self._itemsByKey[args.item._key]) {
                    self._onEditing(args.item, true, false);
                }
            }, self._objId);
            ds.addOnEndEdit(function (sender, args) {
                var isOk: boolean, item = args.item, canFilter = !!self._fn_filter;
                if (!!self._itemsByKey[item._key]) {
                    self._onEditing(item, false, args.isCanceled);
                    if (!args.isCanceled && canFilter) {
                        isOk = self._fn_filter(item);
                        if (!isOk)
                            self.removeItem(item);
                    }
                }
                else {
                    if (!args.isCanceled && canFilter) {
                        isOk = self._fn_filter(item);
                        if (isOk) {
                            self.appendItems([item]);
                        }
                    }
                }
            }, self._objId);
            ds.addOnErrorsChanged(function (sender, args) {
                if (!!self._itemsByKey[args.item._key]) {
                    self._onErrorsChanged(args.item);
                }
            }, self._objId);
            ds.addOnStatusChanged(self._onDSStatusChanged, self._objId, self);

            ds.addOnItemDeleting(function (sender, args) {
                if (!!self._itemsByKey[args.item._key]) {
                    self._onItemDeleting(args);
                }
            }, self._objId);
            ds.addOnItemAdded(function (sender, args) {
                if (self._isAddingNew) {
                    if (!self._itemsByKey[args.item._key]) {
                        self._attach(args.item);
                    }
                    self.currentItem = args.item;
                    self._onEditing(args.item, true, false);
                    self._onItemAdded(args.item);
                }
            }, self._objId);
            ds.addOnItemAdding(function (sender, args) {
                if (self._isAddingNew) {
                    self._onItemAdding(args.item);
                }
            }, self._objId);
        }
        protected _unbindDS() {
            var self = this, ds = this._dataSource;
            if (!ds) return;
            ds.removeNSHandlers(self._objId);
        }
        protected _onCurrentChanging(newCurrent: TItem) {
            var ds = this._dataSource, item: TItem;
            try {
                item = ds._getInternal().getEditingItem();
                if (!!item && newCurrent !== item)
                    ds.endEdit();
            }
            catch (ex) {
                ds.cancelEdit();
                RIAPP.reThrow(ex, this.handleError(ex, this));
            }
        }
        protected _onPageChanged() {
            this._refresh(true);
        }
        _getStrValue(val: any, fieldInfo: IFieldInfo): string {
            return this._dataSource._getInternal().getStrValue(val, fieldInfo);
        }
        _getErrors(item: TItem): collMOD.IErrors {
            var ds = this._dataSource;
            return ds._getInternal().getErrors(item);
        }
        getItemsWithErrors() {
            var ds = this._dataSource;
            return ds.getItemsWithErrors();
        }
        appendItems(items: TItem[]) {
            if (this._isDestroyCalled)
                return [];
            return this._fillItems({ items: items, isPageChanged: false, clear: false, isAppend: true });
        }
        addNew() {
            var item: TItem;
            this._isAddingNew = true;
            try {
                item = this._dataSource.addNew();
            } finally {
                this._isAddingNew = false;
            }
            return item;
        }
        removeItem(item: TItem) {
            if (item._key === null) {
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
            this.totalCount = this.totalCount - 1;
            this._onRemoved(item, oldPos);
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
        sortLocal(fieldNames: string[], sortOrder: collMOD.SORT_ORDER): IPromise<any> {
            var mult = 1, parser = global.parser, deffered = utils.createDeferred();
            if (sortOrder === collMOD.SORT_ORDER.DESC)
                mult = -1;
            var fn_sort = function (a: any, b: any): number {
                var res = 0, i: number, len: number, af: any, bf: any, fieldName: string;
                for (i = 0, len = fieldNames.length; i < len; i += 1) {
                    fieldName = fieldNames[i];
                    af = parser.resolvePath(a, fieldName);
                    bf = parser.resolvePath(b, fieldName);
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
            try {
                this.fn_sort = fn_sort;
                deffered.resolve();
            } catch (ex) {
                deffered.reject(ex);
                this.handleError(ex, this);
                RIAPP.throwDummy(ex);
            }
            return deffered.promise();
        }
        getIsHasErrors() {
            return this._dataSource.getIsHasErrors();
        }
        clear() {
            this._clear(false);
        }
        refresh(): void {
            this._refresh(false);
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            this._unbindDS();
            this._dataSource = null;
            this._fn_filter = null;
            this._fn_sort = null;
            super.destroy();
        }
        get dataSource() { return this._dataSource; }
        get isPagingEnabled() { return this._options.enablePaging; }
        set isPagingEnabled(v) {
            if (this._options.enablePaging !== v) {
                this._options.enablePaging = v;
                this.raisePropertyChanged(PROP_NAME.isPagingEnabled);
                this._refresh(false);
            }
        }
        get permissions() { return this._dataSource.permissions; }
        get fn_filter() { return this._fn_filter; }
        set fn_filter(v: (item: TItem) => boolean) {
            if (this._fn_filter !== v) {
                this._fn_filter = v;
                this._refresh(false);
            }
        }
        get fn_sort() { return this._fn_sort; }
        set fn_sort(v: (item1: TItem, item2: TItem) => number) {
            if (this._fn_sort !== v) {
                this._fn_sort = v;
                this._refresh(false);
            }
        }
        get fn_itemsProvider() { return this._fn_itemsProvider; }
        set fn_itemsProvider(v: (ds: collMOD.BaseCollection<TItem>) => TItem[]) {
            if (this._fn_itemsProvider !== v) {
                this._fn_itemsProvider = v;
                this._refresh(false);
            }
        }
    }

    export class TDataView extends DataView<collMOD.ICollectionItem>{
    }

    export class ChildDataView<TItem extends IEntityItem> extends DataView<TItem> {
        private _parentItem: IEntityItem;
        private _refreshTimeout: number;
        private _association: Association;

        constructor(options: {
            association: Association;
            fn_filter?: (item: TItem) => boolean;
            fn_sort?: (item1: TItem, item2: TItem) => number;
        }) {
            this._parentItem = null;
            this._refreshTimeout = null;
            this._association = options.association;
            var opts: {
                dataSource: collMOD.BaseCollection<TItem>;
                fn_filter?: (item: TItem) => boolean;
                fn_sort?: (item1: TItem, item2: TItem) => number;
                fn_itemsProvider?: (ds: collMOD.BaseCollection<TItem>) => TItem[];
            } = utils.extend(false, {
                dataSource: this._association.childDS,
                fn_filter: null,
                fn_sort: null,
                fn_itemsProvider: null
            }, options);

            var self = this, assoc = this._association, save_fn_filter = options.fn_filter;
            opts.fn_filter = function (item) {
                if (!self._parentItem)
                    return false;
                var fkey1 = assoc.getParentFKey(self._parentItem);
                if (!fkey1)
                    return false;
                var fkey2 = assoc.getChildFKey(item);
                if (!fkey2)
                    return false;
                if (fkey1 !== fkey2)
                    return false;
                if (!save_fn_filter)
                    return true;
                else
                    return save_fn_filter(item);
            };
            super(opts);
        }
        protected _refresh(isPageChanged: boolean): void {
            var self = this, ds = this.dataSource;
            if (!ds) {
                return;
            }
            var items = <TItem[]>self._association.getChildItems(self._parentItem);
            if (!!self.fn_filter) {
                items = items.filter(self.fn_filter);
            }
            if (!!self.fn_sort) {
                items = items.sort(self.fn_sort);
            }
            self._fillItems({ items: items, isPageChanged: !!isPageChanged, clear: true, isAppend: false });
            self._onViewRefreshed({});
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            clearTimeout(this._refreshTimeout);
            this._association = null;
            super.destroy();
        }
        toString() {
            if (!!this._association)
                return 'ChildDataView for ' + this._association.toString();
            return 'ChildDataView';
        }
        get parentItem() { return this._parentItem; }
        set parentItem(v: IEntityItem) {
            if (this._parentItem !== v) {
                this._parentItem = v;
                this.raisePropertyChanged(PROP_NAME.parentItem);
                var self = this;
                if (this.items.length > 0) {
                    this.clear();
                    this._onViewRefreshed({});
                }
                clearTimeout(self._refreshTimeout);
                self._refreshTimeout = setTimeout(function () {
                    if (self._isDestroyCalled) {
                        return;
                    }
                    self._refresh(false);
                }, 250);
            }
        }
        get association() { return this._association; }
    }

    export class TChildDataView extends ChildDataView<IEntityItem>{
    }

    export class BaseComplexProperty extends RIAPP.BaseObject implements RIAPP.IErrorNotification {
        private _name: string;

        constructor(name: string) {
            super();
            this._name = name;
        }
        _getFullPath(path: string): string {
            throw new Error('Not Implemented');
        }
        getName() {
            return this._name;
        }
        setValue(fullName: string, value: any) {
            throw new Error('Not Implemented');
        }
        getValue(fullName: string): any {
            throw new Error('Not Implemented');
        }
        getFieldInfo(): IFieldInfo {
            throw new Error('Not Implemented');
        }
        getProperties(): IFieldInfo[] {
            throw new Error('Not Implemented');
        }
        getFullPath(name: string): string {
            throw new Error('Not Implemented');
        }
        getEntity(): EntityAspect<IEntityItem, DbContext> {
            throw new Error('Not Implemented');
        }
        getPropertyByName(name: string): IFieldInfo {
            var arrProps = this.getProperties().filter((f) => { return f.fieldName == name; });
            if (!arrProps || arrProps.length != 1)
                throw new Error(utils.format(RIAPP.ERRS.ERR_ASSERTION_FAILED, "arrProps.length == 1"));
            return arrProps[0];
        }
        getIsHasErrors(): boolean {
            return this.getEntity().getIsHasErrors();
        }
        addOnErrorsChanged(fn: RIAPP.TEventHandler<EntityAspect<IEntityItem, DbContext>, any>, nmspace?: string, context?: any): void {
            this.getEntity().addOnErrorsChanged(fn, nmspace, context);
        }
        removeOnErrorsChanged(nmspace?: string): void {
            this.getEntity().removeOnErrorsChanged(nmspace)
        }
        getFieldErrors(fieldName: string): RIAPP.IValidationInfo[] {
            var fullName = this.getFullPath(fieldName);
            return this.getEntity().getFieldErrors(fullName);
        }
        getAllErrors(): RIAPP.IValidationInfo[] {
            return this.getEntity().getAllErrors();
        }
        getIErrorNotification(): RIAPP.IErrorNotification {
            return this;
        }
    }

    export class RootComplexProperty extends BaseComplexProperty {
        private _entity: EntityAspect<IEntityItem, DbContext>;

        constructor(name: string, owner: EntityAspect<IEntityItem, DbContext>) {
            super(name);
            this._entity = owner;
        }
        _getFullPath(path: string): string {
            return this.getName() + '.' + path;
        }
        setValue(fullName: string, value: any) {
            this._entity._setFieldVal(fullName, value);
        }
        getValue(fullName: string): any {
            return this._entity._getFieldVal(fullName);
        }
        getFieldInfo(): IFieldInfo {
            return this._entity.getFieldInfo(this.getName());
        }
        getProperties(): IFieldInfo[] {
            return this.getFieldInfo().nested;
        }
        getEntity() {
            return this._entity;
        }
        getFullPath(name: string): string {
            return this.getName() + '.' + name;
        }
    }

    export class ChildComplexProperty extends BaseComplexProperty {
        private _parent: BaseComplexProperty;

        constructor(name: string, parent: BaseComplexProperty) {
            super(name);
            this._parent = parent;
        }
        _getFullPath(path: string): string {
            return this._parent._getFullPath(this.getName() + '.' + path);
        }
        setValue(fullName: string, value: any) {
            this.getEntity()._setFieldVal(fullName, value);
        }
        getValue(fullName: string) {
            return this.getEntity()._getFieldVal(fullName);
        }
        getFieldInfo(): IFieldInfo {
            var name = this.getName();
            return this._parent.getPropertyByName(name);
        }
        getProperties(): IFieldInfo[] {
            return this.getFieldInfo().nested;
        }
        getParent(): BaseComplexProperty {
            return this._parent;
        }
        getRootProperty(): RootComplexProperty {
            var parent = this._parent;
            while (!!parent && (parent instanceof ChildComplexProperty)) {
                parent = (<ChildComplexProperty>parent).getParent();
            }
            if (!parent || !(parent instanceof RootComplexProperty))
                throw new Error(utils.format(RIAPP.ERRS.ERR_ASSERTION_FAILED, "parent instanceof RootComplexProperty"));
            return <RootComplexProperty>parent;
        }
        getFullPath(name: string): string {
            return this._parent._getFullPath(this.getName() + '.' + name);
        }
        getEntity() {
            return this.getRootProperty().getEntity();
        }
    }


    _isModuleLoaded = true;
}