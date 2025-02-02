define(["require", "exports", "../../common/utils/helper", "@syncfusion/ej2-svg-base"], function (require, exports, helper_1, ej2_svg_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChartData = (function () {
        function ChartData(chart) {
            this.currentPoints = [];
            this.previousPoints = [];
            this.insideRegion = false;
            this.commonXvalues = [];
            this.chart = chart;
            this.lierIndex = 0;
        }
        ChartData.prototype.getData = function () {
            var chart = this.chart;
            var point = null;
            var series = null;
            var width;
            var height;
            var mouseX;
            var mouseY;
            for (var len = chart.visibleSeries.length, i = len - 1; i >= 0; i--) {
                series = chart.visibleSeries[i];
                width = (series.type === 'Scatter' || series.drawType === 'Scatter' || (series.marker.visible))
                    ? (series.marker.height + 5) / 2 : 0;
                height = (series.type === 'Scatter' || series.drawType === 'Scatter' || (series.marker.visible))
                    ? (series.marker.width + 5) / 2 : 0;
                mouseX = chart.mouseX;
                mouseY = chart.mouseY;
                if (series.dragSettings.enable && series.isRectSeries) {
                    if (!(series.type === 'Bar' && chart.isTransposed) && (chart.isTransposed || series.type === 'Bar')) {
                        var markerWidth = series.marker.width / 2;
                        mouseX = series.yAxis.isAxisInverse ? mouseX + markerWidth : mouseX - markerWidth;
                    }
                    else {
                        var markerHeight = series.marker.height / 2;
                        mouseY = series.yAxis.isAxisInverse ? mouseY - markerHeight : mouseY + markerHeight;
                    }
                }
                if (series.visible && helper_1.withInBounds(mouseX, mouseY, series.clipRect, width, height)) {
                    point = this.getRectPoint(series, series.clipRect, mouseX, mouseY);
                }
                if (point) {
                    return new helper_1.PointData(point, series);
                }
            }
            return new helper_1.PointData(point, series);
        };
        ChartData.prototype.isSelected = function (chart) {
            return ((chart.selectionMode.indexOf('Drag') > -1 || chart.selectionMode.indexOf('Lasso') > -1) && chart.selectionModule &&
                chart.selectionModule.rectPoints !== null);
        };
        ChartData.prototype.getRectPoint = function (series, rect, x, y) {
            var chart = this.chart;
            var fromCenterX;
            var fromCenterY;
            var clickAngle;
            var arcAngle = 0;
            var startAngle;
            var endAngle;
            var distanceFromCenter;
            if (chart.isScrolling) {
                return null;
            }
            for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
                var point = _a[_i];
                if (!point.regionData) {
                    if (!point.regions || !point.regions.length) {
                        continue;
                    }
                }
                if (point.regionData && this.chart.chartAreaType === 'PolarRadar' && series.drawType.indexOf('Column') > -1) {
                    fromCenterX = x - (series.clipRect.width / 2 + series.clipRect.x);
                    fromCenterY = y - (series.clipRect.height / 2 + series.clipRect.y);
                    arcAngle = 2 * Math.PI * (point.regionData.currentXPosition < 0 ? 1 + point.regionData.currentXPosition
                        : point.regionData.currentXPosition);
                    clickAngle = (Math.atan2(fromCenterY, fromCenterX) + 0.5 * Math.PI - arcAngle) % (2 * Math.PI);
                    clickAngle = clickAngle < 0 ? 2 * Math.PI + clickAngle : clickAngle;
                    clickAngle = clickAngle + 2 * Math.PI * series.chart.primaryXAxis.startAngle;
                    startAngle = point.regionData.startAngle;
                    startAngle -= arcAngle;
                    startAngle = startAngle < 0 ? 2 * Math.PI + startAngle : startAngle;
                    endAngle = point.regionData.endAngle;
                    endAngle -= arcAngle;
                    endAngle = endAngle < 0 ? 2 * Math.PI + endAngle : endAngle;
                    distanceFromCenter = Math.sqrt(Math.pow(Math.abs(fromCenterX), 2) + Math.pow(Math.abs(fromCenterY), 2));
                    if (clickAngle >= startAngle && clickAngle <= endAngle &&
                        (((distanceFromCenter >= point.regionData.innerRadius && distanceFromCenter <= point.regionData.radius) ||
                            (distanceFromCenter <= point.regionData.innerRadius && distanceFromCenter >= point.regionData.radius))
                            && distanceFromCenter <= series.chart.radius)) {
                        return point;
                    }
                }
                if ((series.dragSettings.enable && series.isRectSeries) || (series.isRectSeries && series.marker.visible)) {
                    if (this.isPointInThresholdRegion(x, y, point, rect, series)) {
                        this.insideRegion = true;
                        return point;
                    }
                }
                if (!this.insideRegion && this.checkRegionContainsPoint(point.regions, rect, x, y)) {
                    return point;
                }
                else if (this.insideRegion && this.checkRegionContainsPoint(point.regions, rect, x, y)) {
                    return point;
                }
            }
            return null;
        };
        ChartData.prototype.checkRegionContainsPoint = function (regionRect, rect, x, y) {
            var _this = this;
            return regionRect.some(function (region, index) {
                _this.lierIndex = index;
                return helper_1.withInBounds(x, y, new ej2_svg_base_1.Rect((_this.chart.chartAreaType === 'Cartesian' ? rect.x : 0) + region.x, (_this.chart.chartAreaType === 'Cartesian' ? rect.y : 0) + region.y, region.width, region.height));
            });
        };
        ChartData.prototype.isPointInThresholdRegion = function (x, y, point, rect, series) {
            var _this = this;
            var isBar = series.type === 'Bar';
            var isInversed = series.yAxis.isAxisInverse;
            var isTransposed = series.chart.isTransposed;
            var heightValue = 10;
            var yValue = 0;
            var xValue = 0;
            var width;
            var height = width = 2 * heightValue;
            if (isInversed && isTransposed) {
                if (isBar) {
                    yValue = point.regions[0].height - heightValue;
                    width = point.regions[0].width;
                }
                else {
                    xValue = -heightValue;
                    height = point.regions[0].height;
                }
            }
            else if (isInversed || point.yValue < 0) {
                if (isBar) {
                    xValue = -heightValue;
                    height = point.regions[0].height;
                }
                else {
                    yValue = point.regions[0].height - heightValue;
                    width = point.regions[0].width;
                }
            }
            else if (isTransposed) {
                if (isBar) {
                    yValue = -heightValue;
                    width = point.regions[0].width;
                }
                else {
                    xValue = point.regions[0].width - heightValue;
                    height = point.regions[0].height;
                }
            }
            else {
                if (isBar) {
                    xValue = point.regions[0].width - heightValue;
                    height = point.regions[0].height;
                }
                else {
                    yValue = -heightValue;
                    width = point.regions[0].width;
                }
            }
            return point.regions.some(function (region) {
                return helper_1.withInBounds(x, y, new ej2_svg_base_1.Rect((_this.chart.chartAreaType === 'Cartesian' ? rect.x : 0) + region.x + xValue, (_this.chart.chartAreaType === 'Cartesian' ? rect.y : 0) + region.y + yValue, width, height));
            });
        };
        ChartData.prototype.getClosest = function (series, value, xvalues) {
            var closest;
            var data;
            var xData = xvalues ? xvalues : series.xData;
            var xLength = xData.length;
            if (value >= series.xMin - 0.5 && value <= series.xMax + 0.5) {
                for (var i = 0; i < xLength; i++) {
                    data = xData[i];
                    if (closest == null || Math.abs(data - value) < Math.abs(closest - value)) {
                        closest = data;
                    }
                }
            }
            var isDataExist = series.xData.indexOf(closest) !== -1;
            if (isDataExist) {
                return closest;
            }
            else {
                return null;
            }
        };
        ChartData.prototype.binarySearch = function (target, list) {
            var first = 0;
            var last = list.length;
            var position = -1;
            var found = false;
            var middle;
            while (found == false && first <= last) {
                middle = Math.floor((first + last) / 2);
                if (list[middle].xValue == target) {
                    found = true;
                    position = middle;
                }
                else if (list[middle].xValue > target) {
                    last = middle - 1;
                }
                else {
                    first = middle + 1;
                }
            }
            return position !== -1 ? list[position] : null;
        };
        ChartData.prototype.getClosestX = function (chart, series, xvalues) {
            var value;
            var rect = series.clipRect;
            if (!chart.requireInvertedAxis) {
                value = helper_1.getValueXByPoint(chart.mouseX - rect.x, rect.width, series.xAxis);
            }
            else {
                value = helper_1.getValueYByPoint(chart.mouseY - rect.y, rect.height, series.xAxis);
            }
            var closest = this.getClosest(series, value, xvalues);
            var point = (closest || closest === 0) ? this.binarySearch(closest, helper_1.sort(series.points, ['xValue'])) : null;
            if (point && point.visible) {
                return new helper_1.PointData(point, series);
            }
            return null;
        };
        ChartData.prototype.mergeXvalues = function (visibleSeries) {
            if (visibleSeries.length && (!this.commonXvalues.length || (this.commonXvalues.length !== visibleSeries[0].xData.length))) {
                this.commonXvalues = visibleSeries[0].xData;
                for (var index = 1; index < visibleSeries.length; index++) {
                    this.commonXvalues = this.getDistinctValues(this.commonXvalues, visibleSeries[index].xData);
                }
            }
            return this.commonXvalues;
        };
        ChartData.prototype.getDistinctValues = function (first, second) {
            if (second === void 0) { second = []; }
            var intial = {};
            var result = [];
            var index;
            for (index = 0; index < first.length; index++) {
                var temp = first[index];
                if (!intial[temp]) {
                    intial[temp] = true;
                    result.push(temp);
                }
            }
            for (index = 0; index < second.length; index++) {
                var temp = second[index];
                if (!intial[temp]) {
                    intial[temp] = true;
                    result.push(temp);
                }
            }
            return result;
        };
        return ChartData;
    }());
    exports.ChartData = ChartData;
});
