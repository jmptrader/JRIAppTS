namespace RIAPP.MOD.utils {
    export var _isModuleLoaded: boolean = false;
    export var _initModule: (app: Application) => void = (app: Application) => { };
}
namespace RIAPP.MOD.errors {
    export var _isModuleLoaded: boolean = false;
    export var _initModule: (app: Application) => void = (app: Application) => { };
} 
namespace RIAPP.MOD.converter {
    export var _isModuleLoaded: boolean = false;
    export var _initModule: (app: Application) => void = (app: Application) => { };
} 
namespace RIAPP.MOD.defaults {
    export var _isModuleLoaded: boolean = false;
    export var _initModule: (app: Application) => void = (app: Application) => { };
}
namespace RIAPP.MOD.parser {
    export var _isModuleLoaded: boolean = false;
    export var _initModule: (app: Application) => void = (app: Application) => { };
} 
namespace RIAPP.MOD.mvvm {
    export var _isModuleLoaded: boolean = false;
    export var _initModule: (app: Application) => void = (app: Application) => { };
}
namespace RIAPP.MOD.baseElView {
    export var _isModuleLoaded: boolean = false;
    export var _initModule: (app: Application) => void = (app: Application) => { };
    export var _isElView: (obj: any) => boolean = (obj) => { return false; };
}
namespace RIAPP.MOD.binding {
    export var _isModuleLoaded: boolean = false;
    export var _initModule: (app: Application) => void = (app: Application) => { };
    //a result of parsing a data binding expression -typically all properties are strings here
    export interface IBindingInfo {
        mode?: string;
        converterParam?: any;
        converter?: any;
        targetPath: string;
        sourcePath?: string;
        to?: string;
        target?: any;
        source?: any;
    }

    export var _isBinding: (obj: any) => boolean = (obj) => { return false; };
}
namespace RIAPP.MOD.collection {
    export var _isModuleLoaded: boolean = false;
    export var _initModule: (app: Application) => void = (app: Application) => { };

    //DUMMY implementations
    export var _isCollection: (obj: any) => boolean = (obj) => { return false; };
    export var _getItemByProp: (obj: any, prop: string) => any = (obj, prop) => {
        return null;     
    };
}
namespace RIAPP.MOD.template {
    export var _isModuleLoaded: boolean = false;
    export var _initModule: (app: Application) => void = (app: Application) => { };

    export var _isTemplateElView: (obj: any) => boolean = (obj) => { return false; };
}
namespace RIAPP.MOD.baseContent {
    export var _isModuleLoaded: boolean = false;
    export var _initModule: (app: Application) => void = (app: Application) => { };
}
namespace RIAPP.MOD.dataform {
    export var _isModuleLoaded: boolean = false;
    export var _initModule: (app: Application) => void = (app: Application) => { };
    import elviewMOD = RIAPP.MOD.baseElView;
    //DUMMY implementations
    export var _setIsInsideTemplate: (elView: elviewMOD.BaseElView) => void = (elView) => { };
    export var _isDataForm: (el: HTMLElement) => boolean = (el) => { return false; };
    export var _isInsideDataForm: (el: HTMLElement) => boolean = (el) => { return false; };
    export var _isInNestedForm: (root: any, forms: HTMLElement[], el: HTMLElement) => boolean = (root: any, forms: HTMLElement[], el: HTMLElement) => { return false; };
    export var _getParentDataForm: (rootForm: HTMLElement, el: HTMLElement) => HTMLElement = (rootForm: HTMLElement, el: HTMLElement) => { return null; };
}
namespace RIAPP.MOD.dynacontent {
    export var _isModuleLoaded: boolean = false;
    export var _initModule: (app: Application) => void = (app: Application) => { };
}
namespace RIAPP.MOD.datepicker {
    export var _isModuleLoaded: boolean = false;
    export var _initModule: (app: Application) => void = (app: Application) => { };
}
namespace RIAPP.MOD.tabs {
    export var _isModuleLoaded: boolean = false;
    export var _initModule: (app: Application) => void = (app: Application) => { };
}
namespace RIAPP.MOD.listbox {
    export var _isModuleLoaded: boolean = false;
    export var _initModule: (app: Application) => void = (app: Application) => { };
}
namespace RIAPP.MOD.datadialog {
    export var _isModuleLoaded: boolean = false;
    export var _initModule: (app: Application) => void = (app: Application) => { };
}
namespace RIAPP.MOD.datagrid {
    export var _isModuleLoaded: boolean = false;
    export var _initModule: (app: Application) => void = (app: Application) => { };
}
namespace RIAPP.MOD.pager {
    export var _isModuleLoaded: boolean = false;
    export var _initModule: (app: Application) => void = (app: Application) => { };
}
namespace RIAPP.MOD.stackpanel {
    export var _isModuleLoaded: boolean = false;
    export var _initModule: (app: Application) => void = (app: Application) => { };
}
namespace RIAPP.MOD.db {
    export var _isModuleLoaded: boolean = false;
    export var _initModule: (app: Application) => void = (app: Application) => { };
} 