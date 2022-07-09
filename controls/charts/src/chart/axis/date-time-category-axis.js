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
define(["require", "exports", "../axis/category-axis", "../../common/utils/helper", "../../common/utils/helper", "@syncfusion/ej2-base"], function (require, exports, category_axis_1, helper_1, helper_2, ej2_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DateTimeCategory = (function (_super) {
        __extends(DateTimeCategory, _super);
        function DateTimeCategory(chart) {
            return _super.call(this, chart) || this;
        }
        DateTimeCategory.prototype.calculateRangeAndInterval = function (size, axis) {
            this.axisSize = size;
            this.calculateRange(axis);
            this.getActualRange(axis, size);
            this.applyRangePadding(axis, size);
            this.calculateVisibleLabels(axis);
        };
        DateTimeCategory.prototype.calculateVisibleLabels = function (axis) {
            axis.visibleLabels = [];
            var labelStyle;
            var padding = axis.labelPlacement === 'BetweenTicks' ? 0.5 : 0;
            if (axis.intervalType === 'Auto') {
                this.calculateDateTimeNiceInterval(axis, this.axisSize, parseInt(axis.labels[0], 10), parseInt(axis.labels[axis.labels.length - 1], 10));
            }
            else {
                axis.actualIntervalType = axis.intervalType;
            }
            axis.format = this.chart.intl.getDateFormat({
                format: axis.labelFormat || this.blazorCustomFormat(axis), type: helper_2.firstToLowerCase(axis.skeletonType),
                skeleton: this.getSkeleton(axis, null, null, this.chart.isBlazor)
            });
            for (var i = 0; i < axis.labels.length; i++) {
                labelStyle = (ej2_base_1.extend({}, ej2_base_1.getValue('properties', axis.labelStyle), null, true));
                if (!this.sameInterval(axis.labels.map(Number)[i], axis.labels.map(Number)[i - 1], axis.actualIntervalType, i)
                    || axis.isIndexed) {
                    if (helper_2.withIn(i - padding, axis.visibleRange)) {
                        helper_1.triggerLabelRender(this.chart, i, (axis.isIndexed ? this.getIndexedAxisLabel(axis.labels[i], axis.format) :
                            axis.format(new Date(axis.labels.map(Number)[i]))), labelStyle, axis);
                    }
                }
            }
            if (axis.getMaxLabelWidth) {
                axis.getMaxLabelWidth(this.chart);
            }
        };
        DateTimeCategory.prototype.blazorCustomFormat = function (axis) {
            if (this.chart.isBlazor && axis.actualIntervalType === 'Years') {
                return 'yyyy';
            }
            else {
                return '';
            }
        };
        DateTimeCategory.prototype.getIndexedAxisLabel = function (value, format) {
            var texts = value.split(',');
            for (var i = 0; i < texts.length; i++) {
                texts[i] = format(new Date(parseInt(texts[i], 10)));
            }
            return texts.join(', ');
        };
        DateTimeCategory.prototype.sameInterval = function (currentDate, previousDate, type, index) {
            var sameValue;
            if (index === 0) {
                sameValue = false;
            }
            else {
                switch (type) {
                    case 'Years':
                        sameValue = new Date(currentDate).getFullYear() === new Date(previousDate).getFullYear();
                        break;
                    case 'Months':
                        sameValue = new Date(currentDate).getFullYear() === new Date(previousDate).getFullYear() &&
                            new Date(currentDate).getMonth() === new Date(previousDate).getMonth();
                        break;
                    case 'Days':
                        sameValue = (Math.abs(currentDate - previousDate) < 24 * 60 * 60 * 1000 &&
                            new Date(currentDate).getDay() === new Date(previousDate).getDay());
                        break;
                    case 'Hours':
                        sameValue = (Math.abs(currentDate - previousDate) < 60 * 60 * 1000 &&
                            new Date(currentDate).getDay() === new Date(previousDate).getDay());
                        break;
                    case 'Minutes':
                        sameValue = (Math.abs(currentDate - previousDate) < 60 * 1000 &&
                            new Date(currentDate).getMinutes() === new Date(previousDate).getMinutes());
                        break;
                    case 'Seconds':
                        sameValue = (Math.abs(currentDate - previousDate) < 1000 &&
                            new Date(currentDate).getDay() === new Date(previousDate).getDay());
                        break;
                }
            }
            return sameValue;
        };
        DateTimeCategory.prototype.getModuleName = function () {
            return 'DateTimeCategory';
        };
        DateTimeCategory.prototype.destroy = function () {
        };
        return DateTimeCategory;
    }(category_axis_1.Category));
    exports.DateTimeCategory = DateTimeCategory;
});
