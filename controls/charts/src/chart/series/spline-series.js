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
define(["require", "exports", "../../common/utils/helper", "@syncfusion/ej2-svg-base", "./spline-base"], function (require, exports, helper_1, ej2_svg_base_1, spline_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SplineSeries = (function (_super) {
        __extends(SplineSeries, _super);
        function SplineSeries() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SplineSeries.prototype.render = function (series, xAxis, yAxis, isInverted) {
            var firstPoint = null;
            var direction = '';
            var startPoint = 'M';
            var points = [];
            var tempPoints = series.category === 'TrendLine' ? series.points : this.enableComplexProperty(series);
            points = this.filterEmptyPoints(series, tempPoints);
            var previous;
            var getCoordinate = series.chart.chartAreaType === 'PolarRadar' ? helper_1.TransformToVisible : helper_1.getPoint;
            for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
                var point = points_1[_i];
                previous = this.getPreviousIndex(points, point.index - 1, series);
                point.symbolLocations = [];
                point.regions = [];
                if (point.visible) {
                    if (helper_1.withInRange(points[previous], point, points[this.getNextIndex(points, point.index - 1, series)], series)) {
                        if (firstPoint !== null) {
                            direction = this.getSplineDirection(series.drawPoints[previous], firstPoint, point, xAxis, yAxis, isInverted, series, startPoint, getCoordinate, direction);
                            startPoint = 'L';
                        }
                        this.storePointLocation(point, series, isInverted, getCoordinate);
                    }
                    firstPoint = point;
                }
                else {
                    startPoint = 'M';
                    firstPoint = null;
                    point.symbolLocations = [];
                }
            }
            if ((points.length > 0 && series.drawPoints.length > 0) && series.chart.chartAreaType === 'PolarRadar' && series.isClosed) {
                var connectPoints = this.getFirstLastVisiblePoint(points);
                direction = this.getSplineDirection(series.drawPoints[series.drawPoints.length - 1], connectPoints.last, { xValue: connectPoints.first.xValue, yValue: connectPoints.first.yValue }, xAxis, yAxis, isInverted, series, startPoint, getCoordinate, direction);
                startPoint = 'L';
            }
            var name = series.category === 'TrendLine' ? series.chart.element.id + '_Series_' + series.sourceIndex + '_TrendLine_' + series.index :
                series.chart.element.id + '_Series_' + series.index;
            var options = new ej2_svg_base_1.PathOption(name, 'transparent', series.width, series.interior, series.opacity, series.dashArray, direction);
            this.appendLinePath(options, series, '');
            this.renderMarker(series);
        };
        SplineSeries.prototype.getSplineDirection = function (data, firstPoint, point, xAxis, yAxis, isInverted, series, startPoint, getCoordinate, direction) {
            var controlPoint1 = data.controlPoint1;
            var controlPoint2 = data.controlPoint2;
            var pt1 = getCoordinate(firstPoint.xValue, firstPoint.yValue, xAxis, yAxis, isInverted, series);
            var pt2 = getCoordinate(point.xValue, point.yValue, xAxis, yAxis, isInverted, series);
            var bpt1 = getCoordinate(controlPoint1.x, controlPoint1.y, xAxis, yAxis, isInverted, series);
            var bpt2 = getCoordinate(controlPoint2.x, controlPoint2.y, xAxis, yAxis, isInverted, series);
            return direction.concat((startPoint + ' ' + (pt1.x) + ' ' + (pt1.y) + ' ' + 'C' + ' ' + (bpt1.x) + ' '
                + (bpt1.y) + ' ' + (bpt2.x) + ' ' + (bpt2.y) + ' ' + (pt2.x) + ' ' + (pt2.y) + ' '));
        };
        SplineSeries.prototype.getModuleName = function () {
            return 'SplineSeries';
        };
        SplineSeries.prototype.destroy = function () {
        };
        return SplineSeries;
    }(spline_base_1.SplineBase));
    exports.SplineSeries = SplineSeries;
});
