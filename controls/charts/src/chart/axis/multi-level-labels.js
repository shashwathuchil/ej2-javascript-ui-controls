define(["require", "exports", "@syncfusion/ej2-base", "../../common/utils/helper", "../../common/utils/helper", "@syncfusion/ej2-svg-base", "../../common/model/constants"], function (require, exports, ej2_base_1, helper_1, helper_2, ej2_svg_base_1, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MultiLevelLabel = (function () {
        function MultiLevelLabel(chart) {
            this.xAxisPrevHeight = [];
            this.xAxisMultiLabelHeight = [];
            this.yAxisPrevHeight = [];
            this.yAxisMultiLabelHeight = [];
            this.multiLevelLabelRectXRegion = [];
            this.xLabelCollection = [];
            this.chart = chart;
            this.addEventListener();
        }
        MultiLevelLabel.prototype.addEventListener = function () {
            if (this.chart.isDestroyed) {
                return;
            }
            this.chart.on('click', this.click, this);
        };
        MultiLevelLabel.prototype.getMultilevelLabelsHeight = function (axis) {
            var value = 0;
            var multiLevelLabelsHeight = [];
            var prevHeight = [];
            var isVertical = axis.orientation === 'Vertical';
            var axisValue = isVertical ? axis.rect.height : axis.rect.width;
            var labelSize;
            var height;
            var padding = 10;
            var gap;
            axis.multiLevelLabels.map(function (multiLevel, index) {
                multiLevel.categories.map(function (categoryLabel) {
                    if (categoryLabel.text !== '' && categoryLabel.start !== null && categoryLabel.end !== null) {
                        labelSize = ej2_svg_base_1.measureText(categoryLabel.text, multiLevel.textStyle);
                        height = isVertical ? labelSize.width : labelSize.height;
                        height += 2 * multiLevel.border.width +
                            (multiLevel.border.type === 'CurlyBrace' ? padding : 0);
                        gap = (categoryLabel.maximumTextWidth !== null) ? categoryLabel.maximumTextWidth :
                            (helper_2.valueToCoefficient(typeof categoryLabel.end === 'string' ? Number(new Date(categoryLabel.end)) :
                                categoryLabel.end, axis) * axisValue) -
                                (helper_2.valueToCoefficient(typeof categoryLabel.start === 'string' ? Number(new Date(categoryLabel.start)) :
                                    categoryLabel.start, axis) * axisValue);
                        if ((labelSize.width > gap - padding) && gap > 0 && (multiLevel.overflow === 'Wrap') && !isVertical) {
                            height = (height * (helper_1.textWrap(categoryLabel.text, gap - padding, multiLevel.textStyle).length));
                        }
                        multiLevelLabelsHeight[index] = !multiLevelLabelsHeight[index] ? height :
                            ((multiLevelLabelsHeight[index] < height) ? height : multiLevelLabelsHeight[index]);
                    }
                });
                prevHeight[index] = value;
                value += multiLevelLabelsHeight[index] ? (multiLevelLabelsHeight[index] + padding) : 0;
            });
            axis.multiLevelLabelHeight = value + ((axis.title !== '' || (this.chart.legendModule && this.chart.legendSettings.visible))
                ? padding / 2 : 0);
            if (isVertical) {
                this.yAxisMultiLabelHeight = multiLevelLabelsHeight;
                this.yAxisPrevHeight = prevHeight;
            }
            else {
                this.xAxisMultiLabelHeight = multiLevelLabelsHeight;
                this.xAxisPrevHeight = prevHeight;
            }
        };
        MultiLevelLabel.prototype.renderXAxisMultiLevelLabels = function (axis, index, parent, axisRect) {
            var _this = this;
            var x;
            var y;
            var padding = 10;
            var startX;
            var pointIndex;
            var startY = (axis.labelPosition === axis.tickPosition ? axis.majorTickLines.height : 0) +
                (axis.maxLabelSize.height) + padding;
            var endX;
            var pathRect = '';
            var start;
            var end;
            var labelSize;
            var isOutside = axis.labelPosition === 'Outside';
            var gap;
            var anchor;
            var isInversed = axis.isAxisInverse;
            var argsData;
            var opposedPosition = axis.isAxisOpposedPosition;
            var scrollBarHeight = axis.scrollbarSettings.enable || (isOutside && ej2_base_1.isNullOrUndefined(axis.crossesAt)) ?
                axis.scrollBarHeight : 0;
            var clipY = ((opposedPosition && !isOutside) || (!opposedPosition && isOutside)) ?
                (axisRect.y + startY - axis.majorTickLines.width) : (axisRect.y - startY - axis.multiLevelLabelHeight);
            this.createClipRect(axisRect.x - axis.majorTickLines.width, clipY + scrollBarHeight, axis.multiLevelLabelHeight + padding, axisRect.width + 2 * axis.majorTickLines.width, this.chart.element.id + '_XAxis_Clippath_' + index, this.chart.element.id + 'XAxisMultiLevelLabel' + index);
            axis.multiLevelLabels.map(function (multiLevel, level) {
                pointIndex = 0;
                _this.labelElement = _this.chart.renderer.createGroup({ id: _this.chart.element.id + index + '_MultiLevelLabel' + level });
                multiLevel.categories.map(function (categoryLabel, i) {
                    pathRect = '';
                    start = typeof categoryLabel.start === 'string' ? Number(new Date(categoryLabel.start)) : categoryLabel.start;
                    end = typeof categoryLabel.end === 'string' ? Number(new Date(categoryLabel.end)) : categoryLabel.end;
                    argsData = _this.triggerMultiLabelRender(axis, categoryLabel.text, axis.multiLevelLabels[level].textStyle, axis.multiLevelLabels[level].alignment, categoryLabel.customAttributes);
                    if (!argsData.cancel) {
                        startX = helper_2.valueToCoefficient(start, axis) * axisRect.width;
                        endX = helper_2.valueToCoefficient(end, axis) * axisRect.width;
                        endX = isInversed ? [startX, startX = endX][0] : endX;
                        labelSize = ej2_svg_base_1.measureText(argsData.text, argsData.textStyle);
                        gap = ((categoryLabel.maximumTextWidth === null) ? endX - startX : categoryLabel.maximumTextWidth) - padding;
                        x = startX + axisRect.x + padding;
                        y = (((opposedPosition && !isOutside) || (!opposedPosition && isOutside)) ? (startY + axisRect.y +
                            labelSize.height / 2 + padding + _this.xAxisPrevHeight[level]) : (axisRect.y - startY + labelSize.height / 2 -
                            _this.xAxisMultiLabelHeight[level] - _this.xAxisPrevHeight[level])) + scrollBarHeight;
                        if (argsData.alignment === 'Center') {
                            x += (endX - startX - padding) / 2;
                            anchor = 'middle';
                        }
                        else if (argsData.alignment === 'Far') {
                            x = x + (endX - startX - padding) - multiLevel.border.width / 2;
                            anchor = 'end';
                        }
                        else {
                            anchor = 'start';
                            x += multiLevel.border.width / 2;
                        }
                        y = multiLevel.border.type === 'CurlyBrace' ?
                            (((!opposedPosition && isOutside) || (opposedPosition && !isOutside)) ? y + padding : y - padding / 2) : y;
                        var options = new ej2_svg_base_1.TextOption(_this.chart.element.id + index + '_Axis_MultiLevelLabel_Level_' + level + '_Text_' + i, x, y, anchor, argsData.text);
                        if (multiLevel.overflow !== 'None') {
                            options.text = (multiLevel.overflow === 'Wrap') ?
                                helper_1.textWrap(argsData.text, gap, argsData.textStyle) : helper_2.textTrim(gap, argsData.text, argsData.textStyle);
                            options.x = options.x - padding / 2;
                        }
                        helper_2.textElement(_this.chart.renderer, options, argsData.textStyle, argsData.textStyle.color || _this.chart.themeStyle.axisLabel, _this.labelElement, false, _this.chart.redraw, true, null, null, null, null, null, _this.chart.enableCanvas);
                        if (_this.chart.enableCanvas) {
                            var textSize = ej2_svg_base_1.measureText(argsData.text, argsData.textStyle);
                            _this.multiLevelLabelRectXRegion.push(new ej2_svg_base_1.Rect(options.x, options.y, textSize.width, textSize.height));
                            _this.xLabelCollection.push(options);
                        }
                        if (multiLevel.border.width > 0 && multiLevel.border.type !== 'WithoutBorder') {
                            pathRect = _this.renderXAxisLabelBorder(level, endX - startX - padding, axis, startX, startY, labelSize, options, axisRect, argsData.alignment, pathRect, isOutside, opposedPosition, pointIndex);
                            if (pathRect !== '') {
                                _this.createBorderElement(level, index, axis, pathRect, pointIndex);
                                pointIndex++;
                            }
                        }
                        if (!_this.chart.enableCanvas) {
                            _this.multiElements.appendChild(_this.labelElement);
                        }
                    }
                });
            });
            if (!this.chart.enableCanvas) {
                parent.appendChild(this.multiElements);
            }
        };
        MultiLevelLabel.prototype.renderXAxisLabelBorder = function (labelIndex, gap, axis, startX, startY, labelSize, textOptions, axisRect, alignment, path, isOutside, opposedPosition, categoryIndex) {
            var padding = 10;
            var padding1;
            var padding2;
            var value;
            var value1;
            var groupLabel = axis.multiLevelLabels[labelIndex];
            var categoryType = groupLabel.categories[categoryIndex].type;
            var width = gap + padding;
            var height = this.xAxisMultiLabelHeight[labelIndex] + padding;
            var scrollBarHeight = axis.labelPosition === 'Outside' ? axis.scrollBarHeight : 0;
            var x = startX + axisRect.x;
            var y = ((!opposedPosition && isOutside) || (opposedPosition && !isOutside)) ? (startY + axisRect.y +
                this.xAxisPrevHeight[labelIndex] + scrollBarHeight) : (axisRect.y - startY -
                this.xAxisPrevHeight[labelIndex] - scrollBarHeight);
            var borderType = categoryType ? categoryType : groupLabel.border.type;
            switch (borderType) {
                case 'WithoutTopandBottomBorder':
                case 'Rectangle':
                case 'WithoutTopBorder':
                    height = ((!opposedPosition && isOutside) || (opposedPosition && !isOutside)) ? height : -height;
                    path += 'M ' + x + ' ' + y + ' L ' + x + ' ' + (y + height) + ' M ' + (x + width) + ' '
                        + y + ' L ' + (x + width) + ' ' + (y + height);
                    path += (borderType !== 'WithoutTopandBottomBorder') ? (' L' + ' ' + (x) + ' ' + (y + height) + ' ') : ' ';
                    path += (borderType === 'Rectangle') ? ('M ' + x + ' ' + y + ' L ' + (x + width) + ' ' + y) : ' ';
                    break;
                case 'Brace':
                    if (alignment === 'Near') {
                        value = textOptions.x;
                        value1 = textOptions.x + labelSize.width + 2;
                    }
                    else if (alignment === 'Center') {
                        value = textOptions.x - labelSize.width / 2 - 2;
                        value1 = textOptions.x + labelSize.width / 2 + 2;
                    }
                    else {
                        value = textOptions.x - labelSize.width - 2;
                        value1 = textOptions.x;
                    }
                    height = ((!opposedPosition && isOutside) || (opposedPosition && !isOutside)) ? height : -height;
                    path += 'M ' + x + ' ' + y + ' L ' + x + ' ' + (y + height / 2) +
                        ' M ' + x + ' ' + (y + height / 2) + ' L ' + (value - 2) + ' ' + (y + height / 2) +
                        ' M ' + (value1) + ' ' + (y + height / 2) + ' L ' + (x + width) + ' ' + (y + height / 2) +
                        ' M ' + (x + width) + ' ' + (y + height / 2) + ' L ' + (x + width) + ' ' + (y);
                    break;
                case 'CurlyBrace':
                    if ((!opposedPosition && isOutside) || (opposedPosition && !isOutside)) {
                        padding = 10;
                        padding1 = 15;
                        padding2 = 5;
                    }
                    else {
                        padding = -10;
                        padding1 = -15;
                        padding2 = -5;
                    }
                    if (alignment === 'Center') {
                        path += 'M ' + x + ' ' + y + ' C ' + x + ' ' + y + ' ' + (x + 5) + ' ' + (y + padding) + ' ' + (x + 10) + ' ' +
                            (y + padding) + ' L ' + (x + width / 2 - 5) + ' ' + (y + padding) + ' L ' + (x + width / 2) + ' ' + (y + padding1) +
                            ' L ' + (x + width / 2 + 5) + ' ' + (y + padding) + ' L ' + (x + width - 10) + ' ' + (y + padding) + ' C ' +
                            (x + width - 10) + ' ' + (y + padding) + ' ' + (x + width) + ' ' + (y + padding2) + ' ' + (x + width) + ' ' + (y);
                    }
                    else if (alignment === 'Near') {
                        path += 'M ' + x + ' ' + y + ' C ' + x + ' ' + y + ' ' + (x + 5) + ' ' + (y + padding) + ' ' + (x + 10) + ' ' +
                            (y + padding) + ' L ' + (x + 15) + ' ' + (y + padding1) + ' L ' + (x + 20) + ' ' + (y + padding) + ' L ' +
                            (x + width - 10) + ' ' + (y + padding) + ' C ' + (x + width - 10) + ' ' + (y + padding) + ' ' + (x + width) + ' '
                            + (y + padding2) + ' ' + (x + width) + ' ' + (y);
                    }
                    else {
                        path += 'M ' + x + ' ' + y + ' C ' + x + ' ' + y + ' ' + (x + 5) + ' ' + (y + padding) + ' ' + (x + 10) + ' ' +
                            (y + padding) + ' L ' + (x + width - 20) + ' ' + (y + padding) + ' L ' + (x + width - 15) + ' ' + (y + padding1) +
                            ' L ' + (x + width - 10) + ' ' + (y + padding) + ' L ' + (x + width - 10) + ' ' + (y + padding) + ' C '
                            + (x + width - 10) + ' ' + (y + padding) + ' ' + (x + width) + ' ' + (y + padding2) + ' ' + (x + width) + ' ' + (y);
                    }
                    break;
            }
            return path;
        };
        MultiLevelLabel.prototype.renderYAxisMultiLevelLabels = function (axis, index, parent, rect) {
            var _this = this;
            var labelSize;
            var isOutside = axis.labelPosition === 'Outside';
            var x;
            var y;
            var padding = 10;
            var startX = (axis.tickPosition === axis.labelPosition ? axis.majorTickLines.height : 0) +
                (axis.maxLabelSize.width) + padding;
            var startY;
            var path = '';
            var endY;
            var argsData;
            var pointIndex;
            var isInversed = axis.isAxisInverse;
            var start;
            var end;
            var gap;
            var anchor = 'middle';
            var opposedPosition = axis.isAxisOpposedPosition;
            var scrollBarHeight = isOutside && ej2_base_1.isNullOrUndefined(axis.crossesAt) ? axis.scrollBarHeight : 0;
            scrollBarHeight = scrollBarHeight * (opposedPosition ? 1 : -1);
            var clipX = ((opposedPosition && !isOutside) || (!opposedPosition && isOutside)) ?
                (rect.x - axis.multiLevelLabelHeight - startX - padding) : (rect.x + startX);
            this.createClipRect(clipX + scrollBarHeight, rect.y - axis.majorTickLines.width, rect.height + 2 * axis.majorTickLines.width, axis.multiLevelLabelHeight + padding, this.chart.element.id + '_YAxis_Clippath_' + index, this.chart.element.id
                + 'YAxisMultiLevelLabel' + index);
            axis.multiLevelLabels.map(function (multiLevel, level) {
                _this.labelElement = _this.chart.renderer.createGroup({ id: _this.chart.element.id + index + '_MultiLevelLabel' + level });
                pointIndex = 0;
                multiLevel.categories.map(function (categoryLabel, i) {
                    path = '';
                    end = typeof categoryLabel.end === 'string' ? Number(new Date(categoryLabel.end)) : categoryLabel.end;
                    start = typeof categoryLabel.start === 'string' ? Number(new Date(categoryLabel.start)) : categoryLabel.start;
                    startY = helper_2.valueToCoefficient((start), axis) * (rect.height);
                    endY = helper_2.valueToCoefficient((end), axis) * (rect.height);
                    endY = isInversed ? [startY, startY = endY][0] : endY;
                    argsData = _this.triggerMultiLabelRender(axis, categoryLabel.text, multiLevel.textStyle, multiLevel.alignment, categoryLabel.customAttributes);
                    if (!argsData.cancel) {
                        labelSize = ej2_svg_base_1.measureText(argsData.text, argsData.textStyle);
                        gap = endY - startY;
                        x = rect.x - startX - _this.yAxisPrevHeight[level] -
                            (_this.yAxisMultiLabelHeight[level] / 2) - padding / 2;
                        y = rect.height + rect.y - startY - (gap / 2);
                        if (opposedPosition) {
                            x = isOutside ? rect.x + startX + padding / 2 + (_this.yAxisMultiLabelHeight[level] / 2) +
                                _this.yAxisPrevHeight[level] + scrollBarHeight : rect.x - startX - (_this.yAxisMultiLabelHeight[level] / 2) -
                                _this.yAxisPrevHeight[level] - padding / 2;
                        }
                        else {
                            x = isOutside ? x + scrollBarHeight : rect.x + startX + padding / 2 + (_this.yAxisMultiLabelHeight[level] / 2) +
                                _this.yAxisPrevHeight[level];
                        }
                        if (argsData.alignment === 'Center') {
                            y += labelSize.height / 4;
                        }
                        else if (argsData.alignment === 'Far') {
                            y += gap / 2 - labelSize.height / 2;
                        }
                        else {
                            y = y - gap / 2 + labelSize.height;
                        }
                        x = multiLevel.border.type === 'CurlyBrace' ? (((!opposedPosition && isOutside) ||
                            (opposedPosition && !isOutside)) ? x - padding : x + padding) : x;
                        var options = new ej2_svg_base_1.TextOption(_this.chart.element.id + index + '_Axis_MultiLevelLabel_Level_' + level + '_Text_' + i, x, y, anchor, argsData.text);
                        options.text = (multiLevel.overflow === 'Trim') ?
                            helper_2.textTrim((categoryLabel.maximumTextWidth === null ? _this.yAxisMultiLabelHeight[level] :
                                categoryLabel.maximumTextWidth), argsData.text, argsData.textStyle) : options.text;
                        helper_2.textElement(_this.chart.renderer, options, argsData.textStyle, argsData.textStyle.color || _this.chart.themeStyle.axisLabel, _this.labelElement, _this.chart.redraw, true, null, null, null, null, null, null, _this.chart.enableCanvas);
                        if (multiLevel.border.width > 0 && multiLevel.border.type !== 'WithoutBorder') {
                            path = _this.renderYAxisLabelBorder(level, gap, axis, endY, startX, startY, labelSize, options, rect, argsData.alignment, path, isOutside, opposedPosition, pointIndex);
                            if (path !== '') {
                                _this.createBorderElement(level, index, axis, path, pointIndex);
                                pointIndex++;
                            }
                        }
                        if (!_this.chart.enableCanvas) {
                            _this.multiElements.appendChild(_this.labelElement);
                        }
                    }
                });
            });
            if (!this.chart.enableCanvas) {
                parent.appendChild(this.multiElements);
            }
        };
        MultiLevelLabel.prototype.renderYAxisLabelBorder = function (labelIndex, gap, axis, endY, startX, startY, labelSize, textOptions, rect, alignment, path, isOutside, opposedPosition, categoryIndex) {
            var height = endY - startY;
            var padding = 10;
            var padding1;
            var padding2;
            var groupLabel = axis.multiLevelLabels[labelIndex];
            var categoryType = groupLabel.categories[categoryIndex].type;
            var y = rect.y + rect.height - endY;
            var scrollBarHeight = isOutside && ej2_base_1.isNullOrUndefined(axis.crossesAt) ? axis.scrollBarHeight : 0;
            scrollBarHeight = scrollBarHeight * (opposedPosition ? 1 : -1);
            var width = this.yAxisMultiLabelHeight[labelIndex] + padding;
            var x = (((!opposedPosition && isOutside) || (opposedPosition && !isOutside)) ? rect.x - startX -
                this.yAxisPrevHeight[labelIndex] : rect.x + startX + this.yAxisPrevHeight[labelIndex]) + scrollBarHeight;
            var borderType = categoryType ? categoryType : groupLabel.border.type;
            switch (borderType) {
                case 'WithoutTopandBottomBorder':
                case 'Rectangle':
                case 'WithoutTopBorder':
                    width = ((!opposedPosition && isOutside) || (opposedPosition && !isOutside)) ? -width : width;
                    path += 'M ' + x + ' ' + y + ' L ' + (x + width) + ' ' + y +
                        ' M ' + x + ' ' + (y + height) + ' L ' + (x + width) + ' ' + (y + height);
                    path += (borderType !== 'WithoutTopandBottomBorder') ? (' L' + ' ' + (x + width) + ' ' + y + ' ') : ' ';
                    path += (borderType === 'Rectangle') ? ('M ' + (x) + ' ' + (y + height) + 'L' + ' ' + (x) + ' ' + y + ' ') : ' ';
                    break;
                case 'Brace':
                    width = ((!opposedPosition && isOutside) || (opposedPosition && !isOutside)) ? width : -width;
                    path += 'M ' + (x) + ' ' + y + ' L ' + (x - width / 2) + ' ' + y + ' L ' + (x - width / 2) + ' ' +
                        (textOptions.y - labelSize.height / 2 - 4) + ' M ' + (x - width / 2) + ' ' +
                        (textOptions.y + labelSize.height / 4 + 2) +
                        ' L ' + (x - width / 2) + ' ' + (y + height) + ' L ' + (x) + ' ' + (y + height);
                    break;
                case 'CurlyBrace':
                    if ((!opposedPosition && isOutside) || (opposedPosition && !isOutside)) {
                        padding = -10;
                        padding1 = -15;
                        padding2 = -5;
                    }
                    else {
                        padding = 10;
                        padding1 = 15;
                        padding2 = 5;
                    }
                    if (alignment === 'Center') {
                        path += 'M ' + x + ' ' + y + ' C ' + x + ' ' + y + ' ' + (x + padding) + ' ' + y + ' ' + (x + padding) + ' ' + (y + 10)
                            + ' L ' + (x + padding) + ' ' + (y + (height - 10) / 2) + ' L ' + (x + padding1) + ' ' + (y + (height - 10) / 2 + 5)
                            + ' L ' + (x + padding) + ' ' + (y + (height - 10) / 2 + 10) + ' L ' + (x + padding) + ' ' + (y + (height - 10)) +
                            ' C ' + (x + padding) + ' ' + (y + (height - 10)) + ' ' + (x + padding2) + ' ' + (y + height) + ' '
                            + x + ' ' + (y + height);
                    }
                    else if (alignment === 'Far') {
                        path += 'M ' + x + ' ' + y + ' C ' + x + ' ' + y + ' ' + (x + padding) + ' ' + y + ' ' + (x + padding) + ' ' + (y + 10)
                            + ' L ' + (x + padding) + ' ' + (y + height - 20) + ' ' + ' L ' + (x + padding1) + ' ' + (y + (height - 15)) +
                            ' L ' + (x + padding) + ' ' + (y + (height - 10)) + ' L ' + (x + padding) + ' ' + (y + (height - 10)) +
                            ' C ' + (x + padding) + ' ' + (y + (height - 10)) + ' ' + (x + padding) + ' ' + (y + height) + ' ' + x + ' '
                            + (y + height);
                    }
                    else {
                        path += 'M ' + x + ' ' + y + ' C ' + x + ' ' + y + ' ' + (x + padding) + ' ' + y + ' ' + (x + padding) + ' ' + (y + 10)
                            + ' L ' + (x + padding1) + ' ' + (y + 15) +
                            ' L ' + (x + padding) + ' ' + (y + 20) + ' L ' + (x + padding) + ' ' + (y + (height - 10)) +
                            ' C ' + (x + padding) + ' ' + (y + (height - 10)) + ' ' + (x + padding2) + ' ' + (y + height) + ' ' + x +
                            ' ' + (y + height);
                    }
                    break;
            }
            return path;
        };
        MultiLevelLabel.prototype.createClipRect = function (x, y, height, width, clipId, axisId) {
            this.multiElements = this.chart.renderer.createGroup({
                'id': axisId,
                'clip-path': 'url(#' + clipId + ')'
            });
            if (!this.chart.enableCanvas) {
                this.multiElements.appendChild(helper_1.appendClipElement(this.chart.redraw, {
                    'id': clipId,
                    'x': x,
                    'y': y,
                    'width': width,
                    'height': height,
                    'fill': 'white',
                    'stroke-width': 1, 'stroke': 'Gray'
                }, this.chart.renderer));
            }
        };
        MultiLevelLabel.prototype.createBorderElement = function (borderIndex, axisIndex, axis, path, pointIndex) {
            var direction = path;
            var borderElement = this.chart.renderer.drawPath(new ej2_svg_base_1.PathOption(this.chart.element.id + axisIndex + '_Axis_MultiLevelLabel_Rect_' + borderIndex + '_' + pointIndex, 'Transparent', axis.multiLevelLabels[borderIndex].border.width, axis.multiLevelLabels[borderIndex].border.color || this.chart.themeStyle.axisLine, 1, '', path));
            borderElement.style.pointerEvents = 'none';
            helper_1.appendChildElement(this.chart.enableCanvas, this.labelElement, borderElement, this.chart.redraw, true, 'x', 'y', null, direction);
        };
        MultiLevelLabel.prototype.triggerMultiLabelRender = function (axis, text, textStyle, textAlignment, customAttributes) {
            var argsData = {
                cancel: false, name: constants_1.axisMultiLabelRender, axis: axis,
                text: text, textStyle: textStyle, alignment: textAlignment, customAttributes: customAttributes
            };
            this.chart.trigger(constants_1.axisMultiLabelRender, argsData);
            return argsData;
        };
        MultiLevelLabel.prototype.MultiLevelLabelClick = function (labelIndex, axisIndex) {
            var level = parseInt(labelIndex.substr(0, 1), 10);
            var textElement = parseInt(labelIndex.substr(7), 10);
            var chart = this.chart;
            var axis = chart.axisCollections[axisIndex];
            var categories = axis.multiLevelLabels[level].categories;
            var text = categories[textElement].text;
            var start = categories[textElement].start;
            var end = categories[textElement].end;
            var customAttributes = categories[textElement].customAttributes;
            var multilevelclickArgs = {
                axis: axis, level: level, text: text, customAttributes: customAttributes,
                start: start, end: end, name: constants_1.multiLevelLabelClick, cancel: false
            };
            this.chart.trigger(constants_1.multiLevelLabelClick, multilevelclickArgs);
            return multilevelclickArgs;
        };
        MultiLevelLabel.prototype.click = function (event) {
            var targetId = event.target.id;
            var multiLevelID = '_Axis_MultiLevelLabel_Level_';
            var textId;
            var elementId;
            var axisIndex;
            if (this.chart.enableCanvas) {
                for (var i = 0; i < this.multiLevelLabelRectXRegion.length; i++) {
                    if (helper_2.withInBounds(event['x'], event['y'], this.multiLevelLabelRectXRegion[i], this.multiLevelLabelRectXRegion[i].width, this.multiLevelLabelRectXRegion[i].height)) {
                        targetId = this.xLabelCollection[i].id;
                    }
                }
            }
            if (targetId.indexOf(multiLevelID) > -1) {
                textId = targetId.split(multiLevelID)[1];
                elementId = targetId.split(multiLevelID)[0];
                axisIndex = parseInt(elementId.charAt(elementId.length - 1), 10);
                this.MultiLevelLabelClick(textId, axisIndex);
            }
        };
        MultiLevelLabel.prototype.getModuleName = function () {
            return 'MultiLevelLabel';
        };
        MultiLevelLabel.prototype.destroy = function () {
        };
        return MultiLevelLabel;
    }());
    exports.MultiLevelLabel = MultiLevelLabel;
});
