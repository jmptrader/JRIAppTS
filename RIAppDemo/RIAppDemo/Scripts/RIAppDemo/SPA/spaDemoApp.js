/// <reference path="..\..\jriappTS\jriapp.d.ts"/>
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "spaDemoViewModels", "domainModel", "common", "autocomplete", "gridElView"], function (require, exports, VIEWMODELS, DEMODB, COMMON, AUTOCOMPLETE, GRIDELVIEW) {
    //local variables for optimization
    var global = RIAPP.global, utils = global.utils;
    var DemoApplication = (function (_super) {
        __extends(DemoApplication, _super);
        function DemoApplication(options) {
            _super.call(this, options);
            var self = this;
            this._dbContext = null;
            this._errorVM = null;
            this._customerVM = null;
        }
        DemoApplication.prototype.onStartUp = function () {
            var self = this, options = self.options;
            this._dbContext = new DEMODB.DbContext();
            this._dbContext.initialize({ serviceUrl: options.service_url, permissions: options.permissionInfo });
            function toText(str) {
                if (str === null)
                    return '';
                else
                    return str;
            }
            ;
            this._dbContext.dbSets.Customer.defineComplexProp_NameField(function (item) {
                return toText(item.ComplexProp.LastName) + '  ' + toText(item.ComplexProp.MiddleName) + '  ' + toText(item.ComplexProp.FirstName);
            });
            //register globally accesible dbContext's instance
            this.registerObject('dbContext', this._dbContext);
            this._errorVM = new COMMON.ErrorViewModel(this);
            this._customerVM = new VIEWMODELS.CustomerVM(this);
            function handleError(sender, data) {
                self._handleError(sender, data);
            }
            ;
            //here we could process application's errors
            this.addOnError(handleError);
            this._dbContext.addOnError(handleError);
            _super.prototype.onStartUp.call(this);
            this._customerVM.load();
        };
        DemoApplication.prototype._handleError = function (sender, data) {
            debugger;
            data.isHandled = true;
            this.errorVM.error = data.error;
            this.errorVM.showDialog();
        };
        //really, the destroy method is redundant here because the application lives while the page lives
        DemoApplication.prototype.destroy = function () {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            var self = this;
            try {
                self._errorVM.destroy();
                self._customerVM.destroy();
                self._dbContext.destroy();
            }
            finally {
                _super.prototype.destroy.call(this);
            }
        };
        Object.defineProperty(DemoApplication.prototype, "options", {
            get: function () { return this._options; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DemoApplication.prototype, "dbContext", {
            get: function () { return this._dbContext; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DemoApplication.prototype, "errorVM", {
            get: function () { return this._errorVM; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DemoApplication.prototype, "customerVM", {
            get: function () { return this._customerVM; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DemoApplication.prototype, "TEXT", {
            get: function () { return RIAPP.localizable.TEXT; },
            enumerable: true,
            configurable: true
        });
        return DemoApplication;
    })(RIAPP.Application);
    exports.DemoApplication = DemoApplication;
    //global error handler - the last resort (typically display message to the user)
    RIAPP.global.addOnError(function (sender, args) {
        debugger;
        alert(args.error.message);
    });
    //will be executed only when RIAPP.DebugLevel higher than NONE
    RIAPP.global.addOnUnResolvedBinding(function (s, args) {
        var msg = "unresolved databound property for";
        if (args.bindTo == 0 /* Source */) {
            msg += " Source: ";
        }
        else {
            msg += " Target: ";
        }
        msg += "'" + args.root + "'";
        msg += ", property: '" + args.propName + "'";
        msg += ", binding path: '" + args.path + "'";
        console.log(msg);
    });
    //properties must be initialized on the HTML page
    exports.mainOptions = {
        service_url: null,
        permissionInfo: null,
        images_path: null,
        spa_template1_url: null,
        spa_template2_url: null,
        spa_template3_url: null,
        user_modules: [{ name: "COMMON", initFn: COMMON.initModule },
            { name: "AUTOCOMPLETE", initFn: AUTOCOMPLETE.initModule },
            { name: "GRIDELVIEW", initFn: GRIDELVIEW.initModule },
            { name: "SPADEMO", initFn: VIEWMODELS.initModule }
        ]
    };
});
//# sourceMappingURL=spaDemoApp.js.map