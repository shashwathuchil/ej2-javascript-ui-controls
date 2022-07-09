define(["require", "exports", "@syncfusion/ej2-base", "../../../src/chart/chart", "../../../src/chart/series/line-series", "../../../src/chart/series/data-label", "../../../src/chart/axis/category-axis", "../../../src/chart/series/column-series", "../base/data.spec", "../../../src/chart/series/stacking-column-series", "../../../src/common/utils/helper", "../../common.spec", "../../../node_modules/es6-promise/dist/es6-promise", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, chart_1, line_series_1, data_label_1, category_axis_1, column_series_1, data_spec_1, stacking_column_series_1, helper_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(line_series_1.LineSeries, category_axis_1.Category, data_label_1.DataLabel, stacking_column_series_1.StackingColumnSeries, column_series_1.ColumnSeries);
    exports.data = [
        { country: 'USA', gold: 50, gold1: 55 },
        { country: 'China', gold: 40, gold1: 45 },
        { country: 'Japan', gold: 70, gold1: 75 },
        { country: 'Australia', gold: 60, gold1: 65 },
        { country: 'France', gold: 50, gold1: 55 },
        { country: 'Germany', gold: 40, gold1: 45 },
        { country: 'Italy', gold: 40, gold1: 45 },
        { country: 'Sweden', gold: 30, gold1: 35 }
    ];
    exports.data1 = [
        { country: 'USA', gold: 55 },
        { country: 'China', gold: 50 },
        { country: 'Japan', gold: 75 },
        { country: 'Australia', gold: 65 },
        { country: 'France', gold: 60 },
        { country: 'Germany', gold: 45 },
        { country: 'Italy', gold: 40 },
        { country: 'Sweden', gold: 35 }
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
        describe('Sorting', function () {
            var chart;
            var ele;
            var loaded;
            var element;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(ele);
                chart = new chart_1.Chart({
                    primaryXAxis: { valueType: 'Category', rangePadding: 'Normal', labelIntersectAction: 'Hide' },
                    series: [{
                            dataSource: exports.data, xName: 'country', yName: 'gold', name: 'Gold', fill: 'red',
                            animation: { enable: false }, type: 'Column'
                        }],
                    legendSettings: { visible: false }
                });
                chart.appendTo('#container');
                data_spec_1.unbindResizeEvents(chart);
            });
            afterAll(function () {
                chart.destroy();
                ele.remove();
            });
            it('X axis ascending order', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container0_AxisLabel_0');
                    expect(svg.textContent == 'Australia').toBe(true);
                    svg = document.getElementById('container0_AxisLabel_7');
                    expect(svg.textContent == 'USA').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].dataSource = helper_1.sort(exports.data, ['country'], false);
                chart.refresh();
                data_spec_1.unbindResizeEvents(chart);
            });
            it('X axis descending order', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container0_AxisLabel_0');
                    expect(svg.textContent == 'USA').toBe(true);
                    svg = document.getElementById('container0_AxisLabel_7');
                    expect(svg.textContent == 'Australia').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].dataSource = helper_1.sort(exports.data, ['country'], true);
                chart.refresh();
            });
            it('Y axis ascending order', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container0_AxisLabel_0');
                    expect(svg.textContent == 'Sweden').toBe(true);
                    svg = document.getElementById('container0_AxisLabel_7');
                    expect(svg.textContent == 'Japan').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].dataSource = helper_1.sort(exports.data, ['gold'], false);
                chart.refresh();
            });
            it('Y axis descending order', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container0_AxisLabel_0');
                    expect(svg.textContent == 'Japan').toBe(true);
                    svg = document.getElementById('container0_AxisLabel_7');
                    expect(svg.textContent == 'Sweden').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].dataSource = helper_1.sort(exports.data, ['gold'], true);
                chart.refresh();
            });
            it('Multiple series x axis ascending order', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container0_AxisLabel_0');
                    expect(svg.textContent == 'Australia').toBe(true);
                    svg = document.getElementById('container0_AxisLabel_7');
                    expect(svg.textContent == 'USA').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series = [
                    {
                        dataSource: helper_1.sort(exports.data, ['country'], false), xName: 'country', yName: 'gold', name: 'Gold', fill: 'red',
                        animation: { enable: false }
                    },
                    {
                        dataSource: helper_1.sort(exports.data, ['country'], false), xName: 'country', yName: 'gold1', name: 'Gold', fill: 'red',
                        animation: { enable: false }
                    }
                ];
                chart.refresh();
            });
            it('Multiple series X axis descending order', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container0_AxisLabel_0');
                    expect(svg.textContent == 'USA').toBe(true);
                    svg = document.getElementById('container0_AxisLabel_7');
                    expect(svg.textContent == 'Australia').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].dataSource = helper_1.sort(exports.data, ['country'], true);
                chart.refresh();
            });
            it('Multiple series y axis ascending order', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container0_AxisLabel_0');
                    expect(svg.textContent == 'Sweden').toBe(true);
                    svg = document.getElementById('container0_AxisLabel_7');
                    expect(svg.textContent == 'Japan').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].dataSource = helper_1.sort(exports.data, ['gold', 'gold1'], false);
                chart.refresh();
            });
            it('Multiple series Y axis descending order', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container0_AxisLabel_0');
                    expect(svg.textContent == 'Japan').toBe(true);
                    svg = document.getElementById('container0_AxisLabel_7');
                    expect(svg.textContent == 'Sweden').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].dataSource = helper_1.sort(exports.data, ['gold', 'gold1'], true);
                chart.refresh();
            });
            it('Stacking column series X axis ascending order', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container0_AxisLabel_0');
                    expect(svg.textContent == 'Australia').toBe(true);
                    svg = document.getElementById('container0_AxisLabel_7');
                    expect(svg.textContent == 'USA').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].type = 'StackingColumn';
                chart.series[1].type = 'StackingColumn';
                chart.series[0].dataSource = helper_1.sort(exports.data, ['country'], false);
                chart.refresh();
            });
            it('Stacking column series X axis descending order', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container0_AxisLabel_0');
                    expect(svg.textContent == 'USA').toBe(true);
                    svg = document.getElementById('container0_AxisLabel_7');
                    expect(svg.textContent == 'Australia').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].dataSource = helper_1.sort(exports.data, ['country'], true);
                chart.refresh();
            });
            it('Stacking column series y axis ascending order', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container0_AxisLabel_0');
                    expect(svg.textContent == 'Sweden').toBe(true);
                    svg = document.getElementById('container0_AxisLabel_7');
                    expect(svg.textContent == 'Japan').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].dataSource = helper_1.sort(exports.data, ['gold', 'gold1'], false);
                chart.refresh();
            });
            it('Stacking column series Y axis descending order', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container0_AxisLabel_0');
                    expect(svg.textContent == 'Japan').toBe(true);
                    svg = document.getElementById('container0_AxisLabel_7');
                    expect(svg.textContent == 'Sweden').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].dataSource = helper_1.sort(exports.data, ['gold', 'gold1'], true);
                chart.refresh();
            });
            it('indexed category axis ascending order', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container0_AxisLabel_0');
                    expect(svg.textContent == 'Australia, Australia').toBe(true);
                    svg = document.getElementById('container0_AxisLabel_7');
                    expect(svg.textContent == 'USA, USA').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].type = 'Column';
                chart.series[1].type = 'Column';
                chart.primaryXAxis.isIndexed = true;
                chart.series[0].dataSource = helper_1.sort(exports.data, ['country'], false);
                chart.refresh();
            });
            it('indexed category axis descending order', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container0_AxisLabel_0');
                    expect(svg.textContent == 'USA, Australia').toBe(true);
                    svg = document.getElementById('container0_AxisLabel_7');
                    expect(svg.textContent == 'Australia, USA').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].dataSource = helper_1.sort(exports.data, ['country'], true);
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
