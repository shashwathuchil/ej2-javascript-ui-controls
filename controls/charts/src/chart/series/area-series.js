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
define(["require", "exports", "../../common/utils/helper", "@syncfusion/ej2-svg-base", "./multi-colored-base"], function (require, exports, helper_1, ej2_svg_base_1, multi_colored_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AreaSeries = (function (_super) {
        __extends(AreaSeries, _super);
        function AreaSeries() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AreaSeries.prototype.render = function (series, xAxis, yAxis, isInverted) {
            var startPoint = null;
            var direction = '';
            var isPolar = (series.chart && series.chart.chartAreaType === 'PolarRadar');
            var origin = Math.max(series.yAxis.visibleRange.min, 0);
            if (isPolar) {
                var connectPoints = this.getFirstLastVisiblePoint(series.points);
                origin = connectPoints.first.yValue;
            }
            var currentXValue;
            var isDropMode = (series.emptyPointSettings && series.emptyPointSettings.mode === 'Drop');
            var borderWidth = series.border ? series.border.width : 0;
            var borderColor = series.border ? series.border.color : 'transparent';
            var getCoordinate = series.chart.chartAreaType === 'PolarRadar' ? helper_1.TransformToVisible : helper_1.getPoint;
            var visiblePoints = this.enableComplexProperty(series);
            var point;
            for (var i = 0; i < visiblePoints.length; i++) {
                point = visiblePoints[i];
                currentXValue = point.xValue;
                point.symbolLocations = [];
                point.regions = [];
                if (point.visible && helper_1.withInRange(visiblePoints[i - 1], point, visiblePoints[i + 1], series)) {
                    direction += this.getAreaPathDirection(currentXValue, origin, series, isInverted, getCoordinate, startPoint, 'M');
                    startPoint = startPoint || new helper_1.ChartLocation(currentXValue, origin);
                    direction += this.getAreaPathDirection(currentXValue, point.yValue, series, isInverted, getCoordinate, null, 'L');
                    if (visiblePoints[i + 1] && (!visiblePoints[i + 1].visible &&
                        (!isPolar || (isPolar && this.withinYRange(visiblePoints[i + 1], yAxis)))) && !isDropMode) {
                        direction += this.getAreaEmptyDirection({ 'x': currentXValue, 'y': origin }, startPoint, series, isInverted, getCoordinate);
                        startPoint = null;
                    }
                    this.storePointLocation(point, series, isInverted, getCoordinate);
                }
            }
            if (isPolar && direction !== '') {
                var endPoint = '';
                var chart = this.chart;
                endPoint += this.getAreaPathDirection(0, origin, series, isInverted, getCoordinate, null, 'L');
                if (xAxis.isAxisInverse || yAxis.isAxisInverse) {
                    direction += (series.type === 'Polar' ? chart.polarSeriesModule.getPolarIsInversedPath(xAxis, endPoint) :
                        chart.radarSeriesModule.getRadarIsInversedPath(xAxis, endPoint));
                }
                direction = direction.concat(direction + ' ' + 'Z');
            }
            this.appendLinePath(new ej2_svg_base_1.PathOption(series.chart.element.id + '_Series_' + series.index, series.interior, borderWidth, borderColor, series.opacity, series.dashArray, ((series.points.length > 1 && direction !== '') ? (direction + this.getAreaPathDirection(series.points[series.points.length - 1].xValue, series.chart.chartAreaType === 'PolarRadar' ?
                series.points[series.points.length - 1].yValue : origin, series, isInverted, getCoordinate, null, 'L')) : '')), series, '');
            this.renderMarker(series);
        };
        AreaSeries.prototype.destroy = function () {
        };
        AreaSeries.prototype.getModuleName = function () {
            return 'AreaSeries';
        };
        AreaSeries.prototype.doAnimation = function (series) {
            var option = series.animation;
            this.doLinearAnimation(series, option);
        };
        return AreaSeries;
    }(multi_colored_base_1.MultiColoredSeries));
    exports.AreaSeries = AreaSeries;
});
