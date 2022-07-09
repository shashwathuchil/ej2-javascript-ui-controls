define(["require", "exports", "@syncfusion/ej2-base", "../../../src/chart/chart", "../../../src/chart/series/spline-series", "../../../src/chart/series/spline-area-series", "../../../src/chart/series/scatter-series", "../../../src/chart/series/line-series", "../../../src/chart/series/step-line-series", "../../../src/chart/series/area-series", "../../../src/chart/axis/date-time-axis", "../../../src/chart/axis/category-axis", "../../../src/chart/series/data-label", "../base/data.spec", "../base/events.spec", "../../../src/chart/user-interaction/data-editing", "../../../src/chart/legend/legend", "../../../src/chart/axis/logarithmic-axis", "../../../src/chart/user-interaction/tooltip", "../../../src/chart/user-interaction/crosshair", "../../../src/chart/user-interaction/selection", "../base/data.spec", "../../common.spec", "../../../src/chart/index", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, chart_1, spline_series_1, spline_area_series_1, scatter_series_1, line_series_1, step_line_series_1, area_series_1, date_time_axis_1, category_axis_1, data_label_1, data_spec_1, events_spec_1, data_editing_1, legend_1, logarithmic_axis_1, tooltip_1, crosshair_1, selection_1, data_spec_2, common_spec_1, index_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(spline_series_1.SplineSeries, spline_area_series_1.SplineAreaSeries, scatter_series_1.ScatterSeries, step_line_series_1.StepLineSeries, line_series_1.LineSeries, category_axis_1.Category, date_time_axis_1.DateTime, area_series_1.AreaSeries, data_label_1.DataLabel, legend_1.Legend, tooltip_1.Tooltip, crosshair_1.Crosshair, logarithmic_axis_1.Logarithmic, selection_1.Selection, data_editing_1.DataEditing);
    var data = data_spec_2.tooltipData1;
    var data2 = data_spec_2.tooltipData2;
    var datetime = data_spec_2.datetimeData;
    var prevent = function () {
    };
    exports.chartData = [{ x: 2002, y: 2.2 }, { x: 2003, y: 3.4 }, { x: 2004, y: 2.8 }, { x: 2005, y: 1.6 },
        { x: 2006, y: 2.3 }, { x: 2007, y: 2.5 }, { x: 2008, y: 2.9 }, { x: 2009, y: 3.8 }, { x: 2010, y: 1.4 }, { x: 2011, y: 3.1 }];
    exports.emptyPointsData1 = [
        { x: 1000, y: 70 }, { x: 2000, y: 40 },
        { x: 3000, y: null }, { x: 4000, y: 60 },
        { x: 5000, y: 50 }, { x: 6000, y: 90 },
        { x: 7000, y: 40 }
    ];
    describe('Chart Control', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('Chart Spline Area series', function () {
            var chartObj;
            var elem;
            var svg;
            var marker;
            var datalabel;
            var targetElement;
            var loaded;
            var animationComplete;
            var trigger = new events_spec_1.MouseEvents();
            beforeAll(function () {
                elem = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal' },
                    series: [{
                            dataSource: exports.chartData, xName: 'x', yName: 'y', animation: { enable: false }, type: 'SplineArea',
                            name: 'Gold', fill: 'green',
                        },
                    ], width: '800',
                    title: 'Chart TS Title', legendSettings: { visible: false }
                });
                chartObj.appendTo('#container');
                data_spec_1.unbindResizeEvents(chartObj);
            });
            afterAll(function () {
                elem.remove();
                chartObj.destroy();
            });
            it('Checking without range', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0');
                    expect(svg.getAttribute('stroke') === 'transparent').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('series selection ', function (done) {
                loaded = function () {
                    var element = document.getElementById('container_Series_0');
                    var series = document.getElementById('containerSeriesGroup0');
                    trigger.clickEvent(element);
                    var selected = document.getElementsByClassName('container_ej2_chart_selection_series_0 ');
                    expect(selected.length).toBe(2);
                    done();
                };
                chartObj.selectionMode = 'Series';
                chartObj.isMultiSelect = false;
                chartObj.series[0].marker.shape = 'Circle';
                chartObj.series[0].marker.fill = 'black';
                chartObj.series[0].marker.visible = true;
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Single point selection and UnSelection', function (done) {
                loaded = function () {
                    var element = document.getElementById('container_Series_0_Point_1_Symbol');
                    trigger.clickEvent(element);
                    var selected = document.getElementsByClassName('container_ej2_chart_selection_series_0 ');
                    expect(element).toBe(selected[0]);
                    trigger.clickEvent(element);
                    selected = document.getElementsByClassName('container_ej2_chart_selection_series_0 ');
                    expect(selected.length).toBe(0);
                    done();
                };
                chartObj.selectionMode = 'Point';
                chartObj.isMultiSelect = false;
                chartObj.loaded = loaded;
                chartObj.selectionModule.selectedDataIndexes = [];
                chartObj.refresh();
            });
            it('Selection mode DragX', function (done) {
                loaded = function () {
                    trigger.draganddropEvent(elem, 100, 100, 300, 300);
                    var element = document.getElementById('container_ej2_drag_rect');
                    expect(element !== null).toBe(true);
                    done();
                };
                chartObj.selectionMode = 'DragX';
                chartObj.loaded = loaded;
                chartObj.selectionModule.selectedDataIndexes = [];
                chartObj.refresh();
            });
            it('Selection mode DragY', function (done) {
                loaded = function () {
                    trigger.draganddropEvent(elem, 100, 100, 300, 300);
                    var element = document.getElementById('container_ej2_drag_rect');
                    expect(element !== null).toBe(true);
                    done();
                };
                chartObj.selectionMode = 'DragY';
                chartObj.loaded = loaded;
                chartObj.selectionModule.selectedDataIndexes = [];
                chartObj.refresh();
            });
            it('Selection mode DragXY', function (done) {
                loaded = function () {
                    trigger.draganddropEvent(elem, 100, 100, 300, 300);
                    var element = document.getElementById('container_ej2_drag_rect');
                    expect(element != null).toBe(true);
                    done();
                };
                chartObj.selectionMode = 'DragXY';
                chartObj.loaded = loaded;
                chartObj.selectionModule.selectedDataIndexes = [];
                chartObj.refresh();
            });
            it('Point Rendering Event', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(element.getAttribute('fill')).toBe('pink');
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.pointRender = function (args) {
                    if (args.point.index === 0) {
                        args.fill = 'pink';
                    }
                };
                chartObj.legendSettings.alignment = 'Near';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Legend Rendering Event', function (done) {
                loaded = function (args) {
                    var legendElement = document.getElementById('container_chart_legend_element');
                    expect(legendElement.tagName).toEqual('rect');
                    expect(legendElement.getAttribute('d')).not.toEqual(null);
                    var legendShape = document.getElementById('container_chart_legend_shape_0');
                    expect(legendShape.getAttribute('fill')).toEqual('blue');
                    expect(legendShape.getAttribute('d') != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.legendRender = function (args) {
                    args.fill = 'blue';
                };
                chartObj.series[0].name = 'series1';
                chartObj.legendSettings = { visible: true, position: 'Top', alignment: 'Near' };
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with marker shape Circle', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_1_Symbol');
                    expect(marker.getAttribute('fill') === 'black').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Circle';
                chartObj.series[0].marker.fill = 'black';
                chartObj.series[0].dataSource = exports.chartData;
                chartObj.series[0].marker.visible = true;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking with marker shape diamond', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_1_Symbol');
                    expect(marker.getAttribute('fill') === 'black').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Diamond';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with marker visible false', function (done) {
                loaded = function (args) {
                    datalabel = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(datalabel === null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.visible = false;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with undefined Points', function (done) {
                loaded = function (args) {
                    var path = document.getElementById('container_Series_0');
                    var id = path.getAttribute('d');
                    expect(id.indexOf('NaN') < 0).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource[3].y = undefined;
                chartObj.series[0].marker.visible = true;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with null Points', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_3_Symbol');
                    expect(svg === null).toBe(true);
                    var path = document.getElementById('container_Series_0');
                    var id = path.getAttribute('d');
                    var check = id.lastIndexOf('M');
                    expect(check !== 0).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource[3].y = null;
                chartObj.series[0].marker.visible = true;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with negative Points', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container1_AxisLabel_5');
                    var series = args.chart.series[0];
                    expect(parseFloat(svg.getAttribute('y')) > series.points[4].symbolLocations[0].y).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = data_spec_2.negativeDataPoint;
                chartObj.series[0].marker.visible = true;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with single Points', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(svg != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = null;
                chartObj.series[0].dataSource = [{ x: 1, y: 1000 }];
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with category axis', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(marker != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.series[0].dataSource = data_spec_2.categoryData1;
                chartObj.series[0].marker.visible = true;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with category axis onticks', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(marker != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.primaryXAxis.labelPlacement = 'OnTicks';
                chartObj.series[0].dataSource = data_spec_2.categoryData1;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with multiple series', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0');
                    expect(svg.getAttribute('fill') === 'red').toBe(true);
                    svg = document.getElementById('container_Series_1');
                    expect(svg.getAttribute('fill') === 'rgba(135,206,235,1)').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series = [
                    { dataSource: data, xName: 'x', yName: 'y', name: 'Gold', fill: 'red', opacity: 0.5, type: 'SplineArea', animation: { enable: false } },
                    { dataSource: data2, xName: 'x', yName: 'y', name: 'silver', fill: 'rgba(135,206,235,1)', opacity: 0.5, type: 'SplineArea', animation: { enable: false } },
                ];
                chartObj.series[0].marker.visible = true;
                chartObj.series[1].marker.visible = true;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with multiple axes ', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0');
                    expect(svg.getAttribute('fill') === 'red').toBe(true);
                    svg = document.getElementById('container_Series_1');
                    expect(svg.getAttribute('fill') === 'blue').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Double',
                    chartObj.series = [
                        {
                            dataSource: data_spec_2.spline1, xName: 'x', yName: 'y', animation: { enable: false }, type: 'SplineArea',
                            name: 'Gold', fill: 'red', opacity: 0.5,
                        },
                        {
                            dataSource: data_spec_2.spline1, xName: 'x', yName: 'y', animation: { enable: false }, type: 'SplineArea',
                            name: 'Silver', fill: 'blue', opacity: 0.5,
                        },
                        {
                            dataSource: data_spec_2.spline1, xName: 'x', yName: 'y', animation: { enable: false }, type: 'SplineArea',
                            name: 'Ruby', fill: 'green', opacity: 0.5,
                        },
                        {
                            dataSource: data_spec_2.spline1, xName: 'x', yName: 'y', animation: { enable: false }, type: 'SplineArea',
                            name: 'diamond', fill: 'black', opacity: 0.5,
                        },
                    ];
                chartObj.axes = [{
                        rowIndex: 1, name: 'yAxis1',
                        titleStyle: { size: '14px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' },
                        labelStyle: { size: '12px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' }
                    },
                    {
                        columnIndex: 1, name: 'xAxis1',
                        titleStyle: { size: '14px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' },
                        labelStyle: { size: '12px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' }
                    }];
                chartObj.height = '650';
                chartObj.width = '800';
                chartObj.series[1].yAxisName = 'yAxis1';
                chartObj.series[2].xAxisName = 'xAxis1';
                chartObj.series[3].yAxisName = 'yAxis1';
                chartObj.series[3].xAxisName = 'xAxis1';
                chartObj.rows = [{ height: '300', border: { width: 4, color: 'red' } },
                    { height: '300', border: { width: 4, color: 'blue' } }];
                chartObj.columns = [{ width: '400', border: { width: 4, color: 'red' } }, { width: '400', border: { width: 4, color: 'red' } }];
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
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
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with category axis with multiple panes- column', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('containerAxisLine_0');
                    expect(svg.getAttribute('d').split(' ')[4] == '457.5' || svg.getAttribute('d').split(' ')[4] == '453.5').toBe(true);
                    var svg1 = document.getElementById('container_AxisBottom_Column0');
                    expect(svg1.getAttribute('stroke') == 'red').toBe(true);
                    svg = document.getElementById('containerAxisLine_1');
                    expect(svg.getAttribute('d').split(' ')[1] == '57.5' || svg.getAttribute('d').split(' ')[1] == '53.5').toBe(true);
                    svg1 = document.getElementById('container_AxisBottom_Column1');
                    expect(svg1.getAttribute('stroke') == 'blue').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.columns = [
                    {
                        width: '400', border: { width: 4, color: 'red' }
                    },
                    {
                        width: '400', border: { width: 4, color: 'blue' }
                    }
                ];
                chartObj.series = [
                    {
                        dataSource: data_spec_2.spline1, xName: 'x', yName: 'y',
                        name: 'series1', type: 'SplineArea', animation: { enable: false }
                    },
                    {
                        dataSource: data_spec_2.spline1, xName: 'x', yName: 'y',
                        name: 'series2', type: 'SplineArea', animation: { enable: false }, xAxisName: 'yAxis1',
                    }
                ];
                chartObj.axes[0].columnIndex = 1;
                chartObj.axes[0].name = 'yAxis1';
                chartObj.axes[0].title = 'Axis2';
                chartObj.primaryYAxis.minimum = 0;
                chartObj.primaryYAxis.maximum = 50;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with category axis with multiple panes- rows', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('containerAxisLine_0');
                    expect(svg.getAttribute('d').split(' ')[2] == '589.5' || svg.getAttribute('d').split(' ')[2] == '593.5').toBe(true);
                    svg = document.getElementById('containerAxisLine_1');
                    expect(svg.getAttribute('d').split(' ')[2] == '334.375' || svg.getAttribute('d').split(' ')[2] == '499.375').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.rows = [{
                        height: '50%'
                    }, {
                        height: '50%'
                    }];
                chartObj.series = [
                    {
                        dataSource: data_spec_2.spline1, xName: 'x', yName: 'y',
                        name: 'series1', type: 'SplineArea', animation: { enable: false }
                    },
                    {
                        dataSource: data_spec_2.spline1, xName: 'x', yName: 'y',
                        name: 'series2', type: 'SplineArea', animation: { enable: false }, yAxisName: 'yAxis1',
                    }
                ];
                chartObj.axes[0].rowIndex = 1;
                chartObj.axes[0].opposedPosition = true;
                chartObj.axes[0].name = 'yAxis1';
                chartObj.axes[0].minimum = 50;
                chartObj.axes[0].maximum = 130;
                chartObj.axes[0].interval = 10;
                chartObj.axes[0].title = 'Axis2';
                chartObj.primaryYAxis.minimum = 0;
                chartObj.primaryYAxis.maximum = 50;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
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
                    expect(chartObj.primaryXAxis.zoomFactor.toFixed(2) == '0.72').toBe(true);
                    expect(chartObj.primaryYAxis.zoomFactor.toFixed(2) == '0.72').toBe(true);
                    expect(chartObj.primaryXAxis.zoomPosition.toFixed(2) == '0.14').toBe(true);
                    expect(chartObj.primaryYAxis.zoomPosition.toFixed(2) == '0.00' ||
                        chartObj.primaryYAxis.zoomPosition.toFixed(2) == '0.01').toBe(true);
                    done();
                };
                chartObj.zoomSettings.enableMouseWheelZooming = true;
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
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
                    expect(content == '0.33' || content == '0.29').toBe(true);
                    content = chartObj.primaryYAxis.zoomFactor.toFixed(2);
                    expect(content == '1.00' || content === '0.90').toBe(true);
                    content = chartObj.primaryXAxis.zoomPosition.toFixed(2);
                    expect(content == '0.77' || content == '0.84' || content == '0.83').toBe(true);
                    chartObj.mouseLeave(trigger.onTouchLeave(areaElement, 748, 129, 304, 289, 304, 289));
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.zoomSettings.enablePinchZooming = true;
                chartObj.dataBind();
            });
        });
        describe('Spline Area Series Inversed axis', function () {
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
                            name: 'Gold', dataSource: [{ x: 1000, y: 70 }, { x: 2000, y: 40 },
                                { x: 3000, y: 70 }, { x: 4000, y: 60 },
                                { x: 5000, y: 50 }, { x: 6000, y: 40 },
                                { x: 7000, y: 40 }, { x: 8000, y: 70 }], xName: 'x', yName: 'y', size: 'size',
                            type: 'SplineArea', marker: { visible: false, dataLabel: { visible: true, fill: 'violet' } }
                        }],
                    width: '800',
                    title: 'Chart TS Title', loaded: loaded,
                    legendSettings: { visible: false }
                });
                chart.appendTo('#container');
                data_spec_1.unbindResizeEvents(chart);
            });
            afterAll(function () {
                chart.destroy();
                element.remove();
            });
            it('With Label position Auto', function (done) {
                loaded = function (args) {
                    dataLabelY = +document.getElementById('container_Series_0_Point_2_TextShape_0').getAttribute('y');
                    pointY = chart.series[0].points[2].symbolLocations[0].y;
                    expect(dataLabelY !== pointY).toBe(true);
                    dataLabelY = +document.getElementById('container_Series_0_Point_6_TextShape_0').getAttribute('y');
                    pointY = chart.series[0].points[6].symbolLocations[0].y;
                    expect(dataLabelY !== pointY).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.refresh();
                data_spec_1.unbindResizeEvents(chart);
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
                data_spec_1.unbindResizeEvents(chart);
            });
            it('With Label position Top', function (done) {
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
                chart.series[0].marker.dataLabel.alignment = 'Center';
                chart.refresh();
                data_spec_1.unbindResizeEvents(chart);
            });
            it('With Label position Bottom', function (done) {
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
                chart.refresh();
                data_spec_1.unbindResizeEvents(chart);
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
                data_spec_1.unbindResizeEvents(chart);
            });
        });
        describe('checking spline area chart', function () {
            var chartObj;
            var loaded;
            var element = ej2_base_1.createElement('div', { id: 'container' });
            var dataLabel;
            var pathElement = null;
            var markerElement = null;
            var pointElement = null;
            var path = null;
            var temp;
            var point;
            var trigger = new events_spec_1.MouseEvents();
            var animationComplete;
            var x;
            var y;
            var tooltip;
            var chartArea;
            var series;
            beforeAll(function () {
                document.body.appendChild(element);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'primaryXAxis' },
                    primaryYAxis: { title: 'PrimaryYAxis' },
                    series: [
                        {
                            type: 'SplineArea', name: 'splinearea', dataSource: exports.emptyPointsData1, xName: 'x', yName: 'y', animation: { enable: false },
                            marker: { visible: true }
                        }
                    ],
                    title: 'rotated area Chart'
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                element.remove();
            });
            it('Empty Point with Line Series Gap mode', function (done) {
                loaded = function (args) {
                    pathElement = index_1.getElement('container_Series_0');
                    path = pathElement.getAttribute('d');
                    var pathLength = path.split('L').length;
                    expect(pathLength).toBe(5);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Empty Point with Line Series Zero mode', function (done) {
                chartObj.loaded = function (args) {
                    pathElement = index_1.getElement('container_Series_0');
                    path = pathElement.getAttribute('d');
                    var pathLength = path.split('L').length;
                    expect(pathLength).toBe(3);
                    done();
                };
                chartObj.series[0].emptyPointSettings = { mode: 'Zero', fill: 'blue', border: { width: 2, color: 'purple' } };
                chartObj.refresh();
            });
            it('Empty Point with Line Series Average Mode', function (done) {
                chartObj.loaded = function (args) {
                    pathElement = index_1.getElement('container_Series_0');
                    path = pathElement.getAttribute('d');
                    var pathLength = path.split('L').length;
                    expect(pathLength).toBe(3);
                    done();
                };
                chartObj.series[0].emptyPointSettings = { mode: 'Average' };
                chartObj.refresh();
            });
            it('Empty Point with Line Series Drop Mode', function (done) {
                chartObj.loaded = function (args) {
                    pathElement = index_1.getElement('container_Series_0');
                    path = pathElement.getAttribute('d');
                    var pathLength = path.split('L').length;
                    expect(pathLength).toBe(3);
                    done();
                };
                chartObj.series[0].emptyPointSettings = { mode: 'Drop' };
                chartObj.refresh();
            });
        });
        describe('checking rotated spline area chart', function () {
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
                            type: 'SplineArea', name: 'spline1', dataSource: data_spec_2.rotateData1, xName: 'x', yName: 'y', animation: { enable: false },
                            marker: { visible: true }
                        }
                    ],
                    title: 'rotated spline Chart'
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
                data_spec_1.unbindResizeEvents(chart);
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
                data_spec_1.unbindResizeEvents(chart);
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
                data_spec_1.unbindResizeEvents(chart);
            });
            it('checking with datalabel Outer position', function (done) {
                loaded = function (args) {
                    dataLabel = document.getElementById('container_Series_0_Point_2_Text_0');
                    point = chart.series[0].points[2];
                    expect(+(dataLabel.getAttribute('y')) < point.symbolLocations[0].y).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].marker.dataLabel.visible = true;
                chart.series[0].marker.dataLabel.position = 'Outer';
                chart.refresh();
                data_spec_1.unbindResizeEvents(chart);
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
                data_spec_1.unbindResizeEvents(chart);
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
                data_spec_1.unbindResizeEvents(chart);
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
                data_spec_1.unbindResizeEvents(chart);
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
                data_spec_1.unbindResizeEvents(chart);
            });
        });
        describe('checking spline types  with spline Area chart', function () {
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
                            type: 'SplineArea', name: 'spline1', dataSource: data_spec_2.datetimeData, xName: 'x', yName: 'y', animation: { enable: false },
                            marker: { visible: true }
                        }
                    ],
                    title: 'Types spline Chart'
                });
                chart.appendTo('#container');
            });
            afterAll(function () {
                chart.destroy();
                element.remove();
            });
            it('checking with cardinal dateTime axis', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0');
                    expect(svg).not.toEqual(null);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].splineType = 'Cardinal';
                chart.series[0].cardinalSplineTension = 0.8;
                chart.refresh();
                data_spec_1.unbindResizeEvents(chart);
            });
            it('checking with cardinal dateTime axis(Months)', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0');
                    expect(svg).not.toEqual(null);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].splineType = 'Cardinal';
                chart.primaryXAxis.intervalType = 'Months';
                chart.refresh();
                data_spec_1.unbindResizeEvents(chart);
            });
            it('checking with cardinal dateTime axis(Days)', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0');
                    expect(svg).not.toEqual(null);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].splineType = 'Cardinal';
                chart.primaryXAxis.intervalType = 'Days';
                chart.refresh();
                data_spec_1.unbindResizeEvents(chart);
            });
            it('checking with cardinal dateTime axis(hours)', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0');
                    expect(svg).not.toEqual(null);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].splineType = 'Cardinal';
                chart.series[0].cardinalSplineTension = -0.2;
                chart.primaryXAxis.intervalType = 'Hours';
                chart.refresh();
                data_spec_1.unbindResizeEvents(chart);
            });
            it('checking with cardinal dateTime axis(seconds)', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0');
                    expect(svg).not.toEqual(null);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].splineType = 'Cardinal';
                chart.series[0].cardinalSplineTension = 1.2;
                chart.primaryXAxis.intervalType = 'Seconds';
                chart.refresh();
                data_spec_1.unbindResizeEvents(chart);
            });
            it('checking with cardinal dateTime axis(minutes)', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0');
                    expect(svg).not.toEqual(null);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].splineType = 'Cardinal';
                chart.primaryXAxis.intervalType = 'Minutes';
                chart.refresh();
                data_spec_1.unbindResizeEvents(chart);
            });
            it('checking with monotonic dateTime axis', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0');
                    expect(svg).not.toEqual(null);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].splineType = 'Monotonic';
                chart.refresh();
                data_spec_1.unbindResizeEvents(chart);
            });
            it('checking with clamped dateTime axis', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0');
                    expect(svg).not.toEqual(null);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].splineType = 'Clamped';
                chart.refresh();
                data_spec_1.unbindResizeEvents(chart);
            });
            it('checking with clamped dateTime axis with consecutive same x values', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0');
                    expect(svg).not.toEqual(null);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].splineType = 'Clamped';
                chart.series[0].dataSource = [{ x: new Date(2000, 6, 11), y: 10 }, { x: new Date(2000, 6, 11), y: 20 },
                    { x: new Date(2004, 3, 6), y: 15 }, { x: new Date(2006, 3, 30), y: -65 },
                    { x: new Date(2008, 3, 8), y: 0 }, { x: new Date(2010, 3, 8), y: 85 }];
                chart.refresh();
                data_spec_1.unbindResizeEvents(chart);
            });
            it('checking with maximum value at first', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(svg).not.toEqual(null);
                    done();
                };
                chart.loaded = loaded;
                chart.primaryXAxis.valueType = 'Double';
                chart.series = [{
                        dataSource: [{ x: 1, y: 100 }, { x: 2, y: 20 }, { x: 3, y: 65 }], xName: 'x', yName: 'y', animation: { enable: false },
                        type: 'SplineArea', marker: { visible: true }
                    }];
                chart.refresh();
                data_spec_1.unbindResizeEvents(chart);
            });
        });
        describe('Spline Area Series with animation', function () {
            var chartObj;
            var loaded;
            var element = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(element);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis', },
                    primaryYAxis: { title: 'PrimaryYAxis' },
                    series: [{
                            animation: { enable: true, duration: 100 }, name: 'Gold',
                            dataSource: [{ x: 1000, y: 70 }, { x: 2000, y: 40 },
                                { x: 3000, y: 70 }, { x: 4000, y: -60 },
                                { x: 5000, y: 50 }, { x: 6000, y: 40 },
                                { x: 7000, y: 40 }, { x: 8000, y: 70 }
                            ], xName: 'x', yName: 'y',
                            type: 'SplineArea', fill: 'rgba(135,206,235,1)',
                            marker: { visible: true }
                        }, {
                            animation: { enable: true, duration: 100 }, name: 'Silver',
                            dataSource: [{ x: 1000, y: 70 }, { x: 2000, y: 40 },
                                { x: 3000, y: 70 }, { x: 4000, y: -60 },
                                { x: 5000, y: 50 }, { x: 6000, y: 40 },
                                { x: 7000, y: 40 }, { x: 8000, y: 70 }
                            ], xName: 'x', yName: 'y',
                            type: 'SplineArea', fill: 'rgba(135,206,235,1)',
                            marker: { visible: true }
                        }, {
                            animation: { enable: true, duration: 100 }, name: 'Bronze',
                            dataSource: [{ x: 1000, y: 70 }, { x: 2000, y: 40 },
                                { x: 3000, y: 70 }, { x: 4000, y: -60 },
                                { x: 5000, y: 50 }, { x: 6000, y: 40 },
                                { x: 7000, y: 40 }, { x: 8000, y: 70 }
                            ], xName: 'x', yName: 'y',
                            type: 'SplineArea', fill: 'rgba(135,206,235,1)',
                            marker: { visible: true }
                        }],
                    width: '800',
                    legendSettings: { visible: false },
                    title: 'Chart TS Title',
                });
                chartObj.appendTo('#container');
                data_spec_1.unbindResizeEvents(chartObj);
            });
            afterAll(function () {
                chartObj.destroy();
                document.getElementById('container').remove();
            });
            it('Checking vertical mode', function (done) {
                chartObj.loaded = function (args) {
                    var element = document.getElementById('container_Series_0');
                    expect(element !== null).toBe(true);
                    done();
                };
                chartObj.isTransposed = true;
                chartObj.series[0].animation.enable = false;
                chartObj.series[1].animation.enable = false;
                chartObj.series[2].animation.enable = false;
                chartObj.refresh();
            });
            it('Checking remove series', function (done) {
                chartObj.loaded = function (args) {
                    expect(chartObj.visibleSeriesCount).toBe(2);
                    expect(chartObj.visibleSeries[0].name).toBe('Gold');
                    expect(chartObj.visibleSeries[1].name).toBe('Bronze');
                    done();
                };
                chartObj.removeSeries(1);
            });
        });
        describe('Spline area series with drag and drop support', function () {
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
                            type: 'SplineArea',
                            dataSource: [
                                { x: new Date(2005, 0, 1), y: 21 }, { x: new Date(2006, 0, 1), y: 24 },
                                { x: new Date(2007, 0, 1), y: 36 }, { x: new Date(2008, 0, 1), y: 38 },
                                { x: new Date(2009, 0, 1), y: 54 }, { x: new Date(2010, 0, 1), y: 57 },
                                { x: new Date(2011, 0, 1), y: 70 }
                            ],
                            animation: { enable: false },
                            xName: 'x', width: 2, marker: {
                                visible: true,
                                width: 20,
                                height: 20
                            },
                            yName: 'y', name: 'Germany', dragSettings: { enable: true }
                        },
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
            it('spline area series drag and drop with marker true', function (done) {
                loaded = function () {
                    var target = document.getElementById('container_Series_0_Point_3_Symbol');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(target.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + element1.offsetTop;
                    x = parseFloat(target.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + element1.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    trigger.draganddropEvent(element1, Math.ceil(x), Math.ceil(y), Math.ceil(x), Math.ceil(y) - 126);
                    var yValue = chartObj.visibleSeries[0].points[3].yValue;
                    expect(yValue == 75.49 || yValue == 74.96).toBe(true);
                    chartObj.loaded = null;
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
