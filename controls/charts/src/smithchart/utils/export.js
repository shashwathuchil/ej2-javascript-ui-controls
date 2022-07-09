define(["require", "exports", "@syncfusion/ej2-base", "../utils/helper", "../utils/enum", "@syncfusion/ej2-pdf-export"], function (require, exports, ej2_base_1, helper_1, enum_1, ej2_pdf_export_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ExportUtils = (function () {
        function ExportUtils(control) {
            this.control = control;
        }
        ExportUtils.prototype.print = function (elements) {
            this.smithchartPrint = window.open('', 'print', 'height=' + window.outerHeight + ',width=' + window.outerWidth + ',tabbar=no');
            this.smithchartPrint.moveTo(0, 0);
            this.smithchartPrint.resizeTo(screen.availWidth, screen.availHeight);
            var argsData = {
                cancel: false,
                htmlContent: this.getHTMLContent(elements),
                name: enum_1.smithchartBeforePrint
            };
            this.control.trigger(enum_1.smithchartBeforePrint, argsData);
            if (!argsData.cancel) {
                ej2_base_1.print(argsData.htmlContent, this.smithchartPrint);
            }
        };
        ExportUtils.prototype.getHTMLContent = function (svgElements) {
            var div = ej2_base_1.createElement('div');
            if (svgElements) {
                if (svgElements instanceof Array) {
                    svgElements.forEach(function (value) {
                        div.appendChild(helper_1.getElement(value).cloneNode(true));
                    });
                }
                else if (svgElements instanceof Element) {
                    div.appendChild(svgElements.cloneNode(true));
                }
                else {
                    div.appendChild(helper_1.getElement(svgElements).cloneNode(true));
                }
            }
            else {
                div.appendChild(this.control.element.cloneNode(true));
            }
            return div;
        };
        ExportUtils.prototype.export = function (exportType, fileName, orientation) {
            var _this = this;
            var canvas = ej2_base_1.createElement('canvas', {
                id: 'ej2-canvas',
                attrs: {
                    'width': this.control.availableSize.width.toString(),
                    'height': this.control.availableSize.height.toString()
                }
            });
            var isDownload = !(ej2_base_1.Browser.userAgent.toString().indexOf('HeadlessChrome') > -1);
            orientation = ej2_base_1.isNullOrUndefined(orientation) ? ej2_pdf_export_1.PdfPageOrientation.Landscape : orientation;
            var svgData = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
                this.control.svgObject.outerHTML +
                '</svg>';
            var url = window.URL.createObjectURL(new Blob(exportType === 'SVG' ? [svgData] :
                [(new XMLSerializer()).serializeToString(this.control.svgObject)], { type: 'image/svg+xml' }));
            if (exportType === 'SVG') {
                this.triggerDownload(fileName, exportType, url, isDownload);
            }
            else {
                var image_1 = new Image();
                var ctx_1 = canvas.getContext('2d');
                image_1.onload = (function () {
                    ctx_1.drawImage(image_1, 0, 0);
                    window.URL.revokeObjectURL(url);
                    if (exportType === 'PDF') {
                        var document_1 = new ej2_pdf_export_1.PdfDocument();
                        var imageString = canvas.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
                        document_1.pageSettings.orientation = orientation;
                        imageString = imageString.slice(imageString.indexOf(',') + 1);
                        document_1.pages.add().graphics.drawImage(new ej2_pdf_export_1.PdfBitmap(imageString), 0, 0, (_this.control.availableSize.width - 60), _this.control.availableSize.height);
                        if (isDownload) {
                            document_1.save(fileName + '.pdf');
                            document_1.destroy();
                        }
                    }
                    else {
                        _this.triggerDownload(fileName, exportType, canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream'), isDownload);
                    }
                });
                image_1.src = url;
            }
        };
        ExportUtils.prototype.triggerDownload = function (fileName, exportType, url, isDownload) {
            ej2_base_1.createElement('a', {
                attrs: {
                    'download': fileName + '.' + exportType.toLocaleLowerCase(),
                    'href': url
                }
            }).dispatchEvent(new MouseEvent(isDownload ? 'click' : 'move', {
                view: window,
                bubbles: false,
                cancelable: true
            }));
        };
        return ExportUtils;
    }());
    exports.ExportUtils = ExportUtils;
});
