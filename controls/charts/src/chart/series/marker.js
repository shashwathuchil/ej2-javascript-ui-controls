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
define(["require", "exports", "../../common/utils/helper", "../../common/utils/helper", "@syncfusion/ej2-svg-base", "@syncfusion/ej2-base", "../../common/model/constants", "./marker-explode", "../../common/utils/helper"], function (require, exports, helper_1, helper_2, ej2_svg_base_1, ej2_base_1, constants_1, marker_explode_1, helper_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Marker = (function (_super) {
        __extends(Marker, _super);
        function Marker(chart) {
            var _this = _super.call(this, chart) || this;
            _this.addEventListener();
            return _this;
        }
        Marker.prototype.render = function (series) {
            var _this = this;
            var redraw = series.chart.redraw;
            this.createElement(series, redraw);
            var _loop_1 = function (point) {
                if (point.visible && point.symbolLocations && point.symbolLocations.length) {
                    point.symbolLocations.map(function (location, index) {
                        if (series.marker.shape !== 'None') {
                            _this.renderMarker(series, point, location, index, redraw);
                        }
                    });
                }
            };
            for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
                var point = _a[_i];
                _loop_1(point);
            }
        };
        Marker.prototype.renderMarker = function (series, point, location, index, redraw) {
            var seriesIndex = series.index === undefined ? series.category : series.index;
            var marker = series.marker;
            var border = {
                color: marker.border.color,
                width: marker.border.width
            };
            var borderColor = marker.border.color;
            var previousLocation;
            var previousPath;
            var circlePath;
            var shapeOption;
            location.x = location.x + marker.offset.x;
            location.y = location.y - marker.offset.y;
            var isBoxPlot = series.type === 'BoxAndWhisker';
            var fill = marker.fill || (isBoxPlot ? point.interior || series.interior : '#ffffff');
            var markerElement;
            var parentElement = isBoxPlot ?
                helper_2.findlElement(series.seriesElement.childNodes, 'Series_' + series.index + '_Point_' + point.index)
                : series.symbolElement;
            border.color = borderColor || series.setPointColor(point, series.interior);
            var symbolId = this.elementId + '_Series_' + seriesIndex + '_Point_' + point.index + '_Symbol' +
                (index ? index : '');
            var argsData = {
                cancel: false, name: constants_1.pointRender, series: series, point: point,
                fill: point.isEmpty ? (series.emptyPointSettings.fill || fill) : fill,
                border: {
                    color: series.type === 'BoxAndWhisker' ?
                        (!ej2_base_1.isNullOrUndefined(borderColor) && borderColor !== 'transparent') ? borderColor :
                            helper_3.getSaturationColor(fill, -0.6)
                        : border.color,
                    width: border.width
                },
                height: marker.height, width: marker.width, shape: marker.shape
            };
            argsData.border = series.setBorderColor(point, { width: argsData.border.width, color: argsData.border.color });
            if (!series.isRectSeries || series.type === 'BoxAndWhisker') {
                this.chart.trigger(constants_1.pointRender, argsData);
                point.color = argsData.fill;
            }
            point.color = argsData.fill;
            if (!argsData.cancel) {
                var y = void 0;
                if (series.type === 'RangeArea' || series.type === 'RangeColumn' || series.drawType === 'RangeColumn'
                    || series.type === 'SplineRangeArea') {
                    y = index ? point.low : point.high;
                }
                else if (isBoxPlot) {
                    y = point.outliers[index];
                }
                else {
                    y = point.y;
                }
                var markerFill = argsData.point.marker.fill || argsData.fill;
                var markerBorder = void 0;
                if (!ej2_base_1.isNullOrUndefined(argsData.point.marker.border)) {
                    markerBorder = {
                        color: argsData.point.marker.border.color || argsData.border.color,
                        width: argsData.point.marker.border.width || argsData.border.width
                    };
                }
                else {
                    markerBorder = { color: argsData.border.color, width: argsData.border.width };
                }
                var markerWidth = argsData.point.marker.width || argsData.width;
                var markerHeight = argsData.point.marker.height || argsData.height;
                var markerOpacity = argsData.point.marker.opacity || marker.opacity;
                var markerShape = argsData.point.marker.shape || argsData.shape;
                var imageURL = argsData.point.marker.imageUrl || marker.imageUrl;
                shapeOption = new ej2_svg_base_1.PathOption(symbolId, markerFill, markerBorder.width, markerBorder.color, markerOpacity, null);
                if ((parentElement !== undefined && parentElement !== null) || this.chart.enableCanvas) {
                    if (redraw && helper_1.getElement(shapeOption.id)) {
                        markerElement = helper_1.getElement(shapeOption.id);
                        circlePath = markerShape === 'Circle' ? 'c' : '';
                        previousLocation = {
                            x: +markerElement.getAttribute(circlePath + 'x'), y: +markerElement.getAttribute(circlePath + 'y')
                        };
                        previousPath = markerElement.getAttribute('d');
                    }
                    markerElement = helper_2.drawSymbol(location, markerShape, new ej2_svg_base_1.Size(markerWidth, markerHeight), imageURL, shapeOption, point.x.toString() + ':' + y.toString(), this.chart.renderer, series.clipRect);
                    helper_1.appendChildElement(this.chart.enableCanvas, parentElement, markerElement, redraw, true, circlePath + 'x', circlePath + 'y', previousLocation, previousPath, false, false, null, series.chart.duration);
                }
                point.marker = {
                    border: markerBorder, fill: markerFill, height: markerHeight,
                    visible: true, shape: markerShape, width: markerWidth, imageUrl: imageURL
                };
            }
            else {
                location = null;
                point.marker = {
                    visible: false
                };
            }
        };
        Marker.prototype.createElement = function (series, redraw) {
            var markerClipRect;
            var marker = series.marker;
            var explodeValue = marker.border.width + 8 + 5;
            var render = series.chart.svgRenderer;
            var index = series.index === undefined ? series.category : series.index;
            var options;
            var transform = series.chart.chartAreaType === 'Cartesian' ? 'translate(' + series.clipRect.x + ',' + (series.clipRect.y) + ')' : '';
            if (marker.visible) {
                var markerHeight = (marker.height + explodeValue) / 2;
                var markerWidth = (marker.width + explodeValue) / 2;
                if (series.chart.chartAreaType === 'Cartesian') {
                    options = new helper_1.RectOption(this.elementId + '_ChartMarkerClipRect_' + index, 'transparent', { width: 1, color: 'Gray' }, 1, {
                        x: -markerWidth, y: -markerHeight,
                        width: series.clipRect.width + markerWidth * 2,
                        height: series.clipRect.height + markerHeight * 2
                    });
                    markerClipRect = helper_1.appendClipElement(redraw, options, render);
                }
                else {
                    options = new helper_2.CircleOption(this.elementId + '_ChartMarkerClipRect_' + index, 'transparent', { width: 1, color: 'Gray' }, 1, series.clipRect.width / 2 + series.clipRect.x, series.clipRect.height / 2 + series.clipRect.y, series.chart.radius + Math.max(markerHeight, markerWidth));
                    markerClipRect = helper_1.appendClipElement(redraw, options, render, 'drawCircularClipPath');
                }
                options = {
                    'id': this.elementId + 'SymbolGroup' + index,
                    'transform': transform,
                    'clip-path': 'url(#' + this.elementId + '_ChartMarkerClipRect_' + index + ')'
                };
                series.symbolElement = render.createGroup(options);
                series.symbolElement.appendChild(markerClipRect);
                if (this.chart.enableCanvas) {
                    var element = document.getElementById(this.chart.element.id + '_tooltip_svg');
                    element.appendChild(series.symbolElement);
                }
            }
        };
        Marker.prototype.getRangeLowPoint = function (region, series) {
            var x = region.x;
            var y = region.y;
            if (series.chart.requireInvertedAxis) {
                y += region.height / 2;
                x += series.yAxis.isAxisInverse ? region.width : 0;
            }
            else {
                y += series.yAxis.isAxisInverse ? 0 : region.height;
                x += region.width / 2;
            }
            return { x: x, y: y };
        };
        Marker.prototype.doMarkerAnimation = function (series) {
            if (!(series.type === 'Scatter' || series.type === 'Bubble' || series.type === 'Candle' || series.type === 'Hilo' ||
                series.type === 'HiloOpenClose' || (series.chart.chartAreaType === 'PolarRadar' && (series.drawType === 'Scatter')))) {
                var markerElements = series.symbolElement.childNodes;
                var delay = series.animation.delay + series.animation.duration;
                var duration = series.chart.animated ? series.chart.duration : 200;
                var j = 1;
                var incFactor = (series.type === 'RangeArea' || series.type === 'RangeColumn' || series.type === 'SplineRangeArea') ? 2 : 1;
                for (var i = 0; i < series.points.length; i++) {
                    if (series.points[i].symbolLocations) {
                        if (!series.points[i].symbolLocations.length || !markerElements[j]) {
                            continue;
                        }
                        helper_2.markerAnimate(markerElements[j], delay, duration, series, i, series.points[i].symbolLocations[0], false);
                        if (incFactor === 2) {
                            var lowPoint = this.getRangeLowPoint(series.points[i].regions[0], series);
                            helper_2.markerAnimate(markerElements[j + 1], delay, duration, series, i, lowPoint, false);
                        }
                        j += incFactor;
                    }
                }
            }
        };
        return Marker;
    }(marker_explode_1.MarkerExplode));
    exports.Marker = Marker;
});
