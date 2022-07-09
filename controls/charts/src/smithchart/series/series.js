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
define(["require", "exports", "@syncfusion/ej2-base", "../utils/utils", "../model/theme"], function (require, exports, ej2_base_1, utils_1, theme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SeriesTooltipBorder = (function (_super) {
        __extends(SeriesTooltipBorder, _super);
        function SeriesTooltipBorder() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SeriesTooltipBorder;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(1)
    ], SeriesTooltipBorder.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], SeriesTooltipBorder.prototype, "color", void 0);
    exports.SeriesTooltipBorder = SeriesTooltipBorder;
    var SeriesTooltip = (function (_super) {
        __extends(SeriesTooltip, _super);
        function SeriesTooltip() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SeriesTooltip;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(false)
    ], SeriesTooltip.prototype, "visible", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], SeriesTooltip.prototype, "fill", void 0);
    __decorate([
        ej2_base_1.Property(0.95)
    ], SeriesTooltip.prototype, "opacity", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], SeriesTooltip.prototype, "template", void 0);
    __decorate([
        ej2_base_1.Complex({}, SeriesTooltipBorder)
    ], SeriesTooltip.prototype, "border", void 0);
    exports.SeriesTooltip = SeriesTooltip;
    var SeriesMarkerBorder = (function (_super) {
        __extends(SeriesMarkerBorder, _super);
        function SeriesMarkerBorder() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SeriesMarkerBorder;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(3)
    ], SeriesMarkerBorder.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property('white')
    ], SeriesMarkerBorder.prototype, "color", void 0);
    exports.SeriesMarkerBorder = SeriesMarkerBorder;
    var SeriesMarkerDataLabelBorder = (function (_super) {
        __extends(SeriesMarkerDataLabelBorder, _super);
        function SeriesMarkerDataLabelBorder() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SeriesMarkerDataLabelBorder;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(0.1)
    ], SeriesMarkerDataLabelBorder.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property('white')
    ], SeriesMarkerDataLabelBorder.prototype, "color", void 0);
    exports.SeriesMarkerDataLabelBorder = SeriesMarkerDataLabelBorder;
    var SeriesMarkerDataLabelConnectorLine = (function (_super) {
        __extends(SeriesMarkerDataLabelConnectorLine, _super);
        function SeriesMarkerDataLabelConnectorLine() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SeriesMarkerDataLabelConnectorLine;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(1)
    ], SeriesMarkerDataLabelConnectorLine.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], SeriesMarkerDataLabelConnectorLine.prototype, "color", void 0);
    exports.SeriesMarkerDataLabelConnectorLine = SeriesMarkerDataLabelConnectorLine;
    var SeriesMarkerDataLabel = (function (_super) {
        __extends(SeriesMarkerDataLabel, _super);
        function SeriesMarkerDataLabel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SeriesMarkerDataLabel;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(false)
    ], SeriesMarkerDataLabel.prototype, "visible", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], SeriesMarkerDataLabel.prototype, "template", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], SeriesMarkerDataLabel.prototype, "fill", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], SeriesMarkerDataLabel.prototype, "opacity", void 0);
    __decorate([
        ej2_base_1.Complex({}, SeriesMarkerDataLabelBorder)
    ], SeriesMarkerDataLabel.prototype, "border", void 0);
    __decorate([
        ej2_base_1.Complex({}, SeriesMarkerDataLabelConnectorLine)
    ], SeriesMarkerDataLabel.prototype, "connectorLine", void 0);
    __decorate([
        ej2_base_1.Complex(theme_1.Theme.dataLabelFont, utils_1.SmithchartFont)
    ], SeriesMarkerDataLabel.prototype, "textStyle", void 0);
    exports.SeriesMarkerDataLabel = SeriesMarkerDataLabel;
    var SeriesMarker = (function (_super) {
        __extends(SeriesMarker, _super);
        function SeriesMarker() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SeriesMarker;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(false)
    ], SeriesMarker.prototype, "visible", void 0);
    __decorate([
        ej2_base_1.Property('circle')
    ], SeriesMarker.prototype, "shape", void 0);
    __decorate([
        ej2_base_1.Property(6)
    ], SeriesMarker.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property(6)
    ], SeriesMarker.prototype, "height", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], SeriesMarker.prototype, "imageUrl", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], SeriesMarker.prototype, "fill", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], SeriesMarker.prototype, "opacity", void 0);
    __decorate([
        ej2_base_1.Complex({}, SeriesMarkerBorder)
    ], SeriesMarker.prototype, "border", void 0);
    __decorate([
        ej2_base_1.Complex({}, SeriesMarkerDataLabel)
    ], SeriesMarker.prototype, "dataLabel", void 0);
    exports.SeriesMarker = SeriesMarker;
    var SmithchartSeries = (function (_super) {
        __extends(SmithchartSeries, _super);
        function SmithchartSeries() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SmithchartSeries;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property('visible')
    ], SmithchartSeries.prototype, "visibility", void 0);
    __decorate([
        ej2_base_1.Property([])
    ], SmithchartSeries.prototype, "points", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], SmithchartSeries.prototype, "resistance", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], SmithchartSeries.prototype, "reactance", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], SmithchartSeries.prototype, "tooltipMappingName", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], SmithchartSeries.prototype, "dataSource", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], SmithchartSeries.prototype, "name", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], SmithchartSeries.prototype, "fill", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], SmithchartSeries.prototype, "enableAnimation", void 0);
    __decorate([
        ej2_base_1.Property('2000ms')
    ], SmithchartSeries.prototype, "animationDuration", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], SmithchartSeries.prototype, "enableSmartLabels", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], SmithchartSeries.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], SmithchartSeries.prototype, "opacity", void 0);
    __decorate([
        ej2_base_1.Complex({}, SeriesMarker)
    ], SmithchartSeries.prototype, "marker", void 0);
    __decorate([
        ej2_base_1.Complex({}, SeriesTooltip)
    ], SmithchartSeries.prototype, "tooltip", void 0);
    exports.SmithchartSeries = SmithchartSeries;
});
