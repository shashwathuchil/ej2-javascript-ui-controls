define(["require", "exports", "@syncfusion/ej2-base", "@syncfusion/ej2-svg-base", "../../../src/chart/chart", "../../../src/chart/series/line-series", "../../../src/chart/series/step-line-series", "../../../src/chart/series/column-series", "../../../src/chart/series/area-series", "../../../src/chart/axis/date-time-axis", "../../../src/chart/axis/category-axis", "../../../src/chart/series/data-label", "../../../src/chart/legend/legend", "../../../src/chart/user-interaction/data-editing", "../base/events.spec", "../base/data.spec", "../base/data.spec", "../base/data.spec", "../../common.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, ej2_svg_base_1, chart_1, line_series_1, step_line_series_1, column_series_1, area_series_1, date_time_axis_1, category_axis_1, data_label_1, legend_1, data_editing_1, events_spec_1, data_spec_1, data_spec_2, data_spec_3, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(line_series_1.LineSeries, column_series_1.ColumnSeries, area_series_1.AreaSeries, date_time_axis_1.DateTime, category_axis_1.Category, data_editing_1.DataEditing, data_label_1.DataLabel, step_line_series_1.StepLineSeries, legend_1.Legend);
    var data = data_spec_2.tooltipData11;
    var data2 = data_spec_2.tooltipData12;
    var negativPoint = data_spec_2.negativeDataPoint;
    var dateTime = data_spec_2.datetimeData11;
    var india = data_spec_3.firstSeries;
    var germany = data_spec_3.secondSeries;
    var england = data_spec_3.thirdSeries;
    var france = data_spec_3.fourthSeries;
    describe('Chart Control Series', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('Line Series - Marker', function () {
            var chartObj;
            var loaded;
            var element;
            var x;
            var y;
            var trigger = new events_spec_1.MouseEvents();
            element = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(element);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis', minimum: 2005, maximum: 2011, interval: 1 },
                    primaryYAxis: { title: 'PrimaryYAxis', minimum: 25, maximum: 50, interval: 5, rangePadding: 'None' },
                    series: [{
                            animation: { enable: false },
                            dataSource: india, xName: 'x', yName: 'y', name: 'India',
                            fill: '#E94649', type: 'Line', marker: { visible: true }
                        }, {
                            animation: { enable: false },
                            dataSource: germany, xName: 'x', yName: 'y', name: 'germany', fill: '#F6B53F',
                            type: 'Line', marker: { visible: true }
                        }, {
                            animation: { enable: false },
                            type: 'Line', dataSource: england, xName: 'x', yName: 'y',
                            name: 'England', fill: '#6FAAB0', marker: { visible: true }
                        }, {
                            animation: { enable: false },
                            dataSource: france, name: 'France', xName: 'x', yName: 'y',
                            fill: '#C4C24A', type: 'Line', marker: { visible: true }
                        }],
                    width: '800',
                    title: 'Chart TS Title', loaded: loaded, legendSettings: { visible: false }
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                element.remove();
            });
            it('Showing default marker', function (done) {
                loaded = function (args) {
                    var series1 = document.getElementById('containerSymbolGroup1').childNodes.length;
                    expect(series1 == 8).toBe(true);
                    var marker = document.getElementById('container_Series_3_Point_0_Symbol');
                    expect(marker.getAttribute('stroke') == '#C4C24A').toBe(true);
                    expect(marker.getAttribute('fill') == '#ffffff').toBe(true);
                    expect(marker.getAttribute('rx') == '2.5').toBe(true);
                    expect(marker.getAttribute('ry') == '2.5').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Changing visibility', function (done) {
                loaded = function (args) {
                    var series1 = document.getElementById('containerSymbolGroup1');
                    expect(series1 == null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.visible = false;
                chartObj.refresh();
            });
            it('Changing size', function (done) {
                loaded = function (args) {
                    var series1 = document.getElementById('container_Series_1_Point_3_Symbol');
                    expect(series1.getAttribute('rx') == '5').toBe(true);
                    expect(series1.getAttribute('ry') == '5').toBe(true);
                    expect(series1.getAttribute('cx') == '353.25').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.visible = true;
                chartObj.series[1].marker.width = 10;
                chartObj.series[1].marker.height = 10;
                chartObj.series[1].marker.offset = { x: -15 };
                chartObj.refresh();
            });
            it('Changing size default', function (done) {
                loaded = function (args) {
                    var series1;
                    series1 = document.getElementById('container_Series_1_Point_3_Symbol');
                    expect(series1.getAttribute('rx') == '0').toBe(true);
                    expect(series1.getAttribute('ry') == '0').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.width = 0;
                chartObj.series[1].marker.offset = { x: 0, y: 0 };
                chartObj.series[1].marker.height = 0;
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
            it('with checking column series marker visibility', function (done) {
                loaded = function (args) {
                    var series1 = document.getElementById('container_Series_0_Point_3_Symbol');
                    expect(series1 !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'Column';
                chartObj.refresh();
            });
            it('Changing marker shape 1', function (done) {
                loaded = function (args) {
                    var series1 = document.getElementById('container_Series_3_Point_1_Symbol');
                    var element = new ej2_svg_base_1.SvgRenderer('').createGroup({});
                    var direction = series1.getAttribute('d');
                    expect(direction.indexOf('z') > 0).toBe(true);
                    series1 = document.getElementById('container_Series_2_Point_1_Symbol');
                    direction = series1.getAttribute('d');
                    expect(direction.indexOf('z') == -1).toBe(true);
                    series1 = document.getElementById('container_Series_1_Point_1_Symbol');
                    direction = series1.getAttribute('d');
                    expect(direction.indexOf('z') > 0).toBe(true);
                    series1 = document.getElementById('container_Series_0_Point_1_Symbol');
                    direction = series1.getAttribute('d');
                    expect(direction.indexOf('z') == -1).toBe(true);
                    series1 = document.getElementById('container_Series_2_Point_2_Symbol');
                    expect(series1 == null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'Line';
                chartObj.series[0].marker.height = 10;
                chartObj.series[0].marker.width = 10;
                chartObj.series[1].marker.height = 10;
                chartObj.series[1].marker.width = 10;
                chartObj.series[2].marker.height = 10;
                chartObj.series[2].marker.width = 10;
                chartObj.series[3].marker.height = 10;
                chartObj.series[3].marker.width = 10;
                chartObj.series[0].marker.shape = 'Cross';
                chartObj.series[1].marker.shape = 'Diamond';
                chartObj.series[2].marker.shape = 'HorizontalLine';
                chartObj.series[3].marker.shape = 'InvertedTriangle';
                chartObj.pointRender = function (args) {
                    if (args.point.index === 2) {
                        args.cancel = true;
                    }
                };
                chartObj.refresh();
            });
            it('Changing marker shape 2', function (done) {
                loaded = function (args) {
                    var direction;
                    var series1;
                    series1 = document.getElementById('container_Series_3_Point_1_Symbol');
                    direction = series1.getAttribute('d');
                    expect(direction.indexOf('z') <= -1).toBe(true);
                    series1 = document.getElementById('container_Series_2_Point_1_Symbol');
                    direction = series1.getAttribute('d');
                    expect(direction.indexOf('z') > 0).toBe(true);
                    series1 = document.getElementById('container_Series_1_Point_1_Symbol');
                    direction = series1.getAttribute('d');
                    expect(direction.indexOf('z') > 0).toBe(true);
                    series1 = document.getElementById('container_Series_0_Point_1_Symbol');
                    direction = series1.getAttribute('d');
                    expect(direction.indexOf('z') <= -1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Pentagon';
                chartObj.series[1].marker.shape = 'Rectangle';
                chartObj.series[2].marker.shape = 'Triangle';
                chartObj.series[3].marker.shape = 'VerticalLine';
                chartObj.pointRender = null;
                chartObj.refresh();
            });
            it('with image', function (done) {
                loaded = function (args) {
                    var series1 = document.getElementById('container_Series_1_Point_0_Symbol');
                    expect(series1.getAttribute('href') == 'base/spec/img/img1.jpg').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.shape = 'Image';
                chartObj.series[1].marker.imageUrl = 'base/spec/img/img1.jpg';
                chartObj.series[1].marker.height = 20;
                chartObj.series[1].marker.width = 20;
                chartObj.refresh();
            });
            it('with marker properties', function (done) {
                loaded = function (args) {
                    var series1 = document.getElementById('container_Series_2_Point_2_Symbol');
                    expect(series1.getAttribute('fill') == 'green').toBe(true);
                    expect(series1.getAttribute('opacity') == '0.1').toBe(true);
                    expect(series1.getAttribute('stroke') == 'red').toBe(true);
                    expect(series1.getAttribute('stroke-width') == '4').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[2].marker.fill = 'green';
                chartObj.series[2].marker.opacity = 0.1;
                chartObj.series[2].marker.border = {
                    width: 4,
                    color: 'red'
                };
                chartObj.refresh();
            });
            it('Checking Marker highlight explode', function (done) {
                loaded = function () {
                    var series1 = document.getElementById('container_Series_2_Point_4_Symbol');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(series1.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + element.offsetTop;
                    x = parseFloat(series1.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + element.offsetLeft;
                    trigger.mousemovetEvent(series1, Math.ceil(x), Math.ceil(y));
                    expect(document.getElementById('container_Series_2_Point_4_Trackball_1')).toBe(null);
                    expect(document.getElementById('container_Series_2_Point_4_Trackball_0')).toBe(null);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.tooltip.enable = false;
                chartObj.refresh();
            });
        });
        describe('Line Series', function () {
            var chartObj;
            var loaded;
            var animate;
            var element1 = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(element1);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis', labelFormat: 'C' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal' },
                    series: [{
                            animation: { enable: false },
                            name: 'ChartSeriesNameGold',
                            fill: 'rgba(135,206,235,1)',
                            xName: 'x',
                            yName: 'y',
                            marker: {
                                visible: false
                            }
                        }],
                    width: '800',
                    title: 'Chart TS Title', loaded: loaded, legendSettings: { visible: false }
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                element1.remove();
            });
            it('Default Series Type without data Points', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0');
                    expect(svg.getAttribute('d') == '').toBe(true);
                    var xAxisLabelCollection = document.getElementById('containerAxisLabels0');
                    expect(xAxisLabelCollection.childNodes.length == 11).toBe(true);
                    var yAxisLabelCollection = document.getElementById('containerAxisLabels1');
                    expect(yAxisLabelCollection.childNodes.length == 7).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('With single data point', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0');
                    expect(svg.getAttribute('d') == '').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = [{
                        x: 1,
                        y: 10
                    }];
                chartObj.refresh();
            });
            it('Single data point with range', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0');
                    expect(svg.getAttribute('d') == '').toBe(true);
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
                    var seriesElements = document.getElementById('containerSeriesCollection').childNodes.length;
                    expect(seriesElements == 2).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryYAxis.minimum = null;
                chartObj.primaryYAxis.maximum = null;
                chartObj.primaryYAxis.interval = null;
                chartObj.primaryXAxis.minimum = null;
                chartObj.primaryXAxis.maximum = null;
                chartObj.primaryXAxis.interval = null;
                chartObj.series[0].visible = true;
                chartObj.series[0].dataSource = data;
                chartObj.refresh();
            });
            it('with range', function (done) {
                loaded = function (args) {
                    chartObj.primaryXAxis.minimum = null;
                    chartObj.primaryXAxis.maximum = null;
                    chartObj.primaryXAxis.interval = null;
                    var seriesElements = document.getElementById('container_Series_0');
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
                    var seriesElements = document.getElementById('container_Series_0');
                    var stroke = seriesElements.getAttribute('stroke-width');
                    expect(stroke == '2').toBe(true);
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
                chartObj.primaryXAxis.labelFormat = '';
                chartObj.refresh();
            });
            it('with dash array', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('container_Series_0');
                    var stroke = seriesElements.getAttribute('stroke-dasharray');
                    expect(stroke == '4').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dashArray = '4';
                chartObj.refresh();
            });
            it('with fill and stroke', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('container_Series_0');
                    expect(seriesElements.getAttribute('stroke') == 'red').toBe(true);
                    expect(seriesElements.getAttribute('stroke') != 'green').toBe(true);
                    expect(seriesElements.getAttribute('stroke-width') != '4').toBe(true);
                    expect(seriesElements.getAttribute('stroke-width') == '10').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dashArray = null;
                chartObj.series[0].fill = 'red';
                chartObj.series[0].border.color = 'green';
                chartObj.series[0].width = 10;
                chartObj.series[0].border.width = 4;
                chartObj.series[0].opacity = 0.6;
                chartObj.refresh();
            });
            it('Animation', function (done) {
                animate = function (args) {
                    var pathLength = args.series.pathElement.getTotalLength();
                    expect(pathLength >= 700).toBe(true);
                    done();
                };
                chartObj.series[0].animation.enable = true;
                chartObj.series[0].marker.visible = true;
                chartObj.animationComplete = animate;
                chartObj.refresh();
            });
        });
        describe('Line series with drag and drop support', function () {
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
                            type: 'Line',
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
                        {
                            type: 'Line',
                            dataSource: [
                                { x: new Date(2005, 0, 1), y: 28 }, { x: new Date(2006, 0, 1), y: 44 },
                                { x: new Date(2007, 0, 1), y: 48 }, { x: new Date(2008, 0, 1), y: 50 },
                                { x: new Date(2009, 0, 1), y: 66 }, { x: new Date(2010, 0, 1), y: 78 }, { x: new Date(2011, 0, 1), y: 84 }
                            ],
                            animation: { enable: false },
                            xName: 'x', width: 2, marker: {
                                visible: true,
                                width: 20,
                                height: 20
                            },
                            yName: 'y', name: 'England', dragSettings: { enable: true }
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
            it('line series drag and drop with marker true', function (done) {
                loaded = function () {
                    var target = document.getElementById('container_Series_1_Point_0_Symbol');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(target.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + element1.offsetTop;
                    x = parseFloat(target.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + element1.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    trigger.draganddropEvent(element1, Math.ceil(x), Math.ceil(y), Math.ceil(x), Math.ceil(y) - 108);
                    var yValue = chartObj.visibleSeries[1].points[0].yValue;
                    expect(yValue == 60.24 || yValue == 59.65).toBe(true);
                    chartObj.loaded = null;
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('line series drag and drop with minY value', function (done) {
                loaded = function () {
                    var target = document.getElementById('container_Series_0_Point_0_Symbol');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(target.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + element1.offsetTop;
                    x = parseFloat(target.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + element1.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    trigger.draganddropEvent(element1, Math.ceil(x), Math.ceil(y), Math.ceil(x), Math.ceil(y) + 2);
                    expect(chartObj.visibleSeries[0].yAxis.visibleRange.min < 21).toBe(true);
                    chartObj.loaded = null;
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryYAxis.minimum = null;
                chartObj.series[0].dragSettings.minY = -100;
                chartObj.series[1].visible = false;
                chartObj.refresh();
            });
            it('line series drag and drop with minY value null', function (done) {
                loaded = function () {
                    var target = document.getElementById('container_Series_0_Point_0_Symbol');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(target.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + element1.offsetTop;
                    x = parseFloat(target.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + element1.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    trigger.draganddropEvent(element1, Math.ceil(x), Math.ceil(y), Math.ceil(x), Math.ceil(y) + 2);
                    expect(chartObj.visibleSeries[0].yAxis.visibleRange.min < 21).toBe(true);
                    chartObj.loaded = null;
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryYAxis.minimum = null;
                chartObj.series[0].dragSettings.minY = null;
                chartObj.series[1].visible = false;
                chartObj.refresh();
            });
        });
        describe('Area series with drag and drop support', function () {
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
                            type: 'Area',
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
            it('area series drag and drop with marker true', function (done) {
                loaded = function () {
                    var target = document.getElementById('container_Series_0_Point_3_Symbol');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(target.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + element1.offsetTop;
                    x = parseFloat(target.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + element1.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    trigger.draganddropEvent(element1, Math.ceil(x), Math.ceil(y), Math.ceil(x), Math.ceil(y) - 142);
                    var yValue = chartObj.visibleSeries[0].points[3].yValue;
                    expect(yValue == 80.27 || yValue == 79.68).toBe(true);
                    chartObj.loaded = null;
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('area series drag and drop with isTransposed true', function (done) {
                loaded = function () {
                    var target = document.getElementById('container_Series_0_Point_3_Symbol');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(target.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + element1.offsetTop;
                    x = parseFloat(target.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + element1.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    trigger.draganddropEvent(element1, Math.ceil(x), Math.ceil(y), Math.ceil(x) + 100, Math.ceil(y));
                    var yValue = chartObj.visibleSeries[0].points[3].yValue;
                    expect(yValue == 52.39 || yValue == 52.13).toBe(true);
                    chartObj.loaded = null;
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.isTransposed = true;
                chartObj.refresh();
            });
        });
        describe('Area Series', function () {
            var chartObj;
            var loaded;
            var element1 = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(element1);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis', labelFormat: 'C' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal' },
                    series: [{
                            animation: { enable: false },
                            name: 'ChartSeriesNameGold',
                            fill: 'rgba(135,206,235,1)',
                            type: 'Area',
                            xName: 'x',
                            yName: 'y',
                            marker: {
                                visible: false
                            }
                        }],
                    width: '800',
                    title: 'Chart TS Title', loaded: loaded, legendSettings: { visible: false }
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                element1.remove();
            });
            it('Default Series Type without data Points', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0');
                    expect(svg.getAttribute('d') == '').toBe(true);
                    var xAxisLabelCollection = document.getElementById('containerAxisLabels0');
                    expect(xAxisLabelCollection.childNodes.length == 11).toBe(true);
                    var yAxisLabelCollection = document.getElementById('containerAxisLabels1');
                    expect(yAxisLabelCollection.childNodes.length == 7).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('With single data point', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0');
                    expect(svg.getAttribute('d') == '').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = [{
                        x: 1,
                        y: 10
                    }];
                chartObj.refresh();
            });
            it('Single data point with range', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0');
                    expect(svg.getAttribute('d') == '').toBe(true);
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
            it('Out Of range', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0');
                    expect(svg.getAttribute('d') == '').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.minimum = 20;
                chartObj.primaryXAxis.maximum = 22;
                chartObj.primaryXAxis.interval = 1;
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
                chartObj.refresh();
            });
            it('with data source', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('containerSeriesCollection').childNodes.length;
                    expect(seriesElements == 2).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryYAxis.minimum = null;
                chartObj.primaryYAxis.maximum = null;
                chartObj.primaryYAxis.interval = null;
                chartObj.primaryXAxis.minimum = null;
                chartObj.primaryXAxis.maximum = null;
                chartObj.primaryXAxis.interval = null;
                chartObj.series[0].visible = true;
                chartObj.series[0].dataSource = data;
                chartObj.refresh();
            });
            it('with range', function (done) {
                loaded = function (args) {
                    chartObj.primaryXAxis.minimum = null;
                    chartObj.primaryXAxis.maximum = null;
                    chartObj.primaryXAxis.interval = null;
                    var seriesElements = document.getElementById('container_Series_0');
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
                    var seriesElements = document.getElementById('container_Series_0');
                    var stroke = seriesElements.getAttribute('stroke-width');
                    expect(stroke == '0').toBe(true);
                    var labelElement = document.getElementById('container0_AxisLabel_3');
                    expect(labelElement.textContent == '2003').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = [{ x: new Date(2000, 6, 11), y: 10 }, { x: new Date(2002, 3, 7), y: 30 },
                    { x: new Date(2004, 3, 6), y: 15 }, { x: new Date(2006, 3, 30), y: null },
                    { x: new Date(2008, 3, 8), y: 90 }, { x: new Date(2010, 3, 8), y: 85 }
                ];
                chartObj.series[0].width = 2;
                chartObj.primaryXAxis.valueType = 'DateTime';
                chartObj.primaryXAxis.labelFormat = '';
                chartObj.refresh();
            });
            it('with dash array', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('container_Series_0');
                    var stroke = seriesElements.getAttribute('stroke-dasharray');
                    expect(stroke == '4').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dashArray = '4';
                chartObj.refresh();
            });
            it('with fill and stroke', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('container_Series_0');
                    expect(seriesElements.getAttribute('stroke') == 'green').toBe(true);
                    expect(seriesElements.getAttribute('stroke') != 'red').toBe(true);
                    expect(seriesElements.getAttribute('stroke-width') != '10').toBe(true);
                    expect(seriesElements.getAttribute('stroke-width') == '4').toBe(true);
                    expect(seriesElements.getAttribute('opacity') == '0.6').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = data;
                chartObj.series[0].dashArray = null;
                chartObj.series[0].fill = 'red';
                chartObj.series[0].border.color = 'green';
                chartObj.series[0].width = 10;
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.series[0].border.width = 4;
                chartObj.series[0].opacity = 0.6;
                chartObj.refresh();
            });
            it('Checking with null Points', function (done) {
                loaded = function (args) {
                    var path = document.getElementById('container_Series_0');
                    var id = path.getAttribute('d');
                    var check = id.lastIndexOf('M');
                    expect(check !== 0).toBe(true);
                    chartObj.destroy();
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource[3].y = null;
                chartObj.series[0].marker.visible = true;
                chartObj.refresh();
            });
        });
        describe('Line Series - Data Label', function () {
            var chartObj;
            var loaded;
            var element;
            element = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(element);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { valueType: 'DateTime' },
                    primaryYAxis: { rangePadding: 'None' },
                    series: [{
                            animation: { enable: false },
                            xName: 'x', yName: 'y',
                            name: 'India', fill: '#E94649',
                            marker: { visible: false, dataLabel: { visible: false } }
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
            it('With single data point', function (done) {
                loaded = function (args) {
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = [{ x: new Date(2000, 6, 11), y: 10 }, { x: new Date(2002, 3, 7), y: 30 },
                    { x: new Date(2004, 3, 6), y: 15 }, { x: new Date(2006, 3, 30), y: 65 },
                    { x: new Date(2008, 3, 8), y: 90 }, { x: new Date(2010, 3, 8), y: 85 }];
                chartObj.refresh();
            });
            it('Showing default data label', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_3_Text_0');
                    expect(element.textContent == '65').toBe(true);
                    expect(document.getElementById('containerShapeGroup0').childNodes.length == 0).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.visible = true;
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
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.visible = false;
                chartObj.refresh();
            });
            it('with marker visibility', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_3_Text_0');
                    expect(element != null).toBe(true);
                    var marker = +document.getElementById('container_Series_0_Point_3_Symbol').getAttribute('cy');
                    var label = +document.getElementById('container_Series_0_Point_3_Text_0').getAttribute('y');
                    expect(marker > label).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.visible = true;
                chartObj.series[0].marker.width = 10;
                chartObj.series[0].marker.height = 10;
                chartObj.series[0].marker.dataLabel.visible = true;
                chartObj.refresh();
            });
            it('with marker size without marker visibility', function (done) {
                loaded = function (args) {
                    var marker = document.getElementById('container_Series_0_Point_3_Symbol');
                    expect(marker == null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.visible = false;
                chartObj.series[0].marker.width = 10;
                chartObj.series[0].marker.height = 10;
                chartObj.series[0].marker.dataLabel.visible = true;
                chartObj.refresh();
            });
            it('Checking edge dataLabel', function (done) {
                loaded = function (args) {
                    var marker = document.getElementById('container_Series_0_Point_5_Text_0');
                    var location = (+marker.getAttribute('x')) + (+marker.getAttribute('width'));
                    var clipRectWidth = 757.5;
                    expect(location <= clipRectWidth).toBe(true);
                    marker = document.getElementById('container_Series_0_Point_0_Text_0');
                    expect(+marker.getAttribute('x') > 0).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking auto position', function (done) {
                loaded = function (args) {
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
                chartObj.refresh();
            });
            it('Adding another series', function (done) {
                loaded = function (args) {
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series = [chartObj.series[0], {
                        name: 'series1', type: 'Line', fill: '#ACE5FF', width: 3,
                        animation: { enable: false },
                        dataSource: [
                            { x: new Date(2000, 6, 11), y: 45 },
                            { x: new Date(2002, 3, 7), y: 40 },
                            { x: new Date(2004, 3, 6), y: 45 },
                            { x: new Date(2006, 3, 30), y: 40 },
                            { x: new Date(2008, 3, 8), y: 45 },
                            { x: new Date(2010, 3, 8), y: 20 }
                        ], xName: 'x', yName: 'y',
                        marker: {
                            dataLabel: {
                                visible: true
                            }
                        }
                    }];
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
                    expect(point2 < point2Location).toBe(true);
                    expect(point3 > point3Location).toBe(true);
                    expect(point4 < point4Location).toBe(true);
                    expect(point5 > point5Location).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
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
            it('Checking dataLabel positions Bottom', function (done) {
                loaded = function (args) {
                    var hiddenShape = document.getElementById('container_Series_1_Point_1_TextShape_0');
                    var hiddenText = document.getElementById('container_Series_1_Point_1_Text_0');
                    expect(hiddenText == null).toBe(true);
                    expect(hiddenShape == null).toBe(true);
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
                    expect(chartObj.series[1].points[2].symbolLocations[0].y > element1).toBe(true);
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
                    expect(locationY == (element - (height / 4))).toBe(true);
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
            it('Checking Data label format', function (done) {
                loaded = function (args) {
                    var marker = document.getElementById('container_Series_0_Point_3_Text_0');
                    expect(marker.textContent == 'This is 65').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryYAxis.labelFormat = 'This is {value}';
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
            it('Checking Datalabel alignment with position auto - alignment near', function (done) {
                var svg;
                loaded = function (args) {
                    svg = +document.getElementById('container_Series_0_Point_4_TextShape_0').getAttribute('y');
                    expect(svg > chartObj.series[0].points[4].symbolLocations[0].y).toBe(true);
                    done();
                };
                svg = +document.getElementById('container_Series_0_Point_4_TextShape_0').getAttribute('y');
                expect(svg > chartObj.series[0].points[4].symbolLocations[0].y).toBe(true);
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.alignment = 'Near';
                chartObj.refresh();
            });
            it('Checking Datalabel alignment with position auto - alignment far', function (done) {
                var svg;
                loaded = function (args) {
                    svg = +document.getElementById('container_Series_0_Point_4_TextShape_0').getAttribute('y');
                    expect(svg > chartObj.series[0].points[4].symbolLocations[0].y).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.alignment = 'Far';
                chartObj.refresh();
            });
            it('Checking Data label alignment except Auto position in Bottom Position - near', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_1_Point_1_TextShape_0');
                    expect(svg == null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.position = 'Bottom';
                chartObj.series[1].marker.dataLabel.alignment = 'Near';
                chartObj.series[1].marker.visible = false;
                chartObj.refresh();
            });
            it('Checking Data label alignment except Auto position in Bottom Position - far', function (done) {
                loaded = function (args) {
                    var hiddenShape = document.getElementById('container_Series_1_Point_1_TextShape_0');
                    expect(hiddenShape != null).toBe(true);
                    var elementY = +document.getElementById('container_Series_1_Point_2_TextShape_0').getAttribute('y');
                    var elementHeight = +document.getElementById('container_Series_1_Point_2_TextShape_0').getAttribute('height');
                    var symbolLocation = chartObj.series[1].points[2].symbolLocations[0].y;
                    expect(elementY < (symbolLocation + elementHeight)).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.alignment = 'Far';
                chartObj.refresh();
            });
            it('Checking Data label alignment except Auto position in Bottom Position - center', function (done) {
                loaded = function (args) {
                    var hiddenShape = document.getElementById('container_Series_1_Point_1_TextShape_0');
                    expect(hiddenShape == null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.alignment = 'Center';
                chartObj.refresh();
            });
            it('Checking Datalabel alignment except Auto position in Outer Position - near', function (done) {
                loaded = function (args) {
                    var hiddenShape = document.getElementById('container_Series_1_Point_1_TextShape_0');
                    expect(hiddenShape == null).toBe(true);
                    var elementY = +document.getElementById('container_Series_1_Point_2_TextShape_0').getAttribute('y');
                    var symbolLocation = chartObj.series[1].points[2].symbolLocations[0].y;
                    elementY = +document.getElementById('container_Series_1_Point_2_TextShape_0').getAttribute('y');
                    symbolLocation = chartObj.series[1].points[2].symbolLocations[0].y;
                    var elementHeight = +document.getElementById('container_Series_1_Point_2_TextShape_0').getAttribute('height');
                    expect(elementY > (symbolLocation - elementHeight - elementHeight)).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.position = 'Outer';
                chartObj.series[1].marker.dataLabel.alignment = 'Near';
                chartObj.refresh();
            });
            it('Checking Datalabel alignment except Auto position in Outer Position - far', function (done) {
                loaded = function (args) {
                    var hiddenShape = document.getElementById('container_Series_1_Point_1_TextShape_0');
                    expect(hiddenShape != null).toBe(true);
                    var elementY = +document.getElementById('container_Series_1_Point_2_TextShape_0').getAttribute('y');
                    var symbolLocation = chartObj.series[1].points[2].symbolLocations[0].y;
                    expect(elementY < (symbolLocation)).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.alignment = 'Far';
                chartObj.refresh();
            });
            it('Checking Datalabel alignment except Auto position in Outer Position - middle', function (done) {
                loaded = function (args) {
                    var hiddenShape = document.getElementById('container_Series_1_Point_1_TextShape_0');
                    expect(hiddenShape != null).toBe(true);
                    var elementY = +document.getElementById('container_Series_1_Point_2_TextShape_0').getAttribute('y');
                    var symbolLocation = chartObj.series[1].points[2].symbolLocations[0].y;
                    expect(elementY < (symbolLocation)).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.alignment = 'Center';
                chartObj.refresh();
            });
            it('Checking Data label alignment except Auto position in Top Position', function (done) {
                loaded = function (args) {
                    var hiddenShape = document.getElementById('container_Series_1_Point_1_TextShape_0');
                    expect(hiddenShape == null).toBe(true);
                    var elementY = +document.getElementById('container_Series_1_Point_2_TextShape_0').getAttribute('y');
                    var symbolLocation = chartObj.series[1].points[2].symbolLocations[0].y;
                    expect(elementY > (symbolLocation)).toBe(true);
                    elementY = +document.getElementById('container_Series_1_Point_2_TextShape_0').getAttribute('y');
                    symbolLocation = chartObj.series[1].points[2].symbolLocations[0].y;
                    var elementHeight = +document.getElementById('container_Series_1_Point_2_TextShape_0').getAttribute('height');
                    expect(elementY > (symbolLocation - elementHeight - elementHeight)).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.position = 'Top';
                chartObj.series[1].marker.dataLabel.alignment = 'Near';
                chartObj.refresh();
            });
            it('Checking Data label alignment except Auto position in Middle Position - near', function (done) {
                loaded = function (args) {
                    var elementY = +document.getElementById('container_Series_1_Point_2_TextShape_0').getAttribute('y');
                    var symbolLocation = chartObj.series[1].points[2].symbolLocations[0].y;
                    expect(elementY > (symbolLocation)).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.position = 'Middle';
                chartObj.series[1].marker.dataLabel.alignment = 'Near';
                chartObj.refresh();
            });
            it('Checking Data label alignment except Auto position in Middle Position - far', function (done) {
                loaded = function (args) {
                    var elementY = +document.getElementById('container_Series_1_Point_2_TextShape_0').getAttribute('y');
                    var symbolLocation = chartObj.series[1].points[2].symbolLocations[0].y;
                    expect(elementY < (symbolLocation)).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.alignment = 'Far';
                chartObj.refresh();
            });
            it('Checking Data label alignment except Auto position in Middle Position - center', function (done) {
                loaded = function (args) {
                    var elementY = +document.getElementById('container_Series_1_Point_2_Text_0').getAttribute('y');
                    var symbolLocation = chartObj.series[1].points[2].symbolLocations[0].y;
                    var height = document.getElementById('container_Series_1_Point_2_Text_0').getBoundingClientRect().height;
                    expect((elementY - (height / 4)) == (symbolLocation)).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.alignment = 'Center';
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
                loaded = function (args) {
                    expect(document.getElementById('containerShapeGroup2').childNodes.length == 3).toBe(true);
                    expect(document.getElementById('container_Series_2_Point_0_TextShape_0') == null).toBe(true);
                    expect(document.getElementById('container_Series_2_Point_2_TextShape_0') == null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.margin = {
                    left: 5,
                    right: 5,
                    top: 5,
                    bottom: 5
                };
                chartObj.series = [chartObj.series[0], chartObj.series[1], {
                        name: 'series1', type: 'Line', fill: 'violet', width: 4,
                        animation: { enable: false },
                        dataSource: [
                            { x: new Date(2000, 6, 11), y: 45 },
                            { x: new Date(2002, 3, 7), y: 60 },
                            { x: new Date(2004, 3, 6), y: 45 },
                            { x: new Date(2006, 3, 30), y: 60 },
                            { x: new Date(2008, 3, 8), y: 40 },
                            { x: new Date(2010, 3, 8), y: 85 }
                        ],
                        xName: 'x', yName: 'y',
                        marker: { dataLabel: { visible: true, fill: 'black', opacity: 0.6 } }
                    }];
                chartObj.refresh();
            });
            it('Changing series Type', function (done) {
                loaded = function (args) {
                    expect(document.getElementById('containerShapeGroup2').childNodes.length == 6).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[2].type = 'Column';
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
            it('checking auto position for scope', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0_Point_4_Text_0');
                    expect(svg == null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                var series0 = [{ x: new Date(2000, 6, 11), y: 10 }, { x: new Date(2002, 3, 7), y: 30 },
                    { x: new Date(2004, 3, 6), y: 15 }, { x: new Date(2006, 3, 30), y: 65 },
                    { x: new Date(2008, 3, 8), y: 90 }, { x: new Date(2010, 3, 8), y: 85 }
                ];
                var series1 = [
                    { x: new Date(2000, 6, 11), y: 45 },
                    { x: new Date(2002, 3, 7), y: 40 },
                    { x: new Date(2004, 3, 6), y: 45 },
                    { x: new Date(2006, 3, 30), y: 40 },
                    { x: new Date(2008, 3, 8), y: 45 },
                    { x: new Date(2010, 3, 8), y: 20 }
                ];
                var series2 = [
                    { x: new Date(2000, 6, 11), y: 45 },
                    { x: new Date(2002, 3, 7), y: 60 },
                    { x: new Date(2004, 3, 6), y: 45 },
                    { x: new Date(2006, 3, 30), y: 60 },
                    { x: new Date(2008, 3, 8), y: 40 },
                    { x: new Date(2010, 3, 8), y: 85 }
                ];
                chartObj.series[1].marker.dataLabel.position = 'Auto';
                chartObj.series[2].marker.dataLabel.position = 'Auto';
                chartObj.series[0].marker.dataLabel.position = 'Auto';
                chartObj.series[0].type = 'Line';
                chartObj.series[1].type = 'Line';
                chartObj.series[2].type = 'Line';
                series1[1].y = null;
                series1[4].y = null;
                series0[4].y = null;
                series0[3].y = null;
                series0[1].y = null;
                series2[4].y = null;
                chartObj.series[0].dataSource = series0;
                chartObj.series[1].dataSource = series1;
                chartObj.series[2].dataSource = series2;
                chartObj.primaryYAxis.minimum = 0;
                chartObj.primaryYAxis.maximum = 97;
                chartObj.primaryYAxis.interval = 44;
                chartObj.refresh();
            });
            it('checking auto position for scope - top', function (done) {
                var series0 = [{ x: new Date(2000, 6, 11), y: 10 }, { x: new Date(2002, 3, 7), y: 30 },
                    { x: new Date(2004, 3, 6), y: 15 }, { x: new Date(2006, 3, 30), y: 65 },
                    { x: new Date(2008, 3, 8), y: 90 }, { x: new Date(2010, 3, 8), y: 85 }
                ];
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0_Point_4_Text_0');
                    expect(svg != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                series0[4].y = 45;
                chartObj.series[0].dataSource = series0;
                chartObj.series[0].marker.dataLabel.position = 'Top';
                chartObj.refresh();
            });
            it('checking dataLabel Top edge', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0_Point_3_Text_0');
                    expect(svg != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryYAxis.minimum = 25;
                chartObj.primaryYAxis.maximum = 50;
                chartObj.primaryYAxis.interval = 5;
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.series = [{
                        animation: { enable: false },
                        dataSource: [{
                                x: 2005,
                                y: 30
                            }, {
                                x: 2006,
                                y: 40
                            }, {
                                x: 2007,
                                y: 40
                            }, {
                                x: 2008,
                                y: 48
                            }, {
                                x: 2009,
                                y: 25
                            }, {
                                x: 2010,
                                y: 39
                            }],
                        xName: 'x', yName: 'y',
                        name: 'India',
                        fill: '#E94649',
                        marker: {
                            visible: false,
                            dataLabel: {
                                visible: true,
                                position: 'Top',
                                fill: ''
                            }
                        }
                    }];
                chartObj.refresh();
            });
            it('checking stepline Top edge', function (done) {
                loaded = function (args) {
                    var element = +document.getElementById('container_Series_0_Point_0_Text_0').getAttribute('y');
                    var location = chartObj.series[0].points[0].symbolLocations[0].y;
                    expect(element < location).toBe(true);
                    element = +document.getElementById('container_Series_0_Point_1_Text_0').getAttribute('y');
                    location = chartObj.series[0].points[1].symbolLocations[0].y;
                    expect(element < location).toBe(true);
                    element = +document.getElementById('container_Series_0_Point_2_Text_0').getAttribute('y');
                    location = chartObj.series[0].points[2].symbolLocations[0].y;
                    expect(element < location).toBe(true);
                    element = +document.getElementById('container_Series_0_Point_3_Text_0').getAttribute('y');
                    location = chartObj.series[0].points[3].symbolLocations[0].y;
                    expect(element > location).toBe(true);
                    element = +document.getElementById('container_Series_0_Point_4_Text_0').getAttribute('y');
                    location = chartObj.series[0].points[4].symbolLocations[0].y;
                    expect(element > location).toBe(true);
                    element = +document.getElementById('container_Series_0_Point_5_Text_0').getAttribute('y');
                    location = chartObj.series[0].points[5].symbolLocations[0].y;
                    expect(element < location).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryYAxis.minimum = 0;
                chartObj.primaryYAxis.maximum = 50;
                chartObj.primaryYAxis.interval = 5;
                chartObj.primaryXAxis.minimum = 2004;
                chartObj.primaryXAxis.maximum = 2014;
                chartObj.primaryXAxis.interval = 2;
                chartObj.series[0].type = 'StepLine';
                chartObj.series[0].marker.dataLabel.position = 'Auto';
                chartObj.refresh();
            });
        });
        describe('Data Label with Event checking', function () {
            var chart;
            var loaded;
            var text;
            var element;
            beforeAll(function () {
                element = ej2_base_1.createElement('div', { id: 'datalabelcontainer' });
                document.body.appendChild(element);
                chart = new chart_1.Chart({
                    primaryXAxis: {
                        title: 'PrimaryXAxis',
                        lineStyle: { width: 2 },
                        valueType: 'DateTime'
                    },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'None' },
                    series: [
                        {
                            name: 'series1', type: 'Line', fill: '#663AB6', width: 1,
                            marker: { visible: true, dataLabel: { visible: true, fill: 'transparent' } },
                            animation: { enable: false }, dataSource: [
                                { x: new Date(2000, 6, 11), y: 10 }, { x: new Date(2002, 3, 7), y: 30 },
                                { x: new Date(2004, 3, 6), y: -15 }, { x: new Date(2006, 3, -30), y: -65 },
                                { x: new Date(2007, 3, 8), y: 90 }, { x: new Date(2008, 3, 8), y: 85 }
                            ],
                            xName: 'x',
                            yName: 'y'
                        }
                    ], title: 'Chart TS Title'
                });
                chart.appendTo('#datalabelcontainer');
            });
            afterAll(function () {
                chart.destroy();
                element.remove();
            });
            it('checking text render event', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('datalabelcontainer_Series_0_Point_4_TextShape_0');
                    expect(document.getElementById('datalabelcontainer_Series_0_Point_3_TextShape_0') == null).toBe(true);
                    expect(element != null).toBe(true);
                    expect(element.getAttribute('fill') == 'transparent').toBe(true);
                    expect(document.getElementById('datalabelcontainer_Series_0_Point_5_TextShape_0') == null).toBe(true);
                    element = document.getElementById('datalabelcontainer_Series_0_Point_5_Text_0');
                    expect(element.getAttribute('fill') == 'black').toBe(true);
                    element = document.getElementById('datalabelcontainer_Series_0_Point_4_Text_0');
                    expect(element.getAttribute('fill') == 'black').toBe(true);
                    element = document.getElementById('datalabelcontainer_Series_0_Point_2_TextShape_0');
                    expect(element.getAttribute('fill') == 'red').toBe(true);
                    element = document.getElementById('datalabelcontainer_Series_0_Point_2_Text_0');
                    expect(element.getAttribute('fill') == 'white').toBe(true);
                    element = document.getElementById('datalabelcontainer_Series_0_Point_3_Text_0');
                    expect(element.getAttribute('fill') == 'black').toBe(true);
                    element = document.getElementById('datalabelcontainer_Series_0_Point_5_Text_0');
                    expect(element.textContent == '5th').toBe(true);
                    done();
                };
                text = function (args) {
                    if (args.point.index == 4) {
                        args.border.color = 'green';
                        args.border.width = 2;
                    }
                    if (args.point.index == 2) {
                        args.color = 'red';
                        args.border.color = 'green';
                        args.border.width = 2;
                    }
                    if (args.point.index == 5) {
                        args.text = '5th';
                    }
                };
                chart.loaded = loaded;
                chart.textRender = text;
                chart.refresh();
            });
            it('checking top corner text color', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('datalabelcontainer_Series_0_Point_0_Text_0');
                    expect(element.getAttribute('fill') == 'black').toBe(true);
                    element = document.getElementById('datalabelcontainer_Series_0_Point_1_Text_0');
                    expect(element.getAttribute('fill') == 'white').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.textRender = null;
                chart.series[0].type = 'Column';
                chart.series[0].fill = 'black';
                chart.series[0].marker.visible = false;
                chart.series[0].marker.dataLabel.position = 'Top';
                chart.primaryYAxis.minimum = 9;
                chart.primaryYAxis.maximum = 75;
                chart.refresh();
            });
        });
        describe('Area Series Inversed axis', function () {
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
                            name: 'ChartSeriesNameGold', dataSource: data_spec_2.seriesData1, xName: 'x', yName: 'y',
                            type: 'Area', marker: { visible: false, dataLabel: { visible: true, fill: 'violet' } }
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
        describe('checking rotated area chart', function () {
            var chart;
            var loaded;
            var element = ej2_base_1.createElement('div', { id: 'container' });
            var dataLabel;
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
                chart = new chart_1.Chart({
                    primaryXAxis: { title: 'primaryXAxis', valueType: 'DateTime' },
                    primaryYAxis: { title: 'PrimaryYAxis' },
                    series: [
                        { type: 'Area', name: 'area', dataSource: data_spec_1.rotateData1, xName: 'x', yName: 'y', animation: { enable: false },
                            marker: { visible: true } },
                        { type: 'Area', name: 'area', dataSource: data_spec_1.rotateData2, xName: 'x', yName: 'y', animation: { enable: false },
                            marker: { visible: true } }
                    ],
                    title: 'rotated area Chart'
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
            it('checking animation', function (done) {
                animationComplete = function (args) {
                    done();
                };
                chart.series[0].animation.enable = true;
                chart.series[1].animation.enable = true;
                chart.animationComplete = animationComplete;
                chart.refresh();
            });
        });
        describe('Line Series - Data Label with rotation', function () {
            var chartObj;
            var loaded;
            var series1 = [
                { x: "Jan", y: 54.481, text: "54.48%" },
                { x: "Feb", y: 50.56382, text: "50.56%" },
                { x: "Mar", y: 53.68715, text: "53.69%" },
                { x: "Apr", y: 49.143363, text: "49.14%" },
                { x: "May", y: 57.423575, text: "57.42%" },
                { x: "Jun", y: 55.959774, text: "55.96%" },
                { x: "Jul", y: 52.360737, text: "52.36%" },
                { x: "Aug", y: 56.654956, text: "56.65%" },
                { x: "Sep", y: 51.387971, text: "51.39%" },
                { x: "Oct", y: 53.137774, text: "53.14%" },
                { x: "Nov", y: 54.889794, text: "54.89%" },
                { x: "Dec", y: 56.760399, text: "56.76%" }
            ];
            var chartContainerDiv;
            chartContainerDiv = ej2_base_1.createElement('div', { id: 'container', styles: 'height:250px;width:590px;float: left;' });
            beforeAll(function () {
                document.body.appendChild(chartContainerDiv);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { valueType: 'Category' },
                    series: [
                        {
                            dataSource: series1, xName: 'x', yName: 'y', type: 'Line', fill: 'red',
                            animation: { enable: false }, name: 'series1', legendShape: 'Circle',
                            marker: {
                                visible: true,
                                dataLabel: {
                                    angle: 45,
                                    enableRotation: true,
                                    visible: true,
                                    position: 'Outer',
                                    font: { color: 'red', size: '12px' }
                                }
                            }
                        }
                    ],
                    legendSettings: {
                        visible: true, position: 'Bottom'
                    },
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                chartContainerDiv.remove();
            });
            it('Datalabel count check', function (done) {
                chartObj.loaded = function (args) {
                    var groupElement = document.getElementById('containerTextGroup0');
                    expect(groupElement.childElementCount === 9).toBe(true);
                    done();
                };
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
