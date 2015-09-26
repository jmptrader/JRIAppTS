namespace RIAPP {
    import utilsMOD = RIAPP.MOD.utils;
    import parserMOD = RIAPP.MOD.parser;         
    import defMOD = RIAPP.MOD.defaults;
    import datepickerMOD = RIAPP.MOD.datepicker;
    export var global: Global = null;
    export var css_riaTemplate = 'ria-template';
    
    var GLOB_EVENTS = {
        load: 'load',
        unload: 'unload',
        initialized: 'initialize',
        unresolvedBinding: 'unresolvedBind'
    };

    var PROP_NAME = {
        isLoading: 'isLoading',
        curSelectable: 'currentSelectable'
    };

    export interface IInternalGlobMethods {
        initialize(): void;
        trackSelectable(selectable: ISelectableProvider): void;
        untrackSelectable(selectable: ISelectableProvider): void;
        registerApp(app: Application): void;
        unregisterApp(app: Application): void;
        destroyApps(): void;
        registerObject(root: IExports, name: string, obj: any): void;
        getObject(root: IExports, name: string): any;
        removeObject(root: IExports, name: string): any;
        processTemplateSections(root: { querySelectorAll: (selectors: string) => NodeList; }): void;
        loadTemplatesAsync(fn_loader: () => IPromise<string>, app: Application): IPromise<any>;
        registerTemplateLoader(name: string, loader: ITemplateLoaderInfo): void;
        getTemplateLoader(name: string): () => IPromise<string>;
        registerTemplateGroup(groupName: string, group: IGroupInfo): void;
        getTemplateGroup(name: string): IGroupInfo;
        waitForNotLoading(callback: (...args: any[]) => any, callbackArgs: any): void;
        getConverter(name: string): IConverter;
        onUnResolvedBinding(bindTo: BindTo, root: any, path: string, propName: string): void;
    }

    export class Global extends BaseObject implements IExports {
        public static vesion = '2.7.7';
        public static _TEMPLATES_SELECTOR = ['section.', css_riaTemplate].join('');
        public static _TEMPLATE_SELECTOR = '*[data-role="template"]';
        private _window: Window;
        private _appInst: { [name: string]: Application; };
        private _$: JQueryStatic;
        private _currentSelectable: ISelectableProvider;
        private _defaults: defMOD.Defaults;
        private _userCode: any;
        private _utils: utilsMOD.Utils;
        private _templateLoaders: any;
        private _templateGroups: any;
        private _promises: IPromise<string>[];
        private _isReady: boolean;
        private _isInitialized: boolean;
        private _waitQueue: utilsMOD.WaitQueue;
        private _parser: parserMOD.Parser;
        private _exports: IIndexer<any>;
        private _internal: IInternalGlobMethods;
        
        constructor(window: Window, jQuery: JQueryStatic) {
            super();
            var self = this;
            if (!!RIAPP.global)
                throw new Error(RIAPP.ERRS.ERR_GLOBAL_SINGLTON);
            if (!jQuery)
                throw new Error(RIAPP.ERRS.ERR_APP_NEED_JQUERY);
            this._window = window;
            this._appInst = {};
            this._$ = jQuery;
            this._currentSelectable = null;
            this._userCode = {};
            //exported types
            this._exports = {}; 
            this._templateLoaders = {};
            this._templateGroups = {};
            this._promises = [];
            this._parser = null;
            this._isReady = false;
            this._isInitialized = false;
            this._internal = {
                initialize: () => {
                    self._initialize();
                },
                trackSelectable: (selectable: ISelectableProvider) => {
                    self._trackSelectable(selectable);
                },
                untrackSelectable: (selectable: ISelectableProvider) => {
                    self._untrackSelectable(selectable);
                },
                registerApp: (app: Application) => {
                    self._registerApp(app);
                },
                unregisterApp: (app: Application) => {
                    self._unregisterApp(app);
                },
                destroyApps: () => {
                    self._destroyApps();
                },
                registerObject: (root: IExports, name: string, obj: any) => {
                    self._registerObject(root, name, obj);
                },
                getObject: (root: IExports, name: string) => {
                    return self._getObject(root, name);
                },
                removeObject: (root: IExports, name: string) => {
                    self._removeObject(root, name);
                },
                processTemplateSections: (root: { querySelectorAll: (selectors: string) => NodeList; }) => {
                    self._processTemplateSections(root);
                },
                loadTemplatesAsync: (fn_loader: () => IPromise<string>, app: Application) => {
                    return self._loadTemplatesAsync(fn_loader, app);
                },
                registerTemplateLoader: (name: string, loader: ITemplateLoaderInfo) => {
                    self._registerTemplateLoader(name, loader);
                },
                getTemplateLoader: (name: string) => {
                    return self._getTemplateLoader(name);
                },
                registerTemplateGroup: (groupName: string, group: IGroupInfo) => {
                    self._registerTemplateGroup(groupName, group);
                },
                getTemplateGroup: (name: string) => {
                    return self._getTemplateGroup(name);
                },
                waitForNotLoading: (callback: (...args: any[]) => any, callbackArgs: any) => {
                    self._waitForNotLoading(callback, callbackArgs);
                },
                getConverter: (name: string) => {
                    return self._getConverter(name);
                },
                onUnResolvedBinding: (bindTo: BindTo, root: any, path: string, propName: string) => {
                    self._onUnResolvedBinding(bindTo, root, path, propName);
                }
            };
            this._onCreate();
        }
        private _onCreate(): void {
            var self = this;
            self.$(self.document).ready(function ($) {
                self._waitQueue = new utilsMOD.WaitQueue(self);
                self._isReady = true;
                self._processTemplateSections(self.document);
                self.raiseEvent(GLOB_EVENTS.load, {});
                setTimeout(function () { self.removeHandler(GLOB_EVENTS.load, null); }, 0);
            });

            //when clicked outside any Selectable set _currentSelectable = null
            self.$(self.document).on("click.global", function (e) {
                e.stopPropagation();
                self.currentSelectable = null;
            });
            self.$(self.document).on("keydown.global", function (e) {
                e.stopPropagation();
                if (!!self._currentSelectable) {
                    self._currentSelectable.getISelectable().onKeyDown(e.which, e);
                }
            });
            self.$(self.document).on("keyup.global", function (e) {
                e.stopPropagation();
                if (!!self._currentSelectable) {
                    self._currentSelectable.getISelectable().onKeyUp(e.which, e);
                }
            });
            self.$(self.window).unload(function () {
                self.raiseEvent(GLOB_EVENTS.unload, {});
            });
            
            //this way to attach for correct work in firefox
            self.window.onerror = function (msg: any, url:string, linenumber:number) {
                if (!!msg && msg.toString().indexOf("DUMMY_ERROR") > -1) {
                    return true;
                }
                alert('Error: ' + msg + '\nURL: ' + url + '\nLine Number: ' + linenumber);
                return false;
            }
        }
        private _processTemplateSection(templateSection: { querySelectorAll: (selectors: string) => NodeList; }, app: Application): void {
            var self = this;
            var templates: HTMLElement[] = ArrayHelper.fromList(templateSection.querySelectorAll(Global._TEMPLATE_SELECTOR));
            templates.forEach(function (el) {
                var tmpDiv = self.document.createElement('div'), html: string,
                    name = el.getAttribute('id'), deferred = self.utils.createDeferred();
                el.removeAttribute('id');
                tmpDiv.appendChild(el);
                html = tmpDiv.innerHTML;
                deferred.resolve(html);
                var fn_loader = function () {
                    return deferred.promise();
                };
                if (!!app) {
                    name = app.appName + '.' + name;
                }
                self._registerTemplateLoader(name, {
                    fn_loader: fn_loader
                });
            });
        }
        private _registerTemplateLoaderCore(name: string, loader: ITemplateLoaderInfo): void {
            RIAPP.baseUtils.setValue(this._templateLoaders, name, loader, false);
        }
        private _getTemplateLoaderCore(name: string): ITemplateLoaderInfo {
            return RIAPP.baseUtils.getValue(this._templateLoaders, name);
        }
        protected _getEventNames(): string[] {
            var base_events = super._getEventNames();
            var events = Object.keys(GLOB_EVENTS).map((key, i, arr) => { return <string>(<any>GLOB_EVENTS)[key]; });
            return events.concat(base_events);
        }
        protected _addHandler(name: string, fn: (sender:any, args: any) => void , nmspace?: string, context?: BaseObject, prepend?: boolean) {
            var self = this;
            if ((name == GLOB_EVENTS.load && self._isReady) || (name == GLOB_EVENTS.initialized && self._isInitialized)) {
                 //when already is ready, immediately raise the event
                setTimeout(function () { fn.apply(self, [self, {}]); }, 0);
                return;
            }
            super._addHandler(name, fn, nmspace, context, prepend);
        }
        private _initialize(): void {
            if (this._isInitialized)
                return;
            var self = this, isOK: boolean, name: string;
            name = 'utils'; isOK = utilsMOD._isModuleLoaded;
            if (isOK)
                self._utils = new utilsMOD.Utils();
            name = 'parser'; isOK = parserMOD._isModuleLoaded;
            if (isOK)
                self._parser = new parserMOD.Parser();
            name = 'defaults'; isOK = defMOD._isModuleLoaded;
            if (isOK) {
                self._defaults = new defMOD.Defaults();
            }
            name = 'datepicker'; isOK = datepickerMOD._isModuleLoaded;
            if (isOK && !!self._defaults) {
                self._defaults.datepicker = self.getType('IDatepicker');
            }
            if (!isOK)
                throw new Error(baseUtils.format(RIAPP.ERRS.ERR_MODULE_NOT_REGISTERED, name));

            this._isInitialized = true;
            self.raiseEvent(GLOB_EVENTS.initialized, {});
            setTimeout(function () { self.removeHandler(GLOB_EVENTS.initialized, null); }, 0);
        }
        private _trackSelectable(selectable: ISelectableProvider): void {
            var self = this, utils = self.utils, isel = selectable.getISelectable(), el = isel.getContainerEl();
            self.$(el).on("click." + isel.getUniqueID(), function (e) {
                e.stopPropagation();
                var target = e.target;
                if (utils.isContained(target, el))
                    self.currentSelectable = selectable;
            });
        }
        private _untrackSelectable(selectable: ISelectableProvider): void {
            var self = this, utils = self.utils, isel = selectable.getISelectable(), el = isel.getContainerEl();
            self.$(el).off("click." + isel.getUniqueID());
            if (this.currentSelectable === selectable)
                this.currentSelectable = null;
        }
        private _registerApp(app: Application): void {
            if (!this._appInst[app.appName])
                this._appInst[app.appName] = app;
        }
        private _unregisterApp(app: Application): void {
            if (!this._appInst[app.appName])
                return;
            delete this._appInst[app.appName];
            delete this._templateLoaders[app.appName];
            delete this._templateGroups[app.appName];
        }
        private _destroyApps(): void {
            var self = this;
            this.utils.forEachProp(this._appInst, function (id) {
                self._appInst[id].destroy();
            });
        }
        private _registerObject(root: IExports, name: string, obj: any): void {
            RIAPP.baseUtils.setValue(root.getExports(), name, obj, true);
        }
        private _getObject(root: IExports, name: string): any {
            return RIAPP.baseUtils.getValue(root.getExports(), name);
        }
        private _removeObject(root: IExports, name: string):any {
            return RIAPP.baseUtils.removeValue(root.getExports(), name);
        }
        private _processTemplateSections(root: { querySelectorAll: (selectors: string) => NodeList; }): void {
            var self = this;
            var sections: HTMLElement[] = ArrayHelper.fromList(root.querySelectorAll(Global._TEMPLATES_SELECTOR));
            sections.forEach(function (el) {
                self._processTemplateSection(el, null);
                self.utils.removeNode(el);
            });
        }
        private _loadTemplatesAsync(fn_loader: () => IPromise<string>, app: Application): IPromise<any> {
            var self = this, promise = fn_loader(), old = self.isLoading;
            self._promises.push(promise);
            if (self.isLoading !== old)
                self.raisePropertyChanged(PROP_NAME.isLoading);
            var deferred = self.utils.createDeferred();
            promise.then(function (html:string) {
                self.utils.removeFromArray(self._promises, promise);
                try {
                    var tmpDiv = self.document.createElement('div');
                    tmpDiv.innerHTML = html;
                    self._processTemplateSection(tmpDiv, app);
                    deferred.resolve();
                }
                catch (ex) {
                    self.handleError(ex, self);
                    deferred.reject();
                }
                if (!self.isLoading)
                    self.raisePropertyChanged(PROP_NAME.isLoading);
            },function (err) {
                self.utils.removeFromArray(self._promises, promise);
                if (!self.isLoading)
                    self.raisePropertyChanged(PROP_NAME.isLoading);
                deferred.reject();
                if (!!err && !!err.message) {
                    self.handleError(err, self);
                }
                else if (!!err && !!err.responseText) {
                    self.handleError(new Error(err.responseText), self);
                }
                else
                    self.handleError(new Error('Failed to load templates'), self);
            });
            return deferred.promise();
        }
        /*
         fn_loader must load template and return promise which resolves with loaded HTML string
         */
        private _registerTemplateLoader(name: string, loader: ITemplateLoaderInfo): void {
            var self = this;
            loader = self.utils.extend(false, {
                fn_loader: null,
                groupName: null
            }, loader);

            if (!loader.groupName && !self.utils.check.isFunction(loader.fn_loader)) {
                throw new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_ASSERTION_FAILED, 'fn_loader is Function'));
            }
            var prevLoader = self._getTemplateLoaderCore(name);
            if (!!prevLoader) {
                //can overwrite previous loader with new one, only if the old did not have loader function and the new has it
                if ((!prevLoader.fn_loader && !!prevLoader.groupName) && (!loader.groupName && !!loader.fn_loader)) {
                    return self._registerTemplateLoaderCore(name, loader);
                }
                throw new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_TEMPLATE_ALREADY_REGISTERED, name));
            }
            return self._registerTemplateLoaderCore(name, loader);
        }
        private _getTemplateLoader(name: string): () => IPromise<string> {
            var self = this, loader = self._getTemplateLoaderCore(name);
            if (!loader)
                return null;
            if (!loader.fn_loader && !!loader.groupName) {
                var group = self._getTemplateGroup(loader.groupName);
                if (!group) {
                    throw new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_TEMPLATE_GROUP_NOTREGISTERED, loader.groupName));
                }
                //this function will return promise resolved with the template's html
                return function () {
                    if (!group.promise) { //prevents double loading
                        //start the loading only if no loading in progress
                        group.promise = self._loadTemplatesAsync(group.fn_loader, group.app);
                    }

                    var deferred = self.utils.createDeferred();
                    group.promise.done(function () {
                        try {
                            group.promise = null;
                            group.names.forEach(function (name) {
                                if (!!group.app) {
                                    name = group.app.appName + '.' + name;
                                }
                                var loader = self._getTemplateLoaderCore(name);
                                if (!loader || !loader.fn_loader) {
                                    throw new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_TEMPLATE_NOTREGISTERED, name));
                                }
                            });

                            var loader = self._getTemplateLoaderCore(name);
                            if (!loader || !loader.fn_loader) {
                                throw new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_TEMPLATE_NOTREGISTERED, name));
                            }
                            delete self._templateGroups[loader.groupName];

                            loader.fn_loader().done(function (html) {
                                deferred.resolve(html);
                            }).fail(function (er) {
                                deferred.reject(er);
                            });
                        }
                        catch (ex) {
                            deferred.reject(ex);
                        }
                    });

                    group.promise.fail(function (er) {
                        group.promise = null;
                        deferred.reject(er);
                    });

                    return deferred.promise();
                };
            }
            else
                return loader.fn_loader;
        }
        private _registerTemplateGroup(groupName: string, group: IGroupInfo): void {
            var self = this, group2: IGroupInfo = self.utils.extend(false, {
                fn_loader: null,
                url: null,
                names: null,
                app: null,
                promise: null
            }, group);

            if (!!group2.url && !group2.fn_loader) {
                //make a function to load from this url
                group2.fn_loader = function () {
                    return self.utils.performAjaxGet(group2.url);
                };
            }

            RIAPP.baseUtils.setValue(self._templateGroups, groupName, group2, true);
            group2.names.forEach(function (name) {
                if (!!group2.app) {
                    name = group2.app.appName + '.' + name;
                }
                //for each template in the group register dummy loader function which has only group name
                //when template will be requested, this dummy loader will be replaced with the real one
                self._registerTemplateLoader(name, {
                    groupName: groupName,
                    fn_loader: null //no loader function
                });
            });
        }
        private _getTemplateGroup(name: string): IGroupInfo {
            return RIAPP.baseUtils.getValue(this._templateGroups, name);
        }
        private _waitForNotLoading(callback: (...args: any[]) => any, callbackArgs: any): void {
            this._waitQueue.enQueue({
                prop: PROP_NAME.isLoading,
                groupName: null,
                predicate: function (val: any) {
                    return !val;
                },
                action: callback,
                actionArgs: callbackArgs
            });
        }
        private _getConverter(name: string): IConverter {
            var name2 = 'converters.' + name;
            var res = this._getObject(this, name2);
            if (!res)
                throw new Error(this.utils.format(RIAPP.ERRS.ERR_CONVERTER_NOTREGISTERED, name));
            return res;
        }
        private _onUnResolvedBinding(bindTo: BindTo, root: any, path: string, propName: string): void {
            var args: IUnResolvedBindingArgs = { bindTo: bindTo, root: root, path: path, propName: propName };
            this.raiseEvent(GLOB_EVENTS.unresolvedBinding, args);
        }
        _getInternal(): IInternalGlobMethods {
            return this._internal;
        }
        addOnLoad(fn: TEventHandler<Global, any>, nmspace?: string, context?: BaseObject) {
            this._addHandler(GLOB_EVENTS.load, fn, nmspace, context, false);
        }
        addOnUnLoad(fn: TEventHandler<Global, any>, nmspace?: string, context?: BaseObject) {
            this._addHandler(GLOB_EVENTS.unload, fn, nmspace, context, false);
        }
        addOnInitialize(fn: TEventHandler<Global, any>, nmspace?: string, context?: BaseObject) {
            this._addHandler(GLOB_EVENTS.initialized, fn, nmspace, context, false);
        }
        addOnUnResolvedBinding(fn: TEventHandler<Global, IUnResolvedBindingArgs>, nmspace?: string, context?: BaseObject) {
            this._addHandler(GLOB_EVENTS.unresolvedBinding, fn, nmspace, context, false);
        }
        removeOnUnResolvedBinding(nmspace?: string) {
            this._removeHandler(GLOB_EVENTS.unresolvedBinding, nmspace);
        }
        getExports(): IIndexer<any> {
            return this._exports;
        }
        findApp(name:string) {
            return this._appInst[name];
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            var self = this;
            if (!!self._waitQueue) {
                self._waitQueue.destroy()
                self._waitQueue = null;
            }
            self._promises = [];
            self._removeHandler();
            self._destroyApps();
            self._exports = {};
            self._templateLoaders = {};
            self._templateGroups = {};
            self._parser = null;
            self.$(self.document).off(".global");
            RIAPP.global = null;
            self.window.onerror = null;
            super.destroy();
        }
        registerType(name:string, obj:any) {
            var name2 = 'types.' + name;
            return this._registerObject(this, name2, obj);
        }
        getType(name:string) {
            var name2 = 'types.' + name;
            return this._getObject(this, name2);
        }
        registerConverter(name:string, obj: IConverter) {
            var name2 = 'converters.' + name;
            if (!this._getObject(this, name2)) {
                this._registerObject(this, name2, obj);
            }
            else
                throw new Error(global.utils.format(RIAPP.ERRS.ERR_OBJ_ALREADY_REGISTERED, name));
        }
        registerElView(name:string, elViewType:any) {
            var name2 = 'elvws.' + name;
            if (!this._getObject(this, name2)) {
                this._registerObject(this, name2, elViewType);
            }
            else
                throw new Error(global.utils.format(RIAPP.ERRS.ERR_OBJ_ALREADY_REGISTERED, name));
        }
        getImagePath(imageName:string) {
            var images = this.defaults.imagesPath;
            return images + imageName;
        }
        loadTemplates(url:string) {
            var self = this;
            this._loadTemplatesAsync(function () {
                return self.utils.performAjaxGet(url);
            }, null);
        }
        toString() {
            return 'Global';
        }
        get parser() { return this._parser; }
        get isLoading() {
            return this._promises.length > 0;
        }
        get $() {
            return this._$;
        }
        get window() {
            return this._window;
        }
        get document() {
            return this._window.document;
        }
        get currentSelectable() {
            return this._currentSelectable;
        }
        set currentSelectable(v: ISelectableProvider) {
            if (this._currentSelectable !== v) {
                this._currentSelectable = v;
                this.raisePropertyChanged(PROP_NAME.curSelectable);
            }
        }
        get defaults() {
            return this._defaults;
        }
        get utils() {
            return this._utils;
        }
        get UC() {
            return this._userCode;
        }
    }

    RIAPP.global = new Global(window, jQuery);
}
