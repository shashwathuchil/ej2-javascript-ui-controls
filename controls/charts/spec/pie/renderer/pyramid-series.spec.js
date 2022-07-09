define(["require", "exports", "@syncfusion/ej2-base", "../../../src/accumulation-chart/renderer/pyramid-series", "../../../src/accumulation-chart/accumulation", "../../../src/accumulation-chart/renderer/legend", "../../../src/common/utils/helper", "../../../src/accumulation-chart/renderer/dataLabel", "../../../src/accumulation-chart/user-interaction/selection", "../../../src/accumulation-chart/user-interaction/tooltip", "../../common.spec", "../../chart/base/events.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, pyramid_series_1, accumulation_1, legend_1, helper_1, dataLabel_1, selection_1, tooltip_1, common_spec_1, events_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    accumulation_1.AccumulationChart.Inject(pyramid_series_1.PyramidSeries, legend_1.AccumulationLegend, dataLabel_1.AccumulationDataLabel, selection_1.AccumulationSelection, tooltip_1.AccumulationTooltip);
    var data = [{ x: 'Renewed', y: 18.2, text: '18.20%' },
        { x: 'Subscribe', y: 27.3, text: '27.3%' },
        { x: 'Support', y: 55.9, text: '55.9%' },
        { x: 'Downloaded', y: 76.8, text: '76.8%' },
        { x: 'Visited', y: 100, text: '100%' }];
    describe('Accumulation Chart Control', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('Pyramid Series checking', function () {
            var ele;
            var slice;
            var loaded;
            var id = 'ej2container';
            var seriesId = id + '_Series_0';
            var sliceid = id + '_Series_0' + '_Point_';
            var tooltipid = id + '_2_content';
            var slicepath;
            var y;
            var i = 0;
            var length;
            var chart;
            var points;
            var trigger = new events_spec_1.MouseEvents();
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: id });
                document.body.appendChild(ele);
                chart = new accumulation_1.AccumulationChart({
                    series: [
                        {
                            type: 'Pyramid'
                        }
                    ], width: '600', height: '400', legendSettings: { visible: false }
                });
                chart.appendTo('#' + id);
            });
            afterAll(function () {
                chart.loaded = null;
                chart.destroy();
                ej2_base_1.remove(helper_1.getElement(id));
            });
            it('Empty Pyramid series', function (done) {
                chart.loaded = function () {
                    var group = helper_1.getElement(seriesId);
                    expect(group != null).toBe(true);
                    expect(group.childNodes.length).toBe(0);
                    done();
                };
                chart.refresh();
            });
            it('Pyramid series with points', function (done) {
                chart.loaded = function () {
                    var group = helper_1.getElement(seriesId);
                    expect(group != null).toBe(true);
                    expect(group.childNodes.length).toBe(5);
                    done();
                };
                chart.series[0].dataSource = data;
                chart.series[0].xName = 'x';
                chart.series[0].yName = 'y';
                chart.refresh();
            });
            it('Checking with percentage value for point', function (done) {
                chart.loaded = function () {
                    var point = chart.visibleSeries[0].points[0];
                    expect(point.percentage != null).toBe(true);
                    expect(point.percentage).toBe(6.54);
                    done();
                };
                chart.refresh();
            });
            it('Checking default Pyramid size', function (done) {
                var group = helper_1.getElement(seriesId);
                var bounds = group.getBoundingClientRect();
                done();
            });
            it('Checking Pyramid series without data labels', function (done) {
                var group = helper_1.getElement('container_datalabel_Series_0');
                expect(group).toBe(null);
                done();
            });
            it('Checking default legend position', function (done) {
                chart.loaded = function () {
                    var group = helper_1.getElement('ej2container_chart_legend_element');
                    expect(group.getAttribute('x') === '105' || group.getAttribute('x') === '105.5' || group.getAttribute('x') === '117').toBe(true);
                    expect(group.getAttribute('y')).toBe('11');
                    expect(group.getAttribute('width') === '390' || group.getAttribute('width') === '389' || group.getAttribute('width') === '366').toBe(true);
                    expect(group.getAttribute('height') === '33' || group.getAttribute('height') === '32').toBe(true);
                    done();
                };
                chart.legendSettings.visible = true;
                chart.series[0].dataLabel.visible = true;
                chart.refresh();
            });
            it('Color saturation fill as red', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('ej2container_datalabel_Series_0_text_2');
                    expect(element.getAttribute('fill') == 'white').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].dataLabel.fill = 'red';
                chart.refresh();
            });
            it('Checking default legend shape', function (done) {
                var group = helper_1.getElement('ej2container_chart_legend_shape_0');
                expect(group.getAttribute('d') == 'M 113 32.5 L 118 22.5 L 123 32.5 L 113 32.5 z' ||
                    group.getAttribute('d') == 'M 113.5 31.5 L 118.5 21.5 L 123.5 31.5 L 113.5 31.5 z' ||
                    group.getAttribute('d') == 'M 125 32 L 130 22 L 135 32 L 125 32 z' ||
                    group.getAttribute('d') == 'M 113.5 32.5 L 118.5 22.5 L 123.5 32.5 L 113.5 32.5 z').toBe(true);
                done();
            });
            it('Checking default palette colors', function (done) {
                var group = helper_1.getElement(sliceid + '0');
                expect(group.getAttribute('fill')).toBe('#00bdae');
                group = helper_1.getElement(sliceid + '1');
                expect(group.getAttribute('fill')).toBe('#404041');
                group = helper_1.getElement(sliceid + '2');
                expect(group.getAttribute('fill')).toBe('#357cd2');
                group = helper_1.getElement(sliceid + '3');
                expect(group.getAttribute('fill')).toBe('#e56590');
                group = helper_1.getElement(sliceid + '4');
                expect(group.getAttribute('fill')).toBe('#f8b883');
                done();
            });
            it('Pyramid series with empty and valid points', function (done) {
                chart.loaded = function () {
                    var group = helper_1.getElement('ej2container_Series_0_Point_3');
                    expect(group).toBe(null);
                    data.splice(3, 1);
                    chart.series[0].dataSource = data;
                    chart.loaded = null;
                    done();
                };
                data.splice(3, 0, { x: 'A', y: null });
                chart.series[0].dataSource = data;
                chart.refresh();
            });
            it('Pyramid series with average empty point mode', function (done) {
                chart.loaded = function () {
                    var group = helper_1.getElement('ej2container_Series_0_Point_3');
                    expect(group).not.toBe(null);
                    expect(Math.floor(group.getBoundingClientRect().height) == 53).toBe(true);
                    data.splice(3, 1);
                    chart.series[0].dataSource = data;
                    chart.loaded = null;
                    done();
                };
                data.splice(3, 0, { x: 'A', y: null });
                chart.series[0].dataSource = data;
                chart.series[0].emptyPointSettings.mode = 'Average';
                chart.refresh();
            });
            it('Pyramid series with zero empty point mode', function (done) {
                chart.loaded = function () {
                    var group = helper_1.getElement('ej2container_Series_0_Point_3');
                    expect(group).not.toBe(null);
                    expect(group.getBoundingClientRect().height == 0).toBe(true);
                    data.splice(3, 1);
                    chart.series[0].dataSource = data;
                    chart.loaded = null;
                    done();
                };
                data.splice(3, 0, { x: 'A', y: null });
                chart.series[0].dataSource = data;
                chart.series[0].emptyPointSettings.mode = 'Zero';
                chart.refresh();
            });
            it('Pyramid series - with a value as 0', function (done) {
                chart.loaded = function () {
                    var group = helper_1.getElement('ej2container_Series_0_Point_3');
                    expect(group.getBoundingClientRect().height).toBe(0);
                    data.splice(3, 1);
                    chart.series[0].dataSource = data;
                    chart.loaded = null;
                    done();
                };
                data.splice(3, 0, { x: 'A', y: 0 });
                chart.series[0].dataSource = data;
                chart.refresh();
            });
            it('Pyramid segments with gaps', function (done) {
                chart.loaded = function () {
                    var group = helper_1.getElement('ej2container_Series_0_Point_2');
                    var bounds = group.getBoundingClientRect();
                    expect(bounds.top == 150.496826171875 || bounds.top == 149.781494140625).toBe(true);
                    expect(Math.floor(bounds.height) == 44).toBe(true);
                    done();
                };
                chart.series[0].gapRatio = 0.2;
                chart.refresh();
            });
            it('Pyramid series with custom Pyramid size', function (done) {
                chart.loaded = function () {
                    var group = helper_1.getElement('ej2container_Series_0');
                    var bounds = group.getBoundingClientRect();
                    expect(bounds.width).toBe(290);
                    expect(bounds.height == 173 || bounds.height == 173.5).toBe(true);
                    done();
                };
                chart.series[0].width = '50%';
                chart.series[0].height = '50%';
                chart.refresh();
            });
            it('Pyramid series with default data label', function (done) {
                chart.loaded = function () {
                    var group = helper_1.getElement('ej2container_datalabel_Series_0_text_3');
                    expect(group.getAttribute('x') == '291' || group.getAttribute('x') == '291.5').toBe(true);
                    expect(group.getAttribute('y') == '222.44647735442126' || group.getAttribute('y') == '221.198490294752').toBe(true);
                    done();
                };
                chart.series[0].width = '80%';
                chart.series[0].height = '80%';
                chart.series[0].neckWidth = chart.series[0].neckWidth = '20%';
                chart.series[0].gapRatio = 0;
                chart.series[0].dataLabel.visible = true;
                chart.refresh();
            });
            it('Pyramid series with inside labels', function (done) {
                chart.loaded = function () {
                    var group = helper_1.getElement('ej2container_datalabel_Series_0_text_3');
                    expect(group.getAttribute('x') == '291' || group.getAttribute('x') == '291.5').toBe(true);
                    expect(group.getAttribute('y') == '222.44647735442126' || group.getAttribute('y') == '221.198490294752').toBe(true);
                    done();
                };
                chart.series[0].dataLabel.position = 'Inside';
                chart.refresh();
            });
            it('Pyramid series with outside labels', function (done) {
                chart.loaded = function () {
                    var group = helper_1.getElement('ej2container_datalabel_Series_0_text_3');
                    expect(group.getAttribute('x')).toBe('535');
                    expect(group.getAttribute('y') == '221.44647735442126' ||
                        group.getAttribute('y') == '220.198490294752').toBe(true);
                    done();
                };
                chart.series[0].dataLabel.position = 'Outside';
                chart.refresh();
            });
            it('Check the default connector line', function (done) {
                chart.loaded = function () {
                    var group = helper_1.getElement('ej2container_datalabel_Series_0_connector_2');
                    expect(group.getAttribute('fill')).toBe('transparent');
                    expect(group.getAttribute('stroke')).toBe('#357cd2');
                    expect(group.getAttribute('stroke-width')).toBe('1');
                    expect(group.getAttribute('stroke-dasharray')).toBe('');
                    done();
                };
                chart.refresh();
            });
            it('Data labels with connector (custom length)', function (done) {
                chart.loaded = function () {
                    var group = helper_1.getElement('ej2container_datalabel_Series_0_connector_2');
                    expect(group.getAttribute('d') == 'M 361.2523364485981 151.68037383177568 L 402.7523364485981 151.68037383177568 L 412.7523364485981 151.68037383177568' ||
                        group.getAttribute('d') == 'M 361.2523364485981 150.99158878504673 L 402.7523364485981 150.99158878504673 L 412.7523364485981 150.99158878504673').toBe(true);
                    done();
                    chart.series[0].dataLabel.connectorStyle = { length: null };
                    chart.loaded = null;
                };
                chart.series[0].dataLabel.connectorStyle = { length: '40px' };
                chart.refresh();
            });
            it('Data labels with custom connector', function (done) {
                chart.loaded = function () {
                    var group = helper_1.getElement('ej2container_datalabel_Series_0_connector_2');
                    expect(group.getAttribute('fill')).toBe('transparent');
                    expect(group.getAttribute('stroke')).toBe('red');
                    expect(group.getAttribute('stroke-width')).toBe('5');
                    expect(group.getAttribute('stroke-dasharray')).toBe('');
                    expect(group.getAttribute('d') == 'M 361.2523364485981 151.68037383177568 L 410.7523364485981 151.68037383177568' ||
                        group.getAttribute('d') == 'M 361.2523364485981 150.99158878504673 L 410.7523364485981 150.99158878504673').toBe(true);
                    done();
                    chart.series[0].dataLabel.connectorStyle = { color: null, length: null, type: 'Line', width: 1 };
                    chart.loaded = null;
                };
                chart.series[0].dataLabel.connectorStyle = { color: 'red', type: 'Curve', length: '40px', width: 5 };
                chart.refresh();
            });
            it('Data labels with hidden connector (opacity-0)', function (done) {
                chart.loaded = function () {
                    var group = helper_1.getElement('ej2container_datalabel_Series_0_connector_2');
                    expect(group.getAttribute('stroke-width')).toBe('0');
                    done();
                    chart.series[0].dataLabel.connectorStyle.width = 1;
                    chart.loaded = null;
                };
                chart.series[0].dataLabel.connectorStyle.width = 0;
                chart.refresh();
            });
            it('Checking smart labels for inside position', function (done) {
                chart.loaded = function () {
                    var group = helper_1.getElement('ej2container_datalabel_Series_0_text_3');
                    expect(group.getAttribute('x')).toBe('499.78682170542635');
                    expect(group.getAttribute('y') == '221.6887596899225' ||
                        group.getAttribute('y') == '220.44147286821703').toBe(true);
                    done();
                };
                data[3]['y'] = 5;
                chart.series[0].dataSource = data;
                chart.series[0].dataLabel.position = 'Inside';
                chart.refresh();
            });
            it('Checking smart labels for outside position', function (done) {
                chart.loaded = function () {
                    var group = helper_1.getElement('ej2container_datalabel_Series_0_text_3');
                    expect(group.getAttribute('x')).toBe('535');
                    expect(group.getAttribute('y') == '186.79308681672023' ||
                        group.getAttribute('y') == '182.39003215434082').toBe(true);
                    done();
                };
                data[3]['y'] = 5;
                data[2]['y'] = 5;
                chart.series[0].dataLabel.position = 'Outside';
                chart.refresh();
            });
            it('Checking overlapped labels for inside position', function (done) {
                chart.loaded = function () {
                    var group = helper_1.getElement('ej2container_datalabel_Series_0_text_3');
                    expect(group.getAttribute('x')).toBe('298');
                    expect(group.getAttribute('y') == '177.69340836012861' ||
                        group.getAttribute('y') == '176.316077170418').toBe(true);
                    done();
                };
                data[3]['y'] = 5;
                chart.series[0].dataLabel.position = 'Inside';
                chart.enableSmartLabels = false;
                chart.refresh();
            });
            it('Checking overlapped labels for outside position', function (done) {
                chart.loaded = function () {
                    var group = helper_1.getElement('ej2container_datalabel_Series_0_text_3');
                    expect(group.getAttribute('x')).toBe('535');
                    expect(group.getAttribute('y') == '176.69340836012861' ||
                        group.getAttribute('y') == '175.316077170418').toBe(true);
                    done();
                };
                data[3]['y'] = 5;
                data[2]['y'] = 5;
                chart.series[0].dataLabel.position = 'Outside';
                chart.refresh();
            });
            it('Checking labels at outside, when Pyramid width is 100%', function (done) {
                chart.loaded = function () {
                    var group = helper_1.getElement('ej2container_datalabel_Series_0');
                    expect(group.childNodes.length).toBe(0);
                    done();
                };
                data[3]['y'] = 5;
                data[2]['y'] = 5;
                chart.series[0].dataLabel.position = 'Outside';
                chart.series[0].width = '100%';
                chart.enableSmartLabels = true;
                chart.refresh();
            });
            it('Explode a Pyramid segment', function (done) {
                chart.loaded = function () {
                    var group = helper_1.getElement(sliceid + '2');
                    expect(group.getAttribute('transform') != '').toBe(true);
                    done();
                };
                chart.series[0].width = '70%';
                chart.series[0].explode = true;
                chart.series[0].explodeIndex = 2;
                chart.enableAnimation = false;
                chart.refresh();
            });
            it('Checking default explode offset', function (done) {
                var group = helper_1.getElement(sliceid + '2');
                expect(group.getAttribute('transform') == 'translate(25, 0)').toBe(true);
                done();
            });
            it('Checking custom explode offset', function (done) {
                chart.loaded = function () {
                    var group = helper_1.getElement(sliceid + '2');
                    expect(group.getAttribute('transform') == 'translate(30, 0)').toBe(true);
                    done();
                };
                chart.series[0].explodeOffset = '30px';
                chart.refresh();
            });
            it('Explode a segment on click', function (done) {
                chart.loaded = function () {
                    var pointElement = helper_1.getElement(sliceid + '3');
                    trigger.clickEvent(pointElement);
                    var group = helper_1.getElement(sliceid + '3');
                    expect(group.getAttribute('transform') != '').toBe(true);
                    done();
                };
                chart.series[0].explodeIndex = null;
                chart.refresh();
            });
            it('De-Explode a segment on click', function (done) {
                var pointElement = helper_1.getElement(sliceid + '3');
                trigger.clickEvent(pointElement);
                var group = helper_1.getElement(sliceid + '3');
                expect(group.getAttribute('transform')).toBe('translate(0, 0)');
                done();
            });
            it('Select a segment on click', function (done) {
                chart.loaded = function () {
                    var pointElement = helper_1.getElement(sliceid + '3');
                    trigger.clickEvent(pointElement);
                    var group = helper_1.getElement(sliceid + '3');
                    expect(group.getAttribute('class')).toBe('ej2container_ej2_chart_selection_series_0');
                    expect(group.getAttribute('transform')).toBe(null);
                    done();
                };
                chart.series[0].explode = false;
                chart.selectionMode = 'Point';
                chart.refresh();
            });
            it('Un-Select a segment on click', function (done) {
                var pointElement = helper_1.getElement(sliceid + '3');
                trigger.clickEvent(pointElement);
                var group = helper_1.getElement(sliceid + '3');
                expect(group.getAttribute('class')).toBe('');
                expect(group.getAttribute('transform')).toBe(null);
                done();
            });
            it('Select and explode segment on click', function (done) {
                chart.loaded = function () {
                    var pointElement = helper_1.getElement(sliceid + '3');
                    trigger.clickEvent(pointElement);
                    var group = helper_1.getElement(sliceid + '3');
                    expect(group.getAttribute('class')).toBe('ej2container_ej2_chart_selection_series_0');
                    expect(group.getAttribute('transform')).toBe('translate(30, 0)');
                    done();
                    trigger.clickEvent(pointElement);
                };
                chart.series[0].explode = true;
                chart.selectionMode = 'Point';
                chart.refresh();
            });
            it('Checking custom legend shape', function (done) {
                chart.loaded = function () {
                    var group = helper_1.getElement('ej2container_chart_legend_shape_0');
                    expect(group.getAttribute('d') == 'M 113 27.5 L 118 22.5 L 123 27.5 L 118 32.5 L 113 27.5 z' ||
                        group.getAttribute('d') == 'M 125 26 L 130 21 L 135 26 L 130 31 L 125 26 z' ||
                        group.getAttribute('d') == 'M 125 27 L 130 22 L 135 27 L 130 32 L 125 27 z' ||
                        group.getAttribute('d') == 'M 113.5 27.5 L 118.5 22.5 L 123.5 27.5 L 118.5 32.5 L 113.5 27.5 z').toBe(true);
                    done();
                };
                chart.series[0].legendShape = 'Diamond';
                chart.refresh();
            });
            it('Checking custom legend position', function (done) {
                chart.loaded = function () {
                    var group = helper_1.getElement('ej2container_chart_legend_element');
                    expect(group.getAttribute('x') == '486' || group.getAttribute('x') == '493').toBe(true);
                    expect(group.getAttribute('y') == '133.5' || group.getAttribute('y') == '136').toBe(true);
                    expect(group.getAttribute('width') == '104' || group.getAttribute('width') == '97').toBe(true);
                    expect(group.getAttribute('height') == '133' || group.getAttribute('height') == '128').toBe(true);
                    done();
                    done();
                };
                chart.legendSettings.position = 'Right';
                chart.refresh();
            });
            it('Pyramid series with group', function (done) {
                chart.loaded = function () {
                    var group = helper_1.getElement('ej2container_Series_0');
                    expect(group.children.length).toBe(4);
                    done();
                };
                chart.legendSettings.position = 'Top';
                chart.series[0].groupTo = '5%';
                chart.refresh();
            });
            it('Pyramid series with surface mode', function (done) {
                chart.loaded = function () {
                    var group = helper_1.getElement('ej2container_Series_0_Point_0');
                    expect(group.getBoundingClientRect().height == 70.29558563232422 ||
                        group.getBoundingClientRect().height == 70.49845886230469);
                    done();
                };
                chart.series[0].pyramidMode = 'Surface';
                chart.refresh();
            });
            it('Pyramid series with surface mode with empty points', function (done) {
                chart.loaded = function () {
                    var group = helper_1.getElement('ej2container_Series_0_Point_0');
                    expect(group.getBoundingClientRect().height == 64.05076599121094 ||
                        group.getBoundingClientRect().height == 64.23561096191406);
                    done();
                };
                chart.series[0].pyramidMode = 'Surface';
                data[1]['y'] = undefined;
                chart.series[0].dataSource = data;
                chart.refresh();
            });
            it('Pyramid with legend click', function (done) {
                chart.loaded = function () {
                    chart.loaded = null;
                    var legendElement = helper_1.getElement('ej2container_chart_legend_shape_0');
                    trigger.clickEvent(legendElement);
                    var group = helper_1.getElement(seriesId);
                    expect(group.children.length).toBe(2);
                    done();
                };
                chart.refresh();
            });
            it('Pyramid tooltip visibility', function (done) {
                chart.loaded = function (args) {
                    var segement = helper_1.getElement(sliceid + 0);
                    trigger.mousemoveEvent(segement, 0, 0, 200, 200);
                    var tooltip = document.getElementById('ej2container_tooltip');
                    expect(tooltip != null).toBe(true);
                    done();
                };
                chart.tooltip.enable = true;
                chart.tooltip.enableAnimation = false;
                chart.refresh();
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
