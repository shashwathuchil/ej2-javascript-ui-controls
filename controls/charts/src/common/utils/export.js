define(["require", "exports", "@syncfusion/ej2-base", "@syncfusion/ej2-svg-base", "../utils/helper", "../model/constants", "@syncfusion/ej2-pdf-export"], function (require, exports, ej2_base_1, ej2_svg_base_1, helper_1, constants_1, ej2_pdf_export_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ExportUtils = (function () {
        function ExportUtils(control) {
            this.control = control;
        }
        ExportUtils.prototype.print = function (elements) {
            this.printWindow = window.open('', 'print', 'height=' + window.outerHeight + ',width=' + window.outerWidth + ',tabbar=no');
            this.printWindow.moveTo(0, 0);
            this.printWindow.resizeTo(screen.availWidth, screen.availHeight);
            var argsData = {
                cancel: false, htmlContent: this.getHTMLContent(elements), name: constants_1.beforePrint
            };
            this.control.trigger(constants_1.beforePrint, argsData);
            if (!argsData.cancel) {
                ej2_base_1.print(argsData.htmlContent, this.printWindow);
            }
        };
        ExportUtils.prototype.getHTMLContent = function (elements) {
            var div = ej2_base_1.createElement('div');
            if (elements) {
                if (elements instanceof Array) {
                    for (var j = 0; j < elements.length; j++) {
                        var value = elements[j];
                        div.appendChild(helper_1.getElement(value).cloneNode(true));
                    }
                }
                else if (elements instanceof Element) {
                    div.appendChild(elements.cloneNode(true));
                }
                else {
                    div.appendChild(helper_1.getElement(elements).cloneNode(true));
                }
            }
            else {
                div.appendChild(this.control.element.cloneNode(true));
            }
            return div;
        };
        ExportUtils.prototype.export = function (type, fileName, orientation, controls, width, height, isVertical, header, footer) {
            var _this = this;
            var controlValue = this.getControlsValue(controls, isVertical);
            width = width ? width : controlValue.width;
            height = height ? height : controlValue.height;
            var element = this.control.svgObject;
            var isCanvas = this.control.enableCanvas;
            var image;
            if (!isCanvas) {
                element = ej2_base_1.createElement('canvas', {
                    id: 'ej2-canvas',
                    attrs: {
                        'width': width.toString(),
                        'height': height.toString()
                    }
                });
            }
            var isDownload = !(ej2_base_1.Browser.userAgent.toString().indexOf('HeadlessChrome') > -1);
            orientation = ej2_base_1.isNullOrUndefined(orientation) ? ej2_pdf_export_1.PdfPageOrientation.Landscape : orientation;
            var svgData = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
                controlValue.svg.outerHTML +
                '</svg>';
            var url = window.URL.createObjectURL(new Blob(type === 'SVG' ? [svgData] :
                [(new XMLSerializer()).serializeToString(controlValue.svg)], { type: 'image/svg+xml' }));
            if (type === 'SVG') {
                if (ej2_base_1.Browser.info.name === 'msie') {
                    var svg = new Blob([(new XMLSerializer()).serializeToString(controlValue.svg)], { type: 'application/octet-stream' });
                    window.navigator.msSaveOrOpenBlob(svg, fileName + '.' + type.toLocaleLowerCase());
                }
                else {
                    this.triggerDownload(fileName, type, url, isDownload);
                }
            }
            else if (ej2_base_1.Browser.info.name === 'msie') {
                var canvas = element;
                if (!isCanvas) {
                    canvas = this.createCanvas();
                }
                image = canvas.toDataURL();
                if (type === 'PDF') {
                    this.exportPdf(canvas, orientation, width, height, isDownload, fileName, header, footer);
                }
                else {
                    this.doexport(type, image, fileName);
                }
            }
            else {
                var image_1 = new Image();
                var ctx_1 = element.getContext('2d');
                image_1.onload = (function () {
                    ctx_1.drawImage(image_1, 0, 0);
                    window.URL.revokeObjectURL(url);
                    if (type === 'PDF') {
                        _this.exportPdf(element, orientation, width, height, isDownload, fileName, header, footer);
                    }
                    else {
                        if (window.navigator.msSaveOrOpenBlob) {
                            window.navigator.msSaveOrOpenBlob(element.toBlob(null), fileName + '.' + type.toLocaleLowerCase());
                        }
                        else {
                            _this.triggerDownload(fileName, type, element.toDataURL('image/' + type.toLowerCase()), isDownload);
                        }
                    }
                });
                image_1.src = url;
            }
            if (!isCanvas) {
                helper_1.removeElement(document.getElementById(this.control.element.id + '_canvas'));
            }
        };
        ExportUtils.prototype.getDataUrl = function (chart) {
            var controlValue = this.getControlsValue([chart]);
            var element = this.control.svgObject;
            var isCanvas = this.control.enableCanvas;
            if (!isCanvas) {
                element = ej2_base_1.createElement('canvas', {
                    id: 'ej2-canvas',
                    attrs: {
                        'width': controlValue.width.toString(),
                        'height': controlValue.height.toString()
                    }
                });
            }
            var url = window.URL.createObjectURL(new Blob([(new XMLSerializer()).serializeToString(controlValue.svg)], { type: 'image/svg+xml' }));
            if (ej2_base_1.Browser.info.name === 'msie') {
                var canvas = element;
                if (!isCanvas) {
                    canvas = this.createCanvas();
                }
                var argsData = {
                    name: constants_1.afterExport, cancel: false, dataUrl: element.toDataURL('image/png')
                };
                chart.trigger(constants_1.afterExport, argsData);
                return { element: canvas, dataUrl: canvas.toDataURL() };
            }
            else {
                var image_2 = new Image();
                var ctx_2 = element.getContext('2d');
                image_2.onload = (function () {
                    ctx_2.drawImage(image_2, 0, 0);
                    window.URL.revokeObjectURL(url);
                    var argsData = {
                        name: constants_1.afterExport, cancel: false, dataUrl: element.toDataURL('image/png')
                    };
                    chart.trigger(constants_1.afterExport, argsData);
                    return argsData.dataUrl;
                });
                image_2.src = url;
                return { element: element, blobUrl: url };
            }
        };
        ExportUtils.prototype.triggerDownload = function (fileName, type, url, isDownload) {
            ej2_base_1.createElement('a', {
                attrs: {
                    'download': fileName + '.' + type.toLocaleLowerCase(),
                    'href': url
                }
            }).dispatchEvent(new MouseEvent(isDownload ? 'click' : 'move', {
                view: window,
                bubbles: false,
                cancelable: true
            }));
        };
        ExportUtils.prototype.getControlsValue = function (controls, isVertical) {
            var width = 0;
            var height = 0;
            var isCanvas = this.control.enableCanvas;
            var svgObject = new ej2_svg_base_1.SvgRenderer('').createSvg({
                id: 'Svg_Export_Element',
                width: 200, height: 200
            });
            var backgroundColor;
            controls.map(function (control) {
                var svg = control.svgObject.cloneNode(true);
                var groupEle = control.renderer.createGroup({
                    style: (ej2_base_1.isNullOrUndefined(isVertical) || isVertical) ? 'transform: translateY(' + height + 'px)' :
                        'transform: translateX(' + width + 'px)'
                });
                backgroundColor = svg.childNodes[0] ? svg.childNodes[0].getAttribute('fill') : 'transparent';
                if (backgroundColor === 'transparent') {
                    if (control.theme.indexOf("Dark") > -1 || control.theme === "HighContrast") {
                        backgroundColor = 'rgba(0, 0, 0, 1)';
                    }
                    else {
                        backgroundColor = 'rgba(255, 255, 255, 1)';
                    }
                }
                if (!isCanvas) {
                    groupEle.appendChild(svg);
                }
                var top = 0;
                var left = 0;
                if (control.stockLegendModule && control.legendSettings.visible) {
                    if (control.legendSettings.position === "Bottom" || control.legendSettings.position === "Top"
                        || control.legendSettings.position === "Auto") {
                        top += control.stockLegendModule.legendBounds.height;
                    }
                    else if (control.legendSettings.position === "Left" || control.legendSettings.position === "Right") {
                        left += control.stockLegendModule.legendBounds.width;
                    }
                }
                width = (ej2_base_1.isNullOrUndefined(isVertical) || isVertical) ? Math.max(control.availableSize.width + left, width) :
                    width + control.availableSize.width + left;
                height = (ej2_base_1.isNullOrUndefined(isVertical) || isVertical) ? height + control.availableSize.height + top :
                    Math.max(control.availableSize.height + top, height);
                if (!isCanvas) {
                    svgObject.appendChild(groupEle);
                }
            });
            if (!isCanvas) {
                svgObject.setAttribute('width', width + '');
                svgObject.setAttribute('height', height + '');
                svgObject.setAttribute('style', 'background-color: ' + backgroundColor + ';');
            }
            return {
                'width': width,
                'height': height,
                'svg': svgObject
            };
        };
        ExportUtils.prototype.createCanvas = function () {
            var chart = this.control;
            this.canvasRender(true, chart);
            var canvas = chart.svgObject;
            this.canvasRender(false, chart);
            return canvas;
        };
        ExportUtils.prototype.canvasRender = function (enableCanvas, chart) {
            chart.enableCanvas = enableCanvas;
            chart['preRender']();
            chart['render']();
        };
        ExportUtils.prototype.exportPdf = function (element, orientation, width, height, isDownload, fileName, header, footer) {
            var document = new ej2_pdf_export_1.PdfDocument();
            var margin = document.pageSettings.margins;
            var pdfDefaultWidth = document.pageSettings.width;
            var pdfDefaultHeight = document.pageSettings.height;
            var imageString = element.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
            document.pageSettings.orientation = orientation;
            var exactWidth = (pdfDefaultWidth < width) ? (width + margin.left + margin.right) : pdfDefaultWidth;
            var exactHeight = (pdfDefaultHeight < height) ? (height + margin.top + margin.bottom) : pdfDefaultHeight;
            if (header !== undefined) {
                var font = new ej2_pdf_export_1.PdfStandardFont(1, header.fontSize || 15);
                var pdfHeader = new ej2_pdf_export_1.PdfPageTemplateElement(exactWidth, 40);
                pdfHeader.graphics.drawString(header.content + '', font, null, new ej2_pdf_export_1.PdfSolidBrush(new ej2_pdf_export_1.PdfColor(0, 0, 0)), header.x, header.y, null);
                document.template.top = pdfHeader;
            }
            if (footer !== undefined) {
                var font = new ej2_pdf_export_1.PdfStandardFont(1, footer.fontSize || 15);
                var pdfFooter = new ej2_pdf_export_1.PdfPageTemplateElement(exactWidth, 40);
                pdfFooter.graphics.drawString(footer.content + '', font, null, new ej2_pdf_export_1.PdfSolidBrush(new ej2_pdf_export_1.PdfColor(0, 0, 0)), footer.x, footer.y, null);
                document.template.bottom = pdfFooter;
            }
            document.pageSettings.size = new ej2_pdf_export_1.SizeF(exactWidth, exactHeight);
            imageString = imageString.slice(imageString.indexOf(',') + 1);
            document.pages.add().graphics.drawImage(new ej2_pdf_export_1.PdfBitmap(imageString), 0, 0, width, height);
            if (isDownload) {
                document.save(fileName + '.pdf');
                document.destroy();
            }
        };
        ExportUtils.prototype.doexport = function (type, image, fileName) {
            var images = [];
            var fileType = type || 'JPG';
            images = [image];
            this.exportImage(images, fileName, fileType, image);
        };
        ExportUtils.prototype.exportImage = function (images, fileName, fileType, image) {
            var buffers = [];
            var length = (!(images instanceof HTMLElement)) ? images.length : 0;
            for (var g = 0; g < length; g++) {
                image = images[g];
                image = image.replace(/^data:[a-z]*;,/, '');
                var image1 = image.split(',');
                var byteString = atob(image1[1]);
                var buffer = new ArrayBuffer(byteString.length);
                var intArray = new Uint8Array(buffer);
                for (var i = 0; i < byteString.length; i++) {
                    intArray[i] = byteString.charCodeAt(i);
                }
                buffers.push(buffer);
            }
            for (var j = 0; j < buffers.length; j++) {
                var b = new Blob([buffers[j]], { type: 'application/octet-stream' });
                if (ej2_base_1.Browser.info.name === 'msie') {
                    window.navigator.msSaveOrOpenBlob(b, fileName + '.' + fileType.toLocaleLowerCase());
                }
            }
        };
        return ExportUtils;
    }());
    exports.ExportUtils = ExportUtils;
});
