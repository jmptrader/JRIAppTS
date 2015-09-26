/// <reference path="..\..\jriappTS\jriapp.d.ts"/>
namespace RIAPP.AUTOCOMPLETE {
    'use strict';
    import constsMOD = RIAPP.consts;
    var global = RIAPP.global, utils = global.utils;

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

    export interface IAutocompleteOptions {
        dbContext: string;
        templateId: string;
        fieldName: string;
        dbSetName: string;
        queryName: string;
        minTextLength: number;
        width?: any;
        height?: any;
    }

    export class AutoCompleteElView extends MOD.baseElView.InputElView {
        _templateId: string;
        _fieldName: string;
        _dbSetName: string;
        _queryName: string;
        _template: MOD.template.Template;
        _gridDataSource: MOD.collection.BaseCollection<MOD.collection.ICollectionItem>;
        _prevText: string;
        _selectedItem: MOD.collection.ICollectionItem;
        _$dropDown: JQuery;
        _loadTimeout: any;
        _dataContext: any;
        _isLoading: boolean;
        _width: any;
        _height: any;
        _$dlg: JQuery;
        _isOpen: boolean;
        _lookupGrid: MOD.datagrid.DataGrid;
        _btnOk: HTMLElement;
        _btnCancel: HTMLElement;
        _dbContextName: string;
        _minTextLength: number;

