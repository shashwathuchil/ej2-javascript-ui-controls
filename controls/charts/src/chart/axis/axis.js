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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "@syncfusion/ej2-base", "../../common/model/base", "../../common/utils/helper", "@syncfusion/ej2-svg-base", "../utils/double-range", "../axis/double-axis", "../../common/model/theme", "../../common/model/constants", "../model/chart-base", "../../common/utils/helper", "@syncfusion/ej2-base"], function (require, exports, ej2_base_1, base_1, helper_1, ej2_svg_base_1, double_range_1, double_axis_1, theme_1, constants_1, chart_base_1, helper_2, ej2_base_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Row = (function (_super) {
        __extends(Row, _super);
        function Row() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.axes = [];
            _this.nearSizes = [];
            _this.farSizes = [];
            return _this;
        }
        Row.prototype.computeSize = function (axis, scrollBarHeight) {
            var width = 0;
            var innerPadding = 5;
            if (axis.visible && axis.internalVisibility) {
                width += (axis.findTickSize(axis.crossInAxis) + scrollBarHeight +
                    axis.findLabelSize(axis.crossInAxis, innerPadding) + axis.lineStyle.width * 0.5);
            }
            if (axis.isAxisOpposedPosition) {
                this.farSizes.push(width);
            }
            else {
                this.nearSizes.push(width);
            }
        };
        return Row;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property('100%')
    ], Row.prototype, "height", void 0);
    __decorate([
        ej2_base_1.Complex({}, base_1.Border)
    ], Row.prototype, "border", void 0);
    exports.Row = Row;
    var Column = (function (_super) {
        __extends(Column, _super);
        function Column() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.axes = [];
            _this.nearSizes = [];
            _this.farSizes = [];
            _this.padding = 0;
            return _this;
        }
        Column.prototype.computeSize = function (axis, scrollBarHeight) {
            var height = 0;
            var innerPadding = 5;
            if (axis.visible && axis.internalVisibility) {
                height += (axis.findTickSize(axis.crossInAxis) + scrollBarHeight +
                    axis.findLabelSize(axis.crossInAxis, innerPadding) + axis.lineStyle.width * 0.5);
            }
            if (axis.isAxisOpposedPosition) {
                this.farSizes.push(height);
            }
            else {
                this.nearSizes.push(height);
            }
        };
        return Column;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property('100%')
    ], Column.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Complex({}, base_1.Border)
    ], Column.prototype, "border", void 0);
    exports.Column = Column;
    var MajorGridLines = (function (_super) {
        __extends(MajorGridLines, _super);
        function MajorGridLines() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MajorGridLines;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(1)
    ], MajorGridLines.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], MajorGridLines.prototype, "dashArray", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], MajorGridLines.prototype, "color", void 0);
    exports.MajorGridLines = MajorGridLines;
    var MinorGridLines = (function (_super) {
        __extends(MinorGridLines, _super);
        function MinorGridLines() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MinorGridLines;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(0.7)
    ], MinorGridLines.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], MinorGridLines.prototype, "dashArray", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], MinorGridLines.prototype, "color", void 0);
    exports.MinorGridLines = MinorGridLines;
    var AxisLine = (function (_super) {
        __extends(AxisLine, _super);
        function AxisLine() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return AxisLine;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(1)
    ], AxisLine.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], AxisLine.prototype, "dashArray", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], AxisLine.prototype, "color", void 0);
    exports.AxisLine = AxisLine;
    var MajorTickLines = (function (_super) {
        __extends(MajorTickLines, _super);
        function MajorTickLines() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MajorTickLines;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(1)
    ], MajorTickLines.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property(5)
    ], MajorTickLines.prototype, "height", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], MajorTickLines.prototype, "color", void 0);
    exports.MajorTickLines = MajorTickLines;
    var MinorTickLines = (function (_super) {
        __extends(MinorTickLines, _super);
        function MinorTickLines() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MinorTickLines;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(0.7)
    ], MinorTickLines.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property(5)
    ], MinorTickLines.prototype, "height", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], MinorTickLines.prototype, "color", void 0);
    exports.MinorTickLines = MinorTickLines;
    var CrosshairTooltip = (function (_super) {
        __extends(CrosshairTooltip, _super);
        function CrosshairTooltip() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CrosshairTooltip;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(false)
    ], CrosshairTooltip.prototype, "enable", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], CrosshairTooltip.prototype, "fill", void 0);
    __decorate([
        ej2_base_1.Complex(theme_1.Theme.crosshairLabelFont, base_1.Font)
    ], CrosshairTooltip.prototype, "textStyle", void 0);
    exports.CrosshairTooltip = CrosshairTooltip;
    var Axis = (function (_super) {
        __extends(Axis, _super);
        function Axis(parent, propName, defaultValue, isArray) {
            var _this = _super.call(this, parent, propName, defaultValue, isArray) || this;
            _this.visibleLabels = [];
            _this.series = [];
            _this.rect = new ej2_svg_base_1.Rect(undefined, undefined, 0, 0);
            _this.axisBottomLine = null;
            _this.intervalDivs = [10, 5, 2, 1];
            _this.isStack100 = false;
            _this.crossAt = null;
            _this.updatedRect = null;
            _this.multiLevelLabelHeight = 0;
            _this.isChart = true;
            _this.isIntervalInDecimal = true;
            _this.titleCollection = [];
            _this.titleSize = new ej2_svg_base_1.Size(0, 0);
            _this.internalVisibility = true;
            _this.isRTLEnabled = false;
            _this.angle = _this.labelRotation;
            return _this;
        }
        Axis.prototype.findTickSize = function (crossAxis) {
            if (this.tickPosition === 'Inside') {
                return 0;
            }
            if (crossAxis && (!crossAxis.visibleRange || this.isInside(crossAxis.visibleRange))) {
                return 0;
            }
            return this.majorTickLines.height;
        };
        Axis.prototype.isInside = function (range) {
            return (helper_1.inside(this.crossAt, range) ||
                (!this.isAxisOpposedPosition && this.crossAt >= range.max) || (this.isAxisOpposedPosition && this.crossAt <= range.min));
        };
        Axis.prototype.findLabelSize = function (crossAxis, innerPadding) {
            var titleSize = 0;
            var isHorizontal = this.orientation === 'Horizontal';
            if (this.title) {
                this.titleSize = ej2_svg_base_1.measureText(this.title, this.titleStyle);
                titleSize = this.titleSize.height + innerPadding;
                if (this.rect.width || this.rect.height) {
                    var length_1 = isHorizontal ? this.rect.width : this.rect.height;
                    this.titleCollection = helper_1.getTitle(this.title, this.titleStyle, length_1);
                    titleSize = (titleSize * this.titleCollection.length);
                }
            }
            if (this.labelPosition === 'Inside') {
                return titleSize + innerPadding;
            }
            var diff;
            var value;
            var labelSize = titleSize + innerPadding + this.titlePadding + this.labelPadding +
                ((this.orientation === 'Vertical') ? this.maxLabelSize.width : this.maxLabelSize.height) + this.multiLevelLabelHeight;
            if (crossAxis && this.placeNextToAxisLine) {
                var range = crossAxis.visibleRange;
                var size = (crossAxis.orientation === 'Horizontal') ? crossAxis.rect.width : crossAxis.rect.height;
                if (!range || !size) {
                    return 0;
                }
                else if (this.isInside(range)) {
                    value = this.findDifference(crossAxis);
                    diff = (value) * (size / range.delta);
                    diff = (value) * ((size - (diff < labelSize ? (labelSize - diff) : 0)) / range.delta);
                    labelSize = (diff < labelSize) ? (labelSize - diff) : 0;
                }
            }
            return labelSize;
        };
        Axis.prototype.updateCrossValue = function () {
            var value = this.crossAt;
            if (value === null || !this.isInside(this.crossInAxis.visibleRange)) {
                this.updatedRect = this.rect;
                return null;
            }
            var range = this.crossInAxis.visibleRange;
            if (!this.isAxisOpposedPosition) {
                if (this.crossAt > range.max) {
                    value = range.max;
                }
            }
            else {
                if (this.crossAt < range.min) {
                    value = range.min;
                }
            }
            this.updatedRect = ej2_base_1.extend({}, this.rect, null, true);
            if (this.orientation === 'Horizontal') {
                value = this.crossInAxis.rect.height - (helper_1.valueToCoefficient(value, this.crossInAxis) * this.crossInAxis.rect.height);
                this.updatedRect.y = this.crossInAxis.rect.y + value;
            }
            else {
                value = helper_1.valueToCoefficient(value, this.crossInAxis) * this.crossInAxis.rect.width;
                this.updatedRect.x = this.crossInAxis.rect.x + value;
            }
        };
        Axis.prototype.findDifference = function (crossAxis) {
            var value = 0;
            if (this.isAxisOpposedPosition) {
                value = crossAxis.isAxisInverse ? crossAxis.visibleRange.min : crossAxis.visibleRange.max;
            }
            else {
                value = crossAxis.isAxisInverse ? crossAxis.visibleRange.max : crossAxis.visibleRange.min;
            }
            return Math.abs(this.crossAt - value);
        };
        Axis.prototype.calculateVisibleRangeOnZooming = function (size) {
            if (helper_1.isZoomSet(this)) {
                var baseRange = this.actualRange;
                var start = void 0;
                var end = void 0;
                if (!this.isAxisInverse) {
                    start = this.actualRange.min + this.zoomPosition * this.actualRange.delta;
                    end = start + this.zoomFactor * this.actualRange.delta;
                }
                else {
                    start = this.actualRange.max - (this.zoomPosition * this.actualRange.delta);
                    end = start - (this.zoomFactor * this.actualRange.delta);
                }
                if (start < baseRange.min) {
                    end = end + (baseRange.min - start);
                    start = baseRange.min;
                }
                if (end > baseRange.max) {
                    start = start - (end - baseRange.max);
                    end = baseRange.max;
                }
                this.doubleRange = new double_range_1.DoubleRange(start, end);
                this.visibleRange = { min: this.doubleRange.start, max: this.doubleRange.end,
                    delta: this.doubleRange.delta, interval: this.visibleRange.interval };
            }
        };
        Axis.prototype.calculateAxisRange = function (size, chart) {
            if (chart.enableAutoIntervalOnBothAxis) {
                if (this.orientation === 'Horizontal' && chart.zoomSettings.mode === 'X') {
                    for (var i = 0; i < this.series.length; i++) {
                        var yValue = [];
                        for (var _i = 0, _a = this.series[i].visiblePoints; _i < _a.length; _i++) {
                            var points = _a[_i];
                            if ((points.xValue > this.visibleRange.min) && (points.xValue < this.visibleRange.max)) {
                                yValue.push(points.yValue);
                            }
                        }
                        for (var _b = 0, _c = chart.axisCollections; _b < _c.length; _b++) {
                            var axis = _c[_b];
                            if (axis.orientation === 'Vertical' && !ej2_base_2.isNullOrUndefined(axis.series[i])) {
                                axis.series[i].yMin = Math.min.apply(Math, yValue);
                                axis.series[i].yMax = Math.max.apply(Math, yValue);
                                axis.baseModule.calculateRangeAndInterval(size, axis);
                            }
                        }
                    }
                }
                if (this.orientation === 'Vertical' && chart.zoomSettings.mode === 'Y') {
                    for (var i = 0; i < this.series.length; i++) {
                        var xValue = [];
                        for (var _d = 0, _e = this.series[i].visiblePoints; _d < _e.length; _d++) {
                            var points = _e[_d];
                            if ((points.yValue > this.visibleRange.min) && (points.yValue < this.visibleRange.max)) {
                                xValue.push(points.xValue);
                            }
                        }
                        for (var _f = 0, _g = chart.axisCollections; _f < _g.length; _f++) {
                            var axis = _g[_f];
                            if (axis.orientation === 'Horizontal' && !ej2_base_2.isNullOrUndefined(axis.series[i])) {
                                axis.series[i].xMin = Math.min.apply(Math, xValue);
                                axis.series[i].xMax = Math.max.apply(Math, xValue);
                                axis.baseModule.calculateRangeAndInterval(size, axis);
                            }
                        }
                    }
                }
            }
        };
        Axis.prototype.triggerRangeRender = function (chart, minimum, maximum, interval) {
            var argsData = {
                cancel: false, name: constants_1.axisRangeCalculated, axis: this,
                minimum: minimum, maximum: maximum, interval: interval
            };
            chart.trigger(constants_1.axisRangeCalculated, argsData);
            if (!argsData.cancel) {
                this.visibleRange = { min: argsData.minimum, max: argsData.maximum, interval: argsData.interval,
                    delta: argsData.maximum - argsData.minimum };
            }
        };
        Axis.prototype.getRangePadding = function (chart) {
            var padding = this.rangePadding;
            if (padding !== 'Auto') {
                return padding;
            }
            switch (this.orientation) {
                case 'Horizontal':
                    if (chart.requireInvertedAxis) {
                        padding = (this.isStack100 || this.baseModule.chart.stockChart ? 'Round' : 'Normal');
                    }
                    else {
                        padding = 'None';
                    }
                    break;
                case 'Vertical':
                    if (!chart.requireInvertedAxis) {
                        padding = (this.isStack100 || this.baseModule.chart.stockChart ? 'Round' : 'Normal');
                    }
                    else {
                        padding = 'None';
                    }
                    break;
            }
            return padding;
        };
        Axis.prototype.getMaxLabelWidth = function (chart) {
            var pointX;
            var previousEnd = 0;
            var isIntersect = false;
            var isAxisLabelBreak;
            this.angle = this.labelRotation;
            this.maxLabelSize = new ej2_svg_base_1.Size(0, 0);
            var action = this.labelIntersectAction;
            var label;
            for (var i = 0, len = this.visibleLabels.length; i < len; i++) {
                label = this.visibleLabels[i];
                isAxisLabelBreak = helper_1.isBreakLabel(label.originalText);
                if (isAxisLabelBreak) {
                    label.size = ej2_svg_base_1.measureText(label.originalText.replace(/<br>/g, ' '), this.labelStyle);
                    label.breakLabelSize = ej2_svg_base_1.measureText(this.enableTrim ? label.text.join('<br>') : label.originalText, this.labelStyle);
                }
                else {
                    label.size = ej2_svg_base_1.measureText(label.text, this.labelStyle);
                }
                var width = isAxisLabelBreak ? label.breakLabelSize.width : label.size.width;
                if (width > this.maxLabelSize.width) {
                    this.maxLabelSize.width = width;
                    this.rotatedLabel = label.text;
                }
                var height = isAxisLabelBreak ? label.breakLabelSize.height : label.size.height;
                if (height > this.maxLabelSize.height) {
                    this.maxLabelSize.height = height;
                }
                if (isAxisLabelBreak) {
                    label.text = this.enableTrim ? label.text : label.originalText.split('<br>');
                }
                if (action === 'None' || action === 'Hide' || action === 'Trim') {
                    continue;
                }
                if ((action !== 'None' || this.angle % 360 === 0) && this.orientation === 'Horizontal' &&
                    this.rect.width > 0 && !isIntersect) {
                    var width1 = isAxisLabelBreak ? label.breakLabelSize.width : label.size.width;
                    pointX = (helper_1.valueToCoefficient(label.value, this) * this.rect.width) + this.rect.x;
                    pointX -= width1 / 2;
                    if (this.edgeLabelPlacement === 'Shift') {
                        if (i === 0 && pointX < this.rect.x) {
                            pointX = this.rect.x;
                        }
                        if (i === this.visibleLabels.length - 1 && ((pointX + width1) > (this.rect.x + this.rect.width))) {
                            pointX = this.rect.x + this.rect.width - width1;
                        }
                    }
                    switch (action) {
                        case 'MultipleRows':
                            if (i > 0) {
                                this.findMultiRows(i, pointX, label, isAxisLabelBreak);
                            }
                            break;
                        case 'Rotate45':
                        case 'Rotate90':
                            if (i > 0 && (!this.isAxisInverse ? pointX <= previousEnd : pointX + width1 >= previousEnd)) {
                                this.angle = (action === 'Rotate45') ? 45 : 90;
                                isIntersect = true;
                            }
                            break;
                        default:
                            if (isAxisLabelBreak) {
                                var result = void 0;
                                var result1 = [];
                                var str = void 0;
                                for (var index = 0; index < label.text.length; index++) {
                                    result = helper_2.textWrap(label.text[index], this.rect.width / this.visibleLabels.length, this.labelStyle);
                                    if (result.length > 1) {
                                        for (var j = 0; j < result.length; j++) {
                                            str = result[j];
                                            result1.push(str);
                                        }
                                    }
                                    else {
                                        result1.push(result[0]);
                                    }
                                }
                                label.text = result1;
                            }
                            else {
                                label.text = helper_2.textWrap(label.text, this.rect.width / this.visibleLabels.length, this.labelStyle);
                            }
                            var height_1 = (label.size.height * label.text.length);
                            if (height_1 > this.maxLabelSize.height) {
                                this.maxLabelSize.height = height_1;
                            }
                            break;
                    }
                    previousEnd = this.isAxisInverse ? pointX : pointX + width1;
                }
            }
            if (this.angle !== 0 && this.orientation === 'Horizontal') {
                this.rotatedLabel = ej2_base_2.isNullOrUndefined(this.rotatedLabel) ? '' : this.rotatedLabel;
                var isHorizontalAngle = this.angle === -360 || this.angle === 0 || this.angle === -180 ||
                    this.angle === 180 || this.angle === 360;
                if (this.labelPosition === 'Outside' && !isHorizontalAngle && helper_1.isBreakLabel(this.rotatedLabel)) {
                    this.maxLabelSize = new ej2_svg_base_1.Size(this.maxLabelSize.height, this.maxLabelSize.width);
                }
                else {
                    this.maxLabelSize = helper_1.rotateTextSize(this.labelStyle, this.rotatedLabel, this.angle, chart);
                }
            }
            else if (this.angle !== 0 && this.orientation === 'Vertical') {
                this.rotatedLabel = ej2_base_2.isNullOrUndefined(this.rotatedLabel) ? '' : this.rotatedLabel;
                var isHorizontalAngle = this.angle === -360 || this.angle === 0 || this.angle === -180 ||
                    this.angle === 180 || this.angle === 360;
                if (this.labelPosition === 'Outside' && !isHorizontalAngle && helper_1.isBreakLabel(this.rotatedLabel)) {
                    this.maxLabelSize = new ej2_svg_base_1.Size(this.maxLabelSize.height, this.maxLabelSize.width);
                }
                else {
                    this.maxLabelSize = helper_1.rotateTextSize(this.labelStyle, this.rotatedLabel, this.angle, chart);
                }
            }
            if (chart.multiLevelLabelModule && this.multiLevelLabels.length > 0) {
                chart.multiLevelLabelModule.getMultilevelLabelsHeight(this);
            }
        };
        Axis.prototype.findMultiRows = function (length, currentX, currentLabel, isBreakLabels) {
            var label;
            var pointX;
            var width2;
            var store = [];
            var isMultiRows;
            for (var i = length - 1; i >= 0; i--) {
                label = this.visibleLabels[i];
                width2 = isBreakLabels ? label.breakLabelSize.width : label.size.width;
                pointX = (helper_1.valueToCoefficient(label.value, this) * this.rect.width) + this.rect.x;
                isMultiRows = !this.isAxisInverse ? currentX < (pointX + width2 * 0.5) :
                    currentX + currentLabel.size.width > (pointX - width2 * 0.5);
                if (isMultiRows) {
                    store.push(label.index);
                    currentLabel.index = (currentLabel.index > label.index) ? currentLabel.index : label.index + 1;
                }
                else {
                    currentLabel.index = store.indexOf(label.index) > -1 ? currentLabel.index : label.index;
                }
            }
            var height = ((isBreakLabels ? currentLabel.breakLabelSize.height : currentLabel.size.height) * currentLabel.index) +
                (5 * (currentLabel.index - 1));
            if (height > this.maxLabelSize.height) {
                this.maxLabelSize.height = height;
            }
        };
        Axis.prototype.getModule = function (chart) {
            if (this.valueType === 'Double') {
                this.baseModule = new double_axis_1.Double(chart);
            }
            else {
                this.baseModule = chart[helper_1.firstToLowerCase(this.valueType) + 'Module'];
            }
        };
        Axis.prototype.setIsInversedAndOpposedPosition = function (isPolar) {
            if (isPolar === void 0) { isPolar = false; }
            this.isAxisOpposedPosition = this.opposedPosition || (!isPolar && this.isRTLEnabled && this.orientation == 'Vertical');
            this.isAxisInverse = this.isInversed || (this.isRTLEnabled && this.orientation == 'Horizontal');
        };
        return Axis;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Complex(theme_1.Theme.axisLabelFont, base_1.Font)
    ], Axis.prototype, "labelStyle", void 0);
    __decorate([
        ej2_base_1.Complex({}, CrosshairTooltip)
    ], Axis.prototype, "crosshairTooltip", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], Axis.prototype, "title", void 0);
    __decorate([
        ej2_base_1.Complex(theme_1.Theme.axisTitleFont, base_1.Font)
    ], Axis.prototype, "titleStyle", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], Axis.prototype, "labelFormat", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], Axis.prototype, "skeleton", void 0);
    __decorate([
        ej2_base_1.Property('DateTime')
    ], Axis.prototype, "skeletonType", void 0);
    __decorate([
        ej2_base_1.Property('Center')
    ], Axis.prototype, "lineBreakAlignment", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], Axis.prototype, "plotOffset", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Axis.prototype, "plotOffsetLeft", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Axis.prototype, "plotOffsetTop", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Axis.prototype, "plotOffsetRight", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Axis.prototype, "plotOffsetBottom", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], Axis.prototype, "isIndexed", void 0);
    __decorate([
        ej2_base_1.Property(10)
    ], Axis.prototype, "logBase", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], Axis.prototype, "columnIndex", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], Axis.prototype, "rowIndex", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], Axis.prototype, "span", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Axis.prototype, "desiredIntervals", void 0);
    __decorate([
        ej2_base_1.Property(3)
    ], Axis.prototype, "maximumLabels", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], Axis.prototype, "zoomFactor", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], Axis.prototype, "zoomPosition", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], Axis.prototype, "enableScrollbarOnZooming", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], Axis.prototype, "opposedPosition", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], Axis.prototype, "enableAutoIntervalOnZooming", void 0);
    __decorate([
        ej2_base_1.Property('Auto')
    ], Axis.prototype, "rangePadding", void 0);
    __decorate([
        ej2_base_1.Property('Double')
    ], Axis.prototype, "valueType", void 0);
    __decorate([
        ej2_base_1.Property('None')
    ], Axis.prototype, "edgeLabelPlacement", void 0);
    __decorate([
        ej2_base_1.Property('Auto')
    ], Axis.prototype, "intervalType", void 0);
    __decorate([
        ej2_base_1.Property('BetweenTicks')
    ], Axis.prototype, "labelPlacement", void 0);
    __decorate([
        ej2_base_1.Property('Outside')
    ], Axis.prototype, "tickPosition", void 0);
    __decorate([
        ej2_base_1.Property('Outside')
    ], Axis.prototype, "labelPosition", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], Axis.prototype, "name", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], Axis.prototype, "visible", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], Axis.prototype, "minorTicksPerInterval", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], Axis.prototype, "labelRotation", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Axis.prototype, "crossesAt", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], Axis.prototype, "placeNextToAxisLine", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Axis.prototype, "crossesInAxis", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Axis.prototype, "minimum", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Axis.prototype, "maximum", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Axis.prototype, "interval", void 0);
    __decorate([
        ej2_base_1.Property(34)
    ], Axis.prototype, "maximumLabelWidth", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], Axis.prototype, "enableTrim", void 0);
    __decorate([
        ej2_base_1.Property(5)
    ], Axis.prototype, "labelPadding", void 0);
    __decorate([
        ej2_base_1.Property(5)
    ], Axis.prototype, "titlePadding", void 0);
    __decorate([
        ej2_base_1.Complex({}, MajorTickLines)
    ], Axis.prototype, "majorTickLines", void 0);
    __decorate([
        ej2_base_1.Complex({}, MinorTickLines)
    ], Axis.prototype, "minorTickLines", void 0);
    __decorate([
        ej2_base_1.Complex({}, MajorGridLines)
    ], Axis.prototype, "majorGridLines", void 0);
    __decorate([
        ej2_base_1.Complex({}, MinorGridLines)
    ], Axis.prototype, "minorGridLines", void 0);
    __decorate([
        ej2_base_1.Complex({}, AxisLine)
    ], Axis.prototype, "lineStyle", void 0);
    __decorate([
        ej2_base_1.Property('Trim')
    ], Axis.prototype, "labelIntersectAction", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], Axis.prototype, "isInversed", void 0);
    __decorate([
        ej2_base_1.Property(100)
    ], Axis.prototype, "coefficient", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], Axis.prototype, "startAngle", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], Axis.prototype, "startFromZero", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Axis.prototype, "description", void 0);
    __decorate([
        ej2_base_1.Property(2)
    ], Axis.prototype, "tabIndex", void 0);
    __decorate([
        ej2_base_1.Collection([], chart_base_1.StripLineSettings)
    ], Axis.prototype, "stripLines", void 0);
    __decorate([
        ej2_base_1.Collection([], chart_base_1.MultiLevelLabels)
    ], Axis.prototype, "multiLevelLabels", void 0);
    __decorate([
        ej2_base_1.Complex({ color: null, width: 0, type: 'Rectangle' }, chart_base_1.LabelBorder)
    ], Axis.prototype, "border", void 0);
    __decorate([
        ej2_base_1.Complex({}, chart_base_1.ScrollbarSettings)
    ], Axis.prototype, "scrollbarSettings", void 0);
    exports.Axis = Axis;
    var VisibleLabels = (function () {
        function VisibleLabels(text, value, labelStyle, originalText, size, breakLabelSize, index) {
            if (size === void 0) { size = new ej2_svg_base_1.Size(0, 0); }
            if (breakLabelSize === void 0) { breakLabelSize = new ej2_svg_base_1.Size(0, 0); }
            if (index === void 0) { index = 1; }
            this.text = text;
            this.originalText = originalText;
            this.value = value;
            this.labelStyle = labelStyle;
            this.size = size;
            this.breakLabelSize = breakLabelSize;
            this.index = index;
        }
        return VisibleLabels;
    }());
    exports.VisibleLabels = VisibleLabels;
});
