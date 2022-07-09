define(["require", "exports", "@syncfusion/ej2-base", "../../../src/chart/chart", "../../../src/chart/series/line-series", "../../../src/chart/legend/legend", "../../../src/chart/series/data-label", "../../../src/chart/axis/category-axis", "../../../src/chart/user-interaction/crosshair", "../base/data.spec", "../base/events.spec", "../../common.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, chart_1, line_series_1, legend_1, data_label_1, category_axis_1, crosshair_1, data_spec_1, events_spec_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(line_series_1.LineSeries, category_axis_1.Category, data_label_1.DataLabel, crosshair_1.Crosshair, legend_1.Legend);
    describe('Chart Control', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('Indexed Category Axis', function () {
            var chart;
            var ele;
            var loaded;
            var element;
            var trigger = new events_spec_1.MouseEvents();
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(ele);
                chart = new chart_1.Chart({
                    primaryXAxis: { valueType: 'Category', isIndexed: true, labelIntersectAction: 'Hide' },
                    primaryYAxis: { title: 'PrimaryYAxis' },
                    series: [{
                            dataSource: data_spec_1.indexedCategoryData,
                            xName: 'x', yName: 'y', name: 'Gold', animation: { enable: false }
                        }],
                    height: '400', width: '900',
                    loaded: loaded, legendSettings: { visible: false }
                });
            });
            afterAll(function () {
                chart.destroy();
                ele.remove();
            });
            it('Checking the single series Labels', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('containerAxisLabels0');
                    expect(svg.childNodes.length == 7).toBe(true);
                    svg = document.getElementById('container0_AxisLabel_0');
                    expect(svg.textContent == 'Monday').toBe(true);
                    svg = document.getElementById('container0_AxisLabel_6');
                    expect(svg.textContent == 'Monday').toBe(true);
                    expect(args.chart.visibleSeries[0].points[6].xValue == 6).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.appendTo('#container');
            });
            it('Checking indexed false', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('containerAxisLabels0');
                    expect(svg.childNodes.length == 5).toBe(true);
                    expect(args.chart.visibleSeries[0].points[6].xValue == 0).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.primaryXAxis.isIndexed = false;
                chart.refresh();
            });
            it('Checking the multiple series Labels', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('containerAxisLabels0');
                    expect(svg.childNodes.length == 7).toBe(true);
                    svg = document.getElementById('container0_AxisLabel_0');
                    expect(svg.textContent == 'Monday, Monday').toBe(true);
                    svg = document.getElementById('container0_AxisLabel_6');
                    expect(svg.textContent == 'Monday, Monday').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.primaryXAxis.isIndexed = true;
                chart.series = [
                    {
                        dataSource: data_spec_1.indexedCategoryData,
                        xName: 'x', yName: 'y', name: 'Gold', animation: { enable: false }
                    },
                    {
                        dataSource: data_spec_1.indexedCategoryData,
                        xName: 'x', yName: 'y', name: 'silver', animation: { enable: false }
                    }
                ];
                chart.refresh();
            });
            it('Checking with two rows', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('containerAxisLabels0');
                    expect(svg.childNodes.length == 7).toBe(true);
                    svg = document.getElementById('container0_AxisLabel_0');
                    expect(svg.textContent == 'Monday, Monday').toBe(true);
                    svg = document.getElementById('container0_AxisLabel_6');
                    expect(svg.textContent == 'Monday, Monday').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.rows = [{ height: '50%' }, { height: '50%' }];
                chart.axes = [{ rowIndex: 1, name: 'yAxis' }];
                chart.series[0].yAxisName = 'yAxis';
                chart.refresh();
            });
            it('Checking with two columns', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('containerAxisLabels0');
                    svg = document.getElementById('container0_AxisLabel_0');
                    expect(svg.textContent == 'Monday').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.rows = [{}];
                chart.columns = [{ width: '50%' }, { width: '50%' }];
                chart.axes = [{ columnIndex: 1, name: 'xAxis', valueType: 'Category' }];
                chart.series[0].yAxisName = null;
                chart.series[0].xAxisName = 'xAxis';
                chart.refresh();
            });
            it('Checking with two columns with multiple series and second column is indexed false', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('containerAxisLabels0');
                    svg = document.getElementById('container0_AxisLabel_0');
                    expect(svg.textContent == 'Monday, Monday').toBe(true);
                    svg = document.getElementById('containerAxisLabels2');
                    svg = document.getElementById('container2_AxisLabel_0');
                    expect(svg.textContent == 'Monday').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series = [
                    {
                        dataSource: data_spec_1.indexedCategoryData, xAxisName: 'xAxis',
                        xName: 'x', yName: 'y', name: 'series1', animation: { enable: false }
                    },
                    {
                        dataSource: data_spec_1.indexedCategoryData, xAxisName: 'xAxis',
                        xName: 'x', yName: 'y', name: 'series2', animation: { enable: false }
                    },
                    {
                        dataSource: data_spec_1.indexedCategoryData,
                        xName: 'x', yName: 'y', name: 'series3', animation: { enable: false }
                    },
                    {
                        dataSource: data_spec_1.indexedCategoryData,
                        xName: 'x', yName: 'y', name: 'series4', animation: { enable: false }
                    }
                ];
                chart.refresh();
            });
            it('Checking with two columns and second column also indexed true', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('containerAxisLabels2');
                    svg = document.getElementById('container2_AxisLabel_0');
                    expect(svg.textContent == 'Monday, Monday').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.axes[0].labelIntersectAction = 'Hide';
                chart.axes[0].isIndexed = true;
                chart.refresh();
            });
            it('Checking with two columns and spanning', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('containerAxisLabels2');
                    svg = document.getElementById('container2_AxisLabel_0');
                    expect(svg.textContent == 'Monday, Monday').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.primaryXAxis.span = 2;
                chart.refresh();
            });
            it('Checking axis labels after Legend click', function (done) {
                loaded = function (args) {
                    chart.loaded = null;
                    var legendElement;
                    legendElement = document.getElementById('container_chart_legend_text_2');
                    trigger.clickEvent(legendElement);
                    expect(chart.series[2].visible).toBe(false);
                    expect(args.chart.axisCollections[0].labels[0] == 'Monday').toBe(true);
                    done();
                };
                chart.legendSettings = { visible: true };
                chart.loaded = loaded;
                chart.primaryXAxis.span = 1;
                chart.refresh();
            });
            it('Checking with multiple axis and oppposed position', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('containerAxisLabels0');
                    svg = document.getElementById('container0_AxisLabel_0');
                    expect(svg.textContent == 'Monday, Monday').toBe(true);
                    svg = document.getElementById('containerAxisLabels2');
                    svg = document.getElementById('container2_AxisLabel_0');
                    expect(svg.textContent == 'Monday').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.columns = [{}];
                chart.rows = [{ height: '50%' }, { height: '50%' }];
                chart.axes = [{ rowIndex: 0, name: 'xAxis', valueType: 'Category', isIndexed: true, opposedPosition: true },
                    { rowIndex: 0, name: 'xAxis1', valueType: 'Category', isIndexed: true, opposedPosition: false },];
                chart.series = [
                    {
                        dataSource: data_spec_1.indexedCategoryData, xAxisName: 'xAxis',
                        xName: 'x', yName: 'y', name: 'series1', animation: { enable: false }
                    },
                    {
                        dataSource: data_spec_1.indexedCategoryData, xAxisName: 'xAxis1',
                        xName: 'x', yName: 'y', name: 'series2', animation: { enable: false }
                    },
                    {
                        dataSource: data_spec_1.indexedCategoryData,
                        xName: 'x', yName: 'y', name: 'series3', animation: { enable: false }
                    },
                    {
                        dataSource: data_spec_1.indexedCategoryData,
                        xName: 'x', yName: 'y', name: 'series4', animation: { enable: false }
                    }
                ];
                chart.refresh();
            });
        });
        describe('Indexed Category Axis - Line break label checking', function () {
            var chart;
            var ele;
            var loaded;
            var element;
            var trigger = new events_spec_1.MouseEvents();
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(ele);
                chart = new chart_1.Chart({
                    primaryXAxis: { valueType: 'Category', isIndexed: true },
                    primaryYAxis: {},
                    series: [{
                            dataSource: [
                                { x: 'Monday<br>Monday<br>Monday<br>Monday', y: 50 }, { x: 'Tuesday', y: 40 },
                                { x: 'Wednesday', y: 70 },
                                { x: 'Thursday', y: 60 }, { x: 'Friday', y: 50 },
                                { x: 'Monday<br>Monday<br>Monday<br>Monday', y: 40 }, { x: 'Monday<br>Monday<br>Monday<br>Monday', y: 30 }
                            ],
                            xName: 'x', yName: 'y', type: 'Line', animation: { enable: false }
                        }],
                    legendSettings: { visible: false }
                }, '#container');
            });
            afterAll(function () {
                chart.destroy();
                ele.remove();
            });
            it('line break labels behavior checking', function (done) {
                loaded = function (args) {
                    var label = document.getElementById('containerAxisLabels0');
                    expect(label.childElementCount == 7).toBe(true);
                    label = document.getElementById('container0_AxisLabel_0');
                    expect(label.childElementCount == 3).toBe(true);
                    expect(label.childNodes[0].textContent == 'Monday').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.refresh();
            });
            it('line break labels with inversed axis', function (done) {
                loaded = function (args) {
                    var label = document.getElementById('containerAxisLabels0');
                    expect(label.childElementCount == 7).toBe(true);
                    label = document.getElementById('container0_AxisLabel_6');
                    expect(label.childElementCount == 3).toBe(true);
                    expect(label.childNodes[0].textContent == 'Monday').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.primaryXAxis.isInversed = true;
                chart.refresh();
            });
            it('line break labels with opposed position true', function (done) {
                loaded = function (args) {
                    var label = document.getElementById('containerAxisLabels0');
                    expect(label.childElementCount == 7).toBe(true);
                    label = document.getElementById('container0_AxisLabel_0');
                    expect(label.childElementCount == 3).toBe(true);
                    expect(label.childNodes[0].textContent == 'Monday').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.primaryXAxis.isInversed = false;
                chart.primaryXAxis.opposedPosition = true;
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
