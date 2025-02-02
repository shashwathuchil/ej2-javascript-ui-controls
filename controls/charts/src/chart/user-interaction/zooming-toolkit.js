define(["require", "exports", "@syncfusion/ej2-base", "@syncfusion/ej2-base", "../../common/utils/helper", "../../common/utils/helper", "@syncfusion/ej2-svg-base", "../../common/model/constants"], function (require, exports, ej2_base_1, ej2_base_2, helper_1, helper_2, ej2_svg_base_1, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Toolkit = (function () {
        function Toolkit(chart) {
            this.iconRectOverFill = 'transparent';
            this.iconRectSelectionFill = 'transparent';
            this.zoomCompleteEvtCollection = [];
            this.chart = chart;
            this.elementId = chart.element.id;
            this.chart.svgRenderer = new ej2_svg_base_1.SvgRenderer(this.elementId);
            this.selectionColor = chart.theme === 'Bootstrap4' ? '#FFFFFF' :
                (chart.theme === 'Tailwind' || chart.theme === 'Bootstrap5' || chart.theme === 'Bootstrap5Dark' || chart.theme === 'TailwindDark') ? '#374151' :
                    chart.theme === 'Fluent' ? '#201F1E' : chart.theme === 'FluentDark' ? '#A19F9D' : '#ff4081';
            this.fillColor = chart.theme === 'Bootstrap4' ? '#495057' :
                chart.theme === 'Tailwind' ? '#6B7280' : chart.theme === 'TailwindDark' ? '#D1D5DB' :
                    chart.theme === 'Fluent' ? '#A19F9D' : chart.theme === 'FluentDark' ? '#484644' : '#737373';
            this.iconRectOverFill = chart.theme === 'Bootstrap4' ? '#5A6268' : this.iconRectOverFill;
            this.iconRectSelectionFill = chart.theme === 'Bootstrap4' ? '#5B6269' : this.iconRectSelectionFill;
            this.iconRect = chart.theme === 'Bootstrap4' ? new ej2_svg_base_1.Rect(-5, -5, 26, 26) : new ej2_svg_base_1.Rect(0, 0, 16, 16);
        }
        Toolkit.prototype.createPanButton = function (childElement, parentElement) {
            var render = this.chart.svgRenderer;
            var fillColor = this.chart.zoomModule.isPanning ? this.selectionColor : this.fillColor;
            var direction = 'M5,3h2.3L7.275,5.875h1.4L8.65,3H11L8,0L5,3z M3,11V8.7l2.875,0.025v-1.4L3,7.35V5L0,8L3,';
            direction += '11z M11,13H8.7l0.025-2.875h-1.4L7.35,13H5l3,3L11,13z M13,5v2.3l-2.875-0.025v1.4L13,8.65V11l3-3L13,5z';
            childElement.id = this.elementId + '_Zooming_Pan';
            childElement.setAttribute('aria-label', this.chart.getLocalizedLabel('Pan'));
            this.panElements = childElement;
            childElement.appendChild(render.drawRectangle(new helper_1.RectOption(this.elementId + '_Zooming_Pan_1', 'transparent', {}, 1, this.iconRect)));
            childElement.appendChild(render.drawPath(new ej2_svg_base_1.PathOption(this.elementId + '_Zooming_Pan_2', fillColor, null, null, 1, null, direction)));
            parentElement.appendChild(childElement);
            this.wireEvents(childElement, this.pan);
        };
        Toolkit.prototype.createZoomButton = function (childElement, parentElement) {
            var render = this.chart.svgRenderer;
            var fillColor = this.chart.zoomModule.isPanning ? this.fillColor : this.selectionColor;
            var rectColor = this.chart.zoomModule.isPanning ? 'transparent' : this.iconRectSelectionFill;
            var direction = 'M0.001,14.629L1.372,16l4.571-4.571v-0.685l0.228-0.274c1.051,0.868,2.423,1.417,3.885,1.417c3.291,0,';
            direction += '5.943-2.651,5.943-5.943S13.395,0,10.103,0S4.16,2.651,4.16,5.943c0,1.508,0.503,2.834,1.417,3.885l-0.274,0.228H4.571';
            direction = direction + 'L0.001,14.629L0.001,14.629z M5.943,5.943c0-2.285,1.828-4.114,4.114-4.114s4.114,1.828,4.114,';
            childElement.id = this.elementId + '_Zooming_Zoom';
            childElement.setAttribute('aria-label', this.chart.getLocalizedLabel('Zoom'));
            this.zoomElements = childElement;
            this.selectedID = this.chart.zoomModule.isPanning ? this.chart.element.id + '_Zooming_Pan_1' : this.elementId + '_Zooming_Zoom_1';
            childElement.appendChild(render.drawRectangle(new helper_1.RectOption(this.elementId + '_Zooming_Zoom_1', rectColor, {}, 1, this.iconRect)));
            childElement.appendChild(render.drawPath(new ej2_svg_base_1.PathOption(this.elementId + '_Zooming_Zoom_3', fillColor, null, null, 1, null, direction + '4.114s-1.828,4.114-4.114,4.114S5.943,8.229,5.943,5.943z')));
            parentElement.appendChild(childElement);
            this.wireEvents(childElement, this.zoom);
        };
        Toolkit.prototype.createZoomInButton = function (childElement, parentElement, chart) {
            var render = this.chart.svgRenderer;
            var fillColor = this.fillColor;
            var direction = 'M10.103,0C6.812,0,4.16,2.651,4.16,5.943c0,1.509,0.503,2.834,1.417,3.885l-0.274,0.229H4.571L0,';
            direction += '14.628l0,0L1.372,16l4.571-4.572v-0.685l0.228-0.275c1.052,0.868,2.423,1.417,3.885,1.417c3.291,0,5.943-2.651,';
            direction += '5.943-5.943C16,2.651,13.395,0,10.103,0z M10.058,10.058c-2.286,0-4.114-1.828-4.114-4.114c0-2.286,1.828-4.114,';
            childElement.id = this.elementId + '_Zooming_ZoomIn';
            childElement.setAttribute('aria-label', this.chart.getLocalizedLabel('ZoomIn'));
            var polygonDirection = '12.749,5.466 10.749,5.466 10.749,3.466 9.749,3.466 9.749,5.466 7.749,5.466 7.749,6.466';
            childElement.appendChild(render.drawRectangle(new helper_1.RectOption(this.elementId + '_Zooming_ZoomIn_1', 'transparent', {}, 1, this.iconRect)));
            childElement.appendChild(render.drawPath(new ej2_svg_base_1.PathOption(this.elementId + '_Zooming_ZoomIn_2', fillColor, null, null, 1, null, direction + '4.114-4.114c2.286,0,4.114,1.828,4.114,4.114C14.172,8.229,12.344,10.058,10.058,10.058z')));
            childElement.appendChild(render.drawPolygon(new helper_1.PolygonOption(this.elementId + '_Zooming_ZoomIn_3', polygonDirection + ' 9.749,6.466 9.749,8.466 10.749,8.466 10.749,6.466 12.749,6.466', fillColor)));
            this.zoomInElements = childElement;
            this.elementOpacity = chart.zoomModule.isPanning ? '0.2' : '1';
            childElement.setAttribute('opacity', this.elementOpacity);
            parentElement.appendChild(childElement);
            this.wireEvents(childElement, this.zoomIn);
        };
        Toolkit.prototype.createZoomOutButton = function (childElement, parentElement, chart) {
            var render = this.chart.svgRenderer;
            var fillColor = this.fillColor;
            var direction = 'M0,14.622L1.378,16l4.533-4.533v-0.711l0.266-0.266c1.022,0.889,2.4,1.422,3.866,';
            direction += '1.422c3.289,0,5.955-2.666,5.955-5.955S13.333,0,10.044,0S4.089,2.667,4.134,5.911c0,1.466,0.533,2.844,';
            direction += '1.422,3.866l-0.266,0.266H4.578L0,14.622L0,14.622z M5.911,5.911c0-2.311,1.822-4.133,4.133-4.133s4.133,1.822,4.133,';
            childElement.id = this.elementId + '_Zooming_ZoomOut';
            childElement.setAttribute('aria-label', this.chart.getLocalizedLabel('ZoomOut'));
            childElement.appendChild(render.drawRectangle(new helper_1.RectOption(this.elementId + '_Zooming_ZoomOut_1', 'transparent', {}, 1, this.iconRect)));
            childElement.appendChild(render.drawPath(new ej2_svg_base_1.PathOption(this.elementId + '_Zooming_ZoomOut_2', fillColor, null, null, 1, null, direction + '4.133s-1.866,4.133-4.133,4.133S5.911,8.222,5.911,5.911z M12.567,6.466h-5v-1h5V6.466z')));
            this.zoomOutElements = childElement;
            this.elementOpacity = chart.zoomModule.isPanning ? '0.2' : '1';
            childElement.setAttribute('opacity', this.elementOpacity);
            parentElement.appendChild(childElement);
            this.wireEvents(childElement, this.zoomOut);
        };
        Toolkit.prototype.createResetButton = function (childElement, parentElement, chart, isDevice) {
            var render = this.chart.svgRenderer;
            var fillColor = this.fillColor;
            var size;
            var direction = 'M12.364,8h-2.182l2.909,3.25L16,8h-2.182c0-3.575-2.618-6.5-5.818-6.5c-1.128,0-2.218,0.366-3.091,';
            direction += '1.016l1.055,1.178C6.581,3.328,7.272,3.125,8,3.125C10.4,3.125,12.363,5.319,12.364,8L12.364,8z M11.091,';
            direction += '13.484l-1.055-1.178C9.419,12.672,8.728,12.875,8,12.875c-2.4,0-4.364-2.194-4.364-4.875h2.182L2.909,4.75L0,8h2.182c0,';
            childElement.id = this.elementId + '_Zooming_Reset';
            childElement.setAttribute('aria-label', this.chart.getLocalizedLabel('Reset'));
            if (!isDevice) {
                childElement.appendChild(render.drawRectangle(new helper_1.RectOption(this.elementId + '_Zooming_Reset_1', 'transparent', {}, 1, this.iconRect)));
                childElement.appendChild(render.drawPath(new ej2_svg_base_1.PathOption(this.elementId + '_Zooming_Reset_2', fillColor, null, null, 1, null, direction + '3.575,2.618,6.5,5.818,6.5C9.128,14.5,10.219,14.134,11.091,13.484L11.091,13.484z')));
            }
            else {
                size = ej2_svg_base_1.measureText(this.chart.getLocalizedLabel('ResetZoom'), { size: '12px' });
                childElement.appendChild(render.drawRectangle(new helper_1.RectOption(this.elementId + '_Zooming_Reset_1', 'transparent', {}, 1, new ej2_svg_base_1.Rect(0, 0, size.width, size.height))));
                helper_2.textElement(chart.renderer, new ej2_svg_base_1.TextOption(this.elementId + '_Zooming_Reset_2', 0 + size.width / 2, 0 + size.height * 3 / 4, 'middle', this.chart.getLocalizedLabel('ResetZoom'), 'rotate(0,' + (0) + ',' + (0) + ')', 'auto'), { size: '12px' }, 'black', childElement, null, null, null, null, null, null, null, null, chart.enableCanvas);
            }
            parentElement.appendChild(childElement);
            this.wireEvents(childElement, this.reset);
        };
        Toolkit.prototype.wireEvents = function (element, process) {
            ej2_base_1.EventHandler.add(element, 'mousedown touchstart', process, this);
            ej2_base_1.EventHandler.add(element, 'mouseover', this.showTooltip, this);
            ej2_base_1.EventHandler.add(element, 'mouseout', this.removeTooltip, this);
        };
        Toolkit.prototype.showTooltip = function (event) {
            var text = event.currentTarget.id.split('_Zooming_')[1];
            var left = (event.pageX - (ej2_svg_base_1.measureText(text, { size: '10px' }).width + 5));
            var rect = helper_1.getElement(event.currentTarget.id + '_1');
            var icon2 = helper_1.getElement(event.currentTarget.id + '_2');
            var icon3 = helper_1.getElement(event.currentTarget.id + '_3');
            if (rect) {
                this.hoveredID = rect.id;
                rect.setAttribute('fill', this.iconRectOverFill);
            }
            if (icon2) {
                icon2.setAttribute('fill', this.selectionColor);
            }
            if (icon3) {
                icon3.setAttribute('fill', this.selectionColor);
            }
            if (!this.chart.isTouch) {
                helper_1.createTooltip('EJ2_Chart_ZoomTip', this.chart.getLocalizedLabel(text), (event.pageY + 10), left, '10px');
            }
        };
        Toolkit.prototype.removeTooltip = function () {
            if (helper_1.getElement(this.hoveredID)) {
                var rectColor = this.chart.zoomModule.isPanning ? (this.hoveredID.indexOf('_Pan_') > -1) ? this.iconRectSelectionFill : 'transparent' : (this.hoveredID.indexOf('_Zoom_') > -1) ? this.iconRectSelectionFill : 'transparent';
                helper_1.getElement(this.hoveredID).setAttribute('fill', rectColor);
            }
            var icon2 = this.hoveredID ? helper_1.getElement(this.hoveredID.replace('_1', '_2')) : null;
            var icon3 = this.hoveredID ? helper_1.getElement(this.hoveredID.replace('_1', '_3')) : null;
            if (icon2) {
                var iconColor = this.chart.zoomModule.isPanning ? (this.hoveredID.indexOf('_Pan_') > -1) ? this.selectionColor : this.fillColor : (this.hoveredID.indexOf('_Zoom_') > -1) ? this.selectionColor : this.fillColor;
                icon2.setAttribute('fill', iconColor);
            }
            if (icon3) {
                var iconColor = this.chart.zoomModule.isPanning ? this.fillColor : (this.hoveredID.indexOf('_Zoom_') > -1) ? this.selectionColor : this.fillColor;
                icon3.setAttribute('fill', iconColor);
            }
            helper_1.removeElement('EJ2_Chart_ZoomTip');
        };
        Toolkit.prototype.reset = function () {
            var _this = this;
            var chart = this.chart;
            if (!chart.zoomModule.isDevice) {
                ej2_base_2.remove(chart.zoomModule.toolkitElements);
            }
            var argsData;
            this.removeTooltip();
            chart.svgObject.setAttribute('cursor', 'auto');
            var zoomingEventArgs;
            var zoomedAxisCollection = [];
            this.zoomCompleteEvtCollection = [];
            for (var _i = 0, _a = chart.axisCollections; _i < _a.length; _i++) {
                var axis = _a[_i];
                argsData = {
                    cancel: false, name: constants_1.zoomComplete, axis: axis, previousZoomFactor: axis.zoomFactor,
                    previousZoomPosition: axis.zoomPosition, currentZoomFactor: 1, currentZoomPosition: 0,
                    previousVisibleRange: axis.visibleRange, currentVisibleRange: null
                };
                axis.zoomFactor = 1;
                axis.zoomPosition = 0;
                if (axis.zoomingScrollBar) {
                    axis.zoomingScrollBar.isScrollUI = false;
                }
                if (!argsData.cancel) {
                    axis.zoomFactor = argsData.currentZoomFactor;
                    axis.zoomPosition = argsData.currentZoomPosition;
                    this.zoomCompleteEvtCollection.push(argsData);
                }
                zoomedAxisCollection.push({
                    zoomFactor: axis.zoomFactor, zoomPosition: axis.zoomFactor, axisName: axis.name,
                    axisRange: axis.visibleRange
                });
            }
            zoomingEventArgs = { cancel: false, axisCollection: zoomedAxisCollection, name: constants_1.onZooming };
            if (!zoomingEventArgs.cancel && this.chart.isBlazor) {
                this.chart.trigger(constants_1.onZooming, zoomingEventArgs, function () {
                    _this.setDefferedZoom(chart);
                });
                return false;
            }
            else {
                return (this.setDefferedZoom(chart));
            }
        };
        Toolkit.prototype.setDefferedZoom = function (chart) {
            chart.disableTrackTooltip = false;
            chart.zoomModule.isZoomed = chart.zoomModule.isPanning = chart.isChartDrag = chart.delayRedraw = false;
            chart.zoomModule.touchMoveList = chart.zoomModule.touchStartList = [];
            chart.zoomModule.pinchTarget = null;
            chart.removeSvg();
            if (chart.enableAutoIntervalOnBothAxis) {
                chart.processData(false);
            }
            chart.refreshAxis();
            chart.refreshBound();
            this.elementOpacity = '1';
            return false;
        };
        Toolkit.prototype.zoomIn = function (e) {
            this.zoomInOutCalculation(1, this.chart, this.chart.axisCollections, this.chart.zoomSettings.mode);
            return false;
        };
        Toolkit.prototype.zoomOut = function (e) {
            this.zoomInOutCalculation(-1, this.chart, this.chart.axisCollections, this.chart.zoomSettings.mode);
            return false;
        };
        Toolkit.prototype.zoom = function (e) {
            this.chart.zoomModule.isPanning = false;
            var zoomModule = this.chart.zoomModule;
            this.elementOpacity = '1';
            this.chart.svgObject.setAttribute('cursor', 'auto');
            this.zoomInElements.setAttribute('opacity', this.elementOpacity);
            this.zoomOutElements.setAttribute('opacity', this.elementOpacity);
            this.applySelection(this.zoomElements.childNodes, this.selectionColor);
            this.applySelection(this.panElements.childNodes, '#737373');
            if (helper_1.getElement(this.selectedID)) {
                helper_1.getElement(this.selectedID).setAttribute('fill', 'transparent');
            }
            this.selectedID = this.chart.element.id + '_Zooming_Zoom_1';
            helper_1.getElement(this.selectedID).setAttribute('fill', this.iconRectSelectionFill);
            return false;
        };
        Toolkit.prototype.pan = function () {
            var element;
            this.chart.zoomModule.isPanning = true;
            this.chart.svgObject.setAttribute('cursor', 'pointer');
            this.elementOpacity = '0.2';
            element = this.zoomInElements ? this.zoomInElements.setAttribute('opacity', this.elementOpacity) : null;
            element = this.zoomOutElements ? this.zoomOutElements.setAttribute('opacity', this.elementOpacity) : null;
            element = this.panElements ? this.applySelection(this.panElements.childNodes, this.selectionColor) : null;
            element = this.zoomElements ? this.applySelection(this.zoomElements.childNodes, '#737373') : null;
            if (helper_1.getElement(this.selectedID)) {
                helper_1.getElement(this.selectedID).setAttribute('fill', 'transparent');
            }
            this.selectedID = this.chart.element.id + '_Zooming_Pan_1';
            helper_1.getElement(this.selectedID).setAttribute('fill', this.iconRectSelectionFill);
            return false;
        };
        Toolkit.prototype.zoomInOutCalculation = function (scale, chart, axes, mode) {
            if (!chart.zoomModule.isPanning && this.elementOpacity !== '0.2') {
                var zoomFactor = void 0;
                var zoomPosition = void 0;
                var cumulative = void 0;
                chart.disableTrackTooltip = true;
                chart.delayRedraw = true;
                var argsData = void 0;
                this.zoomCompleteEvtCollection = [];
                for (var _i = 0, _a = axes; _i < _a.length; _i++) {
                    var axis = _a[_i];
                    argsData = {
                        cancel: false, name: constants_1.zoomComplete, axis: axis, previousZoomFactor: axis.zoomFactor,
                        previousZoomPosition: axis.zoomPosition, currentZoomFactor: axis.zoomFactor, currentZoomPosition: axis.zoomPosition,
                        previousVisibleRange: axis.visibleRange, currentVisibleRange: null
                    };
                    if ((axis.orientation === 'Horizontal' && mode !== 'Y') ||
                        (axis.orientation === 'Vertical' && mode !== 'X')) {
                        cumulative = Math.max(Math.max(1 / helper_1.minMax(axis.zoomFactor, 0, 1), 1) + (0.25 * scale), 1);
                        zoomFactor = (cumulative === 1) ? 1 : helper_1.minMax(1 / cumulative, 0, 1);
                        zoomPosition = (cumulative === 1) ? 0 : axis.zoomPosition + ((axis.zoomFactor - zoomFactor) * 0.5);
                        if (axis.zoomPosition !== zoomPosition || axis.zoomFactor !== zoomFactor) {
                            zoomFactor = (zoomPosition + zoomFactor) > 1 ? (1 - zoomPosition) : zoomFactor;
                        }
                        argsData.currentZoomFactor = zoomFactor;
                        argsData.currentZoomPosition = zoomPosition;
                        if (!argsData.cancel) {
                            axis.zoomFactor = argsData.currentZoomFactor;
                            axis.zoomPosition = argsData.currentZoomPosition;
                            this.zoomCompleteEvtCollection.push(argsData);
                        }
                    }
                }
            }
        };
        Toolkit.prototype.applySelection = function (elements, color) {
            for (var i = 1, length_1 = elements.length; i < length_1; i++) {
                elements[i].setAttribute('fill', color);
            }
        };
        return Toolkit;
    }());
    exports.Toolkit = Toolkit;
});
