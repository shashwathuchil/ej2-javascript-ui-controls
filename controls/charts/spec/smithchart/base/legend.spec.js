define(["require", "exports", "../../../src/smithchart/index", "@syncfusion/ej2-base", "../../common.spec"], function (require, exports, index_1, ej2_base_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    index_1.Smithchart.Inject(index_1.SmithchartLegend);
    describe('Smithchart legend properties tesing', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('Legend testing', function () {
            var id = 'legend';
            var smithchart;
            var ele;
            var spec;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: id, styles: 'height: 512px; width: 512px;' });
                document.body.appendChild(ele);
                smithchart = new index_1.Smithchart({
                    series: [{
                            points: [
                                { resistance: 0, reactance: 0.05 }, { resistance: 0, reactance: 0.05 },
                                { resistance: 0, reactance: 0.05 }, { resistance: 0, reactance: 0.05 },
                                { resistance: 0, reactance: 0.05 }, { resistance: 0.3, reactance: 0.1 },
                                { resistance: 0.3, reactance: 0.1 }, { resistance: 0.3, reactance: 0.1 },
                                { resistance: 0.3, reactance: 0.1 }, { resistance: 0.5, reactance: 0.2 },
                                { resistance: 1.0, reactance: 0.4 },
                                { resistance: 1.5, reactance: 0.5 }, { resistance: 2.0, reactance: 0.5 },
                                { resistance: 2.5, reactance: 0.4 }, { resistance: 3.5, reactance: 0.0 },
                                { resistance: 4.5, reactance: -0.5 }, { resistance: 5.0, reactance: -1.0 }
                            ],
                            fill: 'red',
                            name: 'Transmission1'
                        }, {
                            points: [
                                { resistance: 0, reactance: 0.15 }, { resistance: 0.3, reactance: 0.2 },
                                { resistance: 0.5, reactance: 0.4 }, { resistance: 1.0, reactance: 0.8 },
                                { resistance: 1.5, reactance: 1.0 }, { resistance: 2.0, reactance: 1.2 },
                                { resistance: 2.5, reactance: 1.3 }, { resistance: 3.5, reactance: 1.6 },
                                { resistance: 4.5, reactance: 2.0 }, { resistance: 6.0, reactance: 4.5 },
                                { resistance: 8, reactance: 6 }, { resistance: 10, reactance: 25 }
                            ],
                            name: 'Transmission2',
                            fill: 'blue'
                        }],
                    legendSettings: {
                        visible: true,
                    }
                }, '#' + id);
            });
            afterAll(function () {
                ej2_base_1.remove(ele);
                smithchart.destroy();
            });
            it('Checking with legend  with description', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_legend_group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.legendSettings.description = 'It represents to show and hide the legend series';
                smithchart.refresh();
            });
            it('Legend position as top', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_legend_group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.legendSettings.position = 'Top';
                smithchart.refresh();
            });
            it('Legend position as left', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_legend_group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.legendSettings.position = 'Left';
                smithchart.refresh();
            });
            it('Legend position as right', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_legend_group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.legendSettings.position = 'Right';
                smithchart.refresh();
            });
            it('Legend position as Bottom', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_legend_group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.legendSettings.position = 'Bottom';
                smithchart.refresh();
            });
            it('Legend alignment as Near - bottom position', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_legend_group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.legendSettings.alignment = 'Near';
                smithchart.refresh();
            });
            it('Legend alignment as Far - bottom position', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_legend_group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.legendSettings.alignment = 'Far';
                smithchart.refresh();
            });
            it('Legend alignment as Far - Left position', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_legend_group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.legendSettings.position = 'Left';
                smithchart.refresh();
            });
            it('Legend alignment as Near - left position', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_legend_group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.legendSettings.alignment = 'Near';
                smithchart.refresh();
            });
            it('Checking with legend size - left position', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_legend_group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.legendSettings.height = 300;
                smithchart.legendSettings.width = 300;
                smithchart.legendSettings.position = 'Left';
                smithchart.refresh();
            });
            it('Checking with legend size - top position', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_legend_group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.legendSettings.height = null;
                smithchart.legendSettings.width = null;
                smithchart.width = '300';
                smithchart.height = '200';
                smithchart.legendSettings.position = 'Top';
                smithchart.refresh();
            });
            it('Checking with legend size - bottom position', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_legend_group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.legendSettings.height = null;
                smithchart.legendSettings.width = null;
                smithchart.width = '180';
                smithchart.height = '200';
                smithchart.legendSettings.position = 'Bottom';
                smithchart.refresh();
            });
            it('Checking with legend size - right position', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_legend_group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.legendSettings.height = null;
                smithchart.legendSettings.width = null;
                smithchart.width = '500';
                smithchart.height = '500';
                smithchart.legendSettings.position = 'Right';
                smithchart.refresh();
            });
            it('Checking with legend item padding', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_legend_group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.legendSettings.itemPadding = 0;
                smithchart.refresh();
            });
            it('Legend position as custom without location', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_legend_group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.legendSettings.position = 'Custom';
                smithchart.refresh();
            });
            it('Legend position as custom', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_legend_group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.legendSettings.position = 'Custom';
                smithchart.legendSettings.location.x = 100;
                smithchart.legendSettings.location.y = 200;
                smithchart.refresh();
            });
            it('Checking with legend title', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_legend_group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.legendSettings.title.text = 'legendgroup';
                smithchart.refresh();
            });
            it('Checking with legend title with description', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_legend_group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.legendSettings.title.text = 'legendgroup';
                smithchart.legendSettings.title.description = 'It represents the legend title';
                smithchart.refresh();
            });
            it('Checking with rowCount with position as left ', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_legend_group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.legendSettings.rowCount = 2;
                smithchart.legendSettings.position = 'Left';
                smithchart.refresh();
            });
            it('Checking with columnCount with position as top', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_legend_group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.legendSettings.columnCount = 2;
                smithchart.legendSettings.position = 'Top';
                smithchart.refresh();
            });
            it('Checking with rowCount and columnCount', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_legend_group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.legendSettings.rowCount = 2;
                smithchart.legendSettings.columnCount = 2;
                smithchart.refresh();
            });
            it('Checking with rowCount and columnCount with position as top & legend title', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_legend_group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.legendSettings.rowCount = 1;
                smithchart.legendSettings.columnCount = 2;
                smithchart.legendSettings.title.text = 'legend';
                smithchart.legendSettings.position = 'Top';
                smithchart.refresh();
            });
            it('Checking with rowCount and columnCount with position as left & legend title', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_legend_group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.legendSettings.rowCount = 1;
                smithchart.legendSettings.columnCount = 2;
                smithchart.legendSettings.title.text = 'legend';
                smithchart.legendSettings.position = 'Left';
                smithchart.refresh();
            });
            it('Checking with rowCount greater than columnCount', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_legend_group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.legendSettings.rowCount = 2;
                smithchart.legendSettings.columnCount = 1;
                smithchart.refresh();
            });
            it('Checking with rowCount less than columnCount', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_legend_group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.legendSettings.rowCount = 1;
                smithchart.legendSettings.columnCount = 2;
                smithchart.refresh();
            });
            it('Legend shape as Rectangle ', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_legend_group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.legendSettings.shape = 'Rectangle';
                smithchart.refresh();
            });
            it('Legend shape as Triangle ', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_legend_group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.legendSettings.shape = 'Triangle';
                smithchart.refresh();
            });
            it('Legend shape as Pentagon ', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_legend_group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.legendSettings.shape = 'Pentagon';
                smithchart.refresh();
            });
            it('Legend shape as Diamond ', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_legend_group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.legendSettings.shape = 'Diamond';
                smithchart.refresh();
            });
            it('checking legend title with alignement far ', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_legend_group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.legendSettings.title.text = 'legendtitle';
                smithchart.legendSettings.title.textAlignment = 'Far';
                smithchart.refresh();
            });
            it('checking legend title with alignement Near ', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_legend_group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.legendSettings.title.text = 'legendtitle';
                smithchart.legendSettings.title.textAlignment = 'Near';
                smithchart.refresh();
            });
            it('checking legend title with alignement center ', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_legend_group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.legendSettings.title.text = 'smithchartlegendtitlegrouptextrendering';
                smithchart.legendSettings.title.textAlignment = 'Center';
                smithchart.refresh();
            });
            it('checking with legend without giving name to series', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_legend_group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.series[0].name = '';
                smithchart.series[1].name = '';
                smithchart.refresh();
            });
            it('checking with legend without giving color to series', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_legend_group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.series[0].fill = '';
                smithchart.series[1].fill = '';
                smithchart.refresh();
            });
            it('checking with series visibility as hidden', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_legend_group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.series[0].visibility = 'hidden';
                smithchart.refresh();
            });
            it('checking with legend visibility as false', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_series0_points');
                    var color = element.getAttribute('stroke');
                    expect(color).toEqual('#00bdae');
                };
                smithchart.legendSettings.visible = false;
                smithchart.refresh();
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
