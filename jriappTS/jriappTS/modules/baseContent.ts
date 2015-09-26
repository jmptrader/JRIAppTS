namespace RIAPP.MOD.baseContent {
    import constsMOD = RIAPP.consts;
    import utilsMOD = RIAPP.MOD.utils;
    import parserMOD = RIAPP.MOD.parser;
    import elviewMOD = RIAPP.MOD.baseElView;
    import bindMOD = RIAPP.MOD.binding;
    import templMOD = RIAPP.MOD.template;

    var utils: utilsMOD.Utils, parser: parserMOD.Parser;
    RIAPP.global.addOnInitialize((s, args) => {
        utils = s.utils;
        parser = s.parser;
    });
    export var css = {
        content: 'ria-content-field',
        required: 'ria-required-field'
    };

    //it can have two template ids - one for display and one for editing
    export interface ITemplateInfo {
        displayID?: string;
        editID?: string;
    }

    export interface IContent {
        isEditing: boolean;
        dataContext: any;
        destroy(): void;
    }

    export interface IExternallyCachable {
        addOnObjectCreated(fn: (sender: any, args: { objectKey: string; object: RIAPP.BaseObject; isCachedExternally: boolean; }) => void, nmspace?: string): void;
        addOnObjectNeeded(fn: (sender: any, args: { objectKey: string; object: RIAPP.BaseObject; }) => void, nmspace?: string): void;
    }

    export interface IContentOptions {
        name?: string;
        readOnly?: boolean;
        initContentFn?: (content: IExternallyCachable) => void;
        fieldInfo?: IFieldInfo;
        bindingInfo?: bindMOD.IBindingInfo;
        displayInfo?: { displayCss?: string; editCss?: string; };
        templateInfo?: ITemplateInfo;
        fieldName?: string;
        options?: any;
    }

    export interface IConstructorContentOptions {
        parentEl: HTMLElement;
        contentOptions: IContentOptions;
        dataContext: any;
        isEditing: boolean;
    }

    export interface IContentType {
        new (app: RIAPP.Application, options: IConstructorContentOptions): IContent;
    }

    export interface IContentFactory {
        getContentType(options: IContentOptions): IContentType;
        createContent(options: IConstructorContentOptions): IContent;
        isExternallyCachable(contentType: IContentType): boolean;
    }

    //the result of parsing of the data-content attribute
    export interface IDataContentAttr {
        fieldName?: string;
        readOnly?: boolean;
        css?: { displayCss: string; editCss: string; };
        template?: ITemplateInfo;
        name?: string;
        options?: any;
    }

    export function parseContentAttr(content_attr: string): IContentOptions {
        var contentOptions: IContentOptions = {
            name: null,
            templateInfo: null,
            bindingInfo: null,
            displayInfo: null,
            fieldName: null,
            options: null
        };

        var attr: IDataContentAttr, temp_opts = parser.parseOptions(content_attr);
        if (temp_opts.length === 0)
            return contentOptions;
        attr = temp_opts[0];
        if (!attr.template && !!attr.fieldName) {
            var bindInfo: bindMOD.IBindingInfo = {
                target: null, source: null,
                targetPath: null, sourcePath: attr.fieldName,
                mode: "OneWay",
                converter: null, converterParam: null
            };

            contentOptions.bindingInfo = bindInfo;
            contentOptions.displayInfo = attr.css;
            contentOptions.fieldName = attr.fieldName;
            if (!!attr.name)
                contentOptions.name = attr.name;
            if (!!attr.options)
                contentOptions.options = attr.options;
            if (attr.readOnly !== undefined)
                contentOptions.readOnly = utils.parseBool(attr.readOnly);
        }
        else if (!!attr.template) {
            contentOptions.templateInfo = attr.template;
            delete attr.template;
        }
        return contentOptions;
    };

   
    export class BindingContent extends RIAPP.BaseObject implements IContent {
        protected _parentEl: HTMLElement;
        protected _el: HTMLElement;
        protected _options: IContentOptions;
        protected _isReadOnly: boolean;
        private _isEditing: boolean;
        protected _dataContext: any;
        protected _lfScope: utilsMOD.LifeTimeScope;
        //the target of the data binding
        protected _target: elviewMOD.BaseElView;
        protected _app: RIAPP.Application;

        constructor(app: RIAPP.Application, options: IConstructorContentOptions) {
            super();
            options = utils.extend(false,
                {
                    app: null,
                    parentEl: null,
                    options: null,
                    dataContext: null,
                    isEditing: false
                }, options);
            this._el = null;
            this._app = app;
            this._parentEl = options.parentEl;
            this._isEditing = !!options.isEditing;
            this._dataContext = options.dataContext;
            this._options = options.contentOptions;
            this._isReadOnly = !!this._options.readOnly;
            this._lfScope = null;
            this._target = null;
            var $p = global.$(this._parentEl);
            $p.addClass(css.content);
            this.init();
            this.render();
        }
        handleError(error: any, source: any): boolean {
            var isHandled = super.handleError(error, source);
            if (!isHandled) {
                return this._app.handleError(error, source);
            }
            return isHandled;
        }
        protected init() { }
        protected updateCss() {
            var displayInfo = this._options.displayInfo, $p = global.$(this._parentEl), fieldInfo = this.getFieldInfo();
            if (this._isEditing && this.getIsCanBeEdited()) {
                if (!!displayInfo) {
                    if (!!displayInfo.editCss) {
                        $p.addClass(displayInfo.editCss);
                    }
                    if (!!displayInfo.displayCss) {
                        $p.removeClass(displayInfo.displayCss);
                    }
                }
                if (!!fieldInfo && !fieldInfo.isNullable) {
                    $p.addClass(css.required);
                }
            }
            else {
                if (!!displayInfo) {
                    if (!!displayInfo.displayCss) {
                        $p.addClass(displayInfo.displayCss);
                    }
                    if (!!displayInfo.editCss) {
                        $p.removeClass(displayInfo.editCss);
                    }
                    if (!!fieldInfo && !fieldInfo.isNullable) {
                        $p.removeClass(css.required);
                    }
                }
            }
        }
        protected getIsCanBeEdited() {
            if (this._isReadOnly)
                return false;
            var finf = this.getFieldInfo();
            if (!finf)
                return false;
            var editable = utils.getEditable(this._dataContext);
            return !!editable && !finf.isReadOnly && finf.fieldType != constsMOD.FIELD_TYPE.Calculated;
        }
        protected createTargetElement(): elviewMOD.BaseElView {
            var el: HTMLElement, doc = global.document, info: { name: string; options: any; } = { name: null, options: null };
            if (this._isEditing && this.getIsCanBeEdited()) {
                el = doc.createElement('input');
                el.setAttribute('type', 'text');
                info.options = this._options.options;
            }
            else {
                el = doc.createElement('span');
            }
            this.updateCss();
            this._el = el;
            return this.getElementView(this._el, info);
        }
        protected getBindingOption(bindingInfo: bindMOD.IBindingInfo, target: RIAPP.BaseObject, dataContext: any, targetPath: string) {
            var options = bindMOD.getBindingOptions(this.app, bindingInfo, target, dataContext);
            if (this.isEditing && this.getIsCanBeEdited())
                options.mode = bindMOD.BINDING_MODE.TwoWay;
            else
                options.mode = bindMOD.BINDING_MODE.OneWay;
            if (!!targetPath)
                options.targetPath = targetPath;
            return options;
        }
        protected getBindings(): bindMOD.Binding[] {
            if (!this._lfScope)
                return [];
            var arr = this._lfScope.getObjs(), res: bindMOD.Binding[] = [];
            for (var i = 0, len = arr.length; i < len; i += 1) {
                if (bindMOD._isBinding(arr[i]))
                    res.push(<bindMOD.Binding>arr[i]);
            }
            return res;
        }
        protected updateBindingSource() {
            var i: number, len: number, binding: bindMOD.Binding, bindings = this.getBindings();
            for (i = 0, len = bindings.length; i < len; i += 1) {
                binding = bindings[i];
                if (!binding.isSourceFixed)
                    binding.source = this._dataContext;
            }
        }
        protected cleanUp() {
            if (!!this._lfScope) {
                this._lfScope.destroy();
                this._lfScope = null;
            }
            if (!!this._el) {
                utils.removeNode(this._el);
                this._el = null;
            }
            this._target = null;
        }
        protected getElementView(el: HTMLElement, view_info: { name: string; options: any; }): elviewMOD.BaseElView {
            var elView = this.app._getInternal().getElView(el);
            if (!!elView)
                return elView;
            return this.app._getInternal().createElementView(el, view_info);
        }
        protected getFieldInfo() {
            return this._options.fieldInfo;
        }
        protected render() {
            try {
                this.cleanUp();
                var bindingInfo = this._options.bindingInfo;
                if (!!bindingInfo) {
                    this._target = this.createTargetElement();
                    this._lfScope = new utilsMOD.LifeTimeScope();
                    if (!!this._target)
                        this._lfScope.addObj(this._target);
                    var options = this.getBindingOption(bindingInfo, this._target, this._dataContext, 'value');
                    this._parentEl.appendChild(this._el);
                    this._lfScope.addObj(this.app.bind(options));
                }
            }
            catch (ex) {
                RIAPP.reThrow(ex, this.handleError(ex, this));
            }
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            var displayInfo = this._options.displayInfo, $p = global.$(this._parentEl);
            $p.removeClass(css.content);
            $p.removeClass(css.required);
            if (!!displayInfo && !!displayInfo.displayCss) {
                $p.removeClass(displayInfo.displayCss);
            }
            if (!!displayInfo && !!displayInfo.editCss) {
                $p.removeClass(displayInfo.editCss);
            }
            this.cleanUp();
            this._parentEl = null;
            this._dataContext = null;
            this._options = null;
            this._app = null;
            super.destroy();
        }
        toString() {
            return 'BindingContent';
        }
        get parentEl() { return this._parentEl; }
        get target() { return this._target; }
        get isEditing() { return this._isEditing; }
        set isEditing(v) {
            if (this._isEditing !== v) {
                this._isEditing = v;
                this.render();
            }
        }
        get dataContext() { return this._dataContext; }
        set dataContext(v) {
            if (this._dataContext !== v) {
                this._dataContext = v;
                this.updateBindingSource();
            }
        }
        get app() { return this._app; }
    }

    export class TemplateContent extends RIAPP.BaseObject implements IContent, templMOD.ITemplateEvents {
        private _parentEl: HTMLElement;
        private _template: templMOD.Template;
        private _templateInfo: ITemplateInfo;
        private _isEditing: boolean;
        private _dataContext: any;
        private _app: RIAPP.Application;
        private _isDisabled: boolean;
        private _templateID: string;

        constructor(app: RIAPP.Application, options: IConstructorContentOptions) {
            super();
            options = utils.extend(false,
                {
                    app: null,
                    parentEl: null,
                    options: null,
                    dataContext: null,
                    isEditing: false
                }, options);
            this._app = app;
            this._templateID = null;
            this._parentEl = options.parentEl;
            this._isEditing = options.isEditing;
            this._dataContext = options.dataContext;
            this._templateInfo = options.contentOptions.templateInfo;
            this._template = null;
            var $p = global.$(this._parentEl);
            $p.addClass(css.content);
            this.render();
        }
        handleError(error: any, source: any): boolean {
            var isHandled = super.handleError(error, source);
            if (!isHandled) {
                return this._app.handleError(error, source);
            }
            return isHandled;
        }
        templateLoading(template: templMOD.Template): void {
            //noop
        }
        templateLoaded(template: templMOD.Template): void {
            //noop
        }
        templateUnLoading(template: templMOD.Template): void {
            this._parentEl.removeChild(template.el);
        }
        private getTemplateID() {
            if (!this._templateInfo) {
                throw new Error(RIAPP.ERRS.ERR_TEMPLATE_ID_INVALID);
            }
            var info = this._templateInfo, id = info.displayID;
            if (this._isEditing && !!info.editID) {
                id = info.editID;
            }

            if (!id) {
                id = info.editID;
            }

            if (!id)
                throw new Error(RIAPP.ERRS.ERR_TEMPLATE_ID_INVALID);
            return id;
        }
        private createTemplate(): templMOD.Template {
            return new templMOD.Template({
                app: this.app,
                templateID: this._templateID,
                dataContext: this._dataContext,
                templEvents: this
            });
        }
        protected render() {
            try {
                var id = this.getTemplateID();
                if (this._templateID !== id) {
                    this.cleanUp();
                    this._templateID = id;
                    this._template = this.createTemplate();
                    this._parentEl.appendChild(this._template.el);
                }
            } catch (ex) {
                RIAPP.reThrow(ex, this.handleError(ex, this));
            }
        }
        protected cleanUp() {
            if (!!this._template) {
                this._template.destroy();
                this._template = null;
                this._templateID = null;
            }
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            var $p = global.$(this._parentEl);
            $p.removeClass(css.content);
            this.cleanUp();
            this._parentEl = null;
            this._dataContext = null;
            this._templateInfo = null;
            this._app = null;
            super.destroy();
        }
        toString() {
            return 'TemplateContent';
        }
        get app() { return this._app; }
        get parentEl() { return this._parentEl; }
        get template() { return this._template; }
        get isEditing() { return this._isEditing; }
        set isEditing(v) {
            if (this._isEditing !== v) {
                this._isEditing = v;
                this.render();
            }
        }
        get dataContext() { return this._dataContext; }
        set dataContext(v) {
            if (this._dataContext !== v) {
                this._dataContext = v;
                if (!!this._template) {
                    this._template.dataContext = this._dataContext;
                }
            }
        }
    }

    export class BoolContent extends BindingContent {
        protected init() {
            this._target = this.createTargetElement();
            var bindingInfo = this._options.bindingInfo;
            if (!!bindingInfo) {
                this.updateCss();
                this._lfScope = new utilsMOD.LifeTimeScope();
                var options = this.getBindingOption(bindingInfo, this._target, this._dataContext, 'checked');
                options.mode = bindMOD.BINDING_MODE.TwoWay;
                this._lfScope.addObj(this.app.bind(options));
            }
        }
        protected cleanUp() {
            //override base method
            return;
        }
        protected createCheckBoxView() {
            var el = global.document.createElement('input');
            el.setAttribute('type', 'checkbox');
            var chbxView = new elviewMOD.CheckBoxElView(this.app, el, {});
            return chbxView;
        }
        protected createTargetElement(): elviewMOD.BaseElView {
            var tgt = this._target;
            if (!tgt) {
                tgt = this.createCheckBoxView();
                this._el = tgt.el;
            }
            this._parentEl.appendChild(this._el);
            return tgt;
        }
        protected updateCss() {
            super.updateCss();
            var el = <HTMLInputElement>this._el;
            if (this.isEditing && this.getIsCanBeEdited()) {
                if (el.disabled)
                    el.disabled = false;
            }
            else {
                if (!el.disabled)
                    el.disabled = true;
            }
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            if (!!this._lfScope) {
                this._lfScope.destroy();
                this._lfScope = null;
            }
            if (!!this._target) {
                this._target.destroy();
                this._target = null;
            }
            super.destroy();
        }
        render() {
            this.cleanUp();
            this.updateCss();
        }
        toString() {
            return 'BoolContent';
        }
    }

    export class DateContent extends BindingContent {
        constructor(app: RIAPP.Application, options: IConstructorContentOptions) {
            if (options.contentOptions.name != 'datepicker') {
                throw new Error(utils.format(RIAPP.ERRS.ERR_ASSERTION_FAILED, "contentOptions.name == 'datepicker'"));
            }
            super(app, options);
        }
        protected getBindingOption(bindingInfo: bindMOD.IBindingInfo, tgt: RIAPP.BaseObject, dctx: any, targetPath: string) {
            var options = super.getBindingOption(bindingInfo, tgt, dctx, targetPath);
            options.converter = this.app.getConverter('dateConverter');
            return options;
        }
        protected createTargetElement(): elviewMOD.BaseElView {
            var el: HTMLElement, doc = global.document, info: { name: string; options: any; } = { name: null, options: null };
            if (this.isEditing && this.getIsCanBeEdited()) {
                el = doc.createElement('input');
                el.setAttribute('type', 'text');
                info.options = this._options.options;
                info.name = 'datepicker';
            }
            else {
                el = doc.createElement('span');
            }
            this.updateCss();
            this._el = el;
            return this.getElementView(this._el, info);
        }
        toString() {
            return 'DateContent';
        }
    }

    export class DateTimeContent extends BindingContent {
        protected getBindingOption(bindingInfo: bindMOD.IBindingInfo, tgt: RIAPP.BaseObject, dctx: any, targetPath: string) {
            var options = super.getBindingOption(bindingInfo, tgt, dctx, targetPath);
            options.converter = this.app.getConverter('dateTimeConverter');
            var finf = this.getFieldInfo(), defaults = global.defaults;
            switch (finf.dataType) {
                case consts.DATA_TYPE.DateTime:
                    options.converterParam = defaults.dateTimeFormat;
                    break;
                case consts.DATA_TYPE.Date:
                    options.converterParam = defaults.dateFormat;
                    break;
                case consts.DATA_TYPE.Time:
                    options.converterParam = defaults.timeFormat;
                    break;
                default:
                    options.converterParam = null;
                    break;
            }
            return options;
        }
        toString() {
            return 'DateTimeContent';
        }
    }

    export class NumberContent extends BindingContent {
        static __allowedKeys: number[] = null;
        private get _allowedKeys() {
            if (!NumberContent.__allowedKeys) {
                NumberContent.__allowedKeys = [0, constsMOD.KEYS.backspace, constsMOD.KEYS.del, constsMOD.KEYS.left, constsMOD.KEYS.right, constsMOD.KEYS.end, constsMOD.KEYS.home, constsMOD.KEYS.tab, constsMOD.KEYS.esc, constsMOD.KEYS.enter];
            }
            return NumberContent.__allowedKeys;
        }
        protected getBindingOption(bindingInfo: bindMOD.IBindingInfo, tgt: RIAPP.BaseObject, dctx: any, targetPath: string) {
            var options = super.getBindingOption(bindingInfo, tgt, dctx, targetPath);
            var finf = this.getFieldInfo();
            switch (finf.dataType) {
                case consts.DATA_TYPE.Integer:
                    options.converter = this.app.getConverter('integerConverter');
                    break;
                case consts.DATA_TYPE.Decimal:
                    options.converter = this.app.getConverter('decimalConverter');
                    break;
                default:
                    options.converter = this.app.getConverter('floatConverter');
                    break;
            }
            return options;
        }
        protected render() {
            super.render();
            var self = this;
            if (self._target instanceof elviewMOD.TextBoxElView) {
                (<elviewMOD.TextBoxElView>self._target).addOnKeyPress(function (sender, args) {
                    args.isCancel = !self.previewKeyPress(args.keyCode, args.value);
                });
            }
        }
        protected previewKeyPress(keyCode: number, value: string) {
            var ch = String.fromCharCode(keyCode), digits = "1234567890", defaults = global.defaults, notAllowedChars = "~@#$%^&*()+=_";
            if (notAllowedChars.indexOf(ch) > -1)
                return false;
            if (this._allowedKeys.indexOf(keyCode) > -1)
                return true;
            if (ch === "-" && value.length === 0)
                return true;
            if (ch === defaults.decimalPoint) {
                if (value.length === 0)
                    return false;
                else
                    return value.indexOf(ch) < 0;
            }
            if (ch === defaults.thousandSep)
                return true
            else
                return digits.indexOf(ch) > -1;
        }
        toString() {
            return 'NumberContent';
        }
    }

    export class StringContent extends BindingContent {
        static __allowedKeys: number[] = null;
        private get _allowedKeys() {
            if (!StringContent.__allowedKeys) {
                StringContent.__allowedKeys = [0, constsMOD.KEYS.backspace, constsMOD.KEYS.del, constsMOD.KEYS.left, constsMOD.KEYS.right, constsMOD.KEYS.end, constsMOD.KEYS.home, constsMOD.KEYS.tab, constsMOD.KEYS.esc, constsMOD.KEYS.enter];
            }
            return StringContent.__allowedKeys;
        }
        protected render() {
            super.render();
            var self = this, fieldInfo = self.getFieldInfo();
            if (self._target instanceof elviewMOD.TextBoxElView) {
                (<elviewMOD.TextBoxElView>self._target).addOnKeyPress(function (sender, args) {
                    args.isCancel = !self.previewKeyPress(fieldInfo, args.keyCode, args.value);
                });
            }
        }
        protected previewKeyPress(fieldInfo: IFieldInfo, keyCode: number, value: string) {
            if (this._allowedKeys.indexOf(keyCode) > -1)
                return true;
            return !(fieldInfo.maxLength > 0 && value.length >= fieldInfo.maxLength);
        }
        toString() {
            return 'StringContent';
        }

    }

    export class MultyLineContent extends BindingContent {
        static __allowedKeys: number[] = null;
        private get _allowedKeys() {
            if (!MultyLineContent.__allowedKeys) {
                MultyLineContent.__allowedKeys = [0, constsMOD.KEYS.backspace, constsMOD.KEYS.del, constsMOD.KEYS.left, constsMOD.KEYS.right, constsMOD.KEYS.end, constsMOD.KEYS.home, constsMOD.KEYS.tab, constsMOD.KEYS.esc, constsMOD.KEYS.enter];
            }
            return MultyLineContent.__allowedKeys;
        }
        constructor(app: RIAPP.Application, options: IConstructorContentOptions) {
            if (options.contentOptions.name != 'multyline') {
                throw new Error(utils.format(RIAPP.ERRS.ERR_ASSERTION_FAILED, "contentOptions.name == 'multyline'"));
            }
            super(app, options);
        }
        protected createTargetElement(): elviewMOD.BaseElView {
            var el: HTMLElement, info: { name: string; options: any; } = { name: null, options: null };
            if (this.isEditing && this.getIsCanBeEdited()) {
                el = global.document.createElement('textarea');
                info.options = this._options.options;
                info.name = null;
            }
            else {
                el = global.document.createElement('div');
            }
            this.updateCss();
            this._el = el;
            return this.getElementView(this._el, info);
        }
        protected render() {
            super.render();
            var self = this, fieldInfo = self.getFieldInfo();

            if (self._target instanceof elviewMOD.TextAreaElView) {
                (<elviewMOD.TextAreaElView>self._target).addOnKeyPress(function (sender, args) {
                    args.isCancel = !self.previewKeyPress(fieldInfo, args.keyCode, args.value);
                });
            }
        }
        protected previewKeyPress(fieldInfo: IFieldInfo, keyCode: number, value: string) {
            if (this._allowedKeys.indexOf(keyCode) > -1)
                return true;
            return !(fieldInfo.maxLength > 0 && value.length >= fieldInfo.maxLength);
        }
        toString() {
            return 'MultyLineContent';
        }
    }

    //base content factory
    export class ContentFactory implements IContentFactory {
        private _app: RIAPP.Application;
        private _nextFactory: IContentFactory;

        constructor(app: RIAPP.Application, nextFactory?: IContentFactory) {
            this._app = app;
            this._nextFactory = nextFactory;
        }
        getContentType(options: IContentOptions): IContentType {
            if (!!options.templateInfo) {
                return TemplateContent;
            }
            if (!options.bindingInfo) {
                throw new Error(utils.format(RIAPP.ERRS.ERR_PARAM_INVALID, 'options', 'bindingInfo'));
            }

            var fieldInfo = options.fieldInfo, res: IContentType;
            switch (fieldInfo.dataType) {
                case consts.DATA_TYPE.None:
                    res = BindingContent;
                    break;
                case consts.DATA_TYPE.String:
                    if (options.name == 'multyline')
                        res = MultyLineContent;
                    else
                        res = StringContent;
                    break;
                case consts.DATA_TYPE.Bool:
                    res = BoolContent;
                    break;
                case consts.DATA_TYPE.Integer:
                    res = NumberContent;
                    break;
                case consts.DATA_TYPE.Decimal:
                case consts.DATA_TYPE.Float:
                    res = NumberContent;
                    break;
                case consts.DATA_TYPE.DateTime:
                case consts.DATA_TYPE.Time:
                    res = DateTimeContent;
                    break;
                case consts.DATA_TYPE.Date:
                    if (options.name == 'datepicker')
                        res = DateContent;
                    else
                        res = DateTimeContent;
                    break;
                case consts.DATA_TYPE.Guid:
                case consts.DATA_TYPE.Binary:
                    res = BindingContent;
                    break;
                default:
                    throw new Error(utils.format(RIAPP.ERRS.ERR_FIELD_DATATYPE, fieldInfo.dataType));
            }
            if (!res && this._nextFactory) {
                res = this._nextFactory.getContentType(options);
            }
            if (!res)
                throw new Error(RIAPP.ERRS.ERR_BINDING_CONTENT_NOT_FOUND);
            return res;
        }
        createContent(options: IConstructorContentOptions): IContent {
            var contentType = this.getContentType(options.contentOptions);
            return new contentType(this.app, options);
        }
        isExternallyCachable(contentType: IContentType): boolean {
            return false;
        }
        get app() { return this._app; }
    }
    export type TFactoryGetter = (nextFactory?: IContentFactory) => IContentFactory;

    export class FactoryList implements IContentFactory {
        private _list: TFactoryGetter[];
        private _factory: IContentFactory;

        constructor(app: Application) {
            this._list = [];
            this._factory = null;
            this.addFactory((nextFactory?: IContentFactory) => {
                return new ContentFactory(app, nextFactory);
            });
        }
        addFactory(fn: TFactoryGetter) {
            this._list.push(fn);
        }
        init(): void {
            var nextFactory: IContentFactory = null;
            this._list.forEach((getFactory) => {
                nextFactory = getFactory(nextFactory);
            });
            this._factory = nextFactory;
        }
        getContentType(options: IContentOptions): IContentType {
            if (!this._factory)
                this.init();
            return this._factory.getContentType(options);
        }
        createContent(options: IConstructorContentOptions): IContent {
            if (!this._factory)
                this.init();
            return this._factory.createContent(options);
        }
        isExternallyCachable(contentType: IContentType): boolean {
            if (!this._factory)
                this.init();
            return this._factory.isExternallyCachable(contentType);
        }
    }

    _isModuleLoaded = true;
}
