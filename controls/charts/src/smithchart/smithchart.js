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
define(["require", "exports", "@syncfusion/ej2-base", "@syncfusion/ej2-base", "@syncfusion/ej2-base", "../smithchart/utils/helper", "../smithchart/utils/helper", "../smithchart/utils/utils", "../smithchart/utils/utils", "../smithchart/model/theme", "../smithchart/legend/legend", "../smithchart/axis/axis", "../smithchart/title/title", "../smithchart/series/series", "../smithchart/utils/area", "../smithchart/axis/axisrender", "../smithchart/series/seriesrender", "@syncfusion/ej2-base", "../smithchart/model/theme", "../smithchart/utils/export", "../smithchart/model/constant"], function (require, exports, ej2_base_1, ej2_base_2, ej2_base_3, helper_1, helper_2, utils_1, utils_2, theme_1, legend_1, axis_1, title_1, series_1, area_1, axisrender_1, seriesrender_1, ej2_base_4, theme_2, export_1, constant_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Smithchart = (function (_super) {
        __extends(Smithchart, _super);
        function Smithchart(options, element) {
            return _super.call(this, options, element) || this;
        }
        Smithchart.prototype.getModuleName = function () {
            return 'smithchart';
        };
        Smithchart.prototype.getPersistData = function () {
            return '';
        };
        Smithchart.prototype.createChartSvg = function () {
            this.removeSvg();
            helper_1.createSvg(this);
        };
        Smithchart.prototype.renderTitle = function (title, type, groupEle) {
            var _this = this;
            var font = title.font ? title.font : title.textStyle;
            var textSize = helper_1.measureText(title.text, font);
            var x;
            var textAlignment = title.textAlignment;
            var titleText = title.text;
            var maxTitleWidth = (ej2_base_2.isNullOrUndefined(title.maximumWidth)) ?
                Math.abs(this.margin.left + this.margin.right - (this.availableSize.width)) :
                title.maximumWidth;
            var titleWidthEnable = textSize.width > maxTitleWidth ? true : false;
            if (textSize.width > this.availableSize.width) {
                x = this.margin.left + this.border.width;
            }
            else {
                x = textAlignment === 'Center' ? (this.availableSize.width / 2 - textSize['width'] / 2) :
                    (textAlignment === 'Near' ? (this.margin.left + this.elementSpacing + this.border.width) : (this.availableSize.width
                        - textSize['width'] - (this.margin.right + this.elementSpacing + this.border.width)));
            }
            var y = this.margin.top + textSize['height'] / 2 + this.elementSpacing;
            if (title.enableTrim && titleWidthEnable) {
                titleText = helper_2.textTrim(maxTitleWidth, title.text, font);
                textSize = helper_1.measureText(titleText, font);
            }
            groupEle = this.renderer.createGroup({ id: this.element.id + '_Title_Group' });
            var titleEventArgs = {
                text: titleText,
                x: x,
                y: y,
                name: constant_1.titleRender,
                cancel: false
            };
            var options;
            var titleRenderSuccess = function (args) {
                if (!args.cancel) {
                    options = new helper_1.TextOption(_this.element.id + '_Smithchart_' + type, args.x, args.y, 'start', args.text);
                    font.fontFamily = _this.themeStyle.fontFamily || title.textStyle.fontFamily;
                    font.size = _this.themeStyle.fontSize || title.textStyle.size;
                    var element = helper_1.renderTextElement(options, font, _this.themeStyle.chartTitle, groupEle);
                    element.setAttribute('aria-label', title.description || args.text);
                    var titleLocation = { x: args.x, y: args.y, textSize: textSize };
                    _this.svgObject.appendChild(groupEle);
                    if (title.subtitle.text !== '' && title.subtitle.visible) {
                        _this.renderSubtitle(title, type, textSize, _this.availableSize, titleLocation, groupEle);
                    }
                }
            };
            titleRenderSuccess.bind(this);
            this.trigger(constant_1.titleRender, titleEventArgs, titleRenderSuccess);
        };
        Smithchart.prototype.renderSubtitle = function (title, type, textSize, size, titleLocation, groupEle) {
            var _this = this;
            var font = title.subtitle.textStyle;
            var subTitle = title.subtitle;
            var subTitleSize = helper_1.measureText(subTitle.text, font);
            var subTitleText = subTitle.text;
            var maxSubTitleWidth = ej2_base_2.isNullOrUndefined(subTitle.maximumWidth) ?
                (this.bounds.width * 0.75) : subTitle.maximumWidth;
            if (subTitle.enableTrim && subTitleSize.width > maxSubTitleWidth) {
                subTitleText = helper_2.textTrim(maxSubTitleWidth, subTitle.text, font);
            }
            var x = title['subtitle'].textAlignment === 'Far' ? (titleLocation.x + (titleLocation.textSize.width)) :
                (title['subtitle'].textAlignment === 'Near') ? titleLocation.x :
                    (titleLocation.x + (titleLocation.textSize.width / 2));
            var y = titleLocation.y + (2 * this.elementSpacing);
            var textAnchor = title['subtitle'].textAlignment === 'Far' ? 'end' :
                (title['subtitle'].textAlignment === 'Near') ? 'start' : 'middle';
            var subtitleEventArgs = {
                text: subTitleText,
                x: x,
                y: y,
                name: constant_1.subtitleRender,
                cancel: false
            };
            var subtitleRenderSuccess = function (args) {
                if (!args.cancel) {
                    var options = new helper_1.TextOption(_this.element.id + '_Smithchart_' + type, args.x, args.y, textAnchor, args.text);
                    var element = helper_1.renderTextElement(options, font, _this.themeStyle.chartTitle, groupEle);
                    element.setAttribute('aria-label', subTitle.description || args.text);
                    groupEle.appendChild(element);
                }
            };
            subtitleRenderSuccess.bind(this);
            this.trigger(constant_1.subtitleRender, subtitleEventArgs, subtitleRenderSuccess);
        };
        Smithchart.prototype.renderBorder = function () {
            var border = this.border;
            this.background = this.background ? this.background : this.themeStyle.background;
            var borderRect = new helper_1.RectOption(this.element.id + '_SmithchartBorder', this.background, border, 1, new utils_1.SmithchartRect(border.width / 2, border.width / 2, this.availableSize.width - border.width, this.availableSize.height - border.width));
            this.svgObject.appendChild(this.renderer.drawRectangle(borderRect));
        };
        Smithchart.prototype.onPropertyChanged = function (newProp, oldProp) {
            var renderer = false;
            for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
                var prop = _a[_i];
                switch (prop) {
                    case 'background':
                    case 'border':
                    case 'series':
                    case 'legendSettings':
                    case 'radius':
                        renderer = true;
                        break;
                    case 'size':
                        this.createChartSvg();
                        renderer = true;
                        break;
                    case 'theme':
                    case 'renderType':
                        this.animateSeries = true;
                        renderer = true;
                        break;
                }
            }
            if (renderer) {
                this.render();
            }
        };
        Smithchart.prototype.preRender = function () {
            this.allowServerDataBinding = false;
            this.trigger(constant_1.load, { smithchart: this });
            this.unWireEVents();
            this.initPrivateVariable();
            this.wireEVents();
        };
        Smithchart.prototype.initPrivateVariable = function () {
            this.animateSeries = true;
        };
        Smithchart.prototype.setTheme = function () {
            this.themeStyle = theme_1.getThemeColor(this.theme);
            this.seriesColors = theme_2.getSeriesColor(this.theme);
        };
        Smithchart.prototype.render = function () {
            this.createChartSvg();
            this.element.appendChild(this.svgObject);
            this.setTheme();
            this.createSecondaryElement();
            this.renderBorder();
            if (this.smithchartLegendModule && this.legendSettings.visible) {
                this.legendBounds = this.smithchartLegendModule.renderLegend(this);
            }
            this.legendBounds = this.legendBounds ? this.legendBounds : { x: 0, y: 0, width: 0, height: 0 };
            var areaBounds = new area_1.AreaBounds();
            this.bounds = areaBounds.calculateAreaBounds(this, this.title, this.legendBounds);
            if (this.title.text !== '' && this.title.visible) {
                this.renderTitle(this.title, 'title', null);
            }
            var axisRender = new axisrender_1.AxisRender();
            axisRender.renderArea(this, this.bounds);
            this.seriesrender = new seriesrender_1.SeriesRender();
            this.seriesrender.draw(this, axisRender, this.bounds);
            this.renderComplete();
            this.allowServerDataBinding = true;
            this.trigger(constant_1.loaded, { smithchart: this });
        };
        Smithchart.prototype.createSecondaryElement = function () {
            if (ej2_base_2.isNullOrUndefined(document.getElementById(this.element.id + '_Secondary_Element'))) {
                var secondaryElement = ej2_base_3.createElement('div', {
                    id: this.element.id + '_Secondary_Element',
                    styles: 'z-index:1;'
                });
                this.element.appendChild(secondaryElement);
                var rect = this.element.getBoundingClientRect();
                var svgRect = document.getElementById(this.element.id + '_svg');
                if (svgRect) {
                    var svgClientRect = svgRect.getBoundingClientRect();
                    secondaryElement.style.left = Math.max(svgClientRect.left - rect.left, 0) + 'px';
                    secondaryElement.style.top = Math.max(svgClientRect.top - rect.top, 0) + 'px';
                }
            }
            else {
                helper_2.removeElement(this.element.id + '_Secondary_Element');
            }
        };
        Smithchart.prototype.destroy = function () {
            if (this.element) {
                this.unWireEVents();
                _super.prototype.destroy.call(this);
                this.element.classList.remove('e-smithchart');
                this.removeSvg();
                this.svgObject = null;
            }
        };
        Smithchart.prototype.wireEVents = function () {
            ej2_base_3.EventHandler.add(this.element, 'click', this.smithchartOnClick, this);
            ej2_base_3.EventHandler.add(this.element, ej2_base_2.Browser.touchMoveEvent, this.mouseMove, this);
            ej2_base_3.EventHandler.add(this.element, ej2_base_2.Browser.touchEndEvent, this.mouseEnd, this);
            window.addEventListener((ej2_base_2.Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.smithchartOnResize.bind(this));
        };
        Smithchart.prototype.mouseMove = function (e) {
            if (e.type === 'touchmove') {
                this.isTouch = true;
            }
            else {
                this.isTouch = e.pointerType === 'touch' || e.pointerType === '2' || this.isTouch;
            }
            if (this.tooltipRenderModule && !this.isTouch) {
                this.tooltipRenderModule.smithchartMouseMove(this, e);
            }
        };
        Smithchart.prototype.mouseEnd = function (e) {
            if (e.type === 'touchend') {
                this.isTouch = true;
            }
            else {
                this.isTouch = e.pointerType === 'touch' || e.pointerType === '2';
            }
            if (this.tooltipRenderModule && this.isTouch) {
                var tooltipElement_1 = this.tooltipRenderModule.smithchartMouseMove(this, e);
                if (tooltipElement_1) {
                    this.fadeoutTo = +setTimeout(function () {
                        tooltipElement_1.fadeOut();
                    }, 2000);
                }
            }
        };
        Smithchart.prototype.smithchartOnClick = function (e) {
            var targetEle = e.target;
            var targetId = targetEle.id;
            var parentElement = document.getElementById(targetId).parentElement;
            var grpElement = document.getElementById(parentElement.id).parentElement;
            if (grpElement.id === 'containerlegendItem_Group' && this.legendSettings.toggleVisibility) {
                var childElement = parentElement.childNodes[1];
                var circleElement = parentElement.childNodes[0];
                var legendText = childElement.textContent;
                var seriesIndex = void 0;
                var fill = void 0;
                for (var i = 0; i < this.smithchartLegendModule.legendSeries.length; i++) {
                    if (legendText === this.smithchartLegendModule.legendSeries[i]['text']) {
                        seriesIndex = this.smithchartLegendModule.legendSeries[i].seriesIndex;
                        fill = this.smithchartLegendModule.legendSeries[i].fill;
                    }
                }
                var seriesElement = document.getElementById(this.element.id + '_svg' + '_seriesCollection' + seriesIndex);
                if (seriesElement.getAttribute('visibility') === 'visible') {
                    circleElement.setAttribute('fill', 'gray');
                    seriesElement.setAttribute('visibility', 'hidden');
                    this.series[seriesIndex].visibility = 'hidden';
                }
                else {
                    circleElement.setAttribute('fill', fill);
                    seriesElement.setAttribute('visibility', 'visible');
                    this.series[seriesIndex].visibility = 'visible';
                }
            }
        };
        Smithchart.prototype.unWireEVents = function () {
            ej2_base_3.EventHandler.remove(this.element, 'click', this.smithchartOnClick);
            ej2_base_3.EventHandler.remove(this.element, ej2_base_2.Browser.touchMoveEvent, this.mouseMove);
            ej2_base_3.EventHandler.remove(this.element, ej2_base_2.Browser.touchEndEvent, this.mouseEnd);
            window.removeEventListener((ej2_base_2.Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.smithchartOnResize);
        };
        Smithchart.prototype.print = function (id) {
            var exportChart = new export_1.ExportUtils(this);
            exportChart.print(id);
        };
        Smithchart.prototype.export = function (type, fileName, orientation) {
            var exportMap = new export_1.ExportUtils(this);
            exportMap.export(type, fileName, orientation);
        };
        Smithchart.prototype.smithchartOnResize = function () {
            var _this = this;
            this.animateSeries = false;
            if (this.resizeTo) {
                clearTimeout(this.resizeTo);
            }
            this.resizeTo = +setTimeout(function () {
                _this.render();
            }, 500);
            return false;
        };
        Smithchart.prototype.requiredModules = function () {
            var modules = [];
            if (this.legendSettings.visible) {
                modules.push({
                    member: 'SmithchartLegend',
                    args: [this]
                });
            }
            for (var i = 0; i < this.series.length; i++) {
                if (this.series[i].tooltip.visible) {
                    modules.push({
                        member: 'TooltipRender',
                        args: [this]
                    });
                    break;
                }
            }
            return modules;
        };
        Smithchart.prototype.removeSvg = function () {
            helper_2.removeElement(this.element.id + '_Secondary_Element');
            var removeLength = 0;
            if (this.svgObject) {
                while (this.svgObject.childNodes.length > removeLength) {
                    this.svgObject.removeChild(this.svgObject.firstChild);
                }
                if (!this.svgObject.hasChildNodes() && this.svgObject.parentNode) {
                    ej2_base_3.remove(this.svgObject);
                }
            }
        };
        return Smithchart;
    }(ej2_base_1.Component));
    __decorate([
        ej2_base_1.Property('Impedance')
    ], Smithchart.prototype, "renderType", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], Smithchart.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], Smithchart.prototype, "height", void 0);
    __decorate([
        ej2_base_1.Property('Material')
    ], Smithchart.prototype, "theme", void 0);
    __decorate([
        ej2_base_1.Complex({}, utils_2.SmithchartMargin)
    ], Smithchart.prototype, "margin", void 0);
    __decorate([
        ej2_base_1.Complex({}, utils_2.SmithchartFont)
    ], Smithchart.prototype, "font", void 0);
    __decorate([
        ej2_base_1.Complex({}, utils_2.SmithchartBorder)
    ], Smithchart.prototype, "border", void 0);
    __decorate([
        ej2_base_1.Complex({}, title_1.Title)
    ], Smithchart.prototype, "title", void 0);
    __decorate([
        ej2_base_4.Collection([{}], series_1.SmithchartSeries)
    ], Smithchart.prototype, "series", void 0);
    __decorate([
        ej2_base_1.Complex({}, legend_1.SmithchartLegendSettings)
    ], Smithchart.prototype, "legendSettings", void 0);
    __decorate([
        ej2_base_1.Complex({}, axis_1.SmithchartAxis)
    ], Smithchart.prototype, "horizontalAxis", void 0);
    __decorate([
        ej2_base_1.Complex({}, axis_1.SmithchartAxis)
    ], Smithchart.prototype, "radialAxis", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Smithchart.prototype, "background", void 0);
    __decorate([
        ej2_base_1.Property(10)
    ], Smithchart.prototype, "elementSpacing", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], Smithchart.prototype, "radius", void 0);
    __decorate([
        ej2_base_3.Event()
    ], Smithchart.prototype, "beforePrint", void 0);
    __decorate([
        ej2_base_3.Event()
    ], Smithchart.prototype, "animationComplete", void 0);
    __decorate([
        ej2_base_3.Event()
    ], Smithchart.prototype, "load", void 0);
    __decorate([
        ej2_base_3.Event()
    ], Smithchart.prototype, "loaded", void 0);
    __decorate([
        ej2_base_3.Event()
    ], Smithchart.prototype, "legendRender", void 0);
    __decorate([
        ej2_base_3.Event()
    ], Smithchart.prototype, "titleRender", void 0);
    __decorate([
        ej2_base_3.Event()
    ], Smithchart.prototype, "subtitleRender", void 0);
    __decorate([
        ej2_base_3.Event()
    ], Smithchart.prototype, "textRender", void 0);
    __decorate([
        ej2_base_3.Event()
    ], Smithchart.prototype, "axisLabelRender", void 0);
    __decorate([
        ej2_base_3.Event()
    ], Smithchart.prototype, "seriesRender", void 0);
    __decorate([
        ej2_base_3.Event()
    ], Smithchart.prototype, "tooltipRender", void 0);
    Smithchart = __decorate([
        ej2_base_1.NotifyPropertyChanges
    ], Smithchart);
    exports.Smithchart = Smithchart;
});
