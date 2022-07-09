define(["require", "exports", "@syncfusion/ej2-base", "../../../src/accumulation-chart/accumulation", "../../../src/accumulation-chart/renderer/legend", "../../../src/accumulation-chart/renderer/dataLabel", "../../../src/accumulation-chart/annotation/annotation", "@syncfusion/ej2-pdf-export", "../../../src/chart/print-export/export", "../../common.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, accumulation_1, legend_1, dataLabel_1, annotation_1, ej2_pdf_export_1, export_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    accumulation_1.AccumulationChart.Inject(annotation_1.AccumulationAnnotation, dataLabel_1.AccumulationDataLabel, legend_1.AccumulationLegend, export_1.Export);
    describe('Chart Control', function () {
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
            var element;
            var chartElement;
            chartElement = ej2_base_1.createElement('div', { id: 'container' });
            window.open = function () {
                return {
                    document: { write: function () { }, close: function () { } },
                    close: function () { }, print: function () { }, focus: function () { }, moveTo: function () { }, resizeTo: function () { }
                };
            };
            beforeAll(function () {
                var template = ej2_base_1.createElement('div', { id: 'template', styles: 'display: none;border: 2px solid red' });
                document.body.appendChild(template);
                template.innerHTML = "<div id='templateWrap' style='background-color:#4472c4;border-radius: 3px;'>" +
                    "<img src='../base/spec/img/img1.jpg' style='border-radius: 0px;width: 24px;height: 24px;padding: 2px;' />" +
                    "<div style='color:white;float: right;padding: 2px;line-height: 20px; text-align: center; font-family:Roboto; font-style: medium; fontp-size:14px;'><span>Print</span></div></div>";
                document.body.appendChild(chartElement);
                chartObj = new accumulation_1.AccumulationChart({
                    series: [{
                            animation: { enable: false },
                            name: 'ChartSeries', dataSource: [{ x: 1000, y: 70 }, { x: 2000, y: -40 },
                                { x: 3000, y: 70 }, { x: 4000, y: 60 },
                                { x: 5000, y: -50 }, { x: 6000, y: -40 },
                                { x: 7000, y: 40 }, { x: 8000, y: 70 }], xName: 'x', yName: 'y'
                        }],
                    width: '800',
                    title: 'Chart TS Title',
                    legendSettings: { visible: true },
                    annotations: [{
                            content: '#template',
                            region: 'Series',
                            x: '50%',
                            y: '50%'
                        }],
                    loaded: function (args) {
                        chartObj.print();
                    }
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                chartElement.remove();
                ej2_base_1.remove(document.getElementById('template'));
                ej2_base_1.remove(document.getElementById('template1'));
            });
            it('Checking annotation content', function (done) {
                chartObj.beforePrint = function (args) {
                    expect(args.htmlContent.outerHTML.indexOf('<div id="container_Annotation_0"') > -1).toBe(true);
                    done();
                };
                chartObj.refresh();
            });
            it('Checking data label content', function (done) {
                chartObj.beforePrint = function (args) {
                    expect(args.htmlContent.outerHTML.indexOf('<div id="container_Series_0_DataLabel_0"') > -1).toBe(true);
                    done();
                };
                chartObj.series[0].dataLabel.visible = true;
                chartObj.series[0].dataLabel.template = '#template';
                chartObj.refresh();
            });
            it('Checking legend content', function (done) {
                chartObj.beforePrint = function (args) {
                    expect(args.htmlContent.outerHTML.indexOf('<g id="container_chart_legend_g">') > -1).toBe(true);
                    expect(args.htmlContent.outerHTML.indexOf('<g id="container_chart_legend_collections"') > -1).toBe(true);
                    done();
                };
                chartObj.refresh();
            });
            it('Checking argument cancel', function (done) {
                chartObj.beforePrint = function (args) {
                    args.cancel = true;
                    expect(args.htmlContent.outerHTML.indexOf('<div id="container_Annotation_0"') > -1).toBe(true);
                    done();
                };
                chartObj.refresh();
            });
            it('Checking annotation style', function (done) {
                chartObj.beforePrint = function (args) {
                    expect(args.htmlContent.outerHTML.indexOf('style="background-color:#4472c4;border-radius: 3px;"') > -1).toBe(true);
                    done();
                };
                chartObj.refresh();
            });
            it('Checking export', function (done) {
                chartObj.exportModule.export('JPEG', 'chart');
                setTimeout(function () {
                    expect('').toBe('');
                    done();
                }, 500);
            });
            it('Checking export - SVG', function (done) {
                chartObj.exportModule.export('SVG', 'chart');
                setTimeout(function () {
                    expect('').toBe('');
                    done();
                }, 500);
            });
            it('Checking export - PDF', function (done) {
                chartObj.exportModule.export('PDF', 'chart');
                setTimeout(function () {
                    expect('').toBe('');
                    done();
                }, 500);
            });
            it('Checking export - PDF - Potrait', function (done) {
                chartObj.exportModule.export('PDF', 'chart', ej2_pdf_export_1.PdfPageOrientation.Portrait);
                setTimeout(function () {
                    expect('').toBe('');
                    done();
                }, 500);
            });
            it('Checking export - PDF - multi controls', function (done) {
                chartObj.exportModule.export('PDF', 'chart', ej2_pdf_export_1.PdfPageOrientation.Portrait, [chartObj, chartObj], 500, 450);
                setTimeout(function () {
                    expect('').toBe('');
                    done();
                }, 500);
            });
            it('Checking export - PDF - multi controls width out size', function (done) {
                chartObj.exportModule.export('PDF', 'chart', ej2_pdf_export_1.PdfPageOrientation.Portrait, [chartObj, chartObj]);
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
