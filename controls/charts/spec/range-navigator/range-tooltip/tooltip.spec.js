define(["require", "exports", "../../../src/range-navigator/index", "../../../src/chart/index", "@syncfusion/ej2-base", "../../../spec/chart/base/events.spec", "../../common.spec"], function (require, exports, index_1, index_2, ej2_base_1, events_spec_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    index_1.RangeNavigator.Inject(index_2.Logarithmic, index_2.DateTime, index_2.LineSeries, index_2.AreaSeries, index_1.RangeTooltip);
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
    describe('Range navigator Tooltip', function () {
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
            var rangeElement = ej2_base_1.createElement('div', { id: 'tooltip_container' });
            var axisLabel;
            var isCheck = false;
            beforeAll(function () {
                document.body.appendChild(rangeElement);
                range = new index_1.RangeNavigator({
                    series: [{
                            dataSource: [{ x: 10, y: 20 }, { x: 20, y: 12 }, { x: 30, y: 22 }, { x: 40, y: 16 }],
                            xName: 'x', yName: 'y', type: 'Line', animation: { duration: 0 }
                        }], tooltip: {
                        enable: true, textStyle: {
                            size: '11px',
                            fontWeight: 'Normal',
                            color: null,
                            fontStyle: 'Normal',
                            fontFamily: 'Roboto-Regula'
                        }
                    },
                    value: [10, 20],
                    allowSnapping: false
                });
                range.appendTo('#tooltip_container');
            });
            afterAll(function () {
                range.destroy();
                rangeElement.remove();
            });
            it('checking with left slider moving', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('tooltip_container_LeftSlider');
                    targetElement = element.childNodes[2];
                    var transform = element.getAttribute('transform');
                    var str1 = transform.substring(transform.indexOf('(') + 1);
                    var xValue = +str1.substring(0, str1.indexOf(','));
                    range.rangeOnMouseDown(trigger.onTouchStart(targetElement, null, null, null, null, xValue, 10));
                    range.mouseMove(trigger.onTouchMove(targetElement, null, null, null, null, xValue + 100, 10));
                    range.mouseEnd(trigger.onTouchEnd(targetElement, null, null, null, null, xValue + 100, 10));
                    expect(index_2.getElement('tooltip_container_Secondary_Element') !== null).toBe(true);
                    expect(index_2.getElement('tooltip_container_Secondary_Element').childElementCount).toBe(2);
                    done();
                };
                range.refresh();
            });
            it('checking with right slider moving', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('tooltip_container_RightSlider');
                    targetElement = element.childNodes[2];
                    var transform = element.getAttribute('transform');
                    var str1 = transform.substring(transform.indexOf('(') + 1);
                    var xValue = +str1.substring(0, str1.indexOf(','));
                    range.rangeOnMouseDown(trigger.onTouchStart(targetElement, null, null, null, null, xValue, 10));
                    range.mouseMove(trigger.onTouchMove(targetElement, null, null, null, null, xValue + 100, 10));
                    range.mouseEnd(trigger.onTouchEnd(targetElement, null, null, null, null, xValue + 100, 10));
                    expect(index_2.getElement('tooltip_container_leftTooltip_text').textContent).not.toEqual('');
                    expect(index_2.getElement('tooltip_container_rightTooltip_text').textContent).not.toEqual('');
                    done();
                };
                range.refresh();
            });
            it('checking with left slider moving over right slider', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('tooltip_container_RightSlider');
                    targetElement = element.childNodes[2];
                    var transform = element.getAttribute('transform');
                    var str1 = transform.substring(transform.indexOf('(') + 1);
                    var xValue = +str1.substring(0, str1.indexOf(','));
                    range.rangeOnMouseDown(trigger.onTouchStart(targetElement, null, null, null, null, xValue, 10));
                    range.mouseMove(trigger.onTouchMove(targetElement, null, null, null, null, xValue + 200, 10));
                    range.mouseEnd(trigger.onTouchEnd(targetElement, null, null, null, null, xValue + 200, 10));
                    var leftValue = +index_2.getElement('tooltip_container_leftTooltip_text').textContent;
                    var rightValue = +index_2.getElement('tooltip_container_rightTooltip_text').textContent;
                    expect(leftValue < rightValue).toBe(true);
                    done();
                };
                range.value = [0, 10];
                range.refresh();
            });
            it('checking with tooltip cancel', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('tooltip_container_RightSlider');
                    targetElement = element.childNodes[2];
                    var transform = element.getAttribute('transform');
                    var str1 = transform.substring(transform.indexOf('(') + 1);
                    var xValue = +str1.substring(0, str1.indexOf(','));
                    range.rangeOnMouseDown(trigger.onTouchStart(targetElement, null, null, null, null, xValue, 10));
                    range.mouseMove(trigger.onTouchMove(targetElement, null, null, null, null, xValue + 200, 10));
                    range.mouseEnd(trigger.onTouchEnd(targetElement, null, null, null, null, xValue + 200, 10));
                    expect(index_2.getElement('tooltip_container_leftTooltip_text') === null).toBe(true);
                    done();
                };
                range.tooltipRender = function (args) {
                    args.cancel = true;
                };
                range.value = [0, 10];
                range.refresh();
            });
            it('checking with tooltip format', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('tooltip_container_RightSlider');
                    targetElement = element.childNodes[2];
                    var transform = element.getAttribute('transform');
                    var str1 = transform.substring(transform.indexOf('(') + 1);
                    var xValue = +str1.substring(0, str1.indexOf(','));
                    range.rangeOnMouseDown(trigger.onTouchStart(targetElement, null, null, null, null, xValue, 10));
                    range.mouseMove(trigger.onTouchMove(targetElement, null, null, null, null, xValue + 200, 10));
                    range.mouseEnd(trigger.onTouchEnd(targetElement, null, null, null, null, xValue + 200, 10));
                    var leftValue = index_2.getElement('tooltip_container_leftTooltip_text').textContent;
                    var rightValue = index_2.getElement('tooltip_container_rightTooltip_text').textContent;
                    expect(leftValue.indexOf('$') > -1).toBe(true);
                    expect(rightValue.indexOf('$') > -1).toBe(true);
                    done();
                };
                range.tooltipRender = null;
                range.tooltip.format = '${value}';
                range.refresh();
            });
            it('checking with tooltip template', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('tooltip_container_RightSlider');
                    targetElement = element.childNodes[2];
                    var transform = element.getAttribute('transform');
                    var str1 = transform.substring(transform.indexOf('(') + 1);
                    var xValue = +str1.substring(0, str1.indexOf(','));
                    range.rangeOnMouseDown(trigger.onTouchStart(targetElement, null, null, null, null, xValue, 10));
                    range.mouseMove(trigger.onTouchMove(targetElement, null, null, null, null, xValue + 200, 10));
                    range.mouseEnd(trigger.onTouchEnd(targetElement, null, null, null, null, xValue + 200, 10));
                    var leftValue = index_2.getElement('tooltip_container_leftTooltipparent_template').innerHTML;
                    expect(leftValue.indexOf('template') > -1).toBe(true);
                    done();
                };
                range.tooltipRender = null;
                range.tooltip.template = '<div>$template{value}</div>';
                range.refresh();
            });
            it('checking with tooltip template with sample data', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('tooltip_container_RightSlider');
                    targetElement = element.childNodes[2];
                    var transform = element.getAttribute('transform');
                    var str1 = transform.substring(transform.indexOf('(') + 1);
                    var xValue = +str1.substring(0, str1.indexOf(','));
                    range.rangeOnMouseDown(trigger.onTouchStart(targetElement, null, null, null, null, xValue, 10));
                    range.mouseMove(trigger.onTouchMove(targetElement, null, null, null, null, xValue + 200, 10));
                    range.mouseEnd(trigger.onTouchEnd(targetElement, null, null, null, null, xValue + 200, 10));
                    var leftValue = index_2.getElement('tooltip_container_leftTooltipparent_template').innerHTML;
                    var rightValue = index_2.getElement('tooltip_container_leftTooltipparent_template').innerHTML;
                    expect(leftValue === rightValue).toBe(true);
                    done();
                };
                range.tooltipRender = null;
                range.tooltip.template = '<div>${start}</div>';
                range.refresh();
            });
        });
        describe('with Sliders date time axis  with leight weight', function () {
            var element;
            var targetElement;
            var range;
            var rangeElement = ej2_base_1.createElement('div', { id: 'tooltip_container' });
            var axisLabel;
            var isCheck = false;
            beforeAll(function () {
                document.body.appendChild(rangeElement);
                range = new index_1.RangeNavigator({
                    valueType: 'DateTime',
                    dataSource: [
                        { x: new Date(2000, 1, 1), y: 20 },
                        { x: new Date(2001, 1, 1), y: 12 },
                        { x: new Date(2002, 1, 1), y: 22 },
                        { x: new Date(2003, 1, 1), y: 16 }
                    ],
                    xName: 'x', yName: 'y',
                    tooltip: {
                        enable: true, textStyle: {
                            size: '11px',
                            fontWeight: 'Normal',
                            color: null,
                            fontStyle: 'Normal',
                            fontFamily: 'Roboto-Regula'
                        }
                    },
                    value: [new Date(2001, 1, 1), new Date(2002, 1, 1)],
                    allowSnapping: false
                }, rangeElement);
            });
            afterAll(function () {
                range.destroy();
                rangeElement.remove();
            });
            it('checking with left slider moving', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('tooltip_container_LeftSlider');
                    targetElement = element.childNodes[2];
                    var transform = element.getAttribute('transform');
                    var str1 = transform.substring(transform.indexOf('(') + 1);
                    var xValue = +str1.substring(0, str1.indexOf(','));
                    range.rangeOnMouseDown(trigger.onTouchStart(targetElement, null, null, null, null, xValue, 10));
                    range.mouseMove(trigger.onTouchMove(targetElement, null, null, null, null, xValue + 100, 10));
                    range.mouseEnd(trigger.onTouchEnd(targetElement, null, null, null, null, xValue + 100, 10));
                    expect(index_2.getElement('tooltip_container_Secondary_Element') !== null).toBe(true);
                    expect(index_2.getElement('tooltip_container_Secondary_Element').childElementCount).toBe(2);
                    done();
                };
                range.refresh();
            });
            it('checking with right slider moving', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('tooltip_container_RightSlider');
                    targetElement = element.childNodes[2];
                    var transform = element.getAttribute('transform');
                    var str1 = transform.substring(transform.indexOf('(') + 1);
                    var xValue = +str1.substring(0, str1.indexOf(','));
                    range.rangeOnMouseDown(trigger.onTouchStart(targetElement, null, null, null, null, xValue, 10));
                    range.mouseMove(trigger.onTouchMove(targetElement, null, null, null, null, xValue + 100, 10));
                    range.mouseEnd(trigger.onTouchEnd(targetElement, null, null, null, null, xValue + 100, 10));
                    expect(index_2.getElement('tooltip_container_leftTooltip_text').textContent).not.toEqual('');
                    expect(index_2.getElement('tooltip_container_rightTooltip_text').textContent).not.toEqual('');
                    done();
                };
                range.refresh();
            });
            it('checking with left slider moving over right slider', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('tooltip_container_RightSlider');
                    targetElement = element.childNodes[2];
                    var transform = element.getAttribute('transform');
                    var str1 = transform.substring(transform.indexOf('(') + 1);
                    var xValue = +str1.substring(0, str1.indexOf(','));
                    range.rangeOnMouseDown(trigger.onTouchStart(targetElement, null, null, null, null, xValue, 10));
                    range.mouseMove(trigger.onTouchMove(targetElement, null, null, null, null, xValue + 200, 10));
                    range.mouseEnd(trigger.onTouchEnd(targetElement, null, null, null, null, xValue + 200, 10));
                    var leftValue = index_2.getElement('tooltip_container_leftTooltip_text').textContent;
                    var rightValue = index_2.getElement('tooltip_container_rightTooltip_text').textContent;
                    expect(Date.parse(leftValue) < Date.parse(rightValue)).toBe(true);
                    done();
                };
                range.value = [new Date(2000, 1, 1), new Date(2000, 1, 1)];
                range.refresh();
            });
            it('checking with tooltip cancel', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('tooltip_container_RightSlider');
                    targetElement = element.childNodes[2];
                    var transform = element.getAttribute('transform');
                    var str1 = transform.substring(transform.indexOf('(') + 1);
                    var xValue = +str1.substring(0, str1.indexOf(','));
                    range.rangeOnMouseDown(trigger.onTouchStart(targetElement, null, null, null, null, xValue, 10));
                    range.mouseMove(trigger.onTouchMove(targetElement, null, null, null, null, xValue + 200, 10));
                    range.mouseEnd(trigger.onTouchEnd(targetElement, null, null, null, null, xValue + 200, 10));
                    expect(index_2.getElement('tooltip_container_leftTooltip_text') === null).toBe(true);
                    done();
                };
                range.tooltipRender = function (args) {
                    args.cancel = true;
                };
                range.refresh();
            });
            it('checking with tooltip format', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('tooltip_container_RightSlider');
                    targetElement = element.childNodes[2];
                    var transform = element.getAttribute('transform');
                    var str1 = transform.substring(transform.indexOf('(') + 1);
                    var xValue = +str1.substring(0, str1.indexOf(','));
                    range.rangeOnMouseDown(trigger.onTouchStart(targetElement, null, null, null, null, xValue, 10));
                    range.mouseMove(trigger.onTouchMove(targetElement, null, null, null, null, xValue + 200, 10));
                    range.mouseEnd(trigger.onTouchEnd(targetElement, null, null, null, null, xValue + 200, 10));
                    var leftValue = index_2.getElement('tooltip_container_leftTooltip_text').textContent;
                    var rightValue = index_2.getElement('tooltip_container_rightTooltip_text').textContent;
                    expect(rightValue === 'Feb').toBe(true);
                    done();
                };
                range.tooltipRender = null;
                range.tooltip.format = 'MMM';
                range.refresh();
            });
            it('checking with tooltip template', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('tooltip_container_RightSlider');
                    targetElement = element.childNodes[2];
                    var transform = element.getAttribute('transform');
                    var str1 = transform.substring(transform.indexOf('(') + 1);
                    var xValue = +str1.substring(0, str1.indexOf(','));
                    range.rangeOnMouseDown(trigger.onTouchStart(targetElement, null, null, null, null, xValue, 10));
                    range.mouseMove(trigger.onTouchMove(targetElement, null, null, null, null, xValue + 200, 10));
                    range.mouseEnd(trigger.onTouchEnd(targetElement, null, null, null, null, xValue + 200, 10));
                    var leftValue = index_2.getElement('tooltip_container_leftTooltipparent_template').innerHTML;
                    expect(leftValue.indexOf('template') > -1).toBe(true);
                    done();
                };
                range.tooltipRender = null;
                range.tooltip.template = '<div>$template{value}</div>';
                range.refresh();
            });
            it('checking with tooltip template with sample data', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('tooltip_container_RightSlider');
                    targetElement = element.childNodes[2];
                    var transform = element.getAttribute('transform');
                    var str1 = transform.substring(transform.indexOf('(') + 1);
                    var xValue = +str1.substring(0, str1.indexOf(','));
                    range.rangeOnMouseDown(trigger.onTouchStart(targetElement, null, null, null, null, xValue, 10));
                    range.mouseMove(trigger.onTouchMove(targetElement, null, null, null, null, xValue + 200, 10));
                    range.mouseEnd(trigger.onTouchEnd(targetElement, null, null, null, null, xValue + 200, 10));
                    var leftValue = index_2.getElement('tooltip_container_leftTooltipparent_template').innerHTML;
                    var rightValue = index_2.getElement('tooltip_container_leftTooltipparent_template').innerHTML;
                    expect(leftValue === rightValue).toBe(true);
                    done();
                };
                range.tooltipRender = null;
                range.tooltip.template = '<div>${start}</div>';
                range.refresh();
            });
            it('checking highcontrast theme', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('tooltip_container_RightSlider');
                    targetElement = element.childNodes[2];
                    done();
                };
                range.tooltip.displayMode = 'Always';
                range.theme = 'HighContrastLight';
                range.tooltip.template = null;
                range.refresh();
            });
            it('checking tooltip with RTL', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('tooltip_container_RightSlider');
                    targetElement = element.childNodes[2];
                    var transform = element.getAttribute('transform');
                    var str1 = transform.substring(transform.indexOf('(') + 1);
                    var xValue = +str1.substring(0, str1.indexOf(','));
                    range.rangeOnMouseDown(trigger.onTouchStart(targetElement, null, null, null, null, xValue, 10));
                    range.mouseMove(trigger.onTouchMove(targetElement, null, null, null, null, xValue + 200, 10));
                    range.mouseEnd(trigger.onTouchEnd(targetElement, null, null, null, null, xValue + 200, 10));
                    var leftValue = index_2.getElement('tooltip_container_leftTooltip_text').textContent;
                    var rightValue = index_2.getElement('tooltip_container_rightTooltip_text').textContent;
                    expect(leftValue).toBe('Jun');
                    expect(rightValue).toBe('May');
                    done();
                };
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
