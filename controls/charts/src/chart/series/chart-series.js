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
define(["require", "exports", "@syncfusion/ej2-base", "@syncfusion/ej2-base", "../../common/utils/helper", "../../common/utils/helper", "@syncfusion/ej2-svg-base", "../../common/model/base", "@syncfusion/ej2-data", "../../common/model/base", "../../common/model/constants", "../../common/utils/helper", "@syncfusion/ej2-base"], function (require, exports, ej2_base_1, ej2_base_2, helper_1, helper_2, ej2_svg_base_1, base_1, ej2_data_1, base_2, constants_1, helper_3, ej2_base_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DataLabelSettings = (function (_super) {
        __extends(DataLabelSettings, _super);
        function DataLabelSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return DataLabelSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(false)
    ], DataLabelSettings.prototype, "visible", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], DataLabelSettings.prototype, "showZero", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], DataLabelSettings.prototype, "name", void 0);
    __decorate([
        ej2_base_1.Property('transparent')
    ], DataLabelSettings.prototype, "fill", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], DataLabelSettings.prototype, "opacity", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], DataLabelSettings.prototype, "angle", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], DataLabelSettings.prototype, "enableRotation", void 0);
    __decorate([
        ej2_base_1.Property('Auto')
    ], DataLabelSettings.prototype, "position", void 0);
    __decorate([
        ej2_base_1.Property(5)
    ], DataLabelSettings.prototype, "rx", void 0);
    __decorate([
        ej2_base_1.Property(5)
    ], DataLabelSettings.prototype, "ry", void 0);
    __decorate([
        ej2_base_1.Property('Center')
    ], DataLabelSettings.prototype, "alignment", void 0);
    __decorate([
        ej2_base_1.Complex({ width: null, color: null }, base_1.Border)
    ], DataLabelSettings.prototype, "border", void 0);
    __decorate([
        ej2_base_1.Complex({ left: 5, right: 5, top: 5, bottom: 5 }, base_1.Margin)
    ], DataLabelSettings.prototype, "margin", void 0);
    __decorate([
        ej2_base_1.Complex({ size: '11px', color: '', fontStyle: 'Normal', fontWeight: 'Normal', fontFamily: 'Segoe UI' }, base_1.Font)
    ], DataLabelSettings.prototype, "font", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], DataLabelSettings.prototype, "template", void 0);
    __decorate([
        ej2_base_1.Property('Hide')
    ], DataLabelSettings.prototype, "labelIntersectAction", void 0);
    exports.DataLabelSettings = DataLabelSettings;
    var MarkerSettings = (function (_super) {
        __extends(MarkerSettings, _super);
        function MarkerSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MarkerSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(false)
    ], MarkerSettings.prototype, "visible", void 0);
    __decorate([
        ej2_base_1.Property('Circle')
    ], MarkerSettings.prototype, "shape", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], MarkerSettings.prototype, "imageUrl", void 0);
    __decorate([
        ej2_base_1.Property(5)
    ], MarkerSettings.prototype, "height", void 0);
    __decorate([
        ej2_base_1.Property(5)
    ], MarkerSettings.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Complex({ width: 2, color: null }, base_1.Border)
    ], MarkerSettings.prototype, "border", void 0);
    __decorate([
        ej2_base_1.Complex({ x: 0, y: 0 }, base_2.Offset)
    ], MarkerSettings.prototype, "offset", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], MarkerSettings.prototype, "fill", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], MarkerSettings.prototype, "opacity", void 0);
    __decorate([
        ej2_base_1.Complex({}, DataLabelSettings)
    ], MarkerSettings.prototype, "dataLabel", void 0);
    exports.MarkerSettings = MarkerSettings;
    var Points = (function () {
        function Points() {
            this.symbolLocations = null;
            this.regions = null;
            this.percentage = null;
            this.regionData = null;
            this.isSelect = false;
            this.marker = {
                visible: false
            };
            this.isPointInRange = true;
        }
        return Points;
    }());
    exports.Points = Points;
    var Trendline = (function (_super) {
        __extends(Trendline, _super);
        function Trendline() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.clipRect = new ej2_svg_base_1.Rect(0, 0, 0, 0);
            return _this;
        }
        Trendline.prototype.setDataSource = function (series, chart) {
            if (series) {
                this.points = series.points;
            }
            chart.trendLineModule.initDataSource(this);
            chart.visibleSeriesCount++;
        };
        return Trendline;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property('')
    ], Trendline.prototype, "name", void 0);
    __decorate([
        ej2_base_1.Property('0')
    ], Trendline.prototype, "dashArray", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], Trendline.prototype, "visible", void 0);
    __decorate([
        ej2_base_1.Property('Linear')
    ], Trendline.prototype, "type", void 0);
    __decorate([
        ej2_base_1.Property(2)
    ], Trendline.prototype, "period", void 0);
    __decorate([
        ej2_base_1.Property(2)
    ], Trendline.prototype, "polynomialOrder", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], Trendline.prototype, "backwardForecast", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], Trendline.prototype, "forwardForecast", void 0);
    __decorate([
        ej2_base_1.Complex({}, base_1.Animation)
    ], Trendline.prototype, "animation", void 0);
    __decorate([
        ej2_base_1.Complex({}, MarkerSettings)
    ], Trendline.prototype, "marker", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], Trendline.prototype, "enableTooltip", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Trendline.prototype, "intercept", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], Trendline.prototype, "fill", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], Trendline.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property('SeriesType')
    ], Trendline.prototype, "legendShape", void 0);
    exports.Trendline = Trendline;
    var ErrorBarCapSettings = (function (_super) {
        __extends(ErrorBarCapSettings, _super);
        function ErrorBarCapSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ErrorBarCapSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(1)
    ], ErrorBarCapSettings.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property(10)
    ], ErrorBarCapSettings.prototype, "length", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], ErrorBarCapSettings.prototype, "color", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], ErrorBarCapSettings.prototype, "opacity", void 0);
    exports.ErrorBarCapSettings = ErrorBarCapSettings;
    var ChartSegment = (function (_super) {
        __extends(ChartSegment, _super);
        function ChartSegment() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ChartSegment;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(null)
    ], ChartSegment.prototype, "value", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], ChartSegment.prototype, "color", void 0);
    __decorate([
        ej2_base_1.Property('0')
    ], ChartSegment.prototype, "dashArray", void 0);
    exports.ChartSegment = ChartSegment;
    var ErrorBarSettings = (function (_super) {
        __extends(ErrorBarSettings, _super);
        function ErrorBarSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ErrorBarSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(false)
    ], ErrorBarSettings.prototype, "visible", void 0);
    __decorate([
        ej2_base_1.Property('Fixed')
    ], ErrorBarSettings.prototype, "type", void 0);
    __decorate([
        ej2_base_1.Property('Both')
    ], ErrorBarSettings.prototype, "direction", void 0);
    __decorate([
        ej2_base_1.Property('Vertical')
    ], ErrorBarSettings.prototype, "mode", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], ErrorBarSettings.prototype, "color", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], ErrorBarSettings.prototype, "verticalError", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], ErrorBarSettings.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], ErrorBarSettings.prototype, "horizontalError", void 0);
    __decorate([
        ej2_base_1.Property(3)
    ], ErrorBarSettings.prototype, "verticalPositiveError", void 0);
    __decorate([
        ej2_base_1.Property(3)
    ], ErrorBarSettings.prototype, "verticalNegativeError", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], ErrorBarSettings.prototype, "horizontalPositiveError", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], ErrorBarSettings.prototype, "horizontalNegativeError", void 0);
    __decorate([
        ej2_base_1.Complex(null, ErrorBarCapSettings)
    ], ErrorBarSettings.prototype, "errorBarCap", void 0);
    exports.ErrorBarSettings = ErrorBarSettings;
    var SeriesBase = (function (_super) {
        __extends(SeriesBase, _super);
        function SeriesBase() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.rangeColorPoints = [];
            _this.isAdvancedColor = undefined;
            _this.currentViewData = [];
            _this.clipRect = new ej2_svg_base_1.Rect(0, 0, 0, 0);
            _this.seriesType = 'XY';
            _this.isRectTypeSeries = false;
            return _this;
        }
        SeriesBase.prototype.processJsonData = function () {
            var i = 0;
            var point = new Points();
            var xName = (this instanceof Series && this.type === 'Histogram') ? 'x' : this.xName;
            var textMappingName = this instanceof Series && this.marker.dataLabel.name ?
                this.marker.dataLabel.name : '';
            if (this instanceof Series) {
                if ((this.type === 'Waterfall' || this.type === 'Histogram')) {
                    this.currentViewData = this.chart[helper_2.firstToLowerCase(this.type) + 'SeriesModule'].
                        processInternalData(ej2_base_2.extend([], this.currentViewData, null, true), this);
                }
                if (this.category === 'Pareto') {
                    this.currentViewData = helper_3.sort(ej2_base_2.extend([], this.currentViewData, null, true), [this.yName], true);
                    if (this.type === 'Line') {
                        this.currentViewData = this.chart.paretoSeriesModule.performCumulativeCalculation(this.currentViewData, this);
                    }
                }
                this.isRectTypeSeries = this.type.indexOf('Column') > -1 || this.type.indexOf('Bar') > -1
                    || this.type.indexOf('Histogram') > -1;
            }
            var len = (this.currentViewData || []).length;
            this.points = [];
            this.xMin = Infinity;
            this.xMax = -Infinity;
            this.yMin = Infinity;
            this.yMax = -Infinity;
            this.sizeMax = -Infinity;
            this.getSeriesType();
            if (this.xAxis.valueType === 'Category') {
                while (i < len) {
                    point = this.dataPoint(i, textMappingName, xName);
                    this.pushCategoryData(point, i, point.x);
                    this.pushData(point, i);
                    this.setEmptyPoint(point, i);
                    this.rangeColorsInterior(point);
                    i++;
                }
            }
            else if (this.xAxis.valueType.indexOf('DateTime') > -1) {
                var option = {
                    skeleton: 'full',
                    type: 'dateTime'
                };
                var dateParser = this.chart.intl.getDateParser(option);
                var dateFormatter = this.chart.intl.getDateFormat(option);
                while (i < len) {
                    point = this.dataPoint(i, textMappingName, xName);
                    if (!ej2_base_2.isNullOrUndefined(point.x) && point.x !== '') {
                        point.x = new Date(ej2_data_1.DataUtil.parse.parseJson({ val: point.x }).val);
                        if (this.xAxis.valueType === 'DateTime') {
                            point.xValue = Date.parse(point.x.toString());
                        }
                        else {
                            this.chart.isBlazor ? this.pushCategoryData(point, i, Date.parse(point.x.toString()).toString()) :
                                this.pushCategoryData(point, i, Date.parse(dateParser(dateFormatter(point.x))).toString());
                        }
                        this.pushData(point, i);
                        this.setEmptyPoint(point, i);
                    }
                    else {
                        point.visible = false;
                    }
                    i++;
                }
            }
            else {
                while (i < len) {
                    point = this.dataPoint(i, textMappingName, xName);
                    point.xValue = point.x;
                    this.pushData(point, i);
                    this.setEmptyPoint(point, i);
                    i++;
                }
            }
            if (this instanceof Series) {
                if (this.type.indexOf('Spline') > -1 || (this.drawType.indexOf('Spline') > -1 && this.chart.chartAreaType === 'PolarRadar')) {
                    var isArea = (this.type.indexOf('Area') > -1 || this.drawType.indexOf('Area') > -1);
                    var isRange = this.type.indexOf('Range') > -1;
                    this.chart['spline' + (isArea ? isRange ? 'RangeArea' : 'Area' : '') + 'SeriesModule'].findSplinePoint(this);
                }
                else if (this.type.indexOf('Histogram') > -1 && (this.xAxis.maximum || this.xAxis.minimum)) {
                    this.chart['histogramSeriesModule'].calculateBinValues(this);
                }
                if (this.type.indexOf('Histogram') > -1 && this.points.length == 1) {
                    this.xMin = this.xMin - this.histogramValues.binWidth;
                    this.xMax = this.xMax + this.histogramValues.binWidth;
                }
            }
        };
        SeriesBase.prototype.rangeColorsInterior = function (point) {
            if (this.chart.rangeColorSettings && this.chart.rangeColorSettings.length > 0 && this.chart.visibleSeries.length === 1 &&
                (this.chart.series[0].type === 'Column' || this.chart.series[0].type === 'Bar' ||
                    this.chart.series[0].type === 'Scatter' || this.chart.series[0].type === 'Bubble')) {
                if (!this.rangeColorPoints[point.interior]) {
                    this.rangeColorPoints[point.interior] = [];
                }
                else if (this.rangeColorPoints[point.interior] != undefined) {
                    this.rangeColorPoints[point.interior].push(point);
                }
            }
        };
        SeriesBase.prototype.pushData = function (point, i) {
            point.index = i;
            point.yValue = point.y;
            this.xMin = Math.min(this.xMin, point.xValue);
            this.xMax = Math.max(this.xMax, point.xValue);
            this.xData.push(point.xValue);
        };
        SeriesBase.prototype.dataPoint = function (i, textMappingName, xName) {
            this.points[i] = new Points();
            var point = this.points[i];
            var currentViewData = this.currentViewData[i];
            var getObjectValueByMappingString = this.enableComplexProperty ? ej2_base_1.getValue : this.getObjectValue;
            point.x = getObjectValueByMappingString(xName, currentViewData);
            point.high = getObjectValueByMappingString(this.high, currentViewData);
            point.low = getObjectValueByMappingString(this.low, currentViewData);
            point.open = getObjectValueByMappingString(this.open, currentViewData);
            point.close = getObjectValueByMappingString(this.close, currentViewData);
            point.volume = getObjectValueByMappingString(this.volume, currentViewData);
            point.interior = getObjectValueByMappingString(this.pointColorMapping, currentViewData);
            if (this instanceof Series) {
                point.y = getObjectValueByMappingString(this.yName, currentViewData);
                point.size = getObjectValueByMappingString(this.size, currentViewData);
                point.text = getObjectValueByMappingString(textMappingName, currentViewData);
                point.tooltip = getObjectValueByMappingString(this.tooltipMappingName, currentViewData);
                if (this.isAdvancedColorSupported()) {
                    this.rangeColorName = this.colorName.length > 0 ? this.colorName : this.yName;
                    point.colorValue = getObjectValueByMappingString(this.rangeColorName, currentViewData);
                    point.interior = this.getPointFillColor(point.interior, point.colorValue);
                }
            }
            return point;
        };
        SeriesBase.prototype.isAdvancedColorSupported = function () {
            if (ej2_base_2.isNullOrUndefined(this.isAdvancedColor)) {
                if (this.chart.rangeColorSettings && this.chart.rangeColorSettings.length > 0 && this.chart.visibleSeries.length === 1 &&
                    (this.chart.series[0].type === 'Column' || this.chart.series[0].type === 'Bar' ||
                        this.chart.series[0].type === 'Scatter' || this.chart.series[0].type === 'Bubble')) {
                    this.isAdvancedColor = true;
                }
                else {
                    this.isAdvancedColor = false;
                }
            }
            return this.isAdvancedColor;
        };
        SeriesBase.prototype.getPointFillColor = function (pointFill, value) {
            var color = pointFill;
            if (value && this.chart.rangeColorSettings && this.chart.rangeColorSettings.length > 0) {
                for (var _i = 0, _a = this.chart.rangeColorSettings; _i < _a.length; _i++) {
                    var rangeMap = _a[_i];
                    if (value >= rangeMap.start && value <= rangeMap.end) {
                        if (rangeMap.colors.length > 1) {
                            color = helper_2.getColorByValue(rangeMap, value);
                        }
                        else {
                            color = rangeMap.colors[0];
                        }
                    }
                }
            }
            return color;
        };
        SeriesBase.prototype.getObjectValue = function (mappingName, data) {
            return data[mappingName];
        };
        SeriesBase.prototype.setEmptyPoint = function (point, i) {
            if (!this.findVisibility(point)) {
                point.visible = true;
                return null;
            }
            point.isEmpty = true;
            var mode = this instanceof Series && point.isPointInRange ? this.emptyPointSettings.mode : 'Drop';
            switch (mode) {
                case 'Zero':
                    point.visible = true;
                    if (this instanceof Series && this.seriesType.indexOf('HighLow') > -1) {
                        point.high = point.low = 0;
                        if (this.seriesType.indexOf('HighLowOpenClose') > -1) {
                            point.open = point.close = 0;
                        }
                    }
                    else {
                        point.y = point.yValue = this.yData[i] = 0;
                    }
                    break;
                case 'Average':
                    if (this instanceof Series) {
                        if (this.seriesType.indexOf('HighLow') > -1) {
                            point.high = (ej2_base_2.isNullOrUndefined(point.high) || isNaN(+point.high)) ? this.getAverage(this.high, i) : point.high;
                            point.low = (ej2_base_2.isNullOrUndefined(point.low) || isNaN(+point.low)) ? this.getAverage(this.low, i) : point.low;
                            if (this.seriesType.indexOf('HighLowOpenClose') > -1) {
                                point.open = (ej2_base_2.isNullOrUndefined(point.open) || isNaN(+point.open)) ? this.getAverage(this.open, i) : point.open;
                                point.close = (ej2_base_2.isNullOrUndefined(point.close) || isNaN(+point.close)) ? this.getAverage(this.close, i) :
                                    point.close;
                            }
                        }
                        else {
                            point.y = point.yValue = this.yData[i] = this.getAverage(this.yName, i);
                        }
                    }
                    point.visible = true;
                    break;
                case 'Drop':
                case 'Gap':
                    this.yData[i] = null;
                    point.visible = false;
                    break;
            }
        };
        SeriesBase.prototype.findVisibility = function (point) {
            var type = this instanceof Series ? this.seriesType : 'HighLowOpenClose';
            var yValues;
            var yAxisMin = this.yAxis.minimum;
            var yAxisMax = this.yAxis.maximum;
            switch (type) {
                case 'XY':
                    if (this.chart.chartAreaType === 'PolarRadar' && ((!ej2_base_2.isNullOrUndefined(yAxisMin) && point.yValue < yAxisMin) ||
                        (!ej2_base_2.isNullOrUndefined(yAxisMax) && point.yValue > yAxisMax))) {
                        point.isPointInRange = false;
                        return true;
                    }
                    this.setXYMinMax(point.yValue);
                    this.yData.push(point.yValue);
                    if (this instanceof Series && this.type === 'Bubble') {
                        this.sizeMax = Math.max(this.sizeMax, (ej2_base_2.isNullOrUndefined(point.size) || isNaN(+point.size)) ? this.sizeMax
                            : point.size);
                    }
                    return ej2_base_2.isNullOrUndefined(point.x) || (ej2_base_2.isNullOrUndefined(point.y) || isNaN(+point.y));
                case 'HighLow':
                    this.setHiloMinMax(point.high, point.low);
                    return ej2_base_2.isNullOrUndefined(point.x) || (ej2_base_2.isNullOrUndefined(point.low) || isNaN(+point.low)) ||
                        (ej2_base_2.isNullOrUndefined(point.high) || isNaN(+point.high));
                case 'HighLowOpenClose':
                    this.setHiloMinMax(point.high, point.low);
                    return ej2_base_2.isNullOrUndefined(point.x) || (ej2_base_2.isNullOrUndefined(point.low) || isNaN(+point.low)) ||
                        (ej2_base_2.isNullOrUndefined(point.open) || isNaN(+point.open)) || (ej2_base_2.isNullOrUndefined(point.close) || isNaN(+point.close))
                        || (ej2_base_2.isNullOrUndefined(point.high) || isNaN(+point.high));
                case 'BoxPlot':
                    yValues = (point.y || [null]).filter(function (value) {
                        return !ej2_base_2.isNullOrUndefined(value) && !isNaN(value);
                    }).sort(function (a, b) {
                        return a - b;
                    });
                    point.y = yValues;
                    this.yMin = Math.min(this.yMin, Math.min.apply(Math, yValues));
                    this.yMax = Math.max(this.yMax, Math.max.apply(Math, yValues));
                    return !yValues.length;
            }
        };
        SeriesBase.prototype.setXYMinMax = function (yValue) {
            var isLogAxis = (this.yAxis.valueType === 'Logarithmic' || this.xAxis.valueType === 'Logarithmic');
            var isNegativeValue = yValue < 0 || this.yAxis.rangePadding === "None";
            var seriesMinY;
            if (this.isRectTypeSeries && !helper_3.setRange(this.yAxis)) {
                seriesMinY = ((isLogAxis ? (yValue) : isNegativeValue ? yValue : 0));
            }
            else {
                seriesMinY = yValue;
            }
            this.yMin = isLogAxis ?
                Math.min(this.yMin, (ej2_base_2.isNullOrUndefined(seriesMinY) || isNaN(seriesMinY) || (seriesMinY === 0) ||
                    (seriesMinY.toString() === "0") || (seriesMinY.toString() === '')) ? this.yMin : seriesMinY) :
                Math.min(this.yMin, (ej2_base_2.isNullOrUndefined(seriesMinY) || isNaN(seriesMinY)) ? this.yMin : seriesMinY);
            this.yMax = Math.max(this.yMax, (ej2_base_2.isNullOrUndefined(yValue) || isNaN(yValue)) ? this.yMax : yValue);
        };
        SeriesBase.prototype.setHiloMinMax = function (high, low) {
            this.yMin = Math.min(this.yMin, Math.min((ej2_base_2.isNullOrUndefined(low) || isNaN(low)) ? this.yMin : low, (ej2_base_2.isNullOrUndefined(high) || isNaN(high)) ? this.yMin : high));
            this.yMax = Math.max(this.yMax, Math.max((ej2_base_2.isNullOrUndefined(low) || isNaN(low)) ? this.yMax : low, (ej2_base_2.isNullOrUndefined(high) || isNaN(high)) ? this.yMax : high));
        };
        SeriesBase.prototype.getSeriesType = function () {
            var type;
            if (this instanceof Series) {
                var seriesType = this.chart.chartAreaType === 'PolarRadar' ? this.drawType : this.type;
                if (seriesType) {
                    switch (seriesType) {
                        case 'RangeColumn':
                        case 'RangeArea':
                        case 'SplineRangeArea':
                        case 'Hilo':
                            type = 'HighLow';
                            break;
                        case 'HiloOpenClose':
                        case 'Candle':
                            type = 'HighLowOpenClose';
                            break;
                        case 'BoxAndWhisker':
                            type = 'BoxPlot';
                            break;
                        default:
                            type = 'XY';
                    }
                }
            }
            this.seriesType = type;
        };
        SeriesBase.prototype.pushCategoryData = function (point, index, pointX) {
            if (!this.chart.tooltip.shared) {
                if (!this.visible) {
                    return null;
                }
            }
            if (!this.xAxis.isIndexed) {
                if (this.xAxis.indexLabels[pointX] === undefined) {
                    this.xAxis.indexLabels[pointX] = this.xAxis.labels.length;
                    this.xAxis.labels.push(pointX);
                }
                point.xValue = this.xAxis.indexLabels[pointX];
            }
            else {
                this.xAxis.labels[index] ? this.xAxis.labels[index] += ', ' + pointX :
                    this.xAxis.labels.push(pointX);
                point.xValue = index;
            }
        };
        SeriesBase.prototype.getAverage = function (member, i, data) {
            if (data === void 0) { data = this.currentViewData; }
            var previous = data[i - 1] ? (data[i - 1][member] || 0) : 0;
            var next = data[i + 1] ? (data[i + 1][member] || 0) : 0;
            return (previous + next) / 2;
        };
        SeriesBase.prototype.refreshDataManager = function (chart) {
            var _this = this;
            this.chart = chart;
            var dataSource;
            var isAngular = 'isAngular';
            if (chart[isAngular]) {
                dataSource = Object.keys(this.dataSource).length ? this.dataSource : chart.dataSource;
            }
            else {
                dataSource = this.dataSource || chart.dataSource;
            }
            if (!(dataSource instanceof ej2_data_1.DataManager) && ej2_base_2.isNullOrUndefined(this.query)) {
                this.dataManagerSuccess({ result: dataSource, count: dataSource.length }, false);
                return;
            }
            var dataManager = this.dataModule.getData(this.dataModule.generateQuery().requiresCount());
            dataManager.then(function (e) { return _this.dataManagerSuccess(e); });
        };
        SeriesBase.prototype.dataManagerSuccess = function (e, isRemoteData) {
            if (isRemoteData === void 0) { isRemoteData = true; }
            this.currentViewData = e.count ? e.result : [];
            this.chart.allowServerDataBinding = false;
            if (this instanceof Series) {
                if (this.chart.stockChart) {
                    this.chart.stockChart.series[this.index].localData = this.currentViewData;
                }
                var argsData = {
                    name: constants_1.seriesRender, series: this, data: this.currentViewData, fill: this.interior
                };
                this.chart.trigger(constants_1.seriesRender, argsData);
                this.interior = argsData.fill;
                this.currentViewData = argsData.data;
            }
            if (this.chart.stockChart && !(this instanceof Series)) {
                this.currentViewData = this.chart.stockChart.findCurrentData(this.chart.stockChart.series[0].localData, this.chart.stockChart.series[0].xName);
            }
            this.processJsonData();
            this.recordsCount = e.count;
            this.refreshChart(isRemoteData);
            this.currentViewData = null;
        };
        SeriesBase.prototype.refreshChart = function (isRemoteData) {
            var chart = this.chart;
            if (this instanceof Series) {
                chart.visibleSeriesCount += isRemoteData ? 1 : 0;
            }
            chart.refreshTechnicalIndicator(this);
            if (this instanceof Series && this.category !== 'TrendLine') {
                for (var _i = 0, _a = this.trendlines; _i < _a.length; _i++) {
                    var trendline = _a[_i];
                    trendline.setDataSource(this, chart);
                }
            }
            if (chart.visibleSeries.length === (chart.visibleSeriesCount)) {
                chart.refreshBound();
                chart.trigger('loaded', { chart: chart.isBlazor ? {} : chart });
                if (this.chart.stockChart && this.chart.stockChart.initialRender) {
                    this.chart.stockChart.initialRender = false;
                    this.chart.stockChart.stockChartDataManagerSuccess();
                }
            }
            if (this instanceof Series) {
                chart.visibleSeriesCount += isRemoteData ? 0 : 1;
            }
        };
        return SeriesBase;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property('')
    ], SeriesBase.prototype, "xName", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], SeriesBase.prototype, "colorName", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], SeriesBase.prototype, "high", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], SeriesBase.prototype, "low", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], SeriesBase.prototype, "open", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], SeriesBase.prototype, "close", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], SeriesBase.prototype, "volume", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], SeriesBase.prototype, "pointColorMapping", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], SeriesBase.prototype, "visible", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], SeriesBase.prototype, "xAxisName", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], SeriesBase.prototype, "yAxisName", void 0);
    __decorate([
        ej2_base_1.Complex(null, base_1.Animation)
    ], SeriesBase.prototype, "animation", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], SeriesBase.prototype, "fill", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], SeriesBase.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property('0')
    ], SeriesBase.prototype, "dashArray", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], SeriesBase.prototype, "dataSource", void 0);
    __decorate([
        ej2_base_1.Property()
    ], SeriesBase.prototype, "query", void 0);
    __decorate([
        ej2_base_1.Collection([], ChartSegment)
    ], SeriesBase.prototype, "segments", void 0);
    __decorate([
        ej2_base_1.Property('X')
    ], SeriesBase.prototype, "segmentAxis", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], SeriesBase.prototype, "enableComplexProperty", void 0);
    exports.SeriesBase = SeriesBase;
    var Series = (function (_super) {
        __extends(Series, _super);
        function Series(parent, propName, defaultValue, isArray) {
            var _this = _super.call(this, parent, propName, defaultValue, isArray) || this;
            _this.visibleSeriesCount = 0;
            _this.category = 'Series';
            _this.isRectSeries = false;
            _this.drawPoints = [];
            _this.lowDrawPoints = [];
            _this.delayedAnimation = false;
            _this.rangeColorName = _this.colorName.length > 0 ? _this.colorName : _this.yName;
            return _this;
        }
        Series.prototype.refreshAxisLabel = function () {
            if (this.xAxis.valueType !== 'Category') {
                return null;
            }
            this.xAxis.labels = [];
            this.xAxis.indexLabels = {};
            for (var _i = 0, _a = this.xAxis.series; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.visible && item.category !== 'TrendLine') {
                    item.xMin = Infinity;
                    item.xMax = -Infinity;
                    for (var _b = 0, _c = item.points; _b < _c.length; _b++) {
                        var point = _c[_b];
                        item.pushCategoryData(point, point.index, point.x);
                        item.xMin = Math.min(item.xMin, point.xValue);
                        item.xMax = Math.max(item.xMax, point.xValue);
                    }
                }
            }
        };
        Series.prototype.findSeriesCollection = function (column, row, isStack) {
            var seriesCollection = [];
            for (var _i = 0, _a = row.axes; _i < _a.length; _i++) {
                var rowAxis = _a[_i];
                for (var _b = 0, _c = rowAxis.series; _b < _c.length; _b++) {
                    var rowSeries = _c[_b];
                    for (var _d = 0, _e = column.axes; _d < _e.length; _d++) {
                        var axis = _e[_d];
                        for (var _f = 0, _g = axis.series; _f < _g.length; _f++) {
                            var series = _g[_f];
                            if (series === rowSeries && series.visible && this.rectSeriesInChart(series, isStack)) {
                                seriesCollection.push(series);
                            }
                        }
                    }
                }
            }
            return seriesCollection;
        };
        Series.prototype.rectSeriesInChart = function (series, isStack) {
            var type = (series.type).toLowerCase();
            return (type.indexOf('column') !== -1 || type.indexOf('bar') !== -1 || type.indexOf('histogram') !== -1 ||
                type.indexOf('hiloopenclose') !== -1 || type.indexOf('candle') !== -1 || type.indexOf('pareto') !== -1 ||
                type.indexOf('hilo') !== -1 || series.drawType.indexOf('Column') !== -1 ||
                type.indexOf('waterfall') !== -1 || type.indexOf('boxandwhisker') !== -1 || isStack);
        };
        Series.prototype.calculateStackedValue = function (isStacking100, chart) {
            for (var _i = 0, _a = chart.columns; _i < _a.length; _i++) {
                var columnItem = _a[_i];
                for (var _b = 0, _c = chart.rows; _b < _c.length; _b++) {
                    var item = _c[_b];
                    this.calculateStackingValues(this.findSeriesCollection(columnItem, item, true), isStacking100);
                }
            }
        };
        Series.prototype.calculateStackingValues = function (seriesCollection, isStacking100) {
            var startValues;
            var endValues;
            var yValues = [];
            var lastPositive = [];
            var lastNegative = [];
            var stackingGroup;
            var lastValue;
            var value;
            var frequencies = [];
            if (isStacking100) {
                frequencies = this.findFrequencies(seriesCollection);
            }
            var stackingSeies = [];
            var stackedValues = [];
            var visiblePoints = [];
            for (var _i = 0, seriesCollection_1 = seriesCollection; _i < seriesCollection_1.length; _i++) {
                var series = seriesCollection_1[_i];
                if (series.type.indexOf('Stacking') !== -1 || (series.drawType.indexOf('Stacking') !== -1 &&
                    (series.chart.chartAreaType === 'PolarRadar'))) {
                    stackingGroup = (series.type.indexOf('StackingArea') !== -1) ? 'StackingArea100' :
                        (series.type.indexOf('StackingLine') !== -1) ? 'StackingLine100' : series.stackingGroup;
                    if (!lastPositive[stackingGroup]) {
                        lastPositive[stackingGroup] = [];
                        lastNegative[stackingGroup] = [];
                    }
                    yValues = series.yData;
                    startValues = [];
                    endValues = [];
                    stackingSeies.push(series);
                    visiblePoints = helper_3.getVisiblePoints(series);
                    for (var j = 0, pointsLength = visiblePoints.length; j < pointsLength; j++) {
                        lastValue = 0;
                        value = +yValues[j];
                        if (lastPositive[stackingGroup][visiblePoints[j].xValue] === undefined) {
                            lastPositive[stackingGroup][visiblePoints[j].xValue] = 0;
                        }
                        if (lastNegative[stackingGroup][visiblePoints[j].xValue] === undefined) {
                            lastNegative[stackingGroup][visiblePoints[j].xValue] = 0;
                        }
                        if (isStacking100) {
                            value = value / frequencies[stackingGroup][visiblePoints[j].xValue] * 100;
                            value = !isNaN(value) ? value : 0;
                            visiblePoints[j].percentage = +(value.toFixed(2));
                        }
                        else {
                            stackedValues[j] = stackedValues[j] ? stackedValues[j] + Math.abs(value) : Math.abs(value);
                        }
                        if (value >= 0) {
                            lastValue = lastPositive[stackingGroup][visiblePoints[j].xValue];
                            lastPositive[stackingGroup][visiblePoints[j].xValue] += value;
                        }
                        else {
                            lastValue = lastNegative[stackingGroup][visiblePoints[j].xValue];
                            lastNegative[stackingGroup][visiblePoints[j].xValue] += value;
                        }
                        startValues.push(lastValue);
                        endValues.push(value + lastValue);
                        if (isStacking100 && (endValues[j] > 100)) {
                            endValues[j] = 100;
                        }
                    }
                    series.stackedValues = new helper_1.StackValues(startValues, endValues);
                    var isLogAxis = series.yAxis.valueType === 'Logarithmic';
                    var isColumnBarType = (series.type.indexOf("Column") !== -1 || series.type.indexOf("Bar") !== -1);
                    series.yMin = isLogAxis && isColumnBarType && series.yMin < 1 ? series.yMin : Math.min.apply(0, startValues);
                    series.yMax = Math.max.apply(0, endValues);
                    if (series.yMin > Math.min.apply(0, endValues)) {
                        series.yMin = (isStacking100) ? -100 :
                            isLogAxis && isColumnBarType && series.yMin < 1 ? series.yMin : Math.min.apply(0, endValues);
                    }
                    if (series.yMax < Math.max.apply(0, startValues)) {
                        series.yMax = 0;
                    }
                }
            }
            this.findPercentageOfStacking(stackingSeies, stackedValues, isStacking100);
        };
        Series.prototype.findPercentageOfStacking = function (stackingSeies, values, isStacking100) {
            for (var _i = 0, stackingSeies_1 = stackingSeies; _i < stackingSeies_1.length; _i++) {
                var item = stackingSeies_1[_i];
                if (isStacking100) {
                    return null;
                }
                for (var _a = 0, _b = helper_3.getVisiblePoints(item); _a < _b.length; _a++) {
                    var point = _b[_a];
                    point.percentage = Math.abs(+(point.y / values[point.index] * 100).toFixed(2));
                }
            }
        };
        Series.prototype.findFrequencies = function (seriesCollection) {
            var frequencies = [];
            var stackingGroup;
            var visiblePoints = [];
            for (var _i = 0, seriesCollection_2 = seriesCollection; _i < seriesCollection_2.length; _i++) {
                var series = seriesCollection_2[_i];
                series.yAxis.isStack100 = series.type.indexOf('100') !== -1 ? true : false;
                visiblePoints = helper_3.getVisiblePoints(series);
                if (series.type.indexOf('Stacking') !== -1) {
                    stackingGroup = (series.type.indexOf('StackingArea') !== -1) ? 'StackingArea100' :
                        (series.type.indexOf('StackingLine') !== -1) ? 'StackingLine100' : series.stackingGroup;
                    if (!frequencies[stackingGroup]) {
                        frequencies[stackingGroup] = [];
                    }
                    for (var j = 0, pointsLength = visiblePoints.length; j < pointsLength; j++) {
                        if (frequencies[stackingGroup][visiblePoints[j].xValue] === undefined) {
                            frequencies[stackingGroup][visiblePoints[j].xValue] = 0;
                        }
                        if (series.yData[j] > 0) {
                            frequencies[stackingGroup][visiblePoints[j].xValue] += series.yData[j];
                        }
                        else {
                            frequencies[stackingGroup][visiblePoints[j].xValue] -= series.yData[j];
                        }
                    }
                }
            }
            return frequencies;
        };
        Series.prototype.renderSeries = function (chart) {
            var seriesType = helper_2.firstToLowerCase(this.type);
            seriesType = seriesType.replace('100', '');
            if (chart[seriesType + 'SeriesModule']) {
                if (this.category !== 'Indicator' && this.category !== 'TrendLine') {
                    this.createSeriesElements(chart);
                }
                this.visiblePoints = helper_3.getVisiblePoints(this);
                chart[seriesType + 'SeriesModule'].render(this, this.xAxis, this.yAxis, chart.requireInvertedAxis);
                if (this.category !== 'Indicator') {
                    if (this.errorBar.visible) {
                        this.chart.errorBarModule.render(this);
                    }
                    if (this.marker.dataLabel.visible) {
                        chart.dataLabelModule.render(this, this.chart, this.marker.dataLabel);
                    }
                    this.appendSeriesElement(chart.seriesElements, chart);
                }
                if (!this.chart.enableCanvas) {
                    this.performAnimation(chart, seriesType, this.errorBar, this.marker, this.marker.dataLabel);
                }
            }
        };
        Series.prototype.createSeriesElements = function (chart) {
            if (this.category !== 'Indicator') {
                var elementId = chart.element.id;
                var explodeValue = this.marker.border.width + 8 + 5;
                var render = (this.type === 'Scatter' || this.type === 'Bubble' || this.drawType === 'Scatter') ?
                    chart.svgRenderer : chart.renderer;
                var index = this.index === undefined ? this.category : this.index;
                var markerHeight = void 0;
                var markerWidth = void 0;
                var options = void 0;
                if (this.type === 'Scatter' || this.drawType === 'Scatter') {
                    markerHeight = (chart.primaryYAxis.maximum || chart.primaryXAxis.maximum) ? 0 : (this.marker.height + explodeValue) / 2;
                    markerWidth = (chart.primaryYAxis.maximum || chart.primaryXAxis.maximum) ? 0 : (this.marker.width + explodeValue) / 2;
                }
                else {
                    markerHeight = 0;
                    markerWidth = 0;
                }
                if (chart.chartAreaType === 'PolarRadar') {
                    var markerMaxValue = (this.drawType === 'Scatter') ? Math.max(this.marker.width, this.marker.height) : 0;
                    options = new helper_2.CircleOption(elementId + '_ChartSeriesClipRect_' + index, 'transparent', { width: 1, color: 'Gray' }, 1, this.clipRect.width / 2 + this.clipRect.x, this.clipRect.height / 2 + this.clipRect.y, chart.radius + markerMaxValue);
                    this.clipRectElement = helper_1.appendClipElement(chart.redraw, options, render, 'drawCircularClipPath');
                }
                else {
                    options = new helper_1.RectOption(elementId + '_ChartSeriesClipRect_' + index, 'transparent', { width: 1, color: 'Gray' }, 1, {
                        x: -markerWidth, y: -markerHeight,
                        width: this.clipRect.width + markerWidth * 2,
                        height: this.clipRect.height + markerHeight * 2
                    });
                    this.clipRectElement = helper_1.appendClipElement(chart.redraw, options, render);
                }
                var transform = chart.chartAreaType === 'Cartesian' ? 'translate(' + this.clipRect.x + ',' + (this.clipRect.y) + ')' : '';
                this.symbolElement = null;
                this.seriesElement = render.createGroup({
                    'id': elementId + 'SeriesGroup' + index,
                    'transform': transform,
                    'clip-path': 'url(#' + elementId + '_ChartSeriesClipRect_' + index + ')'
                });
                if (!this.chart.enableCanvas || this.type === 'Scatter' || this.type === 'Bubble' || this.drawType === 'Scatter') {
                    this.seriesElement.setAttribute("tabindex", index === 0 ? "0" : "");
                    this.seriesElement.setAttribute("style", "outline: none");
                    this.seriesElement.appendChild(this.clipRectElement);
                }
            }
        };
        Series.prototype.appendSeriesElement = function (element, chart) {
            var marker = this.marker;
            var dataLabel = marker.dataLabel;
            var redraw = chart.redraw;
            if (this.category !== 'TrendLine') {
                helper_1.appendChildElement(chart.enableCanvas, chart.seriesElements, this.seriesElement, redraw);
                var errorBar = this.errorBar;
                if (errorBar.visible) {
                    if (chart.chartAreaType === 'PolarRadar') {
                        helper_1.appendChildElement(chart.enableCanvas, chart.seriesElements, this.seriesElement, redraw);
                    }
                    else {
                        helper_1.appendChildElement(chart.enableCanvas, chart.seriesElements, this.errorBarElement, redraw);
                    }
                }
                if (this.type === 'Scatter' || this.type === 'Bubble' || this.drawType === 'Scatter') {
                    helper_1.appendChildElement(false, chart.seriesElements, this.seriesElement, redraw);
                }
            }
            if (marker.visible && (chart.chartAreaType === 'Cartesian' ||
                ((this.drawType !== 'Scatter') && chart.chartAreaType === 'PolarRadar')) && this.type !== 'Scatter' &&
                this.type !== 'Bubble' && this.type !== 'Candle' && this.type !== 'Hilo' && this.type !== 'HiloOpenClose' && this.symbolElement) {
                helper_1.appendChildElement(chart.enableCanvas, chart.seriesElements, this.symbolElement, redraw);
            }
            if (dataLabel.visible && this.textElement) {
                helper_1.appendChildElement(chart.enableCanvas, chart.dataLabelElements, this.shapeElement, redraw);
                helper_1.appendChildElement(chart.enableCanvas, chart.dataLabelElements, this.textElement, redraw);
            }
            if (!chart.enableCanvas && chart.dataLabelElements.hasChildNodes()) {
                chart.seriesElements.appendChild(chart.dataLabelElements);
            }
        };
        Series.prototype.performAnimation = function (chart, type, errorBar, marker, dataLabel) {
            if (this.animation.enable && chart.animateSeries) {
                chart[type + 'SeriesModule'].doAnimation(this);
                if (errorBar.visible) {
                    chart.errorBarModule.doErrorBarAnimation(this);
                }
                if (marker.visible) {
                    chart.markerRender.doMarkerAnimation(this);
                }
                if (dataLabel.visible && ej2_base_3.Browser.info.name !== 'edge' && !ej2_base_3.Browser.isIE) {
                    chart.dataLabelModule.doDataLabelAnimation(this);
                }
            }
        };
        Series.prototype.setPointColor = function (point, color) {
            color = point.interior || color;
            return point.isEmpty ? (this.emptyPointSettings.fill || color) : color;
        };
        Series.prototype.setBorderColor = function (point, border) {
            border.width = point.isEmpty ? (this.emptyPointSettings.border.width || border.width) : border.width;
            border.color = point.isEmpty ? (this.emptyPointSettings.border.color || border.color) : border.color;
            return border;
        };
        return Series;
    }(SeriesBase));
    __decorate([
        ej2_base_1.Property('')
    ], Series.prototype, "name", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], Series.prototype, "yName", void 0);
    __decorate([
        ej2_base_1.Property('Line')
    ], Series.prototype, "drawType", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], Series.prototype, "isClosed", void 0);
    __decorate([
        ej2_base_1.Property('#2ecd71')
    ], Series.prototype, "bearFillColor", void 0);
    __decorate([
        ej2_base_1.Property('#e74c3d')
    ], Series.prototype, "bullFillColor", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], Series.prototype, "enableSolidCandles", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], Series.prototype, "size", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Series.prototype, "binInterval", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], Series.prototype, "showNormalDistribution", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], Series.prototype, "stackingGroup", void 0);
    __decorate([
        ej2_base_1.Complex({ color: 'transparent', width: 0 }, base_1.Border)
    ], Series.prototype, "border", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], Series.prototype, "opacity", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], Series.prototype, "zOrder", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], Series.prototype, "groupName", void 0);
    __decorate([
        ej2_base_1.Property('Line')
    ], Series.prototype, "type", void 0);
    __decorate([
        ej2_base_1.Complex(null, ErrorBarSettings)
    ], Series.prototype, "errorBar", void 0);
    __decorate([
        ej2_base_1.Complex(null, MarkerSettings)
    ], Series.prototype, "marker", void 0);
    __decorate([
        ej2_base_1.Complex({}, base_1.DragSettings)
    ], Series.prototype, "dragSettings", void 0);
    __decorate([
        ej2_base_1.Collection([], Trendline)
    ], Series.prototype, "trendlines", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], Series.prototype, "enableTooltip", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], Series.prototype, "tooltipFormat", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], Series.prototype, "tooltipMappingName", void 0);
    __decorate([
        ej2_base_1.Property('SeriesType')
    ], Series.prototype, "legendShape", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], Series.prototype, "legendImageUrl", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Series.prototype, "selectionStyle", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Series.prototype, "unSelectedStyle", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Series.prototype, "nonHighlightStyle", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], Series.prototype, "minRadius", void 0);
    __decorate([
        ej2_base_1.Property(3)
    ], Series.prototype, "maxRadius", void 0);
    __decorate([
        ej2_base_1.Property('Natural')
    ], Series.prototype, "splineType", void 0);
    __decorate([
        ej2_base_1.Property(0.5)
    ], Series.prototype, "cardinalSplineTension", void 0);
    __decorate([
        ej2_base_1.Complex(null, base_1.EmptyPointSettings)
    ], Series.prototype, "emptyPointSettings", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], Series.prototype, "showMean", void 0);
    __decorate([
        ej2_base_1.Property('Normal')
    ], Series.prototype, "boxPlotMode", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Series.prototype, "columnWidth", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Series.prototype, "columnWidthInPixel", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], Series.prototype, "columnSpacing", void 0);
    __decorate([
        ej2_base_1.Property('#C64E4A')
    ], Series.prototype, "negativeFillColor", void 0);
    __decorate([
        ej2_base_1.Property('#4E81BC')
    ], Series.prototype, "summaryFillColor", void 0);
    __decorate([
        ej2_base_1.Property()
    ], Series.prototype, "intermediateSumIndexes", void 0);
    __decorate([
        ej2_base_1.Property()
    ], Series.prototype, "sumIndexes", void 0);
    __decorate([
        ej2_base_1.Complex({ color: 'black', width: 2 }, base_1.Connector)
    ], Series.prototype, "connector", void 0);
    __decorate([
        ej2_base_1.Complex(null, base_1.CornerRadius)
    ], Series.prototype, "cornerRadius", void 0);
    exports.Series = Series;
});
