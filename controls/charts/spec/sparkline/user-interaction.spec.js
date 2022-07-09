define(["require", "exports", "../../src/sparkline/index", "../../src/sparkline/utils/helper", "@syncfusion/ej2-base", "../common.spec", "./events.spec"], function (require, exports, index_1, helper_1, ej2_base_1, common_spec_1, events_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    index_1.Sparkline.Inject(index_1.SparklineTooltip);
    describe('Sparkline tooltip and tracker checking Spec', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('Sparkline tracker Spec', function () {
            var trigger = new events_spec_1.MouseEvents();
            var element;
            var sparkline;
            var id = 'sparks';
            var ele;
            var rect;
            var d;
            beforeAll(function () {
                element = ej2_base_1.createElement('div', { id: id });
                document.body.appendChild(element);
                sparkline = new index_1.Sparkline({
                    width: '400', height: '100',
                    type: 'Column',
                    fill: '#5af02c',
                    dataSource: [
                        { id: 10, value: 50 },
                        { id: 20, value: 30 },
                        { id: 30, value: -40 },
                        { id: 40, value: 10 },
                        { id: 50, value: -60 },
                        { id: 60, value: 20 },
                        { id: 70, value: 70 },
                        { id: 80, value: -55 },
                        { id: 90, value: 80 },
                        { id: 100, value: 45 }
                    ], yName: 'value', xName: 'id',
                    tooltipSettings: {
                        trackLineSettings: {
                            visible: true,
                            color: 'red', width: 2
                        }
                    }
                });
            });
            afterAll(function () {
                sparkline.destroy();
                helper_1.removeElement(id);
            });
            it('Sparkline tracker line checking', function () {
                sparkline.loaded = function (args) {
                    args.sparkline.loaded = function () { };
                    ele = helper_1.getIdElement(id + '_sparkline_column_1');
                    trigger.mousemoveEvent(ele, 0, 0, 30, 30);
                    ele = helper_1.getIdElement(id + '_sparkline_tracker');
                    var path = ele.getAttribute('d').split(' ');
                    expect(path[1]).toBe('24.5');
                    expect(path[2]).toBe('5');
                    expect(path[4]).toBe('24.5');
                    expect(path[5]).toBe('95');
                    expect(ele.getAttribute('fill')).toBe('#000000');
                    expect(ele.getAttribute('stroke')).toBe('#000000');
                    expect(ele.getAttribute('stroke-width')).toBe('2');
                };
                sparkline.appendTo('#' + id);
            });
            it('Sparkline tracker line move to other point checking', function () {
                ele = helper_1.getIdElement(id);
                trigger.mousemoveEvent(ele, 0, 0, 80, 30);
                ele = helper_1.getIdElement(id + '_sparkline_tracker');
                var path = ele.getAttribute('d').split(' ');
                expect(path[1]).toBe('63.5');
                expect(path[2]).toBe('5');
                expect(path[4]).toBe('63.5');
                expect(path[5]).toBe('95');
                expect(ele.getAttribute('fill')).toBe('#000000');
                expect(ele.getAttribute('stroke')).toBe('#000000');
                expect(ele.getAttribute('stroke-width')).toBe('2');
            });
            it('Sparkline tracker line move to other point checking', function () {
                ele = helper_1.getIdElement(id);
                trigger.mousemoveEvent(ele, 0, 0, 200, 30);
                ele = helper_1.getIdElement(id + '_sparkline_tracker');
                var path = ele.getAttribute('d').split(' ');
                expect(path[1]).toBe('180.5');
                expect(path[2]).toBe('5');
                expect(path[4]).toBe('180.5');
                expect(path[5]).toBe('95');
                expect(ele.getAttribute('fill')).toBe('#000000');
                expect(ele.getAttribute('stroke')).toBe('#000000');
                expect(ele.getAttribute('stroke-width')).toBe('2');
            });
            it('Sparkline tracker line move out of container checking', function () {
                ele = helper_1.getIdElement(id);
                trigger.mouseLeaveEvent(ele);
                ele = helper_1.getIdElement(id + '_sparkline_tracker');
                expect(ej2_base_1.isNullOrUndefined(ele)).toBe(true);
            });
            it('Sparkline tracker line visible false checking', function () {
                sparkline.tooltipSettings.trackLineSettings.visible = false;
                sparkline.dataBind();
                ele = helper_1.getIdElement(id);
                trigger.mousemoveEvent(ele, 0, 0, 200, 30);
                ele = helper_1.getIdElement(id + '_sparkline_tracker');
                expect(ej2_base_1.isNullOrUndefined(ele)).toBe(true);
                ele = helper_1.getIdElement(id);
                trigger.mouseLeaveEvent(ele);
                sparkline.sparklineTooltipModule['removeTracker']();
            });
        });
        describe('Sparkline tooltip Spec', function () {
            var trigger = new events_spec_1.MouseEvents();
            var element;
            var sparkline;
            var id = 'sparks';
            var ele;
            var rect;
            var d;
            beforeAll(function () {
                element = ej2_base_1.createElement('div', { id: id });
                document.body.appendChild(element);
                sparkline = new index_1.Sparkline({
                    width: '600', height: '300',
                    type: 'Column',
                    fill: '#5af02c',
                    markerSettings: {
                        visible: ['All']
                    },
                    dataSource: [
                        { id: 10, value: 50 },
                        { id: 20, value: 30 },
                        { id: 30, value: -40 },
                        { id: 40, value: 10 },
                        { id: 50, value: -60 },
                        { id: 60, value: 20 },
                        { id: 70, value: 70 },
                        { id: 80, value: -55 },
                        { id: 90, value: 80 },
                        { id: 100, value: 45 }
                    ], yName: 'value', xName: 'id',
                    tooltipSettings: {
                        visible: true,
                        trackLineSettings: {
                            visible: true,
                        },
                        textStyle: {
                            color: 'white'
                        },
                        fill: 'transparent'
                    }
                });
            });
            afterAll(function () {
                sparkline.destroy();
                helper_1.removeElement(id);
            });
            it('Sparkline tracker line checking', function () {
                sparkline.loaded = function (args) {
                    args.sparkline.loaded = function () { };
                    ele = helper_1.getIdElement(id + '_sparkline_column_1');
                    trigger.mousemoveEvent(ele, 0, 0, 30, 30);
                    ele = helper_1.getIdElement(id + '_sparkline_tooltip_div_text');
                    expect(ele.firstChild.textContent).toBe('50');
                    expect(ele.lastChild.textContent).toBe('50');
                    ele = helper_1.getIdElement(id + '_sparkline_tracker');
                    expect(ele.getAttribute('fill')).toBe('#000000');
                    expect(ele.getAttribute('stroke')).toBe('#000000');
                    expect(ele.getAttribute('stroke-width')).toBe('1');
                };
                sparkline.appendTo('#' + id);
            });
            it('Sparkline tooltip moving same point checking', function () {
                sparkline.markerSettings.visible = [];
                sparkline.dataBind();
                ele = helper_1.getIdElement(id + '_sparkline_column_1');
                trigger.mousemoveEvent(ele, 0, 0, 30, 20);
                ele = helper_1.getIdElement(id + '_sparkline_tooltip_div_text');
                expect(ele.firstChild.textContent).toBe('50');
                expect(ele.lastChild.textContent).toBe('50');
            });
            it('Sparkline tooltip moving other point checking', function () {
                ele = helper_1.getIdElement(id + '_sparkline_column_6');
                trigger.mousemoveEvent(ele, 0, 0, 400, 50);
                ele = helper_1.getIdElement(id + '_sparkline_tooltip_div_text');
                expect(ele.firstChild.textContent).toBe('70');
                expect(ele.lastChild.textContent).toBe('70');
            });
            it('Sparkline tooltip moving negative point checking', function () {
                ele = helper_1.getIdElement(id + '_sparkline_column_7');
                trigger.mousemoveEvent(ele, 0, 0, 470, 150);
                ele = helper_1.getIdElement(id + '_sparkline_tooltip_div_text');
                expect(ele.firstChild.textContent).toBe('-55');
                expect(ele.lastChild.textContent).toBe('-55');
                ele = helper_1.getIdElement(id);
                trigger.mouseLeaveEvent(ele);
                ele = helper_1.getIdElement(id + '_sparkline_tooltip_div_text');
                expect(ej2_base_1.isNullOrUndefined(ele)).toBe(true);
            });
            it('Sparkline tooltip moving for pie series checking', function () {
                sparkline.type = 'Pie';
                sparkline.format = 'c0';
                sparkline.useGroupingSeparator = false;
                sparkline.dataBind();
                ele = helper_1.getIdElement(id + '_sparkline_pie_4');
                trigger.mousemoveEvent(ele, 0, 0, 400, 150);
                ele = helper_1.getIdElement(id + '_sparkline_tooltip_div_text');
                expect(ele.firstChild.textContent).toBe('-$60');
                expect(ele.lastChild.textContent).toBe('-$60');
                ele = helper_1.getIdElement(id + '_sparkline_pie_4');
                trigger.mouseupEvent(ele, 400, 150, 400, 150);
            });
            it('Sparkline tooltip moving for not valid pie point checking', function () {
                ele = helper_1.getIdElement(id);
                trigger.mousemoveEvent(ele, 0, 0, 400, 150);
                ele = helper_1.getIdElement(id + '_sparkline_tooltip_div_text');
                expect(ej2_base_1.isNullOrUndefined(ele)).toBe(true);
            });
            it('Sparkline tooltip format checking', function () {
                sparkline.tooltipSettings.format = '${id} : ${value}$';
                sparkline.format = null;
                sparkline.dataBind();
                ele = helper_1.getIdElement(id + '_sparkline_pie_4');
                trigger.mousemoveEvent(ele, 0, 0, 400, 150);
                ele = helper_1.getIdElement(id + '_sparkline_tooltip_div_text');
                expect(ele.firstChild.textContent).toBe('50 ');
                expect(ele.lastChild.textContent).toBe(' -60$');
            });
            it('Sparkline tooltip template checking', function () {
                sparkline.tooltipSettings.template = '<div style="border: 2px solid green;background: #a0e99680">${id}<br>${value}$</div>';
                sparkline.dataBind();
                ele = helper_1.getIdElement(id + '_sparkline_pie_4');
                sparkline.isTouch = true;
                sparkline.mouseX = 400;
                sparkline.mouseY = 150;
                sparkline.sparklineTooltipModule['mouseUpHandler']({ target: ele });
                ele = helper_1.getIdElement(id + '_sparkline_tooltip_divparent_template');
                expect(ele.textContent).toBe('50-60$');
                ele = helper_1.getIdElement(id + '_sparkline_tooltip_div');
                expect(ele.children[0].innerHTML.indexOf('<div style="border: 2px solid green;background: #a0e99680">50<br>-60$</div>') > -1).toBe(true);
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
