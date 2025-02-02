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
define(["require", "exports", "@syncfusion/ej2-base", "../../common/utils/helper", "@syncfusion/ej2-svg-base", "../../common/utils/helper", "../../common/user-interaction/tooltip", "../../common/model/constants", "@syncfusion/ej2-base"], function (require, exports, ej2_base_1, helper_1, ej2_svg_base_1, helper_2, tooltip_1, constants_1, ej2_base_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Tooltip = (function (_super) {
        __extends(Tooltip, _super);
        function Tooltip(chart) {
            var _this = _super.call(this, chart) || this;
            _this.commonXvalues = [];
            _this.addEventListener();
            return _this;
        }
        Tooltip.prototype.addEventListener = function () {
            if (this.chart.isDestroyed) {
                return;
            }
            var cancelEvent = ej2_base_1.Browser.isPointer ? 'pointerleave' : 'mouseleave';
            this.chart.on(cancelEvent, this.mouseLeaveHandler, this);
            this.chart.on('tapHold', this.longPress, this);
            this.chart.on(ej2_base_1.Browser.touchMoveEvent, this.mouseMoveHandler, this);
            this.chart.on(ej2_base_1.Browser.touchEndEvent, this.mouseUpHandler, this);
        };
        Tooltip.prototype.mouseUpHandler = function () {
            var chart = this.control;
            var data = this.getData();
            data.lierIndex = this.lierIndex;
            if (chart.isTouch && !this.isSelected(chart) &&
                ((helper_2.withInBounds(chart.mouseX, chart.mouseY, chart.chartAxisLayoutPanel.seriesClipRect) && chart.tooltip.shared)
                    || !chart.tooltip.shared)) {
                if (!chart.crosshair.enable) {
                    this.tooltip();
                    if (chart.tooltip.fadeOutMode === 'Move') {
                        this.removeTooltip(chart.tooltip.fadeOutDuration);
                    }
                }
                else if (chart.startMove && chart.tooltip.fadeOutMode === 'Move') {
                    this.removeTooltip(2000);
                }
            }
            else if (!this.findData(data, this.previousPoints[0]) && chart.tooltip.fadeOutMode === 'Click') {
                this.removeTooltip(0);
            }
        };
        Tooltip.prototype.mouseLeaveHandler = function () {
            this.removeTooltip(this.chart.tooltip.fadeOutDuration);
        };
        Tooltip.prototype.mouseMoveHandler = function () {
            var chart = this.chart;
            chart.mouseX = chart.mouseX / chart.scaleX;
            chart.mouseY = chart.mouseY / chart.scaleY;
            if (!chart.disableTrackTooltip && !this.isSelected(chart)) {
                if (!chart.tooltip.shared && (!chart.isTouch || (chart.startMove))) {
                    this.tooltip();
                }
                if (helper_2.withInBounds(chart.mouseX, chart.mouseY, chart.chartAxisLayoutPanel.seriesClipRect)) {
                    if (chart.tooltip.shared && (!chart.isTouch || (chart.startMove))) {
                        this.tooltip();
                    }
                }
                else {
                    if (chart.tooltip.shared && chart.tooltip.fadeOutMode === 'Move') {
                        this.removeTooltip(this.chart.tooltip.fadeOutDuration);
                    }
                }
            }
        };
        Tooltip.prototype.longPress = function () {
            var chart = this.chart;
            if (chart.crosshair.enable && helper_2.withInBounds(chart.mouseX, chart.mouseY, chart.chartAxisLayoutPanel.seriesClipRect)) {
                this.tooltip();
            }
            return false;
        };
        Tooltip.prototype.tooltip = function () {
            if ((this.chart.stockChart && this.chart.stockChart.onPanning)) {
                this.removeTooltip(1000);
                return null;
            }
            var elementId = this.chart.enableCanvas ? this.element.id + '_tooltip_group' : this.element.id + '_tooltip_svg';
            var svgElement = this.getElement(elementId);
            var isStockSvg = this.chart.stockChart && svgElement && (svgElement.firstChild.childNodes.length > 1);
            var isTooltip = (svgElement && parseInt(svgElement.getAttribute('opacity'), 10) > 0 && !isStockSvg);
            var tooltipDiv = this.getTooltipElement(isTooltip);
            if (this.chart.enableCanvas && tooltipDiv) {
                document.getElementById(this.chart.element.id + '_Secondary_Element').appendChild(tooltipDiv);
                tooltipDiv.appendChild(document.getElementById(this.chart.element.id + '_tooltip_svg'));
            }
            if (!this.chart.tooltip.shared) {
                this.renderSeriesTooltip(this.chart, !isTooltip, tooltipDiv);
            }
            else {
                this.renderGroupedTooltip(this.chart, !isTooltip, tooltipDiv);
            }
        };
        Tooltip.prototype.findHeader = function (data) {
            if (this.header === '') {
                return '';
            }
            this.header = this.parseTemplate(data.point, data.series, this.header, data.series.xAxis, data.series.yAxis);
            if (this.header.replace(/<b>/g, '').replace(/<\/b>/g, '').trim() !== '') {
                return this.header;
            }
            return '';
        };
        Tooltip.prototype.findShapes = function () {
            if (!this.chart.tooltip.enableMarker) {
                return [];
            }
            var marker = [];
            for (var _i = 0, _a = this.currentPoints; _i < _a.length; _i++) {
                var data = _a[_i];
                marker.push(data.point.marker.shape || data.series.marker.shape);
            }
            return marker;
        };
        Tooltip.prototype.renderSeriesTooltip = function (chart, isFirst, tooltipDiv) {
            var data = this.getData();
            data.lierIndex = this.lierIndex;
            this.currentPoints = [];
            if (this.findData(data, this.previousPoints[0])) {
                if (!(chart.dataEditingModule && chart.dataEditingModule.isPointDragging) && (this.previousPoints[0] &&
                    data.point.index === this.previousPoints[0].point.index && data.series.index === this.previousPoints[0].series.index)) {
                    return null;
                }
                if (this.pushData(data, isFirst, tooltipDiv, true)) {
                    this.triggerTooltipRender(data, isFirst, this.getTooltipText(data), this.findHeader(data));
                }
            }
            else {
                if (!data.point && this.isRemove && chart.tooltip.fadeOutMode === 'Move') {
                    this.removeTooltip(this.chart.tooltip.fadeOutDuration);
                    this.isRemove = false;
                }
                else {
                    var commonXvalues = this.mergeXvalues(this.chart.visibleSeries);
                    for (var _i = 0, _a = chart.visibleSeries; _i < _a.length; _i++) {
                        var series = _a[_i];
                        if (series.visible && !(series.category === 'TrendLine')) {
                            data = this.getClosestX(chart, series, commonXvalues) || data;
                        }
                    }
                }
            }
            if (data && data.point) {
                this.findMouseValue(data, chart);
            }
        };
        Tooltip.prototype.triggerTooltipRender = function (point, isFirst, textCollection, headerText) {
            var _this = this;
            var tooltipTemplate;
            var argsData = {
                cancel: false, name: constants_1.tooltipRender, text: textCollection, headerText: headerText, template: tooltipTemplate,
                series: this.chart.isBlazor ? {} : point.series, textStyle: this.textStyle, point: point.point,
                data: { pointX: point.point.x, pointY: point.point.y, seriesIndex: point.series.index, seriesName: point.series.name,
                    pointIndex: point.point.index, pointText: point.point.text }
            };
            var borderWidth = this.chart.border.width;
            var padding = 3;
            var chartTooltipSuccess = function (argsData) {
                if (!argsData.cancel) {
                    if (point.series.type === 'BoxAndWhisker') {
                        _this.removeText();
                        isFirst = true;
                    }
                    _this.headerText = argsData.headerText;
                    _this.formattedText = _this.formattedText.concat(argsData.text);
                    _this.text = _this.formattedText;
                    _this.createTooltip(_this.chart, isFirst, _this.getSymbolLocation(point), point.series.clipRect, point.point, _this.findShapes(), _this.findMarkerHeight(_this.currentPoints[0]), new ej2_svg_base_1.Rect(borderWidth, borderWidth, _this.chart.availableSize.width - padding - borderWidth * 2, _this.chart.availableSize.height - padding - borderWidth * 2), _this.chart.crosshair.enable, null, _this.getTemplateText(point), _this.template ? argsData.template : '');
                }
                else {
                    _this.removeHighlight();
                    ej2_base_1.remove(_this.getElement(_this.element.id + '_tooltip'));
                }
                _this.isRemove = true;
            };
            chartTooltipSuccess.bind(this, point);
            this.chart.trigger(constants_1.tooltipRender, argsData, chartTooltipSuccess);
        };
        Tooltip.prototype.findMarkerHeight = function (pointData) {
            if (!this.chart.tooltip.enableMarker) {
                return 0;
            }
            var markerHeight = 0;
            var series = pointData.series;
            markerHeight = ((series.marker.visible || (this.chart.tooltip.shared &&
                (!series.isRectSeries || series.marker.visible)) || series.type === 'Scatter' || series.drawType === 'Scatter')
                && !(series.type === 'Candle' || series.type === 'Hilo' || series.type === 'HiloOpenClose')) ?
                ((series.marker.height + 2) / 2 + (2 * series.marker.border.width)) : 0;
            return markerHeight;
        };
        Tooltip.prototype.findData = function (data, previous) {
            return data.point && ((!previous || (previous.point !== data.point)) ||
                (previous && previous.lierIndex > 3 && previous.lierIndex !== this.lierIndex) || (previous.point === data.point));
        };
        Tooltip.prototype.getSymbolLocation = function (data) {
            var location;
            if (data.series.type !== 'BoxAndWhisker') {
                if (!data.point.symbolLocations[0]) {
                    return null;
                }
                location = new helper_1.ChartLocation(data.point.symbolLocations[0].x, data.point.symbolLocations[0].y);
            }
            switch (data.series.type) {
                case 'BoxAndWhisker':
                    return this.getBoxLocation(data);
                case 'Waterfall':
                    return this.getWaterfallRegion(data, location);
                case 'RangeArea':
                case 'SplineRangeArea':
                case 'RangeColumn':
                    return this.getRangeArea(data, location);
                default:
                    return location;
            }
        };
        Tooltip.prototype.getRangeArea = function (data, location) {
            if (data.point.regions[0]) {
                if (!this.inverted) {
                    location.y = data.point.regions[0].y + data.point.regions[0].height / 2;
                }
                else {
                    location.x = data.point.regions[0].x + data.point.regions[0].width / 2;
                }
            }
            return location;
        };
        Tooltip.prototype.getWaterfallRegion = function (data, location) {
            if (!this.inverted) {
                location.y = (data.point.y < 0) ?
                    location.y - data.point.regions[0].height : location.y;
            }
            else {
                location.x = (data.point.y < 0) ?
                    location.x + data.point.regions[0].width : location.x;
            }
            return location;
        };
        Tooltip.prototype.getTooltipText = function (pointData) {
            var series = pointData.series;
            return this.parseTemplate(pointData.point, series, this.getFormat(this.chart, series), series.xAxis, series.yAxis);
        };
        Tooltip.prototype.getTemplateText = function (data) {
            if (this.template) {
                var point = ej2_base_1.extend({}, data.point);
                point.x = this.formatPointValue(data.point, data.series.xAxis, 'x', true, false);
                if ((data.series.seriesType === 'XY')) {
                    point.y = this.formatPointValue(data.point, data.series.yAxis, 'y', false, true);
                }
                else {
                    point.low = this.formatPointValue(data.point, data.series.yAxis, 'low', false, true);
                    point.high = this.formatPointValue(data.point, data.series.yAxis, 'high', false, true);
                }
                return point;
            }
            else {
                return data.point;
            }
        };
        Tooltip.prototype.findMouseValue = function (data, chart) {
            if (!chart.requireInvertedAxis) {
                if (chart.chartAreaType === 'PolarRadar') {
                    this.valueX = helper_2.valueToPolarCoefficient(data.point.xValue, data.series.xAxis) * data.series.xAxis.rect.width
                        + data.series.xAxis.rect.x;
                }
                else {
                    this.valueX = (data.series.category === 'TrendLine' && chart.tooltip.shared) ? this.valueX :
                        helper_2.valueToCoefficient(data.point.xValue, data.series.xAxis) * data.series.xAxis.rect.width
                            + data.series.xAxis.rect.x;
                }
                this.valueY = chart.mouseY;
            }
            else {
                this.valueY = (1 - helper_2.valueToCoefficient(data.point.xValue, data.series.xAxis)) * data.series.xAxis.rect.height
                    + data.series.xAxis.rect.y;
                this.valueX = chart.mouseX;
            }
        };
        Tooltip.prototype.renderGroupedTooltip = function (chart, isFirst, tooltipDiv) {
            var data;
            var dataCollection = [];
            var lastData;
            var pointData = chart.chartAreaType === 'PolarRadar' ? this.getData() : null;
            this.stopAnimation();
            this.removeHighlight();
            this.currentPoints = [];
            var extraPoints = [];
            if (isFirst) {
                if (!chart.stockChart) {
                    if (tooltipDiv) {
                        document.getElementById(this.element.id + '_Secondary_Element').appendChild(tooltipDiv);
                    }
                }
                else {
                    if (tooltipDiv && !ej2_svg_base_1.getElement(tooltipDiv.id)) {
                        document.getElementById(chart.stockChart.element.id + '_Secondary_Element').appendChild(tooltipDiv);
                    }
                }
            }
            this.removeText();
            var argument = {
                text: [], cancel: false, name: constants_1.sharedTooltipRender, data: [], point: [], series: [], headerText: '', textStyle: this.textStyle, template: ''
            };
            var commonXvalues = this.mergeXvalues(this.chart.visibleSeries);
            var i = 0;
            for (var _i = 0, _a = chart.visibleSeries; _i < _a.length; _i++) {
                var series = _a[_i];
                if (!series.enableTooltip || !series.visible) {
                    continue;
                }
                if (chart.chartAreaType === 'Cartesian' && series.visible) {
                    data = this.getClosestX(chart, series, commonXvalues);
                }
                else if (chart.chartAreaType === 'PolarRadar' && series.visible && pointData.point !== null) {
                    data = new helper_1.PointData(series.points[pointData.point.index], series);
                }
                if (data) {
                    argument.data.push({ pointX: data.point.x, pointY: data.point.y, seriesIndex: data.series.index,
                        seriesName: data.series.name, pointIndex: data.point.index, pointText: data.point.text });
                    argument.series[i] = data.series;
                    argument.point[i] = data.point;
                    argument.headerText = this.findHeader(data);
                    this.currentPoints.push(data);
                    argument.text.push(this.getTooltipText(data));
                    lastData = (data.series.category === 'TrendLine' && chart.tooltip.shared) ? lastData : data;
                    dataCollection.push(data);
                }
                i++;
            }
            if (dataCollection.length > 0 && this.currentPoints.length > 0) {
                this.triggerSharedTooltip(argument, lastData, extraPoints, chart, isFirst, dataCollection);
            }
            else if (this.getElement(this.element.id + '_tooltip_path')) {
                this.getElement(this.element.id + '_tooltip_path').setAttribute('d', '');
            }
        };
        Tooltip.prototype.triggerSharedTooltip = function (argument, point, extraPoints, chart, isFirst, dataCollection) {
            var _this = this;
            var tooltipTemplate;
            var argsData = {
                cancel: false, name: constants_1.sharedTooltipRender, text: argument.text, headerText: argument.headerText,
                textStyle: argument.textStyle, template: tooltipTemplate,
                point: argument.point, series: argument.series,
                data: argument.data
            };
            var borderWidth = this.chart.border.width;
            var padding = 3;
            var sharedTooltip = function (argsData) {
                if (!argsData.cancel) {
                    if (point.series.type === 'BoxAndWhisker') {
                        _this.removeText();
                        isFirst = true;
                    }
                    _this.formattedText = _this.formattedText.concat(argsData.text);
                    _this.text = argsData.text;
                    _this.headerText = argsData.headerText;
                    _this.findMouseValue(point, _this.chart);
                    _this.createTooltip(chart, isFirst, _this.findSharedLocation(), _this.currentPoints.length === 1 ? _this.currentPoints[0].series.clipRect : null, dataCollection.length === 1 ? dataCollection[0].point : null, _this.findShapes(), _this.findMarkerHeight(_this.currentPoints[0]), new ej2_svg_base_1.Rect(borderWidth, borderWidth, _this.chart.availableSize.width - padding - borderWidth * 2, _this.chart.availableSize.height - padding - borderWidth * 2), _this.chart.crosshair.enable, extraPoints, _this.template ? _this.getTemplateText(dataCollection[0]) : null, _this.template ? argsData.template : '');
                    point = null;
                }
                else {
                    extraPoints.push(point);
                }
            };
            sharedTooltip.bind(this, point, extraPoints);
            this.chart.trigger(constants_1.sharedTooltipRender, argsData, sharedTooltip);
        };
        Tooltip.prototype.findSharedLocation = function () {
            var stockChart = this.chart.stockChart;
            if (stockChart) {
                if (this.text.length === 1) {
                    this.text.push('');
                }
                var toolbarHeight = stockChart.enablePeriodSelector ? stockChart.toolbarHeight : 0;
                var element = document.getElementById(stockChart.element.id + '_ChartTitle');
                var titleHeight = stockChart.title !== '' ? element.getBoundingClientRect().height + 10 : 0;
                return new helper_1.ChartLocation(this.chart.chartAxisLayoutPanel.seriesClipRect.x + 5, this.chart.chartAxisLayoutPanel.seriesClipRect.y + toolbarHeight + 5 + titleHeight);
            }
            else {
                if (this.currentPoints.length > 1) {
                    return new helper_1.ChartLocation(this.valueX, this.valueY);
                }
                else {
                    return this.getSymbolLocation(this.currentPoints[0]);
                }
            }
        };
        Tooltip.prototype.getBoxLocation = function (data) {
            var location = this.lierIndex > 3 ? data.point.symbolLocations[this.lierIndex - 4] :
                {
                    x: data.point.regions[0].x + (data.point.regions[0].width / 2),
                    y: data.point.regions[0].y + (data.point.regions[0].height / 2)
                };
            return location;
        };
        Tooltip.prototype.parseTemplate = function (point, series, format, xAxis, yAxis) {
            var val;
            var textValue;
            for (var _i = 0, _a = Object.keys(point); _i < _a.length; _i++) {
                var dataValue = _a[_i];
                val = new RegExp('${point' + '.' + dataValue + '}', 'gm');
                format = format.replace(val.source, this.formatPointValue(point, val.source === '${point.x}' ? xAxis : yAxis, dataValue, val.source === '${point.x}', (val.source === '${point.high}' ||
                    val.source === '${point.open}' ||
                    val.source === '${point.close}' ||
                    val.source === '${point.low}' ||
                    val.source === '${point.y}' ||
                    val.source === '${point.minimum}' ||
                    val.source === '${point.maximum}' ||
                    val.source === '${point.outliers}' ||
                    val.source === '${point.upperQuartile}' ||
                    val.source === '${point.lowerQuartile}' ||
                    val.source === '${point.median}')));
            }
            for (var _b = 0, _c = Object.keys(Object.getPrototypeOf(series)); _b < _c.length; _b++) {
                var dataValue = _c[_b];
                val = new RegExp('${series' + '.' + dataValue + '}', 'gm');
                textValue = series[dataValue];
                format = format.replace(val.source, textValue);
            }
            return format;
        };
        Tooltip.prototype.formatPointValue = function (point, axis, dataValue, isXPoint, isYPoint) {
            var textValue;
            var customLabelFormat;
            var value;
            if (axis.valueType !== 'Category' && isXPoint) {
                customLabelFormat = axis.labelFormat && axis.labelFormat.match('{value}') !== null;
                textValue = customLabelFormat ? axis.labelFormat.replace('{value}', axis.format(point[dataValue])) :
                    axis.format(point[dataValue]);
            }
            else if (isYPoint && !ej2_base_2.isNullOrUndefined(point[dataValue])) {
                customLabelFormat = axis.labelFormat && axis.labelFormat.match('{value}') !== null;
                value = dataValue === 'outliers' ? axis.format(point[dataValue][this.lierIndex - 4]) :
                    axis.format(point[dataValue]);
                textValue = customLabelFormat ? axis.labelFormat.replace('{value}', value) : value;
            }
            else {
                textValue = point[dataValue];
            }
            return textValue;
        };
        Tooltip.prototype.getFormat = function (chart, series) {
            if (series.tooltipFormat) {
                if (series.seriesType === 'XY' && series.category === 'Indicator') {
                    return this.getIndicatorTooltipFormat(series, chart, chart.tooltip.format);
                }
                return series.tooltipFormat;
            }
            if (!series.tooltipFormat && chart.tooltip.format) {
                if (series.seriesType === 'XY' && series.category === 'Indicator') {
                    return this.getIndicatorTooltipFormat(series, chart, chart.tooltip.format);
                }
                return chart.tooltip.format;
            }
            var textX = (series.type === 'Histogram') ? '${point.minimum}' + '-' + '${point.maximum}' : '${point.x}';
            var format = !chart.tooltip.shared ? textX : '${series.name}';
            switch (series.seriesType) {
                case 'XY':
                    if (series.category === 'Indicator') {
                        this.getIndicatorTooltipFormat(series, chart, chart.tooltip.format);
                    }
                    return format + ' : ' + ((series.type === 'Bubble') ? '<b>${point.y}</b>  Size : <b>${point.size}</b>' :
                        '<b>${point.y}</b>');
                case 'HighLow':
                    return format + ('<br/>High : <b>${point.high}</b><br/>Low : <b>${point.low}</b>');
                case 'HighLowOpenClose':
                    return format + ('<br/>High : <b>${point.high}</b><br/>Low : <b>${point.low}</b><br/>' +
                        'Open : <b>${point.open}</b><br/>Close : <b>${point.close}</b>');
                case 'BoxPlot': {
                    return format + '<br/>' + (this.lierIndex > 3 ? 'Outliers : <b>${point.outliers}</b>' :
                        'Maximum : <b>${point.maximum}</b><br/>Q3 : <b>${point.upperQuartile}</b><br/>' +
                            'Median : <b>${point.median}</b><br/>Q1 : <b>${point.lowerQuartile}</b><br/>Minimum : <b>${point.minimum}</b>');
                }
                default: return '';
            }
        };
        Tooltip.prototype.getIndicatorTooltipFormat = function (series, chart, format) {
            var toolTip;
            if (series.seriesType === 'XY') {
                toolTip = series.name + ' : <b>${point.y}</b>';
            }
            else {
                toolTip = format;
            }
            return toolTip;
        };
        Tooltip.prototype.removeHighlightedMarker = function (data, fadeOut) {
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var item = data_1[_i];
                helper_2.removeElement(this.element.id + '_Series_' + item.series.index +
                    '_Point_' + item.point.index + '_Trackball');
                if (this.chart.markerRender) {
                    this.chart.markerRender.removeHighlightedMarker(item.series, item.point, fadeOut);
                }
            }
            this.previousPoints = [];
        };
        Tooltip.prototype.getModuleName = function () {
            return 'Tooltip';
        };
        Tooltip.prototype.destroy = function () {
        };
        return Tooltip;
    }(tooltip_1.BaseTooltip));
    exports.Tooltip = Tooltip;
});
