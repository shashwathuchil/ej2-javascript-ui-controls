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
define(["require", "exports", "@syncfusion/ej2-base", "../../common/utils/helper", "../../common/utils/helper", "../../chart/utils/get-data", "@syncfusion/ej2-svg-base"], function (require, exports, ej2_base_1, helper_1, helper_2, get_data_1, ej2_svg_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseTooltip = (function (_super) {
        __extends(BaseTooltip, _super);
        function BaseTooltip(chart) {
            var _this = _super.call(this, chart) || this;
            _this.element = _this.chart.element;
            _this.textStyle = chart.tooltip.textStyle;
            _this.control = chart;
            _this.template = chart.tooltip.template;
            return _this;
        }
        BaseTooltip.prototype.getElement = function (id) {
            return document.getElementById(id);
        };
        BaseTooltip.prototype.getTooltipElement = function (isTooltip) {
            this.inverted = this.chart.requireInvertedAxis;
            this.header = (this.control.tooltip.header === null) ?
                ((this.control.tooltip.shared) ? '<b>${point.x}</b>' : '<b>${series.name}</b>')
                : (this.control.tooltip.header);
            this.formattedText = [];
            var tooltipDiv = document.getElementById(this.chart.element.id + '_tooltip');
            var isStockChart = this.chart.element.id.indexOf('stockChart') > -1;
            if (!isTooltip && !tooltipDiv || isStockChart) {
                return this.createElement();
            }
            return null;
        };
        BaseTooltip.prototype.createElement = function () {
            var tooltipDiv = document.createElement('div');
            tooltipDiv.id = this.element.id + '_tooltip';
            tooltipDiv.className = 'ejSVGTooltip';
            tooltipDiv.style.pointerEvents = 'none';
            tooltipDiv.style.position = 'absolute';
            tooltipDiv.style.zIndex = '1';
            return tooltipDiv;
        };
        BaseTooltip.prototype.pushData = function (data, isFirst, tooltipDiv, isChart) {
            if (data.series.enableTooltip) {
                if (isChart) {
                    this.currentPoints.push(data);
                }
                else {
                    this.currentPoints.push(data);
                }
                this.stopAnimation();
                if (tooltipDiv && !document.getElementById(tooltipDiv.id)) {
                    if (!this.chart.stockChart) {
                        document.getElementById(this.element.id + '_Secondary_Element').appendChild(tooltipDiv);
                    }
                    else {
                        document.getElementById(this.chart.stockChart.element.id + '_Secondary_Element').appendChild(tooltipDiv);
                    }
                }
                return true;
            }
            return false;
        };
        BaseTooltip.prototype.removeHighlight = function () {
            var item;
            var series;
            for (var i = 0, len = this.previousPoints.length; i < len; i++) {
                item = this.previousPoints[i];
                if (item.series.isRectSeries) {
                    if (item.series.visible) {
                        this.highlightPoint(item.series, item.point.index, false);
                    }
                    continue;
                }
                series = item.series;
            }
        };
        BaseTooltip.prototype.highlightPoint = function (series, pointIndex, highlight) {
            var element = this.getElement(this.element.id + '_Series_' + series.index + '_Point_' + pointIndex);
            var selectionModule = this.control.accumulationSelectionModule;
            var isSelectedElement = selectionModule && selectionModule.selectedDataIndexes.length > 0 ? true : false;
            if (element) {
                if ((!isSelectedElement || isSelectedElement && element.getAttribute('class')
                    && element.getAttribute('class').indexOf('_ej2_chart_selection_series_') === -1)) {
                    if (this.chart.highlightColor !== '' && !ej2_base_1.isNullOrUndefined(this.chart.highlightColor)) {
                        element.setAttribute('fill', (highlight ? this.chart.highlightColor : series.pointColorMapping !== '' ? (series.points[0]).color : series.interior));
                    }
                    else {
                        element.setAttribute('opacity', (highlight ? series.opacity / 2 : series.opacity).toString());
                    }
                }
                else {
                    element.setAttribute('opacity', series.opacity.toString());
                }
            }
        };
        BaseTooltip.prototype.highlightPoints = function () {
            for (var _i = 0, _a = this.currentPoints; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.series.isRectSeries && item.series.category === 'Series') {
                    this.highlightPoint(item.series, item.point.index, true);
                }
            }
        };
        BaseTooltip.prototype.createTooltip = function (chart, isFirst, location, clipLocation, point, shapes, offset, bounds, crosshairEnabled, extraPoints, templatePoint, customTemplate) {
            if (crosshairEnabled === void 0) { crosshairEnabled = false; }
            if (extraPoints === void 0) { extraPoints = null; }
            if (templatePoint === void 0) { templatePoint = null; }
            var series = this.currentPoints[0].series;
            var module = chart.tooltipModule || chart.accumulationTooltipModule;
            if (!module || location === null) {
                return;
            }
            if (isFirst) {
                this.svgTooltip = new ej2_svg_base_1.Tooltip({
                    opacity: chart.tooltip.opacity,
                    header: this.headerText,
                    content: this.text,
                    fill: chart.tooltip.fill,
                    border: chart.tooltip.border,
                    enableAnimation: chart.tooltip.enableAnimation,
                    location: location,
                    shared: chart.tooltip.shared,
                    crosshair: crosshairEnabled,
                    shapes: shapes,
                    clipBounds: this.chart.chartAreaType === 'PolarRadar' ? new helper_1.ChartLocation(0, 0) : clipLocation,
                    areaBounds: bounds,
                    palette: this.findPalette(),
                    template: customTemplate || this.template,
                    data: templatePoint,
                    theme: chart.theme,
                    offset: offset,
                    textStyle: chart.tooltip.textStyle,
                    isNegative: (series.isRectSeries && series.type !== 'Waterfall' && point && point.y < 0),
                    inverted: this.chart.requireInvertedAxis && series.isRectSeries,
                    arrowPadding: this.text.length > 1 || this.chart.stockChart ? 0 : 7,
                    availableSize: chart.availableSize,
                    duration: this.chart.tooltip.duration,
                    isCanvas: this.chart.enableCanvas,
                    isTextWrap: chart.tooltip.enableTextWrap && chart.getModuleName() === 'chart',
                    blazorTemplate: { name: 'Template', parent: this.chart.tooltip },
                    controlInstance: this.chart,
                    enableRTL: chart.enableRtl,
                    controlName: 'Chart',
                    tooltipRender: function () {
                        module.removeHighlight();
                        module.highlightPoints();
                        module.updatePreviousPoint(extraPoints);
                    },
                    animationComplete: function (args) {
                        if (args.tooltip.fadeOuted) {
                            module.fadeOut(module.previousPoints);
                        }
                    }
                }, '#' + this.element.id + '_tooltip');
            }
            else {
                if (this.svgTooltip) {
                    this.svgTooltip.location = location;
                    this.svgTooltip.content = this.text;
                    this.svgTooltip.header = this.headerText;
                    this.svgTooltip.offset = offset;
                    this.svgTooltip.palette = this.findPalette();
                    this.svgTooltip.shapes = shapes;
                    this.svgTooltip.data = templatePoint;
                    this.svgTooltip.template = this.template;
                    this.svgTooltip.controlName = 'Chart';
                    this.svgTooltip.crosshair = crosshairEnabled;
                    this.svgTooltip.textStyle = chart.tooltip.textStyle;
                    this.svgTooltip.isNegative = (series.isRectSeries && series.type !== 'Waterfall' && point && point.y < 0);
                    this.svgTooltip.clipBounds = this.chart.chartAreaType === 'PolarRadar' ? new helper_1.ChartLocation(0, 0) : clipLocation;
                    this.svgTooltip.arrowPadding = this.text.length > 1 || this.chart.stockChart ? 0 : 7;
                    this.svgTooltip.dataBind();
                }
            }
            if (this.chart.isReact) {
                this.chart.renderReactTemplates();
            }
        };
        BaseTooltip.prototype.findPalette = function () {
            var colors = [];
            for (var _i = 0, _a = this.currentPoints; _i < _a.length; _i++) {
                var data = _a[_i];
                colors.push(this.findColor(data, data.series));
            }
            return colors;
        };
        BaseTooltip.prototype.findColor = function (data, series) {
            if (series.isRectSeries && (series.type === 'Candle' || series.type === 'Hilo' || series.type === 'HiloOpenClose')) {
                return data.point.color;
            }
            else {
                return (data.point.color && data.point.color !== '#ffffff' ? data.point.color
                    : data.point.interior) ||
                    series.marker.fill || series.interior;
            }
        };
        BaseTooltip.prototype.updatePreviousPoint = function (extraPoints) {
            if (extraPoints) {
                this.currentPoints = this.currentPoints.concat(extraPoints);
            }
            this.previousPoints = ej2_base_1.extend([], this.currentPoints, null, true);
        };
        BaseTooltip.prototype.fadeOut = function (data) {
            var svgElement = this.chart.enableCanvas ? this.getElement(this.element.id + '_tooltip_group') :
                this.getElement(this.element.id + '_tooltip_svg');
            var isTooltip = (svgElement && parseInt(svgElement.getAttribute('opacity'), 10) > 0);
            if (!isTooltip) {
                this.valueX = null;
                this.valueY = null;
                this.currentPoints = [];
                this.removeHighlight();
                this.removeHighlightedMarker(data, true);
                this.svgTooltip = null;
                this.control.trigger('animationComplete', {});
            }
        };
        BaseTooltip.prototype.removeHighlightedMarker = function (data, fadeOut) {
            if (this.chart.markerRender) {
                for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                    var item = data_1[_i];
                    helper_2.removeElement(this.element.id + '_Series_' + item.series.index +
                        '_Point_' + item.point.index + '_Trackball');
                    this.chart.markerRender.removeHighlightedMarker(item.series, item.point, fadeOut);
                }
            }
            this.previousPoints = [];
        };
        BaseTooltip.prototype.removeText = function () {
            this.textElements = [];
            var element = this.getElement(this.element.id + '_tooltip_group');
            if (element && element.childNodes.length > 0) {
                while (element.lastChild && element.childNodes.length !== 1) {
                    element.removeChild(element.lastChild);
                }
            }
        };
        BaseTooltip.prototype.stopAnimation = function () {
            helper_2.stopTimer(this.toolTipInterval);
        };
        BaseTooltip.prototype.removeTooltip = function (duration) {
            var _this = this;
            var tooltipElement = this.getElement(this.element.id + '_tooltip');
            var tooltipTemplate = tooltipElement ? this.getElement(tooltipElement.id + 'parent_template') : null;
            var isTemplateRendered = tooltipTemplate && tooltipTemplate.innerHTML !== '<div></div>';
            this.stopAnimation();
            if (this.chart.isReact && isTemplateRendered) {
                this.chart.clearTemplate([tooltipTemplate.id], [0]);
            }
            if (tooltipElement && this.previousPoints.length > 0) {
                this.toolTipInterval = +setTimeout(function () {
                    if (_this.svgTooltip) {
                        _this.svgTooltip.fadeOut();
                    }
                }, duration);
            }
        };
        return BaseTooltip;
    }(get_data_1.ChartData));
    exports.BaseTooltip = BaseTooltip;
});
