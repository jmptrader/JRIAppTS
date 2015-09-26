namespace RIAPP.MOD.tabs {
    import mvvmMOD = RIAPP.MOD.mvvm;
    import elviewMOD = MOD.baseElView;

    var PROP_NAME = {
        tabIndex: 'tabIndex',
        tabsEvents: 'tabsEvents'
    };

    export interface ITabs {
        uniqueID: string;
        el: HTMLElement;
        tabIndex: number;
        isVisible: boolean;
        css: string;
    }

    export interface ITabsEvents {
        addTabs(tabs: ITabs): void;
        removeTabs(): void;
        onTabSelected(tabs: ITabs): void;
    }

    export class TabsElView extends elviewMOD.BaseElView implements ITabs {
        private _tabOpts: any;
        private _tabsEvents: ITabsEvents;
        private _tabsCreated: boolean;

        protected _init(options: any) {
            super._init(options);
            this._tabOpts = options;
            this._tabsEvents = null;
            this._tabsCreated = false;
            this._createTabs();
        }
        protected _createTabs() {
            var $el = this.$el, self = this, tabOpts = {
                activate: function (e: any, tab: any) {
                    if (!!self._tabsEvents) {
                        self._tabsEvents.onTabSelected(self);
                    }
                    self.raisePropertyChanged(PROP_NAME.tabIndex);
                }
            };
            tabOpts = RIAPP.global.utils.extend(false, tabOpts, self._tabOpts);
            (<any>$el).tabs(tabOpts);
            setTimeout(() => {
                if (self.getIsDestroyCalled())
                    return;
                self._tabsCreated = true;
                self._onTabsCreated();
                self.raisePropertyChanged(PROP_NAME.tabIndex);
            }, 100);
        }
        protected _destroyTabs() {
            var $el = this.$el;
            RIAPP.global.utils.destroyJQueryPlugin($el, 'tabs');
            this._tabsCreated = false;
            if (!!this._tabsEvents) {
                this._tabsEvents.removeTabs();
            }

        }
        protected _onTabsCreated() {
            var self = this, $el = self.$el;
            if (!!self._tabsEvents) {
                self._tabsEvents.addTabs(self);
            }
            if (!!self._tabsEvents) {
                self._tabsEvents.onTabSelected(self);
            }
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            this._destroyTabs();
            this._tabsEvents = null;
            super.destroy();
        }
        toString() {
            return 'TabsElView';
        }
        get tabsEvents() { return this._tabsEvents; }
        set tabsEvents(v) {
            var old = this._tabsEvents;
            if (v !== old) {
                if (!!old)
                    old.removeTabs();
                this._tabsEvents = v;
                this.raisePropertyChanged(PROP_NAME.tabsEvents);
                if (this._tabsCreated) {
                    this._onTabsCreated();
                }
            }
        }
        get tabIndex(): number {
            return (<any>this.$el).tabs("option", "active");
        }
        set tabIndex(v: number) {
            (<any>this.$el).tabs("option", "active", v);
        }
    }


    global.registerElView('tabs', TabsElView);
    _isModuleLoaded = true;
}
