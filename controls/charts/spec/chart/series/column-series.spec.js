define(["require", "exports", "@syncfusion/ej2-base", "../../../src/chart/chart", "../../../src/chart/series/line-series", "../../../src/chart/series/data-label", "../../../src/chart/axis/category-axis", "../../../src/chart/axis/date-time-axis", "../../../src/chart/user-interaction/data-editing", "../../../src/chart/user-interaction/tooltip", "../../../src/chart/series/column-series", "../../../src/chart/user-interaction/crosshair", "../base/data.spec", "../base/data.spec", "../base/events.spec", "../../common.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, chart_1, line_series_1, data_label_1, category_axis_1, date_time_axis_1, data_editing_1, tooltip_1, column_series_1, crosshair_1, data_spec_1, data_spec_2, events_spec_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(line_series_1.LineSeries, column_series_1.ColumnSeries, data_label_1.DataLabel, category_axis_1.Category, date_time_axis_1.DateTime, tooltip_1.Tooltip, crosshair_1.Crosshair, data_editing_1.DataEditing);
    describe('Column Series', function () {
        var element;
        describe('Column Series', function () {
            beforeAll(function () {
                var isDef = function (o) { return o !== undefined && o !== null; };
                if (!isDef(window.performance)) {
                    console.log("Unsupported environment, window.performance.memory is unavailable");
                    _this.skip();
                    return;
                }
            });
            var chartObj;
            var loaded;
            element = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(element);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis', labelFormat: 'C' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal' },
                    series: [{
                            animation: { enable: false }, name: 'ChartSeriesNameGold', dataSource: [],
                            type: 'Column', fill: 'rgba(135,206,235,1)',
                        }],
                    width: '800',
                    title: 'Chart TS Title', loaded: loaded, legendSettings: { visible: false }
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                document.getElementById('container').remove();
            });
            it('Default Series Type without data Points', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('containerSeriesGroup0').childNodes.length;
                    expect(svg == 1).toBe(true);
                    var xAxisLabelCollection = document.getElementById('containerAxisLabels0');
                    expect(xAxisLabelCollection.childNodes.length == 11).toBe(true);
                    var yAxisLabelCollection = document.getElementById('containerAxisLabels1');
                    expect(yAxisLabelCollection.childNodes.length == 7).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Added data Source', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0_Point_0');
                    expect(svg.getAttribute('d') != '').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = [{
                        x: 1,
                        y: 10
                    }];
                chartObj.series[0].name = 'Changed';
                chartObj.series[0].xName = 'x';
                chartObj.series[0].yName = 'y';
                chartObj.refresh();
            });
            it('checking datasource in Chart', function (done) {
                chartObj.series[0].dataSource = null;
                chartObj.loaded = function (args) {
                    var svg = document.getElementById('container_Series_0_Point_0');
                    expect(svg.getAttribute('d') != '').toBe(true);
                    done();
                };
                chartObj.dataSource = [{
                        x: 10,
                        y: 10.5
                    }];
                chartObj.dataBind();
            });
            it('Single data point with range', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0_Point_0');
                    var xAxisLabelCollection = document.getElementById('containerAxisLabels0');
                    expect(xAxisLabelCollection.childNodes.length == 3).toBe(true);
                    var yAxisLabelCollection = document.getElementById('containerAxisLabels1');
                    expect(yAxisLabelCollection.childNodes.length == 5).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.minimum = 0;
                chartObj.primaryXAxis.maximum = 2;
                chartObj.primaryXAxis.interval = 1;
                chartObj.primaryYAxis.minimum = 8;
                chartObj.primaryYAxis.maximum = 12;
                chartObj.primaryYAxis.interval = 1;
                chartObj.refresh();
            });
            it('Checking series visibility', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('containerSeriesCollection').childNodes.length;
                    expect(seriesElements == 1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].visible = false;
                chartObj.primaryYAxis.minimum = null;
                chartObj.primaryYAxis.maximum = null;
                chartObj.primaryYAxis.interval = null;
                chartObj.primaryXAxis.minimum = null;
                chartObj.primaryXAxis.maximum = null;
                chartObj.primaryXAxis.interval = null;
                chartObj.refresh();
            });
            it('with data source', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('containerSeriesGroup0').childNodes.length;
                    expect(seriesElements != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].visible = true;
                chartObj.series[0].dataSource = [{ x: 1000, y: 70 }, { x: 2000, y: 40 },
                    { x: 3000, y: 70 }, { x: 4000, y: 60 },
                    { x: 5000, y: 50 }, { x: 6000, y: 40 },
                    { x: 7000, y: 40 }, { x: 8000, y: 70 }];
                chartObj.series[0].xName = 'x';
                chartObj.series[0].yName = 'y';
                chartObj.refresh();
            });
            it('with range', function (done) {
                loaded = function (args) {
                    chartObj.primaryXAxis.minimum = null;
                    chartObj.primaryXAxis.maximum = null;
                    chartObj.primaryXAxis.interval = null;
                    var seriesElements = document.getElementById('container_Series_0_Point_3');
                    var path = seriesElements.getAttribute('d');
                    expect((path.match(/M/g) || []).length == 1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.minimum = 0;
                chartObj.primaryXAxis.maximum = 10000;
                chartObj.primaryXAxis.interval = 1000;
                chartObj.refresh();
            });
            it('with dateTimeRange', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('container_Series_0_Point_3');
                    var stroke = seriesElements.getAttribute('stroke-width');
                    expect(stroke == '0').toBe(true);
                    var labelElement = document.getElementById('container0_AxisLabel_3');
                    expect(labelElement.textContent == '2003').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = [{ x: new Date(2000, 6, 11), y: 10 }, { x: new Date(2002, 3, 7), y: 30 },
                    { x: new Date(2004, 3, 6), y: 15 }, { x: new Date(2006, 3, 30), y: 65 },
                    { x: new Date(2008, 3, 8), y: 90 }, { x: new Date(2010, 3, 8), y: 85 }
                ];
                chartObj.series[0].width = 2;
                chartObj.primaryXAxis.valueType = 'DateTime';
                chartObj.primaryXAxis.labelFormat = null;
                chartObj.refresh();
            });
            it('with dash array', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('container_Series_0_Point_3');
                    var stroke = seriesElements.getAttribute('stroke-dasharray');
                    expect(stroke == '4,3').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dashArray = '4,3';
                chartObj.refresh();
            });
            it('with empty point(y Value)', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('container_Series_0_Point_3');
                    expect(seriesElements == null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                var dataSource = [{ x: '2000/6/1', y: 10 }, { x: '2002/3/7', y: 30 },
                    { x: '2004/3/6', y: 15 }, { x: '2006/3/30', y: 65 },
                    { x: '2008/3/8', y: 90 }, { x: '2010/3/8', y: 85 }
                ];
                dataSource[3].y = null;
                chartObj.series[0].dataSource = dataSource;
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.refresh();
            });
            it('with empty point(x Value)', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('containerSeriesGroup0');
                    expect(seriesElements.childElementCount == 6).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                var dataSource = [{ x: '2000/6/1', y: 10 }, { x: '2002/3/7', y: 30 },
                    { x: '2004/3/6', y: 15 }, { x: '2006/3/30', y: 65 },
                    { x: '2008/3/8', y: 90 }, { x: '2010/3/8', y: 85 }
                ];
                dataSource[3].y = 10;
                dataSource[3].x = null;
                chartObj.series[0].dataSource = dataSource;
                chartObj.refresh();
            });
            it('with empty point(x and y Value)', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('containerSeriesGroup0');
                    expect(seriesElements.childElementCount == 5).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                var dataSource = [{ x: '2000/6/1', y: 10 }, { x: '2002/3/7', y: 30 },
                    { x: '2004/3/6', y: 15 }, { x: '2006/3/30', y: 65 },
                    { x: '2008/3/8', y: 90 }, { x: '2010/3/8', y: 85 }];
                dataSource[3].y = null;
                dataSource[3].x = null;
                dataSource[5].y = null;
                dataSource[5].x = null;
                chartObj.series[0].dataSource = dataSource;
                chartObj.refresh();
            });
            it('with fill and stroke', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('container_Series_0_Point_3');
                    expect(seriesElements.getAttribute('stroke') == 'green').toBe(true);
                    expect(seriesElements.getAttribute('stroke') != 'red').toBe(true);
                    expect(seriesElements.getAttribute('stroke-width') != '10').toBe(true);
                    expect(seriesElements.getAttribute('stroke-width') == '4').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = [{ x: 1000, y: 70 }, { x: 2000, y: 40 },
                    { x: 3000, y: 70 }, { x: 4000, y: 60 },
                    { x: 5000, y: 50 }, { x: 6000, y: 40 },
                    { x: 7000, y: 40 }, { x: 8000, y: 70 }];
                chartObj.series[0].dashArray = null;
                chartObj.series[0].fill = 'red';
                chartObj.series[0].border.color = 'green';
                chartObj.series[0].width = 10;
                chartObj.series[0].border.width = 4;
                chartObj.series[0].opacity = 0.6;
                chartObj.refresh();
            });
            it('checking with border', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0_Point_1');
                    var path = svg.getAttribute('d');
                    var count = path.indexOf('Z');
                    expect(count !== -1).toBe(true);
                    expect(svg.getAttribute('stroke') === 'red').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].border.color = 'red';
                chartObj.series[0].border.width = 4;
                chartObj.refresh();
            });
            it('within xAxis range', function (done) {
                loaded = function (args) {
                    var svgLength = document.getElementById('containerSeriesGroup0').childNodes.length;
                    expect(svgLength == 5).toBe(true);
                    done();
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.primaryXAxis.minimum = 4500;
                chartObj.primaryXAxis.maximum = 6500;
                chartObj.primaryXAxis.interval = 500;
                chartObj.refresh();
            });
        });
        describe('Column Series with negative', function () {
            var chartObj;
            var loaded;
            var animationCOmplete;
            element = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(element);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis', valueType: 'DateTime' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal' },
                    series: [{
                            animation: { enable: false }, name: 'ChartSeriesNameGold',
                            dataSource: [{ x: new Date(2000, 6, -11), y: 10 }, { x: new Date(2002, 3, 7), y: 30 },
                                { x: new Date(2004, 3, 6), y: -15 }, { x: new Date(2006, 3, 30), y: 65 },
                                { x: new Date(2008, 3, 8), y: 90 }, { x: new Date(2010, 3, 8), y: 85 }
                            ], xName: 'x', yName: 'y',
                            type: 'Column', fill: 'rgba(135,206,235,1)',
                        }],
                    width: '800',
                    title: 'Chart TS Title', loaded: loaded, legendSettings: { visible: false }
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                document.getElementById('container').remove();
            });
            it('Default Series Type with negative points', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('container_Series_0_Point_3');
                    var seriesElements1 = document.getElementById('container_Series_0_Point_5');
                    expect(seriesElements != null).toBe(true);
                    expect(seriesElements1 != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking animation', function (done) {
                animationCOmplete = function (args) {
                    var point = document.getElementById('container_Series_' + args.series.index + '_Point_0');
                    expect(point.getAttribute('transform') === 'translate(0,0)').toBe(true);
                    done();
                };
                chartObj.series[0].animation.enable = true;
                chartObj.animationComplete = animationCOmplete;
                chartObj.refresh();
            });
        });
        describe('DataLabel', function () {
            var chartObj;
            var loaded;
            element = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(element);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { valueType: 'DateTime' },
                    primaryYAxis: { rangePadding: 'None' },
                    series: [{
                            animation: { enable: false },
                            dataSource: [{ x: new Date(2000, 6, 11), y: 10 }, { x: new Date(2002, 3, 7), y: 30 },
                                { x: new Date(2004, 3, 6), y: 15 }, { x: new Date(2006, 3, 30), y: 65 },
                                { x: new Date(2008, 3, 8), y: 90 }, { x: new Date(2010, 3, 8), y: 85 }], xName: 'x', yName: 'y', name: 'India',
                            fill: '#E94649', type: 'Column', marker: { visible: false, dataLabel: { visible: false } }
                        }],
                    width: '800',
                    title: 'Chart TS Title', loaded: loaded,
                    legendSettings: { visible: false }
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                element.remove();
            });
            it('Showing default marker', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_3_Text_0');
                    expect(element.textContent == '65').toBe(true);
                    expect(document.getElementById('containerShapeGroup0').childNodes.length == 0).toBe(true);
                    done();
                };
                chartObj.series[0].marker.dataLabel.visible = true;
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Showing default marker shape', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_3_Text_0');
                    expect(element.textContent == '65').toBe(true);
                    expect(element.getAttribute('fill') == 'white').toBe(true);
                    expect(document.getElementById('containerShapeGroup0').childNodes.length == 6).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.fill = '#E94649';
                chartObj.refresh();
            });
            it('checking visibility', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_3_Text_0');
                    expect(element == null).toBe(true);
                    done();
                };
                chartObj.series[0].marker.dataLabel.visible = false;
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('with marker visibility', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_3_Text_0');
                    expect(element != null).toBe(true);
                    var marker = document.getElementById('container_Series_0_Point_3_Symbol');
                    var label = document.getElementById('container_Series_0_Point_3_Text_0');
                    expect(marker !== null).toBe(true);
                    done();
                };
                chartObj.series[0].marker.visible = true;
                chartObj.series[0].marker.height = 10;
                chartObj.series[0].marker.width = 10;
                chartObj.series[0].marker.dataLabel.visible = true;
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('with marker size without marker visibility', function (done) {
                loaded = function (args) {
                    var marker = document.getElementById('container_Series_0_Point_3_Symbol');
                    expect(marker == null).toBe(true);
                    marker = document.getElementById('container_Series_0_Point_5_Text_0');
                    var location = (+marker.getAttribute('x')) + (+marker.getAttribute('width'));
                    var clipRectWidth = 757.5;
                    expect(location < clipRectWidth).toBe(true);
                    marker = document.getElementById('container_Series_0_Point_0_Text_0');
                    expect(+marker.getAttribute('x') > 0).toBe(true);
                    var point0 = +document.getElementById('container_Series_0_Point_0_Text_0').getAttribute('y');
                    var point1 = +document.getElementById('container_Series_0_Point_1_Text_0').getAttribute('y');
                    var point2 = +document.getElementById('container_Series_0_Point_2_Text_0').getAttribute('y');
                    var point3 = +document.getElementById('container_Series_0_Point_3_Text_0').getAttribute('y');
                    var point4 = +document.getElementById('container_Series_0_Point_4_Text_0').getAttribute('y');
                    var point5 = +document.getElementById('container_Series_0_Point_5_Text_0').getAttribute('y');
                    var point0Location = chartObj.series[0].points[0].symbolLocations[0].y;
                    var point1Location = chartObj.series[0].points[1].symbolLocations[0].y;
                    var point2Location = chartObj.series[0].points[2].symbolLocations[0].y;
                    var point3Location = chartObj.series[0].points[3].symbolLocations[0].y;
                    var point4Location = chartObj.series[0].points[4].symbolLocations[0].y;
                    var point5Location = chartObj.series[0].points[5].symbolLocations[0].y;
                    expect(point0 < point0Location).toBe(true);
                    expect(point1 < point1Location).toBe(true);
                    expect(point2 < point2Location).toBe(true);
                    expect(point3 < point3Location).toBe(true);
                    expect(point4 > point4Location).toBe(true);
                    expect(point5 > point5Location).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.visible = false;
                chartObj.series[0].marker.height = 10;
                chartObj.series[0].marker.width = 10;
                chartObj.series[0].marker.dataLabel.visible = true;
                chartObj.refresh();
            });
            it('Added another series', function (done) {
                loaded = function (args) {
                    done();
                };
                chartObj.series = [chartObj.series[0], {
                        name: 'series1', type: 'Column', fill: '#ACE5FF', width: 3,
                        animation: { enable: false },
                        dataSource: [
                            { x: new Date(2000, 6, 11), y: 45 },
                            { x: new Date(2002, 3, 7), y: 40 },
                            { x: new Date(2004, 3, 6), y: 45 },
                            { x: new Date(2006, 3, 30), y: 40 },
                            { x: new Date(2008, 3, 8), y: 45 },
                            { x: new Date(2010, 3, 8), y: 20 }
                        ],
                        xName: 'x', yName: 'y',
                        marker: { dataLabel: { visible: true } }
                    }];
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking default data label position with multiple series', function (done) {
                loaded = function (args) {
                    var point0 = +document.getElementById('container_Series_1_Point_0_Text_0').getAttribute('y');
                    var point1 = +document.getElementById('container_Series_1_Point_1_Text_0').getAttribute('y');
                    var point2 = +document.getElementById('container_Series_1_Point_2_Text_0').getAttribute('y');
                    var point3 = +document.getElementById('container_Series_1_Point_3_Text_0').getAttribute('y');
                    var point4 = +document.getElementById('container_Series_1_Point_4_Text_0').getAttribute('y');
                    var point5 = +document.getElementById('container_Series_1_Point_5_Text_0').getAttribute('y');
                    var point0Location = chartObj.series[1].points[0].symbolLocations[0].y;
                    var point1Location = chartObj.series[1].points[1].symbolLocations[0].y;
                    var point2Location = chartObj.series[1].points[2].symbolLocations[0].y;
                    var point3Location = chartObj.series[1].points[3].symbolLocations[0].y;
                    var point4Location = chartObj.series[1].points[4].symbolLocations[0].y;
                    var point5Location = chartObj.series[1].points[5].symbolLocations[0].y;
                    expect(point0 < point0Location).toBe(true);
                    expect(point1 < point1Location).toBe(true);
                    expect(point2 < point2Location).toBe(true);
                    expect(point3 < point3Location).toBe(true);
                    expect(point4 < point4Location).toBe(true);
                    expect(point5 < point5Location).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.legendSettings = { visible: false };
                chartObj.tooltip.enable = false;
                chartObj.refresh();
            });
            it('Checking data label shape without fill', function (done) {
                loaded = function (args) {
                    var marker = document.getElementById('container_Series_1_Point_2_TextShape_0');
                    expect(marker.getAttribute('stroke') == 'grey').toBe(true);
                    expect(marker.getAttribute('stroke-width') == '2').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.border.width = 2;
                chartObj.series[1].marker.dataLabel.border.color = 'grey';
                chartObj.refresh();
            });
            it('Checking font color saturation - background black', function (done) {
                loaded = function (args) {
                    var marker = document.getElementById('container_Series_1_Point_3_Text_0');
                    expect(marker.getAttribute('fill') == 'white').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.chartArea.background = 'black';
                chartObj.chartArea.border = {
                    color: ''
                };
                chartObj.refresh();
            });
            it('Checking font color saturation - background white', function (done) {
                loaded = function (args) {
                    var marker = document.getElementById('container_Series_1_Point_3_Text_0');
                    expect(marker.getAttribute('fill') == 'black').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.chartArea.background = 'white';
                chartObj.refresh();
            });
            it('Checking dataLabel positions Default', function (done) {
                loaded = function (args) {
                    var hiddenShape = document.getElementById('container_Series_1_Point_1_TextShape_0');
                    var hiddenText = document.getElementById('container_Series_1_Point_1_Text_0');
                    expect(hiddenText != null).toBe(true);
                    expect(hiddenShape != null).toBe(true);
                    var element = +document.getElementById('container_Series_1_Point_2_Text_0').getAttribute('y');
                    expect(chartObj.series[1].points[2].symbolLocations[0].y < element).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.position = 'Bottom';
                chartObj.refresh();
            });
            it('Checking dataLabel positions Top', function (done) {
                loaded = function (args) {
                    var element1 = +document.getElementById('container_Series_1_Point_2_Text_0').getAttribute('y');
                    expect(chartObj.series[1].points[2].symbolLocations[0].y < element1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.position = 'Top';
                chartObj.refresh();
            });
            it('Checking dataLabel positions Middle', function (done) {
                loaded = function (args) {
                    var element = +document.getElementById('container_Series_1_Point_2_Text_0').getAttribute('y');
                    var locationY = chartObj.series[1].points[2].symbolLocations[0].y;
                    var height = document.getElementById('container_Series_1_Point_2_Text_0').getBoundingClientRect().height;
                    expect(locationY != element).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.position = 'Middle';
                chartObj.refresh();
            });
            it('Checking dataLabel positions Outer', function (done) {
                loaded = function (args) {
                    var element1 = +document.getElementById('container_Series_1_Point_2_Text_0').getAttribute('y');
                    expect(chartObj.series[1].points[2].symbolLocations[0].y > element1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.position = 'Outer';
                chartObj.refresh();
            });
            it('Checking font color saturation with font color', function (done) {
                loaded = function (args) {
                    var marker = document.getElementById('container_Series_0_Point_3_Text_0');
                    expect(marker.getAttribute('fill') == 'green').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.font.color = 'green';
                chartObj.refresh();
            });
            it('Checking Data label format with globalize format', function (done) {
                loaded = function (args) {
                    var marker = document.getElementById('container_Series_0_Point_3_Text_0');
                    expect(marker.textContent == '65.00').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryYAxis.labelFormat = 'n2';
                chartObj.refresh();
            });
            it('Checking Data label alignment with position auto - near alignment', function (done) {
                loaded = function (args) {
                    var svg = +document.getElementById('container_Series_0_Point_4_TextShape_0').getAttribute('y');
                    expect(svg > chartObj.series[0].points[4].symbolLocations[0].y).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.alignment = 'Near';
                chartObj.refresh();
            });
            it('Checking Data label alignment with position auto - far alignment', function (done) {
                loaded = function (args) {
                    var svg = +document.getElementById('container_Series_0_Point_4_TextShape_0').getAttribute('y');
                    expect(svg > chartObj.series[0].points[4].symbolLocations[0].y).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.alignment = 'Far';
                chartObj.refresh();
            });
            it('Checking Data label alignment except Auto position - bottom Position alignment near', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_1_Point_1_TextShape_0');
                    expect(svg != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.position = 'Bottom';
                chartObj.series[1].marker.dataLabel.alignment = 'Near';
                chartObj.refresh();
            });
            it('Checking Data label alignment except Auto position - bottom Position alignment far', function (done) {
                loaded = function (args) {
                    var hiddenShape = document.getElementById('container_Series_1_Point_1_TextShape_0');
                    expect(hiddenShape != null).toBe(true);
                    var elementY = document.getElementById('container_Series_1_Point_2_TextShape_0');
                    expect(elementY != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.alignment = 'Far';
                chartObj.refresh();
            });
            it('Checking Data label alignment except Auto position - Outer Position  - alignment near', function (done) {
                loaded = function (args) {
                    var hiddenShape = document.getElementById('container_Series_1_Point_1_TextShape_0');
                    expect(hiddenShape != null).toBe(true);
                    var elementYLocation = +document.getElementById('container_Series_1_Point_2_TextShape_0').getAttribute('y');
                    var symbolLocation = chartObj.series[1].points[2].symbolLocations[0].y;
                    expect(elementYLocation > (symbolLocation)).toBe(true);
                    elementYLocation = +document.getElementById('container_Series_1_Point_2_TextShape_0').getAttribute('y');
                    symbolLocation = chartObj.series[1].points[2].symbolLocations[0].y;
                    expect(elementYLocation > (symbolLocation)).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.position = 'Outer';
                chartObj.series[1].marker.dataLabel.alignment = 'Near';
                chartObj.refresh();
            });
            it('Checking Data label alignment except Auto position - Outer Position  - alignment far', function (done) {
                loaded = function (args) {
                    var xLocation = +document.getElementById('container_Series_1_Point_5_TextShape_0').getAttribute('x');
                    var width = +document.getElementById('container_ChartAreaBorder').getAttribute('width');
                    var elementYLocation = +document.getElementById('container_Series_1_Point_2_TextShape_0').getAttribute('y');
                    var symbolLocation = chartObj.series[1].points[2].symbolLocations[0].y;
                    expect(elementYLocation < (symbolLocation)).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.alignment = 'Far';
                chartObj.refresh();
            });
            it('Checking Data label alignment except Auto position - Outer Position - alignment center', function (done) {
                loaded = function (args) {
                    var hiddenShape = document.getElementById('container_Series_1_Point_1_TextShape_0');
                    expect(hiddenShape != null).toBe(true);
                    var elementYLocation = +document.getElementById('container_Series_1_Point_2_TextShape_0').getAttribute('y');
                    var symbolLocation = chartObj.series[1].points[2].symbolLocations[0].y;
                    expect(elementYLocation < (symbolLocation)).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.alignment = 'Center';
                chartObj.refresh();
            });
            it('Checking Data label alignment except Auto position - Top Position', function (done) {
                loaded = function (args) {
                    var hiddenShape = document.getElementById('container_Series_1_Point_1_TextShape_0');
                    expect(hiddenShape != null).toBe(true);
                    var elementYLocation = +document.getElementById('container_Series_1_Point_2_TextShape_0').getAttribute('y');
                    var symbolLocation = chartObj.series[1].points[2].symbolLocations[0].y;
                    expect(elementYLocation > (symbolLocation)).toBe(true);
                    elementYLocation = +document.getElementById('container_Series_1_Point_2_TextShape_0').getAttribute('y');
                    symbolLocation = chartObj.series[1].points[2].symbolLocations[0].y;
                    var elementHeight = +document.getElementById('container_Series_1_Point_2_TextShape_0').getAttribute('height');
                    expect(elementYLocation != (symbolLocation - elementHeight - 5)).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.position = 'Top';
                chartObj.series[1].marker.dataLabel.alignment = 'Near';
                chartObj.refresh();
            });
            it('Checking margin', function (done) {
                loaded = function (args) {
                    var shape = document.getElementById('container_Series_0_Point_2_TextShape_0');
                    var shapeY = +shape.getAttribute('y');
                    var shapeX = +shape.getAttribute('x');
                    var shapeWidth = +shape.getAttribute('width');
                    var shapeHeight = +shape.getAttribute('height');
                    var text = document.getElementById('container_Series_0_Point_2_Text_0');
                    var textX = +text.getAttribute('x');
                    var textY = +text.getAttribute('y');
                    expect(textX > (shapeX + 20)).toBe(true);
                    expect(textY > (shapeY + 25)).toBe(true);
                    expect(textY < (shapeY + shapeHeight - 5)).toBe(true);
                    expect(textX < (shapeX + shapeWidth - 10)).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.margin = {
                    left: 20,
                    right: 10,
                    top: 25,
                    bottom: 5
                };
                chartObj.refresh();
            });
            it('Checking Overlap data', function (done) {
                chartObj.loaded = function (args) {
                    expect(document.getElementById('containerShapeGroup2').childNodes.length == 6).toBe(true);
                    expect(document.getElementById('container_Series_2_Point_0_TextShape_0') != null).toBe(true);
                    expect(document.getElementById('container_Series_2_Point_2_TextShape_0') != null).toBe(true);
                    done();
                };
                chartObj.series[0].marker.dataLabel.margin = {
                    left: 5,
                    right: 5,
                    top: 5,
                    bottom: 5
                };
                chartObj.series = [chartObj.series[0], chartObj.series[1], {
                        name: 'series1', type: 'Column', fill: 'violet', width: 4,
                        animation: { enable: false },
                        dataSource: [
                            { x: new Date(2000, 6, 11), y: 45 },
                            { x: new Date(2002, 3, 7), y: 60 },
                            { x: new Date(2004, 3, 6), y: 45 },
                            { x: new Date(2006, 3, 30), y: 60 },
                            { x: new Date(2008, 3, 8), y: 40 },
                            { x: new Date(2010, 3, 8), y: 85 }
                        ], xName: 'x', yName: 'y',
                        marker: { dataLabel: { visible: true, fill: 'black', opacity: 0.6 } }
                    }];
                chartObj.refresh();
            });
            it('Changing series Type', function (done) {
                loaded = function (args) {
                    expect(document.getElementById('containerShapeGroup2').childNodes.length > 4).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[2].type = 'Line';
                chartObj.refresh();
            });
            it('Checking properties', function (done) {
                loaded = function (args) {
                    expect(document.getElementById('containerShapeGroup0').childNodes.length == 0).toBe(true);
                    expect(document.getElementById('container_Series_0_Point_3_Text_0').textContent == '65.00').toBe(true);
                    var element = document.getElementById('container_Series_1_Point_2_TextShape_0');
                    expect(element.getAttribute('fill') == 'transparent').toBe(true);
                    expect(element.getAttribute('stroke') == 'green').toBe(true);
                    expect(element.getAttribute('stroke-width') == '2').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.fill = 'transparent';
                chartObj.series[1].marker.dataLabel.fill = 'transparent';
                chartObj.series[1].marker.dataLabel.alignment = 'Center';
                chartObj.series[1].marker.dataLabel.border = {
                    width: 2,
                    color: 'green'
                };
                chartObj.series[0].marker.dataLabel.rx = 10;
                chartObj.series[0].marker.dataLabel.ry = 10;
                chartObj.series[2].marker.dataLabel.rx = 10;
                chartObj.series[2].marker.dataLabel.ry = 10;
                chartObj.refresh();
            });
            it('Series Visible', function (done) {
                loaded = function (args) {
                    var trigger = new events_spec_1.MouseEvents();
                    var target = document.getElementById('container_Series_0_Point_1');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = series.points[1].regions[0].y + parseFloat(chartArea.getAttribute('y')) + element.offsetTop;
                    var x = series.points[1].regions[0].x + parseFloat(chartArea.getAttribute('x')) + element.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    var id = 'container';
                    var legendId = id + '_chart_legend';
                    var legendElement = document.getElementById(legendId + '_text_' + 0);
                    chartObj.loaded = null;
                    trigger.clickEvent(legendElement);
                    target = document.getElementById('container_Series_1_Point_1');
                    series = chartObj.series[1];
                    chartArea = document.getElementById('container_ChartAreaBorder');
                    y = series.points[1].regions[0].y + parseFloat(chartArea.getAttribute('y')) + element.offsetTop;
                    x = series.points[1].regions[0].x + parseFloat(chartArea.getAttribute('x')) + element.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    tooltip = document.getElementById('container_tooltip');
                    var seriesElements = document.getElementById('containerSeriesCollection').childNodes.length;
                    expect(seriesElements == 4).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.legendSettings = { visible: true };
                chartObj.tooltip.enable = true;
                chartObj.refresh();
            });
        });
        describe('Column Series with negative point data label', function () {
            var chartObj;
            var loaded;
            element = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(element);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal' },
                    series: [{
                            animation: { enable: false },
                            name: 'ChartSeriesNameGold', dataSource: [{ x: 1000, y: 70 }, { x: 2000, y: -40 },
                                { x: 3000, y: 70 }, { x: 4000, y: 60 },
                                { x: 5000, y: -50 }, { x: 6000, y: -40 },
                                { x: 7000, y: 40 }, { x: 8000, y: 70 }], xName: 'x', yName: 'y',
                            type: 'Column', fill: 'rgba(135,206,235,1)',
                            marker: { visible: false, dataLabel: { visible: true, fill: 'violet' } }
                        }],
                    width: '800',
                    title: 'Chart TS Title', loaded: loaded,
                    legendSettings: { visible: false }
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                element.remove();
            });
            it('With negative location', function (done) {
                loaded = function (args) {
                    var svg = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('y');
                    var point0Location = chartObj.series[0].points[1].symbolLocations[0].y;
                    expect(svg > point0Location).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('With Label position Top', function (done) {
                loaded = function (args) {
                    var svg = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('y');
                    var point0Location = chartObj.series[0].points[1].symbolLocations[0].y;
                    expect(svg < point0Location).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Top';
                chartObj.refresh();
            });
            it('With Label position Bottom', function (done) {
                loaded = function (args) {
                    var svg = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('y');
                    var point0Location = chartObj.series[0].points[1].symbolLocations[0].y;
                    expect(svg < point0Location).toBe(true);
                    var rect = +document.getElementById('container_Series_0_Point_1').getAttribute('y');
                    var rectHeight = +document.getElementById('container_Series_0_Point_1').getAttribute('height');
                    expect(svg == (rect + 5));
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Bottom';
                chartObj.refresh();
            });
            it('With Label position Middle', function (done) {
                loaded = function (args) {
                    var svg = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('y');
                    var svgHeight = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('height');
                    var point0Location = chartObj.series[0].points[1].symbolLocations[0].y;
                    expect(svg < point0Location).toBe(true);
                    var rect = +document.getElementById('container_Series_0_Point_1').getAttribute('y');
                    var rectHeight = +document.getElementById('container_Series_0_Point_1').getAttribute('height');
                    expect(svg == (rect - svgHeight + rectHeight / 2));
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Middle';
                chartObj.refresh();
            });
            it('Color saturation middle position', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_4_Text_0');
                    expect(element.getAttribute('fill') == 'white').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.fill = 'red';
                chartObj.series[0].marker.dataLabel.position = 'Middle';
                chartObj.refresh();
            });
            it('Color saturation fill as transparent', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_4_Text_0');
                    expect(element.getAttribute('fill') == 'black').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.fill = 'transparent';
                chartObj.series[0].marker.dataLabel.position = 'Middle';
                chartObj.refresh();
            });
            it('Color saturation with chart area background black', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_4_Text_0');
                    expect(element.getAttribute('fill') == 'white').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.chartArea.background = 'black';
                chartObj.chartArea.border = {
                    color: ''
                };
                chartObj.series[0].marker.dataLabel.position = 'Outer';
                chartObj.refresh();
            });
            it('Color saturation with top position', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_4_Text_0');
                    expect(element.getAttribute('fill') == 'black').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Top';
                chartObj.refresh();
            });
            it('Color saturation with data label fill color', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_4_Text_0');
                    expect(element.getAttribute('fill') == 'white').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.fill = 'red';
                chartObj.series[0].marker.dataLabel.position = 'Outer';
                chartObj.refresh();
            });
            it('Checking Events', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_2');
                    expect(element.getAttribute('fill') == 'brown').toBe(true);
                    element = document.getElementById('container_Series_0_Point_0');
                    expect(element == null).toBe(true);
                    done();
                };
                chartObj.pointRender = function (args) {
                    if (args.point.index === 0) {
                        args.cancel = true;
                    }
                    if (args.point.index === 2) {
                        args.fill = 'brown';
                    }
                };
                chartObj.loaded = loaded;
                chartObj.title = 'Events Changed';
                chartObj.dataBind();
            });
        });
        describe('column Series Inversed axis', function () {
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
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal', isInversed: true },
                    series: [{
                            animation: { enable: false },
                            name: 'ChartSeriesNameGold', dataSource: [{ x: 1000, y: 70 }, { x: 2000, y: -40 },
                                { x: 3000, y: 70 }, { x: 4000, y: 60 },
                                { x: 5000, y: -50 }, { x: 6000, y: -40 },
                                { x: 7000, y: 40 }, { x: 8000, y: 70 }], xName: 'x', yName: 'y',
                            type: 'Column', fill: 'rgba(135,206,235,1)',
                            marker: { visible: false, dataLabel: { visible: true, fill: 'violet' } }
                        }],
                    width: '800',
                    title: 'Chart TS Title', loaded: loaded,
                    legendSettings: { visible: false }
                });
                chart.appendTo('#container');
                data_spec_2.unbindResizeEvents(chart);
            });
            afterAll(function () {
                chart.destroy();
                element.remove();
            });
            it('With Label position Auto', function (done) {
                loaded = function (args) {
                    dataLabelY = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('y');
                    pointY = chart.series[0].points[1].symbolLocations[0].y;
                    expect(dataLabelY < pointY).toBe(true);
                    dataLabelY = +document.getElementById('container_Series_0_Point_0_TextShape_0').getAttribute('y');
                    pointY = chart.series[0].points[0].symbolLocations[0].y;
                    expect(dataLabelY > pointY).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].marker.dataLabel.position = 'Auto';
                chart.refresh();
                data_spec_2.unbindResizeEvents(chart);
            });
            it('With Label position Outer', function (done) {
                loaded = function (args) {
                    dataLabelY = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('y');
                    pointY = chart.series[0].points[1].symbolLocations[0].y;
                    expect(dataLabelY < pointY).toBe(true);
                    dataLabelY = +document.getElementById('container_Series_0_Point_0_TextShape_0').getAttribute('y');
                    pointY = chart.series[0].points[0].symbolLocations[0].y;
                    expect(dataLabelY > pointY).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].marker.dataLabel.position = 'Outer';
                chart.refresh();
                data_spec_2.unbindResizeEvents(chart);
            });
            it('With Label position Top', function (done) {
                loaded = function (args) {
                    dataLabelY = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('y');
                    pointY = chart.series[0].points[1].symbolLocations[0].y;
                    expect(dataLabelY > pointY).toBe(true);
                    dataLabelY = +document.getElementById('container_Series_0_Point_0_TextShape_0').getAttribute('y');
                    pointY = chart.series[0].points[0].symbolLocations[0].y;
                    expect(dataLabelY < pointY).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].marker.dataLabel.position = 'Top';
                chart.series[0].marker.dataLabel.alignment = 'Center';
                chart.refresh();
                data_spec_2.unbindResizeEvents(chart);
            });
            it('With Label position Bottom', function (done) {
                loaded = function (args) {
                    dataLabelY = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('y');
                    var point = chart.series[0].points[1];
                    pointY = point.regions[0].x + point.regions[0].width;
                    expect(dataLabelY < pointY).toBe(true);
                    dataLabelY = +document.getElementById('container_Series_0_Point_0_TextShape_0').getAttribute('y');
                    point = chart.series[0].points[0];
                    pointY = point.regions[0].x;
                    expect(dataLabelY > pointY).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].marker.dataLabel.position = 'Bottom';
                chart.refresh();
                data_spec_2.unbindResizeEvents(chart);
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
                data_spec_2.unbindResizeEvents(chart);
            });
        });
        describe('checking Column rotated chart', function () {
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
                        { type: 'Column', name: 'columnSeries1', dataSource: data_spec_1.rotateData1, xName: 'x', yName: 'y', animation: { enable: false } },
                        { type: 'Column', name: 'columnSeries2', dataSource: data_spec_1.rotateData2, xName: 'x', yName: 'y', animation: { enable: false } }
                    ],
                    title: 'rotated Column Chart'
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
                    expect(+(dataLabel.getAttribute('x')) > point.symbolLocations[0].x).toBe(true);
                    dataLabel = document.getElementById('container_Series_0_Point_1_Text_0');
                    point = chart.series[0].points[1];
                    expect(+(dataLabel.getAttribute('x')) < point.symbolLocations[0].x).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].marker.dataLabel.visible = true;
                chart.refresh();
            });
            it('checking with datalabel Outer position', function (done) {
                loaded = function (args) {
                    dataLabel = document.getElementById('container_Series_0_Point_2_Text_0');
                    point = chart.series[0].points[2];
                    expect(+(dataLabel.getAttribute('x')) > point.symbolLocations[0].x).toBe(true);
                    dataLabel = document.getElementById('container_Series_0_Point_1_Text_0');
                    point = chart.series[0].points[1];
                    expect(+(dataLabel.getAttribute('x')) < point.symbolLocations[0].x).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].marker.dataLabel.position = 'Outer';
                chart.refresh();
            });
            it('checking with datalabel Top position', function (done) {
                loaded = function (args) {
                    dataLabel = document.getElementById('container_Series_0_Point_2_Text_0');
                    point = chart.series[0].points[2];
                    expect(+(dataLabel.getAttribute('x')) < point.symbolLocations[0].x).toBe(true);
                    dataLabel = document.getElementById('container_Series_0_Point_1_Text_0');
                    point = chart.series[0].points[1];
                    expect(+(dataLabel.getAttribute('x')) > point.symbolLocations[0].x).toBe(true);
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
                    expect(+(dataLabel.getAttribute('x')) < (point.symbolLocations[0].x + point.regions[0].width / 2)).toBe(true);
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
                    expect(+(dataLabel.getAttribute('x')) > point.symbolLocations[0].x - point.regions[0].width).toBe(true);
                    dataLabel = document.getElementById('container_Series_0_Point_1_Text_0');
                    point = chart.series[0].points[1];
                    expect(+(dataLabel.getAttribute('x')) < point.symbolLocations[0].x + point.regions[0].width).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].marker.dataLabel.position = 'Bottom';
                chart.refresh();
            });
            it('checking with tooltip positive values', function (done) {
                loaded = function (args) {
                    dataLabel = document.getElementById('container_Series_0_Point_2');
                    series = chart.series[0];
                    chartArea = document.getElementById('container_ChartAreaBorder');
                    y = series.points[2].regions[0].y + parseFloat(chartArea.getAttribute('y')) + element.offsetTop;
                    x = series.points[2].regions[0].x + parseFloat(chartArea.getAttribute('x')) + element.offsetLeft;
                    trigger.mousemovetEvent(dataLabel, Math.ceil(x), Math.ceil(y));
                    tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    expect(parseFloat(tooltip.style.left) > series.points[2].regions[0].x + parseFloat(chartArea.getAttribute('x')));
                    done();
                };
                chart.loaded = loaded;
                chart.tooltip.enable = true;
                chart.refresh();
            });
            it('checking with tooltip negative values', function (done) {
                loaded = function (args) {
                    dataLabel = document.getElementById('container_Series_0_Point_1');
                    y = series.points[1].regions[0].y + parseFloat(chartArea.getAttribute('y')) + element.offsetTop;
                    x = series.points[1].regions[0].x + parseFloat(chartArea.getAttribute('x')) + element.offsetLeft;
                    trigger.mousemovetEvent(dataLabel, Math.ceil(x), Math.ceil(y));
                    tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    expect(parseFloat(tooltip.style.left) > series.points[1].regions[0].x + parseFloat(chartArea.getAttribute('x')));
                    y = (parseFloat(chartArea.getAttribute('height')) + element.offsetTop) / 2 + 10;
                    x = (parseFloat(chartArea.getAttribute('width')) + element.offsetLeft) / 2 + 60;
                    trigger.mousemovetEvent(dataLabel, Math.ceil(x), Math.ceil(y));
                    done();
                };
                var animate = function (args) {
                    var tooltip = document.getElementById('container_Series_0_Point_1');
                    expect(tooltip.getAttribute('opacity') === '1').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.animationComplete = animate;
                chart.refresh();
            });
            it('checking with track ball', function (done) {
                loaded = function (args) {
                    dataLabel = document.getElementById('container_Series_0_Point_1');
                    y = series.points[1].regions[0].y + parseFloat(chartArea.getAttribute('y')) + element.offsetTop;
                    x = series.points[1].regions[0].x + parseFloat(chartArea.getAttribute('x')) + element.offsetLeft;
                    trigger.mousemovetEvent(dataLabel, Math.ceil(x), Math.ceil(y));
                    tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    expect(parseFloat(tooltip.style.top) > series.points[1].regions[0].y + parseFloat(chartArea.getAttribute('y')));
                    done();
                };
                chart.loaded = loaded;
                chart.animationComplete = null;
                chart.tooltip.shared = true;
                chart.refresh();
            });
        });
        describe('checking Column Width and Spacing', function () {
            var chart;
            var loaded;
            var chartId = 'column-chart';
            var element = ej2_base_1.createElement('div', { id: chartId });
            var point;
            beforeAll(function () {
                document.body.appendChild(element);
                chart = new chart_1.Chart({
                    primaryYAxis: {
                        labelFormat: '{value}%',
                        rangePadding: 'Normal',
                        minimum: 20, maximum: 45, interval: 5
                    },
                    enableSideBySidePlacement: false,
                    series: [
                        {
                            type: 'Column', name: 'India', xName: 'x', yName: 'y', fill: 'skyblue', visible: true,
                            dataSource: [
                                { x: 2005, y: 28 }, { x: 2006, y: 25 }, { x: 2007, y: 26 }, { x: 2008, y: 27 }
                            ], animation: { enable: false },
                            marker: { visible: true, dataLabel: { visible: true } }
                        },
                        {
                            type: 'Column', name: 'Germany', xName: 'x', yName: 'y', fill: 'purple', visible: true,
                            opacity: 0.8,
                            dataSource: [
                                { x: 2005, y: 31 }, { x: 2006, y: 28 }, { x: 2007, y: 30 }, { x: 2008, y: 36 }
                            ], animation: { enable: false },
                            marker: { visible: true, dataLabel: { visible: true } }
                        },
                        {
                            type: 'Column', name: 'Italy', xName: 'x', yName: 'y', fill: 'lightgreen', visible: true,
                            dataSource: [
                                { x: 2005, y: 26 }, { x: 2006, y: 30 }, { x: 2007, y: 28 }, { x: 2008, y: 32 }
                            ], animation: { enable: false },
                            marker: { visible: true, dataLabel: { visible: true } }
                        }
                    ],
                    legendSettings: { visible: false },
                    width: '800px',
                    height: '400px'
                });
                chart.appendTo('#' + chartId);
            });
            afterAll(function () {
                chart.destroy();
                element.remove();
            });
            it('side by side placement false checking', function (done) {
                loaded = function (args) {
                    point = document.getElementById(chartId + '_Series_0_Point_1');
                    var path = point.getAttribute('d').split(' ');
                    var x = parseInt(path[1], 10);
                    expect(x).toBe(214);
                    point = document.getElementById(chartId + '_Series_1_Point_1');
                    path = point.getAttribute('d').split(' ');
                    x = parseInt(path[1], 10);
                    expect(x).toBe(214);
                    point = document.getElementById(chartId + '_Series_2_Point_1');
                    path = point.getAttribute('d').split(' ');
                    x = parseInt(path[1], 10);
                    expect(x).toBe(214);
                    done();
                };
                chart.loaded = loaded;
                chart.refresh();
            });
            it('side by side placing enable true', function (done) {
                loaded = function (args) {
                    point = document.getElementById(chartId + '_Series_0_Point_1');
                    var path = point.getAttribute('d').split(' ');
                    var x = parseInt(path[1], 10);
                    expect(x).toBe(214);
                    point = document.getElementById(chartId + '_Series_1_Point_1');
                    path = point.getAttribute('d').split(' ');
                    x = parseInt(path[1], 10);
                    expect(x).toBe(258);
                    point = document.getElementById(chartId + '_Series_2_Point_1');
                    path = point.getAttribute('d').split(' ');
                    x = parseInt(path[1], 10);
                    expect(x === 302 || x === 301).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.enableSideBySidePlacement = true;
                chart.refresh();
            });
            it('Column width and spacing checking', function (done) {
                loaded = function (args) {
                    point = document.getElementById(chartId + '_Series_0_Point_1');
                    var path = point.getAttribute('d').split(' ');
                    var x = parseInt(path[1], 10);
                    expect(x).toBe(202);
                    point = document.getElementById(chartId + '_Series_1_Point_1');
                    path = point.getAttribute('d').split(' ');
                    x = parseInt(path[1], 10);
                    expect(x).toBe(264);
                    point = document.getElementById(chartId + '_Series_2_Point_1');
                    path = point.getAttribute('d').split(' ');
                    x = parseInt(path[1], 10);
                    expect(x === 327 || x === 326).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].columnWidth = 1;
                chart.series[0].columnSpacing = 0.5;
                chart.series[1].columnWidth = 1;
                chart.series[1].columnSpacing = 0.5;
                chart.series[2].columnWidth = 1;
                chart.series[2].columnSpacing = 0.5;
                chart.refresh();
            });
            it('Column Corner Radius Rounded rect checking', function (done) {
                loaded = function (args) {
                    point = document.getElementById(chartId + '_Series_0_Point_2');
                    var path = point.getAttribute('d').split(' ');
                    var x1 = parseInt(path[4], 10);
                    var y1 = parseInt(path[5], 10);
                    var x2 = parseInt(path[6], 10);
                    var y2 = parseInt(path[7], 10);
                    expect(x1 === 389 || x1 === 388).toBe(true);
                    expect(y1 === 269 || y1 === 268).toBe(true);
                    expect(x2 === 394 || x2 === 393).toBe(true);
                    expect(y2 === 269 || y2 === 268).toBe(true);
                    expect(y1 == y2).toBe(true);
                    x1 = parseInt(path[12], 10);
                    y1 = parseInt(path[13], 10);
                    x2 = parseInt(path[14], 10);
                    y2 = parseInt(path[15], 10);
                    expect(x1 === 420 || x1 === 419).toBe(true);
                    expect(y1 === 269 || y1 === 268).toBe(true);
                    expect(x2 === 420 || x2 === 419).toBe(true);
                    expect(y2 === 279 || y2 === 278).toBe(true);
                    expect(x1 == x2).toBe(true);
                    x1 = parseInt(path[20], 10);
                    y1 = parseInt(path[21], 10);
                    x2 = parseInt(path[22], 10);
                    y2 = parseInt(path[23], 10);
                    expect(x1 === 420 || x1 === 419).toBe(true);
                    expect(y1 === 354 || y1 === 353).toBe(true);
                    expect(x2 === 415 || x2 === 414).toBe(true);
                    expect(y2 === 354 || y2 === 353).toBe(true);
                    expect(y1 == y2).toBe(true);
                    x1 = parseInt(path[28], 10);
                    y1 = parseInt(path[29], 10);
                    x2 = parseInt(path[30], 10);
                    y2 = parseInt(path[31], 10);
                    expect(x1 === 389 || x1 === 388).toBe(true);
                    expect(y1 === 354 || y1 === 353).toBe(true);
                    expect(x2 === 389 || x2 === 388).toBe(true);
                    expect(y2 === 344 || y2 === 343).toBe(true);
                    expect(x1 == x2).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].cornerRadius = {
                    topLeft: 5, topRight: 10,
                    bottomLeft: 10, bottomRight: 5
                };
                chart.series[1].cornerRadius = {
                    topLeft: 5, topRight: 10,
                    bottomLeft: 10, bottomRight: 5
                };
                chart.series[2].cornerRadius = {
                    topLeft: 5, topRight: 10,
                    bottomLeft: 10, bottomRight: 5
                };
                chart.refresh();
            });
            it('side by side placing for combination series', function (done) {
                expect(chart.visibleSeries[0].position).toBe(0);
                expect(chart.visibleSeries[0].rectCount).toBe(3);
                expect(chart.visibleSeries[1].position).toBe(1);
                expect(chart.visibleSeries[1].rectCount).toBe(3);
                expect(chart.visibleSeries[2].position).toBe(2);
                expect(chart.visibleSeries[2].rectCount).toBe(3);
                loaded = function (args) {
                    expect(chart.visibleSeries[1].position).toBe(0);
                    expect(chart.visibleSeries[1].rectCount).toBe(2);
                    expect(chart.visibleSeries[2].position).toBe(1);
                    expect(chart.visibleSeries[2].rectCount).toBe(2);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].columnSpacing = 0;
                chart.series[1].columnSpacing = 0;
                chart.series[2].columnSpacing = 0;
                chart.series[0].columnWidth = 0.8;
                chart.series[1].columnWidth = 0.8;
                chart.series[2].columnWidth = 0.8;
                chart.series[0].type = 'Line';
                chart.refresh();
            });
        });
        describe('Column Series - Marker', function () {
            var chartObj;
            var loaded;
            var element;
            element = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(element);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'primaryXAxis', valueType: 'DateTime' },
                    primaryYAxis: { title: 'PrimaryYAxis' },
                    series: [
                        { type: 'Column', name: 'column series', dataSource: data_spec_1.rotateData1, xName: 'x', yName: 'y',
                            animation: { enable: false }, marker: { visible: true }
                        },
                    ],
                    width: '700'
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                element.remove();
            });
            it('Showing default marker', function (done) {
                loaded = function (args) {
                    var marker = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(marker !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Changing visibility', function (done) {
                loaded = function (args) {
                    var series1 = document.getElementById('containerSymbolGroup0');
                    expect(series1 == null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.visible = false;
                chartObj.refresh();
            });
            it('Changing size', function (done) {
                loaded = function (args) {
                    var series1 = document.getElementById('container_Series_0_Point_3_Symbol');
                    expect(series1.getAttribute('rx') == '5').toBe(true);
                    expect(series1.getAttribute('ry') == '5').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.visible = true;
                chartObj.series[0].marker.width = 10;
                chartObj.series[0].marker.height = 10;
                chartObj.refresh();
            });
            it('Checking specify marker color', function (done) {
                loaded = function (args) {
                    var series1 = document.getElementById('container_Series_0_Point_3_Symbol');
                    expect(series1.getAttribute('fill') == 'violet').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.fill = 'violet';
                chartObj.refresh();
            });
            it('with image', function (done) {
                loaded = function (args) {
                    var series1 = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(series1.getAttribute('href') == 'base/spec/img/img1.jpg').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Image';
                chartObj.series[0].marker.imageUrl = 'base/spec/img/img1.jpg';
                chartObj.series[0].marker.height = 20;
                chartObj.series[0].marker.width = 20;
                chartObj.refresh();
            });
            it('with marker properties', function (done) {
                loaded = function (args) {
                    var series1 = document.getElementById('container_Series_0_Point_2_Symbol');
                    expect(series1.getAttribute('fill') == 'green').toBe(true);
                    expect(series1.getAttribute('opacity') == '0.1').toBe(true);
                    expect(series1.getAttribute('stroke') == 'red').toBe(true);
                    expect(series1.getAttribute('stroke-width') == '4').toBe(true);
                    expect(series1.getAttribute('cx') == '262.99695921774384').toBe(true);
                    expect(series1.getAttribute('cy') == '170.39583333333334').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Circle';
                chartObj.series[0].marker.fill = 'green';
                chartObj.series[0].marker.opacity = 0.1;
                chartObj.series[0].marker.border = {
                    width: 4,
                    color: 'red'
                };
                chartObj.series[0].marker.offset = { x: 10, y: -5 };
                chartObj.refresh();
            });
            it('with marker and datalabel', function (done) {
                loaded = function (args) {
                    var series1 = document.getElementById('container_Series_0_Point_0_Symbol');
                    var datalabel = document.getElementById('container_Series_0_Point_0_Text_0');
                    expect(+(datalabel.getAttribute('y')) < +(series1.getAttribute('cy'))).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.offset = { x: 0, y: 0 };
                chartObj.series[0].marker.dataLabel.visible = true;
                chartObj.series[0].marker.dataLabel.position = 'Outer';
                chartObj.refresh();
            });
            it('with marker and datalabel color contrast', function (done) {
                loaded = function (args) {
                    var datalabel = document.getElementById('container_Series_0_Point_1_Text_0');
                    expect(datalabel.getAttribute('fill') === 'white').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Top';
                chartObj.series[0].fill = '#404041';
                chartObj.refresh();
            });
        });
        describe('Column series with drag and drop support', function () {
            var columnChart;
            var x;
            var y;
            var loaded;
            var trigger = new events_spec_1.MouseEvents();
            var columnContainer = ej2_base_1.createElement('div', { id: 'dragColumn' });
            beforeAll(function () {
                document.body.appendChild(columnContainer);
                columnChart = new chart_1.Chart({
                    primaryXAxis: {
                        valueType: 'DateTime',
                        labelFormat: 'y',
                        intervalType: 'Years',
                        edgeLabelPlacement: 'Shift',
                        majorGridLines: { width: 0 }
                    },
                    primaryYAxis: {
                        labelFormat: '{value}%',
                        rangePadding: 'None',
                        minimum: 0,
                        maximum: 100,
                        interval: 20,
                        lineStyle: { width: 0 },
                        majorTickLines: { width: 0 },
                        minorTickLines: { width: 0 }
                    },
                    chartArea: {
                        border: {
                            width: 0
                        }
                    },
                    series: [
                        {
                            type: 'Column',
                            dataSource: [
                                { x: new Date(2005, 0, 1), y: 21 }, { x: new Date(2006, 0, 1), y: 24 },
                                { x: new Date(2007, 0, 1), y: 36 }, { x: new Date(2008, 0, 1), y: 38 },
                                { x: new Date(2009, 0, 1), y: 54 }, { x: new Date(2010, 0, 1), y: 57 },
                                { x: new Date(2011, 0, 1), y: 70 }
                            ],
                            animation: { enable: false },
                            xName: 'x', width: 2, marker: {
                                visible: true,
                                width: 10,
                                height: 10
                            },
                            yName: 'y', name: 'Germany', dragSettings: { enable: true }
                        },
                    ],
                    title: 'Inflation - Consumer Price',
                    tooltip: {
                        enable: false
                    },
                });
                columnChart.appendTo('#dragColumn');
            });
            afterAll(function () {
                columnChart.destroy();
                columnContainer.remove();
            });
            it('Column series drag and drop with marker true', function (done) {
                loaded = function () {
                    var target = document.getElementById('dragColumn_Series_0_Point_3_Symbol');
                    var chartArea = document.getElementById('dragColumn_ChartAreaBorder');
                    y = parseFloat(target.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + columnContainer.offsetTop;
                    x = parseFloat(target.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + columnContainer.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    trigger.draganddropEvent(columnContainer, Math.ceil(x), Math.ceil(y), Math.ceil(x), Math.ceil(y) - 142);
                    var yValue = columnChart.visibleSeries[0].points[3].yValue;
                    expect(yValue == 80.27 || yValue == 79.68).toBe(true);
                    columnChart.loaded = null;
                    done();
                };
                columnChart.loaded = loaded;
                columnChart.refresh();
            });
            it('Column series drag and drop with marker false', function (done) {
                loaded = function () {
                    var target = document.getElementById('dragColumn_Series_0_Point_3');
                    var chartArea = document.getElementById('dragColumn_ChartAreaBorder');
                    x = columnChart.visibleSeries[0].points[3].regions[0].x + parseFloat(chartArea.getAttribute('x')) + columnContainer.offsetLeft;
                    y = columnChart.visibleSeries[0].points[3].regions[0].y + parseFloat(chartArea.getAttribute('y')) + columnContainer.offsetTop;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    trigger.draganddropEvent(columnContainer, Math.ceil(x), Math.ceil(y), Math.ceil(x), Math.ceil(y) - 142);
                    var yValue = columnChart.visibleSeries[0].points[3].yValue;
                    expect(yValue == 80.27 || yValue == 79.68).toBe(true);
                    columnChart.loaded = null;
                    done();
                };
                columnChart.series[0].marker.visible = false;
                columnChart.loaded = loaded;
                columnChart.refresh();
            });
            it('Column series drag and drop with x axis inversed', function (done) {
                loaded = function () {
                    var target = document.getElementById('dragColumn_Series_0_Point_3_Symbol');
                    var chartArea = document.getElementById('dragColumn_ChartAreaBorder');
                    y = parseFloat(target.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + columnContainer.offsetTop;
                    x = parseFloat(target.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + columnContainer.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    trigger.draganddropEvent(columnContainer, Math.ceil(x), Math.ceil(y), Math.ceil(x), Math.ceil(y) - 142);
                    var yValue = columnChart.visibleSeries[0].points[3].yValue;
                    expect(yValue == 80.27 || yValue == 79.68).toBe(true);
                    columnChart.loaded = null;
                    done();
                };
                columnChart.primaryXAxis.isInversed = true;
                columnChart.series[0].marker.visible = true;
                columnChart.loaded = loaded;
                columnChart.refresh();
            });
            it('Column series drag and drop with y axis inversed', function (done) {
                loaded = function () {
                    var target = document.getElementById('dragColumn_Series_0_Point_3_Symbol');
                    var chartArea = document.getElementById('dragColumn_ChartAreaBorder');
                    y = parseFloat(target.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + columnContainer.offsetTop;
                    x = parseFloat(target.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + columnContainer.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    trigger.draganddropEvent(columnContainer, Math.ceil(x), Math.ceil(y), Math.ceil(x), Math.ceil(y) + 142);
                    var yValue = columnChart.visibleSeries[0].points[3].yValue;
                    expect(yValue == 80.72 || yValue == 80.12).toBe(true);
                    columnChart.loaded = null;
                    done();
                };
                columnChart.primaryXAxis.isInversed = true;
                columnChart.primaryYAxis.isInversed = true;
                columnChart.series[0].marker.visible = true;
                columnChart.loaded = loaded;
                columnChart.refresh();
            });
            it('Column series drag and drop with isTransposed true', function (done) {
                loaded = function () {
                    var target = document.getElementById('dragColumn_Series_0_Point_3_Symbol');
                    var chartArea = document.getElementById('dragColumn_ChartAreaBorder');
                    y = parseFloat(target.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + columnContainer.offsetTop;
                    x = parseFloat(target.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + columnContainer.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    trigger.draganddropEvent(columnContainer, Math.ceil(x), Math.ceil(y), Math.ceil(x) - 142, Math.ceil(y));
                    var yValue = columnChart.visibleSeries[0].points[3].yValue;
                    expect(yValue == 17.89 || yValue == 18.26).toBe(true);
                    columnChart.loaded = null;
                    done();
                };
                columnChart.primaryXAxis.isInversed = false;
                columnChart.primaryYAxis.isInversed = false;
                columnChart.isTransposed = true;
                columnChart.loaded = loaded;
                columnChart.refresh();
            });
            it('Column series drag and drop with dragged point fill color', function (done) {
                loaded = function () {
                    var target = document.getElementById('dragColumn_Series_0_Point_3_Symbol');
                    var chartArea = document.getElementById('dragColumn_ChartAreaBorder');
                    y = parseFloat(target.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + columnContainer.offsetTop;
                    x = parseFloat(target.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + columnContainer.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    trigger.draganddropEvent(columnContainer, Math.ceil(x), Math.ceil(y), Math.ceil(x), Math.ceil(y) - 142);
                    var yValue = columnChart.visibleSeries[0].points[3].yValue;
                    expect(yValue == 80.27 || yValue == 79.68).toBe(true);
                    var color = document.getElementById('dragColumn_Series_0_Point_3').getAttribute('fill');
                    expect(color === 'red').toBe(true);
                    columnChart.loaded = null;
                    done();
                };
                columnChart.isTransposed = false;
                columnChart.series[0].dragSettings.fill = 'red';
                columnChart.loaded = loaded;
                columnChart.refresh();
            });
        });
        describe('Column series with grouping support', function () {
            var columnChart;
            var x;
            var y;
            var loaded;
            var trigger = new events_spec_1.MouseEvents();
            var columnContainer = ej2_base_1.createElement('div', { id: 'groupColumn' });
            beforeAll(function () {
                document.body.appendChild(columnContainer);
                columnChart = new chart_1.Chart({
                    primaryXAxis: {
                        valueType: 'Category', interval: 1, majorGridLines: { width: 0 }
                    },
                    chartArea: { border: { width: 0 } },
                    primaryYAxis: {
                        majorGridLines: { width: 0 },
                        majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' }
                    },
                    enableSideBySidePlacement: true,
                    series: [
                        {
                            type: 'Column', xName: 'x', width: 2, yName: 'y', name: 'Total',
                            dataSource: [{ x: 'Jamesh', y: 10, text: 'Total 10' },
                                { x: 'Michael', y: 9, text: 'Total 9' }, { x: 'John', y: 11, text: 'Total 11' }],
                            columnWidth: 0.6,
                            groupName: 'A',
                            marker: { dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }
                        },
                        {
                            type: 'Column', xName: 'x', width: 2, yName: 'y', name: 'Orange',
                            dataSource: [{ x: 'Jamesh', y: 4 }, { x: 'Michael', y: 3 }, { x: 'John', y: 4 }],
                            columnWidth: 0.4,
                            groupName: 'A',
                            marker: { dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }
                        },
                        {
                            type: 'Column', xName: 'x', width: 2, yName: 'y', name: 'Orange',
                            dataSource: [{ x: 'Jamesh', y: 3 }, { x: 'Michael', y: 3 }, { x: 'John', y: 4 }],
                            columnWidth: 0.6,
                            groupName: 'B',
                            marker: { dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }
                        },
                        {
                            type: 'Column', xName: 'x', width: 2, yName: 'y', name: 'Grapes',
                            dataSource: [{ x: 'Jamesh', y: 2 }, { x: 'Michael', y: 2 }, { x: 'John', y: 2 }],
                            columnWidth: 0.4,
                            groupName: 'B',
                            marker: { dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }
                        }
                    ],
                    title: 'Fruit Consumption',
                    tooltip: { enable: true, shared: true },
                });
                columnChart.appendTo('#groupColumn');
            });
            afterAll(function () {
                columnChart.destroy();
                columnContainer.remove();
            });
            it('Column series group support', function (done) {
                loaded = function () {
                    var direction = document.getElementById('groupColumn_Series_0_Point_0').getAttribute('d').split(' ');
                    var point = parseFloat(direction[direction.indexOf('L') + 1]);
                    var direction1 = document.getElementById('groupColumn_Series_1_Point_0').getAttribute('d').split(' ');
                    var point1 = parseFloat(direction1[direction1.indexOf('L') + 1]);
                    expect(point > point1).toBe(true);
                    var direction2 = document.getElementById('groupColumn_Series_2_Point_0').getAttribute('d').split(' ');
                    var point2 = parseFloat(direction2[direction2.indexOf('L') + 1]);
                    var direction3 = document.getElementById('groupColumn_Series_3_Point_0').getAttribute('d').split(' ');
                    var point3 = parseFloat(direction3[direction3.indexOf('L') + 1]);
                    expect(point2 > point3).toBe(true);
                    columnChart.loaded = null;
                    done();
                };
                columnChart.series[0].animation.enable = false;
                columnChart.series[1].animation.enable = false;
                columnChart.series[2].animation.enable = false;
                columnChart.series[3].animation.enable = false;
                columnChart.loaded = loaded;
                columnChart.refresh();
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
