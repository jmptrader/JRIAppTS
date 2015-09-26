namespace RIAPP.MOD.baseElView {
    import constsMOD = RIAPP.consts;
    import utilsMOD = RIAPP.MOD.utils;
    import mvvmMOD = RIAPP.MOD.mvvm;
    //local variables for optimization
    var ERRTEXT = RIAPP.localizable.VALIDATE, utils: utilsMOD.Utils;
    RIAPP.global.addOnInitialize((s, args) => {
        utils = s.utils;
    });

    baseElView._isElView = function(obj: any): boolean {
        return !!obj && obj instanceof BaseElView;
    }
    export function fn_addToolTip($el: JQuery, tip: string, isError?: boolean, pos?: string) {
        var options: QTip2.QTipOptions = {
            content: {
                text: tip
            },
            style: {
                classes: !!isError ? css.toolTipError : css.toolTip
            },
            position: {
                my: 'top left',
                at: (!!pos) ? pos : 'bottom right',
                viewport: global.$(global.window),
                adjust: {
                    method: 'flip',
                    x: 0,
                    y: 0
                }
            },
            hide: {
                event: 'unfocus click mouseleave',
                leave: true
            }
        };

        if (!!$el.data('qtip')) {
            if (!tip) {
                $el.qtip('destroy', true);
            }
            else
                $el.qtip('option', 'content.text', tip);
        }
        else if (!!tip) {
            $el.qtip(options);
        }
    }
    export class PropChangedCommand extends mvvmMOD.Command {
        constructor(fn_action: (sender: any, param: { property: string; }) => void, thisObj: any, fn_canExecute: (sender: any, param: { property: string; }) => boolean) {
            super(fn_action, thisObj, fn_canExecute);
        }
    }
    export var css = {
        toolTip: 'qtip',
        toolTipError: 'qtip-red',
        fieldError: 'ria-field-error',
        commandLink: 'ria-command-link',
        disabled: 'disabled',
        opacity: 'opacity',
        color: 'color',
        fontSize: 'font-size'
    };
    export var PROP_NAME = {
        isVisible: 'isVisible',
        validationErrors: 'validationErrors',
        toolTip: 'toolTip',
        css: 'css',
        isEnabled: 'isEnabled',
        value: 'value',
        command: 'command',
        disabled: 'disabled',
        commandParam: 'commandParam',
        isBusy: 'isBusy',
        delay: 'delay',
        checked: 'checked',
        color: 'color',
        rows: 'rows',
        cols: 'cols',
        wrap: 'wrap',
        text: 'text',
        html: 'html',
        preventDefault: 'preventDefault',
        imageSrc: 'imageSrc',
        href: 'href',
        isExpanded: 'isExpanded',
        fontSize: 'fontSize',
        borderColor: 'borderColor',
        borderStyle: 'borderStyle',
        width: 'width',
        height: 'height',
        src: 'src'
    };

    export interface IViewOptions {
        css?: string;
        tip?: string;
    }

    export interface IViewType {
        new (app: RIAPP.Application, el: HTMLElement, options: IViewOptions): BaseElView;
    }

    export class BaseElView extends RIAPP.BaseObject {
        protected _el: HTMLElement;
        protected _$el: JQuery;
        protected _oldDisplay: string;
        protected _objId: string;
        protected _propChangedCommand: mvvmMOD.ICommand;
        protected _errors: RIAPP.IValidationInfo[];
        protected _toolTip: string;
        protected _css: string;
        protected _app: RIAPP.Application;

        constructor(app: RIAPP.Application, el: HTMLElement, options: IViewOptions) {
            super();
            this._app = app;
            this._el = el;
            this._$el = null;
            //save previous css display style
            this._oldDisplay = null;
            this._objId = 'elv' + baseUtils.getNewID();
            this._propChangedCommand = null;
            app._getInternal().setElView(this._el, this);
            this._errors = null;
            this._toolTip = options.tip;
            this._css = options.css;
            this._init(options);
            this._applyToolTip();
        }
        protected _applyToolTip() {
            if (!!this._toolTip) {
                this._setToolTip(this.$el, this._toolTip);
            }
        }
        protected _init(options: IViewOptions) {
            if (!!this._css) {
                this.$el.addClass(this._css);
            }
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            var $el = this._$el, el = this._el;
            if (!!$el)
                $el.off('.' + this._objId);
            try {
                this._propChangedCommand = null;
                this.validationErrors = null;
                this.toolTip = null;
                this._el = null;
                this._$el = null;
            }
            finally {
                this._app._getInternal().setElView(el, null);
                this._app = null;
            }
            super.destroy();
        }
        invokePropChanged(property: string) {
            var self = this, data = { property: property };
            if (!!self._propChangedCommand) {
                self._propChangedCommand.execute(self, data);
            }
        }
        protected _getErrorTipInfo(errors: RIAPP.IValidationInfo[]) {
            var tip = ['<b>', ERRTEXT.errorInfo, '</b>', '<br/>'];
            errors.forEach(function (info) {
                var res = '';
                info.errors.forEach(function (str) {
                    res = res + ' ' + str;
                });
                tip.push(res);
                res = '';
            });
            return tip.join('');
        }
        protected _setFieldError(isError: boolean) {
            var $el = this.$el;
            if (isError) {
                $el.addClass(css.fieldError);
            }
            else {
                $el.removeClass(css.fieldError);
            }
        }
        protected _updateErrorUI(el: HTMLElement, errors: RIAPP.IValidationInfo[]) {
            if (!el) {
                return;
            }
            var $el = this.$el;
            if (!!errors && errors.length > 0) {
                fn_addToolTip($el, this._getErrorTipInfo(errors), true);
                this._setFieldError(true);
            }
            else {
                this._setToolTip($el, this.toolTip);
                this._setFieldError(false);
            }
        }
        handleError(error: any, source: any): boolean {
            var isHandled = super.handleError(error, source);
            if (!isHandled) {
                return this._app.handleError(error, source);
            }
            return isHandled;
        }
        protected _setToolTip($el: JQuery, tip: string, isError?: boolean) {
            fn_addToolTip($el, tip, isError);
        }
        toString() {
            return 'BaseElView';
        }
        get $el() {
            if (!!this._el && !this._$el)
                this._$el = global.$(this._el);
            return this._$el;
        }
        get el() { return this._el; }
        get uniqueID() { return this._objId; }
        get isVisible() {
            var v = this.el.style.display;
            return !(v === 'none');
        }
        set isVisible(v) {
            v = !!v;
            if (v !== this.isVisible) {
                if (!v) {
                    this._oldDisplay = this.el.style.display;
                    this.el.style.display = 'none';
                }
                else {
                    if (!!this._oldDisplay)
                        this.el.style.display = this._oldDisplay;
                    else
                        this.el.style.display = '';
                }
                this.raisePropertyChanged(PROP_NAME.isVisible);
            }
        }
        get propChangedCommand() { return this._propChangedCommand; }
        set propChangedCommand(v: mvvmMOD.ICommand) {
            var old = this._propChangedCommand;
            if (v !== old) {
                this._propChangedCommand = v;
                this.invokePropChanged('*');
            }
        }
        get validationErrors() { return this._errors; }
        set validationErrors(v: RIAPP.IValidationInfo[]) {
            if (v !== this._errors) {
                this._errors = v;
                this.raisePropertyChanged(PROP_NAME.validationErrors);
                this._updateErrorUI(this._el, this._errors);
            }
        }
        get dataNameAttr() { return this._el.getAttribute(constsMOD.DATA_ATTR.DATA_NAME); }
        get toolTip() { return this._toolTip; }
        set toolTip(v: string) {
            if (this._toolTip != v) {
                this._toolTip = v;
                this._setToolTip(this.$el, v);
                this.raisePropertyChanged(PROP_NAME.toolTip);
            }
        }
        get css() { return this._css; }
        set css(v: string) {
            var $el = this.$el;
            if (this._css != v) {
                if (!!this._css)
                    $el.removeClass(this._css);
                this._css = v;
                if (!!this._css)
                    $el.addClass(this._css);
                this.raisePropertyChanged(PROP_NAME.css);
            }
        }
        get app() { return this._app; }
    }

    export class InputElView extends BaseElView {
        constructor(app: RIAPP.Application, el: HTMLInputElement, options: IViewOptions) {
            super(app, el, options);
        }
        toString() {
            return 'InputElView';
        }
        get isEnabled() { return !this.el.disabled; }
        set isEnabled(v: boolean) {
            v = !!v;
            if (v !== this.isEnabled) {
                this.el.disabled = !v;
                this.raisePropertyChanged(PROP_NAME.isEnabled);
            }
        }
        get el() { return <HTMLInputElement>this._el; }
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
                this.raisePropertyChanged(PROP_NAME.value);
            }
        }
    };

    export class CommandElView extends BaseElView {
        private _command: mvvmMOD.Command;
        protected _commandParam: any;
        constructor(app: RIAPP.Application, el: HTMLElement, options: IViewOptions) {
            super(app, el, options);
            this._command = null;
            this._commandParam = null;
            if (!this.isEnabled) {
                this.$el.addClass('disabled');
            }
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            if (!!this._command) {
                this._command.removeNSHandlers(this._objId);
            }
            this.command = null;
            this.commandParam = null;
            super.destroy();
        }
        invokeCommand() {
            var self = this, command = self.command, param = self.commandParam;
            if (!!command && command.canExecute(self, param)) {
                setTimeout(function () {
                    if (command.canExecute(self, param))
                        command.execute(self, param);
                }, 0);
            }
        }
        protected _onCommandChanged() {
            this.raisePropertyChanged(PROP_NAME.command);
        }
        private _onCanExecuteChanged(cmd: mvvm.Command, args: any) {
            this.isEnabled = cmd.canExecute(this, this.commandParam);
        }
        protected _setCommand(v: mvvmMOD.Command) {
            var self = this;
            if (v !== this._command) {
                if (!!this._command) {
                    this._command.removeNSHandlers(this._objId);
                }
                this._command = v;
                if (!!this._command) {
                    this._command.addOnCanExecuteChanged(self._onCanExecuteChanged, this._objId, self);
                    self.isEnabled = this._command.canExecute(self, self.commandParam);
                }
                else
                    self.isEnabled = false;
                this._onCommandChanged();
            }
        }
        toString() {
            return 'CommandElView';
        }
        get isEnabled() { return !(this.$el.prop(PROP_NAME.disabled)); }
        set isEnabled(v: boolean) {
            if (v !== this.isEnabled) {
                this.$el.prop(PROP_NAME.disabled, !v);
                if (!v)
                    this.$el.addClass(css.disabled);
                else
                    this.$el.removeClass(css.disabled);
                this.raisePropertyChanged(PROP_NAME.isEnabled);
            }
        }
        get command() { return this._command; }
        set command(v: mvvmMOD.Command) { this._setCommand(v); }
        get commandParam() { return this._commandParam; }
        set commandParam(v) {
            if (v !== this._commandParam) {
                this._commandParam = v;
                this.raisePropertyChanged(PROP_NAME.commandParam);
            }
        }
    };

    export interface IBusyViewOptions extends IViewOptions {
        img?: string
        delay?: number | string;
    }

    export class BusyElView extends BaseElView {
        private _delay: number;
        private _timeOut: number;
        private _loaderPath: string;
        private _$loader: any;
        private _isBusy: boolean;
        constructor(app: RIAPP.Application, el: HTMLElement, options: IBusyViewOptions) {
            super(app, el, options);
        }
        protected _init(options: IBusyViewOptions) {
            super._init(options);
            var img: string;
            if (!!options.img)
                img = options.img;
            else
                img = constsMOD.LOADER_GIF.NORMAL;
            this._delay = 400;
            this._timeOut = null;
            if (!utils.check.isNt(options.delay))
                this._delay = parseInt('' + options.delay);
            this._loaderPath = global.getImagePath(img);
            this._$loader = global.$(new Image());
            this._$loader.css({ position: "absolute", display: "none", zIndex: "10000" });
            this._$loader.prop('src', this._loaderPath);
            this._$loader.appendTo(this.el);
            this._isBusy = false;
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            if (!!this._timeOut) {
                clearTimeout(this._timeOut);
                this._timeOut = null;
            }
            this._$loader.remove();
            this._$loader = null;
            super.destroy();
        }
        toString() {
            return 'BusyElView';
        }
        get isBusy() { return this._isBusy; }
        set isBusy(v) {
            var self = this, fn = function () {
                self._timeOut = null;
                self._$loader.show();
                self._$loader.position({
                    //"my": "right top",
                    //"at": "left bottom",
                    "of": global.$(self.el)
                });
            };

            if (v !== self._isBusy) {
                self._isBusy = v;
                if (self._isBusy) {
                    if (!!self._timeOut) {
                        clearTimeout(self._timeOut);
                        self._timeOut = null;
                    }
                    if (self._delay > 0) {
                        self._timeOut = setTimeout(fn, self._delay);
                    }
                    else
                        fn();
                }
                else {
                    if (!!self._timeOut) {
                        clearTimeout(self._timeOut);
                        self._timeOut = null;
                    }
                    else
                        self._$loader.hide();
                }
                self.raisePropertyChanged(PROP_NAME.isBusy);
            }
        }
        get delay() { return this._delay; }
        set delay(v) {
            if (v !== this._delay) {
                this._delay = v;
                this.raisePropertyChanged(PROP_NAME.delay);
            }
        }
    }

    export class CheckBoxElView extends InputElView {
        private _val: boolean;
        protected _init(options: IViewOptions) {
            var self = this;
            super._init(options);
            this._val = this.el.checked;
            this.$el.on('change.' + this._objId, function (e) {
                e.stopPropagation();
                self.checked = this.checked;
            });
        }
        protected _setFieldError(isError: boolean) {
            var $el = this.$el;
            if (isError) {
                var span = global.$('<div></div>').addClass(css.fieldError);
                $el.wrap(span);
            }
            else {
                if ($el.parent('.' + css.fieldError).length > 0)
                    $el.unwrap();
            }
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            this.$el.off('.' + this._objId);
            super.destroy();
        }
        toString() {
            return 'CheckBoxElView';
        }
        get checked() { return this._val; }
        set checked(v) {
            var el = this.el;
            if (v !== null)
                v = !!v;
            if (v !== this._val) {
                this._val = v;
                if (el)
                    el.checked = !!this._val;

                if (this._val === null) {
                    this.$el.css(css.opacity, 0.33);
                }
                else
                    this.$el.css(css.opacity, 1.0);
                this.raisePropertyChanged(PROP_NAME.checked);
            }
        }
    }

    export class CheckBoxThreeStateElView extends InputElView {
        private _val: boolean;
        private _cbxVal: number;
        protected _init(options: IViewOptions) {
            var self = this;
            super._init(options);
            this._val = this.el.checked;
            this._cbxVal = this._val == null ? 1 : (!!this._val ? 2 : 0);
            var $el = this.$el;
            $el.on('change.' + this._objId, function (e) {
                e.stopPropagation();
                switch (self._cbxVal) {
                    // unchecked, going indeterminate
                    case 0:
                        self._cbxVal = 1;
                        break;
                    // indeterminate, going checked
                    case 1:
                        self._cbxVal = 2;
                        break;
                    // checked, going unchecked
                    default:
                        self._cbxVal = 0;

                }
                self.checked = (self._cbxVal == 1) ? null : ((self._cbxVal == 2) ? true : false);
            });
        }
        protected _setFieldError(isError: boolean) {
            var $el = this.$el;
            if (isError) {
                var div = global.$('<div></div>').addClass(css.fieldError);
                $el.wrap(div);
            }
            else {
                if ($el.parent('.' + css.fieldError).length > 0)
                    $el.unwrap();
            }
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            this.$el.off('.' + this._objId);
            super.destroy();
        }
        toString() {
            return 'CheckBoxThreeStateElView';
        }
        get checked() { return this._val; }
        set checked(v) {
            var $el = this.$el;
            if (v !== this._val) {
                this._val = v;
                switch (this._val) {
                    case null:
                        $el.prop('indeterminate', true);
                        this._cbxVal = 1;
                        break;
                    case true:
                        $el.prop('indeterminate', false);
                        $el.prop('checked', true);
                        this._cbxVal = 2;
                        break;
                    default:
                        $el.prop('indeterminate', false);
                        $el.prop('checked', false);
                        this._cbxVal = 0;
                }
                this.raisePropertyChanged(PROP_NAME.checked);
            }
        }
    }

    export interface ITextBoxOptions extends IViewOptions {
        updateOnKeyUp?: boolean;
    }

    var TXTBOX_EVENTS = {
        keypress: 'keypress'
    };
    export type TKeyPressArgs = { keyCode: number; value: string; isCancel: boolean; };

    export class TextBoxElView extends InputElView {
        protected _init(options: ITextBoxOptions) {
            var self = this;
            super._init(options);
            var $el = this.$el;
            $el.on('change.' + this._objId, function (e) {
                e.stopPropagation();
                self.raisePropertyChanged(PROP_NAME.value);
            });
            $el.on('keypress.' + this._objId, function (e) {
                e.stopPropagation();
                var args: TKeyPressArgs = { keyCode: e.which, value: (<any>e.target).value, isCancel: false };
                self.raiseEvent(TXTBOX_EVENTS.keypress, args);
                if (args.isCancel)
                    e.preventDefault();
            });
            if (!!options.updateOnKeyUp) {
                $el.on('keyup.' + this._objId, function (e) {
                    e.stopPropagation();
                    self.raisePropertyChanged(PROP_NAME.value);
                });
            }
        }
        protected _getEventNames() {
            var base_events = super._getEventNames();
            return [TXTBOX_EVENTS.keypress].concat(base_events);
        }
        addOnKeyPress(fn: (sender: TextBoxElView, args: TKeyPressArgs) => void, nmspace?: string) {
            this._addHandler(TXTBOX_EVENTS.keypress, fn, nmspace);
        }
        removeOnKeyPress(nmspace?: string) {
            this._removeHandler(TXTBOX_EVENTS.keypress, nmspace);
        }
        toString() {
            return 'TextBoxElView';
        }
        get color() {
            var $el = this.$el;
            return $el.css('color');
        }
        set color(v) {
            var $el = this.$el;
            var x = $el.css(css.color);
            if (v !== x) {
                $el.css(css.color, v);
                this.raisePropertyChanged(PROP_NAME.color);
            }
        }
    }

    export class HiddenElView extends InputElView {
        toString() {
            return 'HiddenElView';
        }
    }

    export interface ITextAreaOptions extends ITextBoxOptions {
        rows?: number;
        cols?: number;
        wrap?: string;
    }

    var TXTAREA_EVENTS = {
        keypress: 'keypress'
    };

    export class TextAreaElView extends BaseElView {
        constructor(app: RIAPP.Application, el: HTMLTextAreaElement, options: ITextAreaOptions) {
            super(app, el, options);
        }
        protected _init(options: ITextAreaOptions) {
            super._init(options);
            var self = this;
            if (!!options.rows) {
                this.rows = options.rows;
            }
            if (!!options.cols) {
                this.cols = options.cols;
            }
            if (!!options.wrap) {
                this.wrap = options.wrap;
            }
            var $el = this.$el;
            $el.on('change.' + this._objId, function (e) {
                e.stopPropagation();
                self.raisePropertyChanged(PROP_NAME.value);
            });
            $el.on('keypress.' + this._objId, function (e) {
                e.stopPropagation();
                var args: TKeyPressArgs = { keyCode: e.which, value: (<any>e.target).value, isCancel: false };
                self.raiseEvent(TXTAREA_EVENTS.keypress, args);
                if (args.isCancel)
                    e.preventDefault();
            });
            if (!!options.updateOnKeyUp) {
                $el.on('keyup.' + this._objId, function (e) {
                    e.stopPropagation();
                    self.raisePropertyChanged(PROP_NAME.value);
                });
            }
        }
        protected _getEventNames() {
            var base_events = super._getEventNames();
            return [TXTAREA_EVENTS.keypress].concat(base_events);
        }
        addOnKeyPress(fn: (sender: TextAreaElView, args: TKeyPressArgs) => void, nmspace?: string) {
            this._addHandler(TXTAREA_EVENTS.keypress, fn, nmspace);
        }
        removeOnKeyPress(nmspace?: string) {
            this._removeHandler(TXTAREA_EVENTS.keypress, nmspace);
        }
        toString() {
            return 'TextAreaElView';
        }
        get el() { return <HTMLTextAreaElement>this._el; }
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
                this.raisePropertyChanged(PROP_NAME.value);
            }
        }
        get isEnabled() { return !this.el.disabled; }
        set isEnabled(v: boolean) {
            v = !!v;
            if (v !== this.isEnabled) {
                this.el.disabled = !v;
                this.raisePropertyChanged(PROP_NAME.isEnabled);
            }
        }
        get rows() {
            var el = this.el;
            if (!el)
                return 1;
            return el.rows;
        }
        set rows(v) {
            var el = this.el;
            if (!el)
                return;
            var x = el.rows;
            v = (!v) ? 1 : v;
            if (x !== v) {
                el.rows = v;
                this.raisePropertyChanged(PROP_NAME.rows);
            }
        }
        get cols() {
            var el = this.el;
            if (!el)
                return 1;
            return el.cols;
        }
        set cols(v) {
            var el = this.el;
            if (!el)
                return;
            var x = el.cols;
            v = (!v) ? 1 : v;
            if (x !== v) {
                el.cols = v;
                this.raisePropertyChanged(PROP_NAME.cols);
            }
        }
        get wrap() {
            var el = this.el;
            if (!el)
                return 'off';
            return el.wrap;
        }
        set wrap(v) {
            var el = this.el;
            if (!el)
                return;
            var x = el.wrap, wraps = ['hard', 'off', 'soft'];
            v = (!v) ? 'off' : v;
            if (wraps.indexOf(v) < 0)
                v = 'off';
            if (x !== v) {
                el.wrap = v;
                this.raisePropertyChanged(PROP_NAME.wrap);
            }
        }
    }

    export class RadioElView extends InputElView {
        private _val: boolean;
        protected _init(options: IViewOptions) {
            var self = this;
            super._init(options);
            this._val = this.el.checked;
            this.$el.on('change.' + this._objId, function (e) {
                e.stopPropagation();
                self.checked = this.checked;
                self._updateGroup();
            });
        }
        protected _updateGroup() {
            var groupName = this.el.getAttribute('name'), self = this;
            if (!groupName)
                return;
            var parent = this.el.parentElement;
            if (!parent)
                return;
            var self = this, cur = self.el;
            global.$('input[type="radio"][name="' + groupName + '"]', parent).each(function (index, el) {
                if (cur !== this) {
                    var vw = <RadioElView>self.app._getInternal().getElView(this);
                    if (!!vw) {
                        vw.checked = this.checked;
                    }
                }
            });
        }
        protected _setFieldError(isError: boolean) {
            var $el = this.$el;
            if (isError) {
                var span = global.$('<div></div>').addClass(css.fieldError);
                $el.wrap(span);
            }
            else {
                if ($el.parent('.' + css.fieldError).length > 0)
                    $el.unwrap();
            }
        }
        toString() {
            return 'RadioElView';
        }
        get checked() { return this._val; }
        set checked(v) {
            var el = this.el;
            if (v !== null)
                v = !!v;
            if (v !== this._val) {
                this._val = v;
                if (el)
                    el.checked = !!this._val;

                if (this._val === null) {
                    this.$el.css("opacity", 0.33);
                }
                else
                    this.$el.css(css.opacity, 1.0);
                this.raisePropertyChanged(PROP_NAME.checked);
            }
        }
        get value() { return this.el.value; }
        set value(v) {
            var el = this.el;
            if (!el)
                return;
            var strv = '' + v;
            if (v === null)
                strv = '';
            if (strv !== el.value) {
                el.value = strv;
                this.raisePropertyChanged(PROP_NAME.value);
            }
        }
        get name() { return this.el.name; }
    }

    export interface IButtonOptions extends IViewOptions {
        preventDefault?: boolean;
    }

    export class ButtonElView extends CommandElView {
        private _preventDefault: boolean;
        constructor(app: RIAPP.Application, el: HTMLElement, options: IAncorOptions) {
            this._preventDefault = false;
            super(app, el, options);
        }
        protected _init(options: IButtonOptions) {
            super._init(options);
            var self = this, $el = this.$el;
            if (!!options.preventDefault)
                this._preventDefault = true;

            $el.on('click.' + this._objId, function (e) {
                self._onClick(e);
            });
        }
        protected _onClick(e: Event) {
            if (this._preventDefault)
                e.preventDefault();
            this.invokeCommand();
        }
        toString() {
            return 'ButtonElView';
        }
        get value() {
            if (!this._el)
                return '';
            return this.$el.val();
        }
        set value(v) {
            if (!this._el)
                return;

            var x = this.$el.val();
            if (v === null)
                v = '';
            else
                v = '' + v;
            if (x !== v) {
                this.$el.val(v);
                this.raisePropertyChanged(PROP_NAME.value);
            }
        }
        get text() {
            if (!this._el)
                return '';
            return this.$el.text();
        }
        set text(v) {
            if (!this._el)
                return;

            var x = this.$el.text();
            if (v === null)
                v = '';
            else
                v = '' + v;
            if (x !== v) {
                this.$el.text(v);
                this.raisePropertyChanged(PROP_NAME.text);
            }
        }
        get html() {
            if (!this._el)
                return '';
            return this.$el.html();
        }
        set html(v) {
            if (!this._el)
                return;

            var x = this.$el.html();
            if (v === null)
                v = '';
            else
                v = '' + v;
            if (x !== v) {
                this.$el.html(v);
                this.raisePropertyChanged(PROP_NAME.html);
            }
        }
        get preventDefault() {
            return this._preventDefault;
        }
        set preventDefault(v: boolean) {
            if (this._preventDefault !== v) {
                this._preventDefault = v;
                this.raisePropertyChanged(PROP_NAME.preventDefault);
            }
        }
    }

    export interface IAncorOptions extends IButtonOptions {
        imageSrc?: string;
    }

    export class AnchorElView extends CommandElView {
        private _imageSrc: string;
        private _image: HTMLImageElement;
        private _preventDefault: boolean;
        constructor(app: RIAPP.Application, el: HTMLAnchorElement, options: IAncorOptions) {
            this._imageSrc = null;
            this._image = null;
            this._preventDefault = false;
            super(app, el, options);
        }
        protected _init(options: IAncorOptions) {
            super._init(options);
            var self = this, $el = this.$el;
            if (!!options.imageSrc)
                this.imageSrc = options.imageSrc;
            if (!!options.preventDefault)
                this._preventDefault = true;
            $el.addClass(css.commandLink);
            $el.on('click.' + this._objId, function (e) {
                self._onClick(e);
            });
        }
        protected _onClick(e: Event) {
            if (this._preventDefault)
                e.preventDefault();
            this.invokeCommand();
        }
        protected _updateImage(src: string) {
            var $a = this.$el, $img: any, self = this;
            if (this._imageSrc === src)
                return;
            this._imageSrc = src;
            if (!!this._image && !src) {
                global.$(this._image).remove();
                this._image = null;
            }

            if (!!src) {
                if (!this._image) {
                    self.html = null;
                    $img = global.$(new Image()).attr('src', src).mouseenter(
                        function (e) {
                            if (self.isEnabled)
                                global.$(this).css("opacity", 0.5);
                        }).mouseout(
                        function (e) {
                            if (self.isEnabled)
                                global.$(this).css("opacity", 1.0);
                        }).appendTo($a);
                    this._image = $img.get(0);
                }
                else
                    this._image.src = src;
            }
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            this.$el.removeClass(css.commandLink);
            this.imageSrc = null;
            super.destroy();
        }
        toString() {
            return 'AnchorElView';
        }
        get el() { return <HTMLAnchorElement>this._el; }
        get imageSrc() { return this._imageSrc; }
        set imageSrc(v) {
            if (!this._$el)
                return;
            var x = this._imageSrc;
            if (x !== v) {
                this._updateImage(v);
                this.raisePropertyChanged(PROP_NAME.imageSrc);
            }
        }
        get html() {
            if (!this._el)
                return '';
            return this.$el.html();
        }
        set html(v) {
            if (!this._el)
                return;

            var x = this.$el.html();
            if (v === null)
                v = '';
            else
                v = '' + v;
            if (x !== v) {
                this.$el.html(v);
                this.raisePropertyChanged(PROP_NAME.html);
            }
        }
        get text() {
            if (!this._el)
                return '';
            return this.$el.text();
        }
        set text(v) {
            if (!this._el)
                return;

            var x = this.$el.text();
            if (v === null)
                v = '';
            else
                v = '' + v;
            if (x !== v) {
                this.$el.text(v);
                this.raisePropertyChanged(PROP_NAME.text);
            }
        }
        get href() {
            if (!this._el)
                return '';
            return this.el.href;
        }
        set href(v) {
            if (!this._el)
                return;

            var x = this.href;
            if (v === null)
                v = '';
            else
                v = '' + v;
            if (x !== v) {
                this.el.href = v;
                this.raisePropertyChanged(PROP_NAME.href);
            }
        }
        get preventDefault() {
            return this._preventDefault;
        }
        set preventDefault(v: boolean) {
            if (this._preventDefault !== v) {
                this._preventDefault = v;
                this.raisePropertyChanged(PROP_NAME.preventDefault);
            }
        }
    }

    export interface IExpanderOptions {
        expandedsrc?: string;
        collapsedsrc?: string;
        isExpanded?: boolean;
    }

    export class ExpanderElView extends AnchorElView {
        private _expandedsrc: string;
        private _collapsedsrc: string;
        private _isExpanded: boolean;
        protected _init(options: IExpanderOptions) {
            this._expandedsrc = options.expandedsrc || global.getImagePath('collapse.jpg');
            this._collapsedsrc = options.collapsedsrc || global.getImagePath('expand.jpg');
            this._isExpanded = !!options.isExpanded;
            var opts: IAncorOptions = { imageSrc: this._isExpanded ? this._expandedsrc : this._collapsedsrc };
            super._init(opts);
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            this._expandedsrc = null;
            this._collapsedsrc = null;
            this._isExpanded = false;
            super.destroy();
        }
        protected _onCommandChanged() {
            super._onCommandChanged();
            this.invokeCommand();
        }
        protected _onClick(e: any) {
            var self = this;
            self._isExpanded = !self._isExpanded;
            super._onClick(e);
        }
        invokeCommand() {
            var self = this;
            self.imageSrc = self._isExpanded ? self._expandedsrc : self._collapsedsrc;
            super.invokeCommand();
        }
        toString() {
            return 'ExpanderElView';
        }
        get isExpanded() { return this._isExpanded; }
        set isExpanded(v) {
            if (this._isExpanded !== v) {
                this._isExpanded = v;
                this.invokeCommand();
                this.raisePropertyChanged(PROP_NAME.isExpanded);
            }
        }
    }

    export class SpanElView extends BaseElView {
        toString() {
            return 'SpanElView';
        }
        get text() { return this.$el.text(); }
        set text(v) {
            var $el = this.$el, x = $el.text();
            var str = '' + v;
            v = v === null ? '' : str;
            if (x !== v) {
                $el.text(v);
                this.raisePropertyChanged(PROP_NAME.text);
                this.raisePropertyChanged(PROP_NAME.value);
            }
        }
        get value() { return this.text; }
        set value(v) { this.text = v; }
        get html() { return this.el.innerHTML; }
        set html(v) {
            var x = this.el.innerHTML;
            var str = '' + v;
            v = v === null ? '' : str;
            if (x !== v) {
                this.el.innerHTML = v;
                this.raisePropertyChanged(PROP_NAME.html);
            }
        }
        get color() {
            var $el = this.$el;
            return $el.css('color');
        }
        set color(v) {
            var $el = this.$el;
            var x = $el.css(css.color);
            if (v !== x) {
                $el.css(css.color, v);
                this.raisePropertyChanged(PROP_NAME.color);
            }
        }
        get fontSize() {
            var $el = this.$el;
            return $el.css('font-size');
        }
        set fontSize(v) {
            var $el = this.$el;
            var x = $el.css(css.fontSize);
            if (v !== x) {
                $el.css(css.fontSize, v);
                this.raisePropertyChanged(PROP_NAME.fontSize);
            }
        }
    }

    export class BlockElView extends SpanElView {
        toString() {
            return 'BlockElView';
        }
        get borderColor() {
            var $el = this.$el;
            return $el.css('border-top-color');
        }
        set borderColor(v) {
            var $el = this.$el;
            var x = $el.css('border-top-color');
            if (v !== x) {
                $el.css('border-color', v);
                this.raisePropertyChanged(PROP_NAME.borderColor);
            }
        }
        get borderStyle() {
            var $el = this.$el;
            return $el.css('border-top-style');
        }
        set borderStyle(v) {
            var $el = this.$el;
            var x = $el.css('border-top-style');
            if (v !== x) {
                $el.css('border-style', v);
                this.raisePropertyChanged(PROP_NAME.borderStyle);
            }
        }
        get width() {
            var $el = this.$el;
            return $el.width();
        }
        set width(v) {
            var $el = this.$el;
            var x = $el.width();
            if (v !== x) {
                $el.width(v);
                this.raisePropertyChanged(PROP_NAME.width);
            }
        }
        get height() {
            var $el = this.$el;
            return $el.height();
        }
        set height(v) {
            var $el = this.$el;
            var x = $el.height();
            if (v !== x) {
                $el.height(v);
                this.raisePropertyChanged(PROP_NAME.height);
            }
        }
    }

    export class ImgElView extends BaseElView {
        constructor(app: RIAPP.Application, el: HTMLImageElement, options: IViewOptions) {
            super(app, el, options);
        }
        toString() {
            return 'ImgElView';
        }
        get el() { return <HTMLImageElement>this._el; }
        get src() { return this.el.src; }
        set src(v: string) {
            var x = this.el.src;
            if (x !== v) {
                this.el.src = v;
                this.raisePropertyChanged(PROP_NAME.src);
            }
        }
    }

    global.registerElView('busy_indicator', BusyElView);
    global.registerElView('input:checkbox', CheckBoxElView);
    global.registerElView('threeState', CheckBoxThreeStateElView);
    global.registerElView('input:text', TextBoxElView);
    global.registerElView('input:hidden', HiddenElView);
    global.registerElView('textarea', TextAreaElView);
    global.registerElView('input:radio', RadioElView);
    global.registerElView('input:button', ButtonElView);
    global.registerElView('input:submit', ButtonElView);
    global.registerElView('button', ButtonElView);
    global.registerElView('a', AnchorElView);
    global.registerElView('abutton', AnchorElView);
    global.registerElView('expander', ExpanderElView);
    global.registerElView('span', SpanElView);
    global.registerElView('div', BlockElView);
    global.registerElView('section', BlockElView);
    global.registerElView('block', BlockElView);
    global.registerElView('img', ImgElView);

    _isModuleLoaded = true;
}
