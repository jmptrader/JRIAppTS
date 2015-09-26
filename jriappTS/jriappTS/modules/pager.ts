namespace RIAPP.MOD.pager {
    import utilsMOD = RIAPP.MOD.utils;
    import collMOD = RIAPP.MOD.collection;
    import elviewMOD = RIAPP.MOD.baseElView;

    var utils: utilsMOD.Utils;
    RIAPP.global.addOnInitialize((s, args) => {
        utils = s.utils;
    });
    export var css = {
        pager: 'ria-data-pager',
        info: 'pager-info',
        currentPage: 'pager-current-page',
        otherPage: 'pager-other-page'
    };
    var PAGER_TXT = RIAPP.localizable.PAGER;

    export interface IPagerOptions {
        showTip?: boolean;
        showInfo?: boolean;
        showNumbers?: boolean;
        showFirstAndLast?: boolean;
        showPreviousAndNext?: boolean;
        useSlider?: boolean;
        hideOnSinglePage?: boolean;
        sliderSize?: number;
    }

    export interface IPagerConstructorOptions extends IPagerOptions {
        app: Application;
        el: HTMLElement;
        dataSource: collMOD.BaseCollection<collMOD.ICollectionItem>;
    }

    var PROP_NAME = {
        dataSource: 'dataSource',
        rowCount: 'rowCount',
        currentPage: 'currentPage',
        pager: 'pager'
    };

    export class Pager extends RIAPP.BaseObject {
        private _$el: JQuery;
        private _objId: string;
        private _options: IPagerConstructorOptions;
        private _rowsPerPage: number;
        private _rowCount: number;
        private _currentPage: number;

        constructor(options: IPagerConstructorOptions) {
            super();
            options = utils.extend(false,
                {
                    app: null,
                    el: null,
                    dataSource: null,
                    showTip: true,
                    showInfo: false,
                    showNumbers: true,
                    showFirstAndLast: true,
                    showPreviousAndNext: false,
                    useSlider: true,
                    hideOnSinglePage: true,
                    sliderSize: 25
                }, options);
            if (!!options.dataSource && !(options.dataSource instanceof collMOD.BaseCollection))
                throw new Error(RIAPP.ERRS.ERR_PAGER_DATASRC_INVALID);
            this._options = options;
            this._$el = global.$(options.el);
            this._objId = 'pgr' + baseUtils.getNewID();
            this._rowsPerPage = 0;
            this._rowCount = 0;
            this._currentPage = 1;
            this._$el.addClass(css.pager);
            if (!!this._options.dataSource) {
                this._bindDS();
            }
        }
        protected _createElement(tag: string) {
            return global.$(global.document.createElement(tag));
        }
        protected _render() {
            var $el = this._$el, rowCount: number, currentPage: number, pageCount: number;
            this._clearContent();

            if (this.rowsPerPage <= 0) {
                return;
            }

            rowCount = this.rowCount;
            if (rowCount == 0) {
                return;
            }
            currentPage = this.currentPage;
            if (currentPage == 0) {
                return;
            }

            pageCount = this.pageCount;

            if (this.hideOnSinglePage && (pageCount == 1)) {
                $el.hide();
            }
            else {
                $el.show();

                if (this.showInfo) {
                    var $span = this._createElement('span');
                    var info = utils.format(PAGER_TXT.pageInfo, currentPage, pageCount);
                    $span.addClass(css.info).text(info).appendTo($el);
                }

                if (this.showFirstAndLast && (currentPage != 1)) {
                    $el.append(this._createFirst());
                }

                if (this.showPreviousAndNext && (currentPage != 1)) {
                    $el.append(this._createPrevious());
                }

                if (this.showNumbers) {
                    var start = 1, end = pageCount, sliderSize = this.sliderSize, half: number, above: number, below: number;

                    if (this.useSlider && (sliderSize > 0)) {
                        half = Math.floor(((sliderSize - 1) / 2));
                        above = (currentPage + half) + ((sliderSize - 1) % 2);
                        below = (currentPage - half);

                        if (below < 1) {
                            above += (1 - below);
                            below = 1;
                        }

                        if (above > pageCount) {
                            below -= (above - pageCount);

                            if (below < 1) {
                                below = 1;
                            }

                            above = pageCount;
                        }

                        start = below;
                        end = above;
                    }

                    for (var i = start; i <= end; i++) {
                        if (i === currentPage) {
                            $el.append(this._createCurrent());
                        }
                        else {
                            $el.append(this._createOther(i));
                        }
                    }
                }

                if (this.showPreviousAndNext && (currentPage != pageCount)) {
                    $el.append(this._createNext());
                }

                if (this.showFirstAndLast && (currentPage != pageCount)) {
                    $el.append(this._createLast());
                }
            }
        }
        protected _setDSPageIndex(page: number) {
            this.dataSource.pageIndex = page - 1;
        }
        protected _onPageSizeChanged(ds: collMOD.BaseCollection<collMOD.ICollectionItem>, args?: any) {
            this.rowsPerPage = ds.pageSize;
        }
        protected _onPageIndexChanged(ds: collMOD.BaseCollection<collMOD.ICollectionItem>, args?: any) {
            this.currentPage = ds.pageIndex + 1;
        }
        protected _onTotalCountChanged(ds: collMOD.BaseCollection<collMOD.ICollectionItem>, args?: any) {
            this.rowCount = ds.totalCount;
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            this._unbindDS();
            this._clearContent();
            this._$el.removeClass(css.pager);
            this._$el = null;
            this._options = <any>{};
            super.destroy();
        }
        protected _bindDS() {
            var self = this, ds = this.dataSource;
            if (!ds) return;
            ds.addOnFill((s, a) => {
                if (!a.isBegin && !a.isPageChanged) {
                    self._unbindDS();
                    setTimeout(() => {
                        self._bindDS();
                    }, 0);
                }
            }, self._objId);
            ds.addOnPageIndexChanged(self._onPageIndexChanged, self._objId, self);
            ds.addOnPageSizeChanged(self._onPageSizeChanged, self._objId, self);
            ds.addOnTotalCountChanged(self._onTotalCountChanged, self._objId, self);
            this._currentPage = ds.pageIndex + 1;
            this._rowsPerPage = ds.pageSize;
            this._rowCount = ds.totalCount;
            this._render();
        }
        protected _unbindDS() {
            var self = this, ds = this.dataSource;
            if (!ds) return;
            ds.removeNSHandlers(self._objId);
        }
        protected _clearContent() {
            this._$el.empty();
        }
        protected _createLink(page: number, text: string, tip?: string) {
            var a = this._createElement('a'), self = this;
            a.text('' + text);
            a.attr('href', 'javascript:void(0)');

            if (!!tip) {
                elviewMOD.fn_addToolTip(a, tip);
            }
            a.click(function (e) {
                e.preventDefault();
                self._setDSPageIndex(page);
                self.currentPage = page;
            });

            return a;
        }
        protected _createFirst() {
            var $span = this._createElement('span'), tip: string, a: any;

            if (this.showTip) {
                tip = PAGER_TXT.firstPageTip;
            }
            a = this._createLink(1, PAGER_TXT.firstText, tip);
            $span.addClass(css.otherPage).append(a);
            return $span;
        }
        protected _createPrevious() {
            var span = this._createElement('span'), previousPage = this.currentPage - 1, tip: string, a: any;

            if (this.showTip) {
                tip = utils.format(PAGER_TXT.prevPageTip, previousPage);
            }

            a = this._createLink(previousPage, PAGER_TXT.previousText, tip);
            span.addClass(css.otherPage).append(a);
            return span;
        }
        protected _createCurrent() {
            var span = this._createElement('span'), currentPage = this.currentPage;

            span.text('' + currentPage);

            if (this.showTip) {
                elviewMOD.fn_addToolTip(span, this._buildTip(currentPage));
            }

            span.addClass(css.currentPage);
            return span;
        }
        protected _createOther(page: number) {
            var span = this._createElement('span'), tip: string, a: any;

            if (this.showTip) {
                tip = this._buildTip(page);
            }

            a = this._createLink(page, '' + page, tip);
            span.addClass(css.otherPage);
            span.append(a);
            return span;
        }
        protected _createNext() {
            var span = this._createElement('span'), nextPage = this.currentPage + 1, tip: string, a: any;

            if (this.showTip) {
                tip = utils.format(PAGER_TXT.nextPageTip, nextPage);
            }
            a = this._createLink(nextPage, PAGER_TXT.nextText, tip);
            span.addClass(css.otherPage).append(a);
            return span;
        }
        protected _createLast() {
            var span = this._createElement('span'), tip: string, a: any;

            if (this.showTip) {
                tip = PAGER_TXT.lastPageTip;
            }
            a = this._createLink(this.pageCount, PAGER_TXT.lastText, tip);
            span.addClass(css.otherPage).append(a);
            return span;
        }
        protected _buildTip(page: number) {
            var rowsPerPage = this.rowsPerPage, rowCount = this.rowCount,
                start = (((page - 1) * rowsPerPage) + 1),
                end = (page == this.pageCount) ? rowCount : (page * rowsPerPage), tip = '';

            if (page == this.currentPage) {
                tip = utils.format(PAGER_TXT.showingTip, start, end, rowCount);
            }
            else {
                tip = utils.format(PAGER_TXT.showTip, start, end, rowCount);
            }
            return tip;
        }
        toString() {
            return 'Pager';
        }
        get app() { return this._options.app; }
        get el() { return this._options.el; }
        get dataSource() { return this._options.dataSource; }
        set dataSource(v) {
            if (v === this.dataSource)
                return;
            if (!!this.dataSource) {
                this._unbindDS();
            }
            this._options.dataSource = v;
            if (!!this.dataSource)
                this._bindDS();
            this.raisePropertyChanged(PROP_NAME.dataSource);
        }
        get pageCount(): number {
            var rowCount = this.rowCount, rowsPerPage = this.rowsPerPage, result: number;

            if ((rowCount === 0) || (rowsPerPage === 0)) {
                return 0;
            }

            if ((rowCount % rowsPerPage) === 0) {
                return (rowCount / rowsPerPage);
            }
            else {
                result = (rowCount / rowsPerPage);
                result = Math.floor(result) + 1;
                return result;
            }
        }
        get rowCount() { return this._rowCount; }
        set rowCount(v) {
            if (this._rowCount != v) {
                this._rowCount = v;
                this._render();
                this.raisePropertyChanged(PROP_NAME.rowCount);
            }
        }
        get rowsPerPage() { return this._rowsPerPage; }
        set rowsPerPage(v) {
            if (this._rowsPerPage != v) {
                this._rowsPerPage = v;
                this._render();
            }
        }
        get currentPage() { return this._currentPage; }
        set currentPage(v) {
            if (this._currentPage != v) {
                this._currentPage = v;
                this._render();
                this.raisePropertyChanged(PROP_NAME.currentPage);
            }
        }
        get useSlider() { return this._options.useSlider; }
        set useSlider(v) {
            if (this.useSlider !== v) {
                this._options.useSlider = v;
                this._render();
            }
        }
        get sliderSize() { return this._options.sliderSize; }
        set sliderSize(v) {
            if (this.sliderSize !== v) {
                this._options.sliderSize = v;
                this._render();
            }
        }
        get hideOnSinglePage() { return this._options.hideOnSinglePage; }
        set hideOnSinglePage(v) {
            if (this.hideOnSinglePage !== v) {
                this._options.hideOnSinglePage = v;
                this._render();
            }
        }
        get showTip() { return this._options.showTip; }
        set showTip(v) {
            if (this.showTip !== v) {
                this._options.showTip = v;
                this._render();
            }
        }
        get showInfo() { return this._options.showInfo; }
        set showInfo(v) {
            if (this._options.showInfo !== v) {
                this._options.showInfo = v;
                this._render();
            }
        }
        get showFirstAndLast() { return this._options.showFirstAndLast; }
        set showFirstAndLast(v) {
            if (this.showFirstAndLast !== v) {
                this._options.showFirstAndLast = v;
                this._render();
            }
        }
        get showPreviousAndNext() { return this._options.showPreviousAndNext; }
        set showPreviousAndNext(v) {
            if (this.showPreviousAndNext !== v) {
                this._options.showPreviousAndNext = v;
                this._render();
            }
        }
        get showNumbers() { return this._options.showNumbers; }
        set showNumbers(v) {
            if (this.showNumbers !== v) {
                this._options.showNumbers = v;
                this._render();
            }
        }
    }

    export interface IPagerViewOptions extends IPagerOptions, elviewMOD.IViewOptions {
    }

    export class PagerElView extends elviewMOD.BaseElView {
        private _options: IPagerOptions;
        private _pager: Pager;
        constructor(app: Application, el: HTMLElement, options: IPagerViewOptions) {
            var self = this;
            this._pager = null;
            this._options = options;

            var opts: IPagerConstructorOptions = utils.extend(false,
                {
                    app: app,
                    el: el,
                    dataSource: null
                }, this._options);
            this._pager = new Pager(opts);
            this._pager.addOnDestroyed(function () {
                self._pager = null;
                self.invokePropChanged(PROP_NAME.pager);
                self.raisePropertyChanged(PROP_NAME.pager);
            });
            super(app, el, options);
        }
        destroy() {
            if (this._isDestroyed)
                return;
            this._isDestroyCalled = true;
            if (!!this._pager && !this._pager.getIsDestroyCalled()) {
                this._pager.destroy();
            }
            this._pager = null;
            super.destroy();
        }
        toString() {
            return 'PagerElView';
        }
        get dataSource() {
            if (this._isDestroyCalled)
                return undefined;
            return this._pager.dataSource;
        }
        set dataSource(v) {
            if (this._isDestroyCalled)
                return;
            if (this.dataSource !== v) {
                this._pager.dataSource = v;
                this.raisePropertyChanged(PROP_NAME.dataSource);
            }
        }
        get pager() { return this._pager; }
    }

    global.registerElView('pager', PagerElView);
    _isModuleLoaded = true;
}
