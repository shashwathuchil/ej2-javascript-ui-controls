define(["require", "exports", "@syncfusion/ej2-base", "../../../src/chart/chart", "../../../src/chart/legend/legend", "../../../src/chart/series/line-series", "../../../src/chart/series/candle-series", "../../../src/chart/technical-indicators/stochastic-indicator", "../base/events.spec", "../../../src/chart/axis/category-axis", "../../../src/chart/user-interaction/tooltip", "../../../src/chart/user-interaction/crosshair", "../../common.spec", "../../../src/chart/user-interaction/zooming"], function (require, exports, ej2_base_1, chart_1, legend_1, line_series_1, candle_series_1, stochastic_indicator_1, events_spec_1, category_axis_1, tooltip_1, crosshair_1, common_spec_1, zooming_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(legend_1.Legend, line_series_1.LineSeries, candle_series_1.CandleSeries, category_axis_1.Category, tooltip_1.Tooltip, stochastic_indicator_1.StochasticIndicator, crosshair_1.Crosshair, zooming_1.Zoom);
    var singleData = [{ x: 'Jan', low: 40, high: 100, open: 50, close: 70 }];
    var prevent = function () {
    };
    var financialData = [
        { x: 'Jan', high: 125.45, low: 70.23, open: 125.22, close: 90.44 },
        { x: 'Feb', high: 150.99, low: 60.23, open: 120.55, close: 70.90 },
        { x: 'Mar', high: 200.19, low: 130.37, open: 160.13, close: 190.78 },
        { x: 'Apr', high: 160.23, low: 90.16, open: 140.38, close: 110.24 },
        { x: 'May', high: 200.89, low: 100.23, open: 180.90, close: 120.29 },
        { x: 'Jun', high: 100, low: 45, open: 70, close: 50 },
        { x: 'Jul', high: 150, low: 70, open: 140, close: 130 },
        { x: 'Aug', high: 90, low: 60, open: 65, close: 80 },
        { x: 'Sep', high: 225, low: 170, open: 175, close: 220 },
        { x: 'Oct', high: 250, low: 180, open: 223, close: 190 },
        { x: 'Nov', high: 200.12, low: 140.69, open: 160.74, close: 190.28 },
        { x: 'Dec', high: 160.17, low: 90.67, open: 140.26, close: 110.34 }
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
        describe('Stochastic Indicators', function () {
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
                            type: 'Candle', animation: { enable: false }
                        }],
                    indicators: [{
                            type: 'Stochastic',
                            period: 3, animation: { enable: false }
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
            it('stochastic Indicators without series', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    var svg = document.getElementById('containerSeriesGroup0').childNodes.length;
                    expect(svg == 1).toBe(true);
                    var yAxisLabelCollection = document.getElementById('containerAxisLabels1');
                    expect(yAxisLabelCollection.childNodes.length == 7).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('stochastic indicator for a series with 0 points', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    var indicator = document.getElementById('containerIndicatorGroup0');
                    expect(indicator != null).toBe(true);
                    expect(indicator.childNodes.length).toBe(5);
                    done();
                };
                chartObj.indicators[0].seriesName = 'gold';
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('stochastic Indicator for a series with 1 point', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    var indicator = document.getElementById('containerIndicatorGroup0');
                    expect(indicator != null).toBe(true);
                    expect(indicator.childNodes.length).toBe(5);
                    var seriesElements = document.getElementById('containerSeriesGroup0').childNodes.length;
                    expect(seriesElements == 2).toBe(true);
                    done();
                };
                chartObj.series[0].xName = 'x';
                chartObj.series[0].low = 'low';
                chartObj.series[0].high = 'high';
                chartObj.series[0].open = 'open';
                chartObj.series[0].close = 'close';
                chartObj.indicators[0].field = 'Close';
                chartObj.series[0].dataSource = singleData;
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Stochastic indicator for a series with negative points', function (done) {
                loaded = function (args) {
                    var point = document.getElementById('container_Series_0_Point_4');
                    expect(point != null).toBe(true);
                    expect(chartObj.visibleSeries[3].points[2].y).toBe(80);
                    expect(chartObj.visibleSeries[4].points[3].y).toBe(20);
                    expect(point.getAttribute('d') !== null);
                    done();
                    financialData.splice(5, 1);
                    chartObj.series[0].dataSource = financialData;
                };
                financialData.splice(5, 0, { x: 'Negative', low: -10, high: 10, open: -5, close: 5, volume: 10 });
                chartObj.series[0].dataSource = financialData;
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('stochastic indicator for a series with valid points & primary axis', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    var indicator = document.getElementById('containerIndicatorGroup0');
                    expect(indicator != null).toBe(true);
                    expect(indicator.childNodes.length).toBe(5);
                    expect(chartObj.visibleSeries[3].points[0].y).toBe(80);
                    expect(chartObj.visibleSeries[4].points[0].y).toBe(20);
                    expect(chartObj.visibleSeries[1].points[0].x).toBe('Jun');
                    expect(chartObj.visibleSeries[2].points[0].x).toBe('Apr');
                    done();
                };
                chartObj.series[0].dataSource = financialData;
                chartObj.series[0].close = 'close';
                chartObj.indicators[0].kPeriod = 2;
                chartObj.indicators[0].dPeriod = 3;
                chartObj.indicators[0].showZones = true;
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('stochastic indicator with disabled show zones', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    var indicator = document.getElementById('containerIndicatorGroup0');
                    expect(indicator != null).toBe(true);
                    expect(indicator.childNodes.length).toBe(3);
                    var line = document.getElementById('container_Indicator_0_UpperLine');
                    expect(line).toBe(null);
                    line = document.getElementById('container_Indicator_0_LowerLine');
                    expect(line).toBe(null);
                    chartObj.indicators[0].showZones = true;
                    done();
                };
                chartObj.series[0].dataSource = financialData;
                chartObj.series[0].close = 'close';
                chartObj.indicators[0].kPeriod = 2;
                chartObj.indicators[0].dPeriod = 3;
                chartObj.indicators[0].showZones = false;
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('stochastic indicator for a series indicator period ', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    var indicator = document.getElementById('containerIndicatorGroup0');
                    expect(indicator != null).toBe(true);
                    expect(indicator.childNodes.length).toBe(5);
                    expect(chartObj.visibleSeries[3].points[0].y).toBe(80);
                    expect(chartObj.visibleSeries[4].points[0].y).toBe(20);
                    expect(chartObj.visibleSeries[1].points[0].x).toBe('Jul');
                    expect(chartObj.visibleSeries[2].points[0].x).toBe('May');
                    done();
                };
                chartObj.series[0].dataSource = financialData;
                chartObj.indicators[0].period = 4;
                chartObj.series[0].close = 'close';
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('stochastic indicator upperLine appearance ', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    var indicator = document.getElementById('containerIndicatorGroup0');
                    expect(indicator != null).toBe(true);
                    expect(indicator.childNodes.length).toBe(5);
                    expect(indicator.children[3].children[0].getAttribute('stroke') == 'blue').toBe(true);
                    done();
                };
                chartObj.series[0].dataSource = financialData;
                chartObj.indicators[0].upperLine.color = 'blue';
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('stochastic indicator lower appearance ', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    var indicator = document.getElementById('containerIndicatorGroup0');
                    expect(indicator != null).toBe(true);
                    expect(indicator.childNodes.length).toBe(5);
                    expect(indicator.children[4].children[0].getAttribute('stroke') == 'green').toBe(true);
                    done();
                };
                chartObj.series[0].dataSource = financialData;
                chartObj.indicators[0].lowerLine.color = 'green';
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('stochastic indicator showZones ', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    var indicator = document.getElementById('containerIndicatorGroup0');
                    expect(indicator != null).toBe(true);
                    expect(indicator.childNodes.length).toBe(3);
                    done();
                };
                chartObj.series[0].dataSource = financialData;
                chartObj.indicators[0].showZones = false;
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('stochastic indicator signalLine appearance ', function (done) {
                loaded = function (args) {
                    var indicator = document.getElementById('containerIndicatorGroup0');
                    expect(indicator != null).toBe(true);
                    expect(indicator.childNodes.length).toBe(5);
                    expect(indicator.children[1].children[0].getAttribute('stroke') == 'red').toBe(true);
                    done();
                };
                chartObj.series[0].dataSource = financialData;
                chartObj.indicators[0].showZones = true;
                chartObj.indicators[0].fill = 'red';
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('stochastic indicator periodLine appearance ', function (done) {
                loaded = function (args) {
                    var indicator = document.getElementById('containerIndicatorGroup0');
                    expect(indicator != null).toBe(true);
                    expect(indicator.childNodes.length).toBe(5);
                    expect(indicator.children[2].children[0].getAttribute('stroke') == 'yellow').toBe(true);
                    done();
                };
                chartObj.series[0].dataSource = financialData;
                chartObj.indicators[0].periodLine.color = 'yellow';
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('stochastic indicator overbought ', function (done) {
                loaded = function (args) {
                    var indicator = document.getElementById('containerIndicatorGroup0');
                    expect(indicator != null).toBe(true);
                    expect(indicator.childNodes.length).toBe(5);
                    expect(chartObj.visibleSeries[3].points[0].y).toBe(150);
                    done();
                };
                chartObj.series[0].dataSource = financialData;
                chartObj.indicators[0].overBought = 150;
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('stochastic indicator over sold ', function (done) {
                loaded = function (args) {
                    var indicator = document.getElementById('containerIndicatorGroup0');
                    expect(indicator != null).toBe(true);
                    expect(indicator.childNodes.length).toBe(5);
                    expect(chartObj.visibleSeries[4].points[0].y).toBe(30);
                    done();
                };
                chartObj.series[0].dataSource = financialData;
                chartObj.indicators[0].overSold = 30;
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('stochastic indicator with hidden series ', function (done) {
                loaded = function (args) {
                    var indicator = document.getElementById('containerIndicatorGroup0');
                    expect(indicator != null).toBe(true);
                    expect(indicator.childNodes.length).toBe(3);
                    expect(indicator.children[1].getAttribute('stroke') == 'blue').toBe(true);
                    done();
                    chartObj.series[0].visible = true;
                };
                chartObj.series[0].visible = false;
                chartObj.refresh();
                done();
                chartObj.series[0].visible = true;
            });
            it('stochastic indicator for a series with secondary y axis', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('containerAxisLine_2');
                    expect(svg.getAttribute('d').split(' ')[1] == '760.5' || svg.getAttribute('d').split(' ')[1] == '761.5').toBe(true);
                    expect(svg.getAttribute('d').split(' ')[2] == '45.25' || svg.getAttribute('d').split(' ')[2] == '42.25').toBe(true);
                    expect(svg.getAttribute('d').split(' ')[4] == '760.5' || svg.getAttribute('d').split(' ')[4] == '761.5').toBe(true);
                    expect(svg.getAttribute('d').split(' ')[5] == '355.5' || svg.getAttribute('d').split(' ')[5] == '360.5').toBe(true);
                    expect(chartObj.visibleSeries[1].yAxis.name).toBe('secondary');
                    done();
                };
                chartObj.axes = [{ name: 'secondary', minimum: 0, maximum: 125, opposedPosition: true }];
                chartObj.indicators[0].yAxisName = 'secondary';
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('stochastic indicator with opposed position', function (done) {
                loaded = function (args) {
                    var signalLine = document.getElementById('container_Indicator_0_Stochastic');
                    expect((signalLine).getAttribute('d')).not.toBeNull();
                    var svg = document.getElementById('containerAxisLine_0');
                    expect(svg.getAttribute('d').split(' ')[1] == '63.5' || svg.getAttribute('d').split(' ')[1] == '59.5').toBe(true);
                    expect(svg.getAttribute('d').split(' ')[2] == '88.75' || svg.getAttribute('d').split(' ')[2] == '95.75').toBe(true);
                    expect(svg.getAttribute('d').split(' ')[4] == '760.5' || svg.getAttribute('d').split(' ')[4] == '761.5').toBe(true);
                    expect(svg.getAttribute('d').split(' ')[5] == '88.75' || svg.getAttribute('d').split(' ')[5] == '95.75').toBe(true);
                    done();
                };
                chartObj.primaryXAxis.opposedPosition = true;
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('stochastic indicator with secondary axis and plot offset', function (done) {
                loaded = function (args) {
                    var signalLine = document.getElementById('container_Indicator_0_Stochastic');
                    expect(signalLine.getAttribute('d')).not.toBeNull();
                    var point = document.getElementById('containerIndicatorGroup0');
                    expect(point != null).toBe(true);
                    expect(point.getAttribute('transform') == 'translate(103,115.75)');
                    done();
                    chartObj.axes[0].plotOffset = 0;
                };
                chartObj.axes[0].opposedPosition = false;
                chartObj.axes[0].plotOffset = 30;
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('stochastic indicator with tooltip', function (done) {
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_1');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = series.points[1].regions[0].y + parseFloat(chartArea.getAttribute('y')) + element.offsetTop;
                    var x = series.points[1].regions[0].x + parseFloat(chartArea.getAttribute('x')) + element.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    expect(target.getAttribute('aria-label') == 'Feb:150.99:60.23:70.9:120.55').toBe(true);
                    expect(target.getAttribute('opacity') == '0.5').toBe(true);
                    done();
                };
                chartObj.tooltip = { enable: true };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('stochastic indicator with cross hair', function (done) {
                loaded = function (args) {
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var series = chartObj.series[0];
                    var y = series.points[2].regions[0].y + parseFloat(chartArea.getAttribute('y')) + element.offsetTop;
                    var x = series.points[2].regions[0].x + series.points[2].regions[0].width / 2 +
                        parseFloat(chartArea.getAttribute('x')) + element.offsetLeft;
                    trigger.mousemovetEvent(chartArea, Math.ceil(x), Math.ceil(y));
                    var crosshair = document.getElementById('container_svg').childNodes[7];
                    var element1;
                    expect(crosshair.childNodes.length == 3).toBe(true);
                    element1 = crosshair.childNodes[0];
                    expect(element1.getAttribute('d').indexOf(chartArea.getAttribute('x')) > 0).toBe(true);
                    element1 = crosshair.childNodes[1];
                    expect(element1.getAttribute('d').indexOf(chartArea.getAttribute('y')) > 0).toBe(true);
                    expect(crosshair.childNodes[2].childNodes.length == 4).toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[0];
                    expect(element1.getAttribute('d') != '').toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[2];
                    expect(element1.getAttribute('d') != '').toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[1];
                    expect(element1.textContent).toEqual('Mar');
                    element1 = crosshair.childNodes[2].childNodes[3];
                    done();
                };
                chartObj.tooltip = { enable: false };
                chartObj.crosshair = { enable: true, lineType: 'Both' };
                chartObj.primaryXAxis.crosshairTooltip.enable = true;
                chartObj.primaryYAxis.crosshairTooltip.enable = true;
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('stochastic indicator with track ball', function (done) {
                loaded = function (args) {
                    var tooltip;
                    var target = document.getElementById('container_Series_0_Point_1');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = series.points[1].regions[0].y + parseFloat(chartArea.getAttribute('y')) + element.offsetTop;
                    var x = series.points[1].regions[0].x + parseFloat(chartArea.getAttribute('x')) + element.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    var group = tooltip.childNodes[0].childNodes[0];
                    var path = group.childNodes[0];
                    var text1 = group.childNodes[1];
                    var text2 = group.childNodes[2];
                    expect(path.getAttribute('fill') == '#000816').toBe(true);
                    expect(text1.childNodes[0].getAttribute('fill') == '#ffffff').toBe(true);
                    expect(text1.textContent.replace(/\u200E/g, '') == 'FebgoldHigh : 150.99Low : 60.23Open : 120.55Close : 70.9UpperLine : 150LowerLine : 30').toBe(true);
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y + 50));
                    done();
                };
                chartObj.tooltip = { enable: true, shared: true };
                chartObj.crosshair = { enable: true, lineType: 'Vertical' };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('stochastic indicator with mouse wheel  zooming', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    var wheelArgs = {
                        preventDefault: prevent,
                        wheelDelta: 120,
                        detail: 3,
                        clientX: 210,
                        clientY: 300
                    };
                    chartObj.zoomModule.chartMouseWheel(wheelArgs);
                    expect(chartObj.primaryXAxis.zoomFactor.toFixed(2) == '0.72').toBe(true);
                    expect(chartObj.primaryYAxis.zoomFactor.toFixed(2) == '0.72').toBe(true);
                    expect(chartObj.primaryXAxis.zoomPosition.toFixed(2) == '0.08').toBe(true);
                    expect(chartObj.primaryYAxis.zoomPosition.toFixed(2) == '0.02' ||
                        chartObj.primaryYAxis.zoomPosition.toFixed(2) == '0.01').toBe(true);
                    done();
                };
                chartObj.zoomSettings.enableMouseWheelZooming = true;
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('checking  zooming with touch', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    var touchStartArgs;
                    var areaElement = document.getElementById('container_svg');
                    chartObj.chartOnMouseDown(trigger.onTouchStart(areaElement, 608, 189, 504, 289, 504, 289));
                    chartObj.mouseMove(trigger.onTouchMove(areaElement, 728, 389, 404, 289, 404, 189));
                    chartObj.mouseMove(trigger.onTouchMove(areaElement, 748, 129, 304, 289, 304, 289));
                    var content = chartObj.primaryXAxis.zoomFactor.toFixed(2);
                    expect(content == '0.23' || content == '0.17').toBe(true);
                    content = chartObj.primaryYAxis.zoomFactor.toFixed(2);
                    expect(content == '0.63' || content == '0.45').toBe(true);
                    content = chartObj.primaryXAxis.zoomPosition.toFixed(2);
                    expect(content == '0.72' || content == '0.45').toBe(true);
                    chartObj.mouseLeave(trigger.onTouchLeave(areaElement, 748, 129, 304, 289, 304, 289));
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.zoomSettings.enablePinchZooming = true;
                chartObj.dataBind();
            });
            it('stochastic indicator using panels', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('containerIndicatorGroup0');
                    var rect;
                    rect = element.getBoundingClientRect();
                    expect((Math.round(rect.top) === 380) || Math.round(rect.top) === 379).toBe(true);
                    done();
                };
                chartObj.axes = [{ name: 'secondary', opposedPosition: true, rowIndex: 0 }];
                chartObj.rows = [{ height: '30%' }, { height: '70%' }];
                chartObj.indicators[0].yAxisName = 'secondary';
                chartObj.primaryYAxis.rowIndex = 1;
                chartObj.loaded = loaded;
                chartObj.refresh();
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
