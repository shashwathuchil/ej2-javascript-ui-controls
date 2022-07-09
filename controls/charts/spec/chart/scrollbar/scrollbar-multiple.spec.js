define(["require", "exports", "@syncfusion/ej2-base", "../../../src/chart/index", "../../../src/chart/series/line-series", "../../../src/common/scrollbar/scrollbar", "../base/events.spec", "../../common.spec"], function (require, exports, ej2_base_1, index_1, line_series_1, scrollbar_1, events_spec_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    index_1.Chart.Inject(line_series_1.LineSeries, scrollbar_1.ScrollBar, index_1.MultiLevelLabel);
    var trigger = new events_spec_1.MouseEvents();
    describe('Scrollbar Chart', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        var ele;
        describe('Multiple Scrollbar', function () {
            var chartObj;
            var loaded;
            var load;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(ele);
                chartObj = new index_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis', valueType: 'Double' },
                    primaryYAxis: { title: 'PrimaryYAxis' },
                    series: [{
                            dataSource: [{ x: 10, y: 46 }, { x: 20, y: 27 }, { x: 30, y: 26 }, { x: 40, y: 16 }, { x: 50, y: 31 }],
                            xName: 'x', yName: 'y', marker: { visible: true }, type: 'Line'
                        }],
                    title: 'Chart Title',
                    legendSettings: { visible: true },
                    width: '900',
                    zoomSettings: { enableSelectionZooming: true, enableScrollbar: true, mode: 'XY' }
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                ele.remove();
            });
            it('Checking Svg Element Y Axis', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(ele, 200, 200, 350, 350);
                    var scrollEle = document.getElementById('container_scrollBar_svgprimaryYAxis');
                    expect(scrollEle.parentElement.id == 'container_scrollElement').toBe(true);
                    expect(scrollEle != null).toBe(true);
                    expect(scrollEle.getAttribute("width") == '16').toBe(true);
                    expect(scrollEle.getAttribute("height") == '328.25' || scrollEle.getAttribute("height") == '335.25').toBe(true);
                    expect(scrollEle.style.top == '45.25px' || scrollEle.style.top == '42.25px').toBe(true);
                    expect(scrollEle.style.left == '57.5px' || scrollEle.style.left == '53.5px').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking svg element - X Axis', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(ele, 200, 200, 350, 350);
                    var scrollEle = document.getElementById('container_scrollBar_svgprimaryXAxis');
                    expect(scrollEle.parentElement.id == 'container_scrollElement').toBe(true);
                    expect(scrollEle != null).toBe(true);
                    expect(scrollEle.getAttribute("width") == '816.5' || scrollEle.getAttribute("width") == '820.5').toBe(true);
                    expect(scrollEle.getAttribute("height") == '16').toBe(true);
                    expect(scrollEle.style.top == '373.5px' || scrollEle.style.top == '377.5px').toBe(true);
                    expect(scrollEle.style.left == '73.5px' || scrollEle.style.left == '69.5px').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Mulitple Zoom In Check', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(ele, 200, 200, 350, 350);
                    trigger.draganddropEvent(ele, 200, 200, 350, 350);
                    trigger.draganddropEvent(ele, 200, 200, 350, 350);
                    trigger.draganddropEvent(ele, 200, 200, 350, 350);
                    trigger.draganddropEvent(ele, 200, 200, 350, 350);
                    var svgChildEleX = document.getElementById('container_scrollBar_svgprimaryXAxis').children[0];
                    var thumbRectEleX = svgChildEleX.children[1].children[0];
                    expect(parseInt(thumbRectEleX.getAttribute('x'), 10) === 156
                        || parseInt(thumbRectEleX.getAttribute('x'), 10) === 160
                        || parseInt(thumbRectEleX.getAttribute('x'), 10) === 161).toBe(true);
                    expect(thumbRectEleX.getAttribute('y') === '0').toBe(true);
                    expect(thumbRectEleX.getAttribute('height') === '16').toBe(true);
                    expect(thumbRectEleX.getAttribute('width') === '40').toBe(true);
                    var svgChildEleY = document.getElementById('container_scrollBar_svgprimaryYAxis').children[0];
                    var thumbRectEleY = svgChildEleY.children[1].children[0];
                    expect(thumbRectEleY.getAttribute('x') === '78.21632587911755' || thumbRectEleY.getAttribute('x') === '83.91218708436139').toBe(true);
                    expect(thumbRectEleY.getAttribute('y') === '0').toBe(true);
                    expect(thumbRectEleY.getAttribute('height') === '16').toBe(true);
                    expect(thumbRectEleY.getAttribute('width') === '40').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('With Opposed axis', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(ele, 200, 200, 350, 350);
                    var svgChildEleX = document.getElementById('container_scrollBar_svgprimaryXAxis').children[0];
                    var thumbRectEleX = svgChildEleX.children[1].children[0];
                    var xAxisThumbX = thumbRectEleX.getAttribute('x');
                    expect(parseInt(xAxisThumbX, 10) === 158 || parseInt(xAxisThumbX, 10) === 160
                        || parseInt(xAxisThumbX, 10) === 162).toBe(true);
                    expect(thumbRectEleX.getAttribute('y') === '0').toBe(true);
                    expect(thumbRectEleX.getAttribute('height') === '16').toBe(true);
                    expect(thumbRectEleX.getAttribute('width') === '40').toBe(true);
                    var svgChildEleY = document.getElementById('container_scrollBar_svgprimaryYAxis').children[0];
                    var thumbRectEleY = svgChildEleY.children[1].children[0];
                    expect(parseInt(thumbRectEleY.getAttribute('x'), 10) === 78 ||
                        parseInt(thumbRectEleY.getAttribute('x'), 10) === 84 ||
                        parseInt(thumbRectEleY.getAttribute('x'), 10) === 83).toBe(true);
                    expect(thumbRectEleY.getAttribute('y') === '0').toBe(true);
                    expect(thumbRectEleY.getAttribute('height') === '16').toBe(true);
                    expect(thumbRectEleY.getAttribute('width') === '40').toBe(true);
                    done();
                };
                chartObj.primaryXAxis.opposedPosition = true;
                chartObj.primaryYAxis.opposedPosition = true;
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
        });
        describe('Multiple Y Axis', function () {
            var chartObj;
            var loaded;
            var load;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(ele);
                chartObj = new index_1.Chart({
                    primaryXAxis: {
                        title: 'Days',
                    },
                    primaryYAxis: {
                        title: 'Temperature',
                    },
                    rows: [{ height: '30%' }, { height: '30%' }, { height: '30%' }],
                    axes: [
                        {
                            rowIndex: 1, name: 'yAxis',
                        },
                        {
                            rowIndex: 2, name: 'yAxis2',
                        }
                    ],
                    zoomSettings: {
                        enableMouseWheelZooming: true,
                        enablePinchZooming: true,
                        enableSelectionZooming: true,
                        enableScrollbar: true,
                        enableDeferredZooming: false
                    },
                    series: [{
                            type: 'Line',
                            dataSource: [{ x: 10, y: 46 }, { x: 20, y: 27 }, { x: 30, y: 26 }, { x: 40, y: 16 }, { x: 50, y: 31 }],
                            xName: 'x', yName: 'y',
                        }, {
                            type: 'Line',
                            dataSource: [{ x: 10, y: 46 }, { x: 20, y: 27 }, { x: 30, y: 26 }, { x: 40, y: 16 }, { x: 50, y: 31 }],
                            xName: 'x', yName: 'y',
                            width: 2, yAxisName: 'yAxis',
                        }, {
                            type: 'Line',
                            dataSource: [{ x: 10, y: 46 }, { x: 20, y: 27 }, { x: 30, y: 26 }, { x: 40, y: 16 }, { x: 50, y: 31 }],
                            xName: 'x', yName: 'y',
                            width: 2, yAxisName: 'yAxis2',
                        }],
                    height: '600', width: '900'
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                ele.remove();
            });
            it('Checking Svg Element Y Axis', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(ele, 200, 200, 350, 350);
                    trigger.draganddropEvent(ele, 200, 200, 350, 350);
                    var svgChildEleX = document.getElementById('container_scrollBar_svgprimaryXAxis').children[0];
                    var thumbRectEleX = svgChildEleX.children[1].children[0];
                    expect(thumbRectEleX.getAttribute('x') === '153.26636636636636' ||
                        thumbRectEleX.getAttribute('x') === '157.81739390316795').toBe(true);
                    expect(thumbRectEleX.getAttribute('y') === '0').toBe(true);
                    expect(thumbRectEleX.getAttribute('height') === '16').toBe(true);
                    expect(thumbRectEleX.getAttribute('width') === '40').toBe(true);
                    var svgChildEleY = document.getElementById('container_scrollBar_svgprimaryYAxis').children[0];
                    var thumbRectEleY = svgChildEleY.children[1].children[0];
                    expect(thumbRectEleY.getAttribute('x') === '72.89100141709966' || thumbRectEleY.getAttribute('x') === '74.29022503516174').toBe(true);
                    expect(thumbRectEleY.getAttribute('y') === '0').toBe(true);
                    expect(thumbRectEleY.getAttribute('height') === '16').toBe(true);
                    expect(thumbRectEleY.getAttribute('width') === '40').toBe(true);
                    var svg3 = document.getElementById('container_scrollBar_svgyAxis').children[0];
                    var thumbRectEle3 = svg3.children[1].children[0];
                    expect(thumbRectEle3.getAttribute('x') === '72.89100141709966' || thumbRectEle3.getAttribute('x') === '74.29022503516174').toBe(true);
                    expect(thumbRectEle3.getAttribute('y') === '0').toBe(true);
                    expect(thumbRectEle3.getAttribute('height') === '16').toBe(true);
                    expect(thumbRectEle3.getAttribute('width') === '40').toBe(true);
                    var svg4 = document.getElementById('container_scrollBar_svgyAxis2').children[0];
                    var thumbRectEle4 = svg4.children[1].children[0];
                    expect(thumbRectEle4.getAttribute('x') === '97.18800188946621' || thumbRectEle4.getAttribute('x') === '99.05363338021564').toBe(true);
                    expect(thumbRectEle4.getAttribute('y') === '0').toBe(true);
                    expect(thumbRectEle4.getAttribute('height') === '16').toBe(true);
                    expect(thumbRectEle4.getAttribute('width') === '40').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
        });
        describe('Multiple X Axis', function () {
            var chartObj;
            var loaded;
            var load;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(ele);
                chartObj = new index_1.Chart({
                    primaryXAxis: {
                        title: 'Days',
                    },
                    primaryYAxis: {
                        title: 'Temperature',
                    },
                    columns: [{ width: '30%' }, { width: '30%' }, { width: '30%' }],
                    axes: [
                        {
                            columnIndex: 1, name: 'xAxis',
                        },
                        {
                            columnIndex: 2, name: 'xAxis2',
                        }
                    ],
                    zoomSettings: {
                        enableMouseWheelZooming: true,
                        enablePinchZooming: true,
                        enableSelectionZooming: true,
                        enableScrollbar: true,
                        enableDeferredZooming: false
                    },
                    series: [{
                            type: 'Line',
                            dataSource: [{ x: 10, y: 46 }, { x: 20, y: 27 }, { x: 30, y: 26 }, { x: 40, y: 16 }, { x: 50, y: 31 }],
                            xName: 'x', yName: 'y',
                        }, {
                            type: 'Line',
                            dataSource: [{ x: 10, y: 46 }, { x: 20, y: 27 }, { x: 30, y: 26 }, { x: 40, y: 16 }, { x: 50, y: 31 }],
                            xName: 'x', yName: 'y',
                            width: 2, xAxisName: 'xAxis',
                        }, {
                            type: 'Line',
                            dataSource: [{ x: 10, y: 46 }, { x: 20, y: 27 }, { x: 30, y: 26 }, { x: 40, y: 16 }, { x: 50, y: 31 }],
                            xName: 'x', yName: 'y',
                            width: 2, xAxisName: 'xAxis2',
                        }],
                    height: '600', width: '900'
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                ele.remove();
            });
            it('Checking Svg Element X Axis', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(ele, 200, 200, 350, 350);
                    trigger.draganddropEvent(ele, 200, 200, 350, 350);
                    var svgChildEleX = document.getElementById('container_scrollBar_svgprimaryXAxis').children[0];
                    var thumbRectEleX = svgChildEleX.children[1].children[0];
                    expect(thumbRectEleX.getAttribute('x') === '45.47308910257471' ||
                        thumbRectEleX.getAttribute('x') === '46.82589219466939').toBe(true);
                    expect(thumbRectEleX.getAttribute('y') === '0').toBe(true);
                    expect(thumbRectEleX.getAttribute('height') === '16').toBe(true);
                    expect(thumbRectEleX.getAttribute('width') === '40').toBe(true);
                    var svgChildEleY = document.getElementById('container_scrollBar_svgprimaryYAxis').children[0];
                    var thumbRectEleY = svgChildEleY.children[1].children[0];
                    expect(thumbRectEleY.getAttribute('x') === '242.97000472366554' || thumbRectEleY.getAttribute('x') === '247.63408345053912').toBe(true);
                    expect(thumbRectEleY.getAttribute('y') === '0').toBe(true);
                    expect(thumbRectEleY.getAttribute('height') === '16').toBe(true);
                    expect(thumbRectEleY.getAttribute('width') === '42.51299008030231' ||
                        thumbRectEleY.getAttribute('width') === '42.19409282700422').toBe(true);
                    var svg3 = document.getElementById('container_scrollBar_svgxAxis').children[0];
                    var thumbRectEle3 = svg3.children[1].children[0];
                    expect(thumbRectEle3.getAttribute('x') === '45.47308910257471' || thumbRectEle3.getAttribute('x') === '46.82589219466939').toBe(true);
                    expect(thumbRectEle3.getAttribute('y') === '0').toBe(true);
                    expect(thumbRectEle3.getAttribute('height') === '16').toBe(true);
                    expect(thumbRectEle3.getAttribute('width') === '40').toBe(true);
                    var svg4 = document.getElementById('container_scrollBar_svgxAxis2').children[0];
                    var thumbRectEle4 = svg4.children[1].children[0];
                    expect(thumbRectEle4.getAttribute('x') === '60.63078547009961' || thumbRectEle4.getAttribute('x') === '62.43452292622585').toBe(true);
                    expect(thumbRectEle4.getAttribute('y') === '0').toBe(true);
                    expect(thumbRectEle4.getAttribute('height') === '16').toBe(true);
                    expect(thumbRectEle4.getAttribute('width') === '40').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
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
