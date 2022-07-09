define(["require", "exports", "@syncfusion/ej2-svg-base", "../../common/utils/helper", "../../common/utils/helper", "@syncfusion/ej2-svg-base", "@syncfusion/ej2-base"], function (require, exports, ej2_svg_base_1, helper_1, helper_2, ej2_svg_base_2, ej2_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RangeTooltip = (function () {
        function RangeTooltip(range) {
            this.control = range;
            this.elementId = range.element.id;
        }
        RangeTooltip.prototype.renderLeftTooltip = function (rangeSlider) {
            this.fadeOutTooltip();
            var content = this.getTooltipContent(rangeSlider.currentStart);
            var contentWidth = this.getContentSize(content);
            var rect = this.control.enableRtl ? rangeSlider.rightRect : rangeSlider.leftRect;
            if (contentWidth > rect.width) {
                rect = rangeSlider.midRect;
            }
            this.leftTooltip = this.renderTooltip(rect, this.createElement('_leftTooltip'), rangeSlider.startX, content);
        };
        RangeTooltip.prototype.getContentSize = function (value) {
            var width;
            var font = this.control.tooltip.textStyle;
            if (this.control.tooltip.template) {
                width = helper_1.createTemplate(ej2_base_1.createElement('div', {
                    id: 'measureElement',
                    styles: 'position: absolute;'
                }), 0, this.control.tooltip.template, this.control).getBoundingClientRect().width;
            }
            else {
                width = ej2_svg_base_2.measureText(value[0], font).width + 20;
            }
            return width;
        };
        RangeTooltip.prototype.renderRightTooltip = function (rangeSlider) {
            this.fadeOutTooltip();
            var content = this.getTooltipContent(rangeSlider.currentEnd);
            var contentWidth = this.getContentSize(content);
            var rect = this.control.enableRtl ? rangeSlider.leftRect : rangeSlider.rightRect;
            if (contentWidth > rect.width) {
                rect = rangeSlider.midRect;
                rect.x = !this.control.series.length ? rect.x : 0;
            }
            this.rightTooltip = this.renderTooltip(rect, this.createElement('_rightTooltip'), rangeSlider.endX, content);
        };
        RangeTooltip.prototype.createElement = function (id) {
            if (helper_1.getElement(this.elementId + id)) {
                return helper_1.getElement(this.elementId + id);
            }
            else {
                var element = document.createElement('div');
                element.id = this.elementId + id;
                element.className = 'ejSVGTooltip';
                element.style.cssText = 'pointer-events:none; position:absolute;z-index: 1';
                if (!this.control.stockChart) {
                    helper_1.getElement(this.elementId + '_Secondary_Element').appendChild(element);
                }
                else {
                    var stockChart = this.control.stockChart;
                    helper_1.getElement(stockChart.element.id + '_Secondary_Element').appendChild(element);
                    element.style.transform = 'translateY(' + (((stockChart.availableSize.height - stockChart.toolbarHeight - 80) +
                        stockChart.toolbarHeight) + stockChart.titleSize.height) + 'px)';
                }
                return element;
            }
        };
        RangeTooltip.prototype.renderTooltip = function (bounds, parent, pointX, content) {
            var control = this.control;
            var tooltip = control.tooltip;
            var argsData = {
                cancel: false, name: 'tooltipRender', text: content,
                textStyle: tooltip.textStyle
            };
            this.control.trigger('tooltipRender', argsData);
            var left = control.svgObject.getBoundingClientRect().left -
                control.element.getBoundingClientRect().left;
            if (!argsData.cancel) {
                return new ej2_svg_base_1.Tooltip({
                    location: { x: pointX, y: control.rangeSlider.sliderY },
                    content: argsData.text, marginX: 2,
                    enableShadow: (this.control.theme === "Fluent" || this.control.theme === 'FluentDark') ? true : false,
                    marginY: 2, arrowPadding: 8, rx: 0, ry: 0,
                    inverted: control.series.length > 0,
                    areaBounds: bounds, fill: tooltip.fill ? tooltip.fill : this.control.themeStyle.tooltipBackground,
                    theme: this.control.theme,
                    clipBounds: { x: left },
                    border: tooltip.border, opacity: tooltip.opacity,
                    template: tooltip.template,
                    textStyle: argsData.textStyle,
                    availableSize: control.availableSize,
                    controlName: 'RangeNavigator',
                    data: {
                        'start': this.getTooltipContent(this.control.startValue)[0],
                        'end': this.getTooltipContent(this.control.endValue)[0],
                        'value': content[0]
                    }
                }, parent);
            }
            else {
                return null;
            }
        };
        RangeTooltip.prototype.getTooltipContent = function (value) {
            var control = this.control;
            var tooltip = control.tooltip;
            var xAxis = control.chartSeries.xAxis;
            var text;
            var format = tooltip.format || xAxis.labelFormat;
            var isCustom = format.match('{value}') !== null;
            var valueType = xAxis.valueType;
            if (valueType === 'DateTime') {
                text = (control.intl.getDateFormat({
                    format: format || 'MM/dd/yyyy',
                    type: helper_1.firstToLowerCase(control.skeletonType),
                    skeleton: control.dateTimeModule.getSkeleton(xAxis, null, null)
                }))(new Date(value));
            }
            else {
                xAxis.format = control.intl.getNumberFormat({
                    format: isCustom ? '' : format,
                    useGrouping: control.useGroupingSeparator
                });
                text = control.doubleModule.formatValue(xAxis, isCustom, format, valueType === 'Logarithmic' ? Math.pow(xAxis.logBase, value) : value);
            }
            return [text];
        };
        RangeTooltip.prototype.fadeOutTooltip = function () {
            var _this = this;
            var tooltip = this.control.tooltip;
            if (tooltip.displayMode === 'OnDemand') {
                helper_2.stopTimer(this.toolTipInterval);
                if (this.rightTooltip) {
                    this.toolTipInterval = +setTimeout(function () {
                        _this.leftTooltip.fadeOut();
                        _this.rightTooltip.fadeOut();
                    }, 1000);
                }
            }
        };
        RangeTooltip.prototype.getModuleName = function () {
            return 'RangeTooltip';
        };
        RangeTooltip.prototype.destroy = function () {
        };
        return RangeTooltip;
    }());
    exports.RangeTooltip = RangeTooltip;
});
