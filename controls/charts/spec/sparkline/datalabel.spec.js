define(["require", "exports", "../../src/sparkline/index", "../../src/sparkline/utils/helper", "@syncfusion/ej2-base", "../common.spec"], function (require, exports, index_1, helper_1, ej2_base_1, common_spec_1) {
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
    function getLabelOptions(datalabel) {
        return _a = {
                x: parseInt(datalabel.getAttribute('x'), 10),
                y: parseInt(datalabel.getAttribute('y'), 10),
                fill: datalabel.getAttribute('fill')
            },
            _a['font-size'] = parseInt(datalabel.getAttribute('font-size'), 10),
            _a['font-style'] = datalabel.getAttribute('font-style'),
            _a['font-family'] = datalabel.getAttribute('font-family'),
            _a['font-weight'] = datalabel.getAttribute('font-weight'),
            _a['text-anchor'] = datalabel.getAttribute('text-anchor'),
            _a['dominant-baseline'] = datalabel.getAttribute('dominant-baseline'),
            _a.text = datalabel.textContent,
            _a;
        var _a;
    }
    exports.getLabelOptions = getLabelOptions;
    describe('Sparkline ', function () {
        var element;
        var sparkline;
        var id = 'spark-container';
        var ele;
        var d;
        var options;
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('datalabel spec', function () {
            beforeAll(function () {
                element = ej2_base_1.createElement('div', { id: id });
                element.style.width = '400px';
                element.style.height = '100px';
                document.body.appendChild(element);
                sparkline = new index_1.Sparkline({
                    height: '200',
                    width: '600',
                    dataLabelSettings: {
                        visible: ['All']
                    },
                    dataSource: [
                        { xDate: new Date(1994, 1, 1), x: 0, xval: 'January', yval: 527 },
                        { xDate: new Date(1994, 1, 2), x: 1, xval: 'February', yval: 312 },
                        { xDate: new Date(1994, 1, 3), x: 2, xval: 'March', yval: 313 },
                        { xDate: new Date(1994, 1, 4), x: 3, xval: 'April', yval: 423 },
                        { xDate: new Date(1994, 1, 5), x: 4, xval: 'May', yval: 648 },
                        { xDate: new Date(1994, 1, 6), x: 5, xval: 'June', yval: 785 },
                        { xDate: new Date(1994, 1, 7), x: 6, xval: 'July', yval: 423 },
                        { xDate: new Date(1994, 1, 8), x: 7, xval: 'August', yval: 234 },
                    ], yName: 'yval', xName: 'x'
                });
            });
            afterAll(function () {
                sparkline.destroy();
                helper_1.removeElement(id);
            });
            it('Sparkline datalabel checking', function () {
                sparkline.loaded = function (args) {
                    sparkline.loaded = function () { };
                    ele = helper_1.getIdElement(id + '_sparkline_label_text_1');
                    options = getLabelOptions(ele);
                    expect(options.text).toBe('312');
                    expect(options.fill).toBe('#424242');
                    expect(options.x).toBe(89);
                    expect(options.y === 157 || options.y === 159).toBe(true);
                    expect(options['font-size']).toBe(14);
                    expect(options['font-family']).toBe('Roboto, Segoe UI, Noto, Sans-serif');
                    expect(options['font-style']).toBe('Medium');
                    expect(options['font-weight']).toBe('Medium');
                    expect(options['text-anchor']).toBe('middle');
                    expect(options['dominant-baseline']).toBe('middle');
                };
                sparkline.appendTo('#' + id);
            });
            it('Sparkline datalabel index 0 checking', function () {
                ele = helper_1.getIdElement(id + '_sparkline_label_text_0');
                options = getLabelOptions(ele);
                expect(options.text).toBe('527');
                expect(options.x).toBe(5);
                expect(options.y === 83 || options.y === 85).toBe(true);
            });
            it('Sparkline datalabel index 2 checking', function () {
                ele = helper_1.getIdElement(id + '_sparkline_label_text_2');
                options = getLabelOptions(ele);
                expect(options.text).toBe('313');
                expect(options.x).toBe(174);
                expect(options.y === 157 || options.y === 159).toBe(true);
            });
            it('Sparkline datalabel index 3 checking', function () {
                ele = helper_1.getIdElement(id + '_sparkline_label_text_3');
                options = getLabelOptions(ele);
                expect(options.text).toBe('423');
                expect(options.x).toBe(258);
                expect(options.y === 121 || options.y === 119).toBe(true);
            });
            it('Sparkline datalabel index 4 checking', function () {
                ele = helper_1.getIdElement(id + '_sparkline_label_text_4');
                options = getLabelOptions(ele);
                expect(options.text).toBe('648');
                expect(options.x).toBe(342);
                expect(options.y === 43 || options.y === 41).toBe(true);
            });
            it('Sparkline datalabel index 5 checking', function () {
                ele = helper_1.getIdElement(id + '_sparkline_label_text_5');
                options = getLabelOptions(ele);
                expect(options.text).toBe('785');
                expect(options.x).toBe(426);
                expect(options.y === -5 || options.y === -4).toBe(true);
            });
            it('Sparkline datalabel index 6 checking', function () {
                ele = helper_1.getIdElement(id + '_sparkline_label_text_6');
                options = getLabelOptions(ele);
                expect(options.text).toBe('423');
                expect(options.x).toBe(511);
                expect(options.y === 121 || options.y === 119).toBe(true);
            });
            it('Sparkline datalabel index 7 checking', function () {
                ele = helper_1.getIdElement(id + '_sparkline_label_text_7');
                options = getLabelOptions(ele);
                expect(options.text).toBe('234');
                expect(options.x).toBe(595);
                expect(options.y === 184 || options.y === 186).toBe(true);
            });
            it('Sparkline datalabel visible mode start first point with offset checking', function () {
                sparkline.dataLabelSettings.visible = ['Start'];
                sparkline.dataLabelSettings.offset.x = 20;
                sparkline.dataLabelSettings.offset.y = 10;
                sparkline.dataBind();
                ele = helper_1.getIdElement(id + '_sparkline_label_text_0');
                options = getLabelOptions(ele);
                expect(options.text).toBe('527');
                expect(options.x).toBe(25);
                expect(options.y === 93 || options.y === 95).toBe(true);
            });
            it('Sparkline datalabel visible mode start other points not visible checking', function () {
                ele = helper_1.getIdElement(id + '_sparkline_label_text_1');
                expect(ej2_base_1.isNullOrUndefined(ele)).toBe(true);
                ele = helper_1.getIdElement(id + '_sparkline_label_text_2');
                expect(ej2_base_1.isNullOrUndefined(ele)).toBe(true);
                ele = helper_1.getIdElement(id + '_sparkline_label_text_3');
                expect(ej2_base_1.isNullOrUndefined(ele)).toBe(true);
                ele = helper_1.getIdElement(id + '_sparkline_label_text_4');
                expect(ej2_base_1.isNullOrUndefined(ele)).toBe(true);
                ele = helper_1.getIdElement(id + '_sparkline_label_text_5');
                expect(ej2_base_1.isNullOrUndefined(ele)).toBe(true);
                ele = helper_1.getIdElement(id + '_sparkline_label_text_6');
                expect(ej2_base_1.isNullOrUndefined(ele)).toBe(true);
                ele = helper_1.getIdElement(id + '_sparkline_label_text_7');
                expect(ej2_base_1.isNullOrUndefined(ele)).toBe(true);
            });
            it('Sparkline datalabel visible mode end last point with offset checking', function () {
                sparkline.dataLabelSettings.visible = ['End'];
                sparkline.dataLabelSettings.offset.x = -20;
                sparkline.dataLabelSettings.offset.y = 10;
                sparkline.dataBind();
                ele = helper_1.getIdElement(id + '_sparkline_label_text_7');
                options = getLabelOptions(ele);
                expect(options.text).toBe('234');
                expect(options.x).toBe(575);
                expect(options.y === 194 || options.y === 196).toBe(true);
            });
            it('Sparkline datalabel visible mode end other points not visible checking', function () {
                ele = helper_1.getIdElement(id + '_sparkline_label_text_0');
                expect(ej2_base_1.isNullOrUndefined(ele)).toBe(true);
                ele = helper_1.getIdElement(id + '_sparkline_label_text_1');
                expect(ej2_base_1.isNullOrUndefined(ele)).toBe(true);
                ele = helper_1.getIdElement(id + '_sparkline_label_text_2');
                expect(ej2_base_1.isNullOrUndefined(ele)).toBe(true);
                ele = helper_1.getIdElement(id + '_sparkline_label_text_3');
                expect(ej2_base_1.isNullOrUndefined(ele)).toBe(true);
                ele = helper_1.getIdElement(id + '_sparkline_label_text_4');
                expect(ej2_base_1.isNullOrUndefined(ele)).toBe(true);
                ele = helper_1.getIdElement(id + '_sparkline_label_text_5');
                expect(ej2_base_1.isNullOrUndefined(ele)).toBe(true);
                ele = helper_1.getIdElement(id + '_sparkline_label_text_6');
                expect(ej2_base_1.isNullOrUndefined(ele)).toBe(true);
            });
            it('Sparkline datalabel visible mode High max point with offset checking', function () {
                sparkline.dataLabelSettings.visible = ['High'];
                sparkline.dataLabelSettings.offset.x = 0;
                sparkline.dataLabelSettings.offset.y = 60;
                sparkline.dataBind();
                ele = helper_1.getIdElement(id + '_sparkline_label_text_5');
                options = getLabelOptions(ele);
                expect(options.text).toBe('785');
                expect(options.x).toBe(426);
                expect(options.y === 54 || options.y === 56).toBe(true);
            });
            it('Sparkline datalabel visible mode high other points not visible checking', function () {
                ele = helper_1.getIdElement(id + '_sparkline_label_text_0');
                expect(ej2_base_1.isNullOrUndefined(ele)).toBe(true);
                ele = helper_1.getIdElement(id + '_sparkline_label_text_1');
                expect(ej2_base_1.isNullOrUndefined(ele)).toBe(true);
                ele = helper_1.getIdElement(id + '_sparkline_label_text_2');
                expect(ej2_base_1.isNullOrUndefined(ele)).toBe(true);
                ele = helper_1.getIdElement(id + '_sparkline_label_text_3');
                expect(ej2_base_1.isNullOrUndefined(ele)).toBe(true);
                ele = helper_1.getIdElement(id + '_sparkline_label_text_4');
                expect(ej2_base_1.isNullOrUndefined(ele)).toBe(true);
                ele = helper_1.getIdElement(id + '_sparkline_label_text_6');
                expect(ej2_base_1.isNullOrUndefined(ele)).toBe(true);
                ele = helper_1.getIdElement(id + '_sparkline_label_text_7');
                expect(ej2_base_1.isNullOrUndefined(ele)).toBe(true);
            });
            it('Sparkline datalabel visible mode Low min point with offset checking', function () {
                sparkline.dataLabelSettings.visible = ['Low'];
                sparkline.dataLabelSettings.offset.x = 0;
                sparkline.dataLabelSettings.offset.y = 0;
                sparkline.dataBind();
                ele = helper_1.getIdElement(id + '_sparkline_label_text_7');
                options = getLabelOptions(ele);
                expect(options.text).toBe('234');
                expect(options.x).toBe(595);
                expect(options.y === 184 || options.y === 186).toBe(true);
            });
            it('Sparkline datalabel visible mode low other points not visible checking', function () {
                ele = helper_1.getIdElement(id + '_sparkline_label_text_0');
                expect(ej2_base_1.isNullOrUndefined(ele)).toBe(true);
                ele = helper_1.getIdElement(id + '_sparkline_label_text_1');
                expect(ej2_base_1.isNullOrUndefined(ele)).toBe(true);
                ele = helper_1.getIdElement(id + '_sparkline_label_text_2');
                expect(ej2_base_1.isNullOrUndefined(ele)).toBe(true);
                ele = helper_1.getIdElement(id + '_sparkline_label_text_3');
                expect(ej2_base_1.isNullOrUndefined(ele)).toBe(true);
                ele = helper_1.getIdElement(id + '_sparkline_label_text_4');
                expect(ej2_base_1.isNullOrUndefined(ele)).toBe(true);
                ele = helper_1.getIdElement(id + '_sparkline_label_text_5');
                expect(ej2_base_1.isNullOrUndefined(ele)).toBe(true);
                ele = helper_1.getIdElement(id + '_sparkline_label_text_6');
                expect(ej2_base_1.isNullOrUndefined(ele)).toBe(true);
            });
            it('Sparkline datalabel visible mode Negative minus points checking', function () {
                sparkline.dataLabelSettings.visible = ['Negative'];
                sparkline.dataLabelSettings.offset.y = -20;
                sparkline.dataSource = [
                    { xDate: new Date(1994, 1, 1), x: 0, xval: 'January', yval: 527 },
                    { xDate: new Date(1994, 1, 2), x: 1, xval: 'February', yval: 312 },
                    { xDate: new Date(1994, 1, 3), x: 2, xval: 'March', yval: -313 },
                    { xDate: new Date(1994, 1, 4), x: 3, xval: 'April', yval: 423 },
                    { xDate: new Date(1994, 1, 5), x: 4, xval: 'May', yval: -648 },
                    { xDate: new Date(1994, 1, 6), x: 5, xval: 'June', yval: 785 },
                    { xDate: new Date(1994, 1, 7), x: 6, xval: 'July', yval: -423 },
                    { xDate: new Date(1994, 1, 8), x: 7, xval: 'August', yval: 234 },
                ];
                sparkline.dataBind();
                ele = helper_1.getIdElement(id + '_sparkline_label_text_2');
                options = getLabelOptions(ele);
                expect(options.text).toBe('-313');
                expect(options.x).toBe(174);
                expect(options.y === 143 || options.y === 142).toBe(true);
                ele = helper_1.getIdElement(id + '_sparkline_label_text_4');
                options = getLabelOptions(ele);
                expect(options.text).toBe('-648');
                expect(options.x).toBe(342);
                expect(options.y === 187 || options.y === 186).toBe(true);
                ele = helper_1.getIdElement(id + '_sparkline_label_text_6');
                options = getLabelOptions(ele);
                expect(options.text).toBe('-423');
                expect(options.x).toBe(511);
                expect(options.y === 157 || options.y === 156).toBe(true);
            });
            it('Sparkline datalabel visible mode Negative other points not visible checking', function () {
                ele = helper_1.getIdElement(id + '_sparkline_label_text_0');
                expect(ej2_base_1.isNullOrUndefined(ele)).toBe(true);
                ele = helper_1.getIdElement(id + '_sparkline_label_text_1');
                expect(ej2_base_1.isNullOrUndefined(ele)).toBe(true);
                ele = helper_1.getIdElement(id + '_sparkline_label_text_3');
                expect(ej2_base_1.isNullOrUndefined(ele)).toBe(true);
                ele = helper_1.getIdElement(id + '_sparkline_label_text_5');
                expect(ej2_base_1.isNullOrUndefined(ele)).toBe(true);
                ele = helper_1.getIdElement(id + '_sparkline_label_text_7');
                expect(ej2_base_1.isNullOrUndefined(ele)).toBe(true);
            });
            it('Sparkline datalabel customization and format checking', function () {
                sparkline.dataLabelSettings.visible = ['All'];
                sparkline.dataLabelSettings.offset.y = 60;
                sparkline.dataLabelSettings.format = '${xval} : ${yval}';
                sparkline.dataLabelSettings.border = {
                    color: 'green', width: 2
                };
                sparkline.dataLabelSettings.fill = 'green';
                sparkline.dataLabelSettings.opacity = 0.4;
                sparkline.dataLabelSettings.textStyle = {
                    size: '10px', opacity: 1, color: '#999797de', fontFamily: 'fantasy', fontStyle: 'Bold', fontWeight: '100'
                };
                sparkline.dataBind();
                ele = helper_1.getIdElement(id + '_sparkline_label_text_5');
                options = getLabelOptions(ele);
                expect(options.text).toBe('June : 785');
                expect(options.x).toBe(426);
                expect(options.y === 56 || options.y === 57).toBe(true);
                expect(options.fill).toBe('#999797de');
                expect(options['font-size']).toBe(10);
                expect(options['font-family']).toBe('fantasy');
                expect(options['font-style']).toBe('Bold');
                expect(options['font-weight']).toBe('100');
                expect(options['text-anchor']).toBe('middle');
                expect(options['dominant-baseline']).toBe('middle');
                ele = helper_1.getIdElement(id + '_sparkline_label_rect_5');
                expect(ele.getAttribute('fill')).toBe('green');
                expect(ele.getAttribute('stroke')).toBe('green');
                expect(ele.getAttribute('stroke-width')).toBe('2');
                expect(ele.getAttribute('opacity')).toBe('0.4');
                var rect = exports.getRect(ele);
                expect(rect.x === 404 || rect.x === 403).toBe(true);
                expect(rect.y === 47 || rect.y === 48).toBe(true);
                expect(rect.width === 43 || rect.width === 45).toBe(true);
                expect(rect.height === 16 || rect.height === 15).toBe(true);
            });
            it('Sparkline datalabel color for theme highcontrast checking', function () {
                sparkline.theme = 'HighContrast';
                sparkline.dataLabelSettings.textStyle.color = null;
                sparkline.dataBind();
                ele = helper_1.getIdElement(id + '_sparkline_label_text_5');
                options = getLabelOptions(ele);
                expect(options.text).toBe('June : 785');
                expect(options.x).toBe(426);
                expect(options.y === 56 || options.y === 57).toBe(true);
                expect(options['font-size']).toBe(10);
                expect(options['font-family']).toBe('fantasy');
                expect(options['font-style']).toBe('Bold');
                expect(options['font-weight']).toBe('100');
                expect(options['text-anchor']).toBe('middle');
                expect(options['dominant-baseline']).toBe('middle');
            });
            it('Sparkline datalabel color for theme bootstrap4 checking', function () {
                sparkline.theme = 'Bootstrap4';
                sparkline.dataLabelSettings.textStyle.color = null;
                sparkline.dataBind();
                ele = helper_1.getIdElement(id + '_sparkline_label_text_5');
                options = getLabelOptions(ele);
                expect(options.text).toBe('June : 785');
                expect(options.x).toBe(426);
                expect(options.y === 56 || options.y === 57).toBe(true);
                expect(options.fill).toBe('#424242');
                expect(options['font-size']).toBe(10);
                expect(options['font-family']).toBe('fantasy');
                expect(options['font-style']).toBe('Bold');
                expect(options['font-weight']).toBe('100');
                expect(options['text-anchor']).toBe('middle');
                expect(options['dominant-baseline']).toBe('middle');
            });
        });
        describe('Sparkline ', function () {
            beforeAll(function () {
                element = ej2_base_1.createElement('div', { id: id });
                element.style.width = '400px';
                element.style.height = '100px';
                document.body.appendChild(element);
                sparkline = new index_1.Sparkline({
                    height: '200',
                    width: '600',
                    type: 'Line',
                    dataLabelSettings: {
                        visible: ['All'],
                        edgeLabelMode: 'None',
                        format: '${yval} pts',
                        fill: '#fff',
                        border: { color: 'red', width: 1 },
                    },
                    valueType: 'DateTime',
                    dataSource: [
                        { xDate: new Date(1994, 1, 1), x: 0, xval: 'January', yval: 527 },
                        { xDate: new Date(1994, 1, 2), x: 1, xval: 'February', yval: 312 },
                        { xDate: new Date(1994, 1, 3), x: 2, xval: 'March', yval: 313 },
                        { xDate: new Date(1994, 1, 4), x: 3, xval: 'April', yval: 423 },
                        { xDate: new Date(1994, 1, 5), x: 4, xval: 'May', yval: 648 },
                        { xDate: new Date(1994, 1, 6), x: 5, xval: 'June', yval: 785 },
                        { xDate: new Date(1994, 1, 7), x: 6, xval: 'July', yval: 423 },
                        { xDate: new Date(1994, 1, 8), x: 7, xval: 'August', yval: 234 },
                    ], yName: 'yval', xName: 'xDate'
                });
            });
            afterAll(function () {
                sparkline.destroy();
                helper_1.removeElement(id);
            });
            it('Sparkline edge datalabel checking for None', function () {
                sparkline.loaded = function (args) {
                    ele = helper_1.getIdElement(id + '_sparkline_label_text_0');
                    options = getLabelOptions(ele);
                    expect(options.text).toBe('527 pts');
                    expect(options.x).toBe(5);
                    expect(options.y === 81 || options.y === 83).toBe(true);
                    ele = helper_1.getIdElement(id + '_sparkline_label_text_7');
                    options = getLabelOptions(ele);
                    expect(options.text).toBe('234 pts');
                    expect(options.x).toBe(595);
                    expect(options.y === 182 || options.y === 184).toBe(true);
                };
                sparkline.appendTo('#' + id);
            });
            it('Sparkline edge datalabel checking for Shift', function () {
                sparkline.dataLabelSettings.edgeLabelMode = 'Shift';
                sparkline.dataBind();
                ele = helper_1.getIdElement(id + '_sparkline_label_text_0');
                options = getLabelOptions(ele);
                expect(options.text).toBe('527 pts');
                expect(options.x === 28 || options.x === 30).toBe(true);
                expect(options.y === 81 || options.y === 83).toBe(true);
                ele = helper_1.getIdElement(id + '_sparkline_label_text_7');
                options = getLabelOptions(ele);
                expect(options.text).toBe('234 pts');
                expect(options.x === 571 || options.x === 570).toBe(true);
                expect(options.y === 182 || options.y === 184).toBe(true);
            });
            it('Sparkline edge datalabel checking for Hide', function () {
                sparkline.dataLabelSettings.edgeLabelMode = 'Hide';
                sparkline.dataBind();
                ele = helper_1.getIdElement(id + '_sparkline_label_text_0');
                expect(ele).toBeNull();
                ele = helper_1.getIdElement(id + '_sparkline_label_text_7');
                expect(ele).toBeNull();
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
