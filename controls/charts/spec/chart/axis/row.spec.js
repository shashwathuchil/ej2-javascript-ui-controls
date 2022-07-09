define(["require", "exports", "@syncfusion/ej2-base", "../../../src/chart/chart", "../../../src/chart/series/line-series", "../base/data.spec", "../base/data.spec", "../base/events.spec", "../../../src/chart/user-interaction/data-editing", "../../../src/chart/axis/category-axis", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, chart_1, line_series_1, data_spec_1, data_spec_2, events_spec_1, data_editing_1, category_axis_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(line_series_1.LineSeries, category_axis_1.Category, data_editing_1.DataEditing);
    describe('Chart Control', function () {
        var ele;
        var loaded;
        describe('Row Definition', function () {
            var chartObj;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: 'chartContainer' });
                document.body.appendChild(ele);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis' },
                    primaryYAxis: { title: 'PrimaryYAxis', minimum: 110, maximum: 150, interval: 10, rangePadding: 'None' },
                    axes: [{
                            rowIndex: 1, name: 'yAxis1', minimum: 20, maximum: 80, interval: 20, title: 'Axis2',
                            titleStyle: { size: '14px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' },
                            labelStyle: { size: '12px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' }
                        }],
                    series: [
                        {
                            name: 'series1', type: 'Line', fill: '#ACE5FF', width: 2,
                            animation: { enable: false }, dataSource: data_spec_1.definition1, xName: 'x', yName: 'y'
                        },
                        {
                            name: 'series2', type: 'Line', fill: 'red', width: 2, yAxisName: 'yAxis1',
                            animation: { enable: false }, dataSource: data_spec_1.definition2, xName: 'x', yName: 'y'
                        }
                    ], height: '600', title: 'Chart TS Title',
                    rows: [{ height: '300', border: { width: 4, color: 'red' } },
                        { height: '300', border: { width: 4, color: 'blue' } }], legendSettings: { visible: false }
                });
            });
            afterAll(function () {
                chartObj.destroy();
                ele.remove();
            });
            it('Checking Row Definition with pixel', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('chartContainer_AxisBottom_Row0');
                    expect(svg.getAttribute('y1') == '543.5' || svg.getAttribute('y1') == '539.5').toBe(true);
                    expect(svg.getAttribute('stroke') == 'red').toBe(true);
                    svg = document.getElementById('chartContainer_AxisBottom_Row1');
                    expect(svg.getAttribute('y1') == '243.5' || svg.getAttribute('y1') == '239.5').toBe(true);
                    expect(svg.getAttribute('stroke') == 'blue').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.appendTo('#chartContainer');
            });
            it('Checking Row Definition with percentage', function (done) {
                chartObj.primaryYAxis.rowIndex = 1;
                chartObj.axes[0].rowIndex = 0;
                chartObj.width = '900';
                chartObj.rows[0].height = '50%';
                chartObj.rows[1].height = '50%';
                loaded = function (args) {
                    var svg = document.getElementById('chartContainer_AxisTitle_1');
                    expect(svg.getAttribute('y') == '162.5625' || svg.getAttribute('y') == '163.8125').toBe(true);
                    svg = document.getElementById('chartContainer1_AxisLabel_0');
                    expect(svg.getAttribute('y') == '292').toBe(true);
                    expect(svg.getAttribute('x') == '40').toBe(true);
                    svg = document.getElementById('chartContainer_AxisTitle_2');
                    expect(svg.getAttribute('y') == '413.1875' || svg.getAttribute('y') == '410.9375' || svg.getAttribute('y') == '292').toBe(true);
                    svg = document.getElementById('chartContainer2_AxisLabel_3');
                    expect(svg.getAttribute('y') == '292').toBe(true);
                    expect(svg.getAttribute('x') == '43').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
        });
        describe('Row Definition with spanning', function () {
            var chart;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: 'chartContainer' });
                document.body.appendChild(ele);
                chart = new chart_1.Chart({
                    border: { width: 1, color: "black" }, primaryXAxis: { title: '' },
                    primaryYAxis: { title: 'Axis1', span: 2, rangePadding: 'None' }, title: '',
                    axes: [
                        {
                            title: 'Axis2', titleStyle: { size: '14px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' },
                            name: 'yAxis2', majorGridLines: { width: 0 }, rowIndex: 1, minimum: 100, maximum: 160, interval: 20
                        },
                        {
                            title: 'Axis3', titleStyle: { size: '14px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' },
                            name: 'yAxis3', majorGridLines: { width: 0 }, rowIndex: 1, span: 2, minimum: 100, maximum: 160, interval: 20
                        },
                        {
                            title: 'Axis4', titleStyle: { size: '14px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' },
                            name: 'yAxis4', majorGridLines: { width: 0 }, rowIndex: 2, plotOffset: 10, minimum: 100, maximum: 160, interval: 10
                        }
                    ],
                    series: [
                        {
                            name: 'series1', type: 'Line', fill: '#ACE5FF', width: 2, dataSource: data_spec_1.definition3,
                            animation: { enable: false }, xName: 'x', yName: 'y'
                        },
                        {
                            name: 'series2', type: 'Line', fill: 'pink', width: 2, yAxisName: 'yAxis2',
                            dataSource: data_spec_1.definition1, animation: { enable: false }, xName: 'x', yName: 'y'
                        },
                        {
                            name: 'series3', type: 'Line', fill: 'red', width: 2, yAxisName: 'yAxis3',
                            dataSource: data_spec_1.definition1, animation: { enable: false }, xName: 'x', yName: 'y'
                        },
                        {
                            name: 'series4', type: 'Line', fill: 'blue', width: 2, yAxisName: 'yAxis4',
                            dataSource: data_spec_1.definition1, animation: { enable: false }, xName: 'x', yName: 'y'
                        },
                    ],
                    rows: [
                        { height: '300' },
                        { height: '200' },
                        { height: '200' },
                    ], height: '700', width: '900', legendSettings: { visible: false }
                });
            });
            afterAll(function () {
                chart.destroy();
                ele.remove();
            });
            it('Checking the Spanning axis', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('chartContainer1_AxisLabel_6');
                    expect(svg.getAttribute('y') == '163').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.appendTo('#chartContainer');
            });
            it('Checking the Spanning axis with opposedPosition', function (done) {
                chart.primaryYAxis.opposedPosition = true;
                chart.axes = [{ opposedPosition: true }, { opposedPosition: true, span: 3 }, { opposedPosition: true }];
                loaded = function (args) {
                    done();
                };
                chart.loaded = loaded;
                chart.refresh();
            });
        });
        describe('Checking Row Definition with opposedPosition', function () {
            var chartEle;
            ele = ej2_base_1.createElement('div', { id: 'chartContainer' });
            beforeAll(function () {
                document.body.appendChild(ele);
                chartEle = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis' },
                    primaryYAxis: { opposedPosition: true, title: 'PrimaryYAxis', minimum: 110, maximum: 150, interval: 10, rangePadding: 'None' },
                    axes: [
                        {
                            rowIndex: 2,
                            opposedPosition: true,
                            title: 'Axis2', titleStyle: { size: '14px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' },
                            name: 'yAxis1',
                            minimum: 20, maximum: 80, interval: 20,
                            labelStyle: { size: '12px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' }
                        }
                    ],
                    series: [
                        {
                            name: 'series1', type: 'Line', fill: '#ACE5FF', width: 2,
                            animation: { enable: false }, dataSource: data_spec_1.definition1, xName: 'x', yName: 'y'
                        },
                        {
                            name: 'series2', type: 'Line', fill: 'red', width: 2, yAxisName: 'yAxis1',
                            animation: { enable: false }, dataSource: data_spec_1.definition2, xName: 'x', yName: 'y'
                        },
                    ],
                    height: '600', title: 'Chart TS Title',
                    rows: [
                        {
                            height: '300', border: { width: 4, color: 'red' },
                        },
                        {
                            height: '300', border: { width: 4, color: 'blue' },
                        }
                    ], legendSettings: { visible: false }
                });
            });
            afterAll(function () {
                chartEle.destroy();
                ele.remove();
            });
            it('Checking the bottom line with opposed position', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('chartContainer_AxisBottom_Row0');
                    expect(svg.getAttribute('y2') == '543.5' || svg.getAttribute('y2') == '539.5').toBe(true);
                    expect(svg.getAttribute('stroke') == 'red').toBe(true);
                    svg = document.getElementById('chartContainer_AxisBottom_Row1');
                    expect(svg.getAttribute('y2') == '243.5' || svg.getAttribute('y2') == '239.5').toBe(true);
                    expect(svg.getAttribute('stroke') == 'blue').toBe(true);
                    done();
                };
                chartEle.loaded = loaded;
                chartEle.appendTo('#chartContainer');
            });
        });
        describe('Checking the Calculating Row Size Method with Axis Crossing', function () {
            var chartEle;
            ele = ej2_base_1.createElement('div', { id: 'chartContainer' });
            beforeAll(function () {
                document.body.appendChild(ele);
                chartEle = new chart_1.Chart({
                    primaryXAxis: { valueType: 'Double', },
                    primaryYAxis: { crossesAt: 3 },
                    series: [{
                            type: 'Line', xName: 'x', width: 2, yName: 'y', marker: { visible: true },
                            dataSource: [{ x: 1, y: 46 }, { x: 2, y: 27 }, { x: 3, y: 26 }, { x: 4, y: 16 }, { x: 5, y: 31 }],
                        }],
                    width: '800',
                    height: '450'
                }, '#chartContainer');
                data_spec_2.unbindResizeEvents(chartEle);
            });
            afterAll(function () {
                chartEle.destroy();
                ele.remove();
            });
            it('Checking the Axis Size for far with Axis Crossing', function (done) {
                loaded = function (args) {
                    var yLine = document.getElementById('chartContainerAxisLine_1');
                    var area = document.getElementById('chartContainer_ChartAreaBorder');
                    expect((parseInt(yLine.getAttribute('d').split(' ')[1]) === parseInt(area.getAttribute('x')) + parseInt(area.getAttribute('width')))).toBe(true);
                    done();
                };
                chartEle.loaded = loaded;
                chartEle.primaryYAxis.crossesAt = 6;
                chartEle.refresh();
            });
            it('Checking the Axis Size for far with Opposed Position and Axis Crossing ', function (done) {
                loaded = function (args) {
                    var yLine = document.getElementById('chartContainerAxisLine_1');
                    expect((yLine.getAttribute('d').split(' ')[1] === '390.75' || yLine.getAttribute('d').split(' ')[1] === '391.25')).toBe(true);
                    done();
                };
                chartEle.loaded = loaded;
                chartEle.primaryYAxis.crossesAt = 3;
                chartEle.primaryYAxis.opposedPosition = true;
                chartEle.primaryYAxis.placeNextToAxisLine = false;
                chartEle.refresh();
            });
        });
        describe('Line break axis label checking with rows', function () {
            var chart;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(ele);
                chart = new chart_1.Chart({
                    primaryXAxis: { valueType: 'Category' },
                    primaryYAxis: {},
                    axes: [{
                            rowIndex: 1, name: 'yAxis1'
                        }],
                    series: [
                        {
                            name: 'series1', type: 'Line',
                            animation: { enable: false }, dataSource: [
                                { x: "India", y: 61.3 },
                                { x: "United<br>States<br>of<br>America", y: 31 },
                                { x: "South<br>Korea", y: 39.4 },
                                { x: "United<br>Arab<br>Emirates", y: 65.1 },
                                { x: "United<br>Kingdom", y: 75.9 }
                            ], xName: 'x', yName: 'y'
                        },
                        {
                            name: 'series2', type: 'Line', yAxisName: 'yAxis1',
                            animation: { enable: false }, dataSource: [
                                { x: "India", y: 61.3 },
                                { x: "United<br>States<br>of<br>America", y: 31 },
                                { x: "South<br>Korea", y: 39.4 },
                                { x: "United<br>Arab<br>Emirates", y: 65.1 },
                                { x: "United<br>Kingdom", y: 75.9 }
                            ], xName: 'x', yName: 'y'
                        }
                    ],
                    rows: [{ height: '50%' },
                        { height: '50%' }], legendSettings: { visible: false }
                }, '#container');
            });
            afterAll(function () {
                chart.destroy();
                ele.remove();
            });
            it('Checking line break labels', function (done) {
                loaded = function (args) {
                    var label = document.getElementById('containerAxisLabels0');
                    expect(label.childElementCount == 5).toBe(true);
                    label = document.getElementById('container0_AxisLabel_1');
                    expect(label.childElementCount == 3).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.refresh();
            });
            it('Checking line break labels with opposed position', function (done) {
                loaded = function (args) {
                    var label = document.getElementById('containerAxisLabels0');
                    expect(label.childElementCount == 5).toBe(true);
                    label = document.getElementById('container0_AxisLabel_1');
                    expect(label.childElementCount == 3).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.primaryXAxis.opposedPosition = true;
                chart.refresh();
            });
        });
        describe('Multi rows with drag and drop support', function () {
            var chartObj;
            var x;
            var y;
            var loaded;
            var trigger = new events_spec_1.MouseEvents();
            var element1 = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(element1);
                var chartData = [
                    { x: 'Jan', y: 15, y1: 33 }, { x: 'Feb', y: 20, y1: 31 }, { x: 'Mar', y: 35, y1: 30 },
                    { x: 'Apr', y: 40, y1: 28 }, { x: 'May', y: 80, y1: 29 }, { x: 'Jun', y: 70, y1: 30 },
                    { x: 'Jul', y: 65, y1: 33 }, { x: 'Aug', y: 55, y1: 32 }, { x: 'Sep', y: 50, y1: 34 },
                    { x: 'Oct', y: 30, y1: 32 }, { x: 'Nov', y: 35, y1: 32 }, { x: 'Dec', y: 35, y1: 31 }
                ];
                chartObj = new chart_1.Chart({
                    primaryXAxis: {
                        title: 'Months',
                        valueType: 'Category',
                        interval: 1
                    },
                    primaryYAxis: {
                        minimum: 0, maximum: 90, interval: 20,
                        lineStyle: { width: 0 },
                        title: 'Temperature (Fahrenheit)',
                        labelFormat: '{value}°F'
                    },
                    rows: [
                        {
                            height: '50%'
                        }, {
                            height: '50%'
                        }
                    ],
                    axes: [
                        {
                            majorGridLines: { width: 0 },
                            rowIndex: 1, opposedPosition: true,
                            lineStyle: { width: 0 },
                            minimum: 24, maximum: 36, interval: 4,
                            name: 'yAxis', title: 'Temperature (Celsius)',
                            labelFormat: '{value}°C'
                        }
                    ],
                    series: [{
                            dataSource: chartData,
                            xName: 'x', yName: 'y',
                            name: 'Germany', type: 'Column', animation: { enable: false }
                        }, {
                            dataSource: chartData, width: 2,
                            xName: 'x', yName: 'y1', yAxisName: 'yAxis',
                            name: 'Japan', type: 'Line', dragSettings: { enable: true }, animation: { enable: false },
                            marker: { visible: true, width: 10, height: 10, border: { width: 2, color: '#F8AB1D' } }
                        }],
                    title: 'Weather Condition'
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                element1.remove();
            });
            it('Multi rows with drag and drop', function (done) {
                loaded = function () {
                    var target = document.getElementById('container_Series_1_Point_6_Symbol');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(target.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + element1.offsetTop;
                    x = parseFloat(target.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + element1.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    trigger.draganddropEvent(element1, Math.ceil(x), Math.ceil(y), Math.ceil(x), Math.ceil(y) + 50);
                    var yValue = chartObj.visibleSeries[1].points[6].yValue;
                    expect(yValue == 29.06 || yValue == 29.16).toBe(true);
                    chartObj.loaded = null;
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
        });
        describe('Checking axis padding with rows', function () {
            var chartElem;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: 'chartContainer' });
                document.body.appendChild(ele);
                chartElem = new chart_1.Chart({
                    primaryXAxis: {
                        valueType: 'Category',
                        interval: 1,
                        majorGridLines: { width: 0 },
                        enableTrim: true
                    },
                    zoomSettings: {
                        enableSelectionZooming: true,
                        enableScrollbar: true
                    },
                    chartArea: { border: { width: 0 } },
                    rows: [{ height: '33%' }, { height: '33%' }, { height: '33%' }],
                    axes: [{ rowIndex: 0, name: 'yAxis', labelFormat: '{value}°C',
                            title: 'Weather 1 - reportererer', plotOffset: 20 },
                        { rowIndex: 1, name: 'yAxis1', labelFormat: '{value}°C',
                            title: 'Weather 2 - reportererer', plotOffset: 20, plotOffsetTop: 50 },
                        { rowIndex: 2, name: 'yAxis2', labelFormat: '{value}°C',
                            title: 'Weather 3 - reportererer', plotOffset: 20 }],
                    series: [
                        {
                            type: 'Column',
                            dataSource: [
                                { x: 'Sun', y: 30 }, { x: 'Mon', y: 28 },
                                { x: 'Tue', y: 29 }, { x: 'Wed', y: 30 }, { x: 'Thu', y: 33 }, { x: 'Fri', y: 32 },
                                { x: 'Sat', y: 34 }
                            ], animation: { enable: false },
                            xName: 'x', yName: 'y',
                            name: 'Germany',
                            yAxisName: 'yAxis',
                        },
                        {
                            type: 'Column',
                            dataSource: [
                                { x: 'Sun', y: 30 }, { x: 'Mon', y: 28 },
                                { x: 'Tue', y: 29 }, { x: 'Wed', y: 30 }, { x: 'Thu', y: 33 }, { x: 'Fri', y: 32 },
                                { x: 'Sat', y: 34 }
                            ],
                            xName: 'x', yName: 'y',
                            yAxisName: 'yAxis1',
                            name: 'Japan', animation: { enable: false }
                        },
                        {
                            type: 'Column',
                            dataSource: [
                                { x: 'Sun', y: 30 }, { x: 'Mon', y: 28 },
                                { x: 'Tue', y: 29 }, { x: 'Wed', y: 30 }, { x: 'Thu', y: 33 }, { x: 'Fri', y: 32 },
                                { x: 'Sat', y: 34 }
                            ],
                            xName: 'x', yName: 'y',
                            yAxisName: 'yAxis2',
                            name: 'Japan', animation: { enable: false }
                        }
                    ],
                    tooltip: { enable: true },
                    height: '500'
                });
            });
            afterAll(function () {
                chartElem.destroy();
                ele.remove();
            });
            it('Axis title trim Checking', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('chartContainer_AxisTitle_1');
                    expect(svg.textContent.indexOf('...') > -1 == true);
                    svg = document.getElementById('chartContainer_AxisTitle_2');
                    expect(svg.textContent.indexOf('...') > -1 == true);
                    svg = document.getElementById('chartContainer_AxisTitle_3');
                    expect(svg.textContent.indexOf('...') > -1 == true);
                    done();
                };
                chartElem.loaded = loaded;
                chartElem.appendTo('#chartContainer');
            });
            it('Axis position Checking', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('chartContainer_AxisTitle_1');
                    expect(svg.getAttribute('y') == '356.9525' || svg.getAttribute('y') == '355.2825').toBe(true);
                    expect(svg.getAttribute('x') == '26.5' || svg.getAttribute('x') == '29.5').toBe(true);
                    svg = document.getElementById('chartContainer_AxisTitle_2');
                    expect(svg.getAttribute('y') == '232.85749999999996' || svg.getAttribute('y') == '231.8475').toBe(true);
                    expect(svg.getAttribute('x') == '26.5' || svg.getAttribute('x') == '29.5').toBe(true);
                    svg = document.getElementById('chartContainer_AxisTitle_3');
                    expect(svg.getAttribute('y') == '76.65499999999999' || svg.getAttribute('y') == '76.315').toBe(true);
                    expect(svg.getAttribute('x') == '26.5' || svg.getAttribute('x') == '29.5').toBe(true);
                    done();
                };
                chartElem.loaded = loaded;
                chartElem.appendTo('#chartContainer');
            });
        });
    });
});
