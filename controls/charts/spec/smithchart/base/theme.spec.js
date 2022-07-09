define(["require", "exports", "../../../src/smithchart/index", "@syncfusion/ej2-base", "../base/events.spec"], function (require, exports, index_1, ej2_base_1, events_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    index_1.Smithchart.Inject(index_1.SmithchartLegend, index_1.TooltipRender);
    describe('Smithchart legend properties tesing', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe(' default themes testing', function () {
            var id = 'smithchart';
            var smithchart;
            var ele;
            var targetElement;
            var tooltipElement;
            var trigger = new events_spec_1.MouseEvents();
            var spec;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: id, styles: 'height: 512px; width: 512px;' });
                document.body.appendChild(ele);
                smithchart = new index_1.Smithchart({
                    title: {
                        text: 'Impedance Transmission'
                    },
                    horizontalAxis: {
                        minorGridLines: {
                            visible: true
                        },
                        majorGridLines: {
                            visible: true
                        }
                    },
                    series: [{
                            points: [
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
                            name: 'Transmission1',
                            tooltip: { visible: true },
                            marker: {
                                visible: true,
                                dataLabel: {
                                    visible: true
                                }
                            }
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
            it('Checking with axis Label', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_RLabel_0');
                    expect(element.getAttribute('fill')).toEqual('#686868');
                };
                smithchart.refresh();
            });
            it('Checking with axis Line', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_series0_points');
                    expect(element.getAttribute('stroke')).toEqual('#00bdae');
                };
                smithchart.refresh();
            });
            it('Checking with major GridLine', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_horizontalAxisMajorGridLines');
                    expect(element.getAttribute('stroke')).toEqual('#dbdbdb');
                };
                smithchart.refresh();
            });
            it('Checking with minor GridLine', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_horizontalAxisMinorGridLines');
                    expect(element.getAttribute('stroke')).toEqual('#eaeaea');
                };
                smithchart.refresh();
            });
            it('Checking with chartTitle', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Smithchart_title');
                    expect(element.getAttribute('fill')).toEqual('#424242');
                };
                smithchart.refresh();
            });
            it('Checking with legend label', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_LegendItemText0');
                    expect(element.getAttribute('fill')).toEqual('#353535');
                };
                smithchart.refresh();
            });
            it('Checking with background', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_SmithchartBorder');
                    expect(element.getAttribute('fill')).toEqual('#FFFFFF');
                };
                smithchart.refresh();
            });
            it('Checking with data label', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Series0_Points0_dataLabel_symbol0');
                    expect(element.getAttribute('fill')).toEqual('#00bdae');
                };
                smithchart.refresh();
            });
            it('Checking with data label font family', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Series0_Points0_dataLabel_displayText0');
                    expect(element.getAttribute('font-family')).toEqual('Roboto, Segoe UI, Noto, Sans-serif');
                };
                smithchart.refresh();
            });
            it('Checking with data label font size', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Series0_Points0_dataLabel_displayText0');
                    expect(element.getAttribute('font-size')).toEqual('12px');
                };
                smithchart.refresh();
            });
        });
        describe('Material themes testing', function () {
            var id = 'smithchart';
            var smithchart;
            var ele;
            var targetElement;
            var tooltipElement;
            var trigger = new events_spec_1.MouseEvents();
            var spec;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: id, styles: 'height: 512px; width: 512px;' });
                document.body.appendChild(ele);
                smithchart = new index_1.Smithchart({
                    theme: 'MaterialDark',
                    title: {
                        text: 'Impedance Transmission'
                    },
                    horizontalAxis: {
                        minorGridLines: {
                            visible: true
                        },
                        majorGridLines: {
                            visible: true
                        }
                    },
                    series: [{
                            points: [
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
                            name: 'Transmission1',
                            tooltip: { visible: true },
                            marker: {
                                visible: true,
                                dataLabel: {
                                    visible: true
                                }
                            }
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
            it('Checking with axis Label', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_RLabel_0');
                    expect(element.getAttribute('fill')).toEqual('#DADADA');
                };
                smithchart.refresh();
            });
            it('Checking with axis Line', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_series0_points');
                    expect(element.getAttribute('stroke')).toEqual('#9ECB08');
                };
                smithchart.refresh();
            });
            it('Checking with major GridLine', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_horizontalAxisMajorGridLines');
                    expect(element.getAttribute('stroke')).toEqual('#414040');
                };
                smithchart.refresh();
            });
            it('Checking with minor GridLine', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_horizontalAxisMinorGridLines');
                    expect(element.getAttribute('stroke')).toEqual('#514F4F');
                };
                smithchart.refresh();
            });
            it('Checking with chartTitle', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Smithchart_title');
                    expect(element.getAttribute('fill')).toEqual('#ffffff');
                };
                smithchart.refresh();
            });
            it('Checking with legend label', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_LegendItemText0');
                    expect(element.getAttribute('fill')).toEqual('#DADADA');
                };
                smithchart.refresh();
            });
            it('Checking with background', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_SmithchartBorder');
                    expect(element.getAttribute('fill')).toEqual('#383838');
                };
                smithchart.refresh();
            });
            it('Checking with data label', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Series0_Points0_dataLabel_symbol0');
                    expect(element.getAttribute('fill')).toEqual('#9ECB08');
                };
                smithchart.refresh();
            });
            it('Checking with data label font family', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Series0_Points0_dataLabel_displayText0');
                    expect(element.getAttribute('font-family')).toEqual('Roboto, Segoe UI, Noto, Sans-serif');
                };
                smithchart.refresh();
            });
            it('Checking with data label font size', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Series0_Points0_dataLabel_displayText0');
                    expect(element.getAttribute('font-size')).toEqual('12px');
                };
                smithchart.refresh();
            });
        });
        describe('High Contrast themes testing', function () {
            var id = 'smithchart';
            var smithchart;
            var ele;
            var targetElement;
            var tooltipElement;
            var trigger = new events_spec_1.MouseEvents();
            var spec;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: id, styles: 'height: 512px; width: 512px;' });
                document.body.appendChild(ele);
                smithchart = new index_1.Smithchart({
                    theme: 'HighContrast',
                    title: {
                        text: 'Impedance Transmission'
                    },
                    horizontalAxis: {
                        minorGridLines: {
                            visible: true
                        },
                        majorGridLines: {
                            visible: true
                        }
                    },
                    series: [{
                            points: [
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
                            name: 'Transmission1',
                            tooltip: { visible: true },
                            marker: {
                                visible: true,
                                dataLabel: {
                                    visible: true
                                }
                            }
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
            it('Checking with axis Label', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_RLabel_0');
                    expect(element.getAttribute('fill')).toEqual('#ffffff');
                };
                smithchart.refresh();
            });
            it('Checking with axis Line', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_series0_points');
                    expect(element.getAttribute('stroke')).toEqual('#79ECE4');
                };
                smithchart.refresh();
            });
            it('Checking with major GridLine', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_horizontalAxisMajorGridLines');
                    expect(element.getAttribute('stroke')).toEqual('#BFBFBF');
                };
                smithchart.refresh();
            });
            it('Checking with minor GridLine', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_horizontalAxisMinorGridLines');
                    expect(element.getAttribute('stroke')).toEqual('#969696');
                };
                smithchart.refresh();
            });
            it('Checking with chartTitle', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Smithchart_title');
                    expect(element.getAttribute('fill')).toEqual('#ffffff');
                };
                smithchart.refresh();
            });
            it('Checking with legend label', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_LegendItemText0');
                    expect(element.getAttribute('fill')).toEqual('#ffffff');
                };
                smithchart.refresh();
            });
            it('Checking with background', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_SmithchartBorder');
                    expect(element.getAttribute('fill')).toEqual('#000000');
                };
                smithchart.refresh();
            });
            it('Checking with data label', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Series0_Points0_dataLabel_symbol0');
                    expect(element.getAttribute('fill')).toEqual('#79ECE4');
                };
                smithchart.refresh();
            });
            it('Checking with data label font family', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Series0_Points0_dataLabel_displayText0');
                    expect(element.getAttribute('font-family')).toEqual('Roboto, Segoe UI, Noto, Sans-serif');
                };
                smithchart.refresh();
            });
            it('Checking with data label font size', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Series0_Points0_dataLabel_displayText0');
                    expect(element.getAttribute('font-size')).toEqual('12px');
                };
                smithchart.refresh();
            });
        });
        describe('Bootstrap4 themes testing', function () {
            var id = 'smithchart';
            var smithchart;
            var ele;
            var targetElement;
            var tooltipElement;
            var trigger = new events_spec_1.MouseEvents();
            var spec;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: id, styles: 'height: 512px; width: 512px;' });
                document.body.appendChild(ele);
                smithchart = new index_1.Smithchart({
                    theme: 'Bootstrap4',
                    title: {
                        text: 'Impedance Transmission'
                    },
                    horizontalAxis: {
                        minorGridLines: {
                            visible: true
                        },
                        majorGridLines: {
                            visible: true
                        }
                    },
                    series: [{
                            points: [
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
                            name: 'Transmission1',
                            tooltip: { visible: true },
                            marker: {
                                visible: true,
                                dataLabel: {
                                    visible: true
                                }
                            }
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
            it('Checking with axis Label', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_RLabel_0');
                    expect(element.getAttribute('fill')).toEqual('#212529');
                };
                smithchart.refresh();
            });
            it('Checking with axis Line', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_series0_points');
                    expect(element.getAttribute('stroke')).toEqual('#a16ee5');
                };
                smithchart.refresh();
            });
            it('Checking with major GridLine', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_horizontalAxisMajorGridLines');
                    expect(element.getAttribute('stroke')).toEqual('#CED4DA');
                };
                smithchart.refresh();
            });
            it('Checking with minor GridLine', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_horizontalAxisMinorGridLines');
                    expect(element.getAttribute('stroke')).toEqual('#DEE2E6');
                };
                smithchart.refresh();
            });
            it('Checking with chartTitle', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Smithchart_title');
                    expect(element.getAttribute('fill')).toEqual('#212529');
                };
                smithchart.refresh();
            });
            it('Checking with legend label', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_LegendItemText0');
                    expect(element.getAttribute('fill')).toEqual('#212529');
                };
                smithchart.refresh();
            });
            it('Checking with background', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_SmithchartBorder');
                    expect(element.getAttribute('fill')).toEqual('#FFFFFF');
                };
                smithchart.refresh();
            });
            it('Checking with data label', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Series0_Points0_dataLabel_symbol0');
                    expect(element.getAttribute('fill')).toEqual('#a16ee5');
                };
                smithchart.refresh();
            });
            it('Checking with data label font family', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Series0_Points0_dataLabel_displayText0');
                    expect(element.getAttribute('font-family')).toEqual('Roboto, Segoe UI, Noto, Sans-serif');
                };
                smithchart.refresh();
            });
            it('Checking with data label font size', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Series0_Points0_dataLabel_displayText0');
                    expect(element.getAttribute('font-size')).toEqual('12px');
                };
                smithchart.refresh();
            });
        });
        describe('Tailwind themes testing', function () {
            var id = 'smithchart';
            var smithchart;
            var ele;
            var targetElement;
            var tooltipElement;
            var trigger = new events_spec_1.MouseEvents();
            var spec;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: id, styles: 'height: 512px; width: 512px;' });
                document.body.appendChild(ele);
                smithchart = new index_1.Smithchart({
                    theme: 'Tailwind',
                    title: {
                        text: 'Impedance Transmission'
                    },
                    horizontalAxis: {
                        minorGridLines: {
                            visible: true
                        },
                        majorGridLines: {
                            visible: true
                        }
                    },
                    series: [{
                            points: [
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
                            name: 'Transmission1',
                            tooltip: { visible: true },
                            marker: {
                                visible: true,
                                dataLabel: {
                                    visible: true
                                }
                            }
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
            it('Checking with axis Label', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_RLabel_0');
                    expect(element.getAttribute('fill')).toEqual('#6B7280');
                };
                smithchart.refresh();
            });
            it('Checking with major GridLine', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_horizontalAxisMajorGridLines');
                    expect(element.getAttribute('stroke')).toEqual('#E5E7EB');
                };
                smithchart.refresh();
            });
            it('Checking with minor GridLine', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_horizontalAxisMinorGridLines');
                    expect(element.getAttribute('stroke')).toEqual('#D1D5DB');
                };
                smithchart.refresh();
            });
            it('Checking with chartTitle', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Smithchart_title');
                    expect(element.getAttribute('fill')).toEqual('#374151');
                };
                smithchart.refresh();
            });
            it('Checking with legend label', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_LegendItemText0');
                    expect(element.getAttribute('fill')).toEqual('#374151');
                };
                smithchart.refresh();
            });
            it('Checking with background', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_SmithchartBorder');
                    expect(element.getAttribute('fill')).toEqual('#FFFFFF');
                };
                smithchart.refresh();
            });
            it('Checking with data label', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Series0_Points0_dataLabel_symbol0');
                    expect(element.getAttribute('fill')).toEqual('#5A61F6');
                };
                smithchart.refresh();
            });
            it('Checking with data label font family', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Series0_Points0_dataLabel_displayText0');
                    expect(element.getAttribute('font-family')).toEqual('Roboto, Segoe UI, Noto, Sans-serif');
                };
                smithchart.refresh();
            });
            it('Checking with data label font size', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Series0_Points0_dataLabel_displayText0');
                    expect(element.getAttribute('font-size')).toEqual('12px');
                };
                smithchart.refresh();
            });
        });
        describe('TailwindDark themes testing', function () {
            var id = 'smithchart';
            var smithchart;
            var ele;
            var targetElement;
            var tooltipElement;
            var trigger = new events_spec_1.MouseEvents();
            var spec;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: id, styles: 'height: 512px; width: 512px;' });
                document.body.appendChild(ele);
                smithchart = new index_1.Smithchart({
                    theme: 'TailwindDark',
                    title: {
                        text: 'Impedance Transmission'
                    },
                    horizontalAxis: {
                        minorGridLines: {
                            visible: true
                        },
                        majorGridLines: {
                            visible: true
                        }
                    },
                    series: [{
                            points: [
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
                            name: 'Transmission1',
                            tooltip: { visible: true },
                            marker: {
                                visible: true,
                                dataLabel: {
                                    visible: true
                                }
                            }
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
            it('Checking with axis Label', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_RLabel_0');
                    expect(element.getAttribute('fill')).toEqual('#9CA3AF');
                };
                smithchart.refresh();
            });
            it('Checking with major GridLine', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_horizontalAxisMajorGridLines');
                    expect(element.getAttribute('stroke')).toEqual('#374151');
                };
                smithchart.refresh();
            });
            it('Checking with minor GridLine', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_horizontalAxisMinorGridLines');
                    expect(element.getAttribute('stroke')).toEqual('#4B5563');
                };
                smithchart.refresh();
            });
            it('Checking with chartTitle', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Smithchart_title');
                    expect(element.getAttribute('fill')).toEqual('#D1D5DB');
                };
                smithchart.refresh();
            });
            it('Checking with legend label', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_LegendItemText0');
                    expect(element.getAttribute('fill')).toEqual('#D1D5DB');
                };
                smithchart.refresh();
            });
            it('Checking with background', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_SmithchartBorder');
                    expect(element.getAttribute('fill')).toEqual('#1f2937');
                };
                smithchart.refresh();
            });
            it('Checking with data label', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Series0_Points0_dataLabel_symbol0');
                    expect(element.getAttribute('fill')).toEqual('#8B5CF6');
                };
                smithchart.refresh();
            });
            it('Checking with data label font family', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Series0_Points0_dataLabel_displayText0');
                    expect(element.getAttribute('font-family')).toEqual('Roboto, Segoe UI, Noto, Sans-serif');
                };
                smithchart.refresh();
            });
            it('Checking with data label font size', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Series0_Points0_dataLabel_displayText0');
                    expect(element.getAttribute('font-size')).toEqual('12px');
                };
                smithchart.refresh();
            });
        });
    });
});
