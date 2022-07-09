define(["require", "exports", "../../../src/smithchart/index", "@syncfusion/ej2-base", "../base/events.spec", "../../common.spec"], function (require, exports, index_1, ej2_base_1, events_spec_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    index_1.Smithchart.Inject(index_1.TooltipRender);
    describe('Smithchart tooltip spec', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('Tooltip spec', function () {
            var id = 'container';
            var smithchart;
            var ele;
            var trigger = new events_spec_1.MouseEvents();
            var spec;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: id, styles: 'height: 512px; width: 512px;' });
                document.body.appendChild(ele);
                smithchart = new index_1.Smithchart({
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
                            fill: 'red',
                            tooltip: { visible: true },
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
            it('tooltip checking with mouse move', function (done) {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_series0_points');
                    trigger.mousemoveEvent(element, 0, 0, 50, 255);
                    element = document.getElementById(id + '_smithchart_tooltip_div_text');
                    expect(element.firstChild.textContent).toBe('0 ');
                    expect(element.lastChild.textContent).toBe('0.05');
                    trigger.mousemoveEvent(element, 0, 0, 35, 255);
                    done();
                };
                smithchart.refresh();
            });
            it('tooltip template checking with mouse move', function (done) {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_series0_points');
                    trigger.mousemoveEvent(element, 0, 0, 156, 250);
                    element = document.getElementById(id + '_smithchart_tooltip_divparent_template');
                    expect(element.firstChild.textContent).toBe('0.1');
                    trigger.mousemoveEvent(element, 0, 0, 35, 255);
                    done();
                };
                smithchart.series[0].tooltip.template = '<div style="border: 2px solid green;background: #a0e99680">${reactance}</div>';
                smithchart.refresh();
            });
            it('tooltip checking with mouse up on touchend', function (done) {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_series0_points');
                    smithchart.mouseEnd(trigger.onTouchEnd(element, 0, 0, 0, 0, 50, 255));
                    element = document.getElementById(id + '_smithchart_tooltip_div_text');
                    expect(element.firstChild.textContent).toBe('0 ');
                    expect(element.lastChild.textContent).toBe('0.05');
                    smithchart.mouseEnd(trigger.onTouchEnd(element, 0, 0, 0, 0, 35, 255));
                };
                smithchart.animationComplete = function (args) {
                    var tooltip = document.getElementById(smithchart.element.id + '_smithchart_tooltip_div_text');
                    expect(tooltip == null).toBe(false);
                    done();
                };
                smithchart.series[0].tooltip.template = '';
                smithchart.series[0].enableAnimation = true;
                smithchart.series[0].animationDuration = '2000ms';
                smithchart.refresh();
            });
            it('tooltip checking with mouse up on touchmove', function (done) {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_series0_points');
                    smithchart.mouseEnd(trigger.onTouchMove(element, 0, 0, 0, 0, 156, 250));
                    element = document.getElementById(id + '_smithchart_tooltip_div_text');
                    done();
                };
                smithchart.refresh();
            });
            it('tooltip checking with mouse move on touchmove', function (done) {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_series0_points');
                    smithchart.mouseMove(trigger.onTouchMove(element, 0, 0, 0, 0, 50, 255));
                    element = document.getElementById(id + '_smithchart_tooltip_div_text');
                    done();
                };
                smithchart.refresh();
            });
            it('tooltip checking with template', function (done) {
                smithchart.loaded = function (args) {
                    var element = document.getElementById('container_Series0_Points8_Marker8');
                    trigger.mousemoveEvent(element, 0, 0, 50, 255);
                    done();
                };
                smithchart.series[0].tooltipMappingName = 'reactance';
                smithchart.refresh();
            });
            it('legend checking with mouse click as togglevisibility set to true', function (done) {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_LegendItemText0');
                    trigger.clickEvent(element);
                    done();
                };
                smithchart.legendSettings.visible = true;
                smithchart.legendSettings.toggleVisibility = true;
                smithchart.refresh();
            });
            it(' Second time legend checking with mouse click as togglevisibility set to true', function (done) {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_LegendItemText0');
                    trigger.clickEvent(element);
                    done();
                };
                smithchart.legendSettings.visible = true;
                smithchart.series[0].visibility = 'hidden';
                smithchart.legendSettings.toggleVisibility = true;
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
