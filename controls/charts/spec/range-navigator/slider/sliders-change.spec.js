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
        describe('with Sliders double axis', function () {
            var element;
            var targetElement;
            var range;
            var rangeElement = ej2_base_1.createElement('div', { id: 'container' });
            var axisLabel;
            var isCheck = false;
            beforeAll(function () {
                document.body.appendChild(rangeElement);
                range = new index_1.RangeNavigator({
                    series: [{
                            dataSource: [{ x: 10, y: 20 }, { x: 20, y: 12 }, { x: 30, y: 22 }, { x: 40, y: 16 }],
                            xName: 'x', yName: 'y', type: 'Line', animation: { duration: 0 }
                        }],
                    value: [10, 20],
                    allowSnapping: false
                });
                range.appendTo('#container');
            });
            afterAll(function () {
                range.destroy();
                rangeElement.remove();
            });
            it('checking with left slider moving', function (done) {
                range.loaded = function (args) {
                    isCheck = true;
                    element = document.getElementById('container_LeftSlider');
                    targetElement = element.childNodes[2];
                    var transform = element.getAttribute('transform');
                    var str1 = transform.substring(transform.indexOf('(') + 1);
                    var xValue = +str1.substring(0, str1.indexOf(','));
                    var cx = +targetElement.getAttribute('cx');
                    var cy = +targetElement.getAttribute('cy');
                    var leftElement = document.getElementById('container_leftUnSelectedArea');
                    expect(leftElement.getAttribute('width')).toEqual('0');
                    range.rangeOnMouseDown(trigger.onTouchStart(targetElement, null, null, null, null, xValue + cx, cy));
                    range.mouseMove(trigger.onTouchMove(targetElement, null, null, null, null, xValue + cx + 100, cy));
                    range.mouseEnd(trigger.onTouchEnd(targetElement, null, null, null, null, xValue + cx + 100, cy));
                    expect(+leftElement.getAttribute('width')).not.toEqual(0);
                };
                range.changed = function (args) {
                    if (isCheck) {
                        expect(Math.round(+args.start) >= 12 && Math.round(+args.start) < 15).toBe(true);
                        expect(Math.round(+args.end)).toEqual(20);
                        isCheck = false;
                        done();
                    }
                };
                range.navigatorStyleSettings.selectedRegionColor = 'pink';
                range.enableDeferredUpdate = true;
                range.refresh();
            });
            it('checking with left slider moving enable RTL', function (done) {
                range.loaded = function (args) {
                    isCheck = true;
                    element = document.getElementById('container_LeftSlider');
                    targetElement = element.childNodes[2];
                    var transform = element.getAttribute('transform');
                    var str1 = transform.substring(transform.indexOf('(') + 1);
                    var xValue = +str1.substring(0, str1.indexOf(','));
                    var cx = +targetElement.getAttribute('cx');
                    var cy = +targetElement.getAttribute('cy');
                    range.rangeOnMouseDown(trigger.onTouchStart(targetElement, null, null, null, null, xValue + cx, cy));
                    range.mouseMove(trigger.onTouchMove(targetElement, null, null, null, null, xValue + cx + 100, cy));
                    range.mouseEnd(trigger.onTouchEnd(targetElement, null, null, null, null, xValue + cx + 100, cy));
                };
                range.changed = function (args) {
                    if (isCheck) {
                        expect(Math.floor(+args.start)).toEqual(10);
                        expect(Math.ceil(+args.end)).toEqual(20);
                        isCheck = false;
                        done();
                    }
                };
                range.enableRtl = true;
                range.refresh();
            });
            it('checking with left slider ', function (done) {
                range.loaded = function (args) {
                    isCheck = true;
                    element = document.getElementById('container_LeftSlider');
                    targetElement = element.childNodes[2];
                    var transform = element.getAttribute('transform');
                    var str1 = transform.substring(transform.indexOf('(') + 1);
                    var xValue = +str1.substring(0, str1.indexOf(','));
                    var cx = +targetElement.getAttribute('cx');
                    var cy = +targetElement.getAttribute('cy');
                    range.rangeOnMouseDown(trigger.onTouchStart(targetElement, null, null, null, null, xValue + cx, cy));
                    range.mouseMove(trigger.onTouchMove(targetElement, null, null, null, null, xValue + 100, cy));
                    range.mouseEnd(trigger.onTouchEnd(targetElement, null, null, null, null, xValue + 120, cy));
                };
                range.changed = function (args) {
                    if (isCheck) {
                        expect(Math.floor(+args.start)).toEqual(10);
                        expect(Math.ceil(+args.end)).toEqual(20);
                        var leftElement = document.getElementById('container_leftUnSelectedArea');
                        expect((+leftElement.getAttribute('width')) > 100).toBe(true);
                        isCheck = false;
                        done();
                    }
                };
                range.navigatorStyleSettings.selectedRegionColor = null;
                range.theme = 'Fabric';
                range.refresh();
            });
            it('checking with left slider position less than startX', function (done) {
                range.loaded = function (args) {
                    isCheck = true;
                    element = document.getElementById('container_LeftSlider');
                    targetElement = element.childNodes[2];
                    var transform = element.getAttribute('transform');
                    var str1 = transform.substring(transform.indexOf('(') + 1);
                    var xValue = +str1.substring(0, str1.indexOf(','));
                    var cx = +targetElement.getAttribute('cx');
                    var cy = +targetElement.getAttribute('cy');
                    var leftElement = document.getElementById('container_leftUnSelectedArea');
                    expect(leftElement.getAttribute('width')).not.toEqual('0');
                    range.rangeOnMouseDown(trigger.onTouchStart(targetElement, null, null, null, null, xValue - 500, cy));
                    range.mouseMove(trigger.onTouchMove(targetElement, null, null, null, null, xValue - 500, cy));
                    range.mouseEnd(trigger.onTouchEnd(targetElement, null, null, null, null, xValue - 500, cy));
                };
                range.changed = function (args) {
                    if (isCheck) {
                        expect(Math.floor(+args.start)).toEqual(20);
                        expect(Math.ceil(+args.end) > 20 && Math.ceil(+args.end) < 35).toBe(true);
                        expect(index_2.getElement('container_Series_0').getAttribute('stroke')).toBe('#a16ee5');
                        isCheck = false;
                        done();
                    }
                };
                range.theme = 'Bootstrap';
                range.refresh();
            });
            it('checking with right slider moving out side of selected area', function (done) {
                range.loaded = function (args) {
                    isCheck = true;
                    element = document.getElementById('container_RightSlider');
                    targetElement = element.childNodes[2];
                    var transform = element.getAttribute('transform');
                    var str1 = transform.substring(transform.indexOf('(') + 1);
                    var xValue = +str1.substring(0, str1.indexOf(','));
                    var cx = +targetElement.getAttribute('cx');
                    var cy = +targetElement.getAttribute('cy');
                    range.rangeOnMouseDown(trigger.onTouchStart(targetElement, null, null, null, null, xValue + cx, cy));
                    range.mouseMove(trigger.onTouchMove(targetElement, null, null, null, null, xValue + cx + 100, cy));
                    range.mouseEnd(trigger.onTouchEnd(targetElement, null, null, null, null, xValue + cx + 100, cy));
                };
                range.changed = function (args) {
                    if (isCheck) {
                        expect(index_2.getElement('container_RightSlider_ThumpSymbol').getAttribute('fill')).toBe('#BFBFBF');
                        expect(Math.floor(+args.start)).toEqual(20);
                        expect(Math.ceil(+args.end) > 22 && Math.ceil(+args.end) < 38).toBe(true);
                        isCheck = false;
                        done();
                    }
                };
                range.enableRtl = false;
                range.theme = 'HighContrastLight';
                range.refresh();
            });
            it('checking with right slider moving in side of selected area', function (done) {
                range.loaded = function (args) {
                    isCheck = true;
                    element = document.getElementById('container_RightSlider');
                    targetElement = element.childNodes[2];
                    range.rangeOnMouseDown(trigger.onTouchStart(targetElement, null, null, null, null, 200, 20));
                    range.mouseMove(trigger.onTouchMove(targetElement, null, null, null, null, 100, 20));
                    range.mouseEnd(trigger.onTouchEnd(targetElement, null, null, null, null, 400, 20));
                };
                range.changed = function (args) {
                    if (isCheck) {
                        expect(Math.floor(+args.start) > 10 && Math.floor(+args.start) < 15).toBe(true);
                        expect(Math.ceil(+args.end)).toEqual(20);
                        isCheck = false;
                    }
                    done();
                };
                range.navigatorStyleSettings.selectedRegionColor = 'pink';
                range.refresh();
            });
            it('checking with label click', function (done) {
                range.loaded = function (args) {
                    isCheck = true;
                    var element = document.getElementById('container_AxisLabels').firstChild.firstChild;
                    var pageX = +element.getAttribute('x');
                    var pageY = +element.getAttribute('y');
                    range.rangeOnMouseDown(trigger.onTouchStart(element, null, null, null, null, pageX, pageY));
                    range.mouseMove(trigger.onTouchEnd(element, null, null, null, null, 0, pageY));
                    range.mouseEnd(trigger.onTouchEnd(element, null, null, null, null, 0, pageY));
                };
                range.changed = function (args) {
                    if (isCheck) {
                        expect(Math.ceil(+args.start) > 11 && Math.ceil(+args.start) < 30).toBe(true);
                        isCheck = false;
                    }
                    done();
                };
                range.animationDuration = 0;
                range.navigatorStyleSettings.selectedRegionColor = 'green';
                range.refresh();
            });
        });
        describe('with Sliders double axis', function () {
            var element;
            var targetElement;
            var range;
            var rangeElement = ej2_base_1.createElement('div', { id: 'container' });
            var axisLabel;
            var isCheck = false;
            beforeAll(function () {
                document.body.appendChild(rangeElement);
                range = new index_1.RangeNavigator({
                    series: [{
                            dataSource: [{ x: new Date(2000, 0), y: 20 }, { x: new Date(2000, 5), y: 12 },
                                { x: new Date(2001, 0), y: 22 }, { x: new Date(2001, 7), y: 16 }],
                            xName: 'x', yName: 'y', type: 'Line', animation: { duration: 0 }
                        }],
                    value: [new Date(2000, 1), new Date(2001, 5)],
                    allowSnapping: false,
                    enableDeferredUpdate: true,
                    valueType: 'DateTime'
                });
                range.appendTo('#container');
            });
            afterAll(function () {
                range.destroy();
                rangeElement.remove();
            });
            it('checking resize event', function (done) {
                range.loaded = function (args) {
                    if (isCheck) {
                        expect(range.svgObject).not.toEqual(null);
                        done();
                    }
                    else {
                        range.rangeResize();
                    }
                };
                range.resized = function (args) {
                    isCheck = true;
                    expect(args.name).toBe('resized');
                };
                range.changed = null;
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
