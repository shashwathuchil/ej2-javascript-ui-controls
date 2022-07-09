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
define(["require", "exports", "@syncfusion/ej2-base", "../../common/model/base", "../utils/theme", "../../common/legend/legend"], function (require, exports, ej2_base_1, base_1, theme_1, legend_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Range = (function (_super) {
        __extends(Range, _super);
        function Range() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Range;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(null)
    ], Range.prototype, "end", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], Range.prototype, "opacity", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Range.prototype, "color", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Range.prototype, "index", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Range.prototype, "name", void 0);
    __decorate([
        ej2_base_1.Property('Rectangle')
    ], Range.prototype, "shape", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], Range.prototype, "legendImageUrl", void 0);
    exports.Range = Range;
    var MajorTickLinesSettings = (function (_super) {
        __extends(MajorTickLinesSettings, _super);
        function MajorTickLinesSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MajorTickLinesSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(12)
    ], MajorTickLinesSettings.prototype, "height", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], MajorTickLinesSettings.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], MajorTickLinesSettings.prototype, "color", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], MajorTickLinesSettings.prototype, "useRangeColor", void 0);
    exports.MajorTickLinesSettings = MajorTickLinesSettings;
    var MinorTickLinesSettings = (function (_super) {
        __extends(MinorTickLinesSettings, _super);
        function MinorTickLinesSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MinorTickLinesSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(8)
    ], MinorTickLinesSettings.prototype, "height", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], MinorTickLinesSettings.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], MinorTickLinesSettings.prototype, "color", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], MinorTickLinesSettings.prototype, "useRangeColor", void 0);
    exports.MinorTickLinesSettings = MinorTickLinesSettings;
    var BulletLabelStyle = (function (_super) {
        __extends(BulletLabelStyle, _super);
        function BulletLabelStyle() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return BulletLabelStyle;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property('Normal')
    ], BulletLabelStyle.prototype, "fontStyle", void 0);
    __decorate([
        ej2_base_1.Property('16px')
    ], BulletLabelStyle.prototype, "size", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], BulletLabelStyle.prototype, "color", void 0);
    __decorate([
        ej2_base_1.Property('Normal')
    ], BulletLabelStyle.prototype, "fontWeight", void 0);
    __decorate([
        ej2_base_1.Property('Segoe UI')
    ], BulletLabelStyle.prototype, "fontFamily", void 0);
    __decorate([
        ej2_base_1.Property('Center')
    ], BulletLabelStyle.prototype, "textAlignment", void 0);
    __decorate([
        ej2_base_1.Property('None')
    ], BulletLabelStyle.prototype, "textOverflow", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], BulletLabelStyle.prototype, "opacity", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], BulletLabelStyle.prototype, "enableTrim", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], BulletLabelStyle.prototype, "maximumTitleWidth", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], BulletLabelStyle.prototype, "useRangeColor", void 0);
    exports.BulletLabelStyle = BulletLabelStyle;
    var BulletTooltipSettings = (function (_super) {
        __extends(BulletTooltipSettings, _super);
        function BulletTooltipSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return BulletTooltipSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(false)
    ], BulletTooltipSettings.prototype, "enable", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], BulletTooltipSettings.prototype, "fill", void 0);
    __decorate([
        ej2_base_1.Complex(theme_1.BulletChartTheme.tooltipLabelFont, BulletLabelStyle)
    ], BulletTooltipSettings.prototype, "textStyle", void 0);
    __decorate([
        ej2_base_1.Complex({ color: '#cccccc', width: 0.5 }, base_1.Border)
    ], BulletTooltipSettings.prototype, "border", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], BulletTooltipSettings.prototype, "template", void 0);
    exports.BulletTooltipSettings = BulletTooltipSettings;
    var BulletDataLabel = (function (_super) {
        __extends(BulletDataLabel, _super);
        function BulletDataLabel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return BulletDataLabel;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(false)
    ], BulletDataLabel.prototype, "enable", void 0);
    __decorate([
        ej2_base_1.Complex(theme_1.BulletChartTheme.dataLabelFont, BulletLabelStyle)
    ], BulletDataLabel.prototype, "labelStyle", void 0);
    exports.BulletDataLabel = BulletDataLabel;
    var BulletChartLegendSettings = (function (_super) {
        __extends(BulletChartLegendSettings, _super);
        function BulletChartLegendSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return BulletChartLegendSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(false)
    ], BulletChartLegendSettings.prototype, "visible", void 0);
    __decorate([
        ej2_base_1.Complex({ x: 0, y: 0 }, legend_1.Location)
    ], BulletChartLegendSettings.prototype, "location", void 0);
    __decorate([
        ej2_base_1.Property(8)
    ], BulletChartLegendSettings.prototype, "padding", void 0);
    __decorate([
        ej2_base_1.Property('Center')
    ], BulletChartLegendSettings.prototype, "alignment", void 0);
    __decorate([
        ej2_base_1.Property(10)
    ], BulletChartLegendSettings.prototype, "shapeHeight", void 0);
    __decorate([
        ej2_base_1.Property(10)
    ], BulletChartLegendSettings.prototype, "shapeWidth", void 0);
    __decorate([
        ej2_base_1.Complex(theme_1.BulletChartTheme.legendLabelFont, BulletLabelStyle)
    ], BulletChartLegendSettings.prototype, "textStyle", void 0);
    __decorate([
        ej2_base_1.Property('Auto')
    ], BulletChartLegendSettings.prototype, "position", void 0);
    __decorate([
        ej2_base_1.Complex({ left: 0, right: 0, top: 0, bottom: 0 }, base_1.Margin)
    ], BulletChartLegendSettings.prototype, "margin", void 0);
    __decorate([
        ej2_base_1.Complex({}, base_1.Border)
    ], BulletChartLegendSettings.prototype, "border", void 0);
    __decorate([
        ej2_base_1.Property(5)
    ], BulletChartLegendSettings.prototype, "shapePadding", void 0);
    __decorate([
        ej2_base_1.Property('transparent')
    ], BulletChartLegendSettings.prototype, "background", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], BulletChartLegendSettings.prototype, "opacity", void 0);
    __decorate([
        ej2_base_1.Property(3)
    ], BulletChartLegendSettings.prototype, "tabIndex", void 0);
    exports.BulletChartLegendSettings = BulletChartLegendSettings;
});
