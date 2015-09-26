namespace RIAPP.MOD.datagrid {
    import constsMOD = RIAPP.consts;
    import utilsMOD = RIAPP.MOD.utils;
    import bindMOD = RIAPP.MOD.binding;
    import elviewMOD = RIAPP.MOD.baseElView;
    import contentMOD = RIAPP.MOD.baseContent;
    import collMOD = RIAPP.MOD.collection;
    import templMOD = RIAPP.MOD.template;

    var COLUMN_TYPE = { DATA: 'data', ROW_EXPANDER: 'row_expander', ROW_ACTIONS: 'row_actions', ROW_SELECTOR: 'row_selector' };
    var utils: utilsMOD.Utils, global = RIAPP.global;
    global.addOnInitialize((s, args) => {
        utils = s.utils;
    });

    export var css = {
        container: 'ria-table-container',
        dataTable: 'ria-data-table',
        columnInfo: 'ria-col-info',
        column: 'ria-ex-column',
        cellDiv: 'cell-div',
        headerDiv: 'ria-table-header',
        wrapDiv: 'ria-table-wrap',
        dataColumn: 'data-column',
        rowCollapsed: 'row-collapsed',
        rowExpanded: 'row-expanded',
        rowExpander: 'row-expander',
        columnSelected: 'selected',
        rowSelected: 'selected',
        rowActions: 'row-actions',
        rowDetails: 'row-details',
        rowSelector: 'row-selector',
        rowHighlight: 'row-highlight',
        rowDeleted: 'row-deleted',
        rowError: 'row-error',
        nobr: 'ria-nobr',
        colSortable: 'sortable',
        colSortAsc: 'sort-asc',
        colSortDesc: 'sort-desc'
    };
    var PROP_NAME = {
        isCurrent: 'isCurrent',
        isSelected: 'isSelected',
        sortOrder: 'sortOrder',
        checked: 'checked',
        editingRow: 'editingRow',
        dataSource: 'dataSource',
        currentRow: 'currentRow',
        grid: 'grid',
        animation: 'animation',
        stateProvider: 'stateProvider'
    };
    export const enum ROW_ACTION { OK, EDIT, CANCEL, DELETE }

    var _columnWidthInterval: any, _gridsCount: number = 0;
    var _created_grids: { [id: string]: DataGrid; } = {};
    function _gridCreated(grid: DataGrid) {
        _created_grids[grid.uniqueID] = grid;
        _gridsCount += 1;
        if (_gridsCount == 1) {
            _columnWidthInterval = setInterval(_checkGridWidth, 250);
        }
    }
    function _gridDestroyed(grid: DataGrid) {
        delete _created_grids[grid.uniqueID];
        _gridsCount -= 1;
        if (_gridsCount == 0) {
            clearInterval(_columnWidthInterval);
        }
    }
    function _checkGridWidth() {
        utils.forEachProp(_created_grids, (id) => {
            var grid = _created_grids[id];
            if (grid.getIsDestroyCalled())
                return;
            grid._columnWidthChecker();
        });
    }

    export class RowSelectContent extends contentMOD.BoolContent {
        getIsCanBeEdited() {
            return true;
        }
        toString() {
            return 'RowSelectContent';
        }
    }

    export interface ICellOptions { row: Row; td: HTMLTableCellElement; column: BaseColumn; num: number; }

    export class BaseCell extends RIAPP.BaseObject {
        protected _row: Row;
        protected _el: HTMLTableCellElement;
        protected _column: BaseColumn;
        protected _div: HTMLElement;
        protected _clickTimeOut: number;
        private _num: number;

        constructor(options: ICellOptions) {
            super();
            options = utils.extend(false,
                {
                    row: null,
                    td: null,
                    column: null
                }, options);
            this._row = options.row;
            this._el = options.td;
            this._column = options.column;
            this._num = options.num;
            this._div = global.document.createElement("div");
            var $div = global.$(this._div);
            this._clickTimeOut = null;
            $div.addClass(css.cellDiv).attr(constsMOD.DATA_ATTR.DATA_EVENT_SCOPE, this._column.uniqueID);
            $div.data('cell', this);
            if (this._column.options.width) {
                this._el.style.width = this._column.options.width;
            }
            this._init();
            if (this.column.options.rowCellCss) {
                $div.addClass(this.column.options.rowCellCss);
            }
            this._el.appendChild(this._div);
            this._row.el.appendChild(this._el);
        }
        protected _init() {
        }
        protected _onCellClicked(row?: Row) {
        }
        protected _onDblClicked(row?: Row) {
            this.grid._getInternal().onCellDblClicked(this);
        }
        handleError(error: any, source: any) {
            var isHandled = super.handleError(error, source);
            if (!isHandled) {
                return this.row.handleError(error, source);
            }
            return isHandled;
        }
        click() {
            this.grid.currentRow = this._row;
            this._onCellClicked(this._row);
        }
        scrollIntoView(isUp: boolean) {
            var div = this._div;
            div.scrollIntoView(!!isUp);
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            if (!!this._clickTimeOut) {
                clearTimeout(this._clickTimeOut);
                this._clickTimeOut = null;
            }
            var $div = global.$(this._div);
            $div.removeData();
            $div.remove();
            this._div = null;
            this._row = null;
            this._el = null;
            this._column = null;
            super.destroy();
        }
        toString() {
            return 'BaseCell';
        }
        get el() { return this._el; }
        get row() { return this._row; }
        get column() { return this._column; }
        get grid() { return this._row.grid; }
        get item() { return this._row.item; }
        get uniqueID() { return this._row.uniqueID + '_' + this._num; }
        get num() { return this._num; }
    }

    export class DataCell extends BaseCell {
        private _content: contentMOD.IContent;
        private _stateCss: string;

        constructor(options: ICellOptions) {
            this._content = null;
            this._stateCss = null;
            super(options);
        }
        protected _init() {
            var options = this.column.options.content;
            if (!options.fieldInfo && !!options.fieldName) {
                options.fieldInfo = this.item._aspect.getFieldInfo(options.fieldName);
                if (!options.fieldInfo) {
                    throw new Error(utils.format(RIAPP.ERRS.ERR_DBSET_INVALID_FIELDNAME, '', options.fieldName));
                }
            }
            var self = this, app = this.grid.app;
            options.initContentFn = null;
            try {
                var contentType = app._getInternal().getContentType(options);
                if (app.contentFactory.isExternallyCachable(contentType)) {
                    options.initContentFn = this.column._getInitContentFn();
                }
                this._content = new contentType(app, { parentEl: this._div, contentOptions: options, dataContext: this.item, isEditing: this.item._aspect.isEditing });
            }
            finally {
                delete options.initContentFn;
            }
        }
        /*override*/
        click() {
            var self = this, row = this._row;
            this.grid.currentRow = row;

            if (!!this._clickTimeOut) {
                clearTimeout(this._clickTimeOut);
                this._clickTimeOut = null;
                this._onDblClicked(row);
            }
            else {
                this._clickTimeOut = setTimeout(function () {
                    self._clickTimeOut = null;
                    self._onCellClicked(row);
                }, 350);
            }
        }
        _beginEdit() {
            if (!this._content.isEditing) {
                this._content.isEditing = true;
            }
        }
        _endEdit(isCanceled: boolean) {
            if (this._content.isEditing) {
                this._content.isEditing = false;
            }
        }
        _setState(css: string): void {
            var $div: any;
            if (this._stateCss !== css) {
                $div = global.$(this._div);
                if (!!this._stateCss)
                    $div.removeClass(this._stateCss);
                this._stateCss = css;
                if (!!this._stateCss)
                    $div.addClass(this._stateCss);
            }
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            if (!!this._content) {
                this._content.destroy();
                this._content = null;
            }
            super.destroy();
        }
        toString() {
            return 'DataCell';
        }
        get column() { return <DataColumn>this._column; }
    }

    export class ExpanderCell extends BaseCell {
        protected _init() {
            var $el = global.$(this.el);
            $el.addClass(css.rowCollapsed);
            $el.addClass(css.rowExpander);
        }
        protected _onCellClicked(row?: Row) {
            var clicked_row: Row = row || this._row;
            if (!clicked_row)
                return;
            super._onCellClicked(clicked_row);
            clicked_row.isExpanded = !clicked_row.isExpanded;
        }
        toggleImage() {
            var $el = global.$(this.el);
            if (this._row.isExpanded) {
                $el.removeClass(css.rowCollapsed);
                $el.addClass(css.rowExpanded);
            }
            else {
                $el.removeClass(css.rowExpanded);
                $el.addClass(css.rowCollapsed);
            }
        }
        toString() {
            return 'ExpanderCell';
        }
    }

    export class ActionsCell extends BaseCell {
        private _isEditing: boolean;
        constructor(options: ICellOptions) {
            this._isEditing = false;
            super(options);
        }
        protected _init() {
            var $el = global.$(this.el), $div = global.$(this._div);
            $el.addClass([css.rowActions, css.cellDiv, css.nobr].join(' '));
            $div.on("mouseenter", "img", function (e) {
                e.stopPropagation();
                $(this).css("opacity", 0.5);
            });
            $div.on("mouseout", "img", function (e) {
                e.stopPropagation();
                $(this).css("opacity", 1.0);
            });
            this._createButtons(false);
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            var $div = global.$(this._div), $imgs = $div.find('img');
            $div.off();
            $imgs.each(function (index, img) {
                var $img = global.$(img);
                $img.removeData();
            });
            super.destroy();
        }
        protected _createButtons(editing: boolean) {
            if (!this._el)
                return;
            var self = this, $ = global.$, $div = $(this._div), $newElems: JQuery;
            var txtMap: IIndexer<string> = {
                img_ok: 'txtOk',
                img_cancel: 'txtCancel',
                img_edit: 'txtEdit',
                img_delete: 'txtDelete'
            };

            $div.empty();
            var opts = self._column.options,
                fn_setUpImages = function ($images: any) {
                    $images.each(function (index: number, img: HTMLImageElement) {
                        var $img = $(img);
                        img.style.cursor = 'pointer';
                        img.src = (<any>opts)[img.name];
                        $img.data('cell', self);
                        elviewMOD.fn_addToolTip($img, localizable.TEXT[txtMap[img.name]]);
                        $img.attr(constsMOD.DATA_ATTR.DATA_EVENT_SCOPE, self._column.uniqueID);
                    });
                };

            if (editing) {
                this._isEditing = true;
                $newElems = $('<img name="img_ok" alt="ok"/>&nbsp;<img name="img_cancel" alt="cancel"/>');
                fn_setUpImages($newElems.filter('img'));
            }
            else {
                this._isEditing = false;
                $newElems = $('<img name="img_edit" alt="edit"/>&nbsp;<img name="img_delete" alt="delete"/>');
                if (!self.isCanEdit) {
                    $newElems = $newElems.not('img[name="img_edit"]');
                }
                if (!self.isCanDelete) {
                    $newElems = $newElems.not('img[name="img_delete"]');
                }
                fn_setUpImages($newElems.filter('img'));
            }
            $div.append($newElems);
        }
        update() {
            if (!this._row)
                return;
            if (this._isEditing != this._row.isEditing) {
                this._createButtons(this._row.isEditing);
            }
        }
        toString() {
            return 'ActionsCell';
        }
        get isCanEdit() { return this.grid.isCanEdit; }
        get isCanDelete() { return this.grid.isCanDelete; }
    }

    export class RowSelectorCell extends BaseCell {
        private _content: contentMOD.IContent;
        protected _init() {
            var $el = global.$(this.el);
            $el.addClass(css.rowSelector);
            var bindInfo: bindMOD.IBindingInfo = {
                target: null, source: null,
                targetPath: null, sourcePath: PROP_NAME.isSelected,
                mode: "TwoWay",
                converter: null, converterParam: null
            }, contentOpts: contentMOD.IContentOptions = {
                fieldName: PROP_NAME.isSelected,
                bindingInfo: bindInfo,
                displayInfo: null
            };
            this._content = new RowSelectContent(this.grid.app, {
                parentEl: this._div,
                contentOptions: contentOpts,
                dataContext: this.row,
                isEditing: true
            });
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            if (!!this._content) {
                this._content.destroy();
                this._content = null;
            }
            super.destroy();
        }
        toString() {
            return 'RowSelectorCell';
        }
    }

    export class DetailsCell extends BaseObject implements templMOD.ITemplateEvents {
        private _row: DetailsRow;
        private _el: HTMLTableCellElement;
        private _template: template.Template;
        constructor(options: { row: DetailsRow; td: HTMLTableCellElement; details_id: string; }) {
            super();
            this._row = options.row;
            this._el = options.td;
            this._init(options);
        }
        protected _init(options: { td: HTMLElement; details_id: string; }) {
            var details_id = options.details_id;
            if (!details_id)
                return;
            this._el.colSpan = this.grid.columns.length;
            this._row.el.appendChild(this._el);
            this._template = new templMOD.Template({
                app: this.grid.app,
                templateID: details_id,
                templEvents: this
            });
            this._el.appendChild(this._template.el);
        }
        templateLoading(template: templMOD.Template): void {
            //noop
        }
        templateLoaded(template: templMOD.Template): void {
            //noop
        }
        templateUnLoading(template: templMOD.Template): void {
            this._el.removeChild(template.el);
            this._template = null;
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            if (!!this._template) {
                this._template.destroy();
                this._template = null;
            }
            this._row = null;
            this._el = null;
            super.destroy();
        }
        toString() {
            return 'DetailsCell';
        }
        get el() { return this._el; }
        get row() { return this._row; }
        get grid() { return this._row.grid; }
        get item(): collMOD.ICollectionItem { return this._template.dataContext; }
        set item(v: collMOD.ICollectionItem) { this._template.dataContext = v; }
        get template() { return this._template; }
    }

    export class Row extends RIAPP.BaseObject {
        private _grid: DataGrid;
        private _el: HTMLElement;
        private _item: collMOD.ICollectionItem;
        private _cells: BaseCell[];
        private _objId: string;
        private _expanderCell: ExpanderCell;
        private _actionsCell: ActionsCell;
        private _rowSelectorCell: RowSelectorCell;
        private _isCurrent: boolean;
        private _isDeleted: boolean;
        private _isSelected: boolean;

        constructor(grid: DataGrid, options: { tr: HTMLElement; item: collMOD.ICollectionItem; }) {
            var self = this;
            super();
            this._grid = grid;
            this._el = options.tr;
            this._item = options.item;
            this._cells = null;
            this._objId = 'r' + baseUtils.getNewID();
            this._expanderCell = null;
            this._actionsCell = null;
            this._rowSelectorCell = null;
            this._isCurrent = false;
            this._isDeleted = false;
            this._isSelected = false;
            this._createCells();
            this._isDeleted = this._item._aspect.isDeleted;
            var fn_state = () => {
                var css = self._grid._getInternal().onRowStateChanged(self, (<any>self._item)[self._grid.options.rowStateField]);
                self._setState(css);
            };
            if (!!this.isHasStateField) {
                this._item.addOnPropertyChange(this._grid.options.rowStateField, function (s, a) {
                    fn_state();
                }, this._objId);
                fn_state();
            }
        }
        handleError(error: any, source: any): boolean {
            var isHandled = super.handleError(error, source);
            if (!isHandled) {
                return this.grid.handleError(error, source);
            }
            return isHandled;
        }
        private _createCells() {
            var self = this, i = 0;
            self._cells = new Array(this.columns.length);
            this.columns.forEach(function (col) {
                self._cells[i] = self._createCell(col, i);
                i += 1;
            });
        }
        private _createCell(col: BaseColumn, num: number) {
            var self = this, td: HTMLTableCellElement = <HTMLTableCellElement>global.document.createElement('td'), cell: BaseCell;
            if (col instanceof ExpanderColumn) {
                this._expanderCell = new ExpanderCell({ row: self, td: td, column: col, num: num });
                cell = this._expanderCell;
            }
            else if (col instanceof ActionsColumn) {
                this._actionsCell = new ActionsCell({ row: self, td: td, column: col, num: num });
                cell = this._actionsCell;
            }
            else if (col instanceof RowSelectorColumn) {
                this._rowSelectorCell = new RowSelectorCell({ row: self, td: td, column: col, num: num });
                cell = this._rowSelectorCell;
            }
            else
                cell = new DataCell({ row: self, td: td, column: col, num: num });
            return cell;
        }
        protected _setState(css: string) {
            for (var i = 0, len = this._cells.length; i < len; i++) {
                var cell = this._cells[i];
                if (cell instanceof DataCell) {
                    (<DataCell>cell)._setState(css);
                }
            }
        }
        _onBeginEdit() {
            var self = this;
            self._cells.forEach(function (cell) {
                if (cell instanceof DataCell) {
                    (<DataCell>cell)._beginEdit();
                }
            });
            if (!!this._actionsCell)
                this._actionsCell.update();
        }
        _onEndEdit(isCanceled: boolean) {
            var self = this;
            self._cells.forEach(function (cell) {
                if (cell instanceof DataCell) {
                    (<DataCell>cell)._endEdit(isCanceled);
                }
            });
            if (!!this._actionsCell)
                this._actionsCell.update();
        }
        beginEdit() {
            return this._item._aspect.beginEdit();
        }
        endEdit() {
            return this._item._aspect.endEdit();
        }
        cancelEdit() {
            return this._item._aspect.cancelEdit();
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            var grid = this._grid;
            if (!!grid) {
                if (this.isExpanded)
                    grid.collapseDetails();
                this._cells.forEach(function (cell) {
                    cell.destroy();
                });
                this._cells = null;
                if (!grid._getInternal().getIsClearing()) {
                    grid._getInternal().removeRow(this);
                    if (!!this._el) {
                        global.$(this._el).remove();
                    }
                }
            }
            if (!!this._item)
                this._item.removeNSHandlers(this._objId);
            this._item = null;
            this._expanderCell = null;
            this._el = null;
            this._grid = null;
            super.destroy();
        }
        deleteRow() {
            this._item._aspect.deleteItem();
        }
        updateErrorState() {
            //TODO: add implementation to show explanation of error
            var hasErrors = this._item._aspect.getIsHasErrors();
            var $el = global.$(this._el);
            if (hasErrors) {
                $el.addClass(css.rowError);
            }
            else
                $el.removeClass(css.rowError);
        }
        scrollIntoView(isUp: boolean) {
            if (!!this._cells && this._cells.length > 0) {
                this._cells[0].scrollIntoView(isUp);
            }
        }
        toString() {
            return 'Row';
        }
        get el() { return this._el; }
        get grid() { return this._grid; }
        get item() { return this._item; }
        get cells() { return this._cells; }
        get columns() { return this._grid.columns; }
        get uniqueID() { return this._objId; }
        get itemKey() {
            if (!this._item)
                return null;
            return this._item._key;
        }
        get isCurrent() { return this._isCurrent; }
        set isCurrent(v) {
            var curr = this._isCurrent;
            if (v !== curr) {
                var $el = global.$(this._el);
                this._isCurrent = v;
                if (v) {
                    $el.addClass(css.rowHighlight);
                }
                else {
                    $el.removeClass(css.rowHighlight);
                }
                this.raisePropertyChanged(PROP_NAME.isCurrent);
            }
        }
        get isSelected() { return this._isSelected; }
        set isSelected(v) {
            if (this._isSelected != v) {
                this._isSelected = v;
                this.raisePropertyChanged(PROP_NAME.isSelected);
                this.grid._getInternal().onRowSelectionChanged(this);
            }
        }
        get isExpanded() { return this.grid._getInternal().isRowExpanded(this); }
        set isExpanded(v) {
            if (v !== this.isExpanded) {
                if (!v && this.isExpanded) {
                    this.grid._getInternal().expandDetails(this, false);
                }
                else if (v) {
                    this.grid._getInternal().expandDetails(this, true);
                }
            }
        }
        get expanderCell() { return this._expanderCell; }
        get actionsCell() { return this._actionsCell; }
        get isDeleted() {
            if (!this._el)
                return true;
            return this._isDeleted;
        }
        set isDeleted(v) {
            if (!this._el)
                return;
            if (this._isDeleted !== v) {
                this._isDeleted = v;
                if (this._isDeleted) {
                    this.isExpanded = false;
                    global.$(this._el).addClass(css.rowDeleted);
                }
                else
                    global.$(this._el).removeClass(css.rowDeleted);
            }
        }
        get isEditing() { return !!this._item && this._item._aspect.isEditing; }
        get isHasStateField() { return !!this._grid.options.rowStateField; }
    }

    class DefaultAnimation extends RIAPP.BaseObject implements RIAPP.IAnimation {
        private _$el: JQuery;
        constructor() {
            super();
            this._$el = null;
        }
        beforeShow(el: HTMLElement): void {
            this.stop();
            this._$el = global.$(el);
            this._$el.hide();
        }
        show(onEnd: () => void): void {
            this._$el.slideDown('fast', onEnd);
        }
        beforeHide(el: HTMLElement): void {
            this.stop();
            this._$el = global.$(el);
        }
        hide(onEnd: () => void): void {
            this._$el.slideUp('fast', onEnd);
        }
        stop(): void {
            if (!!this._$el) {
                this._$el.finish();
                this._$el = null;
            }
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            try {
                this.stop();
            }
            finally {
                super.destroy();
            }
        }
    }

    export class DetailsRow extends RIAPP.BaseObject {
        private _grid: DataGrid;
        private _el: HTMLTableRowElement;
        private _item: collMOD.ICollectionItem;
        private _cell: DetailsCell;
        private _parentRow: Row;
        private _objId: string;
        private _$el: JQuery;
        private _isFirstShow: boolean;

        constructor(options: { grid: DataGrid; tr: HTMLTableRowElement; details_id: string; }) {
            super();
            var self = this;
            this._grid = options.grid;
            this._el = options.tr;
            this._item = null;
            this._cell = null;
            this._parentRow = null;
            this._isFirstShow = true;
            this._objId = 'drow' + baseUtils.getNewID();
            this._createCell(options.details_id);
            this._$el = global.$(this._el);
            this._$el.addClass(css.rowDetails);
            this._grid.addOnRowExpanded((sender, args) => {
                if (!args.isExpanded && !!args.collapsedRow)
                    self._setParentRow(null);
            }, this._objId, this);
        }
        private _createCell(details_id: string) {
            var td: HTMLTableCellElement = <HTMLTableCellElement>global.document.createElement('td');
            this._cell = new DetailsCell({ row: this, td: td, details_id: details_id });
        }
        protected _setParentRow(row: Row) {
            var self = this;
            this._item = null;
            this._cell.item = null;
            //don't use global.$(this._el).remove() here - or it will remove all jQuery plugins!
            utils.removeNode(this._el);
            if (!row || row.getIsDestroyCalled()) {
                this._parentRow = null;
                return;
            }
            this._parentRow = row;
            this._item = row.item;
            this._cell.item = this._item;
            if (this._isFirstShow)
                this._initShow();
            utils.insertAfter(row.el, this._el);
            //var isLast = this.grid._getLastRow() === this._parentRow;
            this._show(() => {
                var row = self._parentRow;
                if (!row || row.getIsDestroyCalled())
                    return;
                if (self.grid.options.isUseScrollIntoDetails)
                    row.scrollIntoView(true);
            });
        }
        private _initShow() {
            var animation = this._grid.animation;
            animation.beforeShow(this._cell.template.el);
        }
        private _show(onEnd: () => void) {
            var animation = this._grid.animation;
            this._isFirstShow = false;
            animation.beforeShow(this._cell.template.el);
            animation.show(onEnd);
        }
        private _hide(onEnd: () => void) {
            var animation = this._grid.animation;
            animation.beforeHide(this._cell.template.el);
            animation.hide(onEnd);
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            this._grid.removeNSHandlers(this._objId);
            if (!!this._cell) {
                this._cell.destroy();
                this._cell = null;
            }
            this._$el.remove();
            this._$el = null;
            this._item = null;
            this._el = null;
            this._grid = null;
            super.destroy();
        }
        toString() {
            return 'DetailsRow';
        }
        get el() { return this._el; }
        get $el() { return this._$el; }
        get grid() { return this._grid; }
        get item() { return this._item; }
        set item(v) {
            if (this._item !== v) {
                this._item = v;
            }
        }
        get cell() { return this._cell; }
        get uniqueID() { return this._objId; }
        get itemKey() {
            if (!this._item)
                return null;
            return this._item._key;
        }
        get parentRow() { return this._parentRow; }
        set parentRow(v) {
            var self = this;
            if (v !== this._parentRow) {
                if (!!self._parentRow) {
                    self._hide(() => {
                        self._setParentRow(v);
                    });
                }
                else {
                    self._setParentRow(v);
                }
            }
        }
    }

    export interface IColumnInfo {
        "type"?: string;
        title?: string;
        sortable?: boolean;
        sortMemberName?: string;
        colCellCss?: string;
        rowCellCss?: string;
        width?: any;
        content?: contentMOD.IContentOptions;
        tip?: string;
    }

    export class BaseColumn extends RIAPP.BaseObject {
        private _grid: DataGrid;
        private _el: HTMLTableHeaderCellElement;
        private _options: IColumnInfo;
        private _isSelected: boolean;
        private _objId: string;
        private _$extcol: JQuery;
        private _$div: JQuery;

        constructor(grid: DataGrid, options: { th: HTMLTableHeaderCellElement; colinfo: IColumnInfo; }) {
            super();
            var self = this;
            this._grid = grid;
            this._el = options.th;
            this._options = options.colinfo;
            this._isSelected = false;
            this._objId = 'col' + baseUtils.getNewID();

            var extcolDiv = global.document.createElement('div');
            this._$extcol = global.$(extcolDiv);
            this._$extcol.addClass(css.column);
            this._grid._getInternal().appendToHeader(extcolDiv);

            var div = global.document.createElement('div');
            this._$div = global.$(div);
            this._$div.addClass(css.cellDiv).click(function (e) {
                e.stopPropagation();
                global.currentSelectable = grid;
                grid._getInternal().setCurrentColumn(self);
                self._onColumnClicked();
            });

            extcolDiv.appendChild(div);


            this.grid._getInternal().get$El().on('click', ['div[', constsMOD.DATA_ATTR.DATA_EVENT_SCOPE, '="', this.uniqueID, '"]'].join(''),
                function (e) {
                    e.stopPropagation();
                    var $div = global.$(this), cell: BaseCell = <any>$div.data('cell');
                    if (!!cell) {
                        global.currentSelectable = grid;
                        grid._getInternal().setCurrentColumn(self);
                        cell.click();
                    }
                });

            if (!!this._options.width) {
                this._el.style.width = this._options.width;
            }
            this._init();

            if (!!this._options.colCellCss) {
                this._$div.addClass(this._options.colCellCss);
            }
        }
        protected _init() {
            if (!!this.title)
                this._$div.html(this.title);
            if (!!this._options.tip) {
                elviewMOD.fn_addToolTip(this._$extcol, this._options.tip, false, 'bottom center');
            }
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            this._grid._getInternal().get$El().off('click', ['div[', constsMOD.DATA_ATTR.DATA_EVENT_SCOPE, '="', this.uniqueID, '"]'].join(''));
            if (!!this._options.tip) {
                elviewMOD.fn_addToolTip(this._$extcol, null);
            }
            this._$extcol.remove();
            this._$extcol = null;
            this._$div = null;
            this._el = null;
            this._grid = null;
            this._options = null;
            super.destroy();
        }
        scrollIntoView(isUp: boolean) {
            if (!this._$div)
                return;
            var div = this._$div.get(0);
            div.scrollIntoView(!!isUp);
        }
        protected _onColumnClicked() {
        }
        toString() {
            return 'BaseColumn';
        }
        get uniqueID() { return this._objId; }
        get el() { return this._el; }
        get $div() { return this._$div; }
        get $extcol() { return this._$extcol; }
        get grid() { return this._grid; }
        get options() { return this._options; }
        get title() { return this._options.title; }
        get isSelected() { return this._isSelected; }
        set isSelected(v) {
            if (this._isSelected !== v) {
                this._isSelected = v;
                if (this._isSelected) {
                    this._$div.addClass(css.columnSelected);
                }
                else
                    this._$div.removeClass(css.columnSelected);
            }
        }
    }

    export class DataColumn extends BaseColumn {
        private _sortOrder: collMOD.SORT_ORDER;
        private _objCache: IIndexer<BaseObject>;

        constructor(grid: DataGrid, options: { th: HTMLTableHeaderCellElement; colinfo: IColumnInfo; }) {
            super(grid, options);
            //the DataCell caches here listbox (for the LookupContent)
            //so not to create it for every cell
            this._objCache = {};
            this.$div.addClass(css.dataColumn);
        }
        protected _init() {
            super._init();
            this._sortOrder = null;
            if (this.isSortable) {
                this.$div.addClass(css.colSortable);
            }
        }
        protected _onColumnClicked() {
            if (this.isSortable && !!this.sortMemberName) {
                var sortOrd = this._sortOrder;
                this.grid._getInternal().resetColumnsSort();

                if (sortOrd == collMOD.SORT_ORDER.ASC) {
                    this.sortOrder = collMOD.SORT_ORDER.DESC;
                }
                else if (sortOrd == collMOD.SORT_ORDER.DESC) {
                    this.sortOrder = collMOD.SORT_ORDER.ASC;
                }
                else
                    this.sortOrder = collMOD.SORT_ORDER.ASC;
                this.grid.sortByColumn(this);
            }
        }
        protected _cacheObject(key: string, obj: BaseObject) {
            this._objCache[key] = obj;
        }
        protected _getCachedObject(key: string) {
            return this._objCache[key];
        }
        _getInitContentFn(): (content: contentMOD.IExternallyCachable) => void {
            var self = this;
            return function (content: contentMOD.IExternallyCachable) {
                content.addOnObjectCreated(function (sender, args) {
                    self._cacheObject(args.objectKey, args.object);
                    args.isCachedExternally = !!self._getCachedObject(args.objectKey);
                });
                content.addOnObjectNeeded(function (sender, args) {
                    args.object = self._getCachedObject(args.objectKey);
                });
            };
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            var self = this;
            utils.forEachProp(self._objCache, function (key) {
                self._objCache[key].destroy();
            });
            self._objCache = null;
            super.destroy();
        }
        toString() {
            return 'DataColumn';
        }
        get isSortable() { return !!(this.options.sortable); }
        get sortMemberName() { return this.options.sortMemberName; }
        get sortOrder() { return this._sortOrder; }
        set sortOrder(v) {
            this.$div.removeClass([css.colSortable, css.colSortAsc, css.colSortDesc].join(' '));
            switch (v) {
                case collMOD.SORT_ORDER.ASC:
                    this.$div.addClass(css.colSortAsc);
                    break;
                case collMOD.SORT_ORDER.DESC:
                    this.$div.addClass(css.colSortDesc);
                    break;
                default:
                    if (this.isSortable)
                        this.$div.addClass(css.colSortable);
            }
            this._sortOrder = v;
            this.raisePropertyChanged(PROP_NAME.sortOrder);
        }
    }

    export class ExpanderColumn extends BaseColumn {
        protected _init() {
            super._init();
            this.$div.addClass(css.rowExpander);
        }
        toString() {
            return 'ExpanderColumn';
        }
    }

    export class RowSelectorColumn extends BaseColumn {
        private _val: boolean;
        private _$chk: JQuery;
        protected _init() {
            super._init();
            var self = this;
            this._val = false;
            this.$div.addClass(css.rowSelector);
            var $chk = global.$('<input type="checkbox"/>');
            this.$div.append($chk);
            this._$chk = $chk;
            $chk.click(function (e) {
                e.stopPropagation();
                self._onCheckBoxClicked(this.checked);
            });
            $chk.on('change', function (e) {
                e.stopPropagation();
                self.checked = this.checked;
            });
        }
        protected _onCheckBoxClicked(isChecked: boolean) {
            this.grid.selectRows(isChecked);
        }
        toString() {
            return 'RowSelectorColumn';
        }
        get checked() { return this._val; }
        set checked(v) {
            var $el = this._$chk;
            if (v !== null)
                v = !!v;
            if (v !== this._val) {
                this._val = v;
                if (!!$el)
                    $el.prop('checked', !!this._val);
                this.raisePropertyChanged(PROP_NAME.checked);
            }
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            this._$chk.off();
            this._$chk.remove();
            this._$chk = null;
            super.destroy();
        }
    }

    export interface IActionsColumnInfo extends IColumnInfo {
        img_ok?: string;
        img_cancel?: string;
        img_edit?: string;
        img_delete?: string;
    }

    export class ActionsColumn extends BaseColumn {
        protected _init() {
            super._init();
            var self = this, opts: IActionsColumnInfo = this.options;
            this.$div.addClass(css.rowActions);
            opts.img_ok = global.getImagePath(opts.img_ok || 'ok.png');
            opts.img_cancel = global.getImagePath(opts.img_cancel || 'cancel.png');
            opts.img_edit = global.getImagePath(opts.img_edit || 'edit.png');
            opts.img_delete = global.getImagePath(opts.img_delete || 'delete.png');
            this.grid._getInternal().get$El().on("click", 'img[' + constsMOD.DATA_ATTR.DATA_EVENT_SCOPE + '="' + this.uniqueID + '"]',
                function (e) {
                    e.stopPropagation();
                    var $img = global.$(this), name = this.name, cell: ActionsCell = <any>$img.data('cell');
                    self.grid.currentRow = cell.row;
                    switch (name) {
                        case 'img_ok':
                            self._onOk(cell);
                            break;
                        case 'img_cancel':
                            self._onCancel(cell);
                            break;
                        case 'img_edit':
                            self._onEdit(cell);
                            break;
                        case 'img_delete':
                            self._onDelete(cell);
                            break;
                    }
                });
            this.grid.addOnRowAction((sender, args) => {
                switch (args.action) {
                    case ROW_ACTION.OK:
                        self._onOk(args.row.actionsCell);
                        break;
                    case ROW_ACTION.EDIT:
                        self._onEdit(args.row.actionsCell);
                        break;
                    case ROW_ACTION.CANCEL:
                        self._onCancel(args.row.actionsCell);
                        break;
                    case ROW_ACTION.DELETE:
                        self._onDelete(args.row.actionsCell);
                        break;
                }
            }, this.uniqueID);
        }
        protected _onOk(cell: ActionsCell) {
            if (!cell.row)
                return;
            cell.row.endEdit();
            cell.update();
        }
        protected _onCancel(cell: ActionsCell) {
            if (!cell.row)
                return;
            cell.row.cancelEdit();
            cell.update();
        }
        protected _onDelete(cell: ActionsCell) {
            if (!cell.row)
                return;
            cell.row.deleteRow();
        }
        protected _onEdit(cell: ActionsCell) {
            if (!cell.row)
                return;
            cell.row.beginEdit();
            cell.update();
            this.grid.showEditDialog();
        }
        toString() {
            return 'ActionsColumn';
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            this.grid._getInternal().get$El().off("click", 'img[' + constsMOD.DATA_ATTR.DATA_EVENT_SCOPE + '="' + this.uniqueID + '"]');
            this.grid.removeNSHandlers(this.uniqueID);
            super.destroy();
        }
    }

    export interface IGridOptions {
        isUseScrollInto: boolean;
        isUseScrollIntoDetails: boolean;
        containerCss: string;
        wrapCss: string;
        headerCss: string;
        rowStateField: string;
        isCanEdit: boolean;
        isCanDelete: boolean;
        isHandleAddNew: boolean;
        details?: { templateID: string; };
        editor?: datadialog.IDialogConstructorOptions;
    }

    export interface IGridConstructorOptions extends IGridOptions {
        app: Application;
        el: HTMLTableElement;
        dataSource: collMOD.BaseCollection<collMOD.ICollectionItem>;
        animation: RIAPP.IAnimation;
    }

    export interface IInternalGridMethods {
        isRowExpanded(row: Row): boolean;
        appendToHeader(el: HTMLElement): void;
        setCurrentColumn(column: BaseColumn): void;
        onRowStateChanged(row: Row, val: any): string;
        onCellDblClicked(cell: BaseCell): void;
        onRowSelectionChanged(row: Row): void;
        resetColumnsSort(): void;
        getLastRow(): Row;
        removeRow(row: Row): void;
        expandDetails(parentRow: Row, expanded: boolean): void;
        getIsClearing(): boolean;
        get$El(): JQuery;
    }

    var GRID_EVENTS = {
        row_expanded: 'row_expanded',
        row_selected: 'row_selected',
        page_changed: 'page_changed',
        row_state_changed: 'row_state_changed',
        cell_dblclicked: 'cell_dblclicked',
        row_action: 'row_action'
    };

    export class DataGrid extends RIAPP.BaseObject implements RIAPP.ISelectableProvider {
        private _options: IGridConstructorOptions;
        private _$el: JQuery;
        private _isClearing: boolean;
        private _el: HTMLTableElement;
        private _name: string;
        private _objId: string;
        private _rowMap: IIndexer<Row>;
        private _rows: Row[];
        private _columns: BaseColumn[];
        private _isDSFilling: boolean;
        private _currentRow: Row;
        private _expandedRow: Row;
        private _details: DetailsRow;
        private _expanderCol: ExpanderColumn;
        private _actionsCol: ActionsColumn;
        private _rowSelectorCol: RowSelectorColumn;
        private _currentColumn: BaseColumn;
        private _editingRow: Row;
        private _isSorting: boolean;
        private _dialog: datadialog.DataEditDialog;
        private _$headerDiv: JQuery;
        private _$wrapDiv: JQuery;
        private _contaner: HTMLElement;
        public _columnWidthChecker: () => void;
        private _internal: IInternalGridMethods;
        private _selectable: ISelectable;

        constructor(options: IGridConstructorOptions) {
            super();
            var self = this;
            options = utils.mergeObj(options,
                {
                    app: null,
                    el: null,
                    dataSource: null,
                    animation: null,
                    isUseScrollInto: true,
                    isUseScrollIntoDetails: true,
                    containerCss: null, //div that wraps all table and header
                    wrapCss: null, //div that wraps only table without header
                    headerCss: null, //div inside which are column cells
                    rowStateField: null,
                    isCanEdit: null,
                    isCanDelete: null,
                    isHandleAddNew: false
                });
            if (!!options.dataSource && !(options.dataSource instanceof collMOD.BaseCollection))
                throw new Error(RIAPP.ERRS.ERR_GRID_DATASRC_INVALID);
            this._options = options;
            this._columnWidthChecker = () => { };
            var $t = global.$(this._options.el);
            this._el = this._options.el;
            this._$el = $t;
            $t.addClass(css.dataTable);
            this._name = $t.attr(constsMOD.DATA_ATTR.DATA_NAME);
            this._objId = 'grd' + baseUtils.getNewID();
            this._rowMap = {};
            this._rows = [];
            this._columns = [];
            this._isClearing = false;
            this._isDSFilling = false;
            this._currentRow = null;
            this._expandedRow = null;
            this._details = null;
            this._expanderCol = null;
            this._actionsCol = null;
            this._rowSelectorCol = null;
            this._currentColumn = null;
            this._editingRow = null;
            this._isSorting = false;
            this._dialog = null;
            this._$headerDiv = null;
            this._$wrapDiv = null;
            this._contaner = null;
            this._wrapTable();
            this._selectable = {
                getContainerEl: () => {
                    return self._getContainerEl();
                },
                getUniqueID: () => {
                    return self.uniqueID;
                },
                onKeyDown: (key: number, event: Event) => {
                    self._onKeyDown(key, event);
                },
                onKeyUp: (key: number, event: Event) => {
                    self._onKeyUp(key, event);
                }
            };
            this._internal = {
                isRowExpanded: (row: Row) => {
                    return self._isRowExpanded(row);
                },
                appendToHeader: (el: HTMLElement) => {
                    self._appendToHeader(el);
                },
                setCurrentColumn: (column: BaseColumn) => {
                    self._setCurrentColumn(column);
                },
                onRowStateChanged: (row: Row, val: any) => {
                    return self._onRowStateChanged(row, val);
                },
                onCellDblClicked: (cell: BaseCell) => {
                    self._onCellDblClicked(cell);
                },
                onRowSelectionChanged: (row: Row) => {
                    self._onRowSelectionChanged(row);
                },
                resetColumnsSort: () => {
                    self._resetColumnsSort();
                },
                getLastRow: () => {
                    return self._getLastRow();
                },
                removeRow: (row: Row) => {
                    self._removeRow(row);
                },
                expandDetails: (parentRow: Row, expanded: boolean) => {
                    self._expandDetails(parentRow, expanded);
                },
                getIsClearing: () => {
                    return self._getIsClearing();
                },
                get$El: () => {
                    return self._get$El();
                }
            };
            this._createColumns();
            this._bindDS();
            global._getInternal().trackSelectable(this);
            _gridCreated(this);
        }
        protected _getEventNames() {
            var base_events = super._getEventNames();
            var events = Object.keys(GRID_EVENTS).map((key, i, arr) => { return <string>(<any>GRID_EVENTS)[key]; });
            return events.concat(base_events);
        }
        addOnRowExpanded(fn: TEventHandler<DataGrid, { collapsedRow: Row; expandedRow: Row; isExpanded: boolean; }>, nmspace?: string, context?: any) {
            this._addHandler(GRID_EVENTS.row_expanded, fn, nmspace, context);
        }
        removeOnRowExpanded(nmspace?: string) {
            this._removeHandler(GRID_EVENTS.row_expanded, nmspace);
        }
        addOnRowSelected(fn: TEventHandler<DataGrid, { row: Row; }>, nmspace?: string, context?: any) {
            this._addHandler(GRID_EVENTS.row_selected, fn, nmspace, context);
        }
        removeOnRowSelected(nmspace?: string) {
            this._removeHandler(GRID_EVENTS.row_selected, nmspace);
        }
        addOnPageChanged(fn: TEventHandler<DataGrid, any>, nmspace?: string, context?: any) {
            this._addHandler(GRID_EVENTS.page_changed, fn, nmspace, context);
        }
        removeOnPageChanged(nmspace?: string) {
            this._removeHandler(GRID_EVENTS.page_changed, nmspace);
        }
        addOnRowStateChanged(fn: TEventHandler<DataGrid, { row: Row; val: any; css: string; }>, nmspace?: string, context?: any) {
            this._addHandler(GRID_EVENTS.row_state_changed, fn, nmspace, context);
        }
        removeOnRowStateChanged(nmspace?: string) {
            this._removeHandler(GRID_EVENTS.row_state_changed, nmspace);
        }
        addOnCellDblClicked(fn: TEventHandler<DataGrid, { cell: BaseCell; }>, nmspace?: string, context?: any) {
            this._addHandler(GRID_EVENTS.cell_dblclicked, fn, nmspace, context);
        }
        removeOnCellDblClicked(nmspace?: string) {
            this._removeHandler(GRID_EVENTS.cell_dblclicked, nmspace);
        }
        addOnRowAction(fn: TEventHandler<DataGrid, { row: Row; action: ROW_ACTION; }>, nmspace?: string, context?: any) {
            this._addHandler(GRID_EVENTS.row_action, fn, nmspace, context);
        }
        removeOnRowAction(nmspace?: string) {
            this._removeHandler(GRID_EVENTS.row_action, nmspace);
        }
        protected _getContainerEl(): HTMLElement {
            return this._contaner;
        }
        protected _onKeyDown(key: number, event: Event): void {
            var ds = this.dataSource, self = this;
            if (!ds)
                return;
            switch (key) {
                case constsMOD.KEYS.up:
                    event.preventDefault();
                    if (ds.movePrev(true)) {
                        if (self.isUseScrollInto) {
                            self._scrollToCurrent(false);
                        }
                    }
                    break;
                case constsMOD.KEYS.down:
                    event.preventDefault();
                    if (ds.moveNext(true)) {
                        if (self.isUseScrollInto) {
                            self._scrollToCurrent(false);
                        }
                    }
                    break;
                case constsMOD.KEYS.pageDown:
                    /*
                     if (!!this._currentRow && !!this._currentRow.expanderCell && !this._currentRow.isExpanded) {
                     this._currentRow.expanderCell._onCellClicked();
                     event.preventDefault();
                     }
                     */
                    if (ds.pageIndex > 0)
                        ds.pageIndex = ds.pageIndex - 1;
                    break;
                case constsMOD.KEYS.pageUp:
                    /*
                     if (!!this._currentRow && !!this._currentRow.expanderCell && !!this._currentRow.isExpanded) {
                     this._currentRow.expanderCell._onCellClicked();
                     event.preventDefault();
                     }
                     */
                    ds.pageIndex = ds.pageIndex + 1;
                    break;
                case constsMOD.KEYS.enter:
                    if (!!this._currentRow && !!this._actionsCol) {
                        if (this._currentRow.isEditing) {
                            event.preventDefault();
                        }
                        else {
                            event.preventDefault();
                        }
                    }
                    break;
                case constsMOD.KEYS.esc:
                    if (!!this._currentRow && !!this._actionsCol) {
                        if (this._currentRow.isEditing) {
                            event.preventDefault();
                        }
                    }
                    break;
                case constsMOD.KEYS.space:
                    if (!!this._rowSelectorCol && !!this._currentRow && !this._currentRow.isEditing) {
                        event.preventDefault();
                    }
                    break;
            }
        }
        protected _onKeyUp(key: number, event: Event): void {
            var ds = this.dataSource;
            if (!ds)
                return;
            switch (key) {
                case constsMOD.KEYS.enter:
                    if (!!this._currentRow && !!this._actionsCol) {
                        if (this._currentRow.isEditing) {
                            this.raiseEvent(GRID_EVENTS.row_action, { row: this._currentRow, action: ROW_ACTION.OK });
                            event.preventDefault();
                        }
                        else {
                            this.raiseEvent(GRID_EVENTS.row_action, { row: this._currentRow, action: ROW_ACTION.EDIT });
                            event.preventDefault();
                        }
                    }
                    break;
                case constsMOD.KEYS.esc:
                    if (!!this._currentRow && !!this._actionsCol) {
                        if (this._currentRow.isEditing) {
                            this.raiseEvent(GRID_EVENTS.row_action, { row: this._currentRow, action: ROW_ACTION.CANCEL });
                            event.preventDefault();
                        }
                    }
                    break;
                case constsMOD.KEYS.space:
                    if (!!this._rowSelectorCol && !!this._currentRow && !this._currentRow.isEditing) {
                        event.preventDefault();
                        this._currentRow.isSelected = !this._currentRow.isSelected;
                    }
                    break;
            }
        }
        protected _isRowExpanded(row: Row): boolean {
            return this._expandedRow === row;
        }
        protected _appendToHeader(el: HTMLElement): void {
            this._$headerDiv.append(el);
        }
        protected _setCurrentColumn(column: BaseColumn): void {
            if (!!this._currentColumn)
                this._currentColumn.isSelected = false;
            this._currentColumn = column;
            if (!!this._currentColumn)
                this._currentColumn.isSelected = true;
        }
        protected _onRowStateChanged(row: Row, val: any): string {
            var args = { row: row, val: val, css: <string>null };
            this.raiseEvent(GRID_EVENTS.row_state_changed, args);
            return args.css;
        }
        protected _onCellDblClicked(cell: BaseCell): void {
            var args = { cell: cell };
            this.raiseEvent(GRID_EVENTS.cell_dblclicked, args);
        }
        protected _onRowSelectionChanged(row: Row): void {
            this.raiseEvent(GRID_EVENTS.row_selected, { row: row });
        }
        protected _resetColumnsSort(): void {
            this.columns.forEach(function (col) {
                if (col instanceof DataColumn) {
                    (<DataColumn>col).sortOrder = null;
                }
            });
        }
        protected _getLastRow(): Row {
            if (this._rows.length === 0)
                return null;
            var i = this._rows.length - 1, row = this._rows[i];
            while (row.isDeleted && i > 0) {
                i -= 1;
                row = this._rows[i];
            }
            if (row.isDeleted)
                return null;
            else
                return row;
        }
        protected _removeRow(row: Row): void {
            if (this._expandedRow === row) {
                this.collapseDetails();
            }
            if (this._rows.length === 0)
                return;
            var rowkey = row.itemKey, i = utils.removeFromArray(this._rows, row), oldRow: Row;
            try {
                if (i > -1) {
                    oldRow = row;
                    if (!oldRow.getIsDestroyCalled())
                        oldRow.destroy();
                }
            }
            finally {
                if (!!this._rowMap[rowkey])
                    delete this._rowMap[rowkey];
            }
        }
        protected _expandDetails(parentRow: Row, expanded: boolean): void {
            if (!this._options.details)
                return;
            if (!this._details) {
                this._details = this._createDetails();
            }
            var old = this._expandedRow;
            if (old === parentRow) {
                if (!!old && expanded)
                    return;
            }
            this._expandedRow = null;
            this._details.parentRow = null;

            if (expanded) {
                this._expandedRow = parentRow;
                this._details.parentRow = parentRow;
                this._expandedRow.expanderCell.toggleImage();
            }
            else {
                this._expandedRow = null;
                this._details.parentRow = null;
                if (!!old) {
                    old.expanderCell.toggleImage();
                }
            }
            if (old !== parentRow) {
                if (!!old)
                    old.expanderCell.toggleImage();
            }
            this.raiseEvent(GRID_EVENTS.row_expanded, { collapsedRow: old, expandedRow: parentRow, isExpanded: expanded });
        }
        protected _getIsClearing(): boolean {
            return this._isClearing;
        }
        protected _get$El(): JQuery {
            return this._$el;
        }
        protected _parseColumnAttr(column_attr: string, content_attr: string) {
            var defaultOp: IColumnInfo = {
                "type": COLUMN_TYPE.DATA, //default column type
                title: null,
                sortable: false,
                sortMemberName: null,
                content: null
            }, options: IColumnInfo;

            var temp_opts = global.parser.parseOptions(column_attr);
            if (temp_opts.length > 0)
                options = utils.extend(false, defaultOp, temp_opts[0]);
            else
                options = defaultOp;

            if (!!content_attr) {
                options.content = contentMOD.parseContentAttr(content_attr);
                if (!options.sortMemberName && !!options.content.fieldName)
                    options.sortMemberName = options.content.fieldName;
            }

            return options;
        }
        protected _findUndeleted(row: Row, isUp: boolean) {
            if (!row)
                return null;
            if (!row.isDeleted)
                return row;
            //find nearest nondeleted row (search up and down)
            var delIndex = this.rows.indexOf(row), i = delIndex, len = this.rows.length;
            if (!isUp) {
                i -= 1;
                if (i >= 0)
                    row = this.rows[i];
                while (i >= 0 && row.isDeleted) {
                    i -= 1;
                    if (i >= 0)
                        row = this.rows[i];
                }
                if (row.isDeleted)
                    row = null;
            }
            else {
                i += 1;
                if (i < len)
                    row = this.rows[i];
                while (i < len && row.isDeleted) {
                    i += 1;
                    if (i < len)
                        row = this.rows[i];
                }
                if (row.isDeleted)
                    row = null;
            }
            return row;
        }
        protected _updateCurrent(row: Row, withScroll: boolean) {
            this.currentRow = row;
            if (withScroll && !!row && !row.isDeleted)
                this._scrollToCurrent(true);
        }
        protected _scrollToCurrent(isUp: boolean) {
            var row = this.currentRow;
            if (!!row) {
                row.scrollIntoView(isUp);
            }
        }
        handleError(error: any, source: any): boolean {
            var isHandled = super.handleError(error, source);
            if (!isHandled) {
                return global.handleError(error, source);
            }
            return isHandled;
        }
        protected _onDSCurrentChanged(sender?: any, args?: any) {
            var ds = this.dataSource, cur: collMOD.ICollectionItem;
            if (!!ds)
                cur = ds.currentItem;
            if (!cur)
                this._updateCurrent(null, false);
            else {
                this._updateCurrent(this._rowMap[cur._key], false);
            }
        }
        protected _onDSCollectionChanged(sender: any, args: collMOD.ICollChangedArgs<collMOD.ICollectionItem>) {
            var self = this, row: Row, items = args.items;
            switch (args.changeType) {
                case collMOD.COLL_CHANGE_TYPE.RESET:
                    if (!this._isDSFilling)
                        this._refreshGrid();
                    break;
                case collMOD.COLL_CHANGE_TYPE.ADDED:
                    if (!this._isDSFilling) //if items are filling then it will be appended when it ends
                        self._appendItems(args.items);
                    break;
                case collMOD.COLL_CHANGE_TYPE.REMOVE:
                    items.forEach(function (item) {
                        var row = self._rowMap[item._key];
                        if (!!row) {
                            self._removeRow(row);
                        }
                    });
                    break;
                case collMOD.COLL_CHANGE_TYPE.REMAP_KEY:
                    {
                        row = self._rowMap[args.old_key];
                        if (!!row) {
                            delete self._rowMap[args.old_key];
                            self._rowMap[args.new_key] = row;
                        }
                    }
                    break;
                default:
                    throw new Error(utils.format(RIAPP.ERRS.ERR_COLLECTION_CHANGETYPE_INVALID, args.changeType));
            }
        }
        protected _onDSFill(sender: any, args: collMOD.ICollFillArgs<collMOD.ICollectionItem>) {
            var isEnd = !args.isBegin, self = this;
            if (isEnd) {
                self._isDSFilling = false;
                if (args.resetUI)
                    self._refreshGrid();
                else
                    self._appendItems(args.newItems);

                if (!!args.isPageChanged) {
                    setTimeout(function () {
                        if (self._isDestroyCalled)
                            return;
                        self._onPageChanged();
                    }, 0);
                }
                setTimeout(function () {
                    if (self._isDestroyCalled)
                        return;
                    self._updateColsDim();
                }, 0);
            }
            else {
                self._isDSFilling = true;
                if (!self._isSorting) {
                    if (!args.isPageChanged)
                        self._resetColumnsSort();
                }
            }
        }
        protected _onPageChanged() {
            if (!!this._rowSelectorCol) {
                this._rowSelectorCol.checked = false;
            }
            this._scrollToCurrent(false);
            this.raiseEvent(GRID_EVENTS.page_changed, {});
        }
        protected _onItemEdit(item: collMOD.ICollectionItem, isBegin: boolean, isCanceled: boolean) {
            var row = this._rowMap[item._key];
            if (!row)
                return;
            if (isBegin) {
                row._onBeginEdit();
                this._editingRow = row;
            }
            else {
                row._onEndEdit(isCanceled);
                this._editingRow = null;
            }
            this.raisePropertyChanged(PROP_NAME.editingRow);
        }
        protected _onItemAdded(sender: any, args: collMOD.ICollItemAddedArgs<collMOD.ICollectionItem>) {
            var item = args.item, row = this._rowMap[item._key];
            if (!row)
                return;
            this._updateCurrent(row, true);
            //row.isExpanded = true;
            if (this._options.isHandleAddNew && !args.isAddNewHandled) {
                args.isAddNewHandled = this.showEditDialog();
            }
        }
        protected _onItemStatusChanged(item: collMOD.ICollectionItem, oldStatus: collMOD.STATUS) {
            var newStatus = item._aspect.status, ds = this.dataSource;
            var row = this._rowMap[item._key];
            if (!row)
                return;
            if (newStatus === collMOD.STATUS.DELETED) {
                row.isDeleted = true;
                var row2 = this._findUndeleted(row, true);
                if (!row2) {
                    row2 = this._findUndeleted(row, false);
                }
                if (!!row2) {
                    ds.currentItem = row2.item;
                }
            }
            else if (oldStatus === collMOD.STATUS.DELETED && newStatus !== collMOD.STATUS.DELETED) {
                row.isDeleted = false;
            }
        }
        protected _onDSErrorsChanged(sender: any, args: collMOD.ICollItemArgs<collMOD.ICollectionItem>) {
            var row = this._rowMap[args.item._key];
            if (!row)
                return;
            row.updateErrorState();
        }
        protected _bindDS() {
            var self = this, ds = this.dataSource;
            if (!ds) return;
            ds.addOnCollChanged(self._onDSCollectionChanged, self._objId, self);
            ds.addOnFill(self._onDSFill, self._objId, self);
            ds.addOnCurrentChanged(self._onDSCurrentChanged, self._objId, self);
            ds.addOnBeginEdit(function (sender, args) {
                self._onItemEdit(args.item, true, false);
            }, self._objId);
            ds.addOnEndEdit(function (sender, args) {
                self._onItemEdit(args.item, false, args.isCanceled);
            }, self._objId);
            ds.addOnErrorsChanged(self._onDSErrorsChanged, self._objId, self);
            ds.addOnStatusChanged(function (sender, args) {
                self._onItemStatusChanged(args.item, args.oldStatus);
            }, self._objId);
            ds.addOnItemAdded(self._onItemAdded, self._objId, self);
            //fills all rows
            this._refreshGrid();
            this._updateColsDim();
            this._onDSCurrentChanged();
        }
        protected _unbindDS() {
            var self = this, ds = this.dataSource;
            if (!ds) return;
            ds.removeNSHandlers(self._objId);
        }
        protected _clearGrid() {
            if (this._rows.length === 0)
                return;
            this._isClearing = true;
            try {
                this.collapseDetails();
                var self = this, tbody = self._tBodyEl, newTbody = global.document.createElement('tbody');
                this._el.replaceChild(newTbody, tbody);
                var rows = this._rows;
                this._rows = [];
                this._rowMap = {};
                rows.forEach(function (row) {
                    row.destroy();
                });
            }
            finally {
                this._isClearing = false;
            }
            this._currentRow = null;
        }
        protected _updateColsDim() {
            var width = 0, headerDiv = this._$headerDiv;
            this._columns.forEach(function (col) {
                width += col.el.offsetWidth;
            });
            headerDiv.width(width);
            this._columns.forEach(function (col) {
                col.$extcol.width(col.el.offsetWidth);
            });
        }
        protected _wrapTable() {
            var $table = this._$el, $headerDiv: JQuery, $wrapDiv: JQuery, $container: JQuery, self = this;

            $table.wrap(global.$('<div></div>').addClass(css.wrapDiv));
            $wrapDiv = $table.parent();
            $wrapDiv.wrap(global.$('<div></div>').addClass(css.container));
            $container = $wrapDiv.parent();

            $headerDiv = global.$('<div></div>').addClass(css.headerDiv).insertBefore($wrapDiv);
            global.$(this._tHeadRow).addClass(css.columnInfo);
            this._$wrapDiv = $wrapDiv;
            this._$headerDiv = $headerDiv;

            this._contaner = $container.get(0);

            if (this._options.containerCss) {
                $container.addClass(this._options.containerCss);
            }

            if (this._options.wrapCss) {
                $wrapDiv.addClass(this._options.wrapCss);
            }
            if (this._options.headerCss) {
                $headerDiv.addClass(this._options.headerCss);
            }
            var tw = $table.width();
            self._columnWidthChecker = function () {
                var test = $table.width();
                if (tw !== test) {
                    tw = test;
                    self._updateColsDim();
                }
            };
        }
        protected _unWrapTable() {
            var $table = this._$el;
            if (!this._$headerDiv)
                return;
            this._columnWidthChecker = () => { };
            this._$headerDiv.remove();
            this._$headerDiv = null;
            //remove wrapDiv
            $table.unwrap();
            this._$wrapDiv = null;
            //remove container
            $table.unwrap();
            this._contaner = null;
        }
        protected _createColumns() {
            var self = this, headCells = this._tHeadCells, cnt = headCells.length, cellInfo: { th: HTMLTableHeaderCellElement; colinfo: IColumnInfo; }[] = [];
            var th: HTMLTableHeaderCellElement, attr: IColumnInfo;
            for (var i = 0; i < cnt; i += 1) {
                th = headCells[i];
                attr = this._parseColumnAttr(th.getAttribute(constsMOD.DATA_ATTR.DATA_COLUMN), th.getAttribute(constsMOD.DATA_ATTR.DATA_CONTENT));
                cellInfo.push({ th: th, colinfo: attr });
            }

            cellInfo.forEach(function (inf) {
                var col = self._createColumn(inf);
                if (!!col)
                    self._columns.push(col);
            });
        }
        protected _createColumn(options: { th: HTMLTableHeaderCellElement; colinfo: IColumnInfo; }) {
            var col: BaseColumn;
            switch (options.colinfo.type) {
                case COLUMN_TYPE.ROW_EXPANDER:
                    if (!this._expanderCol) {
                        col = new ExpanderColumn(this, options);
                        this._expanderCol = <ExpanderColumn>col;
                    }
                    break;
                case COLUMN_TYPE.ROW_ACTIONS:
                    if (!this._actionsCol) {
                        col = new ActionsColumn(this, options);
                        this._actionsCol = <ActionsColumn>col;
                    }
                    break;
                case COLUMN_TYPE.ROW_SELECTOR:
                    if (!this._rowSelectorCol) {
                        col = new RowSelectorColumn(this, options);
                        this._rowSelectorCol = <RowSelectorColumn>col;
                    }
                    break;
                case COLUMN_TYPE.DATA:
                    col = new DataColumn(this, options);
                    break;
                default:
                    throw new Error(utils.format(RIAPP.ERRS.ERR_GRID_COLTYPE_INVALID, options.colinfo.type));
            }
            return col;
        }
        protected _appendItems(newItems: collMOD.ICollectionItem[]) {
            if (this._isDestroyCalled)
                return;
            var self = this, item: collMOD.ICollectionItem, tbody = this._tBodyEl;
            for (var i = 0, k = newItems.length; i < k; i += 1) {
                item = newItems[i];
                if (!self._rowMap[item._key])  //not row for item already exists
                    self._createRowForItem(tbody, item);
            }
        }
        //Full grid refresh
        protected _refreshGrid() {
            var self = this, ds = this.dataSource;
            self._clearGrid();
            if (!ds) return;
            var docFr = global.document.createDocumentFragment(), oldTbody = this._tBodyEl, newTbody = global.document.createElement('tbody');
            ds.items.forEach(function (item, pos) {
                self._createRowForItem(docFr, item, pos);
            });
            newTbody.appendChild(docFr);
            self._el.replaceChild(newTbody, oldTbody);
        }
        protected _createRowForItem(parent: Node, item: collMOD.ICollectionItem, pos?: number) {
            var self = this, tr = global.document.createElement('tr');
            var gridRow = new Row(self, { tr: tr, item: item });
            self._rowMap[item._key] = gridRow;
            self._rows.push(gridRow);
            parent.appendChild(gridRow.el);
            return gridRow;
        }
        protected _createDetails() {
            var details_id = this._options.details.templateID;
            var tr: HTMLTableRowElement = <HTMLTableRowElement>global.document.createElement('tr');
            return new DetailsRow({ grid: this, tr: tr, details_id: details_id });
        }
        _getInternal(): IInternalGridMethods {
            return this._internal;
        }
        getISelectable(): ISelectable {
            return this._selectable;
        }
        sortByColumn(column: DataColumn) {
            var self = this, ds = this.dataSource;
            var sorts = column.sortMemberName.split(';');
            self._isSorting = true;
            var promise = ds.sort(sorts, column.sortOrder);
            promise.always(function () {
                self._isSorting = false;
            });
        }
        selectRows(isSelect: boolean) {
            this._rows.forEach(function (row) {
                if (row.isDeleted)
                    return;
                row.isSelected = isSelect;
            });
        }
        findRowByItem(item: collMOD.ICollectionItem) {
            var row = this._rowMap[item._key];
            if (!row)
                return null;
            return row;
        }
        collapseDetails() {
            if (!this._details)
                return;
            var old = this._expandedRow;
            if (!!old) {
                this._expandedRow = null;
                this.raiseEvent(GRID_EVENTS.row_expanded, { collapsedRow: old, expandedRow: null, isExpanded: false });
            }
        }
        getSelectedRows() {
            var res: Row[] = [];
            this._rows.forEach(function (row) {
                if (row.isDeleted)
                    return;
                if (row.isSelected) {
                    res.push(row);
                }
            });
            return res;
        }
        showEditDialog() {
            if (!this._options.editor || !this._options.editor.templateID || !this._editingRow)
                return false;
            var dialogOptions: datadialog.IDialogConstructorOptions,
                item = this._editingRow.item;
            if (!item._aspect.isEditing)
                item._aspect.beginEdit();
            if (!this._dialog) {
                dialogOptions = utils.extend(false, {
                    dataContext: item
                }, this._options.editor);
                this._dialog = new datadialog.DataEditDialog(this.app, dialogOptions);
            }
            else
                this._dialog.dataContext = item;
            this._dialog.canRefresh = !!this.dataSource.permissions.canRefreshRow && !item._aspect.isNew;
            this._dialog.show();
            return true;
        }
        scrollToCurrent(isUp: boolean) {
            this._scrollToCurrent(isUp);
        }
        addNew() {
            var ds = this.dataSource;
            try {
                ds.addNew();
                this.showEditDialog();
            } catch (ex) {
                RIAPP.reThrow(ex, this.handleError(ex, this));
            }
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            _gridDestroyed(this);
            global._getInternal().untrackSelectable(this);
            if (!!this._details) {
                this._details.destroy();
                this._details = null;
            }
            if (this._options.animation) {
                this._options.animation.stop();
                this._options.animation = null;
            }
            if (!!this._dialog) {
                this._dialog.destroy();
                this._dialog = null;
            }
            this.dataSource = null;
            this._unWrapTable();
            this._$el.removeClass(css.dataTable);
            global.$(this._tHeadRow).removeClass(css.columnInfo);
            this._el = null;
            this._$el = null;
            this._options.app = null;
            this._options = <any>{};
            super.destroy();
        }
        get app() { return this._options.app; }
        get options() { return this._options; }
        get _tBodyEl() { return this._el.tBodies[0]; }
        get _tHeadEl() { return this._el.tHead; }
        get _tFootEl() { return this._el.tFoot; }
        get _tHeadRow(): HTMLTableRowElement {
            if (!this._tHeadEl)
                return null;
            var trs = this._tHeadEl.rows;
            if (trs.length === 0)
                return null;
            return <HTMLTableRowElement>trs[0];
        }
        get _tHeadCells() {
            var row = this._tHeadRow;
            if (!row)
                return [];
            return ArrayHelper.fromCollection(row.cells);
        }
        get uniqueID() { return this._objId; }
        get name() { return this._name; }
        get dataSource() { return this._options.dataSource; }
        set dataSource(v: collMOD.BaseCollection<collMOD.ICollectionItem>) {
            if (v === this.dataSource)
                return;
            if (!!this.dataSource) {
                this._unbindDS();
            }
            this._clearGrid();
            this._options.dataSource = v;
            if (!!this.dataSource)
                this._bindDS();
            this.raisePropertyChanged(PROP_NAME.dataSource);
        }
        get rows() { return this._rows; }
        get columns() { return this._columns; }
        get currentRow() { return this._currentRow; }
        set currentRow(row) {
            var ds = this.dataSource, old = this._currentRow, isChanged = false;
            if (!ds)
                return;
            if (old !== row) {
                this._currentRow = row;
                if (!!old) {
                    old.isCurrent = false;
                }
                if (!!row)
                    row.isCurrent = true;
                isChanged = true;
            }
            if (!!row) {
                if (row.item !== ds.currentItem)
                    ds.currentItem = row.item;
            }
            else
                ds.currentItem = null;
            if (isChanged)
                this.raisePropertyChanged(PROP_NAME.currentRow);
        }
        get editingRow() { return this._editingRow; }
        get isCanEdit() {
            if (this._options.isCanEdit !== null)
                return this._options.isCanEdit;
            var ds = this.dataSource;
            return !!ds && ds.permissions.canEditRow;
        }
        get isCanDelete() {
            if (this._options.isCanDelete !== null)
                return this._options.isCanDelete;
            var ds = this.dataSource;
            return !!ds && ds.permissions.canDeleteRow;
        }
        get isCanAddNew() {
            var ds = this.dataSource;
            return !!ds && ds.permissions.canAddRow;
        }
        get isUseScrollInto() { return this._options.isUseScrollInto; }
        set isUseScrollInto(v) { this._options.isUseScrollInto = v; }
        get animation() {
            if (!this.options.animation) {
                this.options.animation = new DefaultAnimation();
            }
            return this.options.animation;
        }
    }

    export interface IRowStateProvider {
        getCSS(item: collMOD.ICollectionItem, val: any): string;
    }

    export interface IGridViewOptions extends IGridOptions, elviewMOD.IViewOptions {
    }

    export class GridElView extends elviewMOD.BaseElView {
        private _grid: DataGrid;
        private _options: IGridViewOptions;
        private _stateProvider: IRowStateProvider;
        toString() {
            return 'GridElView';
        }
        protected _init(options: IGridViewOptions) {
            super._init(options);
            this._stateProvider = null;
            this._grid = null;
            this._options = options;
            this._createGrid();
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            if (!!this._grid && !this._grid.getIsDestroyCalled()) {
                this._grid.destroy();
            }
            this._grid = null;
            this._stateProvider = null;
            super.destroy();
        }
        private _createGrid() {
            var options: IGridConstructorOptions = utils.extend(false,
                {
                    app: this._app,
                    el: <HTMLTableElement>this._el,
                    dataSource: null,
                    animation: null
                }, this._options);
            this._grid = new DataGrid(options);
            this._bindGridEvents();
        }
        private _bindGridEvents() {
            if (!this._grid)
                return;
            this._grid.addOnRowStateChanged(function (s, args) {
                var self: GridElView = this;
                if (!!self._stateProvider) {
                    args.css = self._stateProvider.getCSS(args.row.item, args.val);
                }
            }, this.uniqueID, this);
            this._grid.addOnDestroyed(function (s, args) {
                var self: GridElView = this;
                self._grid = null;
                self.invokePropChanged(PROP_NAME.grid);
                self.raisePropertyChanged(PROP_NAME.grid);
            }, this.uniqueID, this);

        }
        get dataSource() {
            if (this._isDestroyCalled)
                return undefined;
            return this.grid.dataSource;
        }
        set dataSource(v) {
            if (this._isDestroyCalled)
                return;
            if (this.dataSource !== v) {
                this.grid.dataSource = v;
                this.raisePropertyChanged(PROP_NAME.dataSource);
            }
        }
        get grid() { return this._grid; }
        get stateProvider() { return this._stateProvider; }
        set stateProvider(v: IRowStateProvider) {
            if (v !== this._stateProvider) {
                this._stateProvider = v;
                this.raisePropertyChanged(PROP_NAME.stateProvider);
            }
        }
        get animation() {
            if (this._isDestroyCalled)
                return undefined;
            return this._grid.options.animation;
        }
        set animation(v) {
            if (this._isDestroyCalled)
                return;
            if (this.animation !== v) {
                this._grid.options.animation = v;
                this.raisePropertyChanged(PROP_NAME.animation);
            }
        }
    }

    global.registerElView('table', GridElView);
    global.registerElView('datagrid', GridElView);
    _isModuleLoaded = true;
}
