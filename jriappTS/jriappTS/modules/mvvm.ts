namespace RIAPP.MOD.mvvm {
    export interface ICommand {
        canExecute: (sender: any, param: any) => boolean;
        execute: (sender: any, param: any) => void;
        raiseCanExecuteChanged: () => void;
        addOnCanExecuteChanged(fn: (sender: mvvm.ICommand, args: {}) => void, nmspace?: string, context?: RIAPP.BaseObject): void;
        removeOnCanExecuteChanged(nmspace?: string): void;
    }

    var CMD_EVENTS = {
        can_execute_changed: 'canExecute_changed'
    };

    export class Command extends RIAPP.BaseObject implements ICommand {
        private _action: (sender: any, param: any) => void;
        private _thisObj: any;
        private _canExecute: (sender: any, param: any) => boolean;
        private _objId: string;

        constructor(fn_action: (sender: any, param: any) => void, thisObj: any, fn_canExecute: (sender: any, param: any) => boolean) {
            super();
            var utils = RIAPP.global.utils;
            this._action = fn_action;
            this._thisObj = !thisObj ? null : thisObj;
            this._canExecute = fn_canExecute;
            this._objId = 'cmd' + baseUtils.getNewID();
        }
        protected _getEventNames() {
            var base_events = super._getEventNames();
            return [CMD_EVENTS.can_execute_changed].concat(base_events);
        }
        addOnCanExecuteChanged(fn: (sender: mvvm.ICommand, args: {}) => void, nmspace?: string, context?: RIAPP.BaseObject) {
            this._addHandler(CMD_EVENTS.can_execute_changed, fn, nmspace, context);
        }
        removeOnCanExecuteChanged(nmspace?: string) {
            this._removeHandler(CMD_EVENTS.can_execute_changed, nmspace);
        }
        canExecute(sender: any, param: any): boolean {
            if (!this._canExecute)
                return true;
            return this._canExecute.apply(this._thisObj, [sender, param]);
        }
        execute(sender: any, param: any) {
            if (!!this._action) {
                this._action.apply(this._thisObj, [sender, param]);
            }
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            this._action = null;
            this._thisObj = null;
            this._canExecute = null;
            super.destroy();
        }
        raiseCanExecuteChanged() {
            this.raiseEvent(CMD_EVENTS.can_execute_changed, {});
        }
        toString() {
            return 'Command';
        }
    }

    export class BaseViewModel extends RIAPP.BaseObject {
        private _objId: string;
        protected _app: Application;

        constructor(app: Application) {
            super();
            this._app = app;
            this._objId = 'vm' + baseUtils.getNewID();
        }
        handleError(error: any, source: any): boolean {
            var isHandled = super.handleError(error, source);
            if (!isHandled) {
                return this._app.handleError(error, source);
            }
            return isHandled;
        }
        toString() {
            return 'BaseViewModel';
        }
        destroy() {
            this._app = null;
            super.destroy();
        }
        get uniqueID() {
            return this._objId;
        }
        get $() { return global.$; }
        get app() { return this._app; }
    }

    global.registerType('Command', Command);
    global.registerType('BaseViewModel', BaseViewModel);
    _isModuleLoaded = true;
}
