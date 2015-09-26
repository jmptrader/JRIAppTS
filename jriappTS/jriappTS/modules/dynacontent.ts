namespace RIAPP.MOD.dynacontent {
    import constsMOD = RIAPP.consts;
    import utilsMOD = RIAPP.MOD.utils;
    import elviewMOD = RIAPP.MOD.baseElView;
    import templMOD = RIAPP.MOD.template;

    var utils: utilsMOD.Utils, global = RIAPP.global;
    global.addOnInitialize((s, args) => {
        utils = s.utils;
    });

    export interface IAnimation {
        beforeShow(template: templMOD.Template, isFirstShow: boolean): void;
        show(template: templMOD.Template, isFirstShow: boolean): RIAPP.IVoidPromise;
        beforeHide(template: templMOD.Template): void;
        hide(template: templMOD.Template): RIAPP.IVoidPromise;
        stop(): void;
        isAnimateFirstShow: boolean;
    }

    export interface IDynaContentOptions extends elviewMOD.IViewOptions {
        animate?: string;
    }

    var PROP_NAME = {
        template: 'template',
        templateID: 'templateID',
        dataContext: 'dataContext',
        animation: 'animation'
    };

    export class DynaContentElView extends elviewMOD.BaseElView implements templMOD.ITemplateEvents {
        private _dataContext: any;
        private _prevTemplateID: string;
        private _templateID: string;
        private _template: templMOD.Template;
        private _animation: IAnimation;

        constructor(app: RIAPP.Application, el: HTMLElement, options: IDynaContentOptions) {
            super(app, el, options);
            this._dataContext = null;
            this._prevTemplateID = null;
            this._templateID = null;
            this._template = null;
            this._animation = null;
        }
        templateLoading(template: templMOD.Template): void {
            if (this._isDestroyCalled)
                return;
            var isFirstShow = !this._prevTemplateID,
                canShow = !!this._animation && (this._animation.isAnimateFirstShow || (!this._animation.isAnimateFirstShow && !isFirstShow));
            if (canShow) {
                this._animation.beforeShow(template, isFirstShow);
            }
        }
        templateLoaded(template: templMOD.Template): void {
            if (this._isDestroyCalled)
                return;
            if (!utils.isContained(template.el, this.el)) {
                this.el.appendChild(template.el);
            }

            var isFirstShow = !this._prevTemplateID,
                canShow = !!this._animation && (this._animation.isAnimateFirstShow || (!this._animation.isAnimateFirstShow && !isFirstShow));
            if (canShow) {
                this._animation.show(template, isFirstShow);
            }
        }
        templateUnLoading(template: templMOD.Template): void {
            //noop
        }
        private _templateChanging(oldName: string, newName: string) {
            var self = this;
            try {
                if (!newName && !!this._template) {
                    if (!!this._animation && !!this._template.loadedElem) {
                        this._animation.stop();
                        this._animation.beforeHide(this._template);
                        this._animation.hide(this._template).always(() => {
                            if (self._isDestroyCalled)
                                return;
                            self._template.destroy();
                            self._template = null;
                            self.raisePropertyChanged(PROP_NAME.template);

                        });
                    }
                    else {
                        self._template.destroy();
                        self._template = null;
                        self.raisePropertyChanged(PROP_NAME.template);
                    }
                    return;
                }
            } catch (ex) {
                this.handleError(ex, this);
                RIAPP.throwDummy(ex);
            }

            try {
                if (!this._template) {
                    this._template = new templMOD.Template(
                        {
                            app: this.app,
                            templateID: newName,
                            dataContext: this._dataContext,
                            templEvents: this
                        });
                    self.raisePropertyChanged(PROP_NAME.template);
                    return;
                }
                if (!!this._animation && !!this._template.loadedElem) {
                    this._animation.stop();
                    this._animation.beforeHide(this._template);
                    this._animation.hide(this._template).always(() => {
                        if (self._isDestroyCalled)
                            return;
                        self._template.templateID = newName;
                    });
                }
                else
                    self._template.templateID = newName;
            } catch (ex) {
                this.handleError(ex, this);
                RIAPP.throwDummy(ex);
            }
        }
        destroy() {
            if (this._isDestroyed)
                return
            this._isDestroyCalled = true;
            if (!!this._animation) {
                if (utils.check.isBaseObj(this._animation)) {
                    (<RIAPP.BaseObject><any>this._animation).destroy();
                }
                this._animation = null;
            }
            if (!!this._template) {
                this._template.destroy();
                this._template = null;
            }
            this._dataContext = null;
            super.destroy();
        }
        get template() { return this._template; }

        get templateID() {
            return this._templateID;
        }
        set templateID(v: string) {
            var old = this._templateID;
            if (old !== v) {
                this._prevTemplateID = this._templateID;
                this._templateID = v;
                this._templateChanging(old, v);
                this.raisePropertyChanged(PROP_NAME.templateID);
            }
        }
        get dataContext() { return this._dataContext; }
        set dataContext(v) {
            if (this._dataContext !== v) {
                this._dataContext = v;
                if (!!this._template) {
                    this._template.dataContext = this._dataContext;
                }
                this.raisePropertyChanged(PROP_NAME.dataContext);
            }
        }
        get animation() { return this._animation; }
        set animation(v) {
            if (this._animation !== v) {
                this._animation = v;
                this.raisePropertyChanged(PROP_NAME.animation);
            }
        }
    }

    global.registerElView('dynacontent', DynaContentElView);
    _isModuleLoaded = true;
}
