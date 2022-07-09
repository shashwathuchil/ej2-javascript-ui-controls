define(["require", "exports", "../utils/helper", "../utils/helper", "@syncfusion/ej2-svg-base", "../utils/helper", "@syncfusion/ej2-base", "../model/constants", "@syncfusion/ej2-data"], function (require, exports, helper_1, helper_2, ej2_svg_base_1, helper_3, ej2_base_1, constants_1, ej2_data_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AnnotationBase = (function () {
        function AnnotationBase(control) {
            this.control = control;
        }
        AnnotationBase.prototype.render = function (annotation, index) {
            this.isChart = this.control.getModuleName() === 'chart';
            this.annotation = annotation;
            var childElement = helper_1.createTemplate(ej2_base_1.createElement('div', {
                id: this.control.element.id + '_Annotation_' + index,
                styles: 'position: absolute; z-index: 1'
            }), index, annotation.content, this.control);
            return childElement;
        };
        AnnotationBase.prototype.setAnnotationPixelValue = function (location) {
            var rect = this.annotation.region === 'Chart' ?
                new ej2_svg_base_1.Rect(0, 0, this.control.availableSize.width, this.control.availableSize.height) :
                this.isChart ?
                    this.control.chartAxisLayoutPanel.seriesClipRect :
                    this.control.series[0].accumulationBound;
            location.x = ((typeof this.annotation.x !== 'string') ?
                ((typeof this.annotation.x === 'number') ? this.annotation.x : 0) :
                helper_2.stringToNumber(this.annotation.x, rect.width)) + rect.x;
            location.y = ((typeof this.annotation.y === 'number') ? this.annotation.y :
                helper_2.stringToNumber(this.annotation.y, rect.height)) + rect.y;
            return true;
        };
        AnnotationBase.prototype.setAnnotationPointValue = function (location) {
            var symbolLocation = new helper_2.ChartLocation(0, 0);
            if (this.isChart) {
                var chart = this.control;
                var annotation = this.annotation;
                var xAxisName = annotation.xAxisName;
                var yAxisName = annotation.yAxisName;
                var isInverted = chart.requireInvertedAxis;
                var stockChart = this.control.stockChart;
                var xAxis = void 0;
                var yAxis = void 0;
                var xValue = void 0;
                for (var _i = 0, _a = chart.axisCollections; _i < _a.length; _i++) {
                    var axis = _a[_i];
                    if (xAxisName === axis.name || (xAxisName == null && axis.name === 'primaryXAxis')) {
                        xAxis = axis;
                        if (xAxis.valueType.indexOf('Category') > -1) {
                            var xAnnotation = xAxis.valueType === 'DateTimeCategory' ? (annotation.x.getTime()).toString() :
                                annotation.x;
                            if (xAxis.labels.indexOf(xAnnotation) < 0) {
                                return false;
                            }
                            else {
                                xValue = xAxis.labels.indexOf(xAnnotation);
                            }
                        }
                        else if (xAxis.valueType === 'DateTime') {
                            var option = { skeleton: 'full', type: 'dateTime' };
                            xValue = (typeof this.annotation.x === 'object' || typeof new Date(this.annotation.x) === 'object') ?
                                Date.parse(chart.intl.getDateParser(option)(chart.intl.getDateFormat(option)(new Date(ej2_data_1.DataUtil.parse.parseJson({ val: annotation.x }).val)))) : 0;
                        }
                        else {
                            xValue = +annotation.x;
                        }
                    }
                    else if (yAxisName === axis.name || (yAxisName == null && axis.name === 'primaryYAxis')) {
                        yAxis = axis;
                    }
                }
                if (xAxis && yAxis && helper_2.withIn(xAxis.valueType === 'Logarithmic' ? helper_1.logBase(xValue, xAxis.logBase) : xValue, xAxis.visibleRange) && helper_2.withIn(yAxis.valueType === 'Logarithmic' ? helper_1.logBase(+annotation.y, yAxis.logBase) : +annotation.y, yAxis.visibleRange)) {
                    symbolLocation = helper_3.getPoint(xValue, +annotation.y, xAxis, yAxis, isInverted);
                    location.x = symbolLocation.x + (isInverted ? yAxis.rect.x : xAxis.rect.x);
                    location.y = symbolLocation.y + (isInverted ? xAxis.rect.y : yAxis.rect.y) +
                        ((stockChart && stockChart.enablePeriodSelector) ? stockChart.toolbarHeight + stockChart.titleSize.height : 0);
                }
                else {
                    return false;
                }
                return true;
            }
            else {
                return this.setAccumulationPointValue(location);
            }
        };
        AnnotationBase.prototype.processAnnotation = function (annotation, index, parentElement) {
            var chart = this.control;
            var location = new helper_2.ChartLocation(0, 0);
            var annotationElement = this.render(annotation, index);
            var annotationRendered = function () {
                annotationElement.style.transform = 'translate(-50%, -50%)';
            };
            annotationRendered.bind(location, this);
            if (this['setAnnotation' + annotation.coordinateUnits + 'Value'](location)) {
                this.setElementStyle(location, annotationElement, parentElement);
            }
            else if (this.control.redraw) {
                helper_1.removeElement(annotationElement.id);
            }
            ej2_base_1.updateBlazorTemplate((this.control.element.id + 'Annotation' + index).replace(/[^a-zA-Z0-9]/g, ''), 'ContentTemplate', chart.stockChart ? chart.stockChart.annotations[index] : this.control.annotations[index], undefined, annotationRendered);
        };
        AnnotationBase.prototype.setAccumulationPointValue = function (location) {
            var accumulation = this.control;
            var point;
            for (var _i = 0, _a = accumulation.visibleSeries[0].points; _i < _a.length; _i++) {
                var accPoint = _a[_i];
                if (typeof accPoint.x === 'object') {
                    if (Date.parse(accPoint.x) === Date.parse(this.annotation.x) &&
                        accPoint.y === this.annotation.y) {
                        point = accPoint;
                        break;
                    }
                }
                else {
                    if (accPoint.x == this.annotation.x && accPoint.y == this.annotation.y) {
                        point = accPoint;
                        break;
                    }
                }
            }
            if (point && point.visible) {
                location.x = point.symbolLocation.x;
                location.y = point.symbolLocation.y;
                return true;
            }
            else {
                return false;
            }
        };
        AnnotationBase.prototype.setElementStyle = function (location, element, parentElement) {
            var elementRect = helper_1.measureElementRect(element, this.control.redraw);
            var argsData = {
                cancel: false, name: constants_1.annotationRender, content: element,
                location: location
            };
            this.control.trigger(constants_1.annotationRender, argsData);
            if (!argsData.cancel) {
                argsData.content.style.left = this.setAlignmentValue(this.annotation.horizontalAlignment, elementRect.width, argsData.location.x) + 'px';
                argsData.content.style.top = this.setAlignmentValue(this.annotation.verticalAlignment, elementRect.height, argsData.location.y) + 'px';
                argsData.content.setAttribute('aria-label', this.annotation.description || 'Annotation');
                helper_2.appendElement(argsData.content, parentElement, this.control.redraw, true, 'left', 'top');
            }
        };
        AnnotationBase.prototype.setAlignmentValue = function (alignment, size, value) {
            switch (alignment) {
                case 'Top':
                case 'Near':
                    value -= size;
                    break;
                case 'Bottom':
                case 'Far':
                    value += 0;
                    break;
                case 'Middle':
                case 'Center':
                    value -= (size / 2);
                    break;
            }
            return value;
        };
        return AnnotationBase;
    }());
    exports.AnnotationBase = AnnotationBase;
});
