define(["require", "exports", "@syncfusion/ej2-base", "../../../src/accumulation-chart/renderer/funnel-series", "../../../src/accumulation-chart/accumulation", "../../../src/accumulation-chart/renderer/legend", "../../../src/common/utils/helper", "../../common.spec", "../../../src/accumulation-chart/renderer/dataLabel", "../../../src/accumulation-chart/user-interaction/selection", "../../../src/accumulation-chart/user-interaction/tooltip", "../../chart/base/events.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, funnel_series_1, accumulation_1, legend_1, helper_1, common_spec_1, dataLabel_1, selection_1, tooltip_1, events_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    accumulation_1.AccumulationChart.Inject(funnel_series_1.FunnelSeries, legend_1.AccumulationLegend, dataLabel_1.AccumulationDataLabel, selection_1.AccumulationSelection, tooltip_1.AccumulationTooltip);
    var data = [{ x: 'Renewed', y: 18.2, text: '18.20%' },
        { x: 'Subscribe', y: 27.3, text: '27.3%' },
        { x: 'Support', y: 55.9, text: '55.9%' },
        { x: 'Downloaded', y: 76.8, text: '76.8%' },
        { x: 'Visited', y: 100, text: '100%' }];
    var dataPoints = [{ 'x': 'USA', y: 46, text: 'United States of America: 46' },
        { 'x': 'China', y: 26, text: 'China: 26' },
        { 'x': 'Russia', y: 19, text: 'Russia: 19' },
        { 'x': 'Germany', y: 17, text: 'Germany: 17' },
        { 'x': 'Japan', y: 12, text: 'Japan: 12' },
        { 'x': 'France', y: 10, text: 'France: 10' },
        { 'x': 'South Korea', y: 9, text: 'South Korea: 9' },
        { 'x': 'Great Britain', y: 27, text: 'Great Britain: 27' },
        { 'x': 'Australia', y: 8, text: 'Australia: 8' },
        { 'x': 'Netherlands', y: 8, text: 'Netherlands: 8' },
        { 'x': 'NewZealand', y: 4, text: 'New Zealand: 4' },
        { 'x': 'Uzbekistan', y: 4, text: 'Uzbekistan: 4' },
        { 'x': 'Switzerland', y: 3, text: 'Switzerland: 3' },
        { 'x': 'South Africa', y: 2, text: 'South Africa: 2' }];
    describe('Accumulation Chart Control', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('Funnel Series checking', function () {
            var ele;
            var slice;
            var loaded;
            var id = 'ej2container';
            var seriesId = id + '_Series_0';
            var sliceid = id + '_Series_0' + '_Point_';
            var tooltipid = id + '_1_content';
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
                            type: 'Funnel'
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
            it('Empty funnel series', function (done) {
                chart.loaded = function () {
                    var group = helper_1.getElement(seriesId);
                    expect(group != null).toBe(true);
                    expect(group.childNodes.length).toBe(0);
                    done();
                };
                chart.refresh();
            });
            it('Funnel series with points', function (done) {
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
            it('Checking with percentage value for funnelSeries point', function (done) {
                chart.loaded = function () {
                    var point = chart.visibleSeries[0].points[2];
                    expect(point.percentage != null).toBe(true);
                    expect(point.percentage).toBe(20.09);
                    done();
                };
                chart.refresh();
            });
            it('Checking default funnel size', function (done) {
                var group = helper_1.getElement(seriesId);
                var bounds = group.getBoundingClientRect();
                expect((bounds.width === 464 || bounds.width == 468) && (bounds.height === 304 || bounds.height === 308)).toBe(true);
                done();
            });
            it('Checking default neck size', function (done) {
                var bounds = document.getElementById('ej2container_Series_0_Point_0').getBoundingClientRect();
                expect(bounds.width === 116 && (bounds.height === 19.887859344482422 ||
                    bounds.height === 23.899993896484375 || bounds.height == 19.887847900390625)).toBe(true);
                bounds = document.getElementById('ej2container_Series_0_Point_1').getBoundingClientRect();
                expect(bounds.width === 116 && (bounds.height === 29.831787109375 || bounds.height === 33.83178710937)).toBe(true);
                bounds = document.getElementById('ej2container_Series_0_Point_2').getBoundingClientRect();
                expect(bounds.width === 169.1215057373047 && (bounds.height === 61.0841064453125 || bounds.height === 65.0841064453125)).toBe(true);
                done();
            });
            it('Checking funnel series without data labels', function (done) {
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
            it('Checking default legend shape', function (done) {
                var group = helper_1.getElement('ej2container_chart_legend_shape_0');
                expect(group.getAttribute('d') === 'M 123 22.5 L 118 32.5 L 113 22.5 L 123 22.5 z' ||
                    group.getAttribute('d') === 'M 123.5 21.5 L 118.5 31.5 L 113.5 21.5 L 123.5 21.5 z' ||
                    group.getAttribute('d') === 'M 135 22 L 130 32 L 125 22 L 135 22 z' ||
                    group.getAttribute('d') == 'M 123.5 22.5 L 118.5 32.5 L 113.5 22.5 L 123.5 22.5 z').toBe(true);
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
                chart.loaded = null;
                done();
            });
            it('Funnel series with empty and valid points', function (done) {
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
            it('Funnel series with average empty point mode', function (done) {
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
            it('Funnel series with zero empty point mode', function (done) {
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
            it('Funnel series - with a value as 0', function (done) {
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
            it('Funnel segments with gaps', function (done) {
                chart.loaded = function () {
                    var group = helper_1.getElement('ej2container_Series_0_Point_2');
                    var bounds = group.getBoundingClientRect();
                    expect(Math.floor(bounds.top) === 255 || Math.floor(bounds.top) == 254).toBe(true);
                    expect(Math.floor(bounds.height) == 44).toBe(true);
                    done();
                };
                chart.series[0].gapRatio = 0.2;
                chart.refresh();
            });
            it('Funnel series with custom funnel size', function (done) {
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
            it('Funnel series with custom neck size', function (done) {
                chart.loaded = function () {
                    var group = helper_1.getElement('ej2container_Series_0_Point_2');
                    var bounds = group.getBoundingClientRect();
                    expect(Math.floor(bounds.height) == 44).toBe(true);
                    group = helper_1.getElement('ej2container_Series_0_Point_3');
                    bounds = group.getBoundingClientRect();
                    expect(Math.floor(bounds.height) == 61).toBe(true);
                    done();
                };
                chart.series[0].width = '80%';
                chart.series[0].height = '80%';
                chart.series[0].neckWidth = '50%';
                chart.series[0].neckHeight = '50%';
                chart.refresh();
            });
            it('Funnel series as an inverted triangle', function (done) {
                chart.loaded = function () {
                    var group = helper_1.getElement(sliceid + '0');
                    expect(group.getAttribute('d') === 'M284.822429906542 337.0630841121495 L315.1775700934579 337.0630841121495 L300 355.25 L300 355.25 L300 355.25 L300 355.25' ||
                        group.getAttribute('d') === 'M284.822429906542 337.0630841121495 L315.1775700934579 337.0630841121495 L300 355.25 L300 355.25 L300 355.25 L300 355.25');
                    done();
                };
                chart.series[0].neckWidth = '0%';
                chart.series[0].neckHeight = '0%';
                chart.series[0].gapRatio = 0;
                chart.refresh();
            });
            it('Funnel series without neck and with a base', function (done) {
                chart.loaded = function () {
                    var group = helper_1.getElement(sliceid + '0');
                    expect(group.getAttribute('d') === 'M230.61682242990653 337.0630841121495 L369.3831775700935 337.0630841121495 L358 355.25 L358 355.25 L242 355.25 L242 355.25'
                        || group.getAttribute('d') === 'M230.61682242990653 337.0630841121495 L369.3831775700935 337.0630841121495 L358 355.25 L358 355.25 L242 355.25 L242 355.25');
                    done();
                };
                chart.series[0].neckWidth = '20%';
                chart.series[0].neckHeight = '0%';
                chart.refresh();
            });
            it('Funnel series with default data label', function (done) {
                chart.loaded = function () {
                    var group = helper_1.getElement('ej2container_datalabel_Series_0_text_3');
                    expect(group.getAttribute('x') === '291' ||
                        group.getAttribute('x') === '291.5');
                    expect(group.getAttribute('y') === '220.80251617541336' ||
                        group.getAttribute('y') === '219.55050323508266');
                    done();
                };
                chart.series[0].width = '80%';
                chart.series[0].height = '80%';
                chart.series[0].neckWidth = chart.series[0].neckWidth = '20%';
                chart.series[0].gapRatio = 0;
                chart.series[0].dataLabel.visible = true;
                chart.refresh();
            });
            it('Funnel series with inside labels', function (done) {
                chart.loaded = function () {
                    var group = helper_1.getElement('ej2container_datalabel_Series_0_text_3');
                    expect(group.getAttribute('x') === '291' ||
                        group.getAttribute('x') === '291.5');
                    expect(group.getAttribute('y') === '220.80251617541336' ||
                        group.getAttribute('y') === '219.55050323508266');
                    done();
                };
                chart.series[0].dataLabel.position = 'Inside';
                chart.refresh();
            });
            it('Funnel series with outside labels', function (done) {
                chart.loaded = function () {
                    var group = helper_1.getElement('ej2container_datalabel_Series_0_text_3');
                    expect(group.getAttribute('x')).toBe('535');
                    expect(group.getAttribute('y') === '220.0535226455787' ||
                        group.getAttribute('y') === '218.801509705248').toBe(true);
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
                    expect(group.getAttribute('d') == 'M 403.9392523364486 282.31962616822426 L 445.4392523364486 282.31962616822426 L 455.4392523364486 282.31962616822426' ||
                        group.getAttribute('d') === 'M 403.9392523364486 282.00841121495324 L 445.4392523364486 282.00841121495324 L 455.4392523364486 282.00841121495324').toBe(true);
                    done();
                    chart.series[0].dataLabel.connectorStyle = { length: null };
                    chart.loaded = null;
                };
                chart.series[0].dataLabel.position = 'Outside';
                chart.series[0].dataLabel.connectorStyle = { length: '40px' };
                chart.refresh();
            });
            it('Data labels with custom connector', function (done) {
                chart.loaded = function () {
                    var group = helper_1.getElement('ej2container_datalabel_Series_0_connector_1');
                    expect(group.getAttribute('fill')).toBe('transparent');
                    expect(group.getAttribute('stroke')).toBe('red');
                    expect(group.getAttribute('stroke-width')).toBe('5');
                    expect(group.getAttribute('stroke-dasharray')).toBe('');
                    expect(group.getAttribute('d') == 'M360.20532319391634,351.89176172370094 L363.29907319391634,350.8504383185467 L366.39282319391634,349.8091149133925 L369.48657319391634,348.76779150823836 L372.58032319391634,347.72646810308413 L375.67407319391634,346.6851446979299 L378.76782319391634,345.64382129277567 L381.86157319391634,344.60249788762155 L384.95532319391634,343.5611744824673 L388.04907319391634,342.5198510773131 L391.14282319391634,341.47852767215886 L394.23657319391634,340.4372042670047 L397.33032319391634,339.39588086185046 L400.42407319391634,338.3545574566962 L403.51782319391634,337.31323405154205 L406.61157319391634,336.2719106463879 L409.70532319391634,335.23058724123365' ||
                        group.getAttribute('d') == 'M360.20532319391634,351.7816223067174 L363.29907319391634,350.9282213772708 L366.39282319391634,350.07482044782427 L369.48657319391634,349.22141951837773 L372.58032319391634,348.36801858893114 L375.67407319391634,347.5146176594846 L378.76782319391634,346.66121673003806 L381.86157319391634,345.80781580059147 L384.95532319391634,344.95441487114493 L388.04907319391634,344.1010139416984 L391.14282319391634,343.2476130122518 L394.23657319391634,342.39421208280527 L397.33032319391634,341.54081115335873 L400.42407319391634,340.68741022391214 L403.51782319391634,339.8340092944656 L406.61157319391634,338.980608365019 L409.70532319391634,338.1272074355725').toBe(true);
                    done();
                    chart.series[0].dataLabel.connectorStyle = { color: null, length: null, type: 'Line', width: 1 };
                    chart.loaded = null;
                    data[0]['y'] = 18.2;
                    data[1]['y'] = 27.3;
                };
                data[0]['y'] = 2;
                data[1]['y'] = 2;
                chart.series[0].dataSource = data;
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
                    expect(group.getAttribute('x')).toBe('528.5901162790698');
                    expect(group.getAttribute('y') === '219.55988372093023'
                        || group.getAttribute('y') === '218.30717054263565');
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
                    expect(group.getAttribute('y') == '254.70691318327977' ||
                        group.getAttribute('y') === '256.6099678456592').toBe(true);
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
                    expect(group.getAttribute('y') === '265.8065916398714' ||
                        group.getAttribute('y') === '264.683922829582').toBe(true);
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
                    expect(group.getAttribute('y') === '264.8065916398714' ||
                        group.getAttribute('y') === '263.683922829582').toBe(true);
                    done();
                };
                data[3]['y'] = 5;
                data[2]['y'] = 5;
                chart.series[0].dataLabel.position = 'Outside';
                chart.refresh();
            });
            it('Checking labels at outside, when funnel width is 100%', function (done) {
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
            it('Explode a funnel segment', function (done) {
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
                };
                chart.series[0].explode = true;
                chart.selectionMode = 'Point';
                chart.refresh();
            });
            it('Checking custom legend shape', function (done) {
                chart.loaded = function () {
                    var group = helper_1.getElement('ej2container_chart_legend_shape_0');
                    expect(group.getAttribute('d') === 'M 113 27.5 L 118 22.5 L 123 27.5 L 118 32.5 L 113 27.5 z' ||
                        group.getAttribute('d') === 'M 113.5 26.5 L 118.5 21.5 L 123.5 26.5 L 118.5 31.5 L 113.5 26.5 z' ||
                        group.getAttribute('d') === 'M 125 27 L 130 22 L 135 27 L 130 32 L 125 27 z' ||
                        group.getAttribute('d') == 'M 113.5 27.5 L 118.5 22.5 L 123.5 27.5 L 118.5 32.5 L 113.5 27.5 z').toBe(true);
                    done();
                };
                chart.series[0].explodeOffset = null;
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
                };
                chart.legendSettings.position = 'Right';
                chart.refresh();
            });
            it('Funnel series with group', function (done) {
                chart.loaded = function () {
                    var group = helper_1.getElement('ej2container_Series_0');
                    expect(group.children.length).toBe(4);
                    done();
                };
                chart.legendSettings.position = 'Top';
                chart.series[0].groupTo = '5%';
                chart.series[0].dataLabel.position = 'Inside';
                chart.refresh();
            });
            it('Funnel with legend click', function (done) {
                chart.loaded = function () {
                    chart.loaded = null;
                    var legendElement = helper_1.getElement('ej2container_chart_legend_shape_0');
                    trigger.clickEvent(legendElement);
                    var group = helper_1.getElement(seriesId);
                    expect(group.children.length).toBe(3);
                    trigger.clickEvent(legendElement);
                    done();
                };
                chart.refresh();
            });
            it('Funnel tooltip visibility', function (done) {
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
            it('Legend click on Visible series', function (done) {
                loaded = function (args) {
                    chart.loaded = null;
                    var legendElement;
                    var legendId = id + '_chart_legend';
                    legendElement = document.getElementById(legendId + '_text_' + 0);
                    trigger.clickEvent(legendElement);
                    var group = helper_1.getElement('ej2container_datalabel_Series_0_text_2');
                    expect(group.textContent).toBe('Visited : 100');
                    expect(chart.series[0].visible).toBe(true);
                    done();
                };
                chart.legendSettings = { visible: true };
                chart.series[0].dataLabel = { visible: true };
                chart.textRender = function (args) {
                    args.text = args.point.x + ' : ' + args.text;
                };
                chart.loaded = loaded;
                chart.refresh();
            });
            it('Checking overlapped labels are placed at outside left position for position as inside', function (done) {
                loaded = function (args) {
                    var group = helper_1.getElement('ej2container_datalabel_Series_0_text_6');
                    expect(group.getAttribute('x') === '47.20472756410254' || group.getAttribute('x') === '478.79527243589746').toBe(true);
                    expect(group.getAttribute('y') === '202.79615384615386' ||
                        group.getAttribute('y') === '180.75128205128203').toBe(true);
                    done();
                };
                chart.series[0].dataSource = dataPoints;
                chart.series[0].groupTo = 'null';
                chart.series[0].width = '50%';
                chart.series[0].height = '50%';
                chart.series[0].neckWidth = '15%';
                chart.series[0].neckHeight = '18%';
                chart.loaded = loaded;
                chart.refresh();
            });
            it('Checking data label with Legend position', function (done) {
                loaded = function (args) {
                    var group = helper_1.getElement('ej2container_datalabel_Series_0_text_11');
                    expect(group.getAttribute('x') === '116.5' || group.getAttribute('x') === '548.2884615384615').toBe(true);
                    expect(group.getAttribute('y') === '115.57051282051282' ||
                        group.getAttribute('y') === '84.35897435897436').toBe(true);
                    done();
                };
                chart.legendSettings.position = 'Left';
                chart.loaded = loaded;
                chart.refresh();
            });
            it('Check the default connector line at left outside', function (done) {
                chart.loaded = function () {
                    var group = helper_1.getElement('ej2container_datalabel_Series_0_connector_11');
                    expect(group.getAttribute('fill')).toBe('transparent');
                    expect(group.getAttribute('stroke')).toBe('#404041');
                    expect(group.getAttribute('stroke-width')).toBe('1');
                    expect(group.getAttribute('stroke-dasharray')).toBe('');
                    done();
                };
                chart.refresh();
            });
            it('Datalabel trimmed label mouse move tooltip', function () {
                var datalabel;
                datalabel = helper_1.getElement('ej2container_datalabel_Series_0_text_10');
                trigger.mousemoveEvent(datalabel, 0, 0, 520, 210);
                var tooltip = helper_1.getElement('ej2container_EJ2_Datalabel_Tooltip');
                expect(tooltip).not.toBe(null);
                expect(tooltip.textContent).toBe('NewZealand : 4');
                helper_1.removeElement('ej2container_EJ2_Datalabel_Tooltip');
            });
            it('Checking overlapped labels are placed at outside left position for position as outside ', function (done) {
                loaded = function (args) {
                    var group = helper_1.getElement('ej2container_datalabel_Series_0_text_6');
                    expect(group.getAttribute('x') === '448' || group.getAttribute('x') === '478.79527243589746').toBe(true);
                    expect(group.getAttribute('y') === '215.4' ||
                        group.getAttribute('y') === '209.09846153846155').toBe(true);
                    done();
                };
                chart.series[0].dataLabel.position = 'Outside';
                chart.legendSettings.position = 'Top';
                chart.height = '450';
                chart.series[0].dataLabel.name = 'text';
                chart.title = 'Website Visitors';
                chart.loaded = loaded;
                chart.refresh();
            });
            it('Checking Funnel default explode for outside left position', function (done) {
                loaded = function (args) {
                    var value = helper_1.getElement('ej2container_Series_0_Point_4');
                    trigger.clickEvent(value);
                    expect(value.getAttribute('transform') == 'translate(-25, 0)' || value.getAttribute('transform') == 'translate(25, 0)').toBe(true);
                    done();
                };
                chart.series[0].explode = true;
                chart.series[0].explodeIndex = null;
                chart.series[0].explodeOffset = '25px';
                chart.enableAnimation = false;
                chart.loaded = loaded;
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
