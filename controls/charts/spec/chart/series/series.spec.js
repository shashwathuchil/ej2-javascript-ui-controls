define(["require", "exports", "@syncfusion/ej2-base", "../../../src/chart/series/line-series", "../../../src/chart/series/column-series", "../../../src/chart/series/bar-series", "../../../src/chart/user-interaction/tooltip", "../../../src/chart/chart", "@syncfusion/ej2-data", "../base/data.spec", "../../../src/chart/series/data-label", "../base/events.spec", "../../common.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, line_series_1, column_series_1, bar_series_1, tooltip_1, chart_1, ej2_data_1, data_spec_1, data_label_1, events_spec_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(line_series_1.LineSeries, tooltip_1.Tooltip, column_series_1.ColumnSeries, bar_series_1.BarSeries, data_label_1.DataLabel);
    describe('Chart Control', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        var ele;
        var svg;
        var loaded;
        var dataManager = new ej2_data_1.DataManager({
            url: 'http://mvc.syncfusion.com/Services/Northwnd.svc/Tasks/'
        });
        var query = new ej2_data_1.Query().take(50).where('Estimate', 'greaterThan', 0, false);
        describe('series in chart', function () {
            var chart;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(ele);
                chart = new chart_1.Chart({
                    border: { width: 1, color: 'red' },
                    primaryXAxis: {
                        title: 'PrimaryXAxis', lineStyle: { color: 'blue', width: 2 },
                        minorTicksPerInterval: 4, minorGridLines: { width: 0 }, minorTickLines: { width: 1 }
                    },
                    primaryYAxis: { title: 'PrimaryYAxis', lineStyle: { color: 'blue', width: 2 } },
                    series: [
                        {
                            name: 'series1', type: 'Line', fill: '#ACE5FF', width: 3,
                            dataSource: data_spec_1.seriesData1, animation: { enable: false }, xName: 'x', yName: 'y'
                        },
                        {
                            name: 'series2', type: 'Line', fill: '#F6B53F', width: 2,
                            dataSource: data_spec_1.seriesData2, animation: { enable: false }, xName: 'x', yName: 'y'
                        }
                    ],
                    height: '600', legendSettings: { visible: false }
                }, '#container');
            });
            afterAll(function () {
                chart.destroy();
                ele.remove();
            });
            it('Checking with Line series with data', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0');
                    expect(svg.getAttribute('stroke') == '#ACE5FF').toBe(true);
                    expect(svg.getAttribute('stroke-width') == '3').toBe(true);
                    svg = document.getElementById('container_Series_1');
                    expect(svg.getAttribute('stroke') == '#F6B53F').toBe(true);
                    expect(svg.getAttribute('stroke-width') == '2').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.refresh();
            });
            it('Checking with Line series with fill in seriesRender Event', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0');
                    expect(svg.getAttribute('stroke') == 'pink').toBe(true);
                    svg = document.getElementById('container_Series_1');
                    expect(svg.getAttribute('stroke') == '#F6B53F').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.seriesRender = function (argsData) {
                    if (argsData.series.index == 0) {
                        argsData.fill = 'pink';
                    }
                };
                chart.refresh();
            });
        });
        describe('Checking with Line and Bar Combination', function () {
            var chartObj;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(ele);
                chartObj = new chart_1.Chart({
                    series: [
                        {
                            name: 'series1', type: 'Line', fill: '#ACE5FF', width: 2, animation: { enable: false },
                            dataSource: [{ x: 10, y: 30 }, { x: 20, y: 40 }, { x: 30, y: 20 }, { x: 40, y: 15 }, { x: 50, y: 45 }],
                            xName: 'x', yName: 'y'
                        },
                        {
                            name: 'series1', type: 'Bar', fill: 'red', width: 2, animation: { enable: false },
                            dataSource: [{ x: 10, y: 30 }, { x: 20, y: 40 }, { x: 30, y: 20 }, { x: 40, y: 15 }, { x: 50, y: 45 }],
                            xName: 'x', yName: 'y'
                        }
                    ], legendSettings: { visible: false }
                }, '#container');
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                ele.remove();
            });
            it('Checking with Line series with points', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('containerSeriesCollection');
                    expect(svg.childNodes.length == 2).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
        });
        describe('Line series with remote dataSource', function () {
            var chartEle1;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(ele);
                chartEle1 = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis' },
                    primaryYAxis: { title: 'PrimaryYAxis' },
                    series: [
                        {
                            name: 'series1', type: 'Line', fill: '#ACE5FF', width: 2,
                            dataSource: dataManager, xName: 'Id', yName: 'Estimate',
                        },
                    ],
                    height: '600', legendSettings: { visible: false }
                });
                chartEle1.appendTo('#container');
            });
            afterAll(function () {
                chartEle1.destroy();
                ele.remove();
            });
            it('Checking with query', function () {
                loaded = function (args) {
                    var text = document.getElementById('container0_AxisLabel_0');
                };
                chartEle1.series[0].query = query;
                chartEle1.loaded = loaded;
                chartEle1.refresh();
            });
        });
        describe('Multiple series with dataSource', function () {
            var chartEle;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(ele);
                var query = new ej2_data_1.Query().take(5);
                chartEle = new chart_1.Chart({
                    series: [
                        {
                            name: 'dataSource', type: 'Line', fill: 'yellow', width: 2,
                            dataSource: data_spec_1.data, xName: 'EmployeeID', yName: 'Freight', query: query, animation: { enable: true }
                        },
                        {
                            name: 'data', type: 'Line', fill: 'red', width: 2,
                            dataSource: [{ x: 1, y: 30 }, { x: 5, y: 40 }, { x: 7, y: 20 }, { x: 9, y: 15 }, { x: 11, y: 45 }],
                            xName: 'x', yName: 'y', animation: { enable: true, delay: 300 }
                        },
                    ], legendSettings: { visible: false }
                });
                chartEle.appendTo('#container');
            });
            afterAll(function () {
                chartEle.destroy();
                ele.remove();
            });
            it('Checking the series data', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0');
                    expect(svg.getAttribute('stroke') == 'yellow').toBe(true);
                    expect(svg.getAttribute('stroke-width') == '2').toBe(true);
                    done();
                };
                chartEle.loaded = loaded;
                chartEle.refresh();
            });
        });
        describe('marker in line chart', function () {
            var chartObj;
            var ele;
            var marker;
            var loaded;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(ele);
                chartObj = new chart_1.Chart({
                    border: { width: 1, color: 'red' },
                    primaryXAxis: {
                        title: 'PrimaryXAxis', lineStyle: { color: 'blue', width: 2 },
                        minorTicksPerInterval: 4, minorGridLines: { width: 0 }, minorTickLines: { width: 1 }
                    },
                    primaryYAxis: { title: 'PrimaryYAxis', lineStyle: { color: 'blue', width: 2 } },
                    series: [
                        {
                            name: 'series1', type: 'Line', fill: 'red',
                            dataSource: data_spec_1.seriesData1, animation: { enable: false }, xName: 'x', yName: 'y',
                            marker: {
                                visible: true,
                                shape: 'Circle',
                                fill: 'black', height: 10, width: 10
                            }
                        },
                    ],
                    height: '400', width: '600', legendSettings: { visible: false }
                }, '#container');
                ;
            });
            afterAll(function () {
                chartObj.destroy();
                ele.remove();
            });
            it('Checking with marker shape Circle', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_1_Symbol');
                    expect(marker.getAttribute('fill') === 'black').toBe(true);
                    expect(marker.getAttribute('d') !== '').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('checking with marker shape diamond', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_1_Symbol');
                    expect(marker.getAttribute('fill') === 'black').toBe(true);
                    expect(marker.getAttribute('d') !== '').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Diamond';
                chartObj.refresh();
            });
            it('checking with marker shape HorizontalLine', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_1_Symbol');
                    expect(marker.getAttribute('fill') === 'black').toBe(true);
                    expect(marker.getAttribute('d') !== '').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'HorizontalLine';
                chartObj.refresh();
            });
            it('checking with marker shape InvertedTriangle', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_3_Symbol');
                    expect(marker.getAttribute('fill') === 'black').toBe(true);
                    expect(marker.getAttribute('d') !== '').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'InvertedTriangle';
                chartObj.refresh();
            });
            it('checking with marker shape Pentagon', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_4_Symbol');
                    expect(marker.getAttribute('fill') === 'black').toBe(true);
                    expect(marker.getAttribute('d') !== '').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Pentagon';
                chartObj.refresh();
            });
            it('checking with marker shape Triangle', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_2_Symbol');
                    expect(marker.getAttribute('fill') === 'black').toBe(true);
                    expect(marker.getAttribute('d') !== '').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Triangle';
                chartObj.refresh();
            });
            it('checking with marker shape rectangle', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_2_Symbol');
                    expect(marker.getAttribute('stroke') === chartObj.series[0].fill).toBe(true);
                    expect(marker.getAttribute('d') !== '').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Rectangle';
                chartObj.series[0].marker.fill = null;
                chartObj.refresh();
            });
            it('checking with marker shape verticalLine', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(marker.getAttribute('fill') === 'brown').toBe(true);
                    expect(marker.getAttribute('d') !== '').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'VerticalLine';
                chartObj.series[0].marker.fill = 'brown';
                chartObj.refresh();
            });
            it('checking with marker shape verticalLine', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(marker.getAttribute('fill') === 'brown').toBe(true);
                    expect(marker.getAttribute('d') !== '').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Cross';
                chartObj.refresh();
            });
            it('checking with null point', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_3_Symbol');
                    expect(marker === null).toBe(true);
                    marker = document.getElementById('container_Series_0_Point_5_Symbol');
                    expect(marker.getAttribute('fill') === 'pink').toBe(true);
                    expect(marker.getAttribute('d') !== '').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.pointRender = function (argsData) {
                    argsData.fill = 'pink';
                    if (argsData.point.index == 6) {
                        argsData.cancel = true;
                    }
                };
                chartObj.series[0].dataSource[3].y = null;
                chartObj.series[0].marker.shape = 'Cross';
                chartObj.refresh();
                ;
            });
            it('checking with animation', function (done) {
                var animate;
                animate = function (args) {
                    var pathLength = args.series.pathElement.getTotalLength();
                    expect(pathLength >= 400).toBe(true);
                    done();
                };
                chartObj.loaded = chartObj.pointRender = null;
                chartObj.series[0].animation = { enable: true, delay: 1000 };
                chartObj.animationComplete = animate;
                chartObj.series[0].dashArray = '2';
                chartObj.refresh();
            });
            it('checking single point with negative data', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container1_AxisLabel_0');
                    expect(marker.textContent == '-70').toBe(true);
                    marker = document.getElementById('container1_AxisLabel_6');
                    expect(marker.textContent == '-10').toBe(true);
                    done();
                };
                chartObj.animationComplete = null;
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = [{ 'x': 1, 'y': -60 }];
                chartObj.refresh();
            });
        });
        describe('Checking Tooltip with Column', function () {
            var chartEle;
            var trigger = new events_spec_1.MouseEvents();
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(ele);
                chartEle = new chart_1.Chart({
                    primaryYAxis: { minimum: -10, maximum: 40 },
                    series: [
                        {
                            name: 'data', type: 'Column', fill: 'red', width: 2,
                            dataSource: [{ x: 1, y: 15 }, { x: 5, y: 40 }, { x: 7, y: -20 }, { x: 9, y: 30 }, { x: 11, y: 45 }],
                            xName: 'x', yName: 'y', animation: { enable: false, delay: 300 },
                            marker: { visible: true }
                        },
                    ], legendSettings: { visible: false }, tooltip: { enable: true }
                });
                chartEle.appendTo('#container');
            });
            afterAll(function () {
                chartEle.destroy();
                ele.remove();
            });
            it('Checking the series data', function (done) {
                loaded = function (args) {
                    var marker = document.getElementById('container_Series_0_Point_3');
                    expect(marker != null).toBe(true);
                    var series = chartEle.series[0];
                    var target = document.getElementById('container_Series_0_Point_4');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = series.points[4].regions[0].y + parseFloat(chartArea.getAttribute('y')) + ele.offsetTop + 60;
                    var x = series.points[4].regions[0].x + parseFloat(chartArea.getAttribute('x')) + ele.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    done();
                };
                chartEle.loaded = loaded;
                chartEle.refresh();
            });
        });
        describe('Checking Tooltip with Bar', function () {
            var chartEle;
            var trigger = new events_spec_1.MouseEvents();
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(ele);
                chartEle = new chart_1.Chart({
                    primaryYAxis: { minimum: -10, maximum: 40 },
                    series: [
                        {
                            name: 'data', type: 'Bar', fill: 'red', width: 2,
                            dataSource: [{ x: 1, y: 15 }, { x: 5, y: 40 }, { x: 7, y: -20 }, { x: 9, y: 30 }, { x: 11, y: 45 }],
                            xName: 'x', yName: 'y', animation: { enable: false, delay: 300 },
                            marker: { visible: true }
                        },
                    ], legendSettings: { visible: false }, tooltip: { enable: true }
                });
                chartEle.appendTo('#container');
            });
            afterAll(function () {
                chartEle.destroy();
                ele.remove();
            });
            it('Checking the series data', function (done) {
                loaded = function (args) {
                    var marker = document.getElementById('container_Series_0_Point_3');
                    expect(marker != null).toBe(true);
                    var series = chartEle.series[0];
                    var target = document.getElementById('container_Series_0_Point_4');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = series.points[4].regions[0].y + parseFloat(chartArea.getAttribute('y')) + ele.offsetTop;
                    var x = series.points[4].regions[0].x + parseFloat(chartArea.getAttribute('x')) + ele.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    done();
                };
                chartEle.loaded = loaded;
                chartEle.refresh();
            });
        });
        describe('Line Series Inversed axis', function () {
            var chart;
            var loaded;
            var element;
            var dataLabelY;
            var pointY;
            element = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(element);
                chart = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis' },
                    primaryYAxis: { title: 'PrimaryYAxis', isInversed: true },
                    series: [{
                            animation: { enable: false },
                            name: 'ChartSeriesNameGold', dataSource: data_spec_1.seriesData1, xName: 'x', yName: 'y', size: 'size',
                            type: 'Line', marker: { visible: false, dataLabel: { visible: true, fill: 'violet' } }
                        }],
                    width: '800',
                    title: 'Chart TS Title', loaded: loaded,
                    legendSettings: { visible: false }
                });
                chart.appendTo('#container');
            });
            afterAll(function () {
                chart.destroy();
                element.remove();
            });
            it('With Label position Auto', function (done) {
                loaded = function (args) {
                    dataLabelY = +document.getElementById('container_Series_0_Point_2_TextShape_0').getAttribute('y');
                    pointY = chart.series[0].points[2].symbolLocations[0].y;
                    expect(dataLabelY < pointY).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.refresh();
            });
            it('With Label position Outer', function (done) {
                loaded = function (args) {
                    dataLabelY = +document.getElementById('container_Series_0_Point_2_TextShape_0').getAttribute('y');
                    pointY = chart.series[0].points[2].symbolLocations[0].y;
                    expect(dataLabelY < pointY).toBe(true);
                    dataLabelY = +document.getElementById('container_Series_0_Point_6_TextShape_0').getAttribute('y');
                    pointY = chart.series[0].points[6].symbolLocations[0].y;
                    expect(dataLabelY < pointY).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].marker.dataLabel.position = 'Outer';
                chart.refresh();
            });
            it('With Label position Top', function (done) {
                loaded = function (args) {
                    dataLabelY = +document.getElementById('container_Series_0_Point_2_TextShape_0').getAttribute('y');
                    pointY = chart.series[0].points[2].symbolLocations[0].y;
                    expect(dataLabelY < pointY).toBe(true);
                    dataLabelY = +document.getElementById('container_Series_0_Point_6_TextShape_0').getAttribute('y');
                    pointY = chart.series[0].points[6].symbolLocations[0].y;
                    expect(dataLabelY < pointY).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].marker.dataLabel.position = 'Top';
                chart.series[0].marker.dataLabel.alignment = 'Center';
                chart.refresh();
            });
            it('With Label position Bottom', function (done) {
                loaded = function (args) {
                    dataLabelY = +document.getElementById('container_Series_0_Point_2_TextShape_0').getAttribute('y');
                    pointY = chart.series[0].points[2].symbolLocations[0].y;
                    expect(dataLabelY > pointY).toBe(true);
                    dataLabelY = +document.getElementById('container_Series_0_Point_6_TextShape_0').getAttribute('y');
                    pointY = chart.series[0].points[6].symbolLocations[0].y;
                    expect(dataLabelY > pointY).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].marker.dataLabel.position = 'Bottom';
                chart.refresh();
            });
            it('With Label position Middle', function (done) {
                loaded = function (args) {
                    var labelY = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('y');
                    var labelHeight = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('height');
                    var point = chart.series[0].points[1];
                    expect(labelY + labelHeight / 2).toEqual(point.regions[0].y + point.regions[0].height / 2);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].marker.dataLabel.position = 'Middle';
                chart.refresh();
            });
        });
        describe('checking rotated line chart', function () {
            var chart;
            var loaded;
            var element = ej2_base_1.createElement('div', { id: 'container' });
            var dataLabel;
            var point;
            var trigger = new events_spec_1.MouseEvents();
            var x;
            var y;
            var tooltip;
            var chartArea;
            var series;
            beforeAll(function () {
                document.body.appendChild(element);
                chart = new chart_1.Chart({
                    primaryXAxis: { title: 'primaryXAxis', valueType: 'DateTime' },
                    primaryYAxis: { title: 'PrimaryYAxis' },
                    series: [
                        {
                            type: 'Line', name: 'area', dataSource: data_spec_1.rotateData1, xName: 'x', yName: 'y', animation: { enable: false },
                            marker: { visible: true }
                        },
                        {
                            type: 'Line', name: 'area', dataSource: data_spec_1.rotateData2, xName: 'x', yName: 'y', animation: { enable: false },
                            marker: { visible: true }
                        }
                    ],
                    title: 'rotated line Chart'
                });
                chart.appendTo('#container');
            });
            afterAll(function () {
                chart.destroy();
                element.remove();
            });
            it('checking without rotated', function (done) {
                loaded = function (args) {
                    var axis = chart.primaryXAxis;
                    expect(axis.orientation).toEqual('Horizontal');
                    axis = chart.primaryYAxis;
                    expect(axis.orientation).toEqual('Vertical');
                    done();
                };
                chart.loaded = loaded;
                chart.refresh();
            });
            it('checking with rotated', function (done) {
                loaded = function (args) {
                    var axis = chart.primaryYAxis;
                    expect(axis.orientation).toEqual('Horizontal');
                    axis = chart.primaryXAxis;
                    expect(axis.orientation).toEqual('Vertical');
                    done();
                };
                chart.loaded = loaded;
                chart.isTransposed = true;
                chart.refresh();
            });
            it('checking with datalabel Auto position', function (done) {
                loaded = function (args) {
                    dataLabel = document.getElementById('container_Series_0_Point_2_Text_0');
                    point = chart.series[0].points[2];
                    expect(+(dataLabel.getAttribute('y')) < point.symbolLocations[0].y).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].marker.dataLabel.visible = true;
                chart.refresh();
            });
            it('checking with datalabel Top position', function (done) {
                loaded = function (args) {
                    dataLabel = document.getElementById('container_Series_0_Point_2_Text_0');
                    point = chart.series[0].points[2];
                    expect(+(dataLabel.getAttribute('y')) < point.symbolLocations[0].y).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].marker.dataLabel.position = 'Top';
                chart.refresh();
            });
            it('checking with datalabel Middle position', function (done) {
                loaded = function (args) {
                    dataLabel = document.getElementById('container_Series_0_Point_2_Text_0');
                    point = chart.series[0].points[2];
                    expect(+(dataLabel.getAttribute('y')) > (point.symbolLocations[0].y - point.regions[0].height / 2)).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].marker.dataLabel.position = 'Middle';
                chart.refresh();
            });
            it('checking with datalabel bottom position', function (done) {
                loaded = function (args) {
                    dataLabel = document.getElementById('container_Series_0_Point_2_Text_0');
                    point = chart.series[0].points[2];
                    expect(+(dataLabel.getAttribute('y')) > point.symbolLocations[0].y).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].marker.dataLabel.position = 'Bottom';
                chart.refresh();
            });
            it('checking with tooltip positive values', function (done) {
                loaded = function (args) {
                    dataLabel = document.getElementById('container_Series_0_Point_2_Symbol');
                    series = chart.series[0];
                    chartArea = document.getElementById('container_ChartAreaBorder');
                    y = series.points[2].regions[0].y + parseFloat(chartArea.getAttribute('y')) + element.offsetTop;
                    x = series.points[2].regions[0].x + parseFloat(chartArea.getAttribute('x')) + element.offsetLeft;
                    trigger.mousemovetEvent(dataLabel, Math.ceil(x), Math.ceil(y));
                    tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    expect(parseFloat(tooltip.style.left) > series.points[2].regions[0].y + parseFloat(chartArea.getAttribute('y')));
                    done();
                };
                chart.loaded = loaded;
                chart.tooltip.enable = true;
                chart.refresh();
            });
            it('checking with track ball', function (done) {
                loaded = function (args) {
                    dataLabel = document.getElementById('container_Series_0_Point_1_Symbol');
                    y = series.points[1].regions[0].y + parseFloat(chartArea.getAttribute('y')) + element.offsetTop;
                    x = series.points[1].regions[0].x + parseFloat(chartArea.getAttribute('x')) + element.offsetLeft;
                    trigger.mousemovetEvent(dataLabel, Math.ceil(x), Math.ceil(y));
                    tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    expect(parseFloat(tooltip.style.top) > series.points[1].regions[0].y + parseFloat(chartArea.getAttribute('y')));
                    done();
                };
                chart.loaded = loaded;
                chart.tooltip.shared = true;
                chart.refresh();
            });
            it('checking with column series', function (done) {
                loaded = function (args) {
                    var point1 = document.getElementById('container_Series_0_Point_0');
                    var point2 = document.getElementById('container_Series_1_Point_0_Symbol');
                    expect(point2 != null).toBe(true);
                    expect(point1 != null).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].type = 'Column';
                chart.refresh();
            });
            it('checking with column series with NaN number', function (done) {
                loaded = function (args) {
                    var point1 = document.getElementById('container_Series_0_Point_0');
                    expect(point1 === null).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].dataSource = [{ x: new Date(2000, 6, 11), y: NaN }, { x: new Date(2002, 3, 7), y: -30 },
                    { x: new Date(2004, 3, 6), y: 15 }, { x: new Date(2006, 3, 30), y: -65 },
                    { x: new Date(2008, 3, 8), y: 0 }, { x: new Date(2010, 3, 8), y: 85 }];
                chart.refresh();
            });
        });
        describe('Checking datalabel intersect action is None', function () {
            var chart;
            var loaded;
            var element = ej2_base_1.createElement('div', { id: 'container' });
            var dataLabel;
            var point;
            var trigger = new events_spec_1.MouseEvents();
            var x;
            var y;
            var tooltip;
            var chartArea;
            var series;
            beforeAll(function () {
                document.body.appendChild(element);
                chart = new chart_1.Chart({
                    title: 'Population of India Statistics',
                    subTitle: '(2010 - 2016)',
                    subTitleStyle: {
                        textAlignment: 'Far'
                    },
                    titleStyle: {
                        fontFamily: 'Roboto',
                        fontStyle: 'medium', size: '14px'
                    },
                    chartArea: { border: { width: 0 } },
                    width: '400px', height: '400px',
                    primaryXAxis: {
                        minimum: 2010, maximum: 2016,
                        interval: 1,
                        edgeLabelPlacement: 'Shift',
                        labelStyle: {
                            fontFamily: 'Roboto',
                            fontStyle: 'medium',
                            size: '14px'
                        },
                        majorGridLines: { width: 0 },
                        lineStyle: { color: '#eaeaea', width: 1 }
                    },
                    primaryYAxis: {
                        minimum: 900, maximum: 1300,
                        labelFormat: '{value}M',
                        title: 'Population',
                        labelStyle: {
                            fontFamily: 'Roboto',
                            fontStyle: 'medium', size: '14px'
                        },
                        majorGridLines: {
                            color: '#eaeaea', width: 1
                        },
                        lineStyle: {
                            color: '#eaeaea', width: 1
                        }
                    },
                    series: [
                        {
                            name: 'Male',
                            dataSource: [
                                { x: 2010, y: 1014 }, { x: 2011, y: 1040 },
                                { x: 2012, y: 1065 }, { x: 2013, y: 1110 },
                                { x: 2014, y: 1130 }, { x: 2015, y: 1153 },
                                { x: 2016, y: 1175 }
                            ], xName: 'x', yName: 'y', animation: { enable: false },
                            marker: {
                                visible: true,
                                shape: 'Circle',
                                dataLabel: {
                                    visible: true,
                                    position: 'Top',
                                    margin: { right: 30 },
                                    template: "<div id='templateWrap' style='background-color:#00bdae;border-radius: 3px;'>" +
                                        "<img src = 'src/chart/images/male.png'/>" +
                                        "<div class='des' style ='color:white; font-family:Roboto; font-style: medium; fontp-size:14px;padding-right:6px'>" +
                                        "<span>${ point.y }M </span></div></div>",
                                }
                            }, width: 2
                        }, {
                            name: 'Female',
                            dataSource: [
                                { x: 2010, y: 990 }, { x: 2011, y: 1010 },
                                { x: 2012, y: 1030 }, { x: 2013, y: 1070 },
                                { x: 2014, y: 1105 }, { x: 2015, y: 1138 },
                                { x: 2016, y: 1155 }
                            ], xName: 'x', yName: 'y', animation: { enable: false },
                            marker: {
                                visible: true,
                                shape: 'Rectangle',
                                dataLabel: {
                                    visible: true,
                                    position: 'Bottom',
                                    margin: { right: 15 },
                                    template: "<div id='templateWrap' style='background-color:#404041;border-radius: 3px;'>" +
                                        "<img src = 'src/chart/images/male.png'/>" +
                                        "<div class='des' style ='color:white; font-family:Roboto; font-style: medium; fontp-size:14px;padding-right:6px'>" +
                                        "<span>${ point.y }M </span></div></div>",
                                }
                            }, width: 2
                        }
                    ],
                });
                chart.appendTo('#container');
            });
            afterAll(function () {
                chart.destroy();
                element.remove();
            });
            it('checking datalabel template cout without None', function (done) {
                loaded = function (args) {
                    dataLabel = document.getElementById('container_Series_0_DataLabelCollections');
                    expect(dataLabel.childElementCount === 6).toBe(true);
                    dataLabel = document.getElementById('container_Series_1_DataLabelCollections');
                    expect(dataLabel.childElementCount === 6).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.refresh();
            });
            it('checking datalabel template cout with None', function (done) {
                loaded = function (args) {
                    dataLabel = document.getElementById('container_Series_0_DataLabelCollections');
                    expect(dataLabel.childElementCount === 7).toBe(true);
                    dataLabel = document.getElementById('container_Series_1_DataLabelCollections');
                    expect(dataLabel.childElementCount === 7).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].marker.dataLabel.labelIntersectAction = 'None';
                chart.series[1].marker.dataLabel.labelIntersectAction = 'None';
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
