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
define(["require", "exports", "../axis/double-axis", "../../common/utils/helper", "../../common/utils/helper", "@syncfusion/ej2-base"], function (require, exports, double_axis_1, helper_1, helper_2, ej2_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Logarithmic = (function (_super) {
        __extends(Logarithmic, _super);
        function Logarithmic(chart) {
            return _super.call(this, chart) || this;
        }
        Logarithmic.prototype.calculateRangeAndInterval = function (size, axis) {
            this.calculateRange(axis);
            this.getActualRange(axis, size);
            this.calculateVisibleRange(size, axis);
            this.calculateVisibleLabels(axis, this.chart);
        };
        Logarithmic.prototype.getActualRange = function (axis, size) {
            this.initializeDoubleRange(axis);
            this.min = this.min < 0 ? 0 : this.min;
            var logStart = helper_2.logBase(this.min, axis.logBase);
            logStart = isFinite(logStart) ? logStart : this.min;
            var logEnd = this.max === 1 ? 1 : helper_2.logBase(this.max, axis.logBase);
            logEnd = isFinite(logStart) ? logEnd : this.max;
            this.min = Math.floor(logStart / 1);
            var isRectSeries = axis.series && axis.series.some(function (item) {
                return (item.type.indexOf("Column") !== -1 || item.type.indexOf("Bar") !== -1) && item.type.indexOf("Range") === -1;
            });
            if (isRectSeries) {
                this.min = (this.min <= 0) ? (+this.min - 1) : this.min;
            }
            this.max = Math.ceil(logEnd / 1);
            this.max = this.max === this.min ? this.max + 1 : this.max;
            axis.actualRange.interval = axis.interval || this.calculateLogNiceInterval(this.max - this.min, size, axis);
            axis.actualRange.min = this.min;
            axis.actualRange.max = this.max;
            axis.actualRange.delta = this.max - this.min;
        };
        Logarithmic.prototype.calculateVisibleRange = function (size, axis) {
            axis.visibleRange = {
                interval: axis.actualRange.interval, max: axis.actualRange.max,
                min: axis.actualRange.min, delta: axis.actualRange.delta
            };
            var isLazyLoad = ej2_base_1.isNullOrUndefined(axis.zoomingScrollBar) ? false : axis.zoomingScrollBar.isLazyLoad;
            if ((axis.zoomFactor < 1 || axis.zoomPosition > 0) && !isLazyLoad) {
                axis.calculateVisibleRangeOnZooming(size);
                axis.visibleRange.interval = (axis.enableAutoIntervalOnZooming) ?
                    this.calculateLogNiceInterval(axis.doubleRange.delta, size, axis)
                    : axis.visibleRange.interval;
                axis.visibleRange.interval = Math.floor(axis.visibleRange.interval) === 0 ? 1 : Math.floor(axis.visibleRange.interval);
                axis.triggerRangeRender(this.chart, axis.visibleRange.min, axis.visibleRange.max, axis.visibleRange.interval);
            }
        };
        Logarithmic.prototype.calculateLogNiceInterval = function (delta, size, axis) {
            var actualDesiredIntervalsCount = helper_1.getActualDesiredIntervalsCount(size, axis);
            var niceInterval = delta;
            var minInterval = Math.pow(axis.logBase, Math.floor(helper_2.logBase(niceInterval, 10)));
            for (var j = 0, len = axis.intervalDivs.length; j < len; j++) {
                var currentInterval = minInterval * axis.intervalDivs[j];
                if (actualDesiredIntervalsCount < (delta / currentInterval)) {
                    break;
                }
                niceInterval = currentInterval;
            }
            return niceInterval;
        };
        Logarithmic.prototype.calculateVisibleLabels = function (axis, chart) {
            var tempInterval = axis.visibleRange.min;
            axis.visibleLabels = [];
            var labelStyle;
            var value;
            if (axis.zoomFactor < 1 || axis.zoomPosition > 0) {
                tempInterval = axis.visibleRange.min - (axis.visibleRange.min % axis.visibleRange.interval);
            }
            var axisFormat = this.getFormat(axis);
            var isCustomFormat = axisFormat.match('{value}') !== null;
            var startValue = Math.pow(axis.logBase, axis.visibleRange.min);
            axis.format = chart.intl.getNumberFormat({
                format: isCustomFormat ? '' : axisFormat,
                useGrouping: chart.useGroupingSeparator,
                maximumFractionDigits: startValue < 1 ? 20 : 3,
            });
            axis.startLabel = axis.format(startValue < 1 ? +startValue.toPrecision(1) : startValue);
            axis.endLabel = axis.format(Math.pow(axis.logBase, axis.visibleRange.max));
            for (; tempInterval <= axis.visibleRange.max; tempInterval += axis.visibleRange.interval) {
                labelStyle = (ej2_base_1.extend({}, ej2_base_1.getValue('properties', axis.labelStyle), null, true));
                if (helper_2.withIn(tempInterval, axis.visibleRange)) {
                    value = Math.pow(axis.logBase, tempInterval);
                    helper_1.triggerLabelRender(this.chart, tempInterval, this.formatValue(axis, isCustomFormat, axisFormat, value < 1 ? +value.toPrecision(1) : value), labelStyle, axis);
                }
            }
            if (axis.getMaxLabelWidth) {
                axis.getMaxLabelWidth(this.chart);
            }
        };
        Logarithmic.prototype.getModuleName = function () {
            return 'Logarithmic';
        };
        Logarithmic.prototype.destroy = function () {
        };
        return Logarithmic;
    }(double_axis_1.Double));
    exports.Logarithmic = Logarithmic;
});
