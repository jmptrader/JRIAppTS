var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "domainModel", "common", "autocomplete", "animation"], function (require, exports, DEMODB, COMMON, AUTOCOMPLETE, ANIMATION) {
    'use strict';
    //using static import for CORE jriapp modules (they are inside jriapp.js file)
    var MOD = RIAPP.MOD;
    //local variables for optimization
    var global = RIAPP.global, utils = global.utils;
    var MainViewVM = (function (_super) {
        __extends(MainViewVM, _super);
        function MainViewVM() {
            _super.call(this);
            this._custTemplName = 'SPAcustTemplate';
            this._custDetTemplName = 'SPAcustDetailTemplate';
            this._viewName = this._custTemplName;
            this._animation = new ANIMATION.FadeAnimation(true);
        }
        MainViewVM.prototype.goToAllCust = function () {
            this.viewName = this.custTemplName;
        };
        MainViewVM.prototype.goToCustDet = function () {
            this.viewName = this.custDetTemplName;
        };
        MainViewVM.prototype.reset = function () {
            this.viewName = this._custTemplName;
        };
        Object.defineProperty(MainViewVM.prototype, "animation", {
            get: function () { return this._animation; },
            set: function (v) {
                if (v !== this._animation) {
                    this._animation = v;
                    this.raisePropertyChanged('animation');
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MainViewVM.prototype, "viewName", {
            get: function () { return this._viewName; },
            set: function (v) {
                if (v !== this._viewName) {
                    this._viewName = v;
                    this.raisePropertyChanged('viewName');
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MainViewVM.prototype, "custTemplName", {
            get: function () { return this._custTemplName; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MainViewVM.prototype, "custDetTemplName", {
            get: function () { return this._custDetTemplName; },
            enumerable: true,
            configurable: true
        });
        return MainViewVM;
    })(RIAPP.BaseObject);
    exports.MainViewVM = MainViewVM;
    var CustDetViewVM = (function (_super) {
        __extends(CustDetViewVM, _super);
        function CustDetViewVM() {
            _super.call(this);
            this._infoTemplName = 'customerInfo';
            this._adrTemplName = 'customerAddr';
            this._viewName = this._infoTemplName;
            this._animation = new ANIMATION.SlideAnimation(false);
        }
        CustDetViewVM.prototype.goToCustInfo = function () {
            this.viewName = this.infoTemplName;
        };
        CustDetViewVM.prototype.goToAdrInfo = function () {
            this.viewName = this.adrTemplName;
        };
        CustDetViewVM.prototype.reset = function () {
            this.viewName = this._infoTemplName;
        };
        Object.defineProperty(CustDetViewVM.prototype, "animation", {
            get: function () { return this._animation; },
            set: function (v) {
                if (v !== this._animation) {
                    this._animation = v;
                    this.raisePropertyChanged('animation');
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustDetViewVM.prototype, "viewName", {
            get: function () { return this._viewName; },
            set: function (v) {
                if (v !== this._viewName) {
                    this._viewName = v;
                    this.raisePropertyChanged('viewName');
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustDetViewVM.prototype, "infoTemplName", {
            get: function () { return this._infoTemplName; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustDetViewVM.prototype, "adrTemplName", {
            get: function () { return this._adrTemplName; },
            enumerable: true,
            configurable: true
        });
        return CustDetViewVM;
    })(RIAPP.BaseObject);
    exports.CustDetViewVM = CustDetViewVM;
    var AddrViewVM = (function (_super) {
        __extends(AddrViewVM, _super);
        function AddrViewVM() {
            _super.call(this);
            this._linkAdrTemplate = 'linkAdrTemplate';
            this._newAdrTemplate = 'newAdrTemplate';
            this._viewName = this._linkAdrTemplate;
        }
        AddrViewVM.prototype.goToLinkAdr = function () {
            this.viewName = this.linkAdrTemplate;
        };
        AddrViewVM.prototype.goToNewAdr = function () {
            this.viewName = this.newAdrTemplate;
        };
        Object.defineProperty(AddrViewVM.prototype, "viewName", {
            get: function () { return this._viewName; },
            set: function (v) {
                if (v !== this._viewName) {
                    this._viewName = v;
                    this.raisePropertyChanged('viewName');
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddrViewVM.prototype, "linkAdrTemplate", {
            get: function () { return this._linkAdrTemplate; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddrViewVM.prototype, "newAdrTemplate", {
            get: function () { return this._newAdrTemplate; },
            enumerable: true,
            configurable: true
        });
        return AddrViewVM;
    })(RIAPP.BaseObject);
    exports.AddrViewVM = AddrViewVM;
    //instead of obtaining a reference to the real dataGrid instance
    //we communicate with the dataGrid through this object
    //achieving a loose coupling between UI control and a ViewModel
    var CustomerGridEvents = (function (_super) {
        __extends(CustomerGridEvents, _super);
        function CustomerGridEvents(customerVM) {
            _super.call(this);
            this._customerVM = customerVM;
            this._doFocus = null;
        }
        CustomerGridEvents.prototype.regFocusGridFunc = function (doFocus) {
            this._doFocus = doFocus;
        };
        CustomerGridEvents.prototype.onDataPageChanged = function () {
            this._customerVM._onGridPageChanged();
        };
        CustomerGridEvents.prototype.onRowSelected = function (item) {
            this._customerVM._onGridRowSelected(item);
        };
        CustomerGridEvents.prototype.onRowExpanded = function (item) {
            this._customerVM._onGridRowExpanded(item);
        };
        CustomerGridEvents.prototype.onRowCollapsed = function (item) {
            this._customerVM._onGridRowCollapsed(item);
        };
        CustomerGridEvents.prototype.focusGrid = function () {
            if (!!this._doFocus)
                this._doFocus();
        };
        CustomerGridEvents.prototype.destroy = function () {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            this._doFocus = null;
            _super.prototype.destroy.call(this);
        };
        return CustomerGridEvents;
    })(RIAPP.BaseObject);
    exports.CustomerGridEvents = CustomerGridEvents;
    var CustomerVM = (function (_super) {
        __extends(CustomerVM, _super);
        function CustomerVM(app) {
            _super.call(this, app);
            var self = this;
            this._dbSet = this.dbSets.Customer;
            this._dbSet.isSubmitOnDelete = true;
            this._propWatcher = new MOD.utils.PropWatcher();
            this._uiMainView = new MainViewVM();
            this._uiDetailView = new CustDetViewVM();
            this._uiMainView.addOnPropertyChange('viewName', function (sender, a) {
                self._uiDetailView.reset();
                if (sender.viewName == sender.custTemplName) {
                    setTimeout(function () {
                        if (!!self._gridEvents) {
                            self._gridEvents.focusGrid();
                        }
                    }, 0);
                }
            });
            this._gridEvents = new CustomerGridEvents(this);
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
            this._dbSet.addOnItemAdded(function (s, args) {
                args.item.NameStyle = false;
                args.item.ComplexProp.LastName = "Dummy1";
                args.item.ComplexProp.FirstName = "Dummy2";
            });
            this._editCommand = new MOD.mvvm.Command(function (sender, param) {
                self.currentItem._aspect.beginEdit();
            }, self, function (sender, param) {
                return !!self.currentItem;
            });
            this._endEditCommand = new MOD.mvvm.Command(function (sender, param) {
                if (self.currentItem._aspect.endEdit())
                    self.dbContext.submitChanges();
            }, self, function (sender, param) {
                return !!self.currentItem;
            });
            this._cancelEditCommand = new MOD.mvvm.Command(function (sender, param) {
                self.currentItem._aspect.cancelEdit();
                self.dbContext.rejectChanges();
            }, self, function (sender, param) {
                return !!self.currentItem;
            });
            //adds new customer - uses dialog to enter the data
            this._addNewCommand = new MOD.mvvm.Command(function (sender, param) {
                //showing of the dialog is handled by the datagrid
                self._dbSet.addNew();
            }, self, function (sender, param) {
                //the command is always enabled
                return true;
            });
            //saves changes (submitts them to the service)
            this._saveCommand = new MOD.mvvm.Command(function (sender, param) {
                self.dbContext.submitChanges();
            }, self, function (s, p) {
                //the command is enabled when there are pending changes
                return self.dbContext.isHasChanges;
            });
            this._undoCommand = new MOD.mvvm.Command(function (sender, param) {
                self.dbContext.rejectChanges();
            }, self, function (s, p) {
                //the command is enabled when there are pending changes
                return self.dbContext.isHasChanges;
            });
            //load data from the server
            this._loadCommand = new MOD.mvvm.Command(function (sender, args) {
                self.load();
            }, self, null);
            this._switchViewCommand = new MOD.mvvm.Command(function (sender, param) {
                self.uiMainView.viewName = param;
            }, self, null);
            this._switchDetViewCommand = new MOD.mvvm.Command(function (sender, param) {
                self.uiDetailView.viewName = param;
            }, self, null);
            //the property watcher helps us handling properties changes
            //more convenient than using addOnPropertyChange
            this._propWatcher.addPropWatch(self.dbContext, 'isHasChanges', function (prop) {
                self._saveCommand.raiseCanExecuteChanged();
                self._undoCommand.raiseCanExecuteChanged();
            });
            this._propWatcher.addPropWatch(this._dbSet, 'currentItem', function (prop) {
                self._editCommand.raiseCanExecuteChanged();
                self._endEditCommand.raiseCanExecuteChanged();
                self._cancelEditCommand.raiseCanExecuteChanged();
                self._onCurrentChanged();
            });
            this._dbSet.addOnCleared(function (s, a) {
                self.dbSets.CustomerAddress.clear();
                self.dbSets.Address.clear();
            }, self.uniqueID);
            var custAssoc = self.dbContext.associations.getCustAddrToCustomer();
            //the view to filter CustomerAddresses related to the current customer only
            this._custAdressView = new MOD.db.ChildDataView({
                association: custAssoc,
                fn_sort: function (a, b) { return a.AddressID - b.AddressID; }
            });
            this._ordersVM = new OrderVM(this);
            this._customerAddressVM = new CustomerAddressVM(this);
        }
        CustomerVM.prototype._getEventNames = function () {
            var base_events = _super.prototype._getEventNames.call(this);
            return ['row_expanded', 'page_changed'].concat(base_events);
        };
        CustomerVM.prototype._onCurrentChanged = function () {
            this._custAdressView.parentItem = this._dbSet.currentItem;
            this.raisePropertyChanged('currentItem');
        };
        CustomerVM.prototype._onGridPageChanged = function () {
        };
        CustomerVM.prototype._onGridRowSelected = function (item) {
        };
        CustomerVM.prototype._onGridRowExpanded = function (item) {
            this.raiseEvent('row_expanded', { customer: item, isExpanded: true });
        };
        CustomerVM.prototype._onGridRowCollapsed = function (item) {
            this.raiseEvent('row_expanded', { customer: item, isExpanded: false });
        };
        //returns promise
        CustomerVM.prototype.load = function () {
            var query = this._dbSet.createReadCustomerQuery({ includeNav: true });
            query.pageSize = 50;
            //load without filtering
            query.orderBy('LastName').thenBy('MiddleName').thenBy('FirstName');
            return this.dbContext.load(query);
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
            this._gridEvents.destroy();
            this._gridEvents = null;
            this._ordersVM.destroy();
            this._ordersVM = null;
            this._customerAddressVM.destroy();
            this._customerAddressVM = null;
            this._custAdressView.destroy();
            this._custAdressView = null;
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
        Object.defineProperty(CustomerVM.prototype, "editCommand", {
            get: function () { return this._editCommand; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustomerVM.prototype, "endEditCommand", {
            get: function () { return this._endEditCommand; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustomerVM.prototype, "cancelEditCommand", {
            get: function () { return this._cancelEditCommand; },
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
        Object.defineProperty(CustomerVM.prototype, "customerAddressVM", {
            get: function () { return this._customerAddressVM; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustomerVM.prototype, "switchViewCommand", {
            get: function () { return this._switchViewCommand; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustomerVM.prototype, "switchDetViewCommand", {
            get: function () { return this._switchDetViewCommand; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustomerVM.prototype, "uiMainView", {
            get: function () { return this._uiMainView; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustomerVM.prototype, "uiDetailView", {
            get: function () { return this._uiDetailView; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustomerVM.prototype, "gridEvents", {
            get: function () { return this._gridEvents; },
            enumerable: true,
            configurable: true
        });
        return CustomerVM;
    })(MOD.mvvm.BaseViewModel);
    exports.CustomerVM = CustomerVM;
    //instead of obtaining a reference to the real dataGrid instance
    //we communicate with the dataGrid through this object
    //achieving a loose coupling between UI control and a ViewModel
    var OrderGridEvents = (function (_super) {
        __extends(OrderGridEvents, _super);
        function OrderGridEvents(orderVM) {
            _super.call(this);
            this._orderVM = orderVM;
            this._doFocus = null;
        }
        OrderGridEvents.prototype.regFocusGridFunc = function (doFocus) {
            this._doFocus = doFocus;
        };
        OrderGridEvents.prototype.onDataPageChanged = function () {
            this._orderVM._onGridPageChanged();
        };
        OrderGridEvents.prototype.onRowSelected = function (item) {
            this._orderVM._onGridRowSelected(item);
        };
        OrderGridEvents.prototype.onRowExpanded = function (item) {
            this._orderVM._onGridRowExpanded(item);
        };
        OrderGridEvents.prototype.onRowCollapsed = function (item) {
            this._orderVM._onGridRowCollapsed(item);
        };
        OrderGridEvents.prototype.focusGrid = function () {
            if (!!this._doFocus)
                this._doFocus();
        };
        OrderGridEvents.prototype.destroy = function () {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            this._doFocus = null;
            _super.prototype.destroy.call(this);
        };
        return OrderGridEvents;
    })(RIAPP.BaseObject);
    exports.OrderGridEvents = OrderGridEvents;
    var OrderVM = (function (_super) {
        __extends(OrderVM, _super);
        function OrderVM(customerVM) {
            _super.call(this, customerVM.app);
            var self = this;
            this._customerVM = customerVM;
            this._dbSet = this.dbSets.SalesOrderHeader;
            this._currentCustomer = null;
            this._gridEvents = new OrderGridEvents(this);
            this._selectedTabIndex = null;
            this._orderStatuses = new DEMODB.KeyValDictionary();
            this._orderStatuses.fillItems([{ key: 0, val: 'New Order' }, { key: 1, val: 'Status 1' },
                { key: 2, val: 'Status 2' }, { key: 3, val: 'Status 3' },
                { key: 4, val: 'Status 4' }, { key: 5, val: 'Completed Order' }], true);
            this._tabs = null;
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
                if (!confirm('Are you sure that you want to delete the order?'))
                    args.isCancel = true;
            }, self.uniqueID);
            this._dbSet.addOnItemAdded(function (sender, args) {
                var item = args.item;
                item.Customer = self.currentCustomer;
                item.OrderDate = moment().toDate();
                item.DueDate = moment().add('days', 7).toDate();
                item.OnlineOrderFlag = false;
            }, self.uniqueID);
            //adds new order - uses dialog to fill the data
            this._addNewCommand = new MOD.mvvm.Command(function (sender, param) {
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
        OrderVM.prototype._onGridPageChanged = function () {
        };
        OrderVM.prototype._onGridRowSelected = function (item) {
        };
        OrderVM.prototype._onGridRowExpanded = function (item) {
            this.raiseEvent('row_expanded', { order: item, isExpanded: true });
            if (!!this._tabs)
                this.onTabSelected(this._tabs);
        };
        OrderVM.prototype._onGridRowCollapsed = function (item) {
            this.raiseEvent('row_expanded', { order: item, isExpanded: false });
        };
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
            this.currentCustomer = null;
            this._gridEvents.destroy();
            this._gridEvents = null;
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
        Object.defineProperty(OrderVM.prototype, "gridEvents", {
            get: function () { return this._gridEvents; },
            enumerable: true,
            configurable: true
        });
        return OrderVM;
    })(MOD.mvvm.BaseViewModel);
    exports.OrderVM = OrderVM;
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
            var query = this.dbSet.createQuery('ReadSalesOrderDetail');
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
    })(MOD.mvvm.BaseViewModel);
    exports.OrderDetailVM = OrderDetailVM;
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
        //returns a promise
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
        //returns a promise
        AddressVM.prototype.load = function (ids, isClearTable) {
            var query = this.dbSet.createReadAddressByIdsQuery({ addressIDs: ids });
            //if true, then the previous data will be cleared when the new is loaded
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
    })(MOD.mvvm.BaseViewModel);
    exports.AddressVM = AddressVM;
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
    })(AUTOCOMPLETE.AutoCompleteElView);
    exports.ProductAutoComplete = ProductAutoComplete;
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
    })(MOD.mvvm.BaseViewModel);
    exports.ProductVM = ProductVM;
    var CustomerAddressVM = (function (_super) {
        __extends(CustomerAddressVM, _super);
        function CustomerAddressVM(customerVM) {
            _super.call(this, customerVM.app);
            var self = this;
            this._customerVM = customerVM;
            this._addAddressVM = null;
            this._currentCustomer = self._customerVM.currentItem;
            this._addressesDb = this.dbSets.Address;
            this._custAdressDb = this.dbSets.CustomerAddress;
            this._custAdressDb.addOnItemDeleting(function (sender, args) {
                if (!confirm('Are you sure that you want to unlink Address from this customer?'))
                    args.isCancel = true;
            }, self.uniqueID);
            this._custAdressDb.addOnBeginEdit(function (sender, args) {
                var item = args.item;
                //start editing Address entity, when CustomerAddress begins editing
                //p.s.- Address is navigation property
                var address = item.Address;
                if (!!address)
                    address._aspect.beginEdit();
            }, self.uniqueID);
            this._custAdressDb.addOnEndEdit(function (sender, args) {
                var item = args.item;
                var address = item.Address;
                if (!args.isCanceled) {
                    if (!!address)
                        address._aspect.endEdit();
                }
                else {
                    if (address)
                        address._aspect.cancelEdit();
                }
            }, self.uniqueID);
            this._addressesDb.addOnItemDeleting(function (sender, args) {
                if (!confirm('Are you sure that you want to delete the Customer\'s Address?'))
                    args.isCancel = true;
            }, self.uniqueID);
            //the view to filter addresses related to the current customer
            this._addressesView = new MOD.db.DataView({
                dataSource: this._addressesDb,
                fn_sort: function (a, b) { return a.AddressID - b.AddressID; },
                fn_filter: function (item) {
                    if (!self._currentCustomer)
                        return false;
                    return item.CustomerAddresses.some(function (ca) {
                        return self._currentCustomer === ca.Customer;
                    });
                },
                fn_itemsProvider: function (ds) {
                    if (!self._currentCustomer)
                        return [];
                    var custAdrs = self._currentCustomer.CustomerAddresses;
                    return custAdrs.map(function (m) {
                        return m.Address;
                    }).filter(function (address) {
                        return !!address;
                    });
                }
            });
            /*
            this._addressesView.addOnEndEdit((s, a) => {
                self.dbContext.submitChanges();
            }, self.uniqueID, self, false);
            */
            this._custAdressView.addOnViewRefreshed(function (s, a) {
                self._addressesView.refresh();
            }, self.uniqueID);
            this._customerVM.addOnPropertyChange('currentItem', function (sender, args) {
                self._currentCustomer = self._customerVM.currentItem;
                self.raisePropertyChanged('currentCustomer');
            }, self.uniqueID);
        }
        //async load, returns promise
        CustomerAddressVM.prototype._loadAddresses = function (addressIDs, isClearTable) {
            var query = this._addressesDb.createReadAddressByIdsQuery({ addressIDs: addressIDs });
            //if true, we clear all previous data in the TDbSet
            query.isClearPrevData = isClearTable;
            //returns promise
            return query.load();
        };
        CustomerAddressVM.prototype._addNewAddress = function () {
            //use the TDataView, not TDbSet
            var adr = this.addressesView.addNew();
            return adr;
        };
        CustomerAddressVM.prototype._addNewCustAddress = function (address) {
            var cust = this.currentCustomer;
            //to add item here, use the TDataView, not TDbSet
            var ca = this.custAdressView.addNew();
            ca.CustomerID = cust.CustomerID;
            //this is default, can edit later
            ca.AddressType = "Main Office";
            //create relationship with the address
            //if the address is new, then the primary keys will be aquired when the data is submitted to the server
            ca.Address = address;
            ca._aspect.endEdit();
            return ca;
        };
        CustomerAddressVM.prototype.load = function (customers) {
            var self = this, custArr = customers || [];
            //customerIDs for all loaded customers entities (for current page only, not which in cache if query.loadPageCount>1)
            var custIDs = custArr.map(function (item) {
                return item.CustomerID;
            });
            var query = this._custAdressDb.createReadAddressForCustomersQuery({ custIDs: custIDs });
            query.load();
        };
        CustomerAddressVM.prototype.destroy = function () {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            if (!!this._addressesDb) {
                this._addressesDb.removeNSHandlers(this.uniqueID);
            }
            if (!!this._custAdressDb) {
                this._custAdressDb.removeNSHandlers(this.uniqueID);
            }
            if (!!this._customerVM) {
                this._customerVM.removeNSHandlers(this.uniqueID);
            }
            if (!!this._custAdressView) {
                this._custAdressView.removeNSHandlers(this.uniqueID);
            }
            if (this._addAddressVM) {
                this._addAddressVM.destroy();
                this._addAddressVM = null;
            }
            _super.prototype.destroy.call(this);
        };
        Object.defineProperty(CustomerAddressVM.prototype, "_custAdressView", {
            get: function () { return this._customerVM.custAdressView; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustomerAddressVM.prototype, "app", {
            get: function () { return this._app; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustomerAddressVM.prototype, "dbContext", {
            get: function () { return this.app.dbContext; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustomerAddressVM.prototype, "dbSets", {
            get: function () { return this.dbContext.dbSets; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustomerAddressVM.prototype, "addressesDb", {
            get: function () { return this._addressesDb; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustomerAddressVM.prototype, "custAdressDb", {
            get: function () { return this._custAdressDb; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustomerAddressVM.prototype, "addressesView", {
            get: function () { return this._addressesView; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustomerAddressVM.prototype, "custAdressView", {
            get: function () { return this._custAdressView; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustomerAddressVM.prototype, "addAddressVM", {
            get: function () {
                if (!this._addAddressVM) {
                    this._addAddressVM = new AddAddressVM(this);
                }
                return this._addAddressVM;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustomerAddressVM.prototype, "currentCustomer", {
            get: function () { return this._currentCustomer; },
            enumerable: true,
            configurable: true
        });
        return CustomerAddressVM;
    })(MOD.mvvm.BaseViewModel);
    exports.CustomerAddressVM = CustomerAddressVM;
    var AddAddressVM = (function (_super) {
        __extends(AddAddressVM, _super);
        function AddAddressVM(customerAddressVM) {
            _super.call(this, customerAddressVM.app);
            var self = this;
            this._customerAddressVM = customerAddressVM;
            this._addressInfosDb = this.dbContext.dbSets.AddressInfo;
            this._currentCustomer = self._customerAddressVM.currentCustomer;
            this._searchToolTip = 'enter any address part then press search button';
            this._newAddress = null;
            this._adressInfosGrid = null;
            this._searchString = null;
            //for switching user interface current view
            this._uiViewVM = new AddrViewVM();
            this._dialogVM = new MOD.datadialog.DialogVM(self.app);
            var dialogOptions = {
                templateID: 'addAddressTemplate',
                width: 950,
                height: 600,
                title: 'add new customer address',
                submitOnOK: true,
                fn_OnClose: function (dialog) {
                    if (dialog.result != 'ok') {
                        //if new address is not explicitly accepted then reject added address
                        if (!!self._newAddress) {
                            self._cancelAddNewAddress();
                        }
                        self.dbContext.rejectChanges();
                    }
                    self._addressInfosDb.clear();
                    self.searchString = null;
                },
                fn_OnOK: function (dialog) {
                    if (self.uiViewVM.viewName != self.uiViewVM.newAdrTemplate) {
                        //allow to close the dialog
                        return 0 /* Default */;
                    }
                    if (!self._newAddress._aspect.endEdit())
                        return 1 /* StayOpen */;
                    var custAdress = self._customerAddressVM._addNewCustAddress(self._newAddress);
                    custAdress._aspect.endEdit();
                    self._newAddress = null;
                    self.uiViewVM.goToLinkAdr();
                    self.raisePropertyChanged('newAddress');
                    return 1 /* StayOpen */;
                },
                fn_OnCancel: function (dialog) {
                    if (self.uiViewVM.viewName != self.uiViewVM.newAdrTemplate) {
                        return 0 /* Default */;
                    }
                    if (!!self._newAddress) {
                        self._cancelAddNewAddress();
                    }
                    return 1 /* StayOpen */;
                }
            };
            this._dialogVM.createDialog('addressDialog', dialogOptions);
            //this data displayed in the right panel - contains available (existing in db) addresses
            this._addressInfosView = new MOD.db.DataView({
                dataSource: this._addressInfosDb,
                fn_sort: function (a, b) { return a.AddressID - b.AddressID; },
                fn_filter: function (item) {
                    return !item.CustomerAddresses.some(function (CustAdr) {
                        return self._currentCustomer === CustAdr.Customer;
                    });
                }
            });
            //enable paging in the data view
            this._addressInfosView.isPagingEnabled = true;
            this._addressInfosView.pageSize = 50;
            this._addressInfosView.addOnPropertyChange('currentItem', function (sender, args) {
                self.raisePropertyChanged('currentAddressInfo');
                self._linkCommand.raiseCanExecuteChanged();
            }, self.uniqueID);
            this._customerAddressVM.addOnPropertyChange('currentCustomer', function (sender, args) {
                self._currentCustomer = self._customerAddressVM.currentCustomer;
                self.raisePropertyChanged('customer');
                self._addNewCommand.raiseCanExecuteChanged();
            }, self.uniqueID);
            //this data is displayed on the left panel - addresses currently linked to the customer
            this.custAdressView.addOnPropertyChange('currentItem', function (sender, args) {
                self._unLinkCommand.raiseCanExecuteChanged();
            }, self.uniqueID);
            //add new or existing address
            this._addNewCommand = new MOD.mvvm.Command(function (sender, param) {
                try {
                    self._dialogVM.showDialog('addressDialog', self);
                }
                catch (ex) {
                    self.handleError(ex, this);
                }
            }, self, function (sender, param) {
                //enable this command when customer is not null
                return !!self.customer;
            });
            //load searched address data from the server
            this._execSearchCommand = new MOD.mvvm.Command(function (sender, args) {
                self.loadAddressInfos();
            }, self, null);
            //adds new address to the customer
            this._addNewAddressCommand = new MOD.mvvm.Command(function (sender, args) {
                self._addNewAddress();
            }, self, null);
            //adds existed address to the customer
            this._linkCommand = new MOD.mvvm.Command(function (sender, args) {
                self._linkAddress();
            }, self, function (s, a) {
                return !!self._addressInfosView.currentItem;
            });
            this._unLinkCommand = new MOD.mvvm.Command(function (sender, args) {
                self._unLinkAddress();
            }, self, function (s, a) {
                return !!self.custAdressView.currentItem;
            });
            //this is databound to the grid element view on the page
            //by this command we can get hold of the datagrid control
            //this command executed when an element view property changes
            //we grab grid property from the sender (which is the element view, and has a property - grid)
            this._propChangeCommand = new MOD.baseElView.PropChangedCommand(function (sender, args) {
                if (args.property == '*' || args.property == 'grid') {
                    self._adressInfosGrid = sender.grid;
                }
            }, self, null);
        }
        AddAddressVM.prototype._cancelAddNewAddress = function () {
            var self = this;
            self._newAddress._aspect.cancelEdit();
            self._newAddress._aspect.rejectChanges();
            self._newAddress = null;
            self.uiViewVM.goToLinkAdr();
            self.raisePropertyChanged('newAddress');
        };
        AddAddressVM.prototype._addNewAddress = function () {
            this._newAddress = this._customerAddressVM._addNewAddress();
            this.uiViewVM.goToNewAdr();
            this.raisePropertyChanged('newAddress');
        };
        AddAddressVM.prototype._linkAddress = function () {
            var self = this, adrInfo = this.currentAddressInfo, adrView = self.custAdressView, adrID;
            if (!adrInfo) {
                alert('_linkAddress error: adrInfoEntity is null');
                return;
            }
            adrID = adrInfo.AddressID;
            var existedAddr = adrView.items.some(function (item) {
                return item.AddressID === adrID;
            });
            if (existedAddr) {
                alert('Customer already has this address!');
                return;
            }
            //don't clear, append to the existing
            var promise = this._customerAddressVM._loadAddresses([adrID], false);
            promise.done(function (res) {
                var address = self._customerAddressVM.addressesDb.findEntity(adrID);
                if (!!address) {
                    self._customerAddressVM._addNewCustAddress(address);
                    //remove address from right panel
                    self._removeAddressRP(adrID);
                }
            });
        };
        AddAddressVM.prototype._unLinkAddress = function () {
            var item = this.custAdressView.currentItem;
            if (!item) {
                return;
            }
            var id = item.AddressID;
            //delete it from the left panel
            if (item._aspect.deleteItem())
                //and then add the address to the right panel (really adds an addressInfo, not the address entity)
                this._addAddressRP(id);
        };
        //adds an addressInfo to the right panel
        AddAddressVM.prototype._addAddressRP = function (addressID) {
            //if address already on client, just make it be displayed in the view
            if (this._checkAddressInRP(addressID)) {
                var deferred = utils.createDeferred();
                deferred.reject();
                return deferred.promise();
            }
            //if we are here, we need to load the address from the server
            var self = this, query = this._addressInfosDb.createReadAddressInfoQuery();
            //dont clear, append to the existing
            query.isClearPrevData = false;
            query.where('AddressID', 0 /* Equals */, [addressID]);
            var promise = query.load();
            promise.done(function () {
                self._checkAddressInRP(addressID);
            });
            return promise;
        };
        //make sure if the addressInfo already on the client, adds it to the view
        AddAddressVM.prototype._checkAddressInRP = function (addressID) {
            //try to find it in the TDbSet
            var item = this._addressInfosDb.findEntity(addressID);
            if (!!item) {
                //if found, try append to the view
                var appended = this._addressInfosView.appendItems([item]);
                this._addressInfosView.currentItem = item;
                if (!!this._adressInfosGrid)
                    this._adressInfosGrid.scrollToCurrent(true);
            }
            return !!item;
        };
        //remove the address from the right panel (it is done by removing the item from the view)
        AddAddressVM.prototype._removeAddressRP = function (addressID) {
            var item = this._addressInfosView.findByPK(addressID);
            if (!!item) {
                this._addressInfosView.removeItem(item);
            }
        };
        //returns a promise
        AddAddressVM.prototype.loadAddressInfos = function () {
            var query = this._addressInfosDb.createReadAddressInfoQuery();
            query.isClearPrevData = true;
            COMMON.addTextQuery(query, 'AddressLine1', '%' + this.searchString + '%');
            query.orderBy('AddressLine1');
            return query.load();
        };
        AddAddressVM.prototype.submitChanges = function () { return this.dbContext.submitChanges(); };
        AddAddressVM.prototype.rejectChanges = function () { };
        AddAddressVM.prototype.destroy = function () {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            if (!!this._addressInfosDb) {
                this._addressInfosDb.removeNSHandlers(this.uniqueID);
                this._addressInfosDb.clear();
                this._addressInfosDb = null;
            }
            if (!!this._addressInfosView) {
                this._addressInfosView.destroy();
                this._addressInfosView = null;
            }
            this.custAdressView.removeNSHandlers(this.uniqueID);
            if (!!this._customerAddressVM) {
                this._customerAddressVM.removeNSHandlers(this.uniqueID);
                this._customerAddressVM = null;
            }
            _super.prototype.destroy.call(this);
        };
        Object.defineProperty(AddAddressVM.prototype, "app", {
            get: function () { return this._app; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddAddressVM.prototype, "dbContext", {
            get: function () { return this.app.dbContext; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddAddressVM.prototype, "dbSets", {
            get: function () { return this.dbContext.dbSets; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddAddressVM.prototype, "isCanSubmit", {
            get: function () { return true; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddAddressVM.prototype, "addressInfosDb", {
            get: function () { return this._addressInfosDb; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddAddressVM.prototype, "addressInfosView", {
            get: function () { return this._addressInfosView; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddAddressVM.prototype, "addressesView", {
            get: function () { return this._customerAddressVM.addressesView; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddAddressVM.prototype, "custAdressView", {
            get: function () { return this._customerAddressVM.custAdressView; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddAddressVM.prototype, "currentAddressInfo", {
            get: function () { return this._addressInfosView.currentItem; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddAddressVM.prototype, "searchString", {
            get: function () { return this._searchString; },
            set: function (v) {
                if (this._searchString !== v) {
                    this._searchString = v;
                    this.raisePropertyChanged('searchString');
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddAddressVM.prototype, "addNewCommand", {
            get: function () { return this._addNewCommand; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddAddressVM.prototype, "execSearchCommand", {
            get: function () { return this._execSearchCommand; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddAddressVM.prototype, "addNewAddressCommand", {
            get: function () { return this._addNewAddressCommand; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddAddressVM.prototype, "linkCommand", {
            //links an address to the customer
            get: function () { return this._linkCommand; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddAddressVM.prototype, "unLinkCommand", {
            get: function () { return this._unLinkCommand; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddAddressVM.prototype, "newAddress", {
            get: function () { return this._newAddress; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddAddressVM.prototype, "customer", {
            get: function () { return this._currentCustomer; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddAddressVM.prototype, "propChangeCommand", {
            get: function () { return this._propChangeCommand; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddAddressVM.prototype, "searchToolTip", {
            get: function () { return this._searchToolTip; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AddAddressVM.prototype, "uiViewVM", {
            get: function () { return this._uiViewVM; },
            enumerable: true,
            configurable: true
        });
        return AddAddressVM;
    })(MOD.mvvm.BaseViewModel);
    exports.AddAddressVM = AddAddressVM;
    //this function is executed when the application is created
    //it can be used to initialize application specific resources in the module
    function initModule(app) {
        app.registerElView('productAutocomplete', ProductAutoComplete);
        //return something, even null is OK
        return {};
    }
    exports.initModule = initModule;
});
//# sourceMappingURL=spaDemoViewModels.js.map