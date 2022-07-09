define(["require", "exports", "../../src/sparkline/index", "@syncfusion/ej2-base", "../../src/sparkline/utils/helper", "../common.spec"], function (require, exports, index_1, ej2_base_1, helper_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    index_1.Sparkline.Inject(index_1.SparklineTooltip);
    describe('Sparkline Component Pie Series Spec', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('Sparkline testing Pie series spec', function () {
            var element;
            var sparkline;
            var id = 'spark-container';
            var ele;
            var d;
            beforeAll(function () {
                element = ej2_base_1.createElement('div', { id: id });
                element.style.width = '400px';
                element.style.height = '100px';
                document.body.appendChild(element);
                sparkline = new index_1.Sparkline({
                    height: '40%',
                    width: '20%',
                    type: 'Pie',
                    dataSource: [-10, 5, -15, 10, 5, 15, -20, 25]
                });
            });
            afterAll(function () {
                sparkline.destroy();
                helper_1.removeElement(id);
            });
            it('Sparkline pie series checking with array of data', function () {
                sparkline.loaded = function () {
                    ele = helper_1.getIdElement(id + '_sparkline_pie_1');
                    expect(ele.getAttribute('opacity')).toBe('1');
                    expect(ele.getAttribute('stroke-width')).toBe('0');
                    expect(ele.getAttribute('fill')).toBe('#404041');
                    d = ele.getAttribute('d').split(' ');
                    expect(d.length).toBe(14);
                    d = ele.getAttribute('d').split('M');
                    expect(d.length).toBe(2);
                    d = ele.getAttribute('d').split('L');
                    expect(d.length).toBe(2);
                };
                sparkline.appendTo('#' + id);
            });
            it('Sparkline pie series checking with object array of data', function () {
                sparkline.loaded = function () {
                    ele = helper_1.getIdElement(id + '_sparkline_pie_1');
                    expect(ele.getAttribute('opacity')).toBe('1');
                    expect(ele.getAttribute('stroke-width')).toBe('0');
                    expect(ele.getAttribute('fill')).toBe('#404041');
                    d = ele.getAttribute('d').split(' ');
                    expect(d.length).toBe(14);
                    d = ele.getAttribute('d').split('M');
                    expect(d.length).toBe(2);
                    d = ele.getAttribute('d').split('L');
                    expect(d.length).toBe(2);
                };
                sparkline.dataSource = [
                    { x: 0, yval: 2900 },
                    { x: 1, yval: 3900 },
                    { x: 2, yval: 3500 },
                    { x: 3, yval: 3800 },
                    { x: 4, yval: 2500 },
                    { x: 5, yval: 3200 }
                ];
                sparkline.xName = 'x';
                sparkline.yName = 'yval';
                sparkline.refresh();
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
    describe('Sparkline testing Pie series spec for height greater than width', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        var element;
        var sparkline;
        var id = 'spark-container';
        var ele;
        var d;
        beforeAll(function () {
            element = ej2_base_1.createElement('div', { id: id });
            element.style.width = '400px';
            element.style.height = '500px';
            document.body.appendChild(element);
            sparkline = new index_1.Sparkline({
                height: '40%',
                width: '20%',
                type: 'Pie',
                dataSource: [1, 10],
                dataLabelSettings: {
                    visible: ['All']
                }
            });
        });
        afterAll(function () {
            sparkline.destroy();
            helper_1.removeElement(id);
        });
        it('Sparkline pie series checking with array of data', function () {
            sparkline.loaded = function () {
                sparkline.loaded = function () { };
                ele = helper_1.getIdElement(id + '_sparkline_pie_1');
                expect(ele.getAttribute('opacity')).toBe('1');
                expect(ele.getAttribute('stroke-width')).toBe('0');
                expect(ele.getAttribute('fill')).toBe('#404041');
                d = ele.getAttribute('d').split(' ');
                expect(d.length).toBe(14);
                d = ele.getAttribute('d').split('M');
                expect(d.length).toBe(2);
                d = ele.getAttribute('d').split('L');
                expect(d.length).toBe(2);
            };
            sparkline.appendTo('#' + id);
            sparkline.refresh();
        });
        it('Sparkline pie series datalabel', function () {
            var ele = helper_1.getIdElement(id + '_sparkline_label_text_1');
            expect(ele.textContent).toBe('10');
            expect(ele.getAttribute('fill')).toBe('#424242');
            expect(parseInt(ele.getAttribute('x'), 10)).toBe(23);
            expect(parseInt(ele.getAttribute('y'), 10)).toBe(95);
        });
        it('Sparkline pie special points', function () {
            sparkline.startPointColor = 'green';
            sparkline.highPointColor = 'blue';
            sparkline.lowPointColor = 'orange';
            sparkline.endPointColor = 'purple';
            sparkline.negativePointColor = 'red';
            sparkline.dataSource = [1, 10, 5, 7, -6, 2, -4, 8];
            sparkline.dataBind();
            ele = helper_1.getIdElement(id + '_sparkline_pie_0');
            expect(ele.getAttribute('fill')).toBe('green');
            ele = helper_1.getIdElement(id + '_sparkline_pie_7');
            expect(ele.getAttribute('aria-label')).toBe('undefined : 8');
            expect(ele.getAttribute('fill')).toBe('purple');
            ele = helper_1.getIdElement(id + '_sparkline_pie_6');
            expect(ele.getAttribute('fill')).toBe('red');
            ele = helper_1.getIdElement(id + '_sparkline_pie_4');
            expect(ele.getAttribute('fill')).toBe('orange');
            ele = helper_1.getIdElement(id + '_sparkline_pie_1');
            expect(ele.getAttribute('fill')).toBe('blue');
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
