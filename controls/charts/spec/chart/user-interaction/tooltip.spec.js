define(["require", "exports", "@syncfusion/ej2-base", "../../../src/chart/chart", "../../../src/chart/series/line-series", "../../../src/chart/series/column-series", "../../../src/chart/series/bar-series", "../../../src/chart/user-interaction/tooltip", "../base/events.spec", "../base/data.spec", "../../../src/chart/axis/date-time-axis", "../../../src/chart/axis/category-axis", "../../common.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, chart_1, line_series_1, column_series_1, bar_series_1, tooltip_1, events_spec_1, data_spec_1, date_time_axis_1, category_axis_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(line_series_1.LineSeries, column_series_1.ColumnSeries, date_time_axis_1.DateTime, category_axis_1.Category, bar_series_1.BarSeries);
    chart_1.Chart.Inject(tooltip_1.Tooltip);
    var data = data_spec_1.tooltipData1;
    var data2 = data_spec_1.tooltipData2;
    describe('Chart Control', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('Chart Tooltip', function () {
            var chartObj;
            var elem = ej2_base_1.createElement('div', { id: 'container' });
            var targetElement;
            var loaded;
            var pointEvent;
            var loaded1;
            var trigger = new events_spec_1.MouseEvents();
            var x;
            var y;
            beforeAll(function () {
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis', labelFormat: 'C' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal' },
                    series: [{
                            dataSource: data, xName: 'x', yName: 'y', animation: { enable: false },
                            name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
                            marker: {
                                shape: 'Circle', visible: true, width: 10, height: 10, opacity: 1,
                                border: { width: 1, color: null }
                            }
                        }], width: '800',
                    tooltip: { enable: true },
                    title: 'Chart TS Title', loaded: loaded, legendSettings: { visible: false }
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                elem.remove();
            });
            it('Point mouse move and click', function (done) {
                loaded = function (args) {
                    targetElement = chartObj.element.querySelector('#container_Series_0_Point_1_Symbol');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(targetElement.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = parseFloat(targetElement.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(targetElement, Math.ceil(x), Math.ceil(y));
                    trigger.clickEvent(targetElement);
                    done();
                };
                pointEvent = function (args) {
                    expect(args.pointIndex == 1).toBe(true);
                    expect(args.seriesIndex == 0).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.pointClick = pointEvent;
                chartObj.pointMove = pointEvent;
                chartObj.refresh();
            });
            it('Default Tooltip', function (done) {
                loaded = function (args) {
                    targetElement = chartObj.element.querySelector('#container_Series_0_Point_1_Symbol');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(targetElement.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = parseFloat(targetElement.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(targetElement, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    var group = tooltip.childNodes[0].childNodes[0];
                    var path = group.childNodes[0];
                    var text1 = group.childNodes[1];
                    var text2 = group.childNodes[2];
                    expect(path.localName == 'path').toBe(true);
                    expect(path.getAttribute('d') != '' || ' ').toBe(true);
                    expect(group.childNodes.length == 5).toBe(true);
                    expect(text1.childNodes.length == 5).toBe(true);
                    expect(text1.textContent.replace(/\u200E/g, '') == 'ChartSeriesNameGold$2000.00 : 40').toBe(true);
                    expect(group.childNodes[2].getAttribute('d') != '' || ' ').toBe(true);
                    done();
                };
                chartObj.pointClick = null;
                chartObj.pointMove = null;
                chartObj.selectionMode = 'None';
                chartObj.selectionPattern = 'None';
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Edge Tooltip', function () {
                targetElement = chartObj.element.querySelector('#container_Series_0_Point_0_Symbol');
                var chartArea = document.getElementById('container_ChartAreaBorder');
                y = parseFloat(targetElement.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                x = parseFloat(targetElement.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                trigger.mousemovetEvent(targetElement, Math.ceil(x), Math.ceil(y));
                var tooltip = document.getElementById('container_tooltip');
                expect(tooltip != null).toBe(true);
                var text2 = tooltip.childNodes[0].childNodes[0].childNodes[1];
                expect(text2.textContent.replace(/\u200E/g, '')).toEqual('ChartSeriesNameGold$1000.00 : 70');
                var trackSymbol = document.getElementById('containerSymbolGroup0').lastChild;
                expect(trackSymbol != null).toBe(true);
                targetElement = chartObj.element.querySelector('#container_Series_0_Point_7_Symbol');
                y = parseFloat(targetElement.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                x = parseFloat(targetElement.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft - 1;
                trigger.mousemovetEvent(targetElement, Math.ceil(x), Math.ceil(y));
                var text1 = tooltip.childNodes[0].childNodes[0].childNodes[1];
                expect(text1.textContent.replace(/\u200E/g, '') == 'ChartSeriesNameGold$8000.00 : 70').toBe(true);
                expect(tooltip.childNodes[0].childNodes[0].childNodes[2].getAttribute('d') != '' || ' ').toBe(true);
            });
            it('Column Tooltip', function (done) {
                ej2_base_1.remove(document.getElementById('container_tooltip'));
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_2');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = series.points[2].regions[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = series.points[2].regions[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    expect(target.getAttribute('opacity') == '0.5').toBe(true);
                    expect(parseFloat(tooltip.style.top) > series.points[2].regions[0].y + parseFloat(chartArea.getAttribute('y')));
                    target = document.getElementById('container_Series_0_Point_0');
                    y = series.points[0].regions[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = series.points[0].regions[0].x + series.points[0].regions[0].width / 2 + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    expect(target.getAttribute('opacity') == '0.5').toBe(true);
                    expect(parseFloat(tooltip.style.left) > series.points[0].regions[0].width / 2 + series.points[0].regions[0].x + parseFloat(chartArea.getAttribute('x')));
                    target = document.getElementById('container_Series_0_Point_7');
                    y = series.points[7].regions[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = series.points[7].regions[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    expect(tooltip != null).toBe(true);
                    expect(target.getAttribute('opacity') == '0.5').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'Column';
                chartObj.series[0].dataSource = data;
                chartObj.refresh();
            });
            it('Tooltip with Highlight color', function (done) {
                ej2_base_1.remove(document.getElementById('container_tooltip'));
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_2');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = series.points[2].regions[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = series.points[2].regions[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    expect(target.getAttribute('opacity') == '1').toBe(true);
                    expect(target.getAttribute('fill') == 'red').toBe(true);
                    target = document.getElementById('container_Series_0_Point_0');
                    y = series.points[0].regions[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = series.points[0].regions[0].x + series.points[0].regions[0].width / 2 + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    expect(target.getAttribute('opacity') == '1').toBe(true);
                    expect(target.getAttribute('fill') == 'red').toBe(true);
                    target = document.getElementById('container_Series_0_Point_5');
                    y = series.points[5].regions[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = series.points[5].regions[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    expect(target.getAttribute('opacity') == '1').toBe(true);
                    expect(target.getAttribute('fill') == 'red').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.highlightColor = 'red';
                chartObj.series[0].type = 'Column';
                chartObj.series[0].dataSource = data;
                chartObj.refresh();
            });
            it('Tooltip for Negative point', function (done) {
                ej2_base_1.remove(document.getElementById('container_tooltip'));
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_1');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var series = chartObj.series[0];
                    y = series.points[1].regions[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = series.points[1].regions[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    expect(parseFloat(tooltip.style.top) < series.points[1].regions[0].height + series.points[1].regions[0].y + parseFloat(chartArea.getAttribute('y')));
                    target = document.getElementById('container_Series_0_Point_5');
                    y = series.points[5].regions[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = series.points[5].regions[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    expect(parseFloat(tooltip.style.top) > series.points[5].regions[0].height + series.points[5].regions[0].y + parseFloat(chartArea.getAttribute('y')));
                    done();
                };
                chartObj.loaded = loaded;
                data[1].y = -40;
                data[5].y = -20;
                chartObj.series[0].dataSource = data;
                chartObj.highlightColor = '';
                chartObj.refresh();
            });
            it('Tooltip for Category Axis', function (done) {
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_6_Symbol');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(target.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = parseFloat(target.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    var text1 = tooltip.childNodes[0].childNodes[0].childNodes[1];
                    expect(text1.textContent.replace(/\u200E/g, '') == 'ChartSeriesNameGold7000 : 40').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.series[0].type = 'Line';
                chartObj.refresh();
            });
            it('Tooltip Without marker', function (done) {
                ej2_base_1.remove(document.getElementById('container_tooltip'));
                loaded = function (args) {
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = chartObj.series[0].points[4].symbolLocations[0].y;
                    x = chartObj.series[0].points[4].symbolLocations[0].x;
                    y += parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x += parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(chartArea, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    var text1 = tooltip.childNodes[0].childNodes[0].childNodes[1];
                    expect(text1.textContent.replace(/\u200E/g, '') == 'ChartSeriesNameGold5000 : 50').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.visible = false;
                chartObj.series[0].marker.height = 5;
                chartObj.series[0].marker.width = 5;
                chartObj.refresh();
            });
            it('checking with tooltip with marker events', function (done) {
                ej2_base_1.remove(document.getElementById('container_tooltip'));
                loaded = function (args) {
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = chartObj.series[0].points[2].symbolLocations[0].y;
                    x = chartObj.series[0].points[2].symbolLocations[0].x;
                    y += parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x += parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(chartArea, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    var text1 = tooltip.childNodes[0].childNodes[0].childNodes[1];
                    var trackSymbol = document.getElementById('container_tooltip_Trackball_0');
                    expect(trackSymbol.getAttribute('fill')).toEqual('red');
                    done();
                };
                chartObj.tooltipRender = function (args) {
                    if (args.point.index == 3) {
                        args.cancel = true;
                    }
                },
                    chartObj.loaded = loaded;
                chartObj.series[0].marker.visible = true;
                chartObj.pointRender = function (args) {
                    if (args.point.index === 2) {
                        args.shape = 'Triangle';
                        args.fill = 'red';
                    }
                };
                chartObj.refresh();
            });
            it('Tooltip for datetime Axis', function (done) {
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_3_Symbol');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(target.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = parseFloat(target.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    var text1 = tooltip.childNodes[0].childNodes[0].childNodes[1];
                    expect(text1.textContent.replace(/\u200E/g, '') == 'ChartSeriesNameGold2006 : 65').toBe(true);
                    ej2_base_1.remove(document.getElementById('container_tooltip'));
                    ej2_base_1.remove(document.getElementById('container_Series_0_Point_3_Trackball_0'));
                    ej2_base_1.remove(document.getElementById('container_Series_0_Point_3_Trackball_1'));
                    done();
                };
                chartObj.tooltipRender = null;
                chartObj.loaded = loaded;
                chartObj.pointRender = null;
                chartObj.primaryXAxis.valueType = 'DateTime';
                chartObj.primaryXAxis.labelFormat = '';
                chartObj.series[0].dataSource = data_spec_1.datetimeData;
                chartObj.series[0].marker.visible = false;
                chartObj.series[0].marker.visible = true;
                chartObj.height = '470';
                chartObj.refresh();
            });
            it('Changing the visibility of tooltip', function (done) {
                var target;
                var tooltip;
                loaded = function (args) {
                    target = document.getElementById('container_Series_0_Point_3_Symbol');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(target.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = parseFloat(target.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    tooltip = document.getElementById('container_tooltip');
                    expect(tooltip == null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.tooltip.enable = false;
                chartObj.refresh();
            });
            it('Changing the visibility of tooltip with axis label format', function (done) {
                var target;
                var tooltip;
                loaded1 = function (args) {
                    target = document.getElementById('container_Series_0_Point_2_Symbol');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(target.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = parseFloat(target.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    var group = tooltip.childNodes[0].childNodes[0];
                    var path = group.childNodes[0];
                    var text1 = group.childNodes[1];
                    expect(path.getAttribute('fill') == 'pink').toBe(true);
                    expect(text1.childNodes[0].getAttribute('fill') == 'red').toBe(true);
                    expect(text1.textContent.replace(/\u200E/g, '') == 'ChartSeriesNameGold#3000 : 70C').toBe(true);
                    expect(document.getElementById('container_Series_0_Point_2_Trackball_0').getAttribute('fill') == 'transparent').toBe(true);
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y + 50));
                };
                chartObj.animationComplete = function (args) {
                    var track = document.getElementById('container_Series_0_Point_2_Trackball_0');
                    done();
                };
                chartObj.loaded = loaded1;
                chartObj.tooltip.enable = true;
                chartObj.tooltip.fill = 'pink';
                chartObj.tooltip.textStyle.color = 'red';
                chartObj.tooltip.format = null;
                chartObj.primaryYAxis.labelFormat = '{value}C';
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.primaryXAxis.labelFormat = '#{value}';
                chartObj.series[0].dataSource = data;
                chartObj.series[0].marker.fill = 'blue';
                chartObj.refresh();
            });
            it('Checking with template', function (done) {
                var tooltip;
                ej2_base_1.remove(document.getElementById('container_tooltip'));
                loaded1 = function (args) {
                    var target;
                    target = document.getElementById('container_Series_0_Point_1_Symbol');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(target.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = parseFloat(target.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(chartArea.getAttribute('height')) + parseFloat(chartArea.getAttribute('y')) + 200 + elem.offsetTop;
                    x = parseFloat(chartArea.getAttribute('width')) + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    done();
                };
                var animate = function (args) {
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip == null).toBe(true);
                    done();
                };
                chartObj.animationComplete = null;
                chartObj.tooltip.template = '<div>${x}</div><div>${y}</div>';
                chartObj.title = 'Template';
                chartObj.loaded = loaded1;
                chartObj.dataBind();
            });
            it('Checking with inverted axis series', function (done) {
                var tooltip;
                loaded1 = function (args) {
                    trigger.mousemovetEvent(elem, 400, 110);
                    tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    trigger.mousemovetEvent(elem, 300, 170);
                    tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded1;
                chartObj.series = [{
                        type: 'Bar', dataSource: data, xName: 'x', yName: 'y', animation: { enable: false },
                    }, { type: 'Bar', dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false } }];
                chartObj.animationComplete = null;
                chartObj.refresh();
            });
            it('Tooltip for Category Axis with Tooltip Mapping Name', function (done) {
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_6_Symbol');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(target.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = parseFloat(target.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    var text1 = tooltip.childNodes[0].childNodes[0].childNodes[1];
                    expect(text1.textContent == 'undefined').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.series[0].type = 'Line';
                chartObj.tooltip.template = '';
                chartObj.series[0].tooltipMappingName = 'tooltip';
                chartObj.tooltip.format = '${point.tooltip}';
                chartObj.series[0].marker.visible = true;
                chartObj.refresh();
            });
            it('Tooltip for Category Axis with Tooltip Mapping Name', function (done) {
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_6_Symbol');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(target.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = parseFloat(target.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    var text1 = tooltip.childNodes[0].childNodes[0].childNodes[1];
                    expect(text1.textContent == '40').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.series[0].type = 'Line';
                chartObj.tooltip.template = '';
                chartObj.series[0].tooltipMappingName = 'y';
                chartObj.tooltip.format = '${point.tooltip}';
                chartObj.series[0].marker.visible = true;
                chartObj.refresh();
            });
            it('Checking with multiple series with tooltip', function (done) {
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_6_Symbol');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(target.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = parseFloat(target.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    var text1 = tooltip.childNodes[0].childNodes[0].childNodes[1];
                    expect(text1.textContent == '40').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.series[0].type = 'Line';
                chartObj.tooltip.template = '';
                chartObj.tooltip.format = '${point.x} : ${point.y}';
                chartObj.series[0].tooltipMappingName = 'y';
                chartObj.series[0].tooltipFormat = '${point.tooltip}';
                chartObj.series[0].marker.visible = true;
                chartObj.refresh();
            });
            it('Tooltip for column with marker', function (done) {
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_6_Symbol');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(target.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = parseFloat(target.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(+((tooltip.style.top).replace('px', '')) < +target.getAttribute('cy')).toBe(true);
                    expect(tooltip != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'Column';
                chartObj.refresh();
            });
            it('Tooltip for Line with marker', function (done) {
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_6_Symbol');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(target.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = parseFloat(target.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(+((tooltip.style.top).replace('px', '')) < +target.getAttribute('cy')).toBe(true);
                    expect(tooltip != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'Line';
                chartObj.refresh();
            });
            it('checking with tooltipRender event with headerText', function (done) {
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_6_Symbol');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(target.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = parseFloat(target.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip_text');
                    expect(tooltip.firstElementChild.innerHTML).toEqual('${point.x}');
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.tooltipRender = function (args) {
                    args.headerText = '${point.x}';
                };
                chartObj.tooltip = { enable: true };
                chartObj.refresh();
            });
            it('checking with headerText without header', function (done) {
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_6_Symbol');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(target.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = parseFloat(target.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip_text');
                    expect(tooltip.firstElementChild.innerHTML).toEqual('${point.x}');
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.tooltipRender = function (args) {
                    args.headerText = '${point.x}';
                };
                chartObj.tooltip.header = '';
                chartObj.refresh();
            });
            it('checking with tooltipRender event with template', function (done) {
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_6_Symbol');
                    var target1 = document.getElementById('container_Series_0_Point_5_Symbol');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(target.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = parseFloat(target.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    expect(tooltip.firstElementChild.innerHTML).toEqual('<div>40C</div><div>7000</div>');
                    y = parseFloat(target1.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = parseFloat(target1.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target1, Math.ceil(x), Math.ceil(y));
                    expect(tooltip.firstElementChild.innerHTML).toEqual('<div>6000</div><div>-20C</div>');
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.tooltip = { enable: true };
                chartObj.tooltip.template = "<div>${x}</div><div>${y}</div>";
                chartObj.tooltipRender = function (args) {
                    if (args.point.index == 6)
                        args.template = '<div>${y}</div><div>${x}</div>';
                };
                chartObj.refresh();
            });
        });
        describe('Chart template', function () {
            var chartObj;
            var elem = ej2_base_1.createElement('div', { id: 'container' });
            var targetElement;
            var loaded;
            var pointEvent;
            var loaded1;
            var trigger = new events_spec_1.MouseEvents();
            var x;
            var y;
            beforeAll(function () {
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis', valueType: 'Category' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal', labelFormat: '{value}°C' },
                    series: [{
                            dataSource: [
                                { x: 'Sun', y: 15 }, { x: 'Mon', y: 22 },
                                { x: 'Tue', y: 32 },
                                { x: 'Wed', y: 31 },
                                { x: 'Thu', y: 29 }, { x: 'Fri', y: 24 },
                                { x: 'Sat', y: 18 },
                            ], xName: 'x', yName: 'y', animation: { enable: false },
                            name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
                            marker: {
                                shape: 'Circle', visible: true, width: 10, height: 10, opacity: 1,
                                border: { width: 1, color: null }
                            }
                        },
                        {
                            dataSource: [
                                { x: 'Sun', y: 10 }, { x: 'Mon', y: 18 },
                                { x: 'Tue', y: 28 },
                                { x: 'Wed', y: 28 },
                                { x: 'Thu', y: 26 }, { x: 'Fri', y: 20 },
                                { x: 'Sat', y: 15 }
                            ], xName: 'x', yName: 'y', animation: { enable: false },
                            name: 'ChartSeriesNameSilver', fill: 'rgba(135,206,235,1)',
                            marker: {
                                shape: 'Circle', visible: true, width: 10, height: 10, opacity: 1,
                                border: { width: 1, color: null }
                            }
                        }], width: '800',
                    tooltip: { enable: true, shared: true },
                    title: 'Chart TS Title', loaded: loaded, legendSettings: { visible: false }
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                elem.remove();
            });
            it('Checking with shared template', function (done) {
                var tooltip;
                loaded1 = function (args) {
                    var target;
                    target = document.getElementById('container_Series_0_Point_1_Symbol');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(target.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = parseFloat(target.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(chartArea.getAttribute('height')) + parseFloat(chartArea.getAttribute('y')) + 200 + elem.offsetTop;
                    x = parseFloat(chartArea.getAttribute('width')) + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    done();
                };
                var animate = function (args) {
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip == null).toBe(true);
                    done();
                };
                chartObj.animationComplete = null;
                chartObj.tooltip.template = '<div>${x}</div><div>${y}</div>';
                chartObj.title = 'Template';
                chartObj.loaded = loaded1;
                chartObj.dataBind();
            });
        });
        describe('customer issue: Tooltip on property change console error checking', function () {
            var chartObj;
            var div = ej2_base_1.createElement('div', { id: 'mainDiv' });
            var elem = ej2_base_1.createElement('div', { id: 'container' });
            var button1 = ej2_base_1.createElement('button', { id: 'button1' });
            var button2 = ej2_base_1.createElement('button', { id: 'button2' });
            var targetElement;
            var loaded;
            var trigger = new events_spec_1.MouseEvents();
            beforeAll(function () {
                document.body.appendChild(div);
                div.appendChild(button1);
                div.appendChild(button2);
                div.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: {
                        valueType: 'Category', interval: 1, majorGridLines: { width: 0 }
                    },
                    chartArea: { border: { width: 0 } },
                    primaryYAxis: {
                        majorGridLines: { width: 0 },
                        majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' }
                    },
                    series: [
                        {
                            type: 'Column', xName: 'x', width: 2, yName: 'y', name: 'Gold',
                            dataSource: [{ x: 'USA', y: 46 }, { x: 'GBR', y: 27 }, { x: 'CHN', y: 26 }],
                            marker: { dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }
                        },
                        {
                            type: 'Column', xName: 'x', width: 2, yName: 'y', name: 'Silver',
                            dataSource: [{ x: 'USA', y: 37 }, { x: 'GBR', y: 23 }, { x: 'CHN', y: 18 }],
                            marker: { dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }
                        },
                        {
                            type: 'Column', xName: 'x', width: 2, yName: 'y', name: 'Bronze',
                            dataSource: [{ x: 'USA', y: 38 }, { x: 'GBR', y: 17 }, { x: 'CHN', y: 26 }],
                            marker: { dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }
                        }
                    ],
                    width: '500px',
                    title: 'Olympic Medal Counts - RIO', tooltip: { enable: true },
                });
                chartObj.appendTo('#container');
                document.getElementById('button1').onclick = function () {
                    chartObj.tooltip = { enable: false };
                };
                document.getElementById('button2').onclick = function () {
                    chartObj.tooltip = { enable: true };
                };
            });
            afterAll(function () {
                chartObj.destroy();
                div.remove();
            });
            it('Disable the tooltip', function (done) {
                loaded = function (args) {
                    targetElement = document.getElementById('button1');
                    trigger.clickEvent(targetElement);
                    expect(chartObj.tooltip.enable === false).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Enable the tooltip', function (done) {
                loaded = function (args) {
                    targetElement = document.getElementById('button2');
                    trigger.clickEvent(targetElement);
                    expect(chartObj.tooltip.enable === true).toBe(true);
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
