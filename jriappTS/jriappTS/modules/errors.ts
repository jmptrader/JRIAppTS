namespace RIAPP.MOD.errors {
    export class BaseError extends RIAPP.BaseObject {
        private _message: string;
        private _isDummy: boolean;
        private _origError: any;

        constructor(message: string) {
            super();
            this._message = message;
            this._isDummy = false;
            this._origError = null;
        }
        static create(message: string) {
            return new BaseError(message);
        }
        toString() {
            return this._message;
        }
        get message() {
            return this._message;
        }
        set message(v) {
            this._message = v;
        }
        get isDummy() {
            return this._isDummy;
        }
        set isDummy(v) {
            this._isDummy = v;
        }
        get origError() {
            return this._origError;
        }
        set origError(v) {
            this._origError = v;
        }
    }

    export class DummyError extends BaseError {
        constructor(ex: any) {
            super("DUMMY_ERROR");
            this.origError = ex;
            this.isDummy = true;
        }
        static create(ex: any) {
            return new DummyError(ex);
        }
    }

    export class ValidationError extends BaseError {
        _errors: RIAPP.IValidationInfo[];
        _item: any;
        constructor(errorInfo: RIAPP.IValidationInfo[], item: any) {
            var message = RIAPP.ERRS.ERR_VALIDATION + '\r\n', i = 0;
            errorInfo.forEach(function (err) {
                if (i > 0)
                    message = message + '\r\n';
                if (!!err.fieldName)
                    message = message + ' ' + RIAPP.localizable.TEXT.txtField + ': ' + err.fieldName + ' -> ' + err.errors.join(', ');
                else
                    message = message + err.errors.join(', ');
                i += 1;
            });
            super(message);
            this._errors = errorInfo;
            this._item = item;
        }
        get item() {
            return this._item;
        }
        get errors() {
            return this._errors;
        }
    }

    _isModuleLoaded = true;
}
