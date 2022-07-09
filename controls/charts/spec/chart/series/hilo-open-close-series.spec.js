define(["require", "exports", "@syncfusion/ej2-base", "../../../src/chart/chart", "../../../src/chart/series/line-series", "../../../src/chart/series/hilo-open-close-series", "../../../src/chart/series/data-label", "../../../src/chart/axis/category-axis", "../../../src/chart/axis/date-time-axis", "../../../src/chart/series/column-series", "../base/events.spec", "../../../src/chart/axis/logarithmic-axis", "../../../src/chart/legend/legend", "../../../src/chart/user-interaction/tooltip", "../../../src/chart/user-interaction/crosshair", "../../../src/chart/user-interaction/selection", "../../common.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, chart_1, line_series_1, hilo_open_close_series_1, data_label_1, category_axis_1, date_time_axis_1, column_series_1, events_spec_1, logarithmic_axis_1, legend_1, tooltip_1, crosshair_1, selection_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(line_series_1.LineSeries, column_series_1.ColumnSeries, data_label_1.DataLabel, category_axis_1.Category, date_time_axis_1.DateTime, legend_1.Legend, hilo_open_close_series_1.HiloOpenCloseSeries, tooltip_1.Tooltip, crosshair_1.Crosshair, logarithmic_axis_1.Logarithmic, selection_1.Selection);
    exports.doubleData = [
        { x: 1, low: -12, high: 0, open: -1.22, close: -8.44 }, { x: 2, low: 12, high: 1, open: 5, close: 9 },
        { x: 3, low: 23, high: 10, open: 13, close: 20.44 }, { x: 4, low: 20, high: 43, open: 33.22, close: 21.44 },
        { x: 5, low: 0, high: 10, open: 5, close: 9 }, { x: 6, low: -22, high: 34, open: 3, close: 22 },
        { x: 7, low: -12, high: 23, open: 12, close: 4 }, { x: 8, low: 12, high: 40, open: 32, close: 15 }
    ];
    exports.doubleData1 = [
        { x: 1, low: 8, high: 20, open: 18, close: 12 }, { x: 2, low: 2, high: 18, open: 15, close: 9 },
        { x: 3, low: 23, high: 10, open: 13, close: 20.44 }, { x: 4, low: 20, high: 43, open: 33.22, close: 21.44 },
    ];
    exports.doubleData2 = [
        { x: 1, low: 80, high: 120, open: 110, close: 90 }, { x: 2, low: 70, high: 95, open: 89, close: 82 },
        { x: 3, low: 55, high: 77, open: 73.22, close: 63.44 }, { x: 4, low: 60, high: 80, open: 77, close: 69 },
    ];
    exports.doubleData3 = [
        { x: 11, low: 8, high: 20, open: 18, close: 12 }, { x: 12, low: 2, high: 18, open: 15, close: 9 },
        { x: 13, low: 23, high: 10, open: 13, close: 20.44 }, { x: 14, low: 20, high: 43, open: 33.22, close: 21.44 },
    ];
    exports.categoryData = [
        { x: 'USA', high: 125.45, low: 70.23, open: 112.22, close: 90.44 },
        { x: 'Austria', high: 150.99, low: 60.23, open: 120.55, close: 70.90 },
        { x: 'Germany', high: 200.19, low: 130.37, open: 160.13, close: 190.78 },
        { x: 'Swedan', high: 160.23, low: 90.16, open: 140.38, close: 110.24 },
        { x: 'France', high: 200.89, low: 100.23, open: 180.90, close: 120.29 },
        { x: 'China', high: 100, low: 45, open: 70, close: 50 },
        { x: 'Japan', high: 150, low: 70, open: 140, close: 130 },
        { x: 'London', high: 90, low: 60, open: 65, close: 80 },
        { x: 'Saudi', high: 225, low: 170, open: 175, close: 220 },
        { x: 'India', high: 250, low: 180, open: 223, close: 190 },
        { x: 'UK', high: 200.12, low: 140.69, open: 160.74, close: 190.28 },
    ];
    var datatime = [
        { x: new Date(2000, 3, 21), high: 200.19, low: 130.37, open: 162.13, close: 178 },
        { x: new Date(2000, 6, 17), high: 163.23, low: 93.16, open: 133, close: 110.24 },
        { x: new Date(2000, 9, 18), high: 204.89, low: 104.23, open: 182.91213750, close: 114.29 },
        { x: new Date(2001, 3, 20), high: 152, low: 67, open: 143, close: 133 },
        { x: new Date(2001, 6, 25), high: 135.45, low: 70.23, open: 109.2234212222, close: 103.44 },
        { x: new Date(2001, 9, 30), high: 200.12, low: 140.69, open: 160.74, close: 180.28 }
    ];
    var logdata = [
        { x: 1, high: 900.19, low: 200.37, open: 762.13, close: 378 },
        { x: 2, high: 1163.23, low: 809.16, open: 1033, close: 909.24 },
        { x: 3, high: 5004.89, low: 2104.23, open: 4182.91213750, close: 2999.29 },
        { x: 4, high: 19152.35, low: 16967, open: 18043, close: 17133 },
    ];
    var lineData = [
        { x: 1, y: 28 }, { x: 2, y: 25 }, { x: 3, y: 26 }, { x: 4, y: 27 },
        { x: 5, y: 32 }, { x: 6, y: 35 }, { x: 7, y: 30 }
    ];
    var prevent = function () {
    };
    describe('Chart Control Series', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        var element;
        var trigger = new events_spec_1.MouseEvents();
        var legendRendering;
        var animationComplete;
        describe('HiloOpenClose Series', function () {
            var chartObj;
            var loaded;
            element = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(element);
                chartObj = new chart_1.Chart({
                    primaryXAxis: {
                        title: 'PrimaryXAxis',
                    },
                    primaryYAxis: {
                        title: 'PrimaryYAxis',
                    },
                    series: [{
                            animation: { enable: false },
                            name: 'HiloOpenClose',
                            type: 'HiloOpenClose', fill: 'rgba(135,206,235,1)',
                        }],
                    width: '800',
                    title: 'Financial Analysis', loaded: loaded,
                    legendSettings: { visible: false, }
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
                chartObj.primaryXAxis = {
                    title: 'Subjects',
                    valueType: 'Category',
                };
                chartObj.primaryYAxis = {
                    title: 'Marks',
                    minimum: 10,
                    maximum: 100,
                    interval: 10
                };
                chartObj.series[0].dataSource = [
                    { x: 'Science', high: 60, low: 20, open: 35, close: 45 },
                ];
                chartObj.series[0].high = 'high';
                chartObj.series[0].low = 'low';
                chartObj.series[0].open = 'open';
                chartObj.series[0].close = 'close';
                chartObj.series[0].xName = 'x';
                chartObj.series[0].marker.dataLabel = { visible: false };
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
                chartObj.primaryYAxis.minimum = 0;
                chartObj.primaryYAxis.maximum = 5000;
                chartObj.primaryYAxis.interval = 1000;
                chartObj.series[0].dataSource = [
                    { x: 'science', high: 3060, low: 220, open: 2335, close: 1945 },
                ];
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
                    expect(seriesElements == 12).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].visible = true;
                chartObj.series[0].dataSource = exports.categoryData;
                chartObj.series[0].xName = 'x';
                chartObj.series[0].open = 'open';
                chartObj.series[0].close = 'close';
                chartObj.series[0].high = 'high';
                chartObj.series[0].low = 'low';
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.primaryYAxis.minimum = -100;
                chartObj.primaryYAxis.maximum = 260;
                chartObj.primaryYAxis.labelFormat = '${value}';
                chartObj.refresh();
            });
            it('checking with datalabel outer position', function (done) {
                loaded = function (args) {
                    var label = document.getElementById('container_Series_0_Point_1_Text_0');
                    expect(label.textContent).toEqual('$150.99');
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = exports.categoryData;
                chartObj.series[0].xName = 'x';
                chartObj.series[0].marker.dataLabel.visible = true;
                chartObj.series[0].marker.dataLabel.position = 'Outer';
                chartObj.refresh();
            });
            it('checking with datalabel auto position', function (done) {
                chartObj.loaded = function (args) {
                    var label = document.getElementById('container_Series_0_Point_2_Text_0');
                    expect(label.textContent).toEqual('$200.19');
                    done();
                };
                chartObj.series[0].marker.dataLabel.position = 'Auto';
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
            it('Checking with Category with default bullFillColor', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('container_Series_0_Point_0');
                    var stroke = seriesElements.getAttribute('stroke');
                    expect(stroke == '#e74c3d').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].animation.enable = false;
                chartObj.refresh();
            });
            it('Checking with category with default bearFillColor', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('container_Series_0_Point_2');
                    var stroke = seriesElements.getAttribute('stroke');
                    expect(stroke == '#2ecd71').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking with category with custom bearFillColor', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('container_Series_0_Point_2');
                    var stroke = seriesElements.getAttribute('stroke');
                    expect(stroke == 'yellow').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].bearFillColor = 'yellow';
                chartObj.refresh();
            });
            it('Checking with category with custom bullFillColor', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('container_Series_0_Point_0');
                    var stroke = seriesElements.getAttribute('stroke');
                    expect(stroke == 'orange').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].bullFillColor = 'orange';
                chartObj.refresh();
            });
            it('checking with tooltip', function (done) {
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_2');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = series.points[1].regions[0].y + parseFloat(chartArea.getAttribute('y')) + element.offsetTop;
                    var x = series.points[1].regions[0].x + parseFloat(chartArea.getAttribute('x')) + element.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    expect(target.getAttribute('opacity') == '1').toBe(true);
                    expect(tooltip.childNodes[0].childNodes[0].childNodes[1].textContent.replace(/\u200E/g, '')).toEqual('HiloOpenCloseAustriaHigh : $150.99Low : $60.23Open : $120.55Close : $70.9');
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
                chartObj.tooltip.format = '${series.name}  <br/> x : ${point.x} <br/> High : ${point.high} <br/> Low : ${point.low} <br/> Open : ${point.open} <br/> Close: ${point.close}';
                chartObj.loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_2');
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
                    done();
                };
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
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.crosshair.enable = true;
                chartObj.series[0].animation.enable = false;
                chartObj.primaryXAxis.crosshairTooltip.enable = true;
                chartObj.primaryYAxis.crosshairTooltip.enable = true;
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
                chartObj.primaryXAxis.labelPlacement = 'OnTicks';
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
                chartObj.primaryXAxis.labelPlacement = 'BetweenTicks';
                chartObj.refresh();
            });
            it('Checking with category axis with plotoffset', function (done) {
                loaded = function (args) {
                    var point = document.getElementById('containerAxisLine_0');
                    expect(point != null).toBe(true);
                    expect(point.getAttribute('d').split(' ')[2] == '393.5' || point.getAttribute('d').split(' ')[2] == '389.5').toBe(true);
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
                    var point = document.getElementById('container_Series_0_Point_0');
                    var axisLabel = document.getElementById('container0_AxisLabel_0');
                    expect(axisLabel.textContent == 'May').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'DateTime';
                chartObj.series[0].dataSource = datatime;
                chartObj.primaryYAxis.minimum = 0;
                chartObj.primaryYAxis.maximum = 1000;
                chartObj.series[0].xName = 'x';
                chartObj.series[0].open = 'open';
                chartObj.series[0].close = 'close';
                chartObj.series[0].high = 'high';
                chartObj.series[0].low = 'low';
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
                    var point = document.getElementById('container_Series_0_Point_0');
                    var axisLabel = document.getElementById('container1_AxisLabel_3');
                    expect(axisLabel.textContent == '$512').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryYAxis.valueType = 'Logarithmic';
                chartObj.primaryYAxis.logBase = 8;
                chartObj.primaryXAxis.rangePadding = 'None';
                chartObj.primaryYAxis.minimum = 0;
                chartObj.primaryYAxis.maximum = 20000;
                chartObj.series[0].dataSource = logdata;
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.series[0].xName = 'x';
                chartObj.series[0].open = 'open';
                chartObj.series[0].close = 'close';
                chartObj.series[0].high = 'high';
                chartObj.series[0].low = 'low';
                chartObj.primaryXAxis.labelPlacement = 'BetweenTicks';
                chartObj.refresh();
            });
            it('with empty point(x Value)', function (done) {
                loaded = function (args) {
                    var point = document.getElementById('containerSeriesGroup0');
                    expect(point.childElementCount == 4).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource[0].x = null;
                chartObj.refresh();
            });
            it('Checking with category(high and low) null points', function (done) {
                loaded = function (args) {
                    var point = document.getElementById('containerSeriesGroup0');
                    expect(point.childElementCount == 3).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].visible = true;
                chartObj.series[0].dataSource[1].high = null;
                chartObj.series[0].dataSource[1].low = null;
                chartObj.refresh();
            });
            it('Checking with category (open and close) null points', function (done) {
                loaded = function (args) {
                    var point = document.getElementById('container_Series_0_Point_0');
                    expect(point == null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource[2].open = null;
                chartObj.series[0].dataSource[2].close = null;
                chartObj.refresh();
            });
            it('with dash array', function (done) {
                loaded = function (args) {
                    var seriesElements = document.getElementById('container_Series_0_Point_2');
                    var stroke = seriesElements.getAttribute('stroke-dasharray');
                    expect(stroke == '4,3').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dashArray = '4,3';
                chartObj.series[0].visible = true;
                chartObj.refresh();
            });
            it('checking with multiple series', function (done) {
                chartObj.loaded = loaded;
                loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_0');
                    var element1 = document.getElementById('container_Series_1_Point_0');
                    expect(element.getAttribute('d') != '').toBe(true);
                    expect(element1.getAttribute('d') != '').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.primaryYAxis.valueType = 'Double';
                chartObj.primaryXAxis.minimum = 0;
                chartObj.primaryXAxis.maximum = 20;
                chartObj.primaryYAxis.minimum = -30;
                chartObj.primaryYAxis.maximum = 100;
                chartObj.series = [
                    {
                        dataSource: exports.doubleData, xName: 'x', high: 'high', low: 'low', open: 'open', close: 'close',
                        name: 'series1', type: 'HiloOpenClose', animation: { enable: false }
                    },
                    {
                        dataSource: exports.doubleData, xName: 'x', high: 'high', low: 'low', open: 'open', close: 'close',
                        name: 'series2', type: 'HiloOpenClose', animation: { enable: false }
                    }
                ];
                chartObj.refresh();
            });
            it('Single point selection', function (done) {
                loaded = function () {
                    var element = document.getElementById('container_Series_0_Point_5');
                    trigger.clickEvent(element);
                    var selected = document.getElementsByClassName('container_ej2_chart_selection_series_0');
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
                    var element = document.getElementById('container_Series_0_Point_5');
                    trigger.clickEvent(element);
                    var selected = document.getElementsByClassName('container_ej2_chart_selection_series_0 ');
                    expect(element).toBe(selected[0]);
                    element = document.getElementById('container_Series_0_Point_3');
                    trigger.clickEvent(element);
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
                    var element = document.getElementById('container_Series_0_Point_5');
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
                    var element = document.getElementById('container_Series_0_Point_5');
                    var element1 = document.getElementById('container_Series_1_Point_5');
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
            it('Checking with low value higher than high value', function (done) {
                loaded = function (args) {
                    var point = document.getElementById('container_Series_0_Point_0');
                    expect(point != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource[0].high = 44;
                chartObj.series[0].dataSource[0].low = 29;
                chartObj.series[0].dataSource[0].open = 40;
                chartObj.series[0].dataSource[0].close = 32;
                chartObj.refresh();
            });
            it('Checking with low value higher equal to high value', function (done) {
                loaded = function (args) {
                    var point = document.getElementById('container_Series_0_Point_0');
                    expect(point != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource[0].high = 44;
                chartObj.series[0].dataSource[0].low = 44;
                chartObj.series[0].dataSource[0].open = 44;
                chartObj.series[0].dataSource[0].close = 44;
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
                chartObj.series[0].type = 'HiloOpenClose';
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
                chartObj.series[0].type = 'HiloOpenClose';
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
                    expect(legendElement.getAttribute('y') === '46.25' || legendElement.getAttribute('y') === '43.25').toBe(true);
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
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.legendSettings.alignment = 'Near';
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
                    var svg = document.getElementById('containerAxisLine_1');
                    expect(svg.getAttribute('d').split(' ')[2] == '234.375' || svg.getAttribute('d').split(' ')[2] == '234.125').toBe(true);
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
                        dataSource: exports.doubleData1, xName: 'x', high: 'high', low: 'low', open: 'open', close: 'close',
                        name: 'series1', type: 'HiloOpenClose', animation: { enable: false }
                    },
                    {
                        dataSource: exports.doubleData2, xName: 'x', high: 'high', low: 'low', open: 'open', close: 'close',
                        name: 'series2', type: 'HiloOpenClose', animation: { enable: false }, yAxisName: 'yAxis1',
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
            it('Checking with category axis with multiple panes- column', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_AxisBottom_Column0');
                    expect(svg.getAttribute('x1') == '59.5' || svg.getAttribute('x1') == '63.5').toBe(true);
                    expect(svg.getAttribute('stroke') == 'red').toBe(true);
                    svg = document.getElementById('container_AxisBottom_Column1');
                    expect(svg.getAttribute('x1') == '459.5' || svg.getAttribute('x1') == '463.5').toBe(true);
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
                        dataSource: exports.doubleData1, xName: 'x', high: 'high', low: 'low', open: 'open', close: 'close',
                        name: 'series1', type: 'HiloOpenClose', animation: { enable: false }
                    },
                    {
                        dataSource: exports.doubleData3, xName: 'x', high: 'high', low: 'low', open: 'open', close: 'close',
                        name: 'series2', type: 'HiloOpenClose', animation: { enable: false }, xAxisName: 'xAxis',
                    }
                ];
                chartObj.axes[0].columnIndex = 1;
                chartObj.axes[0].name = 'xAxis';
                chartObj.axes[0].minimum = 11;
                chartObj.axes[0].maximum = 20;
                chartObj.axes[0].interval = 1;
                chartObj.axes[0].title = 'Axis2';
                chartObj.primaryYAxis.minimum = 0;
                chartObj.primaryYAxis.maximum = 50;
                chartObj.refresh();
            });
            it('Point Rendering Event', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_1');
                    expect(element.getAttribute('fill')).toBe('#e74c3d');
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.pointRender = function (args) {
                    if (args.point.index === 0) {
                        args.fill = 'red';
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
            it('checking with log axis with dataTime axis', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    var axisLabelLast = document.getElementById('container0_AxisLabel_4');
                    expect(axisLabelLast.textContent == '27').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.minimum = null;
                chartObj.primaryXAxis.maximum = null;
                chartObj.primaryXAxis.valueType = 'DateTime';
                chartObj.primaryYAxis.valueType = 'Logarithmic';
                chartObj.primaryYAxis.minimum = 0;
                chartObj.primaryYAxis.maximum = 50000;
                chartObj.series = [
                    {
                        type: 'HiloOpenClose', name: 'Series1', xName: 'x', low: 'low', high: 'high', open: 'open', close: 'close',
                        dataSource: [
                            { x: new Date(1, 0, 2000), low: 100, high: 900, open: 725.22, close: 190.44 },
                            { x: new Date(1, 0, 2001), low: 1020, high: 2000, open: 1725.22, close: 1290.44 },
                            { x: new Date(1, 0, 2002), low: 3032, high: 6233, open: 5125.22, close: 3330.44 },
                            { x: new Date(1, 0, 2003), low: 5002, high: 10003, open: 8025.22, close: 6990.44 },
                            { x: new Date(1, 0, 2004), low: 5000, high: 15342, open: 11125.22, close: 7890.44 }
                        ],
                    }
                ];
                chartObj.refresh();
            });
            it('checking with multiple different series ', function (done) {
                chartObj.loaded = loaded;
                loaded = function (args) {
                    chartObj.loaded = null;
                    var series0 = chartObj.series[0];
                    var series1 = chartObj.series[1];
                    expect(series0.type === 'HiloOpenClose' || series1.type === 'Line').toBe(true);
                    done();
                };
                chartObj.primaryXAxis.minimum = 0;
                chartObj.primaryXAxis.maximum = 20;
                chartObj.primaryXAxis.interval = 1;
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.primaryYAxis.valueType = 'Double';
                chartObj.primaryYAxis.minimum = -30;
                chartObj.primaryYAxis.maximum = 70;
                chartObj.primaryYAxis.interval = 5;
                chartObj.loaded = loaded;
                chartObj.series = [
                    {
                        dataSource: exports.doubleData, xName: 'x', high: 'high', low: 'low', open: 'open', close: 'close',
                        name: 'series1', type: 'HiloOpenClose', animation: { enable: false }
                    },
                    {
                        dataSource: lineData, width: 2,
                        xName: 'x', yName: 'y',
                        name: 'India',
                        type: 'Line'
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
                            dataSource: exports.doubleData, xName: 'x', low: 'low', high: 'high', open: 'open', close: 'close', animation: { enable: false }, type: 'HiloOpenClose',
                            name: 'ChartSeriesNameGold', fill: 'green',
                            xAxisName: 'xAxis1', yAxisName: 'yAxis1'
                        },
                        {
                            dataSource: exports.doubleData, xName: 'x', yName: 'low', animation: { enable: false }, type: 'Line',
                            name: 'ChartSeriesNameGold', fill: 'red',
                            xAxisName: 'xAxis1', yAxisName: 'yAxis1'
                        },
                        {
                            dataSource: exports.doubleData, xName: 'x', low: 'low', high: 'high', open: 'open', close: 'close', animation: { enable: false }, type: 'HiloOpenClose',
                            name: 'ChartSeriesNameGold1', fill: 'black',
                            xAxisName: 'xAxis1', yAxisName: 'yAxis1'
                        },
                        {
                            dataSource: exports.doubleData, xName: 'x', low: 'low', high: 'high', open: 'open', close: 'close', animation: { enable: false }, type: 'HiloOpenClose',
                            name: 'ChartSeriesNameDiamond', fill: 'blue',
                            xAxisName: 'xAxis2', yAxisName: 'yAxis2'
                        },
                        {
                            dataSource: exports.doubleData, xName: 'x', low: 'low', high: 'high', open: 'open', close: 'close', animation: { enable: false }, type: 'HiloOpenClose',
                            name: 'ChartSeriesNameSilver', fill: 'green',
                            xAxisName: 'xAxis5', yAxisName: 'yAxis3',
                        },
                        {
                            dataSource: exports.doubleData, xName: 'x', low: 'low', high: 'high', open: 'open', close: 'close', animation: { enable: false },
                            type: 'HiloOpenClose',
                            name: 'ChartSeriesNameRuby', fill: 'red',
                            xAxisName: 'xAxis6', yAxisName: 'yAxis4',
                        },
                        {
                            dataSource: exports.doubleData, xName: 'x', low: 'low', high: 'high', open: 'open', close: 'close', animation: { enable: false }, type: 'HiloOpenClose',
                            name: 'ChartSeriesNamePlatinum', fill: 'rgba(135,000,235,1)',
                            xAxisName: 'xAxis3', yAxisName: 'yAxis5',
                        },
                        {
                            dataSource: exports.doubleData, xName: 'x', low: 'low', high: 'high', open: 'open', close: 'close', animation: { enable: false }, type: 'HiloOpenClose',
                            name: 'ChartSeriesNameEmerald', fill: 'purple',
                            xAxisName: 'xAxis4', yAxisName: 'yAxis6',
                        },
                        {
                            dataSource: exports.doubleData, xName: 'x', low: 'low', high: 'high', open: 'open', close: 'close', animation: { enable: false }, type: 'HiloOpenClose',
                            name: 'ChartSeriesNamePearl', fill: 'violet',
                            xAxisName: 'xAxis7', yAxisName: 'yAxis7'
                        },
                        {
                            dataSource: exports.doubleData, xName: 'x', low: 'low', high: 'high', open: 'open', close: 'close', animation: { enable: false },
                            type: 'HiloOpenClose',
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
            it('checking with Multiple Series', function (done) {
                loaded = function (args) {
                    var series0 = chartObj.series[0];
                    var series1 = chartObj.series[1];
                    expect(series0.type === 'HiloOpenClose' || series1.type === 'Column').toBe(true);
                    done();
                };
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.primaryYAxis.valueType = 'Double';
                chartObj.series = [
                    {
                        dataSource: exports.doubleData, xName: 'x', low: 'low', high: 'high', open: 'open', close: 'close',
                        name: 'series1', type: 'HiloOpenClose', animation: { enable: false }
                    },
                    {
                        dataSource: exports.doubleData, xName: 'x', low: 'low', high: 'high', open: 'open', close: 'close',
                        name: 'series2', type: 'Column', animation: { enable: false }
                    }
                ];
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
                    expect(chartObj.primaryYAxis.zoomPosition.toFixed(2) == '0.00' ||
                        chartObj.primaryYAxis.zoomPosition.toFixed(2) == '0.08').toBe(true);
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
                    expect(content == '0.33' || content == '0.30' || content == '0.31').toBe(true);
                    content = chartObj.primaryYAxis.zoomFactor.toFixed(2);
                    expect(content == '1.00' || content == '0.77' || content === '0.79').toBe(true);
                    content = chartObj.primaryXAxis.zoomPosition.toFixed(2);
                    expect(content == '0.72' || content == '0.69' || content == '0.70').toBe(true);
                    chartObj.mouseLeave(trigger.onTouchLeave(areaElement, 748, 129, 304, 289, 304, 289));
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.zoomSettings.enablePinchZooming = true;
                chartObj.dataBind();
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
