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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "@syncfusion/ej2-base", "../../common/model/base", "../series/chart-series", "../../common/utils/helper", "@syncfusion/ej2-svg-base"], function (require, exports, ej2_base_1, base_1, chart_series_1, helper_1, ej2_svg_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TechnicalIndicator = (function (_super) {
        __extends(TechnicalIndicator, _super);
        function TechnicalIndicator() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.clipRect = new ej2_svg_base_1.Rect(0, 0, 0, 0);
            return _this;
        }
        TechnicalIndicator.prototype.setDataSource = function (series, chart) {
            if (series) {
                this.xData = series.xData;
                this.yData = series.yData;
                this.points = series.points;
            }
            var type = helper_1.firstToLowerCase(this.type);
            chart[type + 'IndicatorModule'].initDataSource(this, chart);
            chart.visibleSeriesCount += this.targetSeries.length;
        };
        return TechnicalIndicator;
    }(chart_series_1.SeriesBase));
    __decorate([
        ej2_base_1.Property('Sma')
    ], TechnicalIndicator.prototype, "type", void 0);
    __decorate([
        ej2_base_1.Property(14)
    ], TechnicalIndicator.prototype, "period", void 0);
    __decorate([
        ej2_base_1.Property(14)
    ], TechnicalIndicator.prototype, "kPeriod", void 0);
    __decorate([
        ej2_base_1.Property(3)
    ], TechnicalIndicator.prototype, "dPeriod", void 0);
    __decorate([
        ej2_base_1.Property(80)
    ], TechnicalIndicator.prototype, "overBought", void 0);
    __decorate([
        ej2_base_1.Property(20)
    ], TechnicalIndicator.prototype, "overSold", void 0);
    __decorate([
        ej2_base_1.Property(2)
    ], TechnicalIndicator.prototype, "standardDeviation", void 0);
    __decorate([
        ej2_base_1.Property('Close')
    ], TechnicalIndicator.prototype, "field", void 0);
    __decorate([
        ej2_base_1.Property(12)
    ], TechnicalIndicator.prototype, "slowPeriod", void 0);
    __decorate([
        ej2_base_1.Property(26)
    ], TechnicalIndicator.prototype, "fastPeriod", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], TechnicalIndicator.prototype, "showZones", void 0);
    __decorate([
        ej2_base_1.Complex({ color: '#ff9933', width: 2 }, base_1.Connector)
    ], TechnicalIndicator.prototype, "macdLine", void 0);
    __decorate([
        ej2_base_1.Property('Both')
    ], TechnicalIndicator.prototype, "macdType", void 0);
    __decorate([
        ej2_base_1.Property('#2ecd71')
    ], TechnicalIndicator.prototype, "macdPositiveColor", void 0);
    __decorate([
        ej2_base_1.Property('#e74c3d')
    ], TechnicalIndicator.prototype, "macdNegativeColor", void 0);
    __decorate([
        ej2_base_1.Property('rgba(211,211,211,0.25)')
    ], TechnicalIndicator.prototype, "bandColor", void 0);
    __decorate([
        ej2_base_1.Complex({ color: '#ffb735', width: 1 }, base_1.Connector)
    ], TechnicalIndicator.prototype, "upperLine", void 0);
    __decorate([
        ej2_base_1.Complex({ color: '#f2ec2f', width: 1 }, base_1.Connector)
    ], TechnicalIndicator.prototype, "lowerLine", void 0);
    __decorate([
        ej2_base_1.Complex({ color: '#f2ec2f', width: 1 }, base_1.Connector)
    ], TechnicalIndicator.prototype, "periodLine", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], TechnicalIndicator.prototype, "seriesName", void 0);
    exports.TechnicalIndicator = TechnicalIndicator;
});
