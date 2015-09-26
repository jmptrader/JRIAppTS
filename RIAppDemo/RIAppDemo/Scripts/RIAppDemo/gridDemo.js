var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="..\..\jriappTS\jriapp.d.ts"/>
/// <reference path="common.ts"/>
/// <reference path="header.ts"/>
/// <reference path="demoDB.ts"/>
var RIAPP;
(function (RIAPP) {
    var GRIDDEMO;
    (function (GRIDDEMO) {
        'use strict';
        var global = RIAPP.global, utils = global.utils;
        var collMod = RIAPP.MOD.collection;
        function addTextQuery(query, fldName, val) {
            var tmp;
            if (!!val) {
                if (utils.str.startsWith(val, '%') && utils.str.endsWith(val, '%')) {
                    tmp = utils.str.trim(val, '% ');
                    query.where(fldName, 4 /* Contains */, [tmp]);
                }
                else if (utils.str.startsWith(val, '%')) {
                    tmp = utils.str.trim(val, '% ');
                    query.where(fldName, 3 /* EndsWith */, [tmp]);
                }
                else if (utils.str.endsWith(val, '%')) {
                    tmp = utils.str.trim(val, '% ');
                    query.where(fldName, 2 /* StartsWith */, [tmp]);
                }
                else {
                    tmp = utils.str.trim(val);
                    query.where(fldName, 0 /* Equals */, [tmp]);
                }
            }
            return query;
        }
        ;
        var ProductsFilter = (function (_super) {
            __extends(ProductsFilter, _super);
            function ProductsFilter(app) {
                _super.call(this);
                var self = this;
                this._app = app;
                this._prodNumber = null;
                this._name = null;
                this._parentCategoryID = null;
                this._childCategoryID = null;
                this._selectedCategory = null;
                this._selectedModel = null;
                this._modelID = null;
                this._saleStart1 = null;
                this._saleStart2 = null;
                //filters top level product categories
                this._parentCategories = new RIAPP.MOD.db.DataView({
                    dataSource: this.ProductCategories,
                    fn_sort: function (a, b) { return a.ProductCategoryID - b.ProductCategoryID; },
                    fn_filter: function (item) { return item.ParentProductCategoryID == null; }
                });
                //filters product categories which have parent category
                this._childCategories = new RIAPP.MOD.db.DataView({
                    dataSource: this.ProductCategories,
                    fn_sort: function (a, b) { return a.ProductCategoryID - b.ProductCategoryID; },
                    fn_filter: function (item) { return item.ParentProductCategoryID !== null && item.ParentProductCategoryID == self.parentCategoryID; }
                });
                this._resetCommand = new RIAPP.MOD.mvvm.Command(function (sender, data) {
                    self.reset();
                }, self, null);
            }
            ProductsFilter.prototype._loadCategories = function () {
                var query = this.ProductCategories.createReadProductCategoryQuery();
                query.orderBy('Name');
                //returns a promise
                return query.load();
            };
            //returns a promise
            ProductsFilter.prototype._loadProductModels = function () {
                var query = this.ProductModels.createReadProductModelQuery();
                query.orderBy('Name');
                //returns promise
                return query.load();
            };
            //returns a promise
            ProductsFilter.prototype.load = function () {
                //load two dbsets simultaneously
                var promise1 = this._loadCategories(), promise2 = this._loadProductModels();
                return global.$.when(promise1, promise2);
            };
            ProductsFilter.prototype.reset = function () {
                this.parentCategoryID = null;
                this.childCategoryID = null;
                this.prodNumber = null;
                this.name = null;
                this.modelID = null;
                this.selectedModel = null;
                this.selectedCategory = null;
                this.saleStart1 = null;
                this.saleStart2 = null;
            };
            Object.defineProperty(ProductsFilter.prototype, "prodNumber", {
                get: function () { return this._prodNumber; },
                set: function (v) {
                    if (this._prodNumber != v) {
                        this._prodNumber = v;
                        this.raisePropertyChanged('prodNumber');
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductsFilter.prototype, "name", {
                get: function () { return this._name; },
                set: function (v) {
                    if (this._name != v) {
                        this._name = v;
                        this.raisePropertyChanged('name');
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductsFilter.prototype, "parentCategoryID", {
                get: function () { return this._parentCategoryID; },
                set: function (v) {
                    if (this._parentCategoryID != v) {
                        this._parentCategoryID = v;
                        this.raisePropertyChanged('parentCategoryID');
                        this._childCategories.refresh();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductsFilter.prototype, "childCategoryID", {
                get: function () { return this._childCategoryID; },
                set: function (v) {
                    if (this._childCategoryID != v) {
                        this._childCategoryID = v;
                        this.raisePropertyChanged('childCategoryID');
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductsFilter.prototype, "modelID", {
                get: function () { return this._modelID; },
                set: function (v) {
                    if (this._modelID != v) {
                        this._modelID = v;
                        this.raisePropertyChanged('modelID');
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductsFilter.prototype, "saleStart1", {
                get: function () { return this._saleStart1; },
                set: function (v) {
                    if (this._saleStart1 != v) {
                        this._saleStart1 = v;
                        this.raisePropertyChanged('saleStart1');
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductsFilter.prototype, "saleStart2", {
                get: function () { return this._saleStart2; },
                set: function (v) {
                    if (this._saleStart2 != v) {
                        this._saleStart2 = v;
                        this.raisePropertyChanged('saleStart2');
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductsFilter.prototype, "dbSets", {
                get: function () { return this.dbContext.dbSets; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductsFilter.prototype, "ParentCategories", {
                get: function () { return this._parentCategories; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductsFilter.prototype, "ChildCategories", {
                get: function () { return this._childCategories; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductsFilter.prototype, "ProductModels", {
                get: function () { return this.dbSets.ProductModel; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductsFilter.prototype, "ProductCategories", {
                get: function () { return this.dbSets.ProductCategory; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductsFilter.prototype, "resetCommand", {
                get: function () { return this._resetCommand; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductsFilter.prototype, "searchTextToolTip", {
                get: function () { return "Use placeholder <span style='font-size: larger'><b>%</b></span><br/> for searching by part of the value"; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductsFilter.prototype, "selectedCategory", {
                get: function () { return this._selectedCategory; },
                set: function (v) {
                    if (this._selectedCategory != v) {
                        this._selectedCategory = v;
                        this.raisePropertyChanged('selectedCategory');
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductsFilter.prototype, "selectedModel", {
                get: function () { return this._selectedModel; },
                set: function (v) {
                    if (this._selectedModel != v) {
                        this._selectedModel = v;
                        this.raisePropertyChanged('selectedModel');
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductsFilter.prototype, "modelData", {
                set: function (data) { this.ProductModels.fillItems(data); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductsFilter.prototype, "categoryData", {
                set: function (data) { this.ProductCategories.fillItems(data); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductsFilter.prototype, "dbContext", {
                get: function () { return this._app.dbContext; },
                enumerable: true,
                configurable: true
            });
            return ProductsFilter;
        })(RIAPP.BaseObject);
        GRIDDEMO.ProductsFilter = ProductsFilter;
        var RowStateProvider = (function () {
            function RowStateProvider() {
            }
            RowStateProvider.prototype.getCSS = function (item, val) {
                return (!val) ? 'rowInactive' : null;
            };
            return RowStateProvider;
        })();
        var OptionTextProvider = (function () {
            function OptionTextProvider() {
            }
            OptionTextProvider.prototype.getText = function (item, itemIndex, text) {
                if (itemIndex > 0)
                    return itemIndex + ') ' + text;
                else
                    return text;
            };
            return OptionTextProvider;
        })();
        var OptionStateProvider = (function () {
            function OptionStateProvider() {
            }
            OptionStateProvider.prototype.getCSS = function (item, itemIndex, val) {
                //var name: string = val;
                if (itemIndex % 2 == 0)
                    return "gray-bgc";
                else
                    return "white-bgc";
            };
            return OptionStateProvider;
        })();
        var ProductViewModel = (function (_super) {
            __extends(ProductViewModel, _super);
            function ProductViewModel(app) {
                var _this = this;
                _super.call(this, app);
                var self = this;
                this._filter = new ProductsFilter(app);
                this._dbSet = this.dbSets.Product;
                this._dataGrid = null;
                this._propWatcher = new RIAPP.MOD.utils.PropWatcher();
                this._selected = {};
                this._selectedCount = 0;
                this._invokeResult = null;
                this._rowStateProvider = new RowStateProvider();
                this._optionTextProvider = new OptionTextProvider();
                this._optionStateProvider = new OptionStateProvider();
                //this._templateID = 'productEditTemplate';
                var sodAssoc = self.dbContext.associations.getOrdDetailsToProduct();
                //the view to filter DEMODB.SalesOrderDetails related to the current product only
                this._vwSalesOrderDet = new RIAPP.MOD.db.ChildDataView({
                    association: sodAssoc,
                    fn_sort: function (a, b) { return a.SalesOrderDetailID - b.SalesOrderDetailID; }
                });
                //when currentItem property changes, invoke our viewmodel's method
                this._dbSet.addOnPropertyChange('currentItem', function (sender, data) {
                    self._onCurrentChanged();
                }, self.uniqueID);
                //if we need to confirm the deletion, this is how it is done
                this._dbSet.addOnItemDeleting(function (sender, args) {
                    if (!confirm('Are you sure that you want to delete ' + args.item.Name + ' ?'))
                        args.isCancel = true;
                }, self.uniqueID);
                this._dbSet.addOnCleared(function (sender, args) {
                    _this.dbContext.dbSets.SalesOrderDetail.clear();
                }, self.uniqueID);
                //the end edit event- the entity potentially changed its data. we can recheck conditions based on
                //entities data here
                this._dbSet.addOnEndEdit(function (sender, args) {
                    if (!args.isCanceled) {
                        //at the end of the editing, let the command will check: can it be executed?
                        self._testInvokeCommand.raiseCanExecuteChanged();
                    }
                }, self.uniqueID);
                //auto submit changes when an entity is deleted
                this._dbSet.isSubmitOnDelete = true;
                //example of using custom validation on client (in addition to a built-in validation)
                this._dbSet.addOnValidate(function (sender, args) {
                    var item = args.item;
                    if (!args.fieldName) {
                        if (!!item.SellEndDate) {
                            if (item.SellEndDate < item.SellStartDate) {
                                args.errors.push('End Date must be after Start Date');
                            }
                        }
                    }
                    else {
                        if (args.fieldName == "Weight") {
                            if (args.item[args.fieldName] > 20000) {
                                args.errors.push('Weight must be less than 20000');
                            }
                        }
                    }
                }, self.uniqueID);
                //adds new product - uses dialog to enter the data
                this._addNewCommand = new RIAPP.MOD.mvvm.Command(function (sender, param) {
                    //grid will show the edit dialog, because we set grid options isHandleAddNew:true
                    //see the options for the grid on the HTML demo page
                    var item = self._dbSet.addNew();
                    //P.S. - grids editor options also has submitOnOK:true, which means
                    //on clicking OK button all changes are submitted to the service
                }, self, function (sender, param) {
                    return true;
                });
                //loads data from the server for the products
                this._loadCommand = new RIAPP.MOD.mvvm.Command(function (sender, data) {
                    self.load();
                }, self, null);
                //example of using a method invocation on the service
                //invokes test service method with parameters and displays result with alert
                this._testInvokeCommand = new RIAPP.MOD.mvvm.Command(function (sender, param) {
                    self.invokeResult = null;
                    var promise = self.dbContext.serviceMethods.TestInvoke({ param1: [10, 11, 12, 13, 14], param2: param.Name });
                    promise.done(function (res) {
                        self.invokeResult = res;
                        self._dialogVM.showDialog('testDialog', self);
                    });
                    promise.fail(function () {
                        //do something on fail if you need
                        //but the error message display is automatically shown
                    });
                }, self, function (sender, param) {
                    //just for the test: this command can be executed only when this condition is true!
                    return self.currentItem !== null;
                });
                //the property watcher helps us handling properties changes
                //more convenient than using addOnPropertyChange
                this._propWatcher.addWatch(self, ['currentItem'], function (property) {
                    self._testInvokeCommand.raiseCanExecuteChanged();
                });
                this._dialogVM = new RIAPP.MOD.datadialog.DialogVM(app);
                var dialogOptions = {
                    templateID: 'invokeResultTemplate',
                    width: 600,
                    height: 250,
                    canCancel: false,
                    title: 'Result of a service method invocation',
                    fn_OnClose: function (dialog) {
                        self.invokeResult = null;
                    }
                };
                this._dialogVM.createDialog('testDialog', dialogOptions);
            }
            ProductViewModel.prototype._addGrid = function (grid) {
                var self = this;
                if (!!this._dataGrid)
                    this._removeGrid();
                this._dataGrid = grid;
                this._dataGrid.addOnPageChanged(function (s, args) {
                    self.onDataPageChanged();
                }, this.uniqueID, this);
                this._dataGrid.addOnRowSelected(function (s, args) {
                    self.onRowSelected(args.row);
                }, this.uniqueID, this);
                this._dataGrid.addOnRowExpanded(function (s, args) {
                    if (args.isExpanded)
                        self.onRowExpanded(args.expandedRow);
                    else
                        self.onRowCollapsed(args.collapsedRow);
                }, this.uniqueID, this);
                this._dataGrid.addOnCellDblClicked(function (s, args) {
                    self.onCellDblClicked(args.cell);
                }, this.uniqueID, this);
            };
            ProductViewModel.prototype._removeGrid = function () {
                if (!this._dataGrid)
                    return;
                this._dataGrid.removeNSHandlers(this.uniqueID);
                this._dataGrid = null;
            };
            //#begin MOD.tabs.ITabsEvents
            ProductViewModel.prototype.addTabs = function (tabs) {
                console.log('tabs created');
            };
            ProductViewModel.prototype.removeTabs = function () {
                console.log('tabs destroyed');
            };
            ProductViewModel.prototype.onTabSelected = function (tabs) {
                console.log('tab selected: ' + tabs.tabIndex);
            };
            //#end MOD.tabs.ITabsEvents
            ProductViewModel.prototype.onDataPageChanged = function () {
                //restore selected rows on the current data page
                this._updateSelection();
            };
            ProductViewModel.prototype.onRowSelected = function (row) {
                this._productSelected(row.item, row.isSelected);
            };
            ProductViewModel.prototype.onRowExpanded = function (row) {
                this._vwSalesOrderDet.parentItem = this.currentItem;
            };
            ProductViewModel.prototype.onRowCollapsed = function (row) {
            };
            ProductViewModel.prototype.onCellDblClicked = function (cell) {
                alert("You double clicked " + cell.uniqueID);
            };
            ProductViewModel.prototype._onCurrentChanged = function () {
                this.raisePropertyChanged('currentItem');
            };
            ProductViewModel.prototype._updateSelection = function () {
                var self = this, keys = self.selectedIDs, grid = self._dataGrid;
                keys.forEach(function (key) {
                    var item = self.dbSet.getItemByKey(key);
                    if (!!item) {
                        var row = grid.findRowByItem(item);
                        if (!!row)
                            row.isSelected = true;
                    }
                });
            };
            ProductViewModel.prototype._clearSelection = function () {
                //clear all selection
                this._selected = {};
                this.selectedCount = 0;
            };
            //when product is selected (unselected) by the user in the grid (clicking checkboxes)
            //we store the entities keys in the map (it survives going to another page and return back)
            ProductViewModel.prototype._productSelected = function (item, isSelected) {
                if (!item)
                    return;
                if (isSelected) {
                    if (!this._selected[item._key]) {
                        this._selected[item._key] = item;
                        this.selectedCount += 1;
                    }
                }
                else {
                    if (!!this._selected[item._key]) {
                        delete this._selected[item._key];
                        this.selectedCount -= 1;
                    }
                }
            };
            ProductViewModel.prototype.load = function () {
                //clear selected items
                this._clearSelection();
                //you can create several methods on the service which return the same entity type
                //but they must have different names (no overloads)
                //the query'service method can accept additional parameters which you can supply with the query
                var query = this.dbSet.createReadProductQuery({ param1: [10, 11, 12, 13, 14], param2: 'Test' });
                query.pageSize = 50;
                addTextQuery(query, 'ProductNumber', this._filter.prodNumber);
                addTextQuery(query, 'Name', this._filter.name);
                if (!utils.check.isNt(this._filter.childCategoryID)) {
                    query.where('ProductCategoryID', 0 /* Equals */, [this._filter.childCategoryID]);
                }
                if (!utils.check.isNt(this._filter.modelID)) {
                    query.where('ProductModelID', 0 /* Equals */, [this._filter.modelID]);
                }
                if (!utils.check.isNt(this._filter.saleStart1) && !utils.check.isNt(this._filter.saleStart2)) {
                    query.where('SellStartDate', 1 /* Between */, [this._filter.saleStart1, this._filter.saleStart2]);
                }
                else if (!utils.check.isNt(this._filter.saleStart1))
                    query.where('SellStartDate', 7 /* GtEq */, [this._filter.saleStart1]);
                else if (!utils.check.isNt(this._filter.saleStart2))
                    query.where('SellStartDate', 8 /* LtEq */, [this._filter.saleStart2]);
                query.orderBy('Name').thenBy('SellStartDate', 1 /* DESC */);
                return query.load();
            };
            ProductViewModel.prototype.destroy = function () {
                if (this._isDestroyed)
                    return;
                this._isDestroyCalled = true;
                this._propWatcher.destroy();
                this._propWatcher = null;
                if (!!this._dbSet) {
                    this._dbSet.removeNSHandlers(this.uniqueID);
                }
                if (!!this._dataGrid) {
                    this._dataGrid.removeNSHandlers(this.uniqueID);
                }
                _super.prototype.destroy.call(this);
            };
            Object.defineProperty(ProductViewModel.prototype, "app", {
                get: function () { return this._app; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductViewModel.prototype, "dbSet", {
                get: function () { return this._dbSet; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductViewModel.prototype, "testInvokeCommand", {
                //get templateID() { return this._templateID; }
                get: function () { return this._testInvokeCommand; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductViewModel.prototype, "addNewCommand", {
                get: function () { return this._addNewCommand; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductViewModel.prototype, "dbContext", {
                get: function () { return this.app.dbContext; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductViewModel.prototype, "dbSets", {
                get: function () { return this.dbContext.dbSets; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductViewModel.prototype, "currentItem", {
                get: function () { return this._dbSet.currentItem; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductViewModel.prototype, "filter", {
                get: function () { return this._filter; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductViewModel.prototype, "loadCommand", {
                get: function () { return this._loadCommand; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductViewModel.prototype, "selectedCount", {
                get: function () { return this._selectedCount; },
                set: function (v) {
                    var old = this._selectedCount;
                    if (old !== v) {
                        this._selectedCount = v;
                        this.raisePropertyChanged('selectedCount');
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductViewModel.prototype, "selectedIDs", {
                get: function () { return Object.keys(this._selected); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductViewModel.prototype, "invokeResult", {
                get: function () { return this._invokeResult; },
                set: function (v) {
                    var old = this._invokeResult;
                    if (old !== v) {
                        this._invokeResult = v;
                        this.raisePropertyChanged('invokeResult');
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductViewModel.prototype, "vwSalesOrderDet", {
                get: function () { return this._vwSalesOrderDet; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductViewModel.prototype, "rowStateProvider", {
                get: function () { return this._rowStateProvider; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductViewModel.prototype, "optionTextProvider", {
                get: function () { return this._optionTextProvider; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductViewModel.prototype, "optionStateProvider", {
                get: function () { return this._optionStateProvider; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductViewModel.prototype, "tabsEvents", {
                get: function () { return this; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductViewModel.prototype, "grid", {
                get: function () { return this._dataGrid; },
                set: function (v) {
                    if (!!v)
                        this._addGrid(v);
                    else
                        this._removeGrid();
                },
                enumerable: true,
                configurable: true
            });
            return ProductViewModel;
        })(RIAPP.MOD.mvvm.BaseViewModel);
        GRIDDEMO.ProductViewModel = ProductViewModel;
        var BaseUploadVM = (function (_super) {
            __extends(BaseUploadVM, _super);
            function BaseUploadVM(url) {
                _super.call(this);
                var self = this;
                this._uploadUrl = url;
                this._formEl = null;
                this._fileEl = null;
                this._progressBar = null;
                this._percentageCalc = null;
                this._progressDiv = null;
                this._fileInfo = null;
                this._id = null;
                this._fileUploaded = false;
                this._initOk = this._initXhr();
                this._uploadCommand = new RIAPP.MOD.mvvm.Command(function (sender, param) {
                    try {
                        self.uploadFiles(self._fileEl.files);
                    }
                    catch (ex) {
                        self.handleError(ex, this);
                    }
                }, self, function (sender, param) {
                    return self._canUpload();
                });
            }
            BaseUploadVM.prototype._initXhr = function () {
                this.xhr = new XMLHttpRequest();
                if (!this.xhr.upload) {
                    this.xhr = null;
                    this.handleError('Browser dose not support HTML5 files upload interface', this);
                    return false;
                }
                var self = this, xhr = this.xhr, upload = xhr.upload;
                upload.onloadstart = function (e) {
                    self._progressBar.prop("max", 100);
                    self._progressBar.prop("value", 0);
                    self._percentageCalc.html("0%");
                    self._progressDiv.show();
                };
                upload.onprogress = function (e) {
                    var progressBar = $("#progressBar");
                    var percentageDiv = $("#percentageCalc");
                    if (!!e.lengthComputable) {
                        self._progressBar.prop("max", e.total);
                        self._progressBar.prop("value", e.loaded);
                        self._percentageCalc.html(Math.round(e.loaded / e.total * 100) + "%");
                    }
                };
                //File uploaded
                upload.onload = function (e) {
                    self.fileInfo = 'the File is uploaded';
                    self._progressDiv.hide();
                    self._onFileUploaded();
                };
                upload.onerror = function (e) {
                    self.fileInfo = null;
                    self._progressDiv.hide();
                    self.handleError(new Error('File uploading error'), self);
                };
                xhr.onreadystatechange = function (e) {
                    if (xhr.readyState === 4) {
                        if (xhr.status >= 400) {
                            self.handleError(new Error(utils.format("File upload error: {0}", xhr.statusText)), self);
                        }
                    }
                };
                return true;
            };
            BaseUploadVM.prototype._onFileUploaded = function () {
                this._fileUploaded = true;
            };
            BaseUploadVM.prototype.uploadFiles = function (fileList) {
                if (!!fileList) {
                    for (var i = 0, l = fileList.length; i < l; i++) {
                        this.uploadFile(fileList[i]);
                    }
                }
            };
            BaseUploadVM.prototype.uploadFile = function (file) {
                if (!this._initOk)
                    return;
                var xhr = this.xhr;
                xhr.open("post", this._uploadUrl, true);
                // Set appropriate headers
                // We're going to use these in the UploadFile method
                // To determine what is being uploaded.
                xhr.setRequestHeader("Content-Type", "multipart/form-data");
                xhr.setRequestHeader("X-File-Name", file.name);
                xhr.setRequestHeader("X-File-Size", file.size.toString());
                xhr.setRequestHeader("X-File-Type", file.type);
                xhr.setRequestHeader("X-Data-ID", this._getDataID());
                // Send the file
                xhr.send(file);
            };
            BaseUploadVM.prototype._onIDChanged = function () {
                this._uploadCommand.raiseCanExecuteChanged();
            };
            BaseUploadVM.prototype._canUpload = function () {
                return this._initOk && !!this._fileInfo && !utils.check.isNt(this.id);
            };
            BaseUploadVM.prototype._getDataID = function () {
                return this.id;
            };
            Object.defineProperty(BaseUploadVM.prototype, "fileInfo", {
                get: function () { return this._fileInfo; },
                set: function (v) {
                    if (this._fileInfo !== v) {
                        this._fileInfo = v;
                        this.raisePropertyChanged('fileInfo');
                        this._uploadCommand.raiseCanExecuteChanged();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BaseUploadVM.prototype, "uploadCommand", {
                get: function () { return this._uploadCommand; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BaseUploadVM.prototype, "id", {
                get: function () { return this._id; },
                set: function (v) {
                    var old = this._id;
                    if (old !== v) {
                        this._id = v;
                        this.raisePropertyChanged('id');
                        this._onIDChanged();
                    }
                },
                enumerable: true,
                configurable: true
            });
            return BaseUploadVM;
        })(RIAPP.BaseObject);
        GRIDDEMO.BaseUploadVM = BaseUploadVM;
        //helper function to get html DOM element  inside template's instance
        //by custom data-name attribute value
        var fn_getTemplateElement = function (template, name) {
            var t = template;
            var els = t.findElByDataName(name);
            if (els.length < 1)
                return null;
            return els[0];
        };
        var UploadThumbnailVM = (function (_super) {
            __extends(UploadThumbnailVM, _super);
            function UploadThumbnailVM(app, url) {
                _super.call(this, url);
                var self = this;
                this._product = null;
                //we defined this custom type in common.js
                this._dialogVM = new RIAPP.MOD.datadialog.DialogVM(app);
                var dialogOptions = {
                    templateID: 'uploadTemplate',
                    width: 450,
                    height: 250,
                    title: 'Upload product thumbnail',
                    fn_OnTemplateCreated: function (template) {
                        //function executed in the context of the dialog
                        var dialog = this;
                        self._fileEl = fn_getTemplateElement(template, 'files-to-upload');
                        self._formEl = fn_getTemplateElement(template, 'uploadForm');
                        self._progressBar = global.$(fn_getTemplateElement(template, 'progressBar'));
                        self._percentageCalc = global.$(fn_getTemplateElement(template, 'percentageCalc'));
                        self._progressDiv = global.$(fn_getTemplateElement(template, 'progressDiv'));
                        self._progressDiv.hide();
                        global.$(self._fileEl).on('change', function (e) {
                            var fileEl = this;
                            e.stopPropagation();
                            var fileList = fileEl.files, txt = '';
                            self.fileInfo = null;
                            for (var i = 0, l = fileList.length; i < l; i++) {
                                txt += utils.format('<p>{0} ({1} KB)</p>', fileList[i].name, utils.str.formatNumber(fileList[i].size / 1024, 2, '.', ','));
                            }
                            self.fileInfo = txt;
                        });
                        var templEl = template.el, $fileEl = global.$(self._fileEl);
                        $fileEl.change(function (e) {
                            global.$('input[data-name="files-input"]', templEl).val(global.$(this).val());
                        });
                        global.$('*[data-name="btn-input"]', templEl).click(function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            $fileEl.click();
                        });
                    },
                    fn_OnShow: function (dialog) {
                        self._formEl.reset();
                        self.fileInfo = null;
                        self._fileUploaded = false;
                    },
                    fn_OnClose: function (dialog) {
                        if (dialog.result == 'ok' && self._onDialogClose()) {
                            //raise our custom event
                            self.raiseEvent('files_uploaded', { id: self.id, product: self._product });
                        }
                    }
                };
                //dialogs are distinguished by their given names
                this._dialogVM.createDialog('uploadDialog', dialogOptions);
                //shows dialog when executed
                this._dialogCommand = new RIAPP.MOD.mvvm.Command(function (sender, param) {
                    try {
                        //using command parameter to provide the product item
                        self._product = param;
                        self.id = self._product.ProductID.toString();
                        self._dialogVM.showDialog('uploadDialog', self);
                    }
                    catch (ex) {
                        self.handleError(ex, this);
                    }
                }, self, function (sender, param) {
                    return true;
                });
                //executed when template is loaded or unloading
                this._templateCommand = new RIAPP.MOD.template.TemplateCommand(function (sender, param) {
                    try {
                        var template = param.template, $ = global.$, fileEl = $('input[data-name="files-to-upload"]', template.el);
                        if (fileEl.length == 0)
                            return;
                        if (param.isLoaded) {
                            fileEl.change(function (e) {
                                $('input[data-name="files-input"]', template.el).val($(this).val());
                            });
                            $('*[data-name="btn-input"]', template.el).click(function (e) {
                                e.preventDefault();
                                e.stopPropagation();
                                fileEl.click();
                            });
                        }
                        else {
                            fileEl.off('change');
                            $('*[data-name="btn-input"]', template.el).off('click');
                        }
                    }
                    catch (ex) {
                        self.handleError(ex, this);
                    }
                }, self, function (sender, param) {
                    return true;
                });
            }
            UploadThumbnailVM.prototype._getEventNames = function () {
                var base_events = _super.prototype._getEventNames.call(this);
                return ['files_uploaded'].concat(base_events);
            };
            UploadThumbnailVM.prototype.addOnFilesUploaded = function (fn, namespace) {
                this.addHandler('files_uploaded', fn, namespace);
            };
            UploadThumbnailVM.prototype.removeOnFilesUploaded = function (namespace) {
                this.removeHandler('files_uploaded', namespace);
            };
            UploadThumbnailVM.prototype._onDialogClose = function () {
                return this._fileUploaded;
            };
            Object.defineProperty(UploadThumbnailVM.prototype, "dialogCommand", {
                get: function () { return this._dialogCommand; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UploadThumbnailVM.prototype, "templateCommand", {
                get: function () { return this._templateCommand; },
                enumerable: true,
                configurable: true
            });
            UploadThumbnailVM.prototype.destroy = function () {
                if (this._isDestroyed)
                    return;
                this._isDestroyCalled = true;
                this._dialogVM.destroy();
                this._dialogVM = null;
                _super.prototype.destroy.call(this);
            };
            return UploadThumbnailVM;
        })(BaseUploadVM);
        GRIDDEMO.UploadThumbnailVM = UploadThumbnailVM;
        //strongly typed aplication's class
        var DemoApplication = (function (_super) {
            __extends(DemoApplication, _super);
            function DemoApplication(options) {
                _super.call(this, options);
                var self = this;
                this._dbContext = null;
                this._errorVM = null;
                this._headerVM = null;
                this._productVM = null;
                this._uploadVM = null;
                this._sseVM = null;
            }
            DemoApplication.prototype.onStartUp = function () {
                var self = this, options = self.options;
                this._dbContext = new RIAPP.DEMODB.DbContext();
                this._dbContext.initialize({ serviceUrl: options.service_url, permissions: options.permissionInfo });
                function toText(str) {
                    if (str === null)
                        return '';
                    else
                        return str;
                }
                ;
                this._dbContext.dbSets.Product.defineIsActiveField(function (item) {
                    return !item.SellEndDate;
                });
                this._errorVM = new RIAPP.COMMON.ErrorViewModel(this);
                this._headerVM = new RIAPP.HEADER.HeaderVM(this);
                this._productVM = new ProductViewModel(this);
                this._uploadVM = new UploadThumbnailVM(this, options.upload_thumb_url);
                function handleError(sender, data) {
                    self._handleError(sender, data);
                }
                ;
                //here we could process application's errors
                this.addOnError(handleError);
                this._dbContext.addOnError(handleError);
                if (!!options.sse_url && RIAPP.SSEVENTS.SSEventsVM.isSupported()) {
                    this._sseVM = new RIAPP.SSEVENTS.SSEventsVM(options.sse_url, options.sse_clientID);
                    this._sseVM.addOnMessage(function (s, a) { self._sseMessage = a.data.message; self.raisePropertyChanged('sseMessage'); });
                    this._sseVM.open().fail(function (err) { self._handleError(self._sseVM, { error: err.message }); });
                }
                //adding event handler for our custom event
                this._uploadVM.addOnFilesUploaded(function (s, a) {
                    //need to update ThumbnailPhotoFileName
                    a.product._aspect.refresh();
                });
                if (!!options.modelData && !!options.categoryData) {
                    //the data was embedded into HTML page as json, just use it
                    this.productVM.filter.modelData = options.modelData;
                    this.productVM.filter.categoryData = options.categoryData;
                    this.productVM.load().done(function (loadRes) {
                        //alert(loadRes.outOfBandData.test);
                        return;
                    });
                }
                else {
                    //there was no embedded data for the filter on the HTML page, so load it first, and then load products
                    this.productVM.filter.load().done(function () {
                        self.productVM.load().done(function (loadRes) { return; });
                    });
                }
                _super.prototype.onStartUp.call(this);
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
                    self._headerVM.destroy();
                    self._productVM.destroy();
                    self._uploadVM.destroy();
                    self._dbContext.destroy();
                    if (!!self._sseVM)
                        self._sseVM.destroy();
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
            Object.defineProperty(DemoApplication.prototype, "headerVM", {
                get: function () { return this._headerVM; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DemoApplication.prototype, "productVM", {
                get: function () { return this._productVM; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DemoApplication.prototype, "uploadVM", {
                get: function () { return this._uploadVM; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DemoApplication.prototype, "sseVM", {
                //server side events
                get: function () { return this._sseVM; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DemoApplication.prototype, "sseMessage", {
                get: function () { return this._sseMessage; },
                enumerable: true,
                configurable: true
            });
            return DemoApplication;
        })(RIAPP.Application);
        GRIDDEMO.DemoApplication = DemoApplication;
        //global error handler - the last resort (typically display message to the user)
        RIAPP.global.addOnError(function (sender, args) {
            debugger;
            alert(args.error.message);
            args.isHandled = true;
        });
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
        //create and start application here
        RIAPP.global.addOnLoad(function (sender, a) {
            var global = sender;
            //initialize images folder path
            global.defaults.imagesPath = GRIDDEMO.mainOptions.images_path;
            //create and then start application
            var thisApp = new DemoApplication(GRIDDEMO.mainOptions);
            //example of how to preload a group of templates from the server - see spaDEMO.ts for a better way
            thisApp.loadTemplates(GRIDDEMO.mainOptions.templates_url);
            //***here are two examples how we can register template's loader functions for individual templates***
            //this registered function will be invoked every  time when the template with that name is needed
            //P.S. - but the best way how to load templates is to register templates' groups
            //see the Single Page Application Demo (spaDEMO.ts) how it is done there
            thisApp.registerTemplateLoader('productEditTemplate', function () {
                return thisApp.global.$.get(GRIDDEMO.mainOptions.productEditTemplate_url);
            });
            //using memoize pattern so there will not be repeated loads of the same template
            thisApp.registerTemplateLoader('sizeDisplayTemplate', (function () {
                var savePromise;
                return function () {
                    if (!!savePromise)
                        return savePromise;
                    savePromise = thisApp.global.$.get(GRIDDEMO.mainOptions.sizeDisplayTemplate_url);
                    return savePromise;
                };
            }()));
            thisApp.startUp(function (app) {
                /*
                //example of how to do ajax calls to load lookups - first load lookups, then load products
                //at the end it displays in an alert out of band data returned from the server (see ReadProduct data service method)
                
                 thisApp.productVM.filter.load().pipe(function()
                 {
                    return thisApp.productVM.load();}
                 ).pipe(function(data: MOD.db.ILoadResult){alert( data.outOfBandData.test);},function(){alert('load failed');});
                */
            });
        });
        //this function is executed when the application is created
        //it can be used to initialize application's specific resources in the namespace
        function initModule(app) {
            return GRIDDEMO;
        }
        ;
        //properties must be initialized on HTML page
        GRIDDEMO.mainOptions = {
            service_url: null,
            permissionInfo: null,
            images_path: null,
            upload_thumb_url: null,
            templates_url: null,
            productEditTemplate_url: null,
            sizeDisplayTemplate_url: null,
            modelData: null,
            categoryData: null,
            sse_url: null,
            sse_clientID: null,
            user_modules: [{ name: "COMMON", initFn: RIAPP.COMMON.initModule },
                { name: "HEADER", initFn: RIAPP.HEADER.initModule },
                { name: "GRIDDEMO", initFn: initModule },
                { name: "SSEVENTS", initFn: RIAPP.SSEVENTS.initModule }]
        };
    })(GRIDDEMO = RIAPP.GRIDDEMO || (RIAPP.GRIDDEMO = {}));
})(RIAPP || (RIAPP = {}));
//# sourceMappingURL=gridDemo.js.map