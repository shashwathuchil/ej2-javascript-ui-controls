define(["require", "exports", "@syncfusion/ej2-base", "../../../src/chart/chart", "../../../src/chart/legend/legend", "../../../src/chart/series/line-series", "../../../src/chart/series/data-label", "../../../src/chart/axis/category-axis", "../../../src/chart/axis/date-time-axis", "../../../src/chart/axis/logarithmic-axis", "../../../src/chart/series/column-series", "../../../src/chart/series/range-column-series", "../../../src/chart/series/hilo-series", "../base/events.spec", "../../../src/chart/user-interaction/tooltip", "../../../src/chart/user-interaction/crosshair", "../../../src/chart/user-interaction/selection", "../../common.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, chart_1, legend_1, line_series_1, data_label_1, category_axis_1, date_time_axis_1, logarithmic_axis_1, column_series_1, range_column_series_1, hilo_series_1, events_spec_1, tooltip_1, crosshair_1, selection_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(line_series_1.LineSeries, column_series_1.ColumnSeries, data_label_1.DataLabel, category_axis_1.Category, date_time_axis_1.DateTime, range_column_series_1.RangeColumnSeries, legend_1.Legend, tooltip_1.Tooltip, crosshair_1.Crosshair, logarithmic_axis_1.Logarithmic, selection_1.Selection, hilo_series_1.HiloSeries);
    var prevent = function () {
    };
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
        { x: 7, low: 12, high: 23 }, { x: 8, low: 12, high: 40 }
    ];
    exports.doubleData2 = [
        { x: 1, low: 16, high: 30 }, { x: 2, low: 2, high: 10 },
        { x: 3, low: 3, high: 20 }, { x: 4, low: 20, high: 53 },
        { x: 5, low: 5, high: 15 }, { x: 6, low: 22, high: 44 },
        { x: 7, low: 2, high: 13 }, { x: 8, low: 20, high: 30 }
    ];
    exports.doubleData1 = [
        { x: 1, low: 20, high: 40 }, { x: 2, low: 8, high: 20 },
        { x: 3, low: 15, high: 30 }, { x: 4, low: 20, high: 43 },
        { x: 5, low: 10, high: 25 }, { x: 6, low: 15, high: 34 },
        { x: 7, low: 2, high: 13 }, { x: 8, low: 2, high: 15 }
    ];
    exports.dateTimeData = [
        { x: new Date(1, 0, 2000), low: -12, high: 0 }, { x: new Date(1, 0, 2001), low: 12, high: 10 },
        { x: new Date(1, 0, 2002), low: 23, high: 10 }, { x: new Date(1, 0, 2003), low: 202, high: 43 },
        { x: new Date(1, 0, 2004), low: 0, high: 10 }, { x: new Date(1, 0, 2005), low: -22, high: 34 },
        { x: new Date(1, 0, 2006), low: -12, high: 23 }, { x: new Date(1, 0, 2007), low: 12, high: 40 }
    ];
    exports.doubleRangeColumnData = [
        { x: 1, low: -12, high: 0 }, { x: 2, low: 12, high: 10 },
        { x: 3, low: 23, high: 10 }, { x: 4, low: 202, high: 43 },
        { x: 5, low: 0, high: 10 }, { x: 6, low: -22, high: 34 },
        { x: 7, low: -12, high: 23 }, { x: 8, low: 12, high: 40 }
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
        describe('HiloSeries', function () {
            var chartObj;
            var loaded;
            var animationComplete;
            var trigger = new events_spec_1.MouseEvents();
            element = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(element);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal' },
                    series: [{
                            animation: { enable: false }, name: 'ChartSeriesNameGold',
                            type: 'Hilo', fill: 'rgba(135,206,235,1)',
                        }],
                    width: '800',
                    title: 'Chart TS Title', loaded: loaded, legendSettings: { visible: false }
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                document.getElementById('container').remove();
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
            it('Default Series Type with chart width', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_svg');
                    expect(svg.clientWidth == 800).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.width = '800px';
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
                    expect(stroke == '2' || stroke == '0').toBe(true);
                    var labelElement = document.getElementById('container0_AxisLabel_3');
                    expect(labelElement.textContent == '26 Tue' || labelElement.textContent == '26').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'DateTime';
                chartObj.series = [{
                        dataSource: exports.dateTimeData, xName: 'x', low: 'low', high: 'high',
                        animation: { enable: false }, type: 'Hilo',
                        name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
                    }];
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
            it('Checking animationEvent', function (done) {
                animationComplete = function (args) {
                    var point = document.getElementById('container_Series_' + args.series.index + '_Point_0');
                    expect(point.getAttribute('transform') === 'translate(0,0)').toBe(true);
                    done();
                };
                chartObj.animationComplete = animationComplete;
                chartObj.series[0].animation.enable = true;
                chartObj.refresh();
            });
            it('Checking animation with duration', function (done) {
                animationComplete = function (args) {
                    var point = document.getElementById('container_Series_' + args.series.index + '_Point_0');
                    expect(point.getAttribute('transform') === 'translate(0,0)').toBe(true);
                    done();
                };
                chartObj.animationComplete = animationComplete;
                chartObj.series[0].animation.enable = true;
                chartObj.series[0].animation.duration = 2000;
                chartObj.refresh();
            });
            it('Checking animation with delay', function (done) {
                animationComplete = function (args) {
                    var point = document.getElementById('container_Series_' + args.series.index + '_Point_0');
                    expect(point.getAttribute('transform') === 'translate(0,0)').toBe(true);
                    done();
                };
                chartObj.animationComplete = animationComplete;
                chartObj.series[0].animation.enable = true;
                chartObj.series[0].animation.delay = 200;
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
                chartObj.series[0].type = 'Hilo';
                chartObj.legendSettings = { visible: true };
                chartObj.refresh();
            });
            it('Legend With Position', function (done) {
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
                chartObj.series[0].type = 'Hilo';
                chartObj.legendSettings = { visible: true, position: 'Top' };
                chartObj.refresh();
            });
            it('Legend With Alignment', function (done) {
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
                chartObj.series[0].type = 'Hilo';
                chartObj.legendSettings = { visible: true, alignment: 'Near' };
                chartObj.refresh();
            });
            it('Legend Interaction with selection and non selection', function (done) {
                loaded = function (args) {
                    args.chart.loaded = null;
                    var element = document.getElementById('container_chart_legend_text_0');
                    trigger.clickEvent(element);
                    var element1 = document.getElementById('containerSeriesCollection').children.length;
                    expect(element1 == 1 || element1 == 2).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('checking with multiple series', function (done) {
                loaded = function (args) {
                    var series0 = chartObj.series[0];
                    var series1 = chartObj.series[1];
                    expect((series1.points[2].regions[0].x) >= series0.points[2].regions[0].width + series0.points[2].regions[0].x).toBe(true);
                    done();
                };
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.primaryYAxis.valueType = 'Double';
                chartObj.series = [
                    {
                        dataSource: exports.doubleData, xName: 'x', high: 'high', low: 'low',
                        name: 'series1', type: 'Hilo', animation: { enable: false }
                    },
                    {
                        dataSource: exports.doubleData, xName: 'x', high: 'high',
                        low: 'low', name: 'series2', type: 'Hilo', animation: { enable: false }
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
            it('checking with tooltip without Format', function (done) {
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
                    expect(Math.round(+element1.textContent) == 22 || Math.round(+element1.textContent) == 23).toBe(true);
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
                        type: 'Hilo', name: 'Series1', xName: 'x', low: 'low', high: 'high',
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
                        type: 'Hilo', name: 'Series1', xName: 'x', low: 'low', high: 'high',
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
            it('Checking with column series', function (done) {
                loaded = function (args) {
                    var series0 = chartObj.series[0];
                    var series1 = chartObj.series[1];
                    expect(Math.round(series1.points[2].regions[0].x) >=
                        Math.round(series0.points[2].regions[0].width + series0.points[2].regions[0].x)).toBe(true);
                    done();
                };
                chartObj.series = [
                    {
                        dataSource: exports.doubleData, xName: 'x', high: 'high', low: 'low', name: 'series1',
                        type: 'Hilo', animation: { enable: false }
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
                            dataSource: exports.doubleData, xName: 'x', low: 'low', high: 'high', animation: { enable: false }, type: 'Hilo',
                            name: 'ChartSeriesNameGold', fill: 'green',
                            xAxisName: 'xAxis1', yAxisName: 'yAxis1'
                        },
                        {
                            dataSource: exports.doubleData, xName: 'x', yName: 'low', animation: { enable: false }, type: 'Line',
                            name: 'ChartSeriesNameGold', fill: 'red',
                            xAxisName: 'xAxis1', yAxisName: 'yAxis1'
                        },
                        {
                            dataSource: exports.doubleData, xName: 'x', low: 'low', high: 'high', animation: { enable: false }, type: 'Hilo',
                            name: 'ChartSeriesNameGold1', fill: 'black',
                            xAxisName: 'xAxis1', yAxisName: 'yAxis1'
                        },
                        {
                            dataSource: exports.doubleData, xName: 'x', low: 'low', high: 'high', animation: { enable: false }, type: 'Hilo',
                            name: 'ChartSeriesNameDiamond', fill: 'blue',
                            xAxisName: 'xAxis2', yAxisName: 'yAxis2'
                        },
                        {
                            dataSource: exports.doubleData, xName: 'x', low: 'low', high: 'high', animation: { enable: false }, type: 'Hilo',
                            name: 'ChartSeriesNameSilver', fill: 'green',
                            xAxisName: 'xAxis5', yAxisName: 'yAxis3',
                        },
                        {
                            dataSource: exports.doubleData, xName: 'x', low: 'low', high: 'high', animation: { enable: false },
                            type: 'Hilo',
                            name: 'ChartSeriesNameRuby', fill: 'red',
                            xAxisName: 'xAxis6', yAxisName: 'yAxis4',
                        },
                        {
                            dataSource: exports.doubleData, xName: 'x', low: 'low', high: 'high', animation: { enable: false }, type: 'Hilo',
                            name: 'ChartSeriesNamePlatinum', fill: 'rgba(135,000,235,1)',
                            xAxisName: 'xAxis3', yAxisName: 'yAxis5',
                        },
                        {
                            dataSource: exports.doubleData, xName: 'x', low: 'low', high: 'high', animation: { enable: false }, type: 'Hilo',
                            name: 'ChartSeriesNameEmerald', fill: 'purple',
                            xAxisName: 'xAxis4', yAxisName: 'yAxis6',
                        },
                        {
                            dataSource: exports.doubleData, xName: 'x', low: 'low', high: 'high', animation: { enable: false }, type: 'Hilo',
                            name: 'ChartSeriesNamePearl', fill: 'violet',
                            xAxisName: 'xAxis7', yAxisName: 'yAxis7'
                        },
                        {
                            dataSource: exports.doubleData, xName: 'x', low: 'low', high: 'high', animation: { enable: false },
                            type: 'Hilo',
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
            it('checking with Plot Offset', function (done) {
                loaded = function (args) {
                    var point = document.getElementById('containerSeriesGroup1');
                    expect(point != null).toBe(true);
                    expect(point.getAttribute('transform') == 'translate(160.5,462.5)' ||
                        point.getAttribute('transform') == 'translate(151.5,471.5)').toBe(true);
                    done();
                    done();
                };
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.primaryYAxis.valueType = 'Double';
                chartObj.primaryYAxis.plotOffset = 20;
                chartObj.series = [
                    {
                        dataSource: exports.doubleData, xName: 'x', high: 'high', low: 'low',
                        name: 'series1', type: 'Hilo', animation: { enable: false }
                    },
                    {
                        dataSource: exports.doubleData, xName: 'x', high: 'high',
                        low: 'low', name: 'series2', type: 'Hilo', animation: { enable: false }
                    }
                ];
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('checking with opposedPosition', function (done) {
                loaded = function (args) {
                    var series0 = chartObj.series[0];
                    var series1 = chartObj.series[1];
                    expect((series1.points[2].regions[0].x) >= series0.points[2].regions[0].width + series0.points[2].regions[0].x).toBe(true);
                    done();
                };
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.primaryYAxis.valueType = 'Double';
                chartObj.primaryYAxis.opposedPosition = true;
                chartObj.series = [
                    {
                        dataSource: exports.doubleData, xName: 'x', high: 'high', low: 'low',
                        name: 'series1', type: 'Hilo', animation: { enable: false }
                    },
                    {
                        dataSource: exports.doubleData, xName: 'x', high: 'high',
                        low: 'low', name: 'series2', type: 'Hilo', animation: { enable: false }
                    }
                ];
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking with category axis with multiple panes- column', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('containerAxisLine_0');
                    expect(svg.getAttribute('d').split(' ')[1] == '101' || svg.getAttribute('d').split(' ')[1] == '95').toBe(true);
                    var svg1 = document.getElementById('container_AxisBottom_Column0');
                    expect(svg1.getAttribute('stroke') == 'red').toBe(true);
                    svg = document.getElementById('containerAxisLine_1');
                    expect(svg.getAttribute('d').split(' ')[1] == '845.5' || svg.getAttribute('d').split(' ')[1] == '854.5').toBe(true);
                    svg1 = document.getElementById('container_AxisBottom_Column1');
                    expect(svg1.getAttribute('stroke') == 'blue').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.columns = [
                    {
                        width: '400', border: { width: 4, color: 'red' }
                    },
                    {
                        width: '400', border: { width: 4, color: 'blue' }
                    }
                ];
                chartObj.series = [
                    {
                        dataSource: exports.doubleData1, xName: 'x', high: 'high', low: 'low',
                        name: 'series1', type: 'Hilo', animation: { enable: false }
                    },
                    {
                        dataSource: exports.doubleData2, xName: 'x', high: 'high', low: 'low',
                        name: 'series2', type: 'Hilo', animation: { enable: false }, xAxisName: 'yAxis1',
                    }
                ];
                chartObj.axes[0].columnIndex = 1;
                chartObj.axes[0].name = 'yAxis1';
                chartObj.axes[0].title = 'Axis2';
                chartObj.primaryYAxis.minimum = 0;
                chartObj.primaryYAxis.maximum = 50;
                chartObj.refresh();
            });
            it('Checking with category axis with multiple panes- rows', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('containerAxisLine_0');
                    expect(svg.getAttribute('d').split(' ')[2] == '851.5' || svg.getAttribute('d').split(' ')[2] == '842.5').toBe(true);
                    svg = document.getElementById('containerAxisLine_1');
                    expect(svg.getAttribute('d').split(' ')[2] == '498.375' || svg.getAttribute('d').split(' ')[2] == '499.375').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.rows = [{
                        height: '50%'
                    }, {
                        height: '50%'
                    }];
                chartObj.series = [
                    {
                        dataSource: exports.doubleData1, xName: 'x', high: 'high', low: 'low',
                        name: 'series1', type: 'Hilo', animation: { enable: false }
                    },
                    {
                        dataSource: exports.doubleData2, xName: 'x', high: 'high', low: 'low',
                        name: 'series2', type: 'Hilo', animation: { enable: false }, yAxisName: 'yAxis1',
                    }
                ];
                chartObj.axes[0].rowIndex = 1;
                chartObj.axes[0].opposedPosition = true;
                chartObj.axes[0].name = 'yAxis1';
                chartObj.axes[0].minimum = 50;
                chartObj.axes[0].maximum = 130;
                chartObj.axes[0].interval = 10;
                chartObj.axes[0].title = 'Axis2';
                chartObj.primaryYAxis.minimum = 0;
                chartObj.primaryYAxis.maximum = 50;
                chartObj.refresh();
            });
            it('checking with Multiple Series', function (done) {
                loaded = function (args) {
                    var series0 = chartObj.series[0];
                    var series1 = chartObj.series[1];
                    expect((series1.points[2].regions[0].x) >= series0.points[2].regions[0].width + series0.points[2].regions[0].x).toBe(true);
                    done();
                };
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.primaryYAxis.valueType = 'Double';
                chartObj.series = [
                    {
                        dataSource: exports.doubleData, xName: 'x', high: 'high', low: 'low',
                        name: 'series1', type: 'Hilo', animation: { enable: false }
                    },
                    {
                        dataSource: exports.doubleData, xName: 'x', high: 'high',
                        low: 'low', name: 'series2', type: 'RangeColumn', animation: { enable: false }
                    }
                ];
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Point Rendering Event', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('container_Series_1_Point_0');
                    expect(element.getAttribute('fill')).toBe('pink');
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.pointRender = function (args) {
                    if (args.point.index === 0) {
                        args.fill = 'pink';
                    }
                };
                chartObj.legendSettings.alignment = 'Near';
                chartObj.refresh();
            });
            it('Legend Rendering Event', function (done) {
                loaded = function (args) {
                    var legendElement = document.getElementById('container_chart_legend_element');
                    expect(legendElement.tagName).toEqual('rect');
                    expect(legendElement.getAttribute('d')).not.toEqual(null);
                    var legendShape = document.getElementById('container_chart_legend_shape_0');
                    expect(legendShape.getAttribute('fill')).toEqual('blue');
                    expect(legendShape.getAttribute('d') != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.legendRender = function (args) {
                    args.fill = 'blue';
                };
                chartObj.series[0].name = 'series1';
                chartObj.legendSettings = { visible: true, position: 'Top', alignment: 'Near' };
                chartObj.refresh();
            });
            it('checking mouse wheel zooming', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    var wheelArgs = {
                        preventDefault: prevent,
                        wheelDelta: 120,
                        detail: 3,
                        clientX: 210,
                        clientY: 300
                    };
                    chartObj.zoomModule.chartMouseWheel(wheelArgs);
                    expect(chartObj.primaryXAxis.zoomFactor.toFixed(2) == '0.72').toBe(true);
                    expect(chartObj.primaryYAxis.zoomFactor.toFixed(2) == '0.72').toBe(true);
                    expect(chartObj.primaryXAxis.zoomPosition.toFixed(2) == '0.14').toBe(true);
                    expect(chartObj.primaryYAxis.zoomPosition.toFixed(2) == '0.00' ||
                        chartObj.primaryYAxis.zoomPosition.toFixed(2) == '0.01').toBe(true);
                    done();
                };
                chartObj.zoomSettings.enableMouseWheelZooming = true;
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('checking  zooming with touch', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    var touchStartArgs;
                    var areaElement = document.getElementById('container_svg');
                    chartObj.chartOnMouseDown(trigger.onTouchStart(areaElement, 608, 189, 504, 289, 504, 289));
                    chartObj.mouseMove(trigger.onTouchMove(areaElement, 728, 389, 404, 289, 404, 189));
                    chartObj.mouseMove(trigger.onTouchMove(areaElement, 748, 129, 304, 289, 304, 289));
                    var content = chartObj.primaryXAxis.zoomFactor.toFixed(2);
                    expect(content == '0.29' || content == '0.30').toBe(true);
                    content = chartObj.primaryYAxis.zoomFactor.toFixed(2);
                    expect(content == '1.00').toBe(true);
                    content = chartObj.primaryXAxis.zoomPosition.toFixed(2);
                    expect(content == '0.74' || content == '0.75').toBe(true);
                    chartObj.mouseLeave(trigger.onTouchLeave(areaElement, 748, 129, 304, 289, 304, 289));
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.zoomSettings.enablePinchZooming = true;
                chartObj.dataBind();
            });
            it('Checking with Months and its Round rangePadding', function (done) {
                loaded = function (args) {
                    expect(document.getElementById('containerAxisLabels0').childNodes[0].textContent == '6').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.rangePadding = 'Round';
                chartObj.refresh();
            });
        });
        describe('Hilo Series with Inversed axis', function () {
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
        describe('checking rotated Hilo chart', function () {
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
                        {
                            type: 'Hilo', name: 'columnSeries1', dataSource: exports.doubleRangeColumnData,
                            xName: 'x', low: 'low', high: 'high', animation: { enable: false }
                        },
                        {
                            type: 'Hilo', name: 'columnSeries2', dataSource: exports.doubleRangeColumnData,
                            xName: 'x', low: 'low', high: 'high', animation: { enable: false }
                        }
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
