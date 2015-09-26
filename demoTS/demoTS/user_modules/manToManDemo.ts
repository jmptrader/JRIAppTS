/// <reference path="..\..\jriappTS\jriapp.d.ts"/>
/// <reference path="common.ts"/>
/// <reference path="autocomplete.ts"/>
/// <reference path="demoDB.ts"/>
//many to many demo
namespace RIAPP.MTMDEMO {
    'use strict';
    var global = RIAPP.global, utils = global.utils;
    //private helper function (used inside this namespace only)
    function addTextQuery(query: MOD.db.TDataQuery, fldName: string, val) {
        var tmp;
        if (!!val) {
            if (utils.str.startsWith(val, '%') && utils.str.endsWith(val, '%')) {
                tmp = utils.str.trim(val, '% ');
                query.where(fldName, MOD.collection.FILTER_TYPE.Contains, [tmp])
            }
            else if (utils.str.startsWith(val, '%')) {
                tmp = utils.str.trim(val, '% ');
                query.where(fldName, MOD.collection.FILTER_TYPE.EndsWith, [tmp])
            }
            else if (utils.str.endsWith(val, '%')) {
                tmp = utils.str.trim(val, '% ');
                query.where(fldName, MOD.collection.FILTER_TYPE.StartsWith, [tmp])
            }
            else {
                tmp = utils.str.trim(val);
                query.where(fldName, MOD.collection.FILTER_TYPE.Equals, [tmp])
            }
        }
        return query;
    };

    export class CustomerVM extends MOD.mvvm.BaseViewModel {
        _dbSet: DEMODB.CustomerDb;
        _addNewCommand: MOD.mvvm.ICommand;
        _saveCommand: MOD.mvvm.ICommand;
        _undoCommand: MOD.mvvm.ICommand;
        _loadCommand: MOD.mvvm.ICommand;
        _helpCommand: MOD.mvvm.ICommand;
        _customerAddressVM: CustomerAddressVM;

        constructor(app: DemoApplication) {
            super(app);
            var self = this;
            this._dbSet = this.dbSets.Customer;
            this._dbSet.isSubmitOnDelete = true;

            this._dbSet.addOnPropertyChange('currentItem', function (sender, args) {
                self._onCurrentChanged();
            }, self.uniqueID);

            this._dbSet.addOnItemDeleting(function (s, a) {
                if (!confirm('Are you sure that you want to delete customer ?'))
                    a.isCancel = true;
            }, self.uniqueID);

            this._dbSet.addOnEndEdit(function (sender, args) {
                if (!args.isCanceled) {
                    self.dbContext.submitChanges();
                }
            }, self.uniqueID);


            this._dbSet.addOnFill(function (sender, args) {
                //when filled, then raise our custom event
                if (!args.isBegin) {
                    self.raiseEvent('data_filled', args);
                }
            }, self.uniqueID);

            this._dbSet.addOnItemAdded((s, args) => {
                args.item.NameStyle = false;
                args.item.ComplexProp.LastName = "DummyLastName";
                args.item.ComplexProp.FirstName = "DummyFirstName";
            });

            //initialize new item with default values
            this._dbSet.addOnItemAdded(function (sender, args) {
                var item = args.item;
                item.NameStyle = false;
            }, self.uniqueID);

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


            //an example of using command parameter for a command
            this._helpCommand = new MOD.mvvm.Command(function (sender, param) {
                alert('Help command executed for AddressID: ' + (!!param ? param.AddressID : '???'));
            }, self, null);

            this._customerAddressVM = null;
        }
        //here we added a custom event
        _getEventNames() {
            var base_events = super._getEventNames();
            return ['data_filled'].concat(base_events);
        }
        _onCurrentChanged() {
            this.raisePropertyChanged('currentItem');
        }
        load() {
            var query = this.dbSet.createReadCustomerQuery({ includeNav: false });
            query.pageSize = 50;
            //when loadPageCount > 1 the we are loading several pages at once
            //when moving to the next page, the data is retrived from the local cache
            query.loadPageCount = 10;
            //we clear the previous cached data for each loading data from the server
            query.isClearCacheOnEveryLoad = true;
            query.orderBy('LastName').thenBy('MiddleName').thenBy('FirstName');
            return query.load();

        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            if (!!this._customerAddressVM) {
                this._customerAddressVM.destroy();
                this._customerAddressVM = null;
            }
            if (!!this._dbSet) {
                this._dbSet.removeNSHandlers(this.uniqueID);
            }
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
        get helpCommand() { return this._helpCommand; }
        get customerAddressVM() {
            if (!this._customerAddressVM)
                this._customerAddressVM = new CustomerAddressVM(this);
            return this._customerAddressVM;
        }
    }

