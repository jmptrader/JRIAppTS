namespace RIAPP.MOD.binding {
    import elviewMOD = RIAPP.MOD.baseElView;
    import errMOD = RIAPP.MOD.errors;
    import utilsMOD = RIAPP.MOD.utils;
    import parserMOD = RIAPP.MOD.parser;

    binding._isBinding = (obj: any) => {
        return !!obj && obj instanceof Binding;
    };

    export const enum BINDING_MODE {
        OneTime = 0,
        OneWay = 1,
        TwoWay = 2,
        BackWay = 3
    }
    export var bindModeMap: { [name: string]: BINDING_MODE } = {};
    bindModeMap["OneTime"] = BINDING_MODE.OneTime;
    bindModeMap["OneWay"] = BINDING_MODE.OneWay;
    bindModeMap["TwoWay"] = BINDING_MODE.TwoWay;
    bindModeMap["BackWay"] = BINDING_MODE.BackWay;

    var global = RIAPP.global, base_utils = RIAPP.baseUtils, utils: utilsMOD.Utils, parser: parserMOD.Parser;
    global.addOnInitialize((s, args) => {
        utils = s.utils;
        parser = s.parser;
    });
    
    export interface IBindingOptions {
        mode?: BINDING_MODE;
        converterParam?: any;
        converter?: RIAPP.IConverter;
        targetPath: string;
        sourcePath?: string;
        target?: RIAPP.BaseObject;
        source?: any;
        isSourceFixed?: boolean;
    }

    interface IBindingState {
        source: any;
        target: any;
    }

    export function getBindingOptions(app: RIAPP.Application, bindInfo: IBindingInfo, defaultTarget: RIAPP.BaseObject, defaultSource: any) {
        var bindingOpts: IBindingOptions = {
            mode: BINDING_MODE.OneWay,
            converterParam: null,
            converter: null,
            targetPath: null,
            sourcePath: null,
            target: null,
            source: null,
            isSourceFixed: false
        };

        var fixedSource = bindInfo.source, fixedTarget = bindInfo.target;

        if (!bindInfo.sourcePath && !!bindInfo.to)
            bindingOpts.sourcePath = bindInfo.to;
        else if (!!bindInfo.sourcePath)
            bindingOpts.sourcePath = bindInfo.sourcePath;
        if (!!bindInfo.targetPath)
            bindingOpts.targetPath = bindInfo.targetPath;
        if (!!bindInfo.converterParam)
            bindingOpts.converterParam = bindInfo.converterParam;
        if (!!bindInfo.mode)
            bindingOpts.mode = bindModeMap[bindInfo.mode];

        if (!!bindInfo.converter) {
            if (utils.check.isString(bindInfo.converter))
                bindingOpts.converter = app.getConverter(bindInfo.converter);
            else
                bindingOpts.converter = bindInfo.converter;
        }


        if (!fixedTarget)
            bindingOpts.target = defaultTarget;
        else {
            if (utils.check.isString(fixedTarget)) {
                if (fixedTarget == 'this')
                    bindingOpts.target = defaultTarget;
                else {
                    //if no fixed target, then target evaluation starts from this app
                    bindingOpts.target = parser.resolveBindingSource(app, parser.getPathParts(fixedTarget));
                }
            }
            else
                bindingOpts.target = fixedTarget;
        }

        if (!fixedSource) {
            //if source is not supplied use defaultSource parameter as source
            bindingOpts.source = defaultSource;
        }
        else {
            bindingOpts.isSourceFixed = true;
            if (utils.check.isString(fixedSource)) {
                if (fixedSource == 'this') {
                    bindingOpts.source = defaultTarget;
                }
                else {
                    //source evaluation starts from this app
                    bindingOpts.source = parser.resolveBindingSource(app, parser.getPathParts(fixedSource));
                }
            }
            else
                bindingOpts.source = fixedSource;
        }

        return bindingOpts;
    }

    export class Binding extends RIAPP.BaseObject {
        private _state: IBindingState;
        private _mode: BINDING_MODE;
        private _converter: RIAPP.IConverter;
        private _converterParam: any;
        private _srcPath: string[];
        private _tgtPath: string[];
        private _isSourceFixed: boolean;
        private _pathItems: { [key: string]: BaseObject; };
        private _objId: string;
        private _ignoreSrcChange: boolean;
        private _ignoreTgtChange: boolean;
        private _sourceObj: any;
        private _targetObj: any;
        private _source: any;
        private _target: RIAPP.BaseObject;
        private _appName: string;

        constructor(options: IBindingOptions, appName?: string) {
            super();
            var opts: IBindingOptions = utils.extend(false, {
                target: null, source: null,
                targetPath: null, sourcePath: null, mode: BINDING_MODE.OneWay,
                converter: null, converterParam: null, isSourceFixed: false
            }, options);

            if (utils.check.isString(opts.mode)) {
                opts.mode = bindModeMap[opts.mode];
            }

            if (!utils.check.isString(opts.targetPath)) {
                if (RIAPP.DebugLevel == RIAPP.DEBUG_LEVEL.HIGH) {
                    RIAPP.startDebugger();
                }
                throw new Error(base_utils.format(RIAPP.ERRS.ERR_BIND_TGTPATH_INVALID, opts.targetPath));
            }

            if (utils.check.isUndefined(opts.mode)) {
                if (RIAPP.DebugLevel == RIAPP.DEBUG_LEVEL.HIGH) {
                    RIAPP.startDebugger();
                }
                throw new Error(base_utils.format(RIAPP.ERRS.ERR_BIND_MODE_INVALID, opts.mode));
            }

            if (!opts.target) {
                throw new Error(RIAPP.ERRS.ERR_BIND_TARGET_EMPTY);
            }

            if (!utils.check.isBaseObj(opts.target)) {
                throw new Error(RIAPP.ERRS.ERR_BIND_TARGET_INVALID);
            }

            this._appName = appName;
            this._state = null; //save state - source and target when binding is disabled
            this._mode = opts.mode;
            this._converter = opts.converter || global._getInternal().getConverter('BaseConverter');
            this._converterParam = opts.converterParam;
            this._srcPath = parser.getPathParts(opts.sourcePath);
            this._tgtPath = parser.getPathParts(opts.targetPath);
            if (this._tgtPath.length < 1)
                throw new Error(utils.format(RIAPP.ERRS.ERR_BIND_TGTPATH_INVALID, opts.targetPath));
            this._isSourceFixed = (!!opts.isSourceFixed);
            this._pathItems = {};
            this._objId = 'bnd' + baseUtils.getNewID();
            this._ignoreSrcChange = false;
            this._ignoreTgtChange = false;
            this._sourceObj = null;
            this._targetObj = null;
            this._source = null;
            this._target = null;
            this.target = opts.target;
            this.source = opts.source;
            var err_notif = utils.getErrorNotification(this._sourceObj);
            if (!!err_notif && err_notif.getIsHasErrors())
                this._onSrcErrorsChanged(err_notif);
        }
        private static _isDestroyed(obj: any): boolean {
            var res = false;
            if (utils.check.isBaseObj(obj)) {
                res = (<BaseObject>obj).getIsDestroyCalled();
            }
            return res;
        }
        private _onSrcErrorsChanged(err_notif: IErrorNotification, args?: any) {
            var errors: IValidationInfo[] = [], tgt = this._targetObj, src = this._sourceObj, srcPath = this._srcPath;
            if (!!tgt && elviewMOD._isElView(tgt)) {
                if (!!src && srcPath.length > 0) {
                    var prop = srcPath[srcPath.length - 1];
                    errors = err_notif.getFieldErrors(prop);
                }
                (<elviewMOD.BaseElView>tgt).validationErrors = errors;
            }
        }
        private _getTgtChangedFn(self: Binding, obj: any, prop: string, restPath: string[], lvl: number) {
            var fn = function (sender: any, data: any) {
                var val = parser.resolveProp(obj, prop);
                if (restPath.length > 0) {
                    self._setPathItem(null, BindTo.Target, lvl, restPath);
                }
                //bind and trigger target update
                self._parseTgtPath(val, restPath, lvl);
            };
            return fn;
        }
        private _getSrcChangedFn(self: Binding, obj: any, prop: string, restPath: string[], lvl: number) {
            var fn = function (sender: any, data: any) {
                var val = parser.resolveProp(obj, prop);
                if (restPath.length > 0) {
                    self._setPathItem(null, BindTo.Source, lvl, restPath);
                }
                self._parseSrcPath(val, restPath, lvl);
            };
            return fn;
        }
        private _parseSrcPath(obj: any, path: string[], lvl: number) {
            var self = this;
            self._sourceObj = null;
            if (path.length === 0) {
                self._sourceObj = obj;
            }
            else
                self._parseSrcPath2(obj, path, lvl);

            if (self._mode === BINDING_MODE.BackWay) {
                if (!!self._sourceObj)
                    self._updateSource();
            }
            else {
                if (!!self._targetObj)
                    self._updateTarget();
            }
        }
        private _parseSrcPath2(obj: any, path: string[], lvl: number) {
            var self = this, nextObj: any, isBaseObj = (!!obj && utils.check.isBaseObj(obj)), isValidProp: boolean;

            if (isBaseObj) {
                (<BaseObject>obj).addOnDestroyed(self._onSrcDestroyed, self._objId, self);
                self._setPathItem(obj, BindTo.Source, lvl, path);
            }

            if (path.length > 1) {
                if (isBaseObj) {
                    (<BaseObject>obj).addOnPropertyChange(path[0], self._getSrcChangedFn(self, obj, path[0], path.slice(1), lvl + 1), self._objId);
                }

                if (!!obj) {
                    nextObj = global.parser.resolveProp(obj, path[0]);
                    if (!!nextObj) {
                        self._parseSrcPath2(nextObj, path.slice(1), lvl + 1);
                    }
                    else if (base_utils.isUndefined(nextObj)) {
                        if (DebugLevel == DEBUG_LEVEL.HIGH) {
                            RIAPP.startDebugger();
                        }
                        if (DebugLevel > DEBUG_LEVEL.NONE) {
                            global._getInternal().onUnResolvedBinding(BindTo.Source, self.source, self._srcPath.join('.'), path[0]);
                        }
                    }
                }
                return;
            }

            if (!!obj && path.length == 1) {
                isValidProp = true;
                if (DebugLevel != DEBUG_LEVEL.NONE)
                    isValidProp = isBaseObj ? obj._isHasProp(path[0]) : base_utils.hasProp(obj, path[0]);

                if (isValidProp) {
                    var updateOnChange = isBaseObj && (self._mode === BINDING_MODE.OneWay || self._mode === BINDING_MODE.TwoWay);
                    if (updateOnChange) {
                        (<BaseObject>obj).addOnPropertyChange(path[0], self._updateTarget, self._objId, self);
                    }
                    var err_notif = utils.getErrorNotification(obj);
                    if (!!err_notif) {
                        err_notif.addOnErrorsChanged(self._onSrcErrorsChanged, self._objId, self);
                    }
                    self._sourceObj = obj;
                }
                else {
                    if (DebugLevel == DEBUG_LEVEL.HIGH) {
                        RIAPP.startDebugger();
                    }
                    global._getInternal().onUnResolvedBinding(BindTo.Source, self.source, self._srcPath.join('.'), path[0]);
                }
            }
        }
        private _parseTgtPath(obj: any, path: string[], lvl: number) {
            var self = this;
            self._targetObj = null;
            if (path.length === 0) {
                self._targetObj = obj;
            }
            else
                self._parseTgtPath2(obj, path, lvl);

            if (self._mode === BINDING_MODE.BackWay) {
                if (!!self._sourceObj)
                    self._updateSource();
            }
            else {
                //if new target then update target (not source!)
                if (!!self._targetObj)
                    self._updateTarget();
            }
        }
        private _parseTgtPath2(obj: any, path: string[], lvl: number) {
            var self = this, nextObj: any, isBaseObj = (!!obj && utils.check.isBaseObj(obj)), isValidProp: boolean;

            if (isBaseObj) {
                (<BaseObject>obj).addOnDestroyed(self._onTgtDestroyed, self._objId, self);
                self._setPathItem(obj, BindTo.Target, lvl, path);
            }

            if (path.length > 1) {
                if (isBaseObj) {
                    (<BaseObject>obj).addOnPropertyChange(path[0], self._getTgtChangedFn(self, obj, path[0], path.slice(1), lvl + 1), self._objId, self);
                }
                if (!!obj) {
                    nextObj = global.parser.resolveProp(obj, path[0]);
                    if (!!nextObj) {
                        self._parseTgtPath2(nextObj, path.slice(1), lvl + 1);
                    }
                    else if (base_utils.isUndefined(nextObj)) {
                        if (DebugLevel == DEBUG_LEVEL.HIGH) {
                            RIAPP.startDebugger();
                        }
                        if (DebugLevel > DEBUG_LEVEL.NONE) {
                            global._getInternal().onUnResolvedBinding(BindTo.Target, self.target, self._tgtPath.join('.'), path[0]);
                        }
                    }
                }
                return;
            }

            if (!!obj && path.length === 1) {
                isValidProp = true;
                if (DebugLevel != DEBUG_LEVEL.NONE)
                    isValidProp = isBaseObj ? obj._isHasProp(path[0]) : base_utils.hasProp(obj, path[0]);

                if (isValidProp) {
                    var updateOnChange = isBaseObj && (self._mode === BINDING_MODE.TwoWay || self._mode === BINDING_MODE.BackWay);
                    if (updateOnChange) {
                        (<BaseObject>obj).addOnPropertyChange(path[0], self._updateSource, self._objId, self);
                    }
                    self._targetObj = obj;
                }
                else {
                    if (DebugLevel == DEBUG_LEVEL.HIGH) {
                        RIAPP.startDebugger();
                    }
                    global._getInternal().onUnResolvedBinding(BindTo.Target, self.target, self._tgtPath.join('.'), path[0]);
                }
            }
        }
        private _setPathItem(newObj: BaseObject, bindingTo: BindTo, lvl: number, path: string[]) {
            var oldObj: RIAPP.BaseObject, key: string, len: number = lvl + path.length;
            for (var i = lvl; i < len; i += 1) {
                switch (bindingTo) {
                    case BindTo.Source:
                        key = 's' + i;
                        break;
                    case BindTo.Target:
                        key = 't' + i;
                        break;
                    default:
                        throw new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'bindingTo', bindingTo));
                }

                oldObj = this._pathItems[key];
                if (!!oldObj) {
                    this._cleanUpObj(oldObj);
                    delete this._pathItems[key];
                }

                if (!!newObj && i == lvl) {
                    this._pathItems[key] = newObj;
                }
            }
        }
        private _cleanUpObj(oldObj: RIAPP.BaseObject) {
            if (!!oldObj) {
                oldObj.removeNSHandlers(this._objId);
                var err_notif = utils.getErrorNotification(oldObj);
                if (!!err_notif) {
                    err_notif.removeOnErrorsChanged(this._objId);
                }
            }
        }
        private _onTgtDestroyed(sender: any, args: any) {
            if (this._isDestroyCalled)
                return;
            this._setTarget(null);
        }
        private _onSrcDestroyed(sender: any, args: any) {
            var self = this;
            if (self._isDestroyCalled)
                return;
            if (sender === self.source)
                self._setSource(null);
            else {
                self._setPathItem(null, BindTo.Source, 0, self._srcPath);
                setTimeout(function () {
                    if (self._isDestroyCalled)
                        return;
                    //rebind after the source destroy is fully completed
                    self._bindToSource();
                }, 0);
            }
        }
        private _bindToSource() {
            this._parseSrcPath(this.source, this._srcPath, 0);
        }
        private _bindToTarget() {
            this._parseTgtPath(this.target, this._tgtPath, 0);
        }
        private _updateTarget(sender?: any, args?: any) {
            if (this._ignoreSrcChange || this._isDestroyCalled)
                return;
            this._ignoreTgtChange = true;
            try {
                var res = this._converter.convertToTarget(this.sourceValue, this._converterParam, this._sourceObj);
                if (res !== undefined)
                    this.targetValue = res;
            }
            catch (ex) {
                if (this._mode === BINDING_MODE.BackWay) {
                    //resync
                    this._updateSource();
                }
                RIAPP.reThrow(ex, this.handleError(ex, this));
            }
            finally {
                this._ignoreTgtChange = false;
            }
        }
        private _updateSource(sender?: any, args?: any) {
            if (this._ignoreTgtChange || this._isDestroyCalled)
                return;
            this._ignoreSrcChange = true;
            try {
                var res = this._converter.convertToSource(this.targetValue, this._converterParam, this._sourceObj);
                if (res !== undefined)
                    this.sourceValue = res;
            }
            catch (ex) {
                if (!(ex instanceof errMOD.ValidationError) || !elviewMOD._isElView(this._targetObj)) {
                    //BaseElView is notified about errors in _onSrcErrorsChanged event handler
                    //we only need to invoke _onError in other cases
                    //1) when target is not BaseElView
                    //2) when error is not ValidationError
                    this._ignoreSrcChange = false;
                    if (this._mode != BINDING_MODE.BackWay) {
                        //resync
                        this._updateTarget();
                    }
                    if (!this.handleError(ex, this))
                        throw ex;
                }
            }
            finally {
                this._ignoreSrcChange = false;
            }
        }
        protected _setTarget(value: any) {
            if (!!this._state) {
                this._state.target = value;
                return;
            }
            if (this._target !== value) {
                if (!!this._targetObj) {
                    this._ignoreTgtChange = true;
                    try {
                        this.targetValue = null;
                    }
                    finally {
                        this._ignoreTgtChange = false;
                    }
                }
                this._setPathItem(null, BindTo.Target, 0, this._tgtPath);
                if (!!value && !utils.check.isBaseObj(value))
                    throw new Error(RIAPP.ERRS.ERR_BIND_TARGET_INVALID);
                this._target = value;
                this._bindToTarget();
                if (!!this._target && !this._targetObj)
                    throw new Error(utils.format(RIAPP.ERRS.ERR_BIND_TGTPATH_INVALID, this._tgtPath.join('.')));
            }
        }
        protected _setSource(value: any) {
            if (!!this._state) {
                this._state.source = value;
                return;
            }
            if (this._source !== value) {
                this._setPathItem(null, BindTo.Source, 0, this._srcPath);
                this._source = value;
                this._bindToSource();
            }
        }
        handleError(error: any, source: any): boolean {
            var isHandled = super.handleError(error, source);
            if (!isHandled) {
                if (!!this._appName) {
                    return global.findApp(this._appName).handleError(error, source);
                }
                else
                    return global.handleError(error, source);
            }
            return isHandled;
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            var self = this;
            utils.forEachProp(this._pathItems, function (key) {
                var old = self._pathItems[key];
                self._cleanUpObj(old);
            });
            this._pathItems = {};
            this._setSource(null);
            this._setTarget(null);
            this._state = null;
            this._converter = null;
            this._converterParam = null;
            this._srcPath = null;
            this._tgtPath = null;
            this._sourceObj = null;
            this._targetObj = null;
            this._source = null;
            this._target = null;
            super.destroy();
        }
        toString() {
            return 'Binding';
        }

        get bindingID() {
            return this._objId;
        }
        get target() { return this._target; }
        set target(v: BaseObject) {
            this._setTarget(v);
        }
        get source() { return this._source; }
        set source(v) {
            this._setSource(v);
        }
        get targetPath() { return this._tgtPath; }
        get sourcePath() { return this._srcPath; }
        get sourceValue() {
            if (this._srcPath.length === 0)
                return this._sourceObj;
            if (!this._sourceObj)
                return undefined;
            var prop = this._srcPath[this._srcPath.length - 1];
            var res = global.parser.resolveProp(this._sourceObj, prop);
            return res;
        }
        set sourceValue(v) {
            if (this._srcPath.length === 0 || !this._sourceObj)
                return;
            if (Binding._isDestroyed(this._sourceObj))
                return;
            var prop = this._srcPath[this._srcPath.length - 1];
            global.parser.setPropertyValue(this._sourceObj, prop, v);
        }
        get targetValue() {
            if (!this._targetObj)
                return undefined;
            var prop = this._tgtPath[this._tgtPath.length - 1];
            return global.parser.resolveProp(this._targetObj, prop);
        }
        set targetValue(v) {
            if (this._tgtPath.length == 0 || !this._targetObj)
                return;
            if (Binding._isDestroyed(this._targetObj))
                return;
            var prop = this._tgtPath[this._tgtPath.length - 1];
            global.parser.setPropertyValue(this._targetObj, prop, v);
        }
        get mode() { return this._mode; }
        get converter() { return this._converter; }
        set converter(v: RIAPP.IConverter) { this._converter = v; }
        get converterParam() { return this._converterParam; }
        set converterParam(v) { this._converterParam = v; }
        get isSourceFixed() { return this._isSourceFixed; }
        get isDisabled() { return !!this._state; }
        set isDisabled(v) {
            var s: IBindingState;
            v = !!v;
            if (this.isDisabled != v) {
                if (v) {
                    //going to disabled state
                    s = { source: this._source, target: this._target };
                    try {
                        this.target = null;
                        this.source = null;
                    }
                    finally {
                        this._state = s;
                    }
                }
                else {
                    //restoring from disabled state
                    s = this._state;
                    this._state = null;
                    this._setTarget(s.target);
                    this._setSource(s.source);
                }
            }
        }
        get appName() { return this._appName; }
    }


    _isModuleLoaded = true;
}
