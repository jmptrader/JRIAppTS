/// <reference path="..\..\jriappTS\jriapp.d.ts"/>

'use strict';
//using static import for CORE jriapp modules
import MOD = RIAPP.MOD;
import templMOD = RIAPP.MOD.template;
import dynMOD = RIAPP.MOD.dynacontent;

//local variables for optimization
var global = RIAPP.global, utils = global.utils;

export class FadeAnimation extends RIAPP.BaseObject implements dynMOD.IAnimation {
    private _$animatedEl: JQuery;
    private _effect: string;
    private _duration: number;
    private _isAnimateFirstShow: boolean;

    constructor(isAnimateFirstShow: boolean, duration?: number) {
        super();
        this._$animatedEl = null;
        this._effect = 'fade';
        this._duration = !!duration ? duration : 1000;
        this._isAnimateFirstShow = !!isAnimateFirstShow;
    }
    beforeShow(template: templMOD.Template, isFirstShow: boolean):void {
    }
    show(template: templMOD.Template, isFirstShow: boolean): RIAPP.IVoidPromise {
        this.stop();
        this._$animatedEl = global.$(template.el.parentElement);
        this._$animatedEl.hide();
        var deffered = utils.createDeferred();
        (<any>this._$animatedEl).show(this._effect, this._duration, () => {
            deffered.resolve();
        });
        return deffered.promise();
    }
    beforeHide(template: templMOD.Template): void {
        this.stop();
        this._$animatedEl = global.$(template.el.parentElement);
    }
    hide(template: templMOD.Template): RIAPP.IVoidPromise {
        var deffered = utils.createDeferred();
        (<any>this._$animatedEl).hide(this._effect, this._duration, () => {
            deffered.resolve();
        });
        return deffered.promise();
    }
    stop(): void {
        if (!!this._$animatedEl)
            this._$animatedEl.finish();
    }
    get isAnimateFirstShow() {
        return true;
    }
    destroy() {
        if (this._isDestroyed)
            return;
        this._isDestroyCalled = true;
        try {
            this.stop();
            this._$animatedEl = null;
        }
        finally {
            super.destroy();
        }
    }
}

export class SlideAnimation extends RIAPP.BaseObject implements dynMOD.IAnimation {
    private _$animatedEl: JQuery;
    private _effect: string;
    private _duration: number;
    private _isAnimateFirstShow: boolean;

    constructor(isAnimateFirstShow: boolean, duration?: number) {
        super();
        this._$animatedEl = null;
        this._effect = 'slide';
        this._duration = !!duration ? duration : 1000;
        this._isAnimateFirstShow = !!isAnimateFirstShow;
    }
    beforeShow(template: templMOD.Template, isFirstShow: boolean): void {
    }
    show(template: templMOD.Template, isFirstShow: boolean): RIAPP.IVoidPromise {
        this.stop();
        this._$animatedEl = global.$(template.el.parentElement);
        var deffered = utils.createDeferred();
        (<any>this._$animatedEl).show(this._effect, this._duration, () => {
            deffered.resolve();
        });
        return deffered.promise();
    }
    beforeHide(template: templMOD.Template): void {
        this.stop();
        this._$animatedEl = global.$(template.el.parentElement);
    }
    hide(template: templMOD.Template): RIAPP.IVoidPromise {
        var deffered = utils.createDeferred();
        (<any>this._$animatedEl).hide(this._effect, this._duration, () => {
            deffered.resolve();
        });
        return deffered.promise();
    }
    stop(): void {
        if (!!this._$animatedEl)
            this._$animatedEl.finish();
    }
    get isAnimateFirstShow() {
        return true;
    }
    destroy() {
        if (this._isDestroyed)
            return;
        this._isDestroyCalled = true;
        try {
            this.stop();
            this._$animatedEl = null;
        }
        finally {
            super.destroy();
        }
    }
}


//this function is executed when an application which uses this module is created
export function initModule(app: RIAPP.Application) {
    //return something, even null is OK
    return {};
}
