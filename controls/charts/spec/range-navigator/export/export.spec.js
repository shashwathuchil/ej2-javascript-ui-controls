define(["require", "exports", "@syncfusion/ej2-base", "../../../src/index", "@syncfusion/ej2-pdf-export", "../../common.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, index_1, ej2_pdf_export_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Range Navigator Control', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('Print Utils for Chart', function () {
            var chartObj;
            var chartElement;
            chartElement = ej2_base_1.createElement('div', { id: 'exportContainer' });
            document.body.appendChild(chartElement);
            window.open = function () {
                return {
                    document: { write: function () { }, close: function () { } },
                    close: function () { }, print: function () { }, focus: function () { }, moveTo: function () { }, resizeTo: function () { }
                };
            };
            beforeAll(function () {
                chartObj = new index_1.RangeNavigator({
                    series: [{
                            dataSource: [{ x: 1000, y: 70 }, { x: 2000, y: -40 },
                                { x: 3000, y: 70 }, { x: 4000, y: 60 },
                                { x: 5000, y: -50 }, { x: 6000, y: -40 },
                                { x: 7000, y: 40 }, { x: 8000, y: 70 }], xName: 'x', yName: 'y'
                        }],
                    loaded: function (args) {
                        chartObj.print();
                    }
                });
                chartObj.appendTo('#exportContainer');
            });
            afterAll(function () {
                chartObj.destroy();
                chartElement.remove();
            });
            it('Checking slider content', function (done) {
                chartObj.beforePrint = function (args) {
                    expect(args.htmlContent.outerHTML.indexOf('exportContainer_rightUnSelectedArea') > -1).toBe(true);
                    done();
                };
                chartObj.refresh();
            });
            it('Checking argument cancel', function (done) {
                chartObj.beforePrint = function (args) {
                    args.cancel = true;
                    expect(args.htmlContent.outerHTML.indexOf('exportContainer_rightUnSelectedArea') > -1).toBe(true);
                    done();
                };
                chartObj.refresh();
            });
            it('Checking to print in multiple element', function (done) {
                chartObj.loaded = function (args) {
                    chartObj.print(['exportContainer', 'exportContainer']);
                };
                chartObj.beforePrint = function (args) {
                    expect(args.htmlContent.outerHTML.indexOf('exportContainer_rightUnSelectedArea') > -1).toBe(true);
                    done();
                };
                chartObj.refresh();
            });
            it('Checking export', function (done) {
                chartObj.export('JPEG', 'chart');
                setTimeout(function () {
                    expect('').toBe('');
                    done();
                }, 500);
            });
            it('Checking export - SVG', function (done) {
                chartObj.export('SVG', 'chart');
                setTimeout(function () {
                    expect('').toBe('');
                    done();
                }, 500);
            });
            it('Checking export - PDF', function (done) {
                chartObj.export('PDF', 'chart');
                setTimeout(function () {
                    expect('').toBe('');
                    done();
                }, 500);
            });
            it('Checking export - PDF - Potrait', function (done) {
                chartObj.export('PDF', 'chart', ej2_pdf_export_1.PdfPageOrientation.Portrait);
                setTimeout(function () {
                    expect('').toBe('');
                    done();
                }, 500);
            });
            it('Checking export - PDF - multi controls', function (done) {
                chartObj.export('PDF', 'chart', ej2_pdf_export_1.PdfPageOrientation.Portrait, [chartObj, chartObj], 500, 450);
                setTimeout(function () {
                    expect('').toBe('');
                    done();
                }, 500);
            });
            it('Checking export - PDF - multi controls width out size', function (done) {
                chartObj.export('PDF', 'chart', ej2_pdf_export_1.PdfPageOrientation.Portrait, [chartObj, chartObj]);
                setTimeout(function () {
                    expect('').toBe('');
                    done();
                }, 500);
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
