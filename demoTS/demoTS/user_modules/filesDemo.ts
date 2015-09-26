/// <reference path="..\..\jriappTS\jriapp.d.ts"/>
/// <reference path="common.ts"/>
/// <reference path="folderBrowserSvc.ts"/>
namespace RIAPP.FILESDEMO {
    'use strict';
    var global = RIAPP.global, utils = global.utils;
    declare var DTNodeStatus_Ok;

    export interface IMainOptions extends IAppOptions {
        service_url: string;
        permissionInfo?: MOD.db.IPermissionsInfo;
        images_path: string;
    }

    export interface IOptions {
        service_url: string;
        permissionInfo?: MOD.db.IPermissionsInfo;
        includeFiles: boolean;
    }

    export interface IFolderBrowserOptions {
        service_url: string;
        permissionInfo?: MOD.db.IPermissionsInfo;
        includeFiles: boolean;
        $tree: JQuery;
    }

    export class FolderBrowser extends BaseObject {
        _includeFiles: boolean;
        _$tree: JQuery;
        _$treeRoot: any;
        _dbContext: FOLDERBROWSER_SVC.DbContext;
        _assoc: MOD.db.Association;
        _foldersDb: FOLDERBROWSER_SVC.FileSystemObjectDb;
        _loadRootCommand: MOD.mvvm.ICommand;
        private _infotype: string;

        constructor(options: IFolderBrowserOptions) {
            super();
            var self = this;
            self._includeFiles = options.includeFiles;
            self._$tree = options.$tree;
            self._dbContext = new FOLDERBROWSER_SVC.DbContext();
            self._dbContext.initialize({
                serviceUrl: options.service_url,
                permissions: options.permissionInfo
            });
            this._assoc = self._dbContext.associations.getChildToParent();
            this._infotype = null;
            self._foldersDb = self._dbContext.dbSets.FileSystemObject;

            self._foldersDb.definefullPathField(function (item) {
                return self.getFullPath(item);
            });

            self._loadRootCommand = new MOD.mvvm.Command(function (s, a) {
                self.loadRootFolder();
            }, self,
                function (s, a) {
                    return true;
                });

            this._createDynaTree();
        }
        _getEventNames() {
            var base_events = super._getEventNames();
            return ['node_selected'].concat(base_events);
        }
        addOnNodeSelected(fn: (sender: FolderBrowser, args: { item: FOLDERBROWSER_SVC.FileSystemObject; }) => void, namespace?: string) {
            this.addHandler('node_selected', fn, namespace);
        }
        private _createDynaTree() {
            var self = this;
            (<any>this._$tree).dynatree({
                onActivate: function (node) {
                    self.raiseEvent('node_selected', { item: node.data.item });
                },
                onClick: function (node, event) {
                },
                onDblClick: function (node, event) {
                },
                onExpand: function (flag, node) {
                    if (!flag) {
                        node.visit(function (child) {
                            var item = <FOLDERBROWSER_SVC.FileSystemObject>child.data.item;
                            if (!item)
                                return;
                            item._aspect.deleteItem();
                        }, false);

                        //remove all child nodes when node collapsed
                        node.removeChildren();
                        self._dbContext.acceptChanges();
                    }
                },
                onLazyRead: function (node) {
                    self.loadChildren(node.data.item).done(function () {
                        self._addItemsToNode(node, node.data.item.Children);
                        node.setLazyNodeStatus(DTNodeStatus_Ok);
                    });
                }
            });
            this._$treeRoot = (<any>this._$tree).dynatree("getRoot");
        }
        loadRootFolder() {
            var self = this, query = self._foldersDb.createReadRootQuery({ includeFiles: self._includeFiles, infoType: self.infotype });
            query.isClearPrevData = true;
            var promise = query.load();
            promise.done(function (res) {
                self._onLoaded(res.fetchedItems);
            });
            return promise;
        }
        loadChildren(item: FOLDERBROWSER_SVC.FileSystemObject) {
            var self = this, query = self._foldersDb.createReadChildrenQuery({ parentKey: item.Key, level: item.Level + 1, path: item.fullPath, includeFiles: self._includeFiles, infoType: self.infotype });
            query.isClearPrevData = false;
            var promise = query.load();
            promise.done(function (res) {
                self._onLoaded(res.fetchedItems);
            });
            return promise;
        }
        private _onLoaded(fetchedItems: FOLDERBROWSER_SVC.FileSystemObject[]) {
            var self = this;
            try {
                var topLevel = fetchedItems.filter(function (item) {
                    return item.Level == 0;
                });
                if (topLevel.length > 0) {
                    self._addItemsToTree(topLevel);
                }
            }
            catch (ex) {
                self.handleError(ex, self);
                RIAPP.throwDummy(ex);
            }
        }
        private _addItemsToNode(node: any, items: FOLDERBROWSER_SVC.FileSystemObject[]) {
            var arr = items.map(function (item) {
                return { title: item.Name, isLazy: item.HasSubDirs, isFolder: item.IsFolder, item: item };
            });
            node.removeChildren();
            node.addChild(arr);
        }
        private _addItemsToTree(items: FOLDERBROWSER_SVC.FileSystemObject[]) {
            this._addItemsToNode(this._$treeRoot, items);
        }
        private _getFullPath(item: FOLDERBROWSER_SVC.FileSystemObject, path: string): string {
            var self = this, part: string;
            if (utils.check.isNt(path))
                path = '';
            if (!path)
                part = '';
            else
                part = '\\' + path;
            var parent = <FOLDERBROWSER_SVC.FileSystemObject>this._assoc.getParentItem(item);
            if (!parent) {
                return item.Name + part;
            }
            else {
                return self._getFullPath(parent, item.Name + part);
            }
        }
        getFullPath(item: FOLDERBROWSER_SVC.FileSystemObject) {
            return this._getFullPath(item, null);
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            var self = this;
            if (!!this._dbContext) {
                this._dbContext.destroy();
            }
            if (!!this._$treeRoot)
                this._$treeRoot.removeChildren();
            super.destroy();
        }
        get dbContext() { return this._dbContext; }
        get loadRootCommand() { return this._loadRootCommand; }
        get infotype() { return this._infotype; }
        set infotype(v) { if (this._infotype !== v) { this._infotype = v; this.raisePropertyChanged('infotype'); } }
    }

