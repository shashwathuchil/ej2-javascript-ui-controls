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
define(["require", "exports", "../../common/utils/helper", "@syncfusion/ej2-svg-base", "./line-base"], function (require, exports, helper_1, ej2_svg_base_1, line_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StepAreaSeries = (function (_super) {
        __extends(StepAreaSeries, _super);
        function StepAreaSeries() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StepAreaSeries.prototype.render = function (series, xAxis, yAxis, isInverted) {
            var currentPoint;
            var secondPoint;
            var start = null;
            var direction = '';
            var visiblePoints = this.enableComplexProperty(series);
            var pointsLength = visiblePoints.length;
            var origin = Math.max(series.yAxis.visibleRange.min, 0);
            var point;
            var xValue;
            var lineLength;
            var prevPoint = null;
            if (xAxis.valueType === 'Category' && xAxis.labelPlacement === 'BetweenTicks') {
                lineLength = 0.5;
            }
            else {
                lineLength = 0;
            }
            for (var i = 0; i < pointsLength; i++) {
                point = visiblePoints[i];
                xValue = point.xValue;
                point.symbolLocations = [];
                point.regions = [];
                if (point.visible && helper_1.withInRange(visiblePoints[i - 1], point, visiblePoints[i + 1], series)) {
                    if (start === null) {
                        start = new helper_1.ChartLocation(xValue, 0);
                        currentPoint = helper_1.getPoint(xValue - lineLength, origin, xAxis, yAxis, isInverted);
                        direction += ('M' + ' ' + (currentPoint.x) + ' ' + (currentPoint.y) + ' ');
                        currentPoint = helper_1.getPoint(xValue - lineLength, point.yValue, xAxis, yAxis, isInverted);
                        direction += ('L' + ' ' + (currentPoint.x) + ' ' + (currentPoint.y) + ' ');
                    }
                    if (prevPoint != null) {
                        currentPoint = helper_1.getPoint(point.xValue, point.yValue, xAxis, yAxis, isInverted);
                        secondPoint = helper_1.getPoint(prevPoint.xValue, prevPoint.yValue, xAxis, yAxis, isInverted);
                        direction += ('L' + ' ' +
                            (currentPoint.x) + ' ' + (secondPoint.y) + ' L' + ' ' + (currentPoint.x) + ' ' + (currentPoint.y) + ' ');
                    }
                    else if (series.emptyPointSettings.mode === 'Gap') {
                        currentPoint = helper_1.getPoint(point.xValue, point.yValue, xAxis, yAxis, isInverted);
                        direction += 'L' + ' ' + (currentPoint.x) + ' ' + (currentPoint.y) + ' ';
                    }
                    this.storePointLocation(point, series, isInverted, helper_1.getPoint);
                    prevPoint = point;
                }
                if (visiblePoints[i + 1] && !visiblePoints[i + 1].visible && series.emptyPointSettings.mode !== 'Drop') {
                    currentPoint = helper_1.getPoint(xValue + lineLength, origin, xAxis, yAxis, isInverted);
                    direction += ('L' + ' ' + (currentPoint.x) + ' ' + (currentPoint.y));
                    start = null;
                    prevPoint = null;
                }
            }
            if ((pointsLength > 1) && direction !== '') {
                start = { 'x': visiblePoints[pointsLength - 1].xValue + lineLength, 'y': visiblePoints[pointsLength - 1].yValue };
                secondPoint = helper_1.getPoint(start.x, start.y, xAxis, yAxis, isInverted);
                direction += ('L' + ' ' + (secondPoint.x) + ' ' + (secondPoint.y) + ' ');
                start = { 'x': visiblePoints[pointsLength - 1].xValue + lineLength, 'y': origin };
                secondPoint = helper_1.getPoint(start.x, start.y, xAxis, yAxis, isInverted);
                direction += ('L' + ' ' + (secondPoint.x) + ' ' + (secondPoint.y) + ' ');
            }
            else {
                direction = '';
            }
            var options = new ej2_svg_base_1.PathOption(series.chart.element.id + '_Series_' + series.index, series.interior, series.border.width, series.border.color, series.opacity, series.dashArray, direction);
            this.appendLinePath(options, series, '');
            this.renderMarker(series);
        };
        StepAreaSeries.prototype.doAnimation = function (series) {
            var option = series.animation;
            this.doLinearAnimation(series, option);
        };
        StepAreaSeries.prototype.destroy = function () {
        };
        StepAreaSeries.prototype.getModuleName = function () {
            return 'StepAreaSeries';
        };
        return StepAreaSeries;
    }(line_base_1.LineBase));
    exports.StepAreaSeries = StepAreaSeries;
});
