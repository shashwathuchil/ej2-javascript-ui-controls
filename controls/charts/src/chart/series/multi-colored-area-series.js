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
define(["require", "exports", "../../common/utils/helper", "@syncfusion/ej2-svg-base", "@syncfusion/ej2-base", "./multi-colored-base"], function (require, exports, helper_1, ej2_svg_base_1, ej2_base_1, multi_colored_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MultiColoredAreaSeries = (function (_super) {
        __extends(MultiColoredAreaSeries, _super);
        function MultiColoredAreaSeries() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MultiColoredAreaSeries.prototype.render = function (series, xAxis, yAxis, isInverted) {
            var _this = this;
            var firstPoint;
            var startPoint = null;
            var direction = '';
            var origin = Math.max(series.yAxis.visibleRange.min, 0);
            var options = [];
            var startRegion;
            var previous;
            var rendered;
            var segments = this.sortSegments(series, series.segments);
            series.visiblePoints.map(function (point, i, seriesPoints) {
                point.symbolLocations = [];
                point.regions = [];
                rendered = false;
                if (point.visible && helper_1.withInRange(seriesPoints[i - 1], point, seriesPoints[i + 1], series)) {
                    direction += _this.getAreaPathDirection(point.xValue, origin, series, isInverted, helper_1.getPoint, startPoint, 'M');
                    startPoint = startPoint || new helper_1.ChartLocation(point.xValue, origin);
                    firstPoint = helper_1.getPoint(point.xValue, point.yValue, xAxis, yAxis, isInverted);
                    if (previous && _this.setPointColor(point, previous, series, series.segmentAxis === 'X', segments)) {
                        rendered = true;
                        startRegion = helper_1.getPoint(startPoint.x, origin, xAxis, yAxis, isInverted);
                        direction += ('L' + ' ' + (firstPoint.x) + ' ' + (firstPoint.y) + ' ');
                        direction += ('L' + ' ' + (firstPoint.x) + ' ' + (startRegion.y) + ' ');
                        _this.generatePathOption(options, series, previous, direction, '_Point_' + previous.index);
                        direction = 'M' + ' ' + (firstPoint.x) + ' ' + (startRegion.y) + ' ' + 'L' + ' ' +
                            (firstPoint.x) + ' ' + (firstPoint.y) + ' ';
                    }
                    else {
                        direction += ('L' + ' ' + (firstPoint.x) + ' ' + (firstPoint.y) + ' ');
                        _this.setPointColor(point, null, series, series.segmentAxis === 'X', segments);
                    }
                    if (seriesPoints[i + 1] && !seriesPoints[i + 1].visible && series.emptyPointSettings.mode !== 'Drop') {
                        direction += _this.getAreaEmptyDirection({ 'x': point.xValue, 'y': origin }, startPoint, series, isInverted, helper_1.getPoint);
                        startPoint = null;
                    }
                    previous = point;
                    _this.storePointLocation(point, series, isInverted, helper_1.getPoint);
                }
            });
            if (!ej2_base_1.isNullOrUndefined(rendered) && !rendered) {
                direction = series.points.length > 1 ?
                    (direction + this.getAreaPathDirection(previous.xValue, origin, series, isInverted, helper_1.getPoint, null, 'L')) : '';
                this.generatePathOption(options, series, previous, direction, '');
            }
            this.applySegmentAxis(series, options, segments);
            this.renderMarker(series);
        };
        MultiColoredAreaSeries.prototype.generatePathOption = function (options, series, point, direction, id) {
            options.push(new ej2_svg_base_1.PathOption(series.chart.element.id + '_Series_' + series.index + id, series.setPointColor(point, series.interior), series.border.width, series.border.color, series.opacity, series.dashArray, direction));
        };
        MultiColoredAreaSeries.prototype.destroy = function () {
        };
        MultiColoredAreaSeries.prototype.getModuleName = function () {
            return 'MultiColoredAreaSeries';
        };
        MultiColoredAreaSeries.prototype.doAnimation = function (series) {
            this.doLinearAnimation(series, series.animation);
        };
        return MultiColoredAreaSeries;
    }(multi_colored_base_1.MultiColoredSeries));
    exports.MultiColoredAreaSeries = MultiColoredAreaSeries;
});
