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
    var BarSeries = (function (_super) {
        __extends(BarSeries, _super);
        function BarSeries() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BarSeries.prototype.render = function (series) {
            var origin = Math.max(series.yAxis.visibleRange.min, 0);
            var sideBySideInfo = this.getSideBySideInfo(series);
            var rect;
            var argsData;
            for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
                var pointBar = _a[_i];
                pointBar.symbolLocations = [];
                pointBar.regions = [];
                if (pointBar.visible && helper_1.withInRange(series.points[pointBar.index - 1], pointBar, series.points[pointBar.index + 1], series)) {
                    rect = this.getRectangle(pointBar.xValue + sideBySideInfo.start, pointBar.yValue, pointBar.xValue + sideBySideInfo.end, origin, series);
                    rect.height = series.columnWidthInPixel ? series.columnWidthInPixel : rect.height;
                    rect.y = series.columnWidthInPixel ? rect.y - (((series.columnWidthInPixel / 2) * series.rectCount) -
                        (series.columnWidthInPixel * series.index)) : rect.y;
                    argsData = this.triggerEvent(series, pointBar, series.interior, { width: series.border.width, color: series.border.color });
                    if (!argsData.cancel) {
                        this.updateSymbolLocation(pointBar, rect, series);
                        this.drawRectangle(series, pointBar, rect, argsData);
                    }
                }
            }
            this.renderMarker(series);
        };
        BarSeries.prototype.doAnimation = function (series) {
            this.animate(series);
        };
        BarSeries.prototype.destroy = function () {
        };
        BarSeries.prototype.getModuleName = function () {
            return 'BarSeries';
        };
        return BarSeries;
    }(column_base_1.ColumnBase));
    exports.BarSeries = BarSeries;
});
