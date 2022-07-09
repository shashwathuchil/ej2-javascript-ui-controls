var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "@syncfusion/ej2-base", "@syncfusion/ej2-svg-base"], function (require, exports, ej2_base_1, ej2_svg_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Size = (function () {
        function Size(width, height) {
            this.width = width;
            this.height = height;
        }
        return Size;
    }());
    exports.Size = Size;
    function getThemeColor(theme) {
        var themeColors;
        switch (theme.toLowerCase()) {
            case 'bootstrapdark':
            case 'fabricdark':
            case 'materialdark':
            case 'highcontrast':
                themeColors = {
                    axisLineColor: '#ffffff',
                    dataLabelColor: '#ffffff',
                    rangeBandColor: '#ffffff',
                    tooltipFill: '#ffffff',
                    background: '#000000',
                    tooltipFontColor: '#363F4C',
                    trackerLineColor: '#ffffff'
                };
                break;
            case 'bootstrap4':
                themeColors = {
                    axisLineColor: '#6C757D',
                    dataLabelColor: '#212529',
                    rangeBandColor: '#212529',
                    tooltipFill: '#000000',
                    background: '#FFFFFF',
                    tooltipFontColor: '#FFFFFF',
                    trackerLineColor: '#212529',
                    fontFamily: 'HelveticaNeue-Medium',
                    tooltipFillOpacity: 1,
                    tooltipTextOpacity: 0.9,
                    labelFontFamily: 'HelveticaNeue'
                };
                break;
            case 'tailwind':
                themeColors = {
                    axisLineColor: '#4B5563',
                    dataLabelColor: '#212529',
                    rangeBandColor: '#212529',
                    background: '#FFFFFF',
                    tooltipFill: '#111827',
                    tooltipFontColor: '#F9FAFB',
                    trackerLineColor: '#1F2937',
                    fontFamily: 'Inter',
                    tooltipFillOpacity: 1,
                    tooltipTextOpacity: 1,
                    labelFontFamily: 'Inter'
                };
                break;
            case 'tailwinddark':
                themeColors = {
                    axisLineColor: '#D1D5DB',
                    dataLabelColor: '#F9FAFB',
                    rangeBandColor: '#F9FAFB',
                    background: 'transparent',
                    tooltipFill: '#F9FAFB',
                    tooltipFontColor: '#1F2937',
                    trackerLineColor: '#9CA3AF',
                    fontFamily: 'Inter',
                    tooltipFillOpacity: 1,
                    tooltipTextOpacity: 1,
                    labelFontFamily: 'Inter'
                };
                break;
            case 'bootstrap5':
                themeColors = {
                    axisLineColor: '#D1D5DB',
                    dataLabelColor: '#343A40',
                    rangeBandColor: '#212529',
                    background: 'rgba(255, 255, 255, 0.0)',
                    tooltipFill: '#212529',
                    tooltipFontColor: '#F9FAFB',
                    trackerLineColor: '#1F2937',
                    fontFamily: 'Helvetica Neue',
                    tooltipFillOpacity: 1,
                    tooltipTextOpacity: 1,
                    labelFontFamily: 'Helvetica Neue'
                };
                break;
            case 'bootstrap5dark':
                themeColors = {
                    axisLineColor: '#D1D5DB',
                    dataLabelColor: '#E9ECEF',
                    rangeBandColor: '#ADB5BD',
                    background: 'rgba(255, 255, 255, 0.0)',
                    tooltipFill: '#E9ECEF',
                    tooltipFontColor: '#212529',
                    trackerLineColor: '#ADB5BD',
                    fontFamily: 'Helvetica Neue',
                    tooltipFillOpacity: 1,
                    tooltipTextOpacity: 1,
                    labelFontFamily: 'Helvetica Neue'
                };
                break;
            case 'fluent':
                themeColors = {
                    axisLineColor: '#D2D0CE;',
                    dataLabelColor: '#323130',
                    rangeBandColor: '#A19F9D',
                    background: 'rgba(255, 255, 255, 0.0001)',
                    tooltipFill: '#FFFFFF',
                    tooltipFontColor: '#323130',
                    trackerLineColor: '#A19F9D',
                    fontFamily: 'Helvetica Neue',
                    tooltipFillOpacity: 1,
                    tooltipTextOpacity: 1,
                    labelFontFamily: 'Helvetica Neue'
                };
                break;
            case 'fluentdark':
                themeColors = {
                    axisLineColor: '#3B3A39;',
                    dataLabelColor: '#C8C6C4',
                    rangeBandColor: '#797775',
                    background: 'transparent',
                    tooltipFill: '#252423',
                    tooltipFontColor: '#F3F2F1',
                    trackerLineColor: '#797775',
                    fontFamily: 'Helvetica Neue',
                    tooltipFillOpacity: 1,
                    tooltipTextOpacity: 1,
                    labelFontFamily: 'Helvetica Neue'
                };
                break;
            default: {
                themeColors = {
                    axisLineColor: '#000000',
                    dataLabelColor: '#424242',
                    rangeBandColor: '#000000',
                    background: '#FFFFFF',
                    tooltipFill: '#363F4C',
                    tooltipFontColor: '#ffffff',
                    trackerLineColor: '#000000'
                };
                break;
            }
        }
        return themeColors;
    }
    exports.getThemeColor = getThemeColor;
    function stringToNumber(value, containerSize) {
        if (value !== null && value !== undefined) {
            return value.indexOf('%') !== -1 ? (containerSize / 100) * parseInt(value, 10) : parseInt(value, 10);
        }
        return null;
    }
    exports.stringToNumber = stringToNumber;
    function calculateSize(sparkline) {
        var containerWidth = !sparkline.element.clientWidth ? (!sparkline.element.parentElement ? 100 :
            (!sparkline.element.parentElement.clientWidth ? window.innerWidth : sparkline.element.parentElement.clientWidth)) :
            sparkline.element.clientWidth;
        var containerHeight = !sparkline.element.clientHeight ? (!sparkline.element.parentElement ? 50 :
            sparkline.element.parentElement.clientHeight) : sparkline.element.clientHeight;
        sparkline.availableSize = new Size(stringToNumber(sparkline.width, containerWidth) || containerWidth, stringToNumber(sparkline.height, containerHeight) || containerHeight || (sparkline.isDevice ?
            Math.min(window.innerWidth, window.innerHeight) : containerHeight));
    }
    exports.calculateSize = calculateSize;
    function createSvg(sparkline) {
        sparkline.renderer = new ej2_svg_base_1.SvgRenderer(sparkline.element.id);
        calculateSize(sparkline);
        sparkline.svgObject = sparkline.renderer.createSvg({
            id: sparkline.element.id + '_svg',
            width: sparkline.availableSize.width,
            height: sparkline.availableSize.height
        });
    }
    exports.createSvg = createSvg;
    var Rect = (function () {
        function Rect(x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
        return Rect;
    }());
    exports.Rect = Rect;
    var PathOption = (function () {
        function PathOption(id, fill, width, color, opacity, dashArray, d) {
            this.id = id;
            this.fill = fill;
            this.opacity = opacity;
            this['stroke-width'] = width;
            this.stroke = color;
            this.d = d;
            this['stroke-dasharray'] = dashArray;
        }
        return PathOption;
    }());
    exports.PathOption = PathOption;
    var RectOption = (function (_super) {
        __extends(RectOption, _super);
        function RectOption(id, fill, border, opacity, rect, tl, tr, bl, br) {
            if (tl === void 0) { tl = 0; }
            if (tr === void 0) { tr = 0; }
            if (bl === void 0) { bl = 0; }
            if (br === void 0) { br = 0; }
            var _this = _super.call(this, id, fill, border.width, border.color, opacity) || this;
            _this.rect = rect;
            _this.topLeft = tl;
            _this.topRight = tr;
            _this.bottomLeft = bl;
            _this.bottomRight = br;
            return _this;
        }
        return RectOption;
    }(PathOption));
    exports.RectOption = RectOption;
    var CircleOption = (function (_super) {
        __extends(CircleOption, _super);
        function CircleOption(id, fill, border, opacity, cx, cy, r, dashArray) {
            var _this = _super.call(this, id, fill, border.width, border.color, opacity) || this;
            _this.cy = cy;
            _this.cx = cx;
            _this.r = r;
            _this['stroke-dasharray'] = dashArray;
            return _this;
        }
        return CircleOption;
    }(PathOption));
    exports.CircleOption = CircleOption;
    function appendShape(shape, element) {
        if (element) {
            element.appendChild(shape);
        }
        return shape;
    }
    exports.appendShape = appendShape;
    function drawCircle(sparkline, options, element) {
        return appendShape(sparkline.renderer.drawCircle(options), element);
    }
    exports.drawCircle = drawCircle;
    function calculateRoundedRectPath(r, topLeft, topRight, bottomLeft, bottomRight) {
        return 'M' + ' ' + r.x + ' ' + (topLeft + r.y) +
            ' Q ' + r.x + ' ' + r.y + ' ' + (r.x + topLeft) + ' ' +
            r.y + ' ' + 'L' + ' ' + (r.x + r.width - topRight) + ' ' + r.y +
            ' Q ' + (r.x + r.width) + ' ' + r.y + ' ' +
            (r.x + r.width) + ' ' + (r.y + topRight) + ' ' + 'L ' +
            (r.x + r.width) + ' ' + (r.y + r.height - bottomRight)
            + ' Q ' + (r.x + r.width) + ' ' + (r.y + r.height) + ' ' + (r.x + r.width - bottomRight) + ' ' +
            (r.y + r.height) + ' ' + 'L ' + (r.x + bottomLeft) + ' ' + (r.y + r.height) + ' Q ' + r.x + ' ' +
            (r.y + r.height) + ' ' + r.x + ' ' + (r.y + r.height - bottomLeft) + ' ' + 'L' + ' ' + r.x + ' ' +
            (topLeft + r.y) + ' ' + 'Z';
    }
    exports.calculateRoundedRectPath = calculateRoundedRectPath;
    function drawRectangle(sparkline, options, element) {
        options.d = calculateRoundedRectPath(options.rect, options.topLeft, options.topRight, options.bottomLeft, options.bottomRight);
        return appendShape(sparkline.renderer.drawPath(options), element);
    }
    exports.drawRectangle = drawRectangle;
    function drawPath(sparkline, options, element) {
        return appendShape(sparkline.renderer.drawPath(options), element);
    }
    exports.drawPath = drawPath;
    function measureText(text, font) {
        var htmlObject = document.getElementById('sparklinesmeasuretext');
        if (htmlObject === null) {
            htmlObject = ej2_base_1.createElement('text', { id: 'sparklinesmeasuretext' });
            document.body.appendChild(htmlObject);
        }
        htmlObject.innerHTML = text;
        htmlObject.style.fontStyle = font.fontStyle;
        htmlObject.style.fontFamily = font.fontFamily;
        htmlObject.style.visibility = 'hidden';
        htmlObject.style.top = '-100';
        htmlObject.style.left = '0';
        htmlObject.style.position = 'absolute';
        htmlObject.style.fontSize = font.size;
        htmlObject.style.fontWeight = font.fontWeight;
        htmlObject.style.whiteSpace = 'nowrap';
        htmlObject.style.lineHeight = 'normal';
        return new Size(htmlObject.clientWidth, htmlObject.clientHeight);
    }
    exports.measureText = measureText;
    var TextOption = (function () {
        function TextOption(id, x, y, anchor, text, baseLine, transform) {
            if (transform === void 0) { transform = ''; }
            this.transform = '';
            this.baseLine = 'auto';
            this.id = id;
            this.x = x;
            this.y = y;
            this.anchor = anchor;
            this.text = text;
            this.transform = transform;
            this.baseLine = baseLine;
        }
        return TextOption;
    }());
    exports.TextOption = TextOption;
    function renderTextElement(options, font, color, parent) {
        var textOptions = {
            'id': options.id,
            'x': options.x,
            'y': options.y,
            'transform': options.transform,
            'opacity': font.opacity,
            'fill': color,
            'font-family': font.fontFamily,
            'font-weight': font.fontWeight,
            'font-size': font.size,
            'font-style': font.fontStyle,
            'text-anchor': options.anchor,
            'dominant-baseline': options.baseLine
        };
        var renderer = new ej2_svg_base_1.SvgRenderer('');
        var htmlObject = renderer.createText(textOptions, options.text);
        htmlObject.style['user-select'] = 'none';
        htmlObject.style['-moz-user-select'] = 'none';
        htmlObject.style['-webkit-touch-callout'] = 'none';
        htmlObject.style['-webkit-user-select'] = 'none';
        htmlObject.style['-khtml-user-select'] = 'none';
        htmlObject.style['-ms-user-select'] = 'none';
        htmlObject.style['-o-user-select'] = 'none';
        parent.appendChild(htmlObject);
        return htmlObject;
    }
    exports.renderTextElement = renderTextElement;
    function removeElement(id) {
        var element = document.getElementById(id);
        return element ? ej2_base_1.remove(element) : null;
    }
    exports.removeElement = removeElement;
    function getIdElement(id) {
        return document.getElementById(id);
    }
    exports.getIdElement = getIdElement;
    function withInBounds(x, y, bounds) {
        return (x >= bounds.x && x <= bounds.x + bounds.width && y >= bounds.y && y <= bounds.y + bounds.height);
    }
    exports.withInBounds = withInBounds;
});
