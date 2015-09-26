namespace RIAPP {
    import constsMOD = RIAPP.consts;

    export const enum BindTo {
        Source = 0, Target = 1
    }
    export type TEventHandler<T,U> = (sender: T, args:U) => void;
    export type TErrorArgs = { error: any; source: any; isHandled: boolean; };
    export type TErrorHandler = (sender:any, args: TErrorArgs) => void;
    export type TPropChangedHandler = (sender: any, args: { property: string; }) => void;

    export interface IIndexer<T> {
        [property: string]: T;
    }
    export interface ICoreModule {
        _isModuleLoaded: boolean;
        _initModule: (app: Application) => void;
    }
    export interface IBaseObject {
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

    export interface IThenable<T> {
        then(onFullfilled: (res?: T) => any, onRejected?: (res: any) => any): IPromise<any>;
    }

    export interface IPromise<T> extends IThenable<T> {
        always(...alwaysCallbacks: { (res: any): void; }[]): IPromise<any>;
        done(...doneCallbacks: { (res: T): void; }[]): IPromise<any>;
        fail(...failCallbacks: { (res: any): void; }[]): IPromise<any>;
        then(onFullfilled: (res: T) => any, onRejected?: (res: any) => any): IPromise<any>;
    }

    export interface IVoidPromise extends IThenable<any> {
        always(...alwaysCallbacks: { (res: any): void; }[]): IPromise<any>;
        done(...doneCallbacks: { (): void; }[]): IPromise<any>;
        fail(...failCallbacks: { (res: any): void; }[]): IPromise<any>;
        then(onFullfilled: () => any, onRejected?: (res: any) => any): IPromise<any>;
    }

    export interface IDeferred<T> extends IPromise<T> {
        reject(arg?: any): IPromise<any>;
        resolve(arg?: T): IPromise<any>;
        promise(): IPromise<T>;
        state(): string;
    }

    export interface IAnimation {
        beforeShow(el: HTMLElement): void;
        show(onEnd: () => void): void;
        beforeHide(el: HTMLElement): void;
        hide(onEnd: () => void): void;
        stop(): void;
    }

    export interface IEditable {
        beginEdit(): boolean;
        endEdit(): boolean;
        cancelEdit(): boolean;
        isEditing: boolean;
    }

    export interface ISubmittable {
        submitChanges(): IVoidPromise;
        rejectChanges(): void;
        isCanSubmit: boolean;
    }

    export interface IValidationInfo {
        fieldName: string;
        errors: string[];
    }

    export interface IErrorNotification {
        getIsHasErrors(): boolean;
        addOnErrorsChanged(fn: RIAPP.TEventHandler<any,any>, nmspace?: string, context?: any): void;
        removeOnErrorsChanged(nmspace?: string): void;
        getFieldErrors(fieldName: string): IValidationInfo[];
        getAllErrors(): IValidationInfo[];
        getIErrorNotification(): IErrorNotification;
    }

    export interface IDatepicker {
        datepickerRegion: string;
        dateFormat: string;
        attachTo($el: any, options?: any):void;
        detachFrom($el: any):void;
        parseDate(str: string): Date;
        formatDate(date: Date): string;
    }

    export interface IConverter {
        convertToSource(val: any, param: any, dataContext: any): any;
        convertToTarget(val: any, param: any, dataContext: any): any;
    }

    export interface ISelectable {
        getContainerEl(): HTMLElement;
        getUniqueID(): string;
        onKeyDown(key: number, event: Event): void;
        onKeyUp(key: number, event: Event): void;
    }

    export interface ISelectableProvider {
        getISelectable(): ISelectable;
    }

    export interface IExports {
        getExports(): IIndexer<any>;
    }

    export interface IGroupInfo {
        fn_loader?: () => IPromise<string>;
        url?: string;
        names: string[];
        app?: Application;
        promise?: IPromise<string>;
    }

    export interface ITemplateLoaderInfo {
        fn_loader: () => IPromise<string>;
        groupName?: string;
    }

    export interface IUnResolvedBindingArgs {
        bindTo: BindTo;
        root: any;
        path: string;
        propName: string;
    }


    export interface IBindableElement {
        el: HTMLElement;
        dataView: string;
        dataForm: string;
        expressions: string[];
    }

    export interface IFieldInfo {
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

    export interface IAppOptions {
        application_name?: string;
        user_modules?: { name: string; initFn: (app: Application) => any; }[];
        application_root?: { querySelectorAll: (selectors: string) => NodeList; };
    }
}