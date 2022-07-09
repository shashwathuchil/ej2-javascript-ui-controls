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
define(["require", "exports", "@syncfusion/ej2-base", "@syncfusion/ej2-svg-base", "../../common/utils/helper", "../../common/utils/helper", "../../common/utils/helper", "../../common/utils/helper", "../model/acc-base", "../../common/model/constants", "../../common/utils/helper", "./accumulation-base"], function (require, exports, ej2_base_1, ej2_svg_base_1, helper_1, helper_2, helper_3, helper_4, acc_base_1, constants_1, helper_5, accumulation_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AccumulationDataLabel = (function (_super) {
        __extends(AccumulationDataLabel, _super);
        function AccumulationDataLabel(accumulation) {
            var _this = _super.call(this, accumulation) || this;
            _this.rightSideRenderingPoints = [];
            _this.leftSideRenderingPoints = [];
            _this.id = accumulation.element.id + '_datalabel_Series_';
            if (accumulation.title) {
                var titleSize = ej2_svg_base_1.measureText(accumulation.title, accumulation.titleStyle);
                _this.titleRect = new ej2_svg_base_1.Rect(accumulation.availableSize.width / 2 - titleSize.width / 2, accumulation.margin.top, titleSize.width, titleSize.height);
            }
            return _this;
        }
        AccumulationDataLabel.prototype.getDataLabelPosition = function (point, dataLabel, textSize, points) {
            var radius = this.isCircular() ? (!this.isVariousRadius() ? this.accumulation.pieSeriesModule.labelRadius :
                this.accumulation.pieSeriesModule.getLabelRadius(this.accumulation.visibleSeries[0], point)) :
                this.getLabelDistance(point, dataLabel);
            this.getLabelRegion(point, dataLabel.position, textSize, radius, this.marginValue);
            point.labelAngle = point.midAngle;
            point.labelPosition = dataLabel.position;
            if (this.accumulation.enableSmartLabels) {
                this.getSmartLabel(point, dataLabel, textSize, points);
            }
        };
        AccumulationDataLabel.prototype.getLabelRegion = function (point, position, textSize, labelRadius, margin, endAngle) {
            if (endAngle === void 0) { endAngle = 0; }
            var labelAngle = endAngle || point.midAngle;
            var space = 10;
            var location = helper_1.degreeToLocation(labelAngle, labelRadius, this.isCircular() ? this.center :
                this.getLabelLocation(point, position));
            location.y = (position === 'Inside') ? (location.y - textSize.height / 2) : location.y;
            location.x = (position === 'Inside') ? (location.x - textSize.width / 2) : location.x;
            point.labelRegion = new ej2_svg_base_1.Rect(location.x, location.y, textSize.width + (margin * 2), textSize.height + (margin * 2));
            if (position === 'Outside') {
                point.labelRegion.y -= point.labelRegion.height / 2;
                if (labelAngle >= 90 && labelAngle <= 270) {
                    point.labelRegion.x -= (point.labelRegion.width + space);
                }
                else {
                    point.labelRegion.x += space;
                }
            }
        };
        AccumulationDataLabel.prototype.getSmartLabel = function (point, dataLabel, textSize, points) {
            var circular = this.isCircular();
            var labelRadius = circular ? this.radius : this.getLabelDistance(point, dataLabel);
            var connectorLength = circular ? (dataLabel.connectorStyle.length || '4%') :
                '0px';
            labelRadius += helper_1.stringToNumber(connectorLength, labelRadius);
            var previousPoint = this.findPreviousPoint(points, point.index, point.labelPosition);
            if (dataLabel.position === 'Inside') {
                point.labelRegion.height -= 4;
                point.labelRegion.width -= 4;
                if (previousPoint && previousPoint.labelRegion && (helper_1.isOverlap(point.labelRegion, previousPoint.labelRegion)
                    || this.isOverlapping(point, points)) || !circular && !helper_4.containsRect(point.region, point.labelRegion)) {
                    point.labelPosition = 'Outside';
                    if (!circular) {
                        labelRadius = this.getLabelDistance(point, dataLabel);
                    }
                    this.getLabelRegion(point, point.labelPosition, textSize, labelRadius, this.marginValue);
                    previousPoint = this.findPreviousPoint(points, point.index, point.labelPosition);
                    if (previousPoint && (helper_1.isOverlap(point.labelRegion, previousPoint.labelRegion) ||
                        this.isConnectorLineOverlapping(point, previousPoint))) {
                        this.setOuterSmartLabel(previousPoint, point, dataLabel.border.width, labelRadius, textSize, this.marginValue);
                    }
                }
            }
            else {
                if (previousPoint && previousPoint.labelRegion && (helper_1.isOverlap(point.labelRegion, previousPoint.labelRegion)
                    || this.isOverlapping(point, points) || this.isConnectorLineOverlapping(point, previousPoint))) {
                    this.setOuterSmartLabel(previousPoint, point, dataLabel.border.width, labelRadius, textSize, this.marginValue);
                }
            }
            if (this.isOverlapping(point, points) && (this.accumulation.type === 'Pyramid' || this.accumulation.type === 'Funnel')) {
                var position = 'OutsideLeft';
                var space = 10;
                var labelAngle = point.midAngle || 0;
                var labelRadius_1 = circular ? this.radius : this.getLabelDistance(point, dataLabel);
                var location_1 = helper_1.degreeToLocation(labelAngle, -labelRadius_1, this.isCircular() ? this.center :
                    this.getLabelLocation(point, position));
                point.labelRegion = new ej2_svg_base_1.Rect(location_1.x, location_1.y, textSize.width + (this.marginValue * 2), textSize.height + (this.marginValue * 2));
                point.labelRegion.y -= point.labelRegion.height / 2;
                point.labelRegion.x = point.labelRegion.x - space - point.labelRegion.width;
                if (previousPoint && previousPoint.labelRegion && (helper_1.isOverlap(point.labelRegion, previousPoint.labelRegion)
                    || this.isOverlapping(point, points) || this.isConnectorLineOverlapping(point, previousPoint))) {
                    this.setOuterSmartLabel(previousPoint, point, dataLabel.border.width, labelRadius_1, textSize, this.marginValue);
                }
            }
        };
        AccumulationDataLabel.prototype.move = function (e, x, y, isTouch) {
            var _this = this;
            if (e.target.textContent.indexOf('...') > -1) {
                var targetId = e.target.id.split(this.id);
                if (targetId.length === 2) {
                    var seriesIndex = parseInt(targetId[1].split('_text_')[0], 10);
                    var pointIndex = parseInt(targetId[1].split('_text_')[1], 10);
                    if (!isNaN(seriesIndex) && !isNaN(pointIndex)) {
                        if (isTouch) {
                            helper_3.removeElement(this.accumulation.element.id + '_EJ2_Datalabel_Tooltip');
                        }
                        var point = acc_base_1.getSeriesFromIndex(seriesIndex, (this.accumulation).visibleSeries).points[pointIndex];
                        helper_3.showTooltip(point.text || point.y.toString(), x, y, this.areaRect.width, this.accumulation.element.id + '_EJ2_Datalabel_Tooltip', helper_2.getElement(this.accumulation.element.id + '_Secondary_Element'));
                    }
                }
            }
            else {
                helper_3.removeElement(this.accumulation.element.id + '_EJ2_Datalabel_Tooltip');
            }
            if (isTouch) {
                clearTimeout(this.clearTooltip);
                this.clearTooltip = +setTimeout(function () { helper_3.removeElement(_this.accumulation.element.id + '_EJ2_Datalabel_Tooltip'); }, 1000);
            }
        };
        AccumulationDataLabel.prototype.findPreviousPoint = function (points, index, position) {
            var point = points[0];
            for (var i = index - 1; i >= 0; i--) {
                point = points[i];
                if (point.visible && point.labelVisible && point.labelRegion && point.labelPosition === position) {
                    return point;
                }
            }
            return null;
        };
        AccumulationDataLabel.prototype.isOverlapping = function (currentPoint, points) {
            for (var i = currentPoint.index - 1; i >= 0; i--) {
                if (points[i].visible && points[i].labelVisible && points[i].labelRegion && currentPoint.labelRegion &&
                    currentPoint.labelVisible && helper_1.isOverlap(currentPoint.labelRegion, points[i].labelRegion)) {
                    return true;
                }
            }
            return false;
        };
        AccumulationDataLabel.prototype.textTrimming = function (point, rect, font, position) {
            if (helper_1.isOverlap(point.labelRegion, rect)) {
                var size = point.labelRegion.width;
                if (position === 'Right') {
                    size = rect.x - point.labelRegion.x;
                }
                else if (position === 'Left') {
                    size = point.labelRegion.x - (rect.x + rect.width);
                    if (size < 0) {
                        size += point.labelRegion.width;
                        point.labelRegion.x = rect.x + rect.width;
                    }
                }
                else if (position === 'InsideRight') {
                    size = (rect.x + rect.width) - point.labelRegion.x;
                }
                else if (position === 'InsideLeft') {
                    size = (point.labelRegion.x + point.labelRegion.width) - rect.x;
                    if (size < point.labelRegion.width) {
                        point.labelRegion.x = rect.x;
                    }
                }
                else {
                    this.setPointVisibileFalse(point);
                }
                if (point.labelVisible && point.labelRegion) {
                    if (size < point.labelRegion.width) {
                        point.label = helper_2.textTrim(size - (this.marginValue * 2), point.label, font);
                        point.labelRegion.width = size;
                    }
                    if (point.label.length === 3 && point.label.indexOf('...') > -1) {
                        this.setPointVisibileFalse(point);
                    }
                }
            }
        };
        AccumulationDataLabel.prototype.setPointVisibileFalse = function (point) {
            point.labelVisible = false;
            point.labelRegion = null;
        };
        AccumulationDataLabel.prototype.setPointVisibleTrue = function (point) {
            point.labelVisible = true;
        };
        AccumulationDataLabel.prototype.setOuterSmartLabel = function (previousPoint, point, border, labelRadius, textsize, margin) {
            if (!this.isCircular()) {
                this.setSmartLabelForSegments(point, previousPoint);
            }
            else {
                var labelAngle = this.getOverlappedAngle(previousPoint.labelRegion, point.labelRegion, point.midAngle, border * 2);
                this.getLabelRegion(point, 'Outside', textsize, labelRadius, margin, labelAngle);
                if (labelAngle > point.endAngle) {
                    labelAngle = point.midAngle;
                }
                point.labelAngle = labelAngle;
                while (point.labelVisible && (helper_1.isOverlap(previousPoint.labelRegion, point.labelRegion) || labelAngle <= previousPoint.labelAngle
                    || this.isConnectorLineOverlapping(point, previousPoint))) {
                    if (labelAngle > point.endAngle) {
                        break;
                    }
                    point.labelAngle = labelAngle;
                    this.getLabelRegion(point, 'Outside', textsize, labelRadius, margin, labelAngle);
                    labelAngle += 0.1;
                }
            }
        };
        AccumulationDataLabel.prototype.setSmartLabelForSegments = function (point, prevPoint) {
            var textRegion = point.labelRegion;
            var overlapHeight = this.accumulation.type === 'Funnel' ?
                prevPoint.labelRegion.y - (textRegion.y + textRegion.height) :
                point.labelRegion.y - (prevPoint.labelRegion.y + prevPoint.labelRegion.height);
            if (overlapHeight < 0) {
                point.labelRegion.y += this.accumulation.type === 'Funnel' ? overlapHeight : -overlapHeight;
            }
        };
        AccumulationDataLabel.prototype.isConnectorLineOverlapping = function (point, previous) {
            var position;
            if (!this.isCircular() && point.labelRegion.x < point.region.x) {
                position = 'outsideLeft';
            }
            var start = this.getLabelLocation(point, position);
            var end = new helper_1.ChartLocation(0, 0);
            this.getEdgeOfLabel(point.labelRegion, point.labelAngle, end, 0, point);
            var previousstart = this.getLabelLocation(previous);
            var previousend = new helper_1.ChartLocation(0, 0);
            this.getEdgeOfLabel(previous.labelRegion, previous.labelAngle, previousend, 0, point);
            return this.isLineRectangleIntersect(start, end, point.labelRegion) ||
                this.isLineRectangleIntersect(start, end, previous.labelRegion) ||
                this.isLineRectangleIntersect(previousstart, previousend, point.labelRegion);
        };
        AccumulationDataLabel.prototype.isLineRectangleIntersect = function (line1, line2, rect) {
            var rectPoints = [
                new helper_1.ChartLocation(Math.round(rect.x), Math.round(rect.y)),
                new helper_1.ChartLocation(Math.round((rect.x + rect.width)), Math.round(rect.y)),
                new helper_1.ChartLocation(Math.round((rect.x + rect.width)), Math.round((rect.y + rect.height))),
                new helper_1.ChartLocation(Math.round(rect.x), Math.round((rect.y + rect.height)))
            ];
            line1.x = Math.round(line1.x);
            line1.y = Math.round(line1.y);
            line2.x = Math.round(line2.x);
            line2.y = Math.round(line2.y);
            for (var i = 0; i < rectPoints.length; i++) {
                if (this.isLinesIntersect(line1, line2, rectPoints[i], rectPoints[(i + 1) % rectPoints.length])) {
                    return true;
                }
            }
            return false;
        };
        AccumulationDataLabel.prototype.isLinesIntersect = function (point1, point2, point11, point12) {
            var a1 = point2.y - point1.y;
            var b1 = point1.x - point2.x;
            var c1 = a1 * point1.x + b1 * point1.y;
            var a2 = point12.y - point11.y;
            var b2 = point11.x - point12.x;
            var c2 = a2 * point11.x + b2 * point11.y;
            var delta = a1 * b2 - a2 * b1;
            if (delta !== 0) {
                var x = (b2 * c1 - b1 * c2) / delta;
                var y = (a1 * c2 - a2 * c1) / delta;
                var lies = Math.min(point1.x, point2.x) <= x && x <= Math.max(point1.x, point2.x);
                lies = lies && Math.min(point1.y, point2.y) <= y && y <= Math.max(point1.y, point2.y);
                lies = lies && Math.min(point11.x, point12.x) <= x && x <= Math.max(point11.x, point12.x);
                lies = lies && Math.min(point11.y, point12.y) <= y && y <= Math.max(point11.y, point12.y);
                return lies;
            }
            return false;
        };
        AccumulationDataLabel.prototype.getOverlappedAngle = function (first, second, angle, padding) {
            var x = first.x;
            if (angle >= 90 && angle <= 270) {
                second.y = first.y - (padding + second.height / 2);
                x = first.x + first.width;
            }
            else {
                second.y = first.y + first.height + padding;
            }
            return helper_1.getAngle(this.center, new helper_1.ChartLocation(x, second.y));
        };
        AccumulationDataLabel.prototype.getConnectorPath = function (label, point, dataLabel, end) {
            if (end === void 0) { end = 0; }
            var connector = dataLabel.connectorStyle;
            var labelRadius = this.isCircular() ? (!this.isVariousRadius() ? this.labelRadius :
                this.accumulation.pieSeriesModule.getLabelRadius(this.accumulation.visibleSeries[0], point)) :
                this.getLabelDistance(point, dataLabel);
            var start = this.getConnectorStartPoint(point, connector);
            var labelAngle = this.accumulation.enableSmartLabels ? point.midAngle : end || point.midAngle;
            var middle = new helper_1.ChartLocation(0, 0);
            var endPoint = this.getEdgeOfLabel(label, labelAngle, middle, connector.width, point);
            if (connector.type === 'Curve') {
                if (this.isCircular()) {
                    var r = labelRadius - (this.isVariousRadius() ? helper_1.stringToNumber(point.sliceRadius, this.accumulation.pieSeriesModule.seriesRadius) :
                        this.radius);
                    if (point.isLabelUpdated) {
                        middle = this.getPerpendicularDistance(start, point);
                    }
                    else {
                        middle = helper_1.degreeToLocation(labelAngle, labelRadius - (r / 2), this.center);
                        if (point.labelPosition === 'Outside' && dataLabel.position === 'Inside') {
                            middle = helper_1.degreeToLocation(labelAngle, labelRadius - r * 1.25, this.center);
                        }
                    }
                    return 'M ' + start.x + ' ' + start.y + ' Q ' + middle.x + ' ' + middle.y + ' ' + endPoint.x + ' ' + endPoint.y;
                }
                else {
                    return this.getPolyLinePath(start, endPoint);
                }
            }
            else {
                return 'M ' + start.x + ' ' + start.y + ' L ' + middle.x + ' ' + middle.y + ' L ' + endPoint.x + ' ' + endPoint.y;
            }
        };
        AccumulationDataLabel.prototype.getPolyLinePath = function (start, end) {
            var controlPoints = [start, end];
            if (start.y === end.y) {
                return 'M ' + start.x + ' ' + start.y + ' L ' + end.x + ' ' + end.y;
            }
            var path = 'M';
            for (var i = 0; i <= 16; i++) {
                var t = i / 16;
                var points = this.getBezierPoint(t, controlPoints, 0, 2);
                path += points.x + ',' + points.y;
                if (i !== 16) {
                    path += ' L';
                }
            }
            return path;
        };
        AccumulationDataLabel.prototype.getBezierPoint = function (t, controlPoints, index, count) {
            if (count === 1) {
                return controlPoints[index];
            }
            var p0 = this.getBezierPoint(t, controlPoints, index, count - 1);
            var p1 = this.getBezierPoint(t, controlPoints, index + 1, count - 1);
            var x = (p0.x) ? p0.x : p0.x;
            var y = (p0.y) ? p0.y : p0.y;
            var x1 = (p1.x) ? p1.x : p1.x;
            var y1 = (p1.y) ? p1.y : p1.y;
            var x2 = (1 - t) * x + t * x1;
            var y2 = (1 - t) * y + t * y1;
            if (p0.x) {
                return { x: x2, y: y2 };
            }
            else {
                return { x: x2, y: y2 };
            }
        };
        AccumulationDataLabel.prototype.getEdgeOfLabel = function (labelshape, angle, middle, border, point) {
            if (border === void 0) { border = 1; }
            var edge = new helper_1.ChartLocation(labelshape.x, labelshape.y);
            if (angle >= 90 && angle <= 270) {
                edge.x += labelshape.width + border / 2;
                edge.y += labelshape.height / 2;
                middle.x = edge.x + 10;
                middle.y = edge.y;
            }
            else if (point && point.region && point.region.x > point.labelRegion.x) {
                edge.x += border * 2 + labelshape.width;
                edge.y += labelshape.height / 2;
                middle.x = edge.x + 10;
                middle.y = edge.y;
            }
            else {
                edge.x -= border / 2;
                edge.y += labelshape.height / 2;
                middle.x = edge.x - 10;
                middle.y = edge.y;
            }
            return edge;
        };
        AccumulationDataLabel.prototype.getLabelDistance = function (point, dataLabel) {
            if (point.labelPosition && dataLabel.position !== point.labelPosition || dataLabel.connectorStyle.length) {
                var length_1 = helper_1.stringToNumber(dataLabel.connectorStyle.length || '70px', this.accumulation.initialClipRect.width);
                if (length_1 < this.accumulation.initialClipRect.width) {
                    return length_1;
                }
            }
            var position = point.labelPosition || dataLabel.position;
            var series = this.accumulation.visibleSeries[0];
            var extraSpace = (this.accumulation.initialClipRect.width - series.triangleSize.width) / 2;
            var labelLocation;
            switch (position) {
                case 'Inside':
                    return 0;
                case 'Outside':
                    labelLocation = point.symbolLocation.x + point.labelOffset.x;
                    return this.accumulation.initialClipRect.width - labelLocation - extraSpace;
            }
        };
        AccumulationDataLabel.prototype.getLabelLocation = function (point, position) {
            if (position === void 0) { position = 'Outside'; }
            if (this.accumulation.type !== 'Pie') {
                position = position === 'OutsideLeft' ? 'OutsideLeft' : point.labelPosition || position;
                var location_2 = {
                    x: point.symbolLocation.x,
                    y: point.symbolLocation.y - point.labelOffset.y
                };
                switch (position) {
                    case 'Inside':
                        location_2.y = point.region.y + point.region.height / 2;
                        break;
                    case 'Outside':
                        location_2.x += point.labelOffset.x;
                        break;
                    case 'OutsideLeft':
                        location_2.x -= point.labelOffset.x;
                }
                return location_2;
            }
            else {
                return helper_1.degreeToLocation(point.midAngle, (this.isVariousRadius() ? helper_1.stringToNumber(point.sliceRadius, this.accumulation.pieSeriesModule.seriesRadius) :
                    this.radius), this.center);
            }
        };
        AccumulationDataLabel.prototype.getConnectorStartPoint = function (point, connector) {
            var position;
            if (!this.isCircular() && point.region.x > point.labelRegion.x) {
                position = 'OutsideLeft';
            }
            return this.isCircular() ? helper_1.degreeToLocation(point.midAngle, (this.isVariousRadius() ? helper_1.stringToNumber(point.sliceRadius, this.accumulation.pieSeriesModule.seriesRadius) :
                this.radius) - connector.width, this.center) : this.getLabelLocation(point, position);
        };
        AccumulationDataLabel.prototype.findAreaRect = function () {
            this.areaRect = new ej2_svg_base_1.Rect(0, 0, this.accumulation.availableSize.width, this.accumulation.availableSize.height);
            var margin = this.accumulation.margin;
            helper_2.subtractThickness(this.areaRect, new helper_2.Thickness(margin.left, margin.right, margin.top, margin.bottom));
        };
        AccumulationDataLabel.prototype.renderDataLabel = function (point, dataLabel, parent, points, series, templateElement, redraw) {
            var id = this.accumulation.element.id + '_datalabel_Series_' + series + '_';
            var datalabelGroup = this.accumulation.renderer.createGroup({ id: id + 'g_' + point.index });
            point.label = point.originalText || point.y.toString();
            var border = { width: dataLabel.border.width, color: dataLabel.border.color };
            var argsFont = (ej2_base_1.extend({}, ej2_base_1.getValue('properties', dataLabel.font), null, true));
            var argsData = {
                cancel: false, name: constants_1.textRender, series: this.accumulation.visibleSeries[0], point: point,
                text: point.label, border: border, color: dataLabel.fill, template: dataLabel.template, font: argsFont
            };
            this.accumulation.trigger(constants_1.textRender, argsData);
            point.argsData = argsData;
            var isTemplate = argsData.template !== null;
            point.labelVisible = !argsData.cancel;
            point.text = point.label = argsData.text;
            if (Number(point.label)) {
                point.label = this.accumulation.intl.formatNumber(+point.label, {
                    useGrouping: this.accumulation.useGroupingSeparator
                });
            }
            this.marginValue = argsData.border.width ? (5 + argsData.border.width) : 1;
            var childElement = ej2_base_1.createElement('div', {
                id: this.accumulation.element.id + '_Series_' + 0 + '_DataLabel_' + point.index,
                styles: 'position: absolute;background-color:' + argsData.color + ';' +
                    helper_5.getFontStyle(dataLabel.font) + ';border:' + argsData.border.width + 'px solid ' + argsData.border.color + ';'
            });
            this.calculateLabelSize(isTemplate, childElement, point, points, argsData, datalabelGroup, id, dataLabel, redraw);
        };
        AccumulationDataLabel.prototype.calculateLabelSize = function (isTemplate, childElement, point, points, argsData, datalabelGroup, id, dataLabel, redraw, clientRect, isReactCallback) {
            var textSize = isTemplate ? (isReactCallback ? { width: clientRect.width, height: clientRect.height } : this.getTemplateSize(childElement, point, argsData, redraw, isTemplate, points, datalabelGroup, id, dataLabel)) : ej2_svg_base_1.measureText(point.label, dataLabel.font);
            textSize.height += 4;
            textSize.width += 4;
            point.textSize = textSize;
            point.templateElement = childElement;
            this.getDataLabelPosition(point, dataLabel, textSize, points);
            if (point.labelRegion) {
                this.correctLabelRegion(point.labelRegion, point.textSize);
            }
        };
        AccumulationDataLabel.prototype.drawDataLabels = function (series, dataLabel, parent, templateElement, redraw) {
            var angle;
            var degree;
            var modifiedPoints = series.leftSidePoints.concat(series.rightSidePoints);
            modifiedPoints.sort(function (a, b) { return a.index - b.index; });
            if (series.type === 'Pie' && this.accumulation.enableSmartLabels) {
                this.extendedLabelsCalculation();
            }
            for (var _i = 0, modifiedPoints_1 = modifiedPoints; _i < modifiedPoints_1.length; _i++) {
                var point = modifiedPoints_1[_i];
                if (!ej2_base_1.isNullOrUndefined(point.argsData) && !ej2_base_1.isNullOrUndefined(point.y)) {
                    this.finalizeDatalabels(point, modifiedPoints, dataLabel);
                    var id = this.accumulation.element.id + '_datalabel_Series_' + 0 + '_';
                    var datalabelGroup = this.accumulation.renderer.createGroup({ id: id + 'g_' + point.index });
                    var dataLabelElement = void 0;
                    var location_3 = void 0;
                    var element = void 0;
                    if (point.visible && point.labelVisible) {
                        angle = degree = dataLabel.angle;
                        if (point.argsData.template) {
                            this.setTemplateStyle(point.templateElement, point, templateElement, dataLabel.font.color, point.color, redraw);
                        }
                        else {
                            location_3 = new helper_1.ChartLocation(point.labelRegion.x + this.marginValue, point.labelRegion.y
                                + (point.textSize.height * 3 / 4) + this.marginValue);
                            element = helper_2.getElement(id + 'shape_' + point.index);
                            var startLocation = element ? new helper_1.ChartLocation(+element.getAttribute('x'), +element.getAttribute('y')) : null;
                            dataLabelElement = this.accumulation.renderer.drawRectangle(new helper_3.RectOption(id + 'shape_' + point.index, point.argsData.color, point.argsData.border, 1, point.labelRegion, dataLabel.rx, dataLabel.ry));
                            helper_1.appendChildElement(false, datalabelGroup, dataLabelElement, redraw, true, 'x', 'y', startLocation, null, false, false, null, this.accumulation.duration);
                            var textWidth = point.textSize.width;
                            var textHeight = point.textSize.height;
                            var rotate = void 0;
                            if (angle !== 0 && dataLabel.enableRotation) {
                                if (point.labelPosition === 'Outside') {
                                    degree = 0;
                                }
                                else {
                                    if (point.midAngle >= 90 && point.midAngle <= 270) {
                                        degree = point.midAngle + 180;
                                    }
                                    else {
                                        degree = point.midAngle;
                                    }
                                }
                                rotate = 'rotate(' + degree + ',' + (location_3.x + (textWidth / 2)) + ','
                                    + (location_3.y - (textHeight / 4)) + ')';
                            }
                            else {
                                if (angle) {
                                    degree = (angle > 360) ? angle - 360 : (angle < -360) ? angle + 360 : angle;
                                }
                                else {
                                    degree = 0;
                                }
                                rotate = 'rotate(' + degree + ',' + (location_3.x + (textWidth / 2)) + ',' + (location_3.y) + ')';
                            }
                            point.transform = rotate;
                            helper_3.textElement(this.accumulation.renderer, new ej2_svg_base_1.TextOption(id + 'text_' + point.index, location_3.x, location_3.y, this.accumulation.enableRtl ? 'end' : 'start', point.label, rotate, 'auto', degree), point.argsData.font, point.argsData.font.color || this.getSaturatedColor(point, point.argsData.color), datalabelGroup, false, redraw, true, false, this.accumulation.duration);
                            element = null;
                        }
                        if (this.accumulation.accumulationLegendModule && this.accumulation.legendSettings.visible && (dataLabel.position === 'Outside'
                            || this.accumulation.enableSmartLabels)) {
                            this.accumulation.visibleSeries[0].findMaxBounds(this.accumulation.visibleSeries[0].labelBound, point.labelRegion);
                        }
                        if (point.labelPosition === 'Outside') {
                            var element_1 = helper_2.getElement(id + 'connector_' + point.index);
                            var previousDirection = element_1 ? element_1.getAttribute('d') : '';
                            var pathElement = this.accumulation.renderer.drawPath(new ej2_svg_base_1.PathOption(id + 'connector_' + point.index, 'transparent', dataLabel.connectorStyle.width, dataLabel.connectorStyle.color || point.color, 1, dataLabel.connectorStyle.dashArray, this.getConnectorPath(ej2_base_1.extend({}, point.labelRegion, null, true), point, dataLabel, point.labelAngle)));
                            helper_1.appendChildElement(false, datalabelGroup, pathElement, redraw, true, null, null, null, previousDirection, false, false, null, this.accumulation.duration);
                        }
                        helper_1.appendChildElement(false, parent, datalabelGroup, redraw);
                    }
                }
            }
        };
        AccumulationDataLabel.prototype.finalizeDatalabels = function (point, points, dataLabel) {
            if (this.isOverlapping(point, points) ||
                (this.titleRect && point.labelRegion && helper_1.isOverlap(point.labelRegion, this.titleRect))) {
                if (this.isCircular() && point.labelPosition === 'Outside') {
                    this.setPointVisibileFalse(point);
                }
            }
            if (this.accumulation.accumulationLegendModule && this.accumulation.legendSettings.visible && point.labelVisible && point.labelRegion) {
                var rect = this.accumulation.accumulationLegendModule.legendBounds;
                if (this.accumulation.visibleSeries[0].type != "Pie" && this.accumulation.legendSettings.position == 'Left'
                    && dataLabel.position === 'Outside') {
                    point.labelRegion.x = point.labelRegion.x + rect.width;
                }
                var padding = this.accumulation.legendSettings.border.width / 2;
                this.textTrimming(point, new ej2_svg_base_1.Rect(rect.x - padding, rect.y - padding, rect.width + (2 * padding), rect.height + (2 * padding)), dataLabel.font, this.accumulation.accumulationLegendModule.position);
            }
            if (point.labelVisible && point.labelRegion) {
                var position = this.isCircular() ? (point.labelRegion.x >= this.center.x) ? 'InsideRight' : 'InsideLeft' :
                    (point.labelRegion.x >= point.region.x) ? 'InsideRight' : 'InsideLeft';
                this.textTrimming(point, this.areaRect, dataLabel.font, position);
            }
            if (point.labelVisible && point.labelRegion && ((point.labelRegion.y + point.labelRegion.height >
                this.areaRect.y + this.areaRect.height || point.labelRegion.y < this.areaRect.y) || (point.labelRegion.x < this.areaRect.x ||
                point.labelRegion.x + point.labelRegion.width > this.areaRect.x + this.areaRect.width))) {
                this.setPointVisibileFalse(point);
            }
        };
        AccumulationDataLabel.prototype.getTemplateSize = function (element, point, argsData, redraw, isTemplate, points, datalabelGroup, id, dataLabel) {
            element = helper_5.createTemplate(element, point.index, argsData.template, this.accumulation, point, this.accumulation.visibleSeries[0], this.accumulation.element.id + '_DataLabel', 0, argsData, isTemplate, points, datalabelGroup, id, dataLabel, redraw);
            var clientRect = helper_5.measureElementRect(element, redraw);
            return { width: clientRect.width, height: clientRect.height };
        };
        AccumulationDataLabel.prototype.setTemplateStyle = function (childElement, point, parent, labelColor, fill, redraw) {
            childElement.style.left = (point.labelRegion.x) + 'px';
            childElement.style.top = (point.labelRegion.y) + 'px';
            childElement.style.color = labelColor ||
                this.getSaturatedColor(point, fill);
            if (this.accumulation.isBlazor) {
                var position = this.isCircular() ? (point.labelRegion.x >= this.center.x) ? 'InsideRight' : 'InsideLeft' :
                    (point.labelRegion.x >= point.region.x) ? 'InsideRight' : 'InsideLeft';
                if (position === 'InsideRight') {
                    childElement.style.transform = 'translate(0%, -50%)';
                }
                else {
                    childElement.style.transform = 'translate(-100%, -50%)';
                }
            }
            if (childElement.childElementCount) {
                helper_1.appendChildElement(false, parent, childElement, redraw, true, 'left', 'top');
                this.doTemplateAnimation(this.accumulation, childElement);
            }
        };
        AccumulationDataLabel.prototype.getSaturatedColor = function (point, color) {
            var saturatedColor;
            if (this.marginValue >= 1) {
                saturatedColor = color === 'transparent' ? this.getLabelBackground(point) : color;
            }
            else {
                saturatedColor = this.getLabelBackground(point);
            }
            saturatedColor = (saturatedColor === 'transparent') ? ((this.accumulation.theme.indexOf('Dark') > -1 || this.accumulation.theme == "HighContrast") ? 'black' : 'white') : saturatedColor;
            var rgbValue = helper_4.convertHexToColor(helper_4.colorNameToHex(saturatedColor));
            var contrast = Math.round((rgbValue.r * 299 + rgbValue.g * 587 + rgbValue.b * 114) / 1000);
            return contrast >= 128 ? 'black' : 'white';
        };
        AccumulationDataLabel.prototype.doTemplateAnimation = function (accumulation, element) {
            var series = accumulation.visibleSeries[0];
            var delay = series.animation.delay + series.animation.duration;
            if (series.animation.enable && accumulation.animateSeries) {
                element.style.visibility = 'hidden';
                helper_5.templateAnimate(element, delay, 200, 'ZoomIn');
            }
        };
        AccumulationDataLabel.prototype.getLabelBackground = function (point) {
            return point.labelPosition === 'Outside' ?
                this.accumulation.background || this.accumulation.themeStyle.background : !point.y ? this.accumulation.theme.indexOf('dark') ? 'white' : 'black' : point.color;
        };
        AccumulationDataLabel.prototype.correctLabelRegion = function (labelRegion, textSize, padding) {
            if (padding === void 0) { padding = 4; }
            labelRegion.height -= padding;
            labelRegion.width -= padding;
            labelRegion.x += padding / 2;
            labelRegion.y += padding / 2;
            textSize.height -= padding;
            textSize.width -= padding;
        };
        AccumulationDataLabel.prototype.getModuleName = function () {
            return 'AccumulationDataLabel';
        };
        AccumulationDataLabel.prototype.destroy = function () {
        };
        AccumulationDataLabel.prototype.extendedLabelsCalculation = function () {
            var _this = this;
            var series = this.accumulation.series[0];
            series.rightSidePoints.forEach(function (point, index, halfSidePoints) {
                point.initialLabelRegion = point.labelRegion;
                point.isLabelUpdated = 0;
                _this.skipPoints(point, halfSidePoints, index);
            });
            series.leftSidePoints.forEach(function (point, index, halfSidePoints) {
                point.initialLabelRegion = point.labelRegion;
                point.isLabelUpdated = 0;
                _this.skipPoints(point, halfSidePoints, index);
            });
            this.arrangeLeftSidePoints(series);
            this.isIncreaseAngle = false;
            this.arrangeRightSidePoints(series);
        };
        AccumulationDataLabel.prototype.arrangeRightSidePoints = function (series) {
            var startFresh;
            var angleChanged;
            var rightSideRenderPoints = series.rightSidePoints.filter(function (point) { return (point.labelVisible && point.labelPosition === 'Outside'); });
            this.rightSideRenderingPoints = rightSideRenderPoints;
            var checkAngle;
            var currentPoint;
            var lastPoint = rightSideRenderPoints[rightSideRenderPoints.length - 1];
            var nextPoint;
            if (lastPoint) {
                if (lastPoint.labelAngle > 90 && lastPoint.labelAngle < 270) {
                    this.isIncreaseAngle = true;
                    this.changeLabelAngle(lastPoint, 89);
                }
            }
            for (var i = rightSideRenderPoints.length - 1; i >= 0; i--) {
                currentPoint = rightSideRenderPoints[i];
                nextPoint = rightSideRenderPoints[i + 1];
                if (this.isOverlapWithNext(currentPoint, rightSideRenderPoints, i) && currentPoint.labelVisible
                    || !(currentPoint.labelAngle <= 90 || currentPoint.labelAngle >= 270)) {
                    checkAngle = lastPoint.labelAngle + 10;
                    angleChanged = true;
                    if (startFresh) {
                        this.isIncreaseAngle = false;
                    }
                    else if (checkAngle > 90 && checkAngle < 270 && nextPoint.isLabelUpdated) {
                        this.isIncreaseAngle = true;
                    }
                    if (!this.isIncreaseAngle) {
                        for (var k = i + 1; k < rightSideRenderPoints.length; k++) {
                            this.increaseAngle(rightSideRenderPoints[k - 1], rightSideRenderPoints[k], series, true);
                        }
                    }
                    else {
                        for (var k = i + 1; k > 0; k--) {
                            this.decreaseAngle(rightSideRenderPoints[k], rightSideRenderPoints[k - 1], series, true);
                        }
                    }
                }
                else {
                    if (angleChanged && nextPoint && !nextPoint.isLabelUpdated) {
                        startFresh = true;
                    }
                }
            }
        };
        AccumulationDataLabel.prototype.arrangeLeftSidePoints = function (series) {
            var _this = this;
            var leftSideRenderPoints = series.leftSidePoints.filter(function (point) { return (point.labelVisible && point.labelPosition === 'Outside'); });
            this.leftSideRenderingPoints = leftSideRenderPoints;
            var previousPoint;
            var currentPoint;
            var angleChanged;
            var startFresh;
            for (var i = 0; i < leftSideRenderPoints.length; i++) {
                currentPoint = leftSideRenderPoints[i];
                previousPoint = leftSideRenderPoints[i - 1];
                if (this.isOverlapWithPrevious(currentPoint, leftSideRenderPoints, i) && currentPoint.labelVisible
                    || !(currentPoint.labelAngle < 270)) {
                    angleChanged = true;
                    if (startFresh) {
                        this.isIncreaseAngle = false;
                    }
                    if (!this.isIncreaseAngle) {
                        for (var k = i; k > 0; k--) {
                            this.decreaseAngle(leftSideRenderPoints[k], leftSideRenderPoints[k - 1], series, false);
                            leftSideRenderPoints.filter(function (point, index) {
                                if (point.isLabelUpdated && leftSideRenderPoints[index].labelAngle - 10 < 100) {
                                    _this.isIncreaseAngle = true;
                                }
                            });
                        }
                    }
                    else {
                        for (var k = i; k < leftSideRenderPoints.length; k++) {
                            this.increaseAngle(leftSideRenderPoints[k - 1], leftSideRenderPoints[k], series, false);
                        }
                    }
                }
                else {
                    if (angleChanged && previousPoint && previousPoint.isLabelUpdated) {
                        startFresh = true;
                    }
                }
            }
        };
        AccumulationDataLabel.prototype.decreaseAngle = function (currentPoint, previousPoint, series, isRightSide) {
            if (ej2_base_1.isNullOrUndefined(currentPoint) || ej2_base_1.isNullOrUndefined(previousPoint)) {
                return null;
            }
            var count = 1;
            if (isRightSide) {
                while (helper_1.isOverlap(currentPoint.labelRegion, previousPoint.labelRegion) || (!this.isVariousRadius() &&
                    !((previousPoint.labelRegion.height + previousPoint.labelRegion.y) < currentPoint.labelRegion.y))) {
                    var newAngle = previousPoint.midAngle - count;
                    if (newAngle < 0) {
                        newAngle = 360 + newAngle;
                    }
                    if (newAngle <= 270 && newAngle >= 90) {
                        newAngle = 270;
                        this.isIncreaseAngle = true;
                        break;
                    }
                    this.changeLabelAngle(previousPoint, newAngle);
                    count++;
                }
            }
            else {
                if (currentPoint.labelAngle > 270) {
                    this.changeLabelAngle(currentPoint, 270);
                    previousPoint.labelAngle = 270;
                }
                while (helper_1.isOverlap(currentPoint.labelRegion, previousPoint.labelRegion) || (!this.isVariousRadius() &&
                    ((currentPoint.labelRegion.y + currentPoint.labelRegion.height) > previousPoint.labelRegion.y))) {
                    var newAngle = previousPoint.midAngle - count;
                    if (!(newAngle <= 270 && newAngle >= 90)) {
                        newAngle = 90;
                        this.isIncreaseAngle = true;
                        break;
                    }
                    this.changeLabelAngle(previousPoint, newAngle);
                    if (helper_1.isOverlap(currentPoint.labelRegion, previousPoint.labelRegion) &&
                        !series.leftSidePoints.indexOf(previousPoint) && (newAngle - 1 < 90 && newAngle - 1 > 270)) {
                        this.changeLabelAngle(currentPoint, currentPoint.labelAngle + 1);
                        this.arrangeLeftSidePoints(series);
                        break;
                    }
                    count++;
                }
            }
        };
        AccumulationDataLabel.prototype.increaseAngle = function (currentPoint, nextPoint, series, isRightSide) {
            if (ej2_base_1.isNullOrUndefined(currentPoint) || ej2_base_1.isNullOrUndefined(nextPoint)) {
                return null;
            }
            var count = 1;
            if (isRightSide) {
                while (helper_1.isOverlap(currentPoint.labelRegion, nextPoint.labelRegion) || (!this.isVariousRadius() &&
                    !((currentPoint.labelRegion.y + currentPoint.labelRegion.height) < nextPoint.labelRegion.y))) {
                    var newAngle = nextPoint.midAngle + count;
                    if (newAngle < 270 && newAngle > 90) {
                        newAngle = 90;
                        this.isIncreaseAngle = true;
                        break;
                    }
                    this.changeLabelAngle(nextPoint, newAngle);
                    if (helper_1.isOverlap(currentPoint.labelRegion, nextPoint.labelRegion) && (newAngle + 1 > 90 && newAngle + 1 < 270) &&
                        this.rightSideRenderingPoints.indexOf(nextPoint) === this.rightSideRenderingPoints.length - 1) {
                        this.changeLabelAngle(currentPoint, currentPoint.labelAngle - 1);
                        nextPoint.labelRegion = nextPoint.initialLabelRegion;
                        this.arrangeRightSidePoints(series);
                        break;
                    }
                    count++;
                }
            }
            else {
                while (helper_1.isOverlap(currentPoint.labelRegion, nextPoint.labelRegion) || (!this.isVariousRadius() &&
                    (currentPoint.labelRegion.y < (nextPoint.labelRegion.y + nextPoint.labelRegion.height)))) {
                    var newAngle = nextPoint.midAngle + count;
                    if (!(newAngle < 270 && newAngle > 90)) {
                        newAngle = 270;
                        this.isIncreaseAngle = false;
                        break;
                    }
                    this.changeLabelAngle(nextPoint, newAngle);
                    count++;
                }
            }
        };
        AccumulationDataLabel.prototype.changeLabelAngle = function (currentPoint, newAngle) {
            var dataLabel = this.accumulation.series[0].dataLabel;
            var variableR;
            if (this.isVariousRadius()) {
                variableR = this.accumulation.pieSeriesModule.getLabelRadius(this.accumulation.visibleSeries[0], currentPoint);
            }
            var labelRadius = (currentPoint.labelPosition === 'Outside' && this.accumulation.enableSmartLabels &&
                dataLabel.position === 'Inside') ?
                this.radius + helper_1.stringToNumber(dataLabel.connectorStyle.length || '4%', this.accumulation.pieSeriesModule.size / 2) :
                (!this.isVariousRadius() ? this.accumulation.pieSeriesModule.labelRadius + 10 : variableR);
            var radius = (!this.isVariousRadius() ? labelRadius : variableR);
            this.getLabelRegion(currentPoint, 'Outside', currentPoint.textSize, radius, this.marginValue, newAngle);
            currentPoint.isLabelUpdated = 1;
            currentPoint.labelAngle = newAngle;
        };
        AccumulationDataLabel.prototype.isOverlapWithPrevious = function (currentPoint, points, currentPointIndex) {
            for (var i = 0; i < currentPointIndex; i++) {
                if (i !== points.indexOf(currentPoint) &&
                    points[i].visible && points[i].labelVisible && points[i].labelRegion && currentPoint.labelRegion &&
                    currentPoint.labelVisible && helper_1.isOverlap(currentPoint.labelRegion, points[i].labelRegion)) {
                    return true;
                }
            }
            return false;
        };
        AccumulationDataLabel.prototype.isOverlapWithNext = function (point, points, pointIndex) {
            for (var i = pointIndex; i < points.length; i++) {
                if (i !== points.indexOf(point) && points[i].visible && points[i].labelVisible && points[i].labelRegion &&
                    point.labelRegion && point.labelVisible && helper_1.isOverlap(point.labelRegion, points[i].labelRegion)) {
                    return true;
                }
            }
            return false;
        };
        AccumulationDataLabel.prototype.skipPoints = function (currentPoint, halfsidePoints, pointIndex) {
            if (pointIndex > 0 && ((currentPoint.midAngle < 285 && currentPoint.midAngle > 255) ||
                (currentPoint.midAngle < 105 && currentPoint.midAngle > 75))) {
                var previousPoint = halfsidePoints[pointIndex - 1];
                var angleDiff = currentPoint.endAngle % 360 - currentPoint.startAngle % 360;
                var prevAngleDiff = previousPoint.endAngle % 360 - previousPoint.startAngle % 360;
                if (prevAngleDiff <= angleDiff && angleDiff < 5 && previousPoint.labelVisible) {
                    this.setPointVisibleTrue(currentPoint);
                }
            }
            else if (pointIndex > 1 && ((currentPoint.midAngle < 300 && currentPoint.midAngle > 240) ||
                (currentPoint.midAngle < 120 && currentPoint.midAngle > 60))) {
                var prevPoint = halfsidePoints[pointIndex - 1];
                var secondPrevPoint = halfsidePoints[pointIndex - 2];
                var angleDiff = currentPoint.endAngle % 360 - currentPoint.startAngle % 360;
                var prevAngleDiff = prevPoint.endAngle % 360 - prevPoint.startAngle % 360;
                var thirdAngleDiff = secondPrevPoint.endAngle % 360 - secondPrevPoint.startAngle % 360;
                if (angleDiff < 3 && prevAngleDiff < 3 && thirdAngleDiff < 3 && prevPoint.labelVisible && currentPoint.labelVisible) {
                    this.setPointVisibleTrue(currentPoint);
                }
            }
        };
        AccumulationDataLabel.prototype.getPerpendicularDistance = function (startPoint, point) {
            var increasedLocation;
            var add = 10;
            var height = add + 10 * Math.sin(point.midAngle * Math.PI / 360);
            if (point.midAngle > 270 && point.midAngle < 360) {
                increasedLocation = new helper_1.ChartLocation(startPoint.x + height * (Math.cos((360 - point.midAngle) * Math.PI / 180)), startPoint.y - height * (Math.sin((360 - point.midAngle) * Math.PI / 180)));
            }
            else if (point.midAngle > 0 && point.midAngle < 90) {
                increasedLocation = new helper_1.ChartLocation(startPoint.x + height * (Math.cos((point.midAngle) * Math.PI / 180)), startPoint.y + height * (Math.sin((point.midAngle) * Math.PI / 180)));
            }
            else if (point.midAngle > 0 && point.midAngle < 90) {
                increasedLocation = new helper_1.ChartLocation(startPoint.x - height * (Math.cos((point.midAngle - 90) * Math.PI / 180)), startPoint.y + height * (Math.sin((point.midAngle - 90) * Math.PI / 180)));
            }
            else {
                increasedLocation = new helper_1.ChartLocation(startPoint.x - height * (Math.cos((point.midAngle - 180) * Math.PI / 180)), startPoint.y - height * (Math.sin((point.midAngle - 180) * Math.PI / 180)));
            }
            return increasedLocation;
        };
        return AccumulationDataLabel;
    }(accumulation_base_1.AccumulationBase));
    exports.AccumulationDataLabel = AccumulationDataLabel;
});
