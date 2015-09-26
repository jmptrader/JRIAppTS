/// <reference path="..\..\jriappTS\jriapp.d.ts"/>
/// <reference path="common.ts"/>
/// <reference path="..\..\jriappTS\thirdparty\sse.d.ts"/>

namespace RIAPP.SSEVENTS {
    //server side events client
    'use strict';

    var global = RIAPP.global, utils = global.utils;

    export class SSEventsVM extends BaseObject {
        private _es: sse.IEventSourceStatic;
        private _baseUrl: string;
        private _url: string;
        private _closeClientUrl: string;
        private _postMsgUrl: string;
        private _clientID: string;
        private _openESCommand: MOD.mvvm.ICommand;
        private _deffered: IDeferred<any>;
        private _timeOut: any;

        constructor(baseUrl, clientID) {
            super();
            var self = this;
            this._es = null;
            this._deffered = null;

            this._baseUrl = baseUrl;
            this._clientID = clientID;
            this._url = this._baseUrl + "?id=" + clientID;
            this._closeClientUrl = this._baseUrl + "/CloseClient?id=" + clientID;
            this._postMsgUrl = this._baseUrl + "/PostMessage";

            this._openESCommand = new MOD.mvvm.Command(function (sender, data) {
                self.open();
            }, self, null);

            global.addOnUnLoad(function (s, a) {
                self.close();
            });
        }
        static isSupported(): boolean {
            try {
                return !!EventSource;
            } catch (e) {
                return false;
            }
        }
        protected _getEventNames() {
            var base_events = super._getEventNames();
            return ['open', 'close', 'error', 'message'].concat(base_events);
        }
        private _onEsOpen(event) {
            clearTimeout(this._timeOut);
            this._timeOut = null;
            if (!!this._deffered) {
                this._deffered.resolve();
                this._deffered = null;
            }
        }
        private _onEsError(event) {
            this._close();
            var err = new Error("" + event);
            this.handleError(err, this);
        }
        private _onMsg(event) {
            var data = JSON.parse(event.data);
            this.raiseEvent('message', { message: event.data, data: data });
        }
        private _close() {
            var self = this;
            if (!!this._timeOut)
                clearTimeout(this._timeOut);
            this._timeOut = null;

            if (!!this._deffered) {
                this._deffered.reject({ message: "EventSource closed" });
            }
            this._deffered = null;

            if (!!this._es) {
                try {
                    this._es.close();
                    this._es = null;
                }
                catch (e) {
                    this._es = null;
                }
            }
        }
        addOnMessage(fn: (sender: any, args: { message: string; data: any; }) => void, namespace?: string) {
            this.addHandler('message', fn, namespace);
        }
        open(): IPromise<any> {
            var self = this;
            if (!!this._deffered)
                return this._deffered.promise();
            this._deffered = global.utils.createDeferred();
            this._timeOut = setTimeout(function () {
                self._timeOut = null;
                if (!!self._deffered) {
                    self._deffered.reject({ message: "EventSource connect timeout!" });
                    self._deffered = null;
                    self._close();
                }
            }, 10000);
            if (!this._es) {
                this._es = new EventSource(self.url);
                this._es.addEventListener('message', function (e) {
                    self._onMsg(e);
                }, false);
                this._es.addEventListener('open', function (e) {
                    self._onEsOpen(e);
                }, false);
                this._es.addEventListener('error', function (e) {
                    self._onEsError(e);
                }, false);
            }
            return this._deffered.promise();
        }
        //gracefully close the sse client
        close() {
            var self = this, postData = null;
            utils.performAjaxCall(
                self._closeClientUrl,
                postData,
                true,
                function (res) { //success
                    self._close();
                },
                function (er) { //error
                    self._close();
                    self.handleError(er, self);
                }, null);
        }
        //post message (to itself or another client)
        post(message: string, clientID?: string) {
            var payload = { message: message };
            var self = this, postData = JSON.stringify({ payload: payload, clientID: !clientID ? self._clientID : clientID });
            return utils.performAjaxCall(
                self._postMsgUrl,
                postData,
                true, null, null, null);
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
        get es() { return this._es; }
        get openESCommand() { return this._openESCommand; }
        get url() { return this._url; }
        get baseUrl() { return this._baseUrl; }
        get clientID() { return this._clientID; }
    }


    export function initModule(app: Application) {
        return SSEVENTS;
    };
}