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
define(["require", "exports", "@syncfusion/ej2-base", "@syncfusion/ej2-base", "@syncfusion/ej2-base", "@syncfusion/ej2-base", "@syncfusion/ej2-base", "@syncfusion/ej2-base", "../common/utils/helper", "../common/utils/helper", "../common/utils/helper", "../common/model/theme", "../common/model/base", "./axis/axis", "./axis/cartesian-panel", "@syncfusion/ej2-svg-base", "./utils/get-data", "./series/chart-series", "../common/model/data", "./series/marker", "../common/legend/legend", "./technical-indicators/technical-indicator", "../common/model/constants", "../common/model/constants", "./model/chart-base", "../common/utils/helper", "../common/utils/export"], function (require, exports, ej2_base_1, ej2_base_2, ej2_base_3, ej2_base_4, ej2_base_5, ej2_base_6, helper_1, helper_2, helper_3, theme_1, base_1, axis_1, cartesian_panel_1, ej2_svg_base_1, get_data_1, chart_series_1, data_1, marker_1, legend_1, technical_indicator_1, constants_1, constants_2, chart_base_1, helper_4, export_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RangeColorSetting = (function (_super) {
        __extends(RangeColorSetting, _super);
        function RangeColorSetting() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return RangeColorSetting;
    }(ej2_base_3.ChildProperty));
    __decorate([
        ej2_base_1.Property()
    ], RangeColorSetting.prototype, "start", void 0);
    __decorate([
        ej2_base_1.Property()
    ], RangeColorSetting.prototype, "end", void 0);
    __decorate([
        ej2_base_1.Property([])
    ], RangeColorSetting.prototype, "colors", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], RangeColorSetting.prototype, "label", void 0);
    exports.RangeColorSetting = RangeColorSetting;
    var CrosshairSettings = (function (_super) {
        __extends(CrosshairSettings, _super);
        function CrosshairSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CrosshairSettings;
    }(ej2_base_3.ChildProperty));
    __decorate([
        ej2_base_1.Property(false)
    ], CrosshairSettings.prototype, "enable", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], CrosshairSettings.prototype, "dashArray", void 0);
    __decorate([
        ej2_base_6.Complex({ color: null, width: 1 }, base_1.Border)
    ], CrosshairSettings.prototype, "line", void 0);
    __decorate([
        ej2_base_1.Property('Both')
    ], CrosshairSettings.prototype, "lineType", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], CrosshairSettings.prototype, "verticalLineColor", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], CrosshairSettings.prototype, "horizontalLineColor", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], CrosshairSettings.prototype, "opacity", void 0);
    exports.CrosshairSettings = CrosshairSettings;
    var ZoomSettings = (function (_super) {
        __extends(ZoomSettings, _super);
        function ZoomSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ZoomSettings;
    }(ej2_base_3.ChildProperty));
    __decorate([
        ej2_base_1.Property(false)
    ], ZoomSettings.prototype, "enableSelectionZooming", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], ZoomSettings.prototype, "enablePinchZooming", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], ZoomSettings.prototype, "enableMouseWheelZooming", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], ZoomSettings.prototype, "enableDeferredZooming", void 0);
    __decorate([
        ej2_base_1.Property('XY')
    ], ZoomSettings.prototype, "mode", void 0);
    __decorate([
        ej2_base_1.Property(['Zoom', 'ZoomIn', 'ZoomOut', 'Pan', 'Reset'])
    ], ZoomSettings.prototype, "toolbarItems", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], ZoomSettings.prototype, "enablePan", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], ZoomSettings.prototype, "enableScrollbar", void 0);
    exports.ZoomSettings = ZoomSettings;
    var Chart = (function (_super) {
        __extends(Chart, _super);
        function Chart(options, element) {
            var _this = _super.call(this, options, element) || this;
            _this.rotatedDataLabelCollections = [];
            _this.animated = false;
            _this.isPointMouseDown = false;
            _this.isScrolling = false;
            _this.checkResize = 0;
            _this.visible = 0;
            _this.clickCount = 0;
            _this.maxPointCount = 0;
            _this.singleClickTimer = 0;
            _this.chartAreaType = 'Cartesian';
            _this.isRtlEnabled = false;
            _this.scaleX = 1;
            _this.scaleY = 1;
            _this.chartid = 57723;
            _this.isLegendClicked = false;
            _this.isZoomed = false;
            _this.previousTargetId = "";
            _this.currentPointIndex = 0;
            _this.currentSeriesIndex = 0;
            _this.currentLegendIndex = 0;
            ej2_base_2.setValue('mergePersistData', _this.mergePersistChartData, _this);
            return _this;
        }
        Chart.prototype.mergePersistChartData = function () {
            var data = window.localStorage.getItem(this.getModuleName() + this.element.id);
            if (!(ej2_base_2.isNullOrUndefined(data) || (data === ''))) {
                var dataObj = JSON.parse(data);
                var keys = Object.keys(dataObj);
                this.isProtectedOnChange = true;
                for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                    var key = keys_1[_i];
                    if ((typeof this[key] === 'object') && !ej2_base_2.isNullOrUndefined(this[key])) {
                        ej2_base_4.extend(this[key], dataObj[key]);
                    }
                    else {
                        this[key] = dataObj[key];
                    }
                }
                this.isProtectedOnChange = false;
            }
        };
        Chart.prototype.isIdHasSpecialCharacter = function (elementId) {
            var regex = /^[A-Za-z ]+$/;
            var numberRegex = /^[0-9 ]+$/;
            var childElementId = '';
            if (!regex.test(elementId)) {
                var start = 0;
                if (numberRegex.test(elementId[0])) {
                    childElementId += ('\\3' + elementId[0]);
                    start = 1;
                }
                for (var i = start; i < elementId.length; i++) {
                    if (!regex.test(elementId[i]) && elementId.indexOf('-') === -1 &&
                        elementId.indexOf('_') === -1 && elementId.indexOf('\\') === -1 && !numberRegex.test(elementId[i])) {
                        childElementId += ('\\' + elementId[i]);
                    }
                    else {
                        childElementId += elementId[i];
                    }
                }
                return childElementId;
            }
            else {
                return elementId;
            }
        };
        Chart.prototype.preRender = function () {
            this.element.id = this.isIdHasSpecialCharacter(this.element.id);
            var blazor = 'Blazor';
            this.isBlazor = window[blazor];
            this.allowServerDataBinding = false;
            this.unWireEvents();
            this.initPrivateVariable();
            this.setCulture();
            this.wireEvents();
            if (this.stockChart) {
                if (this.stockChart.tooltip.header === null) {
                    this.tooltip.header = '<b>${point.x}</b>';
                }
                if (this.stockChart.tooltip.format === null) {
                    this.tooltip.format = 'High : <b>${point.high}</b><br/>Low :' +
                        ' <b>${point.low}</b><br/>Open : <b>${point.open}</b><br/>Close : <b>${point.close}</b>';
                    if (this.stockChart.series[0].volume !== '') {
                        this.tooltip.format += '<br/>Volume : <b>${point.volume}</b>';
                    }
                }
                this.animateSeries = false;
            }
            this.element.setAttribute('dir', this.enableRtl ? 'rtl' : '');
        };
        Chart.prototype.initPrivateVariable = function () {
            this.animateSeries = true;
            this.delayRedraw = false;
            this.horizontalAxes = [];
            this.verticalAxes = [];
            this.refreshAxis();
            this.refreshDefinition(this.rows);
            this.refreshDefinition(this.columns);
            if (this.tooltipModule) {
                this.tooltipModule.previousPoints = [];
            }
            this.element.setAttribute('tabindex', "0");
            this.element.setAttribute("class", this.element.getAttribute("class") + " e-chart-focused");
            if (this.element.id === '') {
                var collection = document.getElementsByClassName('e-chart').length;
                this.element.id = 'chart_' + this.chartid + '_' + collection;
            }
            this.svgId = this.stockChart ? this.stockChart.element.id + '_stockChart_chart' :
                this.element.id + (this.enableCanvas ? '_canvas' : '_svg');
        };
        Chart.prototype.render = function () {
            var _this = this;
            this.svgRenderer = new ej2_svg_base_1.SvgRenderer(this.element.id);
            var loadEventData = {
                chart: this.isBlazor ? {} : this, theme: this.theme, name: constants_2.load, cancel: false
            };
            if (!this.stockChart) {
                this.trigger(constants_2.load, loadEventData, function () {
                    if (!loadEventData.cancel) {
                        _this.cartesianChartRendering(loadEventData);
                    }
                });
            }
            else {
                this.isRtlEnabled = (window.getComputedStyle(document.querySelector('body')).direction === 'rtl');
                this.cartesianChartRendering(loadEventData);
            }
        };
        Chart.prototype.cartesianChartRendering = function (beforeRenderData) {
            this.theme = this.isBlazor ? beforeRenderData.theme : this.theme;
            this.setTheme();
            this.createChartSvg();
            this.markerRender = new marker_1.Marker(this);
            this.calculateAreaType();
            this.calculateVisibleSeries();
            this.initTechnicalIndicators();
            this.initTrendLines();
            this.calculateVisibleAxis();
            this.processData();
            this.renderComplete();
            this.allowServerDataBinding = true;
        };
        Chart.prototype.getLocalizedLabel = function (key) {
            return this.localeObject.getConstant(key);
        };
        Chart.prototype.animate = function (duration) {
            this.redraw = true;
            this.animated = true;
            this.duration = duration ? duration : 1000;
        };
        Chart.prototype.refreshBound = function () {
            this.rotatedDataLabelCollections = [];
            if (this.legendModule && this.legendSettings.visible) {
                this.legendModule.getLegendOptions(this.visibleSeries, this);
            }
            if (this.tooltip.enable && this.tooltipModule) {
                this.tooltipModule.previousPoints = [];
            }
            this.calculateStackValues();
            this.calculateBounds();
            if (this.stockChart && !this.stockChart.rangeFound) {
                if (this.stockChart.enablePeriodSelector || this.stockChart.enableSelector) {
                    return null;
                }
            }
            this.renderElements();
            helper_1.removeElement('chartmeasuretext');
            this.removeSelection();
            if (this.markerRender) {
                this.markerRender.mergeXvalues(this.visibleSeries);
            }
        };
        Chart.prototype.calculateStackValues = function () {
            var series;
            var isCalculateStacking = false;
            for (var i = 0, len = this.visibleSeries.length; i < len; i++) {
                series = this.visibleSeries[i];
                series.position = series.rectCount = undefined;
                if (((series.type.indexOf('Stacking') !== -1) || (series.drawType.indexOf('Stacking') !== -1
                    && this.chartAreaType === 'PolarRadar')) && !isCalculateStacking) {
                    series.calculateStackedValue(series.type.indexOf('100') > -1, this);
                    isCalculateStacking = true;
                }
            }
        };
        Chart.prototype.removeSelection = function () {
            for (var _i = 0, _a = this.visibleSeries; _i < _a.length; _i++) {
                var series = _a[_i];
                if (series.visible) {
                    for (var _b = 0, _c = series.points; _b < _c.length; _b++) {
                        var point = _c[_b];
                        point.isSelect = false;
                    }
                }
            }
            if (helper_4.getElement(this.element.id + '_ej2_drag_multi_group')) {
                if (this.selectionMode.indexOf('Drag') > -1) {
                    this.selectionModule.filterArray = [];
                }
                helper_1.removeElement(this.element.id + '_ej2_drag_multi_group');
                this.selectionModule.calculateDragSelectedElements(this, new ej2_svg_base_1.Rect(0, 0, 0, 0), true);
            }
            else if (helper_4.getElement(this.element.id + '_ej2_drag_group')) {
                if (this.selectionMode !== 'Lasso') {
                    this.selectionModule.filterArray = [];
                }
                helper_1.removeElement(this.element.id + '_ej2_drag_group');
                this.selectionModule.calculateDragSelectedElements(this, new ej2_svg_base_1.Rect(0, 0, 0, 0), true);
            }
        };
        Chart.prototype.renderElements = function () {
            this.renderBorder();
            this.renderTitle();
            this.renderAreaBorder();
            this.renderSeriesElements(this.renderAxes());
            this.renderLegend();
            this.applyZoomkit();
            this.performSelection();
            this.setSecondaryElementPosition();
            for (var _i = 0, _a = this.visibleSeries; _i < _a.length; _i++) {
                var value = _a[_i];
                ej2_base_2.updateBlazorTemplate(this.element.id + '_DataLabel', 'Template', value.marker.dataLabel);
            }
            this.renderAnnotation();
        };
        Chart.prototype.renderAxes = function () {
            this.yAxisElements = this.renderer.createGroup({ id: this.element.id + 'yAxisCollection' });
            var axisElement;
            if (this.rows.length > 0 && this.columns.length > 0) {
                axisElement = this.chartAxisLayoutPanel.renderAxes();
            }
            if (this.stripLineModule) {
                this.stripLineModule.renderStripLine(this, 'Behind', this.axisCollections);
            }
            return axisElement;
        };
        Chart.prototype.renderLegend = function () {
            if (this.legendModule && this.legendModule.legendCollections.length && this.legendSettings.visible) {
                this.legendModule.calTotalPage = true;
                var borderWidth = this.legendSettings.border.width;
                var bounds = this.legendModule.legendBounds;
                var rect = new ej2_svg_base_1.Rect(bounds.x, bounds.y, bounds.width, bounds.height);
                if (this.enableCanvas) {
                    rect = new ej2_svg_base_1.Rect(rect.x - borderWidth / 2, rect.y - borderWidth / 2, rect.width + borderWidth, rect.height + borderWidth);
                    this.renderer.canvasClip(rect);
                }
                this.legendModule.renderLegend(this, this.legendSettings, bounds);
                if (this.enableCanvas) {
                    this.renderer.canvasRestore();
                }
            }
            if (!this.redraw) {
                if (!this.stockChart) {
                    this.element.appendChild(this.svgObject);
                }
                else {
                    if (!helper_4.getElement(this.stockChart.chartObject.id)) {
                        this.stockChart.mainObject.appendChild(this.svgObject);
                    }
                }
            }
        };
        Chart.prototype.setSecondaryElementPosition = function () {
            var element = helper_4.getElement(this.element.id + '_Secondary_Element');
            if (!element) {
                return;
            }
            var rect = this.element.getBoundingClientRect();
            var svgRect = helper_4.getElement(this.svgId).getBoundingClientRect();
            element.style.left = Math.max(svgRect.left - rect.left, 0) + 'px';
            element.style.top = Math.max(svgRect.top - rect.top, 0) + 'px';
        };
        Chart.prototype.initializeModuleElements = function () {
            this.dataLabelCollections = [];
            var elementId = this.element.id;
            if (this.series.length) {
                this.seriesElements = this.svgRenderer.createGroup({ id: elementId + 'SeriesCollection' });
            }
            if (this.indicators.length) {
                this.indicatorElements = this.renderer.createGroup({ id: elementId + 'IndicatorCollection' });
            }
            if (this.hasTrendlines()) {
                this.trendLineElements = this.renderer.createGroup({ id: elementId + 'TrendLineCollection' });
            }
            this.dataLabelElements = this.renderer.createGroup({ id: elementId + 'DataLabelCollection' });
        };
        Chart.prototype.hasTrendlines = function () {
            var isTrendline;
            for (var _i = 0, _a = this.series; _i < _a.length; _i++) {
                var series = _a[_i];
                isTrendline = series.trendlines.length ? true : false;
                if (isTrendline) {
                    break;
                }
            }
            return isTrendline;
        };
        Chart.prototype.renderSeriesElements = function (axisElement) {
            this.initializeModuleElements();
            var elementId = this.element.id;
            if (this.element.tagName !== 'g') {
                var tooltipDiv = helper_2.redrawElement(this.redraw, elementId + '_Secondary_Element') ||
                    this.createElement('div');
                tooltipDiv.id = elementId + '_Secondary_Element';
                tooltipDiv.style.cssText = 'position: relative';
                helper_1.appendChildElement(false, this.element, tooltipDiv, this.redraw);
            }
            if (this.enableCanvas) {
                var tooltipdiv = document.getElementById(elementId + '_Secondary_Element');
                tooltipdiv = !tooltipdiv ? this.createElement('div', { id: elementId + '_Secondary_Element',
                    attrs: { 'style': 'position: relative; left:0px; top:0px' } }) : tooltipdiv;
                var svg = this.svgRenderer.createSvg({
                    id: elementId + '_tooltip_svg',
                    width: this.availableSize.width,
                    height: this.availableSize.height
                });
                svg.style.cssText = 'position: absolute; pointer-events: none';
                tooltipdiv.appendChild(svg);
            }
            if (this.tooltip.enable) {
                helper_1.appendChildElement(this.enableCanvas, this.svgObject, this.renderer.createGroup({ id: elementId + '_UserInteraction', style: 'pointer-events:none;' }), this.redraw);
            }
            if (this.rows.length > 0 && this.columns.length > 0) {
                this.initializeIndicator();
                this.initializeTrendLine();
                this.renderSeries();
                if (this.trendLineElements) {
                    helper_1.appendChildElement(this.enableCanvas, this.svgObject, this.trendLineElements, this.redraw);
                }
                this.appendElementsAfterSeries(axisElement);
            }
        };
        Chart.prototype.renderSeries = function () {
            var visibility;
            if (this.enableCanvas) {
                this.renderer.canvasClip(this.chartAxisLayoutPanel.seriesClipRect);
            }
            for (var _i = 0, _a = this.visibleSeries; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.category === 'TrendLine') {
                    visibility = this.series[item.sourceIndex].trendlines[item.index].visible;
                }
                else {
                    visibility = item.visible;
                }
                if (visibility) {
                    this.visible++;
                    helper_1.findClipRect(item, this.enableCanvas);
                    if (this.enableCanvas) {
                        this.renderCanvasSeries(item);
                    }
                    item.renderSeries(this);
                }
            }
            if (this.enableCanvas) {
                this.renderer.canvasRestore();
            }
            this.visible = 0;
            var options = {
                'id': this.element.id + '_ChartAreaClipRect_',
                'x': this.chartAxisLayoutPanel.seriesClipRect.x,
                'y': this.chartAxisLayoutPanel.seriesClipRect.y,
                'width': this.chartAxisLayoutPanel.seriesClipRect.width,
                'height': this.chartAxisLayoutPanel.seriesClipRect.height,
                'fill': 'transparent',
                'stroke-width': 1,
                'stroke': 'Gray'
            };
            if (!this.seriesElements) {
                return;
            }
            var clipRectElement;
            if (this.chartAreaType === 'PolarRadar') {
                clipRectElement = helper_3.appendClipElement(this.redraw, options, this.renderer, 'drawCircularClipPath');
            }
            else {
                clipRectElement = helper_3.appendClipElement(this.redraw, options, this.renderer);
            }
            if (!this.enableCanvas) {
                this.seriesElements.appendChild(clipRectElement);
            }
            var seriesSvg = document.getElementById(this.element.id + '_series_svg');
            if (seriesSvg) {
                helper_1.appendChildElement(false, seriesSvg, this.seriesElements, this.redraw);
            }
            else {
                helper_1.appendChildElement(this.enableCanvas, this.svgObject, this.seriesElements, this.redraw);
            }
        };
        Chart.prototype.renderCanvasSeries = function (item) {
            var svgElement;
            var divElement;
            if ((item.type === 'Bubble' || item.type === 'Scatter' || item.drawType === 'Scatter')) {
                svgElement = !svgElement ? this.svgRenderer.createSvg({ id: this.element.id + '_series_svg',
                    width: this.availableSize.width, height: this.availableSize.height }) : svgElement;
                divElement = !divElement ? this.createElement('div', { id: this.element.id + '_series' }) : divElement;
                divElement.style.cssText = 'position: absolute';
                var mainElement = document.getElementById(this.element.id + '_Secondary_Element');
                divElement.appendChild(svgElement);
                mainElement.appendChild(divElement);
            }
            svgElement = (this.enableCanvas && (item.type === 'Bubble' || item.type === 'Scatter' || item.drawType === 'Scatter')) ?
                svgElement : this.svgObject;
            var canvas = (this.enableCanvas && (item.type === 'Bubble' || item.type === 'Scatter' || item.drawType === 'Scatter')) ?
                false : this.enableCanvas;
        };
        Chart.prototype.initializeIndicator = function () {
            for (var _i = 0, _a = this.indicators; _i < _a.length; _i++) {
                var indicator = _a[_i];
                if (this[helper_2.firstToLowerCase(indicator.type) + 'IndicatorModule']) {
                    this[helper_2.firstToLowerCase(indicator.type) + 'IndicatorModule'].createIndicatorElements(this, indicator, indicator.index);
                }
            }
            if (this.indicatorElements) {
                helper_1.appendChildElement(this.enableCanvas, this.svgObject, this.indicatorElements, this.redraw);
            }
        };
        Chart.prototype.initializeTrendLine = function () {
            for (var _i = 0, _a = this.visibleSeries; _i < _a.length; _i++) {
                var series = _a[_i];
                if (series.trendlines.length) {
                    this.trendLineModule.getTrendLineElements(series, this);
                }
            }
        };
        Chart.prototype.appendElementsAfterSeries = function (axisElement) {
            if (this.chartAreaType === 'PolarRadar') {
                helper_1.appendChildElement(this.enableCanvas, this.svgObject, this.yAxisElements, this.redraw);
            }
            helper_1.appendChildElement(this.enableCanvas, this.svgObject, axisElement, this.redraw);
            if ((this.zoomModule && this.zoomSettings.enableScrollbar && this.scrollElement.childElementCount) ||
                (this.scrollElement && this.scrollElement.childElementCount)) {
                helper_1.appendChildElement(false, helper_4.getElement(this.element.id + '_Secondary_Element'), this.scrollElement, this.redraw);
            }
            if (this.stripLineModule) {
                this.stripLineModule.renderStripLine(this, 'Over', this.axisCollections);
            }
            if (!this.tooltip.enable) {
                helper_1.appendChildElement(this.enableCanvas, this.svgObject, this.renderer.createGroup({ id: this.element.id + '_UserInteraction', style: 'pointer-events:none;' }), this.redraw);
            }
            if (this.stockChart) {
                this.stockChart.calculateStockEvents();
            }
        };
        Chart.prototype.applyZoomkit = function () {
            if (this.chartAreaType === 'PolarRadar') {
                return;
            }
            if (!this.redraw && this.zoomModule && (!this.zoomSettings.enablePan || this.zoomModule.performedUI)) {
                this.zoomModule.applyZoomToolkit(this, this.axisCollections);
            }
        };
        Chart.prototype.renderAnnotation = function () {
            if (this.annotationModule) {
                this.annotationModule.renderAnnotations(helper_4.getElement((this.stockChart ? this.stockChart.element.id : this.element.id) + '_Secondary_Element'));
            }
        };
        Chart.prototype.performSelection = function () {
            var selectedDataIndexes = [];
            if (this.selectionModule) {
                selectedDataIndexes = ej2_base_4.extend([], this.selectionModule.selectedDataIndexes, null, true);
                this.selectionModule.invokeSelection(this);
            }
            if (this.highlightModule) {
                this.highlightModule.invokeHighlight(this);
            }
            if (selectedDataIndexes.length > 0) {
                this.selectionModule.selectedDataIndexes = selectedDataIndexes;
                this.selectionModule.redrawSelection(this, this.selectionMode);
            }
        };
        Chart.prototype.processData = function (render) {
            if (render === void 0) { render = true; }
            this.visibleSeriesCount = 0;
            var check = true;
            var prevPointCount = 0;
            for (var _i = 0, _a = this.visibleSeries; _i < _a.length; _i++) {
                var series = _a[_i];
                if (!series.visible && !this.legendSettings.visible) {
                    this.visibleSeriesCount++;
                    continue;
                }
                if (series.category !== 'Indicator' && series.category !== 'TrendLine') {
                    this.initializeDataModule(series);
                }
            }
            for (var _b = 0, _c = this.indicators; _b < _c.length; _b++) {
                var indicator = _c[_b];
                if (indicator.dataSource) {
                    var techIndicator = indicator;
                    this.initializeDataModule(techIndicator);
                    check = false;
                }
            }
            if (render && (!this.visibleSeries.length || this.visibleSeriesCount === this.visibleSeries.length && check)) {
                this.refreshBound();
                this.trigger('loaded', { chart: this.isBlazor ? {} : this });
            }
            if (!this.stockChart && this.visibleSeries.length > 0) {
                for (var _d = 0, _e = this.visibleSeries; _d < _e.length; _d++) {
                    var series = _e[_d];
                    if (!ej2_base_2.isNullOrUndefined(series.points)) {
                        this.maxPointCount = Math.max(prevPointCount, series.points.length);
                        prevPointCount = series.points.length;
                    }
                }
            }
        };
        Chart.prototype.initializeDataModule = function (series) {
            series.xData = [];
            series.yData = [];
            var dataSource;
            var isAngular = 'isAngular';
            if (this[isAngular]) {
                dataSource = Object.keys(series.dataSource).length ? series.dataSource : this.dataSource;
            }
            else {
                dataSource = series.dataSource || this.dataSource;
            }
            series.dataModule = new data_1.Data(dataSource, series.query);
            series.points = [];
            series.refreshDataManager(this);
        };
        Chart.prototype.calculateBounds = function () {
            var margin = this.margin;
            var titleHeight = 0;
            var subTitleHeight = 0;
            var titleWidth = 0;
            var padding = 15;
            var left = margin.left;
            var width = this.availableSize.width - left - margin.right - this.border.width;
            this.titleCollection = [];
            this.subTitleCollection = [];
            if (this.title) {
                this.titleCollection = helper_4.getTitle(this.title, this.titleStyle, width);
                titleHeight = (ej2_svg_base_1.measureText(this.title, this.titleStyle).height * this.titleCollection.length) + padding;
                if (this.subTitle) {
                    var maxWidth = 0;
                    for (var _i = 0, _a = this.titleCollection; _i < _a.length; _i++) {
                        var titleText = _a[_i];
                        titleWidth = ej2_svg_base_1.measureText(titleText, this.titleStyle).width;
                        maxWidth = titleWidth > maxWidth ? titleWidth : maxWidth;
                    }
                    this.subTitleCollection = helper_4.getTitle(this.subTitle, this.subTitleStyle, maxWidth);
                    subTitleHeight = (ej2_svg_base_1.measureText(this.subTitle, this.subTitleStyle).height * this.subTitleCollection.length) +
                        padding;
                }
            }
            var top = margin.top + subTitleHeight + titleHeight + this.chartArea.border.width * 0.5;
            var height = this.availableSize.height - top - this.border.width - margin.bottom;
            if (this.stockChart && this.stockChart.legendSettings.visible && this.stockChart.stockLegendModule) {
                if (this.stockChart.legendSettings.position === "Top") {
                    top += this.stockChart.stockLegendModule.legendBounds.height;
                }
                else if (this.stockChart.legendSettings.position === "Left") {
                    left += this.stockChart.stockLegendModule.legendBounds.width;
                }
            }
            this.initialClipRect = new ej2_svg_base_1.Rect(left, top, width, height);
            if (this.legendModule && this.legendSettings.visible) {
                this.legendModule.calculateLegendBounds(this.initialClipRect, this.availableSize, null);
            }
            this.chartAxisLayoutPanel.measureAxis(this.initialClipRect);
        };
        Chart.prototype.print = function (id) {
            var exportChart = new export_1.ExportUtils(this);
            exportChart.print(id);
        };
        Chart.prototype.initTrendLines = function () {
            this.isProtectedOnChange = true;
            for (var _i = 0, _a = this.visibleSeries; _i < _a.length; _i++) {
                var series = _a[_i];
                var trendIndex = 0;
                for (var _b = 0, _c = series.trendlines; _b < _c.length; _b++) {
                    var trendline = _c[_b];
                    var trendLine = trendline;
                    if (this.trendLineModule) {
                        trendLine.index = trendIndex;
                        trendLine.sourceIndex = series.index;
                        this.trendLineModule.initSeriesCollection(trendLine, this);
                        if (trendLine.targetSeries) {
                            trendLine.targetSeries.xAxisName = series.xAxisName;
                            trendLine.targetSeries.yAxisName = series.yAxisName;
                            this.visibleSeries.push(trendLine.targetSeries);
                        }
                    }
                    trendIndex++;
                }
            }
            this.isProtectedOnChange = false;
        };
        Chart.prototype.calculateAreaType = function () {
            var series = this.series[0];
            this.chartArea.border.width = this.stockChart ? 0 : this.chartArea.border.width;
            if (series) {
                this.requireInvertedAxis = ((series.type.indexOf('Bar') !== -1) && !this.isTransposed) ||
                    ((series.type.indexOf('Bar') === -1) && this.isTransposed && this.chartAreaType !== 'PolarRadar');
            }
            this.chartAxisLayoutPanel = this.chartAreaType === 'PolarRadar' ? (this.polarSeriesModule || this.radarSeriesModule)
                : new cartesian_panel_1.CartesianAxisLayoutPanel(this);
        };
        Chart.prototype.calculateVisibleAxis = function () {
            var axis;
            var axes = [this.primaryXAxis, this.primaryYAxis];
            axes = this.chartAreaType === 'Cartesian' ? axes.concat(this.axes) : axes;
            if (this.paretoSeriesModule && this.series[0].type === 'Pareto') {
                axes = axes.concat(this.paretoSeriesModule.paretoAxes);
            }
            this.axisCollections = [];
            if (this.zoomModule) {
                this.zoomModule.isPanning = this.zoomModule.isAxisZoomed(axes) && this.zoomSettings.enablePan;
                this.svgObject.setAttribute('cursor', this.zoomModule.isPanning ? 'pointer' : 'auto');
                if (this.scrollBarModule) {
                    this.scrollBarModule.axes = axes;
                }
            }
            if (this.scrollSettingEnabled) {
                if (this.scrollBarModule) {
                    this.scrollBarModule.axes = axes;
                }
            }
            for (var i = 0, len = axes.length; i < len; i++) {
                axis = axes[i];
                axis.series = [];
                axis.labels = [];
                axis.indexLabels = {};
                for (var _i = 0, _a = this.visibleSeries; _i < _a.length; _i++) {
                    var series = _a[_i];
                    this.initAxis(series, axis, true);
                }
                for (var _b = 0, _c = this.indicators; _b < _c.length; _b++) {
                    var indicator = _c[_b];
                    this.initAxis(indicator, axis, false);
                }
                if (this.scrollBarModule && !axis.zoomingScrollBar) {
                    this.scrollBarModule.injectTo(axis, this);
                }
                if (axis.orientation != null) {
                    this.axisCollections.push(axis);
                }
            }
            if (this.rows.length > 0 && this.columns.length > 0) {
                this.chartAxisLayoutPanel.measure();
            }
        };
        Chart.prototype.initAxis = function (series, axis, isSeries) {
            if (series.xAxisName === axis.name || (series.xAxisName == null && axis.name === 'primaryXAxis')) {
                axis.orientation = this.requireInvertedAxis ? 'Vertical' : 'Horizontal';
                series.xAxis = axis;
                if (isSeries) {
                    axis.series.push(series);
                }
            }
            else if (series.yAxisName === axis.name || (series.yAxisName == null && axis.name === 'primaryYAxis')) {
                axis.orientation = this.requireInvertedAxis ? 'Horizontal' : 'Vertical';
                series.yAxis = axis;
                if (isSeries) {
                    axis.series.push(series);
                }
            }
        };
        Chart.prototype.initTechnicalIndicators = function () {
            var i = 0;
            for (var _i = 0, _a = this.indicators; _i < _a.length; _i++) {
                var indicator = _a[_i];
                var techIndicator = indicator;
                var type = helper_2.firstToLowerCase(techIndicator.type);
                if (this[type + 'IndicatorModule']) {
                    techIndicator.index = i;
                    this[type + 'IndicatorModule'].initSeriesCollection(techIndicator, this);
                    for (var _b = 0, _c = techIndicator.targetSeries; _b < _c.length; _b++) {
                        var targetSeries = _c[_b];
                        if (indicator.seriesName || indicator.dataSource) {
                            this.visibleSeries.push(targetSeries);
                        }
                    }
                }
                i++;
            }
        };
        Chart.prototype.refreshTechnicalIndicator = function (series) {
            if (this.indicators.length) {
                var targetIndicator = null;
                if (series instanceof chart_series_1.Series && series.category !== 'Indicator') {
                    for (var _i = 0, _a = this.indicators; _i < _a.length; _i++) {
                        var indicator = _a[_i];
                        if (indicator.seriesName === series.name && !indicator.dataSource) {
                            targetIndicator = indicator;
                            targetIndicator.setDataSource(series, this);
                        }
                    }
                }
                else if (series instanceof technical_indicator_1.TechnicalIndicator) {
                    targetIndicator = series;
                    targetIndicator.setDataSource(series instanceof chart_series_1.Series ? series : null, this);
                }
            }
        };
        Chart.prototype.calculateVisibleSeries = function () {
            var series;
            this.visibleSeries = [];
            var colors = this.palettes.length ? this.palettes : theme_1.getSeriesColor(this.theme);
            var count = colors.length;
            var seriesCollection = this.series.sort(function (a, b) { return a.zOrder - b.zOrder; });
            for (var i = 0, len = seriesCollection.length; i < len; i++) {
                series = seriesCollection[i];
                series.category = seriesCollection[0].type === 'Pareto' ? 'Pareto' : 'Series';
                series.index = i;
                series.interior = series.fill || colors[i % count];
                switch (series.type) {
                    case 'Bar':
                    case 'StackingBar':
                    case 'StackingBar100':
                        if (seriesCollection[0].type.indexOf('Bar') === -1) {
                            continue;
                        }
                        break;
                    case 'Polar':
                    case 'Radar':
                        if (this.chartAreaType !== 'PolarRadar') {
                            continue;
                        }
                        if (this.chartAreaType === 'PolarRadar' && ((series.xAxisName === null && series.yAxisName !== null) ||
                            (series.xAxisName !== null && series.yAxisName === null) ||
                            (series.xAxisName !== null && series.yAxisName !== null))) {
                            continue;
                        }
                        break;
                    case 'Pareto':
                        this.visibleSeries.push(series);
                        this.paretoSeriesModule.initSeries(series, this);
                        continue;
                    default:
                        if (this.chartAreaType === 'PolarRadar' || seriesCollection[0].type.indexOf('Bar') > -1) {
                            continue;
                        }
                        break;
                }
                this.visibleSeries.push(series);
                seriesCollection[i] = series;
            }
        };
        Chart.prototype.renderTitle = function () {
            var rect;
            var margin = this.margin;
            if (this.title) {
                var getAnchor = helper_2.getTextAnchor(this.titleStyle.textAlignment, this.enableRtl);
                var elementSize = ej2_svg_base_1.measureText(this.title, this.titleStyle);
                rect = new ej2_svg_base_1.Rect(margin.left, 0, this.availableSize.width - margin.left - margin.right, 0);
                var options = new ej2_svg_base_1.TextOption(this.element.id + '_ChartTitle', helper_2.titlePositionX(rect, this.titleStyle), this.margin.top + ((elementSize.height) * 3 / 4), getAnchor, this.titleCollection, '', 'auto');
                var element = helper_2.redrawElement(this.redraw, this.element.id + '_ChartTitle', options, this.renderer) ||
                    helper_2.textElement(this.renderer, options, this.titleStyle, this.titleStyle.color || this.themeStyle.chartTitle, this.svgObject, null, null, null, null, null, null, null, null, this.enableCanvas);
                if (element) {
                    element.setAttribute('aria-label', this.description || this.title);
                    element.setAttribute('tabindex', '0');
                    element.setAttribute('class', 'e-chart-focused');
                }
                if (this.subTitle) {
                    this.renderSubTitle(options);
                }
            }
        };
        Chart.prototype.renderSubTitle = function (options) {
            var maxWidth = 0;
            var titleWidth = 0;
            var padding = 10;
            var alignment = this.titleStyle.textAlignment;
            for (var _i = 0, _a = this.titleCollection; _i < _a.length; _i++) {
                var titleText = _a[_i];
                titleWidth = ej2_svg_base_1.measureText(titleText, this.titleStyle).width;
                maxWidth = titleWidth > maxWidth ? titleWidth : maxWidth;
            }
            var subTitleElementSize = ej2_svg_base_1.measureText(this.subTitle, this.subTitleStyle);
            var rect = new ej2_svg_base_1.Rect(alignment === 'Center' ? (options.x - maxWidth * 0.5) : alignment === 'Far' ? options.x - maxWidth : options.x, 0, maxWidth, 0);
            var subTitleOptions = new ej2_svg_base_1.TextOption(this.element.id + '_ChartSubTitle', helper_2.titlePositionX(rect, this.subTitleStyle), options.y * options.text.length + ((subTitleElementSize.height) * 3 / 4) + padding, helper_2.getTextAnchor(this.subTitleStyle.textAlignment, this.enableRtl), this.subTitleCollection, '', 'auto');
            var element = helper_2.redrawElement(this.redraw, this.element.id + '_ChartSubTitle', subTitleOptions, this.renderer) ||
                helper_2.textElement(this.renderer, subTitleOptions, this.subTitleStyle, this.subTitleStyle.color || this.themeStyle.chartTitle, this.svgObject, null, null, null, null, null, null, null, null, this.enableCanvas);
            if (element) {
                element.setAttribute('aria-label', this.description || this.subTitle);
                element.setAttribute('tabindex', '0');
            }
        };
        Chart.prototype.renderBorder = function () {
            var x = 0;
            var y = 0;
            var width = this.border.width;
            var backGroundImage = this.backgroundImage;
            var fillColor = backGroundImage ? 'transparent' : (this.background || this.themeStyle.background);
            if (this.stockChart && this.stockChart.legendSettings.visible && this.stockChart.stockLegendModule) {
                if (this.stockChart.legendSettings.position === "Top") {
                    y += this.stockChart.stockLegendModule.legendBounds.height;
                }
                else if (this.stockChart.legendSettings.position === "Left") {
                    x += this.stockChart.stockLegendModule.legendBounds.width;
                }
            }
            var rect = new helper_2.RectOption(this.element.id + '_ChartBorder', fillColor, this.border, 1, new ej2_svg_base_1.Rect(width * 0.5 + x, width * 0.5 + y, this.availableSize.width - width, this.availableSize.height - width));
            this.htmlObject = helper_2.redrawElement(this.redraw, this.element.id + '_ChartBorder', rect, this.renderer)
                || this.renderer.drawRectangle(rect);
            helper_1.appendChildElement(this.enableCanvas, this.svgObject, this.htmlObject, this.redraw);
            if (backGroundImage) {
                var image = new helper_1.ImageOption(this.availableSize.height - width, this.availableSize.width - width, backGroundImage, 0, 0, this.element.id + '_ChartBackground', 'visible', 'none');
                this.htmlObject = helper_2.redrawElement(this.redraw, this.element.id + '_ChartBackground', image, this.renderer)
                    || this.renderer.drawImage(image);
                helper_1.appendChildElement(this.enableCanvas, this.svgObject, this.htmlObject, this.redraw);
            }
        };
        Chart.prototype.renderAreaBorder = function () {
            if (this.chartAreaType === 'PolarRadar') {
                return null;
            }
            else {
                var element = helper_4.getElement(this.element.id + '_ChartAreaBorder');
                var previousRect = element ?
                    new ej2_svg_base_1.Rect(+element.getAttribute('x'), +element.getAttribute('y'), +element.getAttribute('width'), +element.getAttribute('height')) : null;
                var rect = new helper_2.RectOption(this.element.id + '_ChartAreaBorder', this.chartArea.background, { width: this.chartArea.border.width, color: this.chartArea.border.color || this.themeStyle.areaBorder }, this.chartArea.opacity, this.chartAxisLayoutPanel.seriesClipRect);
                this.htmlObject = this.renderer.drawRectangle(rect);
                helper_1.appendChildElement(this.enableCanvas, this.svgObject, this.htmlObject, this.redraw, true, 'x', 'y', null, null, true, true, previousRect);
                this.htmlObject = null;
            }
            var backGroundImage = this.chartArea.backgroundImage;
            if (backGroundImage) {
                var width = this.chartArea.border.width;
                var image = new helper_1.ImageOption(this.initialClipRect.height - width, this.initialClipRect.width - width, backGroundImage, this.initialClipRect.x, this.initialClipRect.y, this.element.id + '_ChartAreaBackground', 'visible', 'none');
                this.htmlObject = this.renderer.drawImage(image);
                helper_1.appendChildElement(this.enableCanvas, this.svgObject, this.htmlObject, this.redraw, true, 'x', 'y', null, null, true, true);
            }
        };
        Chart.prototype.addSeries = function (seriesCollection) {
            for (var _i = 0, seriesCollection_1 = seriesCollection; _i < seriesCollection_1.length; _i++) {
                var series = seriesCollection_1[_i];
                series = new chart_series_1.Series(this, 'series', series);
                this.series.push(series);
            }
            this.refresh();
        };
        Chart.prototype.removeSeries = function (index) {
            this.redraw = false;
            this.series.splice(index, 1);
            this.refresh();
        };
        Chart.prototype.clearSeries = function () {
            this.series = [];
            this.refresh();
        };
        Chart.prototype.addAxes = function (axisCollection) {
            for (var _i = 0, axisCollection_1 = axisCollection; _i < axisCollection_1.length; _i++) {
                var axis = axisCollection_1[_i];
                axis = new axis_1.Axis(this, 'axes', axis);
                if (this.isBlazor) {
                    axis.interval = isNaN(axis.interval) ? null : axis.interval;
                    axis.desiredIntervals = isNaN(axis.desiredIntervals) ? null : axis.desiredIntervals;
                }
                this.axes.push(axis);
            }
            this.refresh();
        };
        Chart.prototype.removeAxis = function (index) {
            this.redraw = false;
            this.axes.splice(index, 1);
            this.refresh();
        };
        Chart.prototype.destroy = function () {
            if (this.scrollBarModule) {
                this.scrollBarModule.destroy();
            }
            if (this.markerRender) {
                this.markerRender.removeEventListener();
                this.markerRender = null;
            }
            this.horizontalAxes = [];
            this.verticalAxes = [];
            this.visibleSeries = [];
            this.axisCollections = [];
            this.rotatedDataLabelCollections = [];
            this.seriesElements = null;
            this.chartAxisLayoutPanel = null;
            this.dataLabelCollections = null;
            this.dataLabelElements = null;
            this.yAxisElements = null;
            if (this.element) {
                this.unWireEvents();
                if (this.isReact) {
                    this.clearTemplate();
                }
                _super.prototype.destroy.call(this);
                if (!this.enableCanvas) {
                    this.removeSvg();
                    this.svgObject = null;
                }
            }
        };
        Chart.prototype.getModuleName = function () {
            return 'chart';
        };
        Chart.prototype.getPersistData = function () {
            var keyEntity = ['loaded', 'animationComplete', 'primaryXAxis', 'primaryYAxis'];
            return this.addOnPersist(keyEntity);
        };
        Chart.prototype.createChartSvg = function () {
            this.removeSvg();
            helper_2.createSvg(this);
        };
        Chart.prototype.unWireEvents = function () {
            var startEvent = ej2_base_5.Browser.touchStartEvent;
            var moveEvent = ej2_base_5.Browser.touchMoveEvent;
            var stopEvent = ej2_base_5.Browser.touchEndEvent;
            var cancelEvent = ej2_base_5.Browser.isPointer ? 'pointerleave' : 'mouseleave';
            ej2_base_6.EventHandler.remove(this.element, startEvent, this.chartOnMouseDown);
            ej2_base_6.EventHandler.remove(this.element, moveEvent, this.mouseMove);
            ej2_base_6.EventHandler.remove(this.element, stopEvent, this.mouseEnd);
            ej2_base_6.EventHandler.remove(this.element, 'click', this.chartOnMouseClick);
            ej2_base_6.EventHandler.remove(this.element, 'dblclick', this.chartOnDoubleClick);
            ej2_base_6.EventHandler.remove(this.element, 'contextmenu', this.chartRightClick);
            ej2_base_6.EventHandler.remove(this.element, cancelEvent, this.mouseLeave);
            ej2_base_6.EventHandler.remove(this.element, "keydown", this.chartKeyDown);
            ej2_base_6.EventHandler.remove(document.body, 'keydown', this.documentKeyHandler);
            ej2_base_6.EventHandler.remove(this.element, "keyup", this.chartKeyUp);
            window.removeEventListener((ej2_base_5.Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.resizeBound);
            if (this.touchObject) {
                this.touchObject.destroy();
                this.touchObject = null;
            }
        };
        Chart.prototype.wireEvents = function () {
            if (!this.element) {
                return;
            }
            var cancelEvent = ej2_base_5.Browser.isPointer ? 'pointerleave' : 'mouseleave';
            ej2_base_6.EventHandler.add(this.element, ej2_base_5.Browser.touchStartEvent, this.chartOnMouseDown, this);
            ej2_base_6.EventHandler.add(this.element, ej2_base_5.Browser.touchMoveEvent, this.mouseMove, this);
            ej2_base_6.EventHandler.add(this.element, ej2_base_5.Browser.touchEndEvent, this.mouseEnd, this);
            ej2_base_6.EventHandler.add(this.element, 'click', this.chartOnMouseClick, this);
            ej2_base_6.EventHandler.add(this.element, 'dblclick', this.chartOnDoubleClick, this);
            ej2_base_6.EventHandler.add(this.element, 'contextmenu', this.chartRightClick, this);
            ej2_base_6.EventHandler.add(this.element, cancelEvent, this.mouseLeave, this);
            ej2_base_6.EventHandler.add(this.element, "keydown", this.chartKeyDown, this);
            ej2_base_6.EventHandler.add(document.body, 'keydown', this.documentKeyHandler, this);
            ej2_base_6.EventHandler.add(this.element, "keyup", this.chartKeyUp, this);
            this.resizeBound = this.chartResize.bind(this);
            window.addEventListener((ej2_base_5.Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.resizeBound);
            this.longPressBound = this.longPress.bind(this);
            this.touchObject = new ej2_base_5.Touch(this.element, { tapHold: this.longPressBound, tapHoldThreshold: 500 });
            this.setStyle(this.element);
        };
        Chart.prototype.chartRightClick = function (event) {
            if (this.crosshair.enable && this.crosshairModule &&
                (event.buttons === 2 || event.which === 0 || event.pointerType === 'touch')) {
                event.preventDefault();
                event.stopPropagation();
                return false;
            }
            return true;
        };
        Chart.prototype.setStyle = function (element) {
            var zooming = this.zoomSettings;
            var disableScroll = zooming.enableSelectionZooming || zooming.enablePinchZooming ||
                this.selectionMode !== 'None' || this.crosshair.enable || this.highlightMode !== 'None';
            element.style.touchAction = disableScroll ? 'none' : 'element';
            element.style.msTouchAction = disableScroll ? 'none' : 'element';
            element.style.msContentZooming = 'none';
            element.style.msUserSelect = 'none';
            element.style.webkitUserSelect = 'none';
            element.style.position = 'relative';
            element.style.display = 'block';
            element.style.overflow = 'hidden';
        };
        Chart.prototype.isOrientation = function () {
            return ('orientation' in window && 'onorientationchange' in window);
        };
        Chart.prototype.longPress = function (e) {
            this.mouseX = (e && e.originalEvent.changedTouches) ? (e.originalEvent.changedTouches[0].clientX) : 0;
            this.mouseY = (e && e.originalEvent.changedTouches) ? (e.originalEvent.changedTouches[0].clientY) : 0;
            this.startMove = true;
            this.setMouseXY(this.mouseX, this.mouseY);
            this.notify('tapHold', e);
            return false;
        };
        Chart.prototype.setMouseXY = function (pageX, pageY) {
            if (helper_4.getElement(this.svgId)) {
                var svgRect = helper_4.getElement(this.svgId).getBoundingClientRect();
                var rect = this.element.getBoundingClientRect();
                this.mouseY = ((pageY - rect.top) - Math.max(svgRect.top - rect.top, 0) / this.scaleX);
                this.mouseX = ((pageX - rect.left) - Math.max(svgRect.left - rect.left, 0) / this.scaleY);
            }
        };
        Chart.prototype.export = function (type, fileName) {
            if (this.exportModule) {
                this.exportModule.export(type, fileName);
                if (this.afterExport) {
                    this.exportModule.getDataUrl(this);
                }
            }
        };
        Chart.prototype.chartResize = function () {
            var _this = this;
            this.animateSeries = false;
            var arg = {
                chart: this.isBlazor ? {} : this,
                name: constants_2.resized,
                currentSize: new ej2_svg_base_1.Size(0, 0),
                previousSize: new ej2_svg_base_1.Size(this.availableSize.width, this.availableSize.height)
            };
            var beforeResizeArgs = { name: 'beforeResize', cancelResizedEvent: false };
            if (this.resizeTo) {
                clearTimeout(this.resizeTo);
            }
            this.trigger(constants_1.beforeResize, beforeResizeArgs);
            if (!beforeResizeArgs.cancelResizedEvent) {
                this.resizeTo = +setTimeout(function () {
                    if (_this.isDestroyed || _this.stockChart) {
                        clearTimeout(_this.resizeTo);
                        return;
                    }
                    _this.createChartSvg();
                    arg.currentSize = _this.availableSize;
                    _this.trigger(constants_2.resized, arg);
                    _this.refreshAxis();
                    _this.refreshBound();
                    _this.trigger('loaded', { chart: _this.isBlazor ? {} : _this });
                }, 500);
            }
            return false;
        };
        Chart.prototype.mouseMove = function (e) {
            var pageX;
            var pageY;
            var touchArg;
            if (e.type === 'touchmove') {
                this.isTouch = true;
                touchArg = e;
                pageX = touchArg.changedTouches[0].clientX;
                pageY = touchArg.changedTouches[0].clientY;
            }
            else {
                this.isTouch = e.pointerType === 'touch' || e.pointerType === '2' || this.isTouch;
                pageX = e.clientX;
                pageY = e.clientY;
            }
            if (helper_4.getElement(this.svgId)) {
                this.setMouseXY(pageX, pageY);
                this.chartOnMouseMove(e);
            }
            return false;
        };
        Chart.prototype.mouseLeave = function (e) {
            var pageX;
            var pageY;
            var touchArg;
            if (e.type === 'touchleave') {
                this.isTouch = true;
                touchArg = e;
                pageX = touchArg.changedTouches[0].clientX;
                pageY = touchArg.changedTouches[0].clientY;
            }
            else {
                this.isTouch = e.pointerType === 'touch' || e.pointerType === '2';
                pageX = e.clientX;
                pageY = e.clientY;
            }
            this.setMouseXY(pageX, pageY);
            this.chartOnMouseLeave(e);
            return false;
        };
        Chart.prototype.chartOnMouseLeave = function (e) {
            var element = e.target;
            var cancelEvent = ej2_base_5.Browser.isPointer ? 'pointerleave' : 'mouseleave';
            this.trigger(constants_2.chartMouseLeave, { target: element.id, x: this.mouseX, y: this.mouseY });
            helper_1.removeElement(this.element.id + '_EJ2_AxisLabel_Tooltip');
            this.isChartDrag = this.isPointMouseDown = false;
            this.notify(cancelEvent, e);
            return false;
        };
        Chart.prototype.chartOnDoubleClick = function (e) {
            var element = e.target;
            this.trigger(constants_1.chartDoubleClick, { target: element.id, x: this.mouseX, y: this.mouseY });
            return false;
        };
        Chart.prototype.chartKeyDown = function (e) {
            var actionKey = "";
            if ((this.isZoomed && e.code == "Tab") || e.code == "Space") {
                e.preventDefault();
            }
            if (this.tooltip.enable && ((e.code == "Tab" && this.previousTargetId.indexOf("Series") > -1) || e.code === "Escape")) {
                actionKey = "ESC";
            }
            if (this.highlightMode != "None" && e.code == "Tab" && this.previousTargetId.indexOf("_chart_legend_") > -1) {
                if (this.highlightModule) {
                    this.highlightModule.removeLegendHighlightStyles();
                }
            }
            if (e.ctrlKey && (e.key === '+' || e.code === 'Equal' || e.key === '-' || e.code === 'Minus')) {
                e.preventDefault();
                this.isZoomed = this.zoomModule && (this.zoomSettings.enableDeferredZooming || this.zoomSettings.enableSelectionZooming ||
                    this.zoomSettings.enablePinchZooming || this.zoomSettings.enableMouseWheelZooming);
                actionKey = this.isZoomed ? e.code : "";
            }
            else if (e["keyCode"] === 82 && this.isZoomed) {
                e.preventDefault();
                this.isZoomed = false;
                actionKey = "R";
            }
            else if (e.code.indexOf("Arrow") > -1) {
                e.preventDefault();
                actionKey = this.isZoomed ? e.code : "";
            }
            if (e.ctrlKey && (e.key === 'p')) {
                e.preventDefault();
                actionKey = "CtrlP";
            }
            if (actionKey != "")
                this.chartKeyboardNavigations(e, e.target.id, actionKey);
            return false;
        };
        Chart.prototype.chartKeyUp = function (e) {
            var actionKey = "";
            var targetId = e.target['id'];
            var groupElement;
            var markerGroup;
            var targetElement = e.target;
            var titleElement = helper_4.getElement(this.element.id + "_ChartTitle");
            var seriesElement = helper_4.getElement(this.element.id + "SeriesCollection");
            var legendElement = helper_4.getElement(this.element.id + "_chart_legend_translate_g");
            var pagingElement = helper_4.getElement(this.element.id + "_chart_legend_pageup");
            if (titleElement) {
                titleElement.setAttribute("class", "e-chart-focused");
            }
            if (seriesElement && seriesElement.firstElementChild && seriesElement.firstElementChild.children[1]) {
                var firstChild = seriesElement.firstElementChild.children[1];
                var className = firstChild.getAttribute("class");
                if (className && className.indexOf("e-chart-focused") === -1) {
                    className = className + " e-chart-focused";
                }
                else if (!className) {
                    className = "e-chart-focused";
                }
                firstChild.setAttribute("class", className);
            }
            if (legendElement) {
                var firstChild = legendElement.firstElementChild;
                var className = firstChild.getAttribute("class");
                if (className && className.indexOf("e-chart-focused") === -1) {
                    className = className + " e-chart-focused";
                }
                else if (!className) {
                    className = "e-chart-focused";
                }
                firstChild.setAttribute("class", className);
            }
            if (pagingElement) {
                pagingElement.setAttribute("class", "e-chart-focused");
            }
            if (e.code == "Tab") {
                if (this.previousTargetId != "") {
                    if ((this.previousTargetId.indexOf("_Series_") > -1 && targetId.indexOf("_Series_") == -1)) {
                        groupElement = helper_4.getElement(this.element.id + "SeriesCollection");
                        var previousElement = this.previousTargetId.indexOf("_Symbol") > -1 ?
                            helper_4.getElement(this.element.id + "SymbolGroup" + this.currentSeriesIndex).children[this.currentPointIndex + 1] :
                            (this.previousTargetId.indexOf("_Point_") > -1 ?
                                groupElement.children[this.currentSeriesIndex].children[this.currentPointIndex + 1] :
                                groupElement.children[this.currentSeriesIndex]);
                        this.setTabIndex(previousElement, groupElement.firstElementChild);
                        this.currentPointIndex = 0;
                        this.currentSeriesIndex = 0;
                    }
                    else if (this.previousTargetId.indexOf("_chart_legend_page") > -1 && targetId.indexOf("_chart_legend_page") == -1
                        && targetId.indexOf("_chart_legend_g_") == -1) {
                        this.setTabIndex(e.target, helper_4.getElement(this.element.id + "_chart_legend_pageup"));
                    }
                    else if (this.previousTargetId.indexOf("_chart_legend_g_") > -1 && targetId.indexOf("_chart_legend_g_") == -1) {
                        groupElement = helper_4.getElement(this.element.id + "_chart_legend_translate_g");
                        this.setTabIndex(groupElement.children[this.currentLegendIndex], groupElement.firstElementChild);
                    }
                }
                this.previousTargetId = targetId;
                if (targetId.indexOf("SeriesGroup") > -1) {
                    this.currentSeriesIndex = +targetId.split("SeriesGroup")[1];
                    targetElement.removeAttribute("tabindex");
                    targetElement.blur();
                    if (targetElement.children[1].id.indexOf("_Point_") == -1) {
                        markerGroup = helper_4.getElement(this.element.id + "SymbolGroup" + targetId.split("SeriesGroup")[1]);
                    }
                    targetId = this.focusChild((markerGroup != null ? markerGroup.children[1] : targetElement.children[1]));
                }
                actionKey = this.highlightMode !== "None" || this.tooltip.enable ? "Tab" : "";
            }
            else if (e.code.indexOf("Arrow") > -1) {
                e.preventDefault();
                this.previousTargetId = targetId;
                if (targetId.indexOf("_chart_legend_page") > -1) {
                    if (e.code == "ArrowLeft") {
                        helper_4.getElement(this.element.id + "_chart_legend_pagedown").removeAttribute("tabindex");
                        this.focusChild(helper_4.getElement(this.element.id + "_chart_legend_pageup"));
                    }
                    else if (e.code == "ArrowRight") {
                        helper_4.getElement(this.element.id + "_chart_legend_pageup").removeAttribute("tabindex");
                        this.focusChild(helper_4.getElement(this.element.id + "_chart_legend_pagedown"));
                    }
                }
                else if ((targetId.indexOf("_chart_legend_") > -1)) {
                    var legendElement_1 = targetElement.parentElement.children;
                    legendElement_1[this.currentLegendIndex].removeAttribute("tabindex");
                    this.currentLegendIndex += (e.code == "ArrowUp" || e.code == "ArrowRight") ? +1 : -1;
                    this.currentLegendIndex = this.getActualIndex(this.currentLegendIndex, legendElement_1.length);
                    var currentLegend = legendElement_1[this.currentLegendIndex];
                    this.focusChild(currentLegend);
                    targetId = currentLegend.children[1].id;
                    actionKey = this.highlightMode !== "None" ? "ArrowMove" : "";
                }
                else if (targetId.indexOf("_Series_") > -1) {
                    groupElement = targetElement.parentElement.parentElement;
                    var currentPoint = e.target;
                    targetElement.removeAttribute("tabindex");
                    targetElement.blur();
                    if (e.code == "ArrowRight" || e.code == "ArrowLeft") {
                        var seriesIndexes = [];
                        for (var i = 0; i < groupElement.children.length; i++) {
                            if (groupElement.children[i].id.indexOf("SeriesGroup") > -1) {
                                seriesIndexes.push(+groupElement.children[i].id.split("SeriesGroup")[1]);
                            }
                        }
                        this.currentSeriesIndex = seriesIndexes.indexOf(this.currentSeriesIndex) + (e.code == "ArrowRight" ? 1 : -1);
                        this.currentPointIndex = 0;
                        this.currentSeriesIndex = seriesIndexes[this.getActualIndex(this.currentSeriesIndex, seriesIndexes.length)];
                        groupElement = helper_4.getElement(this.element.id + "SeriesGroup" + this.currentSeriesIndex);
                        markerGroup = helper_4.getElement(this.element.id + "SymbolGroup" + this.currentSeriesIndex);
                        currentPoint = groupElement.children[1].id.indexOf("_Point_") == -1 && markerGroup ? markerGroup.children[1] :
                            groupElement.children[1];
                    }
                    else {
                        this.currentPointIndex += e.code == "ArrowUp" ? 1 : -1;
                        if (targetId.indexOf("_Symbol") > -1) {
                            this.currentPointIndex = this.getActualIndex(this.currentPointIndex, helper_4.getElement(this.element.id + "SymbolGroup" + this.currentSeriesIndex).childElementCount - 1);
                            currentPoint = helper_4.getElement(this.element.id + "_Series_" + this.currentSeriesIndex + "_Point_" +
                                this.currentPointIndex + "_Symbol");
                        }
                        else if (targetId.indexOf("_Point_") > -1) {
                            this.currentPointIndex = this.getActualIndex(this.currentPointIndex, helper_4.getElement(this.element.id + "SeriesGroup" + this.currentSeriesIndex).childElementCount - 1);
                            currentPoint = helper_4.getElement(this.element.id + "_Series_" + this.currentSeriesIndex + "_Point_" +
                                this.currentPointIndex);
                        }
                    }
                    targetId = this.focusChild(currentPoint);
                    actionKey = this.tooltip.enable || this.highlightMode !== "None" ? "ArrowMove" : "";
                }
            }
            else if ((e.code == "Enter" || e.code == "Space") && ((targetId.indexOf("_chart_legend_") > -1) ||
                (targetId.indexOf("_Point_") > -1))) {
                targetId = (targetId.indexOf("_chart_legend_page") > -1) ? targetId : ((targetId.indexOf("_chart_legend_") > -1) ?
                    targetElement.children[1].id : targetId);
                actionKey = "Enter";
            }
            if (actionKey !== "") {
                this.chartKeyboardNavigations(e, targetId, actionKey);
            }
            return false;
        };
        Chart.prototype.setTabIndex = function (previousElement, currentElement) {
            if (previousElement) {
                previousElement.removeAttribute("tabindex");
            }
            if (currentElement) {
                currentElement.setAttribute("tabindex", "0");
            }
        };
        Chart.prototype.getActualIndex = function (index, totalLength) {
            return index > totalLength - 1 ? 0 : (index < 0 ? totalLength - 1 : index);
        };
        Chart.prototype.focusChild = function (element) {
            element.setAttribute("tabindex", "0");
            var className = element.getAttribute("class");
            element.setAttribute("tabindex", "0");
            if (className && className.indexOf("e-chart-focused") === -1) {
                className = "e-chart-focused " + className;
            }
            else if (!className) {
                className = "e-chart-focused";
            }
            element.setAttribute("class", className);
            element.focus();
            return element.id;
        };
        Chart.prototype.documentKeyHandler = function (e) {
            if (e.altKey && e.keyCode === 74 && !ej2_base_2.isNullOrUndefined(this.element)) {
                this.element.focus();
            }
        };
        ;
        Chart.prototype.chartKeyboardNavigations = function (e, targetId, actionKey) {
            this.isLegendClicked = false;
            switch (actionKey) {
                case "Tab":
                case "ArrowMove":
                    if (this.highlightModule) {
                        this.highlightModule.removeLegendHighlightStyles();
                    }
                    if (targetId.indexOf("_Point_") > -1) {
                        var seriesIndex = +(targetId.split("_Series_")[1].split("_Point_")[0]);
                        var pointIndex = +(targetId.split("_Series_")[1].replace("_Symbol", "").split("_Point_")[1]);
                        var pointRegion = this.visibleSeries[seriesIndex].points[pointIndex].symbolLocations[0];
                        this.mouseX = pointRegion.x + this.initialClipRect.x;
                        this.mouseY = pointRegion.y + this.initialClipRect.y;
                        if (this.highlightModule) {
                            this.highlightModule.highlightChart(document.getElementById(targetId), "mousemove");
                            this.highlightModule.completeSelection(document.getElementById(targetId), "mousemove");
                        }
                        if (this.tooltipModule) {
                            this.tooltipModule.tooltip();
                        }
                    }
                    if (this.highlightModule && this.highlightMode !== 'None') {
                        targetId = targetId.indexOf("_chart_legend_g_") > -1 ? document.getElementById(targetId).firstChild['id'] : targetId;
                        var legendID = this.element.id + '_chart_legend';
                        var legendItemsId = [legendID + '_text_', legendID + '_shape_marker_',
                            legendID + '_shape_'];
                        for (var i = 0; i < legendItemsId.length; i++) {
                            var id = legendItemsId[i];
                            if (targetId.indexOf(id) > -1) {
                                document.getElementById(targetId).setAttribute("class", "");
                                this.highlightModule.legendSelection(this, parseInt(targetId.split(id)[1], 10), document.getElementById(targetId), "mousemove");
                                break;
                            }
                        }
                    }
                    break;
                case "Enter":
                case "Space":
                    if (targetId.indexOf("_chart_legend_") > -1) {
                        this.isLegendClicked = true;
                        this.legendModule.click(e);
                        this.focusChild(document.getElementById(targetId).parentElement);
                    }
                    else {
                        this.selectionModule.calculateSelectedElements(document.getElementById(targetId), "click");
                    }
                    break;
                case "CtrlP":
                    this.print();
                    break;
                case "ESC":
                    this.tooltipModule.removeTooltip(1);
                    break;
                case "Equal":
                case "Minus":
                    this.zoomModule.isZoomed = this.zoomModule.performedUI = true;
                    this.zoomModule.isPanning = this.isChartDrag = false;
                    if (actionKey == "Equal") {
                        this.zoomModule.toolkit.zoomInOutCalculation(1, this, this.axisCollections, this.zoomSettings.mode);
                    }
                    else {
                        this.zoomModule.toolkit.zoomInOutCalculation(-1, this, this.axisCollections, this.zoomSettings.mode);
                    }
                    this.zoomModule.performZoomRedraw(this);
                    this.element.focus();
                    break;
                case "ArrowUp":
                case "ArrowDown":
                case "ArrowLeft":
                case "ArrowRight":
                    var yArrowPadding = actionKey == "ArrowUp" ? 10 : (actionKey == "ArrowDown" ? -10 : 0);
                    var xArrowPadding = actionKey == "ArrowLeft" ? -10 : (actionKey == "ArrowRight" ? 10 : 0);
                    this.zoomModule.isPanning = this.isChartDrag = true;
                    this.zoomModule.doPan(this, this.axisCollections, xArrowPadding, yArrowPadding);
                    this.zoomModule.performZoomRedraw(this);
                    this.element.focus();
                    break;
                case "R":
                    this.zoomModule.toolkit.reset();
                    break;
            }
        };
        Chart.prototype.chartOnMouseClick = function (e) {
            var _this = this;
            var element = e.target;
            this.trigger(constants_1.chartMouseClick, { target: element.id, x: this.mouseX, y: this.mouseY });
            this.clickCount++;
            var timeInterval = 0;
            var isAngular = 'isAngular';
            if (this[isAngular]) {
                var observers = 'observers';
                timeInterval = this.pointDoubleClick[observers].length > 0 ? 400 : 0;
            }
            else {
                timeInterval = this.pointDoubleClick ? 400 : 0;
            }
            if (this.clickCount === 1 && this.pointClick) {
                this.singleClickTimer = +setTimeout(function () {
                    _this.clickCount = 0;
                    _this.triggerPointEvent(constants_1.pointClick, e);
                }, timeInterval);
            }
            else if (this.clickCount === 2 && this.pointDoubleClick) {
                clearTimeout(this.singleClickTimer);
                this.clickCount = 0;
                this.triggerPointEvent(constants_1.pointDoubleClick, e);
            }
            if (this.axisLabelClick) {
                this.triggerAxisLabelClickEvent(constants_1.axisLabelClick, e);
            }
            this.notify('click', e);
            return false;
        };
        Chart.prototype.triggerPointEvent = function (event, e) {
            var evt = e;
            var data = new get_data_1.ChartData(this);
            var pointData = data.getData();
            if (pointData.series && pointData.point) {
                this.trigger(event, {
                    series: this.isBlazor ? {} : pointData.series,
                    point: pointData.point,
                    seriesIndex: pointData.series.index, pointIndex: pointData.point.index,
                    x: this.mouseX, y: this.mouseY, pageX: evt.pageX, pageY: evt.pageY
                });
            }
        };
        Chart.prototype.triggerAxisLabelClickEvent = function (event, e) {
            var targetElement = e.target;
            var clickEvt = e;
            if (targetElement.id.indexOf('_AxisLabel_') !== -1) {
                var index = targetElement.id.split('_AxisLabel_');
                var axisIndex = +index[0].slice(-1);
                var labelIndex = +index[1];
                var currentAxis = this.axisCollections[axisIndex];
                if (currentAxis.visible && (axisIndex === 0 || axisIndex === 1)) {
                    this.trigger(event, {
                        chart: this,
                        axis: currentAxis,
                        text: currentAxis.visibleLabels[labelIndex].text,
                        labelID: targetElement.id,
                        index: labelIndex,
                        location: new helper_3.ChartLocation(clickEvt.pageX, clickEvt.pageY),
                        value: currentAxis.visibleLabels[labelIndex].value
                    });
                }
            }
        };
        Chart.prototype.chartOnMouseMove = function (e) {
            var element = e.target;
            this.trigger(constants_2.chartMouseMove, { target: element.id, x: this.mouseX, y: this.mouseY });
            if (this.pointMove) {
                this.triggerPointEvent(constants_2.pointMove, e);
            }
            if (!this.isTouch) {
                this.titleTooltip(e, this.mouseX, this.mouseY);
                this.axisTooltip(e, this.mouseX, this.mouseY);
            }
            if (this.dataEditingModule) {
                this.dataEditingModule.pointMouseMove(e);
            }
            this.notify(ej2_base_5.Browser.touchMoveEvent, e);
            this.isTouch = false;
            return false;
        };
        Chart.prototype.titleTooltip = function (event, x, y, isTouch) {
            var targetId = event.target.id;
            var id = (targetId === (this.element.id + '_ChartTitle') || targetId === (this.element.id + '_ChartSubTitle') ||
                targetId.indexOf('_AxisTitle') > -1 || targetId.indexOf('_legend_title') > -1);
            var index = 0;
            if (targetId.indexOf('_AxisTitle') > -1) {
                index = parseInt(((targetId.replace(this.element.id, '')).replace('AxisLabel_', '')).split('_')[2], 10);
            }
            if (id && (event.target.textContent.indexOf('...') > -1)) {
                var title = (targetId === (this.element.id + '_ChartTitle')) ? this.title :
                    targetId.indexOf('_AxisTitle') > -1 ? this.axisCollections[index].title :
                        targetId.indexOf('_ChartSubTitle') > -1 ? this.subTitle : this.legendSettings.title;
                helper_1.showTooltip(title, x, y, this.element.offsetWidth, this.element.id + '_EJ2_Title_Tooltip', helper_4.getElement(this.element.id + '_Secondary_Element'), isTouch);
            }
            else {
                helper_1.removeElement(this.element.id + '_EJ2_Title_Tooltip');
            }
        };
        Chart.prototype.axisTooltip = function (event, x, y, isTouch) {
            var targetId = event.target.id;
            if (((targetId.indexOf('AxisLabel') > -1) || targetId.indexOf('Axis_MultiLevelLabel') > -1) &&
                (event.target.textContent.indexOf('...') > -1)) {
                var isTitleOrLegendEnabled = (this.legendSettings.visible || this.primaryXAxis.title === '');
                helper_1.showTooltip(this.findAxisLabel(targetId), x, y, this.element.offsetWidth, this.element.id + '_EJ2_AxisLabel_Tooltip', helper_4.getElement(this.element.id + '_Secondary_Element'), isTouch, isTitleOrLegendEnabled);
            }
            else {
                helper_1.removeElement(this.element.id + '_EJ2_AxisLabel_Tooltip');
            }
        };
        Chart.prototype.findAxisLabel = function (text) {
            var texts;
            if (text.indexOf('AxisLabel') > -1) {
                texts = ((text.replace(this.element.id, '')).replace('AxisLabel_', '')).split('_');
                return this.axisCollections[parseInt(texts[0], 10)].visibleLabels[parseInt(texts[1], 10)].originalText;
            }
            else {
                texts = ((text.replace(this.element.id, '')).replace('Axis_MultiLevelLabel_Level_', '').replace('Text_', '')).split('_');
                return (this.axisCollections[parseInt(texts[0], 10)].multiLevelLabels[parseInt(texts[1], 10)]
                    .categories[parseInt(texts[2], 10)].text);
            }
        };
        Chart.prototype.chartOnMouseDown = function (e) {
            var pageX;
            var pageY;
            var target;
            var touchArg;
            var offset = ej2_base_5.Browser.isDevice ? 20 : 30;
            var rect = this.element.getBoundingClientRect();
            var element = e.target;
            this.trigger(constants_2.chartMouseDown, { target: element.id, x: this.mouseX, y: this.mouseY });
            if (e.type === 'touchstart') {
                this.isTouch = true;
                touchArg = e;
                pageX = touchArg.changedTouches[0].clientX;
                pageY = touchArg.changedTouches[0].clientY;
                target = touchArg.target;
            }
            else {
                this.isTouch = e.pointerType === 'touch';
                pageX = e.clientX;
                pageY = e.clientY;
                target = e.target;
            }
            var svgRect = helper_4.getElement(this.svgId).getBoundingClientRect();
            this.mouseDownX = this.previousMouseMoveX = (pageX - rect.left) - Math.max(svgRect.left - rect.left, 0);
            this.mouseDownY = this.previousMouseMoveY = (pageY - rect.top) - Math.max(svgRect.top - rect.top, 0);
            if (this.isTouch) {
                this.isDoubleTap = (new Date().getTime() < this.threshold && target.id.indexOf(this.element.id + '_Zooming_') === -1 &&
                    (this.mouseDownX - offset >= this.mouseX || this.mouseDownX + offset >= this.mouseX) &&
                    (this.mouseDownY - offset >= this.mouseY || this.mouseDownY + offset >= this.mouseY) &&
                    (this.mouseX - offset >= this.mouseDownX || this.mouseX + offset >= this.mouseDownX) &&
                    (this.mouseY - offset >= this.mouseDownY || this.mouseY + offset >= this.mouseDownY));
            }
            if (this.dataEditingModule) {
                this.dataEditingModule.pointMouseDown();
            }
            this.notify(ej2_base_5.Browser.touchStartEvent, e);
            return false;
        };
        Chart.prototype.mouseEnd = function (e) {
            var pageY;
            var pageX;
            var touchArg;
            if (e.type === 'touchend') {
                touchArg = e;
                pageX = touchArg.changedTouches[0].clientX;
                this.isTouch = true;
                pageY = touchArg.changedTouches[0].clientY;
            }
            else {
                pageY = e.clientY;
                pageX = e.clientX;
                this.isTouch = e.pointerType === 'touch' || e.pointerType === '2';
            }
            this.setMouseXY(pageX, pageY);
            this.chartOnMouseUp(e);
            return false;
        };
        Chart.prototype.chartOnMouseUp = function (e) {
            var element = e.target;
            this.trigger(constants_2.chartMouseUp, { target: element.id, x: this.mouseX, y: this.mouseY });
            this.isChartDrag = false;
            if (this.isTouch) {
                this.titleTooltip(e, this.mouseX, this.mouseY, this.isTouch);
                this.axisTooltip(e, this.mouseX, this.mouseY, this.isTouch);
                this.threshold = new Date().getTime() + 300;
            }
            if (this.dataEditingModule) {
                this.dataEditingModule.pointMouseUp();
            }
            if (!this.enableCanvas && this.seriesElements) {
                this.seriesElements.removeAttribute('clip-path');
            }
            this.notify(ej2_base_5.Browser.touchEndEvent, e);
            return false;
        };
        Chart.prototype.setCulture = function () {
            this.intl = new ej2_base_1.Internationalization();
            this.setLocaleConstants();
            this.localeObject = new ej2_base_2.L10n(this.getModuleName(), this.defaultLocalConstants, this.locale);
        };
        Chart.prototype.setAnnotationValue = function (annotationIndex, content) {
            var parentNode = helper_4.getElement(this.element.id + '_Annotation_Collections');
            var annotation = this.annotations[annotationIndex];
            var element;
            if (content !== null) {
                annotation.content = content;
                if (parentNode) {
                    helper_1.removeElement(this.element.id + '_Annotation_' + annotationIndex);
                    element = this.createElement('div');
                    this.annotationModule.processAnnotation(annotation, annotationIndex, element);
                    parentNode.appendChild(element.children[0]);
                }
                else {
                    this.annotationModule.renderAnnotations(helper_4.getElement(this.element.id + '_Secondary_Element'));
                }
            }
        };
        Chart.prototype.setLocaleConstants = function () {
            this.defaultLocalConstants = {
                ZoomIn: 'Zoom in',
                Zoom: 'Zoom',
                ZoomOut: 'Zoom out',
                Pan: 'Pan',
                Reset: 'Reset',
                ResetZoom: 'Reset Zoom'
            };
        };
        Chart.prototype.setTheme = function () {
            this.themeStyle = theme_1.getThemeColor(this.theme);
            var style = document.createElement('style');
            style.setAttribute('id', this.element.id + "Keyboard_chart_focus");
            style.innerHTML = '.e-chart-focused:focus, path[class*=_ej2_chart_selection_series]:focus,' +
                'path[id*=_Point_]:focus, text[id*=_ChartTitle]:focus {outline: none } .e-chart-focused:focus-visible, path[class*=_ej2_chart_selection_series]:focus-visible,' +
                'path[id*=_Point_]:focus-visible, text[id*=_ChartTitle]:focus-visible {outline: 1.5px ' + this.themeStyle.tabColor + ' solid}';
            document.body.appendChild(style);
        };
        Chart.prototype.requiredModules = function () {
            var _this = this;
            var modules = [];
            var series = this.series;
            var enableAnnotation = false;
            var moduleName;
            var errorBarVisible = false;
            var isPointDrag = false;
            var dataLabelEnable = false;
            var zooming = this.zoomSettings;
            this.chartAreaType = (series.length > 0 && (series[0].type === 'Polar' || series[0].type === 'Radar')) ? 'PolarRadar' : 'Cartesian';
            if (this.tooltip.enable) {
                modules.push({
                    member: 'Tooltip',
                    args: [this]
                });
            }
            series.map(function (value) {
                _this.isLegend = (_this.legendSettings.visible && ((value.name !== '') || !!_this.isLegend));
                moduleName = value.type.indexOf('100') !== -1 ? value.type.replace('100', '') + 'Series' : value.type + 'Series';
                errorBarVisible = value.errorBar.visible || errorBarVisible;
                dataLabelEnable = value.marker.dataLabel.visible || dataLabelEnable;
                isPointDrag = value.dragSettings.enable || isPointDrag;
                if (!modules.some(function (currentModule) {
                    return currentModule.member === moduleName;
                })) {
                    modules.push({
                        member: moduleName,
                        args: [_this, series]
                    });
                }
                if (_this.chartAreaType === 'PolarRadar') {
                    modules.push({
                        member: value.drawType + 'Series',
                        args: [_this, series]
                    });
                }
                if (value.type === 'Pareto') {
                    modules.push({
                        member: 'ColumnSeries',
                        args: [_this, series]
                    });
                    modules.push({
                        member: 'LineSeries',
                        args: [_this, series]
                    });
                }
            });
            this.findIndicatorModules(modules);
            this.findTrendLineModules(modules);
            modules = this.findAxisModule(modules);
            enableAnnotation = this.annotations.some(function (value) {
                return (value.content !== null);
            });
            if (errorBarVisible) {
                modules.push({
                    member: 'ErrorBar',
                    args: [this, series]
                });
            }
            if (this.isLegend) {
                modules.push({
                    member: 'Legend',
                    args: [this]
                });
            }
            if (this.enableExport || this.allowExport) {
                modules.push({
                    member: 'Export',
                    args: [this]
                });
            }
            if (this.chartAreaType !== 'PolarRadar' && !this.scrollSettingEnabled && (zooming.enableSelectionZooming
                || zooming.enableMouseWheelZooming || zooming.enablePinchZooming || zooming.enablePan || zooming.enableScrollbar)) {
                modules.push({
                    member: 'Zoom',
                    args: [this, this.zoomSettings]
                });
                if (zooming.enableScrollbar) {
                    modules.push({
                        member: 'ScrollBar',
                        args: [this]
                    });
                }
            }
            if (this.selectionMode !== 'None' && !(this.chartAreaType === 'PolarRadar' &&
                this.selectionMode.indexOf('Drag') > -1)) {
                modules.push({
                    member: 'Selection',
                    args: [this]
                });
            }
            if (this.highlightMode !== 'None') {
                modules.push({
                    member: 'Highlight',
                    args: [this]
                });
            }
            if (dataLabelEnable) {
                modules.push({
                    member: 'DataLabel',
                    args: [this, series]
                });
            }
            if (isPointDrag) {
                modules.push({
                    member: 'DataEditing',
                    args: [this]
                });
            }
            if (enableAnnotation) {
                modules.push({
                    member: 'Annotation',
                    args: [this]
                });
            }
            if (this.chartAreaType !== 'PolarRadar' && this.crosshair.enable) {
                modules.push({
                    member: 'Crosshair',
                    args: [this]
                });
            }
            return modules;
        };
        Chart.prototype.findAxisModule = function (modules) {
            var axisCollections = [];
            axisCollections.push(this.primaryXAxis);
            axisCollections.push(this.primaryYAxis);
            axisCollections = axisCollections.concat(this.axes);
            var datetimeEnabled = false;
            var categoryEnabled = false;
            var logarithmicEnabled = false;
            var striplineEnabled = false;
            var dateTimeCategoryEnabled = false;
            var multiLevelEnabled = false;
            for (var _i = 0, axisCollections_1 = axisCollections; _i < axisCollections_1.length; _i++) {
                var axis = axisCollections_1[_i];
                datetimeEnabled = axis.valueType === 'DateTime' || datetimeEnabled;
                categoryEnabled = axis.valueType === 'Category' || categoryEnabled;
                logarithmicEnabled = axis.valueType === 'Logarithmic' || logarithmicEnabled;
                dateTimeCategoryEnabled = axis.valueType === 'DateTimeCategory' || dateTimeCategoryEnabled;
                striplineEnabled = this.findStriplineVisibility(axis.stripLines) || striplineEnabled;
                multiLevelEnabled = axis.multiLevelLabels.length > 0 || multiLevelEnabled;
                this.scrollSettingEnabled = axis.scrollbarSettings.enable ? true : this.scrollSettingEnabled;
            }
            if (datetimeEnabled) {
                modules.push({
                    member: 'DateTime',
                    args: [this]
                });
            }
            if (categoryEnabled) {
                modules.push({
                    member: 'Category',
                    args: [this]
                });
            }
            if (logarithmicEnabled) {
                modules.push({
                    member: 'Logarithmic',
                    args: [this]
                });
            }
            if (striplineEnabled) {
                modules.push({
                    member: 'StripLine',
                    args: [this]
                });
            }
            if (multiLevelEnabled) {
                modules.push({
                    member: 'MultiLevelLabel',
                    args: [this]
                });
            }
            if (dateTimeCategoryEnabled) {
                modules.push({
                    member: 'DateTimeCategory',
                    args: [this]
                });
            }
            if (this.scrollSettingEnabled) {
                modules.push({
                    member: 'ScrollBar',
                    args: [this]
                });
            }
            return modules;
        };
        Chart.prototype.findIndicatorModules = function (modules) {
            var macdEnable;
            var bandEnable;
            var indicators = this.indicators;
            if (this.indicators.length) {
                modules.push({
                    member: 'LineSeries',
                    args: [this]
                });
                indicators.map(function (indicator) {
                    macdEnable = macdEnable || indicator.type === 'Macd';
                    bandEnable = bandEnable || indicator.type === 'BollingerBands';
                });
                if (macdEnable) {
                    modules.push({
                        member: 'ColumnSeries',
                        args: [this]
                    });
                }
                if (bandEnable) {
                    modules.push({
                        member: 'RangeAreaSeries',
                        args: [this]
                    });
                }
                if (bandEnable) {
                    modules.push({
                        member: 'SplineRangeAreaSeries',
                        args: [this]
                    });
                }
                for (var _i = 0, _a = this.indicators; _i < _a.length; _i++) {
                    var indicator = _a[_i];
                    modules.push({
                        member: indicator.type + 'Indicator',
                        args: [this]
                    });
                }
            }
        };
        Chart.prototype.findTrendLineModules = function (modules) {
            var isLine;
            var isSpline;
            var _loop_1 = function (series) {
                var markerEnable;
                series.trendlines.map(function (trendline) {
                    markerEnable = markerEnable || trendline.marker.visible;
                    isLine = isLine || (trendline.type === 'Linear' || trendline.type === 'MovingAverage') ? true : false;
                    isSpline = isSpline || !isLine ? true : false;
                });
                if (markerEnable) {
                    modules.push({
                        member: 'Marker',
                        args: [this_1, series]
                    });
                }
            };
            var this_1 = this;
            for (var _i = 0, _a = this.series; _i < _a.length; _i++) {
                var series = _a[_i];
                _loop_1(series);
            }
            if (isLine || isSpline) {
                modules.push({
                    member: 'TrendLine',
                    args: [this]
                });
            }
            if (isLine) {
                modules.push({
                    member: 'LineSeries',
                    args: [this]
                });
            }
            if (isSpline) {
                modules.push({
                    member: 'SplineSeries',
                    args: [this]
                });
            }
        };
        Chart.prototype.findStriplineVisibility = function (striplines) {
            var visible = false;
            for (var _i = 0, striplines_1 = striplines; _i < striplines_1.length; _i++) {
                var stripline = striplines_1[_i];
                if (stripline.visible) {
                    visible = true;
                    break;
                }
            }
            return visible;
        };
        Chart.prototype.removeSvg = function () {
            if (this.redraw) {
                return null;
            }
            helper_1.blazorTemplatesReset(this);
            if (this.enableCanvas && this.svgObject && this.svgObject.tagName === 'CANVAS') {
                this.renderer.clearRect(new ej2_svg_base_1.Rect(0, 0, this.availableSize.width, this.availableSize.height));
                if (this.svgObject.parentNode) {
                    ej2_base_4.remove(this.svgObject);
                }
                return null;
            }
            helper_1.removeElement(this.element.id + '_Secondary_Element');
            if (this.isReact) {
                this.clearTemplate();
            }
            var removeLength = 0;
            if (this.zoomModule && this.zoomModule.pinchTarget) {
                this.zoomModule.pinchTarget.id = '';
                this.zoomModule.pinchTarget.setAttribute('opacity', '0');
                this.svgObject.appendChild(this.zoomModule.pinchTarget);
                removeLength = 1;
            }
            if (!ej2_base_2.isNullOrUndefined(this.resizeTo)) {
                if (this.resizeTo !== this.checkResize && this.isBlazor && this.element.childElementCount) {
                    var containerCollection = document.querySelectorAll('.e-chart');
                    for (var index = 0; index < containerCollection.length; index++) {
                        var container = containerCollection[index];
                        while (container.firstChild) {
                            ej2_base_4.remove(container.firstChild);
                        }
                    }
                }
                this.checkResize = this.resizeTo;
            }
            if (this.svgObject) {
                while (this.svgObject.childNodes.length > removeLength) {
                    this.svgObject.removeChild(this.svgObject.firstChild);
                }
                if (!this.svgObject.hasChildNodes() && this.svgObject.parentNode && !(this.stockChart)) {
                    ej2_base_4.remove(this.svgObject);
                }
            }
        };
        Chart.prototype.refreshDefinition = function (definitions) {
            for (var _i = 0, definitions_1 = definitions; _i < definitions_1.length; _i++) {
                var item = definitions_1[_i];
                item.axes = [];
            }
        };
        Chart.prototype.refreshAxis = function () {
            var axis = this.primaryXAxis;
            axis.rect = new ej2_svg_base_1.Rect(undefined, undefined, 0, 0);
            axis = this.primaryYAxis;
            axis.isStack100 = false;
            axis.rect = new ej2_svg_base_1.Rect(undefined, undefined, 0, 0);
            for (var _i = 0, _a = this.axes; _i < _a.length; _i++) {
                var item = _a[_i];
                axis = item;
                axis.rect = new ej2_svg_base_1.Rect(undefined, undefined, 0, 0);
                axis.isStack100 = false;
            }
            if (this.paretoSeriesModule && this.series[0].type === 'Pareto') {
                for (var _b = 0, _c = this.paretoSeriesModule.paretoAxes; _b < _c.length; _b++) {
                    var item = _c[_b];
                    axis = item;
                    axis.rect = new ej2_svg_base_1.Rect(undefined, undefined, 0, 0);
                    axis.isStack100 = false;
                }
            }
        };
        Chart.prototype.axisChange = function (axis) {
            if (!axis.name && !axis.valueType) {
                return false;
            }
            this.refreshDefinition(this.columns);
            this.refreshDefinition(this.rows);
            this.calculateVisibleAxis();
            this.processData();
            return true;
        };
        Chart.prototype.getVisibleSeries = function (visibleSeries, index) {
            for (var _i = 0, visibleSeries_1 = visibleSeries; _i < visibleSeries_1.length; _i++) {
                var series = visibleSeries_1[_i];
                if (index === series.index) {
                    return series;
                }
            }
            return null;
        };
        Chart.prototype.refreshLiveData = function () {
            this.calculateVisibleSeries();
            this.initTechnicalIndicators();
            this.initTrendLines();
            this.refreshDefinition(this.columns);
            this.refreshDefinition(this.rows);
            this.calculateVisibleAxis();
            this.processData(false);
            if (!this.isBlazor) {
                this.enableCanvas ? this.createChartSvg() : this.removeSvg();
                this.refreshAxis();
                this.refreshBound();
                this.trigger('loaded', { chart: this.isBlazor ? {} : this });
            }
        };
        Chart.prototype.removeStyles = function () {
            helper_1.removeElement(this.element.id + '_ej2_chart_selection');
            helper_1.removeElement(this.element.id + '_ej2_chart_highlight');
        };
        Chart.prototype.onPropertyChanged = function (newProp, oldProp) {
            var renderer = false;
            var refreshBounds = false;
            this.animateSeries = false;
            var axis;
            if (!this.delayRedraw) {
                for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
                    var prop = _a[_i];
                    switch (prop) {
                        case 'primaryXAxis':
                            axis = newProp.primaryXAxis;
                            refreshBounds = this.axisChange(axis);
                            if (newProp.primaryXAxis.edgeLabelPlacement) {
                                renderer = true;
                            }
                            if (!newProp.primaryXAxis.crosshairTooltip) {
                                refreshBounds = true;
                            }
                            if (!ej2_base_2.isNullOrUndefined(axis.isInversed) || !ej2_base_2.isNullOrUndefined(axis.opposedPosition)) {
                                this.primaryXAxis.setIsInversedAndOpposedPosition();
                            }
                            break;
                        case 'primaryYAxis':
                            axis = newProp.primaryYAxis;
                            refreshBounds = this.axisChange(axis);
                            if (newProp.primaryYAxis.edgeLabelPlacement) {
                                renderer = true;
                            }
                            if (!newProp.primaryYAxis.crosshairTooltip) {
                                refreshBounds = true;
                            }
                            if (!ej2_base_2.isNullOrUndefined(axis.isInversed) || !ej2_base_2.isNullOrUndefined(axis.opposedPosition)) {
                                this.primaryYAxis.setIsInversedAndOpposedPosition();
                            }
                            break;
                        case 'axes':
                            for (var _b = 0, _c = Object.keys(newProp.axes); _b < _c.length; _b++) {
                                var index = _c[_b];
                                axis = newProp.axes[index];
                                refreshBounds = refreshBounds || this.axisChange(axis);
                                if (!axis.crosshairTooltip) {
                                    refreshBounds = true;
                                }
                                if (!ej2_base_2.isNullOrUndefined(axis.isInversed) || !ej2_base_2.isNullOrUndefined(axis.opposedPosition)) {
                                    this.axes[index].setIsInversedAndOpposedPosition();
                                }
                            }
                            break;
                        case 'height':
                        case 'width':
                            this.createChartSvg();
                            refreshBounds = true;
                            break;
                        case 'subTitle':
                        case 'title':
                            refreshBounds = true;
                            break;
                        case 'titleStyle':
                            if (newProp.titleStyle && (newProp.titleStyle.size || newProp.titleStyle.textOverflow)) {
                                refreshBounds = true;
                            }
                            else {
                                renderer = true;
                            }
                            break;
                        case 'subTitleStyle':
                            if (newProp.subTitleStyle && (newProp.subTitleStyle.size || newProp.subTitleStyle.textOverflow)) {
                                refreshBounds = true;
                            }
                            else {
                                renderer = true;
                            }
                            break;
                        case 'border':
                            renderer = true;
                            break;
                        case 'dataSource':
                            this.processData(false);
                            refreshBounds = true;
                            break;
                        case 'enableCanvas':
                            this.refresh();
                            break;
                        case 'series':
                            var len = this.series.length;
                            var seriesRefresh = false;
                            var series = void 0;
                            var blazorProp = void 0;
                            for (var i = 0; i < len; i++) {
                                series = newProp.series[i];
                                if (this.isBlazor && series && ((series.visible !== oldProp.series[i].visible) || series.isClosed ||
                                    series.marker || series.emptyPointSettings || series.type || series.boxPlotMode || series.showMean)) {
                                    blazorProp = true;
                                }
                                if (series && (series.dataSource || series.query || series.errorBar || series.xName ||
                                    series.yName || series.size || series.high || series.low || series.open || series.close ||
                                    series.fill || series.name || series.marker || blazorProp)) {
                                    ej2_base_4.extend(this.getVisibleSeries(this.visibleSeries, i), series, null, true);
                                    seriesRefresh = true;
                                }
                            }
                            if (seriesRefresh) {
                                this.calculateVisibleSeries();
                                this.initTechnicalIndicators();
                                this.initTrendLines();
                                this.refreshDefinition(this.columns);
                                this.refreshDefinition(this.rows);
                                this.calculateVisibleAxis();
                                this.processData(false);
                                refreshBounds = true;
                            }
                            break;
                        case 'indicators':
                            refreshBounds = true;
                            break;
                        case 'zoomSettings':
                            if (newProp.zoomSettings.enableScrollbar || oldProp.zoomSettings.enableScrollbar) {
                                refreshBounds = true;
                            }
                            renderer = true;
                            break;
                        case 'background':
                            renderer = true;
                            break;
                        case 'chartArea':
                            if (newProp.chartArea.border && newProp.chartArea.border.width) {
                                refreshBounds = true;
                            }
                            renderer = true;
                            break;
                        case 'legendSettings':
                            if (!newProp.legendSettings.background || !newProp.legendSettings.opacity) {
                                refreshBounds = true;
                            }
                            renderer = true;
                            break;
                        case 'palettes':
                            this.calculateVisibleSeries();
                            renderer = true;
                            break;
                        case 'selectedDataIndexes':
                            if (this.selectionModule) {
                                this.selectionModule.currentMode = this.selectionMode;
                                this.selectionModule.selectedDataIndexes = this.selectedDataIndexes;
                                this.selectionModule.styleId = this.element.id + '_ej2_chart_selection';
                                this.selectionModule.redrawSelection(this, oldProp.selectionMode, true);
                            }
                            break;
                        case 'selectionMode':
                            if (this.selectionModule && newProp.selectionMode && newProp.selectionMode.indexOf('Drag') === -1) {
                                this.selectionModule.currentMode = this.selectionMode;
                                this.selectionModule.styleId = this.element.id + '_ej2_chart_selection';
                                this.selectionModule.redrawSelection(this, oldProp.selectionMode, true);
                            }
                            break;
                        case 'isMultiSelect':
                            if (this.selectionModule && !newProp.isMultiSelect && this.selectionModule.selectedDataIndexes.length > 1) {
                                this.selectionModule.currentMode = this.selectionMode;
                                this.selectionModule.styleId = this.element.id + '_ej2_chart_selection';
                                this.selectionModule.redrawSelection(this, oldProp.selectionMode);
                            }
                            break;
                        case 'highlightMode':
                        case 'selectionPattern':
                        case 'highlightPattern':
                            this.removeStyles();
                            renderer = true;
                            break;
                        case 'theme':
                            this.animateSeries = true;
                            break;
                        case 'locale':
                        case 'currencyCode':
                            if (this.isBlazor) {
                                this.setCulture();
                                renderer = true;
                            }
                            else {
                                this.refresh();
                            }
                            break;
                        case 'tooltip':
                            if (this.tooltipModule) {
                                this.tooltipModule.previousPoints = [];
                                if (this.tooltip.template) {
                                    this.tooltipModule.template = this.tooltip.template;
                                }
                            }
                            break;
                    }
                }
                if (!refreshBounds && renderer) {
                    this.rotatedDataLabelCollections = [];
                    this.removeSvg();
                    this.renderElements();
                    this.trigger('loaded', { chart: this.isBlazor ? {} : this });
                }
                if (refreshBounds) {
                    this.enableCanvas ? this.createChartSvg() : this.removeSvg();
                    if (this.isReact) {
                        this.clearTemplate();
                    }
                    this.refreshAxis();
                    this.refreshBound();
                    this.trigger('loaded', { chart: this.isBlazor ? {} : this });
                    this.redraw = false;
                    this.animated = false;
                }
            }
        };
        return Chart;
    }(ej2_base_1.Component));
    __decorate([
        ej2_base_1.Property(null)
    ], Chart.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Chart.prototype, "height", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], Chart.prototype, "title", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], Chart.prototype, "dataSource", void 0);
    __decorate([
        ej2_base_6.Complex(theme_1.Theme.chartTitleFont, base_1.Font)
    ], Chart.prototype, "titleStyle", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], Chart.prototype, "subTitle", void 0);
    __decorate([
        ej2_base_6.Complex(theme_1.Theme.chartSubTitleFont, base_1.Font)
    ], Chart.prototype, "subTitleStyle", void 0);
    __decorate([
        ej2_base_6.Complex({}, base_1.Margin)
    ], Chart.prototype, "margin", void 0);
    __decorate([
        ej2_base_6.Complex({ color: '#DDDDDD', width: 0 }, base_1.Border)
    ], Chart.prototype, "border", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Chart.prototype, "background", void 0);
    __decorate([
        ej2_base_6.Complex({ border: { color: null, width: 0.5 }, background: 'transparent' }, base_1.ChartArea)
    ], Chart.prototype, "chartArea", void 0);
    __decorate([
        ej2_base_6.Complex({ name: 'primaryXAxis' }, axis_1.Axis)
    ], Chart.prototype, "primaryXAxis", void 0);
    __decorate([
        ej2_base_6.Complex({ name: 'primaryYAxis' }, axis_1.Axis)
    ], Chart.prototype, "primaryYAxis", void 0);
    __decorate([
        ej2_base_6.Collection([{}], axis_1.Row)
    ], Chart.prototype, "rows", void 0);
    __decorate([
        ej2_base_6.Collection([{}], axis_1.Column)
    ], Chart.prototype, "columns", void 0);
    __decorate([
        ej2_base_6.Collection([{}], axis_1.Axis)
    ], Chart.prototype, "axes", void 0);
    __decorate([
        ej2_base_6.Collection([{}], chart_series_1.Series)
    ], Chart.prototype, "series", void 0);
    __decorate([
        ej2_base_6.Collection([{}], chart_base_1.ChartAnnotationSettings)
    ], Chart.prototype, "annotations", void 0);
    __decorate([
        ej2_base_1.Property([])
    ], Chart.prototype, "palettes", void 0);
    __decorate([
        ej2_base_1.Property('Material')
    ], Chart.prototype, "theme", void 0);
    __decorate([
        ej2_base_6.Complex({}, base_1.TooltipSettings)
    ], Chart.prototype, "tooltip", void 0);
    __decorate([
        ej2_base_6.Complex({}, CrosshairSettings)
    ], Chart.prototype, "crosshair", void 0);
    __decorate([
        ej2_base_6.Complex({}, legend_1.LegendSettings)
    ], Chart.prototype, "legendSettings", void 0);
    __decorate([
        ej2_base_6.Collection([{}], RangeColorSetting)
    ], Chart.prototype, "rangeColorSettings", void 0);
    __decorate([
        ej2_base_6.Complex({}, ZoomSettings)
    ], Chart.prototype, "zoomSettings", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], Chart.prototype, "highlightColor", void 0);
    __decorate([
        ej2_base_1.Property('None')
    ], Chart.prototype, "selectionMode", void 0);
    __decorate([
        ej2_base_1.Property('None')
    ], Chart.prototype, "highlightMode", void 0);
    __decorate([
        ej2_base_1.Property('None')
    ], Chart.prototype, "selectionPattern", void 0);
    __decorate([
        ej2_base_1.Property('None')
    ], Chart.prototype, "highlightPattern", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], Chart.prototype, "isMultiSelect", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], Chart.prototype, "allowMultiSelection", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], Chart.prototype, "enableExport", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], Chart.prototype, "allowExport", void 0);
    __decorate([
        ej2_base_6.Collection([], base_1.Indexes)
    ], Chart.prototype, "selectedDataIndexes", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], Chart.prototype, "useGroupingSeparator", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], Chart.prototype, "enableAutoIntervalOnBothAxis", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], Chart.prototype, "isTransposed", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], Chart.prototype, "enableCanvas", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Chart.prototype, "backgroundImage", void 0);
    __decorate([
        ej2_base_6.Collection([], technical_indicator_1.TechnicalIndicator)
    ], Chart.prototype, "indicators", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], Chart.prototype, "enableAnimation", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Chart.prototype, "description", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], Chart.prototype, "tabIndex", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], Chart.prototype, "enableSideBySidePlacement", void 0);
    __decorate([
        ej2_base_6.Event()
    ], Chart.prototype, "resized", void 0);
    __decorate([
        ej2_base_6.Event()
    ], Chart.prototype, "beforeResize", void 0);
    __decorate([
        ej2_base_6.Event()
    ], Chart.prototype, "annotationRender", void 0);
    __decorate([
        ej2_base_6.Event()
    ], Chart.prototype, "beforePrint", void 0);
    __decorate([
        ej2_base_6.Event()
    ], Chart.prototype, "loaded", void 0);
    __decorate([
        ej2_base_6.Event()
    ], Chart.prototype, "beforeExport", void 0);
    __decorate([
        ej2_base_6.Event()
    ], Chart.prototype, "afterExport", void 0);
    __decorate([
        ej2_base_6.Event()
    ], Chart.prototype, "load", void 0);
    __decorate([
        ej2_base_6.Event()
    ], Chart.prototype, "animationComplete", void 0);
    __decorate([
        ej2_base_6.Event()
    ], Chart.prototype, "legendRender", void 0);
    __decorate([
        ej2_base_6.Event()
    ], Chart.prototype, "textRender", void 0);
    __decorate([
        ej2_base_6.Event()
    ], Chart.prototype, "pointRender", void 0);
    __decorate([
        ej2_base_6.Event()
    ], Chart.prototype, "seriesRender", void 0);
    __decorate([
        ej2_base_6.Event()
    ], Chart.prototype, "axisLabelRender", void 0);
    __decorate([
        ej2_base_6.Event()
    ], Chart.prototype, "axisLabelClick", void 0);
    __decorate([
        ej2_base_6.Event()
    ], Chart.prototype, "axisRangeCalculated", void 0);
    __decorate([
        ej2_base_6.Event()
    ], Chart.prototype, "axisMultiLabelRender", void 0);
    __decorate([
        ej2_base_6.Event()
    ], Chart.prototype, "legendClick", void 0);
    __decorate([
        ej2_base_6.Event()
    ], Chart.prototype, "multiLevelLabelClick", void 0);
    __decorate([
        ej2_base_6.Event()
    ], Chart.prototype, "tooltipRender", void 0);
    __decorate([
        ej2_base_6.Event()
    ], Chart.prototype, "sharedTooltipRender", void 0);
    __decorate([
        ej2_base_6.Event()
    ], Chart.prototype, "chartMouseMove", void 0);
    __decorate([
        ej2_base_6.Event()
    ], Chart.prototype, "chartMouseClick", void 0);
    __decorate([
        ej2_base_6.Event()
    ], Chart.prototype, "chartDoubleClick", void 0);
    __decorate([
        ej2_base_6.Event()
    ], Chart.prototype, "pointClick", void 0);
    __decorate([
        ej2_base_6.Event()
    ], Chart.prototype, "pointDoubleClick", void 0);
    __decorate([
        ej2_base_6.Event()
    ], Chart.prototype, "pointMove", void 0);
    __decorate([
        ej2_base_6.Event()
    ], Chart.prototype, "chartMouseLeave", void 0);
    __decorate([
        ej2_base_6.Event()
    ], Chart.prototype, "chartMouseDown", void 0);
    __decorate([
        ej2_base_6.Event()
    ], Chart.prototype, "chartMouseUp", void 0);
    __decorate([
        ej2_base_6.Event()
    ], Chart.prototype, "dragComplete", void 0);
    __decorate([
        ej2_base_6.Event()
    ], Chart.prototype, "selectionComplete", void 0);
    __decorate([
        ej2_base_6.Event()
    ], Chart.prototype, "zoomComplete", void 0);
    __decorate([
        ej2_base_6.Event()
    ], Chart.prototype, "onZooming", void 0);
    __decorate([
        ej2_base_6.Event()
    ], Chart.prototype, "scrollStart", void 0);
    __decorate([
        ej2_base_6.Event()
    ], Chart.prototype, "scrollEnd", void 0);
    __decorate([
        ej2_base_6.Event()
    ], Chart.prototype, "scrollChanged", void 0);
    __decorate([
        ej2_base_6.Event()
    ], Chart.prototype, "dragStart", void 0);
    __decorate([
        ej2_base_6.Event()
    ], Chart.prototype, "drag", void 0);
    __decorate([
        ej2_base_6.Event()
    ], Chart.prototype, "dragEnd", void 0);
    __decorate([
        ej2_base_1.Property('USD')
    ], Chart.prototype, "currencyCode", void 0);
    Chart = __decorate([
        ej2_base_1.NotifyPropertyChanges
    ], Chart);
    exports.Chart = Chart;
});
