define(["require", "exports", "../../src/sparkline/index", "../../src/sparkline/utils/helper", "@syncfusion/ej2-base", "./events.spec", "../common.spec"], function (require, exports, index_1, helper_1, ej2_base_1, events_spec_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    index_1.Sparkline.Inject(index_1.SparklineTooltip);
    describe('Sparkline data source combination spec', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        var trigger = new events_spec_1.MouseEvents();
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
                height: '200',
                width: '600',
                lineWidth: 2,
                fill: '#6404c4',
                containerArea: {
                    border: {
                        color: '#09ac09', width: 2
                    },
                    background: '#f3eeee'
                },
                tooltipSettings: {
                    visible: true,
                    format: '${xDate} : ${yval}',
                    trackLineSettings: {
                        visible: true,
                        color: 'red', width: 2
                    }
                },
                dataSource: [
                    { xDate: new Date(2017, 1, 1), x: 0, xval: 'God Hand', yval: 2900 },
                    { xDate: new Date(2017, 1, 2), x: 1, xval: 'God of War', yval: 3900 },
                    { xDate: new Date(2017, 1, 3), x: 2, xval: 'Uncharted', yval: 3500 },
                    { xDate: new Date(2017, 1, 4), x: 3, xval: 'Yazuka', yval: 3800 },
                    { xDate: new Date(2017, 1, 5), x: 4, xval: 'GTA V', yval: 2500 },
                    { xDate: new Date(2017, 1, 6), x: 5, xval: 'Tomb Rider', yval: 3200 },
                    { xDate: new Date(2017, 1, 7), x: 6, xval: 'Sleeping Dogs', yval: 1800 },
                    { xDate: new Date(2017, 1, 8), x: 7, xval: 'Final Fantasy', yval: 5000 },
                ], yName: 'yval', xName: 'x'
            });
        });
        afterAll(function () {
            sparkline.destroy();
            helper_1.removeElement(id);
        });
        it('Sparkline height and width parent size priority checking', function () {
            sparkline.loaded = function (args) {
                ele = helper_1.getIdElement(id + '_sparkline_line');
                expect(ele.getAttribute('stroke')).toBe('#6404c4');
                d = ele.getAttribute('d').split(' ');
                expect(d.length).toBe(28);
                ele = helper_1.getIdElement(id + '_SparklineBorder');
                d = ele.getAttribute('d').split(' ');
                var x = Number(d[1]);
                var y = Number(d[2]);
                var width = Number(d[9]) - x;
                var height = Number(d[18]) - y;
                expect(height).toBe(198);
                expect(width).toBe(598);
            };
            sparkline.appendTo('#' + id);
        });
        it('Sparkline datetime value type checking', function () {
            sparkline.loaded = function () { };
            sparkline.fill = '#f76c36';
            sparkline.xName = 'xDate';
            sparkline.valueType = 'DateTime';
            sparkline.dataBind();
            ele = helper_1.getIdElement(id + '_sparkline_line');
            trigger.mousemoveEvent(ele, 0, 0, 300, 100);
            expect(ele.getAttribute('stroke')).toBe('#f76c36');
            d = ele.getAttribute('d').split(' ');
            expect(d.length).toBe(28);
            ele = helper_1.getIdElement(id + '_sparkline_tooltip_div_text');
            expect(ele.firstChild.textContent).toBe('Sat Feb 04 2017 ');
            expect(ele.lastChild.textContent).toBe(' 3800');
            ele = helper_1.getIdElement(id);
            trigger.mouseLeaveEvent(ele);
        });
        it('Sparkline category value type checking', function () {
            sparkline.fill = '#07e22c';
            sparkline.xName = 'xval';
            sparkline.valueType = 'Category';
            sparkline.tooltipSettings.format = '${xval} : ${yval}';
            sparkline.dataBind();
            ele = helper_1.getIdElement(id + '_sparkline_line');
            trigger.mousemoveEvent(ele, 0, 0, 300, 100);
            expect(ele.getAttribute('stroke')).toBe('#07e22c');
            d = ele.getAttribute('d').split(' ');
            expect(d.length).toBe(28);
            ele = helper_1.getIdElement(id + '_sparkline_tooltip_div_text');
            expect(ele.firstChild.textContent).toBe('Yazuka ');
            expect(ele.lastChild.textContent).toBe(' 3800');
            ele = helper_1.getIdElement(id);
            trigger.mouseLeaveEvent(ele);
        });
        it('Sparkline category value type x values same checking', function () {
            sparkline.dataSource = [
                { xval: 'God Hand', yval: 2900 },
                { xval: 'God of War', yval: 3900 },
                { xval: 'Uncharted', yval: 3500 },
                { xval: 'Yazuka', yval: 3800 },
                { xval: 'GTA V', yval: 2500 },
                { xval: 'Tomb Rider', yval: 3200 },
                { xval: 'Sleeping Dogs', yval: 1800 },
                { xval: 'Final Fantasy', yval: 5000 },
                { xval: 'Uncharted', yval: 2900 },
            ];
            sparkline.fill = '#244af0';
            sparkline.dataBind();
            ele = helper_1.getIdElement(id + '_sparkline_line');
            expect(ele.getAttribute('stroke')).toBe('#244af0');
            d = ele.getAttribute('d').split(' ');
            expect(d.length).toBe(31);
            expect(d[10]).toBe('174');
            expect(d[13]).toBe('174');
            expect(d[10]).toBe(d[13]);
        });
        it('Sparkline category value type min X and max X checking', function () {
            expect(d[1]).toBe('5');
            expect(d[28]).toBe('595');
        });
        it('Sparkline category value type min Y and max Y checking', function () {
            expect(d[26]).toBe('195');
            expect(d[29]).toBe('5');
        });
        it('Sparkline category value type random point location checking', function () {
            expect(d[16]).toBe('258');
            expect(d[17]).toBe('76');
        });
        it('Sparkline category value type y values negative checking', function () {
            sparkline.dataSource = [
                { xval: 'God Hand', yval: -2900 },
                { xval: 'God of War', yval: -3900 },
                { xval: 'Uncharted', yval: -3500 },
                { xval: 'Yazuka', yval: -3800 },
                { xval: 'GTA V', yval: -2500 },
                { xval: 'Tomb Rider', yval: -3200 },
                { xval: 'Sleeping Dogs', yval: -1800 },
                { xval: 'Final Fantasy', yval: -5000 },
            ];
            sparkline.fill = '#e915de';
            sparkline.dataBind();
            ele = helper_1.getIdElement(id + '_sparkline_line');
            expect(ele.getAttribute('stroke')).toBe('#e915de');
            d = ele.getAttribute('d').split(' ');
            expect(d.length).toBe(28);
        });
        it('Sparkline category value type y values negative  min X and max X checking', function () {
            expect(d[1]).toBe('5');
            expect(d[25]).toBe('595');
        });
        it('Sparkline category value type y values negative  min Y and max Y checking', function () {
            expect(d[23]).toBe('5');
            expect(d[26]).toBe('195');
        });
        it('Sparkline category value type y values negative random point location checking', function () {
            expect(d[16]).toBe('342');
            expect(d[17]).toBe('47');
        });
        it('Sparkline category value type y values positive and negative checking', function () {
            sparkline.dataSource = [
                { xval: 'God Hand', yval: -2900 },
                { xval: 'God of War', yval: -3900 },
                { xval: 'Uncharted', yval: 3500 },
                { xval: 'Yazuka', yval: -3800 },
                { xval: 'GTA V', yval: 2500 },
                { xval: 'Tomb Rider', yval: -3200 },
                { xval: 'Sleeping Dogs', yval: 1800 },
                { xval: 'Final Fantasy', yval: -5000 },
            ];
            sparkline.fill = '#f78d15';
            sparkline.dataBind();
            ele = helper_1.getIdElement(id + '_sparkline_line');
            expect(ele.getAttribute('stroke')).toBe('#f78d15');
            d = ele.getAttribute('d').split(' ');
            expect(d.length).toBe(28);
        });
        it('Sparkline category value type y values positive and negative   min X and max X checking', function () {
            expect(d[1]).toBe('5');
            expect(d[25]).toBe('595');
        });
        it('Sparkline category value type y values positive and negative   min Y and max Y checking', function () {
            expect(d[11]).toBe('5');
            expect(d[26]).toBe('195');
        });
        it('Sparkline category value type y values positive and negative  random point location checking', function () {
            expect(d[19]).toBe('426');
            expect(d[20]).toBe('155');
        });
        it('Sparkline Date time axis value type checking with shuffled and same x values points', function () {
            sparkline.dataSource = [
                { xDate: new Date(2017, 1, 1), yval: 2314585481 },
                { xDate: new Date(2017, 5, 2), yval: 3905235430 },
                { xDate: new Date(2017, 7, 3), yval: 4124124321 },
                { xDate: new Date(2017, 9, 4), yval: 3804563235 },
                { xDate: new Date(2017, 3, 5), yval: 6234234652 },
                { xDate: new Date(2017, 6, 6), yval: 6343534513 },
                { xDate: new Date(2017, 2, 7), yval: 5235435523 },
                { xDate: new Date(2017, 8, 8), yval: 5013551546 },
                { xDate: new Date(2017, 7, 3), yval: 3013551546 },
            ];
            sparkline.fill = '#f78d15';
            sparkline.valueType = 'DateTime';
            sparkline.xName = 'xDate';
            sparkline.dataBind();
            ele = helper_1.getIdElement(id + '_sparkline_line');
            expect(ele.getAttribute('stroke')).toBe('#f78d15');
            d = ele.getAttribute('d').split(' ');
            expect(d.length).toBe(31);
            expect(d[19]).toBe(d[22]);
            expect(d[19]).toBe('446');
            expect(d[20]).toBe('110');
            expect(d[22]).toBe('446');
            expect(d[23]).toBe('162');
        });
        it('Sparkline Date time axis value type checking  min X and max X checking', function () {
            expect(d[1]).toBe('5');
            expect(d[28]).toBe('595');
        });
        it('Sparkline Date time axis value type checking  min Y and max Y checking', function () {
            expect(d[2]).toBe('195');
            expect(d[17]).toBe('5');
        });
        it('Sparkline Date time axis value type checking random point location checking', function () {
            expect(d[10]).toBe('157');
            expect(d[11]).toBe('10');
        });
        it('Sparkline Date time axis value type checking with all points are same x value points', function () {
            sparkline.dataSource = [
                { xDate: new Date(2000, 5, 10), yval: 3145481 },
                { xDate: new Date(2000, 5, 10), yval: 9055430 },
                { xDate: new Date(2000, 5, 10), yval: 1244321 },
                { xDate: new Date(2000, 5, 10), yval: 8043235 },
                { xDate: new Date(2000, 5, 10), yval: 2344652 },
                { xDate: new Date(2000, 5, 10), yval: 3434513 },
                { xDate: new Date(2000, 5, 10), yval: 2355523 },
                { xDate: new Date(2000, 5, 10), yval: 4131546 },
                { xDate: new Date(2000, 5, 10), yval: 7131546 },
            ];
            sparkline.fill = '#12f7f7';
            sparkline.dataBind();
            ele = helper_1.getIdElement(id + '_sparkline_line');
            expect(ele.getAttribute('stroke')).toBe('#12f7f7');
            d = ele.getAttribute('d').split(' ');
            expect(d.length).toBe(31);
            for (var i = 1; i < 31; i += 3) {
                expect(d[i]).toBe('300');
            }
        });
        it('Sparkline Date time axis value type checking with single point', function () {
            sparkline.dataSource = [
                { xDate: new Date(2000, 5, 10), yval: 8043235 }
            ];
            sparkline.fill = '#4fc04f';
            sparkline.dataBind();
            ele = helper_1.getIdElement(id + '_sparkline_line');
            expect(ele.getAttribute('stroke')).toBe('#4fc04f');
            d = ele.getAttribute('d').split(' ');
            expect(d.length).toBe(7);
            expect(d[1]).toBe('300');
            expect(d[2]).toBe('10');
            expect(d[4]).toBe('300');
            expect(d[5]).toBe('10');
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
