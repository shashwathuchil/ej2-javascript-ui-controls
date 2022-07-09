define(["require", "exports", "../../src/sparkline/index", "../../src/sparkline/utils/helper", "@syncfusion/ej2-base", "./events.spec"], function (require, exports, index_1, helper_1, ej2_base_1, events_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    index_1.Sparkline.Inject(index_1.SparklineTooltip);
    describe('Sparkline tooltip and tracker checking Spec', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('Sparkline default theme Spec', function () {
            var trigger = new events_spec_1.MouseEvents();
            var element;
            var sparkline;
            var id = 'sparks';
            var ele;
            var rect;
            var d;
            beforeAll(function () {
                element = ej2_base_1.createElement('div', { id: id });
                document.body.appendChild(element);
                sparkline = new index_1.Sparkline({
                    width: '400', height: '100',
                    type: 'Column',
                    containerArea: {
                        border: {
                            width: 4
                        }
                    },
                    dataSource: [
                        { id: 10, value: 50 },
                        { id: 20, value: 30 },
                        { id: 30, value: -40 },
                        { id: 40, value: 10 },
                        { id: 50, value: -60 },
                        { id: 60, value: 20 },
                        { id: 70, value: 70 },
                        { id: 80, value: -55 },
                        { id: 90, value: 80 },
                        { id: 100, value: 45 }
                    ], yName: 'value', xName: 'id',
                    axisSettings: {
                        lineSettings: {
                            visible: true
                        }
                    },
                    rangeBandSettings: [
                        {
                            startRange: 1, endRange: 3,
                        }
                    ],
                    dataLabelSettings: {
                        visible: ['All']
                    },
                    tooltipSettings: {
                        visible: true,
                        trackLineSettings: {
                            visible: true,
                            width: 2
                        }
                    }
                });
            });
            afterAll(function () {
                sparkline.destroy();
                helper_1.removeElement(id);
            });
            it('Sparkline tracker line checking', function () {
                sparkline.loaded = function (args) {
                    args.sparkline.loaded = function () { };
                    ele = helper_1.getIdElement(id + '_sparkline_column_1');
                    trigger.mousemoveEvent(ele, 0, 0, 30, 30);
                    ele = helper_1.getIdElement(id + '_sparkline_tracker');
                    expect(ele.getAttribute('fill')).toBe('#000000');
                    expect(ele.getAttribute('stroke')).toBe('#000000');
                };
                sparkline.appendTo('#' + id);
            });
            it('Sparkline tooltip checking', function () {
                sparkline.loaded = function (args) {
                    args.sparkline.loaded = function () { };
                    ele = helper_1.getIdElement(id + '_sparkline_column_1');
                    trigger.mousemoveEvent(ele, 0, 0, 30, 30);
                    ele = helper_1.getIdElement(id + '_sparkline_tooltip_div_text');
                    expect(ele.firstChild.textContent).toBe('50');
                    expect(ele.lastChild.textContent).toBe('50');
                    ele = helper_1.getIdElement(id + '_sparkline_tracker');
                    expect(ele.getAttribute('fill')).toBe('#000000');
                    expect(ele.getAttribute('stroke')).toBe('#000000');
                };
                sparkline.appendTo('#' + id);
            });
            it('Sparkline tooltip fill checking', function () {
                sparkline.loaded = function (args) {
                    args.sparkline.loaded = function () { };
                    ele = helper_1.getIdElement(id + '_sparkline_column_1');
                    trigger.mousemoveEvent(ele, 0, 0, 30, 30);
                    ele = helper_1.getIdElement(id + '_sparkline_tooltip_div_path');
                    expect(ele.getAttribute('fill')).toBe('#363F4C');
                };
                sparkline.appendTo('#' + id);
            });
            it('checking the axisLineColor', function () {
                sparkline.loaded = function (args) {
                    ele = helper_1.getIdElement(id + '_Sparkline_XAxis');
                    expect(ele.getAttribute('stroke')).toBe('#000000');
                };
                sparkline.appendTo('#' + id);
            });
            it('checking the dataLabelColor', function () {
                sparkline.loaded = function (args) {
                    ele = helper_1.getIdElement(id + '_sparkline_label_text_0');
                    expect(ele.getAttribute('fill')).toBe('#424242');
                };
                sparkline.appendTo('#' + id);
            });
            it('checking the rangeBandColor', function () {
                sparkline.loaded = function (args) {
                    ele = helper_1.getIdElement(id + '_rangeBand_0');
                    expect(ele.getAttribute('fill')).toBe('#000000');
                };
                sparkline.appendTo('#' + id);
            });
            it('checking the background', function () {
                sparkline.loaded = function (args) {
                    ele = helper_1.getIdElement(id + '_SparklineBorder');
                    expect(ele.getAttribute('fill')).toBe('#FFFFFF');
                };
                sparkline.appendTo('#' + id);
            });
        });
        describe('Sparkline MaterialDark theme Spec', function () {
            var trigger = new events_spec_1.MouseEvents();
            var element;
            var sparkline;
            var id = 'sparks';
            var ele;
            var rect;
            var d;
            beforeAll(function () {
                element = ej2_base_1.createElement('div', { id: id });
                document.body.appendChild(element);
                sparkline = new index_1.Sparkline({
                    theme: 'MaterialDark',
                    width: '400', height: '100',
                    type: 'Column',
                    containerArea: {
                        border: {
                            width: 4
                        }
                    },
                    dataSource: [
                        { id: 10, value: 50 },
                        { id: 20, value: 30 },
                        { id: 30, value: -40 },
                        { id: 40, value: 10 },
                        { id: 50, value: -60 },
                        { id: 60, value: 20 },
                        { id: 70, value: 70 },
                        { id: 80, value: -55 },
                        { id: 90, value: 80 },
                        { id: 100, value: 45 }
                    ], yName: 'value', xName: 'id',
                    axisSettings: {
                        lineSettings: {
                            visible: true
                        }
                    },
                    rangeBandSettings: [
                        {
                            startRange: 1, endRange: 3,
                        }
                    ],
                    dataLabelSettings: {
                        visible: ['All']
                    },
                    tooltipSettings: {
                        visible: true,
                        trackLineSettings: {
                            visible: true,
                            width: 2
                        }
                    }
                });
            });
            afterAll(function () {
                sparkline.destroy();
                helper_1.removeElement(id);
            });
            it('Sparkline tracker line checking', function () {
                sparkline.loaded = function (args) {
                    args.sparkline.loaded = function () { };
                    ele = helper_1.getIdElement(id + '_sparkline_column_1');
                    trigger.mousemoveEvent(ele, 0, 0, 30, 30);
                    ele = helper_1.getIdElement(id + '_sparkline_tracker');
                    expect(ele.getAttribute('fill')).toBe('#ffffff');
                    expect(ele.getAttribute('stroke')).toBe('#ffffff');
                };
                sparkline.appendTo('#' + id);
            });
            it('Sparkline tooltip checking', function () {
                sparkline.loaded = function (args) {
                    args.sparkline.loaded = function () { };
                    ele = helper_1.getIdElement(id + '_sparkline_column_1');
                    trigger.mousemoveEvent(ele, 0, 0, 30, 30);
                    ele = helper_1.getIdElement(id + '_sparkline_tooltip_div_text');
                    expect(ele.firstChild.textContent).toBe('50');
                    expect(ele.lastChild.textContent).toBe('50');
                    ele = helper_1.getIdElement(id + '_sparkline_tracker');
                    expect(ele.getAttribute('fill')).toBe('#ffffff');
                    expect(ele.getAttribute('stroke')).toBe('#ffffff');
                };
                sparkline.appendTo('#' + id);
            });
            it('Sparkline tooltip fill checking', function () {
                sparkline.loaded = function (args) {
                    args.sparkline.loaded = function () { };
                    ele = helper_1.getIdElement(id + '_sparkline_column_1');
                    trigger.mousemoveEvent(ele, 0, 0, 30, 30);
                    ele = helper_1.getIdElement(id + '_sparkline_tooltip_div_path');
                    expect(ele.getAttribute('fill')).toBe('#ffffff');
                };
                sparkline.appendTo('#' + id);
            });
            it('checking the axisLineColor', function () {
                sparkline.loaded = function (args) {
                    ele = helper_1.getIdElement(id + '_Sparkline_XAxis');
                    expect(ele.getAttribute('stroke')).toBe('#ffffff');
                };
                sparkline.appendTo('#' + id);
            });
            it('checking the dataLabelColor', function () {
                sparkline.loaded = function (args) {
                    ele = helper_1.getIdElement(id + '_sparkline_label_text_0');
                    expect(ele.getAttribute('fill')).toBe('#ffffff');
                };
                sparkline.appendTo('#' + id);
            });
            it('checking the rangeBandColor', function () {
                sparkline.loaded = function (args) {
                    ele = helper_1.getIdElement(id + '_rangeBand_0');
                    expect(ele.getAttribute('fill')).toBe('#ffffff');
                };
                sparkline.appendTo('#' + id);
            });
            it('checking the background', function () {
                sparkline.loaded = function (args) {
                    ele = helper_1.getIdElement(id + '_SparklineBorder');
                    expect(ele.getAttribute('fill')).toBe('#000000');
                };
                sparkline.appendTo('#' + id);
            });
        });
        describe('Sparkline bootstrap4 theme Spec', function () {
            var trigger = new events_spec_1.MouseEvents();
            var element;
            var sparkline;
            var id = 'sparks';
            var ele;
            var rect;
            var d;
            beforeAll(function () {
                element = ej2_base_1.createElement('div', { id: id });
                document.body.appendChild(element);
                sparkline = new index_1.Sparkline({
                    theme: 'Bootstrap4',
                    width: '400', height: '100',
                    type: 'Column',
                    containerArea: {
                        border: {
                            width: 4
                        }
                    },
                    dataSource: [
                        { id: 10, value: 50 },
                        { id: 20, value: 30 },
                        { id: 30, value: -40 },
                        { id: 40, value: 10 },
                        { id: 50, value: -60 },
                        { id: 60, value: 20 },
                        { id: 70, value: 70 },
                        { id: 80, value: -55 },
                        { id: 90, value: 80 },
                        { id: 100, value: 45 }
                    ], yName: 'value', xName: 'id',
                    axisSettings: {
                        lineSettings: {
                            visible: true
                        }
                    },
                    rangeBandSettings: [
                        {
                            startRange: 1, endRange: 3,
                        }
                    ],
                    dataLabelSettings: {
                        visible: ['All']
                    },
                    tooltipSettings: {
                        visible: true,
                        trackLineSettings: {
                            visible: true,
                            width: 2
                        }
                    }
                });
            });
            afterAll(function () {
                sparkline.destroy();
                helper_1.removeElement(id);
            });
            it('Sparkline tracker line checking', function () {
                sparkline.loaded = function (args) {
                    args.sparkline.loaded = function () { };
                    ele = helper_1.getIdElement(id + '_sparkline_column_1');
                    trigger.mousemoveEvent(ele, 0, 0, 30, 30);
                    ele = helper_1.getIdElement(id + '_sparkline_tracker');
                    expect(ele.getAttribute('fill')).toBe('#212529');
                    expect(ele.getAttribute('stroke')).toBe('#212529');
                };
                sparkline.appendTo('#' + id);
            });
            it('Sparkline tooltip checking', function () {
                sparkline.loaded = function (args) {
                    args.sparkline.loaded = function () { };
                    ele = helper_1.getIdElement(id + '_sparkline_column_1');
                    trigger.mousemoveEvent(ele, 0, 0, 30, 30);
                    ele = helper_1.getIdElement(id + '_sparkline_tooltip_div_text');
                    expect(ele.firstChild.textContent).toBe('50');
                    expect(ele.lastChild.textContent).toBe('50');
                    ele = helper_1.getIdElement(id + '_sparkline_tracker');
                    expect(ele.getAttribute('fill')).toBe('#212529');
                    expect(ele.getAttribute('stroke')).toBe('#212529');
                    expect(ele.getAttribute('opacity')).toBe('1');
                };
                sparkline.appendTo('#' + id);
            });
            it('Sparkline tooltip fill checking', function () {
                sparkline.loaded = function (args) {
                    args.sparkline.loaded = function () { };
                    ele = helper_1.getIdElement(id + '_sparkline_column_1');
                    trigger.mousemoveEvent(ele, 0, 0, 30, 30);
                    ele = helper_1.getIdElement(id + '_sparkline_tooltip_div_path');
                    expect(ele.getAttribute('fill')).toBe('#000000');
                };
                sparkline.appendTo('#' + id);
            });
            it('checking the axisLineColor', function () {
                sparkline.loaded = function (args) {
                    ele = helper_1.getIdElement(id + '_Sparkline_XAxis');
                    expect(ele.getAttribute('stroke')).toBe('#6C757D');
                };
                sparkline.appendTo('#' + id);
            });
            it('checking the dataLabelColor', function () {
                sparkline.loaded = function (args) {
                    ele = helper_1.getIdElement(id + '_sparkline_label_text_0');
                    expect(ele.getAttribute('fill')).toBe('#212529');
                    expect(ele.getAttribute('font-family')).toBe('HelveticaNeue');
                };
                sparkline.appendTo('#' + id);
            });
            it('checking the rangeBandColor', function () {
                sparkline.loaded = function (args) {
                    ele = helper_1.getIdElement(id + '_rangeBand_0');
                    expect(ele.getAttribute('fill')).toBe('#212529');
                };
                sparkline.appendTo('#' + id);
            });
            it('checking the background', function () {
                sparkline.loaded = function (args) {
                    ele = helper_1.getIdElement(id + '_SparklineBorder');
                    expect(ele.getAttribute('fill')).toBe('#FFFFFF');
                };
                sparkline.appendTo('#' + id);
            });
        });
    });
});
