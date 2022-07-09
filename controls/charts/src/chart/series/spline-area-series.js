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
    var SplineAreaSeries = (function (_super) {
        __extends(SplineAreaSeries, _super);
        function SplineAreaSeries() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SplineAreaSeries.prototype.render = function (series, xAxis, yAxis, isInverted) {
            var firstPoint = null;
            var direction = '';
            var startPoint = null;
            var startPoint1 = null;
            var pt2;
            var bpt1;
            var bpt2;
            var controlPt1;
            var controlPt2;
            var realPoints = [];
            var points = [];
            var point;
            var pointIndex = 0;
            realPoints = this.filterEmptyPoints(series);
            for (var i = 0; i < realPoints.length; i++) {
                point = realPoints[i];
                if (point.x === null || point.x === '') {
                    continue;
                }
                else {
                    point.index = pointIndex;
                    pointIndex++;
                    points.push(point);
                }
            }
            var pointsLength = points.length;
            var previous;
            var getCoordinate = series.chart.chartAreaType === 'PolarRadar' ? helper_1.TransformToVisible : helper_1.getPoint;
            var origin = series.chart.chartAreaType === 'PolarRadar' ? series.points[0].yValue :
                Math.max(series.yAxis.visibleRange.min, 0);
            for (var i = 0; i < pointsLength; i++) {
                point = points[i];
                point.symbolLocations = [];
                point.regions = [];
                previous = this.getPreviousIndex(points, point.index - 1, series);
                if (point.visible &&
                    helper_1.withInRange(points[previous], point, points[this.getNextIndex(points, point.index - 1, series)], series)) {
                    if (firstPoint) {
                        controlPt1 = series.drawPoints[previous].controlPoint1;
                        controlPt2 = series.drawPoints[previous].controlPoint2;
                        pt2 = getCoordinate(point.xValue, point.yValue, xAxis, yAxis, isInverted, series);
                        bpt1 = getCoordinate(controlPt1.x, controlPt1.y, xAxis, yAxis, isInverted, series);
                        bpt2 = getCoordinate(controlPt2.x, controlPt2.y, xAxis, yAxis, isInverted, series);
                        direction = direction.concat('C ' + bpt1.x + ' '
                            + bpt1.y + ' ' + bpt2.x + ' ' + bpt2.y + ' ' + pt2.x + ' ' + pt2.y + ' ');
                    }
                    else {
                        startPoint = getCoordinate(point.xValue, origin, xAxis, yAxis, isInverted, series);
                        direction += ('M ' + startPoint.x + ' ' + startPoint.y + ' ');
                        startPoint1 = getCoordinate(point.xValue, point.yValue, xAxis, yAxis, isInverted, series);
                        direction += ('L ' + startPoint1.x + ' ' + startPoint1.y + ' ');
                    }
                    this.storePointLocation(point, series, isInverted, getCoordinate);
                    firstPoint = point;
                }
                else {
                    firstPoint = null;
                    point.symbolLocations = [];
                }
                if (((i + 1 < pointsLength && !points[i + 1].visible) || i === pointsLength - 1)
                    && pt2 && startPoint) {
                    startPoint = getCoordinate(point.xValue, origin, xAxis, yAxis, isInverted, series);
                    direction = direction.concat('L ' + (startPoint.x) + ' ' + (startPoint.y));
                }
            }
            this.appendLinePath(new ej2_svg_base_1.PathOption(series.chart.element.id + '_Series_' + series.index, series.interior, series.border.width, series.border.color, series.opacity, series.dashArray, direction), series, '');
            this.renderMarker(series);
        };
        SplineAreaSeries.prototype.getModuleName = function () {
            return 'SplineAreaSeries';
        };
        SplineAreaSeries.prototype.destroy = function () {
        };
        return SplineAreaSeries;
    }(spline_base_1.SplineBase));
    exports.SplineAreaSeries = SplineAreaSeries;
});
