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
define(["require", "exports", "./indicator-base"], function (require, exports, indicator_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AtrIndicator = (function (_super) {
        __extends(AtrIndicator, _super);
        function AtrIndicator() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AtrIndicator.prototype.initDataSource = function (indicator, chart) {
            var validData = indicator.points;
            if (validData.length > 0 && validData.length > indicator.period) {
                this.calculateATRPoints(indicator, validData);
            }
        };
        AtrIndicator.prototype.calculateATRPoints = function (indicator, validData) {
            var average = 0;
            var highLow = 0;
            var highClose = 0;
            var lowClose = 0;
            var trueRange = 0;
            var points = [];
            var temp = [];
            var period = indicator.period;
            var sum = 0;
            var y = 'y';
            var signalSeries = indicator.targetSeries[0];
            for (var i = 0; i < validData.length; i++) {
                highLow = Number(validData[i].high) - Number(validData[i].low);
                if (i > 0) {
                    highClose = Math.abs(Number(validData[i].high) - Number(validData[i - 1].close));
                    lowClose = Math.abs(Number(validData[i].low) - Number(validData[i - 1].close));
                }
                trueRange = Math.max(highLow, highClose, lowClose);
                sum = sum + trueRange;
                if (i >= period) {
                    average = (Number(temp[i - 1][y]) * (period - 1) + trueRange) / period;
                    points.push(this.getDataPoint(validData[i].x, average, validData[i], signalSeries, points.length));
                }
                else {
                    average = sum / period;
                    if (i === period - 1) {
                        points.push(this.getDataPoint(validData[i].x, average, validData[i], signalSeries, points.length));
                    }
                }
                temp[i] = { x: validData[i].x, y: average };
            }
            this.setSeriesRange(points, indicator);
        };
        AtrIndicator.prototype.destroy = function () {
        };
        AtrIndicator.prototype.getModuleName = function () {
            return 'AtrIndicator';
        };
        return AtrIndicator;
    }(indicator_base_1.TechnicalAnalysis));
    exports.AtrIndicator = AtrIndicator;
});
