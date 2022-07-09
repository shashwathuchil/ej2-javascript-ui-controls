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
define(["require", "exports", "@syncfusion/ej2-base", "../../chart/series/chart-series", "../../chart/axis/axis", "../../common/model/base", "../../common/model/theme"], function (require, exports, ej2_base_1, chart_series_1, axis_1, base_1, theme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StockChartFont = (function (_super) {
        __extends(StockChartFont, _super);
        function StockChartFont() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return StockChartFont;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property('')
    ], StockChartFont.prototype, "color", void 0);
    __decorate([
        ej2_base_1.Property('16px')
    ], StockChartFont.prototype, "size", void 0);
    __decorate([
        ej2_base_1.Property('Segoe UI')
    ], StockChartFont.prototype, "fontFamily", void 0);
    __decorate([
        ej2_base_1.Property('Normal')
    ], StockChartFont.prototype, "fontStyle", void 0);
    __decorate([
        ej2_base_1.Property('Normal')
    ], StockChartFont.prototype, "fontWeight", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], StockChartFont.prototype, "opacity", void 0);
    __decorate([
        ej2_base_1.Property('Trim')
    ], StockChartFont.prototype, "textOverflow", void 0);
    __decorate([
        ej2_base_1.Property('Center')
    ], StockChartFont.prototype, "textAlignment", void 0);
    exports.StockChartFont = StockChartFont;
    var StockChartBorder = (function (_super) {
        __extends(StockChartBorder, _super);
        function StockChartBorder() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return StockChartBorder;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property('')
    ], StockChartBorder.prototype, "color", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], StockChartBorder.prototype, "width", void 0);
    exports.StockChartBorder = StockChartBorder;
    var StockChartArea = (function (_super) {
        __extends(StockChartArea, _super);
        function StockChartArea() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return StockChartArea;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Complex({}, StockChartBorder)
    ], StockChartArea.prototype, "border", void 0);
    __decorate([
        ej2_base_1.Property('transparent')
    ], StockChartArea.prototype, "background", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], StockChartArea.prototype, "opacity", void 0);
    exports.StockChartArea = StockChartArea;
    var StockMargin = (function (_super) {
        __extends(StockMargin, _super);
        function StockMargin() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return StockMargin;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(10)
    ], StockMargin.prototype, "left", void 0);
    __decorate([
        ej2_base_1.Property(10)
    ], StockMargin.prototype, "right", void 0);
    __decorate([
        ej2_base_1.Property(10)
    ], StockMargin.prototype, "top", void 0);
    __decorate([
        ej2_base_1.Property(10)
    ], StockMargin.prototype, "bottom", void 0);
    exports.StockMargin = StockMargin;
    var StockChartStripLineSettings = (function (_super) {
        __extends(StockChartStripLineSettings, _super);
        function StockChartStripLineSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return StockChartStripLineSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(false)
    ], StockChartStripLineSettings.prototype, "startFromAxis", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], StockChartStripLineSettings.prototype, "visible", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], StockChartStripLineSettings.prototype, "start", void 0);
    __decorate([
        ej2_base_1.Property('#808080')
    ], StockChartStripLineSettings.prototype, "color", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], StockChartStripLineSettings.prototype, "end", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], StockChartStripLineSettings.prototype, "size", void 0);
    __decorate([
        ej2_base_1.Property('Auto')
    ], StockChartStripLineSettings.prototype, "sizeType", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], StockChartStripLineSettings.prototype, "dashArray", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], StockChartStripLineSettings.prototype, "isRepeat", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], StockChartStripLineSettings.prototype, "repeatEvery", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], StockChartStripLineSettings.prototype, "isSegmented", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], StockChartStripLineSettings.prototype, "repeatUntil", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], StockChartStripLineSettings.prototype, "segmentStart", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], StockChartStripLineSettings.prototype, "segmentAxisName", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], StockChartStripLineSettings.prototype, "segmentEnd", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], StockChartStripLineSettings.prototype, "opacity", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], StockChartStripLineSettings.prototype, "text", void 0);
    __decorate([
        ej2_base_1.Complex({ color: 'transparent', width: 1 }, StockChartBorder)
    ], StockChartStripLineSettings.prototype, "border", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], StockChartStripLineSettings.prototype, "rotation", void 0);
    __decorate([
        ej2_base_1.Property('Behind')
    ], StockChartStripLineSettings.prototype, "zIndex", void 0);
    __decorate([
        ej2_base_1.Property('Middle')
    ], StockChartStripLineSettings.prototype, "horizontalAlignment", void 0);
    __decorate([
        ej2_base_1.Property('Middle')
    ], StockChartStripLineSettings.prototype, "verticalAlignment", void 0);
    __decorate([
        ej2_base_1.Complex(theme_1.Theme.stripLineLabelFont, StockChartFont)
    ], StockChartStripLineSettings.prototype, "textStyle", void 0);
    exports.StockChartStripLineSettings = StockChartStripLineSettings;
    var Animation = (function (_super) {
        __extends(Animation, _super);
        function Animation() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Animation;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(0)
    ], Animation.prototype, "delay", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], Animation.prototype, "enable", void 0);
    __decorate([
        ej2_base_1.Property(1000)
    ], Animation.prototype, "duration", void 0);
    var StockEmptyPointSettings = (function (_super) {
        __extends(StockEmptyPointSettings, _super);
        function StockEmptyPointSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return StockEmptyPointSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(null)
    ], StockEmptyPointSettings.prototype, "fill", void 0);
    __decorate([
        ej2_base_1.Property('Gap')
    ], StockEmptyPointSettings.prototype, "mode", void 0);
    __decorate([
        ej2_base_1.Complex({ color: 'transparent', width: 0 }, StockChartBorder)
    ], StockEmptyPointSettings.prototype, "border", void 0);
    exports.StockEmptyPointSettings = StockEmptyPointSettings;
    var StockChartConnector = (function (_super) {
        __extends(StockChartConnector, _super);
        function StockChartConnector() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return StockChartConnector;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property('Line')
    ], StockChartConnector.prototype, "type", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], StockChartConnector.prototype, "length", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], StockChartConnector.prototype, "color", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], StockChartConnector.prototype, "dashArray", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], StockChartConnector.prototype, "width", void 0);
    exports.StockChartConnector = StockChartConnector;
    var StockSeries = (function (_super) {
        __extends(StockSeries, _super);
        function StockSeries() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.localData = undefined;
            return _this;
        }
        return StockSeries;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property('date')
    ], StockSeries.prototype, "xName", void 0);
    __decorate([
        ej2_base_1.Property('close')
    ], StockSeries.prototype, "yName", void 0);
    __decorate([
        ej2_base_1.Property('open')
    ], StockSeries.prototype, "open", void 0);
    __decorate([
        ej2_base_1.Property('close')
    ], StockSeries.prototype, "close", void 0);
    __decorate([
        ej2_base_1.Property('high')
    ], StockSeries.prototype, "high", void 0);
    __decorate([
        ej2_base_1.Property('low')
    ], StockSeries.prototype, "low", void 0);
    __decorate([
        ej2_base_1.Property('volume')
    ], StockSeries.prototype, "volume", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], StockSeries.prototype, "pointColorMapping", void 0);
    __decorate([
        ej2_base_1.Property('SeriesType')
    ], StockSeries.prototype, "legendShape", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], StockSeries.prototype, "legendImageUrl", void 0);
    __decorate([
        ej2_base_1.Complex(null, Animation)
    ], StockSeries.prototype, "animation", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], StockSeries.prototype, "xAxisName", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], StockSeries.prototype, "yAxisName", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], StockSeries.prototype, "fill", void 0);
    __decorate([
        ej2_base_1.Property('0')
    ], StockSeries.prototype, "dashArray", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], StockSeries.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], StockSeries.prototype, "name", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], StockSeries.prototype, "dataSource", void 0);
    __decorate([
        ej2_base_1.Property()
    ], StockSeries.prototype, "query", void 0);
    __decorate([
        ej2_base_1.Property('#e74c3d')
    ], StockSeries.prototype, "bullFillColor", void 0);
    __decorate([
        ej2_base_1.Property('#2ecd71')
    ], StockSeries.prototype, "bearFillColor", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], StockSeries.prototype, "enableSolidCandles", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], StockSeries.prototype, "visible", void 0);
    __decorate([
        ej2_base_1.Complex({ color: 'transparent', width: 0 }, StockChartBorder)
    ], StockSeries.prototype, "border", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], StockSeries.prototype, "opacity", void 0);
    __decorate([
        ej2_base_1.Property('Candle')
    ], StockSeries.prototype, "type", void 0);
    __decorate([
        ej2_base_1.Complex(null, chart_series_1.MarkerSettings)
    ], StockSeries.prototype, "marker", void 0);
    __decorate([
        ej2_base_1.Collection([], chart_series_1.Trendline)
    ], StockSeries.prototype, "trendlines", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], StockSeries.prototype, "enableTooltip", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], StockSeries.prototype, "tooltipMappingName", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], StockSeries.prototype, "selectionStyle", void 0);
    __decorate([
        ej2_base_1.Property(0.5)
    ], StockSeries.prototype, "cardinalSplineTension", void 0);
    __decorate([
        ej2_base_1.Complex(null, base_1.CornerRadius)
    ], StockSeries.prototype, "cornerRadius", void 0);
    __decorate([
        ej2_base_1.Complex(null, StockEmptyPointSettings)
    ], StockSeries.prototype, "emptyPointSettings", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], StockSeries.prototype, "columnWidth", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], StockSeries.prototype, "columnSpacing", void 0);
    exports.StockSeries = StockSeries;
    var StockChartIndicator = (function (_super) {
        __extends(StockChartIndicator, _super);
        function StockChartIndicator() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return StockChartIndicator;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property('Sma')
    ], StockChartIndicator.prototype, "type", void 0);
    __decorate([
        ej2_base_1.Property(14)
    ], StockChartIndicator.prototype, "period", void 0);
    __decorate([
        ej2_base_1.Property(3)
    ], StockChartIndicator.prototype, "dPeriod", void 0);
    __decorate([
        ej2_base_1.Property(14)
    ], StockChartIndicator.prototype, "kPeriod", void 0);
    __decorate([
        ej2_base_1.Property(80)
    ], StockChartIndicator.prototype, "overBought", void 0);
    __decorate([
        ej2_base_1.Property(20)
    ], StockChartIndicator.prototype, "overSold", void 0);
    __decorate([
        ej2_base_1.Property('Close')
    ], StockChartIndicator.prototype, "field", void 0);
    __decorate([
        ej2_base_1.Property(2)
    ], StockChartIndicator.prototype, "standardDeviation", void 0);
    __decorate([
        ej2_base_1.Property(12)
    ], StockChartIndicator.prototype, "slowPeriod", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], StockChartIndicator.prototype, "showZones", void 0);
    __decorate([
        ej2_base_1.Property(26)
    ], StockChartIndicator.prototype, "fastPeriod", void 0);
    __decorate([
        ej2_base_1.Complex({ color: '#ff9933', width: 2 }, StockChartConnector)
    ], StockChartIndicator.prototype, "macdLine", void 0);
    __decorate([
        ej2_base_1.Property('Both')
    ], StockChartIndicator.prototype, "macdType", void 0);
    __decorate([
        ej2_base_1.Property('#e74c3d')
    ], StockChartIndicator.prototype, "macdNegativeColor", void 0);
    __decorate([
        ej2_base_1.Property('#2ecd71')
    ], StockChartIndicator.prototype, "macdPositiveColor", void 0);
    __decorate([
        ej2_base_1.Property('rgba(211,211,211,0.25)')
    ], StockChartIndicator.prototype, "bandColor", void 0);
    __decorate([
        ej2_base_1.Complex({ color: '#ffb735', width: 1 }, StockChartConnector)
    ], StockChartIndicator.prototype, "upperLine", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], StockChartIndicator.prototype, "seriesName", void 0);
    __decorate([
        ej2_base_1.Complex({ color: '#f2ec2f', width: 1 }, StockChartConnector)
    ], StockChartIndicator.prototype, "periodLine", void 0);
    __decorate([
        ej2_base_1.Complex({ color: '#f2ec2f', width: 1 }, StockChartConnector)
    ], StockChartIndicator.prototype, "lowerLine", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], StockChartIndicator.prototype, "high", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], StockChartIndicator.prototype, "open", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], StockChartIndicator.prototype, "low", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], StockChartIndicator.prototype, "xName", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], StockChartIndicator.prototype, "close", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], StockChartIndicator.prototype, "pointColorMapping", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], StockChartIndicator.prototype, "volume", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], StockChartIndicator.prototype, "xAxisName", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], StockChartIndicator.prototype, "yAxisName", void 0);
    __decorate([
        ej2_base_1.Complex(null, Animation)
    ], StockChartIndicator.prototype, "animation", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], StockChartIndicator.prototype, "fill", void 0);
    __decorate([
        ej2_base_1.Property('0')
    ], StockChartIndicator.prototype, "dashArray", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], StockChartIndicator.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property()
    ], StockChartIndicator.prototype, "query", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], StockChartIndicator.prototype, "dataSource", void 0);
    exports.StockChartIndicator = StockChartIndicator;
    var StockChartAxis = (function (_super) {
        __extends(StockChartAxis, _super);
        function StockChartAxis() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return StockChartAxis;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Complex({}, axis_1.CrosshairTooltip)
    ], StockChartAxis.prototype, "crosshairTooltip", void 0);
    __decorate([
        ej2_base_1.Complex(theme_1.Theme.axisLabelFont, StockChartFont)
    ], StockChartAxis.prototype, "labelStyle", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], StockChartAxis.prototype, "title", void 0);
    __decorate([
        ej2_base_1.Complex(theme_1.Theme.axisTitleFont, StockChartFont)
    ], StockChartAxis.prototype, "titleStyle", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], StockChartAxis.prototype, "labelFormat", void 0);
    __decorate([
        ej2_base_1.Property('DateTime')
    ], StockChartAxis.prototype, "skeletonType", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], StockChartAxis.prototype, "skeleton", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], StockChartAxis.prototype, "plotOffset", void 0);
    __decorate([
        ej2_base_1.Property(10)
    ], StockChartAxis.prototype, "logBase", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], StockChartAxis.prototype, "rowIndex", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], StockChartAxis.prototype, "span", void 0);
    __decorate([
        ej2_base_1.Property(3)
    ], StockChartAxis.prototype, "maximumLabels", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], StockChartAxis.prototype, "desiredIntervals", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], StockChartAxis.prototype, "zoomFactor", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], StockChartAxis.prototype, "zoomPosition", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], StockChartAxis.prototype, "opposedPosition", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], StockChartAxis.prototype, "enableAutoIntervalOnZooming", void 0);
    __decorate([
        ej2_base_1.Property('Double')
    ], StockChartAxis.prototype, "valueType", void 0);
    __decorate([
        ej2_base_1.Property('Auto')
    ], StockChartAxis.prototype, "rangePadding", void 0);
    __decorate([
        ej2_base_1.Property('None')
    ], StockChartAxis.prototype, "edgeLabelPlacement", void 0);
    __decorate([
        ej2_base_1.Property('BetweenTicks')
    ], StockChartAxis.prototype, "labelPlacement", void 0);
    __decorate([
        ej2_base_1.Property('Auto')
    ], StockChartAxis.prototype, "intervalType", void 0);
    __decorate([
        ej2_base_1.Property('Outside')
    ], StockChartAxis.prototype, "tickPosition", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], StockChartAxis.prototype, "name", void 0);
    __decorate([
        ej2_base_1.Property('Outside')
    ], StockChartAxis.prototype, "labelPosition", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], StockChartAxis.prototype, "visible", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], StockChartAxis.prototype, "labelRotation", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], StockChartAxis.prototype, "minorTicksPerInterval", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], StockChartAxis.prototype, "crossesAt", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], StockChartAxis.prototype, "crossesInAxis", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], StockChartAxis.prototype, "placeNextToAxisLine", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], StockChartAxis.prototype, "minimum", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], StockChartAxis.prototype, "interval", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], StockChartAxis.prototype, "maximum", void 0);
    __decorate([
        ej2_base_1.Property(34)
    ], StockChartAxis.prototype, "maximumLabelWidth", void 0);
    __decorate([
        ej2_base_1.Complex({}, axis_1.MajorTickLines)
    ], StockChartAxis.prototype, "majorTickLines", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], StockChartAxis.prototype, "enableTrim", void 0);
    __decorate([
        ej2_base_1.Complex({}, axis_1.MinorTickLines)
    ], StockChartAxis.prototype, "minorTickLines", void 0);
    __decorate([
        ej2_base_1.Complex({}, axis_1.MinorGridLines)
    ], StockChartAxis.prototype, "minorGridLines", void 0);
    __decorate([
        ej2_base_1.Complex({}, axis_1.MajorGridLines)
    ], StockChartAxis.prototype, "majorGridLines", void 0);
    __decorate([
        ej2_base_1.Complex({}, axis_1.AxisLine)
    ], StockChartAxis.prototype, "lineStyle", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], StockChartAxis.prototype, "isInversed", void 0);
    __decorate([
        ej2_base_1.Property('Trim')
    ], StockChartAxis.prototype, "labelIntersectAction", void 0);
    __decorate([
        ej2_base_1.Property(100)
    ], StockChartAxis.prototype, "coefficient", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], StockChartAxis.prototype, "startAngle", void 0);
    __decorate([
        ej2_base_1.Property(2)
    ], StockChartAxis.prototype, "tabIndex", void 0);
    __decorate([
        ej2_base_1.Collection([], StockChartStripLineSettings)
    ], StockChartAxis.prototype, "stripLines", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], StockChartAxis.prototype, "description", void 0);
    exports.StockChartAxis = StockChartAxis;
    var StockChartRow = (function (_super) {
        __extends(StockChartRow, _super);
        function StockChartRow() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return StockChartRow;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property('100%')
    ], StockChartRow.prototype, "height", void 0);
    __decorate([
        ej2_base_1.Complex({}, StockChartBorder)
    ], StockChartRow.prototype, "border", void 0);
    exports.StockChartRow = StockChartRow;
    var StockChartTrendline = (function (_super) {
        __extends(StockChartTrendline, _super);
        function StockChartTrendline() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return StockChartTrendline;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(2)
    ], StockChartTrendline.prototype, "period", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], StockChartTrendline.prototype, "name", void 0);
    __decorate([
        ej2_base_1.Property('Linear')
    ], StockChartTrendline.prototype, "type", void 0);
    __decorate([
        ej2_base_1.Property(2)
    ], StockChartTrendline.prototype, "polynomialOrder", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], StockChartTrendline.prototype, "forwardForecast", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], StockChartTrendline.prototype, "backwardForecast", void 0);
    __decorate([
        ej2_base_1.Complex({}, Animation)
    ], StockChartTrendline.prototype, "animation", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], StockChartTrendline.prototype, "enableTooltip", void 0);
    __decorate([
        ej2_base_1.Complex({}, chart_series_1.MarkerSettings)
    ], StockChartTrendline.prototype, "marker", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], StockChartTrendline.prototype, "intercept", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], StockChartTrendline.prototype, "fill", void 0);
    __decorate([
        ej2_base_1.Property('SeriesType')
    ], StockChartTrendline.prototype, "legendShape", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], StockChartTrendline.prototype, "width", void 0);
    exports.StockChartTrendline = StockChartTrendline;
    var StockChartAnnotationSettings = (function (_super) {
        __extends(StockChartAnnotationSettings, _super);
        function StockChartAnnotationSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return StockChartAnnotationSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property('0')
    ], StockChartAnnotationSettings.prototype, "y", void 0);
    __decorate([
        ej2_base_1.Property('0')
    ], StockChartAnnotationSettings.prototype, "x", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], StockChartAnnotationSettings.prototype, "content", void 0);
    __decorate([
        ej2_base_1.Property('Chart')
    ], StockChartAnnotationSettings.prototype, "region", void 0);
    __decorate([
        ej2_base_1.Property('Center')
    ], StockChartAnnotationSettings.prototype, "horizontalAlignment", void 0);
    __decorate([
        ej2_base_1.Property('Pixel')
    ], StockChartAnnotationSettings.prototype, "coordinateUnits", void 0);
    __decorate([
        ej2_base_1.Property('Middle')
    ], StockChartAnnotationSettings.prototype, "verticalAlignment", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], StockChartAnnotationSettings.prototype, "yAxisName", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], StockChartAnnotationSettings.prototype, "description", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], StockChartAnnotationSettings.prototype, "xAxisName", void 0);
    exports.StockChartAnnotationSettings = StockChartAnnotationSettings;
    var StockChartIndexes = (function (_super) {
        __extends(StockChartIndexes, _super);
        function StockChartIndexes() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return StockChartIndexes;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(0)
    ], StockChartIndexes.prototype, "point", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], StockChartIndexes.prototype, "series", void 0);
    exports.StockChartIndexes = StockChartIndexes;
    var StockEventsSettings = (function (_super) {
        __extends(StockEventsSettings, _super);
        function StockEventsSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return StockEventsSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property('Circle')
    ], StockEventsSettings.prototype, "type", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], StockEventsSettings.prototype, "text", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], StockEventsSettings.prototype, "description", void 0);
    __decorate([
        ej2_base_1.Property()
    ], StockEventsSettings.prototype, "date", void 0);
    __decorate([
        ej2_base_1.Complex({ color: 'black', width: 1 }, StockChartBorder)
    ], StockEventsSettings.prototype, "border", void 0);
    __decorate([
        ej2_base_1.Property('transparent')
    ], StockEventsSettings.prototype, "background", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], StockEventsSettings.prototype, "showOnSeries", void 0);
    __decorate([
        ej2_base_1.Property('close')
    ], StockEventsSettings.prototype, "placeAt", void 0);
    __decorate([
        ej2_base_1.Complex(theme_1.Theme.stockEventFont, StockChartFont)
    ], StockEventsSettings.prototype, "textStyle", void 0);
    __decorate([
        ej2_base_1.Property([])
    ], StockEventsSettings.prototype, "seriesIndexes", void 0);
    exports.StockEventsSettings = StockEventsSettings;
});
