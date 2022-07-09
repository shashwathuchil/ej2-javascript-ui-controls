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
define(["require", "exports", "../../common/utils/helper", "./column-base"], function (require, exports, helper_1, column_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StackingBarSeries = (function (_super) {
        __extends(StackingBarSeries, _super);
        function StackingBarSeries() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StackingBarSeries.prototype.render = function (series) {
            var sideBySideInfo = this.getSideBySideInfo(series);
            var stackedValue = series.stackedValues;
            var rect;
            var argsData;
            for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
                var pointStack = _a[_i];
                pointStack.symbolLocations = [];
                pointStack.regions = [];
                if (pointStack.visible &&
                    helper_1.withInRange(series.points[pointStack.index - 1], pointStack, series.points[pointStack.index + 1], series)) {
                    rect = this.getRectangle(pointStack.xValue + sideBySideInfo.start, stackedValue.endValues[pointStack.index], pointStack.xValue + sideBySideInfo.end, stackedValue.startValues[pointStack.index], series);
                    rect.height = series.columnWidthInPixel ? series.columnWidthInPixel : rect.height;
                    rect.y = series.columnWidthInPixel ? rect.y - (series.columnWidthInPixel / 2) : rect.y;
                    argsData = this.triggerEvent(series, pointStack, series.interior, { width: series.border.width, color: series.border.color });
                    if (!argsData.cancel) {
                        this.drawRectangle(series, pointStack, rect, argsData);
                        this.updateSymbolLocation(pointStack, rect, series);
                    }
                }
            }
            this.renderMarker(series);
        };
        StackingBarSeries.prototype.destroy = function () {
        };
        StackingBarSeries.prototype.getModuleName = function () {
            return 'StackingBarSeries';
        };
        StackingBarSeries.prototype.doAnimation = function (series) {
            this.animate(series);
        };
        return StackingBarSeries;
    }(column_base_1.ColumnBase));
    exports.StackingBarSeries = StackingBarSeries;
});
