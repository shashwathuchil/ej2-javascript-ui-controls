define(["require", "exports", "@syncfusion/ej2-base", "../../../src/chart/chart", "../../../src/common/utils/helper", "../../../src/chart/series/data-label", "../../../src/chart/legend/legend", "../../../src/chart/series/column-series", "../../../src/chart/series/stacking-column-series", "../../common.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, chart_1, helper_1, data_label_1, legend_1, column_series_1, stacking_column_series_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(column_series_1.ColumnSeries, stacking_column_series_1.StackingColumnSeries, data_label_1.DataLabel, legend_1.Legend);
    describe('Chart Control', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('Chart Bar series', function () {
            var chartObj;
            var elem;
            var point;
            var svg;
            var targetElement;
            var loaded;
            var done;
            var dataLabel;
            var x;
            var y;
            var loaded1;
            var material = ['#00bdae', '#404041', '#357cd2', '#e56590', '#f8b883',
                '#70ad47', '#dd8abd', '#7f84e8', '#7bb4eb', '#ea7a57'];
            var fabric = ['#4472c4', '#ed7d31', '#ffc000', '#70ad47', '#5b9bd5',
                '#c1c1c1', '#6f6fe2', '#e269ae', '#9e480e', '#997300'];
            var paletteColor = ['#005378', '#006691', '#007EB5', '#0D97D4', '#00AEFF',
                '#14B9FF', '#54CCFF', '#87DBFF', '#ADE5FF', '#C5EDFF'];
            var bootstrap = ['#a16ee5', '#f7ce69', '#55a5c2', '#7ddf1e', '#ff6ea6',
                '#7953ac', '#b99b4f', '#407c92', '#5ea716', '#b91c52'];
            var highContrast = ['#79ECE4', '#E98272', '#DFE6B6', '#C6E773', '#BA98FF',
                '#FA83C3', '#00C27A', '#43ACEF', '#D681EF', '#D8BC6E'];
            beforeAll(function () {
                elem = ej2_base_1.createElement('div', { id: 'theme' });
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { minimum: 0.5, maximum: 1.5, interval: 1 },
                    primaryYAxis: { minimum: 0, maximum: 25, interval: 5 },
                    series: [{
                            dataSource: [{ x: 1, y: 16 }], xName: 'x', yName: 'y', animation: { enable: false }, type: 'Column',
                            name: 'USA', marker: { dataLabel: { visible: true, fill: material[0] } }
                        }, {
                            dataSource: [{ x: 1, y: 17 }], xName: 'x', yName: 'y', animation: { enable: false }, type: 'Column',
                            name: 'GBR', marker: { dataLabel: { visible: true, fill: material[1] } }
                        }, {
                            dataSource: [{ x: 1, y: 16 }], xName: 'x', yName: 'y', animation: { enable: false }, type: 'Column',
                            name: 'CHN', marker: { dataLabel: { visible: true, fill: material[2] } }
                        }, {
                            dataSource: [{ x: 1, y: 19 }], xName: 'x', yName: 'y', animation: { enable: false }, type: 'Column',
                            name: 'RUS', marker: { dataLabel: { visible: true, fill: material[3] } }
                        }, {
                            dataSource: [{ x: 1, y: 17 }], xName: 'x', yName: 'y', animation: { enable: false }, type: 'Column',
                            name: 'GER', marker: { dataLabel: { visible: true, fill: material[4] } }
                        }, {
                            dataSource: [{ x: 1, y: 12 }], xName: 'x', yName: 'y', animation: { enable: false }, type: 'Column',
                            name: 'JAP', marker: { dataLabel: { visible: true, fill: material[5] } }
                        }, {
                            dataSource: [{ x: 1, y: 10 }], xName: 'x', yName: 'y', animation: { enable: false }, type: 'Column',
                            name: 'FRN', marker: { dataLabel: { visible: true, fill: material[6] } }
                        }, {
                            dataSource: [{ x: 1, y: 18 }], xName: 'x', yName: 'y', animation: { enable: false }, type: 'Column',
                            name: 'IND', marker: { dataLabel: { visible: true, fill: material[7] } }
                        }, {
                            dataSource: [{ x: 1, y: 10 }], xName: 'x', yName: 'y', animation: { enable: false }, type: 'Column',
                            name: 'AUS', marker: { dataLabel: { visible: true, fill: material[8] } }
                        }, {
                            dataSource: [{ x: 1, y: 15 }], xName: 'x', yName: 'y', animation: { enable: false }, type: 'Column',
                            name: 'NZ', marker: { dataLabel: { visible: true, fill: material[9] } }
                        }, {
                            dataSource: [{ x: 1, y: 19 }], xName: 'x', yName: 'y', animation: { enable: false }, type: 'Column',
                            name: 'PAK', marker: { dataLabel: { visible: true, fill: material[0] } }
                        }, {
                            dataSource: [{ x: 1, y: 19 }], xName: 'x', yName: 'y', animation: { enable: false }, type: 'Column',
                            name: 'SPN', marker: { dataLabel: { visible: true, fill: material[1] } }
                        }
                    ], width: '950',
                    legendSettings: { visible: true },
                    title: 'Series Palette'
                });
            });
            afterAll(function () {
                chartObj.destroy();
                elem.remove();
            });
            it('Checking with default pattern color', function (done) {
                loaded = function (args) {
                    var prefix = 'theme_Series_';
                    var suffix = '_Point_0';
                    expect(helper_1.getElement(prefix + 0 + suffix).getAttribute('fill')).toBe(material[0]);
                    expect(helper_1.getElement(prefix + 1 + suffix).getAttribute('fill')).toBe(material[1]);
                    expect(helper_1.getElement(prefix + 2 + suffix).getAttribute('fill')).toBe(material[2]);
                    expect(helper_1.getElement(prefix + 3 + suffix).getAttribute('fill')).toBe(material[3]);
                    expect(helper_1.getElement(prefix + 4 + suffix).getAttribute('fill')).toBe(material[4]);
                    expect(helper_1.getElement(prefix + 5 + suffix).getAttribute('fill')).toBe(material[5]);
                    expect(helper_1.getElement(prefix + 6 + suffix).getAttribute('fill')).toBe(material[6]);
                    expect(helper_1.getElement(prefix + 7 + suffix).getAttribute('fill')).toBe(material[7]);
                    expect(helper_1.getElement(prefix + 8 + suffix).getAttribute('fill')).toBe(material[8]);
                    expect(helper_1.getElement(prefix + 9 + suffix).getAttribute('fill')).toBe(material[9]);
                    expect(helper_1.getElement(prefix + 10 + suffix).getAttribute('fill')).toBe(material[0]);
                    expect(helper_1.getElement(prefix + 11 + suffix).getAttribute('fill')).toBe(material[1]);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.appendTo('#theme');
            });
            it('Checking with legend color', function (done) {
                loaded = function (args) {
                    var prefix = 'theme_chart_legend_shape_';
                    expect(helper_1.getElement(prefix + 0).getAttribute('fill')).toBe(material[0]);
                    expect(helper_1.getElement(prefix + 1).getAttribute('fill')).toBe(material[1]);
                    expect(helper_1.getElement(prefix + 2).getAttribute('fill')).toBe(material[2]);
                    expect(helper_1.getElement(prefix + 3).getAttribute('fill')).toBe(material[3]);
                    expect(helper_1.getElement(prefix + 4).getAttribute('fill')).toBe(material[4]);
                    expect(helper_1.getElement(prefix + 5).getAttribute('fill')).toBe(material[5]);
                    expect(helper_1.getElement(prefix + 6).getAttribute('fill')).toBe(material[6]);
                    expect(helper_1.getElement(prefix + 7).getAttribute('fill')).toBe(material[7]);
                    expect(helper_1.getElement(prefix + 8).getAttribute('fill')).toBe(material[8]);
                    expect(helper_1.getElement(prefix + 9).getAttribute('fill')).toBe(material[9]);
                    expect(helper_1.getElement(prefix + 10).getAttribute('fill')).toBe(material[0]);
                    expect(helper_1.getElement(prefix + 11).getAttribute('fill')).toBe(material[1]);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking with fabric theme color', function (done) {
                loaded = function (args) {
                    var prefix = 'theme_Series_';
                    var suffix = '_Point_0';
                    expect(helper_1.getElement(prefix + 0 + suffix).getAttribute('fill')).toBe(fabric[0]);
                    expect(helper_1.getElement(prefix + 1 + suffix).getAttribute('fill')).toBe(fabric[1]);
                    expect(helper_1.getElement(prefix + 2 + suffix).getAttribute('fill')).toBe(fabric[2]);
                    expect(helper_1.getElement(prefix + 3 + suffix).getAttribute('fill')).toBe(fabric[3]);
                    expect(helper_1.getElement(prefix + 4 + suffix).getAttribute('fill')).toBe(fabric[4]);
                    expect(helper_1.getElement(prefix + 5 + suffix).getAttribute('fill')).toBe(fabric[5]);
                    expect(helper_1.getElement(prefix + 6 + suffix).getAttribute('fill')).toBe(fabric[6]);
                    expect(helper_1.getElement(prefix + 7 + suffix).getAttribute('fill')).toBe(fabric[7]);
                    expect(helper_1.getElement(prefix + 8 + suffix).getAttribute('fill')).toBe(fabric[8]);
                    expect(helper_1.getElement(prefix + 9 + suffix).getAttribute('fill')).toBe(fabric[9]);
                    expect(helper_1.getElement(prefix + 10 + suffix).getAttribute('fill')).toBe(fabric[0]);
                    expect(helper_1.getElement(prefix + 11 + suffix).getAttribute('fill')).toBe(fabric[1]);
                    done();
                };
                chartObj.theme = 'Fabric';
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking with highcontrast theme color', function (done) {
                loaded = function (args) {
                    var prefix = 'theme_Series_';
                    var suffix = '_Point_0';
                    expect(helper_1.getElement(prefix + 0 + suffix).getAttribute('fill')).toBe(highContrast[0]);
                    expect(helper_1.getElement(prefix + 1 + suffix).getAttribute('fill')).toBe(highContrast[1]);
                    expect(helper_1.getElement(prefix + 2 + suffix).getAttribute('fill')).toBe(highContrast[2]);
                    expect(helper_1.getElement(prefix + 3 + suffix).getAttribute('fill')).toBe(highContrast[3]);
                    expect(helper_1.getElement(prefix + 4 + suffix).getAttribute('fill')).toBe(highContrast[4]);
                    expect(helper_1.getElement(prefix + 5 + suffix).getAttribute('fill')).toBe(highContrast[5]);
                    expect(helper_1.getElement(prefix + 6 + suffix).getAttribute('fill')).toBe(highContrast[6]);
                    expect(helper_1.getElement(prefix + 7 + suffix).getAttribute('fill')).toBe(highContrast[7]);
                    expect(helper_1.getElement(prefix + 8 + suffix).getAttribute('fill')).toBe(highContrast[8]);
                    expect(helper_1.getElement(prefix + 9 + suffix).getAttribute('fill')).toBe(highContrast[9]);
                    expect(helper_1.getElement(prefix + 10 + suffix).getAttribute('fill')).toBe(highContrast[0]);
                    expect(helper_1.getElement(prefix + 11 + suffix).getAttribute('fill')).toBe(highContrast[1]);
                    done();
                };
                chartObj.theme = 'HighContrastLight';
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking with bootstrap theme color', function (done) {
                loaded = function (args) {
                    var prefix = 'theme_Series_';
                    var suffix = '_Point_0';
                    expect(helper_1.getElement(prefix + 0 + suffix).getAttribute('fill')).toBe(bootstrap[0]);
                    expect(helper_1.getElement(prefix + 1 + suffix).getAttribute('fill')).toBe(bootstrap[1]);
                    expect(helper_1.getElement(prefix + 2 + suffix).getAttribute('fill')).toBe(bootstrap[2]);
                    expect(helper_1.getElement(prefix + 3 + suffix).getAttribute('fill')).toBe(bootstrap[3]);
                    expect(helper_1.getElement(prefix + 4 + suffix).getAttribute('fill')).toBe(bootstrap[4]);
                    expect(helper_1.getElement(prefix + 5 + suffix).getAttribute('fill')).toBe(bootstrap[5]);
                    expect(helper_1.getElement(prefix + 6 + suffix).getAttribute('fill')).toBe(bootstrap[6]);
                    expect(helper_1.getElement(prefix + 7 + suffix).getAttribute('fill')).toBe(bootstrap[7]);
                    expect(helper_1.getElement(prefix + 8 + suffix).getAttribute('fill')).toBe(bootstrap[8]);
                    expect(helper_1.getElement(prefix + 9 + suffix).getAttribute('fill')).toBe(bootstrap[9]);
                    expect(helper_1.getElement(prefix + 10 + suffix).getAttribute('fill')).toBe(bootstrap[0]);
                    expect(helper_1.getElement(prefix + 11 + suffix).getAttribute('fill')).toBe(bootstrap[1]);
                    done();
                };
                chartObj.theme = 'Bootstrap';
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking with bootstrap4 theme color', function (done) {
                loaded = function (args) {
                    var prefix = 'theme_Series_';
                    var suffix = '_Point_0';
                    expect(helper_1.getElement(prefix + 0 + suffix).getAttribute('fill')).toBe(bootstrap[0]);
                    expect(helper_1.getElement(prefix + 1 + suffix).getAttribute('fill')).toBe(bootstrap[1]);
                    expect(helper_1.getElement(prefix + 2 + suffix).getAttribute('fill')).toBe(bootstrap[2]);
                    expect(helper_1.getElement(prefix + 3 + suffix).getAttribute('fill')).toBe(bootstrap[3]);
                    expect(helper_1.getElement(prefix + 4 + suffix).getAttribute('fill')).toBe(bootstrap[4]);
                    expect(helper_1.getElement(prefix + 5 + suffix).getAttribute('fill')).toBe(bootstrap[5]);
                    expect(helper_1.getElement(prefix + 6 + suffix).getAttribute('fill')).toBe(bootstrap[6]);
                    expect(helper_1.getElement(prefix + 7 + suffix).getAttribute('fill')).toBe(bootstrap[7]);
                    expect(helper_1.getElement(prefix + 8 + suffix).getAttribute('fill')).toBe(bootstrap[8]);
                    expect(helper_1.getElement(prefix + 9 + suffix).getAttribute('fill')).toBe(bootstrap[9]);
                    expect(helper_1.getElement(prefix + 10 + suffix).getAttribute('fill')).toBe(bootstrap[0]);
                    expect(helper_1.getElement(prefix + 11 + suffix).getAttribute('fill')).toBe(bootstrap[1]);
                    done();
                };
                chartObj.theme = 'Bootstrap4';
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking with fabric theme legend color', function (done) {
                loaded = function (args) {
                    var prefix = 'theme_chart_legend_shape_';
                    expect(helper_1.getElement(prefix + 0).getAttribute('fill')).toBe(fabric[0]);
                    expect(helper_1.getElement(prefix + 1).getAttribute('fill')).toBe(fabric[1]);
                    expect(helper_1.getElement(prefix + 2).getAttribute('fill')).toBe(fabric[2]);
                    expect(helper_1.getElement(prefix + 3).getAttribute('fill')).toBe(fabric[3]);
                    expect(helper_1.getElement(prefix + 4).getAttribute('fill')).toBe(fabric[4]);
                    expect(helper_1.getElement(prefix + 5).getAttribute('fill')).toBe(fabric[5]);
                    expect(helper_1.getElement(prefix + 6).getAttribute('fill')).toBe(fabric[6]);
                    expect(helper_1.getElement(prefix + 7).getAttribute('fill')).toBe(fabric[7]);
                    expect(helper_1.getElement(prefix + 8).getAttribute('fill')).toBe(fabric[8]);
                    expect(helper_1.getElement(prefix + 9).getAttribute('fill')).toBe(fabric[9]);
                    expect(helper_1.getElement(prefix + 10).getAttribute('fill')).toBe(fabric[0]);
                    expect(helper_1.getElement(prefix + 11).getAttribute('fill')).toBe(fabric[1]);
                    done();
                };
                chartObj.theme = 'Fabric';
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking with dataLabel color', function (done) {
                loaded = function (args) {
                    var prefix = 'theme_Series_';
                    var suffix = '_Point_0_TextShape_0';
                    expect(helper_1.getElement(prefix + 0 + suffix).getAttribute('fill')).toBe(material[0]);
                    expect(helper_1.getElement(prefix + 1 + suffix).getAttribute('fill')).toBe(material[1]);
                    expect(helper_1.getElement(prefix + 2 + suffix).getAttribute('fill')).toBe(material[2]);
                    expect(helper_1.getElement(prefix + 3 + suffix).getAttribute('fill')).toBe(material[3]);
                    expect(helper_1.getElement(prefix + 4 + suffix).getAttribute('fill')).toBe(material[4]);
                    expect(helper_1.getElement(prefix + 5 + suffix).getAttribute('fill')).toBe(material[5]);
                    expect(helper_1.getElement(prefix + 6 + suffix).getAttribute('fill')).toBe(material[6]);
                    expect(helper_1.getElement(prefix + 7 + suffix).getAttribute('fill')).toBe(material[7]);
                    expect(helper_1.getElement(prefix + 8 + suffix).getAttribute('fill')).toBe(material[8]);
                    expect(helper_1.getElement(prefix + 9 + suffix).getAttribute('fill')).toBe(material[9]);
                    expect(helper_1.getElement(prefix + 10 + suffix).getAttribute('fill')).toBe(material[0]);
                    expect(helper_1.getElement(prefix + 11 + suffix).getAttribute('fill')).toBe(material[1]);
                    done();
                };
                chartObj.theme = 'Material';
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking palette while changing', function (done) {
                loaded = function (args) {
                    var prefix = 'theme_Series_';
                    var suffix = '_Point_0';
                    expect(helper_1.getElement(prefix + 0 + suffix).getAttribute('fill')).toBe(paletteColor[0]);
                    expect(helper_1.getElement(prefix + 1 + suffix).getAttribute('fill')).toBe(paletteColor[1]);
                    expect(helper_1.getElement(prefix + 2 + suffix).getAttribute('fill')).toBe(paletteColor[2]);
                    expect(helper_1.getElement(prefix + 3 + suffix).getAttribute('fill')).toBe(paletteColor[3]);
                    expect(helper_1.getElement(prefix + 4 + suffix).getAttribute('fill')).toBe(paletteColor[4]);
                    expect(helper_1.getElement(prefix + 5 + suffix).getAttribute('fill')).toBe(paletteColor[5]);
                    expect(helper_1.getElement(prefix + 6 + suffix).getAttribute('fill')).toBe(paletteColor[6]);
                    expect(helper_1.getElement(prefix + 7 + suffix).getAttribute('fill')).toBe(paletteColor[7]);
                    expect(helper_1.getElement(prefix + 8 + suffix).getAttribute('fill')).toBe(paletteColor[8]);
                    expect(helper_1.getElement(prefix + 9 + suffix).getAttribute('fill')).toBe(paletteColor[9]);
                    expect(helper_1.getElement(prefix + 10 + suffix).getAttribute('fill')).toBe(paletteColor[0]);
                    expect(helper_1.getElement(prefix + 11 + suffix).getAttribute('fill')).toBe(paletteColor[1]);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.palettes = paletteColor;
                chartObj.refresh();
            });
            it('Checking series fill', function (done) {
                loaded = function (args) {
                    var prefix = 'theme_Series_';
                    var suffix = '_Point_0';
                    expect(helper_1.getElement(prefix + 0 + suffix).getAttribute('fill')).toBe(paletteColor[0]);
                    expect(helper_1.getElement(prefix + 1 + suffix).getAttribute('fill')).toBe(paletteColor[1]);
                    expect(helper_1.getElement(prefix + 2 + suffix).getAttribute('fill')).toBe(paletteColor[2]);
                    expect(helper_1.getElement(prefix + 3 + suffix).getAttribute('fill')).toBe('violet');
                    expect(helper_1.getElement(prefix + 4 + suffix).getAttribute('fill')).toBe(paletteColor[4]);
                    expect(helper_1.getElement(prefix + 5 + suffix).getAttribute('fill')).toBe(paletteColor[5]);
                    expect(helper_1.getElement(prefix + 6 + suffix).getAttribute('fill')).toBe('grey');
                    expect(helper_1.getElement(prefix + 7 + suffix).getAttribute('fill')).toBe(paletteColor[7]);
                    expect(helper_1.getElement(prefix + 8 + suffix).getAttribute('fill')).toBe(paletteColor[8]);
                    expect(helper_1.getElement(prefix + 9 + suffix).getAttribute('fill')).toBe(paletteColor[9]);
                    expect(helper_1.getElement(prefix + 10 + suffix).getAttribute('fill')).toBe(paletteColor[0]);
                    expect(helper_1.getElement(prefix + 11 + suffix).getAttribute('fill')).toBe(paletteColor[1]);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[3].fill = 'violet';
                chartObj.series[6].fill = 'grey';
                chartObj.refresh();
            });
            it('Checking series fill with data bind', function (done) {
                loaded = function (args) {
                    var prefix = 'theme_Series_';
                    var suffix = '_Point_0';
                    expect(helper_1.getElement(prefix + 0 + suffix).getAttribute('fill')).toBe('violet');
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.palettes = ['violet'];
                chartObj.legendSettings.visible = false;
                chartObj.dataBind();
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
