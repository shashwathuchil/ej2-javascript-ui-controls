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
    var SplineRangeAreaSeries = (function (_super) {
        __extends(SplineRangeAreaSeries, _super);
        function SplineRangeAreaSeries() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SplineRangeAreaSeries.prototype.render = function (series, xAxis, yAxis, inverted) {
            var point;
            var direction = '';
            var closed = undefined;
            var firstPoint = null;
            var pt;
            var betweenPt1;
            var betweenPt2;
            var highControlPt1;
            var highControlPt2;
            var realPoint = [];
            var points = [];
            var Index = 0;
            realPoint = this.filterEmptyPoints(series);
            for (var i = 0; i < realPoint.length; i++) {
                point = realPoint[i];
                if (point.x === null || point.x === '') {
                    continue;
                }
                else {
                    point.index = Index;
                    Index++;
                    points.push(point);
                }
            }
            var previous;
            var next;
            var visiblePoint = this.enableComplexProperty(series);
            var length = visiblePoint.length;
            for (var i = 0; i < length; i++) {
                point = visiblePoint[i];
                point.regions = [];
                point.symbolLocations = [];
                next = this.getNextIndex(points, point.index - 1, series);
                previous = this.getPreviousIndex(points, point.index - 1, series);
                var lowPoint = Math.min(point.low, point.high);
                var highPoint = Math.max(point.low, point.high);
                if (yAxis.isAxisInverse) {
                    var temp = lowPoint;
                    lowPoint = highPoint;
                    highPoint = temp;
                }
                var lowPtCoordinate = helper_1.getPoint(point.xValue, lowPoint, xAxis, yAxis, inverted);
                var highPtCoordinate = helper_1.getPoint(point.xValue, highPoint, xAxis, yAxis, inverted);
                point.symbolLocations.push(highPtCoordinate);
                point.symbolLocations.push(lowPtCoordinate);
                var rect1 = new ej2_svg_base_1.Rect(Math.min(lowPtCoordinate.x, highPtCoordinate.x), Math.min(lowPtCoordinate.y, highPtCoordinate.y), Math.max(Math.abs(highPtCoordinate.x - lowPtCoordinate.x), series.marker.width), Math.max(Math.abs(highPtCoordinate.y - lowPtCoordinate.y), series.marker.width));
                if (!inverted) {
                    rect1.x -= series.marker.width / 2;
                }
                else {
                    rect1.y -= series.marker.width / 2;
                }
                point.regions.push(rect1);
                if (point.visible &&
                    helper_1.withInRange(visiblePoint[previous], point, visiblePoint[next], series)) {
                    if (firstPoint) {
                        highControlPt1 = series.drawPoints[previous].controlPoint1;
                        highControlPt2 = series.drawPoints[previous].controlPoint2;
                        pt = helper_1.getPoint(point.xValue, point.high > point.low ? point.high : point.low, xAxis, yAxis, inverted);
                        betweenPt1 = helper_1.getPoint(highControlPt1.x, highControlPt1.y, xAxis, yAxis, inverted);
                        betweenPt2 = helper_1.getPoint(highControlPt2.x, highControlPt2.y, xAxis, yAxis, inverted);
                        direction = direction.concat('C ' + betweenPt1.x + ' '
                            + betweenPt1.y + ' ' + betweenPt2.x + ' ' + betweenPt2.y + ' ' + pt.x + ' ' + pt.y + ' ');
                    }
                    else {
                        if (yAxis.isAxisInverse) {
                            direction = direction.concat('M ' + (highPtCoordinate.x) + ' ' + (highPtCoordinate.y) + ' ' + 'L ' + (lowPtCoordinate.x) + ' ' + (lowPtCoordinate.y) + ' ');
                        }
                        else {
                            direction = direction.concat('M ' + (lowPtCoordinate.x) + ' ' + (lowPtCoordinate.y) + ' ' + 'L ' + (highPtCoordinate.x) + ' ' + (highPtCoordinate.y) + ' ');
                        }
                        closed = false;
                    }
                    if ((i + 1 < visiblePoint.length && !visiblePoint[i + 1].visible)
                        || i === visiblePoint.length - 1) {
                        direction = this.closeSplineRangeAreaPath(visiblePoint, point, series, direction, i, xAxis, yAxis, inverted);
                        direction = direction.concat(' ' + 'Z');
                        closed = true;
                    }
                    firstPoint = point;
                }
                else {
                    if (closed === false && i !== 0) {
                        direction = this.closeSplineRangeAreaPath(visiblePoint, point, series, direction, i, xAxis, yAxis, inverted);
                        closed = true;
                    }
                    firstPoint = null;
                    point.symbolLocations = [];
                }
            }
            var name1 = series.category === 'Indicator' ? series.chart.element.id + '_Indicator_' + series.index + '_' + series.name :
                series.chart.element.id + '_Series_' + series.index;
            var options = new ej2_svg_base_1.PathOption(name1, series.interior, series.border.width, series.border.color, series.opacity, series.dashArray, direction);
            this.appendLinePath(options, series, '');
            this.renderMarker(series);
        };
        SplineRangeAreaSeries.prototype.closeSplineRangeAreaPath = function (visiblePoint, point, series, direction, i, xAxis, yAxis, inverted) {
            var firstPoint = null;
            var pt;
            var betweenPt1;
            var betweenPt2;
            var lowControlPt1;
            var lowControlPt2;
            for (var j = i; j > 0; j--) {
                if (visiblePoint[j].visible) {
                    point = visiblePoint[j];
                    var low = Math.min(point.low, point.high);
                    var high = Math.max(point.low, point.high);
                    if (yAxis.isAxisInverse) {
                        var temp = low;
                        low = high;
                        high = temp;
                    }
                    var lowPtCoordinate = helper_1.getPoint(point.xValue, low, xAxis, yAxis, inverted);
                    var highPtCoordinate = helper_1.getPoint(point.xValue, high, xAxis, yAxis, inverted);
                    if (firstPoint) {
                        lowControlPt1 = series.lowDrawPoints[j].controlPoint1;
                        lowControlPt2 = series.lowDrawPoints[j].controlPoint2;
                        pt = helper_1.getPoint(point.xValue, point.low < point.high ? point.low : point.high, xAxis, yAxis, inverted);
                        betweenPt1 = helper_1.getPoint(lowControlPt1.x, lowControlPt1.y, xAxis, yAxis, inverted);
                        betweenPt2 = helper_1.getPoint(lowControlPt2.x, lowControlPt2.y, xAxis, yAxis, inverted);
                        direction = direction.concat('C ' + betweenPt2.x + ' '
                            + betweenPt2.y + ' ' + betweenPt1.x + ' ' + betweenPt1.y + ' ' + pt.x + ' ' + pt.y + ' ');
                    }
                    else {
                        if (yAxis.isAxisInverse) {
                            direction = direction.concat('L ' + (highPtCoordinate.x) + ' ' + (highPtCoordinate.y) + ' ');
                        }
                        else {
                            direction = direction.concat('L ' + (lowPtCoordinate.x) + ' ' + (lowPtCoordinate.y) + ' ');
                        }
                    }
                }
                else {
                    break;
                }
                firstPoint = point;
            }
            return direction;
        };
        SplineRangeAreaSeries.prototype.doAnimation = function (series) {
            var option = series.animation;
            this.doLinearAnimation(series, option);
        };
        SplineRangeAreaSeries.prototype.getModuleName = function () {
            return 'SplineRangeAreaSeries';
        };
        SplineRangeAreaSeries.prototype.destroy = function () {
        };
        return SplineRangeAreaSeries;
    }(spline_base_1.SplineBase));
    exports.SplineRangeAreaSeries = SplineRangeAreaSeries;
});
