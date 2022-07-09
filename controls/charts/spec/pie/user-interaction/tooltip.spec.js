define(["require", "exports", "@syncfusion/ej2-base", "../../../src/accumulation-chart/renderer/pie-series", "../../../src/accumulation-chart/renderer/pyramid-series", "../../../src/accumulation-chart/renderer/funnel-series", "../../../src/accumulation-chart/accumulation", "../../../src/accumulation-chart/renderer/legend", "../../../src/common/utils/helper", "../../../src/accumulation-chart/renderer/dataLabel", "../../../src/accumulation-chart/user-interaction/tooltip", "../../../src/accumulation-chart/user-interaction/selection", "../../chart/base/data.spec", "../../chart/base/events.spec", "../base/util.spec", "../../common.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, pie_series_1, pyramid_series_1, funnel_series_1, accumulation_1, legend_1, helper_1, dataLabel_1, tooltip_1, selection_1, data_spec_1, events_spec_1, util_spec_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    accumulation_1.AccumulationChart.Inject(pie_series_1.PieSeries, pyramid_series_1.PyramidSeries, selection_1.AccumulationSelection, funnel_series_1.FunnelSeries, legend_1.AccumulationLegend, dataLabel_1.AccumulationDataLabel, tooltip_1.AccumulationTooltip);
    describe('Accumulation Chart Control', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('Tooltip checking for the pie series', function () {
            var ele;
            var loaded;
            var id = 'ej2container';
            var tooltipid = id + '_3_content';
            var sliceid = id + '_Series_0' + '_Point_';
            var x;
            var y;
            var i = 0;
            var length;
            var accumulation;
            var points;
            var trigger = new events_spec_1.MouseEvents();
            var segement;
            var tooltip;
            var position;
            var legendId = id + '_chart_legend_text_';
            var pointEvent;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: id });
                document.body.appendChild(ele);
                var template = ej2_base_1.createElement('div', { id: 'template', styles: 'display: none;' });
                document.body.appendChild(template);
                template.innerHTML = '<div>${x}</div><div>${y}</div>';
                util_spec_1.addTooltipStyles();
                accumulation = new accumulation_1.AccumulationChart({
                    series: [
                        { name: 'Animals',
                            type: 'Pie',
                            dataLabel: { visible: false, name: 'data' },
                            dataSource: data_spec_1.piedata, animation: { enable: false }, xName: 'name', yName: 'y'
                        }
                    ], width: '600', height: '400', legendSettings: { visible: false },
                    tooltip: {
                        enable: false,
                        enableAnimation: false
                    },
                    title: 'Pie',
                    titleStyle: { textAlignment: 'Near' },
                });
                accumulation.appendTo('#' + id);
            });
            afterAll(function () {
                accumulation.destroy();
                ele.remove();
            });
            it('Control visibility false checking', function (done) {
                accumulation.loaded = function (args) {
                    segement = helper_1.getElement(sliceid + 0);
                    trigger.mousemoveEvent(segement, 0, 0, 200, 200);
                    var tooltip = document.getElementById('ej2container_tooltip');
                    expect(tooltip == null).toBe(true);
                    trigger.mouseleavetEvent(ele, 1000, 1000);
                    done();
                };
                accumulation.tooltip.enable = false;
                accumulation.titleStyle.textAlignment = 'Far';
                accumulation.refresh();
            });
            it('Pie Series tooltip visibility false checking', function (done) {
                accumulation.loaded = function (args) {
                    segement = helper_1.getElement(sliceid + 0);
                    trigger.mousemoveEvent(segement, 0, 0, 200, 200);
                    var tooltip = document.getElementById('ej2container_tooltip');
                    expect(tooltip == null).toBe(true);
                    done();
                };
                accumulation.tooltip.enable = true;
                accumulation.title = '';
                accumulation.series[0].enableTooltip = false;
                accumulation.refresh();
            });
            it('Point mouse move and click', function (done) {
                loaded = function (args) {
                    segement = helper_1.getElement(sliceid + 3);
                    trigger.mousemoveEvent(segement, 0, 0, 200, 200);
                    trigger.clickEvent(segement);
                    done();
                };
                pointEvent = function (args) {
                    expect(args.pointIndex == 3).toBe(true);
                    expect(args.seriesIndex == 0).toBe(true);
                    done();
                };
                accumulation.loaded = loaded;
                accumulation.pointClick = pointEvent;
                accumulation.pointMove = pointEvent;
                accumulation.refresh();
            });
            it('Pie tooltip visibility true checking', function (done) {
                accumulation.loaded = function (args) {
                    segement = helper_1.getElement(sliceid + 0);
                    trigger.mousemoveEvent(segement, 0, 0, 200, 200);
                    var tooltip = document.getElementById('ej2container_tooltip');
                    expect(tooltip != null).toBe(true);
                    var group = tooltip.childNodes[0].childNodes[0];
                    var path = group.childNodes[0];
                    var text1 = group.childNodes[1];
                    var text2 = group.childNodes[2];
                    expect(path.localName == 'path').toBe(true);
                    expect(path.getAttribute('d') != '' || ' ').toBe(true);
                    expect(group.childNodes.length == 5).toBe(true);
                    expect(text1.childNodes.length == 5).toBe(true);
                    expect(text1.textContent.replace('\u200E', '') == 'AnimalsBald Eagle : 18').toBe(true);
                    segement = helper_1.getElement(sliceid + 2);
                    trigger.mousemoveEvent(segement, 0, 0, 200, 200);
                    tooltip = document.getElementById('ej2container_tooltip');
                    expect(tooltip === null).toBe(true);
                    trigger.mousemoveEvent(ele, 0, 0, 100, 100);
                    done();
                };
                accumulation.tooltip.enable = true;
                accumulation.pointClick = null;
                accumulation.pointMove = null;
                accumulation.series[0].enableTooltip = true;
                accumulation.tooltipRender = function (args) {
                    if (args.point.index == 2) {
                        args.cancel = true;
                    }
                },
                    accumulation.refresh();
            });
            it('Pie tooltip visibility true checking', function (done) {
                accumulation.loaded = function (args) {
                    segement = helper_1.getElement(sliceid + 0);
                    trigger.mousemoveEvent(segement, 0, 0, 200, 200);
                    var tooltip = document.getElementById('ej2container_tooltip');
                    expect(tooltip != null).toBe(true);
                    segement = helper_1.getElement('ej2container_chart_legend_text_1');
                    trigger.mousemoveEvent(segement, 0, 0, 200, 200);
                    done();
                };
                accumulation.tooltip.format = 'Large Tooltip <br/> To Test the <br/> Format <br/> ${point.x} <br/>';
                accumulation.legendSettings.visible = true;
                accumulation.refresh();
            });
            it('Pyramid tooltip', function (done) {
                accumulation.loaded = function (args) {
                    segement = helper_1.getElement(sliceid + 3);
                    trigger.mousemoveEvent(segement, 0, 0, 400, 100);
                    var tooltip = document.getElementById('ej2container_tooltip');
                    expect(tooltip != null).toBe(true);
                    var group = tooltip.childNodes[0].childNodes[0];
                    var path = group.childNodes[0];
                    var text1 = group.childNodes[1];
                    var text2 = group.childNodes[2];
                    expect(path.localName == 'path').toBe(true);
                    expect(path.getAttribute('d') != '' || ' ').toBe(true);
                    expect(group.childNodes.length == 5).toBe(true);
                    expect(text1.childNodes.length == 6).toBe(true);
                    expect(text1.textContent.replace(/\u200E/g, '') == 'AnimalsAnimals : Elk : 44').toBe(true);
                    expect(group.childNodes[2].getAttribute('d') != '' || ' ').toBe(true);
                    done();
                };
                accumulation.series[0].type = 'Pyramid';
                accumulation.tooltip.format = '${series.name} : ${point.x} : ${point.y}';
                accumulation.tooltipRender = null;
                accumulation.refresh();
            });
            it('Funnel tooltip', function (done) {
                accumulation.loaded = function (args) {
                    segement = helper_1.getElement(sliceid + 2);
                    trigger.mousemoveEvent(segement, 0, 0, 400, 100);
                    var tooltip = document.getElementById('ej2container_tooltip');
                    expect(tooltip != null).toBe(true);
                    var group = tooltip.childNodes[0].childNodes[0];
                    var path = group.childNodes[0];
                    var text1 = group.childNodes[1];
                    var text2 = group.childNodes[2];
                    expect(path.localName == 'path').toBe(true);
                    expect(path.getAttribute('d') != '' || ' ').toBe(true);
                    expect(group.childNodes.length == 4).toBe(true);
                    expect(text1.childNodes.length == 5).toBe(true);
                    expect(text1.textContent.replace(/\u200E/g, '') == 'Animals : Brown Bear : 30').toBe(true);
                    expect(group.childNodes[2].getAttribute('d') != '' || ' ').toBe(true);
                    trigger.mousemoveEvent(ele, 0, 0, 30, 30);
                    done();
                };
                accumulation.series[0].type = 'Funnel';
                accumulation.tooltip.header = '';
                accumulation.tooltipRender = null;
                accumulation.refresh();
            });
            it('Funnel tooltip with tooltip mapping Name', function (done) {
                accumulation.loaded = function (args) {
                    segement = helper_1.getElement(sliceid + 2);
                    trigger.mousemoveEvent(segement, 0, 0, 400, 100);
                    var tooltip = document.getElementById('ej2container_tooltip');
                    expect(tooltip != null).toBe(true);
                    var group = tooltip.childNodes[0].childNodes[0];
                    var text1 = group.childNodes[1];
                    expect(text1.textContent == '30').toBe(true);
                    done();
                };
                accumulation.series[0].type = 'Funnel';
                accumulation.tooltip.header = '';
                accumulation.tooltip.format = '${point.tooltip}';
                accumulation.series[0].tooltipMappingName = 'y';
                accumulation.refresh();
            });
            it('Funnel tooltip without tooltip text', function (done) {
                accumulation.loaded = function (args) {
                    segement = helper_1.getElement(sliceid + 2);
                    trigger.mousemoveEvent(segement, 0, 0, 400, 100);
                    var tooltip = document.getElementById('ej2container_tooltip');
                    expect(tooltip != null).toBe(true);
                    var group = tooltip.childNodes[0].childNodes[0];
                    var text1 = group.childNodes[1];
                    expect(text1.textContent == 'undefined').toBe(true);
                    done();
                };
                accumulation.series[0].type = 'Funnel';
                accumulation.tooltip.header = '';
                accumulation.tooltip.format = '${point.tooltip}';
                accumulation.series[0].tooltipMappingName = 'tooltip';
                accumulation.refresh();
            });
            it('With template', function (done) {
                var tooltip;
                ej2_base_1.remove(document.getElementById('ej2container_tooltip'));
                accumulation.loaded = function (args) {
                    segement = helper_1.getElement(sliceid + 2);
                    trigger.mousemoveEvent(segement, 0, 0, 400, 100);
                    trigger.mousemovetEvent(segement, 200, 200);
                    tooltip = document.getElementById('ej2container_tooltip');
                    expect(tooltip != null).toBe(true);
                    trigger.mouseleavetEvent(ele, 1000, 1000);
                    done();
                };
                accumulation.tooltip.template = '<div>${x}</div><div>${y}</div>';
                accumulation.refresh();
            });
            it('Touch event', function (done) {
                var tooltip;
                ej2_base_1.remove(document.getElementById('ej2container_tooltip'));
                accumulation.loaded = function (args) {
                    segement = helper_1.getElement(sliceid + 2);
                    trigger.mousemoveEvent(segement, 0, 0, 400, 100);
                    accumulation.isTouch = true;
                    accumulation.accumulationMouseEnd(trigger.onTouchEnd(ele, 0, 0, 200, 200, 200, 200));
                    trigger.mouseupEvent(segement, 100, 100, 150, 150);
                    tooltip = document.getElementById('ej2container_tooltip');
                    expect(tooltip != null).toBe(true);
                    done();
                };
                accumulation.series[0].type = 'Pie';
                accumulation.series[0].innerRadius = '20%';
                accumulation.refresh();
            });
            it('Checking tooltip when grouping separator is true', function (done) {
                accumulation.loaded = function (args) {
                    segement = helper_1.getElement(sliceid + 0);
                    trigger.mousemoveEvent(segement, 0, 0, 200, 200);
                    var tooltip = document.getElementById('ej2container_tooltip');
                    expect(tooltip !== null).toBe(true);
                    var group = tooltip.childNodes[0].childNodes[0];
                    var text1 = group.childNodes[1];
                    expect(text1.textContent == '18,000').toBe(true);
                    done();
                };
                accumulation.series[0].dataSource = [{ x: 'Labour', y: 18000 }, { x: 'Legal', y: 8000, text: 'feb: 10000' },
                    { x: 'Production', y: 15000 }, { x: 'License', y: 11000, text: '70000' },
                    { x: 'Facilities', y: 18000 }, { x: 'Taxes', y: 14000 },
                    { x: 'Insurance', y: 16000 }];
                accumulation.tooltip.template = null;
                accumulation.tooltip.format = '${point.label}';
                accumulation.useGroupingSeparator = true;
                accumulation.series[0].dataLabel.visible = true;
                accumulation.refresh();
            });
        });
        describe('Checking tooltip text with useGroupSeparator is true', function () {
            var ele;
            var id = 'container';
            var sliceid = id + '_Series_0' + '_Point_';
            var accumulation;
            var points;
            var trigger = new events_spec_1.MouseEvents();
            var segement;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: id });
                document.body.appendChild(ele);
                accumulation = new accumulation_1.AccumulationChart({
                    useGroupingSeparator: true,
                    series: [
                        {
                            dataSource: [
                                { x: 'Cases', y: 177507, text: '37%' }, { x: 'Layers', y: 137507, text: '17%' },
                                { x: 'Palletes', y: 1377507, text: '19%' }
                            ],
                            dataLabel: {
                                visible: true, position: 'Inside', name: 'x', font: { fontWeight: '600' }
                            },
                            radius: '70%', xName: 'x', yName: 'y', startAngle: 0, endAngle: 360, innerRadius: '0%',
                            explode: true, explodeOffset: '10%', explodeIndex: 0, name: 'Browser', animation: { enable: false }
                        }
                    ],
                    center: { x: '50%', y: '50%' },
                    enableSmartLabels: true,
                    enableAnimation: false,
                    legendSettings: { visible: false },
                    tooltip: { enable: true, header: '' },
                    title: 'Mobile Browser Statistics',
                    width: '400px', height: '400px'
                });
                accumulation.appendTo('#' + id);
            });
            afterAll(function () {
                accumulation.destroy();
                ele.remove();
            });
            it('Checking point value with group separator', function (done) {
                accumulation.loaded = function (args) {
                    segement = helper_1.getElement(sliceid + 2);
                    trigger.mousemoveEvent(segement, 0, 0, 200, 250);
                    var tooltip = document.getElementById('container_tooltip_text');
                    expect(tooltip.children[0].innerHTML).toEqual("Palletes ");
                    expect(tooltip.children[3].innerHTML).toEqual("1,377,507");
                    done();
                };
                accumulation.refresh();
            });
            it('Checking point value with selection', function (done) {
                accumulation.loaded = function (args) {
                    segement = helper_1.getElement(sliceid + 2);
                    trigger.mousemoveEvent(segement, 0, 0, 200, 250);
                    var element = document.getElementById('container_Series_0_Point_2');
                    trigger.clickEvent(element);
                    expect(+element.getAttribute('opacity') === 1).toBe(true);
                    done();
                };
                accumulation.selectionMode = 'Point';
                accumulation.refresh();
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
