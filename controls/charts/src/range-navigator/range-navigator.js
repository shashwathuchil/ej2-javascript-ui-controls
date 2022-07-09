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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "@syncfusion/ej2-base", "@syncfusion/ej2-base", "@syncfusion/ej2-base", "../common/utils/helper", "@syncfusion/ej2-svg-base", "../common/model/base", "./renderer/chart-render", "./renderer/range-axis", "./model/range-base", "./renderer/slider", "../common/utils/helper", "../chart/series/line-series", "../common/model/constants", "./utils/theme", "../common/model/base", "../chart/axis/axis", "./utils/theme", "../chart/axis/double-axis", "../common/utils/export", "../common/period-selector/period-selector"], function (require, exports, ej2_base_1, ej2_base_2, ej2_base_3, helper_1, ej2_svg_base_1, base_1, chart_render_1, range_axis_1, range_base_1, slider_1, helper_2, line_series_1, constants_1, theme_1, base_2, axis_1, theme_2, double_axis_1, export_1, period_selector_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RangeNavigator = (function (_super) {
        __extends(RangeNavigator, _super);
        function RangeNavigator(options, element) {
            var _this = _super.call(this, options, element) || this;
            _this.animateSeries = true;
            _this.chartid = 57725;
            return _this;
        }
        RangeNavigator.prototype.preRender = function () {
            var blazor = 'Blazor';
            this.unWireEvents();
            this.setCulture();
            this.allowServerDataBinding = false;
            if (this.element.id === '') {
                var collection = document.getElementsByClassName('e-rangenavigator').length;
                this.element.id = 'rangenavigator_' + this.chartid + '_' + collection;
            }
            this.wireEvents();
        };
        RangeNavigator.prototype.initPrivateVariables = function () {
            this.doubleModule = new double_axis_1.Double();
            this.labels = [];
            this.rangeSlider = new slider_1.RangeSlider(this);
            this.chartSeries = new chart_render_1.RangeSeries(this);
            this.lineSeriesModule = new line_series_1.LineSeries();
            this.rangeAxis = new range_axis_1.RangeNavigatorAxis(this);
        };
        RangeNavigator.prototype.setCulture = function () {
            this.intl = new ej2_base_2.Internationalization();
        };
        RangeNavigator.prototype.setSliderValue = function () {
            var isDateTime = this.valueType === 'DateTime';
            var range = this.chartSeries.xAxis.actualRange;
            this.startValue = this.startValue ? this.startValue : (!this.value[0] ? range.min :
                (isDateTime ? (new Date(this.value[0].toString())).getTime() : +this.value[0]));
            this.endValue = this.endValue ? this.endValue : (!this.value[1] ? range.max :
                (isDateTime ? (new Date(this.value[1].toString())).getTime() : +this.value[1]));
        };
        RangeNavigator.prototype.render = function () {
            var _this = this;
            var loadEventData = {
                name: 'load', rangeNavigator: this,
                theme: this.theme
            };
            this.trigger('load', loadEventData, function () {
                _this.theme = _this.theme;
                _this.setTheme();
                _this.initPrivateVariables();
                _this.createRangeSvg();
                _this.calculateBounds();
                _this.chartSeries.renderChart(_this);
                helper_1.removeElement('chartmeasuretext');
                _this.renderComplete();
                _this.allowServerDataBinding = true;
            });
        };
        RangeNavigator.prototype.setTheme = function () {
            this.themeStyle = theme_1.getRangeThemeColor(this.theme, this);
        };
        RangeNavigator.prototype.createRangeSvg = function () {
            this.removeSvg();
            helper_1.createSvg(this);
            this.renderChartBackground();
        };
        RangeNavigator.prototype.calculateBounds = function () {
            var labelPadding = this.enableGrouping ? 15 : 8;
            var thumb = this.navigatorStyleSettings.thumb;
            var labelSize = ej2_svg_base_1.measureText('tempString', this.labelStyle).height;
            var margin = this.margin;
            var isLeightWeight = !this.series.length;
            var tooltipSpace = (!this.disableRangeSelector) &&
                isLeightWeight && this.tooltip.enable ? 35 : 0;
            if (!this.periodSelectorModule && this.periodSelectorSettings.periods.length && !this.stockChart) {
                this.periodSelectorModule = new period_selector_1.PeriodSelector(this);
            }
            var selector = this.periodSelectorModule;
            if (this.periodSelectorModule && this.periodSelectorSettings.periods.length > 0) {
                selector.periodSelectorSize = { x: 0, y: 0, height: 0, width: 0 };
                selector.periodSelectorSize.width = this.availableSize.width;
                selector.periodSelectorSize.height = this.periodSelectorSettings.height;
                selector.periodSelectorSize.y = this.periodSelectorSettings.position === 'Bottom' ?
                    this.availableSize.height - selector.periodSelectorSize.height : 0;
            }
            var periodSelectorY = this.periodSelectorSettings.position === 'Top' && selector ?
                selector.periodSelectorSize.y + selector.periodSelectorSize.height : 0;
            var left = 0;
            var top = 0;
            if (this.stockChart && this.stockChart.stockLegendModule && this.stockChart.legendSettings.visible) {
                if (this.stockChart.legendSettings.position === "Left") {
                    left += this.stockChart.stockLegendModule.legendBounds.width;
                }
                else if (this.stockChart.legendSettings.position === "Top") {
                    top += this.stockChart.stockLegendModule.legendBounds.height;
                }
            }
            this.bounds = new ej2_svg_base_1.Rect((this.themeStyle.thumbWidth / 2 + thumb.border.width + margin.left + left), margin.top + tooltipSpace + periodSelectorY + top, this.availableSize.width - this.themeStyle.thumbWidth - (thumb.border.width * 2) - margin.left - margin.right, this.availableSize.height - margin.top - margin.bottom - tooltipSpace - (selector ? selector.periodSelectorSize.height : 0));
            var deductHeight = ((this.labelPosition === 'Outside' || isLeightWeight) ?
                (labelSize + labelPadding) : 0) + ((this.tickPosition === 'Outside' || isLeightWeight) ?
                (this.majorTickLines.height) : 0);
            this.bounds.height -= deductHeight;
            if (isLeightWeight) {
                var height = this.enableGrouping ? this.bounds.height - ((labelSize) + labelPadding) : this.bounds.height;
                this.bounds.y += (this.themeStyle.thumbHeight > height ? (this.themeStyle.thumbHeight - height) / 2 : 0);
            }
            if (this.disableRangeSelector) {
                this.bounds.y = 0;
                this.bounds.height = this.periodSelectorSettings.periods.length > 0 ? this.periodSelectorSettings.height : 0;
            }
        };
        RangeNavigator.prototype.renderChart = function (resize) {
            if (resize === void 0) { resize = false; }
            this.chartSeries.renderSeries(this);
            this.rangeAxis.renderGridLines();
            this.rangeAxis.renderAxisLabels();
            this.chartSeries.appendSeriesElements(this);
            this.createSecondaryElement();
            this.setSliderValue();
            this.renderPeriodSelector();
            this.renderSlider(resize);
            if (!this.stockChart) {
                this.element.appendChild(this.svgObject);
            }
            this.trigger('loaded', { rangeNavigator: this });
            this.rangeSlider.setSlider(this.startValue, this.endValue, false, this.tooltip.enable && this.tooltip.displayMode === 'Always', resize);
        };
        RangeNavigator.prototype.renderPeriodSelector = function () {
            if (this.periodSelectorModule) {
                this.periodSelectorModule.renderSelectorElement(this);
                this.periodSelectorModule.renderSelector();
            }
        };
        RangeNavigator.prototype.createSecondaryElement = function () {
            if (this.tooltip.enable) {
                var tooltipDiv = this.createElement('div');
                tooltipDiv.id = this.element.id + '_Secondary_Element';
                tooltipDiv.style.position = 'relative';
                this.element.appendChild(tooltipDiv);
            }
        };
        RangeNavigator.prototype.renderSlider = function (resize) {
            this.rangeSlider.render(this);
            this.rangeSlider.setSlider(this.startValue, this.endValue, true, this.tooltip.enable && this.tooltip.displayMode === 'Always', resize);
        };
        RangeNavigator.prototype.removeSvg = function () {
            if (helper_2.getElement(this.element.id + '_Secondary_Element')) {
                ej2_base_2.remove(helper_2.getElement(this.element.id + '_Secondary_Element'));
                if (this.isReact) {
                    this.clearTemplate();
                }
            }
            var removeLength = 0;
            if (this.svgObject) {
                while (this.svgObject.childNodes.length > removeLength) {
                    this.svgObject.removeChild(this.svgObject.firstChild);
                }
                if (!this.svgObject.hasChildNodes() && this.svgObject.parentNode && !this.stockChart) {
                    ej2_base_2.remove(this.svgObject);
                }
            }
        };
        RangeNavigator.prototype.unWireEvents = function () {
            var startEvent = ej2_base_1.Browser.touchStartEvent;
            var moveEvent = ej2_base_1.Browser.touchMoveEvent;
            var stopEvent = ej2_base_1.Browser.touchEndEvent;
            var cancelEvent = ej2_base_1.Browser.isPointer ? 'pointerleave' : 'mouseleave';
            ej2_base_2.EventHandler.remove(this.element, startEvent, this.rangeOnMouseDown);
            ej2_base_2.EventHandler.remove(this.element, moveEvent, this.mouseMove);
            ej2_base_2.EventHandler.remove(this.element, stopEvent, this.mouseEnd);
            ej2_base_2.EventHandler.remove(this.element, 'click', this.rangeOnMouseClick);
            ej2_base_2.EventHandler.remove(this.element, cancelEvent, this.mouseLeave);
            window.removeEventListener((ej2_base_1.Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.rangeResize);
        };
        RangeNavigator.prototype.wireEvents = function () {
            var cancelEvent = ej2_base_1.Browser.isPointer ? 'pointerleave' : 'mouseleave';
            ej2_base_2.EventHandler.add(this.element, ej2_base_1.Browser.touchStartEvent, this.rangeOnMouseDown, this);
            ej2_base_2.EventHandler.add(this.element, ej2_base_1.Browser.touchMoveEvent, this.mouseMove, this);
            ej2_base_2.EventHandler.add(this.element, ej2_base_1.Browser.touchEndEvent, this.mouseEnd, this);
            ej2_base_2.EventHandler.add(this.element, 'click', this.rangeOnMouseClick, this);
            ej2_base_2.EventHandler.add(this.element, cancelEvent, this.mouseLeave, this);
            window.addEventListener((ej2_base_1.Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.rangeResize.bind(this));
            var element = this.element;
            element.style.touchAction = 'none';
            element.style.msTouchAction = 'none';
            element.style.msContentZooming = 'none';
            element.style.msUserSelect = 'none';
            element.style.webkitUserSelect = 'none';
            element.style.position = 'relative';
            element.style.display = 'block';
        };
        RangeNavigator.prototype.rangeResize = function () {
            var _this = this;
            if (!document.getElementById(this.element.id)) {
                return false;
            }
            this.animateSeries = false;
            this.removeAllTooltip();
            var beforeResizeArgs = { name: 'beforeResize', cancelResizedEvent: false };
            if (this.resizeTo) {
                clearTimeout(this.resizeTo);
            }
            var arg = {
                rangeNavigator: this,
                name: 'resized',
                currentSize: new ej2_svg_base_1.Size(0, 0),
                previousSize: new ej2_svg_base_1.Size(this.availableSize.width, this.availableSize.height)
            };
            this.trigger(constants_1.beforeResize, beforeResizeArgs);
            if (!beforeResizeArgs.cancelResizedEvent) {
                this.resizeTo = +setTimeout(function () {
                    if (_this.isDestroyed) {
                        clearTimeout(_this.resizeTo);
                        return;
                    }
                    _this.createRangeSvg();
                    arg.currentSize = _this.availableSize;
                    _this.trigger('resized', arg);
                    _this.calculateBounds();
                    _this.chartSeries.processXAxis(_this);
                    _this.chartSeries.calculateGroupingBounds(_this);
                    _this.chartSeries.processYAxis(_this);
                    _this.renderChart(true);
                }, 500);
            }
            return false;
        };
        RangeNavigator.prototype.removeAllTooltip = function () {
            if (this.tooltip.enable && this.tooltip.displayMode === 'Always') {
                if (helper_2.getElement(this.element.id + '_leftTooltip')) {
                    ej2_base_2.remove(helper_2.getElement(this.element.id + '_leftTooltip'));
                }
                if (helper_2.getElement(this.element.id + '_rightTooltip')) {
                    ej2_base_2.remove(helper_2.getElement(this.element.id + '_rightTooltip'));
                }
            }
        };
        RangeNavigator.prototype.mouseMove = function (e) {
            if (helper_2.getElement(!this.stockChart ? this.element.id + '_svg' : this.element.id)) {
                this.mouseX = this.setMouseX(e);
                this.notify(ej2_base_1.Browser.touchMoveEvent, e);
            }
            return false;
        };
        RangeNavigator.prototype.mouseLeave = function (e) {
            var rangeSlider = this.rangeSlider;
            if (rangeSlider.isDrag) {
                var enabledTooltip = rangeSlider.control.tooltip.enable;
                if (rangeSlider.control.allowSnapping) {
                    rangeSlider.isDrag = false;
                    rangeSlider.setAllowSnapping(rangeSlider.control, rangeSlider.currentStart, rangeSlider.currentEnd, false, enabledTooltip);
                }
                rangeSlider.triggerEvent(this.chartSeries.xAxis.actualRange);
            }
            var cancelEvent = ej2_base_1.Browser.isPointer ? 'pointerleave' : 'mouseleave';
            this.mouseX = this.setMouseX(e);
            this.notify(cancelEvent, e);
            return false;
        };
        RangeNavigator.prototype.rangeOnMouseClick = function (e) {
            this.notify('click', e);
            return false;
        };
        RangeNavigator.prototype.print = function (id) {
            new export_1.ExportUtils(this).print(id);
        };
        RangeNavigator.prototype.export = function (type, fileName, orientation, controls, width, height, isVertical) {
            controls = controls ? controls : [this];
            new export_1.ExportUtils(this).export(type, fileName, orientation, controls, width, height, isVertical);
        };
        RangeNavigator.prototype.renderChartBackground = function () {
            var top = 0;
            var left = 0;
            if (this.stockChart && this.stockChart.legendSettings.visible && this.stockChart.stockLegendModule) {
                if (this.stockChart.legendSettings.position === "Top") {
                    top += this.stockChart.stockLegendModule.legendBounds.height;
                }
                else if (this.stockChart.legendSettings.position === "Left") {
                    left += this.stockChart.stockLegendModule.legendBounds.width;
                }
            }
            var rect = new helper_2.RectOption(this.element.id + '_ChartBorder', this.background || this.themeStyle.background, { width: 0, color: 'transparent' }, 1, new ej2_svg_base_1.Rect(left, top, this.availableSize.width, this.availableSize.height));
            this.svgObject.appendChild(this.renderer.drawRectangle(rect));
        };
        RangeNavigator.prototype.rangeOnMouseDown = function (e) {
            this.mouseDownX = this.setMouseX(e);
            this.notify(ej2_base_1.Browser.touchStartEvent, e);
            return false;
        };
        RangeNavigator.prototype.mouseEnd = function (e) {
            this.mouseX = this.setMouseX(e);
            this.notify(ej2_base_1.Browser.touchEndEvent, e);
            return false;
        };
        RangeNavigator.prototype.setMouseX = function (e) {
            var pageX = e.type.indexOf('touch') > -1 ?
                e.changedTouches[0].clientX : e.clientX;
            var rect = this.element.getBoundingClientRect();
            var svgRect = !this.stockChart ? helper_2.getElement(this.element.id + '_svg').getBoundingClientRect() :
                helper_2.getElement(this.element.id).getBoundingClientRect();
            return (pageX - rect.left) - Math.max(svgRect.left - rect.left, 0);
        };
        RangeNavigator.prototype.getPersistData = function () {
            var keyEntity = ['loaded'];
            return this.addOnPersist(keyEntity);
        };
        RangeNavigator.prototype.onPropertyChanged = function (newProp, oldProp) {
            var renderer = false;
            var refreshBounds = false;
            var refreshRange = false;
            this.animateSeries = false;
            for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
                var prop = _a[_i];
                switch (prop) {
                    case 'width':
                    case 'height':
                    case 'navigatorBorder':
                    case 'enableGrouping':
                    case 'labelPosition':
                    case 'tickPosition':
                    case 'labelStyle':
                        refreshBounds = true;
                        break;
                    case 'enableRtl':
                    case 'xName':
                    case 'yName':
                    case 'query':
                    case 'minimum':
                    case 'maximum':
                    case 'interval':
                    case 'intervalType':
                    case 'logBase':
                    case 'valueType':
                    case 'majorGridLines':
                    case 'minorGridLines':
                    case 'navigatorStyleSettings':
                    case 'labelFormat':
                    case 'skeleton':
                    case 'skeletonType':
                    case 'secondaryLabelAlignment':
                    case "background":
                        renderer = true;
                        break;
                    case 'dataSource':
                    case 'series':
                        renderer = true;
                        refreshBounds = true;
                        break;
                    case 'theme':
                        this.animateSeries = true;
                        break;
                    case 'locale':
                        _super.prototype.refresh.call(this);
                        break;
                    case 'value':
                        this.startValue = null;
                        this.endValue = null;
                        refreshRange = true;
                        break;
                }
            }
            if (!refreshBounds && renderer) {
                this.removeSvg();
                this.chartSeries.xMin = Infinity;
                this.chartSeries.xMax = -Infinity;
                this.chartSeries.renderChart(this);
            }
            if (refreshBounds && renderer) {
                this.removeSvg();
                this.chartSeries.xMin = this.chartSeries.yMin = Infinity;
                this.chartSeries.xMax = this.chartSeries.yMax = -Infinity;
                this.calculateBounds();
                this.chartSeries.renderChart(this);
            }
            if (refreshBounds && !renderer) {
                this.removeSvg();
                this.calculateBounds();
                this.chartSeries.renderChart(this);
            }
            if (!refreshBounds && !renderer && refreshRange) {
                this.setSliderValue();
                this.rangeSlider.setSlider(this.startValue, this.endValue, true, this.tooltip.enable && this.tooltip.displayMode === 'Always');
            }
        };
        RangeNavigator.prototype.requiredModules = function () {
            var _this = this;
            var modules = [];
            this.series.map(function (series) {
                modules.push({
                    member: series.type + 'Series',
                    args: [_this]
                });
            });
            if (this.periodSelectorSettings.periods.length > 0) {
                modules.push({
                    member: 'PeriodSelector',
                    args: [this]
                });
            }
            if (this.valueType !== 'Double') {
                modules.push({
                    member: this.valueType,
                    args: [this]
                });
            }
            if (this.tooltip.enable) {
                modules.push({
                    member: 'RangeTooltip',
                    args: [this]
                });
            }
            return modules;
        };
        RangeNavigator.prototype.getModuleName = function () {
            return 'rangeNavigator';
        };
        RangeNavigator.prototype.destroy = function () {
            this.unWireEvents();
            if (this.isReact) {
                this.clearTemplate();
            }
            this.rangeSlider.destroy();
            _super.prototype.destroy.call(this);
            this.element.innerHTML = '';
            this.element.classList.remove('e-rangenavigator');
        };
        return RangeNavigator;
    }(ej2_base_1.Component));
    __decorate([
        ej2_base_1.Property(null)
    ], RangeNavigator.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], RangeNavigator.prototype, "height", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], RangeNavigator.prototype, "dataSource", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], RangeNavigator.prototype, "xName", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], RangeNavigator.prototype, "yName", void 0);
    __decorate([
        ej2_base_1.Property()
    ], RangeNavigator.prototype, "query", void 0);
    __decorate([
        ej2_base_1.Collection([], range_base_1.RangeNavigatorSeries)
    ], RangeNavigator.prototype, "series", void 0);
    __decorate([
        ej2_base_1.Complex({}, range_base_1.RangeTooltipSettings)
    ], RangeNavigator.prototype, "tooltip", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], RangeNavigator.prototype, "minimum", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], RangeNavigator.prototype, "maximum", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], RangeNavigator.prototype, "interval", void 0);
    __decorate([
        ej2_base_1.Property('Auto')
    ], RangeNavigator.prototype, "intervalType", void 0);
    __decorate([
        ej2_base_1.Property('Hide')
    ], RangeNavigator.prototype, "labelIntersectAction", void 0);
    __decorate([
        ej2_base_1.Property(10)
    ], RangeNavigator.prototype, "logBase", void 0);
    __decorate([
        ej2_base_1.Property('Double')
    ], RangeNavigator.prototype, "valueType", void 0);
    __decorate([
        ej2_base_1.Property('Outside')
    ], RangeNavigator.prototype, "labelPosition", void 0);
    __decorate([
        ej2_base_1.Property(500)
    ], RangeNavigator.prototype, "animationDuration", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], RangeNavigator.prototype, "enableGrouping", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], RangeNavigator.prototype, "enableDeferredUpdate", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], RangeNavigator.prototype, "disableRangeSelector", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], RangeNavigator.prototype, "allowSnapping", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], RangeNavigator.prototype, "allowIntervalData", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], RangeNavigator.prototype, "useGroupingSeparator", void 0);
    __decorate([
        ej2_base_1.Property()
    ], RangeNavigator.prototype, "groupBy", void 0);
    __decorate([
        ej2_base_1.Property('Outside')
    ], RangeNavigator.prototype, "tickPosition", void 0);
    __decorate([
        ej2_base_1.Complex(theme_2.RangeNavigatorTheme.axisLabelFont, base_2.Font)
    ], RangeNavigator.prototype, "labelStyle", void 0);
    __decorate([
        ej2_base_1.Complex({}, axis_1.MajorGridLines)
    ], RangeNavigator.prototype, "majorGridLines", void 0);
    __decorate([
        ej2_base_1.Complex({}, axis_1.MajorTickLines)
    ], RangeNavigator.prototype, "majorTickLines", void 0);
    __decorate([
        ej2_base_1.Complex({}, range_base_1.StyleSettings)
    ], RangeNavigator.prototype, "navigatorStyleSettings", void 0);
    __decorate([
        ej2_base_1.Complex({}, base_1.PeriodSelectorSettings)
    ], RangeNavigator.prototype, "periodSelectorSettings", void 0);
    __decorate([
        ej2_base_1.Complex({ color: '#DDDDDD', width: 1 }, base_1.Border)
    ], RangeNavigator.prototype, "navigatorBorder", void 0);
    __decorate([
        ej2_base_1.Property('Material')
    ], RangeNavigator.prototype, "theme", void 0);
    __decorate([
        ej2_base_1.Property([])
    ], RangeNavigator.prototype, "value", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], RangeNavigator.prototype, "background", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], RangeNavigator.prototype, "labelFormat", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], RangeNavigator.prototype, "skeleton", void 0);
    __decorate([
        ej2_base_1.Property('DateTime')
    ], RangeNavigator.prototype, "skeletonType", void 0);
    __decorate([
        ej2_base_1.Property('Middle')
    ], RangeNavigator.prototype, "secondaryLabelAlignment", void 0);
    __decorate([
        ej2_base_1.Complex({ top: 5, bottom: 5, right: 5, left: 5 }, base_1.Margin)
    ], RangeNavigator.prototype, "margin", void 0);
    __decorate([
        ej2_base_3.Event()
    ], RangeNavigator.prototype, "load", void 0);
    __decorate([
        ej2_base_3.Event()
    ], RangeNavigator.prototype, "loaded", void 0);
    __decorate([
        ej2_base_3.Event()
    ], RangeNavigator.prototype, "resized", void 0);
    __decorate([
        ej2_base_3.Event()
    ], RangeNavigator.prototype, "beforeResize", void 0);
    __decorate([
        ej2_base_3.Event()
    ], RangeNavigator.prototype, "labelRender", void 0);
    __decorate([
        ej2_base_3.Event()
    ], RangeNavigator.prototype, "changed", void 0);
    __decorate([
        ej2_base_3.Event()
    ], RangeNavigator.prototype, "tooltipRender", void 0);
    __decorate([
        ej2_base_3.Event()
    ], RangeNavigator.prototype, "selectorRender", void 0);
    __decorate([
        ej2_base_3.Event()
    ], RangeNavigator.prototype, "beforePrint", void 0);
    RangeNavigator = __decorate([
        ej2_base_1.NotifyPropertyChanges
    ], RangeNavigator);
    exports.RangeNavigator = RangeNavigator;
});
