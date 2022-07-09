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
define(["require", "exports", "@syncfusion/ej2-base", "@syncfusion/ej2-base", "@syncfusion/ej2-base", "../../common/model/base", "../../chart/axis/axis", "../model/constants", "@syncfusion/ej2-svg-base"], function (require, exports, ej2_base_1, ej2_base_2, ej2_base_3, base_1, axis_1, constants_1, ej2_svg_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function sort(data, fields, isDescending) {
        var sortData = ej2_base_2.extend([], data, null);
        sortData.sort(function (a, b) {
            var first = 0;
            var second = 0;
            for (var i = 0; i < fields.length; i++) {
                first += a[fields[i]];
                second += b[fields[i]];
            }
            if ((!isDescending && first < second) || (isDescending && first > second)) {
                return -1;
            }
            else if (first === second) {
                return 0;
            }
            return 1;
        });
        return sortData;
    }
    exports.sort = sort;
    function isBreakLabel(label) {
        return label.indexOf('<br>') !== -1;
    }
    exports.isBreakLabel = isBreakLabel;
    function getVisiblePoints(series) {
        var points = ej2_base_2.extend([], series.points, null, true);
        var tempPoints = [];
        var tempPoint;
        var pointIndex = 0;
        for (var i = 0; i < points.length; i++) {
            tempPoint = points[i];
            if (ej2_base_2.isNullOrUndefined(tempPoint.x) || tempPoint.x === '') {
                continue;
            }
            else {
                tempPoint.index = pointIndex++;
                tempPoints.push(tempPoint);
            }
        }
        return tempPoints;
    }
    exports.getVisiblePoints = getVisiblePoints;
    function rotateTextSize(font, text, angle, chart) {
        var renderer = new ej2_svg_base_1.SvgRenderer(chart.element.id);
        var labelText;
        var textCollection = [];
        var height;
        var dy;
        var label;
        var tspanElement;
        var options = {
            id: 'rotate_text',
            x: chart.initialClipRect.x,
            y: chart.initialClipRect.y,
            'font-size': font.size,
            'font-style': font.fontStyle,
            'font-family': font.fontFamily,
            'font-weight': font.fontWeight,
            'transform': 'rotate(' + angle + ', 0, 0)',
            'text-anchor': 'middle'
        };
        if (isBreakLabel(text)) {
            textCollection = text.split('<br>');
            labelText = textCollection[0];
        }
        else {
            labelText = text;
        }
        var htmlObject = renderer.createText(options, labelText);
        if (!chart.delayRedraw && !chart.redraw) {
            chart.element.appendChild(chart.svgObject);
        }
        if (typeof textCollection !== 'string' && textCollection.length > 1) {
            for (var i = 1, len = textCollection.length; i < len; i++) {
                height = (ej2_svg_base_1.measureText(textCollection[i], font).height);
                dy = (options.y) + ((i * height));
                label = textCollection[i];
                tspanElement = renderer.createTSpan({
                    'x': options.x, 'id': options.id,
                    'y': dy
                }, label);
                htmlObject.appendChild(tspanElement);
            }
        }
        chart.svgObject.appendChild(htmlObject);
        var box = htmlObject.getBoundingClientRect();
        ej2_base_3.remove(htmlObject);
        if (!chart.delayRedraw && !chart.redraw) {
            ej2_base_3.remove(chart.svgObject);
        }
        return new ej2_svg_base_1.Size((box.right - box.left), (box.bottom - box.top));
    }
    exports.rotateTextSize = rotateTextSize;
    function removeElement(id) {
        if (!id) {
            return null;
        }
        var element = typeof id === 'string' ? getElement(id) : id;
        if (element) {
            ej2_base_3.remove(element);
        }
    }
    exports.removeElement = removeElement;
    function logBase(value, base) {
        return Math.log(value) / Math.log(base);
    }
    exports.logBase = logBase;
    function showTooltip(text, x, y, areaWidth, id, element, isTouch, isTitleOrLegendEnabled) {
        var tooltip = document.getElementById(id);
        var size = ej2_svg_base_1.measureText(text, {
            fontFamily: 'Segoe UI', size: '12px',
            fontStyle: 'Normal', fontWeight: 'Regular'
        });
        var width = size.width + 5;
        x = (x + width > areaWidth) ? x - (width + 15) : x;
        y = isTitleOrLegendEnabled ? (y - size.height / 2) : y + 15;
        if (!tooltip) {
            tooltip = ej2_base_3.createElement('div', {
                innerHTML: text,
                id: id,
                styles: 'top:' + (y).toString() + 'px;left:' + (x + 15).toString() +
                    'px;background-color: rgb(255, 255, 255) !important; color:black !important; ' +
                    'position:absolute;border:1px solid rgb(112, 112, 112); padding-left : 3px; padding-right : 2px;' +
                    'padding-bottom : 2px; padding-top : 2px; font-size:12px; font-family: "Segoe UI"'
            });
            element.appendChild(tooltip);
            var left = parseInt(tooltip.style.left.replace('px', ''), 10);
            if (left < 0) {
                tooltip.style.left = '0px';
            }
        }
        else {
            tooltip.innerHTML = text;
            tooltip.style.top = (y).toString() + 'px';
            tooltip.style.left = (x + 15).toString() + 'px';
        }
        if (isTouch) {
            setTimeout(function () { removeElement(id); }, 1500);
        }
    }
    exports.showTooltip = showTooltip;
    function inside(value, range) {
        return (value < range.max) && (value > range.min);
    }
    exports.inside = inside;
    function withIn(value, range) {
        return (value <= range.max) && (value >= range.min);
    }
    exports.withIn = withIn;
    function logWithIn(value, axis) {
        return axis.valueType === 'Logarithmic' ? logBase(value, axis.logBase) : value;
    }
    exports.logWithIn = logWithIn;
    function withInRange(previousPoint, currentPoint, nextPoint, series) {
        var mX2 = logWithIn(currentPoint.xValue, series.xAxis);
        var mX1 = previousPoint ? logWithIn(previousPoint.xValue, series.xAxis) : mX2;
        var mX3 = nextPoint ? logWithIn(nextPoint.xValue, series.xAxis) : mX2;
        var xStart = Math.floor(series.xAxis.visibleRange.min);
        var xEnd = Math.ceil(series.xAxis.visibleRange.max);
        return ((mX1 >= xStart && mX1 <= xEnd) || (mX2 >= xStart && mX2 <= xEnd) ||
            (mX3 >= xStart && mX3 <= xEnd) || (xStart >= mX1 && xStart <= mX3));
    }
    exports.withInRange = withInRange;
    function sum(values) {
        var sum = 0;
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var value = values_1[_i];
            sum += value;
        }
        return sum;
    }
    exports.sum = sum;
    function subArraySum(values, first, last, index, series) {
        var sum = 0;
        if (index !== null) {
            for (var i = (first + 1); i < last; i++) {
                if (index.indexOf(i) === -1) {
                    sum += values[i][series.yName];
                }
            }
        }
        else {
            for (var i = (first + 1); i < last; i++) {
                if (!ej2_base_2.isNullOrUndefined(values[i][series.yName])) {
                    sum += values[i][series.yName];
                }
            }
        }
        return sum;
    }
    exports.subArraySum = subArraySum;
    function subtractThickness(rect, thickness) {
        rect.x += thickness.left;
        rect.y += thickness.top;
        rect.width -= thickness.left + thickness.right;
        rect.height -= thickness.top + thickness.bottom;
        return rect;
    }
    exports.subtractThickness = subtractThickness;
    function subtractRect(rect, thickness) {
        rect.x += thickness.x;
        rect.y += thickness.y;
        rect.width -= thickness.x + thickness.width;
        rect.height -= thickness.y + thickness.height;
        return rect;
    }
    exports.subtractRect = subtractRect;
    function degreeToLocation(degree, radius, center) {
        var radian = (degree * Math.PI) / 180;
        return new ChartLocation(Math.cos(radian) * radius + center.x, Math.sin(radian) * radius + center.y);
    }
    exports.degreeToLocation = degreeToLocation;
    function degreeToRadian(degree) {
        return degree * (Math.PI / 180);
    }
    exports.degreeToRadian = degreeToRadian;
    function getRotatedRectangleCoordinates(actualPoints, centerX, centerY, angle) {
        var coordinatesAfterRotation = [];
        for (var i = 0; i < 4; i++) {
            var point = actualPoints[i];
            var tempX = point.x - centerX;
            var tempY = point.y - centerY;
            var rotatedX = tempX * Math.cos(degreeToRadian(angle)) - tempY * Math.sin(degreeToRadian(angle));
            var rotatedY = tempX * Math.sin(degreeToRadian(angle)) + tempY * Math.cos(degreeToRadian(angle));
            point.x = rotatedX + centerX;
            point.y = rotatedY + centerY;
            coordinatesAfterRotation.push(new ChartLocation(point.x, point.y));
        }
        return coordinatesAfterRotation;
    }
    exports.getRotatedRectangleCoordinates = getRotatedRectangleCoordinates;
    function isRotatedRectIntersect(a, b) {
        var polygons = [a, b];
        var minA;
        var maxA;
        var projected;
        var i;
        var i1;
        var j;
        var minB;
        var maxB;
        for (i = 0; i < polygons.length; i++) {
            var polygon = polygons[i];
            for (i1 = 0; i1 < polygon.length; i1++) {
                var i2 = (i1 + 1) % polygon.length;
                var p1 = polygon[i1];
                var p2 = polygon[i2];
                var normal = new ChartLocation(p2.y - p1.y, p1.x - p2.x);
                minA = maxA = undefined;
                for (j = 0; j < a.length; j++) {
                    projected = normal.x * a[j].x + normal.y * a[j].y;
                    if (ej2_base_2.isNullOrUndefined(minA) || projected < minA) {
                        minA = projected;
                    }
                    if (ej2_base_2.isNullOrUndefined(maxA) || projected > maxA) {
                        maxA = projected;
                    }
                }
                minB = maxB = undefined;
                for (j = 0; j < b.length; j++) {
                    projected = normal.x * b[j].x + normal.y * b[j].y;
                    if (ej2_base_2.isNullOrUndefined(minB) || projected < minB) {
                        minB = projected;
                    }
                    if (ej2_base_2.isNullOrUndefined(maxB) || projected > maxB) {
                        maxB = projected;
                    }
                }
                if (maxA < minB || maxB < minA) {
                    return false;
                }
            }
        }
        return true;
    }
    exports.isRotatedRectIntersect = isRotatedRectIntersect;
    function getAccumulationLegend(locX, locY, r, height, width, mode) {
        var cartesianlarge = degreeToLocation(270, r, new ChartLocation(locX, locY));
        var cartesiansmall = degreeToLocation(270, r, new ChartLocation(locX + (width / 10), locY));
        return 'M' + ' ' + locX + ' ' + locY + ' ' + 'L' + ' ' + (locX + r) + ' ' + (locY) + ' ' + 'A' + ' ' + (r) + ' ' + (r) +
            ' ' + 0 + ' ' + 1 + ' ' + 1 + ' ' + cartesianlarge.x + ' ' + cartesianlarge.y + ' ' + 'Z' + ' ' + 'M' + ' ' + (locX +
            (width / 10)) + ' ' + (locY - (height / 10)) + ' ' + 'L' + (locX + (r)) + ' ' + (locY - height / 10) + ' ' + 'A' + ' '
            + (r) + ' ' + (r) + ' ' + 0 + ' ' + 0 + ' ' + 0 + ' ' + cartesiansmall.x + ' ' + cartesiansmall.y + ' ' + 'Z';
    }
    function getAngle(center, point) {
        var angle = Math.atan2((point.y - center.y), (point.x - center.x));
        angle = angle < 0 ? (6.283 + angle) : angle;
        return angle * (180 / Math.PI);
    }
    exports.getAngle = getAngle;
    function subArray(values, index) {
        var subArray = [];
        for (var i = 0; i <= index - 1; i++) {
            subArray.push(values[i]);
        }
        return subArray;
    }
    exports.subArray = subArray;
    function valueToCoefficient(value, axis) {
        var range = axis.visibleRange;
        var result = (value - range.min) / (range.delta);
        var isInverse = axis.isChart ? axis.isAxisInverse : axis.isInversed;
        return isInverse ? (1 - result) : result;
    }
    exports.valueToCoefficient = valueToCoefficient;
    function TransformToVisible(x, y, xAxis, yAxis, isInverted, series) {
        x = (xAxis.valueType === 'Logarithmic' ? logBase(x > 1 ? x : 1, xAxis.logBase) : x);
        y = (yAxis.valueType === 'Logarithmic' ?
            logBase(y > 1 ? y : 1, yAxis.logBase) : y);
        x += xAxis.valueType === 'Category' && xAxis.labelPlacement === 'BetweenTicks' && series.type !== 'Radar' ? 0.5 : 0;
        var radius = series.chart.radius * valueToCoefficient(y, yAxis);
        var point = CoefficientToVector(valueToPolarCoefficient(x, xAxis), series.chart.primaryXAxis.startAngle);
        return {
            x: (series.clipRect.width / 2 + series.clipRect.x) + radius * point.x,
            y: (series.clipRect.height / 2 + series.clipRect.y) + radius * point.y
        };
    }
    exports.TransformToVisible = TransformToVisible;
    function indexFinder(id, isPoint) {
        if (isPoint === void 0) { isPoint = false; }
        var ids = ['NaN', 'NaN'];
        if (id.indexOf('_Point_') > -1) {
            ids = id.split('_Series_')[1].split('_Point_');
        }
        else if (id.indexOf('_shape_') > -1 && (!isPoint || (isPoint && id.indexOf('_legend_') === -1))) {
            ids = id.split('_shape_');
            ids[0] = '0';
        }
        else if (id.indexOf('_text_') > -1 && (!isPoint || (isPoint && id.indexOf('_legend_') === -1))) {
            ids = id.split('_text_');
            ids[0] = '0';
        }
        return new base_1.Index(parseInt(ids[0], 10), parseInt(ids[1], 10));
    }
    exports.indexFinder = indexFinder;
    function CoefficientToVector(coefficient, startAngle) {
        startAngle = startAngle < 0 ? startAngle + 360 : startAngle;
        var angle = Math.PI * (1.5 - 2 * coefficient);
        angle = angle + (startAngle * Math.PI) / 180;
        return { x: Math.cos(angle), y: Math.sin(angle) };
    }
    exports.CoefficientToVector = CoefficientToVector;
    function valueToPolarCoefficient(value, axis) {
        var range = axis.visibleRange;
        var delta;
        var length;
        if (axis.valueType !== 'Category') {
            delta = (range.max - (axis.valueType === 'DateTime' ? axis.dateTimeInterval : range.interval)) - range.min;
            length = axis.visibleLabels.length - 1;
            delta = delta === 0 ? 1 : delta;
        }
        else {
            delta = axis.visibleLabels.length === 1 ? 1 :
                (axis.visibleLabels[axis.visibleLabels.length - 1].value - axis.visibleLabels[0].value);
            length = axis.visibleLabels.length;
        }
        return axis.isAxisInverse ? ((value - range.min) / delta) * (1 - 1 / (length)) :
            1 - ((value - range.min) / delta) * (1 - 1 / (length));
    }
    exports.valueToPolarCoefficient = valueToPolarCoefficient;
    var Mean = (function () {
        function Mean(verticalStandardMean, verticalSquareRoot, horizontalStandardMean, horizontalSquareRoot, verticalMean, horizontalMean) {
            this.verticalStandardMean = verticalStandardMean;
            this.horizontalStandardMean = horizontalStandardMean;
            this.verticalSquareRoot = verticalSquareRoot;
            this.horizontalSquareRoot = horizontalSquareRoot;
            this.verticalMean = verticalMean;
            this.horizontalMean = horizontalMean;
        }
        return Mean;
    }());
    exports.Mean = Mean;
    var PolarArc = (function () {
        function PolarArc(startAngle, endAngle, innerRadius, radius, currentXPosition) {
            this.startAngle = startAngle;
            this.endAngle = endAngle;
            this.innerRadius = innerRadius;
            this.radius = radius;
            this.currentXPosition = currentXPosition;
        }
        return PolarArc;
    }());
    exports.PolarArc = PolarArc;
    function createTooltip(id, text, top, left, fontSize) {
        var tooltip = getElement(id);
        var style = 'top:' + top.toString() + 'px;' +
            'left:' + left.toString() + 'px;' +
            'color:black !important; ' +
            'background:#FFFFFF !important; ' +
            'position:absolute;border:1px solid #707070;font-size:' + fontSize + ';border-radius:2px; z-index:1';
        if (!tooltip) {
            tooltip = ej2_base_3.createElement('div', {
                id: id, innerHTML: '&nbsp;' + text + '&nbsp;', styles: style
            });
            document.body.appendChild(tooltip);
        }
        else {
            tooltip.setAttribute('innerHTML', '&nbsp;' + text + '&nbsp;');
            tooltip.setAttribute('styles', style);
        }
    }
    exports.createTooltip = createTooltip;
    function createZoomingLabels(chart, axis, parent, index, isVertical, rect) {
        var margin = 5;
        var opposedPosition = axis.isAxisOpposedPosition;
        var anchor = isVertical ? 'start' : 'auto';
        var size;
        var chartRect = chart.availableSize.width;
        var pathElement;
        var x;
        var y;
        var rx = 3;
        var arrowLocation;
        var direction;
        var scrollBarHeight = axis.scrollbarSettings.enable || (axis.zoomingScrollBar && axis.zoomingScrollBar.svgObject)
            ? axis.scrollBarHeight : 0;
        for (var i = 0; i < 2; i++) {
            size = ej2_svg_base_1.measureText(i ? axis.endLabel : axis.startLabel, axis.labelStyle);
            if (isVertical) {
                arrowLocation = i ? new ChartLocation(rect.x - scrollBarHeight, rect.y + rx) :
                    new ChartLocation(axis.rect.x - scrollBarHeight, (rect.y + rect.height - rx));
                x = (rect.x + (opposedPosition ? (rect.width + margin + scrollBarHeight) : -(size.width + margin + margin + scrollBarHeight)));
                y = (rect.y + (i ? 0 : rect.height - size.height - margin));
                x += (x < 0 || ((chartRect) < (x + size.width + margin))) ? (opposedPosition ? -(size.width / 2) : size.width / 2) : 0;
                direction = findCrosshairDirection(rx, rx, new ej2_svg_base_1.Rect(x, y, size.width + margin, size.height + margin), arrowLocation, margin, false, false, !opposedPosition, arrowLocation.x, arrowLocation.y + (i ? -rx : rx));
            }
            else {
                arrowLocation = i ? new ChartLocation((rect.x + rect.width - rx), (rect.y + rect.height + scrollBarHeight)) :
                    new ChartLocation(rect.x + rx, (rect.y + rect.height + scrollBarHeight));
                x = (rect.x + (i ? (rect.width - size.width - margin) : 0));
                y = (opposedPosition ? (rect.y - size.height - 10 - scrollBarHeight) : (rect.y + rect.height + margin + scrollBarHeight));
                direction = findCrosshairDirection(rx, rx, new ej2_svg_base_1.Rect(x, y, size.width + margin, size.height + margin), arrowLocation, margin, opposedPosition, !opposedPosition, false, arrowLocation.x + (i ? rx : -rx), arrowLocation.y);
            }
            x = x + (margin / 2);
            y = y + (3 * (size.height / 4)) + (margin / 2);
            pathElement = chart.renderer.drawPath({
                'id': chart.element.id + '_Zoom_' + index + '_AxisLabel_Shape_' + i,
                'fill': chart.themeStyle.crosshairFill, 'width': 2, 'color': chart.themeStyle.crosshairFill,
                'opacity': 1, 'stroke-dasharray': null, 'd': direction
            }, null);
            parent.appendChild(pathElement);
            if (chart.theme === 'Fluent' || chart.theme === "FluentDark") {
                var shadowId = chart.element.id + '_shadow';
                pathElement.setAttribute('filter', ej2_base_1.Browser.isIE ? '' : 'url(#' + shadowId + ')');
                var shadow = '<filter id="' + shadowId + '" height="130%"><feGaussianBlur in="SourceAlpha" stdDeviation="3"/>';
                shadow += '<feOffset dx="3" dy="3" result="offsetblur"/><feComponentTransfer><feFuncA type="linear" slope="0.5"/>';
                shadow += '</feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>';
                var defElement = chart.renderer.createDefs();
                defElement.setAttribute('id', chart.element.id + 'SVG_tooltip_definition');
                parent.appendChild(defElement);
                defElement.innerHTML = shadow;
                pathElement.setAttribute('stroke', '#cccccc');
                pathElement.setAttribute('stroke-width', '0.5');
            }
            textElement(chart.renderer, new ej2_svg_base_1.TextOption(chart.element.id + '_Zoom_' + index + '_AxisLabel_' + i, x, y, anchor, i ? axis.endLabel : axis.startLabel), { color: chart.themeStyle.crosshairLabel, fontFamily: 'Segoe UI', fontWeight: 'Regular', size: '11px' }, chart.themeStyle.crosshairLabel, parent);
        }
        return parent;
    }
    exports.createZoomingLabels = createZoomingLabels;
    function findCrosshairDirection(rX, rY, rect, arrowLocation, arrowPadding, top, bottom, left, tipX, tipY) {
        var direction = '';
        var startX = rect.x;
        var startY = rect.y;
        var width = rect.x + rect.width;
        var height = rect.y + rect.height;
        if (top) {
            direction = direction.concat('M' + ' ' + (startX) + ' ' + (startY + rY) + ' Q ' + startX + ' '
                + startY + ' ' + (startX + rX) + ' ' + startY);
            direction = direction.concat(' L' + ' ' + (width - rX) + ' ' + (startY) + ' Q ' + width + ' '
                + startY + ' ' + (width) + ' ' + (startY + rY));
            direction = direction.concat(' L' + ' ' + (width) + ' ' + (height - rY) + ' Q ' + width + ' '
                + (height) + ' ' + (width - rX) + ' ' + (height));
            if (arrowPadding !== 0) {
                direction = direction.concat(' L' + ' ' + (arrowLocation.x + arrowPadding / 2) + ' ' + (height));
                direction = direction.concat(' L' + ' ' + (tipX) + ' ' + (height + arrowPadding)
                    + ' L' + ' ' + (arrowLocation.x - arrowPadding / 2) + ' ' + height);
            }
            if ((arrowLocation.x - arrowPadding / 2) > startX) {
                direction = direction.concat(' L' + ' ' + (startX + rX) + ' ' + height + ' Q ' + startX + ' '
                    + height + ' ' + (startX) + ' ' + (height - rY) + ' z');
            }
            else {
                if (arrowPadding === 0) {
                    direction = direction.concat(' L' + ' ' + (startX + rX) + ' ' + height + ' Q ' + startX + ' '
                        + height + ' ' + (startX) + ' ' + (height - rY) + ' z');
                }
                else {
                    direction = direction.concat(' L' + ' ' + (startX) + ' ' + (height + rY) + ' z');
                }
            }
        }
        else if (bottom) {
            direction = direction.concat('M' + ' ' + (startX) + ' ' + (startY + rY) + ' Q ' + startX + ' '
                + (startY) + ' ' + (startX + rX) + ' ' + (startY) + ' L' + ' ' + (arrowLocation.x - arrowPadding / 2) + ' ' + (startY));
            direction = direction.concat(' L' + ' ' + (tipX) + ' ' + (arrowLocation.y));
            direction = direction.concat(' L' + ' ' + (arrowLocation.x + arrowPadding / 2) + ' ' + (startY));
            direction = direction.concat(' L' + ' ' + (width - rX) + ' ' + (startY)
                + ' Q ' + (width) + ' ' + (startY) + ' ' + (width) + ' ' + (startY + rY));
            direction = direction.concat(' L' + ' ' + (width) + ' ' + (height - rY) + ' Q ' + (width) + ' '
                + (height) + ' ' + (width - rX) + ' ' + (height));
            direction = direction.concat(' L' + ' ' + (startX + rX) + ' ' + (height) + ' Q ' + (startX) + ' '
                + (height) + ' ' + (startX) + ' ' + (height - rY) + ' z');
        }
        else if (left) {
            direction = direction.concat('M' + ' ' + (startX) + ' ' + (startY + rY) + ' Q ' + startX + ' '
                + (startY) + ' ' + (startX + rX) + ' ' + (startY));
            direction = direction.concat(' L' + ' ' + (width - rX) + ' ' + (startY) + ' Q ' + (width) + ' '
                + (startY) + ' ' + (width) + ' ' + (startY + rY) + ' L' + ' ' + (width) + ' ' + (arrowLocation.y - arrowPadding / 2));
            direction = direction.concat(' L' + ' ' + (width + arrowPadding) + ' ' + (tipY));
            direction = direction.concat(' L' + ' ' + (width) + ' ' + (arrowLocation.y + arrowPadding / 2));
            direction = direction.concat(' L' + ' ' + (width) + ' ' + (height - rY) + ' Q ' + width + ' ' + (height) + ' ' + (width - rX) + ' ' + (height));
            direction = direction.concat(' L' + ' ' + (startX + rX) + ' ' + (height) + ' Q ' + startX + ' '
                + (height) + ' ' + (startX) + ' ' + (height - rY) + ' z');
        }
        else {
            direction = direction.concat('M' + ' ' + (startX + rX) + ' ' + (startY) + ' Q ' + (startX) + ' '
                + (startY) + ' ' + (startX) + ' ' + (startY + rY) + ' L' + ' ' + (startX) + ' ' + (arrowLocation.y - arrowPadding / 2));
            direction = direction.concat(' L' + ' ' + (startX - arrowPadding) + ' ' + (tipY));
            direction = direction.concat(' L' + ' ' + (startX) + ' ' + (arrowLocation.y + arrowPadding / 2));
            direction = direction.concat(' L' + ' ' + (startX) + ' ' + (height - rY) + ' Q ' + startX + ' '
                + (height) + ' ' + (startX + rX) + ' ' + (height));
            direction = direction.concat(' L' + ' ' + (width - rX) + ' ' + (height) + ' Q ' + width + ' '
                + (height) + ' ' + (width) + ' ' + (height - rY));
            direction = direction.concat(' L' + ' ' + (width) + ' ' + (startY + rY) + ' Q ' + width + ' '
                + (startY) + ' ' + (width - rX) + ' ' + (startY) + ' z');
        }
        return direction;
    }
    exports.findCrosshairDirection = findCrosshairDirection;
    function withInBounds(x, y, bounds, width, height) {
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        return (x >= bounds.x - width && x <= bounds.x + bounds.width + width && y >= bounds.y - height
            && y <= bounds.y + bounds.height + height);
    }
    exports.withInBounds = withInBounds;
    function getValueXByPoint(value, size, axis) {
        var actualValue = !axis.isAxisInverse ? value / size : (1 - (value / size));
        return actualValue * (axis.visibleRange.delta) + axis.visibleRange.min;
    }
    exports.getValueXByPoint = getValueXByPoint;
    function getValueYByPoint(value, size, axis) {
        var actualValue = axis.isAxisInverse ? value / size : (1 - (value / size));
        return actualValue * (axis.visibleRange.delta) + axis.visibleRange.min;
    }
    exports.getValueYByPoint = getValueYByPoint;
    function findClipRect(series, isCanvas) {
        if (isCanvas === void 0) { isCanvas = false; }
        var rect = series.clipRect;
        if (isCanvas && (series.type === 'Polar' || series.type === 'Radar')) {
            if (series.drawType === "Scatter") {
                rect.x = series.xAxis.rect.x;
                rect.y = series.yAxis.rect.y;
                rect.width = series.xAxis.rect.width;
                rect.height = series.yAxis.rect.height;
            }
            else {
                rect.x = series.xAxis.rect.x / 2;
                rect.y = series.yAxis.rect.y / 2;
                rect.width = series.xAxis.rect.width;
                rect.height = series.yAxis.rect.height;
            }
        }
        else {
            if (series.chart.requireInvertedAxis) {
                rect.x = series.yAxis.rect.x;
                rect.y = series.xAxis.rect.y;
                rect.width = series.yAxis.rect.width;
                rect.height = series.xAxis.rect.height;
            }
            else {
                rect.x = series.xAxis.rect.x;
                rect.y = series.yAxis.rect.y;
                rect.width = series.xAxis.rect.width;
                rect.height = series.yAxis.rect.height;
            }
        }
    }
    exports.findClipRect = findClipRect;
    function firstToLowerCase(str) {
        return str.substr(0, 1).toLowerCase() + str.substr(1);
    }
    exports.firstToLowerCase = firstToLowerCase;
    function getTransform(xAxis, yAxis, invertedAxis) {
        var x;
        var y;
        var width;
        var height;
        if (invertedAxis) {
            x = yAxis.rect.x;
            y = xAxis.rect.y;
            width = yAxis.rect.width;
            height = xAxis.rect.height;
        }
        else {
            x = xAxis.rect.x;
            y = yAxis.rect.y;
            width = xAxis.rect.width;
            height = yAxis.rect.height;
        }
        return new ej2_svg_base_1.Rect(x, y, width, height);
    }
    exports.getTransform = getTransform;
    function getMinPointsDelta(axis, seriesCollection) {
        var minDelta = Number.MAX_VALUE;
        var xValues;
        var minVal;
        var seriesMin;
        for (var index = 0; index < seriesCollection.length; index++) {
            var series = seriesCollection[index];
            xValues = [];
            if (series.visible &&
                (axis.name === series.xAxisName || (axis.name === 'primaryXAxis' && series.xAxisName === null)
                    || (axis.name === series.chart.primaryXAxis.name && !series.xAxisName))) {
                xValues = series.points.map(function (point) {
                    return point.xValue;
                });
                xValues.sort(function (first, second) { return first - second; });
                if (xValues.length === 1) {
                    seriesMin = (axis.valueType === 'DateTime' && series.xMin === series.xMax) ? (series.xMin - 2592000000) : series.xMin;
                    minVal = xValues[0] - (!ej2_base_2.isNullOrUndefined(seriesMin) ?
                        seriesMin : axis.visibleRange.min);
                    if (minVal !== 0) {
                        minDelta = Math.min(minDelta, minVal);
                    }
                }
                else {
                    for (var index_1 = 0; index_1 < xValues.length; index_1++) {
                        var value = xValues[index_1];
                        if (index_1 > 0 && value) {
                            minVal = value - xValues[index_1 - 1];
                            if (minVal !== 0) {
                                minDelta = Math.min(minDelta, minVal);
                            }
                        }
                    }
                }
            }
        }
        if (minDelta === Number.MAX_VALUE) {
            minDelta = 1;
        }
        return minDelta;
    }
    exports.getMinPointsDelta = getMinPointsDelta;
    function getAnimationFunction(effect) {
        var functionName;
        switch (effect) {
            case 'Linear':
                functionName = linear;
                break;
        }
        return functionName;
    }
    exports.getAnimationFunction = getAnimationFunction;
    function linear(currentTime, startValue, endValue, duration) {
        return -endValue * Math.cos(currentTime / duration * (Math.PI / 2)) + endValue + startValue;
    }
    exports.linear = linear;
    function markerAnimate(element, delay, duration, series, pointIndex, point, isLabel) {
        var centerX = point.x;
        var centerY = point.y;
        var height = 0;
        element.style.visibility = 'hidden';
        new ej2_base_1.Animation({}).animate(element, {
            duration: duration,
            delay: delay,
            progress: function (args) {
                if (args.timeStamp > args.delay) {
                    args.element.style.visibility = 'visible';
                    height = ((args.timeStamp - args.delay) / args.duration);
                    element.setAttribute('transform', 'translate(' + centerX
                        + ' ' + centerY + ') scale(' + height + ') translate(' + (-centerX) + ' ' + (-centerY) + ')');
                }
            },
            end: function () {
                element.style.visibility = '';
                if ((series.type === 'Scatter' || series.type === 'Bubble') && !isLabel && (pointIndex === series.points.length - 1)) {
                    series.chart.trigger('animationComplete', { series: series.chart.isBlazor ? {} : series });
                }
            }
        });
    }
    exports.markerAnimate = markerAnimate;
    function animateRectElement(element, delay, duration, currentRect, previousRect) {
        var setStyle = function (rect) {
            element.setAttribute('x', rect.x + '');
            element.setAttribute('y', rect.y + '');
            element.setAttribute('width', rect.width + '');
            element.setAttribute('height', rect.height + '');
        };
        new ej2_base_1.Animation({}).animate(ej2_base_3.createElement('div'), {
            duration: duration,
            delay: delay,
            progress: function (args) {
                setStyle(new ej2_svg_base_1.Rect(linear(args.timeStamp, previousRect.x, currentRect.x - previousRect.x, args.duration), linear(args.timeStamp, previousRect.y, currentRect.y - previousRect.y, args.duration), linear(args.timeStamp, previousRect.width, currentRect.width - previousRect.width, args.duration), linear(args.timeStamp, previousRect.height, currentRect.height - previousRect.height, args.duration)));
            },
            end: function () {
                setStyle(currentRect);
            }
        });
    }
    exports.animateRectElement = animateRectElement;
    function pathAnimation(element, direction, redraw, previousDirection, animateDuration) {
        if (!redraw || (!previousDirection && !element)) {
            return null;
        }
        var duration = 300;
        if (animateDuration) {
            duration = animateDuration;
        }
        var startDirections = previousDirection || element.getAttribute('d');
        var splitDirections = startDirections.split(/(?=[LMCZAQ])/);
        var endDirections = direction.split(/(?=[LMCZAQ])/);
        var currentDireciton;
        var startPath = [];
        var endPath = [];
        var c;
        var end;
        element.setAttribute('d', startDirections);
        new ej2_base_1.Animation({}).animate(ej2_base_3.createElement('div'), {
            duration: duration,
            progress: function (args) {
                currentDireciton = '';
                splitDirections.map(function (directions, index) {
                    startPath = directions.split(' ');
                    endPath = endDirections[index] ? endDirections[index].split(' ') : startPath;
                    if (startPath[0] === 'Z') {
                        currentDireciton += 'Z' + ' ';
                    }
                    else {
                        currentDireciton += startPath[0] + ' ' +
                            linear(args.timeStamp, +startPath[1], (+endPath[1] - +startPath[1]), args.duration) + ' ' +
                            linear(args.timeStamp, +startPath[2], (+endPath[2] - +startPath[2]), args.duration) + ' ';
                    }
                    if (startPath[0] === 'C' || startPath[0] === 'Q') {
                        c = 3;
                        end = startPath[0] === 'Q' ? 4 : 6;
                        while (c < end) {
                            currentDireciton += linear(args.timeStamp, +startPath[c], (+endPath[c] - +startPath[c]), args.duration) + ' ' +
                                linear(args.timeStamp, +startPath[++c], (+endPath[c] - +startPath[c]), args.duration) + ' ';
                            ++c;
                        }
                    }
                    if (startPath[0] === 'A') {
                        currentDireciton += 0 + ' ' + 0 + ' ' + 1 + ' ' +
                            linear(args.timeStamp, +startPath[6], (+endPath[6] - +startPath[6]), args.duration) + ' ' +
                            linear(args.timeStamp, +startPath[7], (+endPath[7] - +startPath[7]), args.duration) + ' ';
                    }
                });
                element.setAttribute('d', currentDireciton);
            },
            end: function () {
                element.setAttribute('d', direction);
            }
        });
    }
    exports.pathAnimation = pathAnimation;
    function appendClipElement(redraw, options, renderer, clipPath) {
        if (clipPath === void 0) { clipPath = 'drawClipPath'; }
        var clipElement = redrawElement(redraw, options.id, options, renderer);
        if (clipElement) {
            var def = renderer.createDefs();
            def.appendChild(clipElement);
            return def;
        }
        else {
            return renderer[clipPath](options);
        }
    }
    exports.appendClipElement = appendClipElement;
    function triggerLabelRender(chart, tempInterval, text, labelStyle, axis) {
        var argsData = {
            cancel: false, name: constants_1.axisLabelRender, axis: axis,
            text: text, value: tempInterval, labelStyle: labelStyle
        };
        chart.trigger(constants_1.axisLabelRender, argsData);
        if (!argsData.cancel) {
            var isLineBreakLabels = argsData.text.indexOf('<br>') !== -1;
            var text_1 = (axis.enableTrim) ? (isLineBreakLabels ?
                lineBreakLabelTrim(axis.maximumLabelWidth, argsData.text, axis.labelStyle) :
                textTrim(axis.maximumLabelWidth, argsData.text, axis.labelStyle)) : argsData.text;
            axis.visibleLabels.push(new axis_1.VisibleLabels(text_1, argsData.value, argsData.labelStyle, argsData.text));
        }
    }
    exports.triggerLabelRender = triggerLabelRender;
    function setRange(axis) {
        return (axis.minimum != null && axis.maximum != null);
    }
    exports.setRange = setRange;
    function isZoomSet(axis) {
        return (axis.zoomFactor < 1 && axis.zoomPosition >= 0);
    }
    exports.isZoomSet = isZoomSet;
    function getActualDesiredIntervalsCount(availableSize, axis) {
        var size = axis.orientation === 'Horizontal' ? availableSize.width : availableSize.height;
        if (ej2_base_2.isNullOrUndefined(axis.desiredIntervals)) {
            var desiredIntervalsCount = (axis.orientation === 'Horizontal' ? 0.533 : 1) * axis.maximumLabels;
            desiredIntervalsCount = Math.max((size * (desiredIntervalsCount / 100)), 1);
            return desiredIntervalsCount;
        }
        else {
            return axis.desiredIntervals;
        }
    }
    exports.getActualDesiredIntervalsCount = getActualDesiredIntervalsCount;
    function templateAnimate(element, delay, duration, name, isRemove) {
        new ej2_base_1.Animation({}).animate(element, {
            duration: duration,
            delay: delay,
            name: name,
            progress: function (args) {
                args.element.style.visibility = 'visible';
            },
            end: function (args) {
                if (isRemove) {
                    ej2_base_3.remove(args.element);
                }
                else {
                    args.element.style.visibility = 'visible';
                }
            }
        });
    }
    exports.templateAnimate = templateAnimate;
    function drawSymbol(location, shape, size, url, options, label, renderer, clipRect, isChartControl, control) {
        var chartRenderer = renderer ? renderer : new ej2_svg_base_1.SvgRenderer('');
        var shapeOption = calculateShapes(location, size, shape, options, url, isChartControl, control);
        var drawElement = chartRenderer['draw' + shapeOption.functionName](shapeOption.renderOption, clipRect ? new Int32Array([clipRect.x, clipRect.y]) : null);
        return drawElement;
    }
    exports.drawSymbol = drawSymbol;
    function calculateShapes(location, size, shape, options, url, isChart, control) {
        var dir;
        var functionName = 'Path';
        var isBulletChart = isChart;
        var width = (isBulletChart && shape === 'Circle') ? (size.width - 2) : size.width;
        var height = (isBulletChart && shape === 'Circle') ? (size.height - 2) : size.height;
        var sizeBullet = (isBulletChart) ? control.targetWidth : 0;
        var lx = location.x;
        var ly = location.y;
        var y = location.y + (-height / 2);
        var x = location.x + (-width / 2);
        var eq = 72;
        var xVal;
        var yVal;
        switch (shape) {
            case 'Bubble':
            case 'Circle':
                functionName = 'Ellipse';
                ej2_base_2.merge(options, { 'rx': width / 2, 'ry': height / 2, 'cx': lx, 'cy': ly });
                break;
            case 'Cross':
                dir = 'M' + ' ' + x + ' ' + ly + ' ' + 'L' + ' ' + (lx + (width / 2)) + ' ' + ly + ' ' +
                    'M' + ' ' + lx + ' ' + (ly + (height / 2)) + ' ' + 'L' + ' ' + lx + ' ' +
                    (ly + (-height / 2));
                ej2_base_2.merge(options, { 'd': dir, stroke: options.fill });
                break;
            case 'Multiply':
                dir = 'M ' + (lx - sizeBullet) + ' ' + (ly - sizeBullet) + ' L ' +
                    (lx + sizeBullet) + ' ' + (ly + sizeBullet) + ' M ' +
                    (lx - sizeBullet) + ' ' + (ly + sizeBullet) + ' L ' + (lx + sizeBullet) + ' ' + (ly - sizeBullet);
                ej2_base_2.merge(options, { 'd': dir, stroke: options.fill });
                break;
            case 'HorizontalLine':
                dir = 'M' + ' ' + x + ' ' + ly + ' ' + 'L' + ' ' + (lx + (width / 2)) + ' ' + ly;
                ej2_base_2.merge(options, { 'd': dir });
                break;
            case 'VerticalLine':
                dir = 'M' + ' ' + lx + ' ' + (ly + (height / 2)) + ' ' + 'L' + ' ' + lx + ' ' + (ly + (-height / 2));
                ej2_base_2.merge(options, { 'd': dir });
                break;
            case 'Diamond':
                dir = 'M' + ' ' + x + ' ' + ly + ' ' +
                    'L' + ' ' + lx + ' ' + (ly + (-height / 2)) + ' ' +
                    'L' + ' ' + (lx + (width / 2)) + ' ' + ly + ' ' +
                    'L' + ' ' + lx + ' ' + (ly + (height / 2)) + ' ' +
                    'L' + ' ' + x + ' ' + ly + ' z';
                ej2_base_2.merge(options, { 'd': dir });
                break;
            case 'ActualRect':
                dir = 'M' + ' ' + x + ' ' + (ly + (-height / 8)) + ' ' +
                    'L' + ' ' + (lx + (sizeBullet)) + ' ' + (ly + (-height / 8)) + ' ' +
                    'L' + ' ' + (lx + (sizeBullet)) + ' ' + (ly + (height / 8)) + ' ' +
                    'L' + ' ' + x + ' ' + (ly + (height / 8)) + ' ' +
                    'L' + ' ' + x + ' ' + (ly + (-height / 8)) + ' z';
                ej2_base_2.merge(options, { 'd': dir });
                break;
            case 'TargetRect':
                dir = 'M' + ' ' + (x + (sizeBullet)) + ' ' + (ly + (-height / 2)) + ' ' +
                    'L' + ' ' + (lx + (sizeBullet / 2)) + ' ' + (ly + (-height / 2)) + ' ' +
                    'L' + ' ' + (lx + (sizeBullet / 2)) + ' ' + (ly + (height / 2)) + ' ' +
                    'L' + ' ' + (x + (sizeBullet)) + ' ' + (ly + (height / 2)) + ' ' +
                    'L' + ' ' + (x + (sizeBullet)) + ' ' + (ly + (-height / 2)) + ' z';
                ej2_base_2.merge(options, { 'd': dir });
                break;
            case 'Rectangle':
            case 'Hilo':
            case 'HiloOpenClose':
            case 'Candle':
            case 'Waterfall':
            case 'BoxAndWhisker':
            case 'StepArea':
            case 'StackingStepArea':
            case 'Square':
            case 'Flag':
                dir = 'M' + ' ' + x + ' ' + (ly + (-height / 2)) + ' ' +
                    'L' + ' ' + (lx + (width / 2)) + ' ' + (ly + (-height / 2)) + ' ' +
                    'L' + ' ' + (lx + (width / 2)) + ' ' + (ly + (height / 2)) + ' ' +
                    'L' + ' ' + x + ' ' + (ly + (height / 2)) + ' ' +
                    'L' + ' ' + x + ' ' + (ly + (-height / 2)) + ' z';
                ej2_base_2.merge(options, { 'd': dir });
                break;
            case 'Pyramid':
            case 'Triangle':
                dir = 'M' + ' ' + x + ' ' + (ly + (height / 2)) + ' ' +
                    'L' + ' ' + lx + ' ' + (ly + (-height / 2)) + ' ' +
                    'L' + ' ' + (lx + (width / 2)) + ' ' + (ly + (height / 2)) + ' ' +
                    'L' + ' ' + x + ' ' + (ly + (height / 2)) + ' z';
                ej2_base_2.merge(options, { 'd': dir });
                break;
            case 'Funnel':
            case 'InvertedTriangle':
                dir = 'M' + ' ' + (lx + (width / 2)) + ' ' + (ly - (height / 2)) + ' ' +
                    'L' + ' ' + lx + ' ' + (ly + (height / 2)) + ' ' +
                    'L' + ' ' + (lx - (width / 2)) + ' ' + (ly - (height / 2)) + ' ' +
                    'L' + ' ' + (lx + (width / 2)) + ' ' + (ly - (height / 2)) + ' z';
                ej2_base_2.merge(options, { 'd': dir });
                break;
            case 'Pentagon':
                for (var i = 0; i <= 5; i++) {
                    xVal = (width / 2) * Math.cos((Math.PI / 180) * (i * eq));
                    yVal = (height / 2) * Math.sin((Math.PI / 180) * (i * eq));
                    if (i === 0) {
                        dir = 'M' + ' ' + (lx + xVal) + ' ' + (ly + yVal) + ' ';
                    }
                    else {
                        dir = dir.concat('L' + ' ' + (lx + xVal) + ' ' + (ly + yVal) + ' ');
                    }
                }
                dir = dir.concat('Z');
                ej2_base_2.merge(options, { 'd': dir });
                break;
            case 'Image':
                functionName = 'Image';
                ej2_base_2.merge(options, { 'href': url, 'height': height, 'width': width, x: x, y: y });
                break;
        }
        options = calculateLegendShapes(location, new ej2_svg_base_1.Size(width, height), shape, options).renderOption;
        return { renderOption: options, functionName: functionName };
    }
    exports.calculateShapes = calculateShapes;
    function getRectLocation(startLocation, endLocation, outerRect) {
        var x = (endLocation.x < outerRect.x) ? outerRect.x :
            (endLocation.x > (outerRect.x + outerRect.width)) ? outerRect.x + outerRect.width : endLocation.x;
        var y = (endLocation.y < outerRect.y) ? outerRect.y :
            (endLocation.y > (outerRect.y + outerRect.height)) ? outerRect.y + outerRect.height : endLocation.y;
        return new ej2_svg_base_1.Rect((x > startLocation.x ? startLocation.x : x), (y > startLocation.y ? startLocation.y : y), Math.abs(x - startLocation.x), Math.abs(y - startLocation.y));
    }
    exports.getRectLocation = getRectLocation;
    function minMax(value, min, max) {
        return value > max ? max : (value < min ? min : value);
    }
    exports.minMax = minMax;
    function getElement(id) {
        return document.getElementById(id);
    }
    exports.getElement = getElement;
    function getTemplateFunction(template) {
        var templateFn = null;
        try {
            if (document.querySelectorAll(template).length) {
                templateFn = ej2_base_1.compile(document.querySelector(template).innerHTML.trim());
            }
            else {
                templateFn = ej2_base_1.compile(template);
            }
        }
        catch (e) {
            templateFn = ej2_base_1.compile(template);
        }
        return templateFn;
    }
    exports.getTemplateFunction = getTemplateFunction;
    function accReactTemplate(childElement, chart, isTemplate, points, argsData, point, datalabelGroup, id, dataLabel, redraw) {
        var clientRect = childElement.getBoundingClientRect();
        chart.accumulationDataLabelModule.calculateLabelSize(isTemplate, childElement, point, points, argsData, datalabelGroup, id, dataLabel, redraw, clientRect, true);
    }
    exports.accReactTemplate = accReactTemplate;
    function chartReactTemplate(childElement, chart, point, series, labelIndex, redraw) {
        var parentElement = document.getElementById(chart.element.id + '_Series_' + (series.index === undefined ? series.category : series.index) + '_DataLabelCollections');
        if (parentElement) {
            if (point.index === 0) {
                chart.dataLabelCollections = [];
            }
            chart.dataLabelModule.calculateTemplateLabelSize(parentElement, childElement, point, series, series.marker.dataLabel, labelIndex, series.clipRect, redraw, true);
        }
    }
    exports.chartReactTemplate = chartReactTemplate;
    function createTemplate(childElement, pointIndex, content, chart, point, series, dataLabelId, labelIndex, argsData, isTemplate, points, datalabelGroup, id, dataLabel, redraw) {
        var templateFn = getTemplateFunction(content);
        var templateElement;
        try {
            var blazor = 'Blazor';
            var tempObject = window[blazor] ? (dataLabelId ? point : { point: point }) :
                { chart: chart, series: series, point: point };
            var templateId = dataLabelId ? dataLabelId + '_template' : 'template';
            var elementData = templateFn ? templateFn(tempObject, chart, templateId, dataLabelId ||
                childElement.id.replace(/[^a-zA-Z0-9]/g, '')) : [];
            if (elementData.length) {
                templateElement = Array.prototype.slice.call(elementData);
                var len = templateElement.length;
                for (var i = 0; i < len; i++) {
                    childElement.appendChild(templateElement[i]);
                }
            }
            var reactCallback = void 0;
            if (chart.getModuleName() === 'accumulationchart') {
                reactCallback = accReactTemplate.bind(this, childElement, chart, isTemplate, points, argsData, points[pointIndex], datalabelGroup, id, dataLabel, redraw);
                if (chart.isReact) {
                    chart.renderReactTemplates(reactCallback);
                }
            }
            else if (chart.getModuleName() === 'chart') {
                reactCallback = (point && series) ? chartReactTemplate.bind(this, childElement, chart, point, series, labelIndex, redraw) : reactCallback;
                if (chart.isReact) {
                    chart.renderReactTemplates(reactCallback);
                }
            }
        }
        catch (e) {
            return childElement;
        }
        return childElement;
    }
    exports.createTemplate = createTemplate;
    function getFontStyle(font) {
        var style = '';
        style = 'font-size:' + font.size +
            '; font-style:' + font.fontStyle + '; font-weight:' + font.fontWeight +
            '; font-family:' + font.fontFamily + ';opacity:' + font.opacity +
            '; color:' + font.color + ';';
        return style;
    }
    exports.getFontStyle = getFontStyle;
    function measureElementRect(element, redraw, isReactCallback) {
        if (redraw === void 0) { redraw = false; }
        if (!isReactCallback) {
            document.body.appendChild(element);
        }
        var bounds = element.getBoundingClientRect();
        if (redraw) {
            ej2_base_3.remove(element);
        }
        else if (!isReactCallback) {
            removeElement(element.id);
        }
        return bounds;
    }
    exports.measureElementRect = measureElementRect;
    function findlElement(elements, id) {
        var element;
        for (var i = 0, length_1 = elements.length; i < length_1; i++) {
            if (elements[i].id.indexOf(id) > -1) {
                element = elements[i];
                continue;
            }
        }
        return element;
    }
    exports.findlElement = findlElement;
    function getPoint(x, y, xAxis, yAxis, isInverted) {
        x = ((xAxis.valueType === 'Logarithmic') ?
            logBase(((x > 0) ? x : Math.pow(xAxis.logBase, xAxis.visibleRange.min)), xAxis.logBase) : x);
        y = ((yAxis.valueType === 'Logarithmic') ?
            logBase(((y > 0) ? y : Math.pow(yAxis.logBase, yAxis.visibleRange.min)), yAxis.logBase) : y);
        x = valueToCoefficient(x, xAxis);
        y = valueToCoefficient(y, yAxis);
        var xLength = (isInverted ? xAxis.rect.height : xAxis.rect.width);
        var yLength = (isInverted ? yAxis.rect.width : yAxis.rect.height);
        var locationX = isInverted ? y * (yLength) : x * (xLength);
        var locationY = isInverted ? (1 - x) * (xLength) : (1 - y) * (yLength);
        return new ChartLocation(locationX, locationY);
    }
    exports.getPoint = getPoint;
    function appendElement(child, parent, redraw, animate, x, y) {
        if (redraw === void 0) { redraw = false; }
        if (animate === void 0) { animate = false; }
        if (x === void 0) { x = 'x'; }
        if (y === void 0) { y = 'y'; }
        if (child && child.hasChildNodes() && parent) {
            appendChildElement(false, parent, child, redraw, animate, x, y);
        }
        else {
            return null;
        }
    }
    exports.appendElement = appendElement;
    function appendChildElement(isCanvas, parent, childElement, redraw, isAnimate, x, y, start, direction, forceAnimate, isRect, previousRect, animateDuration) {
        if (isAnimate === void 0) { isAnimate = false; }
        if (x === void 0) { x = 'x'; }
        if (y === void 0) { y = 'y'; }
        if (forceAnimate === void 0) { forceAnimate = false; }
        if (isRect === void 0) { isRect = false; }
        if (previousRect === void 0) { previousRect = null; }
        if (isCanvas) {
            return null;
        }
        var existChild = parent.querySelector('#' + childElement.id);
        var element = (existChild || getElement(childElement.id));
        var child = childElement;
        var duration = animateDuration ? animateDuration : 300;
        if (redraw && isAnimate && element) {
            start = start || (element.tagName === 'DIV' ?
                new ChartLocation(+(element.style[x].split('px')[0]), +(element.style[y].split('px')[0])) :
                new ChartLocation(+element.getAttribute(x), +element.getAttribute(y)));
            if (direction && direction !== 'undefined') {
                pathAnimation(childElement, childElement.getAttribute('d'), redraw, direction, duration);
            }
            else if (isRect && previousRect) {
                animateRectElement(child, 0, duration, new ej2_svg_base_1.Rect(+element.getAttribute('x'), +element.getAttribute('y'), +element.getAttribute('width'), +element.getAttribute('height')), previousRect);
            }
            else {
                var end = child.tagName === 'DIV' ?
                    new ChartLocation(+(child.style[x].split('px')[0]), +(child.style[y].split('px')[0])) :
                    new ChartLocation(+child.getAttribute(x), +child.getAttribute(y));
                animateRedrawElement(child, duration, start, end, x, y);
            }
        }
        else if (redraw && isAnimate && !element && forceAnimate) {
            templateAnimate(child, 0, 600, 'FadeIn');
        }
        if (existChild) {
            parent.replaceChild(child, element);
        }
        else {
            parent.appendChild(child);
        }
    }
    exports.appendChildElement = appendChildElement;
    function getDraggedRectLocation(x1, y1, x2, y2, outerRect) {
        var width = Math.abs(x1 - x2);
        var height = Math.abs(y1 - y2);
        var x = Math.max(checkBounds(Math.min(x1, x2), width, outerRect.x, outerRect.width), outerRect.x);
        var y = Math.max(checkBounds(Math.min(y1, y2), height, outerRect.y, outerRect.height), outerRect.y);
        return new ej2_svg_base_1.Rect(x, y, Math.min(width, outerRect.width), Math.min(height, outerRect.height));
    }
    exports.getDraggedRectLocation = getDraggedRectLocation;
    function checkBounds(start, size, min, max) {
        if (start < min) {
            start = min;
        }
        else if ((start + size) > (max + min)) {
            start = (max + min) - size;
        }
        return start;
    }
    exports.checkBounds = checkBounds;
    function getLabelText(currentPoint, series, chart) {
        var labelFormat = series.yAxis.labelFormat;
        var text = [];
        var customLabelFormat = labelFormat.match('{value}') !== null;
        switch (series.seriesType) {
            case 'XY':
                if (series.chart.chartAreaType === 'PolarRadar') {
                    if (series.drawType.indexOf('Stacking') !== -1) {
                        if ((series.yAxis.valueType === 'Logarithmic' &&
                            logWithIn(series.stackedValues.endValues[currentPoint.index], series.yAxis)) ||
                            withIn(series.stackedValues.endValues[currentPoint.index], series.yAxis.visibleRange)) {
                            text.push(currentPoint.text || currentPoint.yValue.toString());
                        }
                    }
                    else {
                        if ((series.yAxis.valueType === 'Logarithmic' && logWithIn(currentPoint.yValue, series.yAxis)) ||
                            withIn(currentPoint.yValue, series.yAxis.visibleRange)) {
                            text.push(currentPoint.text || currentPoint.yValue.toString());
                        }
                    }
                }
                else {
                    text.push(currentPoint.text || currentPoint.yValue.toString());
                }
                break;
            case 'HighLow':
                text.push(currentPoint.text || Math.max(currentPoint.high, currentPoint.low).toString());
                text.push(currentPoint.text || Math.min(currentPoint.high, currentPoint.low).toString());
                break;
            case 'HighLowOpenClose':
                text.push(currentPoint.text || Math.max(currentPoint.high, currentPoint.low).toString());
                text.push(currentPoint.text || Math.min(currentPoint.high, currentPoint.low).toString());
                text.push(currentPoint.text || Math.max(currentPoint.open, currentPoint.close).toString());
                text.push(currentPoint.text || Math.min(currentPoint.open, currentPoint.close).toString());
                break;
            case 'BoxPlot':
                text.push(currentPoint.text || currentPoint.median.toString());
                text.push(currentPoint.text || currentPoint.maximum.toString());
                text.push(currentPoint.text || currentPoint.minimum.toString());
                text.push(currentPoint.text || currentPoint.upperQuartile.toString());
                text.push(currentPoint.text || currentPoint.lowerQuartile.toString());
                for (var _i = 0, _a = currentPoint.outliers; _i < _a.length; _i++) {
                    var liers = _a[_i];
                    text.push(currentPoint.text || liers.toString());
                }
                break;
        }
        if (labelFormat && !currentPoint.text) {
            series.yAxis.format = chart.intl.getNumberFormat({
                format: customLabelFormat ? '' : labelFormat,
                useGrouping: chart.useGroupingSeparator
            });
            for (var i = 0; i < text.length; i++) {
                text[i] = customLabelFormat ? labelFormat.replace('{value}', series.yAxis.format(parseFloat(text[i]))) :
                    series.yAxis.format(parseFloat(text[i]));
            }
        }
        return text;
    }
    exports.getLabelText = getLabelText;
    function stopTimer(timer) {
        window.clearInterval(timer);
    }
    exports.stopTimer = stopTimer;
    function isCollide(rect, collections, clipRect) {
        var currentRect = new ej2_svg_base_1.Rect(rect.x + clipRect.x, rect.y + clipRect.y, rect.width, rect.height);
        var isCollide = collections.some(function (rect) {
            return (currentRect.x < rect.x + rect.width && currentRect.x + currentRect.width > rect.x &&
                currentRect.y < rect.y + rect.height && currentRect.height + currentRect.y > rect.y);
        });
        return isCollide;
    }
    exports.isCollide = isCollide;
    function isOverlap(currentRect, rect) {
        return (currentRect.x < rect.x + rect.width && currentRect.x + currentRect.width > rect.x &&
            currentRect.y < rect.y + rect.height && currentRect.height + currentRect.y > rect.y);
    }
    exports.isOverlap = isOverlap;
    function containsRect(currentRect, rect) {
        return (currentRect.x <= rect.x && currentRect.x + currentRect.width >= rect.x + rect.width &&
            currentRect.y <= rect.y && currentRect.height + currentRect.y >= rect.y + rect.height);
    }
    exports.containsRect = containsRect;
    function calculateRect(location, textSize, margin) {
        return new ej2_svg_base_1.Rect((location.x - (textSize.width / 2) - margin.left), (location.y - (textSize.height / 2) - margin.top), textSize.width + margin.left + margin.right, textSize.height + margin.top + margin.bottom);
    }
    exports.calculateRect = calculateRect;
    function convertToHexCode(value) {
        return '#' + componentToHex(value.r) + componentToHex(value.g) + componentToHex(value.b);
    }
    exports.convertToHexCode = convertToHexCode;
    function componentToHex(value) {
        var hex = value.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }
    exports.componentToHex = componentToHex;
    function convertHexToColor(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? new ColorValue(parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)) :
            new ColorValue(255, 255, 255);
    }
    exports.convertHexToColor = convertHexToColor;
    function colorNameToHex(color) {
        color = color === 'transparent' ? 'white' : color;
        document.body.appendChild(ej2_base_3.createElement('text', { id: 'chartmeasuretext' }));
        var element = document.getElementById('chartmeasuretext');
        element.style.color = color;
        color = window.getComputedStyle(element).color;
        ej2_base_3.remove(element);
        var exp = /^(rgb|hsl)(a?)[(]\s*([\d.]+\s*%?)\s*,\s*([\d.]+\s*%?)\s*,\s*([\d.]+\s*%?)\s*(?:,\s*([\d.]+)\s*)?[)]$/;
        var isRGBValue = exp.exec(color);
        return convertToHexCode(new ColorValue(parseInt(isRGBValue[3], 10), parseInt(isRGBValue[4], 10), parseInt(isRGBValue[5], 10)));
    }
    exports.colorNameToHex = colorNameToHex;
    function getSaturationColor(color, factor) {
        color = colorNameToHex(color);
        color = color.replace(/[^0-9a-f]/gi, '');
        if (color.length < 6) {
            color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
        }
        factor = factor || 0;
        var rgb = '#';
        var colorCode;
        for (var i = 0; i < 3; i++) {
            colorCode = parseInt(color.substr(i * 2, 2), 16);
            colorCode = Math.round(Math.min(Math.max(0, colorCode + (colorCode * factor)), 255));
            rgb += ('00' + colorCode.toString(16)).substr(colorCode.toString(16).length);
        }
        return rgb;
    }
    exports.getSaturationColor = getSaturationColor;
    function getMedian(values) {
        var half = Math.floor(values.length / 2);
        return values.length % 2 ? values[half] : ((values[half - 1] + values[half]) / 2.0);
    }
    exports.getMedian = getMedian;
    function calculateLegendShapes(location, size, shape, options) {
        var padding = 10;
        var dir = '';
        var space = 2;
        var height = size.height;
        var width = size.width;
        var lx = location.x;
        var ly = location.y;
        switch (shape) {
            case 'MultiColoredLine':
            case 'Line':
            case 'StackingLine':
            case 'StackingLine100':
                dir = 'M' + ' ' + (lx + (-width / 2)) + ' ' + (ly) + ' ' +
                    'L' + ' ' + (lx + (width / 2)) + ' ' + (ly);
                ej2_base_2.merge(options, { 'd': dir });
                break;
            case 'StepLine':
                options.fill = 'transparent';
                dir = 'M' + ' ' + (lx + (-width / 2) - (padding / 4)) + ' ' + (ly + (height / 2)) + ' ' + 'L' + ' ' + (lx +
                    (-width / 2) + (width / 10)) + ' ' + (ly + (height / 2)) + ' ' + 'L' + ' ' + (lx + (-width / 2) + (width / 10))
                    + ' ' + (ly) + ' ' + 'L' + ' ' + (lx + (-width / 10)) + ' ' + (ly) + ' ' + 'L' + ' ' + (lx + (-width / 10))
                    + ' ' + (ly + (height / 2)) + ' ' + 'L' + ' ' + (lx + (width / 5)) + ' ' + (ly + (height / 2)) + ' ' + 'L' +
                    ' ' + (lx + (width / 5)) + ' ' + (ly + (-height / 2)) + ' ' + 'L' + ' ' + (lx + (width / 2)) + ' ' + (ly +
                    (-height / 2)) + 'L' + ' ' + (lx + (width / 2)) + ' ' + (ly + (height / 2)) + ' ' + 'L' + '' + (lx + (width / 2)
                    + (padding / 4)) + ' ' + (ly + (height / 2));
                ej2_base_2.merge(options, { 'd': dir });
                break;
            case 'UpArrow':
                options.fill = options.stroke;
                options.stroke = 'transparent';
                dir = 'M' + ' ' + (lx + (-width / 2)) + ' ' + (ly + (height / 2)) + ' ' +
                    'L' + ' ' + (lx) + ' ' + (ly - (height / 2)) + ' ' +
                    'L' + ' ' + (lx + (width / 2)) + ' ' + (ly + (height / 2)) +
                    'L' + ' ' + (lx + (width / 2) - space) + ' ' + (ly + (height / 2)) + ' ' +
                    'L' + ' ' + (lx) + ' ' + (ly - (height / 2) + (2 * space)) +
                    'L' + (lx - (width / 2) + space) + ' ' + (ly + (height / 2)) + ' Z';
                ej2_base_2.merge(options, { 'd': dir });
                break;
            case 'DownArrow':
                dir = 'M' + ' ' + (lx - (width / 2)) + ' ' + (ly - (height / 2)) + ' ' +
                    'L' + ' ' + (lx) + ' ' + (ly + (height / 2)) + ' ' +
                    'L' + ' ' + (lx + (width / 2)) + ' ' + (ly - (height / 2)) +
                    'L' + ' ' + (lx + (width / 2) - space) + ' ' + (ly - (height / 2)) + ' ' +
                    'L' + ' ' + (lx) + ' ' + (ly + (height / 2) - (2 * space)) +
                    'L' + (lx - (width / 2) + space) + ' ' + (ly - (height / 2)) + ' Z';
                ej2_base_2.merge(options, { 'd': dir });
                break;
            case 'RightArrow':
                dir = 'M' + ' ' + (lx + (-width / 2)) + ' ' + (ly - (height / 2)) + ' ' +
                    'L' + ' ' + (lx + (width / 2)) + ' ' + (ly) + ' ' + 'L' + ' ' +
                    (lx + (-width / 2)) + ' ' + (ly + (height / 2)) + ' L' + ' ' + (lx + (-width / 2)) + ' ' +
                    (ly + (height / 2) - space) + ' ' + 'L' + ' ' + (lx + (width / 2) - (2 * space)) + ' ' + (ly) +
                    ' L' + (lx + (-width / 2)) + ' ' + (ly - (height / 2) + space) + ' Z';
                ej2_base_2.merge(options, { 'd': dir });
                break;
            case 'LeftArrow':
                options.fill = options.stroke;
                options.stroke = 'transparent';
                dir = 'M' + ' ' + (lx + (width / 2)) + ' ' + (ly - (height / 2)) + ' ' +
                    'L' + ' ' + (lx + (-width / 2)) + ' ' + (ly) + ' ' + 'L' + ' ' +
                    (lx + (width / 2)) + ' ' + (ly + (height / 2)) + ' ' + 'L' + ' ' +
                    (lx + (width / 2)) + ' ' + (ly + (height / 2) - space) + ' L' + ' ' + (lx + (-width / 2) + (2 * space))
                    + ' ' + (ly) + ' L' + (lx + (width / 2)) + ' ' + (ly - (height / 2) + space) + ' Z';
                ej2_base_2.merge(options, { 'd': dir });
                break;
            case 'Column':
            case 'Pareto':
            case 'StackingColumn':
            case 'StackingColumn100':
            case 'RangeColumn':
            case 'Histogram':
                dir = 'M' + ' ' + (lx - 3 * (width / 5)) + ' ' + (ly - (height / 5)) + ' ' + 'L' + ' ' +
                    (lx + 3 * (-width / 10)) + ' ' + (ly - (height / 5)) + ' ' + 'L' + ' ' +
                    (lx + 3 * (-width / 10)) + ' ' + (ly + (height / 2)) + ' ' + 'L' + ' ' + (lx - 3 *
                    (width / 5)) + ' ' + (ly + (height / 2)) + ' ' + 'Z' + ' ' + 'M' + ' ' +
                    (lx + (-width / 10) - (width / 20)) + ' ' + (ly - (height / 4) - (padding / 2))
                    + ' ' + 'L' + ' ' + (lx + (width / 10) + (width / 20)) + ' ' + (ly - (height / 4) -
                    (padding / 2)) + ' ' + 'L' + ' ' + (lx + (width / 10) + (width / 20)) + ' ' + (ly
                    + (height / 2)) + ' ' + 'L' + ' ' + (lx + (-width / 10) - (width / 20)) + ' ' + (ly +
                    (height / 2)) + ' ' + 'Z' + ' ' + 'M' + ' ' + (lx + 3 * (width / 10)) + ' ' + (ly) + ' ' +
                    'L' + ' ' + (lx + 3 * (width / 5)) + ' ' + (ly) + ' ' + 'L' + ' '
                    + (lx + 3 * (width / 5)) + ' ' + (ly + (height / 2)) + ' ' + 'L' + ' '
                    + (lx + 3 * (width / 10)) + ' ' + (ly + (height / 2)) + ' ' + 'Z';
                ej2_base_2.merge(options, { 'd': dir });
                break;
            case 'Bar':
            case 'StackingBar':
            case 'StackingBar100':
                dir = 'M' + ' ' + (lx + (-width / 2) + (-padding / 4)) + ' ' + (ly - 3 * (height / 5)) + ' '
                    + 'L' + ' ' + (lx + 3 * (width / 10)) + ' ' + (ly - 3 * (height / 5)) + ' ' + 'L' + ' ' +
                    (lx + 3 * (width / 10)) + ' ' + (ly - 3 * (height / 10)) + ' ' + 'L' + ' ' +
                    (lx - (width / 2) + (-padding / 4)) + ' ' + (ly - 3 * (height / 10)) + ' ' + 'Z' + ' '
                    + 'M' + ' ' + (lx + (-width / 2) + (-padding / 4)) + ' ' + (ly - (height / 5)
                    + (padding / 20)) + ' ' + 'L' + ' ' + (lx + (width / 2) + (padding / 4)) + ' ' + (ly
                    - (height / 5) + (padding / 20)) + ' ' + 'L' + ' ' + (lx + (width / 2) + (padding / 4))
                    + ' ' + (ly + (height / 10) + (padding / 20)) + ' ' + 'L' + ' ' + (lx - (width / 2)
                    + (-padding / 4)) + ' ' + (ly + (height / 10) + (padding / 20)) + ' ' + 'Z' + ' ' + 'M'
                    + ' ' + (lx - (width / 2) + (-padding / 4)) + ' ' + (ly + (height / 5)
                    + (padding / 10)) + ' ' + 'L' + ' ' + (lx + (-width / 4)) + ' ' + (ly + (height / 5)
                    + (padding / 10)) + ' ' + 'L' + ' ' + (lx + (-width / 4)) + ' ' + (ly + (height / 2)
                    + (padding / 10)) + ' ' + 'L' + ' ' + (lx - (width / 2) + (-padding / 4))
                    + ' ' + (ly + (height / 2) + (padding / 10)) + ' ' + 'Z';
                ej2_base_2.merge(options, { 'd': dir });
                break;
            case 'Spline':
                options.fill = 'transparent';
                dir = 'M' + ' ' + (lx - (width / 2)) + ' ' + (ly + (height / 5)) + ' ' + 'Q' + ' '
                    + lx + ' ' + (ly - height) + ' ' + lx + ' ' + (ly + (height / 5))
                    + ' ' + 'M' + ' ' + lx + ' ' + (ly + (height / 5)) + ' ' + 'Q' + ' ' + (lx
                    + (width / 2)) + ' ' + (ly + (height / 2)) + ' ' + (lx + (width / 2)) + ' '
                    + (ly - (height / 2));
                ej2_base_2.merge(options, { 'd': dir });
                break;
            case 'Area':
            case 'MultiColoredArea':
            case 'RangeArea':
            case 'StackingArea':
            case 'StackingArea100':
                dir = 'M' + ' ' + (lx - (width / 2) - (padding / 4)) + ' ' + (ly + (height / 2))
                    + ' ' + 'L' + ' ' + (lx + (-width / 4) + (-padding / 8)) + ' ' + (ly - (height / 2))
                    + ' ' + 'L' + ' ' + (lx) + ' ' + (ly + (height / 4)) + ' ' + 'L' + ' ' + (lx
                    + (width / 4) + (padding / 8)) + ' ' + (ly + (-height / 2) + (height / 4)) + ' '
                    + 'L' + ' ' + (lx + (height / 2) + (padding / 4)) + ' ' + (ly + (height / 2)) + ' ' + 'Z';
                ej2_base_2.merge(options, { 'd': dir });
                break;
            case 'SplineArea':
            case 'SplineRangeArea':
                dir = 'M' + ' ' + (lx - (width / 2)) + ' ' + (ly + (height / 5)) + ' ' + 'Q' + ' ' + lx
                    + ' ' + (ly - height) + ' ' + lx + ' ' + (ly + (height / 5)) + ' ' + 'Z' + ' ' + 'M'
                    + ' ' + lx + ' ' + (ly + (height / 5)) + ' ' + 'Q' + ' ' + (lx + (width / 2)) + ' '
                    + (ly + (height / 2)) + ' ' + (lx + (width / 2)) + ' '
                    + (ly - (height / 2)) + ' ' + ' Z';
                ej2_base_2.merge(options, { 'd': dir });
                break;
            case 'Pie':
            case 'Doughnut':
                options.stroke = 'transparent';
                var r = Math.min(height, width) / 2;
                dir = getAccumulationLegend(lx, ly, r, height, width, shape);
                ej2_base_2.merge(options, { 'd': dir });
                break;
        }
        return { renderOption: options };
    }
    exports.calculateLegendShapes = calculateLegendShapes;
    function textTrim(maxWidth, text, font) {
        var label = text;
        var size = ej2_svg_base_1.measureText(text, font).width;
        if (size > maxWidth) {
            var textLength = text.length;
            for (var i = textLength - 1; i >= 0; --i) {
                label = text.substring(0, i) + '...';
                size = ej2_svg_base_1.measureText(label, font).width;
                if (size <= maxWidth) {
                    return label;
                }
            }
        }
        return label;
    }
    exports.textTrim = textTrim;
    function lineBreakLabelTrim(maxWidth, text, font) {
        var labelCollection = [];
        var breakLabels = text.split('<br>');
        for (var i = 0; i < breakLabels.length; i++) {
            text = breakLabels[i];
            var size = ej2_svg_base_1.measureText(text, font).width;
            if (size > maxWidth) {
                var textLength = text.length;
                for (var i_1 = textLength - 1; i_1 >= 0; --i_1) {
                    text = text.substring(0, i_1) + '...';
                    size = ej2_svg_base_1.measureText(text, font).width;
                    if (size <= maxWidth) {
                        labelCollection.push(text);
                        break;
                    }
                }
            }
            else {
                labelCollection.push(text);
            }
        }
        return labelCollection;
    }
    exports.lineBreakLabelTrim = lineBreakLabelTrim;
    function stringToNumber(value, containerSize) {
        if (value !== null && value !== undefined) {
            return value.indexOf('%') !== -1 ? (containerSize / 100) * parseInt(value, 10) : parseInt(value, 10);
        }
        return null;
    }
    exports.stringToNumber = stringToNumber;
    function redrawElement(redraw, id, options, renderer) {
        if (!redraw) {
            return null;
        }
        var element = getElement(id);
        if (element && options) {
            renderer.setElementAttributes(options, element.tagName === 'clipPath' ? element.childNodes[0] : element);
        }
        return element;
    }
    exports.redrawElement = redrawElement;
    function animateRedrawElement(element, duration, start, end, x, y) {
        if (x === void 0) { x = 'x'; }
        if (y === void 0) { y = 'y'; }
        var isDiv = element.tagName === 'DIV';
        var setStyle = function (xValue, yValue) {
            if (isDiv) {
                element.style[x] = xValue + 'px';
                element.style[y] = yValue + 'px';
            }
            else {
                element.setAttribute(x, xValue + '');
                element.setAttribute(y, yValue + '');
            }
        };
        setStyle(start.x, start.y);
        new ej2_base_1.Animation({}).animate(ej2_base_3.createElement('div'), {
            duration: duration,
            progress: function (args) {
                setStyle(linear(args.timeStamp, start.x, end.x - start.x, args.duration), linear(args.timeStamp, start.y, end.y - start.y, args.duration));
            },
            end: function () {
                setStyle(end.x, end.y);
            }
        });
    }
    exports.animateRedrawElement = animateRedrawElement;
    function textElement(renderer, option, font, color, parent, isMinus, redraw, isAnimate, forceAnimate, animateDuration, seriesClipRect, labelSize, isRotatedLabelIntersect, isCanvas) {
        if (isMinus === void 0) { isMinus = false; }
        if (forceAnimate === void 0) { forceAnimate = false; }
        var renderOptions = {};
        var tspanElement;
        var height;
        var dy;
        var label;
        renderOptions = {
            'id': option.id,
            'x': option.x,
            'y': option.y,
            'fill': color ? color : 'black',
            'font-size': font.size,
            'font-style': font.fontStyle,
            'font-family': font.fontFamily,
            'font-weight': font.fontWeight,
            'text-anchor': option.anchor,
            'labelRotation': option.labelRotation,
            'transform': option.transform,
            'opacity': font.opacity,
            'dominant-baseline': option.baseLine
        };
        var text = typeof option.text === 'string' ? option.text : isMinus ? option.text[option.text.length - 1] : option.text[0];
        var transX = seriesClipRect ? seriesClipRect.x : 0;
        var transY = seriesClipRect ? seriesClipRect.y : 0;
        var htmlObject = renderer.createText(renderOptions, text, transX, transY);
        htmlObject.style.fontFamily = font.fontFamily;
        htmlObject.style.fontStyle = font.fontStyle;
        htmlObject.style.fontSize = font.size;
        htmlObject.style.fontWeight = font.fontWeight;
        htmlObject.style.color = font.color;
        htmlObject.style.textAnchor = option.anchor;
        if (typeof option.text !== 'string' && option.text.length > 1) {
            for (var i = 1, len = option.text.length; i < len; i++) {
                height = (ej2_svg_base_1.measureText(option.text[i], font).height);
                dy = (option.y) + ((isMinus) ? -(i * height) : (i * height));
                label = isMinus ? option.text[option.text.length - (i + 1)] : option.text[i];
                if (isCanvas) {
                    tspanElement = renderer.createText(renderOptions, label, null, null, dy, true);
                }
                else {
                    tspanElement = renderer.createTSpan({
                        'x': option.x, 'id': option.id,
                        'y': dy
                    }, label);
                    htmlObject.appendChild(tspanElement);
                }
            }
        }
        if (!isRotatedLabelIntersect) {
            appendChildElement(renderer instanceof ej2_svg_base_1.CanvasRenderer, parent, htmlObject, redraw, isAnimate, 'x', 'y', null, null, forceAnimate, false, null, animateDuration);
        }
        return htmlObject;
    }
    exports.textElement = textElement;
    function calculateSize(chart) {
        var containerWidth = chart.element.clientWidth || chart.element.offsetWidth;
        var containerHeight = chart.element.clientHeight;
        if (chart.stockChart) {
            containerWidth = chart.stockChart.availableSize.width;
            containerHeight = chart.stockChart.availableSize.height;
        }
        var height = 450;
        var marginHeight;
        if (chart.getModuleName() === 'rangeNavigator') {
            var range = chart;
            var tooltipSpace = range.tooltip.enable ? 35 : 0;
            var periodHeight = range.periodSelectorSettings.periods.length ?
                range.periodSelectorSettings.height : 0;
            marginHeight = range.margin.top + range.margin.bottom + tooltipSpace;
            var labelSize = ej2_svg_base_1.measureText('tempString', range.labelStyle).height;
            var labelPadding = 15;
            height = (chart.series.length ? (ej2_base_1.Browser.isDevice ? 80 : 120) : ((range.enableGrouping ? (40 + labelPadding + labelSize) : 40)
                + marginHeight)) + periodHeight;
            if (range.disableRangeSelector) {
                height = periodHeight;
            }
        }
        chart.availableSize = new ej2_svg_base_1.Size(stringToNumber(chart.width, containerWidth) || containerWidth || 600, stringToNumber(chart.height, containerHeight || height) || containerHeight || height);
        if (chart.getModuleName() === 'chart') {
            var scaleX = 1;
            var scaleY = 1;
            if (chart.width === "" || chart.width === null || chart.width === "100%") {
                scaleX = chart.element.getBoundingClientRect().width > 0 ?
                    chart.element.getBoundingClientRect().width / chart.availableSize.width : 1;
                scaleY = chart.element.getBoundingClientRect().height > 0 ?
                    chart.element.getBoundingClientRect().height / chart.availableSize.height : 1;
                chart.availableSize.width = chart.availableSize.width * scaleX;
                chart.availableSize.height = chart.availableSize.height * scaleY;
                chart.scaleX = scaleX;
                chart.scaleY = scaleY;
            }
        }
    }
    exports.calculateSize = calculateSize;
    function createSvg(chart) {
        chart.canvasRender = new ej2_svg_base_1.CanvasRenderer(chart.element.id);
        chart.renderer = chart.enableCanvas ? chart.canvasRender : new ej2_svg_base_1.SvgRenderer(chart.element.id);
        calculateSize(chart);
        if (chart.stockChart && chart.getModuleName() === 'chart') {
            chart.svgObject = chart.stockChart.chartObject;
        }
        else if (chart.stockChart && chart.getModuleName() === 'rangeNavigator') {
            chart.svgObject = chart.stockChart.selectorObject;
        }
        else {
            if (chart.enableCanvas) {
                chart.svgObject = chart.renderer.createCanvas({
                    id: chart.element.id + '_canvas',
                    width: chart.availableSize.width,
                    height: chart.availableSize.height
                });
            }
            else {
                chart.svgObject = chart.renderer.createSvg({
                    id: chart.element.id + '_svg',
                    width: chart.availableSize.width,
                    height: chart.availableSize.height
                });
            }
        }
        if (chart.enableCanvas) {
            chart.renderer.ctx.direction = chart.enableRtl ? 'rtl' : 'ltr';
        }
    }
    exports.createSvg = createSvg;
    function getTitle(title, style, width) {
        var titleCollection = [];
        switch (style.textOverflow) {
            case 'Wrap':
                titleCollection = textWrap(title, width, style);
                break;
            case 'Trim':
                titleCollection.push(textTrim(width, title, style));
                break;
            default:
                titleCollection.push(title);
                break;
        }
        return titleCollection;
    }
    exports.getTitle = getTitle;
    function titlePositionX(rect, titleStyle) {
        var positionX;
        if (titleStyle.textAlignment === 'Near') {
            positionX = rect.x;
        }
        else if (titleStyle.textAlignment === 'Center') {
            positionX = rect.x + rect.width / 2;
        }
        else {
            positionX = rect.x + rect.width;
        }
        return positionX;
    }
    exports.titlePositionX = titlePositionX;
    function textWrap(currentLabel, maximumWidth, font) {
        var textCollection = currentLabel.split(' ');
        var label = '';
        var labelCollection = [];
        var text;
        for (var i = 0, len = textCollection.length; i < len; i++) {
            text = textCollection[i];
            if (ej2_svg_base_1.measureText(label.concat(label === '' ? '' : ' ' + text), font).width < maximumWidth) {
                label = label.concat((label === '' ? '' : ' ') + text);
            }
            else {
                if (label !== '') {
                    labelCollection.push(textTrim(maximumWidth, label, font));
                    label = text;
                }
                else {
                    labelCollection.push(textTrim(maximumWidth, text, font));
                    text = '';
                }
            }
            if (label && i === len - 1) {
                labelCollection.push(textTrim(maximumWidth, label, font));
            }
        }
        return labelCollection;
    }
    exports.textWrap = textWrap;
    function getUnicodeText(text, regexp) {
        var title = text.replace(regexp, ' ');
        var digit = text.match(regexp);
        var digitSpecific = ' ';
        var convertedText = ' ';
        var k = 0;
        var unicodeSub = {
            '0': '\u2080', '1': '\u2081', '2': '\u2082', '3': '\u2083', '4': '\u2084',
            '5': '\u2085', '6': '\u2086', '7': '\u2087', '8': '\u2088', '9': '\u2089'
        };
        var unicodeSup = {
            '0': '\u2070', '1': '\u00B9', '2': '\u00B2', '3': '\u00B3', '4': '\u2074',
            '5': '\u2075', '6': '\u2076', '7': '\u2077', '8': '\u2078', '9': '\u2079'
        };
        for (var i = 0; i <= title.length - 1; i++) {
            if (title[i] === ' ') {
                digitSpecific = (regexp === constants_1.regSub) ? digit[k].replace(/~/g, '') : digit[k].replace(/\^/g, '');
                for (var j = 0; j < digitSpecific.length; j++) {
                    convertedText += (regexp === constants_1.regSub) ? unicodeSub[digitSpecific[j]] : unicodeSup[digitSpecific[j]];
                }
                k++;
            }
            else {
                convertedText += title[i];
            }
        }
        return convertedText.trim();
    }
    exports.getUnicodeText = getUnicodeText;
    function blazorTemplatesReset(control) {
        for (var i = 0; i < control.annotations.length; i++) {
            ej2_base_2.resetBlazorTemplate((control.element.id + '_Annotation_' + i).replace(/[^a-zA-Z0-9]/g, ''), 'ContentTemplate');
        }
        ej2_base_2.resetBlazorTemplate(control.element.id + '_tooltipparent_template' + '_blazorTemplate', 'Template');
        ej2_base_2.resetBlazorTemplate(control.element.id + '_DataLabel');
    }
    exports.blazorTemplatesReset = blazorTemplatesReset;
    var CustomizeOption = (function () {
        function CustomizeOption(id) {
            this.id = id;
        }
        return CustomizeOption;
    }());
    exports.CustomizeOption = CustomizeOption;
    var StackValues = (function () {
        function StackValues(startValue, endValue) {
            this.startValues = startValue;
            this.endValues = endValue;
        }
        return StackValues;
    }());
    exports.StackValues = StackValues;
    var RectOption = (function (_super) {
        __extends(RectOption, _super);
        function RectOption(id, fill, border, opacity, rect, rx, ry, transform, dashArray) {
            var _this = _super.call(this, id, fill, border.width, border.color, opacity, dashArray) || this;
            _this.y = rect.y;
            _this.x = rect.x;
            _this.height = rect.height;
            _this.width = rect.width;
            _this.rx = rx ? rx : 0;
            _this.ry = ry ? ry : 0;
            _this.transform = transform ? transform : '';
            _this.stroke = (border.width !== 0 && _this.stroke !== '') ? border.color : 'transparent';
            return _this;
        }
        return RectOption;
    }(ej2_svg_base_1.PathOption));
    exports.RectOption = RectOption;
    var ImageOption = (function () {
        function ImageOption(height, width, href, x, y, id, visibility, preserveAspectRatio) {
            this.height = height;
            this.width = width;
            this.href = href;
            this.x = x;
            this.y = y;
            this.id = id;
            this.visibility = visibility;
            this.preserveAspectRatio = preserveAspectRatio;
        }
        return ImageOption;
    }());
    exports.ImageOption = ImageOption;
    var CircleOption = (function (_super) {
        __extends(CircleOption, _super);
        function CircleOption(id, fill, border, opacity, cx, cy, r) {
            var _this = _super.call(this, id, fill, border.width, border.color, opacity) || this;
            _this.cy = cy;
            _this.cx = cx;
            _this.r = r;
            return _this;
        }
        return CircleOption;
    }(ej2_svg_base_1.PathOption));
    exports.CircleOption = CircleOption;
    var PolygonOption = (function () {
        function PolygonOption(id, points, fill) {
            this.id = id;
            this.points = points;
            this.fill = fill;
        }
        return PolygonOption;
    }());
    exports.PolygonOption = PolygonOption;
    var ChartLocation = (function () {
        function ChartLocation(x, y) {
            this.x = x;
            this.y = y;
        }
        return ChartLocation;
    }());
    exports.ChartLocation = ChartLocation;
    var LabelLocation = (function () {
        function LabelLocation(x, y) {
            this.x = 0;
            this.y = 0;
            this.x = x;
            this.y = y;
        }
        return LabelLocation;
    }());
    exports.LabelLocation = LabelLocation;
    var Thickness = (function () {
        function Thickness(left, right, top, bottom) {
            this.left = left;
            this.right = right;
            this.top = top;
            this.bottom = bottom;
        }
        return Thickness;
    }());
    exports.Thickness = Thickness;
    var ColorValue = (function () {
        function ColorValue(r, g, b) {
            this.r = r;
            this.g = g;
            this.b = b;
        }
        return ColorValue;
    }());
    exports.ColorValue = ColorValue;
    var PointData = (function () {
        function PointData(point, series, index) {
            if (index === void 0) { index = 0; }
            this.point = point;
            this.series = series;
            this.lierIndex = index;
        }
        return PointData;
    }());
    exports.PointData = PointData;
    var AccPointData = (function () {
        function AccPointData(point, series, index) {
            if (index === void 0) { index = 0; }
            this.point = point;
            this.series = series;
            this.index = index;
        }
        return AccPointData;
    }());
    exports.AccPointData = AccPointData;
    var ControlPoints = (function () {
        function ControlPoints(controlPoint1, controlPoint2) {
            this.controlPoint1 = controlPoint1;
            this.controlPoint2 = controlPoint2;
        }
        return ControlPoints;
    }());
    exports.ControlPoints = ControlPoints;
    function getColorByValue(colorMap, value) {
        var color = '';
        var rbgColorValue;
        if (Number(value) === colorMap.start) {
            color = colorMap.colors[0];
        }
        else if (Number(value) === colorMap.end) {
            color = colorMap.colors[colorMap.colors.length - 1];
        }
        else {
            rbgColorValue = getGradientColor(Number(value), colorMap);
            color = convertToHexCode(rbgColorValue);
        }
        return color;
    }
    exports.getColorByValue = getColorByValue;
    function getGradientColor(value, colorMap) {
        var previousOffset = colorMap.start;
        var nextOffset = colorMap.end;
        var percent = 0;
        var full = nextOffset - previousOffset;
        var midColor;
        percent = (value - previousOffset) / full;
        var previousColor;
        var nextColor;
        if (colorMap.colors.length <= 2) {
            previousColor = colorMap.colors[0].charAt(0) === '#' ? colorMap.colors[0] : colorNameToHex(colorMap.colors[0]);
            nextColor = colorMap.colors[colorMap.colors.length - 1].charAt(0) === '#' ?
                colorMap.colors[colorMap.colors.length - 1] : colorNameToHex(colorMap.colors[colorMap.colors.length - 1]);
        }
        else {
            previousColor = colorMap.colors[0].charAt(0) === '#' ? colorMap.colors[0] : colorNameToHex(colorMap.colors[0]);
            nextColor = colorMap.colors[colorMap.colors.length - 1].charAt(0) === '#' ?
                colorMap.colors[colorMap.colors.length - 1] : colorNameToHex(colorMap.colors[colorMap.colors.length - 1]);
            var a = full / (colorMap.colors.length - 1);
            var b = void 0;
            var c = void 0;
            var length_2 = colorMap.colors.length - 1;
            var splitColorValueOffset = [];
            var splitColor = {};
            for (var j = 1; j < length_2; j++) {
                c = j * a;
                b = previousOffset + c;
                splitColor = { b: b, color: colorMap.colors[j] };
                splitColorValueOffset.push(splitColor);
            }
            for (var i = 0; i < splitColorValueOffset.length; i++) {
                if (previousOffset <= value && value <= splitColorValueOffset[i]['b'] && i === 0) {
                    midColor = splitColorValueOffset[i]['color'].charAt(0) === '#' ?
                        splitColorValueOffset[i]['color'] : colorNameToHex(splitColorValueOffset[i]['color']);
                    nextColor = midColor;
                    percent = value <= splitColorValueOffset[i]['b'] ? 1 - Math.abs((value - splitColorValueOffset[i]['b']) / a)
                        : (value - splitColorValueOffset[i]['b']) / a;
                }
                else if (splitColorValueOffset[i]['b'] <= value && value <= nextOffset && i === (splitColorValueOffset.length - 1)) {
                    midColor = splitColorValueOffset[i]['color'].charAt(0) === '#' ?
                        splitColorValueOffset[i]['color'] : colorNameToHex(splitColorValueOffset[i]['color']);
                    previousColor = midColor;
                    percent = value < splitColorValueOffset[i]['b'] ?
                        1 - Math.abs((value - splitColorValueOffset[i]['b']) / a) : (value - splitColorValueOffset[i]['b']) / a;
                }
                if (i !== splitColorValueOffset.length - 1 && i < splitColorValueOffset.length) {
                    if (splitColorValueOffset[i]['b'] <= value && value <= splitColorValueOffset[i + 1]['b']) {
                        midColor = splitColorValueOffset[i]['color'].charAt(0) === '#' ?
                            splitColorValueOffset[i]['color'] : colorNameToHex(splitColorValueOffset[i]['color']);
                        previousColor = midColor;
                        nextColor = splitColorValueOffset[i + 1]['color'].charAt(0) === '#' ?
                            splitColorValueOffset[i + 1]['color'] : colorNameToHex(splitColorValueOffset[i + 1]['color']);
                        percent = Math.abs((value - splitColorValueOffset[i + 1]['b'])) / a;
                    }
                }
            }
        }
        return getPercentageColor(percent, previousColor, nextColor);
    }
    exports.getGradientColor = getGradientColor;
    function getPercentageColor(percent, previous, next) {
        var nextColor = next.split('#')[1];
        var prevColor = previous.split('#')[1];
        var r = getPercentage(percent, parseInt(prevColor.substr(0, 2), 16), parseInt(nextColor.substr(0, 2), 16));
        var g = getPercentage(percent, parseInt(prevColor.substr(2, 2), 16), parseInt(nextColor.substr(2, 2), 16));
        var b = getPercentage(percent, parseInt(prevColor.substr(4, 2), 16), parseInt(nextColor.substr(4, 2), 16));
        return new ColorValue(r, g, b);
    }
    exports.getPercentageColor = getPercentageColor;
    function getPercentage(percent, previous, next) {
        var full = next - previous;
        return Math.round((previous + (full * percent)));
    }
    exports.getPercentage = getPercentage;
    function getTextAnchor(alignment, enableRTL) {
        switch (alignment) {
            case 'Near':
                return enableRTL ? 'end' : 'start';
            case 'Far':
                return enableRTL ? 'start' : 'end';
            default:
                return 'middle';
        }
    }
    exports.getTextAnchor = getTextAnchor;
});
