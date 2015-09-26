define(["require", "exports", "spaDemoApp"], function (require, exports, SPADEMO) {
    'use strict';
    SPADEMO.mainOptions = RIAPP.global.utils.extend(false, SPADEMO.mainOptions, mainOptions);
    //create and start application here
    RIAPP.global.addOnLoad(function (sender, a) {
        var global = sender, appOptions = SPADEMO.mainOptions;
        //initialize images folder path
        global.defaults.imagesPath = appOptions.images_path;
        //create and then start application
        var thisApp = new SPADEMO.DemoApplication(appOptions);
        thisApp.registerTemplateGroup('custGroup', {
            url: appOptions.spa_template1_url,
            names: ["SPAcustTemplate", "goToInfoColTemplate", "SPAcustDetailTemplate", "customerEditTemplate", "customerDetailsTemplate", "orderEditTemplate",
                "orderDetEditTemplate", "orderDetailsTemplate", "productTemplate1", "productTemplate2",
                "prodAutocompleteTemplate"]
        });
        thisApp.registerTemplateGroup('custInfoGroup', {
            url: appOptions.spa_template2_url,
            names: ["customerInfo", "salespersonTemplate1", "salespersonTemplate2", "salePerAutocompleteTemplate"]
        });
        thisApp.registerTemplateGroup('custAdrGroup', {
            url: appOptions.spa_template3_url,
            names: ["customerAddr", "addressTemplate", "addAddressTemplate", "linkAdrTemplate", "newAdrTemplate"]
        });
        thisApp.startUp(function (app) { });
    });
});
//# sourceMappingURL=SPAConfig.js.map