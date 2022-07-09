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
define(["require", "exports", "@syncfusion/ej2-base", "@syncfusion/ej2-base", "@syncfusion/ej2-data", "../../common/model/base", "@syncfusion/ej2-svg-base", "../../common/utils/helper", "../../common/model/constants", "../../common/model/theme", "../../common/utils/helper"], function (require, exports, ej2_base_1, ej2_base_2, ej2_data_1, base_1, ej2_svg_base_1, helper_1, constants_1, theme_1, helper_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AccumulationAnnotationSettings = (function (_super) {
        __extends(AccumulationAnnotationSettings, _super);
        function AccumulationAnnotationSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return AccumulationAnnotationSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(null)
    ], AccumulationAnnotationSettings.prototype, "content", void 0);
    __decorate([
        ej2_base_1.Property('0')
    ], AccumulationAnnotationSettings.prototype, "x", void 0);
    __decorate([
        ej2_base_1.Property('0')
    ], AccumulationAnnotationSettings.prototype, "y", void 0);
    __decorate([
        ej2_base_1.Property('Pixel')
    ], AccumulationAnnotationSettings.prototype, "coordinateUnits", void 0);
    __decorate([
        ej2_base_1.Property('Chart')
    ], AccumulationAnnotationSettings.prototype, "region", void 0);
    __decorate([
        ej2_base_1.Property('Middle')
    ], AccumulationAnnotationSettings.prototype, "verticalAlignment", void 0);
    __decorate([
        ej2_base_1.Property('Center')
    ], AccumulationAnnotationSettings.prototype, "horizontalAlignment", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], AccumulationAnnotationSettings.prototype, "description", void 0);
    exports.AccumulationAnnotationSettings = AccumulationAnnotationSettings;
    var AccumulationDataLabelSettings = (function (_super) {
        __extends(AccumulationDataLabelSettings, _super);
        function AccumulationDataLabelSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return AccumulationDataLabelSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(false)
    ], AccumulationDataLabelSettings.prototype, "visible", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], AccumulationDataLabelSettings.prototype, "showZero", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], AccumulationDataLabelSettings.prototype, "name", void 0);
    __decorate([
        ej2_base_1.Property('transparent')
    ], AccumulationDataLabelSettings.prototype, "fill", void 0);
    __decorate([
        ej2_base_1.Property('Inside')
    ], AccumulationDataLabelSettings.prototype, "position", void 0);
    __decorate([
        ej2_base_1.Property(5)
    ], AccumulationDataLabelSettings.prototype, "rx", void 0);
    __decorate([
        ej2_base_1.Property(5)
    ], AccumulationDataLabelSettings.prototype, "ry", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], AccumulationDataLabelSettings.prototype, "angle", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], AccumulationDataLabelSettings.prototype, "enableRotation", void 0);
    __decorate([
        ej2_base_1.Complex({ width: null, color: null }, base_1.Border)
    ], AccumulationDataLabelSettings.prototype, "border", void 0);
    __decorate([
        ej2_base_1.Complex({ size: '11px', color: '', fontStyle: 'Normal', fontWeight: 'Normal', fontFamily: 'Segoe UI' }, base_1.Font)
    ], AccumulationDataLabelSettings.prototype, "font", void 0);
    __decorate([
        ej2_base_1.Complex({}, base_1.Connector)
    ], AccumulationDataLabelSettings.prototype, "connectorStyle", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], AccumulationDataLabelSettings.prototype, "template", void 0);
    exports.AccumulationDataLabelSettings = AccumulationDataLabelSettings;
    var PieCenter = (function (_super) {
        __extends(PieCenter, _super);
        function PieCenter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return PieCenter;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property('50%')
    ], PieCenter.prototype, "x", void 0);
    __decorate([
        ej2_base_1.Property('50%')
    ], PieCenter.prototype, "y", void 0);
    exports.PieCenter = PieCenter;
    var AccPoints = (function () {
        function AccPoints() {
            this.visible = true;
            this.symbolLocation = null;
            this.region = null;
            this.labelRegion = null;
            this.labelVisible = true;
            this.regions = null;
            this.isExplode = false;
            this.isClubbed = false;
            this.isSliced = false;
            this.argsData = null;
            this.isLabelUpdated = null;
            this.initialLabelRegion = null;
        }
        return AccPoints;
    }());
    exports.AccPoints = AccPoints;
    var AccumulationSeries = (function (_super) {
        __extends(AccumulationSeries, _super);
        function AccumulationSeries() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.points = [];
            _this.clubbedPoints = [];
            _this.sumOfPoints = 0;
            _this.isRectSeries = true;
            _this.clipRect = new ej2_svg_base_1.Rect(0, 0, 0, 0);
            _this.category = 'Series';
            _this.rightSidePoints = [];
            _this.leftSidePoints = [];
            return _this;
        }
        AccumulationSeries.prototype.refreshDataManager = function (accumulation, render) {
            var _this = this;
            var dateSource = this.dataSource || accumulation.dataSource;
            if (!(dateSource instanceof ej2_data_1.DataManager) && ej2_base_2.isNullOrUndefined(this.query)) {
                this.dataManagerSuccess({ result: dateSource, count: dateSource.length }, accumulation, render);
                return;
            }
            var dataManager = this.dataModule.getData(this.dataModule.generateQuery().requiresCount());
            dataManager.then(function (e) { return _this.dataManagerSuccess(e, accumulation); });
        };
        AccumulationSeries.prototype.dataManagerSuccess = function (e, accumulation, render) {
            if (render === void 0) { render = true; }
            var argsData = {
                name: constants_1.seriesRender, series: this, data: e.result
            };
            accumulation.allowServerDataBinding = false;
            accumulation.trigger(constants_1.seriesRender, argsData);
            this.resultData = e.result !== '' ? e.result : [];
            if (!accumulation.isBlazor && !render) {
                this.getPoints(this.resultData, accumulation);
            }
            if ((++accumulation.seriesCounts === accumulation.visibleSeries.length && render)
                || (window['Blazor'] && !render && accumulation.seriesCounts === 1)) {
                this.getPoints(this.resultData, accumulation);
                accumulation.refreshChart();
            }
        };
        AccumulationSeries.prototype.getPoints = function (result, accumulation) {
            var length = Object.keys(result).length;
            this.sumOfPoints = 0;
            if (length === 0) {
                this.points = [];
                return null;
            }
            this.findSumOfPoints(result);
            this.points = [];
            this.clubbedPoints = [];
            this.sumOfClub = 0;
            var point;
            var colors = this.palettes.length ? this.palettes : theme_1.getSeriesColor(accumulation.theme);
            var clubValue = helper_1.stringToNumber(this.groupTo, this.sumOfPoints);
            for (var i = 0; i < length; i++) {
                point = this.setPoints(result, i, colors, accumulation);
                var currentY = point.y;
                if (!this.isClub(point, clubValue, i)) {
                    if (ej2_base_2.isNullOrUndefined(point.y)) {
                        point.visible = false;
                    }
                    this.pushPoints(point, colors);
                }
                else {
                    point.index = this.clubbedPoints.length;
                    point.isExplode = true;
                    this.clubbedPoints.push(point);
                    point.isSliced = true;
                }
            }
            this.lastGroupTo = this.groupTo;
            if (this.sumOfClub > 0) {
                var clubPoint_1 = this.generateClubPoint();
                this.pushPoints(clubPoint_1, colors);
                var pointsLength_1 = this.points.length - 1;
                this.clubbedPoints.map(function (point) {
                    point.index += pointsLength_1;
                    point.color = clubPoint_1.color;
                });
            }
            if (this.clubbedPoints.length && this.explode && this.type === 'Pie'
                && (this.explodeAll || this.points[this.points.length - 1].index === this.explodeIndex)) {
                this.points.splice(this.points.length - 1, 1);
                this.points = this.points.concat(this.clubbedPoints);
            }
        };
        AccumulationSeries.prototype.generateClubPoint = function () {
            var clubPoint = new AccPoints();
            clubPoint.isClubbed = true;
            clubPoint.x = 'Others';
            clubPoint.y = this.sumOfClub;
            clubPoint.text = clubPoint.originalText = clubPoint.x + ': ' + this.sumOfClub;
            clubPoint.sliceRadius = '80%';
            return clubPoint;
        };
        AccumulationSeries.prototype.pushPoints = function (point, colors) {
            point.index = this.points.length;
            point.isExplode = this.explodeAll || (point.index === this.explodeIndex);
            point.color = point.color || colors[point.index % colors.length];
            this.points.push(point);
        };
        AccumulationSeries.prototype.isClub = function (point, clubValue, index) {
            if (!ej2_base_2.isNullOrUndefined(clubValue)) {
                if (this.groupMode === 'Value' && Math.abs(point.y) <= clubValue) {
                    this.sumOfClub += Math.abs(point.y);
                    return true;
                }
                else if (this.groupMode === 'Point' && index >= clubValue) {
                    this.sumOfClub += Math.abs(point.y);
                    return true;
                }
            }
            return false;
        };
        AccumulationSeries.prototype.findSumOfPoints = function (result) {
            var length = Object.keys(result).length;
            for (var i = 0; i < length; i++) {
                if (!ej2_base_2.isNullOrUndefined(result[i]) && !ej2_base_2.isNullOrUndefined(result[i][this.yName]) && !isNaN(result[i][this.yName])) {
                    this.sumOfPoints += Math.abs(result[i][this.yName]);
                }
            }
        };
        AccumulationSeries.prototype.setPoints = function (data, i, colors, accumulation) {
            var point = new AccPoints();
            point.x = ej2_base_2.getValue(this.xName, data[i]);
            point.y = ej2_base_2.getValue(this.yName, data[i]);
            point.percentage = (+(point.y / this.sumOfPoints * 100).toFixed(2));
            point.legendImageUrl = ej2_base_2.getValue(this.legendImageUrl, data[i]);
            point.color = ej2_base_2.getValue(this.pointColorMapping, data[i]);
            point.text = point.originalText = ej2_base_2.getValue(this.dataLabel.name || '', data[i]);
            point.tooltip = ej2_base_2.getValue(this.tooltipMappingName || '', data[i]);
            point.sliceRadius = ej2_base_2.getValue(this.radius, data[i]);
            point.sliceRadius = ej2_base_2.isNullOrUndefined(point.sliceRadius) ? '80%' : point.sliceRadius;
            point.separatorY = accumulation.intl.formatNumber(point.y, { useGrouping: accumulation.useGroupingSeparator });
            this.setAccEmptyPoint(point, i, data, colors);
            return point;
        };
        AccumulationSeries.prototype.renderSeries = function (accumulation, redraw) {
            var seriesGroup = redraw ? helper_2.getElement(accumulation.element.id + '_Series_' + this.index) :
                accumulation.renderer.createGroup({ id: accumulation.element.id + '_Series_' + this.index });
            this.renderPoints(accumulation, seriesGroup, redraw);
            var datalabelGroup;
            if (accumulation.accumulationDataLabelModule && this.dataLabel.visible) {
                datalabelGroup = accumulation.renderer.createGroup({ id: accumulation.element.id + '_datalabel_Series_' + this.index });
                datalabelGroup.style.visibility =
                    (this.animation.enable && accumulation.animateSeries && this.type === 'Pie') ? 'hidden' : 'visible';
                this.renderDataLabel(accumulation, datalabelGroup, redraw);
            }
            if (this.type === 'Pie') {
                this.findMaxBounds(this.labelBound, this.accumulationBound);
                accumulation.pieSeriesModule.animateSeries(accumulation, this.animation, this, seriesGroup);
            }
            if (accumulation.accumulationLegendModule) {
                this.labelBound.x -= accumulation.explodeDistance;
                this.labelBound.y -= accumulation.explodeDistance;
                this.labelBound.height += (accumulation.explodeDistance - this.labelBound.y);
                this.labelBound.width += (accumulation.explodeDistance - this.labelBound.x);
            }
        };
        AccumulationSeries.prototype.renderPoints = function (accumulation, seriesGroup, redraw) {
            var pointId = accumulation.element.id + '_Series_' + this.index + '_Point_';
            var option;
            for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
                var point = _a[_i];
                var argsData = {
                    cancel: false, name: constants_1.pointRender, series: this, point: point, fill: point.color,
                    border: this.isEmpty(point) ? { width: this.emptyPointSettings.border.width, color: this.emptyPointSettings.border.color } :
                        { width: this.border.width, color: this.border.color }
                };
                accumulation.trigger(constants_1.pointRender, argsData);
                point.color = argsData.fill;
                option = new ej2_svg_base_1.PathOption(pointId + point.index, point.color, argsData.border.width || 1, argsData.border.color || point.color, this.opacity, '', '');
                accumulation[(helper_2.firstToLowerCase(this.type) + 'SeriesModule')].
                    renderPoint(point, this, accumulation, option, seriesGroup, redraw);
            }
            helper_1.appendChildElement(false, accumulation.getSeriesElement(), seriesGroup, redraw);
        };
        AccumulationSeries.prototype.renderDataLabel = function (accumulation, datalabelGroup, redraw) {
            accumulation.accumulationDataLabelModule.findAreaRect();
            var element = ej2_base_1.createElement('div', {
                id: accumulation.element.id + '_Series_0' + '_DataLabelCollections'
            });
            this.leftSidePoints = [], this.rightSidePoints = [];
            var firstQuarter = [];
            var secondQuarter = [];
            for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
                var point = _a[_i];
                if (point.visible) {
                    if (this.dataLabel.showZero || (!this.dataLabel.showZero && ((point.y !== 0) || (point.y === 0 &&
                        this.emptyPointSettings.mode === 'Zero')))) {
                        accumulation.accumulationDataLabelModule.renderDataLabel(point, this.dataLabel, datalabelGroup, this.points, this.index, element, redraw);
                    }
                }
                if (point.midAngle >= 90 && point.midAngle <= 270) {
                    this.leftSidePoints.push(point);
                }
                else {
                    if (point.midAngle >= 0 && point.midAngle <= 90) {
                        secondQuarter.push(point);
                    }
                    else {
                        firstQuarter.push(point);
                    }
                }
            }
            firstQuarter.sort(function (a, b) { return a.midAngle - b.midAngle; });
            secondQuarter.sort(function (a, b) { return a.midAngle - b.midAngle; });
            this.leftSidePoints.sort(function (a, b) { return a.midAngle - b.midAngle; });
            this.rightSidePoints = firstQuarter.concat(secondQuarter);
            accumulation.accumulationDataLabelModule.drawDataLabels(this, this.dataLabel, datalabelGroup, element, redraw);
            if (this.dataLabel.template !== null && element.childElementCount) {
                var dataLabelCallBack = accumulation.accumulationDataLabelModule.drawDataLabels.bind(accumulation.accumulationDataLabelModule, this, this.dataLabel, datalabelGroup, element, redraw);
                if (accumulation.isReact) {
                    accumulation.renderReactTemplates(dataLabelCallBack);
                }
                helper_1.appendChildElement(false, helper_2.getElement(accumulation.element.id + '_Secondary_Element'), element, redraw);
            }
            helper_1.appendChildElement(false, accumulation.getSeriesElement(), datalabelGroup, redraw);
        };
        AccumulationSeries.prototype.findMaxBounds = function (totalbound, bound) {
            totalbound.x = bound.x < totalbound.x ? bound.x : totalbound.x;
            totalbound.y = bound.y < totalbound.y ? bound.y : totalbound.y;
            totalbound.height = (bound.y + bound.height) > totalbound.height ? (bound.y + bound.height) : totalbound.height;
            totalbound.width = (bound.x + bound.width) > totalbound.width ? (bound.x + bound.width) : totalbound.width;
        };
        AccumulationSeries.prototype.setAccEmptyPoint = function (point, i, data, colors) {
            if (!(ej2_base_2.isNullOrUndefined(point.y) || isNaN(point.y))) {
                return null;
            }
            point.color = this.emptyPointSettings.fill || point.color;
            switch (this.emptyPointSettings.mode) {
                case 'Zero':
                    point.y = 0;
                    point.visible = true;
                    break;
                case 'Average':
                    var previous = data[i - 1] ? (data[i - 1][this.yName] || 0) : 0;
                    var next = data[i + 1] ? (data[i + 1][this.yName] || 0) : 0;
                    point.y = (Math.abs(previous) + Math.abs(next)) / 2;
                    this.sumOfPoints += point.y;
                    point.visible = true;
                    break;
                default:
                    point.visible = false;
                    break;
            }
        };
        AccumulationSeries.prototype.isEmpty = function (point) {
            return point.color === this.emptyPointSettings.fill;
        };
        return AccumulationSeries;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property('')
    ], AccumulationSeries.prototype, "dataSource", void 0);
    __decorate([
        ej2_base_1.Property()
    ], AccumulationSeries.prototype, "query", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], AccumulationSeries.prototype, "xName", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], AccumulationSeries.prototype, "name", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], AccumulationSeries.prototype, "tooltipMappingName", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], AccumulationSeries.prototype, "yName", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], AccumulationSeries.prototype, "visible", void 0);
    __decorate([
        ej2_base_1.Complex({ color: null, width: 0 }, base_1.Border)
    ], AccumulationSeries.prototype, "border", void 0);
    __decorate([
        ej2_base_1.Complex(null, base_1.Animation)
    ], AccumulationSeries.prototype, "animation", void 0);
    __decorate([
        ej2_base_1.Property('SeriesType')
    ], AccumulationSeries.prototype, "legendShape", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], AccumulationSeries.prototype, "legendImageUrl", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], AccumulationSeries.prototype, "pointColorMapping", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], AccumulationSeries.prototype, "selectionStyle", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], AccumulationSeries.prototype, "groupTo", void 0);
    __decorate([
        ej2_base_1.Property('Value')
    ], AccumulationSeries.prototype, "groupMode", void 0);
    __decorate([
        ej2_base_1.Complex({}, AccumulationDataLabelSettings)
    ], AccumulationSeries.prototype, "dataLabel", void 0);
    __decorate([
        ej2_base_1.Property([])
    ], AccumulationSeries.prototype, "palettes", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], AccumulationSeries.prototype, "startAngle", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], AccumulationSeries.prototype, "endAngle", void 0);
    __decorate([
        ej2_base_1.Property('80%')
    ], AccumulationSeries.prototype, "radius", void 0);
    __decorate([
        ej2_base_1.Property('0')
    ], AccumulationSeries.prototype, "innerRadius", void 0);
    __decorate([
        ej2_base_1.Property('Pie')
    ], AccumulationSeries.prototype, "type", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], AccumulationSeries.prototype, "enableTooltip", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], AccumulationSeries.prototype, "explode", void 0);
    __decorate([
        ej2_base_1.Property('30%')
    ], AccumulationSeries.prototype, "explodeOffset", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], AccumulationSeries.prototype, "explodeAll", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], AccumulationSeries.prototype, "explodeIndex", void 0);
    __decorate([
        ej2_base_1.Complex({ mode: 'Drop' }, base_1.EmptyPointSettings)
    ], AccumulationSeries.prototype, "emptyPointSettings", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], AccumulationSeries.prototype, "gapRatio", void 0);
    __decorate([
        ej2_base_1.Property('80%')
    ], AccumulationSeries.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property('80%')
    ], AccumulationSeries.prototype, "height", void 0);
    __decorate([
        ej2_base_1.Property('20%')
    ], AccumulationSeries.prototype, "neckWidth", void 0);
    __decorate([
        ej2_base_1.Property('20%')
    ], AccumulationSeries.prototype, "neckHeight", void 0);
    __decorate([
        ej2_base_1.Property('Linear')
    ], AccumulationSeries.prototype, "pyramidMode", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], AccumulationSeries.prototype, "opacity", void 0);
    exports.AccumulationSeries = AccumulationSeries;
    function getSeriesFromIndex(index, visibleSeries) {
        for (var _i = 0, visibleSeries_1 = visibleSeries; _i < visibleSeries_1.length; _i++) {
            var series = visibleSeries_1[_i];
            if (index === series.index) {
                return series;
            }
        }
        return visibleSeries[0];
    }
    exports.getSeriesFromIndex = getSeriesFromIndex;
    function pointByIndex(index, points) {
        for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
            var point = points_1[_i];
            if (point.index === index) {
                return point;
            }
        }
        return null;
    }
    exports.pointByIndex = pointByIndex;
});
