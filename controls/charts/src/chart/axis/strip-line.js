define(["require", "exports", "@syncfusion/ej2-base", "../../common/utils/helper", "@syncfusion/ej2-svg-base", "@syncfusion/ej2-data"], function (require, exports, ej2_base_1, helper_1, ej2_svg_base_1, ej2_data_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StripLine = (function () {
        function StripLine() {
        }
        StripLine.prototype.measureStripLine = function (axis, stripline, seriesClipRect, startValue, segmentAxis, chart) {
            var actualStart;
            var actualEnd;
            var orientation = axis.orientation;
            var isDateTimeAxis = axis.valueType === 'DateTime';
            if (stripline.isRepeat && stripline.size !== null) {
                actualStart = startValue;
                actualEnd = null;
            }
            else {
                if (axis.valueType === 'DateTimeCategory') {
                    var start = stripline.start;
                    var end = stripline.end;
                    actualStart = (start != null && typeof start !== 'number') ?
                        axis.labels.indexOf(this.dateToMilliSeconds(start, chart).toString()) : start;
                    actualEnd = (end != null && typeof end !== 'number') ?
                        axis.labels.indexOf(this.dateToMilliSeconds(end, chart).toString()) : end;
                }
                else {
                    actualStart = stripline.start === null ? null : isDateTimeAxis && this.isCoreDate(stripline.start) ?
                        this.dateToMilliSeconds(stripline.start, chart) : +stripline.start;
                    actualEnd = stripline.end === null ? null : isDateTimeAxis && this.isCoreDate(stripline.start) ?
                        this.dateToMilliSeconds(stripline.end, chart) : +stripline.end;
                }
            }
            var rect = this.getFromTovalue(actualStart, actualEnd, stripline.size, stripline.startFromAxis, axis, stripline);
            var height = (orientation === 'Vertical') ? (rect.to - rect.from) * axis.rect.height : seriesClipRect.height;
            var width = (orientation === 'Horizontal') ? (rect.to - rect.from) * axis.rect.width : seriesClipRect.width;
            var x = (orientation === 'Vertical') ? seriesClipRect.x : ((rect.from * axis.rect.width) + axis.rect.x);
            var y = (orientation === 'Horizontal') ? seriesClipRect.y : (axis.rect.y + axis.rect.height -
                ((stripline.sizeType === 'Pixel' ? rect.from : rect.to) * axis.rect.height));
            if (stripline.isSegmented && stripline.segmentStart != null && stripline.segmentEnd != null && stripline.sizeType !== 'Pixel') {
                var start = isDateTimeAxis && this.isCoreDate(stripline.segmentStart) ?
                    this.dateToMilliSeconds(stripline.segmentStart, chart) : +stripline.segmentStart;
                var end = isDateTimeAxis && this.isCoreDate(stripline.segmentEnd) ?
                    this.dateToMilliSeconds(stripline.segmentEnd, chart) : +stripline.segmentEnd;
                var segRect = this.getFromTovalue(start, end, null, null, segmentAxis, stripline);
                if (segmentAxis.orientation === 'Vertical') {
                    y = (segmentAxis.rect.y + segmentAxis.rect.height -
                        (segRect.to * segmentAxis.rect.height));
                    height = (segRect.to - segRect.from) * segmentAxis.rect.height;
                }
                else {
                    x = ((segRect.from * segmentAxis.rect.width) + segmentAxis.rect.x);
                    width = (segRect.to - segRect.from) * segmentAxis.rect.width;
                }
            }
            if ((height !== 0 && width !== 0) || (stripline.sizeType === 'Pixel' && (stripline.start !== null || stripline.startFromAxis))) {
                return new ej2_svg_base_1.Rect(x, y, width, height);
            }
            return new ej2_svg_base_1.Rect(0, 0, 0, 0);
        };
        StripLine.prototype.getFromTovalue = function (start, end, size, startFromAxis, axis, stripline) {
            var from = (!stripline.isRepeat && startFromAxis) ? axis.visibleRange.min : start;
            var to = this.getToValue(Math.max(start, ej2_base_1.isNullOrUndefined(end) ? start : end), from, size, axis, end, stripline);
            from = this.findValue(from, axis);
            to = this.findValue(to, axis);
            return { from: helper_1.valueToCoefficient(axis.isAxisInverse ? to : from, axis), to: helper_1.valueToCoefficient(axis.isAxisInverse ? from : to, axis) };
        };
        StripLine.prototype.getToValue = function (to, from, size, axis, end, stripline) {
            var sizeType = stripline.sizeType;
            var isEnd = (end === null);
            if (axis.valueType === 'DateTime') {
                var fromValue = new Date(from);
                if (sizeType === 'Auto') {
                    sizeType = axis.actualIntervalType;
                    size *= axis.visibleRange.interval;
                }
                switch (sizeType) {
                    case 'Years':
                        return (isEnd ? new Date(fromValue.setFullYear(fromValue.getFullYear() + size)) : to);
                    case 'Months':
                        return (isEnd ? new Date(fromValue.setMonth(fromValue.getMonth() + size)) : to);
                    case 'Days':
                        return (isEnd ? new Date(fromValue.setDate(fromValue.getDate() + size)) : to);
                    case 'Hours':
                        return (isEnd ? new Date(fromValue.setHours(fromValue.getHours() + size)) : to);
                    case 'Minutes':
                        return (isEnd ? new Date(fromValue.setMinutes(fromValue.getMinutes() + size)) : to);
                    case 'Seconds':
                        return (isEnd ? new Date(fromValue.setSeconds(fromValue.getSeconds() + size)) : to);
                    default:
                        return from;
                }
            }
            else {
                return stripline.sizeType === 'Pixel' ? from : (isEnd ? (from + size) : to);
            }
        };
        StripLine.prototype.findValue = function (value, axis) {
            if (value < axis.visibleRange.min) {
                value = axis.visibleRange.min;
            }
            else if (value > axis.visibleRange.max) {
                value = axis.visibleRange.max;
            }
            return value;
        };
        StripLine.prototype.dateParse = function (value, chart) {
            var dateParser = chart.intl.getDateParser({ skeleton: 'full', type: 'dateTime' });
            var dateFormatter = chart.intl.getDateFormat({ skeleton: 'full', type: 'dateTime' });
            return new Date((Date.parse(dateParser(dateFormatter(new Date(ej2_data_1.DataUtil.parse.parseJson({ val: value }).val))))));
        };
        StripLine.prototype.renderStripLine = function (chart, position, axes) {
            var id = chart.element.id + '_stripline_' + position + '_';
            var seriesClipRect = chart.chartAxisLayoutPanel.seriesClipRect;
            var end = 0;
            var limit = 0;
            var startValue = 0;
            var segmentAxis = null;
            var range;
            var options = new helper_1.RectOption(id + 'ClipRect', 'transparent', { width: 1, color: 'Gray' }, 1, {
                x: chart.initialClipRect.x, y: chart.initialClipRect.y,
                width: chart.initialClipRect.width,
                height: chart.initialClipRect.height
            });
            var striplineGroup = chart.renderer.createGroup({
                id: id + 'collections',
                'clip-path': 'url(#' + id + 'ClipRect' + ')'
            });
            if (!chart.enableCanvas) {
                striplineGroup.appendChild(helper_1.appendClipElement(chart.redraw, options, chart.renderer));
            }
            for (var _i = 0, axes_1 = axes; _i < axes_1.length; _i++) {
                var axis = axes_1[_i];
                var count = 0;
                for (var _a = 0, _b = axis.stripLines; _a < _b.length; _a++) {
                    var stripline = _b[_a];
                    if (stripline.visible && stripline.zIndex === position) {
                        if (stripline.isSegmented && stripline.segmentStart != null && stripline.segmentEnd != null &&
                            stripline.sizeType !== 'Pixel') {
                            segmentAxis = this.getSegmentAxis(axes, axis, stripline);
                        }
                        if (stripline.isRepeat && stripline.repeatEvery != null && stripline.size !== null && stripline.sizeType !== 'Pixel') {
                            limit = (stripline.repeatUntil != null) ? ((axis.valueType === 'DateTime') ?
                                this.dateToMilliSeconds(stripline.repeatUntil, chart) : +stripline.repeatUntil) : axis.actualRange.max;
                            startValue = axis.valueType === 'DateTime' && this.isCoreDate(stripline.start) ?
                                this.dateToMilliSeconds(stripline.start, chart) : stripline.start;
                            if ((stripline.startFromAxis && axis.valueType === 'DateTime' && stripline.sizeType === 'Auto') ||
                                (stripline.start < axis.visibleRange.min)) {
                                startValue = axis.visibleLabels[0].value === axis.visibleRange.min ? axis.visibleRange.min :
                                    axis.visibleLabels[0].value - (axis.valueType === 'DateTime' ? axis.dateTimeInterval :
                                        axis.visibleRange.interval);
                            }
                            startValue = stripline.startFromAxis && axis.valueType !== 'DateTime' ? axis.visibleRange.min : startValue;
                            while (startValue < limit) {
                                end = (startValue + (axis.valueType === 'DateTime' ? axis.dateTimeInterval * +stripline.size : stripline.size));
                                range = helper_1.withIn(end, axis.visibleRange);
                                if ((startValue >= axis.visibleRange.min && startValue < axis.visibleRange.max) || range) {
                                    this.renderStripLineElement(axis, stripline, seriesClipRect, id, striplineGroup, chart, startValue, segmentAxis, count);
                                }
                                count++;
                                startValue = this.getStartValue(axis, stripline, startValue, chart);
                            }
                        }
                        else {
                            this.renderStripLineElement(axis, stripline, seriesClipRect, id, striplineGroup, chart, null, segmentAxis, count);
                            count++;
                        }
                    }
                }
            }
            helper_1.appendChildElement(chart.enableCanvas, chart.svgObject, striplineGroup, chart.redraw);
        };
        StripLine.prototype.isCoreDate = function (value) {
            return typeof value === 'string' ? true : false;
        };
        StripLine.prototype.dateToMilliSeconds = function (value, chart) {
            return this.dateParse(value, chart).getTime();
        };
        StripLine.prototype.renderPath = function (stripline, rect, id, parent, chart, axis) {
            var element = helper_1.getElement(id);
            var direction = element ? element.getAttribute('d') : '';
            var d = (axis.orientation === 'Vertical') ? ('M ' + rect.x + ' ' + rect.y + ' ' + 'L ' + (rect.x + rect.width)
                + ' ' + rect.y) :
                ('M ' + rect.x + ' ' + rect.y + ' ' + 'L ' + rect.x + ' ' + (rect.y + rect.height));
            helper_1.appendChildElement(chart.enableCanvas, parent, chart.renderer.drawPath(new ej2_svg_base_1.PathOption(id, 'none', stripline.size, stripline.color, stripline.opacity, stripline.dashArray, d)), chart.redraw, true, 'x', 'y', null, direction, true);
        };
        StripLine.prototype.renderRectangle = function (stripline, rect, id, parent, chart) {
            var element = helper_1.getElement(id);
            var previousRect = element ? new ej2_svg_base_1.Rect(+element.getAttribute('x'), +element.getAttribute('y'), +element.getAttribute('width'), +element.getAttribute('height')) : null;
            helper_1.appendChildElement(chart.enableCanvas, parent, chart.renderer.drawRectangle(new helper_1.RectOption(id, stripline.color, stripline.border, stripline.opacity, rect, 0, 0, '', stripline.dashArray)), chart.redraw, true, 'x', 'y', null, null, true, true, previousRect);
        };
        StripLine.prototype.renderText = function (stripline, rect, id, parent, chart, axis) {
            var textSize = ej2_svg_base_1.measureText(stripline.text, stripline.textStyle);
            var isRotationNull = (stripline.rotation === null);
            var textMid = isRotationNull ? 3 * (textSize.height / 8) : 0;
            var ty = rect.y + (rect.height / 2) + textMid;
            var rotation = isRotationNull ? ((axis.orientation === 'Vertical') ? 0 : -90) : stripline.rotation;
            var tx = rect.x + (rect.width / 2);
            var anchor;
            var padding = 5;
            if (axis.orientation === 'Horizontal') {
                tx = this.getTextStart(tx + (textMid * this.factor(stripline.horizontalAlignment)), rect.width, stripline.horizontalAlignment);
                ty = this.getTextStart(ty - textMid, rect.height, stripline.verticalAlignment) +
                    (stripline.verticalAlignment === 'Start' && !isRotationNull ? (textSize.height / 4) : 0);
                anchor = isRotationNull ? this.invertAlignment(stripline.verticalAlignment) : stripline.horizontalAlignment;
            }
            else {
                tx = this.getTextStart(tx, rect.width, stripline.horizontalAlignment);
                ty = this.getTextStart(ty + (textMid * this.factor(stripline.verticalAlignment)) - padding, rect.height, stripline.verticalAlignment);
                anchor = stripline.horizontalAlignment;
            }
            helper_1.textElement(chart.renderer, new ej2_svg_base_1.TextOption(id, tx, ty, anchor, stripline.text, 'rotate(' + rotation + ' ' + tx + ',' + ty + ')', 'middle'), stripline.textStyle, stripline.textStyle.color, parent, null, null, null, null, null, null, null, null, chart.enableCanvas);
        };
        StripLine.prototype.invertAlignment = function (anchor) {
            switch (anchor) {
                case 'Start':
                    anchor = 'End';
                    break;
                case 'End':
                    anchor = 'Start';
                    break;
            }
            return anchor;
        };
        StripLine.prototype.getStartValue = function (axis, stripline, startValue, chart) {
            if (axis.valueType === 'DateTime') {
                return (this.getToValue(null, startValue, +stripline.repeatEvery, axis, null, stripline));
            }
            else {
                return startValue + (+stripline.repeatEvery);
            }
        };
        StripLine.prototype.getSegmentAxis = function (axes, axis, stripline) {
            var segment;
            if (stripline.segmentAxisName == null) {
                return (axis.orientation === 'Horizontal') ? axes[1] : axes[0];
            }
            else {
                for (var i = 0; i < axes.length; i++) {
                    if (stripline.segmentAxisName === axes[i].name) {
                        segment = axes[i];
                    }
                }
                return segment;
            }
        };
        StripLine.prototype.renderStripLineElement = function (axis, stripline, seriesClipRect, id, striplineGroup, chart, startValue, segmentAxis, count) {
            var rect = this.measureStripLine(axis, stripline, seriesClipRect, startValue, segmentAxis, chart);
            if (stripline.sizeType === 'Pixel') {
                this.renderPath(stripline, rect, id + 'path_' + axis.name + '_' + count, striplineGroup, chart, axis);
            }
            else {
                if (rect.height !== 0 && rect.width !== 0) {
                    this.renderRectangle(stripline, rect, id + 'rect_' + axis.name + '_' + count, striplineGroup, chart);
                }
            }
            if (stripline.text !== '') {
                this.renderText(stripline, rect, id + 'text_' + axis.name + '_' + count, striplineGroup, chart, axis);
            }
        };
        StripLine.prototype.factor = function (anchor) {
            var factor = 0;
            switch (anchor) {
                case 'Start':
                    factor = 1;
                    break;
                case 'End':
                    factor = -1;
                    break;
            }
            return factor;
        };
        StripLine.prototype.getTextStart = function (xy, size, textAlignment) {
            var padding = 5;
            switch (textAlignment) {
                case 'Start':
                    xy = xy - (size / 2) + padding;
                    break;
                case 'End':
                    xy = xy + (size / 2) - padding;
                    break;
            }
            return xy;
        };
        StripLine.prototype.getModuleName = function () {
            return 'StripLine';
        };
        StripLine.prototype.destroy = function () {
        };
        return StripLine;
    }());
    exports.StripLine = StripLine;
});
