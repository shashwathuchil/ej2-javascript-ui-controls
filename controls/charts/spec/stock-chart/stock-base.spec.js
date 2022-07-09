define(["require", "exports", "@syncfusion/ej2-base", "../../src/index", "../../src/stock-chart/index", "./indicatordata.spec", "../chart/base/events.spec", "../common.spec"], function (require, exports, ej2_base_1, index_1, index_2, indicatordata_spec_1, events_spec_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    index_2.StockChart.Inject(index_1.CandleSeries, index_1.DateTime, index_1.Tooltip, index_1.RangeTooltip, index_1.Zoom);
    describe('Stock Chart', function () {
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
            var chartElement = ej2_base_1.createElement('div', { id: 'stock' });
            var trigger = new events_spec_1.MouseEvents();
            var element;
            var prevent = function () {
            };
            beforeAll(function () {
                document.body.appendChild(chartElement);
                chart = new index_2.StockChart({
                    primaryXAxis: { valueType: 'DateTime' },
                    series: [{
                            xName: 'x', high: 'high', low: 'low', open: 'open', close: 'close',
                            dataSource: indicatordata_spec_1.chartData, type: 'Candle', yName: 'close'
                        }],
                    legendSettings: { visible: false },
                });
            });
            afterAll(function () {
                chart.destroy();
                chartElement.remove();
            });
            it('Checking accumulation instance creation', function (done) {
                chart.loaded = function (args) {
                    expect(chart != null).toBe(true);
                    done();
                };
                chart.appendTo('#stock');
            });
            it('empty options control class names', function () {
                element = index_1.getElement(chartElement.id);
                expect(element.classList.contains('e-control')).toBe(true);
                expect(element.classList.contains('e-stockchart')).toBe(true);
            });
            it('checking with disabling period selector', function (done) {
                chart.loaded = function (args) {
                    element = index_1.getElement('stock_Secondary_Element');
                    expect(element.childElementCount).toEqual(0);
                    done();
                };
                chart.series = [{
                        xName: 'x', high: 'high', low: 'low', open: 'open', close: 'close',
                        dataSource: indicatordata_spec_1.chartData, type: 'Candle', yName: 'close'
                    }];
                chart.enablePeriodSelector = false;
                chart.refresh();
            });
            it('checking with disabling range selector', function (done) {
                chart.loaded = function (args) {
                    element = index_1.getElement('stock_stockChart_svg');
                    expect(element.childElementCount).toEqual(1);
                    done();
                };
                chart.series = [{
                        xName: 'x', high: 'high', low: 'low', open: 'open', close: 'close',
                        dataSource: indicatordata_spec_1.chartData, type: 'Candle', yName: 'close'
                    }];
                chart.enableSelector = false;
                chart.refresh();
            });
            it('checking with enabling period selector with default periods', function (done) {
                chart.loaded = function (args) {
                    element = index_1.getElement('stock_selector');
                    expect(element.childElementCount).toEqual(1);
                    done();
                };
                chart.enablePeriodSelector = true;
                chart.enableSelector = true;
                chart.series = [{
                        xName: 'x', high: 'high', low: 'low', open: 'open', close: 'close',
                        dataSource: indicatordata_spec_1.chartData, type: 'Candle', yName: 'close'
                    }];
                chart.refresh();
            });
            it('checking with tooltip', function (done) {
                chart.loaded = function (args) {
                    done();
                };
                chart.tooltip = { enable: true, shared: true };
                chart.series = [{
                        xName: 'x', high: 'high', low: 'low', open: 'open', close: 'close',
                        dataSource: indicatordata_spec_1.chartData, type: 'Candle', yName: 'close'
                    }];
                chart.refresh();
            });
            it('checking with tooltip with formats', function (done) {
                chart.loaded = function (args) {
                    done();
                };
                chart.series = [{
                        xName: 'x', high: 'high', low: 'low', open: 'open', close: 'close',
                        dataSource: indicatordata_spec_1.chartData, type: 'Candle', yName: 'close'
                    }];
                chart.tooltip = { enable: true, shared: true, header: '${point.x}', format: '${point.x}' };
                chart.refresh();
            });
            it('checked with custom periods', function (done) {
                chart.loaded = function (args) {
                    done();
                };
                chart.series = [{
                        xName: 'x', high: 'high', low: 'low', open: 'open', close: 'close',
                        dataSource: indicatordata_spec_1.chartData, type: 'Candle', yName: 'close'
                    }];
                chart.periods = [{ interval: 1, intervalType: 'Years', text: '1M' }, { interval: 2, intervalType: 'Years', text: '2M' },
                    { text: 'ytd', selected: true }];
                chart.refresh();
            });
            it('checked with title', function (done) {
                chart.loaded = function (args) {
                    done();
                };
                chart.series = [{
                        xName: 'x', high: 'high', low: 'low', open: 'open', close: 'close',
                        dataSource: indicatordata_spec_1.chartData, type: 'Candle', yName: 'close'
                    }];
                chart.refresh();
            });
            it('checked without title', function (done) {
                chart.loaded = function (args) {
                    element = index_1.getElement('stock_stockChart_Title');
                    expect(element).toEqual(null);
                    done();
                };
                chart.title = '';
                chart.series = [{
                        xName: 'x', high: 'high', low: 'low', open: 'open', close: 'close',
                        dataSource: indicatordata_spec_1.chartData, type: 'Candle', yName: 'close'
                    }];
                chart.refresh();
            });
            it('Checking with panning mouse events', function (done) {
                var elem = index_1.getElement('stock_stockChart_chart');
                chart.loaded = function (args) {
                    chart.loaded = null;
                    var previousRange = chart.chart.primaryXAxis.visibleRange;
                    var resetElement = document.getElementById('stock_Zooming_Reset');
                    expect(resetElement == null).toBe(true);
                    chart.primaryXAxis.zoomFactor = 1;
                    var eventObj = {
                        target: elem,
                        type: 'mousedown',
                        stopImmediatePropagation: prevent,
                        pageX: 50,
                        pageY: 50,
                        clientX: 50,
                        clientY: 250
                    };
                    chart.stockChartOnMouseDown(eventObj);
                    eventObj = {
                        target: elem,
                        type: 'mousemove',
                        stopImmediatePropagation: prevent,
                        pageX: 100,
                        pageY: 350,
                        clientX: 100,
                        clientY: 350
                    };
                    chart.stockChartOnMouseMove(eventObj);
                    var currentRange = chart.chart.primaryXAxis.visibleRange;
                    eventObj = {
                        target: elem,
                        type: 'mouseend',
                        stopImmediatePropagation: prevent,
                        pageX: 100,
                        pageY: 350,
                        clientX: 100,
                        clientY: 350
                    };
                    chart.stockChartMouseEnd(eventObj);
                    done();
                };
                chart.series = [{
                        xName: 'x', high: 'high', low: 'low', open: 'open', close: 'close',
                        dataSource: indicatordata_spec_1.chartData, type: 'Candle', yName: 'close'
                    }];
                chart.zoomSettings = { enableSelectionZooming: true, enablePan: true };
                chart.refresh();
            });
            it('Checking with panning touch events', function (done) {
                var elem = index_1.getElement('stock_stockChart_chart');
                chart.loaded = function (args) {
                    chart.loaded = null;
                    var previousRange = chart.chart.primaryXAxis.visibleRange;
                    var resetElement = document.getElementById('stock_Zooming_Reset');
                    expect(resetElement == null).toBe(true);
                    chart.primaryXAxis.zoomFactor = 1;
                    var eventObj = {
                        target: elem,
                        type: 'touchstart',
                        stopImmediatePropagation: prevent,
                        pageX: 50,
                        pageY: 50,
                        clientX: 50,
                        clientY: 250,
                        changedTouches: [{ clientX: 100, clientY: 350 }]
                    };
                    chart.stockChartOnMouseDown(eventObj);
                    eventObj = {
                        target: elem,
                        type: 'touchmove',
                        stopImmediatePropagation: prevent,
                        pageX: 100,
                        pageY: 350,
                        clientX: 100,
                        clientY: 350,
                        changedTouches: [{ clientX: 200, clientY: 350 }]
                    };
                    chart.stockChartOnMouseMove(eventObj);
                    var currentRange = chart.chart.primaryXAxis.visibleRange;
                    eventObj = {
                        target: elem,
                        type: 'touchend',
                        stopImmediatePropagation: prevent,
                        pageX: 100,
                        pageY: 350,
                        clientX: 100,
                        clientY: 350,
                        changedTouches: [{ clientX: 210, clientY: 350 }]
                    };
                    chart.stockChartMouseEnd(eventObj);
                    done();
                };
                chart.series = [{
                        xName: 'x', high: 'high', low: 'low', open: 'open', close: 'close',
                        dataSource: indicatordata_spec_1.chartData, type: 'Candle', yName: 'close'
                    }];
                chart.zoomSettings = { enableSelectionZooming: true, enablePan: true };
                chart.refresh();
            });
            it('Checking with panning touch leave', function (done) {
                var elem = index_1.getElement('stock_stockChart_chart');
                chart.loaded = function (args) {
                    chart.loaded = null;
                    var previousRange = chart.chart.primaryXAxis.visibleRange;
                    var resetElement = document.getElementById('stock_Zooming_Reset');
                    expect(resetElement == null).toBe(true);
                    chart.primaryXAxis.zoomFactor = 1;
                    var eventObj = {
                        target: elem,
                        type: 'touchstart',
                        stopImmediatePropagation: prevent,
                        pageX: 50,
                        pageY: 50,
                        clientX: 50,
                        clientY: 250,
                        changedTouches: [{ clientX: 80, clientY: 350 }]
                    };
                    chart.stockChartOnMouseDown(eventObj);
                    eventObj = {
                        target: elem,
                        type: 'touchmove',
                        stopImmediatePropagation: prevent,
                        pageX: 100,
                        pageY: 350,
                        clientX: 100,
                        clientY: 350,
                        changedTouches: [{ clientX: 100, clientY: 350 }]
                    };
                    chart.stockChartOnMouseMove(eventObj);
                    var currentRange = chart.chart.primaryXAxis.visibleRange;
                    eventObj = {
                        target: elem,
                        type: 'touchleave',
                        stopImmediatePropagation: prevent,
                        pageX: 100,
                        pageY: 350,
                        clientX: 100,
                        clientY: 350,
                        changedTouches: [{ clientX: 100, clientY: 350 }]
                    };
                    chart.stockChartMouseEnd(eventObj);
                    done();
                };
                chart.series = [{
                        xName: 'x', high: 'high', low: 'low', open: 'open', close: 'close',
                        dataSource: indicatordata_spec_1.chartData, type: 'Candle', yName: 'close'
                    }];
                chart.zoomSettings = { enableSelectionZooming: true, enablePan: true };
                chart.refresh();
            });
            it('Checking mouse wheel as forward ', function (done) {
                chart.loaded = function (args) {
                    chart.loaded = null;
                    var wheelArgs = {
                        preventDefault: prevent,
                        wheelDelta: 120,
                        detail: 3,
                        clientX: 210,
                        clientY: 100,
                    };
                    chart.chart.zoomModule.chartMouseWheel(wheelArgs);
                    done();
                };
                chart.zoomSettings.enableMouseWheelZooming = true;
                chart.series = [{
                        xName: 'x', high: 'high', low: 'low', open: 'open', close: 'close',
                        dataSource: indicatordata_spec_1.chartData, type: 'Candle', yName: 'close'
                    }];
                chart.refresh();
            });
            it('Checking button click with selector', function (done) {
                chart.loaded = function (args) {
                    var element = document.getElementsByClassName('e-hscroll-content')[0].children[0].children[4].firstElementChild;
                    trigger.clickEvent(element);
                    done();
                };
                chart.series = [{
                        xName: 'x', high: 'high', low: 'low', open: 'open', close: 'close',
                        dataSource: indicatordata_spec_1.chartData, type: 'Candle', yName: 'close'
                    }];
                chart.enableSelector = false;
                chart.refresh();
            });
            it('checked with rangeChange event', function (done) {
                chart.rangeChange = function (args) {
                    var data = [{
                            x: new Date('2012-04-02'),
                            open: 85.9757,
                            high: 90.6657,
                            low: 85.7685,
                            close: 90.5257,
                            volume: 660187068
                        },
                        {
                            x: new Date('2012-04-09'),
                            open: 89.4471,
                            high: 92,
                            low: 86.2157,
                            close: 86.4614,
                            volume: 912634864
                        },
                        {
                            x: new Date('2012-04-16'),
                            open: 87.1514,
                            high: 88.6071,
                            low: 81.4885,
                            close: 81.8543,
                            volume: 1221746066
                        },
                        {
                            x: new Date('2012-04-23'),
                            open: 81.5157,
                            high: 88.2857,
                            low: 79.2857,
                            close: 86.1428,
                            volume: 965935749
                        },
                        {
                            x: new Date('2012-04-30'),
                            open: 85.4,
                            high: 85.4857,
                            low: 80.7385,
                            close: 80.75,
                            volume: 615249365
                        },
                        {
                            x: new Date('2012-05-07'),
                            open: 80.2143,
                            high: 82.2685,
                            low: 79.8185,
                            close: 80.9585,
                            volume: 541742692
                        },
                        {
                            x: new Date('2012-05-14'),
                            open: 80.3671,
                            high: 81.0728,
                            low: 74.5971,
                            close: 75.7685,
                            volume: 708126233
                        },
                        {
                            x: new Date('2012-05-21'),
                            open: 76.3571,
                            high: 82.3571,
                            low: 76.2928,
                            close: 80.3271,
                            volume: 682076215
                        }
                    ];
                    args.data = data;
                    done();
                };
                chart.title = '';
                chart.enableSelector = true;
                chart.series = [{
                        xName: 'x', high: 'high', low: 'low', open: 'open', close: 'close',
                        dataSource: indicatordata_spec_1.chartData, type: 'Candle', yName: 'close'
                    }];
                chart.loaded = function (args) {
                    var element = chart.series[0].dataSource.length;
                    done();
                };
                chart.refresh();
            });
            it('checked with annotation content in chart', function (done) {
                chart.loaded = function (args) {
                    var element = document.getElementById('stock_stockChart_chart_Annotation_Collections');
                    expect(element.childElementCount).not.toBe(0);
                    done();
                };
                chart.annotations = [{ content: '<div>StockChart</div>' }];
                chart.refresh();
            });
            it('Checked series by changing series visible as false', function (done) {
                chart.loaded = function (args) {
                    var element = document.getElementById('stock_stockChart_chartSeriesCollection');
                    expect(element.childElementCount).toBe(1);
                    var rangeElement = document.getElementById('stock_stockChart_rangeSelector_chart');
                    expect(rangeElement.childElementCount).toBe(0);
                    done();
                };
                chart.series = [{
                        xName: 'x', high: 'high', low: 'low', open: 'open', close: 'close',
                        dataSource: indicatordata_spec_1.chartData, type: 'Candle', yName: 'close', visible: false
                    }];
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
