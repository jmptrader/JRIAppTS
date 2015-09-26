/// <reference path="..\..\jriappTS\jriapp.d.ts"/>
'use strict';
//using static import for CORE jriapp modules (they are inside jriapp.js file)
import MOD = RIAPP.MOD;
//using AMD to load user modules
import VIEWMODELS = require("spaDemoViewModels");
import DEMODB = require("domainModel");
import COMMON = require("common");
import AUTOCOMPLETE = require("autocomplete");
import GRIDELVIEW = require("gridElView");

//local variables for optimization
var global = RIAPP.global, utils = global.utils;

export interface IMainOptions extends RIAPP.IAppOptions {
    service_url: string;
    permissionInfo?: MOD.db.IPermissionsInfo;
    images_path: string;
    spa_template1_url: string;
    spa_template2_url: string;
    spa_template3_url: string;
}

export class DemoApplication extends RIAPP.Application {
    private _dbContext: DEMODB.DbContext;
    private _errorVM: COMMON.ErrorViewModel;
    private _customerVM: VIEWMODELS.CustomerVM;

    constructor(options: IMainOptions) {
        super(options);
        var self = this;
        this._dbContext = null;
        this._errorVM = null;
        this._customerVM = null;
    }
    onStartUp() {
        var self = this, options: IMainOptions = self.options;
        this._dbContext = new DEMODB.DbContext();
        this._dbContext.initialize({ serviceUrl: options.service_url, permissions: options.permissionInfo });
        function toText(str) {
            if (str === null)
                return '';
            else
                return str;
        };

        this._dbContext.dbSets.Customer.defineComplexProp_NameField(function (item) {
            return toText(item.ComplexProp.LastName) + '  ' + toText(item.ComplexProp.MiddleName) + '  ' + toText(item.ComplexProp.FirstName);
        });
        //register globally accesible dbContext's instance
        this.registerObject('dbContext', this._dbContext);
        this._errorVM = new COMMON.ErrorViewModel(this);
        this._customerVM = new VIEWMODELS.CustomerVM(this);

        function handleError(sender, data) {
            self._handleError(sender, data);
        };
        //here we could process application's errors
        this.addOnError(handleError);
        this._dbContext.addOnError(handleError);

        super.onStartUp();
        this._customerVM.load();
    }
    private _handleError(sender, data) {
        debugger;
        data.isHandled = true;
        this.errorVM.error = data.error;
        this.errorVM.showDialog();
    }
    //really, the destroy method is redundant here because the application lives while the page lives
    destroy() {
        if (this._isDestroyed)
            return;
        this._isDestroyCalled = true;
        var self = this;
        try {
            self._errorVM.destroy();
            self._customerVM.destroy();
            self._dbContext.destroy();
        } finally {
            super.destroy();
        }
    }
    get options() { return <IMainOptions>this._options; }
    get dbContext() { return this._dbContext; }
    get errorVM() { return this._errorVM; }
    get customerVM() { return this._customerVM; }
    get TEXT() { return RIAPP.localizable.TEXT; }
}

//global error handler - the last resort (typically display message to the user)
RIAPP.global.addOnError(function (sender, args) {
    debugger;
    alert(args.error.message);
});

//will be executed only when RIAPP.DebugLevel higher than NONE
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


//properties must be initialized on the HTML page
export var mainOptions: IMainOptions = {
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
