/// <reference path="..\..\jriappTS\jriapp.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RIAPP;
(function (RIAPP) {
    var HEADER;
    (function (HEADER) {
        'use strict';
        var global = RIAPP.global, utils = global.utils;
        HEADER.topPanel = "#demoHeader";
        HEADER.contentPanel = "#demoContent";
        var HeaderVM = (function (_super) {
            __extends(HeaderVM, _super);
            function HeaderVM(app) {
                _super.call(this, app);
                var self = this;
                this._$topPanel = global.$(HEADER.topPanel);
                this._$contentPanel = global.$(HEADER.contentPanel);
                this._contentPanelHeight = 0;
                if (!!this._$contentPanel)
                    this._contentPanelHeight = this._$contentPanel.height();
                this._expanderCommand = new RIAPP.MOD.mvvm.Command(function (sender, param) {
                    if (sender.isExpanded) {
                        self.expand();
                    }
                    else
                        self.collapse();
                }, self, null);
            }
            HeaderVM.prototype._getEventNames = function () {
                var base_events = _super.prototype._getEventNames.call(this);
                return ['updateUI'].concat(base_events);
            };
            HeaderVM.prototype.addOnUpdateUI = function (fn, namespace) {
                this.addHandler('updateUI', fn, namespace);
            };
            HeaderVM.prototype.expand = function () {
                var self = this;
                this._$topPanel.slideDown('fast', function () { self.updateUI(false); });
            };
            HeaderVM.prototype.collapse = function () {
                var self = this;
                this._$topPanel.slideUp('fast', function () { self.updateUI(true); });
            };
            HeaderVM.prototype.updateUI = function (isUp) {
                var args = { isHandled: false, isUp: isUp };
                this.raiseEvent('updateUI', args);
                if (args.isHandled)
                    return;
                if (!!this._$contentPanel) {
                    if (isUp)
                        this._$contentPanel.height(this._contentPanelHeight);
                    else
                        this._$contentPanel.height(this._contentPanelHeight - this._$topPanel.outerHeight());
                }
            };
            Object.defineProperty(HeaderVM.prototype, "expanderCommand", {
                get: function () { return this._expanderCommand; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HeaderVM.prototype, "$contentPanel", {
                get: function () { return this._$contentPanel; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HeaderVM.prototype, "$topPanel", {
                get: function () { return this._$topPanel; },
                enumerable: true,
                configurable: true
            });
            return HeaderVM;
        })(RIAPP.MOD.mvvm.BaseViewModel);
        HEADER.HeaderVM = HeaderVM;
        function initModule(app) {
            return HEADER;
        }
        HEADER.initModule = initModule;
        ;
    })(HEADER = RIAPP.HEADER || (RIAPP.HEADER = {}));
})(RIAPP || (RIAPP = {}));
//# sourceMappingURL=header.js.map