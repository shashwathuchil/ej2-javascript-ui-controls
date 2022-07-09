define(["require", "exports", "@syncfusion/ej2-base", "../../../src/chart/chart", "../../../src/chart/legend/legend", "../../../src/chart/user-interaction/selection", "../../../src/chart/series/line-series", "../../../src/chart/series/data-label", "../../../src/chart/axis/category-axis", "../../../src/chart/axis/date-time-axis", "../../../src/chart/axis/logarithmic-axis", "../../../src/chart/series/waterfall-series", "../../../src/chart/series/column-series", "../../../src/chart/user-interaction/tooltip", "../../../src/chart/user-interaction/crosshair", "../base/events.spec", "../../../src/chart/user-interaction/zooming", "../../common.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, chart_1, legend_1, selection_1, line_series_1, data_label_1, category_axis_1, date_time_axis_1, logarithmic_axis_1, waterfall_series_1, column_series_1, tooltip_1, crosshair_1, events_spec_1, zooming_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(line_series_1.LineSeries, column_series_1.ColumnSeries, waterfall_series_1.WaterfallSeries, logarithmic_axis_1.Logarithmic, data_label_1.DataLabel, category_axis_1.Category, date_time_axis_1.DateTime, legend_1.Legend, selection_1.Selection, tooltip_1.Tooltip, crosshair_1.Crosshair, zooming_1.Zoom);
    var prevent = function () {
    };
    var material = ['#00bdae', '#404041', '#357cd2', '#e56590', '#f8b883',
        '#70ad47', '#dd8abd', '#7f84e8', '#7bb4eb', '#ea7a57'];
    var fabric = ['#4472c4', '#ed7d31', '#ffc000', '#70ad47', '#5b9bd5',
        '#c1c1c1', '#6f6fe2', '#e269ae', '#9e480e', '#997300'];
    var paletteColor = ['#005378', '#006691', '#007EB5', '#0D97D4', '#00AEFF',
        '#14B9FF', '#54CCFF', '#87DBFF', '#ADE5FF', '#C5EDFF'];
    describe('Waterfall Series', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        var element;
        describe('Waterfall Series', function () {
            var chartObj;
            var loaded;
            var animationComplete;
            var trigger = new events_spec_1.MouseEvents();
            element = ej2_base_1.createElement('div', { id: 'container' });
            var chartData = [
                { x: 'income', y: 4711 }, { x: 'Marketting and Sales', y: -427 },
                { x: 'Research', y: -588 }, { x: 'Development', y: -688 },
                { x: 'other Revenue', y: 1030 }, { x: 'Administrative', y: -780 },
                { x: 'Other expense', y: -361 }, { x: 'Income tax', y: -695 },
            ];
            var dateTimeData = [
                { x: new Date(1, 0, 2000), y: 4711 }, { x: new Date(1, 0, 2001), y: -427 },
                { x: new Date(1, 0, 2002), y: -588 }, { x: new Date(1, 0, 2003), y: -688 },
                { x: new Date(1, 0, 2004), y: 1030 }, { x: new Date(1, 0, 2005), y: -780 },
                { x: new Date(1, 0, 2006), y: -361 }, { x: new Date(1, 0, 2007), y: -695 }
            ];
            beforeAll(function () {
                document.body.appendChild(element);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal' },
                    axes: [{}],
                    series: [{
                            animation: { enable: false }, name: 'ChartSeriesNameGold', dataSource: [],
                            type: 'Waterfall', fill: '#93C952',
                        }],
                    title: 'Company Revenue and Profit', loaded: loaded, legendSettings: { visible: false }
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
                    expect(svg == 2).toBe(true);
                    var xAxisLabelCollection = document.getElementById('containerAxisLabels0');
                    expect(xAxisLabelCollection.childNodes.length == 11).toBe(true);
                    var yAxisLabelCollection = document.getElementById('containerAxisLabels1');
                    expect(yAxisLabelCollection.childNodes.length == 7).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
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
            it('Added data Source', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0_Point_0');
                    expect(svg.getAttribute('d') != '').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = [{
                        x: 'Income',
                        y: 4711
                    }];
                chartObj.series[0].border = { color: '#5D843A' };
                chartObj.series[0].xName = 'x';
                chartObj.series[0].yName = 'y';
                chartObj.primaryYAxis.labelFormat = '${value}M';
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.refresh();
            });
            it('checcking with undefined values', function (done) {
                loaded = function (args) {
                    var label = document.getElementById('container_Series_0_Point_6_Text_0');
                    expect(label.textContent).not.toEqual(NaN);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].intermediateSumIndexes = [2, 6];
                chartObj.series[0].dataSource = [
                    { x: 'Income', y: 4711 }, { x: 'Sales', y: -1015 },
                    { x: 'Development', y: -688 },
                    { x: 'Revenue', y: 1030 }, { x: 'Balance' },
                    { x: 'Expense', y: -361 }, { x: 'Tax', y: -695 },
                    { x: 'Net Profit' }
                ];
                chartObj.series[0].marker = { dataLabel: { visible: true } };
                chartObj.refresh();
            });
            it('Added data Source with negative axis', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0_Point_0');
                    expect(svg.getAttribute('d') != '').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = [{
                        x: 'Income',
                        y: -4711
                    }];
                chartObj.series[0].border = { color: '#5D843A' };
                chartObj.series[0].xName = 'x';
                chartObj.series[0].yName = 'y';
                chartObj.primaryYAxis.labelFormat = '${value}M';
                chartObj.primaryYAxis.maximum = 100;
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.refresh();
            });
            it('Single data point with range', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0_Point_0');
                    var xAxisLabelCollection = document.getElementById('containerAxisLabels0');
                    expect(xAxisLabelCollection.childNodes.length == 1).toBe(true);
                    var yAxisLabelCollection = document.getElementById('containerAxisLabels1');
                    expect(yAxisLabelCollection.childNodes.length == 6).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.interval = 1;
                chartObj.primaryYAxis.minimum = 0;
                chartObj.primaryYAxis.maximum = 5000;
                chartObj.primaryYAxis.interval = 1000;
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
                chartObj.primaryXAxis.labelFormat = null;
                chartObj.series = [{
                        dataSource: dateTimeData, xName: 'x', yName: 'y',
                        animation: { enable: false }, type: 'Waterfall',
                        name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
                    }];
                chartObj.refresh();
            });
            it('checking with log axis with DateTime axis', function (done) {
                loaded = function (args) {
                    var axisLabel = document.getElementById('container1_AxisLabel_1');
                    expect(axisLabel.textContent == '$100M').toBe(true);
                    var axisLabelLast = document.getElementById('container1_AxisLabel_4');
                    expect(axisLabelLast.textContent == '$100000M').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'DateTime';
                chartObj.primaryYAxis.labelFormat = '${value}M';
                chartObj.primaryXAxis.title = 'Years';
                chartObj.primaryYAxis.valueType = 'Logarithmic';
                chartObj.primaryYAxis.title = 'Profit';
                chartObj.series = [
                    {
                        type: 'Waterfall', name: 'Series1', xName: 'x', yName: 'y',
                        dataSource: [
                            { x: new Date(1995, 0, 1), y: 80 }, { x: new Date(1996, 0, 1), y: 200 },
                            { x: new Date(1997, 0, 1), y: 400 }, { x: new Date(1998, 0, 1), y: 600 },
                            { x: new Date(1999, 0, 1), y: 700 }, { x: new Date(2000, 0, 1), y: 1400 },
                            { x: new Date(2001, 0, 1), y: 2000 }, { x: new Date(2002, 0, 1), y: 4000 },
                            { x: new Date(2003, 0, 1), y: 6000 }, { x: new Date(2004, 0, 1), y: 8000 },
                            { x: new Date(2005, 0, 1), y: 11000 }
                        ], animation: { enable: false }
                    }
                ];
                chartObj.refresh();
            });
            it('with data source', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('containerSeriesGroup0').childNodes.length;
                    expect(seriesElements == 10).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].visible = true;
                chartObj.series[0].dataSource = chartData;
                chartObj.series[0].xName = 'x';
                chartObj.series[0].yName = 'y';
                chartObj.primaryYAxis.labelFormat = '${value}M';
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.primaryYAxis.valueType = 'Double';
                chartObj.primaryYAxis.minimum = 0;
                chartObj.primaryYAxis.maximum = 5000;
                chartObj.primaryYAxis.interval = 500;
                chartObj.refresh();
            });
            it('with connector appearence', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('container_Series_0_Connector_');
                    expect(seriesElements.getAttribute('stroke') === 'green').toBe(true);
                    expect(seriesElements.getAttribute('stroke-dasharray') === '3').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].visible = true;
                chartObj.series[0].dataSource = chartData;
                chartObj.series[0].xName = 'x';
                chartObj.series[0].yName = 'y';
                chartObj.series[0].connector.color = 'green';
                chartObj.series[0].connector.width = 3;
                chartObj.series[0].connector.dashArray = '3';
                chartObj.primaryYAxis.labelFormat = '${value}M';
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.primaryYAxis.minimum = 0;
                chartObj.primaryYAxis.maximum = 5000;
                chartObj.primaryYAxis.interval = 500;
                chartObj.refresh();
            });
            it('data source with intermediatesumIndexes', function (done) {
                loaded = function (args) {
                    var seriesElement = document.getElementById('containerSeriesGroup0').children;
                    expect((seriesElement[5]).getAttribute('fill') === '#00bdae').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].visible = true;
                chartObj.series[0].dataSource = chartData;
                chartObj.series[0].intermediateSumIndexes = [5];
                chartObj.series[0].xName = 'x';
                chartObj.series[0].yName = 'y';
                chartObj.primaryXAxis.labelIntersectAction = 'Rotate45';
                chartObj.primaryYAxis.labelFormat = '${value}M';
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.primaryYAxis.minimum = 0;
                chartObj.primaryYAxis.maximum = 5000;
                chartObj.primaryYAxis.interval = 500;
                chartObj.refresh();
            });
            it('data source with sum Index', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('containerSeriesGroup0').children;
                    expect(seriesElements[8].getAttribute('fill') === '#4E81BC').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].visible = true;
                chartObj.series[0].dataSource = chartData;
                chartObj.series[0].sumIndexes = [7];
                chartObj.series[0].xName = 'x';
                chartObj.series[0].yName = 'y';
                chartObj.series[0].animation.enable = false;
                chartObj.primaryXAxis.labelIntersectAction = 'Rotate45';
                chartObj.primaryYAxis.labelFormat = '${value}M';
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.primaryYAxis.minimum = 0;
                chartObj.primaryYAxis.maximum = 5000;
                chartObj.primaryYAxis.interval = 500;
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
            it('checking with marker', function (done) {
                loaded = function (args) {
                    var label = document.getElementById('container_Series_0_Point_1_Text_0');
                    expect(label === null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = chartData;
                chartObj.primaryYAxis.labelFormat = '${value}M';
                chartObj.series[0].xName = 'x';
                chartObj.series[0].yName = 'y';
                chartObj.animationComplete = null;
                chartObj.series[0].animation.enable = true;
                chartObj.series[0].marker.visible = true;
                chartObj.refresh();
            });
            it('checking with datalabel outer position', function (done) {
                loaded = function (args) {
                    var label = document.getElementById('container_Series_0_Point_1_Text_0');
                    expect(label.textContent).toEqual('$-427M');
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = chartData;
                chartObj.primaryYAxis.labelFormat = '${value}M';
                chartObj.series[0].xName = 'x';
                chartObj.series[0].yName = 'y';
                chartObj.animationComplete = null;
                chartObj.series[0].animation.enable = false;
                chartObj.series[0].marker.dataLabel.visible = true;
                chartObj.series[0].marker.dataLabel.position = 'Outer';
                chartObj.refresh();
            });
            it('checking with datalabel top position', function (done) {
                chartObj.loaded = function (args) {
                    var label = document.getElementById('container_Series_0_Point_2_Text_0');
                    expect(label.textContent).toEqual('$-588M');
                    done();
                };
                chartObj.series[0].marker.dataLabel.position = 'Top';
                chartObj.refresh();
            });
            it('checking with datalabel auto position', function (done) {
                chartObj.loaded = function (args) {
                    var label = document.getElementById('container_Series_0_Point_2_Text_0');
                    expect(label.textContent).toEqual('$-588M');
                    done();
                };
                chartObj.series[0].marker.dataLabel.position = 'Auto';
                chartObj.refresh();
            });
            it('checking with datalabel Middle(turns to auto) position', function (done) {
                chartObj.loaded = function (args) {
                    var label = document.getElementById('container_Series_0_Point_2_Text_0');
                    expect(label.textContent).toEqual('$-588M');
                    done();
                };
                chartObj.series[0].marker.dataLabel.position = 'Middle';
                chartObj.refresh();
            });
            it('checking with datalabel bottom(turns to auto) position', function (done) {
                loaded = function (args) {
                    var label = document.getElementById('container_Series_0_Point_2_Text_0');
                    expect(label.textContent).toEqual('$-588M');
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Bottom';
                chartObj.refresh();
            });
            it('data source with empty points', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('containerSeriesGroup0').childNodes.length;
                    expect(seriesElements == 4).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series = [{
                        dataSource: [{ x: 'income', y: 4711 }, { x: 'Marketting and Sales', y: -427 },
                            { x: 'Research', }]
                    }];
                chartObj.series[0].type = 'Waterfall';
                chartObj.series[0].visible = true;
                chartObj.series[0].xName = 'x';
                chartObj.series[0].yName = 'y';
                chartObj.series[0].intermediateSumIndexes = undefined;
                chartObj.series[0].sumIndexes = undefined;
                chartObj.series[0].animation.enable = true;
                chartObj.primaryXAxis.labelIntersectAction = 'Rotate45';
                chartObj.primaryYAxis.labelFormat = '${value}M';
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.primaryYAxis.minimum = 0;
                chartObj.primaryYAxis.maximum = 5000;
                chartObj.primaryYAxis.interval = 500;
                chartObj.refresh();
            });
            it('checking with multiple series', function (done) {
                loaded = function (args) {
                    var series0 = chartObj.series[0];
                    var series1 = chartObj.series[1];
                    expect((series1.points[2].regions[0].x) == series0.points[2].regions[0].width + series0.points[2].regions[0].x).toBe(true);
                    done();
                };
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.series = [
                    {
                        dataSource: [{ x: 'income', y: 4711 }, { x: 'Marketting and Sales', y: -607 },
                            { x: 'Research', y: -588 }, { x: 'dhehk', y: 1030 }], xName: 'x', yName: 'y', marker: {
                            visible: true,
                            width: 10, height: 10,
                            shape: 'Diamond'
                        },
                        name: 'series1', type: 'Waterfall', animation: { enable: false }
                    },
                    {
                        dataSource: [{ x: 'income', y: 4711 }, { x: 'Marketting and Sales', y: -427 },
                            { x: 'Research', y: -588 }, { x: 'dhehk', y: 1030 }], marker: {
                            visible: true,
                            width: 10, height: 10,
                            shape: 'Diamond'
                        }, xName: 'x', yName: 'y', name: 'series2', type: 'Waterfall',
                        animation: { enable: false }
                    }
                ];
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Legend Shape type', function (done) {
                loaded = function (args) {
                    var legendElement = document.getElementById('container_chart_legend_element');
                    expect(legendElement.tagName).toEqual('rect');
                    expect(legendElement.getAttribute('d')).not.toEqual(null);
                    var legendShape = document.getElementById('container_chart_legend_shape_0');
                    expect(legendShape.tagName).toEqual('ellipse');
                    expect(legendShape.getAttribute('d') !== null).toBe(true);
                    done();
                };
                chartObj.animationComplete = null;
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'Waterfall';
                chartObj.series[0].legendShape = 'Circle';
                chartObj.legendSettings = { visible: true };
                chartObj.refresh();
            });
            it('Single point selection', function (done) {
                loaded = function () {
                    var element = document.getElementById('container_Series_0_Point_1');
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
                    var element = document.getElementById('container_Series_0_Point_1');
                    trigger.clickEvent(element);
                    var selected = document.getElementsByClassName('container_ej2_chart_selection_series_0 ');
                    expect(element).toBe(selected[0]);
                    element = document.getElementById('container_Series_1_Point_1');
                    trigger.clickEvent(element);
                    selected = document.getElementsByClassName('container_ej2_chart_selection_series_1 ');
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
                    var element = document.getElementById('container_Series_0_Point_1');
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
                    var element = document.getElementById('container_Series_0_Point_1');
                    var element1 = document.getElementById('container_Series_1_Point_1');
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
            it('chart click event with selection enable', function (done) {
                loaded = function () {
                    var element = document.getElementById('container_Series_0_Point_1');
                    trigger.clickEvent(element);
                    var selected = document.getElementsByClassName('container_ej2_chart_selection_series_0 ');
                    expect(element).toBe(selected[0]);
                    trigger.clickEvent(element);
                    selected = document.getElementsByClassName('container_ej2_chart_selection_series_0 ');
                    expect(selected.length).toBe(0);
                    trigger.mouseupEvent(element, 20, 20, 100, 100);
                    done();
                };
                chartObj.selectionMode = 'Point';
                chartObj.isMultiSelect = true;
                chartObj.loaded = loaded;
                chartObj.tooltip.enable = true;
                chartObj.selectionModule.selectedDataIndexes = [];
                chartObj.refresh();
            });
            it('checking with tooltip without format', function (done) {
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
                    expect(tooltip.childNodes[0].childNodes[0].childNodes[1].textContent.replace(/\u200E/g, '')).toEqual('Marketting and Sales : $-607M');
                    expect(parseFloat(tooltip.style.top) < (series.points[1].regions[0].y + parseFloat(chartArea.getAttribute('y'))));
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].sumIndexes = [2, 5];
                chartObj.series[1].sumIndexes = [2, 5];
                chartObj.selectionModule.selectedDataIndexes = [];
                chartObj.tooltip.enable = true;
                chartObj.tooltip.header = '';
                chartObj.refresh();
            });
            it('checking with tooltip with format', function (done) {
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
                    expect(tooltip.childNodes[0].childNodes[0].childNodes[1].textContent.replace(/\u200E/g, '')).toEqual('series1 Marketting and Sales : $-607M');
                    expect(parseFloat(tooltip.style.top) < (series.points[1].regions[0].y + parseFloat(chartArea.getAttribute('y'))));
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.selectionModule.selectedDataIndexes = [];
                chartObj.tooltip.enable = true;
                chartObj.tooltip.format = '${series.name} ${point.x} : ${point.y}';
                chartObj.tooltip.header = '';
                chartObj.refresh();
            });
            it('checking with track ball', function (done) {
                var tooltip;
                chartObj.tooltip.enable = true;
                chartObj.tooltip.shared = true;
                chartObj.primaryYAxis.labelFormat = '{value}C';
                chartObj.primaryXAxis.valueType = 'Category';
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
                    expect(path.getAttribute('fill') == '#000816').toBe(true);
                    expect(text1.childNodes[0].getAttribute('fill') == '#dbdbdb').toBe(true);
                    expect(text1.childNodes[0].textContent.replace(/\u200E/g, '') == 'series1 Marketting and Sales ').toBe(true);
                    expect(text1.childNodes[1].textContent.replace(/\u200E/g, '') == ':').toBe(true);
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
                    expect(tooltip.childNodes[0].childNodes[0].textContent).toEqual('Marketting and Sales');
                    expect(tooltip.childNodes[0].childNodes[1].textContent).toEqual('-607C');
                    expect(tooltip != null).toBe(true);
                    y = parseFloat(chartArea.getAttribute('height')) + parseFloat(chartArea.getAttribute('y')) + 200 + element.offsetTop;
                    x = parseFloat(chartArea.getAttribute('width')) + parseFloat(chartArea.getAttribute('x')) + element.offsetLeft;
                    trigger.mouseleavetEvent(element, Math.ceil(x), Math.ceil(y));
                    done();
                };
                chartObj.tooltip.template = '<div>${x}</div><div>${y}</div>';
                chartObj.tooltip.shared = false;
                chartObj.title = 'Template';
                chartObj.loaded = loaded;
                chartObj.dataBind();
            });
            it('Legend position', function (done) {
                loaded = function (args) {
                    var legendElement = document.getElementById('container_chart_legend_element');
                    expect((parseInt(legendElement.getAttribute('x'), 10)) == (337) || (parseInt(legendElement.getAttribute('x'), 10)) == (334)).toBe(true);
                    expect((parseInt(legendElement.getAttribute('y'), 10)) == (46) ||
                        (parseInt(legendElement.getAttribute('y'), 10)) == (43)).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.legendSettings.position = 'Top';
                chartObj.refresh();
            });
            it('Legend alignment', function (done) {
                loaded = function (args) {
                    var legendElement = document.getElementById('container_chart_legend_element');
                    expect(parseInt(legendElement.getAttribute('x'), 10)).toBe(10);
                    expect((parseInt(legendElement.getAttribute('y'), 10)) == (46) ||
                        (parseInt(legendElement.getAttribute('y'), 10)) == (43)).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.legendSettings.alignment = 'Near';
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
                chartObj.legendSettings.alignment = 'Near';
                chartObj.refresh();
            });
            it('Legend Interaction with selection and non selection', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    var element = document.getElementById('container_chart_legend_text_0');
                    trigger.clickEvent(element);
                    var element1 = document.getElementById('containerSeriesCollection').children.length;
                    expect(element1 == 2).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.visible = false;
                chartObj.refresh();
            });
            it('Checking with category axis OnTicks', function (done) {
                loaded = function (args) {
                    var point = document.getElementById('container_Series_1_Point_0');
                    expect(point != null).toBe(true);
                    var axisLabel = document.getElementById('container0_AxisLabel_0');
                    expect(axisLabel.textContent == 'income').toBe(true);
                    var axisStart = document.getElementById('containerAxisLine_0');
                    expect(parseInt(axisLabel.getAttribute('x')) < parseInt(axisStart.getAttribute('d').split(' ')[1])).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.primaryXAxis.labelPlacement = 'OnTicks';
                chartObj.series[0].dataSource = chartData;
                chartObj.refresh();
            });
            it('Checking with category axis BetweenTicks', function (done) {
                loaded = function (args) {
                    var point = document.getElementById('container_Series_1_Point_0');
                    expect(point != null).toBe(true);
                    var axisLabel = document.getElementById('container0_AxisLabel_0');
                    expect(axisLabel.textContent == 'income').toBe(true);
                    var axisStart = document.getElementById('containerAxisLine_0');
                    expect(parseInt(axisLabel.getAttribute('x')) > parseInt(axisStart.getAttribute('d').split(' ')[1])).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.primaryXAxis.labelPlacement = 'BetweenTicks';
                chartObj.series[0].dataSource = chartData;
                chartObj.refresh();
            });
            it('Checking with category axis with plotoffset', function (done) {
                loaded = function (args) {
                    var point = document.getElementById('containerSeriesGroup1');
                    expect(point != null).toBe(true);
                    expect(point.getAttribute('transform') == 'translate(82.5,79.25)' ||
                        point.getAttribute('transform') == 'translate(78.5,75.25)').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.primaryXAxis.labelPlacement = 'BetweenTicks';
                chartObj.primaryXAxis.plotOffset = 5;
                chartObj.series[0].dataSource = chartData;
                chartObj.refresh();
            });
            it('with yInversed datalabel', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_1_Point_0');
                    expect(svg.getAttribute('d') != '').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryYAxis.isInversed = true;
                chartObj.refresh();
            });
            it('with inverted datalabel', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_1_Point_0');
                    expect(svg.getAttribute('d') != '').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.isTransposed = true;
                chartObj.refresh();
            });
            it('with inverted and inversed datalabel', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_1_Point_0');
                    expect(svg.getAttribute('d') != '').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.isTransposed = true;
                chartObj.primaryYAxis.isInversed = true;
                chartObj.refresh();
            });
            it('resetting inverted and inversed datalabel changes', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_1_Point_0');
                    expect(svg.getAttribute('d') != '').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.isTransposed = false;
                chartObj.primaryYAxis.isInversed = false;
                chartObj.refresh();
            });
            it('Checking with category axis with multiple panes- rows', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('containerSeriesGroup1');
                    expect(svg.getAttribute('transform') == 'translate(77.5,79.25)' ||
                        svg.getAttribute('transform') == 'translate(73.5,75.25)').toBe(true);
                    svg = document.getElementById('containerAxisLine_2');
                    expect(svg.getAttribute('d').split(' ')[2] == '79.25' || svg.getAttribute('d').split(' ')[2] == '75.25').toBe(true);
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
                        dataSource: [{ x: 'income', y: 4711 }, { x: 'Marketting and Sales', y: -607 },
                            { x: 'Research', y: -588 }, { x: 'dhehk', y: 1030 }], xName: 'x', yName: 'y',
                        name: 'series1', type: 'Waterfall', sumIndexes: [2, 5], animation: { enable: false }
                    },
                    {
                        dataSource: [{ x: 'income', y: 9000 }, { x: 'Marketting and Sales', y: -427 },
                            { x: 'Research', y: -588 }, { x: 'dhehk', y: 1030 }], yAxisName: 'yAxis1',
                        xName: 'x', yName: 'y', name: 'series2', type: 'Waterfall', sumIndexes: [2, 5],
                        animation: { enable: false }
                    }
                ];
                chartObj.axes[0].rowIndex = 1;
                chartObj.axes[0].opposedPosition = true;
                chartObj.axes[0].name = 'yAxis1';
                chartObj.axes[0].minimum = 5000;
                chartObj.axes[0].maximum = 10000;
                chartObj.axes[0].interval = 500;
                chartObj.axes[0].title = 'Axis2';
                chartObj.primaryXAxis.plotOffset = 0;
                chartObj.refresh();
            });
            it('Checking with category axis with multiple panes- column', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('containerSeriesGroup1');
                    expect(svg.getAttribute('transform').indexOf('translate(477.5,296.69200897216797') > -1 ||
                        svg.getAttribute('transform') === 'translate(473.5,257.625)').toBe(true);
                    svg = document.getElementById('container_AxisBottom_Column0');
                    expect(svg.getAttribute('stroke') == 'red').toBe(true);
                    svg = document.getElementById('containerAxisLine_2');
                    expect(svg.getAttribute('d').split(' ')[1] == '477.5' || svg.getAttribute('d').split(' ')[1] == '478.5' || svg.getAttribute('d').split(' ')[1] == '473.5').toBe(true);
                    svg = document.getElementById('container_AxisBottom_Column1');
                    expect(svg.getAttribute('stroke') == 'blue').toBe(true);
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
                        dataSource: [{ x: 'income', y: 4711 }, { x: 'Marketting and Sales', y: -607 },
                            { x: 'Research', y: -588 }, { x: 'dhehk', y: 1030 }], xName: 'x', yName: 'y',
                        name: 'series1', type: 'Waterfall', sumIndexes: [2, 5], animation: { enable: false }
                    },
                    {
                        dataSource: [{ x: 'income', y: 4711 }, { x: 'Marketting and Sales', y: 3500 },
                            { x: 'Research', y: 2008 }, { x: 'dhehk', y: 1030 }], xAxisName: 'xAxis1',
                        xName: 'x', yName: 'y', name: 'series2', type: 'Column', sumIndexes: [2, 5],
                        animation: { enable: false }
                    }
                ];
                chartObj.axes[0].columnIndex = 1;
                chartObj.axes[0].name = 'xAxis1';
                chartObj.axes[0].valueType = 'Category';
                chartObj.axes[0].minimum = null;
                chartObj.axes[0].maximum = null;
                chartObj.axes[0].interval = null;
                chartObj.axes[0].labelIntersectAction = 'Rotate45';
                chartObj.axes[0].title = 'Axis3';
                chartObj.primaryYAxis.minimum = 0;
                chartObj.primaryYAxis.maximum = 5000;
                chartObj.refresh();
            });
            it('Checking with Months and its Round rangePadding', function (done) {
                loaded = function (args) {
                    expect(document.getElementById('containerAxisLabels0').childNodes[0].textContent == 'income').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.rangePadding = 'Round';
                chartObj.refresh();
            });
            it('Checking with fabric theme color', function (done) {
                loaded = function (args) {
                    var prefix = 'container_Series_';
                    var suffix = '_Point_';
                    expect(document.getElementById(prefix + 0 + suffix + 1).getAttribute('fill')).toBe(fabric[1]);
                    expect(document.getElementById(prefix + 0 + suffix + 3).getAttribute('fill')).toBe(fabric[4]);
                    done();
                };
                chartObj.theme = 'Fabric';
                chartObj.series[0].fill = fabric[4];
                chartObj.series[0].negativeFillColor = fabric[1];
                chartObj.series[0].summaryFillColor = fabric[2];
                chartObj.palettes = fabric;
                chartObj.loaded = loaded;
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
                    expect(chartObj.primaryYAxis.zoomPosition.toFixed(2) == '0.00').toBe(true);
                    done();
                };
                chartObj.zoomSettings.enableMouseWheelZooming = true;
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('checking pinch zooming', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    var touchStartArgs;
                    var areaElement = document.getElementById('container_svg');
                    chartObj.chartOnMouseDown(trigger.onTouchStart(areaElement, 608, 189, 504, 289, 504, 289));
                    chartObj.mouseMove(trigger.onTouchMove(areaElement, 728, 389, 404, 289, 404, 189));
                    chartObj.mouseMove(trigger.onTouchMove(areaElement, 748, 129, 304, 289, 304, 289));
                    var content = chartObj.primaryXAxis.zoomFactor.toFixed(2);
                    expect(content == '1.00' || content == '0.33' || content == '0.30').toBe(true);
                    content = chartObj.primaryYAxis.zoomFactor.toFixed(2);
                    expect(content == '1.00' || content === '0.90').toBe(true);
                    content = chartObj.primaryXAxis.zoomPosition.toFixed(2);
                    expect(content == '0.80' || content == '0.81').toBe(true);
                    chartObj.mouseLeave(trigger.onTouchLeave(areaElement, 748, 129, 304, 289, 304, 289));
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.zoomSettings.enablePinchZooming = true;
                chartObj.dataBind();
            });
        });
        describe('Checking connector lines', function () {
            var chart;
            var loaded;
            var element;
            element = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(element);
                chart = new chart_1.Chart({
                    primaryXAxis: {
                        valueType: 'Category',
                        majorGridLines: { width: 0 },
                        plotOffset: 20
                    },
                    primaryYAxis: {
                        minimum: 0, maximum: 10, interval: 2,
                        majorGridLines: { width: 0 },
                        title: 'Expenditure'
                    },
                    series: [{
                            dataSource: [{ x: 'Rating', y: 0 }, { x: 'Importance', y: 0 },
                                { x: 'Benchmark', y: 6 }, { x: 'Result' }],
                            width: 2, negativeFillColor: '#e56590',
                            xName: 'x', yName: 'y', intermediateSumIndexes: [3], sumIndexes: [4],
                            columnWidth: 0.9,
                            type: 'Waterfall', animation: { enable: true },
                            marker: {
                                dataLabel: { visible: true, font: { color: '#ffffff' } }
                            }, connector: { color: '#5F6A6A', width: 2 }
                        }],
                    chartArea: { border: { width: 0 } },
                    title: 'Company Revenue and Profit',
                    legendSettings: { visible: false },
                    width: '100%',
                });
                chart.appendTo('#container');
            });
            afterAll(function () {
                chart.destroy();
                element.remove();
            });
            it('Checking connector line with start point value 0', function (done) {
                loaded = function (args) {
                    var series = document.getElementById('container_Series_0_Connector_');
                    var d = series.getAttribute('d');
                    expect((d === 'M 14.45625000000004 368.5 L 563.7937499999999 368.5 ' +
                        'M 303.58124999999995 368.5 L 852.91875 368.5 M 592.70625 147.4 L 1142.04375 147.4 ') ||
                        (d === 'M 8.318750000000009 372.5 L 324.43125 372.5 M 174.69374999999997 372.5 L 490.80625000000003 372.5 ' +
                            'M 341.06874999999997 149 L 657.18125 149 ')).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.refresh();
            });
            it('Checking connector line with start point value 0 chart is transposed', function (done) {
                loaded = function (args) {
                    var series = document.getElementById('container_Series_0_Connector_');
                    var d = series.getAttribute('d');
                    expect((d === 'M 0 300.69375 L 0 156.05624999999998 M 0 222.06875000000002 ' +
                        'L 0 79.93124999999999 M 703.5 148.44375000000002 L 703.5 3.8062499999999866 ') ||
                        (d === 'M 0 307.60625000000005 L 0 159.64374999999998 M 0 229.73125000000002 L 0 81.76874999999998 ' +
                            'M 410.09999999999997 151.85625000000002 L 410.09999999999997 3.893749999999986 ')).toBe(true);
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
