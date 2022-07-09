define(["require", "exports", "@syncfusion/ej2-base", "../../../src/chart/chart", "../../../src/chart/series/line-series", "../../../src/chart/series/area-series", "../../../src/chart/series/column-series", "../../../src/chart/series/bar-series", "../../../src/chart/axis/logarithmic-axis", "../../../src/chart/axis/date-time-axis", "../base/data.spec", "../../common.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, chart_1, line_series_1, area_series_1, column_series_1, bar_series_1, logarithmic_axis_1, date_time_axis_1, data_spec_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(line_series_1.LineSeries, logarithmic_axis_1.Logarithmic, column_series_1.ColumnSeries, area_series_1.AreaSeries, bar_series_1.BarSeries, date_time_axis_1.DateTime);
    var data = data_spec_1.seriesData1;
    var datetime = data_spec_1.datetimeData;
    describe('Chart Control', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('Chart Logarithmic axis', function () {
            var chartObj;
            var elem;
            var svg;
            var text;
            var datalabel;
            var loaded;
            beforeAll(function () {
                elem = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: {
                        title: 'PrimaryXAxis',
                        valueType: 'Logarithmic'
                    },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'None' },
                    series: [{
                            dataSource: [
                                { y: 18, x: 1 }, { y: 29, x: 2 }, { y: 30, x: 3 }, { y: 41, x: 4 },
                                { y: 52, x: 5 }, { y: 62, x: 6 },
                                { y: 74, x: 7 }, { y: 85, x: 8 }, { y: 96, x: 9 }, { y: 102, x: 10 }
                            ], xName: 'x', yName: 'y', animation: { enable: false }, type: 'Line',
                            name: 'ChartSeriesNameGold', fill: 'green',
                        },
                    ], width: '800',
                    title: 'Chart TS Title', legendSettings: { visible: false }
                });
            });
            afterAll(function () {
                elem.remove();
                chartObj.destroy();
            });
            it('Checking with labels for primaryXAxis', function (done) {
                loaded = function (args) {
                    svg = document.getElementById("containerAxisLabels0");
                    expect(svg.childNodes.length == 2).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.appendTo('#container');
            });
            it('Checking with axis labels for primaryXAxis with logBase 2', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('containerAxisLabels0');
                    expect(svg.childNodes.length === 5).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.logBase = 2;
                chartObj.primaryXAxis.interval = null;
                chartObj.refresh();
            });
            it('checking axis labels for primaryXAxis with range', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('containerAxisLabels0');
                    expect(svg.childNodes.length === 6).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.minimum = 1;
                chartObj.primaryXAxis.maximum = 20;
                chartObj.refresh();
            });
            it('checking axis labels for primaryXAxis', function (done) {
                loaded = function (args) {
                    text = document.getElementById("container0_AxisLabel_0");
                    expect(text.textContent === "1").toBe(true);
                    text = document.getElementById("container0_AxisLabel_1");
                    expect(text.textContent === "10").toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.logBase = 10;
                chartObj.refresh();
            });
            it('checking axis labels for primaryXAxis with minorGridLine', function (done) {
                loaded = function (args) {
                    svg = document.getElementById("container_MinorGridLine_0_1");
                    expect(svg.getAttribute("stroke") == "#eaeaea").toBe(true);
                    expect(svg.getAttribute("stroke-width") == "2").toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.minorGridLines.width = 2;
                chartObj.primaryXAxis.minorTicksPerInterval = 3;
                chartObj.refresh();
            });
            it('Checking axis labels for primaryXAxis with interval', function (done) {
                loaded = function (args) {
                    text = document.getElementById("container0_AxisLabel_0");
                    expect(text.textContent == "1").toBe(true);
                    text = document.getElementById("container0_AxisLabel_1");
                    expect(text.textContent == "100").toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.minimum = 1;
                chartObj.primaryXAxis.interval = 2;
                chartObj.primaryXAxis.maximum = 20;
                chartObj.refresh();
            });
            it('Checking axis labels for primary YAxis', function (done) {
                loaded = function (args) {
                    svg = document.getElementById("containerAxisLabels1");
                    expect(svg.childNodes.length == 3).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryYAxis.valueType = 'Logarithmic';
                chartObj.refresh();
            });
            it('Checking with nagative points', function (done) {
                loaded = function (args) {
                    svg = document.getElementById("container1_AxisLabel_0");
                    expect(svg.textContent === '1').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource[0].y = -20;
                chartObj.refresh();
            });
            it('checking axis labels for primary YAxis with logBase', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('containerAxisLabels1');
                    expect(svg.childNodes.length === 4).toBe(true);
                    svg = document.getElementById('container_Series_0');
                    expect(svg !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryYAxis.logBase = 2;
                chartObj.series[0].dataSource[0].y = 18;
                chartObj.refresh();
            });
            it('checking axis labels for primary YAxis with range', function (done) {
                loaded = function (args) {
                    text = document.getElementById("container1_AxisLabel_0");
                    expect(text.textContent == "1").toBe(true);
                    text = document.getElementById("container1_AxisLabel_1");
                    expect(text.textContent == "2").toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryYAxis.minimum = 1;
                chartObj.primaryYAxis.maximum = 260;
                chartObj.primaryYAxis.logBase = 2;
                chartObj.refresh();
            });
            it('checking axis labels for primary YAxis with label', function (done) {
                loaded = function (args) {
                    text = document.getElementById("container1_AxisLabel_0");
                    expect(text.textContent == "1").toBe(true);
                    text = document.getElementById("container1_AxisLabel_1");
                    expect(text.textContent == "10").toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryYAxis.logBase = 10;
                chartObj.refresh();
            });
            it('checking axis labels for primary YAxis with minorGridLine', function (done) {
                loaded = function (args) {
                    svg = document.getElementById("container_MinorGridLine_1_1");
                    expect(svg.getAttribute("stroke") == "#eaeaea").toBe(true);
                    expect(svg.getAttribute("stroke-width") == "2").toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryYAxis.minorGridLines.width = 2;
                chartObj.primaryYAxis.minorTicksPerInterval = 3;
                chartObj.refresh();
            });
            it('checking axis labels for primary YAxis with interval', function (done) {
                loaded = function (args) {
                    text = document.getElementById("container1_AxisLabel_0");
                    expect(text.textContent == "1").toBe(true);
                    text = document.getElementById("container1_AxisLabel_1");
                    expect(text.textContent == "4").toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryYAxis.interval = 2;
                chartObj.primaryYAxis.logBase = 2;
                chartObj.refresh();
            });
            it('checking with bar Series', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('containerSeriesGroup0');
                    expect(svg.childElementCount - 1 == 10).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'Bar';
                chartObj.refresh();
            });
            it('checking with bar Series with datetime and logarithmic', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_0');
                    var value = Math.round(args.chart.series[0].points[1].regions[0].y);
                    expect(value == 253 || value == 248).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'Bar';
                chartObj.primaryXAxis.valueType = 'DateTime';
                chartObj.primaryXAxis.minimum = null;
                chartObj.primaryXAxis.interval = null;
                chartObj.primaryXAxis.maximum = null;
                chartObj.series[0].dataSource = datetime;
                chartObj.primaryYAxis.interval = 1;
                chartObj.primaryYAxis.logBase = 10;
                chartObj.refresh();
            });
            it('checking with Column Series', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('containerSeriesGroup0');
                    expect(svg.childElementCount - 1 == 10).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Logarithmic';
                chartObj.primaryXAxis.minimum = 1;
                chartObj.primaryXAxis.interval = 2;
                chartObj.primaryXAxis.maximum = 20;
                chartObj.primaryYAxis.interval = 2;
                chartObj.primaryYAxis.logBase = 2;
                chartObj.series[0].dataSource = [
                    { y: 18, x: 1 }, { y: 29, x: 2 }, { y: 30, x: 3 }, { y: 41, x: 4 },
                    { y: 52, x: 5 }, { y: 62, x: 6 },
                    { y: 74, x: 7 }, { y: 85, x: 8 }, { y: 96, x: 9 }, { y: 102, x: 10 }
                ];
                chartObj.series[0].type = 'Column';
                chartObj.refresh();
            });
            it('checking with Area Series', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('containerSeriesGroup0');
                    expect(svg !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'Area';
                chartObj.refresh();
            });
            it('checking with range', function (done) {
                loaded = function (args) {
                    text = document.getElementById("container0_AxisLabel_0");
                    expect(text.textContent == "0.1").toBe(true);
                    text = document.getElementById("container0_AxisLabel_1");
                    expect(text.textContent == "10").toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'Line';
                chartObj.primaryXAxis.minimum = 0.2;
                chartObj.refresh();
            });
            it('checking with large data', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('containerSeriesGroup0');
                    expect(svg !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series = [
                    {
                        dataSource: [{ x: 1, y: 8 }, { x: 2, y: 10000 }, { x: 3, y: 400 }, { x: 4, y: 600 },
                            { x: 5, y: 900 }, { x: 6, y: 1400 }, { x: 7, y: 2000 }, { x: 8, y: 4000 },
                            { x: 9, y: 6000 }, { x: 10, y: 8000 }, { x: 10, y: 9000 }],
                        name: 'Gold', xName: 'x', yName: 'y', fill: 'rgba(135,206,235,1)', type: 'Line',
                        animation: { enable: false }
                    }
                ];
                chartObj.primaryXAxis.minorGridLines.width = 0;
                chartObj.primaryYAxis.minorGridLines.width = 0;
                chartObj.primaryXAxis.minorTickLines.width = 0;
                chartObj.primaryYAxis.minorTickLines.width = 0;
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.primaryYAxis.logBase = 10;
                chartObj.primaryYAxis.minimum = 1;
                chartObj.primaryXAxis.interval = 1;
                chartObj.primaryXAxis.minimum = 1;
                chartObj.primaryYAxis.maximum = null;
                chartObj.refresh();
            });
            it('checking with edgelabelplacement', function (done) {
                loaded = function (args) {
                    text = document.getElementById("container0_AxisLabel_0");
                    expect(text === null).toBe(true);
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    text = document.getElementById('container1_AxisLabel_0');
                    expect(parseFloat(text.getAttribute('y')) === parseFloat(chartArea.getAttribute('y')) + parseFloat(chartArea.getAttribute('height'))).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.interval = null;
                chartObj.primaryXAxis.edgeLabelPlacement = 'Hide';
                chartObj.primaryYAxis.edgeLabelPlacement = 'Shift';
                chartObj.refresh();
            });
            it('checking with edgelabelplacement Hide', function (done) {
                loaded = function (args) {
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    text = document.getElementById('container1_AxisLabel_0');
                    expect(text.textContent === '').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.interval = null;
                chartObj.primaryYAxis.edgeLabelPlacement = 'Hide';
                chartObj.refresh();
            });
            it('checking with labelFormat', function (done) {
                loaded = function (args) {
                    text = document.getElementById("container0_AxisLabel_0");
                    expect(text.textContent === '$1.00').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.edgeLabelPlacement = 'None';
                chartObj.primaryYAxis.edgeLabelPlacement = 'None';
                chartObj.primaryXAxis.valueType = 'Logarithmic';
                chartObj.series[0].dataSource = data;
                chartObj.primaryXAxis.labelFormat = 'C';
                chartObj.refresh();
            });
            it('Checking the zoomFactor and zoomPosition', function (done) {
                loaded = function (args) {
                    text = document.getElementById("container0_AxisLabel_0");
                    expect(text !== null).toBe(true);
                    text = document.getElementById("container1_AxisLabel_1");
                    expect(text !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.labelFormat = '';
                chartObj.primaryXAxis.zoomFactor = 0.5;
                chartObj.primaryXAxis.zoomPosition = 0.5;
                chartObj.refresh();
            });
            it('Checking the enableAutoIntervalOnZooming false', function (done) {
                loaded = function (args) {
                    text = document.getElementById("container0_AxisLabel_0");
                    expect(text !== null).toBe(true);
                    text = document.getElementById("container1_AxisLabel_1");
                    expect(text !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.enableAutoIntervalOnZooming = false;
                chartObj.refresh();
            });
            it('checking with multiple axes', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container2_AxisLabel_0');
                    expect(svg.textContent === '10@').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series = [{
                        dataSource: data, name: 'Gold', xName: 'x', yName: 'y', fill: 'red', type: 'Line',
                        animation: { enable: false }
                    },
                    {
                        dataSource: data, name: 'Gold', xName: 'x', yName: 'y', fill: 'rgba(135,206,235,1)', type: 'Line',
                        animation: { enable: false }
                    }];
                chartObj.axes = [{
                        rowIndex: 1, name: 'yAxis1', valueType: 'Logarithmic', labelFormat: '{value}@',
                        titleStyle: { size: '14px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' },
                        labelStyle: { size: '12px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' }
                    }];
                chartObj.series[0].yAxisName = 'yAxis1';
                chartObj.rows = [{ border: { width: 4, color: 'red' }, height: '300', },
                    { border: { width: 4, color: 'blue' } }];
                chartObj.primaryXAxis.zoomFactor = 1;
                chartObj.primaryXAxis.enableAutoIntervalOnZooming = true;
                chartObj.primaryXAxis.zoomPosition = 0;
                chartObj.refresh();
            });
            it('Checking the Labels with empty data', function () {
                chartObj.series = [];
                chartObj.primaryXAxis.zoomFactor = 0.7;
                chartObj.primaryXAxis.zoomPosition = 0.2;
                chartObj.axisLabelRender = function (args) {
                    args.text = args.text + 'cus';
                };
                chartObj.loaded = null;
                chartObj.refresh();
                svg = document.getElementById('containerAxisLabels0');
                expect(svg.childNodes.length == 1).toBe(true);
                expect(svg.childNodes[0].textContent.indexOf('cus') > -1).toBe(true);
            });
            it('checking x axis as inversed axis', function (done) {
                loaded = function (args) {
                    var firstLabel = document.getElementById('container0_AxisLabel_0');
                    expect(firstLabel.textContent).toEqual('1');
                    var secondLabel = document.getElementById('container0_AxisLabel_2');
                    expect(secondLabel.textContent).toEqual('100');
                    expect(+firstLabel.getAttribute('x') > (+secondLabel.getAttribute('x'))).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.isInversed = true;
                chartObj.primaryXAxis.zoomFactor = 1;
                chartObj.primaryXAxis.zoomPosition = 0;
                chartObj.axisLabelRender = null;
                chartObj.primaryXAxis.desiredIntervals = null;
                chartObj.refresh();
            });
        });
        describe('Checking line break labels with logarithmic axis', function () {
            var chart;
            var elem;
            var svg;
            var text;
            var datalabel;
            var loaded;
            beforeAll(function () {
                elem = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(elem);
                chart = new chart_1.Chart({
                    primaryXAxis: {
                        valueType: 'Logarithmic',
                        labelFormat: '{value}<br>text',
                    },
                    primaryYAxis: {},
                    series: [{
                            dataSource: [{ x: 10, y: 7 }, { x: 100, y: 1 }, { x: 1000, y: 1 },
                                { x: 10000, y: 14 }, { x: 100000, y: 1 }, { x: 1000000, y: 10 },],
                            xName: 'x', yName: 'y', animation: { enable: false }, type: 'Line',
                        },
                    ],
                    legendSettings: { visible: false }
                }, '#container');
            });
            afterAll(function () {
                elem.remove();
                chart.destroy();
            });
            it('default line break checking with log axis', function (done) {
                loaded = function (args) {
                    var label = document.getElementById('containerAxisLabels0');
                    expect(label.childElementCount == 6).toBe(true);
                    label = document.getElementById('container0_AxisLabel_1');
                    expect(label.childNodes[0].textContent == '100').toBe(true);
                    expect(label.childNodes[1].textContent == 'text').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.refresh();
            });
            it('Checking line break labels with inversed axis', function (done) {
                loaded = function (args) {
                    var label = document.getElementById('containerAxisLabels0');
                    expect(label.childElementCount == 6).toBe(true);
                    label = document.getElementById('container0_AxisLabel_1');
                    expect(label.childNodes[0].textContent == '100').toBe(true);
                    expect(label.childNodes[1].textContent == 'text').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.primaryXAxis.isInversed = true;
                chart.refresh();
            });
            it('Checking line break labels with opposed position true', function (done) {
                loaded = function (args) {
                    var label = document.getElementById('containerAxisLabels0');
                    expect(label.childElementCount == 6).toBe(true);
                    label = document.getElementById('container0_AxisLabel_0');
                    expect(label.childNodes[0].textContent == 'text').toBe(true);
                    expect(label.childNodes[1].textContent == '10').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.primaryXAxis.isInversed = false;
                chart.primaryXAxis.opposedPosition = true;
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
