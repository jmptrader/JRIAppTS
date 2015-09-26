﻿/// <reference path="..\..\jriappTS\jriapp.d.ts"/>
/// <reference path="common.ts"/>
/// <reference path="autocomplete.ts"/>
/// <reference path="demoDB.ts"/>
//master-details demo 
namespace RIAPP.MDETDEMO {
    'use strict';
    var global = RIAPP.global, utils = global.utils;

    export class CustomerVM extends MOD.mvvm.BaseViewModel {
        private _dataGrid: MOD.datagrid.DataGrid;
        private _dbSet: DEMODB.CustomerDb;
        private _propWatcher: MOD.utils.PropWatcher;
        private _addNewCommand: MOD.mvvm.ICommand;
        private _saveCommand: MOD.mvvm.ICommand;
        private _undoCommand: MOD.mvvm.ICommand;
        private _loadCommand: MOD.mvvm.ICommand;
        private _custAdressView: MOD.db.ChildDataView<DEMODB.CustomerAddress>;
        private _ordersVM: OrderVM;

        constructor(app: DemoApplication) {
            super(app);
            var self = this;
            this._dataGrid = null;
            this._dbSet = this.dbSets.Customer;
            this._dbSet.isSubmitOnDelete = true;
            this._propWatcher = new MOD.utils.PropWatcher();

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

            this._dbSet.addOnItemAdded((s, args) => {
                args.item.NameStyle = false;
                args.item.ComplexProp.LastName = "DummyLastName";
                args.item.ComplexProp.FirstName = "DummyFirstName";
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
            this._custAdressView = new MOD.db.ChildDataView<DEMODB.CustomerAddress>(
                {
                    association: custAssoc,
                    fn_sort: function (a, b) { return a.AddressID - b.AddressID; }
                });

            this._ordersVM = new OrderVM(this);
        }
        protected _addGrid(grid: MOD.datagrid.DataGrid): void {
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
        }
        protected _removeGrid(): void {
            if (!this._dataGrid)
                return;
            this._dataGrid.removeNSHandlers(this.uniqueID);
            this._dataGrid = null;
        }
        protected onRowExpanded(row: MOD.datagrid.Row): void {
            this.raiseEvent('row_expanded', { customer: row.item, isExpanded: true });
        }
        protected onRowCollapsed(row: MOD.datagrid.Row): void {
            this.raiseEvent('row_expanded', { customer: row.item, isExpanded: false });
        }
        protected onCellDblClicked(cell: MOD.datagrid.BaseCell): void {
            alert("You double clicked " + cell.uniqueID);
        }

        protected _getEventNames() {
            var base_events = super._getEventNames();
            return ['row_expanded', 'page_changed'].concat(base_events);
        }
        protected _onCurrentChanged() {
            this._custAdressView.parentItem = this._dbSet.currentItem;
            this.raisePropertyChanged('currentItem');
        }
        //returns promise
        load() {
            var query = this._dbSet.createReadCustomerQuery({ includeNav: true });
            query.pageSize = 50;
            query.orderBy('LastName').thenBy('MiddleName').thenBy('FirstName');
            return query.load();
        }
        destroy() {
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

            this._ordersVM.destroy()
            this._ordersVM = null;
            super.destroy();
        }
        get app() { return <DemoApplication>this._app; }
        get dbContext() { return this.app.dbContext; }
        get dbSets() { return this.dbContext.dbSets; }
        get dbSet() { return this._dbSet; }
        get currentItem() { return this._dbSet.currentItem; }
        get addNewCommand() { return this._addNewCommand; }
        get saveCommand() { return this._saveCommand; }
        get undoCommand() { return this._undoCommand; }
        get loadCommand() { return this._loadCommand; }
        get ordersVM() { return this._ordersVM; }
        get custAdressView() { return this._custAdressView; }
        get grid(): MOD.datagrid.DataGrid { return this._dataGrid; }
        set grid(v: MOD.datagrid.DataGrid) {
            if (!!v)
                this._addGrid(v);
            else
                this._removeGrid();
        }
    }

    export class OrderVM extends MOD.mvvm.BaseViewModel implements MOD.tabs.ITabsEvents {
        private _customerVM: CustomerVM;
        private _dbSet: DEMODB.SalesOrderHeaderDb;
        private _currentCustomer: DEMODB.Customer;
        private _dataGrid: MOD.datagrid.DataGrid;
        private _tabs: MOD.tabs.ITabs;
        private _selectedTabIndex: number;
        private _orderStatuses: DEMODB.KeyValDictionary;
        private _addNewCommand: MOD.mvvm.ICommand;
        private _addressVM: AddressVM;
        private _orderDetailVM: OrderDetailVM;

        constructor(customerVM: CustomerVM) {
            super(customerVM.app);
            var self = this;
            this._customerVM = customerVM;
            this._dbSet = this.dbSets.SalesOrderHeader;
            this._currentCustomer = null;
            this._dataGrid = null;
            this._selectedTabIndex = null;
            this._tabs = null;
            this._orderStatuses = new DEMODB.KeyValDictionary();
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
            this._addNewCommand = new MOD.mvvm.Command(function (sender, param) {
                //the dialog shown by the datagrid
                self._dbSet.addNew();
            }, self, function (sender, param) {
                return true;
            });

            this._addressVM = new AddressVM(this);
            this._orderDetailVM = new OrderDetailVM(this);
        }
        protected _getEventNames() {
            var base_events = super._getEventNames();
            return ['row_expanded'].concat(base_events);
        }
        protected _addGrid(grid: MOD.datagrid.DataGrid): void {
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
        }
        protected _removeGrid(): void {
            if (!this._dataGrid)
                return;
            this._dataGrid.removeNSHandlers(this.uniqueID);
            this._dataGrid = null;
        }
        protected onRowExpanded(row: MOD.datagrid.Row): void {
            this.raiseEvent('row_expanded', { order: row.item, isExpanded: true });
            if (!!this._tabs)
                this.onTabSelected(this._tabs);
        }
        protected onRowCollapsed(row: MOD.datagrid.Row): void {
            this.raiseEvent('row_expanded', { order: row.item, isExpanded: false });
        }

        //#begin MOD.tabs.ITabsEvents
        addTabs(tabs: MOD.tabs.ITabs): void {
            this._tabs = tabs;
        }
        removeTabs(): void {
            this._tabs = null;
        }
        onTabSelected(tabs: MOD.tabs.ITabs): void {
            this._selectedTabIndex = tabs.tabIndex;
            this.raisePropertyChanged('selectedTabIndex');

            if (this._selectedTabIndex == 2) {  
                //load details only when the tab which contains the details grid is selected
                this._orderDetailVM.currentOrder = this.dbSet.currentItem;
            }
        }
        //#end MOD.tabs.ITabsEvents

        protected _onCurrentChanged() {
            this.raisePropertyChanged('currentItem');
        }
        clear() {
            this.dbSet.clear();
        }
        //returns promise
        load() {
            //explicitly clear before every load
            this.clear();
            if (!this.currentCustomer || this.currentCustomer._aspect.isNew) {
                var deferred = utils.createDeferred();
                deferred.reject();
                return deferred.promise();
            }
            var query = this.dbSet.createReadSalesOrderHeaderQuery();
            query.where('CustomerID', MOD.collection.FILTER_TYPE.Equals, [this.currentCustomer.CustomerID]);
            query.orderBy('OrderDate').thenBy('SalesOrderID');
            return query.load();
        }
        destroy() {
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
            super.destroy();
        }
        get app() { return <DemoApplication>this._app; }
        get dbContext() { return this.app.dbContext; }
        get dbSets() { return this.dbContext.dbSets; }
        get currentItem() { return this._dbSet.currentItem; }
        get dbSet() { return this._dbSet; }
        get addNewCommand() { return this._addNewCommand; }
        get orderStatuses() { return this._orderStatuses; }
        get currentCustomer() { return this._currentCustomer; }
        set currentCustomer(v) {
            if (v !== this._currentCustomer) {
                this._currentCustomer = v;
                this.raisePropertyChanged('currentCustomer');
                this.load();
            }
        }
        get customerVM() { return this._customerVM; }
        get orderDetailsVM() { return this._orderDetailVM; }
        get selectedTabIndex() { return this._selectedTabIndex; }

        get tabsEvents(): MOD.tabs.ITabsEvents { return this; }
        get grid(): MOD.datagrid.DataGrid { return this._dataGrid; }
        set grid(v: MOD.datagrid.DataGrid) {
            if (!!v)
                this._addGrid(v);
            else
                this._removeGrid();
        }
    }

    export class OrderDetailVM extends MOD.mvvm.BaseViewModel {
        private _orderVM: OrderVM;
        private _dbSet: DEMODB.SalesOrderDetailDb;
        private _currentOrder: DEMODB.SalesOrderHeader;
        private _productVM: ProductVM;

        constructor(orderVM: OrderVM) {
            super(orderVM.app);
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
        protected _onCurrentChanged() {
            this.raisePropertyChanged('currentItem');
        }
        //returns promise
        load() {
            this.clear();

            if (!this.currentOrder || this.currentOrder._aspect.isNew) {
                var deferred = utils.createDeferred();
                deferred.reject();
                return deferred.promise();
            }
            var query = this.dbSet.createReadSalesOrderDetailQuery();
            query.where('SalesOrderID', MOD.collection.FILTER_TYPE.Equals, [this.currentOrder.SalesOrderID]);
            query.orderBy('SalesOrderDetailID');
            return query.load();
        }
        clear() {
            this.dbSet.clear();
        }
        destroy() {
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
            super.destroy();
        }
        get app() { return <DemoApplication>this._app; }
        get dbContext() { return this.app.dbContext; }
        get dbSets() { return this.dbContext.dbSets; }
        get currentItem() { return this._dbSet.currentItem; }
        get dbSet() { return this._dbSet; }
        get currentOrder() { return this._currentOrder; }
        set currentOrder(v) {
            if (v !== this._currentOrder) {
                this._currentOrder = v;
                this.raisePropertyChanged('currentOrder');
                this.load();
            }
        }
        get orderVM() { return this._orderVM; }
    }

    export class AddressVM extends MOD.mvvm.BaseViewModel {
        private _orderVM: OrderVM;
        private _dbSet: DEMODB.AddressDb;

        constructor(orderVM: OrderVM) {
            super(orderVM.app);
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
        protected _onCurrentChanged() {
            this.raisePropertyChanged('currentItem');
        }
        //returns promise
        loadAddressesForOrders(orders: DEMODB.SalesOrderHeader[]) {
            var ids1: number[] = orders.map(function (item) {
                return item.ShipToAddressID;
            });
            var ids2: number[] = orders.map(function (item) {
                return item.BillToAddressID;
            });
            var ids: number[] = ids1.concat(ids2).filter(function (id) {
                return id !== null;
            });
            return this.load(ArrayHelper.distinct(ids), false);
        }
        //returns promise
        load(ids: number[], isClearTable: boolean) {
            var query = this.dbSet.createReadAddressByIdsQuery({ addressIDs: ids });
            //if true, previous data will be cleared when the new is loaded
            query.isClearPrevData = isClearTable;
            return query.load();
        }
        clear() {
            this.dbSet.clear();
        }
        destroy() {
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
            super.destroy();
        }
        get _customerDbSet() { return this._orderVM.customerVM.dbSet; }
        get app() { return <DemoApplication>this._app; }
        get dbContext() { return this.app.dbContext; }
        get dbSets() { return this.dbContext.dbSets; }
        get currentItem() { return this._dbSet.currentItem; }
        get dbSet() { return this._dbSet; }
        get orderVM() { return this._orderVM; }
    }

    export class ProductAutoComplete extends AUTOCOMPLETE.AutoCompleteElView {
        private _lastLoadedID: number;
        private _lookupSource: DEMODB.ProductDb;

        protected _init(options) {
            super._init(options);
            var self = this;
            this._lastLoadedID = null;
            this._lookupSource = <DEMODB.ProductDb>this._getDbContext().getDbSet('Product');
            this._lookupSource.addOnCollChanged(function (sender, args) {
                self._updateValue();
            }, self._objId);
        }
        //overriden base method
        _updateSelection() {
            if (!!this.dataContext) {
                var id = this.currentSelection;
                this.dataContext.ProductID = id;
            }
        }
        _onHide() {
            super._onHide();
            this._updateValue();
        }
        //new method
        _updateValue() {
            if (!this.dataContext) {
                this.value = '';
                return;
            }
            var productID = this.dataContext.ProductID;
            //casting will be solved with generics soon
            var product: DEMODB.Product = this._lookupSource.findEntity(productID);
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
        }
        //overriden base property
        get dataContext() { return <DEMODB.Product>this._dataContext; }
        set dataContext(v) {
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
        }
        //overriden base property
        get currentSelection() {
            if (!!this.gridDataSource.currentItem)
                return <number>this.gridDataSource.currentItem['ProductID'];
            else
                return null;
        }
    }

    export class ProductVM extends MOD.mvvm.BaseViewModel {
        private _orderDetailVM: OrderDetailVM;
        private _dbSet: DEMODB.ProductDb;

        constructor(orderDetailVM: OrderDetailVM) {
            super(orderDetailVM.app);
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
        _onCurrentChanged() {
            this.raisePropertyChanged('currentItem');
        }
        clear() {
            this.dbSet.clear();
        }
        //returns promise
        loadProductsForOrderDetails(orderDetails: DEMODB.SalesOrderDetail[]) {
            var ids: number[] = orderDetails.map(function (item) {
                return item.ProductID;
            }).filter(function (id) {
                return id !== null;
            });

            return this.load(ArrayHelper.distinct(ids), false);
        }
        //returns promise
        load(ids: number[], isClearTable: boolean) {
            var query = this.dbSet.createReadProductByIdsQuery({ productIDs: ids });
            query.isClearPrevData = isClearTable;
            return query.load();
        }
        destroy() {
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
            super.destroy();
        }
        get _customerDbSet() { return this._orderDetailVM.orderVM.customerVM.dbSet; }
        get app() { return <DemoApplication>this._app; }
        get dbContext() { return this.app.dbContext; }
        get dbSets() { return this.dbContext.dbSets; }
        get currentItem() { return this._dbSet.currentItem; }
        get dbSet() { return this._dbSet; }
    }

    export interface IMainOptions extends IAppOptions {
        service_url: string;
        permissionInfo?: MOD.db.IPermissionsInfo;
        images_path: string;
    }

    export class DemoApplication extends Application {
        private _dbContext: DEMODB.DbContext;
        private _errorVM: COMMON.ErrorViewModel;
        private _customerVM: CustomerVM;

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
                //executed in the context of the entity
                return toText(item.ComplexProp.LastName) + '  ' + toText(item.ComplexProp.MiddleName) + '  ' + toText(item.ComplexProp.FirstName);
            });
            this.registerObject('dbContext', this._dbContext);
            this._errorVM = new COMMON.ErrorViewModel(this);
            this._customerVM = new CustomerVM(this);

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
        get TEXT() { return localizable.TEXT; }
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

    //create and start application here
    RIAPP.global.addOnLoad(function (sender, a) {
        var global = sender;
        //initialize images folder path
        global.defaults.imagesPath = mainOptions.images_path;
        //create and then start application
        var thisApp = new DemoApplication(mainOptions);
        thisApp.startUp((app) => { });
    });
   
     
    //this function is executed when the application is created
    //it can be used to initialize application's specific resources in the namespace
    function initModule(app: Application) {
        app.registerElView('productAutocomplete', ProductAutoComplete);
        return MDETDEMO;
    };

    //properties must be initialized on HTML page
    export var mainOptions: IMainOptions = {
        service_url: null,
        permissionInfo: null,
        images_path: null,
        user_modules: [{ name: "COMMON", initFn: COMMON.initModule },
            { name: "AUTOCOMPLETE", initFn: AUTOCOMPLETE.initModule },
            { name: "MDETDEMO", initFn: initModule }]
    };
}
