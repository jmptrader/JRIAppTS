var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="..\..\jriappTS\jriapp.d.ts"/>
/// <reference path="common.ts"/>
/// <reference path="autocomplete.ts"/>
/// <reference path="demoDB.ts"/>
//many to many demo
var RIAPP;
(function (RIAPP) {
    var MTMDEMO;
    (function (MTMDEMO) {
        'use strict';
        var global = RIAPP.global, utils = global.utils;
        //private helper function (used inside this namespace only)
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
        var CustomerVM = (function (_super) {
            __extends(CustomerVM, _super);
            function CustomerVM(app) {
                _super.call(this, app);
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
                this._dbSet.addOnItemAdded(function (s, args) {
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
                //an example of using command parameter for a command
                this._helpCommand = new RIAPP.MOD.mvvm.Command(function (sender, param) {
                    alert('Help command executed for AddressID: ' + (!!param ? param.AddressID : '???'));
                }, self, null);
                this._customerAddressVM = null;
            }
            //here we added a custom event
            CustomerVM.prototype._getEventNames = function () {
                var base_events = _super.prototype._getEventNames.call(this);
                return ['data_filled'].concat(base_events);
            };
            CustomerVM.prototype._onCurrentChanged = function () {
                this.raisePropertyChanged('currentItem');
            };
            CustomerVM.prototype.load = function () {
                var query = this.dbSet.createReadCustomerQuery({ includeNav: false });
                query.pageSize = 50;
                //when loadPageCount > 1 the we are loading several pages at once
                //when moving to the next page, the data is retrived from the local cache
                query.loadPageCount = 10;
                //we clear the previous cached data for each loading data from the server
                query.isClearCacheOnEveryLoad = true;
                query.orderBy('LastName').thenBy('MiddleName').thenBy('FirstName');
                return query.load();
            };
            CustomerVM.prototype.destroy = function () {
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
            Object.defineProperty(CustomerVM.prototype, "helpCommand", {
                get: function () { return this._helpCommand; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CustomerVM.prototype, "customerAddressVM", {
                get: function () {
                    if (!this._customerAddressVM)
                        this._customerAddressVM = new CustomerAddressVM(this);
                    return this._customerAddressVM;
                },
                enumerable: true,
                configurable: true
            });
            return CustomerVM;
        })(RIAPP.MOD.mvvm.BaseViewModel);
        MTMDEMO.CustomerVM = CustomerVM;
        var CustomerAddressVM = (function (_super) {
            __extends(CustomerAddressVM, _super);
            function CustomerAddressVM(customerVM) {
                _super.call(this, customerVM.app);
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
                this._custAdressView = new RIAPP.MOD.db.ChildDataView({
                    association: custAssoc,
                    fn_sort: function (a, b) { return a.AddressID - b.AddressID; }
                });
                //the view to filter addresses related to the current customer
                this._addressesView = new RIAPP.MOD.db.DataView({
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
                if (this._addAddressVM) {
                    this._addAddressVM.destroy();
                    this._addAddressVM = null;
                }
                _super.prototype.destroy.call(this);
            };
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
                    if (this._addAddressVM === null) {
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
        })(RIAPP.MOD.mvvm.BaseViewModel);
        MTMDEMO.CustomerAddressVM = CustomerAddressVM;
        //MOD.utils.ISubmittable allows for the edit dialog to submit changes automatically
        var AddAddressVM = (function (_super) {
            __extends(AddAddressVM, _super);
            function AddAddressVM(customerAddressVM) {
                _super.call(this, customerAddressVM.app);
                var self = this;
                this._customerAddressVM = customerAddressVM;
                this._addressInfosDb = this.dbContext.dbSets.AddressInfo;
                this._currentCustomer = null;
                this._searchToolTip = 'enter any address part then press search button';
                this._newAddress = null;
                this._adressInfosGrid = null;
                this._searchString = null;
                this._isAddingNew = false;
                this._dialogVM = new RIAPP.MOD.datadialog.DialogVM(self.app);
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
                        if (!self._isAddingNew) {
                            //allow to close the dialog
                            return 0 /* Default */;
                        }
                        if (!self._newAddress._aspect.endEdit())
                            return 1 /* StayOpen */;
                        var custAdress = self._customerAddressVM._addNewCustAddress(self._newAddress);
                        custAdress._aspect.endEdit();
                        self._newAddress = null;
                        self._isAddingNew = false;
                        self.raisePropertyChanged('newAddress');
                        self.raisePropertyChanged('isAddingNew');
                        return 1 /* StayOpen */;
                    },
                    fn_OnCancel: function (dialog) {
                        if (!self._isAddingNew) {
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
                this._addressInfosView = new RIAPP.MOD.db.DataView({
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
                this._addNewCommand = new RIAPP.MOD.mvvm.Command(function (sender, param) {
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
                this._execSearchCommand = new RIAPP.MOD.mvvm.Command(function (sender, args) {
                    self.loadAddressInfos();
                }, self, null);
                //adds new address to the customer
                this._addNewAddressCommand = new RIAPP.MOD.mvvm.Command(function (sender, args) {
                    self._addNewAddress();
                }, self, null);
                //adds existed address to the customer
                this._linkCommand = new RIAPP.MOD.mvvm.Command(function (sender, args) {
                    self._linkAddress();
                }, self, function (s, a) {
                    return !!self._addressInfosView.currentItem;
                });
                this._unLinkCommand = new RIAPP.MOD.mvvm.Command(function (sender, args) {
                    self._unLinkAddress();
                }, self, function (s, a) {
                    return !!self.custAdressView.currentItem;
                });
                //this is bound to the grid element view on the page
                //by this command we can get hold of the datagrid control
                //this command executed when element view property changes
                //we grab grid property from the sender (which is element view, and has property - grid)
                this._propChangeCommand = new RIAPP.MOD.baseElView.PropChangedCommand(function (sender, args) {
                    if (args.property == '*' || args.property == 'grid') {
                        self._adressInfosGrid = sender.grid;
                    }
                }, self, null);
            }
            Object.defineProperty(AddAddressVM.prototype, "isCanSubmit", {
                get: function () { return true; },
                enumerable: true,
                configurable: true
            });
            AddAddressVM.prototype.submitChanges = function () { return this.dbContext.submitChanges(); };
            AddAddressVM.prototype.rejectChanges = function () {
            };
            AddAddressVM.prototype._cancelAddNewAddress = function () {
                var self = this;
                self._newAddress._aspect.cancelEdit();
                self._newAddress._aspect.rejectChanges();
                self._newAddress = null;
                self._isAddingNew = false;
                self.raisePropertyChanged('newAddress');
                self.raisePropertyChanged('isAddingNew');
            };
            //returns promise
            AddAddressVM.prototype.loadAddressInfos = function () {
                var query = this._addressInfosDb.createReadAddressInfoQuery();
                query.isClearPrevData = true;
                addTextQuery(query, 'AddressLine1', '%' + this.searchString + '%');
                query.orderBy('AddressLine1');
                return query.load();
            };
            AddAddressVM.prototype._addNewAddress = function () {
                this._newAddress = this._customerAddressVM._addNewAddress();
                this._isAddingNew = true;
                this.raisePropertyChanged('newAddress');
                this.raisePropertyChanged('isAddingNew');
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
                get: function () { return this._customerAddressVM._addressesView; },
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
            Object.defineProperty(AddAddressVM.prototype, "isAddingNew", {
                get: function () { return this._isAddingNew; },
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
            return AddAddressVM;
        })(RIAPP.MOD.mvvm.BaseViewModel);
        MTMDEMO.AddAddressVM = AddAddressVM;
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
                    return toText(item.ComplexProp.LastName) + '  ' + toText(item.ComplexProp.MiddleName) + '  ' + toText(item.ComplexProp.FirstName);
                });
                this.registerObject("dbContext", this._dbContext);
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
        MTMDEMO.DemoApplication = DemoApplication;
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
        RIAPP.global.addOnLoad(function (sender, a) {
            var global = sender;
            //initialize images folder path
            global.defaults.imagesPath = MTMDEMO.mainOptions.images_path;
            //create and then start application
            var thisApp = new DemoApplication(MTMDEMO.mainOptions);
            thisApp.startUp(function (app) { });
        });
        function initModule(app) {
            return MTMDEMO;
        }
        ;
        //properties must be initialized on HTML page
        MTMDEMO.mainOptions = {
            service_url: null,
            permissionInfo: null,
            images_path: null,
            user_modules: [{ name: "COMMON", initFn: RIAPP.COMMON.initModule },
                { name: "AUTOCOMPLETE", initFn: RIAPP.AUTOCOMPLETE.initModule },
                { name: "MTMDEMO", initFn: initModule }]
        };
    })(MTMDEMO = RIAPP.MTMDEMO || (RIAPP.MTMDEMO = {}));
})(RIAPP || (RIAPP = {}));
//# sourceMappingURL=manToManDemo.js.map