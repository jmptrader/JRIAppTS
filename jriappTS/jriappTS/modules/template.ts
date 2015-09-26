namespace RIAPP.MOD.template {
    import constsMOD = RIAPP.consts;
    import utilsMOD = RIAPP.MOD.utils;
    import bindMOD = RIAPP.MOD.binding;
    import elviewMOD = RIAPP.MOD.baseElView;
    import mvvmMOD = RIAPP.MOD.mvvm;

    export var css = {
        templateContainer: 'ria-template-container'
    };
    var utils: utilsMOD.Utils, global = RIAPP.global;
    global.addOnInitialize((s, args) => {
        utils = s.utils;
    });

    template._isTemplateElView = (obj: any) => {
        return !!obj && obj instanceof TemplateElView;
    };
    var PROP_NAME = {
        dataContext: 'dataContext',
        templateID: 'templateID',
        template: 'template',
        isEnabled: 'isEnabled'
    };

    export interface ITemplateEvents {
        templateLoading(template: Template): void;
        templateLoaded(template: Template): void;
        templateUnLoading(template: Template): void;
    }

    export interface ITemplateOptions {
        app: RIAPP.Application;
        templateID: string;
        dataContext?: any;
        templEvents?: ITemplateEvents;
    }

    export class Template extends RIAPP.BaseObject {
        private _el: HTMLElement;
        private _lfTime: utilsMOD.LifeTimeScope;
        private _templElView: TemplateElView;
        private _promise: RIAPP.IDeferred<HTMLElement>;
        private _busyTimeOut: number;
        private _loadedElem: HTMLElement;
        private _options: ITemplateOptions;

        constructor(options: ITemplateOptions) {
            super();
            options = utils.extend(false,
                {
                    app: null,
                    templateID: null,
                    dataContext: null,
                    templEvents: null,
                    isDisabled: false
                }, options);
            this._options = options;
            this._loadedElem = null;
            this._lfTime = null;
            this._templElView = undefined;
            this._promise = null;
            this._busyTimeOut = null;
            this._el = global.document.createElement("div");
            this._el.className = css.templateContainer;
            if (!!options.templateID)
                this._loadTemplate();
        }
        private _getBindings(): bindMOD.Binding[] {
            if (!this._lfTime)
                return [];
            var arr = this._lfTime.getObjs(), res: bindMOD.Binding[] = [];
            for (var i = 0, len = arr.length; i < len; i += 1) {
                if (bindMOD._isBinding(arr[i]))
                    res.push(<bindMOD.Binding>arr[i]);
            }
            return res;
        }
        private _getElViews(): elviewMOD.BaseElView[] {
            if (!this._lfTime)
                return [];
            var arr = this._lfTime.getObjs(), res: elviewMOD.BaseElView[] = [];
            for (var i = 0, len = arr.length; i < len; i += 1) {
                if (elviewMOD._isElView(arr[i]))
                    res.push(<elviewMOD.BaseElView>arr[i]);
            }
            return res;
        }
        private _getTemplateElView(): TemplateElView {
            if (!this._lfTime || this._templElView === null)
                return null;
            if (!!this._templElView)
                return this._templElView;
            var res: any = null, arr = this._getElViews();
            for (var i = 0, j = arr.length; i < j; i += 1) {
                if (template._isTemplateElView(arr[i])) {
                    res = arr[i];
                    break;
                }
            }
            this._templElView = res;
            return res;
        }
        private _getTemplateEvents(): ITemplateEvents[] {
            var tel_vw = this._getTemplateElView(), ev = this._options.templEvents;
            if (!!tel_vw && !!ev)
                return [tel_vw, ev];
            else if (!!tel_vw)
                return [tel_vw];
            else if (!!ev)
                return [ev];
            else
                return [];
        }
        //returns a deferred which resolves with loaded template DOM element
        private _loadTemplateElAsync(name: string): RIAPP.IDeferred<HTMLElement> {
            var self = this, fn_loader = this.app.getTemplateLoader(name),
                deferred: RIAPP.IDeferred<HTMLElement> = utils.createDeferred();
            if (!!fn_loader) {
                fn_loader().then(function (html: string) {
                    var tmpDiv = global.document.createElement('div');
                    tmpDiv.innerHTML = html;
                    var el = <HTMLElement>tmpDiv.firstElementChild;
                    deferred.resolve(el);
                }, function (err) {
                    deferred.reject(new Error(utils.format(RIAPP.ERRS.ERR_TEMPLATE_ID_INVALID, self.templateID)));
                });
            }
            else {
                deferred.reject(new Error(utils.format(RIAPP.ERRS.ERR_TEMPLATE_ID_INVALID, self.templateID)));
            }
            return deferred;
        }
        private _appendIsBusy(el: HTMLElement) {
            var self = this;
            this._busyTimeOut = setTimeout(function () {
                if (!self._busyTimeOut || self._isDestroyCalled)
                    return;
                self._busyTimeOut = null;
                var vw_inst = new elviewMOD.BusyElView(self.app, el, { img: constsMOD.LOADER_GIF.SMALL, delay: 0 });
                vw_inst.isBusy = true;
            }, 400);
        }
        private _removeIsBusy(el: HTMLElement) {
            var self = this;
            if (!!self._busyTimeOut) {
                clearTimeout(self._busyTimeOut);
                self._busyTimeOut = null;
            }
            var vw = this.app._getInternal().getElView(el);
            if (!!vw && (vw instanceof elviewMOD.BusyElView)) {
                vw.destroy();
            }
        }
        private _loadTemplate() {
            var self = this, id = self.templateID,
                deferred: RIAPP.IDeferred<HTMLElement>;
            try {
                if (!!self._promise) {
                    //cancel previous load
                    self._promise.reject('cancel');
                    self._promise = null;
                }
                if (!!self._loadedElem)
                    self._unloadTemplate();

                if (!!id) {
                    deferred = self._loadTemplateElAsync(id);
                    self._waitLoad(deferred, utils.isDeferredPending(deferred));
                }
            } catch (ex) {
                self.handleError(ex, self);
                RIAPP.throwDummy(ex);
            }
        }
        private _waitLoad(loadPromise: RIAPP.IThenable<HTMLElement>, asyncLoad: boolean) {
            var self = this, deferred: RIAPP.IDeferred<HTMLElement>, tmpDiv: HTMLElement = self.el;
            self._promise = deferred = utils.createDeferred();
            loadPromise.then((loadedEl) => {
                deferred.resolve(loadedEl);
            }, (err) => {
                deferred.reject(err);
            });

            if (asyncLoad) {
                self._appendIsBusy(tmpDiv);
                deferred.then(() => { self._removeIsBusy(tmpDiv) }, (arg) => { if (arg == 'cancel') { self._removeIsBusy(tmpDiv); } });
            }
            deferred.then((loadedEl) => { self._onLoadOK(tmpDiv, loadedEl); }, (arg) => { self._onLoadFail(arg); });
        }
        private _onLoadOK(div: HTMLElement, loadedEl: HTMLElement) {
            var self = this, i: number, tevents: ITemplateEvents[], len: number;

            if (self._isDestroyCalled)
                return;
            try {
                self._promise = null;
                if (!!self._loadedElem && !loadedEl) {
                    self._unloadTemplate();
                    return;
                }
                self._loadedElem = loadedEl;
                tevents = self._getTemplateEvents();
                len = tevents.length;
                for (i = 0; i < len; i += 1) {
                    tevents[i].templateLoading(self);
                }
                div.appendChild(loadedEl);
                self._lfTime = self.app._getInternal().bindTemplateElements(loadedEl);
                self._updateBindingSource();
                tevents = self._getTemplateEvents();
                len = tevents.length;
                for (i = 0; i < len; i += 1) {
                    tevents[i].templateLoaded(self);
                }
            } catch (ex) {
                self.handleError(ex, self);
                RIAPP.throwDummy(ex);
            }
        }
        private _onLoadFail(arg: any) {
            var self = this;
            if (self._isDestroyCalled)
                return;
            self._promise = null;
            if (arg == 'cancel') {
                return;
            }
            var ex: any;
            if (!!arg) {
                if (!!arg.message)
                    ex = arg;
                else if (!!arg.statusText) {
                    ex = new Error(arg.statusText);
                }
                else if (utils.check.isString(arg)) {
                    ex = new Error(arg);
                }
            }
            if (!ex)
                ex = new Error(utils.format(RIAPP.ERRS.ERR_TEMPLATE_ID_INVALID, self.templateID));
            self.handleError(ex, self);
        }
        private _updateBindingSource() {
            var i: number, len: number, binding: bindMOD.Binding, bindings = this._getBindings();
            for (i = 0, len = bindings.length; i < len; i += 1) {
                binding = bindings[i];
                if (!binding.isSourceFixed)
                    binding.source = this.dataContext;
            }
        }
        private _unloadTemplate() {
            var i: number, tevents = this._getTemplateEvents(), len: number = tevents.length;
            try {
                if (!!this._el) {
                    for (i = 0; i < len; i += 1) {
                        tevents[i].templateUnLoading(this);
                    }
                }
            }
            finally {
                this._cleanUp();
            }
        }
        private _cleanUp() {
            if (!!this._lfTime) {
                this._lfTime.destroy();
                this._lfTime = null;
            }
            this._templElView = null;

            if (!!this._loadedElem) {
                //remove with jQuery method to ensure proper cleanUp
                global.$(this._loadedElem).remove();
            }
            this._loadedElem = null;

            if (this._isDestroyCalled && !!this._el) {
                //remove with jQuery method to ensure proper cleanUp
                global.$(this._el).remove();
                this._el = null;
            }
        }
        handleError(error: any, source: any): boolean {
            var isHandled = super.handleError(error, source);
            if (!isHandled) {
                return this.app.handleError(error, source);
            }
            return isHandled;
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            if (!!this._busyTimeOut) {
                clearTimeout(this._busyTimeOut);
                this._busyTimeOut = null;
            }
            if (!!this._promise) {
                this._promise.reject('cancel');
                this._promise = null;
            }
            this._unloadTemplate();
            this._options = <any>{};
            super.destroy();
        }
        //find elements which has specific data-name attribute value
        //returns plain array of elements, or empty array
        findElByDataName(name: string): HTMLElement[] {
            var $foundEl = global.$(this._el).find(['*[', constsMOD.DATA_ATTR.DATA_NAME, '="', name, '"]'].join(''));
            return $foundEl.toArray();
        }
        findElViewsByDataName(name: string) {
            //first return elements with the needed data attributes those are inside template
            var self = this, els = this.findElByDataName(name), res: elviewMOD.BaseElView[] = [], appMethods: IInternalAppMethods = self.app._getInternal();
            els.forEach(function (el) {
                var elView = appMethods.getElView(el);
                if (!!elView)
                    res.push(elView);
            });
            return res;
        }
        toString() {
            return 'Template';
        }
        get loadedElem() {
            return this._loadedElem;
        }
        get dataContext() { return this._options.dataContext; }
        set dataContext(v) {
            if (this.dataContext !== v) {
                this._options.dataContext = v;
                this.raisePropertyChanged(PROP_NAME.dataContext);
                this._updateBindingSource();
            }
        }
        get templateID() { return this._options.templateID; }
        set templateID(v) {
            if (this.templateID !== v) {
                this._options.templateID = v;
                this._loadTemplate();
                this.raisePropertyChanged(PROP_NAME.templateID);
            }
        }
        get el() { return this._el; }
        get app() { return this._options.app; }
    }

    //for strongly typed parameters
    export class TemplateCommand extends mvvmMOD.Command {
        constructor(fn_action: (sender: TemplateElView, param: { template: Template; isLoaded: boolean; }) => void, thisObj: any, fn_canExecute: (sender: TemplateElView, param: { template: template.Template; isLoaded: boolean; }) => boolean) {
            super(fn_action, thisObj, fn_canExecute);
        }
    }

    export class TemplateElView extends elviewMOD.CommandElView implements ITemplateEvents {
        private _template: Template;
        private _isEnabled: boolean;
        constructor(app: RIAPP.Application, el: HTMLElement, options: elviewMOD.IViewOptions) {
            this._template = null;
            this._isEnabled = true;
            super(app, el, options);
        }
        templateLoading(template: Template): void {
            //noop
        }
        templateLoaded(template: Template): void {
            var self = this, p = self._commandParam;
            try {
                self._template = template;
                self._commandParam = { template: template, isLoaded: true };
                self.invokeCommand();
                self._commandParam = p;
                this.raisePropertyChanged(PROP_NAME.template);
            }
            catch (ex) {
                this.handleError(ex, this);
                RIAPP.throwDummy(ex);
            }
        }
        templateUnLoading(template: Template): void {
            var self = this, p = self._commandParam;
            try {
                self._commandParam = { template: template, isLoaded: false };
                self.invokeCommand();
            }
            catch (ex) {
                this.handleError(ex, this);
            }
            finally {
                self._commandParam = p;
                self._template = null;
            }
            this.raisePropertyChanged(PROP_NAME.template);
        }
        toString() {
            return 'TemplateElView';
        }
        get isEnabled() { return this._isEnabled; }
        set isEnabled(v: boolean) {
            if (this._isEnabled !== v) {
                this._isEnabled = v;
                this.raisePropertyChanged(PROP_NAME.isEnabled);
            }
        }
        get template() {
            return this._template;
        }
    };

    global.registerType('Template', Template);
    global.registerElView('template', TemplateElView);
    _isModuleLoaded = true;
}
