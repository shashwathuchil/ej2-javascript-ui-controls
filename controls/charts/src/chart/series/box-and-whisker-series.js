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
define(["require", "exports", "../../common/utils/helper", "../../common/utils/helper", "@syncfusion/ej2-svg-base", "@syncfusion/ej2-base", "./column-base", "../../common/utils/helper"], function (require, exports, helper_1, helper_2, ej2_svg_base_1, ej2_base_1, column_base_1, helper_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BoxAndWhiskerSeries = (function (_super) {
        __extends(BoxAndWhiskerSeries, _super);
        function BoxAndWhiskerSeries() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BoxAndWhiskerSeries.prototype.render = function (series, xAxis, yAxis, isInverted) {
            var sideBySideInfo = this.getSideBySideInfo(series);
            var argsData;
            for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
                var point = _a[_i];
                point.symbolLocations = [];
                point.regions = [];
                var centerRegion = void 0;
                if (point.visible && helper_1.withInRange(series.points[point.index - 1], point, series.points[point.index + 1], series)) {
                    this.findBoxPlotValues(point.y, point, series.boxPlotMode);
                    this.updateTipRegion(series, point, sideBySideInfo);
                    centerRegion = this.getRectangle((point.xValue + sideBySideInfo.start), point.upperQuartile, (point.xValue + sideBySideInfo.end), point.lowerQuartile, series);
                    point.regions.push(centerRegion);
                    argsData = this.triggerEvent(series, point, series.interior, {
                        color: (!ej2_base_1.isNullOrUndefined(series.border.color) && series.border.color !== 'transparent') ? series.border.color :
                            helper_2.getSaturationColor(series.interior, -0.6),
                        width: series.border.width ? series.border.width : 1
                    });
                    if (!argsData.cancel) {
                        this.renderBoxAndWhisker(series, point, argsData, this.getPathString(point, series, helper_2.getPoint(point.xValue, point.median, xAxis, yAxis, isInverted), helper_2.getPoint(point.xValue + sideBySideInfo.median, point.average, xAxis, yAxis, isInverted)), sideBySideInfo.median);
                    }
                }
            }
            if (series.marker.visible) {
                series.chart.markerRender.render(series);
            }
        };
        BoxAndWhiskerSeries.prototype.updateTipRegion = function (series, point, sideBySideInfo) {
            var tipRegion = this.getRectangle((point.xValue + sideBySideInfo.median), point.maximum, (point.xValue + sideBySideInfo.median), point.minimum, series);
            this.updateTipSize(series, point, tipRegion, series.chart.requireInvertedAxis);
        };
        BoxAndWhiskerSeries.prototype.updateTipSize = function (series, point, region, isInverted) {
            var borderWidth = series.border.width || 1;
            if (!isInverted) {
                region.x -= borderWidth / 2;
                region.width = region.width || borderWidth;
            }
            else {
                region.y -= borderWidth / 2;
                region.height = region.height || borderWidth;
            }
            point.regions.push(region);
        };
        BoxAndWhiskerSeries.prototype.getPathString = function (point, series, median, average) {
            var topRect = point.regions[0];
            var midRect = point.regions[1];
            var direction = '';
            var center = series.chart.requireInvertedAxis ? topRect.y + topRect.height / 2 :
                topRect.x + topRect.width / 2;
            var midWidth = midRect.x + midRect.width;
            var midHeight = midRect.y + midRect.height;
            var topWidth = topRect.x + topRect.width;
            var topHeight = topRect.y + topRect.height;
            if (!series.chart.requireInvertedAxis) {
                this.updateTipSize(series, point, { x: midRect.x, y: topRect.y, width: midWidth - midRect.x, height: 0 }, true);
                this.updateTipSize(series, point, { x: midRect.x, y: topHeight, width: midWidth - midRect.x, height: 0 }, true);
                direction += 'M ' + midRect.x + ' ' + topRect.y + ' ' + ' L ' + midWidth + ' ' + topRect.y;
                direction += ' M ' + center + ' ' + topRect.y + ' ' + ' L ' + center + ' ' + midRect.y;
                direction += ' M ' + midRect.x + ' ' + midRect.y + ' ' + ' L ' + midWidth + ' ' + midRect.y +
                    ' L ' + midWidth + ' ' + midHeight + ' L ' + midRect.x + ' ' + midHeight + ' Z';
                direction += ' M ' + center + ' ' + midHeight + ' L ' + center + ' ' + topHeight;
                direction += ' M ' + midRect.x + ' ' + topHeight + ' L ' + midWidth + ' ' + topHeight;
                direction += ' M ' + midRect.x + ' ' + median.y + ' L ' + midWidth + ' ' + median.y;
                direction += series.showMean ?
                    ' M ' + (average.x - 5) + ' ' + (average.y - 5) + ' L ' + (average.x + 5) + ' ' + (average.y + 5) +
                        ' M ' + (average.x + 5) + ' ' + (average.y - 5) + ' L ' + (average.x - 5) + ' ' + (average.y + 5) : '';
            }
            else {
                this.updateTipSize(series, point, { x: topRect.x, y: midRect.y, width: 0, height: midHeight - midRect.y }, false);
                this.updateTipSize(series, point, { x: topWidth, y: midRect.y, width: 0, height: midHeight - midRect.y }, true);
                direction += 'M ' + topRect.x + ' ' + midRect.y + ' L ' + topRect.x + ' ' + midHeight;
                direction += 'M ' + topRect.x + ' ' + center + ' ' + ' L ' + midRect.x + ' ' + center;
                direction += ' M ' + midRect.x + ' ' + midRect.y + ' ' + ' L ' + midWidth + ' ' + midRect.y +
                    ' L ' + midWidth + ' ' + midHeight + ' L ' + midRect.x + ' ' + midHeight + ' Z';
                direction += ' M ' + midWidth + ' ' + center + ' L ' + topWidth + ' ' + center;
                direction += ' M ' + topWidth + ' ' + midRect.y + ' L ' + topWidth + ' ' + midHeight;
                direction += ' M ' + median.x + ' ' + midRect.y + ' ' + ' L ' + median.x + ' ' + midHeight;
                direction += series.showMean ?
                    'M ' + (average.x + 5) + ' ' + (average.y - 5) + ' L ' + (average.x - 5) + ' ' + (average.y + 5) +
                        'M ' + (average.x - 5) + ' ' + (average.y - 5) + ' L ' + (average.x + 5) + ' ' + (average.y + 5) : '';
            }
            return direction;
        };
        BoxAndWhiskerSeries.prototype.renderBoxAndWhisker = function (series, point, argsData, direction, median) {
            var location;
            var size;
            var symbolId = series.chart.element.id + '_Series_' + series.index + '_Point_' + point.index;
            var element = series.chart.renderer.drawPath(new ej2_svg_base_1.PathOption(symbolId + '_BoxPath', argsData.fill, argsData.border.width, argsData.border.color, series.opacity, series.dashArray, direction));
            element.setAttribute('aria-label', point.x.toString() + ':' + point.maximum.toString()
                + ':' + point.minimum.toString() + ':' + point.lowerQuartile.toString() + ':' + point.upperQuartile.toString());
            var parentElement = series.chart.renderer.createGroup({
                'id': symbolId
            });
            parentElement.appendChild(element);
            for (var i = 0; i < point.outliers.length; i++) {
                location = helper_2.getPoint((point.xValue + median), point.outliers[i], series.xAxis, series.yAxis, series.chart.requireInvertedAxis);
                size = new ej2_svg_base_1.Size(series.marker.width, series.marker.height);
                point.symbolLocations.push(location);
                this.updateTipSize(series, point, {
                    x: location.x - (size.width / 2), y: location.y - (size.height / 2),
                    width: size.width, height: size.height
                }, true);
            }
            series.seriesElement.appendChild(parentElement);
        };
        BoxAndWhiskerSeries.prototype.findBoxPlotValues = function (yValues, point, mode) {
            var yCount = yValues.length;
            var quartile = {
                average: helper_1.sum(yValues) / yCount,
                lowerQuartile: 0, upperQuartile: 0,
                maximum: 0, minimum: 0,
                median: 0, outliers: []
            };
            if (mode === 'Exclusive') {
                quartile.lowerQuartile = this.getExclusiveQuartileValue(yValues, yCount, 0.25);
                quartile.upperQuartile = this.getExclusiveQuartileValue(yValues, yCount, 0.75);
                quartile.median = this.getExclusiveQuartileValue(yValues, yCount, 0.5);
            }
            else if (mode === 'Inclusive') {
                quartile.lowerQuartile = this.getInclusiveQuartileValue(yValues, yCount, 0.25);
                quartile.upperQuartile = this.getInclusiveQuartileValue(yValues, yCount, 0.75);
                quartile.median = this.getInclusiveQuartileValue(yValues, yCount, 0.5);
            }
            else {
                quartile.median = helper_3.getMedian(yValues);
                this.getQuartileValues(yValues, yCount, quartile);
            }
            this.getMinMaxOutlier(yValues, yCount, quartile);
            point.minimum = quartile.minimum;
            point.maximum = quartile.maximum;
            point.lowerQuartile = quartile.lowerQuartile;
            point.upperQuartile = quartile.upperQuartile;
            point.median = quartile.median;
            point.outliers = quartile.outliers;
            point.average = quartile.average;
        };
        BoxAndWhiskerSeries.prototype.getExclusiveQuartileValue = function (yValues, count, percentile) {
            if (count === 0) {
                return 0;
            }
            else if (count === 1) {
                return yValues[0];
            }
            var value = 0;
            var rank = percentile * (count + 1);
            var integerRank = Math.floor(Math.abs(rank));
            var fractionRank = rank - integerRank;
            if (integerRank === 0) {
                value = yValues[0];
            }
            else if (integerRank > count - 1) {
                value = yValues[count - 1];
            }
            else {
                value = fractionRank * (yValues[integerRank] - yValues[integerRank - 1]) + yValues[integerRank - 1];
            }
            return value;
        };
        BoxAndWhiskerSeries.prototype.getInclusiveQuartileValue = function (yValues, count, percentile) {
            if (count === 0) {
                return 0;
            }
            else if (count === 1) {
                return yValues[0];
            }
            var value = 0;
            var rank = percentile * (count - 1);
            var integerRank = Math.floor(Math.abs(rank));
            var fractionRank = rank - integerRank;
            value = fractionRank * (yValues[integerRank + 1] - yValues[integerRank]) + yValues[integerRank];
            return value;
        };
        BoxAndWhiskerSeries.prototype.getQuartileValues = function (yValues, count, quartile) {
            if (count === 1) {
                quartile.lowerQuartile = yValues[0];
                quartile.upperQuartile = yValues[0];
                return null;
            }
            var isEvenList = count % 2 === 0;
            var halfLength = count / 2;
            var lowerQuartileArray = yValues.slice(0, halfLength);
            var upperQuartileArray = yValues.slice(isEvenList ? halfLength : halfLength + 1, count);
            quartile.lowerQuartile = helper_3.getMedian(lowerQuartileArray);
            quartile.upperQuartile = helper_3.getMedian(upperQuartileArray);
        };
        BoxAndWhiskerSeries.prototype.getMinMaxOutlier = function (yValues, count, quartile) {
            var interquartile = quartile.upperQuartile - quartile.lowerQuartile;
            var rangeIQR = 1.5 * interquartile;
            for (var i = 0; i < count; i++) {
                if (yValues[i] < quartile.lowerQuartile - rangeIQR) {
                    quartile.outliers.push(yValues[i]);
                }
                else {
                    quartile.minimum = yValues[i];
                    break;
                }
            }
            for (var i = count - 1; i >= 0; i--) {
                if (yValues[i] > quartile.upperQuartile + rangeIQR) {
                    quartile.outliers.push(yValues[i]);
                }
                else {
                    quartile.maximum = yValues[i];
                    break;
                }
            }
        };
        BoxAndWhiskerSeries.prototype.doAnimation = function (series) {
            this.animate(series);
        };
        BoxAndWhiskerSeries.prototype.getModuleName = function () {
            return 'BoxAndWhiskerSeries';
        };
        BoxAndWhiskerSeries.prototype.destroy = function () {
        };
        return BoxAndWhiskerSeries;
    }(column_base_1.ColumnBase));
    exports.BoxAndWhiskerSeries = BoxAndWhiskerSeries;
});
