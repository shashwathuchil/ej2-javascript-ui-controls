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
define(["require", "exports", "../../common/utils/helper", "@syncfusion/ej2-svg-base", "../../common/utils/helper", "./column-base"], function (require, exports, helper_1, ej2_svg_base_1, helper_2, column_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WaterfallSeries = (function (_super) {
        __extends(WaterfallSeries, _super);
        function WaterfallSeries() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WaterfallSeries.prototype.render = function (series) {
            var rect;
            var sideBySideInfo = this.getSideBySideInfo(series);
            var origin = Math.max(series.yAxis.visibleRange.min, 0);
            var argsData;
            var prevEndValue = 0;
            var direction = '';
            var currentEndValue = 0;
            var originValue;
            var prevRegion = null;
            var y;
            var isInversed = series.chart.requireInvertedAxis;
            var intermediateOrigin = 0;
            var redraw = series.chart.redraw;
            for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
                var point = _a[_i];
                point.symbolLocations = [];
                point.regions = [];
                if (point.visible && helper_1.withInRange(series.points[point.index - 1], point, series.points[point.index + 1], series)) {
                    var isSum = this.isIntermediateSum(series, point.index);
                    var totalSum = this.isSumIndex(series, point.index);
                    currentEndValue += isSum || totalSum === true ? 0 : point.yValue;
                    originValue = (isSum === true ? intermediateOrigin : ((prevEndValue !== null && !totalSum) ? prevEndValue : origin));
                    rect = this.getRectangle(point.xValue + sideBySideInfo.start, currentEndValue, point.xValue + sideBySideInfo.end, originValue, series);
                    argsData = this.triggerPointRenderEvent(series, point);
                    if (isSum) {
                        intermediateOrigin = currentEndValue;
                    }
                    prevEndValue = currentEndValue;
                    if (!argsData.cancel) {
                        this.updateSymbolLocation(point, rect, series);
                        this.drawRectangle(series, point, rect, argsData);
                    }
                    var currentRegion = point.regions[0];
                    if (prevRegion !== null) {
                        var prevLeft = isInversed ? prevRegion.x : prevRegion.y;
                        var currentLeft = isInversed ? currentRegion.x : currentRegion.y;
                        var prevBottom = void 0;
                        var currentBottom = void 0;
                        var currentYValue = currentRegion.y;
                        var currentXValue = currentRegion.x;
                        var beforePoint = series.points[point.index - 1];
                        if (point.yValue === 0) {
                            prevBottom = isInversed ? prevRegion.x + prevRegion.width : prevRegion.y + prevRegion.height;
                            currentBottom = isInversed ?
                                point.symbolLocations[0].x : point.symbolLocations[0].y;
                        }
                        else {
                            prevBottom = isInversed ? (beforePoint.yValue === 0) ?
                                beforePoint.symbolLocations[0].x : prevRegion.x + prevRegion.width : (beforePoint.yValue === 0) ?
                                beforePoint.symbolLocations[0].y : prevRegion.y + prevRegion.height;
                            currentBottom = isInversed ?
                                currentRegion.x + currentRegion.width : currentRegion.y + currentRegion.height;
                        }
                        if (Math.round(prevLeft) === Math.round(currentLeft) ||
                            Math.round(prevBottom) === Math.round(currentLeft)) {
                            y = isInversed ? (currentRegion.x === 0 && prevRegion.x === 0) ? currentBottom : currentRegion.x : currentRegion.y;
                            y = (point.yValue === 0) ?
                                (isInversed ? point.symbolLocations[0].x : point.symbolLocations[0].y) : y;
                        }
                        else {
                            y = currentBottom;
                        }
                        if (isInversed) {
                            if (beforePoint.yValue === 0) {
                                prevRegion.y = ((prevRegion.y + prevRegion.height / 2) + (rect.height / 2)) - prevRegion.height;
                            }
                            if (point.yValue === 0) {
                                currentYValue = ((currentRegion.y + currentRegion.height / 2) - (rect.height / 2));
                            }
                            direction = direction.concat('M' + ' ' + y + ' ' + (prevRegion.y + prevRegion.height) + ' ' +
                                'L' + ' ' + y + ' ' + currentYValue + ' ');
                        }
                        else {
                            if (beforePoint.yValue === 0) {
                                prevRegion.x = ((prevRegion.x + prevRegion.width / 2) - (rect.width / 2));
                                currentXValue = ((currentRegion.x + currentRegion.width / 2) + (rect.width / 2)) - currentRegion.width;
                            }
                            direction = direction.concat('M' + ' ' + prevRegion.x + ' ' + y + ' ' +
                                'L' + ' ' + (currentXValue + currentRegion.width) + ' ' + y + ' ');
                        }
                    }
                    prevRegion = point.regions[0];
                }
            }
            var options = new ej2_svg_base_1.PathOption(series.chart.element.id + '_Series_' + series.index + '_Connector_', 'none', series.connector.width, series.connector.color, series.opacity, series.connector.dashArray, direction);
            if (redraw && helper_2.getElement(options.id)) {
                direction = helper_2.getElement(options.id).getAttribute('d');
            }
            var element = (helper_2.redrawElement(redraw, options.id, options, series.chart.renderer) ||
                series.chart.renderer.drawPath(options, new Int32Array([series.clipRect.x, series.clipRect.y])));
            element.style.visibility = (!series.chart.enableCanvas) ? ((series.animation.enable && series.chart.animateSeries) ?
                'hidden' : 'visible') : null;
            helper_2.appendChildElement(series.chart.enableCanvas, series.seriesElement, element, redraw, true, null, null, null, direction);
            this.renderMarker(series);
        };
        WaterfallSeries.prototype.isIntermediateSum = function (series, index) {
            if (series.intermediateSumIndexes !== undefined && series.intermediateSumIndexes.indexOf(index) !== -1) {
                return true;
            }
            return false;
        };
        WaterfallSeries.prototype.isSumIndex = function (series, index) {
            if (series.sumIndexes !== undefined && series.sumIndexes.indexOf(index) !== -1) {
                return true;
            }
            return false;
        };
        WaterfallSeries.prototype.triggerPointRenderEvent = function (series, point) {
            var color;
            var isSum = this.isIntermediateSum(series, point.index);
            var totalSum = this.isSumIndex(series, point.index);
            if (isSum || totalSum) {
                color = series.summaryFillColor;
            }
            else if (point.y < 0) {
                color = series.negativeFillColor;
            }
            else {
                color = series.interior;
            }
            return this.triggerEvent(series, point, color, { color: series.border.color, width: series.border.width });
        };
        WaterfallSeries.prototype.processInternalData = function (json, series) {
            var data = json;
            var index;
            var intermediateSum = series.intermediateSumIndexes;
            var sumIndex = series.sumIndexes;
            if (intermediateSum !== undefined && intermediateSum.length > 0) {
                for (var i = 0; i < intermediateSum.length; i++) {
                    for (var j = 0; j < data.length; j++) {
                        if (j === intermediateSum[i]) {
                            if (i === 0) {
                                index = helper_2.subArraySum(data, -1, intermediateSum[i], null, series);
                            }
                            else {
                                index = helper_2.subArraySum(data, intermediateSum[i - 1], intermediateSum[i], null, series);
                            }
                            data[j][series.yName] = index;
                        }
                    }
                }
            }
            if (sumIndex !== undefined && sumIndex.length > 0) {
                for (var k = 0; k < sumIndex.length; k++) {
                    for (var j = 0; j < data.length; j++) {
                        if (j === sumIndex[k]) {
                            if (intermediateSum !== undefined) {
                                index = helper_2.subArraySum(data, intermediateSum[k] - 1, sumIndex[k], sumIndex, series);
                            }
                            else {
                                index = helper_2.subArraySum(data, -1, sumIndex[k], null, series);
                            }
                            data[j][series.yName] = index;
                        }
                    }
                }
            }
            return data;
        };
        WaterfallSeries.prototype.doAnimation = function (series) {
            this.animate(series);
        };
        WaterfallSeries.prototype.getModuleName = function () {
            return 'WaterfallSeries';
        };
        WaterfallSeries.prototype.destroy = function () {
        };
        return WaterfallSeries;
    }(column_base_1.ColumnBase));
    exports.WaterfallSeries = WaterfallSeries;
});
