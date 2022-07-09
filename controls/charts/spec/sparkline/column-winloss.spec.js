define(["require", "exports", "../../src/sparkline/index", "../../src/sparkline/utils/helper", "@syncfusion/ej2-base", "./datalabel.spec", "../common.spec"], function (require, exports, index_1, helper_1, ej2_base_1, datalabel_spec_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getRect = function (ele) {
        var d = ele.getAttribute('d').split(' ');
        var x = parseInt(d[1], 10);
        var y = parseInt(d[2], 10);
        var width = parseInt(d[9], 10) - x;
        var height = parseInt(d[18], 10) - y;
        return new helper_1.Rect(x, y, width, height);
    };
    describe('Sparkline Column and WinLoss series spec', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('Sparkline Column Series Spec', function () {
            var element;
            var sparkline;
            var id = 'sparks';
            var ele;
            var rect;
            var d;
            beforeAll(function () {
                element = ej2_base_1.createElement('div', { id: id });
                element.style.width = '400px';
                element.style.height = '100px';
                document.body.appendChild(element);
                sparkline = new index_1.Sparkline({
                    width: '400', height: '100',
                    type: 'Column',
                    fill: '#0ffa847c',
                    border: { color: '#0cfd84', width: 1 },
                    containerArea: {
                        border: {
                            color: '#a9fd0c', width: 1
                        },
                    },
                    dataSource: [
                        { id: 10, value: 6346152600 },
                        { id: 20, value: 7427152600 },
                        { id: 30, value: 4314152600 },
                        { id: 40, value: 9493152600 },
                        { id: 50, value: 5787152600 },
                        { id: 60, value: 7492152600 },
                        { id: 70, value: 4323152600 },
                        { id: 80, value: 8745152600 },
                        { id: 90, value: 1098152600 },
                        { id: 100, value: 3876152600 }
                    ], yName: 'value', xName: 'id'
                });
            });
            afterAll(function () {
                sparkline.destroy();
                helper_1.removeElement(id);
            });
            it('Sparkline Column path and border path checking', function () {
                sparkline.loaded = function (args) {
                    args.sparkline.loaded = function () { };
                    ele = helper_1.getIdElement(id + '_sparkline_column_1');
                    rect = exports.getRect(ele);
                    expect(ele.getAttribute('fill')).toBe('#0ffa847c');
                    expect(ele.getAttribute('stroke')).toBe('#0cfd84');
                    expect(ele.getAttribute('stroke-width')).toBe('1');
                    expect(rect.x).toBe(44);
                    expect(rect.y).toBe(27);
                    expect(rect.height).toBe(68);
                    expect(rect.width).toBe(38);
                };
                sparkline.appendTo('#' + id);
            });
            it('Sparkline Column x and y value first point checking', function () {
                ele = helper_1.getIdElement(id + '_sparkline_column_0');
                rect = exports.getRect(ele);
                expect(ele.getAttribute('fill')).toBe('#0ffa847c');
                expect(ele.getAttribute('stroke')).toBe('#0cfd84');
                expect(ele.getAttribute('stroke-width')).toBe('1');
                expect(rect.x).toBe(5);
                expect(rect.y).toBe(38);
                expect(rect.height).toBe(57);
                expect(rect.width).toBe(38);
            });
            it('Sparkline Column x and y value last point checking', function () {
                ele = helper_1.getIdElement(id + '_sparkline_column_9');
                rect = exports.getRect(ele);
                expect(ele.getAttribute('fill')).toBe('#0ffa847c');
                expect(ele.getAttribute('stroke')).toBe('#0cfd84');
                expect(ele.getAttribute('stroke-width')).toBe('1');
                expect(rect.x).toBe(356);
                expect(rect.y).toBe(65);
                expect(rect.height).toBe(30);
                expect(rect.width).toBe(38);
            });
            it('Sparkline Column x and y value random point checking', function () {
                ele = helper_1.getIdElement(id + '_sparkline_column_8');
                rect = exports.getRect(ele);
                expect(ele.getAttribute('fill')).toBe('#0ffa847c');
                expect(ele.getAttribute('stroke')).toBe('#0cfd84');
                expect(ele.getAttribute('stroke-width')).toBe('1');
                expect(rect.x).toBe(317);
                expect(rect.y).toBe(89);
                expect(rect.height).toBe(6);
                expect(rect.width).toBe(38);
            });
            it('Sparkline Column x and y value checking after axis value', function () {
                sparkline.axisSettings.value = 1098152600;
                sparkline.dataBind();
                ele = helper_1.getIdElement(id + '_sparkline_column_8');
                rect = exports.getRect(ele);
                expect(ele.getAttribute('fill')).toBe('#0ffa847c');
                expect(ele.getAttribute('stroke')).toBe('#0cfd84');
                expect(ele.getAttribute('stroke-width')).toBe('1');
                expect(rect.x).toBe(317);
                expect(rect.y).toBe(95);
                expect(rect.height).toBe(0);
                expect(rect.width).toBe(38);
            });
            it('Sparkline Column x and y value checking after axis value is 0 and minus values', function () {
                sparkline.axisSettings.value = 0;
                sparkline.dataSource[2]['value'] *= -1;
                sparkline.dataSource[4]['value'] *= -1;
                sparkline.dataSource[6]['value'] *= -1;
                sparkline.dataSource[8]['value'] *= -1;
                sparkline.dataBind();
                ele = helper_1.getIdElement(id + '_sparkline_column_8');
                rect = exports.getRect(ele);
                expect(ele.getAttribute('fill')).toBe('#0ffa847c');
                expect(ele.getAttribute('stroke')).toBe('#0cfd84');
                expect(ele.getAttribute('stroke-width')).toBe('1');
                expect(rect.x).toBe(317);
                expect(rect.y).toBe(61);
                expect(rect.height).toBe(6);
                expect(rect.width).toBe(38);
            });
            it('Sparkline Column minus values and axis value 0 checking low point', function () {
                ele = helper_1.getIdElement(id + '_sparkline_column_4');
                rect = exports.getRect(ele);
                expect(ele.getAttribute('fill')).toBe('#0ffa847c');
                expect(ele.getAttribute('stroke')).toBe('#0cfd84');
                expect(ele.getAttribute('stroke-width')).toBe('1');
                expect(rect.x).toBe(161);
                expect(rect.y).toBe(61);
                expect(rect.height).toBe(34);
                expect(rect.width).toBe(38);
            });
            it('Sparkline Column minus values and axis value 0 checking high point', function () {
                ele = helper_1.getIdElement(id + '_sparkline_column_3');
                rect = exports.getRect(ele);
                expect(ele.getAttribute('fill')).toBe('#0ffa847c');
                expect(ele.getAttribute('stroke')).toBe('#0cfd84');
                expect(ele.getAttribute('stroke-width')).toBe('1');
                expect(rect.x).toBe(122);
                expect(rect.y).toBe(5);
                expect(rect.height).toBe(56);
                expect(rect.width).toBe(38);
            });
            it('Sparkline Column web accessibility checking', function () {
                ele = helper_1.getIdElement(id + '_sparkline_column_3');
                expect(ele.getAttribute('aria-label')).toBe('40 : 9493152600');
            });
            it('Sparkline column datalabel', function () {
                sparkline.dataLabelSettings.visible = ['All'];
                sparkline.dataBind();
                ele = helper_1.getIdElement(id + '_sparkline_label_text_8');
                var options = datalabel_spec_1.getLabelOptions(ele);
                expect(options.text).toBe('-1098152600');
                expect(options.x).toBe(336);
                expect(options.y === 79 || options.y === 78).toBe(true);
            });
        });
        describe('Sparkline WinLoss Series Spec', function () {
            var element;
            var sparkline;
            var id = 'sparks';
            var ele;
            var rect;
            var d;
            beforeAll(function () {
                element = ej2_base_1.createElement('div', { id: id });
                element.style.width = '400px';
                element.style.height = '100px';
                document.body.appendChild(element);
                sparkline = new index_1.Sparkline({
                    width: '400', height: '100',
                    type: 'WinLoss',
                    fill: '#0ffa847c',
                    border: { width: 1 },
                    containerArea: {
                        border: {
                            color: '#a9fd0c', width: 1
                        },
                    },
                    axisSettings: {
                        value: 5787152600
                    },
                    dataSource: [
                        { id: 10, value: 6346152600 },
                        { id: 20, value: 7427152600 },
                        { id: 30, value: 4314152600 },
                        { id: 40, value: 9493152600 },
                        { id: 50, value: 5787152600 },
                        { id: 60, value: 7492152600 },
                        { id: 70, value: 4323152600 },
                        { id: 80, value: 8745152600 },
                        { id: 90, value: 1098152600 },
                        { id: 100, value: 3876152600 }
                    ], yName: 'value', xName: 'id'
                });
            });
            afterAll(function () {
                sparkline.destroy();
                helper_1.removeElement(id);
            });
            it('Sparkline WinLoss path and border path checking', function () {
                sparkline.loaded = function (args) {
                    args.sparkline.loaded = function () { };
                    ele = helper_1.getIdElement(id + '_sparkline_winloss_1');
                    rect = exports.getRect(ele);
                    expect(ele.getAttribute('fill')).toBe('#0ffa847c');
                    expect(ele.getAttribute('stroke')).toBe('#0ffa847c');
                    expect(ele.getAttribute('stroke-width')).toBe('1');
                    expect(rect.x).toBe(44);
                    expect(rect.y).toBe(27);
                    expect(rect.height).toBe(23);
                    expect(rect.width).toBe(38);
                };
                sparkline.appendTo('#' + id);
            });
            it('Sparkline WinLoss x and y value negative point border checking', function () {
                ele = helper_1.getIdElement(id + '_sparkline_winloss_2');
                rect = exports.getRect(ele);
                expect(ele.getAttribute('fill')).toBe('#e20f07');
                expect(ele.getAttribute('stroke')).toBe('#e20f07');
                expect(ele.getAttribute('stroke-width')).toBe('1');
                expect(rect.x).toBe(83);
                expect(rect.y).toBe(50);
                expect(rect.height).toBe(22);
                expect(rect.width).toBe(38);
            });
            it('Sparkline WinLoss x and y value tie point border checking', function () {
                ele = helper_1.getIdElement(id + '_sparkline_winloss_4');
                rect = exports.getRect(ele);
                expect(ele.getAttribute('fill')).toBe('#a216f3');
                expect(ele.getAttribute('stroke')).toBe('#a216f3');
                expect(ele.getAttribute('stroke-width')).toBe('1');
                expect(rect.x).toBe(161);
                expect(rect.y).toBe(47);
                expect(rect.height).toBe(5);
                expect(rect.width).toBe(38);
            });
            it('Sparkline WinLoss x and y value all positive points checking with previous tie point', function () {
                sparkline.axisSettings.value = null;
                sparkline.dataBind();
                ele = helper_1.getIdElement(id + '_sparkline_winloss_4');
                rect = exports.getRect(ele);
                expect(ele.getAttribute('fill')).toBe('#0ffa847c');
                expect(ele.getAttribute('stroke')).toBe('#0ffa847c');
                expect(ele.getAttribute('stroke-width')).toBe('1');
                expect(rect.x).toBe(161);
                expect(rect.y).toBe(27);
                expect(rect.height).toBe(23);
                expect(rect.width).toBe(38);
            });
            it('Sparkline WinLoss x and y value all positive points checking with previous negative point', function () {
                ele = helper_1.getIdElement(id + '_sparkline_winloss_2');
                rect = exports.getRect(ele);
                expect(ele.getAttribute('fill')).toBe('#0ffa847c');
                expect(ele.getAttribute('stroke')).toBe('#0ffa847c');
                expect(ele.getAttribute('stroke-width')).toBe('1');
                expect(rect.x).toBe(83);
                expect(rect.y).toBe(27);
                expect(rect.height).toBe(23);
                expect(rect.width).toBe(38);
            });
            it('Sparkline WinLoss x and y value all negative points checking with previous positive point', function () {
                sparkline.axisSettings.value = 94931526000;
                sparkline.dataBind();
                ele = helper_1.getIdElement(id + '_sparkline_winloss_7');
                rect = exports.getRect(ele);
                expect(ele.getAttribute('fill')).toBe('#e20f07');
                expect(ele.getAttribute('stroke')).toBe('#e20f07');
                expect(ele.getAttribute('stroke-width')).toBe('1');
                expect(rect.x).toBe(278);
                expect(rect.y).toBe(50);
                expect(rect.height).toBe(22);
                expect(rect.width).toBe(38);
            });
            it('Sparkline WinLoss points border customization checking', function () {
                sparkline.border = { color: '#33CCFF', width: 2 };
                sparkline.dataBind();
                ele = helper_1.getIdElement(id + '_sparkline_winloss_3');
                rect = exports.getRect(ele);
                expect(ele.getAttribute('fill')).toBe('#e20f07');
                expect(ele.getAttribute('stroke')).toBe('#33CCFF');
                expect(ele.getAttribute('stroke-width')).toBe('2');
                expect(rect.x).toBe(122);
                expect(rect.y).toBe(50);
                expect(rect.height).toBe(22);
                expect(rect.width).toBe(38);
            });
            it('Sparkline Winloss web accessibility checking', function () {
                ele = helper_1.getIdElement(id + '_sparkline_winloss_3');
                expect(ele.getAttribute('aria-label')).toBe('40 : 9493152600');
            });
            it('Sparkline WinLoss array of data checking without border', function () {
                sparkline.dataSource = [1, -1, 1, 1, 0, -1, -1, 0, -1, 1];
                sparkline.border = { color: '#33CCFF', width: 2 };
                sparkline.axisSettings.value = 0;
                sparkline.dataBind();
                ele = helper_1.getIdElement(id + '_sparkline_winloss_1');
                rect = exports.getRect(ele);
                expect(ele.getAttribute('fill')).toBe('#e20f07');
                expect(ele.getAttribute('stroke')).toBe('#33CCFF');
                expect(ele.getAttribute('stroke-width')).toBe('2');
                expect(rect.x).toBe(44);
                expect(rect.y).toBe(50);
                expect(rect.height).toBe(22);
                expect(rect.width).toBe(38);
            });
            it('Sparkline WinLoss array of data checking without border', function () {
                ele = helper_1.getIdElement(id + '_sparkline_winloss_9');
                rect = exports.getRect(ele);
                expect(ele.getAttribute('fill')).toBe('#0ffa847c');
                expect(ele.getAttribute('stroke')).toBe('#33CCFF');
                expect(ele.getAttribute('stroke-width')).toBe('2');
                expect(rect.x).toBe(356);
                expect(rect.y).toBe(27);
                expect(rect.height).toBe(23);
                expect(rect.width).toBe(38);
            });
        });
        describe('Sparkline Column Series Special points Spec', function () {
            var element;
            var sparkline;
            var id = 'sparks';
            var ele;
            var rect;
            var d;
            beforeAll(function () {
                element = ej2_base_1.createElement('div', { id: id });
                element.style.width = '400px';
                element.style.height = '100px';
                document.body.appendChild(element);
                sparkline = new index_1.Sparkline({
                    width: '400', height: '100',
                    type: 'Column',
                    fill: '#5af02c',
                    border: { width: 1 },
                    startPointColor: 'green',
                    highPointColor: 'blue',
                    lowPointColor: 'orange',
                    endPointColor: 'purple',
                    negativePointColor: 'red',
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
                    ], yName: 'value', xName: 'id'
                });
            });
            afterAll(function () {
                sparkline.destroy();
                helper_1.removeElement(id);
            });
            it('Sparkline Column with non-special point customization checking', function () {
                sparkline.loaded = function (args) {
                    args.sparkline.loaded = function () { };
                    ele = helper_1.getIdElement(id + '_sparkline_column_1');
                    rect = exports.getRect(ele);
                    expect(ele.getAttribute('fill')).toBe('#5af02c');
                    expect(ele.getAttribute('stroke-width')).toBe('1');
                    expect(rect.x).toBe(44);
                    expect(rect.y).toBe(37);
                    expect(rect.height).toBe(19);
                    expect(rect.width).toBe(38);
                };
                sparkline.appendTo('#' + id);
            });
            it('Sparkline Column Special point Start Color checking', function () {
                ele = helper_1.getIdElement(id + '_sparkline_column_0');
                rect = exports.getRect(ele);
                expect(ele.getAttribute('fill')).toBe('green');
                expect(ele.getAttribute('stroke-width')).toBe('1');
                expect(rect.x).toBe(5);
                expect(rect.y).toBe(24);
                expect(rect.height).toBe(32);
                expect(rect.width).toBe(38);
            });
            it('Sparkline Column Special point End Color checking', function () {
                ele = helper_1.getIdElement(id + '_sparkline_column_9');
                rect = exports.getRect(ele);
                expect(ele.getAttribute('fill')).toBe('purple');
                expect(ele.getAttribute('stroke-width')).toBe('1');
                expect(rect.x).toBe(356);
                expect(rect.y).toBe(27);
                expect(rect.height).toBe(29);
                expect(rect.width).toBe(38);
            });
            it('Sparkline Column Special point High Color checking', function () {
                ele = helper_1.getIdElement(id + '_sparkline_column_8');
                rect = exports.getRect(ele);
                expect(ele.getAttribute('fill')).toBe('blue');
                expect(ele.getAttribute('stroke-width')).toBe('1');
                expect(rect.x).toBe(317);
                expect(rect.y).toBe(5);
                expect(rect.height).toBe(51);
                expect(rect.width).toBe(38);
            });
            it('Sparkline Column Special point Low Color checking', function () {
                ele = helper_1.getIdElement(id + '_sparkline_column_4');
                rect = exports.getRect(ele);
                expect(ele.getAttribute('fill')).toBe('orange');
                expect(ele.getAttribute('stroke-width')).toBe('1');
                expect(rect.x).toBe(161);
                expect(rect.y).toBe(56);
                expect(rect.height).toBe(39);
                expect(rect.width).toBe(38);
            });
            it('Sparkline Column Special point Negative Color checking', function () {
                ele = helper_1.getIdElement(id + '_sparkline_column_2');
                rect = exports.getRect(ele);
                expect(ele.getAttribute('fill')).toBe('red');
                expect(ele.getAttribute('stroke-width')).toBe('1');
                expect(rect.x).toBe(83);
                expect(rect.y).toBe(56);
                expect(rect.height).toBe(26);
                expect(rect.width).toBe(38);
                ele = helper_1.getIdElement(id + '_sparkline_column_7');
                rect = exports.getRect(ele);
                expect(ele.getAttribute('fill')).toBe('red');
                expect(ele.getAttribute('stroke-width')).toBe('1');
                expect(rect.x).toBe(278);
                expect(rect.y).toBe(56);
                expect(rect.height).toBe(35);
                expect(rect.width).toBe(38);
                new helper_1.RectOption('dasda', 'red', { color: 'blue', width: 2 }, 1, new helper_1.Rect(0, 0, 10, 20), 5, 5, 5, 5);
            });
        });
        describe('Sparkline Column Series Special points Spec', function () {
            var element;
            var sparkline;
            var id = 'sparks';
            var ele;
            var rect;
            var d;
            beforeAll(function () {
                element = ej2_base_1.createElement('div', { id: id });
                element.style.width = '400px';
                element.style.height = '100px';
                document.body.appendChild(element);
                sparkline = new index_1.Sparkline({
                    height: "100px",
                    width: "170px",
                    lineWidth: 1,
                    type: "Column",
                    rangePadding: 'Normal',
                    fill: "#3C78EF",
                    valueType: "Category",
                    border: { color: "red", width: 1 },
                    dataLabelSettings: {
                        visible: ["All"]
                    },
                    dataSource: [
                        { xval: "Bob", yval: 30 },
                        { xval: "Joe", yval: 31 },
                        { xval: "Kurt", yval: 32 }
                    ],
                    tooltipSettings: {
                        visible: true,
                        format: '${xval} : ${yval}hrs'
                    },
                    xName: "xval",
                    yName: "yval"
                });
            });
            afterAll(function () {
                sparkline.destroy();
                helper_1.removeElement(id);
            });
            it('Sparkline Column with non-special point customization checking', function () {
                sparkline.loaded = function (args) {
                    args.sparkline.loaded = function () { };
                    ele = helper_1.getIdElement(id + '_sparkline_column_1');
                    rect = exports.getRect(ele);
                    expect(ele.getAttribute('fill')).toBe('#3C78EF');
                    expect(ele.getAttribute('stroke-width')).toBe('1');
                };
                sparkline.appendTo('#' + id);
            });
            it('Sparkline Column with non-special point customization checking', function () {
                sparkline.rangePadding = 'Additional';
                sparkline.loaded = function (args) {
                    args.sparkline.loaded = function () { };
                    ele = helper_1.getIdElement(id + '_sparkline_column_1');
                    rect = exports.getRect(ele);
                    expect(ele.getAttribute('fill')).toBe('#3C78EF');
                    expect(ele.getAttribute('stroke-width')).toBe('1');
                    expect(rect.x).toBe(58);
                    expect(rect.y).toBe(50);
                };
                sparkline.appendTo('#' + id);
            });
        });
        describe('Customer issue [I264262]: Column series with rangePadding', function () {
            var element;
            var sparkline;
            var id = 'container';
            var ele;
            var rect;
            beforeAll(function () {
                element = ej2_base_1.createElement('div', { id: id });
                element.style.width = '200px';
                element.style.height = '200px';
                document.body.appendChild(element);
                sparkline = new index_1.Sparkline({
                    rangePadding: "Normal",
                    height: "80px",
                    width: '150px',
                    type: "Column",
                    valueType: "Category",
                    dataLabelSettings: {
                        visible: ["All"]
                    },
                    padding: { bottom: 20, top: 20 },
                    xName: "xval",
                    yName: "yval",
                    dataSource: [
                        { xval: "number one", yval: 423 },
                        { xval: "two", yval: 380 },
                        { xval: "three", yval: 431 }
                    ],
                    axisSettings: {
                        lineSettings: { visible: true }
                    },
                    tooltipSettings: {
                        visible: true,
                    }
                });
            });
            afterAll(function () {
                sparkline.destroy();
                helper_1.removeElement(id);
            });
            it('01.Sparkline Column point with normal range padding', function () {
                sparkline.loaded = function (args) {
                    args.sparkline.loaded = function () { };
                    ele = helper_1.getIdElement(id + '_sparkline_column_0');
                    rect = exports.getRect(ele);
                    expect(rect.x === 5).toBe(true);
                    expect(rect.y === 32).toBe(true);
                    expect(rect.width === 46).toBe(true);
                    expect(rect.height === 28).toBe(true);
                    ele = helper_1.getIdElement(id + '_sparkline_column_1');
                    rect = exports.getRect(ele);
                    expect(rect.x === 52).toBe(true);
                    expect(rect.y === 50).toBe(true);
                    expect(rect.width === 45).toBe(true);
                    expect(rect.height === 10).toBe(true);
                    ele = helper_1.getIdElement(id + '_sparkline_column_2');
                    rect = exports.getRect(ele);
                    expect(rect.x === 98).toBe(true);
                    expect(rect.y === 29).toBe(true);
                    expect(rect.width === 46).toBe(true);
                    expect(rect.height === 31).toBe(true);
                };
                sparkline.appendTo('#' + id);
            });
            it('02.Sparkline Column point with additional range padding', function () {
                sparkline.loaded = function (args) {
                    args.sparkline.loaded = function () { };
                    ele = helper_1.getIdElement(id + '_sparkline_column_0');
                    rect = exports.getRect(ele);
                    expect(rect.x === 5).toBe(true);
                    expect(rect.y === 34).toBe(true);
                    expect(rect.width === 46).toBe(true);
                    expect(rect.height === 26).toBe(true);
                    ele = helper_1.getIdElement(id + '_sparkline_column_1');
                    rect = exports.getRect(ele);
                    expect(rect.x === 52).toBe(true);
                    expect(rect.y === 47).toBe(true);
                    expect(rect.width === 45).toBe(true);
                    expect(rect.height === 13).toBe(true);
                    ele = helper_1.getIdElement(id + '_sparkline_column_2');
                    rect = exports.getRect(ele);
                    expect(rect.x === 98).toBe(true);
                    expect(rect.y === 32).toBe(true);
                    expect(rect.width === 46).toBe(true);
                    expect(rect.height === 28).toBe(true);
                };
                sparkline.rangePadding = 'Additional';
                sparkline.refresh();
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
