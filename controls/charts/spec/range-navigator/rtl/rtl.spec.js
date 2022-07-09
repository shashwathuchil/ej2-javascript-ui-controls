define(["require", "exports", "../../../src/range-navigator/index", "../../../src/chart/index", "@syncfusion/ej2-base", "../../../spec/chart/base/events.spec", "../../common.spec"], function (require, exports, index_1, index_2, ej2_base_1, events_spec_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    index_1.RangeNavigator.Inject(index_2.Logarithmic, index_2.DateTime, index_2.LineSeries, index_2.AreaSeries);
    var value = 0;
    var point;
    var data = [];
    var args;
    var trigger = new events_spec_1.MouseEvents();
    var dateTime = [];
    var isDrag;
    dateTime = [{ x: new Date(2000, 3), y: 34 }, { x: new Date(2000, 6), y: 32 },
        { x: new Date(2000, 11), y: 23 }, { x: new Date(2001, 3), y: 12 },
        { x: new Date(2001, 6), y: 83 }, { x: new Date(2001, 11), y: 76 },
        { x: new Date(2002, 3), y: 34 }, { x: new Date(2002, 6), y: 32 },
        { x: new Date(2002, 11), y: 65 }, { x: new Date(2003, 3), y: 98 },
        { x: new Date(2003, 6), y: 10 }, { x: new Date(2003, 11), y: 34 }];
    for (var j = 0; j < 100; j++) {
        value += (Math.random() * 10);
        point = { x: j, y: value };
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
        describe('RTL with numeric axis', function () {
            var element;
            var range;
            var rangeElement = ej2_base_1.createElement('div', { id: 'container' });
            var axisLabel;
            beforeAll(function () {
                document.body.appendChild(rangeElement);
                range = new index_1.RangeNavigator({
                    series: [{
                            dataSource: [{ x: 10, y: 20 }, { x: 20, y: 12 }, { x: 30, y: 22 }, { x: 40, y: 16 }],
                            xName: 'x', yName: 'y', type: 'Line'
                        }],
                    enableRtl: false
                });
                range.appendTo('#container');
            });
            afterAll(function () {
                range.destroy();
                rangeElement.remove();
            });
            it('checking with axis labels numeric', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('container_AxisLabel_0');
                    var element1 = document.getElementById('container_AxisLabel_2');
                    expect((element.getAttribute('x')) > (element1.getAttribute('x'))).toBe(true);
                    done();
                };
                range.series = [{ dataSource: data, xName: 'x', yName: 'y', type: 'Line' }];
                range.minimum = 10;
                range.maximum = 50;
                range.enableRtl = true;
                range.refresh();
            });
            it('checking with area series animation', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('container_Series_0');
                    expect(element.getAttribute('fill')).toEqual('#00bdae');
                    done();
                };
                range.series[0].type = 'Area';
                range.series[0].dataSource = data;
                range.series[0].animation.enable = true;
                range.refresh();
            });
            it('checking with left slider', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('container_LeftSlider');
                    expect(element.childNodes.length === 4).toBe(true);
                    expect(element.getAttribute('d') !== '').toBe(true);
                    done();
                };
                range.navigatorStyleSettings.thumb.border.color = 'green';
                range.navigatorStyleSettings.thumb.border.width = 3;
                range.minimum = 10;
                range.maximum = 50;
                range.refresh();
            });
            it('checking with right slider', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('container_RightSlider');
                    expect(element.childNodes.length).toEqual(4);
                    expect(element.getAttribute('d') !== '').toBe(true);
                    done();
                };
                range.navigatorStyleSettings.thumb.border.color = 'green';
                range.navigatorStyleSettings.thumb.border.width = 3;
                range.minimum = 10;
                range.maximum = 50;
                range.refresh();
            });
            it('checking with rtl slider mouse event', function (done) {
                range.loaded = function (args) {
                    var targetElement = document.getElementById('container_RightSlider_ThumpSymbol');
                    range.rangeOnMouseDown(trigger.onTouchStart(targetElement, 608, 189, null, null, 504, 289));
                    range.mouseMove(trigger.onTouchMove(targetElement, 728, 389, null, null, 404, 189));
                    range.mouseEnd(trigger.onTouchEnd(targetElement, 728, 389, null, null, 404, 189));
                    var thumbTransform = document.getElementById('container_RightSlider').getAttribute('transform');
                    var leftthumbTransform = document.getElementById('container_LeftSlider').getAttribute('transform');
                    expect(thumbTransform === 'translate(386.00000000000006, 0)' || thumbTransform === 'translate(381, 0)' ||
                        thumbTransform === 'translate(386, 0)' || thumbTransform === 'translate(385.99999999999994, 0)').toBe(true);
                    expect(targetElement != null).toBe(true);
                    done();
                };
                range.enableRtl = true;
                range.refresh();
            });
        });
        describe('RTL with date time axis', function () {
            var element;
            var element1;
            var range;
            var rangeElement = ej2_base_1.createElement('div', { id: 'container' });
            var axisLabel;
            beforeAll(function () {
                document.body.appendChild(rangeElement);
                range = new index_1.RangeNavigator({
                    series: [{
                            dataSource: dateTime,
                            xName: 'x', yName: 'y', type: 'Line'
                        }],
                    enableRtl: false
                });
                range.appendTo('#container');
            });
            afterAll(function () {
                range.destroy();
                rangeElement.remove();
            });
            it('checking with date time axis', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('container_AxisLabel_3');
                    expect(element.firstChild.textContent === 'Quarter1' || element.firstChild.textContent === 'Q1 2001').toBe(true);
                    expect(element.getAttribute('opacity') === '1').toBe(true);
                    done();
                };
                range.valueType = 'DateTime';
                range.series[0].dataSource = dateTime;
                range.enableRtl = true;
                range.refresh();
            });
            it('checking with date time axis grouping label', function (done) {
                range.loaded = function (args) {
                    element1 = document.getElementById('container_SecondaryLabel_0');
                    element = document.getElementById('container_SecondaryLabel_2');
                    expect(element.getAttribute('x') < element1.getAttribute('x')).toBe(true);
                    done();
                };
                range.valueType = 'DateTime';
                range.series[0].dataSource = dateTime;
                range.enableGrouping = true;
                range.enableRtl = true;
                range.refresh();
            });
            it('checking with rtl label position inside', function (done) {
                range.loaded = function (args) {
                    element1 = document.getElementById('container_AxisLabel_1');
                    element = document.getElementById('container_SecondaryLabel_2');
                    var targetElement = document.getElementById('container_LeftSlider_ThumpSymbol');
                    range.rangeOnMouseDown(trigger.onTouchStart(targetElement, 720, 180, null, null, 504, 280));
                    expect(element.getAttribute('y') < element1.getAttribute('y')).toBe(true);
                    done();
                };
                range.valueType = 'DateTime';
                range.series[0].dataSource = dateTime;
                range.navigatorStyleSettings.selectedRegionColor = 'red';
                range.labelPosition = 'Inside';
                range.enableGrouping = true;
                range.refresh();
            });
            it('checking with First level labels ', function (done) {
                range.loaded = function (args) {
                    element1 = document.getElementById('container_AxisLabel_1');
                    element = document.getElementById('container_AxisLabel_2');
                    range.rangeOnMouseDown(trigger.onTouchStart(element, 434, 105, null, null, 470, 120));
                    expect(element.getAttribute('x') < element1.getAttribute('x')).toBe(true);
                    done();
                };
                range.series[0].dataSource = dateTime;
                range.navigatorStyleSettings.selectedRegionColor = 'blue';
                range.enableGrouping = true;
                range.refresh();
            });
            it('checking with secondary level labels ', function (done) {
                range.loaded = function (args) {
                    element1 = document.getElementById('container_SecondaryLabel_0');
                    element = document.getElementById('container_SecondaryLabel_2');
                    range.rangeOnMouseDown(trigger.onTouchStart(element, 434, 105, null, null, 470, 120));
                    expect(element.getAttribute('x') < element1.getAttribute('x')).toBe(true);
                    done();
                };
                range.series[0].dataSource = dateTime;
                range.navigatorStyleSettings.selectedRegionColor = 'blue';
                range.enableGrouping = true;
                range.refresh();
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
