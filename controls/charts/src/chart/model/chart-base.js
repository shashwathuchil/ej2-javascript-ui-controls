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
define(["require", "exports", "@syncfusion/ej2-base", "../../common/model/theme", "../../common/model/base"], function (require, exports, ej2_base_1, theme_1, base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChartAnnotationSettings = (function (_super) {
        __extends(ChartAnnotationSettings, _super);
        function ChartAnnotationSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ChartAnnotationSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property('0')
    ], ChartAnnotationSettings.prototype, "x", void 0);
    __decorate([
        ej2_base_1.Property('0')
    ], ChartAnnotationSettings.prototype, "y", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], ChartAnnotationSettings.prototype, "content", void 0);
    __decorate([
        ej2_base_1.Property('Center')
    ], ChartAnnotationSettings.prototype, "horizontalAlignment", void 0);
    __decorate([
        ej2_base_1.Property('Pixel')
    ], ChartAnnotationSettings.prototype, "coordinateUnits", void 0);
    __decorate([
        ej2_base_1.Property('Chart')
    ], ChartAnnotationSettings.prototype, "region", void 0);
    __decorate([
        ej2_base_1.Property('Middle')
    ], ChartAnnotationSettings.prototype, "verticalAlignment", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], ChartAnnotationSettings.prototype, "xAxisName", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], ChartAnnotationSettings.prototype, "yAxisName", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], ChartAnnotationSettings.prototype, "description", void 0);
    exports.ChartAnnotationSettings = ChartAnnotationSettings;
    var LabelBorder = (function (_super) {
        __extends(LabelBorder, _super);
        function LabelBorder() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return LabelBorder;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property('')
    ], LabelBorder.prototype, "color", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], LabelBorder.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property('Rectangle')
    ], LabelBorder.prototype, "type", void 0);
    exports.LabelBorder = LabelBorder;
    var MultiLevelCategories = (function (_super) {
        __extends(MultiLevelCategories, _super);
        function MultiLevelCategories() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MultiLevelCategories;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(null)
    ], MultiLevelCategories.prototype, "start", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], MultiLevelCategories.prototype, "end", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], MultiLevelCategories.prototype, "text", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], MultiLevelCategories.prototype, "maximumTextWidth", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], MultiLevelCategories.prototype, "customAttributes", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], MultiLevelCategories.prototype, "type", void 0);
    exports.MultiLevelCategories = MultiLevelCategories;
    var StripLineSettings = (function (_super) {
        __extends(StripLineSettings, _super);
        function StripLineSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return StripLineSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(true)
    ], StripLineSettings.prototype, "visible", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], StripLineSettings.prototype, "startFromAxis", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], StripLineSettings.prototype, "start", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], StripLineSettings.prototype, "end", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], StripLineSettings.prototype, "size", void 0);
    __decorate([
        ej2_base_1.Property('#808080')
    ], StripLineSettings.prototype, "color", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], StripLineSettings.prototype, "dashArray", void 0);
    __decorate([
        ej2_base_1.Property('Auto')
    ], StripLineSettings.prototype, "sizeType", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], StripLineSettings.prototype, "isRepeat", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], StripLineSettings.prototype, "repeatEvery", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], StripLineSettings.prototype, "repeatUntil", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], StripLineSettings.prototype, "isSegmented", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], StripLineSettings.prototype, "segmentStart", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], StripLineSettings.prototype, "segmentEnd", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], StripLineSettings.prototype, "segmentAxisName", void 0);
    __decorate([
        ej2_base_1.Complex({ color: 'transparent', width: 1 }, base_1.Border)
    ], StripLineSettings.prototype, "border", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], StripLineSettings.prototype, "text", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], StripLineSettings.prototype, "rotation", void 0);
    __decorate([
        ej2_base_1.Property('Middle')
    ], StripLineSettings.prototype, "horizontalAlignment", void 0);
    __decorate([
        ej2_base_1.Property('Middle')
    ], StripLineSettings.prototype, "verticalAlignment", void 0);
    __decorate([
        ej2_base_1.Complex(theme_1.Theme.stripLineLabelFont, base_1.Font)
    ], StripLineSettings.prototype, "textStyle", void 0);
    __decorate([
        ej2_base_1.Property('Behind')
    ], StripLineSettings.prototype, "zIndex", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], StripLineSettings.prototype, "opacity", void 0);
    exports.StripLineSettings = StripLineSettings;
    var MultiLevelLabels = (function (_super) {
        __extends(MultiLevelLabels, _super);
        function MultiLevelLabels() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MultiLevelLabels;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property('Center')
    ], MultiLevelLabels.prototype, "alignment", void 0);
    __decorate([
        ej2_base_1.Property('Wrap')
    ], MultiLevelLabels.prototype, "overflow", void 0);
    __decorate([
        ej2_base_1.Complex(theme_1.Theme.axisLabelFont, base_1.Font)
    ], MultiLevelLabels.prototype, "textStyle", void 0);
    __decorate([
        ej2_base_1.Complex({ color: null, width: 1, type: 'Rectangle' }, LabelBorder)
    ], MultiLevelLabels.prototype, "border", void 0);
    __decorate([
        ej2_base_1.Collection([], MultiLevelCategories)
    ], MultiLevelLabels.prototype, "categories", void 0);
    exports.MultiLevelLabels = MultiLevelLabels;
    var ScrollbarSettingsRange = (function (_super) {
        __extends(ScrollbarSettingsRange, _super);
        function ScrollbarSettingsRange() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ScrollbarSettingsRange;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(null)
    ], ScrollbarSettingsRange.prototype, "minimum", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], ScrollbarSettingsRange.prototype, "maximum", void 0);
    exports.ScrollbarSettingsRange = ScrollbarSettingsRange;
    var ScrollbarSettings = (function (_super) {
        __extends(ScrollbarSettings, _super);
        function ScrollbarSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ScrollbarSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(false)
    ], ScrollbarSettings.prototype, "enable", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], ScrollbarSettings.prototype, "pointsLength", void 0);
    __decorate([
        ej2_base_1.Complex({}, ScrollbarSettingsRange)
    ], ScrollbarSettings.prototype, "range", void 0);
    exports.ScrollbarSettings = ScrollbarSettings;
});
