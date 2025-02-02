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
define(["require", "exports", "../series/chart-series", "./indicator-base"], function (require, exports, chart_series_1, indicator_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MacdIndicator = (function (_super) {
        __extends(MacdIndicator, _super);
        function MacdIndicator() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MacdIndicator.prototype.initSeriesCollection = function (indicator, chart) {
            _super.prototype.initSeriesCollection.call(this, indicator, chart);
            if (indicator.macdType === 'Line' || indicator.macdType === 'Both') {
                var macdSeries = new chart_series_1.Series(indicator, 'targetSeries', {}, true);
                this.setSeriesProperties(macdSeries, indicator, 'MacdLine', indicator.macdLine.color, indicator.macdLine.width, chart);
            }
            if (indicator.macdType === 'Histogram' || indicator.macdType === 'Both') {
                var histogramSeries = new chart_series_1.Series(indicator, 'targetSeries', {}, true);
                histogramSeries.type = 'Column';
                this.setSeriesProperties(histogramSeries, indicator, 'Histogram', indicator.macdPositiveColor, indicator.width, chart);
            }
        };
        MacdIndicator.prototype.initDataSource = function (indicator, chart) {
            var signalCollection = [];
            var fastPeriod = indicator.fastPeriod;
            var slowPeriod = indicator.slowPeriod;
            var trigger = indicator.period;
            var length = fastPeriod + trigger;
            var macdCollection = [];
            var histogramCollection = [];
            var validData = indicator.points;
            var signalSeries = indicator.targetSeries[0];
            var histogramSeries;
            var macdLineSeries;
            if (indicator.macdType === 'Histogram') {
                histogramSeries = indicator.targetSeries[1];
            }
            else {
                macdLineSeries = indicator.targetSeries[1];
                if (indicator.macdType === 'Both') {
                    histogramSeries = indicator.targetSeries[2];
                }
            }
            if (validData && length < validData.length && slowPeriod <= fastPeriod &&
                slowPeriod > 0 && (length - 2) >= 0) {
                var shortEMA = this.calculateEMAValues(slowPeriod, validData, 'close');
                var longEMA = this.calculateEMAValues(fastPeriod, validData, 'close');
                var macdValues = this.getMACDVales(indicator, shortEMA, longEMA);
                macdCollection = this.getMACDPoints(indicator, macdValues, validData, macdLineSeries || signalSeries);
                var signalEMA = this.calculateEMAValues(trigger, macdCollection, 'y');
                signalCollection = this.getSignalPoints(indicator, signalEMA, validData, signalSeries);
                if (histogramSeries) {
                    histogramCollection = this.getHistogramPoints(indicator, macdValues, signalEMA, validData, histogramSeries);
                }
            }
            this.setSeriesRange(signalCollection, indicator, indicator.targetSeries[0]);
            if (histogramSeries) {
                this.setSeriesRange(histogramCollection, indicator, histogramSeries);
            }
            if (macdLineSeries) {
                this.setSeriesRange(macdCollection, indicator, macdLineSeries);
            }
        };
        MacdIndicator.prototype.calculateEMAValues = function (period, validData, field) {
            var sum = 0;
            var initialEMA = 0;
            var emaValues = [];
            var emaPercent = (2 / (period + 1));
            for (var i = 0; i < period; i++) {
                sum += Number(validData[i][field]);
            }
            initialEMA = (sum / period);
            emaValues.push(initialEMA);
            var emaAvg = initialEMA;
            for (var j = period; j < validData.length; j++) {
                emaAvg = (Number(validData[j][field]) - emaAvg) * emaPercent + emaAvg;
                emaValues.push(emaAvg);
            }
            return emaValues;
        };
        MacdIndicator.prototype.getMACDPoints = function (indicator, macdPoints, validData, series) {
            var macdCollection = [];
            var dataMACDIndex = indicator.fastPeriod - 1;
            var macdIndex = 0;
            while (dataMACDIndex < validData.length) {
                macdCollection.push(this.getDataPoint(validData[dataMACDIndex].x, macdPoints[macdIndex], validData[dataMACDIndex], series, macdCollection.length));
                dataMACDIndex++;
                macdIndex++;
            }
            return macdCollection;
        };
        MacdIndicator.prototype.getSignalPoints = function (indicator, signalEma, validData, series) {
            var dataSignalIndex = indicator.fastPeriod + indicator.period - 2;
            var signalIndex = 0;
            var signalCollection = [];
            while (dataSignalIndex < validData.length) {
                signalCollection.push(this.getDataPoint(validData[dataSignalIndex].x, signalEma[signalIndex], validData[dataSignalIndex], series, signalCollection.length));
                dataSignalIndex++;
                signalIndex++;
            }
            return signalCollection;
        };
        MacdIndicator.prototype.getMACDVales = function (indicator, shortEma, longEma) {
            var macdPoints = [];
            var diff = indicator.fastPeriod - indicator.slowPeriod;
            for (var i = 0; i < longEma.length; i++) {
                macdPoints.push((shortEma[i + diff] - longEma[i]));
            }
            return macdPoints;
        };
        MacdIndicator.prototype.getHistogramPoints = function (indicator, macdPoints, signalEma, validData, series) {
            var dataHistogramIndex = indicator.fastPeriod + indicator.period - 2;
            var histogramIndex = 0;
            var histogramCollection = [];
            while (dataHistogramIndex < validData.length) {
                histogramCollection.push(this.getDataPoint(validData[dataHistogramIndex].x, macdPoints[histogramIndex + (indicator.period - 1)] - signalEma[histogramIndex], validData[dataHistogramIndex], series, histogramCollection.length, indicator));
                dataHistogramIndex++;
                histogramIndex++;
            }
            return histogramCollection;
        };
        MacdIndicator.prototype.destroy = function () {
        };
        MacdIndicator.prototype.getModuleName = function () {
            return 'MacdIndicator';
        };
        return MacdIndicator;
    }(indicator_base_1.TechnicalAnalysis));
    exports.MacdIndicator = MacdIndicator;
});
