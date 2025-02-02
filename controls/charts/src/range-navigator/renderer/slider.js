define(["require", "exports", "@syncfusion/ej2-base", "../../common/utils/helper", "../utils/helper", "@syncfusion/ej2-svg-base", "@syncfusion/ej2-base"], function (require, exports, ej2_base_1, helper_1, helper_2, ej2_svg_base_1, ej2_base_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RangeSlider = (function () {
        function RangeSlider(range) {
            this.control = range;
            this.points = [];
            this.isIOS = ej2_base_1.Browser.isIos || ej2_base_1.Browser.isIos7;
            var thumb = range.navigatorStyleSettings.thumb;
            this.thumbVisible = (range.themeStyle.thumbWidth !== 0 && range.themeStyle.thumbHeight !== 0);
            this.elementId = range.element.id;
            this.thumpPadding = range.themeStyle.thumbWidth / 2;
            this.addEventListener();
            this.thumbColor = range.disableRangeSelector ? 'transparent' :
                (thumb.fill || range.themeStyle.thumbBackground);
        }
        RangeSlider.prototype.render = function (range) {
            var renderer = range.renderer;
            var style = range.navigatorStyleSettings;
            var disabledColor = (range.disableRangeSelector) ? 'transparent' : null;
            var sliderGroup = renderer.createGroup({
                'id': this.elementId + '_sliders',
                style: (range.disableRangeSelector) ? 'pointer-events:none;' : ''
            });
            var option = new helper_1.RectOption(this.elementId + '_leftUnSelectedArea', disabledColor || style.unselectedRegionColor || range.themeStyle.unselectedRectColor, { width: 0 }, 1, {
                x: range.bounds.x, y: range.bounds.y,
                width: range.bounds.width / 3,
                height: range.bounds.height
            });
            this.leftUnSelectedElement = renderer.drawRectangle(option);
            option.id = this.elementId + '_rightUnSelectedArea';
            this.rightUnSelectedElement = renderer.drawRectangle(option);
            option.id = this.elementId + '_SelectedArea';
            option.fill = disabledColor || style.selectedRegionColor || range.themeStyle.selectedRegionColor;
            this.selectedElement = renderer.drawRectangle(option);
            this.selectedElement.style.cursor = '-webkit-grab';
            this.leftSlider = renderer.createGroup({
                'id': this.elementId + '_LeftSlider', 'style': 'cursor: ew-resize'
            });
            this.rightSlider = renderer.createGroup({
                'id': this.elementId + '_RightSlider', 'style': 'cursor: ew-resize'
            });
            this.createThump(renderer, range.bounds, this.leftSlider, this.elementId + '_LeftSlider', sliderGroup);
            this.createThump(renderer, range.bounds, this.rightSlider, this.elementId + '_RightSlider');
            sliderGroup.appendChild(this.leftUnSelectedElement);
            sliderGroup.appendChild(this.rightUnSelectedElement);
            sliderGroup.appendChild(this.selectedElement);
            sliderGroup.appendChild(this.leftSlider);
            sliderGroup.appendChild(this.rightSlider);
            range.svgObject.appendChild(sliderGroup);
        };
        RangeSlider.prototype.createThump = function (render, bounds, parent, id, sliderGroup) {
            var control = this.control;
            var thump = control.navigatorStyleSettings.thumb;
            var style = control.themeStyle;
            var y = bounds.y + bounds.height / 2;
            var x = this.thumpPadding;
            var tickLength = (control.themeStyle.thumbHeight / 2) - 5;
            var disabledColor = control.disableRangeSelector ? 'transparent' : null;
            var lineColor = disabledColor || thump.border.color || style.thumpLineColor;
            var shadowElement;
            parent.appendChild(render.drawPath(new ej2_svg_base_1.PathOption(id + '_ThumpLine', 'transparent', thump.border.width, control.series.length ? lineColor : 'transparent', 1, null, 'M' + ' ' + (x) + ' ' + (bounds.y) + ' ' + 'L' + ' ' + (x) + ' ' + (bounds.y + bounds.height) + ' ')));
            this.thumpY = y - (control.themeStyle.thumbHeight / 2);
            this.sliderY = bounds.y > this.thumpY ? this.thumpY : bounds.y;
            if (sliderGroup && !control.disableRangeSelector) {
                shadowElement = render.createDefs();
                shadowElement.innerHTML = '<rect xmlns="http://www.w3.org/2000/svg" id="' + this.control.element.id + '_shadow' + '" x="0" ' +
                    'y="' + this.thumpY + '" width="' + control.themeStyle.thumbWidth + '" height="' + control.themeStyle.thumbHeight + '"' +
                    ' rx="' + (thump.type === 'Circle' ? '50%' : '0%') + '"/>' +
                    '<filter xmlns="http://www.w3.org/2000/svg" x="-25.0%" y="-20.0%" width="150.0%" height="150.0%"' +
                    ' filterUnits="objectBoundingBox" id="ej2-range-shadow"><feOffset dx="0" dy="1" in="SourceAlpha"' +
                    'result="shadowOffsetOuter1"/><feGaussianBlur stdDeviation="1.5" in="shadowOffsetOuter1" result="shadowBlurOuter1"/>' +
                    '<feComposite in="shadowBlurOuter1" in2="SourceAlpha" operator="out" result="shadowBlurOuter1"/>' +
                    '<feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.16 0" type="matrix" in="shadowBlurOuter1"/>' +
                    '</filter>';
                sliderGroup.appendChild(shadowElement);
            }
            parent.innerHTML += '<use xmlns="http://www.w3.org/2000/svg" fill="black" fill-opacity="1" filter="url(#ej2-range-shadow)"' +
                ' xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#path-1"/>';
            if (thump.type === 'Circle') {
                parent.appendChild(helper_1.drawSymbol({ x: x, y: y }, 'Circle', { width: control.themeStyle.thumbWidth, height: control.themeStyle.thumbHeight }, '', new ej2_svg_base_1.PathOption(id + '_ThumpSymbol', disabledColor || this.thumbColor, thump.border.width, lineColor, 1, null), 'Thumb'));
            }
            else {
                parent.appendChild(render.drawRectangle(new helper_1.RectOption(id + '_ThumpSymbol', disabledColor || this.thumbColor, { width: thump.border.width, color: lineColor }, 1, {
                    x: x - (control.themeStyle.thumbWidth / 2), y: y - (control.themeStyle.thumbHeight / 2),
                    width: control.themeStyle.thumbWidth,
                    height: control.themeStyle.thumbHeight
                }, 2, 2)));
            }
            if (this.thumbVisible) {
                parent.appendChild(render.drawPath(new ej2_svg_base_1.PathOption(id + '_ThumpGrip', 'transparent', 1, disabledColor || control.themeStyle.gripColor, 1, null, 'M' + ' ' + (x + 2) + ' ' + (y + tickLength) + ' ' + 'L' + ' ' + (x + 2) + ' ' + (y - tickLength) + ' ' +
                    'M' + ' ' + (x) + ' ' + (y + tickLength) + ' ' + 'L' + ' ' + (x) + ' ' + (y - tickLength) + ' ' +
                    'M' + ' ' + (x - 2) + ' ' + (y + tickLength) + ' ' + 'L' + ' ' + (x - 2) + ' ' + (y - tickLength) + ' ')));
            }
        };
        RangeSlider.prototype.setSlider = function (start, end, trigger, showTooltip, resize) {
            if (resize === void 0) { resize = false; }
            var range = this.control;
            var padding = range.bounds.x;
            var axisRange = range.chartSeries.xAxis.actualRange;
            var isLeightWeight = range.series.length === 0;
            if (isNaN(start) && isNaN(end)) {
                start = 0;
                end = range.bounds.width;
            }
            if (!(end >= start)) {
                start = [end, end = start][0];
            }
            start = end >= start ? start : [end, end = start][0];
            start = Math.max(start, axisRange.min);
            end = Math.min(end, axisRange.max);
            this.startX = padding + helper_2.getXLocation(start, axisRange, range.bounds.width, range.enableRtl);
            this.endX = padding + helper_2.getXLocation(end, axisRange, range.bounds.width, range.enableRtl);
            var selectedX = range.enableRtl ? this.endX : this.startX;
            var rightPadding = range.enableRtl ? this.startX : this.endX;
            this.sliderWidth = Math.abs(this.endX - this.startX);
            this.selectedElement.setAttribute('x', (selectedX) + '');
            this.selectedElement.setAttribute('width', this.sliderWidth + '');
            this.leftUnSelectedElement.setAttribute('width', (selectedX - padding) + '');
            this.rightUnSelectedElement.setAttribute('x', rightPadding + '');
            this.rightUnSelectedElement.setAttribute('width', (range.bounds.width - (rightPadding - padding)) + '');
            this.leftSlider.setAttribute('transform', 'translate(' + (this.startX - this.thumpPadding) + ', 0)');
            this.rightSlider.setAttribute('transform', 'translate(' + (this.endX - this.thumpPadding) + ', 0)');
            var left = this.control.svgObject.getBoundingClientRect().left -
                this.control.element.getBoundingClientRect().left;
            var leftX = this.control.enableRtl ? this.endX : this.startX;
            var rightX = this.control.enableRtl ? this.startX : this.endX;
            this.leftRect = {
                x: isLeightWeight ? left + padding : padding,
                y: isLeightWeight ? 0 : range.bounds.y,
                width: isLeightWeight ? leftX - padding : leftX,
                height: isLeightWeight ? this.thumpY : range.bounds.height
            };
            this.rightRect = {
                x: isLeightWeight ? left + rightX : rightX,
                y: isLeightWeight ? 0 : range.bounds.y,
                width: (range.bounds.width - (rightPadding - padding)),
                height: isLeightWeight ? this.thumpY : range.bounds.height
            };
            this.midRect = {
                x: isLeightWeight ? leftX + left : 0,
                y: isLeightWeight ? 0 : range.bounds.y,
                width: isLeightWeight ? Math.abs(this.endX - this.startX) : rightX,
                height: isLeightWeight ? this.thumpY : range.bounds.height
            };
            this.currentStart = start;
            this.currentEnd = end;
            if (showTooltip) {
                this.control.rangeTooltipModule.renderLeftTooltip(this);
                this.control.rangeTooltipModule.renderRightTooltip(this);
            }
            if (trigger && !resize) {
                this.triggerEvent(axisRange);
            }
        };
        RangeSlider.prototype.triggerEvent = function (range) {
            var xAxis = this.control.chartSeries.xAxis;
            var valueType = xAxis.valueType;
            var argsData = {
                cancel: false,
                start: valueType === 'DateTime' ? new Date(this.currentStart) :
                    (valueType === 'Logarithmic' ? Math.pow(xAxis.logBase, this.currentStart) : this.currentStart),
                end: valueType === 'DateTime' ? new Date(this.currentEnd) :
                    (valueType === 'Logarithmic' ? Math.pow(xAxis.logBase, this.currentEnd) : this.currentEnd),
                name: 'changed',
                selectedData: helper_2.getExactData(this.points, this.currentStart, this.currentEnd),
                zoomPosition: (this.control.enableRtl ? range.max - this.currentEnd :
                    this.currentStart - range.min) / range.delta,
                zoomFactor: (this.currentEnd - this.currentStart) / range.delta
            };
            this.control.trigger('changed', argsData);
        };
        RangeSlider.prototype.addEventListener = function () {
            if (this.control.isDestroyed) {
                return;
            }
            this.control.on(ej2_base_1.Browser.touchMoveEvent, this.mouseMoveHandler, this);
            this.control.on(ej2_base_1.Browser.touchStartEvent, this.mouseDownHandler, this);
            this.control.on(ej2_base_1.Browser.touchEndEvent, this.mouseUpHandler, this);
            this.control.on(ej2_base_1.Browser.isPointer ? 'pointerleave' : 'mouseleave', this.mouseCancelHandler, this);
        };
        RangeSlider.prototype.removeEventListener = function () {
            if (this.control.isDestroyed) {
                return;
            }
            this.control.off(ej2_base_1.Browser.touchMoveEvent, this.mouseMoveHandler);
            this.control.off(ej2_base_1.Browser.touchStartEvent, this.mouseDownHandler);
            this.control.off(ej2_base_1.Browser.touchEndEvent, this.mouseUpHandler);
            this.control.off(ej2_base_1.Browser.isPointer ? 'pointerleave' : 'mouseleave', this.mouseCancelHandler);
        };
        RangeSlider.prototype.mouseMoveHandler = function (e) {
            var control = this.control;
            var axisRange = control.chartSeries.xAxis.actualRange;
            var bounds = control.bounds;
            var start;
            var end;
            this.getCurrentSlider(e.target.id);
            if (this.isDrag && control.mouseX >= bounds.x) {
                switch (this.currentSlider) {
                    case 'Left':
                        control.startValue = this.getRangeValue(Math.abs(control.mouseX - bounds.x));
                        break;
                    case 'Right':
                        control.endValue = this.getRangeValue(Math.abs(control.mouseX - bounds.x));
                        break;
                    case 'Middle':
                        start = Math.max(this.getRangeValue(Math.abs(this.startX - (this.previousMoveX - control.mouseX) - bounds.x)), axisRange.min);
                        end = Math.min(this.getRangeValue(Math.abs(this.endX - (this.previousMoveX - control.mouseX) - bounds.x)), axisRange.max);
                        var currentWidth = Math.floor(Math.abs(helper_2.getXLocation(end, axisRange, control.bounds.width, control.enableRtl) -
                            helper_2.getXLocation(start, axisRange, control.bounds.width, control.enableRtl)));
                        if (currentWidth === Math.floor(this.sliderWidth)) {
                            control.startValue = start;
                            control.endValue = end;
                        }
                        break;
                }
                if (e.preventDefault && this.isIOS) {
                    e.preventDefault();
                }
                this.setSlider(control.startValue, control.endValue, !control.enableDeferredUpdate, (control.rangeTooltipModule && control.tooltip.enable));
                this.previousMoveX = control.mouseX;
            }
        };
        RangeSlider.prototype.getRangeValue = function (x) {
            var control = this.control;
            var axisRange = control.chartSeries.xAxis.actualRange;
            var bounds = control.bounds;
            return helper_2.getRangeValueXByPoint(x, bounds.width, axisRange, control.enableRtl);
        };
        RangeSlider.prototype.mouseDownHandler = function (e) {
            this.currentSlider = this.getCurrentSlider(e.target.id);
            this.selectedElement.style.cursor = '-webkit-grabbing';
            this.isDrag = !(this.currentSlider === 'UnSelectedArea' || !this.currentSlider);
            this.previousMoveX = this.control.mouseDownX;
        };
        RangeSlider.prototype.getCurrentSlider = function (id) {
            var hoverColor = this.control.themeStyle.thumbHoverColor;
            if (id.indexOf(this.elementId + '_LeftSlider') > -1) {
                this.leftSlider.childNodes[2].setAttribute('fill', hoverColor);
                return 'Left';
            }
            else if (id.indexOf(this.elementId + '_RightSlider') > -1) {
                this.rightSlider.childNodes[2].setAttribute('fill', hoverColor);
                return 'Right';
            }
            else if (id.indexOf(this.elementId + '_SelectedArea') > -1) {
                return 'Middle';
            }
            else if (id.indexOf('UnSelectedArea') > -1) {
                this.leftSlider.childNodes[2].setAttribute('fill', this.thumbColor);
                this.rightSlider.childNodes[2].setAttribute('fill', this.thumbColor);
                return 'UnSelectedArea';
            }
            else if (id.indexOf(this.elementId + '_AxisLabel_') > -1 && this.control.valueType === 'DateTime') {
                this.labelIndex = +id.substring(id.lastIndexOf('_') + 1, id.length);
                return 'firstLevelLabels';
            }
            else if (id.indexOf(this.elementId + '_SecondaryLabel') > -1 && this.control.valueType === 'DateTime') {
                this.labelIndex = +id.substring(id.lastIndexOf('_') + 1, id.length);
                return 'secondLevelLabels';
            }
            else {
                this.leftSlider.childNodes[2].setAttribute('fill', this.thumbColor);
                this.rightSlider.childNodes[2].setAttribute('fill', this.thumbColor);
                if (this.control.periodSelectorModule) {
                    this.control.periodSelectorModule.triggerChange = true;
                }
                return null;
            }
        };
        RangeSlider.prototype.mouseUpHandler = function () {
            var control = this.control;
            var range = control.chartSeries.xAxis.actualRange;
            var trigger = control.enableDeferredUpdate;
            var enabledTooltip = control.tooltip.enable;
            if (control.stockChart) {
                control.stockChart.zoomChange = false;
            }
            if (this.currentSlider === 'UnSelectedArea') {
                var value = void 0;
                var start = void 0;
                var end = void 0;
                var isRtl = control.enableRtl;
                var difference = control.endValue - control.startValue;
                if (control.mouseDownX < this.startX) {
                    value = Math.max(this.getRangeValue((control.mouseDownX - (this.sliderWidth / 2) - control.bounds.x)), range.min);
                    end = isRtl ? value : (value + difference);
                    start = isRtl ? (value - difference) : value;
                }
                else {
                    value = Math.min(this.getRangeValue((control.mouseDownX + (this.sliderWidth / 2) - control.bounds.x)), range.max);
                    start = isRtl ? value : (value - difference);
                    end = isRtl ? (value + difference) : value;
                }
                this.performAnimation(start, end, control);
                trigger = false;
            }
            else if (this.currentSlider === 'firstLevelLabels' || this.currentSlider === 'secondLevelLabels') {
                var secondLabel = control.rangeAxis[this.currentSlider][this.labelIndex + 1];
                this.performAnimation(control.rangeAxis[this.currentSlider][this.labelIndex].value, (secondLabel ? (control.allowIntervalData ? secondLabel.value - 1 : secondLabel.value) : range.max), control);
                trigger = false;
            }
            if (this.isDrag && control.allowSnapping) {
                this.setAllowSnapping(control, this.currentStart, this.currentEnd, true, enabledTooltip);
                trigger = false;
            }
            if (trigger) {
                this.setSlider(this.currentStart, this.currentEnd, true, enabledTooltip);
            }
            if (this.currentSlider !== null) {
                if (this.control.periodSelectorSettings.periods.length > 0) {
                    this.control.periodSelectorModule.triggerChange = false;
                    this.control.periodSelectorModule.datePicker.startDate = new Date(this.currentStart);
                    this.control.periodSelectorModule.datePicker.endDate = new Date(this.currentEnd);
                }
            }
            this.selectedElement.style.cursor = '-webkit-grab';
            control.startValue = this.currentStart;
            control.endValue = this.currentEnd;
            this.isDrag = false;
            this.labelIndex = null;
            this.currentSlider = null;
        };
        RangeSlider.prototype.setAllowSnapping = function (control, start, end, trigger, tooltip) {
            var values = control.rangeAxis.lowerValues;
            values.push(control.chartSeries.xAxis.actualRange.max);
            this.setSlider(helper_2.getNearestValue(values, start), helper_2.getNearestValue(values, end), trigger, tooltip);
            control.startValue = this.currentStart;
            control.endValue = this.currentEnd;
        };
        RangeSlider.prototype.performAnimation = function (start, end, control, animationDuration) {
            var _this = this;
            var currentStart = this.currentStart;
            var currentEnd = this.currentEnd;
            var isDeffered = control.enableDeferredUpdate;
            var enableTooltip = control.tooltip.enable;
            new ej2_base_2.Animation({}).animate(ej2_base_1.createElement('div'), {
                duration: !ej2_base_1.isNullOrUndefined(animationDuration) ? animationDuration : this.control.animationDuration,
                progress: function (args) {
                    _this.setSlider(helper_1.linear(args.timeStamp, 0, start - currentStart, args.duration) + currentStart, helper_1.linear(args.timeStamp, 0, end - currentEnd, args.duration) + currentEnd, !isDeffered, enableTooltip);
                },
                end: function () {
                    if (control.allowSnapping) {
                        _this.setAllowSnapping(control, start, end, true, enableTooltip);
                    }
                    else {
                        _this.setSlider(start, end, true, enableTooltip);
                    }
                    _this.control.startValue = _this.currentStart;
                    _this.control.endValue = _this.currentEnd;
                    if (_this.control.periodSelectorSettings.periods.length > 0) {
                        _this.control.periodSelectorModule.triggerChange = false;
                        _this.control.periodSelectorModule.datePicker.startDate = new Date(_this.currentStart);
                        _this.control.periodSelectorModule.datePicker.endDate = new Date(_this.currentEnd);
                    }
                }
            });
        };
        RangeSlider.prototype.mouseCancelHandler = function () {
            if (this.isDrag && this.control.allowSnapping) {
                this.setAllowSnapping(this.control, this.currentStart, this.currentEnd, false, this.control.tooltip.enable);
            }
            this.isDrag = false;
            this.currentSlider = null;
            this.control.startValue = this.currentStart;
            this.control.endValue = this.currentEnd;
        };
        RangeSlider.prototype.destroy = function () {
            this.removeEventListener();
        };
        return RangeSlider;
    }());
    exports.RangeSlider = RangeSlider;
});
