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
define(["require", "exports", "@syncfusion/ej2-base", "../model/theme"], function (require, exports, ej2_base_1, theme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Connector = (function (_super) {
        __extends(Connector, _super);
        function Connector() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Connector;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property('Line')
    ], Connector.prototype, "type", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Connector.prototype, "color", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], Connector.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Connector.prototype, "length", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], Connector.prototype, "dashArray", void 0);
    exports.Connector = Connector;
    var Font = (function (_super) {
        __extends(Font, _super);
        function Font() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Font;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property('Normal')
    ], Font.prototype, "fontStyle", void 0);
    __decorate([
        ej2_base_1.Property('16px')
    ], Font.prototype, "size", void 0);
    __decorate([
        ej2_base_1.Property('Normal')
    ], Font.prototype, "fontWeight", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], Font.prototype, "color", void 0);
    __decorate([
        ej2_base_1.Property('Center')
    ], Font.prototype, "textAlignment", void 0);
    __decorate([
        ej2_base_1.Property('Segoe UI')
    ], Font.prototype, "fontFamily", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], Font.prototype, "opacity", void 0);
    __decorate([
        ej2_base_1.Property('Trim')
    ], Font.prototype, "textOverflow", void 0);
    exports.Font = Font;
    var Border = (function (_super) {
        __extends(Border, _super);
        function Border() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Border;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property('')
    ], Border.prototype, "color", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], Border.prototype, "width", void 0);
    exports.Border = Border;
    var Offset = (function (_super) {
        __extends(Offset, _super);
        function Offset() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Offset;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(0)
    ], Offset.prototype, "x", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], Offset.prototype, "y", void 0);
    exports.Offset = Offset;
    var ChartArea = (function (_super) {
        __extends(ChartArea, _super);
        function ChartArea() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ChartArea;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Complex({}, Border)
    ], ChartArea.prototype, "border", void 0);
    __decorate([
        ej2_base_1.Property('transparent')
    ], ChartArea.prototype, "background", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], ChartArea.prototype, "opacity", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], ChartArea.prototype, "backgroundImage", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], ChartArea.prototype, "width", void 0);
    exports.ChartArea = ChartArea;
    var Margin = (function (_super) {
        __extends(Margin, _super);
        function Margin() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Margin;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(10)
    ], Margin.prototype, "left", void 0);
    __decorate([
        ej2_base_1.Property(10)
    ], Margin.prototype, "right", void 0);
    __decorate([
        ej2_base_1.Property(10)
    ], Margin.prototype, "top", void 0);
    __decorate([
        ej2_base_1.Property(10)
    ], Margin.prototype, "bottom", void 0);
    exports.Margin = Margin;
    var ContainerPadding = (function (_super) {
        __extends(ContainerPadding, _super);
        function ContainerPadding() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ContainerPadding;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(0)
    ], ContainerPadding.prototype, "left", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], ContainerPadding.prototype, "right", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], ContainerPadding.prototype, "top", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], ContainerPadding.prototype, "bottom", void 0);
    exports.ContainerPadding = ContainerPadding;
    var Animation = (function (_super) {
        __extends(Animation, _super);
        function Animation() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Animation;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(true)
    ], Animation.prototype, "enable", void 0);
    __decorate([
        ej2_base_1.Property(1000)
    ], Animation.prototype, "duration", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], Animation.prototype, "delay", void 0);
    exports.Animation = Animation;
    var Indexes = (function (_super) {
        __extends(Indexes, _super);
        function Indexes() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Indexes;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(0)
    ], Indexes.prototype, "series", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], Indexes.prototype, "point", void 0);
    exports.Indexes = Indexes;
    var CornerRadius = (function (_super) {
        __extends(CornerRadius, _super);
        function CornerRadius() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CornerRadius;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(0)
    ], CornerRadius.prototype, "topLeft", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], CornerRadius.prototype, "topRight", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], CornerRadius.prototype, "bottomLeft", void 0);
    __decorate([
        ej2_base_1.Property(0)
    ], CornerRadius.prototype, "bottomRight", void 0);
    exports.CornerRadius = CornerRadius;
    var Index = (function () {
        function Index(seriesIndex, pointIndex) {
            this.series = seriesIndex;
            this.point = pointIndex;
        }
        return Index;
    }());
    exports.Index = Index;
    var EmptyPointSettings = (function (_super) {
        __extends(EmptyPointSettings, _super);
        function EmptyPointSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EmptyPointSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(null)
    ], EmptyPointSettings.prototype, "fill", void 0);
    __decorate([
        ej2_base_1.Complex({ color: 'transparent', width: 0 }, Border)
    ], EmptyPointSettings.prototype, "border", void 0);
    __decorate([
        ej2_base_1.Property('Gap')
    ], EmptyPointSettings.prototype, "mode", void 0);
    exports.EmptyPointSettings = EmptyPointSettings;
    var DragSettings = (function (_super) {
        __extends(DragSettings, _super);
        function DragSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return DragSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(false)
    ], DragSettings.prototype, "enable", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], DragSettings.prototype, "minY", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], DragSettings.prototype, "maxY", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], DragSettings.prototype, "fill", void 0);
    exports.DragSettings = DragSettings;
    var TooltipSettings = (function (_super) {
        __extends(TooltipSettings, _super);
        function TooltipSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return TooltipSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(false)
    ], TooltipSettings.prototype, "enable", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], TooltipSettings.prototype, "enableMarker", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], TooltipSettings.prototype, "shared", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], TooltipSettings.prototype, "fill", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], TooltipSettings.prototype, "header", void 0);
    __decorate([
        ej2_base_1.Property(0.75)
    ], TooltipSettings.prototype, "opacity", void 0);
    __decorate([
        ej2_base_1.Complex(theme_1.Theme.tooltipLabelFont, Font)
    ], TooltipSettings.prototype, "textStyle", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], TooltipSettings.prototype, "format", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], TooltipSettings.prototype, "template", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], TooltipSettings.prototype, "enableAnimation", void 0);
    __decorate([
        ej2_base_1.Property(300)
    ], TooltipSettings.prototype, "duration", void 0);
    __decorate([
        ej2_base_1.Property(1000)
    ], TooltipSettings.prototype, "fadeOutDuration", void 0);
    __decorate([
        ej2_base_1.Property('Move')
    ], TooltipSettings.prototype, "fadeOutMode", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], TooltipSettings.prototype, "enableTextWrap", void 0);
    __decorate([
        ej2_base_1.Complex({ color: '#cccccc', width: 0.5 }, Border)
    ], TooltipSettings.prototype, "border", void 0);
    exports.TooltipSettings = TooltipSettings;
    var Periods = (function (_super) {
        __extends(Periods, _super);
        function Periods() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Periods;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property('Years')
    ], Periods.prototype, "intervalType", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], Periods.prototype, "interval", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Periods.prototype, "text", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], Periods.prototype, "selected", void 0);
    exports.Periods = Periods;
    var PeriodSelectorSettings = (function (_super) {
        __extends(PeriodSelectorSettings, _super);
        function PeriodSelectorSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return PeriodSelectorSettings;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(43)
    ], PeriodSelectorSettings.prototype, "height", void 0);
    __decorate([
        ej2_base_1.Property('Bottom')
    ], PeriodSelectorSettings.prototype, "position", void 0);
    __decorate([
        ej2_base_1.Collection([], Periods)
    ], PeriodSelectorSettings.prototype, "periods", void 0);
    exports.PeriodSelectorSettings = PeriodSelectorSettings;
});
