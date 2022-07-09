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
    var StackingStepAreaSeries = (function (_super) {
        __extends(StackingStepAreaSeries, _super);
        function StackingStepAreaSeries() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StackingStepAreaSeries.prototype.render = function (stackSeries, xAxis, yAxis, isInverted) {
            var currentPointLocation;
            var secondPoint;
            var start = null;
            var direction = '';
            var stackedvalue = stackSeries.stackedValues;
            var visiblePoint = this.enableComplexProperty(stackSeries);
            var origin = Math.max(stackSeries.yAxis.visibleRange.min, stackedvalue.startValues[0]);
            var pointsLength = visiblePoint.length;
            var options;
            var point;
            var point2;
            var point3;
            var xValue;
            var lineLength;
            var prevPoint = null;
            var validIndex;
            var startPoint = 0;
            var pointIndex;
            if (xAxis.valueType === 'Category' && xAxis.labelPlacement === 'BetweenTicks') {
                lineLength = 0.5;
            }
            else {
                lineLength = 0;
            }
            for (var i = 0; i < pointsLength; i++) {
                point = visiblePoint[i];
                xValue = point.xValue;
                point.symbolLocations = [];
                point.regions = [];
                pointIndex = point.index;
                if (point.visible && helper_1.withInRange(visiblePoint[i - 1], point, visiblePoint[i + 1], stackSeries)) {
                    if (start === null) {
                        start = new helper_1.ChartLocation(xValue, 0);
                        currentPointLocation = helper_1.getPoint(xValue - lineLength, origin, xAxis, yAxis, isInverted);
                        direction += ('M' + ' ' + (currentPointLocation.x) + ' ' + (currentPointLocation.y) + ' ');
                        currentPointLocation = helper_1.getPoint(xValue - lineLength, stackedvalue.endValues[pointIndex], xAxis, yAxis, isInverted);
                        direction += ('L' + ' ' + (currentPointLocation.x) + ' ' + (currentPointLocation.y) + ' ');
                    }
                    if (prevPoint != null) {
                        currentPointLocation = helper_1.getPoint(point.xValue, stackedvalue.endValues[pointIndex], xAxis, yAxis, isInverted);
                        secondPoint = helper_1.getPoint(prevPoint.xValue, stackedvalue.endValues[prevPoint.index], xAxis, yAxis, isInverted);
                        direction += ('L' + ' ' + (currentPointLocation.x) + ' ' + (secondPoint.y) +
                            ' L' + ' ' + (currentPointLocation.x) + ' ' + (currentPointLocation.y) + ' ');
                    }
                    else if (stackSeries.emptyPointSettings.mode === 'Gap') {
                        currentPointLocation = helper_1.getPoint(point.xValue, stackedvalue.endValues[pointIndex], xAxis, yAxis, isInverted);
                        direction += 'L' + ' ' + (currentPointLocation.x) + ' ' + (currentPointLocation.y) + ' ';
                    }
                    visiblePoint[i].symbolLocations.push(helper_1.getPoint(visiblePoint[i].xValue, stackedvalue.endValues[pointIndex], xAxis, yAxis, isInverted));
                    visiblePoint[i].regions.push(new ej2_svg_base_1.Rect(visiblePoint[i].symbolLocations[0].x - stackSeries.marker.width, visiblePoint[i].symbolLocations[0].y - stackSeries.marker.height, 2 * stackSeries.marker.width, 2 * stackSeries.marker.height));
                    prevPoint = point;
                }
                if (visiblePoint[i + 1] && !visiblePoint[i + 1].visible && stackSeries.emptyPointSettings.mode !== 'Drop') {
                    var previousPointIndex = void 0;
                    for (var j = i; j >= startPoint; j--) {
                        pointIndex = visiblePoint[j].index;
                        previousPointIndex = j === 0 ? 0 : visiblePoint[j - 1].index;
                        if (j !== 0 && (stackedvalue.startValues[pointIndex] < stackedvalue.startValues[previousPointIndex] ||
                            stackedvalue.startValues[pointIndex] > stackedvalue.startValues[previousPointIndex])) {
                            currentPointLocation = helper_1.getPoint(visiblePoint[pointIndex].xValue, stackedvalue.startValues[pointIndex], xAxis, yAxis, isInverted);
                            direction = direction.concat('L' + ' ' + (currentPointLocation.x) + ' ' + (currentPointLocation.y) + ' ');
                            currentPointLocation = helper_1.getPoint(visiblePoint[pointIndex].xValue, stackedvalue.startValues[previousPointIndex], xAxis, yAxis, isInverted);
                        }
                        else {
                            currentPointLocation = helper_1.getPoint(visiblePoint[pointIndex].xValue, stackedvalue.startValues[pointIndex], xAxis, yAxis, isInverted);
                        }
                        direction = direction.concat('L' + ' ' + (currentPointLocation.x) + ' ' + (currentPointLocation.y) + ' ');
                    }
                    startPoint = i + 1;
                    start = null;
                    prevPoint = null;
                }
            }
            if (direction !== '') {
                if (pointsLength > 1) {
                    pointIndex = visiblePoint[pointsLength - 1].index;
                    start = { 'x': visiblePoint[pointsLength - 1].xValue + lineLength, 'y': stackedvalue.endValues[pointIndex] };
                    secondPoint = helper_1.getPoint(start.x, start.y, xAxis, yAxis, isInverted);
                    direction += ('L' + ' ' + (secondPoint.x) + ' ' + (secondPoint.y) + ' ');
                    start = { 'x': visiblePoint[pointsLength - 1].xValue + lineLength, 'y': stackedvalue.startValues[pointIndex] };
                    secondPoint = helper_1.getPoint(start.x, start.y, xAxis, yAxis, isInverted);
                    direction += ('L' + ' ' + (secondPoint.x) + ' ' + (secondPoint.y) + ' ');
                }
                for (var j = pointsLength - 1; j >= startPoint; j--) {
                    var index = void 0;
                    if (visiblePoint[j].visible) {
                        pointIndex = visiblePoint[j].index;
                        point2 = helper_1.getPoint(visiblePoint[j].xValue, stackedvalue.startValues[pointIndex], xAxis, yAxis, isInverted);
                        direction = direction.concat('L' + ' ' + (point2.x) + ' ' + (point2.y) + ' ');
                    }
                    if (j !== 0 && !visiblePoint[j - 1].visible) {
                        index = this.getNextVisiblePointIndex(visiblePoint, j);
                    }
                    if (j !== 0) {
                        validIndex = index ? index : j - 1;
                        pointIndex = index ? visiblePoint[index].index : visiblePoint[j - 1].index;
                        point3 = helper_1.getPoint(visiblePoint[validIndex].xValue, stackedvalue.startValues[pointIndex], xAxis, yAxis, isInverted);
                        direction = direction.concat('L' + ' ' + (point2.x) + ' ' + (point3.y) + ' ');
                    }
                }
                options = new ej2_svg_base_1.PathOption(stackSeries.chart.element.id + '_Series_' + stackSeries.index, stackSeries.interior, stackSeries.border.width, stackSeries.border.color, stackSeries.opacity, stackSeries.dashArray, direction);
                this.appendLinePath(options, stackSeries, '');
                this.renderMarker(stackSeries);
            }
        };
        StackingStepAreaSeries.prototype.doAnimation = function (series) {
            var option = series.animation;
            this.doLinearAnimation(series, option);
        };
        StackingStepAreaSeries.prototype.destroy = function () {
        };
        StackingStepAreaSeries.prototype.getModuleName = function () {
            return 'StackingStepAreaSeries';
        };
        StackingStepAreaSeries.prototype.getNextVisiblePointIndex = function (points, j) {
            var index;
            for (index = j - 1; index >= 0; index--) {
                if (!points[index].visible) {
                    continue;
                }
                else {
                    return index;
                }
            }
            return 0;
        };
        return StackingStepAreaSeries;
    }(line_base_1.LineBase));
    exports.StackingStepAreaSeries = StackingStepAreaSeries;
});
