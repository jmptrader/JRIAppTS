namespace RIAPP {
    'use strict';
    import errMOD = RIAPP.MOD.errors;

    export enum DEBUG_LEVEL {
        NONE= 0, NORMAL= 1, HIGH= 2
    }

    export var DebugLevel: DEBUG_LEVEL = DEBUG_LEVEL.NONE;
    export function startDebugger() {
        debugger;
    }

    export function throwDummy(origErr: any): void {
        if (errMOD._isModuleLoaded && !!origErr && !origErr.isDummy) {
            throw errMOD.DummyError.create(origErr);
        }
        throw origErr;
    }
    export function checkIsDummy(error: any): boolean {
        return !!error && !!error.isDummy;
    }
    export function reThrow(ex: any, isHandled:boolean) {
        if (!!isHandled)
            RIAPP.throwDummy(ex);
        else
            throw ex;
    }

    export interface IListNode {
        context: any
        fn: TEventHandler<any,any>;
        ns: string;
        next: IListNode;
    }
    export interface IList {
        head: IListNode;
        tail: IListNode;
    }

    export class ListHelper {
        static CreateList(): IList {
            return { head: null, tail: null };
        }
        static CreateNode(handler: TErrorHandler, ns: string, context?: any): IListNode {
            var node: IListNode = { fn: handler, ns: ns, next: null, context: !context ? null : context };
            return node;
        }
        static countNodes(list: IList): number {
            if (!list)
                return 0;
            var cur = list.head, i = 0;
            while (!!cur) {
                cur = cur.next;
                ++i;
            }
            return i;
        }
        static prependNode(list: IList, node: IListNode): void {
            node.next = list.head
            list.head = node;
            if (!list.tail)
                list.tail = list.head;
        }
        static appendNode(list: IList, node: IListNode): void {
            if (!list.head) {
                list.tail = node;
                list.head = node;
                return;
            }
            var old = list.tail;
            list.tail = node;
            old.next = node;
        }
        static removeNodes(list: IList, ns: string): void {
            if (!list)
                return null;
            var head = list.head, prev: IListNode = null, del: IListNode, cur = head,
                next: IListNode = (!cur) ? null : cur.next;
            while (!!cur) {
                if (ns == '*' || cur.ns == ns) {
                    del = cur;
                    //delete node
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
        }
        static toArray(list: IList): IListNode[] {
            var res: IListNode[] = [];
            if (!list)
                return res;
            var cur = list.head;
            while (!!cur) {
                res.push(cur);
                cur = cur.next;
            }
            return res;
        }
    }

    export class ArrayHelper {
        public static clone<T>(arr: T[]): T[] {
            if (arr.length === 1) {
                return [arr[0]];
            }
            else {
                return Array.apply(null, arr);
            }
        }
        public static fromList(list: { length: number;[index: number]: any; }) {
            var array = new Array(list.length);
            for (var i = 0, n = list.length; i < n; i++)
                array[i] = list[i];
            return array;
        }
        public static fromCollection(list: HTMLCollection) {
            return ArrayHelper.fromList(<any>list);
        }
        public static distinct(arr: any[]) {
            var o = <any>{}, i: number, l = arr.length, r:any[] = [];
            for (i = 0; i < l; i += 1) o[arr[i]] = arr[i];
            var k = Object.keys(o);
            for (i = 0, l = k.length; i < l; i += 1)
                r.push(o[k[i]]);
            return r;
        }
    }

    //essential basic utils
    export class baseUtils {
        private static _newID = 0;
        static getNewID(): number {
            var id = baseUtils._newID;
            baseUtils._newID += 1;
            return id;
        }
        static isNull(a: any): boolean {
            return a === null;
        }
        static isUndefined(a: any): boolean {
            return a === undefined;
        }
        static isNt(a: any): boolean {
            return (a === null || a === undefined);
        }
        static isString(a: any): boolean {
            if (baseUtils.isNt(a)) return false;
            var rx = /string/i;
            return (typeof (a) === 'string') ? true : (typeof (a) === 'object') ? rx.test(a.constructor.toString()) : false;
        }
        static isFunc(a: any): boolean {
            if (baseUtils.isNt(a)) return false;
            var rx = /Function/;
            return (typeof (a) === 'function') ? rx.test(a.constructor.toString()) : false;
        }
        static isBoolean(a: any): boolean {
            if (baseUtils.isNt(a)) return false;
            var rx = /boolean/i;
            return (typeof (a) === 'boolean') ? true : (typeof (a) === 'object') ? rx.test(a.constructor.toString()) : false;
        }
        static isDate(a: any): boolean {
            if (baseUtils.isNt(a)) return false;
            var rx = /date/i;
            return (typeof (a) === 'date') ? true : (typeof (a) === 'object') ? rx.test(a.constructor.toString()) : false;
        }
        static isNumber(a: any): boolean {
            if (baseUtils.isNt(a)) return false;
            var rx = /Number/;
            return (typeof (a) === 'number') ? true : (typeof (a) === 'object') ? rx.test(a.constructor.toString()) : false;
        }
        static isNumeric(obj: any): boolean {
            return baseUtils.isNumber(obj) || (baseUtils.isString(obj) && !isNaN(Number(obj)));
        }
        static endsWith(str: string, suffix: string): boolean {
            return (str.substr(str.length - suffix.length) === suffix);
        }
        static startsWith(str: string, prefix: string): boolean {
            return (str.substr(0, prefix.length) === prefix);
        }
        static fastTrim(str: string): string {
            return str.replace(/^\s+|\s+$/g, '');
        }
        static trim(str: string, chars?: string): string {
            if (!chars) {
                return baseUtils.fastTrim(str);
            }
            return baseUtils.ltrim(baseUtils.rtrim(str, chars), chars);
        }
        static ltrim(str: string, chars?: string): string {
            chars = chars || "\\s";
            return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
        }
        static rtrim(str: string, chars?: string): string {
            chars = chars || "\\s";
            return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
        }
        static isArray(o: any): boolean {
            if (!o)
                return false;
            return Array.isArray(o);
        }
        static hasProp(obj: any, prop: string): boolean {
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
        }
        /*
         *    Usage:     format('test {0}={1}', 'x', 100);
         *    result:    test x=100
        */
        static format(format_str: string, ...args: any[]): string {
            var result = '';
            for (var i = 0; ;) {
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
                if (close < 0) throw new Error(baseUtils.format(RIAPP.ERRS.ERR_STRING_FORMAT_INVALID, format_str));
                var brace = format_str.substring(i, close);
                var colonIndex = brace.indexOf(':');
                var argNumber = parseInt((colonIndex < 0) ? brace : brace.substring(0, colonIndex), 10);
                if (isNaN(argNumber)) throw new Error(baseUtils.format(RIAPP.ERRS.ERR_STRING_FORMAT_INVALID, format_str));
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
        }

        static setValue(root: any, namePath: string, val: any, checkOverwrite: boolean): void {
            var parts = namePath.split('.'),
                parent = root,
                i: number;

            for (i = 0; i < parts.length - 1; i += 1) {
                // create a property if it doesn't exist
                if (!parent[parts[i]]) {
                    parent[parts[i]] = {};
                }
                parent = parent[parts[i]];
            }
            //the last part is the name itself
            var n = parts[parts.length - 1];
            if (!!checkOverwrite && (parent[n] !== undefined)) {
                throw new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_OBJ_ALREADY_REGISTERED, namePath));
            }
            parent[n] = val;
        }
        static getValue(root: any, namePath: string): any {
            var parts = namePath.split('.'),
                parent = root,
                i: number, res: any;

            for (i = 0; i < parts.length; i += 1) {
                res = parent[parts[i]];
                if (res === undefined) {
                    return null;
                }
                parent = res;
            }
            return res;
        }
        static removeValue(root: any, namePath: string): any {
            var parts = namePath.split('.'),
                parent = root,
                i: number, val: any = null;

            for (i = 0; i < parts.length - 1; i += 1) {
                if (!parent[parts[i]]) {
                    return null;
                }
                parent = parent[parts[i]];
            }
            //the last part is the object name itself
            var n = parts[parts.length - 1];
            val = parent[n];
            if (val !== undefined) {
                delete parent[n];
            }

            //returns deleted value
            return val;
        }

        //the object that directly has this property (last object in chain)
        static resolveOwner(obj: any, path: string): any {
            var parts = path.split('.'), i: number, res:any, len = parts.length;
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
        }
    }
}
