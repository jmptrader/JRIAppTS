var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="..\..\jriappTS\jriapp.d.ts"/>
/// <reference path="common.ts"/>
/// <reference path="autocomplete.ts"/>
/// <reference path="demoDB.ts"/>
//master-details demo 
var RIAPP;
(function (RIAPP) {
    var MDETDEMO;
    (function (MDETDEMO) {
        'use strict';
        var global = RIAPP.global, utils = global.utils;
        var CustomerVM = (function (_super) {
            __extends(CustomerVM, _super);
            function CustomerVM(app) {
                _super.call(this, app);
                var self = this;
                this._dataGrid = null;
                this._dbSet = this.dbSets.Customer;
                this._dbSet.isSubmitOnDelete = true;
                this._propWatcher = new RIAPP.MOD.utils.PropWatcher();
                this._dbSet.addOnItemDeleting(function (sender, args) {
                    if (!confirm('Are you sure that you want to delete customer ?'))
                        args.isCancel = true;
                }, self.uniqueID);
                this._dbSet.addOnFill(function (sender, args) {
                    //when fill is ended
                    if (args.isBegin && args.isPageChanged) {
                        self.raiseEvent('page_changed', {});
                    }
                }, self.uniqueID);
                //example of using custom validation on client (in addition to a built-in validation)
                this._dbSet.addOnValidate(function (sender, args) {
                    var item = args.item;
                    //check complex property value
                    if (args.fieldName == "ComplexProp.ComplexProp.Phone") {
                        if (utils.str.startsWith(args.item.ComplexProp.ComplexProp.Phone, '888')) {
                            args.errors.push('Phone must not start with 888!');
                        }
                    }
                }, self.uniqueID);
                this._dbSet.addOnItemAdded(function (s, args) {
                    args.item.NameStyle = false;
                    args.item.ComplexProp.LastName = "DummyLastName";
                    args.item.ComplexProp.FirstName = "DummyFirstName";
                });
                //adds new customer - uses dialog to enter the data
                this._addNewCommand = new RIAPP.MOD.mvvm.Command(function (sender, param) {
                    //showing of the dialog is handled by the datagrid
                    self._dbSet.addNew();
                }, self, function (sender, param) {
                    //the command is always enabled
                    return true;
                });
                //saves changes (submitts them to the service)
                this._saveCommand = new RIAPP.MOD.mvvm.Command(function (sender, param) {
                    self.dbContext.submitChanges();
                }, self, function (s, p) {
                    //the command is enabled when there are pending changes
                    return self.dbContext.isHasChanges;
                });
                this._undoCommand = new RIAPP.MOD.mvvm.Command(function (sender, param) {
                    self.dbContext.rejectChanges();
                }, self, function (s, p) {
                    //the command is enabled when there are pending changes
                    return self.dbContext.isHasChanges;
                });
                //load data from the server
                this._loadCommand = new RIAPP.MOD.mvvm.Command(function (sender, args) {
                    self.load();
                }, self, null);
                //the property watcher helps us handling properties changes
                //more convenient than using addOnPropertyChange
                this._propWatcher.addPropWatch(self.dbContext, 'isHasChanges', function (prop) {
                    self._saveCommand.raiseCanExecuteChanged();
                    self._undoCommand.raiseCanExecuteChanged();
                });
                this._propWatcher.addPropWatch(this._dbSet, 'currentItem', function (prop) {
                    self._onCurrentChanged();
                });
                this._dbSet.addOnCleared(function (s, a) {
                    self.dbSets.CustomerAddress.clear();
                    self.dbSets.Address.clear();
                }, self.uniqueID);
                var custAssoc = self.dbContext.associations.getCustAddrToCustomer();
                //the view to filter CustomerAddresses related to the current customer only
                this._custAdressView = new RIAPP.MOD.db.ChildDataView({
                    association: custAssoc,
                    fn_sort: function (a, b) { return a.AddressID - b.AddressID; }
                });
                this._ordersVM = new OrderVM(this);
            }
            CustomerVM.prototype._addGrid = function (grid) {
                var self = this;
                if (!!this._dataGrid)
                    this._removeGrid();
                this._dataGrid = grid;
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
            CustomerVM.prototype._removeGrid = function () {
                if (!this._dataGrid)
                    return;
                this._dataGrid.removeNSHandlers(this.uniqueID);
                this._dataGrid = null;
            };
            CustomerVM.prototype.onRowExpanded = function (row) {
                this.raiseEvent('row_expanded', { customer: row.item, isExpanded: true });
            };
            CustomerVM.prototype.onRowCollapsed = function (row) {
                this.raiseEvent('row_expanded', { customer: row.item, isExpanded: false });
            };
            CustomerVM.prototype.onCellDblClicked = function (cell) {
                alert("You double clicked " + cell.uniqueID);
            };
            CustomerVM.prototype._getEventNames = function () {
                var base_events = _super.prototype._getEventNames.call(this);
                return ['row_expanded', 'page_changed'].concat(base_events);
            };
            CustomerVM.prototype._onCurrentChanged = function () {
                this._custAdressView.parentItem = this._dbSet.currentItem;
                this.raisePropertyChanged('currentItem');
            };
            //returns promise
            CustomerVM.prototype.load = function () {
                var query = this._dbSet.createReadCustomerQuery({ includeNav: true });
                query.pageSize = 50;
                query.orderBy('LastName').thenBy('MiddleName').thenBy('FirstName');
                return query.load();
            };
            CustomerVM.prototype.destroy = function () {
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
                this._ordersVM.destroy();
                this._ordersVM = null;
                _super.prototype.destroy.call(this);
            };
            Object.defineProperty(CustomerVM.prototype, "app", {
                get: function () { return this._app; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CustomerVM.prototype, "dbContext", {
                get: function () { return this.app.dbContext; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CustomerVM.prototype, "dbSets", {
                get: function () { return this.dbContext.dbSets; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CustomerVM.prototype, "dbSet", {
                get: function () { return this._dbSet; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CustomerVM.prototype, "currentItem", {
                get: function () { return this._dbSet.currentItem; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CustomerVM.prototype, "addNewCommand", {
                get: function () { return this._addNewCommand; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CustomerVM.prototype, "saveCommand", {
                get: function () { return this._saveCommand; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CustomerVM.prototype, "undoCommand", {
                get: function () { return this._undoCommand; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CustomerVM.prototype, "loadCommand", {
                get: function () { return this._loadCommand; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CustomerVM.prototype, "ordersVM", {
                get: function () { return this._ordersVM; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CustomerVM.prototype, "custAdressView", {
                get: function () { return this._custAdressView; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CustomerVM.prototype, "grid", {
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
            return CustomerVM;
        })(RIAPP.MOD.mvvm.BaseViewModel);
        MDETDEMO.CustomerVM = CustomerVM;
        var OrderVM = (function (_super) {
            __extends(OrderVM, _super);
            function OrderVM(customerVM) {
                _super.call(this, customerVM.app);
                var self = this;
                this._customerVM = customerVM;
                this._dbSet = this.dbSets.SalesOrderHeader;
                this._currentCustomer = null;
                this._dataGrid = null;
                this._selectedTabIndex = null;
                this._tabs = null;
                this._orderStatuses = new RIAPP.DEMODB.KeyValDictionary();
                this._orderStatuses.fillItems([{ key: 0, val: 'New Order' }, { key: 1, val: 'Status 1' },
                    { key: 2, val: 'Status 2' }, { key: 3, val: 'Status 3' },
                    { key: 4, val: 'Status 4' }, { key: 5, val: 'Completed Order' }], true);
                //loads the data only when customer's row is expanded
                this._customerVM.addHandler('row_expanded', function (sender, args) {
                    if (args.isExpanded) {
                        self.currentCustomer = args.customer;
                    }
                    else {
                        self.currentCustomer = null;
                    }
                }, self.uniqueID);
                this._dbSet.addOnPropertyChange('currentItem', function (sender, args) {
                    self._onCurrentChanged();
                }, self.uniqueID);
                this._dbSet.addOnItemDeleting(function (sender, args) {
                    if (!confirm('Are you sure that you want to delete order ?'))
                        args.isCancel = true;
                }, self.uniqueID);
                this._dbSet.addOnItemAdded(function (sender, args) {
                    //can be solved soon with generics
                    var item = args.item;
                    item.Customer = self.currentCustomer;
                    //datejs extension
                    item.OrderDate = moment().toDate();
                    item.DueDate = moment().add('days', 7).toDate();
                    item.OnlineOrderFlag = false;
                }, self.uniqueID);
                //adds new order - uses dialog to fill the data
                this._addNewCommand = new RIAPP.MOD.mvvm.Command(function (sender, param) {
                    //the dialog shown by the datagrid
                    self._dbSet.addNew();
                }, self, function (sender, param) {
                    return true;
                });
                this._addressVM = new AddressVM(this);
                this._orderDetailVM = new OrderDetailVM(this);
            }
            OrderVM.prototype._getEventNames = function () {
                var base_events = _super.prototype._getEventNames.call(this);
                return ['row_expanded'].concat(base_events);
            };
            OrderVM.prototype._addGrid = function (grid) {
                var self = this;
                if (!!this._dataGrid)
                    this._removeGrid();
                this._dataGrid = grid;
                this._dataGrid.addOnRowExpanded(function (s, args) {
                    if (args.isExpanded)
                        self.onRowExpanded(args.expandedRow);
                    else
                        self.onRowCollapsed(args.collapsedRow);
                }, this.uniqueID, this);
            };
            OrderVM.prototype._removeGrid = function () {
                if (!this._dataGrid)
                    return;
                this._dataGrid.removeNSHandlers(this.uniqueID);
                this._dataGrid = null;
            };
            OrderVM.prototype.onRowExpanded = function (row) {
                this.raiseEvent('row_expanded', { order: row.item, isExpanded: true });
                if (!!this._tabs)
                    this.onTabSelected(this._tabs);
            };
            OrderVM.prototype.onRowCollapsed = function (row) {
                this.raiseEvent('row_expanded', { order: row.item, isExpanded: false });
            };
            //#begin MOD.tabs.ITabsEvents
            OrderVM.prototype.addTabs = function (tabs) {
                this._tabs = tabs;
            };
            OrderVM.prototype.removeTabs = function () {
                this._tabs = null;
            };
            OrderVM.prototype.onTabSelected = function (tabs) {
                this._selectedTabIndex = tabs.tabIndex;
                this.raisePropertyChanged('selectedTabIndex');
                if (this._selectedTabIndex == 2) {
                    //load details only when the tab which contains the details grid is selected
                    this._orderDetailVM.currentOrder = this.dbSet.currentItem;
                }
            };
            //#end MOD.tabs.ITabsEvents
            OrderVM.prototype._onCurrentChanged = function () {
                this.raisePropertyChanged('currentItem');
            };
            OrderVM.prototype.clear = function () {
                this.dbSet.clear();
            };
            //returns promise
            OrderVM.prototype.load = function () {
                //explicitly clear before every load
                this.clear();
                if (!this.currentCustomer || this.currentCustomer._aspect.isNew) {
                    var deferred = utils.createDeferred();
                    deferred.reject();
                    return deferred.promise();
                }
                var query = this.dbSet.createReadSalesOrderHeaderQuery();
                query.where('CustomerID', 0 /* Equals */, [this.currentCustomer.CustomerID]);
                query.orderBy('OrderDate').thenBy('SalesOrderID');
                return query.load();
            };
            OrderVM.prototype.destroy = function () {
                if (this._isDestroyed)
                    return;
                this._isDestroyCalled = true;
                if (!!this._dbSet) {
                    this._dbSet.removeNSHandlers(this.uniqueID);
                }
                if (!!this._dataGrid) {
                    this._dataGrid.removeNSHandlers(this.uniqueID);
                }
                this.currentCustomer = null;
                this._addressVM.destroy();
                this._addressVM = null;
                this._orderDetailVM.destroy();
                this._orderDetailVM = null;
                this._customerVM = null;
                _super.prototype.destroy.call(this);
            };
            Object.defineProperty(OrderVM.prototype, "app", {
                get: function () { return this._app; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OrderVM.prototype, "dbContext", {
                get: function () { return this.app.dbContext; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OrderVM.prototype, "dbSets", {
                get: function () { return this.dbContext.dbSets; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OrderVM.prototype, "currentItem", {
                get: function () { return this._dbSet.currentItem; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OrderVM.prototype, "dbSet", {
                get: function () { return this._dbSet; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OrderVM.prototype, "addNewCommand", {
                get: function () { return this._addNewCommand; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OrderVM.prototype, "orderStatuses", {
                get: function () { return this._orderStatuses; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OrderVM.prototype, "currentCustomer", {
                get: function () { return this._currentCustomer; },
                set: function (v) {
                    if (v !== this._currentCustomer) {
                        this._currentCustomer = v;
                        this.raisePropertyChanged('currentCustomer');
                        this.load();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OrderVM.prototype, "customerVM", {
                get: function () { return this._customerVM; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OrderVM.prototype, "orderDetailsVM", {
                get: function () { return this._orderDetailVM; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OrderVM.prototype, "selectedTabIndex", {
                get: function () { return this._selectedTabIndex; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OrderVM.prototype, "tabsEvents", {
                get: function () { return this; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OrderVM.prototype, "grid", {
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
            return OrderVM;
        })(RIAPP.MOD.mvvm.BaseViewModel);
        MDETDEMO.OrderVM = OrderVM;
        var OrderDetailVM = (function (_super) {
            __extends(OrderDetailVM, _super);
            function OrderDetailVM(orderVM) {
                _super.call(this, orderVM.app);
                var self = this;
                this._dbSet = this.dbSets.SalesOrderDetail;
                this._orderVM = orderVM;
                this._currentOrder = null;
                this._orderVM.dbSet.addOnCleared(function (s, a) {
                    self.clear();
                }, self.uniqueID);
                this._dbSet.addOnPropertyChange('currentItem', function (sender, args) {
                    self._onCurrentChanged();
                }, self.uniqueID);
                this._productVM = new ProductVM(this);
            }
            OrderDetailVM.prototype._onCurrentChanged = function () {
                this.raisePropertyChanged('currentItem');
            };
            //returns promise
            OrderDetailVM.prototype.load = function () {
                this.clear();
                if (!this.currentOrder || this.currentOrder._aspect.isNew) {
                    var deferred = utils.createDeferred();
                    deferred.reject();
                    return deferred.promise();
                }
                var query = this.dbSet.createReadSalesOrderDetailQuery();
                query.where('SalesOrderID', 0 /* Equals */, [this.currentOrder.SalesOrderID]);
                query.orderBy('SalesOrderDetailID');
                return query.load();
            };
            OrderDetailVM.prototype.clear = function () {
                this.dbSet.clear();
            };
            OrderDetailVM.prototype.destroy = function () {
                if (this._isDestroyed)
                    return;
                this._isDestroyCalled = true;
                if (!!this._dbSet) {
                    this._dbSet.removeNSHandlers(this.uniqueID);
                }
                this.currentOrder = null;
                this._productVM.destroy();
                this._orderVM.dbSet.removeNSHandlers(this.uniqueID);
                this._orderVM.removeNSHandlers(this.uniqueID);
                this._orderVM = null;
                _super.prototype.destroy.call(this);
            };
            Object.defineProperty(OrderDetailVM.prototype, "app", {
                get: function () { return this._app; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OrderDetailVM.prototype, "dbContext", {
                get: function () { return this.app.dbContext; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OrderDetailVM.prototype, "dbSets", {
                get: function () { return this.dbContext.dbSets; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OrderDetailVM.prototype, "currentItem", {
                get: function () { return this._dbSet.currentItem; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OrderDetailVM.prototype, "dbSet", {
                get: function () { return this._dbSet; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OrderDetailVM.prototype, "currentOrder", {
                get: function () { return this._currentOrder; },
                set: function (v) {
                    if (v !== this._currentOrder) {
                        this._currentOrder = v;
                        this.raisePropertyChanged('currentOrder');
                        this.load();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OrderDetailVM.prototype, "orderVM", {
                get: function () { return this._orderVM; },
                enumerable: true,
                configurable: true
            });
            return OrderDetailVM;
        })(RIAPP.MOD.mvvm.BaseViewModel);
        MDETDEMO.OrderDetailVM = OrderDetailVM;
        var AddressVM = (function (_super) {
            __extends(AddressVM, _super);
            function AddressVM(orderVM) {
                _super.call(this, orderVM.app);
                var self = this;
                this._orderVM = orderVM;
                this._dbSet = this.dbSets.Address;
                this._orderVM.dbSet.addOnFill(function (sender, args) {
                    if (!args.isBegin)
                        self.loadAddressesForOrders(args.fetchedItems);
                }, self.uniqueID);
                this._dbSet.addOnPropertyChange('currentItem', function (sender, args) {
                    self._onCurrentChanged();
                }, self.uniqueID);
            }
            AddressVM.prototype._onCurrentChanged = function () {
                this.raisePropertyChanged('currentItem');
            };
            //returns promise
            AddressVM.prototype.loadAddressesForOrders = function (orders) {
                var ids1 = orders.map(function (item) {
                    return item.ShipToAddressID;
                });
                var ids2 = orders.map(function (item) {
                    return item.BillToAddressID;
                });
                var ids = ids1.concat(ids2).filter(function (id) {
                    return id !== null;
                });
                return this.load(RIAPP.ArrayHelper.distinct(ids), false);
            };
            //returns promise
            AddressVM.prototype.load = function (ids, isClearTable) {
                var query = this.dbSet.createReadAddressByIdsQuery({ addressIDs: ids });
                //if true, previous data will be cleared when the new is loaded
                query.isClearPrevData = isClearTable;
                return query.load();
            };
            AddressVM.prototype.clear = function () {
                this.dbSet.clear();
            };
            AddressVM.prototype.destroy = function () {
                if (this._isDestroyed)
                    return;
                this._isDestroyCalled = true;
                if (!!this._dbSet) {
                    this._dbSet.removeNSHandlers(this.uniqueID);
                }
                this._customerDbSet.removeNSHandlers(this.uniqueID);
                this._orderVM.removeNSHandlers(this.uniqueID);
                this._orderVM = null;
                this._customerDbSet = null;
                _super.prototype.destroy.call(this);
            };
            Object.defineProperty(AddressVM.prototype, "_customerDbSet", {
                get: function () { return this._orderVM.customerVM.dbSet; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AddressVM.prototype, "app", {
                get: function () { return this._app; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AddressVM.prototype, "dbContext", {
                get: function () { return this.app.dbContext; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AddressVM.prototype, "dbSets", {
                get: function () { return this.dbContext.dbSets; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AddressVM.prototype, "currentItem", {
                get: function () { return this._dbSet.currentItem; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AddressVM.prototype, "dbSet", {
                get: function () { return this._dbSet; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AddressVM.prototype, "orderVM", {
                get: function () { return this._orderVM; },
                enumerable: true,
                configurable: true
            });
            return AddressVM;
        })(RIAPP.MOD.mvvm.BaseViewModel);
        MDETDEMO.AddressVM = AddressVM;
        var ProductAutoComplete = (function (_super) {
            __extends(ProductAutoComplete, _super);
            function ProductAutoComplete() {
                _super.apply(this, arguments);
            }
            ProductAutoComplete.prototype._init = function (options) {
                _super.prototype._init.call(this, options);
                var self = this;
                this._lastLoadedID = null;
                this._lookupSource = this._getDbContext().getDbSet('Product');
                this._lookupSource.addOnCollChanged(function (sender, args) {
                    self._updateValue();
                }, self._objId);
            };
            //overriden base method
            ProductAutoComplete.prototype._updateSelection = function () {
                if (!!this.dataContext) {
                    var id = this.currentSelection;
                    this.dataContext.ProductID = id;
                }
            };
            ProductAutoComplete.prototype._onHide = function () {
                _super.prototype._onHide.call(this);
                this._updateValue();
            };
            //new method
            ProductAutoComplete.prototype._updateValue = function () {
                if (!this.dataContext) {
                    this.value = '';
                    return;
                }
                var productID = this.dataContext.ProductID;
                //casting will be solved with generics soon
                var product = this._lookupSource.findEntity(productID);
                if (!!product) {
                    this.value = product.Name;
                }
                else {
                    this.value = '';
                    if (this._lastLoadedID !== productID) {
                        //this prevents the cicles of loading of the same item
                        this._lastLoadedID = productID;
                        var query = this._lookupSource.createReadProductByIdsQuery({ productIDs: [productID] });
                        query.isClearPrevData = false;
                        query.load();
                    }
                }
            };
            Object.defineProperty(ProductAutoComplete.prototype, "dataContext", {
                //overriden base property
                get: function () { return this._dataContext; },
                set: function (v) {
                    var self = this;
                    if (this._dataContext !== v) {
                        if (!!this._dataContext) {
                            this._dataContext.removeNSHandlers(this.uniqueID);
                        }
                        this._dataContext = v;
                        if (!!this._dataContext) {
                            this._dataContext.addOnPropertyChange('ProductID', function (sender, a) {
                                self._updateValue();
                            }, this.uniqueID);
                        }
                        self._updateValue();
                        this.raisePropertyChanged('dataContext');
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductAutoComplete.prototype, "currentSelection", {
                //overriden base property
                get: function () {
                    if (!!this.gridDataSource.currentItem)
                        return this.gridDataSource.currentItem['ProductID'];
                    else
                        return null;
                },
                enumerable: true,
                configurable: true
            });
            return ProductAutoComplete;
        })(RIAPP.AUTOCOMPLETE.AutoCompleteElView);
        MDETDEMO.ProductAutoComplete = ProductAutoComplete;
        var ProductVM = (function (_super) {
            __extends(ProductVM, _super);
            function ProductVM(orderDetailVM) {
                _super.call(this, orderDetailVM.app);
                var self = this;
                this._orderDetailVM = orderDetailVM;
                this._dbSet = this.dbSets.Product;
                this._customerDbSet.addOnCleared(function (s, a) {
                    self.clear();
                }, self.uniqueID);
                //here we load products which are referenced in order details
                this._orderDetailVM.dbSet.addOnFill(function (sender, args) {
                    if (!args.isBegin)
                        self.loadProductsForOrderDetails(args.fetchedItems);
                }, self.uniqueID);
                this._dbSet.addOnPropertyChange('currentItem', function (sender, args) {
                    self._onCurrentChanged();
                }, self.uniqueID);
            }
            ProductVM.prototype._onCurrentChanged = function () {
                this.raisePropertyChanged('currentItem');
            };
            ProductVM.prototype.clear = function () {
                this.dbSet.clear();
            };
            //returns promise
            ProductVM.prototype.loadProductsForOrderDetails = function (orderDetails) {
                var ids = orderDetails.map(function (item) {
                    return item.ProductID;
                }).filter(function (id) {
                    return id !== null;
                });
                return this.load(RIAPP.ArrayHelper.distinct(ids), false);
            };
            //returns promise
            ProductVM.prototype.load = function (ids, isClearTable) {
                var query = this.dbSet.createReadProductByIdsQuery({ productIDs: ids });
                query.isClearPrevData = isClearTable;
                return query.load();
            };
            ProductVM.prototype.destroy = function () {
                if (this._isDestroyed)
                    return;
                this._isDestroyCalled = true;
                if (!!this._dbSet) {
                    this._dbSet.removeNSHandlers(this.uniqueID);
                }
                this._customerDbSet.removeNSHandlers(this.uniqueID);
                this._orderDetailVM.removeNSHandlers(this.uniqueID);
                this._orderDetailVM = null;
                this._customerDbSet = null;
                _super.prototype.destroy.call(this);
            };
            Object.defineProperty(ProductVM.prototype, "_customerDbSet", {
                get: function () { return this._orderDetailVM.orderVM.customerVM.dbSet; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductVM.prototype, "app", {
                get: function () { return this._app; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductVM.prototype, "dbContext", {
                get: function () { return this.app.dbContext; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductVM.prototype, "dbSets", {
                get: function () { return this.dbContext.dbSets; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductVM.prototype, "currentItem", {
                get: function () { return this._dbSet.currentItem; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProductVM.prototype, "dbSet", {
                get: function () { return this._dbSet; },
                enumerable: true,
                configurable: true
            });
            return ProductVM;
        })(RIAPP.MOD.mvvm.BaseViewModel);
        MDETDEMO.ProductVM = ProductVM;
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
                this._dbContext = new RIAPP.DEMODB.DbContext();
                this._dbContext.initialize({ serviceUrl: options.service_url, permissions: options.permissionInfo });
                function toText(str) {
                    if (str === null)
                        return '';
                    else
                        return str;
                }
                ;
                this._dbContext.dbSets.Customer.defineComplexProp_NameField(function (item) {
                    //executed in the context of the entity
                    return toText(item.ComplexProp.LastName) + '  ' + toText(item.ComplexProp.MiddleName) + '  ' + toText(item.ComplexProp.FirstName);
                });
                this.registerObject('dbContext', this._dbContext);
                this._errorVM = new RIAPP.COMMON.ErrorViewModel(this);
                this._customerVM = new CustomerVM(this);
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
        MDETDEMO.DemoApplication = DemoApplication;
        //global error handler - the last resort (typically display message to the user)
        RIAPP.global.addOnError(function (sender, args) {
            debugger;
            alert(args.error.message);
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
            global.defaults.imagesPath = MDETDEMO.mainOptions.images_path;
            //create and then start application
            var thisApp = new DemoApplication(MDETDEMO.mainOptions);
            thisApp.startUp(function (app) { });
        });
        //this function is executed when the application is created
        //it can be used to initialize application's specific resources in the namespace
        function initModule(app) {
            app.registerElView('productAutocomplete', ProductAutoComplete);
            return MDETDEMO;
        }
        ;
        //properties must be initialized on HTML page
        MDETDEMO.mainOptions = {
            service_url: null,
            permissionInfo: null,
            images_path: null,
            user_modules: [{ name: "COMMON", initFn: RIAPP.COMMON.initModule },
                { name: "AUTOCOMPLETE", initFn: RIAPP.AUTOCOMPLETE.initModule },
                { name: "MDETDEMO", initFn: initModule }]
        };
    })(MDETDEMO = RIAPP.MDETDEMO || (RIAPP.MDETDEMO = {}));
})(RIAPP || (RIAPP = {}));
//# sourceMappingURL=masterDetDemo.js.map