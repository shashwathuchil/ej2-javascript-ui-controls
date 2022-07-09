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
define(["require", "exports", "@syncfusion/ej2-base", "@syncfusion/ej2-svg-base", "../model/base", "../model/theme", "../utils/helper", "../utils/helper", "../utils/helper"], function (require, exports, ej2_base_1, ej2_svg_base_1, base_1, theme_1, helper_1, helper_2, helper_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Location = (function (_super) {
        __extends(Location, _super);
        function Location() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Location;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(0)
    ], Location.prototype, "x", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], Location.prototype, "y", void 0);
    exports.Location = Location;
    var LegendSettings = (function (_super) {
        __extends(LegendSettings, _super);
        function LegendSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return LegendSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(true)
    ], LegendSettings.prototype, "visible", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], LegendSettings.prototype, "height", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], LegendSettings.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Complex({ x: 0, y: 0 }, Location)
    ], LegendSettings.prototype, "location", void 0);
    __decorate([
        ej2_base_1.Property('Auto')
    ], LegendSettings.prototype, "position", void 0);
    __decorate([
        ej2_base_1.Property('Series')
    ], LegendSettings.prototype, "mode", void 0);
    __decorate([
        ej2_base_1.Property(8)
    ], LegendSettings.prototype, "padding", void 0);
    __decorate([
        ej2_base_1.Property('Center')
    ], LegendSettings.prototype, "alignment", void 0);
    __decorate([
        ej2_base_1.Complex(theme_1.Theme.legendLabelFont, base_1.Font)
    ], LegendSettings.prototype, "textStyle", void 0);
    __decorate([
        ej2_base_1.Property(10)
    ], LegendSettings.prototype, "shapeHeight", void 0);
    __decorate([
        ej2_base_1.Property(10)
    ], LegendSettings.prototype, "shapeWidth", void 0);
    __decorate([
        ej2_base_1.Complex({}, base_1.Border)
    ], LegendSettings.prototype, "border", void 0);
    __decorate([
        ej2_base_1.Complex({ left: 0, right: 0, top: 0, bottom: 0 }, base_1.Margin)
    ], LegendSettings.prototype, "margin", void 0);
    __decorate([
        ej2_base_1.Complex({ left: 0, right: 0, top: 0, bottom: 0 }, base_1.ContainerPadding)
    ], LegendSettings.prototype, "containerPadding", void 0);
    __decorate([
        ej2_base_1.Property(5)
    ], LegendSettings.prototype, "shapePadding", void 0);
    __decorate([
        ej2_base_1.Property('transparent')
    ], LegendSettings.prototype, "background", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], LegendSettings.prototype, "opacity", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], LegendSettings.prototype, "toggleVisibility", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], LegendSettings.prototype, "description", void 0);
    __decorate([
        ej2_base_1.Property(3)
    ], LegendSettings.prototype, "tabIndex", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], LegendSettings.prototype, "title", void 0);
    __decorate([
        ej2_base_1.Complex(theme_1.Theme.legendTitleFont, base_1.Font)
    ], LegendSettings.prototype, "titleStyle", void 0);
    __decorate([
        ej2_base_1.Property('Top')
    ], LegendSettings.prototype, "titlePosition", void 0);
    __decorate([
        ej2_base_1.Property('Normal')
    ], LegendSettings.prototype, "textWrap", void 0);
    __decorate([
        ej2_base_1.Property('Ellipsis')
    ], LegendSettings.prototype, "textOverflow", void 0);
    __decorate([
        ej2_base_1.Property(100)
    ], LegendSettings.prototype, "maximumTitleWidth", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], LegendSettings.prototype, "maximumLabelWidth", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], LegendSettings.prototype, "enablePages", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], LegendSettings.prototype, "isInversed", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], LegendSettings.prototype, "reverse", void 0);
    exports.LegendSettings = LegendSettings;
    var BaseLegend = (function () {
        function BaseLegend(chart) {
            this.maxItemHeight = 0;
            this.rowHeights = [];
            this.pageHeights = [];
            this.columnHeights = [];
            this.pageXCollections = [];
            this.chartRowCount = 1;
            this.legendTitleCollections = [];
            this.legendRegions = [];
            this.pagingRegions = [];
            this.chart = chart;
            this.legend = chart.legendSettings;
            this.legendID = chart.element.id + '_chart_legend';
            this.isChartControl = (chart.getModuleName() === 'chart');
            this.isAccChartControl = (chart.getModuleName() === 'accumulationchart');
            this.isBulletChartControl = (chart.getModuleName() === 'bulletChart');
            this.isStockChartControl = (chart.getModuleName() === 'stockChart');
            this.bulletChart = this.chart;
            this.fivePixel = 5;
            this.rowCount = 0;
            this.pageButtonSize = 8;
            this.maxColumns = 0;
            this.maxWidth = 0;
            this.currentPage = 1;
            this.backwardArrowOpacity = 0;
            this.forwardArrowOpacity = 1;
            this.arrowWidth = (2 * (this.fivePixel + this.pageButtonSize + this.fivePixel));
            this.arrowHeight = this.arrowWidth;
            this.isTop = false;
            this.isTitle = false;
            this.currentPageNumber = 1;
        }
        BaseLegend.prototype.calculateLegendBounds = function (rect, availableSize, maxLabelSize) {
            var legend = this.legend;
            var defaultValue = (this.isBulletChartControl) ? '40%' : '20%';
            this.getPosition(legend.position, availableSize);
            this.legendBounds = new ej2_svg_base_1.Rect(rect.x, rect.y, 0, 0);
            this.isVertical = (this.position === 'Left' || this.position === 'Right');
            if (this.isVertical) {
                this.legendBounds.height = helper_2.stringToNumber(legend.height, availableSize.height - (rect.y - this.chart.margin.top)) || rect.height;
                this.legendBounds.width = helper_2.stringToNumber(legend.width || defaultValue, availableSize.width);
            }
            else {
                this.legendBounds.width = helper_2.stringToNumber(legend.width, availableSize.width) || rect.width;
                this.legendBounds.height = helper_2.stringToNumber(legend.height || defaultValue, availableSize.height);
            }
            this.library.getLegendBounds(availableSize, this.legendBounds, legend);
            if (!this.isBulletChartControl) {
                this.legendBounds.width += (this.legend.containerPadding.left + this.legend.containerPadding.right);
                this.legendBounds.height += (this.legend.containerPadding.top + this.legend.containerPadding.bottom);
            }
            this.getLocation(this.position, legend.alignment, this.legendBounds, rect, availableSize, maxLabelSize);
        };
        BaseLegend.prototype.getPosition = function (position, availableSize) {
            var chart = this.chart;
            var accumulation = this.chart;
            if (this.isChartControl || this.isBulletChartControl || this.isStockChartControl) {
                this.position = (position !== 'Auto') ? position : 'Bottom';
            }
            else {
                if (position === 'Auto' && ((chart || accumulation).visibleSeries && (chart || accumulation).visibleSeries[0].type === 'Funnel' || (chart || accumulation).visibleSeries[0].type === 'Pyramid')) {
                    position = 'Top';
                }
                this.position = (position !== 'Auto') ? position :
                    (availableSize.width > availableSize.height ? 'Right' : 'Bottom');
            }
        };
        BaseLegend.prototype.setBounds = function (computedWidth, computedHeight, legend, legendBounds) {
            var titleHeight = legend.title && legend.titlePosition === 'Top' ? this.legendTitleSize.height + this.fivePixel : 0;
            if (this.isVertical && this.isPaging && !legend.enablePages && !this.isBulletChartControl) {
                titleHeight = legend.title && legend.titlePosition === 'Top' ? this.legendTitleSize.height + this.fivePixel : 0;
                titleHeight += (this.pageButtonSize + this.fivePixel);
            }
            computedWidth = Math.min(computedWidth, legendBounds.width);
            computedHeight = Math.min(computedHeight, legendBounds.height);
            if (legend.mode === 'Gradient') {
                legendBounds.width = legend.width ? legendBounds.width : this.isVertical ? computedWidth : 0.75 * legendBounds.width;
                legendBounds.height = legend.height ? legendBounds.height : this.isVertical ? 0.75 * legendBounds.height : computedHeight;
            }
            else {
                legendBounds.width = !legend.width ? computedWidth : legendBounds.width;
                legendBounds.height = !legend.height ? computedHeight : legendBounds.height;
            }
            if (!this.isBulletChartControl) {
                if (this.isTop && legend.titleStyle.textOverflow !== 'None') {
                    this.calculateLegendTitle(legend, legendBounds);
                    legendBounds.height += legend.titleStyle.textOverflow === 'Wrap' && this.legendTitleCollections.length > 1 ?
                        (this.legendTitleSize.height - (this.legendTitleSize.height / this.legendTitleCollections.length)) : 0;
                }
            }
            this.rowCount = Math.max(1, Math.ceil((legendBounds.height - legend.padding - titleHeight) /
                (this.maxItemHeight + legend.padding)));
        };
        BaseLegend.prototype.getLocation = function (position, alignment, legendBounds, rect, availableSize, maxLabelSize) {
            var padding = this.legend.border.width;
            var isBulletChart = this.isBulletChartControl;
            var bulletChart = this.bulletChart;
            var labelIns = bulletChart.labelPosition === 'Inside';
            var ticklIns = bulletChart.tickPosition === 'Inside';
            var isVertical = bulletChart.orientation === 'Vertical';
            var categoryFieldValue = (isBulletChart && bulletChart.categoryField !== '') ?
                maxLabelSize.width + this.chart.border.width + padding * 3 : 0;
            var marginBottom = this.chart.margin.bottom;
            var legendHeight = legendBounds.height + padding + this.legend.margin.top + this.legend.margin.bottom;
            var legendWidth = legendBounds.width + padding + this.legend.margin.left + this.legend.margin.right;
            if (position === 'Bottom') {
                legendBounds.x = this.alignLegend(legendBounds.x, availableSize.width, legendBounds.width, alignment);
                legendBounds.y = rect.y + (rect.height - legendHeight) + padding + this.legend.margin.top;
                legendBounds.y += (isBulletChart && !bulletChart.opposedPosition && !labelIns && !ticklIns
                    && !isVertical) ? bulletChart.majorTickLines.height + marginBottom + this.legend.border.width + padding * 2 :
                    (isVertical && bulletChart.categoryField !== '') ? maxLabelSize.height + padding * 2 : 0;
                helper_1.subtractThickness(rect, new helper_1.Thickness(0, 0, 0, legendHeight));
            }
            else if (position === 'Top') {
                legendBounds.x = this.alignLegend(legendBounds.x, availableSize.width, legendBounds.width, alignment);
                legendBounds.y = rect.y + padding + this.legend.margin.top;
                legendBounds.y -= (isBulletChart && bulletChart.opposedPosition && !labelIns && !ticklIns &&
                    !isVertical) ? bulletChart.majorTickLines.height + this.chart.margin.top : 0;
                legendHeight -= (isBulletChart) ? -padding * 2 : 0;
                helper_1.subtractThickness(rect, new helper_1.Thickness(0, 0, legendHeight, 0));
            }
            else if (position === 'Right') {
                legendBounds.x = rect.x + (rect.width - legendBounds.width) - this.legend.margin.right;
                legendBounds.y = rect.y + this.alignLegend(0, availableSize.height - (rect.y + marginBottom), legendBounds.height, alignment);
                legendWidth += (isBulletChart && bulletChart.opposedPosition && !labelIns && !ticklIns &&
                    isVertical) ? (this.chart.margin.left + this.chart.margin.right + bulletChart.majorTickLines.height) : 0;
                helper_1.subtractThickness(rect, new helper_1.Thickness(0, legendWidth, 0, 0));
            }
            else if (position === 'Left') {
                legendBounds.x = legendBounds.x + this.legend.margin.left;
                legendBounds.y = rect.y + this.alignLegend(0, availableSize.height - (rect.y + marginBottom), legendBounds.height, alignment);
                legendWidth += (isBulletChart && !bulletChart.opposedPosition && !labelIns && !ticklIns &&
                    isVertical) ? (legendBounds.x - this.chart.margin.left + padding + bulletChart.majorTickLines.height) :
                    (bulletChart.orientation !== 'Vertical' && bulletChart.categoryField !== '') ? categoryFieldValue : 0;
                helper_1.subtractThickness(rect, new helper_1.Thickness(legendWidth, 0, 0, 0));
            }
            else {
                legendBounds.x = this.legend.location.x;
                legendBounds.y = this.legend.location.y;
                helper_1.subtractThickness(rect, new helper_1.Thickness(0, 0, 0, 0));
            }
        };
        BaseLegend.prototype.alignLegend = function (start, size, legendSize, alignment) {
            switch (alignment) {
                case 'Far':
                    start = (size - legendSize) - start;
                    break;
                case 'Center':
                    start = ((size - legendSize) / 2);
                    break;
            }
            return start;
        };
        BaseLegend.prototype.renderLegend = function (chart, legend, legendBounds, redraw) {
            var titleHeight = 0;
            var titlePlusArrowWidth = 0;
            var pagingLegendBounds = new ej2_svg_base_1.Rect(0, 0, 0, 0);
            var requireLegendBounds = new ej2_svg_base_1.Rect(0, 0, 0, 0);
            var firstLegend = this.findFirstLegendPosition(this.legendCollections);
            var padding = legend.padding;
            var isPaging = legend.enablePages;
            var titlePosition = legend.titlePosition;
            var upArrowHeight = this.isPaging && !legend.enablePages && this.isVertical ? this.pageButtonSize : 0;
            var legendGroup = chart.renderer.createGroup({ id: this.legendID + '_g' });
            var legendTranslateGroup = this.createLegendElements(chart, legendBounds, legendGroup, legend, this.legendID, redraw);
            this.legendRegions = [];
            this.chartRowCount = 1;
            var maxHeight = 0;
            titleHeight = !this.isTitle ? 0 : (this.isTop || this.isVertical ? this.legendTitleSize.height : 0);
            if (this.isChartControl || (this.isAccChartControl && !this.isVertical)) {
                var pageCount = 1;
                var rowHeights = this.rowHeights[0] + padding;
                for (var i = 1; i < this.rowHeights.length; i++) {
                    if ((rowHeights + this.rowHeights[i] + padding) > (this.legendBounds.height - this.pageButtonSize - this.maxItemHeight / 2)) {
                        this.pageHeights[pageCount - 1] = rowHeights + titleHeight;
                        pageCount++;
                        rowHeights = 0;
                    }
                    rowHeights += (this.rowHeights[i] + padding);
                }
                this.pageHeights[pageCount - 1] = rowHeights + titleHeight;
                this.totalPages = pageCount;
            }
            for (var i = 0; i < this.legendCollections.length; i++) {
                if (this.legendCollections[i].text !== '') {
                    maxHeight = Math.max(this.legendCollections[i].textSize.height, maxHeight);
                    break;
                }
                else {
                    continue;
                }
            }
            if (!this.isChartControl && !this.isAccChartControl) {
                this.maxItemHeight = Math.max(maxHeight, legend.shapeHeight);
            }
            if (!isPaging && this.isPaging && !this.isVertical) {
                titlePlusArrowWidth = !this.isTitle ? 0 : titlePosition === 'Left' ? this.legendTitleSize.width : 0;
                titlePlusArrowWidth += (this.pageButtonSize + (2 * this.fivePixel));
            }
            else if (this.isTitle && !this.isPaging && !this.isVertical) {
                titlePlusArrowWidth = titlePosition === ((!this.isRtlEnable) ? 'Left' : 'Right') ? (this.fivePixel + this.legendTitleSize.width) : 0;
            }
            if (chart.legendSettings.mode === 'Gradient' && this.legendCollections.length > 1) {
                this.getLinearLegend(legendBounds, chart, legend, legendTranslateGroup);
                this.totalPages = 1;
            }
            else if (firstLegend !== this.legendCollections.length) {
                var legendSeriesGroup = void 0;
                var count = 0;
                var previousLegend = this.legendCollections[firstLegend];
                var startPadding = this.isBulletChartControl ? 0 : titlePlusArrowWidth + padding + (legend.shapeWidth / 2) + legend.containerPadding.left;
                var x_Location = this.isBulletChartControl ? legendBounds.x + titlePlusArrowWidth + padding + (legend.shapeWidth / 2) :
                    (!this.isRtlEnable) ? legendBounds.x + startPadding : legendBounds.x + ((this.chart.getModuleName() === 'accumulationchart' && this.isVertical) ? this.maxWidth : legendBounds.width) - startPadding;
                var start = new helper_1.ChartLocation(x_Location, this.isBulletChartControl ? legendBounds.y + titleHeight + upArrowHeight + padding + (this.maxItemHeight / 2) :
                    legendBounds.y + titleHeight + upArrowHeight + padding + (this.maxItemHeight / 2) + legend.containerPadding.top);
                var anchor = chart.isRtlEnabled || chart.enableRtl ? 'end' : 'start';
                var textOptions = new ej2_svg_base_1.TextOption('', start.x, start.y, anchor);
                var textPadding = legend.shapePadding + padding + legend.shapeWidth;
                this.totalPages = this.totalPages = (this.isAccChartControl || this.isChartControl || this.isBulletChartControl || this.isStockChartControl) ? this.totalPages : 0;
                this.pageXCollections = [];
                this.legendCollections[firstLegend].location = start;
                var legendIndex = void 0;
                if (!legend.enablePages && this.isPaging) {
                    var x = start.x - this.fivePixel;
                    var y = start.y - this.fivePixel;
                    var leftSpace = this.isTitle && !this.isVertical && titlePosition === 'Left' ?
                        this.legendTitleSize.width + this.fivePixel : 0;
                    var bottomSapce = this.isVertical ? (this.pageButtonSize) + Math.abs(y - legendBounds.y) : 0;
                    var rightSpace = this.isTitle && !this.isVertical && titlePosition === 'Right' ?
                        this.legendTitleSize.width + this.fivePixel : 0;
                    rightSpace += this.isVertical ? 0 : (this.fivePixel + this.pageButtonSize + this.fivePixel);
                    pagingLegendBounds = new ej2_svg_base_1.Rect(x, y, legendBounds.width - rightSpace - leftSpace, legendBounds.height - bottomSapce);
                    requireLegendBounds = pagingLegendBounds;
                }
                else {
                    requireLegendBounds = legendBounds;
                }
                var legendOption = void 0;
                for (var i = 0; i < this.legendCollections.length; i++) {
                    legendOption = this.legendCollections[i];
                    legendIndex = !this.isReverse ? count : (this.legendCollections.length - 1) - count;
                    if (this.chart.getModuleName() === 'accumulationchart') {
                        legendOption.fill = (this.chart || this.chart || this.chart).visibleSeries[0].points[legendOption.pointIndex].color;
                    }
                    if (this.chart.getModuleName() === 'stockChart') {
                        legendOption.type = this.chart.visibleSeries[count].type;
                    }
                    this.accessbilityText = (this.isBulletChartControl) ? 'Legend of bullet chart' + '' + legendOption.text
                        : 'Click to show or hide the ' + legendOption.text + ' series';
                    if (legendOption.render && legendOption.text !== '') {
                        legendSeriesGroup = chart.renderer.createGroup({
                            id: this.legendID + this.generateId(legendOption, '_g_', legendIndex)
                        });
                        if (legendSeriesGroup) {
                            legendSeriesGroup.setAttribute("tabindex", i === 0 ? "0" : "");
                            legendSeriesGroup.setAttribute('aria-label', legend.description ||
                                this.accessbilityText);
                        }
                        this.library.getRenderPoint(legendOption, start, textPadding, previousLegend, requireLegendBounds, count, firstLegend);
                        this.renderSymbol(legendOption, legendSeriesGroup, legendIndex);
                        this.renderText(chart, legendOption, legendSeriesGroup, textOptions, count, legendIndex);
                        if (legendSeriesGroup) {
                            legendSeriesGroup.style.cssText =
                                'cursor: ' + ((!legend.toggleVisibility && (chart.selectionMode === 'None' ||
                                    chart.highlightMode === 'None' ||
                                    chart.selectionMode === 'None') || this.isBulletChartControl) ? 'auto' : 'pointer');
                        }
                        if (legendTranslateGroup) {
                            legendTranslateGroup.appendChild(legendSeriesGroup);
                        }
                        previousLegend = legendOption;
                    }
                    count++;
                }
                if (this.isPaging) {
                    this.renderPagingElements(chart, legendBounds, textOptions, legendGroup);
                }
                else {
                    this.totalPages = 1;
                }
            }
            helper_3.appendChildElement(chart.enableCanvas, chart.svgObject, legendGroup, redraw);
        };
        BaseLegend.prototype.getLinearLegend = function (legendBounds, chart, legend, legendTranslateGroup) {
            var xmlns = 'http://www.w3.org/2000/svg';
            var previousLegend = this.legendCollections[0];
            var nextLegend = this.legendCollections[1];
            var defElement = this.chart.renderer.createDefs();
            var gradientLegendCount = 0;
            var linerGradientEle = document.createElementNS(xmlns, 'linearGradient');
            var opacity = 1;
            var fillColors = [];
            var numberItems = [];
            if (legend.title) {
                if (!this.isVertical) {
                    if (legend.titlePosition === 'Left') {
                        legendBounds.x += this.legendTitleSize.width;
                        legendBounds.width -= this.legendTitleSize.width;
                    }
                    else if (legend.titlePosition === 'Right') {
                        legendBounds.width -= this.legendTitleSize.width;
                    }
                    else if (legend.titlePosition === 'Top') {
                        legendBounds.y += this.legendTitleSize.height;
                        legendBounds.height -= this.legendTitleSize.height;
                    }
                }
                else {
                    legendBounds.y += this.legendTitleSize.height;
                    legendBounds.height -= this.legendTitleSize.height;
                }
            }
            for (var _i = 0, _a = this.chart.rangeColorSettings; _i < _a.length; _i++) {
                var colorMap = _a[_i];
                if (numberItems.indexOf(colorMap.start) < 0) {
                    numberItems.push(colorMap.start);
                }
                if (colorMap.colors.length > 2) {
                    var diffValue = (colorMap.end - colorMap.start);
                    var colorsLength = colorMap.colors.length - 1;
                    if (diffValue > 0) {
                        diffValue = diffValue / colorsLength;
                        for (var index = 1; index < colorsLength; index++) {
                            var calculatedValue = colorMap.start + (diffValue * index);
                            numberItems.push(calculatedValue);
                        }
                    }
                    else {
                        for (var index = 1; index < colorsLength; index++) {
                            numberItems.push(colorMap.start);
                        }
                    }
                }
                if (numberItems.indexOf(colorMap.end) < 0) {
                    numberItems.push(colorMap.end);
                }
                for (var _b = 0, _c = colorMap.colors; _b < _c.length; _b++) {
                    var fillColor = _c[_b];
                    if (fillColors.indexOf(fillColor) < 0) {
                        fillColors.push(fillColor);
                    }
                }
                if (colorMap.colors.length > 0 && colorMap.colors.length < 2) {
                    fillColors.push(colorMap.colors[0]);
                }
            }
            var x1 = this.isRtlEnable && !this.isVertical ? '100%' : '0%';
            var x2 = this.isVertical || this.isRtlEnable ? '0%' : '100%';
            var y2 = this.isVertical ? '100%' : '0%';
            linerGradientEle.setAttribute('id', this.generateId(previousLegend, 'linearGradient', gradientLegendCount));
            linerGradientEle.setAttribute('x1', x1);
            linerGradientEle.setAttribute('y1', '0%');
            linerGradientEle.setAttribute('x2', x2);
            linerGradientEle.setAttribute('y2', y2);
            var full = numberItems[numberItems.length - 1] - numberItems[0];
            for (var b = 0; b < fillColors.length; b++) {
                var offsetValue = numberItems[b] - numberItems[0];
                offsetValue = offsetValue / full;
                var stopEle = document.createElementNS(xmlns, 'stop');
                stopEle.setAttribute('offset', offsetValue.toString());
                stopEle.setAttribute('stop-color', fillColors[b]);
                stopEle.setAttribute('stop-opacity', opacity.toString());
                linerGradientEle.appendChild(stopEle);
            }
            var startLabel = previousLegend.text.toString();
            var endLabel = nextLegend.text.toString();
            var startTextSize = ej2_svg_base_1.measureText(startLabel, legend.textStyle);
            var endTextSize = ej2_svg_base_1.measureText(endLabel, legend.textStyle);
            var textWidth = startTextSize.width > endTextSize.width ? startTextSize.width : endTextSize.width;
            var textHeight = startTextSize.height > endTextSize.height ? startTextSize.height : endTextSize.height;
            var otherSpaces = (2 * textWidth) + (4 * legend.padding);
            var linearBarWidth = legendBounds.width;
            var linearBarHeight = legendBounds.height;
            var xValue = legendBounds.x + textWidth + (2 * legend.padding);
            var yValue = legendBounds.y + legend.padding;
            var startLabelY;
            var endLabelY;
            var startLabelX;
            var endLabelX;
            if (this.isVertical) {
                otherSpaces = (2 * textHeight) + (4 * legend.padding);
                linearBarWidth = legendBounds.width - (2 * legend.padding);
                linearBarHeight = legendBounds.height - otherSpaces;
                xValue = legendBounds.x + legend.padding;
                yValue = legendBounds.y + textHeight + (2 * legend.padding);
                startLabelY = legendBounds.y + legend.padding + textHeight;
                endLabelY = yValue + linearBarHeight + textHeight;
                startLabelX = (legendBounds.x + (legendBounds.width * 0.5)) - (textWidth * 0.5);
                endLabelX = startLabelX;
                if (linearBarWidth > 30) {
                    var diffWidth = linearBarWidth - 30;
                    linearBarWidth = 30;
                    xValue = xValue + (diffWidth / 2);
                }
            }
            else {
                linearBarWidth = legendBounds.width - otherSpaces;
                linearBarHeight = legendBounds.height - (2 * legend.padding);
                startLabelX = legendBounds.x + ((!this.isRtlEnable) ? legend.padding + (textWidth - startTextSize.width) :
                    linearBarWidth + (3 * legend.padding) + textWidth);
                endLabelX = legendBounds.x + ((!this.isRtlEnable) ? linearBarWidth + (3 * legend.padding) + textWidth :
                    legend.padding + (textWidth - endTextSize.width));
                startLabelY = legendBounds.y + (legendBounds.height * 0.5) + (textHeight * 0.25);
                endLabelY = startLabelY;
                if (linearBarHeight > 30) {
                    var diffHeight = linearBarHeight - 30;
                    linearBarHeight = 30;
                    yValue = yValue + (diffHeight / 2);
                }
            }
            var anchor = chart.enableRtl ? 'end' : '';
            var textOptions = new ej2_svg_base_1.TextOption('', startLabelX, startLabelY, anchor, startLabel);
            var hiddenColor = '#D3D3D3';
            textOptions.id = this.legendID + this.generateId(previousLegend, '_text_', 1);
            var fontcolor = previousLegend.visible ? legend.textStyle.color || chart.themeStyle.legendLabel : hiddenColor;
            var isCanvas = this.isStockChartControl ? false : this.chart.enableCanvas;
            helper_2.textElement(chart.renderer, textOptions, legend.textStyle, fontcolor, legendTranslateGroup, false, false, false, false, null, this.currentPageNumber && isCanvas ?
                new ej2_svg_base_1.Rect(0, -this.translatePage(isCanvas, null, this.currentPageNumber - 1, this.currentPageNumber), 0, 0) : null);
            textOptions = new ej2_svg_base_1.TextOption('', endLabelX, endLabelY, anchor, endLabel);
            textOptions.id = this.legendID + this.generateId(previousLegend, '_text_', 2);
            helper_2.textElement(chart.renderer, textOptions, legend.textStyle, fontcolor, legendTranslateGroup, false, false, false, false, null, this.currentPageNumber && isCanvas ?
                new ej2_svg_base_1.Rect(0, -this.translatePage(isCanvas, null, this.currentPageNumber - 1, this.currentPageNumber), 0, 0) : null);
            var gradientLegend = chart.renderer.drawRectangle({
                width: linearBarWidth,
                height: linearBarHeight,
                x: xValue,
                y: yValue,
                fill: 'url(#' + this.generateId(previousLegend, 'linearGradient', gradientLegendCount) + ')'
            });
            defElement.appendChild(linerGradientEle);
            legendTranslateGroup.appendChild(defElement);
            legendTranslateGroup.appendChild(gradientLegend);
        };
        BaseLegend.prototype.findFirstLegendPosition = function (legendCollection) {
            var count = 0;
            for (var _i = 0, legendCollection_1 = legendCollection; _i < legendCollection_1.length; _i++) {
                var legend = legendCollection_1[_i];
                if (legend.render && legend.text !== '') {
                    break;
                }
                count++;
            }
            return count;
        };
        BaseLegend.prototype.calculateLegendTitle = function (legend, legendBounds) {
            if (legend.title) {
                this.isTop = legend.titlePosition === 'Top';
                var padding = legend.titleStyle.textOverflow === 'Trim' ? 2 * legend.padding : 0;
                if (this.isTop || this.isVertical) {
                    this.legendTitleCollections = helper_1.getTitle(legend.title, legend.titleStyle, (legendBounds.width - padding));
                }
                else {
                    this.legendTitleCollections[0] = helper_1.textTrim(legend.maximumTitleWidth, legend.title, legend.titleStyle);
                }
                var text = this.isTop ? legend.title : this.legendTitleCollections[0];
                this.legendTitleSize = ej2_svg_base_1.measureText(text, legend.titleStyle);
                this.legendTitleSize.height *= this.legendTitleCollections.length;
            }
            else {
                this.legendTitleSize = new ej2_svg_base_1.Size(0, 0);
            }
        };
        BaseLegend.prototype.renderLegendTitle = function (chart, legend, legendBounds, legendGroup) {
            var padding = legend.padding;
            var alignment = legend.titleStyle.textAlignment;
            this.isTop = legend.titlePosition === 'Top';
            var anchor = helper_1.getTextAnchor(legend.titleStyle.textAlignment, chart.enableRtl);
            var x = helper_1.titlePositionX(legendBounds, legend.titleStyle);
            anchor = this.isTop || this.isVertical ? anchor : (chart.enableRtl) ? 'end' : '';
            x = alignment === 'Near' ? (x + padding) : alignment === 'Far' ? (x - padding) : x;
            x = (this.isTop || this.isVertical) ? x : ((legendBounds.x) + (legend.titlePosition === 'Left' ? 5 :
                (legendBounds.width - this.legendTitleSize.width - 5)));
            var topPadding = (legendBounds.height / 2) + (this.legendTitleSize.height / 4);
            var y = legendBounds.y + (!this.isTop && !this.isVertical ? topPadding :
                (this.legendTitleSize.height / this.legendTitleCollections.length));
            var legendTitleTextOptions = new ej2_svg_base_1.TextOption(this.legendID + '_title', x, y, anchor, this.legendTitleCollections);
            helper_2.textElement(chart.renderer, legendTitleTextOptions, legend.titleStyle, legend.titleStyle.color, legendGroup);
        };
        BaseLegend.prototype.createLegendElements = function (chart, legendBounds, legendGroup, legend, id, redraw) {
            var padding = legend.padding;
            var options = new helper_2.RectOption(id + '_element', legend.background, legend.border, legend.opacity, legendBounds);
            var legendItemsGroup = chart.renderer.createGroup({ id: id + '_collections' });
            var isCanvas = this.isStockChartControl ? false : chart.enableCanvas;
            var clippath = chart.renderer.createClipPath({ id: id + '_clipPath' });
            options.width = (this.isRtlEnable && this.chart.getModuleName() === 'accumulationchart' && this.isVertical) ? this.maxWidth : legendBounds.width;
            if (legendGroup) {
                legendGroup.appendChild(chart.renderer.drawRectangle(options));
            }
            else {
                chart.renderer.drawRectangle(options);
            }
            if (legend.title) {
                this.renderLegendTitle(chart, legend, legendBounds, legendGroup);
            }
            if (!isCanvas) {
                legendGroup.appendChild(legendItemsGroup);
            }
            this.legendTranslateGroup = chart.renderer.createGroup({ id: id + '_translate_g' });
            if (!isCanvas) {
                legendItemsGroup.appendChild(this.legendTranslateGroup);
            }
            options.y += (this.isTop ? this.legendTitleSize.height : 0);
            options.id += '_clipPath_rect';
            options.width = ((!this.isChartControl && chart.getModuleName() !== 'bulletChart' && !this.isStockChartControl) && this.isVertical) ? this.maxWidth - padding + legend.containerPadding.left + legend.containerPadding.right
                : legendBounds.width;
            if (!isCanvas) {
                this.clipRect = chart.renderer.drawRectangle(options);
                clippath.appendChild(this.clipRect);
            }
            else {
                this.pagingClipRect = options;
            }
            helper_3.appendChildElement(isCanvas, chart.svgObject, clippath, redraw);
            if (!isCanvas) {
                legendItemsGroup.style.cssText = 'clip-path:url(#' + clippath.id + ')';
            }
            return this.legendTranslateGroup;
        };
        BaseLegend.prototype.renderSymbol = function (legendOption, group, legendIndex) {
            var control = this.isBulletChartControl ? this.chart : null;
            var symbolColor = legendOption.visible ? legendOption.fill : '#D3D3D3';
            var isStrokeWidth = ((this.chart.getModuleName() === 'chart' || this.chart.getModuleName() === 'stockChart') && (legendOption.shape === 'SeriesType') &&
                (legendOption.type.toLowerCase().indexOf('line') > -1) && (legendOption.type.toLowerCase().indexOf('area') === -1));
            var isCustomBorder = (this.chart.getModuleName() === 'chart' || this.chart.getModuleName() === 'stockChart') &&
                (legendOption.type === 'Scatter' || legendOption.type === 'Bubble');
            var isCanvas = this.isStockChartControl ? false : this.chart.enableCanvas;
            var borderColor;
            var shape = (legendOption.shape === 'SeriesType') ? legendOption.type : legendOption.shape;
            var strokewidth = isStrokeWidth ? (this.legend.mode === 'Series' ?
                this.chart.visibleSeries[legendIndex].width : this.chart.visibleSeries[0].width) :
                (this.isBulletChartControl && legendOption.shape === 'Multiply') ? 4 : 1;
            var regionPadding;
            shape = shape === 'Scatter' ? legendOption.markerShape : shape;
            if (isCustomBorder && legendIndex < this.chart.visibleSeries.length) {
                var seriesBorder = this.chart.visibleSeries[legendIndex].border;
                borderColor = seriesBorder.color ? seriesBorder.color : symbolColor;
                strokewidth = seriesBorder.width ? seriesBorder.width : 1;
            }
            var symbolOption = new ej2_svg_base_1.PathOption(this.legendID + this.generateId(legendOption, '_shape_', legendIndex), symbolColor, strokewidth, (isCustomBorder ? borderColor : symbolColor), 1, '', '');
            var textSize = ej2_svg_base_1.measureText(legendOption.text, this.legend.textStyle);
            var x = this.legend.isInversed && !this.isRtlEnable ? legendOption.location.x + textSize.width + this.legend.shapePadding
                : legendOption.location.x;
            var y = legendOption.location.y;
            if (!isCanvas) {
                group.appendChild(helper_1.drawSymbol({ x: x, y: y }, shape, new ej2_svg_base_1.Size(this.legend.shapeWidth, this.legend.shapeHeight), legendOption.url, symbolOption, this.accessbilityText, this.chart.renderer, null, this.isBulletChartControl, control));
            }
            else {
                regionPadding = -this.translatePage(isCanvas, null, this.currentPageNumber - 1, this.currentPageNumber);
                helper_1.drawSymbol({ x: x, y: y }, shape, new ej2_svg_base_1.Size(this.legend.shapeWidth, this.legend.shapeHeight), '', symbolOption, this.accessbilityText, this.chart.renderer, this.currentPageNumber ? new ej2_svg_base_1.Rect(0, regionPadding, 0, 0) : null, this.isBulletChartControl, control);
                this.legendRegions.push({
                    rect: new ej2_svg_base_1.Rect(legendOption.location.x, legendOption.location.y, this.legend.shapeWidth, this.legend.shapeHeight + regionPadding), index: legendIndex
                });
            }
            if (shape === 'Line' && legendOption.markerVisibility && legendOption.markerShape !== 'Image' ||
                (legendOption.type === 'Doughnut' && shape === 'Doughnut')) {
                symbolOption.id = this.legendID + this.generateId(legendOption, '_shape_marker_', legendIndex);
                shape = legendOption.type === 'Doughnut' ? 'Circle' : legendOption.markerShape;
                symbolOption.fill = legendOption.type === 'Doughnut' ? '#FFFFFF' : symbolOption.fill;
                if (!isCanvas) {
                    group.appendChild(helper_1.drawSymbol({ x: x, y: y }, shape, new ej2_svg_base_1.Size(this.legend.shapeWidth / 2, this.legend.shapeHeight / 2), '', symbolOption, this.accessbilityText, null, null, this.isBulletChartControl, control));
                }
                else {
                    helper_1.drawSymbol({ x: x, y: y }, shape, new ej2_svg_base_1.Size(this.legend.shapeWidth / 2, this.legend.shapeHeight / 2), '', symbolOption, this.accessbilityText, this.chart.renderer, this.currentPageNumber ?
                        new ej2_svg_base_1.Rect(0, -this.translatePage(isCanvas, null, this.currentPageNumber - 1, this.currentPageNumber), 0, 0) : null, this.isBulletChartControl, control);
                }
            }
        };
        BaseLegend.prototype.renderText = function (chart, legendOption, group, textOptions, i, legendIndex) {
            var legend = chart.legendSettings;
            var hiddenColor = '#D3D3D3';
            var fontcolor = legendOption.visible ? legend.textStyle.color || chart.themeStyle.legendLabel : hiddenColor;
            var isCanvas = this.isStockChartControl ? false : this.chart.enableCanvas;
            textOptions.id = this.legendID + this.generateId(legendOption, '_text_', legendIndex);
            textOptions.text = legendOption.textCollection.length > 0 ? legendOption.textCollection : legendOption.text;
            if (legend.isInversed && !this.isRtlEnable) {
                textOptions.x = legendOption.location.x - (legend.shapeWidth / 2);
            }
            else if (this.isRtlEnable) {
                textOptions.x = legendOption.location.x - (ej2_svg_base_1.measureText(legendOption.text, legend.textStyle).width + legend.shapeWidth / 2 + legend.shapePadding);
            }
            else {
                textOptions.x = legendOption.location.x + (legend.shapeWidth / 2) + legend.shapePadding;
            }
            textOptions.y = legendOption.location.y + this.maxItemHeight / 4;
            var element = helper_2.textElement(chart.renderer, textOptions, legend.textStyle, fontcolor, group, false, false, false, false, null, this.currentPageNumber && isCanvas ?
                new ej2_svg_base_1.Rect(0, -this.translatePage(isCanvas, null, this.currentPageNumber - 1, this.currentPageNumber), 0, 0) : null);
            if (element) {
                element.setAttribute('aria-label', legend.description || this.accessbilityText);
            }
            if (isCanvas) {
                var textSize = ej2_svg_base_1.measureText(legendOption.text, legend.textStyle);
                this.legendRegions[i].rect.y = textOptions.y < this.legendRegions[i].rect.y ? textOptions.y : this.legendRegions[i].rect.y;
                this.legendRegions[i].rect.width += textSize.width;
                this.legendRegions[i].rect.height = textSize.height;
                this.legendRegions[i].rect.y -= textSize.height * 0.5;
                this.legendRegions[i].rect.x -= (this.isRtlEnable) ? this.legendRegions[i].rect.width : 0;
            }
        };
        BaseLegend.prototype.renderPagingElements = function (chart, bounds, textOption, legendGroup) {
            var paginggroup = chart.renderer.createGroup({ id: this.legendID + '_navigation' });
            var isCanvas = this.isStockChartControl ? false : chart.enableCanvas;
            var titleHeight = this.isBulletChartControl ? 0 : this.legendTitleSize.height;
            var grayColor = this.chart.theme.indexOf('Dark') > -1 ? '#FFFFFF' : '#545454';
            var legend = chart.legendSettings;
            var padding = 8;
            var pageUp = this.legendID + (!this.isRtlEnable ? '_pageup' : '_pagedown');
            var pageDown = this.legendID + (!this.isRtlEnable ? '_pagedown' : '_pageup');
            var symbolOption = new ej2_svg_base_1.PathOption(pageUp, 'transparent', 5, grayColor, 1, '', '');
            var iconSize = this.pageButtonSize;
            var rowCount = !legend.enablePages && this.isPaging && !this.isVertical && !this.isBulletChartControl ? 1 :
                (this.rowCount - 1);
            var titleWidth = this.isTitle && legend.titlePosition === 'Left' ? this.legendTitleSize.width : 0;
            this.pagingRegions = [];
            this.backwardArrowOpacity = this.currentPage !== 1 ? 1 : 0;
            this.forwardArrowOpacity = this.currentPage === this.totalPages ? 0 : 1;
            if (!isCanvas) {
                legendGroup.appendChild(paginggroup);
            }
            if (!this.isChartControl && !this.isAccChartControl) {
                if (this.isBulletChartControl || this.isStockChartControl || !this.isVertical) {
                    this.totalPages = Math.ceil(this.totalPages / Math.max(1, this.rowCount - 1));
                }
                else {
                    this.totalPages = Math.ceil(this.totalPages / this.maxColumns);
                }
            }
            if (paginggroup) {
                paginggroup.style.cursor = 'pointer';
            }
            if ((this.isChartControl || this.isAccChartControl) && !(!legend.enablePages && this.isPaging)) {
                this.clipPathHeight = this.pageHeights[0];
            }
            else {
                this.clipPathHeight = (rowCount * (this.maxItemHeight + legend.padding));
            }
            if (!isCanvas) {
                this.clipRect.setAttribute('height', this.clipPathHeight.toString());
            }
            else {
                this.pagingClipRect.height = this.legendBounds.height - this.clipPathHeight -
                    (this.pagingClipRect.y - this.legendBounds.y) - legend.border.width;
                this.pagingClipRect.y = this.pagingClipRect.y + this.clipPathHeight;
                this.pagingClipRect.x += legend.border.width;
                this.pagingClipRect.width -= (legend.border.width + legend.border.width / 2);
                this.chart.renderer.clearRect(new ej2_svg_base_1.Rect(this.pagingClipRect.x, this.pagingClipRect.y, this.pagingClipRect.width, this.pagingClipRect.height));
            }
            var pageTextElement;
            var x = (bounds.x + iconSize / 2);
            var y = bounds.y + this.clipPathHeight + ((titleHeight + bounds.height - this.clipPathHeight) / 2);
            if (this.isPaging && !legend.enablePages && !this.isVertical && !this.isBulletChartControl) {
                x = (bounds.x + this.fivePixel + this.pageButtonSize + titleWidth);
                y = legend.title && this.isTop ? (bounds.y + padding + titleHeight + (iconSize / 1) + 0.5) :
                    (bounds.y + padding + iconSize + 0.5);
            }
            var size = ej2_svg_base_1.measureText(this.totalPages + '/' + this.totalPages, legend.textStyle);
            var translateX = (this.isRtlEnable) ? legend.border.width + (iconSize / 2) : bounds.width - (2 * (iconSize + padding) + padding + size.width);
            if (!isCanvas) {
                if (this.isVertical && !legend.enablePages && !this.isBulletChartControl) {
                    x = bounds.x + (bounds.width / 2);
                    y = bounds.y + (iconSize / 2) + padding + titleHeight;
                    symbolOption.opacity = this.backwardArrowOpacity;
                    paginggroup.appendChild(helper_1.drawSymbol({ x: x, y: y }, 'UpArrow', new ej2_svg_base_1.Size(iconSize, iconSize), '', symbolOption, 'UpArrow'));
                }
                else {
                    symbolOption.opacity = this.isBulletChartControl ? symbolOption.opacity :
                        (legend.enablePages ? 1 : !this.isRtlEnable ? this.backwardArrowOpacity : this.forwardArrowOpacity);
                    paginggroup.appendChild(helper_1.drawSymbol({ x: x, y: y }, 'LeftArrow', new ej2_svg_base_1.Size(iconSize, iconSize), '', symbolOption, 'LeftArrow'));
                }
            }
            else {
                helper_1.drawSymbol({ x: x, y: y }, 'LeftArrow', new ej2_svg_base_1.Size(iconSize, iconSize), '', symbolOption, 'LeftArrow', this.chart.renderer, new ej2_svg_base_1.Rect(translateX, 0, 0, 0));
            }
            this.pagingRegions.push(new ej2_svg_base_1.Rect(!this.isRtlEnable ? x + bounds.width - (2 * (iconSize + padding) + padding + size.width) - iconSize * 0.5 : x, y - iconSize * 0.5, iconSize, iconSize));
            textOption.x = x + (iconSize / 2) + padding;
            textOption.y = y + (size.height / 4);
            textOption.id = this.legendID + '_pagenumber';
            textOption.text = !this.isRtlEnable ? '1/' + this.totalPages : this.totalPages + '/1';
            var color = this.chart.theme.indexOf('Dark') > -1 ? '#FFFFFF' : legend.textStyle.color;
            if (isCanvas && this.totalNoOfPages) {
                textOption.text = !this.isRtlEnable ? this.currentPageNumber + '/' + this.totalNoOfPages : this.totalNoOfPages + '/' + this.currentPageNumber;
            }
            if (legend.enablePages || this.isBulletChartControl) {
                pageTextElement = helper_2.textElement(chart.renderer, textOption, legend.textStyle, color, paginggroup, false, false, false, false, null, new ej2_svg_base_1.Rect(translateX, 0, 0, 0));
            }
            x = textOption.x + padding + (iconSize / 2) + size.width;
            if (this.isPaging && !legend.enablePages && !this.isVertical) {
                x = (bounds.x + bounds.width - this.fivePixel - this.pageButtonSize - (legend.title && legend.titlePosition === 'Right' ?
                    this.legendTitleSize.width + this.fivePixel : 0));
            }
            symbolOption.id = pageDown;
            symbolOption.opacity = !legend.enablePages ? !this.isRtlEnable ? this.forwardArrowOpacity : this.backwardArrowOpacity : 1;
            if (!isCanvas) {
                if (this.isVertical && !legend.enablePages && !this.isBulletChartControl) {
                    x = bounds.x + (bounds.width / 2);
                    y = bounds.y + bounds.height - (iconSize / 2) - padding;
                    paginggroup.appendChild(helper_1.drawSymbol({ x: x, y: y }, 'DownArrow', new ej2_svg_base_1.Size(iconSize, iconSize), '', symbolOption, 'DownArrow'));
                }
                else {
                    paginggroup.appendChild(helper_1.drawSymbol({ x: x, y: y }, 'RightArrow', new ej2_svg_base_1.Size(iconSize, iconSize), '', symbolOption, 'RightArrow'));
                }
            }
            else {
                helper_1.drawSymbol({ x: x, y: y }, 'RightArrow', new ej2_svg_base_1.Size(iconSize, iconSize), '', symbolOption, 'RightArrow', this.chart.renderer, new ej2_svg_base_1.Rect(translateX, 0, 0, 0));
            }
            this.pagingRegions.push(new ej2_svg_base_1.Rect(!this.isRtlEnable ? x + (bounds.width - (2 * (iconSize + padding) + padding + size.width) - iconSize * 0.5) : x, y - iconSize * 0.5, iconSize, iconSize));
            if (!isCanvas && (legend.enablePages || this.isBulletChartControl)) {
                paginggroup.setAttribute('transform', 'translate(' + translateX + ', ' + 0 + ')');
            }
            else {
                if (this.currentPageNumber === 1 && this.calTotalPage && (legend.enablePages || this.isBulletChartControl)) {
                    this.totalNoOfPages = this.totalPages;
                    this.calTotalPage = false;
                }
                if (!legend.enablePages && !this.isBulletChartControl) {
                    this.translatePage(isCanvas, null, this.currentPage - 1, this.currentPage, legend);
                }
            }
            if (legend.enablePages || this.isBulletChartControl) {
                this.translatePage(isCanvas, pageTextElement, this.currentPage - 1, this.currentPage, legend);
            }
        };
        BaseLegend.prototype.getPageHeight = function (pageHeights, pageCount) {
            var sum = 0;
            for (var i = 0; i < pageCount; i++) {
                sum += pageHeights[i];
            }
            return sum;
        };
        BaseLegend.prototype.translatePage = function (isCanvas, pagingText, page, pageNumber, legend) {
            var size = (this.isChartControl || this.isAccChartControl) ? (page ? this.getPageHeight(this.pageHeights, page) : 0) : ((this.clipPathHeight) * page);
            if (!isCanvas && (this.isChartControl || this.isAccChartControl)) {
                this.clipRect.setAttribute('height', this.pageHeights[page].toString());
            }
            var translate = 'translate(0,-' + size + ')';
            if (!this.isChartControl && !this.isBulletChartControl && !this.isStockChartControl && this.isVertical) {
                var pageX = this.pageXCollections[page * this.maxColumns];
                size = (!this.isRtlEnable) ? pageX - this.legendBounds.x : (this.legendBounds.x + this.maxWidth) - pageX;
                size = size < 0 ? 0 : size;
                translate = ((!this.isRtlEnable) ? 'translate(-' : 'translate(') + size + ',0)';
            }
            if (!this.chart.enableCanvas) {
                this.legendTranslateGroup.setAttribute('transform', translate);
            }
            if (!this.chart.enableCanvas && (legend.enablePages || this.isBulletChartControl)) {
                pagingText.textContent = !this.isRtlEnable ? (pageNumber) + '/' + this.totalPages : this.totalPages + '/' + pageNumber;
            }
            this.currentPage = pageNumber;
            return size;
        };
        BaseLegend.prototype.changePage = function (event, pageUp) {
            var legend = this.chart.legendSettings;
            var backwardArrow = document.getElementById(this.legendID + '_pageup');
            var forwardArrow = document.getElementById(this.legendID + '_pagedown');
            var isCanvas = this.isStockChartControl ? false : this.chart.enableCanvas;
            var pageText = (legend.enablePages || this.isBulletChartControl) ?
                document.getElementById(this.legendID + '_pagenumber') : null;
            var page = (legend.enablePages || this.isBulletChartControl) ? parseInt(pageText.textContent.split('/')[!this.isRtlEnable ? 0 : 1], 10) :
                this.currentPage;
            if (pageUp && page > 1) {
                this.translatePage(isCanvas, pageText, (page - 2), (page - 1), legend);
            }
            else if (!pageUp && page < this.totalPages) {
                this.translatePage(isCanvas, pageText, page, (page + 1), legend);
            }
            if (this.isPaging && !legend.enablePages && !this.isBulletChartControl) {
                this.currentPage === this.totalPages ? this.hideArrow(forwardArrow) : this.showArrow(forwardArrow);
                this.currentPage === 1 ? this.hideArrow(backwardArrow) : this.showArrow(backwardArrow);
            }
        };
        BaseLegend.prototype.hideArrow = function (arrowElement) {
            arrowElement.setAttribute('opacity', '0');
        };
        BaseLegend.prototype.showArrow = function (arrowElement) {
            arrowElement.setAttribute('opacity', '1');
        };
        BaseLegend.prototype.generateId = function (option, prefix, count) {
            if (this.isChartControl || this.isStockChartControl) {
                return prefix + count;
            }
            else {
                return prefix + option.pointIndex;
            }
        };
        BaseLegend.prototype.move = function (event) {
            var _this = this;
            var x = this.chart.mouseX;
            var y = this.chart.mouseY;
            if (event.target.textContent.indexOf('...') > -1) {
                var targetId = event.target.id.split(this.legendID + '_text_');
                if (targetId.length === 2) {
                    var index = parseInt(targetId[1], 10);
                    var element = this.chart.element;
                    if (!isNaN(index)) {
                        if (this.chart.isTouch) {
                            helper_3.removeElement(this.chart.element.id + '_EJ2_Legend_Tooltip');
                        }
                        if (this.isChartControl) {
                            helper_3.showTooltip(this.chart.series[index].name, x, y, element.offsetWidth, element.id + '_EJ2_Legend_Tooltip', helper_3.getElement(this.chart.element.id + '_Secondary_Element'));
                        }
                        else {
                            helper_3.showTooltip(this.chart.visibleSeries[0].points[index].x.toString(), x + 10, y + 10, element.offsetWidth, element.id + '_EJ2_Legend_Tooltip', helper_3.getElement(this.chart.element.id + '_Secondary_Element'));
                        }
                    }
                }
            }
            else {
                helper_3.removeElement(this.chart.element.id + '_EJ2_Legend_Tooltip');
            }
            if (this.chart.isTouch) {
                clearTimeout(this.clearTooltip);
                this.clearTooltip = +setTimeout(function () { helper_3.removeElement(_this.chart.element.id + '_EJ2_Legend_Tooltip'); }, 1000);
            }
        };
        return BaseLegend;
    }());
    exports.BaseLegend = BaseLegend;
    var LegendOptions = (function () {
        function LegendOptions(text, fill, shape, visible, type, url, markerShape, markerVisibility, pointIndex, seriesIndex) {
            this.location = { x: 0, y: 0 };
            this.textCollection = [];
            this.text = text;
            this.fill = fill;
            this.shape = shape;
            this.url = url;
            this.visible = visible;
            this.type = type;
            this.markerVisibility = markerVisibility;
            this.markerShape = markerShape;
            this.pointIndex = pointIndex;
            this.seriesIndex = seriesIndex;
        }
        return LegendOptions;
    }());
    exports.LegendOptions = LegendOptions;
});