        protected _init(options: IAutocompleteOptions) {
            var self = this;
            //debugger;
            super._init(options);
            this._templateId = options.templateId;
            this._fieldName = options.fieldName;
            this._dbSetName = options.dbSetName;
            this._queryName = options.queryName;
            this._dbContextName = options.dbContext;
            this._minTextLength = (!!options.minTextLength) ? options.minTextLength : 1;
            this._template = null;
            this._gridDataSource = null;
            this._prevText = null;
            this._selectedItem = null;
            this._template = null;
            this._$dropDown = null;
            this._loadTimeout = null;
            this._dataContext = null;
            this._isLoading = false;
            this._width = options.width || '200px';
            this._height = options.height || '300px';
            this._$dlg = null;
            var $el = this.$el;


            $el.on('change.' + this._objId, function (e) {
                e.stopPropagation();
                self._onTextChange();
                self.raisePropertyChanged('value');
            });
            $el.on('keyup.' + this._objId, function (e) {
                e.stopPropagation();
                self._onKeyUp((<any>e.target).value);
            });
            $el.on('keypress.' + this._objId, function (e) {
                e.stopPropagation();
                self._onKeyPress(e.which);
            });

            this._isOpen = false;
            this._createGridDataSource();
            this._template = this._createTemplate();
            this._$dropDown = global.$(global.document.createElement("div"));
            this._$dropDown.css({
                "position": "absolute",
                "z-index": "10000",
                "visibility": "hidden",
                "background-color": "White",
                "border": "1px solid gray",
                "width": this._width,
                "height": this._height
            });
            this._$dropDown.append(this._template.el);
            this._template.el.style.height = '100%';
            this._template.el.style.width = '100%';
            this._lookupGrid = null;
            var gridElView = <MOD.datagrid.GridElView>this._findElemViewInTemplate('lookupGrid');
            if (!!gridElView) {
                this._lookupGrid = gridElView.grid;
            }
            this._btnOk = this._findElemInTemplate('btnOk');
            this._btnCancel = this._findElemInTemplate('btnCancel');
            global.$(this._btnOk).click(function () {
                self._updateSelection();
                self._hide();
            });
            global.$(this._btnCancel).click(function () {
                self._hide();
            });
            global.document.body.appendChild(this._$dropDown.get(0));
        }
        _findElemViewInTemplate(name: string) {
            //look by data-name attribute value
            var arr = this._template.findElViewsByDataName(name);
            if (!!arr && arr.length > 0)
                return arr[0];
            else
                return null;
        }
        _findElemInTemplate(name: string) {
            var arr = this._template.findElByDataName(name);
            if (!!arr && arr.length > 0)
                return arr[0];
            else
                return null;
        }
        _createGridDataSource() {
            this._gridDataSource = this._getDbContext().getDbSet(this._dbSetName);
            if (!this._gridDataSource) {
                throw new Error(utils.format('dbContext does not contain dbSet with the name: {0}', this._dbSetName))
            }
        }
        _getDbContext() {
            var dbContext: MOD.db.DbContext = this.app.getObject(this._dbContextName);
            if (!dbContext) {
                throw new Error(utils.format('dbContext with the name: {0} is not registered', this._dbContextName))
            }
            return dbContext;
        }
        _getEventNames() {
            var base_events = super._getEventNames();
            return ['hide', 'show'].concat(base_events);
        }
        _createTemplate() {
            var t = new MOD.template.Template({ app: this.app, templateID: this._templateId, dataContext: this });
            return t;
        }
        _onTextChange() {
        }
        _onKeyUp(text: string) {
            var self = this;
            clearTimeout(this._loadTimeout);
            if (!!text && text.length >= self._minTextLength) {
                this._loadTimeout = setTimeout(function () {
                    if (self._isDestroyCalled)
                        return;

                    if (self._prevText != text) {
                        self._prevText = text;
                        if (!self._isOpen)
                            self._open();
                        self.load(text);
                    }
                }, 500);
            }
            else
                self.gridDataSource.clear();
        }
        _onKeyPress(keyCode: number) {
            if (keyCode === constsMOD.KEYS.esc) {
                this._hide();
                return;
            }
            if (keyCode === constsMOD.KEYS.enter) {
                this._updateSelection();
                this._hide();
                return;
            }
        }
        _updateSelection() {
            this.value = this.currentSelection;
        }
        _updatePosition() {
            (<any>this._$dropDown).position(<any>{
                my: "left top",
                at: "left bottom",
                of: global.$(this.el),
                offset: "0 0"
            });
        }
        _onShow() {
            this.raiseEvent('show', {});
        }
        _onHide() {
            this.raiseEvent('hide', {});
        }
        _open() {
            if (this._isOpen)
                return;
            var self = this;

            this._$dlg = this.$el.closest(".ui-dialog");
            var ns = "dialogdrag." + this._objId;
            this._$dlg.on(ns, null, (event) => {
                if (!self._isOpen)
                    return null;
                self._updatePosition();
                return null;
            });

            this._updatePosition();
            this._$dropDown.css({ visibility: "visible", display: "none" });
            this._$dropDown.slideDown('medium');

            if (!!this._lookupGrid) {
                this._lookupGrid.addHandler('cell_dblclicked', function (s, a) {
                    self._updateSelection();
                    self._hide();
                }, this._objId);

                global.$(global.document).on('keyup.' + this._objId, function (e) {
                    e.stopPropagation();
                    if (global.currentSelectable === self._lookupGrid)
                        self._onKeyPress(e.which);
                });
            }
            this._isOpen = true;
            this._onShow();
        }
        _hide() {
            var self = this;
            if (!this._isOpen)
                return;
            global.$(global.document).off('.' + this._objId);
            this._$dlg.off('.' + this._objId);

            if (!!this._lookupGrid) {
                this._lookupGrid.removeNSHandlers(this._objId);
            }

            this._$dropDown.slideUp('medium', function () {
                if (self._isDestroyCalled)
                    return;
                self._$dropDown.css({ visibility: "hidden", display: "" });
            });
            this._isOpen = false;
            this._onHide();
        }
        load(str: string) {
            var self = this, query = (<MOD.db.TDbSet>this.gridDataSource).createQuery(this._queryName);
            query.pageSize = 50;
            query.isClearPrevData = true;
            addTextQuery(query, this._fieldName, str + '%');
            query.orderBy(this._fieldName);
            this._isLoading = true;
            this.raisePropertyChanged('isLoading');
            query.load().always(function (res) {
                self._isLoading = false;
                self.raisePropertyChanged('isLoading');
            });
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            this._hide();
            this.$el.off('.' + this._objId);
            if (!!this._lookupGrid) {
                this._lookupGrid = null;
            }
            if (!!this._template) {
                this._template.destroy();
                this._template = null;
                this._$dropDown = null;
            }
            this._gridDataSource = null;
            this._dataContext = null;
            super.destroy();
        }
        //field name for lookup in dbSet
        get fieldName() { return this._fieldName; }
        get templateId() { return this._templateId; }
        get currentSelection() {
            if (this._gridDataSource.currentItem)
                return this._gridDataSource.currentItem[this._fieldName];
            else
                return null;
        }
        //template instance of drop down area (which contains datagrid) under textbox
        get template() { return this._template; }
        //Entity which is databound to the textbox
        get dataContext() { return this._dataContext; }
        set dataContext(v) {
            if (this._dataContext !== v) {
                this._dataContext = v;
                this.raisePropertyChanged('dataContext');
            }
        }
        //dbSet for a datagrid's dataSource (for lookup values)
        get gridDataSource() { return this._gridDataSource; }
        get value() {
            var el = this.el;
            if (!el)
                return '';
            return el.value;
        }
        set value(v) {
            if (!this._el)
                return;
            var el = this.el;
            var x = el.value;
            var str = '' + v;
            v = (v === null) ? '' : str;
            if (x !== v) {
                el.value = v;
                this._prevText = v;
                this.raisePropertyChanged('value');
            }
        }
        get isLoading() {
            return this._isLoading;
        }
    }

    //this function is executed when an application which uses this namespace is created
    export function initModule(app: Application) {
        app.registerElView('autocomplete', AutoCompleteElView);
        return AUTOCOMPLETE;
    };
}
