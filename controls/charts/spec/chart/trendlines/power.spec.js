define(["require", "exports", "@syncfusion/ej2-base", "../../../src/chart/chart", "../../../src/chart/legend/legend", "../../../src/chart/series/line-series", "../../../src/chart/series/spline-series", "../../../src/chart/series/scatter-series", "../../../src/chart/user-interaction/tooltip", "../../../src/chart/user-interaction/crosshair", "../base/events.spec", "../../../src/chart/trend-lines/trend-line", "../../../src/chart/axis/category-axis", "../../common.spec"], function (require, exports, ej2_base_1, chart_1, legend_1, line_series_1, spline_series_1, scatter_series_1, tooltip_1, crosshair_1, events_spec_1, trend_line_1, category_axis_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(legend_1.Legend, trend_line_1.Trendlines, line_series_1.LineSeries, spline_series_1.SplineSeries, scatter_series_1.ScatterSeries, category_axis_1.Category, tooltip_1.Tooltip, crosshair_1.Crosshair);
    var prevent = function () {
    };
    var animationComplete;
    var categoyData = [{
            'name': "MTBF", 'dataSource': [{ 'x': "FEB 2018", 'y': 12, "text": " 0 / 1595" },
                { 'x': "MAR 2018", 'y': 12, "text": " 0 / 1607" },
                { 'x': "APR 2018", 'y': 12, "text": " 0 / 1616" },
                { 'x': "MAG 2018", 'y': 12, "text": " 0 / 1620" },
                { 'x': "GIU 2018", 'y': 12, "text": " 0 / 1623" },
                { 'x': "LUG 2018", 'y': 12, "text": " 0 / 1628" },]
        }, {
            "name": "MTBV", 'dataSource': [{ 'x': "FEB 2018", 'y': 0, "text": " 0 / 1595" },
                { 'x': "MAR 2018", 'y': 0, "text": " 0 / 1607" },
                { 'x': "APR 2018", 'y': 0, "text": " 0 / 1616" },
                { 'x': "MAG 2018", 'y': 0, "text": " 0 / 1620" },
                { 'x': "GIU 2018", 'y': 0, "text": " 0 / 1623" },
                { 'x': "LUG 2018", 'y': 0, "text": " 0 / 1628" },]
        }, {
            "name": "MTBC", 'dataSource': [{ 'x': "FEB 2018", 'y': 0, "text": " 0 / 1595" },
                { 'x': "MAR 2018", 'y': 0, "text": " 0 / 1607" },
                { 'x': "APR 2018", 'y': 0, "text": " 0 / 1616" },
                { 'x': "MAG 2018", 'y': 0, "text": " 0 / 1620" },
                { 'x': "GIU 2018", 'y': 0, "text": " 0 / 1623" },
                { 'x': "LUG 2018", 'y': 0, "text": " 0 / 1628" },]
        }];
    var series1 = [
        { x: 1, y: 10 }, { x: 2, y: 50 }, { x: 3, y: 80 }, { x: 4, y: 110 },
        { x: 5, y: 180 }, { x: 6, y: 220 }, { x: 7, y: 300 }, { x: 8, y: 370 }, { x: 9, y: 490 }, { x: 10, y: 500 }
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
        describe('Power Trendlines', function () {
            var chartObj;
            var loaded;
            var trigger = new events_spec_1.MouseEvents();
            element = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(element);
                chartObj = new chart_1.Chart({
                    primaryXAxis: {
                        title: 'Months',
                    },
                    primaryYAxis: {
                        title: 'Rupees against Dollars',
                        interval: 50
                    },
                    height: '600px',
                    width: '850px',
                    series: [{
                            type: 'Scatter',
                            name: 'power',
                            xName: 'x',
                            yName: 'y',
                            animation: { enable: false },
                            dataSource: [],
                            trendlines: []
                        }],
                    title: 'Online trading'
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                document.getElementById('container').remove();
            });
            it('Power Trendlines without series points and with trendline emptycollection', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('containerSeriesGroup0').childNodes.length;
                    expect(svg == 1).toBe(true);
                    var xAxisLabelCollection = document.getElementById('containerAxisLabels0');
                    expect(xAxisLabelCollection.childNodes.length == 11).toBe(true);
                    var yAxisLabelCollection = document.getElementById('containerAxisLabels1');
                    expect(yAxisLabelCollection.childNodes.length == 2).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Power Trendlines without series points and with trendline validcollection', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('containerSeriesGroup0').childNodes.length;
                    expect(svg == 1).toBe(true);
                    var xAxisLabelCollection = document.getElementById('containerAxisLabels0');
                    expect(xAxisLabelCollection.childNodes.length == 11).toBe(true);
                    var yAxisLabelCollection = document.getElementById('containerAxisLabels1');
                    expect(yAxisLabelCollection.childNodes.length == 2).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].trendlines = [{ type: 'Power' }];
                chartObj.refresh();
            });
            it('Power Trendlines with series points and with trendline emptycollection', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('containerSeriesGroup0').childNodes.length;
                    expect(svg == 11).toBe(true);
                    var xAxisLabelCollection = document.getElementById('containerAxisLabels0');
                    expect(xAxisLabelCollection.childNodes.length == 10).toBe(true);
                    var yAxisLabelCollection = document.getElementById('containerAxisLabels1');
                    expect(yAxisLabelCollection.childNodes.length == 12).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = series1;
                chartObj.series[0].trendlines = [];
                chartObj.refresh();
            });
            it('Power Trendlines with series points and with trendline validcollection', function (done) {
                loaded = function (args) {
                    var path = document.getElementById('container_Series_0_TrendLine_0').getAttribute('d');
                    expect(path !== null).toBe(true);
                    expect(chartObj.visibleSeries[1].points[0].x).toBe(1);
                    expect(Math.round(chartObj.visibleSeries[1].points[0].y)).toBe(12);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].trendlines = [{ type: 'Power', animation: { enable: false } }];
                chartObj.refresh();
            });
            it('Power Trendlines with default appearance', function (done) {
                loaded = function (args) {
                    var stroke = document.getElementById('container_Series_0_TrendLine_0').getAttribute('stroke');
                    expect(stroke === 'blue');
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Power Trendlines with custom appearance', function (done) {
                loaded = function (args) {
                    var stroke = document.getElementById('container_Series_0_TrendLine_0').getAttribute('stroke');
                    expect(stroke === 'orange');
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].trendlines[0].fill = 'orange';
                chartObj.refresh();
            });
            it('Power Trendlines with marker', function (done) {
                loaded = function (args) {
                    var markerelement = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(markerelement !== null);
                    var stroke = document.getElementById('container_Series_0_Point_0_Symbol').getAttribute('stroke');
                    expect(stroke === 'red');
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].trendlines[0].marker.visible = true;
                chartObj.series[0].trendlines[0].marker.fill = 'red';
                chartObj.refresh();
            });
            it('Power Trendlines with default forecast values', function (done) {
                loaded = function (args) {
                    var path = document.getElementById('container_Series_0_TrendLine_0').getAttribute('d');
                    expect(path !== null).toBe(true);
                    expect(chartObj.visibleSeries[1].points[0].x).toBe(1);
                    expect(Math.round(chartObj.visibleSeries[1].points[0].y)).toBe(12);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Power Trendlines with custom forwardforecast positive values', function (done) {
                loaded = function (args) {
                    var path = document.getElementById('container_Series_0_TrendLine_0').getAttribute('d');
                    expect(path !== null).toBe(true);
                    expect(chartObj.visibleSeries[1].points[0].x).toBe(1);
                    expect(Math.round(chartObj.visibleSeries[1].points[0].y)).toBe(12);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].trendlines[0].forwardForecast = 5;
                chartObj.refresh();
            });
            it('Power Trendlines with forwardforecast negative values', function (done) {
                loaded = function (args) {
                    var path = document.getElementById('container_Series_0_TrendLine_0').getAttribute('d');
                    expect(path !== null).toBe(true);
                    expect(chartObj.visibleSeries[1].points[0].x).toBe(1);
                    expect(Math.round(chartObj.visibleSeries[1].points[0].y)).toBe(12);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].trendlines[0].forwardForecast = -5;
                chartObj.refresh();
            });
            it('Power Trendlines with backward forecast positive values', function (done) {
                loaded = function (args) {
                    var path = document.getElementById('container_Series_0_TrendLine_0').getAttribute('d');
                    expect(path !== null).toBe(true);
                    expect(chartObj.visibleSeries[1].points[0].x).toBe(0);
                    expect(Math.round(chartObj.visibleSeries[1].points[0].y)).toBe(0);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].trendlines[0].backwardForecast = 4;
                chartObj.refresh();
            });
            it('Power Trendlines with backward forecast negative values', function (done) {
                loaded = function (args) {
                    var path = document.getElementById('container_Series_0_TrendLine_0').getAttribute('d');
                    expect(path !== null).toBe(true);
                    expect(chartObj.visibleSeries[1].points[0].x).toBe(5);
                    expect(Math.round(chartObj.visibleSeries[1].points[0].y)).toBe(173);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].trendlines[0].backwardForecast = -4;
                chartObj.refresh();
            });
            it('Power Trendlines with enableLegend', function (done) {
                loaded = function (args) {
                    var legendElement = document.getElementById('container_chart_legend_g_1');
                    expect(legendElement !== null);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Power Trendlines with disableLegend', function (done) {
                loaded = function (args) {
                    var legendElement = document.getElementById('container_chart_legend_g_1');
                    expect(legendElement === null);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.legendSettings.visible = false;
                chartObj.refresh();
            });
            it('Power Trendlines with tooltip', function (done) {
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_1');
                    var series = chartObj.visibleSeries[1];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = series.points[0].regions[0].y + parseFloat(chartArea.getAttribute('y')) + element.offsetTop;
                    var x = series.points[0].regions[0].x + parseFloat(chartArea.getAttribute('x')) + element.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    expect(tooltip.childNodes[0].childNodes[0].childNodes[1].textContent.replace(/\u200E/g, '')).toEqual('Power5 : 173.233');
                    expect(parseFloat(tooltip.style.top) < (series.points[0].regions[0].y + parseFloat(chartArea.getAttribute('y'))));
                    done();
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].trendlines[0].name = 'Power';
                chartObj.tooltip = { enable: true };
                chartObj.refresh();
            });
            it('Power Trendlines with trackball', function (done) {
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_3');
                    var series = chartObj.visibleSeries[1];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = series.points[0].regions[0].y + parseFloat(chartArea.getAttribute('y')) + element.offsetTop;
                    var x = series.points[0].regions[0].x + parseFloat(chartArea.getAttribute('x')) + element.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.tooltip = { shared: true };
                chartObj.refresh();
            });
        });
        describe('Power Trendlines with category data', function () {
            var chartObj;
            var loaded;
            var trigger = new events_spec_1.MouseEvents();
            element = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(element);
                chartObj = new chart_1.Chart({
                    primaryXAxis: {
                        title: 'Months',
                        valueType: 'Category'
                    },
                    primaryYAxis: {
                        title: 'Rupees against Dollars',
                        interval: 5
                    },
                    height: '600px',
                    width: '850px',
                    series: [{
                            type: 'Line',
                            name: 'trend',
                            fill: '#0066FF',
                            xName: 'x',
                            yName: 'y',
                            dataSource: categoyData[0].dataSource,
                            animation: { enable: false },
                            trendlines: [{ type: 'Power',
                                    name: 'Power_trend', fill: 'red', enableTooltip: true, marker: { visible: true } }],
                        },
                        {
                            name: 'MTBV',
                            width: 2,
                            type: 'Line',
                            dataSource: categoyData[1].dataSource,
                            xName: 'x',
                            yName: 'y',
                            marker: {
                                visible: true,
                                width: 10,
                                height: 10
                            },
                            trendlines: [{ type: 'Power',
                                    name: 'Power_trend2', fill: 'red', enableTooltip: true, marker: { visible: true } }],
                        }],
                    title: 'Online trading'
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                document.getElementById('container').remove();
            });
            it('Power Trendlines with category values', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('containerSeriesGroup0').childNodes.length;
                    expect(svg == 2).toBe(true);
                    var xAxisLabelCollection = document.getElementById('containerAxisLabels0');
                    expect(xAxisLabelCollection.childNodes.length == 6).toBe(true);
                    var yAxisLabelCollection = document.getElementById('containerAxisLabels1');
                    expect(yAxisLabelCollection.childNodes.length == 4).toBe(true);
                    done();
                };
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
