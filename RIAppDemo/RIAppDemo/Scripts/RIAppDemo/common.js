var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="..\..\jriappTS\jriapp.d.ts"/>
var RIAPP;
(function (RIAPP) {
    var COMMON;
    (function (COMMON) {
        'use strict';
        var global = RIAPP.global, utils = global.utils;
        var DownloadLinkElView = (function (_super) {
            __extends(DownloadLinkElView, _super);
            function DownloadLinkElView() {
                _super.apply(this, arguments);
            }
            DownloadLinkElView.prototype._init = function (options) {
                _super.prototype._init.call(this, options);
                this._baseUri = '';
                if (!!options.baseUri)
                    this._baseUri = options.baseUri;
                this._id = '';
            };
            Object.defineProperty(DownloadLinkElView.prototype, "text", {
                get: function () {
                    if (!this._el)
                        return;
                    return this.$el.text();
                },
                set: function (v) {
                    if (!this._el)
                        return;
                    var $el = this.$el;
                    var x = $el.text();
                    if (v === null)
                        v = '';
                    else
                        v = '' + v;
                    if (x !== v) {
                        $el.text(v);
                        this.raisePropertyChanged('text');
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DownloadLinkElView.prototype, "href", {
                get: function () {
                    if (!this._el)
                        return;
                    return this.$el.prop('href');
                },
                set: function (v) {
                    if (!this._el)
                        return;
                    var x = this.$el.prop('href');
                    if (v === null)
                        v = '';
                    else
                        v = '' + v;
                    if (x !== v) {
                        this.$el.prop('href', v);
                        this.raisePropertyChanged('href');
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DownloadLinkElView.prototype, "id", {
                get: function () { return this._id; },
                set: function (v) {
                    var x = this._id;
                    if (v === null)
                        v = '';
                    else
                        v = '' + v;
                    if (x !== v) {
                        this._id = v;
                        this.href = this._baseUri + '/' + this._id;
                        this.raisePropertyChanged('id');
                    }
                },
                enumerable: true,
                configurable: true
            });
            return DownloadLinkElView;
        })(RIAPP.MOD.baseElView.BaseElView);
        COMMON.DownloadLinkElView = DownloadLinkElView;
        var FileImgElView = (function (_super) {
            __extends(FileImgElView, _super);
            function FileImgElView() {
                _super.apply(this, arguments);
            }
            FileImgElView.prototype._init = function (options) {
                _super.prototype._init.call(this, options);
                this._baseUri = '';
                if (!!options.baseUri)
                    this._baseUri = options.baseUri;
                this._id = '';
                this._fileName = null;
            };
            FileImgElView.prototype.reloadImg = function () {
                if (!this._el)
                    return;
                var src = this.src;
                var pos = src.indexOf('?');
                if (pos >= 0) {
                    src = src.substr(0, pos);
                }
                var date = new Date();
                this.src = src + '?v=' + date.getTime();
                return false;
            };
            Object.defineProperty(FileImgElView.prototype, "fileName", {
                get: function () { return this._fileName; },
                set: function (v) {
                    var x = this._fileName;
                    if (x !== v) {
                        this._fileName = v;
                        this.raisePropertyChanged('fileName');
                        this.reloadImg();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FileImgElView.prototype, "src", {
                get: function () {
                    if (!this._el)
                        return;
                    return this.$el.prop('src');
                },
                set: function (v) {
                    if (!this._el)
                        return;
                    var el = this.$el;
                    var x = el.prop('src');
                    if (v === null)
                        v = '';
                    else
                        v = '' + v;
                    if (x !== v) {
                        el.prop('src', v);
                        this.raisePropertyChanged('src');
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FileImgElView.prototype, "id", {
                get: function () { return this._id; },
                set: function (v) {
                    var x = this._id;
                    if (v === null)
                        v = '';
                    else
                        v = '' + v;
                    if (x !== v) {
                        this._id = v;
                        if (!this._id)
                            this.src = null;
                        else
                            this.src = this._baseUri + '/' + this._id;
                        this.raisePropertyChanged('id');
                    }
                },
                enumerable: true,
                configurable: true
            });
            return FileImgElView;
        })(RIAPP.MOD.baseElView.BaseElView);
        COMMON.FileImgElView = FileImgElView;
        var ErrorViewModel = (function (_super) {
            __extends(ErrorViewModel, _super);
            function ErrorViewModel(app) {
                _super.call(this, app);
                var self = this;
                this._error = null;
                this._message = null;
                this._title = '';
                this._dialogVM = new RIAPP.MOD.datadialog.DialogVM(app);
                var dialogOptions = {
                    templateID: 'errorTemplate',
                    width: 500,
                    height: 300,
                    title: '',
                    canCancel: false,
                    fn_OnShow: function (dialog) {
                        while (!!self.error && !!self.error.origError) {
                            //get real error
                            self._error = self.error.origError;
                            self.raisePropertyChanged('error');
                        }
                        if (self.error instanceof RIAPP.MOD.db.AccessDeniedError)
                            self.title = "ACCESS DENIED";
                        else if (self.error instanceof RIAPP.MOD.db.ConcurrencyError)
                            self.title = "CONCURRENCY ERROR";
                        else if (self.error instanceof RIAPP.MOD.errors.ValidationError)
                            self.title = "VALIDATION ERROR";
                        else if (self.error instanceof RIAPP.MOD.db.SvcValidationError)
                            self.title = "VALIDATION ERROR";
                        else if (self.error instanceof RIAPP.MOD.db.DataOperationError)
                            self.title = "DATA OPERATION ERROR";
                        else
                            self.title = "UNEXPECTED ERROR";
                        self.message = (!self.error.message) ? ('' + self.error) : self.error.message;
                        dialog.title = self.title;
                    },
                    fn_OnClose: function (dialog) {
                        self._error = null;
                        self.raisePropertyChanged('error');
                    }
                };
                //dialogs are distinguished by their given names
                this._dialogVM.createDialog('errorDialog', dialogOptions);
            }
            ErrorViewModel.prototype.showDialog = function () {
                this._dialogVM.showDialog('errorDialog', this);
            };
            ErrorViewModel.prototype.destroy = function () {
                if (this._isDestroyed)
                    return;
                this._isDestroyCalled = true;
                this._dialogVM.destroy();
                this._dialogVM = null;
                this._error = null;
                _super.prototype.destroy.call(this);
            };
            Object.defineProperty(ErrorViewModel.prototype, "error", {
                get: function () { return this._error; },
                set: function (v) {
                    var old = this._error;
                    if (!!old) {
                        global.handleError(v, null);
                        RIAPP.throwDummy(v);
                    }
                    this._error = v;
                    this.raisePropertyChanged('error');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ErrorViewModel.prototype, "title", {
                get: function () { return this._title; },
                set: function (v) {
                    var old = this._title;
                    if (old !== v) {
                        this._title = v;
                        this.raisePropertyChanged('title');
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ErrorViewModel.prototype, "message", {
                get: function () { return this._message; },
                set: function (v) {
                    var old = this._message;
                    if (old !== v) {
                        this._message = v;
                        this.raisePropertyChanged('message');
                    }
                },
                enumerable: true,
                configurable: true
            });
            return ErrorViewModel;
        })(RIAPP.MOD.mvvm.BaseViewModel);
        COMMON.ErrorViewModel = ErrorViewModel;
        function initModule(app) {
            app.registerElView('fileLink', DownloadLinkElView);
            app.registerElView('fileImage', FileImgElView);
            return COMMON;
        }
        COMMON.initModule = initModule;
        ;
    })(COMMON = RIAPP.COMMON || (RIAPP.COMMON = {}));
})(RIAPP || (RIAPP = {}));
//# sourceMappingURL=common.js.map