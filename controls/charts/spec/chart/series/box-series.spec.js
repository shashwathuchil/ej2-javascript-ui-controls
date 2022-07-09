define(["require", "exports", "@syncfusion/ej2-base", "../../../src/chart/chart", "../../../src/chart/user-interaction/selection", "../../../src/common/utils/helper", "../../../src/chart/series/box-and-whisker-series", "../../../src/chart/axis/category-axis", "../../../src/chart/user-interaction/tooltip", "../../../src/chart/user-interaction/crosshair", "../../../src/chart/series/data-label", "../base/data.spec", "../base/events.spec", "../../common.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, chart_1, selection_1, helper_1, box_and_whisker_series_1, category_axis_1, tooltip_1, crosshair_1, data_label_1, data_spec_1, events_spec_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(box_and_whisker_series_1.BoxAndWhiskerSeries, tooltip_1.Tooltip, crosshair_1.Crosshair, category_axis_1.Category, data_label_1.DataLabel, selection_1.Selection);
    var prevent = function () {
    };
    describe('Chart Control - Box and Whisker Series', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('Box plot - default rendering', function () {
            var chartObj;
            var elem;
            var point;
            var svg;
            var loaded;
            var done;
            var currentPoint;
            beforeAll(function () {
                elem = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { valueType: 'Category', title: 'Department' },
                    primaryYAxis: { title: 'Age' },
                    series: [{
                            dataSource: [
                                { x: "Development", yValues: [22, 22, 23, 25, 25, 25, 26, 27, 27, 28, 28, 29, 30, 32, 34, 32, 34, 36, 35, 38] },
                                { x: "Testing", yValues: [22, 33, 23, 25, 26, 28, 29, 30, 34, 33, 32, 31, 50] },
                                { x: "HR", yValues: [22, 24, 25, 30, 32, 34, 36, 38, 39, 41, 35, 36, 40, 56] },
                                { x: "Finance", yValues: [26, 27, 28, 30, 32, 34, 35, 37, 35, 37, 45] },
                                { x: "R&D", yValues: [26, 27, 29, 32, 34, 35, 36, 37, 38, 39, 41, 43, 58] },
                                { x: "Sales", yValues: [27, 26, 28, 29, 29, 29, 32, 35, 32, 38, 53] },
                                { x: "Inventory", yValues: [21, 23, 24, 25, 26, 27, 28, 30, 34, 36, 38] },
                                { x: "Graphics", yValues: [26, 28, 29, 30, 32, 33, 35, 36, 52] },
                                { x: "Training", yValues: [28, 29, 30, 31, 32, 34, 35, 36] }
                            ],
                            xName: 'x', yName: 'yValues',
                            animation: { enable: false }, type: 'BoxAndWhisker',
                            marker: {
                                visible: true,
                                height: 10,
                                width: 10
                            }
                        },
                    ], width: '800',
                    legendSettings: { visible: false },
                    title: 'Employees age group in various departments',
                });
                chartObj.appendTo('#container');
                data_spec_1.unbindResizeEvents(chartObj);
            });
            afterAll(function () {
                chartObj.destroy();
                elem.remove();
            });
            it('Checking with group elements', function (done) {
                loaded = function (args) {
                    svg = helper_1.getElement('containerSeriesGroup0');
                    expect(svg.childElementCount).toBe(10);
                    svg = helper_1.getElement('container_Series_0_Point_0');
                    expect(svg.childElementCount).toBe(1);
                    svg = helper_1.getElement('container_Series_0_Point_1');
                    expect(svg.childElementCount).toBe(2);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with point default color customization', function () {
                svg = helper_1.getElement('container_Series_0_Point_0_BoxPath');
                expect(svg.getAttribute('fill')).toBe('#00bdae');
                expect(svg.getAttribute('stroke')).toBe('#004c46');
                expect(svg.getAttribute('stroke-width')).toBe('1');
                expect(svg.getAttribute('opacity')).toBe('1');
                svg = helper_1.getElement('container_Series_0_Point_1_Symbol');
                expect(svg.getAttribute('fill')).toBe('#00bdae');
                expect(svg.getAttribute('stroke')).toBe('#004c46');
                expect(svg.getAttribute('stroke-width')).toBe('2');
                expect(svg.getAttribute('opacity')).toBe('1');
            });
            it('Checking given customization', function (done) {
                chartObj.loaded = function (args) {
                    svg = helper_1.getElement('container_Series_0_Point_0_BoxPath');
                    expect(svg.getAttribute('fill')).toBe('teal');
                    expect(svg.getAttribute('stroke')).toBe('#eff4ff');
                    expect(svg.getAttribute('stroke-width')).toBe('2');
                    expect(svg.getAttribute('opacity')).toBe('1');
                    svg = helper_1.getElement('container_Series_0_Point_1_Symbol');
                    expect(svg.getAttribute('fill')).toBe('teal');
                    expect(svg.getAttribute('stroke')).toBe('#eff4ff');
                    expect(svg.getAttribute('stroke-width')).toBe('2');
                    expect(svg.getAttribute('opacity')).toBe('1');
                    done();
                };
                chartObj.series[0].fill = 'teal';
                chartObj.series[0].border = {
                    color: '#eff4ff',
                    width: 2
                };
                chartObj.series[0].marker.border = {
                    color: '#eff4ff',
                    width: 2
                };
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking normal mode', function (done) {
                chartObj.loaded = function (args) {
                    currentPoint = chartObj.series[0].points[2];
                    expect(currentPoint.average).toBe(34.857142857142854);
                    expect(currentPoint.upperQuartile).toBe(39);
                    expect(currentPoint.lowerQuartile).toBe(30);
                    expect(currentPoint.minimum).toBe(22);
                    expect(currentPoint.maximum).toBe(41);
                    expect(currentPoint.median).toBe(35.5);
                    expect(currentPoint.outliers.length).toBe(1);
                    expect(currentPoint.outliers[0]).toBe(56);
                    done();
                };
                chartObj.series[0].border = {
                    color: null, width: 1
                };
                chartObj.series[0].marker.border = {
                    color: null, width: 1
                };
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking exclusive mode', function (done) {
                chartObj.loaded = function (args) {
                    currentPoint = chartObj.series[0].points[2];
                    expect(currentPoint.average).toBe(34.857142857142854);
                    expect(currentPoint.upperQuartile).toBe(39.25);
                    expect(currentPoint.lowerQuartile).toBe(28.75);
                    expect(currentPoint.minimum).toBe(22);
                    expect(currentPoint.maximum).toBe(41);
                    expect(currentPoint.median).toBe(35.5);
                    expect(currentPoint.outliers.length).toBe(1);
                    expect(currentPoint.outliers[0]).toBe(56);
                    done();
                };
                chartObj.series[0].boxPlotMode = 'Exclusive';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking inclusive mode', function (done) {
                chartObj.loaded = function (args) {
                    currentPoint = chartObj.series[0].points[2];
                    expect(currentPoint.average).toBe(34.857142857142854);
                    expect(currentPoint.upperQuartile).toBe(38.75);
                    expect(currentPoint.lowerQuartile).toBe(30.5);
                    expect(currentPoint.minimum).toBe(22);
                    expect(currentPoint.maximum).toBe(41);
                    expect(currentPoint.median).toBe(35.5);
                    expect(currentPoint.outliers.length).toBe(1);
                    expect(currentPoint.outliers[0]).toBe(56);
                    done();
                };
                chartObj.series[0].boxPlotMode = 'Inclusive';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking normal mode and mean as true', function (done) {
                chartObj.loaded = function (args) {
                    svg = helper_1.getElement('container_Series_0_Point_3_BoxPath');
                    expect((svg.getAttribute('d').match(/M/g) || []).length).toBe(8);
                    done();
                };
                chartObj.series[0].boxPlotMode = 'Normal';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking normal mode and mean as false', function (done) {
                chartObj.loaded = function (args) {
                    svg = helper_1.getElement('container_Series_0_Point_3_BoxPath');
                    expect((svg.getAttribute('d').match(/M/g) || []).length).toBe(6);
                    done();
                };
                chartObj.series[0].showMean = false;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking animation complete event', function (done) {
                chartObj.animationComplete = function (args) {
                    svg = helper_1.getElement('container_Series_0_Point_0');
                    expect(svg.style.visibility).toBe('visible');
                    done();
                };
                chartObj.loaded = function (args) {
                    svg = helper_1.getElement('container_Series_0_Point_0');
                    expect(svg.style.visibility).toBe('hidden');
                };
                chartObj.series[0].animation.enable = true;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking single yValues', function (done) {
                chartObj.loaded = function (args) {
                    svg = helper_1.getElement('container_Series_0_Point_0_BoxPath');
                    expect(svg !== null).toBe(true);
                    done();
                };
                chartObj.animationComplete = null;
                chartObj.series[0].animation.enable = false;
                chartObj.series[0].dataSource = [{
                        x: "Development",
                        yValues: [22, 22, 23, 25, 25, 25, 26, 27, 27, 28, 28, 29, 30, 32, 34, 32, 34, 36, 35, 38]
                    }];
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking single yValues with empty point', function (done) {
                chartObj.loaded = function (args) {
                    svg = helper_1.getElement('container_Series_0_Point_0_BoxPath');
                    expect(svg !== null).toBe(true);
                    done();
                };
                chartObj.series[0].dataSource = [{
                        x: "Development",
                        yValues: [22, 22, 23, 25, 25, 25, 26, 27, null, undefined, 28, 29, 30, 32, 34, null, 34, 36, 35, 38]
                    }];
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking single point', function (done) {
                chartObj.loaded = function (args) {
                    svg = helper_1.getElement('container_Series_0_Point_0_BoxPath');
                    expect(svg !== null).toBe(true);
                    done();
                };
                chartObj.series[0].dataSource = [{
                        x: "Development",
                        yValues: [22]
                    }];
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking single point with exclusive mode', function (done) {
                chartObj.loaded = function (args) {
                    svg = helper_1.getElement('container_Series_0_Point_0_BoxPath');
                    expect(svg !== null).toBe(true);
                    done();
                };
                chartObj.series[0].boxPlotMode = 'Exclusive';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking single point with inclusive mode', function (done) {
                chartObj.loaded = function (args) {
                    svg = helper_1.getElement('container_Series_0_Point_0_BoxPath');
                    expect(svg !== null).toBe(true);
                    done();
                };
                chartObj.series[0].boxPlotMode = 'Inclusive';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking empty array point with inclusive', function (done) {
                chartObj.loaded = function (args) {
                    svg = helper_1.getElement('container_Series_0_Point_0_BoxPath');
                    expect(svg === null).toBe(true);
                    done();
                };
                chartObj.series[0].dataSource = [{
                        x: "Development",
                        yValues: []
                    }];
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking empty array point with exclusive', function (done) {
                chartObj.loaded = function (args) {
                    svg = helper_1.getElement('container_Series_0_Point_0_BoxPath');
                    expect(svg === null).toBe(true);
                    done();
                };
                chartObj.series[0].boxPlotMode = 'Exclusive';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking inverted axis', function (done) {
                chartObj.loaded = function (args) {
                    svg = helper_1.getElement('container_Series_0_Point_3_BoxPath');
                    expect((svg.getAttribute('d').match(/M/g) || []).length).toBe(6);
                    done();
                };
                chartObj.series[0].dataSource = [
                    { x: 1, yValues: [22, 22, 23, 25, 25, 25, 26, 27, 27, 28, 28, 29, 30, 32, 34, 32, 34, 36, 35, 38] },
                    { x: 2, yValues: [22, 33, 23, 25, 26, 28, 29, 30, 34, 33, 32, 31, 50] },
                    { x: 3, yValues: [22, 24, 25, 30, 32, 34, 36, 38, 39, 41, 35, 36, 40, 56] },
                    { x: 4, yValues: [26, 27, 28, 30, 32, 34, 35, 37, 35, 37, 45] },
                    { x: 5, yValues: [26, 27, 29, 32, 34, 35, 36, 37, 38, 39, 41, 43, 58] },
                    { x: 6, yValues: [27, 26, 28, 29, 29, 29, 32, 35, 32, 38, 53] },
                    { x: 7, yValues: [21, 23, 24, 25, 26, 27, 28, 30, 34, 36, 38] },
                    { x: 8, yValues: [26, 28, 29, 30, 32, 33, 35, 36, 52] },
                    { x: 9, yValues: [28, 29, 30, 31, 32, 34, 35, 36] }
                ];
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.isTransposed = true;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking series with certain range', function (done) {
                chartObj.loaded = function (args) {
                    svg = helper_1.getElement('container_Series_0_Point_3_BoxPath');
                    expect((svg.getAttribute('d').match(/M/g) || []).length).toBe(6);
                    svg = helper_1.getElement('containerSeriesGroup0');
                    expect(svg.childElementCount).toBe(7);
                    done();
                };
                chartObj.primaryXAxis.minimum = 3;
                chartObj.primaryXAxis.maximum = 6;
                chartObj.primaryXAxis.interval = 2;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking point render event', function (done) {
                chartObj.pointRender = function (args) {
                    args.cancel = args.point.index != 3;
                };
                chartObj.loaded = function (args) {
                    svg = helper_1.getElement('containerSeriesGroup0');
                    expect(svg.childElementCount).toBe(2);
                    chartObj.pointRender = null;
                    done();
                };
                chartObj.series[0].showMean = true;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
        });
        describe('Box plot - checking marker, datalabel', function () {
            var chartObj;
            var elem;
            var point;
            var svg;
            var svg1;
            var loaded;
            var done;
            var currentPoint;
            beforeAll(function () {
                elem = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { valueType: 'Category', title: 'Department' },
                    primaryYAxis: { title: 'Age' },
                    series: [{
                            dataSource: [
                                { x: "Development", yValues: [22, 22, 23, 25, 25, 25, 26, 27, 27, 28, 28, 29, 30, 32, 34, 32, 34, 36, 35, 38] },
                                { x: "Testing", yValues: [22, 33, 23, 25, 26, 28, 29, 30, 34, 33, 32, 31, 50] },
                                { x: "HR", yValues: [22, 24, 25, 30, 32, 34, 36, 38, 39, 41, 35, 36, 40, 56] },
                                { x: "Finance", yValues: [26, 27, 28, 30, 32, 34, 35, 37, 35, 37, 45] },
                                { x: "R&D", yValues: [26, 27, 29, 32, 34, 35, 36, 37, 38, 39, 41, 43, 58] },
                                { x: "Sales", yValues: [27, 26, 28, 29, 29, 29, 32, 35, 32, 38, 53] },
                                { x: "Inventory", yValues: [21, 23, 24, 25, 26, 27, 28, 30, 34, 36, 38] },
                                { x: "Graphics", yValues: [26, 28, 29, 30, 32, 33, 35, 36, 52] },
                                { x: "Training", yValues: [28, 29, 30, 31, 32, 34, 35, 36] }
                            ],
                            xName: 'x', yName: 'yValues',
                            animation: { enable: false }, type: 'BoxAndWhisker',
                            marker: {
                                visible: true
                            }
                        },
                    ], width: '800',
                    legendSettings: { visible: false },
                    title: 'Employees age group in various departments',
                });
                chartObj.appendTo('#container');
                data_spec_1.unbindResizeEvents(chartObj);
            });
            afterAll(function () {
                chartObj.destroy();
                elem.remove();
            });
            it('Checking marker visibility true', function (done) {
                loaded = function (args) {
                    svg = helper_1.getElement('containerSymbolGroup0');
                    expect(svg.childElementCount).toBe(1);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking data label visibility', function (done) {
                chartObj.loaded = function (args) {
                    svg = helper_1.getElement('container_Series_0_Point_1_Symbol');
                    svg1 = helper_1.getElement('container_Series_0_Point_1_Text_5');
                    expect(+svg.getAttribute('cy') > +svg1.getAttribute('y')).toBe(true);
                    svg = helper_1.getElement('container_Series_0_Point_7_Symbol');
                    svg1 = helper_1.getElement('container_Series_0_Point_7_Text_5');
                    expect(+svg.getAttribute('cy') > +svg1.getAttribute('y')).toBe(true);
                    done();
                };
                chartObj.series[0].marker.dataLabel.visible = true;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking data label visibility with inversed axis', function (done) {
                chartObj.loaded = function (args) {
                    svg = helper_1.getElement('container_Series_0_Point_1_Symbol');
                    svg1 = helper_1.getElement('container_Series_0_Point_1_Text_5');
                    expect(+svg.getAttribute('cy') < +svg1.getAttribute('y')).toBe(true);
                    svg = helper_1.getElement('container_Series_0_Point_7_Symbol');
                    svg1 = helper_1.getElement('container_Series_0_Point_7_Text_5');
                    expect(+svg.getAttribute('cy') < +svg1.getAttribute('y')).toBe(true);
                    done();
                };
                chartObj.primaryYAxis.isInversed = true;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking data label postioin as top', function (done) {
                chartObj.loaded = function (args) {
                    svg = helper_1.getElement('container_Series_0_Point_1_Symbol');
                    svg1 = helper_1.getElement('container_Series_0_Point_1_Text_5');
                    expect(+svg.getAttribute('cy') > +svg1.getAttribute('y')).toBe(true);
                    svg = helper_1.getElement('container_Series_0_Point_7_Symbol');
                    svg1 = helper_1.getElement('container_Series_0_Point_7_Text_5');
                    expect(+svg.getAttribute('cy') > +svg1.getAttribute('y')).toBe(true);
                    done();
                };
                chartObj.primaryYAxis.isInversed = false;
                chartObj.series[0].marker.dataLabel.position = 'Top';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking data label present in isTransposed true', function (done) {
                chartObj.loaded = function (args) {
                    var dataLabel = document.getElementById('container_Series_0_Point_0_Text_0');
                    expect(dataLabel).not.toBe(null);
                    dataLabel = document.getElementById('container_Series_0_Point_0_Text_1');
                    expect(dataLabel).not.toBe(null);
                    dataLabel = document.getElementById('container_Series_0_Point_0_Text_2');
                    expect(dataLabel).not.toBe(null);
                    dataLabel = document.getElementById('container_Series_0_Point_0_Text_3');
                    expect(dataLabel).not.toBe(null);
                    dataLabel = document.getElementById('container_Series_0_Point_0_Text_4');
                    expect(dataLabel).not.toBe(null);
                    dataLabel = document.getElementById('container_Series_0_Point_1_Text_0');
                    expect(dataLabel).not.toBe(null);
                    done();
                };
                chartObj.isTransposed = true;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking data label postioin as auto', function (done) {
                chartObj.loaded = function (args) {
                    svg = helper_1.getElement('container_Series_0_Point_1_Symbol');
                    svg1 = helper_1.getElement('container_Series_0_Point_1_Text_5');
                    expect(+svg.getAttribute('cy') > +svg1.getAttribute('y')).toBe(true);
                    svg = helper_1.getElement('container_Series_0_Point_7_Symbol');
                    svg1 = helper_1.getElement('container_Series_0_Point_7_Text_5');
                    expect(+svg.getAttribute('cy') > +svg1.getAttribute('y')).toBe(true);
                    done();
                };
                chartObj.isTransposed = false;
                chartObj.series[0].marker.dataLabel.position = 'Auto';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking data label postioin as bottom', function (done) {
                chartObj.loaded = function (args) {
                    svg = helper_1.getElement('container_Series_0_Point_1_Symbol');
                    svg1 = helper_1.getElement('container_Series_0_Point_1_Text_5');
                    expect(+svg.getAttribute('cy') < +svg1.getAttribute('y')).toBe(true);
                    svg = helper_1.getElement('container_Series_0_Point_7_Symbol');
                    svg1 = helper_1.getElement('container_Series_0_Point_7_Text_5');
                    expect(+svg.getAttribute('cy') < +svg1.getAttribute('y')).toBe(true);
                    done();
                };
                chartObj.series[0].marker.dataLabel.position = 'Bottom';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking data label postioin as middle', function (done) {
                chartObj.loaded = function (args) {
                    svg = helper_1.getElement('container_Series_0_Point_1_Symbol');
                    svg1 = helper_1.getElement('container_Series_0_Point_1_Text_5');
                    expect(+svg1.getAttribute('y') - +svg.getAttribute('cy') < 4).toBe(true);
                    svg = helper_1.getElement('container_Series_0_Point_7_Symbol');
                    svg1 = helper_1.getElement('container_Series_0_Point_7_Text_5');
                    expect(+svg1.getAttribute('y') - +svg.getAttribute('cy') < 4).toBe(true);
                    done();
                };
                chartObj.series[0].marker.dataLabel.position = 'Middle';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking data label postioin as outer', function (done) {
                chartObj.loaded = function (args) {
                    svg = helper_1.getElement('container_Series_0_Point_1_Symbol');
                    svg1 = helper_1.getElement('container_Series_0_Point_1_Text_5');
                    expect(+svg.getAttribute('cy') > +svg1.getAttribute('y')).toBe(true);
                    svg = helper_1.getElement('container_Series_0_Point_7_Symbol');
                    svg1 = helper_1.getElement('container_Series_0_Point_7_Text_5');
                    expect(+svg.getAttribute('cy') > +svg1.getAttribute('y')).toBe(true);
                    done();
                };
                chartObj.series[0].marker.dataLabel.position = 'Outer';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking data label alignment as near', function (done) {
                chartObj.loaded = function (args) {
                    svg = helper_1.getElement('container_Series_0_Point_1_Symbol');
                    svg1 = helper_1.getElement('container_Series_0_Point_1_Text_5');
                    expect(+svg.getAttribute('cy') < +svg1.getAttribute('y')).toBe(true);
                    svg = helper_1.getElement('container_Series_0_Point_7_Symbol');
                    svg1 = helper_1.getElement('container_Series_0_Point_7_Text_5');
                    expect(+svg.getAttribute('cy') < +svg1.getAttribute('y')).toBe(true);
                    done();
                };
                chartObj.series[0].marker.dataLabel.alignment = 'Near';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking data label alignment as far', function (done) {
                chartObj.loaded = function (args) {
                    svg = helper_1.getElement('container_Series_0_Point_1_Symbol');
                    svg1 = helper_1.getElement('container_Series_0_Point_1_Text_5');
                    expect(+svg.getAttribute('cy') > +svg1.getAttribute('y')).toBe(true);
                    svg = helper_1.getElement('container_Series_0_Point_7_Symbol');
                    svg1 = helper_1.getElement('container_Series_0_Point_7_Text_5');
                    expect(+svg.getAttribute('cy') > +svg1.getAttribute('y')).toBe(true);
                    done();
                };
                chartObj.series[0].marker.dataLabel.alignment = 'Center';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking data label with shape', function (done) {
                chartObj.loaded = function (args) {
                    svg = helper_1.getElement('containerShapeGroup0');
                    expect(svg.childElementCount == 31 || svg.childElementCount == 28).toBe(true);
                    done();
                };
                chartObj.series[0].marker.dataLabel.fill = 'red';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking data label with template', function (done) {
                chartObj.loaded = function (args) {
                    svg = helper_1.getElement('container_Series_0_DataLabelCollections');
                    expect(svg.childElementCount == 32 || svg.childElementCount == 28).toBe(true);
                    done();
                };
                chartObj.series[0].marker.dataLabel.template = '<div>${point.average}</div>';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
        });
        describe('Box plot - checking user interaction', function () {
            var chartObj;
            var elem;
            var point;
            var svg;
            var id = 'container';
            var selection = 'container_ej2_chart_selection_series_';
            var svg1;
            var targetElement;
            var draggedRectGroup = id + '_ej2_drag_rect';
            var trigger = new events_spec_1.MouseEvents();
            var x;
            var y;
            var loaded;
            var done;
            var currentPoint;
            beforeAll(function () {
                elem = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { valueType: 'Category', title: 'Department' },
                    primaryYAxis: { title: 'Age' },
                    series: [{
                            dataSource: [
                                { x: "Development", yValues: [22, 22, 23, 25, 25, 25, 26, 27, 27, 28, 28, 29, 30, 32, 34, 32, 34, 36, 35, 38] },
                                { x: "Testing", yValues: [22, 33, 23, 25, 26, 28, 29, 30, 34, 33, 32, 31, 50] },
                                { x: "HR", yValues: [22, 24, 25, 30, 32, 34, 36, 38, 39, 41, 35, 36, 40, 56] },
                                { x: "Finance", yValues: [26, 27, 28, 30, 32, 34, 35, 37, 35, 37, 45] },
                                { x: "R&D", yValues: [26, 27, 29, 32, 34, 35, 36, 37, 38, 39, 41, 43, 58] },
                                { x: "Sales", yValues: [27, 26, 28, 29, 29, 29, 32, 35, 32, 38, 53] },
                                { x: "Inventory", yValues: [21, 23, 24, 25, 26, 27, 28, 30, 34, 36, 38] },
                                { x: "Graphics", yValues: [26, 28, 29, 30, 32, 33, 35, 36, 52] },
                                { x: "Training", yValues: [28, 29, 30, 31, 32, 34, 35, 36] }
                            ],
                            xName: 'x', yName: 'yValues',
                            animation: { enable: false }, type: 'BoxAndWhisker',
                            marker: {
                                visible: true
                            }
                        },
                    ], width: '800',
                    legendSettings: { visible: false },
                    title: 'Employees age group in various departments',
                });
                chartObj.appendTo('#container');
                data_spec_1.unbindResizeEvents(chartObj);
            });
            afterAll(function () {
                chartObj.destroy();
                elem.remove();
            });
            it('Checking tooltip default - false', function (done) {
                loaded = function (args) {
                    targetElement = helper_1.getElement('container_Series_0_Point_1_Symbol');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(targetElement.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = parseFloat(targetElement.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(targetElement, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip == null).toBe(true);
                    svg = helper_1.getElement('container_Series_0_Point_1_Trackball_0');
                    expect(svg == null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking marker in hover', function (done) {
                loaded = function (args) {
                    targetElement = helper_1.getElement('container_Series_0_Point_1_BoxPath');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(targetElement.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = parseFloat(targetElement.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(targetElement, Math.ceil(x), Math.ceil(y));
                    var marker = document.getElementById('container_Series_0_Point_1_Symbol');
                    expect(marker == null).toBe(true);
                    done();
                };
                chartObj.series[0].marker.visible = false;
                chartObj.loaded = loaded;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking default tooltip', function (done) {
                chartObj.loaded = function (args) {
                    targetElement = helper_1.getElement('container_Series_0_Point_1_Symbol');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(targetElement.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = parseFloat(targetElement.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(targetElement, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    var group = tooltip.childNodes[0].childNodes[0];
                    var path = group.childNodes[0];
                    var text1 = group.childNodes[1];
                    var headerPath = group.childNodes[2];
                    expect(path.localName == 'path').toBe(true);
                    expect(path.getAttribute('d') != '' || ' ').toBe(true);
                    expect(headerPath.getAttribute('d') != '' || ' ').toBe(true);
                    expect(group.childNodes.length == 4).toBe(true);
                    expect(text1.textContent.replace(/\u200E/g, '') == 'TestingOutliers : 50').toBe(true);
                    svg = helper_1.getElement('container_Series_0_Point_1_Trackball_0');
                    expect(svg != null).toBe(true);
                    targetElement = helper_1.getElement('container_Series_0_Point_2_Symbol');
                    y = parseFloat(targetElement.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = parseFloat(targetElement.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(targetElement, Math.ceil(x), Math.ceil(y));
                    tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    done();
                };
                chartObj.series[0].marker.visible = true;
                chartObj.tooltip.enable = true;
                chartObj.series[0].marker.visible = true;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking default tooltip - maximum position', function (done) {
                chartObj.loaded = function (args) {
                    targetElement = helper_1.getElement('container_Series_0_Point_0_BoxPath');
                    var pathElements = targetElement.getAttribute('d').split(' ');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(pathElements[2]) + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = parseFloat(pathElements[5]) - 2 + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(targetElement, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    var group = tooltip.childNodes[0].childNodes[0];
                    var path = group.childNodes[0];
                    var text1 = group.childNodes[1];
                    expect(path.localName == 'path').toBe(true);
                    expect(path.getAttribute('d') != '' || ' ').toBe(true);
                    expect(group.childNodes.length == 4).toBe(true);
                    expect(text1.textContent.replace(/\u200E/g, '') == 'DevelopmentMaximum : 38Q3 : 33Median : 28Q1 : 25Minimum : 22').toBe(true);
                    done();
                };
                chartObj.tooltip.enable = true;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking default tooltip - maximum position - overlapped', function (done) {
                chartObj.loaded = function (args) {
                    targetElement = helper_1.getElement('container_Series_0_Point_3_BoxPath');
                    var pathElements = targetElement.getAttribute('d').split(' ');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(pathElements[57]) + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = parseFloat(pathElements[56]) + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(targetElement, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    var group = tooltip.childNodes[0].childNodes[0];
                    var path = group.childNodes[0];
                    var text1 = group.childNodes[1];
                    expect(path.localName == 'path').toBe(true);
                    expect(path.getAttribute('d') != '' || ' ').toBe(true);
                    expect(group.childNodes.length == 4).toBe(true);
                    expect(text1.textContent.replace(/\u200E/g, '') == 'FinanceMaximum : 45Q3 : 37Median : 34Q1 : 28Minimum : 26').toBe(true);
                    done();
                };
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking default tooltip - trackball', function (done) {
                chartObj.loaded = function (args) {
                    targetElement = helper_1.getElement('container_Series_0_Point_3_BoxPath');
                    var pathElements = targetElement.getAttribute('d').split(' ');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(pathElements[57]) + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = parseFloat(pathElements[56]) + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(targetElement, Math.ceil(x), Math.ceil(y));
                    var crosshair = document.getElementById('container_UserInteraction');
                    expect(crosshair.childNodes.length == 3).toBe(true);
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    var group = tooltip.childNodes[0].childNodes[0];
                    var path = group.childNodes[0];
                    var text1 = group.childNodes[1];
                    expect(path.localName == 'path').toBe(true);
                    expect(path.getAttribute('d') != '' || ' ').toBe(true);
                    expect(group.childNodes.length == 4).toBe(true);
                    expect(text1.textContent.replace(/\u200E/g, '') == 'FinanceMaximum : 45Q3 : 37Median : 34Q1 : 28Minimum : 26').toBe(true);
                    done();
                };
                chartObj.crosshair.enable = true;
                chartObj.crosshair.lineType = 'Vertical';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking default slection - false', function (done) {
                chartObj.loaded = function () {
                    svg = document.getElementById('container_Series_0_Point_0_BoxPath');
                    trigger.clickEvent(svg);
                    expect(document.getElementsByClassName(selection + '0').length).toBe(0);
                    done();
                };
                chartObj.crosshair.enable = false;
                chartObj.tooltip.enable = false;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking default slection - point mode', function (done) {
                chartObj.loaded = function () {
                    svg = document.getElementById('container_Series_0_Point_0_BoxPath');
                    trigger.clickEvent(svg);
                    svg = document.getElementById('container_Series_0_Point_1_BoxPath');
                    trigger.clickEvent(svg);
                    svg = document.getElementById('container_Series_0_Point_3_BoxPath');
                    trigger.clickEvent(svg);
                    expect(document.getElementsByClassName(selection + '0').length).toBe(1);
                    done();
                };
                chartObj.selectionMode = 'Point';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking default slection - series mode', function (done) {
                chartObj.loaded = function () {
                    svg = helper_1.getElement('container_Series_0_Point_0_BoxPath');
                    trigger.clickEvent(svg);
                    svg = document.getElementById('container_Series_0_Point_1_BoxPath');
                    trigger.clickEvent(svg);
                    for (var i = 0; i < 1; i++) {
                    }
                    done();
                };
                chartObj.selectionMode = 'Series';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('checking default slection - cluster mode', function (done) {
                chartObj.loaded = function () {
                    svg = helper_1.getElement('container_Series_0_Point_0_BoxPath');
                    trigger.clickEvent(svg);
                    svg = document.getElementById('container_Series_0_Point_1_BoxPath');
                    trigger.clickEvent(svg);
                    for (var i = 0; i < 1; i++) {
                        expect(document.getElementsByClassName(selection + i).length).toBe(2);
                    }
                    done();
                };
                chartObj.selectionMode = 'Cluster';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('MultiSelect true Selection Mode Point', function (done) {
                loaded = function () {
                    svg = document.getElementById('container_Series_0_Point_0_BoxPath');
                    trigger.clickEvent(svg);
                    svg = document.getElementById('container_Series_0_Point_1_BoxPath');
                    trigger.clickEvent(svg);
                    svg = document.getElementById('container_Series_0_Point_2_BoxPath');
                    trigger.clickEvent(svg);
                    svg = document.getElementById('container_Series_0_Point_3_BoxPath');
                    trigger.clickEvent(svg);
                    svg = document.getElementById('container_Series_0_Point_4_BoxPath');
                    trigger.clickEvent(svg);
                    for (var i = 0; i < 5; i++) {
                        svg = helper_1.getElement('container_Series_0_Point_' + i);
                        expect(svg.getAttribute('class')).toBe('container_ej2_chart_selection_series_0');
                    }
                    for (var i = 5; i < 9; i++) {
                        svg = helper_1.getElement('container_Series_0_Point_' + i);
                        expect(svg.getAttribute('class')).toBe('container_ej2_deselected');
                    }
                    done();
                };
                chartObj.selectionMode = 'Point';
                chartObj.isMultiSelect = true;
                chartObj.loaded = loaded;
                chartObj.selectionModule.selectedDataIndexes = [];
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Selection mode Drag moving', function (done) {
                loaded = function () {
                    trigger.draganddropEvent(elem, 100, 100, 300, 300);
                    trigger.touchdraganddropEvent(chartObj, elem, 150, 150, 200, 200);
                    svg = document.getElementById(draggedRectGroup);
                    expect(svg.getAttribute('x')).toEqual('142');
                    expect(svg.getAttribute('y')).toEqual('142');
                    expect(svg.getAttribute('height')).toEqual('200');
                    expect(svg.getAttribute('width')).toEqual('200');
                    svg = helper_1.getElement('container_Series_0_Point_' + 1);
                    expect(svg.getAttribute('class')).toBe('container_ej2_chart_selection_series_0');
                    svg = helper_1.getElement('container_Series_0_Point_' + 2);
                    expect(svg.getAttribute('class')).toBe('container_ej2_chart_selection_series_0');
                    svg = helper_1.getElement('container_Series_0_Point_' + 3);
                    expect(svg.getAttribute('class')).toBe('container_ej2_chart_selection_series_0');
                    done();
                };
                chartObj.selectionMode = 'DragXY';
                chartObj.loaded = loaded;
                chartObj.selectionModule.selectedDataIndexes = [];
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking mouse wheel zooming and selection', function (done) {
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
                    svg = document.getElementById('container_Series_0_Point_2_BoxPath');
                    trigger.clickEvent(svg);
                    var selected = document.getElementsByClassName('container_ej2_chart_selection_series_0 ');
                    trigger.clickEvent(svg);
                    selected = document.getElementsByClassName('container_ej2_chart_selection_series_0 ');
                    expect(selected.length).toBe(0);
                    done();
                };
                chartObj.selectionMode = 'Point';
                chartObj.zoomSettings.enableMouseWheelZooming = true;
                chartObj.loaded = loaded;
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
