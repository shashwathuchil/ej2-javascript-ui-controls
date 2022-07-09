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
    var StackingLineSeries = (function (_super) {
        __extends(StackingLineSeries, _super);
        function StackingLineSeries() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StackingLineSeries.prototype.render = function (series, xAxis, yAxis, isInverted) {
            var polarType = series.chart.chartAreaType === 'PolarRadar';
            var getCoordinate = polarType ? helper_1.TransformToVisible : helper_1.getPoint;
            var direction = '';
            var visiblePts = this.enableComplexProperty(series);
            var pointsLength = visiblePts.length;
            var stackedvalue = series.stackedValues;
            var pointIndex, nextPointIndex;
            var point1;
            var point2;
            for (var i = 0; i < pointsLength; i++) {
                visiblePts[i].regions = [];
                visiblePts[i].symbolLocations = [];
                pointIndex = visiblePts[i].index;
                if (visiblePts[i].visible && helper_1.withInRange(visiblePts[i - 1], visiblePts[i], visiblePts[i + 1], series)) {
                    point1 = getCoordinate(visiblePts[i].xValue, stackedvalue.endValues[pointIndex], xAxis, yAxis, isInverted, series);
                    direction = direction.concat((i ? 'L' : 'M') + ' ' + (point1.x) + ' ' + (point1.y) + ' ');
                    visiblePts[i].symbolLocations.push(getCoordinate(visiblePts[i].xValue, stackedvalue.endValues[pointIndex], xAxis, yAxis, isInverted, series));
                    visiblePts[i].regions.push(new ej2_svg_base_1.Rect(visiblePts[i].symbolLocations[0].x - series.marker.width, visiblePts[i].symbolLocations[0].y - series.marker.height, 2 * series.marker.width, 2 * series.marker.height));
                }
                else {
                    if (series.emptyPointSettings.mode !== 'Drop') {
                        if (visiblePts[i + 1] && visiblePts[i + 1].visible) {
                            nextPointIndex = visiblePts[i + 1].index;
                            point1 = getCoordinate(visiblePts[i + 1].xValue, stackedvalue.endValues[nextPointIndex], xAxis, yAxis, isInverted, series);
                            direction = direction.concat('M' + ' ' + (point1.x) + ' ' + (point1.y) + ' ');
                        }
                    }
                }
            }
            if (series.chart.chartAreaType === 'PolarRadar' && visiblePts.length > 1) {
                point1 = { 'y': stackedvalue.endValues[0], 'x': series.points[0].xValue };
                point2 = getCoordinate(point1.x, point1.y, xAxis, yAxis, isInverted, series);
                direction += ('L' + ' ' + (point2.x) + ' ' + (point2.y) + ' ');
            }
            var options = new ej2_svg_base_1.PathOption(series.chart.element.id + '_Series_' + series.index, 'none', series.width, series.interior, series.opacity, series.dashArray, direction);
            this.appendLinePath(options, series, '');
            this.renderMarker(series);
        };
        StackingLineSeries.prototype.doAnimation = function (series) {
            var option = series.animation;
            this.doLinearAnimation(series, option);
        };
        StackingLineSeries.prototype.destroy = function () {
        };
        StackingLineSeries.prototype.getModuleName = function () {
            return 'StackingLineSeries';
        };
        return StackingLineSeries;
    }(line_base_1.LineBase));
    exports.StackingLineSeries = StackingLineSeries;
});
