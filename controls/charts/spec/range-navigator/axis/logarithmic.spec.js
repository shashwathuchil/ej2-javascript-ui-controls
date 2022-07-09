define(["require", "exports", "../../../src/range-navigator/index", "../../../src/chart/index", "@syncfusion/ej2-base", "../../common.spec"], function (require, exports, index_1, index_2, ej2_base_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    index_1.RangeNavigator.Inject(index_2.Logarithmic, index_2.DateTime, index_2.LineSeries);
    var value = 0;
    var point;
    var data = [];
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
        describe('with logarithmic axis', function () {
            var element;
            var range;
            var rangeElement = ej2_base_1.createElement('div', { id: 'container' });
            var axisLabel;
            beforeAll(function () {
                document.body.appendChild(rangeElement);
                range = new index_1.RangeNavigator({
                    series: [{
                            dataSource: [{ x: 10, y: 20 }, { x: 10000, y: 12 }],
                            xName: 'x', yName: 'y', type: 'Line'
                        }],
                    valueType: 'Logarithmic'
                });
            });
            afterAll(function () {
                range.destroy();
                rangeElement.remove();
            });
            it('checking with instance creation ', function (done) {
                range.loaded = function (args) {
                    var container = document.getElementById('container_svg');
                    expect(container.getAttribute('height')).toEqual('120');
                    expect(range != null).toBe(true);
                    done();
                };
                range.appendTo('#container');
            });
            it('checking with logarithmic axis labels', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('container_AxisLabel_1');
                    expect(element.innerHTML).toEqual('100');
                    done();
                };
                range.refresh();
            });
            it('checking with minimum', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('container_AxisLabel_0');
                    expect(element.textContent).toEqual('10');
                    done();
                };
                range.minimum = 10;
                range.refresh();
            });
            it('checking with maximum', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('container_AxisLabels');
                    expect(element.childNodes[0].lastChild.textContent).toEqual('1000');
                    done();
                };
                range.minimum = null;
                range.maximum = 1000;
                range.refresh();
            });
            it('checking with interval', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('container_AxisLabels');
                    expect(element.childNodes[0].lastChild.textContent).toEqual('1000');
                    done();
                };
                range.minimum = null;
                range.maximum = null;
                range.interval = 2;
                range.refresh();
            });
            it('checking with logBase', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('container_AxisLabels');
                    expect(element.childNodes[0].firstChild.textContent).toEqual('8');
                    done();
                };
                range.minimum = null;
                range.maximum = null;
                range.interval = 2;
                range.logBase = 8;
                range.refresh();
            });
            it('checking with logBase with minimum', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('container_AxisLabels');
                    expect(element.childNodes[0].firstChild.textContent).toEqual('8');
                    done();
                };
                range.maximum = null;
                range.interval = null;
                range.logBase = 8;
                range.minimum = 10;
                range.refresh();
            });
            it('checking with logBase with maximum', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('container_AxisLabels');
                    expect(element.childNodes[0].lastChild.textContent).toEqual('512');
                    done();
                };
                range.interval = null;
                range.logBase = 8;
                range.minimum = null;
                range.maximum = 200;
                range.refresh();
            });
            it('checking with logBase with interval', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('container_AxisLabels');
                    expect(element.childNodes[0].firstChild.textContent).toEqual('8');
                    expect(element.childNodes[0].childNodes[1].textContent).toEqual('512');
                    done();
                };
                range.interval = 2;
                range.logBase = 8;
                range.minimum = null;
                range.maximum = null;
                range.refresh();
            });
            it('checking with custom label format', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('container_AxisLabel_1');
                    expect(element.textContent.indexOf('K') > -1).toBe(true);
                    done();
                };
                range.labelFormat = '{value}K';
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
