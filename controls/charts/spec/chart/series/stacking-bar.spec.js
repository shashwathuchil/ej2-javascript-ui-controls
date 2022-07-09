define(["require", "exports", "@syncfusion/ej2-base", "../../../src/chart/chart", "../../../src/chart/series/line-series", "../../../src/chart/series/stacking-bar-series", "../../../src/chart/series/column-series", "../../../src/chart/series/data-label", "../../../src/chart/axis/date-time-axis", "../../../src/chart/axis/category-axis", "../../../src/chart/series/bar-series", "../base/events.spec", "../base/data.spec", "../../common.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, chart_1, line_series_1, stacking_bar_series_1, column_series_1, data_label_1, date_time_axis_1, category_axis_1, bar_series_1, events_spec_1, data_spec_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(line_series_1.LineSeries, stacking_bar_series_1.StackingBarSeries, column_series_1.ColumnSeries, date_time_axis_1.DateTime, category_axis_1.Category, bar_series_1.BarSeries, data_label_1.DataLabel);
    var data = data_spec_1.tooltipData1;
    var data2 = data_spec_1.tooltipData2;
    var dateTime = data_spec_1.datetimeData;
    describe('Chart Control', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('Chart stackingBar series', function () {
            var chartObj;
            var elem;
            var point1;
            var point2;
            var point3;
            var svg;
            var targetElement;
            var loaded;
            var done;
            var dataLabel1;
            var dataLabel2;
            var dataLabel3;
            beforeAll(function () {
                elem = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal' },
                    series: [{
                            dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                            name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)', stackingGroup: ''
                        },
                        {
                            dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                            name: 'ChartSeriesNameSilver', fill: 'rgba(135,000,235,1)', stackingGroup: ''
                        },
                        {
                            dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                            name: 'ChartSeriesNameRuby', fill: 'rgba(135,000,000,1)', stackingGroup: ''
                        },
                    ], width: '800',
                    title: 'Chart TS Title', legendSettings: { visible: false }
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                elem.remove();
            });
            it('Checking with default points', function (done) {
                loaded = function (args) {
                    point1 = document.getElementById('container_Series_0_Point_0');
                    expect(point1.getAttribute('fill') == 'rgba(135,206,235,1)').toBe(true);
                    point2 = document.getElementById('container_Series_1_Point_1');
                    expect(point2.getAttribute('fill') == 'rgba(135,000,235,1)').toBe(true);
                    point3 = document.getElementById('container_Series_2_Point_1');
                    expect(point3.getAttribute('fill') == 'rgba(135,000,000,1)').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking percentage value for points', function (done) {
                loaded = function (args) {
                    var point = chartObj.visibleSeries[0].points[0];
                    expect(point.percentage != null).toBe(true);
                    expect(point.percentage).toBe(32.41);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking with null Points', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_3');
                    expect(svg == null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = data;
                chartObj.series[0].dataSource[3].y = null;
                chartObj.refresh();
            });
            it('Checking with single Points', function (done) {
                loaded = function (args) {
                    var svg1 = document.getElementById('container_Series_0_Point_0');
                    expect(svg1 != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.rangePadding = 'Additional';
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.series[0].dataSource = null;
                chartObj.series[0].dataSource = [{ x: 4, y: 30 }];
                chartObj.series[1].dataSource = null;
                chartObj.series[1].dataSource = [{ x: 4, y: 30 }];
                chartObj.series[2].dataSource = null;
                chartObj.series[2].dataSource = [{ x: 4, y: 30 }];
                chartObj.refresh();
            });
            it('Checking with single Points for stackingbar100 series', function (done) {
                loaded = function (args) {
                    var svg1 = document.getElementById('container_Series_0_Point_0');
                    expect(svg1 != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.rangePadding = 'Additional';
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.series[0].dataSource = null;
                chartObj.series[0].dataSource = [{ x: 4, y: 30 }];
                chartObj.series[1].dataSource = null;
                chartObj.series[1].dataSource = [{ x: 4, y: 30 }];
                chartObj.series[2].dataSource = null;
                chartObj.series[2].dataSource = [{ x: 4, y: 30 }];
                chartObj.series[0].type = 'StackingBar100';
                chartObj.series[1].type = 'StackingBar100';
                chartObj.refresh();
            });
            it('Checking with negative Points', function (done) {
                loaded = function (args) {
                    var zeroLabel = document.getElementById('container1_AxisLabel_3');
                    var series1 = args.chart.series[0];
                    expect(series1.points[1].regions[0].y < parseFloat(zeroLabel.getAttribute('y'))).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'StackingBar';
                chartObj.series[1].type = 'StackingBar';
                chartObj.series[0].dataSource = data_spec_1.negativeDataPoint;
                chartObj.refresh();
            });
            it('checking multiple series chart', function (done) {
                loaded = function (args) {
                    var series1 = args.chart.series[0];
                    var series2 = args.chart.series[1];
                    expect(series1.points[2].regions[0].y == series2.points[2].regions[0].height + series2.points[2].regions[0].y).toBe(true);
                    done();
                };
                chartObj.series = [{
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                        name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)', stackingGroup: 'a'
                    },
                    {
                        dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                        name: 'ChartSeriesNameSilver', fill: 'rgba(135,000,235,1)', stackingGroup: 'b'
                    },
                    {
                        dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                        name: 'ChartSeriesNameSilver', fill: 'rgba(135,000,000,1)',
                    }
                ];
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('checking multiple series with diff orientation(horizontal) ', function (done) {
                loaded = function (args) {
                    var point1 = document.getElementById('container_Series_0_Point_0');
                    var point2 = document.getElementById('container_Series_1_Point_0');
                    expect(point2 == null).toBe(true);
                    done();
                };
                chartObj.series = [{
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                        name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
                    },
                    {
                        dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Line',
                        name: 'ChartSeriesNameSilver', fill: 'rgba(135,000,235,1)',
                    },
                    {
                        dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                        name: 'ChartSeriesNameSilver', fill: 'rgba(135,000,000,1)',
                    }
                ];
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it(' checking with category  axis', function (done) {
                loaded = function (args) {
                    point1 = document.getElementById("container_Series_0_Point_1");
                    var point2 = document.getElementById("container_Series_1_Point_1");
                    expect(point1.getAttribute('fill') == 'rgba(135,206,235,1)').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.series = [{
                        dataSource: data_spec_1.categoryData, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                        name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
                    },
                    {
                        dataSource: data_spec_1.categoryData1, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                        name: 'ChartSeriesNameSilver', fill: 'rgba(135,000,235,1)',
                    },
                    {
                        dataSource: data_spec_1.categoryData1, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                        name: 'ChartSeriesNameRuby', fill: 'rgba(135,000,000,1)',
                    }],
                    chartObj.refresh();
            });
            it(' checking with datetime  axis', function (done) {
                loaded = function (args) {
                    point1 = document.getElementById("container_Series_0_Point_1");
                    var point2 = document.getElementById("container_Series_1_Point_1");
                    expect(point1.getAttribute('fill') == 'rgba(135,206,235,1)').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'DateTime';
                chartObj.series = [{
                        dataSource: data_spec_1.datetimeData, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                        name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)'
                    },
                    {
                        dataSource: data_spec_1.datetimeData, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                        name: 'ChartSeriesNameSilver', fill: 'rgba(000,206,235,1)'
                    }],
                    chartObj.refresh();
            });
            it('Checking with multiple axes ', function (done) {
                loaded = function (args) {
                    point1 = document.getElementById('container_Series_0_Point_0');
                    expect(point1.getAttribute('fill') === 'red').toBe(true);
                    point2 = document.getElementById('container_Series_1_Point_1');
                    expect(point2.getAttribute('fill') === 'rgba(135,000,235,1)').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.axes = [{
                        columnIndex: 1, name: 'xAxis1', title: 'AdditionalAxis',
                        titleStyle: { size: '14px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' },
                        labelStyle: { size: '12px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' }
                    }];
                chartObj.series = [{
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                        name: 'ChartSeriesNameGold', fill: 'red'
                    },
                    {
                        dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                        name: 'ChartSeriesNameSilver', fill: 'rgba(135,000,235,1)'
                    },
                    {
                        dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                        name: 'ChartSeriesNamePearl', fill: 'rgba(135,000,000,1)'
                    },
                    {
                        dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar',
                        name: 'ChartSeriesNameRuby', fill: 'rgba(135,000,000,1)',
                    }];
                chartObj.width = '800';
                chartObj.series[1].yAxisName = 'xAxis1';
                chartObj.series[2].yAxisName = 'xAxis1';
                chartObj.columns = [{ width: '400', border: { width: 4, color: 'red' } },
                    { width: '400', border: { width: 4, color: 'blue' } }];
                chartObj.refresh();
            });
            it('Checking animation for stackingbar100 series', function (done) {
                chartObj.loaded = null;
                chartObj.series[0].animation.enable = true;
                chartObj.series[1].animation.enable = true;
                chartObj.series[2].animation.enable = true;
                chartObj.series[3].animation.enable = true;
                chartObj.animationComplete = function (args) {
                    var point = document.getElementById('container_Series_' + args.series.index + '_Point_0');
                    expect(point.getAttribute('transform') == 'translate(0,0)').toBe(true);
                    done();
                };
                chartObj.refresh();
            });
        });
        describe('StackingBar Series with data label', function () {
            var chartObj;
            var loaded;
            var element;
            element = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(element);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis', rangePadding: 'Normal' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal' },
                    series: [{
                            animation: { enable: false },
                            name: 'ChartSeriesNameGold', dataSource: data_spec_1.negativeDataPoint, xName: 'x', yName: 'y',
                            type: 'StackingBar', fill: 'rgba(135,206,235,1)', stackingGroup: 'a',
                            marker: { visible: false, dataLabel: { visible: true, fill: 'violet' } }
                        },
                        {
                            animation: { enable: false },
                            name: 'ChartSeriesNameSilver', dataSource: data2, xName: 'x', yName: 'y',
                            type: 'StackingBar', fill: 'green', stackingGroup: 'a',
                            marker: { visible: false, dataLabel: { visible: true, fill: 'black' } }
                        },
                        {
                            animation: { enable: false },
                            name: 'ChartSeriesNameSilver', dataSource: data2, xName: 'x', yName: 'y',
                            type: 'StackingBar', fill: 'yellow', stackingGroup: 'b',
                            marker: { visible: false, dataLabel: { visible: true, fill: 'black' } }
                        },
                    ],
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
            it('With negative location with auto position', function (done) {
                loaded = function (args) {
                    var svg = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('x');
                    var point0Location = chartObj.series[0].points[1].regions[0].x;
                    expect(svg > point0Location).toBe(true);
                    svg = +document.getElementById('container_Series_2_Point_6_TextShape_0').getAttribute('x');
                    point0Location = chartObj.series[2].points[6].regions[0].x;
                    expect(svg == (point0Location + 5)).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('With negative location with auto position for stackingbar100', function (done) {
                loaded = function (args) {
                    var svg = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('x');
                    var point0Location = chartObj.series[0].points[1].regions[0].x;
                    expect(svg > point0Location).toBe(true);
                    svg = +document.getElementById('container_Series_2_Point_6_TextShape_0').getAttribute('x');
                    point0Location = chartObj.series[2].points[6].regions[0].x;
                    expect(svg == (point0Location + 5)).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'StackingBar100';
                chartObj.series[1].type = 'StackingBar100';
                chartObj.refresh();
            });
            it('With Label position Top for stackingbar100', function (done) {
                loaded = function (args) {
                    var svg = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('x');
                    var point0Location = chartObj.series[0].points[1].symbolLocations[0].x;
                    expect(svg > point0Location).toBe(true);
                    var svg1 = +document.getElementById('container_Series_0_Point_0_TextShape_0').getAttribute('x');
                    var point0Location1 = chartObj.series[0].points[0].symbolLocations[0].x;
                    expect(svg1 < point0Location1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Top';
                chartObj.series[0].marker.dataLabel.alignment = 'Center';
                chartObj.refresh();
            });
            it('With Label position Top for stackingbar', function (done) {
                loaded = function (args) {
                    var svg = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('x');
                    var point0Location = chartObj.series[0].points[1].symbolLocations[0].x;
                    expect(svg > point0Location).toBe(true);
                    var svg1 = +document.getElementById('container_Series_0_Point_0_TextShape_0').getAttribute('x');
                    var point0Location1 = chartObj.series[0].points[0].symbolLocations[0].x;
                    expect(svg1 < point0Location1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Top';
                chartObj.series[0].marker.dataLabel.alignment = 'Center';
                chartObj.series[0].type = 'StackingBar';
                chartObj.series[1].type = 'StackingBar';
                chartObj.refresh();
            });
            it('With Label position Outer for stackingbar', function (done) {
                loaded = function (args) {
                    var svg = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('x');
                    var point0Location = chartObj.series[0].points[1].symbolLocations[0].x;
                    expect(svg < point0Location).toBe(true);
                    var svg1 = +document.getElementById('container_Series_0_Point_0_TextShape_0').getAttribute('x');
                    var point0Location1 = chartObj.series[0].points[0].symbolLocations[0].x;
                    expect(svg1 > point0Location1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Outer';
                chartObj.series[0].marker.dataLabel.alignment = 'Center';
                chartObj.refresh();
            });
            it('With Label position Outer for stackingbar100', function (done) {
                loaded = function (args) {
                    var svg = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('x');
                    var point0Location = chartObj.series[0].points[1].symbolLocations[0].x;
                    expect(svg > point0Location).toBe(true);
                    var svg1 = +document.getElementById('container_Series_0_Point_0_TextShape_0').getAttribute('x');
                    var point0Location1 = chartObj.series[0].points[0].symbolLocations[0].x;
                    expect(svg1 < point0Location1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Outer';
                chartObj.series[0].marker.dataLabel.alignment = 'Center';
                chartObj.series[0].type = 'StackingBar100';
                chartObj.series[1].type = 'StackingBar100';
                chartObj.refresh();
            });
            it('With Label position Top and alignment near for stackingbar100', function (done) {
                loaded = function (args) {
                    var svg = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('x');
                    var point0Location = chartObj.series[0].points[1].symbolLocations[0].x;
                    expect(svg > point0Location).toBe(true);
                    var svg1 = +document.getElementById('container_Series_0_Point_0_TextShape_0').getAttribute('x');
                    var point0Location1 = chartObj.series[0].points[0].symbolLocations[0].x;
                    expect(svg1 < point0Location1).toBe(true);
                    done();
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Top';
                chartObj.series[0].marker.dataLabel.alignment = 'Near';
                chartObj.refresh();
            });
            it('With Label position Top and alignment near for stackingbar', function (done) {
                loaded = function (args) {
                    var svg = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('x');
                    var point0Location = chartObj.series[0].points[1].symbolLocations[0].x;
                    expect(svg > point0Location).toBe(true);
                    var svg1 = +document.getElementById('container_Series_0_Point_0_TextShape_0').getAttribute('x');
                    var point0Location1 = chartObj.series[0].points[0].symbolLocations[0].x;
                    expect(svg1 < point0Location1).toBe(true);
                    done();
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Top';
                chartObj.series[0].marker.dataLabel.alignment = 'Near';
                chartObj.series[0].type = 'StackingBar';
                chartObj.series[1].type = 'StackingBar';
                chartObj.refresh();
            });
            it('With Label position Bottom for stackingbar', function (done) {
                loaded = function (args) {
                    var svg = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('x');
                    var point0Location = chartObj.series[0].points[1].regions[0].x +
                        chartObj.series[0].points[1].regions[0].width;
                    expect(svg < point0Location).toBe(true);
                    var svg1 = +document.getElementById('container_Series_0_Point_0_TextShape_0').getAttribute('x');
                    var point0Location1 = chartObj.series[0].points[0].regions[0].x;
                    expect(svg1 > point0Location1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Bottom';
                chartObj.series[0].marker.dataLabel.alignment = 'Center';
                chartObj.series[1].marker.dataLabel.position = 'Bottom';
                chartObj.series[2].marker.dataLabel.position = 'Bottom';
                chartObj.refresh();
            });
            it('With Label position Bottom for stackingbar100', function (done) {
                loaded = function (args) {
                    var svg = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('x');
                    var point0Location = chartObj.series[0].points[1].regions[0].x +
                        chartObj.series[0].points[1].regions[0].width;
                    expect(svg < point0Location).toBe(true);
                    var svg1 = +document.getElementById('container_Series_0_Point_0_TextShape_0').getAttribute('x');
                    var point0Location1 = chartObj.series[0].points[0].regions[0].x;
                    expect(svg1 > point0Location1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Bottom';
                chartObj.series[0].marker.dataLabel.alignment = 'Center';
                chartObj.series[1].marker.dataLabel.position = 'Bottom';
                chartObj.series[2].marker.dataLabel.position = 'Bottom';
                chartObj.series[0].type = 'StackingBar100';
                chartObj.series[1].type = 'StackingBar100';
                chartObj.refresh();
            });
            it('With Label position Middle for stackingbar100', function (done) {
                loaded = function (args) {
                    var svg = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('y');
                    var svgHeight = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('height');
                    var point0Location = chartObj.series[0].points[1].symbolLocations[0].y;
                    expect(svg < point0Location).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Middle';
                chartObj.series[1].marker.dataLabel.position = 'Middle';
                chartObj.series[2].marker.dataLabel.position = 'Middle';
                chartObj.refresh();
            });
            it('With Label position Middle for stackingbar', function (done) {
                loaded = function (args) {
                    var svg = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('y');
                    var svgHeight = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('height');
                    var point0Location = chartObj.series[0].points[1].symbolLocations[0].y;
                    expect(svg < point0Location).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Middle';
                chartObj.series[1].marker.dataLabel.position = 'Middle';
                chartObj.series[2].marker.dataLabel.position = 'Middle';
                chartObj.series[0].type = 'StackingBar';
                chartObj.series[1].type = 'StackingBar';
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
                chartObj.series[0].marker.dataLabel.alignment = 'Far';
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
        describe('Stacking Bar Series Inversed axis', function () {
            var chart;
            var loaded;
            var element;
            var dataLabelX;
            var pointX;
            element = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(element);
                chart = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal', isInversed: true },
                    series: [{
                            animation: { enable: false }, name: 'seriesFirst',
                            dataSource: [{ x: 1000, y: 70 }, { x: 2000, y: -40 }, { x: 3000, y: 70 }, { x: 4000, y: 60 },
                                { x: 5000, y: -50 }, { x: 6000, y: -40 }, { x: 7000, y: 40 }, { x: 8000, y: 70 }], xName: 'x', yName: 'y',
                            type: 'StackingBar', marker: { visible: false, dataLabel: { visible: true, fill: 'violet' } }
                        },
                        {
                            animation: { enable: false }, name: 'seriesSecond',
                            dataSource: [{ x: 1000, y: 70 }, { x: 2000, y: 40 }, { x: 3000, y: 90 }, { x: 4000, y: 50 },
                                { x: 5000, y: 50 }, { x: 6000, y: 60 }, { x: 7000, y: -40 }, { x: 8000, y: -70 }], xName: 'x', yName: 'y',
                            type: 'StackingBar', marker: { visible: false, dataLabel: { visible: true, fill: 'violet' } }
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
                    dataLabelX = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('x');
                    pointX = chart.series[0].points[1].symbolLocations[0].x;
                    expect(dataLabelX < pointX).toBe(true);
                    dataLabelX = +document.getElementById('container_Series_0_Point_0_TextShape_0').getAttribute('x');
                    pointX = chart.series[0].points[0].symbolLocations[0].x;
                    expect(dataLabelX > pointX).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].marker.dataLabel.position = 'Auto';
                chart.refresh();
            });
            it('With Label position Outer', function (done) {
                loaded = function (args) {
                    dataLabelX = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('x');
                    pointX = chart.series[0].points[1].symbolLocations[0].x;
                    expect(dataLabelX > pointX).toBe(true);
                    dataLabelX = +document.getElementById('container_Series_0_Point_0_TextShape_0').getAttribute('x');
                    pointX = chart.series[0].points[0].symbolLocations[0].x;
                    expect(dataLabelX < pointX).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].marker.dataLabel.position = 'Outer';
                chart.refresh();
            });
            it('With Label position Top', function (done) {
                loaded = function (args) {
                    dataLabelX = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('x');
                    pointX = chart.series[0].points[1].symbolLocations[0].x;
                    expect(dataLabelX < pointX).toBe(true);
                    dataLabelX = +document.getElementById('container_Series_0_Point_0_TextShape_0').getAttribute('x');
                    pointX = chart.series[0].points[0].symbolLocations[0].x;
                    expect(dataLabelX > pointX).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].marker.dataLabel.position = 'Top';
                chart.series[0].marker.dataLabel.alignment = 'Center';
                chart.refresh();
            });
            it('With Label position Bottom', function (done) {
                loaded = function (args) {
                    dataLabelX = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('x');
                    var point = chart.series[0].points[1];
                    pointX = point.regions[0].x - point.regions[0].width;
                    expect(dataLabelX > pointX).toBe(true);
                    dataLabelX = +document.getElementById('container_Series_0_Point_0_TextShape_0').getAttribute('x');
                    point = chart.series[0].points[0];
                    pointX = point.regions[0].x + point.regions[0].width;
                    expect(dataLabelX < pointX).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].marker.dataLabel.position = 'Bottom';
                chart.refresh();
            });
            it('With Label position Middle', function (done) {
                loaded = function (args) {
                    var labelX = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('x');
                    var labelHeight = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('width');
                    var point = chart.series[0].points[1];
                    expect(labelX + labelHeight / 2).toEqual(point.regions[0].x + point.regions[0].width / 2);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].marker.dataLabel.position = 'Middle';
                chart.refresh();
            });
        });
        describe('checking rotated stacking bar chart', function () {
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
                        { type: 'StackingBar', name: 'barSeries1', dataSource: data_spec_1.rotateData1, xName: 'x', yName: 'y', animation: { enable: false } },
                        { type: 'StackingBar', name: 'barSeries2', dataSource: data_spec_1.rotateData2, xName: 'x', yName: 'y', animation: { enable: false } }
                    ],
                    title: 'rotated StackingBar Chart',
                    width: '700'
                });
                chart.appendTo('#container');
            });
            afterAll(function () {
                chart.destroy();
                element.remove();
            });
            it('checking without rotated', function (done) {
                loaded = function (args) {
                    var axis = chart.primaryYAxis;
                    expect(axis.orientation).toEqual('Horizontal');
                    axis = chart.primaryXAxis;
                    expect(axis.orientation).toEqual('Vertical');
                    done();
                };
                chart.loaded = loaded;
                chart.refresh();
            });
            it('checking with rotated', function (done) {
                loaded = function (args) {
                    var axis = chart.primaryXAxis;
                    expect(axis.orientation).toEqual('Horizontal');
                    axis = chart.primaryYAxis;
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
                    expect(+(dataLabel.getAttribute('y')) > point.symbolLocations[0].y).toBe(true);
                    dataLabel = document.getElementById('container_Series_0_Point_1_Text_0');
                    point = chart.series[0].points[1];
                    expect(+(dataLabel.getAttribute('y')) < point.symbolLocations[0].y).toBe(true);
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
                    expect(+(dataLabel.getAttribute('y')) < point.symbolLocations[0].y).toBe(true);
                    dataLabel = document.getElementById('container_Series_0_Point_1_Text_0');
                    point = chart.series[0].points[1];
                    expect(+(dataLabel.getAttribute('y')) > point.symbolLocations[0].y).toBe(true);
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
                    expect(+(dataLabel.getAttribute('y')) > point.symbolLocations[0].y).toBe(true);
                    dataLabel = document.getElementById('container_Series_0_Point_1_Text_0');
                    point = chart.series[0].points[1];
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
                    expect(+(dataLabel.getAttribute('y')) > (point.symbolLocations[0].y + point.regions[0].height / 2)).toBe(true);
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
                    expect(+(dataLabel.getAttribute('y')) < point.symbolLocations[0].y + point.regions[0].height).toBe(true);
                    dataLabel = document.getElementById('container_Series_0_Point_1_Text_0');
                    point = chart.series[0].points[1];
                    expect(+(dataLabel.getAttribute('y')) > point.symbolLocations[0].y - point.regions[0].height).toBe(true);
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
                    expect(parseFloat(tooltip.style.top) < series.points[2].regions[0].y + parseFloat(chartArea.getAttribute('y')));
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
                    expect(parseFloat(tooltip.style.top) > series.points[1].regions[0].y + parseFloat(chartArea.getAttribute('y')));
                    done();
                };
                chart.loaded = loaded;
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
                chart.tooltip.shared = true;
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