    export class CustomerAddressVM extends MOD.mvvm.BaseViewModel {
        _customerVM: CustomerVM;
        _addressesDb: DEMODB.AddressDb;
        _custAdressDb: DEMODB.CustomerAddressDb;
        _currentCustomer: DEMODB.Customer;
        _addAddressVM: AddAddressVM;
        _custAdressView: MOD.db.ChildDataView<DEMODB.CustomerAddress>;
        _addressesView: MOD.db.DataView<DEMODB.Address>;

        constructor(customerVM: CustomerVM) {
            super(customerVM.app);
            var self = this;
            this._customerVM = customerVM;
            this._addAddressVM = null;
            this._currentCustomer = null;
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
                if (!confirm('Are you sure that you want to delete Customer\'s Address ?'))
                    args.isCancel = true;
            }, self.uniqueID);

            this._customerVM.dbSet.addOnFill(function (sender, args) {
                if (args.isBegin)
                    return;
                self.load(args.fetchedItems);
            }, self.uniqueID);

            var custAssoc = self.dbContext.associations.getCustAddrToCustomer();

            //the view to filter CustomerAddresses related to the current customer only
            this._custAdressView = new MOD.db.ChildDataView<DEMODB.CustomerAddress>(
                {
                    association: custAssoc,
                    fn_sort: function (a, b) { return a.AddressID - b.AddressID; }
                });

            //the view to filter addresses related to the current customer
            this._addressesView = new MOD.db.DataView<DEMODB.Address>(
                {
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

            this._custAdressView.addOnViewRefreshed(function (s, a) {
                self._addressesView.refresh();
            }, self.uniqueID);

            this._customerVM.addOnPropertyChange('currentItem', function (sender, args) {
                self._currentCustomer = self._customerVM.currentItem;
                self._custAdressView.parentItem = self._currentCustomer;
                self.raisePropertyChanged('currentCustomer');
            }, self.uniqueID);

        }
        //async load, returns promise
        _loadAddresses(addressIDs: number[], isClearTable: boolean) {
            var query = this._addressesDb.createReadAddressByIdsQuery({ addressIDs: addressIDs });
            //if true, we clear all previous data in the TDbSet
            query.isClearPrevData = isClearTable;
            //returns promise
            return query.load();
        }
        _addNewAddress() {
            //use the TDataView, not TDbSet
            var adr = this.addressesView.addNew();
            return adr;
        }
        _addNewCustAddress(address: DEMODB.Address) {
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
        }
        load(customers: DEMODB.Customer[]) {
            var self = this, custArr = customers || [];
            var custIDs = custArr.map(function (item) {
                return item.CustomerID;
            });

            var query = this._custAdressDb.createReadAddressForCustomersQuery({ custIDs: custIDs });
            query.isClearPrevData = true;
            var promise = query.load();
            //load related addresses based on what customerAddress items just loaded
            promise.done(function (res) {
                var addressIDs = res.fetchedItems.map(function (item) {
                    return item.AddressID;
                });
                //load new addresses and clear all previous addresses
                self._loadAddresses(addressIDs, true);
            });
        }
        destroy() {
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
            if (this._addAddressVM) {
                this._addAddressVM.destroy();
                this._addAddressVM = null;
            }
            super.destroy();
        }

        get app() { return <DemoApplication>this._app; }
        get dbContext() { return this.app.dbContext; }
        get dbSets() { return this.dbContext.dbSets; }
        get addressesDb() { return this._addressesDb; }
        get custAdressDb() { return this._custAdressDb; }
        get addressesView() { return this._addressesView; }
        get custAdressView() { return this._custAdressView; }
        get addAddressVM() {
            if (this._addAddressVM === null) {
                this._addAddressVM = new AddAddressVM(this);
            }
            return this._addAddressVM;
        }
        get currentCustomer() { return this._currentCustomer; }
    }

