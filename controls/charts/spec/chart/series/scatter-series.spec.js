define(["require", "exports", "@syncfusion/ej2-base", "../../../src/chart/chart", "../../../src/chart/series/scatter-series", "../../../src/chart/series/column-series", "../../../src/chart/series/area-series", "../../../src/chart/series/polar-series", "../../../src/chart/series/line-series", "../../../src/chart/axis/date-time-axis", "../../../src/chart/axis/category-axis", "../../../src/chart/user-interaction/tooltip", "../../../src/chart/series/data-label", "../../../src/chart/user-interaction/data-editing", "../base/events.spec", "../base/data.spec", "../../common.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, chart_1, scatter_series_1, column_series_1, area_series_1, polar_series_1, line_series_1, date_time_axis_1, category_axis_1, tooltip_1, data_label_1, data_editing_1, events_spec_1, data_spec_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(scatter_series_1.ScatterSeries, line_series_1.LineSeries, date_time_axis_1.DateTime, data_editing_1.DataEditing, category_axis_1.Category, tooltip_1.Tooltip, data_label_1.DataLabel, column_series_1.ColumnSeries, area_series_1.AreaSeries, polar_series_1.PolarSeries);
    var data = data_spec_1.tool1;
    var data2 = data_spec_1.tool2;
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
        describe('Chart Scatter series', function () {
            var chartObj;
            var elem;
            var svg;
            var marker;
            var datalabel;
            var targetElement;
            var loaded;
            var trigger = new events_spec_1.MouseEvents();
            beforeAll(function () {
                if (document.getElementById('container')) {
                    document.getElementById('container').remove();
                }
                elem = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal' },
                    series: [{
                            dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Scatter',
                            name: 'ChartSeriesNameGold', fill: 'green',
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
                    var svg = document.getElementById('container_Series_0_Point_0');
                    expect(svg.getAttribute('fill') === 'green').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking with null Points', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_3');
                    expect(svg === null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource[3].y = null;
                chartObj.series[0].marker.visible = true;
                chartObj.refresh();
            });
            it('Checking with negative Points', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container1_AxisLabel_4');
                    var series = args.chart.series[0];
                    marker = document.getElementById('container_Series_0_Point_1');
                    expect(parseFloat(svg.getAttribute('y')) < series.points[1].symbolLocations[0].y).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource[3].y = 60;
                chartObj.series[0].dataSource = data_spec_1.negativeDataPoint;
                chartObj.series[0].marker.visible = true;
                chartObj.refresh();
            });
            it('Checking with single Points', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_0');
                    expect(svg != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = null;
                chartObj.series[0].dataSource = [{ x: 1, y: 10 }];
                chartObj.refresh();
            });
            it('Checking with marker shape Circle without tooltip', function (done) {
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_2');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = series.points[2].regions[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    var x = series.points[2].regions[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_Series_0_Point_2_Trackball_1');
                    expect(tooltip == null).toBe(true);
                    trigger.mousemovetEvent(target, Math.ceil(x + 50), Math.ceil(y + 50));
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Circle';
                chartObj.series[0].marker.fill = 'black';
                chartObj.series[0].marker.visible = false;
                chartObj.series[0].dataSource = data;
                chartObj.tooltip.enable = false;
                chartObj.refresh();
            });
            it('Checking with marker shape Circle', function (done) {
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_2');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = series.points[2].regions[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    var x = series.points[2].regions[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_Series_0_Point_2_Trackball_1');
                    expect(tooltip != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Circle';
                chartObj.series[0].marker.fill = 'black';
                chartObj.series[0].marker.visible = false;
                chartObj.series[0].dataSource = data;
                chartObj.tooltip.enable = true;
                chartObj.refresh();
            });
            it('checking with marker shape diamond', function (done) {
                ej2_base_1.remove(document.getElementById('container_tooltip'));
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_2');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = series.points[2].regions[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    var x = series.points[2].regions[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_Series_0_Point_2_Trackball_1');
                    expect(tooltip != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Diamond';
                chartObj.refresh();
            });
            it('checking with marker shape HorizontalLine', function (done) {
                ej2_base_1.remove(document.getElementById('container_tooltip'));
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_2');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = series.points[2].regions[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    var x = series.points[2].regions[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_Series_0_Point_2_Trackball_1');
                    expect(tooltip != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'HorizontalLine';
                chartObj.refresh();
            });
            it('checking with marker shape InvertedTriangle', function (done) {
                ej2_base_1.remove(document.getElementById('container_tooltip'));
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_2');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = series.points[2].regions[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    var x = series.points[2].regions[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_Series_0_Point_2_Trackball_1');
                    expect(tooltip != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'InvertedTriangle';
                chartObj.refresh();
            });
            it('checking with marker shape Pentagon', function (done) {
                ej2_base_1.remove(document.getElementById('container_tooltip'));
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_2');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = series.points[2].regions[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    var x = series.points[2].regions[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_Series_0_Point_2_Trackball_1');
                    expect(tooltip != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Pentagon';
                chartObj.refresh();
            });
            it('checking with marker shape Triangle', function (done) {
                ej2_base_1.remove(document.getElementById('container_tooltip'));
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_2');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = series.points[2].regions[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    var x = series.points[2].regions[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_Series_0_Point_2_Trackball_1');
                    expect(tooltip != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Triangle';
                chartObj.refresh();
            });
            it('checking with marker shape rectangle', function (done) {
                ej2_base_1.remove(document.getElementById('container_tooltip'));
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_2');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = series.points[2].regions[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    var x = series.points[2].regions[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_Series_0_Point_2_Trackball_1');
                    expect(tooltip != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Rectangle';
                chartObj.refresh();
            });
            it('checking with marker shape verticalLine', function (done) {
                ej2_base_1.remove(document.getElementById('container_tooltip'));
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_2');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = series.points[2].regions[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    var x = series.points[2].regions[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_Series_0_Point_2_Trackball_1');
                    expect(tooltip != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'VerticalLine';
                chartObj.refresh();
            });
            it('checking with marker shape Cross', function (done) {
                ej2_base_1.remove(document.getElementById('container_tooltip'));
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_2');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = series.points[2].regions[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    var x = series.points[2].regions[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_Series_0_Point_2_Trackball_1');
                    expect(tooltip != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Cross';
                chartObj.refresh();
            });
            it('checking with marker shape image', function (done) {
                ej2_base_1.remove(document.getElementById('container_tooltip'));
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_2');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = series.points[2].regions[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    var x = series.points[2].regions[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_Series_0_Point_2_Trackball_1');
                    expect(tooltip != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Image';
                chartObj.series[0].marker.imageUrl = 'base/spec/img/img1.jpg';
                chartObj.refresh();
            });
            it('Checking with marker size', function (done) {
                ej2_base_1.remove(document.getElementById('container_tooltip'));
                loaded = function (args) {
                    var value = Math.round(chartObj.series[0].points[2].regions[0].y);
                    expect(value == 23 || value == 24).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.height = 20;
                chartObj.series[0].marker.width = 20;
                chartObj.refresh();
            });
            it('Checking with marker visible false', function (done) {
                loaded = function (args) {
                    datalabel = document.getElementById('container_Series_0_Point_0');
                    expect(datalabel !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.visible = false;
                chartObj.refresh();
            });
            it('Checking with category axis', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_0');
                    expect(marker != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.series[0].dataSource = data_spec_1.categoryData;
                chartObj.refresh();
            });
            it('Checking with category axis onticks', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_0');
                    expect(marker != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.labelPlacement = 'OnTicks';
                chartObj.series[0].dataSource = data_spec_1.categoryData;
                chartObj.refresh();
            });
            it('Checking with multiple series', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_1');
                    expect(svg.getAttribute('fill') === 'red').toBe(true);
                    svg = document.getElementById('container_Series_1_Point_1');
                    expect(svg.getAttribute('fill') === 'rgba(135,206,235,1)').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series = [{ dataSource: data, xName: 'x', yName: 'y', name: 'Gold', fill: 'red', type: 'Scatter', animation: { enable: false } },
                    { dataSource: data2, xName: 'x', name: 'silver', yName: 'y', fill: 'rgba(135,206,235,1)', type: 'Scatter', animation: { enable: false } }];
                chartObj.series[0].marker.visible = true;
                chartObj.series[1].marker.visible = true;
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.refresh();
            });
            it('checking with dateTime', function (done) {
                loaded = function (args) {
                    var axislabel = document.getElementById('container0_AxisLabel_3');
                    expect(axislabel.textContent === '2003').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = datetime;
                chartObj.series[1].dataSource = datetime;
                chartObj.primaryXAxis.valueType = 'DateTime';
                chartObj.refresh();
            });
            it('Checking with multiple axes ', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_0');
                    expect(svg.getAttribute('fill') === 'red').toBe(true);
                    svg = document.getElementById('container_Series_1_Point_1');
                    expect(svg.getAttribute('fill') === 'rgba(135,206,235,1)').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.axes = [{
                        rowIndex: 1, name: 'yAxis1', minimum: 20, maximum: 80, interval: 20,
                        titleStyle: { size: '14px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' },
                        labelStyle: { size: '12px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' }
                    }];
                chartObj.height = '600';
                chartObj.series[1].yAxisName = 'yAxis1';
                chartObj.rows = [{ height: '300', border: { width: 4, color: 'red' } },
                    { height: '300', border: { width: 4, color: 'blue' } }];
                chartObj.refresh();
            });
            it('Checking with axis with opposed position', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_ChartAreaBorder');
                    var svg1 = document.getElementById('container2_AxisLabel_0');
                    expect(parseFloat(svg.getAttribute('x')) + parseFloat(svg.getAttribute('width')) <
                        parseFloat(svg1.getAttribute('x'))).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.axes[0].opposedPosition = true;
                chartObj.refresh();
            });
            it('Checking animation', function (done) {
                var animate = function (args) {
                    var point = document.getElementById('container_Series_' + args.series.index + '_Point_0');
                    expect(point.getAttribute('transform') !== null).toBe(true);
                    done();
                };
                chartObj.series[0].animation.enable = true;
                chartObj.series[1].animation.enable = true;
                chartObj.animationComplete = animate;
                chartObj.refresh();
            });
        });
    });
    describe('checking for multiple axes', function () {
        var chartObj;
        var elem = ej2_base_1.createElement('div', { id: 'container' });
        var targetElement;
        var loaded;
        var marker0;
        HTMLElement;
        var dataLabel0;
        beforeAll(function () {
            document.body.appendChild(elem);
            chartObj = new chart_1.Chart({
                axes: [{
                        rowIndex: 0,
                        columnIndex: 0,
                        name: 'yAxis1',
                        title: 'YAxis1',
                    },
                    {
                        rowIndex: 0,
                        columnIndex: 0,
                        name: 'yAxis2',
                        title: 'YAxis2',
                    },
                    {
                        rowIndex: 1,
                        columnIndex: 0,
                        name: 'yAxis3',
                        title: 'YAxis3',
                    },
                    {
                        rowIndex: 1,
                        columnIndex: 0,
                        name: 'yAxis4',
                        title: 'YAxis4'
                    },
                    {
                        rowIndex: 0,
                        columnIndex: 1,
                        name: 'yAxis6',
                        title: 'YAxis6',
                        opposedPosition: true,
                    },
                    {
                        rowIndex: 0,
                        columnIndex: 1,
                        name: 'yAxis5',
                        title: 'YAxis5',
                        opposedPosition: true,
                    },
                    {
                        rowIndex: 1,
                        columnIndex: 1,
                        name: 'yAxis7',
                        title: 'YAxis7',
                        opposedPosition: true,
                    },
                    {
                        rowIndex: 1,
                        columnIndex: 1,
                        name: 'yAxis8',
                        title: 'YAxis8',
                        opposedPosition: true,
                    },
                    {
                        columnIndex: 0,
                        rowIndex: 0,
                        name: 'xAxis1',
                        title: 'Xaxis1',
                    },
                    {
                        columnIndex: 0,
                        rowIndex: 0,
                        name: 'xAxis2',
                        title: 'Xaxis2',
                    },
                    {
                        columnIndex: 1,
                        rowIndex: 0,
                        name: 'xAxis3',
                        title: 'Xaxis3',
                    },
                    {
                        columnIndex: 1,
                        rowIndex: 0,
                        name: 'xAxis4',
                        title: 'Xaxis4',
                    },
                    {
                        columnIndex: 0,
                        rowIndex: 1,
                        name: 'xAxis5',
                        title: 'Xaxis5',
                        opposedPosition: true,
                    },
                    {
                        columnIndex: 0,
                        rowIndex: 1,
                        name: 'xAxis6',
                        title: 'Xaxis6',
                        opposedPosition: true,
                    },
                    {
                        columnIndex: 1,
                        rowIndex: 1,
                        name: 'xAxis7',
                        title: 'Xaxis7',
                        opposedPosition: true,
                    },
                    {
                        columnIndex: 1,
                        rowIndex: 1,
                        name: 'xAxis8',
                        title: 'Xaxis8',
                        opposedPosition: true,
                    },
                ],
                series: [{
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Scatter',
                        name: 'ChartSeriesNameGold', fill: 'green',
                        xAxisName: 'xAxis1', yAxisName: 'yAxis1'
                    },
                    {
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Line',
                        name: 'ChartSeriesNameGold', fill: 'red',
                        xAxisName: 'xAxis1', yAxisName: 'yAxis1'
                    },
                    {
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Scatter',
                        name: 'ChartSeriesNameGold1', fill: 'black',
                        xAxisName: 'xAxis1', yAxisName: 'yAxis1'
                    },
                    {
                        dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Scatter',
                        name: 'ChartSeriesNameDiamond', fill: 'blue',
                        xAxisName: 'xAxis2', yAxisName: 'yAxis2'
                    },
                    {
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Scatter',
                        name: 'ChartSeriesNameSilver', fill: 'green',
                        xAxisName: 'xAxis5', yAxisName: 'yAxis3',
                    },
                    {
                        dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false },
                        type: 'Scatter',
                        name: 'ChartSeriesNameRuby', fill: 'red',
                        xAxisName: 'xAxis6', yAxisName: 'yAxis4',
                    },
                    {
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Scatter',
                        name: 'ChartSeriesNamePlatinum', fill: 'rgba(135,000,235,1)',
                        xAxisName: 'xAxis3', yAxisName: 'yAxis5',
                    },
                    {
                        dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Scatter',
                        name: 'ChartSeriesNameEmerald', fill: 'purple',
                        xAxisName: 'xAxis4', yAxisName: 'yAxis6',
                    },
                    {
                        dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Scatter',
                        name: 'ChartSeriesNamePearl', fill: 'violet',
                        xAxisName: 'xAxis7', yAxisName: 'yAxis7'
                    },
                    {
                        dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false },
                        type: 'Scatter',
                        name: 'ChartSeriesNameCoral', fill: 'yellow',
                        xAxisName: 'xAxis8', yAxisName: 'yAxis8',
                    }
                ],
                rows: [
                    { height: '400', border: { width: 2, color: 'red' } },
                    { height: '400', border: { width: 2, color: 'red' } },
                ],
                columns: [
                    { width: '400', border: { width: 2, color: 'black' } },
                    { width: '400', border: { width: 2, color: 'black' } },
                ], legendSettings: { visible: false },
                title: 'Chart TS Title', height: '1000', width: '1000',
            });
            chartObj.appendTo('#container');
        });
        afterAll(function () {
            chartObj.destroy();
            elem.remove();
        });
        it('Checking with fill', function (done) {
            loaded = function (args) {
                var svg = document.getElementById('container_Series_0_Point_0');
                expect(svg.getAttribute('fill') === 'green').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
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
            chartObj.refresh();
        });
        it('Checking pointRender event with cancel args', function (done) {
            loaded = function (args) {
                var svg = document.getElementById('containerSeriesGroup0');
                expect(svg.childNodes.length).toBe(1);
                done();
            };
            chartObj.pointRender = function (args) {
                args.cancel = true;
            };
            chartObj.loaded = loaded;
            chartObj.series[0].animation.enable = true;
            chartObj.title = 'Events Changed';
            chartObj.refresh();
        });
    });
    describe('Scatter Series Inversed axis', function () {
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
                        name: 'ChartSeriesNameGold', dataSource: data, xName: 'x', yName: 'y', size: 'size',
                        type: 'Scatter', marker: { visible: false, dataLabel: { visible: true, fill: 'violet' } }
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
                expect(dataLabelY > pointY).toBe(true);
                dataLabelY = +document.getElementById('container_Series_0_Point_6_TextShape_0').getAttribute('y');
                pointY = chart.series[0].points[6].symbolLocations[0].y;
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
    describe('checking rotated scatter chart', function () {
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
                    { type: 'Scatter', name: 'series1', dataSource: data_spec_1.rotateData1, xName: 'x', yName: 'y', animation: { enable: false },
                        marker: { visible: true } },
                    { type: 'Scatter', name: 'series2', dataSource: data_spec_1.rotateData2, xName: 'x', yName: 'y', animation: { enable: false },
                        marker: { visible: true } }
                ],
                title: 'rotated scatter Chart'
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
                dataLabel = document.getElementById('container_Series_0_Point_2');
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
    var series1 = [
        { x: 0, y: 125 }, { x: 1, y: 125 },
        { x: 2, y: 125 }, { x: 3, y: 125 },
        { x: 4, y: 125 }, { x: 5, y: 125 },
        { x: 6, y: 125 }, { x: 7, y: 125 },
        { x: 8, y: 125 }, { x: 9, y: 125 },
        { x: 10, y: 125 }, { x: 11, y: 125 },
        { x: 12, y: 125 }, { x: 13, y: 125 },
        { x: 14, y: 125 }, { x: 15, y: 125 },
        { x: 85, y: 125 },
        { x: 86, y: 125 }, { x: 87, y: 125 }, { x: 88, y: 125 },
        { x: 89, y: 125 }, { x: 90, y: 125 },
        { x: 91, y: 125 }, { x: 92, y: 125 },
        { x: 93, y: 125 }, { x: 94, y: 125 },
        { x: 95, y: 125 }, { x: 96, y: 125 },
        { x: 97, y: 125 }, { x: 98, y: 125 },
        { x: 99, y: 125 }, { x: 100, y: 125 }
    ];
    var series3 = [
        { x: 97.4, y: 12 }, { x: 86, y: 95 },
        { x: 87.7, y: 95 }, { x: 91, y: 95 },
        { x: 91.1, y: 95 }, { x: 91.2, y: 95 },
        { x: 91.3, y: 95 }, { x: 91.4, y: 95 },
        { x: 92.1, y: 95 }, { x: 92, y: 95 },
        { x: 95, y: 95.1 }, { x: 93, y: 95.5 },
        { x: 94, y: 95.4 }, { x: 95, y: 95 },
        { x: 96, y: 95 }, { x: 97, y: 95 },
        { x: 98, y: 95 }, { x: 99, y: 95 },
        { x: 2, y: 95 },
        { x: 4, y: 95 }, { x: 6, y: 95 },
        { x: 8, y: 95 }, { x: 8.4, y: 95 },
        { x: 8.6, y: 95 }, { x: 8.7, y: 95 },
        { x: 8.8, y: 95 }, { x: 8.9, y: 95 },
        { x: 9.1, y: 95 }, { x: 9.2, y: 95 },
        { x: 9.3, y: 95 }, { x: 9.4, y: 95 },
        { x: 9.5, y: 95 }, { x: 9.6, y: 95 },
        { x: 9.7, y: 95 }, { x: 9.8, y: 95 },
        { x: 9.9, y: 95 }, { x: 10, y: 95 },
        { x: 10.1, y: 95 }, { x: 10.2, y: 95 },
        { x: 10.3, y: 95 }, { x: 10.4, y: 95 },
        { x: 10.5, y: 95 }, { x: 10.6, y: 95 },
        { x: 10.7, y: 95 }, { x: 10.8, y: 95 },
        { x: 10.9, y: 95 }, { x: 11, y: 95 },
        { x: 11.1, y: 95 }, { x: 11.2, y: 95 },
        { x: 11.3, y: 95 }, { x: 11.4, y: 95 },
        { x: 11.5, y: 95 }, { x: 11.6, y: 95 },
        { x: 11.7, y: 95 }, { x: 11.8, y: 95 },
        { x: 11.9, y: 95 }, { x: 12, y: 95 }, { x: 12, y: 95 },
        { x: 14, y: 95 }, { x: 7, y: 15 },
    ];
    var sline = [{ x: 99.3, y: 52 }, { x: 0.5, y: 52 },];
    var dataa2 = [{ x: 95, y: 22 }, { x: 86, y: 125 }];
    var data3 = [{ x: 6, y: 22 }, { x: 13.9, y: 125 }];
    var data4 = [
        { x: 1, y: 75 },
        { x: 10, y: 60 }, { x: 11, y: 59 },
        { x: 89, y: 15 }, { x: 91, y: 2 },
        { x: 90, y: 5 }, { x: 94, y: 29 },
        { x: 89.5, y: 58.7 },
        { x: 100, y: 78 }
    ];
    var scatter1 = [
        { x: 88.8, y: 57.5 },
        { x: 11.5, y: 58 },
        { x: 0, y: 76 },
    ];
    var scatter2 = [
        { x: 0, y: 52 },
    ];
    var areaData = [
        { x: 0, y: 139 }, { x: 1, y: 140 },
        { x: 2, y: 140 }, { x: 3, y: 139 },
        { x: 4, y: 133 }, { x: 5, y: 140 },
        { x: 6, y: 139 }, { x: 7, y: 121 },
        { x: 8, y: 139 }, { x: 9, y: 139 },
        { x: 10, y: 139 }, { x: 11, y: 134 },
        { x: 12, y: 137 }, { x: 13, y: 139 },
        { x: 14, y: 139 },
        { x: 86, y: 139 }, { x: 87, y: 139 }, { x: 88, y: 139 },
        { x: 89, y: 139 }, { x: 90, y: 139 },
        { x: 91, y: 140 }, { x: 92, y: 139 },
        { x: 93, y: 139 }, { x: 94, y: 140 },
        { x: 95, y: 139 }, { x: 96, y: 139 },
        { x: 97, y: 139 }, { x: 98, y: 139 },
        { x: 99, y: 139 }, { x: 100, y: 139 },
        { x: 0, y: 137 }, { x: 0, y: 133 }, { x: 1, y: 125 },
        { x: 2, y: 129 }, { x: 3, y: 128 },
        { x: 4, y: 121 }, { x: 5, y: 135 },
        { x: 6, y: 128 }, { x: 7, y: 139 },
        { x: 8, y: 134 }, { x: 9, y: 140 },
        { x: 10, y: 106 }, { x: 11, y: 134 },
        { x: 12, y: 129 }, { x: 13, y: 129 },
        { x: 14, y: 139 },
        { x: 86, y: 137 }, { x: 87, y: 140 }, { x: 88, y: 123 },
        { x: 89, y: 132 }, { x: 90, y: 127 },
        { x: 91, y: 136 }, { x: 92, y: 137 },
        { x: 93, y: 123 }, { x: 94, y: 136 },
        { x: 95, y: 127 }, { x: 96, y: 138 },
        { x: 97, y: 124 }, { x: 98, y: 124 },
        { x: 99, y: 134 }, { x: 100, y: 129 },
    ];
    var scatter3 = [{ x: 0, y: 20 }];
    var scatter4 = [{ x: 0, y: 18 },];
    describe('checking scatter chart in polar using point click', function () {
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
        var targetElement;
        beforeAll(function () {
            document.body.appendChild(element);
            chart = new chart_1.Chart({
                background: "#417a3a",
                margin: { left: -70, right: -70 },
                primaryXAxis: {
                    majorGridLines: { width: 0 },
                    majorTickLines: { width: 0 },
                    minimum: 0, maximum: 100, interval: 10,
                    labelStyle: { color: 'transparent' }
                },
                primaryYAxis: {
                    majorGridLines: { width: 0 },
                    majorTickLines: { width: 0 },
                    minimum: 0, maximum: 140, interval: 20,
                    labelStyle: { color: 'transparent' },
                    lineStyle: { width: 0 }
                },
                series: [
                    {
                        dataSource: areaData, type: "Polar", drawType: 'Column', xName: "x", yName: "y", fill: "#417a3a", animation: { enable: false }
                    },
                    {
                        dataSource: series1, type: "Polar", drawType: 'Column', xName: "x", yName: "y", fill: "#3be026",
                    },
                    {
                        dataSource: series3, type: "Polar", drawType: 'Area', xName: "x", yName: "y", fill: "#F9E79F",
                    },
                    {
                        dataSource: data4, type: "Polar", drawType: 'Area', xName: "x", yName: "y", fill: "#3be026",
                    },
                    {
                        dataSource: scatter1, type: "Polar", drawType: 'Scatter', xName: "x", yName: "y", fill: "White", width: 3, marker: { visible: true, shape: 'Diamond', width: 10, height: 10 }
                    },
                    {
                        dataSource: scatter2, type: "Polar", drawType: 'Scatter', xName: "x", yName: "y", fill: "#F9E79F", width: 2, marker: { visible: true, width: 12, height: 12 }
                    },
                    {
                        dataSource: scatter3, type: "Polar", drawType: 'Scatter', xName: "x", yName: "y", fill: "#F9E79F", width: 2, marker: { visible: true, width: 36, height: 35 }
                    },
                    {
                        dataSource: dataa2, type: "Polar", drawType: 'Line', xName: "x", yName: "y", fill: "White", width: 2,
                    },
                    {
                        dataSource: data3, type: "Polar", drawType: 'Line', xName: "x", yName: "y", fill: "White", width: 2,
                    },
                    {
                        dataSource: sline, type: "Polar", drawType: 'Line', xName: "x", yName: "y", fill: "White", width: 2,
                    },
                    {
                        dataSource: scatter4, type: "Polar", drawType: 'Scatter', xName: "x", yName: "y", fill: "White", width: 2, marker: { visible: true, shape: 'Diamond', width: 12, height: 10 }
                    },
                ],
                pointClick: function (args) {
                    if (args.point.x > 86 || args.point.x < 15) {
                        var newPoint = getPolarpoint(args.x, args.y, args.series, args.series.chart);
                        args.series.chart.addSeries([{
                                type: 'Polar', drawType: 'Scatter',
                                dataSource: [
                                    { x: newPoint.x, y: newPoint.y }
                                ],
                                xName: 'x', width: 2, animation: { enable: false },
                                yName: 'y', fill: 'orange'
                            }]);
                    }
                }
            });
            chart.appendTo('#container');
            function getPolarpoint(x, y, series, chart) {
                var centerX = series.clipRect.width / 2 + series.clipRect.x, centerY = series.clipRect.height / 2 + series.clipRect.y, distance = Math.sqrt(Math.pow(centerX - x, 2) + Math.pow(centerY - y, 2)), Value = distance / chart.radius, yValue = (Value * series.yAxis.visibleRange.delta) + series.yAxis.visibleRange.min, difference, result1;
                var radians = Math.atan2(y - centerY, x - centerX), angle = ((90 - ((radians * 180) / Math.PI) + 360) % 360);
                angle = 360 - angle;
                angle = angle + 180;
                if (angle > 360)
                    angle = angle - 360;
                difference = series.xAxis.visibleRange.max - series.xAxis.visibleRange.min;
                result1 = difference * (angle / 360);
                result1 += series.xAxis.visibleRange.min;
                return { x: result1, y: yValue };
            }
        });
        afterAll(function () {
            chart.destroy();
            element.remove();
        });
        it('checking scatter series', function () {
            loaded = function (args) {
                var target = document.getElementById('containerSeriesGroup0');
                trigger.mousedownEvent(target, 0, 0, Math.ceil(576.0000000000002), Math.ceil(63.999999999999886));
                var clip = document.getElementById("container_ChartSeriesClipRect_11_Circle");
                expect(clip.getAttribute("r") == "193.875");
            };
            chart.loaded = loaded;
        });
        it('memory leak', function () {
            common_spec_1.profile.sample();
            var average = common_spec_1.inMB(common_spec_1.profile.averageChange);
            expect(average).toBeLessThan(10);
            var memory = common_spec_1.inMB(common_spec_1.getMemoryProfile());
            expect(memory).toBeLessThan(common_spec_1.profile.samples[0] + 0.25);
        });
    });
    describe('Scatter series with drag and drop support', function () {
        var chartObj;
        var x;
        var y;
        var loaded;
        var trigger = new events_spec_1.MouseEvents();
        var element1 = ej2_base_1.createElement('div', { id: 'container' });
        beforeAll(function () {
            document.body.appendChild(element1);
            chartObj = new chart_1.Chart({
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
                        type: 'Scatter',
                        dataSource: [
                            { x: new Date(2005, 0, 1), y: 21 }, { x: new Date(2006, 0, 1), y: 24 },
                            { x: new Date(2007, 0, 1), y: 36 }, { x: new Date(2008, 0, 1), y: 38 },
                            { x: new Date(2009, 0, 1), y: 54 }, { x: new Date(2010, 0, 1), y: 57 },
                            { x: new Date(2011, 0, 1), y: 70 }
                        ],
                        animation: { enable: false },
                        xName: 'x', marker: {
                            visible: true,
                            width: 10,
                            height: 10
                        },
                        yName: 'y', name: 'Germany', dragSettings: { enable: true }
                    }
                ],
                title: 'Inflation - Consumer Price',
                tooltip: {
                    enable: true
                },
            });
            chartObj.appendTo('#container');
        });
        afterAll(function () {
            chartObj.destroy();
            element1.remove();
        });
        it('Scatter series drag and drop with marker true', function (done) {
            loaded = function () {
                var target = document.getElementById('container_Series_0_Point_2');
                var chartArea = document.getElementById('container_ChartAreaBorder');
                y = parseFloat(target.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + element1.offsetTop;
                x = parseFloat(target.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + element1.offsetLeft;
                trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                trigger.draganddropEvent(element1, Math.ceil(x), Math.ceil(y), Math.ceil(x), Math.ceil(y) - 100);
                var yValue = chartObj.visibleSeries[0].points[2].yValue;
                expect(yValue == 65.62 || yValue == 65.24).toBe(true);
                chartObj.loaded = null;
                done();
            };
            chartObj.loaded = loaded;
            chartObj.refresh();
        });
    });
});
