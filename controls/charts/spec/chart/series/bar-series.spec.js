define(["require", "exports", "@syncfusion/ej2-base", "../../../src/chart/chart", "../../../src/chart/series/line-series", "../../../src/chart/axis/category-axis", "../../../src/chart/axis/date-time-axis", "../../../src/chart/series/bar-series", "../../../src/chart/series/column-series", "../../../src/chart/user-interaction/tooltip", "../../../src/chart/user-interaction/data-editing", "../../../src/chart/user-interaction/crosshair", "../../../src/chart/series/data-label", "../base/data.spec", "../base/events.spec", "../base/data.spec", "../../common.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, chart_1, line_series_1, category_axis_1, date_time_axis_1, bar_series_1, column_series_1, tooltip_1, data_editing_1, crosshair_1, data_label_1, data_spec_1, events_spec_1, data_spec_2, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(line_series_1.LineSeries, bar_series_1.BarSeries, data_editing_1.DataEditing, column_series_1.ColumnSeries, tooltip_1.Tooltip, crosshair_1.Crosshair, category_axis_1.Category, date_time_axis_1.DateTime, data_label_1.DataLabel);
    describe('Chart Control', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('Chart Bar series', function () {
            var chartObj;
            var elem;
            var point;
            var svg;
            var targetElement;
            var loaded;
            var done;
            var dataLabel;
            var trigger = new events_spec_1.MouseEvents();
            var x;
            var y;
            var animationComplete;
            beforeAll(function () {
                elem = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis', },
                    primaryYAxis: { title: 'PrimaryYAxis', },
                    series: [{
                            dataSource: data_spec_2.bar, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Bar',
                            name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
                        },
                    ], width: '800',
                    tooltip: { enable: true, textStyle: { size: '12px' } },
                    legendSettings: { visible: false },
                    title: 'Chart TS Title'
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                elem.remove();
            });
            it('Checking with default points', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_0');
                    expect(svg.getAttribute('fill') == 'rgba(135,206,235,1)').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking with null Points', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_3');
                    expect(svg == null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = data_spec_2.bar;
                chartObj.series[0].dataSource[3].y = null;
                chartObj.refresh();
            });
            it('Checking with single Points', function (done) {
                loaded = function (args) {
                    var svg1 = document.getElementById('container_Series_0_Point_0');
                    expect(svg1 != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryYAxis.rangePadding = 'Additional';
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.series[0].dataSource = null;
                chartObj.series[0].dataSource = [{ x: 4, y: 30 }];
                chartObj.refresh();
            });
            it('Checking with negative Points', function (done) {
                loaded = function (args) {
                    var series = chartObj.series[0];
                    var axisLabel = document.getElementById('container1_AxisLabel_4');
                    svg = document.getElementById('container_Series_0_Point_1');
                    expect(series.points[1].regions[0].x < parseFloat(axisLabel.getAttribute('x'))).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = data_spec_2.negativeDataPoint;
                chartObj.refresh();
            });
            it('checking with border', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_1');
                    var path = svg.getAttribute('d');
                    var count = path.indexOf('Z');
                    expect(count !== -1).toBe(true);
                    expect(svg.getAttribute('stroke') === 'red').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].border.color = 'red';
                chartObj.series[0].border.width = 4;
                chartObj.refresh();
            });
            it('checking multiple series bar chart', function (done) {
                loaded = function (args) {
                    var series0 = chartObj.series[0];
                    var series1 = chartObj.series[1];
                    var point1 = document.getElementById('container_Series_0_Point_2');
                    var point2 = document.getElementById('container_Series_1_Point_2');
                    expect((series0.points[2].regions[0].y) == series1.points[2].regions[0].height + series1.points[2].regions[0].y).toBe(true);
                    done();
                };
                chartObj.series = [{
                        dataSource: data_spec_2.bar, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Bar',
                        name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
                    },
                    {
                        dataSource: data_spec_2.barData, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Bar',
                        name: 'ChartSeriesNameSilver', fill: 'rgba(135,000,235,1)',
                    },
                    {
                        dataSource: data_spec_2.barData, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Bar',
                        name: 'ChartSeriesNameSilver', fill: 'rgba(135,000,000,1)',
                    }
                ];
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.rangePadding = 'None';
                chartObj.primaryYAxis.rangePadding = 'None';
                chartObj.refresh();
            });
            it('checking multiple series with diff orientation(horizontal) ', function (done) {
                loaded = function (args) {
                    var point1 = document.getElementById('container_Series_0_Point_0');
                    var point2 = document.getElementById('container_Series_1_Point_0');
                    expect(point2 == null).toBe(true);
                    done();
                };
                chartObj.series = [{
                        dataSource: data_spec_2.bar, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Bar',
                        name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
                    },
                    {
                        dataSource: data_spec_2.barData, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Line',
                        name: 'ChartSeriesNameSilver', fill: 'rgba(135,000,235,1)',
                    },
                    {
                        dataSource: data_spec_2.barData, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Bar',
                        name: 'ChartSeriesNameSilver', fill: 'rgba(135,000,000,1)',
                    }
                ];
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('checking multiple series with diff orientation(vertical) ', function (done) {
                loaded = function (args) {
                    var point1 = document.getElementById('container_Series_0_Point_0');
                    var point2 = document.getElementById('container_Series_1_Point_0');
                    expect(point2 != null).toBe(true);
                    expect(point1 != null).toBe(true);
                    done();
                };
                chartObj.series = [];
                chartObj.series = [{
                        dataSource: data_spec_2.bar, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Column',
                        name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
                    },
                    {
                        dataSource: data_spec_2.barData, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Column',
                        name: 'ChartSeriesNameSilver', fill: 'rgba(135,000,235,1)',
                    },
                    {
                        dataSource: data_spec_2.barData, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Line',
                        name: 'ChartSeriesNamepearl', fill: 'rgba(135,000,000,1)',
                    }];
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('default Tooltip', function (done) {
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_1');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = series.points[1].regions[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = series.points[1].regions[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    expect(target.getAttribute('opacity') == '0.5').toBe(true);
                    expect(parseFloat(tooltip.style.left) > series.points[1].regions[0].y + parseFloat(chartArea.getAttribute('y')));
                    target = document.getElementById('container_Series_0_Point_7');
                    series = chartObj.series[0];
                    y = series.points[7].regions[0].y + parseFloat(chartArea.getAttribute('y')) + 30 + elem.offsetTop;
                    x = series.points[7].regions[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    expect(target.getAttribute('opacity') == '0.5').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'Bar';
                chartObj.series[0].dataSource = data_spec_2.bar;
                chartObj.series[0].dataSource[3].y = 0;
                chartObj.refresh();
            });
            it('tooltip checking with positive edges', function (done) {
                ej2_base_1.remove(document.getElementById('container_tooltip'));
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_7');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var tooltipWidth;
                    y = series.points[7].regions[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = series.points[7].regions[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    tooltipWidth = document.getElementById('container_tooltip_svg');
                    expect(tooltip != null).toBe(true);
                    expect(target.getAttribute('opacity') == '0.5').toBe(true);
                    expect(parseFloat(tooltip.style.left) > (elem.offsetLeft + series.points[7].regions[0].x + (series.points[7].regions[0].width / 2) + parseFloat(chartArea.getAttribute('x')))).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = data_spec_2.bar;
                chartObj.primaryXAxis.rangePadding = 'Additional';
                chartObj.refresh();
            });
            it('negative Tooltip', function (done) {
                ej2_base_1.remove(document.getElementById('container_tooltip'));
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_1');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = series.points[1].regions[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = series.points[1].regions[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    expect(target.getAttribute('opacity') == '0.5').toBe(true);
                    var transform = document.getElementById('container_tooltip_group').getAttribute('transform').split('(');
                    var translateX = transform[1].split(',');
                    expect(parseFloat(translateX[0]) < series.points[1].regions[0].x + series.points[1].regions[0].width + parseFloat(chartArea.getAttribute('x'))).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'Bar';
                data_spec_2.bar[7].y = -10, data_spec_2.bar[1].y = -60;
                chartObj.series[0].dataSource = data_spec_2.bar;
                chartObj.refresh();
            });
            it('tooltip checking with negative edge', function (done) {
                ej2_base_1.remove(document.getElementById('container_tooltip'));
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_7');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var tooltipWidth;
                    y = series.points[7].regions[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = series.points[7].regions[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    tooltipWidth = document.getElementById('container_tooltip_svg');
                    expect(tooltip != null).toBe(true);
                    expect(target.getAttribute('opacity') == '0.5').toBe(true);
                    var transform = document.getElementById('container_tooltip_group').getAttribute('transform').split('(');
                    var translateX = transform[1].split(',');
                    expect((parseFloat(translateX[0])) < series.points[1].regions[0].x + series.points[1].regions[0].width + parseFloat(chartArea.getAttribute('x'))).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = data_spec_2.bar;
                chartObj.refresh();
            });
            it(' checking with category  axis', function (done) {
                ej2_base_1.remove(document.getElementById('container_tooltip'));
                loaded = function (args) {
                    point = document.getElementById("container_Series_0_Point_1");
                    var point2 = document.getElementById("container_Series_1_Point_1");
                    expect(point.getAttribute('fill') == 'rgba(135,206,235,1)').toBe(true);
                    expect(point2 == null).toBe(true);
                    var target = document.getElementById('container_Series_0_Point_0');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = series.points[0].regions[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = series.points[0].regions[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    expect(target.getAttribute('opacity') == '0.5').toBe(true);
                    done();
                };
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.series = [{
                        dataSource: data_spec_2.categoryData, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Bar',
                        name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
                    },
                    {
                        dataSource: data_spec_2.categoryData1, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Line',
                        name: 'ChartSeriesNameSilver', fill: 'rgba(135,000,235,1)',
                    },
                    {
                        dataSource: data_spec_2.categoryData1, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Bar',
                        name: 'ChartSeriesNameRuby', fill: 'rgba(135,000,000,1)',
                    }],
                    chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('checking with track ball', function (done) {
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_7');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = series.points[7].regions[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = series.points[7].regions[0].x + parseFloat(chartArea.getAttribute('x')) + parseFloat(chartArea.getAttribute('width')) - 10 + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    expect(tooltip.offsetTop < y + series.points[7].regions[0].height).toBe(true);
                    tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    done();
                };
                chartObj.series[1].type = 'Bar';
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.labelPlacement = 'OnTicks';
                chartObj.primaryXAxis.crosshairTooltip.enable = true;
                chartObj.primaryYAxis.crosshairTooltip.enable = true;
                chartObj.crosshair.enable = true;
                chartObj.tooltip.shared = true;
                chartObj.refresh();
            });
            it('checking with cross hair', function (done) {
                ej2_base_1.remove(document.getElementById('container_tooltip'));
                loaded = function (args) {
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var series = chartObj.series[0];
                    y = series.points[2].regions[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = series.points[2].regions[0].x + series.points[2].regions[0].width / 2 + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(chartArea, Math.ceil(x), Math.ceil(y));
                    var crosshair = document.getElementById('container_svg').childNodes[4];
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
                    expect(element1.textContent == 'Japan').toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[3];
                    expect(element1.textContent == '35.075' || element1.textContent == '35.076').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource[5].y = 0;
                chartObj.refresh();
            });
            it(' checking with datetime  axis', function (done) {
                ej2_base_1.remove(document.getElementById('container_tooltip'));
                loaded = function (args) {
                    point = document.getElementById("container_Series_0_Point_1");
                    var point2 = document.getElementById("container_Series_1_Point_1");
                    expect(point.getAttribute('fill') == 'rgba(135,206,235,1)').toBe(true);
                    expect(point2 == null).toBe(true);
                    done();
                };
                chartObj.primaryXAxis.valueType = 'DateTime';
                chartObj.series[0].dataSource = null;
                chartObj.series[1].dataSource = null;
                chartObj.series = [{
                        dataSource: data_spec_2.datetimeData, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Bar',
                        name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
                    }],
                    chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking with multiple axes rows', function (done) {
                loaded = function (args) {
                    point = document.getElementById('container_Series_0_Point_0');
                    expect(point.getAttribute('fill') === 'rgba(135,206,235,1)').toBe(true);
                    var point1 = document.getElementById('container_Series_1_Point_1');
                    expect(point1.getAttribute('fill') === 'rgba(135,000,235,1)').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.axes = [{
                        rowIndex: 1, name: 'yAxis1', title: 'AdditionalAxis',
                        titleStyle: { size: '14px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' },
                        labelStyle: { size: '12px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' }
                    }];
                chartObj.series = [{
                        dataSource: data_spec_2.bar, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Bar',
                        name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
                    },
                    {
                        dataSource: data_spec_2.barData, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Bar',
                        name: 'ChartSeriesNameSilver', fill: 'rgba(135,000,235,1)',
                    },
                ],
                    chartObj.height = '600';
                chartObj.series[1].xAxisName = 'yAxis1';
                chartObj.rows = [{ height: '300', border: { width: 4, color: 'red' } },
                    { height: '300', border: { width: 4, color: 'blue' } }];
                chartObj.refresh();
            });
            it('Checking animation', function (done) {
                animationComplete = function (args) {
                    var point = document.getElementById('container_Series_' + args.series.index + '_Point_0');
                    expect(point.getAttribute('transform') === 'translate(0,0)').toBe(true);
                    done();
                };
                chartObj.series[0].animation.enable = true;
                chartObj.series[1].animation.enable = true;
                chartObj.animationComplete = animationComplete;
                chartObj.refresh();
            });
            it('checking data label position with multiple axes - rows', function (done) {
                chartObj.loaded = function (args) {
                    expect(document.getElementById('containerTextGroup1').childElementCount).toBe(document.getElementById('containerTextGroup0').childElementCount);
                    done();
                };
                chartObj.series[0].animation.enable = false;
                chartObj.series[1].animation.enable = false;
                chartObj.animationComplete = null;
                chartObj.series[0].marker.dataLabel.visible = true;
                chartObj.series[1].marker.dataLabel.visible = true;
                chartObj.series[1].dataSource = data_spec_2.bar;
                chartObj.axes[0].rangePadding = 'Additional';
                chartObj.rows = [{ height: '50%', border: { width: 4, color: 'red' } },
                    { height: '50%', border: { width: 4, color: 'blue' } }];
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
        });
        describe('Bar Series with data label', function () {
            var chartObj;
            var loaded;
            var animationComplete;
            var element;
            element = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                if (document.getElementById('template')) {
                    ej2_base_1.remove(document.getElementById('template'));
                }
                if (document.getElementById('template1')) {
                    ej2_base_1.remove(document.getElementById('template1'));
                }
                var template = ej2_base_1.createElement('div', { id: 'template', styles: 'display: none;' });
                document.body.appendChild(template);
                template.innerHTML = '<div>80</div>';
                var template1 = ej2_base_1.createElement('div', { id: 'template1', styles: 'display: none;' });
                document.body.appendChild(template1);
                template1.innerHTML = '<div>${point.y}</div>';
                document.body.appendChild(element);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal' },
                    series: [{
                            animation: { enable: false },
                            name: 'ChartSeriesNameGold', dataSource: [{ x: 1000, y: 70 }, { x: 2000, y: -40 },
                                { x: 3000, y: 70 }, { x: 4000, y: 60 },
                                { x: 5000, y: -50 }, { x: 6000, y: -40 },
                                { x: 7000, y: 40 }, { x: 8000, y: 70 }], xName: 'x', yName: 'y',
                            type: 'Bar', fill: 'rgba(135,206,235,1)',
                            marker: { visible: false, dataLabel: { visible: true, fill: 'violet' } }
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
                ej2_base_1.remove(document.getElementById('template'));
                ej2_base_1.remove(document.getElementById('template1'));
            });
            it('With negative location', function (done) {
                loaded = function (args) {
                    var svg = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('x');
                    var point0Location = chartObj.series[0].points[1].regions[0].x;
                    expect(svg < point0Location).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('With Label position Top', function (done) {
                loaded = function (args) {
                    var svg = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('x');
                    var point0Location = chartObj.series[0].points[1].symbolLocations[0].x;
                    expect(svg > point0Location).toBe(true);
                    var svg1 = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('x');
                    var pointLocation1 = chartObj.series[0].points[0].symbolLocations[0].x;
                    expect(svg < pointLocation1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Top';
                chartObj.series[0].marker.dataLabel.alignment = 'Center';
                chartObj.refresh();
            });
            it('With Label position Bottom', function (done) {
                loaded = function (args) {
                    var svg = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('x');
                    var point0Location = (chartObj.series[0].points[1].regions[0].x +
                        chartObj.series[0].points[1].regions[0].width);
                    expect(svg < point0Location).toBe(true);
                    var svg1 = +document.getElementById('container_Series_0_Point_0_TextShape_0').getAttribute('x');
                    var point0Location1 = chartObj.series[0].points[0].regions[0].x;
                    expect(svg1 > point0Location1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Bottom';
                chartObj.refresh();
            });
            it('With Label position Middle', function (done) {
                loaded = function (args) {
                    var svg = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('y');
                    var svgHeight = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('height');
                    var point0Location = chartObj.series[0].points[1].symbolLocations[0].y;
                    expect(svg < point0Location).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Middle';
                chartObj.series[0].marker.dataLabel.alignment = 'Center';
                chartObj.refresh();
            });
            it('Color saturation middle position', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_4_Text_0');
                    expect(element.getAttribute('fill') == 'white').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.fill = 'red';
                chartObj.series[0].marker.dataLabel.position = 'Middle';
                chartObj.refresh();
            });
            it('Color saturation fill as transparent', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_4_Text_0');
                    expect(element.getAttribute('fill') == 'black').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.fill = 'transparent';
                chartObj.series[0].marker.dataLabel.position = 'Middle';
                chartObj.refresh();
            });
            it('Color saturation with chart area background black', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_4_Text_0');
                    expect(element.getAttribute('fill') == 'white').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.chartArea.background = 'black';
                chartObj.chartArea.border = {
                    color: ''
                };
                chartObj.series[0].marker.dataLabel.position = 'Outer';
                chartObj.refresh();
            });
            it('Color saturation with top position', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_4_Text_0');
                    expect(element.getAttribute('fill') == 'black').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Top';
                chartObj.refresh();
            });
            it('Color saturation with data label fill color', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_4_Text_0');
                    expect(element.getAttribute('fill') == 'white').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].animation.enable = true;
                chartObj.series[0].marker.dataLabel.fill = 'red';
                chartObj.series[0].marker.dataLabel.position = 'Outer';
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
                chartObj.dataBind();
            });
            it('checking elements counts without using template', function (done) {
                chartObj.loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_4_Text_0');
                    expect(element != null).toBe(true);
                    element = document.getElementById('container_Secondary_Element');
                    expect(element.childElementCount).toBe(0);
                    done();
                };
                chartObj.pointRender = null;
                chartObj.series[0].animation.enable = false;
                chartObj.series[0].marker.dataLabel.visible = true;
                chartObj.refresh();
            });
            it('checking elements counts with using template without element', function (done) {
                chartObj.loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_4_Text_0');
                    expect(element).toBe(null);
                    element = document.getElementById('container_Secondary_Element');
                    expect(element.childElementCount).toBe(0);
                    element = document.getElementById('container_Series_0_DataLabelCollections');
                    expect(element).toBe(null);
                    done();
                };
                chartObj.series[0].marker.dataLabel.template = 'label';
                chartObj.chartArea.background = 'transparent';
                chartObj.refresh();
            });
            it('checking elements counts and datalabel with using template as html string', function (done) {
                chartObj.loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_4_Text_0');
                    expect(element).toBe(null);
                    element = document.getElementById('container_Secondary_Element');
                    expect(element.childElementCount).toBe(1);
                    expect(element.children[0].id).toBe('container_Series_0_DataLabelCollections');
                    element = document.getElementById('container_Series_0_DataLabelCollections');
                    expect(element.childElementCount).toBe(8);
                    element = document.getElementById('container_Series_0_DataLabel_5');
                    expect(element.children[0].innerHTML).toBe('-40');
                    done();
                };
                chartObj.series[0].marker.dataLabel.template = '<div>${point.y}</div>';
                chartObj.refresh();
            });
            it('checking template as point x value and cheecking style', function (done) {
                chartObj.loaded = function (args) {
                    var element = document.getElementById('container_Series_0_DataLabel_5');
                    expect(element.children[0].innerHTML).toBe('6000 : -40');
                    expect(element.style.backgroundColor).toBe('red');
                    expect(element.style.color).toBe('white');
                    done();
                };
                chartObj.series[0].marker.dataLabel.template = '<div>${point.x} : ${point.y}</div>';
                chartObj.refresh();
            });
            it('checking template using script element', function (done) {
                chartObj.loaded = function (args) {
                    var element = document.getElementById('container_Series_0_DataLabel_5');
                    expect(element.children[0].innerHTML).toBe('80');
                    expect(element.style.backgroundColor).toBe('red');
                    expect(element.style.color).toBe('white');
                    done();
                };
                chartObj.series[0].marker.dataLabel.template = '#template';
                chartObj.refresh();
            });
            it('checking template using script element as format', function (done) {
                chartObj.loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_4_Text_0');
                    expect(element).toBe(null);
                    element = document.getElementById('container_Secondary_Element');
                    expect(element.childElementCount).toBe(1);
                    expect(element.children[0].id).toBe('container_Series_0_DataLabelCollections');
                    element = document.getElementById('container_Series_0_DataLabelCollections');
                    expect(element.childElementCount).toBe(8);
                    element = document.getElementById('container_Series_0_DataLabel_5');
                    expect(element.children[0].innerHTML).toBe('-40');
                    done();
                };
                chartObj.series[0].marker.dataLabel.template = '#template1';
                chartObj.series[0].animation.enable = true;
                chartObj.refresh();
            });
        });
        describe('Bar Series Inversed axis', function () {
            var chart;
            var loaded;
            var element;
            var dataLabelX;
            var pointX;
            element = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(element);
                chart = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal', isInversed: true },
                    series: [{
                            animation: { enable: false }, name: 'ChartSeriesNameGold',
                            dataSource: [{ x: 1000, y: 70 }, { x: 2000, y: -40 }, { x: 3000, y: 70 }, { x: 4000, y: 60 },
                                { x: 5000, y: -50 }, { x: 6000, y: -40 }, { x: 7000, y: 40 }, { x: 8000, y: 70 }], xName: 'x', yName: 'y',
                            type: 'Bar', marker: { visible: false, dataLabel: { visible: true, fill: 'violet' } }
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
                    dataLabelX = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('x');
                    pointX = chart.series[0].points[1].symbolLocations[0].x;
                    expect(dataLabelX > pointX).toBe(true);
                    dataLabelX = +document.getElementById('container_Series_0_Point_0_TextShape_0').getAttribute('x');
                    pointX = chart.series[0].points[0].symbolLocations[0].x;
                    expect(dataLabelX < pointX).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].marker.dataLabel.position = 'Auto';
                chart.refresh();
            });
            it('With Label position Outer', function (done) {
                loaded = function (args) {
                    dataLabelX = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('x');
                    pointX = chart.series[0].points[1].symbolLocations[0].x;
                    expect(dataLabelX > pointX).toBe(true);
                    dataLabelX = +document.getElementById('container_Series_0_Point_0_TextShape_0').getAttribute('x');
                    pointX = chart.series[0].points[0].symbolLocations[0].x;
                    expect(dataLabelX < pointX).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].marker.dataLabel.position = 'Outer';
                chart.refresh();
            });
            it('With Label position Top', function (done) {
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
                chart.series[0].marker.dataLabel.alignment = 'Center';
                chart.refresh();
            });
            it('With Label position Bottom', function (done) {
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
                chart.refresh();
            });
            it('With Label position Middle', function (done) {
                loaded = function (args) {
                    var labelX = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('x');
                    var labelHeight = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('width');
                    var point = chart.series[0].points[1];
                    expect(labelX + labelHeight / 2).toEqual(point.regions[0].x + point.regions[0].width / 2);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].marker.dataLabel.position = 'Middle';
                chart.refresh();
            });
            it('checking with axis area', function (done) {
                loaded = function (args) {
                    expect(document.getElementById('container_Series_0_DataLabelCollections').childElementCount).toEqual(11);
                    done();
                };
                chart.loaded = loaded;
                chart.primaryXAxis = { title: 'Months', valueType: 'Category' };
                chart.primaryYAxis = { minimum: 0, maximum: 80, interval: 20, title: 'Temperature (Fahrenheit)', isInversed: false };
                chart.rows = [{ height: '40%' }, { height: '60%' }];
                chart.axes = [{
                        rowIndex: 1, opposedPosition: true, minimum: 24, maximum: 36, interval: 4,
                        name: 'yAxis', title: 'Temperature (Celsius)'
                    }];
                chart.series = [
                    {
                        dataSource: [
                            { x: 'Jan', y: 15, y1: 33 }, { x: 'Feb', y: 20, y1: 31 }, { x: 'Mar', y: 35, y1: 30 },
                            { x: 'Apr', y: 40, y1: 28 }, { x: 'May', y: 80, y1: 29 }, { x: 'Jun', y: 70, y1: 30 },
                            { x: 'Jul', y: 65, y1: 33 }, { x: 'Aug', y: 55, y1: 32 }, { x: 'Sep', y: 50, y1: 34 },
                            { x: 'Oct', y: 30, y1: 32 }, { x: 'Nov', y: 35, y1: 32 }, { x: 'Dec', y: 35, y1: 31 }
                        ],
                        xName: 'x', yName: 'y', name: 'Germany', type: 'Line', animation: { enable: false },
                        marker: { dataLabel: { visible: true, template: '<div>56</div>', position: 'Outer' } }
                    }, {
                        dataSource: [
                            { x: 'Jan', y: 15, y1: 33 }, { x: 'Feb', y: 20, y1: 31 }, { x: 'Mar', y: 35, y1: 30 },
                            { x: 'Apr', y: 40, y1: 28 }, { x: 'May', y: 80, y1: 29 }, { x: 'Jun', y: 70, y1: 30 },
                            { x: 'Jul', y: 65, y1: 33 }, { x: 'Aug', y: 55, y1: 32 }, { x: 'Sep', y: 50, y1: 34 },
                            { x: 'Oct', y: 30, y1: 32 }, { x: 'Nov', y: 35, y1: 32 }, { x: 'Dec', y: 35, y1: 31 }
                        ],
                        xName: 'x', yName: 'y', name: 'Germany', type: 'Column', animation: { enable: false },
                        marker: { dataLabel: { visible: true, template: '<div>56</div>', position: 'Outer' } }
                    }, {
                        dataSource: [
                            { x: 'Jan', y: 15, y1: 33 }, { x: 'Feb', y: 20, y1: 31 }, { x: 'Mar', y: 35, y1: 30 },
                            { x: 'Apr', y: 40, y1: 28 }, { x: 'May', y: 80, y1: 29 }, { x: 'Jun', y: 70, y1: 30 },
                            { x: 'Jul', y: 65, y1: 33 }, { x: 'Aug', y: 55, y1: 32 }, { x: 'Sep', y: 50, y1: 34 },
                            { x: 'Oct', y: 30, y1: 32 }, { x: 'Nov', y: 35, y1: 32 }, { x: 'Dec', y: 35, y1: 31 }
                        ], width: 2,
                        xName: 'x', yName: 'y1', yAxisName: 'yAxis',
                        name: 'Japan', type: 'Line', animation: { enable: false },
                        marker: { visible: true, width: 10, height: 10, border: { width: 2, color: '#F8AB1D' } }
                    }
                ];
                chart.refresh();
            });
        });
        describe('checking rotated bar chart', function () {
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
                        { type: 'Bar', name: 'barSeries1', dataSource: data_spec_2.rotateData1, xName: 'x', yName: 'y', animation: { enable: false } },
                        { type: 'Bar', name: 'barSeries2', dataSource: data_spec_2.rotateData2, xName: 'x', yName: 'y', animation: { enable: false } }
                    ],
                    title: 'rotated Bar Chart',
                    width: '700'
                });
            });
            afterAll(function () {
                chart.destroy();
                element.remove();
            });
            it('checking without rotated', function (done) {
                loaded = function (args) {
                    var axis = chart.primaryYAxis;
                    expect(axis.orientation).toEqual('Horizontal');
                    axis = chart.primaryXAxis;
                    expect(axis.orientation).toEqual('Vertical');
                    done();
                };
                chart.loaded = loaded;
                chart.appendTo('#container');
            });
            it('checking with rotated', function (done) {
                loaded = function (args) {
                    var axis = chart.primaryXAxis;
                    expect(axis.orientation).toEqual('Horizontal');
                    axis = chart.primaryYAxis;
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
                    dataLabel = document.getElementById('container_Series_0_Point_1_Text_0');
                    point = chart.series[0].points[1];
                    expect(+(dataLabel.getAttribute('y')) > point.symbolLocations[0].y).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].marker.dataLabel.visible = true;
                chart.refresh();
            });
            it('checking with datalabel Outer position', function (done) {
                loaded = function (args) {
                    dataLabel = document.getElementById('container_Series_0_Point_2_Text_0');
                    point = chart.series[0].points[2];
                    expect(+(dataLabel.getAttribute('y')) < point.symbolLocations[0].y).toBe(true);
                    dataLabel = document.getElementById('container_Series_0_Point_1_Text_0');
                    point = chart.series[0].points[1];
                    expect(+(dataLabel.getAttribute('y')) > point.symbolLocations[0].y).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].marker.dataLabel.position = 'Outer';
                chart.refresh();
            });
            it('checking with datalabel Top position', function (done) {
                loaded = function (args) {
                    dataLabel = document.getElementById('container_Series_0_Point_2_Text_0');
                    point = chart.series[0].points[2];
                    expect(+(dataLabel.getAttribute('y')) > point.symbolLocations[0].y).toBe(true);
                    dataLabel = document.getElementById('container_Series_0_Point_1_Text_0');
                    point = chart.series[0].points[1];
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
                    expect(+(dataLabel.getAttribute('y')) > (point.symbolLocations[0].y + point.regions[0].height / 2)).toBe(true);
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
                    expect(+(dataLabel.getAttribute('y')) < point.symbolLocations[0].y + point.regions[0].height).toBe(true);
                    dataLabel = document.getElementById('container_Series_0_Point_1_Text_0');
                    point = chart.series[0].points[1];
                    expect(+(dataLabel.getAttribute('y')) > point.symbolLocations[0].y - point.regions[0].height).toBe(true);
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
                    expect(parseFloat(tooltip.style.top) < series.points[2].regions[0].y + parseFloat(chartArea.getAttribute('y')));
                    done();
                };
                chart.loaded = loaded;
                chart.tooltip.enable = true;
                chart.refresh();
            });
            it('checking with tooltip negative values', function (done) {
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
        describe('Bar Series - Marker', function () {
            var chartObj;
            var loaded;
            var element;
            element = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(element);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'primaryXAxis', valueType: 'DateTime' },
                    primaryYAxis: { title: 'PrimaryYAxis' },
                    series: [
                        { type: 'Bar', name: 'barSeries1', dataSource: data_spec_2.rotateData1, xName: 'x', yName: 'y',
                            animation: { enable: false }, marker: { visible: true }
                        },
                    ],
                    width: '700'
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                element.remove();
            });
            it('Showing default marker', function (done) {
                loaded = function (args) {
                    var marker = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(marker !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Changing visibility', function (done) {
                loaded = function (args) {
                    var series1 = document.getElementById('containerSymbolGroup0');
                    expect(series1 == null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.visible = false;
                chartObj.refresh();
            });
            it('Changing size', function (done) {
                loaded = function (args) {
                    var series1 = document.getElementById('container_Series_0_Point_3_Symbol');
                    expect(series1.getAttribute('rx') == '5').toBe(true);
                    expect(series1.getAttribute('ry') == '5').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.visible = true;
                chartObj.series[0].marker.width = 10;
                chartObj.series[0].marker.height = 10;
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
            it('with image', function (done) {
                loaded = function (args) {
                    var series1 = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(series1.getAttribute('href') == 'base/spec/img/img1.jpg').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Image';
                chartObj.series[0].marker.imageUrl = 'base/spec/img/img1.jpg';
                chartObj.series[0].marker.height = 20;
                chartObj.series[0].marker.width = 20;
                chartObj.refresh();
            });
            it('with marker properties', function (done) {
                loaded = function (args) {
                    var series1 = document.getElementById('container_Series_0_Point_2_Symbol');
                    expect(series1.getAttribute('fill') == 'green').toBe(true);
                    expect(series1.getAttribute('opacity') == '0.1').toBe(true);
                    expect(series1.getAttribute('stroke') == 'red').toBe(true);
                    expect(series1.getAttribute('stroke-width') == '4').toBe(true);
                    expect(series1.getAttribute('cy') == '229.70727999046034').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Circle';
                chartObj.series[0].marker.fill = 'green';
                chartObj.series[0].marker.opacity = 0.1;
                chartObj.series[0].marker.offset.y = -20;
                chartObj.series[0].marker.border = {
                    width: 4,
                    color: 'red'
                };
                chartObj.refresh();
            });
            it('with marker and datalabel', function (done) {
                loaded = function (args) {
                    var series1 = document.getElementById('container_Series_0_Point_1_Symbol');
                    var datalabel = document.getElementById('container_Series_0_Point_1_Text_0');
                    expect(+(datalabel.getAttribute('x')) < +(series1.getAttribute('cx'))).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.visible = true;
                chartObj.series[0].marker.dataLabel.position = 'Outer';
                chartObj.series[0].marker.offset.y = 0;
                chartObj.refresh();
            });
        });
        describe('Bar Series - line break labels', function () {
            var chartObj;
            var loaded;
            var element;
            element = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(element);
                chartObj = new chart_1.Chart({
                    primaryXAxis: {
                        title: 'Country',
                        valueType: 'Category',
                        majorGridLines: { width: 0 },
                        enableTrim: true,
                    },
                    primaryYAxis: {
                        minimum: 0,
                        maximum: 800,
                        edgeLabelPlacement: 'Shift',
                        majorGridLines: { width: 0 },
                        majorTickLines: { width: 0 },
                        lineStyle: { width: 0 },
                        labelStyle: {
                            color: 'transparent'
                        }
                    },
                    chartArea: {
                        border: {
                            width: 0
                        }
                    },
                    series: [
                        {
                            type: 'Bar',
                            dataSource: [
                                { x: 'Germany', y: 72, country: 'GER: 72' },
                                { x: 'Russia', y: 103.1, country: 'RUS: 103.1' },
                                { x: 'Brazil', y: 139.1, country: 'BRZ: 139.1' },
                                { x: 'India', y: 462.1, country: 'IND: 462.1' },
                                { x: 'China', y: 721.4, country: 'CHN: 721.4' },
                                { x: 'United States<br>Of America', y: 286.9, country: 'USA: 286.9' },
                                { x: 'Great Britain', y: 115.1, country: 'GBR: 115.1' },
                                { x: 'Nigeria', y: 97.2, country: 'NGR: 97.2' },
                            ],
                            xName: 'x', width: 2,
                            yName: 'y',
                        }
                    ],
                }, '#container');
            });
            afterAll(function () {
                chartObj.destroy();
                element.remove();
            });
            it('checking break labels', function (done) {
                loaded = function (args) {
                    var label = document.getElementById('container0_AxisLabel_5');
                    expect(label.childElementCount == 1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
        });
        describe('Bar series with drag and drop support', function () {
            var barChart;
            var x;
            var y;
            var loaded;
            var trigger = new events_spec_1.MouseEvents();
            var barContainer = ej2_base_1.createElement('div', { id: 'bar-drag' });
            beforeAll(function () {
                document.body.appendChild(barContainer);
                barChart = new chart_1.Chart({
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
                            type: 'Bar',
                            dataSource: [
                                { x: new Date(2005, 0, 1), y: 21 }, { x: new Date(2006, 0, 1), y: 24 },
                                { x: new Date(2007, 0, 1), y: 36 }, { x: new Date(2008, 0, 1), y: 38 },
                                { x: new Date(2009, 0, 1), y: 54 }, { x: new Date(2010, 0, 1), y: 57 },
                                { x: new Date(2011, 0, 1), y: 70 }
                            ],
                            animation: { enable: false },
                            xName: 'x', width: 2, marker: {
                                visible: true,
                                width: 10,
                                height: 10
                            },
                            yName: 'y', name: 'Germany', dragSettings: { enable: true }
                        },
                    ],
                    title: 'Inflation - Consumer Price',
                    tooltip: {
                        enable: false
                    },
                });
                barChart.appendTo('#bar-drag');
            });
            afterAll(function () {
                barChart.destroy();
                barContainer.remove();
            });
            it('Bar series drag and drop with marker true', function (done) {
                loaded = function () {
                    var target = document.getElementById('bar-drag_Series_0_Point_3_Symbol');
                    var chartArea = document.getElementById('bar-drag_ChartAreaBorder');
                    y = parseFloat(target.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + barContainer.offsetTop;
                    x = parseFloat(target.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + barContainer.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    trigger.draganddropEvent(barContainer, Math.ceil(x), Math.ceil(y), Math.ceil(x) + 100, Math.ceil(y));
                    var yValue = barChart.visibleSeries[0].points[3].yValue;
                    expect(yValue == 52.39 || yValue == 52.13).toBe(true);
                    barChart.loaded = null;
                    done();
                };
                barChart.loaded = loaded;
                barChart.refresh();
            });
            it('Bar series drag and drop with isTransposed true', function (done) {
                loaded = function () {
                    var target = document.getElementById('bar-drag_Series_0_Point_3_Symbol');
                    var chartArea = document.getElementById('bar-drag_ChartAreaBorder');
                    y = parseFloat(target.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + barContainer.offsetTop;
                    x = parseFloat(target.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + barContainer.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    trigger.draganddropEvent(barContainer, Math.ceil(x), Math.ceil(y), Math.ceil(x), Math.ceil(y) + 50);
                    var yValue = barChart.visibleSeries[0].points[3].yValue;
                    expect(yValue == 22.87 || yValue == 23.12).toBe(true);
                    barChart.loaded = null;
                    done();
                };
                barChart.loaded = loaded;
                barChart.isTransposed = true;
                barChart.refresh();
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
