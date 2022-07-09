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
    var AccumulationHighlight = (function (_super) {
        __extends(AccumulationHighlight, _super);
        function AccumulationHighlight(accumulation) {
            var _this = _super.call(this, accumulation) || this;
            _this.accumulation = accumulation;
            _this.renderer = accumulation.renderer;
            _this.wireEvents();
            return _this;
        }
        AccumulationHighlight.prototype.wireEvents = function () {
            if (this.accumulation.isDestroyed) {
                return;
            }
            this.accumulation.on(ej2_base_1.Browser.touchMoveEvent, this.mouseMove, this);
        };
        AccumulationHighlight.prototype.unWireEvents = function () {
            if (this.accumulation.isDestroyed) {
                return;
            }
            this.accumulation.off(ej2_base_1.Browser.touchMoveEvent, this.mouseMove);
        };
        AccumulationHighlight.prototype.declarePrivateVariables = function (accumulation) {
            this.styleId = accumulation.element.id + '_ej2_chart_highlight';
            this.unselected = accumulation.element.id + '_ej2_deselected';
            this.selectedDataIndexes = [];
            this.highlightDataIndexes = [];
        };
        AccumulationHighlight.prototype.invokeHighlight = function (accumulation) {
            this.declarePrivateVariables(accumulation);
            this.series = ej2_base_2.extend({}, accumulation.visibleSeries, null, true);
            this.seriesStyles();
            this.currentMode = accumulation.highlightMode;
        };
        AccumulationHighlight.prototype.getModuleName = function () {
            return 'AccumulationHighlight';
        };
        AccumulationHighlight.prototype.destroy = function () {
            this.unWireEvents();
        };
        return AccumulationHighlight;
    }(selection_1.AccumulationSelection));
    exports.AccumulationHighlight = AccumulationHighlight;
});