    //MOD.utils.ISubmittable allows for the edit dialog to submit changes automatically
    export class AddAddressVM extends MOD.mvvm.BaseViewModel implements RIAPP.ISubmittable {
        _customerAddressVM: CustomerAddressVM;
        _addressInfosDb: DEMODB.AddressInfoDb;
        _currentCustomer: DEMODB.Customer;
        _searchToolTip: string;
        _newAddress: DEMODB.Address;
        _adressInfosGrid: MOD.datagrid.DataGrid;
        _searchString: string;
        _isAddingNew: boolean;
        _dialogVM: MOD.datadialog.DialogVM;
        _addressInfosView: MOD.db.DataView<DEMODB.AddressInfo>;
        _linkCommand: MOD.mvvm.ICommand;
        _addNewCommand: MOD.mvvm.ICommand;
        _unLinkCommand: MOD.mvvm.ICommand;
        _execSearchCommand: MOD.mvvm.ICommand;
        _addNewAddressCommand: MOD.mvvm.ICommand;
        _propChangeCommand: MOD.mvvm.ICommand;

        constructor(customerAddressVM: CustomerAddressVM) {
            super(customerAddressVM.app);
            var self = this;
            this._customerAddressVM = customerAddressVM;
            this._addressInfosDb = this.dbContext.dbSets.AddressInfo;
            this._currentCustomer = null;
            this._searchToolTip = 'enter any address part then press search button';
            this._newAddress = null;
            this._adressInfosGrid = null;
            this._searchString = null;
            this._isAddingNew = false;
            this._dialogVM = new MOD.datadialog.DialogVM(self.app);
            var dialogOptions: MOD.datadialog.IDialogConstructorOptions = {
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
                    if (!self._isAddingNew) {
                        //allow to close the dialog
                        return MOD.datadialog.DIALOG_ACTION.Default;
                    }
                    if (!self._newAddress._aspect.endEdit())
                        return MOD.datadialog.DIALOG_ACTION.StayOpen;
                    var custAdress = self._customerAddressVM._addNewCustAddress(self._newAddress);
                    custAdress._aspect.endEdit();
                    self._newAddress = null;
                    self._isAddingNew = false;
                    self.raisePropertyChanged('newAddress');
                    self.raisePropertyChanged('isAddingNew');
                    return MOD.datadialog.DIALOG_ACTION.StayOpen;
                },
                fn_OnCancel: function (dialog) {
                    if (!self._isAddingNew) {
                        return MOD.datadialog.DIALOG_ACTION.Default;
                    }
                    if (!!self._newAddress) {
                        self._cancelAddNewAddress();
                    }
                    return MOD.datadialog.DIALOG_ACTION.StayOpen;
                }
            };
            this._dialogVM.createDialog('addressDialog', dialogOptions);

