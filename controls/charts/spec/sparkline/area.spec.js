define(["require", "exports", "../../src/sparkline/index", "../../src/sparkline/utils/helper", "@syncfusion/ej2-base", "./events.spec", "../common.spec"], function (require, exports, index_1, helper_1, ej2_base_1, events_spec_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    index_1.Sparkline.Inject(index_1.SparklineTooltip);
    describe('Sparkline Area Series Spec', function () {
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
        var id = 'sparks';
        var ele;
        var d;
        beforeAll(function () {
            element = ej2_base_1.createElement('div', { id: id });
            element.style.width = '400px';
            element.style.height = '100px';
            document.body.appendChild(element);
            sparkline = new index_1.Sparkline({
                width: '400', height: '100',
                type: 'Area',
                fill: '#f0c023ef',
                border: { color: '#9b7700', width: 2 },
                containerArea: {
                    border: {
                        color: '#09ac09', width: 2
                    },
                },
                valueType: 'DateTime',
                dataSource: [
                    { date: new Date(1990, 1, 1), value: 180000 },
                    { date: new Date(1990, 2, 1), value: 220000 },
                    { date: new Date(1990, 3, 1), value: 130000 },
                    { date: new Date(1990, 4, 1), value: 250000 },
                    { date: new Date(1990, 5, 1), value: 190000 },
                    { date: new Date(1990, 6, 1), value: 210000 },
                ], yName: 'value', xName: 'date'
            });
        });
        afterAll(function () {
            sparkline.destroy();
            helper_1.removeElement(id);
        });
        it('Sparkline area path and border path checking', function () {
            sparkline.loaded = function (args) {
                args.sparkline.loaded = function () { };
                ele = helper_1.getIdElement(id + '_sparkline_area');
                expect(ele.getAttribute('fill')).toBe('#f0c023ef');
                expect(ele.getAttribute('stroke')).toBe('transparent');
                expect(ele.getAttribute('stroke-width')).toBe('0');
                d = ele.getAttribute('d').split(' ');
                expect(d.length).toBe(25);
                ele = helper_1.getIdElement(id + '_sparkline_area_str');
                expect(ele.getAttribute('fill')).toBe('transparent');
                expect(ele.getAttribute('stroke')).toBe('#9b7700');
                expect(ele.getAttribute('stroke-width')).toBe('2');
                d = ele.getAttribute('d').split(' ');
                expect(d.length).toBe(19);
            };
            sparkline.appendTo('#' + id);
        });
        it('Sparkline container border checking with area type series', function () {
            ele = helper_1.getIdElement(id + '_SparklineBorder');
            d = ele.getAttribute('d').split(' ');
            var x = Number(d[1]);
            var y = Number(d[2]);
            var width = Number(d[9]) - x;
            var height = Number(d[18]) - y;
            expect(x).toBe(1);
            expect(y).toBe(1);
            expect(height).toBe(98);
            expect(width).toBe(398);
        });
        it('Sparkline area series path checking', function () {
            ele = helper_1.getIdElement(id + '_sparkline_area');
            d = ele.getAttribute('d').split(' ');
            expect(d[0]).toBe('M');
            expect(d[1]).toBe('5');
            expect(d[2]).toBe('95');
            expect(d[3]).toBe('L');
            expect(d[4]).toBe('5');
            expect(d[5]).toBe('57');
            expect(d[6]).toBe('L');
            expect(d[7]).toBe('78');
            expect(d[8]).toBe('27');
            expect(d[9]).toBe('L');
            expect(d[10]).toBe('158');
            expect(d[11]).toBe('95');
            expect(d[12]).toBe('L');
            expect(d[13]).toBe('236');
            expect(d[14]).toBe('5');
            expect(d[15]).toBe('L');
            expect(d[16]).toBe('317');
            expect(d[17]).toBe('50');
            expect(d[18]).toBe('L');
            expect(d[19]).toBe('395');
            expect(d[20]).toBe('35');
            expect(d[21]).toBe('L');
            expect(d[22]).toBe('395');
            expect(d[23]).toBe('95');
            expect(d[24]).toBe('Z');
        });
        it('Sparkline area series stroke path checking', function () {
            ele = helper_1.getIdElement(id + '_sparkline_area_str');
            d = ele.getAttribute('d').split(' ');
            expect(d[0]).toBe('M');
            expect(d[1]).toBe('5');
            expect(d[2]).toBe('57');
            expect(d[3]).toBe('L');
            expect(d[4]).toBe('78');
            expect(d[5]).toBe('27');
            expect(d[6]).toBe('L');
            expect(d[7]).toBe('158');
            expect(d[8]).toBe('95');
            expect(d[9]).toBe('L');
            expect(d[10]).toBe('236');
            expect(d[11]).toBe('5');
            expect(d[12]).toBe('L');
            expect(d[13]).toBe('317');
            expect(d[14]).toBe('50');
            expect(d[15]).toBe('L');
            expect(d[16]).toBe('395');
            expect(d[17]).toBe('35');
        });
        it('Sparkline area series axis y min value change checking', function () {
            sparkline.axisSettings.minY = 100000;
            sparkline.dataBind();
            ele = helper_1.getIdElement(id + '_sparkline_area');
            d = ele.getAttribute('d').split(' ');
            expect(d[9]).toBe('L');
            expect(d[10]).toBe('158');
            expect(d[11]).toBe('77');
        });
        it('Sparkline area series axis y max value change checking', function () {
            sparkline.axisSettings.maxY = 300000;
            sparkline.dataBind();
            ele = helper_1.getIdElement(id + '_sparkline_area');
            d = ele.getAttribute('d').split(' ');
            expect(d[9]).toBe('L');
            expect(d[10]).toBe('158');
            expect(d[11]).toBe('81');
        });
        it('Sparkline area series axis x max value change checking', function () {
            sparkline.axisSettings.maxX = new Date(1990, 4, 1).getTime();
            sparkline.dataBind();
            ele = helper_1.getIdElement(id + '_sparkline_area');
            d = ele.getAttribute('d').split(' ');
            expect(d[9]).toBe('L');
            expect(d[13]).toBe('395');
            expect(d[14]).toBe('27');
        });
        it('Sparkline area series axis x min value change checking', function () {
            sparkline.axisSettings.minX = new Date(1990, 0, 1).getTime();
            sparkline.dataBind();
            ele = helper_1.getIdElement(id + '_sparkline_area');
            d = ele.getAttribute('d').split(' ');
            expect(d[0]).toBe('M');
            expect(d[1]).toBe('106');
            expect(d[2]).toBe('95');
            expect(d[3]).toBe('L');
            expect(d[4]).toBe('106');
            expect(d[5]).toBe('59');
        });
        it('Sparkline area series axis value and line checking', function () {
            sparkline.axisSettings = { maxX: null, minY: null, maxY: null, minX: null, value: 200000 };
            sparkline.axisSettings.lineSettings = { color: '#6f00af', width: 2, visible: true };
            sparkline.dataBind();
            ele = helper_1.getIdElement(id + '_sparkline_area');
            d = ele.getAttribute('d').split(' ');
            expect(d[0]).toBe('M');
            expect(d[1]).toBe('5');
            expect(d[2]).toBe('42');
            expect(d[3]).toBe('L');
            expect(d[4]).toBe('5');
            expect(d[5]).toBe('57');
            ele = helper_1.getIdElement(id + '_Sparkline_XAxis');
            expect(ele.getAttribute('x1')).toBe('5');
            expect(ele.getAttribute('y1')).toBe('42');
            expect(ele.getAttribute('x2')).toBe('395');
            expect(ele.getAttribute('y2')).toBe('42');
            expect(ele.getAttribute('stroke-width')).toBe('2');
            expect(ele.getAttribute('stroke')).toBe('#6f00af');
        });
        it('Sparkline area series axis value and line checking', function (done) {
            sparkline.pointRegionMouseClick = function (args) {
                expect(args.pointIndex).toBe(0);
                done();
            };
            sparkline.loaded = function (args) {
                ele = helper_1.getIdElement(id + '_sparkline_area');
                var trigger = new events_spec_1.MouseEvents();
                trigger.mouseclickEvent(ele, 13, 60, 13, 60);
            };
            sparkline.refresh();
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
