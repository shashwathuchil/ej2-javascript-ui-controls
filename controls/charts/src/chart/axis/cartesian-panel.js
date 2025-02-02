define(["require", "exports", "@syncfusion/ej2-base", "@syncfusion/ej2-data", "../../common/utils/helper", "../../common/utils/helper", "../../common/utils/helper", "@syncfusion/ej2-svg-base", "../../common/utils/helper"], function (require, exports, ej2_base_1, ej2_data_1, helper_1, helper_2, helper_3, ej2_svg_base_1, helper_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var axisPadding = 10;
    var CartesianAxisLayoutPanel = (function () {
        function CartesianAxisLayoutPanel(chartModule) {
            this.chart = chartModule;
            this.padding = 5;
        }
        CartesianAxisLayoutPanel.prototype.measureAxis = function (rect) {
            var chart = this.chart;
            var chartAreaWidth = chart.chartArea.width ? helper_2.stringToNumber(chart.chartArea.width, chart.availableSize.width) : null;
            this.crossAt(chart);
            this.seriesClipRect = new ej2_svg_base_1.Rect(rect.x, rect.y, rect.width, rect.height);
            this.initialClipRect = rect;
            this.leftSize = 0;
            this.rightSize = 0;
            this.topSize = 0;
            this.bottomSize = 0;
            this.measureRowAxis(chart, this.initialClipRect);
            this.initialClipRect = helper_1.subtractThickness(this.initialClipRect, new helper_3.Thickness(this.leftSize, this.rightSize, 0, 0));
            this.measureColumnAxis(chart, this.initialClipRect);
            this.initialClipRect = helper_1.subtractThickness(this.initialClipRect, new helper_3.Thickness(0, 0, this.topSize, this.bottomSize));
            if (!this.chart.delayRedraw) {
                this.calculateAxisSize(this.initialClipRect);
            }
            this.leftSize = 0;
            this.rightSize = 0;
            this.topSize = 0;
            this.bottomSize = 0;
            this.measureRowAxis(chart, this.initialClipRect);
            this.seriesClipRect = helper_1.subtractThickness(this.seriesClipRect, new helper_3.Thickness(this.leftSize, this.rightSize, 0, 0));
            this.measureColumnAxis(chart, this.initialClipRect);
            this.seriesClipRect = helper_1.subtractThickness(this.seriesClipRect, new helper_3.Thickness(0, 0, this.topSize, this.bottomSize));
            if (chartAreaWidth) {
                this.calculateFixedChartArea(chart, chartAreaWidth);
            }
            if (!this.chart.delayRedraw) {
                chart.refreshAxis();
                this.calculateAxisSize(this.seriesClipRect);
            }
        };
        CartesianAxisLayoutPanel.prototype.calculateFixedChartArea = function (chart, chartAreaWidth) {
            this.seriesClipRect.width = chartAreaWidth;
            this.seriesClipRect.x = chart.availableSize.width - chart.margin.right - chartAreaWidth -
                (chart.legendSettings.position === "Right" ? chart.legendModule.legendBounds.width : 0);
            for (var _i = 0, _a = chart.rows; _i < _a.length; _i++) {
                var item = _a[_i];
                this.seriesClipRect.x -= helper_1.sum(item.farSizes);
            }
        };
        CartesianAxisLayoutPanel.prototype.measureRowAxis = function (chart, rect) {
            var row;
            this.calculateRowSize(rect);
            for (var _i = 0, _a = chart.rows; _i < _a.length; _i++) {
                var item = _a[_i];
                row = item;
                row.nearSizes = [];
                row.farSizes = [];
                this.arrangeAxis(row);
                this.measureDefinition(row, chart, new ej2_svg_base_1.Size(chart.availableSize.width, row.computedHeight));
                if (this.leftSize < helper_1.sum(row.nearSizes)) {
                    this.leftSize = helper_1.sum(row.nearSizes);
                }
                if (this.rightSize < helper_1.sum(row.farSizes)) {
                    this.rightSize = helper_1.sum(row.farSizes);
                }
            }
        };
        CartesianAxisLayoutPanel.prototype.measureColumnAxis = function (chart, rect) {
            var column;
            this.calculateColumnSize(rect);
            for (var _i = 0, _a = chart.columns; _i < _a.length; _i++) {
                var item = _a[_i];
                column = item;
                column.farSizes = [];
                column.nearSizes = [];
                this.arrangeAxis(column);
                this.measureDefinition(column, chart, new ej2_svg_base_1.Size(column.computedWidth, chart.availableSize.height));
                if (this.bottomSize < helper_1.sum(column.nearSizes)) {
                    this.bottomSize = helper_1.sum(column.nearSizes);
                }
                if (this.topSize < helper_1.sum(column.farSizes)) {
                    this.topSize = helper_1.sum(column.farSizes);
                }
            }
        };
        CartesianAxisLayoutPanel.prototype.measureDefinition = function (definition, chart, size) {
            var ele = 16;
            for (var _i = 0, _a = definition.axes; _i < _a.length; _i++) {
                var axis = _a[_i];
                axis.scrollBarHeight = chart.scrollBarModule && chart.zoomModule && chart.zoomSettings.enableScrollbar &&
                    axis.enableScrollbarOnZooming && chart.zoomModule.isZoomed && (axis.zoomFactor < 1 || axis.zoomPosition > 0) ? ele : 0;
                axis.scrollBarHeight = chart.scrollBarModule && (chart.zoomModule && chart.zoomSettings.enableScrollbar &&
                    axis.enableScrollbarOnZooming && chart.zoomModule.isZoomed && (axis.zoomFactor < 1 || axis.zoomPosition > 0)
                    || axis.scrollbarSettings.enable) ? ele : 0;
                axis.getModule(chart);
                axis.baseModule.calculateRangeAndInterval(size, axis);
                definition.computeSize(axis, axis.scrollBarHeight);
            }
            if (definition.farSizes.length > 0) {
                definition.farSizes[definition.farSizes.length - 1] -= axisPadding;
            }
            if (definition.nearSizes.length > 0) {
                definition.nearSizes[definition.nearSizes.length - 1] -= axisPadding;
            }
        };
        CartesianAxisLayoutPanel.prototype.calculateAxisSize = function (rect) {
            var chart = this.chart;
            var row;
            var column;
            var definition;
            var axis;
            var nearCount = 0;
            var farCount = 0;
            var size = 0;
            var x;
            var y;
            var axisOffset;
            this.calculateRowSize(rect);
            for (var i = 0, len = chart.rows.length; i < len; i++) {
                row = chart.rows[i];
                nearCount = 0;
                farCount = 0;
                for (var j = 0, len_1 = row.axes.length; j < len_1; j++) {
                    axis = row.axes[j];
                    axisOffset = axis.plotOffset;
                    if (axis.rect.height === 0) {
                        axis.rect.height = row.computedHeight;
                        size = 0;
                        for (var k = i + 1, len_2 = i + axis.span; k < len_2; k++) {
                            definition = chart.rows[k];
                            size += definition.computedHeight;
                        }
                        axis.rect.y = (row.computedTop - size) + (axis.plotOffsetTop ? axis.plotOffsetTop : axisOffset);
                        axis.rect.height = (axis.rect.height + size) -
                            (this.getAxisOffsetValue(axis.plotOffsetTop, axis.plotOffsetBottom, axis.plotOffset));
                        axis.rect.width = 0;
                    }
                    if (axis.isAxisOpposedPosition) {
                        x = rect.x + rect.width + helper_1.sum(helper_2.subArray(row.farSizes, farCount));
                        axis.rect.x = axis.rect.x >= x ? axis.rect.x : x;
                        farCount++;
                    }
                    else {
                        x = rect.x - helper_1.sum(helper_2.subArray(row.nearSizes, nearCount));
                        axis.rect.x = axis.rect.x <= x ? axis.rect.x : x;
                        nearCount++;
                    }
                }
            }
            this.calculateColumnSize(rect);
            for (var i = 0, len = chart.columns.length; i < len; i++) {
                column = chart.columns[i];
                nearCount = 0;
                farCount = 0;
                for (var j = 0, len_3 = column.axes.length; j < len_3; j++) {
                    axis = column.axes[j];
                    axisOffset = axis.plotOffset;
                    if (axis.rect.width === 0) {
                        for (var k = i, len_4 = (i + axis.span); k < len_4; k++) {
                            definition = chart.columns[k];
                            axis.rect.width += definition.computedWidth;
                        }
                        axis.rect.x = column.computedLeft + (axis.plotOffsetLeft ? axis.plotOffsetLeft : axisOffset);
                        axis.rect.width -= (this.getAxisOffsetValue(axis.plotOffsetLeft, axis.plotOffsetRight, axis.plotOffset));
                        axis.rect.height = 0;
                    }
                    if (axis.isAxisOpposedPosition) {
                        y = rect.y - helper_1.sum(helper_2.subArray(column.farSizes, farCount));
                        axis.rect.y = axis.rect.y <= y ? axis.rect.y : y;
                        farCount++;
                    }
                    else {
                        y = rect.y + rect.height + helper_1.sum(helper_2.subArray(column.nearSizes, nearCount));
                        axis.rect.y = axis.rect.y >= y ? axis.rect.y : y;
                        nearCount++;
                    }
                }
            }
        };
        CartesianAxisLayoutPanel.prototype.measure = function () {
            var chart = this.chart;
            var row;
            var column;
            var definition;
            var actualIndex;
            var span;
            for (var _i = 0, _a = chart.axisCollections; _i < _a.length; _i++) {
                var axis = _a[_i];
                if (axis.orientation === 'Vertical') {
                    chart.verticalAxes.push(axis);
                    actualIndex = this.getActualRow(axis);
                    row = chart.rows[actualIndex];
                    this.pushAxis(row, axis);
                    span = ((actualIndex + axis.span) > chart.rows.length ? chart.rows.length : (actualIndex + axis.span));
                    for (var j = actualIndex + 1; j < span; j++) {
                        definition = chart.rows[j];
                        definition.axes[row.axes.length - 1] = axis;
                        chart.rows[j] = definition;
                    }
                    chart.rows[actualIndex] = row;
                }
                else {
                    chart.horizontalAxes.push(axis);
                    actualIndex = this.getActualColumn(axis);
                    column = chart.columns[actualIndex];
                    this.pushAxis(column, axis);
                    span = ((actualIndex + axis.span) > chart.columns.length ? chart.columns.length : (actualIndex + axis.span));
                    for (var j = actualIndex + 1; j < span; j++) {
                        definition = chart.columns[j];
                        definition.axes[column.axes.length - 1] = axis;
                        chart.columns[j] = definition;
                    }
                    chart.columns[actualIndex] = column;
                }
                axis.isRTLEnabled = chart.enableRtl;
                axis.setIsInversedAndOpposedPosition();
            }
        };
        CartesianAxisLayoutPanel.prototype.getAxisOffsetValue = function (position1, position2, plotOffset) {
            var rangeOffset = position1 ? (position1 + (position2 ? position2 :
                plotOffset)) : (position2 ? position2 + plotOffset : 2 * plotOffset);
            return rangeOffset;
        };
        CartesianAxisLayoutPanel.prototype.crossAt = function (chart) {
            for (var _i = 0, _a = chart.axisCollections; _i < _a.length; _i++) {
                var axis = _a[_i];
                if (axis.crossesAt === null) {
                    continue;
                }
                if (!axis.crossesInAxis) {
                    if (chart.requireInvertedAxis) {
                        axis.crossInAxis = ((axis.orientation === 'Horizontal')) ? chart.primaryXAxis : chart.primaryYAxis;
                    }
                    else {
                        axis.crossInAxis = ((axis.orientation === 'Horizontal')) ? chart.primaryYAxis : chart.primaryXAxis;
                    }
                    axis.crossAt = this.updateCrossAt(axis.crossInAxis, axis.crossesAt);
                    continue;
                }
                else {
                    for (var i = 2, len = chart.axisCollections.length; i < len; i++) {
                        if (axis.crossesInAxis === chart.axisCollections[i].name) {
                            axis.crossInAxis = chart.axisCollections[i];
                            axis.crossAt = this.updateCrossAt(axis.crossInAxis, axis.crossesAt);
                            continue;
                        }
                    }
                }
            }
        };
        CartesianAxisLayoutPanel.prototype.updateCrossAt = function (axis, crossAt) {
            switch (axis.valueType) {
                case 'DateTime':
                    var option = {
                        skeleton: 'full',
                        type: 'dateTime'
                    };
                    var dateParser = this.chart.intl.getDateParser(option);
                    var dateFormatter = this.chart.intl.getDateFormat(option);
                    return Date.parse(dateParser(dateFormatter(new Date(ej2_data_1.DataUtil.parse.parseJson({ val: crossAt }).val))));
                case 'Category':
                    return parseFloat(crossAt) ? parseFloat(crossAt) : axis.labels.indexOf(crossAt);
                case 'Logarithmic':
                    return helper_3.logBase(crossAt, axis.logBase);
                default:
                    return crossAt;
            }
        };
        CartesianAxisLayoutPanel.prototype.pushAxis = function (definition, axis) {
            for (var i = 0, len = definition.axes.length; i <= len; i++) {
                if (!definition.axes[i]) {
                    definition.axes[i] = axis;
                    break;
                }
            }
        };
        CartesianAxisLayoutPanel.prototype.arrangeAxis = function (definition) {
            var axisCollection = [];
            for (var i = 0, len = definition.axes.length; i <= len; i++) {
                if (definition.axes[i]) {
                    axisCollection.push(definition.axes[i]);
                }
            }
            definition.axes = axisCollection;
        };
        CartesianAxisLayoutPanel.prototype.getActualColumn = function (axis) {
            var actualLength = this.chart.columns.length;
            var pos = axis.columnIndex;
            var result = pos >= actualLength ? actualLength - 1 : (pos < 0 ? 0 : pos);
            return result;
        };
        CartesianAxisLayoutPanel.prototype.getActualRow = function (axis) {
            var actualLength = this.chart.rows.length;
            var pos = axis.rowIndex;
            var result = pos >= actualLength ? actualLength - 1 : (pos < 0 ? 0 : pos);
            return result;
        };
        CartesianAxisLayoutPanel.prototype.calculateRowSize = function (rect) {
            var chart = this.chart;
            var row;
            var rowTop = rect.y + rect.height;
            var height = 0;
            var remainingHeight = Math.max(0, rect.height);
            for (var i = 0, len = chart.rows.length; i < len; i++) {
                row = chart.rows[i];
                if (row.height.indexOf('%') !== -1) {
                    height = Math.min(remainingHeight, (rect.height * parseInt(row.height, 10) / 100));
                }
                else {
                    height = Math.min(remainingHeight, parseInt(row.height, 10));
                }
                height = (i !== (len - 1)) ? height : remainingHeight;
                row.computedHeight = height;
                rowTop -= height;
                row.computedTop = rowTop;
                remainingHeight -= height;
            }
        };
        CartesianAxisLayoutPanel.prototype.calculateColumnSize = function (rect) {
            var chart = this.chart;
            var column;
            var columnLeft = rect.x;
            var width = 0;
            var remainingWidth = Math.max(0, rect.width);
            for (var i = 0, len = chart.columns.length; i < len; i++) {
                column = chart.columns[i];
                if (column.width.indexOf('%') !== -1) {
                    width = Math.min(remainingWidth, (rect.width * parseInt(column.width, 10) / 100));
                }
                else {
                    width = Math.min(remainingWidth, parseInt(column.width, 10));
                }
                width = (i !== (len - 1)) ? width : remainingWidth;
                column.computedWidth = width;
                column.computedLeft = columnLeft;
                columnLeft += width;
                remainingWidth -= width;
            }
        };
        CartesianAxisLayoutPanel.prototype.renderAxes = function () {
            var chart = this.chart;
            var axis;
            var axisElement = chart.renderer.createGroup({ id: chart.element.id + 'AxisInsideCollection' });
            var axisLineElement = chart.renderer.createGroup({ id: chart.element.id + 'AxisOutsideCollection' });
            var outsideElement;
            var isInside;
            for (var i = 0, len = chart.axisCollections.length; i < len; i++) {
                var axisVisibility = true;
                axis = chart.axisCollections[i];
                this.element = chart.renderer.createGroup({ id: chart.element.id + 'AxisGroup' + i + 'Inside' });
                outsideElement = chart.renderer.createGroup({ id: chart.element.id + 'AxisGroup' + i + 'Outside' });
                for (var _i = 0, _a = this.chart.series; _i < _a.length; _i++) {
                    var series = _a[_i];
                    if (axis.name === series.yAxisName || axis.name === series.xAxisName) {
                        axisVisibility = series.visible;
                        if (axisVisibility) {
                            break;
                        }
                        else {
                            continue;
                        }
                    }
                }
                if (!axisVisibility) {
                    break;
                }
                isInside = this.findAxisPosition(axis);
                if (axis.orientation === 'Horizontal') {
                    axis.updateCrossValue();
                    if (axis.visible && axis.internalVisibility && axis.lineStyle.width > 0) {
                        this.drawAxisLine(axis, i, axis.plotOffset, 0, 0, 0, axis.plotOffsetLeft, axis.plotOffsetRight, isInside ? outsideElement : this.element, axis.updatedRect);
                    }
                    if (axis.majorGridLines.width > 0 || axis.majorTickLines.width > 0) {
                        this.drawXAxisGridLine(axis, i, (isInside || axis.tickPosition === 'Inside') ? outsideElement : this.element, axis.updatedRect);
                    }
                    if (axis.visible && axis.internalVisibility) {
                        this.drawXAxisLabels(axis, i, (isInside || axis.labelPosition === 'Inside') ? outsideElement : this.element, (axis.placeNextToAxisLine ? axis.updatedRect : axis.rect));
                        this.drawXAxisBorder(axis, i, (isInside || axis.labelPosition === 'Inside') ? outsideElement : this.element, (axis.placeNextToAxisLine ? axis.updatedRect : axis.rect));
                        this.drawXAxisTitle(axis, i, isInside ? outsideElement : this.element, (axis.placeNextToAxisLine ? axis.updatedRect : axis.rect));
                    }
                }
                else {
                    axis.updateCrossValue();
                    if (axis.visible && axis.internalVisibility && axis.lineStyle.width > 0) {
                        this.drawAxisLine(axis, i, 0, axis.plotOffset, axis.plotOffsetBottom, axis.plotOffsetTop, 0, 0, isInside ? outsideElement : this.element, axis.updatedRect);
                    }
                    if (axis.majorGridLines.width > 0 || axis.majorTickLines.width > 0) {
                        this.drawYAxisGridLine(axis, i, (isInside || axis.tickPosition === 'Inside') ? outsideElement : this.element, axis.updatedRect);
                    }
                    if (axis.visible && axis.internalVisibility) {
                        this.drawYAxisLabels(axis, i, (isInside || axis.labelPosition === 'Inside') ? outsideElement : this.element, (axis.placeNextToAxisLine ? axis.updatedRect : axis.rect));
                        this.drawYAxisBorder(axis, i, (isInside || axis.labelPosition === 'Inside') ? outsideElement : this.element, (axis.placeNextToAxisLine ? axis.updatedRect : axis.rect));
                        this.drawYAxisTitle(axis, i, isInside ? outsideElement : this.element, (axis.placeNextToAxisLine ? axis.updatedRect : axis.rect));
                    }
                }
                if (!this.chart.enableCanvas) {
                    axisElement.appendChild(this.element);
                    if (outsideElement && outsideElement.childNodes.length > 0) {
                        axisLineElement.appendChild(outsideElement);
                    }
                }
                if (chart.scrollBarModule && ((chart.zoomSettings.enableScrollbar && axis.enableScrollbarOnZooming) ||
                    axis.scrollbarSettings.enable)) {
                    this.renderScrollbar(chart, axis);
                }
            }
            this.element = chart.renderer.createGroup({ id: chart.element.id + 'DefinitionLine' });
            for (var j = 0, len = chart.rows.length; j < len; j++) {
                var row = chart.rows[j];
                if (row.border.color) {
                    this.drawBottomLine(row, j, true);
                }
            }
            for (var j = 0, len = chart.columns.length; j < len; j++) {
                var column = chart.columns[j];
                if (column.border.color) {
                    this.drawBottomLine(column, j, false);
                }
            }
            if (!this.chart.enableCanvas) {
                axisElement.appendChild(this.element);
            }
            helper_2.appendChildElement(chart.enableCanvas, chart.svgObject, axisElement, chart.redraw);
            return axisLineElement;
        };
        CartesianAxisLayoutPanel.prototype.renderScrollbar = function (chart, axis) {
            var isZoomed = ej2_base_1.isNullOrUndefined(chart.zoomModule) ? false : chart.zoomModule.isZoomed;
            if (((isZoomed && (axis.zoomFactor < 1 || axis.zoomPosition > 0)) || (axis.scrollbarSettings.enable &&
                (axis.zoomFactor <= 1 || axis.zoomPosition >= 0))) &&
                (!axis.zoomingScrollBar.isScrollUI || chart.visibleSeries[0].type.indexOf('Bar') >= 0)) {
                if (!chart.scrollElement) {
                    chart.scrollElement = helper_1.redrawElement(chart.redraw, chart.element.id + '_scrollElement') || ej2_base_1.createElement('div', { id: chart.element.id + '_scrollElement' });
                }
                helper_2.appendChildElement(false, chart.scrollElement, axis.zoomingScrollBar.render(true), true);
            }
            else if (axis.zoomFactor === 1 && axis.zoomPosition === 0 && axis.zoomingScrollBar.svgObject && !axis.scrollbarSettings.enable) {
                axis.zoomingScrollBar.destroy();
            }
            if (axis.zoomingScrollBar.isScrollUI) {
                axis.zoomingScrollBar.isScrollUI = false;
            }
        };
        CartesianAxisLayoutPanel.prototype.findAxisPosition = function (axis) {
            return axis.crossAt !== null && axis.isInside(axis.crossInAxis.visibleRange);
        };
        CartesianAxisLayoutPanel.prototype.drawBottomLine = function (definition, index, isRow) {
            var chart = this.chart;
            var optionsLine = {};
            var x1;
            var x2;
            var y1;
            var y2;
            var definitionName;
            if (isRow) {
                definition = definition;
                y1 = y2 = definition.computedTop + definition.computedHeight;
                x1 = this.seriesClipRect.x;
                x2 = x1 + this.seriesClipRect.width;
                definitionName = 'Row';
            }
            else {
                definition = definition;
                x1 = x2 = definition.computedLeft;
                y1 = this.seriesClipRect.y;
                y2 = y1 + this.seriesClipRect.height;
                definitionName = 'Column';
            }
            optionsLine = {
                'id': chart.element.id + '_AxisBottom_' + definitionName + index,
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2,
                'stroke-width': definition.border.width,
                'stroke': definition.border.color
            };
            this.htmlObject = chart.renderer.drawLine(optionsLine);
            this.element.appendChild(this.htmlObject);
        };
        CartesianAxisLayoutPanel.prototype.drawAxisLine = function (axis, index, plotX, plotY, plotBottom, plotTop, plotLeft, plotRight, parent, rect) {
            var chart = this.chart;
            var optionsLine = {};
            var element = helper_3.getElement(chart.element.id + 'AxisLine_' + index);
            var direction = element ? element.getAttribute('d') : '';
            element = null;
            optionsLine = {
                'id': chart.element.id + 'AxisLine_' + index,
                'd': 'M ' + (rect.x - plotX - plotLeft) + ' ' + (rect.y - plotY - plotTop) +
                    ' L ' + (rect.x + rect.width + plotX + plotRight) + ' ' + (rect.y + rect.height + plotY + plotBottom),
                'stroke-dasharray': axis.lineStyle.dashArray,
                'stroke-width': axis.lineStyle.width,
                'stroke': axis.lineStyle.color || chart.themeStyle.axisLine
            };
            this.htmlObject = chart.renderer.drawPath(optionsLine);
            helper_2.appendChildElement(chart.enableCanvas, parent, this.htmlObject, chart.redraw, true, 'x', 'y', null, direction);
        };
        CartesianAxisLayoutPanel.prototype.drawYAxisGridLine = function (axis, index, parent, rect) {
            var isLogAxis = axis.valueType === 'Logarithmic';
            var isCategoryAxis = axis.valueType.indexOf('Category') > -1;
            var tempInterval;
            var pointY = 0;
            var majorGrid = '';
            var majorTick = '';
            var minorGridDirection;
            var isOpposed = axis.isAxisOpposedPosition;
            var tickSize = isOpposed ? axis.majorTickLines.height : -axis.majorTickLines.height;
            var axisLineSize = (isOpposed) ? axis.lineStyle.width * 0.5 : -axis.lineStyle.width * 0.5;
            var ticksbwtLabel = (axis.valueType === 'Category' && axis.labelPlacement === 'BetweenTicks') ?
                0.5 : 0;
            var scrollBarHeight = ej2_base_1.isNullOrUndefined(axis.crossesAt) ? isOpposed ? axis.scrollBarHeight :
                -axis.scrollBarHeight : 0;
            var isTickInside = axis.tickPosition === 'Inside';
            var ticks = isTickInside ? (rect.x - tickSize - axisLineSize) : (rect.x + tickSize + axisLineSize + scrollBarHeight);
            var length = axis.visibleLabels.length;
            var chartThemeStyle = this.chart.themeStyle;
            if (axis.valueType.indexOf('Category') > -1 && axis.labelPlacement === 'BetweenTicks' && length > 0) {
                length += 1;
            }
            var minorGridLines = axis.minorGridLines;
            var minorTickLines = axis.minorTickLines;
            for (var i = 0; i < length; i++) {
                tempInterval = !axis.visibleLabels[i] ? (axis.visibleLabels[i - 1].value + axis.visibleRange.interval) - ticksbwtLabel
                    : axis.visibleLabels[i].value - ticksbwtLabel;
                pointY = helper_1.valueToCoefficient(tempInterval, axis) * rect.height;
                pointY = (pointY * -1) + (rect.y + rect.height);
                if (pointY >= rect.y && (rect.y + rect.height) >= pointY) {
                    if ((helper_2.inside(tempInterval, axis.visibleRange)) || this.isBorder(axis, i, pointY)) {
                        majorGrid = 'M ' + this.seriesClipRect.x + ' ' + (pointY) +
                            ' L ' + (this.seriesClipRect.x + this.seriesClipRect.width) + ' ' + pointY;
                        this.renderGridLine(axis, index, majorGrid, axis.majorGridLines, '_MajorGridLine_', i, this.element, chartThemeStyle.majorGridLine, axis.majorGridLines.dashArray);
                    }
                    majorTick = 'M ' + (rect.x + axisLineSize + (isTickInside ? scrollBarHeight : 0)) + ' ' + pointY +
                        ' L ' + (ticks) + ' ' + pointY;
                    this.renderGridLine(axis, index, majorTick, axis.majorTickLines, '_MajorTickLine_', i, parent, chartThemeStyle.majorTickLine);
                    if ((minorGridLines.width > 0 || minorTickLines.width > 0) && axis.minorTicksPerInterval > 0) {
                        if (i === 0 && helper_4.isZoomSet(axis) && !isLogAxis && !isCategoryAxis) {
                            this.renderMinorGridOnZooming(axis, tempInterval, rect, i, index, chartThemeStyle, parent);
                        }
                        minorGridDirection = this.drawAxisMinorLine(axis, tempInterval, rect, i);
                        this.renderGridLine(axis, index, minorGridDirection[0], minorGridLines, '_MinorGridLine_', i, this.element, chartThemeStyle.minorGridLine, minorGridLines.dashArray);
                        this.renderGridLine(axis, index, minorGridDirection[1], minorTickLines, '_MinorTickLine_', i, parent, chartThemeStyle.minorTickLine);
                        if (i === length - 1 && helper_4.isZoomSet(axis) && isLogAxis && !isCategoryAxis) {
                            this.renderMinorGridOnZooming(axis, (tempInterval + axis.visibleRange.interval), rect, i, index, chartThemeStyle, parent);
                        }
                    }
                }
            }
        };
        CartesianAxisLayoutPanel.prototype.isBorder = function (axis, index, value) {
            var border = this.chart.chartArea.border;
            var rect = this.seriesClipRect;
            var orientation = axis.orientation;
            var start = (orientation === 'Horizontal') ? rect.x : rect.y;
            var size = (orientation === 'Horizontal') ? rect.width : rect.height;
            var startIndex = (orientation === 'Horizontal') ? 0 : axis.visibleLabels.length - 1;
            var endIndex = (orientation === 'Horizontal') ? axis.visibleLabels.length - 1 : 0;
            if (axis.plotOffset > 0) {
                return true;
            }
            else if ((value === start || value === (start + size)) && (border.width <= 0 || border.color === 'transparent')) {
                return true;
            }
            else if ((value !== start && index === startIndex) || (value !== (start + size) && index === endIndex)) {
                return true;
            }
            return false;
        };
        CartesianAxisLayoutPanel.prototype.drawYAxisLabels = function (axis, index, parent, rect) {
            var chart = this.chart;
            var label;
            var pointX = 0;
            var pointY = 0;
            var elementSize;
            var labelSpace = axis.labelPadding;
            var options;
            var isAxisBreakLabel;
            var isLabelInside = axis.labelPosition === 'Inside';
            var isOpposed = axis.isAxisOpposedPosition;
            var tickSpace = axis.labelPosition === axis.tickPosition ? axis.majorTickLines.height : 0;
            var padding = tickSpace + labelSpace + axis.lineStyle.width * 0.5;
            var angle = axis.angle % 360;
            var isVerticalAngle = (angle === -90 || angle === 90 || angle === 270 || angle === -270);
            padding += (isVerticalAngle) ? (isLabelInside ? 5 : -5) : 0;
            padding = (isOpposed) ? padding : -padding;
            var labelElement = chart.renderer.createGroup({ id: chart.element.id + 'AxisLabels' + index });
            var scrollBarHeight = ej2_base_1.isNullOrUndefined(axis.crossesAt) ? axis.scrollBarHeight * (isOpposed ? 1 : -1) : 0;
            var textHeight;
            var textPadding;
            var maxLineWidth;
            var pixel = 10;
            var isInverse = axis.isAxisInverse;
            var previousEnd = isInverse ? rect.y : (rect.y + rect.height);
            var labelPadding;
            var intervalLength;
            var labelHeight;
            var yAxisLabelX;
            var isLabelOnAxisLineLeft = ((!isOpposed && !isLabelInside) || (isOpposed && isLabelInside));
            if (isLabelInside) {
                labelPadding = !isLabelOnAxisLineLeft ? -padding : padding;
            }
            else {
                labelPadding = !isLabelOnAxisLineLeft ? -padding + scrollBarHeight : padding + scrollBarHeight;
            }
            var sizeWidth = [];
            var breakLabelSizeWidth = [];
            axis.visibleLabels.map(function (item) {
                sizeWidth.push(item.size['width']);
                breakLabelSizeWidth.push(item.breakLabelSize['width']);
            });
            var LabelMaxWidth = Math.max.apply(Math, sizeWidth);
            var breakLabelMaxWidth = Math.max.apply(Math, breakLabelSizeWidth);
            for (var i = 0, len = axis.visibleLabels.length; i < len; i++) {
                label = axis.visibleLabels[i];
                isAxisBreakLabel = helper_1.isBreakLabel(axis.visibleLabels[i].originalText);
                elementSize = isAxisBreakLabel ? axis.visibleLabels[i].breakLabelSize : axis.visibleLabels[i].size;
                pointY = (helper_1.valueToCoefficient(axis.visibleLabels[i].value, axis) * rect.height) + (chart.stockChart ? 7 : 0);
                pointY = Math.floor((pointY * -1) + (rect.y + rect.height));
                textHeight = ((elementSize.height / 8) * axis.visibleLabels[i].text.length / 2);
                textPadding = ((elementSize.height / 4) * 3) + 3;
                intervalLength = rect.height / axis.visibleLabels.length;
                labelHeight = ((axis.labelIntersectAction === 'Trim' || axis.labelIntersectAction === 'Wrap') && angle !== 0 &&
                    elementSize.width > intervalLength) ? intervalLength : elementSize.width;
                pointY = (isAxisBreakLabel ? (axis.labelPosition === 'Inside' ? (pointY - (elementSize.height / 2) - textHeight + textPadding)
                    : (pointY - textHeight)) : (axis.labelPosition === 'Inside' ? pointY + textPadding : pointY));
                if (axis.majorGridLines.width > axis.majorTickLines.width) {
                    maxLineWidth = axis.majorGridLines.width;
                }
                else {
                    maxLineWidth = axis.majorTickLines.width;
                }
                if (axis.labelStyle.textAlignment === 'Far') {
                    pointY = pointY - maxLineWidth - pixel;
                }
                else if (axis.labelStyle.textAlignment === 'Near') {
                    pointY = pointY + maxLineWidth + pixel;
                }
                else if (axis.labelStyle.textAlignment === 'Center') {
                    pointY = pointY;
                }
                if (isLabelInside) {
                    yAxisLabelX = labelPadding + ((angle === 0 ? elementSize.width : (isAxisBreakLabel ? breakLabelMaxWidth : LabelMaxWidth)) / 2);
                }
                else {
                    yAxisLabelX = labelPadding - ((angle === 0 ? elementSize.width : (isAxisBreakLabel ? breakLabelMaxWidth : LabelMaxWidth)) / 2);
                }
                pointX = isOpposed ? (rect.x - yAxisLabelX) : (rect.x + yAxisLabelX);
                if (isVerticalAngle) {
                    pointX += (isOpposed) ? -10 : 10;
                }
                yAxisLabelX = labelPadding;
                options = new ej2_svg_base_1.TextOption(chart.element.id + index + '_AxisLabel_' + i, pointX, pointY, 'middle', label.text, '', 'middle');
                switch (axis.edgeLabelPlacement) {
                    case 'None':
                        break;
                    case 'Hide':
                        if (((i === 0 || (isInverse && i === len - 1)) && options.y > rect.y) ||
                            (((i === len - 1) || (isInverse && i === 0)) && options.y - elementSize.height * 0.5 < rect.y)) {
                            options.text = '';
                        }
                        break;
                    case 'Shift':
                        if ((i === 0 || (isInverse && i === len - 1)) && options.y > rect.y) {
                            options.y = pointY = rect.y + rect.height;
                        }
                        else if (((i === len - 1) || (isInverse && i === 0)) && (options.y - elementSize.height * 0.5 < rect.y)) {
                            options.y = pointY = rect.y + elementSize.height * 0.5;
                        }
                        break;
                }
                var previousYValue = options.y;
                var currentYValue = options.y - labelHeight;
                if (isAxisBreakLabel) {
                    previousYValue = (options.y - (labelHeight / 2));
                    currentYValue = options.y + (labelHeight / 2);
                }
                if ((angle === 90 || angle === 270) && axis.labelIntersectAction === 'Hide' && i !== 0 &&
                    (!isInverse ? previousYValue >= previousEnd : currentYValue <= previousEnd)) {
                    continue;
                }
                previousEnd = isInverse ? previousYValue : currentYValue;
                options.transform = 'rotate(' + angle + ',' + pointX + ',' + pointY + ')';
                helper_4.textElement(chart.renderer, options, label.labelStyle, label.labelStyle.color || chart.themeStyle.axisLabel, labelElement, false, chart.redraw, true, true, null, null, null, null, chart.enableCanvas);
            }
            if (!this.chart.enableCanvas) {
                if (!chart.delayRedraw) {
                    helper_2.appendChildElement(chart.enableCanvas, parent, labelElement, chart.redraw);
                }
                else if (axis.visible && axis.internalVisibility) {
                    this.createZoomingLabel(this.chart, labelElement, axis, index, rect);
                }
            }
        };
        CartesianAxisLayoutPanel.prototype.getAxisLabelXvalue = function (x, axis, textWidth) {
            var anchor = axis.lineBreakAlignment;
            var isLabelInside = axis.labelPosition === 'Inside';
            var isOpposed = axis.isAxisOpposedPosition;
            if ((isOpposed && isLabelInside) || (!isOpposed && !isLabelInside)) {
                return (anchor === 'Right' ? x : (anchor === 'Center' ? (x - textWidth / 2) : (x - textWidth)));
            }
            else {
                return (anchor === 'Left' ? x : (anchor === 'Center' ? (x + textWidth / 2) : (x + textWidth)));
            }
        };
        CartesianAxisLayoutPanel.prototype.drawYAxisBorder = function (axis, index, parent, rect) {
            if (axis.border.width > 0) {
                var startY = void 0;
                var pointY = void 0;
                var scrollBarHeight = axis.labelPosition === 'Outside' ? axis.scrollBarHeight : 0;
                var isOpposed = axis.isAxisOpposedPosition;
                scrollBarHeight = (isOpposed ? 1 : -1) * scrollBarHeight;
                var gap = (rect.height / axis.visibleRange.delta) * (axis.valueType === 'DateTime' ? axis.dateTimeInterval
                    : axis.visibleRange.interval);
                var endY = void 0;
                var length_1 = axis.maxLabelSize.width + 10 + ((axis.tickPosition === axis.labelPosition) ?
                    axis.majorTickLines.height : 0);
                var labelBorder = '';
                var ticksbwtLabel = (axis.valueType === 'Category' && axis.labelPlacement === 'BetweenTicks') ? -0.5 : 0;
                var endX = ((isOpposed && axis.labelPosition === 'Inside') || (!isOpposed
                    && axis.labelPosition === 'Outside')) ? rect.x - length_1 + scrollBarHeight : rect.x + length_1 + scrollBarHeight;
                for (var i = 0, len = axis.visibleLabels.length; i < len; i++) {
                    pointY = helper_1.valueToCoefficient(axis.visibleLabels[i].value + ticksbwtLabel, axis);
                    pointY = (axis.isAxisInverse ? (1 - pointY) : pointY) * rect.height;
                    if (axis.valueType === 'Category' && axis.labelPlacement === 'BetweenTicks') {
                        startY = (pointY * -1) + (rect.y + rect.height);
                        endY = (pointY * -1) - (gap) + (rect.y + rect.height);
                    }
                    else {
                        startY = (pointY * -1) + gap / 2 + (rect.y + rect.height);
                        endY = (pointY * -1) - gap / 2 + (rect.y + rect.height);
                    }
                    switch (axis.border.type) {
                        case 'Rectangle':
                        case 'WithoutTopBorder':
                            if (startY > (rect.y + rect.height)) {
                                labelBorder += ('M' + ' ' + endX + ' ' + (rect.y + rect.height) + ' ' + 'L' + ' ' + endX + ' ' + endY + ' ');
                            }
                            else if (Math.floor(rect.y) > (endY)) {
                                labelBorder += ('M' + ' ' + (rect.x + scrollBarHeight) + ' ' + startY + ' ' + 'L' + ' ' + endX
                                    + ' ' + startY + ' ' + 'L' + ' ' + endX + ' ' + (rect.y) + ' ');
                            }
                            else {
                                labelBorder += ('M' + ' ' + (rect.x + scrollBarHeight) + ' ' + startY + ' ' + 'L' + ' ' + endX +
                                    ' ' + startY + ' ' + 'L' + ' ' + endX + ' ' + endY + ' ');
                                if (i === axis.visibleLabels.length - 1) {
                                    labelBorder += ('M' + ' ' + (rect.x + scrollBarHeight) + ' ' + endY + ' ' + 'L' + ' ' +
                                        endX + ' ' + endY + ' ');
                                }
                            }
                            break;
                        case 'WithoutTopandBottomBorder':
                            if (!(startY > rect.y + rect.height) && !((endY) < Math.floor(rect.y))) {
                                labelBorder += ('M' + ' ' + (rect.x + scrollBarHeight) + ' ' + startY + ' ' + 'L' + ' ' + endX +
                                    ' ' + startY + ' ' + 'M' + ' ' + endX + ' ' + endY + ' ' +
                                    'L' + ' ' + (rect.x + scrollBarHeight) + ' ' + endY);
                            }
                            break;
                    }
                }
                labelBorder += (axis.border.type === 'Rectangle') ? ('M' + ' ' + (rect.x + scrollBarHeight) + ' ' + rect.y + ' ' + 'L' + ' ' +
                    (rect.x + scrollBarHeight) + ' ' + (rect.y + rect.height) + ' ') : '';
                if (labelBorder !== '') {
                    this.createAxisBorderElement(axis, index, labelBorder, parent);
                }
            }
            if (axis.multiLevelLabels.length > 0 && this.chart.multiLevelLabelModule) {
                this.chart.multiLevelLabelModule.renderYAxisMultiLevelLabels(axis, index, parent, rect);
            }
        };
        CartesianAxisLayoutPanel.prototype.drawYAxisTitle = function (axis, index, parent, rect) {
            if (axis.title) {
                var chart = this.chart;
                var isOpposed = axis.isAxisOpposedPosition;
                var labelRotation = isOpposed ? 90 : -90;
                var padding = (axis.tickPosition === 'Inside' ? 0 : axis.majorTickLines.height + axis.titlePadding) +
                    (axis.labelPosition === 'Inside' ? 0 :
                        (axis.maxLabelSize.width + axis.multiLevelLabelHeight + this.padding));
                padding = isOpposed ? padding + axis.scrollBarHeight : -padding - axis.scrollBarHeight;
                var x = rect.x + padding;
                var y = rect.y + rect.height * 0.5;
                var titleSize = (axis.titleSize.height * (axis.titleCollection.length - 1));
                var options = new ej2_svg_base_1.TextOption(chart.element.id + '_AxisTitle_' + index, x, y - axis.labelPadding - titleSize, 'middle', axis.titleCollection, 'rotate(' + labelRotation + ',' + (x) + ',' + (y) + ')', null, labelRotation);
                var element = helper_4.textElement(chart.renderer, options, axis.titleStyle, axis.titleStyle.color || chart.themeStyle.axisTitle, parent, null, null, null, null, null, null, null, null, chart.enableCanvas);
                element.setAttribute('aria-label', axis.description || axis.title);
            }
        };
        CartesianAxisLayoutPanel.prototype.drawXAxisGridLine = function (axis, index, parent, rect) {
            var isLogAxis = axis.valueType === 'Logarithmic';
            var isCategoryAxis = axis.valueType.indexOf('Category') > -1;
            var tempInterval;
            var pointX = 0;
            var majorGrid = '';
            var majorTick = '';
            var minorDirection;
            var isOpposed = axis.isAxisOpposedPosition;
            var tickSize = (isOpposed) ? -axis.majorTickLines.height : axis.majorTickLines.height;
            var axisLineSize = (isOpposed) ? -axis.lineStyle.width * 0.5 : axis.lineStyle.width * 0.5;
            var scrollBarHeight = ej2_base_1.isNullOrUndefined(axis.crossesAt) ? isOpposed ? -axis.scrollBarHeight :
                axis.scrollBarHeight : 0;
            var ticksbwtLabel = (axis.valueType.indexOf('Category') > -1 && axis.labelPlacement === 'BetweenTicks') ?
                0.5 : 0;
            var length = axis.visibleLabels.length;
            var isTickInside = axis.tickPosition === 'Inside';
            var ticks = isTickInside ? (rect.y - tickSize - axisLineSize) : (rect.y + tickSize + axisLineSize + scrollBarHeight);
            var chartThemeStyle = this.chart.themeStyle;
            if (axis.valueType.indexOf('Category') > -1 && length > 0 && axis.labelPlacement === 'BetweenTicks') {
                length += 1;
            }
            for (var i = 0; i < length; i++) {
                if (axis.valueType !== 'DateTimeCategory') {
                    tempInterval = axis.visibleLabels[i] ? axis.visibleLabels[i].value - ticksbwtLabel
                        : (axis.visibleLabels[i - 1].value + axis.visibleRange.interval) - ticksbwtLabel;
                }
                else {
                    tempInterval = axis.visibleLabels[i] ?
                        axis.visibleLabels[i].value - ticksbwtLabel : axis.visibleRange.max;
                }
                pointX = (helper_1.valueToCoefficient(tempInterval, axis) * rect.width) + rect.x;
                if (pointX >= rect.x && (rect.x + rect.width) >= pointX) {
                    if (helper_2.inside(tempInterval, axis.visibleRange) || this.isBorder(axis, i, pointX)) {
                        majorGrid = 'M ' + pointX + ' ' + (this.seriesClipRect.y + this.seriesClipRect.height) +
                            ' L ' + pointX + ' ' + this.seriesClipRect.y;
                        this.renderGridLine(axis, index, majorGrid, axis.majorGridLines, '_MajorGridLine_', i, this.element, chartThemeStyle.majorGridLine, axis.majorGridLines.dashArray);
                    }
                    majorTick = 'M ' + (pointX) + ' ' + (rect.y + axisLineSize + (isTickInside ? scrollBarHeight : 0))
                        + ' L ' + (pointX) + ' ' + ticks;
                    this.renderGridLine(axis, index, majorTick, axis.majorTickLines, '_MajorTickLine_', i, parent, chartThemeStyle.majorTickLine);
                    if (axis.minorTicksPerInterval > 0 && (axis.minorGridLines.width > 0 || axis.minorTickLines.width > 0)) {
                        if (i === 0 && helper_4.isZoomSet(axis) && !isLogAxis && !isCategoryAxis) {
                            this.renderMinorGridOnZooming(axis, tempInterval, rect, i, index, chartThemeStyle, parent);
                        }
                        minorDirection = this.drawAxisMinorLine(axis, tempInterval, rect, i);
                        this.renderGridLine(axis, index, minorDirection[0], axis.minorGridLines, '_MinorGridLine_', i, this.element, chartThemeStyle.minorGridLine, axis.minorGridLines.dashArray);
                        this.renderGridLine(axis, index, minorDirection[1], axis.minorTickLines, '_MinorTickLine_', i, parent, chartThemeStyle.minorTickLine);
                        if (i === length - 1 && helper_4.isZoomSet(axis) && isLogAxis && !isCategoryAxis) {
                            this.renderMinorGridOnZooming(axis, (tempInterval + axis.visibleRange.interval), rect, i, index, chartThemeStyle, parent);
                        }
                    }
                }
            }
        };
        CartesianAxisLayoutPanel.prototype.renderMinorGridOnZooming = function (axis, tempInterval, rect, i, index, chartThemeStyle, parent) {
            var minorDirection = this.drawAxisMinorLine(axis, tempInterval, rect, i, true);
            this.renderGridLine(axis, index, minorDirection[0], axis.minorGridLines, '_MinorGridLine_', -1, this.element, chartThemeStyle.minorGridLine, axis.minorGridLines.dashArray);
            this.renderGridLine(axis, index, minorDirection[1], axis.minorTickLines, '_MinorTickLine_', -1, parent, chartThemeStyle.minorTickLine);
        };
        CartesianAxisLayoutPanel.prototype.drawAxisMinorLine = function (axis, tempInterval, rect, labelIndex, isFirstLabel) {
            var value = tempInterval;
            var coor = 0;
            var position = 0;
            var range = axis.visibleRange;
            var isTickInside = axis.tickPosition === 'Inside';
            var direction = [];
            var tickSize = axis.isAxisOpposedPosition ? -axis.minorTickLines.height : axis.minorTickLines.height;
            var logStart;
            var logEnd;
            var logInterval = 1;
            var logPosition = 1;
            var ticksX = isTickInside ? (rect.y - tickSize) : (rect.y + tickSize);
            var ticksY = isTickInside ? (rect.x + tickSize) : (rect.x - tickSize);
            var minorGird = '';
            var minorTick = '';
            var isInverse = axis.isAxisInverse;
            if (axis.valueType === 'Logarithmic') {
                logStart = Math.pow(axis.logBase, value - range.interval);
                logEnd = Math.pow(axis.logBase, value);
                logInterval = (logEnd - logStart) / (axis.minorTicksPerInterval + 1);
                logPosition = logStart + logInterval;
            }
            if (axis.orientation === 'Horizontal') {
                for (var j = 0; j < axis.minorTicksPerInterval; j++) {
                    value = this.findLogNumeric(axis, logPosition, value, labelIndex, isFirstLabel);
                    logPosition += logInterval;
                    if (helper_2.inside(value, range)) {
                        position = ((value - range.min) / (range.max - range.min));
                        position = Math.ceil((isInverse ? (1 - position) : position) * rect.width);
                        coor = (Math.floor(position + rect.x));
                        minorGird = minorGird.concat('M' + ' ' + coor + ' ' + (this.seriesClipRect.y)
                            + 'L ' + coor + ' ' + (this.seriesClipRect.y + this.seriesClipRect.height));
                        coor = (Math.floor(position + rect.x));
                        minorTick = minorTick.concat('M' + ' ' + coor + ' ' + (rect.y)
                            + 'L ' + coor + ' ' + (ticksX + axis.scrollBarHeight));
                    }
                }
            }
            else {
                for (var j = 0; j < axis.minorTicksPerInterval; j++) {
                    value = this.findLogNumeric(axis, logPosition, value, labelIndex, isFirstLabel);
                    if (helper_2.inside(value, range)) {
                        position = ((value - range.min) / (range.max - range.min));
                        position = Math.ceil(((isInverse ? (1 - position) : position)) * rect.height) * -1;
                        coor = (Math.floor(position + rect.y + rect.height));
                        minorGird = minorGird.concat('M' + ' ' + (this.seriesClipRect.x) + ' ' + coor
                            + 'L ' + (this.seriesClipRect.x + this.seriesClipRect.width) + ' ' + coor + ' ');
                        coor = (Math.floor(position + rect.y + rect.height));
                        minorTick = minorTick.concat('M' + ' ' + rect.x + ' ' + coor + 'L ' + (ticksY - axis.scrollBarHeight) +
                            ' ' + coor + ' ');
                    }
                    logPosition += logInterval;
                }
            }
            direction.push(minorGird);
            direction.push(minorTick);
            return direction;
        };
        CartesianAxisLayoutPanel.prototype.findLogNumeric = function (axis, logPosition, value, labelIndex, isFirstLabel) {
            var range = axis.visibleRange;
            var tempValue;
            if (axis.valueType === 'Logarithmic') {
                value = helper_3.logBase(logPosition, axis.logBase);
            }
            else if (axis.valueType === 'DateTime') {
                tempValue = axis.dateTimeInterval / (axis.minorTicksPerInterval + 1);
                value = isFirstLabel ? (value - tempValue) : (value + tempValue);
            }
            else if (axis.valueType === 'DateTimeCategory') {
                var padding = axis.labelPlacement === 'BetweenTicks' ? 0.5 : 0;
                value += ((axis.visibleLabels[labelIndex + 1] ?
                    axis.visibleLabels[labelIndex + 1].value - padding : axis.visibleRange.max) -
                    (axis.visibleLabels[labelIndex] ?
                        axis.visibleLabels[labelIndex].value - padding : axis.visibleRange.min)) /
                    (axis.minorTicksPerInterval + 1);
            }
            else {
                tempValue = range.interval / (axis.minorTicksPerInterval + 1);
                value = isFirstLabel ? (value - tempValue) : (value + tempValue);
            }
            return value;
        };
        CartesianAxisLayoutPanel.prototype.drawXAxisLabels = function (axis, index, parent, rect) {
            var chart = this.chart;
            var pointX = 0;
            var pointY = 0;
            var labelSpace = axis.labelPadding;
            var labelHeight;
            var elementSize;
            var labelPadding;
            var anchor;
            var pixel = 10;
            var labelElement = chart.renderer.createGroup({ id: chart.element.id + 'AxisLabels' + index });
            var islabelInside = axis.labelPosition === 'Inside';
            var isOpposed = axis.isAxisOpposedPosition;
            var tickSpace = axis.labelPosition === axis.tickPosition ? axis.majorTickLines.height : 0;
            var padding = tickSpace + labelSpace + axis.lineStyle.width * 0.5;
            var angle = axis.angle % 360;
            var isHorizontalAngle = (angle === 0 || angle === -180 || angle === 180);
            var options;
            var labelWidth;
            var isInverse = axis.isAxisInverse;
            var previousEnd = isInverse ? (rect.x + rect.width) : rect.x;
            var width = 0;
            var length = axis.visibleLabels.length;
            var intervalLength;
            var label;
            var isAxisBreakLabel;
            var scrollBarHeight = axis.scrollbarSettings.enable || (!islabelInside && ej2_base_1.isNullOrUndefined(axis.crossesAt)
                && (axis.zoomFactor < 1 || axis.zoomPosition > 0)) ? axis.scrollBarHeight : 0;
            var newPoints = [];
            var isRotatedLabelIntersect = false;
            padding += (angle === 90 || angle === 270 || angle === -90 || angle === -270) ? (islabelInside ? 5 : -5) : 0;
            var isLabelUnderAxisLine = ((!isOpposed && !islabelInside) || (isOpposed && islabelInside));
            var isEndAnchor = isLabelUnderAxisLine ?
                ((360 >= angle && angle >= 180) || (-1 >= angle && angle >= -180)) :
                ((1 <= angle && angle <= 180) || (-181 >= angle && angle >= -360));
            for (var i = 0, len = length; i < len; i++) {
                label = axis.visibleLabels[i];
                isAxisBreakLabel = helper_1.isBreakLabel(label.originalText);
                pointX = (helper_1.valueToCoefficient(label.value, axis) * rect.width) + rect.x;
                elementSize = label.size;
                intervalLength = rect.width / length;
                labelWidth = isAxisBreakLabel ? label.breakLabelSize.width : elementSize.width;
                width = ((axis.labelIntersectAction === 'Trim' || axis.labelIntersectAction === 'Wrap') && angle === 0 &&
                    labelWidth > intervalLength) ? intervalLength : labelWidth;
                labelHeight = elementSize.height / 4;
                pointX -= (isAxisBreakLabel || angle !== 0) ? 0 : (width / 2);
                if (angle !== 0) {
                    if (isAxisBreakLabel) {
                        pointX -= axis.lineBreakAlignment === 'Left' ? (label.breakLabelSize.width / 2) : axis.lineBreakAlignment === 'Right' ?
                            -(label.breakLabelSize.width / 2) : 0;
                    }
                    else {
                        pointX -= (angle === -90 || angle === 270 ? -labelHeight : (angle === 90 || angle === -270) ? labelHeight : 0);
                    }
                }
                if (axis.labelStyle.textAlignment === 'Far') {
                    pointX = pointX + width - pixel;
                }
                else if (axis.labelStyle.textAlignment === 'Near') {
                    pointX = pointX - width + pixel;
                }
                else if (axis.labelStyle.textAlignment === 'Center') {
                    pointX = pointX;
                }
                if (isAxisBreakLabel && axis.lineBreakAlignment !== 'Center' && angle === 0) {
                    pointX += axis.lineBreakAlignment === 'Left' ? -(width / 2) : (width / 2);
                }
                var paddingForBreakLabel = isAxisBreakLabel ?
                    (isHorizontalAngle ? (elementSize.height) : (label.breakLabelSize.width / 2)) : 0;
                padding = isAxisBreakLabel ? (tickSpace + labelSpace + axis.lineStyle.width * 0.5) : padding;
                if (islabelInside && angle) {
                    if (isAxisBreakLabel) {
                        pointY = isOpposed ? (rect.y + padding + (paddingForBreakLabel)) : (rect.y - padding - (paddingForBreakLabel));
                    }
                    else {
                        pointY = isOpposed ? (rect.y + padding + labelHeight) : (rect.y - padding - labelHeight);
                    }
                }
                else {
                    if (isAxisBreakLabel) {
                        labelPadding = !isLabelUnderAxisLine ? -(padding + scrollBarHeight + (paddingForBreakLabel)) :
                            padding + scrollBarHeight + (angle ? paddingForBreakLabel : (3 * labelHeight));
                    }
                    else {
                        labelPadding = !isLabelUnderAxisLine ?
                            -(padding + scrollBarHeight + (angle ? labelHeight : (label.index > 1 ? (2 * labelHeight) : 0))) :
                            padding + scrollBarHeight + ((angle ? 1 : 3) * labelHeight);
                    }
                    pointY = (rect.y + (labelPadding * label.index));
                }
                if (isAxisBreakLabel) {
                    anchor = this.getAnchor(axis);
                }
                else {
                    anchor = (chart.enableRtl) ? ((isEndAnchor) ? '' : 'end') : (chart.isRtlEnabled || isEndAnchor) ? 'end' : '';
                }
                options = new ej2_svg_base_1.TextOption(chart.element.id + index + '_AxisLabel_' + i, pointX, pointY, anchor);
                if (axis.edgeLabelPlacement) {
                    switch (axis.edgeLabelPlacement) {
                        case 'None':
                            break;
                        case 'Hide':
                            if (((i === 0 || (isInverse && i === len - 1)) && options.x < rect.x) ||
                                ((i === len - 1 || (isInverse && i === 0)) && (options.x + width > rect.x + rect.width))) {
                                continue;
                            }
                            break;
                        case 'Shift':
                            if ((i === 0 || (isInverse && i === len - 1)) && options.x < rect.x) {
                                intervalLength -= (rect.x - options.x);
                                options.x = pointX = rect.x;
                            }
                            else if ((i === len - 1 || (isInverse && i === 0)) && ((options.x + width) > rect.x + rect.width)) {
                                if (elementSize.width > intervalLength && axis.labelIntersectAction === 'Trim') {
                                    intervalLength -= (options.x + width - (rect.x + rect.width));
                                }
                                else {
                                    intervalLength = width;
                                }
                                options.x = pointX = rect.x + rect.width - intervalLength;
                            }
                            break;
                    }
                }
                options.text = this.getLabelText(label, axis, intervalLength);
                var xValue = void 0;
                var xValue2 = void 0;
                if (isAxisBreakLabel && angle === 0) {
                    if (axis.lineBreakAlignment === 'Right') {
                        xValue = (options.x - width);
                        xValue2 = options.x;
                    }
                    else if (axis.lineBreakAlignment === 'Center') {
                        xValue = (options.x - (width / 2));
                        xValue2 = options.x + (width / 2);
                    }
                    else {
                        xValue = options.x;
                        xValue2 = options.x + width;
                    }
                }
                else {
                    xValue = options.x;
                    xValue2 = options.x + width;
                }
                if (angle === 0 && axis.labelIntersectAction === 'Hide' && i !== 0 &&
                    (!isInverse ? xValue <= previousEnd : xValue2 >= previousEnd)) {
                    continue;
                }
                if (isAxisBreakLabel) {
                    if (axis.lineBreakAlignment === 'Right') {
                        previousEnd = isInverse ? (options.x - width) : options.x;
                    }
                    else if (axis.lineBreakAlignment === 'Center') {
                        previousEnd = isInverse ? (options.x - (width / 2)) : options.x + (width / 2);
                    }
                    else {
                        previousEnd = isInverse ? options.x : options.x + width;
                    }
                }
                else {
                    previousEnd = isInverse ? options.x : options.x + width;
                }
                if (angle !== 0) {
                    var height = void 0;
                    var rect_1 = void 0;
                    if (isAxisBreakLabel) {
                        var xAdjustment = 0;
                        var yAdjustment = 0;
                        height = (label.breakLabelSize.height);
                        yAdjustment = (label.breakLabelSize.height) - 4;
                        if (axis.lineBreakAlignment === 'Center') {
                            xAdjustment = -(label.breakLabelSize.width / 2);
                        }
                        else if (axis.lineBreakAlignment === 'Right') {
                            xAdjustment = -label.breakLabelSize.width;
                        }
                        if (isLabelUnderAxisLine) {
                            yAdjustment = (label.breakLabelSize.height) / (options.text.length + 1);
                        }
                        rect_1 = new ej2_svg_base_1.Rect(options.x + xAdjustment, options.y - (yAdjustment), label.breakLabelSize.width, height);
                    }
                    else {
                        height = (pointY) - (options.y - ((label.size.height / 2) + 10));
                        rect_1 = new ej2_svg_base_1.Rect(options.x, options.y - ((label.size.height / 2) - 5), label.size.width, height);
                    }
                    var rectCoordinates = this.getRectanglePoints(rect_1);
                    var rectCenterX = isAxisBreakLabel ? rect_1.x + (rect_1.width / 2) : pointX;
                    var rectCenterY = isAxisBreakLabel ? rect_1.y + (rect_1.height / 2) : (pointY - (height / 2));
                    if (isAxisBreakLabel) {
                        options.transform = 'rotate(' + angle + ',' + rectCenterX + ',' + rectCenterY + ')';
                    }
                    else {
                        options.transform = 'rotate(' + angle + ',' + pointX + ',' + pointY + ')';
                    }
                    newPoints.push(helper_4.getRotatedRectangleCoordinates(rectCoordinates, rectCenterX, rectCenterY, angle));
                    isRotatedLabelIntersect = false;
                    if (axis.labelIntersectAction !== 'None') {
                        for (var index_1 = i; index_1 > 0; index_1--) {
                            if (newPoints[i] && newPoints[index_1 - 1] && helper_4.isRotatedRectIntersect(newPoints[i], newPoints[index_1 - 1])) {
                                isRotatedLabelIntersect = true;
                                newPoints[i] = null;
                                break;
                            }
                        }
                    }
                }
                helper_4.textElement(chart.renderer, options, label.labelStyle, label.labelStyle.color || chart.themeStyle.axisLabel, labelElement, (axis.isAxisOpposedPosition !== (axis.labelPosition === 'Inside')), chart.redraw, true, null, null, null, label.size, isRotatedLabelIntersect, chart.enableCanvas);
            }
            if (!this.chart.enableCanvas) {
                if (!chart.delayRedraw) {
                    parent.appendChild(labelElement);
                }
                else if (axis.visible && axis.internalVisibility) {
                    this.createZoomingLabel(this.chart, labelElement, axis, index, rect);
                }
            }
        };
        CartesianAxisLayoutPanel.prototype.getAnchor = function (axis) {
            return (axis.lineBreakAlignment === 'Center' ? 'middle' : (this.chart.enableRtl) ? (axis.lineBreakAlignment === 'Left' ? 'end' : 'start') : (axis.lineBreakAlignment === 'Left' ? 'start' : 'end'));
        };
        CartesianAxisLayoutPanel.prototype.getRectanglePoints = function (rect) {
            var point1 = new helper_1.ChartLocation(rect.x, rect.y);
            var point2 = new helper_1.ChartLocation(rect.x + rect.width, rect.y);
            var point3 = new helper_1.ChartLocation(rect.x + rect.width, rect.y + rect.height);
            var point4 = new helper_1.ChartLocation(rect.x, rect.y + rect.height);
            return [point1, point2, point3, point4];
        };
        CartesianAxisLayoutPanel.prototype.getLabelText = function (label, axis, intervalLength) {
            if (helper_1.isBreakLabel(label.originalText)) {
                var result = [];
                var str = void 0;
                for (var index = 0; index < label.text.length; index++) {
                    str = this.findAxisLabel(axis, label.text[index], intervalLength);
                    result.push(str);
                }
                return result;
            }
            else {
                return this.findAxisLabel(axis, label.text, intervalLength);
            }
        };
        CartesianAxisLayoutPanel.prototype.drawXAxisBorder = function (axis, index, parent, axisRect) {
            if (axis.border.width > 0) {
                var scrollBarHeight = axis.labelPosition === 'Outside' ? axis.scrollBarHeight : 0;
                var isOpposed = axis.isAxisOpposedPosition;
                var startX = void 0;
                var startY = axisRect.y + ((isOpposed ? -1 : 1) * scrollBarHeight);
                var padding = 10;
                var pointX = void 0;
                var gap = (axisRect.width / axis.visibleRange.delta) * (axis.valueType === 'DateTime' ? axis.dateTimeInterval
                    : axis.visibleRange.interval);
                var endX = void 0;
                var length_2 = axis.maxLabelSize.height +
                    ((axis.tickPosition === axis.labelPosition) ? axis.majorTickLines.height : 0);
                var labelBorder = '';
                var ticksbwtLabel = (axis.valueType === 'Category' && axis.labelPlacement === 'BetweenTicks') ? -0.5 : 0;
                var endY = ((isOpposed && axis.labelPosition === 'Inside') ||
                    (!isOpposed && axis.labelPosition === 'Outside')) ?
                    (axisRect.y + length_2 + padding + scrollBarHeight) : (axisRect.y - length_2 - padding - scrollBarHeight);
                for (var i = 0, len = axis.visibleLabels.length; i < len; i++) {
                    pointX = helper_1.valueToCoefficient(axis.visibleLabels[i].value + ticksbwtLabel, axis);
                    pointX = (axis.isAxisInverse ? (1 - pointX) : pointX) * axisRect.width;
                    if (axis.valueType === 'Category' && axis.labelPlacement === 'BetweenTicks') {
                        startX = pointX + axisRect.x;
                        endX = pointX + (gap) + axisRect.x;
                    }
                    else {
                        startX = pointX - gap * 0.5 + axisRect.x;
                        endX = pointX + gap * 0.5 + axisRect.x;
                    }
                    switch (axis.border.type) {
                        case 'Rectangle':
                        case 'WithoutTopBorder':
                            if (startX < axisRect.x) {
                                labelBorder += ('M' + ' ' + axisRect.x + ' ' + endY + ' ' + 'L' + ' ' + endX + ' ' + endY + ' ');
                            }
                            else if (Math.floor(endX) > axisRect.width + axisRect.x && !(axis.visibleLabels.length === 1)) {
                                labelBorder += ('M' + ' ' + startX + ' ' + startY + ' ' + 'L' + ' ' + startX + ' ' + endY + ' ' +
                                    'L' + ' ' + (axisRect.width + axisRect.x) + ' ' + endY + ' ');
                            }
                            else {
                                labelBorder += ('M' + ' ' + startX + ' ' + startY + ' ' + 'L' + ' ' + startX + ' ' +
                                    endY + ' ' + 'L' + ' ' + endX + ' ' + endY + ' ');
                                if (i === 0) {
                                    labelBorder += ('M' + ' ' + startX + ' ' + startY + ' ' + 'L' + ' ' + startX + ' ' + endY + ' ' +
                                        'M ' + startX + ' ' + endY + ' L ' + (axisRect.x) + ' ' + endY);
                                }
                                if (i === axis.visibleLabels.length - 1) {
                                    labelBorder += ('M' + ' ' + endX + ' ' + startY + ' ' + 'L' + ' ' + endX + ' ' + endY + ' ' +
                                        'M ' + endX + ' ' + endY + ' L ' + (axisRect.width + axisRect.x) + ' ' + endY);
                                }
                            }
                            break;
                        case 'WithoutTopandBottomBorder':
                            if (!(startX < axisRect.x) && !(Math.floor(endX) > axisRect.width + axisRect.x)) {
                                labelBorder += ('M' + ' ' + startX + ' ' + startY + ' ' + 'L' + ' ' + startX + ' ' + endY + ' ' +
                                    'M ' + endX + ' ' + startY + ' L ' + endX + ' ' + endY);
                            }
                            break;
                    }
                }
                labelBorder += (axis.border.type === 'Rectangle' ? ('M ' + ' ' + axisRect.x + ' ' + startY + 'L' + ' ' +
                    (axisRect.x + axisRect.width) + ' ' + startY) : '');
                if (labelBorder !== '') {
                    this.createAxisBorderElement(axis, index, labelBorder, parent);
                }
            }
            if (this.chart.multiLevelLabelModule && axis.multiLevelLabels.length > 0) {
                this.chart.multiLevelLabelModule.renderXAxisMultiLevelLabels(axis, index, parent, axisRect);
            }
        };
        CartesianAxisLayoutPanel.prototype.createAxisBorderElement = function (axis, index, labelBorder, parent) {
            var element = helper_3.getElement(this.chart.element.id + '_BorderLine_' + index);
            var direction = element ? element.getAttribute('d') : '';
            var borderElement = this.chart.renderer.drawPath(new ej2_svg_base_1.PathOption(this.chart.element.id + '_BorderLine_' + index, 'transparent', axis.border.width, axis.border.color || this.chart.themeStyle.axisLine, 1, '', labelBorder));
            borderElement.style.pointerEvents = 'none';
            helper_2.appendChildElement(this.chart.enableCanvas, parent, borderElement, this.chart.redraw, true, 'x', 'y', null, direction, true);
        };
        CartesianAxisLayoutPanel.prototype.findAxisLabel = function (axis, label, width) {
            return (axis.labelIntersectAction === 'Trim' ?
                ((axis.angle % 360 === 0 && !axis.enableTrim) ? helper_4.textTrim(width, label, axis.labelStyle) : label) : label);
        };
        CartesianAxisLayoutPanel.prototype.drawXAxisTitle = function (axis, index, parent, rect) {
            if (axis.title) {
                var chart = this.chart;
                var elementSize = ej2_svg_base_1.measureText(axis.title, axis.titleStyle);
                var scrollBarHeight = ej2_base_1.isNullOrUndefined(axis.crossesAt) ? axis.scrollBarHeight : 0;
                var padding = (axis.tickPosition === 'Inside' ? 0 : axis.majorTickLines.height + axis.titlePadding) +
                    (axis.labelPosition === 'Inside' ? 0 :
                        axis.maxLabelSize.height + axis.multiLevelLabelHeight + axis.labelPadding);
                var titleSize = (axis.titleSize.height * (axis.titleCollection.length - 1));
                padding = axis.isAxisOpposedPosition ? -(padding + elementSize.height / 4 + scrollBarHeight + titleSize) : (padding + (3 *
                    elementSize.height / 4) + scrollBarHeight);
                var options = new ej2_svg_base_1.TextOption(chart.element.id + '_AxisTitle_' + index, rect.x + rect.width * 0.5, rect.y + padding, 'middle', axis.titleCollection);
                var element = helper_4.textElement(chart.renderer, options, axis.titleStyle, axis.titleStyle.color || chart.themeStyle.axisTitle, parent, null, null, null, null, null, null, null, null, chart.enableCanvas);
                element.setAttribute('aria-label', axis.description || axis.title);
            }
        };
        CartesianAxisLayoutPanel.prototype.renderGridLine = function (axis, index, gridDirection, gridModel, gridId, gridIndex, parent, themeColor, dashArray) {
            if (dashArray === void 0) { dashArray = null; }
            var chart = this.chart;
            var direction;
            var element;
            if (gridModel.width > 0 && axis.visible && axis.internalVisibility && gridDirection) {
                element = helper_3.getElement(chart.element.id + gridId + index + '_' + gridIndex);
                direction = element ? element.getAttribute('d') : null;
                element = null;
                this.htmlObject = chart.renderer.drawPath(new ej2_svg_base_1.PathOption(chart.element.id + gridId + index + '_' + gridIndex, 'transparent', gridModel.width, gridModel.color || themeColor, null, dashArray, gridDirection));
                helper_2.appendChildElement(chart.enableCanvas, parent, this.htmlObject, chart.redraw, true, 'x', 'y', null, direction, true);
            }
        };
        CartesianAxisLayoutPanel.prototype.findParentNode = function (elementId, label, index) {
            if (document.getElementById(elementId + 'AxisGroup' + index + 'Inside').contains(document.getElementById(label.id))) {
                return document.getElementById(elementId + 'AxisGroup' + index + 'Inside');
            }
            else {
                return document.getElementById(elementId + 'AxisGroup' + index + 'Outside');
            }
        };
        CartesianAxisLayoutPanel.prototype.createZoomingLabel = function (chart, labelElement, axis, index, rect) {
            var parentNode = this.findParentNode(chart.element.id, labelElement, index);
            labelElement.setAttribute('opacity', '0.3');
            var zoomElement = chart.renderer.createGroup({
                id: chart.element.id + 'AxisLabels_Zoom' + index
            });
            zoomElement = helper_3.createZoomingLabels(chart, axis, zoomElement, index, axis.orientation === 'Vertical', rect);
            parentNode.replaceChild(labelElement, document.getElementById(labelElement.id));
            if (helper_3.getElement(chart.element.id + 'AxisLabels_Zoom' + index)) {
                parentNode.replaceChild(zoomElement, document.getElementById(zoomElement.id));
            }
            else {
                parentNode.appendChild(zoomElement);
            }
        };
        return CartesianAxisLayoutPanel;
    }());
    exports.CartesianAxisLayoutPanel = CartesianAxisLayoutPanel;
});
