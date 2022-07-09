define(["require", "exports", "../../../src/smithchart/index", "@syncfusion/ej2-base", "../../common.spec"], function (require, exports, index_1, ej2_base_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Smithchart title properties tesing', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('Title testing', function () {
            var id = 'title';
            var smithchart;
            var ele;
            var spec;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: id, styles: 'height: 512px; width: 512px;' });
                document.body.appendChild(ele);
                smithchart = new index_1.Smithchart({
                    title: {
                        visible: true,
                        text: 'Transmission lines applied for both impedance and impedance',
                        subtitle: {
                            visible: true
                        }
                    }
                }, '#' + id);
            });
            afterAll(function () {
                ej2_base_1.remove(ele);
                smithchart.destroy();
            });
            it('Checking size as null', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_svg');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.width = null;
                smithchart.height = null;
                smithchart.refresh();
            });
            it('Checking size in percentage', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_svg');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.width = '50%';
                smithchart.height = '100%';
                smithchart.refresh();
            });
            it('Checking size with onPropertyChanged', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_svg');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.width = '500';
                smithchart.height = '500';
                smithchart.dataBind();
            });
            it('Checking border with onPropertyChanged', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_svg');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.border.width = 2;
                smithchart.dataBind();
            });
            it('Checking background with onPropertyChanged', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_svg');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.background = '';
                smithchart.dataBind();
            });
            it('Checking title element', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Title_Group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.title.text = 'Transmission lines applied for both impedance and impedance';
                smithchart.title.visible = true;
                smithchart.refresh();
            });
            it('Checking title element with description', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Title_Group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.title.text = 'Transmission lines applied for both impedance and impedance';
                smithchart.title.description = 'It represents the smithchart title';
                smithchart.title.visible = true;
                smithchart.refresh();
            });
            it('Checking sub-title element', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Title_Group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(2);
                };
                smithchart.title.subtitle.text = 'Smithchart subtitle';
                smithchart.title.subtitle.visible = true;
                smithchart.refresh();
            });
            it('Checking sub-title element with description', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Title_Group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(2);
                };
                smithchart.title.subtitle.text = 'Smithchart subtitle';
                smithchart.title.subtitle.description = 'It represents the smithchart subtitle';
                smithchart.title.subtitle.visible = true;
                smithchart.refresh();
            });
            it('Title alignment as Near', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Title_Group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.title.textAlignment = 'Near';
                smithchart.refresh();
            });
            it('Title alignment as Center', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Title_Group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.title.textAlignment = 'Center';
                smithchart.refresh();
            });
            it('Title alignment as Far', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Title_Group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.title.textAlignment = 'Far';
                smithchart.refresh();
            });
            it('Title alignment as Near - set enableTrim as True - set maximumWidth', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Title_Group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.title.textAlignment = 'Near';
                smithchart.title.enableTrim = true;
                smithchart.title.maximumWidth = 100;
                smithchart.refresh();
            });
            it('Title alignment as Center - set enableTrim as True - set maximumWidth', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Title_Group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.title.textAlignment = 'Center';
                smithchart.title.enableTrim = true;
                smithchart.title.maximumWidth = 100;
                smithchart.refresh();
            });
            it('Title alignment as Center - set enableTrim as True - set maximum width as 250', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Title_Group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.title.textAlignment = 'Center';
                smithchart.title.enableTrim = true;
                smithchart.title.text = 'SmithchartTitle';
                smithchart.title.maximumWidth = 200;
                smithchart.refresh();
            });
            it('Title alignment as Far - set enableTrim as True - set maximumWidth', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Title_Group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.title.textAlignment = 'Far';
                smithchart.title.enableTrim = true;
                smithchart.title.maximumWidth = 100;
                smithchart.refresh();
            });
            it('SubTitle alignment as Near', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Title_Group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.title.subtitle.textAlignment = 'Near';
                smithchart.refresh();
            });
            it('SubTitle alignment as Far', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Title_Group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.title.subtitle.textAlignment = 'Far';
                smithchart.refresh();
            });
            it('SubTitle alignment as Center', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Title_Group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.title.subtitle.textAlignment = 'Center';
                smithchart.refresh();
            });
            it('SubTitle alignment as Near - set enableTrim as True - set maximumWidth', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Title_Group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.title.subtitle.textAlignment = 'Near';
                smithchart.title.subtitle.enableTrim = true;
                smithchart.title.subtitle.maximumWidth = 50;
                smithchart.refresh();
            });
            it('SubTitle alignment as Far - set enableTrim as True - set maximumWidth', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Title_Group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.title.subtitle.textAlignment = 'Far';
                smithchart.title.subtitle.enableTrim = true;
                smithchart.title.subtitle.maximumWidth = 50;
                smithchart.refresh();
            });
            it('SubTitle alignment as Center - set enableTrim as True - set maximumWidth', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Title_Group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.title.subtitle.textAlignment = 'Center';
                smithchart.title.subtitle.enableTrim = true;
                smithchart.title.subtitle.maximumWidth = 50;
                smithchart.refresh();
            });
            it('Checking border width for smithchart', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_Title_Group');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.border.width = 2;
                smithchart.refresh();
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
