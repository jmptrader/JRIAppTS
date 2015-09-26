namespace RIAPP {
    'use strict';
 
    var OBJ_EVENTS = {
        error: 'error',
        destroyed: 'destroyed'
    };

    export class BaseObject implements IBaseObject {
        protected _isDestroyed: boolean;
        protected _isDestroyCalled: boolean;
        private _events: IIndexer<IList>;
 
        constructor() {
            this._isDestroyed = false;
            this._isDestroyCalled = false;
            this._events = null;
        }
        private _removeNsHandler(ev: IIndexer<IList>, ns: string) {
            var keys = Object.keys(ev), key: string, list: IList;
            for (var i = 0, k = keys.length; i < k; ++i) {
                key = keys[i];
                list = ev[key];
                if (!!list) {
                    ListHelper.removeNodes(list, ns);
                    if (!list.head)
                        ev[key] = null;
                }
            }
        }
        protected _getEventNames(): string[] {
            return [OBJ_EVENTS.error, OBJ_EVENTS.destroyed];
        }
        protected _addHandler(name: string, handler: TEventHandler<any, any>, nmspace?: string, context?: BaseObject, prepend?: boolean):void {
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

            var list = ev[n], node: IListNode = ListHelper.CreateNode(handler, ns, context);

            if (!list) {
                ev[n] = list = ListHelper.CreateList();
            }

            if (!prepend) {
                ListHelper.appendNode(list, node);
            }
            else {
                ListHelper.prependNode(list, node);
            }
        }
        protected _removeHandler(name?: string, nmspace?: string): void {
            var self = this, ev = self._events, ns = '*';
            if (!ev)
                return;

            if (!!nmspace)
                ns = '' + nmspace;
            var list: IList;

            //arguments supplied is name (and optionally nmspace)
            if (!!name) {
                list = ev[name];
                if (!list)
                    return;
                if (ns == '*') {
                    ListHelper.removeNodes(list, ns);
                    ev[name] = null;
                }
                else {
                    ListHelper.removeNodes(list, ns);
                    if (!list.head)
                        ev[name]= null;
                }
                return;
            }

            this._removeNsHandler(ev, ns);

            if (ns == '*') {
                //no arguments supplied
                self._events = null;
            }
        }
        protected _raiseEvent(name: string, args: any):void {
            var self = this, ev = self._events;
            if (ev === null)
                return;
            if (ev === undefined) {
                throw new Error("The object's instance is invalid. The object constructor has not been called!");
            }

            if (!!name) {
                //if an object's property changed
                if (name != '0*' && name.charAt(0) == '0')  
                {
                    //recursive call
                    //notify clients who subscribed for all property changes
                    this._raiseEvent('0*', args); 
                }
                var events = ListHelper.toArray(ev[name]), cur: IListNode;
                for (var i = 0; i < events.length; i++) {
                    cur = events[i];
                    cur.fn.apply(cur.context, [self, args]);
                }
            }
        }
        protected _checkEventName(name: string): void {
            var proto = Object.getPrototypeOf(this), map: { [name: string]: boolean; };
            //cache events' names in object's prototype
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
                if (DebugLevel == DEBUG_LEVEL.HIGH) {
                    RIAPP.startDebugger();
                }
                var err = new Error(RIAPP.baseUtils.format(RIAPP.ERRS.ERR_EVENT_INVALID, name));
                this.handleError(err, this);
                throw err;
            }
        }
        protected _isHasProp(prop: string):boolean {
            return baseUtils.hasProp(this, prop);
        }
        handleError(error: any, source: any): boolean {
            if (!!RIAPP.global && RIAPP.checkIsDummy(error)) {
                return true;
            }
            if (!error.message) {
                error = new Error('' + error);
            }
            var args: TErrorArgs = { error: error, source: source, isHandled: false };
            this._raiseEvent(OBJ_EVENTS.error, args);
            return args.isHandled;
        }
        raisePropertyChanged(name: string):void {
            var data = { property: name };
            var parts = name.split('.'), lastPropName = parts[parts.length - 1];
            if (parts.length > 1) {
                var obj = baseUtils.resolveOwner(this, name);
                if (DebugLevel > DEBUG_LEVEL.NONE && baseUtils.isUndefined(obj)) {
                    if (DebugLevel == DEBUG_LEVEL.HIGH) {
                        RIAPP.startDebugger();
                    }
                    throw new Error(baseUtils.format(RIAPP.ERRS.ERR_PROP_NAME_INVALID, name));
                }
                if (obj instanceof BaseObject) {
                    (<BaseObject>obj).raiseEvent('0' + lastPropName, data);
                }
            }
            else {
                if (DebugLevel > DEBUG_LEVEL.NONE && !baseUtils.hasProp(this, lastPropName)) {
                    if (DebugLevel == DEBUG_LEVEL.HIGH) {
                        RIAPP.startDebugger();
                    }
                    throw new Error(baseUtils.format(RIAPP.ERRS.ERR_PROP_NAME_INVALID, lastPropName));
                }
                this.raiseEvent('0' + lastPropName, data);
            }
        }
        addHandler(name: string, handler: TEventHandler<any, any>, nmspace?: string, context?: BaseObject, prepend?: boolean):void {
            this._checkEventName(name);
            this._addHandler(name, handler, nmspace, context, prepend);
        }
        removeHandler(name?: string, nmspace?: string):void {
            if (!!name) {
                this._checkEventName(name);
            }
            this._removeHandler(name, nmspace);
        }
        addOnDestroyed(handler: TEventHandler<any, any>, nmspace?: string, context?: BaseObject):void {
            this._addHandler(OBJ_EVENTS.destroyed, handler, nmspace, context, false);
        }
        removeOnDestroyed(nmspace?: string):void {
            this._removeHandler(OBJ_EVENTS.destroyed, nmspace);
        }
        addOnError(handler: TErrorHandler, nmspace?: string, context?: BaseObject): void {
            this._addHandler(OBJ_EVENTS.error, handler, nmspace, context, false);
        }
        removeOnError(nmspace?: string):void {
            this._removeHandler(OBJ_EVENTS.error, nmspace);
        }
        //remove event handlers by their namespace
        removeNSHandlers(nmspace?: string) :void {
            this._removeHandler(null, nmspace);
        }
        raiseEvent(name: string, args: any): void {
            if (!name)
                throw new Error(RIAPP.ERRS.ERR_EVENT_INVALID);
            if (name.charAt(0) != '0')
                this._checkEventName(name);
            this._raiseEvent(name, args);
        }
        //to subscribe fortthe changes on all properties, pass in the prop parameter: '*'
        addOnPropertyChange(prop: string, handler: TPropChangedHandler, nmspace?: string, context?: BaseObject):void {
            if (!prop)
                throw new Error(RIAPP.ERRS.ERR_PROP_NAME_EMPTY);
            if (DebugLevel > DEBUG_LEVEL.NONE && prop != '*' && !this._isHasProp(prop)) {
                if (DebugLevel == DEBUG_LEVEL.HIGH) {
                    RIAPP.startDebugger();
                }
                throw new Error(baseUtils.format(RIAPP.ERRS.ERR_PROP_NAME_INVALID, prop));
            }
            prop = '0' + prop;
            this._addHandler(prop, handler, nmspace, context, false);
        }
        removeOnPropertyChange(prop?: string, nmspace?: string):void {
            if (!!prop) {
                if (DebugLevel > DEBUG_LEVEL.NONE && prop != '*' && !this._isHasProp(prop)) {
                    if (DebugLevel == DEBUG_LEVEL.HIGH) {
                        RIAPP.startDebugger();
                    }
                    throw new Error(baseUtils.format(RIAPP.ERRS.ERR_PROP_NAME_INVALID, prop));
                }
                prop = '0' + prop;
            }
            this._removeHandler(prop, nmspace);
        }
        getIsDestroyed(): boolean {
            return this._isDestroyed;
        }
        getIsDestroyCalled(): boolean {
            return this._isDestroyCalled;
        }
        destroy(): void {
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
        }
    }
}
