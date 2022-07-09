define(["require", "exports", "../../../src/smithchart/index", "@syncfusion/ej2-base", "../../common.spec"], function (require, exports, index_1, ej2_base_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    function getElementByID(id) {
        return document.getElementById(id);
    }
    exports.getElementByID = getElementByID;
    describe('Smithchart axis properties tesing', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('Axis testing', function () {
            var id = 'axis';
            var smithchart;
            var ele;
            var spec;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: id, styles: 'height: 512px; width: 512px;' });
                document.body.appendChild(ele);
                smithchart = new index_1.Smithchart({}, '#' + id);
            });
            afterAll(function () {
                ej2_base_1.remove(ele);
                smithchart.destroy();
            });
            it('Horizontal axis minorGridLines as True in impedance type', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_svg_horizontalAxisMinorGridLines');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.horizontalAxis.minorGridLines.visible = true;
                smithchart.refresh();
            });
            it('Radial axis minorGridLines as True in impedance type', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_svg_radialAxisMinorGridLines');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.radialAxis.minorGridLines.visible = true;
                smithchart.refresh();
            });
            it('Horizontal axis minorGridLines as True in admittance type', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_svg_horizontalAxisMinorGridLines');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.renderType = 'Admittance';
                smithchart.horizontalAxis.minorGridLines.visible = true;
                smithchart.refresh();
            });
            it('Radial axis minorGridLines as True in admittance type', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_svg_radialAxisMinorGridLines');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.renderType = 'Admittance';
                smithchart.radialAxis.minorGridLines.visible = true;
                smithchart.refresh();
            });
            it('Horizontal axis labelPosition as inside', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_HAxisLabels');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.horizontalAxis.labelPosition = 'Inside';
                smithchart.refresh();
            });
            it('Radial axis labelPosition as inside', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_RAxisLabels');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.radialAxis.labelPosition = 'Inside';
                smithchart.refresh();
            });
            it('Horizontal axis labelIntersectAction as none', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_HAxisLabels');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.horizontalAxis.labelIntersectAction = 'None';
                smithchart.refresh();
            });
            it('Radial axis labelIntersectAction as none', function () {
                smithchart.loaded = function (args) {
                    var element = document.getElementById(smithchart.element.id + '_RAxisLabels');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithchart.radialAxis.labelIntersectAction = 'None';
                smithchart.refresh();
            });
            it('Checking Resize', function () {
                smithchart.smithchartOnResize();
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
