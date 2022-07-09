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
define(["require", "exports", "../../common/utils/helper", "../series/polar-series", "@syncfusion/ej2-base"], function (require, exports, helper_1, polar_series_1, ej2_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RadarSeries = (function (_super) {
        __extends(RadarSeries, _super);
        function RadarSeries() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RadarSeries.prototype.render = function (series, xAxis, yAxis, inverted) {
            var seriesType = helper_1.firstToLowerCase(series.drawType);
            var yAxisMin = yAxis.minimum;
            var yAxisMax = yAxis.maximum;
            for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
                var point = _a[_i];
                point.visible = point.visible && !((!ej2_base_1.isNullOrUndefined(yAxisMin) && point.yValue < yAxisMin) ||
                    (!ej2_base_1.isNullOrUndefined(yAxisMax) && point.yValue > yAxisMax));
            }
            if (series.points.length) {
                if (series.drawType.indexOf('Column') === -1) {
                    series.chart[seriesType + 'SeriesModule'].render(series, xAxis, yAxis, inverted);
                }
                else {
                    this.columnDrawTypeRender(series, xAxis, yAxis);
                }
            }
        };
        RadarSeries.prototype.getRadarIsInversedPath = function (xAxis, endPoint) {
            var chart = this.chart;
            var x1;
            var y1;
            var vector;
            var radius = chart.radius;
            var length = xAxis.visibleLabels.length;
            var direction = endPoint;
            vector = helper_1.CoefficientToVector(helper_1.valueToPolarCoefficient(xAxis.visibleLabels[0].value, xAxis), this.startAngle);
            y1 = this.centerY + radius * vector.y;
            x1 = this.centerX + radius * vector.x;
            direction += ' L ' + x1 + ' ' + y1 + ' ';
            for (var i = length - 1; i >= 0; i--) {
                vector = helper_1.CoefficientToVector(helper_1.valueToPolarCoefficient(xAxis.visibleLabels[i].value, xAxis), this.startAngle);
                y1 = this.centerY + radius * vector.y;
                x1 = this.centerX + radius * vector.x;
                direction += 'L ' + x1 + ' ' + y1 + ' ';
            }
            return direction;
        };
        RadarSeries.prototype.getModuleName = function () {
            return 'RadarSeries';
        };
        RadarSeries.prototype.destroy = function () {
        };
        return RadarSeries;
    }(polar_series_1.PolarSeries));
    exports.RadarSeries = RadarSeries;
});
