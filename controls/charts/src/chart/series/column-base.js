define(["require", "exports", "@syncfusion/ej2-base", "../utils/double-range", "../../common/utils/helper", "../../common/utils/helper", "@syncfusion/ej2-svg-base", "../../common/model/constants"], function (require, exports, ej2_base_1, double_range_1, helper_1, helper_2, ej2_svg_base_1, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ColumnBase = (function () {
        function ColumnBase() {
        }
        ColumnBase.prototype.getSideBySideInfo = function (series) {
            if (series.chart.enableSideBySidePlacement && !series.position) {
                this.getSideBySidePositions(series);
            }
            if (series.columnWidthInPixel) {
                return new double_range_1.DoubleRange(0, 0);
            }
            var position = series.type === 'Histogram' || !series.chart.enableSideBySidePlacement ? 0 : series.position;
            var rectCount = series.type === 'Histogram' || !series.chart.enableSideBySidePlacement ? 1 : series.rectCount;
            series.isRectSeries = true;
            var visibleSeries = series.chart.visibleSeries;
            var seriesSpacing = series.chart.enableSideBySidePlacement ? series.columnSpacing : 0;
            var pointSpacing = (series.columnWidth === null || isNaN(+series.columnWidth)) ? ((series.type === 'Histogram') ? 1 : 0.7) :
                series.columnWidth;
            var minimumPointDelta = helper_2.getMinPointsDelta(series.xAxis, visibleSeries);
            var width = minimumPointDelta * pointSpacing;
            var radius;
            var location = (position) / rectCount - 0.5;
            var doubleRange = new double_range_1.DoubleRange(location, location + (1 / rectCount));
            if (!(isNaN(doubleRange.start) || isNaN(doubleRange.end))) {
                if (series.groupName && series.type.indexOf('Stacking') === -1) {
                    var mainColumnWidth_1 = 0.7;
                    series.chart.series.filter(function (series) { if (series.columnWidth > mainColumnWidth_1) {
                        mainColumnWidth_1 = series.columnWidth;
                    } });
                    var mainWidth = minimumPointDelta * mainColumnWidth_1;
                    var mainDoubleRange = new double_range_1.DoubleRange(doubleRange.start * mainWidth, doubleRange.end * mainWidth);
                    var difference = ((mainDoubleRange.delta) - (doubleRange.end * width - doubleRange.start * width)) / 2;
                    doubleRange = new double_range_1.DoubleRange(mainDoubleRange.start + difference, mainDoubleRange.end - difference);
                }
                else {
                    doubleRange = new double_range_1.DoubleRange(doubleRange.start * width, doubleRange.end * width);
                }
                radius = seriesSpacing * doubleRange.delta;
                doubleRange = new double_range_1.DoubleRange(doubleRange.start + radius / 2, doubleRange.end - radius / 2);
            }
            return doubleRange;
        };
        ColumnBase.prototype.getRectangle = function (x1, y1, x2, y2, series) {
            var point1 = helper_2.getPoint(x1, y1, series.xAxis, series.yAxis, series.chart.requireInvertedAxis);
            var point2 = helper_2.getPoint(x2, y2, series.xAxis, series.yAxis, series.chart.requireInvertedAxis);
            return new ej2_svg_base_1.Rect(Math.min(point1.x, point2.x), Math.min(point1.y, point2.y), Math.abs(point2.x - point1.x), Math.abs(point2.y - point1.y));
        };
        ColumnBase.prototype.getSideBySidePositions = function (series) {
            var chart = series.chart;
            for (var _i = 0, _a = chart.columns; _i < _a.length; _i++) {
                var columnItem = _a[_i];
                for (var _b = 0, _c = chart.rows; _b < _c.length; _b++) {
                    var item = _c[_b];
                    this.findRectPosition(series.findSeriesCollection(columnItem, item, false));
                }
            }
        };
        ColumnBase.prototype.findRectPosition = function (seriesCollection) {
            var groupingValues = [];
            var vSeries = { rectCount: 0, position: null };
            for (var i = 0; i < seriesCollection.length; i++) {
                var value = seriesCollection[i];
                if (value.type.indexOf('Stacking') !== -1 || value.groupName !== '') {
                    var groupName = value.type.indexOf('Stacking') !== -1 ? value.stackingGroup : value.type + value.groupName;
                    if (groupName) {
                        if (groupingValues[groupName] === undefined) {
                            value.position = vSeries.rectCount;
                            groupingValues[groupName] = vSeries.rectCount++;
                        }
                        else {
                            value.position = groupingValues[groupName];
                        }
                    }
                    else {
                        if (vSeries.position === null) {
                            value.position = vSeries.rectCount;
                            vSeries.position = vSeries.rectCount++;
                        }
                        else {
                            value.position = vSeries.position;
                        }
                    }
                }
                else {
                    value.position = vSeries.rectCount++;
                }
            }
            for (var i = 0; i < seriesCollection.length; i++) {
                var value = seriesCollection[i];
                value.rectCount = vSeries.rectCount;
            }
        };
        ColumnBase.prototype.updateSymbolLocation = function (point, rect, series) {
            if (!series.chart.requireInvertedAxis) {
                this.updateXRegion(point, rect, series);
            }
            else {
                this.updateYRegion(point, rect, series);
            }
            if (series.type === 'Histogram') {
                point.minimum = +point.x - series.histogramValues.binWidth / 2;
                point.maximum = +point.x + series.histogramValues.binWidth / 2;
            }
        };
        ColumnBase.prototype.updateXRegion = function (point, rect, series) {
            point.symbolLocations.push({
                x: rect.x + (rect.width) / 2,
                y: (series.seriesType === 'BoxPlot' || series.seriesType.indexOf('HighLow') !== -1 ||
                    (point.yValue >= 0 === !series.yAxis.isAxisInverse)) ? rect.y : (rect.y + rect.height)
            });
            this.getRegion(point, rect, series);
            if (series.type === 'RangeColumn') {
                point.symbolLocations.push({
                    x: rect.x + (rect.width) / 2,
                    y: rect.y + rect.height
                });
            }
        };
        ColumnBase.prototype.updateYRegion = function (point, rect, series) {
            point.symbolLocations.push({
                x: (series.seriesType === 'BoxPlot' || series.seriesType.indexOf('HighLow') !== -1 ||
                    (point.yValue >= 0 === !series.yAxis.isAxisInverse)) ? rect.x + rect.width : rect.x,
                y: rect.y + rect.height / 2
            });
            this.getRegion(point, rect, series);
            if (series.type === 'RangeColumn') {
                point.symbolLocations.push({
                    x: rect.x,
                    y: rect.y + rect.height / 2
                });
            }
        };
        ColumnBase.prototype.renderMarker = function (series) {
            if (series.marker && series.marker.visible) {
                series.chart.markerRender.render(series);
            }
        };
        ColumnBase.prototype.getRegion = function (point, rect, series) {
            if (point.y === 0) {
                var markerWidth = (series.marker && series.marker.width) ? series.marker.width : 0;
                var markerHeight = (series.marker && series.marker.height) ? series.marker.height : 0;
                point.regions.push(new ej2_svg_base_1.Rect(point.symbolLocations[0].x - markerWidth, point.symbolLocations[0].y - markerHeight, 2 * markerWidth, 2 * markerHeight));
            }
            else {
                point.regions.push(rect);
            }
        };
        ColumnBase.prototype.triggerEvent = function (series, point, fill, border) {
            var argsData = {
                cancel: false, name: constants_1.pointRender, series: series, point: point,
                fill: series.setPointColor(point, fill),
                border: series.setBorderColor(point, border)
            };
            series.chart.trigger(constants_1.pointRender, argsData);
            point.color = argsData.fill;
            return argsData;
        };
        ColumnBase.prototype.drawRectangle = function (series, point, rect, argsData) {
            var chart = series.chart;
            var check = chart.requireInvertedAxis ? rect.height : rect.width;
            if (check <= 0) {
                return null;
            }
            var direction;
            if (point.y === 0) {
                direction = this.calculateRoundedRectPath(rect, 0, 0, 0, 0);
            }
            else {
                direction = this.calculateRoundedRectPath(rect, series.cornerRadius.topLeft, series.cornerRadius.topRight, series.cornerRadius.bottomLeft, series.cornerRadius.bottomRight);
            }
            var name = series.category === 'Indicator' ? chart.element.id + '_Indicator_' + series.index + '_' + series.name +
                '_Point_' + point.index : chart.element.id + '_Series_' + series.index + '_Point_' + point.index;
            var previousElement = helper_1.redrawElement(chart.redraw, name);
            var previousDirection = previousElement ? previousElement.getAttribute('d') : '';
            var options = new ej2_svg_base_1.PathOption(name, argsData.fill, argsData.border.width, argsData.border.color, series.opacity, series.dashArray, direction);
            var element = chart.renderer.drawPath(options, new Int32Array([series.clipRect.x, series.clipRect.y]));
            switch (series.seriesType) {
                case 'XY':
                    element.setAttribute('aria-label', point.x.toString() + ':' + point.yValue.toString());
                    break;
                case 'HighLow':
                    element.setAttribute('aria-label', point.x.toString() + ':' + point.high.toString() + ':' + point.low.toString());
                    break;
            }
            helper_1.appendChildElement(series.chart.enableCanvas, series.seriesElement, element, chart.redraw);
            if (!series.chart.enableCanvas) {
                helper_1.pathAnimation(element, direction, chart.redraw, previousDirection, chart.duration);
            }
        };
        ColumnBase.prototype.animate = function (series) {
            var rectElements = series.seriesElement.childNodes;
            var count = series.category === 'Indicator' ? 0 : 1;
            var visiblePoints = helper_1.getVisiblePoints(series);
            for (var _i = 0, visiblePoints_1 = visiblePoints; _i < visiblePoints_1.length; _i++) {
                var point = visiblePoints_1[_i];
                if (!point.symbolLocations.length && !(series.type === 'BoxAndWhisker' && point.regions.length)) {
                    continue;
                }
                this.animateRect(rectElements[count], series, point);
                count++;
            }
        };
        ColumnBase.prototype.animateRect = function (element, series, point) {
            var option = series.animation;
            var duration = series.chart.animated ? series.chart.duration : option.duration;
            var effect = helper_2.getAnimationFunction('Linear');
            var isPlot = point.yValue < 0;
            var x;
            var y;
            var elementHeight = +point.regions[0].height;
            var elementWidth = +point.regions[0].width;
            var centerX;
            var centerY;
            if (!series.chart.requireInvertedAxis) {
                x = +point.regions[0].x;
                if (series.type.indexOf('Stacking') > -1) {
                    y = (1 - helper_1.valueToCoefficient(0, series.yAxis)) * (series.yAxis.rect.height);
                    centerX = x;
                    centerY = y;
                }
                else {
                    y = +point.regions[0].y;
                    centerY = (series.seriesType.indexOf('HighLow') !== -1 || series.type.indexOf('Waterfall') !== -1) ? y + elementHeight / 2 :
                        (isPlot !== series.yAxis.isAxisInverse) ? y : y + elementHeight;
                    centerX = isPlot ? x : x + elementWidth;
                }
            }
            else {
                y = +point.regions[0].y;
                if (series.type.indexOf('Stacking') > -1) {
                    x = (helper_1.valueToCoefficient(0, series.yAxis)) * series.yAxis.rect.width;
                    centerX = x;
                    centerY = y;
                }
                else {
                    x = +point.regions[0].x;
                    centerY = isPlot ? y : y + elementHeight;
                    centerX = (series.seriesType.indexOf('HighLow') !== -1 || series.type.indexOf('Waterfall') !== -1) ? x + elementWidth / 2 :
                        (isPlot !== series.yAxis.isAxisInverse) ? x + elementWidth : x;
                }
            }
            var value;
            if (!ej2_base_1.isNullOrUndefined(element)) {
                element.style.visibility = 'hidden';
                new ej2_base_1.Animation({}).animate(element, {
                    duration: duration,
                    delay: option.delay,
                    progress: function (args) {
                        if (args.timeStamp >= args.delay) {
                            element.style.visibility = 'visible';
                            if (!series.chart.requireInvertedAxis) {
                                elementHeight = elementHeight ? elementHeight : 1;
                                value = effect(args.timeStamp - args.delay, 0, elementHeight, args.duration);
                                element.setAttribute('transform', 'translate(' + centerX + ' ' + centerY +
                                    ') scale(1,' + (value / elementHeight) + ') translate(' + (-centerX) + ' ' + (-centerY) + ')');
                            }
                            else {
                                elementWidth = elementWidth ? elementWidth : 1;
                                value = effect(args.timeStamp - args.delay, 0, elementWidth, args.duration);
                                element.setAttribute('transform', 'translate(' + centerX + ' ' + centerY +
                                    ') scale(' + (value / elementWidth) + ', 1) translate(' + (-centerX) + ' ' + (-centerY) + ')');
                            }
                        }
                    },
                    end: function () {
                        element.setAttribute('transform', 'translate(0,0)');
                        var seriesElement = series.seriesElement;
                        if (element === seriesElement.lastElementChild || point.index === series.points.length - 1 ||
                            (series.type === 'Waterfall' && element === seriesElement.children[seriesElement.childElementCount - 2])) {
                            series.chart.trigger('animationComplete', { series: series.chart.isBlazor ? {} : series });
                            if (series.type === 'Waterfall') {
                                var rectElements = seriesElement.childNodes;
                                for (var i = 0; i < rectElements.length; i++) {
                                    if (rectElements[i].id.indexOf('Connector') !== -1) {
                                        rectElements[i].style.visibility = 'visible';
                                        rectElements[i].setAttribute('transform', 'translate(0,0)');
                                    }
                                }
                            }
                        }
                    }
                });
            }
        };
        ColumnBase.prototype.calculateRoundedRectPath = function (rect, topLeft, topRight, bottomLeft, bottomRight) {
            return 'M' + ' ' + rect.x + ' ' + (topLeft + rect.y) +
                ' Q ' + rect.x + ' ' + rect.y + ' ' + (rect.x + topLeft) + ' ' +
                rect.y + ' ' + 'L' + ' ' + (rect.x + rect.width - topRight) + ' ' + rect.y +
                ' Q ' + (rect.x + rect.width) + ' ' + rect.y + ' ' +
                (rect.x + rect.width) + ' ' + (rect.y + topRight) + ' ' + 'L ' +
                (rect.x + rect.width) + ' ' + (rect.y + rect.height - bottomRight)
                + ' Q ' + (rect.x + rect.width) + ' ' + (rect.y + rect.height) + ' ' + (rect.x + rect.width - bottomRight) + ' ' +
                (rect.y + rect.height) + ' ' + 'L ' + (rect.x + bottomLeft) + ' ' + (rect.y + rect.height) + ' Q ' + rect.x + ' ' +
                (rect.y + rect.height) + ' ' + rect.x + ' ' + (rect.y + rect.height - bottomLeft) + ' ' + 'L' + ' ' + rect.x + ' ' +
                (topLeft + rect.y) + ' ' + 'Z';
        };
        return ColumnBase;
    }());
    exports.ColumnBase = ColumnBase;
});
