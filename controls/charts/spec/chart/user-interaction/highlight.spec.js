define(["require", "exports", "@syncfusion/ej2-base", "../../../src/chart/chart", "../../../src/chart/user-interaction/high-light", "../../../src/chart/series/line-series", "../../../src/chart/series/step-line-series", "../../../src/chart/series/column-series", "../../../src/chart/series/stacking-column-series", "../../../src/chart/series/stacking-area-series", "../../../src/chart/series/area-series", "../../../src/chart/legend/legend", "../base/events.spec", "../../../src/chart/user-interaction/data-editing", "../base/data.spec", "../../common.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, chart_1, high_light_1, line_series_1, step_line_series_1, column_series_1, stacking_column_series_1, stacking_area_series_1, area_series_1, legend_1, events_spec_1, data_editing_1, data_spec_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(line_series_1.LineSeries, data_editing_1.DataEditing, step_line_series_1.StepLineSeries, column_series_1.ColumnSeries, area_series_1.AreaSeries, stacking_area_series_1.StackingAreaSeries, high_light_1.Highlight, stacking_column_series_1.StackingColumnSeries, legend_1.Legend);
    var seriesCollection = [];
    var colors = ['#663AB6', '#EB3F79', '#F8AB1D', '#B82E3D', '#049CB1', '#F2424F', '#C2C924', '#3DA046', '#074D67', '#02A8F4'];
    seriesCollection = [
        {
            name: 'First',
            width: 5,
            animation: { enable: false },
            selectionStyle: null,
            fill: colors[0],
            dataSource: data_spec_1.firstSeries, xName: 'x', yName: 'y',
            type: 'Column'
        },
        {
            name: 'Second',
            width: 10,
            visible: true,
            selectionStyle: null,
            animation: { enable: false },
            fill: colors[5],
            dataSource: data_spec_1.secondSeries, xName: 'x', yName: 'y',
            type: 'Column'
        },
        {
            name: 'Third',
            width: 5,
            animation: { enable: false },
            selectionStyle: null,
            fill: colors[8],
            dataSource: data_spec_1.thirdSeries, xName: 'x', yName: 'y',
            type: 'Column'
        }
    ];
    describe('Chart Control Highlight ', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        var id = 'ej2Container';
        var selection = id + '_ej2_chart_highlight_series_';
        var chartObj;
        var element;
        var selected;
        var i = 0;
        var j = 0;
        var loaded;
        var trigger = new events_spec_1.MouseEvents();
        var chartContainer;
        beforeAll(function () {
            chartContainer = ej2_base_1.createElement('div', { id: id });
            document.body.appendChild(chartContainer);
            chartObj = new chart_1.Chart({
                series: seriesCollection,
                primaryXAxis: { minimum: 2004, maximum: 2012 },
                primaryYAxis: { rangePadding: 'None' },
                height: '500',
                width: '800',
                loaded: loaded,
                highlightMode: 'Point',
                isMultiSelect: false,
                legendSettings: { visible: true, toggleVisibility: false },
            });
            chartObj.appendTo('#' + id);
        });
        afterAll(function () {
            chartObj.destroy();
            chartContainer.remove();
        });
        it('Highlight Mode Point', function (done) {
            loaded = function () {
                element = document.getElementById(id + '_Series_0' + '_Point_3');
                trigger.mousemovetEvent(element, 0, 0);
                expect(document.getElementsByClassName(selection + '0').length).toBe(2);
                element = document.getElementById(id + '_Series_0' + '_Point_5');
                trigger.mousemovetEvent(element, 0, 0);
                expect(document.getElementsByClassName(selection + '0').length).toBe(2);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.refresh();
        });
        it('Highlight Mode Cluster', function (done) {
            loaded = function () {
                element = document.getElementById(id + '_Series_0' + '_Point_5');
                trigger.mousemovetEvent(element, 0, 0);
                element = document.getElementById(id + '_Series_1' + '_Point_2');
                trigger.mousemovetEvent(element, 0, 0);
                for (var i_1 = 0; i_1 < seriesCollection.length; i_1++) {
                    expect(document.getElementsByClassName(selection + i_1).length).toBe(2);
                }
                done();
            };
            chartObj.highlightMode = 'Cluster';
            chartObj.loaded = loaded;
            chartObj.highlightModule.selectedDataIndexes = [];
            chartObj.refresh();
        });
        it('Selection Mode Series', function (done) {
            loaded = function () {
                element = document.getElementById(id + '_Series_0' + '_Point_3');
                trigger.mousemovetEvent(element, 0, 0);
                element = document.getElementById(id + '_Series_1' + '_Point_3');
                trigger.mousemovetEvent(element, 0, 0);
                selected = document.getElementsByClassName(selection + '1');
                expect(selected.length).toBe(2);
                expect(selected[0].childNodes.length).toBe(8);
                done();
            };
            chartObj.highlightMode = 'Series';
            chartObj.loaded = loaded;
            chartObj.highlightModule.selectedDataIndexes = [];
            chartObj.refresh();
        });
        it('Selected DataBind cluster to series', function (done) {
            chartObj.highlightMode = 'Series';
            chartObj.dataBind();
            selected = document.getElementsByClassName(selection + 1);
            expect(selected.length).toBe(2);
            expect(selected[1].id.indexOf('legend') > 1).toBe(true);
            done();
        });
        it('Selected DataBind point multi select false', function (done) {
            chartObj.isMultiSelect = false;
            chartObj.dataBind();
            expect(document.getElementsByClassName(selection + 0).length).toBe(0);
            expect(document.getElementsByClassName(selection + 1).length).toBe(2);
            expect(document.getElementsByClassName(selection + 2).length).toBe(0);
            done();
        });
        it('Selected refresh clear selection', function (done) {
            loaded = function () {
                for (i = 0; i < chartObj.series.length; i++) {
                    expect(document.getElementsByClassName(selection + i).length).toBe(0);
                }
                done();
            };
            chartObj.loaded = loaded;
            chartObj.highlightModule.selectedDataIndexes = [];
            chartObj.refresh();
        });
        it('Patterns with Dots', function (done) {
            loaded = function () {
                expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(3);
                expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[0].id === 'ej2Container_Dots_Selection_0').toBe(true);
                element = document.getElementById(id + '_Series_1_Point_' + 4);
                trigger.mousemovetEvent(element, 0, 0);
                expect(document.getElementsByClassName(selection + 1).length).toBe(2);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.highlightPattern = 'Dots';
            chartObj.highlightMode = 'Point';
            chartObj.refresh();
        });
        it('Patterns with DiagonalForward', function (done) {
            loaded = function () {
                expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(3);
                expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[0].id === 'ej2Container_DiagonalForward_Selection_0').toBe(true);
                element = document.getElementById(id + '_Series_0_Point_' + 4);
                trigger.mousemovetEvent(element, 0, 0);
                expect(document.getElementsByClassName(selection + 0).length).toBe(2);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.highlightPattern = 'DiagonalForward';
            chartObj.refresh();
        });
        it('Patterns with Crosshatch', function (done) {
            loaded = function () {
                expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(3);
                expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[0].id === 'ej2Container_Crosshatch_Selection_0').toBe(true);
                element = document.getElementById(id + '_Series_2_Point_' + 4);
                trigger.mousemovetEvent(element, 0, 0);
                expect(document.getElementsByClassName(selection + 2).length).toBe(2);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.highlightPattern = 'Crosshatch';
            chartObj.refresh();
        });
        it('Patterns with Pacman', function (done) {
            loaded = function () {
                expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(3);
                expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[0].id === 'ej2Container_Pacman_Selection_0').toBe(true);
                element = document.getElementById(id + '_Series_0_Point_' + 0);
                trigger.mousemovetEvent(element, 0, 0);
                expect(document.getElementsByClassName(selection + 0).length).toBe(2);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.highlightPattern = 'Pacman';
            chartObj.refresh();
        });
        it('Patterns with DiagonalBackward', function (done) {
            loaded = function () {
                expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(3);
                expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[0].id === 'ej2Container_DiagonalBackward_Selection_0').toBe(true);
                element = document.getElementById(id + '_Series_0_Point_' + 6);
                trigger.mousemovetEvent(element, 0, 0);
                expect(document.getElementsByClassName(selection + 0).length).toBe(2);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.highlightPattern = 'DiagonalBackward';
            chartObj.refresh();
        });
        it('Patterns with Grid', function (done) {
            loaded = function () {
                expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(3);
                expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[0].id === 'ej2Container_Grid_Selection_0').toBe(true);
                element = document.getElementById(id + '_Series_0_Point_' + 5);
                trigger.mousemovetEvent(element, 0, 0);
                expect(document.getElementsByClassName(selection + 0).length).toBe(2);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.highlightPattern = 'Grid';
            chartObj.refresh();
        });
        it('Patterns with Turquoise', function (done) {
            loaded = function () {
                expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(3);
                expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[1].id === 'ej2Container_Turquoise_Selection_1').toBe(true);
                element = document.getElementById(id + '_Series_0_Point_' + 1);
                trigger.mousemovetEvent(element, 0, 0);
                expect(document.getElementsByClassName(selection + 0).length).toBe(2);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.highlightPattern = 'Turquoise';
            chartObj.highlightMode = 'Series';
            chartObj.refresh();
        });
        it('Patterns with Star', function (done) {
            loaded = function () {
                expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(3);
                expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[0].id === 'ej2Container_Star_Selection_0').toBe(true);
                element = document.getElementById(id + '_Series_0_Point_' + 1);
                trigger.mousemovetEvent(element, 0, 0);
                for (i = 0; i < chartObj.series.length; i++) {
                    expect(document.getElementsByClassName(selection + i).length).toBe(2);
                }
                done();
            };
            chartObj.loaded = loaded;
            chartObj.highlightPattern = 'Star';
            chartObj.highlightMode = 'Cluster';
            chartObj.refresh();
        });
        it('Patterns with Triangle', function (done) {
            loaded = function () {
                expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(3);
                expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[2].id === 'ej2Container_Triangle_Selection_2').toBe(true);
                element = document.getElementById(id + '_Series_0_Point_' + 1);
                trigger.mousemovetEvent(element, 0, 0);
                expect(document.getElementsByClassName(selection + 0).length).toBe(2);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.highlightPattern = 'Triangle';
            chartObj.highlightMode = 'Point';
            chartObj.refresh();
        });
        it('Patterns with Chessboard', function (done) {
            loaded = function () {
                element = document.getElementById(id + '_Series_2_Point_' + 5);
                trigger.mousemovetEvent(element, 0, 0);
                expect(document.getElementsByClassName(selection + 2).length).toBe(2);
                expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(3);
                expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[2].id === 'ej2Container_Chessboard_Selection_2').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.highlightPattern = 'Chessboard';
            chartObj.refresh();
        });
        it('Patterns with Circle', function (done) {
            loaded = function () {
                element = document.getElementById(id + '_Series_0_Point_' + 2);
                trigger.mousemovetEvent(element, 0, 0);
                expect(document.getElementsByClassName(selection + '0').length).toBe(2);
                expect(document.getElementsByClassName(selection + '1').length).toBe(0);
                expect(document.getElementsByClassName(selection + '2').length).toBe(0);
                expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(3);
                expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[0].id === 'ej2Container_Circle_Selection_0').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.highlightMode = 'Series';
            chartObj.highlightPattern = 'Circle';
            chartObj.refresh();
        });
        it('Patterns with Tile', function (done) {
            loaded = function () {
                element = document.getElementById(id + '_Series_2_Point_' + 3);
                trigger.mousemovetEvent(element, 0, 0);
                expect(document.getElementsByClassName(selection + 2).length).toBe(2);
                expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(3);
                expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[0].id === 'ej2Container_Tile_Selection_0').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.highlightPattern = 'Tile';
            chartObj.refresh();
        });
        it('Patterns with HorizontalDash', function (done) {
            loaded = function () {
                element = document.getElementById(id + '_Series_2_Point_' + 5);
                trigger.mousemovetEvent(element, 0, 0);
                expect(document.getElementsByClassName(selection + 2).length).toBe(2);
                expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(3);
                expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[0].id === 'ej2Container_HorizontalDash_Selection_0').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.highlightPattern = 'HorizontalDash';
            chartObj.refresh();
        });
        it('Patterns with VerticalDash', function (done) {
            loaded = function () {
                element = document.getElementById(id + '_Series_2_Point_' + 2);
                trigger.mousemovetEvent(element, 0, 0);
                expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(3);
                expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(3);
                expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[0].id === 'ej2Container_VerticalDash_Selection_0').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.highlightPattern = 'VerticalDash';
            chartObj.highlightMode = 'Point';
            chartObj.refresh();
        });
        it('Patterns with Rectangle', function (done) {
            loaded = function () {
                element = document.getElementById(id + '_Series_2_Point_' + 3);
                trigger.mousemovetEvent(element, 0, 0);
                expect(document.getElementsByClassName(selection + 2).length).toBe(2);
                expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(3);
                expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[0].id === 'ej2Container_Rectangle_Selection_0').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.highlightPattern = 'Rectangle';
            chartObj.isMultiSelect = false;
            chartObj.refresh();
        });
        it('Patterns with Box', function (done) {
            loaded = function () {
                element = document.getElementById(id + '_Series_2_Point_' + 0);
                trigger.mousemovetEvent(element, 0, 0);
                expect(document.getElementsByClassName(selection + 2).length).toBe(2);
                expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(3);
                expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[0].id === 'ej2Container_Box_Selection_0').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.highlightPattern = 'Box';
            chartObj.refresh();
        });
        it('Patterns with VerticalStripe', function (done) {
            loaded = function () {
                element = document.getElementById(id + '_Series_0_Point_' + 5 + '_Symbol');
                var chartArea = document.getElementById(id + '_ChartAreaBorder');
                var y = parseFloat(element.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + chartContainer.offsetTop;
                var x = parseFloat(element.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + chartContainer.offsetLeft;
                trigger.mousemovetEvent(element, Math.ceil(x), Math.ceil(y));
                expect(document.getElementsByClassName(selection + 0).length).toBe(3);
                expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(3);
                expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[0].id === 'ej2Container_VerticalStripe_Selection_0').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.highlightPattern = 'VerticalStripe';
            chartObj.highlightMode = 'Series';
            for (var _i = 0, _a = chartObj.series; _i < _a.length; _i++) {
                var series = _a[_i];
                series.type = 'Line';
                series.marker.visible = true;
                series.marker.height = 20;
                series.marker.width = 20;
            }
            chartObj.refresh();
        });
        it('Patterns with HorizontalStripe', function (done) {
            loaded = function () {
                element = document.getElementById(id + '_Series_1_Point_' + 4 + '_Symbol');
                trigger.mousemovetEvent(element, 0, 0);
                expect(document.getElementsByClassName(selection + 1).length).toBe(3);
                expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(3);
                expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[0].id === 'ej2Container_HorizontalStripe_Selection_0').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            for (var _i = 0, _a = chartObj.series; _i < _a.length; _i++) {
                var series = _a[_i];
                series.type = 'Area';
            }
            chartObj.selectionPattern = 'None';
            chartObj.selectionMode = 'None';
            chartObj.highlightMode = 'Series';
            chartObj.highlightPattern = 'HorizontalStripe';
            chartObj.refresh();
        });
        it('Patterns with Bubble', function (done) {
            loaded = function () {
                element = document.getElementById(id + '_Series_1_Point_' + 5 + '_Symbol');
                var chartArea = document.getElementById(id + '_ChartAreaBorder');
                var y = parseFloat(element.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + chartContainer.offsetTop;
                var x = parseFloat(element.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + chartContainer.offsetLeft;
                trigger.clickEvent(element);
                trigger.mousemovetEvent(element, Math.ceil(x), Math.ceil(y));
                expect(document.getElementsByClassName(selection + 1).length).toBe(4);
                expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(3);
                expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[0].id === 'ej2Container_Bubble_Selection_0').toBe(true);
                done();
            };
            chartObj.loaded = loaded;
            chartObj.highlightMode = 'Point';
            chartObj.highlightPattern = 'Bubble';
            chartObj.refresh();
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
