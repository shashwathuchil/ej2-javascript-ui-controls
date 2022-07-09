define(["require", "exports", "@syncfusion/ej2-base", "../../common.spec", "../../../src/chart/index", "../base/data.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, common_spec_1, index_1, data_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    index_1.Chart.Inject(index_1.LineSeries, index_1.DateTime, index_1.BarSeries, index_1.DateTimeCategory, index_1.ColumnSeries, index_1.ChartAnnotation, index_1.StripLine);
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
        describe('Datetime category Axis', function () {
            var chart;
            var axisLine;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(ele);
                chart = new index_1.Chart({
                    primaryXAxis: {
                        title: 'Sales Across Years', intervalType: 'Years', valueType: 'DateTimeCategory',
                    },
                    primaryYAxis: { title: 'Sales Amount in millions(USD)', rangePadding: 'Round' },
                    series: [
                        {
                            name: 'series1', type: 'Line', fill: '#ACE5FF', width: 2, animation: { enable: false },
                            dataSource: data_spec_1.datetimeData, xName: 'x', yName: 'y', marker: { visible: true },
                        },
                    ],
                    height: '600', width: '900', legendSettings: { visible: false }
                });
            });
            afterAll(function () {
                chart.destroy();
                ele.remove();
            });
            it('Checking axis label length', function (done) {
                loaded = function (args) {
                    var series0 = chart.series[0];
                    svg = document.getElementById('containerAxisLabels0');
                    expect(svg.childElementCount).toEqual(series0.points.length);
                    done();
                };
                chart.loaded = loaded;
                chart.appendTo('#container');
            });
            it('Checking month label', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container0_AxisLabel_0');
                    expect(svg.innerHTML).toEqual('Jul 11');
                    done();
                };
                chart.loaded = loaded;
                chart.primaryXAxis.intervalType = 'Months';
                chart.refresh();
            });
            it('Checking Auto interval with hours', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('containerAxisLabels0');
                    expect(svg.childNodes.length == 2).toBe(true);
                    expect(svg.childNodes[0].textContent == 'Fri 00:00').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.primaryXAxis.intervalType = 'Auto';
                chart.series = [{
                        fill: '#ACE5FF', width: 2, animation: { enable: false }, xName: 'x', yName: 'y', marker: { visible: true },
                        dataSource: [{ x: new Date(2000, 3, 21), y: 10 }, { x: new Date(2000, 3, 22), y: 40 }]
                    }];
                chart.height = '450';
                chart.refresh();
            });
            it('Checking Auto interval with minutes', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('containerAxisLabels0');
                    expect(svg.childNodes.length).toEqual(2);
                    expect(svg.childNodes[0].textContent == '03:00:00').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].dataSource = [{ x: new Date(2000, 3, 21, 3), y: 50 }, { x: new Date(2000, 3, 21, 4), y: 10 }];
                chart.refresh();
            });
            it('Checking interval with Hours', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('containerAxisLabels0');
                    expect(svg.childNodes.length).toEqual(2);
                    expect(svg.childNodes[0].textContent == 'Fri 03:00').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.primaryXAxis.intervalType = 'Hours';
                chart.series[0].dataSource = [{ x: new Date(2000, 3, 21, 3), y: 50 }, { x: new Date(2000, 3, 21, 4), y: 10 }];
                chart.refresh();
            });
            it('Checking Auto interval with seconds', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('containerAxisLabels0');
                    expect(svg.childNodes.length).toEqual(2);
                    expect(svg.childNodes[0].textContent == '03:10:10').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.primaryXAxis.intervalType = 'Auto';
                chart.series[0].dataSource = [{ x: new Date(2000, 3, 21, 3, 10, 10), y: 50 }, { x: new Date(2000, 3, 21, 4, 10, 10), y: 10 }];
                chart.refresh();
            });
            it('Checking labels for years', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('containerAxisLabels0');
                    expect(svg.childNodes.length).toEqual(3);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].dataSource = data_spec_1.datetimeCategoryYearData1;
                chart.primaryXAxis.intervalType = 'Years';
                chart.refresh();
            });
            it('Checking multiple series', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('containerAxisLabels0');
                    expect(svg.childNodes.length).toEqual(4);
                    done();
                };
                chart.loaded = loaded;
                chart.series = [
                    {
                        animation: { enable: false }, dataSource: data_spec_1.datetimeCategoryYearData, xName: 'x', yName: 'y', marker: { visible: true },
                    },
                    {
                        animation: { enable: false }, dataSource: data_spec_1.datetimeCategoryYearData1, xName: 'x', yName: 'y', marker: { visible: true },
                    },
                ];
                chart.primaryXAxis.intervalType = 'Years';
                chart.refresh();
            });
            it('Checking with column series', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('containerAxisLabels0');
                    expect(svg.childNodes.length).toEqual(4);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].type = 'Column';
                chart.series[1].type = 'Column';
                chart.refresh();
            });
            it('Checking with column series opposed position', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_ChartAreaBorder');
                    axisLine = document.getElementById('containerAxisLine_0');
                    expect(+svg.getAttribute('x')).toEqual(+axisLine.getAttribute('d').split(' ')[1]);
                    done();
                };
                chart.loaded = loaded;
                chart.primaryXAxis.opposedPosition = true;
                chart.series[0].type = 'Column';
                chart.series[1].type = 'Column';
                chart.refresh();
            });
            it('Checking with bar series', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('containerAxisLabels0');
                    expect(svg.childNodes.length).toEqual(4);
                    done();
                };
                chart.loaded = loaded;
                chart.primaryXAxis.opposedPosition = false;
                chart.series[0].type = 'Bar';
                chart.series[1].type = 'Bar';
                chart.refresh();
            });
            it('Checking with bar series with opposed postion', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_ChartAreaBorder');
                    axisLine = document.getElementById('containerAxisLine_0');
                    expect(+svg.getAttribute('y')).toEqual(+axisLine.getAttribute('d').split(' ')[2]);
                    done();
                };
                chart.loaded = loaded;
                chart.primaryXAxis.opposedPosition = true;
                chart.refresh();
            });
            it('Checking intervalType as Days', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('containerAxisLabels0');
                    expect(svg.childNodes.length).toEqual(6);
                    expect(svg.childNodes[0].textContent).toEqual('4/17/2000');
                    done();
                };
                chart.loaded = loaded;
                chart.primaryXAxis.intervalType = 'Days';
                chart.refresh();
            });
            it('Checking with dateTime axis on ticks', function () {
                chart.primaryXAxis.labelPlacement = 'OnTicks';
                chart.dataBind();
                var svg = document.getElementById('containerAxisLabels0').childNodes[0];
                axisLine = document.getElementById('containerAxisLine_0');
                expect(+svg.getAttribute('x') > (+axisLine.getAttribute('x1'))).toBe(true);
            });
            it('checking with  vertical axis edge label placement', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_ChartAreaBorder');
                    var label1 = document.getElementById('containerAxisLabels0').childNodes[0];
                    var label2 = document.getElementById('containerAxisLabels0').childNodes[5];
                    expect(+label1.getAttribute('y')).toEqual(+svg.getAttribute('y') + +svg.getAttribute('height'));
                    done();
                };
                chart.loaded = loaded;
                chart.primaryXAxis.edgeLabelPlacement = 'Shift';
                chart.primaryXAxis.opposedPosition = false;
                chart.refresh();
            });
            it('checking with  horizontal axis edge label placement', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_ChartAreaBorder');
                    var label1 = document.getElementById('containerAxisLabels0').childNodes[0];
                    var label2 = document.getElementById('containerAxisLabels0').childNodes[5];
                    expect(+label1.getAttribute('x')).toEqual(+svg.getAttribute('x'));
                    done();
                };
                chart.loaded = loaded;
                chart.primaryXAxis.edgeLabelPlacement = 'Shift';
                chart.series[0].type = 'Line';
                chart.series[1].type = 'Column';
                chart.refresh();
            });
            it('checking with label formats custom', function (done) {
                loaded = function (args) {
                    var label1 = document.getElementById('containerAxisLabels0').childNodes[0];
                    expect(label1.innerHTML).toEqual('Monday, April 17, 2000');
                    done();
                };
                chart.loaded = loaded;
                chart.primaryXAxis.skeleton = 'full';
                chart.primaryXAxis.skeletonType = 'Date';
                chart.primaryXAxis.labelIntersectAction = 'Rotate45';
                chart.refresh();
            });
            it('checking with label formats custom with intervalType as Year', function (done) {
                loaded = function (args) {
                    var label1 = document.getElementById('containerAxisLabels0').childNodes[0];
                    expect(label1.innerHTML === 'Monday, April 17, 2000 at 12:00:00 AM GMT+05:30' ||
                        label1.innerHTML === 'Monday, April 17, 2000 at 12:00:00 AM GMT').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.primaryXAxis.skeleton = 'full';
                chart.primaryXAxis.skeletonType = 'DateTime';
                chart.primaryXAxis.intervalType = 'Years';
                chart.primaryXAxis.labelIntersectAction = 'Rotate45';
                chart.refresh();
            });
            it('checking with inversed', function (done) {
                loaded = function (args) {
                    var label1 = document.getElementById('containerAxisLabels0').childNodes[0];
                    var label2 = document.getElementById('containerAxisLabels0').childNodes[5];
                    expect(+label1.getAttribute('x') > +label2.getAttribute('x')).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.primaryXAxis.isInversed = true;
                chart.primaryXAxis.intervalType = 'Days';
                chart.primaryXAxis.skeleton = '';
                chart.primaryXAxis.skeletonType = 'DateTime';
                chart.refresh();
            });
            it('checking with inversed with edge label Hide', function () {
                chart.loaded = null;
                chart.primaryXAxis.edgeLabelPlacement = 'Hide';
                chart.dataBind();
                svg = document.getElementById('container_ChartAreaBorder');
                var labels = document.getElementById('containerAxisLabels0');
                expect(labels.childElementCount).toEqual(4);
            });
            it('checking with inversed with edge label none', function () {
                chart.primaryXAxis.edgeLabelPlacement = 'None';
                chart.dataBind();
                var label1 = document.getElementById('containerAxisLabels0').childNodes[5];
                svg = document.getElementById('container_ChartAreaBorder');
                expect(+label1.getAttribute('x') < +svg.getAttribute('x')).toBe(true);
            });
            it('checking non linear interval', function (done) {
                loaded = function (args) {
                    var label = document.getElementById('containerAxisLabels0');
                    expect(label.childElementCount).toEqual(2);
                    done();
                };
                chart.loaded = loaded;
                chart.primaryXAxis.isInversed = false;
                chart.primaryXAxis.intervalType = 'Years';
                chart.series[0].dataSource = data_spec_1.dateTimedataInterval;
                chart.series[1].dataSource = data_spec_1.dateTimedataInterval;
                chart.refresh();
            });
            it('checking with minor grid lines', function () {
                chart.primaryXAxis.minorTicksPerInterval = 3;
                chart.loaded = null;
                chart.dataBind();
                svg = document.getElementById('container_MinorGridLine_0_0');
                var path = document.getElementById('container_MinorGridLine_0_0').getAttribute('d');
                expect(path.match(/M/gi).length).toEqual(3);
            });
            it('checking minor grid with changing interval type', function (done) {
                loaded = function (args) {
                    var path = document.getElementById('container_MinorGridLine_0_0').getAttribute('d');
                    expect(path.match(/M/gi).length).toEqual(3);
                    done();
                };
                chart.loaded = loaded;
                chart.primaryXAxis.intervalType = 'Months';
                chart.refresh();
            });
            it('checking multiple axis', function (done) {
                loaded = function (args) {
                    var path = document.getElementById('container_MinorGridLine_0_0').getAttribute('d');
                    expect(path.match(/M/gi).length).toEqual(3);
                    done();
                };
                chart.loaded = loaded;
                chart.axes = [{ valueType: 'DateTimeCategory', title: 'secondary axis', name: 'axis2', labelPlacement: 'OnTicks' }];
                chart.series[1].xAxisName = 'axis2';
                chart.refresh();
            });
            it('checking with interval', function (done) {
                loaded = function (args) {
                    var label = document.getElementById('containerAxisLabels0');
                    expect(label.childElementCount).toEqual(6);
                    done();
                };
                chart.loaded = loaded;
                chart.primaryXAxis.interval = 1;
                chart.refresh();
            });
            it('checking with minor grid for between ticks', function () {
                chart.primaryXAxis.labelPlacement = 'BetweenTicks';
                chart.axes[0].labelPlacement = 'BetweenTicks';
                chart.dataBind();
                var svg = document.getElementById('containerAxisLabels0').childNodes[0];
                axisLine = document.getElementById('containerAxisLine_0');
                expect(+svg.getAttribute('x') > (+axisLine.getAttribute('x1'))).toBe(true);
                expect(3 == 3).toBe(true);
            });
            it('checking datetime category axis with single points', function (done) {
                loaded = function (args) {
                    var label = document.getElementById('containerAxisLabels0');
                    expect(label.childElementCount).toEqual(1);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].dataSource = [{ x: new Date(2000, 10, 10), y: 12 }];
                chart.series[1].dataSource = [{ x: new Date(2000, 10, 10), y: 13 }];
                chart.refresh();
            });
            it('checking datetime category axis with single points on ticks', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('containerAxisLabels0').childNodes[0];
                    axisLine = document.getElementById('containerAxisLine_0');
                    expect(+svg.getAttribute('x') < (+axisLine.getAttribute('d').split(' ')[1])).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.primaryXAxis.labelPlacement = 'OnTicks';
                chart.axes[0].labelPlacement = 'OnTicks';
                chart.refresh();
            });
            it('checking with months with same type', function (done) {
                loaded = function (args) {
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].dataSource = [{ x: new Date(2017, 10, 2), y: 23 }, { x: new Date(2017, 10, 3), y: 45 },
                    { x: new Date(2017, 10, 4), y: 76 }, { x: new Date(2018, 10, 4), y: 76 }];
                chart.primaryXAxis.intervalType = 'Months';
                chart.refresh();
            });
            it('checking with days with same type', function (done) {
                loaded = function (args) {
                    var label = document.getElementById('containerAxisLabels0').childNodes[0];
                    expect(label.textContent).toEqual('11/2/2017');
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].dataSource = [{ x: new Date(2017, 10, 2, 3), y: 23 }, { x: new Date(2017, 10, 2, 7), y: 45 },
                    { x: new Date(2017, 10, 2, 4), y: 76 }, { x: new Date(2018, 10, 4), y: 76 }];
                chart.primaryXAxis.intervalType = 'Days';
                chart.refresh();
            });
            it('checking with hours with same type', function (done) {
                loaded = function (args) {
                    var label = document.getElementById('containerAxisLabels0').childNodes[0];
                    expect(label.textContent).toEqual('Thu 01:02');
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].dataSource = [{ x: new Date(2017, 10, 2, 1, 2), y: 23 }, { x: new Date(2017, 10, 2, 3, 4), y: 45 },
                    { x: new Date(2017, 10, 2, 3, 34), y: 76 }, { x: new Date(2018, 10, 4), y: 76 }];
                chart.primaryXAxis.intervalType = 'Hours';
                chart.refresh();
            });
            it('checking with minutes with same type', function (done) {
                loaded = function (args) {
                    var label = document.getElementById('containerAxisLabels0').childNodes[0];
                    expect(label.textContent).toEqual('03:02:12');
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].dataSource = [{ x: new Date(2017, 10, 2, 3, 2, 12), y: 23 }, { x: new Date(2017, 10, 2, 3, 2, 14), y: 45 },
                    { x: new Date(2017, 10, 2, 3, 2, 20), y: 76 }, { x: new Date(2018, 10, 4), y: 76 }];
                chart.primaryXAxis.intervalType = 'Minutes';
                chart.refresh();
            });
            it('checking with seconds with same type', function (done) {
                loaded = function (args) {
                    var label = document.getElementById('containerAxisLabels0').childNodes[0];
                    expect(label.textContent).toEqual('03:02:12');
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].dataSource = [{ x: new Date(2017, 10, 2, 3, 2, 12), y: 23 }, { x: new Date(2017, 10, 2, 3, 2, 14), y: 45 },
                    { x: new Date(2017, 10, 2, 3, 2, 14), y: 76 }, { x: new Date(2018, 10, 4), y: 76 }];
                chart.primaryXAxis.intervalType = 'Seconds';
                chart.refresh();
            });
            it('checking with annotation', function (done) {
                var element;
                chart.loaded = function (args) {
                    element = index_1.getElement('container_Annotation_0');
                    expect(element).not.toEqual(null);
                    var left = element.style.left;
                    var top = element.style.top;
                    expect(left == '7.39844px' || left == '3.39844px').toBe(true);
                    expect(top == '249.167px' || top == '255.389px' || top == '246.312px').toBe(true);
                    done();
                };
                chart.annotations = [{
                        x: new Date(2017, 10, 2, 3, 2, 12), y: 20, region: 'Series',
                        coordinateUnits: 'Point', content: '<div>AnnotationText</div>'
                    }];
                chart.refresh();
            });
            it('checking with strip lines', function (done) {
                loaded = function (args) {
                    var stripLineElement = document.getElementById('container_stripline_Behind_rect_primaryXAxis_0');
                    expect(stripLineElement).not.toEqual(null);
                    expect(stripLineElement.getAttribute('x') == '224' || stripLineElement.getAttribute('x') == '220.8').toBe(true);
                    expect(stripLineElement.getAttribute('y') == '10.25').toBe(true);
                    stripLineElement = document.getElementById('container_stripline_Over_rect_primaryXAxis_0');
                    expect(stripLineElement.getAttribute('x') == '723.5' || stripLineElement.getAttribute('x') == '722.7').toBe(true);
                    expect(stripLineElement.getAttribute('y') == '10.25').toBe(true);
                    expect(stripLineElement).not.toEqual(null);
                    done();
                };
                chart.loaded = loaded;
                chart.primaryXAxis.intervalType = 'Years';
                chart.axes = [];
                chart.series = [{ dataSource: data_spec_1.datetimeCategoryYearData1, xName: 'x', yName: 'y', name: 'striplLine' }];
                chart.primaryXAxis.stripLines = [
                    {
                        startFromAxis: false, start: new Date(2000, 3, 17), size: 2,
                        verticalAlignment: 'End', opacity: 0.5,
                        color: 'red', zIndex: 'Behind', text: 'Behind'
                    },
                    {
                        start: new Date(2001, 3, 25), end: new Date(2002, 3, 30), opacity: 0.3,
                        color: 'blue', textStyle: { color: '#ffffff' },
                        text: 'Over', zIndex: 'Over'
                    }
                ];
                chart.refresh();
            });
            it('checking with strip lines', function (done) {
                loaded = function (args) {
                    var stripLineElement = document.getElementById('container_stripline_Over_rect_primaryXAxis_0');
                    expect(stripLineElement).not.toEqual(null);
                    done();
                };
                chart.loaded = loaded;
                chart.primaryXAxis.intervalType = 'Years';
                chart.primaryXAxis.minimum = null;
                chart.primaryXAxis.maximum = null;
                chart.primaryXAxis.interval = null;
                chart.axes = [];
                chart.series = [{ dataSource: data_spec_1.datetimeCategoryYearData1, xName: 'x', yName: 'y', name: 'striplLine' }];
                chart.primaryXAxis.stripLines = [
                    {
                        end: new Date(2002, 3, 30), opacity: 0.3,
                        color: 'blue', textStyle: { color: '#ffffff' },
                        text: 'Over', zIndex: 'Over'
                    }
                ];
                chart.refresh();
            });
            it('checking with axis minimum', function (done) {
                loaded = function (args) {
                    var axisGroup = document.getElementById('containerAxisLabels0');
                    expect(axisGroup.childElementCount).toEqual(4);
                    expect(axisGroup.childNodes[0].textContent).toEqual('4/18/2000');
                    done();
                };
                chart.loaded = loaded;
                chart.primaryXAxis.minimum = 2;
                chart.primaryXAxis.intervalType = 'Days';
                chart.primaryXAxis.interval = null;
                chart.refresh();
            });
            it('checking with axis maximum', function (done) {
                loaded = function (args) {
                    var axisGroup = document.getElementById('containerAxisLabels0');
                    expect(axisGroup.childElementCount).toEqual(5);
                    expect(axisGroup.childNodes[0].textContent).toEqual('4/21/2000');
                    done();
                };
                chart.loaded = loaded;
                chart.primaryXAxis.maximum = 4;
                chart.primaryXAxis.minimum = null;
                chart.primaryXAxis.interval = null;
                chart.refresh();
            });
        });
        describe('Checking Column Definition', function () {
            var chartObj;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: 'chartContainer' });
                document.body.appendChild(ele);
                chartObj = new index_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis', valueType: 'DateTimeCategory' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'None' },
                    axes: [
                        {
                            columnIndex: 1, name: 'yAxis1', title: 'Axis2', rangePadding: 'None', valueType: 'DateTimeCategory',
                            titleStyle: { size: '14px', fontWeight: 'Regular', color: '#282828' },
                            labelStyle: { size: '12px', fontWeight: 'Regular', color: '#282828' }
                        }
                    ],
                    series: [
                        {
                            name: 'series1', type: 'Line', fill: '#ACE5FF', width: 2,
                            dataSource: data_spec_1.datetimeCategoryYearData, xName: 'x', yName: 'y', animation: { enable: false }
                        },
                        {
                            name: 'series2', type: 'Line', fill: 'red', width: 2, xAxisName: 'yAxis1',
                            dataSource: data_spec_1.datetimeCategoryYearData1, xName: 'x', yName: 'y', animation: { enable: false }
                        },
                    ],
                    height: '600', width: '900', title: 'Chart TS Title',
                    columns: [
                        {
                            width: '400', border: { width: 4, color: 'red' }
                        },
                        {
                            width: '400', border: { width: 4, color: 'blue' }
                        }
                    ], legendSettings: { visible: false }
                });
            });
            afterAll(function () {
                chartObj.destroy();
                ele.remove();
            });
            it('Checking the bottom line', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('chartContainer_AxisBottom_Column0');
                    expect(svg.getAttribute('x1') == '57.5' || svg.getAttribute('x1') == '53.5').toBe(true);
                    expect(svg.getAttribute('stroke') == 'red').toBe(true);
                    svg = document.getElementById('chartContainer_AxisBottom_Column1');
                    expect(svg.getAttribute('x1') == '457.5' || svg.getAttribute('x1') == '453.5').toBe(true);
                    expect(svg.getAttribute('stroke') == 'blue').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.appendTo('#chartContainer');
            });
        });
        describe('Datetime category Axis label with line break', function () {
            var chart;
            var axisLine;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(ele);
                chart = new index_1.Chart({
                    primaryXAxis: {
                        valueType: 'DateTimeCategory',
                    },
                    primaryYAxis: {},
                    series: [
                        {
                            type: 'Line', animation: { enable: false },
                            dataSource: [
                                { x: new Date(2017, 11, 20), y: 21 }, { x: new Date(2017, 11, 21), y: 24 },
                                { x: new Date(2017, 11, 22), y: 24 }, { x: new Date(2017, 11, 26), y: 70 },
                                { x: new Date(2017, 11, 27), y: 75 }, { x: new Date(2018, 0, 2), y: 82 },
                                { x: new Date(2018, 0, 3), y: 53 }, { x: new Date(2018, 0, 4), y: 54 },
                                { x: new Date(2018, 0, 5), y: 53 }, { x: new Date(2018, 0, 8), y: 45 }
                            ], xName: 'x', yName: 'y'
                        },
                    ],
                    height: '600', width: '900', legendSettings: { visible: false }
                }, '#container');
            });
            afterAll(function () {
                chart.destroy();
                ele.remove();
            });
            it('Checking line break label with datatimecategory axis', function (done) {
                loaded = function (args) {
                    var label = document.getElementById('containerAxisLabels0');
                    expect(label.childElementCount == 10).toBe(true);
                    label = document.getElementById('container0_AxisLabel_1');
                    expect(label.childElementCount == 2).toBe(true);
                    var x = parseInt(label.getAttribute("x"));
                    done();
                };
                chart.loaded = loaded;
                chart.primaryXAxis.labelFormat = 'dd<br>MMM<br>yyyy';
                chart.refresh();
            });
            it('Checking line break labels with inversed datetimecategory axis', function (done) {
                loaded = function (args) {
                    var label = document.getElementById('container0_AxisLabel_1');
                    var x = parseInt(label.getAttribute("x"));
                    expect(label.childElementCount == 2).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.primaryXAxis.isInversed = true;
                chart.refresh();
            });
            it('datetimecategory line break labels with opposed position', function (done) {
                loaded = function (args) {
                    var label = document.getElementById('containerAxisLabels0');
                    expect(label.childElementCount == 10).toBe(true);
                    label = document.getElementById('container0_AxisLabel_1');
                    expect(label.childElementCount == 2).toBe(true);
                    var x = parseInt(label.getAttribute("x"));
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
