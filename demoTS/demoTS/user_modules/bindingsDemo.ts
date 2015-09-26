/// <reference path="..\..\jriappTS\jriapp.d.ts"/>
/// <reference path="common.ts"/>
namespace RIAPP.BINDDEMO {
    'use strict';
    var global = RIAPP.global, utils = global.utils;

    export class UppercaseConverter extends MOD.converter.BaseConverter {
        convertToSource(val, param, dataContext) {
            if (utils.check.isString(val))
                return val.toLowerCase();
            else
                return val;
        }
        convertToTarget(val, param, dataContext) {
            if (utils.check.isString(val))
                return val.toUpperCase();
            else
                return val;
        }
    }

    export class TestObject extends BaseObject {
        _testProperty1: string;
        _testProperty2: string;
        _testCommand: MOD.mvvm.ICommand;
        _month: number;
        _months: DEMODB.KeyValDictionary;
        _format: string;
        _formats: DEMODB.StrKeyValDictionary;

        constructor(initPropValue: string) {
            super();
            var self = this;
            this._testProperty1 = initPropValue;
            this._testProperty2 = null;
            this._testCommand = new MOD.mvvm.Command(function (sender, args) {
                self._onTestCommandExecuted();
            }, self,
                function (sender, args) {
                    //if this function return false, then the command is disabled
                    return utils.check.isString(self.testProperty1) && self.testProperty1.length > 3;
                });

            this._month = new Date().getMonth() + 1;
            this._months = new DEMODB.KeyValDictionary();
            this._months.fillItems([{ key: 1, val: 'January' }, { key: 2, val: 'February' }, { key: 3, val: 'March' },
                { key: 4, val: 'April' }, { key: 5, val: 'May' }, { key: 6, val: 'June' },
                { key: 7, val: 'July' }, { key: 8, val: 'August' }, { key: 9, val: 'September' }, { key: 10, val: 'October' },
                { key: 11, val: 'November' }, { key: 12, val: 'December' }], true);

            this._format = 'PDF';
            this._formats = new DEMODB.StrKeyValDictionary();
            this._formats.fillItems([{ key: 'PDF', val: 'Acrobat Reader PDF' }, { key: 'WORD', val: 'MS Word DOC' }, { key: 'EXCEL', val: 'MS Excel XLS' }], true);
        }
        _onTestCommandExecuted() {
            alert(utils.format("testProperty1:{0}, format:{1}, month: {2}", this.testProperty1, this.format, this.month));
        }
        get testProperty1() { return this._testProperty1; }
        set testProperty1(v) {
            if (this._testProperty1 != v) {
                this._testProperty1 = v;
                this.raisePropertyChanged('testProperty1');
                //let the command to evaluate its availability
                this._testCommand.raiseCanExecuteChanged();
            }
        }
        get testProperty2() { return this._testProperty2; }
        set testProperty2(v) {
            if (this._testProperty2 != v) {
                this._testProperty2 = v;
                this.raisePropertyChanged('testProperty2');
            }
        }
        get testCommand() { return this._testCommand; }
        get testToolTip() {
            return "Click the button to execute the command.<br/>" +
                "P.S. <b>command is active when the testProperty length > 3</b>";
        }
        get format() { return this._format; }
        set format(v) {
            if (this._format !== v) {
                this._format = v;
                this.raisePropertyChanged('format');
            }
        }
        get formats() { return this._formats; }
        get month() { return this._month; }
        set month(v) {
            if (v !== this._month) {
                this._month = v;
                this.raisePropertyChanged('month');
            }
        }
        get months() { return this._months; }
    }

    export class DemoApplication extends Application {
        _errorVM: COMMON.ErrorViewModel;
        _testObject: TestObject;

        constructor(options: IAppOptions) {
            super(options);
            var self = this;
            this._errorVM = null;
            this._testObject = null;
        }
        onStartUp() {
            var self = this;
            this._errorVM = new COMMON.ErrorViewModel(this);
            this._testObject = new TestObject('some initial text');
            //here we could process application's errors
            this.addOnError(function (sender, data) {
                debugger;
                data.isHandled = true;
                self.errorVM.error = data.error;
                self.errorVM.showDialog();
            });
            super.onStartUp();
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            var self = this;
            try {
                self._errorVM.destroy();
                self._testObject.destroy();
                if (!!self.UC.createdBinding)
                    self.UC.createdBinding.destroy();
            } finally {
                super.destroy();
            }
        }
        get errorVM() { return this._errorVM; }
        get TEXT() { return localizable.TEXT; }
        get testObject() { return this._testObject; }
    }

    //global error handler - the last resort (typically display message to the user)
    RIAPP.global.addOnError(function (sender, args) {
        debugger;
        alert(args.error.message);
    });

    RIAPP.global.addOnUnResolvedBinding((s, args) => {
        var msg = "unresolved databound property for";
        if (args.bindTo == RIAPP.BindTo.Source) {
            msg += " Source: "
        }
        else {
            msg += " Target: "
        }
        msg += "'" + args.root + "'";
        msg += ", property: '" + args.propName + "'";
        msg += ", binding path: '" + args.path + "'";

        console.log(msg);
    });

    function initModule(app: Application) {
        app.registerConverter('uppercaseConverter', new UppercaseConverter());
        return BINDDEMO;
    };

    export var appOptions: IAppOptions = {
        user_modules: [{ name: "COMMON", initFn: COMMON.initModule },
            { name: "BINDDEMO", initFn: initModule }]
    };
}