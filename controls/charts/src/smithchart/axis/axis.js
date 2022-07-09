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
    var SmithchartMajorGridLines = (function (_super) {
        __extends(SmithchartMajorGridLines, _super);
        function SmithchartMajorGridLines() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SmithchartMajorGridLines;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(1)
    ], SmithchartMajorGridLines.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], SmithchartMajorGridLines.prototype, "dashArray", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], SmithchartMajorGridLines.prototype, "visible", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], SmithchartMajorGridLines.prototype, "color", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], SmithchartMajorGridLines.prototype, "opacity", void 0);
    exports.SmithchartMajorGridLines = SmithchartMajorGridLines;
    var SmithchartMinorGridLines = (function (_super) {
        __extends(SmithchartMinorGridLines, _super);
        function SmithchartMinorGridLines() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SmithchartMinorGridLines;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(1)
    ], SmithchartMinorGridLines.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], SmithchartMinorGridLines.prototype, "dashArray", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], SmithchartMinorGridLines.prototype, "visible", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], SmithchartMinorGridLines.prototype, "color", void 0);
    __decorate([
        ej2_base_1.Property(8)
    ], SmithchartMinorGridLines.prototype, "count", void 0);
    exports.SmithchartMinorGridLines = SmithchartMinorGridLines;
    var SmithchartAxisLine = (function (_super) {
        __extends(SmithchartAxisLine, _super);
        function SmithchartAxisLine() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SmithchartAxisLine;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(true)
    ], SmithchartAxisLine.prototype, "visible", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], SmithchartAxisLine.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], SmithchartAxisLine.prototype, "color", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], SmithchartAxisLine.prototype, "dashArray", void 0);
    exports.SmithchartAxisLine = SmithchartAxisLine;
    var SmithchartAxis = (function (_super) {
        __extends(SmithchartAxis, _super);
        function SmithchartAxis() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SmithchartAxis;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(true)
    ], SmithchartAxis.prototype, "visible", void 0);
    __decorate([
        ej2_base_1.Property('Outside')
    ], SmithchartAxis.prototype, "labelPosition", void 0);
    __decorate([
        ej2_base_1.Property('Hide')
    ], SmithchartAxis.prototype, "labelIntersectAction", void 0);
    __decorate([
        ej2_base_1.Complex({}, SmithchartMajorGridLines)
    ], SmithchartAxis.prototype, "majorGridLines", void 0);
    __decorate([
        ej2_base_1.Complex({}, SmithchartMinorGridLines)
    ], SmithchartAxis.prototype, "minorGridLines", void 0);
    __decorate([
        ej2_base_1.Complex({}, SmithchartAxisLine)
    ], SmithchartAxis.prototype, "axisLine", void 0);
    __decorate([
        ej2_base_1.Complex(theme_1.Theme.axisLabelFont, utils_1.SmithchartFont)
    ], SmithchartAxis.prototype, "labelStyle", void 0);
    exports.SmithchartAxis = SmithchartAxis;
});
