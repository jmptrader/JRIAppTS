/// <reference path="..\..\jriappTS\jriapp.d.ts"/>
//using AMD to load user module
import COMMON = require("common");
'use strict';
//using static import for CORE jriapp modules
import MOD = RIAPP.MOD;
import GRIDMOD = RIAPP.MOD.datagrid;
var global = RIAPP.global, utils = global.utils;

export class GridElView extends GRIDMOD.GridElView {
    private _myGridEvents: COMMON.IGridEvents;
    _init(options: GRIDMOD.IGridViewOptions) {
        super._init(options);
        var self = this, grid = self.grid;
        //example of binding to dataGrid events using strongly typed methods
        if (!!grid) {
            grid.addOnPageChanged(function (s, a) {
                self._onGridPageChanged();
            }, self.uniqueID);
            grid.addOnRowSelected(function (s, a) {
                self._onGridRowSelected(a.row);
            }, self.uniqueID);
            grid.addOnRowExpanded(function (s, a) {
                self._onGridRowExpanded(a.collapsedRow, a.expandedRow, a.isExpanded);
            }, self.uniqueID);
        }
    }
    protected _onGridPageChanged() {
        if (!!this._myGridEvents) {
            this._myGridEvents.onDataPageChanged();
        }
    }
    protected _onGridRowSelected(row: GRIDMOD.Row) {
        if (!!this._myGridEvents) {
            this._myGridEvents.onRowSelected(row.item);
        }
    }
    protected _onGridRowExpanded(oldRow: GRIDMOD.Row, row: GRIDMOD.Row, isExpanded: boolean) {
        if (!!this._myGridEvents) {
            if (isExpanded) {
                this._myGridEvents.onRowExpanded(row.item);
            }
            else {
                this._myGridEvents.onRowCollapsed(oldRow.item);
            }
        }
    }
    destroy() {
        if (this._isDestroyed)
            return;
        this._isDestroyCalled = true;
        if (!!this._myGridEvents) {
            this._myGridEvents.regFocusGridFunc(null);
        }
        this._myGridEvents = null;
        super.destroy();
    }
    get myGridEvents() { return this._myGridEvents; }
    set myGridEvents(v) {
        var self = this;
        if (this._myGridEvents !== v) {
            if (!!this._myGridEvents) {
                this._myGridEvents.regFocusGridFunc(null);
            }
            this._myGridEvents= v;
            this.raisePropertyChanged('myGridEvents');
            //a new gridEvents object was set
            if (!!this._myGridEvents) {
                this._myGridEvents.regFocusGridFunc(() => {
                    if (!!self.grid) {
                        self.grid.scrollToCurrent(true);
                        global.currentSelectable = self.grid;
                    }
                });
            }
        }
    }
}

export function initModule(app: RIAPP.Application) {
    app.registerElView('my_grid', GridElView);
    return {};
}