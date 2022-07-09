define(["require", "exports", "@syncfusion/ej2-base", "../../common.spec", "../../../src/index", "../../../src/index"], function (require, exports, ej2_base_1, common_spec_1, index_1, index_2) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    index_2.Chart.Inject(index_1.DateTime, index_1.Category, index_1.MultiColoredLineSeries, index_2.MultiColoredAreaSeries, index_2.Legend);
    var colors = ["red", "green", "fuchsia", "crimson", "blue", null, "deepskyblue", "mediumvioletred", "violet", "peru", "gray", "deeppink", "navy"];
    var fill = ["red", "red", "red", "red", "blue", null, "blue", "blue", "blue", "peru", "peru", "deeppink", "navy"];
    var numericData = [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 4.1, 95.6, 54.4];
    var emptyData = [29.9, 71.5, 106.4, null, 144.0, 176.0, null, 148.5, 216.4, null, 95.6, 54.4];
    var categoryData = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
    var dataTimeData = [
        new Date(1998, 11, 11), new Date(1998, 12, 12),
        new Date(1998, 13, 13), new Date(1998, 14, 14),
        new Date(1998, 15, 15), new Date(1998, 16, 16),
        new Date(1998, 17, 17), new Date(1998, 18, 18),
        new Date(1998, 19, 19), new Date(1998, 20, 20),
        new Date(1998, 21, 21), new Date(1998, 22, 22)
    ];
    function getData(interiors, values, isEmpty) {
        var series1 = [];
        for (var i = 0; i < 12; i++) {
            var point = {
                XValue: values ? values[i] : i,
                YValue: isEmpty ? emptyData[i] : numericData[i], color: interiors[i % 16]
            };
            series1.push(point);
        }
        return series1;
    }
    describe('Chart Control Multi Colored Series', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('Multi Colored Line series - Point color mapping', function () {
            var chartObj;
            var loaded;
            var element;
            var chartElement;
            chartElement = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(chartElement);
                chartObj = new index_2.Chart({
                    series: [{
                            animation: { enable: false },
                            dataSource: getData(colors),
                            pointColorMapping: 'color',
                            width: 3,
                            xName: 'XValue', yName: 'YValue', name: 'India',
                            fill: '#E94649', type: 'MultiColoredLine',
                            marker: { visible: true, width: 10, height: 10 }
                        }],
                    width: '800',
                    title: 'Chart TS Title', loaded: loaded,
                    legendSettings: { visible: true }
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                chartElement.remove();
            });
            it('Checking the child Element count', function (done) {
                loaded = function (args) {
                    element = index_2.getElement('containerSeriesGroup0');
                    expect(element.childElementCount).toBe(12);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking Point Color with null', function () {
                var color;
                for (var i = 0; i < 11; i++) {
                    element = index_2.getElement('container_Series_0_Point_' + i);
                    color = colors[i] ? colors[i] : '#E94649';
                    expect(element.getAttribute('stroke')).toBe(color);
                }
            });
            it('Checking Point Color - marker', function () {
                var color;
                for (var i = 0; i < 12; i++) {
                    element = index_2.getElement('container_Series_0_Point_' + i + '_Symbol');
                    color = colors[i] ? colors[i] : '#E94649';
                    expect(element.getAttribute('stroke')).toBe(color);
                    expect(element.getAttribute('fill')).toBe('#ffffff');
                }
            });
            it('Checking the child Element count - Same Interior', function (done) {
                loaded = function (args) {
                    element = index_2.getElement('containerSeriesGroup0');
                    expect(element.childElementCount).toBe(6);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = getData(fill);
                chartObj.refresh();
            });
            it('Checking Point Color with null  - Same Interior', function () {
                element = index_2.getElement('container_Series_0_Point_3');
                expect(element.getAttribute('stroke')).toBe('red');
                element = index_2.getElement('container_Series_0_Point_4');
                expect(element.getAttribute('stroke')).toBe('blue');
                element = index_2.getElement('container_Series_0_Point_5');
                expect(element.getAttribute('stroke')).toBe('#E94649');
                element = index_2.getElement('container_Series_0_Point_8');
                expect(element.getAttribute('stroke')).toBe('blue');
                element = index_2.getElement('container_Series_0_Point_10');
                expect(element.getAttribute('stroke')).toBe('peru');
            });
            it('Checking Point Color - marker  - Same Interior', function () {
                var color;
                for (var i = 0; i < 12; i++) {
                    element = index_2.getElement('container_Series_0_Point_' + i + '_Symbol');
                    color = fill[i] ? fill[i] : '#E94649';
                    expect(element.getAttribute('stroke')).toBe(color);
                    expect(element.getAttribute('fill')).toBe('#ffffff');
                }
            });
        });
        describe('Multi Colored Area series - Point color mapping', function () {
            var chartObj;
            var loaded;
            var element;
            var chartElement;
            chartElement = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(chartElement);
                chartObj = new index_2.Chart({
                    series: [{
                            animation: { enable: false },
                            dataSource: getData(colors),
                            pointColorMapping: 'color',
                            width: 3,
                            xName: 'XValue', yName: 'YValue', name: 'India',
                            fill: '#E94649', type: 'MultiColoredArea',
                            marker: { visible: true, width: 10, height: 10 }
                        }],
                    width: '800',
                    title: 'Chart TS Title', loaded: loaded,
                    legendSettings: { visible: true }
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                chartElement.remove();
            });
            it('Checking the child Element count', function (done) {
                loaded = function (args) {
                    element = index_2.getElement('containerSeriesGroup0');
                    expect(element.childElementCount).toBe(12);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking Point Color with null', function () {
                var color;
                for (var i = 0; i < 11; i++) {
                    element = index_2.getElement('container_Series_0_Point_' + i);
                    color = colors[i] ? colors[i] : '#E94649';
                    expect(element.getAttribute('fill')).toBe(color);
                }
            });
            it('Checking Point Color - marker', function () {
                var color;
                for (var i = 0; i < 12; i++) {
                    element = index_2.getElement('container_Series_0_Point_' + i + '_Symbol');
                    color = colors[i] ? colors[i] : '#E94649';
                    expect(element.getAttribute('stroke')).toBe(color);
                    expect(element.getAttribute('fill')).toBe('#ffffff');
                }
            });
            it('Checking the child Element count - Same Interior', function (done) {
                loaded = function (args) {
                    element = index_2.getElement('containerSeriesGroup0');
                    expect(element.childElementCount).toBe(6);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = getData(fill);
                chartObj.refresh();
            });
            it('Checking Point Color with null  - Same Interior', function () {
                element = index_2.getElement('container_Series_0_Point_3');
                expect(element.getAttribute('fill')).toBe('red');
                element = index_2.getElement('container_Series_0_Point_4');
                expect(element.getAttribute('fill')).toBe('blue');
                element = index_2.getElement('container_Series_0_Point_5');
                expect(element.getAttribute('fill')).toBe('#E94649');
                element = index_2.getElement('container_Series_0_Point_8');
                expect(element.getAttribute('fill')).toBe('blue');
                element = index_2.getElement('container_Series_0_Point_10');
                expect(element.getAttribute('fill')).toBe('peru');
            });
            it('Checking Point Color - marker  - Same Interior', function () {
                var color;
                for (var i = 0; i < 12; i++) {
                    element = index_2.getElement('container_Series_0_Point_' + i + '_Symbol');
                    color = fill[i] ? fill[i] : '#E94649';
                    expect(element.getAttribute('stroke')).toBe(color);
                    expect(element.getAttribute('fill')).toBe('#ffffff');
                }
            });
        });
        describe('Line series Segments', function () {
            var chartObj;
            var loaded;
            var element;
            var chartElement;
            chartElement = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(chartElement);
                chartObj = new index_2.Chart({
                    series: [{
                            animation: { enable: false },
                            dataSource: getData(colors),
                            segments: [{
                                    color: 'orange',
                                    value: 50
                                }, {
                                    color: 'teal',
                                    value: 100
                                }, {
                                    color: 'yellow',
                                    value: 150
                                }],
                            segmentAxis: 'Y',
                            pointColorMapping: 'color',
                            width: 3,
                            xName: 'XValue', yName: 'YValue', name: 'India',
                            fill: '#E94649', type: 'MultiColoredLine',
                            marker: { visible: true, width: 10, height: 10 }
                        }],
                    width: '800',
                    title: 'Chart TS Title', loaded: loaded,
                    legendSettings: { visible: true }
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                chartElement.remove();
            });
            it('Checking the child Element count', function (done) {
                loaded = function (args) {
                    element = index_2.getElement('containerSeriesGroup0');
                    expect(element.childElementCount).toBe(12);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking segment without point color mapping', function (done) {
                loaded = function (args) {
                    element = index_2.getElement('containerSeriesGroup0');
                    expect(element.childElementCount).toBe(9);
                    element = index_2.getElement('container_Series_0_Segment_3');
                    expect(element.getAttribute('stroke')).toBe('#E94649');
                    element = index_2.getElement('container_Series_0_Segment_0');
                    expect(element.getAttribute('stroke')).toBe('orange');
                    element = index_2.getElement('container_Series_0_Segment_1');
                    expect(element.getAttribute('stroke')).toBe('teal');
                    element = index_2.getElement('container_Series_0_Segment_2');
                    expect(element.getAttribute('stroke')).toBe('yellow');
                    done();
                };
                chartObj.series[0].pointColorMapping = '';
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking segment - X Segment', function (done) {
                loaded = function (args) {
                    element = index_2.getElement('containerSeriesGroup0');
                    expect(element.childElementCount).toBe(5);
                    element = index_2.getElement('container_Series_0_Segment_0');
                    expect(element.getAttribute('stroke')).toBe('orange');
                    element = index_2.getElement('container_Series_0_Segment_1');
                    expect(element.getAttribute('stroke')).toBe('teal');
                    done();
                };
                chartObj.series[0].segments = [{
                        color: 'orange',
                        value: 5
                    }, {
                        color: 'teal'
                    }],
                    chartObj.series[0].segmentAxis = 'X';
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
        });
        describe('Area series Segments', function () {
            var chartObj;
            var loaded;
            var element;
            var chartElement;
            chartElement = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(chartElement);
                chartObj = new index_2.Chart({
                    series: [{
                            animation: { enable: false },
                            dataSource: getData(colors),
                            segments: [{
                                    color: 'orange',
                                    value: 50
                                }, {
                                    color: 'teal',
                                    value: 100
                                }, {
                                    color: 'yellow',
                                    value: 150
                                }],
                            segmentAxis: 'Y',
                            pointColorMapping: 'color',
                            width: 3,
                            xName: 'XValue', yName: 'YValue', name: 'India',
                            fill: '#E94649', type: 'MultiColoredArea',
                            marker: { visible: true, width: 10, height: 10 }
                        }],
                    width: '800',
                    title: 'Chart TS Title', loaded: loaded,
                    legendSettings: { visible: true }
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                chartElement.remove();
            });
            it('Checking the child Element count', function (done) {
                loaded = function (args) {
                    element = index_2.getElement('containerSeriesGroup0');
                    expect(element.childElementCount).toBe(12);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking segment without point color mapping', function (done) {
                loaded = function (args) {
                    element = index_2.getElement('containerSeriesGroup0');
                    expect(element.childElementCount).toBe(9);
                    element = index_2.getElement('container_Series_0_Segment_3');
                    expect(element.getAttribute('fill')).toBe('#E94649');
                    element = index_2.getElement('container_Series_0_Segment_0');
                    expect(element.getAttribute('fill')).toBe('orange');
                    element = index_2.getElement('container_Series_0_Segment_1');
                    expect(element.getAttribute('fill')).toBe('teal');
                    element = index_2.getElement('container_Series_0_Segment_2');
                    expect(element.getAttribute('fill')).toBe('yellow');
                    done();
                };
                chartObj.series[0].pointColorMapping = '';
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking segment - X Segment', function (done) {
                loaded = function (args) {
                    element = index_2.getElement('containerSeriesGroup0');
                    expect(element.childElementCount).toBe(5);
                    element = index_2.getElement('container_Series_0_Segment_0');
                    expect(element.getAttribute('fill')).toBe('orange');
                    element = index_2.getElement('container_Series_0_Segment_1');
                    expect(element.getAttribute('fill')).toBe('teal');
                    done();
                };
                chartObj.series[0].segments = [{
                        color: 'orange',
                        value: 5
                    }, {
                        color: 'teal'
                    }];
                chartObj.series[0].segmentAxis = 'X';
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
        });
        describe('Line series Segments - dateTime', function () {
            var chartObj;
            var loaded;
            var element;
            var chartElement;
            chartElement = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(chartElement);
                chartObj = new index_2.Chart({
                    primaryXAxis: { valueType: 'DateTime' },
                    series: [{
                            animation: { enable: false },
                            dataSource: getData(colors, dataTimeData),
                            segments: [{
                                    color: 'orange',
                                    value: new Date(1998, 15, 15)
                                }, {
                                    value: new Date(1998, 20, 20)
                                }, {
                                    color: 'yellow'
                                }],
                            segmentAxis: 'X',
                            pointColorMapping: 'color',
                            width: 3,
                            xName: 'XValue', yName: 'YValue', name: 'India',
                            fill: '#E94649', type: 'MultiColoredLine',
                            marker: { visible: true, width: 10, height: 10 }
                        }],
                    isTransposed: true,
                    width: '800',
                    title: 'Chart TS Title', loaded: loaded,
                    legendSettings: { visible: true }
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                chartElement.remove();
            });
            it('Checking the child Element count', function (done) {
                loaded = function (args) {
                    element = index_2.getElement('containerSeriesGroup0');
                    expect(element.childElementCount).toBe(12);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking segment without point color mapping', function (done) {
                loaded = function (args) {
                    element = index_2.getElement('containerSeriesGroup0');
                    expect(element.childElementCount).toBe(7);
                    element = index_2.getElement('container_Series_0_Segment_0');
                    expect(element.getAttribute('stroke')).toBe('orange');
                    element = index_2.getElement('container_Series_0_Segment_1');
                    expect(element.getAttribute('stroke')).toBe('#E94649');
                    element = index_2.getElement('container_Series_0_Segment_2');
                    expect(element.getAttribute('stroke')).toBe('yellow');
                    done();
                };
                chartObj.series[0].pointColorMapping = '';
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
        });
        describe('Checking sorting in segments', function () {
            var chartObj;
            var loaded;
            var element;
            var chartElement;
            chartElement = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(chartElement);
                chartObj = new index_2.Chart({
                    primaryXAxis: {
                        title: 'Year',
                        minimum: 2004, maximum: 2012, interval: 1
                    },
                    primaryYAxis: {
                        minimum: 20, maximum: 40, interval: 5,
                        title: 'Efficiency',
                        labelFormat: '{value}%'
                    },
                    series: [{
                            dataSource: [
                                { x: 2005, y: 28, color: 'red' }, { x: 2006, y: 25, color: 'green' }, { x: 2007, y: 26, color: 'fuchsia' },
                                { x: 2008, y: 27, color: 'crimson' },
                                { x: 2009, y: 32, color: 'blue' }, { x: 2010, y: 35, color: 'darkorange' }, { x: 2011, y: 30, color: 'red' }
                            ], width: 2,
                            xName: 'x', yName: 'y',
                            name: 'India',
                            marker: { visible: true },
                            type: 'MultiColoredLine', animation: { enable: false }
                        }],
                    title: 'Efficiency of oil-fired power production'
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                chartElement.remove();
            });
            it('Checking the child Element count', function (done) {
                loaded = function (args) {
                    element = index_2.getElement('containerSeriesGroup0');
                    expect(element.childElementCount).toBe(3);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking marker color', function (done) {
                loaded = function (args) {
                    element = index_2.getElement('containerSeriesGroup0');
                    expect(element.childElementCount).toBe(7);
                    element = index_2.getElement('container_Series_0_Point_0_Symbol');
                    expect(element.getAttribute('stroke') == 'green');
                    element = index_2.getElement('container_Series_0_Point_5_Symbol');
                    expect(element.getAttribute('stroke') == 'red');
                    done();
                };
                chartObj.series[0].segmentAxis = 'Y';
                chartObj.series[0].segments = [{
                        value: 35,
                        color: 'red'
                    }, {
                        value: 30,
                        color: 'green'
                    }, {
                        value: 40,
                        color: 'blue'
                    }];
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking marker color', function (done) {
                loaded = function (args) {
                    element = index_2.getElement('containerSeriesGroup0');
                    expect(element.childElementCount).toBe(5);
                    element = index_2.getElement('container_Series_0_Point_0_Symbol');
                    expect(element.getAttribute('stroke') == 'green');
                    element = index_2.getElement('container_Series_0_Point_5_Symbol');
                    expect(element.getAttribute('stroke') == 'blue');
                    done();
                };
                chartObj.series[0].segments = [{
                        value: 10,
                        color: 'red'
                    }, {
                        value: 30,
                        color: 'green'
                    }, {
                        value: 40,
                        color: 'blue'
                    }];
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
        });
        describe('Area series Segments - category', function () {
            var chartObj;
            var loaded;
            var element;
            var chartElement;
            chartElement = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(chartElement);
                chartObj = new index_2.Chart({
                    primaryXAxis: { valueType: 'Category' },
                    series: [{
                            animation: { enable: false },
                            dataSource: getData(colors, categoryData),
                            segments: [{
                                    color: 'orange',
                                    value: 'C'
                                }, {
                                    value: 7
                                }, {
                                    color: 'yellow'
                                }],
                            segmentAxis: 'X',
                            pointColorMapping: 'color',
                            width: 3,
                            xName: 'XValue', yName: 'YValue', name: 'India',
                            fill: '#E94649', type: 'MultiColoredArea',
                            marker: { visible: true, width: 10, height: 10 }
                        }],
                    width: '800',
                    title: 'Chart TS Title', loaded: loaded,
                    legendSettings: { visible: true }
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                chartElement.remove();
            });
            it('Checking the child Element count', function (done) {
                loaded = function (args) {
                    element = index_2.getElement('containerSeriesGroup0');
                    expect(element.childElementCount).toBe(12);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking segment without point color mapping', function (done) {
                loaded = function (args) {
                    element = index_2.getElement('containerSeriesGroup0');
                    expect(element.childElementCount).toBe(7);
                    element = index_2.getElement('container_Series_0_Segment_0');
                    expect(element.getAttribute('fill')).toBe('orange');
                    element = index_2.getElement('container_Series_0_Segment_1');
                    expect(element.getAttribute('fill')).toBe('#E94649');
                    element = index_2.getElement('container_Series_0_Segment_2');
                    expect(element.getAttribute('fill')).toBe('yellow');
                    done();
                };
                chartObj.series[0].pointColorMapping = '';
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
        });
        describe('Area series Segments - Empty points', function () {
            var chartObj;
            var loaded;
            var element;
            var chartElement;
            chartElement = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(chartElement);
                chartObj = new index_2.Chart({
                    primaryXAxis: { valueType: 'Category' },
                    series: [{
                            animation: { enable: false },
                            dataSource: getData(colors, categoryData, true),
                            pointColorMapping: 'color',
                            width: 3,
                            xName: 'XValue', yName: 'YValue', name: 'India',
                            fill: '#E94649', type: 'MultiColoredArea',
                            marker: { visible: true, width: 10, height: 10 }
                        }],
                    width: '800',
                    title: 'Chart TS Title', loaded: loaded,
                    legendSettings: { visible: true }
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                chartElement.remove();
            });
            it('Checking the child Element count', function (done) {
                loaded = function (args) {
                    element = index_2.getElement('containerSeriesGroup0');
                    expect(element.childElementCount).toBe(9);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking empty point as drop', function (done) {
                loaded = function (args) {
                    element = index_2.getElement('containerSeriesGroup0');
                    expect(element.childElementCount).toBe(9);
                    element = index_2.getElement('container_Series_0_Point_2');
                    expect(element.getAttribute('fill')).toBe('fuchsia');
                    element = index_2.getElement('container_Series_0_Point_3');
                    expect(element).toBe(null);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].emptyPointSettings.mode = 'Drop';
                chartObj.refresh();
            });
            it('Checking empty point as average', function (done) {
                loaded = function (args) {
                    var color;
                    for (var i = 0; i < 11; i++) {
                        element = index_2.getElement('container_Series_0_Point_' + i);
                        color = colors[i] ? colors[i] : '#E94649';
                        expect(element.getAttribute('fill')).toBe(color);
                    }
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].emptyPointSettings.mode = 'Average';
                chartObj.refresh();
            });
            it('Checking empty point as Zero', function (done) {
                loaded = function (args) {
                    var color;
                    for (var i = 0; i < 11; i++) {
                        element = index_2.getElement('container_Series_0_Point_' + i);
                        color = colors[i] ? colors[i] : '#E94649';
                        expect(element.getAttribute('fill')).toBe(color);
                    }
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].emptyPointSettings.mode = 'Zero';
                chartObj.refresh();
            });
        });
        describe('Line series Segments - Empty poinys', function () {
            var chartObj;
            var loaded;
            var element;
            var chartElement;
            chartElement = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(chartElement);
                chartObj = new index_2.Chart({
                    primaryXAxis: { valueType: 'Category' },
                    series: [{
                            animation: { enable: false },
                            dataSource: getData(colors, categoryData, true),
                            pointColorMapping: 'color',
                            width: 3,
                            xName: 'XValue', yName: 'YValue', name: 'India',
                            fill: '#E94649', type: 'MultiColoredLine',
                            marker: { visible: true, width: 10, height: 10 }
                        }],
                    width: '800',
                    title: 'Chart TS Title', loaded: loaded,
                    legendSettings: { visible: true }
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                chartElement.remove();
            });
            it('Checking the child Element count', function (done) {
                loaded = function (args) {
                    element = index_2.getElement('containerSeriesGroup0');
                    expect(element.childElementCount).toBe(6);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking empty point as drop', function (done) {
                loaded = function (args) {
                    element = index_2.getElement('containerSeriesGroup0');
                    expect(element.childElementCount).toBe(9);
                    element = index_2.getElement('container_Series_0_Point_2');
                    expect(element.getAttribute('stroke')).toBe('fuchsia');
                    element = index_2.getElement('container_Series_0_Point_3');
                    expect(element).toBe(null);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].emptyPointSettings.mode = 'Drop';
                chartObj.refresh();
            });
            it('Checking empty point as average', function (done) {
                loaded = function (args) {
                    var color;
                    for (var i = 0; i < 11; i++) {
                        element = index_2.getElement('container_Series_0_Point_' + i);
                        color = colors[i] ? colors[i] : '#E94649';
                        expect(element.getAttribute('stroke')).toBe(color);
                    }
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].emptyPointSettings.mode = 'Average';
                chartObj.refresh();
            });
            it('Checking empty point as Zero', function (done) {
                loaded = function (args) {
                    var color;
                    for (var i = 0; i < 11; i++) {
                        element = index_2.getElement('container_Series_0_Point_' + i);
                        color = colors[i] ? colors[i] : '#E94649';
                        expect(element.getAttribute('stroke')).toBe(color);
                    }
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].emptyPointSettings.mode = 'Zero';
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
