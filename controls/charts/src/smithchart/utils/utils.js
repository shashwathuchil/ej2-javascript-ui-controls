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
    var SmithchartFont = (function (_super) {
        __extends(SmithchartFont, _super);
        function SmithchartFont() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SmithchartFont;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property('Segoe UI')
    ], SmithchartFont.prototype, "fontFamily", void 0);
    __decorate([
        ej2_base_1.Property('Normal')
    ], SmithchartFont.prototype, "fontStyle", void 0);
    __decorate([
        ej2_base_1.Property('Regular')
    ], SmithchartFont.prototype, "fontWeight", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], SmithchartFont.prototype, "color", void 0);
    __decorate([
        ej2_base_1.Property('12px')
    ], SmithchartFont.prototype, "size", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], SmithchartFont.prototype, "opacity", void 0);
    exports.SmithchartFont = SmithchartFont;
    var SmithchartMargin = (function (_super) {
        __extends(SmithchartMargin, _super);
        function SmithchartMargin() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SmithchartMargin;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(10)
    ], SmithchartMargin.prototype, "top", void 0);
    __decorate([
        ej2_base_1.Property(10)
    ], SmithchartMargin.prototype, "bottom", void 0);
    __decorate([
        ej2_base_1.Property(10)
    ], SmithchartMargin.prototype, "right", void 0);
    __decorate([
        ej2_base_1.Property(10)
    ], SmithchartMargin.prototype, "left", void 0);
    exports.SmithchartMargin = SmithchartMargin;
    var SmithchartBorder = (function (_super) {
        __extends(SmithchartBorder, _super);
        function SmithchartBorder() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SmithchartBorder;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property(0)
    ], SmithchartBorder.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], SmithchartBorder.prototype, "opacity", void 0);
    __decorate([
        ej2_base_1.Property('transparent')
    ], SmithchartBorder.prototype, "color", void 0);
    exports.SmithchartBorder = SmithchartBorder;
    var SmithchartRect = (function () {
        function SmithchartRect(x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
        return SmithchartRect;
    }());
    exports.SmithchartRect = SmithchartRect;
    var LabelCollection = (function () {
        function LabelCollection() {
        }
        return LabelCollection;
    }());
    exports.LabelCollection = LabelCollection;
    var LegendSeries = (function () {
        function LegendSeries() {
        }
        return LegendSeries;
    }());
    exports.LegendSeries = LegendSeries;
    var LabelRegion = (function () {
        function LabelRegion() {
        }
        return LabelRegion;
    }());
    exports.LabelRegion = LabelRegion;
    var HorizontalLabelCollection = (function (_super) {
        __extends(HorizontalLabelCollection, _super);
        function HorizontalLabelCollection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return HorizontalLabelCollection;
    }(LabelCollection));
    exports.HorizontalLabelCollection = HorizontalLabelCollection;
    var RadialLabelCollections = (function (_super) {
        __extends(RadialLabelCollections, _super);
        function RadialLabelCollections() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return RadialLabelCollections;
    }(HorizontalLabelCollection));
    exports.RadialLabelCollections = RadialLabelCollections;
    var LineSegment = (function () {
        function LineSegment() {
        }
        return LineSegment;
    }());
    exports.LineSegment = LineSegment;
    var PointRegion = (function () {
        function PointRegion() {
        }
        return PointRegion;
    }());
    exports.PointRegion = PointRegion;
    var Point = (function () {
        function Point() {
        }
        return Point;
    }());
    exports.Point = Point;
    var ClosestPoint = (function () {
        function ClosestPoint() {
        }
        return ClosestPoint;
    }());
    exports.ClosestPoint = ClosestPoint;
    var MarkerOptions = (function () {
        function MarkerOptions(id, fill, borderColor, borderWidth, opacity) {
            this.id = id;
            this.fill = fill;
            this.borderColor = borderColor;
            this.borderWidth = borderWidth;
            this.opacity = opacity;
        }
        return MarkerOptions;
    }());
    exports.MarkerOptions = MarkerOptions;
    var SmithchartLabelPosition = (function () {
        function SmithchartLabelPosition() {
        }
        return SmithchartLabelPosition;
    }());
    exports.SmithchartLabelPosition = SmithchartLabelPosition;
    var Direction = (function () {
        function Direction() {
            this.counterclockwise = 0;
            this.clockwise = 1;
        }
        return Direction;
    }());
    exports.Direction = Direction;
    var DataLabelTextOptions = (function () {
        function DataLabelTextOptions() {
        }
        return DataLabelTextOptions;
    }());
    exports.DataLabelTextOptions = DataLabelTextOptions;
    var LabelOption = (function () {
        function LabelOption() {
        }
        return LabelOption;
    }());
    exports.LabelOption = LabelOption;
    var SmithchartSize = (function () {
        function SmithchartSize(width, height) {
            this.width = width;
            this.height = height;
        }
        return SmithchartSize;
    }());
    exports.SmithchartSize = SmithchartSize;
    var GridArcPoints = (function () {
        function GridArcPoints() {
        }
        return GridArcPoints;
    }());
    exports.GridArcPoints = GridArcPoints;
});
