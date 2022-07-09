define(["require", "exports", "@syncfusion/ej2-base", "../../../src/chart/chart", "../../../src/chart/series/stacking-line-series", "../../../src/chart/axis/date-time-axis", "../../../src/chart/axis/category-axis", "../../../src/chart/series/data-label", "../../../src/chart/index", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, chart_1, stacking_line_series_1, date_time_axis_1, category_axis_1, data_label_1, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(stacking_line_series_1.StackingLineSeries, index_1.PolarSeries, date_time_axis_1.DateTime, category_axis_1.Category, data_label_1.DataLabel);
    describe('Chart Control', function () {
        describe('Chart StackingLine series', function () {
            var chartObj;
            var elem;
            var loaded;
            var path;
            beforeAll(function () {
                elem = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    series: [{
                            dataSource: [{ x: 1, y: 10 }, { x: 2, y: null },
                                { x: 3, y: 15 }, { x: 4, y: 25 }, { x: 5, y: 30 }, { x: 6, y: 20 }],
                            xName: 'x', yName: 'y', emptyPointSettings: { mode: 'Average' },
                            type: 'StackingLine', animation: { enable: false },
                            marker: { visible: true, dataLabel: { visible: true } },
                        }, {
                            dataSource: [{ x: 1, y: 10 }, { x: 2, y: 30 },
                                { x: 3, y: 15 }, { x: 4, y: 25 }, { x: 5, y: 30 }, { x: 6, y: null }],
                            xName: 'x', yName: 'y', emptyPointSettings: { mode: 'Drop' },
                            type: 'StackingLine', animation: { enable: true },
                        }, {
                            dataSource: [{ x: 1, y: 10 }, { x: 2, y: 30 },
                                { x: 3, y: 15 }, { x: 4, y: null }, { x: 5, y: 30 }, { x: 6, y: 20 }],
                            xName: 'x', yName: 'y', emptyPointSettings: { mode: 'Gap' },
                            type: 'StackingLine', animation: { enable: false },
                        }, {
                            dataSource: [{ x: 1, y: null }, { x: 2, y: 30 },
                                { x: 3, y: 15 }, { x: 4, y: 25 }, { x: 5, y: 30 }, { x: 6, y: 20 }],
                            xName: 'x', yName: 'y', emptyPointSettings: { mode: 'Zero' },
                            type: 'StackingLine', animation: { enable: false },
                        }]
                });
            });
            afterAll(function () {
                elem.remove();
                chartObj.destroy();
            });
            it('Checking with default points for stacking line', function (done) {
                loaded = function (args) {
                    var series1 = document.getElementById('container_Series_0');
                    path = series1.getAttribute('d').split('L');
                    expect(path.length).toBe(6);
                    series1 = document.getElementById('container_Series_1');
                    path = series1.getAttribute('d').split('L');
                    expect(path.length).toBe(5);
                    series1 = document.getElementById('container_Series_2');
                    path = series1.getAttribute('d').split('L');
                    expect(path.length).toBe(5);
                    series1 = document.getElementById('container_Series_3');
                    path = series1.getAttribute('d').split('L');
                    expect(path.length).toBe(6);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.appendTo('#container');
            });
            it('Checking with default points for stacking line 100%', function (done) {
                loaded = function (args) {
                    var series1 = document.getElementById('container_Series_0');
                    path = series1.getAttribute('d').split('L');
                    expect(path.length).toBe(6);
                    series1 = document.getElementById('container_Series_1');
                    path = series1.getAttribute('d').split('L');
                    expect(path.length).toBe(5);
                    series1 = document.getElementById('container_Series_2');
                    path = series1.getAttribute('d').split('L');
                    expect(path.length).toBe(5);
                    series1 = document.getElementById('container_Series_3');
                    path = series1.getAttribute('d').split('L');
                    expect(path.length).toBe(6);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'StackingLine100';
                chartObj.series[1].type = 'StackingLine100';
                chartObj.series[2].type = 'StackingLine100';
                chartObj.series[3].type = 'StackingLine100';
                chartObj.refresh();
            });
            it('Checking with default points for polar stacking line', function (done) {
                loaded = function (args) {
                    var series1 = document.getElementById('container_Series_0');
                    path = series1.getAttribute('d').split('L');
                    expect(path.length).toBe(7);
                    series1 = document.getElementById('container_Series_1');
                    path = series1.getAttribute('d').split('L');
                    expect(path.length).toBe(6);
                    series1 = document.getElementById('container_Series_2');
                    path = series1.getAttribute('d').split('L');
                    expect(path.length).toBe(6);
                    series1 = document.getElementById('container_Series_3');
                    path = series1.getAttribute('d').split('L');
                    expect(path.length).toBe(7);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'Polar';
                chartObj.series[0].drawType = 'StackingLine';
                chartObj.series[1].type = 'Polar';
                chartObj.series[1].drawType = 'StackingLine';
                chartObj.series[2].type = 'Polar';
                chartObj.series[2].drawType = 'StackingLine';
                chartObj.series[3].type = 'Polar';
                chartObj.series[3].drawType = 'StackingLine';
                chartObj.refresh();
            });
        });
    });
});
