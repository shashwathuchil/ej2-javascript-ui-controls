define(["require", "exports", "../../src/sparkline/index", "@syncfusion/ej2-base", "../../src/sparkline/utils/helper", "../common.spec"], function (require, exports, index_1, ej2_base_1, helper_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    index_1.Sparkline.Inject(index_1.SparklineTooltip);
    describe('Sparkline Component Line Series Spec', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('Sparkline testing Line series spec', function () {
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
                    dataSource: [-10, 5, -15, 10, 5, 15, -20, 25]
                });
            });
            afterAll(function () {
                sparkline.destroy();
                helper_1.removeElement(id);
            });
            it('Sparkline line series checking with array of data', function () {
                sparkline.loaded = function () {
                    ele = helper_1.getIdElement(id + '_sparkline_line');
                    expect(ele.getAttribute('opacity')).toBe('1');
                    expect(ele.getAttribute('stroke')).toBe('#00bdae');
                    expect(ele.getAttribute('stroke-width')).toBe('1');
                    expect(ele.getAttribute('fill')).toBe('transparent');
                    d = ele.getAttribute('d').split(' ');
                    expect(d.length).toBe(28);
                    d = ele.getAttribute('d').split('M');
                    expect(d.length).toBe(2);
                    d = ele.getAttribute('d').split('L');
                    expect(d.length).toBe(9);
                };
                sparkline.appendTo('#' + id);
            });
            it('Sparkline line series checking with object array of data', function () {
                sparkline.loaded = function () {
                    ele = helper_1.getIdElement(id + '_sparkline_line');
                    expect(ele.getAttribute('opacity')).toBe('1');
                    expect(ele.getAttribute('stroke')).toBe('#00bdae');
                    expect(ele.getAttribute('stroke-width')).toBe('1');
                    expect(ele.getAttribute('fill')).toBe('transparent');
                    d = ele.getAttribute('d').split(' ');
                    expect(d.length).toBe(22);
                    d = ele.getAttribute('d').split('M');
                    expect(d.length).toBe(2);
                    d = ele.getAttribute('d').split('L');
                    expect(d.length).toBe(7);
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
            it('Sparkline range band checking spec', function () {
                sparkline.loaded = function () {
                    ele = helper_1.getIdElement(id + '_rangeBand_1');
                    expect(ele.getAttribute('opacity')).toBe('0.5');
                    expect(ele.getAttribute('stroke')).toBe('transparent');
                    expect(ele.getAttribute('stroke-width')).toBe('1');
                    expect(ele.getAttribute('fill')).toBe('blue');
                    d = ele.getAttribute('d').split(' ');
                    expect(d.length).toBe(14);
                    d = ele.getAttribute('d').split('M');
                    expect(d.length).toBe(2);
                    d = ele.getAttribute('d').split('L');
                    expect(d.length).toBe(4);
                };
                sparkline.rangeBandSettings = [
                    { startRange: 1500, endRange: 6000, color: 'gray', opacity: 1 },
                    { startRange: 500, endRange: 1500, color: 'blue', opacity: 0.5 },
                    { startRange: 1500, endRange: 3500, color: 'red', opacity: 1 },
                    { startRange: 4000, endRange: 6000, color: 'blue', opacity: 2 },
                ];
                sparkline.refresh();
            });
            it('Sparkline line series checking with axis settings', function () {
                sparkline.loaded = function () {
                    ele = helper_1.getIdElement(id + '_Sparkline_XAxis');
                    expect(ele.getAttribute('x1')).toBe('5');
                    expect(ele.getAttribute('y1')).toBe('35');
                    expect(ele.getAttribute('x2')).toBe('75');
                    expect(ele.getAttribute('y2')).toBe('35');
                    expect(ele.getAttribute('stroke')).toBe('#000000');
                    expect(ele.getAttribute('stroke-width')).toBe('1');
                };
                sparkline.axisSettings = {
                    minX: 1, maxX: 4, minY: 2800, maxY: 3800,
                    lineSettings: { visible: true }
                };
                sparkline.refresh();
            });
            it('Sparkline axis custom value and line customization', function () {
                sparkline.loaded = function () {
                    ele = helper_1.getIdElement(id + '_Sparkline_XAxis');
                    expect(ele.getAttribute('x1')).toBe('5');
                    expect(ele.getAttribute('y1')).toBe('20');
                    expect(ele.getAttribute('x2')).toBe('75');
                    expect(ele.getAttribute('y2')).toBe('20');
                    expect(ele.getAttribute('stroke')).toBe('#9900cc');
                    expect(ele.getAttribute('stroke-width')).toBe('3');
                };
                sparkline.axisSettings = {
                    value: 3300,
                    lineSettings: { visible: true, color: '#9900cc', width: 3 }
                };
                sparkline.theme = 'MaterialDark';
                sparkline.refresh();
            });
            it('Sparkline line with negative values', function () {
                sparkline.loaded = function (args) {
                    ele = helper_1.getIdElement(id + '_sparkline_line');
                    d = ele.getAttribute('d').split(' ');
                    expect(d.length).toBe(31);
                    d = ele.getAttribute('d').split('M');
                    expect(d.length).toBe(2);
                    d = ele.getAttribute('d').split('L');
                    expect(d.length).toBe(10);
                };
                sparkline.theme = 'BootstrapDark';
                sparkline.axisSettings = { minY: -9, maxY: -1, value: -5, minX: 0, maxX: 8 };
                sparkline.dataSource = [-3, -8, -5, -1, -7, -4, -9, -2, -6];
                sparkline.refresh();
            });
            it('Sparkline line with category axis', function () {
                sparkline.loaded = function (args) {
                    ele = helper_1.getIdElement(id + '_sparkline_line');
                    d = ele.getAttribute('d').split(' ');
                    expect(d.length).toBe(28);
                    d = ele.getAttribute('d').split('M');
                    expect(d.length).toBe(2);
                    d = ele.getAttribute('d').split('L');
                    expect(d.length).toBe(9);
                };
                sparkline.axisSettings = { minY: 3000, maxY: 5500, value: -5, minX: 0, maxX: 8 };
                sparkline.dataSource = [
                    { xDate: new Date(2017, 1, 1), x: 0, xval: 'Jan', yval: 2900 },
                    { xDate: new Date(2017, 1, 2), x: 1, xval: 'Feb', yval: 3900 },
                    { xDate: new Date(2017, 1, 3), x: 2, xval: 'Mar', yval: 3500 },
                    { xDate: new Date(2017, 1, 4), x: 3, xval: 'Apr', yval: 3800 },
                    { xDate: new Date(2017, 1, 5), x: 4, xval: 'May', yval: 2500 },
                    { xDate: new Date(2017, 1, 6), x: 5, xval: 'Jun', yval: 3200 },
                    { xDate: new Date(2017, 1, 7), x: 6, xval: 'Jul', yval: 1800 },
                    { xDate: new Date(2017, 1, 8), x: 7, xval: 'Aug', yval: 5000 },
                ];
                sparkline.refresh();
            });
            it('Sparkline line with datetime axis', function () {
                sparkline.loaded = function (args) {
                    ele = helper_1.getIdElement(id + '_sparkline_line');
                    d = ele.getAttribute('d').split(' ');
                    expect(d.length).toBe(28);
                    d = ele.getAttribute('d').split('M');
                    expect(d.length).toBe(2);
                    d = ele.getAttribute('d').split('L');
                    expect(d.length).toBe(9);
                };
                sparkline.axisSettings = { minX: new Date(2017, 1, 1).getTime(), maxX: new Date(2017, 1, 8).getTime() };
                sparkline.dataSource = [
                    { xDate: new Date(2017, 1, 1), x: 0, xval: 'Jan', yval: 2900 },
                    { xDate: new Date(2017, 1, 2), x: 1, xval: 'Feb', yval: 3900 },
                    { xDate: new Date(2017, 1, 3), x: 2, xval: 'Mar', yval: 3500 },
                    { xDate: new Date(2017, 1, 4), x: 3, xval: 'Apr', yval: 3800 },
                    { xDate: new Date(2017, 1, 5), x: 4, xval: 'May', yval: 2500 },
                    { xDate: new Date(2017, 1, 6), x: 5, xval: 'Jun', yval: 3200 },
                    { xDate: new Date(2017, 1, 7), x: 6, xval: 'Jul', yval: 1800 },
                    { xDate: new Date(2017, 1, 8), x: 7, xval: 'Aug', yval: 5000 },
                ];
                sparkline.xName = 'xDate';
                sparkline.theme = 'HighContrast';
                sparkline.refresh();
            });
            it('Sparkline line with datetime axis', function () {
                sparkline.loaded = function (args) {
                    ele = helper_1.getIdElement(id + '_sparkline_line');
                    d = ele.getAttribute('d').split(' ');
                    expect(d.length).toBe(28);
                    d = ele.getAttribute('d').split('M');
                    expect(d.length).toBe(2);
                    d = ele.getAttribute('d').split('L');
                    expect(d.length).toBe(9);
                };
                sparkline.axisSettings = { minX: new Date(2017, 1, 1).getTime(), maxX: new Date(2017, 1, 8).getTime() };
                sparkline.dataSource = [
                    { xDate: new Date(2017, 1, 1), x: 0, xval: 'Jan', yval: 2900 },
                    { xDate: new Date(2017, 1, 2), x: 1, xval: 'Feb', yval: 3900 },
                    { xDate: new Date(2017, 1, 3), x: 2, xval: 'Mar', yval: 3500 },
                    { xDate: new Date(2017, 1, 4), x: 3, xval: 'Apr', yval: 3800 },
                    { xDate: new Date(2017, 1, 5), x: 4, xval: 'May', yval: 2500 },
                    { xDate: new Date(2017, 1, 6), x: 5, xval: 'Jun', yval: 3200 },
                    { xDate: new Date(2017, 1, 7), x: 6, xval: 'Jul', yval: 1800 },
                    { xDate: new Date(2017, 1, 8), x: 7, xval: 'Aug', yval: 5000 },
                ];
                sparkline.xName = 'xDate';
                sparkline.theme = 'HighContrast';
                sparkline.enableRtl = true;
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
});
