/// <reference path="..\thirdparty\jquery.d.ts" />
/// <reference path="..\thirdparty\jquery.d.ts" />
/// <reference path="..\thirdparty\moment.d.ts" />
/// <reference path="..\thirdparty\qtip2.d.ts" />
/// <reference path="..\jriapp_strings.d.ts"/>
/// <reference path="consts.ts"/>
/// <reference path="interface.ts"/>
/// <reference path="core_modules.ts"/>
/// <reference path="baseutils.ts"/>
/// <reference path="baseobj.ts"/>
/// <reference path="globalobj.ts"/>
/// <reference path="..\modules\utils.ts"/>
/// <reference path="..\modules\errors.ts"/>
/// <reference path="..\modules\converter.ts"/>
/// <reference path="..\modules\defaults.ts"/>
/// <reference path="..\modules\parser.ts"/>
/// <reference path="..\modules\mvvm.ts"/>
/// <reference path="..\modules\baseElView.ts"/>
/// <reference path="..\modules\binding.ts"/>
/// <reference path="..\modules\template.ts"/>
/// <reference path="..\modules\baseContent.ts"/>
//*** the rest are optional modules, which can be removed if not needed ***
/// <reference path="..\modules\collection.ts"/>
/// <reference path="..\modules\dataform.ts"/>
/// <reference path="..\modules\dynacontent.ts"/>
/// <reference path="..\modules\datepicker.ts"/>
/// <reference path="..\modules\tabs.ts"/>
/// <reference path="..\modules\listbox.ts"/>
/// <reference path="..\modules\datadialog.ts"/>
/// <reference path="..\modules\datagrid.ts"/>
/// <reference path="..\modules\pager.ts"/>
/// <reference path="..\modules\stackpanel.ts"/>
/// <reference path="..\modules\db.ts"/>
namespace RIAPP {
    import constsMOD = RIAPP.consts;
    import utilsMOD = RIAPP.MOD.utils;
    import bindMOD = RIAPP.MOD.binding;
    import elviewMOD = RIAPP.MOD.baseElView;
    import contentMOD = RIAPP.MOD.baseContent;
    import formMOD = RIAPP.MOD.dataform;
    import templMOD = RIAPP.MOD.template;

    //ALL CORE MODULES are LOADED, INITIALIZE THE Global
    global._getInternal().initialize();
    //local variable for optimization
    var utils = global.utils, parser = global.parser;

    var APP_EVENTS = {
        startup: 'startup'
    };

    export interface IInternalAppMethods {
        getElView(el: HTMLElement): elviewMOD.BaseElView;
        createElementView(el: HTMLElement, view_info: { name: string; options: any; }): elviewMOD.BaseElView;
        setElView(el: HTMLElement, view?: elviewMOD.BaseElView): void;
        bindTemplateElements(templateEl: HTMLElement): utilsMOD.LifeTimeScope;
        bindElements(scope: { querySelectorAll: (selectors: string) => NodeList; }, dctx: any, isDataFormBind: boolean, isInsideTemplate: boolean): utilsMOD.LifeTimeScope;
        getContentType(options: contentMOD.IContentOptions): contentMOD.IContentType;
        addContentFactory(factory: contentMOD.TFactoryGetter): void;
    }

    export class Application extends RIAPP.BaseObject implements IExports {
        private static _newInstanceNum = 1;
        private get _DATA_BIND_SELECTOR() { return ['*[', constsMOD.DATA_ATTR.DATA_BIND, ']'].join(''); }
        private get _DATA_VIEW_SELECTOR() { return ['*[', constsMOD.DATA_ATTR.DATA_VIEW, ']'].join(''); }
        private _contentFactory: contentMOD.FactoryList;
        private _objLifeTime: utilsMOD.LifeTimeScope;
        private _ELV_STORE_KEY: string;
        private _elViewStore: any;
        private _nextElViewStoreKey: number;
        private _userCode: any;
        private _viewModels: any;
        private _app_name: string;
        private _modules: IIndexer<any>;
        private _objId: string;
        private _objMaps: any[];
        private _exports: IIndexer<any>; 
        protected _options: IAppOptions;
        private _internal: IInternalAppMethods;
        
