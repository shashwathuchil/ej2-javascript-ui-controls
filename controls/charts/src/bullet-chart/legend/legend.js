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
define(["require", "exports", "@syncfusion/ej2-base", "../../common/legend/legend", "../../common/utils/helper", "@syncfusion/ej2-svg-base", "../../common/model/constants"], function (require, exports, ej2_base_1, legend_1, helper_1, ej2_svg_base_1, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BulletChartLegend = (function (_super) {
        __extends(BulletChartLegend, _super);
        function BulletChartLegend(chart) {
            var _this = _super.call(this, chart) || this;
            _this.library = _this;
            _this.addEventListener();
            return _this;
        }
        BulletChartLegend.prototype.addEventListener = function () {
            if (this.chart.isDestroyed) {
                return;
            }
            this.chart.on('click', this.click, this);
            this.chart.on(ej2_base_1.Browser.touchEndEvent, this.mouseEnd, this);
            this.chart.on(ej2_base_1.Browser.touchMoveEvent, this.bulletMouseMove, this);
        };
        BulletChartLegend.prototype.removeEventListener = function () {
            if (this.chart.isDestroyed) {
                return;
            }
            this.chart.off('click', this.click);
            this.chart.off(ej2_base_1.Browser.touchEndEvent, this.mouseEnd);
            this.chart.off(ej2_base_1.Browser.touchMoveEvent, this.bulletMouseMove);
        };
        BulletChartLegend.prototype.bulletMouseMove = function (e) {
            if (this.chart.legendSettings.visible && this.chart.isTouch) {
                this.move(e);
            }
        };
        BulletChartLegend.prototype.mouseEnd = function (e) {
            if (this.chart.legendSettings.visible && this.chart.isTouch) {
                this.move(e);
            }
        };
        BulletChartLegend.prototype.getLegendOptions = function (visibleRangeCollection) {
            this.legendCollections = [];
            var fill;
            var count = 0;
            var key = 'color';
            var bulletChart = this.chart;
            for (var _i = 0, visibleRangeCollection_1 = visibleRangeCollection; _i < visibleRangeCollection_1.length; _i++) {
                var range = visibleRangeCollection_1[_i];
                if (range.name !== null) {
                    fill = range.color ? range.color : bulletChart.themeStyle.rangeStrokes[range.index][key];
                    this.legendCollections.push(new legend_1.LegendOptions(range.name, fill, range.shape, this.chart.legendSettings.visible, null, range.legendImageUrl, null, false, range.index, null));
                    count++;
                }
            }
            if (bulletChart.dataSource !== null && bulletChart.valueField !== '') {
                fill = (bulletChart.theme.indexOf('Dark') > -1) ? 'white' : bulletChart.valueFill ? bulletChart.valueFill : 'black';
                var shape = bulletChart.orientation === 'Vertical' ? 'TargetRect' : 'ActualRect';
                this.legendCollections.push(new legend_1.LegendOptions('Actual', fill, shape, this.chart.legendSettings.visible, null, '', null, false, count++, null));
            }
            if (bulletChart.dataSource !== null && bulletChart.targetField !== '') {
                fill = (bulletChart.theme.indexOf('Dark') > -1) ? 'white' : bulletChart.targetColor ? bulletChart.targetColor : 'black';
                var shape = bulletChart.orientation === 'Vertical' ? 'ActualRect' : 'TargetRect';
                for (var i = 0; i < Object.keys(bulletChart.dataSource).length; i++) {
                    if (ej2_base_1.isNullOrUndefined(bulletChart.dataSource[i][bulletChart.targetField].length)
                        || bulletChart.dataSource[i][bulletChart.targetField].length === 1) {
                        while (i === 0) {
                            this.legendCollections.push(new legend_1.LegendOptions('Target', fill, shape, this.chart.legendSettings.visible, null, '', null, false, count++, null));
                            break;
                        }
                    }
                    else {
                        var targetTypes = bulletChart.targetTypes;
                        var targetType = [];
                        var targetTypeLength = targetTypes.length;
                        while (i === 0) {
                            for (var i_1 = 0; i_1 < targetTypeLength; i_1++) {
                                targetType[i_1] = targetTypes[i_1 % targetTypeLength];
                                targetType[i_1] = (targetType[i_1] === 'Rect') ? bulletChart.orientation === 'Vertical' ?
                                    'ActualRect' : 'TargetRect' : (targetType[i_1]);
                                targetType[i_1] = (targetType[i_1] === 'Cross') ? 'Multiply' : targetType[i_1];
                                this.legendCollections.push(new legend_1.LegendOptions('Target_' + i_1, fill, targetType[i_1], this.chart.legendSettings.visible, null, '', null, false, count++, null));
                            }
                            break;
                        }
                    }
                }
            }
        };
        BulletChartLegend.prototype.getLegendBounds = function (availableSize, bulletLegendBounds, legend) {
            var extraWidth = 0;
            var padding = legend.padding;
            var extraHeight = 0;
            if (!this.isVertical) {
                extraHeight = !legend.height ? ((availableSize.height / 100) * 5) : 0;
            }
            else {
                extraWidth = !legend.width ? ((availableSize.width / 100) * 5) : 0;
            }
            bulletLegendBounds.height += extraHeight;
            bulletLegendBounds.width += extraWidth;
            var maximumWidth = 0;
            var legendRowWidth = 0;
            var legendRowCount = 0;
            var legendWidth = 0;
            var columnHeight = 0;
            var shapeWidth = legend.shapeWidth;
            var shapePadding = legend.shapePadding;
            var legendEventArgs;
            this.maxItemHeight = Math.max(ej2_svg_base_1.measureText('MeasureText', legend.textStyle).height, legend.shapeHeight);
            var render = false;
            for (var _i = 0, _a = this.legendCollections; _i < _a.length; _i++) {
                var bulletLegendOption = _a[_i];
                legendEventArgs = {
                    fill: bulletLegendOption.fill, text: bulletLegendOption.text, shape: bulletLegendOption.shape,
                    name: constants_1.legendRender, cancel: false
                };
                this.chart.trigger(constants_1.legendRender, legendEventArgs);
                bulletLegendOption.render = !legendEventArgs.cancel;
                bulletLegendOption.text = legendEventArgs.text;
                bulletLegendOption.fill = legendEventArgs.fill;
                bulletLegendOption.shape = legendEventArgs.shape;
                bulletLegendOption.textSize = ej2_svg_base_1.measureText(bulletLegendOption.text, legend.textStyle);
                if (bulletLegendOption.render && bulletLegendOption.text !== '') {
                    render = true;
                    legendWidth = shapeWidth + shapePadding + bulletLegendOption.textSize.width + padding;
                    legendRowWidth = legendRowWidth + legendWidth;
                    if (bulletLegendBounds.width < (padding + legendRowWidth) || this.isVertical) {
                        maximumWidth = Math.max(maximumWidth, (legendRowWidth + padding - (this.isVertical ? 0 : legendWidth)));
                        if (legendRowCount === 0 && (legendWidth !== legendRowWidth)) {
                            legendRowCount = 1;
                        }
                        legendRowWidth = this.isVertical ? 0 : legendWidth;
                        legendRowCount++;
                        columnHeight = (legendRowCount * (this.maxItemHeight + padding)) + padding;
                    }
                }
            }
            columnHeight = Math.max(columnHeight, (this.maxItemHeight + padding) + padding);
            this.isPaging = bulletLegendBounds.height < columnHeight;
            this.totalPages = legendRowCount;
            if (render) {
                this.setBounds(Math.max((legendRowWidth + padding), maximumWidth), columnHeight, legend, bulletLegendBounds);
            }
            else {
                this.setBounds(0, 0, legend, bulletLegendBounds);
            }
        };
        BulletChartLegend.prototype.getRenderPoint = function (bulletLegendOption, start, textPadding, prevLegend, rect, count, firstLegend) {
            var previousBound = (prevLegend.location.x + textPadding + prevLegend.textSize.width);
            var padding = this.legend.padding;
            if ((previousBound + (bulletLegendOption.textSize.width + textPadding)) > (rect.x + rect.width + this.legend.shapeWidth / 2) ||
                this.isVertical) {
                bulletLegendOption.location.x = start.x;
                bulletLegendOption.location.y = (count === firstLegend) ? prevLegend.location.y :
                    prevLegend.location.y + this.maxItemHeight + padding;
            }
            else {
                bulletLegendOption.location.x = (count === firstLegend) ? prevLegend.location.x : previousBound;
                bulletLegendOption.location.y = prevLegend.location.y;
            }
            var availwidth = (this.legendBounds.x + this.legendBounds.width) - (bulletLegendOption.location.x +
                textPadding - this.legend.shapeWidth / 2);
            bulletLegendOption.text = helper_1.textTrim(+availwidth.toFixed(4), bulletLegendOption.text, this.legend.textStyle);
        };
        BulletChartLegend.prototype.click = function (event) {
            var symbolTargetId = event.target.id;
            if (symbolTargetId.indexOf(this.legendID + '_pagedown') > -1) {
                this.changePage(event, false);
            }
            else if (symbolTargetId.indexOf(this.legendID + '_pageup') > -1) {
                this.changePage(event, true);
            }
        };
        BulletChartLegend.prototype.getModuleName = function () {
            return 'BulletChartLegend';
        };
        BulletChartLegend.prototype.destroy = function () {
            this.removeEventListener();
        };
        return BulletChartLegend;
    }(legend_1.BaseLegend));
    exports.BulletChartLegend = BulletChartLegend;
});
