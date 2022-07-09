define(["require", "exports", "@syncfusion/ej2-base", "../../../src/chart/chart", "../../../src/chart/legend/legend", "../../../src/chart/series/line-series", "../../../src/chart/series/candle-series", "../../../src/chart/technical-indicators/sma-indicator", "../../../src/chart/user-interaction/tooltip", "../../../src/chart/user-interaction/crosshair", "../base/events.spec", "../../../src/chart/axis/category-axis", "../../common.spec"], function (require, exports, ej2_base_1, chart_1, legend_1, line_series_1, candle_series_1, sma_indicator_1, tooltip_1, crosshair_1, events_spec_1, category_axis_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(legend_1.Legend, sma_indicator_1.SmaIndicator, line_series_1.LineSeries, candle_series_1.CandleSeries, category_axis_1.Category, tooltip_1.Tooltip, crosshair_1.Crosshair);
    var prevent = function () {
    };
    var animationComplete;
    var singleData = [{ x: 'Jan', low: 40, high: 100, open: 50, close: 70 }];
    var financialData = [
        { x: 'Jan', low: 0.7, high: 6.1, open: 5, close: 2 },
        { x: 'Feb', low: 1.3, high: 6.3, open: 4.8, close: 2.5 },
        { x: 'Mar', low: 1.9, high: 8.5, open: 7, close: 4 },
        { x: 'Apr', low: 3.1, high: 10.8, open: 8, close: 4.2 },
        { x: 'May', low: 5.7, high: 14.40, open: 12.20, close: 7 },
        { x: 'Jun', low: 8.4, high: 16.90, open: 15, close: 10 },
        { x: 'Jul', low: 10.6, high: 19.20, open: 15.6, close: 13 },
        { x: 'Aug', low: 10.5, high: 18.9, open: 14, close: 12 },
        { x: 'Sep', low: 8.5, high: 16.1, open: 13, close: 9 },
        { x: 'Oct', low: 6.0, high: 12.5, open: 10, close: 7.8 },
        { x: 'Nov', low: 1.5, high: 6.9, open: 5.6, close: 3.8 },
        { x: 'Dec', low: 5.1, high: 12.1, open: 8, close: 10.34 }
    ];
    describe('Chart', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        var element;
        describe('Independent Technical Indicators', function () {
            var chartObj;
            var loaded;
            var trigger = new events_spec_1.MouseEvents();
            element = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(element);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis', valueType: 'Category' },
                    primaryYAxis: { title: 'PrimaryYAxis' },
                    series: [{
                            name: 'gold',
                            type: 'Candle',
                            animation: { enable: false },
                            dataSource: financialData,
                            xName: 'x', high: 'high', low: 'low', open: 'open', close: 'close'
                        }],
                    indicators: [{
                            type: 'Sma',
                            period: 3,
                            animation: { enable: false }
                        }],
                    width: '800',
                    title: 'Chart TS Title'
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                document.getElementById('container').remove();
            });
            it('Technical Indicators without data source', function (done) {
                loaded = function (args) {
                    var indicator = document.getElementById('containerIndicatorGroup0');
                    expect(indicator != null).toBe(true);
                    expect(indicator.childNodes.length).toBe(2);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Technical Indicators with datasource and without fields', function (done) {
                loaded = function (args) {
                    var indicator = document.getElementById('containerIndicatorGroup0');
                    expect(indicator != null).toBe(true);
                    expect(indicator.childNodes.length).toBe(2);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.indicators[0].dataSource = financialData;
                chartObj.refresh();
            });
            it('Technical Indicators with valid data source', function (done) {
                loaded = function (args) {
                    var signalLine = document.getElementById('container_Indicator_0_SMA');
                    expect(signalLine.getAttribute('d')).not.toBeNull();
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                chartObj.indicators[0].dataSource = financialData;
                chartObj.indicators[0].open = 'open';
                chartObj.indicators[0].close = 'close';
                chartObj.indicators[0].high = 'high';
                chartObj.indicators[0].low = 'low';
                chartObj.indicators[0].xName = 'x';
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
