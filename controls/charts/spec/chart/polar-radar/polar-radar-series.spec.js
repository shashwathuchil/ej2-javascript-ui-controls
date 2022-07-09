define(["require", "exports", "@syncfusion/ej2-base", "../../../src/chart/chart", "../../../src/common/utils/helper", "../../../src/chart/series/data-label", "../../../src/chart/series/polar-series", "../../../src/chart/series/radar-series", "../../../src/chart/series/spline-area-series", "../../../src/chart/series/line-series", "../../../src/chart/series/range-column-series", "../../../src/chart/series/area-series", "../../../src/chart/series/stacking-area-series", "../../../src/chart/series/scatter-series", "../../../src/chart/axis/date-time-axis", "../../../src/chart/axis/logarithmic-axis", "../../../src/chart/axis/category-axis", "../../../src/chart/user-interaction/selection", "../../../src/chart/series/spline-series", "../../../src/chart/legend/legend", "../../../src/chart/user-interaction/tooltip", "../base/events.spec", "../base/data.spec", "../../common.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, chart_1, helper_1, data_label_1, polar_series_1, radar_series_1, spline_area_series_1, line_series_1, range_column_series_1, area_series_1, stacking_area_series_1, scatter_series_1, date_time_axis_1, logarithmic_axis_1, category_axis_1, selection_1, spline_series_1, legend_1, tooltip_1, events_spec_1, data_spec_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(date_time_axis_1.DateTime, spline_area_series_1.SplineAreaSeries, scatter_series_1.ScatterSeries, stacking_area_series_1.StackingAreaSeries, selection_1.Selection, range_column_series_1.RangeColumnSeries, line_series_1.LineSeries, category_axis_1.Category, tooltip_1.Tooltip, area_series_1.AreaSeries, logarithmic_axis_1.Logarithmic, polar_series_1.PolarSeries, radar_series_1.RadarSeries, data_label_1.DataLabel, legend_1.Legend, spline_series_1.SplineSeries);
    var data = data_spec_1.tool1;
    var data2 = data_spec_1.tool2;
    var datetime = data_spec_1.datetimeData;
    exports.categoryData = [{ x: 'USA', y: 50 }, { x: 'China', y: 40 },
        { x: 'Japan', y: 70 }, { x: 'Australia', y: 60 },
        { x: 'France', y: 50 }, { x: 'Germany', y: null },
        { x: 'Italy', y: 40 }, { x: 'Sweden', y: 30 }];
    exports.categoryData1 = [
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
    describe('Chart Control', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        var ele;
        var elem;
        var svg;
        var trigger = new events_spec_1.MouseEvents();
        var text;
        var loaded;
        var animationComplete;
        describe('Polar-Radar series', function () {
            var chartObj;
            beforeAll(function () {
                elem = ej2_base_1.createElement('div', { id: 'chartContainer' });
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    series: [{
                            dataSource: data_spec_1.tool1, xName: 'x', yName: 'y', type: 'Polar', drawType: 'Line',
                        }],
                    legendSettings: { visible: true, position: 'Right' }
                });
                chartObj.appendTo('#chartContainer');
            });
            afterAll(function () {
                chartObj.destroy();
                elem.remove();
            });
            it('Checking with line series marker for polar', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_0_Symbol');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.visible = true;
                chartObj.refresh();
            });
            it('touch Tooltip', function (done) {
                loaded = function (args) {
                    var rect = args.chart.element.getBoundingClientRect();
                    var target = helper_1.getElement('chartContainer_Series_0_Point_1_Symbol');
                    var series = chartObj.series[0];
                    var y = series.points[1].regions[0].y + rect.top;
                    var x = series.points[1].regions[0].x + rect.left;
                    chartObj.isTouch = true;
                    chartObj.mouseEnd(trigger.onTouchEnd(target, 0, 0, 150, 150, x, y));
                    var tooltip = document.getElementById('chartContainer_tooltip');
                    expect(tooltip !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.tooltip.enable = true;
                chartObj.legendSettings.visible = false;
                chartObj.refresh();
            });
            it('default Tooltip', function (done) {
                chartObj.loaded = null;
                var rect = chartObj.element.getBoundingClientRect();
                var target = document.getElementById('chartContainer_Series_0_Point_2_Symbol');
                var series = chartObj.series[0];
                var y = series.points[2].regions[0].y + rect.top;
                var x = series.points[2].regions[0].x + rect.left;
                trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                var tooltip = document.getElementById('chartContainer_tooltip');
                expect(tooltip !== null).toBe(true);
                target = document.getElementById('chartContainer_Series_0_Point_3_Symbol');
                series = chartObj.series[0];
                y = series.points[2].regions[0].y + rect.top;
                x = series.points[2].regions[0].x + rect.left;
                trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                tooltip = document.getElementById('chartContainer_tooltip');
                expect(tooltip !== null).toBe(true);
                done();
            });
            it('Shared Tooltip', function (done) {
                loaded = function (args) {
                    var rect = args.chart.element.getBoundingClientRect();
                    var target = document.getElementById('chartContainer_Series_0_Point_0_Symbol');
                    var series = chartObj.series[0];
                    var y = series.points[0].regions[0].y + rect.top;
                    var x = series.points[0].regions[0].x + rect.left;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('chartContainer_tooltip');
                    expect(tooltip !== null).toBe(true);
                    var element = document.getElementById('chartContainer_tooltip_path');
                    expect(element.getAttribute('d') !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.tooltip.shared = true;
                chartObj.refresh();
            });
            it('Checking with line series marker for radar', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_0_Symbol');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.visible = true;
                chartObj.series[0].type = 'Radar';
                chartObj.tooltip.shared = false;
                chartObj.refresh();
            });
            it('Checking line series datalabel', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_2_Text_0');
                    expect(ele.textContent === '70').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.visible = true;
                chartObj.series[0].type = 'Polar';
                chartObj.refresh();
            });
            it('Checking line series with category axis', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = exports.categoryData;
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.refresh();
            });
            it('Checking line series with null points', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_5_Symbol');
                    expect(ele === null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking line series with null points and emptypointmode as drop', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0');
                    expect(ele.getAttribute('d').indexOf('M') === 0).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].emptyPointSettings.mode = 'Drop';
                chartObj.refresh();
            });
            it('Checking line series with log axis', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryYAxis.valueType = 'Logarithmic';
                chartObj.refresh();
            });
            it('Checking line series with datetime axis', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'DateTime';
                chartObj.series[0].dataSource = data_spec_1.datetimeData;
                chartObj.refresh();
            });
            it('Checking line series with negative points', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0');
                    expect(ele !== null).toBe(true);
                    ele = document.getElementById('chartContainer_Series_0_Point_1_Symbol');
                    var Positivelabel = document.getElementById('chartContainer1_AxisLabel_3');
                    expect(ele.getAttribute('cy') > Positivelabel.getAttribute('y')).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.primaryYAxis.valueType = 'Double';
                chartObj.series[0].dataSource = data_spec_1.negativeDataPoint;
                chartObj.refresh();
            });
            it('Checking line series with isClosed false', function (done) {
                loaded = function (args) {
                    document.getElementById('chartContainer_Series_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].isClosed = false;
                chartObj.refresh();
            });
            it('Checking line series with single point', function (done) {
                loaded = function (args) {
                    document.getElementById('chartContainer_Series_0_Point_0_Symbol');
                    expect(ele !== null).toBe(true);
                    var series = args.chart.series[0];
                    expect(series.points.length === 1).toBe(true);
                    done();
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = [{ x: 1, y: 5 }];
                chartObj.refresh();
            });
            it('Checking with spline series marker for polar', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_0_Symbol');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = data_spec_1.tool1;
                chartObj.series[0].drawType = 'Spline';
                chartObj.series[0].marker.visible = true;
                chartObj.refresh();
            });
            it('default spline Tooltip', function (done) {
                loaded = function (args) {
                    var rect = args.chart.element.getBoundingClientRect();
                    var target = document.getElementById('chartContainer_Series_0_Point_2_Symbol');
                    var series = chartObj.series[0];
                    var y = series.points[2].regions[0].y + rect.top;
                    var x = series.points[2].regions[0].x + rect.left;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('chartContainer_tooltip');
                    expect(tooltip !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.tooltip.enable = true;
                chartObj.legendSettings.visible = false;
                chartObj.refresh();
            });
            it('Shared spline Tooltip', function (done) {
                loaded = function (args) {
                    var rect = args.chart.element.getBoundingClientRect();
                    var target = document.getElementById('chartContainer_Series_0_Point_0_Symbol');
                    var series = chartObj.series[0];
                    var y = series.points[0].regions[0].y + rect.top;
                    var x = series.points[0].regions[0].x + rect.left;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('chartContainer_tooltip');
                    expect(tooltip !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.tooltip.shared = true;
                chartObj.refresh();
            });
            it('Checking with spline series marker for radar', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_0_Symbol');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.visible = true;
                chartObj.series[0].type = 'Radar';
                chartObj.tooltip.shared = false;
                chartObj.refresh();
            });
            it('Checking spline series datalabel', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_2_Text_0');
                    expect(ele.textContent === '70').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.visible = true;
                chartObj.series[0].type = 'Polar';
                chartObj.refresh();
            });
            it('Checking spline series with category axis', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = exports.categoryData;
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.refresh();
            });
            it('Checking spline series with null points', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_5_Symbol');
                    expect(ele === null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].emptyPointSettings.mode = 'Gap';
                chartObj.refresh();
            });
            it('Checking spline series with null points and emptypointmode as drop', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0');
                    expect(ele.getAttribute('d').indexOf('M') === 0).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].emptyPointSettings.mode = 'Drop';
                chartObj.refresh();
            });
            it('Checking spline series with log axis', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryYAxis.valueType = 'Logarithmic';
                chartObj.refresh();
            });
            it('Checking spline series with datetime axis', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'DateTime';
                chartObj.series[0].dataSource = data_spec_1.datetimeData;
                chartObj.refresh();
            });
            it('Checking spline series with negative points', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0');
                    expect(ele !== null).toBe(true);
                    ele = document.getElementById('chartContainer_Series_0_Point_1_Symbol');
                    var Positivelabel = document.getElementById('chartContainer1_AxisLabel_3');
                    expect(ele.getAttribute('cy') > Positivelabel.getAttribute('y')).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.primaryYAxis.valueType = 'Double';
                chartObj.series[0].dataSource = data_spec_1.negativeDataPoint;
                chartObj.refresh();
            });
            it('Checking spline series with cartesian area type', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'Line';
                chartObj.refresh();
            });
            it('Checking spline series with single point', function (done) {
                loaded = function (args) {
                    document.getElementById('chartContainer_Series_0_Point_0_Symbol');
                    expect(ele !== null).toBe(true);
                    var series = args.chart.series[0];
                    expect(series.points.length === 1).toBe(true);
                    done();
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'Polar';
                chartObj.series[0].dataSource = [{ x: 1, y: 5 }];
                chartObj.refresh();
            });
            it('Checking with area series rendering', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0');
                    expect(ele !== null).toBe(true);
                    ele = document.getElementById('chartContainer_Series_0_Point_2_Symbol');
                    expect(ele !== null).toBe(true);
                    ele = document.getElementById('chartContainer_Series_0_Point_2_Text_0');
                    expect(ele.textContent === '70').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = data_spec_1.tool1;
                chartObj.series[0].drawType = 'Area';
                chartObj.refresh();
            });
            it('Checking with area as draw type', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0');
                    expect(ele.getAttribute('d').indexOf('Z') > 0).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = data_spec_1.tool1;
                chartObj.series[0].drawType = 'Area';
                chartObj.refresh();
            });
            it('Checking area series with category axis', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.series[0].dataSource = exports.categoryData;
                chartObj.refresh();
            });
            it('Checking area series with category axis and onticks placement', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer0_AxisLabel_1');
                    expect(ele.textContent === 'China').toBe(true);
                    ele = document.getElementById('chartContainer_Series_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.labelPlacement = 'OnTicks';
                chartObj.refresh();
            });
            it('Checking area series with null', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_5_Symbol');
                    expect(ele === null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking area series with log axis', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryYAxis.valueType = 'Logarithmic';
                chartObj.refresh();
            });
            it('Checking area series with datetime axis', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'DateTime';
                chartObj.series[0].dataSource = data_spec_1.datetimeData;
                chartObj.refresh();
            });
            it('Checking area series with negative point', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0');
                    expect(ele !== null).toBe(true);
                    ele = document.getElementById('chartContainer_Series_0_Point_1_Symbol');
                    var Positivelabel = document.getElementById('chartContainer1_AxisLabel_3');
                    expect(ele.getAttribute('cy') > Positivelabel.getAttribute('y')).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.primaryYAxis.valueType = 'Double';
                chartObj.series[0].dataSource = data_spec_1.negativeDataPoint;
                chartObj.refresh();
            });
            it('Checking area series with single point', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_0_Symbol');
                    expect(ele !== null).toBe(true);
                    var series = args.chart.series[0];
                    expect(series.points.length === 1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = [{ x: 1, y: 4 }];
                chartObj.refresh();
            });
            it('Checking with stacking area series rendering', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0');
                    expect(ele !== null).toBe(true);
                    ele = document.getElementById('chartContainer_Series_0_Point_2_Symbol');
                    expect(ele !== null).toBe(true);
                    ele = document.getElementById('chartContainer_Series_0_Point_2_Text_0');
                    expect(ele.textContent === '70').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = data_spec_1.tool1;
                chartObj.series[0].drawType = 'StackingArea';
                chartObj.refresh();
            });
            it('Checking stacking area series with category axis', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.series[0].dataSource = exports.categoryData;
                chartObj.refresh();
            });
            it('Checking stacking area series with category axis and onticks placement', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer0_AxisLabel_1');
                    expect(ele.textContent === 'China').toBe(true);
                    ele = document.getElementById('chartContainer_Series_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.labelPlacement = 'OnTicks';
                chartObj.refresh();
            });
            it('Checking stacking area series with null', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_5_Symbol');
                    expect(ele === null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking stacking area series with log axis', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryYAxis.valueType = 'Logarithmic';
                chartObj.refresh();
            });
            it('Checking stacking area series with datetime axis', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'DateTime';
                chartObj.series[0].dataSource = data_spec_1.datetimeData;
                chartObj.refresh();
            });
            it('Checking stacking area series with negative point', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0');
                    expect(ele !== null).toBe(true);
                    ele = document.getElementById('chartContainer_Series_0_Point_1_Symbol');
                    var Positivelabel = document.getElementById('chartContainer1_AxisLabel_3');
                    expect(ele.getAttribute('cy') > Positivelabel.getAttribute('y')).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.primaryYAxis.valueType = 'Double';
                chartObj.series[0].dataSource = data_spec_1.negativeDataPoint;
                chartObj.refresh();
            });
            it('Checking stacking area series with single point', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_0_Symbol');
                    expect(ele !== null).toBe(true);
                    var series = args.chart.series[0];
                    expect(series.points.length === 1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = [{ x: 1, y: 4 }];
                chartObj.refresh();
            });
            it('Checking with scatter series rendering', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].drawType = 'Scatter';
                chartObj.series[0].marker.visible = false;
                chartObj.series[0].dataSource = data_spec_1.tool1;
                chartObj.refresh();
            });
            it('Checking with scatter series marker width height', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.height = 20;
                chartObj.series[0].marker.width = 20;
                chartObj.refresh();
            });
            it('Checking scatter series datalabel', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_2');
                    expect(ele !== null).toBe(true);
                    ele = document.getElementById('chartContainer_Series_0_Point_2_Text_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.visible = true;
                chartObj.refresh();
            });
            it('Checking scatter series with category axis', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = exports.categoryData;
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.refresh();
            });
            it('Checking scatter series with category axis on Ticks', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer0_AxisLabel_1');
                    expect(ele.textContent === 'China').toBe(true);
                    ele = document.getElementById('chartContainer_Series_0_Point_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.labelPlacement = 'OnTicks';
                chartObj.refresh();
            });
            it('Checking scatter series with null', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_5_Symbol');
                    expect(ele === null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking scatter series with log axis', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryYAxis.valueType = 'Logarithmic';
                chartObj.refresh();
            });
            it('Checking scatter series with datetime axis', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'DateTime';
                chartObj.series[0].dataSource = data_spec_1.datetimeData;
                chartObj.primaryYAxis.valueType = 'Double';
                chartObj.refresh();
            });
            it('Checking scatter series with negative point', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_0');
                    expect(ele !== null).toBe(true);
                    ele = document.getElementById('chartContainer_Series_0_Point_1_Text_0');
                    var Positivelabel = document.getElementById('chartContainer1_AxisLabel_3');
                    expect(ele.getAttribute('y') > Positivelabel.getAttribute('y')).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.primaryYAxis.valueType = 'Double';
                chartObj.series[0].dataSource = data_spec_1.negativeDataPoint;
                chartObj.refresh();
            });
            it('Checking scatter series with single point', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_0');
                    expect(ele !== null).toBe(true);
                    var series = args.chart.series[0];
                    expect(series.points.length === 1).toBe(true);
                    done();
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = [{ x: 1, y: 5 }];
                chartObj.refresh();
            });
            it('Checking with column series rendering', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = data_spec_1.tool1;
                chartObj.series[0].drawType = 'Column';
                chartObj.refresh();
            });
            it('default Tooltip for column', function (done) {
                loaded = function (args) {
                    var target = document.getElementById('chartContainer_Series_0_Point_6');
                    var rect = args.chart.element.getBoundingClientRect();
                    var series = chartObj.series[0];
                    var y = series.points[6].symbolLocations[0].y + rect.top;
                    var x = series.points[6].symbolLocations[0].x + rect.left;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('chartContainer_tooltip');
                    expect(tooltip !== null).toBe(true);
                    expect(target.getAttribute('opacity') === '0.5').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.tooltip.enable = true;
                chartObj.refresh();
            });
            it('Checking with column series rendering for radar', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = data_spec_1.tool1;
                chartObj.series[0].type = 'Radar';
                chartObj.refresh();
            });
            it('Checking column series with category axis', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = exports.categoryData;
                chartObj.series[0].type = 'Polar';
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.primaryXAxis.labelPlacement = 'BetweenTicks';
                chartObj.refresh();
            });
            it('Checking column series with category axis on Ticks', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.labelPlacement = 'OnTicks';
                chartObj.refresh();
            });
            it('Checking column series with null point', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking column series with log axis', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryYAxis.valueType = 'Logarithmic';
                chartObj.refresh();
            });
            it('Checking column series with datetime axis', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'DateTime';
                chartObj.series[0].dataSource = data_spec_1.datetimeData;
                chartObj.refresh();
            });
            it('Checking column series with negative point', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_0');
                    expect(ele !== null).toBe(true);
                    ele = document.getElementById('chartContainer_Series_0_Point_1_Text_0');
                    var Positivelabel = document.getElementById('chartContainer1_AxisLabel_3');
                    expect(ele.getAttribute('y') > Positivelabel.getAttribute('y')).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.primaryYAxis.valueType = 'Double';
                chartObj.series[0].dataSource = data_spec_1.negativeDataPoint;
                chartObj.refresh();
            });
            it('Checking datalabel for column outer', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_0');
                    expect(ele !== null).toBe(true);
                    ele = document.getElementById('chartContainer_Series_0_Point_1_Text_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Outer';
                chartObj.refresh();
            });
            it('Checking datalabel for column Top', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_0');
                    expect(ele !== null).toBe(true);
                    ele = document.getElementById('chartContainer_Series_0_Point_1_Text_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Top';
                chartObj.refresh();
            });
            it('Checking datalabel for column Bottom', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_1');
                    expect(ele !== null).toBe(true);
                    ele = document.getElementById('chartContainer_Series_0_Point_1_Text_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Bottom';
                chartObj.refresh();
            });
            it('Checking datalabel for column Middle', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_0');
                    expect(ele !== null).toBe(true);
                    ele = document.getElementById('chartContainer_Series_0_Point_1_Text_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Middle';
                chartObj.refresh();
            });
            it('Checking datalabel for column Auto', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_0');
                    expect(ele !== null).toBe(true);
                    ele = document.getElementById('chartContainer_Series_0_Point_1_Text_0');
                    expect(ele === null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Auto';
                chartObj.primaryYAxis.rangePadding = 'None';
                chartObj.primaryYAxis.minimum = 0;
                chartObj.primaryYAxis.maximum = 70;
                chartObj.refresh();
            });
            it('Checking datalabel and marker', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_0_Symbol');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.visible = true;
                chartObj.refresh();
            });
            it('Checking column series with single point', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_0');
                    expect(ele !== null).toBe(true);
                    var series = args.chart.series[0];
                    expect(series.points.length === 1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryYAxis.rangePadding = 'Normal';
                chartObj.series[0].marker.visible = false;
                chartObj.primaryYAxis.minimum = null;
                chartObj.primaryYAxis.maximum = null;
                chartObj.series[0].dataSource = [{ x: 1, y: 5 }];
                chartObj.refresh();
            });
            it('Checking datalabel with axis interval', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_1_Text_0');
                    expect(ele.getAttribute('x') === '452.8484644601701' || ele.getAttribute('x') === '575.34846446017'
                        || ele.getAttribute('x') === '696.9949110695768' || ele.getAttribute('x') === '458.70201785076335'
                        || ele.getAttribute('x') === '711.84846446017' || ele.getAttribute('x') === '464.20201785076335').toBe(true);
                    expect(ele.getAttribute('y') === '155.02653553982995' || ele.getAttribute('y') === '155.02653553982995'
                        || ele.getAttribute('y') === '155.3800889304232' || ele.getAttribute('y') === '153.92298214923667').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.series[0].dataSource = exports.categoryData;
                chartObj.primaryXAxis.interval = 2;
                chartObj.refresh();
            });
            it('Checking with rangecolumn series rendering', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.primaryXAxis.interval = null;
                chartObj.series[0].dataSource = exports.doubleData;
                chartObj.series[0].drawType = 'RangeColumn';
                chartObj.series[0].low = 'low';
                chartObj.series[0].high = 'high';
                chartObj.refresh();
            });
            it('default Tooltip for rangecolumn', function (done) {
                loaded = function (args) {
                    var target = document.getElementById('chartContainer_Series_0_Point_4');
                    var series = chartObj.series[0];
                    var y = series.points[4].symbolLocations[0].y;
                    var x = series.points[4].symbolLocations[0].x;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('chartContainer_tooltip');
                    expect(tooltip !== null).toBe(true);
                    expect(target.getAttribute('opacity') === '0.5').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.tooltip.enable = true;
                chartObj.refresh();
            });
            it('Checking with rangecolumn series rendering for radar', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'Radar';
                chartObj.refresh();
            });
            it('Checking rangecolumn series with category axis', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = exports.categoryData1;
                chartObj.series[0].type = 'Polar';
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.primaryXAxis.labelPlacement = 'BetweenTicks';
                chartObj.refresh();
            });
            it('Checking rangecolumn series with category axis on Ticks', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.labelPlacement = 'OnTicks';
                chartObj.refresh();
            });
            it('Checking rangecolumn series with log axis', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryYAxis.valueType = 'Logarithmic';
                chartObj.refresh();
            });
            it('Checking rangecolumn series with datetime axis', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'DateTime';
                chartObj.series[0].dataSource = exports.dateTimeData;
                chartObj.refresh();
            });
            it('Checking datalabel for rangecolumn outer', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_0');
                    expect(ele !== null).toBe(true);
                    ele = document.getElementById('chartContainer_Series_0_Point_1_Text_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Outer';
                chartObj.refresh();
            });
            it('Checking datalabel for rangecolumn Top', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_0');
                    expect(ele !== null).toBe(true);
                    ele = document.getElementById('chartContainer_Series_0_Point_1_Text_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Top';
                chartObj.refresh();
            });
            it('Checking datalabel for rangecolumn Bottom', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_2');
                    expect(ele !== null).toBe(true);
                    ele = document.getElementById('chartContainer_Series_0_Point_2_Text_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Bottom';
                chartObj.refresh();
            });
            it('Checking datalabel for rangecolumn Middle', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_0');
                    expect(ele !== null).toBe(true);
                    ele = document.getElementById('chartContainer_Series_0_Point_1_Text_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Middle';
                chartObj.refresh();
            });
            it('Checking datalabel for rangecolumn Auto', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_0');
                    expect(ele !== null).toBe(true);
                    ele = document.getElementById('chartContainer_Series_0_Point_1_Text_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Auto';
                chartObj.primaryYAxis.rangePadding = 'None';
                chartObj.primaryYAxis.minimum = 0;
                chartObj.primaryYAxis.maximum = 70;
                chartObj.refresh();
            });
            it('Checking with combination series', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainerSeriesGroup0');
                    expect(ele !== null).toBe(true);
                    ele = document.getElementById('chartContainerSeriesGroup1');
                    expect(ele === null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series = [{
                        dataSource: data_spec_1.tool1, xName: 'x', yName: 'y', type: 'Line', drawType: 'StackingColumn', marker: { visible: true }
                    }, {
                        dataSource: data_spec_1.tool1, xName: 'x', yName: 'y', type: 'Polar', drawType: 'StackingColumn', marker: { visible: true }
                    }];
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.refresh();
            });
            it('Checking with stackingcolumn series rendering', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_0');
                    expect(ele !== null).toBe(true);
                    ele = document.getElementById('chartContainer_Series_1_Point_0');
                    expect(ele !== null).toBe(true);
                    var series1 = args.chart.series[0];
                    expect(series1.position === 0).toBe(true);
                    series1 = args.chart.series[1];
                    expect(series1.position === 0).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'Polar';
                chartObj.refresh();
            });
            it('Checking datalabel for stacking column Outer', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_1_Point_0_Text_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.visible = true;
                chartObj.series[1].marker.dataLabel.position = 'Outer';
                chartObj.refresh();
            });
            it('Checking datalabel for stacking column auto', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_1_Point_0_Text_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.position = 'Auto';
                chartObj.primaryYAxis.rangePadding = 'None';
                chartObj.primaryYAxis.minimum = 0;
                chartObj.primaryYAxis.maximum = 140;
                chartObj.refresh();
            });
            it('Checking stackingcolumn series with stacking group', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_0');
                    expect(ele !== null).toBe(true);
                    ele = document.getElementById('chartContainer_Series_1_Point_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].marker.dataLabel.visible = false;
                chartObj.primaryYAxis.rangePadding = 'Normal';
                chartObj.primaryYAxis.minimum = null;
                chartObj.primaryYAxis.maximum = null;
                chartObj.series[0].stackingGroup = 'a';
                chartObj.refresh();
            });
            it('Checking stackingcolumn series with category axis', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_0');
                    expect(ele !== null).toBe(true);
                    ele = document.getElementById('chartContainer_Series_1_Point_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.series[0].dataSource = exports.categoryData;
                chartObj.series[0].stackingGroup = '';
                chartObj.series[1].dataSource = exports.categoryData;
                chartObj.refresh();
            });
            it('Checking stackingcolumn series with category axis for radar', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_0');
                    expect(ele !== null).toBe(true);
                    ele = document.getElementById('chartContainer_Series_1_Point_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'Radar';
                chartObj.series[1].type = 'Radar';
                chartObj.refresh();
            });
            it('Checking stackingcolumn series with category axis on Ticks', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_0');
                    expect(ele !== null).toBe(true);
                    ele = document.getElementById('chartContainer_Series_1_Point_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.labelPlacement = 'OnTicks';
                chartObj.series[0].type = 'Polar';
                chartObj.series[1].type = 'Polar';
                chartObj.refresh();
            });
            it('Checking stackingcolumn series with null point', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_5');
                    expect(ele === null).toBe(true);
                    ele = document.getElementById('chartContainer_Series_1_Point_5');
                    expect(ele === null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking stackingcolumn series with log axis', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_0');
                    expect(ele !== null).toBe(true);
                    ele = document.getElementById('chartContainer_Series_1_Point_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryYAxis.valueType = 'Logarithmic';
                chartObj.refresh();
            });
            it('Checking stackingcolumn series with log axis for endvalue 0', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_0');
                    expect(ele !== null).toBe(true);
                    ele = document.getElementById('chartContainer_Series_1_Point_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = [{ x: 'USA', y: 50 }, { x: 'China', y: 40 },
                    { x: 'Japan', y: 70 }, { x: 'Australia', y: 60 },
                    { x: 'France', y: 50 }, { x: 'Germany', y: 0 },
                    { x: 'Italy', y: 40 }, { x: 'Sweden', y: 30 }];
                chartObj.refresh();
            });
            it('Checking stackingcolumn series with datetime axis', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_0');
                    expect(ele !== null).toBe(true);
                    ele = document.getElementById('chartContainer_Series_1_Point_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'DateTime';
                chartObj.series[0].dataSource = data_spec_1.datetimeData;
                chartObj.series[1].dataSource = data_spec_1.datetimeData;
                chartObj.refresh();
            });
            it('Checking stackingcolumn series with negative point', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_0');
                    expect(ele !== null).toBe(true);
                    ele = document.getElementById('chartContainer_Series_1_Point_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.primaryYAxis.valueType = 'Double';
                chartObj.series[0].dataSource = data_spec_1.negativeDataPoint;
                chartObj.series[1].dataSource = data_spec_1.negativeDataPoint;
                chartObj.refresh();
            });
            it('Checking stackingcolumn series with single point', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_0');
                    expect(ele !== null).toBe(true);
                    var series = args.chart.series[0];
                    expect(series.points.length === 1).toBe(true);
                    series = args.chart.series[1];
                    expect(series.points.length === 1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = [{ x: 1, y: 3 }];
                chartObj.series[1].dataSource = [{ x: 1, y: 7 }];
                chartObj.refresh();
            });
            it('Checking line series with legend shape', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_chart_legend_shape_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series = [{
                        dataSource: data_spec_1.tool1, xName: 'x', yName: 'y', type: 'Polar', name: 'Polar-Radar'
                    }];
                chartObj.legendSettings.visible = true;
                chartObj.refresh();
            });
            it('Checking column series with legend shape', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_chart_legend_shape_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].drawType = 'Column';
                chartObj.refresh();
            });
            it('Checking area series with legend shape', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_chart_legend_shape_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].drawType = 'Area';
                chartObj.refresh();
            });
            it('Checking scatter series with legend shape', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_chart_legend_shape_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].drawType = 'Scatter';
                chartObj.refresh();
            });
            it('Checking stackingcolumn series with legend shape', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_chart_legend_shape_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].drawType = 'StackingColumn';
                chartObj.refresh();
            });
            it('Checking stackingcolumn series with legend shape with right position', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_chart_legend_shape_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.legendSettings.position = 'Right';
                chartObj.refresh();
            });
            it('Checking stackingcolumn series with legend shape with top position', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_chart_legend_shape_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.legendSettings.position = 'Top';
                chartObj.refresh();
            });
            it('Checking stackingcolumn series with legend shape with left position', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_chart_legend_shape_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.legendSettings.position = 'Left';
                chartObj.refresh();
            });
            it('Checking with multiple series', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series = [{
                        dataSource: data_spec_1.tool1, xName: 'x', yName: 'y', type: 'Polar', name: 'Polar-Radar'
                    }, {
                        dataSource: data_spec_1.tool1, xName: 'x', yName: 'y', type: 'Polar', name: 'Polar-Radar'
                    }, {
                        dataSource: data_spec_1.tool1, xName: 'x', yName: 'y', type: 'Polar', name: 'Polar-Radar'
                    }];
                chartObj.refresh();
            });
            it('default Tooltip for stackingcolumn with y axis inversed', function (done) {
                loaded = function (args) {
                    var target = document.getElementById('chartContainer_Series_0_Point_2');
                    var rect = args.chart.element.getBoundingClientRect();
                    var series = chartObj.series[0];
                    var y = series.points[2].symbolLocations[0].y + rect.top;
                    var x = series.points[2].symbolLocations[0].x + rect.left;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('chartContainer_tooltip');
                    expect(tooltip !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].drawType = 'StackingColumn';
                chartObj.series[1].drawType = 'StackingColumn';
                chartObj.series[2].drawType = 'StackingColumn';
                chartObj.primaryYAxis.isInversed = true;
                chartObj.refresh();
            });
            it('Checking with multiple series for stacking group', function (done) {
                loaded = function (args) {
                    ele = document.getElementById('chartContainer_Series_0_Point_0');
                    expect(ele !== null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].stackingGroup = 'a';
                chartObj.series[0].drawType = 'StackingColumn';
                chartObj.series[1].stackingGroup = 'a';
                chartObj.series[1].drawType = 'StackingColumn';
                chartObj.series[2].drawType = 'StackingColumn';
                chartObj.primaryYAxis.isInversed = false;
                chartObj.refresh();
            });
            it('Checking animation', function (done) {
                var animate = function (args) {
                    chartObj.animationComplete = null;
                    var point = document.getElementById('chartContainer_Series_0_Point_0');
                    done();
                };
                chartObj.series[0].animation.enable = true;
                chartObj.animationComplete = animate;
                chartObj.refresh();
            });
            it('Selection mode DragY', function (done) {
                loaded = function (args) {
                    trigger.draganddropEvent(elem, 100, 100, 300, 300);
                    var element = document.getElementById('chartContainer_ej2_drag_rect');
                    expect(element === null).toBe(true);
                    done();
                };
                chartObj.selectionMode = 'DragY';
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Selection mode DragXY', function (done) {
                loaded = function (args) {
                    trigger.draganddropEvent(elem, 100, 100, 300, 300);
                    var element = document.getElementById('chartContainer_ej2_drag_rect');
                    expect(element === null).toBe(true);
                    done();
                };
                chartObj.selectionMode = 'DragXY';
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking with addSeries method', function (done) {
                loaded = function (args) {
                    expect(args.chart.series.length === 5).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.addSeries([
                    {
                        dataSource: data_spec_1.tool1, xName: 'x', yName: 'y', type: 'Polar', name: 'Polar-Radar'
                    }, {
                        dataSource: data_spec_1.tool1, xName: 'x', yName: 'y', type: 'Polar', name: 'Polar-Radar'
                    },
                ]);
            });
            it('Checking with spline area draw type', function (done) {
                loaded = function (args) {
                    expect(document.getElementById('chartContainer_chart_legend_shape_0').getAttribute('d').indexOf('Q') > 0).toBe(true);
                    expect(document.getElementById('chartContainer_chart_legend_shape_1').getAttribute('d').indexOf('Q') > 0).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].drawType = 'SplineArea';
                chartObj.series[1].drawType = 'SplineArea';
                chartObj.refresh();
            });
        });
        describe('Customer issue', function () {
            var chartObj;
            beforeAll(function () {
                elem = ej2_base_1.createElement('div', { id: 'customerIssue' });
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { isInversed: true, valueType: 'Category', labelPlacement: 'OnTicks' },
                    primaryYAxis: { title: 'Revenue in Millions', labelFormat: '{value}M', isInversed: true },
                    series: [
                        {
                            type: 'Polar', drawType: 'Column', xName: 'x', width: 2, yName: 'y', name: 'Product A', animation: { enable: false },
                            dataSource: [{ x: 2000, y: 1 }, { x: 2001, y: 2.0 }, { x: 2002, y: 3.0 }, { x: 2003, y: 4.4 }],
                        },
                        {
                            type: 'Polar', drawType: 'Column', xName: 'x', width: 2, yName: 'y', name: 'Product A', animation: { enable: false },
                            dataSource: [{ x: 2000, y: 1 }, { x: 2001, y: 2.0 }, { x: 2002, y: 3.0 }, { x: 2003, y: 4.4 }],
                        }
                    ],
                    tooltip: { enable: true }, title: 'Average Sales (Inversed Polar)',
                });
                chartObj.appendTo('#customerIssue');
            });
            afterAll(function () {
                chartObj.destroy();
                elem.remove();
            });
            it('Checking with ColumnSeries OnTicks label', function () {
                var point = document.getElementById('customerIssue_Series_0_Point_1');
                expect(point.getAttribute('d')).toBe('M 290.075 224.625 A 94.425 94.425 0 0 1 317.7313754179358 157.85650895505148 L 273.218959029893 113.34418159175245 A 157.375 157.375 1 0 0 227.125 224.62500000000003 Z');
            });
            it('checking columnSeries with between ticks', function (done) {
                chartObj.loaded = function () {
                    var point = document.getElementById('customerIssue_Series_0_Point_1');
                    expect(point.getAttribute('d')).toBe('M 317.73144218646024 291.39355781353976 A 94.425 94.425 0 0 1 290.0750000000472 224.62509442500001 L 227.1250000000787 224.62515737500004 A 157.375 157.375 1 0 0 273.2190703107671 335.90592968923295 Z');
                    done();
                };
                chartObj.primaryXAxis.labelPlacement = 'BetweenTicks';
                chartObj.dataBind();
            });
        });
        describe('Customer issue: Radar chart with X axis label placement is OnTicks', function () {
            var chartObj;
            beforeAll(function () {
                elem = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: {
                        valueType: 'Category',
                        interval: 1,
                        labelPlacement: 'OnTicks',
                    },
                    primaryYAxis: {
                        minimum: 0, maximum: 700, interval: 100
                    },
                    width: "600",
                    series: [
                        {
                            dataSource: [
                                { x: '1996', y: 130 }, { x: '1997', y: 167.46 },
                                { x: '1998', y: 100 }
                            ],
                            xName: 'x', width: 2, yName: 'y', name: 'Warmest', type: 'Radar',
                            drawType: 'Column', visible: true, opacity: 0.4
                        },
                        {
                            dataSource: [
                                { x: '1996', y: 200 }, { x: '1997', y: 600 },
                                { x: '1998', y: 400 }
                            ],
                            xName: 'x', width: 2, yName: 'y', name: 'Warmest', type: 'Radar', fill: 'red',
                            drawType: 'Column', visible: true, opacity: 0.5
                        },
                    ],
                    title: 'Alaska Weather Statistics - 2016',
                    tooltip: {
                        enable: true
                    }
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                elem.remove();
            });
            it('Checking with OnTicks label', function () {
                var point = document.getElementById('container_Series_0_Point_0');
                expect(point.getAttribute('d')).toBe('M 274.68886110046446 210.01160714285714 L 299.9999707732143 195.3982142857289 L 300 224.625 L 300 224.625 Z');
            });
            it('checking with between ticks', function (done) {
                chartObj.loaded = function () {
                    var point = document.getElementById('container_Series_0_Point_0');
                    expect(point.getAttribute('d')).toBe('M 300 195.3982142857143 L 325.31112428613005 210.01158183172555 L 300 224.625 L 300 224.625 Z');
                    done();
                };
                chartObj.primaryXAxis.labelPlacement = 'BetweenTicks';
                chartObj.dataBind();
            });
        });
        describe('Polar Radar Smart Datalabel', function () {
            var chartObj;
            beforeAll(function () {
                elem = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: {
                        title: 'Months',
                        valueType: 'Category',
                        labelPlacement: 'OnTicks',
                        interval: 2,
                    },
                    primaryYAxis: {
                        title: 'Temperature (Celsius)',
                        minimum: -25, maximum: 25, interval: 2,
                        edgeLabelPlacement: 'Shift',
                        labelFormat: '{value}°C',
                    },
                    width: '600', height: '400',
                    series: [
                        {
                            dataSource: [
                                { x: 'Jan', y: -7.1 }, { x: 'Feb', y: -3.7 },
                                { x: 'Mar', y: 0.8 }, { x: 'Apr', y: 6.3 },
                                { x: 'May', y: 13.3 }, { x: 'Jun', y: 18.0 },
                                { x: 'Jul', y: 19.8 }, { x: 'Aug', y: 18.1 },
                                { x: 'Sep', y: 13.1 }, { x: 'Oct', y: 4.1 },
                                { x: 'Nov', y: -3.8 }, { x: 'Dec', y: -6.8 },
                                { x: 'Jan1', y: -7.1 }, { x: 'Feb1', y: -3.7 },
                                { x: 'Mar1', y: 0.8 }, { x: 'Apr1', y: 6.3 },
                                { x: 'May1', y: 13.3 }, { x: 'Jun1', y: 18.0 },
                                { x: 'Jul1', y: 19.8 }, { x: 'Aug1', y: 18.1 },
                                { x: 'Sep1', y: 13.1 }, { x: 'Oct1', y: 4.1 },
                                { x: 'Nov1', y: -3.8 }, { x: 'Dec1', y: -6.8 },
                                { x: 'Jan2', y: -7.1 }, { x: 'Feb2', y: -3.7 },
                                { x: 'Mar2', y: 0.8 }, { x: 'Apr2', y: 6.3 },
                                { x: 'May2', y: 13.3 }, { x: 'Jun2', y: 18.0 },
                                { x: 'Jul2', y: 19.8 }, { x: 'Aug2', y: 18.1 },
                                { x: 'Sep2', y: 13.1 }, { x: 'Oct2', y: 4.1 },
                                { x: 'Nov2', y: -3.8 }, { x: 'Dec2', y: -6.8 },
                                { x: 'Jan3', y: -7.1 }, { x: 'Feb3', y: -3.7 },
                                { x: 'Mar3', y: 0.8 }, { x: 'Apr3', y: 6.3 },
                                { x: 'May3', y: 13.3 }, { x: 'Jun3', y: 18.0 },
                                { x: 'Jul3', y: 19.8 }, { x: 'Aug3', y: 18.1 },
                                { x: 'Sep3', y: 13.1 }, { x: 'Oct3', y: 4.1 },
                                { x: 'Nov3', y: -3.8 }, { x: 'Dec3', y: -6.8 },
                            ],
                            xName: 'x', width: 2, yName: 'y', name: 'Warmest', type: 'Polar',
                            marker: {
                                visible: true,
                                height: 10, width: 10,
                                shape: 'Pentagon',
                                dataLabel: {
                                    visible: true,
                                }
                            },
                            animation: { enable: false }
                        }
                    ],
                    title: 'Alaska Weather Statistics - 2016',
                    tooltip: {
                        enable: true
                    }
                }, '#container');
            });
            afterAll(function () {
                chartObj.destroy();
                elem.remove();
            });
            it('Polar Chart: datalabel count check with X axis label outside', function (done) {
                chartObj.loaded = function (args) {
                    var datalabel = helper_1.getElement("containerTextGroup0");
                    expect(datalabel.childElementCount === 30 || datalabel.childElementCount === 31 || datalabel.childElementCount === 32).toBe(true);
                    done();
                };
                chartObj.refresh();
            });
            it('Polar Chart: datalabel count check with X axis label inside', function (done) {
                chartObj.loaded = function (args) {
                    var datalabel = helper_1.getElement("containerTextGroup0");
                    expect(datalabel.childElementCount === 18 || datalabel.childElementCount === 19).toBe(true);
                    done();
                };
                chartObj.primaryXAxis.labelPosition = 'Inside';
                chartObj.refresh();
            });
            it('Polar Chart: datalabel count check with Y axis label inside', function (done) {
                chartObj.loaded = function (args) {
                    var datalabel = helper_1.getElement("containerTextGroup0");
                    expect(datalabel.childElementCount === 15 || datalabel.childElementCount === 16 || datalabel.childElementCount === 17).toBe(true);
                    done();
                };
                chartObj.primaryYAxis.labelPosition = 'Inside';
                chartObj.refresh();
            });
            it('Radar Chart: datalabel count check with X axis label outside', function (done) {
                chartObj.loaded = function (args) {
                    var datalabel = helper_1.getElement("containerTextGroup0");
                    expect(datalabel.childElementCount === 30 || datalabel.childElementCount === 31 || datalabel.childElementCount === 32).toBe(true);
                    done();
                };
                chartObj.series[0].type = 'Radar';
                chartObj.primaryXAxis.labelPosition = chartObj.primaryYAxis.labelPosition = 'Outside';
                chartObj.refresh();
            });
            it('Radar Chart: datalabel count check with X axis label inside', function (done) {
                chartObj.loaded = function (args) {
                    var datalabel = helper_1.getElement("containerTextGroup0");
                    expect(datalabel.childElementCount === 18 || datalabel.childElementCount === 19).toBe(true);
                    done();
                };
                chartObj.primaryXAxis.labelPosition = 'Inside';
                chartObj.refresh();
            });
            it('Radar Chart: datalabel count check with Y axis label inside', function (done) {
                chartObj.loaded = function (args) {
                    var datalabel = helper_1.getElement("containerTextGroup0");
                    expect(datalabel.childElementCount === 15 || datalabel.childElementCount === 16 || datalabel.childElementCount === 17).toBe(true);
                    done();
                };
                chartObj.primaryYAxis.labelPosition = 'Inside';
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
