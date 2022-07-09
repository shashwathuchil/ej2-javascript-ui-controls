var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "@syncfusion/ej2-base", "@syncfusion/ej2-base", "@syncfusion/ej2-data", "../chart/chart", "../common/utils/helper", "@syncfusion/ej2-svg-base", "../common/model/base", "../common/model/base", "../common/utils/helper", "../range-navigator/range-navigator", "../range-navigator/utils/helper", "../common/period-selector/period-selector", "./renderer/cartesian-chart", "./renderer/range-selector", "./renderer/toolbar-selector", "./model/base", "./model/base", "./model/base", "./model/base", "../common/model/theme", "./renderer/stock-events", "./legend/legend"], function (require, exports, ej2_base_1, ej2_base_2, ej2_data_1, chart_1, helper_1, ej2_svg_base_1, base_1, base_2, helper_2, range_navigator_1, helper_3, period_selector_1, cartesian_chart_1, range_selector_1, toolbar_selector_1, base_3, base_4, base_5, base_6, theme_1, stock_events_1, legend_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StockChart = (function (_super) {
        __extends(StockChart, _super);
        function StockChart(options, element) {
            var _this = _super.call(this, options, element) || this;
            _this.isSingleAxis = false;
            _this.chartid = 57723;
            _this.tempSeriesType = [];
            _this.zoomChange = false;
            _this.allowPan = false;
            _this.onPanning = false;
            _this.trendlinetriggered = true;
            _this.initialRender = true;
            _this.rangeFound = false;
            _this.tempPeriods = [];
            _this.toolbarHeight = _this.enablePeriodSelector ? (ej2_base_2.Browser.isDevice ? 56 : 42) : 0;
            return _this;
        }
        StockChart.prototype.onPropertyChanged = function (newProp, oldProp) {
            for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
                var property = _a[_i];
                switch (property) {
                    case 'series':
                        this.render();
                        break;
                }
            }
        };
        StockChart.prototype.rangeChanged = function (updatedStart, updatedEnd) {
            var chartElement = document.getElementById(this.chartObject.id);
            if (chartElement) {
                while (chartElement.firstChild) {
                    chartElement.removeChild(chartElement.firstChild);
                }
            }
            this.startValue = updatedStart;
            this.endValue = updatedEnd;
            this.cartesianChart.initializeChart();
            this.periodSelector.datePicker.startDate = new Date(updatedStart);
            this.periodSelector.datePicker.endDate = new Date(updatedEnd);
            this.periodSelector.datePicker.dataBind();
        };
        StockChart.prototype.preRender = function () {
            this.unWireEvents();
            this.initPrivateVariable();
            this.allowServerDataBinding = false;
            this.isProtectedOnChange = true;
            this.setCulture();
            this.wireEvents();
        };
        StockChart.prototype.unWireEvents = function () {
            var startEvent = ej2_base_2.Browser.touchStartEvent;
            var moveEvent = ej2_base_2.Browser.touchMoveEvent;
            var stopEvent = ej2_base_2.Browser.touchEndEvent;
            var cancelEvent = ej2_base_2.Browser.isPointer ? 'pointerleave' : 'mouseleave';
            ej2_base_2.EventHandler.remove(this.element, startEvent, this.stockChartOnMouseDown);
            ej2_base_2.EventHandler.remove(this.element, moveEvent, this.stockChartOnMouseMove);
            ej2_base_2.EventHandler.remove(this.element, stopEvent, this.stockChartMouseEnd);
            ej2_base_2.EventHandler.remove(this.element, 'click', this.stockChartOnMouseClick);
            ej2_base_2.EventHandler.remove(this.element, 'contextmenu', this.stockChartRightClick);
            ej2_base_2.EventHandler.remove(this.element, cancelEvent, this.stockChartOnMouseLeave);
            window.removeEventListener((ej2_base_2.Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.stockChartResize);
        };
        StockChart.prototype.wireEvents = function () {
            var cancelEvent = ej2_base_2.Browser.isPointer ? 'pointerleave' : 'mouseleave';
            ej2_base_2.EventHandler.add(this.element, ej2_base_2.Browser.touchStartEvent, this.stockChartOnMouseDown, this);
            ej2_base_2.EventHandler.add(this.element, ej2_base_2.Browser.touchMoveEvent, this.stockChartOnMouseMove, this);
            ej2_base_2.EventHandler.add(this.element, ej2_base_2.Browser.touchEndEvent, this.stockChartMouseEnd, this);
            ej2_base_2.EventHandler.add(this.element, 'click', this.stockChartOnMouseClick, this);
            ej2_base_2.EventHandler.add(this.element, 'contextmenu', this.stockChartRightClick, this);
            ej2_base_2.EventHandler.add(this.element, cancelEvent, this.stockChartOnMouseLeave, this);
            window.addEventListener((ej2_base_2.Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.stockChartResize.bind(this));
            this.setStyle(this.element);
        };
        StockChart.prototype.initPrivateVariable = function () {
            if (this.element.id === '') {
                var collection = document.getElementsByClassName('e-stockChart').length;
                this.element.id = 'stockChart_' + this.chartid + '_' + collection;
            }
            this.seriesXMax = null;
            this.seriesXMin = null;
            this.startValue = null;
            this.endValue = null;
            this.currentEnd = null;
        };
        StockChart.prototype.setCulture = function () {
            this.intl = new ej2_base_1.Internationalization();
        };
        StockChart.prototype.storeDataSource = function () {
            for (var i = 0; i < this.series.length; i++) {
                var series = this.series[i];
                this.tempSeriesType.push(series.type);
                series.localData = undefined;
            }
            if (this.series.length === 0) {
                this.series.push({});
            }
            this.initialRender = true;
            this.rangeFound = false;
            this.resizeTo = null;
            this.startValue = null;
            this.endValue = null;
        };
        StockChart.prototype.render = function () {
            var _this = this;
            var loadEventData = { name: 'load', stockChart: this, theme: this.theme };
            this.trigger('load', loadEventData, function () {
                _this.theme = _this.theme;
                _this.themeStyle = theme_1.getThemeColor(_this.theme);
                _this.storeDataSource();
                _this.drawSVG();
                _this.renderTitle();
                _this.renderLegend();
                _this.chartModuleInjection();
                _this.chartRender();
                if (!(_this.dataSource instanceof ej2_data_1.DataManager) || !(_this.series[0].dataSource instanceof ej2_data_1.DataManager)) {
                    _this.stockChartDataManagerSuccess();
                    _this.initialRender = false;
                }
                _this.renderComplete();
                _this.allowServerDataBinding = true;
                _this.isProtectedOnChange = false;
            });
        };
        StockChart.prototype.stockChartDataManagerSuccess = function () {
            this.findRange();
            this.renderRangeSelector();
            this.renderPeriodSelector();
            this.trigger('loaded', { stockChart: this });
        };
        StockChart.prototype.setStyle = function (element) {
            var zooming = this.zoomSettings;
            var disableScroll = zooming.enableSelectionZooming || zooming.enablePinchZooming ||
                this.selectionMode !== 'None' || this.crosshair.enable;
            element.style.msTouchAction = disableScroll ? 'none' : 'element';
            element.style.touchAction = disableScroll ? 'none' : 'element';
            element.style.msUserSelect = 'none';
            element.style.msContentZooming = 'none';
            element.style.position = 'relative';
            element.style.display = 'block';
            element.style.webkitUserSelect = 'none';
        };
        StockChart.prototype.drawSVG = function () {
            this.removeSvg();
            helper_2.calculateSize(this);
            this.renderer = new ej2_svg_base_1.SvgRenderer(this.element.id);
            this.renderBorder();
            this.createSecondaryElements();
            this.calculateVisibleSeries();
            this.calculateLegendBounds();
            this.mainObject = this.renderer.createSvg({
                id: this.element.id + '_stockChart_svg',
                width: this.availableSize.width,
                height: this.availableSize.height - (this.enablePeriodSelector ? this.toolbarHeight : 0) - this.titleSize.height
            });
            this.svgObject = this.mainObject;
            this.element.appendChild(this.mainObject);
        };
        StockChart.prototype.calculateVisibleSeries = function () {
            this.visibleSeries = [];
            var series;
            var color = theme_1.getSeriesColor(this.theme);
            var count = color.length;
            var seriesCollections = this.series.sort(function (a, b) { return a.zOrder - b.zOrder; });
            for (var i = 0, len = seriesCollections.length; i < len; i++) {
                series = seriesCollections[i];
                series.category = 'Series';
                series.index = i;
                series.interior = series.fill || color[i % count];
                this.visibleSeries.push(series);
                seriesCollections[i] = series;
            }
        };
        StockChart.prototype.createSecondaryElements = function () {
            var tooltipDiv = helper_1.redrawElement(false, this.element.id + '_Secondary_Element') ||
                this.createElement('div');
            tooltipDiv.id = this.element.id + '_Secondary_Element';
            if (this.title) {
                this.titleSize = ej2_svg_base_1.measureText(this.title, this.titleStyle);
                this.titleSize.height += 15;
            }
            else {
                this.titleSize = { height: null, width: null };
            }
            var height = (this.enablePeriodSelector ? this.toolbarHeight : 0) + this.titleSize.height;
            tooltipDiv.style.cssText = 'position: relative; height:' + height + 'px';
            helper_1.appendChildElement(false, this.element, tooltipDiv, false);
        };
        StockChart.prototype.requiredModules = function () {
            var modules = [];
            if (this.legendSettings.visible) {
                modules.push({
                    member: 'StockLegend',
                    args: [this]
                });
            }
            return modules;
        };
        StockChart.prototype.findCurrentData = function (totalData, xName) {
            var _this = this;
            var tempData = (!this.enablePeriodSelector && !this.enableSelector) ? totalData : undefined;
            if (totalData && this.startValue && this.endValue) {
                tempData = totalData
                    .filter(function (data) {
                    return (new Date(Date.parse(data[xName])).getTime() >= _this.startValue &&
                        new Date(Date.parse(data[xName])).getTime() <= _this.endValue);
                });
            }
            return tempData;
        };
        StockChart.prototype.renderPeriodSelector = function () {
            if (this.enablePeriodSelector) {
                this.toolbarSelector.initializePeriodSelector();
                this.periodSelector.toolbar.refreshOverflow();
                if (!this.enableSelector) {
                    this.cartesianChart.cartesianChartRefresh(this);
                }
            }
        };
        StockChart.prototype.chartRender = function () {
            this.cartesianChart = new cartesian_chart_1.CartesianChart(this);
            this.cartesianChart.initializeChart();
        };
        StockChart.prototype.renderRangeSelector = function () {
            if (this.enableSelector) {
                this.rangeSelector = new range_selector_1.RangeSelector(this);
                this.rangeSelector.initializeRangeNavigator();
            }
        };
        StockChart.prototype.getModuleName = function () {
            return 'stockChart';
        };
        StockChart.prototype.getPersistData = function () {
            return '';
        };
        StockChart.prototype.removeSvg = function () {
            if (document.getElementById(this.element.id + '_Secondary_Element')) {
                ej2_base_2.remove(document.getElementById(this.element.id + '_Secondary_Element'));
            }
            var removeLength = 0;
            if (this.mainObject) {
                while (this.mainObject.childNodes.length > removeLength) {
                    this.mainObject.removeChild(this.mainObject.firstChild);
                }
                if (!this.mainObject.hasChildNodes() && this.mainObject.parentNode) {
                    ej2_base_2.remove(this.mainObject);
                    this.mainObject = null;
                    this.selectorObject = null;
                    this.chartObject = null;
                }
            }
        };
        StockChart.prototype.chartModuleInjection = function () {
            var moduleName;
            for (var _i = 0, _a = this.getInjectedModules(); _i < _a.length; _i++) {
                var modules = _a[_i];
                moduleName = modules.prototype.getModuleName().toLowerCase();
                if (moduleName.indexOf('rangetooltip') === -1) {
                    chart_1.Chart.Inject(modules);
                }
                else {
                    range_navigator_1.RangeNavigator.Inject(modules);
                }
                if (moduleName === 'datetime' || moduleName === 'areaseries' || moduleName === 'steplineseries') {
                    range_navigator_1.RangeNavigator.Inject(modules);
                }
            }
        };
        StockChart.prototype.findRange = function () {
            var _this = this;
            this.seriesXMin = Infinity;
            this.seriesXMax = -Infinity;
            for (var _i = 0, _a = this.chart.series; _i < _a.length; _i++) {
                var value = _a[_i];
                if (value.visible) {
                    this.seriesXMin = Math.min(this.seriesXMin, value.xMin);
                    this.seriesXMax = Math.max(this.seriesXMax, value.xMax);
                }
            }
            this.endValue = this.currentEnd = this.seriesXMax;
            if (this.enablePeriodSelector) {
                this.toolbarSelector = new toolbar_selector_1.ToolBarSelector(this);
                this.periodSelector = new period_selector_1.PeriodSelector(this);
                this.tempPeriods = this.periods.length ? this.periods : this.toolbarSelector.calculateAutoPeriods();
                this.tempPeriods.map(function (period) {
                    if (period.selected && period.text.toLowerCase() === 'ytd') {
                        _this.startValue = new Date(new Date(_this.currentEnd).getFullYear().toString()).getTime();
                    }
                    else if (period.selected && period.text.toLowerCase() === 'all') {
                        _this.startValue = _this.seriesXMin;
                    }
                    else if (period.selected) {
                        _this.startValue = _this.periodSelector.changedRange(period.intervalType, _this.endValue, period.interval).getTime();
                    }
                });
            }
            else {
                this.startValue = this.seriesXMin;
            }
            this.rangeFound = true;
        };
        StockChart.prototype.stockChartResize = function () {
            var _this = this;
            if (!document.getElementById(this.element.id)) {
                return false;
            }
            this.animateSeries = false;
            if (this.resizeTo) {
                clearTimeout(this.resizeTo);
            }
            this.resizeTo = +setTimeout(function () {
                helper_2.calculateSize(_this);
                _this.renderBorder();
                _this.calculateLegendBounds();
                _this.renderTitle();
                _this.renderLegend();
                _this.cartesianChart.cartesianChartRefresh(_this);
                _this.mainObject.setAttribute('width', _this.availableSize.width.toString());
                if (_this.enablePeriodSelector) {
                    _this.renderPeriodSelector();
                }
            }, 500);
            return false;
        };
        StockChart.prototype.stockChartOnMouseDown = function (e) {
            var pageX;
            var pageY;
            var target;
            var touchArg;
            var rect = this.chart.element.getBoundingClientRect();
            var element = e.target;
            this.trigger('stockChartMouseDown', { target: element.id, x: this.mouseX, y: this.mouseY });
            if (e.type === 'touchstart') {
                this.isTouch = true;
                touchArg = e;
                pageX = touchArg.changedTouches[0].clientX;
                target = touchArg.target;
                pageY = touchArg.changedTouches[0].clientY;
            }
            else {
                this.isTouch = e.pointerType === 'touch';
                pageX = e.clientX;
                pageY = e.clientY;
                target = e.target;
            }
            if (target.id.indexOf(this.element.id + '_stockChart_chart') > -1) {
                var svgRect = helper_2.getElement(this.element.id + '_stockChart_chart').getBoundingClientRect();
                this.mouseDownY = this.previousMouseMoveY = (pageY - rect.top) - Math.max(svgRect.top - rect.top, 0);
                this.mouseDownX = this.previousMouseMoveX = (pageX - rect.left) - Math.max(svgRect.left - rect.left, 0);
                this.setMouseXY(this.mouseDownX, this.mouseDownY);
                this.referenceXAxis = this.chart.primaryXAxis;
                helper_2.getElement(this.element.id + '_stockChart_chart').setAttribute('cursor', 'pointer');
                this.mouseDownXPoint = helper_3.getRangeValueXByPoint(this.mouseX - this.referenceXAxis.rect.x, this.referenceXAxis.rect.width, this.referenceXAxis.visibleRange, this.referenceXAxis.isInversed);
                this.allowPan = true;
                this.notify(ej2_base_2.Browser.touchStartEvent, e);
            }
            return false;
        };
        StockChart.prototype.stockChartMouseEnd = function (e) {
            var pageY;
            var pageX;
            var touchArg;
            if (e.type === 'touchend') {
                touchArg = e;
                pageX = touchArg.changedTouches[0].clientX;
                pageY = touchArg.changedTouches[0].clientY;
                this.isTouch = true;
            }
            else {
                pageY = e.clientY;
                pageX = e.clientX;
                this.isTouch = e.pointerType === 'touch' || e.pointerType === '2';
            }
            helper_2.getElement(this.element.id + '_stockChart_chart').setAttribute('cursor', 'auto');
            this.onPanning = false;
            this.setMouseXY(pageX, pageY);
            this.stockChartOnMouseUp(e);
            return false;
        };
        StockChart.prototype.stockChartOnMouseUp = function (e) {
            var element = e.target;
            this.trigger('stockChartMouseUp', { target: element.id, x: this.mouseX, y: this.mouseY });
            this.isChartDrag = false;
            this.allowPan = false;
            if (this.isTouch) {
                this.threshold = new Date().getTime() + 300;
            }
            this.notify(ej2_base_2.Browser.touchEndEvent, e);
            if (this.stockEvent) {
                this.stockEvent.removeStockEventTooltip(0);
            }
            return false;
        };
        StockChart.prototype.setMouseXY = function (pageX, pageY) {
            var svgRectElement = helper_2.getElement(this.element.id + '_stockChart_chart');
            if (this.element && svgRectElement) {
                var stockRect = this.element.getBoundingClientRect();
                var svgRect = svgRectElement.getBoundingClientRect();
                this.mouseX = (pageX - stockRect.left) - Math.max(svgRect.left - stockRect.left, 0);
                this.mouseY = (pageY - stockRect.top) - Math.max(svgRect.top - stockRect.top, 0);
            }
        };
        StockChart.prototype.stockChartOnMouseMove = function (e) {
            var pageX;
            var touchArg;
            var pageY;
            if (e.type === 'touchmove') {
                this.isTouch = true;
                touchArg = e;
                pageY = touchArg.changedTouches[0].clientY;
                pageX = touchArg.changedTouches[0].clientX;
            }
            else {
                this.isTouch = e.pointerType === 'touch' || e.pointerType === '2' || this.isTouch;
                pageX = e.clientX;
                pageY = e.clientY;
            }
            this.trigger('stockChartMouseMove', { target: e.target.id, x: this.mouseX, y: this.mouseY });
            if (helper_2.getElement(this.element.id + '_stockChart_chart')) {
                this.setMouseXY(pageX, pageY);
                this.chartOnMouseMove(e);
            }
            return false;
        };
        StockChart.prototype.chartOnMouseMove = function (e) {
            if (this.allowPan && this.mouseDownXPoint && this.mouseX !== this.previousMouseMoveX && this.zoomSettings.enablePan) {
                this.onPanning = true;
                helper_2.getElement(this.element.id + '_stockChart_chart').setAttribute('cursor', 'pointer');
                this.mouseUpXPoint = helper_3.getRangeValueXByPoint(this.mouseX - this.referenceXAxis.rect.x, this.referenceXAxis.rect.width, this.referenceXAxis.visibleRange, this.referenceXAxis.isInversed);
                var diff = Math.abs(this.mouseUpXPoint - this.mouseDownXPoint);
                if (this.mouseDownXPoint < this.mouseUpXPoint) {
                    if (this.seriesXMin <= this.referenceXAxis.visibleRange.min - diff) {
                        this.startValue = this.referenceXAxis.visibleRange.min - diff;
                        this.endValue = this.referenceXAxis.visibleRange.max - diff;
                        this.cartesianChart.cartesianChartRefresh(this);
                        this.rangeSelector.sliderChange(this.referenceXAxis.visibleRange.min - diff, this.referenceXAxis.visibleRange.max - diff);
                    }
                }
                else {
                    if (this.seriesXMax >= this.referenceXAxis.visibleRange.max + diff) {
                        this.startValue = this.referenceXAxis.visibleRange.min + diff;
                        this.endValue = this.referenceXAxis.visibleRange.max + diff;
                        this.cartesianChart.cartesianChartRefresh(this);
                        this.rangeSelector.sliderChange(this.referenceXAxis.visibleRange.min + diff, this.referenceXAxis.visibleRange.max + diff);
                    }
                }
            }
            this.notify(ej2_base_2.Browser.touchMoveEvent, e);
            if (e.target.id === '') {
                var element = void 0;
                if (this.chart.tooltip.enable || this.crosshair.enable) {
                    element = document.getElementById(this.element.id + '_stockChart_chart_tooltip');
                    if (element) {
                        ej2_base_2.remove(element);
                    }
                }
                if (helper_2.getElement(this.element.id + '_StockEvents_Tooltip')) {
                    this.stockEvent.removeStockEventTooltip(0);
                }
            }
            if (e.target.id.indexOf('StockEvents') !== -1) {
                clearInterval(this.stockEvent.toolTipInterval);
                this.stockEvent.renderStockEventTooltip(e.target.id);
            }
            else {
                if (this.stockEvent) {
                    this.stockEvent.removeStockEventTooltip(1000);
                }
            }
            this.isTouch = false;
            return false;
        };
        StockChart.prototype.stockChartOnMouseClick = function (e) {
            var element = e.target;
            this.trigger('stockChartMouseClick', { target: element.id, x: this.mouseX, y: this.mouseY });
            this.notify('click', e);
            return false;
        };
        StockChart.prototype.stockChartRightClick = function (event) {
            if (this.crosshair.enable &&
                (event.buttons === 2 || event.which === 0 || event.pointerType === 'touch')) {
                event.preventDefault();
                event.stopPropagation();
                return false;
            }
            return true;
        };
        StockChart.prototype.stockChartOnMouseLeave = function (e) {
            var touchArg;
            var pageX;
            var pageY;
            if (e.type === 'touchleave') {
                this.isTouch = true;
                touchArg = e;
                pageX = touchArg.changedTouches[0].clientX;
                pageY = touchArg.changedTouches[0].clientY;
            }
            else {
                pageX = e.clientX;
                pageY = e.clientY;
                this.isTouch = e.pointerType === 'touch' || e.pointerType === '2';
            }
            this.setMouseXY(pageX, pageY);
            this.allowPan = false;
            this.stockChartOnMouseLeaveEvent(e);
            return false;
        };
        StockChart.prototype.stockChartOnMouseLeaveEvent = function (e) {
            var cancelEvent = ej2_base_2.Browser.isPointer ? 'pointerleave' : 'mouseleave';
            this.isChartDrag = false;
            this.notify(cancelEvent, e);
            if (this.stockEvent) {
                this.stockEvent.removeStockEventTooltip(1000);
            }
            return false;
        };
        StockChart.prototype.destroy = function () {
        };
        StockChart.prototype.renderBorder = function () {
            if (this.border.width) {
                var border = this.createElement('div');
                border.id = this.element.id + '_stock_border';
                border.style.width = (this.availableSize.width) + 'px';
                border.style.height = (this.availableSize.height) + 'px';
                border.style.position = 'absolute';
                border.style.border = this.border.width + 'px solid ' + this.border.color;
                border.style.pointerEvents = 'none';
                helper_1.appendChildElement(false, helper_2.getElement(this.element.id), border);
            }
        };
        StockChart.prototype.renderTitle = function () {
            var rect;
            if (this.title) {
                helper_1.appendChildElement(false, helper_2.getElement(this.element.id + '_Secondary_Element'), this.renderer.createSvg({
                    id: this.element.id + '_stockChart_Title',
                    width: this.availableSize.width,
                    height: this.titleSize.height,
                    fill: this.background || this.themeStyle.background
                }), false);
                var alignment = this.titleStyle.textAlignment;
                var getAnchor = alignment === 'Near' ? 'start' : alignment === 'Far' ? 'end' : 'middle';
                rect = new ej2_svg_base_1.Rect(0, 0, this.availableSize.width, 0);
                var options = new ej2_svg_base_1.TextOption(this.element.id + '_ChartTitle', helper_1.titlePositionX(rect, this.titleStyle), ((this.titleSize.height - 10)), getAnchor, this.title, '', 'auto');
                helper_1.textElement(this.renderer, options, this.titleStyle, this.titleStyle.color || this.findTitleColor(), helper_2.getElement(this.element.id + '_stockChart_Title'), false, false);
                this.availableSize.height -= (this.titleSize.height + 5);
            }
        };
        StockChart.prototype.calculateLegendBounds = function () {
            if (this.stockLegendModule && this.legendSettings.visible) {
                this.stockLegendModule.getLegendOptions(this.visibleSeries, this);
            }
            var titleHeight = this.titleSize.height;
            var left = this.border.width;
            var width = this.availableSize.width - this.border.width - left;
            var top = this.chartArea.border.width * 0.5 + this.border.width;
            var height = this.availableSize.height - top - this.border.width - (this.enablePeriodSelector ? this.toolbarHeight : 0) - titleHeight;
            this.initialClipRect = new ej2_svg_base_1.Rect(left, top, width, height);
            this.tempAvailableSize = new ej2_svg_base_1.Size(this.availableSize.width, this.availableSize.height - (this.enablePeriodSelector ? this.toolbarHeight : 0) - titleHeight);
            if (this.stockLegendModule && this.legendSettings.visible) {
                this.stockLegendModule.calculateLegendBounds(this.initialClipRect, this.tempAvailableSize, null);
            }
        };
        StockChart.prototype.renderLegend = function () {
            if (this.stockLegendModule && this.stockLegendModule.legendCollections.length && this.legendSettings.visible) {
                this.stockLegendModule.calTotalPage = true;
                var bounds = this.stockLegendModule.legendBounds;
                this.stockLegendModule.renderLegend(this, this.legendSettings, bounds);
                if (this.legendSettings.position === "Auto" || this.legendSettings.position === "Bottom" || this.legendSettings.position === "Top") {
                    this.availableSize.height -= this.stockLegendModule.legendBounds.height;
                }
                else if (this.legendSettings.position === "Left" || this.legendSettings.position === "Right") {
                    this.availableSize.width -= this.stockLegendModule.legendBounds.width;
                }
            }
        };
        StockChart.prototype.findTitleColor = function () {
            if (this.theme.toLocaleLowerCase().indexOf('highcontrast') > -1 || this.theme.indexOf('Dark') > -1) {
                return '#ffffff';
            }
            return '#424242';
        };
        StockChart.prototype.calculateStockEvents = function () {
            if (this.stockEvents.length) {
                this.stockEvent = new stock_events_1.StockEvents(this);
                helper_1.appendChildElement(false, this.chartObject, this.stockEvent.renderStockEvents());
            }
        };
        return StockChart;
    }(ej2_base_1.Component));
    __decorate([
        ej2_base_1.Property(null)
    ], StockChart.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], StockChart.prototype, "height", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], StockChart.prototype, "dataSource", void 0);
    __decorate([
        ej2_base_1.Complex({}, base_3.StockMargin)
    ], StockChart.prototype, "margin", void 0);
    __decorate([
        ej2_base_1.Complex({ color: '#DDDDDD', width: 1 }, base_4.StockChartBorder)
    ], StockChart.prototype, "border", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], StockChart.prototype, "background", void 0);
    __decorate([
        ej2_base_1.Property('Material')
    ], StockChart.prototype, "theme", void 0);
    __decorate([
        ej2_base_1.Complex({ name: 'primaryXAxis', valueType: 'DateTime' }, base_3.StockChartAxis)
    ], StockChart.prototype, "primaryXAxis", void 0);
    __decorate([
        ej2_base_1.Complex({ border: { color: null, width: 0.5 }, background: 'transparent' }, base_3.StockChartArea)
    ], StockChart.prototype, "chartArea", void 0);
    __decorate([
        ej2_base_1.Complex({ name: 'primaryYAxis', opposedPosition: true, labelPosition: 'Inside' }, base_3.StockChartAxis)
    ], StockChart.prototype, "primaryYAxis", void 0);
    __decorate([
        ej2_base_1.Collection([{}], base_3.StockChartRow)
    ], StockChart.prototype, "rows", void 0);
    __decorate([
        ej2_base_1.Collection([{ opposedPosition: true }], base_3.StockChartAxis)
    ], StockChart.prototype, "axes", void 0);
    __decorate([
        ej2_base_1.Collection([], base_4.StockSeries)
    ], StockChart.prototype, "series", void 0);
    __decorate([
        ej2_base_1.Collection([], base_3.StockEventsSettings)
    ], StockChart.prototype, "stockEvents", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], StockChart.prototype, "isTransposed", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], StockChart.prototype, "title", void 0);
    __decorate([
        ej2_base_1.Complex({ size: '15px', fontWeight: '500', color: null, fontStyle: 'Normal', fontFamily: 'Segoe UI' }, base_6.StockChartFont)
    ], StockChart.prototype, "titleStyle", void 0);
    __decorate([
        ej2_base_1.Collection([], base_4.StockChartIndicator)
    ], StockChart.prototype, "indicators", void 0);
    __decorate([
        ej2_base_1.Complex({ shared: true, enableMarker: false }, base_2.TooltipSettings)
    ], StockChart.prototype, "tooltip", void 0);
    __decorate([
        ej2_base_1.Complex({ dashArray: '5' }, chart_1.CrosshairSettings)
    ], StockChart.prototype, "crosshair", void 0);
    __decorate([
        ej2_base_1.Complex({}, legend_1.StockChartLegendSettings)
    ], StockChart.prototype, "legendSettings", void 0);
    __decorate([
        ej2_base_1.Complex({}, chart_1.ZoomSettings)
    ], StockChart.prototype, "zoomSettings", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], StockChart.prototype, "enablePeriodSelector", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], StockChart.prototype, "enableCustomRange", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], StockChart.prototype, "isSelect", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], StockChart.prototype, "enableSelector", void 0);
    __decorate([
        ej2_base_1.Collection([], base_1.Periods)
    ], StockChart.prototype, "periods", void 0);
    __decorate([
        ej2_base_1.Collection([{}], base_5.StockChartAnnotationSettings)
    ], StockChart.prototype, "annotations", void 0);
    __decorate([
        ej2_base_2.Event()
    ], StockChart.prototype, "selectorRender", void 0);
    __decorate([
        ej2_base_2.Event()
    ], StockChart.prototype, "stockChartMouseMove", void 0);
    __decorate([
        ej2_base_2.Event()
    ], StockChart.prototype, "stockChartMouseLeave", void 0);
    __decorate([
        ej2_base_2.Event()
    ], StockChart.prototype, "stockChartMouseDown", void 0);
    __decorate([
        ej2_base_2.Event()
    ], StockChart.prototype, "stockChartMouseUp", void 0);
    __decorate([
        ej2_base_2.Event()
    ], StockChart.prototype, "stockChartMouseClick", void 0);
    __decorate([
        ej2_base_2.Event()
    ], StockChart.prototype, "pointClick", void 0);
    __decorate([
        ej2_base_2.Event()
    ], StockChart.prototype, "pointMove", void 0);
    __decorate([
        ej2_base_2.Event()
    ], StockChart.prototype, "onZooming", void 0);
    __decorate([
        ej2_base_2.Event()
    ], StockChart.prototype, "legendRender", void 0);
    __decorate([
        ej2_base_2.Event()
    ], StockChart.prototype, "legendClick", void 0);
    __decorate([
        ej2_base_1.Property('None')
    ], StockChart.prototype, "selectionMode", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], StockChart.prototype, "isMultiSelect", void 0);
    __decorate([
        ej2_base_2.Event()
    ], StockChart.prototype, "load", void 0);
    __decorate([
        ej2_base_2.Event()
    ], StockChart.prototype, "loaded", void 0);
    __decorate([
        ej2_base_2.Event()
    ], StockChart.prototype, "rangeChange", void 0);
    __decorate([
        ej2_base_2.Event()
    ], StockChart.prototype, "axisLabelRender", void 0);
    __decorate([
        ej2_base_2.Event()
    ], StockChart.prototype, "tooltipRender", void 0);
    __decorate([
        ej2_base_2.Event()
    ], StockChart.prototype, "seriesRender", void 0);
    __decorate([
        ej2_base_2.Event()
    ], StockChart.prototype, "stockEventRender", void 0);
    __decorate([
        ej2_base_1.Collection([], base_3.StockChartIndexes)
    ], StockChart.prototype, "selectedDataIndexes", void 0);
    __decorate([
        ej2_base_1.Property(['Line', 'Hilo', 'OHLC', 'Hollow Candle', 'Spline', 'Candle'])
    ], StockChart.prototype, "seriesType", void 0);
    __decorate([
        ej2_base_1.Property(['EMA', 'TMA', 'SMA', 'Momentum', 'ATR', 'Accumulation Distribution', 'Bollinger Bands', 'MACD', 'Stochastic', 'RSI'])
    ], StockChart.prototype, "indicatorType", void 0);
    __decorate([
        ej2_base_1.Property(['PNG', 'JPEG', 'SVG', 'PDF', 'Print'])
    ], StockChart.prototype, "exportType", void 0);
    __decorate([
        ej2_base_1.Property(['Linear', 'Exponential', 'Polynomial', 'Logarithmic', 'Moving Average'])
    ], StockChart.prototype, "trendlineType", void 0);
    StockChart = __decorate([
        ej2_base_1.NotifyPropertyChanges
    ], StockChart);
    exports.StockChart = StockChart;
});
