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
define(["require", "exports", "../../common/utils/helper", "../../common/user-interaction/tooltip", "@syncfusion/ej2-svg-base", "@syncfusion/ej2-base", "@syncfusion/ej2-data", "../../common/model/constants"], function (require, exports, helper_1, tooltip_1, ej2_svg_base_1, ej2_base_1, ej2_data_1, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StockEvents = (function (_super) {
        __extends(StockEvents, _super);
        function StockEvents(stockChart) {
            var _this = _super.call(this, stockChart.chart) || this;
            _this.symbolLocations = [];
            _this.stockChart = stockChart;
            _this.chartId = _this.stockChart.element.id;
            return _this;
        }
        StockEvents.prototype.renderStockEvents = function () {
            var sChart = this.stockChart;
            var stockEvent;
            var stockEventElement;
            var textSize;
            var stockEventsElementGroup = sChart.renderer.createGroup({ id: this.chartId + '_StockEvents' });
            this.symbolLocations = initialArray(sChart.series.length, sChart.stockEvents.length, new helper_1.ChartLocation(0, 0));
            for (var i = 0; i < sChart.stockEvents.length; i++) {
                stockEvent = this.stockChart.stockEvents[i];
                for (var _i = 0, _a = sChart.chart.series; _i < _a.length; _i++) {
                    var series = _a[_i];
                    var argsData = {
                        name: constants_1.stockEventRender, stockChart: sChart, text: stockEvent.text,
                        type: stockEvent.type, cancel: false, series: series
                    };
                    sChart.trigger(constants_1.stockEventRender, argsData);
                    stockEvent.text = argsData.text;
                    stockEvent.type = argsData.type;
                    textSize = ej2_svg_base_1.measureText(stockEvent.text + 'W', stockEvent.textStyle);
                    if (!argsData.cancel) {
                        stockEventElement = sChart.renderer.createGroup({ id: this.chartId + '_Series_' + series.index + '_StockEvents_' + i });
                        var stockEventDate = this.dateParse(stockEvent.date).getTime();
                        if (helper_1.withIn(stockEventDate, series.xAxis.visibleRange)) {
                            if (stockEvent.seriesIndexes.length > 0) {
                                for (var j = 0; j < stockEvent.seriesIndexes.length; j++) {
                                    if (stockEvent.seriesIndexes[j] === series.index) {
                                        stockEventsElementGroup.appendChild(this.creatEventGroup(stockEventElement, series, stockEvent, i, textSize));
                                    }
                                }
                            }
                            else {
                                stockEventsElementGroup.appendChild(this.creatEventGroup(stockEventElement, series, stockEvent, i, textSize));
                            }
                        }
                    }
                }
            }
            return stockEventsElementGroup;
        };
        StockEvents.prototype.creatEventGroup = function (stockEventElement, series, stockEvent, i, textSize) {
            var symbolLocation = this.findClosePoint(series, stockEvent);
            if (!stockEvent.showOnSeries) {
                symbolLocation.y = series.yAxis.rect.y + series.yAxis.rect.height;
            }
            this.symbolLocations[series.index][i] = symbolLocation;
            this.createStockElements(stockEventElement, stockEvent, series, i, symbolLocation, textSize);
            return stockEventElement;
        };
        StockEvents.prototype.findClosePoint = function (series, sEvent) {
            var stockEventDate = this.dateParse(sEvent.date).getTime();
            var closeIndex = this.getClosest(series, stockEventDate);
            var pointData;
            var point;
            var yPixel;
            for (var k = 0; k < series.points.length; k++) {
                point = series.points[k];
                if (closeIndex === point.xValue && point.visible) {
                    pointData = new helper_1.PointData(point, series);
                }
                else if (k !== 0 && k !== series.points.length) {
                    if (closeIndex > series.points[k - 1].xValue && closeIndex < series.points[k + 1].xValue) {
                        pointData = new helper_1.PointData(point, series);
                    }
                }
            }
            var xPixel = series.xAxis.rect.x + helper_1.valueToCoefficient(pointData.point.xValue, series.xAxis) * series.xAxis.rect.width;
            yPixel = helper_1.valueToCoefficient(pointData.point[sEvent.placeAt], series.yAxis) * series.yAxis.rect.height;
            yPixel = (yPixel * -1) + (series.yAxis.rect.y + series.yAxis.rect.height);
            return new helper_1.ChartLocation(xPixel, yPixel);
        };
        StockEvents.prototype.createStockElements = function (stockEventElement, stockEve, series, i, symbolLocation, textSize) {
            var result = new ej2_svg_base_1.Size(textSize.width > 20 ? textSize.width : 20, textSize.height > 20 ? textSize.height : 20);
            var pathString;
            var pathOption;
            var lx = symbolLocation.x;
            var ly = symbolLocation.y;
            var stockId = this.chartId + '_Series_' + series.index + '_StockEvents_' + i;
            var border = stockEve.border;
            switch (stockEve.type) {
                case 'Flag':
                case 'Circle':
                case 'Square':
                    stockEventElement.appendChild(helper_1.drawSymbol(new helper_1.ChartLocation(lx, ly), 'Circle', new ej2_svg_base_1.Size(2, 2), '', new ej2_svg_base_1.PathOption(stockId + '_Circle', 'transparent', border.width, border.color), this.dateParse(stockEve.date).toISOString()));
                    stockEventElement.appendChild(helper_1.drawSymbol(new helper_1.ChartLocation(lx, ly - 5), 'VerticalLine', new ej2_svg_base_1.Size(9, 9), '', new ej2_svg_base_1.PathOption(stockId + '_Path', border.color, border.width, border.color), this.dateParse(stockEve.date).toISOString()));
                    stockEventElement.appendChild(helper_1.drawSymbol(new helper_1.ChartLocation(stockEve.type !== 'Flag' ? lx : lx + result.width / 2, ly - result.height), stockEve.type, result, '', new ej2_svg_base_1.PathOption(stockId + '_Shape', stockEve.background, border.width, border.color), this.dateParse(stockEve.date).toISOString()));
                    helper_1.textElement(this.stockChart.renderer, new ej2_svg_base_1.TextOption(stockId + '_Text', stockEve.type !== 'Flag' ? symbolLocation.x : symbolLocation.x + result.width / 2, (symbolLocation.y - result.height), 'middle', stockEve.text, '', 'middle'), stockEve.textStyle, stockEve.textStyle.color, stockEventElement);
                    break;
                case 'ArrowUp':
                case 'ArrowDown':
                case 'ArrowRight':
                case 'ArrowLeft':
                    pathString = 'M' + ' ' + lx + ' ' + ly + ' ' + this.findArrowpaths(stockEve.type);
                    pathOption = new ej2_svg_base_1.PathOption(stockId + '_Shape', stockEve.background, border.width, border.color, 1, '', pathString);
                    stockEventElement.appendChild(this.stockChart.renderer.drawPath(pathOption));
                    break;
                case 'Triangle':
                case 'InvertedTriangle':
                    result.height = 3 * textSize.height;
                    result.width = textSize.width + (1.5 * textSize.width);
                    stockEventElement.appendChild(helper_1.drawSymbol(new helper_1.ChartLocation(symbolLocation.x, symbolLocation.y), stockEve.type, new ej2_svg_base_1.Size(20, 20), '', new ej2_svg_base_1.PathOption(stockId + '_Shape', stockEve.background, border.width, border.color), this.dateParse(stockEve.date).toISOString()));
                    helper_1.textElement(this.stockChart.renderer, new ej2_svg_base_1.TextOption(stockId + '_Text', symbolLocation.x, symbolLocation.y, 'middle', stockEve.text, '', 'middle'), stockEve.textStyle, stockEve.textStyle.color, stockEventElement);
                    break;
                case 'Text':
                    textSize.height += 8;
                    pathString = 'M' + ' ' + (lx) + ' ' + (ly) + ' ' +
                        'L' + ' ' + (lx - 5) + ' ' + (ly - 5) + ' ' +
                        'L' + ' ' + (lx - ((textSize.width) / 2)) + ' ' + (ly - 5) + ' ' +
                        'L' + ' ' + (lx - ((textSize.width) / 2)) + ' ' + (ly - textSize.height) + ' ' +
                        'L' + ' ' + (lx + ((textSize.width) / 2)) + ' ' + (ly - textSize.height) + ' ' +
                        'L' + ' ' + (lx + ((textSize.width) / 2)) + ' ' + (ly - 5) + ' ' +
                        'L' + ' ' + (lx + 5) + ' ' + (ly - 5) + ' ' + 'Z';
                    pathOption = new ej2_svg_base_1.PathOption(stockId + '_Shape', stockEve.background, border.width, border.color, 1, '', pathString);
                    stockEventElement.appendChild(this.stockChart.renderer.drawPath(pathOption));
                    helper_1.textElement(this.stockChart.renderer, new ej2_svg_base_1.TextOption(stockId + '_Text', lx, ly - (textSize.height / 2), 'middle', stockEve.text, '', 'middle'), stockEve.textStyle, stockEve.textStyle.color, stockEventElement);
                    break;
                default:
                    pathString = 'M' + ' ' + lx + ' ' + ly + ' ' +
                        'L' + ' ' + (lx - ((textSize.width) / 2)) + ' ' + (ly - textSize.height / 3) + ' ' +
                        'L' + ' ' + (lx - ((textSize.width) / 2)) + ' ' + (ly - textSize.height) + ' ' +
                        'L' + ' ' + (lx + ((textSize.width) / 2)) + ' ' + (ly - textSize.height) + ' ' +
                        'L' + ' ' + (lx + ((textSize.width) / 2)) + ' ' + (ly - textSize.height / 3) + ' ' + 'Z';
                    pathOption = new ej2_svg_base_1.PathOption(stockId + '_Shape', stockEve.background, border.width, border.color, 1, '', pathString);
                    stockEventElement.appendChild(this.stockChart.renderer.drawPath(pathOption));
                    helper_1.textElement(this.stockChart.renderer, new ej2_svg_base_1.TextOption(stockId + '_Text', lx, ly - (textSize.height / 2), 'middle', stockEve.text, '', 'middle'), stockEve.textStyle, stockEve.textStyle.color, stockEventElement);
            }
        };
        StockEvents.prototype.renderStockEventTooltip = function (targetId) {
            var seriesIndex = parseInt((targetId.split('_StockEvents_')[0]).split(this.chartId + '_Series_')[1], 10);
            var pointIndex = parseInt(targetId.split('_StockEvents_')[1].replace(/\D+/g, ''), 10);
            var updatedLocation = this.symbolLocations[seriesIndex][pointIndex];
            var pointLocation = new helper_1.ChartLocation(updatedLocation.x, updatedLocation.y + this.stockChart.toolbarHeight + this.stockChart.titleSize.height);
            this.applyHighLights(pointIndex, seriesIndex);
            var svgElement = this.getElement(this.chartId + '_StockEvents_Tooltip_svg');
            var isTooltip = (svgElement && parseInt(svgElement.getAttribute('opacity'), 10) > 0);
            if (!isTooltip) {
                if (helper_1.getElement(this.chartId + '_StockEvents_Tooltip_svg')) {
                    ej2_base_1.remove(helper_1.getElement(this.chartId + '_StockEvents_Tooltip'));
                }
                var tooltipElement = ej2_base_1.createElement('div', {
                    id: this.chartId + '_StockEvents_Tooltip', className: 'ejSVGTooltip',
                    attrs: { 'style': 'pointer-events:none; position:absolute;z-index: 1' }
                });
                helper_1.getElement(this.chartId + '_Secondary_Element').appendChild(tooltipElement);
                this.stockEventTooltip = new ej2_svg_base_1.Tooltip({
                    opacity: 1,
                    header: '', content: [(this.stockChart.stockEvents[pointIndex].description)],
                    enableAnimation: true, location: pointLocation,
                    theme: this.stockChart.theme,
                    inverted: true,
                    areaBounds: this.stockChart.chart.chartAxisLayoutPanel.seriesClipRect
                });
                this.stockEventTooltip.areaBounds.y += this.stockChart.toolbarHeight + this.stockChart.titleSize.height;
                this.stockEventTooltip.appendTo('#' + tooltipElement.id);
            }
            else {
                this.stockEventTooltip.content = [(this.stockChart.stockEvents[pointIndex].description)];
                this.stockEventTooltip.location = pointLocation;
                this.stockEventTooltip.dataBind();
            }
        };
        StockEvents.prototype.removeStockEventTooltip = function (duration) {
            var _this = this;
            var tooltipElement = this.getElement(this.chartId + '_StockEvents_Tooltip');
            this.stopAnimation();
            if (tooltipElement && this.stockEventTooltip) {
                this.toolTipInterval = +setTimeout(function () {
                    _this.stockEventTooltip.fadeOut();
                    _this.removeHighLights();
                }, duration);
            }
        };
        StockEvents.prototype.findArrowpaths = function (type) {
            var arrowString = '';
            switch (type) {
                case 'ArrowUp':
                    arrowString = 'l -10 10 l 5 0 l 0 10 l 10 0 l 0 -10 l 5 0 z';
                    break;
                case 'ArrowDown':
                    arrowString = 'l -10 -10 l 5 0 l 0 -10 l 10 0 l 0 10 l 5 0 z';
                    break;
                case 'ArrowLeft':
                    arrowString = 'l -10 -10 l 0 5 l -10 0 l 0 10 l 10 0 l 0 5 z';
                    break;
                case 'ArrowRight':
                    arrowString = 'l 10 -10 l 0 5 l 10 0 l 0 10 l -10 0 l 0 5 z';
                    break;
            }
            return arrowString;
        };
        StockEvents.prototype.applyHighLights = function (pointIndex, seriesIndex) {
            if (this.pointIndex !== pointIndex || this.seriesIndex !== seriesIndex) {
                this.removeHighLights();
            }
            this.pointIndex = pointIndex;
            this.seriesIndex = seriesIndex;
            var stockId = this.chartId + '_Series_' + seriesIndex + '_StockEvents_' + pointIndex;
            this.setOpacity(stockId + '_Shape', 0.5);
            this.setOpacity(stockId + '_Text', 0.5);
        };
        StockEvents.prototype.removeHighLights = function () {
            var stockId = this.chartId + '_Series_' + this.seriesIndex + '_StockEvents_' + this.pointIndex;
            this.setOpacity(stockId + '_Shape', 1);
            this.setOpacity(stockId + '_Text', 1);
        };
        StockEvents.prototype.setOpacity = function (elementId, opacity) {
            if (helper_1.getElement(elementId)) {
                helper_1.getElement(elementId).setAttribute('opacity', opacity.toString());
            }
        };
        StockEvents.prototype.dateParse = function (value) {
            var dateParser = this.chart.intl.getDateParser({ skeleton: 'full', type: 'dateTime' });
            var dateFormatter = this.chart.intl.getDateFormat({ skeleton: 'full', type: 'dateTime' });
            return new Date((Date.parse(dateParser(dateFormatter(new Date(ej2_data_1.DataUtil.parse.parseJson({ val: value }).val))))));
        };
        return StockEvents;
    }(tooltip_1.BaseTooltip));
    exports.StockEvents = StockEvents;
    function initialArray(numrows, numcols, initial) {
        var arr = [];
        for (var i = 0; i < numrows; ++i) {
            var columns = [];
            for (var j = 0; j < numcols; ++j) {
                columns[j] = initial;
            }
            arr[i] = columns;
        }
        return arr;
    }
});
