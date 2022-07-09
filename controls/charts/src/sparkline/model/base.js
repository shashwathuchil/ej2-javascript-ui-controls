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
define(["require", "exports", "@syncfusion/ej2-base"], function (require, exports, ej2_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SparklineBorder = (function (_super) {
        __extends(SparklineBorder, _super);
        function SparklineBorder() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SparklineBorder;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property('')
    ], SparklineBorder.prototype, "color", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], SparklineBorder.prototype, "width", void 0);
    exports.SparklineBorder = SparklineBorder;
    var SparklineFont = (function (_super) {
        __extends(SparklineFont, _super);
        function SparklineFont() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SparklineFont;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(null)
    ], SparklineFont.prototype, "size", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], SparklineFont.prototype, "color", void 0);
    __decorate([
        ej2_base_1.Property('Roboto, Segoe UI, Noto, Sans-serif')
    ], SparklineFont.prototype, "fontFamily", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], SparklineFont.prototype, "fontWeight", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], SparklineFont.prototype, "fontStyle", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], SparklineFont.prototype, "opacity", void 0);
    exports.SparklineFont = SparklineFont;
    var TrackLineSettings = (function (_super) {
        __extends(TrackLineSettings, _super);
        function TrackLineSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return TrackLineSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(false)
    ], TrackLineSettings.prototype, "visible", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], TrackLineSettings.prototype, "color", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], TrackLineSettings.prototype, "width", void 0);
    exports.TrackLineSettings = TrackLineSettings;
    var SparklineTooltipSettings = (function (_super) {
        __extends(SparklineTooltipSettings, _super);
        function SparklineTooltipSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SparklineTooltipSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(false)
    ], SparklineTooltipSettings.prototype, "visible", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], SparklineTooltipSettings.prototype, "fill", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], SparklineTooltipSettings.prototype, "template", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], SparklineTooltipSettings.prototype, "format", void 0);
    __decorate([
        ej2_base_1.Complex({ color: '#cccccc', width: 0.5 }, SparklineBorder)
    ], SparklineTooltipSettings.prototype, "border", void 0);
    __decorate([
        ej2_base_1.Complex({ size: '13px', fontWeight: 'Normal', fontStyle: 'Normal', fontFamily: 'Roboto, Segoe UI, Noto, Sans-serif' }, SparklineFont)
    ], SparklineTooltipSettings.prototype, "textStyle", void 0);
    __decorate([
        ej2_base_1.Complex({}, TrackLineSettings)
    ], SparklineTooltipSettings.prototype, "trackLineSettings", void 0);
    exports.SparklineTooltipSettings = SparklineTooltipSettings;
    var ContainerArea = (function (_super) {
        __extends(ContainerArea, _super);
        function ContainerArea() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ContainerArea;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property('transparent')
    ], ContainerArea.prototype, "background", void 0);
    __decorate([
        ej2_base_1.Complex({}, SparklineBorder)
    ], ContainerArea.prototype, "border", void 0);
    exports.ContainerArea = ContainerArea;
    var LineSettings = (function (_super) {
        __extends(LineSettings, _super);
        function LineSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return LineSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(false)
    ], LineSettings.prototype, "visible", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], LineSettings.prototype, "color", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], LineSettings.prototype, "dashArray", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], LineSettings.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], LineSettings.prototype, "opacity", void 0);
    exports.LineSettings = LineSettings;
    var RangeBandSettings = (function (_super) {
        __extends(RangeBandSettings, _super);
        function RangeBandSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return RangeBandSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(null)
    ], RangeBandSettings.prototype, "startRange", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], RangeBandSettings.prototype, "endRange", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], RangeBandSettings.prototype, "color", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], RangeBandSettings.prototype, "opacity", void 0);
    exports.RangeBandSettings = RangeBandSettings;
    var AxisSettings = (function (_super) {
        __extends(AxisSettings, _super);
        function AxisSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return AxisSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(null)
    ], AxisSettings.prototype, "minX", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], AxisSettings.prototype, "maxX", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], AxisSettings.prototype, "minY", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], AxisSettings.prototype, "maxY", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], AxisSettings.prototype, "value", void 0);
    __decorate([
        ej2_base_1.Complex({}, LineSettings)
    ], AxisSettings.prototype, "lineSettings", void 0);
    exports.AxisSettings = AxisSettings;
    var Padding = (function (_super) {
        __extends(Padding, _super);
        function Padding() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Padding;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(5)
    ], Padding.prototype, "left", void 0);
    __decorate([
        ej2_base_1.Property(5)
    ], Padding.prototype, "right", void 0);
    __decorate([
        ej2_base_1.Property(5)
    ], Padding.prototype, "bottom", void 0);
    __decorate([
        ej2_base_1.Property(5)
    ], Padding.prototype, "top", void 0);
    exports.Padding = Padding;
    var SparklineMarkerSettings = (function (_super) {
        __extends(SparklineMarkerSettings, _super);
        function SparklineMarkerSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SparklineMarkerSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property([])
    ], SparklineMarkerSettings.prototype, "visible", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], SparklineMarkerSettings.prototype, "opacity", void 0);
    __decorate([
        ej2_base_1.Property(5)
    ], SparklineMarkerSettings.prototype, "size", void 0);
    __decorate([
        ej2_base_1.Property('#00bdae')
    ], SparklineMarkerSettings.prototype, "fill", void 0);
    __decorate([
        ej2_base_1.Complex({ width: 1 }, SparklineBorder)
    ], SparklineMarkerSettings.prototype, "border", void 0);
    exports.SparklineMarkerSettings = SparklineMarkerSettings;
    var LabelOffset = (function (_super) {
        __extends(LabelOffset, _super);
        function LabelOffset() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return LabelOffset;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(0)
    ], LabelOffset.prototype, "x", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], LabelOffset.prototype, "y", void 0);
    exports.LabelOffset = LabelOffset;
    var SparklineDataLabelSettings = (function (_super) {
        __extends(SparklineDataLabelSettings, _super);
        function SparklineDataLabelSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SparklineDataLabelSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property([])
    ], SparklineDataLabelSettings.prototype, "visible", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], SparklineDataLabelSettings.prototype, "opacity", void 0);
    __decorate([
        ej2_base_1.Property('transparent')
    ], SparklineDataLabelSettings.prototype, "fill", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], SparklineDataLabelSettings.prototype, "format", void 0);
    __decorate([
        ej2_base_1.Complex({ color: 'transparent', width: 0 }, SparklineBorder)
    ], SparklineDataLabelSettings.prototype, "border", void 0);
    __decorate([
        ej2_base_1.Complex({ size: '14px', fontWeight: 'Medium', fontStyle: 'Medium', fontFamily: 'Roboto, Segoe UI, Noto, Sans-serif' }, SparklineFont)
    ], SparklineDataLabelSettings.prototype, "textStyle", void 0);
    __decorate([
        ej2_base_1.Complex({}, LabelOffset)
    ], SparklineDataLabelSettings.prototype, "offset", void 0);
    __decorate([
        ej2_base_1.Property('None')
    ], SparklineDataLabelSettings.prototype, "edgeLabelMode", void 0);
    exports.SparklineDataLabelSettings = SparklineDataLabelSettings;
});
