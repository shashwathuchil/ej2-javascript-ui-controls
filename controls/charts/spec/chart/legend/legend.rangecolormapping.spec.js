define(["require", "exports", "../../../src/chart/index", "@syncfusion/ej2-base", "../base/events.spec", "../../../src/chart/user-interaction/high-light", "../../../src/chart/user-interaction/selection", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, index_1, ej2_base_1, events_spec_1, high_light_1, selection_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    index_1.Chart.Inject(index_1.LineSeries, index_1.SplineSeries, index_1.Legend, index_1.StepLineSeries, index_1.AreaSeries, index_1.StackingAreaSeries, index_1.StackingColumnSeries, index_1.ColumnSeries, index_1.BarSeries, selection_1.Selection, high_light_1.Highlight, index_1.RadarSeries, index_1.PolarSeries, index_1.DataLabel, index_1.StepAreaSeries, index_1.RangeColumnSeries, index_1.ErrorBar, index_1.Category, index_1.ScatterSeries, index_1.Logarithmic, index_1.DateTime);
    var i;
    var currentPoint;
    var value = 0;
    var data = [];
    var seriesCollection = [];
    var colors = ['#663AB6', '#EB3F79', '#F8AB1D', '#B82E3D', '#049CB1', '#F2424F', '#C2C924', '#3DA046', '#074D67', '#02A8F4'];
    var toggle = true;
    for (var j = 0; j < 1; j++) {
        seriesCollection[j] = {
            name: 'Series ' + j, fill: colors[j], dataSource: [
                { x: 'Point1', y: 73, size: 55 },
                { x: 'Point2', y: 50, size: 200 },
                { x: 'Point3', y: 75, size: 35 },
                { x: 'Point4', y: 80, size: 25 },
                { x: 'Point5', y: 56, size: 45 },
                { x: 'Point6', y: 60, size: 10 },
                { x: 'Point7', y: 41, size: 240 },
                { x: 'Point8', y: 45, size: 45 }
            ],
            xName: 'x', yName: 'y',
            marker: { visible: true, shape: 'Circle' },
            animation: { enable: false },
            legendShape: 'SeriesType', visible: toggle,
            type: 'Column'
        };
        data = [];
    }
    describe('Chart Range Color Mapping Legend', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('Range Color Mapping With Varies Legend Mode', function () {
            var count = 0;
            var chartObj;
            var loaded;
            var legendRendering;
            var id = 'container1';
            var legendId = id + '_chart_legend';
            var legendElement;
            var seriesElement;
            var trigger = new events_spec_1.MouseEvents();
            var value;
            var ele = ej2_base_1.createElement('div', { id: id });
            document.body.appendChild(ele);
            var series = [seriesCollection[0]];
            beforeAll(function () {
                chartObj = new index_1.Chart({
                    height: '400', width: '800',
                    primaryXAxis: { valueType: 'Category' },
                    series: series,
                    legendSettings: {
                        border: { color: 'red' }, visible: true
                    }
                });
                chartObj.appendTo(ele);
            });
            afterAll(function () {
                chartObj.destroy();
                document.getElementById(id).remove();
            });
            it('Series Legend mode', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    var legendContainer = document.getElementById(legendId + '_translate_g');
                    expect(chartObj.series.length).toEqual(legendContainer.childElementCount);
                    done();
                };
                chartObj.legendSettings.mode = 'Series';
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Point Legend mode', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    var legendContainer = document.getElementById(legendId + '_translate_g');
                    expect(chartObj.visibleSeries[0].points.length).toEqual(legendContainer.childElementCount);
                    done();
                };
                chartObj.legendSettings.mode = 'Point';
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Point Legend Mode- Legend Item Hide', function (done) {
                var currentPointLegend = chartObj.visibleSeries[0].points.length;
                legendElement = index_1.getElement(legendId + '_text_0');
                trigger.clickEvent(legendElement);
                setTimeout(function () {
                    var legendContainer = document.getElementById(legendId + '_translate_g');
                    expect(chartObj.visibleSeries[0].points[0].visible).toEqual(false);
                    done();
                }, 300);
            });
            it('Point Legend Mode- Legend Item Show', function (done) {
                var currentPointLegend = chartObj.visibleSeries[0].points.length;
                legendElement = index_1.getElement(legendId + '_text_0');
                trigger.clickEvent(legendElement);
                setTimeout(function () {
                    var legendContainer = document.getElementById(legendId + '_translate_g');
                    expect(chartObj.visibleSeries[0].points[0].visible).toEqual(true);
                    done();
                }, 300);
            });
            it('Range Legend mode with full range', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    var legendContainer = document.getElementById(legendId + '_translate_g');
                    console.log(legendId + '_translate_g');
                    expect(chartObj.rangeColorSettings.length).toEqual(legendContainer.childElementCount);
                    done();
                };
                chartObj.rangeColorSettings = [
                    {
                        start: 41,
                        end: 60.5,
                        label: '0 to 50',
                        colors: ['red']
                    },
                    {
                        start: 60.5,
                        end: 80,
                        label: '51 to 80',
                        colors: ['green']
                    },
                ];
                chartObj.legendSettings.mode = 'Range';
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Range Legend mode - legend Click', function (done) {
                var currentPointLegend = chartObj.visibleSeries[0].points.length;
                legendElement = index_1.getElement(legendId + '_text_0');
                trigger.clickEvent(legendElement);
                setTimeout(function () {
                    var legendContainer = document.getElementById(legendId + '_translate_g');
                    expect(chartObj.visibleSeries[0].points[0].visible).toEqual(false);
                    expect(chartObj.visibleSeries[0].points[2].visible).toEqual(false);
                    expect(chartObj.visibleSeries[0].points[3].visible).toEqual(false);
                    done();
                }, 300);
            });
            it('Range Legend mode - legend Click', function (done) {
                var currentPointLegend = chartObj.visibleSeries[0].points.length;
                legendElement = index_1.getElement(legendId + '_text_0');
                trigger.clickEvent(legendElement);
                setTimeout(function () {
                    var legendContainer = document.getElementById(legendId + '_translate_g');
                    expect(chartObj.visibleSeries[0].points[0].visible).toEqual(true);
                    expect(chartObj.visibleSeries[0].points[2].visible).toEqual(true);
                    expect(chartObj.visibleSeries[0].points[3].visible).toEqual(true);
                    done();
                }, 300);
            });
            it('Range Legend mode with missing range', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    var legendContainer = document.getElementById(legendId + '_translate_g');
                    expect(2).toEqual(legendContainer.childElementCount);
                    done();
                };
                chartObj.rangeColorSettings = [
                    {
                        start: 0,
                        end: 50,
                        label: '0 to 50',
                        colors: ['red']
                    }
                ];
                chartObj.legendSettings.mode = 'Range';
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Gradient Legend mode with full range', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    var legendContainer = document.getElementById(legendId + '_translate_g');
                    expect(4).toEqual(legendContainer.childElementCount);
                    done();
                };
                chartObj.rangeColorSettings = [
                    {
                        start: 41,
                        end: 60.5,
                        label: '0 to 60.5',
                        colors: ['red', 'yellow']
                    },
                    {
                        start: 60.5,
                        end: 80,
                        label: '60.5 to 80',
                        colors: ['yellow', 'green']
                    },
                ];
                chartObj.legendSettings.mode = 'Gradient';
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Range Legend mode with missing range', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    var legendContainer = document.getElementById(legendId + '_translate_g');
                    expect(4).toEqual(legendContainer.childElementCount);
                    done();
                };
                chartObj.rangeColorSettings = [
                    {
                        start: 0,
                        end: 50,
                        label: '0 to 50',
                        colors: ['red', 'green']
                    }
                ];
                chartObj.legendSettings.mode = 'Gradient';
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Range Legend mode with point fill color', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    for (var _i = 0, _a = chartObj.visibleSeries[0].points; _i < _a.length; _i++) {
                        var point = _a[_i];
                        if (point.y <= 60.5 && point.y >= 41) {
                            expect(point.interior).toEqual('red');
                        }
                        else if (point.y <= 80 && point.y >= 60.5) {
                            expect(point.interior).toEqual('green');
                        }
                    }
                    done();
                };
                chartObj.rangeColorSettings = [
                    {
                        start: 41,
                        end: 60.5,
                        label: '0 to 50',
                        colors: ['red']
                    },
                    {
                        start: 60.5,
                        end: 80,
                        label: '51 to 80',
                        colors: ['green']
                    },
                ];
                chartObj.legendSettings.mode = 'Range';
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Range Legend mode with point fill & series fill ', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    for (var _i = 0, _a = chartObj.visibleSeries[0].points; _i < _a.length; _i++) {
                        var point = _a[_i];
                        if (point.y <= 60.5 && point.y >= 41) {
                            expect(point.interior).toEqual('red');
                        }
                        else {
                            expect(point.interior).toBeUndefined();
                        }
                    }
                    done();
                };
                chartObj.rangeColorSettings = [
                    {
                        start: 41,
                        end: 60.5,
                        label: '0 to 50',
                        colors: ['red']
                    }
                ];
                chartObj.legendSettings.mode = 'Range';
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Gradient Legend mode with point fill color', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    for (var _i = 0, _a = chartObj.visibleSeries[0].points; _i < _a.length; _i++) {
                        var point = _a[_i];
                        if (point.y === 41) {
                            expect(point.interior).toEqual('#fd2e57');
                        }
                        else if (point.y === 60.5) {
                            expect(point.interior).toEqual('#e5ed00');
                        }
                        else if (point.y === 80) {
                            expect(point.interior).toEqual('#4cd766');
                        }
                        else if (point.y === 50) {
                            expect(point.interior).toEqual('#f2862f');
                        }
                        else if (point.y === 75) {
                            expect(point.interior).toEqual('#73dd4c');
                        }
                    }
                    done();
                };
                chartObj.rangeColorSettings = [
                    {
                        start: 41,
                        end: 60.5,
                        label: '0 to 60.5',
                        colors: ['#fd2e57', '#e5ed00']
                    },
                    {
                        start: 60.5,
                        end: 80,
                        label: '60.5 to 80',
                        colors: ['#e5ed00', '#4cd766']
                    },
                ];
                chartObj.legendSettings.mode = 'Gradient';
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Gradient with multiple colors', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    for (var _i = 0, _a = chartObj.visibleSeries[0].points; _i < _a.length; _i++) {
                        var point = _a[_i];
                        if (point.y === 41) {
                            expect(point.interior).toEqual('#fd2e57');
                        }
                        else if (point.y === 60.5) {
                            expect(point.interior).toEqual('#e5ed00');
                        }
                        else if (point.y === 80) {
                            expect(point.interior).toEqual('#4cd766');
                        }
                    }
                    done();
                };
                chartObj.rangeColorSettings = [
                    {
                        start: 41,
                        end: 80,
                        label: '0 to 60.5',
                        colors: ['#fd2e57', '#e5ed00', '#4cd766']
                    }
                ];
                chartObj.legendSettings.mode = 'Gradient';
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
        });
    });
});
