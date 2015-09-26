namespace RIAPP.MOD.utils {
    import constsMOD = RIAPP.consts;
    var base_utils = RIAPP.baseUtils;
            
    /*
                //adds new properties to some prototype (not used now)
                export function defineProps(proto, props?: any, propertyDescriptors?:any) {
                    var pds = propertyDescriptors || {}, propertyName;
                    var pdsProperties = Object.getOwnPropertyNames(pds);
                    pdsProperties.forEach(function (name) {
                        var pd = pds[name];
                        if (pd['enumerable'] === undefined) {
                            pd['enumerable'] = true;
                        }
                        if (pd['configurable'] === undefined) {
                            pd['configurable'] = false;
                        }
                    });
                  
                    if (!!props) {
                        var simpleProperties = Object.getOwnPropertyNames(props);
                        for (var i = 0, len = simpleProperties.length; i < len; i += 1) {
                            propertyName = simpleProperties[i];
                            if (pds.hasOwnProperty(propertyName)) {
                                continue;
                            }
    
                            pds[propertyName] = Object.getOwnPropertyDescriptor(props, propertyName);
                        }
                    }
    
                    return Object.defineProperties(proto, pds);
                };
    
                function extend(typeConstructor, superType) {
                    for (var p in superType) if (superType.hasOwnProperty(p)) typeConstructor[p] = superType[p];
                    function __() { this.constructor = typeConstructor; }
                    __.prototype = superType.prototype;
                    typeConstructor.prototype = new __();
                };
               
                //we can add new properties to existing type, it generates new type - constructor function
                export function __extendType(_super, pds, props) {
                    var fn = function () {
                        _super.apply(this, arguments);
                    }
                    extend(fn, _super);
                    defineProps(fn.prototype, pds, props);
                    return fn;
                };
    */

    export class Checks {
        static isNull = base_utils.isNull;
        static isUndefined = base_utils.isUndefined;
        //checking for null type
        static isNt = base_utils.isNt;
        static isFunction = base_utils.isFunc;
        static isString = base_utils.isString;
        static isArray = base_utils.isArray;
        static isBoolean = base_utils.isBoolean;
        static isDate = base_utils.isDate;
        static isNumber = base_utils.isNumber;
        static isNumeric = base_utils.isNumeric;
        static isHTML(a: any): boolean {
            if (Checks.isNt(a)) return false;
            var rx = /html/i;
            return (typeof (a) === 'object') ? rx.test(a.constructor.toString()) : false;
        }
        static isObject(a: any): boolean {
            if (Checks.isNt(a)) return false;
            var rx = /object/i;
            return (typeof (a) === 'object') ? rx.test(a.constructor.toString()) : false;
        }
        static isSimpleObject(a: any): boolean {
            if (Checks.isNt(a)) return false;
            var res = Checks.isObject(a);
            return res && (Object.prototype === Object.getPrototypeOf(a));
        }
        static isRegExp(a: any): boolean {
            if (Checks.isNt(a)) return false;
            var rx = /regexp/i;
            return (typeof (a) === 'function') ? rx.test(a.constructor.toString()) : false;
        }
        static isBoolString(a: any): boolean {
            if (Checks.isNt(a)) return false;
            return (a == 'true' || a == 'false');
        }
        static isBaseObj(obj: any): boolean {
            return !!obj && obj instanceof RIAPP.BaseObject;
        }
        static isEditable(obj: any): boolean {
            return !!obj && obj instanceof RIAPP.BaseObject && !!obj.beginEdit && !!obj.endEdit && !!obj.cancelEdit && global.utils.hasProp(obj, 'isEditing');
        }
        static isSubmittable(obj: any): boolean {
            return !!obj && !!obj.submitChanges && !!obj.rejectChanges && global.utils.hasProp(obj, 'isCanSubmit');
        }
        static isErrorNotification(obj: any): boolean {
            if (!obj)
                return false;
            if (!Checks.isFunction(obj.getIErrorNotification))
                return false;
            var tmp = obj.getIErrorNotification();
            return !!tmp && Checks.isFunction(tmp.getIErrorNotification);
        }
    }

    export class StringUtils {
        static endsWith = base_utils.endsWith;
        static startsWith = base_utils.startsWith;
        static trim = base_utils.trim;
        /**
         *    Usage:     formatNumber(123456.789, 2, '.', ',');
         *    result:    123,456.79
        **/
        static formatNumber(num: any, decimals?: number, dec_point?: string, thousands_sep?: string) {
            num = (num + '').replace(/[^0-9+-Ee.]/g, '');
            var n = !isFinite(+num) ? 0 : +num,
                prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
                sep = (thousands_sep === undefined) ? ',' : thousands_sep,
                dec = (dec_point === undefined) ? '.' : dec_point,
                s = [''],
                // Fix for IE parseFloat(0.55).toFixed(0) = 0;
                toFixedFix = function (n: number, prec: number) {
                    var k = Math.pow(10, prec);
                    return '' + Math.round(n * k) / k;
                };

            if (Checks.isNt(decimals)) {
                s = ('' + n).split('.');
                prec = 2;
            }
            else
                s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');

            var i: number, s0 = '', len = s[0].length;
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
        }
        static stripNonNumeric(str: string) {
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
        }
    };

    export class Validations {
        static checkNumRange(num: number, range: string) {
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
        }
        static _dtRangeToDate(str: string) {
            var dtParts = str.split('-');
            var dt = new Date(parseInt(dtParts[0], 10), parseInt(dtParts[1], 10) - 1, parseInt(dtParts[2], 10));
            return dt;
        }
        static checkDateRange(dt: Date, range: string) {
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
        }
    };

    export interface IValueUtils {
        valueToDate(val: string, dtcnv: number, stz: number): Date;
        dateToValue(dt: Date, dtcnv: consts.DATE_CONVERSION, stz: number): string;
        compareVals(v1: any, v2: any, dataType: consts.DATA_TYPE): boolean;
        stringifyValue(v: any, dcnv: consts.DATE_CONVERSION, dataType: consts.DATA_TYPE, stz: number): string;
        parseValue(v: string, dataType: consts.DATA_TYPE, dcnv: consts.DATE_CONVERSION, stz: number): any;
    }

    export var valueUtils: IValueUtils = {
        valueToDate: function (val: string, dtcnv: consts.DATE_CONVERSION, stz: number): Date {
            if (!val)
                return null;
            val = '' + val;
            var parts = val.split("-");
            if (parts.length != 7) {
                throw new Error(base_utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'val', val));
            }
            var dt = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10), parseInt(parts[3], 10),
                parseInt(parts[4], 10), parseInt(parts[5], 10), (!!parts[6]) ? parseInt(parts[6], 10) : 0);
            var ctz = global.utils.get_timeZoneOffset();

            switch (dtcnv) {
                case consts.DATE_CONVERSION.None:
                    break;
                case consts.DATE_CONVERSION.ServerLocalToClientLocal:
                    dt.setMinutes(dt.getMinutes() + stz); //ServerToUTC
                    dt.setMinutes(dt.getMinutes() - ctz); //UtcToLocal
                    break;
                case consts.DATE_CONVERSION.UtcToClientLocal:
                    dt.setMinutes(dt.getMinutes() - ctz); //UtcToLocal
                    break;
                default:
                    throw new Error(base_utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'dtcnv', dtcnv));
            }
            return dt;
        },
        dateToValue: function (dt: Date, dtcnv: number, serverTZ: number): string {
            if (dt === null)
                return null;
            if (!Checks.isDate(dt))
                throw new Error(base_utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'dt', dt));
            var ctz = global.utils.get_timeZoneOffset();
            switch (dtcnv) {
                case consts.DATE_CONVERSION.None:
                    break;
                case consts.DATE_CONVERSION.ServerLocalToClientLocal:
                    dt.setMinutes(dt.getMinutes() + ctz); //LocalToUTC
                    dt.setMinutes(dt.getMinutes() - serverTZ); //UtcToServer
                    break;
                case consts.DATE_CONVERSION.UtcToClientLocal:
                    dt.setMinutes(dt.getMinutes() + ctz); //LocalToUTC
                    break;
                default:
                    throw new Error(base_utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'dtcnv', dtcnv));
            }
            return ("" + dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate() + "-" + dt.getHours() + "-" + dt.getMinutes() + "-" + dt.getSeconds() + "-" + dt.getMilliseconds());
        },
        compareVals: function (v1: any, v2: any, dataType: consts.DATA_TYPE): boolean {
            if ((v1 === null && v2 !== null) || (v1 !== null && v2 === null))
                return false;
            switch (dataType) {
                case consts.DATA_TYPE.DateTime:
                case consts.DATA_TYPE.Date:
                case consts.DATA_TYPE.Time:
                    if (Checks.isDate(v1) && Checks.isDate(v2))
                        return v1.getTime() === v2.getTime();
                    else
                        return false;
                default:
                    return v1 === v2;
            }
        },
        stringifyValue: function (v: any, dcnv: consts.DATE_CONVERSION, dataType: consts.DATA_TYPE, stz: number): string {
            var res: string = null;

            if (Checks.isNt(v))
                return res;

            function conv(v: any): string {
                if (Checks.isDate(v))
                    return valueUtils.dateToValue(v, dcnv, stz);
                else if (Checks.isArray(v))
                    return JSON.stringify(v);
                else if (Checks.isString(v))
                    return v;
                else
                    return JSON.stringify(v);
            };
            var isOK = false;
            switch (dataType) {
                case consts.DATA_TYPE.None:
                    res = conv(v);
                    isOK = true;
                    break;
                case consts.DATA_TYPE.String:
                case consts.DATA_TYPE.Guid:
                    if (Checks.isString(v)) {
                        res = v;
                        isOK = true;
                    }
                    break;
                case consts.DATA_TYPE.Bool:
                    if (Checks.isBoolean(v)) {
                        res = JSON.stringify(v);
                        isOK = true;
                    }
                    break;
                case consts.DATA_TYPE.Integer:
                case consts.DATA_TYPE.Decimal:
                case consts.DATA_TYPE.Float:
                    if (Checks.isNumber(v)) {
                        res = JSON.stringify(v);
                        isOK = true;
                    }
                    break;
                case consts.DATA_TYPE.DateTime:
                case consts.DATA_TYPE.Date:
                case consts.DATA_TYPE.Time:
                    if (Checks.isDate(v)) {
                        res = valueUtils.dateToValue(v, dcnv, stz);
                        isOK = true;
                    }
                    break;
                case consts.DATA_TYPE.Binary:
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
        parseValue: function (v: string, dataType: consts.DATA_TYPE, dcnv: consts.DATE_CONVERSION, stz: number) {
            var res: any = null;

            if (v === undefined || v === null)
                return res;
            switch (dataType) {
                case consts.DATA_TYPE.None:
                    res = v;
                    break;
                case consts.DATA_TYPE.String:
                case consts.DATA_TYPE.Guid:
                    res = v;
                    break;
                case consts.DATA_TYPE.Bool:
                    res = global.utils.parseBool(v);
                    break;
                case consts.DATA_TYPE.Integer:
                    res = parseInt(v, 10);
                    break;
                case consts.DATA_TYPE.Decimal:
                case consts.DATA_TYPE.Float:
                    res = parseFloat(v);
                    break;
                case consts.DATA_TYPE.DateTime:
                case consts.DATA_TYPE.Date:
                case consts.DATA_TYPE.Time:
                    res = valueUtils.valueToDate(v, dcnv, stz);
                    break;
                case consts.DATA_TYPE.Binary:
                    res = JSON.parse(v);
                    break;
                default:
                    throw new Error(base_utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'dataType', dataType));
            }

            return res;
        }
    };

    /* 
    LifeTimeScope used to hold references to objects and destroys 
    them all when LifeTimeScope is destroyed itself
    */
    export class LifeTimeScope extends RIAPP.BaseObject {
        private _objs: BaseObject[];

        constructor() {
            super();
            this._objs = [];
        }
        static create() {
            return new LifeTimeScope();
        }
        addObj(b: BaseObject) {
            if (this._objs.indexOf(b) < 0)
                this._objs.push(b);
        }
        removeObj(b: BaseObject) {
            global.utils.removeFromArray(this._objs, b);
        }
        getObjs() {
            return this._objs;
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            this._objs.forEach(function (obj) {
                if (!obj.getIsDestroyCalled())
                    obj.destroy();
            });
            this._objs = [];
            super.destroy();
        }
        toString() {
            return 'LifeTimeScope';
        }
    }

    export class PropWatcher extends RIAPP.BaseObject {
        private _objId: string;
        private _objs: BaseObject[];
        constructor() {
            super();
            this._objId = 'prw' + base_utils.getNewID();
            this._objs = [];
        }
        static create() {
            return new PropWatcher();
        }
        addPropWatch(obj: BaseObject, prop: string, fn_onChange: (prop: string) => void) {
            var self = this;
            obj.addOnPropertyChange(prop, function (s, a) {
                fn_onChange(a.property);
            }, self.uniqueID);

            if (self._objs.indexOf(obj) < 0)
                self._objs.push(obj);
        }
        addWatch(obj: BaseObject, props: string[], fn_onChange: (prop: string) => void) {
            var self = this;
            obj.addOnPropertyChange('*', function (s, a) {
                if (props.indexOf(a.property) > -1) {
                    fn_onChange(a.property);
                }
            }, self.uniqueID);

            if (self._objs.indexOf(obj) < 0)
                self._objs.push(obj);
        }
        removeWatch(obj: BaseObject) {
            obj.removeNSHandlers(this.uniqueID);
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            var self = this;
            this._objs.forEach(function (obj) {
                self.removeWatch(obj);
            });
            this._objs = [];
            super.destroy();
        }
        toString() {
            return 'PropWatcher ' + this._objId;
        }
        get uniqueID() {
            return this._objId;
        }
    }

    export interface IWaitQueueItem {
        prop: string;
        groupName?: string;
        predicate: (val: any) => boolean;
        action: (...args: any[]) => any;
        actionArgs?: any[];
        lastWins?: boolean;
        syncCheck?: boolean;
    }

    interface IWaitQueueTask {
        predicate: (val: any) => boolean;
        action: (...args: any[]) => any;
        group: string;
        lastWins: boolean;
        args: any[];
    }

    /* 
       waits for property change on the object (the owner)
       then checks queue of actions for the property change
       based on property value checking predicate
       if the predicate returns true, invokes the task's action
    */
    export class WaitQueue extends RIAPP.BaseObject {
        private _objId: string;
        private _owner: BaseObject;
        private _queue: { [property: string]: IWaitQueueTask[] };
        constructor(owner: BaseObject) {
            super();
            this._objId = 'wq' + base_utils.getNewID();
            this._owner = owner;
            this._queue = {}
        }
        static create(owner: BaseObject) {
            return new WaitQueue(owner);
        }
        protected _checkQueue(prop: string, value: any) {
            if (!this._owner || this._owner.getIsDestroyCalled()) {
                return;
            }
            var self = this, propQueue = this._queue[prop], task: IWaitQueueTask;
            if (!propQueue || propQueue.length == 0) {
                return;
            }

            var i: number, firstWinsTask: IWaitQueueTask = null,
                groups: {
                    group: string;
                    tasks: IWaitQueueTask[]
                } = { group: <string>null, tasks: <IWaitQueueTask[]>[] },
                found: IWaitQueueTask[] = [], forRemoval: IWaitQueueTask[] = [];

            for (i = 0; i < propQueue.length; i += 1) {
                task = propQueue[i];
                if (task.predicate(value)) {
                    if (!task.group && groups.tasks.length == 0) {
                        firstWinsTask = task;
                        break;
                    }
                    else if (!!task.group) { //the task in the group of tasks
                        if (!groups.group) {
                            groups.group = task.group;
                        }
                        if (groups.group === task.group) {
                            groups.tasks.push(task); //if the task in the same group, add it to the array
                        }
                    }
                }
            }
                    
            //the first task will be executed, in normal queued order, the rest tasks are waiting
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

                    if (firstWinsTask.lastWins) { //the last task wins, the rest is ignored
                        if (found.length == 0)
                            found.push(task); //add only the last task, the rest just remove from queue
                    }
                    else
                        found.push(task); //add all tasks in the group, they will be executed all
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
        }
        enQueue(item: IWaitQueueItem) {
            var opts: IWaitQueueItem = global.utils.extend(false, {
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
                        self._checkQueue(property, (<any>self._owner)[property]);
                    }, 0);
                }, self.uniqueID);
            }
            var task: IWaitQueueTask = {
                predicate: opts.predicate,
                action: opts.action,
                group: opts.groupName,
                lastWins: opts.lastWins,
                args: (!opts.actionArgs ? [] : opts.actionArgs)
            };
            propQueue.push(task);
            if (!!opts.syncCheck) {
                self._checkQueue(property, (<any>self._owner)[property]);
            }
            else {
                setTimeout(function () {
                    if (self.getIsDestroyCalled())
                        return;
                    self._checkQueue(property, (<any>self._owner)[property]);
                }, 0);
            }
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            this._owner.removeNSHandlers(this.uniqueID);
            this._queue = {};
            this._owner = null;
            super.destroy();
        }
        toString() {
            return 'WaitQueue ' + this._objId;
        }
        get uniqueID() {
            return this._objId;
        }
        get owner() {
            return this._owner;
        }
    }

    export class Utils {
        constructor() {
        }
        static create() {
            return new Utils();
        }
        get check() {
            return Checks;
        }
        get str() {
            return StringUtils;
        }
        get validation() {
            return Validations;
        }
        getNewID(): number {
            return base_utils.getNewID();
        }
        isContained(oNode: any, oCont: any) {
            if (!oNode) return false;
            while (!!(oNode = oNode.parentNode)) if (oNode === oCont) return true;
            return false;
        }
        slice = Array.prototype.slice;
        get_timeZoneOffset = (function () {
            var dt = new Date();
            var tz = dt.getTimezoneOffset();

            return function () {
                return tz;
            }
        })();
        parseBool(bool_value: any) {
            if (Checks.isBoolean(bool_value))
                return bool_value;
            var v = base_utils.trim(bool_value).toLowerCase();
            if (v === 'false') return false;
            if (v === 'true') return true;
            throw new Error(this.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'bool_value', bool_value));
        }
        round(num: number, decimals: number) {
            return parseFloat(num.toFixed(decimals));
        }
        performAjaxCall(url: string, postData: string, async: boolean, fn_success: (res: string) => void, fn_error: (res: any) => void, context: any): IPromise<string> {
            var req = new XMLHttpRequest(), mimeType = 'application/json; charset=utf-8';
            req.open('POST', url, async);
            var deferred = this.createDeferred();
            req.responseType = 'text';
            req.onload = function (e) {
                if (this.status == 200) {
                    var res: string = this.response;
                    deferred.resolve(res);
                }
            };
            req.onerror = function (e: any) {
                deferred.reject(new Error(e.target.status));
            };
            req.ontimeout = function () {
                deferred.reject(new Error("The request for " + url + " timed out."));
            };
            req.timeout = global.defaults.ajaxTimeOut * 1000;
            req.setRequestHeader('Content-Type', mimeType);
            req.send(postData);
            var promise: any = deferred.promise();

            if (!!fn_success) {
                promise.done(function (data: any) {
                    fn_success.call(context, data);
                });
            }

            if (!!fn_error) {
                promise.fail(function (err: any) {
                    fn_error.call(context, err);
                });
            }
            return promise;
        }
        performAjaxGet(url: string): IPromise<string> {
            var req = new XMLHttpRequest();
            req.open('GET', url, true); /* always async mode */
            var deferred = this.createDeferred();
            req.responseType = 'text';
            req.onload = function (e) {
                if (this.status == 200) {
                    var res = this.response;
                    deferred.resolve(res);
                }
            };
            req.onerror = function (e: any) {
                deferred.reject(new Error(e.target.status));
            };
            req.ontimeout = function () {
                deferred.reject(new Error("The request for " + url + " timed out."));
            };
            req.timeout = global.defaults.ajaxTimeOut * 1000;
            req.send(null);
            var promise: any = deferred.promise();
            return promise;
        }
        format = base_utils.format;
        extend(deep: boolean, defaults: any, options: any) {
            if (deep)
                return this.cloneObj(options, defaults);
            else
                return this.mergeObj(options, defaults);
        }
        removeNode(node: Node) {
            if (!node)
                return;
            var pnd = node.parentNode;
            if (!!pnd)
                pnd.removeChild(node);
        }
        insertAfter(referenceNode: Node, newNode: Node) {
            var parent = referenceNode.parentNode;
            if (parent.lastChild === referenceNode)
                parent.appendChild(newNode);
            else
                parent.insertBefore(newNode, referenceNode.nextSibling);
        }
        getProps(obj: any) {
            return Object.getOwnPropertyNames(obj);
        }
        forEachProp(obj: any, fn: (name: string) => void) {
            var names = Object.getOwnPropertyNames(obj);
            names.forEach(fn);
        }
        hasProp(obj: any, prop: string): boolean {
            return base_utils.hasProp(obj, prop);
        }
        createDeferred(): IDeferred<any> {
            return global.$.Deferred();
        }
        isDeferredPending(deferred: IDeferred<any>): boolean {
            return deferred.state() == "pending";
        }
        cloneObj(o: any, mergeIntoObj?: any) {
            var c: any, i: number, len: number, self = this;
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
                //clone only simple objects
                c = mergeIntoObj || {};
                var p: string, keys = Object.getOwnPropertyNames(o);
                len = keys.length;
                for (i = 0; i < len; i += 1) {
                    p = keys[i];
                    c[p] = self.cloneObj(o[p], null);
                }
            }
            else
                return o;
            return c;
        }
        shallowCopy(o: any) {
            return this.mergeObj(o, {});
        }
        mergeObj(obj: any, mergeIntoObj: any) {
            if (!mergeIntoObj) {
                mergeIntoObj = {};
            }
            if (!obj)
                return mergeIntoObj;
            var names = Object.getOwnPropertyNames(obj), n: string;
            for (var i = 0, len = names.length; i < len; i += 1) {
                n = names[i];
                mergeIntoObj[n] = obj[n];
            }
            return mergeIntoObj;
        }
        removeFromArray(array: any[], obj: any) {
            var i = array.indexOf(obj);
            if (i > -1) {
                array.splice(i, 1);
            }
            return i;
        }
        insertIntoArray(array: any[], obj: any, pos: number) {
            array.splice(pos, 0, obj);
        }
        getErrorNotification(obj: any): IErrorNotification {
            if (!obj)
                return null;
            if (!!obj._aspect && Checks.isErrorNotification(obj._aspect))
                return <IErrorNotification>obj._aspect.getIErrorNotification();
            else if (Checks.isErrorNotification(obj))
                return <IErrorNotification>obj.getIErrorNotification();
            else
                return null;
        }
        getEditable(obj: any): IEditable {
            if (!obj)
                return null;
            if (!!obj._aspect && Checks.isEditable(obj._aspect)) {
                return <IEditable>obj._aspect;
            }
            else if (Checks.isEditable(obj)) {
                return <IEditable>obj;
            }
            else
                return null;
        }
        getSubmittable(obj: any): ISubmittable {
            if (!obj)
                return null;
            if (!!obj._aspect && Checks.isSubmittable(obj._aspect)) {
                return <ISubmittable>obj._aspect;
            }
            else if (Checks.isSubmittable(obj)) {
                return <ISubmittable>obj;
            }
            else
                return null;
        }
        destroyJQueryPlugin($el: JQuery, name: string) {
            var plugin = $el.data(name);
            if (!!plugin) {
                $el[name]('destroy');
            }
        }
        /*
         * Generate a random uuid.
         *
         * USAGE: utils.uuid(length, radix)
         *   length - the desired number of characters
         *   radix  - the number of allowable values for each character.
         *
         * EXAMPLES:
         *   // No arguments  - returns RFC4122, version 4 ID
         *   >>> utils.uuid()
         *   "92329D39-6F5C-4520-ABFC-AAB64544E172"
         *
         *   // One argument - returns ID of the specified length
         *   >>> utils.uuid(15)     // 15 character ID (default base=62)
         *   "VcydxgltxrVZSTV"
         *
         *   // Two arguments - returns ID of the specified length, and radix. (Radix must be <= 62)
         *   >>> utils.uuid(8, 2)  // 8 character ID (base=2)
         *   "01001010"
         *   >>> utils.uuid(8, 10) // 8 character ID (base=10)
         *   "47473046"
         *   >>> utils.uuid(8, 16) // 8 character ID (base=16)
         *   "098F4D35"
         */
        uuid = (function () {
            // Private array of chars to use
            var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

            return function (len?: number, radix?: number) {
                var i: number, chars = CHARS, uuid: string[] = [], rnd = Math.random;
                radix = radix || chars.length;

                if (!!len) {
                    // Compact form
                    for (i = 0; i < len; i += 1) uuid[i] = chars[0 | rnd() * radix];
                } else {
                    // rfc4122, version 4 form
                    var r: number;

                    // rfc4122 requires these characters
                    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
                    uuid[14] = '4';

                    // Fill in random data.  At i==19 set the high bits of clock sequence as
                    // per rfc4122, sec. 4.1.5
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

    global.registerType('PropWatcher', PropWatcher);
    global.registerType('LifeTimeScope', LifeTimeScope);
    global.registerType('WaitQueue', WaitQueue);
    _isModuleLoaded = true;
}
