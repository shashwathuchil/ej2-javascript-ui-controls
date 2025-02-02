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
define(["require", "exports", "@syncfusion/ej2-base", "@syncfusion/ej2-base", "@syncfusion/ej2-base", "../../common/utils/helper", "@syncfusion/ej2-svg-base", "../../common/model/base", "../../common/model/constants", "../../common/user-interaction/selection"], function (require, exports, ej2_base_1, ej2_base_2, ej2_base_3, helper_1, ej2_svg_base_1, base_1, constants_1, selection_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Selection = (function (_super) {
        __extends(Selection, _super);
        function Selection(chart) {
            var _this = _super.call(this, chart) || this;
            _this.isdrawRect = true;
            _this.multiDataIndexes = [];
            _this.pathIndex = 0;
            _this.seriesIndex = 0;
            _this.count = -1;
            _this.dragRectArray = [];
            _this.filterArray = [];
            _this.totalSelectedPoints = [];
            _this.chart = chart;
            _this.renderer = chart.renderer;
            var mode = chart.selectionMode;
            _this.isMultiDrag = chart.isMultiSelect && (mode.indexOf('Drag') > -1);
            _this.addEventListener();
            return _this;
        }
        Selection.prototype.addEventListener = function () {
            if (this.chart.isDestroyed || (this.chart.stockChart && this.chart.stockChart.onPanning)) {
                return;
            }
            var cancelEvent = ej2_base_1.Browser.isPointer ? 'pointerleave' : 'mouseleave';
            this.chart.on(ej2_base_1.Browser.touchMoveEvent, this.mouseMove, this);
            this.chart.on(cancelEvent, this.mouseLeave, this);
            this.chart.on('click', this.mouseClick, this);
            this.chart.on(ej2_base_1.Browser.touchStartEvent, this.mousedown, this);
            this.chart.on(ej2_base_1.Browser.touchEndEvent, this.mouseLeave, this);
        };
        Selection.prototype.mousedown = function (e) {
            var chart = this.chart;
            if (chart.isPointMouseDown || chart.selectionMode === 'None' || chart.isChartDrag) {
                return;
            }
            if (chart.isDoubleTap || !chart.isTouch || this.rectPoints) {
                this.dragStart(chart, chart.chartAxisLayoutPanel.seriesClipRect, chart.mouseDownX, chart.mouseDownY, e);
            }
        };
        Selection.prototype.removeEventListener = function () {
            if (this.chart.isDestroyed) {
                return;
            }
            this.chart.off(ej2_base_1.Browser.touchMoveEvent, this.mouseMove);
            this.chart.off('pointerleave' || 'mouseleave', this.mouseLeave);
            this.chart.off('click', this.mouseClick);
            this.chart.off(ej2_base_1.Browser.touchStartEvent, this.mousedown);
            this.chart.off(ej2_base_1.Browser.touchEndEvent, this.mouseLeave);
        };
        Selection.prototype.initPrivateVariables = function (chart) {
            this.styleId = chart.element.id + '_ej2_chart_selection';
            this.unselected = chart.element.id + '_ej2_deselected';
            this.closeIconId = chart.element.id + '_ej2_drag_close';
            this.draggedRectGroup = chart.element.id + '_ej2_drag_group';
            this.multiRectGroup = chart.element.id + '_ej2_drag_multi_group';
            this.draggedRect = chart.element.id + '_ej2_drag_rect';
            this.lassoPath = chart.element.id + '_ej2_drag_path';
            this.selectedDataIndexes = [];
            this.rectPoints = null;
            this.isSeriesMode = chart.selectionMode === 'Series';
        };
        Selection.prototype.invokeSelection = function (chart) {
            this.initPrivateVariables(chart);
            this.series = ej2_base_3.extend({}, chart.visibleSeries, null, true);
            this.seriesStyles();
            this.currentMode = chart.selectionMode;
            if (!(chart.selectionMode.indexOf('Drag') > -1)) {
                this.selectDataIndex(chart, this.concatIndexes(chart.selectedDataIndexes, this.selectedDataIndexes));
            }
        };
        Selection.prototype.generateStyle = function (series) {
            if (series) {
                if (this.styleId.indexOf('selection') > 1 && this.chart.selectionMode !== 'None') {
                    this.unselected = series.unSelectedStyle || this.unselected;
                }
                if (this.styleId.indexOf('highlight') > 0 && this.chart.highlightMode !== 'None') {
                    this.unselected = series.nonHighlightStyle || this.unselected;
                }
                return (series.selectionStyle || this.styleId + '_series_' + series.index);
            }
            return 'undefined';
        };
        Selection.prototype.selectDataIndex = function (chart, indexes) {
            for (var _i = 0, indexes_1 = indexes; _i < indexes_1.length; _i++) {
                var index = indexes_1[_i];
                this.performSelection(index, chart, this.getElementByIndex(chart, index)[0]);
            }
        };
        Selection.prototype.getElementByIndex = function (chart, index, suffix, marker) {
            if (suffix === void 0) { suffix = ''; }
            var elementId = chart.element.id + '_Series_' + index.series + '_Point' + '_' + index.point;
            var series = chart.series[index.series];
            elementId = (series.type !== 'Scatter' && series.type !== 'Bubble' && marker) ? (elementId + '_Symbol' + suffix) : elementId;
            return [helper_1.getElement(elementId), ((series.type === 'RangeArea' || series.type === 'SplineRangeArea') && series.marker.visible) ?
                    helper_1.getElement(elementId + '1') : null];
        };
        Selection.prototype.getClusterElements = function (chart, index) {
            var clusters = [];
            var seriesStyle;
            var selectedElements;
            for (var _i = 0, _a = chart.visibleSeries; _i < _a.length; _i++) {
                var series = _a[_i];
                if (series.visible) {
                    index = new base_1.Index(series.index, index.point);
                    if (series.isRectSeries) {
                        clusters.push(this.getElementByIndex(chart, index)[0]);
                    }
                    clusters.push(this.getElementByIndex(chart, index, '', series.marker.visible)[0]);
                    seriesStyle = this.generateStyle(chart.visibleSeries[index.series]);
                    selectedElements = document.querySelectorAll('.' + seriesStyle);
                    this.findTrackballElements(selectedElements, seriesStyle);
                    var clusterIndex = series.marker.visible && series.isRectSeries ? 2 : 1;
                    if (!chart.isMultiSelect && selectedElements.length > 0 &&
                        selectedElements[0].id !== clusters[clusters.length - clusterIndex].id) {
                        this.removeSelection(chart, index.series, selectedElements, seriesStyle, true);
                    }
                }
            }
            return clusters;
        };
        Selection.prototype.findTrackballElements = function (selectedElements, className) {
            var trackballElements;
            var elements;
            for (var i = 0; i < selectedElements.length; i++) {
                if (!ej2_base_3.isNullOrUndefined(selectedElements[i])) {
                    trackballElements = !ej2_base_3.isNullOrUndefined(selectedElements[i].parentNode) ?
                        [].slice.call(selectedElements[0].parentNode.querySelectorAll('.' + className)) : [];
                    if (trackballElements.length > 0) {
                        elements = [];
                        for (var i_1 = 0; i_1 < trackballElements.length; i_1++) {
                            if (trackballElements[i_1].id.indexOf('Trackball') > -1) {
                                elements.push(trackballElements[i_1]);
                            }
                        }
                        this.removeStyles(elements);
                    }
                }
            }
        };
        Selection.prototype.findElements = function (chart, series, index, suffix, marker) {
            if (suffix === void 0) { suffix = ''; }
            if (this.isSeriesMode) {
                return this.getSeriesElements(series);
            }
            else if (this.currentMode === 'Cluster') {
                return this.getClusterElements(chart, index);
            }
            else {
                return this.getElementByIndex(chart, index, suffix, marker);
            }
        };
        Selection.prototype.isAlreadySelected = function (targetElem, eventType) {
            if (eventType === 'click') {
                this.currentMode = this.chart.selectionMode;
                this.styleId = this.chart.element.id + '_ej2_chart_selection';
            }
            else if (eventType === 'mousemove' || eventType === 'pointermove') {
                this.currentMode = this.chart.highlightMode;
                this.highlightDataIndexes = [];
                this.styleId = this.chart.element.id + '_ej2_chart_highlight';
            }
            if (this.chart.highlightMode !== 'None' && this.chart.selectionMode === 'None') {
                if (eventType === 'click') {
                    return false;
                }
            }
            if ((this.chart.highlightMode !== 'None' && this.previousSelectedEle && this.previousSelectedEle[0])) {
                var parentNodeId = targetElem.parentNode.id;
                var isElement = void 0;
                if (targetElem.parentNode) {
                    isElement = (parentNodeId.indexOf('SeriesGroup') > 0 || parentNodeId.indexOf('SymbolGroup') > 0) ? true : false;
                }
                for (var i = 0; i < this.previousSelectedEle.length; i++) {
                    if (this.previousSelectedEle[i].hasAttribute('class')) {
                        if (this.previousSelectedEle[i].getAttribute('class').indexOf('highlight') > -1 &&
                            (isElement || eventType === 'click')) {
                            this.previousSelectedEle[i].removeAttribute('class');
                            if (this.chart.highlightColor !== '' && !ej2_base_3.isNullOrUndefined(this.chart.highlightColor) && this.chart.highlightPattern === 'None') {
                                if (this.previousSelectedEle[i].id.indexOf('Group') > 0) {
                                    for (var j = 0; j < this.previousSelectedEle[i].children.length; j++) {
                                        this.previousSelectedEle[i].children[j].setAttribute('fill', this.control.visibleSeries[this.indexFinder(this.previousSelectedEle[i].id).series].interior);
                                    }
                                }
                                else {
                                    this.previousSelectedEle[i].setAttribute('fill', this.control.visibleSeries[this.indexFinder(this.previousSelectedEle[i].id).series].interior);
                                }
                            }
                            this.addOrRemoveIndex(this.highlightDataIndexes, this.indexFinder(this.previousSelectedEle[i].id));
                        }
                        else if (!isElement && this.previousSelectedEle[i].getAttribute('class').indexOf('highlight') > -1) {
                            this.performSelection(this.indexFinder(this.previousSelectedEle[i].id), this.chart, this.previousSelectedEle[i]);
                        }
                    }
                }
            }
            return true;
        };
        Selection.prototype.mouseClick = function (event) {
            this.calculateSelectedElements(event.target, event.type);
        };
        Selection.prototype.calculateSelectedElements = function (targetElement, eventType) {
            if (ej2_base_3.isNullOrUndefined(targetElement)) {
                return;
            }
            if ((this.chart.selectionMode === 'None' && this.chart.highlightMode === 'None') ||
                targetElement.id && targetElement.id.indexOf(this.chart.element.id + '_') === -1) {
                return;
            }
            if (eventType === 'mousemove' || eventType === 'pointermove') {
                if (targetElement.hasAttribute('class') && (targetElement.getAttribute('class').indexOf('highlight') > -1 ||
                    targetElement.getAttribute('class').indexOf('selection') > -1)) {
                    return;
                }
                if (!ej2_base_3.isNullOrUndefined(targetElement.parentNode) && targetElement.parentNode.hasAttribute('class') &&
                    (targetElement.parentNode.getAttribute('class').indexOf('highlight') > 0 ||
                        targetElement.parentNode.getAttribute('class').indexOf('selection') > 0)) {
                    return;
                }
            }
            this.isAlreadySelected(targetElement, eventType);
            if (targetElement.id && targetElement.id.indexOf('_Series_') > -1 && targetElement.id.indexOf('_Text_') == -1) {
                var element = void 0;
                if (targetElement.id.indexOf('_Trackball_1') > -1) {
                    element = helper_1.getElement(targetElement.id.split('_Trackball_')[0] + '_Symbol');
                    element = ej2_base_3.isNullOrUndefined(element) ? helper_1.getElement(targetElement.id.split('_Trackball_')[0]) : element;
                }
                else if (targetElement.id.indexOf('_Trackball_0') > -1) {
                    return null;
                }
                this.performSelection(this.indexFinder(targetElement.id), this.chart, element || targetElement);
            }
        };
        Selection.prototype.performSelection = function (index, chart, element) {
            this.isSeriesMode = this.currentMode === 'Series';
            if (chart.series[index.series].type === 'BoxAndWhisker' && element &&
                element.id === chart.element.id + '_Series_' + index.series + '_Point_' + index.point + '_BoxPath') {
                element = element.parentNode;
            }
            if (chart.series[index.series].type === 'Area' && (this.currentMode === 'Point' || this.currentMode === 'Cluster') && element &&
                (element.id === this.chart.element.id + '_Series_' + index.series)) {
                var className = this.generateStyle(chart.series[index.series]);
                var selectionEle = document.querySelectorAll('.' + className);
                this.findTrackballElements(selectionEle, className);
                this.blurEffect(chart.element.id, chart.visibleSeries, false, index.point);
            }
            switch (this.currentMode) {
                case 'Series':
                    this.selection(chart, index, this.getSeriesElements(chart.series[index.series]));
                    this.selectionComplete(chart, index, this.currentMode);
                    this.blurEffect(chart.element.id, chart.visibleSeries, false, index.point);
                    break;
                case 'Point':
                    if (!isNaN(index.point) && element) {
                        var pointElements = [];
                        pointElements.push(element);
                        if (pointElements[0] !== null && chart.series[index.series].marker.visible &&
                            (chart.series[index.series].type.indexOf('Column') !== -1 || chart.series[index.series].type.indexOf('Bar') !== -1)) {
                            if (!(element.id.indexOf('_Symbol') !== -1) && helper_1.getElement(element.id + '_Symbol')) {
                                pointElements.push(helper_1.getElement(element.id + '_Symbol'));
                            }
                            else if (element.id.indexOf('_Symbol') !== -1 && helper_1.getElement(element.id.replace('_Symbol', ''))) {
                                pointElements.push(helper_1.getElement(element.id.replace('_Symbol', '')));
                            }
                        }
                        this.selection(chart, index, pointElements);
                        this.selectionComplete(chart, index, this.currentMode);
                        this.blurEffect(chart.element.id, chart.visibleSeries, false, index.point);
                    }
                    break;
                case 'Cluster':
                    if (!isNaN(index.point)) {
                        this.clusterSelection(chart, index);
                        this.selectionComplete(chart, index, this.currentMode);
                        this.blurEffect(chart.element.id, chart.visibleSeries, false, index.point);
                    }
                    break;
            }
        };
        Selection.prototype.selectionComplete = function (chart, index, selectionMode) {
            var points;
            var pointIndex;
            var seriesIndex;
            var selectedPointValues = [];
            var yValue;
            var selectedPointX;
            if (selectionMode === 'Cluster') {
                for (var _i = 0, _a = chart.visibleSeries; _i < _a.length; _i++) {
                    var series = _a[_i];
                    if (series.visible) {
                        for (var i = 0; i < this.selectedDataIndexes.length; i++) {
                            pointIndex = chart.isMultiSelect ? this.selectedDataIndexes[i].point : index.point;
                            seriesIndex = series.index;
                            points = series.points;
                            if (!isNaN(pointIndex)) {
                                yValue = (series.type !== 'RangeArea' || 'SplineRangeArea') ? points[pointIndex].yValue :
                                    points[pointIndex].regions[0].y;
                                selectedPointX = points[pointIndex].xValue;
                                if (chart.primaryXAxis.valueType === 'Category') {
                                    selectedPointX = points[pointIndex].x.toLocaleString();
                                }
                                else if (chart.primaryXAxis.valueType === 'DateTime') {
                                    selectedPointX = new Date(points[pointIndex].xValue);
                                }
                                if (series.category !== 'Indicator') {
                                    selectedPointValues.push({
                                        x: selectedPointX, y: yValue, seriesIndex: seriesIndex,
                                        pointIndex: pointIndex
                                    });
                                }
                                if (series.type === 'RangeArea' || series.type === 'SplineRangeArea') {
                                    selectedPointValues.push({
                                        x: selectedPointX, y: points[pointIndex].regions[0].y,
                                        seriesIndex: seriesIndex, pointIndex: pointIndex
                                    });
                                }
                            }
                        }
                    }
                }
            }
            else if (selectionMode === 'Series') {
                if (chart.isMultiSelect) {
                    for (var i = 0; i < this.selectedDataIndexes.length; i++) {
                        seriesIndex = this.selectedDataIndexes[i].series;
                        selectedPointValues.push({
                            seriesIndex: seriesIndex
                        });
                    }
                }
                else {
                    seriesIndex = (this.selectedDataIndexes.length > 0) ? this.selectedDataIndexes[0].series : 0;
                    selectedPointValues.push({
                        seriesIndex: seriesIndex
                    });
                }
            }
            else if (selectionMode === 'Point') {
                for (var i = 0; i < this.selectedDataIndexes.length; i++) {
                    pointIndex = this.selectedDataIndexes[i].point;
                    seriesIndex = this.selectedDataIndexes[i].series;
                    var series = chart.series[seriesIndex];
                    points = series.points;
                    if (!isNaN(pointIndex)) {
                        selectedPointX = points[pointIndex].xValue;
                        yValue = (series.type !== 'RangeArea' || 'SplineRangeArea') ? points[pointIndex].yValue :
                            points[pointIndex].regions[0].y;
                        if (chart.primaryXAxis.valueType === 'Category') {
                            selectedPointX = points[pointIndex].x.toLocaleString();
                        }
                        else if (chart.primaryXAxis.valueType === 'DateTime') {
                            selectedPointX = new Date(points[pointIndex].xValue);
                        }
                        selectedPointValues.push({
                            x: selectedPointX, y: yValue, seriesIndex: seriesIndex,
                            pointIndex: pointIndex
                        });
                    }
                }
            }
            var args = {
                name: constants_1.selectionComplete,
                selectedDataValues: selectedPointValues,
                cancel: false
            };
            chart.trigger(constants_1.selectionComplete, args);
        };
        Selection.prototype.selection = function (chart, index, selectedElements) {
            if (!(this.currentMode === 'Lasso')) {
                if (!chart.isMultiSelect && (this.currentMode.indexOf('Drag') === -1 && this.styleId.indexOf('highlight') === -1 &&
                    chart.selectionMode !== 'None')) {
                    this.removeMultiSelectElements(chart, this.selectedDataIndexes, index, chart.series);
                }
            }
            var indexValue = (this.rangeColorMappingEnabled()) ? 0 : index.series;
            if (!ej2_base_3.isNullOrUndefined(selectedElements[0])) {
                if (chart.series[indexValue].isRectSeries) {
                    if (selectedElements[0].id) {
                        if (document.getElementById(selectedElements[0].id + '_Symbol')) {
                            selectedElements.push(helper_1.getElement(selectedElements[0].id + '_Symbol'));
                        }
                        else if (selectedElements[0].id.indexOf('SeriesGroup') !== -1) {
                            if (document.getElementById(selectedElements[0].id.replace('SeriesGroup', 'SymbolGroup'))) {
                                selectedElements.push(helper_1.getElement(selectedElements[0].id.replace('SeriesGroup', 'SymbolGroup')));
                            }
                        }
                    }
                }
                var isAdd = void 0;
                var className = selectedElements[0] && (selectedElements[0].getAttribute('class') || '');
                var pClassName = selectedElements[0].parentNode &&
                    (selectedElements[0].parentNode.getAttribute('class') || '');
                if (className !== '' && this.currentMode !== 'Cluster') {
                    this.findTrackballElements(selectedElements, className);
                }
                if (selectedElements[0] && className.indexOf(this.getSelectionClass(selectedElements[0].id)) > -1) {
                    this.removeStyles(selectedElements);
                }
                else if (selectedElements[0].parentNode && pClassName.indexOf(this.getSelectionClass(selectedElements[0].id)) > -1) {
                    this.removeStyles([selectedElements[0].parentNode]);
                }
                else {
                    this.previousSelectedEle = chart.highlightMode !== 'None' ? selectedElements : [];
                    this.applyStyles(selectedElements);
                    isAdd = true;
                }
                if (this.styleId.indexOf('highlight') > 0 && chart.highlightMode !== 'None') {
                    this.addOrRemoveIndex(this.highlightDataIndexes, index, isAdd);
                }
                else {
                    this.addOrRemoveIndex(this.selectedDataIndexes, index, isAdd);
                }
            }
        };
        Selection.prototype.clusterSelection = function (chart, index) {
            this.selection(chart, index, this.getClusterElements(chart, new base_1.Index(index.series, index.point)));
        };
        Selection.prototype.removeMultiSelectElements = function (chart, index, currentIndex, seriesCollection) {
            var series;
            for (var i = 0; i < index.length; i++) {
                series = seriesCollection[index[i].series];
                if ((this.isSeriesMode && !this.toEquals(index[i], currentIndex, this.isSeriesMode)) ||
                    (this.currentMode === 'Cluster' && !this.toEquals(index[i], currentIndex, false)) ||
                    (!this.isSeriesMode && this.toEquals(index[i], currentIndex, true) && !this.toEquals(index[i], currentIndex, false))) {
                    this.removeStyles(this.findElements(chart, series, index[i], '', false));
                    if (series.marker.visible) {
                        this.removeStyles(this.findElements(chart, series, index[i], '', true));
                    }
                    index.splice(i, 1);
                    i--;
                }
            }
        };
        Selection.prototype.blurEffect = function (chartId, visibleSeries, isLegend, index) {
            if (isLegend === void 0) { isLegend = false; }
            if (index === void 0) { index = 0; }
            var visibility = (this.checkVisibility(this.highlightDataIndexes, this.chart) ||
                this.checkVisibility(this.selectedDataIndexes, this.chart));
            for (var _i = 0, visibleSeries_1 = visibleSeries; _i < visibleSeries_1.length; _i++) {
                var series = visibleSeries_1[_i];
                var legendIndex = void 0;
                var legendStrokeColor = void 0;
                if (this.rangeColorMappingEnabled()) {
                    if (isLegend == false) {
                        legendIndex = Object.keys(series.rangeColorPoints).indexOf(series.points[index].interior);
                        legendStrokeColor = series.points[index].interior;
                    }
                    else {
                        legendIndex = index;
                        legendStrokeColor = document.getElementById(chartId + '_chart_legend_shape_' + index).getAttribute('fill');
                    }
                }
                else {
                    legendIndex = series.index;
                    legendStrokeColor = this.chart.visibleSeries[series.index].interior;
                }
                if (series.visible) {
                    this.checkSelectionElements(helper_1.getElement(chartId + 'SeriesGroup' + series.index), this.generateStyle(series), visibility, isLegend, legendIndex, legendStrokeColor);
                    if (!ej2_base_3.isNullOrUndefined(helper_1.getElement(chartId + 'SymbolGroup' + series.index))) {
                        this.checkSelectionElements(helper_1.getElement(chartId + 'SymbolGroup' + series.index), this.generateStyle(series), visibility, isLegend, legendIndex, legendStrokeColor);
                    }
                }
            }
        };
        Selection.prototype.checkSelectionElements = function (element, className, visibility, isLegend, series, legendStrokeColor) {
            if (isLegend === void 0) { isLegend = true; }
            if (series === void 0) { series = 0; }
            if (legendStrokeColor === void 0) { legendStrokeColor = ''; }
            var children = (this.isSeriesMode ? [element] : element.childNodes || element);
            if (this.chart.selectionMode !== 'None' && this.chart.highlightMode !== 'None') {
                children = (element.childNodes || element);
            }
            var elementClassName;
            var parentClassName;
            var legendShape;
            var selectElement = element;
            for (var i = 0; i < children.length; i++) {
                elementClassName = children[i].getAttribute('class') || '';
                parentClassName = children[i].parentNode.getAttribute('class') || '';
                if (this.chart.selectionMode !== 'None' && this.chart.highlightMode !== 'None') {
                    className = elementClassName.indexOf('selection') > 0 ||
                        elementClassName.indexOf('highlight') > 0 ? elementClassName : className;
                    className = (parentClassName.indexOf('selection') > 0 ||
                        parentClassName.indexOf('highlight') > 0) ? parentClassName : className;
                }
                if (elementClassName.indexOf(className) === -1 &&
                    parentClassName.indexOf(className) === -1 && visibility) {
                    this.addSvgClass(children[i], this.unselected);
                }
                else {
                    selectElement = children[i];
                    this.removeSvgClass(children[i], this.unselected);
                    this.removeSvgClass(children[i].parentNode, this.unselected);
                }
                if (children[i].id.indexOf('Trackball') > 0 && selectElement.classList[0] === className) {
                    this.removeSvgClass(children[i], this.unselected);
                    this.removeSvgClass(children[i].parentNode, this.unselected);
                    this.addSvgClass(children[i], className);
                }
            }
            if (element.id.indexOf('Symbol') > -1) {
                if ((element.querySelectorAll('.' + className)[0]) && element.querySelectorAll('.' + className)[0].getAttribute('class')
                    === className) {
                    var symbolEle = helper_1.getElement(this.control.element.id + '_Series_' + element.id[element.id.length - 1]);
                    var seriesClassName = symbolEle && symbolEle.hasAttribute('class') ? symbolEle.getAttribute('class') : '';
                    if (seriesClassName.indexOf(this.unselected) > -1) {
                        this.removeSvgClass(symbolEle, this.unselected);
                    }
                }
            }
            if (this.control.legendModule && this.control.legendSettings.visible) {
                legendShape = helper_1.getElement(this.control.element.id + '_chart_legend_shape_' + series);
                if (legendShape) {
                    if (legendShape.hasAttribute('class')) {
                        this.removeSvgClass(legendShape, legendShape.getAttribute('class'));
                        if (!ej2_base_3.isNullOrUndefined(this.chart.highlightColor && this.chart.highlightColor !== '')) {
                            legendShape.setAttribute('stroke', legendStrokeColor);
                            if (this.chart.highlightPattern === 'None') {
                                legendShape.setAttribute('fill', legendStrokeColor);
                            }
                        }
                    }
                    elementClassName = selectElement.getAttribute('class') || '';
                    parentClassName = selectElement.parentNode.getAttribute('class') || '';
                    if (elementClassName.indexOf(className) === -1 && parentClassName.indexOf(className) === -1 && visibility) {
                        this.addSvgClass(legendShape, this.unselected);
                        this.removeSvgClass(legendShape, className);
                        if (this.chart.highlightColor !== '' && !ej2_base_3.isNullOrUndefined(this.chart.highlightColor)) {
                            legendShape.setAttribute('stroke', this.control.visibleSeries[series].interior);
                            if (this.chart.highlightPattern === 'None') {
                                legendShape.setAttribute('fill', this.control.visibleSeries[series].interior);
                            }
                        }
                    }
                    else {
                        this.removeSvgClass(legendShape, this.unselected);
                        if (!ej2_base_3.isNullOrUndefined(this.chart.highlightColor) && this.chart.highlightColor !== '') {
                            legendShape.setAttribute('stroke', this.control.visibleSeries[series].interior);
                            if (this.chart.highlightPattern === 'None') {
                                legendShape.setAttribute('fill', this.control.visibleSeries[series].interior);
                            }
                        }
                        if ((elementClassName === '' && parentClassName === '') || elementClassName.trim() === 'EJ2-Trackball') {
                            this.removeSvgClass(legendShape, className);
                        }
                        else {
                            this.addSvgClass(legendShape, className);
                            if (className.indexOf('highlight') > 0 && this.chart.highlightColor !== '' && !ej2_base_3.isNullOrUndefined(this.chart.highlightColor)) {
                                legendShape.setAttribute('stroke', this.chart.highlightColor);
                                if (this.styleId.indexOf('highlight') > 0 && this.chart.highlightPattern === 'None') {
                                    legendShape.setAttribute('fill', this.chart.highlightColor);
                                }
                            }
                        }
                    }
                    var legendItemsId = void 0;
                    if (this.rangeColorMappingEnabled()) {
                        for (var i = 0; i < this.chart.rangeColorSettings.length; i++) {
                            legendItemsId = document.getElementById(this.chart.element.id + '_chart_legend_shape_' + i);
                            if (legendShape != legendItemsId) {
                                this.addSvgClass(legendItemsId, this.unselected);
                            }
                            else if (isLegend == true) {
                                this.addSvgClass(legendItemsId, className);
                            }
                            if (elementClassName.indexOf(className) === -1 && isLegend == false) {
                                this.removeSvgClass(legendItemsId, this.unselected);
                            }
                        }
                    }
                    if (isLegend && parentClassName.indexOf(className) > -1) {
                        this.addSvgClass(legendShape, className);
                    }
                }
            }
        };
        Selection.prototype.applyStyles = function (elements) {
            for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
                var element = elements_1[_i];
                if (element) {
                    this.removeSvgClass(element.parentNode, this.unselected);
                    this.removeSvgClass(element, this.unselected);
                    if (this.chart.series[0].pointColorMapping == 'fill' || this.rangeColorMappingEnabled()) {
                        var className = this.getSelectionClass(element.id);
                        var patternName = this.styleId.indexOf('highlight') > 0 ? this.chart.highlightPattern : this.chart.selectionPattern;
                        var pattern = void 0;
                        var index = className.indexOf('highlight') > -1 ? parseInt(className.split(this.chart.element.id + '_ej2_chart_highlight_series_')[1], 10) : parseInt(className.split(this.chart.element.id + '_ej2_chart_selection_series_')[1], 10);
                        if (className.indexOf('highlight') > -1 || className.indexOf('selection') > -1) {
                            pattern = document.getElementById(this.chart.element.id + '_' + patternName + '_' + 'Selection' + '_' + index);
                        }
                        if (element.id.indexOf('legend') == -1 && element.id.indexOf('Group') == -1 && pattern != null) {
                            for (var i = 1; i < pattern.children.length; i++) {
                                pattern.children[i].setAttribute('fill', element.getAttribute('fill'));
                                pattern.children[i].setAttribute('stroke', element.getAttribute('fill'));
                            }
                        }
                    }
                    this.addSvgClass(element, this.getSelectionClass(element.id));
                    if (this.styleId.indexOf('highlight') > 0 && this.chart.highlightColor !== '' && !ej2_base_3.isNullOrUndefined(this.chart.highlightColor) && this.chart.highlightPattern === 'None') {
                        if (element.id.indexOf('Group') > 0) {
                            for (var i = 0; i < element.children.length; i++) {
                                element.children[i].setAttribute('fill', this.chart.highlightColor);
                            }
                        }
                        else {
                            element.setAttribute('fill', this.chart.highlightColor);
                        }
                    }
                }
            }
        };
        Selection.prototype.getSelectionClass = function (id) {
            return this.generateStyle(this.control.series[this.indexFinder(id).series]);
        };
        Selection.prototype.removeStyles = function (elements) {
            for (var _i = 0, elements_2 = elements; _i < elements_2.length; _i++) {
                var element = elements_2[_i];
                if (element) {
                    this.removeSvgClass(element, this.getSelectionClass(element.id));
                    if (this.chart.highlightPattern === 'None' && this.chart.highlightColor !== '' && !ej2_base_3.isNullOrUndefined(this.chart.highlightColor)) {
                        if (element.id.indexOf('Group') > 0) {
                            for (var i = 0; i < element.children.length; i++) {
                                element.children[i].setAttribute('fill', this.control.visibleSeries[this.indexFinder(element.id).series].interior);
                            }
                        }
                        else {
                            element.setAttribute('fill', this.control.visibleSeries[this.indexFinder(element.id).series].interior);
                        }
                    }
                }
            }
        };
        Selection.prototype.addOrRemoveIndex = function (indexes, index, isAdd) {
            for (var i = 0; i < indexes.length; i++) {
                if (this.toEquals(indexes[i], index, this.isSeriesMode)) {
                    indexes.splice(i, 1);
                    i--;
                }
            }
            if (isAdd) {
                indexes.push(index);
            }
        };
        Selection.prototype.toEquals = function (first, second, checkSeriesOnly) {
            return ((first.series === second.series || (this.currentMode === 'Cluster' && !checkSeriesOnly))
                && (checkSeriesOnly || (first.point === second.point)));
        };
        Selection.prototype.redrawSelection = function (chart, oldMode, chartRedraw) {
            this.isSeriesMode = oldMode === 'Series';
            if (!ej2_base_3.isNullOrUndefined(oldMode)) {
                if (oldMode.indexOf('Drag') !== -1 || oldMode === 'Lasso' || chartRedraw) {
                    chart.isRedrawSelection = false;
                }
                else {
                    chart.isRedrawSelection = true;
                }
            }
            var selectedDataIndexes = ej2_base_3.extend([], this.selectedDataIndexes, null, true);
            var highlightDataIndexes = ej2_base_3.extend([], this.highlightDataIndexes, null, true);
            if (this.styleId.indexOf('highlight') > 0 && highlightDataIndexes.length > 0) {
                this.removeSelectedElements(chart, this.highlightDataIndexes, chart.series);
                selectedDataIndexes = highlightDataIndexes;
            }
            else {
                this.removeSelectedElements(chart, this.selectedDataIndexes, chart.series);
            }
            this.blurEffect(chart.element.id, chart.visibleSeries, false);
            this.selectDataIndex(chart, selectedDataIndexes);
        };
        Selection.prototype.legendSelection = function (chart, series, targetElement, eventType) {
            if (eventType === 'mousemove') {
                if (targetElement.id.indexOf('text') > 1) {
                    targetElement = helper_1.getElement(targetElement.id.replace('text', 'shape'));
                }
                if (targetElement.hasAttribute('class') && (targetElement.getAttribute('class').indexOf('highlight') > -1 ||
                    targetElement.getAttribute('class').indexOf('selection') > -1)) {
                    return;
                }
                this.currentMode = this.chart.highlightMode;
            }
            var isPreSelected = this.isAlreadySelected(targetElement, eventType);
            if (isPreSelected) {
                var seriesStyle = this.generateStyle(chart.visibleSeries[series]);
                var selectedElements = (document.querySelectorAll('.' + seriesStyle));
                this.isSeriesMode = this.currentMode === 'Series';
                var isBlurEffectNeeded = true;
                if (selectedElements.length > 0) {
                    this.removeSelection(chart, series, selectedElements, seriesStyle, isBlurEffectNeeded);
                }
                else {
                    for (var _i = 0, _a = chart.visibleSeries; _i < _a.length; _i++) {
                        var element = _a[_i];
                        if (element.index !== series && !chart.isMultiSelect) {
                            seriesStyle = this.generateStyle(chart.visibleSeries[element.index]);
                            selectedElements = document.querySelectorAll('.' + seriesStyle);
                            this.removeSelection(chart, series, selectedElements, seriesStyle, isBlurEffectNeeded);
                        }
                    }
                    var seriesElements = [];
                    if (this.rangeColorMappingEnabled()) {
                        for (var i = 0, a = chart.visibleSeries[0].seriesElement.children; i < a.length; i++) {
                            var point = a[i];
                            if (targetElement.getAttribute('fill') === point.getAttribute('fill')) {
                                seriesElements.push(point);
                            }
                        }
                        for (var _b = 0, seriesElements_1 = seriesElements; _b < seriesElements_1.length; _b++) {
                            var element = seriesElements_1[_b];
                            if (ej2_base_3.isNullOrUndefined(element)) {
                                return;
                            }
                            this.checkSelectionElements(element, seriesStyle, false, true, series);
                        }
                    }
                    else {
                        seriesElements = this.getSeriesElements(chart.visibleSeries[series]);
                        for (var _c = 0, seriesElements_2 = seriesElements; _c < seriesElements_2.length; _c++) {
                            var seriesElement = seriesElements_2[_c];
                            if (ej2_base_3.isNullOrUndefined(seriesElement)) {
                                return;
                            }
                            this.checkSelectionElements(seriesElement, seriesStyle, false);
                        }
                    }
                    this.isSeriesMode = true;
                    this.selection(chart, new base_1.Index(series, NaN), seriesElements);
                    this.isSeriesMode = chart.selectionMode === 'Series';
                    this.blurEffect(chart.element.id, chart.visibleSeries, true, series);
                }
            }
        };
        Selection.prototype.rangeColorMappingEnabled = function () {
            if ((this.chart.rangeColorSettings && this.chart.rangeColorSettings.length > 0 && this.chart.visibleSeries.length === 1 &&
                (this.chart.series[0].type === 'Column' || this.chart.series[0].type === 'Bar' ||
                    this.chart.series[0].type === 'Scatter' || this.chart.series[0].type === 'Bubble'))) {
                return true;
            }
            else {
                return false;
            }
        };
        Selection.prototype.removeSelection = function (chart, series, selectedElements, seriesStyle, isBlurEffectNeeded) {
            if (selectedElements.length > 0) {
                var elements = [];
                for (var i = 0; i < selectedElements.length; i++) {
                    elements.push(selectedElements[i]);
                }
                this.removeStyles(elements);
                this.isSeriesMode = true;
                this.addOrRemoveIndex(this.selectedDataIndexes, new base_1.Index(series, NaN));
                for (var _i = 0, _a = chart.visibleSeries; _i < _a.length; _i++) {
                    var value = _a[_i];
                    seriesStyle = this.generateStyle(value);
                    if (document.querySelectorAll('.' + seriesStyle).length > 0) {
                        for (var _b = 0, elements_3 = elements; _b < elements_3.length; _b++) {
                            var element = elements_3[_b];
                            this.checkSelectionElements(element, seriesStyle, true, true, series);
                        }
                        isBlurEffectNeeded = false;
                        break;
                    }
                }
                if (isBlurEffectNeeded) {
                    this.isSeriesMode = chart.selectionMode === 'Series';
                    this.blurEffect(chart.element.id, chart.visibleSeries);
                }
            }
        };
        Selection.prototype.getSeriesElements = function (series) {
            var seriesElements = [series.seriesElement];
            if (series.marker.visible && series.type !== 'Scatter' && series.type !== 'Bubble' && !series.isRectSeries) {
                seriesElements.push(series.symbolElement);
            }
            else if (series.marker.visible && series.isRectSeries) {
                seriesElements.push(series.symbolElement);
            }
            return seriesElements;
        };
        Selection.prototype.indexFinder = function (id) {
            var ids = ['NaN', 'NaN'];
            if (id.indexOf('SeriesGroup') > -1) {
                ids = id.split('SeriesGroup');
                ids[0] = ids[1];
            }
            else if (id.indexOf('SymbolGroup') > -1) {
                ids = id.split('SymbolGroup');
                ids[0] = ids[1];
            }
            else if (id.indexOf('_Point_') > -1) {
                ids = id.split('_Series_')[1].split('_Point_');
            }
            else if (id.indexOf('_Series_') > -1) {
                ids[0] = id.split('_Series_')[1];
            }
            else if (id.indexOf('_chart_legend_shape_') > -1) {
                ids = id.split('_chart_legend_shape_');
                ids[0] = ids[1];
            }
            return new base_1.Index(parseInt(ids[0], 10), parseInt(ids[1], 10));
        };
        Selection.prototype.calculateDragSelectedElements = function (chart, dragRect, isClose) {
            this.removeSelectedElements(chart, this.selectedDataIndexes, chart.series);
            var isLasso = chart.selectionMode === 'Lasso';
            var rect = new ej2_svg_base_1.Rect(dragRect.x, dragRect.y, dragRect.width, dragRect.height);
            var axisOffset = new helper_1.ChartLocation(chart.chartAxisLayoutPanel.seriesClipRect.x, chart.chartAxisLayoutPanel.seriesClipRect.y);
            this.removeOffset(rect, axisOffset);
            var points;
            var index;
            var selectedPointValues = [];
            var selectedSeriesValues = [];
            this.isSeriesMode = false;
            var isDragResize = (chart.allowMultiSelection) && (this.rectGrabbing || this.resizing);
            this.rectPoints = this.dragRectArray[isDragResize ? this.targetIndex : this.count] =
                new ej2_svg_base_1.Rect(dragRect.x, dragRect.y, dragRect.width, dragRect.height);
            if (dragRect.width && dragRect.height && !isClose) {
                var rt = new ej2_svg_base_1.Rect(dragRect.x, dragRect.y, dragRect.width, dragRect.height);
                this.removeOffset(rt, axisOffset);
                this.filterArray[isDragResize ? this.targetIndex : this.count] = rt;
            }
            var _loop_1 = function (series) {
                if (series.visible) {
                    points = series.points;
                    selectedPointValues = [];
                    var xAxisOffset_1;
                    var yAxisOffset_1;
                    if ((chart.isTransposed || series.type.indexOf('Bar') !== -1) &&
                        !(chart.isTransposed && series.type.indexOf('Bar') !== -1)) {
                        xAxisOffset_1 = series.xAxis.rect.y - axisOffset.y;
                        yAxisOffset_1 = series.yAxis.rect.x - axisOffset.x;
                    }
                    else {
                        xAxisOffset_1 = series.xAxis.rect.x - axisOffset.x;
                        yAxisOffset_1 = series.yAxis.rect.y - axisOffset.y;
                    }
                    for (var j = 0; j < points.length; j++) {
                        var yValue = (series.type !== 'RangeArea' || 'SplineRangeArea') ? points[j].yValue :
                            points[j].regions[0].y;
                        var isCurrentPoint = void 0;
                        var selectedPointX = points[j].xValue;
                        if (chart.primaryXAxis.valueType === 'Category') {
                            selectedPointX = points[j].x.toLocaleString();
                        }
                        else if (chart.primaryXAxis.valueType === 'DateTime') {
                            selectedPointX = new Date(points[j].xValue);
                        }
                        if (series.type === 'BoxAndWhisker') {
                            isCurrentPoint = points[j].regions.some(function (region) {
                                return helper_1.withInBounds(region.x + xAxisOffset_1, region.y + yAxisOffset_1, rect);
                            });
                        }
                        else {
                            if (chart.selectionMode === 'Lasso') {
                                isCurrentPoint = points[j].isSelect;
                            }
                            else {
                                isCurrentPoint = (chart.allowMultiSelection) ?
                                    this_1.isPointSelect(points[j], xAxisOffset_1, yAxisOffset_1, this_1.filterArray) :
                                    points[j].symbolLocations.some(function (location) {
                                        return location && helper_1.withInBounds(location.x + xAxisOffset_1, location.y + yAxisOffset_1, rect);
                                    });
                            }
                        }
                        if (isCurrentPoint && series.category !== 'Indicator') {
                            index = new base_1.Index(series.index, points[j].index);
                            this_1.selection(chart, index, this_1.findElements(chart, series, index, '', !series.isRectSeries ? series.marker.visible : false));
                            selectedPointValues.push({ x: selectedPointX, y: yValue });
                        }
                        if (isCurrentPoint && (series.type === 'RangeArea' || series.type === 'SplineRangeArea')) {
                            selectedPointValues.push({ x: selectedPointX, y: points[j].regions[0].y });
                        }
                    }
                    selectedSeriesValues.push(selectedPointValues);
                }
            };
            var this_1 = this;
            for (var _i = 0, _a = chart.visibleSeries; _i < _a.length; _i++) {
                var series = _a[_i];
                _loop_1(series);
            }
            this.blurEffect(chart.element.id, chart.visibleSeries);
            var x = isLasso ? chart.mouseDownX : (dragRect.x + dragRect.width);
            var y = isLasso ? chart.mouseDownY : dragRect.y;
            if (!isClose) {
                this.createCloseButton(x, y);
            }
            var args = {
                name: constants_1.dragComplete,
                selectedDataValues: selectedSeriesValues,
                cancel: false
            };
            chart.trigger(constants_1.dragComplete, args);
        };
        Selection.prototype.removeOffset = function (rect, clip) {
            rect.x -= clip.x;
            rect.y -= clip.y;
        };
        Selection.prototype.isPointSelect = function (points, xAxisOffset, yAxisOffset, rectCollection) {
            var location = points.symbolLocations[0];
            for (var _i = 0, rectCollection_1 = rectCollection; _i < rectCollection_1.length; _i++) {
                var rect = rectCollection_1[_i];
                if (rect && location && helper_1.withInBounds(location.x + xAxisOffset, location.y + yAxisOffset, rect)) {
                    return true;
                }
            }
            return false;
        };
        Selection.prototype.drawDraggingRect = function (chart, dragRect, target) {
            var cartesianLayout = chart.chartAxisLayoutPanel.seriesClipRect;
            var border = chart.chartArea.border.width;
            var rectFill = chart.themeStyle.selectionRectFill;
            var rectStroke = chart.themeStyle.selectionRectStroke;
            var isLasso = chart.selectionMode === 'Lasso';
            if (this.isdrawRect) {
                cartesianLayout.x = cartesianLayout.x - border / 2;
                cartesianLayout.y = cartesianLayout.y - border / 2;
                cartesianLayout.width = cartesianLayout.width + border;
                cartesianLayout.height = cartesianLayout.height + border;
                this.isdrawRect = false;
            }
            switch (chart.selectionMode) {
                case 'DragX':
                    dragRect.y = cartesianLayout.y;
                    dragRect.height = cartesianLayout.height;
                    break;
                case 'DragY':
                    dragRect.x = cartesianLayout.x;
                    dragRect.width = cartesianLayout.width;
                    break;
            }
            if ((dragRect.width < 5 || dragRect.height < 5) && !isLasso) {
                return null;
            }
            var isDragMode = chart.selectionMode.indexOf('Drag') > -1 || chart.selectionMode === 'Lasso';
            if ((chart.allowMultiSelection) && isDragMode) {
                var element = void 0;
                var dragGroup = void 0;
                var multiGroup = helper_1.getElement(this.multiRectGroup);
                if (!multiGroup) {
                    multiGroup = chart.svgRenderer.createGroup({ id: this.multiRectGroup });
                    chart.svgObject.appendChild(multiGroup);
                }
                if (this.rectGrabbing || this.resizing) {
                    var rectElement = void 0;
                    rectElement = helper_1.getElement(this.draggedRect + this.targetIndex);
                    if (rectElement.nextSibling) {
                        ej2_base_2.remove(rectElement.nextSibling);
                    }
                    this.setAttributes(rectElement, dragRect);
                }
                else if (!helper_1.getElement(this.draggedRectGroup + this.count)) {
                    dragGroup = chart.svgRenderer.createGroup({ id: this.draggedRectGroup + this.count });
                    var svgElement = document.getElementById(chart.element.id + '_series_svg');
                    chart.enableCanvas ? svgElement.appendChild(dragGroup) : multiGroup.appendChild(dragGroup);
                }
                if (!(chart.selectionMode === 'Lasso')) {
                    element = chart.svgRenderer.drawRectangle(new helper_1.RectOption(this.draggedRect + this.count, rectFill, { color: rectStroke, width: 1 }, 1, dragRect));
                    element.style.cursor = "move";
                }
                else {
                    element = chart.svgRenderer.drawPath(new ej2_svg_base_1.PathOption(this.lassoPath + this.count, rectFill, 3, rectStroke, 1, '', this.path));
                }
                if (!dragGroup && !this.rectGrabbing && !this.resizing) {
                    helper_1.getElement(this.draggedRectGroup + this.count).appendChild(element);
                }
                else if (!this.rectGrabbing && !this.resizing) {
                    dragGroup.appendChild(element);
                }
            }
            else {
                var element = isLasso ?
                    helper_1.getElement(this.lassoPath) : helper_1.getElement(this.draggedRect);
                if (this.closeIcon) {
                    helper_1.removeElement(this.closeIconId);
                }
                if (element) {
                    if (isLasso) {
                        element.setAttribute('d', this.path);
                    }
                    else {
                        this.setAttributes(element, dragRect);
                    }
                }
                else {
                    var dragGroup = chart.svgRenderer.createGroup({ id: this.draggedRectGroup });
                    var svgElement = document.getElementById(chart.element.id + '_series_svg');
                    chart.enableCanvas ? svgElement.appendChild(dragGroup) : chart.svgObject.appendChild(dragGroup);
                    if (!(chart.selectionMode === 'Lasso')) {
                        element = chart.svgRenderer.drawRectangle(new helper_1.RectOption(this.draggedRect, rectFill, { color: rectStroke, width: 1 }, 1, dragRect));
                    }
                    else {
                        element = chart.svgRenderer.drawPath(new ej2_svg_base_1.PathOption(this.lassoPath, rectFill, 3, rectStroke, 1, '', this.path));
                    }
                    dragGroup.appendChild(element);
                }
            }
        };
        Selection.prototype.getIndex = function (id) {
            var i;
            for (i = id.length - 1; i > 0; i--) {
                var x = Number(id[i]);
                if (!isNaN(x)) {
                    continue;
                }
                else {
                    break;
                }
            }
            var index = +id.substr(i + 1, id.length - 1);
            return index;
        };
        Selection.prototype.createCloseButton = function (x, y) {
            var isMultiDrag = this.chart.allowMultiSelection;
            var circleStroke = this.chart.themeStyle.selectionCircleStroke;
            var isDrag = this.rectGrabbing || this.resizing;
            var closeIcon = this.chart.svgRenderer.createGroup({
                id: this.closeIconId + (isMultiDrag ? (isDrag ? this.targetIndex : this.count) : ''),
                style: 'cursor:pointer; visibility: visible;'
            });
            closeIcon.appendChild(this.chart.svgRenderer.drawCircle(new helper_1.CircleOption(this.closeIconId + '_circle' + (isMultiDrag ? (isDrag ? this.targetIndex : this.count) : ''), '#FFFFFF', { color: circleStroke, width: 1 }, 1, x, y, 10)));
            var direction = 'M ' + (x - 4) + ' ' + (y - 4) + ' L ' + (x + 4) + ' ' + (y + 4) + ' M ' + (x - 4) + ' ' + (y + 4) +
                ' L ' + (x + 4) + ' ' + (y - 4);
            closeIcon.appendChild(this.chart.svgRenderer.drawPath({
                id: this.closeIconId + '_cross' +
                    (isMultiDrag ? (isDrag ? this.targetIndex : this.count) : ''), d: direction,
                stroke: circleStroke, 'stroke-width': 2, fill: circleStroke
            }));
            this.closeIcon = closeIcon;
            var pathElement = helper_1.getElement(this.draggedRectGroup + (isMultiDrag ? (isDrag ? this.targetIndex : this.count) : ''));
            if (pathElement) {
                pathElement.appendChild(closeIcon);
            }
        };
        Selection.prototype.removeDraggedElements = function (chart, targetElement, eventType) {
            if ((targetElement.id && targetElement.id.indexOf(this.closeIconId) > -1) && (eventType.indexOf('move') === -1)) {
                var isSelectedvalues = true;
                if ((chart.allowMultiSelection)) {
                    var index = this.getIndex(targetElement.id);
                    var multiRectGroupElement = helper_1.getElement(this.multiRectGroup);
                    ej2_base_2.remove(helper_1.getElement(this.draggedRectGroup + index));
                    this.dragRectArray[index] = null;
                    this.filterArray[index] = null;
                    this.totalSelectedPoints[index] = null;
                    if (multiRectGroupElement && multiRectGroupElement.childElementCount === 0) {
                        helper_1.removeElement(multiRectGroupElement);
                        this.dragRectArray = [];
                        this.filterArray = [];
                        this.totalSelectedPoints = [];
                    }
                    if (this.currentMode === 'Lasso') {
                        if (this.multiDataIndexes[index] != null) {
                            for (var i = 0; i < this.multiDataIndexes[index].length; i++) {
                                this.multiDataIndexes[index][i].isSelect = false;
                            }
                        }
                        this.multiDataIndexes[index] = null;
                        for (var j = 0; j < this.multiDataIndexes.length; j++) {
                            if (this.multiDataIndexes[j] != null) {
                                isSelectedvalues = false;
                                for (var k = 0; k < this.multiDataIndexes[j].length; k++) {
                                    this.multiDataIndexes[j][k].isSelect = true;
                                }
                            }
                        }
                        this.calculateDragSelectedElements(chart, this.dragRect, true);
                    }
                    else if (this.filterArray.length) {
                        for (var i = 0; i < this.filterArray.length; i++) {
                            if (this.filterArray[i]) {
                                isSelectedvalues = false;
                                this.calculateDragSelectedElements(chart, this.filterArray[i], true);
                            }
                        }
                    }
                    else {
                        this.calculateDragSelectedElements(chart, new ej2_svg_base_1.Rect(0, 0, 0, 0), true);
                    }
                }
                else {
                    ej2_base_2.remove(helper_1.getElement(this.draggedRectGroup));
                    this.removeSelectedElements(chart, this.selectedDataIndexes, chart.series);
                }
                this.blurEffect(chart.element.id, chart.visibleSeries);
                this.changeCursorStyle(false, chart.svgObject, 'auto');
                if (!(chart.allowMultiSelection) || isSelectedvalues) {
                    this.rectPoints = null;
                }
            }
        };
        Selection.prototype.resizingSelectionRect = function (chart, location, tapped, target) {
            var rect;
            if (((chart.allowMultiSelection) && (target.id.indexOf('_ej2_drag_rect') > -1)) ||
                this.dragRectArray[this.targetIndex]) {
                if (target.id.indexOf('_ej2_drag_rect') > -1) {
                    this.targetIndex = this.getIndex(target.id);
                }
                var r = this.dragRectArray[this.targetIndex];
                rect = new ej2_svg_base_1.Rect(r.x, r.y, r.width, r.height);
            }
            if (!(chart.allowMultiSelection)) {
                rect = new ej2_svg_base_1.Rect(this.rectPoints.x, this.rectPoints.y, this.rectPoints.width, this.rectPoints.height);
            }
            if (rect) {
                var resize = this.findResizeMode(chart.svgObject, rect, location);
                if (this.resizing) {
                    rect = helper_1.getDraggedRectLocation(rect.x, rect.y, (rect.x + rect.width), (rect.y + rect.height), chart.chartAxisLayoutPanel.seriesClipRect);
                    this.drawDraggingRect(chart, rect);
                    this.dragRect = rect;
                }
                if (tapped) {
                    this.resizing = resize;
                }
            }
            else {
                return;
            }
        };
        Selection.prototype.findResizeMode = function (chartSvgObject, rect, location) {
            var cursorStyle = 'se-resize';
            var resize = false;
            if (!this.resizing) {
                var resizeEdges = [new ej2_svg_base_1.Rect(rect.x, (rect.y), rect.width - 5, 5),
                    new ej2_svg_base_1.Rect((rect.x), rect.y, 5, rect.height),
                    new ej2_svg_base_1.Rect(rect.x, (rect.y + rect.height - 5), rect.width - 5, 5),
                    new ej2_svg_base_1.Rect((rect.x + rect.width - 5), rect.y + 5, 5, rect.height - 15),
                    new ej2_svg_base_1.Rect((rect.x + rect.width - 10), (rect.y + rect.height - 10), 10, 10)];
                for (var i = 0; i < resizeEdges.length; i++) {
                    if (helper_1.withInBounds(location.x, location.y, resizeEdges[i])) {
                        cursorStyle = (i === 4) ? cursorStyle : (i % 2 === 0) ? 'ns-resize' : 'ew-resize';
                        resize = true;
                        this.resizeMode = i;
                        break;
                    }
                }
            }
            else {
                var x = rect.x;
                var y = rect.y;
                var width = (location.x - x);
                var height = (location.y - y);
                switch (this.resizeMode) {
                    case 0:
                        height = Math.abs((rect.height + rect.y) - location.y);
                        rect.y = Math.min((rect.height + rect.y), location.y);
                        rect.height = height;
                        break;
                    case 1:
                        width = Math.abs((rect.width + rect.x) - location.x);
                        rect.x = Math.min((rect.width + rect.x), location.x);
                        rect.width = width;
                        break;
                    case 2:
                        rect.height = Math.abs(height);
                        rect.y = Math.min(location.y, y);
                        break;
                    case 3:
                        rect.width = Math.abs(width);
                        rect.x = Math.min(location.x, x);
                        break;
                    case 4:
                        rect.width = Math.abs(width);
                        rect.height = Math.abs(height);
                        rect.x = Math.min(location.x, x);
                        rect.y = Math.min(location.y, y);
                        break;
                }
            }
            if (this.currentMode !== 'Lasso') {
                this.changeCursorStyle(resize, helper_1.getElement((this.chart.allowMultiSelection) ? this.draggedRect +
                    this.targetIndex : this.draggedRect), cursorStyle);
            }
            this.changeCursorStyle(resize, chartSvgObject, cursorStyle);
            return resize;
        };
        Selection.prototype.changeCursorStyle = function (isResize, rectelement, cursorStyle) {
            cursorStyle = isResize ? cursorStyle : (this.control.svgObject === rectelement) ? 'auto' : 'move';
            if (rectelement) {
                rectelement.style.cursor = cursorStyle;
            }
        };
        Selection.prototype.removeSelectedElements = function (chart, index, seriesCollection) {
            index = chart.isRedrawSelection ? index : index.splice(0, index.length);
            var seriesElements;
            for (var _i = 0, seriesCollection_1 = seriesCollection; _i < seriesCollection_1.length; _i++) {
                var series = seriesCollection_1[_i];
                seriesElements = this.getSeriesElements(series);
                this.removeStyles(seriesElements);
                for (var _a = 0, seriesElements_3 = seriesElements; _a < seriesElements_3.length; _a++) {
                    var seriesElement = seriesElements_3[_a];
                    this.removeStyles(this.getChildren(seriesElement));
                }
            }
        };
        Selection.prototype.setAttributes = function (ele, object) {
            var keys = Object.keys(object);
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                ele.setAttribute(key, object[key]);
            }
        };
        Selection.prototype.draggedRectMoved = function (chart, grabbedPoint, doDrawing, target) {
            var rect;
            if ((this.resizing || this.rectGrabbing) && (chart.allowMultiSelection)) {
                var r = this.dragRectArray[this.targetIndex];
                rect = new ej2_svg_base_1.Rect(r.x, r.y, r.width, r.height);
            }
            else {
                rect = new ej2_svg_base_1.Rect(this.rectPoints.x, this.rectPoints.y, this.rectPoints.width, this.rectPoints.height);
            }
            rect.x -= (grabbedPoint.x - chart.mouseX);
            rect.y -= (grabbedPoint.y - chart.mouseY);
            rect = helper_1.getDraggedRectLocation(rect.x, rect.y, rect.x + rect.width, rect.height + rect.y, chart.chartAxisLayoutPanel.seriesClipRect);
            if (doDrawing) {
                this.drawDraggingRect(chart, rect, target);
            }
            else {
                this.calculateDragSelectedElements(chart, rect);
            }
        };
        Selection.prototype.mouseLeave = function (event) {
            this.completeSelection(event.target, event.type);
        };
        Selection.prototype.completeSelection = function (target, eventType) {
            var chart = this.chart;
            if (chart.selectionMode === 'None') {
                return;
            }
            this.currentMode = chart.selectionMode;
            if ((this.dragging || this.resizing) && this.dragRect.width > 5 && this.dragRect.height > 5) {
                this.calculateDragSelectedElements(chart, this.dragRect);
            }
            else if (!(chart.allowMultiSelection) && this.rectGrabbing &&
                this.rectPoints.width && this.rectPoints.height) {
                this.draggedRectMoved(chart, this.dragRect);
            }
            else if (this.rectGrabbing && this.dragRectArray[this.targetIndex].width && this.dragRectArray[this.targetIndex].height) {
                this.draggedRectMoved(chart, this.dragRect);
            }
            if (chart.selectionMode === 'Lasso' && this.dragging && this.path) {
                if (this.path.indexOf('L') !== -1) {
                    if (!(chart.allowMultiSelection)) {
                        helper_1.getElement(this.lassoPath).setAttribute('d', this.path + 'Z');
                        this.pointChecking(helper_1.getElement(this.lassoPath));
                    }
                    else if (helper_1.getElement(this.lassoPath + this.count)) {
                        helper_1.getElement(this.lassoPath + this.count).setAttribute('d', this.path + 'Z');
                        this.pointChecking(helper_1.getElement(this.lassoPath + this.count));
                    }
                    if (this.dragging || this.resizing) {
                        this.calculateDragSelectedElements(chart, this.dragRect);
                    }
                }
            }
            this.dragging = false;
            this.rectGrabbing = false;
            this.resizing = false;
            this.removeDraggedElements(chart, target, eventType);
        };
        Selection.prototype.getDragRect = function (chart, seriesClipRect) {
            return helper_1.getDraggedRectLocation(chart.mouseDownX, chart.mouseDownY, chart.mouseX, chart.mouseY, seriesClipRect);
        };
        Selection.prototype.dragStart = function (chart, seriesClipRect, mouseDownX, mouseDownY, event) {
            var mode = chart.selectionMode;
            this.currentMode = chart.selectionMode;
            this.dragging = (mode.indexOf('Drag') > -1 || mode === 'Lasso') && (chart.isDoubleTap || !chart.isTouch) &&
                chart.chartAreaType !== 'PolarRadar';
            var target = event.target;
            this.path = undefined;
            if (this.dragging) {
                this.count = helper_1.getElement(this.multiRectGroup) ? (this.count + 1) : 0;
                this.dragRect = new ej2_svg_base_1.Rect(chart.mouseDownX, chart.mouseDownY, 0, 0);
                if (chart.mouseDownX < seriesClipRect.x || chart.mouseDownX > (seriesClipRect.x + seriesClipRect.width) ||
                    chart.mouseDownY < seriesClipRect.y || chart.mouseDownY > (seriesClipRect.y + seriesClipRect.height)) {
                    this.dragging = false;
                }
            }
            if (mode === 'Lasso') {
                for (var _i = 0, _a = chart.visibleSeries; _i < _a.length; _i++) {
                    var series = _a[_i];
                    if (series.visible) {
                        for (var _b = 0, _c = series.points; _b < _c.length; _b++) {
                            var point = _c[_b];
                            if (!(chart.allowMultiSelection)) {
                                point.isSelect = false;
                            }
                        }
                    }
                }
            }
            if (!(mode === 'Lasso')) {
                if (this.rectPoints && !(chart.allowMultiSelection)) {
                    this.dragRect = new ej2_svg_base_1.Rect(chart.mouseDownX, chart.mouseDownY, 0, 0);
                    this.resizingSelectionRect(chart, new helper_1.ChartLocation(mouseDownX, mouseDownY), true);
                    this.rectGrabbing = helper_1.withInBounds(mouseDownX, mouseDownY, this.rectPoints);
                }
                if ((chart.allowMultiSelection)) {
                    var index = this.getIndex(target.id);
                    this.targetIndex = this.isDragRect(target.id) ? index : undefined;
                    if (this.dragRectArray.length && this.isDragRect(target.id)) {
                        this.resizingSelectionRect(chart, new helper_1.ChartLocation(mouseDownX, mouseDownY), true, target);
                        this.rectGrabbing = helper_1.withInBounds(mouseDownX, mouseDownY, this.dragRectArray[index]);
                    }
                }
            }
        };
        Selection.prototype.isDragRect = function (id) {
            return id.indexOf('_ej2_drag_rect') > -1;
        };
        Selection.prototype.mouseMove = function (event) {
            var chart = this.chart;
            var target = event.target;
            var eventType = event.type;
            this.highlightChart(target, eventType);
            if (chart.selectionMode === 'None') {
                return;
            }
            if (eventType === 'touchmove' && (ej2_base_1.Browser.isIos || ej2_base_1.Browser.isIos7) && this.dragging && event.preventDefault) {
                event.preventDefault();
            }
            this.selectionAndDrag(chart, target, eventType);
        };
        Selection.prototype.highlightChart = function (target, eventType) {
            if (this.chart.highlightMode !== 'None') {
                if (!ej2_base_3.isNullOrUndefined(target)) {
                    if (target.id.indexOf('text') > 1) {
                        target = helper_1.getElement(target.id.replace('text', 'shape'));
                    }
                    if ((target).hasAttribute('class') && ((target).getAttribute('class').indexOf('highlight') > -1 ||
                        target.getAttribute('class').indexOf('selection') > -1)) {
                        return;
                    }
                    this.calculateSelectedElements(target, eventType);
                    if (this.chart.highlightModule.highlightDataIndexes && this.chart.highlightModule.highlightDataIndexes.length > 0 &&
                        target.id.indexOf("_chart_legend_") == -1 && target.id.indexOf("_Series_") == -1) {
                        this.removeLegendHighlightStyles();
                    }
                    return;
                }
            }
        };
        Selection.prototype.selectionAndDrag = function (chart, target, eventType) {
            var insideMoving = helper_1.withInBounds(chart.mouseX, chart.mouseY, chart.chartAxisLayoutPanel.seriesClipRect);
            if (insideMoving) {
                if (this.rectGrabbing && !this.resizing) {
                    this.draggedRectMoved(chart, this.dragRect, true, target);
                }
                else if (this.dragging && !this.resizing) {
                    if (chart.selectionMode === 'Lasso') {
                        this.getPath(chart.mouseDownX, chart.mouseDownY, chart.mouseX, chart.mouseY);
                        this.drawDraggingRect(chart, this.dragRect, target);
                    }
                    else {
                        this.dragRect = this.getDragRect(chart, chart.chartAxisLayoutPanel.seriesClipRect);
                        this.drawDraggingRect(chart, this.dragRect, target);
                    }
                }
                if (this.rectPoints && !(chart.allowMultiSelection)) {
                    this.resizingSelectionRect(chart, new helper_1.ChartLocation(chart.mouseX, chart.mouseY), null, target);
                }
                else if (((chart.allowMultiSelection) && !this.dragging) || this.resizing) {
                    this.resizingSelectionRect(chart, new helper_1.ChartLocation(chart.mouseX, chart.mouseY), null, target);
                }
            }
            else {
                this.completeSelection(target, eventType);
            }
        };
        Selection.prototype.removeLegendHighlightStyles = function () {
            this.chart.highlightModule.highlightDataIndexes = [];
            var elementCollection;
            for (var i = 0; i < this.chart.series.length; i++) {
                elementCollection = document.getElementsByClassName(this.generateStyle(this.chart.series[i]));
                if (this.selectedDataIndexes.length === 0) {
                    elementCollection = document.getElementsByClassName(this.generateStyle(this.chart.series[i]));
                    while (elementCollection.length > 0) {
                        var element = elementCollection[0];
                        if (element) {
                            this.removeSvgClass(element, element.getAttribute("class"));
                        }
                    }
                    elementCollection = document.getElementsByClassName(this.unselected);
                    while (elementCollection.length > 0) {
                        var element = elementCollection[0];
                        if (element) {
                            this.removeSvgClass(element, element.getAttribute("class"));
                        }
                    }
                }
                else {
                    elementCollection = document.getElementsByClassName(this.generateStyle(this.chart.series[i]));
                    while (elementCollection.length > 0) {
                        var element = elementCollection[0];
                        if (element) {
                            this.removeSvgClass(element, element.getAttribute("class"));
                            this.addSvgClass(element, this.unselected);
                        }
                    }
                }
            }
        };
        Selection.prototype.getPath = function (startX, startY, endX, endY) {
            if (this.dragging) {
                if (this.path) {
                    this.path = this.path + ' L' + endX + ' ' + endY;
                }
                else {
                    this.path = 'M ' + startX + ' ' + startY;
                }
            }
        };
        Selection.prototype.pointChecking = function (path) {
            var _this = this;
            var chart = this.chart;
            var element;
            var svgRect = helper_1.getElement(chart.svgId).getBoundingClientRect();
            var offsetX = chart.chartAxisLayoutPanel.seriesClipRect.x + Math.max(svgRect.left, 0);
            var offsetY = chart.chartAxisLayoutPanel.seriesClipRect.y + Math.max(svgRect.top, 0);
            this.multiDataIndexes[this.count] = [];
            for (var _i = 0, _a = chart.visibleSeries; _i < _a.length; _i++) {
                var series = _a[_i];
                series.points.filter(function (point) {
                    if (point.symbolLocations && point.symbolLocations.length) {
                        element = document.elementFromPoint(point.symbolLocations[0].x + offsetX, point.symbolLocations[0].y + offsetY);
                    }
                    if (element === path) {
                        point.isSelect = true;
                        if ((_this.chart.allowMultiSelection) && _this.currentMode === 'Lasso') {
                            _this.multiDataIndexes[_this.count][_this.seriesIndex] = point;
                            _this.seriesIndex++;
                        }
                    }
                    else if (!(chart.allowMultiSelection)) {
                        point.isSelect = false;
                    }
                });
            }
            this.seriesIndex = 0;
        };
        Selection.prototype.getModuleName = function () {
            return 'Selection';
        };
        Selection.prototype.destroy = function () {
            this.removeEventListener();
        };
        return Selection;
    }(selection_1.BaseSelection));
    exports.Selection = Selection;
});
