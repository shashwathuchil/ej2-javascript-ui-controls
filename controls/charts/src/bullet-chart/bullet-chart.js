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
define(["require", "exports", "@syncfusion/ej2-base", "@syncfusion/ej2-base", "@syncfusion/ej2-base", "@syncfusion/ej2-svg-base", "../common/model/base", "./renderer/bullet-axis", "./utils/theme", "./renderer/scale-render", "../common/utils/helper", "../common/utils/helper", "./model/bullet-base", "./model/bullet-base", "../bullet-chart/model/bullet-base", "../common/model/constants", "./utils/theme", "../common/utils/export"], function (require, exports, ej2_base_1, ej2_base_2, ej2_base_3, ej2_svg_base_1, base_1, bullet_axis_1, theme_1, scale_render_1, helper_1, helper_2, bullet_base_1, bullet_base_2, bullet_base_3, constants_1, theme_2, export_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BulletChart = (function (_super) {
        __extends(BulletChart, _super);
        function BulletChart(options, element) {
            var _this = _super.call(this, options, element) || this;
            _this.bulletid = 57726;
            _this.animateSeries = true;
            _this.padding = 5;
            _this.leftSize = 0;
            _this.rightSize = 0;
            _this.topSize = 0;
            _this.bottomSize = 0;
            _this.maxLabelSize = new ej2_svg_base_1.Size(0, 0);
            _this.maxTitleSize = new ej2_svg_base_1.Size(0, 0);
            _this.intervalDivs = [10, 5, 2, 1];
            return _this;
        }
        BulletChart.prototype.preRender = function () {
            this.allowServerDataBinding = false;
            this.unWireEvents();
            this.initPrivateValues();
            this.setCulture();
            this.wireEvents();
        };
        BulletChart.prototype.initPrivateValues = function () {
            this.delayRedraw = false;
            this.scale = new scale_render_1.ScaleGroup(this);
            this.bulletAxis = new bullet_axis_1.BulletChartAxis(this);
            if (this.element.id === '') {
                var collection = document.getElementsByClassName('e-BulletChart').length;
                this.element.id = 'BulletChart_' + this.bulletid + '_' + collection;
            }
        };
        BulletChart.prototype.setCulture = function () {
            this.intl = new ej2_base_3.Internationalization();
        };
        BulletChart.prototype.render = function () {
            var _this = this;
            var loadEventData = {
                bulletChart: this,
                theme: this.theme, name: 'load'
            };
            this.trigger('load', loadEventData, function () {
                _this.theme = _this.theme;
                _this.setTheme();
                _this.createSvg(_this);
                _this.findRange();
                if (_this.bulletChartLegendModule && _this.legendSettings.visible) {
                    _this.calculateVisibleElements();
                    _this.bulletChartLegendModule.getLegendOptions(_this.visibleRanges);
                }
                _this.calculatePosition();
                _this.renderBulletElements();
                _this.trigger('loaded', { bulletChart: _this });
                _this.allowServerDataBinding = true;
                _this.renderComplete();
            });
        };
        BulletChart.prototype.setTheme = function () {
            this.themeStyle = theme_2.getBulletThemeColor(this.theme);
            if ((this.targetColor === null || this.targetColor === "#191919" || this.valueFill == null) && this.theme.indexOf("Fluent") > -1) {
                this.valueFill = this.targetColor = this.theme === "FluentDark" ? "#797775" : "#A19F9D";
            }
        };
        BulletChart.prototype.findRange = function () {
            if (!this.minimum) {
                this.minimum = 0;
            }
            if (!this.maximum) {
                this.maximum = 0;
                for (var i = 0; i < this.ranges.length; i++) {
                    this.maximum = this.maximum > this.ranges[i].end ? this.maximum : this.ranges[i].end;
                }
            }
            if (this.maximum === null) {
                if (!ej2_base_2.isNullOrUndefined(this.dataSource)) {
                    for (var i = 0; i < Object.keys(this.dataSource).length; i++) {
                        if (this.dataSource[i][this.targetField] > this.dataSource[i][this.valueField]) {
                            this.maximum = this.maximum > this.dataSource[i][this.targetField] ? this.maximum + this.interval :
                                this.dataSource[i][this.targetField] + this.interval;
                        }
                        else {
                            this.maximum = this.maximum > this.dataSource[i][this.valueField] ? this.maximum + this.interval :
                                this.dataSource[i][this.valueField] + this.interval;
                        }
                    }
                }
                else {
                    this.maximum = 10;
                }
            }
            if (!this.interval) {
                this.interval = this.calculateNumericNiceInterval(this.maximum - this.minimum);
            }
        };
        BulletChart.prototype.getActualDesiredIntervalsCount = function (availableSize) {
            var size = this.orientation === 'Horizontal' ? availableSize.width : availableSize.height;
            var desiredIntervalsCount = (this.orientation === 'Horizontal' ? 0.533 : 1) * 3;
            desiredIntervalsCount = Math.max((size * (desiredIntervalsCount / 100)), 1);
            return desiredIntervalsCount;
        };
        BulletChart.prototype.calculateNumericNiceInterval = function (delta) {
            var actualDesiredIntervalsCount = this.getActualDesiredIntervalsCount(this.availableSize);
            var niceInterval = delta / actualDesiredIntervalsCount;
            var minInterval = Math.pow(10, Math.floor(helper_2.logBase(niceInterval, 10)));
            for (var _i = 0, _a = this.intervalDivs; _i < _a.length; _i++) {
                var interval = _a[_i];
                var currentInterval = minInterval * interval;
                if (actualDesiredIntervalsCount < (delta / currentInterval)) {
                    break;
                }
                niceInterval = currentInterval;
            }
            return niceInterval;
        };
        BulletChart.prototype.setSecondaryElementPosition = function () {
            var element = helper_1.getElement(this.element.id + '_Secondary_Element');
            if (!element) {
                return;
            }
            var rect = this.element.getBoundingClientRect();
            var svgRect = helper_1.getElement(this.element.id + '_svg').getBoundingClientRect();
            element.style.left = Math.max(svgRect.left - rect.left, 0) + 'px';
            element.style.top = Math.max(svgRect.top - rect.top, 0) + 'px';
            element.style.position = 'relative';
        };
        BulletChart.prototype.createSvg = function (chart) {
            this.removeSvg();
            chart.renderer = new ej2_svg_base_1.SvgRenderer(chart.element.id);
            this.calculateAvailableSize(this);
            chart.svgObject = chart.renderer.createSvg({
                id: chart.element.id + '_svg',
                width: chart.availableSize.width,
                height: chart.availableSize.height
            });
            this.renderChartBackground();
        };
        BulletChart.prototype.renderChartBackground = function () {
            var rect = new helper_1.RectOption(this.element.id + '_ChartBorder', this.themeStyle.background, { width: this.border.width || 0, color: this.border.color || 'transparent' }, 1, new ej2_svg_base_1.Rect(0, 0, this.availableSize.width, this.availableSize.height));
            this.svgObject.appendChild(this.renderer.drawRectangle(rect));
        };
        BulletChart.prototype.renderBulletElements = function () {
            var scaleGroup = this.renderer.createGroup({ 'id': this.svgObject.id + '_scaleGroup' });
            this.svgObject.appendChild(scaleGroup);
            this.renderBulletChartTitle();
            this.rangeCollection = this.scale.drawScaleGroup(scaleGroup);
            var size = (this.orientation === 'Horizontal') ? this.initialClipRect.width : this.initialClipRect.height;
            var intervalValue = size / ((this.maximum - this.minimum) / this.interval);
            this.bulletAxis.renderMajorTickLines(intervalValue, scaleGroup);
            this.bulletAxis.renderMinorTickLines(intervalValue, scaleGroup);
            this.bulletAxis.renderAxisLabels(intervalValue, scaleGroup);
            this.bulletChartRect.x = (this.titlePosition === 'Left' ||
                this.titlePosition === 'Right' || this.orientation === 'Vertical') ? this.bulletChartRect.x : 0;
            var elementId = this.element.id;
            if (this.element.tagName !== 'g') {
                var tooltipDiv = helper_1.redrawElement(this.redraw, elementId + '_Secondary_Element') ||
                    this.createElement('div');
                tooltipDiv.id = elementId + '_Secondary_Element';
                helper_1.appendChildElement(false, this.element, tooltipDiv, this.redraw);
            }
            if (this.tooltip.enable) {
                helper_1.appendChildElement(false, this.svgObject, this.renderer.createGroup({ id: elementId + '_UserInteraction', style: 'pointer-events:none;' }), this.redraw);
            }
            this.bindData();
            this.renderDataLabel();
            this.renderBulletLegend();
            this.element.appendChild(this.svgObject);
            this.setSecondaryElementPosition();
        };
        BulletChart.prototype.renderBulletLegend = function () {
            if (this.bulletChartLegendModule && this.bulletChartLegendModule.legendCollections.length) {
                this.bulletChartLegendModule.calTotalPage = true;
                var bounds = this.bulletChartLegendModule.legendBounds;
                this.bulletChartLegendModule.renderLegend(this, this.legendSettings, bounds);
            }
        };
        BulletChart.prototype.bulletResize = function () {
            var _this = this;
            this.animateSeries = false;
            var arg = {
                chart: this,
                name: constants_1.resized,
                currentSize: new ej2_svg_base_1.Size(0, 0),
                previousSize: new ej2_svg_base_1.Size(this.availableSize.width, this.availableSize.height)
            };
            if (this.resizeTo) {
                clearTimeout(this.resizeTo);
            }
            this.resizeTo = +setTimeout(function () {
                if (_this.isDestroyed) {
                    clearTimeout(_this.resizeTo);
                    return;
                }
                _this.createSvg(_this);
                arg.currentSize = _this.availableSize;
                _this.trigger(constants_1.resized, arg);
                _this.calculatePosition();
                _this.renderBulletElements();
            }, 500);
            return false;
        };
        BulletChart.prototype.bindData = function () {
            if (this.dataSource != null) {
                this.dataCount = this.dataSource.length;
                this.drawMeasures(this.dataCount);
            }
        };
        BulletChart.prototype.drawMeasures = function (dataCount) {
            this.scale.renderFeatureBar(dataCount);
            this.scale.renderComparativeSymbol(dataCount);
        };
        BulletChart.prototype.calculatePosition = function () {
            var margin = this.margin;
            var titleHeight = 0;
            var subTitleHeight = 0;
            var titleSize = new ej2_svg_base_1.Size(0, 0);
            var padding = 5;
            this.titleCollections = [];
            this.subTitleCollections = [];
            var maxTitlteWidth = 0;
            var maxTitlteHeight = 0;
            var maxVerticalTitlteHeight = padding;
            if (this.title) {
                this.titleCollections = helper_2.getTitle(this.title, this.titleStyle, this.titleStyle.maximumTitleWidth);
                titleHeight = (ej2_svg_base_1.measureText(this.title, this.titleStyle).height * this.titleCollections.length) + padding;
                for (var _i = 0, _a = this.titleCollections; _i < _a.length; _i++) {
                    var titleText = _a[_i];
                    titleSize = ej2_svg_base_1.measureText(titleText, this.titleStyle);
                    maxTitlteWidth = titleSize.width > maxTitlteWidth ? titleSize.width : maxTitlteWidth;
                    maxTitlteHeight = titleSize.height > maxTitlteHeight ? titleSize.height : maxTitlteHeight;
                }
                maxVerticalTitlteHeight += maxTitlteHeight;
                this.subTitleCollections = helper_2.getTitle(this.subtitle, this.subtitleStyle, this.titleStyle.maximumTitleWidth);
                if (this.subtitle) {
                    for (var _b = 0, _c = this.subTitleCollections; _b < _c.length; _b++) {
                        var subText = _c[_b];
                        titleSize = ej2_svg_base_1.measureText(subText, this.subtitleStyle);
                        maxTitlteWidth = titleSize.width > maxTitlteWidth ? titleSize.width : maxTitlteWidth;
                        maxTitlteHeight = titleSize.height > maxTitlteHeight ? titleSize.height : maxTitlteHeight;
                    }
                    subTitleHeight = (ej2_svg_base_1.measureText(this.subtitle, this.subtitleStyle).height * this.subTitleCollections.length) +
                        padding;
                    maxVerticalTitlteHeight += maxTitlteHeight;
                }
            }
            this.maxTitleSize = new ej2_svg_base_1.Size(maxTitlteWidth, this.orientation === 'Vertical' ? maxVerticalTitlteHeight : maxTitlteHeight);
            this.maxLabelSize = this.getMaxLabelWidth();
            this.initialClipRect = this.getBulletBounds((this.orientation === 'Vertical' ? maxVerticalTitlteHeight : maxTitlteWidth), titleHeight, subTitleHeight, margin);
            this.bulletChartRect = new ej2_svg_base_1.Rect(this.initialClipRect.x, this.initialClipRect.y, this.initialClipRect.width, this.initialClipRect.height);
            if (this.bulletChartLegendModule) {
                this.bulletChartLegendModule.calculateLegendBounds(this.initialClipRect, this.availableSize, this.maxLabelSize);
            }
        };
        BulletChart.prototype.getBulletBounds = function (maxTitlteWidth, titleHeight, subTitleHeight, margin) {
            var padding = 5;
            var rect = new ej2_svg_base_1.Rect(0, 0, 0, 0);
            var enableRtl = this.enableRtl;
            var labelSpace = (this.labelPosition === this.tickPosition) ? padding : 0;
            var tickSize = ((this.tickPosition === 'Inside') ? 0 : (this.majorTickLines.height));
            var labelSize = ((this.labelPosition === 'Inside') ? 0 : padding +
                ((this.tickPosition === 'Outside') ? 0 : (ej2_svg_base_1.measureText(this.maximum.toString(), this.labelStyle).height)));
            var topAxisLabel = 0;
            var bottomAxisLabel = 0;
            var leftAxisLabel = 0;
            var rightAxisLabel = 0;
            var topCategory = 0;
            var bottomCategory = 0;
            var leftCategory = 0;
            var rightCategory = 0;
            var title = maxTitlteWidth;
            var format = this.bulletAxis.getFormat(this);
            var isCustomFormat = format.match('{value}') !== null;
            this.bulletAxis.format = this.intl.getNumberFormat({
                format: isCustomFormat ? '' : format, useGrouping: this.enableGroupSeparator
            });
            var formatted = ej2_svg_base_1.measureText(this.bulletAxis.formatValue(this.bulletAxis, isCustomFormat, format, this.maximum), this.labelStyle).width;
            var categoryLabelSize;
            if (this.orientation === 'Horizontal') {
                categoryLabelSize = this.maxLabelSize.width;
                topAxisLabel = (this.opposedPosition) ? tickSize + labelSize + labelSpace : 0;
                bottomAxisLabel = (!this.opposedPosition) ? tickSize + labelSize + labelSpace : 0;
                leftCategory = ((categoryLabelSize && !enableRtl) ? (categoryLabelSize) : 0);
                leftCategory += (title && this.titlePosition === 'Left') ? padding * 3 : 0;
                rightCategory = ((categoryLabelSize && enableRtl) ? (categoryLabelSize) : 0);
                rightCategory += (title && this.titlePosition === 'Right') ? padding : 0;
            }
            else {
                categoryLabelSize = this.maxLabelSize.height;
                rightAxisLabel = (this.opposedPosition) ? tickSize + labelSpace : 0;
                rightAxisLabel += (this.opposedPosition && this.labelPosition !== 'Inside') ?
                    formatted : 0;
                leftAxisLabel = (!this.opposedPosition) ? tickSize + labelSpace : 0;
                leftAxisLabel += (!this.opposedPosition && this.labelPosition !== 'Inside') ?
                    formatted : 0;
                topCategory = ((categoryLabelSize && enableRtl) ? (categoryLabelSize + padding) : 0);
                bottomCategory = ((categoryLabelSize && !enableRtl) ? (categoryLabelSize + padding) : 0);
            }
            switch (this.titlePosition) {
                case 'Left':
                    rect.x = margin.left + title + leftCategory + leftAxisLabel;
                    rect.width = this.availableSize.width - margin.right - rect.x - rightCategory - rightAxisLabel;
                    rect.y = margin.top + topAxisLabel + topCategory;
                    rect.height = this.availableSize.height - rect.y - margin.bottom - bottomAxisLabel - bottomCategory;
                    break;
                case 'Right':
                    rect.x = margin.left + leftCategory + leftAxisLabel;
                    rect.width = this.availableSize.width - rightAxisLabel - margin.right - rect.x - (title + padding) - rightCategory;
                    rect.y = margin.top + topAxisLabel + topCategory;
                    rect.height = this.availableSize.height - rect.y - margin.bottom - bottomAxisLabel - bottomCategory;
                    break;
                case 'Top':
                    rect.x = margin.left + leftAxisLabel + leftCategory;
                    rect.width = this.availableSize.width - margin.right - rect.x - rightCategory - rightAxisLabel;
                    rect.y = margin.top + (titleHeight + subTitleHeight) + topAxisLabel + topCategory;
                    rect.height = this.availableSize.height - rect.y - margin.bottom - bottomAxisLabel - bottomCategory;
                    break;
                case 'Bottom':
                    rect.x = margin.left + leftAxisLabel + leftCategory;
                    rect.y = margin.top + topAxisLabel + topCategory;
                    rect.width = this.availableSize.width - margin.right - rect.x - rightCategory - rightAxisLabel;
                    rect.height = this.availableSize.height - rect.y - bottomCategory - margin.bottom - bottomAxisLabel -
                        (titleHeight + subTitleHeight);
                    break;
            }
            return rect;
        };
        BulletChart.prototype.getMaxLabelWidth = function () {
            this.maxLabelSize = new ej2_svg_base_1.Size(0, 0);
            if (!this.categoryField) {
                return this.maxLabelSize;
            }
            var label;
            for (var i = 0, len = Object.keys(this.dataSource).length; i < len; i++) {
                label = ej2_svg_base_1.measureText((this.dataSource[i][this.categoryField] || ''), this.categoryLabelStyle);
                if (label.width > this.maxLabelSize.width) {
                    this.maxLabelSize.width = label.width;
                }
                if (label.height > this.maxLabelSize.height) {
                    this.maxLabelSize.height = label.height;
                }
            }
            return this.maxLabelSize;
        };
        BulletChart.prototype.calculateVisibleElements = function () {
            var range;
            var rangeCollection = this.ranges;
            this.visibleRanges = [];
            for (var i = 0, len = rangeCollection.length; i < len; i++) {
                range = rangeCollection[i];
                range.index = i;
                range.color = range.color;
                this.visibleRanges.push(range);
                rangeCollection[i] = range;
            }
        };
        BulletChart.prototype.renderBulletChartTitle = function () {
            var margin = this.margin;
            var x = 0;
            var y = 0;
            var padding = 5;
            var anchor = 'middle';
            var transform = '';
            var alignment = this.titleStyle.textAlignment;
            var elementSize = ej2_svg_base_1.measureText(this.title, this.titleStyle);
            var subTitleSize = (this.subtitle) ? ej2_svg_base_1.measureText(this.subtitle, this.subtitleStyle) : new ej2_svg_base_1.Size(0, 0);
            if (this.title) {
                if (this.orientation === 'Horizontal') {
                    switch (this.titlePosition) {
                        case 'Top':
                            x = this.findHorizontalAlignment(margin);
                            anchor = (alignment === 'Far') ? 'end' : ((alignment === 'Near') ? 'start' : 'middle');
                            y = margin.top + elementSize.height / 2 + padding;
                            break;
                        case 'Bottom':
                            x = this.findHorizontalAlignment(margin);
                            anchor = (alignment === 'Far') ? 'end' : ((alignment === 'Near') ? 'start' : 'middle');
                            y = this.availableSize.height - margin.bottom - elementSize.height / 3 + padding * 2
                                - ((subTitleSize.height) ? subTitleSize.height + padding : 0);
                            break;
                        case 'Left':
                            anchor = 'end';
                            x = margin.left + this.maxTitleSize.width;
                            y = (this.margin.top + (this.availableSize.height) / 2 - elementSize.height / 3)
                                - ((subTitleSize.height) ? subTitleSize.height : 0);
                            break;
                        case 'Right':
                            anchor = 'start';
                            x = (this.availableSize.width - margin.right - this.maxTitleSize.width + padding);
                            y = (this.margin.top + (this.availableSize.height) / 2 - elementSize.height / 3)
                                - ((subTitleSize.height) ? subTitleSize.height : 0);
                            break;
                    }
                }
                else {
                    switch (this.titlePosition) {
                        case 'Top':
                            x = (this.availableSize.width) / 2 + padding * 2;
                            y = this.margin.top + elementSize.height / 2 + padding;
                            break;
                        case 'Bottom':
                            x = (this.availableSize.width) / 2;
                            y = this.availableSize.height - this.margin.bottom - elementSize.height / 3 + padding * 2
                                - ((subTitleSize.height) ? subTitleSize.height + padding : 0);
                            break;
                        case 'Left':
                            y = this.findVerticalAlignment(margin);
                            anchor = (alignment === 'Far') ? 'start' : ((alignment === 'Near') ? 'end' : 'middle');
                            x = margin.left;
                            break;
                        case 'Right':
                            x = (this.availableSize.width - margin.right - elementSize.height / 3);
                            anchor = (alignment === 'Far') ? 'start' : ((alignment === 'Near') ? 'end' : 'middle');
                            y = this.findVerticalAlignment(margin);
                            break;
                    }
                    transform = (this.titlePosition === 'Left') ? 'rotate(-90,' + x + ',' + y + ')' :
                        ((this.titlePosition === 'Right') ? 'rotate(90,' + x + ',' + y + ')' : '');
                }
                var options = new ej2_svg_base_1.TextOption(this.element.id + '_BulletChartTitle', x, y, anchor, this.titleCollections, transform, 'auto');
                var element = helper_1.textElement(this.renderer, options, this.titleStyle, this.titleStyle.color || this.themeStyle.titleFontColor, this.svgObject);
                if (element) {
                    element.setAttribute('aria-label', this.title);
                    element.setAttribute('tabindex', this.tabIndex.toString());
                }
                if (this.subtitle) {
                    this.renderBulletChartSubTitle(x, y, anchor);
                }
            }
        };
        BulletChart.prototype.renderDataLabel = function () {
            var x = 0;
            var y = 0;
            var elementSpacing = 10;
            var anchor;
            var transform = '';
            var enableRtl = this.enableRtl;
            var data;
            var featureBounds;
            var format = this.labelFormat ? this.labelFormat : '';
            var isCustomFormat = format.match('{value}') !== null;
            if (this.dataLabel.enable) {
                for (var i = 0, len = Object.keys(this.dataSource).length; i < len; i++) {
                    data = this.dataSource[i];
                    featureBounds = this.scale.featureBarBounds[i];
                    var labelText = (data[this.valueField]).toString();
                    this.format = this.intl.getNumberFormat({
                        format: isCustomFormat ? '' : format, useGrouping: this.enableGroupSeparator
                    });
                    labelText = isCustomFormat ? format.replace('{value}', this.format(labelText)) : labelText;
                    var labelSize = ej2_svg_base_1.measureText(labelText, this.dataLabel.labelStyle);
                    var textWidth = labelSize['width'];
                    var textHeight = labelSize['height'];
                    if (this.orientation === 'Horizontal') {
                        anchor = this.type === 'Rect' ? 'end' : (enableRtl ? 'end' : 'start');
                        x = featureBounds.x + (enableRtl ? (this.type === 'Rect' ? textWidth + elementSpacing : -elementSpacing) :
                            featureBounds.width) + (this.type === 'Rect' ? -elementSpacing / 2 : elementSpacing / 2);
                        y = featureBounds.y + featureBounds.height / 2;
                    }
                    else {
                        anchor = 'middle';
                        x = featureBounds.y + featureBounds.height / 2;
                        y = featureBounds.x + (enableRtl ? featureBounds.width + (this.type === 'Rect' ? -textHeight : textHeight) : 0) +
                            (this.type === 'Rect' ? elementSpacing : -elementSpacing);
                    }
                    var labelOptions = new ej2_svg_base_1.TextOption(this.element.id + '_DataLabel_' + i, x, y, anchor, labelText, transform, 'middle');
                    helper_1.textElement(this.renderer, labelOptions, this.dataLabel.labelStyle, this.dataLabel.labelStyle.color || this.themeStyle.dataLabelFontColor, this.svgObject);
                }
            }
        };
        BulletChart.prototype.findHorizontalAlignment = function (margin) {
            var x = 0;
            switch (this.titleStyle.textAlignment) {
                case 'Center':
                    x = (this.availableSize.width - margin.left - margin.right) / 2;
                    break;
                case 'Near':
                    x = margin.left;
                    break;
                case 'Far':
                    x = this.availableSize.width - margin.right;
                    break;
            }
            return x;
        };
        BulletChart.prototype.findVerticalAlignment = function (margin) {
            var y = 0;
            switch (this.titleStyle.textAlignment) {
                case 'Center':
                    y = (this.availableSize.height - margin.top - margin.bottom) / 2;
                    break;
                case 'Near':
                    y = margin.top;
                    break;
                case 'Far':
                    y = this.availableSize.height - margin.bottom;
                    break;
            }
            return y;
        };
        BulletChart.prototype.renderBulletChartSubTitle = function (x, y, anchor) {
            var margin = this.margin;
            var padding = 5;
            var transform = '';
            var elementSize = ej2_svg_base_1.measureText(this.subtitle, this.subtitleStyle);
            if (this.orientation === 'Horizontal') {
                switch (this.titlePosition) {
                    case 'Top':
                        y = y + elementSize.height + padding / 2;
                        break;
                    case 'Bottom':
                        y = this.availableSize.height - margin.bottom - elementSize.height / 3 + padding;
                        break;
                    case 'Left':
                        y = y + elementSize.height + padding / 2;
                        break;
                    case 'Right':
                        y = y + elementSize.height + padding / 2;
                        break;
                }
            }
            else {
                switch (this.titlePosition) {
                    case 'Top':
                        y = y + elementSize.height + padding / 2;
                        break;
                    case 'Bottom':
                        y = this.availableSize.height - margin.bottom - elementSize.height / 3 + padding;
                        break;
                    case 'Left':
                        x += elementSize.height + padding / 2;
                        break;
                    case 'Right':
                        x -= elementSize.height + padding / 2;
                        break;
                }
                transform = (this.titlePosition === 'Left') ? 'rotate(-90,' + x + ',' + y + ')' :
                    ((this.titlePosition === 'Right') ? 'rotate(90,' + x + ',' + y + ')' : '');
            }
            var subTitleOptions = new ej2_svg_base_1.TextOption(this.element.id + '_BulletChartSubTitle', x, y, anchor, this.subTitleCollections, transform, 'auto');
            var element = helper_1.textElement(this.renderer, subTitleOptions, this.subtitleStyle, this.subtitleStyle.color || this.themeStyle.subTitleFontColor, this.svgObject);
            if (element) {
                element.setAttribute('aria-label', this.title);
                element.setAttribute('tabindex', this.tabIndex.toString());
            }
        };
        BulletChart.prototype.calculateAvailableSize = function (bulletChart) {
            var containerWidth = this.element.clientWidth || this.element.offsetWidth || 200;
            var height = (this.orientation === 'Vertical') ? 450 :
                ((this.titlePosition === 'Left' || this.titlePosition === 'Right') ? 83 : 126);
            var containerHeight = this.element.clientHeight || height;
            bulletChart.availableSize = new ej2_svg_base_1.Size(helper_1.stringToNumber(bulletChart.width, containerWidth) || containerWidth, helper_1.stringToNumber(bulletChart.height, containerHeight) || containerHeight);
        };
        BulletChart.prototype.removeSvg = function () {
            var svgElement = document.getElementById(this.element.id + '_svg');
            if (svgElement) {
                ej2_base_2.remove(svgElement);
            }
        };
        BulletChart.prototype.getPersistData = function () {
            var keyEntity = ['loaded'];
            return this.addOnPersist(keyEntity);
        };
        BulletChart.prototype.unWireEvents = function () {
            var startEvent = ej2_base_1.Browser.touchStartEvent;
            var moveEvent = ej2_base_1.Browser.touchMoveEvent;
            var cancelEvent = ej2_base_1.Browser.isPointer ? 'pointerleave' : 'mouseleave';
            ej2_base_2.EventHandler.remove(this.element, startEvent, this.bulletMouseDown);
            ej2_base_2.EventHandler.remove(this.element, moveEvent, this.bulletMouseMove);
            ej2_base_2.EventHandler.remove(this.element, cancelEvent, this.bulletMouseLeave);
            ej2_base_2.EventHandler.remove(this.element, 'click', this.bulletChartOnMouseClick);
            window.removeEventListener((ej2_base_1.Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.resizeBound);
        };
        BulletChart.prototype.wireEvents = function () {
            var cancelEvent = ej2_base_1.Browser.isPointer ? 'pointerleave' : 'mouseleave';
            ej2_base_2.EventHandler.add(this.element, ej2_base_1.Browser.touchMoveEvent, this.bulletMouseMove, this);
            ej2_base_2.EventHandler.add(this.element, cancelEvent, this.bulletMouseLeave, this);
            ej2_base_2.EventHandler.add(this.element, ej2_base_1.Browser.touchStartEvent, this.bulletMouseDown, this);
            ej2_base_2.EventHandler.add(this.element, 'click', this.bulletChartOnMouseClick, this);
            this.resizeBound = this.bulletResize.bind(this);
            window.addEventListener((ej2_base_1.Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.resizeBound);
            this.setStyle(this.element);
        };
        BulletChart.prototype.setStyle = function (element) {
            element.style.position = 'relative';
            element.style.display = 'block';
        };
        BulletChart.prototype.bulletMouseMove = function (e) {
            var pageX = e.clientX;
            var pageY = e.clientY;
            this.setPointMouseXY(pageX, pageY);
            var targetId = e.target.id;
            var targetClass = e.target.className['baseVal'];
            if (targetClass !== this.svgObject.id + '_FeatureMeasure' || this.svgObject.id + '_ComparativeMeasure') {
                if (!ej2_base_2.isNullOrUndefined(this.dataSource)) {
                    for (var i = 0; i < Object.keys(this.dataSource).length; i++) {
                        document.getElementById(this.svgObject.id + '_FeatureMeasure_' + i).setAttribute('opacity', '1');
                        document.getElementById(this.svgObject.id + '_ComparativeMeasure_' + i).setAttribute('opacity', '1');
                    }
                }
            }
            if (!this.isTouchEvent(e)) {
                var id = 'tooltipDiv' + this.element.id;
                var tooltipDiv = document.getElementById(id);
                if (tooltipDiv) {
                    if (this.isReact) {
                        this.clearTemplate();
                    }
                    ej2_base_2.remove(tooltipDiv);
                }
                if (this.bulletTooltipModule) {
                    this.bulletTooltipModule._elementTooltip(e, targetClass, targetId, this.mouseX);
                    this.bulletTooltipModule._displayTooltip(e, targetClass, targetId, this.mouseX, this.mouseY);
                }
            }
        };
        BulletChart.prototype.setPointMouseXY = function (pageX, pageY) {
            var svgClientRect = helper_1.getElement(this.svgObject.id).getBoundingClientRect();
            var elemntClientRect = this.element.getBoundingClientRect();
            this.mouseX = (pageX - elemntClientRect.left) - Math.max(svgClientRect.left - elemntClientRect.left, 0);
            this.mouseY = (pageY - elemntClientRect.top) - Math.max(svgClientRect.top - elemntClientRect.top, 0);
        };
        BulletChart.prototype.bulletMouseLeave = function (e) {
            if (!this.isTouchEvent(e)) {
                var tooltipDiv = document.getElementById('.tooltipDiv' + this.element.id);
                if (tooltipDiv) {
                    if (this.isReact) {
                        this.clearTemplate();
                    }
                    ej2_base_2.remove(tooltipDiv);
                }
            }
        };
        BulletChart.prototype.isTouchEvent = function (event) {
            if ((event.pointerType === 'touch') || (event.type.indexOf('touch') > -1)) {
                return true;
            }
            return false;
        };
        BulletChart.prototype.bulletMouseDown = function (e) {
            if (this.isTouchEvent(e)) {
                if (this.isReact) {
                    this.clearTemplate();
                }
                ej2_base_2.remove(document.getElementById(('tooltipDiv' + this.element.id)));
                var targetId = e.target.id;
                var targetClass = e.target.className['baseVal'];
                if (this.bulletTooltipModule) {
                    this.bulletTooltipModule._elementTooltip(e, targetClass, targetId, this.mouseX);
                    this.bulletTooltipModule._displayTooltip(e, targetClass, targetId, this.mouseX, this.mouseY);
                }
            }
        };
        BulletChart.prototype.bulletChartOnMouseClick = function (e) {
            var element = e.target;
            this.trigger(constants_1.bulletChartMouseClick, { target: element.id, x: this.mouseX, y: this.mouseY });
            this.notify('click', e);
            return false;
        };
        BulletChart.prototype.print = function (id) {
            new export_1.ExportUtils(this).print(id);
        };
        BulletChart.prototype.export = function (type, fileName, orientation, controls, width, height, isVertical) {
            controls = controls ? controls : [this];
            new export_1.ExportUtils(this).export(type, fileName, orientation, controls, width, height, isVertical);
        };
        BulletChart.prototype.onPropertyChanged = function (newProp, oldProp) {
            var renderer = false;
            var refreshBounds = false;
            this.animateSeries = false;
            if (!this.delayRedraw) {
                for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
                    var prop = _a[_i];
                    switch (prop) {
                        case 'height':
                        case 'width':
                            this.createSvg(this);
                            refreshBounds = true;
                            break;
                        case 'subtitle':
                        case 'title':
                            refreshBounds = true;
                            break;
                        case 'tickPosition':
                            renderer = true;
                            break;
                        case 'labelPosition':
                            renderer = true;
                            break;
                        case 'titlePosition':
                            renderer = true;
                            break;
                        case 'minimum':
                        case 'maximum':
                        case 'interval':
                            refreshBounds = true;
                            break;
                        case 'majorTickLines':
                        case 'minorTickLines':
                        case 'type':
                        case 'ranges':
                        case 'valueFill':
                        case 'targetColor':
                            refreshBounds = true;
                            break;
                        case 'titleStyle':
                            if (newProp.titleStyle) {
                                refreshBounds = true;
                            }
                            else {
                                renderer = true;
                            }
                            break;
                        case 'subtitleStyle':
                            if (newProp.subtitleStyle && (newProp.subtitleStyle.size || newProp.subtitleStyle.textOverflow)) {
                                refreshBounds = true;
                            }
                            else {
                                renderer = true;
                            }
                            break;
                        case 'border':
                            renderer = true;
                            break;
                        case 'opposedPosition':
                            renderer = true;
                            break;
                        case 'dataSource':
                            this.bindData();
                            refreshBounds = true;
                            break;
                        case 'theme':
                            this.animateSeries = true;
                            break;
                        case 'locale':
                        case 'currencyCode':
                            _super.prototype.refresh.call(this);
                            break;
                    }
                }
                if (!refreshBounds && renderer) {
                    this.removeSvg();
                    this.renderBulletElements();
                    this.trigger('loaded', { bulletChart: this });
                }
                if (refreshBounds) {
                    this.render();
                    this.trigger('loaded', { bulletChart: this });
                    this.redraw = false;
                }
            }
        };
        BulletChart.prototype.requiredModules = function () {
            var modules = [];
            var rangeName;
            for (var i = 0; i < this.ranges.length; i++) {
                if (this.ranges[i].name !== null) {
                    rangeName = true;
                }
            }
            this.isLegend = (this.legendSettings.visible && ((rangeName) || !!this.isLegend || this.targetField !== '' || this.valueField !== ''));
            if (this.tooltip.enable) {
                modules.push({
                    member: 'BulletTooltip',
                    args: [this]
                });
            }
            if (this.isLegend) {
                modules.push({
                    member: 'BulletChartLegend',
                    args: [this]
                });
            }
            return modules;
        };
        BulletChart.prototype.getModuleName = function () {
            return 'bulletChart';
        };
        BulletChart.prototype.destroy = function () {
            this.unWireEvents();
            _super.prototype.destroy.call(this);
            this.removeSvg();
            this.svgObject = null;
            this.element.classList.remove('e-BulletChart');
            this.element.innerHTML = '';
        };
        return BulletChart;
    }(ej2_base_1.Component));
    __decorate([
        ej2_base_1.Property(null)
    ], BulletChart.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], BulletChart.prototype, "height", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], BulletChart.prototype, "locale", void 0);
    __decorate([
        ej2_base_1.Complex({}, bullet_base_2.MajorTickLinesSettings)
    ], BulletChart.prototype, "majorTickLines", void 0);
    __decorate([
        ej2_base_1.Complex({}, bullet_base_2.MinorTickLinesSettings)
    ], BulletChart.prototype, "minorTickLines", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], BulletChart.prototype, "minimum", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], BulletChart.prototype, "maximum", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], BulletChart.prototype, "interval", void 0);
    __decorate([
        ej2_base_1.Property(4)
    ], BulletChart.prototype, "minorTicksPerInterval", void 0);
    __decorate([
        ej2_base_1.Complex(theme_1.BulletChartTheme.axisLabelFont, bullet_base_1.BulletLabelStyle)
    ], BulletChart.prototype, "labelStyle", void 0);
    __decorate([
        ej2_base_1.Complex(theme_1.BulletChartTheme.axisLabelFont, bullet_base_1.BulletLabelStyle)
    ], BulletChart.prototype, "categoryLabelStyle", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], BulletChart.prototype, "labelFormat", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], BulletChart.prototype, "title", void 0);
    __decorate([
        ej2_base_1.Complex(theme_1.BulletChartTheme.titleFont, bullet_base_1.BulletLabelStyle)
    ], BulletChart.prototype, "titleStyle", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], BulletChart.prototype, "subtitle", void 0);
    __decorate([
        ej2_base_1.Complex(theme_1.BulletChartTheme.subTitleFont, bullet_base_1.BulletLabelStyle)
    ], BulletChart.prototype, "subtitleStyle", void 0);
    __decorate([
        ej2_base_1.Property('Horizontal')
    ], BulletChart.prototype, "orientation", void 0);
    __decorate([
        ej2_base_1.Complex({ color: '#DDDDDD', width: 0 }, base_1.Border)
    ], BulletChart.prototype, "border", void 0);
    __decorate([
        ej2_base_1.Complex({}, bullet_base_1.BulletTooltipSettings)
    ], BulletChart.prototype, "tooltip", void 0);
    __decorate([
        ej2_base_2.Collection([{ end: null, opacity: 1, color: '' }, { end: null, opacity: 1, color: '' }, { end: null, opacity: 1, color: '' }], bullet_base_1.Range)
    ], BulletChart.prototype, "ranges", void 0);
    __decorate([
        ej2_base_1.Property('Outside')
    ], BulletChart.prototype, "labelPosition", void 0);
    __decorate([
        ej2_base_1.Property('Outside')
    ], BulletChart.prototype, "tickPosition", void 0);
    __decorate([
        ej2_base_1.Property('Top')
    ], BulletChart.prototype, "titlePosition", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], BulletChart.prototype, "opposedPosition", void 0);
    __decorate([
        ej2_base_1.Property('Material')
    ], BulletChart.prototype, "theme", void 0);
    __decorate([
        ej2_base_1.Complex({}, base_1.Animation)
    ], BulletChart.prototype, "animation", void 0);
    __decorate([
        ej2_base_1.Complex({}, bullet_base_1.BulletDataLabel)
    ], BulletChart.prototype, "dataLabel", void 0);
    __decorate([
        ej2_base_1.Complex({}, bullet_base_3.BulletChartLegendSettings)
    ], BulletChart.prototype, "legendSettings", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], BulletChart.prototype, "enableGroupSeparator", void 0);
    __decorate([
        ej2_base_1.Complex({ top: 15, bottom: 10, left: 15, right: 15 }, base_1.Margin)
    ], BulletChart.prototype, "margin", void 0);
    __decorate([
        ej2_base_1.Property(5)
    ], BulletChart.prototype, "targetWidth", void 0);
    __decorate([
        ej2_base_1.Property('#191919')
    ], BulletChart.prototype, "targetColor", void 0);
    __decorate([
        ej2_base_1.Property(6)
    ], BulletChart.prototype, "valueHeight", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], BulletChart.prototype, "valueFill", void 0);
    __decorate([
        ej2_base_1.Complex({ color: 'transparent', width: 0 }, base_1.Border)
    ], BulletChart.prototype, "valueBorder", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], BulletChart.prototype, "dataSource", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], BulletChart.prototype, "query", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], BulletChart.prototype, "categoryField", void 0);
    __decorate([
        ej2_base_1.Property('Rect')
    ], BulletChart.prototype, "type", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], BulletChart.prototype, "valueField", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], BulletChart.prototype, "targetField", void 0);
    __decorate([
        ej2_base_1.Property(['Rect', 'Cross', 'Circle'])
    ], BulletChart.prototype, "targetTypes", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], BulletChart.prototype, "tabIndex", void 0);
    __decorate([
        ej2_base_1.Event()
    ], BulletChart.prototype, "tooltipRender", void 0);
    __decorate([
        ej2_base_1.Event()
    ], BulletChart.prototype, "load", void 0);
    __decorate([
        ej2_base_1.Event()
    ], BulletChart.prototype, "loaded", void 0);
    __decorate([
        ej2_base_1.Event()
    ], BulletChart.prototype, "bulletChartMouseClick", void 0);
    __decorate([
        ej2_base_1.Event()
    ], BulletChart.prototype, "legendRender", void 0);
    __decorate([
        ej2_base_1.Event()
    ], BulletChart.prototype, "beforePrint", void 0);
    BulletChart = __decorate([
        ej2_base_1.NotifyPropertyChanges
    ], BulletChart);
    exports.BulletChart = BulletChart;
});
