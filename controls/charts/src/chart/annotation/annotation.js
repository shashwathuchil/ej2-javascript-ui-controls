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
define(["require", "exports", "../../common/annotation/annotation", "../../common/utils/helper", "@syncfusion/ej2-base"], function (require, exports, annotation_1, helper_1, ej2_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ChartAnnotation = (function (_super) {
        __extends(ChartAnnotation, _super);
        function ChartAnnotation(control, annotations) {
            var _this = _super.call(this, control) || this;
            _this.chart = control;
            _this.annotations = annotations;
            return _this;
        }
        ChartAnnotation.prototype.renderAnnotations = function (element) {
            var _this = this;
            this.annotations = this.chart.annotations;
            this.parentElement = helper_1.redrawElement(this.chart.redraw, this.chart.element.id + '_Annotation_Collections') ||
                ej2_base_1.createElement('div', {
                    id: this.chart.element.id + '_Annotation_Collections'
                });
            this.annotations.map(function (annotation, index) {
                _this.processAnnotation(annotation, index, _this.parentElement);
            });
            helper_1.appendElement(this.parentElement, element, this.chart.redraw);
        };
        ChartAnnotation.prototype.destroy = function () {
        };
        ChartAnnotation.prototype.getModuleName = function () {
            return 'Annotation';
        };
        return ChartAnnotation;
    }(annotation_1.AnnotationBase));
    exports.ChartAnnotation = ChartAnnotation;
});
