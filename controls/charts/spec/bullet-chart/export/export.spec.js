define(["require", "exports", "@syncfusion/ej2-base", "../../../src/index", "@syncfusion/ej2-pdf-export", "../../common.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, index_1, ej2_pdf_export_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Bullet Chart Control', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('Print Utils for BulletChart', function () {
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
                chartObj = new index_1.BulletChart({
                    dataSource: [{ value: 4, target: 4 }],
                    valueField: 'value', targetField: 'target',
                    minimum: 0, maximum: 20, interval: 5,
                    animation: { enable: false },
                    ranges: [{ end: 5, color: 'red' }, { end: 15, color: 'yellow' }, { end: 20, color: 'green' }],
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
            it('Checking comparative bar content', function (done) {
                chartObj.beforePrint = function (args) {
                    expect(args.htmlContent.outerHTML.indexOf('exportContainer_svg_ComparativeMeasure_0') > -1).toBe(true);
                    done();
                };
                chartObj.refresh();
            });
            it('Checking argument cancel', function (done) {
                chartObj.beforePrint = function (args) {
                    args.cancel = true;
                    expect(args.htmlContent.outerHTML.indexOf('exportContainer_svg_ComparativeMeasure_0') > -1).toBe(true);
                    done();
                };
                chartObj.refresh();
            });
            it('Checking to print in multiple element', function (done) {
                chartObj.loaded = function (args) {
                    chartObj.print(['exportContainer', 'exportContainer']);
                };
                chartObj.beforePrint = function (args) {
                    expect(args.htmlContent.outerHTML.indexOf('exportContainer_svg_ComparativeMeasure_0') > -1).toBe(true);
                    done();
                };
                chartObj.refresh();
            });
            it('Checking export', function (done) {
                chartObj.export('JPEG', 'bulletchart');
                setTimeout(function () {
                    expect('').toBe('');
                    done();
                }, 500);
            });
            it('Checking export - SVG', function (done) {
                chartObj.export('SVG', 'bulletchart');
                setTimeout(function () {
                    expect('').toBe('');
                    done();
                }, 500);
            });
            it('Checking export - PDF', function (done) {
                chartObj.export('PDF', 'bulletchart');
                setTimeout(function () {
                    expect('').toBe('');
                    done();
                }, 500);
            });
            it('Checking export - PDF - Potrait', function (done) {
                chartObj.export('PDF', 'bulletchart', ej2_pdf_export_1.PdfPageOrientation.Portrait);
                setTimeout(function () {
                    expect('').toBe('');
                    done();
                }, 500);
            });
            it('Checking export - PDF - multi controls', function (done) {
                chartObj.export('PDF', 'bulletchart', ej2_pdf_export_1.PdfPageOrientation.Portrait, [chartObj, chartObj], 500, 450);
                setTimeout(function () {
                    expect('').toBe('');
                    done();
                }, 500);
            });
            it('Checking export - PDF - multi controls width out size', function (done) {
                chartObj.export('PDF', 'bulletchart', ej2_pdf_export_1.PdfPageOrientation.Portrait, [chartObj, chartObj]);
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
