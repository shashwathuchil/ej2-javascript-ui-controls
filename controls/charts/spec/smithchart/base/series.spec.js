define(["require", "exports", "../../../src/smithchart/index", "@syncfusion/ej2-base", "../../common.spec"], function (require, exports, index_1, ej2_base_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    index_1.Smithchart.Inject(index_1.SmithchartLegend);
    describe('Smithchart Series properties tesing', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('Series testing', function () {
            var id = 'container';
            var smithchart;
            var ele;
            var spec;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: id, styles: 'height: 512px; width: 512px;' });
                document.body.appendChild(ele);
                smithchart = new index_1.Smithchart({
                    series: [
                        {
                            dataSource: [
                                { resistance: 0, reactance: 0.05 }, { resistance: 0, reactance: 0.05 },
                                { resistance: 0, reactance: 0.05 }, { resistance: 0, reactance: 0.05 },
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
                            resistance: 'resistance',
                            reactance: 'reactance',
                            marker: {
                                visible: true,
                                dataLabel: {
                                    visible: true,
                                    fill: 'red'
                                },
                                width: 10,
                                height: 10
                            }
                        },
                    ],
                }, '#' + id);
            });
            afterAll(function () {
                ej2_base_1.remove(ele);
                smithchart.destroy();
            });
            it('Checking with marker fill', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Series0_Points0_Marker0');
                    var color = element.getAttribute('fill');
                    expect(color).toEqual('red');
                };
                smithchart.series[0].marker.fill = 'red';
                smithchart.refresh();
            });
            it('Checking with marker shape as circle', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Series0_Points0_Marker0');
                    var color = element.getAttribute('fill');
                    expect(color).toEqual('red');
                };
                smithchart.series[0].marker.shape = 'Circle';
                smithchart.refresh();
            });
            it('Checking with marker shape as triangle', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Series0_Points0_Marker0');
                    var color = element.getAttribute('fill');
                    expect(color).toEqual('red');
                };
                smithchart.series[0].marker.shape = 'Triangle';
                smithchart.refresh();
            });
            it('Checking with marker shape as diamond', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Series0_Points0_Marker0');
                    var color = element.getAttribute('fill');
                    expect(color).toEqual('red');
                };
                smithchart.series[0].marker.shape = 'Diamond';
                smithchart.refresh();
            });
            it('Checking with marker shape as rectangle', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Series0_Points0_Marker0');
                    var color = element.getAttribute('fill');
                    expect(color).toEqual('red');
                };
                smithchart.series[0].marker.shape = 'Rectangle';
                smithchart.refresh();
            });
            it('Checking with marker shape as pentagon', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Series0_Points0_Marker0');
                    var color = element.getAttribute('fill');
                    expect(color).toEqual('red');
                };
                smithchart.series[0].marker.shape = 'Pentagon';
                smithchart.refresh();
            });
            it('Checking with series without series name', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Series0_Points0_Marker0');
                    var color = element.getAttribute('fill');
                    expect(color).toEqual('red');
                };
                smithchart.series[0].name = '';
                smithchart.refresh();
            });
            it('Checking with datalabel fill as Red', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Series0_Points0_dataLabel_symbol0');
                    var color = element.getAttribute('fill');
                    expect(color).toEqual('red');
                };
                smithchart.series[0].marker.dataLabel.fill = 'red';
                smithchart.refresh();
            });
            it('Checking with datalabel without fill color', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_series0_points');
                    var color = element.getAttribute('stroke');
                    expect(color).toEqual('red');
                };
                smithchart.series[0].marker.dataLabel.fill = '';
                smithchart.refresh();
            });
            it('Checking with enableAnimation with Impedance Type', function (done) {
                smithchart.animationComplete = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_series0_points');
                    var color = element.getAttribute('stroke');
                    expect(color).toEqual('red');
                    done();
                };
                smithchart.renderType = 'Impedance';
                smithchart.series[0].marker.fill = 'red';
                smithchart.series[0].enableAnimation = true;
                smithchart.series[0].animationDuration = '1ms';
                smithchart.refresh();
                done();
            });
            it('Checking with enableAnimation with Admittance type', function (done) {
                smithchart.animationComplete = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_series0_points');
                    var color = element.getAttribute('stroke');
                    expect(color).toEqual('red');
                    done();
                };
                smithchart.renderType = 'Admittance';
                smithchart.series[0].marker.fill = 'red';
                smithchart.series[0].enableAnimation = true;
                smithchart.series[0].animationDuration = '1ms';
                smithchart.refresh();
                done();
            });
            it('Checking with datalabel template', function (done) {
                smithchart.animationComplete = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_series0_points');
                    var color = element.getAttribute('stroke');
                    expect(color).toEqual('red');
                    done();
                };
                smithchart.series[0].marker.dataLabel.template = '<div id="template" ><p>{{:point}}</p></div>';
                smithchart.series[0].marker.fill = 'red';
                smithchart.series[0].enableAnimation = true;
                smithchart.series[0].animationDuration = '1ms';
                smithchart.refresh();
                done();
            });
            it('Checking with smartLabel fill as Red with connector line', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_series0_points');
                    var color = element.getAttribute('stroke');
                    expect(color).toEqual('red');
                };
                smithchart.series[0].enableSmartLabels = true;
                smithchart.series[0].marker.dataLabel.visible = true;
                smithchart.series[0].marker.dataLabel.template = '';
                smithchart.series[0].marker.dataLabel.connectorLine.color = 'red';
                smithchart.refresh();
            });
            it('Checking with smartLabel fill as Red without connector line color', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_series0_points');
                    var color = element.getAttribute('stroke');
                    expect(color).toEqual('red');
                };
                smithchart.series[0].enableSmartLabels = true;
                smithchart.series[0].marker.dataLabel.visible = true;
                smithchart.series[0].marker.dataLabel.connectorLine.color = '';
                smithchart.refresh();
            });
            it('Checking with material theme', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_series0_points');
                    var color = element.getAttribute('stroke');
                    expect(color).toEqual('red');
                };
                smithchart.theme = 'Material';
                smithchart.refresh();
            });
            it('Checking with fabric theme', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_series0_points');
                    var color = element.getAttribute('stroke');
                    expect(color).toEqual('red');
                };
                smithchart.theme = 'Fabric';
                smithchart.refresh();
            });
            it('Checking with bootstrap theme', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_series0_points');
                    var color = element.getAttribute('stroke');
                    expect(color).toEqual('red');
                };
                smithchart.theme = 'Bootstrap';
                smithchart.refresh();
            });
            it('Checking with bootstrap4 theme', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_series0_points');
                    var color = element.getAttribute('stroke');
                    expect(color).toEqual('red');
                };
                smithchart.theme = 'Bootstrap4';
                smithchart.refresh();
            });
            it('Checking with highcontrast theme', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_series0_points');
                    var color = element.getAttribute('stroke');
                    expect(color).toEqual('red');
                };
                smithchart.theme = 'HighContrastLight';
                smithchart.refresh();
            });
            it('Checking with Dark theme', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_series0_points');
                    var color = element.getAttribute('stroke');
                    expect(color).toEqual('red');
                };
                smithchart.theme = 'HighContrast';
                smithchart.refresh();
            });
            it('Checking with Dark theme', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_series0_points');
                    var color = element.getAttribute('stroke');
                    expect(color).toEqual('red');
                };
                smithchart.theme = 'HighContrastLight';
                smithchart.refresh();
            });
            it('Checking with Dark theme', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_series0_points');
                    var color = element.getAttribute('stroke');
                    expect(color).toEqual('red');
                };
                smithchart.theme = 'FabricDark';
                smithchart.refresh();
            });
            it('Checking with persist data', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_series0_points');
                    var color = element.getAttribute('stroke');
                    expect(color).toEqual('red');
                };
                smithchart.getPersistData();
                smithchart.refresh();
            });
            it('Checking theme with onProperty changed', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_series0_points');
                    var color = element.getAttribute('stroke');
                    expect(color).toEqual('red');
                };
                smithchart.theme = 'Fabric';
                smithchart.dataBind();
            });
            it('Checking theme with onProperty changed meterial dark theme', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_series0_points');
                    var color = element.getAttribute('stroke');
                    expect(color).toEqual('red');
                };
                smithchart.theme = 'MaterialDark';
                smithchart.dataBind();
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
