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
define(["require", "exports", "../../common/utils/helper", "@syncfusion/ej2-svg-base", "../../chart/axis/date-time-axis", "../../chart/axis/axis"], function (require, exports, helper_1, ej2_svg_base_1, date_time_axis_1, axis_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RangeNavigatorAxis = (function (_super) {
        __extends(RangeNavigatorAxis, _super);
        function RangeNavigatorAxis(range) {
            var _this = _super.call(this) || this;
            _this.firstLevelLabels = [];
            _this.secondLevelLabels = [];
            _this.rangeNavigator = range;
            return _this;
        }
        RangeNavigatorAxis.prototype.renderGridLines = function () {
            var pointX = 0;
            var control = this.rangeNavigator;
            var majorGridLines = control.majorGridLines;
            var majorTickLines = control.majorTickLines;
            var majorGrid = '';
            var majorTick = '';
            var rect = control.bounds;
            var chartAxis = control.chartSeries.xAxis;
            var disabledColor = (control.disableRangeSelector) ? 'transparent' : null;
            this.gridLines = control.renderer.createGroup({ id: control.element.id + '_GridLines' });
            var tick = (control.tickPosition === 'Outside' || control.series.length === 0) ?
                rect.y + rect.height + majorTickLines.height : rect.y + rect.height - majorTickLines.height;
            this.firstLevelLabels = [];
            chartAxis.labelStyle = control.labelStyle;
            chartAxis.skeleton = control.skeleton;
            chartAxis.skeletonType = control.skeletonType;
            chartAxis.isChart = false;
            if (control.valueType === 'DateTime') {
                this.calculateDateTimeNiceInterval(chartAxis, rect, chartAxis.doubleRange.start, chartAxis.doubleRange.end, chartAxis.isChart);
                this.actualIntervalType = chartAxis.actualIntervalType;
                this.findAxisLabels(chartAxis);
            }
            this.firstLevelLabels = chartAxis.visibleLabels;
            this.lowerValues = [];
            var labelLength = chartAxis.visibleLabels.length;
            for (var i = 0; i < labelLength; i++) {
                this.lowerValues.push(this.firstLevelLabels[i].value);
                pointX = (helper_1.valueToCoefficient(this.firstLevelLabels[i].value, chartAxis) * rect.width) + rect.x;
                if (pointX >= rect.x && (rect.x + rect.width) >= pointX) {
                    majorGrid = majorGrid.concat('M ' + pointX + ' ' + (control.bounds.y + control.bounds.height) +
                        ' L ' + pointX + ' ' + control.bounds.y + ' ');
                    majorTick = majorTick.concat('M ' + (pointX) + ' ' + (rect.y + rect.height) +
                        ' L ' + (pointX) + ' ' + tick + ' ');
                }
            }
            var options = new ej2_svg_base_1.PathOption(control.element.id + '_MajorGridLine', 'transparent', majorGridLines.width, control.series.length ? disabledColor || majorGridLines.color || control.themeStyle.gridLineColor : 'transparent', 1, majorGridLines.dashArray, majorGrid);
            this.gridLines.appendChild(control.renderer.drawPath(options));
            options = new ej2_svg_base_1.PathOption(control.element.id + '_MajorTickLine', 'transparent', majorTickLines.width, disabledColor || majorTickLines.color || control.themeStyle.gridLineColor, 1, majorGridLines.dashArray, majorTick);
            this.gridLines.appendChild(control.renderer.drawPath(options));
        };
        RangeNavigatorAxis.prototype.renderAxisLabels = function () {
            var axis = this.rangeNavigator.chartSeries.xAxis;
            var control = this.rangeNavigator;
            var pointY;
            var labelElement = control.renderer.createGroup({ id: control.element.id + '_AxisLabels' });
            var firstLevelElement = control.renderer.createGroup({ id: control.element.id + '_FirstLevelAxisLabels' });
            var secondLevelElement = control.renderer.createGroup({ id: control.element.id + '_SecondLevelAxisLabels' });
            var secondaryAxis = axis;
            pointY = this.findLabelY(control, false);
            this.placeAxisLabels(axis, pointY, '_AxisLabel_', control, firstLevelElement);
            secondaryAxis.intervalType = secondaryAxis.actualIntervalType = (control.groupBy ||
                this.getSecondaryLabelType(axis.actualIntervalType));
            secondaryAxis.labelFormat = '';
            if (control.enableGrouping && control.valueType === 'DateTime' && this.actualIntervalType !== 'Years') {
                secondaryAxis.visibleRange.interval = 1;
                secondaryAxis.visibleLabels = [];
                this.findAxisLabels(secondaryAxis);
                this.secondLevelLabels = secondaryAxis.visibleLabels;
                pointY = this.findLabelY(control, true);
                var border = this.placeAxisLabels(secondaryAxis, pointY, '_SecondaryLabel_', control, secondLevelElement);
                var path = new ej2_svg_base_1.PathOption(control.element.id + '_SecondaryMajorLines', 'transparent', control.majorTickLines.width, control.majorTickLines.color || control.themeStyle.gridLineColor, 1, control.majorGridLines.dashArray, border);
                this.gridLines.appendChild(control.renderer.drawPath(path));
            }
            control.chartSeries.xAxis.visibleLabels = control.chartSeries.xAxis.visibleLabels.concat(secondaryAxis.visibleLabels);
            labelElement.style.cursor = axis.valueType === 'DateTime' ? 'cursor: pointer' : 'cursor: default';
            labelElement.appendChild(firstLevelElement);
            labelElement.appendChild(secondLevelElement);
            control.svgObject.appendChild(this.gridLines);
            control.svgObject.appendChild(labelElement);
        };
        RangeNavigatorAxis.prototype.getSecondaryLabelType = function (type) {
            var types = ['Years', 'Quarter', 'Months', 'Weeks', 'Days', 'Hours', 'Minutes', 'Seconds'];
            return (type === 'Years' ? 'Years' : types[types.indexOf(type) - 1]);
        };
        RangeNavigatorAxis.prototype.findAxisLabels = function (axis) {
            axis.visibleLabels = [];
            var start = new Date(axis.visibleRange.min);
            var nextInterval;
            var text;
            var interval = this.rangeNavigator.interval ? this.rangeNavigator.interval : 1;
            switch (axis.actualIntervalType) {
                case 'Years':
                    start = new Date(start.getFullYear(), 0, 1);
                    break;
                case 'Quarter':
                    if (start.getMonth() <= 2) {
                        start = new Date(start.getFullYear(), 0, 1);
                    }
                    else if (start.getMonth() <= 5) {
                        start = new Date(start.getFullYear(), 3, 1);
                    }
                    else if (start.getMonth() <= 8) {
                        start = new Date(start.getFullYear(), 6, 1);
                    }
                    else {
                        start = new Date(start.getFullYear(), 9, 1);
                    }
                    break;
                case 'Months':
                    start = new Date(start.getFullYear(), start.getMonth());
                    break;
                case 'Weeks':
                    start = new Date(start.getFullYear(), start.getMonth(), start.getDate() - start.getDay());
                    break;
                case 'Days':
                    start = new Date(start.getFullYear(), start.getMonth(), start.getDate());
                    break;
                case 'Hours':
                    start = new Date(start.getFullYear(), start.getMonth(), start.getDate(), start.getHours());
                    break;
                case 'Minutes':
                    start = new Date(start.getFullYear(), start.getMonth(), start.getDate(), start.getHours(), start.getMinutes());
                    break;
                case 'Seconds':
                    start = new Date(start.getFullYear(), start.getMonth(), start.getDate(), start.getHours(), start.getMinutes(), start.getSeconds());
                    break;
            }
            nextInterval = start.getTime();
            this.rangeNavigator.format = this.rangeNavigator.intl.getDateFormat({
                format: axis.labelFormat || '',
                type: helper_1.firstToLowerCase(axis.skeletonType), skeleton: this.getSkeleton(axis, null, null)
            });
            while (nextInterval <= axis.visibleRange.max) {
                text = this.dateFormats(this.rangeNavigator.format(new Date(nextInterval)), axis, axis.visibleLabels.length);
                axis.visibleLabels.push(new axis_1.VisibleLabels(text, nextInterval, this.rangeNavigator.labelStyle, text));
                nextInterval = this.increaseDateTimeInterval(axis, nextInterval, interval).getTime();
            }
        };
        RangeNavigatorAxis.prototype.dateFormats = function (text, axis, index) {
            var changedText = text;
            var isFirstLevel = this.rangeNavigator.enableGrouping && this.firstLevelLabels.length === 0;
            switch (axis.actualIntervalType) {
                case 'Quarter':
                    if (text.indexOf('Jan') > -1) {
                        changedText = !isFirstLevel ? text.replace('Jan', 'Quarter1') : 'Quarter1';
                    }
                    else if (text.indexOf('Apr') > -1) {
                        changedText = !isFirstLevel ? text.replace('Apr', 'Quarter2') : 'Quarter2';
                    }
                    else if (text.indexOf('Jul') > -1) {
                        changedText = !isFirstLevel ? text.replace('Jul', 'Quarter3') : 'Quarter3';
                    }
                    else if (text.indexOf('Oct') > -1) {
                        changedText = !isFirstLevel ? text.replace('Oct', 'Quarter4') : 'Quarter4';
                    }
                    break;
                case 'Weeks':
                    changedText = 'Week' + ++index;
                    break;
                default:
                    changedText = text;
                    break;
            }
            return changedText;
        };
        RangeNavigatorAxis.prototype.findLabelY = function (control, isSecondary) {
            var pointY;
            var reference = control.bounds.y + control.bounds.height;
            var tickHeight = control.majorTickLines.height;
            var textHeight = ej2_svg_base_1.measureText('Quarter1 2011', control.labelStyle).height;
            var padding = 8;
            if ((control.labelPosition === 'Outside' && control.tickPosition === 'Outside') || control.series.length === 0) {
                pointY = reference + tickHeight + padding + textHeight * 0.75;
            }
            else if (control.labelPosition === 'Inside' && control.tickPosition === 'Inside') {
                pointY = reference - tickHeight - padding;
            }
            else if (control.labelPosition === 'Inside' && control.tickPosition === 'Outside') {
                pointY = reference - padding;
            }
            else {
                pointY = reference + padding + (textHeight * 0.75);
            }
            if (isSecondary) {
                padding = 15;
                if (control.labelPosition === 'Outside' || control.series.length === 0) {
                    pointY += padding + textHeight * 0.75;
                }
                else {
                    pointY = (control.tickPosition === 'Outside' || control.series.length === 0) ?
                        reference + tickHeight + padding + textHeight * 0.75 : reference + padding + textHeight * 0.75;
                }
            }
            return pointY;
        };
        RangeNavigatorAxis.prototype.placeAxisLabels = function (axis, pointY, id, control, labelElement) {
            var maxLabels = axis.visibleLabels.length;
            var label;
            var prevLabel;
            var pointX;
            var rect = control.bounds;
            var border = '';
            var pointXGrid;
            var disabledColor = (control.disableRangeSelector) ? 'transparent' : null;
            var prevX = control.enableRtl ? (rect.x + rect.width) : rect.x;
            var intervalType = axis.actualIntervalType;
            var intervalInTime = control.valueType === 'DateTime' ?
                maxLabels > 1 ? (axis.visibleLabels[1].value - axis.visibleLabels[0].value) :
                    (axis.visibleRange.max - axis.visibleLabels[0].value) / 2 : 0;
            if (control.valueType === 'DateTime' && (intervalType === 'Quarter' || intervalType === 'Weeks')) {
                this.findSuitableFormat(axis, control);
            }
            for (var i = 0, len = maxLabels; i < len; i++) {
                label = axis.visibleLabels[i];
                label.size = ej2_svg_base_1.measureText(label.text, axis.labelStyle);
                if (control.secondaryLabelAlignment === 'Middle') {
                    pointX = (helper_1.valueToCoefficient((label.value + intervalInTime / 2), axis) * rect.width) + rect.x;
                }
                else if ((id.indexOf('Secondary') > -1)) {
                    pointX = this.findAlignment(axis, i);
                }
                pointXGrid = (helper_1.valueToCoefficient((label.value), axis) * rect.width) + rect.x;
                if ((i === 0 || (i === axis.visibleLabels.length - 1 && control.enableRtl)) && pointX < rect.x) {
                    pointX = rect.x + label.size.width / 2;
                }
                if ((i === axis.visibleLabels.length - 1 || (i === 0 && control.enableRtl)) &&
                    ((pointX + label.size.width) > (rect.x + rect.width))) {
                    pointX = rect.x + rect.width - label.size.width / 2;
                }
                if (id.indexOf('_SecondaryLabel_') > -1) {
                    if (pointX >= rect.x && (rect.x + rect.width) >= pointX) {
                        border = border.concat('M ' + pointXGrid + ' ' + pointY +
                            ' L ' + pointXGrid + ' ' + (pointY - label.size.height));
                    }
                }
                if (control.labelIntersectAction === 'Hide' &&
                    i !== 0 && this.isIntersect(axis, pointX, label.size.width, prevX, prevLabel.size.width)) {
                    continue;
                }
                if (control.secondaryLabelAlignment === 'Middle' && axis.visibleLabels.length === 1) {
                    pointX = helper_1.valueToCoefficient(label.value, axis) + (rect.x + (rect.width / 2));
                }
                var labelStyle = control.labelStyle;
                var style = {
                    size: labelStyle.size, color: disabledColor || labelStyle.color || control.themeStyle.labelFontColor,
                    fontFamily: labelStyle.fontFamily,
                    fontStyle: labelStyle.fontStyle || control.labelStyle.fontStyle,
                    fontWeight: labelStyle.fontWeight || control.labelStyle.fontWeight,
                    opacity: labelStyle.opacity || control.labelStyle.opacity,
                    textAlignment: labelStyle.textAlignment || control.labelStyle.textAlignment,
                    textOverflow: labelStyle.textOverflow || control.labelStyle.textOverflow
                };
                var argsData = {
                    cancel: false, name: 'labelRender',
                    text: label.text, value: label.value, labelStyle: style,
                    region: new ej2_svg_base_1.Rect(pointX, pointY, label.size.width, label.size.height)
                };
                control.trigger('labelRender', argsData);
                if (!argsData.cancel) {
                    control.labels.push(argsData);
                }
                else {
                    continue;
                }
                helper_1.textElement(this.rangeNavigator.renderer, new ej2_svg_base_1.TextOption(this.rangeNavigator.element.id + id + i, pointX, pointY, 'middle', argsData.text), argsData.labelStyle, argsData.labelStyle.color || control.themeStyle.labelFontColor, labelElement).style.cursor = axis.valueType === 'DateTime' ? 'cursor: pointer' : 'cursor: default';
                prevX = pointX;
                prevLabel = label;
            }
            return border;
        };
        RangeNavigatorAxis.prototype.isIntersect = function (axis, currentX, currentWidth, prevX, prevWidth) {
            return (axis.isInversed) ? (currentX + currentWidth / 2 > prevX - prevWidth / 2) :
                (currentX - currentWidth / 2 < prevX + prevWidth / 2);
        };
        RangeNavigatorAxis.prototype.findSuitableFormat = function (axis, control) {
            var labels = axis.visibleLabels;
            var labelLength = labels.length;
            var bounds = control.bounds;
            var prevX;
            var currentX;
            var interval = control.valueType === 'DateTime' ?
                labelLength > 1 ? (labels[1].value - labels[0].value) : axis.visibleRange.interval
                : 0;
            for (var i = 0; i < labelLength; i++) {
                currentX = (helper_1.valueToCoefficient((labels[i].value + interval / 2), axis) * bounds.width) + bounds.x;
                labels[i].size = ej2_svg_base_1.measureText(labels[i].text, axis.labelStyle);
                if (i === 0 && currentX < bounds.x) {
                    currentX = bounds.x + labels[i].size.width / 2;
                }
                if (axis.actualIntervalType === 'Quarter') {
                    if (i !== 0) {
                        if ((labels[i].text.indexOf('Quarter') > -1) &&
                            (this.isIntersect(axis, currentX, labels[i].size.width, prevX, labels[i - 1].size.width))) {
                            labels.every(function (label) {
                                label.text = label.text.toString().replace('Quarter', 'QTR');
                                return true;
                            });
                            axis.visibleLabels = labels;
                            this.findSuitableFormat(axis, control);
                        }
                        else {
                            if (this.isIntersect(axis, currentX, labels[i].size.width, prevX, labels[i - 1].size.width)) {
                                labels.every(function (label) {
                                    label.text = label.text.toString().replace('QTR', 'Q');
                                    return true;
                                });
                                axis.visibleLabels = labels;
                            }
                        }
                    }
                }
                else if (axis.actualIntervalType === 'Weeks') {
                    if ((i !== 0) && ((labels[i].text.indexOf('Week') > -1) &&
                        (this.isIntersect(axis, currentX, labels[i].size.width, prevX, labels[i - 1].size.width)))) {
                        labels.every(function (label) {
                            label.text = label.text.toString().replace('Week', 'W');
                            return true;
                        });
                        axis.visibleLabels = labels;
                    }
                }
                prevX = currentX;
            }
        };
        RangeNavigatorAxis.prototype.findAlignment = function (axis, index) {
            var label = axis.visibleLabels[index];
            var nextLabel = axis.visibleLabels[index + 1];
            var bounds = this.rangeNavigator.bounds;
            return (this.rangeNavigator.secondaryLabelAlignment === 'Near' ?
                (helper_1.valueToCoefficient((label.value), axis) * bounds.width) + bounds.x + label.size.width / 2 :
                (helper_1.valueToCoefficient((nextLabel ? nextLabel.value : axis.visibleRange.max), axis) * bounds.width) + bounds.x - label.size.width);
        };
        return RangeNavigatorAxis;
    }(date_time_axis_1.DateTime));
    exports.RangeNavigatorAxis = RangeNavigatorAxis;
});
