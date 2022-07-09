define(["require", "exports", "@syncfusion/ej2-base", "../../../src/chart/chart", "../../../src/chart/legend/legend", "../../../src/chart/series/line-series", "../../../src/chart/series/column-series", "../../../src/chart/series/candle-series", "../../../src/chart/technical-indicators/macd-indicator", "../base/events.spec", "../../../src/chart/user-interaction/tooltip", "../../../src/chart/user-interaction/crosshair", "../../../src/chart/axis/category-axis", "../../../src/chart/user-interaction/zooming", "../../common.spec"], function (require, exports, ej2_base_1, chart_1, legend_1, line_series_1, column_series_1, candle_series_1, macd_indicator_1, events_spec_1, tooltip_1, crosshair_1, category_axis_1, zooming_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(zooming_1.Zoom, legend_1.Legend, macd_indicator_1.MacdIndicator, line_series_1.LineSeries, candle_series_1.CandleSeries, category_axis_1.Category, column_series_1.ColumnSeries, tooltip_1.Tooltip, crosshair_1.Crosshair);
    var singleData = [{ x: 'Jan', low: 40, high: 100, open: 50, close: 70 }];
    var financialData = [
        { x: 'Jan', low: 0.7, high: 6.1, open: 5, close: 2, volume: 10 },
        { x: 'Feb', low: 1.3, high: 6.3, open: 4.8, close: 2.5, volume: 10 },
        { x: 'Mar', low: 1.9, high: 8.5, open: 7, close: 4, volume: 10 },
        { x: 'Apr', low: 3.1, high: 10.8, open: 8, close: 4.2, volume: 10 },
        { x: 'May', low: 5.7, high: 14.40, open: 12.10, close: 7, volume: 10 },
        { x: 'Jun', low: 8.4, high: 16.90, open: 15, close: 10, volume: 10 },
        { x: 'Jul', low: 10.6, high: 19.10, open: 15.6, close: 13, volume: 10 },
        { x: 'Aug', low: 10.5, high: 18.9, open: 14, close: 8, volume: 10 },
        { x: 'Sep', low: 8.5, high: 16.1, open: 13, close: 9, volume: 10 },
        { x: 'Oct', low: 6.0, high: 12.5, open: 10, close: 7.8, volume: 10 },
        { x: 'Nov', low: 1.5, high: 6.9, open: 5.6, close: 3.8, volume: 10 },
        { x: 'Dec', low: 5.1, high: 12.1, open: 8, close: 10.34, volume: 10 }
    ];
    var prevent = function () {
    };
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
        describe('Technical Indicators', function () {
            var chartObj;
            var animationComplete;
            var loaded;
            var trigger = new events_spec_1.MouseEvents();
            element = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(element);
                chartObj = new chart_1.Chart({
                    primaryXAxis: {
                        valueType: 'Category',
                    },
                    primaryYAxis: {
                        title: 'PrimaryYAxis',
                    },
                    series: [{
                            name: 'gold',
                            type: 'Candle',
                            animation: { enable: false },
                        }],
                    indicators: [{
                            type: 'Macd',
                            period: 3,
                            fastPeriod: 8,
                            slowPeriod: 5,
                            macdType: 'Both',
                            fill: 'blue',
                            animation: { enable: false },
                        }],
                    loaded: loaded
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                document.getElementById('container').remove();
            });
            it('MACD Technical Indicators without series', function (done) {
                loaded = function (args) {
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                done();
            });
            it('MACD Technical indicator for a series with 0 points', function (done) {
                loaded = function (args) {
                    var indicator = document.getElementById('containerIndicatorGroup0');
                    expect(indicator != null).toBe(true);
                    expect(indicator.childNodes.length).toBe(4);
                    done();
                };
                chartObj.indicators[0].seriesName = 'gold';
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('MACD Technical Indicator for a series with 1 point', function (done) {
                loaded = function (args) {
                    var indicator = document.getElementById('containerIndicatorGroup0');
                    expect(indicator != null).toBe(true);
                    expect(indicator.childNodes.length).toBe(4);
                    done();
                };
                chartObj.series[0].xName = 'x';
                chartObj.series[0].low = 'low';
                chartObj.series[0].high = 'high';
                chartObj.series[0].close = 'close';
                chartObj.series[0].open = 'open';
                chartObj.series[0].yName = 'y';
                chartObj.series[0].volume = 'volume';
                chartObj.indicators[0].field = 'Close';
                chartObj.series[0].dataSource = singleData;
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('MACD Technical indicator for a series with valid points & primary axis', function (done) {
                loaded = function (args) {
                    var signalLine = document.getElementById('container_Indicator_0_MacdLine');
                    expect(signalLine.getAttribute('d')).not.toBeNull();
                    expect(chartObj.visibleSeries.length).toBe(4);
                    expect(chartObj.visibleSeries[1].points[0].x).toBe('Oct');
                    expect(Math.round(chartObj.visibleSeries[1].points[0].y)).toBe(2);
                    done();
                };
                chartObj.series[0].dataSource = financialData;
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('MACD Technical indicator for a series with negative points', function (done) {
                loaded = function (args) {
                    var point = document.getElementById('container_Series_0_Point_4');
                    expect(point != null).toBe(true);
                    expect(chartObj.visibleSeries[0].points[5].x).toBe('Negative');
                    expect(Math.round(chartObj.visibleSeries[1].points[0].y)).toBe(2);
                    expect(Math.round(chartObj.visibleSeries[1].points[1].y)).toBe(2);
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
            it('MACD Technical indicator for a series with secondary y axis', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('containerAxisLine_2');
                    expect(svg.getAttribute('d').split(' ')[1] == '1222.5' || svg.getAttribute('d').split(' ')[1] == '717.5' ||
                        svg.getAttribute('d').split(' ')[1] == '729.5').toBe(true);
                    expect(svg.getAttribute('d').split(' ')[2] == '10.25').toBe(true);
                    expect(svg.getAttribute('d').split(' ')[4] == '1222.5' || svg.getAttribute('d').split(' ')[4] == '717.5' ||
                        svg.getAttribute('d').split(' ')[4] == '729.5').toBe(true);
                    expect(svg.getAttribute('d').split(' ')[5] == '381.5' || svg.getAttribute('d').split(' ')[5] == '379.5').toBe(true);
                    expect(chartObj.visibleSeries[1].yAxis.name).toBe('secondary');
                    done();
                };
                chartObj.axes = [{ name: 'secondary', opposedPosition: true }];
                chartObj.indicators[0].yAxisName = 'secondary';
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('MACD Technical indicator with MACD Type', function (done) {
                loaded = function (args) {
                    var macdLine = document.getElementById('container_Indicator_0_MacdLine');
                    expect(macdLine).not.toBeNull();
                    var histogram = document.getElementById('container_Indicator_0_Histogram_Group');
                    expect(histogram).toBeNull();
                    done();
                    chartObj.series[0].visible = true;
                };
                chartObj.indicators[0].macdType = 'Line';
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('MACD Technical indicator with histogram Type', function (done) {
                loaded = function (args) {
                    var macdLine = document.getElementById('container_Indicator_0_MacdLine');
                    expect(macdLine).toBeNull();
                    var histogram = document.getElementById('container_Indicator_0_Histogram_Group');
                    expect(histogram).not.toBeNull();
                    done();
                    chartObj.series[0].visible = true;
                    chartObj.indicators[0].macdType = 'Both';
                };
                chartObj.indicators[0].macdType = 'Histogram';
                chartObj.loaded = loaded;
                chartObj.refresh();
                done();
                chartObj.series[0].visible = true;
            });
            it('MACD Technical indicator with hidden series', function (done) {
                loaded = function (args) {
                    ;
                    var signalLine = document.getElementById('container_Indicator_0_MacdLine');
                    expect(signalLine.getAttribute('d')).not.toBeNull();
                    done();
                    chartObj.series[0].visible = true;
                };
                chartObj.series[0].visible = false;
                chartObj.loaded = loaded;
                chartObj.refresh();
                done();
                chartObj.series[0].visible = true;
            });
            it('MACD Technical indicator with opposed position', function (done) {
                loaded = function (args) {
                    var signalLine = document.getElementById('container_Indicator_0_MacdLine');
                    expect(signalLine.getAttribute('d')).not.toBeNull();
                    var svg = document.getElementById('containerAxisLine_0');
                    expect(svg.getAttribute('d').split(' ')[1] == '57.5' || svg.getAttribute('d').split(' ')[1] == '53.5').toBe(true);
                    expect(svg.getAttribute('d').split(' ')[2] == '36.75' || svg.getAttribute('d').split(' ')[2] == '35.75').toBe(true);
                    expect(svg.getAttribute('d').split(' ')[4] == '1222.5' || svg.getAttribute('d').split(' ')[4] == '717.5' ||
                        svg.getAttribute('d').split(' ')[4] == '729.5').toBe(true);
                    expect(svg.getAttribute('d').split(' ')[5] == '36.75' || svg.getAttribute('d').split(' ')[5] == '35.75').toBe(true);
                    done();
                };
                chartObj.primaryXAxis.opposedPosition = true;
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('MACD Technical indicator with secondary axis and plot offset', function (done) {
                loaded = function (args) {
                    var signalLine = document.getElementById('container_Indicator_0_MacdLine');
                    expect(signalLine.getAttribute('d')).not.toBeNull();
                    var point = document.getElementById('containerIndicatorGroup0');
                    expect(point != null).toBe(true);
                    expect(point.getAttribute('transform') == 'translate(91,66.75)');
                    done();
                    chartObj.axes[0].plotOffset = 0;
                };
                chartObj.axes[0].opposedPosition = false;
                chartObj.axes[0].plotOffset = 30;
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('MACD Technical indicator with default appearance', function (done) {
                loaded = function (args) {
                    var signalLine = document.getElementById('container_Indicator_0_MACD');
                    expect(signalLine.getAttribute('stroke')).toBe('blue');
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('MACD Technical indicator with custom color', function (done) {
                loaded = function (args) {
                    var signalLine = document.getElementById('container_Indicator_0_MACD');
                    expect(signalLine.getAttribute('stroke')).toBe('orange');
                    done();
                };
                chartObj.indicators[0].fill = 'orange';
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('MACD Technical indicator with custom stroke style', function (done) {
                loaded = function (args) {
                    var signalLine = document.getElementById('container_Indicator_0_MACD');
                    expect(signalLine.getAttribute('stroke-width')).toBe('3');
                    expect(signalLine.getAttribute('stroke-dasharray')).toBe('2,2');
                    done();
                };
                chartObj.indicators[0].width = 3;
                chartObj.indicators[0].dashArray = '2,2';
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('MACD Technical indicator with tooltip', function (done) {
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_1');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = series.points[1].regions[0].y + parseFloat(chartArea.getAttribute('y')) + element.offsetTop;
                    var x = series.points[1].regions[0].x + parseFloat(chartArea.getAttribute('x')) + element.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    expect(target.getAttribute('aria-label') == 'Feb:6.3:1.3:2.5:4.8').toBe(true);
                    expect(target.getAttribute('opacity') == '0.5').toBe(true);
                    done();
                };
                chartObj.tooltip = { enable: true };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('MACD Technical indicator with cross hair', function (done) {
                loaded = function (args) {
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var series = chartObj.series[0];
                    var y = series.points[2].regions[0].y + parseFloat(chartArea.getAttribute('y')) + element.offsetTop;
                    var x = series.points[2].regions[0].x + series.points[2].regions[0].width / 2 +
                        parseFloat(chartArea.getAttribute('x')) + element.offsetLeft;
                    trigger.mousemovetEvent(chartArea, Math.ceil(x), Math.ceil(y));
                    var crosshair = document.getElementById('container_svg').childNodes[3];
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
                    expect(element1.textContent == 'Mar' || element1.textContent == 'Feb').toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[3];
                    expect(Math.round(+element1.textContent) == 6 || element1.textContent == '8.460' ||
                        element1.textContent == '8.474').toBe(true);
                    done();
                };
                chartObj.tooltip = { enable: true };
                chartObj.crosshair = { enable: true, lineType: 'Both' };
                chartObj.primaryXAxis.crosshairTooltip.enable = true;
                chartObj.primaryYAxis.crosshairTooltip.enable = true;
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('MACD Technical indicator with track ball', function (done) {
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
                    expect(text1.textContent.replace(/\u200E/g, '') == 'FebgoldHigh : 6.3Low : 1.3Open : 4.8Close : 2.5').toBe(true);
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y + 50));
                    done();
                };
                chartObj.tooltip = { enable: true, shared: true };
                chartObj.crosshair = { enable: true, lineType: 'Vertical' };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('MACD Technical indicator when resizing the chart', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_svg');
                    expect(svg.clientWidth == 600).toBe(true);
                    done();
                };
                chartObj.tooltip = { enable: true };
                chartObj.crosshair = { enable: true, lineType: 'Vertical' };
                chartObj.width = '600px';
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('checking mouse wheel zooming', function (done) {
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
                    expect(chartObj.primaryXAxis.zoomFactor.toFixed(2) == '1.00' ||
                        chartObj.primaryXAxis.zoomFactor.toFixed(2) == '0.72').toBe(true);
                    expect(chartObj.primaryYAxis.zoomFactor.toFixed(2) == '1.00' ||
                        chartObj.primaryYAxis.zoomFactor.toFixed(2) == '0.72').toBe(true);
                    expect(chartObj.primaryXAxis.zoomPosition.toFixed(2) == '0.00' ||
                        chartObj.primaryXAxis.zoomPosition.toFixed(2) == '0.11').toBe(true);
                    expect(chartObj.primaryYAxis.zoomPosition.toFixed(2) == '0.00' ||
                        chartObj.primaryYAxis.zoomPosition.toFixed(2) == '0.06').toBe(true);
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
                    expect(content == '1.00' || content == '0.23' || content == '0.17').toBe(true);
                    content = chartObj.primaryYAxis.zoomFactor.toFixed(2);
                    expect(content == '1.00' || content == '0.63' || content == '0.45').toBe(true);
                    content = chartObj.primaryXAxis.zoomPosition.toFixed(2);
                    expect(content == '0.00' || content == '0.72' || content == '0.63').toBe(true);
                    chartObj.mouseLeave(trigger.onTouchLeave(areaElement, 748, 129, 304, 289, 304, 289));
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.zoomSettings.enablePinchZooming = true;
                chartObj.dataBind();
            });
            it('MACD Technical indicator using panels', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('containerIndicatorGroup0');
                    var rect;
                    rect = element.getBoundingClientRect();
                    expect(Math.round(rect.top) === 335 || Math.round(rect.top) === 336).toBe(true);
                    chartObj.loaded = null;
                    done();
                };
                chartObj.axes = [{ name: 'secondary', opposedPosition: true, rowIndex: 0 }];
                chartObj.rows = [{ height: '30%' }, { height: '70%' }];
                chartObj.indicators[0].yAxisName = 'secondary';
                chartObj.primaryYAxis.rowIndex = 1;
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking series animationEvent', function (done) {
                animationComplete = function (args) {
                    var point = document.getElementById('containerIndicatorGroup0');
                    expect(point.getAttribute('transform') === 'translate(57.5,295.225)' ||
                        point.getAttribute('transform') === 'translate(53.5,295.625)').toBe(true);
                    done();
                };
                chartObj.animationComplete = animationComplete;
                chartObj.series[0].animation.enable = true;
                chartObj.refresh();
            });
            it('Checking technicalindicators animationEvent', function (done) {
                animationComplete = function (args) {
                    var point = document.getElementById('containerIndicatorGroup0');
                    expect(point.getAttribute('transform') === 'translate(57.5,295.225)' ||
                        point.getAttribute('transform') === 'translate(53.5,295.625)').toBe(true);
                    done();
                };
                chartObj.animationComplete = animationComplete;
                chartObj.indicators[0].animation.enable = true;
                chartObj.refresh();
            });
            it('Checking both series and technical indicators animationEvent', function (done) {
                animationComplete = function (args) {
                    var point = document.getElementById('containerIndicatorGroup0');
                    expect(point.getAttribute('transform') === 'translate(57.5,295.225)' ||
                        point.getAttribute('transform') === 'translate(53.5,295.625)').toBe(true);
                    done();
                };
                chartObj.animationComplete = animationComplete;
                chartObj.series[0].animation.enable = true;
                chartObj.indicators[0].animation.enable = true;
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
