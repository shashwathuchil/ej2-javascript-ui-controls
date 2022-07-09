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
    var MultiColoredLineSeries = (function (_super) {
        __extends(MultiColoredLineSeries, _super);
        function MultiColoredLineSeries() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MultiColoredLineSeries.prototype.render = function (series, xAxis, yAxis, isInverted) {
            var previous = null;
            var startPoint = 'M';
            var visiblePoints = this.enableComplexProperty(series);
            var options = [];
            var direction = '';
            var segments = this.sortSegments(series, series.segments);
            for (var _i = 0, visiblePoints_1 = visiblePoints; _i < visiblePoints_1.length; _i++) {
                var point = visiblePoints_1[_i];
                point.regions = [];
                if (point.visible && helper_1.withInRange(visiblePoints[point.index - 1], point, visiblePoints[point.index + 1], series)) {
                    direction += this.getLineDirection(previous, point, series, isInverted, helper_1.getPoint, startPoint);
                    if (previous != null) {
                        if (this.setPointColor(point, previous, series, series.segmentAxis === 'X', segments)) {
                            options.push(new ej2_svg_base_1.PathOption(series.chart.element.id + '_Series_' + series.index + '_Point_' + previous.index, 'none', series.width, series.setPointColor(previous, series.interior), series.opacity, series.dashArray, direction));
                            startPoint = 'M';
                            direction = '';
                        }
                        else {
                            startPoint = 'L';
                        }
                    }
                    else {
                        this.setPointColor(point, null, series, series.segmentAxis === 'X', segments);
                    }
                    previous = point;
                    this.storePointLocation(point, series, isInverted, helper_1.getPoint);
                }
                else {
                    previous = (series.emptyPointSettings.mode === 'Drop') ? previous : null;
                    startPoint = (series.emptyPointSettings.mode === 'Drop') ? startPoint : 'M';
                    point.symbolLocations = [];
                }
            }
            if (direction !== '') {
                options.push(new ej2_svg_base_1.PathOption(series.chart.element.id + '_Series_' + series.index, 'none', series.width, series.setPointColor(visiblePoints[visiblePoints.length - 1], series.interior), series.opacity, series.dashArray, direction));
            }
            this.applySegmentAxis(series, options, segments);
            this.renderMarker(series);
        };
        MultiColoredLineSeries.prototype.doAnimation = function (series) {
            this.doLinearAnimation(series, series.animation);
        };
        MultiColoredLineSeries.prototype.getModuleName = function () {
            return 'MultiColoredLineSeries';
        };
        MultiColoredLineSeries.prototype.destroy = function () {
        };
        return MultiColoredLineSeries;
    }(multi_colored_base_1.MultiColoredSeries));
    exports.MultiColoredLineSeries = MultiColoredLineSeries;
});
