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
    var LineSeries = (function (_super) {
        __extends(LineSeries, _super);
        function LineSeries() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LineSeries.prototype.render = function (series, xAxis, yAxis, isInverted) {
            var point1;
            var point2;
            var direction = '';
            var prevPoint = null;
            var startPoint = 'M';
            var isPolar = (series.chart && series.chart.chartAreaType === 'PolarRadar');
            var isDrop = (series.emptyPointSettings && series.emptyPointSettings.mode === 'Drop');
            var getCoordinate = isPolar ? helper_1.TransformToVisible : helper_1.getPoint;
            var visiblePoints = series.category === 'TrendLine' ? series.points : this.enableComplexProperty(series);
            for (var _i = 0, visiblePoints_1 = visiblePoints; _i < visiblePoints_1.length; _i++) {
                var point = visiblePoints_1[_i];
                point.regions = [];
                point.symbolLocations = [];
                if (point.visible && helper_1.withInRange(visiblePoints[point.index - 1], point, visiblePoints[point.index + 1], series)) {
                    direction += this.getLineDirection(prevPoint, point, series, isInverted, getCoordinate, startPoint);
                    startPoint = prevPoint ? 'L' : startPoint;
                    prevPoint = point;
                    this.storePointLocation(point, series, isInverted, getCoordinate);
                }
                else {
                    prevPoint = isDrop ? prevPoint : null;
                    startPoint = isDrop ? startPoint : 'M';
                }
            }
            if (isPolar) {
                if (series.isClosed) {
                    var points = this.getFirstLastVisiblePoint(visiblePoints);
                    point2 = getCoordinate(points.last.xValue, points.last.yValue, xAxis, yAxis, isInverted, series);
                    point1 = getCoordinate(points.first.xValue, points.first.yValue, xAxis, yAxis, isInverted, series);
                    direction = direction.concat(startPoint + ' ' + point2.x + ' ' + point2.y + ' ' + 'L' + ' ' + point1.x + ' ' + point1.y);
                }
            }
            var name = series.category === 'Indicator' ? series.chart.element.id + '_Indicator_' + series.index + '_' + series.name :
                series.category === 'TrendLine' ? series.chart.element.id + '_Series_' + series.sourceIndex + '_TrendLine_' + series.index :
                    series.chart.element.id + '_Series_' + (series.index === undefined ? series.category : series.index);
            var options = new ej2_svg_base_1.PathOption(name, 'none', series.width, series.interior, series.opacity, series.dashArray, direction);
            this.appendLinePath(options, series, '');
            this.renderMarker(series);
        };
        LineSeries.prototype.doAnimation = function (series) {
            var option = series.animation;
            this.doProgressiveAnimation(series, option);
        };
        LineSeries.prototype.getModuleName = function () {
            return 'LineSeries';
        };
        LineSeries.prototype.destroy = function () {
        };
        return LineSeries;
    }(line_base_1.LineBase));
    exports.LineSeries = LineSeries;
});
