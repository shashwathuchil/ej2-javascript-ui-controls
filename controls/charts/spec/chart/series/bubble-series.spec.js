define(["require", "exports", "@syncfusion/ej2-base", "../../../src/chart/chart", "../../../src/chart/series/data-label", "../../../src/chart/legend/legend", "../../../src/chart/series/bubble-series", "../../../src/chart/series/bar-series", "../../../src/chart/series/line-series", "../../../src/chart/axis/category-axis", "../../../src/chart/axis/date-time-axis", "../../../src/chart/axis/logarithmic-axis", "../../../src/chart/user-interaction/tooltip", "../../../src/chart/user-interaction/selection", "../../../src/chart/user-interaction/crosshair", "../../../src/chart/user-interaction/zooming", "../../../src/chart/user-interaction/data-editing", "../base/events.spec", "../base/data.spec", "../../common.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, chart_1, data_label_1, legend_1, bubble_series_1, bar_series_1, line_series_1, category_axis_1, date_time_axis_1, logarithmic_axis_1, tooltip_1, selection_1, crosshair_1, zooming_1, data_editing_1, events_spec_1, data_spec_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(bar_series_1.BarSeries, bubble_series_1.BubbleSeries, line_series_1.LineSeries, category_axis_1.Category, tooltip_1.Tooltip, date_time_axis_1.DateTime, logarithmic_axis_1.Logarithmic, legend_1.Legend, data_label_1.DataLabel, selection_1.Selection, zooming_1.Zoom, crosshair_1.Crosshair, data_editing_1.DataEditing);
    var datetime = data_spec_1.datetimeData;
    var trigger = new events_spec_1.MouseEvents();
    var seriesColor = ['#00bdae', '#404041', '#357cd2', '#e56590', '#f8b883',
        '#70ad47', '#dd8abd', '#7f84e8', '#7bb4eb', '#ea7a57'];
    var borderWidth = [0.5, 1, 1.3, 2.5, 3, 1.5, 1.9, 1.24];
    var opacity = [0.1, 0.2, 1, 0.3, 0.4, 0.5, 0.1, 0.3];
    var labelRender = function (args) {
        args.fill = seriesColor[args.point.index];
        args.border.width = borderWidth[args.point.index];
    };
    exports.data = [
        { x: 1000, y: 2, size: 5000 }, { x: 2000, y: 89, size: 6000, }, { x: 3000, y: 3, size: -30000 }, { x: 4000, y: 15, size: 14000 },
        { x: 5000, y: 16, size: -30000 }, { x: 6000, y: 10, size: 13000 },
        { x: 7000, y: -60, size: 18000 }, { x: 8000, y: 90, size: 12000 }, { x: 9000, y: 23, size: 10000 }, { x: 10000, y: 41, size: 15000 }
    ];
    exports.dataText = [
        { x: 1000, y: 2, size: 5000 }, { x: 2000, y: 89, size: 6000, text: 'Australia is the greatest country' },
        { x: 3000, y: 3, size: -30000 }, { x: 4000, y: 15, size: 14000 },
        { x: 5000, y: 16, size: -30000, text: 'America is the greatest country' }, { x: 6000, y: 10, size: 13000 },
        { x: 7000, y: -60, size: 18000 }, { x: 8000, y: 21, size: 12000, text: 'Somalia is the greatest country' },
        { x: 9000, y: 22, size: 10000, text: 'Japan is the greatest country' }, { x: 10000, y: 41, size: 15000 }
    ];
    exports.data2 = [
        { x: 1000, y: 12, size: 5000 }, { x: 2000, y: 8, size: 6000 }, { x: 3000, y: 30, size: -30000 }, { x: 4000, y: 60, size: 14000 },
        { x: 5000, y: 25, size: -30000 }, { x: 6000, y: 34, size: 13000 },
        { x: 7000, y: -60, size: 18000 }, { x: 8000, y: 51, size: 12000 }, { x: 9000, y: 49, size: 10000 }, { x: 10000, y: 42, size: 15000 }
    ];
    exports.Datedata = [
        { x: new Date(0, 0, 2000), y: 2, size: 5000 }, { x: new Date(0, 0, 2001), y: 89, size: 6000 },
        { x: new Date(0, 0, 2002), y: 3, size: -30000 }, { x: new Date(0, 0, 2003), y: 0, size: 14000 },
        { x: new Date(0, 0, 2004), y: 16, size: -30000 }, { x: new Date(0, 0, 2005), y: 0, size: 13000 },
        { x: new Date(0, 0, 2006), y: -60, size: 18000 }, { x: new Date(0, 0, 2007), y: 21, size: 12000 },
        { x: new Date(0, 0, 2008), y: 23, size: 10000 }, { x: new Date(0, 0, 2009), y: 41, size: 15000 }
    ];
    exports.categorySize = [
        { x: 'USA', y: 70, size: 0.01 }, { x: 'China', y: 60, size: 0.1 },
        { x: 'Japan', y: 60, size: 0.08 }, { x: 'Australia', y: 56, size: 0.15 },
        { x: 'France1', y: 45, size: 0.121 }, { x: 'Germany1', y: 30, size: -0.01 },
        { x: 'Italy', y: 35, size: 0.2 }, { x: 'Sweden', y: 25, size: 0.3 }
    ];
    exports.logData = [
        { x: 1000, y: 2, size: 5000, }, { x: 2000, y: 89, size: 6000 }, { x: 3000, y: 3, size: 30000 }, { x: 4000, y: 0, size: 14000 },
        { x: 4100, y: 10, size: 14000 }, { x: 5000, y: 16, size: 30000 }, { x: 6000, y: 0, size: 13000 }, { x: 7000, y: 60, size: 18000 },
        { x: 8000, y: 21, size: 12000 }, { x: 9000, y: 23, size: 10000 }, { x: 10000, y: 41, size: 15000 }
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
        describe('Chart Bubble series', function () {
            var chartObj;
            var elem;
            var svg;
            var datalabel;
            var series;
            var radius;
            var targetElement;
            var point;
            var axisLabel;
            var labelText;
            var loaded;
            var trigger = new events_spec_1.MouseEvents();
            var x;
            var y;
            var elementSelect;
            var selected;
            var tooltip;
            var tooltipY;
            var dataLabelY;
            beforeAll(function () {
                if (document.getElementById('container')) {
                    document.getElementById('container').remove();
                }
                elem = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis', },
                    primaryYAxis: { title: 'PrimaryYAxis', },
                    series: [{
                            dataSource: exports.data, xName: 'x', yName: 'y', size: 'size', animation: { enable: false }, type: 'Bubble',
                            name: 'ChartSeriesNameGold', fill: 'green', minRadius: null, maxRadius: null,
                        },
                    ],
                    title: 'Chart TS Title', legendSettings: { visible: true },
                    selectionMode: 'Point',
                    tooltip: {
                        enable: true,
                        enableAnimation: true
                    }
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
                    expect(svg.getAttribute('fill')).toEqual('green');
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('checking with opacity', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_1');
                    expect(parseFloat(svg.getAttribute('opacity'))).toEqual(0.5);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].opacity = 0.5;
                chartObj.series[0].maxRadius = 2;
                chartObj.refresh();
            });
            it('Checking with undefined size', function (done) {
                loaded = function (args) {
                    expect((args.chart.series[0]).sizeMax !== undefined).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = exports.data;
                chartObj.series[0].dataSource[0].size = undefined;
                chartObj.refresh();
            });
            it('Checking with null Points', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_3');
                    expect(svg == null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = exports.data;
                chartObj.series[0].dataSource[3].y = null;
                chartObj.series[0].dataSource[0].size = 5000;
                chartObj.refresh();
            });
            it('Checking with negative Points', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container1_AxisLabel_4');
                    series = args.chart.series[0];
                    expect(parseFloat(svg.getAttribute('y')) < series.points[6].symbolLocations[0].y).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.visible = true;
                chartObj.refresh();
            });
            it('Checking with single Points', function (done) {
                loaded = function (args) {
                    var seriesGroup = document.getElementById('containerSeriesGroup0');
                    expect(seriesGroup.childElementCount === 2).toBe(true);
                    svg = document.getElementById('container_Series_0_Point_0');
                    expect(svg != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = null;
                chartObj.series[0].dataSource = [{ x: 1, y: 10, size: 200 }];
                chartObj.series[0].minRadius = 2;
                chartObj.series[0].maxRadius = 4;
                chartObj.refresh();
            });
            it('Checking with size as negative value', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_0');
                    expect(svg != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = [{ x: 1, y: 10, size: -200 }];
                chartObj.refresh();
            });
            it('Checking with single Points with radius change', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_0');
                    radius = parseFloat(svg.getAttribute('rx'));
                    expect(+radius.toFixed(2) > 19).toBe(true);
                    expect(svg != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = null;
                chartObj.series[0].dataSource = [{ x: 1, y: 10, size: 200 }];
                chartObj.series[0].minRadius = 1;
                chartObj.series[0].maxRadius = 6;
                chartObj.refresh();
            });
            it('Checking without size given', function (done) {
                loaded = function (args) {
                    point = document.getElementById('container_Series_0_Point_0');
                    expect(point != null).toBe(true);
                    expect(+point.getAttribute('rx') > 3).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = data_spec_1.tool1;
                chartObj.refresh();
            });
            it('Checking with category axis BetweenTicks', function (done) {
                loaded = function (args) {
                    point = document.getElementById('container_Series_0_Point_0');
                    expect(point != null).toBe(true);
                    axisLabel = document.getElementById('container0_AxisLabel_0');
                    expect(axisLabel.textContent).toEqual('USA');
                    var axisStart = document.getElementById('containerAxisLine_0');
                    expect(+(axisLabel.getAttribute('x')) > +(axisStart.getAttribute('d').split(' ')[1])).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.primaryXAxis.labelPlacement = 'BetweenTicks';
                chartObj.series[0].dataSource = exports.categorySize;
                chartObj.series[0].minRadius = 1;
                chartObj.series[0].maxRadius = 3;
                chartObj.refresh();
            });
            it('Checking with category axis OnTicks', function (done) {
                loaded = function (args) {
                    point = document.getElementById('container_Series_0_Point_0');
                    expect(point != null).toBe(true);
                    axisLabel = document.getElementById('container0_AxisLabel_0');
                    expect(axisLabel.textContent).toEqual('USA');
                    var axisStart = document.getElementById('containerAxisLine_0');
                    expect(+(axisLabel.getAttribute('x')) < +(axisStart.getAttribute('d').split(' ')[1])).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.primaryXAxis.labelPlacement = 'OnTicks';
                chartObj.series[0].dataSource = exports.categorySize;
                chartObj.refresh();
            });
            it('Checking with DateTime axis', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_0');
                    expect(svg != null).toBe(true);
                    axisLabel = document.getElementById('container0_AxisLabel_0');
                    expect(axisLabel.textContent === '23' || axisLabel.textContent === '24').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'DateTime';
                chartObj.series[0].dataSource = exports.Datedata;
                chartObj.refresh();
            });
            it('Checking with multiple series', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_1');
                    expect(svg.getAttribute('fill')).toEqual('red');
                    svg = document.getElementById('container_Series_1_Point_1');
                    expect(svg.getAttribute('fill')).toEqual('rgba(135,206,235,1)');
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series = [{
                        dataSource: exports.data, xName: 'x', yName: 'y', size: 'size', name: 'Gold', fill: 'red',
                        type: 'Bubble', animation: { enable: false }
                    },
                    {
                        dataSource: exports.data2, xName: 'x', name: 'silver', yName: 'y', size: 'size', fill: 'rgba(135,206,235,1)',
                        type: 'Bubble', animation: { enable: false }
                    }];
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.refresh();
            });
            it('Checking with multiple series with other series', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_1');
                    expect(svg.getAttribute('fill')).toEqual('red');
                    svg = document.getElementById('container_Series_1_Point_1');
                    expect(svg).toEqual(null);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series = [{
                        dataSource: exports.data, xName: 'x', yName: 'y', size: 'size', name: 'Gold', fill: 'red',
                        type: 'Bubble', animation: { enable: false }
                    },
                    {
                        dataSource: exports.data2, xName: 'x', name: 'silver', yName: 'y', size: 'size', fill: 'rgba(135,206,235,1)',
                        type: 'Bar', animation: { enable: false }
                    }];
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.refresh();
            });
            it('Checking with Logarithmic axis ', function (done) {
                loaded = function (args) {
                    axisLabel = document.getElementById('container1_AxisLabel_1');
                    expect(axisLabel.textContent).toEqual('10');
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.primaryYAxis.valueType = 'Logarithmic';
                chartObj.series[0].dataSource = exports.logData;
                chartObj.series.length = 1;
                chartObj.refresh();
            });
            it('Checking with Logarithmic axis in xAxis ', function (done) {
                loaded = function (args) {
                    axisLabel = document.getElementById('container0_AxisLabel_0');
                    expect(axisLabel.textContent).toEqual('100');
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Logarithmic';
                chartObj.primaryYAxis.valueType = 'Logarithmic';
                chartObj.series[0].dataSource = exports.logData;
                chartObj.series.length = 1;
                chartObj.refresh();
            });
            it('Checking with border', function (done) {
                loaded = function (args) {
                    point = document.getElementById('container_Series_0_Point_0');
                    expect(+(point.getAttribute('stroke-width'))).toEqual(2);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.series[0].border.color = 'red';
                chartObj.series[0].border.width = 2;
                chartObj.refresh();
            });
            it('checking with fill for points using events', function (done) {
                var series2 = chartObj.series[0];
                loaded = function (args) {
                    point = document.getElementById('container_Series_0_Point_0');
                    expect(point.getAttribute('fill')).toEqual('#00bdae');
                    point = document.getElementById('container_Series_0_Point_2');
                    expect(point.getAttribute('fill')).toEqual('#357cd2');
                    expect(+(point.getAttribute('opacity'))).toEqual(1);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.pointRender = labelRender;
                chartObj.refresh();
            });
            it('checking marker visible as true', function (done) {
                loaded = function (args) {
                    var marker = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(marker).toEqual(null);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.visible = true;
                chartObj.refresh();
            });
            it('checking with datalabel position as default', function (done) {
                loaded = function (args) {
                    point = document.getElementById('container_Series_0_Point_1');
                    labelText = document.getElementById('container_Series_0_Point_1_Text_0');
                    expect(+(point.getAttribute('cy')) - +(point.getAttribute('ry')) > +(labelText.getAttribute('y'))).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.primaryYAxis.valueType = 'Double';
                chartObj.series[0].dataSource = exports.dataText;
                chartObj.series[0].marker.dataLabel.name = 'text';
                chartObj.series[0].marker.dataLabel.visible = true;
                chartObj.refresh();
            });
            it('checking with datalabel position as Top', function (done) {
                loaded = function (args) {
                    point = document.getElementById('container_Series_0_Point_1');
                    labelText = document.getElementById('container_Series_0_Point_1_Text_0');
                    expect(+(point.getAttribute('cy')) - +(point.getAttribute('ry')) > +(labelText.getAttribute('y'))).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = exports.data;
                chartObj.series[0].marker.dataLabel.visible = true;
                chartObj.series[0].marker.dataLabel.position = 'Top';
                chartObj.refresh();
            });
            it('checking with datalabel position as Middle', function (done) {
                loaded = function (args) {
                    point = document.getElementById('container_Series_0_Point_1');
                    labelText = document.getElementById('container_Series_0_Point_1_Text_0');
                    expect(+(point.getAttribute('cx'))).toEqual(+(labelText.getAttribute('x')));
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.visible = true;
                chartObj.series[0].marker.dataLabel.position = 'Middle';
                chartObj.refresh();
            });
            it('checking with datalabel position as Bottom', function (done) {
                loaded = function (args) {
                    point = document.getElementById('container_Series_0_Point_1');
                    labelText = document.getElementById('container_Series_0_Point_1_Text_0');
                    expect(+(point.getAttribute('cy')) + +(point.getAttribute('ry')) < +(labelText.getAttribute('y'))).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Bottom';
                chartObj.refresh();
            });
            it('checking with datalabel position as Bottom with border', function (done) {
                loaded = function (args) {
                    var shape = document.getElementById('container_Series_0_Point_0_TextShape_0');
                    expect(shape).not.toEqual(null);
                    expect(shape.getAttribute('stroke')).toEqual('blue');
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Bottom';
                chartObj.series[0].marker.dataLabel.border.color = 'blue';
                chartObj.series[0].marker.dataLabel.border.width = 1;
                chartObj.refresh();
            });
            it('Checking Legend Shape ', function (done) {
                loaded = function (args) {
                    var legendElement = document.getElementById('container_chart_legend_shape_0');
                    expect(legendElement.tagName).toEqual('ellipse');
                    expect(legendElement.getAttribute('rx')).toEqual('5');
                    expect(legendElement.getAttribute('ry')).toEqual('5');
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('bubble Tooltip', function (done) {
                loaded = function (args) {
                    targetElement = document.getElementById('container_Series_0_Point_2');
                    series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = series.points[2].symbolLocations[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = series.points[2].symbolLocations[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(targetElement, Math.ceil(x), Math.ceil(y));
                    tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    var trackSymbol = document.getElementById('containerSeriesGroup0').lastChild;
                    expect(trackSymbol != null).toBe(true);
                    expect(targetElement.getAttribute('opacity')).toEqual('1');
                    expect(parseFloat(tooltip.style.top) > series.points[2].regions[0].y + parseFloat(chartArea.getAttribute('y')));
                    targetElement = document.getElementById('container_Series_0_Point_0');
                    y = series.points[0].regions[0].y + series.points[0].regions[0].height / 2 + parseFloat(chartArea.getAttribute('y')) +
                        elem.offsetTop;
                    x = series.points[0].regions[0].x + series.points[0].regions[0].width / 2 + parseFloat(chartArea.getAttribute('x')) +
                        elem.offsetLeft;
                    trigger.mousemovetEvent(targetElement, Math.ceil(x), Math.ceil(y));
                    expect(targetElement.getAttribute('opacity')).toEqual('1');
                    expect(+(tooltip.style.left) > series.points[0].regions[0].width / 2 + series.points[0].regions[0].x +
                        +(chartArea.getAttribute('x')));
                    targetElement = document.getElementById('container_Series_0_Point_7');
                    y = series.points[7].regions[0].y + series.points[7].regions[0].height / 2 + parseFloat(chartArea.getAttribute('y')) +
                        elem.offsetTop;
                    x = series.points[7].regions[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(targetElement, Math.ceil(x), Math.ceil(y));
                    expect(tooltip != null).toBe(true);
                    expect(targetElement.getAttribute('opacity')).toEqual('1');
                    targetElement = document.getElementById('container_tooltip_text');
                    expect(targetElement.textContent.replace(/\u200E/g, '')).toEqual('Gold8000 : 90  Size : 12000');
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = exports.data;
                chartObj.series[0].marker.visible = false;
                chartObj.refresh();
            });
            it('Checking tooltip with datalabel position as Middle', function (done) {
                loaded = function (args) {
                    targetElement = document.getElementById('container_Series_0_Point_2');
                    series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = series.points[2].symbolLocations[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = series.points[2].symbolLocations[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(targetElement, Math.ceil(x), Math.ceil(y));
                    tooltip = document.getElementById('container_tooltip');
                    expect(tooltip).not.toEqual(null);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.visible = true;
                chartObj.series[0].marker.dataLabel.position = 'Middle';
                chartObj.refresh();
            });
            it('Checking tooltip with datalabel position as Middle and border', function (done) {
                loaded = function (args) {
                    targetElement = document.getElementById('container_Series_0_Point_2');
                    series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = series.points[2].symbolLocations[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = series.points[2].symbolLocations[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(targetElement, Math.ceil(x), Math.ceil(y));
                    tooltip = document.getElementById('container_tooltip');
                    expect(tooltip).not.toEqual(null);
                    tooltipY = parseFloat(tooltip.style.top);
                    labelText = document.getElementById('container_Series_0_Point_2_TextShape_0');
                    dataLabelY = parseFloat(labelText.getAttribute('y'));
                    expect(tooltipY != dataLabelY).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.visible = true;
                chartObj.series[0].marker.dataLabel.position = 'Middle';
                chartObj.series[0].marker.dataLabel.border.width = 2;
                chartObj.series[0].marker.dataLabel.border.color = 'pink';
                chartObj.refresh();
            });
            it('Checking tooltip  bottom with datalabel position as Middle', function (done) {
                loaded = function (args) {
                    targetElement = document.getElementById('container_Series_0_Point_6');
                    series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = series.points[6].regions[0].y + series.points[6].regions[0].height / 2 + parseFloat(chartArea.getAttribute('y')) +
                        elem.offsetTop;
                    x = series.points[6].regions[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(targetElement, Math.ceil(x), Math.ceil(y));
                    tooltip = document.getElementById('container_tooltip');
                    expect(tooltip).not.toBe(null);
                    tooltipY = parseFloat(tooltip.style.top);
                    labelText = document.getElementById('container_Series_0_Point_6_Text_0');
                    dataLabelY = parseFloat(labelText.getAttribute('y'));
                    expect(tooltipY < dataLabelY).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource[6].y = 90;
                chartObj.series[0].marker.dataLabel.visible = true;
                chartObj.series[0].marker.dataLabel.position = 'Middle';
                chartObj.refresh();
            });
            it('Checking with track ball', function (done) {
                loaded = function (args) {
                    targetElement = document.getElementById('container_Series_0_Point_6');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = series.points[6].regions[0].y + series.points[6].regions[0].height / 2 + parseFloat(chartArea.getAttribute('y')) +
                        elem.offsetTop;
                    x = series.points[6].regions[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(targetElement, Math.ceil(x), Math.ceil(y));
                    tooltip = document.getElementById('container_tooltip_group');
                    expect(tooltip.childElementCount).toEqual(5);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series = [
                    { dataSource: exports.data, type: 'Bubble', xName: 'x', yName: 'y', size: 'size', name: 'series1' },
                    { dataSource: exports.data2, xName: 'x', yName: 'y', name: 'series2', size: 'size', type: 'Bubble' }
                ];
                chartObj.tooltip.enable = true;
                chartObj.tooltip.shared = true;
                chartObj.refresh();
            });
            it('Default Crosshair', function (done) {
                loaded = function (args) {
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(chartArea.getAttribute('y')) + parseFloat(chartArea.getAttribute('height')) / 2 + elem.offsetTop;
                    x = parseFloat(chartArea.getAttribute('x')) + parseFloat(chartArea.getAttribute('width')) / 2 + elem.offsetLeft;
                    trigger.mousemovetEvent(chartArea, Math.ceil(x), Math.ceil(y));
                    var crosshair = document.getElementById('container_UserInteraction');
                    var element1;
                    expect(crosshair.childNodes.length).toEqual(3);
                    element1 = crosshair.childNodes[0];
                    expect(element1.getAttribute('d').indexOf(chartArea.getAttribute('x')) > 0).toBe(true);
                    element1 = crosshair.childNodes[1];
                    expect(element1.getAttribute('d').indexOf(chartArea.getAttribute('y')) > 0).toBe(true);
                    expect(crosshair.childNodes[2].childNodes.length).toEqual(4);
                    element1 = crosshair.childNodes[2].childNodes[0];
                    expect(element1.getAttribute('d')).not.toEqual('');
                    element1 = crosshair.childNodes[2].childNodes[2];
                    expect(element1.getAttribute('d')).not.toEqual('');
                    element1 = crosshair.childNodes[2].childNodes[1];
                    expect(element1.textContent == '5503.287' || element1.textContent == '5509.650').toBe(true);
                    chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(chartArea.getAttribute('y')) + elem.offsetTop + 1;
                    x = parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft + 1;
                    trigger.mousemovetEvent(chartArea, Math.ceil(x), Math.ceil(y));
                    crosshair = document.getElementById('container_UserInteraction');
                    expect(crosshair.childNodes.length).toEqual(3);
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
            it('Single point selection', function (done) {
                loaded = function () {
                    elementSelect = document.getElementById('container_Series_0_Point_4');
                    trigger.clickEvent(elementSelect);
                    selected = document.getElementsByClassName('container_ej2_chart_selection_series_0 ');
                    expect(elementSelect).toBe(selected[0]);
                    trigger.clickEvent(elementSelect);
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
            it('Single point multi selection', function (done) {
                loaded = function () {
                    elementSelect = document.getElementById('container_Series_0_Point_4');
                    trigger.clickEvent(elementSelect);
                    selected = document.getElementsByClassName('container_ej2_chart_selection_series_0 ');
                    expect(elementSelect).toBe(selected[0]);
                    elementSelect = document.getElementById('container_Series_0_Point_5');
                    trigger.clickEvent(elementSelect);
                    selected = document.getElementsByClassName('container_ej2_chart_selection_series_0 ');
                    expect(selected.length).toBe(2);
                    done();
                };
                chartObj.selectionMode = 'Point';
                chartObj.isMultiSelect = true;
                chartObj.loaded = loaded;
                chartObj.selectionModule.selectedDataIndexes = [];
                chartObj.refresh();
            });
            it('series selection ', function (done) {
                loaded = function () {
                    elementSelect = document.getElementById('container_Series_0_Point_4');
                    var series = document.getElementById('containerSeriesGroup0');
                    trigger.clickEvent(elementSelect);
                    selected = document.getElementsByClassName('container_ej2_chart_selection_series_0 ');
                    expect(series).toBe(selected[0]);
                    trigger.clickEvent(elementSelect);
                    selected = document.getElementsByClassName('container_ej2_chart_selection_series_0 ');
                    expect(selected.length).toBe(0);
                    done();
                };
                chartObj.selectionMode = 'Series';
                chartObj.isMultiSelect = false;
                chartObj.loaded = loaded;
                chartObj.selectionModule.selectedDataIndexes = [];
                chartObj.refresh();
            });
            it('Cluster selection', function (done) {
                loaded = function () {
                    elementSelect = document.getElementById('container_Series_0_Point_4');
                    var element1 = document.getElementById('container_Series_1_Point_4');
                    trigger.clickEvent(elementSelect);
                    selected = document.getElementsByClassName('container_ej2_chart_selection_series_0 ');
                    expect(elementSelect).toBe(selected[0]);
                    var selected1 = document.getElementsByClassName('container_ej2_chart_selection_series_1 ');
                    expect(element1).toBe(selected1[0]);
                    done();
                };
                chartObj.selectionMode = 'Cluster';
                chartObj.isMultiSelect = true;
                chartObj.loaded = loaded;
                chartObj.selectionModule.selectedDataIndexes = [];
                chartObj.refresh();
            });
            it('Checking with datalabel position auto(Middle) and tooltip', function (done) {
                loaded = function (args) {
                    targetElement = document.getElementById('container_Series_0_Point_0');
                    series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = series.points[0].symbolLocations[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = series.points[0].symbolLocations[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(targetElement, Math.ceil(x), Math.ceil(y));
                    tooltip = document.getElementById('container_tooltip');
                    expect(tooltip).not.toEqual(null);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.minimum = 2005;
                chartObj.primaryXAxis.maximum = 2007;
                chartObj.primaryXAxis.interval = 1;
                chartObj.primaryYAxis.minimum = 5;
                chartObj.primaryYAxis.maximum = 12;
                chartObj.primaryYAxis.interval = 1;
                chartObj.series = [{
                        dataSource: [{ x: 2006, y: 7.8, size: 11 }], type: 'Bubble', xName: 'x', yName: 'y', size: 'size', name: 'series1',
                        marker: { dataLabel: { visible: true, position: 'Auto', border: { width: 2, color: 'red' } } }
                    }];
                chartObj.tooltip.enable = true;
                chartObj.height = '200';
                chartObj.refresh();
            });
            it('Checking with multiple axes ', function (done) {
                loaded = function (args) {
                    var axis1 = document.getElementById('containerAxisLine_2');
                    var axisCollection = document.getElementById('containerAxisInsideCollection');
                    expect(+axisCollection.childElementCount).toEqual(5);
                    var axis2 = document.getElementById('containerAxisLine_1');
                    expect(+axis1.getAttribute('d').split(' ')[4]).toEqual(+axis2.getAttribute('d').split(' ')[1]);
                    var series0 = chartObj.series[0];
                    var series1 = chartObj.series[1];
                    var clipRect0 = series0.clipRect.y;
                    var clipRect1 = series1.clipRect.y;
                    expect(+clipRect0 > +clipRect1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.series = [
                    {
                        dataSource: exports.data, xName: 'x', yName: 'y', size: 'size', animation: { enable: false }, type: 'Bubble',
                        name: 'ChartSeriesNameGold', fill: 'red'
                    },
                    {
                        dataSource: exports.data2, xName: 'x', yName: 'y', size: 'size', animation: { enable: false }, type: 'Bubble',
                        name: 'ChartSeriesNameSilver', fill: 'blue'
                    },
                    {
                        dataSource: exports.data, xName: 'x', yName: 'y', size: 'size', animation: { enable: false }, type: 'Bubble',
                        name: 'ChartSeriesNameRuby', fill: 'green'
                    },
                    {
                        dataSource: exports.data2, xName: 'x', yName: 'y', size: 'size', animation: { enable: false }, type: 'Bubble',
                        name: 'ChartSeriesNamediamond', fill: 'black'
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
            });
            it('Checking multiple axes with crosshair', function (done) {
                loaded = function (args) {
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(chartArea.getAttribute('y')) + parseFloat(chartArea.getAttribute('height')) / 2 + elem.offsetTop;
                    x = parseFloat(chartArea.getAttribute('x')) + parseFloat(chartArea.getAttribute('width')) / 2 + elem.offsetLeft;
                    trigger.mousemovetEvent(chartArea, Math.ceil(x), Math.ceil(y));
                    var crosshair = document.getElementById('container_UserInteraction');
                    var element1;
                    expect(crosshair.childNodes.length).toEqual(3);
                    expect(crosshair.childNodes[2].childNodes.length).toEqual(4);
                    element1 = crosshair.childNodes[2].childNodes[0];
                    expect(element1.getAttribute('d')).not.toEqual('');
                    element1 = crosshair.childNodes[2].childNodes[2];
                    expect(element1.getAttribute('d')).not.toEqual('');
                    element1 = crosshair.childNodes[2].childNodes[1];
                    expect(element1.textContent == '2006.832' || element1.textContent == '2006.842').toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[3];
                    expect(element1.textContent == '10.938' || element1.textContent == '11.032' ||
                        element1.textContent == '11.428').toBe(true);
                    chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(chartArea.getAttribute('y')) + elem.offsetTop + 1;
                    x = parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft + 1;
                    trigger.mousemovetEvent(chartArea, Math.ceil(x), Math.ceil(y));
                    crosshair = document.getElementById('container_UserInteraction');
                    expect(crosshair.childNodes.length).toEqual(3);
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
            it('Checking with axis with opposed position', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_ChartAreaBorder');
                    var svg1 = document.getElementById('container2_AxisLabel_0');
                    expect(parseFloat(svg.getAttribute('x')) + parseFloat(svg.getAttribute('width')) <
                        parseFloat(svg1.getAttribute('x'))).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.axes[0].opposedPosition = true;
                chartObj.refresh();
            });
        });
        describe('Checking Zooming ', function () {
            var chartObj;
            var loaded;
            var trigger = new events_spec_1.MouseEvents();
            var elem = ej2_base_1.createElement('div', { id: 'container' });
            var targetElement;
            var resetElement;
            var x;
            var y;
            beforeAll(function () {
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis', labelFormat: 'n1' },
                    primaryYAxis: { title: 'PrimaryYAxis', labelFormat: 'n1', rangePadding: 'None' },
                    series: [{
                            type: 'Bubble',
                            dataSource: exports.data, xName: 'x', yName: 'y', size: 'size', animation: { enable: false },
                            name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
                            marker: {
                                visible: false
                            }
                        }],
                    title: 'Chart TS Title',
                    legendSettings: { visible: true },
                    width: '800',
                    zoomSettings: {
                        enableDeferredZooming: true
                    }
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                elem.remove();
            });
            it('Checking default selection zooming', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(elem, 200, 200, 350, 350);
                    resetElement = document.getElementById('container_Zooming_Reset');
                    expect(resetElement != null).toBe(true);
                    trigger.mousedownEvent(resetElement, 0, 0, 5, 5);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.zoomSettings.enableSelectionZooming = true;
                chartObj.refresh();
            });
            it('mouseWheel zooming - checking tool elements', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(elem, 100, 100, 400, 400);
                    resetElement = document.getElementById('container_Zooming_Reset');
                    expect(resetElement != null).toBe(true);
                    targetElement = document.getElementById('container_Zooming_KitCollection');
                    expect(targetElement.childNodes.length).toEqual(8);
                    trigger.mousedownEvent(resetElement, 0, 0, 5, 5);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.zoomSettings.enableMouseWheelZooming = true;
                chartObj.refresh();
            });
            it('checking zooming with cross hair', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(elem, 100, 100, 400, 400);
                    resetElement = document.getElementById('container_Zooming_Reset');
                    expect(resetElement != null).toBe(true);
                    targetElement = document.getElementById('container_Zooming_KitCollection');
                    expect(targetElement.childNodes.length).toEqual(8);
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(chartArea.getAttribute('y')) + parseFloat(chartArea.getAttribute('height')) / 2 + elem.offsetTop;
                    x = parseFloat(chartArea.getAttribute('x')) + parseFloat(chartArea.getAttribute('width')) / 2 + elem.offsetLeft;
                    trigger.mousemovetEvent(chartArea, Math.ceil(x), Math.ceil(y));
                    var crosshair = document.getElementById('container_UserInteraction');
                    var element1 = crosshair.childNodes[2].childNodes[1];
                    expect(element1.textContent == '3224.4' || element1.textContent == '3187.0').toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[3];
                    expect(element1.textContent == '38.1' || element1.textContent == '37.8').toBe(true);
                    trigger.mousedownEvent(resetElement, 0, 0, 5, 5);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.zoomSettings.enableMouseWheelZooming = true;
                chartObj.crosshair.enable = true;
                chartObj.primaryXAxis.crosshairTooltip.enable = true;
                chartObj.primaryYAxis.crosshairTooltip.enable = true;
                chartObj.series[0].dataSource[3].y = 0;
                chartObj.refresh();
            });
            it('checking zooming with tooltip', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(elem, 100, 100, 400, 400);
                    resetElement = document.getElementById('container_Zooming_Reset');
                    expect(resetElement != null).toBe(true);
                    targetElement = document.getElementById('container_Zooming_KitCollection');
                    expect(targetElement.childNodes.length).toEqual(8);
                    targetElement = document.getElementById('container_Series_0_Point_2');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = series.points[2].regions[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = series.points[2].regions[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(targetElement, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    expect(targetElement.getAttribute('opacity')).toEqual('1');
                    targetElement = document.getElementById('container_tooltip_text');
                    expect(targetElement.textContent.replace(/\u200E/g, '')).toEqual('ChartSeriesNameGold3000.0 : 3.0  Size : -30000');
                    trigger.mousedownEvent(resetElement, 0, 0, 5, 5);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.zoomSettings.enableMouseWheelZooming = true;
                chartObj.tooltip.enable = true;
                chartObj.crosshair.enable = true;
                chartObj.primaryXAxis.crosshairTooltip.enable = true;
                chartObj.primaryYAxis.crosshairTooltip.enable = true;
                chartObj.refresh();
            });
        });
        describe('Checking with multiple series ', function () {
            var chartObj;
            var loaded;
            var trigger = new events_spec_1.MouseEvents();
            var elem = ej2_base_1.createElement('div', { id: 'container' });
            var targetElement;
            var resetElement;
            var x;
            var y;
            beforeAll(function () {
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    series: [{
                            type: 'Bubble',
                            dataSource: [{ x: 92.2, y: 7.8, size: 1 },
                                { x: 74, y: 6.5, size: 3 },
                                { x: 90.4, y: 6.0, size: 0.238 },
                                { x: 99.4, y: 2.2, size: 0.312 },
                                { x: 88.6, y: 1.3, size: 0.197 },
                            ], xName: 'x', yName: 'y', size: 'size', minRadius: null, maxRadius: null,
                        }, {
                            type: 'Bubble', minRadius: null, maxRadius: null,
                            dataSource: [{ x: 92.2, y: 7.8, size: 1 },
                                { x: 74, y: 6.5, size: 4 },
                                { x: 90.4, y: 6.0, size: 0.238 },
                                { x: 99.4, y: 2.2, size: 0.312 },
                                { x: 88.6, y: 1.3, size: 0.197 },
                            ], xName: 'x', yName: 'y', size: 'size',
                        }, {
                            type: 'Bubble',
                            dataSource: [{ x: 92.2, y: 7.8, size: 2 },
                                { x: 74, y: 6.5, size: 3 },
                                { x: 90.4, y: 6.0, size: 0.238 },
                                { x: 99.4, y: 2.2, size: 0.312 },
                                { x: 88.6, y: 1.3, size: 0.197 },
                            ], xName: 'x', yName: 'y', size: 'size', minRadius: null, maxRadius: null,
                        },
                        {
                            type: 'Bubble', visible: false,
                            dataSource: [{ x: 92.2, y: 7.8, size: 2 },
                                { x: 74, y: 6.5, size: 3 },
                                { x: 90.4, y: 6.0, size: 0.238 },
                                { x: 99.4, y: 2.2, size: 0.312 },
                                { x: 88.6, y: 1.3, size: 0.197 },
                            ], xName: 'x', yName: 'y', size: 'size', minRadius: null, maxRadius: null,
                        }
                    ],
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                elem.remove();
            });
            it('Checking default rendering', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0_Point_0');
                    expect(svg !== null).toBe(true);
                    svg = document.getElementById('container_Series_1_Point_0');
                    expect(svg !== null).toBe(true);
                    svg = document.getElementById('container_Series_2_Point_0');
                    expect(svg !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
        });
        describe('Bubble Series Inversed axis', function () {
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
                            name: 'ChartSeriesNameGold', dataSource: exports.data, xName: 'x', yName: 'y', size: 'size',
                            type: 'Bubble', marker: { visible: false, dataLabel: { visible: true, fill: 'violet' } }
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
                    dataLabelY = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('y');
                    pointY = chart.series[0].points[1].symbolLocations[0].y;
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
                    dataLabelY = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('y');
                    pointY = chart.series[0].points[1].symbolLocations[0].y;
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
        describe('checking rotated bubble chart', function () {
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
                        { type: 'Bubble', name: 'series1', dataSource: data_spec_1.rotateData1, xName: 'x', yName: 'y', animation: { enable: false },
                            marker: { visible: true } },
                        { type: 'Bubble', name: 'series2', dataSource: data_spec_1.rotateData2, xName: 'x', yName: 'y', animation: { enable: false },
                            marker: { visible: true } }
                    ],
                    title: 'rotated bubble Chart'
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
        describe('Bubble series with drag and drop support', function () {
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
                            type: 'Bubble',
                            dataSource: [
                                { x: new Date(2005, 0, 1), y: 21, size: '1' }, { x: new Date(2006, 0, 1), y: 24, size: '2' },
                                { x: new Date(2007, 0, 1), y: 36, size: '1.5' }, { x: new Date(2008, 0, 1), y: 38, size: '1.8' },
                                { x: new Date(2009, 0, 1), y: 54, size: '2.2' }, { x: new Date(2010, 0, 1), y: 57, size: '3' },
                                { x: new Date(2011, 0, 1), y: 70, size: '2.1' }
                            ],
                            animation: { enable: false },
                            xName: 'x', width: 2, marker: {
                                visible: true,
                                width: 10,
                                height: 10
                            },
                            yName: 'y', name: 'Germany', dragSettings: { enable: true }, size: 'size'
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
            it('Bubble series drag and drop with marker true', function (done) {
                loaded = function () {
                    var target = document.getElementById('container_Series_0_Point_4');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(target.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + element1.offsetTop;
                    x = parseFloat(target.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + element1.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    trigger.draganddropEvent(element1, Math.ceil(x), Math.ceil(y), Math.ceil(x), Math.ceil(y) + 115);
                    var yValue = chartObj.visibleSeries[0].points[4].yValue;
                    expect(yValue == 19.58 || yValue == 19.88).toBe(true);
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
