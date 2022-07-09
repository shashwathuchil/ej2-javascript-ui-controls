define(["require", "exports", "../../range-navigator/range-navigator", "@syncfusion/ej2-base", "../../common/utils/helper", "@syncfusion/ej2-svg-base"], function (require, exports, range_navigator_1, ej2_base_1, helper_1, ej2_svg_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RangeSelector = (function () {
        function RangeSelector(stockChart) {
            this.stockChart = stockChart;
        }
        RangeSelector.prototype.initializeRangeNavigator = function () {
            var _this = this;
            var stockChart = this.stockChart;
            if (!stockChart.selectorObject) {
                stockChart.selectorObject = stockChart.renderer.createGroup({
                    id: stockChart.element.id + '_stockChart_rangeSelector',
                    transform: 'translate(' + 0 + ',' + stockChart.cartesianChart.cartesianChartSize.height + ')'
                });
                stockChart.mainObject.appendChild(stockChart.selectorObject);
            }
            else {
                var chartElement = document.getElementById(stockChart.selectorObject.id);
                while (chartElement.firstChild) {
                    chartElement.removeChild(chartElement.firstChild);
                }
                if (helper_1.getElement(stockChart.selectorObject.id + '_leftTooltip')) {
                    ej2_base_1.remove(helper_1.getElement(stockChart.selectorObject.id + '_leftTooltip'));
                }
                if (helper_1.getElement(stockChart.selectorObject.id + '_rightTooltip')) {
                    ej2_base_1.remove(helper_1.getElement(stockChart.selectorObject.id + '_rightTooltip'));
                }
            }
            stockChart.rangeNavigator = new range_navigator_1.RangeNavigator({
                locale: 'en',
                valueType: stockChart.primaryXAxis.valueType,
                theme: this.stockChart.theme,
                series: this.findSeriesCollection(stockChart.series),
                height: this.calculateChartSize().height.toString(),
                value: [new Date(stockChart.startValue), new Date(stockChart.endValue)],
                margin: this.findMargin(),
                tooltip: { enable: stockChart.tooltip.enable, displayMode: 'Always' },
                dataSource: stockChart.dataSource,
                changed: function (args) {
                    var arg = {
                        name: 'rangeChange',
                        end: args.end,
                        selectedData: args.selectedData,
                        start: args.start,
                        zoomFactor: args.zoomFactor,
                        zoomPosition: args.zoomPosition,
                        data: undefined
                    };
                    _this.stockChart.trigger('rangeChange', arg);
                    _this.stockChart.startValue = args.start;
                    _this.stockChart.endValue = args.end;
                    if (!_this.stockChart.zoomChange) {
                        _this.stockChart.cartesianChart.cartesianChartRefresh(_this.stockChart, arg.data);
                    }
                    if (stockChart.periodSelector && stockChart.periodSelector.datePicker) {
                        stockChart.periodSelector.datePicker.startDate = new Date(args.start);
                        stockChart.periodSelector.datePicker.endDate = new Date(args.end);
                        stockChart.periodSelector.datePicker.dataBind();
                    }
                }
            });
            stockChart.rangeNavigator.stockChart = stockChart;
            stockChart.rangeNavigator.appendTo(stockChart.selectorObject);
        };
        RangeSelector.prototype.findMargin = function () {
            var margin = {};
            margin.top = 5;
            margin.left = 0;
            margin.right = 0;
            margin.bottom = 0;
            return margin;
        };
        RangeSelector.prototype.findSeriesCollection = function (series) {
            var chartSeries = [];
            for (var i = 0, len = series.length; i < len; i++) {
                chartSeries.push(series[i]);
                chartSeries[i].xName = series[i].xName;
                chartSeries[i].yName = series[i].yName === '' ? series[i].close : series[i].yName;
            }
            return chartSeries;
        };
        RangeSelector.prototype.calculateChartSize = function () {
            var stockChart = this.stockChart;
            return (new ej2_svg_base_1.Size(stockChart.availableSize.width, (stockChart.enableSelector) ? 80 : 0));
        };
        RangeSelector.prototype.sliderChange = function (start, end) {
            this.stockChart.rangeNavigator.rangeSlider.performAnimation(start, end, this.stockChart.rangeNavigator, 0);
        };
        return RangeSelector;
    }());
    exports.RangeSelector = RangeSelector;
});