            //this data displayed in the right panel - contains available (existing in db) addresses
            this._addressInfosView = new MOD.db.DataView<DEMODB.AddressInfo>(
                {
                    dataSource: this._addressInfosDb,
                    fn_sort: function (a: DEMODB.AddressInfo, b: DEMODB.AddressInfo) { return a.AddressID - b.AddressID; },
                    fn_filter: function (item: DEMODB.AddressInfo) {
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
                } catch (ex) {
                    self.handleError(ex, this);
                }
            }, self,
                function (sender, param) {
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

            //this is bound to the grid element view on the page
            //by this command we can get hold of the datagrid control
            //this command executed when element view property changes
            //we grab grid property from the sender (which is element view, and has property - grid)
            this._propChangeCommand = new MOD.baseElView.PropChangedCommand(function (sender, args) {
                if (args.property == '*' || args.property == 'grid') {
                    self._adressInfosGrid = sender.grid;
                }
            }, self, null);
        }
        get isCanSubmit(): boolean { return true; }
        submitChanges(): IVoidPromise { return this.dbContext.submitChanges(); }
        rejectChanges(): void {
        }
        _cancelAddNewAddress() {
            var self = this;
            self._newAddress._aspect.cancelEdit();
            self._newAddress._aspect.rejectChanges();
            self._newAddress = null;
            self._isAddingNew = false;
            self.raisePropertyChanged('newAddress');
            self.raisePropertyChanged('isAddingNew');
        }
        //returns promise
        loadAddressInfos() {
            var query = this._addressInfosDb.createReadAddressInfoQuery();
            query.isClearPrevData = true;
            addTextQuery(query, 'AddressLine1', '%' + this.searchString + '%');
            query.orderBy('AddressLine1');
            return query.load();
        }
        _addNewAddress() {
            this._newAddress = this._customerAddressVM._addNewAddress();
            this._isAddingNew = true;
            this.raisePropertyChanged('newAddress');
            this.raisePropertyChanged('isAddingNew');
        }
        _linkAddress() {
            var self = this, adrInfo = this.currentAddressInfo, adrView = self.custAdressView, adrID: number;
            if (!adrInfo) {
                alert('_linkAddress error: adrInfoEntity is null');
                return;
            }
            adrID = adrInfo.AddressID;
            var existedAddr: boolean = adrView.items.some(function (item) {
                return item.AddressID === adrID;
            });

            if (existedAddr) {
                alert('Customer already has this address!');
                return;
            }

            //dont clear, append to the existing
            var promise = this._customerAddressVM._loadAddresses([adrID], false);
            promise.done(function (res) {
                var address = self._customerAddressVM.addressesDb.findEntity(adrID);
                if (!!address) {
                    self._customerAddressVM._addNewCustAddress(address);
                    //remove address from right panel
                    self._removeAddressRP(adrID);
                }
            });
        }
        _unLinkAddress() {
            var item = this.custAdressView.currentItem;
            if (!item) {
                return;
            }
            var id = item.AddressID;
            //delete it from the left panel
            if (item._aspect.deleteItem())
                //and then add the address to the right panel (really adds an addressInfo, not the address entity)
                this._addAddressRP(id);
        }
        //adds an addressInfo to the right panel
        _addAddressRP(addressID: number) {
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
            query.where('AddressID', MOD.collection.FILTER_TYPE.Equals, [addressID]);
            var promise = query.load();
            promise.done(function () {
                self._checkAddressInRP(addressID);
            });
            return promise;
        }
        //make sure if the addressInfo already on the client, adds it to the view
        _checkAddressInRP(addressID) {
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
        }
        //remove the address from the right panel (it is done by removing the item from the view)
        _removeAddressRP(addressID) {
            var item = this._addressInfosView.findByPK(addressID);
            if (!!item) {
                this._addressInfosView.removeItem(item);
            }
        }
        destroy() {
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
            super.destroy();
        }
        get app() { return <DemoApplication>this._app; }
        get dbContext() { return this.app.dbContext; }
        get dbSets() { return this.dbContext.dbSets; }
        get addressInfosDb() { return this._addressInfosDb; }
        get addressInfosView() { return this._addressInfosView; }
        get addressesView() { return this._customerAddressVM._addressesView; }
        get custAdressView() { return this._customerAddressVM.custAdressView; }
        get currentAddressInfo() { return <DEMODB.AddressInfo>this._addressInfosView.currentItem; }
        get searchString() { return this._searchString; }
        set searchString(v) {
            if (this._searchString !== v) {
                this._searchString = v;
                this.raisePropertyChanged('searchString');
            }
        }
        get addNewCommand() { return this._addNewCommand; }
        get execSearchCommand() { return this._execSearchCommand; }
        get addNewAddressCommand() { return this._addNewAddressCommand; }
        //links an address to the customer
        get linkCommand() { return this._linkCommand; }
        get unLinkCommand() { return this._unLinkCommand; }
        get newAddress() { return this._newAddress; }
        get customer() { return this._currentCustomer; }
        get isAddingNew() { return this._isAddingNew; }
        get propChangeCommand() { return this._propChangeCommand; }
        get searchToolTip() { return this._searchToolTip; }
    }

    export interface IMainOptions extends IAppOptions {
        service_url: string;
        permissionInfo?: MOD.db.IPermissionsInfo;
        images_path: string;
    }

    export class DemoApplication extends Application {
        _dbContext: DEMODB.DbContext;
        _errorVM: COMMON.ErrorViewModel;
        _customerVM: CustomerVM;

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

            this.registerObject("dbContext", this._dbContext);
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

    RIAPP.global.addOnLoad(function (sender, a) {
        var global = sender;
        //initialize images folder path
        global.defaults.imagesPath = mainOptions.images_path;
        //create and then start application
        var thisApp = new DemoApplication(mainOptions);
        thisApp.startUp((app) => { });
    });


    function initModule(app: Application) {
        return MTMDEMO;
    };

    //properties must be initialized on HTML page
    export var mainOptions: IMainOptions = {
        service_url: null,
        permissionInfo: null,
        images_path: null,
        user_modules: [{ name: "COMMON", initFn: COMMON.initModule },
            { name: "AUTOCOMPLETE", initFn: AUTOCOMPLETE.initModule },
            { name: "MTMDEMO", initFn: initModule }]
    };
}
