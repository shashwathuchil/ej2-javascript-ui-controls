define(["require", "exports", "@syncfusion/ej2-base", "../../../src/chart/chart", "../../../src/chart/series/line-series", "../../../src/chart/series/column-series", "../../../src/chart/series/area-series", "../../../src/chart/user-interaction/crosshair", "../../../src/chart/user-interaction/tooltip", "../base/events.spec", "../base/data.spec", "../../../src/chart/axis/date-time-axis", "../../../src/chart/axis/category-axis", "../../../src/chart/user-interaction/data-editing", "../../common.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, chart_1, line_series_1, column_series_1, area_series_1, crosshair_1, tooltip_1, events_spec_1, data_spec_1, date_time_axis_1, category_axis_1, data_editing_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(line_series_1.LineSeries, column_series_1.ColumnSeries, date_time_axis_1.DateTime, category_axis_1.Category, tooltip_1.Tooltip, data_editing_1.DataEditing);
    chart_1.Chart.Inject(crosshair_1.Crosshair, area_series_1.AreaSeries);
    describe('Chart Crosshair', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('Chart Crosshair Default', function () {
            var chartObj;
            var elem = ej2_base_1.createElement('div', { id: 'container' });
            var targetElement;
            var loaded;
            var loaded1;
            var trigger = new events_spec_1.MouseEvents();
            var x;
            var y;
            beforeAll(function () {
                if (document.getElementById('container')) {
                    document.getElementById('container').remove();
                }
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis', valueType: 'Category', labelPlacement: 'OnTicks', crosshairTooltip: { enable: true } },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal', labelFormat: 'C', crosshairTooltip: { enable: true } },
                    series: [{
                            dataSource: data_spec_1.categoryData, xName: 'x', yName: 'y', animation: { enable: false },
                            name: 'Japan', fill: '#B82E3D', width: 2,
                            type: 'Column', marker: { visible: true, height: 8, width: 8 },
                        }, {
                            dataSource: data_spec_1.categoryData1, xName: 'x', yName: 'y', animation: { enable: false },
                            name: 'Japan', fill: 'blue', width: 2,
                            type: 'Column', marker: { visible: true, height: 8, width: 8 },
                        }
                    ], width: '1000',
                    crosshair: { enable: true },
                    title: 'Export', loaded: loaded, legendSettings: { visible: false }
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                elem.remove();
            });
            it('Default Crosshair', function (done) {
                loaded = function (args) {
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(chartArea.getAttribute('y')) + parseFloat(chartArea.getAttribute('height')) / 2 + elem.offsetTop;
                    x = parseFloat(chartArea.getAttribute('x')) + parseFloat(chartArea.getAttribute('width')) / 2 + elem.offsetLeft;
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
                    expect(element1.textContent == 'France').toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[3];
                    expect(element1.textContent == '$39.97' || element1.textContent == '$39.85').toBe(true);
                    chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(chartArea.getAttribute('y')) + elem.offsetTop + 1;
                    x = parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft + 1;
                    trigger.mousemovetEvent(chartArea, Math.ceil(x), Math.ceil(y));
                    crosshair = document.getElementById('container_svg').lastChild;
                    expect(crosshair.childNodes.length == 3).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Customizing Axis Tooltip', function (done) {
                loaded = function (args) {
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(chartArea.getAttribute('y')) + parseFloat(chartArea.getAttribute('height')) / 4 + elem.offsetTop;
                    x = parseFloat(chartArea.getAttribute('x')) + parseFloat(chartArea.getAttribute('width')) / 4 + elem.offsetLeft;
                    trigger.mousemovetEvent(chartArea, Math.ceil(x), Math.ceil(y));
                    var crosshair = document.getElementById('container_svg').lastChild;
                    var element1;
                    expect(crosshair.childNodes.length == 3).toBe(true);
                    expect(crosshair.childNodes[2].childNodes.length == 2).toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[1];
                    expect(element1.getAttribute('fill') == 'red').toBe(true);
                    expect(element1.getAttribute('font-size') == '16px').toBe(true);
                    expect(element1.textContent == 'Japan').toBe(true);
                    done();
                };
                chartObj.primaryYAxis.crosshairTooltip.enable = false;
                chartObj.primaryXAxis.crosshairTooltip.textStyle.color = 'red';
                chartObj.primaryXAxis.crosshairTooltip.textStyle.size = '16px';
                chartObj.primaryXAxis.opposedPosition = true;
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('OnTicks and BetweenTicks', function (done) {
                var chartArea = document.getElementById('container_ChartAreaBorder');
                y = parseFloat(chartArea.getAttribute('y')) + parseFloat(chartArea.getAttribute('height')) / 4 + elem.offsetTop;
                x = parseFloat(chartArea.getAttribute('x')) + parseFloat(chartArea.getAttribute('width')) + elem.offsetLeft - 10;
                trigger.mousemovetEvent(chartArea, Math.ceil(x), Math.ceil(y));
                var crosshair = document.getElementById('container_svg').lastChild;
                var element1;
                element1 = crosshair.childNodes[2].childNodes[1];
                expect(element1.textContent == 'France1').toBe(true);
                loaded = function (args) {
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(chartArea.getAttribute('y')) + parseFloat(chartArea.getAttribute('height')) / 4 + elem.offsetTop;
                    x = parseFloat(chartArea.getAttribute('x')) + parseFloat(chartArea.getAttribute('width')) + elem.offsetLeft - 10;
                    trigger.mousemovetEvent(chartArea, Math.ceil(x), Math.ceil(y));
                    var crosshair = document.getElementById('container_svg').lastChild;
                    element1 = crosshair.childNodes[2].childNodes[1];
                    expect(element1.textContent == 'Germany1').toBe(true);
                    done();
                };
                chartObj.primaryXAxis.labelPlacement = 'BetweenTicks';
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Crosshair tooltip inside position', function (done) {
                var element1;
                loaded = function (args) {
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(chartArea.getAttribute('y')) + parseFloat(chartArea.getAttribute('height')) / 4 + elem.offsetTop;
                    x = parseFloat(chartArea.getAttribute('x')) + parseFloat(chartArea.getAttribute('width')) + elem.offsetLeft - 10;
                    trigger.mousemovetEvent(chartArea, Math.ceil(x), Math.ceil(y));
                    var crosshair = document.getElementById('container_svg').lastChild;
                    element1 = crosshair.childNodes[2].childNodes[1];
                    expect(element1.textContent == 'USA').toBe(true);
                    done();
                };
                chartObj.primaryXAxis.labelPosition = 'Inside';
                chartObj.primaryYAxis.labelPosition = 'Inside';
                chartObj.primaryXAxis.isInversed = true;
                chartObj.primaryYAxis.isInversed = true;
                chartObj.primaryYAxis.crosshairTooltip.enable = true;
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Crosshair tooltip opposed label inside position', function (done) {
                var element1;
                loaded = function (args) {
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(chartArea.getAttribute('y')) + parseFloat(chartArea.getAttribute('height')) / 4 + elem.offsetTop;
                    x = parseFloat(chartArea.getAttribute('x')) + parseFloat(chartArea.getAttribute('width')) + elem.offsetLeft - 10;
                    trigger.mousemovetEvent(chartArea, Math.ceil(x), Math.ceil(y));
                    var crosshair = document.getElementById('container_svg').lastChild;
                    element1 = crosshair.childNodes[2].childNodes[1];
                    expect(element1.textContent == 'USA').toBe(true);
                    done();
                };
                chartObj.primaryXAxis.labelPosition = 'Inside';
                chartObj.primaryYAxis.labelPosition = 'Inside';
                chartObj.primaryXAxis.isInversed = true;
                chartObj.primaryYAxis.isInversed = true;
                chartObj.primaryYAxis.crosshairTooltip.enable = true;
                chartObj.primaryYAxis.opposedPosition = true;
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Inversed Axis', function (done) {
                var element1;
                loaded = function (args) {
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(chartArea.getAttribute('y')) + parseFloat(chartArea.getAttribute('height')) / 4 + elem.offsetTop;
                    x = parseFloat(chartArea.getAttribute('x')) + parseFloat(chartArea.getAttribute('width')) + elem.offsetLeft - 10;
                    trigger.mousemovetEvent(chartArea, Math.ceil(x), Math.ceil(y));
                    var crosshair = document.getElementById('container_svg').lastChild;
                    element1 = crosshair.childNodes[2].childNodes[1];
                    expect(element1.textContent == 'USA').toBe(true);
                    done();
                };
                chartObj.primaryXAxis.isInversed = true;
                chartObj.primaryYAxis.isInversed = true;
                chartObj.primaryYAxis.crosshairTooltip.enable = true;
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Inversed Axis with tooltip', function (done) {
                var element1;
                loaded = function (args) {
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(chartArea.getAttribute('y')) + parseFloat(chartArea.getAttribute('height')) / 4 + elem.offsetTop;
                    x = parseFloat(chartArea.getAttribute('x')) + parseFloat(chartArea.getAttribute('width')) + elem.offsetLeft - 20;
                    trigger.mousemovetEvent(chartArea, Math.ceil(x), Math.ceil(y));
                    element1 = document.getElementById('container_axis_tooltip_text_0');
                    expect(element1.textContent == 'USA').toBe(true);
                    done();
                };
                chartObj.primaryXAxis.isInversed = true;
                chartObj.primaryYAxis.isInversed = true;
                chartObj.primaryYAxis.crosshairTooltip.enable = true;
                chartObj.tooltip.enable = true;
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Inversed Axis with tooltip enable crosshair at other than series regions', function (done) {
                var element1;
                loaded = function (args) {
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(chartArea.getAttribute('y')) + parseFloat(chartArea.getAttribute('height')) / 4 + elem.offsetTop;
                    x = parseFloat(chartArea.getAttribute('x')) + parseFloat(chartArea.getAttribute('width')) + elem.offsetLeft - 10;
                    trigger.mousemovetEvent(chartArea, Math.ceil(x), Math.ceil(y));
                    element1 = document.getElementById('container_axis_tooltip_text_0');
                    expect(element1.textContent !== null).toBe(true);
                    var change = { changedTouches: [{ clientX: 200, clientY: 200 }] };
                    chartObj.longPress({ originalEvent: change });
                    trigger.mousemovetEvent(chartArea, 250, 250);
                    trigger.mouseupEvent(chartArea, 100, 100, 150, 150);
                    chartObj.longPress();
                    done();
                };
                chartObj.primaryXAxis.isInversed = true;
                chartObj.primaryYAxis.isInversed = true;
                chartObj.primaryYAxis.crosshairTooltip.enable = true;
                chartObj.tooltip.enable = true;
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
        });
        describe('Chart Crosshair Default', function () {
            var chartObj1;
            var elem = ej2_base_1.createElement('div', { id: 'container' });
            var targetElement;
            var loaded;
            var loaded1;
            var trigger = new events_spec_1.MouseEvents();
            var x;
            var y;
            beforeAll(function () {
                if (document.getElementById('container')) {
                    document.getElementById('container').remove();
                }
                document.body.appendChild(elem);
                chartObj1 = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis', valueType: 'Category', labelPlacement: 'OnTicks', crosshairTooltip: { enable: true } },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal', labelFormat: 'C', crosshairTooltip: { enable: true } },
                    axes: [
                        { name: 'xAxis1', opposedPosition: true, crosshairTooltip: { enable: true } },
                        { name: 'yAxis1', crosshairTooltip: { enable: true } }, { name: 'yAxis2', opposedPosition: true },
                        { name: 'xAxis2', valueType: 'DateTime', crosshairTooltip: { enable: true } },
                    ],
                    series: [{
                            dataSource: data_spec_1.categoryData, xName: 'x', yName: 'y', animation: { enable: false },
                            name: 'China', fill: '#B82E3D', width: 2, type: 'Line',
                        }, {
                            dataSource: data_spec_1.tooltipData1, xName: 'x', yName: 'y', animation: { enable: false },
                            name: 'Japan', fill: 'red', width: 2, type: 'Line', xAxisName: 'xAxis1', yAxisName: 'yAxis1'
                        },
                        {
                            dataSource: data_spec_1.datetimeData, xName: 'x', yName: 'y', animation: { enable: false },
                            name: 'Japan', fill: 'blue', width: 2, type: 'Line', xAxisName: 'xAxis2', yAxisName: 'yAxis2'
                        }
                    ], width: '1000',
                    crosshair: { enable: true },
                    title: 'Export', loaded: loaded, legendSettings: { visible: false }
                });
                chartObj1.appendTo('#container');
            });
            afterAll(function () {
                chartObj1.destroy();
                elem.remove();
            });
            it('Default Crosshair with different type of axis', function (done) {
                loaded = function (args) {
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(chartArea.getAttribute('y')) + parseFloat(chartArea.getAttribute('height')) / 4 + elem.offsetTop;
                    x = parseFloat(chartArea.getAttribute('x')) + parseFloat(chartArea.getAttribute('width')) / 2 + elem.offsetLeft;
                    trigger.mousemovetEvent(chartArea, Math.ceil(x), Math.ceil(y));
                    var crosshair = document.getElementById('container_svg').lastChild;
                    var element1;
                    expect(crosshair.style.pointerEvents).toBe('none');
                    expect(crosshair.childNodes.length == 3).toBe(true);
                    element1 = crosshair.childNodes[0];
                    expect(element1.getAttribute('d').indexOf(chartArea.getAttribute('x')) > 0).toBe(true);
                    element1 = crosshair.childNodes[1];
                    expect(element1.getAttribute('d').indexOf(chartArea.getAttribute('y')) > 0).toBe(true);
                    expect(crosshair.childNodes[2].childNodes.length == 10).toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[0];
                    expect(element1.getAttribute('d') !== '').toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[2];
                    expect(element1.getAttribute('d') !== '').toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[1];
                    expect(element1.textContent == 'Australia').toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[3];
                    expect(element1.textContent == '$59.81' || element1.textContent == '$59.73').toBe(true);
                    element1 = crosshair.childNodes[2].lastChild;
                    expect(element1.textContent == '2005').toBe(true);
                    done();
                };
                chartObj1.loaded = loaded;
                chartObj1.refresh();
            });
            it('Changing the Visibility different axis', function (done) {
                loaded = function (args) {
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(chartArea.getAttribute('y')) + parseFloat(chartArea.getAttribute('height')) / 4 + elem.offsetTop;
                    x = parseFloat(chartArea.getAttribute('x')) + parseFloat(chartArea.getAttribute('width')) / 2 + elem.offsetLeft;
                    trigger.mousemovetEvent(chartArea, Math.ceil(x), Math.ceil(y));
                    var crosshair = document.getElementById('container_svg').lastChild;
                    var element1;
                    expect(crosshair.childNodes.length == 3).toBe(true);
                    element1 = crosshair.childNodes[0];
                    expect(element1.getAttribute('d').indexOf(chartArea.getAttribute('x')) > 0).toBe(true);
                    element1 = crosshair.childNodes[1];
                    expect(element1.getAttribute('d').indexOf(chartArea.getAttribute('y')) > 0).toBe(true);
                    expect(crosshair.childNodes[2].childNodes.length == 8).toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[0];
                    expect(element1.getAttribute('d') !== '').toBe(true);
                    expect(element1.getAttribute('fill') == 'blue').toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[2];
                    expect(element1.getAttribute('d') !== '').toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[1];
                    expect(element1.textContent == '$59.81' || element1.textContent == '$59.73').toBe(true);
                    var elem1 = crosshair.childNodes[2].lastChild;
                    expect(elem1.getAttribute('fill') == 'red').toBe(true);
                    crosshair.innerHTML = '';
                    done();
                };
                chartObj1.axes[0].crosshairTooltip.enable = false;
                chartObj1.axes[2].crosshairTooltip.enable = true;
                chartObj1.axes[3].crosshairTooltip.textStyle.color = 'red';
                chartObj1.primaryXAxis.crosshairTooltip.enable = false;
                chartObj1.primaryYAxis.crosshairTooltip.fill = 'blue';
                chartObj1.loaded = loaded;
                chartObj1.refresh();
            });
            it('Changing the Visibility different axis', function (done) {
                loaded = function (args) {
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(chartArea.getAttribute('y')) + parseFloat(chartArea.getAttribute('height')) / 3 + elem.offsetTop;
                    x = parseFloat(chartArea.getAttribute('x')) + parseFloat(chartArea.getAttribute('width')) / 3 + elem.offsetLeft;
                    trigger.mousemovetEvent(chartArea, Math.ceil(x), Math.ceil(y));
                    var crosshair = document.getElementById('container_svg').lastChild;
                    var element1;
                    expect(crosshair.childNodes.length == 3).toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[1];
                    expect(element1.textContent.indexOf('#') > -1).toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[3];
                    expect(element1.textContent.indexOf('$') > -1).toBe(true);
                    done();
                };
                chartObj1.axes[0].crosshairTooltip.enable = true;
                chartObj1.axes[0].labelFormat = '{value}$';
                chartObj1.primaryYAxis.labelFormat = '#{value}';
                chartObj1.loaded = loaded;
                chartObj1.refresh();
            });
            it('crosshair with multiple axes', function (done) {
                loaded = function (args) {
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(chartArea.getAttribute('y')) + parseFloat(chartArea.getAttribute('height')) / 2 + elem.offsetTop;
                    x = parseFloat(chartArea.getAttribute('x')) + parseFloat(chartArea.getAttribute('width')) / 2 + elem.offsetLeft;
                    trigger.mousemovetEvent(chartArea, Math.ceil(x), Math.ceil(y));
                    var crosshair = document.getElementById('container_svg').lastChild;
                    var element1;
                    element1 = crosshair.childNodes[2].childNodes[1];
                    expect(element1.textContent == '105.3' || element1.textContent == '102.9').toBe(true);
                    done();
                };
                chartObj1.primaryXAxis.crosshairTooltip.enable = true;
                chartObj1.axes = [{
                        columnIndex: 1, valueType: 'DateTime', name: 'xAxis1',
                        crosshairTooltip: { enable: true }
                    }, {
                        rowIndex: 1, name: 'yAxis1',
                        crosshairTooltip: { enable: true }
                    }, {
                        rowIndex: 1, columnIndex: 1, name: 'yAxis2',
                        crosshairTooltip: { enable: true }
                    }];
                chartObj1.series = [{
                        dataSource: data_spec_1.datetimeData, xName: 'x', yName: 'y', animation: { enable: false },
                        name: 'China', fill: '#B82E3D', width: 2, type: 'Line',
                    }, {
                        dataSource: data_spec_1.datetimeData, xName: 'x', yName: 'y', animation: { enable: false },
                        name: 'Japan', fill: 'red', width: 2, type: 'Line', yAxisName: 'yAxis2', xAxisName: 'xAxis1'
                    },
                    {
                        dataSource: data_spec_1.datetimeData, xName: 'x', yName: 'y', animation: { enable: false },
                        name: 'Japan', fill: 'blue', width: 2, type: 'Line', yAxisName: 'yAxis1',
                    }
                ];
                chartObj1.rows = [{ height: '200', border: { width: 2, color: 'red' } },
                    { height: '100', border: { width: 2, color: 'red' } }];
                chartObj1.columns = [{ width: '300', border: { width: 2, color: 'black' } },
                    { width: '300', border: { width: 2, color: 'black' } }];
                chartObj1.primaryXAxis.valueType = 'DateTime';
                chartObj1.axes[0].labelFormat = '';
                chartObj1.primaryYAxis.labelFormat = '';
                chartObj1.loaded = loaded;
                chartObj1.refresh();
            });
        });
        describe('Line series point drag and drop with crosshair', function () {
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
                        crosshairTooltip: { enable: true },
                        edgeLabelPlacement: 'Shift',
                        majorGridLines: { width: 0 }
                    },
                    primaryYAxis: {
                        labelFormat: '{value}%',
                        rangePadding: 'None',
                        minimum: 0,
                        maximum: 100,
                        interval: 20,
                        crosshairTooltip: { enable: true },
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
                    tooltip: { enable: true },
                    crosshair: { enable: true },
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                element1.remove();
            });
            it('line series drag and drop with crosshair', function (done) {
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
        });
        describe('Crosshair customization', function () {
            var chartObj;
            var x;
            var y;
            var loaded;
            var trigger = new events_spec_1.MouseEvents();
            var elem = ej2_base_1.createElement('div', { id: 'crosshairContainer' });
            var series1 = [];
            var point1;
            var value = 80;
            var i;
            for (i = 1; i < 500; i++) {
                if (Math.random() > .5) {
                    value += Math.random();
                }
                else {
                    value -= Math.random();
                }
                point1 = { x: new Date(1910, i + 2, i), y: value.toFixed(1) };
                series1.push(point1);
            }
            beforeAll(function () {
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: {
                        majorGridLines: { width: 0 },
                        valueType: 'DateTime',
                        crosshairTooltip: { enable: true },
                    },
                    primaryYAxis: {
                        minimum: 83, maximum: 95, interval: 1,
                        title: 'Millions in USD',
                        labelFormat: '{value}M',
                        rowIndex: 0,
                        crosshairTooltip: {
                            enable: true
                        }
                    },
                    series: [
                        {
                            type: 'Area',
                            dataSource: series1,
                            name: 'Product X',
                            xName: 'x',
                            yName: 'y',
                            border: { width: 0.5, color: 'black' },
                        },
                    ],
                    title: 'Sales History of Product X',
                    crosshair: { enable: true },
                });
                chartObj.appendTo('#crosshairContainer');
            });
            afterAll(function () {
                chartObj.destroy();
                elem.remove();
            });
            it('X axis crosshair opacity checking', function (done) {
                loaded = function (args) {
                    var chartArea = document.getElementById('crosshairContainer_ChartAreaBorder');
                    y = parseFloat(chartArea.getAttribute('y')) + parseFloat(chartArea.getAttribute('height')) / 4 + elem.offsetTop;
                    x = parseFloat(chartArea.getAttribute('x')) + parseFloat(chartArea.getAttribute('width')) / 4 + elem.offsetLeft;
                    trigger.mousemovetEvent(chartArea, Math.ceil(x), Math.ceil(y));
                    var crosshair = document.getElementById('crosshairContainer_svg').lastChild;
                    var element1;
                    var element2;
                    expect(crosshair.childNodes.length == 3 || crosshair.childNodes.length == 2).toBe(true);
                    element1 = crosshair.childNodes[0];
                    expect(element1.getAttribute('opacity') == '0.5' || element1.getAttribute('opacity') == '1').toBe(true);
                    element2 = crosshair.childNodes[1];
                    expect(element2.getAttribute('opacity') == '0.5' || element2.getAttribute('opacity') == null).toBe(true);
                    done();
                };
                chartObj.crosshair.opacity = 0.5;
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Customizing crosshair color', function (done) {
                loaded = function (args) {
                    var chartArea = document.getElementById('crosshairContainer_ChartAreaBorder');
                    y = parseFloat(chartArea.getAttribute('y')) + parseFloat(chartArea.getAttribute('height')) / 4 + elem.offsetTop;
                    x = parseFloat(chartArea.getAttribute('x')) + parseFloat(chartArea.getAttribute('width')) / 4 + elem.offsetLeft;
                    trigger.mousemovetEvent(chartArea, Math.ceil(x), Math.ceil(y));
                    var crosshair = document.getElementById('crosshairContainer_svg').lastChild;
                    var element1;
                    var element2;
                    expect(crosshair.childNodes.length == 3 || crosshair.childNodes.length == 2).toBe(true);
                    element1 = crosshair.childNodes[0];
                    element2 = crosshair.childNodes[1];
                    expect(element1.getAttribute('fill') == 'red' || element1.getAttribute('fill') == 'transparent').toBe(true);
                    expect(element2.getAttribute('fill') == 'green' || element2.getAttribute('fill') == null).toBe(true);
                    done();
                };
                chartObj.crosshair.horizontalLineColor = 'red';
                chartObj.crosshair.verticalLineColor = 'green';
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
