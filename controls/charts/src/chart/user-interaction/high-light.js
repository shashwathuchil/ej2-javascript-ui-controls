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
define(["require", "exports", "@syncfusion/ej2-base", "@syncfusion/ej2-base", "./selection"], function (require, exports, ej2_base_1, ej2_base_2, selection_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Highlight = (function (_super) {
        __extends(Highlight, _super);
        function Highlight(chart) {
            var _this = _super.call(this, chart) || this;
            _this.chart = chart;
            _this.renderer = chart.renderer;
            _this.wireEvents();
            return _this;
        }
        Highlight.prototype.wireEvents = function () {
            if (this.chart.isDestroyed || (this.chart.stockChart && this.chart.stockChart.onPanning)) {
                return;
            }
            this.chart.on(ej2_base_1.Browser.touchMoveEvent, this.mouseMove, this);
        };
        Highlight.prototype.unWireEvents = function () {
            if (this.chart.isDestroyed) {
                return;
            }
            this.chart.off(ej2_base_1.Browser.touchMoveEvent, this.mouseMove);
        };
        Highlight.prototype.declarePrivateVariables = function (chart) {
            this.styleId = chart.element.id + '_ej2_chart_highlight';
            this.unselected = chart.element.id + '_ej2_deselected';
            this.selectedDataIndexes = [];
            this.highlightDataIndexes = [];
            this.isSeriesMode = chart.highlightMode === 'Series';
        };
        Highlight.prototype.invokeHighlight = function (chart) {
            this.declarePrivateVariables(chart);
            this.series = ej2_base_2.extend({}, chart.visibleSeries, null, true);
            this.seriesStyles();
            this.currentMode = chart.highlightMode;
        };
        Highlight.prototype.getModuleName = function () {
            return 'Highlight';
        };
        Highlight.prototype.destroy = function () {
            this.unWireEvents();
        };
        return Highlight;
    }(selection_1.Selection));
    exports.Highlight = Highlight;
});
