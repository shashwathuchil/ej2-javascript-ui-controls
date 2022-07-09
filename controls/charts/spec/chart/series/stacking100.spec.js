define(["require", "exports", "@syncfusion/ej2-base", "../../../src/chart/chart", "../../../src/chart/axis/date-time-axis", "../../../src/chart/axis/category-axis", "../../../src/chart/axis/logarithmic-axis", "../../../src/chart/series/data-label", "../../../src/chart/series/stacking-column-series", "../../../src/chart/series/column-series", "../../../src/chart/series/bar-series", "../../../src/chart/series/area-series", "../../../src/chart/series/line-series", "../../../src/chart/user-interaction/tooltip", "../../../src/chart/user-interaction/selection", "../../../src/chart/user-interaction/crosshair", "../../../src/chart/user-interaction/zooming", "../../../src/chart/series/stacking-bar-series", "../../../src/chart/series/stacking-area-series", "../base/events.spec", "../base/data.spec", "../../../src/chart/legend/legend", "../../common.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, chart_1, date_time_axis_1, category_axis_1, logarithmic_axis_1, data_label_1, stacking_column_series_1, column_series_1, bar_series_1, area_series_1, line_series_1, tooltip_1, selection_1, crosshair_1, zooming_1, stacking_bar_series_1, stacking_area_series_1, events_spec_1, data_spec_1, legend_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(date_time_axis_1.DateTime, category_axis_1.Category, data_label_1.DataLabel, stacking_column_series_1.StackingColumnSeries, stacking_bar_series_1.StackingBarSeries, column_series_1.ColumnSeries, legend_1.Legend, stacking_area_series_1.StackingAreaSeries, logarithmic_axis_1.Logarithmic, bar_series_1.BarSeries, area_series_1.AreaSeries, line_series_1.LineSeries, tooltip_1.Tooltip, crosshair_1.Crosshair, zooming_1.Zoom, selection_1.Selection);
    var trigger = new events_spec_1.MouseEvents();
    var data = data_spec_1.tooltipData11;
    var data2 = data_spec_1.tooltipData12;
    var negativPoint = data_spec_1.negativeDataPoint;
    var dateTime = data_spec_1.datetimeData11;
    describe('Chart Control', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('Chart StackingColumn100 series', function () {
            var chartObj;
            var elem;
            var svg;
            var targetElement;
            var loaded;
            var dataLabel;
            beforeAll(function () {
                elem = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal' },
                    series: [{
                            dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingColumn100',
                            name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
                        },
                        {
                            dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingColumn100',
                            name: 'ChartSeriesNameDiamond', fill: 'blue',
                        },
                    ], width: '800',
                    title: 'Chart TS Title', legendSettings: { visible: false }
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                elem.remove();
                chartObj.destroy();
            });
            it('Checking with fill', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_0');
                    expect(svg.getAttribute('fill') == 'rgba(135,206,235,1)').toBe(true);
                    svg = document.getElementById('container_Series_1_Point_0');
                    expect(svg.getAttribute('fill') == 'blue').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking with dynamic series changing y axis label format', function (done) {
                loaded = function (args) {
                    var series = args.chart.series[0];
                    expect(series.yAxis.isStack100 === false).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'Line';
                chartObj.series[1].type = 'Line';
                chartObj.refresh();
            });
            it('Checking Legend Shape ', function (done) {
                loaded = function (args) {
                    var legendElement = document.getElementById('container_chart_legend_shape_0');
                    var path = legendElement.getAttribute('d');
                    expect(path !== '').toBe(true);
                    expect(path !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'StackingColumn100';
                chartObj.series[1].type = 'StackingColumn100';
                chartObj.legendSettings.visible = true;
                chartObj.refresh();
            });
            it('Checking with point percentage value', function (done) {
                loaded = function (args) {
                    var point = chartObj.visibleSeries[0].points[0];
                    expect(point.percentage != null).toBe(true);
                    expect(point.percentage).toBe(48.95);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'StackingColumn100';
                chartObj.series[1].type = 'StackingColumn100';
                chartObj.legendSettings.visible = true;
                chartObj.refresh();
            });
            it('Checking with null Points', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_3');
                    expect(svg == null).toBe(true);
                    svg = document.getElementById('container_Series_1_Point_5');
                    expect(svg == null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = data;
                chartObj.series[1].dataSource = data2;
                chartObj.series[0].dataSource[3].y = null;
                chartObj.series[1].dataSource[5].y = null;
                chartObj.refresh();
            });
            it('Checking with negative Points', function (done) {
                loaded = function (args) {
                    var axisLabel = document.getElementById('container1_AxisLabel_6');
                    var series1 = args.chart.series[0];
                    var series2 = args.chart.series[1];
                    expect((series1.points[1].regions[0].y) + series1.points[0].regions[0].height > parseFloat(axisLabel.getAttribute('y'))).toBe(true);
                    expect((series2.points[4].regions[0].y) + series2.points[4].regions[0].height > parseFloat(axisLabel.getAttribute('y'))).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = data_spec_1.negativeDataPoint;
                chartObj.series[1].dataSource = data_spec_1.negativeDataPoint;
                chartObj.refresh();
            });
            it('Checking with different stackingGroup', function (done) {
                loaded = function (args) {
                    var series1 = args.chart.series[0];
                    var series2 = args.chart.series[1];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    expect(series1.points[1].regions[0].x < series2.points[1].regions[0].x).toBe(true);
                    expect(series1.points[1].regions[0].y + series1.points[1].regions[0].height === parseFloat(chartArea.getAttribute('y')));
                    expect(series2.points[1].regions[0].y + series2.points[1].regions[0].height === parseFloat(chartArea.getAttribute('y')));
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = data;
                chartObj.series[1].dataSource = data2;
                chartObj.series[0].dataSource[3].y = 70;
                chartObj.series[1].dataSource[5].y = 60;
                chartObj.series[0].stackingGroup = 'a';
                chartObj.series[1].stackingGroup = 'b';
                chartObj.refresh();
            });
            it('Checking with default DataLabel ', function (done) {
                loaded = function (args) {
                    dataLabel = document.getElementById('container_Series_0_Point_0_Text_0');
                    expect(dataLabel.textContent).toEqual('70');
                    dataLabel = document.getElementById('container_Series_1_Point_0_Text_0');
                    expect(dataLabel.textContent).toEqual('73');
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.series[0].marker.dataLabel.visible = true;
                chartObj.series[0].stackingGroup = '';
                chartObj.series[1].stackingGroup = '';
                chartObj.series[1].marker.dataLabel.visible = true;
                chartObj.refresh();
            });
            it('Checking with bar Seris', function (done) {
                loaded = function (args) {
                    var series2 = document.getElementById('containerSeriesGroup');
                    expect(series2 === null).toBe(true);
                    var series1 = args.chart.series[0];
                    expect(series1.rectCount == 1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].type = 'Bar';
                chartObj.refresh();
            });
            it('Checking with Column Series', function (done) {
                loaded = function (args) {
                    var series1 = args.chart.series[0];
                    expect(series1.rectCount === 2).toBe(true);
                    var series2 = args.chart.series[0];
                    expect(series1.rectCount === 2).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].type = 'Column';
                chartObj.refresh();
            });
            it('Checking with datetime axis', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('containerSeriesGroup0');
                    expect(svg !== null).toBe(true);
                    svg = document.getElementById('containerSeriesGroup1');
                    expect(svg !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'DateTime';
                chartObj.series[0].dataSource = dateTime;
                chartObj.series[1].dataSource = dateTime;
                chartObj.series[1].type = 'StackingColumn100';
                chartObj.refresh();
            });
            it('Checking with datetime axis and log axis', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('containerSeriesGroup0');
                    expect(svg !== null).toBe(true);
                    svg = document.getElementById('containerSeriesGroup1');
                    expect(svg !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryYAxis.valueType = 'Logarithmic';
                chartObj.refresh();
            });
            it('Checking with category axis and different series ', function (done) {
                loaded = function (args) {
                    var series1 = args.chart.series[0];
                    var series2 = args.chart.series[1];
                    expect(series1.rectCount === 1).toBe(true);
                    expect(series2.rectCount === 1).toBe(true);
                    expect(series1.stackedValues.endValues[0] === 100).toBe(true);
                    expect(series2.stackedValues.endValues[0] === 100).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.series[0].dataSource = data_spec_1.track3;
                chartObj.series[1].dataSource = data_spec_1.categoryData1;
                chartObj.primaryYAxis.valueType = 'Double';
                chartObj.refresh();
            });
            it('Checking with category axis OnTicks', function (done) {
                loaded = function (args) {
                    var point = document.getElementById('container_Series_0_Point_0');
                    expect(point != null).toBe(true);
                    var axisLabel = document.getElementById('container0_AxisLabel_0');
                    expect(axisLabel.textContent === 'Jan').toBe(true);
                    var axisStart = document.getElementById('containerAxisLine_0');
                    expect(parseInt(axisLabel.getAttribute('x')) < parseInt(axisStart.getAttribute('d').split(' ')[1])).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.primaryXAxis.labelPlacement = 'OnTicks';
                chartObj.refresh();
            });
            it('Checking with stackingColumn', function (done) {
                loaded = function (args) {
                    var series2 = document.getElementById('containerSeriesGroup');
                    expect(series2 === null).toBe(true);
                    var series1 = args.chart.series[0];
                    expect(series1.rectCount == 1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.series[0].dataSource = data;
                chartObj.series[1].dataSource = data2;
                chartObj.series[1].type = 'StackingColumn';
                chartObj.refresh();
            });
            it('checking with log axis for primary x axis', function (done) {
                loaded = function (args) {
                    var series1 = document.getElementById('containerSeriesGroup0');
                    expect(series1 !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Logarithmic';
                chartObj.refresh();
            });
            it('Checking with StackingArea', function (done) {
                loaded = function (args) {
                    var series2 = document.getElementById('containerSeriesGroup');
                    expect(series2 === null).toBe(true);
                    var series1 = args.chart.series[0];
                    expect(series1.rectCount == 1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].type = 'StackingArea';
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.refresh();
            });
            it('Checking with stackingbar100', function (done) {
                loaded = function (args) {
                    var series2 = document.getElementById('containerSeriesGroup');
                    expect(series2 === null).toBe(true);
                    var series1 = args.chart.series[0];
                    expect(series1.rectCount == 1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].type = 'StackingBar100';
                chartObj.refresh();
            });
            it('Checking with empty point', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('containerSeriesGroup0');
                    expect(svg.childElementCount === 8).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource[0].x = null;
                chartObj.series[0].dataSource[0].y = null;
                chartObj.refresh();
            });
            it('Checking with multiple series', function (done) {
                loaded = function (args) {
                    var series1 = args.chart.series[0];
                    expect(series1.rectCount === 1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource[0].x = 1000;
                chartObj.series[0].dataSource[0].y = 70;
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.series = [
                    {
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingColumn100',
                        name: 'ChartSeriesNameGold',
                    }, {
                        dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingColumn100',
                        name: 'ChartSeriesNameGold',
                    }, {
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingColumn100',
                        name: 'ChartSeriesNameGold',
                    }, {
                        dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingColumn100',
                        name: 'ChartSeriesNameGold',
                    }, {
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingColumn100',
                        name: 'ChartSeriesNameGold',
                    }
                ];
                chartObj.refresh();
            });
            it('Checking with multiple axes two row', function (done) {
                loaded = function (args) {
                    var axis = args.chart.horizontalAxes;
                    var series1 = axis[0].series;
                    var rectcount = series1[0].rectCount;
                    expect(rectcount === 1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.axes = [{
                        rowIndex: 1, name: 'yAxis'
                    }];
                chartObj.rows = [
                    { border: { width: 4, color: 'red' }, height: '300' },
                    { border: { width: 4, color: 'red' }, height: '300' }
                ];
                chartObj.series[0].yAxisName = 'yAxis';
                chartObj.series[1].yAxisName = 'yAxis';
                chartObj.refresh();
            });
            it('Checking with multiple axis two column', function (done) {
                loaded = function (args) {
                    var axis = args.chart.horizontalAxes;
                    var series1 = axis[0].series;
                    var rectcount = series1[0].rectCount;
                    expect(rectcount === 1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.axes = [{}];
                chartObj.rows = [{}];
                chartObj.axes = [{
                        columnIndex: 1, name: 'xAxis'
                    }];
                chartObj.columns = [
                    { border: { width: 4, color: 'red' }, width: '300' },
                    { border: { width: 4, color: 'red' }, width: '300' }
                ];
                chartObj.series[0].yAxisName = null;
                chartObj.series[1].yAxisName = null;
                chartObj.series[0].xAxisName = 'xAxis';
                chartObj.series[1].xAxisName = 'xAxis';
                chartObj.series[2].xAxisName = 'xAxis';
                chartObj.refresh();
            });
            it('Checking with multiple axis two row and two column', function (done) {
                loaded = function (args) {
                    var axis = args.chart.axes[0];
                    var series1 = axis.series;
                    var rectcount = series1[0].rectCount;
                    expect(series1.length === 2).toBe(true);
                    expect(rectcount === 1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.axes = [{
                        rowIndex: 1, name: 'yAxis'
                    }, {
                        columnIndex: 1, name: 'xAxis'
                    }];
                chartObj.rows = [{ border: { width: 4, color: 'red' }, height: '300' },
                    { border: { width: 4, color: 'red' }, height: '300' }];
                chartObj.series[2].xAxisName = null;
                chartObj.series[2].yAxisName = 'yAxis';
                chartObj.series[3].yAxisName = 'yAxis';
                chartObj.refresh();
            });
            it('Checking with multiple axes for each axis', function (done) {
                loaded = function (args) {
                    var axis = args.chart.horizontalAxes;
                    var series1 = axis[1].series;
                    var rectcount = series1[0].rectCount;
                    expect(rectcount === 1).toBe(true);
                    done();
                };
                chartObj.axes = [{
                        rowIndex: 0, columnIndex: 0, name: 'yAxis1', title: 'YAxis1',
                    },
                    {
                        rowIndex: 0, columnIndex: 0, name: 'yAxis2', title: 'YAxis2',
                    },
                    {
                        rowIndex: 0, columnIndex: 1, name: 'yAxis3', title: 'YAxis3',
                    },
                    {
                        rowIndex: 0, columnIndex: 1, name: 'yAxis4', title: 'YAxis4',
                    }];
                chartObj.series = [{
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingColumn100',
                        name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
                        xAxisName: 'yAxis1'
                    },
                    {
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingColumn100',
                        name: 'ChartSeriesNameGold1', fill: 'black',
                        xAxisName: 'yAxis1',
                    },
                    {
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingColumn100',
                        name: 'ChartSeriesNameGold2', fill: 'red',
                        xAxisName: 'yAxis1',
                    },
                    {
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingColumn100',
                        name: 'ChartSeriesNameGold3', fill: 'green',
                        xAxisName: 'yAxis1'
                    },
                    {
                        dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingColumn100',
                        name: 'ChartSeriesNameDiamond', fill: 'blue',
                        xAxisName: 'yAxis2'
                    },
                    {
                        dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingColumn100',
                        name: 'ChartSeriesNameDiamond', fill: 'rgba(135,206,235,1)',
                        xAxisName: 'yAxis2',
                    },
                    {
                        dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingColumn100',
                        name: 'ChartSeriesNameDiamond1', fill: 'yellow',
                        xAxisName: 'yAxis2'
                    },
                    {
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingColumn100',
                        name: 'ChartSeriesNameSilver', fill: 'blue',
                        xAxisName: 'yAxis3'
                    },
                    {
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingColumn100',
                        name: 'ChartSeriesNameSilver1', fill: 'black',
                        xAxisName: 'yAxis3',
                    },
                    {
                        dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false },
                        type: 'StackingColumn100',
                        name: 'ChartSeriesNameRuby', fill: 'red',
                        xAxisName: 'yAxis4'
                    }];
                chartObj.rows = [{}];
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking with stackingGroup and multiple axes', function (done) {
                loaded = function (args) {
                    var axis = args.chart.horizontalAxes;
                    var series1 = axis[1].series;
                    var rectcount = series1[0].rectCount;
                    expect(rectcount === 2).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].stackingGroup = 'a';
                chartObj.series[1].stackingGroup = 'a';
                chartObj.refresh();
            });
        });
        describe('Chart StackingBar100 Series', function () {
            var chartObj;
            var elem;
            var svg;
            var targetElement;
            var loaded;
            var dataLabel;
            beforeAll(function () {
                elem = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal' },
                    series: [{
                            dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar100',
                            name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
                        },
                        {
                            dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar100',
                            name: 'ChartSeriesNameDiamond', fill: 'blue',
                        },
                    ], width: '800',
                    title: 'Chart TS Title', legendSettings: { visible: false }
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                elem.remove();
                chartObj.destroy();
            });
            it('Checking with fill', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_0');
                    expect(svg.getAttribute('fill') == 'rgba(135,206,235,1)').toBe(true);
                    svg = document.getElementById('container_Series_1_Point_0');
                    expect(svg.getAttribute('fill') == 'blue').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking Legend Shape ', function (done) {
                loaded = function (args) {
                    var legendElement = document.getElementById('container_chart_legend_shape_0');
                    var path = legendElement.getAttribute('d');
                    expect(path !== '').toBe(true);
                    expect(path !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.legendSettings.visible = true;
                chartObj.refresh();
            });
            it('Checking with null Points', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_3');
                    expect(svg == null).toBe(true);
                    svg = document.getElementById('container_Series_1_Point_5');
                    expect(svg == null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = data;
                chartObj.series[1].dataSource = data2;
                chartObj.series[0].dataSource[3].y = null;
                chartObj.series[1].dataSource[5].y = null;
                chartObj.refresh();
            });
            it('Checking with negative Points', function (done) {
                loaded = function (args) {
                    var axisLabel = document.getElementById('container1_AxisLabel_6');
                    var series1 = args.chart.series[0];
                    var series2 = args.chart.series[1];
                    expect((series1.points[1].regions[0].y) < parseFloat(axisLabel.getAttribute('x'))).toBe(true);
                    expect((series2.points[4].regions[0].y) < parseFloat(axisLabel.getAttribute('x'))).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = data_spec_1.negativeDataPoint;
                chartObj.series[1].dataSource = data_spec_1.negativeDataPoint;
                chartObj.refresh();
            });
            it('Checking with different stackingGroup', function (done) {
                loaded = function (args) {
                    var series1 = args.chart.series[0];
                    var series2 = args.chart.series[1];
                    expect(series1.rectCount === 2).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = data;
                chartObj.series[1].dataSource = data2;
                chartObj.series[0].dataSource[3].y = 70;
                chartObj.series[1].dataSource[5].y = 60;
                chartObj.series[0].stackingGroup = 'a';
                chartObj.series[1].stackingGroup = 'b';
                chartObj.refresh();
            });
            it('Checking with default DataLabel ', function (done) {
                loaded = function (args) {
                    dataLabel = document.getElementById('container_Series_0_Point_0_Text_0');
                    expect(dataLabel.textContent === '70').toBe(true);
                    dataLabel = document.getElementById('container_Series_1_Point_0_Text_0');
                    expect(dataLabel.textContent === '73').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.series[0].marker.dataLabel.visible = true;
                chartObj.series[0].stackingGroup = '';
                chartObj.series[1].stackingGroup = '';
                chartObj.series[1].marker.dataLabel.visible = true;
                chartObj.refresh();
            });
            it('Checking with bar Seris', function (done) {
                loaded = function (args) {
                    var series2 = document.getElementById('containerSeriesGroup');
                    expect(series2 === null).toBe(true);
                    var series1 = args.chart.series[0];
                    expect(series1.rectCount == 2).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].type = 'Bar';
                chartObj.refresh();
            });
            it('Checking with datetime axis', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('containerSeriesGroup0');
                    expect(svg !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'DateTime';
                chartObj.series[0].dataSource = dateTime;
                chartObj.series[1].dataSource = dateTime;
                chartObj.series[1].type = 'StackingBar100';
                chartObj.refresh();
            });
            it('Checking with datetime axis and log axis', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('containerSeriesGroup0');
                    expect(svg !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryYAxis.valueType = 'Logarithmic';
                chartObj.refresh();
            });
            it('Checking with category axis and different series ', function (done) {
                loaded = function (args) {
                    var series1 = args.chart.series[0];
                    var series2 = args.chart.series[1];
                    expect(series1.rectCount === 1).toBe(true);
                    expect(series2.rectCount === 1).toBe(true);
                    expect(series1.stackedValues.endValues[0] === 100).toBe(true);
                    expect(series2.stackedValues.endValues[0] === 100).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.series[0].dataSource = data_spec_1.track3;
                chartObj.series[1].dataSource = data_spec_1.categoryData1;
                chartObj.primaryYAxis.valueType = 'Double';
                chartObj.refresh();
            });
            it('Checking with category axis OnTicks', function (done) {
                loaded = function (args) {
                    var point = document.getElementById('container_Series_0_Point_0');
                    expect(point != null).toBe(true);
                    var axisLabel = document.getElementById('container0_AxisLabel_0');
                    expect(axisLabel.textContent === 'Jan').toBe(true);
                    var axisStart = document.getElementById('containerAxisLine_0');
                    expect(parseInt(axisLabel.getAttribute('x')) < parseInt(axisStart.getAttribute('d').split(' ')[1])).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.primaryXAxis.labelPlacement = 'OnTicks';
                chartObj.refresh();
            });
            it('Checking with stackingbar', function (done) {
                loaded = function (args) {
                    var series2 = document.getElementById('containerSeriesGroup');
                    expect(series2 === null).toBe(true);
                    var series1 = args.chart.series[0];
                    expect(series1.rectCount == 1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.series[0].dataSource = data;
                chartObj.series[1].dataSource = data2;
                chartObj.series[1].type = 'StackingBar';
                chartObj.refresh();
            });
            it('checking with log axis for primary x axis', function (done) {
                loaded = function (args) {
                    var series1 = document.getElementById('containerSeriesGroup0');
                    expect(series1 !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Logarithmic';
                chartObj.refresh();
            });
            it('Checking with empty point', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('containerSeriesGroup0');
                    expect(svg.childElementCount === 8).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource[0].x = null;
                chartObj.series[0].dataSource[0].y = null;
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.refresh();
            });
            it('Checking with multiple series', function (done) {
                loaded = function (args) {
                    var series1 = args.chart.series[0];
                    expect(series1.rectCount === 1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource[0].x = 1000;
                chartObj.series[0].dataSource[0].y = 70;
                chartObj.series = [
                    {
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar100',
                        name: 'ChartSeriesNameGold',
                    }, {
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar100',
                        name: 'ChartSeriesNameGold',
                    }, {
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar100',
                        name: 'ChartSeriesNameGold',
                    }, {
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar100',
                        name: 'ChartSeriesNameGold',
                    }, {
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar100',
                        name: 'ChartSeriesNameGold',
                    }
                ];
                chartObj.refresh();
            });
            it('Checking with multiple axes two row', function (done) {
                loaded = function (args) {
                    var axis = args.chart.horizontalAxes;
                    var series1 = axis[0].series;
                    var rectcount = series1[0].rectCount;
                    expect(rectcount === 1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.axes = [{
                        rowIndex: 1, name: 'yAxis'
                    }];
                chartObj.rows = [
                    { border: { width: 4, color: 'red' }, height: '300' },
                    { border: { width: 4, color: 'red' }, height: '300' }
                ];
                chartObj.series[0].xAxisName = 'yAxis';
                chartObj.series[1].xAxisName = 'yAxis';
                chartObj.refresh();
            });
            it('Checking with multiple axis two column', function (done) {
                loaded = function (args) {
                    var axis = args.chart.horizontalAxes;
                    var series1 = axis[0].series;
                    var rectcount = series1[0].rectCount;
                    expect(rectcount === 1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.axes = [{}];
                chartObj.rows = [{}];
                chartObj.axes = [{
                        columnIndex: 1, name: 'xAxis'
                    }];
                chartObj.columns = [
                    { border: { width: 4, color: 'red' }, width: '300' },
                    { border: { width: 4, color: 'red' }, width: '300' }
                ];
                chartObj.series[0].xAxisName = null;
                chartObj.series[1].xAxisName = null;
                chartObj.series[0].yAxisName = 'xAxis';
                chartObj.series[1].yAxisName = 'xAxis';
                chartObj.refresh();
            });
            it('Checking with multiple axis two row and two column', function (done) {
                loaded = function (args) {
                    var axis = args.chart.axes[1];
                    var series1 = axis.series;
                    var rectcount = series1[0].rectCount;
                    expect(rectcount === 1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.axes = [{
                        rowIndex: 1, name: 'yAxis'
                    }, {
                        columnIndex: 1, name: 'xAxis'
                    }];
                chartObj.series[2].xAxisName = 'yAxis';
                chartObj.series[3].xAxisName = 'yAxis';
                chartObj.rows = [{ border: { width: 4, color: 'red' }, height: '200' },
                    { border: { width: 4, color: 'red' }, height: '300' }];
                chartObj.refresh();
            });
            it('Checking with multiple axes for each axis', function (done) {
                loaded = function (args) {
                    var axis = args.chart.horizontalAxes;
                    var series1 = axis[1].series;
                    var rectcount = series1[0].rectCount;
                    expect(rectcount === 1).toBe(true);
                    done();
                };
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.axes = [{
                        rowIndex: 0, columnIndex: 0, name: 'yAxis1', title: 'YAxis1',
                    },
                    {
                        rowIndex: 0, columnIndex: 0, name: 'yAxis2', title: 'YAxis2',
                    },
                    {
                        rowIndex: 0, columnIndex: 1, name: 'xAxis3', title: 'YAxis3',
                    },
                    {
                        rowIndex: 0, columnIndex: 1, name: 'xAxis4', title: 'YAxis4',
                    }];
                chartObj.series = [{
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar100',
                        name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
                        xAxisName: 'yAxis1'
                    },
                    {
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar100',
                        name: 'ChartSeriesNameGold1', fill: 'black',
                        xAxisName: 'yAxis1'
                    },
                    {
                        dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar100',
                        name: 'ChartSeriesNameDiamond', fill: 'blue',
                        xAxisName: 'yAxis2'
                    },
                    {
                        dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar100',
                        name: 'ChartSeriesNameDiamond', fill: 'rgba(135,206,235,1)',
                        xAxisName: 'yAxis2'
                    },
                    {
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar100',
                        name: 'ChartSeriesNameSilver', fill: 'blue',
                        yAxisName: 'xAxis3'
                    },
                    {
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingBar100',
                        name: 'ChartSeriesNameSilver1', fill: 'black',
                        yAxisName: 'xAxis3'
                    },
                    {
                        dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false },
                        type: 'StackingBar100',
                        name: 'ChartSeriesNameRuby', fill: 'red',
                        yAxisName: 'xAxis4'
                    }];
                chartObj.rows = [{}];
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking with stackingGroup and multiple axes', function (done) {
                loaded = function (args) {
                    var axis = args.chart.axes[0];
                    var series1 = axis.series;
                    var rectcount = series1[0].rectCount;
                    expect(rectcount === 2).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].stackingGroup = 'a';
                chartObj.series[1].stackingGroup = 'a';
                chartObj.refresh();
            });
        });
        describe('Chart StackingArea100 series', function () {
            var chartObj;
            var elem;
            var svg;
            var targetElement;
            var loaded;
            var dataLabel;
            beforeAll(function () {
                elem = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'None' },
                    series: [{
                            dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingArea100',
                            name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
                        },
                        {
                            dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingArea100',
                            name: 'ChartSeriesNameDiamond', fill: 'blue',
                        },
                    ], width: '800',
                    title: 'Chart TS Title', legendSettings: { visible: false }
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                elem.remove();
                chartObj.destroy();
            });
            it('Checking with fill', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0');
                    expect(svg.getAttribute('fill') == 'rgba(135,206,235,1)').toBe(true);
                    svg = document.getElementById('container_Series_1');
                    expect(svg.getAttribute('fill') == 'blue').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking Legend Shape ', function (done) {
                loaded = function (args) {
                    var legendElement = document.getElementById('container_chart_legend_shape_0');
                    var path = legendElement.getAttribute('d');
                    expect(path !== '').toBe(true);
                    expect(path !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.legendSettings.visible = true;
                chartObj.refresh();
            });
            it('Checking stacking end values for last series', function (done) {
                loaded = function (args) {
                    var series2 = args.chart.series[1];
                    expect(Math.round(series2.stackedValues.endValues[0]) === 100).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('checking with log axis for primary x axis', function (done) {
                loaded = function (args) {
                    var series1 = document.getElementById('containerSeriesGroup0');
                    expect(series1 !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Logarithmic';
                chartObj.refresh();
            });
            it('checking with stackingarea series', function (done) {
                loaded = function (args) {
                    var series2 = args.chart.series[1];
                    expect(Math.round(series2.stackedValues.endValues[0]) === 100).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].type = 'StackingArea';
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.refresh();
            });
            it('checking with stackingcolumn series', function (done) {
                loaded = function (args) {
                    var series1 = args.chart.series[1];
                    expect(Math.round(series1.stackedValues.endValues[0]) === 100).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].type = 'StackingColumn';
                chartObj.refresh();
            });
            it('Checking with multiple series', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('containerSeriesGroup0');
                    expect(svg !== null).toBe(true);
                    var series = args.chart.series[4];
                    expect(series.stackedValues.endValues[0] === 100).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series = [{
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Line',
                        name: 'ChartSeriesNameGold'
                    }, {
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingArea100',
                        name: 'ChartSeriesNameGold'
                    }, {
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingArea100',
                        name: 'ChartSeriesNameGold'
                    }, {
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingArea100',
                        name: 'ChartSeriesNameGold'
                    }, {
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingArea100',
                        name: 'ChartSeriesNameGold'
                    }];
                chartObj.refresh();
            });
            it('Checking with multiple axes two row', function (done) {
                loaded = function (args) {
                    var axis = args.chart.axes[0];
                    expect(axis.series.length === 2).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.axes = [{
                        rowIndex: 1, name: 'yAxis'
                    }];
                chartObj.rows = [
                    { border: { width: 4, color: 'red' }, height: '200' },
                    { border: { width: 4, color: 'red' }, height: '300' }
                ];
                chartObj.series[0].yAxisName = 'yAxis';
                chartObj.series[1].yAxisName = 'yAxis';
                chartObj.series[0].type = 'StackingArea100';
                chartObj.refresh();
            });
            it('Checking with multiple axis two column', function (done) {
                loaded = function (args) {
                    var axis = args.chart.axes[0];
                    var series1 = axis.series;
                    expect(series1.length === 3).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.axes = [{}];
                chartObj.rows = [{}];
                chartObj.axes = [{
                        columnIndex: 1, name: 'xAxis'
                    }];
                chartObj.columns = [
                    { border: { width: 4, color: 'red' }, width: '300' },
                    { border: { width: 4, color: 'red' }, width: '300' }
                ];
                chartObj.series[0].yAxisName = null;
                chartObj.series[1].yAxisName = null;
                chartObj.series[0].xAxisName = 'xAxis';
                chartObj.series[1].xAxisName = 'xAxis';
                chartObj.series[2].xAxisName = 'xAxis';
                chartObj.refresh();
            });
            it('Checking with multiple axis two row and two column', function (done) {
                loaded = function (args) {
                    var axis = args.chart.axes[0];
                    var series1 = axis.series;
                    expect(series1.length === 2).toBe(true);
                    axis = args.chart.axes[1];
                    series1 = axis.series;
                    expect(series1.length === 2).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.axes = [{
                        rowIndex: 1, name: 'yAxis'
                    }, {
                        columnIndex: 1, name: 'xAxis'
                    }];
                chartObj.rows = [{ border: { width: 4, color: 'red' }, height: '300' },
                    { border: { width: 4, color: 'red' }, height: '300' }];
                chartObj.series[2].xAxisName = null;
                chartObj.series[2].yAxisName = 'yAxis';
                chartObj.series[3].yAxisName = 'yAxis';
                chartObj.refresh();
            });
        });
        describe('chart stacking percent series with user interaction', function () {
            var chartObj;
            var elem;
            var svg;
            var trigger = new events_spec_1.MouseEvents();
            var targetElement;
            var loaded;
            var dataLabel;
            beforeAll(function () {
                elem = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'None' },
                    series: [{
                            dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingColumn100',
                            name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
                        },
                        {
                            dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingColumn100',
                            name: 'ChartSeriesNameDiamond', fill: 'blue',
                        },
                    ], width: '800',
                    title: 'Chart TS Title', legendSettings: { visible: false }
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                elem.remove();
                chartObj.destroy();
            });
            it('checking with Tooltip for stackingcolumn100 series', function (done) {
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_2');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = series.points[2].regions[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    var x = series.points[2].regions[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.tooltip.enable = true;
                chartObj.refresh();
            });
            it('checking with Tooltip for stackingbar100 series', function (done) {
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_2');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = series.points[2].regions[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    var x = series.points[2].regions[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'StackingBar100';
                chartObj.series[1].type = 'StackingBar100';
                chartObj.refresh();
            });
            it('checking with Tooltip for stackingarea100 series', function (done) {
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_2_Symbol');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = series.points[2].regions[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    var x = series.points[2].regions[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'StackingArea100';
                chartObj.series[1].type = 'StackingArea100';
                chartObj.series[0].marker.visible = true;
                chartObj.series[1].marker.visible = true;
                chartObj.refresh();
            });
            it('checking with Tooltip for stackingarea series', function (done) {
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_2_Symbol');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = series.points[2].regions[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    var x = series.points[2].regions[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'StackingArea';
                chartObj.series[1].type = 'StackingArea';
                chartObj.refresh();
            });
            it('checking with Tooltip for Srea series', function (done) {
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_2_Symbol');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = series.points[2].regions[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    var x = series.points[2].regions[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'Area';
                chartObj.series[1].type = 'Area';
                chartObj.refresh();
            });
            it('Checking with track ball for stackingbar100 series', function (done) {
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_6');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = series.points[6].regions[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    var x = series.points[6].regions[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip_group');
                    expect(tooltip.childElementCount).toEqual(5);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'StackingBar100';
                chartObj.series[1].type = 'StackingBar100';
                chartObj.tooltip.shared = true;
                chartObj.refresh();
            });
            it('Checking with track ball for stackingcolumn100 series', function (done) {
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_6');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = series.points[6].regions[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    var x = series.points[6].regions[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip_group');
                    expect(tooltip.childElementCount).toEqual(5);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'StackingColumn100';
                chartObj.series[1].type = 'StackingColumn100';
                chartObj.refresh();
            });
            it('Default Crosshair for stackingcolumn100', function (done) {
                loaded = function (args) {
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = parseFloat(chartArea.getAttribute('y')) + parseFloat(chartArea.getAttribute('height')) / 2 + elem.offsetTop;
                    var x = parseFloat(chartArea.getAttribute('x')) + parseFloat(chartArea.getAttribute('width')) / 2 + elem.offsetLeft;
                    trigger.mousemovetEvent(chartArea, Math.ceil(x), Math.ceil(y));
                    var crosshair = document.getElementById('container_svg').lastChild;
                    var element1;
                    expect(crosshair.childNodes.length == 3).toBe(true);
                    element1 = crosshair.childNodes[0];
                    expect(element1.getAttribute('d').indexOf(chartArea.getAttribute('x')) > 0).toBe(true);
                    element1 = crosshair.childNodes[1];
                    expect(element1.getAttribute('d').indexOf(chartArea.getAttribute('y')) > 0).toBe(true);
                    expect(crosshair.childNodes[2].childNodes.length == 4).toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[0];
                    expect(element1.getAttribute('d') !== '').toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[2];
                    expect(element1.getAttribute('d') !== '').toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[1];
                    expect(element1.textContent == '4502.776' || element1.textContent == '4502.791').toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[3];
                    expect(element1.textContent == '49.964' || element1.textContent == '49.818').toBe(true);
                    chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(chartArea.getAttribute('y')) + elem.offsetTop + 1;
                    x = parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft + 1;
                    trigger.mousemovetEvent(chartArea, Math.ceil(x), Math.ceil(y));
                    crosshair = document.getElementById('container_svg').lastChild;
                    expect(crosshair.childNodes.length == 3).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.legendSettings.visible = false;
                chartObj.tooltip.enable = false;
                chartObj.crosshair.enable = true;
                chartObj.primaryXAxis.crosshairTooltip.enable = true;
                chartObj.primaryYAxis.crosshairTooltip.enable = true;
                chartObj.refresh();
            });
            it('Default Crosshair for stackingbar100', function (done) {
                loaded = function (args) {
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = parseFloat(chartArea.getAttribute('y')) + parseFloat(chartArea.getAttribute('height')) / 2 + elem.offsetTop;
                    var x = parseFloat(chartArea.getAttribute('x')) + parseFloat(chartArea.getAttribute('width')) / 2 + elem.offsetLeft;
                    trigger.mousemovetEvent(chartArea, Math.ceil(x), Math.ceil(y));
                    var crosshair = document.getElementById('container_svg').lastChild;
                    var element1;
                    expect(crosshair.childNodes.length == 3).toBe(true);
                    element1 = crosshair.childNodes[0];
                    expect(element1.getAttribute('d').indexOf(chartArea.getAttribute('x')) > 0).toBe(true);
                    element1 = crosshair.childNodes[1];
                    expect(element1.getAttribute('d').indexOf(chartArea.getAttribute('y')) > 0).toBe(true);
                    expect(crosshair.childNodes[2].childNodes.length == 4).toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[0];
                    expect(element1.getAttribute('d') !== '').toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[2];
                    expect(element1.getAttribute('d') !== '').toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[1];
                    expect(element1.textContent == '4497.153' || element1.textContent == '4485.476').toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[3];
                    expect(element1.textContent == '50.035' || element1.textContent == '50.104').toBe(true);
                    chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(chartArea.getAttribute('y')) + elem.offsetTop + 1;
                    x = parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft + 1;
                    trigger.mousemovetEvent(chartArea, Math.ceil(x), Math.ceil(y));
                    crosshair = document.getElementById('container_svg').lastChild;
                    expect(crosshair.childNodes.length == 3).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'StackingBar100';
                chartObj.series[1].type = 'StackingBar100';
                chartObj.refresh();
            });
            it('Default Crosshair for stackingarea100', function (done) {
                loaded = function (args) {
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = parseFloat(chartArea.getAttribute('y')) + parseFloat(chartArea.getAttribute('height')) / 2 + elem.offsetTop;
                    var x = parseFloat(chartArea.getAttribute('x')) + parseFloat(chartArea.getAttribute('width')) / 2 + elem.offsetLeft;
                    trigger.mousemovetEvent(chartArea, Math.ceil(x), Math.ceil(y));
                    var crosshair = document.getElementById('container_svg').lastChild;
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
                    expect(element1.textContent == '4502.429' || element1.textContent == '4502.442').toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[3];
                    expect(element1.textContent == '49.964' || element1.textContent == '49.818').toBe(true);
                    chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(chartArea.getAttribute('y')) + elem.offsetTop + 1;
                    x = parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft + 1;
                    trigger.mousemovetEvent(chartArea, Math.ceil(x), Math.ceil(y));
                    crosshair = document.getElementById('container_svg').lastChild;
                    expect(crosshair.childNodes.length == 3).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'StackingArea100';
                chartObj.series[1].type = 'StackingArea100';
                chartObj.refresh();
            });
            it('Single point selection for stackingcolumn100 series', function (done) {
                loaded = function () {
                    var element = document.getElementById('container_Series_0_Point_4');
                    trigger.clickEvent(element);
                    var selected = document.getElementsByClassName('container_ej2_chart_selection_series_0');
                    expect(element).toBe(selected[0]);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'StackingColumn100';
                chartObj.series[1].type = 'StackingColumn100';
                chartObj.selectionMode = 'Point';
                chartObj.isMultiSelect = false;
                chartObj.refresh();
            });
            it('Single point selection for stackingbar100 series', function (done) {
                loaded = function () {
                    var element = document.getElementById('container_Series_0_Point_0');
                    trigger.clickEvent(element);
                    var selected = document.getElementsByClassName('container_ej2_chart_selection_series_0');
                    expect(element).toBe(selected[0]);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'StackingBar100';
                chartObj.series[1].type = 'StackingBar100';
                chartObj.refresh();
            });
            it('Single point multi selection for stackingbar100 series', function (done) {
                loaded = function () {
                    var element = document.getElementById('container_Series_0_Point_4');
                    trigger.clickEvent(element);
                    var selected = document.getElementsByClassName('container_ej2_chart_selection_series_0');
                    expect(element).toBe(selected[0]);
                    done();
                };
                chartObj.selectionMode = 'Point';
                chartObj.isMultiSelect = true;
                chartObj.loaded = loaded;
                chartObj.selectionModule.selectedDataIndexes = [];
                chartObj.refresh();
            });
            it('Single point multi selection for stackingcolumn100 series', function (done) {
                loaded = function () {
                    var element = document.getElementById('container_Series_0_Point_4');
                    trigger.clickEvent(element);
                    var selected = document.getElementsByClassName('container_ej2_chart_selection_series_0');
                    expect(element).toBe(selected[0]);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'StackingColumn100';
                chartObj.series[1].type = 'StackingColumn100';
                chartObj.selectionModule.selectedDataIndexes = [];
                chartObj.refresh();
            });
            it('series selection for stackingcolumn100 series', function (done) {
                loaded = function () {
                    var element = document.getElementById('container_Series_0_Point_4');
                    var series = document.getElementById('containerSeriesGroup0');
                    trigger.clickEvent(element);
                    var selected = document.getElementsByClassName('container_ej2_chart_selection_series_0');
                    expect(series).toBe(selected[0]);
                    done();
                };
                chartObj.selectionMode = 'Series';
                chartObj.isMultiSelect = false;
                chartObj.loaded = loaded;
                chartObj.selectionModule.selectedDataIndexes = [];
                chartObj.refresh();
            });
            it('series selection for stackingbar100 series', function (done) {
                loaded = function () {
                    var element = document.getElementById('container_Series_0_Point_4');
                    var series = document.getElementById('containerSeriesGroup0');
                    trigger.clickEvent(element);
                    var selected = document.getElementsByClassName('container_ej2_chart_selection_series_0');
                    expect(series).toBe(selected[0]);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'StackingBar100';
                chartObj.series[1].type = 'StackingBar100';
                chartObj.selectionModule.selectedDataIndexes = [];
                chartObj.refresh();
            });
            it('series selection for stackingarea100 series', function (done) {
                loaded = function () {
                    var element = document.getElementById('container_Series_0');
                    var series = document.getElementById('containerSeriesGroup0');
                    trigger.clickEvent(element);
                    var selected = document.getElementsByClassName('container_ej2_chart_selection_series_0');
                    expect(series).toBe(selected[0]);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'StackingArea100';
                chartObj.series[1].type = 'StackingArea100';
                chartObj.selectionModule.selectedDataIndexes = [];
                chartObj.refresh();
            });
            it('Cluster selection for stackingarea100 series', function (done) {
                loaded = function () {
                    var element = document.getElementById('container_Series_0_Point_4_Symbol');
                    var element1 = document.getElementById('container_Series_1_Point_4_Symbol');
                    trigger.clickEvent(element);
                    var selected = document.getElementsByClassName('container_ej2_chart_selection_series_0');
                    expect(element).toBe(selected[0]);
                    var selected1 = document.getElementsByClassName('container_ej2_chart_selection_series_1');
                    expect(element1).toBe(selected1[0]);
                    done();
                };
                chartObj.selectionMode = 'Cluster';
                chartObj.isMultiSelect = true;
                chartObj.loaded = loaded;
                chartObj.selectionModule.selectedDataIndexes = [];
                chartObj.refresh();
            });
            it('Drag selection for stackingbar100 series', function (done) {
                loaded = function () {
                    trigger.draganddropEvent(elem, 100, 100, 500, 300);
                    var selection = 'container_ej2_chart_selection_series_0';
                    svg = document.getElementById('container_Series_0_Point_0');
                    expect(svg.getAttribute('class') === selection).toBe(true);
                    svg = document.getElementById('container_Series_0_Point_1');
                    expect(svg.getAttribute('class') === selection).toBe(true);
                    svg = document.getElementById('container_Series_0_Point_2');
                    expect(svg.getAttribute('class') === selection).toBe(true);
                    svg = document.getElementById('container_Series_0_Point_4');
                    expect(svg.getAttribute('class') === selection).toBe(true);
                    svg = document.getElementById('container_Series_0_Point_5');
                    expect(svg.getAttribute('class') === selection).toBe(true);
                    svg = document.getElementById('container_Series_0_Point_6');
                    expect(svg.getAttribute('class') === selection).toBe(true);
                    done();
                };
                chartObj.selectionMode = 'DragX';
                chartObj.isMultiSelect = true;
                chartObj.series[0].type = 'StackingBar100';
                chartObj.series[1].type = 'StackingBar100';
                chartObj.loaded = loaded;
                chartObj.selectionModule.selectedDataIndexes = [];
                chartObj.refresh();
            });
            it('Checking default selection zooming', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(elem, 200, 200, 350, 350);
                    var resetElement = document.getElementById('container_Zooming_Reset');
                    expect(resetElement != null).toBe(true);
                    trigger.mousedownEvent(resetElement, 0, 0, 5, 5);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'StackingArea100';
                chartObj.series[1].type = 'StackingArea100';
                chartObj.zoomSettings.enableDeferredZooming = true;
                chartObj.zoomSettings.enableSelectionZooming = true;
                chartObj.selectionModule.selectedDataIndexes = [];
                chartObj.refresh();
            });
            it('mouseWheel zooming - checking tool elements', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(elem, 100, 100, 400, 400);
                    var resetElement = document.getElementById('container_Zooming_Reset');
                    expect(resetElement != null).toBe(true);
                    targetElement = document.getElementById('container_Zooming_KitCollection');
                    expect(targetElement.childNodes.length == 8).toBe(true);
                    trigger.mousedownEvent(resetElement, 0, 0, 5, 5);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.zoomSettings.enableMouseWheelZooming = true;
                chartObj.refresh();
            });
        });
        describe('stacking100 Series Inversed axis', function () {
            var chart;
            var loaded;
            var element;
            var dataLabelY;
            var pointY;
            var dataLabelX;
            var pointX;
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
                            type: 'StackingColumn100', fill: 'rgba(135,206,235,1)',
                            marker: { visible: false, dataLabel: { visible: true, fill: 'violet' } }
                        },
                        {
                            animation: { enable: false },
                            name: 'ChartSeriesNameGold', dataSource: [{ x: 1000, y: 70 }, { x: 2000, y: 40 },
                                { x: 3000, y: 90 }, { x: 4000, y: 50 },
                                { x: 5000, y: 50 }, { x: 6000, y: 60 },
                                { x: 7000, y: -40 }, { x: 8000, y: -70 }], xName: 'x', yName: 'y',
                            type: 'StackingColumn100',
                            marker: { visible: false, dataLabel: { visible: true, fill: 'violet' } }
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
            it(' StackingColum100 With Label position Auto', function (done) {
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
                chart.series[0].marker.dataLabel.position = 'Auto';
                chart.refresh();
            });
            it('StackingColum100 With Label position Outer', function (done) {
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
                chart.series[0].marker.dataLabel.position = 'Outer';
                chart.series[1].marker.dataLabel.position = 'Outer';
                chart.refresh();
            });
            it('StackingColum100  With Label position Top', function (done) {
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
                chart.series[1].marker.dataLabel.position = 'Top';
                chart.refresh();
            });
            it('StackingColum100 With Label position Bottom', function (done) {
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
                chart.series[1].marker.dataLabel.position = 'Bottom';
                chart.refresh();
            });
            it('StackingColum100 With Label position Middle', function (done) {
                loaded = function (args) {
                    var labelY = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('y');
                    var labelHeight = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('height');
                    var point = chart.series[0].points[1];
                    expect(labelY + labelHeight / 2).toEqual(point.regions[0].y + point.regions[0].height / 2);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].marker.dataLabel.position = 'Middle';
                chart.series[1].marker.dataLabel.position = 'Middle';
                chart.refresh();
            });
            it('StackinBar100 With Label position Auto', function (done) {
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
                chart.series[1].marker.dataLabel.position = 'Auto';
                chart.series[0].type = 'StackingBar100';
                chart.series[1].type = 'StackingBar100';
                chart.refresh();
            });
            it('StackinBar100 With Label position Outer', function (done) {
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
                chart.series[0].marker.dataLabel.position = 'Outer';
                chart.series[1].marker.dataLabel.position = 'Outer';
                chart.refresh();
            });
            it('StackinBar100 With Label position Top', function (done) {
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
                chart.series[1].marker.dataLabel.position = 'Top';
                chart.refresh();
            });
            it('StackinBar100 With Label position Bottom', function (done) {
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
                chart.series[1].marker.dataLabel.position = 'Bottom';
                chart.refresh();
            });
            it('StackinBar100 With Label position Middle', function (done) {
                loaded = function (args) {
                    var labelX = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('x');
                    var labelHeight = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('width');
                    var point = chart.series[0].points[1];
                    expect(labelX + labelHeight / 2).toEqual(point.regions[0].x + point.regions[0].width / 2);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].marker.dataLabel.position = 'Middle';
                chart.series[1].marker.dataLabel.position = 'Middle';
                chart.refresh();
            });
            it(' StackingArea100 With Label position Auto', function (done) {
                loaded = function (args) {
                    dataLabelY = +document.getElementById('container_Series_0_Point_2_TextShape_0').getAttribute('y');
                    pointY = chart.series[0].points[2].symbolLocations[0].y;
                    expect(dataLabelY < pointY).toBe(true);
                    dataLabelY = +document.getElementById('container_Series_1_Point_2_TextShape_0').getAttribute('y');
                    pointY = chart.series[0].points[2].symbolLocations[0].y;
                    expect(dataLabelY > pointY).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].type = 'StackingArea100';
                chart.series[0].dataSource = data_spec_1.seriesData1;
                chart.series[1].type = 'StackingArea100';
                chart.series[1].dataSource = data_spec_1.seriesData1;
                chart.series[0].marker.dataLabel.position = 'Auto';
                chart.series[1].marker.dataLabel.position = 'Auto';
                chart.refresh();
            });
            it('StackingArea100 With Label position Top', function (done) {
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
                chart.series[0].marker.dataLabel.position = 'Top';
                chart.series[1].marker.dataLabel.position = 'Top';
                chart.refresh();
            });
            it('StackingArea100 With Label position Bottom', function (done) {
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
                chart.series[0].marker.dataLabel.position = 'Bottom';
                chart.series[1].marker.dataLabel.position = 'Bottom';
                chart.refresh();
            });
            it('StackingArea100 With Label position Middle', function (done) {
                loaded = function (args) {
                    var labelY = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('y');
                    var labelHeight = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('height');
                    var point = chart.series[0].points[1];
                    expect(labelY + labelHeight / 2).toEqual(point.regions[0].y + point.regions[0].height / 2);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].marker.dataLabel.position = 'Middle';
                chart.series[1].marker.dataLabel.position = 'Middle';
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
