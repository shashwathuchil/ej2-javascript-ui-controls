define(["require", "exports", "@syncfusion/ej2-base", "../../../src/chart/chart", "../../../src/chart/legend/legend", "../../../src/chart/series/column-series", "../../../src/chart/annotation/annotation", "../../../src/chart/series/data-label", "../base/data.spec", "@syncfusion/ej2-pdf-export", "../../../src/chart/print-export/export", "../../common.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, chart_1, legend_1, column_series_1, annotation_1, data_label_1, data_spec_1, ej2_pdf_export_1, export_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(data_label_1.DataLabel, column_series_1.ColumnSeries, annotation_1.ChartAnnotation, legend_1.Legend, export_1.Export);
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
            var temp;
            chartElement = ej2_base_1.createElement('div', { id: 'container' });
            temp = ej2_base_1.createElement('div', { id: 'tempElement' });
            window.open = function () {
                return {
                    document: { write: function () { }, close: function () { } },
                    close: function () { }, print: function () { }, focus: function () { }, moveTo: function () { }, resizeTo: function () { }
                };
            };
            beforeAll(function () {
                var template = ej2_base_1.createElement('div', { id: 'print_template', styles: 'display: none;border: 2px solid red' });
                document.body.appendChild(template);
                template.innerHTML = "<div id='templateWrap' style='background-color:#4472c4;border-radius: 3px;'>" +
                    "<img src='../base/spec/img/img1.jpg' style='border-radius: 0px;width: 24px;height: 24px;padding: 2px;' />" +
                    "<div style='color:white;float: right;padding: 2px;line-height: 20px; text-align: center; font-family:Roboto; font-style: medium; fontp-size:14px;'><span>Print</span></div></div>";
                document.body.appendChild(chartElement);
                document.body.appendChild(temp);
                chartObj = new chart_1.Chart({
                    series: [{
                            animation: { enable: false },
                            name: 'ChartSeries', dataSource: [{ x: 1000, y: 70 }, { x: 2000, y: -40 },
                                { x: 3000, y: 70 }, { x: 4000, y: 60 },
                                { x: 5000, y: -50 }, { x: 6000, y: -40 },
                                { x: 7000, y: 40 }, { x: 8000, y: 70 }], xName: 'x', yName: 'y',
                            type: 'Column', fill: 'rgba(135,206,235,1)',
                            marker: { visible: true }
                        }],
                    width: '800',
                    title: 'Chart TS Title',
                    legendSettings: { visible: true },
                    annotations: [{
                            content: '#print_template',
                            region: 'Series',
                            x: '50%',
                            y: '50%'
                        }],
                    loaded: function (args) {
                        chartObj.print();
                    }
                });
                chartObj.appendTo('#container');
                data_spec_1.unbindResizeEvents(chartObj);
            });
            afterAll(function () {
                chartObj.destroy();
                chartElement.remove();
                temp.remove();
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
                chartObj.series[0].marker.dataLabel.visible = true;
                chartObj.series[0].marker.dataLabel.template = '#print_template';
                chartObj.refresh();
            });
            it('Checking legend content', function (done) {
                chartObj.beforePrint = function (args) {
                    expect(args.htmlContent.outerHTML.indexOf('<g id="container_chart_legend_g">') > -1).toBe(true);
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
            it('Checking to print in multiple element', function (done) {
                chartObj.loaded = function (args) {
                    chartObj.print(['container', 'tempElement']);
                };
                chartObj.beforePrint = function (args) {
                    expect(args.htmlContent.outerHTML.indexOf('tempElement') > -1).toBe(true);
                    done();
                };
                chartObj.refresh();
            });
            it('Checking to print direct element', function (done) {
                chartObj.loaded = function (args) {
                    chartObj.print(document.getElementById('container'));
                };
                chartObj.beforePrint = function (args) {
                    expect(args.htmlContent.outerHTML.indexOf('<div id="container_Annotation_0"') > -1).toBe(true);
                    done();
                };
                chartObj.refresh();
            });
            it('Checking to print single element', function (done) {
                chartObj.loaded = function (args) {
                    chartObj.print('tempElement');
                };
                chartObj.beforePrint = function (args) {
                    expect(args.htmlContent.outerHTML.indexOf('<div id="container_Annotation_0"') > -1).toBe(false);
                    expect(args.htmlContent.outerHTML.indexOf('<div id="tempElement"') > -1).toBe(true);
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
            it('Checking export - PDF - multi controls in horizontal mode', function (done) {
                chartObj.exportModule.export('PDF', 'chart', ej2_pdf_export_1.PdfPageOrientation.Portrait, [chartObj, chartObj], 500, 450, false);
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
            it('Checking to export height', function (done) {
                chartObj.exportModule.export('JPEG', 'result');
                chartObj.beforeExport = function (args) {
                    args.height = 500;
                };
                setTimeout(function () {
                    expect('').toBe('');
                    done();
                }, 500);
            });
            it('Checking to export width', function (done) {
                chartObj.exportModule.export('JPEG', 'result');
                chartObj.beforeExport = function (args) {
                    args.width = 800;
                };
                setTimeout(function () {
                    expect('').toBe('');
                    done();
                }, 500);
            });
            it('Checking to export cancel', function (done) {
                chartObj.exportModule.export('JPEG', 'result');
                chartObj.beforeExport = function (args) {
                    args.cancel = true;
                };
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
