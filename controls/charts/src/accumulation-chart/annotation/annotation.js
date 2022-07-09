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
    var AccumulationAnnotation = (function (_super) {
        __extends(AccumulationAnnotation, _super);
        function AccumulationAnnotation(control) {
            var _this = _super.call(this, control) || this;
            _this.pie = control;
            return _this;
        }
        AccumulationAnnotation.prototype.renderAnnotations = function (element) {
            var _this = this;
            this.annotations = this.pie.annotations;
            var redraw = this.pie.redraw;
            this.parentElement = (helper_1.redrawElement(redraw, this.pie.element.id + '_Annotation_Collections') ||
                ej2_base_1.createElement('div', {
                    id: this.pie.element.id + '_Annotation_Collections'
                }));
            this.annotations.map(function (annotation, index) {
                _this.processAnnotation(annotation, index, _this.parentElement);
            });
            helper_1.appendElement(this.parentElement, element, redraw);
        };
        AccumulationAnnotation.prototype.getModuleName = function () {
            return 'Annotation';
        };
        AccumulationAnnotation.prototype.destroy = function () {
        };
        return AccumulationAnnotation;
    }(annotation_1.AnnotationBase));
    exports.AccumulationAnnotation = AccumulationAnnotation;
});
