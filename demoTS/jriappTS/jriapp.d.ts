/// <reference path="../jriappTS/thirdparty/jquery.d.ts" />
/// <reference path="../jriappTS/thirdparty/moment.d.ts" />
/// <reference path="../jriappTS/thirdparty/qtip2.d.ts" />
/// <reference path="../jriappTS/jriapp_strings.d.ts" />
declare namespace RIAPP.consts {
    var DATA_ATTR: {
        EL_VIEW_KEY: string;
        DATA_BIND: string;
        DATA_VIEW: string;
        DATA_EVENT_SCOPE: string;
        DATA_ITEM_KEY: string;
        DATA_CONTENT: string;
        DATA_COLUMN: string;
        DATA_NAME: string;
        DATA_FORM: string;
    };
    const enum DATE_CONVERSION {
        None = 0,
        ServerLocalToClientLocal = 1,
        UtcToClientLocal = 2,
    }
    const enum DATA_TYPE {
        None = 0,
        String = 1,
        Bool = 2,
        Integer = 3,
        Decimal = 4,
        Float = 5,
        DateTime = 6,
        Date = 7,
        Time = 8,
        Guid = 9,
        Binary = 10,
    }
    const enum FIELD_TYPE {
        None = 0,
        ClientOnly = 1,
        Calculated = 2,
        Navigation = 3,
        RowTimeStamp = 4,
        Object = 5,
        ServerCalculated = 6,
    }
    const enum KEYS {
        backspace = 8,
        tab = 9,
        enter = 13,
        esc = 27,
        space = 32,
        pageUp = 33,
        pageDown = 34,
        end = 35,
        home = 36,
        left = 37,
        up = 38,
        right = 39,
        down = 40,
        del = 127,
    }
    var ELVIEW_NM: {
        DATAFORM: string;
    };
    var LOADER_GIF: {
        SMALL: string;
        NORMAL: string;
    };
}
declare namespace RIAPP {
    import constsMOD = RIAPP.consts;
    const enum BindTo {
        Source = 0,
        Target = 1,
    }
    type TEventHandler<T, U> = (sender: T, args: U) => void;
    type TErrorArgs = {
        error: any;
        source: any;
        isHandled: boolean;
    };
    type TErrorHandler = (sender: any, args: TErrorArgs) => void;
    type TPropChangedHandler = (sender: any, args: {
        property: string;
    }) => void;
    interface IIndexer<T> {
        [property: string]: T;
    }
    interface ICoreModule {
        _isModuleLoaded: boolean;
        _initModule: (app: Application) => void;
    }
    interface IBaseObject {
        raisePropertyChanged(name: string): void;
        addHandler(name: string, handler: TEventHandler<any, any>, nmspace?: string, context?: BaseObject, prepend?: boolean): void;
        removeHandler(name?: string, nmspace?: string): void;
        addOnPropertyChange(prop: string, handler: TPropChangedHandler, nmspace?: string, context?: BaseObject): void;
        removeOnPropertyChange(prop?: string, nmspace?: string): void;
        removeNSHandlers(nmspace?: string): void;
        handleError(error: any, source: any): boolean;
        addOnDestroyed(handler: TEventHandler<any, any>, nmspace?: string, context?: BaseObject): void;
        removeOnDestroyed(nmspace?: string): void;
        addOnError(handler: TErrorHandler, nmspace?: string, context?: BaseObject): void;
        removeOnError(nmspace?: string): void;
        raiseEvent(name: string, args: any): void;
        getIsDestroyed(): boolean;
        getIsDestroyCalled(): boolean;
        destroy(): void;
    }
    interface IThenable<T> {
        then(onFullfilled: (res?: T) => any, onRejected?: (res: any) => any): IPromise<any>;
    }
    interface IPromise<T> extends IThenable<T> {
        always(...alwaysCallbacks: {
            (res: any): void;
        }[]): IPromise<any>;
        done(...doneCallbacks: {
            (res: T): void;
        }[]): IPromise<any>;
        fail(...failCallbacks: {
            (res: any): void;
        }[]): IPromise<any>;
        then(onFullfilled: (res: T) => any, onRejected?: (res: any) => any): IPromise<any>;
    }
    interface IVoidPromise extends IThenable<any> {
        always(...alwaysCallbacks: {
            (res: any): void;
        }[]): IPromise<any>;
        done(...doneCallbacks: {
            (): void;
        }[]): IPromise<any>;
        fail(...failCallbacks: {
            (res: any): void;
        }[]): IPromise<any>;
        then(onFullfilled: () => any, onRejected?: (res: any) => any): IPromise<any>;
    }
    interface IDeferred<T> extends IPromise<T> {
        reject(arg?: any): IPromise<any>;
        resolve(arg?: T): IPromise<any>;
        promise(): IPromise<T>;
        state(): string;
    }
    interface IAnimation {
        beforeShow(el: HTMLElement): void;
        show(onEnd: () => void): void;
        beforeHide(el: HTMLElement): void;
        hide(onEnd: () => void): void;
        stop(): void;
    }
    interface IEditable {
        beginEdit(): boolean;
        endEdit(): boolean;
        cancelEdit(): boolean;
        isEditing: boolean;
    }
    interface ISubmittable {
        submitChanges(): IVoidPromise;
        rejectChanges(): void;
        isCanSubmit: boolean;
    }
    interface IValidationInfo {
        fieldName: string;
        errors: string[];
    }
    interface IErrorNotification {
        getIsHasErrors(): boolean;
        addOnErrorsChanged(fn: RIAPP.TEventHandler<any, any>, nmspace?: string, context?: any): void;
        removeOnErrorsChanged(nmspace?: string): void;
        getFieldErrors(fieldName: string): IValidationInfo[];
        getAllErrors(): IValidationInfo[];
        getIErrorNotification(): IErrorNotification;
    }
    interface IDatepicker {
        datepickerRegion: string;
        dateFormat: string;
        attachTo($el: any, options?: any): void;
        detachFrom($el: any): void;
        parseDate(str: string): Date;
        formatDate(date: Date): string;
    }
    interface IConverter {
        convertToSource(val: any, param: any, dataContext: any): any;
        convertToTarget(val: any, param: any, dataContext: any): any;
    }
    interface ISelectable {
        getContainerEl(): HTMLElement;
        getUniqueID(): string;
        onKeyDown(key: number, event: Event): void;
        onKeyUp(key: number, event: Event): void;
    }
    interface ISelectableProvider {
        getISelectable(): ISelectable;
    }
    interface IExports {
        getExports(): IIndexer<any>;
    }
    interface IGroupInfo {
        fn_loader?: () => IPromise<string>;
        url?: string;
        names: string[];
        app?: Application;
        promise?: IPromise<string>;
    }
    interface ITemplateLoaderInfo {
        fn_loader: () => IPromise<string>;
        groupName?: string;
    }
    interface IUnResolvedBindingArgs {
        bindTo: BindTo;
        root: any;
        path: string;
        propName: string;
    }
    interface IBindableElement {
        el: HTMLElement;
        dataView: string;
        dataForm: string;
        expressions: string[];
    }
    interface IFieldInfo {
        fieldName: string;
        isPrimaryKey: number;
        dataType: constsMOD.DATA_TYPE;
        isNullable: boolean;
        isReadOnly: boolean;
        isAutoGenerated: boolean;
        isNeedOriginal: boolean;
        maxLength: number;
        dateConversion: constsMOD.DATE_CONVERSION;
        allowClientDefault: boolean;
        range: string;
        regex: string;
        fieldType: constsMOD.FIELD_TYPE;
        dependentOn: string;
        nested: IFieldInfo[];
        dependents?: string[];
        fullName?: string;
    }
    interface IAppOptions {
        application_name?: string;
        user_modules?: {
            name: string;
            initFn: (app: Application) => any;
        }[];
        application_root?: {
            querySelectorAll: (selectors: string) => NodeList;
        };
    }
}
declare namespace RIAPP.MOD.utils {
    var _isModuleLoaded: boolean;
    var _initModule: (app: Application) => void;
}
declare namespace RIAPP.MOD.errors {
    var _isModuleLoaded: boolean;
    var _initModule: (app: Application) => void;
}
declare namespace RIAPP.MOD.converter {
    var _isModuleLoaded: boolean;
    var _initModule: (app: Application) => void;
}
declare namespace RIAPP.MOD.defaults {
    var _isModuleLoaded: boolean;
    var _initModule: (app: Application) => void;
}
declare namespace RIAPP.MOD.parser {
    var _isModuleLoaded: boolean;
    var _initModule: (app: Application) => void;
}
declare namespace RIAPP.MOD.mvvm {
    var _isModuleLoaded: boolean;
    var _initModule: (app: Application) => void;
}
declare namespace RIAPP.MOD.baseElView {
    var _isModuleLoaded: boolean;
    var _initModule: (app: Application) => void;
    var _isElView: (obj: any) => boolean;
}
declare namespace RIAPP.MOD.binding {
    var _isModuleLoaded: boolean;
    var _initModule: (app: Application) => void;
    interface IBindingInfo {
        mode?: string;
        converterParam?: any;
        converter?: any;
        targetPath: string;
        sourcePath?: string;
        to?: string;
        target?: any;
        source?: any;
    }
    var _isBinding: (obj: any) => boolean;
}
declare namespace RIAPP.MOD.collection {
    var _isModuleLoaded: boolean;
    var _initModule: (app: Application) => void;
    var _isCollection: (obj: any) => boolean;
    var _getItemByProp: (obj: any, prop: string) => any;
}
declare namespace RIAPP.MOD.template {
    var _isModuleLoaded: boolean;
    var _initModule: (app: Application) => void;
    var _isTemplateElView: (obj: any) => boolean;
}
declare namespace RIAPP.MOD.baseContent {
    var _isModuleLoaded: boolean;
    var _initModule: (app: Application) => void;
}
declare namespace RIAPP.MOD.dataform {
    var _isModuleLoaded: boolean;
    var _initModule: (app: Application) => void;
    import elviewMOD = RIAPP.MOD.baseElView;
    var _setIsInsideTemplate: (elView: elviewMOD.BaseElView) => void;
    var _isDataForm: (el: HTMLElement) => boolean;
    var _isInsideDataForm: (el: HTMLElement) => boolean;
    var _isInNestedForm: (root: any, forms: HTMLElement[], el: HTMLElement) => boolean;
    var _getParentDataForm: (rootForm: HTMLElement, el: HTMLElement) => HTMLElement;
}
declare namespace RIAPP.MOD.dynacontent {
    var _isModuleLoaded: boolean;
    var _initModule: (app: Application) => void;
}
declare namespace RIAPP.MOD.datepicker {
    var _isModuleLoaded: boolean;
    var _initModule: (app: Application) => void;
}
declare namespace RIAPP.MOD.tabs {
    var _isModuleLoaded: boolean;
    var _initModule: (app: Application) => void;
}
declare namespace RIAPP.MOD.listbox {
    var _isModuleLoaded: boolean;
    var _initModule: (app: Application) => void;
}
declare namespace RIAPP.MOD.datadialog {
    var _isModuleLoaded: boolean;
    var _initModule: (app: Application) => void;
}
declare namespace RIAPP.MOD.datagrid {
    var _isModuleLoaded: boolean;
    var _initModule: (app: Application) => void;
}
declare namespace RIAPP.MOD.pager {
    var _isModuleLoaded: boolean;
    var _initModule: (app: Application) => void;
}
declare namespace RIAPP.MOD.stackpanel {
    var _isModuleLoaded: boolean;
    var _initModule: (app: Application) => void;
}
declare namespace RIAPP.MOD.db {
    var _isModuleLoaded: boolean;
    var _initModule: (app: Application) => void;
}
declare namespace RIAPP {
    enum DEBUG_LEVEL {
        NONE = 0,
        NORMAL = 1,
        HIGH = 2,
    }
    var DebugLevel: DEBUG_LEVEL;
    function startDebugger(): void;
    function throwDummy(origErr: any): void;
    function checkIsDummy(error: any): boolean;
    function reThrow(ex: any, isHandled: boolean): void;
    interface IListNode {
        context: any;
        fn: TEventHandler<any, any>;
        ns: string;
        next: IListNode;
    }
    interface IList {
        head: IListNode;
        tail: IListNode;
    }
    class ListHelper {
        static CreateList(): IList;
        static CreateNode(handler: TErrorHandler, ns: string, context?: any): IListNode;
        static countNodes(list: IList): number;
        static prependNode(list: IList, node: IListNode): void;
        static appendNode(list: IList, node: IListNode): void;
        static removeNodes(list: IList, ns: string): void;
        static toArray(list: IList): IListNode[];
    }
    class ArrayHelper {
        static clone<T>(arr: T[]): T[];
        static fromList(list: {
            length: number;
            [index: number]: any;
        }): any[];
        static fromCollection(list: HTMLCollection): any[];
        static distinct(arr: any[]): any[];
    }
    class baseUtils {
        private static _newID;
        static getNewID(): number;
        static isNull(a: any): boolean;
        static isUndefined(a: any): boolean;
        static isNt(a: any): boolean;
        static isString(a: any): boolean;
        static isFunc(a: any): boolean;
        static isBoolean(a: any): boolean;
        static isDate(a: any): boolean;
        static isNumber(a: any): boolean;
        static isNumeric(obj: any): boolean;
        static endsWith(str: string, suffix: string): boolean;
        static startsWith(str: string, prefix: string): boolean;
        static fastTrim(str: string): string;
        static trim(str: string, chars?: string): string;
        static ltrim(str: string, chars?: string): string;
        static rtrim(str: string, chars?: string): string;
        static isArray(o: any): boolean;
        static hasProp(obj: any, prop: string): boolean;
        static format(format_str: string, ...args: any[]): string;
        static setValue(root: any, namePath: string, val: any, checkOverwrite: boolean): void;
        static getValue(root: any, namePath: string): any;
        static removeValue(root: any, namePath: string): any;
        static resolveOwner(obj: any, path: string): any;
    }
}
declare namespace RIAPP {
    class BaseObject implements IBaseObject {
        protected _isDestroyed: boolean;
        protected _isDestroyCalled: boolean;
        private _events;
        constructor();
        private _removeNsHandler(ev, ns);
        protected _getEventNames(): string[];
        protected _addHandler(name: string, handler: TEventHandler<any, any>, nmspace?: string, context?: BaseObject, prepend?: boolean): void;
        protected _removeHandler(name?: string, nmspace?: string): void;
        protected _raiseEvent(name: string, args: any): void;
        protected _checkEventName(name: string): void;
        protected _isHasProp(prop: string): boolean;
        handleError(error: any, source: any): boolean;
        raisePropertyChanged(name: string): void;
        addHandler(name: string, handler: TEventHandler<any, any>, nmspace?: string, context?: BaseObject, prepend?: boolean): void;
        removeHandler(name?: string, nmspace?: string): void;
        addOnDestroyed(handler: TEventHandler<any, any>, nmspace?: string, context?: BaseObject): void;
        removeOnDestroyed(nmspace?: string): void;
        addOnError(handler: TErrorHandler, nmspace?: string, context?: BaseObject): void;
        removeOnError(nmspace?: string): void;
        removeNSHandlers(nmspace?: string): void;
        raiseEvent(name: string, args: any): void;
        addOnPropertyChange(prop: string, handler: TPropChangedHandler, nmspace?: string, context?: BaseObject): void;
        removeOnPropertyChange(prop?: string, nmspace?: string): void;
        getIsDestroyed(): boolean;
        getIsDestroyCalled(): boolean;
        destroy(): void;
    }
}
declare namespace RIAPP {
    import utilsMOD = RIAPP.MOD.utils;
    import parserMOD = RIAPP.MOD.parser;
    import defMOD = RIAPP.MOD.defaults;
    var global: Global;
    var css_riaTemplate: string;
    interface IInternalGlobMethods {
        initialize(): void;
        trackSelectable(selectable: ISelectableProvider): void;
        untrackSelectable(selectable: ISelectableProvider): void;
        registerApp(app: Application): void;
        unregisterApp(app: Application): void;
        destroyApps(): void;
        registerObject(root: IExports, name: string, obj: any): void;
        getObject(root: IExports, name: string): any;
        removeObject(root: IExports, name: string): any;
        processTemplateSections(root: {
            querySelectorAll: (selectors: string) => NodeList;
        }): void;
        loadTemplatesAsync(fn_loader: () => IPromise<string>, app: Application): IPromise<any>;
        registerTemplateLoader(name: string, loader: ITemplateLoaderInfo): void;
        getTemplateLoader(name: string): () => IPromise<string>;
        registerTemplateGroup(groupName: string, group: IGroupInfo): void;
        getTemplateGroup(name: string): IGroupInfo;
        waitForNotLoading(callback: (...args: any[]) => any, callbackArgs: any): void;
        getConverter(name: string): IConverter;
        onUnResolvedBinding(bindTo: BindTo, root: any, path: string, propName: string): void;
    }
    class Global extends BaseObject implements IExports {
        static vesion: string;
        static _TEMPLATES_SELECTOR: string;
        static _TEMPLATE_SELECTOR: string;
        private _window;
        private _appInst;
        private _$;
        private _currentSelectable;
        private _defaults;
        private _userCode;
        private _utils;
        private _templateLoaders;
        private _templateGroups;
        private _promises;
        private _isReady;
        private _isInitialized;
        private _waitQueue;
        private _parser;
        private _exports;
        private _internal;
        constructor(window: Window, jQuery: JQueryStatic);
        private _onCreate();
        private _processTemplateSection(templateSection, app);
        private _registerTemplateLoaderCore(name, loader);
        private _getTemplateLoaderCore(name);
        protected _getEventNames(): string[];
        protected _addHandler(name: string, fn: (sender: any, args: any) => void, nmspace?: string, context?: BaseObject, prepend?: boolean): void;
        private _initialize();
        private _trackSelectable(selectable);
        private _untrackSelectable(selectable);
        private _registerApp(app);
        private _unregisterApp(app);
        private _destroyApps();
        private _registerObject(root, name, obj);
        private _getObject(root, name);
        private _removeObject(root, name);
        private _processTemplateSections(root);
        private _loadTemplatesAsync(fn_loader, app);
        private _registerTemplateLoader(name, loader);
        private _getTemplateLoader(name);
        private _registerTemplateGroup(groupName, group);
        private _getTemplateGroup(name);
        private _waitForNotLoading(callback, callbackArgs);
        private _getConverter(name);
        private _onUnResolvedBinding(bindTo, root, path, propName);
        _getInternal(): IInternalGlobMethods;
        addOnLoad(fn: TEventHandler<Global, any>, nmspace?: string, context?: BaseObject): void;
        addOnUnLoad(fn: TEventHandler<Global, any>, nmspace?: string, context?: BaseObject): void;
        addOnInitialize(fn: TEventHandler<Global, any>, nmspace?: string, context?: BaseObject): void;
        addOnUnResolvedBinding(fn: TEventHandler<Global, IUnResolvedBindingArgs>, nmspace?: string, context?: BaseObject): void;
        removeOnUnResolvedBinding(nmspace?: string): void;
        getExports(): IIndexer<any>;
        findApp(name: string): Application;
        destroy(): void;
        registerType(name: string, obj: any): void;
        getType(name: string): any;
        registerConverter(name: string, obj: IConverter): void;
        registerElView(name: string, elViewType: any): void;
        getImagePath(imageName: string): string;
        loadTemplates(url: string): void;
        toString(): string;
        parser: parserMOD.Parser;
        isLoading: boolean;
        $: JQueryStatic;
        window: Window;
        document: Document;
        currentSelectable: ISelectableProvider;
        defaults: defMOD.Defaults;
        utils: utilsMOD.Utils;
        UC: any;
    }
}
declare namespace RIAPP.MOD.utils {
    class Checks {
        static isNull: typeof baseUtils.isNull;
        static isUndefined: typeof baseUtils.isUndefined;
        static isNt: typeof baseUtils.isNt;
        static isFunction: typeof baseUtils.isFunc;
        static isString: typeof baseUtils.isString;
        static isArray: typeof baseUtils.isArray;
        static isBoolean: typeof baseUtils.isBoolean;
        static isDate: typeof baseUtils.isDate;
        static isNumber: typeof baseUtils.isNumber;
        static isNumeric: typeof baseUtils.isNumeric;
        static isHTML(a: any): boolean;
        static isObject(a: any): boolean;
        static isSimpleObject(a: any): boolean;
        static isRegExp(a: any): boolean;
        static isBoolString(a: any): boolean;
        static isBaseObj(obj: any): boolean;
        static isEditable(obj: any): boolean;
        static isSubmittable(obj: any): boolean;
        static isErrorNotification(obj: any): boolean;
    }
    class StringUtils {
        static endsWith: typeof baseUtils.endsWith;
        static startsWith: typeof baseUtils.startsWith;
        static trim: typeof baseUtils.trim;
        static formatNumber(num: any, decimals?: number, dec_point?: string, thousands_sep?: string): string;
        static stripNonNumeric(str: string): string;
    }
    class Validations {
        static checkNumRange(num: number, range: string): void;
        static _dtRangeToDate(str: string): Date;
        static checkDateRange(dt: Date, range: string): void;
    }
    interface IValueUtils {
        valueToDate(val: string, dtcnv: number, stz: number): Date;
        dateToValue(dt: Date, dtcnv: consts.DATE_CONVERSION, stz: number): string;
        compareVals(v1: any, v2: any, dataType: consts.DATA_TYPE): boolean;
        stringifyValue(v: any, dcnv: consts.DATE_CONVERSION, dataType: consts.DATA_TYPE, stz: number): string;
        parseValue(v: string, dataType: consts.DATA_TYPE, dcnv: consts.DATE_CONVERSION, stz: number): any;
    }
    var valueUtils: IValueUtils;
    class LifeTimeScope extends RIAPP.BaseObject {
        private _objs;
        constructor();
        static create(): LifeTimeScope;
        addObj(b: BaseObject): void;
        removeObj(b: BaseObject): void;
        getObjs(): BaseObject[];
        destroy(): void;
        toString(): string;
    }
    class PropWatcher extends RIAPP.BaseObject {
        private _objId;
        private _objs;
        constructor();
        static create(): PropWatcher;
        addPropWatch(obj: BaseObject, prop: string, fn_onChange: (prop: string) => void): void;
        addWatch(obj: BaseObject, props: string[], fn_onChange: (prop: string) => void): void;
        removeWatch(obj: BaseObject): void;
        destroy(): void;
        toString(): string;
        uniqueID: string;
    }
    interface IWaitQueueItem {
        prop: string;
        groupName?: string;
        predicate: (val: any) => boolean;
        action: (...args: any[]) => any;
        actionArgs?: any[];
        lastWins?: boolean;
        syncCheck?: boolean;
    }
    class WaitQueue extends RIAPP.BaseObject {
        private _objId;
        private _owner;
        private _queue;
        constructor(owner: BaseObject);
        static create(owner: BaseObject): WaitQueue;
        protected _checkQueue(prop: string, value: any): void;
        enQueue(item: IWaitQueueItem): void;
        destroy(): void;
        toString(): string;
        uniqueID: string;
        owner: BaseObject;
    }
    class Utils {
        constructor();
        static create(): Utils;
        check: typeof Checks;
        str: typeof StringUtils;
        validation: typeof Validations;
        getNewID(): number;
        isContained(oNode: any, oCont: any): boolean;
        slice: (start?: number, end?: number) => any[];
        get_timeZoneOffset: () => number;
        parseBool(bool_value: any): any;
        round(num: number, decimals: number): number;
        performAjaxCall(url: string, postData: string, async: boolean, fn_success: (res: string) => void, fn_error: (res: any) => void, context: any): IPromise<string>;
        performAjaxGet(url: string): IPromise<string>;
        format: typeof baseUtils.format;
        extend(deep: boolean, defaults: any, options: any): any;
        removeNode(node: Node): void;
        insertAfter(referenceNode: Node, newNode: Node): void;
        getProps(obj: any): string[];
        forEachProp(obj: any, fn: (name: string) => void): void;
        hasProp(obj: any, prop: string): boolean;
        createDeferred(): IDeferred<any>;
        isDeferredPending(deferred: IDeferred<any>): boolean;
        cloneObj(o: any, mergeIntoObj?: any): any;
        shallowCopy(o: any): any;
        mergeObj(obj: any, mergeIntoObj: any): any;
        removeFromArray(array: any[], obj: any): number;
        insertIntoArray(array: any[], obj: any, pos: number): void;
        getErrorNotification(obj: any): IErrorNotification;
        getEditable(obj: any): IEditable;
        getSubmittable(obj: any): ISubmittable;
        destroyJQueryPlugin($el: JQuery, name: string): void;
        uuid: (len?: number, radix?: number) => string;
    }
}
declare namespace RIAPP.MOD.errors {
    class BaseError extends RIAPP.BaseObject {
        private _message;
        private _isDummy;
        private _origError;
        constructor(message: string);
        static create(message: string): BaseError;
        toString(): string;
        message: string;
        isDummy: boolean;
        origError: any;
    }
    class DummyError extends BaseError {
        constructor(ex: any);
        static create(ex: any): DummyError;
    }
    class ValidationError extends BaseError {
        _errors: RIAPP.IValidationInfo[];
        _item: any;
        constructor(errorInfo: RIAPP.IValidationInfo[], item: any);
        item: any;
        errors: IValidationInfo[];
    }
}
declare namespace RIAPP.MOD.converter {
    var NUM_CONV: {
        None: number;
        Integer: number;
        Decimal: number;
        Float: number;
        SmallInt: number;
    };
    class BaseConverter implements IConverter {
        convertToSource(val: any, param: any, dataContext: any): any;
        convertToTarget(val: any, param: any, dataContext: any): any;
    }
    class DateConverter implements IConverter {
        convertToSource(val: any, param: any, dataContext: any): Date;
        convertToTarget(val: any, param: any, dataContext: any): string;
        toString(): string;
    }
    class DateTimeConverter implements IConverter {
        convertToSource(val: any, param: any, dataContext: any): Date;
        convertToTarget(val: any, param: any, dataContext: any): string;
        toString(): string;
    }
    class NumberConverter implements IConverter {
        convertToSource(val: any, param: any, dataContext: any): number;
        convertToTarget(val: any, param: any, dataContext: any): string;
        toString(): string;
    }
    class IntegerConverter implements IConverter {
        convertToSource(val: any, param: any, dataContext: any): number;
        convertToTarget(val: any, param: any, dataContext: any): string;
        toString(): string;
    }
    class SmallIntConverter implements IConverter {
        convertToSource(val: any, param: any, dataContext: any): number;
        convertToTarget(val: any, param: any, dataContext: any): string;
        toString(): string;
    }
    class DecimalConverter implements IConverter {
        convertToSource(val: any, param: any, dataContext: any): number;
        convertToTarget(val: any, param: any, dataContext: any): string;
        toString(): string;
    }
    class FloatConverter implements IConverter {
        convertToSource(val: any, param: any, dataContext: any): number;
        convertToTarget(val: any, param: any, dataContext: any): string;
        toString(): string;
    }
    class NotConverter implements IConverter {
        convertToSource(val: any, param: any, dataContext: any): boolean;
        convertToTarget(val: any, param: any, dataContext: any): boolean;
    }
}
declare namespace RIAPP.MOD.defaults {
    class Defaults extends RIAPP.BaseObject {
        private _imagesPath;
        private _datepicker;
        private _dateFormat;
        private _dateTimeFormat;
        private _timeFormat;
        private _decimalPoint;
        private _thousandSep;
        private _decPrecision;
        private _ajaxTimeOut;
        constructor();
        toString(): string;
        ajaxTimeOut: number;
        dateFormat: string;
        timeFormat: string;
        dateTimeFormat: string;
        datepicker: IDatepicker;
        imagesPath: string;
        decimalPoint: string;
        thousandSep: string;
        decPrecision: number;
    }
}
declare namespace RIAPP.MOD.parser {
    class Parser {
        static __trimOuterBracesRX: RegExp;
        static __trimQuotsRX: RegExp;
        static __trimBracketsRX: RegExp;
        static __indexedPropRX: RegExp;
        static __valueDelimeter1: string;
        static __valueDelimeter2: string;
        static __keyValDelimeter: string;
        constructor();
        protected _getKeyVals(val: string): {
            key: string;
            val: any;
        }[];
        getPathParts(path: string): string[];
        resolveProp(obj: any, prop: string): any;
        setPropertyValue(obj: any, prop: string, val: any): void;
        resolveBindingSource(root: any, srcParts: string[]): any;
        resolvePath(obj: any, path: string): any;
        getBraceParts(val: string, firstOnly: boolean): string[];
        trimOuterBraces(val: string): string;
        trimQuotes(val: string): string;
        trimBrackets(val: string): string;
        isWithOuterBraces(str: string): boolean;
        parseOption(part: string): any;
        parseOptions(str: string): any[];
        toString(): string;
    }
}
declare namespace RIAPP.MOD.mvvm {
    interface ICommand {
        canExecute: (sender: any, param: any) => boolean;
        execute: (sender: any, param: any) => void;
        raiseCanExecuteChanged: () => void;
        addOnCanExecuteChanged(fn: (sender: mvvm.ICommand, args: {}) => void, nmspace?: string, context?: RIAPP.BaseObject): void;
        removeOnCanExecuteChanged(nmspace?: string): void;
    }
    class Command extends RIAPP.BaseObject implements ICommand {
        private _action;
        private _thisObj;
        private _canExecute;
        private _objId;
        constructor(fn_action: (sender: any, param: any) => void, thisObj: any, fn_canExecute: (sender: any, param: any) => boolean);
        protected _getEventNames(): string[];
        addOnCanExecuteChanged(fn: (sender: mvvm.ICommand, args: {}) => void, nmspace?: string, context?: RIAPP.BaseObject): void;
        removeOnCanExecuteChanged(nmspace?: string): void;
        canExecute(sender: any, param: any): boolean;
        execute(sender: any, param: any): void;
        destroy(): void;
        raiseCanExecuteChanged(): void;
        toString(): string;
    }
    class BaseViewModel extends RIAPP.BaseObject {
        private _objId;
        protected _app: Application;
        constructor(app: Application);
        handleError(error: any, source: any): boolean;
        toString(): string;
        destroy(): void;
        uniqueID: string;
        $: JQueryStatic;
        app: Application;
    }
}
declare namespace RIAPP.MOD.baseElView {
    import mvvmMOD = RIAPP.MOD.mvvm;
    function fn_addToolTip($el: JQuery, tip: string, isError?: boolean, pos?: string): void;
    class PropChangedCommand extends mvvmMOD.Command {
        constructor(fn_action: (sender: any, param: {
            property: string;
        }) => void, thisObj: any, fn_canExecute: (sender: any, param: {
            property: string;
        }) => boolean);
    }
    var css: {
        toolTip: string;
        toolTipError: string;
        fieldError: string;
        commandLink: string;
        disabled: string;
        opacity: string;
        color: string;
        fontSize: string;
    };
    var PROP_NAME: {
        isVisible: string;
        validationErrors: string;
        toolTip: string;
        css: string;
        isEnabled: string;
        value: string;
        command: string;
        disabled: string;
        commandParam: string;
        isBusy: string;
        delay: string;
        checked: string;
        color: string;
        rows: string;
        cols: string;
        wrap: string;
        text: string;
        html: string;
        preventDefault: string;
        imageSrc: string;
        href: string;
        isExpanded: string;
        fontSize: string;
        borderColor: string;
        borderStyle: string;
        width: string;
        height: string;
        src: string;
    };
    interface IViewOptions {
        css?: string;
        tip?: string;
    }
    interface IViewType {
        new (app: RIAPP.Application, el: HTMLElement, options: IViewOptions): BaseElView;
    }
    class BaseElView extends RIAPP.BaseObject {
        protected _el: HTMLElement;
        protected _$el: JQuery;
        protected _oldDisplay: string;
        protected _objId: string;
        protected _propChangedCommand: mvvmMOD.ICommand;
        protected _errors: RIAPP.IValidationInfo[];
        protected _toolTip: string;
        protected _css: string;
        protected _app: RIAPP.Application;
        constructor(app: RIAPP.Application, el: HTMLElement, options: IViewOptions);
        protected _applyToolTip(): void;
        protected _init(options: IViewOptions): void;
        destroy(): void;
        invokePropChanged(property: string): void;
        protected _getErrorTipInfo(errors: RIAPP.IValidationInfo[]): string;
        protected _setFieldError(isError: boolean): void;
        protected _updateErrorUI(el: HTMLElement, errors: RIAPP.IValidationInfo[]): void;
        handleError(error: any, source: any): boolean;
        protected _setToolTip($el: JQuery, tip: string, isError?: boolean): void;
        toString(): string;
        $el: JQuery;
        el: HTMLElement;
        uniqueID: string;
        isVisible: boolean;
        propChangedCommand: mvvmMOD.ICommand;
        validationErrors: RIAPP.IValidationInfo[];
        dataNameAttr: string;
        toolTip: string;
        css: string;
        app: Application;
    }
    class InputElView extends BaseElView {
        constructor(app: RIAPP.Application, el: HTMLInputElement, options: IViewOptions);
        toString(): string;
        isEnabled: boolean;
        el: HTMLInputElement;
        value: string;
    }
    class CommandElView extends BaseElView {
        private _command;
        protected _commandParam: any;
        constructor(app: RIAPP.Application, el: HTMLElement, options: IViewOptions);
        destroy(): void;
        invokeCommand(): void;
        protected _onCommandChanged(): void;
        private _onCanExecuteChanged(cmd, args);
        protected _setCommand(v: mvvmMOD.Command): void;
        toString(): string;
        isEnabled: boolean;
        command: mvvmMOD.Command;
        commandParam: any;
    }
    interface IBusyViewOptions extends IViewOptions {
        img?: string;
        delay?: number | string;
    }
    class BusyElView extends BaseElView {
        private _delay;
        private _timeOut;
        private _loaderPath;
        private _$loader;
        private _isBusy;
        constructor(app: RIAPP.Application, el: HTMLElement, options: IBusyViewOptions);
        protected _init(options: IBusyViewOptions): void;
        destroy(): void;
        toString(): string;
        isBusy: boolean;
        delay: number;
    }
    class CheckBoxElView extends InputElView {
        private _val;
        protected _init(options: IViewOptions): void;
        protected _setFieldError(isError: boolean): void;
        destroy(): void;
        toString(): string;
        checked: boolean;
    }
    class CheckBoxThreeStateElView extends InputElView {
        private _val;
        private _cbxVal;
        protected _init(options: IViewOptions): void;
        protected _setFieldError(isError: boolean): void;
        destroy(): void;
        toString(): string;
        checked: boolean;
    }
    interface ITextBoxOptions extends IViewOptions {
        updateOnKeyUp?: boolean;
    }
    type TKeyPressArgs = {
        keyCode: number;
        value: string;
        isCancel: boolean;
    };
    class TextBoxElView extends InputElView {
        protected _init(options: ITextBoxOptions): void;
        protected _getEventNames(): string[];
        addOnKeyPress(fn: (sender: TextBoxElView, args: TKeyPressArgs) => void, nmspace?: string): void;
        removeOnKeyPress(nmspace?: string): void;
        toString(): string;
        color: string;
    }
    class HiddenElView extends InputElView {
        toString(): string;
    }
    interface ITextAreaOptions extends ITextBoxOptions {
        rows?: number;
        cols?: number;
        wrap?: string;
    }
    class TextAreaElView extends BaseElView {
        constructor(app: RIAPP.Application, el: HTMLTextAreaElement, options: ITextAreaOptions);
        protected _init(options: ITextAreaOptions): void;
        protected _getEventNames(): string[];
        addOnKeyPress(fn: (sender: TextAreaElView, args: TKeyPressArgs) => void, nmspace?: string): void;
        removeOnKeyPress(nmspace?: string): void;
        toString(): string;
        el: HTMLTextAreaElement;
        value: string;
        isEnabled: boolean;
        rows: number;
        cols: number;
        wrap: string;
    }
    class RadioElView extends InputElView {
        private _val;
        protected _init(options: IViewOptions): void;
        protected _updateGroup(): void;
        protected _setFieldError(isError: boolean): void;
        toString(): string;
        checked: boolean;
        value: string;
        name: string;
    }
    interface IButtonOptions extends IViewOptions {
        preventDefault?: boolean;
    }
    class ButtonElView extends CommandElView {
        private _preventDefault;
        constructor(app: RIAPP.Application, el: HTMLElement, options: IAncorOptions);
        protected _init(options: IButtonOptions): void;
        protected _onClick(e: Event): void;
        toString(): string;
        value: any;
        text: string;
        html: string;
        preventDefault: boolean;
    }
    interface IAncorOptions extends IButtonOptions {
        imageSrc?: string;
    }
    class AnchorElView extends CommandElView {
        private _imageSrc;
        private _image;
        private _preventDefault;
        constructor(app: RIAPP.Application, el: HTMLAnchorElement, options: IAncorOptions);
        protected _init(options: IAncorOptions): void;
        protected _onClick(e: Event): void;
        protected _updateImage(src: string): void;
        destroy(): void;
        toString(): string;
        el: HTMLAnchorElement;
        imageSrc: string;
        html: string;
        text: string;
        href: string;
        preventDefault: boolean;
    }
    interface IExpanderOptions {
        expandedsrc?: string;
        collapsedsrc?: string;
        isExpanded?: boolean;
    }
    class ExpanderElView extends AnchorElView {
        private _expandedsrc;
        private _collapsedsrc;
        private _isExpanded;
        protected _init(options: IExpanderOptions): void;
        destroy(): void;
        protected _onCommandChanged(): void;
        protected _onClick(e: any): void;
        invokeCommand(): void;
        toString(): string;
        isExpanded: boolean;
    }
    class SpanElView extends BaseElView {
        toString(): string;
        text: string;
        value: string;
        html: string;
        color: string;
        fontSize: string;
    }
    class BlockElView extends SpanElView {
        toString(): string;
        borderColor: string;
        borderStyle: string;
        width: number;
        height: number;
    }
    class ImgElView extends BaseElView {
        constructor(app: RIAPP.Application, el: HTMLImageElement, options: IViewOptions);
        toString(): string;
        el: HTMLImageElement;
        src: string;
    }
}
declare namespace RIAPP.MOD.binding {
    const enum BINDING_MODE {
        OneTime = 0,
        OneWay = 1,
        TwoWay = 2,
        BackWay = 3,
    }
    var bindModeMap: {
        [name: string]: BINDING_MODE;
    };
    interface IBindingOptions {
        mode?: BINDING_MODE;
        converterParam?: any;
        converter?: RIAPP.IConverter;
        targetPath: string;
        sourcePath?: string;
        target?: RIAPP.BaseObject;
        source?: any;
        isSourceFixed?: boolean;
    }
    function getBindingOptions(app: RIAPP.Application, bindInfo: IBindingInfo, defaultTarget: RIAPP.BaseObject, defaultSource: any): IBindingOptions;
    class Binding extends RIAPP.BaseObject {
        private _state;
        private _mode;
        private _converter;
        private _converterParam;
        private _srcPath;
        private _tgtPath;
        private _isSourceFixed;
        private _pathItems;
        private _objId;
        private _ignoreSrcChange;
        private _ignoreTgtChange;
        private _sourceObj;
        private _targetObj;
        private _source;
        private _target;
        private _appName;
        constructor(options: IBindingOptions, appName?: string);
        private static _isDestroyed(obj);
        private _onSrcErrorsChanged(err_notif, args?);
        private _getTgtChangedFn(self, obj, prop, restPath, lvl);
        private _getSrcChangedFn(self, obj, prop, restPath, lvl);
        private _parseSrcPath(obj, path, lvl);
        private _parseSrcPath2(obj, path, lvl);
        private _parseTgtPath(obj, path, lvl);
        private _parseTgtPath2(obj, path, lvl);
        private _setPathItem(newObj, bindingTo, lvl, path);
        private _cleanUpObj(oldObj);
        private _onTgtDestroyed(sender, args);
        private _onSrcDestroyed(sender, args);
        private _bindToSource();
        private _bindToTarget();
        private _updateTarget(sender?, args?);
        private _updateSource(sender?, args?);
        protected _setTarget(value: any): void;
        protected _setSource(value: any): void;
        handleError(error: any, source: any): boolean;
        destroy(): void;
        toString(): string;
        bindingID: string;
        target: BaseObject;
        source: any;
        targetPath: string[];
        sourcePath: string[];
        sourceValue: any;
        targetValue: any;
        mode: BINDING_MODE;
        converter: RIAPP.IConverter;
        converterParam: any;
        isSourceFixed: boolean;
        isDisabled: boolean;
        appName: string;
    }
}
declare namespace RIAPP.MOD.template {
    import elviewMOD = RIAPP.MOD.baseElView;
    import mvvmMOD = RIAPP.MOD.mvvm;
    var css: {
        templateContainer: string;
    };
    interface ITemplateEvents {
        templateLoading(template: Template): void;
        templateLoaded(template: Template): void;
        templateUnLoading(template: Template): void;
    }
    interface ITemplateOptions {
        app: RIAPP.Application;
        templateID: string;
        dataContext?: any;
        templEvents?: ITemplateEvents;
    }
    class Template extends RIAPP.BaseObject {
        private _el;
        private _lfTime;
        private _templElView;
        private _promise;
        private _busyTimeOut;
        private _loadedElem;
        private _options;
        constructor(options: ITemplateOptions);
        private _getBindings();
        private _getElViews();
        private _getTemplateElView();
        private _getTemplateEvents();
        private _loadTemplateElAsync(name);
        private _appendIsBusy(el);
        private _removeIsBusy(el);
        private _loadTemplate();
        private _waitLoad(loadPromise, asyncLoad);
        private _onLoadOK(div, loadedEl);
        private _onLoadFail(arg);
        private _updateBindingSource();
        private _unloadTemplate();
        private _cleanUp();
        handleError(error: any, source: any): boolean;
        destroy(): void;
        findElByDataName(name: string): HTMLElement[];
        findElViewsByDataName(name: string): elviewMOD.BaseElView[];
        toString(): string;
        loadedElem: HTMLElement;
        dataContext: any;
        templateID: string;
        el: HTMLElement;
        app: Application;
    }
    class TemplateCommand extends mvvmMOD.Command {
        constructor(fn_action: (sender: TemplateElView, param: {
            template: Template;
            isLoaded: boolean;
        }) => void, thisObj: any, fn_canExecute: (sender: TemplateElView, param: {
            template: template.Template;
            isLoaded: boolean;
        }) => boolean);
    }
    class TemplateElView extends elviewMOD.CommandElView implements ITemplateEvents {
        private _template;
        private _isEnabled;
        constructor(app: RIAPP.Application, el: HTMLElement, options: elviewMOD.IViewOptions);
        templateLoading(template: Template): void;
        templateLoaded(template: Template): void;
        templateUnLoading(template: Template): void;
        toString(): string;
        isEnabled: boolean;
        template: Template;
    }
}
declare namespace RIAPP.MOD.baseContent {
    import utilsMOD = RIAPP.MOD.utils;
    import elviewMOD = RIAPP.MOD.baseElView;
    import bindMOD = RIAPP.MOD.binding;
    import templMOD = RIAPP.MOD.template;
    var css: {
        content: string;
        required: string;
    };
    interface ITemplateInfo {
        displayID?: string;
        editID?: string;
    }
    interface IContent {
        isEditing: boolean;
        dataContext: any;
        destroy(): void;
    }
    interface IExternallyCachable {
        addOnObjectCreated(fn: (sender: any, args: {
            objectKey: string;
            object: RIAPP.BaseObject;
            isCachedExternally: boolean;
        }) => void, nmspace?: string): void;
        addOnObjectNeeded(fn: (sender: any, args: {
            objectKey: string;
            object: RIAPP.BaseObject;
        }) => void, nmspace?: string): void;
    }
    interface IContentOptions {
        name?: string;
        readOnly?: boolean;
        initContentFn?: (content: IExternallyCachable) => void;
        fieldInfo?: IFieldInfo;
        bindingInfo?: bindMOD.IBindingInfo;
        displayInfo?: {
            displayCss?: string;
            editCss?: string;
        };
        templateInfo?: ITemplateInfo;
        fieldName?: string;
        options?: any;
    }
    interface IConstructorContentOptions {
        parentEl: HTMLElement;
        contentOptions: IContentOptions;
        dataContext: any;
        isEditing: boolean;
    }
    interface IContentType {
        new (app: RIAPP.Application, options: IConstructorContentOptions): IContent;
    }
    interface IContentFactory {
        getContentType(options: IContentOptions): IContentType;
        createContent(options: IConstructorContentOptions): IContent;
        isExternallyCachable(contentType: IContentType): boolean;
    }
    interface IDataContentAttr {
        fieldName?: string;
        readOnly?: boolean;
        css?: {
            displayCss: string;
            editCss: string;
        };
        template?: ITemplateInfo;
        name?: string;
        options?: any;
    }
    function parseContentAttr(content_attr: string): IContentOptions;
    class BindingContent extends RIAPP.BaseObject implements IContent {
        protected _parentEl: HTMLElement;
        protected _el: HTMLElement;
        protected _options: IContentOptions;
        protected _isReadOnly: boolean;
        private _isEditing;
        protected _dataContext: any;
        protected _lfScope: utilsMOD.LifeTimeScope;
        protected _target: elviewMOD.BaseElView;
        protected _app: RIAPP.Application;
        constructor(app: RIAPP.Application, options: IConstructorContentOptions);
        handleError(error: any, source: any): boolean;
        protected init(): void;
        protected updateCss(): void;
        protected getIsCanBeEdited(): boolean;
        protected createTargetElement(): elviewMOD.BaseElView;
        protected getBindingOption(bindingInfo: bindMOD.IBindingInfo, target: RIAPP.BaseObject, dataContext: any, targetPath: string): bindMOD.IBindingOptions;
        protected getBindings(): bindMOD.Binding[];
        protected updateBindingSource(): void;
        protected cleanUp(): void;
        protected getElementView(el: HTMLElement, view_info: {
            name: string;
            options: any;
        }): elviewMOD.BaseElView;
        protected getFieldInfo(): IFieldInfo;
        protected render(): void;
        destroy(): void;
        toString(): string;
        parentEl: HTMLElement;
        target: elviewMOD.BaseElView;
        isEditing: boolean;
        dataContext: any;
        app: Application;
    }
    class TemplateContent extends RIAPP.BaseObject implements IContent, templMOD.ITemplateEvents {
        private _parentEl;
        private _template;
        private _templateInfo;
        private _isEditing;
        private _dataContext;
        private _app;
        private _isDisabled;
        private _templateID;
        constructor(app: RIAPP.Application, options: IConstructorContentOptions);
        handleError(error: any, source: any): boolean;
        templateLoading(template: templMOD.Template): void;
        templateLoaded(template: templMOD.Template): void;
        templateUnLoading(template: templMOD.Template): void;
        private getTemplateID();
        private createTemplate();
        protected render(): void;
        protected cleanUp(): void;
        destroy(): void;
        toString(): string;
        app: Application;
        parentEl: HTMLElement;
        template: templMOD.Template;
        isEditing: boolean;
        dataContext: any;
    }
    class BoolContent extends BindingContent {
        protected init(): void;
        protected cleanUp(): void;
        protected createCheckBoxView(): elviewMOD.CheckBoxElView;
        protected createTargetElement(): elviewMOD.BaseElView;
        protected updateCss(): void;
        destroy(): void;
        render(): void;
        toString(): string;
    }
    class DateContent extends BindingContent {
        constructor(app: RIAPP.Application, options: IConstructorContentOptions);
        protected getBindingOption(bindingInfo: bindMOD.IBindingInfo, tgt: RIAPP.BaseObject, dctx: any, targetPath: string): bindMOD.IBindingOptions;
        protected createTargetElement(): elviewMOD.BaseElView;
        toString(): string;
    }
    class DateTimeContent extends BindingContent {
        protected getBindingOption(bindingInfo: bindMOD.IBindingInfo, tgt: RIAPP.BaseObject, dctx: any, targetPath: string): bindMOD.IBindingOptions;
        toString(): string;
    }
    class NumberContent extends BindingContent {
        static __allowedKeys: number[];
        private _allowedKeys;
        protected getBindingOption(bindingInfo: bindMOD.IBindingInfo, tgt: RIAPP.BaseObject, dctx: any, targetPath: string): bindMOD.IBindingOptions;
        protected render(): void;
        protected previewKeyPress(keyCode: number, value: string): boolean;
        toString(): string;
    }
    class StringContent extends BindingContent {
        static __allowedKeys: number[];
        private _allowedKeys;
        protected render(): void;
        protected previewKeyPress(fieldInfo: IFieldInfo, keyCode: number, value: string): boolean;
        toString(): string;
    }
    class MultyLineContent extends BindingContent {
        static __allowedKeys: number[];
        private _allowedKeys;
        constructor(app: RIAPP.Application, options: IConstructorContentOptions);
        protected createTargetElement(): elviewMOD.BaseElView;
        protected render(): void;
        protected previewKeyPress(fieldInfo: IFieldInfo, keyCode: number, value: string): boolean;
        toString(): string;
    }
    class ContentFactory implements IContentFactory {
        private _app;
        private _nextFactory;
        constructor(app: RIAPP.Application, nextFactory?: IContentFactory);
        getContentType(options: IContentOptions): IContentType;
        createContent(options: IConstructorContentOptions): IContent;
        isExternallyCachable(contentType: IContentType): boolean;
        app: Application;
    }
    type TFactoryGetter = (nextFactory?: IContentFactory) => IContentFactory;
    class FactoryList implements IContentFactory {
        private _list;
        private _factory;
        constructor(app: Application);
        addFactory(fn: TFactoryGetter): void;
        init(): void;
        getContentType(options: IContentOptions): IContentType;
        createContent(options: IConstructorContentOptions): IContent;
        isExternallyCachable(contentType: IContentType): boolean;
    }
}
declare namespace RIAPP.MOD.collection {
    import utilsMOD = RIAPP.MOD.utils;
    const enum STATUS {
        NONE = 0,
        ADDED = 1,
        UPDATED = 2,
        DELETED = 3,
    }
    const enum COLL_CHANGE_TYPE {
        REMOVE = 0,
        ADDED = 1,
        RESET = 2,
        REMAP_KEY = 3,
    }
    const enum SORT_ORDER {
        ASC = 0,
        DESC = 1,
    }
    const enum FILTER_TYPE {
        Equals = 0,
        Between = 1,
        StartsWith = 2,
        EndsWith = 3,
        Contains = 4,
        Gt = 5,
        Lt = 6,
        GtEq = 7,
        LtEq = 8,
        NotEq = 9,
    }
    interface IPermissions {
        canAddRow: boolean;
        canEditRow: boolean;
        canDeleteRow: boolean;
        canRefreshRow: boolean;
    }
    function fn_getPropertyByName(name: string, props: IFieldInfo[]): IFieldInfo;
    function fn_traverseField(fld: IFieldInfo, fn: (name: string, fld: IFieldInfo) => void): void;
    interface ICollectionItem extends RIAPP.IBaseObject {
        _aspect: ItemAspect<ICollectionItem>;
        _key: string;
    }
    class ItemAspect<TItem extends ICollectionItem> extends RIAPP.BaseObject implements IErrorNotification, RIAPP.IEditable, RIAPP.ISubmittable {
        private __key;
        private __isEditing;
        private _collection;
        protected _status: STATUS;
        protected _saveVals: IIndexer<any>;
        protected _vals: IIndexer<any>;
        protected _notEdited: boolean;
        protected _isEditing: boolean;
        constructor(collection: BaseCollection<TItem>);
        protected _getEventNames(): string[];
        protected _onErrorsChanged(args: any): void;
        handleError(error: any, source: any): boolean;
        protected _beginEdit(): boolean;
        protected _endEdit(): boolean;
        protected _cancelEdit(): boolean;
        protected _validate(): RIAPP.IValidationInfo;
        protected _skipValidate(fieldInfo: IFieldInfo, val: any): boolean;
        protected _validateField(fieldName: string): RIAPP.IValidationInfo;
        protected _validateAll(): RIAPP.IValidationInfo[];
        protected _checkVal(fieldInfo: IFieldInfo, val: any): any;
        protected _resetIsNew(): void;
        _onAttaching(): void;
        _onAttach(): void;
        raiseErrorsChanged(args: any): void;
        getFieldInfo(fieldName: string): IFieldInfo;
        getFieldNames(): string[];
        getErrorString(): string;
        submitChanges(): IVoidPromise;
        rejectChanges(): void;
        beginEdit(): boolean;
        endEdit(): boolean;
        cancelEdit(): boolean;
        deleteItem(): boolean;
        getIsHasErrors(): boolean;
        addOnErrorsChanged(fn: TEventHandler<ItemAspect<TItem>, any>, nmspace?: string, context?: any): void;
        removeOnErrorsChanged(nmspace?: string): void;
        getFieldErrors(fieldName: string): RIAPP.IValidationInfo[];
        getAllErrors(): RIAPP.IValidationInfo[];
        getIErrorNotification(): IErrorNotification;
        destroy(): void;
        toString(): string;
        getItem(): TItem;
        isCanSubmit: boolean;
        status: STATUS;
        isNew: boolean;
        isDeleted: boolean;
        key: string;
        collection: BaseCollection<TItem>;
        isUpdating: boolean;
        isEditing: boolean;
        isHasChanges: boolean;
    }
    interface ICollectionOptions {
        enablePaging: boolean;
        pageSize: number;
    }
    interface IErrors {
        [fieldName: string]: string[];
    }
    interface IErrorsList {
        [item_key: string]: IErrors;
    }
    interface ICollChangedArgs<TItem extends ICollectionItem> {
        changeType: COLL_CHANGE_TYPE;
        items: TItem[];
        pos?: number[];
        old_key?: string;
        new_key?: string;
    }
    interface ICollFillArgs<TItem extends ICollectionItem> {
        isBegin: boolean;
        rowCount: number;
        time: Date;
        isPageChanged: boolean;
        resetUI?: boolean;
        fetchedItems?: TItem[];
        newItems?: TItem[];
    }
    interface ICollValidateArgs<TItem extends ICollectionItem> {
        item: TItem;
        fieldName: string;
        errors: string[];
    }
    interface ICollItemStatusArgs<TItem extends ICollectionItem> {
        item: TItem;
        oldStatus: STATUS;
        key: string;
    }
    interface ICollItemAddedArgs<TItem extends ICollectionItem> {
        item: TItem;
        isAddNewHandled: boolean;
    }
    interface ICommitChangesArgs<TItem extends ICollectionItem> {
        item: TItem;
        isBegin: boolean;
        isRejected: boolean;
        status: STATUS;
    }
    interface ICollItemArgs<TItem extends ICollectionItem> {
        item: TItem;
    }
    interface IPageChangingArgs {
        page: number;
        isCancel: boolean;
    }
    interface ICancellableArgs<TItem extends ICollectionItem> {
        item: TItem;
        isCancel: boolean;
    }
    interface IItemAddedArgs<TItem extends ICollectionItem> {
        item: TItem;
        isAddNewHandled: boolean;
    }
    interface ICollEndEditArgs<TItem extends ICollectionItem> {
        item: TItem;
        isCanceled: boolean;
    }
    interface ICurrentChangingArgs<TItem extends ICollectionItem> {
        newCurrent: TItem;
    }
    interface IInternalCollMethods<TItem extends ICollectionItem> {
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
    class BaseCollection<TItem extends ICollectionItem> extends RIAPP.BaseObject {
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
        constructor();
        static getEmptyFieldInfo(fieldName: string): IFieldInfo;
        protected _getEventNames(): string[];
        handleError(error: any, source: any): boolean;
        addOnClearing(fn: TEventHandler<BaseCollection<TItem>, any>, nmspace?: string, context?: BaseObject, prepend?: boolean): void;
        removeOnClearing(nmspace?: string): void;
        addOnCleared(fn: TEventHandler<BaseCollection<TItem>, any>, nmspace?: string, context?: BaseObject, prepend?: boolean): void;
        removeOnCleared(nmspace?: string): void;
        addOnFill(fn: TEventHandler<BaseCollection<TItem>, ICollFillArgs<TItem>>, nmspace?: string, context?: BaseObject, prepend?: boolean): void;
        removeOnFill(nmspace?: string): void;
        addOnCollChanged(fn: TEventHandler<BaseCollection<TItem>, ICollChangedArgs<TItem>>, nmspace?: string, context?: BaseObject, prepend?: boolean): void;
        removeOnCollChanged(nmspace?: string): void;
        addOnValidate(fn: TEventHandler<BaseCollection<TItem>, ICollValidateArgs<TItem>>, nmspace?: string, context?: BaseObject, prepend?: boolean): void;
        removeOnValidate(nmspace?: string): void;
        addOnItemDeleting(fn: TEventHandler<BaseCollection<TItem>, ICancellableArgs<TItem>>, nmspace?: string, context?: BaseObject, prepend?: boolean): void;
        removeOnItemDeleting(nmspace?: string): void;
        addOnItemAdding(fn: TEventHandler<BaseCollection<TItem>, ICancellableArgs<TItem>>, nmspace?: string, context?: BaseObject, prepend?: boolean): void;
        removeOnItemAdding(nmspace?: string): void;
        addOnItemAdded(fn: TEventHandler<BaseCollection<TItem>, IItemAddedArgs<TItem>>, nmspace?: string, context?: BaseObject, prepend?: boolean): void;
        removeOnItemAdded(nmspace?: string): void;
        addOnCurrentChanging(fn: TEventHandler<BaseCollection<TItem>, ICurrentChangingArgs<TItem>>, nmspace?: string, context?: BaseObject, prepend?: boolean): void;
        removeOnCurrentChanging(nmspace?: string): void;
        addOnPageChanging(fn: TEventHandler<BaseCollection<TItem>, IPageChangingArgs>, nmspace?: string, context?: BaseObject, prepend?: boolean): void;
        removeOnPageChanging(nmspace?: string): void;
        addOnErrorsChanged(fn: TEventHandler<BaseCollection<TItem>, ICollItemArgs<TItem>>, nmspace?: string, context?: BaseObject, prepend?: boolean): void;
        removeOnErrorsChanged(nmspace?: string): void;
        addOnBeginEdit(fn: TEventHandler<BaseCollection<TItem>, ICollItemArgs<TItem>>, nmspace?: string, context?: BaseObject, prepend?: boolean): void;
        removeOnBeginEdit(nmspace?: string): void;
        addOnEndEdit(fn: TEventHandler<BaseCollection<TItem>, ICollEndEditArgs<TItem>>, nmspace?: string, context?: BaseObject, prepend?: boolean): void;
        removeOnEndEdit(nmspace?: string): void;
        addOnCommitChanges(fn: TEventHandler<BaseCollection<TItem>, ICommitChangesArgs<TItem>>, nmspace?: string, context?: BaseObject, prepend?: boolean): void;
        removeOnCommitChanges(nmspace?: string): void;
        addOnStatusChanged(fn: TEventHandler<BaseCollection<TItem>, ICollItemStatusArgs<TItem>>, nmspace?: string, context?: BaseObject, prepend?: boolean): void;
        removeOnStatusChanged(nmspace?: string): void;
        addOnPageIndexChanged(handler: TPropChangedHandler, nmspace?: string, context?: BaseObject): void;
        addOnPageSizeChanged(handler: TPropChangedHandler, nmspace?: string, context?: BaseObject): void;
        addOnTotalCountChanged(handler: TPropChangedHandler, nmspace?: string, context?: BaseObject): void;
        addOnCurrentChanged(handler: TPropChangedHandler, nmspace?: string, context?: BaseObject): void;
        protected _getPKFieldInfos(): IFieldInfo[];
        protected _onCurrentChanging(newCurrent: TItem): void;
        protected _onCurrentChanged(): void;
        protected _onCountChanged(): void;
        protected _onEditingChanged(): void;
        protected _onItemStatusChanged(item: TItem, oldStatus: STATUS): void;
        protected _onFillStart(args: ICollFillArgs<TItem>): void;
        protected _onFillEnd(args: ICollFillArgs<TItem>): void;
        protected _onCollectionChanged(args: ICollChangedArgs<TItem>): void;
        protected _onItemAdding(item: TItem): void;
        protected _onItemAdded(item: TItem): void;
        protected _createNew(): TItem;
        protected _attach(item: TItem, itemPos?: number): number;
        protected _onRemoved(item: TItem, pos: number): void;
        protected _onPageSizeChanged(): void;
        protected _onPageChanging(): boolean;
        protected _onPageChanged(): void;
        protected _setCurrentItem(v: TItem): void;
        protected _destroyItems(): void;
        protected _isHasProp(prop: string): boolean;
        protected _getEditingItem(): TItem;
        protected _getStrValue(val: any, fieldInfo: IFieldInfo): string;
        protected _onEditing(item: TItem, isBegin: boolean, isCanceled: boolean): void;
        protected _onCommitChanges(item: TItem, isBegin: boolean, isRejected: boolean, status: STATUS): void;
        protected _validateItem(item: TItem): RIAPP.IValidationInfo;
        protected _validateItemField(item: TItem, fieldName: string): RIAPP.IValidationInfo;
        protected _addErrors(item: TItem, errors: RIAPP.IValidationInfo[]): void;
        protected _addError(item: TItem, fieldName: string, errors: string[]): void;
        protected _removeError(item: TItem, fieldName: string): void;
        protected _removeAllErrors(item: TItem): void;
        protected _getErrors(item: TItem): IErrors;
        protected _onErrorsChanged(item: TItem): void;
        protected _onItemDeleting(args: ICancellableArgs<TItem>): boolean;
        _getInternal(): IInternalCollMethods<TItem>;
        getFieldInfo(fieldName: string): IFieldInfo;
        getFieldNames(): string[];
        getIsClearing(): boolean;
        getFieldInfos(): IFieldInfo[];
        cancelEdit(): void;
        endEdit(): void;
        getItemsWithErrors(): TItem[];
        addNew(): TItem;
        getItemByPos(pos: number): TItem;
        getItemByKey(key: string): TItem;
        findByPK(...vals: any[]): TItem;
        moveFirst(skipDeleted?: boolean): boolean;
        movePrev(skipDeleted?: boolean): boolean;
        moveNext(skipDeleted?: boolean): boolean;
        moveLast(skipDeleted?: boolean): boolean;
        goTo(pos: number): boolean;
        forEach(callback: (item: TItem) => void, thisObj?: any): void;
        removeItem(item: TItem): void;
        getIsHasErrors(): boolean;
        sort(fieldNames: string[], sortOrder: SORT_ORDER): IPromise<any>;
        sortLocal(fieldNames: string[], sortOrder: SORT_ORDER): IPromise<any>;
        sortLocalByFunc(fn: (a: any, b: any) => number): IPromise<any>;
        clear(): void;
        destroy(): void;
        waitForNotLoading(callback: (...args: any[]) => any, callbackArgs: any[], syncCheck: boolean, groupName: string): void;
        toString(): string;
        options: ICollectionOptions;
        currentItem: TItem;
        count: number;
        totalCount: number;
        pageSize: number;
        pageIndex: number;
        items: TItem[];
        isPagingEnabled: boolean;
        permissions: IPermissions;
        isEditing: boolean;
        isLoading: boolean;
        isUpdating: boolean;
        pageCount: number;
    }
    interface IListItem extends ICollectionItem {
        _aspect: ListItemAspect<IListItem, any>;
    }
    interface IListItemAspectConstructor<TItem extends IListItem, TObj> {
        new (coll: BaseList<TItem, TObj>, itemType: IListItemConstructor<TItem, TObj>, obj?: TObj): ListItemAspect<TItem, TObj>;
    }
    interface IListItemConstructor<TItem extends IListItem, TObj> {
        new (aspect: ListItemAspect<TItem, TObj>): TItem;
    }
    interface IPropInfo {
        name: string;
        dtype: number;
    }
    class CollectionItem<TAspect extends ItemAspect<ICollectionItem>> extends RIAPP.BaseObject implements ICollectionItem {
        private f_aspect;
        constructor(aspect: TAspect);
        _aspect: TAspect;
        _key: string;
        destroy(): void;
        toString(): string;
    }
    class ListItemAspect<TItem extends IListItem, TObj> extends ItemAspect<TItem> {
        protected __isNew: boolean;
        protected _item: TItem;
        constructor(coll: BaseList<TItem, TObj>, itemType: IListItemConstructor<TItem, TObj>, obj?: TObj);
        protected static _initVals(coll: BaseList<IListItem, any>, obj?: any): any;
        _setProp(name: string, val: any): void;
        _getProp(name: string): any;
        _resetIsNew(): void;
        destroy(): void;
        getItem(): TItem;
        toString(): string;
        vals: IIndexer<any>;
        isNew: boolean;
    }
    class BaseList<TItem extends IListItem, TObj> extends BaseCollection<TItem> {
        protected _itemType: IListItemConstructor<TItem, TObj>;
        constructor(itemType: IListItemConstructor<TItem, TObj>, props: IPropInfo[]);
        private _updateFieldMap(props);
        protected _attach(item: TItem): number;
        protected _createNew(): TItem;
        protected _getNewKey(item: TItem): string;
        destroy(): void;
        fillItems(objArray: TObj[], clearAll?: boolean): void;
        toArray(): TObj[];
        getNewObjects(): TItem[];
        resetNewObjects(): void;
        toString(): string;
    }
    class BaseDictionary<TItem extends IListItem, TObj> extends BaseList<TItem, TObj> {
        private _keyName;
        constructor(itemType: IListItemConstructor<TItem, TObj>, keyName: string, props: IPropInfo[]);
        protected _getNewKey(item: TItem): string;
        protected _onItemAdded(item: TItem): void;
        protected _onRemoved(item: TItem, pos: number): void;
        keyName: string;
        toString(): string;
    }
}
declare namespace RIAPP.MOD.dataform {
    import elviewMOD = RIAPP.MOD.baseElView;
    var css: {
        dataform: string;
    };
    interface IDataFormOptions {
        app: Application;
        el: HTMLElement;
    }
    class DataForm extends RIAPP.BaseObject {
        private _DATA_CONTENT_SELECTOR;
        private _el;
        private _$el;
        private _objId;
        private _dataContext;
        private _isEditing;
        private _content;
        private _lfTime;
        private _contentCreated;
        private _supportEdit;
        private _supportErrNotify;
        private _parentDataForm;
        private _errors;
        private _app;
        private _isInsideTemplate;
        constructor(options: IDataFormOptions);
        handleError(error: any, source: any): boolean;
        private _getBindings();
        private _getElViews();
        private _createContent();
        private _updateContent();
        private _onDSErrorsChanged(sender?, args?);
        _onIsEditingChanged(sender: any, args: any): void;
        private _bindDS();
        private _unbindDS();
        private _clearContent();
        destroy(): void;
        toString(): string;
        app: Application;
        el: HTMLElement;
        dataContext: BaseObject;
        isEditing: boolean;
        validationErrors: IValidationInfo[];
        isInsideTemplate: boolean;
    }
    class DataFormElView extends elviewMOD.BaseElView {
        private _form;
        private _options;
        constructor(app: Application, el: HTMLSelectElement, options: elviewMOD.IViewOptions);
        protected _getErrorTipInfo(errors: RIAPP.IValidationInfo[]): string;
        protected _updateErrorUI(el: HTMLElement, errors: RIAPP.IValidationInfo[]): void;
        destroy(): void;
        toString(): string;
        dataContext: BaseObject;
        form: DataForm;
    }
}
declare namespace RIAPP.MOD.dynacontent {
    import elviewMOD = RIAPP.MOD.baseElView;
    import templMOD = RIAPP.MOD.template;
    interface IAnimation {
        beforeShow(template: templMOD.Template, isFirstShow: boolean): void;
        show(template: templMOD.Template, isFirstShow: boolean): RIAPP.IVoidPromise;
        beforeHide(template: templMOD.Template): void;
        hide(template: templMOD.Template): RIAPP.IVoidPromise;
        stop(): void;
        isAnimateFirstShow: boolean;
    }
    interface IDynaContentOptions extends elviewMOD.IViewOptions {
        animate?: string;
    }
    class DynaContentElView extends elviewMOD.BaseElView implements templMOD.ITemplateEvents {
        private _dataContext;
        private _prevTemplateID;
        private _templateID;
        private _template;
        private _animation;
        constructor(app: RIAPP.Application, el: HTMLElement, options: IDynaContentOptions);
        templateLoading(template: templMOD.Template): void;
        templateLoaded(template: templMOD.Template): void;
        templateUnLoading(template: templMOD.Template): void;
        private _templateChanging(oldName, newName);
        destroy(): void;
        template: templMOD.Template;
        templateID: string;
        dataContext: any;
        animation: IAnimation;
    }
}
declare namespace RIAPP.MOD.datepicker {
    import elviewMOD = RIAPP.MOD.baseElView;
    class Datepicker extends RIAPP.BaseObject implements RIAPP.IDatepicker {
        private _datepickerRegion;
        private _dateFormat;
        constructor();
        toString(): string;
        attachTo($el: any, options?: {
            dateFormat?: string;
        }): void;
        detachFrom($el: any): void;
        parseDate(str: string): Date;
        formatDate(date: Date): string;
        dateFormat: string;
        datepickerRegion: string;
        datePickerFn: any;
    }
    interface IDatePickerOptions extends elviewMOD.ITextBoxOptions {
        datepicker?: any;
    }
    class DatePickerElView extends elviewMOD.TextBoxElView {
        protected _init(options: IDatePickerOptions): void;
        destroy(): void;
        toString(): string;
    }
}
declare namespace RIAPP.MOD.tabs {
    import elviewMOD = MOD.baseElView;
    interface ITabs {
        uniqueID: string;
        el: HTMLElement;
        tabIndex: number;
        isVisible: boolean;
        css: string;
    }
    interface ITabsEvents {
        addTabs(tabs: ITabs): void;
        removeTabs(): void;
        onTabSelected(tabs: ITabs): void;
    }
    class TabsElView extends elviewMOD.BaseElView implements ITabs {
        private _tabOpts;
        private _tabsEvents;
        private _tabsCreated;
        protected _init(options: any): void;
        protected _createTabs(): void;
        protected _destroyTabs(): void;
        protected _onTabsCreated(): void;
        destroy(): void;
        toString(): string;
        tabsEvents: ITabsEvents;
        tabIndex: number;
    }
}
declare namespace RIAPP.MOD.listbox {
    import bindMOD = RIAPP.MOD.binding;
    import collMOD = RIAPP.MOD.collection;
    import elviewMOD = RIAPP.MOD.baseElView;
    import contentMOD = RIAPP.MOD.baseContent;
    interface IListBoxOptions {
        valuePath: string;
        textPath: string;
        statePath?: string;
    }
    interface IListBoxConstructorOptions extends IListBoxOptions {
        app: Application;
        el: HTMLSelectElement;
        dataSource: collMOD.BaseCollection<collMOD.ICollectionItem>;
    }
    interface IMappedItem {
        item: collMOD.ICollectionItem;
        op: HTMLOptionElement;
    }
    interface IOptionStateProvider {
        getCSS(item: collMOD.ICollectionItem, itemIndex: number, val: any): string;
    }
    interface IOptionTextProvider {
        getText(item: collMOD.ICollectionItem, itemIndex: number, text: string): string;
    }
    class ListBox extends RIAPP.BaseObject {
        private _$el;
        private _objId;
        private _isRefreshing;
        private _isDSFilling;
        private _selectedItem;
        private _prevSelected;
        private _keyMap;
        private _valMap;
        private _savedValue;
        private _tempValue;
        private _options;
        private _fn_state;
        private _textProvider;
        private _stateProvider;
        constructor(options: IListBoxConstructorOptions);
        destroy(): void;
        protected _onChanged(): void;
        protected _getStringValue(item: collMOD.ICollectionItem): string;
        protected _getValue(item: collMOD.ICollectionItem): any;
        protected _getText(item: collMOD.ICollectionItem, index: number): string;
        protected _onDSCollectionChanged(sender: any, args: collMOD.ICollChangedArgs<collMOD.ICollectionItem>): void;
        protected _onDSFill(sender: any, args: collMOD.ICollFillArgs<collMOD.ICollectionItem>): void;
        protected _onEdit(item: collMOD.ICollectionItem, isBegin: boolean, isCanceled: boolean): void;
        protected _onStatusChanged(item: collMOD.ICollectionItem, oldStatus: collMOD.STATUS): void;
        protected _onCommitChanges(item: collMOD.ICollectionItem, isBegin: boolean, isRejected: boolean, status: collMOD.STATUS): void;
        protected _onOptionStateChanged(data: IMappedItem): string;
        private _bindDS();
        private _unbindDS();
        private _addOption(item, first);
        private _mapByValue();
        private _resetText();
        private _removeOption(item);
        private _clear(isDestroy);
        private _refresh();
        private _findItemIndex(item);
        protected _setIsEnabled(el: HTMLSelectElement, v: boolean): void;
        protected _getIsEnabled(el: HTMLSelectElement): boolean;
        clear(): void;
        findItemByValue(val: any): collMOD.ICollectionItem;
        getTextByValue(val: any): string;
        toString(): string;
        dataSource: collMOD.BaseCollection<collMOD.ICollectionItem>;
        selectedValue: any;
        selectedItem: collMOD.ICollectionItem;
        valuePath: string;
        textPath: string;
        statePath: string;
        isEnabled: boolean;
        textProvider: IOptionTextProvider;
        stateProvider: IOptionStateProvider;
        el: HTMLSelectElement;
    }
    interface ISelectViewOptions extends IListBoxOptions, elviewMOD.IViewOptions {
    }
    class SelectElView extends elviewMOD.BaseElView {
        private _listBox;
        private _options;
        constructor(app: Application, el: HTMLSelectElement, options: ISelectViewOptions);
        destroy(): void;
        toString(): string;
        isEnabled: boolean;
        el: HTMLSelectElement;
        dataSource: collMOD.BaseCollection<collMOD.ICollectionItem>;
        selectedValue: any;
        selectedItem: collMOD.ICollectionItem;
        valuePath: string;
        textPath: string;
        textProvider: IOptionTextProvider;
        stateProvider: IOptionStateProvider;
        listBox: ListBox;
    }
    interface ILookupOptions {
        dataSource: string;
        valuePath: string;
        textPath: string;
        statePath?: string;
    }
    type TObjCreatedArgs = {
        objectKey: string;
        object: BaseObject;
        isCachedExternally: boolean;
    };
    type TObjNeededArgs = {
        objectKey: string;
        object: BaseObject;
    };
    class LookupContent extends contentMOD.BindingContent implements contentMOD.IExternallyCachable {
        private _spanView;
        private _valBinding;
        private _listBinding;
        private _selectView;
        private _isListBoxCachedExternally;
        private _value;
        constructor(app: RIAPP.Application, options: contentMOD.IConstructorContentOptions);
        protected init(): void;
        protected _getEventNames(): string[];
        addOnObjectCreated(fn: (sender: any, args: TObjCreatedArgs) => void, nmspace?: string): void;
        removeOnObjectCreated(nmspace?: string): void;
        addOnObjectNeeded(fn: (sender: any, args: TObjNeededArgs) => void, nmspace?: string): void;
        removeOnObjectNeeded(nmspace?: string): void;
        protected getSelectView(): SelectElView;
        protected createSelectElView(el: HTMLSelectElement, options: ISelectViewOptions): SelectElView;
        protected updateTextValue(): void;
        protected getLookupText(): string;
        protected getSpanView(): elviewMOD.SpanElView;
        protected render(): void;
        protected createTargetElement(): elviewMOD.BaseElView;
        protected cleanUp(): void;
        protected updateBindingSource(): void;
        protected bindToValue(): bindMOD.Binding;
        protected bindToList(selectView: SelectElView): bindMOD.Binding;
        destroy(): void;
        toString(): string;
        value: any;
    }
    class ContentFactory implements contentMOD.IContentFactory {
        private _app;
        private _nextFactory;
        constructor(app: Application, nextFactory?: contentMOD.IContentFactory);
        getContentType(options: contentMOD.IContentOptions): contentMOD.IContentType;
        createContent(options: contentMOD.IConstructorContentOptions): contentMOD.IContent;
        isExternallyCachable(contentType: contentMOD.IContentType): boolean;
        app: Application;
    }
}
declare namespace RIAPP.MOD.datadialog {
    import templMOD = RIAPP.MOD.template;
    import mvvm = RIAPP.MOD.mvvm;
    const enum DIALOG_ACTION {
        Default = 0,
        StayOpen = 1,
    }
    interface IDialogConstructorOptions {
        dataContext?: any;
        templateID: string;
        width?: any;
        height?: any;
        title?: string;
        submitOnOK?: boolean;
        canRefresh?: boolean;
        canCancel?: boolean;
        fn_OnClose?: (dialog: DataEditDialog) => void;
        fn_OnOK?: (dialog: DataEditDialog) => number;
        fn_OnShow?: (dialog: DataEditDialog) => void;
        fn_OnCancel?: (dialog: DataEditDialog) => number;
        fn_OnTemplateCreated?: (template: templMOD.Template) => void;
        fn_OnTemplateDestroy?: (template: templMOD.Template) => void;
    }
    interface IButton {
        id: string;
        text: string;
        'class': string;
        click: () => void;
    }
    class DataEditDialog extends BaseObject implements templMOD.ITemplateEvents {
        private _objId;
        private _dataContext;
        private _templateID;
        private _submitOnOK;
        private _canRefresh;
        private _canCancel;
        private _fn_OnClose;
        private _fn_OnOK;
        private _fn_OnShow;
        private _fn_OnCancel;
        private _fn_OnTemplateCreated;
        private _fn_OnTemplateDestroy;
        private _isEditable;
        private _template;
        private _$template;
        private _result;
        private _options;
        private _dialogCreated;
        private _fn_submitOnOK;
        private _app;
        private _currentSelectable;
        constructor(app: RIAPP.Application, options: IDialogConstructorOptions);
        handleError(error: any, source: any): boolean;
        addOnClose(fn: TEventHandler<DataEditDialog, any>, nmspace?: string, context?: BaseObject): void;
        removeOnClose(nmspace?: string): void;
        addOnRefresh(fn: TEventHandler<DataEditDialog, {
            isHandled: boolean;
        }>, nmspace?: string, context?: BaseObject): void;
        removeOnRefresh(nmspace?: string): void;
        protected _updateIsEditable(): void;
        protected _createDialog(): void;
        protected _getEventNames(): string[];
        templateLoading(template: templMOD.Template): void;
        templateLoaded(template: templMOD.Template): void;
        templateUnLoading(template: templMOD.Template): void;
        protected _createTemplate(): templMOD.Template;
        protected _destroyTemplate(): void;
        protected _getButtons(): IButton[];
        protected _getOkButton(): JQuery;
        protected _getCancelButton(): JQuery;
        protected _getRefreshButton(): JQuery;
        protected _getAllButtons(): JQuery[];
        protected _disableButtons(isDisable: boolean): void;
        protected _onOk(): void;
        protected _onCancel(): void;
        protected _onRefresh(): void;
        protected _onClose(): void;
        protected _onShow(): void;
        show(): void;
        hide(): void;
        getOption(name: string): any;
        setOption(name: string, value: any): void;
        destroy(): void;
        app: Application;
        dataContext: any;
        result: string;
        template: templMOD.Template;
        isSubmitOnOK: boolean;
        width: any;
        height: any;
        title: any;
        canRefresh: boolean;
        canCancel: boolean;
    }
    class DialogVM extends mvvm.BaseViewModel {
        _dialogs: {
            [name: string]: () => DataEditDialog;
        };
        constructor(app: Application);
        createDialog(name: string, options: IDialogConstructorOptions): () => DataEditDialog;
        showDialog(name: string, dataContext: any): DataEditDialog;
        getDialog(name: string): DataEditDialog;
        destroy(): void;
    }
}
declare namespace RIAPP.MOD.datagrid {
    import elviewMOD = RIAPP.MOD.baseElView;
    import contentMOD = RIAPP.MOD.baseContent;
    import collMOD = RIAPP.MOD.collection;
    import templMOD = RIAPP.MOD.template;
    var css: {
        container: string;
        dataTable: string;
        columnInfo: string;
        column: string;
        cellDiv: string;
        headerDiv: string;
        wrapDiv: string;
        dataColumn: string;
        rowCollapsed: string;
        rowExpanded: string;
        rowExpander: string;
        columnSelected: string;
        rowSelected: string;
        rowActions: string;
        rowDetails: string;
        rowSelector: string;
        rowHighlight: string;
        rowDeleted: string;
        rowError: string;
        nobr: string;
        colSortable: string;
        colSortAsc: string;
        colSortDesc: string;
    };
    const enum ROW_ACTION {
        OK = 0,
        EDIT = 1,
        CANCEL = 2,
        DELETE = 3,
    }
    class RowSelectContent extends contentMOD.BoolContent {
        getIsCanBeEdited(): boolean;
        toString(): string;
    }
    interface ICellOptions {
        row: Row;
        td: HTMLTableCellElement;
        column: BaseColumn;
        num: number;
    }
    class BaseCell extends RIAPP.BaseObject {
        protected _row: Row;
        protected _el: HTMLTableCellElement;
        protected _column: BaseColumn;
        protected _div: HTMLElement;
        protected _clickTimeOut: number;
        private _num;
        constructor(options: ICellOptions);
        protected _init(): void;
        protected _onCellClicked(row?: Row): void;
        protected _onDblClicked(row?: Row): void;
        handleError(error: any, source: any): boolean;
        click(): void;
        scrollIntoView(isUp: boolean): void;
        destroy(): void;
        toString(): string;
        el: HTMLTableCellElement;
        row: Row;
        column: BaseColumn;
        grid: DataGrid;
        item: collMOD.ICollectionItem;
        uniqueID: string;
        num: number;
    }
    class DataCell extends BaseCell {
        private _content;
        private _stateCss;
        constructor(options: ICellOptions);
        protected _init(): void;
        click(): void;
        _beginEdit(): void;
        _endEdit(isCanceled: boolean): void;
        _setState(css: string): void;
        destroy(): void;
        toString(): string;
        column: DataColumn;
    }
    class ExpanderCell extends BaseCell {
        protected _init(): void;
        protected _onCellClicked(row?: Row): void;
        toggleImage(): void;
        toString(): string;
    }
    class ActionsCell extends BaseCell {
        private _isEditing;
        constructor(options: ICellOptions);
        protected _init(): void;
        destroy(): void;
        protected _createButtons(editing: boolean): void;
        update(): void;
        toString(): string;
        isCanEdit: boolean;
        isCanDelete: boolean;
    }
    class RowSelectorCell extends BaseCell {
        private _content;
        protected _init(): void;
        destroy(): void;
        toString(): string;
    }
    class DetailsCell extends BaseObject implements templMOD.ITemplateEvents {
        private _row;
        private _el;
        private _template;
        constructor(options: {
            row: DetailsRow;
            td: HTMLTableCellElement;
            details_id: string;
        });
        protected _init(options: {
            td: HTMLElement;
            details_id: string;
        }): void;
        templateLoading(template: templMOD.Template): void;
        templateLoaded(template: templMOD.Template): void;
        templateUnLoading(template: templMOD.Template): void;
        destroy(): void;
        toString(): string;
        el: HTMLTableCellElement;
        row: DetailsRow;
        grid: DataGrid;
        item: collMOD.ICollectionItem;
        template: templMOD.Template;
    }
    class Row extends RIAPP.BaseObject {
        private _grid;
        private _el;
        private _item;
        private _cells;
        private _objId;
        private _expanderCell;
        private _actionsCell;
        private _rowSelectorCell;
        private _isCurrent;
        private _isDeleted;
        private _isSelected;
        constructor(grid: DataGrid, options: {
            tr: HTMLElement;
            item: collMOD.ICollectionItem;
        });
        handleError(error: any, source: any): boolean;
        private _createCells();
        private _createCell(col, num);
        protected _setState(css: string): void;
        _onBeginEdit(): void;
        _onEndEdit(isCanceled: boolean): void;
        beginEdit(): boolean;
        endEdit(): boolean;
        cancelEdit(): boolean;
        destroy(): void;
        deleteRow(): void;
        updateErrorState(): void;
        scrollIntoView(isUp: boolean): void;
        toString(): string;
        el: HTMLElement;
        grid: DataGrid;
        item: collMOD.ICollectionItem;
        cells: BaseCell[];
        columns: BaseColumn[];
        uniqueID: string;
        itemKey: string;
        isCurrent: boolean;
        isSelected: boolean;
        isExpanded: boolean;
        expanderCell: ExpanderCell;
        actionsCell: ActionsCell;
        isDeleted: boolean;
        isEditing: boolean;
        isHasStateField: boolean;
    }
    class DetailsRow extends RIAPP.BaseObject {
        private _grid;
        private _el;
        private _item;
        private _cell;
        private _parentRow;
        private _objId;
        private _$el;
        private _isFirstShow;
        constructor(options: {
            grid: DataGrid;
            tr: HTMLTableRowElement;
            details_id: string;
        });
        private _createCell(details_id);
        protected _setParentRow(row: Row): void;
        private _initShow();
        private _show(onEnd);
        private _hide(onEnd);
        destroy(): void;
        toString(): string;
        el: HTMLTableRowElement;
        $el: JQuery;
        grid: DataGrid;
        item: collMOD.ICollectionItem;
        cell: DetailsCell;
        uniqueID: string;
        itemKey: string;
        parentRow: Row;
    }
    interface IColumnInfo {
        "type"?: string;
        title?: string;
        sortable?: boolean;
        sortMemberName?: string;
        colCellCss?: string;
        rowCellCss?: string;
        width?: any;
        content?: contentMOD.IContentOptions;
        tip?: string;
    }
    class BaseColumn extends RIAPP.BaseObject {
        private _grid;
        private _el;
        private _options;
        private _isSelected;
        private _objId;
        private _$extcol;
        private _$div;
        constructor(grid: DataGrid, options: {
            th: HTMLTableHeaderCellElement;
            colinfo: IColumnInfo;
        });
        protected _init(): void;
        destroy(): void;
        scrollIntoView(isUp: boolean): void;
        protected _onColumnClicked(): void;
        toString(): string;
        uniqueID: string;
        el: HTMLTableHeaderCellElement;
        $div: JQuery;
        $extcol: JQuery;
        grid: DataGrid;
        options: IColumnInfo;
        title: string;
        isSelected: boolean;
    }
    class DataColumn extends BaseColumn {
        private _sortOrder;
        private _objCache;
        constructor(grid: DataGrid, options: {
            th: HTMLTableHeaderCellElement;
            colinfo: IColumnInfo;
        });
        protected _init(): void;
        protected _onColumnClicked(): void;
        protected _cacheObject(key: string, obj: BaseObject): void;
        protected _getCachedObject(key: string): BaseObject;
        _getInitContentFn(): (content: contentMOD.IExternallyCachable) => void;
        destroy(): void;
        toString(): string;
        isSortable: boolean;
        sortMemberName: string;
        sortOrder: collMOD.SORT_ORDER;
    }
    class ExpanderColumn extends BaseColumn {
        protected _init(): void;
        toString(): string;
    }
    class RowSelectorColumn extends BaseColumn {
        private _val;
        private _$chk;
        protected _init(): void;
        protected _onCheckBoxClicked(isChecked: boolean): void;
        toString(): string;
        checked: boolean;
        destroy(): void;
    }
    interface IActionsColumnInfo extends IColumnInfo {
        img_ok?: string;
        img_cancel?: string;
        img_edit?: string;
        img_delete?: string;
    }
    class ActionsColumn extends BaseColumn {
        protected _init(): void;
        protected _onOk(cell: ActionsCell): void;
        protected _onCancel(cell: ActionsCell): void;
        protected _onDelete(cell: ActionsCell): void;
        protected _onEdit(cell: ActionsCell): void;
        toString(): string;
        destroy(): void;
    }
    interface IGridOptions {
        isUseScrollInto: boolean;
        isUseScrollIntoDetails: boolean;
        containerCss: string;
        wrapCss: string;
        headerCss: string;
        rowStateField: string;
        isCanEdit: boolean;
        isCanDelete: boolean;
        isHandleAddNew: boolean;
        details?: {
            templateID: string;
        };
        editor?: datadialog.IDialogConstructorOptions;
    }
    interface IGridConstructorOptions extends IGridOptions {
        app: Application;
        el: HTMLTableElement;
        dataSource: collMOD.BaseCollection<collMOD.ICollectionItem>;
        animation: RIAPP.IAnimation;
    }
    interface IInternalGridMethods {
        isRowExpanded(row: Row): boolean;
        appendToHeader(el: HTMLElement): void;
        setCurrentColumn(column: BaseColumn): void;
        onRowStateChanged(row: Row, val: any): string;
        onCellDblClicked(cell: BaseCell): void;
        onRowSelectionChanged(row: Row): void;
        resetColumnsSort(): void;
        getLastRow(): Row;
        removeRow(row: Row): void;
        expandDetails(parentRow: Row, expanded: boolean): void;
        getIsClearing(): boolean;
        get$El(): JQuery;
    }
    class DataGrid extends RIAPP.BaseObject implements RIAPP.ISelectableProvider {
        private _options;
        private _$el;
        private _isClearing;
        private _el;
        private _name;
        private _objId;
        private _rowMap;
        private _rows;
        private _columns;
        private _isDSFilling;
        private _currentRow;
        private _expandedRow;
        private _details;
        private _expanderCol;
        private _actionsCol;
        private _rowSelectorCol;
        private _currentColumn;
        private _editingRow;
        private _isSorting;
        private _dialog;
        private _$headerDiv;
        private _$wrapDiv;
        private _contaner;
        _columnWidthChecker: () => void;
        private _internal;
        private _selectable;
        constructor(options: IGridConstructorOptions);
        protected _getEventNames(): string[];
        addOnRowExpanded(fn: TEventHandler<DataGrid, {
            collapsedRow: Row;
            expandedRow: Row;
            isExpanded: boolean;
        }>, nmspace?: string, context?: any): void;
        removeOnRowExpanded(nmspace?: string): void;
        addOnRowSelected(fn: TEventHandler<DataGrid, {
            row: Row;
        }>, nmspace?: string, context?: any): void;
        removeOnRowSelected(nmspace?: string): void;
        addOnPageChanged(fn: TEventHandler<DataGrid, any>, nmspace?: string, context?: any): void;
        removeOnPageChanged(nmspace?: string): void;
        addOnRowStateChanged(fn: TEventHandler<DataGrid, {
            row: Row;
            val: any;
            css: string;
        }>, nmspace?: string, context?: any): void;
        removeOnRowStateChanged(nmspace?: string): void;
        addOnCellDblClicked(fn: TEventHandler<DataGrid, {
            cell: BaseCell;
        }>, nmspace?: string, context?: any): void;
        removeOnCellDblClicked(nmspace?: string): void;
        addOnRowAction(fn: TEventHandler<DataGrid, {
            row: Row;
            action: ROW_ACTION;
        }>, nmspace?: string, context?: any): void;
        removeOnRowAction(nmspace?: string): void;
        protected _getContainerEl(): HTMLElement;
        protected _onKeyDown(key: number, event: Event): void;
        protected _onKeyUp(key: number, event: Event): void;
        protected _isRowExpanded(row: Row): boolean;
        protected _appendToHeader(el: HTMLElement): void;
        protected _setCurrentColumn(column: BaseColumn): void;
        protected _onRowStateChanged(row: Row, val: any): string;
        protected _onCellDblClicked(cell: BaseCell): void;
        protected _onRowSelectionChanged(row: Row): void;
        protected _resetColumnsSort(): void;
        protected _getLastRow(): Row;
        protected _removeRow(row: Row): void;
        protected _expandDetails(parentRow: Row, expanded: boolean): void;
        protected _getIsClearing(): boolean;
        protected _get$El(): JQuery;
        protected _parseColumnAttr(column_attr: string, content_attr: string): IColumnInfo;
        protected _findUndeleted(row: Row, isUp: boolean): Row;
        protected _updateCurrent(row: Row, withScroll: boolean): void;
        protected _scrollToCurrent(isUp: boolean): void;
        handleError(error: any, source: any): boolean;
        protected _onDSCurrentChanged(sender?: any, args?: any): void;
        protected _onDSCollectionChanged(sender: any, args: collMOD.ICollChangedArgs<collMOD.ICollectionItem>): void;
        protected _onDSFill(sender: any, args: collMOD.ICollFillArgs<collMOD.ICollectionItem>): void;
        protected _onPageChanged(): void;
        protected _onItemEdit(item: collMOD.ICollectionItem, isBegin: boolean, isCanceled: boolean): void;
        protected _onItemAdded(sender: any, args: collMOD.ICollItemAddedArgs<collMOD.ICollectionItem>): void;
        protected _onItemStatusChanged(item: collMOD.ICollectionItem, oldStatus: collMOD.STATUS): void;
        protected _onDSErrorsChanged(sender: any, args: collMOD.ICollItemArgs<collMOD.ICollectionItem>): void;
        protected _bindDS(): void;
        protected _unbindDS(): void;
        protected _clearGrid(): void;
        protected _updateColsDim(): void;
        protected _wrapTable(): void;
        protected _unWrapTable(): void;
        protected _createColumns(): void;
        protected _createColumn(options: {
            th: HTMLTableHeaderCellElement;
            colinfo: IColumnInfo;
        }): BaseColumn;
        protected _appendItems(newItems: collMOD.ICollectionItem[]): void;
        protected _refreshGrid(): void;
        protected _createRowForItem(parent: Node, item: collMOD.ICollectionItem, pos?: number): Row;
        protected _createDetails(): DetailsRow;
        _getInternal(): IInternalGridMethods;
        getISelectable(): ISelectable;
        sortByColumn(column: DataColumn): void;
        selectRows(isSelect: boolean): void;
        findRowByItem(item: collMOD.ICollectionItem): Row;
        collapseDetails(): void;
        getSelectedRows(): Row[];
        showEditDialog(): boolean;
        scrollToCurrent(isUp: boolean): void;
        addNew(): void;
        destroy(): void;
        app: Application;
        options: IGridConstructorOptions;
        _tBodyEl: Element;
        _tHeadEl: HTMLTableSectionElement;
        _tFootEl: HTMLTableSectionElement;
        _tHeadRow: HTMLTableRowElement;
        _tHeadCells: any[];
        uniqueID: string;
        name: string;
        dataSource: collMOD.BaseCollection<collMOD.ICollectionItem>;
        rows: Row[];
        columns: BaseColumn[];
        currentRow: Row;
        editingRow: Row;
        isCanEdit: boolean;
        isCanDelete: boolean;
        isCanAddNew: boolean;
        isUseScrollInto: boolean;
        animation: IAnimation;
    }
    interface IRowStateProvider {
        getCSS(item: collMOD.ICollectionItem, val: any): string;
    }
    interface IGridViewOptions extends IGridOptions, elviewMOD.IViewOptions {
    }
    class GridElView extends elviewMOD.BaseElView {
        private _grid;
        private _options;
        private _stateProvider;
        toString(): string;
        protected _init(options: IGridViewOptions): void;
        destroy(): void;
        private _createGrid();
        private _bindGridEvents();
        dataSource: collMOD.BaseCollection<collMOD.ICollectionItem>;
        grid: DataGrid;
        stateProvider: IRowStateProvider;
        animation: IAnimation;
    }
}
declare namespace RIAPP.MOD.pager {
    import collMOD = RIAPP.MOD.collection;
    import elviewMOD = RIAPP.MOD.baseElView;
    var css: {
        pager: string;
        info: string;
        currentPage: string;
        otherPage: string;
    };
    interface IPagerOptions {
        showTip?: boolean;
        showInfo?: boolean;
        showNumbers?: boolean;
        showFirstAndLast?: boolean;
        showPreviousAndNext?: boolean;
        useSlider?: boolean;
        hideOnSinglePage?: boolean;
        sliderSize?: number;
    }
    interface IPagerConstructorOptions extends IPagerOptions {
        app: Application;
        el: HTMLElement;
        dataSource: collMOD.BaseCollection<collMOD.ICollectionItem>;
    }
    class Pager extends RIAPP.BaseObject {
        private _$el;
        private _objId;
        private _options;
        private _rowsPerPage;
        private _rowCount;
        private _currentPage;
        constructor(options: IPagerConstructorOptions);
        protected _createElement(tag: string): JQuery;
        protected _render(): void;
        protected _setDSPageIndex(page: number): void;
        protected _onPageSizeChanged(ds: collMOD.BaseCollection<collMOD.ICollectionItem>, args?: any): void;
        protected _onPageIndexChanged(ds: collMOD.BaseCollection<collMOD.ICollectionItem>, args?: any): void;
        protected _onTotalCountChanged(ds: collMOD.BaseCollection<collMOD.ICollectionItem>, args?: any): void;
        destroy(): void;
        protected _bindDS(): void;
        protected _unbindDS(): void;
        protected _clearContent(): void;
        protected _createLink(page: number, text: string, tip?: string): JQuery;
        protected _createFirst(): JQuery;
        protected _createPrevious(): JQuery;
        protected _createCurrent(): JQuery;
        protected _createOther(page: number): JQuery;
        protected _createNext(): JQuery;
        protected _createLast(): JQuery;
        protected _buildTip(page: number): string;
        toString(): string;
        app: Application;
        el: HTMLElement;
        dataSource: collMOD.BaseCollection<collMOD.ICollectionItem>;
        pageCount: number;
        rowCount: number;
        rowsPerPage: number;
        currentPage: number;
        useSlider: boolean;
        sliderSize: number;
        hideOnSinglePage: boolean;
        showTip: boolean;
        showInfo: boolean;
        showFirstAndLast: boolean;
        showPreviousAndNext: boolean;
        showNumbers: boolean;
    }
    interface IPagerViewOptions extends IPagerOptions, elviewMOD.IViewOptions {
    }
    class PagerElView extends elviewMOD.BaseElView {
        private _options;
        private _pager;
        constructor(app: Application, el: HTMLElement, options: IPagerViewOptions);
        destroy(): void;
        toString(): string;
        dataSource: collMOD.BaseCollection<collMOD.ICollectionItem>;
        pager: Pager;
    }
}
declare namespace RIAPP.MOD.stackpanel {
    import templMOD = RIAPP.MOD.template;
    import collMOD = RIAPP.MOD.collection;
    var css: {
        stackpanel: string;
        item: string;
        currentItem: string;
    };
    interface IStackPanelOptions {
        orientation?: string;
        templateID: string;
    }
    interface IStackPanelConstructorOptions extends IStackPanelOptions {
        app: Application;
        el: HTMLElement;
        dataSource: collMOD.BaseCollection<collMOD.ICollectionItem>;
    }
    class StackPanel extends RIAPP.BaseObject implements RIAPP.ISelectableProvider, templMOD.ITemplateEvents {
        private _$el;
        private _objId;
        private _isDSFilling;
        private _currentItem;
        private _itemMap;
        private _options;
        private _selectable;
        constructor(options: IStackPanelConstructorOptions);
        protected _getEventNames(): string[];
        templateLoading(template: templMOD.Template): void;
        templateLoaded(template: templMOD.Template): void;
        templateUnLoading(template: templMOD.Template): void;
        addOnItemClicked(fn: TEventHandler<StackPanel, {
            item: collMOD.ICollectionItem;
        }>, nmspace?: string, context?: BaseObject): void;
        removeOnItemClicked(nmspace?: string): void;
        protected _getContainerEl(): HTMLElement;
        protected _onKeyDown(key: number, event: Event): void;
        protected _onKeyUp(key: number, event: Event): void;
        protected _updateCurrent(item: collMOD.ICollectionItem, withScroll: boolean): void;
        protected _onDSCurrentChanged(sender: any, args: any): void;
        protected _onDSCollectionChanged(sender: any, args: collMOD.ICollChangedArgs<collMOD.ICollectionItem>): void;
        protected _onDSFill(sender: any, args: collMOD.ICollFillArgs<collMOD.ICollectionItem>): void;
        protected _onItemStatusChanged(item: collMOD.ICollectionItem, oldStatus: collMOD.STATUS): void;
        protected _createTemplate(item: collMOD.ICollectionItem): templMOD.Template;
        protected _appendItems(newItems: collMOD.ICollectionItem[]): void;
        protected _appendItem(item: collMOD.ICollectionItem): void;
        protected _bindDS(): void;
        protected _unbindDS(): void;
        protected _createElement(tag: string): JQuery;
        protected _onItemClicked(div: HTMLElement, item: collMOD.ICollectionItem): void;
        protected _clearContent(): void;
        protected _removeItemByKey(key: string): void;
        protected _removeItem(item: collMOD.ICollectionItem): void;
        protected _refresh(): void;
        destroy(): void;
        getISelectable(): ISelectable;
        scrollIntoView(item: collMOD.ICollectionItem): void;
        getDivElementByItem(item: collMOD.ICollectionItem): HTMLDivElement;
        toString(): string;
        app: Application;
        el: HTMLElement;
        uniqueID: string;
        orientation: string;
        templateID: string;
        dataSource: collMOD.BaseCollection<collMOD.ICollectionItem>;
        currentItem: collMOD.ICollectionItem;
    }
    interface IStackPanelViewOptions extends IStackPanelOptions, baseElView.IViewOptions {
    }
    interface IPanelEvents {
        onItemClicked(item: collMOD.ICollectionItem): void;
    }
    class StackPanelElView extends baseElView.BaseElView {
        private _panel;
        private _options;
        private _panelEvents;
        constructor(app: Application, el: HTMLElement, options: IStackPanelViewOptions);
        private _createPanel(opts);
        destroy(): void;
        toString(): string;
        dataSource: collMOD.BaseCollection<collMOD.ICollectionItem>;
        panelEvents: IPanelEvents;
        panel: StackPanel;
    }
}
declare namespace RIAPP.MOD.db {
    import constsMOD = RIAPP.consts;
    import collMOD = RIAPP.MOD.collection;
    import errMOD = RIAPP.MOD.errors;
    const enum FLAGS {
        None = 0,
        Changed = 1,
        Setted = 2,
        Refreshed = 4,
    }
    const enum REFRESH_MODE {
        NONE = 0,
        RefreshCurrent = 1,
        MergeIntoCurrent = 2,
        CommitChanges = 3,
    }
    const enum DELETE_ACTION {
        NoAction = 0,
        Cascade = 1,
        SetNulls = 2,
    }
    const enum DATA_OPER {
        SUBMIT = 0,
        LOAD = 1,
        INVOKE = 2,
        REFRESH = 3,
        INIT = 4,
    }
    class DataOperationError extends errMOD.BaseError {
        private _operationName;
        constructor(ex: any, operationName: DATA_OPER);
        operationName: DATA_OPER;
    }
    class AccessDeniedError extends DataOperationError {
    }
    class ConcurrencyError extends DataOperationError {
    }
    class SvcValidationError extends DataOperationError {
    }
    class SubmitError extends DataOperationError {
        private _allSubmitted;
        private _notValidated;
        constructor(origError: any, allSubmitted: IEntityItem[], notValidated: IEntityItem[]);
        allSubmitted: IEntityItem[];
        notValidated: IEntityItem[];
    }
    interface IFieldName {
        n: string;
        p: IFieldName[];
    }
    interface ICachedPage {
        items: IEntityItem[];
        pageIndex: number;
    }
    interface IQueryParamInfo {
        dataType: constsMOD.DATA_TYPE;
        dateConversion: constsMOD.DATE_CONVERSION;
        isArray: boolean;
        isNullable: boolean;
        name: string;
        ordinal: number;
    }
    interface IQueryInfo {
        isQuery: boolean;
        methodName: string;
        methodResult: boolean;
        parameters: IQueryParamInfo[];
    }
    interface IFilterInfo {
        filterItems: {
            fieldName: string;
            kind: collMOD.FILTER_TYPE;
            values: any[];
        }[];
    }
    interface ISortInfo {
        sortItems: {
            fieldName: string;
            sortOrder: collMOD.SORT_ORDER;
        }[];
    }
    interface IValueChange {
        val: any;
        orig: any;
        fieldName: string;
        flags: number;
        nested: IValueChange[];
    }
    interface IValidationErrorInfo {
        fieldName: string;
        message: string;
    }
    interface IRowInfo {
        values: IValueChange[];
        changeType: number;
        serverKey: string;
        clientKey: string;
        error: string;
        invalid?: IValidationErrorInfo[];
    }
    interface IPermissions extends collMOD.IPermissions {
        dbSetName: string;
    }
    interface IPermissionsInfo {
        serverTimezone: number;
        permissions: IPermissions[];
    }
    interface IParamInfo {
        parameters: {
            name: string;
            value: any;
        }[];
    }
    interface IErrorInfo {
        name: string;
        message: string;
    }
    interface IInvokeRequest {
        methodName: string;
        paramInfo: IParamInfo;
    }
    interface IInvokeResponse {
        result: any;
        error: IErrorInfo;
    }
    interface IDbSetInfo {
        dbSetName: string;
        enablePaging: boolean;
        pageSize: number;
        fieldInfos: IFieldInfo[];
    }
    interface IRefreshRowInfo {
        dbSetName: string;
        rowInfo: IRowInfo;
        error: {
            name: string;
            message: string;
        };
    }
    interface IDbSetConstuctorOptions {
        dbContext: DbContext;
        dbSetInfo: IDbSetInfo;
        childAssoc: IAssociationInfo[];
        parentAssoc: IAssociationInfo[];
    }
    interface IAssocConstructorOptions {
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
    interface IAssociationInfo {
        childDbSetName: string;
        childToParentName: string;
        name: string;
        onDeleteAction: number;
        parentDbSetName: string;
        parentToChildrenName: string;
        fieldRels: {
            childField: string;
            parentField: string;
        }[];
    }
    interface IDbSetOptions extends collMOD.ICollectionOptions {
        dbSetName: string;
    }
    interface IMetadata {
        associations: IAssociationInfo[];
        dbSets: IDbSetInfo[];
        methods: IQueryInfo[];
        serverTimezone: number;
    }
    interface ITrackAssoc {
        assocName: string;
        parentKey: string;
        childKey: string;
    }
    interface IChangeSet {
        dbSets: {
            dbSetName: string;
            rows: IRowInfo[];
        }[];
        error: {
            name: string;
            message: string;
        };
        trackAssocs: ITrackAssoc[];
    }
    interface IQueryRequest {
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
    interface IRowData {
        k: string;
        v: any[];
    }
    interface IQueryResult<TItem extends IEntityItem> {
        fetchedItems: TItem[];
        newItems: TItem[];
        isPageChanged: boolean;
        outOfBandData: any;
    }
    interface IIncludedResult {
        names: IFieldName[];
        rows: IRowData[];
        rowCount: number;
        dbSetName: string;
    }
    interface IQueryResponse {
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
    interface IEntityAspectConstructor<TItem extends IEntityItem, TDbContext extends DbContext> {
        new (dbSet: DbSet<TItem, TDbContext>, itemType: IEntityConstructor<TItem>, row: IRowData, names: IFieldName[]): EntityAspect<TItem, TDbContext>;
    }
    interface IEntityConstructor<TItem extends IEntityItem> {
        new (aspect: EntityAspect<TItem, DbContext>): TItem;
    }
    interface IDbSetConstructor<TItem extends IEntityItem> {
        new (dbContext: DbContext): DbSet<TItem, DbContext>;
    }
    interface IEntityItem extends collMOD.ICollectionItem {
        _aspect: EntityAspect<IEntityItem, DbContext>;
    }
    interface ICalcFieldImpl<TItem extends IEntityItem> {
        getFunc: (item: TItem) => any;
    }
    interface INavFieldImpl<TItem extends IEntityItem> {
        getFunc: (item: TItem) => any;
        setFunc: (v: any) => void;
    }
    class DataCache extends RIAPP.BaseObject {
        private _query;
        private _cache;
        private _totalCount;
        private _itemsByKey;
        constructor(query: DataQuery<IEntityItem>);
        getCachedPage(pageIndex: number): ICachedPage;
        reindexCache(): void;
        getPrevCachedPageIndex(currentPageIndex: number): number;
        getNextRange(pageIndex: number): {
            start: number;
            end: number;
            cnt: number;
        };
        fillCache(start: number, items: IEntityItem[]): void;
        clear(): void;
        clearCacheForPage(pageIndex: number): void;
        hasPage(pageIndex: number): boolean;
        getItemByKey(key: string): IEntityItem;
        getPageByItem(item: IEntityItem): number;
        destroy(): void;
        toString(): string;
        _pageCount: number;
        pageSize: number;
        loadPageCount: number;
        totalCount: number;
        cacheSize: number;
    }
    interface IInternalQueryMethods<TItem extends IEntityItem> {
        clearCache(): void;
        getCache(): DataCache;
        reindexCache(): void;
        isPageCached(pageIndex: number): boolean;
        getQueryInfo(): IQueryInfo;
    }
    class DataQuery<TItem extends IEntityItem> extends RIAPP.BaseObject {
        private _dbSet;
        private __queryInfo;
        private _filterInfo;
        private _sortInfo;
        private _isIncludeTotalCount;
        private _isClearPrevData;
        private _pageSize;
        private _pageIndex;
        private _params;
        private _loadPageCount;
        private _isClearCacheOnEveryLoad;
        private _dataCache;
        private _cacheInvalidated;
        private _internal;
        constructor(dbSet: DbSet<TItem, DbContext>, queryInfo: IQueryInfo);
        private _addSort(fieldName, sortOrder);
        private _addFilterItem(fieldName, operand, value);
        private _resetCacheInvalidated();
        private _clearCache();
        private _getCache();
        private _reindexCache();
        private _isPageCached(pageIndex);
        _getInternal(): IInternalQueryMethods<TItem>;
        where(fieldName: string, operand: collMOD.FILTER_TYPE, value: any): DataQuery<TItem>;
        and(fieldName: string, operand: collMOD.FILTER_TYPE, value: any): DataQuery<TItem>;
        orderBy(fieldName: string, sortOrder?: collMOD.SORT_ORDER): DataQuery<TItem>;
        thenBy(fieldName: string, sortOrder?: collMOD.SORT_ORDER): DataQuery<TItem>;
        clearSort(): DataQuery<TItem>;
        clearFilter(): DataQuery<TItem>;
        clearParams(): DataQuery<TItem>;
        getFieldInfo(fieldName: string): IFieldInfo;
        getFieldNames(): string[];
        load(): IPromise<IQueryResult<TItem>>;
        destroy(): void;
        toString(): string;
        serverTimezone: number;
        entityType: IEntityConstructor<TItem>;
        dbSet: DbSet<TItem, DbContext>;
        dbSetName: string;
        queryName: string;
        filterInfo: IFilterInfo;
        sortInfo: ISortInfo;
        isIncludeTotalCount: boolean;
        isClearPrevData: boolean;
        pageSize: number;
        pageIndex: number;
        params: any;
        isPagingEnabled: boolean;
        loadPageCount: number;
        isClearCacheOnEveryLoad: boolean;
        isCacheValid: boolean;
    }
    class TDataQuery extends DataQuery<IEntityItem> {
    }
    class EntityAspect<TItem extends IEntityItem, TDbContext extends DbContext> extends collMOD.ItemAspect<TItem> {
        private __srvKey;
        private _isRefreshing;
        private _isCached;
        private _origVals;
        private _savedStatus;
        protected _item: TItem;
        constructor(dbSet: DbSet<TItem, TDbContext>, itemType: IEntityConstructor<TItem>, row: IRowData, names: IFieldName[]);
        private _fakeDestroy();
        protected _initRowInfo(row: IRowData, names: IFieldName[]): void;
        protected _processValues(path: string, values: any[], names: IFieldName[]): void;
        protected _onFieldChanged(fieldName: string, fieldInfo: IFieldInfo): void;
        protected _getValueChange(fullName: string, fieldInfo: IFieldInfo, changedOnly: boolean): IValueChange;
        protected _getValueChanges(changedOnly: boolean): IValueChange[];
        protected _fldChanging(fieldName: string, fieldInfo: IFieldInfo, oldV: any, newV: any): boolean;
        protected _skipValidate(fieldInfo: IFieldInfo, val: any): boolean;
        protected _beginEdit(): boolean;
        protected _endEdit(): boolean;
        protected _cancelEdit(): boolean;
        protected getDbSet(): DbSet<TItem, TDbContext>;
        protected setStatus(v: collMOD.STATUS): void;
        _updateKeys(srvKey: string): void;
        _checkCanRefresh(): void;
        _refreshValue(val: any, fullName: string, refreshMode: REFRESH_MODE): void;
        _refreshValues(rowInfo: IRowInfo, refreshMode: REFRESH_MODE): void;
        _getRowInfo(): IRowInfo;
        _getCalcFieldVal(fieldName: string): any;
        _getNavFieldVal(fieldName: string): any;
        _setNavFieldVal(fieldName: string, value: any): void;
        _clearFieldVal(fieldName: string): void;
        _getFieldVal(fieldName: string): any;
        _setFieldVal(fieldName: string, val: any): boolean;
        _acceptChanges(rowInfo?: IRowInfo): void;
        _onAttaching(): void;
        _onAttach(): void;
        deleteItem(): boolean;
        deleteOnSubmit(): boolean;
        acceptChanges(): void;
        rejectChanges(): void;
        submitChanges(): IVoidPromise;
        refresh(): IPromise<TItem>;
        getItem(): TItem;
        toString(): string;
        destroy(): void;
        _entityType: IEntityConstructor<TItem>;
        _srvKey: string;
        isCanSubmit: boolean;
        isNew: boolean;
        isDeleted: boolean;
        dbSetName: string;
        serverTimezone: number;
        dbSet: DbSet<TItem, TDbContext>;
        isRefreshing: boolean;
        isCached: boolean;
    }
    interface IDbSetLoadedArgs<TItem extends IEntityItem> {
        items: TItem[];
    }
    interface IInternalDbSetMethods<TItem extends IEntityItem> extends collMOD.IInternalCollMethods<TItem> {
        getCalcFieldVal(fieldName: string, item: IEntityItem): any;
        getNavFieldVal(fieldName: string, item: IEntityItem): any;
        setNavFieldVal(fieldName: string, item: IEntityItem, value: any): void;
        beforeLoad(query: DataQuery<TItem>, oldQuery: DataQuery<TItem>): void;
        updatePermissions(perms: IPermissions): void;
        getChildToParentNames(childFieldName: string): string[];
        fillFromService(data: {
            res: IQueryResponse;
            isPageChanged: boolean;
            fn_beforeFillEnd: () => void;
        }): IQueryResult<TItem>;
        fillFromCache(data: {
            isPageChanged: boolean;
            fn_beforeFillEnd: () => void;
        }): IQueryResult<TItem>;
        commitChanges(rows: IRowInfo[]): void;
        setItemInvalid(row: IRowInfo): TItem;
        getChanges(): IRowInfo[];
        getTrackAssocInfo(): ITrackAssoc[];
        addToChanged(item: TItem): void;
        removeFromChanged(key: string): void;
        onItemStatusChanged(item: TItem, oldStatus: collMOD.STATUS): void;
    }
    class DbSet<TItem extends IEntityItem, TDbContext extends DbContext> extends collMOD.BaseCollection<TItem> {
        private _dbContext;
        private _isSubmitOnDelete;
        private _trackAssoc;
        private _trackAssocMap;
        private _childAssocMap;
        private _parentAssocMap;
        private _changeCount;
        private _changeCache;
        protected _options: IDbSetOptions;
        protected _navfldMap: {
            [fieldName: string]: INavFieldImpl<TItem>;
        };
        protected _calcfldMap: {
            [fieldName: string]: ICalcFieldImpl<TItem>;
        };
        protected _itemsByKey: {
            [key: string]: TItem;
        };
        protected _entityType: IEntityConstructor<TItem>;
        protected _ignorePageChanged: boolean;
        protected _query: DataQuery<TItem>;
        constructor(opts: IDbSetConstuctorOptions, entityType: IEntityConstructor<TItem>);
        handleError(error: any, source: any): boolean;
        protected _getEventNames(): string[];
        protected _mapAssocFields(): void;
        protected _doNavigationField(opts: IDbSetConstuctorOptions, fieldInfo: IFieldInfo): INavFieldImpl<TItem>;
        protected _doCalculatedField(opts: IDbSetConstuctorOptions, fieldInfo: IFieldInfo): ICalcFieldImpl<TItem>;
        protected _refreshValues(path: string, item: IEntityItem, values: any[], names: IFieldName[], rm: REFRESH_MODE): void;
        protected _setCurrentItem(v: TItem): void;
        protected _getNewKey(item: TItem): string;
        protected _createNew(): TItem;
        protected _clearChangeCache(): void;
        protected _onPageChanging(): boolean;
        protected _onPageChanged(): void;
        protected _onPageSizeChanged(): void;
        protected _defineCalculatedField(fullName: string, getFunc: (item: TItem) => any): void;
        protected _onLoaded(items: TItem[]): void;
        protected _getStrValue(val: any, fieldInfo: IFieldInfo): string;
        protected _getCalcFieldVal(fieldName: string, item: TItem): any;
        protected _getNavFieldVal(fieldName: string, item: TItem): any;
        protected _setNavFieldVal(fieldName: string, item: TItem, value: any): void;
        protected _beforeLoad(query: DataQuery<TItem>, oldQuery: DataQuery<TItem>): void;
        protected _updatePermissions(perms: IPermissions): void;
        protected _getChildToParentNames(childFieldName: string): string[];
        protected _fillFromService(data: {
            res: IQueryResponse;
            isPageChanged: boolean;
            fn_beforeFillEnd: () => void;
        }): IQueryResult<TItem>;
        protected _fillFromCache(data: {
            isPageChanged: boolean;
            fn_beforeFillEnd: () => void;
        }): IQueryResult<TItem>;
        protected _commitChanges(rows: IRowInfo[]): void;
        protected _setItemInvalid(row: IRowInfo): TItem;
        protected _getChanges(): IRowInfo[];
        protected _getTrackAssocInfo(): ITrackAssoc[];
        protected _addToChanged(item: TItem): void;
        protected _removeFromChanged(key: string): void;
        protected _onItemStatusChanged(item: TItem, oldStatus: collMOD.STATUS): void;
        protected _onRemoved(item: TItem, pos: number): void;
        _getInternal(): IInternalDbSetMethods<TItem>;
        addOnLoaded(fn: TEventHandler<DbSet<TItem, TDbContext>, IDbSetLoadedArgs<TItem>>, nmspace?: string, context?: BaseObject): void;
        removeOnLoaded(nmspace?: string): void;
        getFieldInfo(fieldName: string): IFieldInfo;
        sort(fieldNames: string[], sortOrder: collMOD.SORT_ORDER): IPromise<IQueryResult<IEntityItem>>;
        fillItems(data: {
            names: IFieldName[];
            rows: IRowData[];
        }): void;
        acceptChanges(): void;
        rejectChanges(): void;
        deleteOnSubmit(item: TItem): void;
        clear(): void;
        createQuery(name: string): DataQuery<TItem>;
        clearCache(): void;
        destroy(): void;
        toString(): string;
        items: TItem[];
        dbContext: TDbContext;
        dbSetName: string;
        entityType: IEntityConstructor<TItem>;
        query: DataQuery<TItem>;
        isHasChanges: boolean;
        cacheSize: number;
        isSubmitOnDelete: boolean;
    }
    class TDbSet extends DbSet<IEntityItem, DbContext> {
    }
    class DbSets extends RIAPP.BaseObject {
        protected _dbSetNames: string[];
        private _dbContext;
        private _dbSets;
        private _arrDbSets;
        constructor(dbContext: DbContext);
        protected _dbSetCreated(dbSet: DbSet<IEntityItem, DbContext>): void;
        protected _createDbSet(name: string, dbSetType: IDbSetConstructor<IEntityItem>): void;
        dbSetNames: string[];
        arrDbSets: DbSet<IEntityItem, DbContext>[];
        getDbSet(name: string): DbSet<IEntityItem, DbContext>;
        destroy(): void;
    }
    interface IInternalDbxtMethods {
        onItemRefreshed(res: IRefreshRowInfo, item: IEntityItem): void;
        refreshItem(item: IEntityItem): IPromise<IEntityItem>;
        getQueryInfo(name: string): IQueryInfo;
        onDbSetHasChangesChanged(eSet: DbSet<IEntityItem, DbContext>): void;
        load(query: DataQuery<IEntityItem>, isPageChanged: boolean): IPromise<IQueryResult<IEntityItem>>;
    }
    class DbContext extends RIAPP.BaseObject {
        protected _isInitialized: boolean;
        protected _dbSets: DbSets;
        protected _svcMethods: any;
        protected _assoc: any;
        private _arrAssoc;
        private _queryInf;
        private _serviceUrl;
        private _isBusy;
        private _isSubmiting;
        private _isHasChanges;
        private _pendingSubmit;
        private _serverTimezone;
        private _waitQueue;
        private _internal;
        constructor();
        protected _getEventNames(): string[];
        protected _initDbSets(): void;
        protected _initAssociations(associations: IAssociationInfo[]): void;
        protected _initMethods(methods: IQueryInfo[]): void;
        protected _updatePermissions(info: IPermissionsInfo): void;
        protected _initAssociation(assoc: IAssociationInfo): void;
        protected _initMethod(methodInfo: IQueryInfo): void;
        protected _getMethodParams(methodInfo: IQueryInfo, args: {
            [paramName: string]: any;
        }): IInvokeRequest;
        protected _invokeMethod(methodInfo: IQueryInfo, data: IInvokeRequest, callback: (res: {
            result: any;
            error: any;
        }) => void): void;
        protected _loadFromCache(query: DataQuery<IEntityItem>, isPageChanged: boolean): IQueryResult<IEntityItem>;
        protected _loadIncluded(res: IQueryResponse): void;
        protected _onLoaded(res: IQueryResponse, isPageChanged: boolean): IQueryResult<IEntityItem>;
        protected _dataSaved(res: IChangeSet): void;
        protected _getChanges(): IChangeSet;
        protected _getUrl(action: string): string;
        handleError(error: any, source: any): boolean;
        protected _onDataOperError(ex: any, oper: DATA_OPER): boolean;
        protected _onSubmitError(error: any): void;
        protected waitForNotBusy(callback: (...args: any[]) => any, callbackArgs: any): void;
        protected waitForNotSubmiting(callback: (...args: any[]) => any, callbackArgs: any, groupName: string): void;
        protected waitForInitialized(callback: (...args: any[]) => any, callbackArgs: any): void;
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
        }): void;
        protected _onItemRefreshed(res: IRefreshRowInfo, item: IEntityItem): void;
        protected _refreshItem(item: IEntityItem): IPromise<IEntityItem>;
        protected _getQueryInfo(name: string): IQueryInfo;
        protected _onDbSetHasChangesChanged(eSet: DbSet<IEntityItem, DbContext>): void;
        protected _load(query: DataQuery<IEntityItem>, isPageChanged: boolean): IPromise<IQueryResult<IEntityItem>>;
        initialize(options: {
            serviceUrl: string;
            permissions?: IPermissionsInfo;
        }): void;
        addOnSubmitError(fn: TEventHandler<DbContext, {
            error: any;
            isHandled: boolean;
        }>, nmspace?: string, context?: BaseObject): void;
        removeOnSubmitError(nmspace?: string): void;
        _getInternal(): IInternalDbxtMethods;
        getDbSet(name: string): DbSet<IEntityItem, DbContext>;
        getAssociation(name: string): Association;
        submitChanges(): IVoidPromise;
        load(query: DataQuery<IEntityItem>): IPromise<IQueryResult<IEntityItem>>;
        acceptChanges(): void;
        rejectChanges(): void;
        destroy(): void;
        service_url: string;
        isInitialized: boolean;
        isBusy: boolean;
        isSubmiting: boolean;
        serverTimezone: number;
        dbSets: DbSets;
        serviceMethods: any;
        isHasChanges: boolean;
    }
    class Association extends RIAPP.BaseObject {
        private _objId;
        private _name;
        private _dbContext;
        private _onDeleteAction;
        private _parentDS;
        private _childDS;
        private _parentFldInfos;
        private _childFldInfos;
        private _parentToChildrenName;
        private _childToParentName;
        private _parentMap;
        private _childMap;
        private _isParentFilling;
        private _isChildFilling;
        private _saveParentFKey;
        private _saveChildFKey;
        private _changedTimeout;
        private _changed;
        constructor(options: IAssocConstructorOptions);
        handleError(error: any, source: any): boolean;
        protected _bindParentDS(): void;
        protected _bindChildDS(): void;
        protected _onParentCollChanged(args: collMOD.ICollChangedArgs<IEntityItem>): void;
        protected _onParentFill(args: collMOD.ICollFillArgs<IEntityItem>): void;
        protected _onParentEdit(item: IEntityItem, isBegin: boolean, isCanceled: boolean): void;
        protected _onParentCommitChanges(item: IEntityItem, isBegin: boolean, isRejected: boolean, status: collMOD.STATUS): void;
        protected _storeParentFKey(item: IEntityItem): void;
        protected _checkParentFKey(item: IEntityItem): void;
        protected _onParentStatusChanged(item: IEntityItem, oldStatus: collMOD.STATUS): void;
        protected _onChildCollChanged(args: collMOD.ICollChangedArgs<IEntityItem>): void;
        protected _notifyChildrenChanged(changed: string[]): void;
        protected _notifyParentChanged(changed: string[]): void;
        protected _notifyChanged(changed_pkeys: string[], changed_ckeys: string[]): void;
        protected _onChildFill(args: collMOD.ICollFillArgs<IEntityItem>): void;
        protected _onChildEdit(item: IEntityItem, isBegin: boolean, isCanceled: boolean): void;
        protected _onChildCommitChanges(item: IEntityItem, isBegin: boolean, isRejected: boolean, status: collMOD.STATUS): void;
        protected _storeChildFKey(item: IEntityItem): void;
        protected _checkChildFKey(item: IEntityItem): void;
        protected _onChildStatusChanged(item: IEntityItem, oldStatus: collMOD.STATUS): void;
        protected _getItemKey(finf: IFieldInfo[], ds: DbSet<IEntityItem, DbContext>, item: IEntityItem): string;
        protected _resetChildMap(): void;
        protected _resetParentMap(): void;
        protected _unMapChildItem(item: IEntityItem): string;
        protected _unMapParentItem(item: IEntityItem): string;
        protected _mapParentItems(items: IEntityItem[]): string[];
        protected _onChildrenChanged(fkey: string): void;
        protected _onParentChanged(fkey: string): void;
        protected _mapChildren(items: IEntityItem[]): string[];
        protected _unbindParentDS(): void;
        protected _unbindChildDS(): void;
        getParentFKey(item: IEntityItem): string;
        getChildFKey(item: IEntityItem): string;
        getChildItems(item: IEntityItem): IEntityItem[];
        getParentItem(item: IEntityItem): IEntityItem;
        refreshParentMap(): string[];
        refreshChildMap(): string[];
        destroy(): void;
        toString(): string;
        name: string;
        parentToChildrenName: string;
        childToParentName: string;
        parentDS: DbSet<IEntityItem, DbContext>;
        childDS: DbSet<IEntityItem, DbContext>;
        parentFldInfos: IFieldInfo[];
        childFldInfos: IFieldInfo[];
        onDeleteAction: DELETE_ACTION;
    }
    class DataView<TItem extends collMOD.ICollectionItem> extends collMOD.BaseCollection<TItem> {
        private _dataSource;
        private _fn_filter;
        private _fn_sort;
        private _fn_itemsProvider;
        private _isDSFilling;
        private _isAddingNew;
        private _objId;
        constructor(options: {
            dataSource: collMOD.BaseCollection<TItem>;
            fn_filter?: (item: TItem) => boolean;
            fn_sort?: (item1: TItem, item2: TItem) => number;
            fn_itemsProvider?: (ds: collMOD.BaseCollection<TItem>) => TItem[];
        });
        protected _getEventNames(): string[];
        addOnViewRefreshed(fn: TEventHandler<DataView<TItem>, any>, nmspace?: string): void;
        removeOnViewRefreshed(nmspace?: string): void;
        protected _filterForPaging(items: TItem[]): TItem[];
        protected _onViewRefreshed(args: {}): void;
        protected _clear(isPageChanged: boolean): void;
        protected _refresh(isPageChanged: boolean): void;
        protected _fillItems(data: {
            items: TItem[];
            isPageChanged: boolean;
            clear: boolean;
            isAppend: boolean;
        }): TItem[];
        protected _onDSCollectionChanged(sender: any, args: collMOD.ICollChangedArgs<TItem>): void;
        protected _onDSFill(sender: any, args: collMOD.ICollFillArgs<TItem>): void;
        protected _onDSStatusChanged(sender: any, args: collMOD.ICollItemStatusArgs<TItem>): void;
        protected _bindDS(): void;
        protected _unbindDS(): void;
        protected _onCurrentChanging(newCurrent: TItem): void;
        protected _onPageChanged(): void;
        _getStrValue(val: any, fieldInfo: IFieldInfo): string;
        _getErrors(item: TItem): collMOD.IErrors;
        getItemsWithErrors(): TItem[];
        appendItems(items: TItem[]): TItem[];
        addNew(): TItem;
        removeItem(item: TItem): void;
        sortLocal(fieldNames: string[], sortOrder: collMOD.SORT_ORDER): IPromise<any>;
        getIsHasErrors(): boolean;
        clear(): void;
        refresh(): void;
        destroy(): void;
        dataSource: collMOD.BaseCollection<TItem>;
        isPagingEnabled: boolean;
        permissions: collMOD.IPermissions;
        fn_filter: (item: TItem) => boolean;
        fn_sort: (item1: TItem, item2: TItem) => number;
        fn_itemsProvider: (ds: collMOD.BaseCollection<TItem>) => TItem[];
    }
    class TDataView extends DataView<collMOD.ICollectionItem> {
    }
    class ChildDataView<TItem extends IEntityItem> extends DataView<TItem> {
        private _parentItem;
        private _refreshTimeout;
        private _association;
        constructor(options: {
            association: Association;
            fn_filter?: (item: TItem) => boolean;
            fn_sort?: (item1: TItem, item2: TItem) => number;
        });
        protected _refresh(isPageChanged: boolean): void;
        destroy(): void;
        toString(): string;
        parentItem: IEntityItem;
        association: Association;
    }
    class TChildDataView extends ChildDataView<IEntityItem> {
    }
    class BaseComplexProperty extends RIAPP.BaseObject implements RIAPP.IErrorNotification {
        private _name;
        constructor(name: string);
        _getFullPath(path: string): string;
        getName(): string;
        setValue(fullName: string, value: any): void;
        getValue(fullName: string): any;
        getFieldInfo(): IFieldInfo;
        getProperties(): IFieldInfo[];
        getFullPath(name: string): string;
        getEntity(): EntityAspect<IEntityItem, DbContext>;
        getPropertyByName(name: string): IFieldInfo;
        getIsHasErrors(): boolean;
        addOnErrorsChanged(fn: RIAPP.TEventHandler<EntityAspect<IEntityItem, DbContext>, any>, nmspace?: string, context?: any): void;
        removeOnErrorsChanged(nmspace?: string): void;
        getFieldErrors(fieldName: string): RIAPP.IValidationInfo[];
        getAllErrors(): RIAPP.IValidationInfo[];
        getIErrorNotification(): RIAPP.IErrorNotification;
    }
    class RootComplexProperty extends BaseComplexProperty {
        private _entity;
        constructor(name: string, owner: EntityAspect<IEntityItem, DbContext>);
        _getFullPath(path: string): string;
        setValue(fullName: string, value: any): void;
        getValue(fullName: string): any;
        getFieldInfo(): IFieldInfo;
        getProperties(): IFieldInfo[];
        getEntity(): EntityAspect<IEntityItem, DbContext>;
        getFullPath(name: string): string;
    }
    class ChildComplexProperty extends BaseComplexProperty {
        private _parent;
        constructor(name: string, parent: BaseComplexProperty);
        _getFullPath(path: string): string;
        setValue(fullName: string, value: any): void;
        getValue(fullName: string): any;
        getFieldInfo(): IFieldInfo;
        getProperties(): IFieldInfo[];
        getParent(): BaseComplexProperty;
        getRootProperty(): RootComplexProperty;
        getFullPath(name: string): string;
        getEntity(): EntityAspect<IEntityItem, DbContext>;
    }
}
declare namespace RIAPP {
    import utilsMOD = RIAPP.MOD.utils;
    import bindMOD = RIAPP.MOD.binding;
    import elviewMOD = RIAPP.MOD.baseElView;
    import contentMOD = RIAPP.MOD.baseContent;
    interface IInternalAppMethods {
        getElView(el: HTMLElement): elviewMOD.BaseElView;
        createElementView(el: HTMLElement, view_info: {
            name: string;
            options: any;
        }): elviewMOD.BaseElView;
        setElView(el: HTMLElement, view?: elviewMOD.BaseElView): void;
        bindTemplateElements(templateEl: HTMLElement): utilsMOD.LifeTimeScope;
        bindElements(scope: {
            querySelectorAll: (selectors: string) => NodeList;
        }, dctx: any, isDataFormBind: boolean, isInsideTemplate: boolean): utilsMOD.LifeTimeScope;
        getContentType(options: contentMOD.IContentOptions): contentMOD.IContentType;
        addContentFactory(factory: contentMOD.TFactoryGetter): void;
    }
    class Application extends RIAPP.BaseObject implements IExports {
        private static _newInstanceNum;
        private _DATA_BIND_SELECTOR;
        private _DATA_VIEW_SELECTOR;
        private _contentFactory;
        private _objLifeTime;
        private _ELV_STORE_KEY;
        private _elViewStore;
        private _nextElViewStoreKey;
        private _userCode;
        private _viewModels;
        private _app_name;
        private _modules;
        private _objId;
        private _objMaps;
        private _exports;
        protected _options: IAppOptions;
        private _internal;
        constructor(options?: IAppOptions);
        protected _getEventNames(): string[];
        private _cleanUpObjMaps();
        private _initModules();
        private _initUserModules(user_modules);
        private _destroyBindings();
        private _setUpBindings();
        private _getElementViewInfo(el);
        handleError(error: any, source: any): boolean;
        private _getElViewType(name);
        private _checkBindableElement(el);
        private _getAllBindableHtmlElements(scope);
        private _getElView(el);
        private _createElementView(el, view_info);
        private _setElView(el, view?);
        private _bindTemplateElements(templateEl);
        private _bindElements(scope, dctx, isDataFormBind, isInsideTemplate);
        _getInternal(): IInternalAppMethods;
        addOnStartUp(fn: TEventHandler<Application, any>, nmspace?: string, context?: BaseObject): void;
        removeOnStartUp(nmspace?: string): void;
        getExports(): IIndexer<any>;
        registerElView(name: string, vw_type: elviewMOD.IViewType): void;
        getElementView(el: HTMLElement): elviewMOD.BaseElView;
        bind(opts: bindMOD.IBindingOptions): bindMOD.Binding;
        registerConverter(name: string, obj: RIAPP.IConverter): void;
        getConverter(name: string): RIAPP.IConverter;
        registerType(name: string, obj: any): void;
        getType(name: string): any;
        registerObject(name: string, obj: any): void;
        getObject(name: string): any;
        onStartUp(): void;
        startUp(fn_sandbox?: (app: Application) => void): void;
        loadTemplates(url: string): void;
        loadTemplatesAsync(fn_loader: () => IPromise<string>): void;
        registerTemplateLoader(name: string, fn_loader: () => IPromise<string>): void;
        getTemplateLoader(name: string): () => IPromise<string>;
        registerTemplateGroup(name: string, group: {
            fn_loader?: () => IPromise<string>;
            url?: string;
            names: string[];
        }): void;
        destroy(): void;
        toString(): string;
        uniqueID: string;
        options: IAppOptions;
        contentFactory: contentMOD.IContentFactory;
        appName: string;
        appRoot: {
            querySelectorAll: (selectors: string) => NodeList;
        };
        modules: IIndexer<any>;
        global: Global;
        UC: any;
        VM: any;
        app: Application;
    }
}
