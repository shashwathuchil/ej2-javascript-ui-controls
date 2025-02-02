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
define(["require", "exports", "../../common/utils/helper", "./triangular-base"], function (require, exports, helper_1, triangular_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FunnelSeries = (function (_super) {
        __extends(FunnelSeries, _super);
        function FunnelSeries() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FunnelSeries.prototype.getSegmentData = function (point, series, chart) {
            var lineWidth;
            var topRadius;
            var bottomRadius;
            var endTop;
            var endBottom;
            var minRadius;
            var endMin;
            var bottomY;
            var area = series.triangleSize;
            var offset = 0;
            var extraSpace = (chart.initialClipRect.width - series.triangleSize.width) / 2;
            var emptySpaceAtLeft = extraSpace + chart.initialClipRect.x;
            var seriesTop = chart.initialClipRect.y + (chart.initialClipRect.height - area.height) / 2;
            var top = point.yRatio * area.height;
            var bottom = top + point.heightRatio * area.height;
            var neckSize = series.neckSize;
            lineWidth = neckSize.width + (area.width - neckSize.width) * ((area.height - neckSize.height - top) /
                (area.height - neckSize.height));
            topRadius = (area.width / 2) - lineWidth / 2;
            endTop = topRadius + lineWidth;
            if (bottom > area.height - neckSize.height || area.height === neckSize.height) {
                lineWidth = neckSize.width;
            }
            else {
                lineWidth = neckSize.width + (area.width - neckSize.width) *
                    ((area.height - neckSize.height - bottom) / (area.height - neckSize.height));
            }
            bottomRadius = (area.width / 2) - (lineWidth / 2);
            endBottom = bottomRadius + lineWidth;
            if (top >= area.height - neckSize.height) {
                topRadius = bottomRadius = minRadius = (area.width / 2) - neckSize.width / 2;
                endTop = endBottom = endMin = (area.width / 2) + neckSize.width / 2;
            }
            else if (bottom > (area.height - neckSize.height)) {
                minRadius = bottomRadius = (area.width / 2) - lineWidth / 2;
                endMin = endBottom = minRadius + lineWidth;
                bottomY = area.height - neckSize.height;
            }
            top += seriesTop;
            bottom += seriesTop;
            bottomY += seriesTop;
            var line1 = { x: emptySpaceAtLeft + offset + topRadius, y: top };
            var line2 = { x: emptySpaceAtLeft + offset + endTop, y: top };
            var line4 = { x: emptySpaceAtLeft + offset + endBottom, y: bottom };
            var line5 = { x: emptySpaceAtLeft + offset + bottomRadius, y: bottom };
            var line3 = { x: emptySpaceAtLeft + offset + endBottom, y: bottom };
            var line6 = { x: emptySpaceAtLeft + offset + bottomRadius, y: bottom };
            if (bottomY) {
                line3 = { x: emptySpaceAtLeft + offset + endMin, y: bottomY };
                line6 = { x: emptySpaceAtLeft + offset + minRadius, y: bottomY };
            }
            var polygon = [line1, line2, line3, line4, line5, line6];
            this.setLabelLocation(series, point, polygon);
            var direction = this.findPath(polygon);
            return direction;
        };
        FunnelSeries.prototype.renderPoint = function (point, series, chart, options, seriesGroup, redraw) {
            if (!point.visible) {
                helper_1.removeElement(options.id);
                return null;
            }
            var direction = this.getSegmentData(point, series, chart);
            point.midAngle = 0;
            options.d = direction;
            helper_1.appendChildElement(false, seriesGroup, chart.renderer.drawPath(options), redraw);
            if (point.isExplode) {
                chart.accBaseModule.explodePoints(point.index, chart, true);
            }
        };
        FunnelSeries.prototype.getModuleName = function () {
            return 'FunnelSeries';
        };
        FunnelSeries.prototype.destroy = function () {
        };
        return FunnelSeries;
    }(triangular_base_1.TriangularBase));
    exports.FunnelSeries = FunnelSeries;
});
