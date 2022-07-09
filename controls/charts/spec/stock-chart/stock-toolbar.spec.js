define(["require", "exports", "@syncfusion/ej2-base", "../../src/index", "../../src/stock-chart/index", "./indicatordata.spec", "../chart/base/events.spec", "../common.spec", "../../src/index", "../../src/index", "../../src/index"], function (require, exports, ej2_base_1, index_1, index_2, indicatordata_spec_1, events_spec_1, common_spec_1, index_3, index_4, index_5) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    index_2.StockChart.Inject(index_1.DateTime, index_1.Tooltip, index_1.RangeTooltip, index_4.EmaIndicator, index_4.RsiIndicator, index_4.BollingerBands, index_4.TmaIndicator, index_4.MomentumIndicator, index_4.SmaIndicator, index_4.AtrIndicator);
    index_2.StockChart.Inject(index_3.LineSeries, index_3.CandleSeries, index_5.AccumulationDistributionIndicator, index_5.MacdIndicator, index_5.StochasticIndicator);
    describe('Stock chart', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('default stock chart', function () {
            var chart;
            var chartElement = ej2_base_1.createElement('div', { id: 'stock1' });
            var trigger = new events_spec_1.MouseEvents();
            var element;
            var list;
            document.body.appendChild(chartElement);
            beforeAll(function () {
                chart = new index_2.StockChart({
                    primaryXAxis: { valueType: 'DateTime' },
                    series: [{
                            xName: 'x', high: 'high', low: 'low', open: 'open', close: 'close', volume: 'volume',
                            dataSource: indicatordata_spec_1.chartData, type: 'Candle', yName: 'close', name: 'Apple Inc',
                        }],
                    enablePeriodSelector: true
                });
                chart.appendTo('#stock1');
            });
            afterAll(function () {
                chart.destroy();
                chartElement.remove();
            });
            it('checking with Series button click', function (done) {
                element = document.getElementById('stock1_seriesType');
                trigger.clickEvent(element);
                list = document.getElementsByClassName('e-item')[0];
                done();
            });
            it('checking with Hilo series selection', function (done) {
                list = document.getElementsByClassName('e-item')[1];
                trigger.clickEvent(list);
                expect(chart.series[0].type == 'Hilo').toBe(true);
                done();
            });
            it('checking with HiloOpenClose series selection', function (done) {
                element = document.getElementById('stock1_seriesType');
                trigger.clickEvent(element);
                list = document.getElementsByClassName('e-item')[2];
                trigger.clickEvent(list);
                expect(chart.series[0].type == 'HiloOpenClose').toBe(true);
                done();
            });
            it('checking with Candle series selection', function (done) {
                element = document.getElementById('stock1_seriesType');
                trigger.clickEvent(element);
                list = document.getElementsByClassName('e-item')[3];
                trigger.clickEvent(list);
                expect(chart.series[0].type == 'Candle').toBe(true);
                expect(chart.series[0].enableSolidCandles == false).toBe(true);
                done();
            });
            it('checking with Spline series selection', function (done) {
                element = document.getElementById('stock1_seriesType');
                trigger.clickEvent(element);
                list = document.getElementsByClassName('e-item')[4];
                trigger.clickEvent(list);
                expect(chart.series[0].type == 'Spline').toBe(true);
                done();
            });
            it('checking with Candle series selection', function (done) {
                element = document.getElementById('stock1_seriesType');
                trigger.clickEvent(element);
                list = document.getElementsByClassName('e-item')[5];
                trigger.clickEvent(list);
                expect(chart.series[0].type == 'Candle').toBe(true);
                done();
            });
            it('checking with Ema Indicator selection', function (done) {
                element = document.getElementById('stock1_indicatorType');
                trigger.clickEvent(element);
                list = document.getElementsByClassName('e-item')[0];
                trigger.clickEvent(list);
                expect(chart.indicators[0].type == 'Ema').toBe(true);
                done();
            });
            it('checking with Tma Indicator selection', function (done) {
                element = document.getElementById('stock1_indicatorType');
                trigger.clickEvent(element);
                list = document.getElementsByClassName('e-item')[1];
                trigger.clickEvent(list);
                expect(chart.indicators[1].type == 'Tma').toBe(true);
                done();
            });
            it('checking with Sma Indicator selection', function (done) {
                element = document.getElementById('stock1_indicatorType');
                trigger.clickEvent(element);
                list = document.getElementsByClassName('e-item')[2];
                trigger.clickEvent(list);
                expect(chart.indicators[2].type == 'Sma').toBe(true);
                done();
            });
            it('checking with Momentum Indicator selection', function (done) {
                element = document.getElementById('stock1_indicatorType');
                trigger.clickEvent(element);
                list = document.getElementsByClassName('e-item')[3];
                trigger.clickEvent(list);
                expect(chart.indicators[3].type == 'Momentum').toBe(true);
                done();
            });
            it('checking with Atr Indicator selection', function (done) {
                element = document.getElementById('stock1_indicatorType');
                trigger.clickEvent(element);
                list = document.getElementsByClassName('e-item')[4];
                trigger.clickEvent(list);
                expect(chart.indicators[4].type == 'Atr').toBe(true);
                done();
            });
            it('checking with AccumulationDistribution Indicator selection', function (done) {
                element = document.getElementById('stock1_indicatorType');
                trigger.clickEvent(element);
                list = document.getElementsByClassName('e-item')[5];
                trigger.clickEvent(list);
                expect(chart.indicators[5].type == 'AccumulationDistribution').toBe(true);
                done();
            });
            it('checking with BollingerBands Indicator selection', function (done) {
                element = document.getElementById('stock1_indicatorType');
                trigger.clickEvent(element);
                list = document.getElementsByClassName('e-item')[6];
                trigger.clickEvent(list);
                expect(chart.indicators[6].type == 'BollingerBands').toBe(true);
                done();
            });
            it('checking with Macd Indicator selection', function (done) {
                element = document.getElementById('stock1_indicatorType');
                trigger.clickEvent(element);
                list = document.getElementsByClassName('e-item')[7];
                trigger.clickEvent(list);
                expect(chart.indicators[7].type == 'Macd').toBe(true);
                done();
            });
            it('checking with Stochastic Indicator selection', function (done) {
                element = document.getElementById('stock1_indicatorType');
                trigger.clickEvent(element);
                list = document.getElementsByClassName('e-item')[8];
                trigger.clickEvent(list);
                expect(chart.indicators[8].type == 'Stochastic').toBe(true);
                done();
            });
            it('checking with Rsi Indicator selection', function (done) {
                element = document.getElementById('stock1_indicatorType');
                trigger.clickEvent(element);
                list = document.getElementsByClassName('e-item')[9];
                trigger.clickEvent(list);
                expect(chart.indicators[9].type == 'Rsi').toBe(true);
                done();
            });
            it('checking with tick mark in Ema Indicator while selected', function (done) {
                element = document.getElementById('stock1_indicatorType');
                trigger.clickEvent(element);
                list = document.getElementsByClassName('e-item')[0];
                expect(list.textContent !== 'Ema').toBe(true);
                done();
            });
            it('checking with tick mark in Ema Indicator while unselected', function (done) {
                list = document.getElementsByClassName('e-item')[0];
                trigger.clickEvent(list);
                expect(list.textContent !== 'Ema').toBe(true);
                done();
            });
            it('checking with tick mark in Macd Indicator while unselected', function (done) {
                element = document.getElementById('stock1_indicatorType');
                trigger.clickEvent(element);
                list = document.getElementsByClassName('e-item')[7];
                trigger.clickEvent(list);
                expect(list.textContent !== 'Macd').toBe(true);
                done();
            });
            it('checking with export type', function (done) {
                element = document.getElementById('stock1_export');
                trigger.clickEvent(element);
                list = document.getElementsByClassName('e-item')[0];
                done();
            });
            it('checking with print type', function (done) {
                element = document.getElementById('stock1_print');
                expect(element.textContent == 'Print').toBe(true);
                done();
            });
            it('checking with reset', function (done) {
                element = document.getElementById('stock1_reset');
                trigger.clickEvent(element);
                expect(chart.series[0].type == 'Candle').toBe(true);
                done();
            });
            it('checking with periodselector', function (done) {
                chart.loaded = function (args) {
                    element = document.getElementById('stock1_indicatorType');
                    trigger.clickEvent(element);
                    expect(chart.series[0].type == 'Candle').toBe(true);
                    done();
                };
                chart.periods = [{ text: 'all', selected: true }];
                chart.refresh();
            });
            it('checking with periodselector', function (done) {
                chart.loaded = function (args) {
                    element = document.getElementById('stock1_indicatorType');
                    trigger.clickEvent(element);
                    expect(chart.series[0].type == 'Candle').toBe(true);
                    done();
                };
                chart.periods = [{ text: '3M', selected: true }];
                chart.refresh();
            });
        });
        it('memory leak', function () {
            common_spec_1.profile.sample();
            var average = common_spec_1.inMB(common_spec_1.profile.averageChange);
            expect(average).toBeLessThan(10);
            var memory = common_spec_1.inMB(common_spec_1.getMemoryProfile());
            expect(memory).toBeLessThan(common_spec_1.profile.samples[0] + 0.25);
        });
    });
});
