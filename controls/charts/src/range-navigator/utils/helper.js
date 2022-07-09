define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function rangeValueToCoefficient(value, range, inversed) {
        var result = (value - range.min) / (range.delta);
        return inversed ? (1 - result) : result;
    }
    exports.rangeValueToCoefficient = rangeValueToCoefficient;
    function getXLocation(x, range, size, inversed) {
        x = rangeValueToCoefficient(x, range, inversed);
        return x * size;
    }
    exports.getXLocation = getXLocation;
    function getRangeValueXByPoint(value, size, range, inversed) {
        var actualValue = !inversed ? value / size : (1 - (value / size));
        return actualValue * (range.delta) + range.min;
    }
    exports.getRangeValueXByPoint = getRangeValueXByPoint;
    function getExactData(points, start, end) {
        var selectedData = [];
        points.map(function (point) {
            if (point.xValue >= start && point.xValue <= end) {
                selectedData.push({
                    'x': point.x,
                    'y': point.y
                });
            }
        });
        return selectedData;
    }
    exports.getExactData = getExactData;
    function getNearestValue(values, point) {
        return values.reduce(function (prev, curr) {
            return (Math.abs(curr - point) < Math.abs(prev - point) ? curr : prev);
        });
    }
    exports.getNearestValue = getNearestValue;
    var DataPoint = (function () {
        function DataPoint(x, y, xValue, yValue, visible) {
            if (visible === void 0) { visible = true; }
            this.x = x;
            this.y = y;
            this.xValue = xValue;
            this.visible = visible;
        }
        return DataPoint;
    }());
    exports.DataPoint = DataPoint;
});
