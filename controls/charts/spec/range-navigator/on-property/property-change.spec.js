define(["require", "exports", "../../../src/range-navigator/index", "../../../src/chart/index", "@syncfusion/ej2-base", "../../common.spec"], function (require, exports, index_1, index_2, ej2_base_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    index_1.RangeNavigator.Inject(index_2.AreaSeries, index_2.DateTime, index_1.RangeTooltip);
    var value = 0;
    var point;
    var data = [];
    var newdata = [];
    var dateTime = [];
    for (var j = 0; j < 100; j++) {
        value += (Math.random() * 10 - 5);
        point = { x: j, y: value, y1: value + 10 };
        dateTime.push({ date: new Date(2018, 0, j), yValue: value });
        data.push(point);
    }
    for (var k = 50; k < 100; k++) {
        value += (Math.random() * 10 - 5);
        point = { x: k, y: value, y1: value + 10 };
        dateTime.push({ date: new Date(2018, 0, k), yValue: value });
        data.push(point);
    }
    describe('Range navigator', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('with default case', function () {
            var element;
            var range;
            var rangeElement = ej2_base_1.createElement('div', { id: 'container' });
            var axisLabel;
            beforeAll(function () {
                document.body.appendChild(rangeElement);
                range = new index_1.RangeNavigator({
                    series: [{ dataSource: data, xName: 'x', yName: 'y' }]
                });
                range.appendTo('#container');
            });
            afterAll(function () {
                range.destroy();
                rangeElement.remove();
            });
            it('empty options control class names', function () {
                element = document.getElementById('container');
                expect(element.classList.contains('e-control')).toBe(true);
                expect(element.classList.contains('e-rangenavigator')).toBe(true);
            });
            it('checking height and width', function () {
                range.width = '200';
                range.height = '100';
                range.dataBind();
                var container = document.getElementById('container_svg');
            });
            it('checking height and width', function () {
                range.labelPosition = 'Inside';
                range.dataBind();
                var element = document.getElementById('container_AxisLabel_0');
                expect(element.getAttribute('x')).toEqual('16');
                expect(element.getAttribute('y')).toEqual('102');
            });
            it('checking with tickPosition change', function () {
                range.tickPosition = 'Inside';
                range.dataBind();
                var element = document.getElementById('container_AxisLabel_0');
                expect(element.getAttribute('x')).toEqual('16');
                expect(element.getAttribute('y')).toEqual('102');
            });
            it('checking labelstyle', function () {
                range.tickPosition = 'Outside';
                range.labelStyle.color = 'yellow';
                range.dataBind();
                var element = document.getElementById('container_AxisLabel_0');
                expect(element.getAttribute('fill')).toEqual('yellow');
            });
            it('checking with range', function () {
                range.minimum = 5;
                range.maximum = 20;
                range.interval = 5;
                range.labelFormat = '{value}K';
                range.dataBind();
                var element = document.getElementById('container_AxisLabel_0');
                expect(element.textContent).toEqual('5K');
            });
            it('checking with valueType', function () {
                range.minimum = new Date(2018, 4);
                range.maximum = new Date(2018, 8);
                range.interval = null;
                range.intervalType = 'Months';
                range.labelFormat = '';
                range.labelStyle.color = 'blue';
                range.valueType = 'DateTime';
                range.series = [{ dataSource: dateTime, xName: 'date', yName: 'yValue' }];
                range.dataBind();
                var element = document.getElementById('container_chart');
                expect(element.childElementCount).not.toEqual(0);
            });
            it('checking skeleton', function () {
                range.skeleton = 'yMd';
                range.navigatorBorder = { color: 'red', width: 2 };
                range.enableRtl = true;
                range.dataBind();
                var element = document.getElementById('container_AxisLabel_0');
                expect(element.textContent === '5/1/2018' || element.textContent === '12/1/2017').toBe(true);
            });
            it('checking with resize', function () {
                window.dispatchEvent(new Event('resize'));
                var container = document.getElementById('container_svg');
                expect(container.getAttribute('width') === '758' || container.getAttribute('width') === '769').toEqual(true);
            });
            it('check with theme change', function () {
                range.theme = 'Fabric';
                range.labelStyle.color = '';
                range.locale = '';
                range.dataBind();
                var element = document.getElementById('container_AxisLabel_0');
                expect(element.getAttribute('fill') === '#686868').toBe(true);
            });
            it('check with range change', function () {
                range.value = [new Date(2018, 5, 3), new Date(2018, 5, 20)];
                range.dataBind();
                range.changed = function (args) {
                    expect(args.start).not.toEqual(null);
                };
            });
            it('check with datasource change', function () {
                range.series[0].dataSource = newdata;
                range.changed = function (args) {
                    expect(args.start).not.toEqual(null);
                };
                range.dataBind();
            });
            it('Checking with direct data', function () {
                range.dataSource = data;
                range.xName = 'x';
                range.yName = 'y';
                range.tooltip = { displayMode: 'Always' };
                range.dataBind();
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
