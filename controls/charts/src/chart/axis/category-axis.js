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
define(["require", "exports", "../../common/utils/helper", "../utils/double-range", "../../common/utils/helper", "@syncfusion/ej2-base", "../axis/axis-helper"], function (require, exports, helper_1, double_range_1, helper_2, ej2_base_1, axis_helper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Category = (function (_super) {
        __extends(Category, _super);
        function Category(chart) {
            return _super.call(this, chart) || this;
        }
        Category.prototype.calculateRangeAndInterval = function (size, axis) {
            this.calculateRange(axis);
            this.getActualRange(axis, size);
            this.applyRangePadding(axis, size);
            this.calculateVisibleLabels(axis);
        };
        Category.prototype.getActualRange = function (axis, size) {
            this.initializeDoubleRange(axis);
            axis.actualRange = {};
            if (!axis.interval) {
                axis.actualRange.interval = Math.max(1, Math.floor(axis.doubleRange.delta / helper_1.getActualDesiredIntervalsCount(size, axis)));
            }
            else {
                axis.actualRange.interval = Math.ceil(axis.interval);
            }
            axis.actualRange.min = axis.doubleRange.start;
            axis.actualRange.max = axis.doubleRange.end;
            axis.actualRange.delta = axis.doubleRange.delta;
        };
        Category.prototype.applyRangePadding = function (axis, size) {
            var ticks = (axis.labelPlacement === 'BetweenTicks' && this.chart.chartAreaType !== 'PolarRadar') ? 0.5 : 0;
            if (ticks > 0) {
                axis.actualRange.min -= ticks;
                axis.actualRange.max += ticks;
            }
            else {
                axis.actualRange.max += axis.actualRange.max ? 0 : 0.5;
            }
            axis.doubleRange = new double_range_1.DoubleRange(axis.actualRange.min, axis.actualRange.max);
            axis.actualRange.delta = axis.doubleRange.delta;
            this.calculateVisibleRange(size, axis);
        };
        Category.prototype.calculateVisibleLabels = function (axis) {
            axis.visibleLabels = [];
            var tempInterval = Math.ceil(axis.visibleRange.min);
            var labelStyle;
            if (axis.zoomFactor < 1 || axis.zoomPosition > 0) {
                tempInterval = axis.visibleRange.min - (axis.visibleRange.min % axis.visibleRange.interval);
            }
            var position;
            axis.startLabel = axis.labels[Math.round(axis.visibleRange.min)];
            axis.endLabel = axis.labels[Math.floor(axis.visibleRange.max)];
            for (; tempInterval <= axis.visibleRange.max; tempInterval += axis.visibleRange.interval) {
                labelStyle = (ej2_base_1.extend({}, ej2_base_1.getValue('properties', axis.labelStyle), null, true));
                if (helper_2.withIn(tempInterval, axis.visibleRange) && axis.labels.length > 0) {
                    position = Math.round(tempInterval);
                    helper_1.triggerLabelRender(this.chart, position, axis.labels[position] ? axis.labels[position].toString() : position.toString(), labelStyle, axis);
                }
            }
            if (axis.getMaxLabelWidth) {
                axis.getMaxLabelWidth(this.chart);
            }
        };
        Category.prototype.getModuleName = function () {
            return 'Category';
        };
        Category.prototype.destroy = function () {
        };
        return Category;
    }(axis_helper_1.NiceInterval));
    exports.Category = Category;
});
