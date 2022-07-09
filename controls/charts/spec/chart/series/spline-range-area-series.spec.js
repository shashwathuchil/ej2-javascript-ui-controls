define(["require", "exports", "@syncfusion/ej2-base", "../../../src/chart/chart", "../../../src/chart/legend/legend", "../../../src/chart/series/spline-series", "../../../src/chart/series/data-label", "../../../src/chart/axis/category-axis", "../../../src/chart/axis/date-time-axis", "../../../src/chart/axis/logarithmic-axis", "../../../src/chart/series/spline-range-area-series", "../../../src/chart/series/range-column-series", "../base/events.spec", "../../../src/chart/user-interaction/tooltip", "../../../src/chart/user-interaction/crosshair", "../../../src/chart/user-interaction/selection", "../base/data.spec", "../../common.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, chart_1, legend_1, spline_series_1, data_label_1, category_axis_1, date_time_axis_1, logarithmic_axis_1, spline_range_area_series_1, range_column_series_1, events_spec_1, tooltip_1, crosshair_1, selection_1, data_spec_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(spline_series_1.SplineSeries, data_label_1.DataLabel, category_axis_1.Category, date_time_axis_1.DateTime, spline_range_area_series_1.SplineRangeAreaSeries, range_column_series_1.RangeColumnSeries, legend_1.Legend, tooltip_1.Tooltip, crosshair_1.Crosshair, logarithmic_axis_1.Logarithmic, selection_1.Selection);
    var pointData = [
        { x: 'Jan', low: 0.7, high: 6.7 }, { x: 'Feb', low: 1.3, high: 6.3 }, { x: 'Mar', low: 1.9, high: 8.5 },
        { x: 'Apr', low: 3.1, high: 10.8 }, { x: 'May', low: 5.7, high: 14.40 }, { x: 'Jun', low: 8.4, high: 16.90 },
        { x: 'Jul', low: 10.6, high: 19.20 }, { x: 'Aug', low: 10.5, high: 18.9 }, { x: 'Sep', low: 8.5, high: 16.1 },
        { x: 'Oct', low: 6.0, high: 12.5 }, { x: 'Nov', low: 1.5, high: 6.9 }, { x: 'Dec', low: 5.1, high: 12.1 }
    ];
    var data = [
        { x: 'Jan', high: 4.63, low: 2.03 },
        { x: 'Feb', high: 3.11, low: 2.14 },
        { x: 'Mar', high: 2.68, low: 2.31 },
        { x: 'Apr', high: 3.16, low: 2.24 },
        { x: 'May', high: 3.57, low: 2.02 },
        { x: 'Jun', high: 3.56, low: 1.05 },
        { x: 'Jul', high: 3.63, low: 1.24 },
        { x: 'Aug', high: 3.77, low: 1.15 },
        { x: 'Sep', high: 3.87, low: 1.14 },
        { x: 'Oct', high: 3.53, low: 1.17 },
        { x: 'Nov', high: 3.39, low: 1.14 },
        { x: 'Dec', high: 2.96, low: 1.50 }
    ];
    exports.categoryData = [
        { x: 'Jan', low: 0.7, high: 7.7 }, { x: 'Feb', low: 1.3, high: 8.1 }, { x: 'Mar', low: 1.9, high: 8.5 },
        { x: 'Apr', low: 3.1, high: 10.8 }, { x: 'May', low: 5.7, high: 14.40 }, { x: 'Jun', low: 8.4, high: 16.90 },
        { x: 'Jul', low: 10.6, high: 19.20 }, { x: 'Aug', low: 10.5, high: 18.9 }, { x: 'Sep', low: 8.5, high: 16.1 },
        { x: 'Oct', low: 6.0, high: 12.5 }, { x: 'Nov', low: 1.5, high: 6.9 }, { x: 'Dec', low: 5.1, high: 12.1 }
    ];
    exports.doubleData = [
        { x: 1, low: -12, high: 0 }, { x: 2, low: 10, high: 22 },
        { x: 3, low: 13, high: 50 }, { x: 4, low: 20, high: 202 },
        { x: 5, low: 0, high: 20 }, { x: 6, low: -22, high: 34 },
        { x: 7, low: -12, high: 23 }, { x: 8, low: 12, high: 40 }
    ];
    exports.doubleData1 = [
        { x: 1, low: 8, high: 20 }, { x: 2, low: 2, high: 18 },
        { x: 3, low: 13, high: 30 }, { x: 4, low: 20, high: 43 },
    ];
    exports.doubleData2 = [
        { x: 1, low: 80, high: 120 }, { x: 2, low: 70, high: 95 },
        { x: 3, low: 55, high: 77 }, { x: 4, low: 60, high: 80 },
    ];
    var datatime = [
        { x: new Date(2000, 3, 21), high: 200.19, low: 130.37 },
        { x: new Date(2000, 6, 17), high: 203.23, low: 93.16 },
        { x: new Date(2000, 9, 18), high: 204.89, low: 104.23 },
        { x: new Date(2001, 3, 20), high: 152, low: 67 },
        { x: new Date(2001, 6, 25), high: 135.45, low: 70.23 },
        { x: new Date(2001, 9, 30), high: 200.12, low: 140.69 }
    ];
    var logdata = [
        { x: 1, high: 900.19, low: 200.37 },
        { x: 2, high: 1163.23, low: 809.16 },
        { x: 3, high: 5004.89, low: 2104.23 },
        { x: 4, high: 19152.35, low: 16967 },
        { x: 5, high: 19952.35, low: 17967 },
        { x: 6, high: 21152.35, low: 16967 },
        { x: 7, high: 23152.35, low: 18967 },
        { x: 8, high: 24152.35, low: 21967 },
    ];
    var lineData = [
        { x: 1, y: 28 }, { x: 2, y: 25 }, { x: 3, y: 26 }, { x: 4, y: 27 },
        { x: 5, y: 32 }, { x: 6, y: 35 }, { x: 7, y: 30 }
    ];
    var prevent = function () {
    };
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
        var id = 'container';
        var draggedRectGroup = id + '_ej2_drag_rect';
        var closeId = id + '_ej2_drag_close';
        describe('Spline Range Area Series', function () {
            var chartObj;
            var loaded;
            var animate;
            var trigger = new events_spec_1.MouseEvents();
            element = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(element);
                chartObj = new chart_1.Chart({
                    primaryXAxis: {
                        title: 'Month',
                    },
                    primaryYAxis: {
                        title: 'Temperature(Celsius)'
                    },
                    series: [{
                            animation: { enable: false },
                            name: 'India',
                            type: 'SplineRangeArea', marker: { visible: true }
                        }],
                    width: '800',
                    title: 'Chart TS Title', loaded: loaded, legendSettings: { visible: true }
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                document.getElementById('container').remove();
            });
            it('Default Series Type without data Points', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0');
                    expect(svg.getAttribute('d') == '').toBe(true);
                    var xAxisLabelCollection = document.getElementById('containerAxisLabels0');
                    expect(xAxisLabelCollection.childNodes.length == 11).toBe(true);
                    var yAxisLabelCollection = document.getElementById('containerAxisLabels1');
                    expect(yAxisLabelCollection.childNodes.length == 7).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Single data point with range', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0');
                    expect(svg.getAttribute('d') == '').toBe(true);
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
            it('with Category dataSource', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('containerSeriesGroup0').childNodes.length;
                    expect(seriesElements == 2).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].visible = true;
                chartObj.series[0].dataSource = data;
                chartObj.series[0].fill = 'blueviolet';
                chartObj.series[0].border.color = 'red';
                chartObj.series[0].border.width = 2;
                chartObj.series[0].xName = 'x';
                chartObj.series[0].high = 'high';
                chartObj.series[0].low = 'low';
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.primaryYAxis.minimum = -1;
                chartObj.primaryYAxis.maximum = 5;
                chartObj.primaryYAxis.interval = 0.5;
                chartObj.refresh();
            });
            it('with dash array', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('container_Series_0');
                    var stroke = seriesElements.getAttribute('stroke-dasharray');
                    expect(stroke == '4').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dashArray = '4';
                chartObj.refresh();
            });
            it('with fill and stroke', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('container_Series_0');
                    expect(seriesElements.getAttribute('fill') == 'red').toBe(true);
                    expect(seriesElements.getAttribute('stroke') == 'green').toBe(true);
                    expect(seriesElements.getAttribute('stroke-width') == '2').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dashArray = null;
                chartObj.series[0].fill = 'red';
                chartObj.series[0].border.color = 'green';
                chartObj.series[0].border.width = 2;
                chartObj.series[0].opacity = 0.6;
                chartObj.refresh();
            });
            it('Showing default marker', function (done) {
                loaded = function (args) {
                    var series1 = document.getElementById('containerSymbolGroup0').childNodes.length;
                    expect(series1 == 25).toBe(true);
                    var marker = document.getElementById('container_Series_0_Point_1_Symbol');
                    expect(marker.getAttribute('stroke') == 'red').toBe(true);
                    expect(marker.getAttribute('rx') == '2.5').toBe(true);
                    expect(marker.getAttribute('ry') == '2.5').toBe(true);
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
            it('Checking with category axis OnTicks', function (done) {
                loaded = function (args) {
                    var point = document.getElementById('container_Series_0');
                    expect(point !== null).toBe(true);
                    var axisLabel = document.getElementById('container0_AxisLabel_0');
                    expect(axisLabel.textContent == 'Jan').toBe(true);
                    var axisStart = document.getElementById('containerAxisLine_0');
                    expect(parseInt(axisLabel.getAttribute('x')) < parseInt(axisStart.getAttribute('d').split(' ')[1])).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.labelPlacement = 'OnTicks';
                chartObj.refresh();
            });
            it('Checking with category axis BetweenTicks', function (done) {
                loaded = function (args) {
                    var point = document.getElementById('container_Series_0');
                    expect(point !== null).toBe(true);
                    var axisLabel = document.getElementById('container0_AxisLabel_0');
                    expect(axisLabel.textContent == 'Jan').toBe(true);
                    var axisStart = document.getElementById('containerAxisLine_0');
                    expect(parseInt(axisLabel.getAttribute('x')) > parseInt(axisStart.getAttribute('d').split(' ')[1])).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.labelPlacement = 'BetweenTicks';
                chartObj.refresh();
            });
            it('Checking with category axis with plotoffset', function (done) {
                loaded = function (args) {
                    var point = document.getElementById('containerAxisLine_0');
                    expect(point != null).toBe(true);
                    expect(point.getAttribute('d').split(' ')[2] == '355.5' || point.getAttribute('d').split(' ')[2] == '360.5').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.primaryXAxis.labelPlacement = 'BetweenTicks';
                chartObj.primaryXAxis.plotOffset = 5;
                chartObj.refresh();
            });
            it('Default Series Type with chart width', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_svg');
                    expect(svg.clientWidth == 1000).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.width = '1000px';
                chartObj.refresh();
            });
            it('Checking with valuetype as dateTime', function (done) {
                loaded = function (args) {
                    var point = document.getElementById('container_Series_0');
                    expect(point !== null).toBe(true);
                    var axisLabel = document.getElementById('container0_AxisLabel_0');
                    expect(axisLabel.textContent == 'May').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'DateTime';
                chartObj.series[0].dataSource = datatime;
                chartObj.primaryYAxis.minimum = 50;
                chartObj.primaryYAxis.maximum = 210;
                chartObj.primaryYAxis.interval = 10;
                chartObj.series[0].xName = 'x';
                chartObj.series[0].high = 'high';
                chartObj.series[0].low = 'low';
                chartObj.height = '500px';
                chartObj.primaryXAxis.labelPlacement = 'BetweenTicks';
                chartObj.refresh();
            });
            it('Checking with Months and its Round rangePadding', function (done) {
                loaded = function (args) {
                    expect(document.getElementById('containerAxisLabels0').childNodes[0].textContent == 'Mar').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.rangePadding = 'Round';
                chartObj.refresh();
            });
            it('Checking with valuetype as logarthimic with logbase8', function (done) {
                loaded = function (args) {
                    var point = document.getElementById('container_Series_0');
                    expect(point !== null).toBe(true);
                    var axisLabel = document.getElementById('container1_AxisLabel_3');
                    expect(axisLabel.textContent == '32768').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryYAxis.valueType = 'Logarithmic';
                chartObj.primaryYAxis.logBase = 8;
                chartObj.primaryXAxis.rangePadding = 'None';
                chartObj.primaryYAxis.minimum = 190;
                chartObj.primaryYAxis.maximum = 20000;
                chartObj.primaryYAxis.interval = null;
                chartObj.series[0].dataSource = logdata;
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.series[0].xName = 'x';
                chartObj.series[0].high = 'high';
                chartObj.series[0].low = 'low';
                chartObj.primaryXAxis.labelPlacement = 'BetweenTicks';
                chartObj.refresh();
            });
            it('checking with datalabel outer position', function (done) {
                loaded = function (args) {
                    var element1 = +document.getElementById('container_Series_0_Point_2_Text_0').getAttribute('y');
                    expect(chartObj.series[0].points[2].symbolLocations[0].y > element1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = pointData;
                chartObj.primaryYAxis.minimum = -1;
                chartObj.primaryYAxis.maximum = 25;
                chartObj.primaryXAxis.minimum = null;
                chartObj.primaryXAxis.maximum = null;
                chartObj.primaryXAxis.interval = null;
                chartObj.primaryYAxis.interval = null;
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.series[0].xName = 'x';
                chartObj.series[0].high = 'high';
                chartObj.series[0].low = 'low';
                chartObj.width = '1200px';
                chartObj.height = '700px';
                chartObj.series[0].marker.visible = true;
                chartObj.series[0].marker.shape = 'Diamond';
                chartObj.series[0].marker.border = { color: 'red', width: 2 };
                chartObj.series[0].marker.dataLabel.visible = true;
                chartObj.series[0].marker.dataLabel.position = 'Outer';
                chartObj.refresh();
            });
            it('checking with datalabel auto position', function (done) {
                chartObj.loaded = function (args) {
                    var label = document.getElementById('container_Series_0_Point_2_Text_0');
                    expect(label.textContent).toEqual('8.5');
                    done();
                };
                chartObj.series[0].marker.dataLabel.position = 'Auto';
                chartObj.refresh();
            });
            it('checking with datalabel top position', function (done) {
                loaded = function (args) {
                    var element1 = +document.getElementById('container_Series_0_Point_2_Text_0').getAttribute('y');
                    expect(chartObj.series[0].points[2].symbolLocations[0].y < element1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Top';
                chartObj.refresh();
            });
            it('series selection ', function (done) {
                loaded = function () {
                    var element = document.getElementById('container_Series_0');
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
                chartObj.refresh();
            });
            it('Single point selection and UnSelection', function (done) {
                loaded = function () {
                    element = document.getElementById('container_Series_0_Point_1_Symbol');
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
                chartObj.selectionModule.selectedDataIndexes = [];
                chartObj.refresh();
            });
            it('Selection mode DragX', function (done) {
                loaded = function () {
                    element = document.getElementById('container');
                    trigger.draganddropEvent(element, 300, 100, 500, 100);
                    element = document.getElementById(draggedRectGroup);
                    expect(element.getAttribute('x') == '292').toBe(true);
                    expect(element.getAttribute('y') == '42.25' || element.getAttribute('y') == '45.25');
                    expect(element.getAttribute('height') == '560.75' || element.getAttribute('height') == '568.75').toBe(true);
                    expect(element.getAttribute('width')).toEqual('200');
                    done();
                };
                chartObj.selectionMode = 'DragX';
                chartObj.loaded = loaded;
                chartObj.selectionModule.selectedDataIndexes = [];
                chartObj.refresh();
            });
            it('Selection mode DragY', function (done) {
                loaded = function () {
                    element = document.getElementById('container');
                    trigger.draganddropEvent(element, 300, 100, 500, 240);
                    element = document.getElementById(draggedRectGroup);
                    expect(element.getAttribute('x') == '73.5' || element.getAttribute('x') == '72.5' || element.getAttribute('x') == '53.25'
                        || element.getAttribute('x') == '68.5' || element.getAttribute('x') == '57.25').toBe(true);
                    expect(element.getAttribute('y')).toEqual('92');
                    expect(element.getAttribute('height') == '140').toBe(true);
                    expect(element.getAttribute('width') == '1116.5' || element.getAttribute('width') == '1133'
                        || element.getAttribute('width') == '1117.5' || element.getAttribute('width') == '1121.5' ||
                        element.getAttribute('width') == '1137').toBe(true);
                    done();
                };
                chartObj.selectionMode = 'DragY';
                chartObj.loaded = loaded;
                chartObj.selectionModule.selectedDataIndexes = [];
                chartObj.refresh();
            });
            it('Selection mode DragXY', function (done) {
                loaded = function () {
                    element = document.getElementById('container');
                    trigger.draganddropEvent(element, 300, 500, 700, 100);
                    element = document.getElementById(draggedRectGroup);
                    expect(element.getAttribute('x') == '292').toBe(true);
                    expect(element.getAttribute('y')).toEqual('92');
                    expect(element.getAttribute('height') == '400').toBe(true);
                    expect(element.getAttribute('width')).toEqual('400');
                    trigger.mouseupEvent(document.getElementById(closeId), 0, 0, 0, 0);
                    done();
                };
                chartObj.dragComplete = function (args) {
                    chartObj.dragComplete = null;
                    expect(args.selectedDataValues.length).toBe(1);
                };
                chartObj.selectionMode = 'DragXY';
                chartObj.loaded = loaded;
                chartObj.selectionModule.selectedDataIndexes = [];
                chartObj.refresh();
            });
            it('checking with tooltip', function (done) {
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_1_Symbol');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = series.points[1].regions[0].y + 10 + parseFloat(chartArea.getAttribute('y')) + (element.offsetTop || 0);
                    var x = series.points[1].regions[0].x + 15 + parseFloat(chartArea.getAttribute('x')) + (element.offsetLeft || 0);
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    expect(target.getAttribute('opacity') == '1').toBe(true);
                    expect(tooltip.childNodes[0].childNodes[0].childNodes[1].textContent.replace(/\u200E/g, '')).toEqual('IndiaFebHigh : 6.3Low : 1.3');
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.tooltip.enable = true;
                chartObj.refresh();
            });
            it('Tooltip with given label format', function (done) {
                var target;
                var tooltip;
                chartObj.tooltip.enable = true;
                chartObj.tooltip.shared = false;
                chartObj.tooltip.fill = 'pink';
                chartObj.tooltip.textStyle.color = 'red';
                chartObj.tooltip.format = '${series.name}  <br/> x : ${point.x} <br/> High : ${point.high} <br/> Low : ${point.low} <br/>';
                chartObj.loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_1_Symbol');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = series.points[1].regions[0].y + 10 + parseFloat(chartArea.getAttribute('y')) + (element.offsetTop || 0);
                    var x = series.points[1].regions[0].x + 15 + parseFloat(chartArea.getAttribute('x')) + (element.offsetLeft || 0);
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    var group = tooltip.childNodes[0].childNodes[0];
                    var path = group.childNodes[0];
                    var text1 = group.childNodes[1];
                    expect(path.getAttribute('fill') == 'pink').toBe(true);
                    expect(text1.childNodes[0].getAttribute('fill') == 'red').toBe(true);
                    done();
                };
                chartObj.refresh();
            });
            it('checking with track ball', function (done) {
                ej2_base_1.remove(document.getElementById('container_tooltip'));
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_1_Symbol');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = series.points[3].regions[0].y + 10 + parseFloat(chartArea.getAttribute('y')) + (element.offsetTop || 0);
                    var x = series.points[3].regions[0].x + 15 + parseFloat(chartArea.getAttribute('x')) + (element.offsetLeft || 0);
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
                chartObj.crosshair.enable = true;
                chartObj.crosshair.lineType = 'Vertical';
                chartObj.refresh();
            });
            it('checking with cross hair', function (done) {
                loaded = function (args) {
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var series = chartObj.series[0];
                    var y = series.points[2].regions[0].y + 10 + parseFloat(chartArea.getAttribute('y')) + (element.offsetTop || 0);
                    var x = series.points[2].regions[0].x + 15 + series.points[2].regions[0].width / 2 +
                        parseFloat(chartArea.getAttribute('x')) + (element.offsetLeft || 0);
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
                    element1 = crosshair.childNodes[2].childNodes[3];
                    expect(element1.textContent == '8.367' || element1.textContent == '8.321' || element1.textContent == '8.336' || element1.textContent == '8.326').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.crosshair.enable = true;
                chartObj.crosshair.lineType = 'Both';
                chartObj.series[0].animation.enable = false;
                chartObj.primaryXAxis.crosshairTooltip.enable = true;
                chartObj.primaryYAxis.crosshairTooltip.enable = true;
                chartObj.refresh();
            });
            it('with empty point(x Value)', function (done) {
                loaded = function (args) {
                    var point = document.getElementById('container_Series_0');
                    expect(point !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource[0].x = null;
                chartObj.refresh();
            });
            it('Checking with category(high and low) null points', function (done) {
                loaded = function (args) {
                    var point = document.getElementById('container_Series_0');
                    expect(point !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].visible = true;
                chartObj.series[0].dataSource[4].high = null;
                chartObj.series[0].dataSource[4].low = null;
                chartObj.refresh();
            });
            it('Checking with low value higher than high value', function (done) {
                loaded = function (args) {
                    var point = document.getElementById('container_Series_0');
                    expect(point != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.primaryYAxis.valueType = 'Double';
                chartObj.primaryXAxis.minimum = 0;
                chartObj.primaryXAxis.maximum = 20;
                chartObj.primaryYAxis.minimum = -30;
                chartObj.primaryYAxis.maximum = 250;
                chartObj.series = [
                    {
                        dataSource: exports.doubleData, xName: 'x', high: 'high', low: 'low', fill: 'red', opacity: 0.5, border: { width: 1, color: 'green' },
                        name: 'series1', type: 'SplineRangeArea', animation: { enable: false },
                    },
                ];
                chartObj.series[0].dataSource[0].high = 44;
                chartObj.series[0].dataSource[0].low = 29;
                chartObj.refresh();
            });
            it('Checking data label for low > high for negative points', function (done) {
                loaded = function (args) {
                    var label = document.getElementById('container_Series_0_Point_0_Text_0');
                    expect(label.textContent).toEqual('-5');
                    label = document.getElementById('container_Series_0_Point_3_Text_0');
                    expect(label.textContent).toEqual('202');
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.visible = true;
                chartObj.series[0].marker.width = 10;
                chartObj.series[0].marker.height = 10;
                chartObj.series[0].marker.dataLabel.visible = true;
                chartObj.series[0].marker.dataLabel.position = 'Outer';
                chartObj.series[0].dataSource[0].high = -19;
                chartObj.series[0].dataSource[0].low = -5;
                chartObj.refresh();
            });
            it('checking with multiple series', function (done) {
                loaded = function (args) {
                    var series0 = chartObj.series[0];
                    var series1 = chartObj.series[1];
                    expect((series1.points[2].regions[0].x) !== series0.points[2].regions[0].width + series0.points[2].regions[0].x).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series = [
                    {
                        dataSource: exports.doubleData, xName: 'x', high: 'high', low: 'low', fill: 'red', opacity: 0.5, border: { width: 1, color: 'green' },
                        name: 'series1', type: 'SplineRangeArea', animation: { enable: false }
                    },
                    {
                        dataSource: exports.doubleData1, xName: 'x', high: 'high', low: 'low', fill: 'blueviolet', opacity: 0.5, border: { width: 1, color: 'pink' },
                        name: 'series2', type: 'SplineRangeArea', animation: { enable: false }
                    }
                ];
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
                chartObj.series[0].type = 'SplineRangeArea';
                chartObj.legendSettings = { visible: true };
                chartObj.refresh();
            });
            it('Custom Legend Shape type', function (done) {
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
                chartObj.series[0].type = 'SplineRangeArea';
                chartObj.series[0].legendShape = 'Diamond';
                chartObj.legendSettings = { visible: true, };
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
                chartObj.refresh();
            });
            it('Legend position', function (done) {
                loaded = function (args) {
                    var legendElement = document.getElementById('container_chart_legend_element');
                    expect(parseInt(legendElement.getAttribute('y'), 10) == 46 ||
                        parseInt(legendElement.getAttribute('y'), 10) == 43).toBe(true);
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
                    expect(parseInt(legendElement.getAttribute('y'), 10) == 46 ||
                        parseInt(legendElement.getAttribute('y'), 10) == 43).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.legendSettings.alignment = 'Near';
                chartObj.refresh();
            });
            it('Checking with category axis with multiple panes- rows', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('containerAxisLine_1');
                    expect(svg.getAttribute('d').split(' ')[2] == '359.375').toBe(true);
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
                        dataSource: exports.doubleData1, xName: 'x', high: 'high', low: 'low',
                        name: 'series1', type: 'SplineRangeArea', animation: { enable: false },
                        fill: 'red', opacity: 0.5, border: { width: 1, color: 'green' },
                        marker: {
                            visible: true,
                            height: 10, width: 10,
                            shape: 'Pentagon', border: { color: 'red', width: 2 },
                            dataLabel: { visible: true, position: 'Outer' }
                        },
                    },
                    {
                        dataSource: exports.doubleData2, xName: 'x', high: 'high', low: 'low',
                        name: 'series2', type: 'SplineRangeArea', animation: { enable: false }, yAxisName: 'yAxis1',
                        fill: 'red', opacity: 0.5, border: { width: 1, color: 'green' },
                        marker: {
                            visible: true,
                            height: 10, width: 10,
                            shape: 'Pentagon', border: { color: 'red', width: 2 },
                            dataLabel: { visible: true, position: 'Outer' }
                        },
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
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.primaryYAxis.valueType = 'Double';
                chartObj.primaryXAxis.minimum = -1;
                chartObj.primaryXAxis.maximum = 20;
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
            it('Animation enabling with isTransposed', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_svg');
                    expect(svg.clientWidth == 1200).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.isTransposed = true;
                chartObj.series[0].marker.visible = true;
                chartObj.series[0].animation.enable = true;
                chartObj.series[0].animation.duration = 4000;
                chartObj.series[0].animation.delay = 300;
                chartObj.refresh();
            });
            it('Animation enabling without isTransposed', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_svg');
                    expect(svg.clientWidth == 1200).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.isTransposed = false;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking with multiple different series ', function (done) {
                loaded = function (args) {
                    var series0 = chartObj.series[0];
                    var series1 = chartObj.series[1];
                    expect((series1.points[2].regions[0].x) !== series0.points[2].regions[0].width + series0.points[2].regions[0].x).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.minimum = 0;
                chartObj.primaryXAxis.maximum = 20;
                chartObj.primaryXAxis.interval = 1;
                chartObj.primaryYAxis.minimum = -30;
                chartObj.primaryYAxis.maximum = 70;
                chartObj.primaryYAxis.interval = 5;
                chartObj.series = [
                    {
                        dataSource: exports.doubleData, xName: 'x', high: 'high', low: 'low',
                        name: 'series1', type: 'SplineRangeArea', animation: { enable: false },
                        fill: 'red', opacity: 0.5, border: { width: 1, color: 'green' },
                        marker: {
                            visible: true,
                            height: 10, width: 10,
                            shape: 'Pentagon', border: { color: 'red', width: 2 },
                            dataLabel: { visible: true, position: 'Outer' }
                        },
                    },
                    {
                        dataSource: lineData, width: 2,
                        xName: 'x', yName: 'y',
                        name: 'India',
                        type: 'Line',
                        fill: 'red', opacity: 0.5, border: { width: 1, color: 'green' },
                        marker: {
                            visible: true,
                            height: 10, width: 10,
                            shape: 'Pentagon', border: { color: 'red', width: 2 },
                            dataLabel: { visible: true, position: 'Outer' }
                        },
                    }
                ];
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
                            dataSource: exports.doubleData, xName: 'x', low: 'low', high: 'high', animation: { enable: false }, type: 'SplineRangeArea',
                            name: 'ChartSeriesNameGold1', fill: 'black',
                            xAxisName: 'xAxis2', yAxisName: 'yAxis2'
                        },
                        {
                            dataSource: exports.doubleData, xName: 'x', low: 'low', high: 'high', animation: { enable: false }, type: 'RangeColumn',
                            name: 'ChartSeriesNameDiamond', fill: 'blue',
                            xAxisName: 'xAxis2', yAxisName: 'yAxis2'
                        },
                        {
                            dataSource: exports.doubleData, xName: 'x', low: 'low', high: 'high', animation: { enable: false }, type: 'RangeColumn',
                            name: 'ChartSeriesNameSilver', fill: 'green',
                            xAxisName: 'xAxis6', yAxisName: 'yAxis3',
                        },
                        {
                            dataSource: exports.doubleData, xName: 'x', low: 'low', high: 'high', animation: { enable: false },
                            type: 'SplineRangeArea',
                            name: 'ChartSeriesNameRuby', fill: 'red',
                            xAxisName: 'xAxis5', yAxisName: 'yAxis4',
                        },
                        {
                            dataSource: exports.doubleData, xName: 'x', low: 'low', high: 'high', animation: { enable: false }, type: 'SplineRangeArea',
                            name: 'ChartSeriesNamePlatinum', fill: 'rgba(135,000,235,1)',
                            xAxisName: 'xAxis3', yAxisName: 'yAxis5',
                        },
                        {
                            dataSource: exports.doubleData, xName: 'x', low: 'low', high: 'high', animation: { enable: false }, type: 'SplineRangeArea',
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
        });
        describe('Inversed Spline Range Area Series', function () {
            var chartObj;
            var loaded;
            var animate;
            var trigger = new events_spec_1.MouseEvents();
            var element2 = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(element2);
                chartObj = new chart_1.Chart({
                    primaryXAxis: {
                        title: 'Month',
                    },
                    primaryYAxis: {
                        title: 'Temperature(Celsius)'
                    },
                    series: [{
                            dataSource: exports.doubleData,
                            xName: 'x', low: 'low', high: 'high',
                            animation: { enable: false },
                            name: 'India',
                            type: 'SplineRangeArea', marker: { visible: true, dataLabel: { visible: true } },
                        }],
                    width: '800',
                    title: 'Chart TS Title', legendSettings: { visible: true }
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                document.getElementById('container').remove();
            });
            it('Checking inversed  spline range area series', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0');
                    var bounds = svg.getBoundingClientRect();
                    expect(Math.round(bounds.top) == 82 || Math.round(bounds.top) == 79).toBe(true);
                    expect(bounds.left == 92.5 || bounds.left == 86.5).toBe(true);
                    expect(bounds.width == 705.5 || bounds.width == 711.5).toBe(true);
                    expect(Math.round(bounds.height) == 233 || Math.round(bounds.height) == 239).toBe(true);
                    var element1 = +document.getElementById('container_Series_0_Point_2_Text_0').getAttribute('y');
                    expect(Math.round(element1) == 122 || Math.round(element1) == 123).toBe(true);
                    element1 = +document.getElementById('container_Series_0_Point_2_Text_1').getAttribute('y');
                    expect(Math.round(element1) == 54 || Math.round(element1) == 56).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryYAxis.isInversed = true;
                chartObj.refresh();
            });
            it('Checking transposed  spline range area series', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0');
                    var bounds = svg.getBoundingClientRect();
                    expect(bounds.top == 50.25 || bounds.top == 53.25).toBe(true);
                    expect(Math.round(bounds.left) == 158 || Math.round(bounds.left) == 155).toBe(true);
                    expect(Math.round(bounds.width) == 594 || Math.round(bounds.width) == 597).toBe(true);
                    expect(bounds.height == 310.25 || bounds.height == 318.25 || bounds.height == 318.75).toBe(true);
                    var element1 = +document.getElementById('container_Series_0_Point_2_Text_0').getAttribute('x');
                    expect(Math.round(element1) == 488 || Math.round(element1) == 491).toBe(true);
                    element1 = +document.getElementById('container_Series_0_Point_2_Text_1').getAttribute('x');
                    expect(Math.round(element1) == 612 || Math.round(element1) == 615).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.isTransposed = true;
                chartObj.refresh();
            });
            it('Checking inversed & transposed  spline range area series', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0');
                    var bounds = svg.getBoundingClientRect();
                    expect(bounds.top == 50.25 || bounds.top == 53.25).toBe(true);
                    expect(Math.round(bounds.left) == 158 || Math.round(bounds.left) == 155).toBe(true);
                    expect(Math.round(bounds.width) == 594 || Math.round(bounds.width) == 597).toBe(true);
                    expect(bounds.height == 310.25 || bounds.height == 318.25 || bounds.height == 318.75).toBe(true);
                    var element1 = +document.getElementById('container_Series_0_Point_2_Text_0').getAttribute('x');
                    expect(Math.round(element1) == 488 || Math.round(element1) == 491).toBe(true);
                    element1 = +document.getElementById('container_Series_0_Point_2_Text_1').getAttribute('x');
                    expect(Math.round(element1) == 612 || Math.round(element1) == 615).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryYAxis.isInversed = true;
                chartObj.isTransposed = true;
                chartObj.refresh();
            });
            it('Checking spline range area series with Monotonic Splinetype', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('containerSeriesGroup0').childNodes.length;
                    expect(seriesElements == 2).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryYAxis.isInversed = false;
                chartObj.isTransposed = false;
                chartObj.series[0].splineType = 'Monotonic';
                chartObj.refresh();
            });
            it('Checking spline range area series with Cardinal Splinetype', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('containerSeriesGroup0').childNodes.length;
                    expect(seriesElements == 2).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].splineType = 'Cardinal';
                chartObj.refresh();
            });
            it('Checking spline range area series with Clamped Splinetype', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('containerSeriesGroup0').childNodes.length;
                    expect(seriesElements == 2).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].splineType = 'Clamped';
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
