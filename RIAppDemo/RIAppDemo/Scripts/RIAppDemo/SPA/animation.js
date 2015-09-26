/// <reference path="..\..\jriappTS\jriapp.d.ts"/>
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports"], function (require, exports) {
    //local variables for optimization
    var global = RIAPP.global, utils = global.utils;
    var FadeAnimation = (function (_super) {
        __extends(FadeAnimation, _super);
        function FadeAnimation(isAnimateFirstShow, duration) {
            _super.call(this);
            this._$animatedEl = null;
            this._effect = 'fade';
            this._duration = !!duration ? duration : 1000;
            this._isAnimateFirstShow = !!isAnimateFirstShow;
        }
        FadeAnimation.prototype.beforeShow = function (template, isFirstShow) {
        };
        FadeAnimation.prototype.show = function (template, isFirstShow) {
            this.stop();
            this._$animatedEl = global.$(template.el.parentElement);
            this._$animatedEl.hide();
            var deffered = utils.createDeferred();
            this._$animatedEl.show(this._effect, this._duration, function () {
                deffered.resolve();
            });
            return deffered.promise();
        };
        FadeAnimation.prototype.beforeHide = function (template) {
            this.stop();
            this._$animatedEl = global.$(template.el.parentElement);
        };
        FadeAnimation.prototype.hide = function (template) {
            var deffered = utils.createDeferred();
            this._$animatedEl.hide(this._effect, this._duration, function () {
                deffered.resolve();
            });
            return deffered.promise();
        };
        FadeAnimation.prototype.stop = function () {
            if (!!this._$animatedEl)
                this._$animatedEl.finish();
        };
        Object.defineProperty(FadeAnimation.prototype, "isAnimateFirstShow", {
            get: function () {
                return true;
            },
            enumerable: true,
            configurable: true
        });
        FadeAnimation.prototype.destroy = function () {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            try {
                this.stop();
                this._$animatedEl = null;
            }
            finally {
                _super.prototype.destroy.call(this);
            }
        };
        return FadeAnimation;
    })(RIAPP.BaseObject);
    exports.FadeAnimation = FadeAnimation;
    var SlideAnimation = (function (_super) {
        __extends(SlideAnimation, _super);
        function SlideAnimation(isAnimateFirstShow, duration) {
            _super.call(this);
            this._$animatedEl = null;
            this._effect = 'slide';
            this._duration = !!duration ? duration : 1000;
            this._isAnimateFirstShow = !!isAnimateFirstShow;
        }
        SlideAnimation.prototype.beforeShow = function (template, isFirstShow) {
        };
        SlideAnimation.prototype.show = function (template, isFirstShow) {
            this.stop();
            this._$animatedEl = global.$(template.el.parentElement);
            var deffered = utils.createDeferred();
            this._$animatedEl.show(this._effect, this._duration, function () {
                deffered.resolve();
            });
            return deffered.promise();
        };
        SlideAnimation.prototype.beforeHide = function (template) {
            this.stop();
            this._$animatedEl = global.$(template.el.parentElement);
        };
        SlideAnimation.prototype.hide = function (template) {
            var deffered = utils.createDeferred();
            this._$animatedEl.hide(this._effect, this._duration, function () {
                deffered.resolve();
            });
            return deffered.promise();
        };
        SlideAnimation.prototype.stop = function () {
            if (!!this._$animatedEl)
                this._$animatedEl.finish();
        };
        Object.defineProperty(SlideAnimation.prototype, "isAnimateFirstShow", {
            get: function () {
                return true;
            },
            enumerable: true,
            configurable: true
        });
        SlideAnimation.prototype.destroy = function () {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            try {
                this.stop();
                this._$animatedEl = null;
            }
            finally {
                _super.prototype.destroy.call(this);
            }
        };
        return SlideAnimation;
    })(RIAPP.BaseObject);
    exports.SlideAnimation = SlideAnimation;
    //this function is executed when an application which uses this module is created
    function initModule(app) {
        //return something, even null is OK
        return {};
    }
    exports.initModule = initModule;
});
//# sourceMappingURL=animation.js.map