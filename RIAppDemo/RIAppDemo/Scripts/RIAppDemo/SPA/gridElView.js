var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports"], function (require, exports) {
    'use strict';
    var GRIDMOD = RIAPP.MOD.datagrid;
    var global = RIAPP.global, utils = global.utils;
    var GridElView = (function (_super) {
        __extends(GridElView, _super);
        function GridElView() {
            _super.apply(this, arguments);
        }
        GridElView.prototype._init = function (options) {
            _super.prototype._init.call(this, options);
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
        };
        GridElView.prototype._onGridPageChanged = function () {
            if (!!this._myGridEvents) {
                this._myGridEvents.onDataPageChanged();
            }
        };
        GridElView.prototype._onGridRowSelected = function (row) {
            if (!!this._myGridEvents) {
                this._myGridEvents.onRowSelected(row.item);
            }
        };
        GridElView.prototype._onGridRowExpanded = function (oldRow, row, isExpanded) {
            if (!!this._myGridEvents) {
                if (isExpanded) {
                    this._myGridEvents.onRowExpanded(row.item);
                }
                else {
                    this._myGridEvents.onRowCollapsed(oldRow.item);
                }
            }
        };
        GridElView.prototype.destroy = function () {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            if (!!this._myGridEvents) {
                this._myGridEvents.regFocusGridFunc(null);
            }
            this._myGridEvents = null;
            _super.prototype.destroy.call(this);
        };
        Object.defineProperty(GridElView.prototype, "myGridEvents", {
            get: function () { return this._myGridEvents; },
            set: function (v) {
                var self = this;
                if (this._myGridEvents !== v) {
                    if (!!this._myGridEvents) {
                        this._myGridEvents.regFocusGridFunc(null);
                    }
                    this._myGridEvents = v;
                    this.raisePropertyChanged('myGridEvents');
                    //a new gridEvents object was set
                    if (!!this._myGridEvents) {
                        this._myGridEvents.regFocusGridFunc(function () {
                            if (!!self.grid) {
                                self.grid.scrollToCurrent(true);
                                global.currentSelectable = self.grid;
                            }
                        });
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        return GridElView;
    })(GRIDMOD.GridElView);
    exports.GridElView = GridElView;
    function initModule(app) {
        app.registerElView('my_grid', GridElView);
        return {};
    }
    exports.initModule = initModule;
});
//# sourceMappingURL=gridElView.js.map