    function fn_getTemplateElement(template: MOD.template.Template, name: string) {
        var t = template;
        var els = t.findElByDataName(name);
        if (els.length < 1)
            return null;
        return els[0];
    };

    export class FolderBrowserVM extends MOD.mvvm.BaseViewModel {
        _selectedItem: FOLDERBROWSER_SVC.FileSystemObject;
        _dialogVM: MOD.datadialog.DialogVM;
        _folderBrowser: FolderBrowser;
        _options: IOptions;
        _dialogCommand: MOD.mvvm.ICommand;
        _infotype: string;

        constructor(app: Application, options: IOptions) {
            super(app);
            var self = this;
            this._selectedItem = null;
            //we defined this custom type in common.js
            this._dialogVM = new MOD.datadialog.DialogVM(app);
            this._folderBrowser = null;
            this._options = options;
            this._infotype = null;
            var title = self._options.includeFiles ? 'Выбор файла' : 'Выбор папки';
            var dialogOptions: MOD.datadialog.IDialogConstructorOptions = {
                templateID: 'treeTemplate',
                width: 650,
                height: 700,
                title: title,
                fn_OnTemplateCreated: function (template) {
                    //executed in the context of the dialog
                    var dialog = this, $ = global.$;
                    var $tree = global.$(fn_getTemplateElement(template, 'tree'));
                    var options: IFolderBrowserOptions = utils.mergeObj(self._options, { $tree: $tree });
                    self._folderBrowser = new FolderBrowser(options);
                    self._folderBrowser.addOnNodeSelected(function (s, a) {
                        self.selectedItem = a.item;
                    }, self.uniqueID)
                },
                fn_OnShow: function (dialog) {
                    self.selectedItem = null;
                    self._folderBrowser.infotype = self.infotype;
                    self._folderBrowser.loadRootFolder();
                },
                fn_OnClose: function (dialog) {
                    if (dialog.result == 'ok' && !!self._selectedItem) {
                        self._onSelected(self._selectedItem, self._selectedItem.fullPath);
                    }
                }
            };

            this._dialogVM.createDialog('folderBrowser', dialogOptions);

            this._dialogCommand = new MOD.mvvm.Command(function (sender, param) {
                try {
                    self.showDialog();
                } catch (ex) {
                    self.handleError(ex, this);
                }
            }, self, function (sender, param) {
                return true;
            });
        }
        _getEventNames() {
            var base_events = super._getEventNames();
            return ['item_selected'].concat(base_events);
        }
        addOnItemSelected(fn: (sender: FolderBrowserVM, args: { fullPath: string }) => void, namespace?: string) {
            this.addHandler('item_selected', fn, namespace);
        }
        _onSelected(item, fullPath: string) {
            this.raiseEvent('item_selected', { fullPath: fullPath });
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            var self = this;
            if (!!self._folderBrowser) {
                self._folderBrowser.destroy();
                self._folderBrowser = null;
            }
            if (!!self._dialogVM) {
                self._dialogVM.destroy();
                self._dialogVM = null;
            }
            super.destroy();
        }
        showDialog() {
            this._dialogVM.showDialog('folderBrowser', this);
        }
        get folderBrowser() { return this._folderBrowser; }
        get selectedItem() { return this._selectedItem; }
        set selectedItem(v) {
            if (v !== this._selectedItem) {
                this._selectedItem = v;
                this.raisePropertyChanged('selectedItem');
            }
        }
        get dialogCommand() { return this._dialogCommand; }
        get includeFiles() { return this._options.includeFiles; }
        get infotype() { return this._infotype; }
        set infotype(v) { if (this._infotype !== v) { this._infotype = v; this.raisePropertyChanged('infotype'); } }
    }

