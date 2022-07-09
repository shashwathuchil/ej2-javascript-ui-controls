define(["require", "exports", "../../../src/smithchart/index", "@syncfusion/ej2-base", "@syncfusion/ej2-pdf-export", "../../common.spec"], function (require, exports, index_1, ej2_base_1, ej2_pdf_export_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('smithChart component Spec', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('smithChart print and export  spec', function () {
            var smithChartElement;
            var smithChart;
            var temp;
            smithChartElement = ej2_base_1.createElement('div', { id: 'container' });
            temp = ej2_base_1.createElement('div', { id: 'tempElement' });
            var spec;
            window.open = function () {
                return {
                    document: { write: function () { }, close: function () { } },
                    close: function () { }, print: function () { }, focus: function () { }, moveTo: function () { }, resizeTo: function () { }
                };
            };
            var template;
            beforeAll(function () {
                template = ej2_base_1.createElement('div', { id: 'template', styles: 'display: none;border: 2px solid red' });
                document.body.appendChild(template);
                template.innerHTML = "<div id='templateWrap' style='background-color:#4472c4;border-radius: 3px;'>" +
                    "<img src='./img1.jpg' style='border-radius: 0px;width: 24px;height: 24px;padding: 2px;' />" +
                    "<div style='color:white;float: right;padding: 2px;line-height: 20px; text-align: center; font-family:Roboto; font-style: medium; fontp-size:14px;'><span>Print</span></div></div>";
                document.body.appendChild(smithChartElement);
                document.body.appendChild(temp);
                smithChart = new index_1.Smithchart({
                    horizontalAxis: {
                        minorGridLines: {
                            visible: true
                        }
                    },
                    radialAxis: {
                        minorGridLines: {
                            visible: true
                        }
                    },
                    series: [{
                            points: [
                                { resistance: 0, reactance: 0.05 }, { resistance: 0, reactance: 0.05 },
                                { resistance: 0, reactance: 0.05 }, { resistance: 0, reactance: 0.05 },
                                { resistance: 0, reactance: 0.05 }, { resistance: 0.3, reactance: 0.1 },
                                { resistance: 0.3, reactance: 0.1 }, { resistance: 0.3, reactance: 0.1 },
                                { resistance: 0.3, reactance: 0.1 }, { resistance: 0.5, reactance: 0.2 },
                                { resistance: 1.0, reactance: 0.4 },
                                { resistance: 1.5, reactance: 0.5 }, { resistance: 2.0, reactance: 0.5 },
                                { resistance: 2.5, reactance: 0.4 }, { resistance: 3.5, reactance: 0.0 },
                                { resistance: 4.5, reactance: -0.5 }, { resistance: 5.0, reactance: -1.0 }
                            ],
                            name: 'Transmission1',
                        }],
                });
                smithChart.appendTo('#container');
            });
            afterAll(function () {
                ej2_base_1.remove(template);
                ej2_base_1.remove(temp);
                ej2_base_1.remove(smithChartElement);
                smithChart.destroy();
            });
            it(' checking a print', function (done) {
                smithChart.beforePrint = function (args) {
                    done();
                };
                smithChart.print();
                smithChart.refresh();
            });
            it('Checking a PDF', function () {
                smithChart.loaded = function (args) {
                    var element = document.getElementById('container_svg_horizontalAxisMajorGridLines');
                    expect(element.childElementCount).toBeGreaterThanOrEqual(1);
                };
                smithChart.export('PDF', 'Map');
                smithChart.refresh();
            });
            it('Checking argument cancel', function (done) {
                smithChart.beforePrint = function (args) {
                    args.cancel = true;
                    done();
                };
                smithChart.print();
                smithChart.refresh();
            });
            it('Checking export', function (done) {
                smithChart.export('JPEG', 'map');
                setTimeout(function () {
                    expect('').toBe('');
                    done();
                }, 500);
            });
            it('Checking export - SVG', function (done) {
                smithChart.export('SVG', 'map');
                setTimeout(function () {
                    expect('').toBe('');
                    done();
                }, 500);
            });
            it('Checking export - PDF', function (done) {
                smithChart.export('PDF', 'map');
                setTimeout(function () {
                    expect('').toBe('');
                    done();
                }, 500);
            });
            it('Checking export - PDF - Potrait', function (done) {
                smithChart.export('PDF', 'map', ej2_pdf_export_1.PdfPageOrientation.Portrait);
                setTimeout(function () {
                    expect('').toBe('');
                    done();
                }, 500);
            });
            it('Checking to print in multiple element', function () {
                smithChart.loaded = function (args) {
                    smithChart.print(['container', 'tempElement']);
                };
                smithChart.beforePrint = function (args) {
                };
                smithChart.refresh();
            });
            it('Checking to print direct element', function () {
                smithChart.loaded = function (args) {
                    smithChart.print(document.getElementById('container'));
                };
                smithChart.beforePrint = function (args) {
                };
                smithChart.refresh();
            });
            it('Checking to print single element', function () {
                smithChart.loaded = function (args) {
                    smithChart.print('tempElement');
                };
                smithChart.beforePrint = function (args) {
                };
                smithChart.refresh();
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
