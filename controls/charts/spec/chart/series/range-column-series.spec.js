define(["require", "exports", "@syncfusion/ej2-base", "../../../src/chart/chart", "../../../src/chart/legend/legend", "../../../src/chart/series/line-series", "../../../src/chart/series/data-label", "../../../src/chart/axis/category-axis", "../../../src/chart/axis/date-time-axis", "../../../src/chart/axis/logarithmic-axis", "../../../src/chart/series/column-series", "../../../src/chart/series/range-column-series", "../base/data.spec", "../base/events.spec", "../../../src/chart/user-interaction/tooltip", "../../../src/chart/user-interaction/crosshair", "../../../src/chart/user-interaction/selection", "../../common.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, chart_1, legend_1, line_series_1, data_label_1, category_axis_1, date_time_axis_1, logarithmic_axis_1, column_series_1, range_column_series_1, data_spec_1, events_spec_1, tooltip_1, crosshair_1, selection_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(line_series_1.LineSeries, column_series_1.ColumnSeries, data_label_1.DataLabel, category_axis_1.Category, date_time_axis_1.DateTime, range_column_series_1.RangeColumnSeries, legend_1.Legend, tooltip_1.Tooltip, crosshair_1.Crosshair, logarithmic_axis_1.Logarithmic, selection_1.Selection);
    exports.categoryData = [
        { x: 'USA', low: -12, high: 0 }, { x: 'China', low: 12, high: 10 },
        { x: 'Japan', low: 23, high: 10 }, { x: 'Australia', low: 202, high: 43 },
        { x: 'France1', low: 0, high: 10 }, { x: 'Germany1', low: -22, high: 34 },
        { x: 'Italy', low: -12, high: 23 }, { x: 'Sweden', low: 12, high: 40 }
    ];
    exports.doubleData = [
        { x: 1, low: -12, high: 0 }, { x: 2, low: 12, high: 10 },
        { x: 3, low: 23, high: 10 }, { x: 4, low: 202, high: 43 },
        { x: 5, low: 0, high: 10 }, { x: 6, low: -22, high: 34 },
        { x: 7, low: -12, high: 23 }, { x: 8, low: 12, high: 40 }
    ];
    exports.dateTimeData = [
        { x: new Date(1, 0, 2000), low: -12, high: 0 }, { x: new Date(1, 0, 2001), low: 12, high: 10 },
        { x: new Date(1, 0, 2002), low: 23, high: 10 }, { x: new Date(1, 0, 2003), low: 202, high: 43 },
        { x: new Date(1, 0, 2004), low: 0, high: 10 }, { x: new Date(1, 0, 2005), low: -22, high: 34 },
        { x: new Date(1, 0, 2006), low: -12, high: 23 }, { x: new Date(1, 0, 2007), low: 12, high: 40 }
    ];
    describe('Chart', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        var element;
        describe('Range Column Series', function () {
            var chartObj;
            var loaded;
            var animationComplete;
            var trigger = new events_spec_1.MouseEvents();
            element = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                var template = ej2_base_1.createElement('div', { id: 'template', styles: 'display: none;' });
                document.body.appendChild(template);
                template.innerHTML = '<div>80</div>';
                var template1 = ej2_base_1.createElement('div', { id: 'template1', styles: 'display: none;' });
                document.body.appendChild(template1);
                template1.innerHTML = '<div>${point.high}:${point.low}</div>';
                document.body.appendChild(element);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal' },
                    series: [{
                            animation: { enable: false }, name: 'ChartSeriesNameGold',
                            type: 'RangeColumn', fill: 'rgba(135,206,235,1)',
                        }],
                    width: '800',
                    title: 'Chart TS Title', loaded: loaded, legendSettings: { visible: false }
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                document.getElementById('container').remove();
                ej2_base_1.remove(document.getElementById('template'));
                ej2_base_1.remove(document.getElementById('template1'));
            });
            it('Default Series Type without data Points', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('containerSeriesGroup0').childNodes.length;
                    expect(svg == 1).toBe(true);
                    var xAxisLabelCollection = document.getElementById('containerAxisLabels0');
                    expect(xAxisLabelCollection.childNodes.length == 11).toBe(true);
                    var yAxisLabelCollection = document.getElementById('containerAxisLabels1');
                    expect(yAxisLabelCollection.childNodes.length == 7).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Added data Source', function (done) {
                loaded = function (args) {
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = [{
                        x: 1,
                        low: 10,
                        high: 20
                    }];
                chartObj.series[0].xName = 'x';
                chartObj.series[0].low = 'low';
                chartObj.series[0].high = 'high';
                chartObj.refresh();
            });
            it('With single data point', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0_Point_0');
                    expect(svg.getAttribute('d') != '').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Single data point with range', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0_Point_0');
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
            it('Checking with null points', function (done) {
                loaded = function (args) {
                    var point = document.getElementById('container_Series_0_Point_0');
                    expect(point == null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].visible = true;
                chartObj.series[0].dataSource[0].high = null;
                chartObj.series[0].dataSource[0].low = null;
                chartObj.refresh();
            });
            it('with dateTimeRange', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('container_Series_0_Point_3');
                    var stroke = seriesElements.getAttribute('stroke-width');
                    expect(stroke == '0').toBe(true);
                    var labelElement = document.getElementById('container0_AxisLabel_3');
                    expect(labelElement.textContent == '26').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'DateTime';
                chartObj.series = [{
                        dataSource: exports.dateTimeData, xName: 'x', low: 'low', high: 'high',
                        animation: { enable: false }, type: 'RangeColumn',
                        name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
                    }];
                chartObj.refresh();
            });
            it('Checking with dateTime any one null points', function (done) {
                loaded = function (args) {
                    var point = document.getElementById('container_Series_0_Point_0');
                    expect(point == null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource[0].high = null;
                chartObj.refresh();
            });
            it('Checking with dateTime any  null points', function (done) {
                loaded = function (args) {
                    var point = document.getElementById('container_Series_0_Point_0');
                    expect(point == null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource[0].high = null;
                chartObj.series[0].dataSource[0].low = null;
                chartObj.refresh();
            });
            it('Checking with category axis BetweenTicks', function (done) {
                loaded = function (args) {
                    var point = document.getElementById('container_Series_0_Point_0');
                    expect(point != null).toBe(true);
                    var axisLabel = document.getElementById('container0_AxisLabel_0');
                    expect(axisLabel.textContent == 'USA').toBe(true);
                    var axisStart = document.getElementById('containerAxisLine_0');
                    expect(parseInt(axisLabel.getAttribute('x')) > parseInt(axisStart.getAttribute('d').split(' ')[1])).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.primaryXAxis.labelPlacement = 'BetweenTicks';
                chartObj.series[0].dataSource = exports.categoryData;
                chartObj.series[0].xName = 'x';
                chartObj.series[0].low = 'low';
                chartObj.series[0].high = 'high';
                chartObj.refresh();
            });
            it('Checking with category axis OnTicks', function (done) {
                loaded = function (args) {
                    var point = document.getElementById('container_Series_0_Point_0');
                    expect(point != null).toBe(true);
                    var axisLabel = document.getElementById('container0_AxisLabel_0');
                    expect(axisLabel.textContent == 'USA').toBe(true);
                    var axisStart = document.getElementById('containerAxisLine_0');
                    expect(parseInt(axisLabel.getAttribute('x')) < parseInt(axisStart.getAttribute('d').split(' ')[1])).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.primaryXAxis.labelPlacement = 'OnTicks';
                chartObj.series[0].dataSource = exports.categoryData;
                chartObj.refresh();
            });
            it('Checking with Category any one null points', function (done) {
                loaded = function (args) {
                    var point = document.getElementById('container_Series_0_Point_0');
                    expect(point == null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource[0].high = null;
                chartObj.refresh();
            });
            it('Checking with category  null points', function (done) {
                loaded = function (args) {
                    var point = document.getElementById('container_Series_0_Point_0');
                    expect(point == null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource[0].high = null;
                chartObj.series[0].dataSource[0].low = null;
                chartObj.refresh();
            });
            it('Checking with low value higher than high value', function (done) {
                loaded = function (args) {
                    var point = document.getElementById('container_Series_0_Point_0');
                    expect(point != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource[0].high = 44;
                chartObj.series[0].dataSource[0].low = 29;
                chartObj.refresh();
            });
            it('Checking with low value higher equal to high value', function (done) {
                loaded = function (args) {
                    var point = document.getElementById('container_Series_0_Point_0');
                    expect(point.getAttribute('d')).not.toBeNull();
                    expect(point != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource[0].high = 44;
                chartObj.series[0].dataSource[0].low = 44;
                chartObj.refresh();
            });
            it('Checking animation', function (done) {
                animationComplete = function (args) {
                    var point = document.getElementById('container_Series_' + args.series.index + '_Point_0');
                    expect(point.getAttribute('transform') === 'translate(0,0)').toBe(true);
                    done();
                };
                chartObj.animationComplete = animationComplete;
                chartObj.series[0].animation.enable = true;
                chartObj.refresh();
            });
            it('Legend Shape type', function (done) {
                loaded = function (args) {
                    var legendElement = document.getElementById('container_chart_legend_element');
                    expect(legendElement.tagName).toEqual('rect');
                    expect(legendElement.getAttribute('d')).not.toEqual(null);
                    var legendShape = document.getElementById('container_chart_legend_shape_0');
                    expect(legendShape.tagName).toEqual('path');
                    expect(legendShape.getAttribute('d') !== null).toBe(true);
                    done();
                };
                chartObj.animationComplete = null;
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'RangeColumn';
                chartObj.legendSettings = { visible: true };
                chartObj.refresh();
            });
            it('checking with multiple series', function (done) {
                loaded = function (args) {
                    var series0 = chartObj.series[0];
                    var series1 = chartObj.series[1];
                    expect((series1.points[2].regions[0].x) == series0.points[2].regions[0].width + series0.points[2].regions[0].x).toBe(true);
                    done();
                };
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.primaryYAxis.valueType = 'Double';
                chartObj.series = [
                    {
                        dataSource: exports.doubleData, xName: 'x', high: 'high', low: 'low',
                        name: 'series1', type: 'RangeColumn', animation: { enable: false }
                    },
                    {
                        dataSource: exports.doubleData, xName: 'x', high: 'high',
                        low: 'low', name: 'series2', type: 'RangeColumn', animation: { enable: false }
                    }
                ];
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking negativeDataPoint', function (done) {
                loaded = function (args) {
                    var series = chartObj.series[0];
                    var axisLabel = document.getElementById('container1_AxisLabel_0');
                    expect(series.points[1].regions[0].y < parseFloat(axisLabel.getAttribute('y'))).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Single point selection', function (done) {
                loaded = function () {
                    var element = document.getElementById('container_Series_0_Point_4');
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
                chartObj.refresh();
            });
            it('Single point multi selection', function (done) {
                loaded = function () {
                    var element = document.getElementById('container_Series_0_Point_4');
                    trigger.clickEvent(element);
                    var selected = document.getElementsByClassName('container_ej2_chart_selection_series_0 ');
                    expect(element).toBe(selected[0]);
                    element = document.getElementById('container_Series_0_Point_5');
                    trigger.clickEvent(element);
                    selected = document.getElementsByClassName('container_ej2_chart_selection_series_0 ');
                    expect(selected.length).toBe(3);
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
                    var element = document.getElementById('container_Series_0_Point_4');
                    var series = document.getElementById('containerSeriesGroup0');
                    trigger.clickEvent(element);
                    var selected = document.getElementsByClassName('container_ej2_chart_selection_series_0 ');
                    expect(series).toBe(selected[0]);
                    trigger.clickEvent(element);
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
                    var element = document.getElementById('container_Series_0_Point_4');
                    var element1 = document.getElementById('container_Series_1_Point_4');
                    trigger.clickEvent(element);
                    var selected = document.getElementsByClassName('container_ej2_chart_selection_series_0 ');
                    expect(element).toBe(selected[0]);
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
            it('checking with tooltip', function (done) {
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_1');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = series.points[1].regions[0].y + parseFloat(chartArea.getAttribute('y')) + element.offsetTop;
                    var x = series.points[1].regions[0].x + parseFloat(chartArea.getAttribute('x')) + element.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    expect(target.getAttribute('opacity') == '0.5').toBe(true);
                    expect(tooltip.childNodes[0].childNodes[0].childNodes[1].textContent.replace(/\u200E/g, '')).toEqual('series12High : 10Low : 12');
                    expect(parseFloat(tooltip.style.top) < (series.points[1].regions[0].y + parseFloat(chartArea.getAttribute('y'))));
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.selectionModule.selectedDataIndexes = [];
                chartObj.tooltip.enable = true;
                chartObj.refresh();
            });
            it('checking with track ball', function (done) {
                ej2_base_1.remove(document.getElementById('container_tooltip'));
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_3');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = series.points[3].regions[0].y + parseFloat(chartArea.getAttribute('y')) + element.offsetTop;
                    var x = series.points[3].regions[0].x + parseFloat(chartArea.getAttribute('x')) + element.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    expect(tooltip.offsetTop < y + series.points[3].regions[0].height).toBe(true);
                    tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.tooltip.shared = true;
                chartObj.refresh();
            });
            it('checking with cross hair', function (done) {
                loaded = function (args) {
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var series = chartObj.series[0];
                    var y = series.points[2].regions[0].y + parseFloat(chartArea.getAttribute('y')) + element.offsetTop;
                    var x = series.points[2].regions[0].x + series.points[2].regions[0].width / 2 +
                        parseFloat(chartArea.getAttribute('x')) + element.offsetLeft;
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
                    expect(element1.getAttribute('d') != '').toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[2];
                    expect(element1.getAttribute('d') != '').toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[1];
                    expect(element1.textContent).toEqual('3');
                    element1 = crosshair.childNodes[2].childNodes[3];
                    expect(Math.round(+element1.textContent) == 23 || Math.round(+element1.textContent) == 22).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.crosshair.enable = true;
                chartObj.series[0].animation.enable = false;
                chartObj.primaryXAxis.crosshairTooltip.enable = true;
                chartObj.primaryYAxis.crosshairTooltip.enable = true;
                chartObj.refresh();
            });
            it('checking with log axis with dataTime axis', function (done) {
                loaded = function (args) {
                    var axisLabel = document.getElementById('container1_AxisLabel_1');
                    expect(axisLabel.textContent == '10').toBe(true);
                    var axisLabelLast = document.getElementById('container1_AxisLabel_5');
                    expect(axisLabelLast.textContent == '100000').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'DateTime';
                chartObj.primaryYAxis.valueType = 'Logarithmic';
                chartObj.series = [
                    {
                        type: 'RangeColumn', name: 'Series1', xName: 'x', low: 'low', high: 'high',
                        dataSource: [
                            { x: new Date(1, 0, 2000), low: 100, high: 10000 }, { x: new Date(1, 0, 2001), low: 120, high: 2000 },
                            { x: new Date(1, 0, 2002), low: 232, high: 1233 }, { x: new Date(1, 0, 2003), low: 202, high: 4003 },
                            { x: new Date(1, 0, 2004), low: 0, high: 10342 }, { x: new Date(1, 0, 2005), low: 4622, high: 340 },
                            { x: new Date(1, 0, 2006), low: 120, high: 2300 }, { x: new Date(1, 0, 2007), low: 1223, high: 4000 }
                        ]
                    }
                ];
                chartObj.refresh();
            });
            it('checking with log axis in both axis', function (done) {
                loaded = function (args) {
                    var axisLabel = document.getElementById('container1_AxisLabel_1');
                    expect(axisLabel.textContent == '10').toBe(true);
                    var axisLabelLast = document.getElementById('container1_AxisLabel_5');
                    expect(axisLabelLast.textContent == '100000').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Logarithmic';
                chartObj.primaryYAxis.valueType = 'Logarithmic';
                chartObj.series = [
                    {
                        type: 'RangeColumn', name: 'Series1', xName: 'x', low: 'low', high: 'high',
                        dataSource: [
                            { x: 100, low: 100, high: 10000 }, { x: 200, low: 120, high: 2000 },
                            { x: 300, low: 232, high: 1233 }, { x: 1000, low: 202, high: 4003 },
                            { x: 10000, low: 0, high: 10342 }, { x: 1500, low: 4622, high: 340 },
                            { x: 2000, low: 120, high: 2300 }, { x: 8000, low: 1223, high: 4000 }
                        ]
                    }
                ];
                chartObj.refresh();
            });
            it('checking with datalabel outer position', function (done) {
                loaded = function (args) {
                    var svg = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('y');
                    var label = document.getElementById('container_Series_0_Point_1_Text_0');
                    var point0Location = chartObj.series[0].points[1].symbolLocations[0].y;
                    var height = chartObj.series[0].points[1].regions[0].height / 2;
                    expect(label.textContent).toEqual('12K');
                    expect(svg < (point0Location - height)).toBe(true);
                    var svg1 = +document.getElementById('container_Series_0_Point_1_TextShape_1').getAttribute('y');
                    var label2 = document.getElementById('container_Series_0_Point_1_Text_1');
                    expect(label2.textContent).toEqual('10K');
                    expect(svg1 > point0Location + height).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.primaryYAxis.valueType = 'Double';
                chartObj.series[0].dataSource = exports.doubleData;
                chartObj.primaryYAxis.labelFormat = '{value}K';
                chartObj.series[0].xName = 'x';
                chartObj.series[0].low = 'low';
                chartObj.series[0].high = 'high';
                chartObj.series[0].animation.enable = false;
                chartObj.series[0].marker.dataLabel.visible = true;
                chartObj.series[0].marker.dataLabel.position = 'Outer';
                chartObj.series[0].marker.dataLabel.border.color = 'red';
                chartObj.series[0].marker.dataLabel.border.width = 2;
                chartObj.refresh();
            });
            it('checking with datalabel top position', function (done) {
                chartObj.loaded = function (args) {
                    var svg = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('y');
                    var point0Location = chartObj.series[0].points[1].symbolLocations[0].y;
                    var height = chartObj.series[0].points[1].regions[0].height / 2;
                    expect(svg > (point0Location - height)).toBe(true);
                    var svg1 = +document.getElementById('container_Series_0_Point_1_TextShape_1').getAttribute('y');
                    var pointLocation1 = chartObj.series[0].points[1].symbolLocations[0].y;
                    expect(svg1 < pointLocation1 + height).toBe(true);
                    done();
                };
                chartObj.series[0].marker.dataLabel.position = 'Top';
                chartObj.refresh();
            });
            it('checking with datalabel auto position', function (done) {
                chartObj.loaded = function (args) {
                    var svg = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('y');
                    var point0Location = chartObj.series[0].points[1].symbolLocations[0].y;
                    var height = chartObj.series[0].points[1].regions[0].height / 2;
                    expect(svg < (point0Location - height)).toBe(true);
                    var svg1 = +document.getElementById('container_Series_0_Point_1_TextShape_1').getAttribute('y');
                    var pointLocation1 = chartObj.series[0].points[1].symbolLocations[0].y;
                    expect(svg1 > pointLocation1 + height).toBe(true);
                    done();
                };
                chartObj.series[0].marker.dataLabel.position = 'Auto';
                chartObj.refresh();
            });
            it('checking with datalabel Middle(turns to auto) position', function (done) {
                chartObj.loaded = function (args) {
                    var svg = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('y');
                    var point0Location = chartObj.series[0].points[1].symbolLocations[0].y;
                    var height = chartObj.series[0].points[1].regions[0].height / 2;
                    expect(svg < (point0Location - height)).toBe(true);
                    var svg1 = +document.getElementById('container_Series_0_Point_1_TextShape_1').getAttribute('y');
                    var pointLocation1 = chartObj.series[0].points[1].symbolLocations[0].y;
                    expect(svg1 > pointLocation1 + height).toBe(true);
                    done();
                };
                chartObj.series[0].marker.dataLabel.position = 'Middle';
                chartObj.refresh();
            });
            it('checking with datalabel bottom(turns to auto) position', function (done) {
                loaded = function (args) {
                    var svg = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('y');
                    var point0Location = chartObj.series[0].points[1].symbolLocations[0].y;
                    var height = chartObj.series[0].points[1].regions[0].height / 2;
                    expect(svg < (point0Location - height)).toBe(true);
                    var svg1 = +document.getElementById('container_Series_0_Point_1_TextShape_1').getAttribute('y');
                    var pointLocation1 = chartObj.series[0].points[1].symbolLocations[0].y;
                    expect(svg1 > pointLocation1 + height).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Bottom';
                chartObj.refresh();
            });
            it('Checking data label for low > high for negative points', function (done) {
                loaded = function (args) {
                    var label = document.getElementById('container_Series_0_Point_0_Text_0');
                    expect(label.textContent).toEqual('-5K');
                    label = document.getElementById('container_Series_0_Point_0_Text_1');
                    expect(label.textContent).toEqual('-19K');
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Outer';
                chartObj.series[0].dataSource[0].high = -19;
                chartObj.series[0].dataSource[0].low = -5;
                chartObj.refresh();
            });
            it('checking elements counts without using template', function (done) {
                chartObj.loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_4_Text_0');
                    expect(element != null).toBe(true);
                    element = document.getElementById('container_Secondary_Element');
                    expect(element.childElementCount).toBe(0);
                    done();
                };
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
                    expect(element.childElementCount).toBe(16);
                    element = document.getElementById('container_Series_0_DataLabel_5');
                    expect(element.children[0].innerHTML).toBe('-22');
                    done();
                };
                chartObj.series[0].marker.dataLabel.template = '<div>${point.low}</div>';
                chartObj.refresh();
            });
            it('checking template as point x value and cheecking style', function (done) {
                chartObj.loaded = function (args) {
                    var element = document.getElementById('container_Series_0_DataLabel_5');
                    expect(element.children[0].innerHTML).toBe('34 : -22');
                    expect(element.style.backgroundColor).toBe('transparent');
                    expect(element.style.color).toBe('black');
                    done();
                };
                chartObj.series[0].marker.dataLabel.template = '<div>${point.high} : ${point.low}</div>';
                chartObj.refresh();
            });
            it('checking template using script element', function (done) {
                chartObj.loaded = function (args) {
                    var element = document.getElementById('container_Series_0_DataLabel_5');
                    expect(element.children[0].innerHTML).toBe('80');
                    expect(element.style.backgroundColor).toBe('transparent');
                    expect(element.style.color).toBe('black');
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
                    expect(element.childElementCount).toBe(16);
                    element = document.getElementById('container_Series_0_DataLabel_6');
                    expect(element.children[0].innerHTML).toBe('23:-12');
                    done();
                };
                chartObj.series[0].marker.dataLabel.template = '#template1';
                chartObj.refresh();
            });
            it('Checking with column series', function (done) {
                loaded = function (args) {
                    var series0 = chartObj.series[0];
                    var series1 = chartObj.series[1];
                    expect(Math.round(series1.points[2].regions[0].x) ==
                        Math.round(series0.points[2].regions[0].width + series0.points[2].regions[0].x)).toBe(true);
                    done();
                };
                chartObj.series = [
                    {
                        dataSource: exports.doubleData, xName: 'x', high: 'high', low: 'low', name: 'series1',
                        type: 'RangeColumn', animation: { enable: false }
                    },
                    { dataSource: exports.doubleData, xName: 'x', yName: 'high', name: 'series2', type: 'Column', animation: { enable: false } }
                ];
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Changing the visibility of tooltip with axis label format', function (done) {
                var target;
                var tooltip;
                chartObj.tooltip.enable = true;
                chartObj.tooltip.shared = false;
                chartObj.tooltip.fill = 'pink';
                chartObj.tooltip.textStyle.color = 'red';
                chartObj.tooltip.format = null;
                chartObj.primaryYAxis.labelFormat = '{value}C';
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.primaryXAxis.labelFormat = '#{value}';
                chartObj.loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_1');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = series.points[1].regions[0].y + parseFloat(chartArea.getAttribute('y')) + element.offsetTop;
                    var x = series.points[1].regions[0].x + parseFloat(chartArea.getAttribute('x')) + element.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    var group = tooltip.childNodes[0].childNodes[0];
                    var path = group.childNodes[0];
                    var text1 = group.childNodes[1];
                    expect(path.getAttribute('fill') == 'pink').toBe(true);
                    expect(text1.childNodes[0].getAttribute('fill') == 'red').toBe(true);
                    expect(text1.textContent.replace(/\u200E/g, '') == 'series1#2High : 10CLow : 12C').toBe(true);
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y + 50));
                    done();
                };
                chartObj.refresh();
            });
            it('Changing the trackball', function (done) {
                var tooltip;
                chartObj.tooltip.enable = true;
                chartObj.tooltip.shared = true;
                chartObj.primaryYAxis.labelFormat = '{value}C';
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.primaryXAxis.labelFormat = '#{value}';
                chartObj.loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_1');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = series.points[1].regions[0].y + parseFloat(chartArea.getAttribute('y')) + element.offsetTop;
                    var x = series.points[1].regions[0].x + parseFloat(chartArea.getAttribute('x')) + element.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    var group = tooltip.childNodes[0].childNodes[0];
                    var path = group.childNodes[0];
                    var text1 = group.childNodes[1];
                    var text2 = group.childNodes[2];
                    expect(path.getAttribute('fill') == 'pink').toBe(true);
                    expect(text1.childNodes[0].getAttribute('fill') == 'red').toBe(true);
                    expect(text1.textContent.replace(/\u200E/g, '') == '#2series1High : 10CLow : 12Cseries2 : 10C').toBe(true);
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y + 50));
                    done();
                };
                chartObj.refresh();
            });
            it('Checking with template', function (done) {
                var tooltip;
                ej2_base_1.remove(document.getElementById('container_tooltip'));
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_1');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = series.points[1].regions[0].y + parseFloat(chartArea.getAttribute('y')) + element.offsetTop;
                    var x = series.points[1].regions[0].x + parseFloat(chartArea.getAttribute('x')) + element.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    tooltip = document.getElementById('container_tooltip');
                    expect(tooltip.childNodes[0].childNodes[0].textContent).toEqual('#2');
                    expect(tooltip.childNodes[0].childNodes[1].textContent).toEqual('10C');
                    expect(tooltip.childNodes[0].childNodes[2].textContent).toEqual('12C');
                    expect(tooltip != null).toBe(true);
                    y = parseFloat(chartArea.getAttribute('height')) + parseFloat(chartArea.getAttribute('y')) + 200 + element.offsetTop;
                    x = parseFloat(chartArea.getAttribute('width')) + parseFloat(chartArea.getAttribute('x')) + element.offsetLeft;
                    trigger.mouseleavetEvent(element, Math.ceil(x), Math.ceil(y));
                    done();
                };
                chartObj.tooltip.template = '<div>${x}</div><div>${high}</div><div>${low}</div>';
                chartObj.tooltip.shared = false;
                chartObj.title = 'Template';
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
        });
        describe('checking for multiple axes', function () {
            var chartObj;
            var elem = ej2_base_1.createElement('div', { id: 'container' });
            var targetElement;
            var loaded;
            var marker0;
            var dataLabel0;
            var trigger = new events_spec_1.MouseEvents();
            beforeAll(function () {
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    axes: [
                        { name: 'yAxis1', title: 'YAxis1', crosshairTooltip: { enable: true } },
                        { name: 'yAxis2', title: 'YAxis2', crosshairTooltip: { enable: true } },
                        { rowIndex: 1, name: 'yAxis3', title: 'YAxis3' },
                        { rowIndex: 1, name: 'yAxis4', title: 'YAxis4' },
                        { columnIndex: 1, name: 'yAxis6', title: 'YAxis6', opposedPosition: true },
                        { columnIndex: 1, name: 'yAxis5', title: 'YAxis5', opposedPosition: true },
                        { rowIndex: 1, columnIndex: 1, name: 'yAxis7', title: 'YAxis7', opposedPosition: true },
                        { rowIndex: 1, columnIndex: 1, name: 'yAxis8', title: 'YAxis8', opposedPosition: true },
                        { name: 'xAxis1', title: 'Xaxis1', crosshairTooltip: { enable: true } },
                        { name: 'xAxis2', title: 'Xaxis2', crosshairTooltip: { enable: true } },
                        { columnIndex: 1, name: 'xAxis3', title: 'Xaxis3' },
                        { columnIndex: 1, name: 'xAxis4', title: 'Xaxis4' },
                        { rowIndex: 1, name: 'xAxis5', title: 'Xaxis5', opposedPosition: true },
                        { rowIndex: 1, name: 'xAxis6', title: 'Xaxis6', opposedPosition: true },
                        { columnIndex: 1, rowIndex: 1, name: 'xAxis7', title: 'Xaxis7', opposedPosition: true },
                        { columnIndex: 1, rowIndex: 1, name: 'xAxis8', title: 'Xaxis8', opposedPosition: true, },
                    ],
                    series: [{
                            dataSource: exports.doubleData, xName: 'x', low: 'low', high: 'high', animation: { enable: false }, type: 'RangeColumn',
                            name: 'ChartSeriesNameGold', fill: 'green',
                            xAxisName: 'xAxis1', yAxisName: 'yAxis1'
                        },
                        {
                            dataSource: exports.doubleData, xName: 'x', yName: 'low', animation: { enable: false }, type: 'Line',
                            name: 'ChartSeriesNameGold', fill: 'red',
                            xAxisName: 'xAxis1', yAxisName: 'yAxis1'
                        },
                        {
                            dataSource: exports.doubleData, xName: 'x', low: 'low', high: 'high', animation: { enable: false }, type: 'RangeColumn',
                            name: 'ChartSeriesNameGold1', fill: 'black',
                            xAxisName: 'xAxis1', yAxisName: 'yAxis1'
                        },
                        {
                            dataSource: exports.doubleData, xName: 'x', low: 'low', high: 'high', animation: { enable: false }, type: 'RangeColumn',
                            name: 'ChartSeriesNameDiamond', fill: 'blue',
                            xAxisName: 'xAxis2', yAxisName: 'yAxis2'
                        },
                        {
                            dataSource: exports.doubleData, xName: 'x', low: 'low', high: 'high', animation: { enable: false }, type: 'RangeColumn',
                            name: 'ChartSeriesNameSilver', fill: 'green',
                            xAxisName: 'xAxis5', yAxisName: 'yAxis3',
                        },
                        {
                            dataSource: exports.doubleData, xName: 'x', low: 'low', high: 'high', animation: { enable: false },
                            type: 'RangeColumn',
                            name: 'ChartSeriesNameRuby', fill: 'red',
                            xAxisName: 'xAxis6', yAxisName: 'yAxis4',
                        },
                        {
                            dataSource: exports.doubleData, xName: 'x', low: 'low', high: 'high', animation: { enable: false }, type: 'RangeColumn',
                            name: 'ChartSeriesNamePlatinum', fill: 'rgba(135,000,235,1)',
                            xAxisName: 'xAxis3', yAxisName: 'yAxis5',
                        },
                        {
                            dataSource: exports.doubleData, xName: 'x', low: 'low', high: 'high', animation: { enable: false }, type: 'RangeColumn',
                            name: 'ChartSeriesNameEmerald', fill: 'purple',
                            xAxisName: 'xAxis4', yAxisName: 'yAxis6',
                        },
                        {
                            dataSource: exports.doubleData, xName: 'x', low: 'low', high: 'high', animation: { enable: false }, type: 'RangeColumn',
                            name: 'ChartSeriesNamePearl', fill: 'violet',
                            xAxisName: 'xAxis7', yAxisName: 'yAxis7'
                        },
                        {
                            dataSource: exports.doubleData, xName: 'x', low: 'low', high: 'high', animation: { enable: false },
                            type: 'RangeColumn',
                            name: 'ChartSeriesNameCoral', fill: 'yellow',
                            xAxisName: 'xAxis8', yAxisName: 'yAxis8',
                        }
                    ],
                    rows: [
                        { height: '400', border: { width: 2, color: 'red' } },
                        { height: '400', border: { width: 2, color: 'red' } },
                    ],
                    columns: [
                        { width: '400', border: { width: 2, color: 'black' } },
                        { width: '400', border: { width: 2, color: 'black' } },
                    ], legendSettings: { visible: false },
                    title: 'Chart TS Title', height: '1000', width: '1000',
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                elem.remove();
            });
            it('Checking with axes', function (done) {
                loaded = function (args) {
                    var axis1 = document.getElementById('containerAxisLine_2');
                    var axisCollection = document.getElementById('containerAxisInsideCollection');
                    expect(+axisCollection.childElementCount).toEqual(17);
                    var seriesCollection = document.getElementById('containerSeriesCollection');
                    expect(+seriesCollection.childElementCount).toEqual(11);
                    var series0 = chartObj.series[0];
                    var series1 = chartObj.series[5];
                    var clipRect0 = series0.clipRect.y;
                    var clipRect1 = series1.clipRect.y;
                    expect(+clipRect0 > +clipRect1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('checking with cross hair', function (done) {
                loaded = function (args) {
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var series = chartObj.series[0];
                    var y = series.points[2].regions[0].y + series.clipRect.y / 2 +
                        parseFloat(chartArea.getAttribute('y')) + element.offsetTop;
                    var x = series.points[2].regions[0].x + series.points[2].regions[0].width / 2 +
                        parseFloat(chartArea.getAttribute('x')) + element.offsetLeft;
                    trigger.mousemovetEvent(chartArea, Math.ceil(x), Math.ceil(y));
                    var crosshair = document.getElementById('container_UserInteraction');
                    var crossHairAxis = crosshair.childNodes[2];
                    expect(crossHairAxis.childElementCount).toEqual(8);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.crosshair.enable = true;
                chartObj.series[0].animation.enable = false;
                chartObj.refresh();
            });
        });
        describe('Range column Series with Inversed axis', function () {
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
                            name: 'ChartSeriesNameGold', dataSource: exports.doubleData, xName: 'x', low: 'low', high: 'high',
                            type: 'RangeColumn', fill: 'rgba(135,206,235,1)',
                            marker: { visible: false, dataLabel: { visible: true, fill: 'violet' } }
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
                    var svg = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('y');
                    var label = document.getElementById('container_Series_0_Point_1_Text_0');
                    var point0Location = chart.series[0].points[1].symbolLocations[0].y;
                    var height = chart.series[0].points[1].regions[0].height / 2;
                    expect(svg > (point0Location + height)).toBe(true);
                    var svg2 = +document.getElementById('container_Series_0_Point_1_TextShape_1').getAttribute('y');
                    var label2 = document.getElementById('container_Series_0_Point_1_Text_1');
                    expect(svg2 < point0Location).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].marker.dataLabel.position = 'Auto';
                chart.refresh();
            });
            it('With Label position Outer', function (done) {
                loaded = function (args) {
                    var svg = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('y');
                    var label = document.getElementById('container_Series_0_Point_1_Text_0');
                    var point0Location = chart.series[0].points[1].symbolLocations[0].y;
                    var height = chart.series[0].points[1].regions[0].height / 2;
                    expect(svg > (point0Location + height)).toBe(true);
                    var svg2 = +document.getElementById('container_Series_0_Point_1_TextShape_1').getAttribute('y');
                    var label2 = document.getElementById('container_Series_0_Point_1_Text_1');
                    expect(svg2 < point0Location).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].marker.dataLabel.position = 'Outer';
                chart.refresh();
            });
            it('With Label position Top', function (done) {
                loaded = function (args) {
                    var svg = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('y');
                    var label = document.getElementById('container_Series_0_Point_1_Text_0');
                    var point0Location = chart.series[0].points[1].symbolLocations[0].y;
                    var height = chart.series[0].points[1].regions[0].height / 2;
                    expect(svg < (point0Location + height)).toBe(true);
                    var svg2 = +document.getElementById('container_Series_0_Point_1_TextShape_1').getAttribute('y');
                    var label2 = document.getElementById('container_Series_0_Point_1_Text_1');
                    expect(svg2 > point0Location).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].marker.dataLabel.position = 'Top';
                chart.refresh();
            });
        });
        describe('checking rotated range column chart', function () {
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
                    primaryXAxis: { title: 'primaryXAxis' },
                    primaryYAxis: { title: 'PrimaryYAxis' },
                    series: [
                        { type: 'RangeColumn', name: 'columnSeries1', dataSource: data_spec_1.doubleRangeColumnData,
                            xName: 'x', low: 'low', high: 'high', animation: { enable: false } },
                        { type: 'RangeColumn', name: 'columnSeries2', dataSource: data_spec_1.doubleRangeColumnData,
                            xName: 'x', low: 'low', high: 'high', animation: { enable: false } }
                    ],
                    title: 'rotated Bar Chart'
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
                    expect(+(dataLabel.getAttribute('x')) > point.symbolLocations[0].x).toBe(true);
                    dataLabel = document.getElementById('container_Series_0_Point_1_Text_0');
                    point = chart.series[0].points[1];
                    expect(+(dataLabel.getAttribute('x')) > point.symbolLocations[0].x).toBe(true);
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
                    expect(+(dataLabel.getAttribute('x')) > point.symbolLocations[0].x).toBe(true);
                    dataLabel = document.getElementById('container_Series_0_Point_1_Text_0');
                    point = chart.series[0].points[1];
                    expect(+(dataLabel.getAttribute('x')) > point.symbolLocations[0].x).toBe(true);
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
                    expect(+(dataLabel.getAttribute('x')) < point.symbolLocations[0].x).toBe(true);
                    dataLabel = document.getElementById('container_Series_0_Point_1_Text_0');
                    point = chart.series[0].points[1];
                    expect(+(dataLabel.getAttribute('x')) < point.symbolLocations[0].x).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].marker.dataLabel.position = 'Top';
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
                    expect(parseFloat(tooltip.style.left) > series.points[2].regions[0].x + parseFloat(chartArea.getAttribute('x')));
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
        describe('Range Column Series - Marker', function () {
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
                        { type: 'RangeColumn', name: 'column series', dataSource: exports.dateTimeData, xName: 'x', yName: 'y', low: 'low', high: 'high',
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
                    var marker = document.getElementById('container_Series_0_Point_1_Symbol');
                    expect(marker !== null).toBe(true);
                    marker = document.getElementById('container_Series_0_Point_1_Symbol1');
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
                    series1 = document.getElementById('container_Series_0_Point_3_Symbol1');
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
                    var series2 = document.getElementById('container_Series_0_Point_3_Symbol1');
                    expect(series2.getAttribute('fill') == 'violet').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.fill = 'violet';
                chartObj.refresh();
            });
            it('with image', function (done) {
                loaded = function (args) {
                    var series1 = document.getElementById('container_Series_0_Point_1_Symbol');
                    expect(series1.getAttribute('href') == 'base/spec/img/img1.jpg').toBe(true);
                    var series2 = document.getElementById('container_Series_0_Point_1_Symbol1');
                    expect(series2.getAttribute('href') == 'base/spec/img/img1.jpg').toBe(true);
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
                    var series2 = document.getElementById('container_Series_0_Point_2_Symbol1');
                    expect(series2.getAttribute('fill') == 'green').toBe(true);
                    expect(series2.getAttribute('opacity') == '0.1').toBe(true);
                    expect(series2.getAttribute('stroke') == 'red').toBe(true);
                    expect(series2.getAttribute('stroke-width') == '4').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Circle';
                chartObj.series[0].marker.fill = 'green';
                chartObj.series[0].marker.opacity = 0.1;
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
                    expect(+(datalabel.getAttribute('y')) < +(series1.getAttribute('cy'))).toBe(true);
                    var series2 = document.getElementById('container_Series_0_Point_1_Symbol1');
                    var datalabel2 = document.getElementById('container_Series_0_Point_1_Text_1');
                    expect(+(datalabel2.getAttribute('y')) > +(series2.getAttribute('cy'))).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.visible = true;
                chartObj.series[0].marker.dataLabel.position = 'Outer';
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