    export class DemoApplication extends Application {
        _errorVM: COMMON.ErrorViewModel;
        _fbrowserVM1: FolderBrowserVM;
        _fbrowserVM2: FolderBrowserVM;
        _selectedPath: string;

        constructor(options: IMainOptions) {
            super(options);
            var self = this;
            this._errorVM = null;
            this._fbrowserVM1 = null;
            this._fbrowserVM2 = null;
            this._selectedPath = null;
        }
        onStartUp() {
            var self = this, options: IMainOptions = self.options;
            this._errorVM = new COMMON.ErrorViewModel(this);
            this._fbrowserVM1 = new FolderBrowserVM(this, { service_url: options.service_url, permissionInfo: options.permissionInfo, includeFiles: false });
            this._fbrowserVM2 = new FolderBrowserVM(this, { service_url: options.service_url, permissionInfo: options.permissionInfo, includeFiles: true });
            this._fbrowserVM1.infotype = "BASE_ROOT";
            this._fbrowserVM2.infotype = "BASE_ROOT";
            this._fbrowserVM1.addOnItemSelected((s, a) => {
                self._selectedPath = s.infotype + '\\' + a.fullPath;
                self.raisePropertyChanged('selectedPath');
            });
            this._fbrowserVM2.addOnItemSelected((s, a) => {
                self._selectedPath = s.infotype + '\\' + a.fullPath;
                self.raisePropertyChanged('selectedPath');
            });
            //here we could process application's errors
            this.addOnError(function (sender, data) {
                debugger;
                data.isHandled = true;
                self.errorVM.error = data.error;
                self.errorVM.showDialog();
            });
            super.onStartUp();
        }
        //really, the destroy method is redundant here because application lives till the page lives
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            var self = this;
            try {
                self._errorVM.destroy();
                self._fbrowserVM1.destroy();
                self._fbrowserVM2.destroy();
            } finally {
                super.destroy();
            }
        }
        get options() { return <IMainOptions>this._options; }
        get errorVM() { return this._errorVM; }
        get TEXT() { return localizable.TEXT; }
        get fbrowserVM1() { return this._fbrowserVM1; }
        get fbrowserVM2() { return this._fbrowserVM2; }
        get selectedPath() { return this._selectedPath; }
    }

    //global error handler - the last resort (typically display message to the user)
    RIAPP.global.addOnError(function (sender, args) {
        debugger;
        alert(args.error.message);
    });

    RIAPP.global.addOnLoad(function (sender, a) {
        var global = sender;
        //initialize images folder path
        global.defaults.imagesPath = mainOptions.images_path;
        //create and then start application
        var thisApp = new DemoApplication(mainOptions);
        thisApp.startUp((app) => { });
    });


    function initModule(app: Application) {
        return FILESDEMO;
    };

    //properties must be initialized on HTML page
    export var mainOptions: IMainOptions = {
        service_url: null,
        permissionInfo: null,
        images_path: null,
        user_modules: [{ name: "COMMON", initFn: COMMON.initModule },
            { name: "FILESDEMO", initFn: initModule }]
    };
}