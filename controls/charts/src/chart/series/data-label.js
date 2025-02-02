define(["require", "exports", "../../common/utils/helper", "../../common/utils/helper", "../../common/utils/helper", "@syncfusion/ej2-svg-base", "../../common/model/constants", "../../common/utils/helper", "@syncfusion/ej2-base", "../../common/utils/helper"], function (require, exports, helper_1, helper_2, helper_3, ej2_svg_base_1, constants_1, helper_4, ej2_base_1, helper_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DataLabel = (function () {
        function DataLabel(chart) {
            this.errorHeight = 0;
            this.chart = chart;
        }
        DataLabel.prototype.initPrivateVariables = function (series, marker) {
            var transform = '';
            var clipPath = '';
            var render = series.chart.renderer;
            var index = (series.index === undefined) ? series.category : series.index;
            if (series.chart.chartAreaType === 'Cartesian') {
                transform = 'translate(' + series.clipRect.x + ',' + (series.clipRect.y) + ')';
                clipPath = 'url(#' + this.chart.element.id + '_ChartSeriesClipRect_' + index + ')';
            }
            if (marker.dataLabel.visible) {
                series.shapeElement = render.createGroup({
                    'id': this.chart.element.id + 'ShapeGroup' + index,
                    'transform': transform,
                    'clip-path': 'url(#' + this.chart.element.id + '_ChartSeriesClipRect_' + index + ')'
                });
                series.textElement = render.createGroup({
                    'id': this.chart.element.id + 'TextGroup' + index,
                    'transform': transform,
                    'clip-path': clipPath
                });
            }
            this.markerHeight = ((series.type === 'Scatter' || marker.visible)) ? (marker.height / 2) : 0;
            this.commonId = this.chart.element.id + '_Series_' + index + '_Point_';
            this.calculateErrorHeight(series, series.marker.dataLabel.position);
            this.chartBackground = this.chart.chartArea.background === 'transparent' ?
                this.chart.background || this.chart.themeStyle.background : this.chart.chartArea.background;
        };
        DataLabel.prototype.calculateErrorHeight = function (series, position) {
            if (!series.errorBar.visible) {
                return null;
            }
            else if (series.errorBar.visible && this.chart.chartAreaType !== 'PolarRadar') {
                var direction = series.errorBar.direction;
                var positiveHeight = this.chart.errorBarModule.positiveHeight;
                var negativeHeight = this.chart.errorBarModule.negativeHeight;
                if (this.isRectSeries(series)) {
                    if (position === 'Top' || position === 'Auto') {
                        if (direction === 'Both' || direction === 'Minus') {
                            this.errorHeight = negativeHeight;
                        }
                        else {
                            this.errorHeight = 0;
                        }
                    }
                    if (position === 'Outer' || position === 'Auto') {
                        if (direction === 'Both' || direction === 'Plus') {
                            this.errorHeight = positiveHeight;
                        }
                        else {
                            this.errorHeight = 0;
                        }
                    }
                }
                else {
                    if (position === 'Top' || position === 'Outer' || position === 'Auto') {
                        if ((direction === 'Both' || direction === 'Plus') && (!series.chart.isTransposed)) {
                            this.errorHeight = positiveHeight;
                        }
                        else {
                            this.errorHeight = 0;
                        }
                    }
                    if (position === 'Bottom' || position === 'Auto') {
                        if (direction === 'Both' || direction === 'Minus') {
                            this.errorHeight = negativeHeight;
                        }
                        else {
                            this.errorHeight = 0;
                        }
                    }
                }
            }
            else {
                this.errorHeight = 0;
            }
        };
        DataLabel.prototype.isRectSeries = function (series) {
            return series.isRectSeries || series.type === 'RangeArea' || series.type === 'SplineRangeArea';
        };
        DataLabel.prototype.render = function (series, chart, dataLabel) {
            this.initPrivateVariables(series, series.marker);
            var rect;
            var labelLocation = { x: 0, y: 0 };
            var rgbValue;
            var contrast;
            var argsData;
            var border;
            var textSize;
            var angle;
            var degree;
            this.inverted = chart.requireInvertedAxis;
            this.yAxisInversed = series.yAxis.isAxisInverse;
            var redraw = chart.redraw;
            var isDataLabelOverlap = false;
            var coordinatesAfterRotation = [];
            var templateId = chart.element.id + '_Series_' +
                (series.index === undefined ? series.category : series.index) + '_DataLabelCollections';
            var element = ej2_base_1.createElement('div', {
                id: templateId
            });
            var visiblePoints = helper_2.getVisiblePoints(series);
            var point;
            var rectCenterX;
            var rectCenterY;
            for (var i = 0; i < visiblePoints.length; i++) {
                point = visiblePoints[i];
                if (!dataLabel.showZero && ((point.y !== 0) || (point.y === 0 && series.emptyPointSettings.mode === 'Zero'))) {
                    return null;
                }
                this.margin = dataLabel.margin;
                var labelText = [];
                var labelLength = void 0;
                var xPos = void 0;
                var yPos = void 0;
                var xValue = void 0;
                var yValue = void 0;
                var isRender = true;
                var clip = series.clipRect;
                var shapeRect = void 0;
                isDataLabelOverlap = false;
                angle = degree = dataLabel.angle;
                border = { width: dataLabel.border.width, color: dataLabel.border.color };
                var argsFont = (ej2_base_1.extend({}, ej2_base_1.getValue('properties', dataLabel.font), null, true));
                if ((point.symbolLocations.length && point.symbolLocations[0]) ||
                    (series.type === 'BoxAndWhisker' && point.regions.length)) {
                    labelText = helper_3.getLabelText(point, series, chart);
                    labelLength = labelText.length;
                    for (var i_1 = 0; i_1 < labelLength; i_1++) {
                        argsData = {
                            cancel: false, name: constants_1.textRender, series: series,
                            point: point, text: labelText[i_1], border: border,
                            color: dataLabel.fill, template: dataLabel.template, font: argsFont, location: labelLocation,
                            textSize: ej2_svg_base_1.measureText(labelText[i_1], dataLabel.font)
                        };
                        chart.trigger(constants_1.textRender, argsData);
                        if (!argsData.cancel) {
                            this.fontBackground = argsData.color;
                            this.isDataLabelShape(argsData);
                            this.markerHeight = series.type === 'Bubble' ? (point.regions[0].height / 2) : this.markerHeight;
                            if (argsData.template !== null) {
                                this.createDataLabelTemplate(element, series, dataLabel, point, argsData, i_1, redraw);
                            }
                            else {
                                textSize = ej2_svg_base_1.measureText(argsData.text, dataLabel.font);
                                rect = this.calculateTextPosition(point, series, textSize, dataLabel, i_1);
                                if (chart.chartAreaType === 'PolarRadar') {
                                    for (var _i = 0, _a = chart.chartAxisLayoutPanel.visibleAxisLabelRect; _i < _a.length; _i++) {
                                        var rectRegion = _a[_i];
                                        if (helper_1.isOverlap(new ej2_svg_base_1.Rect(rect.x, rect.y, rect.width, rect.height), rectRegion)) {
                                            isRender = false;
                                            break;
                                        }
                                    }
                                }
                                var actualRect = new ej2_svg_base_1.Rect(rect.x + clip.x, rect.y + clip.y, rect.width, rect.height);
                                if (dataLabel.enableRotation) {
                                    var rectCoordinates = this.getRectanglePoints(rect);
                                    rectCenterX = rect.x + (rect.width / 2);
                                    rectCenterY = (rect.y + (rect.height / 2));
                                    coordinatesAfterRotation = helper_5.getRotatedRectangleCoordinates(rectCoordinates, rectCenterX, rectCenterY, angle);
                                    isDataLabelOverlap = this.isDataLabelOverlapWithChartBound(coordinatesAfterRotation, chart, clip);
                                    if (!isDataLabelOverlap) {
                                        this.chart.rotatedDataLabelCollections.push(coordinatesAfterRotation);
                                        var currentPointIndex = this.chart.rotatedDataLabelCollections.length - 1;
                                        for (var index = currentPointIndex; index >= 0; index--) {
                                            if (this.chart.rotatedDataLabelCollections[currentPointIndex] &&
                                                this.chart.rotatedDataLabelCollections[index - 1] &&
                                                helper_5.isRotatedRectIntersect(this.chart.rotatedDataLabelCollections[currentPointIndex], this.chart.rotatedDataLabelCollections[index - 1])) {
                                                isDataLabelOverlap = true;
                                                this.chart.rotatedDataLabelCollections[currentPointIndex] = null;
                                                break;
                                            }
                                        }
                                    }
                                }
                                else {
                                    isDataLabelOverlap = helper_1.isCollide(this.chart.chartAreaType !== 'PolarRadar' && series.type.indexOf("Stacking") > -1 ?
                                        new ej2_svg_base_1.Rect(rect.x - 10, rect.y, rect.width, rect.height) : rect, chart.dataLabelCollections, clip);
                                }
                                if ((!isDataLabelOverlap || dataLabel.labelIntersectAction === 'None') && isRender) {
                                    chart.dataLabelCollections.push(actualRect);
                                    if (this.isShape) {
                                        shapeRect = chart.renderer.drawRectangle(new helper_1.RectOption(this.commonId + point.index + '_TextShape_' + i_1, argsData.color, argsData.border, dataLabel.opacity, rect, dataLabel.rx, dataLabel.ry), new Int32Array([clip.x, clip.y]));
                                        if (series.shapeElement) {
                                            series.shapeElement.appendChild(shapeRect);
                                        }
                                    }
                                    var backgroundColor = this.fontBackground === 'transparent' ? ((this.chart.theme.indexOf('Dark') > -1 || this.chart.theme == "HighContrast") ? 'black' : 'white') : this.fontBackground;
                                    rgbValue = helper_3.convertHexToColor(helper_3.colorNameToHex(backgroundColor));
                                    contrast = Math.round((rgbValue.r * 299 + rgbValue.g * 587 + rgbValue.b * 114) / 1000);
                                    xPos = (rect.x + this.margin.left + textSize.width / 2) + labelLocation.x;
                                    yPos = (rect.y + this.margin.top + textSize.height * 3 / 4) + labelLocation.y;
                                    labelLocation = { x: 0, y: 0 };
                                    if (angle !== 0 && dataLabel.enableRotation) {
                                        xValue = rectCenterX;
                                        yValue = rectCenterY;
                                        degree = (angle > 360) ? angle - 360 : (angle < -360) ? angle + 360 : angle;
                                    }
                                    else {
                                        degree = 0;
                                        xValue = rect.x;
                                        yValue = rect.y;
                                    }
                                    helper_3.textElement(chart.renderer, new ej2_svg_base_1.TextOption(this.commonId + point.index + '_Text_' + i_1, xPos, yPos, 'middle', argsData.text, 'rotate(' + degree + ',' + (xValue) + ',' + (yValue) + ')', 'auto', degree), argsData.font, argsData.font.color ||
                                        ((contrast >= 128 || series.type === 'Hilo') ? 'black' : 'white'), series.textElement, false, redraw, true, false, series.chart.duration, series.clipRect, null, null, chart.enableCanvas);
                                }
                            }
                        }
                    }
                }
            }
            if (element.childElementCount) {
                if (!chart.enableCanvas) {
                    helper_2.appendChildElement(chart.enableCanvas, helper_4.getElement(chart.element.id + '_Secondary_Element'), element, chart.redraw, false, 'x', 'y', null, '', false, false, null, chart.duration);
                }
                else {
                    helper_4.getElement(chart.element.id + '_Secondary_Element').appendChild(element);
                }
            }
        };
        DataLabel.prototype.getRectanglePoints = function (rect) {
            var loc1 = new helper_1.ChartLocation(rect.x, rect.y);
            var loc2 = new helper_1.ChartLocation(rect.x + rect.width, rect.y);
            var loc3 = new helper_1.ChartLocation(rect.x + rect.width, rect.y + rect.height);
            var loc4 = new helper_1.ChartLocation(rect.x, rect.y + rect.height);
            return [loc1, loc2, loc3, loc4];
        };
        DataLabel.prototype.isDataLabelOverlapWithChartBound = function (rectCoordinates, chart, clip) {
            for (var index = 0; index < rectCoordinates.length; index++) {
                if (!helper_4.withInBounds(rectCoordinates[index].x + clip.x, rectCoordinates[index].y + clip.y, chart.initialClipRect)) {
                    return true;
                }
            }
            return false;
        };
        DataLabel.prototype.createDataLabelTemplate = function (parentElement, series, dataLabel, point, data, labelIndex, redraw) {
            this.margin = { left: 0, right: 0, bottom: 0, top: 0 };
            var clip = series.clipRect;
            var childElement = helper_4.createTemplate(ej2_base_1.createElement('div', {
                id: this.chart.element.id + '_Series_' + (series.index === undefined ? series.category : series.index) + '_DataLabel_'
                    + point.index + (labelIndex ? ('_' + labelIndex) : ''),
                styles: 'position: absolute;background-color:' + data.color + ';' +
                    helper_4.getFontStyle(dataLabel.font) + ';border:' + data.border.width + 'px solid ' + data.border.color + ';'
            }), point.index, data.template, this.chart, point, series, this.chart.element.id + '_DataLabel', labelIndex);
            this.calculateTemplateLabelSize(parentElement, childElement, point, series, dataLabel, labelIndex, clip, redraw);
        };
        DataLabel.prototype.calculateTemplateLabelSize = function (parentElement, childElement, point, series, dataLabel, labelIndex, clip, redraw, isReactCallback) {
            var elementRect = helper_4.measureElementRect(childElement, redraw, isReactCallback);
            var rect = this.calculateTextPosition(point, series, { width: elementRect.width, height: elementRect.height }, dataLabel, labelIndex);
            var clipWidth = 0;
            var clipHeight = 0;
            var isOverlap = false;
            if (isReactCallback) {
                isOverlap = (elementRect.width === 0 || elementRect.height === 0);
            }
            childElement.style.left = ((this.chart.chartAreaType === 'PolarRadar' ? 0 : series.clipRect.x) + rect.x - clipWidth) + 'px';
            childElement.style.top = ((this.chart.chartAreaType === 'PolarRadar' ? 0 : series.clipRect.y) + rect.y + clipHeight) + 'px';
            var backgroundColor = this.fontBackground === 'transparent' ? (this.chart.theme.indexOf('Dark') > -1 ? 'black' : 'white') : this.fontBackground;
            var rgbValue = helper_3.convertHexToColor(helper_3.colorNameToHex(backgroundColor));
            var vAxis = series.chart.requireInvertedAxis ? series.xAxis : series.yAxis;
            var hAxis = series.chart.requireInvertedAxis ? series.yAxis : series.xAxis;
            childElement.style.color = dataLabel.font.color ||
                ((Math.round((rgbValue.r * 299 + rgbValue.g * 587 + rgbValue.b * 114) / 1000)) >= 128 ? 'black' : 'white');
            if (childElement.childElementCount && !isOverlap && (!helper_1.isCollide(rect, this.chart.dataLabelCollections, clip) ||
                dataLabel.labelIntersectAction === 'None') && (series.seriesType !== 'XY' || point.yValue === undefined ||
                helper_4.withIn(point.yValue, series.yAxis.visibleRange) || (series.type.indexOf('Stacking') > -1) ||
                (series.type.indexOf('100') > -1 && helper_4.withIn(series.stackedValues.endValues[point.index], series.yAxis.visibleRange))) &&
                helper_4.withIn(point.xValue, series.xAxis.visibleRange) && parseFloat(childElement.style.top) >= vAxis.rect.y &&
                parseFloat(childElement.style.left) >= hAxis.rect.x &&
                parseFloat(childElement.style.top) <= vAxis.rect.y + vAxis.rect.height &&
                parseFloat(childElement.style.left) <= hAxis.rect.x + hAxis.rect.width) {
                this.chart.dataLabelCollections.push(new ej2_svg_base_1.Rect(rect.x + clip.x, rect.y + clip.y, rect.width, rect.height));
                helper_2.appendChildElement(this.chart.enableCanvas, parentElement, childElement, redraw, true, 'left', 'top');
                if (series.animation.enable && this.chart.animateSeries && !this.chart.enableCanvas) {
                    this.doDataLabelAnimation(series, childElement);
                }
                else if (this.chart.enableCanvas) {
                    parentElement.appendChild(childElement);
                }
            }
        };
        DataLabel.prototype.calculateTextPosition = function (point, series, textSize, dataLabel, labelIndex) {
            var labelRegion = labelIndex > 1 ? (series.type === 'Candle') ? point.regions[1] : point.regions[0] : point.regions[0];
            if (labelIndex > 1 && series.type === 'HiloOpenClose') {
                labelRegion = (labelIndex === 2) ? point.regions[1] : point.regions[2];
            }
            var location;
            location = this.getLabelLocation(point, series, textSize, labelIndex);
            var padding = 5;
            var clipRect = series.clipRect;
            if (!this.chart.requireInvertedAxis || !this.isRectSeries(series) || series.type === 'BoxAndWhisker') {
                this.locationX = location.x;
                var alignmentValue = textSize.height + (this.borderWidth * 2) + this.markerHeight +
                    this.margin.bottom + this.margin.top + padding;
                location.y = (dataLabel.position === 'Auto') ? location.y :
                    this.calculateAlignment(alignmentValue, location.y, dataLabel.alignment, this.isRectSeries(series) ? point.yValue < 0 : false);
                location.y = (!this.isRectSeries(series) || series.type === 'BoxAndWhisker') ?
                    this.calculatePathPosition(location.y, dataLabel.position, series, point, textSize, labelIndex) :
                    this.calculateRectPosition(location.y, labelRegion, point.yValue < 0 !== this.yAxisInversed, dataLabel.position, series, textSize, labelIndex, point);
                if (this.isRectSeries(series) && this.chart.chartAreaType === 'PolarRadar') {
                    location = this.calculatePolarRectPosition(location, dataLabel.position, series, point, textSize, labelIndex, dataLabel.alignment, alignmentValue);
                }
            }
            else {
                this.locationY = location.y;
                var alignmentValue = textSize.width + this.borderWidth + this.margin.left + this.margin.right - padding;
                location.x = dataLabel.position === 'Auto' ? location.x :
                    this.calculateAlignment(alignmentValue, location.x, dataLabel.alignment, point.yValue < 0) +
                        (this.chart.chartAreaType !== "PolarRadar" && series.type.indexOf("Stacking") > -1 && point.yValue === 0 ? padding : 0);
                location.x = this.calculateRectPosition(location.x, labelRegion, point.yValue < 0 !== this.yAxisInversed, dataLabel.position, series, textSize, labelIndex, point);
            }
            var rect = helper_3.calculateRect(location, textSize, this.margin);
            if (!(dataLabel.enableRotation === true && dataLabel.angle !== 0) &&
                !((rect.y > (clipRect.y + clipRect.height)) || (rect.x > (clipRect.x + clipRect.width)) ||
                    (rect.x + rect.width < 0) || (rect.y + rect.height < 0))) {
                rect.x = rect.x < 0 ? padding : rect.x;
                rect.y = (rect.y < 0) && !(dataLabel.labelIntersectAction === 'None') ? padding : rect.y;
                rect.x -= (rect.x + rect.width) > (clipRect.x + clipRect.width) ? (rect.x + rect.width)
                    - (clipRect.x + clipRect.width) + padding : 0;
                rect.y -= (rect.y + rect.height) > (clipRect.y + clipRect.height) ? (rect.y + rect.height)
                    - (clipRect.y + clipRect.height) + padding : 0;
                this.fontBackground = this.fontBackground === 'transparent' ? this.chartBackground : this.fontBackground;
            }
            var dataLabelOutRegion;
            if (this.inverted && series.isRectSeries && (rect.x + rect.width > labelRegion.x + labelRegion.width)) {
                dataLabelOutRegion = true;
            }
            this.fontBackground = dataLabelOutRegion ? this.chartBackground : this.fontBackground;
            return rect;
        };
        DataLabel.prototype.calculatePolarRectPosition = function (location, position, series, point, size, labelIndex, alignment, alignmentValue) {
            var padding = 5;
            var columnRadius;
            var chartWidth = this.chart.availableSize.width;
            var alignmentSign = (alignment === 'Center') ? 0 : (alignment === 'Far' ? 1 : -1);
            var angle = (point.regionData.startAngle - 0.5 * Math.PI) + (point.regionData.endAngle - point.regionData.startAngle) / 2;
            if (labelIndex === 0) {
                columnRadius = point.regionData.radius < point.regionData.innerRadius ? point.regionData.innerRadius
                    : point.regionData.radius;
            }
            else {
                columnRadius = point.regionData.radius > point.regionData.innerRadius ? point.regionData.innerRadius
                    : point.regionData.radius;
            }
            this.fontBackground = this.fontBackground === 'transparent' ? this.chartBackground : this.fontBackground;
            if (series.drawType.indexOf('Stacking') > -1) {
                position = position === 'Outer' ? 'Top' : position;
            }
            else if (series.drawType.indexOf('Range') > -1) {
                position = (position === 'Outer' || position === 'Top') ? position : 'Auto';
            }
            if (position === 'Outer') {
                columnRadius = labelIndex === 0 ? columnRadius + 2 * padding + this.markerHeight :
                    columnRadius - 2 * padding - this.markerHeight;
            }
            else if (position === 'Middle') {
                columnRadius = columnRadius / 2 + padding;
                if (series.drawType === 'StackingColumn') {
                    columnRadius = point.regionData.innerRadius + ((point.regionData.radius - point.regionData.innerRadius) / 2)
                        + padding - (size.height / 2);
                }
            }
            else if (position === 'Top') {
                columnRadius = labelIndex === 0 ? columnRadius - 2 * padding - this.markerHeight :
                    columnRadius + 2 * padding + this.markerHeight;
            }
            else if (position === 'Bottom') {
                columnRadius = 2 * padding;
                columnRadius += (series.drawType === 'StackingColumn') ? (point.regionData.innerRadius + this.markerHeight) : 0;
            }
            else {
                if (labelIndex === 0) {
                    columnRadius = columnRadius >= series.chart.radius ? columnRadius - padding :
                        series.drawType === 'StackingColumn' ? columnRadius - 2 * padding : columnRadius + 2 * padding;
                }
                else {
                    columnRadius = columnRadius >= series.chart.radius ? columnRadius + padding : columnRadius - 2 * padding;
                }
            }
            columnRadius += (alignmentValue * alignmentSign);
            location.x = series.clipRect.width / 2 + series.clipRect.x + columnRadius * Math.cos(angle);
            if (series.drawType === 'StackingColumn') {
                location.x = location.x < chartWidth / 2 ? location.x + size.width / 2 :
                    (location.x > chartWidth / 2 ? location.x - size.width / 2 : location.x);
            }
            else if (series.drawType === 'Column') {
                location.x = location.x < chartWidth / 2 ? location.x - size.width / 2 :
                    (location.x > chartWidth / 2 ? location.x + size.width / 2 : location.x);
            }
            location.y = series.clipRect.height / 2 + series.clipRect.y + columnRadius * Math.sin(angle);
            return location;
        };
        DataLabel.prototype.getLabelLocation = function (point, series, textSize, labelIndex) {
            var location = new helper_1.ChartLocation(0, 0);
            var labelRegion = (series.type === 'Candle' && labelIndex > 1) ? point.regions[1] : point.regions[0];
            if (series.type === 'HiloOpenClose') {
                labelRegion = (labelIndex === 2) ? point.regions[1] : point.regions[2];
            }
            var xAxis = series.xAxis;
            var yAxis = series.yAxis;
            var isInverted = series.chart.requireInvertedAxis;
            if (series.type === 'BoxAndWhisker') {
                this.markerHeight = 0;
                switch (labelIndex) {
                    case 0:
                        location = helper_5.getPoint(point.xValue, point.median, xAxis, yAxis, isInverted);
                        break;
                    case 1:
                        location = helper_5.getPoint(point.xValue, point.maximum, xAxis, yAxis, isInverted);
                        break;
                    case 2:
                        location = helper_5.getPoint(point.xValue, point.minimum, xAxis, yAxis, isInverted);
                        break;
                    case 3:
                        location = helper_5.getPoint(point.xValue, point.upperQuartile, xAxis, yAxis, isInverted);
                        break;
                    case 4:
                        location = helper_5.getPoint(point.xValue, point.lowerQuartile, xAxis, yAxis, isInverted);
                        break;
                    default: {
                        location = helper_5.getPoint(point.xValue, point.outliers[labelIndex - 5], xAxis, yAxis, isInverted);
                        this.markerHeight = series.marker.height / 2;
                        break;
                    }
                }
                if (isInverted) {
                    location.y = point.regions[0].y + (point.regions[0].height / 2);
                }
                else {
                    location.x = point.regions[0].x + (point.regions[0].width / 2);
                }
            }
            else if (labelIndex === 0 || labelIndex === 1) {
                location = new helper_1.ChartLocation(point.symbolLocations[0].x, point.symbolLocations[0].y);
            }
            else if ((labelIndex === 2 || labelIndex === 3) && series.type === 'Candle') {
                location = new helper_1.ChartLocation(point.symbolLocations[1].x, point.symbolLocations[1].y);
            }
            else if (isInverted) {
                location = { x: labelRegion.x + (labelRegion.width) / 2, y: labelRegion.y };
            }
            else {
                location = { x: labelRegion.x + labelRegion.width, y: labelRegion.y + (labelRegion.height) / 2 };
            }
            if (labelIndex > 1 && series.type === 'HiloOpenClose') {
                if (series.chart.requireInvertedAxis) {
                    var height = labelRegion.height;
                    location.y = labelRegion.y + height / 2 + 2 * (labelIndex === 2 ? 1 : -1);
                }
                else {
                    var width = labelRegion.width;
                    location.x = labelRegion.x + width / 2 + 2 * (labelIndex === 2 ? 1 : -1);
                }
            }
            return location;
        };
        DataLabel.prototype.calculateRectPosition = function (labelLocation, rect, isMinus, position, series, textSize, labelIndex, point) {
            if (series.chart.chartAreaType === 'PolarRadar') {
                return null;
            }
            var padding = 5;
            var margin = this.margin;
            var textLength = !this.inverted ? textSize.height : textSize.width;
            var extraSpace = this.borderWidth + textLength / 2 + (position !== 'Outer' && series.type.indexOf('Column') > -1 &&
                (Math.abs(rect.height - textSize.height) < padding) ? 0 : padding);
            if (series.type === 'StackingColumn100' || series.type === 'StackingBar100') {
                position = (position === 'Outer') ? 'Top' : position;
            }
            else if (series.type.indexOf('Range') > -1) {
                position = (position === 'Outer' || position === 'Top') ? position : 'Auto';
            }
            else if (series.type === 'Waterfall') {
                position = position === 'Auto' ? 'Middle' : position;
            }
            switch (position) {
                case 'Bottom':
                    labelLocation = !this.inverted ?
                        isMinus ? (labelLocation - rect.height + extraSpace + margin.top) :
                            (labelLocation + rect.height - extraSpace - margin.bottom) :
                        isMinus ? (labelLocation + rect.width - extraSpace - margin.left) :
                            (labelLocation - rect.width + extraSpace + margin.right);
                    break;
                case 'Middle':
                    labelLocation = labelLocation = !this.inverted ?
                        (isMinus ? labelLocation - (rect.height / 2) : labelLocation + (rect.height / 2)) :
                        (isMinus ? labelLocation + (rect.width / 2) : labelLocation - (rect.width / 2));
                    break;
                case 'Auto':
                    labelLocation = this.calculateRectActualPosition(labelLocation, rect, isMinus, series, textSize, labelIndex, point);
                    break;
                default:
                    extraSpace += this.errorHeight;
                    labelLocation = this.calculateTopAndOuterPosition(labelLocation, rect, position, series, labelIndex, extraSpace, isMinus);
                    break;
            }
            var check = !this.inverted ? (labelLocation < rect.y || labelLocation > rect.y + rect.height) :
                (labelLocation < rect.x || labelLocation > rect.x + rect.width);
            this.fontBackground = check ?
                (this.fontBackground === 'transparent' ? this.chartBackground : this.fontBackground)
                : this.fontBackground === 'transparent' ? (point.color || series.interior) : this.fontBackground;
            var seriesLength = series.chart.series.length;
            if (position === 'Outer' && (series.type.indexOf('Stacking') > -1) && ((seriesLength - 1) > series.index)) {
                var nextSeries = void 0;
                var nextSeriesPoint = void 0;
                for (var i = series.index + 1; i < seriesLength; i++) {
                    nextSeries = series.chart.series[i];
                    nextSeriesPoint = nextSeries.points[point.index];
                    if ((nextSeries.type.indexOf('Stacking') > -1) && (nextSeries.type.indexOf('100') === -1)) {
                        this.fontBackground = (nextSeriesPoint && ((nextSeriesPoint.yValue < 0 && point.yValue < 0) ||
                            (nextSeriesPoint.yValue > 0 && point.yValue > 0))) ? (nextSeriesPoint ? nextSeriesPoint.color :
                            nextSeries.interior) : this.fontBackground;
                        break;
                    }
                }
            }
            return labelLocation;
        };
        DataLabel.prototype.calculatePathPosition = function (labelLocation, position, series, point, size, labelIndex) {
            var padding = 5;
            if ((series.type.indexOf('Area') > -1 && series.type !== 'RangeArea' && series.type !== 'SplineRangeArea')
                && this.yAxisInversed && series.marker.dataLabel.position !== 'Auto') {
                position = position === 'Top' ? 'Bottom' : position === 'Bottom' ? 'Top' : position;
            }
            this.fontBackground = this.fontBackground === 'transparent' ? this.chartBackground : this.fontBackground;
            switch (position) {
                case 'Top':
                case 'Outer':
                    labelLocation = labelLocation - this.markerHeight - this.borderWidth - size.height / 2 - this.margin.bottom - padding -
                        this.errorHeight;
                    break;
                case 'Bottom':
                    labelLocation = labelLocation + this.markerHeight + this.borderWidth + size.height / 2 + this.margin.top + padding +
                        this.errorHeight;
                    break;
                case 'Auto':
                    labelLocation = this.calculatePathActualPosition(labelLocation, this.markerHeight, series, point, size, labelIndex);
                    break;
            }
            return labelLocation;
        };
        DataLabel.prototype.isDataLabelShape = function (style) {
            this.isShape = (style.color !== 'transparent' || style.border.width > 0);
            this.borderWidth = style.border.width;
            if (!this.isShape) {
                this.margin = { left: 0, right: 0, bottom: 0, top: 0 };
            }
        };
        DataLabel.prototype.calculateRectActualPosition = function (labelLocation, rect, isMinus, series, size, labelIndex, point) {
            var location;
            var labelRect;
            var isOverLap = true;
            var position = 0;
            var collection = this.chart.dataLabelCollections;
            var finalPosition = series.type.indexOf('Range') !== -1 || series.type === 'Hilo' ? 2 : 4;
            while (isOverLap && position < finalPosition) {
                var actualPosition = this.getPosition(position);
                if (series.type.indexOf('Stacking') > -1 && actualPosition === 'Outer') {
                    actualPosition = 'Top';
                    position++;
                }
                location = this.calculateRectPosition(labelLocation, rect, isMinus, actualPosition, series, size, labelIndex, point);
                if (!this.inverted) {
                    labelRect = helper_3.calculateRect(new helper_1.ChartLocation(this.locationX, location), size, this.margin);
                    isOverLap = labelRect.y < 0 || helper_1.isCollide(labelRect, collection, series.clipRect) || labelRect.y > series.clipRect.height;
                }
                else {
                    labelRect = helper_3.calculateRect(new helper_1.ChartLocation(location, this.locationY), size, this.margin);
                    isOverLap = labelRect.x < 0 || helper_1.isCollide(labelRect, collection, series.clipRect) ||
                        labelRect.x + labelRect.width > series.clipRect.width;
                }
                position++;
            }
            return location;
        };
        DataLabel.prototype.calculateAlignment = function (value, labelLocation, alignment, isMinus) {
            switch (alignment) {
                case 'Far':
                    labelLocation = !this.inverted ? (isMinus ? labelLocation + value : labelLocation - value) :
                        (isMinus ? labelLocation - value : labelLocation + value);
                    break;
                case 'Near':
                    labelLocation = !this.inverted ? (isMinus ? labelLocation - value : labelLocation + value) :
                        (isMinus ? labelLocation + value : labelLocation - value);
                    break;
                case 'Center':
                    labelLocation = labelLocation;
                    break;
            }
            return labelLocation;
        };
        DataLabel.prototype.calculateTopAndOuterPosition = function (location, rect, position, series, index, extraSpace, isMinus) {
            var margin = this.margin;
            var top;
            switch (series.type) {
                case 'RangeColumn':
                case 'RangeArea':
                case 'SplineRangeArea':
                case 'Hilo':
                    top = (index === 0 && !this.yAxisInversed) || (index === 1 && this.yAxisInversed);
                    location = this.updateLabelLocation(position, location, extraSpace, margin, rect, top);
                    break;
                case 'Candle':
                    top = (index === 0 || index === 2) && !this.yAxisInversed
                        || (index === 1 || index === 3) && this.yAxisInversed;
                    location = this.updateLabelLocation(position, location, extraSpace, margin, rect, top, index > 1);
                    break;
                case 'HiloOpenClose':
                    if (index <= 1) {
                        top = (index === 0 && !this.yAxisInversed) || (index === 1 && this.yAxisInversed);
                        location = this.updateLabelLocation(position, location, extraSpace, margin, rect, top);
                    }
                    else {
                        if (this.yAxisInversed) {
                            location = !this.inverted ? location + extraSpace + margin.top : location - extraSpace - margin.right;
                        }
                        else {
                            location = !this.inverted ? location - extraSpace - margin.bottom : location + extraSpace + margin.left;
                        }
                    }
                    break;
                default:
                    if ((isMinus && position === 'Top') || (!isMinus && position === 'Outer')) {
                        location = !this.inverted ? location - extraSpace - margin.bottom - this.markerHeight :
                            location + extraSpace + margin.left + this.markerHeight;
                    }
                    else {
                        location = !this.inverted ? location + extraSpace + margin.top + this.markerHeight :
                            location - extraSpace - margin.right - this.markerHeight;
                    }
                    break;
            }
            return location;
        };
        DataLabel.prototype.updateLabelLocation = function (position, location, extraSpace, margin, rect, top, inside) {
            if (inside === void 0) { inside = false; }
            if (!this.inverted) {
                if (top) {
                    location = (position === 'Outer' && !inside) ? location - extraSpace - margin.bottom - this.markerHeight :
                        location + extraSpace + margin.top + this.markerHeight;
                }
                else {
                    location = (position === 'Outer' && !inside) ? location + rect.height + extraSpace + margin.top + this.markerHeight :
                        location + rect.height - extraSpace - margin.bottom - this.markerHeight;
                }
            }
            else {
                if (top) {
                    location = (position === 'Outer' && !inside) ? location + extraSpace + margin.left + this.markerHeight :
                        location - extraSpace - margin.right - this.markerHeight;
                }
                else {
                    location = (position === 'Outer' && !inside) ? location - rect.width - extraSpace - margin.right - this.markerHeight :
                        location - rect.width + extraSpace + margin.left + this.markerHeight;
                }
            }
            return location;
        };
        DataLabel.prototype.calculatePathActualPosition = function (y, markerSize, series, point, size, labelIndex) {
            var points = series.points;
            var index = point.index;
            var yValue = points[index].yValue;
            var position;
            var nextPoint = points.length - 1 > index ? points[index + 1] : null;
            var previousPoint = index > 0 ? points[index - 1] : null;
            var yLocation;
            var isOverLap = true;
            var labelRect;
            var isBottom;
            var positionIndex;
            var collection = this.chart.dataLabelCollections;
            if (series.type === 'Bubble') {
                position = 'Top';
            }
            else if (series.type.indexOf('Step') > -1) {
                position = 'Top';
                if (index) {
                    position = (!previousPoint || !previousPoint.visible || (yValue > previousPoint.yValue !== this.yAxisInversed)
                        || yValue === previousPoint.yValue) ? 'Top' : 'Bottom';
                }
            }
            else if (series.type === 'BoxAndWhisker') {
                if (labelIndex === 1 || labelIndex === 3 || labelIndex > 4) {
                    position = series.yAxis.isAxisInverse ? 'Bottom' : 'Top';
                }
                else if (labelIndex === 2 || labelIndex === 4) {
                    position = series.yAxis.isAxisInverse ? 'Top' : 'Bottom';
                }
                else {
                    isOverLap = false;
                    position = 'Middle';
                    yLocation = this.calculatePathPosition(y, position, series, point, size, labelIndex);
                }
            }
            else {
                if (index === 0) {
                    position = (!nextPoint || !nextPoint.visible || yValue > nextPoint.yValue ||
                        (yValue < nextPoint.yValue && this.yAxisInversed)) ? 'Top' : 'Bottom';
                }
                else if (index === points.length - 1) {
                    position = (!previousPoint || !previousPoint.visible || yValue > previousPoint.yValue ||
                        (yValue < previousPoint.yValue && this.yAxisInversed)) ? 'Top' : 'Bottom';
                }
                else {
                    if (!nextPoint.visible && !(previousPoint && previousPoint.visible)) {
                        position = 'Top';
                    }
                    else if (!nextPoint.visible || !previousPoint) {
                        position = (nextPoint.yValue > yValue || (previousPoint && previousPoint.yValue > yValue)) ?
                            'Bottom' : 'Top';
                    }
                    else {
                        var slope = (nextPoint.yValue - previousPoint.yValue) / 2;
                        var intersectY = (slope * index) + (nextPoint.yValue - (slope * (index + 1)));
                        position = !this.yAxisInversed ? intersectY < yValue ? 'Top' : 'Bottom' :
                            intersectY < yValue ? 'Bottom' : 'Top';
                    }
                }
            }
            isBottom = position === 'Bottom';
            positionIndex = ['Outer', 'Top', 'Bottom', 'Middle', 'Auto'].indexOf(position);
            while (isOverLap && positionIndex < 4) {
                yLocation = this.calculatePathPosition(y, this.getPosition(positionIndex), series, point, size, labelIndex);
                labelRect = helper_3.calculateRect(new helper_1.ChartLocation(this.locationX, yLocation), size, this.margin);
                isOverLap = labelRect.y < 0 || helper_1.isCollide(labelRect, collection, series.clipRect)
                    || (labelRect.y + labelRect.height) > series.clipRect.height;
                positionIndex = isBottom ? positionIndex - 1 : positionIndex + 1;
                isBottom = false;
            }
            return yLocation;
        };
        DataLabel.prototype.doDataLabelAnimation = function (series, element) {
            var shapeElements = series.shapeElement.childNodes;
            var textNode = series.textElement.childNodes;
            var delay = series.animation.delay + series.animation.duration;
            var duration = series.chart.animated ? series.chart.duration : 200;
            var location;
            var length = element ? 1 : textNode.length;
            var tempElement;
            for (var i = 0; i < length; i++) {
                tempElement = textNode[i];
                if (element) {
                    element.style.visibility = 'hidden';
                    helper_4.templateAnimate(element, delay, duration, 'ZoomIn');
                }
                else {
                    location = new helper_1.ChartLocation((+tempElement.getAttribute('x')) + ((+tempElement.getAttribute('width')) / 2), (+tempElement.getAttribute('y')) + ((+tempElement.getAttribute('height')) / 2));
                    helper_2.markerAnimate(tempElement, delay, duration, series, null, location, true);
                    if (shapeElements[i]) {
                        tempElement = shapeElements[i];
                        location = new helper_1.ChartLocation((+tempElement.getAttribute('x')) + ((+tempElement.getAttribute('width')) / 2), (+tempElement.getAttribute('y')) + ((+tempElement.getAttribute('height')) / 2));
                        helper_2.markerAnimate(tempElement, delay, duration, series, null, location, true);
                    }
                }
            }
        };
        DataLabel.prototype.getPosition = function (index) {
            return (['Outer', 'Top', 'Bottom', 'Middle', 'Auto'][index]);
        };
        DataLabel.prototype.getModuleName = function () {
            return 'DataLabel';
        };
        DataLabel.prototype.destroy = function () {
        };
        return DataLabel;
    }());
    exports.DataLabel = DataLabel;
});
