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
define(["require", "exports", "../series/line-base", "../series/chart-series", "../../common/utils/helper", "../../common/utils/helper", "@syncfusion/ej2-svg-base"], function (require, exports, line_base_1, chart_series_1, helper_1, helper_2, ej2_svg_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TechnicalAnalysis = (function (_super) {
        __extends(TechnicalAnalysis, _super);
        function TechnicalAnalysis() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TechnicalAnalysis.prototype.initSeriesCollection = function (indicator, chart) {
            indicator.targetSeries = [];
            var signalLine = new chart_series_1.Series(indicator, 'targetSeries', {}, true);
            this.setSeriesProperties(signalLine, indicator, indicator.type, indicator.fill, indicator.width, chart);
        };
        TechnicalAnalysis.prototype.setSeriesProperties = function (series, indicator, name, fill, width, chart) {
            series.name = name.length <= 4 ? name.toLocaleUpperCase() : name;
            series.xName = 'x';
            series.yName = 'y';
            series.fill = fill || '#606eff';
            series.dashArray = indicator.dashArray;
            series.width = width;
            series.xAxisName = indicator.xAxisName;
            series.animation = indicator.animation;
            series.yAxisName = indicator.yAxisName;
            series.clipRectElement = indicator.clipRectElement;
            series.points = [];
            series.enableTooltip = true;
            series.interior = series.fill;
            series.category = 'Indicator';
            series.index = indicator.index;
            series.chart = chart;
            series.xMin = Infinity;
            series.xMax = -Infinity;
            series.yMin = Infinity;
            series.yMax = -Infinity;
            series.xData = [];
            series.yData = [];
            series.marker.visible = false;
            indicator.targetSeries.push(series);
        };
        TechnicalAnalysis.prototype.createIndicatorElements = function (chart, indicator, index) {
            if (indicator.seriesName || indicator.dataSource) {
                helper_2.findClipRect(indicator.targetSeries[0]);
            }
            var clipRect = new ej2_svg_base_1.Rect(0, 0, 0, 0);
            if (indicator.seriesName || indicator.dataSource) {
                clipRect = indicator.targetSeries[0].clipRect;
            }
            var options = new helper_1.RectOption(chart.element.id + '_ChartIndicatorClipRect_' + index, 'transparent', { width: 1, color: 'Gray' }, 1, {
                x: 0, y: 0, width: clipRect.width,
                height: clipRect.height
            });
            var clipRectElement = helper_1.appendClipElement(chart.redraw, options, chart.renderer);
            indicator.indicatorElement = chart.renderer.createGroup({
                'id': chart.element.id + 'IndicatorGroup' + index,
                'transform': 'translate(' + clipRect.x + ',' + clipRect.y + ')',
                'clip-path': 'url(#' + chart.element.id + '_ChartIndicatorClipRect_' + index + ')'
            });
            indicator.indicatorElement.appendChild(clipRectElement);
            for (var _i = 0, _a = indicator.targetSeries; _i < _a.length; _i++) {
                var series = _a[_i];
                series.clipRectElement = clipRectElement;
                var element = series.chart.renderer.createGroup({
                    'id': series.chart.element.id + '_Indicator_' +
                        indicator.index + '_' + series.name + '_Group'
                });
                indicator.indicatorElement.appendChild(element);
                series.seriesElement = element;
            }
            chart.indicatorElements.appendChild(indicator.indicatorElement);
        };
        TechnicalAnalysis.prototype.getDataPoint = function (x, y, sourcePoint, series, index, indicator) {
            if (indicator === void 0) { indicator = null; }
            var point = new chart_series_1.Points();
            point.x = x;
            point.y = y;
            point.xValue = sourcePoint.xValue;
            point.color = series.fill;
            point.index = index;
            point.yValue = y;
            point.visible = true;
            series.xMin = Math.min(series.xMin, point.xValue);
            series.yMin = Math.min(series.yMin, point.yValue);
            series.xMax = Math.max(series.xMax, point.xValue);
            series.yMax = Math.max(series.yMax, point.yValue);
            series.xData.push(point.xValue);
            if (indicator && indicator.type === 'Macd' && series.type === 'Column') {
                if (point.y >= 0) {
                    point.color = indicator.macdPositiveColor;
                }
                else {
                    point.color = indicator.macdNegativeColor;
                }
            }
            return point;
        };
        TechnicalAnalysis.prototype.getRangePoint = function (x, high, low, sourcePoint, series, index) {
            var point = new chart_series_1.Points();
            point.x = x;
            point.high = high;
            point.low = low;
            point.xValue = sourcePoint.xValue;
            point.color = series.fill;
            point.index = index;
            point.visible = true;
            series.xData.push(point.xValue);
            return point;
        };
        TechnicalAnalysis.prototype.setSeriesRange = function (points, indicator, series) {
            if (series === void 0) { series = null; }
            if (!series) {
                indicator.targetSeries[0].points = points;
            }
            else {
                series.points = points;
            }
        };
        return TechnicalAnalysis;
    }(line_base_1.LineBase));
    exports.TechnicalAnalysis = TechnicalAnalysis;
});
