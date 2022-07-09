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
define(["require", "exports", "@syncfusion/ej2-base", "@syncfusion/ej2-svg-base", "@syncfusion/ej2-base", "../../smithchart/utils/utils"], function (require, exports, ej2_base_1, ej2_svg_base_1, ej2_base_2, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function createSvg(smithchart) {
        smithchart.renderer = new ej2_svg_base_1.SvgRenderer(smithchart.element.id);
        calculateSize(smithchart);
        smithchart.svgObject = smithchart.renderer.createSvg({
            id: smithchart.element.id + '_svg',
            width: smithchart.availableSize.width,
            height: smithchart.availableSize.height
        });
    }
    exports.createSvg = createSvg;
    function getElement(id) {
        return document.getElementById(id);
    }
    exports.getElement = getElement;
    function textTrim(maximumWidth, text, font) {
        var label = text;
        var size = measureText(text, font).width;
        if (size > maximumWidth) {
            var textLength = text.length;
            for (var i = textLength - 1; i >= 0; --i) {
                label = text.substring(0, i) + '...';
                size = measureText(label, font).width;
                if (size <= maximumWidth || label.length < 4) {
                    if (label.length < 4) {
                        label = ' ';
                    }
                    return label;
                }
            }
        }
        return label;
    }
    exports.textTrim = textTrim;
    function getTemplateFunction(templateString) {
        var templateFn = null;
        try {
            if (document.querySelectorAll(templateString).length) {
                templateFn = ej2_base_1.compile(document.querySelector(templateString).innerHTML.trim());
            }
            else {
                templateFn = ej2_base_1.compile(templateString);
            }
        }
        catch (e) {
            templateFn = ej2_base_1.compile(templateString);
        }
        return templateFn;
    }
    exports.getTemplateFunction = getTemplateFunction;
    function convertElementFromLabel(element, labelId, data) {
        var labelEle = element[0];
        var templateHtml = labelEle.outerHTML;
        var properties = Object.keys(data);
        for (var i = 0; i < properties.length; i++) {
            templateHtml = templateHtml.replace(new RegExp('{{:' + properties[i] + '}}', 'g'), data[properties[i].toString()]);
        }
        return ej2_base_1.createElement('div', {
            id: labelId,
            innerHTML: templateHtml,
            styles: 'position: absolute'
        });
    }
    exports.convertElementFromLabel = convertElementFromLabel;
    function _getEpsilonValue() {
        var e = 1.0;
        while ((1.0 + 0.5 * e) !== 1.0) {
            e *= 0.5;
        }
        return e;
    }
    exports._getEpsilonValue = _getEpsilonValue;
    function calculateSize(smithchart) {
        var containerWidth = smithchart.element.clientWidth;
        var containerHeight = smithchart.element.clientHeight;
        smithchart.availableSize = new utils_1.SmithchartSize(stringToNumber(smithchart.width, containerWidth) || containerWidth || 600, stringToNumber(smithchart.height, containerHeight) || containerHeight || 450);
    }
    exports.calculateSize = calculateSize;
    function templateAnimate(smithchart, element, delay, duration, name) {
        var opacity = 0;
        var delta;
        var value;
        new ej2_base_2.Animation({}).animate(element, {
            duration: duration,
            delay: delay,
            name: name,
            progress: function (args) {
                delta = ((args.timeStamp - args.delay) / args.duration);
                value = opacity + (delta * 1);
                args.element.style.opacity = value.toString();
            },
            end: function (args) {
                var opacity = 1;
                args.element.style.opacity = opacity.toString();
                smithchart.trigger('animationComplete', event);
            }
        });
    }
    exports.templateAnimate = templateAnimate;
    function stringToNumber(value, containerSize) {
        if (value !== null && value !== undefined) {
            return value.indexOf('%') !== -1 ? (containerSize / 100) * parseInt(value, 10) : parseInt(value, 10);
        }
        return null;
    }
    exports.stringToNumber = stringToNumber;
    var PathOption = (function () {
        function PathOption(id, fill, width, color, opacity, dashArray, d) {
            this.id = id;
            this.opacity = opacity;
            this.fill = fill;
            this.stroke = color;
            this['stroke-width'] = width;
            this['stroke-dasharray'] = dashArray;
            this.d = d;
        }
        return PathOption;
    }());
    exports.PathOption = PathOption;
    var RectOption = (function (_super) {
        __extends(RectOption, _super);
        function RectOption(id, fill, border, opacity, rect) {
            var _this = _super.call(this, id, fill, border.width, border.color, opacity) || this;
            _this.y = rect.y;
            _this.x = rect.x;
            _this.height = rect.height;
            _this.width = rect.width;
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
    function measureText(text, font) {
        var htmlObject = document.getElementById('smithchartmeasuretext');
        if (htmlObject === null) {
            htmlObject = ej2_base_1.createElement('text', { id: 'smithchartmeasuretext' });
            document.body.appendChild(htmlObject);
        }
        htmlObject.innerHTML = text;
        htmlObject.style.position = 'absolute';
        htmlObject.style.visibility = 'hidden';
        htmlObject.style.left = '0';
        htmlObject.style.top = '-100';
        htmlObject.style.whiteSpace = 'nowrap';
        htmlObject.style.fontSize = font.size;
        htmlObject.style.fontWeight = font.fontWeight;
        htmlObject.style.fontStyle = font.fontStyle;
        htmlObject.style.fontFamily = font.fontFamily;
        htmlObject.style.lineHeight = 'normal';
        return new utils_1.SmithchartSize(htmlObject.clientWidth, htmlObject.clientHeight);
    }
    exports.measureText = measureText;
    var TextOption = (function () {
        function TextOption(id, x, y, anchor, text) {
            this.id = id;
            this.x = x;
            this.y = y;
            this.anchor = anchor;
            this.text = text;
        }
        return TextOption;
    }());
    exports.TextOption = TextOption;
    function removeElement(id) {
        var element = document.getElementById(id);
        return element ? ej2_base_1.remove(element) : null;
    }
    exports.removeElement = removeElement;
    function linear(currentTime, startValue, endValue, duration) {
        return -endValue * Math.cos(currentTime / duration * (Math.PI / 2)) + endValue + startValue;
    }
    exports.linear = linear;
    function reverselinear(currentTime, startValue, endValue, duration) {
        return -startValue * Math.sin(currentTime / duration * (Math.PI / 2)) + endValue + startValue;
    }
    exports.reverselinear = reverselinear;
    function getAnimationFunction(effect) {
        var functionName;
        switch (effect) {
            case 'Linear':
                functionName = linear;
                break;
            case 'Reverse':
                functionName = reverselinear;
                break;
        }
        return functionName;
    }
    exports.getAnimationFunction = getAnimationFunction;
    function renderTextElement(options, font, color, parent) {
        var renderOptions = {
            'id': options.id,
            'x': options.x,
            'y': options.y,
            'fill': color,
            'font-size': font.size,
            'font-style': font.fontStyle,
            'font-family': font.fontFamily,
            'font-weight': font.fontWeight,
            'text-anchor': options.anchor,
            'opacity': font.opacity
        };
        var text = options.text;
        var renderer = new ej2_svg_base_1.SvgRenderer('');
        var htmlObject = renderer.createText(renderOptions, text);
        parent.appendChild(htmlObject);
        return htmlObject;
    }
    exports.renderTextElement = renderTextElement;
});
