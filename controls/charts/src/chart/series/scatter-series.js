define(["require", "exports", "../../common/utils/helper", "../../common/utils/helper", "@syncfusion/ej2-svg-base", "../../common/model/constants", "@syncfusion/ej2-base"], function (require, exports, helper_1, helper_2, ej2_svg_base_1, constants_1, ej2_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ScatterSeries = (function () {
        function ScatterSeries() {
        }
        ScatterSeries.prototype.render = function (series, xAxis, yAxis, isInverted) {
            series.isRectSeries = false;
            var marker = series.marker;
            var visiblePoints = this.enableComplexProperty(series);
            var argsData;
            var getCoordinate = series.chart.chartAreaType === 'PolarRadar' ? helper_2.TransformToVisible : helper_1.getPoint;
            var startLocation;
            var redraw = series.chart.redraw;
            for (var _i = 0, visiblePoints_1 = visiblePoints; _i < visiblePoints_1.length; _i++) {
                var point = visiblePoints_1[_i];
                startLocation = (redraw && point.symbolLocations) ? point.symbolLocations[0] : null;
                point.symbolLocations = [];
                point.regions = [];
                if (point.visible && helper_1.withInRange(visiblePoints[point.index - 1], point, visiblePoints[point.index + 1], series)) {
                    argsData = {
                        cancel: false, name: constants_1.pointRender, series: series, point: point,
                        fill: series.setPointColor(point, series.interior),
                        border: series.setBorderColor(point, { width: series.border.width, color: series.border.color }),
                        height: marker.height, width: marker.width, shape: marker.shape
                    };
                    series.chart.trigger(constants_1.pointRender, argsData);
                    if (!argsData.cancel) {
                        point.symbolLocations.push(getCoordinate(point.xValue, point.yValue, xAxis, yAxis, isInverted, series));
                        point.color = argsData.fill;
                        this.refresh(series, point, argsData, startLocation);
                    }
                    else {
                        point.marker = { visible: true };
                    }
                }
            }
        };
        ScatterSeries.prototype.enableComplexProperty = function (series) {
            var tempPoints2 = [];
            var tempPoints = [];
            var yVisibleRange = series.yAxis.visibleRange;
            var xVisibleRange = series.xAxis.visibleRange;
            var areaBounds = series.clipRect;
            var seriesPoints = series.points;
            var yTolerance = Math.abs(yVisibleRange.delta / areaBounds.height);
            var xTolerance = Math.abs(xVisibleRange.delta / areaBounds.width);
            var prevYValue = (seriesPoints[0] && seriesPoints[0].y > yTolerance) ? 0 : yTolerance;
            var prevXValue = (seriesPoints[0] && seriesPoints[0].x > xTolerance) ? 0 : xTolerance;
            var yVal = 0;
            var xVal = 0;
            for (var _i = 0, seriesPoints_1 = seriesPoints; _i < seriesPoints_1.length; _i++) {
                var currentPoint = seriesPoints_1[_i];
                currentPoint.symbolLocations = [];
                yVal = currentPoint.yValue ? currentPoint.yValue : yVisibleRange.min;
                xVal = currentPoint.xValue ? currentPoint.xValue : xVisibleRange.min;
                if (Math.abs(prevYValue - yVal) >= yTolerance || Math.abs(prevXValue - xVal) >= xTolerance) {
                    tempPoints.push(currentPoint);
                    prevYValue = yVal;
                    prevXValue = xVal;
                }
            }
            var currentTempPoint;
            for (var i = 0; i < tempPoints.length; i++) {
                currentTempPoint = tempPoints[i];
                if (ej2_base_1.isNullOrUndefined(currentTempPoint.x) || currentTempPoint.x === '') {
                    continue;
                }
                else {
                    tempPoints2.push(currentTempPoint);
                }
            }
            return tempPoints2;
        };
        ScatterSeries.prototype.refresh = function (series, point, argsData, startLocation) {
            var chart = series.chart;
            var circlePath;
            var previousPath;
            var marker = series.marker;
            var imageURL = argsData.point.marker.imageUrl || marker.imageUrl;
            var shapeOption = new ej2_svg_base_1.PathOption(chart.element.id + '_Series_' + series.index + '_Point_' + point.index, argsData.fill, argsData.border.width, argsData.border.color, series.opacity, null);
            if (chart.redraw && helper_1.getElement(shapeOption.id)) {
                circlePath = argsData.shape === 'Circle' ? 'c' : '';
                previousPath = helper_1.getElement(shapeOption.id).getAttribute('d');
            }
            helper_2.appendChildElement(false, series.seriesElement, helper_1.drawSymbol(point.symbolLocations[0], argsData.shape, new ej2_svg_base_1.Size(argsData.width, argsData.height), imageURL, shapeOption, point.x.toString() + ':' + point.yValue.toString(), series.chart.svgRenderer, series.clipRect), chart.redraw, true, circlePath + 'x', circlePath + 'y', startLocation, previousPath);
            point.regions.push(new ej2_svg_base_1.Rect(point.symbolLocations[0].x - marker.width, point.symbolLocations[0].y - marker.height, 2 * marker.width, 2 * marker.height));
            point.marker = {
                border: argsData.border, fill: argsData.fill,
                height: argsData.height, visible: true,
                width: argsData.width, shape: argsData.shape, imageUrl: imageURL
            };
        };
        ScatterSeries.prototype.doAnimation = function (series) {
            var duration = series.animation.duration;
            var delay = series.animation.delay;
            var rectElements = series.seriesElement.childNodes;
            var count = 1;
            for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
                var point = _a[_i];
                if (!point.symbolLocations.length || !rectElements[count]) {
                    continue;
                }
                helper_2.markerAnimate(rectElements[count], delay, duration, series, point.index, point.symbolLocations[0], false);
                count++;
            }
        };
        ScatterSeries.prototype.getModuleName = function () {
            return 'ScatterSeries';
        };
        ScatterSeries.prototype.destroy = function () {
        };
        return ScatterSeries;
    }());
    exports.ScatterSeries = ScatterSeries;
});
