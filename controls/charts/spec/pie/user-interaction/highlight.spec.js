define(["require", "exports", "@syncfusion/ej2-base", "../../../src/accumulation-chart/renderer/pie-series", "../../../src/accumulation-chart/accumulation", "../../../src/accumulation-chart/renderer/legend", "../../../src/common/utils/helper", "../../../src/accumulation-chart/renderer/dataLabel", "../../../src/accumulation-chart/user-interaction/selection", "../../../src/accumulation-chart/user-interaction/high-light", "../../chart/base/data.spec", "../../chart/base/events.spec", "../../common.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, pie_series_1, accumulation_1, legend_1, helper_1, dataLabel_1, selection_1, high_light_1, data_spec_1, events_spec_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    accumulation_1.AccumulationChart.Inject(pie_series_1.PieSeries, legend_1.AccumulationLegend, dataLabel_1.AccumulationDataLabel, high_light_1.AccumulationHighlight, selection_1.AccumulationSelection);
    describe('Accumulation Chart Control', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('Highlight', function () {
            var ele;
            var slice;
            var loaded;
            var id = 'pie';
            var pieGroupId = id + 'SeriesGroup0';
            var sliceid = id + '_Series_0' + '_Point_';
            var slicepath;
            var legendG;
            var element;
            var highlight = id + '_ej2_chart_highlight_series_';
            var legendId = id + '_chart_legend';
            var y;
            var selected;
            var i = 0;
            var j = 0;
            var length;
            var accumulation;
            var points;
            var trigger = new events_spec_1.MouseEvents();
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: id });
                document.body.appendChild(ele);
                accumulation = new accumulation_1.AccumulationChart({
                    series: [
                        {
                            dataSource: data_spec_1.categoryData1,
                            xName: 'x',
                            yName: 'y',
                            startAngle: 0,
                            endAngle: 360,
                            innerRadius: '30%',
                            animation: { enable: false },
                            dataLabel: {
                                visible: true, name: 'data', position: 'Inside',
                                border: { width: 1, color: 'violet' },
                                connectorStyle: { length: '10%' }
                            },
                        }
                    ], width: '600', height: '400', legendSettings: { visible: true }
                });
                accumulation.appendTo('#' + id);
            });
            afterAll(function () {
                accumulation.accumulationHighlightModule.destroy();
                accumulation.destroy();
                helper_1.removeElement(id);
            });
            it('Doughnut - Hightlight Mode Point', function (done) {
                accumulation.loaded = function (args) {
                    element = document.getElementById('pie_Series_0_Point_3');
                    trigger.mousemoveEvent(element, 0, 0, 200, 200);
                    element = document.getElementById('pie_Series_0_Point_1');
                    trigger.mousemoveEvent(element, 0, 0, 200, 200);
                    element = document.getElementById('pie_Series_0_Point_6');
                    trigger.mousemoveEvent(element, 0, 0, 200, 200);
                    expect(document.getElementsByClassName(highlight + '0').length === 3).toBe(true);
                    done();
                };
                accumulation.highlightMode = 'Point';
                accumulation.highlightPattern = 'Dots';
                accumulation.refresh();
            });
            it('Patterns with Dots', function (done) {
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    element = document.getElementById('pie_Series_0_Point_0');
                    trigger.mousemoveEvent(element, 0, 0, 200, 200);
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(8);
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[0].id === 'pie_Dots_Selection_0').toBe(true);
                    done();
                };
                accumulation.highlightPattern = 'Dots';
                accumulation.refresh();
            });
            it('Patterns with DiagonalForward', function (done) {
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    element = document.getElementById('pie_Series_0_Point_0');
                    trigger.mousemoveEvent(element, 0, 0, 200, 200);
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(8);
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[0].id === 'pie_DiagonalForward_Selection_0').toBe(true);
                    done();
                };
                accumulation.highlightPattern = 'DiagonalForward';
                accumulation.refresh();
            });
            it('Patterns with Crosshatch', function (done) {
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(8);
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[0].id === 'pie_Crosshatch_Selection_0').toBe(true);
                    done();
                };
                accumulation.highlightPattern = 'Crosshatch';
                accumulation.refresh();
            });
            it('Patterns with Pacman', function (done) {
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(8);
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[0].id === 'pie_Pacman_Selection_0').toBe(true);
                    done();
                };
                accumulation.highlightPattern = 'Pacman';
                accumulation.refresh();
            });
            it('Patterns with DiagonalBackward', function (done) {
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(8);
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[0].id === 'pie_DiagonalBackward_Selection_0').toBe(true);
                    done();
                };
                accumulation.highlightPattern = 'DiagonalBackward';
                accumulation.refresh();
            });
            it('Patterns with Grid', function (done) {
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(8);
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[0].id === 'pie_Grid_Selection_0').toBe(true);
                    done();
                };
                accumulation.highlightPattern = 'Grid';
                accumulation.refresh();
            });
            it('Patterns with Turquoise', function (done) {
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(8);
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[1].id === 'pie_Turquoise_Selection_0').toBe(true);
                    done();
                };
                accumulation.highlightPattern = 'Turquoise';
                accumulation.refresh();
            });
            it('Patterns with Star', function (done) {
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(8);
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[0].id === 'pie_Star_Selection_0').toBe(true);
                    done();
                };
                accumulation.highlightPattern = 'Star';
                accumulation.refresh();
            });
            it('Patterns with Triangle', function (done) {
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(8);
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[2].id === 'pie_Triangle_Selection_0').toBe(true);
                    done();
                };
                accumulation.highlightPattern = 'Triangle';
                accumulation.refresh();
            });
            it('Patterns with Chessboard', function (done) {
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(8);
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[2].id === 'pie_Chessboard_Selection_0').toBe(true);
                    done();
                };
                accumulation.highlightPattern = 'Chessboard';
                accumulation.refresh();
            });
            it('Patterns with Circle', function (done) {
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(8);
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[0].id === 'pie_Circle_Selection_0').toBe(true);
                    done();
                };
                accumulation.highlightPattern = 'Circle';
                accumulation.refresh();
            });
            it('Patterns with Tile', function (done) {
                accumulation.loaded = function (args) {
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(8);
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[0].id === 'pie_Tile_Selection_0').toBe(true);
                    done();
                };
                accumulation.highlightPattern = 'Tile';
                accumulation.refresh();
            });
            it('Patterns with HorizontalDash', function (done) {
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(8);
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[0].id === 'pie_HorizontalDash_Selection_0').toBe(true);
                    done();
                };
                accumulation.highlightPattern = 'HorizontalDash';
                accumulation.refresh();
            });
            it('Patterns with VerticalDash', function (done) {
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(8);
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[0].id === 'pie_VerticalDash_Selection_0').toBe(true);
                    done();
                };
                accumulation.highlightPattern = 'VerticalDash';
                accumulation.highlightMode = 'Point';
                accumulation.isMultiSelect = true;
                accumulation.refresh();
            });
            it('Patterns with Rectangle', function (done) {
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(8);
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[0].id === 'pie_Rectangle_Selection_0').toBe(true);
                    done();
                };
                accumulation.highlightPattern = 'Rectangle';
                accumulation.isMultiSelect = false;
                accumulation.refresh();
            });
            it('Patterns with Box', function (done) {
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(8);
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[0].id === 'pie_Box_Selection_0').toBe(true);
                    done();
                };
                accumulation.highlightPattern = 'Box';
                accumulation.refresh();
            });
            it('Patterns with VerticalStripe', function (done) {
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(8);
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[0].id === 'pie_VerticalStripe_Selection_0').toBe(true);
                    done();
                };
                accumulation.highlightPattern = 'VerticalStripe';
                accumulation.refresh();
            });
            it('Patterns with Bubble', function (done) {
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(8);
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[0].id === 'pie_Bubble_Selection_0').toBe(true);
                    done();
                };
                accumulation.highlightPattern = 'Bubble';
                accumulation.refresh();
            });
            it('Patterns with HorizontalStripe', function (done) {
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(8);
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[0].id === 'pie_HorizontalStripe_Selection_0').toBe(true);
                    done();
                };
                accumulation.highlightPattern = 'HorizontalStripe';
                accumulation.refresh();
            });
            it('Doughnut - highlighted in mousemove over Legend', function (done) {
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    element = document.getElementById('pie_chart_legend_shape_1');
                    trigger.mousemoveEvent(element, 0, 0, 200, 200);
                    expect(document.getElementsByClassName(highlight + '0').length === 2).toBe(true);
                    done();
                };
                accumulation.legendSettings.toggleVisibility = false;
                accumulation.selectedDataIndexes = [];
                accumulation.accumulationHighlightModule.selectedDataIndexes = [];
                accumulation.refresh();
            });
            it('Doughnut - Set selectionstyle property', function (done) {
                accumulation.loaded = function (args) {
                    element = document.getElementById('pie_Series_0_Point_3');
                    trigger.mousemoveEvent(element, 0, 0, 200, 200);
                    expect(element.getAttribute('class') === 'highlight').toBe(true);
                    element = document.getElementById('pie_chart_legend_shape_3');
                    expect(element.getAttribute('class') === 'highlight').toBe(true);
                    done();
                };
                accumulation.series[0].selectionStyle = 'highlight';
                accumulation.refresh();
            });
            it('Doughnut - point highlight while hover the correspoding Datalabel ', function (done) {
                accumulation.loaded = function (args) {
                    element = document.getElementById('pie_datalabel_Series_0_text_0');
                    trigger.mousemoveEvent(element, 0, 0, 200, 200);
                    expect(document.getElementsByClassName(highlight + '0').length === 2).toBe(true);
                    done();
                };
                accumulation.highlightMode = 'Point';
                accumulation.series[0].selectionStyle = null;
                accumulation.accumulationHighlightModule.selectedDataIndexes = [];
                accumulation.refresh();
            });
            it('Pie - Checking whether single point is highlighted', function (done) {
                accumulation.loaded = function (args) {
                    element = document.getElementById('pie_Series_0_Point_3');
                    trigger.mousemoveEvent(element, 0, 0, 200, 200);
                    element = document.getElementById('pie_Series_0_Point_1');
                    trigger.mousemoveEvent(element, 0, 0, 200, 200);
                    element = document.getElementById('pie_Series_0_Point_6');
                    trigger.mousemoveEvent(element, 0, 0, 200, 200);
                    expect(document.getElementsByClassName(highlight + '0').length === 3).toBe(true);
                    done();
                };
                accumulation.series[0].innerRadius = '0%';
                accumulation.accumulationHighlightModule.selectedDataIndexes = [];
                accumulation.refresh();
            });
            it('Pie - Set selectionstyle property', function (done) {
                accumulation.loaded = function (args) {
                    element = document.getElementById('pie_Series_0_Point_3');
                    trigger.mousemoveEvent(element, 0, 0, 200, 200);
                    expect(element.getAttribute('class') === 'highlight').toBe(true);
                    element = document.getElementById('pie_chart_legend_shape_3');
                    expect(element.getAttribute('class') === 'highlight').toBe(true);
                    done();
                };
                accumulation.series[0].selectionStyle = 'highlight';
                accumulation.refresh();
            });
            it('Pie - highlighted in mousemove over Legend', function (done) {
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    element = document.getElementById('pie_chart_legend_shape_1');
                    trigger.mousemoveEvent(element, 0, 0, 200, 200);
                    expect(element.getAttribute('class') === 'highlight').toBe(true);
                    done();
                };
                accumulation.legendSettings.toggleVisibility = false;
                accumulation.selectedDataIndexes = [];
                accumulation.accumulationHighlightModule.selectedDataIndexes = [];
                accumulation.refresh();
            });
            it('Pie - point highlight while hover the correspoding Datalabel ', function (done) {
                accumulation.loaded = function (args) {
                    element = document.getElementById('pie_datalabel_Series_0_text_0');
                    trigger.mousemoveEvent(element, 0, 0, 200, 200);
                    expect(document.getElementsByClassName(highlight + '0').length === 2).toBe(true);
                    done();
                };
                accumulation.highlightMode = 'Point';
                accumulation.series[0].selectionStyle = null;
                accumulation.accumulationHighlightModule.selectedDataIndexes = [];
                accumulation.refresh();
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
