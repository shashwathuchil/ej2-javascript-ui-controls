define(["require", "exports", "@syncfusion/ej2-base", "../../common/utils/helper", "@syncfusion/ej2-svg-base", "./zooming-toolkit", "../../common/model/constants", "../../common/utils/helper"], function (require, exports, ej2_base_1, helper_1, ej2_svg_base_1, zooming_toolkit_1, constants_1, helper_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Zoom = (function () {
        function Zoom(chart) {
            this.zoomCompleteEvtCollection = [];
            this.chart = chart;
            this.isPointer = ej2_base_1.Browser.isPointer;
            this.browserName = ej2_base_1.Browser.info.name;
            this.wheelEvent = this.browserName === 'mozilla' ? (this.isPointer ? 'mousewheel' : 'DOMMouseScroll') : 'mousewheel';
            this.cancelEvent = this.isPointer ? 'pointerleave' : 'mouseleave';
            this.addEventListener();
            this.isDevice = ej2_base_1.Browser.isDevice;
            var zooming = chart.zoomSettings;
            this.toolkit = new zooming_toolkit_1.Toolkit(chart);
            this.zooming = zooming;
            this.elementId = chart.element.id;
            this.zoomingRect = new ej2_svg_base_1.Rect(0, 0, 0, 0);
            this.zoomAxes = [];
            this.zoomkitOpacity = 0.3;
            this.isIOS = ej2_base_1.Browser.isIos || ej2_base_1.Browser.isIos7;
            this.isZoomed = this.performedUI = this.zooming.enablePan && this.zooming.enableSelectionZooming;
            if (zooming.enableScrollbar) {
                chart.scrollElement = ej2_base_1.createElement('div', { id: chart.element.id + '_scrollElement' });
            }
        }
        Zoom.prototype.renderZooming = function (e, chart, isTouch) {
            this.calculateZoomAxesRange(chart);
            if (this.zooming.enableSelectionZooming && (!isTouch
                || (chart.isDoubleTap && this.touchStartList.length === 1)) && (!this.isPanning || chart.isDoubleTap)) {
                this.isPanning = this.isDevice ? true : this.isPanning;
                this.performedUI = true;
                this.drawZoomingRectangle(chart);
            }
            else if (this.isPanning && chart.isChartDrag) {
                if (!isTouch || (isTouch && this.touchStartList.length === 1)) {
                    this.pinchTarget = isTouch ? e.target : null;
                    this.doPan(chart, chart.axisCollections);
                }
            }
        };
        Zoom.prototype.drawZoomingRectangle = function (chart) {
            var areaBounds = chart.chartAxisLayoutPanel.seriesClipRect;
            var startLocation = new helper_1.ChartLocation(chart.previousMouseMoveX, chart.previousMouseMoveY);
            var endLocation = new helper_1.ChartLocation(chart.mouseX, chart.mouseY);
            var rect = this.zoomingRect = helper_1.getRectLocation(startLocation, endLocation, areaBounds);
            if (rect.width > 0 && rect.height > 0) {
                this.isZoomed = true;
                chart.disableTrackTooltip = true;
                chart.svgObject.setAttribute('cursor', 'crosshair');
                if (this.zooming.mode === 'X') {
                    rect.height = areaBounds.height;
                    rect.y = areaBounds.y;
                }
                else if (this.zooming.mode === 'Y') {
                    rect.width = areaBounds.width;
                    rect.x = areaBounds.x;
                }
                var svg = chart.enableCanvas ? document.getElementById(this.elementId + '_tooltip_svg') : chart.svgObject;
                svg.appendChild(chart.svgRenderer.drawRectangle(new helper_1.RectOption(this.elementId + '_ZoomArea', chart.themeStyle.selectionRectFill, { color: chart.themeStyle.selectionRectStroke, width: 1 }, 1, rect, 0, 0, '', '3')));
            }
        };
        Zoom.prototype.doPan = function (chart, axes, xDifference, yDifference) {
            var _this = this;
            if (xDifference === void 0) { xDifference = 0; }
            if (yDifference === void 0) { yDifference = 0; }
            if (chart.startMove && chart.crosshair.enable) {
                return null;
            }
            var currentScale;
            var offset;
            this.isZoomed = true;
            this.offset = !chart.delayRedraw ? chart.chartAxisLayoutPanel.seriesClipRect : this.offset;
            chart.delayRedraw = true;
            this.zoomCompleteEvtCollection = [];
            chart.disableTrackTooltip = true;
            var argsData;
            var zoomedAxisCollection = [];
            for (var _i = 0, _a = axes; _i < _a.length; _i++) {
                var axis = _a[_i];
                argsData = {
                    cancel: false, name: constants_1.zoomComplete, axis: axis, previousZoomFactor: axis.zoomFactor,
                    previousZoomPosition: axis.zoomPosition, currentZoomFactor: axis.zoomFactor,
                    currentZoomPosition: axis.zoomPosition, previousVisibleRange: axis.visibleRange,
                    currentVisibleRange: null
                };
                currentScale = Math.max(1 / helper_1.minMax(axis.zoomFactor, 0, 1), 1);
                if (axis.orientation === 'Horizontal') {
                    offset = (xDifference != 0 ? xDifference : (chart.previousMouseMoveX - chart.mouseX)) / axis.rect.width / currentScale;
                    argsData.currentZoomPosition = helper_1.minMax(axis.zoomPosition + offset, 0, (1 - axis.zoomFactor));
                }
                else {
                    offset = (yDifference != 0 ? yDifference : (chart.previousMouseMoveY - chart.mouseY)) / axis.rect.height / currentScale;
                    argsData.currentZoomPosition = helper_1.minMax(axis.zoomPosition - offset, 0, (1 - axis.zoomFactor));
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
            var zoomingEventArgs = { cancel: false, axisCollection: zoomedAxisCollection, name: constants_1.onZooming };
            if (!zoomingEventArgs.cancel && this.chart.isBlazor) {
                this.chart.trigger(constants_1.onZooming, zoomingEventArgs, function () {
                    _this.performDefferedZoom(chart);
                });
            }
            else {
                this.chart.trigger(constants_1.onZooming, zoomingEventArgs, function () {
                    _this.performDefferedZoom(chart);
                    _this.redrawOnZooming(chart, false);
                });
            }
        };
        Zoom.prototype.performDefferedZoom = function (chart) {
            var translateX;
            var translateY;
            if (this.zooming.enableDeferredZooming) {
                translateX = chart.mouseX - chart.mouseDownX;
                translateY = chart.mouseY - chart.mouseDownY;
                switch (this.zooming.mode) {
                    case 'X':
                        translateY = 0;
                        break;
                    case 'Y':
                        translateX = 0;
                        break;
                }
                this.setTransform(translateX, translateY, null, null, chart, false);
                this.refreshAxis(chart.chartAxisLayoutPanel, chart, chart.axisCollections);
                if (chart.enableCanvas) {
                    this.performZoomRedraw(chart);
                }
            }
            else {
                this.performZoomRedraw(chart);
            }
            chart.previousMouseMoveX = chart.mouseX;
            chart.previousMouseMoveY = chart.mouseY;
        };
        Zoom.prototype.performZoomRedraw = function (chart) {
            var rect = this.zoomingRect;
            chart.animateSeries = false;
            if (this.isZoomed) {
                if (rect.width > 0 && rect.height > 0) {
                    this.performedUI = true;
                    chart.svgObject.setAttribute('cursor', 'auto');
                    this.doZoom(chart, chart.axisCollections, chart.chartAxisLayoutPanel.seriesClipRect);
                    chart.isDoubleTap = false;
                }
                else if (chart.disableTrackTooltip) {
                    chart.disableTrackTooltip = false;
                    chart.delayRedraw = false;
                    chart.enableCanvas ? chart.createChartSvg() : chart.removeSvg();
                    chart.refreshAxis();
                    chart.refreshBound();
                }
            }
        };
        Zoom.prototype.refreshAxis = function (layout, chart, axes) {
            var mode = chart.zoomSettings.mode;
            layout.measureAxis(new ej2_svg_base_1.Rect(chart.initialClipRect.x, chart.initialClipRect.y, chart.initialClipRect.width, chart.initialClipRect.height));
            axes.map(function (axis, index) {
                if (axis.orientation === 'Horizontal' && mode !== 'Y') {
                    layout.drawXAxisLabels(axis, index, null, (axis.placeNextToAxisLine ? axis.updatedRect : axis.rect));
                }
                if (axis.orientation === 'Vertical' && mode !== 'X') {
                    layout.drawYAxisLabels(axis, index, null, (axis.placeNextToAxisLine ? axis.updatedRect : axis.rect));
                }
            });
        };
        Zoom.prototype.doZoom = function (chart, axes, bounds) {
            var _this = this;
            var zoomRect = this.zoomingRect;
            var mode = this.zooming.mode;
            var argsData;
            this.isPanning = chart.zoomSettings.enablePan || this.isPanning;
            var zoomedAxisCollections = [];
            this.zoomCompleteEvtCollection = [];
            for (var _i = 0, _a = axes; _i < _a.length; _i++) {
                var axis = _a[_i];
                argsData = {
                    cancel: false, name: constants_1.zoomComplete, axis: axis,
                    previousZoomFactor: axis.zoomFactor,
                    previousZoomPosition: axis.zoomPosition,
                    currentZoomFactor: axis.zoomFactor,
                    currentZoomPosition: axis.zoomPosition,
                    previousVisibleRange: axis.visibleRange, currentVisibleRange: null
                };
                if (axis.orientation === 'Horizontal') {
                    if (mode !== 'Y') {
                        argsData.currentZoomPosition += Math.abs((zoomRect.x - bounds.x) / (bounds.width)) * axis.zoomFactor;
                        argsData.currentZoomFactor *= (zoomRect.width / bounds.width);
                    }
                }
                else {
                    if (mode !== 'X') {
                        argsData.currentZoomPosition += (1 - Math.abs((zoomRect.height + (zoomRect.y - bounds.y)) / (bounds.height)))
                            * axis.zoomFactor;
                        argsData.currentZoomFactor *= (zoomRect.height / bounds.height);
                    }
                }
                if (parseFloat(argsData.currentZoomFactor.toFixed(3)) <= 0.001) {
                    argsData.currentZoomFactor = argsData.previousZoomFactor;
                    argsData.currentZoomPosition = argsData.previousZoomPosition;
                }
                if (!argsData.cancel) {
                    axis.zoomFactor = argsData.currentZoomFactor;
                    axis.zoomPosition = argsData.currentZoomPosition;
                    this.zoomCompleteEvtCollection.push(argsData);
                }
                zoomedAxisCollections.push({
                    zoomFactor: axis.zoomFactor, zoomPosition: axis.zoomFactor, axisName: axis.name,
                    axisRange: axis.visibleRange
                });
            }
            var onZoomingEventArg = { cancel: false, axisCollection: zoomedAxisCollections, name: constants_1.onZooming };
            if (!onZoomingEventArg.cancel && this.chart.isBlazor) {
                this.chart.trigger(constants_1.onZooming, onZoomingEventArg, function () {
                    _this.zoomingRect = new ej2_svg_base_1.Rect(0, 0, 0, 0);
                    _this.performZoomRedraw(chart);
                });
            }
            else {
                this.chart.trigger(constants_1.onZooming, onZoomingEventArg, function () {
                    _this.zoomingRect = new ej2_svg_base_1.Rect(0, 0, 0, 0);
                    _this.redrawOnZooming(chart);
                });
            }
        };
        Zoom.prototype.redrawOnZooming = function (chart, isRedraw, isMouseUp) {
            if (isRedraw === void 0) { isRedraw = true; }
            if (isMouseUp === void 0) { isMouseUp = false; }
            var zoomCompleteCollection = isMouseUp ? this.toolkit.zoomCompleteEvtCollection :
                this.zoomCompleteEvtCollection;
            if (isRedraw) {
                this.performZoomRedraw(chart);
            }
            var argsData;
            for (var i = 0; i < zoomCompleteCollection.length; i++) {
                if (!zoomCompleteCollection[i].cancel) {
                    argsData = {
                        cancel: false, name: constants_1.zoomComplete,
                        axis: chart.axisCollections[i],
                        previousZoomFactor: zoomCompleteCollection[i].previousZoomFactor,
                        previousZoomPosition: zoomCompleteCollection[i].previousZoomPosition,
                        currentZoomFactor: chart.axisCollections[i].zoomFactor,
                        currentZoomPosition: chart.axisCollections[i].zoomPosition,
                        currentVisibleRange: chart.axisCollections[i].visibleRange,
                        previousVisibleRange: zoomCompleteCollection[i].previousVisibleRange
                    };
                    chart.trigger(constants_1.zoomComplete, argsData);
                }
            }
        };
        Zoom.prototype.performMouseWheelZooming = function (e, mouseX, mouseY, chart, axes) {
            var _this = this;
            var direction = (this.browserName === 'mozilla' && !this.isPointer) ?
                -(e.detail) / 3 > 0 ? 1 : -1 : (e['wheelDelta'] > 0 ? 1 : -1);
            var mode = this.zooming.mode;
            var origin = 0.5;
            var cumulative;
            var zoomFactor;
            var zoomPosition;
            this.isZoomed = true;
            this.calculateZoomAxesRange(chart);
            chart.disableTrackTooltip = true;
            this.performedUI = true;
            this.isPanning = chart.zoomSettings.enablePan || this.isPanning;
            this.zoomCompleteEvtCollection = [];
            var argsData;
            var zoomedAxisCollection = [];
            for (var _i = 0, _a = axes; _i < _a.length; _i++) {
                var axis = _a[_i];
                argsData = {
                    cancel: false, name: constants_1.zoomComplete, axis: axis, previousZoomFactor: axis.zoomFactor,
                    previousZoomPosition: axis.zoomPosition,
                    currentZoomFactor: axis.zoomFactor,
                    currentZoomPosition: axis.zoomPosition, currentVisibleRange: null,
                    previousVisibleRange: axis.visibleRange
                };
                if ((axis.orientation === 'Vertical' && mode !== 'X') ||
                    (axis.orientation === 'Horizontal' && mode !== 'Y')) {
                    cumulative = Math.max(Math.max(1 / helper_1.minMax(axis.zoomFactor, 0, 1), 1) + (0.25 * direction), 1);
                    if (cumulative >= 1) {
                        origin = axis.orientation === 'Horizontal' ? mouseX / axis.rect.width : 1 - (mouseY / axis.rect.height);
                        origin = origin > 1 ? 1 : origin < 0 ? 0 : origin;
                        zoomFactor = (cumulative === 1) ? 1 : helper_1.minMax((direction > 0 ? 0.9 : 1.1) / cumulative, 0, 1);
                        zoomPosition = (cumulative === 1) ? 0 : axis.zoomPosition + ((axis.zoomFactor - zoomFactor) * origin);
                        if (axis.zoomPosition !== zoomPosition || axis.zoomFactor !== zoomFactor) {
                            zoomFactor = (zoomPosition + zoomFactor) > 1 ? (1 - zoomPosition) : zoomFactor;
                        }
                        argsData.currentZoomFactor = zoomFactor;
                        argsData.currentZoomPosition = zoomPosition;
                    }
                    if (!argsData.cancel) {
                        axis.zoomFactor = argsData.currentZoomFactor;
                        axis.zoomPosition = argsData.currentZoomPosition;
                        this.zoomCompleteEvtCollection.push(argsData);
                    }
                }
                zoomedAxisCollection.push({
                    zoomFactor: axis.zoomFactor, zoomPosition: axis.zoomFactor, axisName: axis.name,
                    axisRange: axis.visibleRange
                });
            }
            var onZoomingEventArgs = { cancel: false, axisCollection: zoomedAxisCollection, name: constants_1.onZooming };
            if (!onZoomingEventArgs.cancel && this.chart.isBlazor) {
                this.chart.trigger(constants_1.onZooming, onZoomingEventArgs, function () { _this.performZoomRedraw(chart); });
            }
            else {
                this.chart.trigger(constants_1.onZooming, onZoomingEventArgs, function () { _this.redrawOnZooming(chart); });
            }
        };
        Zoom.prototype.performPinchZooming = function (e, chart) {
            if ((this.zoomingRect.width > 0 && this.zoomingRect.height > 0) || (chart.startMove && chart.crosshair.enable)) {
                return false;
            }
            this.calculateZoomAxesRange(chart);
            this.isZoomed = true;
            this.isPanning = true;
            this.performedUI = true;
            this.offset = !chart.delayRedraw ? chart.chartAxisLayoutPanel.seriesClipRect : this.offset;
            chart.delayRedraw = true;
            chart.disableTrackTooltip = true;
            var elementOffset = chart.element.getBoundingClientRect();
            var touchDown = this.touchStartList;
            var touchMove = this.touchMoveList;
            var touch0StartX = touchDown[0].pageX - elementOffset.left;
            var touch0StartY = touchDown[0].pageY - elementOffset.top;
            var touch0EndX = touchMove[0].pageX - elementOffset.left;
            var touch0EndY = touchMove[0].pageY - elementOffset.top;
            var touch1StartX = touchDown[1].pageX - elementOffset.left;
            var touch1StartY = touchDown[1].pageY - elementOffset.top;
            var touch1EndX = touchMove[1].pageX - elementOffset.left;
            var touch1EndY = touchMove[1].pageY - elementOffset.top;
            var scaleX = Math.abs(touch0EndX - touch1EndX) / Math.abs(touch0StartX - touch1StartX);
            var scaleY = Math.abs(touch0EndY - touch1EndY) / Math.abs(touch0StartY - touch1StartY);
            var clipX = ((this.offset.x - touch0EndX) / scaleX) + touch0StartX;
            var clipY = ((this.offset.y - touch0EndY) / scaleY) + touch0StartY;
            var pinchRect = new ej2_svg_base_1.Rect(clipX, clipY, this.offset.width / scaleX, this.offset.height / scaleY);
            var translateXValue = (touch0EndX - (scaleX * touch0StartX));
            var translateYValue = (touch0EndY - (scaleY * touch0StartY));
            if (!isNaN(scaleX - scaleX) && !isNaN(scaleY - scaleY)) {
                switch (this.zooming.mode) {
                    case 'XY':
                        this.setTransform(translateXValue, translateYValue, scaleX, scaleY, chart, true);
                        break;
                    case 'X':
                        this.setTransform(translateXValue, 0, scaleX, 1, chart, true);
                        break;
                    case 'Y':
                        this.setTransform(0, translateYValue, 1, scaleY, chart, true);
                        break;
                }
            }
            this.calculatePinchZoomFactor(chart, pinchRect);
            this.refreshAxis(chart.chartAxisLayoutPanel, chart, chart.axisCollections);
            this.redrawOnZooming(chart, false);
            return true;
        };
        Zoom.prototype.calculatePinchZoomFactor = function (chart, pinchRect) {
            var mode = this.zooming.mode;
            var selectionMin;
            var selectionMax;
            var rangeMin;
            var rangeMax;
            var value;
            var axisTrans;
            var argsData;
            var currentZF;
            var currentZP;
            var zoomedAxisCollection = [];
            this.zoomCompleteEvtCollection = [];
            for (var index = 0; index < chart.axisCollections.length; index++) {
                var axis = chart.axisCollections[index];
                if ((axis.orientation === 'Horizontal' && mode !== 'Y') ||
                    (axis.orientation === 'Vertical' && mode !== 'X')) {
                    currentZF = axis.zoomFactor;
                    currentZP = axis.zoomPosition;
                    argsData = {
                        cancel: false, name: constants_1.zoomComplete, axis: axis, previousZoomFactor: axis.zoomFactor,
                        previousZoomPosition: axis.zoomPosition, currentZoomFactor: currentZF,
                        currentZoomPosition: currentZP, previousVisibleRange: axis.visibleRange,
                        currentVisibleRange: null
                    };
                    if (axis.orientation === 'Horizontal') {
                        value = pinchRect.x - this.offset.x;
                        axisTrans = axis.rect.width / this.zoomAxes[index].delta;
                        rangeMin = value / axisTrans + this.zoomAxes[index].min;
                        value = pinchRect.x + pinchRect.width - this.offset.x;
                        rangeMax = value / axisTrans + this.zoomAxes[index].min;
                    }
                    else {
                        value = pinchRect.y - this.offset.y;
                        axisTrans = axis.rect.height / this.zoomAxes[index].delta;
                        rangeMin = (value * -1 + axis.rect.height) / axisTrans + this.zoomAxes[index].min;
                        value = pinchRect.y + pinchRect.height - this.offset.y;
                        rangeMax = (value * -1 + axis.rect.height) / axisTrans + this.zoomAxes[index].min;
                    }
                    selectionMin = Math.min(rangeMin, rangeMax);
                    selectionMax = Math.max(rangeMin, rangeMax);
                    currentZP = (selectionMin - this.zoomAxes[index].actualMin) / this.zoomAxes[index].actualDelta;
                    currentZF = (selectionMax - selectionMin) / this.zoomAxes[index].actualDelta;
                    argsData.currentZoomPosition = currentZP < 0 ? 0 : currentZP;
                    argsData.currentZoomFactor = currentZF > 1 ? 1 : currentZF;
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
            }
            var onZoomingEventArgs = { cancel: false, axisCollection: zoomedAxisCollection, name: constants_1.onZooming };
            if (!onZoomingEventArgs.cancel) {
                this.chart.trigger(constants_1.onZooming, onZoomingEventArgs);
            }
        };
        Zoom.prototype.setTransform = function (transX, transY, scaleX, scaleY, chart, isPinch) {
            if (!chart.enableCanvas) {
                chart.seriesElements.setAttribute('clip-path', 'url(#' + this.elementId + '_ChartAreaClipRect_)');
            }
            if (chart.indicatorElements) {
                chart.indicatorElements.setAttribute('clip-path', 'url(#' + this.elementId + '_ChartAreaClipRect_)');
            }
            var translate;
            var xAxisLoc;
            var yAxisLoc;
            var element;
            if (transX !== null && transY !== null) {
                for (var _i = 0, _a = chart.visibleSeries; _i < _a.length; _i++) {
                    var value = _a[_i];
                    xAxisLoc = chart.requireInvertedAxis ? value.yAxis.rect.x : value.xAxis.rect.x;
                    yAxisLoc = chart.requireInvertedAxis ? value.xAxis.rect.y : value.yAxis.rect.y;
                    translate = 'translate(' + (transX + (isPinch ? (scaleX * xAxisLoc) : xAxisLoc)) +
                        ',' + (transY + (isPinch ? (scaleY * yAxisLoc) : yAxisLoc)) + ')';
                    translate = (scaleX || scaleY) ? translate + ' scale(' + scaleX + ' ' + scaleY + ')' : translate;
                    if (value.visible) {
                        if (value.category === 'Indicator') {
                            value.seriesElement.parentNode.setAttribute('transform', translate);
                        }
                        else {
                            if (!chart.enableCanvas) {
                                value.seriesElement.setAttribute('transform', translate);
                            }
                        }
                        element = helper_1.getElement(chart.element.id + '_Series_' + value.index + '_DataLabelCollections');
                        if (value.errorBarElement) {
                            value.errorBarElement.setAttribute('transform', translate);
                        }
                        if (value.symbolElement) {
                            value.symbolElement.setAttribute('transform', translate);
                        }
                        if (value.textElement) {
                            value.textElement.setAttribute('visibility', 'hidden');
                            value.shapeElement.setAttribute('visibility', 'hidden');
                        }
                        if (element) {
                            element.style.visibility = 'hidden';
                        }
                    }
                }
            }
        };
        Zoom.prototype.calculateZoomAxesRange = function (chart) {
            var range;
            var axisRange;
            for (var index = 0; index < chart.axisCollections.length; index++) {
                var axis = chart.axisCollections[index];
                axisRange = axis.visibleRange;
                if (this.zoomAxes[index]) {
                    if (!chart.delayRedraw) {
                        this.zoomAxes[index].min = axisRange.min;
                        this.zoomAxes[index].delta = axisRange.delta;
                    }
                }
                else {
                    range = {
                        actualMin: axis.actualRange.min,
                        actualDelta: axis.actualRange.delta,
                        min: axisRange.min,
                        delta: axisRange.delta
                    };
                    this.zoomAxes[index] = range;
                }
            }
        };
        Zoom.prototype.showZoomingToolkit = function (chart) {
            var toolboxItems = this.zooming.toolbarItems;
            var areaBounds = chart.chartAxisLayoutPanel.seriesClipRect;
            var spacing = 5;
            var render = chart.svgRenderer;
            var length = this.isDevice ? 1 : toolboxItems.length;
            var iconSize = this.isDevice ? ej2_svg_base_1.measureText('Reset Zoom', { size: '12px' }).width : 16;
            var height = this.isDevice ? ej2_svg_base_1.measureText('Reset Zoom', { size: '12px' }).height : 22;
            var width = (length * iconSize) + ((length + 1) * spacing) + ((length - 1) * spacing);
            var transX = areaBounds.x + areaBounds.width - width - spacing;
            var transY = (areaBounds.y + spacing);
            var xPosition = spacing;
            var toolkit = this.toolkit;
            var element;
            var shadowElement = '<filter id="chart_shadow" height="130%"><feGaussianBlur in="SourceAlpha" stdDeviation="5"/>';
            shadowElement += '<feOffset dx="-3" dy="4" result="offsetblur"/><feComponentTransfer><feFuncA type="linear" slope="1"/>';
            shadowElement += '</feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>';
            if (length === 0 || helper_1.getElement(this.elementId + '_Zooming_KitCollection')) {
                return false;
            }
            var defElement = render.createDefs();
            toolboxItems = this.isDevice ? ['Reset'] : toolboxItems;
            defElement.innerHTML = shadowElement;
            this.toolkitElements = render.createGroup({
                id: this.elementId + '_Zooming_KitCollection',
                transform: 'translate(' + transX + ',' + transY + ')'
            });
            this.toolkitElements.appendChild(defElement);
            var zoomFillColor = this.chart.theme === 'Tailwind' ? '#F3F4F6' : this.chart.theme === 'Fluent' ? '#F3F2F1' :
                (this.chart.theme === "FluentDark" ? "#252423" : '#fafafa');
            this.toolkitElements.appendChild(render.drawRectangle(new helper_1.RectOption(this.elementId + '_Zooming_Rect', zoomFillColor, { color: 'transparent', width: 1 }, 1, new ej2_svg_base_1.Rect(0, 0, width, (height + (spacing * 2))), 0, 0)));
            var outerElement = render.drawRectangle(new helper_1.RectOption(this.elementId + '_Zooming_Rect', zoomFillColor, { color: 'transparent', width: 1 }, 0.1, new ej2_svg_base_1.Rect(0, 0, width, (height + (spacing * 2))), 0, 0));
            if (this.chart.theme === 'Tailwind' || this.chart.theme === 'TailwindDark') {
                outerElement.setAttribute('box-shadow', '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)');
            }
            else {
                outerElement.setAttribute('filter', 'url(#chart_shadow)');
            }
            this.toolkitElements.appendChild(outerElement);
            var currentItem;
            var panIcon = false;
            for (var i = 1; i <= length; i++) {
                currentItem = toolboxItems[i - 1];
                element = render.createGroup({
                    transform: 'translate(' + xPosition + ',' + (this.isDevice ? spacing : (spacing + 3)) + ')'
                });
                switch (currentItem) {
                    case 'Pan':
                        toolkit.createPanButton(element, this.toolkitElements);
                        panIcon = true;
                        break;
                    case 'Zoom':
                        toolkit.createZoomButton(element, this.toolkitElements);
                        break;
                    case 'ZoomIn':
                        toolkit.createZoomInButton(element, this.toolkitElements, chart);
                        break;
                    case 'ZoomOut':
                        toolkit.createZoomOutButton(element, this.toolkitElements, chart);
                        break;
                    case 'Reset':
                        toolkit.createResetButton(element, this.toolkitElements, chart, this.isDevice);
                        break;
                }
                xPosition += iconSize + (spacing * 2);
            }
            this.toolkitElements.setAttribute('opacity', this.isDevice ? '1' : '' + this.zoomkitOpacity);
            this.toolkitElements.setAttribute('cursor', 'auto');
            if (chart.enableCanvas) {
                var zoomDiv = document.createElement('div');
                zoomDiv.id = chart.element.id + '_zoom';
                zoomDiv.style.cssText = 'position:absolute; z-index:1';
                var zoomheight = chart.availableSize.height / 2;
                var svg = chart.svgRenderer.createSvg({
                    id: chart.element.id + '_zoomkit_svg',
                    width: chart.availableSize.width,
                    height: zoomheight
                });
                svg.style.position = 'absolute';
                svg.appendChild(this.toolkitElements);
                zoomDiv.appendChild(svg);
                document.getElementById(this.elementId + '_Secondary_Element').appendChild(zoomDiv);
            }
            else {
                chart.svgObject.appendChild(this.toolkitElements);
            }
            if (!this.isDevice) {
                ej2_base_1.EventHandler.add(this.toolkitElements, 'mousemove touchstart', this.zoomToolkitMove, this);
                ej2_base_1.EventHandler.add(this.toolkitElements, 'mouseleave touchend', this.zoomToolkitLeave, this);
                if (this.isPanning && panIcon) {
                    toolkit.pan();
                }
            }
            return true;
        };
        Zoom.prototype.applyZoomToolkit = function (chart, axes) {
            var showToolkit = this.isAxisZoomed(axes);
            if (showToolkit) {
                this.showZoomingToolkit(chart);
                this.isZoomed = true;
            }
            else {
                this.toolkit.removeTooltip();
                this.isPanning = false;
                this.isZoomed = false;
                chart.isZoomed = false;
                chart.svgObject.setAttribute('cursor', 'auto');
            }
        };
        Zoom.prototype.isAxisZoomed = function (axes) {
            var showToolkit = false;
            for (var _i = 0, _a = axes; _i < _a.length; _i++) {
                var axis = _a[_i];
                showToolkit = (showToolkit || (axis.zoomFactor !== 1 || axis.zoomPosition !== 0));
            }
            return showToolkit;
        };
        Zoom.prototype.zoomToolkitMove = function () {
            var element = this.toolkitElements;
            this.zoomkitOpacity = 1;
            element.setAttribute('opacity', '' + this.zoomkitOpacity);
            return false;
        };
        Zoom.prototype.zoomToolkitLeave = function () {
            var element = this.toolkitElements;
            this.zoomkitOpacity = 0.3;
            element.setAttribute('opacity', '' + this.zoomkitOpacity);
            return false;
        };
        Zoom.prototype.addEventListener = function () {
            if (this.chart.isDestroyed) {
                return;
            }
            ej2_base_1.EventHandler.add(this.chart.element, this.wheelEvent, this.chartMouseWheel, this);
            this.chart.on(ej2_base_1.Browser.touchMoveEvent, this.mouseMoveHandler, this);
            this.chart.on(ej2_base_1.Browser.touchStartEvent, this.mouseDownHandler, this);
            this.chart.on(ej2_base_1.Browser.touchEndEvent, this.mouseUpHandler, this);
            this.chart.on(this.cancelEvent, this.mouseCancelHandler, this);
        };
        Zoom.prototype.removeEventListener = function () {
            if (this.chart.isDestroyed) {
                return;
            }
            ej2_base_1.EventHandler.remove(this.chart.element, this.wheelEvent, this.chartMouseWheel);
            this.chart.off(ej2_base_1.Browser.touchMoveEvent, this.mouseMoveHandler);
            this.chart.off(ej2_base_1.Browser.touchStartEvent, this.mouseDownHandler);
            this.chart.off(ej2_base_1.Browser.touchEndEvent, this.mouseUpHandler);
            this.chart.off(this.cancelEvent, this.mouseCancelHandler);
        };
        Zoom.prototype.chartMouseWheel = function (e) {
            var chart = this.chart;
            var offset = chart.element.getBoundingClientRect();
            var svgRect = helper_1.getElement(chart.svgId).getBoundingClientRect();
            var mouseX = (e.clientX - offset.left) - Math.max(svgRect.left - offset.left, 0);
            var mouseY = (e.clientY - offset.top) - Math.max(svgRect.top - offset.top, 0);
            if (this.zooming.enableMouseWheelZooming &&
                helper_2.withInBounds(mouseX, mouseY, chart.chartAxisLayoutPanel.seriesClipRect)) {
                e.preventDefault();
                this.performMouseWheelZooming(e, mouseX, mouseY, chart, chart.axisCollections);
            }
            return false;
        };
        Zoom.prototype.mouseMoveHandler = function (e) {
            var chart = this.chart;
            var touches = null;
            if (e.type === 'touchmove') {
                if (e.preventDefault && this.isIOS &&
                    (this.isPanning || (chart.isDoubleTap)
                        || (this.zooming.enablePinchZooming && this.touchStartList.length > 1))) {
                    e.preventDefault();
                }
                touches = e.touches;
            }
            if (chart.isChartDrag) {
                if (chart.isTouch) {
                    this.touchMoveList = this.addTouchPointer(this.touchMoveList, e, touches);
                    if (this.zooming.enablePinchZooming && this.touchMoveList.length > 1
                        && this.touchStartList.length > 1) {
                        this.performPinchZooming(e, chart);
                    }
                }
                this.renderZooming(e, chart, chart.isTouch);
            }
        };
        Zoom.prototype.mouseDownHandler = function (e) {
            var chart = this.chart;
            var touches = null;
            var target;
            if (e.type === 'touchstart') {
                touches = e.touches;
                target = e.target;
            }
            else {
                target = e.target;
            }
            if (target.id.indexOf(chart.element.id + '_Zooming_') === -1 &&
                helper_2.withInBounds(chart.previousMouseMoveX, chart.previousMouseMoveY, chart.chartAxisLayoutPanel.seriesClipRect)) {
                chart.isChartDrag = true;
            }
            if (chart.isTouch) {
                this.touchStartList = this.addTouchPointer(this.touchStartList, e, touches);
            }
        };
        Zoom.prototype.mouseUpHandler = function (e) {
            var chart = this.chart;
            var performZoomRedraw = e.target.id.indexOf(chart.element.id + '_ZoomOut_') === -1 ||
                e.target.id.indexOf(chart.element.id + '_ZoomIn_') === -1;
            if (chart.isChartDrag || performZoomRedraw) {
                this.redrawOnZooming(chart, true, true);
            }
            if (chart.isTouch) {
                if (chart.isDoubleTap && helper_2.withInBounds(chart.mouseX, chart.mouseY, chart.chartAxisLayoutPanel.seriesClipRect)
                    && this.touchStartList.length === 1 && this.isZoomed) {
                    this.toolkit.reset();
                }
                this.touchStartList = [];
                chart.isDoubleTap = false;
            }
        };
        Zoom.prototype.mouseCancelHandler = function () {
            if (this.isZoomed) {
                this.performZoomRedraw(this.chart);
            }
            this.pinchTarget = null;
            this.touchStartList = [];
            this.touchMoveList = [];
        };
        Zoom.prototype.addTouchPointer = function (touchList, e, touches) {
            if (touches) {
                touchList = [];
                for (var i = 0, length_1 = touches.length; i < length_1; i++) {
                    touchList.push({ pageX: touches[i].clientX, pageY: touches[i].clientY, pointerId: null });
                }
            }
            else {
                touchList = touchList ? touchList : [];
                if (touchList.length === 0) {
                    touchList.push({ pageX: e.clientX, pageY: e.clientY, pointerId: e.pointerId });
                }
                else {
                    for (var i = 0, length_2 = touchList.length; i < length_2; i++) {
                        if (touchList[i].pointerId === e.pointerId) {
                            touchList[i] = { pageX: e.clientX, pageY: e.clientY, pointerId: e.pointerId };
                        }
                        else {
                            touchList.push({ pageX: e.clientX, pageY: e.clientY, pointerId: e.pointerId });
                        }
                    }
                }
            }
            return touchList;
        };
        Zoom.prototype.getModuleName = function () {
            return 'Zoom';
        };
        Zoom.prototype.destroy = function () {
            this.removeEventListener();
        };
        return Zoom;
    }());
    exports.Zoom = Zoom;
});
