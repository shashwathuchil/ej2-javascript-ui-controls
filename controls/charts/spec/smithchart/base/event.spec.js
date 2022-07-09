define(["require", "exports", "../../../src/smithchart/index", "@syncfusion/ej2-base"], function (require, exports, index_1, ej2_base_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    index_1.Smithchart.Inject(index_1.SmithchartLegend);
    function getElementByID(id) {
        return document.getElementById(id);
    }
    exports.getElementByID = getElementByID;
    describe('Smithchart tooltip spec', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('Events spec', function () {
            var id = 'container';
            var smithchart;
            var ele;
            var svg;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: id, styles: 'height: 512px; width: 512px;' });
                document.body.appendChild(ele);
                smithchart = new index_1.Smithchart({
                    title: {
                        visible: true,
                        text: 'Transmission details'
                    },
                    radialAxis: {
                        visible: false,
                        labelIntersectAction: 'Hide',
                    },
                    legendSettings: {
                        visible: false
                    },
                    series: [{
                            points: [
                                { resistance: 10, reactance: 25 }, { resistance: 8, reactance: 6 },
                                { resistance: 6, reactance: 4.5 }, { resistance: 4.5, reactance: 2 },
                                { resistance: 3.5, reactance: 1.6 }, { resistance: 2.5, reactance: 1.3 },
                                { resistance: 2, reactance: 1.2 }, { resistance: 1.5, reactance: 1 },
                                { resistance: 1, reactance: 0.8 }, { resistance: 0.5, reactance: 0.4 },
                                { resistance: 0.3, reactance: 0.2 }, { resistance: 0, reactance: 0.15 },
                            ],
                            name: 'Transmission1',
                            enableAnimation: true,
                            tooltip: { visible: true },
                            marker: {
                                shape: 'Circle',
                                visible: true,
                                border: { width: 2 }
                            }
                        }
                    ],
                });
                smithchart.appendTo('#container');
            });
            afterAll(function () {
                ej2_base_1.remove(ele);
                smithchart.destroy();
            });
            it('Checking Load Event', function (done) {
                smithchart.loaded = function (args) {
                    svg = document.getElementById('container_svg_horizontalAxisMajorGridLines');
                    expect(svg !== null).toBe(true);
                    done();
                };
                smithchart.refresh();
            });
            it('Checking title Event', function (done) {
                smithchart.titleRender = function (args) {
                    args.text = 'Transmission of resistance value';
                };
                smithchart.loaded = function (args) {
                    svg = document.getElementById('container_Title_Group');
                    expect(svg.childElementCount).toBe(1);
                    svg = document.getElementById('container_Smithchart_title');
                    expect(svg.textContent).toBe("Transmission of resistance value");
                    done();
                };
                smithchart.title.text = "Transmission of resistance value";
                smithchart.refresh();
            });
            it('Checking axis Label location', function (done) {
                smithchart.axisLabelRender = function (args) {
                    if (args.text === '0.5') {
                        args.x = 700;
                        args.y = 100;
                    }
                };
                smithchart.loaded = function (args) {
                    svg = document.getElementById('container_HAxisLabels');
                    expect(svg.childElementCount).toBe(12);
                    expect(svg.children[2].textContent).toBe("0.5");
                    svg = document.getElementById('container_HLabel_3');
                    expect(svg.getAttribute('x')).toBe("700");
                    expect(svg.getAttribute('y')).toBe("100");
                    done();
                };
                smithchart.series[0].marker.shape = "Circle";
                smithchart.legendSettings.visible = true;
                smithchart.refresh();
            });
            it('Checking load event', function (done) {
                smithchart.load = function (args) {
                    args.smithchart.title.text = 'Title text changed by load event';
                };
                smithchart.loaded = function (args) {
                    svg = document.getElementById('container_Title_Group');
                    expect(svg.childElementCount).toBe(1);
                    expect(svg.children[0].textContent).toBe("Transmission of resistance value");
                    done();
                };
                smithchart.title.text = "Title text changed by load event";
                smithchart.refresh();
            });
            it('Checking legend event fill', function (done) {
                smithchart.legendRender = function (args) {
                    args.fill = 'red';
                };
                smithchart.loaded = function (args) {
                    svg = document.getElementById('container_svg_Legend0');
                    expect(svg.childElementCount).toBe(2);
                    svg = document.getElementById('container_svg_LegendItemShape0');
                    expect(svg.getAttribute('fill')).toBe("red");
                    done();
                };
                smithchart.series[0].name = "Transmission2";
                smithchart.legendSettings.visible = true;
                smithchart.refresh();
            });
            it('Checking legend event cancel', function (done) {
                smithchart.legendRender = function (args) {
                    args.cancel = true;
                };
                smithchart.loaded = function (args) {
                    svg = document.getElementById('container_svg_Legend0');
                    expect(svg === null).toBe(true);
                    svg = document.getElementById('container_svg_LegendItemShape0');
                    expect(svg === null).toBe(true);
                    done();
                };
                smithchart.series[0].name = "Transmission2";
                smithchart.legendSettings.visible = true;
                smithchart.refresh();
            });
            it('Checking legend event text', function (done) {
                smithchart.legendRender = function (args) {
                    args.text = 'LegendEvent Text';
                };
                smithchart.loaded = function (args) {
                    svg = document.getElementById('container_svg_Legend0');
                    expect(svg.childElementCount).toBe(2);
                    svg = document.getElementById('container_LegendItemText0');
                    expect(svg.textContent).toBe("LegendEvent Text");
                    done();
                };
                smithchart.series[0].name = "Transmission2";
                smithchart.legendSettings.visible = true;
                smithchart.refresh();
            });
            it('Checking legend event stroke', function (done) {
                smithchart.seriesRender = function (args) {
                    if (args.text === 'Transmission1') {
                        args.fill = 'red';
                    }
                };
                smithchart.loaded = function (args) {
                    svg = document.getElementById('container_svg0');
                    expect(svg.childElementCount).toBe(1);
                    svg = document.getElementById('container_series0_points');
                    expect(svg.getAttribute('stroke')).toBe("red");
                    done();
                };
                smithchart.series[0].name = "Transmission1";
                smithchart.refresh();
            });
            it('Checking subtitle event X', function (done) {
                smithchart.subtitleRender = function (args) {
                    args.x = 500;
                };
                smithchart.loaded = function (args) {
                    svg = document.getElementById('container_Title_Group');
                    expect(svg.childElementCount).toBe(2);
                    svg = document.getElementById('container_Smithchart_title');
                    expect(svg !== null).toBe(true);
                    done();
                };
                smithchart.series[0].name = "Transmission1";
                smithchart.title.text = "Transmission details";
                smithchart.title.subtitle.text = "Sub Title";
                smithchart.refresh();
            });
            it('Checking subtitle event Y ', function (done) {
                smithchart.subtitleRender = function (args) {
                    args.y = 150;
                };
                smithchart.loaded = function (args) {
                    svg = document.getElementById('container_Title_Group');
                    expect(svg.children[1].getAttribute('y')).toBe("150");
                    done();
                };
                smithchart.title.text = "Transmission details";
                smithchart.title.subtitle.text = "Sub Title";
                smithchart.refresh();
            });
            it('Checking loaded event', function (done) {
                smithchart.loaded = function (args) {
                    smithchart.title.text = "Loaded Event";
                };
                smithchart.loaded = function (args) {
                    svg = document.getElementById('container_Title_Group');
                    expect(svg.childElementCount).toBe(2);
                    expect(svg.children[0].textContent).toBe("Transmission of resistance value");
                    done();
                };
                smithchart.legendSettings.visible = true;
                smithchart.legendSettings.shape = "Circle";
                smithchart.refresh();
            });
        });
        describe('Events spec', function () {
            var id = 'container';
            var smithchart;
            var ele;
            var svg;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: id, styles: 'height: 512px; width: 512px;' });
                document.body.appendChild(ele);
                smithchart = new index_1.Smithchart({
                    title: {
                        visible: true,
                        text: 'Transmission details'
                    },
                    series: [
                        {
                            points: [
                                { resistance: 10, reactance: 25 }, { resistance: 8, reactance: 6 },
                                { resistance: 6, reactance: 4.5 }, { resistance: 4.5, reactance: 2 },
                                { resistance: 3.5, reactance: 1.6 }, { resistance: 2.5, reactance: 1.3 },
                                { resistance: 2, reactance: 1.2 }, { resistance: 1.5, reactance: 1 },
                                { resistance: 1, reactance: 0.8 }, { resistance: 0.5, reactance: 0.4 },
                                { resistance: 0.3, reactance: 0.2 }, { resistance: 0, reactance: 0.15 },
                            ],
                            name: 'Transmission1',
                            enableAnimation: true,
                            tooltip: { visible: true },
                            marker: {
                                dataLabel: {
                                    visible: true,
                                }
                            }
                        },
                    ],
                    legendSettings: {
                        visible: true,
                        shape: 'Circle'
                    },
                });
                smithchart.appendTo('#container');
            });
            afterAll(function () {
                ej2_base_1.remove(ele);
                smithchart.destroy();
            });
            it('Checking Datalabel Event', function (done) {
                smithchart.textRender = function (args) {
                    if ((args.seriesIndex === 0) && (args.pointIndex === 0)) {
                        args.text = "Event";
                    }
                };
                smithchart.loaded = function (args) {
                    svg = document.getElementById('container_svg_series0_Datalabel');
                    expect(svg.childElementCount).toBe(24);
                    svg = document.getElementById('container_Series0_Points0_dataLabel_displayText0');
                    expect(svg.textContent).toBe("Event");
                    done();
                };
                smithchart.refresh();
            });
        });
    });
});
