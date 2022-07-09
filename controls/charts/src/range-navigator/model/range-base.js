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
define(["require", "exports", "@syncfusion/ej2-base", "../../common/model/base", "@syncfusion/ej2-svg-base", "../utils/theme"], function (require, exports, ej2_base_1, base_1, ej2_svg_base_1, theme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RangeNavigatorSeries = (function (_super) {
        __extends(RangeNavigatorSeries, _super);
        function RangeNavigatorSeries() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.clipRect = new ej2_svg_base_1.Rect(0, 0, 0, 0);
            return _this;
        }
        return RangeNavigatorSeries;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(null)
    ], RangeNavigatorSeries.prototype, "dataSource", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], RangeNavigatorSeries.prototype, "xName", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], RangeNavigatorSeries.prototype, "yName", void 0);
    __decorate([
        ej2_base_1.Property()
    ], RangeNavigatorSeries.prototype, "query", void 0);
    __decorate([
        ej2_base_1.Property('Line')
    ], RangeNavigatorSeries.prototype, "type", void 0);
    __decorate([
        ej2_base_1.Complex({ enable: false }, base_1.Animation)
    ], RangeNavigatorSeries.prototype, "animation", void 0);
    __decorate([
        ej2_base_1.Complex({ color: 'transparent', width: 2 }, base_1.Border)
    ], RangeNavigatorSeries.prototype, "border", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], RangeNavigatorSeries.prototype, "fill", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], RangeNavigatorSeries.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], RangeNavigatorSeries.prototype, "opacity", void 0);
    __decorate([
        ej2_base_1.Property('0')
    ], RangeNavigatorSeries.prototype, "dashArray", void 0);
    exports.RangeNavigatorSeries = RangeNavigatorSeries;
    var ThumbSettings = (function (_super) {
        __extends(ThumbSettings, _super);
        function ThumbSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ThumbSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(null)
    ], ThumbSettings.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], ThumbSettings.prototype, "height", void 0);
    __decorate([
        ej2_base_1.Complex({ width: 1, color: null }, base_1.Border)
    ], ThumbSettings.prototype, "border", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], ThumbSettings.prototype, "fill", void 0);
    __decorate([
        ej2_base_1.Property('Circle')
    ], ThumbSettings.prototype, "type", void 0);
    exports.ThumbSettings = ThumbSettings;
    var StyleSettings = (function (_super) {
        __extends(StyleSettings, _super);
        function StyleSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return StyleSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Complex({}, ThumbSettings)
    ], StyleSettings.prototype, "thumb", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], StyleSettings.prototype, "selectedRegionColor", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], StyleSettings.prototype, "unselectedRegionColor", void 0);
    exports.StyleSettings = StyleSettings;
    var RangeTooltipSettings = (function (_super) {
        __extends(RangeTooltipSettings, _super);
        function RangeTooltipSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return RangeTooltipSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(false)
    ], RangeTooltipSettings.prototype, "enable", void 0);
    __decorate([
        ej2_base_1.Property(0.85)
    ], RangeTooltipSettings.prototype, "opacity", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], RangeTooltipSettings.prototype, "fill", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], RangeTooltipSettings.prototype, "format", void 0);
    __decorate([
        ej2_base_1.Complex(theme_1.RangeNavigatorTheme.tooltipLabelFont, base_1.Font)
    ], RangeTooltipSettings.prototype, "textStyle", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], RangeTooltipSettings.prototype, "template", void 0);
    __decorate([
        ej2_base_1.Complex({ color: '#cccccc', width: 0.5 }, base_1.Border)
    ], RangeTooltipSettings.prototype, "border", void 0);
    __decorate([
        ej2_base_1.Property('OnDemand')
    ], RangeTooltipSettings.prototype, "displayMode", void 0);
    exports.RangeTooltipSettings = RangeTooltipSettings;
});
