define(["require", "exports", "@syncfusion/ej2-base", "../../../src/accumulation-chart/renderer/pie-series", "../../../src/accumulation-chart/accumulation", "../../../src/accumulation-chart/renderer/legend", "../../../src/common/utils/helper", "../../../src/accumulation-chart/renderer/dataLabel", "../../../src/accumulation-chart/user-interaction/selection", "../../chart/base/data.spec", "../../chart/base/events.spec", "../../common.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, pie_series_1, accumulation_1, legend_1, helper_1, dataLabel_1, selection_1, data_spec_1, events_spec_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    accumulation_1.AccumulationChart.Inject(pie_series_1.PieSeries, legend_1.AccumulationLegend, dataLabel_1.AccumulationDataLabel, selection_1.AccumulationSelection);
    document.body.appendChild(ej2_base_1.createElement('style', {
        innerHTML: ' .selection { stroke-width: 2; fill: lime; stroke: red; opacity: 1; } '
    }));
    describe('Accumulation Chart Control', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('Selection', function () {
            var ele;
            var slice;
            var loaded;
            var id = 'pie';
            var pieGroupId = id + 'SeriesGroup0';
            var sliceid = id + '_Series_0' + '_Point_';
            var slicepath;
            var legendG;
            var element;
            var selection = id + '_ej2_chart_selection_series_';
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
                accumulation.accumulationSelectionModule.destroy();
                accumulation.destroy();
                helper_1.removeElement(id);
            });
            it('Doughnut - MultiSelect false Selection Mode Point', function (done) {
                accumulation.loaded = function (args) {
                    element = document.getElementById('pie_Series_0_Point_3');
                    trigger.clickEvent(element);
                    element = document.getElementById('pie_Series_0_Point_1');
                    trigger.clickEvent(element);
                    element = document.getElementById('pie_Series_0_Point_6');
                    trigger.clickEvent(element);
                    expect(document.getElementsByClassName(selection + '0').length === 3).toBe(true);
                    done();
                };
                accumulation.selectionMode = 'Point';
                accumulation.refresh();
            });
            it('Doughnut - MultiSelect true Selection Mode Point', function (done) {
                accumulation.loaded = function (args) {
                    element = document.getElementById('pie_Series_0_Point_3');
                    trigger.clickEvent(element);
                    element = document.getElementById('pie_Series_0_Point_6');
                    trigger.clickEvent(element);
                    expect(document.getElementsByClassName(selection + '0').length === 5).toBe(true);
                    done();
                };
                accumulation.selectionMode = 'Point';
                accumulation.isMultiSelect = true;
                accumulation.accumulationSelectionModule.selectedDataIndexes = [];
                accumulation.refresh();
            });
            it('Doughnut - Single point selection and UnSelection', function (done) {
                accumulation.loaded = function (args) {
                    element = document.getElementById('pie_Series_0_Point_4');
                    trigger.clickEvent(element);
                    selected = document.getElementsByClassName(selection + '0');
                    expect(element === selected[0]).toBe(true);
                    trigger.clickEvent(element);
                    selected = document.getElementsByClassName(selection + '0');
                    expect(selected.length === 0).toBe(true);
                    done();
                };
                accumulation.selectionMode = 'Point';
                accumulation.isMultiSelect = false;
                accumulation.accumulationSelectionModule.selectedDataIndexes = [];
                accumulation.refresh();
            });
            it('Doughnut - Multiple point selection and UnSelection', function (done) {
                accumulation.loaded = function (args) {
                    var selectedLength;
                    for (i = 0, length = accumulation.visibleSeries[0].points.length, j = 1; i < length; i++, j++) {
                        element = document.getElementById('pie_Series_0_Point_' + i);
                        trigger.clickEvent(element);
                        selected = document.getElementsByClassName(selection + 0);
                        expect(selected.length === (2 * j) + 1).toBe(true);
                    }
                    selectedLength = selected.length;
                    for (i = accumulation.visibleSeries[0].points.length - 1, j = 1; i > 0; i--, j++) {
                        element = document.getElementById('pie_Series_0_Point_' + i);
                        trigger.clickEvent(element);
                        selected = document.getElementsByClassName(selection + 0);
                        expect(selected.length === selectedLength - (2 * j) - 1).toBe(true);
                    }
                    done();
                };
                accumulation.selectionMode = 'Point';
                accumulation.isMultiSelect = true;
                accumulation.accumulationSelectionModule.selectedDataIndexes = [];
                accumulation.refresh();
            });
            it('Doughnut - Selected DataIndexes checking', function (done) {
                accumulation.loaded = function (args) {
                    expect(document.getElementsByClassName(selection + '0').length === 2).toBe(true);
                    done();
                };
                accumulation.selectionMode = 'Point';
                accumulation.selectedDataIndexes = [{ series: 0, point: 2 }];
                accumulation.accumulationSelectionModule.selectedDataIndexes = [];
                accumulation.refresh();
            });
            it('Doughnut - Selected Legend toggle visible false', function (done) {
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    element = document.getElementById('pie_chart_legend_shape_1');
                    trigger.clickEvent(element);
                    expect(document.getElementsByClassName(selection + '0').length === 2).toBe(true);
                    trigger.clickEvent(element);
                    expect(document.getElementsByClassName(selection + '0').length === 0).toBe(true);
                    done();
                };
                accumulation.legendSettings.toggleVisibility = false;
                accumulation.selectedDataIndexes = [];
                accumulation.accumulationSelectionModule.selectedDataIndexes = [];
                accumulation.refresh();
            });
            it('Doughnut - Set selectionstyle property', function (done) {
                accumulation.loaded = function (args) {
                    element = document.getElementById('pie_Series_0_Point_3');
                    trigger.clickEvent(element);
                    expect(element.getAttribute('class') === 'selection').toBe(true);
                    element = document.getElementById('pie_chart_legend_shape_3');
                    expect(element.getAttribute('class') === 'selection').toBe(true);
                    done();
                };
                accumulation.series[0].selectionStyle = 'selection';
                accumulation.refresh();
            });
            it('Doughnut - point selection while click the correspoding Datalabel ', function (done) {
                accumulation.loaded = function (args) {
                    element = document.getElementById('pie_datalabel_Series_0_text_0');
                    trigger.clickEvent(element);
                    expect(document.getElementsByClassName(selection + '0').length === 2).toBe(true);
                    done();
                };
                accumulation.selectionMode = 'Point';
                accumulation.series[0].selectionStyle = null;
                accumulation.accumulationSelectionModule.selectedDataIndexes = [];
                accumulation.refresh();
            });
            it('Doughnut - Selected Legend toggle visible true', function (done) {
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    element = document.getElementById('pie_chart_legend_shape_3');
                    trigger.clickEvent(element);
                    expect(document.getElementsByClassName(selection + '0').length).toBe(0);
                    done();
                };
                accumulation.legendSettings.toggleVisibility = true;
                accumulation.accumulationSelectionModule.selectedDataIndexes = [];
                accumulation.refresh();
            });
            it('Pie - MultiSelect false Selection Mode Point', function (done) {
                accumulation.loaded = function (args) {
                    element = document.getElementById('pie_Series_0_Point_3');
                    trigger.clickEvent(element);
                    element = document.getElementById('pie_Series_0_Point_1');
                    trigger.clickEvent(element);
                    element = document.getElementById('pie_Series_0_Point_6');
                    trigger.clickEvent(element);
                    expect(document.getElementsByClassName(selection + '0').length === 3).toBe(true);
                    done();
                };
                accumulation.series[0].innerRadius = '0%';
                accumulation.legendSettings.toggleVisibility = false;
                accumulation.accumulationSelectionModule.selectedDataIndexes = [];
                accumulation.isMultiSelect = false;
                accumulation.refresh();
            });
            it('Pie - MultiSelect true Selection Mode Point', function (done) {
                accumulation.loaded = function (args) {
                    element = document.getElementById('pie_Series_0_Point_' + 3);
                    trigger.clickEvent(element);
                    element = document.getElementById('pie_Series_0_Point_' + 6);
                    trigger.clickEvent(element);
                    expect(document.getElementsByClassName(selection + '0').length === 5).toBe(true);
                    done();
                };
                accumulation.selectionMode = 'Point';
                accumulation.isMultiSelect = true;
                accumulation.accumulationSelectionModule.selectedDataIndexes = [];
                accumulation.refresh();
            });
            it('Pie - Single point selection and UnSelection', function (done) {
                accumulation.loaded = function (args) {
                    element = document.getElementById('pie_Series_0_Point_4');
                    trigger.clickEvent(element);
                    selected = document.getElementsByClassName(selection + '0');
                    expect(element === selected[0]).toBe(true);
                    trigger.clickEvent(element);
                    selected = document.getElementsByClassName(selection + '0');
                    expect(selected.length === 0).toBe(true);
                    done();
                };
                accumulation.selectionMode = 'Point';
                accumulation.isMultiSelect = false;
                accumulation.accumulationSelectionModule.selectedDataIndexes = [];
                accumulation.refresh();
            });
            it('Pie - Multiple point selection and UnSelection', function (done) {
                accumulation.loaded = function (args) {
                    var selectedLength;
                    for (i = 0, length = accumulation.visibleSeries[0].points.length, j = 1; i < length; i++, j++) {
                        element = document.getElementById('pie_Series_0_Point_' + i);
                        trigger.clickEvent(element);
                        selected = document.getElementsByClassName(selection + 0);
                        expect(selected.length === (2 * j) + 1).toBe(true);
                    }
                    selectedLength = selected.length;
                    for (i = accumulation.visibleSeries[0].points.length - 1, j = 1; i > 0; i--, j++) {
                        element = document.getElementById('pie_Series_0_Point_' + i);
                        trigger.clickEvent(element);
                        selected = document.getElementsByClassName(selection + 0);
                        expect(selected.length === selectedLength - (2 * j) - 1).toBe(true);
                    }
                    done();
                };
                accumulation.selectionMode = 'Point';
                accumulation.isMultiSelect = true;
                accumulation.accumulationSelectionModule.selectedDataIndexes = [];
                accumulation.refresh();
            });
            it('Pie - Selected DataIndexes checking', function (done) {
                accumulation.loaded = function (args) {
                    expect(document.getElementsByClassName(selection + '0').length === 2).toBe(true);
                    done();
                };
                accumulation.selectionMode = 'Point';
                accumulation.selectedDataIndexes = [{ series: 0, point: 2 }];
                accumulation.accumulationSelectionModule.selectedDataIndexes = [];
                accumulation.refresh();
            });
            it('Pie - Selected Legend toggle visible false', function (done) {
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    element = document.getElementById('pie_chart_legend_text_1');
                    trigger.clickEvent(element);
                    expect(document.getElementsByClassName(selection + '0').length === 2).toBe(true);
                    trigger.clickEvent(element);
                    expect(document.getElementsByClassName(selection + '0').length === 0).toBe(true);
                    done();
                };
                accumulation.legendSettings.toggleVisibility = false;
                accumulation.selectedDataIndexes = [];
                accumulation.accumulationSelectionModule.selectedDataIndexes = [];
                accumulation.refresh();
            });
            it('Pie - Set selectionstyle property', function (done) {
                accumulation.loaded = function (args) {
                    element = document.getElementById('pie_Series_0_Point_3');
                    trigger.clickEvent(element);
                    expect(element.getAttribute('class') === 'selection').toBe(true);
                    element = document.getElementById('pie_chart_legend_shape_3');
                    expect(element.getAttribute('class') === 'selection').toBe(true);
                    done();
                };
                accumulation.series[0].selectionStyle = 'selection';
                accumulation.refresh();
            });
            it('Pie - Selected Legend toggle visible true', function (done) {
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    element = document.getElementById('pie_Series_0_Point_3');
                    trigger.clickEvent(element);
                    trigger.clickEvent(element);
                    expect(document.getElementsByClassName(selection + '0').length === 0).toBe(true);
                    element = document.getElementById('pie_chart_legend_shape_2');
                    trigger.clickEvent(element);
                    expect(element.getAttribute('class') === '').toBe(true);
                    done();
                };
                accumulation.legendSettings.toggleVisibility = true;
                accumulation.series[0].selectionStyle = null;
                accumulation.visibleSeries[0].explode = true;
                accumulation.refresh();
            });
            it('Pie - Selected without legend', function (done) {
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    element = document.getElementById('pie_Series_0_Point_3');
                    trigger.clickEvent(element);
                    expect(document.getElementsByClassName(selection + '0').length >= 0).toBe(true);
                    trigger.clickEvent(element);
                    expect(document.getElementsByClassName(selection + '0').length === 0).toBe(true);
                    done();
                };
                accumulation.legendSettings.visible = false;
                accumulation.refresh();
            });
            it('Pie - Selected Legend click on selected point', function (done) {
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    element = document.getElementById('pie_Series_0_Point_4');
                    trigger.clickEvent(element);
                    expect(document.getElementsByClassName(selection + '0').length === 2).toBe(true);
                    element = document.getElementById('pie_chart_legend_shape_4');
                    trigger.clickEvent(element);
                    expect(element.getAttribute('class') === selection + '0').toBe(true);
                    trigger.clickEvent(element);
                    element = document.getElementById('pie_Series_0_Point_4');
                    expect(element.getAttribute('d')).not.toBe(null);
                    done();
                };
                accumulation.legendSettings.toggleVisibility = true;
                accumulation.legendSettings.visible = true;
                accumulation.refresh();
            });
            it('Patterns with Dots', function (done) {
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(8);
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[0].id === 'pie_Dots_Selection_0').toBe(true);
                    done();
                };
                accumulation.selectionPattern = 'Dots';
                accumulation.refresh();
            });
            it('Patterns with DiagonalForward', function (done) {
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(8);
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[0].id === 'pie_DiagonalForward_Selection_0').toBe(true);
                    done();
                };
                accumulation.selectionPattern = 'DiagonalForward';
                accumulation.refresh();
            });
            it('Patterns with Crosshatch', function (done) {
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(8);
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[0].id === 'pie_Crosshatch_Selection_0').toBe(true);
                    done();
                };
                accumulation.selectionPattern = 'Crosshatch';
                accumulation.refresh();
            });
            it('Patterns with Pacman', function (done) {
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(8);
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[0].id === 'pie_Pacman_Selection_0').toBe(true);
                    done();
                };
                accumulation.selectionPattern = 'Pacman';
                accumulation.refresh();
            });
            it('Patterns with DiagonalBackward', function (done) {
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(8);
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[0].id === 'pie_DiagonalBackward_Selection_0').toBe(true);
                    done();
                };
                accumulation.selectionPattern = 'DiagonalBackward';
                accumulation.refresh();
            });
            it('Patterns with Grid', function (done) {
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(8);
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[0].id === 'pie_Grid_Selection_0').toBe(true);
                    done();
                };
                accumulation.selectionPattern = 'Grid';
                accumulation.refresh();
            });
            it('Patterns with Turquoise', function (done) {
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(8);
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[1].id === 'pie_Turquoise_Selection_0').toBe(true);
                    done();
                };
                accumulation.selectionPattern = 'Turquoise';
                accumulation.refresh();
            });
            it('Patterns with Star', function (done) {
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(8);
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[0].id === 'pie_Star_Selection_0').toBe(true);
                    done();
                };
                accumulation.selectionPattern = 'Star';
                accumulation.refresh();
            });
            it('Patterns with Triangle', function (done) {
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(8);
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[2].id === 'pie_Triangle_Selection_0').toBe(true);
                    done();
                };
                accumulation.selectionPattern = 'Triangle';
                accumulation.refresh();
            });
            it('Patterns with Chessboard', function (done) {
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(8);
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[2].id === 'pie_Chessboard_Selection_0').toBe(true);
                    done();
                };
                accumulation.selectionPattern = 'Chessboard';
                accumulation.refresh();
            });
            it('Patterns with Circle', function (done) {
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(8);
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[0].id === 'pie_Circle_Selection_0').toBe(true);
                    done();
                };
                accumulation.selectionPattern = 'Circle';
                accumulation.refresh();
            });
            it('Patterns with Tile', function (done) {
                accumulation.loaded = function (args) {
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(8);
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[0].id === 'pie_Tile_Selection_0').toBe(true);
                    done();
                };
                accumulation.selectionPattern = 'Tile';
                accumulation.refresh();
            });
            it('Patterns with HorizontalDash', function (done) {
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(8);
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[0].id === 'pie_HorizontalDash_Selection_0').toBe(true);
                    done();
                };
                accumulation.selectionPattern = 'HorizontalDash';
                accumulation.refresh();
            });
            it('Patterns with VerticalDash', function (done) {
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(8);
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[0].id === 'pie_VerticalDash_Selection_0').toBe(true);
                    done();
                };
                accumulation.selectionPattern = 'VerticalDash';
                accumulation.selectionMode = 'Point';
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
                accumulation.selectionPattern = 'Rectangle';
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
                accumulation.selectionPattern = 'Box';
                accumulation.refresh();
            });
            it('Patterns with VerticalStripe', function (done) {
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(8);
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[0].id === 'pie_VerticalStripe_Selection_0').toBe(true);
                    done();
                };
                accumulation.selectionPattern = 'VerticalStripe';
                accumulation.refresh();
            });
            it('Patterns with Bubble', function (done) {
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(8);
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[0].id === 'pie_Bubble_Selection_0').toBe(true);
                    done();
                };
                accumulation.selectionPattern = 'Bubble';
                accumulation.refresh();
            });
            it('Patterns with HorizontalStripe', function (done) {
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern').length).toBe(8);
                    expect(document.getElementById(id + '_svg').querySelectorAll('pattern')[0].id === 'pie_HorizontalStripe_Selection_0').toBe(true);
                    done();
                };
                accumulation.selectionPattern = 'HorizontalStripe';
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
