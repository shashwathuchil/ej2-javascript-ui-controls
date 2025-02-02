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
define(["require", "exports", "@syncfusion/ej2-base", "../../common/legend/legend", "../../common/utils/helper", "../../common/utils/helper", "@syncfusion/ej2-svg-base", "../../common/model/constants", "../../common/utils/helper"], function (require, exports, ej2_base_1, legend_1, helper_1, helper_2, ej2_svg_base_1, constants_1, helper_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Legend = (function (_super) {
        __extends(Legend, _super);
        function Legend(chart) {
            var _this = _super.call(this, chart) || this;
            _this.library = _this;
            _this.addEventListener();
            return _this;
        }
        Legend.prototype.addEventListener = function () {
            if (this.chart.isDestroyed) {
                return;
            }
            this.chart.on(ej2_base_1.Browser.touchMoveEvent, this.mouseMove, this);
            this.chart.on('click', this.click, this);
            this.chart.on(ej2_base_1.Browser.touchEndEvent, this.mouseEnd, this);
        };
        Legend.prototype.removeEventListener = function () {
            if (this.chart.isDestroyed) {
                return;
            }
            this.chart.off(ej2_base_1.Browser.touchMoveEvent, this.mouseMove);
            this.chart.off('click', this.click);
            this.chart.off(ej2_base_1.Browser.touchEndEvent, this.mouseEnd);
        };
        Legend.prototype.mouseMove = function (e) {
            if (this.chart.legendSettings.visible && !this.chart.isTouch) {
                this.move(e);
                if (this.chart.highlightModule && this.chart.highlightMode !== 'None') {
                    var legendItemsId = [this.legendID + '_text_', this.legendID + '_shape_marker_',
                        this.legendID + '_shape_'];
                    var targetId = e.target.id;
                    var index = void 0;
                    for (var _i = 0, legendItemsId_1 = legendItemsId; _i < legendItemsId_1.length; _i++) {
                        var id = legendItemsId_1[_i];
                        if (targetId.indexOf(id) > -1) {
                            index = parseInt(targetId.split(id)[1], 10);
                            this.chart.highlightModule.legendSelection(this.chart, index, e.target, e.type);
                            break;
                        }
                    }
                }
            }
        };
        Legend.prototype.mouseEnd = function (e) {
            if (this.chart.legendSettings.visible && this.chart.isTouch) {
                this.move(e);
            }
        };
        Legend.prototype.getLegendOptions = function (visibleSeriesCollection, chart) {
            this.legendCollections = [];
            var seriesType;
            var fill;
            var colors = [];
            this.isRtlEnable = chart.enableRtl;
            this.isReverse = !this.isRtlEnable && chart.legendSettings.reverse;
            if (visibleSeriesCollection.length > 1) {
                this.legend.mode = 'Series';
            }
            for (var _i = 0, visibleSeriesCollection_1 = visibleSeriesCollection; _i < visibleSeriesCollection_1.length; _i++) {
                var series = visibleSeriesCollection_1[_i];
                if (this.legend.mode === 'Series') {
                    if (series.category !== 'Indicator') {
                        seriesType = (chart.chartAreaType === 'PolarRadar') ? series.drawType :
                            series.type;
                        fill = (series.pointColorMapping && series.points.length > 0) ?
                            (series.points[0].interior ? series.points[0].interior : series.interior) : series.interior;
                        this.legendCollections.push(new legend_1.LegendOptions(series.name, fill, series.legendShape, (series.category === 'TrendLine' ?
                            this.chart.series[series.sourceIndex].trendlines[series.index].visible : series.visible), seriesType, series.legendImageUrl, series.marker.shape, series.marker.visible));
                    }
                }
                else if (this.legend.mode === 'Point') {
                    var _loop_1 = function (points) {
                        seriesType = (chart.chartAreaType === 'PolarRadar') ? series.drawType :
                            series.type;
                        fill = points.interior ? points.interior : series.interior;
                        if (this_1.legendCollections.filter(function (i) { return i.text === points.x.toString(); }).length === 0) {
                            this_1.legendCollections.push(new legend_1.LegendOptions(points.x.toString(), fill, series.legendShape, (series.category === 'TrendLine' ?
                                this_1.chart.series[series.sourceIndex].trendlines[series.index].visible : points.visible), seriesType, '', series.marker.shape, series.marker.visible));
                        }
                    };
                    var this_1 = this;
                    for (var _a = 0, _b = series.points; _a < _b.length; _a++) {
                        var points = _b[_a];
                        _loop_1(points);
                    }
                }
                else if (this.legend.mode === 'Range') {
                    for (var _c = 0, _d = series.points; _c < _d.length; _c++) {
                        var points = _d[_c];
                        seriesType = (chart.chartAreaType === 'PolarRadar') ? series.drawType :
                            series.type;
                        fill = points.interior ? points.interior : series.interior;
                        var legendLabel = 'Others';
                        if (colors.indexOf(fill) < 0) {
                            colors.push(fill);
                            if (chart.rangeColorSettings.length >= 1 && chart.rangeColorSettings[0].colors.length === 1) {
                                for (var _e = 0, _f = chart.rangeColorSettings; _e < _f.length; _e++) {
                                    var rangeMap = _f[_e];
                                    if (rangeMap.colors[0] === fill) {
                                        legendLabel = rangeMap.label;
                                    }
                                }
                                this.legendCollections.push(new legend_1.LegendOptions(legendLabel, fill, series.legendShape, (series.category === 'TrendLine' ?
                                    this.chart.series[series.sourceIndex].trendlines[series.index].visible : points.visible), seriesType, '', series.marker.shape, series.marker.visible));
                            }
                        }
                    }
                }
                else {
                    if (this.legendCollections.length === 0 && chart.rangeColorSettings.length > 0) {
                        var startLabel = chart.rangeColorSettings[0].start.toString();
                        var endLabel = chart.rangeColorSettings[chart.rangeColorSettings.length - 1].end.toString();
                        this.legendCollections.push(new legend_1.LegendOptions(startLabel, series.interior, 'Rectangle', true, seriesType, '', series.marker.shape, series.marker.visible));
                        this.legendCollections.push(new legend_1.LegendOptions(endLabel, series.interior, 'Rectangle', true, seriesType, '', series.marker.shape, series.marker.visible));
                    }
                }
            }
            if (this.isReverse && chart.legendSettings.mode !== 'Gradient') {
                this.legendCollections.reverse();
            }
        };
        Legend.prototype.getLegendBounds = function (availableSize, legendBounds, legend) {
            this.calculateLegendTitle(legend, legendBounds);
            this.isTitle = legend.title ? true : false;
            this.chartRowCount = 1;
            this.rowHeights = [];
            this.columnHeights = [];
            this.pageHeights = [];
            var padding = legend.padding;
            var titlePosition = legend.titlePosition;
            var extraHeight = 0;
            var legendOption;
            var extraWidth = 0;
            var arrowWidth = this.arrowWidth;
            var arrowHeight = this.arrowHeight;
            var verticalArrowSpace = this.isVertical && !legend.enablePages ? arrowHeight : 0;
            var titleSpace = this.isTitle && titlePosition === 'Top' ? this.legendTitleSize.height + this.fivePixel : 0;
            titleSpace = this.isTitle && this.isVertical && titlePosition !== 'Top' ? this.legendTitleSize.height + this.fivePixel : titleSpace;
            if (!this.isVertical) {
                extraHeight = !legend.height ? ((availableSize.height / 100) * 5) : 0;
            }
            else {
                extraWidth = !legend.width ? ((availableSize.width / 100) * 5) : 0;
            }
            legendBounds.height += (extraHeight);
            legendBounds.width += extraWidth;
            var shapeWidth = legend.shapeWidth;
            var shapePadding = legend.shapePadding;
            var maximumWidth = 0;
            var rowWidth = 0;
            var legendWidth = 0;
            var columnHeight = 0;
            var columnCount = 0;
            var rowCount = 0;
            var titlePlusArrowSpace = 0;
            var legendEventArgs;
            var render = false;
            this.maxItemHeight = Math.max(ej2_svg_base_1.measureText('MeasureText', legend.textStyle).height, legend.shapeHeight);
            for (var i = 0; i < this.legendCollections.length; i++) {
                legendOption = this.legendCollections[i];
                if (constants_1.regSub.test(legendOption.text)) {
                    legendOption.text = helper_2.getUnicodeText(legendOption.text, constants_1.regSub);
                }
                if (constants_1.regSup.test(legendOption.text)) {
                    legendOption.text = helper_2.getUnicodeText(legendOption.text, constants_1.regSup);
                }
                legendEventArgs = {
                    fill: legendOption.fill, text: legendOption.text, shape: legendOption.shape,
                    markerShape: legendOption.markerShape, name: constants_1.legendRender, cancel: false
                };
                this.chart.trigger(constants_1.legendRender, legendEventArgs);
                legendOption.render = !legendEventArgs.cancel;
                legendOption.text = legendEventArgs.text;
                legendOption.fill = legendEventArgs.fill;
                legendOption.shape = legendEventArgs.shape;
                legendOption.markerShape = legendEventArgs.markerShape;
                legendOption.textSize = ej2_svg_base_1.measureText(legendOption.text, legend.textStyle);
                shapeWidth = legendOption.text ? legend.shapeWidth : 0;
                shapePadding = legendOption.text ? legend.shapePadding : 0;
                if (legendOption.render && legendOption.text) {
                    render = true;
                    legendWidth = shapeWidth + shapePadding + (legend.maximumLabelWidth ? legend.maximumLabelWidth : legendOption.textSize.width) + padding;
                    rowWidth = rowWidth + legendWidth;
                    if (!legend.enablePages && !this.isVertical) {
                        titlePlusArrowSpace = this.isTitle && titlePosition !== 'Top' ? this.legendTitleSize.width + this.fivePixel : 0;
                        titlePlusArrowSpace += arrowWidth;
                    }
                    this.getLegendHeight(legendOption, legend, legendBounds, rowWidth, this.maxItemHeight, padding);
                    if (legendBounds.width < (padding + rowWidth + titlePlusArrowSpace) || this.isVertical) {
                        maximumWidth = Math.max(maximumWidth, (rowWidth + padding + titlePlusArrowSpace - (this.isVertical ? 0 : legendWidth)));
                        if (rowCount === 0 && (legendWidth !== rowWidth)) {
                            rowCount = 1;
                        }
                        rowWidth = this.isVertical ? 0 : legendWidth;
                        rowCount++;
                        columnCount = 0;
                        columnHeight = verticalArrowSpace;
                    }
                    var len = (rowCount > 0 ? (rowCount - 1) : 0);
                    this.rowHeights[len] = Math.max((this.rowHeights[len] ? this.rowHeights[len] : 0), legendOption.textSize.height);
                    this.columnHeights[columnCount] = (this.columnHeights[columnCount] ? this.columnHeights[columnCount] : 0) + legendOption.textSize.height + padding;
                    columnCount++;
                }
            }
            columnHeight = Math.max.apply(null, this.columnHeights) + padding + titleSpace;
            columnHeight = Math.max(columnHeight, (this.maxItemHeight + padding) + padding + titleSpace);
            this.isPaging = legendBounds.height < columnHeight;
            if (this.isPaging && !legend.enablePages) {
                if (this.isVertical) {
                    columnHeight = columnHeight;
                }
                else {
                    columnHeight = (this.maxItemHeight + padding) + padding + (titlePosition === 'Top' ? titleSpace : 0);
                }
            }
            this.totalPages = rowCount;
            if (!this.isPaging && !this.isVertical) {
                rowWidth += this.isTitle && titlePosition !== 'Top' ? (this.fivePixel + this.legendTitleSize.width + this.fivePixel) : 0;
            }
            if (render) {
                this.setBounds(Math.max((rowWidth + padding), maximumWidth), columnHeight, legend, legendBounds);
            }
            else {
                this.setBounds(0, 0, legend, legendBounds);
            }
        };
        Legend.prototype.getLegendHeight = function (legendOption, legend, legendBounds, rowWidth, legendHeight, padding) {
            var legendWidth = legendOption.textSize.width;
            var textPadding = legend.shapePadding + (padding * 2) + legend.shapeWidth;
            switch (legend.textWrap) {
                case 'Wrap':
                case 'AnyWhere':
                    if (legendWidth > legend.maximumLabelWidth || legendWidth + rowWidth > legendBounds.width) {
                        legendOption.textCollection = helper_3.textWrap(legendOption.text, (legend.maximumLabelWidth ? Math.min(legend.maximumLabelWidth, (legendBounds.width - textPadding)) : (legendBounds.width - textPadding)), legend.textStyle);
                    }
                    else {
                        legendOption.textCollection.push(legendOption.text);
                    }
                    legendOption.textSize.height = (legendHeight * legendOption.textCollection.length);
                    break;
            }
        };
        Legend.prototype.getRenderPoint = function (legendOption, start, textPadding, prevLegend, rect, count, firstLegend, rowCount) {
            var padding = this.legend.padding;
            var textWidth = textPadding + (this.legend.maximumLabelWidth ? this.legend.maximumLabelWidth : prevLegend.textSize.width);
            var previousBound = prevLegend.location.x + ((!this.isRtlEnable) ? textWidth : -textWidth);
            if (this.isWithinBounds(previousBound, (this.legend.maximumLabelWidth ? this.legend.maximumLabelWidth : legendOption.textSize.width) + textPadding, rect) || this.isVertical) {
                legendOption.location.x = start.x;
                if (count !== firstLegend)
                    this.chartRowCount++;
                legendOption.location.y = (count === firstLegend) ? prevLegend.location.y :
                    prevLegend.location.y + (this.isVertical ? prevLegend.textSize.height : this.rowHeights[(this.chartRowCount - 2)]) + padding;
            }
            else {
                legendOption.location.x = (count === firstLegend) ? prevLegend.location.x : previousBound;
                legendOption.location.y = prevLegend.location.y;
            }
            var availwidth = (!this.isRtlEnable) ? (this.legendBounds.x + this.legendBounds.width) - (legendOption.location.x +
                textPadding - this.legend.shapeWidth / 2) : (legendOption.location.x - textPadding + (this.legend.shapeWidth / 2)) - this.legendBounds.x;
            availwidth = this.legend.maximumLabelWidth ? Math.min(this.legend.maximumLabelWidth, availwidth) : availwidth;
            if (this.legend.textOverflow == "Ellipsis" && this.legend.textWrap == "Normal") {
                legendOption.text = helper_1.textTrim(+availwidth.toFixed(4), legendOption.text, this.legend.textStyle);
            }
        };
        Legend.prototype.isWithinBounds = function (previousBound, textWidth, rect) {
            if (!this.isRtlEnable) {
                return (previousBound + textWidth) > (rect.x + rect.width + (this.legend.shapeWidth / 2));
            }
            else {
                return (previousBound - textWidth) < (rect.x - (this.legend.shapeWidth / 2));
            }
        };
        Legend.prototype.LegendClick = function (index, event) {
            var chart = this.chart;
            var seriesIndex = chart.legendSettings.mode === 'Series' ? index : 0;
            var legendIndex = !this.isReverse ? index : (this.legendCollections.length - 1) - index;
            var series = chart.visibleSeries[seriesIndex];
            var legend = this.legendCollections[legendIndex];
            var changeDetection = 'isProtectedOnChange';
            if (chart.legendSettings.mode === 'Series') {
                var legendClickArgs = {
                    legendText: legend.text, legendShape: legend.shape,
                    chart: chart.isBlazor ? {} : chart, series: series, points: series.points, name: constants_1.legendClick, cancel: false
                };
                this.chart.trigger(constants_1.legendClick, legendClickArgs);
                series.legendShape = legendClickArgs.legendShape;
                if (series.fill !== null) {
                    chart.visibleSeries[index].interior = series.fill;
                }
                if (chart.legendSettings.toggleVisibility) {
                    if (series.category === 'TrendLine') {
                        if (!chart.series[series.sourceIndex].trendlines[series.index].visible) {
                            chart.series[series.sourceIndex].trendlines[series.index].visible = true;
                        }
                        else {
                            chart.series[series.sourceIndex].trendlines[series.index].visible = false;
                        }
                    }
                    else {
                        series.chart[changeDetection] = true;
                        this.changeSeriesVisiblity(series, series.visible);
                    }
                    legend.visible = series.category === 'TrendLine' ? chart.series[series.sourceIndex].trendlines[series.index].visible :
                        (series.visible);
                    this.refreshLegendToggle(chart, series);
                }
                else if (chart.highlightModule) {
                    chart.highlightModule.legendSelection(chart, index, event.target, event.type);
                }
                else if (chart.selectionModule) {
                    chart.selectionModule.legendSelection(chart, index, event.target, event.type);
                }
                series.chart[changeDetection] = false;
            }
            else if (chart.legendSettings.mode === 'Point') {
                var point = series.points[index];
                var legendClickArgs = {
                    legendText: legend.text, legendShape: legend.shape,
                    chart: chart.isBlazor ? {} : chart, series: series, points: [point], name: constants_1.legendClick, cancel: false
                };
                this.chart.trigger(constants_1.legendClick, legendClickArgs);
                if (chart.legendSettings.toggleVisibility) {
                    point.visible = !point.visible;
                    var legendOption = this.legendCollections[index];
                    legendOption.visible = point.visible;
                    this.refreshLegendToggle(chart, series);
                }
            }
            else if (chart.legendSettings.mode === 'Range') {
                var points = [];
                var legendOption = this.legendCollections[index];
                for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
                    var point = _a[_i];
                    if (legendOption.fill === (point.interior || series.interior)) {
                        points.push(point);
                    }
                }
                var legendClickArgs = {
                    legendText: legend.text, legendShape: legend.shape,
                    chart: chart.isBlazor ? {} : chart, series: series, points: points, name: constants_1.legendClick, cancel: false
                };
                this.chart.trigger(constants_1.legendClick, legendClickArgs);
                if (chart.legendSettings.toggleVisibility) {
                    legendOption.visible = !legendOption.visible;
                    for (var _b = 0, points_1 = points; _b < points_1.length; _b++) {
                        var point = points_1[_b];
                        point.visible = !point.visible;
                    }
                    this.refreshLegendToggle(chart, series);
                }
            }
        };
        Legend.prototype.refreshLegendToggle = function (chart, series) {
            var selectedDataIndexes = [];
            if (chart.selectionModule) {
                selectedDataIndexes = ej2_base_1.extend([], chart.selectionModule.selectedDataIndexes, null, true);
            }
            if ((chart.svgObject.childNodes.length > 0) && !chart.enableAnimation && !chart.enableCanvas) {
                while (chart.svgObject.lastChild) {
                    chart.svgObject.removeChild(chart.svgObject.lastChild);
                }
                ej2_base_1.remove(chart.svgObject);
            }
            chart.animateSeries = false;
            chart.redraw = chart.enableAnimation;
            chart.rotatedDataLabelCollections = [];
            helper_1.removeElement(ej2_svg_base_1.getElement(chart.element.id + '_Secondary_Element').querySelectorAll('.ejSVGTooltip')[0]);
            helper_1.blazorTemplatesReset(chart);
            this.redrawSeriesElements(series, chart);
            chart.removeSvg();
            chart.refreshAxis();
            series.refreshAxisLabel();
            this.refreshSeries(chart.visibleSeries);
            for (var _i = 0, _a = chart.visibleSeries; _i < _a.length; _i++) {
                var series_1 = _a[_i];
                if (!ej2_base_1.isNullOrUndefined(series_1)) {
                    chart.markerRender.removeHighlightedMarker(series_1, null, true);
                }
            }
            chart.refreshBound();
            chart.trigger('loaded', { chart: chart });
            if (selectedDataIndexes.length > 0) {
                chart.selectionModule.selectedDataIndexes = selectedDataIndexes;
                chart.selectionModule.redrawSelection(chart, chart.selectionMode);
            }
            if (chart.highlightModule && chart.highlightMode !== 'None') {
                chart.highlightModule.redrawSelection(chart, chart.highlightMode);
            }
            chart.redraw = false;
        };
        Legend.prototype.changeSeriesVisiblity = function (series, visibility) {
            series.visible = !visibility;
            if (this.isSecondaryAxis(series.xAxis)) {
                series.xAxis.internalVisibility = series.xAxis.series.some(function (value) { return (value.visible); });
            }
            if (this.isSecondaryAxis(series.yAxis)) {
                series.yAxis.internalVisibility = series.yAxis.series.some(function (value) { return (value.visible); });
            }
        };
        Legend.prototype.isSecondaryAxis = function (axis) {
            return (this.chart.axes.indexOf(axis) > -1);
        };
        Legend.prototype.redrawSeriesElements = function (series, chart) {
            if (!chart.redraw) {
                return null;
            }
            helper_1.removeElement(chart.element.id + '_Series_' + (series.index === undefined ? series.category : series.index) +
                '_DataLabelCollections');
        };
        Legend.prototype.refreshSeries = function (seriesCollection) {
            for (var _i = 0, seriesCollection_1 = seriesCollection; _i < seriesCollection_1.length; _i++) {
                var series = seriesCollection_1[_i];
                if (series.type.indexOf('Spline') > -1) {
                    var isArea = (series.type.indexOf('Area') > -1 || series.drawType.indexOf('Area') > -1);
                    var isRange = series.type.indexOf('Range') > -1;
                    this.chart['spline' + (isArea ? isRange ? 'RangeArea' : 'Area' : '') + 'SeriesModule'].findSplinePoint(series);
                }
                series.position = undefined;
            }
        };
        Legend.prototype.click = function (event) {
            var _this = this;
            if (!this.chart.legendSettings.visible) {
                return;
            }
            var pageX = this.chart.mouseX;
            var pageY = this.chart.mouseY;
            var legendRegion = [];
            var targetId = event.target.id.indexOf("_chart_legend_g_") > -1 ?
                event.target.firstChild['id'] : event.target.id;
            var legendItemsId = [this.legendID + '_text_', this.legendID + '_shape_marker_',
                this.legendID + '_shape_'];
            var seriesIndex;
            for (var _i = 0, legendItemsId_2 = legendItemsId; _i < legendItemsId_2.length; _i++) {
                var id = legendItemsId_2[_i];
                if (targetId.indexOf(id) > -1) {
                    seriesIndex = parseInt(targetId.split(id)[1], 10);
                    this.LegendClick(seriesIndex, event);
                    break;
                }
            }
            if (targetId.indexOf(this.legendID + '_pageup') > -1) {
                this.changePage(event, true);
            }
            else if (targetId.indexOf(this.legendID + '_pagedown') > -1) {
                this.changePage(event, false);
            }
            if (this.chart.enableCanvas && this.pagingRegions.length) {
                this.checkWithinBounds(pageX, pageY);
            }
            legendRegion = this.legendRegions.filter(function (region) {
                return (helper_1.withInBounds(pageX, (pageY + (_this.isPaging ? (_this.currentPageNumber - 1) * _this.translatePage(_this.chart.enableCanvas, null, 1, 2) : 0)), region.rect));
            });
            if (legendRegion.length && this.chart.enableCanvas) {
                this.LegendClick(legendRegion[0].index, event);
            }
        };
        Legend.prototype.checkWithinBounds = function (pageX, pageY) {
            var cRender = this.chart.renderer;
            var bounds = this.legendBounds;
            var borderWidth = this.chart.legendSettings.border.width;
            var canvasRect = new ej2_svg_base_1.Rect(bounds.x, bounds.y, bounds.width, bounds.height);
            canvasRect.x = canvasRect.x - borderWidth / 2;
            canvasRect.y = canvasRect.y - borderWidth / 2;
            canvasRect.width = canvasRect.width + borderWidth;
            canvasRect.height = canvasRect.height + borderWidth;
            if (helper_1.withInBounds(pageX, pageY, this.pagingRegions[0])) {
                if (!this.isRtlEnable) {
                    this.canvasPageDown(cRender, canvasRect, bounds);
                }
                else {
                    this.canvasPageUp(cRender, canvasRect, bounds);
                }
                return null;
            }
            if (helper_1.withInBounds(pageX, pageY, this.pagingRegions[1])) {
                if (!this.isRtlEnable) {
                    this.canvasPageUp(cRender, canvasRect, bounds);
                }
                else {
                    this.canvasPageDown(cRender, canvasRect, bounds);
                }
                return null;
            }
        };
        Legend.prototype.canvasPageDown = function (cRender, canvasRect, bounds) {
            if (--this.currentPageNumber > 0) {
                this.legendRegions = [];
                cRender.clearRect(canvasRect);
                cRender.canvasClip(new helper_1.RectOption('legendClipPath', 'transparent', { width: 0, color: '' }, null, canvasRect));
                this.renderLegend(this.chart, this.legend, bounds);
                cRender.canvasRestore();
            }
            else {
                ++this.currentPageNumber;
            }
        };
        Legend.prototype.canvasPageUp = function (cRender, canvasRect, bounds) {
            if (++this.currentPageNumber > 0 && this.currentPageNumber <= this.totalNoOfPages) {
                this.legendRegions = [];
                cRender.clearRect(canvasRect);
                cRender.canvasClip(new helper_1.RectOption('legendClipPath', 'transpaent', { width: 0, color: '' }, null, canvasRect));
                this.renderLegend(this.chart, this.legend, bounds);
                cRender.canvasRestore();
            }
            else {
                --this.currentPageNumber;
            }
        };
        Legend.prototype.getModuleName = function () {
            return 'Legend';
        };
        Legend.prototype.destroy = function () {
            this.removeEventListener();
        };
        return Legend;
    }(legend_1.BaseLegend));
    exports.Legend = Legend;
});
