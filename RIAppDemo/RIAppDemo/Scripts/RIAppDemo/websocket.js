/// <reference path="..\..\jriappTS\jriapp.d.ts"/>
/// <reference path="common.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RIAPP;
(function (RIAPP) {
    var WEBSOCK;
    (function (WEBSOCK) {
        //websocket client
        'use strict';
        var global = RIAPP.global, utils = global.utils;
        var WebSocketsVM = (function (_super) {
            __extends(WebSocketsVM, _super);
            function WebSocketsVM(port, svcName) {
                _super.call(this);
                var self = this;
                this._ws = null;
                this._clientID = null;
                this._deffered = null;
                this._svcName = !!svcName ? svcName : "PollingService";
                var url = "ws://" + window.location.host.split(":")[0] + ":" + port + "/" + this._svcName;
                this._url = url;
                this._openWsCommand = new RIAPP.MOD.mvvm.Command(function (sender, data) {
                    self.open();
                }, self, null);
                global.addOnUnLoad(function (s, a) {
                    self.close();
                });
            }
            WebSocketsVM.prototype._getEventNames = function () {
                var base_events = _super.prototype._getEventNames.call(this);
                return ['open', 'close', 'error', 'message'].concat(base_events);
            };
            WebSocketsVM.prototype._onWsOpen = function (event) {
            };
            WebSocketsVM.prototype._onWsClose = function (event) {
                this._ws = null;
                this._clientID = null;
                clearTimeout(this._timeOut);
                this._timeOut = null;
                if (!!this._deffered) {
                    this._deffered.reject("Websocket closed");
                    this._deffered = null;
                }
                this.raiseEvent('close', {});
            };
            WebSocketsVM.prototype._onWsError = function (event) {
                this.close();
                this.raiseEvent('error', {});
                var err = new Error("" + event);
                this.handleError(err, this);
            };
            WebSocketsVM.prototype._onMsg = function (event) {
                var data = JSON.parse(event.data);
                if (data.Tag == "connect") {
                    clearTimeout(this._timeOut);
                    this._timeOut = null;
                    this._clientID = data.Payload;
                    if (!!this._deffered) {
                        this._deffered.resolve(this._clientID);
                        this._deffered = null;
                    }
                }
                else
                    this.raiseEvent('message', { message: event.data, data: data });
            };
            WebSocketsVM.prototype.addOnMessage = function (fn, namespace) {
                this.addHandler('message', fn, namespace);
            };
            WebSocketsVM.prototype.open = function () {
                var self = this;
                if (!!this._deffered)
                    return this._deffered.promise();
                this._deffered = global.utils.createDeferred();
                if (!!this._ws && !!this._clientID) {
                    this._deffered.resolve(this._clientID);
                    var promise = this._deffered.promise();
                    this._deffered = null;
                    return promise;
                }
                this._timeOut = setTimeout(function () {
                    self._timeOut = null;
                    if (!!self._deffered) {
                        self._deffered.reject("WebSocket connect timeout!");
                        self._deffered = null;
                        self.close();
                    }
                }, 5000);
                if (!this._ws) {
                    this._ws = new WebSocket(self.url);
                    this._ws.onopen = function (e) { self._onWsOpen(e); };
                    this._ws.onclose = function (e) { self._onWsClose(e); };
                    this._ws.onmessage = function (e) { self._onMsg(e); };
                    this._ws.onerror = function (e) { self._onWsError(e); };
                }
                return this._deffered.promise();
            };
            WebSocketsVM.prototype.close = function () {
                clearTimeout(this._timeOut);
                this._timeOut = null;
                if (!!this._deffered) {
                    this._deffered.reject("Websocket closed");
                }
                this._deffered = null;
                if (!!this._ws) {
                    try {
                        this._ws.close();
                        this._ws = null;
                        this._clientID = null;
                    }
                    catch (e) {
                        this._ws = null;
                        this._clientID = null;
                    }
                }
            };
            WebSocketsVM.prototype.destroy = function () {
                if (this._isDestroyed)
                    return;
                this._isDestroyCalled = true;
                var self = this;
                try {
                    self.close();
                }
                finally {
                    _super.prototype.destroy.call(this);
                }
            };
            Object.defineProperty(WebSocketsVM.prototype, "ws", {
                get: function () { return this._ws; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(WebSocketsVM.prototype, "openWsCommand", {
                get: function () { return this._openWsCommand; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(WebSocketsVM.prototype, "url", {
                get: function () { return this._url; },
                set: function (v) { this._url = v; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(WebSocketsVM.prototype, "clientID", {
                get: function () { return this._clientID; },
                enumerable: true,
                configurable: true
            });
            return WebSocketsVM;
        })(RIAPP.BaseObject);
        WEBSOCK.WebSocketsVM = WebSocketsVM;
        function initModule(app) {
            return WEBSOCK;
        }
        WEBSOCK.initModule = initModule;
        ;
    })(WEBSOCK = RIAPP.WEBSOCK || (RIAPP.WEBSOCK = {}));
})(RIAPP || (RIAPP = {}));
//# sourceMappingURL=websocket.js.map