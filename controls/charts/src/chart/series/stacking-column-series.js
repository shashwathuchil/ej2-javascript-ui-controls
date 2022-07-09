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
    var StackingColumnSeries = (function (_super) {
        __extends(StackingColumnSeries, _super);
        function StackingColumnSeries() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StackingColumnSeries.prototype.render = function (series) {
            series.isRectSeries = true;
            var sideBySideInfo = this.getSideBySideInfo(series);
            var rect;
            var argsData;
            var stackedValue = series.stackedValues;
            var visiblePoints = helper_1.getVisiblePoints(series);
            for (var _i = 0, visiblePoints_1 = visiblePoints; _i < visiblePoints_1.length; _i++) {
                var point = visiblePoints_1[_i];
                point.symbolLocations = [];
                point.regions = [];
                if (point.visible && helper_1.withInRange(visiblePoints[point.index - 1], point, visiblePoints[point.index + 1], series)) {
                    rect = this.getRectangle(point.xValue + sideBySideInfo.start, stackedValue.endValues[point.index], point.xValue + sideBySideInfo.end, stackedValue.startValues[point.index], series);
                    rect.width = series.columnWidthInPixel ? series.columnWidthInPixel : rect.width;
                    rect.x = series.columnWidthInPixel ? rect.x - (series.columnWidthInPixel / 2) : rect.x;
                    argsData = this.triggerEvent(series, point, series.interior, { width: series.border.width, color: series.border.color });
                    if (!argsData.cancel) {
                        this.drawRectangle(series, point, rect, argsData);
                        this.updateSymbolLocation(point, rect, series);
                    }
                }
            }
            this.renderMarker(series);
        };
        StackingColumnSeries.prototype.doAnimation = function (series) {
            this.animate(series);
        };
        StackingColumnSeries.prototype.destroy = function () {
        };
        StackingColumnSeries.prototype.getModuleName = function () {
            return 'StackingColumnSeries';
        };
        return StackingColumnSeries;
    }(column_base_1.ColumnBase));
    exports.StackingColumnSeries = StackingColumnSeries;
});
