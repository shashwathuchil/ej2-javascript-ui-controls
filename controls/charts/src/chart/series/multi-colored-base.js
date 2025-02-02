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
define(["require", "exports", "../../common/utils/helper", "./line-base", "../../common/utils/helper", "@syncfusion/ej2-data"], function (require, exports, helper_1, line_base_1, helper_2, ej2_data_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MultiColoredSeries = (function (_super) {
        __extends(MultiColoredSeries, _super);
        function MultiColoredSeries() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MultiColoredSeries.prototype.getAreaPathDirection = function (xValue, yValue, series, isInverted, getPointLocation, startPoint, startPath) {
            var direction = '';
            var firstPoint;
            if (startPoint === null) {
                firstPoint = getPointLocation(xValue, yValue, series.xAxis, series.yAxis, isInverted, series);
                direction += (startPath + ' ' + (firstPoint.x) + ' ' + (firstPoint.y) + ' ');
            }
            return direction;
        };
        MultiColoredSeries.prototype.getAreaEmptyDirection = function (firstPoint, secondPoint, series, isInverted, getPointLocation) {
            var direction = '';
            direction += this.getAreaPathDirection(firstPoint.x, firstPoint.y, series, isInverted, getPointLocation, null, 'L');
            direction += this.getAreaPathDirection(secondPoint.x, secondPoint.y, series, isInverted, getPointLocation, null, 'L');
            return direction;
        };
        MultiColoredSeries.prototype.setPointColor = function (currentPoint, previous, series, isXSegment, segments) {
            if (series.pointColorMapping === '') {
                var segment = void 0;
                var value = void 0;
                for (var i = 0; i < segments.length; i++) {
                    segment = segments[i];
                    value = isXSegment ? currentPoint.xValue : currentPoint.yValue;
                    if (value <= this.getAxisValue(segment.value, isXSegment ? series.xAxis : series.yAxis, series.chart) ||
                        (!segment.value && segment.value !== 0)) {
                        currentPoint.interior = segment.color;
                        break;
                    }
                }
                if (currentPoint.interior == null) {
                    currentPoint.interior = series.interior;
                }
                return false;
            }
            else {
                if (previous) {
                    return series.setPointColor(currentPoint, series.interior) !== series.setPointColor(previous, series.interior);
                }
                else {
                    return false;
                }
            }
        };
        MultiColoredSeries.prototype.sortSegments = function (series, chartSegments) {
            var _this = this;
            var axis = series.segmentAxis === 'X' ? series.xAxis : series.yAxis;
            var segments = [].concat(chartSegments);
            return segments.sort(function (a, b) {
                return _this.getAxisValue(a.value, axis, series.chart) - _this.getAxisValue(b.value, axis, series.chart);
            });
        };
        MultiColoredSeries.prototype.applySegmentAxis = function (series, options, segments) {
            var _this = this;
            if (series.pointColorMapping !== '') {
                options.map(function (option) {
                    _this.appendLinePath(option, series, '');
                });
                return null;
            }
            var isXSegment = series.segmentAxis === 'X';
            var axis = isXSegment ? series.xAxis : series.yAxis;
            var chart = series.chart;
            var segment;
            this.includeSegment(segments, axis, series, segments.length);
            var length = segments.length;
            var value;
            var clipPath;
            var attributeOptions;
            var _loop_1 = function (index) {
                segment = segments[index];
                value = this_1.getAxisValue(segment.value, axis, series.chart);
                clipPath = this_1.createClipRect(index ? this_1.getAxisValue(segments[index - 1].value, axis, series.chart)
                    : axis.visibleRange.min, value, series, index, isXSegment);
                if (clipPath) {
                    options.map(function (option) {
                        attributeOptions = {
                            'clip-path': clipPath,
                            'stroke-dasharray': segment.dashArray,
                            'opacity': option.opacity,
                            'stroke': series.type.indexOf('Line') > -1 ? segment.color || series.interior : series.border.color,
                            'stroke-width': option['stroke-width'],
                            'fill': series.type.indexOf('Line') > -1 ? 'none' : segment.color || series.interior,
                            'id': option.id + '_Segment_' + index,
                            'd': option.d
                        };
                        helper_1.pathAnimation(helper_2.getElement(attributeOptions.id), attributeOptions.d, chart.redraw);
                        series.seriesElement.appendChild(chart.renderer.drawPath(attributeOptions));
                    });
                }
            };
            var this_1 = this;
            for (var index = 0; index < length; index++) {
                _loop_1(index);
            }
        };
        MultiColoredSeries.prototype.includeSegment = function (segments, axis, series, length) {
            if (length <= 0) {
                segments.push({ value: axis.visibleRange.max, color: series.interior });
                return null;
            }
            if (this.getAxisValue(segments[length - 1].value, axis, series.chart) < axis.visibleRange.max) {
                segments.push({ value: axis.visibleRange.max, color: series.interior });
            }
        };
        MultiColoredSeries.prototype.createClipRect = function (startValue, endValue, series, index, isX) {
            var isRequired = series.chart.requireInvertedAxis;
            var startPointLocation = helper_1.getPoint(isX ? startValue : series.xAxis.visibleRange.min, isX ? series.yAxis.visibleRange.max : endValue, series.xAxis, series.yAxis, isRequired);
            var endPointLocation = helper_1.getPoint(isX ? endValue : series.xAxis.visibleRange.max, isX ? series.yAxis.visibleRange.min : startValue, series.xAxis, series.yAxis, isRequired);
            endPointLocation = isRequired ?
                [startPointLocation, startPointLocation = endPointLocation][0] : endPointLocation;
            var options;
            if ((endPointLocation.x - startPointLocation.x > 0) && (endPointLocation.y - startPointLocation.y > 0)) {
                options = new helper_2.RectOption(series.chart.element.id + '_ChartSegment' + series.index + 'ClipRect_' + index, 'transparent', { width: 1, color: 'Gray' }, 1, {
                    x: startPointLocation.x,
                    y: startPointLocation.y,
                    width: endPointLocation.x - startPointLocation.x,
                    height: endPointLocation.y - startPointLocation.y
                });
                series.seriesElement.appendChild(helper_1.appendClipElement(series.chart.redraw, options, series.chart.renderer));
                return 'url(#' + series.chart.element.id + '_ChartSegment' + series.index + 'ClipRect_' + index + ')';
            }
            return null;
        };
        MultiColoredSeries.prototype.getAxisValue = function (segmentValue, axis, chart) {
            if (segmentValue === null) {
                segmentValue = axis.visibleRange.max;
            }
            if (axis.valueType === 'DateTime') {
                var option = { skeleton: 'full', type: 'dateTime' };
                return Date.parse(chart.intl.getDateParser(option)(chart.intl.getDateFormat(option)(new Date(ej2_data_1.DataUtil.parse.parseJson({ val: segmentValue }).val))));
            }
            else if (axis.valueType.indexOf('Category') > -1) {
                var xValue = axis.valueType === 'DateTimeCategory' ?
                    (segmentValue.getTime()).toString() :
                    segmentValue;
                return (axis.labels.indexOf(xValue) < 0) ? +segmentValue : axis.labels.indexOf(xValue);
            }
            else {
                return +segmentValue;
            }
        };
        return MultiColoredSeries;
    }(line_base_1.LineBase));
    exports.MultiColoredSeries = MultiColoredSeries;
});
