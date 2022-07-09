define(["require", "exports", "@syncfusion/ej2-base", "../../../src/chart/chart", "../../../src/chart/series/line-series", "../../../src/chart/series/data-label", "../../../src/chart/axis/category-axis", "../../../src/chart/axis/date-time-axis", "../../../src/chart/user-interaction/tooltip", "../../../src/chart/series/pareto-series", "../../../src/chart/user-interaction/crosshair", "../base/events.spec", "../../../src/index", "../../common.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, chart_1, line_series_1, data_label_1, category_axis_1, date_time_axis_1, tooltip_1, pareto_series_1, crosshair_1, events_spec_1, index_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(line_series_1.LineSeries, pareto_series_1.ParetoSeries, data_label_1.DataLabel, category_axis_1.Category, date_time_axis_1.DateTime, tooltip_1.Tooltip, crosshair_1.Crosshair);
    describe('chart control', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        var element;
        describe('pareto Series', function () {
            var chartObj;
            var loaded;
            var element = ej2_base_1.createElement('div', { id: 'container' });
            var dataLabel;
            var point;
            var trigger = new events_spec_1.MouseEvents();
            var x;
            var y;
            var tooltip;
            var chartArea;
            var series;
            var element1;
            var animationComplete;
            element = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(element);
                var data = [
                    { 'x': 'UC Browser', y: 37, },
                    { 'x': 'Chrome', y: 40, },
                    { 'x': 'Android', y: 3, },
                    { 'x': 'Mozila', y: 2, },
                    { 'x': 'Micromax', y: 1, },
                    { 'x': 'iPhone', y: 32, },
                    { 'x': 'Others', y: 26, },
                    { 'x': 'Opera', y: 8, },
                ];
                chartObj = new chart_1.Chart({
                    primaryXAxis: {
                        valueType: 'Category',
                        title: 'Browser'
                    },
                    primaryYAxis: {
                        title: 'Values',
                        minimum: 0,
                        maximum: 150,
                        interval: 30,
                    },
                    series: [
                        {
                            xName: 'x',
                            yName: 'y', dataSource: data, name: 'Browser', type: 'Pareto',
                            marker: { dataLabel: { visible: true }, visible: true, width: 10, height: 10 }
                        },
                    ],
                    legendSettings: {
                        position: 'Top',
                        border: { width: 1, color: 'red' }
                    },
                    tooltip: { enable: true, format: '${point.x}:<b> ${point.y}<b>', enableAnimation: true },
                    title: 'Mobile Browser Statistics',
                    border: { width: 2, color: 'blue' },
                    chartArea: { border: { width: 2, color: 'red' } }
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                document.getElementById('container').remove();
            });
            it('Checking with axis with opposed position', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container1_AxisLabel_0');
                    var svg1 = document.getElementById('container2_AxisLabel_0');
                    expect(parseFloat(svg.getAttribute('x')) <
                        parseFloat(svg1.getAttribute('x'))).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].animation.enable = false;
                chartObj.axes[0].opposedPosition = true;
                chartObj.refresh();
            });
            it('Showing default data label', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_3_Text_0');
                    expect((+element.textContent) == 26).toBe(true);
                    expect(document.getElementById('containerShapeGroup0').childNodes.length == 0).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.visible = true;
                chartObj.refresh();
            });
            it('Checking dataLabel positions Top', function (done) {
                loaded = function (args) {
                    var element1 = +document.getElementById('container_Series_0_Point_4_Text_0').getAttribute('y');
                    expect(chartObj.series[0].points[4].symbolLocations[0].y < element1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Top';
                chartObj.refresh();
            });
            it('Checking dataLabel positions Middle', function (done) {
                loaded = function (args) {
                    var element = +document.getElementById('container_Series_0_Point_0_Text_0').getAttribute('y');
                    var locationY = chartObj.series[0].points[0].symbolLocations[0].y;
                    var height = document.getElementById('container_Series_0_Point_0_Text_0').getBoundingClientRect().height;
                    expect(locationY != element).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Middle';
                chartObj.refresh();
            });
            it('Checking dataLabel positions Outer', function (done) {
                loaded = function (args) {
                    var element1 = +document.getElementById('container_Series_0_Point_2_Text_0').getAttribute('y');
                    expect(chartObj.series[0].points[2].symbolLocations[0].y > element1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Outer';
                chartObj.refresh();
            });
            it('Checking the child Element count', function (done) {
                loaded = function (args) {
                    element1 = index_1.getElement('containerSeriesCollection');
                    expect(element1.childElementCount).toBe(6);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Showing default marker', function (done) {
                loaded = function (args) {
                    element1 = index_1.getElement('containerSymbolGroupPareto');
                    expect(element1.childElementCount).toBe(9);
                    var marker = document.getElementById('container_Series_Pareto_Point_0_Symbol');
                    expect(marker.getAttribute('stroke') == '#000000').toBe(true);
                    expect(marker.getAttribute('fill') == '#ffffff').toBe(true);
                    expect(marker.getAttribute('rx') == '5').toBe(true);
                    expect(marker.getAttribute('ry') == '5').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking the last text value as 100', function (done) {
                loaded = function (args) {
                    expect(document.getElementById('container_Series_Pareto_Point_7_Text_0').textContent).toBe(100 + '%');
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking line series marker color', function (done) {
                loaded = function (args) {
                    var element1 = document.getElementById('container_Series_Pareto_Point_2_Symbol');
                    expect(element1.getAttribute('fill') == '#ffffff').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking column series in descending order', function (done) {
                loaded = function (args) {
                    var element1 = document.getElementById('container_Series_0_Point_3_Text_0');
                    var element2 = document.getElementById('container_Series_0_Point_4_Text_0');
                    expect(parseFloat(element1.getAttribute('y')) <
                        parseFloat(element2.getAttribute('y'))).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking line series in ascending order', function (done) {
                loaded = function (args) {
                    var element1 = document.getElementById('container_Series_Pareto_Point_1_Text_0');
                    var element2 = document.getElementById('container_Series_Pareto_Point_2_Text_0');
                    expect(parseFloat(element1.getAttribute('y')) >
                        parseFloat(element2.getAttribute('y'))).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking the legend', function (done) {
                loaded = function (args) {
                    element1 = index_1.getElement('container_chart_legend_translate_g');
                    expect(element1.childElementCount).toBe(2);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Changing marker shape ', function (done) {
                loaded = function (args) {
                    var direction;
                    var series1;
                    series1 = document.getElementById('container_Series_Pareto_Point_1_Symbol');
                    expect(series1 != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Rectangle';
                chartObj.refresh();
            });
            it('Checking line series rendering', function (done) {
                loaded = function (args) {
                    var path = document.getElementById('container_Series_Pareto');
                    var id = path.getAttribute('d');
                    var check = id.indexOf('z');
                    expect(check !== 0).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Circle';
                chartObj.refresh();
            });
            it('Changing marker size', function (done) {
                loaded = function (args) {
                    var series1 = document.getElementById('container_Series_Pareto_Point_2_Symbol');
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
            it('Changing datalabel color', function (done) {
                loaded = function (args) {
                    var series1 = document.getElementById('container_Series_0_Point_1_Text_0');
                    expect(series1.getAttribute('fill') == 'white').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.offset.x = 0;
                chartObj.series[0].marker.dataLabel.fill = "blue";
                chartObj.refresh();
            });
        });
        describe('multiple Series', function () {
            var chartObj;
            var loaded;
            var element = ej2_base_1.createElement('div', { id: 'container' });
            var series;
            var element1;
            element = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(element);
                var data = [
                    { x: 'Traffic', y: 56 }, { x: 'Child Care', y: 44.8 },
                    { x: 'Transport', y: 87.2 }, { x: 'Weather', y: 19.6 },
                    { x: 'Emergency', y: 6.6 }
                ];
                var data1 = [
                    { x: 'Traffic', y: 56 }, { x: 'Child Care', y: 44.8 },
                    { x: 'Transport', y: 37.2 }, { x: 'Weather', y: 19.6 },
                    { x: 'Emergency', y: 6.6 }
                ];
                chartObj = new chart_1.Chart({
                    primaryXAxis: {
                        valueType: 'Category',
                        title: 'Browser'
                    },
                    primaryYAxis: {
                        title: 'Values',
                        minimum: 0,
                        maximum: 150,
                        interval: 30,
                    },
                    axes: [{
                            minimum: 0,
                            name: '',
                            opposedPosition: true,
                            maximum: 100,
                            interval: 30,
                            rowIndex: 1,
                            lineStyle: { width: 0 },
                            majorTickLines: { width: 0 }, majorGridLines: { width: 1 },
                            minorGridLines: { width: 1 }, minorTickLines: { width: 0 }
                        }],
                    series: [
                        {
                            xName: 'x',
                            yName: 'y', dataSource: data, name: 'Browser', type: 'Pareto',
                            marker: { dataLabel: { visible: true }, visible: true, width: 10, height: 10 }
                        },
                        {
                            xName: 'x',
                            yName: 'y', dataSource: data1, name: 'Browser', type: 'Pareto',
                            marker: { dataLabel: { visible: true }, visible: true, width: 10, height: 10, }
                        },
                    ],
                    legendSettings: {
                        position: 'Top',
                        border: { width: 1, color: 'red' }
                    },
                    tooltip: { enable: true, format: '${point.x}:<b> ${point.y}<b>', enableAnimation: true },
                    title: 'Mobile Browser Statistics',
                    border: { width: 2, color: 'blue' },
                    chartArea: { border: { width: 2, color: 'red' } }
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                document.getElementById('container').remove();
            });
            it('Checking with multiple series type', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_0');
                    var element1 = document.getElementById('container_Series_1_Point_0');
                    expect(element.getAttribute('d') != '').toBe(true);
                    expect(element1.getAttribute('d') != '').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].animation.enable = false;
                chartObj.series[1].animation.enable = false;
                chartObj.refresh();
            });
            it('Checking with axes', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('containerAxisLine_0');
                    var element1 = document.getElementById('containerAxisLine_1');
                    expect(element.getAttribute('y1') == '388.5');
                    expect(element1.getAttribute('y1') == '234.75');
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[1].yAxisName = 'secondary';
                chartObj.axes[0].name = chartObj.series[1].yAxisName;
                chartObj.rows = [{
                        height: '50%'
                    }, {
                        height: '50%'
                    }];
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
