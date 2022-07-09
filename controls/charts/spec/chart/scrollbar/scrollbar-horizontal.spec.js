define(["require", "exports", "@syncfusion/ej2-base", "../../../src/chart/index", "../../../src/chart/series/line-series", "../../../src/common/scrollbar/scrollbar", "../base/events.spec", "../../common.spec"], function (require, exports, ej2_base_1, index_1, line_series_1, scrollbar_1, events_spec_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    index_1.Chart.Inject(line_series_1.LineSeries, scrollbar_1.ScrollBar, index_1.MultiLevelLabel, index_1.Crosshair, index_1.DateTime, index_1.Zoom);
    var prevent = function () {
    };
    var trigger = new events_spec_1.MouseEvents();
    describe('Scrollbar Chart ', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        var ele;
        describe('Horizontal Scrollbar Default', function () {
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
                    zoomSettings: { enableSelectionZooming: true, enableScrollbar: true, mode: 'X' }
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                ele.remove();
            });
            it('Checking module name', function () {
                expect(chartObj.axisCollections[0].zoomingScrollBar.getModuleName()).toBe('ScrollBar');
            });
            it('Checking svg element', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(ele, 200, 200, 350, 350);
                    var scrollEle = document.getElementById('container_scrollBar_svgprimaryXAxis');
                    expect(scrollEle.parentElement.id == 'container_scrollElement').toBe(true);
                    expect(scrollEle != null).toBe(true);
                    var width = scrollEle.getAttribute("width");
                    expect(width == '832.5' || width == '836.5').toBe(true);
                    expect(scrollEle.getAttribute("height") == '16').toBe(true);
                    expect(scrollEle.style.top == '373.5px' || scrollEle.style.top == '377.5px').toBe(true);
                    expect(scrollEle.style.left == '57.5px' || scrollEle.style.left == '53.5px').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Child Element Count of SVG', function () {
                var svgChildEle = document.getElementById('container_scrollBar_svgprimaryXAxis').children[0];
                expect(svgChildEle).not.toBeNull();
                expect(svgChildEle.childElementCount).toBe(2);
                expect(svgChildEle.children[0].childElementCount).toBe(1);
                expect(svgChildEle.children[1].childElementCount).toBe(8);
            });
            it('Back Rect Element check', function () {
                var svgChildEle = document.getElementById('container_scrollBar_svgprimaryXAxis').children[0];
                var backRectEle = svgChildEle.children[0].children[0];
                var width = backRectEle.getAttribute('width');
                expect(svgChildEle.id === 'container_scrollBar_primaryXAxis').toBe(true);
                expect(svgChildEle.getAttribute('transform') === 'translate(0,0) rotate(0)').toBe(true);
                expect(backRectEle.getAttribute('x') === '0').toBe(true);
                expect(backRectEle.getAttribute('y') === '0').toBe(true);
                expect(backRectEle.getAttribute('height') === '16').toBe(true);
                expect(width === '832.5' || width === '836.5').toBe(true);
                expect(backRectEle.getAttribute('rx') === '0').toBe(true);
                expect(backRectEle.id === 'container_scrollBarBackRect_primaryXAxis').toBe(true);
            });
            it('Thumb Rect Element check', function () {
                var svgChildEle = document.getElementById('container_scrollBar_svgprimaryXAxis').children[0];
                var thumbRectEle = svgChildEle.children[1].children[0];
                var x = thumbRectEle.getAttribute('x');
                expect(x === '134.5' || x === '138.5').toBe(true);
                expect(thumbRectEle.getAttribute('y') === '0').toBe(true);
                expect(thumbRectEle.getAttribute('height') === '16').toBe(true);
                expect(thumbRectEle.getAttribute('width') === '150').toBe(true);
                expect(thumbRectEle.id === 'container_scrollBarThumb_primaryXAxis').toBe(true);
            });
            it('Left Circle Element check', function () {
                var svgChildEle = document.getElementById('container_scrollBar_svgprimaryXAxis').children[0];
                var leftCircle = svgChildEle.children[1].children[2];
                expect(leftCircle.getAttribute('cy') === '8').toBe(true);
                expect(leftCircle.getAttribute('r') === '8').toBe(true);
                expect(leftCircle.id === 'container_scrollBar_leftCircle_primaryXAxis').toBe(true);
            });
            it('Right Circle Element check', function () {
                var svgChildEle = document.getElementById('container_scrollBar_svgprimaryXAxis').children[0];
                var rightCircle = svgChildEle.children[1].children[3];
                var cx = rightCircle.getAttribute('cx');
                expect(cx === '284.5' || cx === '288.5').toBe(true);
                expect(rightCircle.getAttribute('cy') === '8').toBe(true);
                expect(rightCircle.getAttribute('r') === '8').toBe(true);
                expect(rightCircle.id === 'container_scrollBar_rightCircle_primaryXAxis').toBe(true);
            });
            it('Left Arrow Element check', function () {
                var svgChildEle = document.getElementById('container_scrollBar_svgprimaryXAxis').children[0];
                var leftArrow = svgChildEle.children[1].children[5];
                var d = leftArrow.getAttribute('d');
                expect(d === 'M 130.5 8 L 136.5 12 L 136.5 4 Z' || d === 'M 134.5 8 L 140.5 12 L 140.5 4 Z'
                    || d === 'M 131.5 8 L 136.5 11 L 136.5 5 Z' || d === 'M 135.5 8 L 140.5 11 L 140.5 5 Z').toBe(true);
                expect(leftArrow.id === 'container_scrollBar_leftArrow_primaryXAxis').toBe(true);
            });
            it('Right Arrow Element check', function () {
                var svgChildEle = document.getElementById('container_scrollBar_svgprimaryXAxis').children[0];
                var rightArrow = svgChildEle.children[1].children[6];
                var d = rightArrow.getAttribute('d');
                expect(d === 'M 288.5 8 L 282.5 12 L 282.5 4 Z' || d === 'M 292.5 8 L 286.5 12 L 286.5 4 Z' ||
                    d === 'M 288 8 L 282.5 11.5 L 282.5 4.5 Z' || d === 'M 292 8 L 286.5 11.5 L 286.5 4.5 Z').toBe(true);
                expect(rightArrow.id === 'container_scrollBar_rightArrow_primaryXAxis').toBe(true);
            });
            it('1st Grip Circle Element check', function () {
                var gripCircle = document.getElementById('container_scrollBar_gripCircle1_primaryXAxis');
                var cx = gripCircle.getAttribute('cx');
                expect(cx === '0').toBe(true);
                expect(gripCircle.getAttribute('cy') === '0').toBe(true);
                expect(gripCircle.getAttribute('r') === '1').toBe(true);
            });
            it('2nd Grip Circle Element check', function () {
                var gripCircle = document.getElementById('container_scrollBar_gripCircle2_primaryXAxis');
                var cx = gripCircle.getAttribute('cx');
                expect(cx === '5').toBe(true);
                expect(gripCircle.getAttribute('cy') === '0').toBe(true);
                expect(gripCircle.getAttribute('r') === '1').toBe(true);
            });
            it('3rd Grip Circle Element check', function () {
                var gripCircle = document.getElementById('container_scrollBar_gripCircle3_primaryXAxis');
                var cx = gripCircle.getAttribute('cx');
                expect(cx === '10').toBe(true);
                expect(gripCircle.getAttribute('cy') === '0').toBe(true);
                expect(gripCircle.getAttribute('r') === '1').toBe(true);
            });
            it('4th Grip Circle Element check', function () {
                var gripCircle = document.getElementById('container_scrollBar_gripCircle4_primaryXAxis');
                var cx = gripCircle.getAttribute('cx');
                expect(cx === '0').toBe(true);
                expect(gripCircle.getAttribute('cy') === '5').toBe(true);
                expect(gripCircle.getAttribute('r') === '1').toBe(true);
            });
            it('5th Grip Circle Element check', function () {
                var gripCircle = document.getElementById('container_scrollBar_gripCircle5_primaryXAxis');
                var cx = gripCircle.getAttribute('cx');
                expect(cx === '5').toBe(true);
                expect(gripCircle.getAttribute('cy') === '5').toBe(true);
                expect(gripCircle.getAttribute('r') === '1').toBe(true);
            });
            it('6th Grip Circle Element check', function () {
                var gripCircle = document.getElementById('container_scrollBar_gripCircle6_primaryXAxis');
                var cx = gripCircle.getAttribute('cx');
                expect(cx === '10').toBe(true);
                expect(gripCircle.getAttribute('cy') === '5').toBe(true);
                expect(gripCircle.getAttribute('r') === '1').toBe(true);
            });
            it('Grip Circle Group Element', function () {
                var gripGroup = document.getElementById('container_scrollBar_gripCircle_primaryXAxis');
                var transform = gripGroup.getAttribute('transform');
                expect(transform === 'translate(204.5,5) rotate(0)' || transform === 'translate(213.5,6) rotate(0)'
                    || transform === 'translate(208.5,5) rotate(0)').toBe(true);
            });
            it('Chart Element with Scrollbar', function () {
                var chartAreaHt = document.getElementById('container_ChartAreaBorder').getAttribute('height');
                var majorTick = document.getElementById('container_MajorTickLine_0_0').getAttribute('d').split('M ')[1];
                var xAxisLabel = document.getElementById('container0_AxisLabel_0');
                var xAxisTitle = document.getElementById('container_AxisTitle_0');
                var x = xAxisLabel.getAttribute('x');
                var y = xAxisLabel.getAttribute('y');
                var titleX = xAxisTitle.getAttribute('x');
                var titleY = xAxisTitle.getAttribute('y');
                expect(chartAreaHt === '328.25' || chartAreaHt === '335.25').toBe(true);
                expect(majorTick === '119.59062500000013 374 L 119.59062500000013 395' || majorTick === '97.4859583333334 378 L 97.4859583333334 399').toBe(true);
                expect(x === '113.09062500000013' || x === '91.4859583333334').toBe(true);
                expect(y === '412' || y === '415.25').toBe(true);
                expect(xAxisLabel.innerHTML === '17').toBe(true);
                expect(titleX === '473.75' || titleX === '471.75').toBe(true);
                expect(titleY === '434.75' || titleY === '435.5').toBe(true);
            });
        });
        describe('Horizontal Scrollbar with Labels, Ticks and Border ', function () {
            var chartObj;
            var loaded;
            var load;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(ele);
                chartObj = new index_1.Chart({
                    primaryXAxis: {
                        title: 'PrimaryXAxis', valueType: 'Double', labelPosition: 'Inside',
                        tickPosition: 'Inside'
                    },
                    primaryYAxis: { title: 'PrimaryYAxis' },
                    series: [{
                            dataSource: [{ x: 10, y: 46 }, { x: 20, y: 27 }, { x: 30, y: 26 }, { x: 40, y: 16 }, { x: 50, y: 31 }],
                            xName: 'x', yName: 'y', marker: { visible: true }, type: 'Line'
                        }],
                    title: 'Chart Title',
                    legendSettings: { visible: true },
                    width: '900',
                    zoomSettings: { enableSelectionZooming: true, enableScrollbar: true, mode: 'X' }
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                ele.remove();
            });
            it('Scrollbar position', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(ele, 200, 250, 350, 400);
                    var scrollEle = document.getElementById('container_scrollBar_svgprimaryXAxis');
                    expect(scrollEle.parentElement.id == 'container_scrollElement').toBe(true);
                    expect(scrollEle != null).toBe(true);
                    var width = scrollEle.getAttribute('width');
                    expect(width == '832.5' || width === '836.5').toBe(true);
                    expect(scrollEle.getAttribute('height') == '16').toBe(true);
                    expect(scrollEle.style.top == '404.5px' || scrollEle.style.top == '407.5px').toBe(true);
                    expect(scrollEle.style.left == '57.5px' || scrollEle.style.left == '53.5px').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Ticks and Labels Position Check', function (done) {
                var chartAreaHt = document.getElementById('container_ChartAreaBorder').getAttribute('height');
                var majorTick = document.getElementById('container_MajorTickLine_0_0').getAttribute('d').split('M ')[1];
                var xAxisLabel = document.getElementById('container0_AxisLabel_0');
                var xAxisTitle = document.getElementById('container_AxisTitle_0');
                var labelX = xAxisLabel.getAttribute('x');
                var labelY = xAxisLabel.getAttribute('y');
                var titleX = xAxisTitle.getAttribute('x');
                var titleY = xAxisTitle.getAttribute('y');
                expect(chartAreaHt === '359.25' || chartAreaHt === '365.25').toBe(true);
                expect(majorTick === '119.59062500000013 421 L 119.59062500000013 399' || majorTick === '97.4859583333334 424 L 97.4859583333334 402').toBe(true);
                expect(labelX === '113.09062500000013' || labelX === '91.4859583333334').toBe(true);
                expect(labelY === '394' || labelY === '397').toBe(true);
                expect(xAxisLabel.innerHTML === '17').toBe(true);
                expect(titleX === '473.75' || titleX === '471.75').toBe(true);
                expect(titleY === '434.75' || titleY === '435.5').toBe(true);
                done();
            });
            it('X Axis Labels Border Outside', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(ele, 200, 250, 350, 400);
                    var border = document.getElementById('container_BorderLine_0').getAttribute('d').split("M  ")[1];
                    expect(border === '57.5 389.5L 890 389.5' || border === '53.5 393.5L 890 393.5').toBe(true);
                    done();
                };
                chartObj.primaryXAxis.labelPosition = 'Outside';
                chartObj.primaryXAxis.tickPosition = 'Outside';
                chartObj.primaryXAxis.border.width = 1;
                chartObj.primaryXAxis.border.color = 'Red';
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('X Axis Labels Border Inside', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(ele, 200, 250, 350, 400);
                    var border = document.getElementById('container_BorderLine_0').getAttribute('d').split("M  ")[1];
                    expect(border === '57.5 404.5L 890 404.5' || border === '53.5 407.5L 890 407.5').toBe(true);
                    done();
                };
                chartObj.primaryXAxis.labelPosition = 'Inside';
                chartObj.primaryXAxis.tickPosition = 'Inside';
                chartObj.primaryXAxis.border.width = 1;
                chartObj.primaryXAxis.border.color = 'Red';
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
        });
        describe('Axis Crossing', function () {
            var chartObj;
            var loaded;
            var load;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(ele);
                chartObj = new index_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis', valueType: 'Double', crossesAt: 25 },
                    primaryYAxis: { title: 'PrimaryYAxis' },
                    series: [{
                            dataSource: [{ x: 10, y: 46 }, { x: 20, y: 27 }, { x: 30, y: 26 }, { x: 40, y: 16 }, { x: 50, y: 31 }],
                            xName: 'x', yName: 'y', marker: { visible: true }, type: 'Line'
                        }],
                    title: 'Chart Title',
                    legendSettings: { visible: true },
                    width: '900',
                    zoomSettings: { enableSelectionZooming: true, enableScrollbar: true, mode: 'X' }
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                ele.remove();
            });
            it('Scrollbar position', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(ele, 200, 250, 350, 400);
                    var scrollEle = document.getElementById('container_scrollBar_svgprimaryXAxis');
                    expect(scrollEle.parentElement.id == 'container_scrollElement').toBe(true);
                    expect(scrollEle != null).toBe(true);
                    var width = scrollEle.getAttribute('width');
                    expect(width == '832.5' || width === '836.5').toBe(true);
                    expect(scrollEle.getAttribute('height') == '16').toBe(true);
                    expect(scrollEle.style.top == '433.5px').toBe(true);
                    expect(scrollEle.style.left == '57.5px' || scrollEle.style.left == '53.5px').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Ticks and Labels Position Check', function (done) {
                var chartAreaHt = document.getElementById('container_ChartAreaBorder').getAttribute('height');
                var majorTick = document.getElementById('container_MajorTickLine_0_0').getAttribute('d').split('M ')[1];
                var xAxisLabel = document.getElementById('container0_AxisLabel_0');
                var xAxisTitle = document.getElementById('container_AxisTitle_0');
                expect(chartAreaHt === '388.25' || chartAreaHt === '391.25').toBe(true);
                expect(majorTick === '119.59062500000013 239.875 L 119.59062500000013 244.875' ||
                    majorTick === '97.4859583333334 238.375 L 97.4859583333334 243.375').toBe(true);
                expect(xAxisLabel.getAttribute('x') === '113.09062500000013' || xAxisLabel.getAttribute('x') === '91.4859583333334').toBe(true);
                expect(xAxisLabel.getAttribute('y') === '261.875' || xAxisLabel.getAttribute('y') === '259.625').toBe(true);
                expect(xAxisLabel.innerHTML === '17').toBe(true);
                expect(xAxisTitle.getAttribute('x') === '473.75' || xAxisTitle.getAttribute('x') === '471.75').toBe(true);
                expect(xAxisTitle.getAttribute('y') === '284.625' || xAxisTitle.getAttribute('y') === '279.875').toBe(true);
                done();
            });
        });
        describe('Multilevel Labels', function () {
            var chartObj;
            var loaded;
            var load;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(ele);
                chartObj = new index_1.Chart({
                    primaryXAxis: {
                        title: 'PrimaryXAxis', valueType: 'Double',
                        multiLevelLabels: [{
                                border: { type: 'Rectangle' },
                                categories: [{ start: 15, end: 25, text: 'Label 1', }, { start: 25, end: 40, text: 'Label 2', }]
                            }]
                    },
                    primaryYAxis: { title: 'PrimaryYAxis' },
                    series: [{
                            dataSource: [{ x: 10, y: 46 }, { x: 20, y: 27 }, { x: 30, y: 26 }, { x: 40, y: 16 }, { x: 50, y: 31 }],
                            xName: 'x', yName: 'y', marker: { visible: true }, type: 'Line'
                        }],
                    title: 'Chart Title', legendSettings: { visible: true }, width: '900',
                    zoomSettings: { enableSelectionZooming: true, enableScrollbar: true, mode: 'X' }
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                ele.remove();
            });
            it('Label and Border Position - Inside', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(ele, 150, 150, 400, 400);
                    var mulitiLevelLabel = document.getElementById('container0_Axis_MultiLevelLabel_Level_0_Text_0');
                    var border = document.getElementById('container0_Axis_MultiLevelLabel_Rect_0_0').getAttribute('d').split('M')[1];
                    var x = mulitiLevelLabel.getAttribute('x');
                    var y = mulitiLevelLabel.getAttribute('y');
                    expect(x === '469.17125000000004' || x === '457.1112499999999').toBe(true);
                    expect(y === '405.5' || y === '409').toBe(true);
                    expect(border === ' 122.643125 387.5 L 122.643125 415.5 ' || border === ' 107.24512499999994 391.5 L 107.24512499999994 418.5 ').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Label and Border Position - Outside', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    var mulitiLevelLabel = document.getElementById('container0_Axis_MultiLevelLabel_Level_0_Text_0');
                    var border = document.getElementById('container0_Axis_MultiLevelLabel_Rect_0_0').getAttribute('d').split('M')[1];
                    var x = mulitiLevelLabel.getAttribute('x');
                    var y = mulitiLevelLabel.getAttribute('y');
                    expect(x === '469.17125000000004' || x === '457.1112499999999').toBe(true);
                    expect(y === '379.5' || y === '384').toBe(true);
                    expect(border === ' 122.643125 389.5 L 122.643125 361.5 ' || border === ' 107.24512499999994 393.5 L 107.24512499999994 366.5 ').toBe(true);
                    done();
                };
                chartObj.primaryXAxis.labelPosition = 'Inside';
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
        });
        describe('Date Time Axis', function () {
            var chartObj;
            var loaded;
            var load;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(ele);
                chartObj = new index_1.Chart({
                    primaryXAxis: {
                        valueType: 'DateTime',
                    },
                    series: [
                        {
                            type: 'Line',
                            dataSource: [
                                { x: new Date(2016, 3, 1), y: 6.3 },
                                { x: new Date(2016, 4, 1), y: 13.3 }, { x: new Date(2016, 5, 1), y: 18.0 },
                                { x: new Date(2016, 6, 1), y: 19.8 }, { x: new Date(2016, 7, 1), y: 18.1 },
                                { x: new Date(2016, 8, 1), y: 13.1 }, { x: new Date(2016, 9, 1), y: 4.1 }
                            ],
                            xName: 'x',
                            yName: 'y',
                        }
                    ],
                    width: '900',
                    zoomSettings: { enableSelectionZooming: true, enableScrollbar: true, mode: 'X' }
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                ele.remove();
            });
            it('Element Position Check', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(ele, 200, 200, 350, 350);
                    var scrollEle = document.getElementById('container_scrollBar_svgprimaryXAxis');
                    var thumbEle = document.getElementById('container_scrollBarThumb_primaryXAxis');
                    var thumbX = thumbEle.getAttribute('x');
                    expect(thumbX === '158.5' || thumbX === '159.5').toBe(true);
                    expect(thumbEle.getAttribute('width') === '150').toBe(true);
                    expect(scrollEle.parentElement.id == 'container_scrollElement').toBe(true);
                    expect(scrollEle != null).toBe(true);
                    expect(scrollEle.getAttribute("width") == '856.5' || scrollEle.getAttribute("width") == '857.5').toBe(true);
                    expect(scrollEle.getAttribute("height") == '16').toBe(true);
                    expect(scrollEle.style.top == '397.5px' || scrollEle.style.top == '398.5px').toBe(true);
                    expect(scrollEle.style.left == '33.5px' || scrollEle.style.left == '32.5px').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
        });
        describe('Crosshair', function () {
            var chartObj;
            var loaded;
            var load;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(ele);
                chartObj = new index_1.Chart({
                    primaryXAxis: {
                        title: 'PrimaryXAxis', valueType: 'Double',
                        crosshairTooltip: { enable: true }
                    },
                    crosshair: { enable: true },
                    primaryYAxis: { title: 'PrimaryYAxis' },
                    series: [{
                            dataSource: [{ x: 10, y: 46 }, { x: 20, y: 27 }, { x: 30, y: 26 }, { x: 40, y: 16 }, { x: 50, y: 31 }],
                            xName: 'x', yName: 'y', marker: { visible: true }, type: 'Line'
                        }],
                    title: 'Chart Title', legendSettings: { visible: true }, width: '900',
                    zoomSettings: { enableSelectionZooming: true, enableScrollbar: true, mode: 'X' }
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                ele.remove();
            });
            it('Crosshair Label', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(ele, 150, 150, 400, 400);
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = parseFloat(chartArea.getAttribute('y')) + parseFloat(chartArea.getAttribute('height')) / 2 + ele.offsetTop;
                    var x = parseFloat(chartArea.getAttribute('x')) + parseFloat(chartArea.getAttribute('width')) / 2 + ele.offsetLeft;
                    trigger.mousemovetEvent(chartArea, Math.ceil(x), Math.ceil(y));
                    var crossHairEle = document.getElementById('container_axis_tooltip_0').getAttribute('d').split(' L')[0];
                    expect(crossHairEle === 'M 450 400.5 Q 450 398.5 452 398.5' || crossHairEle === 'M 449 404.5 Q 449 402.5 451 402.5').toBe(true);
                    var text = document.getElementById('container_axis_tooltip_text_0').innerHTML;
                    expect(text === '20.070' || text === '20.213').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
        });
        describe('Scrollbar User Interaction', function () {
            var chartObj;
            var loaded;
            var load;
            var wheelArgs;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(ele);
                chartObj = new index_1.Chart({
                    primaryXAxis: {
                        title: 'PrimaryXAxis', valueType: 'Double',
                    },
                    primaryYAxis: { title: 'PrimaryYAxis' },
                    series: [{
                            dataSource: [{ x: 10, y: 46 }, { x: 20, y: 27 }, { x: 30, y: 26 }, { x: 40, y: 16 }, { x: 50, y: 31 }],
                            xName: 'x', yName: 'y', marker: { visible: true }, type: 'Line'
                        }],
                    theme: 'Bootstrap',
                    title: 'Chart Title', legendSettings: { visible: true }, width: '900',
                    zoomSettings: { enableSelectionZooming: true, enableScrollbar: true, mode: 'X' }
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                ele.remove();
            });
            it('Mouse Move with Thumb', function (done) {
                trigger.draganddropEvent(ele, 150, 150, 400, 400);
                var currentTarget = document.getElementById('container_scrollBarThumb_primaryXAxis');
                chartObj.axisCollections[0].zoomingScrollBar.scrollMouseDown((trigger.onTouchStart(currentTarget, 0, 0, 0, 0, 300, 390)));
                chartObj.axisCollections[0].zoomingScrollBar.scrollMouseMove((trigger.onTouchMove(currentTarget, 0, 0, 0, 0, 450, 390)));
                var thumbEle = document.getElementById('container_scrollBarThumb_primaryXAxis');
                expect(thumbEle.getAttribute('x') === '234.5' || thumbEle.getAttribute('x') === '238.5').toBe(true);
                expect(thumbEle.getAttribute('width') === '250' || thumbEle.getAttribute('width') === '250.00000000000003').toBe(true);
                chartObj.axisCollections[0].zoomingScrollBar.scrollMouseUp();
                done();
            });
            it('Right Resize using Circle', function (done) {
                var currentTarget = document.getElementById('container_scrollBar_rightCircle_primaryXAxis');
                chartObj.axisCollections[0].zoomingScrollBar.scrollMouseDown((trigger.onTouchStart(currentTarget, 0, 0, 0, 0, 550, 390, true)));
                chartObj.axisCollections[0].zoomingScrollBar.scrollMouseMove((trigger.onTouchMove(currentTarget, 0, 0, 0, 0, 650, 390)));
                var thumbEle = document.getElementById('container_scrollBarThumb_primaryXAxis');
                var thumbX = (parseFloat(thumbEle.getAttribute('x')).toFixed(1)).toString();
                var thumbWidth = Math.round((parseFloat(thumbEle.getAttribute('width')))).toLocaleString();
                expect(thumbX === '234.5' || thumbX === '238.5').toBe(true);
                expect(thumbWidth === '350').toBe(true);
                chartObj.axisCollections[0].zoomingScrollBar.scrollMouseMove((trigger.onTouchMove(currentTarget, 0, 0, 0, 0, 450, 390)));
                thumbX = (parseFloat(thumbEle.getAttribute('x')).toFixed(1)).toString();
                thumbWidth = Math.round((parseFloat(thumbEle.getAttribute('width')))).toLocaleString();
                expect(thumbX === '234.5' || thumbX === '238.5').toBe(true);
                expect(thumbWidth === '150').toBe(true);
                chartObj.axisCollections[0].zoomingScrollBar.scrollMouseUp();
                done();
            });
            it('Left Resize using Circle', function (done) {
                var currentTarget = document.getElementById('container_scrollBar_leftCircle_primaryXAxis');
                chartObj.axisCollections[0].zoomingScrollBar.scrollMouseDown((trigger.onTouchStart(currentTarget, 0, 0, 0, 0, 300, 390)));
                chartObj.axisCollections[0].zoomingScrollBar.scrollMouseMove((trigger.onTouchMove(currentTarget, 0, 0, 0, 0, 120, 390)));
                var thumbEle = document.getElementById('container_scrollBarThumb_primaryXAxis');
                var thumbX = (parseFloat(thumbEle.getAttribute('x')).toFixed(1)).toString();
                var thumbWidth = Math.round((parseFloat(thumbEle.getAttribute('width')))).toLocaleString();
                expect(thumbX === '54.5' || thumbX === '58.5').toBe(true);
                expect(thumbWidth === '330').toBe(true);
                chartObj.axisCollections[0].zoomingScrollBar.scrollMouseMove((trigger.onTouchMove(currentTarget, 0, 0, 0, 0, 250, 390)));
                thumbX = (parseFloat(thumbEle.getAttribute('x')).toFixed(1)).toString();
                thumbWidth = Math.round((parseFloat(thumbEle.getAttribute('width')))).toLocaleString();
                expect(thumbX === '184.5' || thumbX === '188.5').toBe(true);
                expect(thumbWidth === '200').toBe(true);
                done();
            });
            it('Checking mouse wheel as forward ', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(ele, 150, 150, 400, 400);
                    wheelArgs = {
                        preventDefault: prevent,
                        wheelDelta: 120,
                        detail: 0,
                        clientX: 210,
                        clientY: 100
                    };
                    chartObj.axisCollections[0].zoomingScrollBar.scrollMouseWheel(wheelArgs);
                    var thumbEle = document.getElementById('container_scrollBarThumb_primaryXAxis');
                    var thumbX = (parseFloat(thumbEle.getAttribute('x')).toFixed(2)).toString();
                    var thumbWidth = Math.round((parseFloat(thumbEle.getAttribute('width')))).toLocaleString();
                    expect(thumbX === '204.98' || thumbX === '209.85').toBe(true);
                    expect(thumbWidth === '60' || thumbWidth === '60').toBe(true);
                    done();
                };
                chartObj.zoomSettings.enableMouseWheelZooming = true;
                chartObj.loaded = loaded;
                chartObj.theme = 'Fabric';
                chartObj.refresh();
            });
            it('Checking mouse wheel as backward ', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(ele, 150, 150, 400, 400);
                    chartObj.axisCollections[0].zoomingScrollBar.isPointer = false;
                    chartObj.axisCollections[0].zoomingScrollBar.browserName = 'mozilla';
                    wheelArgs = {
                        preventDefault: prevent,
                        wheelDelta: -120,
                        detail: 3,
                        clientX: 310,
                        clientY: 100
                    };
                    chartObj.axisCollections[0].zoomingScrollBar.scrollMouseWheel(wheelArgs);
                    var thumbEle = document.getElementById('container_scrollBarThumb_primaryXAxis');
                    var thumbX = (parseFloat(thumbEle.getAttribute('x')).toFixed(2)).toString();
                    var thumbWidth = Math.round((parseFloat(thumbEle.getAttribute('width')))).toLocaleString();
                    expect(thumbX === '210.95' || thumbX === '216.03').toBe(true);
                    expect(thumbWidth === '40').toBe(true);
                    done();
                };
                chartObj.theme = 'HighContrastLight';
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Mouse wheel with detial argument negative  ', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(ele, 150, 150, 400, 400);
                    chartObj.axisCollections[0].zoomingScrollBar.isPointer = false;
                    chartObj.axisCollections[0].zoomingScrollBar.browserName = 'mozilla';
                    wheelArgs = {
                        preventDefault: prevent,
                        wheelDelta: -120,
                        detail: -3,
                        clientX: 310,
                        clientY: 100
                    };
                    chartObj.axisCollections[0].zoomingScrollBar.scrollMouseWheel(wheelArgs);
                    var thumbEle = document.getElementById('container_scrollBarThumb_primaryXAxis');
                    var thumbX = (parseFloat(thumbEle.getAttribute('x')).toFixed(2)).toString();
                    var thumbWidth = Math.round((parseFloat(thumbEle.getAttribute('width')))).toLocaleString();
                    expect(thumbX === '212.76' || thumbX === '217.90').toBe(true);
                    expect(thumbWidth === '40').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Mouse Down on Back Rect - Right Side Click', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(ele, 150, 150, 400, 400);
                    var currentTarget = document.getElementById('container_scrollBarBackRect_primaryXAxis');
                    chartObj.axisCollections[0].zoomingScrollBar.animateDuration = 0;
                    chartObj.axisCollections[0].zoomingScrollBar.scrollMouseDown((trigger.onTouchStart(currentTarget, 0, 0, 0, 0, 500, 390)));
                    var thumbEle = document.getElementById('container_scrollBarThumb_primaryXAxis');
                    expect(thumbEle.getAttribute('x') === '166.15' || thumbEle.getAttribute('x') === '170.55').toBe(true);
                    expect(thumbEle.getAttribute('width') === '250' || thumbEle.getAttribute('width') === '250.00000000000003').toBe(true);
                    done();
                };
                chartObj.primaryXAxis.zoomFactor = 1;
                chartObj.primaryXAxis.zoomPosition = 0;
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Mouse Down on Back Rect - Left side Click', function (done) {
                var currentTarget = document.getElementById('container_scrollBarBackRect_primaryXAxis');
                chartObj.axisCollections[0].zoomingScrollBar.animateDuration = 0;
                chartObj.axisCollections[0].zoomingScrollBar.scrollMouseDown((trigger.onTouchStart(currentTarget, 0, 0, 0, 0, 140, 390)));
                var thumbEle = document.getElementById('container_scrollBarThumb_primaryXAxis');
                expect(thumbEle.getAttribute('x') === '84.5' || thumbEle.getAttribute('x') === '88.5').toBe(true);
                expect(thumbEle.getAttribute('width') === '250' || thumbEle.getAttribute('width') === '250.00000000000003').toBe(true);
                done();
            });
            it('Mouse Down on Back Rect - X position less than svg x value', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(ele, 75, 150, 400, 400);
                    var currentTarget = document.getElementById('container_scrollBarBackRect_primaryXAxis');
                    var thumbEle = document.getElementById('container_scrollBarThumb_primaryXAxis');
                    var circleRadius = 8;
                    chartObj.axisCollections[0].zoomingScrollBar.animateDuration = 0;
                    chartObj.axisCollections[0].zoomingScrollBar.scrollMouseDown((trigger.onTouchStart(currentTarget, 0, 0, 0, 0, chartObj.axisCollections[0].rect.x - circleRadius, 390)));
                    expect(thumbEle.getAttribute('x') === '9.5' || thumbEle.getAttribute('x') === '13.5').toBe(true);
                    expect(thumbEle.getAttribute('width') === '325').toBe(true);
                    done();
                };
                chartObj.primaryXAxis.zoomFactor = 1;
                chartObj.primaryXAxis.zoomPosition = 0;
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking mouse x value on scroll width', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(ele, 150, 150, 880, 400);
                    var currentTarget = document.getElementById('container_scrollBarBackRect_primaryXAxis');
                    chartObj.axisCollections[0].zoomingScrollBar.animateDuration = 0;
                    chartObj.axisCollections[0].zoomingScrollBar.scrollMouseDown((trigger.onTouchStart(currentTarget, 0, 0, 0, 0, 890, 390)));
                    var thumbEle = document.getElementById('container_scrollBarThumb_primaryXAxis');
                    expect(thumbEle.getAttribute('x') === '92.5' || thumbEle.getAttribute('x') === '96.5').toBe(true);
                    expect(thumbEle.getAttribute('width') === '730').toBe(true);
                    done();
                };
                chartObj.primaryXAxis.zoomFactor = 1;
                chartObj.primaryXAxis.zoomPosition = 0;
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking mouse x value greater than scroll width', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(ele, 150, 150, 8000, 400);
                    var thumbEle = document.getElementById('container_scrollBarThumb_primaryXAxis');
                    expect(thumbEle.getAttribute('x') === '84.5' || thumbEle.getAttribute('x') === '88.5').toBe(true);
                    expect(thumbEle.getAttribute('width') === '740').toBe(true);
                    done();
                };
                chartObj.primaryXAxis.zoomFactor = 1;
                chartObj.primaryXAxis.zoomPosition = 0;
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Left Circle Resize - X within Circle Radius', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(ele, 80, 150, 800, 400);
                    var currentTarget = document.getElementById('container_scrollBar_leftCircle_primaryXAxis');
                    chartObj.axisCollections[0].zoomingScrollBar.scrollMouseDown((trigger.onTouchStart(currentTarget, 0, 0, 0, 0, 80, 390)));
                    chartObj.axisCollections[0].zoomingScrollBar.scrollMouseMove((trigger.onTouchMove(currentTarget, 0, 0, 0, 0, 70, 390)));
                    var thumbEle = document.getElementById('container_scrollBarThumb_primaryXAxis');
                    expect(thumbEle.getAttribute('x') === '14.5' || thumbEle.getAttribute('x') === '8.5').toBe(true);
                    expect(thumbEle.getAttribute('width') === '720' || thumbEle.getAttribute('width') === '730').toBe(true);
                    done();
                };
                chartObj.primaryXAxis.zoomFactor = 1;
                chartObj.primaryXAxis.zoomPosition = 0;
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Mouse wheel - Width Greater than SVG Width', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(ele, 150, 150, 8000, 400);
                    wheelArgs = {
                        preventDefault: prevent,
                        wheelDelta: 120,
                        detail: 0,
                        clientX: 800,
                        clientY: 390
                    };
                    chartObj.axisCollections[0].zoomingScrollBar.scrollMouseWheel(wheelArgs);
                    var thumbEle = document.getElementById('container_scrollBarThumb_primaryXAxis');
                    expect(thumbEle.getAttribute('x') === '84.5' || thumbEle.getAttribute('x') === '88.5').toBe(true);
                    expect(thumbEle.getAttribute('width') === '740').toBe(true);
                    done();
                };
                chartObj.primaryXAxis.zoomFactor = 1;
                chartObj.primaryXAxis.zoomPosition = 0;
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Removing scrollbar svg element', function (done) {
                trigger.draganddropEvent(ele, 150, 150, 400, 400);
                chartObj.axisCollections[0].zoomingScrollBar.render(true);
                expect(document.getElementById('container_scrollBar_svgprimaryXAxis')).toBeNull(true);
                chartObj.refresh();
                done();
            });
        });
        describe('Thumb Limits', function () {
            var chartObj;
            var loaded;
            var load;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(ele);
                chartObj = new index_1.Chart({
                    primaryXAxis: {
                        title: 'PrimaryXAxis', valueType: 'Double',
                        crosshairTooltip: { enable: true }
                    },
                    crosshair: { enable: true },
                    primaryYAxis: { title: 'PrimaryYAxis' },
                    series: [{
                            dataSource: [{ x: 10, y: 46 }, { x: 20, y: 27 }, { x: 30, y: 26 }, { x: 40, y: 16 }, { x: 50, y: 31 }],
                            xName: 'x', yName: 'y', marker: { visible: true }, type: 'Line'
                        }],
                    title: 'Chart Title', legendSettings: { visible: true }, width: '900',
                    zoomSettings: { enableSelectionZooming: true, enableScrollbar: true, mode: 'X' }
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                ele.remove();
            });
            it('Checking less than SVG X value - Left resize', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(ele, 150, 150, 400, 400);
                    var currentTarget = document.getElementById('container_scrollBar_leftCircle_primaryXAxis');
                    chartObj.axisCollections[0].zoomingScrollBar.scrollMouseDown((trigger.onTouchStart(currentTarget, 0, 0, 0, 0, 160, 390)));
                    chartObj.axisCollections[0].zoomingScrollBar.scrollMouseMove((trigger.onTouchMove(currentTarget, 0, 0, 0, 0, 50, 390)));
                    var thumbEle = document.getElementById('container_scrollBarThumb_primaryXAxis');
                    expect(thumbEle.getAttribute('x') === '84.5' || thumbEle.getAttribute('x') === '88.5').toBe(true);
                    expect(thumbEle.getAttribute('width') === '250' || thumbEle.getAttribute('width') === '250.00000000000003').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.theme = 'HighContrastLight';
                chartObj.refresh();
            });
            it('Checking less than SVG X value - Thumb Mouse move', function (done) {
                var currentTarget = document.getElementById('container_scrollBarThumb_primaryXAxis');
                chartObj.axisCollections[0].zoomingScrollBar.scrollMouseDown((trigger.onTouchStart(currentTarget, 0, 0, 0, 0, 160, 390)));
                chartObj.axisCollections[0].zoomingScrollBar.scrollMouseMove((trigger.onTouchMove(currentTarget, 0, 0, 0, 0, 50, 390)));
                var thumbEle = document.getElementById('container_scrollBarThumb_primaryXAxis');
                expect(thumbEle.getAttribute('x') === '84.5' || thumbEle.getAttribute('x') === '88.5').toBe(true);
                expect(thumbEle.getAttribute('width') === '250' || thumbEle.getAttribute('width') === '250.00000000000003').toBe(true);
                done();
            });
            it('Checking Hover Fill - Right Arrow with Circle', function (done) {
                var currentTarget = document.getElementById('container_scrollBar_rightArrow_primaryXAxis');
                chartObj.axisCollections[0].zoomingScrollBar.scrollMouseMove((trigger.onTouchMove(currentTarget, 0, 0, 0, 0, 400, 390)));
                var circleEle = document.getElementById('container_scrollBar_rightCircle_primaryXAxis');
                expect(circleEle).not.toBe(null);
                done();
            });
            it('Checking Hover Fill - Left Arrow with Circle', function (done) {
                var currentTarget = document.getElementById('container_scrollBar_leftArrow_primaryXAxis');
                chartObj.axisCollections[0].zoomingScrollBar.scrollMouseMove((trigger.onTouchMove(currentTarget, 0, 0, 0, 0, 500, 390)));
                var circleEle = document.getElementById('container_scrollBar_leftCircle_primaryXAxis');
                expect(circleEle).not.toBe(null);
                done();
            });
            it('Checking Hover Fill - Right Arrow Element', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(ele, 150, 150, 400, 400);
                    var currentTarget = document.getElementById('container_scrollBar_rightCircle_primaryXAxis');
                    chartObj.axisCollections[0].zoomingScrollBar.scrollMouseMove((trigger.onTouchMove(currentTarget, 0, 0, 0, 0, 698, 390)));
                    var circleEle = document.getElementById('container_scrollBar_rightArrow_primaryXAxis');
                    expect(circleEle).not.toBe(null);
                    done();
                };
                chartObj.theme = 'HighContrastLight';
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Shadow Element Check', function (done) {
                var shadowEle = document.getElementById('container_' + chartObj.axisCollections[0].name + '_thumb_shadow');
                expect(shadowEle.childElementCount).toBe(2);
                done();
            });
        });
        describe('Scrollbar Animation', function () {
            var chartObj;
            var loaded;
            var load;
            var wheelArgs;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(ele);
                chartObj = new index_1.Chart({
                    primaryXAxis: {
                        title: 'PrimaryXAxis', valueType: 'Double',
                    },
                    primaryYAxis: { title: 'PrimaryYAxis' },
                    series: [{
                            dataSource: [{ x: 10, y: 46 }, { x: 20, y: 27 }, { x: 30, y: 26 }, { x: 40, y: 16 }, { x: 50, y: 31 }],
                            xName: 'x', yName: 'y', marker: { visible: true }, type: 'Line'
                        }],
                    title: 'Chart Title', legendSettings: { visible: true }, width: '900',
                    zoomSettings: { enableSelectionZooming: true, enableScrollbar: true, mode: 'X' }
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                ele.remove();
            });
            it('Mouse Down on Back Rect with animation', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(ele, 75, 150, 400, 400);
                    var svgChildEle = document.getElementById('container_scrollBar_svgprimaryXAxis').children[0];
                    var currentTarget = document.getElementById('container_scrollBarBackRect_primaryXAxis');
                    var thumbEle = document.getElementById('container_scrollBarThumb_primaryXAxis');
                    var circleRadius = 8;
                    chartObj.axisCollections[0].zoomingScrollBar.animateDuration = 10;
                    chartObj.axisCollections[0].zoomingScrollBar.scrollMouseDown((trigger.onTouchStart(currentTarget, 0, 0, 0, 0, 550, 390)));
                    expect(svgChildEle).not.toBeNull();
                    expect(svgChildEle.childElementCount).toBe(2);
                    expect(svgChildEle.children[0].childElementCount).toBe(1);
                    expect(svgChildEle.children[1].childElementCount).toBe(8);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
        });
        describe('Lazy Loading', function () {
            var chartObj;
            var loaded;
            var load;
            var wheelArgs;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(ele);
                chartObj = new index_1.Chart({
                    primaryXAxis: {
                        title: 'PrimaryXAxis', valueType: 'Double',
                        scrollbarSettings: {
                            enable: true,
                            pointsLength: 50
                        },
                    },
                    primaryYAxis: { title: 'PrimaryYAxis' },
                    series: [{
                            dataSource: [{ x: 10, y: 46 }, { x: 20, y: 27 }, { x: 30, y: 26 }, { x: 40, y: 16 }, { x: 50, y: 31 }, { x: 60, y: 21 }],
                            xName: 'x', yName: 'y', marker: { visible: true }, type: 'Line'
                        }],
                    theme: 'Bootstrap',
                    title: 'Chart Title', legendSettings: { visible: true }, width: '900',
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                ele.remove();
            });
            it('Mouse Move with Thumb', function (done) {
                trigger.draganddropEvent(ele, 200, 200, 350, 350);
                var currentTarget = document.getElementById('container_scrollBarThumb_primaryXAxis');
                chartObj.axisCollections[0].zoomingScrollBar.scrollMouseDown((trigger.onTouchStart(currentTarget, 0, 0, 0, 0, 150, 390)));
                chartObj.axisCollections[0].zoomingScrollBar.scrollMouseMove((trigger.onTouchMove(currentTarget, 0, 0, 0, 0, 450, 390)));
                var thumbEle = document.getElementById('container_scrollBarThumb_primaryXAxis');
                expect(thumbEle.getAttribute('x') === '8' || thumbEle.getAttribute('x') === '308').toBe(true);
                expect(thumbEle.getAttribute('width') === '99.89999999999999' || thumbEle.getAttribute('width') === '100.38').toBe(true);
                chartObj.axisCollections[0].zoomingScrollBar.scrollMouseUp();
                done();
            });
            it('Checking mouse wheel as forward ', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(ele, 150, 150, 400, 400);
                    wheelArgs = {
                        preventDefault: prevent,
                        wheelDelta: 120,
                        detail: 0,
                        clientX: 250,
                        clientY: 290
                    };
                    chartObj.axisCollections[0].zoomingScrollBar.scrollMouseWheel(wheelArgs);
                    var thumbEle = document.getElementById('container_scrollBarThumb_primaryXAxis');
                    expect(thumbEle.getAttribute('x') === '344.9' || thumbEle.getAttribute('x') === '345.7').toBe(true);
                    expect(thumbEle.getAttribute('width') === '99.89999999999999' ||
                        thumbEle.getAttribute('width') === '100.38').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.theme = 'Fabric';
                chartObj.refresh();
            });
            it('Checking mouse wheel as backward ', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(ele, 150, 150, 400, 400);
                    chartObj.axisCollections[0].zoomingScrollBar.isPointer = false;
                    wheelArgs = {
                        preventDefault: prevent,
                        wheelDelta: -120,
                        detail: 0,
                        clientX: 250,
                        clientY: 200
                    };
                    chartObj.axisCollections[0].zoomingScrollBar.scrollMouseWheel(wheelArgs);
                    var thumbEle = document.getElementById('container_scrollBarThumb_primaryXAxis');
                    expect(thumbEle.getAttribute('x') === '344.21525773195873' || thumbEle.getAttribute('x') === '345.000412371134').toBe(true);
                    expect(thumbEle.getAttribute('width') === '99.89999999999999' || thumbEle.getAttribute('width') === '100.38').toBe(true);
                    done();
                };
                chartObj.theme = 'HighContrastLight';
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Mouse Down on Back Rect - Right Side Click', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    trigger.draganddropEvent(ele, 150, 150, 400, 400);
                    var currentTarget = document.getElementById('container_scrollBarBackRect_primaryXAxis');
                    chartObj.axisCollections[0].zoomingScrollBar.scrollMouseDown((trigger.onTouchStart(currentTarget, 0, 0, 0, 0, 500, 390)));
                    var thumbEle = document.getElementById('container_scrollBarThumb_primaryXAxis');
                    expect(thumbEle.getAttribute('x') === '425.86525773195876' || thumbEle.getAttribute('x') === '427.05041237113403').toBe(true);
                    expect(thumbEle.getAttribute('width') === '99.89999999999999' || thumbEle.getAttribute('width') === '100.38').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Mouse Down on Back Rect - Left side Click', function (done) {
                var currentTarget = document.getElementById('container_scrollBarBackRect_primaryXAxis');
                chartObj.axisCollections[0].zoomingScrollBar.scrollMouseDown((trigger.onTouchStart(currentTarget, 0, 0, 0, 0, 140, 390)));
                var thumbEle = document.getElementById('container_scrollBarThumb_primaryXAxis');
                expect(thumbEle.getAttribute('x') === '344.2152577319588' || thumbEle.getAttribute('x') === '345.000412371134').toBe(true);
                expect(thumbEle.getAttribute('width') === '99.89999999999999' || thumbEle.getAttribute('width') === '100.38').toBe(true);
                done();
            });
            it('Right Resize using Circle', function (done) {
                var currentTarget = document.getElementById('container_scrollBar_rightCircle_primaryXAxis');
                chartObj.axisCollections[0].zoomingScrollBar.scrollMouseDown((trigger.onTouchStart(currentTarget, 0, 0, 0, 0, 550, 390, true)));
                chartObj.axisCollections[0].zoomingScrollBar.scrollMouseMove((trigger.onTouchMove(currentTarget, 0, 0, 0, 0, 650, 390)));
                var thumbEle = document.getElementById('container_scrollBarThumb_primaryXAxis');
                expect(thumbEle.getAttribute('x') === '344.21525773195873' || thumbEle.getAttribute('x') === '345.000412371134').toBe(true);
                expect(thumbEle.getAttribute('width') === '240.2847422680412' || thumbEle.getAttribute('width') === '243.49958762886598').toBe(true);
                chartObj.axisCollections[0].zoomingScrollBar.scrollMouseUp();
                done();
            });
            it('Left Resize using Circle', function (done) {
                var currentTarget = document.getElementById('container_scrollBar_leftCircle_primaryXAxis');
                chartObj.axisCollections[0].zoomingScrollBar.scrollMouseDown((trigger.onTouchStart(currentTarget, 0, 0, 0, 0, 300, 390)));
                chartObj.axisCollections[0].zoomingScrollBar.scrollMouseMove((trigger.onTouchMove(currentTarget, 0, 0, 0, 0, 120, 390)));
                var thumbEle = document.getElementById('container_scrollBarThumb_primaryXAxis');
                var thumbX = (parseFloat(thumbEle.getAttribute('x')).toFixed(2)).toString();
                var thumbWidth = Math.round((parseFloat(thumbEle.getAttribute('width')))).toLocaleString();
                expect(thumbX === '164.22' || thumbX === '165.00').toBe(true);
                expect(thumbWidth === '420' || thumbWidth === '423').toBe(true);
                chartObj.axisCollections[0].zoomingScrollBar.scrollMouseUp();
                done();
            });
        });
        describe('Inversed Scrollbar ', function () {
            var chartObj;
            var loaded;
            var load;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(ele);
                chartObj = new index_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis', valueType: 'Double', isInversed: true,
                        scrollbarSettings: {
                            enable: true,
                            pointsLength: 50
                        } },
                    primaryYAxis: { title: 'PrimaryYAxis' },
                    series: [{
                            dataSource: [{ x: 10, y: 46 }, { x: 20, y: 27 }, { x: 30, y: 26 }, { x: 40, y: 16 }, { x: 50, y: 31 }],
                            xName: 'x', yName: 'y', marker: { visible: true }, type: 'Line'
                        }],
                    title: 'Chart Title',
                    legendSettings: { visible: true },
                    width: '900',
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                ele.remove();
            });
            it('Checking scrollbar is isInversed', function (done) {
                trigger.draganddropEvent(ele, 200, 200, 350, 350);
                var svgChildEle = document.getElementById('container_scrollBar_svgprimaryXAxis').children[0];
                var backRectEle = svgChildEle.children[0].children[0];
                var width = backRectEle.getAttribute('width');
                expect(svgChildEle.id === 'container_scrollBar_primaryXAxis').toBe(true);
                expect(svgChildEle.getAttribute('transform') === 'translate(832.5,16) rotate(180)' || svgChildEle.getAttribute('transform') === 'translate(836.5,16) rotate(180)').toBe(true);
                expect(backRectEle.getAttribute('x') === '0').toBe(true);
                expect(backRectEle.getAttribute('y') === '0').toBe(true);
                expect(backRectEle.getAttribute('height') === '16').toBe(true);
                expect(width === '832.5' || width === '836.5').toBe(true);
                expect(backRectEle.getAttribute('rx') === '0').toBe(true);
                expect(backRectEle.id === 'container_scrollBarBackRect_primaryXAxis').toBe(true);
                done();
            });
            it('Right Resize for Inversed axis', function (done) {
                var currentTarget = document.getElementById('container_scrollBar_rightCircle_primaryXAxis');
                chartObj.axisCollections[0].zoomingScrollBar.scrollMouseDown((trigger.onTouchStart(currentTarget, 0, 0, 0, 0, 550, 390, true)));
                chartObj.axisCollections[0].zoomingScrollBar.scrollMouseMove((trigger.onTouchMove(currentTarget, 0, 0, 0, 0, 650, 390)));
                var thumbEle = document.getElementById('container_scrollBarThumb_primaryXAxis');
                expect(thumbEle.getAttribute('x') === '134.5' || thumbEle.getAttribute('x') === '8').toBe(true);
                expect(thumbEle.getAttribute('width') === '109.5' || thumbEle.getAttribute('width') === '240').toBe(true);
                chartObj.axisCollections[0].zoomingScrollBar.scrollMouseUp();
                done();
            });
            it('Mouse Move with Thumb', function (done) {
                var currentTarget = document.getElementById('container_scrollBarThumb_primaryXAxis');
                chartObj.axisCollections[0].zoomingScrollBar.scrollMouseDown((trigger.onTouchStart(currentTarget, 0, 0, 0, 0, 800, 390)));
                chartObj.axisCollections[0].zoomingScrollBar.scrollMouseMove((trigger.onTouchMove(currentTarget, 0, 0, 0, 0, 450, 390)));
                var thumbEle = document.getElementById('container_scrollBarThumb_primaryXAxis');
                var thumbX = Math.round((parseFloat(thumbEle.getAttribute('x')))).toLocaleString();
                var thumbWidth = Math.round((parseFloat(thumbEle.getAttribute('width')))).toLocaleString();
                expect(thumbX === '8' || thumbX === '358').toBe(true);
                expect(thumbWidth === '100' || thumbWidth === '240').toBe(true);
                chartObj.axisCollections[0].zoomingScrollBar.scrollMouseUp();
                done();
            });
            it('Mouse Move with Thumb on inverted axis', function (done) {
                var currentTarget = document.getElementById('container_scrollBarThumb_primaryXAxis');
                chartObj.axisCollections[0].zoomingScrollBar.scrollMouseDown((trigger.onTouchStart(currentTarget, 0, 0, 0, 0, 450, 390)));
                chartObj.axisCollections[0].zoomingScrollBar.scrollMouseMove((trigger.onTouchMove(currentTarget, 0, 0, 0, 0, 450, 390)));
                var thumbEle = document.getElementById('container_scrollBarThumb_primaryXAxis');
                var thumbX = Math.round((parseFloat(thumbEle.getAttribute('x')))).toLocaleString();
                var thumbWidth = Math.round((parseFloat(thumbEle.getAttribute('width')))).toLocaleString();
                expect(thumbX === '8' || thumbX === '358').toBe(true);
                expect(thumbWidth === '100' || thumbWidth === '240').toBe(true);
                chartObj.axisCollections[0].zoomingScrollBar.scrollMouseUp();
                done();
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
