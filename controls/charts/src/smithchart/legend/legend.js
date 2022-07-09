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
    var LegendTitle = (function (_super) {
        __extends(LegendTitle, _super);
        function LegendTitle() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return LegendTitle;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(true)
    ], LegendTitle.prototype, "visible", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], LegendTitle.prototype, "text", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], LegendTitle.prototype, "description", void 0);
    __decorate([
        ej2_base_1.Property('Center')
    ], LegendTitle.prototype, "textAlignment", void 0);
    __decorate([
        ej2_base_1.Complex(theme_1.Theme.legendLabelFont, utils_1.SmithchartFont)
    ], LegendTitle.prototype, "textStyle", void 0);
    exports.LegendTitle = LegendTitle;
    var LegendLocation = (function (_super) {
        __extends(LegendLocation, _super);
        function LegendLocation() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return LegendLocation;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(0)
    ], LegendLocation.prototype, "x", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], LegendLocation.prototype, "y", void 0);
    exports.LegendLocation = LegendLocation;
    var LegendItemStyleBorder = (function (_super) {
        __extends(LegendItemStyleBorder, _super);
        function LegendItemStyleBorder() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return LegendItemStyleBorder;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(1)
    ], LegendItemStyleBorder.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], LegendItemStyleBorder.prototype, "color", void 0);
    exports.LegendItemStyleBorder = LegendItemStyleBorder;
    var LegendItemStyle = (function (_super) {
        __extends(LegendItemStyle, _super);
        function LegendItemStyle() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return LegendItemStyle;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(10)
    ], LegendItemStyle.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property(10)
    ], LegendItemStyle.prototype, "height", void 0);
    __decorate([
        ej2_base_1.Complex({}, LegendItemStyleBorder)
    ], LegendItemStyle.prototype, "border", void 0);
    exports.LegendItemStyle = LegendItemStyle;
    var LegendBorder = (function (_super) {
        __extends(LegendBorder, _super);
        function LegendBorder() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return LegendBorder;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(1)
    ], LegendBorder.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], LegendBorder.prototype, "color", void 0);
    exports.LegendBorder = LegendBorder;
    var SmithchartLegendSettings = (function (_super) {
        __extends(SmithchartLegendSettings, _super);
        function SmithchartLegendSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SmithchartLegendSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(false)
    ], SmithchartLegendSettings.prototype, "visible", void 0);
    __decorate([
        ej2_base_1.Property('bottom')
    ], SmithchartLegendSettings.prototype, "position", void 0);
    __decorate([
        ej2_base_1.Property('Center')
    ], SmithchartLegendSettings.prototype, "alignment", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], SmithchartLegendSettings.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], SmithchartLegendSettings.prototype, "height", void 0);
    __decorate([
        ej2_base_1.Property('circle')
    ], SmithchartLegendSettings.prototype, "shape", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], SmithchartLegendSettings.prototype, "rowCount", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], SmithchartLegendSettings.prototype, "columnCount", void 0);
    __decorate([
        ej2_base_1.Property(8)
    ], SmithchartLegendSettings.prototype, "itemPadding", void 0);
    __decorate([
        ej2_base_1.Property(5)
    ], SmithchartLegendSettings.prototype, "shapePadding", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], SmithchartLegendSettings.prototype, "description", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], SmithchartLegendSettings.prototype, "toggleVisibility", void 0);
    __decorate([
        ej2_base_1.Complex({}, LegendTitle)
    ], SmithchartLegendSettings.prototype, "title", void 0);
    __decorate([
        ej2_base_1.Complex({}, LegendLocation)
    ], SmithchartLegendSettings.prototype, "location", void 0);
    __decorate([
        ej2_base_1.Complex({}, LegendItemStyle)
    ], SmithchartLegendSettings.prototype, "itemStyle", void 0);
    __decorate([
        ej2_base_1.Complex({}, LegendBorder)
    ], SmithchartLegendSettings.prototype, "border", void 0);
    __decorate([
        ej2_base_1.Complex(theme_1.Theme.legendLabelFont, utils_1.SmithchartFont)
    ], SmithchartLegendSettings.prototype, "textStyle", void 0);
    exports.SmithchartLegendSettings = SmithchartLegendSettings;
});
