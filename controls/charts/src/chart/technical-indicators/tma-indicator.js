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
define(["require", "exports", "../../common/utils/helper", "./indicator-base"], function (require, exports, helper_1, indicator_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TmaIndicator = (function (_super) {
        __extends(TmaIndicator, _super);
        function TmaIndicator() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TmaIndicator.prototype.initDataSource = function (indicator, chart) {
            var tmaPoints = [];
            var field = helper_1.firstToLowerCase(indicator.field);
            var xField = 'x';
            var validData = indicator.points;
            if (validData && validData.length && validData.length >= indicator.period) {
                var signalSeries = indicator.targetSeries[0];
                var validData_1 = indicator.points;
                if (validData_1.length && validData_1.length >= indicator.period) {
                    var sum = 0;
                    var smaValues = [];
                    var index = 0;
                    var length_1 = validData_1.length;
                    var period = indicator.period;
                    while (length_1 >= period) {
                        sum = 0;
                        index = validData_1.length - length_1;
                        for (var j = index; j < index + period; j++) {
                            sum = sum + validData_1[j][field];
                        }
                        sum = sum / period;
                        smaValues.push(sum);
                        length_1--;
                    }
                    for (var k = 0; k < period - 1; k++) {
                        sum = 0;
                        for (var j = 0; j < k + 1; j++) {
                            sum = sum + validData_1[j][field];
                        }
                        sum = sum / (k + 1);
                        smaValues.splice(k, 0, sum);
                    }
                    index = indicator.period;
                    while (index <= smaValues.length) {
                        sum = 0;
                        for (var j = index - indicator.period; j < index; j++) {
                            sum = sum + smaValues[j];
                        }
                        sum = sum / indicator.period;
                        tmaPoints.push(this.getDataPoint(validData_1[index - 1][xField], sum, validData_1[index - 1], signalSeries, tmaPoints.length));
                        index++;
                    }
                }
            }
            this.setSeriesRange(tmaPoints, indicator);
        };
        TmaIndicator.prototype.destroy = function () {
        };
        TmaIndicator.prototype.getModuleName = function () {
            return 'TmaIndicator';
        };
        return TmaIndicator;
    }(indicator_base_1.TechnicalAnalysis));
    exports.TmaIndicator = TmaIndicator;
});
