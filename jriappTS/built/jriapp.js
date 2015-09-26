var RIAPP;
(function (RIAPP) {
    var consts;
    (function (consts) {
        consts.DATA_ATTR = {
            EL_VIEW_KEY: 'data-elvwkey',
            DATA_BIND: 'data-bind',
            DATA_VIEW: 'data-view',
            DATA_EVENT_SCOPE: 'data-scope',
            DATA_ITEM_KEY: 'data-key',
            DATA_CONTENT: 'data-content',
            DATA_COLUMN: 'data-column',
            DATA_NAME: 'data-name',
            DATA_FORM: 'data-form'
        };
        consts.ELVIEW_NM = { DATAFORM: 'dataform' };
        consts.LOADER_GIF = { SMALL: 'loader2.gif', NORMAL: 'loader.gif' };
    })(consts = RIAPP.consts || (RIAPP.consts = {}));
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    var MOD;
    (function (MOD) {
        var utils;
        (function (utils) {
            utils._isModuleLoaded = false;
            utils._initModule = function (app) { };
        })(utils = MOD.utils || (MOD.utils = {}));
    })(MOD = RIAPP.MOD || (RIAPP.MOD = {}));
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    var MOD;
    (function (MOD) {
        var errors;
        (function (errors) {
            errors._isModuleLoaded = false;
            errors._initModule = function (app) { };
        })(errors = MOD.errors || (MOD.errors = {}));
    })(MOD = RIAPP.MOD || (RIAPP.MOD = {}));
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    var MOD;
    (function (MOD) {
        var converter;
        (function (converter) {
            converter._isModuleLoaded = false;
            converter._initModule = function (app) { };
        })(converter = MOD.converter || (MOD.converter = {}));
    })(MOD = RIAPP.MOD || (RIAPP.MOD = {}));
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    var MOD;
    (function (MOD) {
        var defaults;
        (function (defaults) {
            defaults._isModuleLoaded = false;
            defaults._initModule = function (app) { };
        })(defaults = MOD.defaults || (MOD.defaults = {}));
    })(MOD = RIAPP.MOD || (RIAPP.MOD = {}));
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    var MOD;
    (function (MOD) {
        var parser;
        (function (parser) {
            parser._isModuleLoaded = false;
            parser._initModule = function (app) { };
        })(parser = MOD.parser || (MOD.parser = {}));
    })(MOD = RIAPP.MOD || (RIAPP.MOD = {}));
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    var MOD;
    (function (MOD) {
        var mvvm;
        (function (mvvm) {
            mvvm._isModuleLoaded = false;
            mvvm._initModule = function (app) { };
        })(mvvm = MOD.mvvm || (MOD.mvvm = {}));
    })(MOD = RIAPP.MOD || (RIAPP.MOD = {}));
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    var MOD;
    (function (MOD) {
        var baseElView;
        (function (baseElView) {
            baseElView._isModuleLoaded = false;
            baseElView._initModule = function (app) { };
            baseElView._isElView = function (obj) { return false; };
        })(baseElView = MOD.baseElView || (MOD.baseElView = {}));
    })(MOD = RIAPP.MOD || (RIAPP.MOD = {}));
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    var MOD;
    (function (MOD) {
        var binding;
        (function (binding) {
            binding._isModuleLoaded = false;
            binding._initModule = function (app) { };
            binding._isBinding = function (obj) { return false; };
        })(binding = MOD.binding || (MOD.binding = {}));
    })(MOD = RIAPP.MOD || (RIAPP.MOD = {}));
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    var MOD;
    (function (MOD) {
        var collection;
        (function (collection) {
            collection._isModuleLoaded = false;
            collection._initModule = function (app) { };
            collection._isCollection = function (obj) { return false; };
            collection._getItemByProp = function (obj, prop) {
                return null;
            };
        })(collection = MOD.collection || (MOD.collection = {}));
    })(MOD = RIAPP.MOD || (RIAPP.MOD = {}));
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    var MOD;
    (function (MOD) {
        var template;
        (function (template) {
            template._isModuleLoaded = false;
            template._initModule = function (app) { };
            template._isTemplateElView = function (obj) { return false; };
        })(template = MOD.template || (MOD.template = {}));
    })(MOD = RIAPP.MOD || (RIAPP.MOD = {}));
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    var MOD;
    (function (MOD) {
        var baseContent;
        (function (baseContent) {
            baseContent._isModuleLoaded = false;
            baseContent._initModule = function (app) { };
        })(baseContent = MOD.baseContent || (MOD.baseContent = {}));
    })(MOD = RIAPP.MOD || (RIAPP.MOD = {}));
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    var MOD;
    (function (MOD) {
        var dataform;
        (function (dataform) {
            dataform._isModuleLoaded = false;
            dataform._initModule = function (app) { };
            dataform._setIsInsideTemplate = function (elView) { };
            dataform._isDataForm = function (el) { return false; };
            dataform._isInsideDataForm = function (el) { return false; };
            dataform._isInNestedForm = function (root, forms, el) { return false; };
            dataform._getParentDataForm = function (rootForm, el) { return null; };
        })(dataform = MOD.dataform || (MOD.dataform = {}));
    })(MOD = RIAPP.MOD || (RIAPP.MOD = {}));
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    var MOD;
    (function (MOD) {
        var dynacontent;
        (function (dynacontent) {
            dynacontent._isModuleLoaded = false;
            dynacontent._initModule = function (app) { };
        })(dynacontent = MOD.dynacontent || (MOD.dynacontent = {}));
    })(MOD = RIAPP.MOD || (RIAPP.MOD = {}));
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    var MOD;
    (function (MOD) {
        var datepicker;
        (function (datepicker) {
            datepicker._isModuleLoaded = false;
            datepicker._initModule = function (app) { };
        })(datepicker = MOD.datepicker || (MOD.datepicker = {}));
    })(MOD = RIAPP.MOD || (RIAPP.MOD = {}));
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    var MOD;
    (function (MOD) {
        var tabs;
        (function (tabs) {
            tabs._isModuleLoaded = false;
            tabs._initModule = function (app) { };
        })(tabs = MOD.tabs || (MOD.tabs = {}));
    })(MOD = RIAPP.MOD || (RIAPP.MOD = {}));
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    var MOD;
    (function (MOD) {
        var listbox;
        (function (listbox) {
            listbox._isModuleLoaded = false;
            listbox._initModule = function (app) { };
        })(listbox = MOD.listbox || (MOD.listbox = {}));
    })(MOD = RIAPP.MOD || (RIAPP.MOD = {}));
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    var MOD;
    (function (MOD) {
        var datadialog;
        (function (datadialog) {
            datadialog._isModuleLoaded = false;
            datadialog._initModule = function (app) { };
        })(datadialog = MOD.datadialog || (MOD.datadialog = {}));
    })(MOD = RIAPP.MOD || (RIAPP.MOD = {}));
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    var MOD;
    (function (MOD) {
        var datagrid;
        (function (datagrid) {
            datagrid._isModuleLoaded = false;
            datagrid._initModule = function (app) { };
        })(datagrid = MOD.datagrid || (MOD.datagrid = {}));
    })(MOD = RIAPP.MOD || (RIAPP.MOD = {}));
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    var MOD;
    (function (MOD) {
        var pager;
        (function (pager) {
            pager._isModuleLoaded = false;
            pager._initModule = function (app) { };
        })(pager = MOD.pager || (MOD.pager = {}));
    })(MOD = RIAPP.MOD || (RIAPP.MOD = {}));
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    var MOD;
    (function (MOD) {
        var stackpanel;
        (function (stackpanel) {
            stackpanel._isModuleLoaded = false;
            stackpanel._initModule = function (app) { };
        })(stackpanel = MOD.stackpanel || (MOD.stackpanel = {}));
    })(MOD = RIAPP.MOD || (RIAPP.MOD = {}));
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    var MOD;
    (function (MOD) {
        var db;
        (function (db) {
            db._isModuleLoaded = false;
            db._initModule = function (app) { };
        })(db = MOD.db || (MOD.db = {}));
    })(MOD = RIAPP.MOD || (RIAPP.MOD = {}));
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    'use strict';
    var errMOD = RIAPP.MOD.errors;
    (function (DEBUG_LEVEL) {
        DEBUG_LEVEL[DEBUG_LEVEL["NONE"] = 0] = "NONE";
        DEBUG_LEVEL[DEBUG_LEVEL["NORMAL"] = 1] = "NORMAL";
        DEBUG_LEVEL[DEBUG_LEVEL["HIGH"] = 2] = "HIGH";
    })(RIAPP.DEBUG_LEVEL || (RIAPP.DEBUG_LEVEL = {}));
    var DEBUG_LEVEL = RIAPP.DEBUG_LEVEL;
    RIAPP.DebugLevel = DEBUG_LEVEL.NONE;
    function startDebugger() {
        debugger;
    }
    RIAPP.startDebugger = startDebugger;
    function throwDummy(origErr) {
        if (errMOD._isModuleLoaded && !!origErr && !origErr.isDummy) {
            throw errMOD.DummyError.create(origErr);
        }
        throw origErr;
    }
    RIAPP.throwDummy = throwDummy;
    function checkIsDummy(error) {
        return !!error && !!error.isDummy;
    }
    RIAPP.checkIsDummy = checkIsDummy;
    function reThrow(ex, isHandled) {
        if (!!isHandled)
            RIAPP.throwDummy(ex);
        else
            throw ex;
    }
    RIAPP.reThrow = reThrow;
    var ListHelper = (function () {
        function ListHelper() {
        }
        ListHelper.CreateList = function () {
            return { head: null, tail: null };
        };
        ListHelper.CreateNode = function (handler, ns, context) {
            var node = { fn: handler, ns: ns, next: null, context: !context ? null : context };
            return node;
        };
        ListHelper.countNodes = function (list) {
            if (!list)
                return 0;
            var cur = list.head, i = 0;
            while (!!cur) {
                cur = cur.next;
                ++i;
            }
            return i;
        };
        ListHelper.prependNode = function (list, node) {
            node.next = list.head;
            list.head = node;
            if (!list.tail)
                list.tail = list.head;
        };
        ListHelper.appendNode = function (list, node) {
            if (!list.head) {
                list.tail = node;
                list.head = node;
                return;
            }
            var old = list.tail;
            list.tail = node;
            old.next = node;
        };
        ListHelper.removeNodes = function (list, ns) {
            if (!list)
                return null;
            var head = list.head, prev = null, del, cur = head, next = (!cur) ? null : cur.next;
            while (!!cur) {
                if (ns == '*' || cur.ns == ns) {
                    del = cur;
                    if (!prev) {
                        head = next;
                        cur = head;
                        next = (!cur) ? null : cur.next;
                    }
                    else {
                        prev.next = next;
                        cur = next;
                        next = (!cur) ? null : cur.next;
                    }
                    del.next = null;
                }
                else {
                    prev = cur;
                    cur = cur.next;
                    next = (!cur) ? null : cur.next;
                }
            }
            list.head = head;
            list.tail = (!prev) ? head : prev;
        };
        ListHelper.toArray = function (list) {
            var res = [];
            if (!list)
                return res;
            var cur = list.head;
            while (!!cur) {
                res.push(cur);
                cur = cur.next;
            }
            return res;
        };
        return ListHelper;
    })();
    RIAPP.ListHelper = ListHelper;
    var ArrayHelper = (function () {
        function ArrayHelper() {
        }
        ArrayHelper.clone = function (arr) {
            if (arr.length === 1) {
                return [arr[0]];
            }
            else {
                return Array.apply(null, arr);
            }
        };
        ArrayHelper.fromList = function (list) {
            var array = new Array(list.length);
            for (var i = 0, n = list.length; i < n; i++)
                array[i] = list[i];
            return array;
        };
        ArrayHelper.fromCollection = function (list) {
            return ArrayHelper.fromList(list);
        };
        ArrayHelper.distinct = function (arr) {
            var o = {}, i, l = arr.length, r = [];
            for (i = 0; i < l; i += 1)
                o[arr[i]] = arr[i];
            var k = Object.keys(o);
            for (i = 0, l = k.length; i < l; i += 1)
                r.push(o[k[i]]);
            return r;
        };
        return ArrayHelper;
    })();
    RIAPP.ArrayHelper = ArrayHelper;
    var baseUtils = (function () {
        function baseUtils() {
        }
        baseUtils.getNewID = function () {
            var id = baseUtils._newID;
            baseUtils._newID += 1;
            return id;
        };
        baseUtils.isNull = function (a) {
            return a === null;
        };
        baseUtils.isUndefined = function (a) {
            return a === undefined;
        };
        baseUtils.isNt = function (a) {
            return (a === null || a === undefined);
        };
        baseUtils.isString = function (a) {
            if (baseUtils.isNt(a))
                return false;
            var rx = /string/i;
            return (typeof (a) === 'string') ? true : (typeof (a) === 'object') ? rx.test(a.constructor.toString()) : false;
        };
        baseUtils.isFunc = function (a) {
            if (baseUtils.isNt(a))
                return false;
            var rx = /Function/;
            return (typeof (a) === 'function') ? rx.test(a.constructor.toString()) : false;
        };
        baseUtils.isBoolean = function (a) {
            if (baseUtils.isNt(a))
                return false;
            var rx = /boolean/i;
            return (typeof (a) === 'boolean') ? true : (typeof (a) === 'object') ? rx.test(a.constructor.toString()) : false;
        };
        baseUtils.isDate = function (a) {
            if (baseUtils.isNt(a))
                return false;
            var rx = /date/i;
            return (typeof (a) === 'date') ? true : (typeof (a) === 'object') ? rx.test(a.constructor.toString()) : false;
        };
        baseUtils.isNumber = function (a) {
            if (baseUtils.isNt(a))
                return false;
            var rx = /Number/;
            return (typeof (a) === 'number') ? true : (typeof (a) === 'object') ? rx.test(a.constructor.toString()) : false;
        };
        baseUtils.isNumeric = function (obj) {
            return baseUtils.isNumber(obj) || (baseUtils.isString(obj) && !isNaN(Number(obj)));
        };
        baseUtils.endsWith = function (str, suffix) {
            return (str.substr(str.length - suffix.length) === suffix);
        };
        baseUtils.startsWith = function (str, prefix) {
            return (str.substr(0, prefix.length) === prefix);
        };
        baseUtils.fastTrim = function (str) {
            return str.replace(/^\s+|\s+$/g, '');
        };
        baseUtils.trim = function (str, chars) {
            if (!chars) {
                return baseUtils.fastTrim(str);
            }
            return baseUtils.ltrim(baseUtils.rtrim(str, chars), chars);
        };
        baseUtils.ltrim = function (str, chars) {
            chars = chars || "\\s";
            return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
        };
        baseUtils.rtrim = function (str, chars) {
            chars = chars || "\\s";
            return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
        };
        baseUtils.isArray = function (o) {
            if (!o)
                return false;
            return Array.isArray(o);
        };
        baseUtils.hasProp = function (obj, prop) {
            if (!obj)
                return false;
            var res = obj.hasOwnProperty(prop);
            if (res)
                return true;
            else {
                if (Object === obj)
                    return false;
                else {
                    var pr = Object.getPrototypeOf(obj);
                    return baseUtils.hasProp(pr, prop);
                }
            }
        };
        baseUtils.format = function (format_str) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var result = '';
            for (var i = 0;;) {
                var open = format_str.indexOf('{', i);
                var close = format_str.indexOf('}', i);
                if ((open < 0) && (close < 0)) {
                    result += format_str.slice(i);
                    break;
                }
                if ((close > 0) && ((close < open) || (open < 0))) {
                    if (format_str.charAt(close + 1) !== '}') {
                        throw new Error(baseUtils.format(RIAPP.ERRS.ERR_STRING_FORMAT_INVALID, format_str));
                    }
                    result += format_str.slice(i, close + 1);
                    i = close + 2;
                    continue;
                }
                result += format_str.slice(i, open);
                i = open + 1;
                if (format_str.charAt(i) === '{') {
                    result += '{';
                    i++;
                    continue;
                }
                if (close < 0)
                    throw new Error(baseUtils.format(RIAPP.ERRS.ERR_STRING_FORMAT_INVALID, format_str));
                var brace = format_str.substring(i, close);
                var colonIndex = brace.indexOf(':');
                var argNumber = parseInt((colonIndex < 0) ? brace : brace.substring(0, colonIndex), 10);
                if (isNaN(argNumber))
                    throw new Error(baseUtils.format(RIAPP.ERRS.ERR_STRING_FORMAT_INVALID, format_str));
                var argFormat = (colonIndex < 0) ? '' : brace.substring(colonIndex + 1);
                var arg = args[argNumber];
                if (arg === undefined || arg === null) {
                    arg = '';
                }
                if (arg.format) {
                    result += arg.format(argFormat);
                }
                else
                    result += arg.toString();
                i = close + 1;
            }
            return result;
        };
        baseUtils.setValue = function (root, namePath, val, checkOverwrite) {
            var parts = namePath.split('.'), parent = root, i;
            for (i = 0; i < parts.length - 1; i += 1) {
                if (!parent[parts[i]]) {
                    parent[parts[i]] = {};
                }
                parent = parent[parts[i]];
            }
            var n = parts[parts.length - 1];
            if (!!checkOverwrite && (parent[n] !== undefined)) {
                throw new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_OBJ_ALREADY_REGISTERED, namePath));
            }
            parent[n] = val;
        };
        baseUtils.getValue = function (root, namePath) {
            var parts = namePath.split('.'), parent = root, i, res;
            for (i = 0; i < parts.length; i += 1) {
                res = parent[parts[i]];
                if (res === undefined) {
                    return null;
                }
                parent = res;
            }
            return res;
        };
        baseUtils.removeValue = function (root, namePath) {
            var parts = namePath.split('.'), parent = root, i, val = null;
            for (i = 0; i < parts.length - 1; i += 1) {
                if (!parent[parts[i]]) {
                    return null;
                }
                parent = parent[parts[i]];
            }
            var n = parts[parts.length - 1];
            val = parent[n];
            if (val !== undefined) {
                delete parent[n];
            }
            return val;
        };
        baseUtils.resolveOwner = function (obj, path) {
            var parts = path.split('.'), i, res, len = parts.length;
            if (len == 1)
                return obj;
            res = obj;
            for (i = 0; i < len - 1; i += 1) {
                res = res[parts[i]];
                if (res === undefined)
                    return undefined;
                if (res === null)
                    return null;
            }
            return res;
        };
        baseUtils._newID = 0;
        return baseUtils;
    })();
    RIAPP.baseUtils = baseUtils;
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    'use strict';
    var OBJ_EVENTS = {
        error: 'error',
        destroyed: 'destroyed'
    };
    var BaseObject = (function () {
        function BaseObject() {
            this._isDestroyed = false;
            this._isDestroyCalled = false;
            this._events = null;
        }
        BaseObject.prototype._removeNsHandler = function (ev, ns) {
            var keys = Object.keys(ev), key, list;
            for (var i = 0, k = keys.length; i < k; ++i) {
                key = keys[i];
                list = ev[key];
                if (!!list) {
                    RIAPP.ListHelper.removeNodes(list, ns);
                    if (!list.head)
                        ev[key] = null;
                }
            }
        };
        BaseObject.prototype._getEventNames = function () {
            return [OBJ_EVENTS.error, OBJ_EVENTS.destroyed];
        };
        BaseObject.prototype._addHandler = function (name, handler, nmspace, context, prepend) {
            if (this._isDestroyed)
                return;
            if (!RIAPP.baseUtils.isFunc(handler)) {
                throw new Error(RIAPP.ERRS.ERR_EVENT_INVALID_FUNC);
            }
            if (!name)
                throw new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_EVENT_INVALID, name));
            if (this._events === null)
                this._events = {};
            var self = this, ev = self._events, n = name, ns = '*';
            if (!!nmspace)
                ns = '' + nmspace;
            var list = ev[n], node = RIAPP.ListHelper.CreateNode(handler, ns, context);
            if (!list) {
                ev[n] = list = RIAPP.ListHelper.CreateList();
            }
            if (!prepend) {
                RIAPP.ListHelper.appendNode(list, node);
            }
            else {
                RIAPP.ListHelper.prependNode(list, node);
            }
        };
        BaseObject.prototype._removeHandler = function (name, nmspace) {
            var self = this, ev = self._events, ns = '*';
            if (!ev)
                return;
            if (!!nmspace)
                ns = '' + nmspace;
            var list;
            if (!!name) {
                list = ev[name];
                if (!list)
                    return;
                if (ns == '*') {
                    RIAPP.ListHelper.removeNodes(list, ns);
                    ev[name] = null;
                }
                else {
                    RIAPP.ListHelper.removeNodes(list, ns);
                    if (!list.head)
                        ev[name] = null;
                }
                return;
            }
            this._removeNsHandler(ev, ns);
            if (ns == '*') {
                self._events = null;
            }
        };
        BaseObject.prototype._raiseEvent = function (name, args) {
            var self = this, ev = self._events;
            if (ev === null)
                return;
            if (ev === undefined) {
                throw new Error("The object's instance is invalid. The object constructor has not been called!");
            }
            if (!!name) {
                if (name != '0*' && name.charAt(0) == '0') {
                    this._raiseEvent('0*', args);
                }
                var events = RIAPP.ListHelper.toArray(ev[name]), cur;
                for (var i = 0; i < events.length; i++) {
                    cur = events[i];
                    cur.fn.apply(cur.context, [self, args]);
                }
            }
        };
        BaseObject.prototype._checkEventName = function (name) {
            var proto = Object.getPrototypeOf(this), map;
            if (!proto.hasOwnProperty("__evMap")) {
                var evn = this._getEventNames();
                map = {};
                for (var i = 0; i < evn.length; i++) {
                    map[evn[i]] = true;
                }
                proto.__evMap = map;
            }
            else
                map = proto.__evMap;
            if (!map[name]) {
                if (RIAPP.DebugLevel == RIAPP.DEBUG_LEVEL.HIGH) {
                    RIAPP.startDebugger();
                }
                var err = new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_EVENT_INVALID, name));
                this.handleError(err, this);
                throw err;
            }
        };
        BaseObject.prototype._isHasProp = function (prop) {
            return RIAPP.baseUtils.hasProp(this, prop);
        };
        BaseObject.prototype.handleError = function (error, source) {
            if (!!RIAPP.global && RIAPP.checkIsDummy(error)) {
                return true;
            }
            if (!error.message) {
                error = new Error('' + error);
            }
            var args = { error: error, source: source, isHandled: false };
            this._raiseEvent(OBJ_EVENTS.error, args);
            return args.isHandled;
        };
        BaseObject.prototype.raisePropertyChanged = function (name) {
            var data = { property: name };
            var parts = name.split('.'), lastPropName = parts[parts.length - 1];
            if (parts.length > 1) {
                var obj = RIAPP.baseUtils.resolveOwner(this, name);
                if (RIAPP.DebugLevel > RIAPP.DEBUG_LEVEL.NONE && RIAPP.baseUtils.isUndefined(obj)) {
                    if (RIAPP.DebugLevel == RIAPP.DEBUG_LEVEL.HIGH) {
                        RIAPP.startDebugger();
                    }
                    throw new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_PROP_NAME_INVALID, name));
                }
                if (obj instanceof BaseObject) {
                    obj.raiseEvent('0' + lastPropName, data);
                }
            }
            else {
                if (RIAPP.DebugLevel > RIAPP.DEBUG_LEVEL.NONE && !RIAPP.baseUtils.hasProp(this, lastPropName)) {
                    if (RIAPP.DebugLevel == RIAPP.DEBUG_LEVEL.HIGH) {
                        RIAPP.startDebugger();
                    }
                    throw new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_PROP_NAME_INVALID, lastPropName));
                }
                this.raiseEvent('0' + lastPropName, data);
            }
        };
        BaseObject.prototype.addHandler = function (name, handler, nmspace, context, prepend) {
            this._checkEventName(name);
            this._addHandler(name, handler, nmspace, context, prepend);
        };
        BaseObject.prototype.removeHandler = function (name, nmspace) {
            if (!!name) {
                this._checkEventName(name);
            }
            this._removeHandler(name, nmspace);
        };
        BaseObject.prototype.addOnDestroyed = function (handler, nmspace, context) {
            this._addHandler(OBJ_EVENTS.destroyed, handler, nmspace, context, false);
        };
        BaseObject.prototype.removeOnDestroyed = function (nmspace) {
            this._removeHandler(OBJ_EVENTS.destroyed, nmspace);
        };
        BaseObject.prototype.addOnError = function (handler, nmspace, context) {
            this._addHandler(OBJ_EVENTS.error, handler, nmspace, context, false);
        };
        BaseObject.prototype.removeOnError = function (nmspace) {
            this._removeHandler(OBJ_EVENTS.error, nmspace);
        };
        BaseObject.prototype.removeNSHandlers = function (nmspace) {
            this._removeHandler(null, nmspace);
        };
        BaseObject.prototype.raiseEvent = function (name, args) {
            if (!name)
                throw new Error(RIAPP.ERRS.ERR_EVENT_INVALID);
            if (name.charAt(0) != '0')
                this._checkEventName(name);
            this._raiseEvent(name, args);
        };
        BaseObject.prototype.addOnPropertyChange = function (prop, handler, nmspace, context) {
            if (!prop)
                throw new Error(RIAPP.ERRS.ERR_PROP_NAME_EMPTY);
            if (RIAPP.DebugLevel > RIAPP.DEBUG_LEVEL.NONE && prop != '*' && !this._isHasProp(prop)) {
                if (RIAPP.DebugLevel == RIAPP.DEBUG_LEVEL.HIGH) {
                    RIAPP.startDebugger();
                }
                throw new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_PROP_NAME_INVALID, prop));
            }
            prop = '0' + prop;
            this._addHandler(prop, handler, nmspace, context, false);
        };
        BaseObject.prototype.removeOnPropertyChange = function (prop, nmspace) {
            if (!!prop) {
                if (RIAPP.DebugLevel > RIAPP.DEBUG_LEVEL.NONE && prop != '*' && !this._isHasProp(prop)) {
                    if (RIAPP.DebugLevel == RIAPP.DEBUG_LEVEL.HIGH) {
                        RIAPP.startDebugger();
                    }
                    throw new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_PROP_NAME_INVALID, prop));
                }
                prop = '0' + prop;
            }
            this._removeHandler(prop, nmspace);
        };
        BaseObject.prototype.getIsDestroyed = function () {
            return this._isDestroyed;
        };
        BaseObject.prototype.getIsDestroyCalled = function () {
            return this._isDestroyCalled;
        };
        BaseObject.prototype.destroy = function () {
            if (this._isDestroyed)
                return;
            this._isDestroyed = true;
            this._isDestroyCalled = true;
            try {
                this._raiseEvent(OBJ_EVENTS.destroyed, {});
            }
            finally {
                this._removeHandler(null, null);
            }
        };
        return BaseObject;
    })();
    RIAPP.BaseObject = BaseObject;
})(RIAPP || (RIAPP = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RIAPP;
(function (RIAPP) {
    var utilsMOD = RIAPP.MOD.utils;
    var parserMOD = RIAPP.MOD.parser;
    var defMOD = RIAPP.MOD.defaults;
    var datepickerMOD = RIAPP.MOD.datepicker;
    RIAPP.global = null;
    RIAPP.css_riaTemplate = 'ria-template';
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
    var Global = (function (_super) {
        __extends(Global, _super);
        function Global(window, jQuery) {
            _super.call(this);
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
            this._exports = {};
            this._templateLoaders = {};
            this._templateGroups = {};
            this._promises = [];
            this._parser = null;
            this._isReady = false;
            this._isInitialized = false;
            this._internal = {
                initialize: function () {
                    self._initialize();
                },
                trackSelectable: function (selectable) {
                    self._trackSelectable(selectable);
                },
                untrackSelectable: function (selectable) {
                    self._untrackSelectable(selectable);
                },
                registerApp: function (app) {
                    self._registerApp(app);
                },
                unregisterApp: function (app) {
                    self._unregisterApp(app);
                },
                destroyApps: function () {
                    self._destroyApps();
                },
                registerObject: function (root, name, obj) {
                    self._registerObject(root, name, obj);
                },
                getObject: function (root, name) {
                    return self._getObject(root, name);
                },
                removeObject: function (root, name) {
                    self._removeObject(root, name);
                },
                processTemplateSections: function (root) {
                    self._processTemplateSections(root);
                },
                loadTemplatesAsync: function (fn_loader, app) {
                    return self._loadTemplatesAsync(fn_loader, app);
                },
                registerTemplateLoader: function (name, loader) {
                    self._registerTemplateLoader(name, loader);
                },
                getTemplateLoader: function (name) {
                    return self._getTemplateLoader(name);
                },
                registerTemplateGroup: function (groupName, group) {
                    self._registerTemplateGroup(groupName, group);
                },
                getTemplateGroup: function (name) {
                    return self._getTemplateGroup(name);
                },
                waitForNotLoading: function (callback, callbackArgs) {
                    self._waitForNotLoading(callback, callbackArgs);
                },
                getConverter: function (name) {
                    return self._getConverter(name);
                },
                onUnResolvedBinding: function (bindTo, root, path, propName) {
                    self._onUnResolvedBinding(bindTo, root, path, propName);
                }
            };
            this._onCreate();
        }
        Global.prototype._onCreate = function () {
            var self = this;
            self.$(self.document).ready(function ($) {
                self._waitQueue = new utilsMOD.WaitQueue(self);
                self._isReady = true;
                self._processTemplateSections(self.document);
                self.raiseEvent(GLOB_EVENTS.load, {});
                setTimeout(function () { self.removeHandler(GLOB_EVENTS.load, null); }, 0);
            });
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
            self.window.onerror = function (msg, url, linenumber) {
                if (!!msg && msg.toString().indexOf("DUMMY_ERROR") > -1) {
                    return true;
                }
                alert('Error: ' + msg + '\nURL: ' + url + '\nLine Number: ' + linenumber);
                return false;
            };
        };
        Global.prototype._processTemplateSection = function (templateSection, app) {
            var self = this;
            var templates = RIAPP.ArrayHelper.fromList(templateSection.querySelectorAll(Global._TEMPLATE_SELECTOR));
            templates.forEach(function (el) {
                var tmpDiv = self.document.createElement('div'), html, name = el.getAttribute('id'), deferred = self.utils.createDeferred();
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
        };
        Global.prototype._registerTemplateLoaderCore = function (name, loader) {
            RIAPP.baseUtils.setValue(this._templateLoaders, name, loader, false);
        };
        Global.prototype._getTemplateLoaderCore = function (name) {
            return RIAPP.baseUtils.getValue(this._templateLoaders, name);
        };
        Global.prototype._getEventNames = function () {
            var base_events = _super.prototype._getEventNames.call(this);
            var events = Object.keys(GLOB_EVENTS).map(function (key, i, arr) { return GLOB_EVENTS[key]; });
            return events.concat(base_events);
        };
        Global.prototype._addHandler = function (name, fn, nmspace, context, prepend) {
            var self = this;
            if ((name == GLOB_EVENTS.load && self._isReady) || (name == GLOB_EVENTS.initialized && self._isInitialized)) {
                setTimeout(function () { fn.apply(self, [self, {}]); }, 0);
                return;
            }
            _super.prototype._addHandler.call(this, name, fn, nmspace, context, prepend);
        };
        Global.prototype._initialize = function () {
            if (this._isInitialized)
                return;
            var self = this, isOK, name;
            name = 'utils';
            isOK = utilsMOD._isModuleLoaded;
            if (isOK)
                self._utils = new utilsMOD.Utils();
            name = 'parser';
            isOK = parserMOD._isModuleLoaded;
            if (isOK)
                self._parser = new parserMOD.Parser();
            name = 'defaults';
            isOK = defMOD._isModuleLoaded;
            if (isOK) {
                self._defaults = new defMOD.Defaults();
            }
            name = 'datepicker';
            isOK = datepickerMOD._isModuleLoaded;
            if (isOK && !!self._defaults) {
                self._defaults.datepicker = self.getType('IDatepicker');
            }
            if (!isOK)
                throw new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_MODULE_NOT_REGISTERED, name));
            this._isInitialized = true;
            self.raiseEvent(GLOB_EVENTS.initialized, {});
            setTimeout(function () { self.removeHandler(GLOB_EVENTS.initialized, null); }, 0);
        };
        Global.prototype._trackSelectable = function (selectable) {
            var self = this, utils = self.utils, isel = selectable.getISelectable(), el = isel.getContainerEl();
            self.$(el).on("click." + isel.getUniqueID(), function (e) {
                e.stopPropagation();
                var target = e.target;
                if (utils.isContained(target, el))
                    self.currentSelectable = selectable;
            });
        };
        Global.prototype._untrackSelectable = function (selectable) {
            var self = this, utils = self.utils, isel = selectable.getISelectable(), el = isel.getContainerEl();
            self.$(el).off("click." + isel.getUniqueID());
            if (this.currentSelectable === selectable)
                this.currentSelectable = null;
        };
        Global.prototype._registerApp = function (app) {
            if (!this._appInst[app.appName])
                this._appInst[app.appName] = app;
        };
        Global.prototype._unregisterApp = function (app) {
            if (!this._appInst[app.appName])
                return;
            delete this._appInst[app.appName];
            delete this._templateLoaders[app.appName];
            delete this._templateGroups[app.appName];
        };
        Global.prototype._destroyApps = function () {
            var self = this;
            this.utils.forEachProp(this._appInst, function (id) {
                self._appInst[id].destroy();
            });
        };
        Global.prototype._registerObject = function (root, name, obj) {
            RIAPP.baseUtils.setValue(root.getExports(), name, obj, true);
        };
        Global.prototype._getObject = function (root, name) {
            return RIAPP.baseUtils.getValue(root.getExports(), name);
        };
        Global.prototype._removeObject = function (root, name) {
            return RIAPP.baseUtils.removeValue(root.getExports(), name);
        };
        Global.prototype._processTemplateSections = function (root) {
            var self = this;
            var sections = RIAPP.ArrayHelper.fromList(root.querySelectorAll(Global._TEMPLATES_SELECTOR));
            sections.forEach(function (el) {
                self._processTemplateSection(el, null);
                self.utils.removeNode(el);
            });
        };
        Global.prototype._loadTemplatesAsync = function (fn_loader, app) {
            var self = this, promise = fn_loader(), old = self.isLoading;
            self._promises.push(promise);
            if (self.isLoading !== old)
                self.raisePropertyChanged(PROP_NAME.isLoading);
            var deferred = self.utils.createDeferred();
            promise.then(function (html) {
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
            }, function (err) {
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
        };
        Global.prototype._registerTemplateLoader = function (name, loader) {
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
                if ((!prevLoader.fn_loader && !!prevLoader.groupName) && (!loader.groupName && !!loader.fn_loader)) {
                    return self._registerTemplateLoaderCore(name, loader);
                }
                throw new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_TEMPLATE_ALREADY_REGISTERED, name));
            }
            return self._registerTemplateLoaderCore(name, loader);
        };
        Global.prototype._getTemplateLoader = function (name) {
            var self = this, loader = self._getTemplateLoaderCore(name);
            if (!loader)
                return null;
            if (!loader.fn_loader && !!loader.groupName) {
                var group = self._getTemplateGroup(loader.groupName);
                if (!group) {
                    throw new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_TEMPLATE_GROUP_NOTREGISTERED, loader.groupName));
                }
                return function () {
                    if (!group.promise) {
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
        };
        Global.prototype._registerTemplateGroup = function (groupName, group) {
            var self = this, group2 = self.utils.extend(false, {
                fn_loader: null,
                url: null,
                names: null,
                app: null,
                promise: null
            }, group);
            if (!!group2.url && !group2.fn_loader) {
                group2.fn_loader = function () {
                    return self.utils.performAjaxGet(group2.url);
                };
            }
            RIAPP.baseUtils.setValue(self._templateGroups, groupName, group2, true);
            group2.names.forEach(function (name) {
                if (!!group2.app) {
                    name = group2.app.appName + '.' + name;
                }
                self._registerTemplateLoader(name, {
                    groupName: groupName,
                    fn_loader: null
                });
            });
        };
        Global.prototype._getTemplateGroup = function (name) {
            return RIAPP.baseUtils.getValue(this._templateGroups, name);
        };
        Global.prototype._waitForNotLoading = function (callback, callbackArgs) {
            this._waitQueue.enQueue({
                prop: PROP_NAME.isLoading,
                groupName: null,
                predicate: function (val) {
                    return !val;
                },
                action: callback,
                actionArgs: callbackArgs
            });
        };
        Global.prototype._getConverter = function (name) {
            var name2 = 'converters.' + name;
            var res = this._getObject(this, name2);
            if (!res)
                throw new Error(this.utils.format(RIAPP.ERRS.ERR_CONVERTER_NOTREGISTERED, name));
            return res;
        };
        Global.prototype._onUnResolvedBinding = function (bindTo, root, path, propName) {
            var args = { bindTo: bindTo, root: root, path: path, propName: propName };
            this.raiseEvent(GLOB_EVENTS.unresolvedBinding, args);
        };
        Global.prototype._getInternal = function () {
            return this._internal;
        };
        Global.prototype.addOnLoad = function (fn, nmspace, context) {
            this._addHandler(GLOB_EVENTS.load, fn, nmspace, context, false);
        };
        Global.prototype.addOnUnLoad = function (fn, nmspace, context) {
            this._addHandler(GLOB_EVENTS.unload, fn, nmspace, context, false);
        };
        Global.prototype.addOnInitialize = function (fn, nmspace, context) {
            this._addHandler(GLOB_EVENTS.initialized, fn, nmspace, context, false);
        };
        Global.prototype.addOnUnResolvedBinding = function (fn, nmspace, context) {
            this._addHandler(GLOB_EVENTS.unresolvedBinding, fn, nmspace, context, false);
        };
        Global.prototype.removeOnUnResolvedBinding = function (nmspace) {
            this._removeHandler(GLOB_EVENTS.unresolvedBinding, nmspace);
        };
        Global.prototype.getExports = function () {
            return this._exports;
        };
        Global.prototype.findApp = function (name) {
            return this._appInst[name];
        };
        Global.prototype.destroy = function () {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            var self = this;
            if (!!self._waitQueue) {
                self._waitQueue.destroy();
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
            _super.prototype.destroy.call(this);
        };
        Global.prototype.registerType = function (name, obj) {
            var name2 = 'types.' + name;
            return this._registerObject(this, name2, obj);
        };
        Global.prototype.getType = function (name) {
            var name2 = 'types.' + name;
            return this._getObject(this, name2);
        };
        Global.prototype.registerConverter = function (name, obj) {
            var name2 = 'converters.' + name;
            if (!this._getObject(this, name2)) {
                this._registerObject(this, name2, obj);
            }
            else
                throw new Error(RIAPP.global.utils.format(RIAPP.ERRS.ERR_OBJ_ALREADY_REGISTERED, name));
        };
        Global.prototype.registerElView = function (name, elViewType) {
            var name2 = 'elvws.' + name;
            if (!this._getObject(this, name2)) {
                this._registerObject(this, name2, elViewType);
            }
            else
                throw new Error(RIAPP.global.utils.format(RIAPP.ERRS.ERR_OBJ_ALREADY_REGISTERED, name));
        };
        Global.prototype.getImagePath = function (imageName) {
            var images = this.defaults.imagesPath;
            return images + imageName;
        };
        Global.prototype.loadTemplates = function (url) {
            var self = this;
            this._loadTemplatesAsync(function () {
                return self.utils.performAjaxGet(url);
            }, null);
        };
        Global.prototype.toString = function () {
            return 'Global';
        };
        Object.defineProperty(Global.prototype, "parser", {
            get: function () { return this._parser; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Global.prototype, "isLoading", {
            get: function () {
                return this._promises.length > 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Global.prototype, "$", {
            get: function () {
                return this._$;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Global.prototype, "window", {
            get: function () {
                return this._window;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Global.prototype, "document", {
            get: function () {
                return this._window.document;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Global.prototype, "currentSelectable", {
            get: function () {
                return this._currentSelectable;
            },
            set: function (v) {
                if (this._currentSelectable !== v) {
                    this._currentSelectable = v;
                    this.raisePropertyChanged(PROP_NAME.curSelectable);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Global.prototype, "defaults", {
            get: function () {
                return this._defaults;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Global.prototype, "utils", {
            get: function () {
                return this._utils;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Global.prototype, "UC", {
            get: function () {
                return this._userCode;
            },
            enumerable: true,
            configurable: true
        });
        Global.vesion = '2.7.7';
        Global._TEMPLATES_SELECTOR = ['section.', RIAPP.css_riaTemplate].join('');
        Global._TEMPLATE_SELECTOR = '*[data-role="template"]';
        return Global;
    })(RIAPP.BaseObject);
    RIAPP.Global = Global;
    RIAPP.global = new Global(window, jQuery);
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    var MOD;
    (function (MOD) {
        var utils;
        (function (utils) {
            var base_utils = RIAPP.baseUtils;
            var Checks = (function () {
                function Checks() {
                }
                Checks.isHTML = function (a) {
                    if (Checks.isNt(a))
                        return false;
                    var rx = /html/i;
                    return (typeof (a) === 'object') ? rx.test(a.constructor.toString()) : false;
                };
                Checks.isObject = function (a) {
                    if (Checks.isNt(a))
                        return false;
                    var rx = /object/i;
                    return (typeof (a) === 'object') ? rx.test(a.constructor.toString()) : false;
                };
                Checks.isSimpleObject = function (a) {
                    if (Checks.isNt(a))
                        return false;
                    var res = Checks.isObject(a);
                    return res && (Object.prototype === Object.getPrototypeOf(a));
                };
                Checks.isRegExp = function (a) {
                    if (Checks.isNt(a))
                        return false;
                    var rx = /regexp/i;
                    return (typeof (a) === 'function') ? rx.test(a.constructor.toString()) : false;
                };
                Checks.isBoolString = function (a) {
                    if (Checks.isNt(a))
                        return false;
                    return (a == 'true' || a == 'false');
                };
                Checks.isBaseObj = function (obj) {
                    return !!obj && obj instanceof RIAPP.BaseObject;
                };
                Checks.isEditable = function (obj) {
                    return !!obj && obj instanceof RIAPP.BaseObject && !!obj.beginEdit && !!obj.endEdit && !!obj.cancelEdit && RIAPP.global.utils.hasProp(obj, 'isEditing');
                };
                Checks.isSubmittable = function (obj) {
                    return !!obj && !!obj.submitChanges && !!obj.rejectChanges && RIAPP.global.utils.hasProp(obj, 'isCanSubmit');
                };
                Checks.isErrorNotification = function (obj) {
                    if (!obj)
                        return false;
                    if (!Checks.isFunction(obj.getIErrorNotification))
                        return false;
                    var tmp = obj.getIErrorNotification();
                    return !!tmp && Checks.isFunction(tmp.getIErrorNotification);
                };
                Checks.isNull = base_utils.isNull;
                Checks.isUndefined = base_utils.isUndefined;
                Checks.isNt = base_utils.isNt;
                Checks.isFunction = base_utils.isFunc;
                Checks.isString = base_utils.isString;
                Checks.isArray = base_utils.isArray;
                Checks.isBoolean = base_utils.isBoolean;
                Checks.isDate = base_utils.isDate;
                Checks.isNumber = base_utils.isNumber;
                Checks.isNumeric = base_utils.isNumeric;
                return Checks;
            })();
            utils.Checks = Checks;
            var StringUtils = (function () {
                function StringUtils() {
                }
                StringUtils.formatNumber = function (num, decimals, dec_point, thousands_sep) {
                    num = (num + '').replace(/[^0-9+-Ee.]/g, '');
                    var n = !isFinite(+num) ? 0 : +num, prec = !isFinite(+decimals) ? 0 : Math.abs(decimals), sep = (thousands_sep === undefined) ? ',' : thousands_sep, dec = (dec_point === undefined) ? '.' : dec_point, s = [''], toFixedFix = function (n, prec) {
                        var k = Math.pow(10, prec);
                        return '' + Math.round(n * k) / k;
                    };
                    if (Checks.isNt(decimals)) {
                        s = ('' + n).split('.');
                        prec = 2;
                    }
                    else
                        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
                    var i, s0 = '', len = s[0].length;
                    if (len > 3) {
                        for (i = 0; i < len; i += 1) {
                            s0 = s0 + s[0].charAt(i);
                            if (i < (len - 1) && (len - i - 1) % 3 === 0)
                                s0 = s0 + sep;
                        }
                        s[0] = s0;
                    }
                    if ((s[1] || '').length < prec) {
                        s[1] = s[1] || '';
                        s[1] += new Array(prec - s[1].length + 1).join('0');
                    }
                    return s.join(dec);
                };
                StringUtils.stripNonNumeric = function (str) {
                    str += '';
                    var rgx = /^\d|\.|-$/;
                    var out = '';
                    for (var i = 0; i < str.length; i++) {
                        if (rgx.test(str.charAt(i))) {
                            if (!((str.charAt(i) == '.' && out.indexOf('.') != -1) ||
                                (str.charAt(i) == '-' && out.length != 0))) {
                                out += str.charAt(i);
                            }
                        }
                    }
                    return out;
                };
                StringUtils.endsWith = base_utils.endsWith;
                StringUtils.startsWith = base_utils.startsWith;
                StringUtils.trim = base_utils.trim;
                return StringUtils;
            })();
            utils.StringUtils = StringUtils;
            ;
            var Validations = (function () {
                function Validations() {
                }
                Validations.checkNumRange = function (num, range) {
                    var rangeParts = range.split(',');
                    if (!!rangeParts[0]) {
                        if (num < parseFloat(rangeParts[0])) {
                            throw new Error(base_utils.format(RIAPP.ERRS.ERR_FIELD_RANGE, num, range));
                        }
                    }
                    if (!!rangeParts[1]) {
                        if (num > parseFloat(rangeParts[1])) {
                            throw new Error(base_utils.format(RIAPP.ERRS.ERR_FIELD_RANGE, num, range));
                        }
                    }
                };
                Validations._dtRangeToDate = function (str) {
                    var dtParts = str.split('-');
                    var dt = new Date(parseInt(dtParts[0], 10), parseInt(dtParts[1], 10) - 1, parseInt(dtParts[2], 10));
                    return dt;
                };
                Validations.checkDateRange = function (dt, range) {
                    var rangeParts = range.split(',');
                    if (!!rangeParts[0]) {
                        if (dt < Validations._dtRangeToDate(rangeParts[0])) {
                            throw new Error(base_utils.format(RIAPP.ERRS.ERR_FIELD_RANGE, dt, range));
                        }
                    }
                    if (!!rangeParts[1]) {
                        if (dt > Validations._dtRangeToDate(rangeParts[1])) {
                            throw new Error(base_utils.format(RIAPP.ERRS.ERR_FIELD_RANGE, dt, range));
                        }
                    }
                };
                return Validations;
            })();
            utils.Validations = Validations;
            ;
            utils.valueUtils = {
                valueToDate: function (val, dtcnv, stz) {
                    if (!val)
                        return null;
                    val = '' + val;
                    var parts = val.split("-");
                    if (parts.length != 7) {
                        throw new Error(base_utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'val', val));
                    }
                    var dt = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10), parseInt(parts[3], 10), parseInt(parts[4], 10), parseInt(parts[5], 10), (!!parts[6]) ? parseInt(parts[6], 10) : 0);
                    var ctz = RIAPP.global.utils.get_timeZoneOffset();
                    switch (dtcnv) {
                        case 0:
                            break;
                        case 1:
                            dt.setMinutes(dt.getMinutes() + stz);
                            dt.setMinutes(dt.getMinutes() - ctz);
                            break;
                        case 2:
                            dt.setMinutes(dt.getMinutes() - ctz);
                            break;
                        default:
                            throw new Error(base_utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'dtcnv', dtcnv));
                    }
                    return dt;
                },
                dateToValue: function (dt, dtcnv, serverTZ) {
                    if (dt === null)
                        return null;
                    if (!Checks.isDate(dt))
                        throw new Error(base_utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'dt', dt));
                    var ctz = RIAPP.global.utils.get_timeZoneOffset();
                    switch (dtcnv) {
                        case 0:
                            break;
                        case 1:
                            dt.setMinutes(dt.getMinutes() + ctz);
                            dt.setMinutes(dt.getMinutes() - serverTZ);
                            break;
                        case 2:
                            dt.setMinutes(dt.getMinutes() + ctz);
                            break;
                        default:
                            throw new Error(base_utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'dtcnv', dtcnv));
                    }
                    return ("" + dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate() + "-" + dt.getHours() + "-" + dt.getMinutes() + "-" + dt.getSeconds() + "-" + dt.getMilliseconds());
                },
                compareVals: function (v1, v2, dataType) {
                    if ((v1 === null && v2 !== null) || (v1 !== null && v2 === null))
                        return false;
                    switch (dataType) {
                        case 6:
                        case 7:
                        case 8:
                            if (Checks.isDate(v1) && Checks.isDate(v2))
                                return v1.getTime() === v2.getTime();
                            else
                                return false;
                        default:
                            return v1 === v2;
                    }
                },
                stringifyValue: function (v, dcnv, dataType, stz) {
                    var res = null;
                    if (Checks.isNt(v))
                        return res;
                    function conv(v) {
                        if (Checks.isDate(v))
                            return utils.valueUtils.dateToValue(v, dcnv, stz);
                        else if (Checks.isArray(v))
                            return JSON.stringify(v);
                        else if (Checks.isString(v))
                            return v;
                        else
                            return JSON.stringify(v);
                    }
                    ;
                    var isOK = false;
                    switch (dataType) {
                        case 0:
                            res = conv(v);
                            isOK = true;
                            break;
                        case 1:
                        case 9:
                            if (Checks.isString(v)) {
                                res = v;
                                isOK = true;
                            }
                            break;
                        case 2:
                            if (Checks.isBoolean(v)) {
                                res = JSON.stringify(v);
                                isOK = true;
                            }
                            break;
                        case 3:
                        case 4:
                        case 5:
                            if (Checks.isNumber(v)) {
                                res = JSON.stringify(v);
                                isOK = true;
                            }
                            break;
                        case 6:
                        case 7:
                        case 8:
                            if (Checks.isDate(v)) {
                                res = utils.valueUtils.dateToValue(v, dcnv, stz);
                                isOK = true;
                            }
                            break;
                        case 10:
                            if (Checks.isArray(v)) {
                                res = JSON.stringify(v);
                                isOK = true;
                            }
                            break;
                        default:
                            throw new Error(base_utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'dataType', dataType));
                    }
                    if (!isOK)
                        throw new Error(base_utils.format(RIAPP.ERRS.ERR_FIELD_WRONG_TYPE, v, dataType));
                    return res;
                },
                parseValue: function (v, dataType, dcnv, stz) {
                    var res = null;
                    if (v === undefined || v === null)
                        return res;
                    switch (dataType) {
                        case 0:
                            res = v;
                            break;
                        case 1:
                        case 9:
                            res = v;
                            break;
                        case 2:
                            res = RIAPP.global.utils.parseBool(v);
                            break;
                        case 3:
                            res = parseInt(v, 10);
                            break;
                        case 4:
                        case 5:
                            res = parseFloat(v);
                            break;
                        case 6:
                        case 7:
                        case 8:
                            res = utils.valueUtils.valueToDate(v, dcnv, stz);
                            break;
                        case 10:
                            res = JSON.parse(v);
                            break;
                        default:
                            throw new Error(base_utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'dataType', dataType));
                    }
                    return res;
                }
            };
            var LifeTimeScope = (function (_super) {
                __extends(LifeTimeScope, _super);
                function LifeTimeScope() {
                    _super.call(this);
                    this._objs = [];
                }
                LifeTimeScope.create = function () {
                    return new LifeTimeScope();
                };
                LifeTimeScope.prototype.addObj = function (b) {
                    if (this._objs.indexOf(b) < 0)
                        this._objs.push(b);
                };
                LifeTimeScope.prototype.removeObj = function (b) {
                    RIAPP.global.utils.removeFromArray(this._objs, b);
                };
                LifeTimeScope.prototype.getObjs = function () {
                    return this._objs;
                };
                LifeTimeScope.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this._objs.forEach(function (obj) {
                        if (!obj.getIsDestroyCalled())
                            obj.destroy();
                    });
                    this._objs = [];
                    _super.prototype.destroy.call(this);
                };
                LifeTimeScope.prototype.toString = function () {
                    return 'LifeTimeScope';
                };
                return LifeTimeScope;
            })(RIAPP.BaseObject);
            utils.LifeTimeScope = LifeTimeScope;
            var PropWatcher = (function (_super) {
                __extends(PropWatcher, _super);
                function PropWatcher() {
                    _super.call(this);
                    this._objId = 'prw' + base_utils.getNewID();
                    this._objs = [];
                }
                PropWatcher.create = function () {
                    return new PropWatcher();
                };
                PropWatcher.prototype.addPropWatch = function (obj, prop, fn_onChange) {
                    var self = this;
                    obj.addOnPropertyChange(prop, function (s, a) {
                        fn_onChange(a.property);
                    }, self.uniqueID);
                    if (self._objs.indexOf(obj) < 0)
                        self._objs.push(obj);
                };
                PropWatcher.prototype.addWatch = function (obj, props, fn_onChange) {
                    var self = this;
                    obj.addOnPropertyChange('*', function (s, a) {
                        if (props.indexOf(a.property) > -1) {
                            fn_onChange(a.property);
                        }
                    }, self.uniqueID);
                    if (self._objs.indexOf(obj) < 0)
                        self._objs.push(obj);
                };
                PropWatcher.prototype.removeWatch = function (obj) {
                    obj.removeNSHandlers(this.uniqueID);
                };
                PropWatcher.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    var self = this;
                    this._objs.forEach(function (obj) {
                        self.removeWatch(obj);
                    });
                    this._objs = [];
                    _super.prototype.destroy.call(this);
                };
                PropWatcher.prototype.toString = function () {
                    return 'PropWatcher ' + this._objId;
                };
                Object.defineProperty(PropWatcher.prototype, "uniqueID", {
                    get: function () {
                        return this._objId;
                    },
                    enumerable: true,
                    configurable: true
                });
                return PropWatcher;
            })(RIAPP.BaseObject);
            utils.PropWatcher = PropWatcher;
            var WaitQueue = (function (_super) {
                __extends(WaitQueue, _super);
                function WaitQueue(owner) {
                    _super.call(this);
                    this._objId = 'wq' + base_utils.getNewID();
                    this._owner = owner;
                    this._queue = {};
                }
                WaitQueue.create = function (owner) {
                    return new WaitQueue(owner);
                };
                WaitQueue.prototype._checkQueue = function (prop, value) {
                    if (!this._owner || this._owner.getIsDestroyCalled()) {
                        return;
                    }
                    var self = this, propQueue = this._queue[prop], task;
                    if (!propQueue || propQueue.length == 0) {
                        return;
                    }
                    var i, firstWinsTask = null, groups = { group: null, tasks: [] }, found = [], forRemoval = [];
                    for (i = 0; i < propQueue.length; i += 1) {
                        task = propQueue[i];
                        if (task.predicate(value)) {
                            if (!task.group && groups.tasks.length == 0) {
                                firstWinsTask = task;
                                break;
                            }
                            else if (!!task.group) {
                                if (!groups.group) {
                                    groups.group = task.group;
                                }
                                if (groups.group === task.group) {
                                    groups.tasks.push(task);
                                }
                            }
                        }
                    }
                    if (!!firstWinsTask) {
                        found.push(firstWinsTask);
                        forRemoval.push(firstWinsTask);
                    }
                    else {
                        while (groups.tasks.length > 0) {
                            task = groups.tasks.pop();
                            if (!firstWinsTask) {
                                firstWinsTask = task;
                            }
                            if (firstWinsTask.lastWins) {
                                if (found.length == 0)
                                    found.push(task);
                            }
                            else
                                found.push(task);
                            forRemoval.push(task);
                        }
                    }
                    try {
                        if (found.length > 0) {
                            i = propQueue.length;
                            while (i > 0) {
                                i -= 1;
                                if (forRemoval.indexOf(propQueue[i]) > -1) {
                                    propQueue.splice(i, 1);
                                }
                            }
                            found.forEach(function (task) {
                                try {
                                    task.action.apply(self._owner, task.args);
                                }
                                catch (ex) {
                                    self._owner.handleError(ex, self);
                                }
                            });
                        }
                    }
                    finally {
                        if (propQueue.length == 0) {
                            delete this._queue[prop];
                            this._owner.removeOnPropertyChange(prop, this.uniqueID);
                        }
                    }
                };
                WaitQueue.prototype.enQueue = function (item) {
                    var opts = RIAPP.global.utils.extend(false, {
                        prop: "",
                        groupName: null,
                        predicate: null,
                        action: null,
                        actionArgs: [],
                        lastWins: false,
                        syncCheck: false
                    }, item);
                    var self = this;
                    if (!this._owner)
                        return;
                    var property = opts.prop, propQueue = this._queue[property];
                    if (!propQueue) {
                        propQueue = [];
                        this._queue[property] = propQueue;
                        this._owner.addOnPropertyChange(property, function (s, a) {
                            setTimeout(function () {
                                if (self.getIsDestroyCalled())
                                    return;
                                self._checkQueue(property, self._owner[property]);
                            }, 0);
                        }, self.uniqueID);
                    }
                    var task = {
                        predicate: opts.predicate,
                        action: opts.action,
                        group: opts.groupName,
                        lastWins: opts.lastWins,
                        args: (!opts.actionArgs ? [] : opts.actionArgs)
                    };
                    propQueue.push(task);
                    if (!!opts.syncCheck) {
                        self._checkQueue(property, self._owner[property]);
                    }
                    else {
                        setTimeout(function () {
                            if (self.getIsDestroyCalled())
                                return;
                            self._checkQueue(property, self._owner[property]);
                        }, 0);
                    }
                };
                WaitQueue.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this._owner.removeNSHandlers(this.uniqueID);
                    this._queue = {};
                    this._owner = null;
                    _super.prototype.destroy.call(this);
                };
                WaitQueue.prototype.toString = function () {
                    return 'WaitQueue ' + this._objId;
                };
                Object.defineProperty(WaitQueue.prototype, "uniqueID", {
                    get: function () {
                        return this._objId;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(WaitQueue.prototype, "owner", {
                    get: function () {
                        return this._owner;
                    },
                    enumerable: true,
                    configurable: true
                });
                return WaitQueue;
            })(RIAPP.BaseObject);
            utils.WaitQueue = WaitQueue;
            var Utils = (function () {
                function Utils() {
                    this.slice = Array.prototype.slice;
                    this.get_timeZoneOffset = (function () {
                        var dt = new Date();
                        var tz = dt.getTimezoneOffset();
                        return function () {
                            return tz;
                        };
                    })();
                    this.format = base_utils.format;
                    this.uuid = (function () {
                        var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
                        return function (len, radix) {
                            var i, chars = CHARS, uuid = [], rnd = Math.random;
                            radix = radix || chars.length;
                            if (!!len) {
                                for (i = 0; i < len; i += 1)
                                    uuid[i] = chars[0 | rnd() * radix];
                            }
                            else {
                                var r;
                                uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
                                uuid[14] = '4';
                                for (i = 0; i < 36; i += 1) {
                                    if (!uuid[i]) {
                                        r = 0 | rnd() * 16;
                                        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r & 0xf];
                                    }
                                }
                            }
                            return uuid.join('');
                        };
                    })();
                }
                Utils.create = function () {
                    return new Utils();
                };
                Object.defineProperty(Utils.prototype, "check", {
                    get: function () {
                        return Checks;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Utils.prototype, "str", {
                    get: function () {
                        return StringUtils;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Utils.prototype, "validation", {
                    get: function () {
                        return Validations;
                    },
                    enumerable: true,
                    configurable: true
                });
                Utils.prototype.getNewID = function () {
                    return base_utils.getNewID();
                };
                Utils.prototype.isContained = function (oNode, oCont) {
                    if (!oNode)
                        return false;
                    while (!!(oNode = oNode.parentNode))
                        if (oNode === oCont)
                            return true;
                    return false;
                };
                Utils.prototype.parseBool = function (bool_value) {
                    if (Checks.isBoolean(bool_value))
                        return bool_value;
                    var v = base_utils.trim(bool_value).toLowerCase();
                    if (v === 'false')
                        return false;
                    if (v === 'true')
                        return true;
                    throw new Error(this.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'bool_value', bool_value));
                };
                Utils.prototype.round = function (num, decimals) {
                    return parseFloat(num.toFixed(decimals));
                };
                Utils.prototype.performAjaxCall = function (url, postData, async, fn_success, fn_error, context) {
                    var req = new XMLHttpRequest(), mimeType = 'application/json; charset=utf-8';
                    req.open('POST', url, async);
                    var deferred = this.createDeferred();
                    req.responseType = 'text';
                    req.onload = function (e) {
                        if (this.status == 200) {
                            var res = this.response;
                            deferred.resolve(res);
                        }
                    };
                    req.onerror = function (e) {
                        deferred.reject(new Error(e.target.status));
                    };
                    req.ontimeout = function () {
                        deferred.reject(new Error("The request for " + url + " timed out."));
                    };
                    req.timeout = RIAPP.global.defaults.ajaxTimeOut * 1000;
                    req.setRequestHeader('Content-Type', mimeType);
                    req.send(postData);
                    var promise = deferred.promise();
                    if (!!fn_success) {
                        promise.done(function (data) {
                            fn_success.call(context, data);
                        });
                    }
                    if (!!fn_error) {
                        promise.fail(function (err) {
                            fn_error.call(context, err);
                        });
                    }
                    return promise;
                };
                Utils.prototype.performAjaxGet = function (url) {
                    var req = new XMLHttpRequest();
                    req.open('GET', url, true);
                    var deferred = this.createDeferred();
                    req.responseType = 'text';
                    req.onload = function (e) {
                        if (this.status == 200) {
                            var res = this.response;
                            deferred.resolve(res);
                        }
                    };
                    req.onerror = function (e) {
                        deferred.reject(new Error(e.target.status));
                    };
                    req.ontimeout = function () {
                        deferred.reject(new Error("The request for " + url + " timed out."));
                    };
                    req.timeout = RIAPP.global.defaults.ajaxTimeOut * 1000;
                    req.send(null);
                    var promise = deferred.promise();
                    return promise;
                };
                Utils.prototype.extend = function (deep, defaults, options) {
                    if (deep)
                        return this.cloneObj(options, defaults);
                    else
                        return this.mergeObj(options, defaults);
                };
                Utils.prototype.removeNode = function (node) {
                    if (!node)
                        return;
                    var pnd = node.parentNode;
                    if (!!pnd)
                        pnd.removeChild(node);
                };
                Utils.prototype.insertAfter = function (referenceNode, newNode) {
                    var parent = referenceNode.parentNode;
                    if (parent.lastChild === referenceNode)
                        parent.appendChild(newNode);
                    else
                        parent.insertBefore(newNode, referenceNode.nextSibling);
                };
                Utils.prototype.getProps = function (obj) {
                    return Object.getOwnPropertyNames(obj);
                };
                Utils.prototype.forEachProp = function (obj, fn) {
                    var names = Object.getOwnPropertyNames(obj);
                    names.forEach(fn);
                };
                Utils.prototype.hasProp = function (obj, prop) {
                    return base_utils.hasProp(obj, prop);
                };
                Utils.prototype.createDeferred = function () {
                    return RIAPP.global.$.Deferred();
                };
                Utils.prototype.isDeferredPending = function (deferred) {
                    return deferred.state() == "pending";
                };
                Utils.prototype.cloneObj = function (o, mergeIntoObj) {
                    var c, i, len, self = this;
                    if (!o) {
                        return o;
                    }
                    if (self.check.isArray(o)) {
                        len = o.length;
                        c = new Array(len);
                        for (i = 0; i < len; i += 1) {
                            c[i] = self.cloneObj(o[i], null);
                        }
                    }
                    else if (self.check.isSimpleObject(o)) {
                        c = mergeIntoObj || {};
                        var p, keys = Object.getOwnPropertyNames(o);
                        len = keys.length;
                        for (i = 0; i < len; i += 1) {
                            p = keys[i];
                            c[p] = self.cloneObj(o[p], null);
                        }
                    }
                    else
                        return o;
                    return c;
                };
                Utils.prototype.shallowCopy = function (o) {
                    return this.mergeObj(o, {});
                };
                Utils.prototype.mergeObj = function (obj, mergeIntoObj) {
                    if (!mergeIntoObj) {
                        mergeIntoObj = {};
                    }
                    if (!obj)
                        return mergeIntoObj;
                    var names = Object.getOwnPropertyNames(obj), n;
                    for (var i = 0, len = names.length; i < len; i += 1) {
                        n = names[i];
                        mergeIntoObj[n] = obj[n];
                    }
                    return mergeIntoObj;
                };
                Utils.prototype.removeFromArray = function (array, obj) {
                    var i = array.indexOf(obj);
                    if (i > -1) {
                        array.splice(i, 1);
                    }
                    return i;
                };
                Utils.prototype.insertIntoArray = function (array, obj, pos) {
                    array.splice(pos, 0, obj);
                };
                Utils.prototype.getErrorNotification = function (obj) {
                    if (!obj)
                        return null;
                    if (!!obj._aspect && Checks.isErrorNotification(obj._aspect))
                        return obj._aspect.getIErrorNotification();
                    else if (Checks.isErrorNotification(obj))
                        return obj.getIErrorNotification();
                    else
                        return null;
                };
                Utils.prototype.getEditable = function (obj) {
                    if (!obj)
                        return null;
                    if (!!obj._aspect && Checks.isEditable(obj._aspect)) {
                        return obj._aspect;
                    }
                    else if (Checks.isEditable(obj)) {
                        return obj;
                    }
                    else
                        return null;
                };
                Utils.prototype.getSubmittable = function (obj) {
                    if (!obj)
                        return null;
                    if (!!obj._aspect && Checks.isSubmittable(obj._aspect)) {
                        return obj._aspect;
                    }
                    else if (Checks.isSubmittable(obj)) {
                        return obj;
                    }
                    else
                        return null;
                };
                Utils.prototype.destroyJQueryPlugin = function ($el, name) {
                    var plugin = $el.data(name);
                    if (!!plugin) {
                        $el[name]('destroy');
                    }
                };
                return Utils;
            })();
            utils.Utils = Utils;
            RIAPP.global.registerType('PropWatcher', PropWatcher);
            RIAPP.global.registerType('LifeTimeScope', LifeTimeScope);
            RIAPP.global.registerType('WaitQueue', WaitQueue);
            utils._isModuleLoaded = true;
        })(utils = MOD.utils || (MOD.utils = {}));
    })(MOD = RIAPP.MOD || (RIAPP.MOD = {}));
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    var MOD;
    (function (MOD) {
        var errors;
        (function (errors) {
            var BaseError = (function (_super) {
                __extends(BaseError, _super);
                function BaseError(message) {
                    _super.call(this);
                    this._message = message;
                    this._isDummy = false;
                    this._origError = null;
                }
                BaseError.create = function (message) {
                    return new BaseError(message);
                };
                BaseError.prototype.toString = function () {
                    return this._message;
                };
                Object.defineProperty(BaseError.prototype, "message", {
                    get: function () {
                        return this._message;
                    },
                    set: function (v) {
                        this._message = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseError.prototype, "isDummy", {
                    get: function () {
                        return this._isDummy;
                    },
                    set: function (v) {
                        this._isDummy = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseError.prototype, "origError", {
                    get: function () {
                        return this._origError;
                    },
                    set: function (v) {
                        this._origError = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                return BaseError;
            })(RIAPP.BaseObject);
            errors.BaseError = BaseError;
            var DummyError = (function (_super) {
                __extends(DummyError, _super);
                function DummyError(ex) {
                    _super.call(this, "DUMMY_ERROR");
                    this.origError = ex;
                    this.isDummy = true;
                }
                DummyError.create = function (ex) {
                    return new DummyError(ex);
                };
                return DummyError;
            })(BaseError);
            errors.DummyError = DummyError;
            var ValidationError = (function (_super) {
                __extends(ValidationError, _super);
                function ValidationError(errorInfo, item) {
                    var message = RIAPP.ERRS.ERR_VALIDATION + '\r\n', i = 0;
                    errorInfo.forEach(function (err) {
                        if (i > 0)
                            message = message + '\r\n';
                        if (!!err.fieldName)
                            message = message + ' ' + RIAPP.localizable.TEXT.txtField + ': ' + err.fieldName + ' -> ' + err.errors.join(', ');
                        else
                            message = message + err.errors.join(', ');
                        i += 1;
                    });
                    _super.call(this, message);
                    this._errors = errorInfo;
                    this._item = item;
                }
                Object.defineProperty(ValidationError.prototype, "item", {
                    get: function () {
                        return this._item;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ValidationError.prototype, "errors", {
                    get: function () {
                        return this._errors;
                    },
                    enumerable: true,
                    configurable: true
                });
                return ValidationError;
            })(BaseError);
            errors.ValidationError = ValidationError;
            errors._isModuleLoaded = true;
        })(errors = MOD.errors || (MOD.errors = {}));
    })(MOD = RIAPP.MOD || (RIAPP.MOD = {}));
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    var MOD;
    (function (MOD) {
        var converter;
        (function (converter) {
            converter.NUM_CONV = { None: 0, Integer: 1, Decimal: 2, Float: 3, SmallInt: 4 };
            var BaseConverter = (function () {
                function BaseConverter() {
                }
                BaseConverter.prototype.convertToSource = function (val, param, dataContext) {
                    return val;
                };
                BaseConverter.prototype.convertToTarget = function (val, param, dataContext) {
                    if (RIAPP.global.utils.check.isNt(val))
                        return null;
                    return val;
                };
                return BaseConverter;
            })();
            converter.BaseConverter = BaseConverter;
            ;
            var baseConverter = new BaseConverter();
            var DateConverter = (function () {
                function DateConverter() {
                }
                DateConverter.prototype.convertToSource = function (val, param, dataContext) {
                    if (!val)
                        return null;
                    var defaults = RIAPP.global.defaults, datepicker = defaults.datepicker;
                    if (!!datepicker)
                        return datepicker.parseDate(val);
                    else
                        return dateTimeConverter.convertToSource(val, defaults.dateFormat, dataContext);
                };
                DateConverter.prototype.convertToTarget = function (val, param, dataContext) {
                    if (RIAPP.global.utils.check.isNt(val))
                        return '';
                    var defaults = RIAPP.global.defaults, datepicker = defaults.datepicker;
                    if (!!datepicker)
                        return datepicker.formatDate(val);
                    else
                        return dateTimeConverter.convertToTarget(val, defaults.dateFormat, dataContext);
                };
                DateConverter.prototype.toString = function () {
                    return 'DateConverter';
                };
                return DateConverter;
            })();
            converter.DateConverter = DateConverter;
            ;
            var dateConverter = new DateConverter();
            var DateTimeConverter = (function () {
                function DateTimeConverter() {
                }
                DateTimeConverter.prototype.convertToSource = function (val, param, dataContext) {
                    if (!val)
                        return null;
                    var m = moment(val, param);
                    if (!m.isValid()) {
                        throw new Error(RIAPP.global.utils.format(RIAPP.ERRS.ERR_CONV_INVALID_DATE, val));
                    }
                    return m.toDate();
                };
                DateTimeConverter.prototype.convertToTarget = function (val, param, dataContext) {
                    if (RIAPP.global.utils.check.isNt(val)) {
                        return '';
                    }
                    var m = moment(val);
                    return m.format(param);
                };
                DateTimeConverter.prototype.toString = function () {
                    return 'DateTimeConverter';
                };
                return DateTimeConverter;
            })();
            converter.DateTimeConverter = DateTimeConverter;
            ;
            var dateTimeConverter = new DateTimeConverter();
            var NumberConverter = (function () {
                function NumberConverter() {
                }
                NumberConverter.prototype.convertToSource = function (val, param, dataContext) {
                    var utils = RIAPP.global.utils;
                    if (RIAPP.global.utils.check.isNt(val))
                        return null;
                    var defaults = RIAPP.global.defaults, dp = defaults.decimalPoint, thousand_sep = defaults.thousandSep, prec = 4;
                    var value = val.replace(thousand_sep, '');
                    value = value.replace(dp, '.');
                    value = RIAPP.global.utils.str.stripNonNumeric(value);
                    if (value === '') {
                        return null;
                    }
                    var num = null;
                    switch (param) {
                        case converter.NUM_CONV.SmallInt:
                            num = parseInt(value, 10);
                            break;
                        case converter.NUM_CONV.Integer:
                            num = parseInt(value, 10);
                            break;
                        case converter.NUM_CONV.Decimal:
                            prec = defaults.decPrecision;
                            num = utils.round(parseFloat(value), prec);
                            break;
                        case converter.NUM_CONV.Float:
                            num = parseFloat(value);
                            break;
                        default:
                            num = Number(value);
                    }
                    if (!utils.check.isNumber(num)) {
                        throw new Error(utils.format(RIAPP.ERRS.ERR_CONV_INVALID_NUM, val));
                    }
                    return num;
                };
                NumberConverter.prototype.convertToTarget = function (val, param, dataContext) {
                    var utils = RIAPP.global.utils;
                    if (utils.check.isNt(val)) {
                        return '';
                    }
                    var defaults = RIAPP.global.defaults, dp = defaults.decimalPoint, thousand_sep = defaults.thousandSep, prec;
                    switch (param) {
                        case converter.NUM_CONV.Integer:
                            prec = 0;
                            return utils.str.formatNumber(val, prec, dp, thousand_sep);
                        case converter.NUM_CONV.Decimal:
                            prec = defaults.decPrecision;
                            return utils.str.formatNumber(val, prec, dp, thousand_sep);
                        case converter.NUM_CONV.SmallInt:
                            prec = 0;
                            return utils.str.formatNumber(val, prec, dp, '');
                        case converter.NUM_CONV.Float:
                            return utils.str.formatNumber(val, null, dp, thousand_sep);
                            break;
                        default:
                            return utils.str.formatNumber(val, null, dp, thousand_sep);
                    }
                };
                NumberConverter.prototype.toString = function () {
                    return 'NumberConverter';
                };
                return NumberConverter;
            })();
            converter.NumberConverter = NumberConverter;
            ;
            var numberConverter = new NumberConverter();
            var IntegerConverter = (function () {
                function IntegerConverter() {
                }
                IntegerConverter.prototype.convertToSource = function (val, param, dataContext) {
                    return numberConverter.convertToSource(val, converter.NUM_CONV.Integer, dataContext);
                };
                IntegerConverter.prototype.convertToTarget = function (val, param, dataContext) {
                    return numberConverter.convertToTarget(val, converter.NUM_CONV.Integer, dataContext);
                };
                IntegerConverter.prototype.toString = function () {
                    return 'IntegerConverter';
                };
                return IntegerConverter;
            })();
            converter.IntegerConverter = IntegerConverter;
            ;
            var integerConverter = new IntegerConverter();
            var SmallIntConverter = (function () {
                function SmallIntConverter() {
                }
                SmallIntConverter.prototype.convertToSource = function (val, param, dataContext) {
                    return numberConverter.convertToSource(val, converter.NUM_CONV.SmallInt, dataContext);
                };
                SmallIntConverter.prototype.convertToTarget = function (val, param, dataContext) {
                    return numberConverter.convertToTarget(val, converter.NUM_CONV.SmallInt, dataContext);
                };
                SmallIntConverter.prototype.toString = function () {
                    return 'SmallIntConverter';
                };
                return SmallIntConverter;
            })();
            converter.SmallIntConverter = SmallIntConverter;
            ;
            var smallIntConverter = new SmallIntConverter();
            var DecimalConverter = (function () {
                function DecimalConverter() {
                }
                DecimalConverter.prototype.convertToSource = function (val, param, dataContext) {
                    return numberConverter.convertToSource(val, converter.NUM_CONV.Decimal, dataContext);
                };
                DecimalConverter.prototype.convertToTarget = function (val, param, dataContext) {
                    return numberConverter.convertToTarget(val, converter.NUM_CONV.Decimal, dataContext);
                };
                DecimalConverter.prototype.toString = function () {
                    return 'DecimalConverter';
                };
                return DecimalConverter;
            })();
            converter.DecimalConverter = DecimalConverter;
            ;
            var decimalConverter = new DecimalConverter();
            var FloatConverter = (function () {
                function FloatConverter() {
                }
                FloatConverter.prototype.convertToSource = function (val, param, dataContext) {
                    return numberConverter.convertToSource(val, converter.NUM_CONV.Float, dataContext);
                };
                FloatConverter.prototype.convertToTarget = function (val, param, dataContext) {
                    return numberConverter.convertToTarget(val, converter.NUM_CONV.Float, dataContext);
                };
                FloatConverter.prototype.toString = function () {
                    return 'FloatConverter';
                };
                return FloatConverter;
            })();
            converter.FloatConverter = FloatConverter;
            ;
            var floatConverter = new FloatConverter();
            var NotConverter = (function () {
                function NotConverter() {
                }
                NotConverter.prototype.convertToSource = function (val, param, dataContext) {
                    return !val;
                };
                NotConverter.prototype.convertToTarget = function (val, param, dataContext) {
                    return !val;
                };
                return NotConverter;
            })();
            converter.NotConverter = NotConverter;
            RIAPP.global.registerConverter('BaseConverter', baseConverter);
            RIAPP.global.registerConverter('dateConverter', dateConverter);
            RIAPP.global.registerConverter('dateTimeConverter', dateTimeConverter);
            RIAPP.global.registerConverter('numberConverter', numberConverter);
            RIAPP.global.registerConverter('integerConverter', integerConverter);
            RIAPP.global.registerConverter('smallIntConverter', smallIntConverter);
            RIAPP.global.registerConverter('decimalConverter', decimalConverter);
            RIAPP.global.registerConverter('floatConverter', floatConverter);
            RIAPP.global.registerConverter('notConverter', new NotConverter());
            converter._isModuleLoaded = true;
        })(converter = MOD.converter || (MOD.converter = {}));
    })(MOD = RIAPP.MOD || (RIAPP.MOD = {}));
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    var MOD;
    (function (MOD) {
        var defaults;
        (function (defaults) {
            var PROP_NAME = {
                ajaxTimeOut: 'ajaxTimeOut',
                dateFormat: 'dateFormat',
                timeFormat: 'timeFormat',
                dateTimeFormat: 'dateTimeFormat',
                datepicker: 'datepicker',
                imagesPath: 'imagesPath',
                decimalPoint: 'decimalPoint',
                thousandSep: 'thousandSep',
                decPrecision: 'decPrecision'
            };
            var Defaults = (function (_super) {
                __extends(Defaults, _super);
                function Defaults() {
                    _super.call(this);
                    this._datepicker = null;
                    this._dateFormat = 'DD.MM.YYYY';
                    this._dateTimeFormat = 'DD.MM.YYYY HH:mm:ss';
                    this._timeFormat = 'HH:mm:ss';
                    this._imagesPath = '/Scripts/jriapp/img/';
                    this._decimalPoint = ',';
                    this._thousandSep = ' ';
                    this._decPrecision = 2;
                    this._ajaxTimeOut = 600;
                }
                Defaults.prototype.toString = function () {
                    return 'Defaults';
                };
                Object.defineProperty(Defaults.prototype, "ajaxTimeOut", {
                    get: function () {
                        return this._ajaxTimeOut;
                    },
                    set: function (v) {
                        if (this._ajaxTimeOut !== v) {
                            this._ajaxTimeOut = v;
                            this.raisePropertyChanged(PROP_NAME.ajaxTimeOut);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Defaults.prototype, "dateFormat", {
                    get: function () { return this._dateFormat; },
                    set: function (v) {
                        if (this._dateFormat !== v) {
                            this._dateFormat = v;
                            this.raisePropertyChanged(PROP_NAME.dateFormat);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Defaults.prototype, "timeFormat", {
                    get: function () { return this._timeFormat; },
                    set: function (v) {
                        if (this._timeFormat !== v) {
                            this._timeFormat = v;
                            this.raisePropertyChanged(PROP_NAME.timeFormat);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Defaults.prototype, "dateTimeFormat", {
                    get: function () { return this._dateTimeFormat; },
                    set: function (v) {
                        if (this._dateTimeFormat !== v) {
                            this._dateTimeFormat = v;
                            this.raisePropertyChanged(PROP_NAME.dateTimeFormat);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Defaults.prototype, "datepicker", {
                    get: function () { return this._datepicker; },
                    set: function (v) {
                        if (this._datepicker !== v) {
                            this._datepicker = v;
                            this.raisePropertyChanged(PROP_NAME.datepicker);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Defaults.prototype, "imagesPath", {
                    get: function () { return this._imagesPath; },
                    set: function (v) {
                        if (!v)
                            v = "";
                        if (this._imagesPath !== v) {
                            if (!RIAPP.baseUtils.endsWith(v, '/')) {
                                this._imagesPath = v + '/';
                            }
                            else
                                this._imagesPath = v;
                            this.raisePropertyChanged(PROP_NAME.imagesPath);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Defaults.prototype, "decimalPoint", {
                    get: function () { return this._decimalPoint; },
                    set: function (v) {
                        if (this._decimalPoint !== v) {
                            this._decimalPoint = v;
                            this.raisePropertyChanged(PROP_NAME.decimalPoint);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Defaults.prototype, "thousandSep", {
                    get: function () { return this._thousandSep; },
                    set: function (v) {
                        if (this._thousandSep !== v) {
                            this._thousandSep = v;
                            this.raisePropertyChanged(PROP_NAME.thousandSep);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Defaults.prototype, "decPrecision", {
                    get: function () { return this._decPrecision; },
                    set: function (v) {
                        if (this._decPrecision !== v) {
                            this._decPrecision = v;
                            this.raisePropertyChanged(PROP_NAME.decPrecision);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return Defaults;
            })(RIAPP.BaseObject);
            defaults.Defaults = Defaults;
            defaults._isModuleLoaded = true;
        })(defaults = MOD.defaults || (MOD.defaults = {}));
    })(MOD = RIAPP.MOD || (RIAPP.MOD = {}));
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    var MOD;
    (function (MOD) {
        var parser;
        (function (parser) {
            var collMOD = RIAPP.MOD.collection;
            var utils;
            RIAPP.global.addOnInitialize(function (s, args) {
                utils = s.utils;
            });
            var Parser = (function () {
                function Parser() {
                }
                Parser.prototype._getKeyVals = function (val) {
                    var i, ch, literal, parts = [], kv = { key: '', val: '' }, isKey = true, bracePart, vd1 = Parser.__valueDelimeter1, vd2 = Parser.__valueDelimeter2, kvd = Parser.__keyValDelimeter;
                    var addNewKeyValPair = function (kv) {
                        if (kv.val) {
                            if (utils.check.isNumeric(kv.val)) {
                                kv.val = Number(kv.val);
                            }
                            else if (utils.check.isBoolString(kv.val)) {
                                kv.val = utils.parseBool(kv.val);
                            }
                        }
                        parts.push(kv);
                    };
                    var checkTokens = function (kv) {
                        if (kv.val === '' && utils.str.startsWith(kv.key, 'this.')) {
                            kv.val = kv.key.substr(5);
                            kv.key = 'targetPath';
                        }
                    };
                    for (i = 0; i < val.length; i += 1) {
                        ch = val.charAt(i);
                        if (ch == "'" || ch == '"') {
                            if (!literal)
                                literal = ch;
                            else if (literal == ch)
                                literal = null;
                        }
                        if (!literal && ch === "{" && !isKey) {
                            bracePart = val.substr(i);
                            bracePart = this.getBraceParts(bracePart, true)[0];
                            kv.val += bracePart;
                            i += bracePart.length - 1;
                            continue;
                        }
                        if (!literal && ch === kvd) {
                            if (!!kv.key) {
                                addNewKeyValPair(kv);
                                kv = { key: '', val: '' };
                                isKey = true;
                            }
                        }
                        else if (!literal && (ch === vd1 || ch === vd2)) {
                            isKey = false;
                        }
                        else {
                            if (isKey)
                                kv.key += ch;
                            else
                                kv.val += ch;
                        }
                    }
                    if (!!kv.key) {
                        addNewKeyValPair(kv);
                    }
                    parts.forEach(function (kv) {
                        kv.key = utils.str.trim(kv.key);
                        if (utils.check.isString(kv.val))
                            kv.val = utils.str.trim(kv.val);
                        checkTokens(kv);
                    });
                    parts = parts.filter(function (kv) {
                        return kv.val !== '';
                    });
                    return parts;
                };
                Parser.prototype.getPathParts = function (path) {
                    var self = this, parts = (!path) ? [] : path.split('.'), parts2 = [];
                    parts.forEach(function (part) {
                        var matches, obj, index;
                        matches = part.match(Parser.__indexedPropRX);
                        if (!!matches) {
                            obj = matches[1];
                            index = matches[2];
                            parts2.push(obj);
                            parts2.push('[' + index + ']');
                        }
                        else
                            parts2.push(part);
                    });
                    return parts2;
                };
                Parser.prototype.resolveProp = function (obj, prop) {
                    if (!prop)
                        return obj;
                    if (utils.str.startsWith(prop, '[')) {
                        prop = this.trimQuotes(this.trimBrackets(prop));
                        if (collMOD._isCollection(obj)) {
                            return collMOD._getItemByProp(obj, prop);
                        }
                        else if (utils.check.isArray(obj)) {
                            return obj[parseInt(prop, 10)];
                        }
                        else
                            return obj[prop];
                    }
                    else
                        return obj[prop];
                };
                Parser.prototype.setPropertyValue = function (obj, prop, val) {
                    if (utils.str.startsWith(prop, '[')) {
                        prop = this.trimQuotes(this.trimBrackets(prop));
                        if (utils.check.isArray(obj)) {
                            obj[parseInt(prop, 10)] = val;
                        }
                        else
                            obj[prop] = val;
                    }
                    else
                        obj[prop] = val;
                };
                Parser.prototype.resolveBindingSource = function (root, srcParts) {
                    if (!root)
                        return undefined;
                    if (srcParts.length === 0) {
                        return root;
                    }
                    if (srcParts.length > 0) {
                        return this.resolveBindingSource(this.resolveProp(root, srcParts[0]), srcParts.slice(1));
                    }
                    throw new Error('Invalid operation');
                };
                Parser.prototype.resolvePath = function (obj, path) {
                    if (!path)
                        return obj;
                    var parts = this.getPathParts(path), res = obj, len = parts.length - 1;
                    for (var i = 0; i < len; i += 1) {
                        res = this.resolveProp(res, parts[i]);
                        if (!res)
                            return undefined;
                    }
                    return this.resolveProp(res, parts[len]);
                };
                Parser.prototype.getBraceParts = function (val, firstOnly) {
                    var i, s = '', ch, literal, cnt = 0, parts = [];
                    for (i = 0; i < val.length; i += 1) {
                        ch = val.charAt(i);
                        if (ch === "'" || ch === '"') {
                            if (!literal)
                                literal = ch;
                            else if (literal === ch)
                                literal = null;
                        }
                        if (!literal && ch === '{') {
                            cnt += 1;
                            s += ch;
                        }
                        else if (!literal && ch === '}') {
                            cnt -= 1;
                            s += ch;
                            if (cnt === 0) {
                                parts.push(s);
                                s = '';
                                if (firstOnly)
                                    return parts;
                            }
                        }
                        else {
                            if (cnt > 0) {
                                s += ch;
                            }
                        }
                    }
                    return parts;
                };
                Parser.prototype.trimOuterBraces = function (val) {
                    return utils.str.trim(val.replace(Parser.__trimOuterBracesRX, ''));
                };
                Parser.prototype.trimQuotes = function (val) {
                    return utils.str.trim(val.replace(Parser.__trimQuotsRX, ''));
                };
                Parser.prototype.trimBrackets = function (val) {
                    return utils.str.trim(val.replace(Parser.__trimBracketsRX, ''));
                };
                Parser.prototype.isWithOuterBraces = function (str) {
                    return (utils.str.startsWith(str, '{') && utils.str.endsWith(str, '}'));
                };
                Parser.prototype.parseOption = function (part) {
                    var res = {}, self = this;
                    part = utils.str.trim(part);
                    if (self.isWithOuterBraces(part))
                        part = self.trimOuterBraces(part);
                    var kvals = self._getKeyVals(part);
                    kvals.forEach(function (kv) {
                        var isString = utils.check.isString(kv.val);
                        if (isString && self.isWithOuterBraces(kv.val))
                            res[kv.key] = self.parseOption(kv.val);
                        else {
                            if (isString)
                                res[kv.key] = self.trimQuotes(kv.val);
                            else
                                res[kv.key] = kv.val;
                        }
                    });
                    return res;
                };
                Parser.prototype.parseOptions = function (str) {
                    var res = [], self = this;
                    str = utils.str.trim(str);
                    var parts = [str];
                    if (self.isWithOuterBraces(str)) {
                        parts = self.getBraceParts(str, false);
                    }
                    parts.forEach(function (part) {
                        res.push(self.parseOption(part));
                    });
                    return res;
                };
                Parser.prototype.toString = function () {
                    return 'Parser';
                };
                Parser.__trimOuterBracesRX = /^([{]){0,1}|([}]){0,1}$/g;
                Parser.__trimQuotsRX = /^(['"])+|(['"])+$/g;
                Parser.__trimBracketsRX = /^(\[)+|(\])+$/g;
                Parser.__indexedPropRX = /(^\w+)\s*\[\s*['"]?\s*([^'"]+)\s*['",]?\s*\]/i;
                Parser.__valueDelimeter1 = ':';
                Parser.__valueDelimeter2 = '=';
                Parser.__keyValDelimeter = ',';
                return Parser;
            })();
            parser.Parser = Parser;
            parser._isModuleLoaded = true;
        })(parser = MOD.parser || (MOD.parser = {}));
    })(MOD = RIAPP.MOD || (RIAPP.MOD = {}));
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    var MOD;
    (function (MOD) {
        var mvvm;
        (function (mvvm) {
            var CMD_EVENTS = {
                can_execute_changed: 'canExecute_changed'
            };
            var Command = (function (_super) {
                __extends(Command, _super);
                function Command(fn_action, thisObj, fn_canExecute) {
                    _super.call(this);
                    var utils = RIAPP.global.utils;
                    this._action = fn_action;
                    this._thisObj = !thisObj ? null : thisObj;
                    this._canExecute = fn_canExecute;
                    this._objId = 'cmd' + RIAPP.baseUtils.getNewID();
                }
                Command.prototype._getEventNames = function () {
                    var base_events = _super.prototype._getEventNames.call(this);
                    return [CMD_EVENTS.can_execute_changed].concat(base_events);
                };
                Command.prototype.addOnCanExecuteChanged = function (fn, nmspace, context) {
                    this._addHandler(CMD_EVENTS.can_execute_changed, fn, nmspace, context);
                };
                Command.prototype.removeOnCanExecuteChanged = function (nmspace) {
                    this._removeHandler(CMD_EVENTS.can_execute_changed, nmspace);
                };
                Command.prototype.canExecute = function (sender, param) {
                    if (!this._canExecute)
                        return true;
                    return this._canExecute.apply(this._thisObj, [sender, param]);
                };
                Command.prototype.execute = function (sender, param) {
                    if (!!this._action) {
                        this._action.apply(this._thisObj, [sender, param]);
                    }
                };
                Command.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this._action = null;
                    this._thisObj = null;
                    this._canExecute = null;
                    _super.prototype.destroy.call(this);
                };
                Command.prototype.raiseCanExecuteChanged = function () {
                    this.raiseEvent(CMD_EVENTS.can_execute_changed, {});
                };
                Command.prototype.toString = function () {
                    return 'Command';
                };
                return Command;
            })(RIAPP.BaseObject);
            mvvm.Command = Command;
            var BaseViewModel = (function (_super) {
                __extends(BaseViewModel, _super);
                function BaseViewModel(app) {
                    _super.call(this);
                    this._app = app;
                    this._objId = 'vm' + RIAPP.baseUtils.getNewID();
                }
                BaseViewModel.prototype.handleError = function (error, source) {
                    var isHandled = _super.prototype.handleError.call(this, error, source);
                    if (!isHandled) {
                        return this._app.handleError(error, source);
                    }
                    return isHandled;
                };
                BaseViewModel.prototype.toString = function () {
                    return 'BaseViewModel';
                };
                BaseViewModel.prototype.destroy = function () {
                    this._app = null;
                    _super.prototype.destroy.call(this);
                };
                Object.defineProperty(BaseViewModel.prototype, "uniqueID", {
                    get: function () {
                        return this._objId;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseViewModel.prototype, "$", {
                    get: function () { return RIAPP.global.$; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseViewModel.prototype, "app", {
                    get: function () { return this._app; },
                    enumerable: true,
                    configurable: true
                });
                return BaseViewModel;
            })(RIAPP.BaseObject);
            mvvm.BaseViewModel = BaseViewModel;
            RIAPP.global.registerType('Command', Command);
            RIAPP.global.registerType('BaseViewModel', BaseViewModel);
            mvvm._isModuleLoaded = true;
        })(mvvm = MOD.mvvm || (MOD.mvvm = {}));
    })(MOD = RIAPP.MOD || (RIAPP.MOD = {}));
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    var MOD;
    (function (MOD) {
        var baseElView;
        (function (baseElView) {
            var constsMOD = RIAPP.consts;
            var mvvmMOD = RIAPP.MOD.mvvm;
            var ERRTEXT = RIAPP.localizable.VALIDATE, utils;
            RIAPP.global.addOnInitialize(function (s, args) {
                utils = s.utils;
            });
            baseElView._isElView = function (obj) {
                return !!obj && obj instanceof BaseElView;
            };
            function fn_addToolTip($el, tip, isError, pos) {
                var options = {
                    content: {
                        text: tip
                    },
                    style: {
                        classes: !!isError ? baseElView.css.toolTipError : baseElView.css.toolTip
                    },
                    position: {
                        my: 'top left',
                        at: (!!pos) ? pos : 'bottom right',
                        viewport: RIAPP.global.$(RIAPP.global.window),
                        adjust: {
                            method: 'flip',
                            x: 0,
                            y: 0
                        }
                    },
                    hide: {
                        event: 'unfocus click mouseleave',
                        leave: true
                    }
                };
                if (!!$el.data('qtip')) {
                    if (!tip) {
                        $el.qtip('destroy', true);
                    }
                    else
                        $el.qtip('option', 'content.text', tip);
                }
                else if (!!tip) {
                    $el.qtip(options);
                }
            }
            baseElView.fn_addToolTip = fn_addToolTip;
            var PropChangedCommand = (function (_super) {
                __extends(PropChangedCommand, _super);
                function PropChangedCommand(fn_action, thisObj, fn_canExecute) {
                    _super.call(this, fn_action, thisObj, fn_canExecute);
                }
                return PropChangedCommand;
            })(mvvmMOD.Command);
            baseElView.PropChangedCommand = PropChangedCommand;
            baseElView.css = {
                toolTip: 'qtip',
                toolTipError: 'qtip-red',
                fieldError: 'ria-field-error',
                commandLink: 'ria-command-link',
                disabled: 'disabled',
                opacity: 'opacity',
                color: 'color',
                fontSize: 'font-size'
            };
            baseElView.PROP_NAME = {
                isVisible: 'isVisible',
                validationErrors: 'validationErrors',
                toolTip: 'toolTip',
                css: 'css',
                isEnabled: 'isEnabled',
                value: 'value',
                command: 'command',
                disabled: 'disabled',
                commandParam: 'commandParam',
                isBusy: 'isBusy',
                delay: 'delay',
                checked: 'checked',
                color: 'color',
                rows: 'rows',
                cols: 'cols',
                wrap: 'wrap',
                text: 'text',
                html: 'html',
                preventDefault: 'preventDefault',
                imageSrc: 'imageSrc',
                href: 'href',
                isExpanded: 'isExpanded',
                fontSize: 'fontSize',
                borderColor: 'borderColor',
                borderStyle: 'borderStyle',
                width: 'width',
                height: 'height',
                src: 'src'
            };
            var BaseElView = (function (_super) {
                __extends(BaseElView, _super);
                function BaseElView(app, el, options) {
                    _super.call(this);
                    this._app = app;
                    this._el = el;
                    this._$el = null;
                    this._oldDisplay = null;
                    this._objId = 'elv' + RIAPP.baseUtils.getNewID();
                    this._propChangedCommand = null;
                    app._getInternal().setElView(this._el, this);
                    this._errors = null;
                    this._toolTip = options.tip;
                    this._css = options.css;
                    this._init(options);
                    this._applyToolTip();
                }
                BaseElView.prototype._applyToolTip = function () {
                    if (!!this._toolTip) {
                        this._setToolTip(this.$el, this._toolTip);
                    }
                };
                BaseElView.prototype._init = function (options) {
                    if (!!this._css) {
                        this.$el.addClass(this._css);
                    }
                };
                BaseElView.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    var $el = this._$el, el = this._el;
                    if (!!$el)
                        $el.off('.' + this._objId);
                    try {
                        this._propChangedCommand = null;
                        this.validationErrors = null;
                        this.toolTip = null;
                        this._el = null;
                        this._$el = null;
                    }
                    finally {
                        this._app._getInternal().setElView(el, null);
                        this._app = null;
                    }
                    _super.prototype.destroy.call(this);
                };
                BaseElView.prototype.invokePropChanged = function (property) {
                    var self = this, data = { property: property };
                    if (!!self._propChangedCommand) {
                        self._propChangedCommand.execute(self, data);
                    }
                };
                BaseElView.prototype._getErrorTipInfo = function (errors) {
                    var tip = ['<b>', ERRTEXT.errorInfo, '</b>', '<br/>'];
                    errors.forEach(function (info) {
                        var res = '';
                        info.errors.forEach(function (str) {
                            res = res + ' ' + str;
                        });
                        tip.push(res);
                        res = '';
                    });
                    return tip.join('');
                };
                BaseElView.prototype._setFieldError = function (isError) {
                    var $el = this.$el;
                    if (isError) {
                        $el.addClass(baseElView.css.fieldError);
                    }
                    else {
                        $el.removeClass(baseElView.css.fieldError);
                    }
                };
                BaseElView.prototype._updateErrorUI = function (el, errors) {
                    if (!el) {
                        return;
                    }
                    var $el = this.$el;
                    if (!!errors && errors.length > 0) {
                        fn_addToolTip($el, this._getErrorTipInfo(errors), true);
                        this._setFieldError(true);
                    }
                    else {
                        this._setToolTip($el, this.toolTip);
                        this._setFieldError(false);
                    }
                };
                BaseElView.prototype.handleError = function (error, source) {
                    var isHandled = _super.prototype.handleError.call(this, error, source);
                    if (!isHandled) {
                        return this._app.handleError(error, source);
                    }
                    return isHandled;
                };
                BaseElView.prototype._setToolTip = function ($el, tip, isError) {
                    fn_addToolTip($el, tip, isError);
                };
                BaseElView.prototype.toString = function () {
                    return 'BaseElView';
                };
                Object.defineProperty(BaseElView.prototype, "$el", {
                    get: function () {
                        if (!!this._el && !this._$el)
                            this._$el = RIAPP.global.$(this._el);
                        return this._$el;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseElView.prototype, "el", {
                    get: function () { return this._el; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseElView.prototype, "uniqueID", {
                    get: function () { return this._objId; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseElView.prototype, "isVisible", {
                    get: function () {
                        var v = this.el.style.display;
                        return !(v === 'none');
                    },
                    set: function (v) {
                        v = !!v;
                        if (v !== this.isVisible) {
                            if (!v) {
                                this._oldDisplay = this.el.style.display;
                                this.el.style.display = 'none';
                            }
                            else {
                                if (!!this._oldDisplay)
                                    this.el.style.display = this._oldDisplay;
                                else
                                    this.el.style.display = '';
                            }
                            this.raisePropertyChanged(baseElView.PROP_NAME.isVisible);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseElView.prototype, "propChangedCommand", {
                    get: function () { return this._propChangedCommand; },
                    set: function (v) {
                        var old = this._propChangedCommand;
                        if (v !== old) {
                            this._propChangedCommand = v;
                            this.invokePropChanged('*');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseElView.prototype, "validationErrors", {
                    get: function () { return this._errors; },
                    set: function (v) {
                        if (v !== this._errors) {
                            this._errors = v;
                            this.raisePropertyChanged(baseElView.PROP_NAME.validationErrors);
                            this._updateErrorUI(this._el, this._errors);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseElView.prototype, "dataNameAttr", {
                    get: function () { return this._el.getAttribute(constsMOD.DATA_ATTR.DATA_NAME); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseElView.prototype, "toolTip", {
                    get: function () { return this._toolTip; },
                    set: function (v) {
                        if (this._toolTip != v) {
                            this._toolTip = v;
                            this._setToolTip(this.$el, v);
                            this.raisePropertyChanged(baseElView.PROP_NAME.toolTip);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseElView.prototype, "css", {
                    get: function () { return this._css; },
                    set: function (v) {
                        var $el = this.$el;
                        if (this._css != v) {
                            if (!!this._css)
                                $el.removeClass(this._css);
                            this._css = v;
                            if (!!this._css)
                                $el.addClass(this._css);
                            this.raisePropertyChanged(baseElView.PROP_NAME.css);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseElView.prototype, "app", {
                    get: function () { return this._app; },
                    enumerable: true,
                    configurable: true
                });
                return BaseElView;
            })(RIAPP.BaseObject);
            baseElView.BaseElView = BaseElView;
            var InputElView = (function (_super) {
                __extends(InputElView, _super);
                function InputElView(app, el, options) {
                    _super.call(this, app, el, options);
                }
                InputElView.prototype.toString = function () {
                    return 'InputElView';
                };
                Object.defineProperty(InputElView.prototype, "isEnabled", {
                    get: function () { return !this.el.disabled; },
                    set: function (v) {
                        v = !!v;
                        if (v !== this.isEnabled) {
                            this.el.disabled = !v;
                            this.raisePropertyChanged(baseElView.PROP_NAME.isEnabled);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(InputElView.prototype, "el", {
                    get: function () { return this._el; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(InputElView.prototype, "value", {
                    get: function () {
                        var el = this.el;
                        if (!el)
                            return '';
                        return el.value;
                    },
                    set: function (v) {
                        if (!this._el)
                            return;
                        var el = this.el;
                        var x = el.value;
                        var str = '' + v;
                        v = (v === null) ? '' : str;
                        if (x !== v) {
                            el.value = v;
                            this.raisePropertyChanged(baseElView.PROP_NAME.value);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return InputElView;
            })(BaseElView);
            baseElView.InputElView = InputElView;
            ;
            var CommandElView = (function (_super) {
                __extends(CommandElView, _super);
                function CommandElView(app, el, options) {
                    _super.call(this, app, el, options);
                    this._command = null;
                    this._commandParam = null;
                    if (!this.isEnabled) {
                        this.$el.addClass('disabled');
                    }
                }
                CommandElView.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._command) {
                        this._command.removeNSHandlers(this._objId);
                    }
                    this.command = null;
                    this.commandParam = null;
                    _super.prototype.destroy.call(this);
                };
                CommandElView.prototype.invokeCommand = function () {
                    var self = this, command = self.command, param = self.commandParam;
                    if (!!command && command.canExecute(self, param)) {
                        setTimeout(function () {
                            if (command.canExecute(self, param))
                                command.execute(self, param);
                        }, 0);
                    }
                };
                CommandElView.prototype._onCommandChanged = function () {
                    this.raisePropertyChanged(baseElView.PROP_NAME.command);
                };
                CommandElView.prototype._onCanExecuteChanged = function (cmd, args) {
                    this.isEnabled = cmd.canExecute(this, this.commandParam);
                };
                CommandElView.prototype._setCommand = function (v) {
                    var self = this;
                    if (v !== this._command) {
                        if (!!this._command) {
                            this._command.removeNSHandlers(this._objId);
                        }
                        this._command = v;
                        if (!!this._command) {
                            this._command.addOnCanExecuteChanged(self._onCanExecuteChanged, this._objId, self);
                            self.isEnabled = this._command.canExecute(self, self.commandParam);
                        }
                        else
                            self.isEnabled = false;
                        this._onCommandChanged();
                    }
                };
                CommandElView.prototype.toString = function () {
                    return 'CommandElView';
                };
                Object.defineProperty(CommandElView.prototype, "isEnabled", {
                    get: function () { return !(this.$el.prop(baseElView.PROP_NAME.disabled)); },
                    set: function (v) {
                        if (v !== this.isEnabled) {
                            this.$el.prop(baseElView.PROP_NAME.disabled, !v);
                            if (!v)
                                this.$el.addClass(baseElView.css.disabled);
                            else
                                this.$el.removeClass(baseElView.css.disabled);
                            this.raisePropertyChanged(baseElView.PROP_NAME.isEnabled);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CommandElView.prototype, "command", {
                    get: function () { return this._command; },
                    set: function (v) { this._setCommand(v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CommandElView.prototype, "commandParam", {
                    get: function () { return this._commandParam; },
                    set: function (v) {
                        if (v !== this._commandParam) {
                            this._commandParam = v;
                            this.raisePropertyChanged(baseElView.PROP_NAME.commandParam);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return CommandElView;
            })(BaseElView);
            baseElView.CommandElView = CommandElView;
            ;
            var BusyElView = (function (_super) {
                __extends(BusyElView, _super);
                function BusyElView(app, el, options) {
                    _super.call(this, app, el, options);
                }
                BusyElView.prototype._init = function (options) {
                    _super.prototype._init.call(this, options);
                    var img;
                    if (!!options.img)
                        img = options.img;
                    else
                        img = constsMOD.LOADER_GIF.NORMAL;
                    this._delay = 400;
                    this._timeOut = null;
                    if (!utils.check.isNt(options.delay))
                        this._delay = parseInt('' + options.delay);
                    this._loaderPath = RIAPP.global.getImagePath(img);
                    this._$loader = RIAPP.global.$(new Image());
                    this._$loader.css({ position: "absolute", display: "none", zIndex: "10000" });
                    this._$loader.prop('src', this._loaderPath);
                    this._$loader.appendTo(this.el);
                    this._isBusy = false;
                };
                BusyElView.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._timeOut) {
                        clearTimeout(this._timeOut);
                        this._timeOut = null;
                    }
                    this._$loader.remove();
                    this._$loader = null;
                    _super.prototype.destroy.call(this);
                };
                BusyElView.prototype.toString = function () {
                    return 'BusyElView';
                };
                Object.defineProperty(BusyElView.prototype, "isBusy", {
                    get: function () { return this._isBusy; },
                    set: function (v) {
                        var self = this, fn = function () {
                            self._timeOut = null;
                            self._$loader.show();
                            self._$loader.position({
                                "of": RIAPP.global.$(self.el)
                            });
                        };
                        if (v !== self._isBusy) {
                            self._isBusy = v;
                            if (self._isBusy) {
                                if (!!self._timeOut) {
                                    clearTimeout(self._timeOut);
                                    self._timeOut = null;
                                }
                                if (self._delay > 0) {
                                    self._timeOut = setTimeout(fn, self._delay);
                                }
                                else
                                    fn();
                            }
                            else {
                                if (!!self._timeOut) {
                                    clearTimeout(self._timeOut);
                                    self._timeOut = null;
                                }
                                else
                                    self._$loader.hide();
                            }
                            self.raisePropertyChanged(baseElView.PROP_NAME.isBusy);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BusyElView.prototype, "delay", {
                    get: function () { return this._delay; },
                    set: function (v) {
                        if (v !== this._delay) {
                            this._delay = v;
                            this.raisePropertyChanged(baseElView.PROP_NAME.delay);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return BusyElView;
            })(BaseElView);
            baseElView.BusyElView = BusyElView;
            var CheckBoxElView = (function (_super) {
                __extends(CheckBoxElView, _super);
                function CheckBoxElView() {
                    _super.apply(this, arguments);
                }
                CheckBoxElView.prototype._init = function (options) {
                    var self = this;
                    _super.prototype._init.call(this, options);
                    this._val = this.el.checked;
                    this.$el.on('change.' + this._objId, function (e) {
                        e.stopPropagation();
                        self.checked = this.checked;
                    });
                };
                CheckBoxElView.prototype._setFieldError = function (isError) {
                    var $el = this.$el;
                    if (isError) {
                        var span = RIAPP.global.$('<div></div>').addClass(baseElView.css.fieldError);
                        $el.wrap(span);
                    }
                    else {
                        if ($el.parent('.' + baseElView.css.fieldError).length > 0)
                            $el.unwrap();
                    }
                };
                CheckBoxElView.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this.$el.off('.' + this._objId);
                    _super.prototype.destroy.call(this);
                };
                CheckBoxElView.prototype.toString = function () {
                    return 'CheckBoxElView';
                };
                Object.defineProperty(CheckBoxElView.prototype, "checked", {
                    get: function () { return this._val; },
                    set: function (v) {
                        var el = this.el;
                        if (v !== null)
                            v = !!v;
                        if (v !== this._val) {
                            this._val = v;
                            if (el)
                                el.checked = !!this._val;
                            if (this._val === null) {
                                this.$el.css(baseElView.css.opacity, 0.33);
                            }
                            else
                                this.$el.css(baseElView.css.opacity, 1.0);
                            this.raisePropertyChanged(baseElView.PROP_NAME.checked);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return CheckBoxElView;
            })(InputElView);
            baseElView.CheckBoxElView = CheckBoxElView;
            var CheckBoxThreeStateElView = (function (_super) {
                __extends(CheckBoxThreeStateElView, _super);
                function CheckBoxThreeStateElView() {
                    _super.apply(this, arguments);
                }
                CheckBoxThreeStateElView.prototype._init = function (options) {
                    var self = this;
                    _super.prototype._init.call(this, options);
                    this._val = this.el.checked;
                    this._cbxVal = this._val == null ? 1 : (!!this._val ? 2 : 0);
                    var $el = this.$el;
                    $el.on('change.' + this._objId, function (e) {
                        e.stopPropagation();
                        switch (self._cbxVal) {
                            case 0:
                                self._cbxVal = 1;
                                break;
                            case 1:
                                self._cbxVal = 2;
                                break;
                            default:
                                self._cbxVal = 0;
                        }
                        self.checked = (self._cbxVal == 1) ? null : ((self._cbxVal == 2) ? true : false);
                    });
                };
                CheckBoxThreeStateElView.prototype._setFieldError = function (isError) {
                    var $el = this.$el;
                    if (isError) {
                        var div = RIAPP.global.$('<div></div>').addClass(baseElView.css.fieldError);
                        $el.wrap(div);
                    }
                    else {
                        if ($el.parent('.' + baseElView.css.fieldError).length > 0)
                            $el.unwrap();
                    }
                };
                CheckBoxThreeStateElView.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this.$el.off('.' + this._objId);
                    _super.prototype.destroy.call(this);
                };
                CheckBoxThreeStateElView.prototype.toString = function () {
                    return 'CheckBoxThreeStateElView';
                };
                Object.defineProperty(CheckBoxThreeStateElView.prototype, "checked", {
                    get: function () { return this._val; },
                    set: function (v) {
                        var $el = this.$el;
                        if (v !== this._val) {
                            this._val = v;
                            switch (this._val) {
                                case null:
                                    $el.prop('indeterminate', true);
                                    this._cbxVal = 1;
                                    break;
                                case true:
                                    $el.prop('indeterminate', false);
                                    $el.prop('checked', true);
                                    this._cbxVal = 2;
                                    break;
                                default:
                                    $el.prop('indeterminate', false);
                                    $el.prop('checked', false);
                                    this._cbxVal = 0;
                            }
                            this.raisePropertyChanged(baseElView.PROP_NAME.checked);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return CheckBoxThreeStateElView;
            })(InputElView);
            baseElView.CheckBoxThreeStateElView = CheckBoxThreeStateElView;
            var TXTBOX_EVENTS = {
                keypress: 'keypress'
            };
            var TextBoxElView = (function (_super) {
                __extends(TextBoxElView, _super);
                function TextBoxElView() {
                    _super.apply(this, arguments);
                }
                TextBoxElView.prototype._init = function (options) {
                    var self = this;
                    _super.prototype._init.call(this, options);
                    var $el = this.$el;
                    $el.on('change.' + this._objId, function (e) {
                        e.stopPropagation();
                        self.raisePropertyChanged(baseElView.PROP_NAME.value);
                    });
                    $el.on('keypress.' + this._objId, function (e) {
                        e.stopPropagation();
                        var args = { keyCode: e.which, value: e.target.value, isCancel: false };
                        self.raiseEvent(TXTBOX_EVENTS.keypress, args);
                        if (args.isCancel)
                            e.preventDefault();
                    });
                    if (!!options.updateOnKeyUp) {
                        $el.on('keyup.' + this._objId, function (e) {
                            e.stopPropagation();
                            self.raisePropertyChanged(baseElView.PROP_NAME.value);
                        });
                    }
                };
                TextBoxElView.prototype._getEventNames = function () {
                    var base_events = _super.prototype._getEventNames.call(this);
                    return [TXTBOX_EVENTS.keypress].concat(base_events);
                };
                TextBoxElView.prototype.addOnKeyPress = function (fn, nmspace) {
                    this._addHandler(TXTBOX_EVENTS.keypress, fn, nmspace);
                };
                TextBoxElView.prototype.removeOnKeyPress = function (nmspace) {
                    this._removeHandler(TXTBOX_EVENTS.keypress, nmspace);
                };
                TextBoxElView.prototype.toString = function () {
                    return 'TextBoxElView';
                };
                Object.defineProperty(TextBoxElView.prototype, "color", {
                    get: function () {
                        var $el = this.$el;
                        return $el.css('color');
                    },
                    set: function (v) {
                        var $el = this.$el;
                        var x = $el.css(baseElView.css.color);
                        if (v !== x) {
                            $el.css(baseElView.css.color, v);
                            this.raisePropertyChanged(baseElView.PROP_NAME.color);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return TextBoxElView;
            })(InputElView);
            baseElView.TextBoxElView = TextBoxElView;
            var HiddenElView = (function (_super) {
                __extends(HiddenElView, _super);
                function HiddenElView() {
                    _super.apply(this, arguments);
                }
                HiddenElView.prototype.toString = function () {
                    return 'HiddenElView';
                };
                return HiddenElView;
            })(InputElView);
            baseElView.HiddenElView = HiddenElView;
            var TXTAREA_EVENTS = {
                keypress: 'keypress'
            };
            var TextAreaElView = (function (_super) {
                __extends(TextAreaElView, _super);
                function TextAreaElView(app, el, options) {
                    _super.call(this, app, el, options);
                }
                TextAreaElView.prototype._init = function (options) {
                    _super.prototype._init.call(this, options);
                    var self = this;
                    if (!!options.rows) {
                        this.rows = options.rows;
                    }
                    if (!!options.cols) {
                        this.cols = options.cols;
                    }
                    if (!!options.wrap) {
                        this.wrap = options.wrap;
                    }
                    var $el = this.$el;
                    $el.on('change.' + this._objId, function (e) {
                        e.stopPropagation();
                        self.raisePropertyChanged(baseElView.PROP_NAME.value);
                    });
                    $el.on('keypress.' + this._objId, function (e) {
                        e.stopPropagation();
                        var args = { keyCode: e.which, value: e.target.value, isCancel: false };
                        self.raiseEvent(TXTAREA_EVENTS.keypress, args);
                        if (args.isCancel)
                            e.preventDefault();
                    });
                    if (!!options.updateOnKeyUp) {
                        $el.on('keyup.' + this._objId, function (e) {
                            e.stopPropagation();
                            self.raisePropertyChanged(baseElView.PROP_NAME.value);
                        });
                    }
                };
                TextAreaElView.prototype._getEventNames = function () {
                    var base_events = _super.prototype._getEventNames.call(this);
                    return [TXTAREA_EVENTS.keypress].concat(base_events);
                };
                TextAreaElView.prototype.addOnKeyPress = function (fn, nmspace) {
                    this._addHandler(TXTAREA_EVENTS.keypress, fn, nmspace);
                };
                TextAreaElView.prototype.removeOnKeyPress = function (nmspace) {
                    this._removeHandler(TXTAREA_EVENTS.keypress, nmspace);
                };
                TextAreaElView.prototype.toString = function () {
                    return 'TextAreaElView';
                };
                Object.defineProperty(TextAreaElView.prototype, "el", {
                    get: function () { return this._el; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TextAreaElView.prototype, "value", {
                    get: function () {
                        var el = this.el;
                        if (!el)
                            return '';
                        return el.value;
                    },
                    set: function (v) {
                        if (!this._el)
                            return;
                        var el = this.el;
                        var x = el.value;
                        var str = '' + v;
                        v = (v === null) ? '' : str;
                        if (x !== v) {
                            el.value = v;
                            this.raisePropertyChanged(baseElView.PROP_NAME.value);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TextAreaElView.prototype, "isEnabled", {
                    get: function () { return !this.el.disabled; },
                    set: function (v) {
                        v = !!v;
                        if (v !== this.isEnabled) {
                            this.el.disabled = !v;
                            this.raisePropertyChanged(baseElView.PROP_NAME.isEnabled);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TextAreaElView.prototype, "rows", {
                    get: function () {
                        var el = this.el;
                        if (!el)
                            return 1;
                        return el.rows;
                    },
                    set: function (v) {
                        var el = this.el;
                        if (!el)
                            return;
                        var x = el.rows;
                        v = (!v) ? 1 : v;
                        if (x !== v) {
                            el.rows = v;
                            this.raisePropertyChanged(baseElView.PROP_NAME.rows);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TextAreaElView.prototype, "cols", {
                    get: function () {
                        var el = this.el;
                        if (!el)
                            return 1;
                        return el.cols;
                    },
                    set: function (v) {
                        var el = this.el;
                        if (!el)
                            return;
                        var x = el.cols;
                        v = (!v) ? 1 : v;
                        if (x !== v) {
                            el.cols = v;
                            this.raisePropertyChanged(baseElView.PROP_NAME.cols);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TextAreaElView.prototype, "wrap", {
                    get: function () {
                        var el = this.el;
                        if (!el)
                            return 'off';
                        return el.wrap;
                    },
                    set: function (v) {
                        var el = this.el;
                        if (!el)
                            return;
                        var x = el.wrap, wraps = ['hard', 'off', 'soft'];
                        v = (!v) ? 'off' : v;
                        if (wraps.indexOf(v) < 0)
                            v = 'off';
                        if (x !== v) {
                            el.wrap = v;
                            this.raisePropertyChanged(baseElView.PROP_NAME.wrap);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return TextAreaElView;
            })(BaseElView);
            baseElView.TextAreaElView = TextAreaElView;
            var RadioElView = (function (_super) {
                __extends(RadioElView, _super);
                function RadioElView() {
                    _super.apply(this, arguments);
                }
                RadioElView.prototype._init = function (options) {
                    var self = this;
                    _super.prototype._init.call(this, options);
                    this._val = this.el.checked;
                    this.$el.on('change.' + this._objId, function (e) {
                        e.stopPropagation();
                        self.checked = this.checked;
                        self._updateGroup();
                    });
                };
                RadioElView.prototype._updateGroup = function () {
                    var groupName = this.el.getAttribute('name'), self = this;
                    if (!groupName)
                        return;
                    var parent = this.el.parentElement;
                    if (!parent)
                        return;
                    var self = this, cur = self.el;
                    RIAPP.global.$('input[type="radio"][name="' + groupName + '"]', parent).each(function (index, el) {
                        if (cur !== this) {
                            var vw = self.app._getInternal().getElView(this);
                            if (!!vw) {
                                vw.checked = this.checked;
                            }
                        }
                    });
                };
                RadioElView.prototype._setFieldError = function (isError) {
                    var $el = this.$el;
                    if (isError) {
                        var span = RIAPP.global.$('<div></div>').addClass(baseElView.css.fieldError);
                        $el.wrap(span);
                    }
                    else {
                        if ($el.parent('.' + baseElView.css.fieldError).length > 0)
                            $el.unwrap();
                    }
                };
                RadioElView.prototype.toString = function () {
                    return 'RadioElView';
                };
                Object.defineProperty(RadioElView.prototype, "checked", {
                    get: function () { return this._val; },
                    set: function (v) {
                        var el = this.el;
                        if (v !== null)
                            v = !!v;
                        if (v !== this._val) {
                            this._val = v;
                            if (el)
                                el.checked = !!this._val;
                            if (this._val === null) {
                                this.$el.css("opacity", 0.33);
                            }
                            else
                                this.$el.css(baseElView.css.opacity, 1.0);
                            this.raisePropertyChanged(baseElView.PROP_NAME.checked);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RadioElView.prototype, "value", {
                    get: function () { return this.el.value; },
                    set: function (v) {
                        var el = this.el;
                        if (!el)
                            return;
                        var strv = '' + v;
                        if (v === null)
                            strv = '';
                        if (strv !== el.value) {
                            el.value = strv;
                            this.raisePropertyChanged(baseElView.PROP_NAME.value);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RadioElView.prototype, "name", {
                    get: function () { return this.el.name; },
                    enumerable: true,
                    configurable: true
                });
                return RadioElView;
            })(InputElView);
            baseElView.RadioElView = RadioElView;
            var ButtonElView = (function (_super) {
                __extends(ButtonElView, _super);
                function ButtonElView(app, el, options) {
                    this._preventDefault = false;
                    _super.call(this, app, el, options);
                }
                ButtonElView.prototype._init = function (options) {
                    _super.prototype._init.call(this, options);
                    var self = this, $el = this.$el;
                    if (!!options.preventDefault)
                        this._preventDefault = true;
                    $el.on('click.' + this._objId, function (e) {
                        self._onClick(e);
                    });
                };
                ButtonElView.prototype._onClick = function (e) {
                    if (this._preventDefault)
                        e.preventDefault();
                    this.invokeCommand();
                };
                ButtonElView.prototype.toString = function () {
                    return 'ButtonElView';
                };
                Object.defineProperty(ButtonElView.prototype, "value", {
                    get: function () {
                        if (!this._el)
                            return '';
                        return this.$el.val();
                    },
                    set: function (v) {
                        if (!this._el)
                            return;
                        var x = this.$el.val();
                        if (v === null)
                            v = '';
                        else
                            v = '' + v;
                        if (x !== v) {
                            this.$el.val(v);
                            this.raisePropertyChanged(baseElView.PROP_NAME.value);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ButtonElView.prototype, "text", {
                    get: function () {
                        if (!this._el)
                            return '';
                        return this.$el.text();
                    },
                    set: function (v) {
                        if (!this._el)
                            return;
                        var x = this.$el.text();
                        if (v === null)
                            v = '';
                        else
                            v = '' + v;
                        if (x !== v) {
                            this.$el.text(v);
                            this.raisePropertyChanged(baseElView.PROP_NAME.text);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ButtonElView.prototype, "html", {
                    get: function () {
                        if (!this._el)
                            return '';
                        return this.$el.html();
                    },
                    set: function (v) {
                        if (!this._el)
                            return;
                        var x = this.$el.html();
                        if (v === null)
                            v = '';
                        else
                            v = '' + v;
                        if (x !== v) {
                            this.$el.html(v);
                            this.raisePropertyChanged(baseElView.PROP_NAME.html);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ButtonElView.prototype, "preventDefault", {
                    get: function () {
                        return this._preventDefault;
                    },
                    set: function (v) {
                        if (this._preventDefault !== v) {
                            this._preventDefault = v;
                            this.raisePropertyChanged(baseElView.PROP_NAME.preventDefault);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return ButtonElView;
            })(CommandElView);
            baseElView.ButtonElView = ButtonElView;
            var AnchorElView = (function (_super) {
                __extends(AnchorElView, _super);
                function AnchorElView(app, el, options) {
                    this._imageSrc = null;
                    this._image = null;
                    this._preventDefault = false;
                    _super.call(this, app, el, options);
                }
                AnchorElView.prototype._init = function (options) {
                    _super.prototype._init.call(this, options);
                    var self = this, $el = this.$el;
                    if (!!options.imageSrc)
                        this.imageSrc = options.imageSrc;
                    if (!!options.preventDefault)
                        this._preventDefault = true;
                    $el.addClass(baseElView.css.commandLink);
                    $el.on('click.' + this._objId, function (e) {
                        self._onClick(e);
                    });
                };
                AnchorElView.prototype._onClick = function (e) {
                    if (this._preventDefault)
                        e.preventDefault();
                    this.invokeCommand();
                };
                AnchorElView.prototype._updateImage = function (src) {
                    var $a = this.$el, $img, self = this;
                    if (this._imageSrc === src)
                        return;
                    this._imageSrc = src;
                    if (!!this._image && !src) {
                        RIAPP.global.$(this._image).remove();
                        this._image = null;
                    }
                    if (!!src) {
                        if (!this._image) {
                            self.html = null;
                            $img = RIAPP.global.$(new Image()).attr('src', src).mouseenter(function (e) {
                                if (self.isEnabled)
                                    RIAPP.global.$(this).css("opacity", 0.5);
                            }).mouseout(function (e) {
                                if (self.isEnabled)
                                    RIAPP.global.$(this).css("opacity", 1.0);
                            }).appendTo($a);
                            this._image = $img.get(0);
                        }
                        else
                            this._image.src = src;
                    }
                };
                AnchorElView.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this.$el.removeClass(baseElView.css.commandLink);
                    this.imageSrc = null;
                    _super.prototype.destroy.call(this);
                };
                AnchorElView.prototype.toString = function () {
                    return 'AnchorElView';
                };
                Object.defineProperty(AnchorElView.prototype, "el", {
                    get: function () { return this._el; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnchorElView.prototype, "imageSrc", {
                    get: function () { return this._imageSrc; },
                    set: function (v) {
                        if (!this._$el)
                            return;
                        var x = this._imageSrc;
                        if (x !== v) {
                            this._updateImage(v);
                            this.raisePropertyChanged(baseElView.PROP_NAME.imageSrc);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnchorElView.prototype, "html", {
                    get: function () {
                        if (!this._el)
                            return '';
                        return this.$el.html();
                    },
                    set: function (v) {
                        if (!this._el)
                            return;
                        var x = this.$el.html();
                        if (v === null)
                            v = '';
                        else
                            v = '' + v;
                        if (x !== v) {
                            this.$el.html(v);
                            this.raisePropertyChanged(baseElView.PROP_NAME.html);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnchorElView.prototype, "text", {
                    get: function () {
                        if (!this._el)
                            return '';
                        return this.$el.text();
                    },
                    set: function (v) {
                        if (!this._el)
                            return;
                        var x = this.$el.text();
                        if (v === null)
                            v = '';
                        else
                            v = '' + v;
                        if (x !== v) {
                            this.$el.text(v);
                            this.raisePropertyChanged(baseElView.PROP_NAME.text);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnchorElView.prototype, "href", {
                    get: function () {
                        if (!this._el)
                            return '';
                        return this.el.href;
                    },
                    set: function (v) {
                        if (!this._el)
                            return;
                        var x = this.href;
                        if (v === null)
                            v = '';
                        else
                            v = '' + v;
                        if (x !== v) {
                            this.el.href = v;
                            this.raisePropertyChanged(baseElView.PROP_NAME.href);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AnchorElView.prototype, "preventDefault", {
                    get: function () {
                        return this._preventDefault;
                    },
                    set: function (v) {
                        if (this._preventDefault !== v) {
                            this._preventDefault = v;
                            this.raisePropertyChanged(baseElView.PROP_NAME.preventDefault);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return AnchorElView;
            })(CommandElView);
            baseElView.AnchorElView = AnchorElView;
            var ExpanderElView = (function (_super) {
                __extends(ExpanderElView, _super);
                function ExpanderElView() {
                    _super.apply(this, arguments);
                }
                ExpanderElView.prototype._init = function (options) {
                    this._expandedsrc = options.expandedsrc || RIAPP.global.getImagePath('collapse.jpg');
                    this._collapsedsrc = options.collapsedsrc || RIAPP.global.getImagePath('expand.jpg');
                    this._isExpanded = !!options.isExpanded;
                    var opts = { imageSrc: this._isExpanded ? this._expandedsrc : this._collapsedsrc };
                    _super.prototype._init.call(this, opts);
                };
                ExpanderElView.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this._expandedsrc = null;
                    this._collapsedsrc = null;
                    this._isExpanded = false;
                    _super.prototype.destroy.call(this);
                };
                ExpanderElView.prototype._onCommandChanged = function () {
                    _super.prototype._onCommandChanged.call(this);
                    this.invokeCommand();
                };
                ExpanderElView.prototype._onClick = function (e) {
                    var self = this;
                    self._isExpanded = !self._isExpanded;
                    _super.prototype._onClick.call(this, e);
                };
                ExpanderElView.prototype.invokeCommand = function () {
                    var self = this;
                    self.imageSrc = self._isExpanded ? self._expandedsrc : self._collapsedsrc;
                    _super.prototype.invokeCommand.call(this);
                };
                ExpanderElView.prototype.toString = function () {
                    return 'ExpanderElView';
                };
                Object.defineProperty(ExpanderElView.prototype, "isExpanded", {
                    get: function () { return this._isExpanded; },
                    set: function (v) {
                        if (this._isExpanded !== v) {
                            this._isExpanded = v;
                            this.invokeCommand();
                            this.raisePropertyChanged(baseElView.PROP_NAME.isExpanded);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return ExpanderElView;
            })(AnchorElView);
            baseElView.ExpanderElView = ExpanderElView;
            var SpanElView = (function (_super) {
                __extends(SpanElView, _super);
                function SpanElView() {
                    _super.apply(this, arguments);
                }
                SpanElView.prototype.toString = function () {
                    return 'SpanElView';
                };
                Object.defineProperty(SpanElView.prototype, "text", {
                    get: function () { return this.$el.text(); },
                    set: function (v) {
                        var $el = this.$el, x = $el.text();
                        var str = '' + v;
                        v = v === null ? '' : str;
                        if (x !== v) {
                            $el.text(v);
                            this.raisePropertyChanged(baseElView.PROP_NAME.text);
                            this.raisePropertyChanged(baseElView.PROP_NAME.value);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SpanElView.prototype, "value", {
                    get: function () { return this.text; },
                    set: function (v) { this.text = v; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SpanElView.prototype, "html", {
                    get: function () { return this.el.innerHTML; },
                    set: function (v) {
                        var x = this.el.innerHTML;
                        var str = '' + v;
                        v = v === null ? '' : str;
                        if (x !== v) {
                            this.el.innerHTML = v;
                            this.raisePropertyChanged(baseElView.PROP_NAME.html);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SpanElView.prototype, "color", {
                    get: function () {
                        var $el = this.$el;
                        return $el.css('color');
                    },
                    set: function (v) {
                        var $el = this.$el;
                        var x = $el.css(baseElView.css.color);
                        if (v !== x) {
                            $el.css(baseElView.css.color, v);
                            this.raisePropertyChanged(baseElView.PROP_NAME.color);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SpanElView.prototype, "fontSize", {
                    get: function () {
                        var $el = this.$el;
                        return $el.css('font-size');
                    },
                    set: function (v) {
                        var $el = this.$el;
                        var x = $el.css(baseElView.css.fontSize);
                        if (v !== x) {
                            $el.css(baseElView.css.fontSize, v);
                            this.raisePropertyChanged(baseElView.PROP_NAME.fontSize);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return SpanElView;
            })(BaseElView);
            baseElView.SpanElView = SpanElView;
            var BlockElView = (function (_super) {
                __extends(BlockElView, _super);
                function BlockElView() {
                    _super.apply(this, arguments);
                }
                BlockElView.prototype.toString = function () {
                    return 'BlockElView';
                };
                Object.defineProperty(BlockElView.prototype, "borderColor", {
                    get: function () {
                        var $el = this.$el;
                        return $el.css('border-top-color');
                    },
                    set: function (v) {
                        var $el = this.$el;
                        var x = $el.css('border-top-color');
                        if (v !== x) {
                            $el.css('border-color', v);
                            this.raisePropertyChanged(baseElView.PROP_NAME.borderColor);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BlockElView.prototype, "borderStyle", {
                    get: function () {
                        var $el = this.$el;
                        return $el.css('border-top-style');
                    },
                    set: function (v) {
                        var $el = this.$el;
                        var x = $el.css('border-top-style');
                        if (v !== x) {
                            $el.css('border-style', v);
                            this.raisePropertyChanged(baseElView.PROP_NAME.borderStyle);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BlockElView.prototype, "width", {
                    get: function () {
                        var $el = this.$el;
                        return $el.width();
                    },
                    set: function (v) {
                        var $el = this.$el;
                        var x = $el.width();
                        if (v !== x) {
                            $el.width(v);
                            this.raisePropertyChanged(baseElView.PROP_NAME.width);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BlockElView.prototype, "height", {
                    get: function () {
                        var $el = this.$el;
                        return $el.height();
                    },
                    set: function (v) {
                        var $el = this.$el;
                        var x = $el.height();
                        if (v !== x) {
                            $el.height(v);
                            this.raisePropertyChanged(baseElView.PROP_NAME.height);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return BlockElView;
            })(SpanElView);
            baseElView.BlockElView = BlockElView;
            var ImgElView = (function (_super) {
                __extends(ImgElView, _super);
                function ImgElView(app, el, options) {
                    _super.call(this, app, el, options);
                }
                ImgElView.prototype.toString = function () {
                    return 'ImgElView';
                };
                Object.defineProperty(ImgElView.prototype, "el", {
                    get: function () { return this._el; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ImgElView.prototype, "src", {
                    get: function () { return this.el.src; },
                    set: function (v) {
                        var x = this.el.src;
                        if (x !== v) {
                            this.el.src = v;
                            this.raisePropertyChanged(baseElView.PROP_NAME.src);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return ImgElView;
            })(BaseElView);
            baseElView.ImgElView = ImgElView;
            RIAPP.global.registerElView('busy_indicator', BusyElView);
            RIAPP.global.registerElView('input:checkbox', CheckBoxElView);
            RIAPP.global.registerElView('threeState', CheckBoxThreeStateElView);
            RIAPP.global.registerElView('input:text', TextBoxElView);
            RIAPP.global.registerElView('input:hidden', HiddenElView);
            RIAPP.global.registerElView('textarea', TextAreaElView);
            RIAPP.global.registerElView('input:radio', RadioElView);
            RIAPP.global.registerElView('input:button', ButtonElView);
            RIAPP.global.registerElView('input:submit', ButtonElView);
            RIAPP.global.registerElView('button', ButtonElView);
            RIAPP.global.registerElView('a', AnchorElView);
            RIAPP.global.registerElView('abutton', AnchorElView);
            RIAPP.global.registerElView('expander', ExpanderElView);
            RIAPP.global.registerElView('span', SpanElView);
            RIAPP.global.registerElView('div', BlockElView);
            RIAPP.global.registerElView('section', BlockElView);
            RIAPP.global.registerElView('block', BlockElView);
            RIAPP.global.registerElView('img', ImgElView);
            baseElView._isModuleLoaded = true;
        })(baseElView = MOD.baseElView || (MOD.baseElView = {}));
    })(MOD = RIAPP.MOD || (RIAPP.MOD = {}));
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    var MOD;
    (function (MOD) {
        var binding;
        (function (binding) {
            var elviewMOD = RIAPP.MOD.baseElView;
            var errMOD = RIAPP.MOD.errors;
            binding._isBinding = function (obj) {
                return !!obj && obj instanceof Binding;
            };
            binding.bindModeMap = {};
            binding.bindModeMap["OneTime"] = 0;
            binding.bindModeMap["OneWay"] = 1;
            binding.bindModeMap["TwoWay"] = 2;
            binding.bindModeMap["BackWay"] = 3;
            var global = RIAPP.global, base_utils = RIAPP.baseUtils, utils, parser;
            global.addOnInitialize(function (s, args) {
                utils = s.utils;
                parser = s.parser;
            });
            function getBindingOptions(app, bindInfo, defaultTarget, defaultSource) {
                var bindingOpts = {
                    mode: 1,
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
                    bindingOpts.mode = binding.bindModeMap[bindInfo.mode];
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
                            bindingOpts.target = parser.resolveBindingSource(app, parser.getPathParts(fixedTarget));
                        }
                    }
                    else
                        bindingOpts.target = fixedTarget;
                }
                if (!fixedSource) {
                    bindingOpts.source = defaultSource;
                }
                else {
                    bindingOpts.isSourceFixed = true;
                    if (utils.check.isString(fixedSource)) {
                        if (fixedSource == 'this') {
                            bindingOpts.source = defaultTarget;
                        }
                        else {
                            bindingOpts.source = parser.resolveBindingSource(app, parser.getPathParts(fixedSource));
                        }
                    }
                    else
                        bindingOpts.source = fixedSource;
                }
                return bindingOpts;
            }
            binding.getBindingOptions = getBindingOptions;
            var Binding = (function (_super) {
                __extends(Binding, _super);
                function Binding(options, appName) {
                    _super.call(this);
                    var opts = utils.extend(false, {
                        target: null, source: null,
                        targetPath: null, sourcePath: null, mode: 1,
                        converter: null, converterParam: null, isSourceFixed: false
                    }, options);
                    if (utils.check.isString(opts.mode)) {
                        opts.mode = binding.bindModeMap[opts.mode];
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
                    this._state = null;
                    this._mode = opts.mode;
                    this._converter = opts.converter || global._getInternal().getConverter('BaseConverter');
                    this._converterParam = opts.converterParam;
                    this._srcPath = parser.getPathParts(opts.sourcePath);
                    this._tgtPath = parser.getPathParts(opts.targetPath);
                    if (this._tgtPath.length < 1)
                        throw new Error(utils.format(RIAPP.ERRS.ERR_BIND_TGTPATH_INVALID, opts.targetPath));
                    this._isSourceFixed = (!!opts.isSourceFixed);
                    this._pathItems = {};
                    this._objId = 'bnd' + RIAPP.baseUtils.getNewID();
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
                Binding._isDestroyed = function (obj) {
                    var res = false;
                    if (utils.check.isBaseObj(obj)) {
                        res = obj.getIsDestroyCalled();
                    }
                    return res;
                };
                Binding.prototype._onSrcErrorsChanged = function (err_notif, args) {
                    var errors = [], tgt = this._targetObj, src = this._sourceObj, srcPath = this._srcPath;
                    if (!!tgt && elviewMOD._isElView(tgt)) {
                        if (!!src && srcPath.length > 0) {
                            var prop = srcPath[srcPath.length - 1];
                            errors = err_notif.getFieldErrors(prop);
                        }
                        tgt.validationErrors = errors;
                    }
                };
                Binding.prototype._getTgtChangedFn = function (self, obj, prop, restPath, lvl) {
                    var fn = function (sender, data) {
                        var val = parser.resolveProp(obj, prop);
                        if (restPath.length > 0) {
                            self._setPathItem(null, 1, lvl, restPath);
                        }
                        self._parseTgtPath(val, restPath, lvl);
                    };
                    return fn;
                };
                Binding.prototype._getSrcChangedFn = function (self, obj, prop, restPath, lvl) {
                    var fn = function (sender, data) {
                        var val = parser.resolveProp(obj, prop);
                        if (restPath.length > 0) {
                            self._setPathItem(null, 0, lvl, restPath);
                        }
                        self._parseSrcPath(val, restPath, lvl);
                    };
                    return fn;
                };
                Binding.prototype._parseSrcPath = function (obj, path, lvl) {
                    var self = this;
                    self._sourceObj = null;
                    if (path.length === 0) {
                        self._sourceObj = obj;
                    }
                    else
                        self._parseSrcPath2(obj, path, lvl);
                    if (self._mode === 3) {
                        if (!!self._sourceObj)
                            self._updateSource();
                    }
                    else {
                        if (!!self._targetObj)
                            self._updateTarget();
                    }
                };
                Binding.prototype._parseSrcPath2 = function (obj, path, lvl) {
                    var self = this, nextObj, isBaseObj = (!!obj && utils.check.isBaseObj(obj)), isValidProp;
                    if (isBaseObj) {
                        obj.addOnDestroyed(self._onSrcDestroyed, self._objId, self);
                        self._setPathItem(obj, 0, lvl, path);
                    }
                    if (path.length > 1) {
                        if (isBaseObj) {
                            obj.addOnPropertyChange(path[0], self._getSrcChangedFn(self, obj, path[0], path.slice(1), lvl + 1), self._objId);
                        }
                        if (!!obj) {
                            nextObj = global.parser.resolveProp(obj, path[0]);
                            if (!!nextObj) {
                                self._parseSrcPath2(nextObj, path.slice(1), lvl + 1);
                            }
                            else if (base_utils.isUndefined(nextObj)) {
                                if (RIAPP.DebugLevel == RIAPP.DEBUG_LEVEL.HIGH) {
                                    RIAPP.startDebugger();
                                }
                                if (RIAPP.DebugLevel > RIAPP.DEBUG_LEVEL.NONE) {
                                    global._getInternal().onUnResolvedBinding(0, self.source, self._srcPath.join('.'), path[0]);
                                }
                            }
                        }
                        return;
                    }
                    if (!!obj && path.length == 1) {
                        isValidProp = true;
                        if (RIAPP.DebugLevel != RIAPP.DEBUG_LEVEL.NONE)
                            isValidProp = isBaseObj ? obj._isHasProp(path[0]) : base_utils.hasProp(obj, path[0]);
                        if (isValidProp) {
                            var updateOnChange = isBaseObj && (self._mode === 1 || self._mode === 2);
                            if (updateOnChange) {
                                obj.addOnPropertyChange(path[0], self._updateTarget, self._objId, self);
                            }
                            var err_notif = utils.getErrorNotification(obj);
                            if (!!err_notif) {
                                err_notif.addOnErrorsChanged(self._onSrcErrorsChanged, self._objId, self);
                            }
                            self._sourceObj = obj;
                        }
                        else {
                            if (RIAPP.DebugLevel == RIAPP.DEBUG_LEVEL.HIGH) {
                                RIAPP.startDebugger();
                            }
                            global._getInternal().onUnResolvedBinding(0, self.source, self._srcPath.join('.'), path[0]);
                        }
                    }
                };
                Binding.prototype._parseTgtPath = function (obj, path, lvl) {
                    var self = this;
                    self._targetObj = null;
                    if (path.length === 0) {
                        self._targetObj = obj;
                    }
                    else
                        self._parseTgtPath2(obj, path, lvl);
                    if (self._mode === 3) {
                        if (!!self._sourceObj)
                            self._updateSource();
                    }
                    else {
                        if (!!self._targetObj)
                            self._updateTarget();
                    }
                };
                Binding.prototype._parseTgtPath2 = function (obj, path, lvl) {
                    var self = this, nextObj, isBaseObj = (!!obj && utils.check.isBaseObj(obj)), isValidProp;
                    if (isBaseObj) {
                        obj.addOnDestroyed(self._onTgtDestroyed, self._objId, self);
                        self._setPathItem(obj, 1, lvl, path);
                    }
                    if (path.length > 1) {
                        if (isBaseObj) {
                            obj.addOnPropertyChange(path[0], self._getTgtChangedFn(self, obj, path[0], path.slice(1), lvl + 1), self._objId, self);
                        }
                        if (!!obj) {
                            nextObj = global.parser.resolveProp(obj, path[0]);
                            if (!!nextObj) {
                                self._parseTgtPath2(nextObj, path.slice(1), lvl + 1);
                            }
                            else if (base_utils.isUndefined(nextObj)) {
                                if (RIAPP.DebugLevel == RIAPP.DEBUG_LEVEL.HIGH) {
                                    RIAPP.startDebugger();
                                }
                                if (RIAPP.DebugLevel > RIAPP.DEBUG_LEVEL.NONE) {
                                    global._getInternal().onUnResolvedBinding(1, self.target, self._tgtPath.join('.'), path[0]);
                                }
                            }
                        }
                        return;
                    }
                    if (!!obj && path.length === 1) {
                        isValidProp = true;
                        if (RIAPP.DebugLevel != RIAPP.DEBUG_LEVEL.NONE)
                            isValidProp = isBaseObj ? obj._isHasProp(path[0]) : base_utils.hasProp(obj, path[0]);
                        if (isValidProp) {
                            var updateOnChange = isBaseObj && (self._mode === 2 || self._mode === 3);
                            if (updateOnChange) {
                                obj.addOnPropertyChange(path[0], self._updateSource, self._objId, self);
                            }
                            self._targetObj = obj;
                        }
                        else {
                            if (RIAPP.DebugLevel == RIAPP.DEBUG_LEVEL.HIGH) {
                                RIAPP.startDebugger();
                            }
                            global._getInternal().onUnResolvedBinding(1, self.target, self._tgtPath.join('.'), path[0]);
                        }
                    }
                };
                Binding.prototype._setPathItem = function (newObj, bindingTo, lvl, path) {
                    var oldObj, key, len = lvl + path.length;
                    for (var i = lvl; i < len; i += 1) {
                        switch (bindingTo) {
                            case 0:
                                key = 's' + i;
                                break;
                            case 1:
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
                };
                Binding.prototype._cleanUpObj = function (oldObj) {
                    if (!!oldObj) {
                        oldObj.removeNSHandlers(this._objId);
                        var err_notif = utils.getErrorNotification(oldObj);
                        if (!!err_notif) {
                            err_notif.removeOnErrorsChanged(this._objId);
                        }
                    }
                };
                Binding.prototype._onTgtDestroyed = function (sender, args) {
                    if (this._isDestroyCalled)
                        return;
                    this._setTarget(null);
                };
                Binding.prototype._onSrcDestroyed = function (sender, args) {
                    var self = this;
                    if (self._isDestroyCalled)
                        return;
                    if (sender === self.source)
                        self._setSource(null);
                    else {
                        self._setPathItem(null, 0, 0, self._srcPath);
                        setTimeout(function () {
                            if (self._isDestroyCalled)
                                return;
                            self._bindToSource();
                        }, 0);
                    }
                };
                Binding.prototype._bindToSource = function () {
                    this._parseSrcPath(this.source, this._srcPath, 0);
                };
                Binding.prototype._bindToTarget = function () {
                    this._parseTgtPath(this.target, this._tgtPath, 0);
                };
                Binding.prototype._updateTarget = function (sender, args) {
                    if (this._ignoreSrcChange || this._isDestroyCalled)
                        return;
                    this._ignoreTgtChange = true;
                    try {
                        var res = this._converter.convertToTarget(this.sourceValue, this._converterParam, this._sourceObj);
                        if (res !== undefined)
                            this.targetValue = res;
                    }
                    catch (ex) {
                        if (this._mode === 3) {
                            this._updateSource();
                        }
                        RIAPP.reThrow(ex, this.handleError(ex, this));
                    }
                    finally {
                        this._ignoreTgtChange = false;
                    }
                };
                Binding.prototype._updateSource = function (sender, args) {
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
                            this._ignoreSrcChange = false;
                            if (this._mode != 3) {
                                this._updateTarget();
                            }
                            if (!this.handleError(ex, this))
                                throw ex;
                        }
                    }
                    finally {
                        this._ignoreSrcChange = false;
                    }
                };
                Binding.prototype._setTarget = function (value) {
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
                        this._setPathItem(null, 1, 0, this._tgtPath);
                        if (!!value && !utils.check.isBaseObj(value))
                            throw new Error(RIAPP.ERRS.ERR_BIND_TARGET_INVALID);
                        this._target = value;
                        this._bindToTarget();
                        if (!!this._target && !this._targetObj)
                            throw new Error(utils.format(RIAPP.ERRS.ERR_BIND_TGTPATH_INVALID, this._tgtPath.join('.')));
                    }
                };
                Binding.prototype._setSource = function (value) {
                    if (!!this._state) {
                        this._state.source = value;
                        return;
                    }
                    if (this._source !== value) {
                        this._setPathItem(null, 0, 0, this._srcPath);
                        this._source = value;
                        this._bindToSource();
                    }
                };
                Binding.prototype.handleError = function (error, source) {
                    var isHandled = _super.prototype.handleError.call(this, error, source);
                    if (!isHandled) {
                        if (!!this._appName) {
                            return global.findApp(this._appName).handleError(error, source);
                        }
                        else
                            return global.handleError(error, source);
                    }
                    return isHandled;
                };
                Binding.prototype.destroy = function () {
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
                    _super.prototype.destroy.call(this);
                };
                Binding.prototype.toString = function () {
                    return 'Binding';
                };
                Object.defineProperty(Binding.prototype, "bindingID", {
                    get: function () {
                        return this._objId;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Binding.prototype, "target", {
                    get: function () { return this._target; },
                    set: function (v) {
                        this._setTarget(v);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Binding.prototype, "source", {
                    get: function () { return this._source; },
                    set: function (v) {
                        this._setSource(v);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Binding.prototype, "targetPath", {
                    get: function () { return this._tgtPath; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Binding.prototype, "sourcePath", {
                    get: function () { return this._srcPath; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Binding.prototype, "sourceValue", {
                    get: function () {
                        if (this._srcPath.length === 0)
                            return this._sourceObj;
                        if (!this._sourceObj)
                            return undefined;
                        var prop = this._srcPath[this._srcPath.length - 1];
                        var res = global.parser.resolveProp(this._sourceObj, prop);
                        return res;
                    },
                    set: function (v) {
                        if (this._srcPath.length === 0 || !this._sourceObj)
                            return;
                        if (Binding._isDestroyed(this._sourceObj))
                            return;
                        var prop = this._srcPath[this._srcPath.length - 1];
                        global.parser.setPropertyValue(this._sourceObj, prop, v);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Binding.prototype, "targetValue", {
                    get: function () {
                        if (!this._targetObj)
                            return undefined;
                        var prop = this._tgtPath[this._tgtPath.length - 1];
                        return global.parser.resolveProp(this._targetObj, prop);
                    },
                    set: function (v) {
                        if (this._tgtPath.length == 0 || !this._targetObj)
                            return;
                        if (Binding._isDestroyed(this._targetObj))
                            return;
                        var prop = this._tgtPath[this._tgtPath.length - 1];
                        global.parser.setPropertyValue(this._targetObj, prop, v);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Binding.prototype, "mode", {
                    get: function () { return this._mode; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Binding.prototype, "converter", {
                    get: function () { return this._converter; },
                    set: function (v) { this._converter = v; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Binding.prototype, "converterParam", {
                    get: function () { return this._converterParam; },
                    set: function (v) { this._converterParam = v; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Binding.prototype, "isSourceFixed", {
                    get: function () { return this._isSourceFixed; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Binding.prototype, "isDisabled", {
                    get: function () { return !!this._state; },
                    set: function (v) {
                        var s;
                        v = !!v;
                        if (this.isDisabled != v) {
                            if (v) {
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
                                s = this._state;
                                this._state = null;
                                this._setTarget(s.target);
                                this._setSource(s.source);
                            }
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Binding.prototype, "appName", {
                    get: function () { return this._appName; },
                    enumerable: true,
                    configurable: true
                });
                return Binding;
            })(RIAPP.BaseObject);
            binding.Binding = Binding;
            binding._isModuleLoaded = true;
        })(binding = MOD.binding || (MOD.binding = {}));
    })(MOD = RIAPP.MOD || (RIAPP.MOD = {}));
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    var MOD;
    (function (MOD) {
        var template;
        (function (template_1) {
            var constsMOD = RIAPP.consts;
            var bindMOD = RIAPP.MOD.binding;
            var elviewMOD = RIAPP.MOD.baseElView;
            var mvvmMOD = RIAPP.MOD.mvvm;
            template_1.css = {
                templateContainer: 'ria-template-container'
            };
            var utils, global = RIAPP.global;
            global.addOnInitialize(function (s, args) {
                utils = s.utils;
            });
            template._isTemplateElView = function (obj) {
                return !!obj && obj instanceof TemplateElView;
            };
            var PROP_NAME = {
                dataContext: 'dataContext',
                templateID: 'templateID',
                template: 'template',
                isEnabled: 'isEnabled'
            };
            var Template = (function (_super) {
                __extends(Template, _super);
                function Template(options) {
                    _super.call(this);
                    options = utils.extend(false, {
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
                    this._el.className = template_1.css.templateContainer;
                    if (!!options.templateID)
                        this._loadTemplate();
                }
                Template.prototype._getBindings = function () {
                    if (!this._lfTime)
                        return [];
                    var arr = this._lfTime.getObjs(), res = [];
                    for (var i = 0, len = arr.length; i < len; i += 1) {
                        if (bindMOD._isBinding(arr[i]))
                            res.push(arr[i]);
                    }
                    return res;
                };
                Template.prototype._getElViews = function () {
                    if (!this._lfTime)
                        return [];
                    var arr = this._lfTime.getObjs(), res = [];
                    for (var i = 0, len = arr.length; i < len; i += 1) {
                        if (elviewMOD._isElView(arr[i]))
                            res.push(arr[i]);
                    }
                    return res;
                };
                Template.prototype._getTemplateElView = function () {
                    if (!this._lfTime || this._templElView === null)
                        return null;
                    if (!!this._templElView)
                        return this._templElView;
                    var res = null, arr = this._getElViews();
                    for (var i = 0, j = arr.length; i < j; i += 1) {
                        if (template._isTemplateElView(arr[i])) {
                            res = arr[i];
                            break;
                        }
                    }
                    this._templElView = res;
                    return res;
                };
                Template.prototype._getTemplateEvents = function () {
                    var tel_vw = this._getTemplateElView(), ev = this._options.templEvents;
                    if (!!tel_vw && !!ev)
                        return [tel_vw, ev];
                    else if (!!tel_vw)
                        return [tel_vw];
                    else if (!!ev)
                        return [ev];
                    else
                        return [];
                };
                Template.prototype._loadTemplateElAsync = function (name) {
                    var self = this, fn_loader = this.app.getTemplateLoader(name), deferred = utils.createDeferred();
                    if (!!fn_loader) {
                        fn_loader().then(function (html) {
                            var tmpDiv = global.document.createElement('div');
                            tmpDiv.innerHTML = html;
                            var el = tmpDiv.firstElementChild;
                            deferred.resolve(el);
                        }, function (err) {
                            deferred.reject(new Error(utils.format(RIAPP.ERRS.ERR_TEMPLATE_ID_INVALID, self.templateID)));
                        });
                    }
                    else {
                        deferred.reject(new Error(utils.format(RIAPP.ERRS.ERR_TEMPLATE_ID_INVALID, self.templateID)));
                    }
                    return deferred;
                };
                Template.prototype._appendIsBusy = function (el) {
                    var self = this;
                    this._busyTimeOut = setTimeout(function () {
                        if (!self._busyTimeOut || self._isDestroyCalled)
                            return;
                        self._busyTimeOut = null;
                        var vw_inst = new elviewMOD.BusyElView(self.app, el, { img: constsMOD.LOADER_GIF.SMALL, delay: 0 });
                        vw_inst.isBusy = true;
                    }, 400);
                };
                Template.prototype._removeIsBusy = function (el) {
                    var self = this;
                    if (!!self._busyTimeOut) {
                        clearTimeout(self._busyTimeOut);
                        self._busyTimeOut = null;
                    }
                    var vw = this.app._getInternal().getElView(el);
                    if (!!vw && (vw instanceof elviewMOD.BusyElView)) {
                        vw.destroy();
                    }
                };
                Template.prototype._loadTemplate = function () {
                    var self = this, id = self.templateID, deferred;
                    try {
                        if (!!self._promise) {
                            self._promise.reject('cancel');
                            self._promise = null;
                        }
                        if (!!self._loadedElem)
                            self._unloadTemplate();
                        if (!!id) {
                            deferred = self._loadTemplateElAsync(id);
                            self._waitLoad(deferred, utils.isDeferredPending(deferred));
                        }
                    }
                    catch (ex) {
                        self.handleError(ex, self);
                        RIAPP.throwDummy(ex);
                    }
                };
                Template.prototype._waitLoad = function (loadPromise, asyncLoad) {
                    var self = this, deferred, tmpDiv = self.el;
                    self._promise = deferred = utils.createDeferred();
                    loadPromise.then(function (loadedEl) {
                        deferred.resolve(loadedEl);
                    }, function (err) {
                        deferred.reject(err);
                    });
                    if (asyncLoad) {
                        self._appendIsBusy(tmpDiv);
                        deferred.then(function () { self._removeIsBusy(tmpDiv); }, function (arg) { if (arg == 'cancel') {
                            self._removeIsBusy(tmpDiv);
                        } });
                    }
                    deferred.then(function (loadedEl) { self._onLoadOK(tmpDiv, loadedEl); }, function (arg) { self._onLoadFail(arg); });
                };
                Template.prototype._onLoadOK = function (div, loadedEl) {
                    var self = this, i, tevents, len;
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
                    }
                    catch (ex) {
                        self.handleError(ex, self);
                        RIAPP.throwDummy(ex);
                    }
                };
                Template.prototype._onLoadFail = function (arg) {
                    var self = this;
                    if (self._isDestroyCalled)
                        return;
                    self._promise = null;
                    if (arg == 'cancel') {
                        return;
                    }
                    var ex;
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
                };
                Template.prototype._updateBindingSource = function () {
                    var i, len, binding, bindings = this._getBindings();
                    for (i = 0, len = bindings.length; i < len; i += 1) {
                        binding = bindings[i];
                        if (!binding.isSourceFixed)
                            binding.source = this.dataContext;
                    }
                };
                Template.prototype._unloadTemplate = function () {
                    var i, tevents = this._getTemplateEvents(), len = tevents.length;
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
                };
                Template.prototype._cleanUp = function () {
                    if (!!this._lfTime) {
                        this._lfTime.destroy();
                        this._lfTime = null;
                    }
                    this._templElView = null;
                    if (!!this._loadedElem) {
                        global.$(this._loadedElem).remove();
                    }
                    this._loadedElem = null;
                    if (this._isDestroyCalled && !!this._el) {
                        global.$(this._el).remove();
                        this._el = null;
                    }
                };
                Template.prototype.handleError = function (error, source) {
                    var isHandled = _super.prototype.handleError.call(this, error, source);
                    if (!isHandled) {
                        return this.app.handleError(error, source);
                    }
                    return isHandled;
                };
                Template.prototype.destroy = function () {
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
                    this._options = {};
                    _super.prototype.destroy.call(this);
                };
                Template.prototype.findElByDataName = function (name) {
                    var $foundEl = global.$(this._el).find(['*[', constsMOD.DATA_ATTR.DATA_NAME, '="', name, '"]'].join(''));
                    return $foundEl.toArray();
                };
                Template.prototype.findElViewsByDataName = function (name) {
                    var self = this, els = this.findElByDataName(name), res = [], appMethods = self.app._getInternal();
                    els.forEach(function (el) {
                        var elView = appMethods.getElView(el);
                        if (!!elView)
                            res.push(elView);
                    });
                    return res;
                };
                Template.prototype.toString = function () {
                    return 'Template';
                };
                Object.defineProperty(Template.prototype, "loadedElem", {
                    get: function () {
                        return this._loadedElem;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Template.prototype, "dataContext", {
                    get: function () { return this._options.dataContext; },
                    set: function (v) {
                        if (this.dataContext !== v) {
                            this._options.dataContext = v;
                            this.raisePropertyChanged(PROP_NAME.dataContext);
                            this._updateBindingSource();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Template.prototype, "templateID", {
                    get: function () { return this._options.templateID; },
                    set: function (v) {
                        if (this.templateID !== v) {
                            this._options.templateID = v;
                            this._loadTemplate();
                            this.raisePropertyChanged(PROP_NAME.templateID);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Template.prototype, "el", {
                    get: function () { return this._el; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Template.prototype, "app", {
                    get: function () { return this._options.app; },
                    enumerable: true,
                    configurable: true
                });
                return Template;
            })(RIAPP.BaseObject);
            template_1.Template = Template;
            var TemplateCommand = (function (_super) {
                __extends(TemplateCommand, _super);
                function TemplateCommand(fn_action, thisObj, fn_canExecute) {
                    _super.call(this, fn_action, thisObj, fn_canExecute);
                }
                return TemplateCommand;
            })(mvvmMOD.Command);
            template_1.TemplateCommand = TemplateCommand;
            var TemplateElView = (function (_super) {
                __extends(TemplateElView, _super);
                function TemplateElView(app, el, options) {
                    this._template = null;
                    this._isEnabled = true;
                    _super.call(this, app, el, options);
                }
                TemplateElView.prototype.templateLoading = function (template) {
                };
                TemplateElView.prototype.templateLoaded = function (template) {
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
                };
                TemplateElView.prototype.templateUnLoading = function (template) {
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
                };
                TemplateElView.prototype.toString = function () {
                    return 'TemplateElView';
                };
                Object.defineProperty(TemplateElView.prototype, "isEnabled", {
                    get: function () { return this._isEnabled; },
                    set: function (v) {
                        if (this._isEnabled !== v) {
                            this._isEnabled = v;
                            this.raisePropertyChanged(PROP_NAME.isEnabled);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TemplateElView.prototype, "template", {
                    get: function () {
                        return this._template;
                    },
                    enumerable: true,
                    configurable: true
                });
                return TemplateElView;
            })(elviewMOD.CommandElView);
            template_1.TemplateElView = TemplateElView;
            ;
            global.registerType('Template', Template);
            global.registerElView('template', TemplateElView);
            template_1._isModuleLoaded = true;
        })(template = MOD.template || (MOD.template = {}));
    })(MOD = RIAPP.MOD || (RIAPP.MOD = {}));
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    var MOD;
    (function (MOD) {
        var baseContent;
        (function (baseContent) {
            var constsMOD = RIAPP.consts;
            var utilsMOD = RIAPP.MOD.utils;
            var elviewMOD = RIAPP.MOD.baseElView;
            var bindMOD = RIAPP.MOD.binding;
            var templMOD = RIAPP.MOD.template;
            var utils, parser;
            RIAPP.global.addOnInitialize(function (s, args) {
                utils = s.utils;
                parser = s.parser;
            });
            baseContent.css = {
                content: 'ria-content-field',
                required: 'ria-required-field'
            };
            function parseContentAttr(content_attr) {
                var contentOptions = {
                    name: null,
                    templateInfo: null,
                    bindingInfo: null,
                    displayInfo: null,
                    fieldName: null,
                    options: null
                };
                var attr, temp_opts = parser.parseOptions(content_attr);
                if (temp_opts.length === 0)
                    return contentOptions;
                attr = temp_opts[0];
                if (!attr.template && !!attr.fieldName) {
                    var bindInfo = {
                        target: null, source: null,
                        targetPath: null, sourcePath: attr.fieldName,
                        mode: "OneWay",
                        converter: null, converterParam: null
                    };
                    contentOptions.bindingInfo = bindInfo;
                    contentOptions.displayInfo = attr.css;
                    contentOptions.fieldName = attr.fieldName;
                    if (!!attr.name)
                        contentOptions.name = attr.name;
                    if (!!attr.options)
                        contentOptions.options = attr.options;
                    if (attr.readOnly !== undefined)
                        contentOptions.readOnly = utils.parseBool(attr.readOnly);
                }
                else if (!!attr.template) {
                    contentOptions.templateInfo = attr.template;
                    delete attr.template;
                }
                return contentOptions;
            }
            baseContent.parseContentAttr = parseContentAttr;
            ;
            var BindingContent = (function (_super) {
                __extends(BindingContent, _super);
                function BindingContent(app, options) {
                    _super.call(this);
                    options = utils.extend(false, {
                        app: null,
                        parentEl: null,
                        options: null,
                        dataContext: null,
                        isEditing: false
                    }, options);
                    this._el = null;
                    this._app = app;
                    this._parentEl = options.parentEl;
                    this._isEditing = !!options.isEditing;
                    this._dataContext = options.dataContext;
                    this._options = options.contentOptions;
                    this._isReadOnly = !!this._options.readOnly;
                    this._lfScope = null;
                    this._target = null;
                    var $p = RIAPP.global.$(this._parentEl);
                    $p.addClass(baseContent.css.content);
                    this.init();
                    this.render();
                }
                BindingContent.prototype.handleError = function (error, source) {
                    var isHandled = _super.prototype.handleError.call(this, error, source);
                    if (!isHandled) {
                        return this._app.handleError(error, source);
                    }
                    return isHandled;
                };
                BindingContent.prototype.init = function () { };
                BindingContent.prototype.updateCss = function () {
                    var displayInfo = this._options.displayInfo, $p = RIAPP.global.$(this._parentEl), fieldInfo = this.getFieldInfo();
                    if (this._isEditing && this.getIsCanBeEdited()) {
                        if (!!displayInfo) {
                            if (!!displayInfo.editCss) {
                                $p.addClass(displayInfo.editCss);
                            }
                            if (!!displayInfo.displayCss) {
                                $p.removeClass(displayInfo.displayCss);
                            }
                        }
                        if (!!fieldInfo && !fieldInfo.isNullable) {
                            $p.addClass(baseContent.css.required);
                        }
                    }
                    else {
                        if (!!displayInfo) {
                            if (!!displayInfo.displayCss) {
                                $p.addClass(displayInfo.displayCss);
                            }
                            if (!!displayInfo.editCss) {
                                $p.removeClass(displayInfo.editCss);
                            }
                            if (!!fieldInfo && !fieldInfo.isNullable) {
                                $p.removeClass(baseContent.css.required);
                            }
                        }
                    }
                };
                BindingContent.prototype.getIsCanBeEdited = function () {
                    if (this._isReadOnly)
                        return false;
                    var finf = this.getFieldInfo();
                    if (!finf)
                        return false;
                    var editable = utils.getEditable(this._dataContext);
                    return !!editable && !finf.isReadOnly && finf.fieldType != 2;
                };
                BindingContent.prototype.createTargetElement = function () {
                    var el, doc = RIAPP.global.document, info = { name: null, options: null };
                    if (this._isEditing && this.getIsCanBeEdited()) {
                        el = doc.createElement('input');
                        el.setAttribute('type', 'text');
                        info.options = this._options.options;
                    }
                    else {
                        el = doc.createElement('span');
                    }
                    this.updateCss();
                    this._el = el;
                    return this.getElementView(this._el, info);
                };
                BindingContent.prototype.getBindingOption = function (bindingInfo, target, dataContext, targetPath) {
                    var options = bindMOD.getBindingOptions(this.app, bindingInfo, target, dataContext);
                    if (this.isEditing && this.getIsCanBeEdited())
                        options.mode = 2;
                    else
                        options.mode = 1;
                    if (!!targetPath)
                        options.targetPath = targetPath;
                    return options;
                };
                BindingContent.prototype.getBindings = function () {
                    if (!this._lfScope)
                        return [];
                    var arr = this._lfScope.getObjs(), res = [];
                    for (var i = 0, len = arr.length; i < len; i += 1) {
                        if (bindMOD._isBinding(arr[i]))
                            res.push(arr[i]);
                    }
                    return res;
                };
                BindingContent.prototype.updateBindingSource = function () {
                    var i, len, binding, bindings = this.getBindings();
                    for (i = 0, len = bindings.length; i < len; i += 1) {
                        binding = bindings[i];
                        if (!binding.isSourceFixed)
                            binding.source = this._dataContext;
                    }
                };
                BindingContent.prototype.cleanUp = function () {
                    if (!!this._lfScope) {
                        this._lfScope.destroy();
                        this._lfScope = null;
                    }
                    if (!!this._el) {
                        utils.removeNode(this._el);
                        this._el = null;
                    }
                    this._target = null;
                };
                BindingContent.prototype.getElementView = function (el, view_info) {
                    var elView = this.app._getInternal().getElView(el);
                    if (!!elView)
                        return elView;
                    return this.app._getInternal().createElementView(el, view_info);
                };
                BindingContent.prototype.getFieldInfo = function () {
                    return this._options.fieldInfo;
                };
                BindingContent.prototype.render = function () {
                    try {
                        this.cleanUp();
                        var bindingInfo = this._options.bindingInfo;
                        if (!!bindingInfo) {
                            this._target = this.createTargetElement();
                            this._lfScope = new utilsMOD.LifeTimeScope();
                            if (!!this._target)
                                this._lfScope.addObj(this._target);
                            var options = this.getBindingOption(bindingInfo, this._target, this._dataContext, 'value');
                            this._parentEl.appendChild(this._el);
                            this._lfScope.addObj(this.app.bind(options));
                        }
                    }
                    catch (ex) {
                        RIAPP.reThrow(ex, this.handleError(ex, this));
                    }
                };
                BindingContent.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    var displayInfo = this._options.displayInfo, $p = RIAPP.global.$(this._parentEl);
                    $p.removeClass(baseContent.css.content);
                    $p.removeClass(baseContent.css.required);
                    if (!!displayInfo && !!displayInfo.displayCss) {
                        $p.removeClass(displayInfo.displayCss);
                    }
                    if (!!displayInfo && !!displayInfo.editCss) {
                        $p.removeClass(displayInfo.editCss);
                    }
                    this.cleanUp();
                    this._parentEl = null;
                    this._dataContext = null;
                    this._options = null;
                    this._app = null;
                    _super.prototype.destroy.call(this);
                };
                BindingContent.prototype.toString = function () {
                    return 'BindingContent';
                };
                Object.defineProperty(BindingContent.prototype, "parentEl", {
                    get: function () { return this._parentEl; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BindingContent.prototype, "target", {
                    get: function () { return this._target; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BindingContent.prototype, "isEditing", {
                    get: function () { return this._isEditing; },
                    set: function (v) {
                        if (this._isEditing !== v) {
                            this._isEditing = v;
                            this.render();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BindingContent.prototype, "dataContext", {
                    get: function () { return this._dataContext; },
                    set: function (v) {
                        if (this._dataContext !== v) {
                            this._dataContext = v;
                            this.updateBindingSource();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BindingContent.prototype, "app", {
                    get: function () { return this._app; },
                    enumerable: true,
                    configurable: true
                });
                return BindingContent;
            })(RIAPP.BaseObject);
            baseContent.BindingContent = BindingContent;
            var TemplateContent = (function (_super) {
                __extends(TemplateContent, _super);
                function TemplateContent(app, options) {
                    _super.call(this);
                    options = utils.extend(false, {
                        app: null,
                        parentEl: null,
                        options: null,
                        dataContext: null,
                        isEditing: false
                    }, options);
                    this._app = app;
                    this._templateID = null;
                    this._parentEl = options.parentEl;
                    this._isEditing = options.isEditing;
                    this._dataContext = options.dataContext;
                    this._templateInfo = options.contentOptions.templateInfo;
                    this._template = null;
                    var $p = RIAPP.global.$(this._parentEl);
                    $p.addClass(baseContent.css.content);
                    this.render();
                }
                TemplateContent.prototype.handleError = function (error, source) {
                    var isHandled = _super.prototype.handleError.call(this, error, source);
                    if (!isHandled) {
                        return this._app.handleError(error, source);
                    }
                    return isHandled;
                };
                TemplateContent.prototype.templateLoading = function (template) {
                };
                TemplateContent.prototype.templateLoaded = function (template) {
                };
                TemplateContent.prototype.templateUnLoading = function (template) {
                    this._parentEl.removeChild(template.el);
                };
                TemplateContent.prototype.getTemplateID = function () {
                    if (!this._templateInfo) {
                        throw new Error(RIAPP.ERRS.ERR_TEMPLATE_ID_INVALID);
                    }
                    var info = this._templateInfo, id = info.displayID;
                    if (this._isEditing && !!info.editID) {
                        id = info.editID;
                    }
                    if (!id) {
                        id = info.editID;
                    }
                    if (!id)
                        throw new Error(RIAPP.ERRS.ERR_TEMPLATE_ID_INVALID);
                    return id;
                };
                TemplateContent.prototype.createTemplate = function () {
                    return new templMOD.Template({
                        app: this.app,
                        templateID: this._templateID,
                        dataContext: this._dataContext,
                        templEvents: this
                    });
                };
                TemplateContent.prototype.render = function () {
                    try {
                        var id = this.getTemplateID();
                        if (this._templateID !== id) {
                            this.cleanUp();
                            this._templateID = id;
                            this._template = this.createTemplate();
                            this._parentEl.appendChild(this._template.el);
                        }
                    }
                    catch (ex) {
                        RIAPP.reThrow(ex, this.handleError(ex, this));
                    }
                };
                TemplateContent.prototype.cleanUp = function () {
                    if (!!this._template) {
                        this._template.destroy();
                        this._template = null;
                        this._templateID = null;
                    }
                };
                TemplateContent.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    var $p = RIAPP.global.$(this._parentEl);
                    $p.removeClass(baseContent.css.content);
                    this.cleanUp();
                    this._parentEl = null;
                    this._dataContext = null;
                    this._templateInfo = null;
                    this._app = null;
                    _super.prototype.destroy.call(this);
                };
                TemplateContent.prototype.toString = function () {
                    return 'TemplateContent';
                };
                Object.defineProperty(TemplateContent.prototype, "app", {
                    get: function () { return this._app; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TemplateContent.prototype, "parentEl", {
                    get: function () { return this._parentEl; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TemplateContent.prototype, "template", {
                    get: function () { return this._template; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TemplateContent.prototype, "isEditing", {
                    get: function () { return this._isEditing; },
                    set: function (v) {
                        if (this._isEditing !== v) {
                            this._isEditing = v;
                            this.render();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TemplateContent.prototype, "dataContext", {
                    get: function () { return this._dataContext; },
                    set: function (v) {
                        if (this._dataContext !== v) {
                            this._dataContext = v;
                            if (!!this._template) {
                                this._template.dataContext = this._dataContext;
                            }
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return TemplateContent;
            })(RIAPP.BaseObject);
            baseContent.TemplateContent = TemplateContent;
            var BoolContent = (function (_super) {
                __extends(BoolContent, _super);
                function BoolContent() {
                    _super.apply(this, arguments);
                }
                BoolContent.prototype.init = function () {
                    this._target = this.createTargetElement();
                    var bindingInfo = this._options.bindingInfo;
                    if (!!bindingInfo) {
                        this.updateCss();
                        this._lfScope = new utilsMOD.LifeTimeScope();
                        var options = this.getBindingOption(bindingInfo, this._target, this._dataContext, 'checked');
                        options.mode = 2;
                        this._lfScope.addObj(this.app.bind(options));
                    }
                };
                BoolContent.prototype.cleanUp = function () {
                    return;
                };
                BoolContent.prototype.createCheckBoxView = function () {
                    var el = RIAPP.global.document.createElement('input');
                    el.setAttribute('type', 'checkbox');
                    var chbxView = new elviewMOD.CheckBoxElView(this.app, el, {});
                    return chbxView;
                };
                BoolContent.prototype.createTargetElement = function () {
                    var tgt = this._target;
                    if (!tgt) {
                        tgt = this.createCheckBoxView();
                        this._el = tgt.el;
                    }
                    this._parentEl.appendChild(this._el);
                    return tgt;
                };
                BoolContent.prototype.updateCss = function () {
                    _super.prototype.updateCss.call(this);
                    var el = this._el;
                    if (this.isEditing && this.getIsCanBeEdited()) {
                        if (el.disabled)
                            el.disabled = false;
                    }
                    else {
                        if (!el.disabled)
                            el.disabled = true;
                    }
                };
                BoolContent.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._lfScope) {
                        this._lfScope.destroy();
                        this._lfScope = null;
                    }
                    if (!!this._target) {
                        this._target.destroy();
                        this._target = null;
                    }
                    _super.prototype.destroy.call(this);
                };
                BoolContent.prototype.render = function () {
                    this.cleanUp();
                    this.updateCss();
                };
                BoolContent.prototype.toString = function () {
                    return 'BoolContent';
                };
                return BoolContent;
            })(BindingContent);
            baseContent.BoolContent = BoolContent;
            var DateContent = (function (_super) {
                __extends(DateContent, _super);
                function DateContent(app, options) {
                    if (options.contentOptions.name != 'datepicker') {
                        throw new Error(utils.format(RIAPP.ERRS.ERR_ASSERTION_FAILED, "contentOptions.name == 'datepicker'"));
                    }
                    _super.call(this, app, options);
                }
                DateContent.prototype.getBindingOption = function (bindingInfo, tgt, dctx, targetPath) {
                    var options = _super.prototype.getBindingOption.call(this, bindingInfo, tgt, dctx, targetPath);
                    options.converter = this.app.getConverter('dateConverter');
                    return options;
                };
                DateContent.prototype.createTargetElement = function () {
                    var el, doc = RIAPP.global.document, info = { name: null, options: null };
                    if (this.isEditing && this.getIsCanBeEdited()) {
                        el = doc.createElement('input');
                        el.setAttribute('type', 'text');
                        info.options = this._options.options;
                        info.name = 'datepicker';
                    }
                    else {
                        el = doc.createElement('span');
                    }
                    this.updateCss();
                    this._el = el;
                    return this.getElementView(this._el, info);
                };
                DateContent.prototype.toString = function () {
                    return 'DateContent';
                };
                return DateContent;
            })(BindingContent);
            baseContent.DateContent = DateContent;
            var DateTimeContent = (function (_super) {
                __extends(DateTimeContent, _super);
                function DateTimeContent() {
                    _super.apply(this, arguments);
                }
                DateTimeContent.prototype.getBindingOption = function (bindingInfo, tgt, dctx, targetPath) {
                    var options = _super.prototype.getBindingOption.call(this, bindingInfo, tgt, dctx, targetPath);
                    options.converter = this.app.getConverter('dateTimeConverter');
                    var finf = this.getFieldInfo(), defaults = RIAPP.global.defaults;
                    switch (finf.dataType) {
                        case 6:
                            options.converterParam = defaults.dateTimeFormat;
                            break;
                        case 7:
                            options.converterParam = defaults.dateFormat;
                            break;
                        case 8:
                            options.converterParam = defaults.timeFormat;
                            break;
                        default:
                            options.converterParam = null;
                            break;
                    }
                    return options;
                };
                DateTimeContent.prototype.toString = function () {
                    return 'DateTimeContent';
                };
                return DateTimeContent;
            })(BindingContent);
            baseContent.DateTimeContent = DateTimeContent;
            var NumberContent = (function (_super) {
                __extends(NumberContent, _super);
                function NumberContent() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(NumberContent.prototype, "_allowedKeys", {
                    get: function () {
                        if (!NumberContent.__allowedKeys) {
                            NumberContent.__allowedKeys = [0, 8, 127, 37, 39, 35, 36, 9, 27, 13];
                        }
                        return NumberContent.__allowedKeys;
                    },
                    enumerable: true,
                    configurable: true
                });
                NumberContent.prototype.getBindingOption = function (bindingInfo, tgt, dctx, targetPath) {
                    var options = _super.prototype.getBindingOption.call(this, bindingInfo, tgt, dctx, targetPath);
                    var finf = this.getFieldInfo();
                    switch (finf.dataType) {
                        case 3:
                            options.converter = this.app.getConverter('integerConverter');
                            break;
                        case 4:
                            options.converter = this.app.getConverter('decimalConverter');
                            break;
                        default:
                            options.converter = this.app.getConverter('floatConverter');
                            break;
                    }
                    return options;
                };
                NumberContent.prototype.render = function () {
                    _super.prototype.render.call(this);
                    var self = this;
                    if (self._target instanceof elviewMOD.TextBoxElView) {
                        self._target.addOnKeyPress(function (sender, args) {
                            args.isCancel = !self.previewKeyPress(args.keyCode, args.value);
                        });
                    }
                };
                NumberContent.prototype.previewKeyPress = function (keyCode, value) {
                    var ch = String.fromCharCode(keyCode), digits = "1234567890", defaults = RIAPP.global.defaults, notAllowedChars = "~@#$%^&*()+=_";
                    if (notAllowedChars.indexOf(ch) > -1)
                        return false;
                    if (this._allowedKeys.indexOf(keyCode) > -1)
                        return true;
                    if (ch === "-" && value.length === 0)
                        return true;
                    if (ch === defaults.decimalPoint) {
                        if (value.length === 0)
                            return false;
                        else
                            return value.indexOf(ch) < 0;
                    }
                    if (ch === defaults.thousandSep)
                        return true;
                    else
                        return digits.indexOf(ch) > -1;
                };
                NumberContent.prototype.toString = function () {
                    return 'NumberContent';
                };
                NumberContent.__allowedKeys = null;
                return NumberContent;
            })(BindingContent);
            baseContent.NumberContent = NumberContent;
            var StringContent = (function (_super) {
                __extends(StringContent, _super);
                function StringContent() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(StringContent.prototype, "_allowedKeys", {
                    get: function () {
                        if (!StringContent.__allowedKeys) {
                            StringContent.__allowedKeys = [0, 8, 127, 37, 39, 35, 36, 9, 27, 13];
                        }
                        return StringContent.__allowedKeys;
                    },
                    enumerable: true,
                    configurable: true
                });
                StringContent.prototype.render = function () {
                    _super.prototype.render.call(this);
                    var self = this, fieldInfo = self.getFieldInfo();
                    if (self._target instanceof elviewMOD.TextBoxElView) {
                        self._target.addOnKeyPress(function (sender, args) {
                            args.isCancel = !self.previewKeyPress(fieldInfo, args.keyCode, args.value);
                        });
                    }
                };
                StringContent.prototype.previewKeyPress = function (fieldInfo, keyCode, value) {
                    if (this._allowedKeys.indexOf(keyCode) > -1)
                        return true;
                    return !(fieldInfo.maxLength > 0 && value.length >= fieldInfo.maxLength);
                };
                StringContent.prototype.toString = function () {
                    return 'StringContent';
                };
                StringContent.__allowedKeys = null;
                return StringContent;
            })(BindingContent);
            baseContent.StringContent = StringContent;
            var MultyLineContent = (function (_super) {
                __extends(MultyLineContent, _super);
                function MultyLineContent(app, options) {
                    if (options.contentOptions.name != 'multyline') {
                        throw new Error(utils.format(RIAPP.ERRS.ERR_ASSERTION_FAILED, "contentOptions.name == 'multyline'"));
                    }
                    _super.call(this, app, options);
                }
                Object.defineProperty(MultyLineContent.prototype, "_allowedKeys", {
                    get: function () {
                        if (!MultyLineContent.__allowedKeys) {
                            MultyLineContent.__allowedKeys = [0, 8, 127, 37, 39, 35, 36, 9, 27, 13];
                        }
                        return MultyLineContent.__allowedKeys;
                    },
                    enumerable: true,
                    configurable: true
                });
                MultyLineContent.prototype.createTargetElement = function () {
                    var el, info = { name: null, options: null };
                    if (this.isEditing && this.getIsCanBeEdited()) {
                        el = RIAPP.global.document.createElement('textarea');
                        info.options = this._options.options;
                        info.name = null;
                    }
                    else {
                        el = RIAPP.global.document.createElement('div');
                    }
                    this.updateCss();
                    this._el = el;
                    return this.getElementView(this._el, info);
                };
                MultyLineContent.prototype.render = function () {
                    _super.prototype.render.call(this);
                    var self = this, fieldInfo = self.getFieldInfo();
                    if (self._target instanceof elviewMOD.TextAreaElView) {
                        self._target.addOnKeyPress(function (sender, args) {
                            args.isCancel = !self.previewKeyPress(fieldInfo, args.keyCode, args.value);
                        });
                    }
                };
                MultyLineContent.prototype.previewKeyPress = function (fieldInfo, keyCode, value) {
                    if (this._allowedKeys.indexOf(keyCode) > -1)
                        return true;
                    return !(fieldInfo.maxLength > 0 && value.length >= fieldInfo.maxLength);
                };
                MultyLineContent.prototype.toString = function () {
                    return 'MultyLineContent';
                };
                MultyLineContent.__allowedKeys = null;
                return MultyLineContent;
            })(BindingContent);
            baseContent.MultyLineContent = MultyLineContent;
            var ContentFactory = (function () {
                function ContentFactory(app, nextFactory) {
                    this._app = app;
                    this._nextFactory = nextFactory;
                }
                ContentFactory.prototype.getContentType = function (options) {
                    if (!!options.templateInfo) {
                        return TemplateContent;
                    }
                    if (!options.bindingInfo) {
                        throw new Error(utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'options', 'bindingInfo'));
                    }
                    var fieldInfo = options.fieldInfo, res;
                    switch (fieldInfo.dataType) {
                        case 0:
                            res = BindingContent;
                            break;
                        case 1:
                            if (options.name == 'multyline')
                                res = MultyLineContent;
                            else
                                res = StringContent;
                            break;
                        case 2:
                            res = BoolContent;
                            break;
                        case 3:
                            res = NumberContent;
                            break;
                        case 4:
                        case 5:
                            res = NumberContent;
                            break;
                        case 6:
                        case 8:
                            res = DateTimeContent;
                            break;
                        case 7:
                            if (options.name == 'datepicker')
                                res = DateContent;
                            else
                                res = DateTimeContent;
                            break;
                        case 9:
                        case 10:
                            res = BindingContent;
                            break;
                        default:
                            throw new Error(utils.format(RIAPP.ERRS.ERR_FIELD_DATATYPE, fieldInfo.dataType));
                    }
                    if (!res && this._nextFactory) {
                        res = this._nextFactory.getContentType(options);
                    }
                    if (!res)
                        throw new Error(RIAPP.ERRS.ERR_BINDING_CONTENT_NOT_FOUND);
                    return res;
                };
                ContentFactory.prototype.createContent = function (options) {
                    var contentType = this.getContentType(options.contentOptions);
                    return new contentType(this.app, options);
                };
                ContentFactory.prototype.isExternallyCachable = function (contentType) {
                    return false;
                };
                Object.defineProperty(ContentFactory.prototype, "app", {
                    get: function () { return this._app; },
                    enumerable: true,
                    configurable: true
                });
                return ContentFactory;
            })();
            baseContent.ContentFactory = ContentFactory;
            var FactoryList = (function () {
                function FactoryList(app) {
                    this._list = [];
                    this._factory = null;
                    this.addFactory(function (nextFactory) {
                        return new ContentFactory(app, nextFactory);
                    });
                }
                FactoryList.prototype.addFactory = function (fn) {
                    this._list.push(fn);
                };
                FactoryList.prototype.init = function () {
                    var nextFactory = null;
                    this._list.forEach(function (getFactory) {
                        nextFactory = getFactory(nextFactory);
                    });
                    this._factory = nextFactory;
                };
                FactoryList.prototype.getContentType = function (options) {
                    if (!this._factory)
                        this.init();
                    return this._factory.getContentType(options);
                };
                FactoryList.prototype.createContent = function (options) {
                    if (!this._factory)
                        this.init();
                    return this._factory.createContent(options);
                };
                FactoryList.prototype.isExternallyCachable = function (contentType) {
                    if (!this._factory)
                        this.init();
                    return this._factory.isExternallyCachable(contentType);
                };
                return FactoryList;
            })();
            baseContent.FactoryList = FactoryList;
            baseContent._isModuleLoaded = true;
        })(baseContent = MOD.baseContent || (MOD.baseContent = {}));
    })(MOD = RIAPP.MOD || (RIAPP.MOD = {}));
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    var MOD;
    (function (MOD) {
        var collection;
        (function (collection_1) {
            var constsMOD = RIAPP.consts;
            var utilsMOD = RIAPP.MOD.utils;
            var errorsMOD = RIAPP.MOD.errors;
            var ValidationError = errorsMOD.ValidationError, valueUtils = utilsMOD.valueUtils, baseUtils = RIAPP.baseUtils, utils;
            RIAPP.global.addOnInitialize(function (s, args) {
                utils = s.utils;
            });
            collection._isCollection = function (obj) { return (obj instanceof BaseCollection); };
            collection._getItemByProp = function (obj, prop) {
                if (obj instanceof BaseDictionary) {
                    return obj.getItemByKey(prop);
                }
                else if (obj instanceof BaseCollection) {
                    obj.getItemByPos(parseInt(prop, 10));
                }
                else
                    return null;
            };
            function fn_getPropertyByName(name, props) {
                var arrProps = props.filter(function (f) { return f.fieldName == name; });
                if (!arrProps || arrProps.length != 1)
                    throw new Error(utils.format(RIAPP.ERRS.ERR_ASSERTION_FAILED, "arrProps.length == 1"));
                return arrProps[0];
            }
            collection_1.fn_getPropertyByName = fn_getPropertyByName;
            function fn_traverseField(fld, fn) {
                function _fn_traverseField(name, fld, fn) {
                    if (fld.fieldType == 5) {
                        fn(name, fld);
                        if (!!fld.nested && fld.nested.length > 0) {
                            var prop, i, len = fld.nested.length;
                            for (i = 0; i < len; i += 1) {
                                prop = fld.nested[i];
                                if (prop.fieldType == 5) {
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
            collection_1.fn_traverseField = fn_traverseField;
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
            var ItemAspect = (function (_super) {
                __extends(ItemAspect, _super);
                function ItemAspect(collection) {
                    _super.call(this);
                    this.__key = null;
                    this.__isEditing = false;
                    this._collection = collection;
                    this._status = 0;
                    this._saveVals = null;
                    this._vals = {};
                    this._notEdited = true;
                }
                Object.defineProperty(ItemAspect.prototype, "_isEditing", {
                    get: function () {
                        return this.__isEditing;
                    },
                    set: function (v) {
                        if (this.__isEditing != v) {
                            this.__isEditing = v;
                            this.raisePropertyChanged(PROP_NAME.isEditing);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                ItemAspect.prototype._getEventNames = function () {
                    var base_events = _super.prototype._getEventNames.call(this);
                    return [ITEM_EVENTS.errors_changed].concat(base_events);
                };
                ItemAspect.prototype._onErrorsChanged = function (args) {
                    this.raiseEvent(ITEM_EVENTS.errors_changed, args);
                };
                ItemAspect.prototype.handleError = function (error, source) {
                    var isHandled = _super.prototype.handleError.call(this, error, source);
                    if (!isHandled) {
                        return this.collection.handleError(error, source);
                    }
                    return isHandled;
                };
                ItemAspect.prototype._beginEdit = function () {
                    var coll = this.collection, isHandled;
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
                        }
                        catch (ex) {
                            isHandled = this.handleError(ex, eitem);
                            eitem._aspect.cancelEdit();
                            RIAPP.reThrow(ex, isHandled);
                        }
                    }
                    if (!this.key)
                        return false;
                    this._isEditing = true;
                    this._saveVals = utils.cloneObj(this._vals);
                    this.collection.currentItem = this.getItem();
                    return true;
                };
                ItemAspect.prototype._endEdit = function () {
                    if (!this.__isEditing)
                        return false;
                    var coll = this.collection, self = this;
                    if (this.getIsHasErrors()) {
                        return false;
                    }
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
                };
                ItemAspect.prototype._cancelEdit = function () {
                    if (!this._isEditing)
                        return false;
                    var coll = this.collection, isNew = this.isNew, self = this;
                    var changes = this._saveVals;
                    this._vals = this._saveVals;
                    this._saveVals = null;
                    coll._getInternal().removeAllErrors(this.getItem());
                    coll.getFieldNames().forEach(function (name) {
                        if (changes[name] !== self._vals[name])
                            self.raisePropertyChanged(name);
                    });
                    this._isEditing = false;
                    if (isNew && this._notEdited)
                        coll.removeItem(this.getItem());
                    return true;
                };
                ItemAspect.prototype._validate = function () {
                    return this.collection._getInternal().validateItem(this.getItem());
                };
                ItemAspect.prototype._skipValidate = function (fieldInfo, val) {
                    return false;
                };
                ItemAspect.prototype._validateField = function (fieldName) {
                    var val, fieldInfo = this.getFieldInfo(fieldName), res = null;
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
                    }
                    catch (ex) {
                        res = { fieldName: fieldName, errors: [ex.message] };
                    }
                    var tmp = this.collection._getInternal().validateItemField(this.getItem(), fieldName);
                    if (!!res && !!tmp) {
                        res.errors = res.errors.concat(tmp.errors);
                    }
                    else if (!!tmp)
                        res = tmp;
                    return res;
                };
                ItemAspect.prototype._validateAll = function () {
                    var self = this, fieldInfos = this.collection.getFieldInfos(), errs = [];
                    fieldInfos.forEach(function (fld) {
                        fn_traverseField(fld, function (name, fld) {
                            if (fld.fieldType != 5) {
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
                };
                ItemAspect.prototype._checkVal = function (fieldInfo, val) {
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
                        case 0:
                            break;
                        case 9:
                        case 1:
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
                        case 10:
                            if (!utils.check.isArray(val)) {
                                throw new Error(utils.format(ERRS.ERR_FIELD_WRONG_TYPE, val, 'Array'));
                            }
                            if (fieldInfo.maxLength > 0 && val.length > fieldInfo.maxLength)
                                throw new Error(utils.format(ERRS.ERR_FIELD_MAXLEN, fieldInfo.maxLength));
                            break;
                        case 2:
                            if (!utils.check.isBoolean(val))
                                throw new Error(utils.format(ERRS.ERR_FIELD_WRONG_TYPE, val, 'Boolean'));
                            break;
                        case 3:
                        case 4:
                        case 5:
                            if (!utils.check.isNumber(val))
                                throw new Error(utils.format(ERRS.ERR_FIELD_WRONG_TYPE, val, 'Number'));
                            if (!!fieldInfo.range) {
                                utils.validation.checkNumRange(Number(val), fieldInfo.range);
                            }
                            break;
                        case 6:
                        case 7:
                            if (!utils.check.isDate(val))
                                throw new Error(utils.format(ERRS.ERR_FIELD_WRONG_TYPE, val, 'Date'));
                            if (!!fieldInfo.range) {
                                utils.validation.checkDateRange(val, fieldInfo.range);
                            }
                            break;
                        case 8:
                            if (!utils.check.isDate(val))
                                throw new Error(utils.format(ERRS.ERR_FIELD_WRONG_TYPE, val, 'Time'));
                            break;
                        default:
                            throw new Error(utils.format(ERRS.ERR_PARAM_INVALID, 'dataType', fieldInfo.dataType));
                    }
                    return res;
                };
                ItemAspect.prototype._resetIsNew = function () {
                };
                ItemAspect.prototype._onAttaching = function () {
                };
                ItemAspect.prototype._onAttach = function () {
                };
                ItemAspect.prototype.raiseErrorsChanged = function (args) {
                    this._onErrorsChanged(args);
                };
                ItemAspect.prototype.getFieldInfo = function (fieldName) {
                    return this.collection.getFieldInfo(fieldName);
                };
                ItemAspect.prototype.getFieldNames = function () {
                    return this.collection.getFieldNames();
                };
                ItemAspect.prototype.getErrorString = function () {
                    var itemErrors = this.collection._getInternal().getErrors(this.getItem());
                    if (!itemErrors)
                        return '';
                    var res = [];
                    utils.forEachProp(itemErrors, function (name) {
                        res.push(baseUtils.format('{0}: {1}', name, itemErrors[name]));
                    });
                    return res.join('|');
                };
                ItemAspect.prototype.submitChanges = function () {
                    var deffered = utils.createDeferred();
                    deffered.reject();
                    return deffered.promise();
                };
                ItemAspect.prototype.rejectChanges = function () {
                };
                ItemAspect.prototype.beginEdit = function () {
                    var coll = this.collection;
                    if (!this._beginEdit())
                        return false;
                    coll._getInternal().onEditing(this.getItem(), true, false);
                    return true;
                };
                ItemAspect.prototype.endEdit = function () {
                    var coll = this.collection;
                    if (!this._endEdit())
                        return false;
                    coll._getInternal().onEditing(this.getItem(), false, false);
                    this._notEdited = false;
                    return true;
                };
                ItemAspect.prototype.cancelEdit = function () {
                    var coll = this.collection;
                    if (!this._cancelEdit())
                        return false;
                    coll._getInternal().onEditing(this.getItem(), false, true);
                    return true;
                };
                ItemAspect.prototype.deleteItem = function () {
                    var coll = this.collection;
                    if (!this.key)
                        return false;
                    var args = { item: this.getItem(), isCancel: false };
                    coll._getInternal().onItemDeleting(args);
                    if (args.isCancel) {
                        return false;
                    }
                    coll.removeItem(this.getItem());
                    return true;
                };
                ItemAspect.prototype.getIsHasErrors = function () {
                    var itemErrors = this.collection._getInternal().getErrors(this.getItem());
                    return !!itemErrors;
                };
                ItemAspect.prototype.addOnErrorsChanged = function (fn, nmspace, context) {
                    this._addHandler(ITEM_EVENTS.errors_changed, fn, nmspace, context);
                };
                ItemAspect.prototype.removeOnErrorsChanged = function (nmspace) {
                    this._removeHandler(ITEM_EVENTS.errors_changed, nmspace);
                };
                ItemAspect.prototype.getFieldErrors = function (fieldName) {
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
                };
                ItemAspect.prototype.getAllErrors = function () {
                    var itemErrors = this.collection._getInternal().getErrors(this.getItem());
                    if (!itemErrors)
                        return [];
                    var res = [];
                    utils.forEachProp(itemErrors, function (name) {
                        var fieldName = null;
                        if (name !== '*') {
                            fieldName = name;
                        }
                        res.push({ fieldName: fieldName, errors: itemErrors[name] });
                    });
                    return res;
                };
                ItemAspect.prototype.getIErrorNotification = function () {
                    return this;
                };
                ItemAspect.prototype.destroy = function () {
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
                    _super.prototype.destroy.call(this);
                };
                ItemAspect.prototype.toString = function () {
                    return 'ItemAspect';
                };
                ItemAspect.prototype.getItem = function () {
                    throw new Error('Not implemented');
                };
                Object.defineProperty(ItemAspect.prototype, "isCanSubmit", {
                    get: function () { return false; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ItemAspect.prototype, "status", {
                    get: function () { return this._status; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ItemAspect.prototype, "isNew", {
                    get: function () {
                        return false;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ItemAspect.prototype, "isDeleted", {
                    get: function () { return false; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ItemAspect.prototype, "key", {
                    get: function () { return this.__key; },
                    set: function (v) {
                        if (v !== null)
                            v = '' + v;
                        this.__key = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ItemAspect.prototype, "collection", {
                    get: function () { return this._collection; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ItemAspect.prototype, "isUpdating", {
                    get: function () {
                        var coll = this.collection;
                        if (!coll)
                            return false;
                        return coll.isUpdating;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ItemAspect.prototype, "isEditing", {
                    get: function () { return this.__isEditing; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ItemAspect.prototype, "isHasChanges", {
                    get: function () { return this._status !== 0; },
                    enumerable: true,
                    configurable: true
                });
                return ItemAspect;
            })(RIAPP.BaseObject);
            collection_1.ItemAspect = ItemAspect;
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
            var BaseCollection = (function (_super) {
                __extends(BaseCollection, _super);
                function BaseCollection() {
                    _super.call(this);
                    var self = this;
                    this._options = { enablePaging: false, pageSize: 50 };
                    this._isLoading = false;
                    this._isClearing = false;
                    this._isUpdating = false;
                    this._EditingItem = null;
                    this._perms = { canAddRow: true, canEditRow: true, canDeleteRow: true, canRefreshRow: false };
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
                        getEditingItem: function () {
                            return self._getEditingItem();
                        },
                        getStrValue: function (val, fieldInfo) {
                            return self._getStrValue(val, fieldInfo);
                        },
                        onEditing: function (item, isBegin, isCanceled) {
                            self._onEditing(item, isBegin, isCanceled);
                        },
                        onCommitChanges: function (item, isBegin, isRejected, status) {
                            self._onCommitChanges(item, isBegin, isRejected, status);
                        },
                        validateItem: function (item) {
                            return self._validateItem(item);
                        },
                        validateItemField: function (item, fieldName) {
                            return self._validateItemField(item, fieldName);
                        },
                        addErrors: function (item, errors) {
                            self._addErrors(item, errors);
                        },
                        addError: function (item, fieldName, errors) {
                            self._addError(item, fieldName, errors);
                        },
                        removeError: function (item, fieldName) {
                            self._removeError(item, fieldName);
                        },
                        removeAllErrors: function (item) {
                            self._removeAllErrors(item);
                        },
                        getErrors: function (item) {
                            return self._getErrors(item);
                        },
                        onErrorsChanged: function (item) {
                            self._onErrorsChanged(item);
                        },
                        onItemDeleting: function (args) {
                            return self._onItemDeleting(args);
                        }
                    };
                }
                BaseCollection.getEmptyFieldInfo = function (fieldName) {
                    var fieldInfo = {
                        fieldName: fieldName,
                        isPrimaryKey: 0,
                        dataType: 0,
                        isNullable: true,
                        maxLength: -1,
                        isReadOnly: false,
                        isAutoGenerated: false,
                        allowClientDefault: false,
                        dateConversion: 0,
                        fieldType: 1,
                        isNeedOriginal: false,
                        range: null,
                        regex: null,
                        nested: null,
                        dependentOn: null,
                        fullName: null
                    };
                    return fieldInfo;
                };
                BaseCollection.prototype._getEventNames = function () {
                    var base_events = _super.prototype._getEventNames.call(this);
                    var events = Object.keys(COLL_EVENTS).map(function (key, i, arr) { return COLL_EVENTS[key]; });
                    return events.concat(base_events);
                };
                BaseCollection.prototype.handleError = function (error, source) {
                    var isHandled = _super.prototype.handleError.call(this, error, source);
                    if (!isHandled) {
                        return RIAPP.global.handleError(error, source);
                    }
                    return isHandled;
                };
                BaseCollection.prototype.addOnClearing = function (fn, nmspace, context, prepend) {
                    this._addHandler(COLL_EVENTS.clearing, fn, nmspace, context, prepend);
                };
                BaseCollection.prototype.removeOnClearing = function (nmspace) {
                    this._removeHandler(COLL_EVENTS.clearing, nmspace);
                };
                BaseCollection.prototype.addOnCleared = function (fn, nmspace, context, prepend) {
                    this._addHandler(COLL_EVENTS.cleared, fn, nmspace, context, prepend);
                };
                BaseCollection.prototype.removeOnCleared = function (nmspace) {
                    this._removeHandler(COLL_EVENTS.cleared, nmspace);
                };
                BaseCollection.prototype.addOnFill = function (fn, nmspace, context, prepend) {
                    this._addHandler(COLL_EVENTS.fill, fn, nmspace, context, prepend);
                };
                BaseCollection.prototype.removeOnFill = function (nmspace) {
                    this._removeHandler(COLL_EVENTS.fill, nmspace);
                };
                BaseCollection.prototype.addOnCollChanged = function (fn, nmspace, context, prepend) {
                    this._addHandler(COLL_EVENTS.collection_changed, fn, nmspace, context, prepend);
                };
                BaseCollection.prototype.removeOnCollChanged = function (nmspace) {
                    this._removeHandler(COLL_EVENTS.collection_changed, nmspace);
                };
                BaseCollection.prototype.addOnValidate = function (fn, nmspace, context, prepend) {
                    this._addHandler(COLL_EVENTS.validate, fn, nmspace, context, prepend);
                };
                BaseCollection.prototype.removeOnValidate = function (nmspace) {
                    this._removeHandler(COLL_EVENTS.validate, nmspace);
                };
                BaseCollection.prototype.addOnItemDeleting = function (fn, nmspace, context, prepend) {
                    this._addHandler(COLL_EVENTS.item_deleting, fn, nmspace, context, prepend);
                };
                BaseCollection.prototype.removeOnItemDeleting = function (nmspace) {
                    this._removeHandler(COLL_EVENTS.item_deleting, nmspace);
                };
                BaseCollection.prototype.addOnItemAdding = function (fn, nmspace, context, prepend) {
                    this._addHandler(COLL_EVENTS.item_adding, fn, nmspace, context, prepend);
                };
                BaseCollection.prototype.removeOnItemAdding = function (nmspace) {
                    this._removeHandler(COLL_EVENTS.item_adding, nmspace);
                };
                BaseCollection.prototype.addOnItemAdded = function (fn, nmspace, context, prepend) {
                    this._addHandler(COLL_EVENTS.item_added, fn, nmspace, context, prepend);
                };
                BaseCollection.prototype.removeOnItemAdded = function (nmspace) {
                    this._removeHandler(COLL_EVENTS.item_added, nmspace);
                };
                BaseCollection.prototype.addOnCurrentChanging = function (fn, nmspace, context, prepend) {
                    this._addHandler(COLL_EVENTS.current_changing, fn, nmspace, context, prepend);
                };
                BaseCollection.prototype.removeOnCurrentChanging = function (nmspace) {
                    this._removeHandler(COLL_EVENTS.current_changing, nmspace);
                };
                BaseCollection.prototype.addOnPageChanging = function (fn, nmspace, context, prepend) {
                    this._addHandler(COLL_EVENTS.page_changing, fn, nmspace, context, prepend);
                };
                BaseCollection.prototype.removeOnPageChanging = function (nmspace) {
                    this._removeHandler(COLL_EVENTS.page_changing, nmspace);
                };
                BaseCollection.prototype.addOnErrorsChanged = function (fn, nmspace, context, prepend) {
                    this._addHandler(COLL_EVENTS.errors_changed, fn, nmspace, context, prepend);
                };
                BaseCollection.prototype.removeOnErrorsChanged = function (nmspace) {
                    this._removeHandler(COLL_EVENTS.errors_changed, nmspace);
                };
                BaseCollection.prototype.addOnBeginEdit = function (fn, nmspace, context, prepend) {
                    this._addHandler(COLL_EVENTS.begin_edit, fn, nmspace, context, prepend);
                };
                BaseCollection.prototype.removeOnBeginEdit = function (nmspace) {
                    this._removeHandler(COLL_EVENTS.begin_edit, nmspace);
                };
                BaseCollection.prototype.addOnEndEdit = function (fn, nmspace, context, prepend) {
                    this._addHandler(COLL_EVENTS.end_edit, fn, nmspace, context, prepend);
                };
                BaseCollection.prototype.removeOnEndEdit = function (nmspace) {
                    this._removeHandler(COLL_EVENTS.end_edit, nmspace);
                };
                BaseCollection.prototype.addOnCommitChanges = function (fn, nmspace, context, prepend) {
                    this._addHandler(COLL_EVENTS.commit_changes, fn, nmspace, context, prepend);
                };
                BaseCollection.prototype.removeOnCommitChanges = function (nmspace) {
                    this._removeHandler(COLL_EVENTS.commit_changes, nmspace);
                };
                BaseCollection.prototype.addOnStatusChanged = function (fn, nmspace, context, prepend) {
                    this._addHandler(COLL_EVENTS.status_changed, fn, nmspace, context, prepend);
                };
                BaseCollection.prototype.removeOnStatusChanged = function (nmspace) {
                    this._removeHandler(COLL_EVENTS.status_changed, nmspace);
                };
                BaseCollection.prototype.addOnPageIndexChanged = function (handler, nmspace, context) {
                    this.addOnPropertyChange(PROP_NAME.pageIndex, handler, nmspace, context);
                };
                BaseCollection.prototype.addOnPageSizeChanged = function (handler, nmspace, context) {
                    this.addOnPropertyChange(PROP_NAME.pageSize, handler, nmspace, context);
                };
                BaseCollection.prototype.addOnTotalCountChanged = function (handler, nmspace, context) {
                    this.addOnPropertyChange(PROP_NAME.totalCount, handler, nmspace, context);
                };
                BaseCollection.prototype.addOnCurrentChanged = function (handler, nmspace, context) {
                    this.addOnPropertyChange(PROP_NAME.currentItem, handler, nmspace, context);
                };
                BaseCollection.prototype._getPKFieldInfos = function () {
                    if (!!this._pkInfo)
                        return this._pkInfo;
                    var fldMap = this._fieldMap, pk = [];
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
                };
                BaseCollection.prototype._onCurrentChanging = function (newCurrent) {
                    try {
                        this.endEdit();
                    }
                    catch (ex) {
                        RIAPP.reThrow(ex, this.handleError(ex, this));
                    }
                    this.raiseEvent(COLL_EVENTS.current_changing, { newCurrent: newCurrent });
                };
                BaseCollection.prototype._onCurrentChanged = function () {
                    this.raisePropertyChanged(PROP_NAME.currentItem);
                };
                BaseCollection.prototype._onCountChanged = function () {
                    this.raisePropertyChanged(PROP_NAME.count);
                };
                BaseCollection.prototype._onEditingChanged = function () {
                    this.raisePropertyChanged(PROP_NAME.isEditing);
                };
                BaseCollection.prototype._onItemStatusChanged = function (item, oldStatus) {
                    this.raiseEvent(COLL_EVENTS.status_changed, { item: item, oldStatus: oldStatus, key: item._key });
                };
                BaseCollection.prototype._onFillStart = function (args) {
                    this.raiseEvent(COLL_EVENTS.fill, args);
                };
                BaseCollection.prototype._onFillEnd = function (args) {
                    this.raiseEvent(COLL_EVENTS.fill, args);
                };
                BaseCollection.prototype._onCollectionChanged = function (args) {
                    this.raiseEvent(COLL_EVENTS.collection_changed, args);
                };
                BaseCollection.prototype._onItemAdding = function (item) {
                    var args = { item: item, isCancel: false };
                    this.raiseEvent(COLL_EVENTS.item_adding, args);
                    if (args.isCancel)
                        RIAPP.throwDummy(new Error('operation canceled'));
                };
                BaseCollection.prototype._onItemAdded = function (item) {
                    var args = { item: item, isAddNewHandled: false };
                    this.raiseEvent(COLL_EVENTS.item_added, args);
                };
                BaseCollection.prototype._createNew = function () {
                    throw new Error('_createNew Not implemented');
                };
                BaseCollection.prototype._attach = function (item, itemPos) {
                    if (!!this._itemsByKey[item._key]) {
                        throw new Error(RIAPP.ERRS.ERR_ITEM_IS_ATTACHED);
                    }
                    try {
                        this.endEdit();
                    }
                    catch (ex) {
                        RIAPP.reThrow(ex, this.handleError(ex, this));
                    }
                    var pos;
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
                    this._onCollectionChanged({ changeType: 1, items: [item], pos: [pos] });
                    item._aspect._onAttach();
                    this.raisePropertyChanged(PROP_NAME.count);
                    this._onCurrentChanging(item);
                    this._currentPos = pos;
                    this._onCurrentChanged();
                    return pos;
                };
                BaseCollection.prototype._onRemoved = function (item, pos) {
                    try {
                        this._onCollectionChanged({ changeType: 0, items: [item], pos: [pos] });
                    }
                    finally {
                        this.raisePropertyChanged(PROP_NAME.count);
                    }
                };
                BaseCollection.prototype._onPageSizeChanged = function () {
                };
                BaseCollection.prototype._onPageChanging = function () {
                    var args = { page: this.pageIndex, isCancel: false };
                    this._raiseEvent(COLL_EVENTS.page_changing, args);
                    if (!args.isCancel) {
                        try {
                            this.endEdit();
                        }
                        catch (ex) {
                            RIAPP.reThrow(ex, this.handleError(ex, this));
                        }
                    }
                    return !args.isCancel;
                };
                BaseCollection.prototype._onPageChanged = function () {
                };
                BaseCollection.prototype._setCurrentItem = function (v) {
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
                    var oldItem, pos, item = self.getItemByKey(v._key);
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
                };
                BaseCollection.prototype._destroyItems = function () {
                    this._items.forEach(function (item) {
                        item._aspect.destroy();
                    });
                };
                BaseCollection.prototype._isHasProp = function (prop) {
                    if (baseUtils.startsWith(prop, '[')) {
                        var res = RIAPP.global.parser.resolveProp(this, prop);
                        return !baseUtils.isUndefined(res);
                    }
                    return _super.prototype._isHasProp.call(this, prop);
                };
                BaseCollection.prototype._getEditingItem = function () {
                    return this._EditingItem;
                };
                BaseCollection.prototype._getStrValue = function (val, fieldInfo) {
                    var dcnv = fieldInfo.dateConversion, stz = utils.get_timeZoneOffset();
                    return valueUtils.stringifyValue(val, dcnv, fieldInfo.dataType, stz);
                };
                BaseCollection.prototype._onEditing = function (item, isBegin, isCanceled) {
                    if (this._isUpdating)
                        return;
                    if (isBegin) {
                        this._EditingItem = item;
                        this.raiseEvent(COLL_EVENTS.begin_edit, { item: item });
                        this._onEditingChanged();
                    }
                    else {
                        this._EditingItem = null;
                        this.raiseEvent(COLL_EVENTS.end_edit, { item: item, isCanceled: isCanceled });
                        this._onEditingChanged();
                    }
                };
                BaseCollection.prototype._onCommitChanges = function (item, isBegin, isRejected, status) {
                    this.raiseEvent(COLL_EVENTS.commit_changes, { item: item, isBegin: isBegin, isRejected: isRejected, status: status });
                };
                BaseCollection.prototype._validateItem = function (item) {
                    var args = { item: item, fieldName: null, errors: [] };
                    this.raiseEvent(COLL_EVENTS.validate, args);
                    if (!!args.errors && args.errors.length > 0)
                        return { fieldName: null, errors: args.errors };
                    else
                        return null;
                };
                BaseCollection.prototype._validateItemField = function (item, fieldName) {
                    var args = { item: item, fieldName: fieldName, errors: [] };
                    this.raiseEvent(COLL_EVENTS.validate, args);
                    if (!!args.errors && args.errors.length > 0)
                        return { fieldName: fieldName, errors: args.errors };
                    else
                        return null;
                };
                BaseCollection.prototype._addErrors = function (item, errors) {
                    var self = this;
                    this._ignoreChangeErrors = true;
                    try {
                        errors.forEach(function (err) {
                            self._addError(item, err.fieldName, err.errors);
                        });
                    }
                    finally {
                        this._ignoreChangeErrors = false;
                    }
                    this._onErrorsChanged(item);
                };
                BaseCollection.prototype._addError = function (item, fieldName, errors) {
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
                };
                BaseCollection.prototype._removeError = function (item, fieldName) {
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
                };
                BaseCollection.prototype._removeAllErrors = function (item) {
                    var self = this, itemErrors = this._errors[item._key];
                    if (!itemErrors)
                        return;
                    delete this._errors[item._key];
                    self._onErrorsChanged(item);
                };
                BaseCollection.prototype._getErrors = function (item) {
                    return this._errors[item._key];
                };
                BaseCollection.prototype._onErrorsChanged = function (item) {
                    var args = { item: item };
                    this.raiseEvent(COLL_EVENTS.errors_changed, args);
                    item._aspect.raiseErrorsChanged({});
                };
                BaseCollection.prototype._onItemDeleting = function (args) {
                    this.raiseEvent(COLL_EVENTS.item_deleting, args);
                    return !args.isCancel;
                };
                BaseCollection.prototype._getInternal = function () {
                    return this._internal;
                };
                BaseCollection.prototype.getFieldInfo = function (fieldName) {
                    var parts = fieldName.split('.'), fld = this._fieldMap[parts[0]];
                    if (parts.length == 1) {
                        return fld;
                    }
                    if (fld.fieldType == 5) {
                        for (var i = 1; i < parts.length; i += 1) {
                            fld = fn_getPropertyByName(parts[i], fld.nested);
                        }
                        return fld;
                    }
                    throw new Error(baseUtils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'fieldName', fieldName));
                };
                BaseCollection.prototype.getFieldNames = function () {
                    return this.getFieldInfos().map(function (f) {
                        return f.fieldName;
                    });
                };
                BaseCollection.prototype.getIsClearing = function () {
                    return this._isClearing;
                };
                BaseCollection.prototype.getFieldInfos = function () {
                    return this._fieldInfos;
                };
                BaseCollection.prototype.cancelEdit = function () {
                    if (this.isEditing)
                        this._EditingItem._aspect.cancelEdit();
                };
                BaseCollection.prototype.endEdit = function () {
                    var EditingItem;
                    if (this.isEditing) {
                        EditingItem = this._EditingItem;
                        if (!EditingItem._aspect.endEdit() && EditingItem._aspect.getIsHasErrors()) {
                            this.handleError(new ValidationError(EditingItem._aspect.getAllErrors(), EditingItem), EditingItem);
                            this.cancelEdit();
                        }
                    }
                };
                BaseCollection.prototype.getItemsWithErrors = function () {
                    var self = this, res = [];
                    utils.forEachProp(this._errors, function (key) {
                        var item = self.getItemByKey(key);
                        res.push(item);
                    });
                    return res;
                };
                BaseCollection.prototype.addNew = function () {
                    var item, isHandled;
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
                };
                BaseCollection.prototype.getItemByPos = function (pos) {
                    if (pos < 0 || pos >= this._items.length)
                        return null;
                    return this._items[pos];
                };
                BaseCollection.prototype.getItemByKey = function (key) {
                    if (!key)
                        throw new Error(RIAPP.ERRS.ERR_KEY_IS_EMPTY);
                    return this._itemsByKey['' + key];
                };
                BaseCollection.prototype.findByPK = function () {
                    var vals = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        vals[_i - 0] = arguments[_i];
                    }
                    if (arguments.length === 0)
                        return null;
                    var self = this, pkInfo = self._getPKFieldInfos(), arr = [], key, values = [];
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
                };
                BaseCollection.prototype.moveFirst = function (skipDeleted) {
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
                };
                BaseCollection.prototype.movePrev = function (skipDeleted) {
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
                };
                BaseCollection.prototype.moveNext = function (skipDeleted) {
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
                };
                BaseCollection.prototype.moveLast = function (skipDeleted) {
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
                };
                BaseCollection.prototype.goTo = function (pos) {
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
                };
                BaseCollection.prototype.forEach = function (callback, thisObj) {
                    this._items.forEach(callback, thisObj);
                };
                BaseCollection.prototype.removeItem = function (item) {
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
                    if (curPos === oldPos) {
                        if (!test) {
                            this._currentPos = curPos - 1;
                        }
                        this._onCurrentChanged();
                    }
                    if (curPos > oldPos) {
                        this._currentPos = curPos - 1;
                        this._onCurrentChanged();
                    }
                };
                BaseCollection.prototype.getIsHasErrors = function () {
                    if (!this._errors)
                        return false;
                    return (utils.getProps(this._errors).length > 0);
                };
                BaseCollection.prototype.sort = function (fieldNames, sortOrder) {
                    return this.sortLocal(fieldNames, sortOrder);
                };
                BaseCollection.prototype.sortLocal = function (fieldNames, sortOrder) {
                    var self = this;
                    var mult = 1;
                    if (sortOrder === 1)
                        mult = -1;
                    var fn_sort = function (a, b) {
                        var res = 0, i, len, af, bf, fieldName;
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
                };
                BaseCollection.prototype.sortLocalByFunc = function (fn) {
                    var self = this, deffered = utils.createDeferred();
                    this.waitForNotLoading(function () {
                        var cur = self.currentItem;
                        self.isLoading = true;
                        try {
                            self._items.sort(fn);
                            self._onCollectionChanged({ changeType: 2, items: [], pos: [] });
                        }
                        finally {
                            self.isLoading = false;
                            deffered.resolve();
                        }
                        self.currentItem = null;
                        self.currentItem = cur;
                    }, [], false, null);
                    return deffered.promise();
                };
                BaseCollection.prototype.clear = function () {
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
                        this._onCollectionChanged({ changeType: 2, items: [], pos: [] });
                    }
                    finally {
                        this._isClearing = false;
                    }
                    this.raiseEvent(COLL_EVENTS.cleared, {});
                    this.raisePropertyChanged(PROP_NAME.count);
                };
                BaseCollection.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this._waitQueue.destroy();
                    this._waitQueue = null;
                    this.clear();
                    this._fieldMap = {};
                    this._fieldInfos = [];
                    _super.prototype.destroy.call(this);
                };
                BaseCollection.prototype.waitForNotLoading = function (callback, callbackArgs, syncCheck, groupName) {
                    this._waitQueue.enQueue({
                        prop: PROP_NAME.isLoading,
                        groupName: null,
                        predicate: function (val) {
                            return !val;
                        },
                        action: callback,
                        actionArgs: callbackArgs,
                        lastWins: !!groupName,
                        syncCheck: !!syncCheck
                    });
                };
                BaseCollection.prototype.toString = function () {
                    return 'Collection';
                };
                Object.defineProperty(BaseCollection.prototype, "options", {
                    get: function () { return this._options; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseCollection.prototype, "currentItem", {
                    get: function () { return this.getItemByPos(this._currentPos); },
                    set: function (v) { this._setCurrentItem(v); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseCollection.prototype, "count", {
                    get: function () { return this._items.length; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseCollection.prototype, "totalCount", {
                    get: function () { return this._totalCount; },
                    set: function (v) {
                        if (v != this._totalCount) {
                            this._totalCount = v;
                            this.raisePropertyChanged(PROP_NAME.totalCount);
                            this.raisePropertyChanged(PROP_NAME.pageCount);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseCollection.prototype, "pageSize", {
                    get: function () { return this._options.pageSize; },
                    set: function (v) {
                        if (this._options.pageSize !== v) {
                            this._options.pageSize = v;
                            this.raisePropertyChanged(PROP_NAME.pageSize);
                            this._onPageSizeChanged();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseCollection.prototype, "pageIndex", {
                    get: function () { return this._pageIndex; },
                    set: function (v) {
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
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseCollection.prototype, "items", {
                    get: function () { return this._items; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseCollection.prototype, "isPagingEnabled", {
                    get: function () { return this._options.enablePaging; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseCollection.prototype, "permissions", {
                    get: function () { return this._perms; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseCollection.prototype, "isEditing", {
                    get: function () { return !!this._EditingItem; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseCollection.prototype, "isLoading", {
                    get: function () { return this._isLoading; },
                    set: function (v) {
                        if (this._isLoading !== v) {
                            this._isLoading = v;
                            this.raisePropertyChanged(PROP_NAME.isLoading);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseCollection.prototype, "isUpdating", {
                    get: function () { return this._isUpdating; },
                    set: function (v) {
                        if (this._isUpdating !== v) {
                            this._isUpdating = v;
                            this.raisePropertyChanged(PROP_NAME.isUpdating);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseCollection.prototype, "pageCount", {
                    get: function () {
                        var rowCount = this.totalCount, rowPerPage = this.pageSize, result;
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
                    },
                    enumerable: true,
                    configurable: true
                });
                return BaseCollection;
            })(RIAPP.BaseObject);
            collection_1.BaseCollection = BaseCollection;
            var CollectionItem = (function (_super) {
                __extends(CollectionItem, _super);
                function CollectionItem(aspect) {
                    _super.call(this);
                    this.f_aspect = aspect;
                }
                Object.defineProperty(CollectionItem.prototype, "_aspect", {
                    get: function () { return this.f_aspect; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CollectionItem.prototype, "_key", {
                    get: function () { return !!this.f_aspect ? this.f_aspect.key : null; },
                    set: function (v) { if (!this.f_aspect)
                        return; this.f_aspect.key = v; },
                    enumerable: true,
                    configurable: true
                });
                CollectionItem.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this.f_aspect && !this.f_aspect.getIsDestroyCalled()) {
                        this.f_aspect.destroy();
                    }
                    _super.prototype.destroy.call(this);
                };
                CollectionItem.prototype.toString = function () {
                    return 'CollectionItem';
                };
                return CollectionItem;
            })(RIAPP.BaseObject);
            collection_1.CollectionItem = CollectionItem;
            var ListItemAspect = (function (_super) {
                __extends(ListItemAspect, _super);
                function ListItemAspect(coll, itemType, obj) {
                    _super.call(this, coll);
                    var self = this;
                    this.__isNew = !obj ? true : false;
                    this._item = null;
                    if (!!obj)
                        this._vals = obj;
                    else
                        this._vals = ListItemAspect._initVals(coll, obj);
                    this._item = new itemType(this);
                }
                ListItemAspect._initVals = function (coll, obj) {
                    var vals = obj || {};
                    if (!!obj) {
                        var fieldInfos = coll.getFieldInfos();
                        fieldInfos.forEach(function (fld) {
                            if (fld.fieldType != 5) {
                                vals[fld.fieldName] = null;
                            }
                            else {
                                fn_traverseField(fld, function (name, fld) {
                                    if (fld.fieldType == 5)
                                        baseUtils.setValue(vals, name, {}, false);
                                    else
                                        baseUtils.setValue(vals, name, null, false);
                                });
                            }
                        });
                    }
                    return vals;
                };
                ListItemAspect.prototype._setProp = function (name, val) {
                    var validation_error, error, coll = this.collection;
                    if (this._getProp(name) !== val) {
                        try {
                            baseUtils.setValue(this._vals, name, val, false);
                            this.getItem().raisePropertyChanged(name);
                            coll._getInternal().removeError(this.getItem(), name);
                            validation_error = this._validateField(name);
                            if (!!validation_error) {
                                throw new ValidationError([validation_error], this);
                            }
                        }
                        catch (ex) {
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
                };
                ListItemAspect.prototype._getProp = function (name) {
                    return baseUtils.getValue(this._vals, name);
                };
                ListItemAspect.prototype._resetIsNew = function () {
                    this.__isNew = false;
                };
                ListItemAspect.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    _super.prototype.destroy.call(this);
                    this._item = null;
                };
                ListItemAspect.prototype.getItem = function () {
                    return this._item;
                };
                ListItemAspect.prototype.toString = function () {
                    if (!this._item)
                        return 'ListItemAspect';
                    return this._item.toString() + 'Aspect';
                };
                Object.defineProperty(ListItemAspect.prototype, "vals", {
                    get: function () { return this._vals; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListItemAspect.prototype, "isNew", {
                    get: function () { return this.__isNew; },
                    enumerable: true,
                    configurable: true
                });
                return ListItemAspect;
            })(ItemAspect);
            collection_1.ListItemAspect = ListItemAspect;
            var BaseList = (function (_super) {
                __extends(BaseList, _super);
                function BaseList(itemType, props) {
                    _super.call(this);
                    this._itemType = itemType;
                    if (!!props)
                        this._updateFieldMap(props);
                }
                BaseList.prototype._updateFieldMap = function (props) {
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
                        fn_traverseField(fldInfo, function (fullName, fld) {
                            fld.dependents = null;
                            fld.fullName = fullName;
                        });
                    });
                };
                BaseList.prototype._attach = function (item) {
                    try {
                        this.endEdit();
                    }
                    catch (ex) {
                        RIAPP.reThrow(ex, this.handleError(ex, this));
                    }
                    return _super.prototype._attach.call(this, item);
                };
                BaseList.prototype._createNew = function () {
                    var aspect = new ListItemAspect(this, this._itemType, null);
                    aspect.key = this._getNewKey(null);
                    return aspect.getItem();
                };
                BaseList.prototype._getNewKey = function (item) {
                    var key = 'clkey_' + this._newKey;
                    this._newKey += 1;
                    return key;
                };
                BaseList.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this._itemType = null;
                    _super.prototype.destroy.call(this);
                };
                BaseList.prototype.fillItems = function (objArray, clearAll) {
                    var self = this, newItems = [], positions = [], fetchedItems = [];
                    if (!objArray)
                        objArray = [];
                    this._onFillStart({ isBegin: true, rowCount: objArray.length, time: new Date(), isPageChanged: false });
                    try {
                        if (!!clearAll)
                            this.clear();
                        objArray.forEach(function (obj) {
                            var aspect = new ListItemAspect(self, self._itemType, obj);
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
                            this._onCollectionChanged({ changeType: 1, items: newItems, pos: positions });
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
                };
                BaseList.prototype.toArray = function () {
                    return this.items.map(function (item, index, arr) {
                        return utils.cloneObj(item._aspect.vals);
                    });
                };
                BaseList.prototype.getNewObjects = function () {
                    return this._items.filter(function (item) {
                        return item._aspect.isNew;
                    });
                };
                BaseList.prototype.resetNewObjects = function () {
                    this._items.forEach(function (item) {
                        item._aspect._resetIsNew();
                    });
                };
                BaseList.prototype.toString = function () {
                    return 'BaseList';
                };
                return BaseList;
            })(BaseCollection);
            collection_1.BaseList = BaseList;
            var BaseDictionary = (function (_super) {
                __extends(BaseDictionary, _super);
                function BaseDictionary(itemType, keyName, props) {
                    if (!keyName)
                        throw new Error(baseUtils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'keyName', keyName));
                    this._keyName = keyName;
                    _super.call(this, itemType, props);
                    var keyFld = this.getFieldInfo(keyName);
                    if (!keyFld)
                        throw new Error(baseUtils.format(RIAPP.ERRS.ERR_DICTKEY_IS_NOTFOUND, keyName));
                    keyFld.isPrimaryKey = 1;
                }
                BaseDictionary.prototype._getNewKey = function (item) {
                    if (!item) {
                        return _super.prototype._getNewKey.call(this, null);
                    }
                    var key = item[this._keyName];
                    if (utils.check.isNt(key))
                        throw new Error(baseUtils.format(RIAPP.ERRS.ERR_DICTKEY_IS_EMPTY, this.keyName));
                    return '' + key;
                };
                BaseDictionary.prototype._onItemAdded = function (item) {
                    _super.prototype._onItemAdded.call(this, item);
                    var key = item[this._keyName];
                    this.raisePropertyChanged('[' + key + ']');
                };
                BaseDictionary.prototype._onRemoved = function (item, pos) {
                    var key = item[this._keyName];
                    _super.prototype._onRemoved.call(this, item, pos);
                    this.raisePropertyChanged('[' + key + ']');
                };
                Object.defineProperty(BaseDictionary.prototype, "keyName", {
                    get: function () {
                        return this._keyName;
                    },
                    enumerable: true,
                    configurable: true
                });
                BaseDictionary.prototype.toString = function () {
                    return 'BaseDictionary';
                };
                return BaseDictionary;
            })(BaseList);
            collection_1.BaseDictionary = BaseDictionary;
            collection_1._isModuleLoaded = true;
        })(collection = MOD.collection || (MOD.collection = {}));
    })(MOD = RIAPP.MOD || (RIAPP.MOD = {}));
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    var MOD;
    (function (MOD) {
        var dataform;
        (function (dataform) {
            var constsMOD = RIAPP.consts;
            var bindMOD = RIAPP.MOD.binding;
            var elviewMOD = RIAPP.MOD.baseElView;
            var contentMOD = RIAPP.MOD.baseContent;
            dataform.css = {
                dataform: 'ria-dataform'
            };
            var ERRTEXT = RIAPP.localizable.VALIDATE, utils;
            RIAPP.global.addOnInitialize(function (s, args) {
                utils = s.utils;
            });
            dataform._setIsInsideTemplate = function (elView) {
                if (elView instanceof DataFormElView) {
                    elView.form.isInsideTemplate = true;
                }
            };
            dataform._isDataForm = function (el) {
                if (!el)
                    return false;
                if (el.hasAttribute(constsMOD.DATA_ATTR.DATA_FORM))
                    return true;
                var attr = el.getAttribute(constsMOD.DATA_ATTR.DATA_VIEW);
                if (!attr) {
                    return false;
                }
                var opts = RIAPP.global.parser.parseOptions(attr);
                return (opts.length > 0 && opts[0].name === constsMOD.ELVIEW_NM.DATAFORM);
            };
            dataform._isInsideDataForm = function (el) {
                if (!el)
                    return false;
                var parent = el.parentElement;
                if (!!parent) {
                    if (!dataform._isDataForm(parent)) {
                        return dataform._isInsideDataForm(parent);
                    }
                    else
                        return true;
                }
                return false;
            };
            dataform._isInNestedForm = function (root, forms, el) {
                var i, oNode, len = forms.length;
                if (len == 0) {
                    return false;
                }
                oNode = el.parentElement;
                while (!!oNode) {
                    for (i = 0; i < len; i += 1) {
                        if (oNode === forms[i]) {
                            return true;
                        }
                    }
                    if (!!root && oNode === root) {
                        return false;
                    }
                    oNode = oNode.parentElement;
                }
                return false;
            };
            dataform._getParentDataForm = function (rootForm, el) {
                if (!el)
                    return null;
                var parent = el.parentElement, document = RIAPP.global.document, attr, opts;
                if (!!parent) {
                    if (parent === rootForm)
                        return rootForm;
                    if (dataform._isDataForm(parent)) {
                        return parent;
                    }
                    else
                        return dataform._getParentDataForm(rootForm, parent);
                }
                return null;
            };
            function getFieldInfo(obj, fieldName) {
                if (!obj)
                    return null;
                if (!!obj._aspect && utils.check.isFunction(obj._aspect.getFieldInfo)) {
                    return obj._aspect.getFieldInfo(fieldName);
                }
                else if (utils.check.isFunction(obj.getFieldInfo)) {
                    return obj.getFieldInfo(fieldName);
                }
                else
                    return null;
            }
            var PROP_NAME = {
                dataContext: 'dataContext',
                isEditing: 'isEditing',
                validationErrors: 'validationErrors',
                form: 'form'
            };
            var DataForm = (function (_super) {
                __extends(DataForm, _super);
                function DataForm(options) {
                    _super.call(this);
                    var self = this, parent;
                    options = utils.extend(false, {
                        app: null,
                        el: null
                    }, options);
                    this._app = options.app;
                    this._el = options.el;
                    this._$el = RIAPP.global.$(this._el);
                    this._objId = 'frm' + RIAPP.baseUtils.getNewID();
                    this._dataContext = null;
                    this._$el.addClass(dataform.css.dataform);
                    this._isEditing = false;
                    this._content = [];
                    this._lfTime = null;
                    this._contentCreated = false;
                    this._supportEdit = null;
                    this._supportErrNotify = null;
                    this._parentDataForm = null;
                    this._errors = null;
                    parent = dataform._getParentDataForm(null, this._el);
                    if (!!parent) {
                        self._parentDataForm = this._app.getElementView(parent);
                        self._parentDataForm.addOnDestroyed(function (sender, args) {
                            if (!self._isDestroyCalled)
                                self.destroy();
                        }, self._objId);
                    }
                }
                Object.defineProperty(DataForm.prototype, "_DATA_CONTENT_SELECTOR", {
                    get: function () { return '*[' + constsMOD.DATA_ATTR.DATA_CONTENT + ']:not([' + constsMOD.DATA_ATTR.DATA_COLUMN + '])'; },
                    enumerable: true,
                    configurable: true
                });
                DataForm.prototype.handleError = function (error, source) {
                    var isHandled = _super.prototype.handleError.call(this, error, source);
                    if (!isHandled) {
                        return this._app.handleError(error, source);
                    }
                    return isHandled;
                };
                DataForm.prototype._getBindings = function () {
                    if (!this._lfTime)
                        return [];
                    var arr = this._lfTime.getObjs(), res = [];
                    for (var i = 0, len = arr.length; i < len; i += 1) {
                        if (bindMOD._isBinding(arr[i]))
                            res.push(arr[i]);
                    }
                    return res;
                };
                DataForm.prototype._getElViews = function () {
                    if (!this._lfTime)
                        return [];
                    var arr = this._lfTime.getObjs(), res = [];
                    for (var i = 0, len = arr.length; i < len; i += 1) {
                        if (elviewMOD._isElView(arr[i]))
                            res.push(arr[i]);
                    }
                    return res;
                };
                DataForm.prototype._createContent = function () {
                    var dctx = this._dataContext, self = this;
                    if (!dctx) {
                        return;
                    }
                    var elements = RIAPP.ArrayHelper.fromList(this._el.querySelectorAll(self._DATA_CONTENT_SELECTOR)), isEditing = this.isEditing;
                    var formSelector = ['*[', constsMOD.DATA_ATTR.DATA_FORM, ']'].join(''), forms = RIAPP.ArrayHelper.fromList(this._el.querySelectorAll(formSelector));
                    elements.forEach(function (el) {
                        if (dataform._isInNestedForm(self._el, forms, el))
                            return;
                        var attr = el.getAttribute(constsMOD.DATA_ATTR.DATA_CONTENT), op = contentMOD.parseContentAttr(attr);
                        if (!!op.fieldName && !op.fieldInfo) {
                            op.fieldInfo = getFieldInfo(dctx, op.fieldName);
                            if (!op.fieldInfo) {
                                throw new Error(utils.format(RIAPP.ERRS.ERR_DBSET_INVALID_FIELDNAME, '', op.fieldName));
                            }
                        }
                        var contentType = self.app._getInternal().getContentType(op);
                        var content = new contentType(self.app, { parentEl: el, contentOptions: op, dataContext: dctx, isEditing: isEditing });
                        self._content.push(content);
                    });
                    this._lfTime = self.app._getInternal().bindElements(this._el, dctx, true, this.isInsideTemplate);
                    var bindings = this._getBindings();
                    bindings.forEach(function (binding) {
                        if (!binding.isSourceFixed)
                            binding.source = dctx;
                    });
                    this._contentCreated = true;
                };
                DataForm.prototype._updateContent = function () {
                    try {
                        var dctx = this._dataContext, self = this;
                        if (this._contentCreated) {
                            this._content.forEach(function (content) {
                                content.dataContext = dctx;
                                content.isEditing = self.isEditing;
                            });
                            var bindings = this._getBindings();
                            bindings.forEach(function (binding) {
                                if (!binding.isSourceFixed)
                                    binding.source = dctx;
                            });
                        }
                        else {
                            this._createContent();
                        }
                    }
                    catch (ex) {
                        RIAPP.reThrow(ex, this.handleError(ex, this));
                    }
                };
                DataForm.prototype._onDSErrorsChanged = function (sender, args) {
                    if (!!this._supportErrNotify)
                        this.validationErrors = this._supportErrNotify.getAllErrors();
                };
                DataForm.prototype._onIsEditingChanged = function (sender, args) {
                    this.isEditing = this._supportEdit.isEditing;
                };
                DataForm.prototype._bindDS = function () {
                    var dataContext = this._dataContext, self = this;
                    if (!dataContext)
                        return;
                    if (!!dataContext) {
                        this._supportEdit = utils.getEditable(dataContext);
                        this._supportErrNotify = utils.getErrorNotification(dataContext);
                    }
                    dataContext.addOnDestroyed(function (s, a) {
                        self.dataContext = null;
                    }, self._objId);
                    if (!!this._supportEdit) {
                        this._supportEdit.addOnPropertyChange(PROP_NAME.isEditing, self._onIsEditingChanged, self._objId, self);
                    }
                    if (!!this._supportErrNotify) {
                        this._supportErrNotify.addOnErrorsChanged(self._onDSErrorsChanged, self._objId, self);
                    }
                };
                DataForm.prototype._unbindDS = function () {
                    var dataContext = this._dataContext;
                    this.validationErrors = null;
                    if (!!dataContext && !dataContext.getIsDestroyCalled()) {
                        dataContext.removeNSHandlers(this._objId);
                        if (!!this._supportEdit) {
                            this._supportEdit.removeNSHandlers(this._objId);
                        }
                        if (!!this._supportErrNotify) {
                            this._supportErrNotify.removeOnErrorsChanged(this._objId);
                        }
                    }
                    this._supportEdit = null;
                    this._supportErrNotify = null;
                };
                DataForm.prototype._clearContent = function () {
                    this._content.forEach(function (content) {
                        content.destroy();
                    });
                    this._content = [];
                    if (!!this._lfTime) {
                        this._lfTime.destroy();
                        this._lfTime = null;
                    }
                    this._contentCreated = false;
                };
                DataForm.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this._clearContent();
                    this._$el.removeClass(dataform.css.dataform);
                    this._el = null;
                    this._$el = null;
                    this._unbindDS();
                    var parentDataForm = this._parentDataForm;
                    this._parentDataForm = null;
                    if (!!parentDataForm && !parentDataForm.getIsDestroyCalled()) {
                        parentDataForm.removeNSHandlers(this._objId);
                    }
                    this._dataContext = null;
                    this._contentCreated = false;
                    this._app = null;
                    _super.prototype.destroy.call(this);
                };
                DataForm.prototype.toString = function () {
                    return 'DataForm';
                };
                Object.defineProperty(DataForm.prototype, "app", {
                    get: function () { return this._app; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataForm.prototype, "el", {
                    get: function () { return this._el; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataForm.prototype, "dataContext", {
                    get: function () { return this._dataContext; },
                    set: function (v) {
                        try {
                            if (v === this._dataContext)
                                return;
                            if (!!v && !utils.check.isBaseObj(v)) {
                                throw new Error(RIAPP.ERRS.ERR_DATAFRM_DCTX_INVALID);
                            }
                            this._unbindDS();
                            this._dataContext = v;
                            this._bindDS();
                            this._updateContent();
                            this.raisePropertyChanged(PROP_NAME.dataContext);
                            if (!!this._dataContext) {
                                if (!!this._supportEdit && this._isEditing !== this._supportEdit.isEditing) {
                                    this.isEditing = this._supportEdit.isEditing;
                                }
                                if (!!this._supportErrNotify) {
                                    this._onDSErrorsChanged();
                                }
                            }
                        }
                        catch (ex) {
                            RIAPP.reThrow(ex, this.handleError(ex, this));
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataForm.prototype, "isEditing", {
                    get: function () { return this._isEditing; },
                    set: function (v) {
                        var dataContext = this._dataContext;
                        if (!dataContext)
                            return;
                        var isEditing = this._isEditing, editable;
                        if (!!this._supportEdit)
                            editable = this._supportEdit;
                        if (!editable && v !== isEditing) {
                            this._isEditing = v;
                            this._updateContent();
                            this.raisePropertyChanged(PROP_NAME.isEditing);
                            return;
                        }
                        if (v !== isEditing && !!editable) {
                            try {
                                if (v) {
                                    editable.beginEdit();
                                }
                                else {
                                    editable.endEdit();
                                }
                            }
                            catch (ex) {
                                RIAPP.reThrow(ex, this.handleError(ex, dataContext));
                            }
                        }
                        if (!!editable && editable.isEditing !== isEditing) {
                            this._isEditing = editable.isEditing;
                            this._updateContent();
                            this.raisePropertyChanged(PROP_NAME.isEditing);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataForm.prototype, "validationErrors", {
                    get: function () { return this._errors; },
                    set: function (v) {
                        if (v !== this._errors) {
                            this._errors = v;
                            this.raisePropertyChanged(PROP_NAME.validationErrors);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataForm.prototype, "isInsideTemplate", {
                    get: function () { return this._isInsideTemplate; },
                    set: function (v) {
                        this._isInsideTemplate = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                return DataForm;
            })(RIAPP.BaseObject);
            dataform.DataForm = DataForm;
            var DataFormElView = (function (_super) {
                __extends(DataFormElView, _super);
                function DataFormElView(app, el, options) {
                    _super.call(this, app, el, options);
                    var self = this;
                    this._options = options;
                    this._form = new DataForm({ app: app, el: el });
                    this._form.addOnDestroyed(function () {
                        self._form = null;
                        self.invokePropChanged(PROP_NAME.form);
                        self.raisePropertyChanged(PROP_NAME.form);
                    });
                    this._form.addOnPropertyChange('*', function (form, args) {
                        switch (args.property) {
                            case PROP_NAME.validationErrors:
                                self.validationErrors = form.validationErrors;
                                break;
                            case PROP_NAME.dataContext:
                                self.raisePropertyChanged(args.property);
                                break;
                        }
                    }, this._objId);
                }
                DataFormElView.prototype._getErrorTipInfo = function (errors) {
                    var tip = ['<b>', ERRTEXT.errorInfo, '</b>', '<ul>'];
                    errors.forEach(function (info) {
                        var fieldName = info.fieldName, res = '';
                        if (!!fieldName) {
                            res = ERRTEXT.errorField + ' ' + fieldName;
                        }
                        info.errors.forEach(function (str) {
                            if (!!res)
                                res = res + ' -> ' + str;
                            else
                                res = str;
                        });
                        tip.push('<li>' + res + '</li>');
                        res = '';
                    });
                    tip.push('</ul>');
                    return tip.join('');
                };
                DataFormElView.prototype._updateErrorUI = function (el, errors) {
                    if (!el) {
                        return;
                    }
                    var $el = this.$el;
                    if (!!errors && errors.length > 0) {
                        var $img, image_src = RIAPP.global.getImagePath('warning.png');
                        $img = RIAPP.global.$('<img name="error_info" alt="error_info" class="error-info" />');
                        $el.prepend($img);
                        $img.get(0).src = image_src;
                        elviewMOD.fn_addToolTip($img, this._getErrorTipInfo(errors), true);
                        this._setFieldError(true);
                    }
                    else {
                        $el.children('img[name="error_info"]').remove();
                        this._setFieldError(false);
                    }
                };
                DataFormElView.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._form && !this._form.getIsDestroyCalled()) {
                        this._form.destroy();
                    }
                    this._form = null;
                    _super.prototype.destroy.call(this);
                };
                DataFormElView.prototype.toString = function () {
                    return 'DataFormElView';
                };
                Object.defineProperty(DataFormElView.prototype, "dataContext", {
                    get: function () {
                        if (this._isDestroyCalled)
                            return null;
                        return this._form.dataContext;
                    },
                    set: function (v) {
                        if (this._isDestroyCalled)
                            return;
                        if (this.dataContext !== v) {
                            this._form.dataContext = v;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataFormElView.prototype, "form", {
                    get: function () { return this._form; },
                    enumerable: true,
                    configurable: true
                });
                return DataFormElView;
            })(elviewMOD.BaseElView);
            dataform.DataFormElView = DataFormElView;
            RIAPP.global.registerType('DataFormElView', DataFormElView);
            RIAPP.global.registerElView(constsMOD.ELVIEW_NM.DATAFORM, DataFormElView);
            dataform._isModuleLoaded = true;
        })(dataform = MOD.dataform || (MOD.dataform = {}));
    })(MOD = RIAPP.MOD || (RIAPP.MOD = {}));
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    var MOD;
    (function (MOD) {
        var dynacontent;
        (function (dynacontent) {
            var elviewMOD = RIAPP.MOD.baseElView;
            var templMOD = RIAPP.MOD.template;
            var utils, global = RIAPP.global;
            global.addOnInitialize(function (s, args) {
                utils = s.utils;
            });
            var PROP_NAME = {
                template: 'template',
                templateID: 'templateID',
                dataContext: 'dataContext',
                animation: 'animation'
            };
            var DynaContentElView = (function (_super) {
                __extends(DynaContentElView, _super);
                function DynaContentElView(app, el, options) {
                    _super.call(this, app, el, options);
                    this._dataContext = null;
                    this._prevTemplateID = null;
                    this._templateID = null;
                    this._template = null;
                    this._animation = null;
                }
                DynaContentElView.prototype.templateLoading = function (template) {
                    if (this._isDestroyCalled)
                        return;
                    var isFirstShow = !this._prevTemplateID, canShow = !!this._animation && (this._animation.isAnimateFirstShow || (!this._animation.isAnimateFirstShow && !isFirstShow));
                    if (canShow) {
                        this._animation.beforeShow(template, isFirstShow);
                    }
                };
                DynaContentElView.prototype.templateLoaded = function (template) {
                    if (this._isDestroyCalled)
                        return;
                    if (!utils.isContained(template.el, this.el)) {
                        this.el.appendChild(template.el);
                    }
                    var isFirstShow = !this._prevTemplateID, canShow = !!this._animation && (this._animation.isAnimateFirstShow || (!this._animation.isAnimateFirstShow && !isFirstShow));
                    if (canShow) {
                        this._animation.show(template, isFirstShow);
                    }
                };
                DynaContentElView.prototype.templateUnLoading = function (template) {
                };
                DynaContentElView.prototype._templateChanging = function (oldName, newName) {
                    var self = this;
                    try {
                        if (!newName && !!this._template) {
                            if (!!this._animation && !!this._template.loadedElem) {
                                this._animation.stop();
                                this._animation.beforeHide(this._template);
                                this._animation.hide(this._template).always(function () {
                                    if (self._isDestroyCalled)
                                        return;
                                    self._template.destroy();
                                    self._template = null;
                                    self.raisePropertyChanged(PROP_NAME.template);
                                });
                            }
                            else {
                                self._template.destroy();
                                self._template = null;
                                self.raisePropertyChanged(PROP_NAME.template);
                            }
                            return;
                        }
                    }
                    catch (ex) {
                        this.handleError(ex, this);
                        RIAPP.throwDummy(ex);
                    }
                    try {
                        if (!this._template) {
                            this._template = new templMOD.Template({
                                app: this.app,
                                templateID: newName,
                                dataContext: this._dataContext,
                                templEvents: this
                            });
                            self.raisePropertyChanged(PROP_NAME.template);
                            return;
                        }
                        if (!!this._animation && !!this._template.loadedElem) {
                            this._animation.stop();
                            this._animation.beforeHide(this._template);
                            this._animation.hide(this._template).always(function () {
                                if (self._isDestroyCalled)
                                    return;
                                self._template.templateID = newName;
                            });
                        }
                        else
                            self._template.templateID = newName;
                    }
                    catch (ex) {
                        this.handleError(ex, this);
                        RIAPP.throwDummy(ex);
                    }
                };
                DynaContentElView.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._animation) {
                        if (utils.check.isBaseObj(this._animation)) {
                            this._animation.destroy();
                        }
                        this._animation = null;
                    }
                    if (!!this._template) {
                        this._template.destroy();
                        this._template = null;
                    }
                    this._dataContext = null;
                    _super.prototype.destroy.call(this);
                };
                Object.defineProperty(DynaContentElView.prototype, "template", {
                    get: function () { return this._template; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DynaContentElView.prototype, "templateID", {
                    get: function () {
                        return this._templateID;
                    },
                    set: function (v) {
                        var old = this._templateID;
                        if (old !== v) {
                            this._prevTemplateID = this._templateID;
                            this._templateID = v;
                            this._templateChanging(old, v);
                            this.raisePropertyChanged(PROP_NAME.templateID);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DynaContentElView.prototype, "dataContext", {
                    get: function () { return this._dataContext; },
                    set: function (v) {
                        if (this._dataContext !== v) {
                            this._dataContext = v;
                            if (!!this._template) {
                                this._template.dataContext = this._dataContext;
                            }
                            this.raisePropertyChanged(PROP_NAME.dataContext);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DynaContentElView.prototype, "animation", {
                    get: function () { return this._animation; },
                    set: function (v) {
                        if (this._animation !== v) {
                            this._animation = v;
                            this.raisePropertyChanged(PROP_NAME.animation);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return DynaContentElView;
            })(elviewMOD.BaseElView);
            dynacontent.DynaContentElView = DynaContentElView;
            global.registerElView('dynacontent', DynaContentElView);
            dynacontent._isModuleLoaded = true;
        })(dynacontent = MOD.dynacontent || (MOD.dynacontent = {}));
    })(MOD = RIAPP.MOD || (RIAPP.MOD = {}));
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    var MOD;
    (function (MOD) {
        var datepicker;
        (function (datepicker) {
            var elviewMOD = RIAPP.MOD.baseElView;
            var PROP_NAME = {
                dateFormat: 'dateFormat',
                datepickerRegion: 'datepickerRegion'
            };
            var Datepicker = (function (_super) {
                __extends(Datepicker, _super);
                function Datepicker() {
                    _super.call(this);
                    this._dateFormat = null;
                    this._datepickerRegion = '';
                    var $ = RIAPP.global.$;
                    if (!$.datepicker) {
                        throw new Error(RIAPP.ERRS.ERR_JQUERY_DATEPICKER_NOTFOUND);
                    }
                    this.dateFormat = 'dd.mm.yy';
                }
                Datepicker.prototype.toString = function () {
                    return 'Datepicker';
                };
                Datepicker.prototype.attachTo = function ($el, options) {
                    if (!!options)
                        $el.datepicker(options);
                    else
                        $el.datepicker();
                };
                Datepicker.prototype.detachFrom = function ($el) {
                    RIAPP.global.utils.destroyJQueryPlugin($el, 'datepicker');
                };
                Datepicker.prototype.parseDate = function (str) {
                    return this.datePickerFn.parseDate(this.dateFormat, str);
                };
                Datepicker.prototype.formatDate = function (date) {
                    return this.datePickerFn.formatDate(this.dateFormat, date);
                };
                Object.defineProperty(Datepicker.prototype, "dateFormat", {
                    get: function () {
                        if (!this._dateFormat) {
                            var regional = this.datePickerFn.regional[this._datepickerRegion];
                            return regional.dateFormat;
                        }
                        else
                            return this._dateFormat;
                    },
                    set: function (v) {
                        if (this.dateFormat !== v) {
                            this._dateFormat = v;
                            var regional = this.datePickerFn.regional[this._datepickerRegion];
                            if (!!this._dateFormat) {
                                regional.dateFormat = this._dateFormat;
                                this.datePickerFn.setDefaults(regional);
                            }
                            this.raisePropertyChanged(PROP_NAME.dateFormat);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Datepicker.prototype, "datepickerRegion", {
                    get: function () { return this._datepickerRegion; },
                    set: function (v) {
                        if (!v)
                            v = "";
                        var oldDateFormat = this.dateFormat;
                        if (this._datepickerRegion !== v) {
                            var regional = this.datePickerFn.regional[v];
                            if (!!regional) {
                                this._datepickerRegion = v;
                                regional.dateFormat = oldDateFormat;
                                this.datePickerFn.setDefaults(regional);
                                this.raisePropertyChanged(PROP_NAME.datepickerRegion);
                            }
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Datepicker.prototype, "datePickerFn", {
                    get: function () {
                        var $ = RIAPP.global.$;
                        return $.datepicker;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Datepicker;
            })(RIAPP.BaseObject);
            datepicker.Datepicker = Datepicker;
            var DatePickerElView = (function (_super) {
                __extends(DatePickerElView, _super);
                function DatePickerElView() {
                    _super.apply(this, arguments);
                }
                DatePickerElView.prototype._init = function (options) {
                    _super.prototype._init.call(this, options);
                    var $el = this.$el;
                    RIAPP.global.defaults.datepicker.attachTo($el, options.datepicker);
                };
                DatePickerElView.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    var $el = this.$el;
                    RIAPP.global.defaults.datepicker.detachFrom($el);
                    _super.prototype.destroy.call(this);
                };
                DatePickerElView.prototype.toString = function () {
                    return 'DatePickerElView';
                };
                return DatePickerElView;
            })(elviewMOD.TextBoxElView);
            datepicker.DatePickerElView = DatePickerElView;
            RIAPP.global.registerType('IDatepicker', new Datepicker());
            RIAPP.global.registerElView('datepicker', DatePickerElView);
            datepicker._isModuleLoaded = true;
        })(datepicker = MOD.datepicker || (MOD.datepicker = {}));
    })(MOD = RIAPP.MOD || (RIAPP.MOD = {}));
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    var MOD;
    (function (MOD) {
        var tabs;
        (function (tabs_1) {
            var elviewMOD = MOD.baseElView;
            var PROP_NAME = {
                tabIndex: 'tabIndex',
                tabsEvents: 'tabsEvents'
            };
            var TabsElView = (function (_super) {
                __extends(TabsElView, _super);
                function TabsElView() {
                    _super.apply(this, arguments);
                }
                TabsElView.prototype._init = function (options) {
                    _super.prototype._init.call(this, options);
                    this._tabOpts = options;
                    this._tabsEvents = null;
                    this._tabsCreated = false;
                    this._createTabs();
                };
                TabsElView.prototype._createTabs = function () {
                    var $el = this.$el, self = this, tabOpts = {
                        activate: function (e, tab) {
                            if (!!self._tabsEvents) {
                                self._tabsEvents.onTabSelected(self);
                            }
                            self.raisePropertyChanged(PROP_NAME.tabIndex);
                        }
                    };
                    tabOpts = RIAPP.global.utils.extend(false, tabOpts, self._tabOpts);
                    $el.tabs(tabOpts);
                    setTimeout(function () {
                        if (self.getIsDestroyCalled())
                            return;
                        self._tabsCreated = true;
                        self._onTabsCreated();
                        self.raisePropertyChanged(PROP_NAME.tabIndex);
                    }, 100);
                };
                TabsElView.prototype._destroyTabs = function () {
                    var $el = this.$el;
                    RIAPP.global.utils.destroyJQueryPlugin($el, 'tabs');
                    this._tabsCreated = false;
                    if (!!this._tabsEvents) {
                        this._tabsEvents.removeTabs();
                    }
                };
                TabsElView.prototype._onTabsCreated = function () {
                    var self = this, $el = self.$el;
                    if (!!self._tabsEvents) {
                        self._tabsEvents.addTabs(self);
                    }
                    if (!!self._tabsEvents) {
                        self._tabsEvents.onTabSelected(self);
                    }
                };
                TabsElView.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this._destroyTabs();
                    this._tabsEvents = null;
                    _super.prototype.destroy.call(this);
                };
                TabsElView.prototype.toString = function () {
                    return 'TabsElView';
                };
                Object.defineProperty(TabsElView.prototype, "tabsEvents", {
                    get: function () { return this._tabsEvents; },
                    set: function (v) {
                        var old = this._tabsEvents;
                        if (v !== old) {
                            if (!!old)
                                old.removeTabs();
                            this._tabsEvents = v;
                            this.raisePropertyChanged(PROP_NAME.tabsEvents);
                            if (this._tabsCreated) {
                                this._onTabsCreated();
                            }
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TabsElView.prototype, "tabIndex", {
                    get: function () {
                        return this.$el.tabs("option", "active");
                    },
                    set: function (v) {
                        this.$el.tabs("option", "active", v);
                    },
                    enumerable: true,
                    configurable: true
                });
                return TabsElView;
            })(elviewMOD.BaseElView);
            tabs_1.TabsElView = TabsElView;
            RIAPP.global.registerElView('tabs', TabsElView);
            tabs_1._isModuleLoaded = true;
        })(tabs = MOD.tabs || (MOD.tabs = {}));
    })(MOD = RIAPP.MOD || (RIAPP.MOD = {}));
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    var MOD;
    (function (MOD) {
        var listbox;
        (function (listbox) {
            var bindMOD = RIAPP.MOD.binding;
            var collMOD = RIAPP.MOD.collection;
            var elviewMOD = RIAPP.MOD.baseElView;
            var contentMOD = RIAPP.MOD.baseContent;
            var utils, parser;
            RIAPP.global.addOnInitialize(function (s, args) {
                utils = s.utils;
                parser = s.parser;
            });
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
            var ListBox = (function (_super) {
                __extends(ListBox, _super);
                function ListBox(options) {
                    _super.call(this);
                    var self = this;
                    options = utils.extend(false, {
                        app: null,
                        el: null,
                        dataSource: null,
                        valuePath: null,
                        textPath: null,
                        statePath: null
                    }, options);
                    if (!!options.dataSource && !(options.dataSource instanceof collMOD.BaseCollection))
                        throw new Error(RIAPP.ERRS.ERR_LISTBOX_DATASRC_INVALID);
                    this._$el = RIAPP.global.$(options.el);
                    this._options = options;
                    this._objId = 'lst' + RIAPP.baseUtils.getNewID();
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
                    this._fn_state = function (sender) {
                        var item = sender;
                        var data = self._keyMap[item._key];
                        if (!data)
                            return;
                        var css = self._onOptionStateChanged(data);
                        data.op.className = css;
                    };
                }
                ListBox.prototype.destroy = function () {
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
                    this._options = {};
                    this._textProvider = null;
                    this._stateProvider = null;
                    _super.prototype.destroy.call(this);
                };
                ListBox.prototype._onChanged = function () {
                    var op = null, key, data;
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
                };
                ListBox.prototype._getStringValue = function (item) {
                    var v = this._getValue(item);
                    if (utils.check.isNt(v))
                        return '';
                    return '' + v;
                };
                ListBox.prototype._getValue = function (item) {
                    if (!item)
                        return null;
                    if (!!this._options.valuePath) {
                        return parser.resolvePath(item, this._options.valuePath);
                    }
                    else
                        return undefined;
                };
                ListBox.prototype._getText = function (item, index) {
                    var res = '';
                    if (!item)
                        return res;
                    if (!!this._options.textPath) {
                        var t = RIAPP.global.parser.resolvePath(item, this._options.textPath);
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
                };
                ListBox.prototype._onDSCollectionChanged = function (sender, args) {
                    var self = this, data;
                    switch (args.changeType) {
                        case 2:
                            if (!this._isDSFilling)
                                this._refresh();
                            break;
                        case 1:
                            if (!this._isDSFilling) {
                                args.items.forEach(function (item) {
                                    self._addOption(item, item._aspect.isNew);
                                });
                            }
                            break;
                        case 0:
                            args.items.forEach(function (item) {
                                self._removeOption(item);
                            });
                            if (!!self._textProvider)
                                self._resetText();
                            break;
                        case 3:
                            {
                                data = self._keyMap[args.old_key];
                                if (!!data) {
                                    delete self._keyMap[args.old_key];
                                    self._keyMap[args.new_key] = data;
                                    data.op.value = args.new_key;
                                }
                            }
                    }
                };
                ListBox.prototype._onDSFill = function (sender, args) {
                    var isEnd = !args.isBegin;
                    if (isEnd) {
                        this._isDSFilling = false;
                        this._refresh();
                    }
                    else {
                        this._isDSFilling = true;
                    }
                };
                ListBox.prototype._onEdit = function (item, isBegin, isCanceled) {
                    var self = this, key, data, oldVal, val;
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
                };
                ListBox.prototype._onStatusChanged = function (item, oldStatus) {
                    var newStatus = item._aspect.status;
                    if (newStatus === 3) {
                        this._removeOption(item);
                        if (!!this._textProvider)
                            this._resetText();
                    }
                };
                ListBox.prototype._onCommitChanges = function (item, isBegin, isRejected, status) {
                    var self = this, oldVal, val, data;
                    if (isBegin) {
                        if (isRejected && status === 1) {
                            return;
                        }
                        else if (!isRejected && status === 3) {
                            return;
                        }
                        this._savedValue = this._getStringValue(item);
                    }
                    else {
                        oldVal = this._savedValue;
                        this._savedValue = undefined;
                        if (isRejected && status === 3) {
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
                };
                ListBox.prototype._onOptionStateChanged = function (data) {
                    if (!this._stateProvider)
                        return '';
                    return this._stateProvider.getCSS(data.item, data.op.index, parser.resolvePath(data.item, this.statePath));
                };
                ListBox.prototype._bindDS = function () {
                    var self = this, ds = this.dataSource;
                    if (!ds)
                        return;
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
                };
                ListBox.prototype._unbindDS = function () {
                    var self = this, ds = this.dataSource;
                    if (!ds)
                        return;
                    ds.removeNSHandlers(self._objId);
                };
                ListBox.prototype._addOption = function (item, first) {
                    if (this._isDestroyCalled)
                        return null;
                    var oOption, key = '', val, text;
                    if (!!item) {
                        key = item._key;
                    }
                    if (!!this._keyMap[key]) {
                        return null;
                    }
                    var selEl = this.el;
                    text = this._getText(item, selEl.options.length);
                    val = this._getStringValue(item);
                    oOption = RIAPP.global.document.createElement("option");
                    oOption.text = text;
                    oOption.value = key;
                    var data = { item: item, op: oOption };
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
                        this._fn_state(item);
                    }
                    return oOption;
                };
                ListBox.prototype._mapByValue = function () {
                    var self = this;
                    this._valMap = {};
                    utils.forEachProp(this._keyMap, function (key) {
                        var data = self._keyMap[key], val = self._getStringValue(data.item);
                        if (!!val)
                            self._valMap[val] = data;
                    });
                };
                ListBox.prototype._resetText = function () {
                    var self = this;
                    utils.forEachProp(this._keyMap, function (key) {
                        var data = self._keyMap[key];
                        data.op.text = self._getText(data.item, data.op.index);
                    });
                };
                ListBox.prototype._removeOption = function (item) {
                    if (this._isDestroyCalled)
                        return;
                    var key = '', data, val;
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
                };
                ListBox.prototype._clear = function (isDestroy) {
                    var self = this;
                    utils.forEachProp(this._keyMap, function (key) {
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
                };
                ListBox.prototype._refresh = function () {
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
                    }
                    finally {
                        self._isRefreshing = false;
                    }
                    self._onChanged();
                };
                ListBox.prototype._findItemIndex = function (item) {
                    if (!item || item.getIsDestroyCalled())
                        return 0;
                    var data = this._keyMap[item._key];
                    if (!data)
                        return 0;
                    return data.op.index;
                };
                ListBox.prototype._setIsEnabled = function (el, v) {
                    el.disabled = !v;
                };
                ListBox.prototype._getIsEnabled = function (el) {
                    return !el.disabled;
                };
                ListBox.prototype.clear = function () {
                    this._clear(false);
                };
                ListBox.prototype.findItemByValue = function (val) {
                    if (utils.check.isNt(val))
                        return null;
                    val = '' + val;
                    var data = this._valMap[val];
                    if (!data)
                        return null;
                    return data.item;
                };
                ListBox.prototype.getTextByValue = function (val) {
                    if (utils.check.isNt(val))
                        return '';
                    val = '' + val;
                    var data = this._valMap[val];
                    if (!data)
                        return '';
                    else
                        return data.op.text;
                };
                ListBox.prototype.toString = function () {
                    return 'ListBox';
                };
                Object.defineProperty(ListBox.prototype, "dataSource", {
                    get: function () { return this._options.dataSource; },
                    set: function (v) {
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
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListBox.prototype, "selectedValue", {
                    get: function () {
                        if (!!this.dataSource)
                            return this._getValue(this.selectedItem);
                        else
                            return undefined;
                    },
                    set: function (v) {
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
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListBox.prototype, "selectedItem", {
                    get: function () {
                        if (!!this.dataSource)
                            return this._selectedItem;
                        else
                            return undefined;
                    },
                    set: function (v) {
                        if (this._selectedItem !== v) {
                            if (!!this._selectedItem) {
                                this._prevSelected = this._selectedItem;
                            }
                            this._selectedItem = v;
                            this.el.selectedIndex = this._findItemIndex(this._selectedItem);
                            this.raisePropertyChanged(PROP_NAME.selectedItem);
                            this.raisePropertyChanged(PROP_NAME.selectedValue);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListBox.prototype, "valuePath", {
                    get: function () { return this._options.valuePath; },
                    set: function (v) {
                        if (v !== this.valuePath) {
                            this._options.valuePath = v;
                            this._mapByValue();
                            this.raisePropertyChanged(PROP_NAME.valuePath);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListBox.prototype, "textPath", {
                    get: function () { return this._options.textPath; },
                    set: function (v) {
                        if (v !== this.textPath) {
                            this._options.textPath = v;
                            this._resetText();
                            this.raisePropertyChanged(PROP_NAME.textPath);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListBox.prototype, "statePath", {
                    get: function () { return this._options.statePath; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListBox.prototype, "isEnabled", {
                    get: function () { return this._getIsEnabled(this.el); },
                    set: function (v) {
                        if (v !== this.isEnabled) {
                            this._setIsEnabled(this.el, v);
                            this.raisePropertyChanged(PROP_NAME.isEnabled);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListBox.prototype, "textProvider", {
                    get: function () { return this._textProvider; },
                    set: function (v) {
                        if (v !== this._textProvider) {
                            this._textProvider = v;
                            this.raisePropertyChanged(PROP_NAME.textProvider);
                            this._resetText();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListBox.prototype, "stateProvider", {
                    get: function () { return this._stateProvider; },
                    set: function (v) {
                        if (v !== this._stateProvider) {
                            this._stateProvider = v;
                            this.raisePropertyChanged(PROP_NAME.stateProvider);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ListBox.prototype, "el", {
                    get: function () { return this._options.el; },
                    enumerable: true,
                    configurable: true
                });
                return ListBox;
            })(RIAPP.BaseObject);
            listbox.ListBox = ListBox;
            var SelectElView = (function (_super) {
                __extends(SelectElView, _super);
                function SelectElView(app, el, options) {
                    var self = this;
                    self._options = options;
                    var opts = utils.extend(false, {
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
                    _super.call(this, app, el, options);
                }
                SelectElView.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._listBox && !this._listBox.getIsDestroyCalled()) {
                        this._listBox.destroy();
                    }
                    this._listBox = null;
                    _super.prototype.destroy.call(this);
                };
                SelectElView.prototype.toString = function () {
                    return 'SelectElView';
                };
                Object.defineProperty(SelectElView.prototype, "isEnabled", {
                    get: function () {
                        if (this._isDestroyCalled)
                            return false;
                        return !this.el.disabled;
                    },
                    set: function (v) {
                        v = !!v;
                        if (v !== this.isEnabled) {
                            this.el.disabled = !v;
                            this.raisePropertyChanged(PROP_NAME.isEnabled);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SelectElView.prototype, "el", {
                    get: function () { return this._el; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SelectElView.prototype, "dataSource", {
                    get: function () {
                        if (this._isDestroyCalled)
                            return undefined;
                        return this._listBox.dataSource;
                    },
                    set: function (v) {
                        var self = this;
                        if (self.dataSource !== v) {
                            self._listBox.dataSource = v;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SelectElView.prototype, "selectedValue", {
                    get: function () {
                        if (this.getIsDestroyCalled())
                            return undefined;
                        return this._listBox.selectedValue;
                    },
                    set: function (v) {
                        if (this._listBox.selectedValue !== v) {
                            this._listBox.selectedValue = v;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SelectElView.prototype, "selectedItem", {
                    get: function () {
                        if (this.getIsDestroyCalled())
                            return undefined;
                        return this._listBox.selectedItem;
                    },
                    set: function (v) {
                        this._listBox.selectedItem = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SelectElView.prototype, "valuePath", {
                    get: function () { return this._listBox.valuePath; },
                    set: function (v) {
                        this._listBox.valuePath = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SelectElView.prototype, "textPath", {
                    get: function () { return this._listBox.textPath; },
                    set: function (v) {
                        this._listBox.textPath = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SelectElView.prototype, "textProvider", {
                    get: function () { return this._listBox.textProvider; },
                    set: function (v) {
                        this._listBox.textProvider = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SelectElView.prototype, "stateProvider", {
                    get: function () { return this._listBox.stateProvider; },
                    set: function (v) {
                        this._listBox.stateProvider = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SelectElView.prototype, "listBox", {
                    get: function () { return this._listBox; },
                    enumerable: true,
                    configurable: true
                });
                return SelectElView;
            })(elviewMOD.BaseElView);
            listbox.SelectElView = SelectElView;
            var LOOKUP_EVENTS = {
                obj_created: 'object_created',
                obj_needed: 'object_needed'
            };
            var LookupContent = (function (_super) {
                __extends(LookupContent, _super);
                function LookupContent(app, options) {
                    if (options.contentOptions.name != 'lookup') {
                        throw new Error(utils.format(RIAPP.ERRS.ERR_ASSERTION_FAILED, "contentOptions.name == 'lookup'"));
                    }
                    this._spanView = null;
                    this._selectView = null;
                    this._isListBoxCachedExternally = false;
                    this._valBinding = null;
                    this._listBinding = null;
                    this._value = null;
                    _super.call(this, app, options);
                }
                LookupContent.prototype.init = function () {
                    if (!!this._options.initContentFn) {
                        this._options.initContentFn(this);
                    }
                };
                LookupContent.prototype._getEventNames = function () {
                    var base_events = _super.prototype._getEventNames.call(this);
                    return [LOOKUP_EVENTS.obj_created, LOOKUP_EVENTS.obj_needed].concat(base_events);
                };
                LookupContent.prototype.addOnObjectCreated = function (fn, nmspace) {
                    this._addHandler(LOOKUP_EVENTS.obj_created, fn, nmspace);
                };
                LookupContent.prototype.removeOnObjectCreated = function (nmspace) {
                    this._removeHandler(LOOKUP_EVENTS.obj_created, nmspace);
                };
                LookupContent.prototype.addOnObjectNeeded = function (fn, nmspace) {
                    this._addHandler(LOOKUP_EVENTS.obj_needed, fn, nmspace);
                };
                LookupContent.prototype.removeOnObjectNeeded = function (nmspace) {
                    this._removeHandler(LOOKUP_EVENTS.obj_needed, nmspace);
                };
                LookupContent.prototype.getSelectView = function () {
                    if (!!this._selectView)
                        return this._selectView;
                    var lookUpOptions = this._options.options, objectKey = 'selectElView';
                    var args1 = { objectKey: objectKey, object: null };
                    this.raiseEvent(LOOKUP_EVENTS.obj_needed, args1);
                    if (!!args1.object) {
                        this._isListBoxCachedExternally = true;
                        this._selectView = args1.object;
                    }
                    if (!!this._selectView)
                        return this._selectView;
                    var dataSource = parser.resolvePath(this.app, lookUpOptions.dataSource), options = { valuePath: lookUpOptions.valuePath, textPath: lookUpOptions.textPath, statePath: (!lookUpOptions.statePath) ? null : lookUpOptions.statePath };
                    var el = RIAPP.global.document.createElement('select');
                    el.setAttribute('size', '1');
                    var selectElView = this.createSelectElView(el, options);
                    selectElView.dataSource = dataSource;
                    var args2 = { objectKey: objectKey, object: selectElView, isCachedExternally: false };
                    this.raiseEvent(LOOKUP_EVENTS.obj_created, args2);
                    this._isListBoxCachedExternally = args2.isCachedExternally;
                    this._selectView = selectElView;
                    return this._selectView;
                };
                LookupContent.prototype.createSelectElView = function (el, options) {
                    var elView = this.app._getInternal().getElView(el);
                    if (!!elView)
                        return elView;
                    elView = new SelectElView(this.app, el, options);
                    return elView;
                };
                LookupContent.prototype.updateTextValue = function () {
                    var spanView = this.getSpanView();
                    spanView.value = this.getLookupText();
                };
                LookupContent.prototype.getLookupText = function () {
                    var listBoxView = this.getSelectView();
                    return listBoxView.listBox.getTextByValue(this.value);
                };
                LookupContent.prototype.getSpanView = function () {
                    if (!!this._spanView) {
                        return this._spanView;
                    }
                    var el = RIAPP.global.document.createElement('span'), displayInfo = this._options.displayInfo;
                    var spanView = new elviewMOD.SpanElView(this.app, el, {});
                    if (!!displayInfo) {
                        if (!!displayInfo.displayCss) {
                            spanView.$el.addClass(displayInfo.displayCss);
                        }
                    }
                    this._spanView = spanView;
                    return this._spanView;
                };
                LookupContent.prototype.render = function () {
                    this.cleanUp();
                    this.createTargetElement();
                    this._parentEl.appendChild(this._el);
                };
                LookupContent.prototype.createTargetElement = function () {
                    var tgt, el, selectView, spanView;
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
                };
                LookupContent.prototype.cleanUp = function () {
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
                };
                LookupContent.prototype.updateBindingSource = function () {
                    if (!!this._valBinding) {
                        this._valBinding.source = this._dataContext;
                    }
                    if (!!this._listBinding) {
                        this._listBinding.source = this._dataContext;
                    }
                };
                LookupContent.prototype.bindToValue = function () {
                    if (!this._options.fieldName)
                        return null;
                    var options = {
                        target: this, source: this._dataContext,
                        targetPath: PROP_NAME.value, sourcePath: this._options.fieldName,
                        mode: 1,
                        converter: null, converterParam: null, isSourceFixed: false
                    };
                    return this.app.bind(options);
                };
                LookupContent.prototype.bindToList = function (selectView) {
                    if (!this._options.fieldName)
                        return null;
                    var options = {
                        target: selectView, source: this._dataContext,
                        targetPath: PROP_NAME.selectedValue, sourcePath: this._options.fieldName,
                        mode: 2,
                        converter: null, converterParam: null, isSourceFixed: false
                    };
                    return this.app.bind(options);
                };
                LookupContent.prototype.destroy = function () {
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
                    _super.prototype.destroy.call(this);
                };
                LookupContent.prototype.toString = function () {
                    return 'LookupContent';
                };
                Object.defineProperty(LookupContent.prototype, "value", {
                    get: function () { return this._value; },
                    set: function (v) {
                        if (this._value !== v) {
                            this._value = v;
                            this.updateTextValue();
                            this.raisePropertyChanged(PROP_NAME.value);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return LookupContent;
            })(contentMOD.BindingContent);
            listbox.LookupContent = LookupContent;
            var ContentFactory = (function () {
                function ContentFactory(app, nextFactory) {
                    this._app = app;
                    this._nextFactory = nextFactory;
                }
                ContentFactory.prototype.getContentType = function (options) {
                    if (options.name == 'lookup') {
                        return LookupContent;
                    }
                    if (!!this._nextFactory)
                        return this._nextFactory.getContentType(options);
                    else
                        throw new Error(RIAPP.ERRS.ERR_BINDING_CONTENT_NOT_FOUND);
                };
                ContentFactory.prototype.createContent = function (options) {
                    var contentType = this.getContentType(options);
                    return new contentType(this.app, options);
                };
                ContentFactory.prototype.isExternallyCachable = function (contentType) {
                    if (LookupContent === contentType)
                        return true;
                    return this._nextFactory.isExternallyCachable(contentType);
                };
                Object.defineProperty(ContentFactory.prototype, "app", {
                    get: function () { return this._app; },
                    enumerable: true,
                    configurable: true
                });
                return ContentFactory;
            })();
            listbox.ContentFactory = ContentFactory;
            listbox._initModule = function (app) {
                app._getInternal().addContentFactory(function (nextFactory) {
                    return new ContentFactory(app, nextFactory);
                });
            };
            RIAPP.global.registerElView('select', SelectElView);
            listbox._isModuleLoaded = true;
        })(listbox = MOD.listbox || (MOD.listbox = {}));
    })(MOD = RIAPP.MOD || (RIAPP.MOD = {}));
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    var MOD;
    (function (MOD) {
        var datadialog;
        (function (datadialog) {
            var templMOD = RIAPP.MOD.template;
            var mvvm = RIAPP.MOD.mvvm;
            var utils;
            RIAPP.global.addOnInitialize(function (s, args) {
                utils = s.utils;
            });
            ;
            var DLG_EVENTS = {
                close: 'close',
                refresh: 'refresh'
            };
            var PROP_NAME = {
                dataContext: 'dataContext',
                isSubmitOnOK: 'isSubmitOnOK',
                width: 'width',
                height: 'height',
                title: 'title',
                canRefresh: 'canRefresh',
                canCancel: 'canCancel'
            };
            var DataEditDialog = (function (_super) {
                __extends(DataEditDialog, _super);
                function DataEditDialog(app, options) {
                    _super.call(this);
                    var self = this;
                    options = utils.extend(false, {
                        dataContext: null,
                        templateID: null,
                        width: 500,
                        height: 350,
                        title: 'data edit dialog',
                        submitOnOK: false,
                        canRefresh: false,
                        canCancel: true,
                        fn_OnClose: null,
                        fn_OnOK: null,
                        fn_OnShow: null,
                        fn_OnCancel: null,
                        fn_OnTemplateCreated: null,
                        fn_OnTemplateDestroy: null
                    }, options);
                    this._objId = 'dlg' + RIAPP.baseUtils.getNewID();
                    this._app = app;
                    this._dataContext = options.dataContext;
                    this._templateID = options.templateID;
                    this._submitOnOK = options.submitOnOK;
                    this._canRefresh = options.canRefresh;
                    this._canCancel = options.canCancel;
                    this._fn_OnClose = options.fn_OnClose;
                    this._fn_OnOK = options.fn_OnOK;
                    this._fn_OnShow = options.fn_OnShow;
                    this._fn_OnCancel = options.fn_OnCancel;
                    this._fn_OnTemplateCreated = options.fn_OnTemplateCreated;
                    this._fn_OnTemplateDestroy = options.fn_OnTemplateDestroy;
                    this._isEditable = null;
                    this._template = null;
                    this._$template = null;
                    this._result = null;
                    this._currentSelectable = null;
                    this._fn_submitOnOK = function () {
                        var iSubmittable = utils.getSubmittable(self._dataContext);
                        if (!iSubmittable || !iSubmittable.isCanSubmit) {
                            return utils.createDeferred().resolve();
                        }
                        return iSubmittable.submitChanges();
                    };
                    this._updateIsEditable();
                    this._options = {
                        width: options.width,
                        height: options.height,
                        title: options.title,
                        autoOpen: false,
                        modal: true,
                        close: function (event, ui) {
                            self._onClose();
                        },
                        buttons: self._getButtons()
                    };
                    this._dialogCreated = false;
                    this._createDialog();
                }
                DataEditDialog.prototype.handleError = function (error, source) {
                    var isHandled = _super.prototype.handleError.call(this, error, source);
                    if (!isHandled) {
                        return this._app.handleError(error, source);
                    }
                    return isHandled;
                };
                DataEditDialog.prototype.addOnClose = function (fn, nmspace, context) {
                    this._addHandler(DLG_EVENTS.close, fn, nmspace, context);
                };
                DataEditDialog.prototype.removeOnClose = function (nmspace) {
                    this._removeHandler(DLG_EVENTS.close, nmspace);
                };
                DataEditDialog.prototype.addOnRefresh = function (fn, nmspace, context) {
                    this._addHandler(DLG_EVENTS.refresh, fn, nmspace, context);
                };
                DataEditDialog.prototype.removeOnRefresh = function (nmspace) {
                    this._removeHandler(DLG_EVENTS.refresh, nmspace);
                };
                DataEditDialog.prototype._updateIsEditable = function () {
                    this._isEditable = utils.getEditable(this._dataContext);
                };
                DataEditDialog.prototype._createDialog = function () {
                    if (this._dialogCreated)
                        return;
                    try {
                        this._template = this._createTemplate();
                        this._$template = RIAPP.global.$(this._template.el);
                        RIAPP.global.document.body.appendChild(this._template.el);
                        this._$template.dialog(this._options);
                        this._dialogCreated = true;
                    }
                    catch (ex) {
                        RIAPP.reThrow(ex, this.handleError(ex, this));
                    }
                };
                DataEditDialog.prototype._getEventNames = function () {
                    var base_events = _super.prototype._getEventNames.call(this);
                    return [DLG_EVENTS.close, DLG_EVENTS.refresh].concat(base_events);
                };
                DataEditDialog.prototype.templateLoading = function (template) {
                };
                DataEditDialog.prototype.templateLoaded = function (template) {
                    if (this._isDestroyCalled)
                        return;
                    if (!!this._fn_OnTemplateCreated) {
                        this._fn_OnTemplateCreated(template);
                    }
                };
                DataEditDialog.prototype.templateUnLoading = function (template) {
                    if (!!this._fn_OnTemplateDestroy) {
                        this._fn_OnTemplateDestroy(template);
                    }
                };
                DataEditDialog.prototype._createTemplate = function () {
                    return new templMOD.Template({
                        app: this.app,
                        templateID: this._templateID,
                        dataContext: null,
                        templEvents: this
                    });
                };
                DataEditDialog.prototype._destroyTemplate = function () {
                    if (!!this._template)
                        this._template.destroy();
                };
                DataEditDialog.prototype._getButtons = function () {
                    var self = this, buttons = [
                        {
                            'id': self._objId + 'Refresh',
                            'text': RIAPP.localizable.TEXT.txtRefresh,
                            'class': 'btn btn-info',
                            'click': function () {
                                self._onRefresh();
                            }
                        },
                        {
                            'id': self._objId + 'Ok',
                            'text': RIAPP.localizable.TEXT.txtOk,
                            'class': 'btn btn-info',
                            'click': function () {
                                self._onOk();
                            }
                        },
                        {
                            'id': self._objId + 'Cancel',
                            'text': RIAPP.localizable.TEXT.txtCancel,
                            'class': 'btn btn-info',
                            'click': function () {
                                self._onCancel();
                            }
                        }
                    ];
                    if (!this.canRefresh) {
                        buttons.shift();
                    }
                    if (!this.canCancel) {
                        buttons.pop();
                    }
                    return buttons;
                };
                DataEditDialog.prototype._getOkButton = function () {
                    return $("#" + this._objId + 'Ok');
                };
                DataEditDialog.prototype._getCancelButton = function () {
                    return $("#" + this._objId + 'Cancel');
                };
                DataEditDialog.prototype._getRefreshButton = function () {
                    return $("#" + this._objId + 'Refresh');
                };
                DataEditDialog.prototype._getAllButtons = function () {
                    return [this._getOkButton(), this._getCancelButton(), this._getRefreshButton()];
                };
                DataEditDialog.prototype._disableButtons = function (isDisable) {
                    var btns = this._getAllButtons();
                    btns.forEach(function ($btn) {
                        $btn.prop("disabled", !!isDisable);
                    });
                };
                DataEditDialog.prototype._onOk = function () {
                    var self = this, canCommit, action = 0;
                    if (!!this._fn_OnOK) {
                        action = this._fn_OnOK(this);
                    }
                    if (action == 1)
                        return;
                    if (!this._dataContext) {
                        self.hide();
                        return;
                    }
                    if (!!this._isEditable)
                        canCommit = this._isEditable.endEdit();
                    else
                        canCommit = true;
                    if (canCommit) {
                        if (this._submitOnOK) {
                            this._disableButtons(true);
                            var title = this.title;
                            this.title = RIAPP.localizable.TEXT.txtSubmitting;
                            var promise = this._fn_submitOnOK();
                            promise.always(function () {
                                self._disableButtons(false);
                                self.title = title;
                            });
                            promise.done(function () {
                                self._result = 'ok';
                                self.hide();
                            });
                            promise.fail(function () {
                                if (!!self._isEditable) {
                                    if (!self._isEditable.beginEdit()) {
                                        self._result = 'cancel';
                                        self.hide();
                                    }
                                }
                            });
                        }
                        else {
                            self._result = 'ok';
                            self.hide();
                        }
                    }
                };
                DataEditDialog.prototype._onCancel = function () {
                    var action = 0;
                    if (!!this._fn_OnCancel) {
                        action = this._fn_OnCancel(this);
                    }
                    if (action == 1)
                        return;
                    if (!!this._isEditable)
                        this._isEditable.cancelEdit();
                    this._result = 'cancel';
                    this.hide();
                };
                DataEditDialog.prototype._onRefresh = function () {
                    var args = { isHandled: false };
                    this.raiseEvent(DLG_EVENTS.refresh, args);
                    if (args.isHandled)
                        return;
                    var dctx = this._dataContext;
                    if (!!dctx) {
                        if (utils.check.isFunction(dctx.refresh)) {
                            dctx.refresh();
                        }
                        else if (!!dctx._aspect && utils.check.isFunction(dctx._aspect.refresh)) {
                            dctx._aspect.refresh();
                        }
                    }
                };
                DataEditDialog.prototype._onClose = function () {
                    try {
                        if (this._result != 'ok' && !!this._dataContext) {
                            if (!!this._isEditable)
                                this._isEditable.cancelEdit();
                            if (this._submitOnOK) {
                                var subm = utils.getSubmittable(this._dataContext);
                                if (!!subm)
                                    subm.rejectChanges();
                            }
                        }
                        if (!!this._fn_OnClose)
                            this._fn_OnClose(this);
                        this.raiseEvent(DLG_EVENTS.close, {});
                    }
                    finally {
                        this._template.dataContext = null;
                    }
                    var csel = this._currentSelectable;
                    this._currentSelectable = null;
                    setTimeout(function () { RIAPP.global.currentSelectable = csel; csel = null; }, 50);
                };
                DataEditDialog.prototype._onShow = function () {
                    this._currentSelectable = RIAPP.global.currentSelectable;
                    if (!!this._fn_OnShow) {
                        this._fn_OnShow(this);
                    }
                };
                DataEditDialog.prototype.show = function () {
                    var self = this;
                    self._result = null;
                    self._$template.dialog("option", "buttons", this._getButtons());
                    this._template.dataContext = this._dataContext;
                    self._onShow();
                    self._$template.dialog("open");
                };
                DataEditDialog.prototype.hide = function () {
                    var self = this;
                    if (!self._$template)
                        return;
                    self._$template.dialog("close");
                };
                DataEditDialog.prototype.getOption = function (name) {
                    if (!this._$template)
                        return undefined;
                    return this._$template.dialog('option', name);
                };
                DataEditDialog.prototype.setOption = function (name, value) {
                    var self = this;
                    self._$template.dialog('option', name, value);
                };
                DataEditDialog.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this.hide();
                    this._destroyTemplate();
                    this._$template = null;
                    this._template = null;
                    this._dialogCreated = false;
                    this._dataContext = null;
                    this._fn_submitOnOK = null;
                    this._isEditable = null;
                    this._app = null;
                    _super.prototype.destroy.call(this);
                };
                Object.defineProperty(DataEditDialog.prototype, "app", {
                    get: function () { return this._app; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataEditDialog.prototype, "dataContext", {
                    get: function () { return this._dataContext; },
                    set: function (v) {
                        if (v !== this._dataContext) {
                            this._dataContext = v;
                            this._updateIsEditable();
                            this.raisePropertyChanged(PROP_NAME.dataContext);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataEditDialog.prototype, "result", {
                    get: function () { return this._result; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataEditDialog.prototype, "template", {
                    get: function () { return this._template; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataEditDialog.prototype, "isSubmitOnOK", {
                    get: function () { return this._submitOnOK; },
                    set: function (v) {
                        if (this._submitOnOK !== v) {
                            this._submitOnOK = v;
                            this.raisePropertyChanged(PROP_NAME.isSubmitOnOK);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataEditDialog.prototype, "width", {
                    get: function () { return this.getOption('width'); },
                    set: function (v) {
                        var x = this.getOption('width');
                        if (v !== x) {
                            this.setOption('width', v);
                            this.raisePropertyChanged(PROP_NAME.width);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataEditDialog.prototype, "height", {
                    get: function () { return this.getOption('height'); },
                    set: function (v) {
                        var x = this.getOption('height');
                        if (v !== x) {
                            this.setOption('height', v);
                            this.raisePropertyChanged(PROP_NAME.height);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataEditDialog.prototype, "title", {
                    get: function () { return this.getOption('title'); },
                    set: function (v) {
                        var x = this.getOption('title');
                        if (v !== x) {
                            this.setOption('title', v);
                            this.raisePropertyChanged(PROP_NAME.title);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataEditDialog.prototype, "canRefresh", {
                    get: function () { return this._canRefresh; },
                    set: function (v) {
                        var x = this._canRefresh;
                        if (v !== x) {
                            this._canRefresh = v;
                            this.raisePropertyChanged(PROP_NAME.canRefresh);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataEditDialog.prototype, "canCancel", {
                    get: function () { return this._canCancel; },
                    set: function (v) {
                        var x = this._canCancel;
                        if (v !== x) {
                            this._canCancel = v;
                            this.raisePropertyChanged(PROP_NAME.canCancel);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return DataEditDialog;
            })(RIAPP.BaseObject);
            datadialog.DataEditDialog = DataEditDialog;
            var DialogVM = (function (_super) {
                __extends(DialogVM, _super);
                function DialogVM(app) {
                    _super.call(this, app);
                    this._dialogs = {};
                }
                DialogVM.prototype.createDialog = function (name, options) {
                    var self = this;
                    this._dialogs[name] = function () {
                        var dialog = new DataEditDialog(self.app, options);
                        var f = function () {
                            return dialog;
                        };
                        self._dialogs[name] = f;
                        return f();
                    };
                    return this._dialogs[name];
                };
                DialogVM.prototype.showDialog = function (name, dataContext) {
                    var dlg = this.getDialog(name);
                    if (!dlg)
                        throw new Error(utils.format('Invalid Dialog name:  {0}', name));
                    dlg.dataContext = dataContext;
                    dlg.show();
                    return dlg;
                };
                DialogVM.prototype.getDialog = function (name) {
                    var factory = this._dialogs[name];
                    if (!factory)
                        return null;
                    return factory();
                };
                DialogVM.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    var keys = Object.keys(this._dialogs);
                    keys.forEach(function (key) {
                        this._dialogs[key].destroy();
                    }, this);
                    this._dialogs = {};
                    _super.prototype.destroy.call(this);
                };
                return DialogVM;
            })(mvvm.BaseViewModel);
            datadialog.DialogVM = DialogVM;
            datadialog._isModuleLoaded = true;
        })(datadialog = MOD.datadialog || (MOD.datadialog = {}));
    })(MOD = RIAPP.MOD || (RIAPP.MOD = {}));
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    var MOD;
    (function (MOD) {
        var datagrid;
        (function (datagrid) {
            var constsMOD = RIAPP.consts;
            var elviewMOD = RIAPP.MOD.baseElView;
            var contentMOD = RIAPP.MOD.baseContent;
            var collMOD = RIAPP.MOD.collection;
            var templMOD = RIAPP.MOD.template;
            var COLUMN_TYPE = { DATA: 'data', ROW_EXPANDER: 'row_expander', ROW_ACTIONS: 'row_actions', ROW_SELECTOR: 'row_selector' };
            var utils, global = RIAPP.global;
            global.addOnInitialize(function (s, args) {
                utils = s.utils;
            });
            datagrid.css = {
                container: 'ria-table-container',
                dataTable: 'ria-data-table',
                columnInfo: 'ria-col-info',
                column: 'ria-ex-column',
                cellDiv: 'cell-div',
                headerDiv: 'ria-table-header',
                wrapDiv: 'ria-table-wrap',
                dataColumn: 'data-column',
                rowCollapsed: 'row-collapsed',
                rowExpanded: 'row-expanded',
                rowExpander: 'row-expander',
                columnSelected: 'selected',
                rowSelected: 'selected',
                rowActions: 'row-actions',
                rowDetails: 'row-details',
                rowSelector: 'row-selector',
                rowHighlight: 'row-highlight',
                rowDeleted: 'row-deleted',
                rowError: 'row-error',
                nobr: 'ria-nobr',
                colSortable: 'sortable',
                colSortAsc: 'sort-asc',
                colSortDesc: 'sort-desc'
            };
            var PROP_NAME = {
                isCurrent: 'isCurrent',
                isSelected: 'isSelected',
                sortOrder: 'sortOrder',
                checked: 'checked',
                editingRow: 'editingRow',
                dataSource: 'dataSource',
                currentRow: 'currentRow',
                grid: 'grid',
                animation: 'animation',
                stateProvider: 'stateProvider'
            };
            var _columnWidthInterval, _gridsCount = 0;
            var _created_grids = {};
            function _gridCreated(grid) {
                _created_grids[grid.uniqueID] = grid;
                _gridsCount += 1;
                if (_gridsCount == 1) {
                    _columnWidthInterval = setInterval(_checkGridWidth, 250);
                }
            }
            function _gridDestroyed(grid) {
                delete _created_grids[grid.uniqueID];
                _gridsCount -= 1;
                if (_gridsCount == 0) {
                    clearInterval(_columnWidthInterval);
                }
            }
            function _checkGridWidth() {
                utils.forEachProp(_created_grids, function (id) {
                    var grid = _created_grids[id];
                    if (grid.getIsDestroyCalled())
                        return;
                    grid._columnWidthChecker();
                });
            }
            var RowSelectContent = (function (_super) {
                __extends(RowSelectContent, _super);
                function RowSelectContent() {
                    _super.apply(this, arguments);
                }
                RowSelectContent.prototype.getIsCanBeEdited = function () {
                    return true;
                };
                RowSelectContent.prototype.toString = function () {
                    return 'RowSelectContent';
                };
                return RowSelectContent;
            })(contentMOD.BoolContent);
            datagrid.RowSelectContent = RowSelectContent;
            var BaseCell = (function (_super) {
                __extends(BaseCell, _super);
                function BaseCell(options) {
                    _super.call(this);
                    options = utils.extend(false, {
                        row: null,
                        td: null,
                        column: null
                    }, options);
                    this._row = options.row;
                    this._el = options.td;
                    this._column = options.column;
                    this._num = options.num;
                    this._div = global.document.createElement("div");
                    var $div = global.$(this._div);
                    this._clickTimeOut = null;
                    $div.addClass(datagrid.css.cellDiv).attr(constsMOD.DATA_ATTR.DATA_EVENT_SCOPE, this._column.uniqueID);
                    $div.data('cell', this);
                    if (this._column.options.width) {
                        this._el.style.width = this._column.options.width;
                    }
                    this._init();
                    if (this.column.options.rowCellCss) {
                        $div.addClass(this.column.options.rowCellCss);
                    }
                    this._el.appendChild(this._div);
                    this._row.el.appendChild(this._el);
                }
                BaseCell.prototype._init = function () {
                };
                BaseCell.prototype._onCellClicked = function (row) {
                };
                BaseCell.prototype._onDblClicked = function (row) {
                    this.grid._getInternal().onCellDblClicked(this);
                };
                BaseCell.prototype.handleError = function (error, source) {
                    var isHandled = _super.prototype.handleError.call(this, error, source);
                    if (!isHandled) {
                        return this.row.handleError(error, source);
                    }
                    return isHandled;
                };
                BaseCell.prototype.click = function () {
                    this.grid.currentRow = this._row;
                    this._onCellClicked(this._row);
                };
                BaseCell.prototype.scrollIntoView = function (isUp) {
                    var div = this._div;
                    div.scrollIntoView(!!isUp);
                };
                BaseCell.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._clickTimeOut) {
                        clearTimeout(this._clickTimeOut);
                        this._clickTimeOut = null;
                    }
                    var $div = global.$(this._div);
                    $div.removeData();
                    $div.remove();
                    this._div = null;
                    this._row = null;
                    this._el = null;
                    this._column = null;
                    _super.prototype.destroy.call(this);
                };
                BaseCell.prototype.toString = function () {
                    return 'BaseCell';
                };
                Object.defineProperty(BaseCell.prototype, "el", {
                    get: function () { return this._el; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseCell.prototype, "row", {
                    get: function () { return this._row; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseCell.prototype, "column", {
                    get: function () { return this._column; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseCell.prototype, "grid", {
                    get: function () { return this._row.grid; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseCell.prototype, "item", {
                    get: function () { return this._row.item; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseCell.prototype, "uniqueID", {
                    get: function () { return this._row.uniqueID + '_' + this._num; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseCell.prototype, "num", {
                    get: function () { return this._num; },
                    enumerable: true,
                    configurable: true
                });
                return BaseCell;
            })(RIAPP.BaseObject);
            datagrid.BaseCell = BaseCell;
            var DataCell = (function (_super) {
                __extends(DataCell, _super);
                function DataCell(options) {
                    this._content = null;
                    this._stateCss = null;
                    _super.call(this, options);
                }
                DataCell.prototype._init = function () {
                    var options = this.column.options.content;
                    if (!options.fieldInfo && !!options.fieldName) {
                        options.fieldInfo = this.item._aspect.getFieldInfo(options.fieldName);
                        if (!options.fieldInfo) {
                            throw new Error(utils.format(RIAPP.ERRS.ERR_DBSET_INVALID_FIELDNAME, '', options.fieldName));
                        }
                    }
                    var self = this, app = this.grid.app;
                    options.initContentFn = null;
                    try {
                        var contentType = app._getInternal().getContentType(options);
                        if (app.contentFactory.isExternallyCachable(contentType)) {
                            options.initContentFn = this.column._getInitContentFn();
                        }
                        this._content = new contentType(app, { parentEl: this._div, contentOptions: options, dataContext: this.item, isEditing: this.item._aspect.isEditing });
                    }
                    finally {
                        delete options.initContentFn;
                    }
                };
                DataCell.prototype.click = function () {
                    var self = this, row = this._row;
                    this.grid.currentRow = row;
                    if (!!this._clickTimeOut) {
                        clearTimeout(this._clickTimeOut);
                        this._clickTimeOut = null;
                        this._onDblClicked(row);
                    }
                    else {
                        this._clickTimeOut = setTimeout(function () {
                            self._clickTimeOut = null;
                            self._onCellClicked(row);
                        }, 350);
                    }
                };
                DataCell.prototype._beginEdit = function () {
                    if (!this._content.isEditing) {
                        this._content.isEditing = true;
                    }
                };
                DataCell.prototype._endEdit = function (isCanceled) {
                    if (this._content.isEditing) {
                        this._content.isEditing = false;
                    }
                };
                DataCell.prototype._setState = function (css) {
                    var $div;
                    if (this._stateCss !== css) {
                        $div = global.$(this._div);
                        if (!!this._stateCss)
                            $div.removeClass(this._stateCss);
                        this._stateCss = css;
                        if (!!this._stateCss)
                            $div.addClass(this._stateCss);
                    }
                };
                DataCell.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._content) {
                        this._content.destroy();
                        this._content = null;
                    }
                    _super.prototype.destroy.call(this);
                };
                DataCell.prototype.toString = function () {
                    return 'DataCell';
                };
                Object.defineProperty(DataCell.prototype, "column", {
                    get: function () { return this._column; },
                    enumerable: true,
                    configurable: true
                });
                return DataCell;
            })(BaseCell);
            datagrid.DataCell = DataCell;
            var ExpanderCell = (function (_super) {
                __extends(ExpanderCell, _super);
                function ExpanderCell() {
                    _super.apply(this, arguments);
                }
                ExpanderCell.prototype._init = function () {
                    var $el = global.$(this.el);
                    $el.addClass(datagrid.css.rowCollapsed);
                    $el.addClass(datagrid.css.rowExpander);
                };
                ExpanderCell.prototype._onCellClicked = function (row) {
                    var clicked_row = row || this._row;
                    if (!clicked_row)
                        return;
                    _super.prototype._onCellClicked.call(this, clicked_row);
                    clicked_row.isExpanded = !clicked_row.isExpanded;
                };
                ExpanderCell.prototype.toggleImage = function () {
                    var $el = global.$(this.el);
                    if (this._row.isExpanded) {
                        $el.removeClass(datagrid.css.rowCollapsed);
                        $el.addClass(datagrid.css.rowExpanded);
                    }
                    else {
                        $el.removeClass(datagrid.css.rowExpanded);
                        $el.addClass(datagrid.css.rowCollapsed);
                    }
                };
                ExpanderCell.prototype.toString = function () {
                    return 'ExpanderCell';
                };
                return ExpanderCell;
            })(BaseCell);
            datagrid.ExpanderCell = ExpanderCell;
            var ActionsCell = (function (_super) {
                __extends(ActionsCell, _super);
                function ActionsCell(options) {
                    this._isEditing = false;
                    _super.call(this, options);
                }
                ActionsCell.prototype._init = function () {
                    var $el = global.$(this.el), $div = global.$(this._div);
                    $el.addClass([datagrid.css.rowActions, datagrid.css.cellDiv, datagrid.css.nobr].join(' '));
                    $div.on("mouseenter", "img", function (e) {
                        e.stopPropagation();
                        $(this).css("opacity", 0.5);
                    });
                    $div.on("mouseout", "img", function (e) {
                        e.stopPropagation();
                        $(this).css("opacity", 1.0);
                    });
                    this._createButtons(false);
                };
                ActionsCell.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    var $div = global.$(this._div), $imgs = $div.find('img');
                    $div.off();
                    $imgs.each(function (index, img) {
                        var $img = global.$(img);
                        $img.removeData();
                    });
                    _super.prototype.destroy.call(this);
                };
                ActionsCell.prototype._createButtons = function (editing) {
                    if (!this._el)
                        return;
                    var self = this, $ = global.$, $div = $(this._div), $newElems;
                    var txtMap = {
                        img_ok: 'txtOk',
                        img_cancel: 'txtCancel',
                        img_edit: 'txtEdit',
                        img_delete: 'txtDelete'
                    };
                    $div.empty();
                    var opts = self._column.options, fn_setUpImages = function ($images) {
                        $images.each(function (index, img) {
                            var $img = $(img);
                            img.style.cursor = 'pointer';
                            img.src = opts[img.name];
                            $img.data('cell', self);
                            elviewMOD.fn_addToolTip($img, RIAPP.localizable.TEXT[txtMap[img.name]]);
                            $img.attr(constsMOD.DATA_ATTR.DATA_EVENT_SCOPE, self._column.uniqueID);
                        });
                    };
                    if (editing) {
                        this._isEditing = true;
                        $newElems = $('<img name="img_ok" alt="ok"/>&nbsp;<img name="img_cancel" alt="cancel"/>');
                        fn_setUpImages($newElems.filter('img'));
                    }
                    else {
                        this._isEditing = false;
                        $newElems = $('<img name="img_edit" alt="edit"/>&nbsp;<img name="img_delete" alt="delete"/>');
                        if (!self.isCanEdit) {
                            $newElems = $newElems.not('img[name="img_edit"]');
                        }
                        if (!self.isCanDelete) {
                            $newElems = $newElems.not('img[name="img_delete"]');
                        }
                        fn_setUpImages($newElems.filter('img'));
                    }
                    $div.append($newElems);
                };
                ActionsCell.prototype.update = function () {
                    if (!this._row)
                        return;
                    if (this._isEditing != this._row.isEditing) {
                        this._createButtons(this._row.isEditing);
                    }
                };
                ActionsCell.prototype.toString = function () {
                    return 'ActionsCell';
                };
                Object.defineProperty(ActionsCell.prototype, "isCanEdit", {
                    get: function () { return this.grid.isCanEdit; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ActionsCell.prototype, "isCanDelete", {
                    get: function () { return this.grid.isCanDelete; },
                    enumerable: true,
                    configurable: true
                });
                return ActionsCell;
            })(BaseCell);
            datagrid.ActionsCell = ActionsCell;
            var RowSelectorCell = (function (_super) {
                __extends(RowSelectorCell, _super);
                function RowSelectorCell() {
                    _super.apply(this, arguments);
                }
                RowSelectorCell.prototype._init = function () {
                    var $el = global.$(this.el);
                    $el.addClass(datagrid.css.rowSelector);
                    var bindInfo = {
                        target: null, source: null,
                        targetPath: null, sourcePath: PROP_NAME.isSelected,
                        mode: "TwoWay",
                        converter: null, converterParam: null
                    }, contentOpts = {
                        fieldName: PROP_NAME.isSelected,
                        bindingInfo: bindInfo,
                        displayInfo: null
                    };
                    this._content = new RowSelectContent(this.grid.app, {
                        parentEl: this._div,
                        contentOptions: contentOpts,
                        dataContext: this.row,
                        isEditing: true
                    });
                };
                RowSelectorCell.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._content) {
                        this._content.destroy();
                        this._content = null;
                    }
                    _super.prototype.destroy.call(this);
                };
                RowSelectorCell.prototype.toString = function () {
                    return 'RowSelectorCell';
                };
                return RowSelectorCell;
            })(BaseCell);
            datagrid.RowSelectorCell = RowSelectorCell;
            var DetailsCell = (function (_super) {
                __extends(DetailsCell, _super);
                function DetailsCell(options) {
                    _super.call(this);
                    this._row = options.row;
                    this._el = options.td;
                    this._init(options);
                }
                DetailsCell.prototype._init = function (options) {
                    var details_id = options.details_id;
                    if (!details_id)
                        return;
                    this._el.colSpan = this.grid.columns.length;
                    this._row.el.appendChild(this._el);
                    this._template = new templMOD.Template({
                        app: this.grid.app,
                        templateID: details_id,
                        templEvents: this
                    });
                    this._el.appendChild(this._template.el);
                };
                DetailsCell.prototype.templateLoading = function (template) {
                };
                DetailsCell.prototype.templateLoaded = function (template) {
                };
                DetailsCell.prototype.templateUnLoading = function (template) {
                    this._el.removeChild(template.el);
                    this._template = null;
                };
                DetailsCell.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._template) {
                        this._template.destroy();
                        this._template = null;
                    }
                    this._row = null;
                    this._el = null;
                    _super.prototype.destroy.call(this);
                };
                DetailsCell.prototype.toString = function () {
                    return 'DetailsCell';
                };
                Object.defineProperty(DetailsCell.prototype, "el", {
                    get: function () { return this._el; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DetailsCell.prototype, "row", {
                    get: function () { return this._row; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DetailsCell.prototype, "grid", {
                    get: function () { return this._row.grid; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DetailsCell.prototype, "item", {
                    get: function () { return this._template.dataContext; },
                    set: function (v) { this._template.dataContext = v; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DetailsCell.prototype, "template", {
                    get: function () { return this._template; },
                    enumerable: true,
                    configurable: true
                });
                return DetailsCell;
            })(RIAPP.BaseObject);
            datagrid.DetailsCell = DetailsCell;
            var Row = (function (_super) {
                __extends(Row, _super);
                function Row(grid, options) {
                    var self = this;
                    _super.call(this);
                    this._grid = grid;
                    this._el = options.tr;
                    this._item = options.item;
                    this._cells = null;
                    this._objId = 'r' + RIAPP.baseUtils.getNewID();
                    this._expanderCell = null;
                    this._actionsCell = null;
                    this._rowSelectorCell = null;
                    this._isCurrent = false;
                    this._isDeleted = false;
                    this._isSelected = false;
                    this._createCells();
                    this._isDeleted = this._item._aspect.isDeleted;
                    var fn_state = function () {
                        var css = self._grid._getInternal().onRowStateChanged(self, self._item[self._grid.options.rowStateField]);
                        self._setState(css);
                    };
                    if (!!this.isHasStateField) {
                        this._item.addOnPropertyChange(this._grid.options.rowStateField, function (s, a) {
                            fn_state();
                        }, this._objId);
                        fn_state();
                    }
                }
                Row.prototype.handleError = function (error, source) {
                    var isHandled = _super.prototype.handleError.call(this, error, source);
                    if (!isHandled) {
                        return this.grid.handleError(error, source);
                    }
                    return isHandled;
                };
                Row.prototype._createCells = function () {
                    var self = this, i = 0;
                    self._cells = new Array(this.columns.length);
                    this.columns.forEach(function (col) {
                        self._cells[i] = self._createCell(col, i);
                        i += 1;
                    });
                };
                Row.prototype._createCell = function (col, num) {
                    var self = this, td = global.document.createElement('td'), cell;
                    if (col instanceof ExpanderColumn) {
                        this._expanderCell = new ExpanderCell({ row: self, td: td, column: col, num: num });
                        cell = this._expanderCell;
                    }
                    else if (col instanceof ActionsColumn) {
                        this._actionsCell = new ActionsCell({ row: self, td: td, column: col, num: num });
                        cell = this._actionsCell;
                    }
                    else if (col instanceof RowSelectorColumn) {
                        this._rowSelectorCell = new RowSelectorCell({ row: self, td: td, column: col, num: num });
                        cell = this._rowSelectorCell;
                    }
                    else
                        cell = new DataCell({ row: self, td: td, column: col, num: num });
                    return cell;
                };
                Row.prototype._setState = function (css) {
                    for (var i = 0, len = this._cells.length; i < len; i++) {
                        var cell = this._cells[i];
                        if (cell instanceof DataCell) {
                            cell._setState(css);
                        }
                    }
                };
                Row.prototype._onBeginEdit = function () {
                    var self = this;
                    self._cells.forEach(function (cell) {
                        if (cell instanceof DataCell) {
                            cell._beginEdit();
                        }
                    });
                    if (!!this._actionsCell)
                        this._actionsCell.update();
                };
                Row.prototype._onEndEdit = function (isCanceled) {
                    var self = this;
                    self._cells.forEach(function (cell) {
                        if (cell instanceof DataCell) {
                            cell._endEdit(isCanceled);
                        }
                    });
                    if (!!this._actionsCell)
                        this._actionsCell.update();
                };
                Row.prototype.beginEdit = function () {
                    return this._item._aspect.beginEdit();
                };
                Row.prototype.endEdit = function () {
                    return this._item._aspect.endEdit();
                };
                Row.prototype.cancelEdit = function () {
                    return this._item._aspect.cancelEdit();
                };
                Row.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    var grid = this._grid;
                    if (!!grid) {
                        if (this.isExpanded)
                            grid.collapseDetails();
                        this._cells.forEach(function (cell) {
                            cell.destroy();
                        });
                        this._cells = null;
                        if (!grid._getInternal().getIsClearing()) {
                            grid._getInternal().removeRow(this);
                            if (!!this._el) {
                                global.$(this._el).remove();
                            }
                        }
                    }
                    if (!!this._item)
                        this._item.removeNSHandlers(this._objId);
                    this._item = null;
                    this._expanderCell = null;
                    this._el = null;
                    this._grid = null;
                    _super.prototype.destroy.call(this);
                };
                Row.prototype.deleteRow = function () {
                    this._item._aspect.deleteItem();
                };
                Row.prototype.updateErrorState = function () {
                    var hasErrors = this._item._aspect.getIsHasErrors();
                    var $el = global.$(this._el);
                    if (hasErrors) {
                        $el.addClass(datagrid.css.rowError);
                    }
                    else
                        $el.removeClass(datagrid.css.rowError);
                };
                Row.prototype.scrollIntoView = function (isUp) {
                    if (!!this._cells && this._cells.length > 0) {
                        this._cells[0].scrollIntoView(isUp);
                    }
                };
                Row.prototype.toString = function () {
                    return 'Row';
                };
                Object.defineProperty(Row.prototype, "el", {
                    get: function () { return this._el; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Row.prototype, "grid", {
                    get: function () { return this._grid; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Row.prototype, "item", {
                    get: function () { return this._item; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Row.prototype, "cells", {
                    get: function () { return this._cells; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Row.prototype, "columns", {
                    get: function () { return this._grid.columns; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Row.prototype, "uniqueID", {
                    get: function () { return this._objId; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Row.prototype, "itemKey", {
                    get: function () {
                        if (!this._item)
                            return null;
                        return this._item._key;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Row.prototype, "isCurrent", {
                    get: function () { return this._isCurrent; },
                    set: function (v) {
                        var curr = this._isCurrent;
                        if (v !== curr) {
                            var $el = global.$(this._el);
                            this._isCurrent = v;
                            if (v) {
                                $el.addClass(datagrid.css.rowHighlight);
                            }
                            else {
                                $el.removeClass(datagrid.css.rowHighlight);
                            }
                            this.raisePropertyChanged(PROP_NAME.isCurrent);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Row.prototype, "isSelected", {
                    get: function () { return this._isSelected; },
                    set: function (v) {
                        if (this._isSelected != v) {
                            this._isSelected = v;
                            this.raisePropertyChanged(PROP_NAME.isSelected);
                            this.grid._getInternal().onRowSelectionChanged(this);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Row.prototype, "isExpanded", {
                    get: function () { return this.grid._getInternal().isRowExpanded(this); },
                    set: function (v) {
                        if (v !== this.isExpanded) {
                            if (!v && this.isExpanded) {
                                this.grid._getInternal().expandDetails(this, false);
                            }
                            else if (v) {
                                this.grid._getInternal().expandDetails(this, true);
                            }
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Row.prototype, "expanderCell", {
                    get: function () { return this._expanderCell; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Row.prototype, "actionsCell", {
                    get: function () { return this._actionsCell; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Row.prototype, "isDeleted", {
                    get: function () {
                        if (!this._el)
                            return true;
                        return this._isDeleted;
                    },
                    set: function (v) {
                        if (!this._el)
                            return;
                        if (this._isDeleted !== v) {
                            this._isDeleted = v;
                            if (this._isDeleted) {
                                this.isExpanded = false;
                                global.$(this._el).addClass(datagrid.css.rowDeleted);
                            }
                            else
                                global.$(this._el).removeClass(datagrid.css.rowDeleted);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Row.prototype, "isEditing", {
                    get: function () { return !!this._item && this._item._aspect.isEditing; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Row.prototype, "isHasStateField", {
                    get: function () { return !!this._grid.options.rowStateField; },
                    enumerable: true,
                    configurable: true
                });
                return Row;
            })(RIAPP.BaseObject);
            datagrid.Row = Row;
            var DefaultAnimation = (function (_super) {
                __extends(DefaultAnimation, _super);
                function DefaultAnimation() {
                    _super.call(this);
                    this._$el = null;
                }
                DefaultAnimation.prototype.beforeShow = function (el) {
                    this.stop();
                    this._$el = global.$(el);
                    this._$el.hide();
                };
                DefaultAnimation.prototype.show = function (onEnd) {
                    this._$el.slideDown('fast', onEnd);
                };
                DefaultAnimation.prototype.beforeHide = function (el) {
                    this.stop();
                    this._$el = global.$(el);
                };
                DefaultAnimation.prototype.hide = function (onEnd) {
                    this._$el.slideUp('fast', onEnd);
                };
                DefaultAnimation.prototype.stop = function () {
                    if (!!this._$el) {
                        this._$el.finish();
                        this._$el = null;
                    }
                };
                DefaultAnimation.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    try {
                        this.stop();
                    }
                    finally {
                        _super.prototype.destroy.call(this);
                    }
                };
                return DefaultAnimation;
            })(RIAPP.BaseObject);
            var DetailsRow = (function (_super) {
                __extends(DetailsRow, _super);
                function DetailsRow(options) {
                    _super.call(this);
                    var self = this;
                    this._grid = options.grid;
                    this._el = options.tr;
                    this._item = null;
                    this._cell = null;
                    this._parentRow = null;
                    this._isFirstShow = true;
                    this._objId = 'drow' + RIAPP.baseUtils.getNewID();
                    this._createCell(options.details_id);
                    this._$el = global.$(this._el);
                    this._$el.addClass(datagrid.css.rowDetails);
                    this._grid.addOnRowExpanded(function (sender, args) {
                        if (!args.isExpanded && !!args.collapsedRow)
                            self._setParentRow(null);
                    }, this._objId, this);
                }
                DetailsRow.prototype._createCell = function (details_id) {
                    var td = global.document.createElement('td');
                    this._cell = new DetailsCell({ row: this, td: td, details_id: details_id });
                };
                DetailsRow.prototype._setParentRow = function (row) {
                    var self = this;
                    this._item = null;
                    this._cell.item = null;
                    utils.removeNode(this._el);
                    if (!row || row.getIsDestroyCalled()) {
                        this._parentRow = null;
                        return;
                    }
                    this._parentRow = row;
                    this._item = row.item;
                    this._cell.item = this._item;
                    if (this._isFirstShow)
                        this._initShow();
                    utils.insertAfter(row.el, this._el);
                    this._show(function () {
                        var row = self._parentRow;
                        if (!row || row.getIsDestroyCalled())
                            return;
                        if (self.grid.options.isUseScrollIntoDetails)
                            row.scrollIntoView(true);
                    });
                };
                DetailsRow.prototype._initShow = function () {
                    var animation = this._grid.animation;
                    animation.beforeShow(this._cell.template.el);
                };
                DetailsRow.prototype._show = function (onEnd) {
                    var animation = this._grid.animation;
                    this._isFirstShow = false;
                    animation.beforeShow(this._cell.template.el);
                    animation.show(onEnd);
                };
                DetailsRow.prototype._hide = function (onEnd) {
                    var animation = this._grid.animation;
                    animation.beforeHide(this._cell.template.el);
                    animation.hide(onEnd);
                };
                DetailsRow.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this._grid.removeNSHandlers(this._objId);
                    if (!!this._cell) {
                        this._cell.destroy();
                        this._cell = null;
                    }
                    this._$el.remove();
                    this._$el = null;
                    this._item = null;
                    this._el = null;
                    this._grid = null;
                    _super.prototype.destroy.call(this);
                };
                DetailsRow.prototype.toString = function () {
                    return 'DetailsRow';
                };
                Object.defineProperty(DetailsRow.prototype, "el", {
                    get: function () { return this._el; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DetailsRow.prototype, "$el", {
                    get: function () { return this._$el; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DetailsRow.prototype, "grid", {
                    get: function () { return this._grid; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DetailsRow.prototype, "item", {
                    get: function () { return this._item; },
                    set: function (v) {
                        if (this._item !== v) {
                            this._item = v;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DetailsRow.prototype, "cell", {
                    get: function () { return this._cell; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DetailsRow.prototype, "uniqueID", {
                    get: function () { return this._objId; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DetailsRow.prototype, "itemKey", {
                    get: function () {
                        if (!this._item)
                            return null;
                        return this._item._key;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DetailsRow.prototype, "parentRow", {
                    get: function () { return this._parentRow; },
                    set: function (v) {
                        var self = this;
                        if (v !== this._parentRow) {
                            if (!!self._parentRow) {
                                self._hide(function () {
                                    self._setParentRow(v);
                                });
                            }
                            else {
                                self._setParentRow(v);
                            }
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return DetailsRow;
            })(RIAPP.BaseObject);
            datagrid.DetailsRow = DetailsRow;
            var BaseColumn = (function (_super) {
                __extends(BaseColumn, _super);
                function BaseColumn(grid, options) {
                    _super.call(this);
                    var self = this;
                    this._grid = grid;
                    this._el = options.th;
                    this._options = options.colinfo;
                    this._isSelected = false;
                    this._objId = 'col' + RIAPP.baseUtils.getNewID();
                    var extcolDiv = global.document.createElement('div');
                    this._$extcol = global.$(extcolDiv);
                    this._$extcol.addClass(datagrid.css.column);
                    this._grid._getInternal().appendToHeader(extcolDiv);
                    var div = global.document.createElement('div');
                    this._$div = global.$(div);
                    this._$div.addClass(datagrid.css.cellDiv).click(function (e) {
                        e.stopPropagation();
                        global.currentSelectable = grid;
                        grid._getInternal().setCurrentColumn(self);
                        self._onColumnClicked();
                    });
                    extcolDiv.appendChild(div);
                    this.grid._getInternal().get$El().on('click', ['div[', constsMOD.DATA_ATTR.DATA_EVENT_SCOPE, '="', this.uniqueID, '"]'].join(''), function (e) {
                        e.stopPropagation();
                        var $div = global.$(this), cell = $div.data('cell');
                        if (!!cell) {
                            global.currentSelectable = grid;
                            grid._getInternal().setCurrentColumn(self);
                            cell.click();
                        }
                    });
                    if (!!this._options.width) {
                        this._el.style.width = this._options.width;
                    }
                    this._init();
                    if (!!this._options.colCellCss) {
                        this._$div.addClass(this._options.colCellCss);
                    }
                }
                BaseColumn.prototype._init = function () {
                    if (!!this.title)
                        this._$div.html(this.title);
                    if (!!this._options.tip) {
                        elviewMOD.fn_addToolTip(this._$extcol, this._options.tip, false, 'bottom center');
                    }
                };
                BaseColumn.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this._grid._getInternal().get$El().off('click', ['div[', constsMOD.DATA_ATTR.DATA_EVENT_SCOPE, '="', this.uniqueID, '"]'].join(''));
                    if (!!this._options.tip) {
                        elviewMOD.fn_addToolTip(this._$extcol, null);
                    }
                    this._$extcol.remove();
                    this._$extcol = null;
                    this._$div = null;
                    this._el = null;
                    this._grid = null;
                    this._options = null;
                    _super.prototype.destroy.call(this);
                };
                BaseColumn.prototype.scrollIntoView = function (isUp) {
                    if (!this._$div)
                        return;
                    var div = this._$div.get(0);
                    div.scrollIntoView(!!isUp);
                };
                BaseColumn.prototype._onColumnClicked = function () {
                };
                BaseColumn.prototype.toString = function () {
                    return 'BaseColumn';
                };
                Object.defineProperty(BaseColumn.prototype, "uniqueID", {
                    get: function () { return this._objId; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseColumn.prototype, "el", {
                    get: function () { return this._el; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseColumn.prototype, "$div", {
                    get: function () { return this._$div; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseColumn.prototype, "$extcol", {
                    get: function () { return this._$extcol; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseColumn.prototype, "grid", {
                    get: function () { return this._grid; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseColumn.prototype, "options", {
                    get: function () { return this._options; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseColumn.prototype, "title", {
                    get: function () { return this._options.title; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseColumn.prototype, "isSelected", {
                    get: function () { return this._isSelected; },
                    set: function (v) {
                        if (this._isSelected !== v) {
                            this._isSelected = v;
                            if (this._isSelected) {
                                this._$div.addClass(datagrid.css.columnSelected);
                            }
                            else
                                this._$div.removeClass(datagrid.css.columnSelected);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return BaseColumn;
            })(RIAPP.BaseObject);
            datagrid.BaseColumn = BaseColumn;
            var DataColumn = (function (_super) {
                __extends(DataColumn, _super);
                function DataColumn(grid, options) {
                    _super.call(this, grid, options);
                    this._objCache = {};
                    this.$div.addClass(datagrid.css.dataColumn);
                }
                DataColumn.prototype._init = function () {
                    _super.prototype._init.call(this);
                    this._sortOrder = null;
                    if (this.isSortable) {
                        this.$div.addClass(datagrid.css.colSortable);
                    }
                };
                DataColumn.prototype._onColumnClicked = function () {
                    if (this.isSortable && !!this.sortMemberName) {
                        var sortOrd = this._sortOrder;
                        this.grid._getInternal().resetColumnsSort();
                        if (sortOrd == 0) {
                            this.sortOrder = 1;
                        }
                        else if (sortOrd == 1) {
                            this.sortOrder = 0;
                        }
                        else
                            this.sortOrder = 0;
                        this.grid.sortByColumn(this);
                    }
                };
                DataColumn.prototype._cacheObject = function (key, obj) {
                    this._objCache[key] = obj;
                };
                DataColumn.prototype._getCachedObject = function (key) {
                    return this._objCache[key];
                };
                DataColumn.prototype._getInitContentFn = function () {
                    var self = this;
                    return function (content) {
                        content.addOnObjectCreated(function (sender, args) {
                            self._cacheObject(args.objectKey, args.object);
                            args.isCachedExternally = !!self._getCachedObject(args.objectKey);
                        });
                        content.addOnObjectNeeded(function (sender, args) {
                            args.object = self._getCachedObject(args.objectKey);
                        });
                    };
                };
                DataColumn.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    var self = this;
                    utils.forEachProp(self._objCache, function (key) {
                        self._objCache[key].destroy();
                    });
                    self._objCache = null;
                    _super.prototype.destroy.call(this);
                };
                DataColumn.prototype.toString = function () {
                    return 'DataColumn';
                };
                Object.defineProperty(DataColumn.prototype, "isSortable", {
                    get: function () { return !!(this.options.sortable); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataColumn.prototype, "sortMemberName", {
                    get: function () { return this.options.sortMemberName; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataColumn.prototype, "sortOrder", {
                    get: function () { return this._sortOrder; },
                    set: function (v) {
                        this.$div.removeClass([datagrid.css.colSortable, datagrid.css.colSortAsc, datagrid.css.colSortDesc].join(' '));
                        switch (v) {
                            case 0:
                                this.$div.addClass(datagrid.css.colSortAsc);
                                break;
                            case 1:
                                this.$div.addClass(datagrid.css.colSortDesc);
                                break;
                            default:
                                if (this.isSortable)
                                    this.$div.addClass(datagrid.css.colSortable);
                        }
                        this._sortOrder = v;
                        this.raisePropertyChanged(PROP_NAME.sortOrder);
                    },
                    enumerable: true,
                    configurable: true
                });
                return DataColumn;
            })(BaseColumn);
            datagrid.DataColumn = DataColumn;
            var ExpanderColumn = (function (_super) {
                __extends(ExpanderColumn, _super);
                function ExpanderColumn() {
                    _super.apply(this, arguments);
                }
                ExpanderColumn.prototype._init = function () {
                    _super.prototype._init.call(this);
                    this.$div.addClass(datagrid.css.rowExpander);
                };
                ExpanderColumn.prototype.toString = function () {
                    return 'ExpanderColumn';
                };
                return ExpanderColumn;
            })(BaseColumn);
            datagrid.ExpanderColumn = ExpanderColumn;
            var RowSelectorColumn = (function (_super) {
                __extends(RowSelectorColumn, _super);
                function RowSelectorColumn() {
                    _super.apply(this, arguments);
                }
                RowSelectorColumn.prototype._init = function () {
                    _super.prototype._init.call(this);
                    var self = this;
                    this._val = false;
                    this.$div.addClass(datagrid.css.rowSelector);
                    var $chk = global.$('<input type="checkbox"/>');
                    this.$div.append($chk);
                    this._$chk = $chk;
                    $chk.click(function (e) {
                        e.stopPropagation();
                        self._onCheckBoxClicked(this.checked);
                    });
                    $chk.on('change', function (e) {
                        e.stopPropagation();
                        self.checked = this.checked;
                    });
                };
                RowSelectorColumn.prototype._onCheckBoxClicked = function (isChecked) {
                    this.grid.selectRows(isChecked);
                };
                RowSelectorColumn.prototype.toString = function () {
                    return 'RowSelectorColumn';
                };
                Object.defineProperty(RowSelectorColumn.prototype, "checked", {
                    get: function () { return this._val; },
                    set: function (v) {
                        var $el = this._$chk;
                        if (v !== null)
                            v = !!v;
                        if (v !== this._val) {
                            this._val = v;
                            if (!!$el)
                                $el.prop('checked', !!this._val);
                            this.raisePropertyChanged(PROP_NAME.checked);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                RowSelectorColumn.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this._$chk.off();
                    this._$chk.remove();
                    this._$chk = null;
                    _super.prototype.destroy.call(this);
                };
                return RowSelectorColumn;
            })(BaseColumn);
            datagrid.RowSelectorColumn = RowSelectorColumn;
            var ActionsColumn = (function (_super) {
                __extends(ActionsColumn, _super);
                function ActionsColumn() {
                    _super.apply(this, arguments);
                }
                ActionsColumn.prototype._init = function () {
                    _super.prototype._init.call(this);
                    var self = this, opts = this.options;
                    this.$div.addClass(datagrid.css.rowActions);
                    opts.img_ok = global.getImagePath(opts.img_ok || 'ok.png');
                    opts.img_cancel = global.getImagePath(opts.img_cancel || 'cancel.png');
                    opts.img_edit = global.getImagePath(opts.img_edit || 'edit.png');
                    opts.img_delete = global.getImagePath(opts.img_delete || 'delete.png');
                    this.grid._getInternal().get$El().on("click", 'img[' + constsMOD.DATA_ATTR.DATA_EVENT_SCOPE + '="' + this.uniqueID + '"]', function (e) {
                        e.stopPropagation();
                        var $img = global.$(this), name = this.name, cell = $img.data('cell');
                        self.grid.currentRow = cell.row;
                        switch (name) {
                            case 'img_ok':
                                self._onOk(cell);
                                break;
                            case 'img_cancel':
                                self._onCancel(cell);
                                break;
                            case 'img_edit':
                                self._onEdit(cell);
                                break;
                            case 'img_delete':
                                self._onDelete(cell);
                                break;
                        }
                    });
                    this.grid.addOnRowAction(function (sender, args) {
                        switch (args.action) {
                            case 0:
                                self._onOk(args.row.actionsCell);
                                break;
                            case 1:
                                self._onEdit(args.row.actionsCell);
                                break;
                            case 2:
                                self._onCancel(args.row.actionsCell);
                                break;
                            case 3:
                                self._onDelete(args.row.actionsCell);
                                break;
                        }
                    }, this.uniqueID);
                };
                ActionsColumn.prototype._onOk = function (cell) {
                    if (!cell.row)
                        return;
                    cell.row.endEdit();
                    cell.update();
                };
                ActionsColumn.prototype._onCancel = function (cell) {
                    if (!cell.row)
                        return;
                    cell.row.cancelEdit();
                    cell.update();
                };
                ActionsColumn.prototype._onDelete = function (cell) {
                    if (!cell.row)
                        return;
                    cell.row.deleteRow();
                };
                ActionsColumn.prototype._onEdit = function (cell) {
                    if (!cell.row)
                        return;
                    cell.row.beginEdit();
                    cell.update();
                    this.grid.showEditDialog();
                };
                ActionsColumn.prototype.toString = function () {
                    return 'ActionsColumn';
                };
                ActionsColumn.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this.grid._getInternal().get$El().off("click", 'img[' + constsMOD.DATA_ATTR.DATA_EVENT_SCOPE + '="' + this.uniqueID + '"]');
                    this.grid.removeNSHandlers(this.uniqueID);
                    _super.prototype.destroy.call(this);
                };
                return ActionsColumn;
            })(BaseColumn);
            datagrid.ActionsColumn = ActionsColumn;
            var GRID_EVENTS = {
                row_expanded: 'row_expanded',
                row_selected: 'row_selected',
                page_changed: 'page_changed',
                row_state_changed: 'row_state_changed',
                cell_dblclicked: 'cell_dblclicked',
                row_action: 'row_action'
            };
            var DataGrid = (function (_super) {
                __extends(DataGrid, _super);
                function DataGrid(options) {
                    _super.call(this);
                    var self = this;
                    options = utils.mergeObj(options, {
                        app: null,
                        el: null,
                        dataSource: null,
                        animation: null,
                        isUseScrollInto: true,
                        isUseScrollIntoDetails: true,
                        containerCss: null,
                        wrapCss: null,
                        headerCss: null,
                        rowStateField: null,
                        isCanEdit: null,
                        isCanDelete: null,
                        isHandleAddNew: false
                    });
                    if (!!options.dataSource && !(options.dataSource instanceof collMOD.BaseCollection))
                        throw new Error(RIAPP.ERRS.ERR_GRID_DATASRC_INVALID);
                    this._options = options;
                    this._columnWidthChecker = function () { };
                    var $t = global.$(this._options.el);
                    this._el = this._options.el;
                    this._$el = $t;
                    $t.addClass(datagrid.css.dataTable);
                    this._name = $t.attr(constsMOD.DATA_ATTR.DATA_NAME);
                    this._objId = 'grd' + RIAPP.baseUtils.getNewID();
                    this._rowMap = {};
                    this._rows = [];
                    this._columns = [];
                    this._isClearing = false;
                    this._isDSFilling = false;
                    this._currentRow = null;
                    this._expandedRow = null;
                    this._details = null;
                    this._expanderCol = null;
                    this._actionsCol = null;
                    this._rowSelectorCol = null;
                    this._currentColumn = null;
                    this._editingRow = null;
                    this._isSorting = false;
                    this._dialog = null;
                    this._$headerDiv = null;
                    this._$wrapDiv = null;
                    this._contaner = null;
                    this._wrapTable();
                    this._selectable = {
                        getContainerEl: function () {
                            return self._getContainerEl();
                        },
                        getUniqueID: function () {
                            return self.uniqueID;
                        },
                        onKeyDown: function (key, event) {
                            self._onKeyDown(key, event);
                        },
                        onKeyUp: function (key, event) {
                            self._onKeyUp(key, event);
                        }
                    };
                    this._internal = {
                        isRowExpanded: function (row) {
                            return self._isRowExpanded(row);
                        },
                        appendToHeader: function (el) {
                            self._appendToHeader(el);
                        },
                        setCurrentColumn: function (column) {
                            self._setCurrentColumn(column);
                        },
                        onRowStateChanged: function (row, val) {
                            return self._onRowStateChanged(row, val);
                        },
                        onCellDblClicked: function (cell) {
                            self._onCellDblClicked(cell);
                        },
                        onRowSelectionChanged: function (row) {
                            self._onRowSelectionChanged(row);
                        },
                        resetColumnsSort: function () {
                            self._resetColumnsSort();
                        },
                        getLastRow: function () {
                            return self._getLastRow();
                        },
                        removeRow: function (row) {
                            self._removeRow(row);
                        },
                        expandDetails: function (parentRow, expanded) {
                            self._expandDetails(parentRow, expanded);
                        },
                        getIsClearing: function () {
                            return self._getIsClearing();
                        },
                        get$El: function () {
                            return self._get$El();
                        }
                    };
                    this._createColumns();
                    this._bindDS();
                    global._getInternal().trackSelectable(this);
                    _gridCreated(this);
                }
                DataGrid.prototype._getEventNames = function () {
                    var base_events = _super.prototype._getEventNames.call(this);
                    var events = Object.keys(GRID_EVENTS).map(function (key, i, arr) { return GRID_EVENTS[key]; });
                    return events.concat(base_events);
                };
                DataGrid.prototype.addOnRowExpanded = function (fn, nmspace, context) {
                    this._addHandler(GRID_EVENTS.row_expanded, fn, nmspace, context);
                };
                DataGrid.prototype.removeOnRowExpanded = function (nmspace) {
                    this._removeHandler(GRID_EVENTS.row_expanded, nmspace);
                };
                DataGrid.prototype.addOnRowSelected = function (fn, nmspace, context) {
                    this._addHandler(GRID_EVENTS.row_selected, fn, nmspace, context);
                };
                DataGrid.prototype.removeOnRowSelected = function (nmspace) {
                    this._removeHandler(GRID_EVENTS.row_selected, nmspace);
                };
                DataGrid.prototype.addOnPageChanged = function (fn, nmspace, context) {
                    this._addHandler(GRID_EVENTS.page_changed, fn, nmspace, context);
                };
                DataGrid.prototype.removeOnPageChanged = function (nmspace) {
                    this._removeHandler(GRID_EVENTS.page_changed, nmspace);
                };
                DataGrid.prototype.addOnRowStateChanged = function (fn, nmspace, context) {
                    this._addHandler(GRID_EVENTS.row_state_changed, fn, nmspace, context);
                };
                DataGrid.prototype.removeOnRowStateChanged = function (nmspace) {
                    this._removeHandler(GRID_EVENTS.row_state_changed, nmspace);
                };
                DataGrid.prototype.addOnCellDblClicked = function (fn, nmspace, context) {
                    this._addHandler(GRID_EVENTS.cell_dblclicked, fn, nmspace, context);
                };
                DataGrid.prototype.removeOnCellDblClicked = function (nmspace) {
                    this._removeHandler(GRID_EVENTS.cell_dblclicked, nmspace);
                };
                DataGrid.prototype.addOnRowAction = function (fn, nmspace, context) {
                    this._addHandler(GRID_EVENTS.row_action, fn, nmspace, context);
                };
                DataGrid.prototype.removeOnRowAction = function (nmspace) {
                    this._removeHandler(GRID_EVENTS.row_action, nmspace);
                };
                DataGrid.prototype._getContainerEl = function () {
                    return this._contaner;
                };
                DataGrid.prototype._onKeyDown = function (key, event) {
                    var ds = this.dataSource, self = this;
                    if (!ds)
                        return;
                    switch (key) {
                        case 38:
                            event.preventDefault();
                            if (ds.movePrev(true)) {
                                if (self.isUseScrollInto) {
                                    self._scrollToCurrent(false);
                                }
                            }
                            break;
                        case 40:
                            event.preventDefault();
                            if (ds.moveNext(true)) {
                                if (self.isUseScrollInto) {
                                    self._scrollToCurrent(false);
                                }
                            }
                            break;
                        case 34:
                            if (ds.pageIndex > 0)
                                ds.pageIndex = ds.pageIndex - 1;
                            break;
                        case 33:
                            ds.pageIndex = ds.pageIndex + 1;
                            break;
                        case 13:
                            if (!!this._currentRow && !!this._actionsCol) {
                                if (this._currentRow.isEditing) {
                                    event.preventDefault();
                                }
                                else {
                                    event.preventDefault();
                                }
                            }
                            break;
                        case 27:
                            if (!!this._currentRow && !!this._actionsCol) {
                                if (this._currentRow.isEditing) {
                                    event.preventDefault();
                                }
                            }
                            break;
                        case 32:
                            if (!!this._rowSelectorCol && !!this._currentRow && !this._currentRow.isEditing) {
                                event.preventDefault();
                            }
                            break;
                    }
                };
                DataGrid.prototype._onKeyUp = function (key, event) {
                    var ds = this.dataSource;
                    if (!ds)
                        return;
                    switch (key) {
                        case 13:
                            if (!!this._currentRow && !!this._actionsCol) {
                                if (this._currentRow.isEditing) {
                                    this.raiseEvent(GRID_EVENTS.row_action, { row: this._currentRow, action: 0 });
                                    event.preventDefault();
                                }
                                else {
                                    this.raiseEvent(GRID_EVENTS.row_action, { row: this._currentRow, action: 1 });
                                    event.preventDefault();
                                }
                            }
                            break;
                        case 27:
                            if (!!this._currentRow && !!this._actionsCol) {
                                if (this._currentRow.isEditing) {
                                    this.raiseEvent(GRID_EVENTS.row_action, { row: this._currentRow, action: 2 });
                                    event.preventDefault();
                                }
                            }
                            break;
                        case 32:
                            if (!!this._rowSelectorCol && !!this._currentRow && !this._currentRow.isEditing) {
                                event.preventDefault();
                                this._currentRow.isSelected = !this._currentRow.isSelected;
                            }
                            break;
                    }
                };
                DataGrid.prototype._isRowExpanded = function (row) {
                    return this._expandedRow === row;
                };
                DataGrid.prototype._appendToHeader = function (el) {
                    this._$headerDiv.append(el);
                };
                DataGrid.prototype._setCurrentColumn = function (column) {
                    if (!!this._currentColumn)
                        this._currentColumn.isSelected = false;
                    this._currentColumn = column;
                    if (!!this._currentColumn)
                        this._currentColumn.isSelected = true;
                };
                DataGrid.prototype._onRowStateChanged = function (row, val) {
                    var args = { row: row, val: val, css: null };
                    this.raiseEvent(GRID_EVENTS.row_state_changed, args);
                    return args.css;
                };
                DataGrid.prototype._onCellDblClicked = function (cell) {
                    var args = { cell: cell };
                    this.raiseEvent(GRID_EVENTS.cell_dblclicked, args);
                };
                DataGrid.prototype._onRowSelectionChanged = function (row) {
                    this.raiseEvent(GRID_EVENTS.row_selected, { row: row });
                };
                DataGrid.prototype._resetColumnsSort = function () {
                    this.columns.forEach(function (col) {
                        if (col instanceof DataColumn) {
                            col.sortOrder = null;
                        }
                    });
                };
                DataGrid.prototype._getLastRow = function () {
                    if (this._rows.length === 0)
                        return null;
                    var i = this._rows.length - 1, row = this._rows[i];
                    while (row.isDeleted && i > 0) {
                        i -= 1;
                        row = this._rows[i];
                    }
                    if (row.isDeleted)
                        return null;
                    else
                        return row;
                };
                DataGrid.prototype._removeRow = function (row) {
                    if (this._expandedRow === row) {
                        this.collapseDetails();
                    }
                    if (this._rows.length === 0)
                        return;
                    var rowkey = row.itemKey, i = utils.removeFromArray(this._rows, row), oldRow;
                    try {
                        if (i > -1) {
                            oldRow = row;
                            if (!oldRow.getIsDestroyCalled())
                                oldRow.destroy();
                        }
                    }
                    finally {
                        if (!!this._rowMap[rowkey])
                            delete this._rowMap[rowkey];
                    }
                };
                DataGrid.prototype._expandDetails = function (parentRow, expanded) {
                    if (!this._options.details)
                        return;
                    if (!this._details) {
                        this._details = this._createDetails();
                    }
                    var old = this._expandedRow;
                    if (old === parentRow) {
                        if (!!old && expanded)
                            return;
                    }
                    this._expandedRow = null;
                    this._details.parentRow = null;
                    if (expanded) {
                        this._expandedRow = parentRow;
                        this._details.parentRow = parentRow;
                        this._expandedRow.expanderCell.toggleImage();
                    }
                    else {
                        this._expandedRow = null;
                        this._details.parentRow = null;
                        if (!!old) {
                            old.expanderCell.toggleImage();
                        }
                    }
                    if (old !== parentRow) {
                        if (!!old)
                            old.expanderCell.toggleImage();
                    }
                    this.raiseEvent(GRID_EVENTS.row_expanded, { collapsedRow: old, expandedRow: parentRow, isExpanded: expanded });
                };
                DataGrid.prototype._getIsClearing = function () {
                    return this._isClearing;
                };
                DataGrid.prototype._get$El = function () {
                    return this._$el;
                };
                DataGrid.prototype._parseColumnAttr = function (column_attr, content_attr) {
                    var defaultOp = {
                        "type": COLUMN_TYPE.DATA,
                        title: null,
                        sortable: false,
                        sortMemberName: null,
                        content: null
                    }, options;
                    var temp_opts = global.parser.parseOptions(column_attr);
                    if (temp_opts.length > 0)
                        options = utils.extend(false, defaultOp, temp_opts[0]);
                    else
                        options = defaultOp;
                    if (!!content_attr) {
                        options.content = contentMOD.parseContentAttr(content_attr);
                        if (!options.sortMemberName && !!options.content.fieldName)
                            options.sortMemberName = options.content.fieldName;
                    }
                    return options;
                };
                DataGrid.prototype._findUndeleted = function (row, isUp) {
                    if (!row)
                        return null;
                    if (!row.isDeleted)
                        return row;
                    var delIndex = this.rows.indexOf(row), i = delIndex, len = this.rows.length;
                    if (!isUp) {
                        i -= 1;
                        if (i >= 0)
                            row = this.rows[i];
                        while (i >= 0 && row.isDeleted) {
                            i -= 1;
                            if (i >= 0)
                                row = this.rows[i];
                        }
                        if (row.isDeleted)
                            row = null;
                    }
                    else {
                        i += 1;
                        if (i < len)
                            row = this.rows[i];
                        while (i < len && row.isDeleted) {
                            i += 1;
                            if (i < len)
                                row = this.rows[i];
                        }
                        if (row.isDeleted)
                            row = null;
                    }
                    return row;
                };
                DataGrid.prototype._updateCurrent = function (row, withScroll) {
                    this.currentRow = row;
                    if (withScroll && !!row && !row.isDeleted)
                        this._scrollToCurrent(true);
                };
                DataGrid.prototype._scrollToCurrent = function (isUp) {
                    var row = this.currentRow;
                    if (!!row) {
                        row.scrollIntoView(isUp);
                    }
                };
                DataGrid.prototype.handleError = function (error, source) {
                    var isHandled = _super.prototype.handleError.call(this, error, source);
                    if (!isHandled) {
                        return global.handleError(error, source);
                    }
                    return isHandled;
                };
                DataGrid.prototype._onDSCurrentChanged = function (sender, args) {
                    var ds = this.dataSource, cur;
                    if (!!ds)
                        cur = ds.currentItem;
                    if (!cur)
                        this._updateCurrent(null, false);
                    else {
                        this._updateCurrent(this._rowMap[cur._key], false);
                    }
                };
                DataGrid.prototype._onDSCollectionChanged = function (sender, args) {
                    var self = this, row, items = args.items;
                    switch (args.changeType) {
                        case 2:
                            if (!this._isDSFilling)
                                this._refreshGrid();
                            break;
                        case 1:
                            if (!this._isDSFilling)
                                self._appendItems(args.items);
                            break;
                        case 0:
                            items.forEach(function (item) {
                                var row = self._rowMap[item._key];
                                if (!!row) {
                                    self._removeRow(row);
                                }
                            });
                            break;
                        case 3:
                            {
                                row = self._rowMap[args.old_key];
                                if (!!row) {
                                    delete self._rowMap[args.old_key];
                                    self._rowMap[args.new_key] = row;
                                }
                            }
                            break;
                        default:
                            throw new Error(utils.format(RIAPP.ERRS.ERR_COLLECTION_CHANGETYPE_INVALID, args.changeType));
                    }
                };
                DataGrid.prototype._onDSFill = function (sender, args) {
                    var isEnd = !args.isBegin, self = this;
                    if (isEnd) {
                        self._isDSFilling = false;
                        if (args.resetUI)
                            self._refreshGrid();
                        else
                            self._appendItems(args.newItems);
                        if (!!args.isPageChanged) {
                            setTimeout(function () {
                                if (self._isDestroyCalled)
                                    return;
                                self._onPageChanged();
                            }, 0);
                        }
                        setTimeout(function () {
                            if (self._isDestroyCalled)
                                return;
                            self._updateColsDim();
                        }, 0);
                    }
                    else {
                        self._isDSFilling = true;
                        if (!self._isSorting) {
                            if (!args.isPageChanged)
                                self._resetColumnsSort();
                        }
                    }
                };
                DataGrid.prototype._onPageChanged = function () {
                    if (!!this._rowSelectorCol) {
                        this._rowSelectorCol.checked = false;
                    }
                    this._scrollToCurrent(false);
                    this.raiseEvent(GRID_EVENTS.page_changed, {});
                };
                DataGrid.prototype._onItemEdit = function (item, isBegin, isCanceled) {
                    var row = this._rowMap[item._key];
                    if (!row)
                        return;
                    if (isBegin) {
                        row._onBeginEdit();
                        this._editingRow = row;
                    }
                    else {
                        row._onEndEdit(isCanceled);
                        this._editingRow = null;
                    }
                    this.raisePropertyChanged(PROP_NAME.editingRow);
                };
                DataGrid.prototype._onItemAdded = function (sender, args) {
                    var item = args.item, row = this._rowMap[item._key];
                    if (!row)
                        return;
                    this._updateCurrent(row, true);
                    if (this._options.isHandleAddNew && !args.isAddNewHandled) {
                        args.isAddNewHandled = this.showEditDialog();
                    }
                };
                DataGrid.prototype._onItemStatusChanged = function (item, oldStatus) {
                    var newStatus = item._aspect.status, ds = this.dataSource;
                    var row = this._rowMap[item._key];
                    if (!row)
                        return;
                    if (newStatus === 3) {
                        row.isDeleted = true;
                        var row2 = this._findUndeleted(row, true);
                        if (!row2) {
                            row2 = this._findUndeleted(row, false);
                        }
                        if (!!row2) {
                            ds.currentItem = row2.item;
                        }
                    }
                    else if (oldStatus === 3 && newStatus !== 3) {
                        row.isDeleted = false;
                    }
                };
                DataGrid.prototype._onDSErrorsChanged = function (sender, args) {
                    var row = this._rowMap[args.item._key];
                    if (!row)
                        return;
                    row.updateErrorState();
                };
                DataGrid.prototype._bindDS = function () {
                    var self = this, ds = this.dataSource;
                    if (!ds)
                        return;
                    ds.addOnCollChanged(self._onDSCollectionChanged, self._objId, self);
                    ds.addOnFill(self._onDSFill, self._objId, self);
                    ds.addOnCurrentChanged(self._onDSCurrentChanged, self._objId, self);
                    ds.addOnBeginEdit(function (sender, args) {
                        self._onItemEdit(args.item, true, false);
                    }, self._objId);
                    ds.addOnEndEdit(function (sender, args) {
                        self._onItemEdit(args.item, false, args.isCanceled);
                    }, self._objId);
                    ds.addOnErrorsChanged(self._onDSErrorsChanged, self._objId, self);
                    ds.addOnStatusChanged(function (sender, args) {
                        self._onItemStatusChanged(args.item, args.oldStatus);
                    }, self._objId);
                    ds.addOnItemAdded(self._onItemAdded, self._objId, self);
                    this._refreshGrid();
                    this._updateColsDim();
                    this._onDSCurrentChanged();
                };
                DataGrid.prototype._unbindDS = function () {
                    var self = this, ds = this.dataSource;
                    if (!ds)
                        return;
                    ds.removeNSHandlers(self._objId);
                };
                DataGrid.prototype._clearGrid = function () {
                    if (this._rows.length === 0)
                        return;
                    this._isClearing = true;
                    try {
                        this.collapseDetails();
                        var self = this, tbody = self._tBodyEl, newTbody = global.document.createElement('tbody');
                        this._el.replaceChild(newTbody, tbody);
                        var rows = this._rows;
                        this._rows = [];
                        this._rowMap = {};
                        rows.forEach(function (row) {
                            row.destroy();
                        });
                    }
                    finally {
                        this._isClearing = false;
                    }
                    this._currentRow = null;
                };
                DataGrid.prototype._updateColsDim = function () {
                    var width = 0, headerDiv = this._$headerDiv;
                    this._columns.forEach(function (col) {
                        width += col.el.offsetWidth;
                    });
                    headerDiv.width(width);
                    this._columns.forEach(function (col) {
                        col.$extcol.width(col.el.offsetWidth);
                    });
                };
                DataGrid.prototype._wrapTable = function () {
                    var $table = this._$el, $headerDiv, $wrapDiv, $container, self = this;
                    $table.wrap(global.$('<div></div>').addClass(datagrid.css.wrapDiv));
                    $wrapDiv = $table.parent();
                    $wrapDiv.wrap(global.$('<div></div>').addClass(datagrid.css.container));
                    $container = $wrapDiv.parent();
                    $headerDiv = global.$('<div></div>').addClass(datagrid.css.headerDiv).insertBefore($wrapDiv);
                    global.$(this._tHeadRow).addClass(datagrid.css.columnInfo);
                    this._$wrapDiv = $wrapDiv;
                    this._$headerDiv = $headerDiv;
                    this._contaner = $container.get(0);
                    if (this._options.containerCss) {
                        $container.addClass(this._options.containerCss);
                    }
                    if (this._options.wrapCss) {
                        $wrapDiv.addClass(this._options.wrapCss);
                    }
                    if (this._options.headerCss) {
                        $headerDiv.addClass(this._options.headerCss);
                    }
                    var tw = $table.width();
                    self._columnWidthChecker = function () {
                        var test = $table.width();
                        if (tw !== test) {
                            tw = test;
                            self._updateColsDim();
                        }
                    };
                };
                DataGrid.prototype._unWrapTable = function () {
                    var $table = this._$el;
                    if (!this._$headerDiv)
                        return;
                    this._columnWidthChecker = function () { };
                    this._$headerDiv.remove();
                    this._$headerDiv = null;
                    $table.unwrap();
                    this._$wrapDiv = null;
                    $table.unwrap();
                    this._contaner = null;
                };
                DataGrid.prototype._createColumns = function () {
                    var self = this, headCells = this._tHeadCells, cnt = headCells.length, cellInfo = [];
                    var th, attr;
                    for (var i = 0; i < cnt; i += 1) {
                        th = headCells[i];
                        attr = this._parseColumnAttr(th.getAttribute(constsMOD.DATA_ATTR.DATA_COLUMN), th.getAttribute(constsMOD.DATA_ATTR.DATA_CONTENT));
                        cellInfo.push({ th: th, colinfo: attr });
                    }
                    cellInfo.forEach(function (inf) {
                        var col = self._createColumn(inf);
                        if (!!col)
                            self._columns.push(col);
                    });
                };
                DataGrid.prototype._createColumn = function (options) {
                    var col;
                    switch (options.colinfo.type) {
                        case COLUMN_TYPE.ROW_EXPANDER:
                            if (!this._expanderCol) {
                                col = new ExpanderColumn(this, options);
                                this._expanderCol = col;
                            }
                            break;
                        case COLUMN_TYPE.ROW_ACTIONS:
                            if (!this._actionsCol) {
                                col = new ActionsColumn(this, options);
                                this._actionsCol = col;
                            }
                            break;
                        case COLUMN_TYPE.ROW_SELECTOR:
                            if (!this._rowSelectorCol) {
                                col = new RowSelectorColumn(this, options);
                                this._rowSelectorCol = col;
                            }
                            break;
                        case COLUMN_TYPE.DATA:
                            col = new DataColumn(this, options);
                            break;
                        default:
                            throw new Error(utils.format(RIAPP.ERRS.ERR_GRID_COLTYPE_INVALID, options.colinfo.type));
                    }
                    return col;
                };
                DataGrid.prototype._appendItems = function (newItems) {
                    if (this._isDestroyCalled)
                        return;
                    var self = this, item, tbody = this._tBodyEl;
                    for (var i = 0, k = newItems.length; i < k; i += 1) {
                        item = newItems[i];
                        if (!self._rowMap[item._key])
                            self._createRowForItem(tbody, item);
                    }
                };
                DataGrid.prototype._refreshGrid = function () {
                    var self = this, ds = this.dataSource;
                    self._clearGrid();
                    if (!ds)
                        return;
                    var docFr = global.document.createDocumentFragment(), oldTbody = this._tBodyEl, newTbody = global.document.createElement('tbody');
                    ds.items.forEach(function (item, pos) {
                        self._createRowForItem(docFr, item, pos);
                    });
                    newTbody.appendChild(docFr);
                    self._el.replaceChild(newTbody, oldTbody);
                };
                DataGrid.prototype._createRowForItem = function (parent, item, pos) {
                    var self = this, tr = global.document.createElement('tr');
                    var gridRow = new Row(self, { tr: tr, item: item });
                    self._rowMap[item._key] = gridRow;
                    self._rows.push(gridRow);
                    parent.appendChild(gridRow.el);
                    return gridRow;
                };
                DataGrid.prototype._createDetails = function () {
                    var details_id = this._options.details.templateID;
                    var tr = global.document.createElement('tr');
                    return new DetailsRow({ grid: this, tr: tr, details_id: details_id });
                };
                DataGrid.prototype._getInternal = function () {
                    return this._internal;
                };
                DataGrid.prototype.getISelectable = function () {
                    return this._selectable;
                };
                DataGrid.prototype.sortByColumn = function (column) {
                    var self = this, ds = this.dataSource;
                    var sorts = column.sortMemberName.split(';');
                    self._isSorting = true;
                    var promise = ds.sort(sorts, column.sortOrder);
                    promise.always(function () {
                        self._isSorting = false;
                    });
                };
                DataGrid.prototype.selectRows = function (isSelect) {
                    this._rows.forEach(function (row) {
                        if (row.isDeleted)
                            return;
                        row.isSelected = isSelect;
                    });
                };
                DataGrid.prototype.findRowByItem = function (item) {
                    var row = this._rowMap[item._key];
                    if (!row)
                        return null;
                    return row;
                };
                DataGrid.prototype.collapseDetails = function () {
                    if (!this._details)
                        return;
                    var old = this._expandedRow;
                    if (!!old) {
                        this._expandedRow = null;
                        this.raiseEvent(GRID_EVENTS.row_expanded, { collapsedRow: old, expandedRow: null, isExpanded: false });
                    }
                };
                DataGrid.prototype.getSelectedRows = function () {
                    var res = [];
                    this._rows.forEach(function (row) {
                        if (row.isDeleted)
                            return;
                        if (row.isSelected) {
                            res.push(row);
                        }
                    });
                    return res;
                };
                DataGrid.prototype.showEditDialog = function () {
                    if (!this._options.editor || !this._options.editor.templateID || !this._editingRow)
                        return false;
                    var dialogOptions, item = this._editingRow.item;
                    if (!item._aspect.isEditing)
                        item._aspect.beginEdit();
                    if (!this._dialog) {
                        dialogOptions = utils.extend(false, {
                            dataContext: item
                        }, this._options.editor);
                        this._dialog = new MOD.datadialog.DataEditDialog(this.app, dialogOptions);
                    }
                    else
                        this._dialog.dataContext = item;
                    this._dialog.canRefresh = !!this.dataSource.permissions.canRefreshRow && !item._aspect.isNew;
                    this._dialog.show();
                    return true;
                };
                DataGrid.prototype.scrollToCurrent = function (isUp) {
                    this._scrollToCurrent(isUp);
                };
                DataGrid.prototype.addNew = function () {
                    var ds = this.dataSource;
                    try {
                        ds.addNew();
                        this.showEditDialog();
                    }
                    catch (ex) {
                        RIAPP.reThrow(ex, this.handleError(ex, this));
                    }
                };
                DataGrid.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    _gridDestroyed(this);
                    global._getInternal().untrackSelectable(this);
                    if (!!this._details) {
                        this._details.destroy();
                        this._details = null;
                    }
                    if (this._options.animation) {
                        this._options.animation.stop();
                        this._options.animation = null;
                    }
                    if (!!this._dialog) {
                        this._dialog.destroy();
                        this._dialog = null;
                    }
                    this.dataSource = null;
                    this._unWrapTable();
                    this._$el.removeClass(datagrid.css.dataTable);
                    global.$(this._tHeadRow).removeClass(datagrid.css.columnInfo);
                    this._el = null;
                    this._$el = null;
                    this._options.app = null;
                    this._options = {};
                    _super.prototype.destroy.call(this);
                };
                Object.defineProperty(DataGrid.prototype, "app", {
                    get: function () { return this._options.app; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "options", {
                    get: function () { return this._options; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "_tBodyEl", {
                    get: function () { return this._el.tBodies[0]; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "_tHeadEl", {
                    get: function () { return this._el.tHead; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "_tFootEl", {
                    get: function () { return this._el.tFoot; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "_tHeadRow", {
                    get: function () {
                        if (!this._tHeadEl)
                            return null;
                        var trs = this._tHeadEl.rows;
                        if (trs.length === 0)
                            return null;
                        return trs[0];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "_tHeadCells", {
                    get: function () {
                        var row = this._tHeadRow;
                        if (!row)
                            return [];
                        return RIAPP.ArrayHelper.fromCollection(row.cells);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "uniqueID", {
                    get: function () { return this._objId; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "name", {
                    get: function () { return this._name; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "dataSource", {
                    get: function () { return this._options.dataSource; },
                    set: function (v) {
                        if (v === this.dataSource)
                            return;
                        if (!!this.dataSource) {
                            this._unbindDS();
                        }
                        this._clearGrid();
                        this._options.dataSource = v;
                        if (!!this.dataSource)
                            this._bindDS();
                        this.raisePropertyChanged(PROP_NAME.dataSource);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "rows", {
                    get: function () { return this._rows; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "columns", {
                    get: function () { return this._columns; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "currentRow", {
                    get: function () { return this._currentRow; },
                    set: function (row) {
                        var ds = this.dataSource, old = this._currentRow, isChanged = false;
                        if (!ds)
                            return;
                        if (old !== row) {
                            this._currentRow = row;
                            if (!!old) {
                                old.isCurrent = false;
                            }
                            if (!!row)
                                row.isCurrent = true;
                            isChanged = true;
                        }
                        if (!!row) {
                            if (row.item !== ds.currentItem)
                                ds.currentItem = row.item;
                        }
                        else
                            ds.currentItem = null;
                        if (isChanged)
                            this.raisePropertyChanged(PROP_NAME.currentRow);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "editingRow", {
                    get: function () { return this._editingRow; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "isCanEdit", {
                    get: function () {
                        if (this._options.isCanEdit !== null)
                            return this._options.isCanEdit;
                        var ds = this.dataSource;
                        return !!ds && ds.permissions.canEditRow;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "isCanDelete", {
                    get: function () {
                        if (this._options.isCanDelete !== null)
                            return this._options.isCanDelete;
                        var ds = this.dataSource;
                        return !!ds && ds.permissions.canDeleteRow;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "isCanAddNew", {
                    get: function () {
                        var ds = this.dataSource;
                        return !!ds && ds.permissions.canAddRow;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "isUseScrollInto", {
                    get: function () { return this._options.isUseScrollInto; },
                    set: function (v) { this._options.isUseScrollInto = v; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataGrid.prototype, "animation", {
                    get: function () {
                        if (!this.options.animation) {
                            this.options.animation = new DefaultAnimation();
                        }
                        return this.options.animation;
                    },
                    enumerable: true,
                    configurable: true
                });
                return DataGrid;
            })(RIAPP.BaseObject);
            datagrid.DataGrid = DataGrid;
            var GridElView = (function (_super) {
                __extends(GridElView, _super);
                function GridElView() {
                    _super.apply(this, arguments);
                }
                GridElView.prototype.toString = function () {
                    return 'GridElView';
                };
                GridElView.prototype._init = function (options) {
                    _super.prototype._init.call(this, options);
                    this._stateProvider = null;
                    this._grid = null;
                    this._options = options;
                    this._createGrid();
                };
                GridElView.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._grid && !this._grid.getIsDestroyCalled()) {
                        this._grid.destroy();
                    }
                    this._grid = null;
                    this._stateProvider = null;
                    _super.prototype.destroy.call(this);
                };
                GridElView.prototype._createGrid = function () {
                    var options = utils.extend(false, {
                        app: this._app,
                        el: this._el,
                        dataSource: null,
                        animation: null
                    }, this._options);
                    this._grid = new DataGrid(options);
                    this._bindGridEvents();
                };
                GridElView.prototype._bindGridEvents = function () {
                    if (!this._grid)
                        return;
                    this._grid.addOnRowStateChanged(function (s, args) {
                        var self = this;
                        if (!!self._stateProvider) {
                            args.css = self._stateProvider.getCSS(args.row.item, args.val);
                        }
                    }, this.uniqueID, this);
                    this._grid.addOnDestroyed(function (s, args) {
                        var self = this;
                        self._grid = null;
                        self.invokePropChanged(PROP_NAME.grid);
                        self.raisePropertyChanged(PROP_NAME.grid);
                    }, this.uniqueID, this);
                };
                Object.defineProperty(GridElView.prototype, "dataSource", {
                    get: function () {
                        if (this._isDestroyCalled)
                            return undefined;
                        return this.grid.dataSource;
                    },
                    set: function (v) {
                        if (this._isDestroyCalled)
                            return;
                        if (this.dataSource !== v) {
                            this.grid.dataSource = v;
                            this.raisePropertyChanged(PROP_NAME.dataSource);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GridElView.prototype, "grid", {
                    get: function () { return this._grid; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GridElView.prototype, "stateProvider", {
                    get: function () { return this._stateProvider; },
                    set: function (v) {
                        if (v !== this._stateProvider) {
                            this._stateProvider = v;
                            this.raisePropertyChanged(PROP_NAME.stateProvider);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GridElView.prototype, "animation", {
                    get: function () {
                        if (this._isDestroyCalled)
                            return undefined;
                        return this._grid.options.animation;
                    },
                    set: function (v) {
                        if (this._isDestroyCalled)
                            return;
                        if (this.animation !== v) {
                            this._grid.options.animation = v;
                            this.raisePropertyChanged(PROP_NAME.animation);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return GridElView;
            })(elviewMOD.BaseElView);
            datagrid.GridElView = GridElView;
            global.registerElView('table', GridElView);
            global.registerElView('datagrid', GridElView);
            datagrid._isModuleLoaded = true;
        })(datagrid = MOD.datagrid || (MOD.datagrid = {}));
    })(MOD = RIAPP.MOD || (RIAPP.MOD = {}));
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    var MOD;
    (function (MOD) {
        var pager;
        (function (pager) {
            var collMOD = RIAPP.MOD.collection;
            var elviewMOD = RIAPP.MOD.baseElView;
            var utils;
            RIAPP.global.addOnInitialize(function (s, args) {
                utils = s.utils;
            });
            pager.css = {
                pager: 'ria-data-pager',
                info: 'pager-info',
                currentPage: 'pager-current-page',
                otherPage: 'pager-other-page'
            };
            var PAGER_TXT = RIAPP.localizable.PAGER;
            var PROP_NAME = {
                dataSource: 'dataSource',
                rowCount: 'rowCount',
                currentPage: 'currentPage',
                pager: 'pager'
            };
            var Pager = (function (_super) {
                __extends(Pager, _super);
                function Pager(options) {
                    _super.call(this);
                    options = utils.extend(false, {
                        app: null,
                        el: null,
                        dataSource: null,
                        showTip: true,
                        showInfo: false,
                        showNumbers: true,
                        showFirstAndLast: true,
                        showPreviousAndNext: false,
                        useSlider: true,
                        hideOnSinglePage: true,
                        sliderSize: 25
                    }, options);
                    if (!!options.dataSource && !(options.dataSource instanceof collMOD.BaseCollection))
                        throw new Error(RIAPP.ERRS.ERR_PAGER_DATASRC_INVALID);
                    this._options = options;
                    this._$el = RIAPP.global.$(options.el);
                    this._objId = 'pgr' + RIAPP.baseUtils.getNewID();
                    this._rowsPerPage = 0;
                    this._rowCount = 0;
                    this._currentPage = 1;
                    this._$el.addClass(pager.css.pager);
                    if (!!this._options.dataSource) {
                        this._bindDS();
                    }
                }
                Pager.prototype._createElement = function (tag) {
                    return RIAPP.global.$(RIAPP.global.document.createElement(tag));
                };
                Pager.prototype._render = function () {
                    var $el = this._$el, rowCount, currentPage, pageCount;
                    this._clearContent();
                    if (this.rowsPerPage <= 0) {
                        return;
                    }
                    rowCount = this.rowCount;
                    if (rowCount == 0) {
                        return;
                    }
                    currentPage = this.currentPage;
                    if (currentPage == 0) {
                        return;
                    }
                    pageCount = this.pageCount;
                    if (this.hideOnSinglePage && (pageCount == 1)) {
                        $el.hide();
                    }
                    else {
                        $el.show();
                        if (this.showInfo) {
                            var $span = this._createElement('span');
                            var info = utils.format(PAGER_TXT.pageInfo, currentPage, pageCount);
                            $span.addClass(pager.css.info).text(info).appendTo($el);
                        }
                        if (this.showFirstAndLast && (currentPage != 1)) {
                            $el.append(this._createFirst());
                        }
                        if (this.showPreviousAndNext && (currentPage != 1)) {
                            $el.append(this._createPrevious());
                        }
                        if (this.showNumbers) {
                            var start = 1, end = pageCount, sliderSize = this.sliderSize, half, above, below;
                            if (this.useSlider && (sliderSize > 0)) {
                                half = Math.floor(((sliderSize - 1) / 2));
                                above = (currentPage + half) + ((sliderSize - 1) % 2);
                                below = (currentPage - half);
                                if (below < 1) {
                                    above += (1 - below);
                                    below = 1;
                                }
                                if (above > pageCount) {
                                    below -= (above - pageCount);
                                    if (below < 1) {
                                        below = 1;
                                    }
                                    above = pageCount;
                                }
                                start = below;
                                end = above;
                            }
                            for (var i = start; i <= end; i++) {
                                if (i === currentPage) {
                                    $el.append(this._createCurrent());
                                }
                                else {
                                    $el.append(this._createOther(i));
                                }
                            }
                        }
                        if (this.showPreviousAndNext && (currentPage != pageCount)) {
                            $el.append(this._createNext());
                        }
                        if (this.showFirstAndLast && (currentPage != pageCount)) {
                            $el.append(this._createLast());
                        }
                    }
                };
                Pager.prototype._setDSPageIndex = function (page) {
                    this.dataSource.pageIndex = page - 1;
                };
                Pager.prototype._onPageSizeChanged = function (ds, args) {
                    this.rowsPerPage = ds.pageSize;
                };
                Pager.prototype._onPageIndexChanged = function (ds, args) {
                    this.currentPage = ds.pageIndex + 1;
                };
                Pager.prototype._onTotalCountChanged = function (ds, args) {
                    this.rowCount = ds.totalCount;
                };
                Pager.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this._unbindDS();
                    this._clearContent();
                    this._$el.removeClass(pager.css.pager);
                    this._$el = null;
                    this._options = {};
                    _super.prototype.destroy.call(this);
                };
                Pager.prototype._bindDS = function () {
                    var self = this, ds = this.dataSource;
                    if (!ds)
                        return;
                    ds.addOnFill(function (s, a) {
                        if (!a.isBegin && !a.isPageChanged) {
                            self._unbindDS();
                            setTimeout(function () {
                                self._bindDS();
                            }, 0);
                        }
                    }, self._objId);
                    ds.addOnPageIndexChanged(self._onPageIndexChanged, self._objId, self);
                    ds.addOnPageSizeChanged(self._onPageSizeChanged, self._objId, self);
                    ds.addOnTotalCountChanged(self._onTotalCountChanged, self._objId, self);
                    this._currentPage = ds.pageIndex + 1;
                    this._rowsPerPage = ds.pageSize;
                    this._rowCount = ds.totalCount;
                    this._render();
                };
                Pager.prototype._unbindDS = function () {
                    var self = this, ds = this.dataSource;
                    if (!ds)
                        return;
                    ds.removeNSHandlers(self._objId);
                };
                Pager.prototype._clearContent = function () {
                    this._$el.empty();
                };
                Pager.prototype._createLink = function (page, text, tip) {
                    var a = this._createElement('a'), self = this;
                    a.text('' + text);
                    a.attr('href', 'javascript:void(0)');
                    if (!!tip) {
                        elviewMOD.fn_addToolTip(a, tip);
                    }
                    a.click(function (e) {
                        e.preventDefault();
                        self._setDSPageIndex(page);
                        self.currentPage = page;
                    });
                    return a;
                };
                Pager.prototype._createFirst = function () {
                    var $span = this._createElement('span'), tip, a;
                    if (this.showTip) {
                        tip = PAGER_TXT.firstPageTip;
                    }
                    a = this._createLink(1, PAGER_TXT.firstText, tip);
                    $span.addClass(pager.css.otherPage).append(a);
                    return $span;
                };
                Pager.prototype._createPrevious = function () {
                    var span = this._createElement('span'), previousPage = this.currentPage - 1, tip, a;
                    if (this.showTip) {
                        tip = utils.format(PAGER_TXT.prevPageTip, previousPage);
                    }
                    a = this._createLink(previousPage, PAGER_TXT.previousText, tip);
                    span.addClass(pager.css.otherPage).append(a);
                    return span;
                };
                Pager.prototype._createCurrent = function () {
                    var span = this._createElement('span'), currentPage = this.currentPage;
                    span.text('' + currentPage);
                    if (this.showTip) {
                        elviewMOD.fn_addToolTip(span, this._buildTip(currentPage));
                    }
                    span.addClass(pager.css.currentPage);
                    return span;
                };
                Pager.prototype._createOther = function (page) {
                    var span = this._createElement('span'), tip, a;
                    if (this.showTip) {
                        tip = this._buildTip(page);
                    }
                    a = this._createLink(page, '' + page, tip);
                    span.addClass(pager.css.otherPage);
                    span.append(a);
                    return span;
                };
                Pager.prototype._createNext = function () {
                    var span = this._createElement('span'), nextPage = this.currentPage + 1, tip, a;
                    if (this.showTip) {
                        tip = utils.format(PAGER_TXT.nextPageTip, nextPage);
                    }
                    a = this._createLink(nextPage, PAGER_TXT.nextText, tip);
                    span.addClass(pager.css.otherPage).append(a);
                    return span;
                };
                Pager.prototype._createLast = function () {
                    var span = this._createElement('span'), tip, a;
                    if (this.showTip) {
                        tip = PAGER_TXT.lastPageTip;
                    }
                    a = this._createLink(this.pageCount, PAGER_TXT.lastText, tip);
                    span.addClass(pager.css.otherPage).append(a);
                    return span;
                };
                Pager.prototype._buildTip = function (page) {
                    var rowsPerPage = this.rowsPerPage, rowCount = this.rowCount, start = (((page - 1) * rowsPerPage) + 1), end = (page == this.pageCount) ? rowCount : (page * rowsPerPage), tip = '';
                    if (page == this.currentPage) {
                        tip = utils.format(PAGER_TXT.showingTip, start, end, rowCount);
                    }
                    else {
                        tip = utils.format(PAGER_TXT.showTip, start, end, rowCount);
                    }
                    return tip;
                };
                Pager.prototype.toString = function () {
                    return 'Pager';
                };
                Object.defineProperty(Pager.prototype, "app", {
                    get: function () { return this._options.app; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Pager.prototype, "el", {
                    get: function () { return this._options.el; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Pager.prototype, "dataSource", {
                    get: function () { return this._options.dataSource; },
                    set: function (v) {
                        if (v === this.dataSource)
                            return;
                        if (!!this.dataSource) {
                            this._unbindDS();
                        }
                        this._options.dataSource = v;
                        if (!!this.dataSource)
                            this._bindDS();
                        this.raisePropertyChanged(PROP_NAME.dataSource);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Pager.prototype, "pageCount", {
                    get: function () {
                        var rowCount = this.rowCount, rowsPerPage = this.rowsPerPage, result;
                        if ((rowCount === 0) || (rowsPerPage === 0)) {
                            return 0;
                        }
                        if ((rowCount % rowsPerPage) === 0) {
                            return (rowCount / rowsPerPage);
                        }
                        else {
                            result = (rowCount / rowsPerPage);
                            result = Math.floor(result) + 1;
                            return result;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Pager.prototype, "rowCount", {
                    get: function () { return this._rowCount; },
                    set: function (v) {
                        if (this._rowCount != v) {
                            this._rowCount = v;
                            this._render();
                            this.raisePropertyChanged(PROP_NAME.rowCount);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Pager.prototype, "rowsPerPage", {
                    get: function () { return this._rowsPerPage; },
                    set: function (v) {
                        if (this._rowsPerPage != v) {
                            this._rowsPerPage = v;
                            this._render();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Pager.prototype, "currentPage", {
                    get: function () { return this._currentPage; },
                    set: function (v) {
                        if (this._currentPage != v) {
                            this._currentPage = v;
                            this._render();
                            this.raisePropertyChanged(PROP_NAME.currentPage);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Pager.prototype, "useSlider", {
                    get: function () { return this._options.useSlider; },
                    set: function (v) {
                        if (this.useSlider !== v) {
                            this._options.useSlider = v;
                            this._render();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Pager.prototype, "sliderSize", {
                    get: function () { return this._options.sliderSize; },
                    set: function (v) {
                        if (this.sliderSize !== v) {
                            this._options.sliderSize = v;
                            this._render();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Pager.prototype, "hideOnSinglePage", {
                    get: function () { return this._options.hideOnSinglePage; },
                    set: function (v) {
                        if (this.hideOnSinglePage !== v) {
                            this._options.hideOnSinglePage = v;
                            this._render();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Pager.prototype, "showTip", {
                    get: function () { return this._options.showTip; },
                    set: function (v) {
                        if (this.showTip !== v) {
                            this._options.showTip = v;
                            this._render();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Pager.prototype, "showInfo", {
                    get: function () { return this._options.showInfo; },
                    set: function (v) {
                        if (this._options.showInfo !== v) {
                            this._options.showInfo = v;
                            this._render();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Pager.prototype, "showFirstAndLast", {
                    get: function () { return this._options.showFirstAndLast; },
                    set: function (v) {
                        if (this.showFirstAndLast !== v) {
                            this._options.showFirstAndLast = v;
                            this._render();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Pager.prototype, "showPreviousAndNext", {
                    get: function () { return this._options.showPreviousAndNext; },
                    set: function (v) {
                        if (this.showPreviousAndNext !== v) {
                            this._options.showPreviousAndNext = v;
                            this._render();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Pager.prototype, "showNumbers", {
                    get: function () { return this._options.showNumbers; },
                    set: function (v) {
                        if (this.showNumbers !== v) {
                            this._options.showNumbers = v;
                            this._render();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return Pager;
            })(RIAPP.BaseObject);
            pager.Pager = Pager;
            var PagerElView = (function (_super) {
                __extends(PagerElView, _super);
                function PagerElView(app, el, options) {
                    var self = this;
                    this._pager = null;
                    this._options = options;
                    var opts = utils.extend(false, {
                        app: app,
                        el: el,
                        dataSource: null
                    }, this._options);
                    this._pager = new Pager(opts);
                    this._pager.addOnDestroyed(function () {
                        self._pager = null;
                        self.invokePropChanged(PROP_NAME.pager);
                        self.raisePropertyChanged(PROP_NAME.pager);
                    });
                    _super.call(this, app, el, options);
                }
                PagerElView.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._pager && !this._pager.getIsDestroyCalled()) {
                        this._pager.destroy();
                    }
                    this._pager = null;
                    _super.prototype.destroy.call(this);
                };
                PagerElView.prototype.toString = function () {
                    return 'PagerElView';
                };
                Object.defineProperty(PagerElView.prototype, "dataSource", {
                    get: function () {
                        if (this._isDestroyCalled)
                            return undefined;
                        return this._pager.dataSource;
                    },
                    set: function (v) {
                        if (this._isDestroyCalled)
                            return;
                        if (this.dataSource !== v) {
                            this._pager.dataSource = v;
                            this.raisePropertyChanged(PROP_NAME.dataSource);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PagerElView.prototype, "pager", {
                    get: function () { return this._pager; },
                    enumerable: true,
                    configurable: true
                });
                return PagerElView;
            })(elviewMOD.BaseElView);
            pager.PagerElView = PagerElView;
            RIAPP.global.registerElView('pager', PagerElView);
            pager._isModuleLoaded = true;
        })(pager = MOD.pager || (MOD.pager = {}));
    })(MOD = RIAPP.MOD || (RIAPP.MOD = {}));
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    var MOD;
    (function (MOD) {
        var stackpanel;
        (function (stackpanel) {
            var constsMOD = RIAPP.consts;
            var collMOD = RIAPP.MOD.collection;
            var utils, global = RIAPP.global;
            global.addOnInitialize(function (s, args) {
                utils = s.utils;
            });
            stackpanel.css = {
                stackpanel: 'ria-stackpanel',
                item: 'stackpanel-item',
                currentItem: 'current-item'
            };
            var PROP_NAME = {
                dataSource: 'dataSource',
                currentItem: 'currentItem',
                panel: 'panel',
                panelEvents: 'panelEvents'
            };
            var PNL_EVENTS = {
                item_clicked: 'item_clicked'
            };
            var StackPanel = (function (_super) {
                __extends(StackPanel, _super);
                function StackPanel(options) {
                    _super.call(this);
                    var self = this;
                    options = utils.extend(false, {
                        app: null,
                        el: null,
                        dataSource: null,
                        orientation: 'horizontal',
                        templateID: null
                    }, options);
                    if (!!options.dataSource && !(options.dataSource instanceof collMOD.BaseCollection))
                        throw new Error(RIAPP.ERRS.ERR_STACKPNL_DATASRC_INVALID);
                    if (!options.templateID)
                        throw new Error(RIAPP.ERRS.ERR_STACKPNL_TEMPLATE_INVALID);
                    this._options = options;
                    this._$el = global.$(options.el);
                    this._objId = 'pnl' + RIAPP.baseUtils.getNewID();
                    this._isDSFilling = false;
                    this._currentItem = null;
                    this._$el.addClass(stackpanel.css.stackpanel);
                    this._itemMap = {};
                    this._selectable = {
                        getContainerEl: function () {
                            return self._getContainerEl();
                        },
                        getUniqueID: function () {
                            return self.uniqueID;
                        },
                        onKeyDown: function (key, event) {
                            self._onKeyDown(key, event);
                        },
                        onKeyUp: function (key, event) {
                            self._onKeyUp(key, event);
                        }
                    };
                    this._$el.on('click', ['div[', constsMOD.DATA_ATTR.DATA_EVENT_SCOPE, '="', this.uniqueID, '"]'].join(''), function (e) {
                        e.stopPropagation();
                        var $div = global.$(this), mappedItem = $div.data('data');
                        self._onItemClicked(mappedItem.div, mappedItem.item);
                    });
                    if (!!options.dataSource) {
                        this._bindDS();
                    }
                    global._getInternal().trackSelectable(this);
                }
                StackPanel.prototype._getEventNames = function () {
                    var base_events = _super.prototype._getEventNames.call(this);
                    return [PNL_EVENTS.item_clicked].concat(base_events);
                };
                StackPanel.prototype.templateLoading = function (template) {
                };
                StackPanel.prototype.templateLoaded = function (template) {
                };
                StackPanel.prototype.templateUnLoading = function (template) {
                };
                StackPanel.prototype.addOnItemClicked = function (fn, nmspace, context) {
                    this._addHandler(PNL_EVENTS.item_clicked, fn, nmspace, context);
                };
                StackPanel.prototype.removeOnItemClicked = function (nmspace) {
                    this._removeHandler(PNL_EVENTS.item_clicked, nmspace);
                };
                StackPanel.prototype._getContainerEl = function () { return this._options.el; };
                StackPanel.prototype._onKeyDown = function (key, event) {
                    var ds = this.dataSource, self = this;
                    if (!ds)
                        return;
                    if (this.orientation == 'horizontal') {
                        switch (key) {
                            case 37:
                                event.preventDefault();
                                if (ds.movePrev(true)) {
                                    self.scrollIntoView(ds.currentItem);
                                }
                                break;
                            case 39:
                                event.preventDefault();
                                if (ds.moveNext(true)) {
                                    self.scrollIntoView(ds.currentItem);
                                }
                                break;
                        }
                    }
                    else {
                        switch (key) {
                            case 38:
                                event.preventDefault();
                                if (ds.movePrev(true)) {
                                    self.scrollIntoView(ds.currentItem);
                                }
                                break;
                            case 40:
                                event.preventDefault();
                                if (ds.moveNext(true)) {
                                    self.scrollIntoView(ds.currentItem);
                                }
                                break;
                        }
                    }
                };
                StackPanel.prototype._onKeyUp = function (key, event) {
                };
                StackPanel.prototype._updateCurrent = function (item, withScroll) {
                    var self = this, old = self._currentItem, mappedItem;
                    if (old !== item) {
                        this._currentItem = item;
                        if (!!old) {
                            mappedItem = self._itemMap[old._key];
                            if (!!mappedItem) {
                                global.$(mappedItem.div).removeClass(stackpanel.css.currentItem);
                            }
                        }
                        if (!!item) {
                            mappedItem = self._itemMap[item._key];
                            if (!!mappedItem) {
                                global.$(mappedItem.div).addClass(stackpanel.css.currentItem);
                                if (withScroll)
                                    mappedItem.div.scrollIntoView(false);
                            }
                        }
                        this.raisePropertyChanged(PROP_NAME.currentItem);
                    }
                };
                StackPanel.prototype._onDSCurrentChanged = function (sender, args) {
                    var ds = this.dataSource, cur = ds.currentItem;
                    if (!cur)
                        this._updateCurrent(null, false);
                    else {
                        this._updateCurrent(cur, true);
                    }
                };
                StackPanel.prototype._onDSCollectionChanged = function (sender, args) {
                    var self = this, items = args.items;
                    switch (args.changeType) {
                        case 2:
                            if (!this._isDSFilling)
                                this._refresh();
                            break;
                        case 1:
                            if (!this._isDSFilling)
                                self._appendItems(items);
                            break;
                        case 0:
                            items.forEach(function (item) {
                                self._removeItem(item);
                            });
                            break;
                        case 3:
                            {
                                var mappedItem = self._itemMap[args.old_key];
                                if (!!mappedItem) {
                                    delete self._itemMap[args.old_key];
                                    self._itemMap[args.new_key] = mappedItem;
                                }
                            }
                            break;
                        default:
                            throw new Error(global.utils.format(RIAPP.ERRS.ERR_COLLECTION_CHANGETYPE_INVALID, args.changeType));
                    }
                };
                StackPanel.prototype._onDSFill = function (sender, args) {
                    var isEnd = !args.isBegin;
                    if (isEnd) {
                        this._isDSFilling = false;
                        if (args.resetUI)
                            this._refresh();
                        else
                            this._appendItems(args.newItems);
                    }
                    else {
                        this._isDSFilling = true;
                    }
                };
                StackPanel.prototype._onItemStatusChanged = function (item, oldStatus) {
                    var newStatus = item._aspect.status;
                    var obj = this._itemMap[item._key];
                    if (!obj)
                        return;
                    if (newStatus === 3) {
                        global.$(obj.div).hide();
                    }
                    else if (oldStatus === 3 && newStatus !== 3) {
                        global.$(obj.div).show();
                    }
                };
                StackPanel.prototype._createTemplate = function (item) {
                    var t = new MOD.template.Template({
                        app: this.app,
                        templateID: this.templateID,
                        dataContext: item,
                        templEvents: this
                    });
                    return t;
                };
                StackPanel.prototype._appendItems = function (newItems) {
                    if (this._isDestroyCalled)
                        return;
                    var self = this;
                    newItems.forEach(function (item) {
                        if (!!self._itemMap[item._key])
                            return;
                        self._appendItem(item);
                    });
                };
                StackPanel.prototype._appendItem = function (item) {
                    if (!item._key)
                        return;
                    var self = this, $div = self._createElement('div'), div = $div.get(0);
                    $div.addClass(stackpanel.css.item);
                    if (this.orientation == 'horizontal') {
                        $div.css('display', 'inline-block');
                    }
                    $div.attr(constsMOD.DATA_ATTR.DATA_EVENT_SCOPE, this.uniqueID);
                    self._$el.append($div);
                    var mappedItem = { div: div, template: null, item: item };
                    $div.data('data', mappedItem);
                    self._itemMap[item._key] = mappedItem;
                    mappedItem.template = self._createTemplate(item);
                    mappedItem.div.appendChild(mappedItem.template.el);
                };
                StackPanel.prototype._bindDS = function () {
                    var self = this, ds = this.dataSource;
                    if (!ds)
                        return;
                    ds.addOnCollChanged(self._onDSCollectionChanged, self._objId, self);
                    ds.addOnFill(self._onDSFill, self._objId, self);
                    ds.addOnCurrentChanged(self._onDSCurrentChanged, self._objId, self);
                    ds.addOnStatusChanged(function (sender, args) {
                        self._onItemStatusChanged(args.item, args.oldStatus);
                    }, self._objId);
                    this._refresh();
                };
                StackPanel.prototype._unbindDS = function () {
                    var self = this, ds = this.dataSource;
                    if (!ds)
                        return;
                    ds.removeNSHandlers(self._objId);
                };
                StackPanel.prototype._createElement = function (tag) {
                    return global.$(global.document.createElement(tag));
                };
                StackPanel.prototype._onItemClicked = function (div, item) {
                    this._updateCurrent(item, false);
                    this.dataSource.currentItem = item;
                    this.raiseEvent(PNL_EVENTS.item_clicked, { item: item });
                };
                StackPanel.prototype._clearContent = function () {
                    var self = this;
                    self._$el.empty();
                    global.utils.forEachProp(self._itemMap, function (key) {
                        self._removeItemByKey(key);
                    });
                };
                StackPanel.prototype._removeItemByKey = function (key) {
                    var self = this, mappedItem = self._itemMap[key];
                    if (!mappedItem)
                        return;
                    delete self._itemMap[key];
                    mappedItem.template.destroy();
                    mappedItem.template = null;
                    global.$(mappedItem.div).removeData('data');
                    global.$(mappedItem.div).remove();
                };
                StackPanel.prototype._removeItem = function (item) {
                    this._removeItemByKey(item._key);
                };
                StackPanel.prototype._refresh = function () {
                    var ds = this.dataSource, self = this;
                    this._clearContent();
                    if (!ds)
                        return;
                    ds.forEach(function (item) {
                        self._appendItem(item);
                    });
                };
                StackPanel.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    global._getInternal().untrackSelectable(this);
                    this._unbindDS();
                    this._clearContent();
                    this._$el.removeClass(stackpanel.css.stackpanel);
                    this._$el = null;
                    this._currentItem = null;
                    this._itemMap = {};
                    this._options = {};
                    _super.prototype.destroy.call(this);
                };
                StackPanel.prototype.getISelectable = function () {
                    return this._selectable;
                };
                StackPanel.prototype.scrollIntoView = function (item) {
                    if (!item)
                        return;
                    var mappedItem = this._itemMap[item._key];
                    if (!!mappedItem) {
                        mappedItem.div.scrollIntoView(false);
                    }
                };
                StackPanel.prototype.getDivElementByItem = function (item) {
                    var mappedItem = this._itemMap[item._key];
                    if (!mappedItem)
                        return null;
                    return mappedItem.div;
                };
                StackPanel.prototype.toString = function () {
                    return 'StackPanel';
                };
                Object.defineProperty(StackPanel.prototype, "app", {
                    get: function () { return this._options.app; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(StackPanel.prototype, "el", {
                    get: function () { return this._options.el; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(StackPanel.prototype, "uniqueID", {
                    get: function () { return this._objId; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(StackPanel.prototype, "orientation", {
                    get: function () { return this._options.orientation; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(StackPanel.prototype, "templateID", {
                    get: function () { return this._options.templateID; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(StackPanel.prototype, "dataSource", {
                    get: function () { return this._options.dataSource; },
                    set: function (v) {
                        if (v === this.dataSource)
                            return;
                        if (!!this.dataSource) {
                            this._unbindDS();
                        }
                        this._options.dataSource = v;
                        if (!!this.dataSource)
                            this._bindDS();
                        this.raisePropertyChanged(PROP_NAME.dataSource);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(StackPanel.prototype, "currentItem", {
                    get: function () { return this._currentItem; },
                    enumerable: true,
                    configurable: true
                });
                return StackPanel;
            })(RIAPP.BaseObject);
            stackpanel.StackPanel = StackPanel;
            var StackPanelElView = (function (_super) {
                __extends(StackPanelElView, _super);
                function StackPanelElView(app, el, options) {
                    this._panel = null;
                    this._options = options;
                    this._panelEvents = null;
                    var opts = utils.extend(false, {
                        app: app,
                        el: el,
                        dataSource: null
                    }, this._options);
                    this._createPanel(opts);
                    _super.call(this, app, el, options);
                }
                StackPanelElView.prototype._createPanel = function (opts) {
                    this._panel = new StackPanel(opts);
                    this._panel.addOnItemClicked(function (sender, args) {
                        var self = this;
                        if (!!self._panelEvents) {
                            self._panelEvents.onItemClicked(args.item);
                        }
                    }, this.uniqueID, this);
                    this._panel.addOnDestroyed(function () {
                        var self = this;
                        self._panel = null;
                        self.invokePropChanged(PROP_NAME.panel);
                        self.raisePropertyChanged(PROP_NAME.panel);
                    }, this.uniqueID, this);
                };
                StackPanelElView.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    if (!!this._panel && !this._panel.getIsDestroyCalled()) {
                        this._panel.destroy();
                    }
                    this._panelEvents = null;
                    this._panel = null;
                    _super.prototype.destroy.call(this);
                };
                StackPanelElView.prototype.toString = function () {
                    return 'StackPanelElView';
                };
                Object.defineProperty(StackPanelElView.prototype, "dataSource", {
                    get: function () {
                        if (this.getIsDestroyCalled() || !this._panel)
                            return undefined;
                        return this._panel.dataSource;
                    },
                    set: function (v) {
                        if (this._isDestroyCalled)
                            return;
                        if (this.dataSource !== v) {
                            this._panel.dataSource = v;
                            this.raisePropertyChanged(PROP_NAME.dataSource);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(StackPanelElView.prototype, "panelEvents", {
                    get: function () { return this._panelEvents; },
                    set: function (v) {
                        var old = this._panelEvents;
                        if (v !== old) {
                            this._panelEvents = v;
                            this.raisePropertyChanged(PROP_NAME.panelEvents);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(StackPanelElView.prototype, "panel", {
                    get: function () { return this._panel; },
                    enumerable: true,
                    configurable: true
                });
                return StackPanelElView;
            })(MOD.baseElView.BaseElView);
            stackpanel.StackPanelElView = StackPanelElView;
            global.registerElView('stackpanel', StackPanelElView);
            stackpanel._isModuleLoaded = true;
        })(stackpanel = MOD.stackpanel || (MOD.stackpanel = {}));
    })(MOD = RIAPP.MOD || (RIAPP.MOD = {}));
})(RIAPP || (RIAPP = {}));
var RIAPP;
(function (RIAPP) {
    var MOD;
    (function (MOD) {
        var db;
        (function (db) {
            var constsMOD = RIAPP.consts;
            var utilsMOD = RIAPP.MOD.utils;
            var collMOD = RIAPP.MOD.collection;
            var errMOD = RIAPP.MOD.errors;
            var HEAD_MARK_RX = /^<head:(\d{1,6})>/;
            var ValidationError = errMOD.ValidationError, valueUtils = utilsMOD.valueUtils, baseUtils = RIAPP.baseUtils, utils;
            RIAPP.global.addOnInitialize(function (s, args) {
                utils = s.utils;
            });
            var DATA_SVC_METH = {
                Invoke: 'invoke', LoadData: 'query', GetPermissions: 'permissions',
                Submit: 'save', Refresh: 'refresh'
            };
            var DataOperationError = (function (_super) {
                __extends(DataOperationError, _super);
                function DataOperationError(ex, operationName) {
                    var message;
                    if (!!ex)
                        message = ex.message;
                    if (!message)
                        message = '' + ex;
                    _super.call(this, message);
                    this.origError = ex;
                    this._operationName = operationName;
                }
                Object.defineProperty(DataOperationError.prototype, "operationName", {
                    get: function () { return this._operationName; },
                    enumerable: true,
                    configurable: true
                });
                return DataOperationError;
            })(errMOD.BaseError);
            db.DataOperationError = DataOperationError;
            var AccessDeniedError = (function (_super) {
                __extends(AccessDeniedError, _super);
                function AccessDeniedError() {
                    _super.apply(this, arguments);
                }
                return AccessDeniedError;
            })(DataOperationError);
            db.AccessDeniedError = AccessDeniedError;
            var ConcurrencyError = (function (_super) {
                __extends(ConcurrencyError, _super);
                function ConcurrencyError() {
                    _super.apply(this, arguments);
                }
                return ConcurrencyError;
            })(DataOperationError);
            db.ConcurrencyError = ConcurrencyError;
            var SvcValidationError = (function (_super) {
                __extends(SvcValidationError, _super);
                function SvcValidationError() {
                    _super.apply(this, arguments);
                }
                return SvcValidationError;
            })(DataOperationError);
            db.SvcValidationError = SvcValidationError;
            var SubmitError = (function (_super) {
                __extends(SubmitError, _super);
                function SubmitError(origError, allSubmitted, notValidated) {
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
                    _super.call(this, message, 0);
                }
                Object.defineProperty(SubmitError.prototype, "allSubmitted", {
                    get: function () { return this._allSubmitted; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SubmitError.prototype, "notValidated", {
                    get: function () { return this._notValidated; },
                    enumerable: true,
                    configurable: true
                });
                return SubmitError;
            })(DataOperationError);
            db.SubmitError = SubmitError;
            function __checkError(svcError, oper) {
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
                        throw new SvcValidationError(utils.format(RIAPP.ERRS.ERR_VALIDATION, svcError.message), oper);
                        break;
                    case "DomainServiceException":
                        throw new DataOperationError(utils.format(RIAPP.ERRS.ERR_SVC_ERROR, svcError.message), oper);
                        break;
                    default:
                        throw new DataOperationError(utils.format(RIAPP.ERRS.ERR_UNEXPECTED_SVC_ERROR, svcError.message), oper);
                }
            }
            ;
            function fn_isNotSubmittable(fieldInfo) {
                return (fieldInfo.fieldType == 1 || fieldInfo.fieldType == 3 || fieldInfo.fieldType == 2 || fieldInfo.fieldType == 6);
            }
            function fn_traverseChanges(val, fn) {
                function _fn_traverseChanges(name, val, fn) {
                    if (!!val.nested && val.nested.length > 0) {
                        var prop, i, len = val.nested.length;
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
            var DataCache = (function (_super) {
                __extends(DataCache, _super);
                function DataCache(query) {
                    _super.call(this);
                    this._query = query;
                    this._cache = [];
                    this._totalCount = 0;
                    this._itemsByKey = {};
                }
                DataCache.prototype.getCachedPage = function (pageIndex) {
                    var res = this._cache.filter(function (page) {
                        return page.pageIndex === pageIndex;
                    });
                    if (res.length == 0)
                        return null;
                    if (res.length != 1)
                        throw new Error(baseUtils.format(RIAPP.ERRS.ERR_ASSERTION_FAILED, "res.length == 1"));
                    return res[0];
                };
                DataCache.prototype.reindexCache = function () {
                    var self = this, page;
                    this._itemsByKey = {};
                    for (var i = 0; i < this._cache.length; i += 1) {
                        page = this._cache[i];
                        page.items.forEach(function (item) {
                            self._itemsByKey[item._key] = item;
                        });
                    }
                };
                DataCache.prototype.getPrevCachedPageIndex = function (currentPageIndex) {
                    var pageIndex = -1, cachePageIndex;
                    for (var i = 0; i < this._cache.length; i += 1) {
                        cachePageIndex = this._cache[i].pageIndex;
                        if (cachePageIndex > pageIndex && cachePageIndex < currentPageIndex)
                            pageIndex = cachePageIndex;
                    }
                    return pageIndex;
                };
                DataCache.prototype.getNextRange = function (pageIndex) {
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
                };
                DataCache.prototype.fillCache = function (start, items) {
                    var item, keyMap = this._itemsByKey;
                    var i, j, k, len = items.length, pageIndex, page, pageSize = this.pageSize;
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
                };
                DataCache.prototype.clear = function () {
                    var i, j, items, item, dbSet = this._query.dbSet;
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
                };
                DataCache.prototype.clearCacheForPage = function (pageIndex) {
                    var page = this.getCachedPage(pageIndex), dbSet = this._query.dbSet;
                    if (!page)
                        return;
                    var j, items, item, index = this._cache.indexOf(page);
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
                };
                DataCache.prototype.hasPage = function (pageIndex) {
                    for (var i = 0; i < this._cache.length; i += 1) {
                        if (this._cache[i].pageIndex === pageIndex)
                            return true;
                    }
                    return false;
                };
                DataCache.prototype.getItemByKey = function (key) {
                    return this._itemsByKey[key];
                };
                DataCache.prototype.getPageByItem = function (item) {
                    item = this._itemsByKey[item._key];
                    if (!item)
                        return -1;
                    for (var i = 0; i < this._cache.length; i += 1) {
                        if (this._cache[i].items.indexOf(item) > -1) {
                            return this._cache[i].pageIndex;
                        }
                    }
                    return -1;
                };
                DataCache.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this.clear();
                    _super.prototype.destroy.call(this);
                };
                DataCache.prototype.toString = function () {
                    return 'DataCache';
                };
                Object.defineProperty(DataCache.prototype, "_pageCount", {
                    get: function () {
                        var rowCount = this.totalCount, rowPerPage = this.pageSize, result;
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
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataCache.prototype, "pageSize", {
                    get: function () { return this._query.pageSize; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataCache.prototype, "loadPageCount", {
                    get: function () { return this._query.loadPageCount; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataCache.prototype, "totalCount", {
                    get: function () { return this._totalCount; },
                    set: function (v) {
                        if (utils.check.isNt(v))
                            v = 0;
                        if (v !== this._totalCount) {
                            this._totalCount = v;
                            this.raisePropertyChanged(PROP_NAME.totalCount);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataCache.prototype, "cacheSize", {
                    get: function () { return this._cache.length; },
                    enumerable: true,
                    configurable: true
                });
                return DataCache;
            })(RIAPP.BaseObject);
            db.DataCache = DataCache;
            var DataQuery = (function (_super) {
                __extends(DataQuery, _super);
                function DataQuery(dbSet, queryInfo) {
                    _super.call(this);
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
                        clearCache: function () {
                            self._clearCache();
                        },
                        getCache: function () {
                            return self._getCache();
                        },
                        reindexCache: function () {
                            self._reindexCache();
                        },
                        isPageCached: function (pageIndex) {
                            return self._isPageCached(pageIndex);
                        },
                        getQueryInfo: function () {
                            return self.__queryInfo;
                        }
                    };
                }
                DataQuery.prototype._addSort = function (fieldName, sortOrder) {
                    var ord = 0;
                    if (!utils.check.isNt(sortOrder))
                        ord = sortOrder;
                    var sortItem = { fieldName: fieldName, sortOrder: ord };
                    this._sortInfo.sortItems.push(sortItem);
                    this._cacheInvalidated = true;
                };
                DataQuery.prototype._addFilterItem = function (fieldName, operand, value) {
                    var fkind = 0;
                    var fld = this.getFieldInfo(fieldName);
                    if (!fld)
                        throw new Error(utils.format(RIAPP.ERRS.ERR_DBSET_INVALID_FIELDNAME, this.dbSetName, fieldName));
                    var stz = this.serverTimezone, dcnv = fld.dateConversion, vals = [];
                    if (!utils.check.isArray(value))
                        vals = [value];
                    else
                        vals = value;
                    var tmpVals = RIAPP.ArrayHelper.clone(vals);
                    vals = tmpVals.map(function (v) {
                        return valueUtils.stringifyValue(v, dcnv, fld.dataType, stz);
                    });
                    switch (operand) {
                        case 0:
                        case 9:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                        case 7:
                        case 6:
                        case 8:
                            fkind = operand;
                            break;
                        case 1:
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
                };
                DataQuery.prototype._resetCacheInvalidated = function () {
                    this._cacheInvalidated = false;
                };
                DataQuery.prototype._clearCache = function () {
                    if (!!this._dataCache) {
                        this._dataCache.destroy();
                        this._dataCache = null;
                    }
                    this._resetCacheInvalidated();
                };
                DataQuery.prototype._getCache = function () {
                    if (!this._dataCache) {
                        this._dataCache = new DataCache(this);
                    }
                    return this._dataCache;
                };
                DataQuery.prototype._reindexCache = function () {
                    if (!this._dataCache) {
                        return;
                    }
                    this._dataCache.reindexCache();
                };
                DataQuery.prototype._isPageCached = function (pageIndex) {
                    if (!this._dataCache) {
                        return false;
                    }
                    return this._dataCache.hasPage(pageIndex);
                };
                DataQuery.prototype._getInternal = function () {
                    return this._internal;
                };
                DataQuery.prototype.where = function (fieldName, operand, value) {
                    this._addFilterItem(fieldName, operand, value);
                    return this;
                };
                DataQuery.prototype.and = function (fieldName, operand, value) {
                    this._addFilterItem(fieldName, operand, value);
                    return this;
                };
                DataQuery.prototype.orderBy = function (fieldName, sortOrder) {
                    this._addSort(fieldName, sortOrder);
                    return this;
                };
                DataQuery.prototype.thenBy = function (fieldName, sortOrder) {
                    this._addSort(fieldName, sortOrder);
                    return this;
                };
                DataQuery.prototype.clearSort = function () {
                    this._sortInfo.sortItems = [];
                    this._cacheInvalidated = true;
                    return this;
                };
                DataQuery.prototype.clearFilter = function () {
                    this._filterInfo.filterItems = [];
                    this._cacheInvalidated = true;
                    return this;
                };
                DataQuery.prototype.clearParams = function () {
                    this._params = {};
                    this._cacheInvalidated = true;
                    return this;
                };
                DataQuery.prototype.getFieldInfo = function (fieldName) {
                    return this._dbSet.getFieldInfo(fieldName);
                };
                DataQuery.prototype.getFieldNames = function () {
                    return this._dbSet.getFieldNames();
                };
                DataQuery.prototype.load = function () {
                    return this.dbSet.dbContext.load(this);
                };
                DataQuery.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this._clearCache();
                    _super.prototype.destroy.call(this);
                };
                DataQuery.prototype.toString = function () {
                    return 'DataQuery';
                };
                Object.defineProperty(DataQuery.prototype, "serverTimezone", {
                    get: function () { return this._dbSet.dbContext.serverTimezone; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataQuery.prototype, "entityType", {
                    get: function () { return this._dbSet.entityType; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataQuery.prototype, "dbSet", {
                    get: function () { return this._dbSet; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataQuery.prototype, "dbSetName", {
                    get: function () { return this._dbSet.dbSetName; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataQuery.prototype, "queryName", {
                    get: function () { return this.__queryInfo.methodName; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataQuery.prototype, "filterInfo", {
                    get: function () { return this._filterInfo; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataQuery.prototype, "sortInfo", {
                    get: function () { return this._sortInfo; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataQuery.prototype, "isIncludeTotalCount", {
                    get: function () { return this._isIncludeTotalCount; },
                    set: function (v) { this._isIncludeTotalCount = v; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataQuery.prototype, "isClearPrevData", {
                    get: function () { return this._isClearPrevData; },
                    set: function (v) { this._isClearPrevData = v; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataQuery.prototype, "pageSize", {
                    get: function () { return this._pageSize; },
                    set: function (v) {
                        if (this._pageSize != v) {
                            this._pageSize = v;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataQuery.prototype, "pageIndex", {
                    get: function () { return this._pageIndex; },
                    set: function (v) {
                        if (this._pageIndex != v) {
                            this._pageIndex = v;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataQuery.prototype, "params", {
                    get: function () { return this._params; },
                    set: function (v) {
                        if (this._params !== v) {
                            this._params = v;
                            this._cacheInvalidated = true;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataQuery.prototype, "isPagingEnabled", {
                    get: function () { return this._pageIndex >= 0 && this._dbSet.isPagingEnabled; },
                    set: function (v) {
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
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataQuery.prototype, "loadPageCount", {
                    get: function () { return this._loadPageCount; },
                    set: function (v) {
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
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataQuery.prototype, "isClearCacheOnEveryLoad", {
                    get: function () { return this._isClearCacheOnEveryLoad; },
                    set: function (v) {
                        if (this._isClearCacheOnEveryLoad != v) {
                            this._isClearCacheOnEveryLoad = v;
                            this.raisePropertyChanged(PROP_NAME.isClearCacheOnEveryLoad);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataQuery.prototype, "isCacheValid", {
                    get: function () { return !!this._dataCache && !this._cacheInvalidated; },
                    enumerable: true,
                    configurable: true
                });
                return DataQuery;
            })(RIAPP.BaseObject);
            db.DataQuery = DataQuery;
            var TDataQuery = (function (_super) {
                __extends(TDataQuery, _super);
                function TDataQuery() {
                    _super.apply(this, arguments);
                }
                return TDataQuery;
            })(DataQuery);
            db.TDataQuery = TDataQuery;
            var ENTITYASPECT_EVENTS = {
                destroyed: 'destroyed'
            };
            var EntityAspect = (function (_super) {
                __extends(EntityAspect, _super);
                function EntityAspect(dbSet, itemType, row, names) {
                    _super.call(this, dbSet);
                    var self = this;
                    this.__srvKey = null;
                    this._isRefreshing = false;
                    this._isCached = false;
                    this._origVals = null;
                    this._savedStatus = null;
                    var fieldInfos = this.dbSet.getFieldInfos(), fld;
                    for (var i = 0, len = fieldInfos.length; i < len; i += 1) {
                        fld = fieldInfos[i];
                        if (fld.fieldType != 5) {
                            self._vals[fld.fieldName] = null;
                        }
                        else {
                            collMOD.fn_traverseField(fld, function (name, f) {
                                if (f.fieldType == 5)
                                    baseUtils.setValue(self._vals, name, {}, false);
                                else
                                    baseUtils.setValue(self._vals, name, null, false);
                            });
                        }
                    }
                    this._initRowInfo(row, names);
                    this._item = new itemType(this);
                }
                EntityAspect.prototype._fakeDestroy = function () {
                    if (this._isDestroyCalled || !this._item)
                        return;
                    this.raiseEvent(ENTITYASPECT_EVENTS.destroyed, {});
                    this._item.raiseEvent(ENTITYASPECT_EVENTS.destroyed, {});
                    this.removeNSHandlers(null);
                    this._item.removeNSHandlers(null);
                };
                EntityAspect.prototype._initRowInfo = function (row, names) {
                    if (!row)
                        return;
                    this.__srvKey = row.k;
                    this.key = row.k;
                    this._processValues('', row.v, names);
                };
                EntityAspect.prototype._processValues = function (path, values, names) {
                    var self = this, stz = self.serverTimezone;
                    values.forEach(function (value, index) {
                        var name = names[index], fieldName = path + name.n, fld = self.dbSet.getFieldInfo(fieldName), val;
                        if (!fld)
                            throw new Error(baseUtils.format(RIAPP.ERRS.ERR_DBSET_INVALID_FIELDNAME, self.dbSetName, fieldName));
                        if (fld.fieldType == 5) {
                            self._processValues(fieldName + '.', value, name.p);
                        }
                        else {
                            val = valueUtils.parseValue(value, fld.dataType, fld.dateConversion, stz);
                            baseUtils.setValue(self._vals, fieldName, val, false);
                        }
                    });
                };
                EntityAspect.prototype._onFieldChanged = function (fieldName, fieldInfo) {
                    var self = this;
                    if (this._isDestroyCalled)
                        return;
                    self.getItem().raisePropertyChanged(fieldName);
                    if (!!fieldInfo.dependents && fieldInfo.dependents.length > 0) {
                        fieldInfo.dependents.forEach(function (d) {
                            self.getItem().raisePropertyChanged(d);
                        });
                    }
                };
                EntityAspect.prototype._getValueChange = function (fullName, fieldInfo, changedOnly) {
                    var self = this, dbSet = self.dbSet, res, i, len, tmp;
                    if (fn_isNotSubmittable(fieldInfo))
                        return null;
                    if (fieldInfo.fieldType == 5) {
                        res = { fieldName: fieldInfo.fieldName, val: null, orig: null, flags: 0, nested: [] };
                        len = fieldInfo.nested.length;
                        for (i = 0; i < len; i += 1) {
                            tmp = self._getValueChange(fullName + '.' + fieldInfo.nested[i].fieldName, fieldInfo.nested[i], changedOnly);
                            if (!!tmp) {
                                res.nested.push(tmp);
                            }
                        }
                    }
                    else {
                        var newVal = dbSet._getInternal().getStrValue(baseUtils.getValue(self._vals, fullName), fieldInfo), oldV = self._origVals === null ? newVal : dbSet._getInternal().getStrValue(baseUtils.getValue(self._origVals, fullName), fieldInfo), isChanged = (oldV !== newVal);
                        if (isChanged)
                            res = { fieldName: fieldInfo.fieldName, val: newVal, orig: oldV, flags: (1 | 2), nested: null };
                        else if (fieldInfo.isPrimaryKey > 0 || fieldInfo.fieldType == 4 || fieldInfo.isNeedOriginal)
                            res = { fieldName: fieldInfo.fieldName, val: newVal, orig: oldV, flags: 2, nested: null };
                        else
                            res = { fieldName: fieldInfo.fieldName, val: null, orig: null, flags: 0, nested: null };
                    }
                    if (changedOnly) {
                        if (fieldInfo.fieldType == 5) {
                            if (res.nested.length > 0)
                                return res;
                            else
                                return null;
                        }
                        else if ((res.flags & 1) === 1)
                            return res;
                        else
                            return null;
                    }
                    else {
                        return res;
                    }
                };
                EntityAspect.prototype._getValueChanges = function (changedOnly) {
                    var self = this, flds = this.dbSet.getFieldInfos();
                    var res = flds.map(function (fld) {
                        return self._getValueChange(fld.fieldName, fld, changedOnly);
                    });
                    var res2 = res.filter(function (vc) {
                        return !!vc;
                    });
                    return res2;
                };
                EntityAspect.prototype._fldChanging = function (fieldName, fieldInfo, oldV, newV) {
                    if (!this._origVals) {
                        this._origVals = utils.cloneObj(this._vals);
                    }
                    return true;
                };
                EntityAspect.prototype._skipValidate = function (fieldInfo, val) {
                    var childToParentNames = this.dbSet._getInternal().getChildToParentNames(fieldInfo.fieldName), res = false;
                    if (!!childToParentNames && val === null) {
                        for (var i = 0, len = childToParentNames.length; i < len; i += 1) {
                            res = !!this._getFieldVal(childToParentNames[i]);
                            if (res)
                                break;
                        }
                    }
                    return res;
                };
                EntityAspect.prototype._beginEdit = function () {
                    if (!_super.prototype._beginEdit.call(this))
                        return false;
                    this._savedStatus = this.status;
                    return true;
                };
                EntityAspect.prototype._endEdit = function () {
                    if (!_super.prototype._endEdit.call(this))
                        return false;
                    this._savedStatus = null;
                    return true;
                };
                EntityAspect.prototype._cancelEdit = function () {
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
                };
                EntityAspect.prototype.getDbSet = function () {
                    return this.dbSet;
                };
                EntityAspect.prototype.setStatus = function (v) {
                    if (this._status !== v) {
                        var oldStatus = this._status;
                        this._status = v;
                        if (v !== 0)
                            this.dbSet._getInternal().addToChanged(this.getItem());
                        else
                            this.dbSet._getInternal().removeFromChanged(this.key);
                        this.dbSet._getInternal().onItemStatusChanged(this.getItem(), oldStatus);
                    }
                };
                EntityAspect.prototype._updateKeys = function (srvKey) {
                    this.__srvKey = srvKey;
                    this.key = srvKey;
                };
                EntityAspect.prototype._checkCanRefresh = function () {
                    if (this.key === null || this.status === 1) {
                        throw new Error(RIAPP.ERRS.ERR_OPER_REFRESH_INVALID);
                    }
                };
                EntityAspect.prototype._refreshValue = function (val, fullName, refreshMode) {
                    var self = this, fld = self.dbSet.getFieldInfo(fullName);
                    if (!fld)
                        throw new Error(baseUtils.format(RIAPP.ERRS.ERR_DBSET_INVALID_FIELDNAME, self.dbSetName, fullName));
                    var stz = self.serverTimezone, newVal, oldVal, oldValOrig, dataType = fld.dataType, dcnv = fld.dateConversion;
                    newVal = valueUtils.parseValue(val, dataType, dcnv, stz);
                    oldVal = baseUtils.getValue(self._vals, fullName);
                    switch (refreshMode) {
                        case 3:
                            {
                                if (!valueUtils.compareVals(newVal, oldVal, dataType)) {
                                    baseUtils.setValue(self._vals, fullName, newVal, false);
                                    self._onFieldChanged(fullName, fld);
                                }
                            }
                            break;
                        case 1:
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
                        case 2:
                            {
                                if (!!self._origVals) {
                                    oldValOrig = baseUtils.getValue(self._origVals, fullName);
                                    baseUtils.setValue(self._origVals, fullName, newVal, false);
                                }
                                if (oldValOrig === undefined || valueUtils.compareVals(oldValOrig, oldVal, dataType)) {
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
                };
                EntityAspect.prototype._refreshValues = function (rowInfo, refreshMode) {
                    var self = this, oldStatus = this.status;
                    if (!this._isDestroyed) {
                        if (!refreshMode) {
                            refreshMode = 1;
                        }
                        rowInfo.values.forEach(function (val) {
                            fn_traverseChanges(val, function (fullName, vc) {
                                if (!((vc.flags & 4) === 4))
                                    return;
                                self._refreshValue(vc.val, fullName, refreshMode);
                            });
                        });
                        if (oldStatus === 2) {
                            var changes = this._getValueChanges(true);
                            if (changes.length === 0) {
                                this._origVals = null;
                                this.setStatus(0);
                            }
                        }
                    }
                };
                EntityAspect.prototype._getRowInfo = function () {
                    var res = {
                        values: this._getValueChanges(false),
                        changeType: this.status,
                        serverKey: this._srvKey,
                        clientKey: this.key,
                        error: null
                    };
                    return res;
                };
                EntityAspect.prototype._getCalcFieldVal = function (fieldName) {
                    if (this._isDestroyCalled)
                        return null;
                    return this.dbSet._getInternal().getCalcFieldVal(fieldName, this.getItem());
                };
                EntityAspect.prototype._getNavFieldVal = function (fieldName) {
                    if (this._isDestroyCalled) {
                        return null;
                    }
                    return this.dbSet._getInternal().getNavFieldVal(fieldName, this.getItem());
                };
                EntityAspect.prototype._setNavFieldVal = function (fieldName, value) {
                    var dbSet = this.dbSet;
                    dbSet._getInternal().setNavFieldVal(fieldName, this.getItem(), value);
                };
                EntityAspect.prototype._clearFieldVal = function (fieldName) {
                    baseUtils.setValue(this._vals, fieldName, null, false);
                };
                EntityAspect.prototype._getFieldVal = function (fieldName) {
                    if (this._isDestroyCalled)
                        return null;
                    return baseUtils.getValue(this._vals, fieldName);
                };
                EntityAspect.prototype._setFieldVal = function (fieldName, val) {
                    var validation_error, error, dbSetName = this.dbSetName, dbSet = this.dbSet, ERRS = RIAPP.ERRS, oldV = this._getFieldVal(fieldName), newV = val, fieldInfo = this.getFieldInfo(fieldName), res = false;
                    if (!fieldInfo)
                        throw new Error(baseUtils.format(ERRS.ERR_DBSET_INVALID_FIELDNAME, dbSetName, fieldName));
                    if (!this._isEditing && !this.isUpdating)
                        this.beginEdit();
                    try {
                        newV = this._checkVal(fieldInfo, newV);
                        if (oldV != newV) {
                            if (this._fldChanging(fieldName, fieldInfo, oldV, newV)) {
                                baseUtils.setValue(this._vals, fieldName, newV, false);
                                if (!(fieldInfo.fieldType == 1 || fieldInfo.fieldType == 6)) {
                                    switch (this.status) {
                                        case 0:
                                            this.setStatus(2);
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
                    }
                    catch (ex) {
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
                };
                EntityAspect.prototype._acceptChanges = function (rowInfo) {
                    var oldStatus = this.status, dbSet = this.dbSet, internal = dbSet._getInternal();
                    if (this.key === null)
                        return;
                    if (oldStatus !== 0) {
                        internal.onCommitChanges(this.getItem(), true, false, oldStatus);
                        if (oldStatus === 3) {
                            dbSet.removeItem(this.getItem());
                            return;
                        }
                        this._origVals = null;
                        if (!!this._saveVals)
                            this._saveVals = utils.cloneObj(this._vals);
                        this.setStatus(0);
                        internal.removeAllErrors(this.getItem());
                        if (!!rowInfo)
                            this._refreshValues(rowInfo, 3);
                        internal.onCommitChanges(this.getItem(), false, false, oldStatus);
                    }
                };
                EntityAspect.prototype._onAttaching = function () {
                    _super.prototype._onAttaching.call(this);
                    this._status = 1;
                };
                EntityAspect.prototype._onAttach = function () {
                    _super.prototype._onAttach.call(this);
                    if (this.key === null)
                        throw new Error(RIAPP.ERRS.ERR_ITEM_IS_DETACHED);
                    this.dbSet._getInternal().addToChanged(this.getItem());
                };
                EntityAspect.prototype.deleteItem = function () {
                    return this.deleteOnSubmit();
                };
                EntityAspect.prototype.deleteOnSubmit = function () {
                    var oldStatus = this.status, dbSet = this.dbSet, args = { item: this.getItem(), isCancel: false };
                    dbSet._getInternal().onItemDeleting(args);
                    if (args.isCancel) {
                        return false;
                    }
                    if (this.key === null)
                        return false;
                    if (oldStatus === 1) {
                        dbSet.removeItem(this.getItem());
                        return true;
                    }
                    this.setStatus(3);
                    return true;
                };
                EntityAspect.prototype.acceptChanges = function () {
                    this._acceptChanges(null);
                };
                EntityAspect.prototype.rejectChanges = function () {
                    var self = this, oldStatus = self.status, dbSet = self.dbSet, internal = dbSet._getInternal();
                    if (!self.key)
                        return;
                    if (oldStatus !== 0) {
                        internal.onCommitChanges(self.getItem(), true, true, oldStatus);
                        if (oldStatus === 1) {
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
                        self.setStatus(0);
                        internal.removeAllErrors(this.getItem());
                        changes.forEach(function (v) {
                            fn_traverseChanges(v, function (fullName, vc) {
                                self._onFieldChanged(fullName, dbSet.getFieldInfo(fullName));
                            });
                        });
                        internal.onCommitChanges(this.getItem(), false, true, oldStatus);
                    }
                };
                EntityAspect.prototype.submitChanges = function () {
                    var dbxt = this.dbSet.dbContext, uniqueID = utils.uuid();
                    dbxt.addOnSubmitError(function (sender, args) {
                        if (args.error instanceof db.SubmitError) {
                            var submitErr = args.error;
                            if (submitErr.notValidated.length > 0) {
                                args.isHandled = true;
                            }
                        }
                    }, uniqueID);
                    var promise = dbxt.submitChanges();
                    promise.always(function () {
                        dbxt.removeOnSubmitError(uniqueID);
                    });
                    return promise;
                };
                EntityAspect.prototype.refresh = function () {
                    var dbxt = this.dbSet.dbContext;
                    return dbxt._getInternal().refreshItem(this.getItem());
                };
                EntityAspect.prototype.getItem = function () {
                    return this._item;
                };
                EntityAspect.prototype.toString = function () {
                    return 'EntityAspect';
                };
                EntityAspect.prototype.destroy = function () {
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
                    _super.prototype.destroy.call(this);
                    this._item = null;
                };
                Object.defineProperty(EntityAspect.prototype, "_entityType", {
                    get: function () { return this.dbSet.entityType; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(EntityAspect.prototype, "_srvKey", {
                    get: function () { return this.__srvKey; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(EntityAspect.prototype, "isCanSubmit", {
                    get: function () { return true; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(EntityAspect.prototype, "isNew", {
                    get: function () { return this._status === 1; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(EntityAspect.prototype, "isDeleted", {
                    get: function () { return this._status === 3; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(EntityAspect.prototype, "dbSetName", {
                    get: function () { return this.dbSet.dbSetName; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(EntityAspect.prototype, "serverTimezone", {
                    get: function () { return this.dbSet.dbContext.serverTimezone; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(EntityAspect.prototype, "dbSet", {
                    get: function () { return this.collection; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(EntityAspect.prototype, "isRefreshing", {
                    get: function () { return this._isRefreshing; },
                    set: function (v) {
                        if (this._isRefreshing !== v) {
                            this._isRefreshing = v;
                            this.raisePropertyChanged(PROP_NAME.isRefreshing);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(EntityAspect.prototype, "isCached", {
                    get: function () { return this._isCached; },
                    set: function (v) { this._isCached = v; },
                    enumerable: true,
                    configurable: true
                });
                return EntityAspect;
            })(collMOD.ItemAspect);
            db.EntityAspect = EntityAspect;
            var DBSET_EVENTS = {
                loaded: 'loaded'
            };
            var DbSet = (function (_super) {
                __extends(DbSet, _super);
                function DbSet(opts, entityType) {
                    _super.call(this);
                    var self = this, dbContext = opts.dbContext, dbSetInfo = opts.dbSetInfo, fieldInfos = dbSetInfo.fieldInfos;
                    this._dbContext = dbContext;
                    this._options.dbSetName = dbSetInfo.dbSetName;
                    this._options.enablePaging = dbSetInfo.enablePaging;
                    this._options.pageSize = dbSetInfo.pageSize;
                    this._query = null;
                    this._entityType = entityType;
                    this._isSubmitOnDelete = false;
                    this._navfldMap = {};
                    this._calcfldMap = {};
                    this._fieldInfos = fieldInfos;
                    this._trackAssoc = {};
                    this._trackAssocMap = {};
                    this._childAssocMap = {};
                    this._parentAssocMap = {};
                    this._changeCount = 0;
                    this._changeCache = {};
                    this._ignorePageChanged = false;
                    fieldInfos.forEach(function (f) {
                        self._fieldMap[f.fieldName] = f;
                        collMOD.fn_traverseField(f, function (fullName, fld) {
                            fld.dependents = [];
                            fld.fullName = fullName;
                        });
                    });
                    fieldInfos.forEach(function (f) {
                        collMOD.fn_traverseField(f, function (fullName, fld) {
                            if (fld.fieldType == 3) {
                                self._navfldMap[fld.fieldName] = self._doNavigationField(opts, fld);
                            }
                            else if (fld.fieldType == 2) {
                                baseUtils.setValue(self._calcfldMap, fullName, self._doCalculatedField(opts, fld), true);
                            }
                        });
                    });
                    self._mapAssocFields();
                    Object.freeze(this._perms);
                    var internalObj = {
                        getCalcFieldVal: function (fieldName, item) {
                            return self._getCalcFieldVal(fieldName, item);
                        },
                        getNavFieldVal: function (fieldName, item) {
                            return self._getNavFieldVal(fieldName, item);
                        },
                        setNavFieldVal: function (fieldName, item, value) {
                            self._setNavFieldVal(fieldName, item, value);
                        },
                        beforeLoad: function (query, oldQuery) {
                            self._beforeLoad(query, oldQuery);
                        },
                        updatePermissions: function (perms) {
                            self._updatePermissions(perms);
                        },
                        getChildToParentNames: function (childFieldName) {
                            return self._getChildToParentNames(childFieldName);
                        },
                        fillFromService: function (data) {
                            return self._fillFromService(data);
                        },
                        fillFromCache: function (data) {
                            return self._fillFromCache(data);
                        },
                        commitChanges: function (rows) {
                            self._commitChanges(rows);
                        },
                        setItemInvalid: function (row) {
                            return self._setItemInvalid(row);
                        },
                        getChanges: function () {
                            return self._getChanges();
                        },
                        getTrackAssocInfo: function () {
                            return self._getTrackAssocInfo();
                        },
                        addToChanged: function (item) {
                            self._addToChanged(item);
                        },
                        removeFromChanged: function (key) {
                            self._removeFromChanged(key);
                        },
                        onItemStatusChanged: function (item, oldStatus) {
                            self._onItemStatusChanged(item, oldStatus);
                        }
                    };
                    utils.mergeObj(internalObj, this._internal);
                }
                DbSet.prototype.handleError = function (error, source) {
                    return this.dbContext.handleError(error, source);
                };
                DbSet.prototype._getEventNames = function () {
                    var base_events = _super.prototype._getEventNames.call(this);
                    return [DBSET_EVENTS.loaded].concat(base_events);
                };
                DbSet.prototype._mapAssocFields = function () {
                    var trackAssoc = this._trackAssoc, assoc, tasKeys = Object.keys(trackAssoc), frel, trackAssocMap = this._trackAssocMap;
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
                };
                DbSet.prototype._doNavigationField = function (opts, fieldInfo) {
                    var self = this, isChild = true, result = { getFunc: function (item) { throw new Error('Function is not implemented'); }, setFunc: function (v) { throw new Error('Function is not implemented'); } };
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
                        result.getFunc = function (item) {
                            var assoc = self.dbContext.getAssociation(assocName);
                            return assoc.getParentItem(item);
                        };
                        if (!fieldInfo.isReadOnly) {
                            self._trackAssoc[assocName] = assocs[0];
                            result.setFunc = function (v) {
                                var entity = this, i, len, assoc = self.dbContext.getAssociation(assocName);
                                if (!!v && !(v instanceof assoc.parentDS.entityType)) {
                                    throw new Error(baseUtils.format(RIAPP.ERRS.ERR_PARAM_INVALID_TYPE, 'value', assoc.parentDS.dbSetName));
                                }
                                if (!!v && !!v._aspect && v._aspect.isNew) {
                                    entity._aspect._setFieldVal(fieldInfo.fieldName, v._key);
                                }
                                else if (!!v) {
                                    for (i = 0, len = assoc.childFldInfos.length; i < len; i += 1) {
                                        entity[assoc.childFldInfos[i].fieldName] = v[assoc.parentFldInfos[i].fieldName];
                                    }
                                }
                                else {
                                    var oldKey = entity._aspect._getFieldVal(fieldInfo.fieldName);
                                    if (!!oldKey) {
                                        entity._aspect._setFieldVal(fieldInfo.fieldName, null);
                                    }
                                    for (i = 0, len = assoc.childFldInfos.length; i < len; i += 1) {
                                        entity[assoc.childFldInfos[i].fieldName] = null;
                                    }
                                }
                            };
                        }
                    }
                    else {
                        self._parentAssocMap[assocs[0].parentToChildrenName] = assocs[0];
                        result.getFunc = function (item) {
                            return self.dbContext.getAssociation(assocName).getChildItems(item);
                        };
                    }
                    return result;
                };
                DbSet.prototype._doCalculatedField = function (opts, fieldInfo) {
                    var self = this, result = { getFunc: function (item) { throw new Error(utils.format("Calculated field:'{0}' is not initialized", fieldInfo.fieldName)); } };
                    function doDependences(info) {
                        if (!info.dependentOn)
                            return;
                        var deps = info.dependentOn.split(',');
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
                    }
                    ;
                    fieldInfo.isReadOnly = true;
                    if (!!fieldInfo.dependentOn) {
                        doDependences(fieldInfo);
                    }
                    return result;
                };
                DbSet.prototype._refreshValues = function (path, item, values, names, rm) {
                    var self = this;
                    values.forEach(function (value, index) {
                        var name = names[index], fieldName = path + name.n, fld = self.getFieldInfo(fieldName);
                        if (!fld)
                            throw new Error(baseUtils.format(RIAPP.ERRS.ERR_DBSET_INVALID_FIELDNAME, self.dbSetName, fieldName));
                        if (fld.fieldType == 5) {
                            self._refreshValues(fieldName + '.', item, value, name.p, rm);
                        }
                        else {
                            item._aspect._refreshValue(value, fieldName, rm);
                        }
                    });
                };
                DbSet.prototype._setCurrentItem = function (v) {
                    if (!!v && !(v instanceof this._entityType)) {
                        throw new Error(baseUtils.format(RIAPP.ERRS.ERR_PARAM_INVALID_TYPE, 'currentItem', this._options.dbSetName));
                    }
                    _super.prototype._setCurrentItem.call(this, v);
                };
                DbSet.prototype._getNewKey = function (item) {
                    var key = 'clkey_' + this._newKey;
                    this._newKey += 1;
                    return key;
                };
                DbSet.prototype._createNew = function () {
                    var aspect = new EntityAspect(this, this._entityType, null, null);
                    var item = aspect.getItem();
                    aspect.key = this._getNewKey(item);
                    return item;
                };
                DbSet.prototype._clearChangeCache = function () {
                    var old = this._changeCount;
                    this._changeCache = {};
                    this._changeCount = 0;
                    if (old !== this._changeCount)
                        this.raisePropertyChanged(PROP_NAME.isHasChanges);
                };
                DbSet.prototype._onPageChanging = function () {
                    var res = _super.prototype._onPageChanging.call(this);
                    if (!res) {
                        return res;
                    }
                    if (this.isHasChanges) {
                        this.rejectChanges();
                    }
                    return res;
                };
                DbSet.prototype._onPageChanged = function () {
                    this.cancelEdit();
                    _super.prototype._onPageChanged.call(this);
                    if (this._ignorePageChanged)
                        return;
                    this.query.pageIndex = this.pageIndex;
                    this.dbContext._getInternal().load(this.query, true);
                };
                DbSet.prototype._onPageSizeChanged = function () {
                    _super.prototype._onPageSizeChanged.call(this);
                    if (!!this._query)
                        this._query.pageSize = this.pageSize;
                };
                DbSet.prototype._defineCalculatedField = function (fullName, getFunc) {
                    var calcDef = baseUtils.getValue(this._calcfldMap, fullName);
                    if (!calcDef) {
                        throw new Error(baseUtils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'calculated fieldName', fullName));
                    }
                    calcDef.getFunc = getFunc;
                };
                DbSet.prototype._onLoaded = function (items) {
                    this.raiseEvent(DBSET_EVENTS.loaded, { items: items });
                };
                DbSet.prototype._getStrValue = function (val, fieldInfo) {
                    var dcnv = fieldInfo.dateConversion, stz = this.dbContext.serverTimezone;
                    return valueUtils.stringifyValue(val, dcnv, fieldInfo.dataType, stz);
                };
                DbSet.prototype._getCalcFieldVal = function (fieldName, item) {
                    var val = baseUtils.getValue(this._calcfldMap, fieldName);
                    return val.getFunc.call(item, item);
                };
                DbSet.prototype._getNavFieldVal = function (fieldName, item) {
                    var val = baseUtils.getValue(this._navfldMap, fieldName);
                    return val.getFunc.call(item, item);
                };
                DbSet.prototype._setNavFieldVal = function (fieldName, item, value) {
                    var val = baseUtils.getValue(this._navfldMap, fieldName);
                    val.setFunc.call(item, value);
                };
                DbSet.prototype._beforeLoad = function (query, oldQuery) {
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
                };
                DbSet.prototype._updatePermissions = function (perms) {
                    this._perms = perms;
                };
                DbSet.prototype._getChildToParentNames = function (childFieldName) { return this._trackAssocMap[childFieldName]; };
                DbSet.prototype._fillFromService = function (data) {
                    data = utils.extend(false, {
                        res: { names: [], rows: [], pageIndex: null, pageCount: null, dbSetName: this.dbSetName, totalCount: null },
                        isPageChanged: false,
                        fn_beforeFillEnd: null
                    }, data);
                    var self = this, res = data.res, fieldNames = res.names, rows = res.rows || [], rowCount = rows.length, newItems = [], positions = [], items = [], selectedItems = [], fetchedItems = [], isPagingEnabled = this.isPagingEnabled, query = this.query, clearAll = true, dataCache;
                    this._onFillStart({ isBegin: true, rowCount: rowCount, time: new Date(), isPageChanged: data.isPageChanged });
                    try {
                        if (!!query) {
                            clearAll = query.isClearPrevData;
                            if (query.isClearCacheOnEveryLoad)
                                query._getInternal().clearCache();
                            if (clearAll)
                                this.clear();
                            query._getInternal().reindexCache();
                            if (query.loadPageCount > 1 && isPagingEnabled) {
                                dataCache = query._getInternal().getCache();
                                if (query.isIncludeTotalCount && !utils.check.isNt(res.totalCount))
                                    dataCache.totalCount = res.totalCount;
                            }
                        }
                        fetchedItems = rows.map(function (row) {
                            var key = row.k;
                            if (!key)
                                throw new Error(RIAPP.ERRS.ERR_KEY_IS_EMPTY);
                            var item = self._itemsByKey[key], aspect;
                            if (!item) {
                                if (!!dataCache) {
                                    item = dataCache.getItemByKey(key);
                                }
                                if (!item) {
                                    aspect = new EntityAspect(self, self._entityType, row, fieldNames);
                                    item = aspect.getItem();
                                }
                                else {
                                    self._refreshValues('', item, row.v, fieldNames, 1);
                                }
                            }
                            else {
                                self._refreshValues('', item, row.v, fieldNames, 1);
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
                                    selectedItems = page.items;
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
                            this._onCollectionChanged({ changeType: 1, items: newItems, pos: positions });
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
                    return { fetchedItems: items, newItems: newItems, isPageChanged: data.isPageChanged, outOfBandData: data.res.extraInfo };
                };
                DbSet.prototype._fillFromCache = function (data) {
                    data = utils.extend(false, {
                        isPageChanged: false,
                        fn_beforeFillEnd: null
                    }, data);
                    var self = this, positions = [], fetchedItems = [], query = this.query;
                    if (!query)
                        throw new Error(utils.format(RIAPP.ERRS.ERR_ASSERTION_FAILED, 'query is not null'));
                    var dataCache = query._getInternal().getCache(), cachedPage = dataCache.getCachedPage(query.pageIndex), items = !cachedPage ? [] : cachedPage.items;
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
                            this._onCollectionChanged({ changeType: 1, items: fetchedItems, pos: positions });
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
                };
                DbSet.prototype._commitChanges = function (rows) {
                    var self = this;
                    rows.forEach(function (rowInfo) {
                        var key = rowInfo.clientKey, item = self._itemsByKey[key];
                        if (!item) {
                            throw new Error(baseUtils.format(RIAPP.ERRS.ERR_KEY_IS_NOTFOUND, key));
                        }
                        var itemStatus = item._aspect.status;
                        item._aspect._acceptChanges(rowInfo);
                        if (itemStatus === 1) {
                            delete self._itemsByKey[key];
                            item._aspect._updateKeys(rowInfo.serverKey);
                            self._itemsByKey[item._key] = item;
                            self._onCollectionChanged({
                                changeType: 3,
                                items: [item],
                                old_key: key,
                                new_key: item._key
                            });
                        }
                    });
                };
                DbSet.prototype._setItemInvalid = function (row) {
                    var keyMap = this._itemsByKey, item = keyMap[row.clientKey];
                    var errors = {};
                    row.invalid.forEach(function (err) {
                        if (!err.fieldName)
                            err.fieldName = '*';
                        if (!!errors[err.fieldName]) {
                            errors[err.fieldName].push(err.message);
                        }
                        else
                            errors[err.fieldName] = [err.message];
                    });
                    var res = [];
                    utils.forEachProp(errors, function (fieldName) {
                        res.push({ fieldName: fieldName, errors: errors[fieldName] });
                    });
                    this._addErrors(item, res);
                    return item;
                };
                DbSet.prototype._getChanges = function () {
                    var changes = [];
                    var csh = this._changeCache;
                    utils.forEachProp(csh, function (key) {
                        var item = csh[key];
                        changes.push(item._aspect._getRowInfo());
                    });
                    return changes;
                };
                DbSet.prototype._getTrackAssocInfo = function () {
                    var self = this, res = [];
                    var csh = this._changeCache, assocNames = Object.keys(self._trackAssoc);
                    utils.forEachProp(csh, function (key) {
                        var item = csh[key];
                        assocNames.forEach(function (assocName) {
                            var assocInfo = self._trackAssoc[assocName], parentKey = item._aspect._getFieldVal(assocInfo.childToParentName), childKey = item._key;
                            if (!!parentKey && !!childKey) {
                                res.push({ assocName: assocName, parentKey: parentKey, childKey: childKey });
                            }
                        });
                    });
                    return res;
                };
                DbSet.prototype._addToChanged = function (item) {
                    if (item._key === null)
                        return;
                    if (!this._changeCache[item._key]) {
                        this._changeCache[item._key] = item;
                        this._changeCount += 1;
                        if (this._changeCount === 1)
                            this.raisePropertyChanged(PROP_NAME.isHasChanges);
                    }
                };
                DbSet.prototype._removeFromChanged = function (key) {
                    if (key === null)
                        return;
                    if (!!this._changeCache[key]) {
                        delete this._changeCache[key];
                        this._changeCount -= 1;
                        if (this._changeCount === 0)
                            this.raisePropertyChanged(PROP_NAME.isHasChanges);
                    }
                };
                DbSet.prototype._onItemStatusChanged = function (item, oldStatus) {
                    _super.prototype._onItemStatusChanged.call(this, item, oldStatus);
                    if (item._aspect.isDeleted && this.isSubmitOnDelete) {
                        this.dbContext.submitChanges();
                    }
                };
                DbSet.prototype._onRemoved = function (item, pos) {
                    this._removeFromChanged(item._key);
                    _super.prototype._onRemoved.call(this, item, pos);
                };
                DbSet.prototype._getInternal = function () {
                    return this._internal;
                };
                DbSet.prototype.addOnLoaded = function (fn, nmspace, context) {
                    this._addHandler(DBSET_EVENTS.loaded, fn, nmspace, context, false);
                };
                DbSet.prototype.removeOnLoaded = function (nmspace) {
                    this._removeHandler(DBSET_EVENTS.loaded, nmspace);
                };
                DbSet.prototype.getFieldInfo = function (fieldName) {
                    var assoc, parentDB, parts = fieldName.split('.');
                    var fld = this._fieldMap[parts[0]];
                    if (parts.length == 1) {
                        return fld;
                    }
                    if (fld.fieldType == 5) {
                        for (var i = 1; i < parts.length; i += 1) {
                            fld = collMOD.fn_getPropertyByName(parts[i], fld.nested);
                        }
                        return fld;
                    }
                    else if (fld.fieldType == 3) {
                        assoc = this._childAssocMap[fld.fieldName];
                        if (!!assoc) {
                            parentDB = this.dbContext.getDbSet(assoc.parentDbSetName);
                            return parentDB.getFieldInfo(parts.slice(1).join('.'));
                        }
                    }
                    throw new Error(baseUtils.format(RIAPP.ERRS.ERR_DBSET_INVALID_FIELDNAME, this.dbSetName, fieldName));
                };
                DbSet.prototype.sort = function (fieldNames, sortOrder) {
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
                        return _super.prototype.sort.call(this, fieldNames, sortOrder);
                    }
                };
                DbSet.prototype.fillItems = function (data) {
                    var res = utils.extend(false, {
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
                        fn_beforeFillEnd: null
                    };
                    this._fillFromService(filldata);
                };
                DbSet.prototype.acceptChanges = function () {
                    var csh = this._changeCache;
                    utils.forEachProp(csh, function (key) {
                        var item = csh[key];
                        item._aspect.acceptChanges();
                    });
                    this._changeCount = 0;
                };
                DbSet.prototype.rejectChanges = function () {
                    var csh = this._changeCache;
                    utils.forEachProp(csh, function (key) {
                        var item = csh[key];
                        item._aspect.rejectChanges();
                    });
                };
                DbSet.prototype.deleteOnSubmit = function (item) {
                    item._aspect.deleteOnSubmit();
                };
                DbSet.prototype.clear = function () {
                    this._clearChangeCache();
                    _super.prototype.clear.call(this);
                };
                DbSet.prototype.createQuery = function (name) {
                    var queryInfo = this.dbContext._getInternal().getQueryInfo(name);
                    if (!queryInfo) {
                        throw new Error(baseUtils.format(RIAPP.ERRS.ERR_QUERY_NAME_NOTFOUND, name));
                    }
                    return new DataQuery(this, queryInfo);
                };
                DbSet.prototype.clearCache = function () {
                    var query = this._query;
                    if (!!query) {
                        query._getInternal().clearCache();
                    }
                };
                DbSet.prototype.destroy = function () {
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
                    _super.prototype.destroy.call(this);
                };
                DbSet.prototype.toString = function () {
                    return this._options.dbSetName;
                };
                Object.defineProperty(DbSet.prototype, "items", {
                    get: function () { return this._items; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DbSet.prototype, "dbContext", {
                    get: function () {
                        return this._dbContext;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DbSet.prototype, "dbSetName", {
                    get: function () { return this._options.dbSetName; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DbSet.prototype, "entityType", {
                    get: function () { return this._entityType; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DbSet.prototype, "query", {
                    get: function () { return this._query; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DbSet.prototype, "isHasChanges", {
                    get: function () { return this._changeCount > 0; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DbSet.prototype, "cacheSize", {
                    get: function () {
                        var query = this._query, dataCache;
                        if (!!query && query.isCacheValid) {
                            dataCache = query._getInternal().getCache();
                            return dataCache.cacheSize;
                        }
                        return 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DbSet.prototype, "isSubmitOnDelete", {
                    get: function () { return this._isSubmitOnDelete; },
                    set: function (v) {
                        if (this._isSubmitOnDelete !== v) {
                            this._isSubmitOnDelete = !!v;
                            this.raisePropertyChanged(PROP_NAME.isSubmitOnDelete);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return DbSet;
            })(collMOD.BaseCollection);
            db.DbSet = DbSet;
            var TDbSet = (function (_super) {
                __extends(TDbSet, _super);
                function TDbSet() {
                    _super.apply(this, arguments);
                }
                return TDbSet;
            })(DbSet);
            db.TDbSet = TDbSet;
            var DbSets = (function (_super) {
                __extends(DbSets, _super);
                function DbSets(dbContext) {
                    _super.call(this);
                    this._dbContext = dbContext;
                    this._arrDbSets = [];
                    this._dbSets = {};
                    this._dbSetNames = [];
                }
                DbSets.prototype._dbSetCreated = function (dbSet) {
                    var self = this;
                    this._arrDbSets.push(dbSet);
                    dbSet.addOnPropertyChange(PROP_NAME.isHasChanges, function (sender, args) {
                        self._dbContext._getInternal().onDbSetHasChangesChanged(sender);
                    }, null);
                };
                DbSets.prototype._createDbSet = function (name, dbSetType) {
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
                };
                Object.defineProperty(DbSets.prototype, "dbSetNames", {
                    get: function () {
                        return this._dbSetNames;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DbSets.prototype, "arrDbSets", {
                    get: function () {
                        return this._arrDbSets;
                    },
                    enumerable: true,
                    configurable: true
                });
                DbSets.prototype.getDbSet = function (name) {
                    var f = this._dbSets[name];
                    if (!f)
                        throw new Error(baseUtils.format(RIAPP.ERRS.ERR_DBSET_NAME_INVALID, name));
                    return f();
                };
                DbSets.prototype.destroy = function () {
                    this._arrDbSets.forEach(function (dbSet) {
                        dbSet.destroy();
                    });
                    this._arrDbSets = [];
                    this._dbSets = null;
                    this._dbContext = null;
                    _super.prototype.destroy.call(this);
                };
                return DbSets;
            })(RIAPP.BaseObject);
            db.DbSets = DbSets;
            var DBCTX_EVENTS = {
                submit_err: 'submit_error'
            };
            var DbContext = (function (_super) {
                __extends(DbContext, _super);
                function DbContext() {
                    _super.call(this);
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
                        onItemRefreshed: function (res, item) {
                            self._onItemRefreshed(res, item);
                        },
                        refreshItem: function (item) {
                            return self._refreshItem(item);
                        },
                        getQueryInfo: function (name) {
                            return self._getQueryInfo(name);
                        },
                        onDbSetHasChangesChanged: function (eSet) {
                            self._onDbSetHasChangesChanged(eSet);
                        },
                        load: function (query, isPageChanged) {
                            return self._load(query, isPageChanged);
                        }
                    };
                }
                DbContext.prototype._getEventNames = function () {
                    var base_events = _super.prototype._getEventNames.call(this);
                    return [DBCTX_EVENTS.submit_err].concat(base_events);
                };
                DbContext.prototype._initDbSets = function () {
                    if (this._isInitialized)
                        throw new Error(RIAPP.ERRS.ERR_DOMAIN_CONTEXT_INITIALIZED);
                };
                DbContext.prototype._initAssociations = function (associations) {
                    var self = this;
                    associations.forEach(function (assoc) {
                        self._initAssociation(assoc);
                    });
                };
                DbContext.prototype._initMethods = function (methods) {
                    var self = this;
                    methods.forEach(function (info) {
                        if (info.isQuery)
                            self._queryInf[info.methodName] = info;
                        else {
                            self._initMethod(info);
                        }
                    });
                };
                DbContext.prototype._updatePermissions = function (info) {
                    var self = this;
                    this._serverTimezone = info.serverTimezone;
                    info.permissions.forEach(function (perms) {
                        self.getDbSet(perms.dbSetName)._getInternal().updatePermissions(perms);
                    });
                };
                DbContext.prototype._initAssociation = function (assoc) {
                    var self = this, options = {
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
                    this._assoc[name] = function () {
                        var t = new Association(options);
                        self._arrAssoc.push(t);
                        var f = function () {
                            return t;
                        };
                        self._assoc[name] = f;
                        return f();
                    };
                };
                DbContext.prototype._initMethod = function (methodInfo) {
                    var self = this;
                    this._svcMethods[methodInfo.methodName] = function (args) {
                        var deferred = utils.createDeferred();
                        var callback = function (res) {
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
                        }
                        catch (ex) {
                            if (!RIAPP.checkIsDummy(ex)) {
                                self.handleError(ex, self);
                                callback({ result: null, error: ex });
                            }
                        }
                        return deferred.promise();
                    };
                };
                DbContext.prototype._getMethodParams = function (methodInfo, args) {
                    var self = this, methodName = methodInfo.methodName, data = { methodName: methodName, paramInfo: { parameters: [] } };
                    var i, parameterInfos = methodInfo.parameters, len = parameterInfos.length, pinfo, val, value;
                    if (!args)
                        args = {};
                    for (i = 0; i < len; i += 1) {
                        pinfo = parameterInfos[i];
                        val = args[pinfo.name];
                        if (!pinfo.isNullable && !pinfo.isArray && !(pinfo.dataType == 1 || pinfo.dataType == 10) && utils.check.isNt(val)) {
                            throw new Error(utils.format(RIAPP.ERRS.ERR_SVC_METH_PARAM_INVALID, pinfo.name, val, methodInfo.methodName));
                        }
                        if (utils.check.isFunction(val)) {
                            throw new Error(utils.format(RIAPP.ERRS.ERR_SVC_METH_PARAM_INVALID, pinfo.name, val, methodInfo.methodName));
                        }
                        if (pinfo.isArray && !utils.check.isNt(val) && !utils.check.isArray(val)) {
                            val = [val];
                        }
                        value = null;
                        if (pinfo.dataType == 10 && utils.check.isArray(val)) {
                            value = JSON.stringify(val);
                        }
                        else if (utils.check.isArray(val)) {
                            var arr = new Array(val.length);
                            for (var k = 0; k < val.length; k += 1) {
                                arr[k] = valueUtils.stringifyValue(val[k], pinfo.dateConversion, pinfo.dataType, self.serverTimezone);
                            }
                            value = JSON.stringify(arr);
                        }
                        else
                            value = valueUtils.stringifyValue(val, pinfo.dateConversion, pinfo.dataType, self.serverTimezone);
                        data.paramInfo.parameters.push({ name: pinfo.name, value: value });
                    }
                    return data;
                };
                DbContext.prototype._invokeMethod = function (methodInfo, data, callback) {
                    var self = this, operType = 2, postData, invokeUrl;
                    var fn_onComplete = function (res) {
                        try {
                            if (!res)
                                throw new Error(utils.format(RIAPP.ERRS.ERR_UNEXPECTED_SVC_ERROR, 'operation result is undefined'));
                            __checkError(res.error, operType);
                            callback({ result: res.result, error: null });
                        }
                        catch (ex) {
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
                        utils.performAjaxCall(invokeUrl, postData, true, function (res) {
                            fn_onComplete(JSON.parse(res));
                            self.isBusy = false;
                        }, function (er) {
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
                };
                DbContext.prototype._loadFromCache = function (query, isPageChanged) {
                    var operType = 1, dbSet = query.dbSet, methRes;
                    try {
                        methRes = dbSet._getInternal().fillFromCache({ isPageChanged: isPageChanged, fn_beforeFillEnd: null });
                    }
                    catch (ex) {
                        if (RIAPP.checkIsDummy(ex)) {
                            RIAPP.throwDummy(ex);
                        }
                        this._onDataOperError(ex, operType);
                        RIAPP.throwDummy(ex);
                    }
                    return methRes;
                };
                DbContext.prototype._loadIncluded = function (res) {
                    var self = this, hasIncluded = !!res.included && res.included.length > 0;
                    if (!hasIncluded)
                        return;
                    res.included.forEach(function (subset) {
                        var dbSet = self.getDbSet(subset.dbSetName);
                        dbSet.fillItems(subset);
                    });
                };
                DbContext.prototype._onLoaded = function (res, isPageChanged) {
                    var self = this, operType = 1, dbSetName, dbSet, loadRes;
                    try {
                        if (!res)
                            throw new Error(baseUtils.format(RIAPP.ERRS.ERR_UNEXPECTED_SVC_ERROR, 'null result'));
                        dbSetName = res.dbSetName;
                        dbSet = self.getDbSet(dbSetName);
                        if (!dbSet)
                            throw new Error(baseUtils.format(RIAPP.ERRS.ERR_DBSET_NAME_INVALID, dbSetName));
                        __checkError(res.error, operType);
                        loadRes = dbSet._getInternal().fillFromService({
                            res: res,
                            isPageChanged: isPageChanged,
                            fn_beforeFillEnd: function () {
                                self._loadIncluded(res);
                            }
                        });
                    }
                    catch (ex) {
                        if (RIAPP.checkIsDummy(ex)) {
                            RIAPP.throwDummy(ex);
                        }
                        this._onDataOperError(ex, operType);
                        RIAPP.throwDummy(ex);
                    }
                    return loadRes;
                };
                DbContext.prototype._dataSaved = function (res) {
                    var self = this, submitted = [], notvalid = [];
                    try {
                        try {
                            __checkError(res.error, 0);
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
                };
                DbContext.prototype._getChanges = function () {
                    var changeSet = { dbSets: [], error: null, trackAssocs: [] };
                    this._dbSets.arrDbSets.forEach(function (eSet) {
                        eSet.endEdit();
                        var changes = eSet._getInternal().getChanges();
                        if (changes.length === 0)
                            return;
                        var trackAssoc = eSet._getInternal().getTrackAssocInfo();
                        var jsDB = { dbSetName: eSet.dbSetName, rows: changes };
                        changeSet.dbSets.push(jsDB);
                        changeSet.trackAssocs = changeSet.trackAssocs.concat(trackAssoc);
                    });
                    return changeSet;
                };
                DbContext.prototype._getUrl = function (action) {
                    var loadUrl = this.service_url;
                    if (!utils.str.endsWith(loadUrl, '/'))
                        loadUrl = loadUrl + '/';
                    loadUrl = loadUrl + [action, ''].join('/');
                    return loadUrl;
                };
                DbContext.prototype.handleError = function (error, source) {
                    var isHandled = _super.prototype.handleError.call(this, error, source);
                    if (!isHandled) {
                        return RIAPP.global.handleError(error, source);
                    }
                    return isHandled;
                };
                DbContext.prototype._onDataOperError = function (ex, oper) {
                    if (RIAPP.checkIsDummy(ex))
                        return true;
                    var er;
                    if (ex instanceof DataOperationError)
                        er = ex;
                    else
                        er = new DataOperationError(ex, oper);
                    return this.handleError(er, this);
                };
                DbContext.prototype._onSubmitError = function (error) {
                    var args = { error: error, isHandled: false };
                    this.raiseEvent(DBCTX_EVENTS.submit_err, args);
                    if (!args.isHandled) {
                        this.rejectChanges();
                        this._onDataOperError(error, 0);
                    }
                };
                DbContext.prototype.waitForNotBusy = function (callback, callbackArgs) {
                    this._waitQueue.enQueue({
                        prop: PROP_NAME.isBusy,
                        groupName: null,
                        predicate: function (val) {
                            return !val;
                        },
                        action: callback,
                        actionArgs: callbackArgs
                    });
                };
                DbContext.prototype.waitForNotSubmiting = function (callback, callbackArgs, groupName) {
                    this._waitQueue.enQueue({
                        prop: PROP_NAME.isSubmiting,
                        predicate: function (val) {
                            return !val;
                        },
                        action: callback,
                        actionArgs: callbackArgs,
                        groupName: groupName,
                        lastWins: !!groupName
                    });
                };
                DbContext.prototype.waitForInitialized = function (callback, callbackArgs) {
                    this._waitQueue.enQueue({
                        prop: PROP_NAME.isInitialized,
                        groupName: 'dbContext',
                        predicate: function (val) {
                            return !!val;
                        },
                        action: callback,
                        actionArgs: callbackArgs
                    });
                };
                DbContext.prototype._loadInternal = function (context) {
                    var self = this, oldQuery = context.dbSet.query, loadRes, range, pageCount = 1, pageIndex = context.pageIndex, loadPageCount = context.loadPageCount, isPagingEnabled = context.isPagingEnabled;
                    context.fn_onStart();
                    try {
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
                        var requestInfo = {
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
                        function fn_deserialize(res) {
                            var parts = [], matches, header_size;
                            matches = res.match(HEAD_MARK_RX);
                            if (!!matches) {
                                header_size = parseInt(matches[1]);
                                parts.push(res.substr(matches[0].length, header_size));
                                parts.push(res.substr(matches[0].length + header_size));
                            }
                            else {
                                parts.push(res);
                            }
                            var data = parts.map(function (txt) {
                                return JSON.parse(txt);
                            });
                            var response = data[0];
                            function fn_reassembleParts(response, allRows) {
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
                            }
                            ;
                            if (data.length > 1)
                                response = fn_reassembleParts(data[0], data[1]);
                            return response;
                        }
                        ;
                        utils.performAjaxCall(self._getUrl(DATA_SVC_METH.LoadData), JSON.stringify(requestInfo), true, function (res) {
                            try {
                                var response = fn_deserialize(res);
                                loadRes = self._onLoaded(response, context.isPageChanged);
                                context.fn_onOK(loadRes);
                            }
                            catch (ex) {
                                context.fn_onErr(ex);
                            }
                        }, function (er) {
                            context.fn_onErr2(er);
                        }, null);
                    }
                    catch (ex) {
                        context.fn_onErr(ex);
                    }
                };
                DbContext.prototype._onItemRefreshed = function (res, item) {
                    var operType = 3;
                    try {
                        __checkError(res.error, operType);
                        if (!res.rowInfo) {
                            item._aspect.dbSet.removeItem(item);
                            item._aspect.destroy();
                            throw new Error(RIAPP.ERRS.ERR_ITEM_DELETED_BY_ANOTHER_USER);
                        }
                        else
                            item._aspect._refreshValues(res.rowInfo, 2);
                    }
                    catch (ex) {
                        if (RIAPP.checkIsDummy(ex)) {
                            RIAPP.throwDummy(ex);
                        }
                        this._onDataOperError(ex, operType);
                        RIAPP.throwDummy(ex);
                    }
                };
                DbContext.prototype._refreshItem = function (item) {
                    var deferred = utils.createDeferred(), fn_onComplete = function (isOk) {
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
                        fn_onErr: function (ex) {
                            context.fn_onEnd();
                            self._onDataOperError(ex, 3);
                            fn_onComplete(false);
                        },
                        fn_onErr2: function (ex) {
                            context.fn_onEnd();
                            self._onDataOperError(ex, 3);
                            fn_onComplete(false);
                        },
                        fn_onOK: function (res) {
                            self._onItemRefreshed(res, item);
                            context.fn_onEnd();
                            fn_onComplete(true);
                        }
                    };
                    function fn_refresh(context) {
                        context.fn_onStart();
                        try {
                            var request = {
                                dbSetName: context.item._aspect.dbSetName,
                                rowInfo: context.item._aspect._getRowInfo(),
                                error: null
                            };
                            context.item._aspect._checkCanRefresh();
                            utils.performAjaxCall(self._getUrl(DATA_SVC_METH.Refresh), JSON.stringify(request), true, function (res) {
                                try {
                                    context.fn_onOK(JSON.parse(res));
                                }
                                catch (ex) {
                                    context.fn_onErr(ex);
                                }
                            }, function (er) {
                                context.fn_onErr2(er);
                            }, null);
                        }
                        catch (ex) {
                            context.fn_onErr(ex);
                        }
                    }
                    ;
                    this.waitForNotSubmiting(function () {
                        context.dbSet.waitForNotLoading(function () { return fn_refresh(context); }, [], true, null);
                    }, [], null);
                    return deferred.promise();
                };
                DbContext.prototype._getQueryInfo = function (name) {
                    return this._queryInf[name];
                };
                DbContext.prototype._onDbSetHasChangesChanged = function (eSet) {
                    var old = this._isHasChanges, test;
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
                };
                DbContext.prototype._load = function (query, isPageChanged) {
                    if (!query) {
                        throw new Error(RIAPP.ERRS.ERR_DB_LOAD_NO_QUERY);
                    }
                    var self = this, deferred = utils.createDeferred(), fn_onComplete = function (isOk, res) {
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
                        fn_onOK: function (res) {
                            context.fn_onEnd();
                            fn_onComplete(true, res);
                        },
                        fn_onErr: function (ex) {
                            context.fn_onEnd();
                            self._onDataOperError(ex, 1);
                            fn_onComplete(false, null);
                        },
                        fn_onErr2: function (ex) {
                            context.fn_onEnd();
                            self._onDataOperError(ex, 1);
                            fn_onComplete(false, null);
                        }
                    };
                    this.waitForNotSubmiting(function () {
                        context.dbSet.waitForNotLoading(function () { return self._loadInternal(context); }, [], true, isPageChanged ? 'paging' : null);
                    }, [], isPageChanged ? 'paging' : null);
                    return deferred.promise();
                };
                DbContext.prototype.initialize = function (options) {
                    if (this._isInitialized)
                        return;
                    var self = this, opts = utils.extend(false, {
                        serviceUrl: null,
                        permissions: null
                    }, options), loadUrl, operType;
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
                        loadUrl = this._getUrl(DATA_SVC_METH.GetPermissions), operType = 4;
                    }
                    catch (ex) {
                        this.handleError(ex, this);
                        RIAPP.throwDummy(ex);
                    }
                    try {
                        this.isBusy = true;
                        utils.performAjaxGet(loadUrl).done(function (permissions) {
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
                        }).fail(function (er) {
                            self.isBusy = false;
                            self._onDataOperError(er, operType);
                        });
                    }
                    catch (ex) {
                        this.isBusy = false;
                        this._onDataOperError(ex, operType);
                        RIAPP.throwDummy(ex);
                    }
                };
                DbContext.prototype.addOnSubmitError = function (fn, nmspace, context) {
                    this._addHandler(DBCTX_EVENTS.submit_err, fn, nmspace, context);
                };
                DbContext.prototype.removeOnSubmitError = function (nmspace) {
                    this._removeHandler(DBCTX_EVENTS.submit_err, nmspace);
                };
                DbContext.prototype._getInternal = function () {
                    return this._internal;
                };
                DbContext.prototype.getDbSet = function (name) {
                    return this._dbSets.getDbSet(name);
                };
                DbContext.prototype.getAssociation = function (name) {
                    var name2 = "get" + name;
                    var f = this._assoc[name2];
                    if (!f)
                        throw new Error(baseUtils.format(RIAPP.ERRS.ERR_ASSOC_NAME_INVALID, name));
                    return f();
                };
                DbContext.prototype.submitChanges = function () {
                    if (!!this._pendingSubmit) {
                        return this._pendingSubmit.deferred.promise();
                    }
                    var self = this, submitState = { deferred: utils.createDeferred() };
                    var fn_onComplete = function (isOk) {
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
                            self._pendingSubmit = null;
                        },
                        fn_onEnd: function () {
                            self.isBusy = false;
                            self.isSubmiting = false;
                        },
                        fn_onErr: function (ex) {
                            context.fn_onEnd();
                            self._onDataOperError(ex, 0);
                            fn_onComplete(false);
                        },
                        fn_onErr2: function (ex) {
                            context.fn_onEnd();
                            self._onSubmitError(ex);
                            fn_onComplete(false);
                        },
                        fn_onOk: function () {
                            context.fn_onEnd();
                            fn_onComplete(true);
                        }
                    };
                    function fn_submit(context) {
                        var changeSet;
                        context.fn_onStart();
                        try {
                            changeSet = self._getChanges();
                            if (changeSet.dbSets.length === 0) {
                                context.fn_onOk();
                                return;
                            }
                            utils.performAjaxCall(self._getUrl(DATA_SVC_METH.Submit), JSON.stringify(changeSet), true, function (res) {
                                try {
                                    self._dataSaved(JSON.parse(res));
                                    context.fn_onOk();
                                }
                                catch (ex) {
                                    context.fn_onErr(ex);
                                }
                            }, function (er) {
                                context.fn_onErr2(er);
                            }, null);
                        }
                        catch (ex) {
                            context.fn_onErr(ex);
                        }
                    }
                    ;
                    this.waitForNotBusy(function () { return fn_submit(context); }, []);
                    return submitState.deferred.promise();
                };
                DbContext.prototype.load = function (query) {
                    return this._load(query, false);
                };
                DbContext.prototype.acceptChanges = function () {
                    this._dbSets.arrDbSets.forEach(function (eSet) {
                        eSet.acceptChanges();
                    });
                };
                DbContext.prototype.rejectChanges = function () {
                    this._dbSets.arrDbSets.forEach(function (eSet) {
                        eSet.rejectChanges();
                    });
                };
                DbContext.prototype.destroy = function () {
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
                    _super.prototype.destroy.call(this);
                };
                Object.defineProperty(DbContext.prototype, "service_url", {
                    get: function () { return this._serviceUrl; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DbContext.prototype, "isInitialized", {
                    get: function () { return this._isInitialized; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DbContext.prototype, "isBusy", {
                    get: function () { return this._isBusy > 0; },
                    set: function (v) {
                        var old = this._isBusy > 0, cur;
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
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DbContext.prototype, "isSubmiting", {
                    get: function () { return this._isSubmiting; },
                    set: function (v) {
                        if (this._isSubmiting !== v) {
                            this._isSubmiting = v;
                            this.raisePropertyChanged(PROP_NAME.isSubmiting);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DbContext.prototype, "serverTimezone", {
                    get: function () { return this._serverTimezone; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DbContext.prototype, "dbSets", {
                    get: function () { return this._dbSets; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DbContext.prototype, "serviceMethods", {
                    get: function () { return this._svcMethods; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DbContext.prototype, "isHasChanges", {
                    get: function () { return this._isHasChanges; },
                    enumerable: true,
                    configurable: true
                });
                return DbContext;
            })(RIAPP.BaseObject);
            db.DbContext = DbContext;
            var Association = (function (_super) {
                __extends(Association, _super);
                function Association(options) {
                    _super.call(this);
                    var self = this;
                    this._objId = 'ass' + baseUtils.getNewID();
                    var opts = utils.extend(false, {
                        dbContext: null,
                        parentName: '',
                        childName: '',
                        parentKeyFields: [],
                        childKeyFields: [],
                        parentToChildrenName: null,
                        childToParentName: null,
                        name: this._objId,
                        onDeleteAction: 0
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
                Association.prototype.handleError = function (error, source) {
                    var isHandled = _super.prototype.handleError.call(this, error, source);
                    if (!isHandled) {
                        return RIAPP.global.handleError(error, source);
                    }
                    return isHandled;
                };
                Association.prototype._bindParentDS = function () {
                    var self = this, ds = this._parentDS;
                    if (!ds)
                        return;
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
                };
                Association.prototype._bindChildDS = function () {
                    var self = this, ds = this._childDS;
                    if (!ds)
                        return;
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
                };
                Association.prototype._onParentCollChanged = function (args) {
                    var self = this, item, items = args.items, changed = [], changedKeys = {};
                    switch (args.changeType) {
                        case 2:
                            if (!self._isParentFilling)
                                changed = self.refreshParentMap();
                            break;
                        case 1:
                            if (!this._isParentFilling)
                                changed = self._mapParentItems(items);
                            break;
                        case 0:
                            items.forEach(function (item) {
                                var key = self._unMapParentItem(item);
                                if (!!key) {
                                    changedKeys[key] = null;
                                }
                            });
                            changed = Object.keys(changedKeys);
                            break;
                        case 3:
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
                };
                Association.prototype._onParentFill = function (args) {
                    var isEnd = !args.isBegin, self = this, changed;
                    if (isEnd) {
                        self._isParentFilling = false;
                        if (args.resetUI) {
                            changed = self.refreshParentMap();
                        }
                        else
                            changed = self._mapParentItems(args.newItems);
                        self._notifyParentChanged(changed);
                    }
                    else {
                        self._isParentFilling = true;
                    }
                };
                Association.prototype._onParentEdit = function (item, isBegin, isCanceled) {
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
                };
                Association.prototype._onParentCommitChanges = function (item, isBegin, isRejected, status) {
                    var self = this, fkey;
                    if (isBegin) {
                        if (isRejected && status === 1) {
                            fkey = this._unMapParentItem(item);
                            if (!!fkey)
                                self._notifyParentChanged([fkey]);
                            return;
                        }
                        else if (!isRejected && status === 3) {
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
                };
                Association.prototype._storeParentFKey = function (item) {
                    var self = this, fkey = self.getParentFKey(item);
                    if (fkey !== null && !!self._parentMap[fkey]) {
                        self._saveParentFKey = fkey;
                    }
                };
                Association.prototype._checkParentFKey = function (item) {
                    var self = this, fkey, savedKey = self._saveParentFKey;
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
                };
                Association.prototype._onParentStatusChanged = function (item, oldStatus) {
                    var self = this, newStatus = item._aspect.status, fkey = null;
                    var children;
                    if (newStatus === 3) {
                        children = self.getChildItems(item);
                        fkey = this._unMapParentItem(item);
                        switch (self.onDeleteAction) {
                            case 0:
                                break;
                            case 1:
                                children.forEach(function (child) {
                                    child._aspect.deleteItem();
                                });
                                break;
                            case 2:
                                children.forEach(function (child) {
                                    var isEdit = child._aspect.isEditing;
                                    if (!isEdit)
                                        child._aspect.beginEdit();
                                    try {
                                        self._childFldInfos.forEach(function (f) {
                                            child[f.fieldName] = null;
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
                };
                Association.prototype._onChildCollChanged = function (args) {
                    var self = this, item, items = args.items, changed = [], changedKeys = {};
                    switch (args.changeType) {
                        case 2:
                            if (!self._isChildFilling)
                                changed = self.refreshChildMap();
                            break;
                        case 1:
                            if (!this._isChildFilling)
                                changed = self._mapChildren(items);
                            break;
                        case 0:
                            items.forEach(function (item) {
                                var key = self._unMapChildItem(item);
                                if (!!key) {
                                    changedKeys[key] = null;
                                }
                            });
                            changed = Object.keys(changedKeys);
                            break;
                        case 3:
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
                };
                Association.prototype._notifyChildrenChanged = function (changed) {
                    this._notifyChanged([], changed);
                };
                Association.prototype._notifyParentChanged = function (changed) {
                    this._notifyChanged(changed, []);
                };
                Association.prototype._notifyChanged = function (changed_pkeys, changed_ckeys) {
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
                };
                Association.prototype._onChildFill = function (args) {
                    var isEnd = !args.isBegin, self = this, changed;
                    if (isEnd) {
                        self._isChildFilling = false;
                        if (args.resetUI) {
                            changed = self.refreshChildMap();
                        }
                        else
                            changed = self._mapChildren(args.newItems);
                        self._notifyChildrenChanged(changed);
                    }
                    else {
                        self._isChildFilling = true;
                    }
                };
                Association.prototype._onChildEdit = function (item, isBegin, isCanceled) {
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
                };
                Association.prototype._onChildCommitChanges = function (item, isBegin, isRejected, status) {
                    var self = this, fkey;
                    if (isBegin) {
                        if (isRejected && status === 1) {
                            fkey = this._unMapChildItem(item);
                            if (!!fkey)
                                self._notifyChildrenChanged([fkey]);
                            return;
                        }
                        else if (!isRejected && status === 3) {
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
                };
                Association.prototype._storeChildFKey = function (item) {
                    var self = this, fkey = self.getChildFKey(item), arr;
                    if (!!fkey) {
                        arr = self._childMap[fkey];
                        if (!!arr && arr.indexOf(item) > -1) {
                            self._saveChildFKey = fkey;
                        }
                    }
                };
                Association.prototype._checkChildFKey = function (item) {
                    var self = this, savedKey = self._saveChildFKey, fkey, arr;
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
                };
                Association.prototype._onChildStatusChanged = function (item, oldStatus) {
                    var self = this, newStatus = item._aspect.status, fkey = self.getChildFKey(item);
                    if (!fkey)
                        return;
                    if (newStatus === 3) {
                        fkey = self._unMapChildItem(item);
                        if (!!fkey)
                            self._notifyChildrenChanged([fkey]);
                    }
                };
                Association.prototype._getItemKey = function (finf, ds, item) {
                    var arr = [], val, strval, internal = ds._getInternal();
                    for (var i = 0, len = finf.length; i < len; i += 1) {
                        val = item[finf[i].fieldName];
                        strval = internal.getStrValue(val, finf[i]);
                        if (strval === null)
                            return null;
                        arr.push(strval);
                    }
                    return arr.join(';');
                };
                Association.prototype._resetChildMap = function () {
                    var self = this, fkeys = Object.keys(this._childMap);
                    this._childMap = {};
                    self._notifyChildrenChanged(fkeys);
                };
                Association.prototype._resetParentMap = function () {
                    var self = this, fkeys = Object.keys(this._parentMap);
                    this._parentMap = {};
                    self._notifyParentChanged(fkeys);
                };
                Association.prototype._unMapChildItem = function (item) {
                    var fkey, arr, idx, changedKey = null;
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
                };
                Association.prototype._unMapParentItem = function (item) {
                    var fkey, changedKey = null;
                    fkey = this.getParentFKey(item);
                    if (!!fkey && !!this._parentMap[fkey]) {
                        delete this._parentMap[fkey];
                        changedKey = fkey;
                    }
                    return changedKey;
                };
                Association.prototype._mapParentItems = function (items) {
                    var item, fkey, status, old, chngedKeys = {};
                    for (var i = 0, len = items.length; i < len; i += 1) {
                        item = items[i];
                        status = item._aspect.status;
                        if (status === 3)
                            continue;
                        fkey = this.getParentFKey(item);
                        if (!!fkey) {
                            old = this._parentMap[fkey];
                            if (old !== item) {
                                this._parentMap[fkey] = item;
                                chngedKeys[fkey] = null;
                            }
                        }
                    }
                    return Object.keys(chngedKeys);
                };
                Association.prototype._onChildrenChanged = function (fkey) {
                    if (!!fkey && !!this._parentToChildrenName) {
                        var obj = this._parentMap[fkey];
                        if (!!obj) {
                            obj.raisePropertyChanged(this._parentToChildrenName);
                        }
                    }
                };
                Association.prototype._onParentChanged = function (fkey) {
                    var self = this, arr;
                    if (!!fkey && !!this._childToParentName) {
                        arr = this._childMap[fkey];
                        if (!!arr) {
                            arr.forEach(function (item) {
                                item.raisePropertyChanged(self._childToParentName);
                            });
                        }
                    }
                };
                Association.prototype._mapChildren = function (items) {
                    var item, fkey, arr, status, chngedKeys = {};
                    for (var i = 0, len = items.length; i < len; i += 1) {
                        item = items[i];
                        status = item._aspect.status;
                        if (status === 3)
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
                };
                Association.prototype._unbindParentDS = function () {
                    var self = this, ds = this.parentDS;
                    if (!ds)
                        return;
                    ds.removeNSHandlers(self._objId);
                };
                Association.prototype._unbindChildDS = function () {
                    var self = this, ds = this.childDS;
                    if (!ds)
                        return;
                    ds.removeNSHandlers(self._objId);
                };
                Association.prototype.getParentFKey = function (item) {
                    if (!!item && item._aspect.isNew)
                        return item._key;
                    return this._getItemKey(this._parentFldInfos, this._parentDS, item);
                };
                Association.prototype.getChildFKey = function (item) {
                    if (!!item && !!this._childToParentName) {
                        var parentKey = item._aspect._getFieldVal(this._childToParentName);
                        if (!!parentKey) {
                            return parentKey;
                        }
                    }
                    return this._getItemKey(this._childFldInfos, this._childDS, item);
                };
                Association.prototype.getChildItems = function (item) {
                    if (!item)
                        return [];
                    var fkey = this.getParentFKey(item), arr = this._childMap[fkey];
                    if (!arr)
                        return [];
                    return arr;
                };
                Association.prototype.getParentItem = function (item) {
                    if (!item)
                        return null;
                    var fkey = this.getChildFKey(item);
                    var obj = this._parentMap[fkey];
                    if (!!obj)
                        return obj;
                    else
                        return null;
                };
                Association.prototype.refreshParentMap = function () {
                    this._resetParentMap();
                    return this._mapParentItems(this._parentDS.items);
                };
                Association.prototype.refreshChildMap = function () {
                    this._resetChildMap();
                    return this._mapChildren(this._childDS.items);
                };
                Association.prototype.destroy = function () {
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
                    _super.prototype.destroy.call(this);
                };
                Association.prototype.toString = function () {
                    return this._name;
                };
                Object.defineProperty(Association.prototype, "name", {
                    get: function () { return this._name; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Association.prototype, "parentToChildrenName", {
                    get: function () { return this._parentToChildrenName; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Association.prototype, "childToParentName", {
                    get: function () { return this._childToParentName; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Association.prototype, "parentDS", {
                    get: function () { return this._parentDS; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Association.prototype, "childDS", {
                    get: function () { return this._childDS; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Association.prototype, "parentFldInfos", {
                    get: function () { return this._parentFldInfos; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Association.prototype, "childFldInfos", {
                    get: function () { return this._childFldInfos; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Association.prototype, "onDeleteAction", {
                    get: function () { return this._onDeleteAction; },
                    enumerable: true,
                    configurable: true
                });
                return Association;
            })(RIAPP.BaseObject);
            db.Association = Association;
            var VIEW_EVENTS = {
                refreshed: 'view_refreshed'
            };
            var DataView = (function (_super) {
                __extends(DataView, _super);
                function DataView(options) {
                    _super.call(this);
                    var opts = utils.extend(false, {
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
                DataView.prototype._getEventNames = function () {
                    var base_events = _super.prototype._getEventNames.call(this);
                    return [VIEW_EVENTS.refreshed].concat(base_events);
                };
                DataView.prototype.addOnViewRefreshed = function (fn, nmspace) {
                    this._addHandler(VIEW_EVENTS.refreshed, fn, nmspace);
                };
                DataView.prototype.removeOnViewRefreshed = function (nmspace) {
                    this._removeHandler(VIEW_EVENTS.refreshed, nmspace);
                };
                DataView.prototype._filterForPaging = function (items) {
                    var skip = 0, take = 0, pos = -1, cnt = -1, result = [];
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
                };
                DataView.prototype._onViewRefreshed = function (args) {
                    this.raiseEvent(VIEW_EVENTS.refreshed, args);
                };
                DataView.prototype._clear = function (isPageChanged) {
                    this.cancelEdit();
                    this._EditingItem = null;
                    this._newKey = 0;
                    this.currentItem = null;
                    this._items = [];
                    this._itemsByKey = {};
                    this._errors = {};
                    this._onCollectionChanged({ changeType: 2, items: [] });
                    if (!isPageChanged)
                        this.pageIndex = 0;
                    this._onCountChanged();
                };
                DataView.prototype._refresh = function (isPageChanged) {
                    var items;
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
                };
                DataView.prototype._fillItems = function (data) {
                    data = utils.extend(false, {
                        items: [],
                        isPageChanged: false,
                        clear: true,
                        isAppend: false
                    }, data);
                    var self = this, items, newItems = [], positions = [], fetchedItems = [];
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
                            this._onCollectionChanged({ changeType: 1, items: newItems, pos: positions });
                            this._onCountChanged();
                        }
                    }
                    finally {
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
                };
                DataView.prototype._onDSCollectionChanged = function (sender, args) {
                    var self = this, item, items = args.items;
                    switch (args.changeType) {
                        case 2:
                            if (!this._isDSFilling)
                                this._refresh(false);
                            break;
                        case 1:
                            if (!this._isAddingNew && !this._isDSFilling) {
                                if (!!self._fn_filter) {
                                    items = items.filter(self._fn_filter);
                                }
                                self.appendItems(items);
                            }
                            break;
                        case 0:
                            items.forEach(function (item) {
                                var key = item._key;
                                item = self._itemsByKey[key];
                                if (!!item) {
                                    self.removeItem(item);
                                }
                            });
                            break;
                        case 3:
                            {
                                item = self._itemsByKey[args.old_key];
                                if (!!item) {
                                    delete self._itemsByKey[args.old_key];
                                    self._itemsByKey[args.new_key] = item;
                                    this._onCollectionChanged(args);
                                }
                            }
                            break;
                        default:
                            throw new Error(baseUtils.format(RIAPP.ERRS.ERR_COLLECTION_CHANGETYPE_INVALID, args.changeType));
                    }
                };
                DataView.prototype._onDSFill = function (sender, args) {
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
                };
                DataView.prototype._onDSStatusChanged = function (sender, args) {
                    var self = this, item = args.item, key = args.key, oldStatus = args.oldStatus, isOk, canFilter = !!self._fn_filter;
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
                };
                DataView.prototype._bindDS = function () {
                    var self = this, ds = this._dataSource;
                    if (!ds)
                        return;
                    ds.addOnCollChanged(self._onDSCollectionChanged, self._objId, self);
                    ds.addOnFill(self._onDSFill, self._objId, self);
                    ds.addOnBeginEdit(function (sender, args) {
                        if (!!self._itemsByKey[args.item._key]) {
                            self._onEditing(args.item, true, false);
                        }
                    }, self._objId);
                    ds.addOnEndEdit(function (sender, args) {
                        var isOk, item = args.item, canFilter = !!self._fn_filter;
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
                };
                DataView.prototype._unbindDS = function () {
                    var self = this, ds = this._dataSource;
                    if (!ds)
                        return;
                    ds.removeNSHandlers(self._objId);
                };
                DataView.prototype._onCurrentChanging = function (newCurrent) {
                    var ds = this._dataSource, item;
                    try {
                        item = ds._getInternal().getEditingItem();
                        if (!!item && newCurrent !== item)
                            ds.endEdit();
                    }
                    catch (ex) {
                        ds.cancelEdit();
                        RIAPP.reThrow(ex, this.handleError(ex, this));
                    }
                };
                DataView.prototype._onPageChanged = function () {
                    this._refresh(true);
                };
                DataView.prototype._getStrValue = function (val, fieldInfo) {
                    return this._dataSource._getInternal().getStrValue(val, fieldInfo);
                };
                DataView.prototype._getErrors = function (item) {
                    var ds = this._dataSource;
                    return ds._getInternal().getErrors(item);
                };
                DataView.prototype.getItemsWithErrors = function () {
                    var ds = this._dataSource;
                    return ds.getItemsWithErrors();
                };
                DataView.prototype.appendItems = function (items) {
                    if (this._isDestroyCalled)
                        return [];
                    return this._fillItems({ items: items, isPageChanged: false, clear: false, isAppend: true });
                };
                DataView.prototype.addNew = function () {
                    var item;
                    this._isAddingNew = true;
                    try {
                        item = this._dataSource.addNew();
                    }
                    finally {
                        this._isAddingNew = false;
                    }
                    return item;
                };
                DataView.prototype.removeItem = function (item) {
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
                    if (curPos === oldPos) {
                        if (!test) {
                            this._currentPos = curPos - 1;
                        }
                        this._onCurrentChanged();
                    }
                    if (curPos > oldPos) {
                        this._currentPos = curPos - 1;
                        this._onCurrentChanged();
                    }
                };
                DataView.prototype.sortLocal = function (fieldNames, sortOrder) {
                    var mult = 1, parser = RIAPP.global.parser, deffered = utils.createDeferred();
                    if (sortOrder === 1)
                        mult = -1;
                    var fn_sort = function (a, b) {
                        var res = 0, i, len, af, bf, fieldName;
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
                    }
                    catch (ex) {
                        deffered.reject(ex);
                        this.handleError(ex, this);
                        RIAPP.throwDummy(ex);
                    }
                    return deffered.promise();
                };
                DataView.prototype.getIsHasErrors = function () {
                    return this._dataSource.getIsHasErrors();
                };
                DataView.prototype.clear = function () {
                    this._clear(false);
                };
                DataView.prototype.refresh = function () {
                    this._refresh(false);
                };
                DataView.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    this._unbindDS();
                    this._dataSource = null;
                    this._fn_filter = null;
                    this._fn_sort = null;
                    _super.prototype.destroy.call(this);
                };
                Object.defineProperty(DataView.prototype, "dataSource", {
                    get: function () { return this._dataSource; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataView.prototype, "isPagingEnabled", {
                    get: function () { return this._options.enablePaging; },
                    set: function (v) {
                        if (this._options.enablePaging !== v) {
                            this._options.enablePaging = v;
                            this.raisePropertyChanged(PROP_NAME.isPagingEnabled);
                            this._refresh(false);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataView.prototype, "permissions", {
                    get: function () { return this._dataSource.permissions; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataView.prototype, "fn_filter", {
                    get: function () { return this._fn_filter; },
                    set: function (v) {
                        if (this._fn_filter !== v) {
                            this._fn_filter = v;
                            this._refresh(false);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataView.prototype, "fn_sort", {
                    get: function () { return this._fn_sort; },
                    set: function (v) {
                        if (this._fn_sort !== v) {
                            this._fn_sort = v;
                            this._refresh(false);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataView.prototype, "fn_itemsProvider", {
                    get: function () { return this._fn_itemsProvider; },
                    set: function (v) {
                        if (this._fn_itemsProvider !== v) {
                            this._fn_itemsProvider = v;
                            this._refresh(false);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return DataView;
            })(collMOD.BaseCollection);
            db.DataView = DataView;
            var TDataView = (function (_super) {
                __extends(TDataView, _super);
                function TDataView() {
                    _super.apply(this, arguments);
                }
                return TDataView;
            })(DataView);
            db.TDataView = TDataView;
            var ChildDataView = (function (_super) {
                __extends(ChildDataView, _super);
                function ChildDataView(options) {
                    this._parentItem = null;
                    this._refreshTimeout = null;
                    this._association = options.association;
                    var opts = utils.extend(false, {
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
                    _super.call(this, opts);
                }
                ChildDataView.prototype._refresh = function (isPageChanged) {
                    var self = this, ds = this.dataSource;
                    if (!ds) {
                        return;
                    }
                    var items = self._association.getChildItems(self._parentItem);
                    if (!!self.fn_filter) {
                        items = items.filter(self.fn_filter);
                    }
                    if (!!self.fn_sort) {
                        items = items.sort(self.fn_sort);
                    }
                    self._fillItems({ items: items, isPageChanged: !!isPageChanged, clear: true, isAppend: false });
                    self._onViewRefreshed({});
                };
                ChildDataView.prototype.destroy = function () {
                    if (this._isDestroyed)
                        return;
                    this._isDestroyCalled = true;
                    clearTimeout(this._refreshTimeout);
                    this._association = null;
                    _super.prototype.destroy.call(this);
                };
                ChildDataView.prototype.toString = function () {
                    if (!!this._association)
                        return 'ChildDataView for ' + this._association.toString();
                    return 'ChildDataView';
                };
                Object.defineProperty(ChildDataView.prototype, "parentItem", {
                    get: function () { return this._parentItem; },
                    set: function (v) {
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
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ChildDataView.prototype, "association", {
                    get: function () { return this._association; },
                    enumerable: true,
                    configurable: true
                });
                return ChildDataView;
            })(DataView);
            db.ChildDataView = ChildDataView;
            var TChildDataView = (function (_super) {
                __extends(TChildDataView, _super);
                function TChildDataView() {
                    _super.apply(this, arguments);
                }
                return TChildDataView;
            })(ChildDataView);
            db.TChildDataView = TChildDataView;
            var BaseComplexProperty = (function (_super) {
                __extends(BaseComplexProperty, _super);
                function BaseComplexProperty(name) {
                    _super.call(this);
                    this._name = name;
                }
                BaseComplexProperty.prototype._getFullPath = function (path) {
                    throw new Error('Not Implemented');
                };
                BaseComplexProperty.prototype.getName = function () {
                    return this._name;
                };
                BaseComplexProperty.prototype.setValue = function (fullName, value) {
                    throw new Error('Not Implemented');
                };
                BaseComplexProperty.prototype.getValue = function (fullName) {
                    throw new Error('Not Implemented');
                };
                BaseComplexProperty.prototype.getFieldInfo = function () {
                    throw new Error('Not Implemented');
                };
                BaseComplexProperty.prototype.getProperties = function () {
                    throw new Error('Not Implemented');
                };
                BaseComplexProperty.prototype.getFullPath = function (name) {
                    throw new Error('Not Implemented');
                };
                BaseComplexProperty.prototype.getEntity = function () {
                    throw new Error('Not Implemented');
                };
                BaseComplexProperty.prototype.getPropertyByName = function (name) {
                    var arrProps = this.getProperties().filter(function (f) { return f.fieldName == name; });
                    if (!arrProps || arrProps.length != 1)
                        throw new Error(utils.format(RIAPP.ERRS.ERR_ASSERTION_FAILED, "arrProps.length == 1"));
                    return arrProps[0];
                };
                BaseComplexProperty.prototype.getIsHasErrors = function () {
                    return this.getEntity().getIsHasErrors();
                };
                BaseComplexProperty.prototype.addOnErrorsChanged = function (fn, nmspace, context) {
                    this.getEntity().addOnErrorsChanged(fn, nmspace, context);
                };
                BaseComplexProperty.prototype.removeOnErrorsChanged = function (nmspace) {
                    this.getEntity().removeOnErrorsChanged(nmspace);
                };
                BaseComplexProperty.prototype.getFieldErrors = function (fieldName) {
                    var fullName = this.getFullPath(fieldName);
                    return this.getEntity().getFieldErrors(fullName);
                };
                BaseComplexProperty.prototype.getAllErrors = function () {
                    return this.getEntity().getAllErrors();
                };
                BaseComplexProperty.prototype.getIErrorNotification = function () {
                    return this;
                };
                return BaseComplexProperty;
            })(RIAPP.BaseObject);
            db.BaseComplexProperty = BaseComplexProperty;
            var RootComplexProperty = (function (_super) {
                __extends(RootComplexProperty, _super);
                function RootComplexProperty(name, owner) {
                    _super.call(this, name);
                    this._entity = owner;
                }
                RootComplexProperty.prototype._getFullPath = function (path) {
                    return this.getName() + '.' + path;
                };
                RootComplexProperty.prototype.setValue = function (fullName, value) {
                    this._entity._setFieldVal(fullName, value);
                };
                RootComplexProperty.prototype.getValue = function (fullName) {
                    return this._entity._getFieldVal(fullName);
                };
                RootComplexProperty.prototype.getFieldInfo = function () {
                    return this._entity.getFieldInfo(this.getName());
                };
                RootComplexProperty.prototype.getProperties = function () {
                    return this.getFieldInfo().nested;
                };
                RootComplexProperty.prototype.getEntity = function () {
                    return this._entity;
                };
                RootComplexProperty.prototype.getFullPath = function (name) {
                    return this.getName() + '.' + name;
                };
                return RootComplexProperty;
            })(BaseComplexProperty);
            db.RootComplexProperty = RootComplexProperty;
            var ChildComplexProperty = (function (_super) {
                __extends(ChildComplexProperty, _super);
                function ChildComplexProperty(name, parent) {
                    _super.call(this, name);
                    this._parent = parent;
                }
                ChildComplexProperty.prototype._getFullPath = function (path) {
                    return this._parent._getFullPath(this.getName() + '.' + path);
                };
                ChildComplexProperty.prototype.setValue = function (fullName, value) {
                    this.getEntity()._setFieldVal(fullName, value);
                };
                ChildComplexProperty.prototype.getValue = function (fullName) {
                    return this.getEntity()._getFieldVal(fullName);
                };
                ChildComplexProperty.prototype.getFieldInfo = function () {
                    var name = this.getName();
                    return this._parent.getPropertyByName(name);
                };
                ChildComplexProperty.prototype.getProperties = function () {
                    return this.getFieldInfo().nested;
                };
                ChildComplexProperty.prototype.getParent = function () {
                    return this._parent;
                };
                ChildComplexProperty.prototype.getRootProperty = function () {
                    var parent = this._parent;
                    while (!!parent && (parent instanceof ChildComplexProperty)) {
                        parent = parent.getParent();
                    }
                    if (!parent || !(parent instanceof RootComplexProperty))
                        throw new Error(utils.format(RIAPP.ERRS.ERR_ASSERTION_FAILED, "parent instanceof RootComplexProperty"));
                    return parent;
                };
                ChildComplexProperty.prototype.getFullPath = function (name) {
                    return this._parent._getFullPath(this.getName() + '.' + name);
                };
                ChildComplexProperty.prototype.getEntity = function () {
                    return this.getRootProperty().getEntity();
                };
                return ChildComplexProperty;
            })(BaseComplexProperty);
            db.ChildComplexProperty = ChildComplexProperty;
            db._isModuleLoaded = true;
        })(db = MOD.db || (MOD.db = {}));
    })(MOD = RIAPP.MOD || (RIAPP.MOD = {}));
})(RIAPP || (RIAPP = {}));
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
var RIAPP;
(function (RIAPP) {
    var constsMOD = RIAPP.consts;
    var utilsMOD = RIAPP.MOD.utils;
    var bindMOD = RIAPP.MOD.binding;
    var contentMOD = RIAPP.MOD.baseContent;
    var formMOD = RIAPP.MOD.dataform;
    RIAPP.global._getInternal().initialize();
    var utils = RIAPP.global.utils, parser = RIAPP.global.parser;
    var APP_EVENTS = {
        startup: 'startup'
    };
    var Application = (function (_super) {
        __extends(Application, _super);
        function Application(options) {
            _super.call(this);
            var self = this, app_name = 'default', user_modules = [];
            this._options = null;
            if (!!options) {
                this._options = options;
                if (!!options.application_name)
                    app_name = options.application_name;
                if (!!options.user_modules)
                    user_modules = options.user_modules;
            }
            if (!!RIAPP.global.findApp(app_name))
                throw new Error(utils.format(RIAPP.ERRS.ERR_APP_NAME_NOT_UNIQUE, app_name));
            this._app_name = app_name;
            this._objId = 'app:' + RIAPP.baseUtils.getNewID();
            this._objLifeTime = null;
            this._ELV_STORE_KEY = constsMOD.DATA_ATTR.EL_VIEW_KEY + Application._newInstanceNum;
            Application._newInstanceNum += 1;
            this._contentFactory = new contentMOD.FactoryList(this);
            this._objMaps = [];
            this._exports = {};
            this._modules = {};
            this._elViewStore = {};
            this._nextElViewStoreKey = 0;
            this._userCode = {};
            this._viewModels = {};
            this._internal = {
                getElView: function (el) {
                    return self._getElView(el);
                },
                createElementView: function (el, view_info) {
                    return self._createElementView(el, view_info);
                },
                setElView: function (el, view) {
                    self._setElView(el, view);
                },
                bindTemplateElements: function (templateEl) {
                    return self._bindTemplateElements(templateEl);
                },
                bindElements: function (scope, dctx, isDataFormBind, isInsideTemplate) {
                    return self._bindElements(scope, dctx, isDataFormBind, isInsideTemplate);
                },
                getContentType: function (options) {
                    return self._contentFactory.getContentType(options);
                },
                addContentFactory: function (factory) {
                    self._contentFactory.addFactory(factory);
                }
            };
            this._initModules();
            this._initUserModules(user_modules);
            RIAPP.global._getInternal().registerApp(this);
        }
        Object.defineProperty(Application.prototype, "_DATA_BIND_SELECTOR", {
            get: function () { return ['*[', constsMOD.DATA_ATTR.DATA_BIND, ']'].join(''); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application.prototype, "_DATA_VIEW_SELECTOR", {
            get: function () { return ['*[', constsMOD.DATA_ATTR.DATA_VIEW, ']'].join(''); },
            enumerable: true,
            configurable: true
        });
        Application.prototype._getEventNames = function () {
            var base_events = _super.prototype._getEventNames.call(this);
            return [APP_EVENTS.startup].concat(base_events);
        };
        Application.prototype._cleanUpObjMaps = function () {
            var self = this;
            this._objMaps.forEach(function (objMap) {
                utils.forEachProp(objMap, function (name) {
                    var obj = objMap[name];
                    if (obj instanceof RIAPP.BaseObject) {
                        if (!obj.getIsDestroyed()) {
                            obj.removeNSHandlers(self.uniqueID);
                        }
                    }
                });
            });
            this._objMaps = [];
        };
        Application.prototype._initModules = function () {
            var self = this, modules = RIAPP.MOD, moduleNames = Object.keys(RIAPP.MOD);
            moduleNames.forEach(function (mod_name) {
                var mod = modules[mod_name];
                if (!!mod._isModuleLoaded && !!mod._initModule) {
                    mod._initModule(self);
                }
            });
        };
        Application.prototype._initUserModules = function (user_modules) {
            var self = this;
            user_modules.forEach(function (mod) {
                self._modules[mod.name] = mod.initFn(self);
            });
        };
        Application.prototype._destroyBindings = function () {
            if (!!this._objLifeTime) {
                this._objLifeTime.destroy();
                this._objLifeTime = null;
            }
        };
        Application.prototype._setUpBindings = function () {
            var defScope = this.appRoot, defaultDataCtxt = this;
            this._destroyBindings();
            this._objLifeTime = this._bindElements(defScope, defaultDataCtxt, false, false);
        };
        Application.prototype._getElementViewInfo = function (el) {
            var view_name = null, vw_options = null, attr, data_view_op_arr, data_view_op;
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
        };
        Application.prototype.handleError = function (error, source) {
            if (RIAPP.checkIsDummy(error)) {
                return true;
            }
            var isHandled = _super.prototype.handleError.call(this, error, source);
            if (!isHandled) {
                return RIAPP.global.handleError(error, source);
            }
            return isHandled;
        };
        Application.prototype._getElViewType = function (name) {
            var name2 = 'elvws.' + name, global = this.global;
            var res = global._getInternal().getObject(this, name2);
            if (!res) {
                res = global._getInternal().getObject(global, name2);
            }
            return res;
        };
        Application.prototype._checkBindableElement = function (el) {
            var val, allAttrs = el.attributes, attr, res = { el: el, dataView: null, dataForm: null, expressions: [] };
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
        };
        Application.prototype._getAllBindableHtmlElements = function (scope) {
            var self = this, result = [], selectedElem = RIAPP.ArrayHelper.fromList(scope.querySelectorAll("*"));
            selectedElem.forEach(function (el) {
                var res = self._checkBindableElement(el);
                if (!!res)
                    result.push(res);
            });
            return result;
        };
        Application.prototype._getElView = function (el) {
            var storeID = el.getAttribute(this._ELV_STORE_KEY);
            if (!!storeID) {
                return this._elViewStore[storeID];
            }
            return null;
        };
        Application.prototype._createElementView = function (el, view_info) {
            var viewType, elView;
            if (!!view_info.name) {
                viewType = this._getElViewType(view_info.name);
                if (!viewType)
                    throw new Error(utils.format(RIAPP.ERRS.ERR_ELVIEW_NOT_REGISTERED, view_info.name));
            }
            if (!viewType) {
                var nodeNm = el.nodeName.toLowerCase(), attrType;
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
        };
        Application.prototype._setElView = function (el, view) {
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
        };
        Application.prototype._bindTemplateElements = function (templateEl) {
            var self = this, global = self.global, selectedElem = this._getAllBindableHtmlElements(templateEl), lftm = new utilsMOD.LifeTimeScope(), checks = utils.check, DATA_FORM = constsMOD.DATA_ATTR.DATA_FORM, res = self._checkBindableElement(templateEl);
            if (res) {
                selectedElem.push(res);
            }
            selectedElem.forEach(function (bindElem) {
                if (!bindElem.dataForm && formMOD._isDataForm(bindElem.el)) {
                    bindElem.el.setAttribute(DATA_FORM, 'yes');
                    bindElem.dataForm = 'yes';
                }
            });
            var forms = selectedElem.filter(function (bindElem, index, arr) { return !!bindElem.dataForm; }).map(function (bindElem, index, arr) { return bindElem.el; });
            if (!!res && !!res.dataForm) {
                selectedElem = [res];
            }
            selectedElem.forEach(function (bindElem) {
                var op, binding, bind_attr, temp_opts, elView, j, len;
                if (formMOD._isInNestedForm(templateEl, forms, bindElem.el)) {
                    return;
                }
                try {
                    elView = self.getElementView(bindElem.el);
                }
                catch (ex) {
                    RIAPP.reThrow(ex, self.handleError(ex, self));
                }
                lftm.addObj(elView);
                formMOD._setIsInsideTemplate(elView);
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
        };
        Application.prototype._bindElements = function (scope, dctx, isDataFormBind, isInsideTemplate) {
            var self = this, global = self.global, checks = utils.check, DATA_FORM = constsMOD.DATA_ATTR.DATA_FORM;
            scope = scope || global.document;
            var selectedElem = this._getAllBindableHtmlElements(scope);
            var lftm = new utilsMOD.LifeTimeScope();
            if (!isDataFormBind) {
                selectedElem.forEach(function (bindElem) {
                    if (!bindElem.dataForm && formMOD._isDataForm(bindElem.el)) {
                        bindElem.el.setAttribute(DATA_FORM, 'yes');
                        bindElem.dataForm = 'yes';
                    }
                });
            }
            var forms = selectedElem.filter(function (bindElem, index, arr) { return !!bindElem.dataForm; }).map(function (bindElem, index, arr) { return bindElem.el; });
            selectedElem.forEach(function (bindElem) {
                var bind_attr = "", temp_opts, bind_op, elView, i, len;
                if (formMOD._isInNestedForm(scope, forms, bindElem.el)) {
                    return;
                }
                try {
                    elView = self.getElementView(bindElem.el);
                }
                catch (ex) {
                    RIAPP.reThrow(ex, self.handleError(ex, self));
                }
                lftm.addObj(elView);
                if (isInsideTemplate)
                    formMOD._setIsInsideTemplate(elView);
                bind_attr = bindElem.expressions.join('');
                if (!!bind_attr) {
                    temp_opts = parser.parseOptions(bind_attr);
                    for (i = 0, len = temp_opts.length; i < len; i += 1) {
                        bind_op = bindMOD.getBindingOptions(self, temp_opts[i], elView, dctx);
                        lftm.addObj(self.bind(bind_op));
                    }
                }
            });
            return lftm;
        };
        Application.prototype._getInternal = function () {
            return this._internal;
        };
        Application.prototype.addOnStartUp = function (fn, nmspace, context) {
            this._addHandler(APP_EVENTS.startup, fn, nmspace, context);
        };
        Application.prototype.removeOnStartUp = function (nmspace) {
            this._removeHandler(APP_EVENTS.startup, nmspace);
        };
        Application.prototype.getExports = function () {
            return this._exports;
        };
        Application.prototype.registerElView = function (name, vw_type) {
            var name2 = 'elvws.' + name, global = this.global;
            if (!global._getInternal().getObject(this, name2)) {
                global._getInternal().registerObject(this, name2, vw_type);
            }
            else
                throw new Error(utils.format(RIAPP.ERRS.ERR_OBJ_ALREADY_REGISTERED, name));
        };
        Application.prototype.getElementView = function (el) {
            var elView = this._getElView(el);
            if (!!elView)
                return elView;
            var info = this._getElementViewInfo(el);
            return this._createElementView(el, info);
        };
        Application.prototype.bind = function (opts) {
            return new bindMOD.Binding(opts, this.appName);
        };
        Application.prototype.registerConverter = function (name, obj) {
            var name2 = 'converters.' + name;
            if (!RIAPP.global._getInternal().getObject(this, name2)) {
                RIAPP.global._getInternal().registerObject(this, name2, obj);
            }
            else
                throw new Error(utils.format(RIAPP.ERRS.ERR_OBJ_ALREADY_REGISTERED, name));
        };
        Application.prototype.getConverter = function (name) {
            var name2 = 'converters.' + name;
            var res = RIAPP.global._getInternal().getObject(this, name2);
            if (!res) {
                res = RIAPP.global._getInternal().getObject(RIAPP.global, name2);
            }
            if (!res)
                throw new Error(utils.format(RIAPP.ERRS.ERR_CONVERTER_NOTREGISTERED, name));
            return res;
        };
        Application.prototype.registerType = function (name, obj) {
            var name2 = 'types.' + name;
            return RIAPP.global._getInternal().registerObject(this, name2, obj);
        };
        Application.prototype.getType = function (name) {
            var name2 = 'types.' + name;
            var res = RIAPP.global._getInternal().getObject(this, name2);
            if (!res) {
                res = RIAPP.global._getInternal().getObject(RIAPP.global, name2);
            }
            return res;
        };
        Application.prototype.registerObject = function (name, obj) {
            var self = this, name2 = 'objects.' + name;
            if (obj instanceof RIAPP.BaseObject) {
                obj.addOnDestroyed(function (s, a) {
                    RIAPP.global._getInternal().removeObject(self, name2);
                }, self.uniqueID);
            }
            var objMap = RIAPP.global._getInternal().registerObject(this, name2, obj);
            if (this._objMaps.indexOf(objMap) < 0) {
                this._objMaps.push(objMap);
            }
        };
        Application.prototype.getObject = function (name) {
            var name2 = 'objects.' + name;
            var res = RIAPP.global._getInternal().getObject(this, name2);
            return res;
        };
        Application.prototype.onStartUp = function () {
        };
        Application.prototype.startUp = function (fn_sandbox) {
            var self = this, fn_init = function () {
                try {
                    self._contentFactory.init();
                    self.onStartUp();
                    self.raiseEvent(APP_EVENTS.startup, {});
                    if (!!fn_sandbox)
                        fn_sandbox.apply(self, [self]);
                    self._setUpBindings();
                }
                catch (ex) {
                    RIAPP.reThrow(ex, this.handleError(ex, this));
                }
            };
            try {
                if (!!fn_sandbox && !utils.check.isFunction(fn_sandbox))
                    throw new Error(RIAPP.ERRS.ERR_APP_SETUP_INVALID);
                RIAPP.global._getInternal().waitForNotLoading(fn_init, null);
            }
            catch (ex) {
                RIAPP.reThrow(ex, self.handleError(ex, self));
            }
        };
        Application.prototype.loadTemplates = function (url) {
            this.loadTemplatesAsync(function () {
                return utils.performAjaxGet(url);
            });
        };
        Application.prototype.loadTemplatesAsync = function (fn_loader) {
            RIAPP.global._getInternal().loadTemplatesAsync(fn_loader, this);
        };
        Application.prototype.registerTemplateLoader = function (name, fn_loader) {
            RIAPP.global._getInternal().registerTemplateLoader(this.appName + '.' + name, {
                fn_loader: fn_loader
            });
        };
        Application.prototype.getTemplateLoader = function (name) {
            var res = RIAPP.global._getInternal().getTemplateLoader(this.appName + '.' + name);
            if (!res) {
                res = RIAPP.global._getInternal().getTemplateLoader(name);
            }
            return res;
        };
        Application.prototype.registerTemplateGroup = function (name, group) {
            var group2 = utils.extend(false, {
                fn_loader: null,
                url: null,
                names: null,
                app: this
            }, group);
            RIAPP.global._getInternal().registerTemplateGroup(this.appName + '.' + name, group2);
        };
        Application.prototype.destroy = function () {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            var self = this;
            try {
                self._contentFactory = null;
                RIAPP.global._getInternal().unregisterApp(self);
                self._destroyBindings();
                self._cleanUpObjMaps();
                self._exports = {};
                self._modules = {};
                self._elViewStore = {};
                self._userCode = {};
                self._viewModels = {};
                self._options = null;
            }
            finally {
                _super.prototype.destroy.call(this);
            }
        };
        Application.prototype.toString = function () {
            return 'Application: ' + this.appName;
        };
        Object.defineProperty(Application.prototype, "uniqueID", {
            get: function () { return this._objId; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application.prototype, "options", {
            get: function () { return this._options; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application.prototype, "contentFactory", {
            get: function () { return this._contentFactory; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application.prototype, "appName", {
            get: function () { return this._app_name; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application.prototype, "appRoot", {
            get: function () {
                if (!this._options || !this._options.application_root)
                    return this.global.document;
                return this._options.application_root;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application.prototype, "modules", {
            get: function () { return this._modules; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application.prototype, "global", {
            get: function () { return RIAPP.global; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application.prototype, "UC", {
            get: function () { return this._userCode; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application.prototype, "VM", {
            get: function () { return this._viewModels; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application.prototype, "app", {
            get: function () { return this; },
            enumerable: true,
            configurable: true
        });
        Application._newInstanceNum = 1;
        return Application;
    })(RIAPP.BaseObject);
    RIAPP.Application = Application;
})(RIAPP || (RIAPP = {}));
