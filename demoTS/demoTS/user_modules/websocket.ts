/// <reference path="..\..\jriappTS\jriapp.d.ts"/>
/// <reference path="common.ts"/>

namespace RIAPP.WEBSOCK {
    //websocket client
    'use strict';

    var global = RIAPP.global, utils = global.utils;

    export class WebSocketsVM extends BaseObject {
        private _ws: WebSocket;
        private _clientID: string;
        private _url: string;
        private _openWsCommand: MOD.mvvm.ICommand;
        private _deffered: IDeferred<any>;
        private _timeOut: any;
        private _svcName: string;

        constructor(port: number, svcName?: string) {
            super();
            var self = this;
            this._ws = null;
            this._clientID = null;
            this._deffered = null;
            this._svcName = !!svcName ? svcName : "PollingService";

            var url = "ws://" + window.location.host.split(":")[0] + ":" + port + "/" + this._svcName;
            this._url = url;
            this._openWsCommand = new MOD.mvvm.Command(function (sender, data) {
                self.open();
            }, self, null);

            global.addOnUnLoad(function (s, a) {
                self.close();
            });
        }
        protected _getEventNames() {
            var base_events = super._getEventNames();
            return ['open', 'close', 'error', 'message'].concat(base_events);
        }
        protected _onWsOpen(event) {
        }
        protected _onWsClose(event) {
            this._ws = null;
            this._clientID = null;
            clearTimeout(this._timeOut);
            this._timeOut = null;

            if (!!this._deffered) {
                this._deffered.reject("Websocket closed");
                this._deffered = null;
            }
            this.raiseEvent('close', {});
        }
        protected _onWsError(event) {
            this.close();
            this.raiseEvent('error', {});
            var err = new Error("" + event);
            this.handleError(err, this);
        }
        protected _onMsg(event) {
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
        }
        addOnMessage(fn: (sender: WebSocketsVM, args: { message: string; data: any; }) => void, namespace?: string) {
            this.addHandler('message', fn, namespace);
        }
        open(): IPromise<any> {
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
        }
        close() {
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
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            var self = this;
            try {
                self.close();
            } finally {
                super.destroy();
            }
        }
        get ws() { return this._ws; }
        get openWsCommand() { return this._openWsCommand; }
        get url() { return this._url; }
        set url(v) { this._url = v; }
        get clientID() { return this._clientID; }
    }


    export function initModule(app: Application) {
        return WEBSOCK;
    };
}