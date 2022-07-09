define(["require", "exports", "../../../src/range-navigator/index", "../../../src/chart/index", "../../../src/common/period-selector/period-selector", "@syncfusion/ej2-base", "../../chart/base/events.spec", "../../common.spec"], function (require, exports, index_1, index_2, period_selector_1, ej2_base_1, events_spec_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    index_1.RangeNavigator.Inject(index_2.AreaSeries, index_2.DateTime, period_selector_1.PeriodSelector);
    var value = 0;
    var point;
    var data = [];
    var dateTime = [];
    for (var j = 0; j < 1000; j++) {
        value += (Math.random() * 10 - 5);
        point = { x: new Date(2018, 3, j), y: value, y1: value + 10 };
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
            var trigger = new events_spec_1.MouseEvents();
            var isCheck = false;
            beforeAll(function () {
                document.body.appendChild(rangeElement);
                range = new index_1.RangeNavigator({
                    series: [{ dataSource: data, xName: 'x', yName: 'y', type: 'Line' }], valueType: 'DateTime', height: '500', animationDuration: 0,
                    periodSelectorSettings: { position: 'Top', height: 200, periods: [{ intervalType: 'Days', interval: 3, text: '3d' }] }
                });
                range.appendTo('#container');
            });
            afterAll(function () {
                range.destroy();
                rangeElement.remove();
            });
            it('checking with selector position as bottom', function (done) {
                range.loaded = function (args) {
                    var period = document.getElementById('container_Secondary_Element');
                    done();
                };
                isCheck = false;
                range.periodSelectorSettings.position = 'Bottom';
                range.refresh();
            });
            it('checking with selector position as top', function (done) {
                range.loaded = function (args) {
                    var period = document.getElementById('container_Secondary_Element');
                    done();
                };
                isCheck = false;
                range.periodSelectorSettings.position = 'Top';
                range.refresh();
            });
            it('checking days click', function (done) {
                var i = 0;
                range.loaded = function (args) {
                    var dayButton = document.getElementById('e-tbr-btn_6');
                    trigger.clickEvent(dayButton);
                    isCheck = true;
                };
                range.changed = function (args) {
                    if (isCheck) {
                        expect(args.start.toString() === ('Wed May 02 2018 00:00:00 GMT+0530 (India Standard Time)')
                            || args.start.toString() === ('Wed May 02 2018 00:00:00 GMT+0000 (Coordinated Universal Time)')).toBe(true);
                        isCheck = false;
                    }
                    done();
                };
                range.series[0].dataSource = [{ x: new Date(2018, 4, 1), y: 12 }, { x: new Date(2018, 4, 2), y: 10 },
                    { x: new Date(2018, 4, 3), y: 8 }, { x: new Date(2018, 4, 5), y: 12 }];
                range.periodSelectorSettings.position = 'Top';
                range.series[0].animation.duration = 0;
                range.intervalType = 'Days';
                range.refresh();
            });
            it('checking weeks click', function (done) {
                range.loaded = function (args) {
                    var dayButton = document.getElementById('e-tbr-btn_8');
                    trigger.clickEvent(dayButton);
                    isCheck = true;
                };
                range.changed = function (args) {
                    if (isCheck) {
                        expect(args.start.toString().indexOf('May') > -1 || args.start.toString().indexOf('Apr') > -1).toBe(true);
                        isCheck = false;
                    }
                    done();
                };
                range.series[0].dataSource = [{ x: new Date(2018, 3), y: 23 }, { x: new Date(2018, 4, 1), y: 12 },
                    { x: new Date(2018, 4, 2), y: 10 }, { x: new Date(2018, 4, 5), y: 12 }];
                range.intervalType = 'Weeks';
                range.periodSelectorSettings.periods = [{ intervalType: 'Weeks', interval: 2, text: '3w' }];
                range.refresh();
            });
            it('checking months click', function (done) {
                debugger;
                range.loaded = function (args) {
                    var dayButton = document.getElementById('e-tbr-btn_10');
                    trigger.clickEvent(dayButton);
                    isCheck = true;
                };
                range.changed = function (args) {
                    if (isCheck) {
                        expect(args.start.toString().indexOf('Mar') > -1 || args.start.toString().indexOf('May') > -1).toBe(true);
                        isCheck = false;
                    }
                    done();
                };
                range.series[0].dataSource = [{ x: new Date(2017, 5), y: 45 }, { x: new Date(2018, 3), y: 23 }, { x: new Date(2018, 4, 1), y: 12 },
                    { x: new Date(2018, 4, 2), y: 10 }, { x: new Date(2018, 4, 5), y: 12 }];
                range.intervalType = 'Months';
                range.periodSelectorSettings.periods = [{ intervalType: 'Months', interval: 2, text: '2m' }];
                range.refresh();
            });
            it('checking quarter click', function (done) {
                range.loaded = function (args) {
                    var dayButton = document.getElementById('e-tbr-btn_12');
                    trigger.clickEvent(dayButton);
                    isCheck = true;
                };
                range.changed = function (args) {
                    if (isCheck) {
                        isCheck = false;
                    }
                    done();
                };
                range.series[0].dataSource = [{ x: new Date(2017, 1), y: 10 }, { x: new Date(2017, 5), y: 45 }, { x: new Date(2018, 3), y: 23 }, { x: new Date(2018, 4, 1), y: 12 },
                    { x: new Date(2018, 4, 2), y: 10 }, { x: new Date(2018, 4, 5), y: 12 }];
                range.intervalType = 'Quarter';
                range.periodSelectorSettings.periods = [{ intervalType: 'Quarter', interval: 1, text: '1q' }];
                range.refresh();
            });
            it('checking ytd click', function (done) {
                range.loaded = function (args) {
                    var dayButton = document.getElementById('e-tbr-btn_15');
                    trigger.clickEvent(dayButton);
                    isCheck = true;
                };
                range.changed = function (args) {
                    if (isCheck) {
                        isCheck = false;
                    }
                    done();
                };
                range.intervalType = 'Auto';
                range.periodSelectorSettings.periods = [{ intervalType: 'Quarter', interval: 1, text: '1q' }, { text: 'ytd' }, { text: 'all' }];
                range.refresh();
            });
            it('checking all click', function (done) {
                range.loaded = function (args) {
                    var dayButton = document.getElementById('e-tbr-btn_20');
                    trigger.clickEvent(dayButton);
                    isCheck = true;
                };
                range.changed = function (args) {
                    if (isCheck) {
                        isCheck = false;
                    }
                    done();
                };
                range.intervalType = 'Auto';
                range.periodSelectorSettings.periods = [{ intervalType: 'Years', interval: 1, text: '1y' }, { text: 'ytd' }, { text: 'all' }];
                range.refresh();
            });
            it('checking years click', function (done) {
                range.loaded = function (args) {
                    var dayButton = document.getElementById('e-tbr-btn_22');
                    trigger.clickEvent(dayButton);
                    isCheck = true;
                };
                range.changed = function (args) {
                    if (isCheck) {
                        isCheck = false;
                    }
                    done();
                };
                range.intervalType = 'Auto';
                range.periodSelectorSettings.periods = [{ intervalType: 'Years', interval: 1, text: '1y' }, { text: 'ytd' }, { text: 'all' }];
                range.refresh();
            });
        });
        describe('with default case', function () {
            var element;
            var range;
            var rangeElement = ej2_base_1.createElement('div', { id: 'container' });
            var axisLabel;
            var trigger = new events_spec_1.MouseEvents();
            var isCheck = false;
            beforeAll(function () {
                document.body.appendChild(rangeElement);
                range = new index_1.RangeNavigator({
                    series: [{ dataSource: [{ x: new Date(2018, 4, 3, 4), y: 5 }, { x: new Date(2018, 4, 3, 5), y: 5 }], xName: 'x', yName: 'y', type: 'Line' }], valueType: 'DateTime', height: '500', animationDuration: 0,
                    periodSelectorSettings: {
                        position: 'Top', height: 200, periods: [{ intervalType: 'Hours', interval: 3, text: '3h' },
                            { intervalType: 'Minutes', interval: 30, text: '30m' }, { intervalType: 'Seconds', interval: 100, text: '100sec' }]
                    }
                });
                range.appendTo('#container');
            });
            afterAll(function () {
                range.destroy();
                rangeElement.remove();
            });
            it('checking hours click', function (done) {
                range.loaded = function (args) {
                    var dayButton = document.getElementById('e-tbr-btn_30');
                    trigger.clickEvent(dayButton);
                    isCheck = true;
                };
                range.changed = function (args) {
                    if (isCheck) {
                        expect(args.start.toString() === ('Thu May 03 2018 04:00:00 GMT+0530 (India Standard Time)')
                            || args.start.toString() === ('Thu May 03 2018 04:00:00 GMT+0000 (Coordinated Universal Time)')).toBe(true);
                        isCheck = false;
                    }
                    done();
                };
                range.refresh();
            });
            it('checking minutes click', function (done) {
                range.loaded = function (args) {
                    var dayButton = document.getElementById('e-tbr-btn_35');
                    trigger.clickEvent(dayButton);
                    isCheck = true;
                };
                range.changed = function (args) {
                    if (isCheck) {
                        expect(args.start.toString().indexOf('May') > 1).toBe(true);
                        isCheck = false;
                    }
                    done();
                };
                range.refresh();
            });
            it('checking seconds click', function (done) {
                range.loaded = function (args) {
                    var dayButton = document.getElementById('e-tbr-btn_38');
                    trigger.clickEvent(dayButton);
                    isCheck = true;
                };
                range.changed = function (args) {
                    if (isCheck) {
                        expect(args.start.toString().indexOf('May') > 1).toBe(true);
                        isCheck = false;
                    }
                    done();
                };
                range.periodSelectorSettings = {
                    position: 'Top', height: 200, periods: [{ intervalType: 'Seconds', interval: 100, text: '100sec' },
                        { text: 'all' }]
                };
                range.refresh();
            });
            it('checing date range changed', function (done) {
                range.loaded = function (args) {
                    isCheck = true;
                    range.periodSelectorModule.datePicker.startDate = new Date(2018, 4, 3, 4);
                    range.periodSelectorModule.datePicker.endDate = new Date(2018, 4, 3, 4);
                    range.periodSelectorModule.triggerChange = true;
                };
                range.changed = function (args) {
                    if (isCheck) {
                        expect(args.start.toString().indexOf('May') > 1).toBe(true);
                        isCheck = false;
                    }
                    done();
                };
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