        constructor(options?: IAppOptions) {
            super();
            var self = this, app_name = 'default', user_modules: { name: string; initFn: (app: Application) => any; }[] = [];
            this._options = null;
            if (!!options) {
                this._options = options;
                if (!!options.application_name)
                    app_name = options.application_name;
                if (!!options.user_modules)
                    user_modules = options.user_modules;
            }
            if (!!global.findApp(app_name))
                throw new Error(utils.format(RIAPP.ERRS.ERR_APP_NAME_NOT_UNIQUE, app_name));
            this._app_name = app_name;
            this._objId = 'app:' + baseUtils.getNewID();
            //lifetime object to store references to the bindings and element views created by this application
            this._objLifeTime = null;
            this._ELV_STORE_KEY = constsMOD.DATA_ATTR.EL_VIEW_KEY + Application._newInstanceNum;
            Application._newInstanceNum += 1;
            this._contentFactory = new contentMOD.FactoryList(this);
            this._objMaps = [];
            //registered exported types
            this._exports = {};
            //loaded  moodules
            this._modules = {};
            //each Element view created by application stored in this hash map
            //it keeps them alive until they are destroyed
            this._elViewStore = {};
            //used to create sequential keys to store new element views
            this._nextElViewStoreKey = 0;
            this._userCode = {};
            this._viewModels = {};
            this._internal = {
                getElView: (el: HTMLElement) => {
                    return self._getElView(el);
                },
                createElementView: (el: HTMLElement, view_info: { name: string; options: any; }) => {
                    return self._createElementView(el, view_info);
                },
                setElView: (el: HTMLElement, view?: elviewMOD.BaseElView) => {
                    self._setElView(el, view);
                },
                bindTemplateElements: (templateEl: HTMLElement) => {
                    return self._bindTemplateElements(templateEl);
                },
                bindElements: (scope: { querySelectorAll: (selectors: string) => NodeList; }, dctx: any, isDataFormBind: boolean, isInsideTemplate: boolean) => {
                    return self._bindElements(scope, dctx, isDataFormBind, isInsideTemplate);
                },
                getContentType: (options: contentMOD.IContentOptions) => {
                    return self._contentFactory.getContentType(options);
                },
                addContentFactory: (factory: contentMOD.TFactoryGetter) => {
                    self._contentFactory.addFactory(factory);
                }
            };
            this._initModules();
            this._initUserModules(user_modules);
            global._getInternal().registerApp(this);
        }
        protected _getEventNames() {
            var base_events = super._getEventNames();
            return [APP_EVENTS.startup].concat(base_events);
        }
        private _cleanUpObjMaps() {
            var self = this;
            this._objMaps.forEach((objMap) => {
                utils.forEachProp(objMap, (name) => {
                    var obj = objMap[name];
                    if (obj instanceof BaseObject) {
                        if (!(<BaseObject>obj).getIsDestroyed()) {
                            (<BaseObject>obj).removeNSHandlers(self.uniqueID);
                        }
                    }
                });
            });
            this._objMaps = [];
        }
        private _initModules() {
            //initialize core modules
            var self = this, modules: IIndexer<ICoreModule> = <any>RIAPP.MOD, moduleNames = Object.keys(RIAPP.MOD);
            moduleNames.forEach((mod_name) => {
                var mod = modules[mod_name];
                if (!!mod._isModuleLoaded && !!mod._initModule) {
                    mod._initModule(self);
                }
            });
        }
        private _initUserModules(user_modules: { name: string; initFn: (app: Application) => any; }[]) {
            var self = this;
            user_modules.forEach((mod) => {
                self._modules[mod.name] = mod.initFn(self);
            });
        }
        private _destroyBindings() {
            if (!!this._objLifeTime) {
                this._objLifeTime.destroy();
                this._objLifeTime = null;
            }
        }
        private _setUpBindings() {
            var defScope = this.appRoot, defaultDataCtxt = this;
            this._destroyBindings();
            this._objLifeTime = this._bindElements(defScope, defaultDataCtxt, false, false);
        }
        private _getElementViewInfo(el: HTMLElement) {
            var view_name: string = null, vw_options: any = null, attr: string, data_view_op_arr: any[], data_view_op: any;
            if (el.hasAttribute(constsMOD.DATA_ATTR.DATA_VIEW)) {
                attr = el.getAttribute(constsMOD.DATA_ATTR.DATA_VIEW);
                data_view_op_arr = parser.parseOptions(attr);
                if (!!data_view_op_arr && data_view_op_arr.length > 0) {
                    data_view_op = data_view_op_arr[0];
                    if (!!data_view_op.name && data_view_op.name != 'default') {
                        view_name = data_view_op.name;
                    }
                    vw_options = data_view_op.options;
                }
            }
            return { name: view_name, options: vw_options };
        }
        handleError(error: any, source: any): boolean {
            if (RIAPP.checkIsDummy(error)) {
                return true;
            }
            var isHandled = super.handleError(error, source);
            if (!isHandled) {
                return global.handleError(error, source);
            }
            return isHandled;
        }
        private _getElViewType(name: string): elviewMOD.IViewType {
            var name2 = 'elvws.' + name, global = this.global;
            var res = global._getInternal().getObject(this, name2);
            if (!res) {
                res = global._getInternal().getObject(global, name2);
            }
            return res;
        }
        private _checkBindableElement(el: HTMLElement): IBindableElement {
            var val: string, allAttrs = el.attributes, attr: Attr, res: IBindableElement = { el: el, dataView: null, dataForm: null, expressions: [] };
            for (var i = 0, n = allAttrs.length; i < n; i++) {
                attr = allAttrs[i];
                if (utils.str.startsWith(attr.name, constsMOD.DATA_ATTR.DATA_BIND)) {
                    val = attr.value.trim();
                    if (!val) {
                        throw new Error(utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, attr.name, "empty"));
                    }
                    if (val[0] != "{" && val[val.length - 1] != "}")
                        val = "{" + val + "}";
                    res.expressions.push(val);
                }
                if (utils.str.startsWith(attr.name, constsMOD.DATA_ATTR.DATA_FORM)) {
                    res.dataForm = attr.value.trim();
                }
                if (utils.str.startsWith(attr.name, constsMOD.DATA_ATTR.DATA_VIEW)) {
                    res.dataView = attr.value.trim();
                }
            }
            if (!!res.dataView || res.expressions.length > 0)
                return res;
            else
                return null;
        }
        private _getAllBindableHtmlElements(scope: { querySelectorAll: (selectors: string) => NodeList; }): IBindableElement[] {
            var self = this, result: IBindableElement[] = [], selectedElem: HTMLElement[] = ArrayHelper.fromList(scope.querySelectorAll("*"));
            selectedElem.forEach(function (el) {
                var res = self._checkBindableElement(el);
                if (!!res)
                    result.push(res);
            });

            return result;
        }
        //get element view associated with HTML element(if any)
        private _getElView(el: HTMLElement): elviewMOD.BaseElView {
            var storeID = el.getAttribute(this._ELV_STORE_KEY);
            if (!!storeID) {
                return this._elViewStore[storeID];
            }
            return null;
        }
        private _createElementView(el: HTMLElement, view_info: { name: string; options: any; }): elviewMOD.BaseElView {
            var viewType: elviewMOD.IViewType, elView: elviewMOD.BaseElView;

            if (!!view_info.name) {
                viewType = this._getElViewType(view_info.name);
                if (!viewType)
                    throw new Error(utils.format(RIAPP.ERRS.ERR_ELVIEW_NOT_REGISTERED, view_info.name));
            }
            if (!viewType) {
                var nodeNm = el.nodeName.toLowerCase(), attrType: string;
                switch (nodeNm) {
                    case 'input':
                        {
                            attrType = el.getAttribute('type');
                            nodeNm = nodeNm + ':' + attrType;
                            viewType = this._getElViewType(nodeNm);
                        }
                        break;
                    default:
                        viewType = this._getElViewType(nodeNm);
                }

                if (!viewType)
                    throw new Error(utils.format(RIAPP.ERRS.ERR_ELVIEW_NOT_CREATED, nodeNm));
            }

            elView = new viewType(this, el, view_info.options || {});
            return elView;
        }
        //store association of HTML element with its element View
        private _setElView(el: HTMLElement, view?: elviewMOD.BaseElView): void {
            var storeID = el.getAttribute(this._ELV_STORE_KEY);
            if (!storeID) {
                if (!view)
                    return;
                storeID = 's_' + this._nextElViewStoreKey;
                this._nextElViewStoreKey += 1;
                el.setAttribute(this._ELV_STORE_KEY, storeID);
                this._elViewStore[storeID] = view;
            }
            else {
                if (!view) {
                    el.removeAttribute(this._ELV_STORE_KEY);
                    delete this._elViewStore[storeID];
                }
                else {
                    this._elViewStore[storeID] = view;
                }
            }
        }
        private _bindTemplateElements(templateEl: HTMLElement): utilsMOD.LifeTimeScope {
            var self = this, global = self.global,
                selectedElem: IBindableElement[] = this._getAllBindableHtmlElements(templateEl),
                lftm = new utilsMOD.LifeTimeScope(),
                checks = utils.check,
                DATA_FORM = constsMOD.DATA_ATTR.DATA_FORM, res = self._checkBindableElement(templateEl);
            
            if (res) {
                selectedElem.push(res);
            }

            //mark all dataforms for easier checking that the element is a dataform
            selectedElem.forEach(function (bindElem) {
                if (!bindElem.dataForm && formMOD._isDataForm(bindElem.el)) {
                    bindElem.el.setAttribute(DATA_FORM, 'yes');
                    bindElem.dataForm = 'yes';
                }
            });

            //select all dataforms inside the scope
            var forms = selectedElem.filter((bindElem, index, arr) => { return !!bindElem.dataForm; }).map((bindElem, index, arr) => { return bindElem.el; });

            if (!!res && !!res.dataForm) {
                //in this case process only this element
                selectedElem = [res];
            }

            selectedElem.forEach(function (bindElem) {
                var op: bindMOD.IBindingOptions,
                    binding: bindMOD.Binding,
                    bind_attr: string,
                    temp_opts: any[],
                    elView: elviewMOD.BaseElView,
                    j: number, len: number;
                //if element inside a dataform return
                if (formMOD._isInNestedForm(templateEl, forms, bindElem.el)) {
                    return;
                }

                try {
                    //first create element view
                    elView = self.getElementView(bindElem.el);
                }
                catch (ex) {
                    RIAPP.reThrow(ex, self.handleError(ex, self));
                }
                lftm.addObj(elView);
                formMOD._setIsInsideTemplate(elView);

                //then create databinding if element has data-bind attribute
                bind_attr = bindElem.expressions.join('');
                if (!!bind_attr) {
                    temp_opts = parser.parseOptions(bind_attr);
                    for (j = 0, len = temp_opts.length; j < len; j += 1) {
                        op = bindMOD.getBindingOptions(self, temp_opts[j], elView, null);
                        binding = self.bind(op);
                        op.target = null;
                        lftm.addObj(binding);
                    }
                }
            });

            return lftm;
        }
        private _bindElements(scope: { querySelectorAll: (selectors: string) => NodeList; }, dctx: any, isDataFormBind: boolean, isInsideTemplate: boolean): utilsMOD.LifeTimeScope {
            var self = this, global = self.global,
                checks = utils.check,
                DATA_FORM = constsMOD.DATA_ATTR.DATA_FORM;

            scope = scope || global.document;
            //select all elements with binding attributes
            var selectedElem: IBindableElement[] = this._getAllBindableHtmlElements(scope);
            var lftm = new utilsMOD.LifeTimeScope();
            if (!isDataFormBind) {
                //mark all dataforms for easier checking that the element is a dataform
                selectedElem.forEach(function (bindElem) {
                    if (!bindElem.dataForm && formMOD._isDataForm(bindElem.el)) {
                        bindElem.el.setAttribute(DATA_FORM, 'yes');
                        bindElem.dataForm = 'yes';
                    }
                });
            }

            //select all dataforms inside the scope
            var forms = selectedElem.filter((bindElem, index, arr) =>
            { return !!bindElem.dataForm; }).map((bindElem, index, arr) => { return bindElem.el; });

            selectedElem.forEach(function (bindElem) {
                var bind_attr: string = "",
                    temp_opts: any[],
                    bind_op: bindMOD.IBindingOptions,
                    elView: elviewMOD.BaseElView,
                    i:number, len:number;

                //return if the current element is inside a dataform
                if (formMOD._isInNestedForm(scope, forms, bindElem.el)) {
                    return;
                }

                try {
                    //first create element view
                    elView = self.getElementView(bindElem.el);
                }
                catch (ex) {
                    RIAPP.reThrow(ex, self.handleError(ex, self));
                }
                lftm.addObj(elView);
                if (isInsideTemplate)
                    formMOD._setIsInsideTemplate(elView);
                bind_attr = bindElem.expressions.join('');
                //if it has data-bind attribute then proceed to create binding
                if (!!bind_attr) {
                    temp_opts = parser.parseOptions(bind_attr);
                    for (i = 0, len = temp_opts.length; i < len; i += 1) {
                        bind_op = bindMOD.getBindingOptions(self, temp_opts[i], elView, dctx);
                        lftm.addObj(self.bind(bind_op));
                    }
                }
            });
            return lftm;
        }
        _getInternal(): IInternalAppMethods {
            return this._internal;
        }
        addOnStartUp(fn: TEventHandler<Application, any>, nmspace?: string, context?: BaseObject) {
            this._addHandler(APP_EVENTS.startup, fn, nmspace, context);
        }
        removeOnStartUp(nmspace?: string) {
            this._removeHandler(APP_EVENTS.startup, nmspace);
        }
        getExports(): IIndexer<any> {
            return this._exports;
        }
        registerElView(name: string, vw_type: elviewMOD.IViewType) {
            var name2 = 'elvws.' + name, global = this.global;
            if (!global._getInternal().getObject(this, name2)) {
                global._getInternal().registerObject(this, name2, vw_type);
            }
            else
                throw new Error(utils.format(RIAPP.ERRS.ERR_OBJ_ALREADY_REGISTERED, name));
        }
        //checks if the element already has created and attached an ElView, if no then it creates and attaches ElView for the element
        getElementView(el: HTMLElement) {
            var elView = this._getElView(el);
            //check if element view is already created for this element
            if (!!elView)
                return elView;
            var info = this._getElementViewInfo(el); 
            return this._createElementView(el, info);
        }
        bind(opts: bindMOD.IBindingOptions) {
            return new bindMOD.Binding(opts, this.appName);
        }
        registerConverter(name: string, obj: RIAPP.IConverter) {
            var name2 = 'converters.' + name;
            if (!global._getInternal().getObject(this, name2)) {
                global._getInternal().registerObject(this, name2, obj);
            }
            else
                throw new Error(utils.format(RIAPP.ERRS.ERR_OBJ_ALREADY_REGISTERED, name));
        }
        getConverter(name: string): RIAPP.IConverter {
            var name2 = 'converters.' + name;
            var res = global._getInternal().getObject(this, name2);
            if (!res) {
                res = global._getInternal().getObject(global, name2);
            }
            if (!res)
                throw new Error(utils.format(RIAPP.ERRS.ERR_CONVERTER_NOTREGISTERED, name));
            return res;
        }
        registerType(name: string, obj: any) {
            var name2 = 'types.' + name;
            return global._getInternal().registerObject(this, name2, obj);
        }
        getType(name: string) {
            var name2 = 'types.' + name;
            var res = global._getInternal().getObject(this, name2);
            if (!res) {
                res = global._getInternal().getObject(global, name2);
            }
            return res;
        }
        //registers instances of objects, so they can be retrieved later anywhere in the application's code
        //very similar to a dependency injection container - you can later obtain the registerd object with the getObject function
        registerObject(name: string, obj: any) {
            var self = this, name2 = 'objects.' + name;
            if (obj instanceof BaseObject) {
                (<BaseObject>obj).addOnDestroyed((s, a) => {
                    global._getInternal().removeObject(self, name2);
                }, self.uniqueID);
            }
            var objMap = global._getInternal().registerObject(this, name2, obj);
            if (this._objMaps.indexOf(objMap) < 0) {
                this._objMaps.push(objMap);
            }
        }
        getObject(name: string) {
            var name2 = 'objects.' + name;
            var res = global._getInternal().getObject(this, name2);
            return res;
        }
        //can override this method in derived classes
        onStartUp() {
        }
        //set up application - use fn_sandbox callback to setUp handlers on objects, create viewModels and etc.
        startUp(fn_sandbox?:(app:Application)=>void) {
            var self = this, fn_init = function () {
                try {
                    self._contentFactory.init();
                    self.onStartUp();
                    self.raiseEvent(APP_EVENTS.startup, {});
                    if (!!fn_sandbox)
                        fn_sandbox.apply(self, [self]);
                    self._setUpBindings();
                }
                catch (ex)
                {
                    RIAPP.reThrow(ex, this.handleError(ex, this));
                }
            };

            try {
                if (!!fn_sandbox && !utils.check.isFunction(fn_sandbox))
                    throw new Error(RIAPP.ERRS.ERR_APP_SETUP_INVALID);
                global._getInternal().waitForNotLoading(fn_init, null);
            }
            catch (ex) {
                RIAPP.reThrow(ex, self.handleError(ex, self));
            }
        }
        //loads a group of templates from the server
        loadTemplates(url: string) {
            this.loadTemplatesAsync(function () {
                return utils.performAjaxGet(url);
            });
        }
        //loads a group of templates from the server
        loadTemplatesAsync(fn_loader: () => IPromise<string>) {
            global._getInternal().loadTemplatesAsync(fn_loader, this);
        }
        /*
            fn_loader must load template and return promise which resolves with loaded HTML string
        */
        registerTemplateLoader(name: string, fn_loader: () => IPromise<string>) {
            global._getInternal().registerTemplateLoader(this.appName + '.' + name, {
                fn_loader: fn_loader
            });
        }
        getTemplateLoader(name: string): () => IPromise<string> {
            var res = global._getInternal().getTemplateLoader(this.appName + '.' + name);
            if (!res) {
                res = global._getInternal().getTemplateLoader(name);
            }
            return res;
        }
        registerTemplateGroup(name: string, group: {
            fn_loader?: () => IPromise<string>;
            url?: string;
            names: string[];
        }) {
            var group2: IGroupInfo = utils.extend(false, {
                fn_loader: null,
                url: null,
                names: null,
                app: this
            }, group);
            global._getInternal().registerTemplateGroup(this.appName + '.' + name, group2);
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            var self = this;
            try {
                self._contentFactory = null;
                global._getInternal().unregisterApp(self);
                self._destroyBindings();
                self._cleanUpObjMaps();
                self._exports = {};
                self._modules = {};
                self._elViewStore = {};
                self._userCode = {};
                self._viewModels = {};
                self._options = null;
            } finally {
                super.destroy();
            }
        }
        toString() {
            return 'Application: ' + this.appName;
        }
        get uniqueID() { return this._objId; }
        get options() { return this._options; }
        get contentFactory() { return <contentMOD.IContentFactory>this._contentFactory; }
        get appName() { return this._app_name; }
        get appRoot(): { querySelectorAll: (selectors: string) => NodeList; } {
            if (!this._options || !this._options.application_root) return this.global.document;
            return this._options.application_root;
        }
        //loaded app modules which are mapped by their name
        get modules() { return this._modules; }
        get global() { return RIAPP.global; }
        //Namespace for attaching custom user code (functions and objects)
        get UC() { return this._userCode; }
        //Namespace for attaching application view models
        get VM() { return this._viewModels; }
        get app() { return this; }
    }

}
