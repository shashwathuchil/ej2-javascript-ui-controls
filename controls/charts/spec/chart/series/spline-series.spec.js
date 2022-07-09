define(["require", "exports", "@syncfusion/ej2-base", "../../../src/chart/chart", "../../../src/chart/series/spline-series", "../../../src/chart/series/scatter-series", "../../../src/chart/series/line-series", "../../../src/chart/series/step-line-series", "../../../src/chart/series/area-series", "../../../src/chart/axis/date-time-axis", "../../../src/chart/axis/category-axis", "../../../src/chart/series/data-label", "../base/data.spec", "../base/events.spec", "../../../src/chart/user-interaction/data-editing", "../base/data.spec", "../../common.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, chart_1, spline_series_1, scatter_series_1, line_series_1, step_line_series_1, area_series_1, date_time_axis_1, category_axis_1, data_label_1, data_spec_1, events_spec_1, data_editing_1, data_spec_2, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(spline_series_1.SplineSeries, data_editing_1.DataEditing, scatter_series_1.ScatterSeries, step_line_series_1.StepLineSeries, line_series_1.LineSeries, category_axis_1.Category, date_time_axis_1.DateTime, area_series_1.AreaSeries, data_label_1.DataLabel);
    var data = data_spec_2.tooltipData1;
    var data2 = data_spec_2.tooltipData2;
    var datetime = data_spec_2.datetimeData;
    describe('Chart Control', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('Chart Spline series', function () {
            var chartObj;
            var elem;
            var svg;
            var marker;
            var datalabel;
            var targetElement;
            var loaded;
            beforeAll(function () {
                elem = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal' },
                    series: [{
                            dataSource: data_spec_2.spline1, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Spline',
                            name: 'ChartSeriesNameGold', fill: 'green',
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
                    expect(svg.getAttribute('stroke') === 'green').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
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
                    expect(parseFloat(svg.getAttribute('y')) < series.points[4].symbolLocations[0].y).toBe(true);
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
            it('Checking with marker shape Circle', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(marker.getAttribute('fill') === 'black').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryYAxis.minimum = 0;
                chartObj.primaryYAxis.maximum = 80;
                chartObj.primaryYAxis.interval = 10;
                chartObj.series[0].marker.shape = 'Circle';
                chartObj.series[0].marker.fill = 'black';
                chartObj.series[0].dataSource = data;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking with marker shape diamond', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(marker.getAttribute('fill') === 'black').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Diamond';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking with marker shape HorizontalLine', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(marker.getAttribute('fill') === 'black').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'HorizontalLine';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking with marker shape InvertedTriangle', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(marker.getAttribute('fill') === 'black').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'InvertedTriangle';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking with marker shape Pentagon', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(marker.getAttribute('fill') === 'black').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Pentagon';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking with marker shape Triangle', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(marker.getAttribute('fill') === 'black').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Triangle';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking with marker shape rectangle', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(marker.getAttribute('fill') === 'black').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Rectangle';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking with marker shape verticalLine', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(marker.getAttribute('fill') === 'black').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'VerticalLine';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking with marker shape image', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(svg.getAttribute('href') === 'base/spec/img/img1.jpg').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Image';
                chartObj.series[0].marker.imageUrl = 'base/spec/img/img1.jpg';
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
            it('Checking with category axis', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(marker != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.series[0].dataSource = data_spec_2.categoryData;
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
                chartObj.series[0].dataSource = data_spec_2.categoryData;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with multiple series', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0');
                    expect(svg.getAttribute('stroke') === 'red').toBe(true);
                    svg = document.getElementById('container_Series_1');
                    expect(svg.getAttribute('stroke') === 'rgba(135,206,235,1)').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series = [{ dataSource: data, xName: 'x', yName: 'y', name: 'Gold', fill: 'red', type: 'Spline', animation: { enable: false } },
                    { dataSource: data2, xName: 'x', name: 'silver', yName: 'y', fill: 'rgba(135,206,235,1)', type: 'Spline', animation: { enable: false } },
                    { dataSource: data, xName: 'x', name: 'diamond', yName: 'y', fill: 'blue', type: 'Spline', animation: { enable: false } }];
                chartObj.series[0].marker.visible = true;
                chartObj.series[1].marker.visible = true;
                chartObj.series[2].marker.visible = true;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
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
                chartObj.series[2].dataSource = datetime;
                chartObj.primaryXAxis.valueType = 'DateTime';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with range ', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0');
                    expect(svg.getAttribute('stroke') === 'red').toBe(true);
                    svg = document.getElementById('container_Series_1');
                    expect(svg.getAttribute('stroke') === 'rgba(135,206,235,1)').toBe(true);
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
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with multiple axes ', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0');
                    expect(svg.getAttribute('stroke') === 'red').toBe(true);
                    svg = document.getElementById('container_Series_1');
                    expect(svg.getAttribute('stroke') === 'blue').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Double',
                    chartObj.series = [
                        {
                            dataSource: data_spec_2.spline1, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Spline',
                            name: 'ChartSeriesNameGold', fill: 'red',
                        },
                        {
                            dataSource: data_spec_2.spline1, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Spline',
                            name: 'ChartSeriesNameSilver', fill: 'blue',
                        },
                        {
                            dataSource: data_spec_2.spline1, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Spline',
                            name: 'ChartSeriesNameRuby', fill: 'green',
                        },
                        {
                            dataSource: data_spec_2.spline1, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Spline',
                            name: 'ChartSeriesNamediamond', fill: 'black',
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
        });
        describe('spline Series with animation', function () {
            var chartObj;
            var loaded;
            var element = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(element);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis', },
                    primaryYAxis: { title: 'PrimaryYAxis' },
                    series: [{
                            animation: { enable: true, duration: 1500 }, name: 'ChartSeriesNameGold',
                            dataSource: [{ x: 1000, y: 70 }, { x: 2000, y: 40 },
                                { x: 3000, y: 70 }, { x: 4000, y: -60 },
                                { x: 5000, y: 50 }, { x: 6000, y: 40 },
                                { x: 7000, y: 40 }, { x: 8000, y: 70 }
                            ], xName: 'x', yName: 'y',
                            type: 'Spline', fill: 'rgba(135,206,235,1)',
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
            it('Default animation', function (done) {
                var animate = function (args) {
                    var series = args.series;
                    var element = document.getElementById('container_ChartSeriesClipRect_0').childNodes[0];
                    expect(series.clipRect.width === parseFloat(element.getAttribute('width'))).toBe(true);
                    done();
                };
                chartObj.animationComplete = animate;
            });
        });
        describe('Spline Series Inversed axis', function () {
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
                            name: 'ChartSeriesNameGold', dataSource: [{ x: 1000, y: 70 }, { x: 2000, y: 40 },
                                { x: 3000, y: 70 }, { x: 4000, y: 60 },
                                { x: 5000, y: 50 }, { x: 6000, y: 40 },
                                { x: 7000, y: 40 }, { x: 8000, y: 70 }], xName: 'x', yName: 'y', size: 'size',
                            type: 'Spline', marker: { visible: false, dataLabel: { visible: true, fill: 'violet' } }
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
                data_spec_1.unbindResizeEvents(chart);
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
        describe('checking rotated spline chart', function () {
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
                        { type: 'Spline', name: 'spline1', dataSource: data_spec_2.rotateData1, xName: 'x', yName: 'y', animation: { enable: false },
                            marker: { visible: true } },
                        { type: 'Spline', name: 'spline2', dataSource: data_spec_2.rotateData2, xName: 'x', yName: 'y', animation: { enable: false },
                            marker: { visible: true } }
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
        });
        describe('checking spline types chart', function () {
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
                            type: 'Spline', name: 'spline1', dataSource: data_spec_2.rotateData1, xName: 'x', yName: 'y', animation: { enable: false },
                            marker: { visible: true }
                        },
                        {
                            type: 'Spline', name: 'spline2', dataSource: data_spec_2.rotateData2, xName: 'x', yName: 'y', animation: { enable: false },
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
                        type: 'Spline', marker: { visible: true }
                    }];
                chart.refresh();
            });
        });
        describe('Spline series with drag and drop support', function () {
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
                            type: 'Spline',
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
            it('spline series drag and drop with marker true', function (done) {
                loaded = function () {
                    var target = document.getElementById('container_Series_0_Point_3_Symbol');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(target.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + element1.offsetTop;
                    x = parseFloat(target.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + element1.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    trigger.draganddropEvent(element1, Math.ceil(x), Math.ceil(y), Math.ceil(x), Math.ceil(y) - 100);
                    var yValue = chartObj.visibleSeries[0].points[3].yValue;
                    expect(yValue == 67.71 || yValue == 67.3).toBe(true);
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
