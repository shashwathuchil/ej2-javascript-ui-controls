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
        describe('with Sliders', function () {
            var element;
            var range;
            var rangeElement = ej2_base_1.createElement('div', { id: 'container' });
            var axisLabel;
            var prevent = function () {
            };
            beforeAll(function () {
                document.body.appendChild(rangeElement);
                range = new index_1.RangeNavigator({
                    series: [{
                            dataSource: [{ x: 10, y: 20 }, { x: 20, y: 12 }, { x: 30, y: 22 }, { x: 40, y: 16 }],
                            xName: 'x', yName: 'y', type: 'Line'
                        }],
                    allowSnapping: false
                });
                range.appendTo('#container');
            });
            afterAll(function () {
                range.destroy();
                rangeElement.remove();
            });
            it('checking with default sliders', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('container_sliders');
                    expect(element != null).toBe(true);
                    done();
                };
                range.series = [{ dataSource: data, xName: 'x', yName: 'y', type: 'Line' }];
                range.minimum = 10;
                range.refresh();
            });
            it('checking with slider selected area', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('container_SelectedArea');
                    expect(+element.getAttribute('width') >= 507.75 && +element.getAttribute('width') <= 561).toBe(true);
                    done();
                };
                range.series = [{ dataSource: data, xName: 'x', yName: 'y', type: 'Line' }];
                range.minimum = 10;
                range.maximum = 50;
                range.refresh();
            });
            it('checking with slider poition changes', function (done) {
                range.loaded = function (args) {
                    var element = document.getElementById('container_rightUnSelectedArea');
                    var eventObj = {
                        target: element,
                        type: 'click',
                        stopImmediatePropagation: prevent,
                        pageX: +element.getAttribute('x'),
                        pageY: +element.getAttribute('y')
                    };
                    range.rangeOnMouseClick(eventObj);
                    done();
                };
                range.animationDuration = 0;
                range.navigatorStyleSettings.selectedRegionColor = 'green';
                range.refresh();
            });
            it('checking with right un selected area', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('container_rightUnSelectedArea');
                    expect(element.getAttribute('fill') === 'yellow').toBe(true);
                    done();
                };
                range.series = [{ dataSource: data, xName: 'x', yName: 'y', type: 'Line' }];
                range.navigatorStyleSettings.unselectedRegionColor = 'yellow';
                range.minimum = 10;
                range.maximum = 50;
                range.refresh();
            });
            it('checking with thump size', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('container_RightSlider');
                    expect(element.childNodes.length === 4).toBe(true);
                    expect(element.getAttribute('d') !== '').toBe(true);
                    done();
                };
                range.navigatorStyleSettings.thumb.height = 20;
                range.navigatorStyleSettings.thumb.width = 30;
                range.navigatorStyleSettings.selectedRegionColor = 'green';
                range.refresh();
            });
            it('checking with thump fill mouse event', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('container_AxisLabel_4');
                    range.rangeOnMouseDown(trigger.onTouchStart(element, 608, 189, null, null, 504, 289));
                    range.mouseEnd(trigger.onTouchEnd(element, 608, 189, null, null, 504, 289));
                    done();
                };
                range.navigatorStyleSettings.thumb.height = 20;
                range.navigatorStyleSettings.thumb.width = 30;
                range.navigatorStyleSettings.selectedRegionColor = 'green';
                range.navigatorStyleSettings.thumb.fill = 'Orange';
                range.refresh();
            });
            it('checking with  un selected region color', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('container_rightUnSelectedArea');
                    expect(element.getAttribute('fill') === 'blue').toBe(true);
                    done();
                };
                range.navigatorStyleSettings.unselectedRegionColor = 'blue';
                range.minimum = 10;
                range.maximum = 50;
                range.refresh();
            });
            it('checking with thump border customization', function (done) {
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
            it('checking with thump fill', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('container_RightSlider_ThumpSymbol');
                    expect(element.getAttribute('d') !== '').toBe(true);
                    expect(element.getAttribute('fill') === 'red').toBe(true);
                    done();
                };
                range.navigatorStyleSettings.thumb.fill = 'red';
                range.navigatorStyleSettings.thumb.border.width = 4;
                range.minimum = 10;
                range.maximum = 50;
                range.refresh();
            });
            it('checking with thump type', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('container_RightSlider_ThumpSymbol');
                    expect(element.getAttribute('fill') === '#00ff00').toBe(true);
                    done();
                };
                range.navigatorStyleSettings.thumb.border.width = 4;
                range.navigatorStyleSettings.thumb.border.color = null;
                range.navigatorStyleSettings.thumb.fill = '#00ff00';
                range.navigatorStyleSettings.thumb.type = 'Rectangle';
                range.minimum = 10;
                range.maximum = 50;
                range.refresh();
            });
            it('checking with right slider mouse event', function (done) {
                range.loaded = function (args) {
                    var targetElement = document.getElementById('container_RightSlider_ThumpSymbol');
                    range.rangeOnMouseDown(trigger.onTouchStart(targetElement, 608, 189, null, null, 504, 289));
                    range.mouseMove(trigger.onTouchMove(targetElement, 728, 389, null, null, 404, 189));
                    range.mouseEnd(trigger.onTouchEnd(targetElement, 728, 389, null, null, 404, 189));
                    var thumbTransform = document.getElementById('container_RightSlider').getAttribute('transform');
                    expect(thumbTransform === 'translate(380.99999999999994, 0)' || thumbTransform === 'translate(381, 0)'
                        || thumbTransform === 'translate(381.00000000000006, 0)').toBe(true);
                    expect(targetElement != null).toBe(true);
                    done();
                };
                range.navigatorStyleSettings.thumb.type = 'Circle';
                range.refresh();
            });
            it('checking with left slider mouse event', function (done) {
                range.loaded = function (args) {
                    var targetElement = document.getElementById('container_LeftSlider_ThumpSymbol');
                    range.rangeOnMouseDown(trigger.onTouchStart(targetElement, 608, 189, null, null, 504, 289));
                    range.mouseMove(trigger.onTouchMove(targetElement, 728, 389, null, null, 404, 189));
                    range.mouseEnd(trigger.onTouchEnd(targetElement, 728, 389, null, null, 404, 189));
                    expect(targetElement != null).toBe(true);
                    var thumbTransform = document.getElementById('container_LeftSlider').getAttribute('transform');
                    expect(thumbTransform === 'translate(380.99999999999994, 0)' || thumbTransform === 'translate(381, 0)' ||
                        thumbTransform === 'translate(381.00000000000006, 0)').toBe(true);
                    element = document.getElementById('container_SelectedArea');
                    expect(element.getAttribute('width') === '0').toBe(true);
                    done();
                };
                range.refresh();
            });
            it('checking with right unselected area mouse move event', function (done) {
                range.loaded = function (args) {
                    var targetElement = document.getElementById('container_RightSlider_ThumpSymbol');
                    range.rangeOnMouseDown(trigger.onTouchStart(targetElement, 590, 89, null, null, 404, 189));
                    range.mouseMove(trigger.onTouchMove(targetElement, 628, 289, null, null, 304, 289));
                    element = document.getElementById('container_SelectedArea');
                    expect(+element.getAttribute('width') >= 99 && +element.getAttribute('width') <= 101).toBe(true);
                    expect(targetElement != null).toBe(true);
                    done();
                };
                range.refresh();
            });
            it('checking with right unselected area mouse down event', function (done) {
                range.loaded = function (args) {
                    var targetElement = document.getElementById('container_rightUnSelectedArea');
                    range.rangeOnMouseDown(trigger.onTouchStart(targetElement, 720, 180, null, null, 504, 280));
                    range.mouseEnd(trigger.onTouchStart(targetElement, 720, 180, null, null, 504, 280));
                    expect(targetElement != null).toBe(true);
                    done();
                };
                range.navigatorBorder.color = 'red';
                range.navigatorStyleSettings.selectedRegionColor = 'pink';
                range.navigatorStyleSettings.unselectedRegionColor = 'skyblue';
                range.refresh();
            });
            it('checking with left unselected area mouse down event', function (done) {
                range.loaded = function (args) {
                    var targetElement = document.getElementById('container_leftUnSelectedArea');
                    range.rangeOnMouseDown(trigger.onTouchStart(targetElement, 420, 80, null, null, 204, 180));
                    range.mouseEnd(trigger.onTouchStart(targetElement, 420, 80, null, null, 204, 180));
                    expect(targetElement != null).toBe(true);
                    done();
                };
                range.navigatorBorder.color = 'red';
                range.navigatorStyleSettings.selectedRegionColor = 'pink';
                range.navigatorStyleSettings.unselectedRegionColor = 'skyblue';
                range.refresh();
            });
            it('checking with selected area mouse down event', function (done) {
                range.loaded = function (args) {
                    var targetElement = document.getElementById('container_SelectedArea');
                    range.rangeOnMouseDown(trigger.onTouchStart(targetElement, 720, 180, null, null, 504, 280));
                    range.mouseMove(trigger.onTouchStart(targetElement, 590, 89, null, null, 404, 189));
                    expect(targetElement != null).toBe(true);
                    done();
                };
                range.navigatorBorder.color = 'red';
                range.refresh();
            });
            it('checking with allow snapping', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('container_LeftSlider_ThumpSymbol');
                    range.rangeOnMouseDown(trigger.onTouchStart(element, 590.25, 89, null, null, 404.5, 189));
                    range.mouseMove(trigger.onTouchStart(element, 720.5, 180, null, null, 604.5, 280));
                    range.mouseEnd(trigger.onTouchStart(element, 720.5, 180, null, null, 604.5, 280));
                    var targetElement = document.getElementById('container_SelectedArea');
                    range.rangeOnMouseDown(trigger.onTouchStart(targetElement, 630, 89, null, null, 454, 189));
                    range.mouseLeave(trigger.onTouchLeave(targetElement, 630, 89, null, null, 454, 189));
                    expect(element != null).toBe(true);
                    done();
                };
                range.allowSnapping = true;
                range.refresh();
            });
            it('checking with rtl left slider position', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('container_LeftSlider_ThumpSymbol');
                    range.rangeOnMouseDown(trigger.onTouchStart(element, 720, 180, null, null, 504, 280));
                    range.mouseMove(trigger.onTouchStart(element, 590, 89, null, null, 404, 189));
                    var path = document.getElementById('container_LeftSlider').getAttribute('transform');
                    expect(path === 'translate(953, 0)' || path === 'translate(398, 0)' || path === 'translate(381, 0)' ||
                        path === 'translate(380.99999999999994, 0)' || path === 'translate(369.5, 0)').toBe(true);
                    var axislabel = document.getElementById('container_AxisLabel_1');
                    var axisLabel1 = document.getElementById('container_AxisLabel_2');
                    expect(axislabel.getAttribute('x') > axisLabel1.getAttribute('x')).toBe(true);
                    done();
                };
                range.navigatorBorder.color = 'red';
                range.enableRtl = true;
                range.navigatorStyleSettings.selectedRegionColor = 'pink';
                range.navigatorStyleSettings.unselectedRegionColor = 'skyblue';
                range.refresh();
            });
            it('checking with rtl right unselected area mouse down event', function (done) {
                range.loaded = function (args) {
                    var targetElement = document.getElementById('container_rightUnSelectedArea');
                    range.rangeOnMouseDown(trigger.onTouchStart(targetElement, 720, 180, null, null, 504, 280));
                    range.mouseEnd(trigger.onTouchStart(targetElement, 720, 180, null, null, 504, 280));
                    expect(targetElement != null).toBe(true);
                    done();
                };
                range.navigatorBorder.color = 'red';
                range.navigatorStyleSettings.selectedRegionColor = 'pink';
                range.navigatorStyleSettings.unselectedRegionColor = 'skyblue';
                range.refresh();
            });
            it('checking with rtl left unselected area mouse down event', function (done) {
                range.loaded = function (args) {
                    var targetElement = document.getElementById('container_leftUnSelectedArea');
                    range.rangeOnMouseDown(trigger.onTouchStart(targetElement, 420, 80, null, null, 204, 180));
                    range.mouseEnd(trigger.onTouchStart(targetElement, 420, 80, null, null, 204, 180));
                    expect(targetElement != null).toBe(true);
                    done();
                };
                range.navigatorBorder.color = 'red';
                range.navigatorStyleSettings.selectedRegionColor = 'pink';
                range.navigatorStyleSettings.unselectedRegionColor = 'skyblue';
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
                range.refresh();
            });
            it('checking with date time axis grouping label mouse down', function (done) {
                range.loaded = function (args) {
                    element1 = document.getElementById('container_SecondaryLabel_0');
                    element = document.getElementById('container_SecondaryLabel_2');
                    range.rangeOnMouseDown(trigger.onTouchStart(element, 434, 105, null, null, 470, 120));
                    range.mouseEnd(trigger.onTouchStart(element, 434, 105, null, null, 470, 120));
                    expect(element.getAttribute('x') < element1.getAttribute('x')).toBe(true);
                    done();
                };
                range.valueType = 'DateTime';
                range.series[0].dataSource = dateTime;
                range.navigatorStyleSettings.selectedRegionColor = 'blue';
                range.enableGrouping = true;
                range.allowSnapping = true;
                range.refresh();
            });
            it('checking with date time axis grouping firstlevel label mouse down', function (done) {
                range.loaded = function (args) {
                    element1 = document.getElementById('container_AxisLabel_3');
                    element = document.getElementById('container_AxisLabel_1');
                    range.rangeOnMouseDown(trigger.onTouchStart(element, 434, 105, null, null, 470, 120));
                    range.mouseEnd(trigger.onTouchStart(element, 434, 105, null, null, 470, 120));
                    expect(element.getAttribute('x') > element1.getAttribute('x')).toBe(true);
                    done();
                };
                range.valueType = 'DateTime';
                range.series[0].dataSource = dateTime;
                range.navigatorStyleSettings.selectedRegionColor = 'blue';
                range.enableGrouping = true;
                range.allowSnapping = true;
                range.refresh();
            });
            it('checking with allowSnapping click with firstlevel label', function (done) {
                range.loaded = function (args) {
                    element1 = document.getElementById('container_AxisLabel_1');
                    element = document.getElementById('container_AxisLabel_2');
                    var targetElement = document.getElementById('container_LeftSlider_ThumpSymbol');
                    range.rangeOnMouseDown(trigger.onTouchStart(element, 286, 296, null, null, 290, 386));
                    range.mouseEnd(trigger.onTouchStart(element, 286, 296, null, null, 290, 386));
                    range.mouseMove(trigger.onTouchStart(targetElement, 286.25, 186, null, null, 404.25, 286));
                    expect(element.getAttribute('x') < element1.getAttribute('x')).toBe(true);
                    done();
                };
                range.valueType = 'DateTime';
                range.series[0].dataSource = dateTime;
                range.navigatorStyleSettings.selectedRegionColor = 'blue';
                range.allowSnapping = true;
                range.enableGrouping = true;
                range.refresh();
            });
            it('checking with label position inside', function (done) {
                range.loaded = function (args) {
                    element1 = document.getElementById('container_AxisLabel_1');
                    element = document.getElementById('container_SecondaryLabel_2');
                    var targetElement = document.getElementById('container_LeftSlider_ThumpSymbol');
                    range.rangeOnMouseDown(trigger.onTouchStart(targetElement, 286, 296, null, null, 290, 386));
                    range.mouseEnd(trigger.onTouchStart(targetElement, 286, 296, null, null, 290, 386));
                    range.mouseMove(trigger.onTouchStart(targetElement, 286, 186, null, null, 404, 286));
                    expect(element.getAttribute('y') < element1.getAttribute('y')).toBe(true);
                    done();
                };
                range.valueType = 'DateTime';
                range.series[0].dataSource = dateTime;
                range.navigatorStyleSettings.selectedRegionColor = 'blue';
                range.labelPosition = 'Inside';
                range.enableGrouping = true;
                range.refresh();
            });
            it('checking date time axis with area series', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('container_Series_0');
                    expect(element.getAttribute('fill')).toEqual('#00bdae');
                    done();
                };
                range.series[0].type = 'Area';
                range.series[0].dataSource = dateTime;
                range.enableGrouping = false;
                range.labelPosition = 'Outside';
                range.refresh();
            });
            it('checking with slider rtl position', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('container_AxisLabel_0');
                    element1 = document.getElementById('container_AxisLabel_3');
                    expect(element.getAttribute('x') < element1.getAttribute('x')).toBe(true);
                    done();
                };
                range.series[0].type = 'Area';
                range.series[0].dataSource = dateTime;
                range.width = '350';
                range.height = '450';
                range.enableGrouping = false;
                range.enableRtl = true;
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
