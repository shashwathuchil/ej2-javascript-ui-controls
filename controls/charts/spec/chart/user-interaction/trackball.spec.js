define(["require", "exports", "@syncfusion/ej2-base", "../../../src/chart/chart", "../../../src/chart/series/line-series", "../../../src/chart/series/column-series", "../../../src/chart/user-interaction/crosshair", "../base/events.spec", "../base/data.spec", "../../../src/chart/axis/date-time-axis", "../../../src/chart/user-interaction/tooltip", "../../../src/chart/axis/category-axis", "../../../src/chart/user-interaction/data-editing", "../../common.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, chart_1, line_series_1, column_series_1, crosshair_1, events_spec_1, data_spec_1, date_time_axis_1, tooltip_1, category_axis_1, data_editing_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(line_series_1.LineSeries, column_series_1.ColumnSeries, date_time_axis_1.DateTime, category_axis_1.Category);
    chart_1.Chart.Inject(crosshair_1.Crosshair, tooltip_1.Tooltip, data_editing_1.DataEditing);
    describe('Chart Trackball', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('Chart Trackball Default', function () {
            var chartObj;
            var elem = ej2_base_1.createElement('div', { id: 'container' });
            var targetElement;
            var loaded;
            var loaded1;
            var trigger = new events_spec_1.MouseEvents();
            var x;
            var y;
            beforeAll(function () {
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis', valueType: 'Category', crosshairTooltip: { enable: true } },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal', labelFormat: 'C', crosshairTooltip: { enable: true } },
                    series: [{
                            dataSource: data_spec_1.track1, xName: 'x', yName: 'y', animation: { enable: false },
                            name: 'Japan', fill: '#B82E3D', width: 2,
                            type: 'Line', marker: { visible: true, height: 8, width: 8 },
                        }, {
                            dataSource: data_spec_1.track2, xName: 'x', yName: 'y', animation: { enable: false },
                            name: 'Japan1', fill: 'blue', width: 2,
                            type: 'Line', marker: { visible: true, height: 8, width: 8 },
                        },
                        {
                            dataSource: data_spec_1.track3, xName: 'x', yName: 'y', animation: { enable: false },
                            name: 'Japan2', fill: 'aqua', width: 2,
                            type: 'Line', marker: { visible: true, height: 8, width: 8 },
                        },
                        {
                            dataSource: data_spec_1.track4, xName: 'x', yName: 'y', animation: { enable: false },
                            name: 'Japan3', fill: 'red', width: 2,
                            type: 'Line', marker: { visible: true, height: 8, width: 8 },
                        }
                    ], width: '1000',
                    tooltip: { enable: true, shared: true },
                    crosshair: { enable: true },
                    title: 'Export', loaded: loaded, legendSettings: { visible: false }
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                elem.remove();
                ej2_base_1.remove(document.getElementById('container_tooltip'));
            });
            it('Default Trackball with shared tooltip', function (done) {
                loaded = function (args) {
                    targetElement = chartObj.element.querySelector('#container_Series_0_Point_1_Symbol');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(targetElement.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = parseFloat(targetElement.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(targetElement, Math.ceil(x), Math.ceil(y));
                    var crosshair = document.getElementById('container_UserInteraction');
                    expect(crosshair.childNodes.length == 3).toBe(true);
                    var element1;
                    element1 = crosshair.childNodes[0];
                    expect(element1.getAttribute('d').indexOf(chartArea.getAttribute('x')) > 0).toBe(true);
                    element1 = crosshair.childNodes[1];
                    expect(element1.getAttribute('d').indexOf(chartArea.getAttribute('y')) > 0).toBe(true);
                    expect(crosshair.childNodes[2].childNodes.length == 4).toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[0];
                    expect(element1.getAttribute('d') !== '').toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[2];
                    expect(element1.getAttribute('d') !== '').toBe(true);
                    expect(crosshair.childNodes[2].childNodes.length == 4).toBe(true);
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    var group = tooltip.childNodes[0].childNodes[0];
                    var path = group.childNodes[0];
                    var text = group.childNodes[1];
                    var headerPath = group.childNodes[2];
                    var Icons = group.childNodes[4];
                    expect(path.localName == 'path').toBe(true);
                    expect(path.getAttribute('d') != '' || ' ').toBe(true);
                    expect(headerPath.getAttribute('d') != '' || ' ').toBe(true);
                    expect(Icons.childNodes.length == 4).toBe(true);
                    expect(text.textContent.replace(/\u200E/g, '') === 'FebJapan : -$1.00Japan1 : $3.50Japan2 : $8.00Japan3 : $10.00').toBe(true);
                    var trackSymbol = document.querySelectorAll('.EJ2-Trackball');
                    expect(trackSymbol.length === 0).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('With Column type series', function (done) {
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_2');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = series.points[2].regions[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = series.points[2].regions[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var crosshair = document.getElementById('container_UserInteraction');
                    expect(crosshair.childNodes.length == 3).toBe(true);
                    var element1;
                    element1 = crosshair.childNodes[0];
                    expect(element1.getAttribute('d') == '').toBe(true);
                    expect(crosshair.childNodes[2].childNodes.length == 2).toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[0];
                    expect(element1.getAttribute('d') !== '').toBe(true);
                    expect(crosshair.childNodes[2].childNodes[1].textContent == 'Mar').toBe(true);
                    expect(crosshair.childNodes[2].childNodes.length == 2).toBe(true);
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    var group = tooltip.childNodes[0].childNodes[0];
                    var path = group.childNodes[0];
                    expect(path.localName == 'path').toBe(true);
                    expect(path.getAttribute('d') != '' || ' ').toBe(true);
                    expect(group.childNodes.length == 5).toBe(true);
                    expect(group.childNodes[1].childNodes.length == 17).toBe(true);
                    expect(target.getAttribute('opacity') == '0.5').toBe(true);
                    expect(document.getElementById('container_Series_1_Point_2').getAttribute('opacity') == '0.5').toBe(true);
                    expect(document.getElementById('container_Series_2_Point_2').getAttribute('opacity') == '0.5').toBe(true);
                    expect(document.getElementById('container_Series_3_Point_2').getAttribute('opacity') == '0.5').toBe(true);
                    done();
                };
                chartObj.series[0].type = 'Column';
                chartObj.series[1].type = 'Column';
                chartObj.series[2].type = 'Column';
                chartObj.series[3].type = 'Column';
                chartObj.primaryYAxis.crosshairTooltip.enable = false;
                chartObj.crosshair.lineType = 'Vertical';
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking the visibility of series with tooltip', function (done) {
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_4');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = series.points[2].regions[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = series.points[2].regions[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    expect(tooltip.offsetLeft > x).toBe(true);
                    var group = tooltip.childNodes[0].childNodes[0];
                    expect(group.childNodes[1].childNodes.length == 13).toBe(true);
                    done();
                };
                chartObj.series[2].visible = false;
                chartObj.crosshair.lineType = 'Horizontal';
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking the with null points', function (done) {
                data_spec_1.track1[4].y = null;
                data_spec_1.track1[7].y = null;
                data_spec_1.track2[5].y = null;
                data_spec_1.track2[8].y = null;
                data_spec_1.track2[data_spec_1.track2.length - 1].y = null;
                loaded = function (args) {
                    targetElement = chartObj.element.querySelector('#container_Series_1_Point_4_Symbol');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(targetElement.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = parseFloat(targetElement.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(targetElement, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    var transform = document.getElementById('container_tooltip_group').getAttribute('transform').split('(');
                    var translateX = transform[1].split(',');
                    expect(parseFloat(translateX[0]) < x).toBe(true);
                    var group = tooltip.childNodes[0].childNodes[0];
                    expect(group.childNodes[4].childNodes.length == 1).toBe(true);
                    expect(group.childNodes[1].childNodes.length == 5).toBe(true);
                    targetElement = chartObj.element.querySelector('#container_Series_0_Point_11_Symbol');
                    y = parseFloat(targetElement.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = parseFloat(targetElement.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft - 10;
                    trigger.mousemovetEvent(targetElement, Math.ceil(x), Math.ceil(y));
                    tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    done();
                };
                chartObj.series = [];
                chartObj.series = [{
                        dataSource: data_spec_1.track1, xName: 'x', yName: 'y', animation: { enable: false },
                        name: 'Japan', fill: '#B82E3D', width: 2,
                        type: 'Line', marker: { visible: true, height: 8, width: 8 },
                    }, {
                        dataSource: data_spec_1.track2, xName: 'x', yName: 'y', animation: { enable: false },
                        name: 'Japan', fill: 'blue', width: 2,
                        type: 'Line', marker: { visible: true, height: 8, width: 8 },
                    }];
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.labelPlacement = 'OnTicks';
                chartObj.refresh();
            });
            it('Checking the areabounds', function (done) {
                var animate = function (args) {
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    done();
                };
                chartObj.crosshair.lineType = 'Both';
                chartObj.animationComplete = animate;
                chartObj.dataBind();
                targetElement = chartObj.element.querySelector('#container_Series_0_Point_0_Symbol');
                var chartArea = document.getElementById('container_ChartAreaBorder');
                y = parseFloat(chartArea.getAttribute('height')) + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                x = parseFloat(targetElement.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                trigger.mousemovetEvent(targetElement, Math.ceil(x), Math.ceil(y));
            });
            it('Checking the single series', function (done) {
                data_spec_1.track1[4].y = 24;
                data_spec_1.track1[7].y = -16;
                data_spec_1.track2[5].y = 23;
                data_spec_1.track2[8].y = -11;
                data_spec_1.track2[data_spec_1.track2.length - 1].y = null;
                loaded = function (args) {
                    targetElement = chartObj.element.querySelector('#container_Series_0_Point_0_Symbol');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(targetElement.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = parseFloat(targetElement.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(targetElement, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    expect(tooltip.offsetLeft + elem.offsetLeft < x).toBe(true);
                    tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    done();
                };
                chartObj.series = [];
                chartObj.series = [{
                        dataSource: data_spec_1.track1, xName: 'x', yName: 'y', animation: { enable: false },
                        name: 'Japan', fill: '#B82E3D', width: 2,
                        type: 'Line', marker: { visible: true, height: 8, width: 8 },
                    }];
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.labelPlacement = 'OnTicks';
                chartObj.tooltip.format = '${point.x}';
                chartObj.tooltip.header = '';
                chartObj.refresh();
            });
            it('Checking the single series with column series', function (done) {
                data_spec_1.track1[4].y = 24;
                data_spec_1.track1[7].y = -16;
                data_spec_1.track2[5].y = 23;
                data_spec_1.track2[8].y = -11;
                data_spec_1.track2[data_spec_1.track2.length - 1].y = null;
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_7');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = series.points[7].regions[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = series.points[7].regions[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    expect(tooltip.offsetTop > y + series.points[7].regions[0].height).toBe(true);
                    target = document.getElementById('container_Series_0_Point_1');
                    series = chartObj.series[0];
                    y = series.points[1].regions[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = series.points[1].regions[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var change = { changedTouches: [{ clientX: 100, clientY: 100 }] };
                    chartObj.longPress({ originalEvent: change });
                    chartObj.longPress();
                    done();
                };
                chartObj.series[0].type = 'Column';
                chartObj.loaded = loaded;
                chartObj.tooltipRender = function (args) {
                    args.text = args.text + 'custom';
                    if (args.point.index == 1) {
                        args.cancel = true;
                    }
                };
                chartObj.primaryXAxis.labelPlacement = 'OnTicks';
                chartObj.tooltip.format = '${point.y}';
                chartObj.refresh();
            });
        });
        describe('Chart Trackball Default', function () {
            var chartObj;
            var elem = ej2_base_1.createElement('div', { id: 'container' });
            var targetElement;
            var loaded;
            var loaded1;
            var trigger = new events_spec_1.MouseEvents();
            var x;
            var y;
            beforeAll(function () {
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis', valueType: 'Category', crosshairTooltip: { enable: true } },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal', labelFormat: 'C', crosshairTooltip: { enable: true } },
                    series: [{
                            dataSource: [{ x: 'Jan', y: -1, color: 'red' }, { x: 'Feb', y: -1, color: 'blue' }, { x: 'Mar', y: 2, color: 'green' }, { x: 'Apr', y: 8 },
                                { x: 'May', y: 13, color: 'orange' }, { x: 'Jun', y: 18, color: 'purple' }, { x: 'Jul', y: 21, color: 'pink' }, { x: 'yellow', y: 20, color: 'red' },
                                { x: 'Sep', y: 16, color: 'teal' }, { x: 'Oct', y: 10, color: 'violet' }, { x: 'Nov', y: 4, color: 'black' }, { x: 'Dec', y: 0, color: 'whitesmoke' }],
                            xName: 'x', yName: 'y', animation: { enable: false },
                            name: 'Japan', fill: '#B82E3D', width: 2,
                            type: 'Line', pointColorMapping: 'color'
                        }
                    ], width: '1000',
                    crosshair: {
                        enable: true,
                        lineType: 'Vertical'
                    },
                    tooltip: { enable: true, shared: true },
                    title: 'Export', loaded: loaded, legendSettings: { visible: false }
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                elem.remove();
                ej2_base_1.remove(document.getElementById('container_tooltip'));
            });
            it('Default Trackball with shared tooltip', function (done) {
                loaded = function (args) {
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = series.points[5].symbolLocations[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = series.points[5].symbolLocations[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(elem, Math.ceil(x), Math.ceil(y));
                    var marker = document.getElementById('container_Series_0_Point_5_Trackball_0');
                    expect(marker.getAttribute('fill')).toBe('transparent');
                    expect(marker.getAttribute('stroke')).toBe('rgba(128,0,128,0.2)');
                    marker = document.getElementById('container_Series_0_Point_5_Trackball_1');
                    expect(marker.getAttribute('fill')).toBe('#ffffff');
                    expect(marker.getAttribute('stroke')).toBe('purple');
                    y = series.points[0].symbolLocations[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = series.points[0].symbolLocations[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(elem, Math.ceil(x), Math.ceil(y));
                    marker = document.getElementById('container_Series_0_Point_0_Trackball_1');
                    expect(marker.getAttribute('fill')).toBe('#ffffff');
                    expect(marker.getAttribute('stroke')).toBe('red');
                    y = series.points[11].symbolLocations[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = series.points[11].symbolLocations[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(elem, Math.ceil(x), Math.ceil(y));
                    marker = document.getElementById('container_Series_0_Point_11_Trackball_1');
                    expect(marker.getAttribute('fill')).toBe('#ffffff');
                    expect(marker.getAttribute('stroke')).toBe('whitesmoke');
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Default Trackball with shared tooltip', function (done) {
                loaded = function (args) {
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = series.points[5].symbolLocations[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = series.points[5].symbolLocations[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(elem, Math.ceil(x), Math.ceil(y));
                    var marker = document.getElementById('container_Series_0_Point_5_Trackball_0');
                    expect(marker).toBe(null);
                    marker = document.getElementById('container_Series_1_Point_5_Trackball_0');
                    expect(marker !== null);
                    done();
                };
                chartObj.series[0].enableTooltip = false;
                chartObj.loaded = loaded;
                chartObj.addSeries([{
                        dataSource: [{ x: 'Jan', y: 11, color: 'red' }, { x: 'Feb', y: -1, color: 'blue' }, { x: 'Mar', y: 2, color: 'green' }, { x: 'Apr', y: -8 },
                            { x: 'May', y: 15, color: 'orange' }, { x: 'Jun', y: 14, color: 'purple' }, { x: 'Jul', y: 31, color: 'pink' }, { x: 'yellow', y: 23, color: 'red' },
                            { x: 'Sep', y: 17, color: 'teal' }, { x: 'Oct', y: 19, color: 'violet' }, { x: 'Nov', y: 14, color: 'black' }, { x: 'Dec', y: 10, color: 'whitesmoke' }],
                        xName: 'x', yName: 'y', animation: { enable: false },
                        name: 'Japan', fill: '#B82E3D', width: 2,
                        type: 'Column', pointColorMapping: 'color'
                    }]);
            });
            it('Trackball with shared tooltip and marker false for column series', function (done) {
                loaded = function (args) {
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = series.points[5].symbolLocations[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = series.points[5].symbolLocations[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(elem, Math.ceil(x), Math.ceil(y));
                    var marker = document.getElementById('container_Series_0_Point_5_Trackball_0');
                    expect(marker).toBe(null);
                    marker = document.getElementById('container_Series_1_Point_5_Trackball_0');
                    expect(marker).toBe(null);
                    done();
                };
                chartObj.series[0].enableTooltip = true;
                chartObj.tooltip.enable = true;
                chartObj.tooltip.shared = true;
                chartObj.series[0].type = 'Column';
                chartObj.series[0].marker.visible = false;
                chartObj.series[1].marker.visible = false;
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Trackball checked with header text', function (done) {
                loaded = function (args) {
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = series.points[5].symbolLocations[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = series.points[5].symbolLocations[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(elem, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip_text');
                    expect(tooltip.firstElementChild.innerHTML).toEqual('TrackBallTooltip');
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.sharedTooltipRender = function (args) {
                    args.headerText = 'TrackBallTooltip';
                };
                chartObj.refresh();
            });
        });
        describe('Line series point drag and drop with trackball', function () {
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
                    tooltip: { enable: true, shared: true },
                    crosshair: { enable: true, lineType: 'Vertical' },
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                element1.remove();
            });
            it('line series drag and drop with trackball', function (done) {
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
        it('memory leak', function () {
            common_spec_1.profile.sample();
            var average = common_spec_1.inMB(common_spec_1.profile.averageChange);
            expect(average).toBeLessThan(10);
            var memory = common_spec_1.inMB(common_spec_1.getMemoryProfile());
            expect(memory).toBeLessThan(common_spec_1.profile.samples[0] + 0.25);
        });
    });
});
