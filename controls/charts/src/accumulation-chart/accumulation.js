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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "@syncfusion/ej2-base", "@syncfusion/ej2-base", "@syncfusion/ej2-base", "../common/model/base", "./model/acc-base", "../common/model/theme", "../common/model/constants", "../common/model/constants", "../common/model/constants", "../common/legend/legend", "../common/utils/helper", "../common/utils/helper", "../common/utils/helper", "../common/utils/helper", "@syncfusion/ej2-svg-base", "../common/model/data", "./renderer/accumulation-base", "./renderer/pie-series", "./model/acc-base", "../common/utils/helper", "../common/utils/export"], function (require, exports, ej2_base_1, ej2_base_2, ej2_base_3, base_1, acc_base_1, theme_1, constants_1, constants_2, constants_3, legend_1, helper_1, helper_2, helper_3, helper_4, ej2_svg_base_1, data_1, accumulation_base_1, pie_series_1, acc_base_2, helper_5, export_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AccumulationChart = (function (_super) {
        __extends(AccumulationChart, _super);
        function AccumulationChart(options, element) {
            var _this = _super.call(this, options, element) || this;
            _this.animateselected = false;
            _this.explodeDistance = 0;
            _this.currentLegendIndex = 0;
            _this.currentPointIndex = 0;
            _this.previousTargetId = "";
            _this.isLegendClicked = false;
            _this.chartid = 57724;
            return _this;
        }
        AccumulationChart.prototype.animate = function (duration) {
            this.duration = duration ? duration : 700;
            this.animateselected = true;
            this.animateSeries = false;
            var temIndex = 0;
            var tempcolor = [];
            var tempindex = [];
            var tempindex1 = [];
            var currentSeries = this.visibleSeries[0];
            var datasource = [];
            datasource = currentSeries.dataSource;
            currentSeries.sumOfPoints = 0;
            if (currentSeries.points.length < Object.keys(currentSeries.dataSource).length) {
                this.refresh();
            }
            else if (currentSeries.points.length > Object.keys(currentSeries.dataSource).length) {
                var currentSeries_1 = this.visibleSeries[0];
                currentSeries_1.points = currentSeries_1.points.filter(function (entry1) {
                    entry1.visible = false;
                    tempindex.push(entry1.index);
                    tempcolor.push(entry1.color);
                    return (datasource).some(function (entry2) {
                        var accPoint = entry2;
                        if (entry1.x === accPoint.x) {
                            entry1.visible = true;
                            tempindex1.push(entry1.index);
                            entry1.index = temIndex;
                            temIndex++;
                        }
                        return entry1.x === accPoint.x;
                    });
                });
                var missing = tempindex.filter(function (item) { return tempindex1.indexOf(item) < 0; });
                var interval = tempindex.length - missing.length;
                for (var i = (tempindex.length - 1); i >= interval; i--) {
                    helper_3.removeElement('container_Series_0_Point_' + tempindex[i]);
                }
                for (var i = 0; i < currentSeries_1.points.length; i++) {
                    currentSeries_1.points[i].y = currentSeries_1.dataSource[i].y;
                    currentSeries_1.points[i].color = tempcolor[i];
                    currentSeries_1.sumOfPoints += currentSeries_1.dataSource[i].y;
                }
                this.redraw = this.enableAnimation;
                this.animateSeries = false;
                this.calculateBounds();
                this.renderElements();
            }
            else {
                for (var i = 0; i < currentSeries.points.length; i++) {
                    currentSeries.points[i].y = currentSeries.dataSource[i][currentSeries.yName];
                    currentSeries.points[i].color = currentSeries.dataSource[i][currentSeries.pointColorMapping] != null
                        ? currentSeries.dataSource[i][currentSeries.pointColorMapping] : currentSeries.points[i].color;
                    currentSeries.sumOfPoints += currentSeries.dataSource[i][currentSeries.yName];
                }
                this.redraw = this.enableAnimation;
                this.animateSeries = false;
                this.removeSvg();
                this.refreshPoints(currentSeries.points);
                this.renderElements();
            }
        };
        Object.defineProperty(AccumulationChart.prototype, "type", {
            get: function () {
                if (this.series && this.series.length) {
                    return this.series[0].type;
                }
                return 'Pie';
            },
            enumerable: true,
            configurable: true
        });
        AccumulationChart.prototype.preRender = function () {
            var blazor = 'Blazor';
            this.isBlazor = window[blazor];
            this.allowServerDataBinding = false;
            this.unWireEvents();
            this.element.setAttribute('tabindex', "0");
            this.element.setAttribute("class", this.element.getAttribute("class") + " e-accumulationchart-focused");
            this.setCulture();
            this.animateSeries = true;
            if (this.element.id === '') {
                var collection = document.getElementsByClassName('e-accumulationchart').length;
                this.element.id = 'acc_chart_' + this.chartid + '_' + collection;
            }
            helper_3.calculateSize(this);
            this.wireEvents();
            this.element.setAttribute('dir', this.enableRtl ? 'rtl' : '');
        };
        AccumulationChart.prototype.setTheme = function () {
            this.themeStyle = theme_1.getThemeColor(this.theme);
        };
        AccumulationChart.prototype.render = function () {
            var _this = this;
            if (this.element.className.indexOf('e-accumulationchart') === -1) {
                this.element.classList.add('e-accumulationchart');
            }
            var loadEventData = {
                chart: this.isBlazor ? {} : this,
                accumulation: this.isBlazor ? {} : this,
                theme: this.theme, name: constants_1.load, cancel: false
            };
            this.trigger(constants_1.load, loadEventData, function () {
                _this.theme = _this.isBlazor ? loadEventData.theme : _this.theme;
                _this.setTheme();
                _this.accBaseModule = new accumulation_base_1.AccumulationBase(_this);
                _this.pieSeriesModule = new pie_series_1.PieSeries(_this);
                _this.calculateVisibleSeries();
                _this.processData();
                _this.renderComplete();
                _this.allowServerDataBinding = true;
            });
        };
        AccumulationChart.prototype.unWireEvents = function () {
            var isIE11Pointer = ej2_base_2.Browser.isPointer;
            var start = ej2_base_2.Browser.touchStartEvent;
            var move = ej2_base_2.Browser.touchMoveEvent;
            var stop = ej2_base_2.Browser.touchEndEvent;
            var cancel = isIE11Pointer ? 'pointerleave' : 'mouseleave';
            ej2_base_2.EventHandler.remove(this.element, move, this.accumulationMouseMove);
            ej2_base_2.EventHandler.remove(this.element, stop, this.accumulationMouseEnd);
            ej2_base_2.EventHandler.remove(this.element, start, this.accumulationMouseStart);
            ej2_base_2.EventHandler.remove(this.element, 'click', this.accumulationOnMouseClick);
            ej2_base_2.EventHandler.remove(this.element, 'dblclick', this.accumulationOnDoubleClick);
            ej2_base_2.EventHandler.remove(this.element, 'contextmenu', this.accumulationRightClick);
            ej2_base_2.EventHandler.remove(this.element, cancel, this.accumulationMouseLeave);
            ej2_base_2.EventHandler.remove(this.element, "keydown", this.accumulationChartKeyDown);
            ej2_base_2.EventHandler.remove(document.body, 'keydown', this.documentKeyHandler);
            ej2_base_2.EventHandler.remove(this.element, "keyup", this.accumulationChartKeyUp);
            window.removeEventListener((ej2_base_2.Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.accumulationResizeBound);
        };
        AccumulationChart.prototype.wireEvents = function () {
            if (!this.element) {
                return;
            }
            var isIE11Pointer = ej2_base_2.Browser.isPointer;
            var start = ej2_base_2.Browser.touchStartEvent;
            var stop = ej2_base_2.Browser.touchEndEvent;
            var move = ej2_base_2.Browser.touchMoveEvent;
            var cancel = isIE11Pointer ? 'pointerleave' : 'mouseleave';
            ej2_base_2.EventHandler.add(this.element, move, this.accumulationMouseMove, this);
            ej2_base_2.EventHandler.add(this.element, stop, this.accumulationMouseEnd, this);
            ej2_base_2.EventHandler.add(this.element, start, this.accumulationMouseStart, this);
            ej2_base_2.EventHandler.add(this.element, 'click', this.accumulationOnMouseClick, this);
            ej2_base_2.EventHandler.add(this.element, 'dblclick', this.accumulationOnDoubleClick, this);
            ej2_base_2.EventHandler.add(this.element, 'contextmenu', this.accumulationRightClick, this);
            ej2_base_2.EventHandler.add(this.element, cancel, this.accumulationMouseLeave, this);
            ej2_base_2.EventHandler.add(this.element, "keydown", this.accumulationChartKeyDown, this);
            ej2_base_2.EventHandler.add(document.body, 'keydown', this.documentKeyHandler, this);
            ej2_base_2.EventHandler.add(this.element, "keyup", this.accumulationChartKeyUp, this);
            this.accumulationResizeBound = this.accumulationResize.bind(this);
            window.addEventListener((ej2_base_2.Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.accumulationResizeBound);
            new ej2_base_2.Touch(this.element);
            this.setStyle(this.element);
        };
        AccumulationChart.prototype.setMouseXY = function (e) {
            var pageX;
            var pageY;
            var svgRectElement = helper_4.getElement(this.element.id + '_svg');
            if (svgRectElement && this.element) {
                var svgRect = svgRectElement.getBoundingClientRect();
                var rect = this.element.getBoundingClientRect();
                if (e.type.indexOf('touch') > -1) {
                    this.isTouch = true;
                    var touchArg = e;
                    pageY = touchArg.changedTouches[0].clientY;
                    pageX = touchArg.changedTouches[0].clientX;
                }
                else {
                    this.isTouch = e.pointerType === 'touch' || e.pointerType === '2';
                    pageX = e.clientX;
                    pageY = e.clientY;
                }
                this.mouseY = (pageY - rect.top) - Math.max(svgRect.top - rect.top, 0);
                this.mouseX = (pageX - rect.left) - Math.max(svgRect.left - rect.left, 0);
            }
        };
        AccumulationChart.prototype.accumulationMouseEnd = function (e) {
            this.setMouseXY(e);
            this.trigger(constants_3.chartMouseUp, { target: e.target.id, x: this.mouseX, y: this.mouseY });
            if (this.isTouch) {
                this.titleTooltip(e, this.mouseX, this.mouseY, this.isTouch);
                if (this.accumulationDataLabelModule && this.visibleSeries[0].dataLabel.visible) {
                    this.accumulationDataLabelModule.move(e, this.mouseX, this.mouseY, this.isTouch);
                }
                if (this.accumulationLegendModule && this.legendSettings.visible) {
                    this.accumulationLegendModule.move(e);
                }
            }
            this.notify(ej2_base_2.Browser.touchEndEvent, e);
            return false;
        };
        AccumulationChart.prototype.accumulationMouseStart = function (e) {
            this.setMouseXY(e);
            this.trigger(constants_2.chartMouseDown, { target: e.target.id, x: this.mouseX, y: this.mouseY });
            return false;
        };
        AccumulationChart.prototype.accumulationResize = function () {
            var _this = this;
            this.animateSeries = false;
            var args = {
                accumulation: this.isBlazor ? {} : this,
                previousSize: new ej2_svg_base_1.Size(this.availableSize.width, this.availableSize.height),
                name: constants_3.resized,
                currentSize: new ej2_svg_base_1.Size(0, 0),
                chart: this.isBlazor ? {} : this
            };
            var beforeResizeArgs = { name: 'beforeResize', cancelResizedEvent: false };
            if (this.resizeTo) {
                clearTimeout(this.resizeTo);
            }
            this.trigger(constants_3.beforeResize, beforeResizeArgs);
            if (!beforeResizeArgs.cancelResizedEvent) {
                this.resizeTo = +setTimeout(function () {
                    if (_this.isDestroyed) {
                        clearTimeout(_this.resizeTo);
                        return;
                    }
                    helper_3.calculateSize(_this);
                    args.currentSize = _this.availableSize;
                    _this.trigger(constants_3.resized, args);
                    _this.refreshSeries();
                    _this.refreshChart();
                }, 500);
            }
            return false;
        };
        AccumulationChart.prototype.print = function (id) {
            var clippath = document.getElementById(this.element.id + '_Series_0').style.clipPath;
            document.getElementById(this.element.id + '_Series_0').style.clipPath = '';
            var exportChart = new export_1.ExportUtils(this);
            exportChart.print(id);
            document.getElementById(this.element.id + '_Series_0').style.clipPath = clippath;
        };
        AccumulationChart.prototype.export = function (type, fileName) {
            if (this.exportModule) {
                this.exportModule.export(type, fileName);
                if (this.afterExport) {
                    this.exportModule.getDataUrl(this);
                }
            }
        };
        AccumulationChart.prototype.setStyle = function (element) {
            element.style.touchAction = 'element';
            element.style.msTouchAction = 'element';
            element.style.msContentZooming = 'none';
            element.style.msUserSelect = 'none';
            element.style.webkitUserSelect = 'none';
            element.style.position = 'relative';
            element.style.display = 'block';
            var tabColor = '';
            switch (this.theme) {
                case "HighContrastLight":
                case "HighContrast":
                    tabColor = "#969696";
                    break;
                case "MaterialDark":
                case "FabricDark":
                case "BootstrapDark":
                case "Bootstrap4":
                    tabColor = "#66afe9";
                    break;
                case "Tailwind":
                case "TailwindDark":
                    tabColor = "#4f46e5";
                    break;
                case "Bootstrap5":
                case "Bootstrap5Dark":
                    tabColor = "#0d6efd";
                    break;
                case "Fluent":
                case "FluentDark":
                    tabColor = "#9e9e9e";
                    break;
                default:
                    tabColor = "#9e9e9e";
                    break;
            }
            var style = document.createElement('style');
            style.setAttribute('id', element.id + "Keyboard_accumulationchart_focus");
            style.innerHTML = '.e-accumulationchart-focused:focus,path[id*=_Series_0_Point_]:focus, text[id*=_title]:focus' +
                '{outline: none} .e-accumulationchart-focused:focus-visible,path[id*=_Series_0_Point_]:focus-visible, text[id*=_title]:focus-visible' +
                '{outline: 1.5px ' + tabColor + ' solid}';
            document.body.appendChild(style);
        };
        AccumulationChart.prototype.setAnnotationValue = function (annotationIndex, content) {
            var annotation = this.annotations[annotationIndex];
            var element;
            var parentNode = helper_4.getElement(this.element.id + '_Annotation_Collections');
            if (content) {
                annotation.content = content;
                if (parentNode) {
                    element = this.createElement('div');
                    helper_3.removeElement(this.element.id + '_Annotation_' + annotationIndex);
                    this.annotationModule.processAnnotation(annotation, annotationIndex, element);
                    parentNode.appendChild(element.children[0]);
                }
                else {
                    this.annotationModule.renderAnnotations(helper_4.getElement(this.element.id + '_Secondary_Element'));
                }
            }
        };
        AccumulationChart.prototype.accumulationMouseMove = function (e) {
            if (!helper_4.getElement(this.element.id + '_svg')) {
                return false;
            }
            this.setMouseXY(e);
            this.trigger(constants_3.chartMouseMove, { target: e.target.id, x: this.mouseX, y: this.mouseY });
            if (this.pointMove) {
                this.triggerPointEvent(constants_2.pointMove, e.target, e);
            }
            if (this.accumulationLegendModule && this.legendSettings.visible) {
                this.accumulationLegendModule.move(e);
            }
            if (this.accumulationDataLabelModule && this.visibleSeries[0] && this.visibleSeries[0].dataLabel.visible) {
                this.accumulationDataLabelModule.move(e, this.mouseX, this.mouseY);
            }
            if (!this.isTouch) {
                this.titleTooltip(e, this.mouseX, this.mouseY);
            }
            if (this.enableBorderOnMouseMove && this.type === 'Pie' && this.pieSeriesModule &&
                helper_3.withInBounds(this.mouseX, this.mouseY, this.initialClipRect)) {
                this.pieSeriesModule.findSeries(e);
            }
            this.notify(ej2_base_2.Browser.touchMoveEvent, e);
            return false;
        };
        AccumulationChart.prototype.titleTooltip = function (event, x, y, isTouch) {
            var targetId = event.target.id;
            var id = (targetId === (this.element.id + '_title') || targetId === (this.element.id + '_subTitle') ||
                targetId === (this.element.id + '_chart_legend_title'));
            if ((event.target.textContent.indexOf('...') > -1) && id) {
                var title = (targetId === (this.element.id + '_title')) ?
                    this.title : (targetId === (this.element.id + '_subTitle')) ? this.subTitle : this.legendSettings.title;
                helper_2.showTooltip(title, x, y, this.element.offsetWidth, this.element.id + '_EJ2_Title_Tooltip', helper_4.getElement(this.element.id + '_Secondary_Element'), isTouch);
            }
            else {
                helper_3.removeElement(this.element.id + '_EJ2_Title_Tooltip');
            }
        };
        AccumulationChart.prototype.accumulationChartKeyDown = function (e) {
            var actionKey = "";
            if (this.tooltip.enable && ((e.code == "Tab" && this.previousTargetId.indexOf("Series") > -1) || e.code === "Escape")) {
                actionKey = "ESC";
            }
            if (e.code.indexOf("Arrow") > -1) {
                e.preventDefault();
            }
            if (e.ctrlKey && (e.key === 'p')) {
                e.preventDefault();
                actionKey = "CtrlP";
            }
            if (actionKey != "")
                this.chartKeyboardNavigations(e, e.target.id, actionKey);
            return false;
        };
        AccumulationChart.prototype.accumulationChartKeyUp = function (e) {
            var actionKey = "";
            var targetId = e.target['id'];
            var legendElement = helper_4.getElement(this.element.id + "_chart_legend_translate_g");
            var pagingElement = helper_4.getElement(this.element.id + "_chart_legend_pageup");
            if (legendElement) {
                var firstChild = legendElement.firstElementChild;
                var className = firstChild.getAttribute("class");
                if (className && className.indexOf("e-accumulationchart-focused") === -1) {
                    className = className + " e-accumulationchart-focused";
                }
                else if (!className) {
                    className = "e-accumulationchart-focused";
                }
                firstChild.setAttribute("class", className);
            }
            if (pagingElement) {
                pagingElement.setAttribute("class", "e-accumulationchart-focused");
            }
            if (e.code == "Tab") {
                if (this.previousTargetId != "") {
                    if (this.previousTargetId.indexOf("_Point_") > -1 && targetId.indexOf("_Point_") == -1) {
                        var groupElement = document.getElementById(this.previousTargetId).parentElement;
                        this.setTabIndex(groupElement.children[this.currentPointIndex], groupElement.firstElementChild);
                        this.currentPointIndex = 0;
                    }
                    else if (this.previousTargetId.indexOf("_chart_legend_page") > -1 && targetId.indexOf("_chart_legend_page") == -1 &&
                        targetId.indexOf("_chart_legend_g_") == -1) {
                        this.setTabIndex(e.target, pagingElement);
                    }
                    else if (this.previousTargetId.indexOf("_chart_legend_g_") > -1 && targetId.indexOf("chart_legend_g_") == -1) {
                        this.setTabIndex(legendElement.children[this.currentLegendIndex], legendElement.firstElementChild);
                    }
                }
                this.previousTargetId = targetId;
                if (targetId.indexOf("_chart_legend_g_") > -1 && this.highlightMode != "None") {
                    targetId = e.target['lastElementChild'].id;
                    actionKey = "Tab";
                }
                else if (targetId.indexOf("_Point_") > -1 && (this.highlightMode != "None" || this.tooltip.enable)) {
                    actionKey = "Tab";
                }
            }
            else if (e.code.indexOf("Arrow") > -1) {
                e.preventDefault();
                if (targetId.indexOf("_chart_legend_page") > -1) {
                    e.target.removeAttribute("tabindex");
                    this.previousTargetId = targetId = this.element.id + "_chart_legend_page" + (e.code == "ArrowRight" ? "up" : "down");
                    this.focusTarget(helper_4.getElement(targetId));
                }
                else if ((targetId.indexOf("_chart_legend_") > -1)) {
                    e.target.removeAttribute("tabindex");
                    this.currentLegendIndex += (e.code == "ArrowUp" || e.code == "ArrowRight") ? +1 : -1;
                    this.currentLegendIndex = this.getActualIndex(this.currentLegendIndex, legendElement.children.length);
                    var currentLegend = legendElement.children[this.currentLegendIndex];
                    this.focusTarget(currentLegend);
                    this.previousTargetId = targetId = currentLegend.lastElementChild.id;
                    actionKey = this.highlightMode != "None" ? "ArrowMove" : "";
                }
                else if (targetId.indexOf("_Point_") > -1) {
                    e.target.removeAttribute("tabindex");
                    this.currentPointIndex += (e.code == "ArrowUp" || e.code == "ArrowRight") ? +1 : -1;
                    var totalLength = 0;
                    for (var i = 0; i < e.target['parentElement'].children.length; i++) {
                        totalLength = e.target['parentElement'].children[i].id.indexOf("_Point_") > -1 ? totalLength + 1 : totalLength;
                    }
                    this.currentPointIndex = this.getActualIndex(this.currentPointIndex, totalLength);
                    targetId = this.element.id + "_Series_0_Point_" + this.currentPointIndex;
                    this.focusTarget(helper_4.getElement(targetId));
                    actionKey = this.tooltip.enable ? "ArrowMove" : "";
                }
            }
            else if ((e.code == "Enter" || e.code == "Space") && ((targetId.indexOf("_chart_legend_") > -1) ||
                (targetId.indexOf("_Point_") > -1))) {
                targetId = (targetId.indexOf("_chart_legend_g") > -1) ? e.target['lastElementChild'].id : targetId;
                actionKey = "Enter";
            }
            if (actionKey !== "") {
                this.chartKeyboardNavigations(e, targetId, actionKey);
            }
            return false;
        };
        AccumulationChart.prototype.setTabIndex = function (previousElement, currentElement) {
            if (previousElement) {
                previousElement.removeAttribute("tabindex");
            }
            if (currentElement) {
                currentElement.setAttribute("tabindex", "0");
            }
        };
        AccumulationChart.prototype.getActualIndex = function (index, totalLength) {
            return index > totalLength - 1 ? 0 : (index < 0 ? totalLength - 1 : index);
        };
        AccumulationChart.prototype.focusTarget = function (element) {
            var className = element.getAttribute("class");
            element.setAttribute("tabindex", "0");
            if (className && className.indexOf("e-accumulationchart-focused") === -1) {
                className = className + " e-accumulationchart-focused";
            }
            else if (!className) {
                className = "e-accumulationchart-focused";
            }
            element.setAttribute("tabindex", "0");
            element.setAttribute("class", className);
            element.focus();
            return element.id;
        };
        AccumulationChart.prototype.documentKeyHandler = function (e) {
            if (e.altKey && e.keyCode === 74 && !ej2_base_3.isNullOrUndefined(this.element)) {
                this.element.focus();
            }
        };
        ;
        AccumulationChart.prototype.chartKeyboardNavigations = function (e, targetId, actionKey) {
            this.isLegendClicked = false;
            switch (actionKey) {
                case "Tab":
                case "ArrowMove":
                    if (this.accumulationHighlightModule) {
                    }
                    if (targetId.indexOf("_Point_") > -1) {
                        var seriesIndex = +(targetId.split("_Series_")[1].split("_Point_")[0]);
                        var pointIndex = +(targetId.split("_Series_")[1].replace("_Symbol", "").split("_Point_")[1]);
                        var pointRegion = this.visibleSeries[seriesIndex].points[pointIndex].symbolLocation;
                        this.mouseX = pointRegion.x + this.initialClipRect.x;
                        this.mouseY = pointRegion.y + this.initialClipRect.y;
                        if (this.accumulationHighlightModule) {
                            var targetElement = helper_4.getElement(targetId);
                            if (!ej2_base_3.isNullOrUndefined(targetElement)) {
                                if (targetElement.id.indexOf('text') > 1) {
                                    targetElement = helper_4.getElement(targetElement.id.replace('text', 'shape'));
                                }
                                if ((targetElement).hasAttribute('class') && (targetElement).getAttribute('class').indexOf('highlight') > -1) {
                                    return;
                                }
                                this.accumulationHighlightModule.calculateSelectedElements(this, targetElement, "mousemove");
                                return;
                            }
                        }
                        if (this.accumulationTooltipModule) {
                            var series = this.visibleSeries[seriesIndex];
                            var data = void 0;
                            if (series.enableTooltip) {
                                data = new helper_5.AccPointData(series.points[pointIndex], series);
                            }
                            this.accumulationTooltipModule.renderSeriesTooltip(this, data);
                        }
                    }
                    if (this.accumulationHighlightModule && this.highlightMode !== 'None') {
                        targetId = targetId.indexOf("_chart_legend_g_") > -1 ? document.getElementById(targetId).firstChild['id'] : targetId;
                        var legendID = this.element.id + '_chart_legend';
                        var legendItemsId = [legendID + '_text_', legendID + '_shape_marker_',
                            legendID + '_shape_'];
                        for (var i = 0; i < legendItemsId.length; i++) {
                            var id = legendItemsId[i];
                            if (targetId.indexOf(id) > -1) {
                                document.getElementById(targetId).setAttribute("class", "");
                                this.accumulationHighlightModule.legendSelection(this, 0, parseInt(targetId.split(id)[1], 10), helper_4.getElement(targetId), "mousemove");
                                break;
                            }
                        }
                    }
                    break;
                case "Enter":
                case "Space":
                    if (targetId.indexOf("_chart_legend_") > -1 && this.accumulationLegendModule) {
                        this.isLegendClicked = true;
                        this.accumulationLegendModule.click(e);
                        this.focusChild(document.getElementById(targetId).parentElement);
                    }
                    else {
                        if (this.accumulationSelectionModule) {
                            this.accumulationSelectionModule.calculateSelectedElements(this, document.getElementById(targetId), "click");
                        }
                    }
                    break;
                case "CtrlP":
                    this.print();
                    break;
                case "ESC":
                    if (this.accumulationTooltipModule) {
                        this.accumulationTooltipModule.removeTooltip(1);
                    }
                    break;
            }
        };
        AccumulationChart.prototype.focusChild = function (element) {
            element.setAttribute("tabindex", "0");
            var className = element.getAttribute("class");
            element.setAttribute("tabindex", "0");
            if (className && className.indexOf("e-accumulationchart-focused") === -1) {
                className = "e-accumulationchart-focused " + className;
            }
            else if (!className) {
                className = "e-accumulationchart-focused";
            }
            element.setAttribute("class", className);
            element.focus();
            return element.id;
        };
        AccumulationChart.prototype.accumulationOnDoubleClick = function (e) {
            this.trigger(constants_2.chartDoubleClick, { target: e.target.id, x: this.mouseX, y: this.mouseY });
            return false;
        };
        AccumulationChart.prototype.accumulationOnMouseClick = function (e) {
            this.setMouseXY(e);
            if (this.accumulationLegendModule && this.legendSettings.visible) {
                this.accumulationLegendModule.click(e);
            }
            if (this.selectionMode !== 'None' && this.accumulationSelectionModule) {
                this.accumulationSelectionModule.calculateSelectedElements(this, e.target, e.type);
            }
            if (this.visibleSeries[0].explode) {
                this.accBaseModule.processExplode(e);
            }
            if (this.enableBorderOnMouseMove && this.pieSeriesModule && this.type === 'Pie') {
                this.pieSeriesModule.findSeries(e);
            }
            this.trigger(constants_2.chartMouseClick, { target: e.target.id, x: this.mouseX, y: this.mouseY });
            if (this.pointClick) {
                this.triggerPointEvent(constants_1.pointClick, e.target, e);
            }
            return false;
        };
        AccumulationChart.prototype.triggerPointEvent = function (event, element, e) {
            var evt = e;
            var indexes = helper_1.indexFinder(element.id, true);
            if (indexes.series >= 0 && indexes.point >= 0) {
                this.trigger(event, {
                    series: this.isBlazor ? {} : this.series[indexes.series],
                    point: this.series[indexes.series].points[indexes.point],
                    seriesIndex: indexes.series, pointIndex: indexes.point,
                    x: this.mouseX, y: this.mouseY, pageX: evt.pageX, pageY: evt.pageY
                });
            }
        };
        AccumulationChart.prototype.accumulationRightClick = function (event) {
            if (event.buttons === 2 || event.pointerType === 'touch') {
                event.preventDefault();
                event.stopPropagation();
                return false;
            }
            return true;
        };
        AccumulationChart.prototype.accumulationMouseLeave = function (e) {
            this.setMouseXY(e);
            this.trigger(constants_3.chartMouseLeave, { target: e.target.id, x: this.mouseX, y: this.mouseY });
            this.notify(ej2_base_2.Browser.isPointer ? 'pointerleave' : 'mouseleave', e);
            var borderElement = document.getElementById(this.element.id + 'PointHover_Border');
            if (borderElement) {
                this.pieSeriesModule.removeBorder(borderElement, 1000);
                borderElement = null;
            }
            return false;
        };
        AccumulationChart.prototype.setCulture = function () {
            this.intl = new ej2_base_2.Internationalization();
        };
        AccumulationChart.prototype.createPieSvg = function () {
            this.removeSvg();
            helper_3.createSvg(this);
        };
        AccumulationChart.prototype.removeSvg = function () {
            if (this.redraw) {
                return null;
            }
            helper_1.blazorTemplatesReset(this);
            helper_3.removeElement(this.element.id + '_Secondary_Element');
            if (this.svgObject) {
                while (this.svgObject.childNodes.length > 0) {
                    this.svgObject.removeChild(this.svgObject.firstChild);
                }
                if (!this.svgObject.hasChildNodes() && this.svgObject.parentNode) {
                    ej2_base_3.remove(this.svgObject);
                }
            }
            helper_3.removeElement('EJ2_legend_tooltip');
            helper_3.removeElement('EJ2_datalabel_tooltip');
            helper_3.removeElement(this.element.id + 'PointHover_Border');
        };
        AccumulationChart.prototype.createSecondaryElement = function () {
            var element = helper_1.redrawElement(this.redraw, this.element.id + '_Secondary_Element') ||
                this.createElement('div', {
                    id: this.element.id + '_Secondary_Element',
                    styles: 'position: relative'
                });
            helper_1.appendChildElement(false, this.element, element, this.redraw);
        };
        AccumulationChart.prototype.calculateVisibleSeries = function () {
            this.visibleSeries = [];
            for (var i = 0, length_1 = this.series.length; i < length_1; i++) {
                this.series[i].index = i;
                if (this.series[i].type === this.type && this.visibleSeries.length === 0) {
                    this.visibleSeries.push(this.series[i]);
                    break;
                }
            }
        };
        AccumulationChart.prototype.processData = function (render) {
            if (render === void 0) { render = true; }
            this.seriesCounts = 0;
            for (var _i = 0, _a = this.visibleSeries; _i < _a.length; _i++) {
                var series = _a[_i];
                series.dataModule = new data_1.Data(series.dataSource || this.dataSource, series.query);
                series.refreshDataManager(this, render);
            }
        };
        AccumulationChart.prototype.refreshChart = function () {
            this.doGrouppingProcess();
            this.createPieSvg();
            this.calculateBounds();
            this.renderElements();
            helper_3.removeElement('chartmeasuretext');
        };
        AccumulationChart.prototype.doGrouppingProcess = function () {
            var series = this.visibleSeries[0];
            if (!ej2_base_3.isNullOrUndefined(series.resultData) && ((!ej2_base_3.isNullOrUndefined(series.lastGroupTo) &&
                series.lastGroupTo !== series.groupTo))) {
                series.getPoints(series.resultData, this);
            }
        };
        AccumulationChart.prototype.calculateBounds = function () {
            this.initialClipRect = new ej2_svg_base_1.Rect(this.margin.left, this.margin.top, this.availableSize.width, this.availableSize.height);
            this.titleCollection = [];
            this.subTitleCollection = [];
            var titleHeight = 0;
            var subTitleHeight = 0;
            var maxWidth = 0;
            var titleWidth = 0;
            this.titleCollection = helper_5.getTitle(this.title, this.titleStyle, this.initialClipRect.width);
            titleHeight = this.title ? ej2_svg_base_1.measureText(this.title, this.titleStyle).height * this.titleCollection.length : titleHeight;
            if (this.subTitle) {
                for (var _i = 0, _a = this.titleCollection; _i < _a.length; _i++) {
                    var titleText = _a[_i];
                    titleWidth = ej2_svg_base_1.measureText(titleText, this.titleStyle).width;
                    maxWidth = titleWidth > maxWidth ? titleWidth : maxWidth;
                }
                this.subTitleCollection = helper_5.getTitle(this.subTitle, this.subTitleStyle, maxWidth);
                subTitleHeight = (ej2_svg_base_1.measureText(this.subTitle, this.subTitleStyle).height * this.subTitleCollection.length);
            }
            helper_1.subtractRect(this.initialClipRect, new ej2_svg_base_1.Rect(0, (subTitleHeight + titleHeight), this.margin.right + this.margin.left, this.margin.bottom + this.margin.top));
            this.calculateLegendBounds();
        };
        AccumulationChart.prototype.calculateLegendBounds = function () {
            if (!this.accumulationLegendModule || !this.legendSettings.visible) {
                return null;
            }
            this.accumulationLegendModule.getLegendOptions(this, this.visibleSeries);
            this.accumulationLegendModule.calculateLegendBounds(this.initialClipRect, this.availableSize, null);
        };
        AccumulationChart.prototype.renderElements = function () {
            this.renderBorder();
            this.createSecondaryElement();
            this.renderSeries();
            this.renderTitle();
            this.renderLegend();
            helper_1.appendChildElement(false, this.element, this.svgObject, this.redraw);
            this.processSelection();
            this.processExplode();
            this.renderAnnotation();
            this.setSecondaryElementPosition();
            ej2_base_3.updateBlazorTemplate(this.element.id + '_DataLabel', 'Template', this.series[0].dataLabel);
            this.trigger('loaded', { accumulation: this.isBlazor ? {} : this, chart: this.isBlazor ? {} : this });
            this.animateSeries = false;
        };
        AccumulationChart.prototype.setSecondaryElementPosition = function () {
            var tooltipParent = helper_4.getElement(this.element.id + '_Secondary_Element');
            if (!tooltipParent) {
                return;
            }
            var rect = this.element.getBoundingClientRect();
            var svgRect = helper_4.getElement(this.element.id + '_svg').getBoundingClientRect();
            tooltipParent.style.left = Math.max(svgRect.left - rect.left, 0) + 'px';
            tooltipParent.style.top = Math.max(svgRect.top - rect.top, 0) + 'px';
        };
        AccumulationChart.prototype.renderAnnotation = function () {
            if (this.annotationModule) {
                this.annotationModule.renderAnnotations(helper_4.getElement(this.element.id + '_Secondary_Element'));
            }
        };
        AccumulationChart.prototype.processExplode = function () {
            if (this.redraw) {
                return null;
            }
            if (!this.visibleSeries[0].explode) {
                return null;
            }
            this.accBaseModule.invokeExplode();
        };
        AccumulationChart.prototype.renderSeries = function () {
            if (!this.redraw) {
                this.svgObject.appendChild(this.renderer.createGroup({ id: this.element.id + '_SeriesCollection' }));
            }
            for (var _i = 0, _a = this.visibleSeries; _i < _a.length; _i++) {
                var series = _a[_i];
                if (series.visible && this[(helper_3.firstToLowerCase(series.type) + 'SeriesModule')]) {
                    this[(helper_3.firstToLowerCase(series.type) + 'SeriesModule')].initProperties(this, series);
                    series.renderSeries(this, this.redraw);
                }
            }
        };
        AccumulationChart.prototype.renderBorder = function () {
            var padding = this.border.width;
            helper_1.appendChildElement(false, this.svgObject, this.renderer.drawRectangle(new helper_2.RectOption(this.element.id + '_border', this.background || this.themeStyle.background, this.border, 1, new ej2_svg_base_1.Rect(padding / 2, padding / 2, this.availableSize.width - padding, this.availableSize.height - padding))), this.redraw);
            var backGroundImage = this.backgroundImage;
            if (backGroundImage) {
                var image = new helper_2.ImageOption(this.availableSize.height - padding, this.availableSize.width - padding, backGroundImage, 0, 0, this.element.id + '_background', 'visible', 'none');
                helper_1.appendChildElement(false, this.svgObject, this.renderer.drawImage(image), this.redraw);
            }
        };
        AccumulationChart.prototype.renderLegend = function () {
            if (!this.accumulationLegendModule || !this.legendSettings.visible) {
                return null;
            }
            if (this.accumulationLegendModule.legendCollections.length) {
                if (this.visibleSeries[0].type === 'Pie') {
                    this.accumulationLegendModule.getSmartLegendLocation(this.visibleSeries[0].labelBound, this.accumulationLegendModule.legendBounds, this.margin);
                }
                this.accumulationLegendModule.renderLegend(this, this.legendSettings, this.accumulationLegendModule.legendBounds, this.redraw);
            }
        };
        AccumulationChart.prototype.processSelection = function () {
            var selectedDataIndexes = [];
            if (this.accumulationSelectionModule && this.selectionMode !== 'None') {
                selectedDataIndexes = ej2_base_3.extend([], this.accumulationSelectionModule.selectedDataIndexes, null, true);
                this.accumulationSelectionModule.invokeSelection(this);
            }
            if (this.accumulationHighlightModule && this.highlightMode !== 'None') {
                this.accumulationHighlightModule.invokeHighlight(this);
            }
            if (selectedDataIndexes.length > 0) {
                this.accumulationSelectionModule.selectedDataIndexes = selectedDataIndexes;
                this.accumulationSelectionModule.redrawSelection(this);
            }
        };
        AccumulationChart.prototype.renderTitle = function () {
            var margin = this.margin;
            if (!this.title) {
                return null;
            }
            var getAnchor = helper_1.getTextAnchor(this.titleStyle.textAlignment, this.enableRtl);
            var titleSize = ej2_svg_base_1.measureText(this.title, this.titleStyle);
            var padding = 20;
            var titleHeight = this.margin.top + (titleSize.height * 3 / 4);
            var legendHeight = this.accumulationLegendModule == undefined ? 0 : this.legendSettings.position == 'Top' ?
                this.accumulationLegendModule.legendBounds.height : 0;
            var explode = this.explodeDistance == 0 ? 0 : this.explodeDistance;
            var expodeValue = legendHeight != 0 ? 0 : explode / 2;
            var rect = new ej2_svg_base_1.Rect(margin.left, 0, this.availableSize.width - margin.left - margin.right, 0);
            var options = new ej2_svg_base_1.TextOption(this.element.id + '_title', helper_4.titlePositionX(rect, this.titleStyle), titleHeight, getAnchor, this.titleCollection, '', 'auto');
            options.x = parseInt(this.series[0].radius) >= 80 ? options.x : this.accBaseModule.center.x;
            options.y = parseInt(this.series[0].radius) >= 80 ? options.y : (this.accBaseModule.center.y - this.accBaseModule.radius - padding
                - titleHeight - legendHeight - expodeValue);
            if (this.series[0].type === 'Pie' && parseInt(this.series[0].radius) < 80) {
                options.x = (this.accBaseModule.center.x - (titleSize.width / 2)) < this.initialClipRect.x ?
                    (titleSize.width / 2) + this.initialClipRect.x :
                    (this.accBaseModule.center.x + (titleSize.width / 2)) > (this.initialClipRect.x + this.initialClipRect.width) ?
                        (this.initialClipRect.x + this.initialClipRect.width) - (titleSize.width / 2) - this.initialClipRect.x : options.x;
                options.y = options.y < (this.initialClipRect.y - legendHeight) ? (this.initialClipRect.y - legendHeight) : options.y;
            }
            var element = helper_3.textElement(this.renderer, options, this.titleStyle, this.titleStyle.color || this.themeStyle.chartTitle, this.svgObject, false, this.redraw);
            if (element) {
                element.setAttribute('aria-label', this.title);
                element.setAttribute('tabindex', "0");
                element.parentNode.insertBefore(element, this.svgObject.children[1]);
            }
            if (this.subTitle) {
                this.renderSubTitle(options);
            }
        };
        AccumulationChart.prototype.renderSubTitle = function (options) {
            var maxWidth = 0;
            var titleWidth = 0;
            var padding = 10;
            var alignment = this.titleStyle.textAlignment;
            var subTitleElementSize = ej2_svg_base_1.measureText(this.subTitle, this.subTitleStyle);
            for (var _i = 0, _a = this.titleCollection; _i < _a.length; _i++) {
                var titleText = _a[_i];
                titleWidth = ej2_svg_base_1.measureText(titleText, this.titleStyle).width;
                maxWidth = titleWidth > maxWidth ? titleWidth : maxWidth;
            }
            var rect = new ej2_svg_base_1.Rect(alignment === 'Center' ? (options.x - maxWidth / 2) : alignment === 'Far' ? options.x - maxWidth : options.x, 0, maxWidth, 0);
            var subTitleOption = new ej2_svg_base_1.TextOption(this.element.id + '_subTitle', helper_4.titlePositionX(rect, this.subTitleStyle), options.y * options.text.length + ((subTitleElementSize.height) * 3 / 4) + padding, helper_1.getTextAnchor(this.subTitleStyle.textAlignment, this.enableRtl), this.subTitleCollection, '', 'auto');
            helper_3.textElement(this.renderer, subTitleOption, this.subTitleStyle, this.subTitleStyle.color || this.themeStyle.chartTitle, this.svgObject, false, this.redraw);
        };
        AccumulationChart.prototype.getSeriesElement = function () {
            return this.svgObject.getElementsByTagName('g')[0];
        };
        AccumulationChart.prototype.refreshSeries = function () {
            for (var _i = 0, _a = this.visibleSeries; _i < _a.length; _i++) {
                var series = _a[_i];
                this.refreshPoints(series.points);
            }
        };
        AccumulationChart.prototype.refreshPoints = function (points) {
            for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
                var point = points_1[_i];
                point.labelPosition = null;
                point.labelRegion = null;
                point.labelVisible = true;
            }
        };
        AccumulationChart.prototype.getModuleName = function () {
            return 'accumulationchart';
        };
        AccumulationChart.prototype.destroy = function () {
            if (this.element) {
                this.unWireEvents();
                _super.prototype.destroy.call(this);
                this.element.classList.remove('e-accumulationchart');
                this.removeSvg();
                this.svgObject = null;
            }
        };
        AccumulationChart.prototype.requiredModules = function () {
            var modules = [];
            var enableAnnotation = false;
            modules.push({
                member: this.type + 'Series',
                args: [this]
            });
            if (this.legendSettings.visible) {
                modules.push({
                    member: 'AccumulationLegend',
                    args: [this]
                });
            }
            if (this.findDatalabelVisibility()) {
                modules.push({
                    member: 'AccumulationDataLabel',
                    args: [this]
                });
            }
            if (this.tooltip.enable) {
                modules.push({
                    member: 'AccumulationTooltip',
                    args: [this]
                });
            }
            if (this.selectionMode !== 'None') {
                modules.push({
                    member: 'AccumulationSelection',
                    args: [this]
                });
            }
            if (this.highlightMode !== 'None') {
                modules.push({
                    member: 'AccumulationHighlight',
                    args: [this]
                });
            }
            if (this.enableExport || this.allowExport) {
                modules.push({
                    member: 'Export',
                    args: [this]
                });
            }
            enableAnnotation = this.annotations.some(function (value) {
                return (value.content !== null);
            });
            if (enableAnnotation) {
                modules.push({
                    member: 'Annotation',
                    args: [this]
                });
            }
            return modules;
        };
        AccumulationChart.prototype.findDatalabelVisibility = function () {
            for (var _i = 0, _a = this.series; _i < _a.length; _i++) {
                var series = _a[_i];
                if (series.dataLabel.visible) {
                    return true;
                }
            }
            return false;
        };
        AccumulationChart.prototype.changeVisibleSeries = function (visibleSeries, index) {
            for (var _i = 0, visibleSeries_1 = visibleSeries; _i < visibleSeries_1.length; _i++) {
                var series = visibleSeries_1[_i];
                if (index === series.index) {
                    return series;
                }
            }
            return null;
        };
        AccumulationChart.prototype.getPersistData = function () {
            return '';
        };
        AccumulationChart.prototype.onPropertyChanged = function (newProp, oldProp) {
            var update = {
                refreshElements: false, refreshBounds: false
            };
            for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
                var prop = _a[_i];
                switch (prop) {
                    case 'theme':
                        this.animateSeries = true;
                        break;
                    case 'title':
                    case 'subTitle':
                    case 'height':
                    case 'width':
                    case 'margin':
                        update.refreshBounds = true;
                        break;
                    case 'titleStyle':
                        if (newProp.titleStyle && (newProp.titleStyle.size || newProp.titleStyle.textOverflow)) {
                            update.refreshBounds = true;
                        }
                        else {
                            update.refreshElements = true;
                        }
                        break;
                    case 'subTitleStyle':
                        if (newProp.subTitleStyle && (newProp.subTitleStyle.size || newProp.subTitleStyle.textOverflow)) {
                            update.refreshBounds = true;
                        }
                        else {
                            update.refreshElements = true;
                        }
                        break;
                    case 'legendSettings':
                        update.refreshBounds = true;
                        update.refreshElements = true;
                        break;
                    case 'dataSource':
                        this.processData(false);
                        update.refreshBounds = true;
                        break;
                    case 'series':
                        if (!this.animateselected) {
                            var len = this.series.length;
                            var seriesRefresh = false;
                            var series = void 0;
                            var blazorProp = void 0;
                            for (var i = 0; i < len; i++) {
                                series = newProp.series[i];
                                if (this.isBlazor && (series.startAngle || series.endAngle || series.explodeOffset || series.neckHeight ||
                                    series.neckWidth || series.radius || series.innerRadius || series.groupMode || series.emptyPointSettings)) {
                                    blazorProp = true;
                                }
                                if (newProp.series[i] && (newProp.series[i].dataSource || newProp.series[i].yName || newProp.series[i].xName ||
                                    newProp.series[i].dataLabel || blazorProp)) {
                                    ej2_base_3.extend(this.changeVisibleSeries(this.visibleSeries, i), series, null, true);
                                    seriesRefresh = true;
                                }
                                if (newProp.series[i] && !ej2_base_3.isNullOrUndefined(newProp.series[i].explodeIndex) && newProp.series[i].explodeIndex >= 0
                                    && newProp.series[i].explodeIndex !== oldProp.series[i].explodeIndex) {
                                    this.accBaseModule.explodePoints(newProp.series[i].explodeIndex, this);
                                    this.accBaseModule.deExplodeAll(newProp.series[i].explodeIndex, this.enableAnimation ? 300 : 0);
                                }
                                else if (newProp.series[i].explodeIndex < 0) {
                                    this.accBaseModule.deExplodeAll(newProp.series[i].explodeIndex, this.enableAnimation ? 300 : 0);
                                }
                            }
                            if (seriesRefresh) {
                                this.processData(false);
                                update.refreshBounds = true;
                            }
                        }
                        this.animateselected = false;
                        this.redraw = false;
                        break;
                    case 'locale':
                    case 'currencyCode':
                        _super.prototype.refresh.call(this);
                        break;
                    case 'background':
                    case 'border':
                    case 'annotations':
                    case 'enableSmartLabels':
                        update.refreshElements = true;
                        break;
                    case 'isMultiSelect':
                    case 'selectedDataIndexes':
                    case 'selectionMode':
                        if (this.accumulationSelectionModule) {
                            if (ej2_base_3.isNullOrUndefined(this.accumulationSelectionModule.selectedDataIndexes)) {
                                this.accumulationSelectionModule.invokeSelection(this);
                            }
                            else {
                                this.accumulationSelectionModule.redrawSelection(this);
                            }
                        }
                        break;
                }
            }
            if (!update.refreshBounds && update.refreshElements) {
                this.createPieSvg();
                this.renderElements();
            }
            else if (update.refreshBounds) {
                this.refreshSeries();
                this.createPieSvg();
                this.calculateBounds();
                this.renderElements();
            }
        };
        return AccumulationChart;
    }(ej2_base_1.Component));
    __decorate([
        ej2_base_1.Property(null)
    ], AccumulationChart.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], AccumulationChart.prototype, "height", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], AccumulationChart.prototype, "title", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], AccumulationChart.prototype, "backgroundImage", void 0);
    __decorate([
        ej2_base_1.Complex({}, acc_base_1.PieCenter)
    ], AccumulationChart.prototype, "center", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], AccumulationChart.prototype, "dataSource", void 0);
    __decorate([
        ej2_base_1.Complex(theme_1.Theme.chartTitleFont, base_1.Font)
    ], AccumulationChart.prototype, "titleStyle", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], AccumulationChart.prototype, "subTitle", void 0);
    __decorate([
        ej2_base_1.Complex(theme_1.Theme.chartSubTitleFont, base_1.Font)
    ], AccumulationChart.prototype, "subTitleStyle", void 0);
    __decorate([
        ej2_base_1.Complex({}, legend_1.LegendSettings)
    ], AccumulationChart.prototype, "legendSettings", void 0);
    __decorate([
        ej2_base_1.Complex({}, base_1.TooltipSettings)
    ], AccumulationChart.prototype, "tooltip", void 0);
    __decorate([
        ej2_base_1.Property('None')
    ], AccumulationChart.prototype, "selectionMode", void 0);
    __decorate([
        ej2_base_1.Property('None')
    ], AccumulationChart.prototype, "highlightMode", void 0);
    __decorate([
        ej2_base_1.Property('None')
    ], AccumulationChart.prototype, "selectionPattern", void 0);
    __decorate([
        ej2_base_1.Property('None')
    ], AccumulationChart.prototype, "highlightPattern", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], AccumulationChart.prototype, "enableBorderOnMouseMove", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], AccumulationChart.prototype, "isMultiSelect", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], AccumulationChart.prototype, "enableAnimation", void 0);
    __decorate([
        ej2_base_1.Collection([], base_1.Indexes)
    ], AccumulationChart.prototype, "selectedDataIndexes", void 0);
    __decorate([
        ej2_base_1.Complex({}, base_1.Margin)
    ], AccumulationChart.prototype, "margin", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], AccumulationChart.prototype, "enableSmartLabels", void 0);
    __decorate([
        ej2_base_1.Complex({ color: '#DDDDDD', width: 0 }, base_1.Border)
    ], AccumulationChart.prototype, "border", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], AccumulationChart.prototype, "background", void 0);
    __decorate([
        ej2_base_1.Collection([{}], acc_base_1.AccumulationSeries)
    ], AccumulationChart.prototype, "series", void 0);
    __decorate([
        ej2_base_1.Collection([{}], acc_base_2.AccumulationAnnotationSettings)
    ], AccumulationChart.prototype, "annotations", void 0);
    __decorate([
        ej2_base_1.Property('Material')
    ], AccumulationChart.prototype, "theme", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], AccumulationChart.prototype, "useGroupingSeparator", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], AccumulationChart.prototype, "enableExport", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], AccumulationChart.prototype, "allowExport", void 0);
    __decorate([
        ej2_base_2.Event()
    ], AccumulationChart.prototype, "loaded", void 0);
    __decorate([
        ej2_base_2.Event()
    ], AccumulationChart.prototype, "load", void 0);
    __decorate([
        ej2_base_2.Event()
    ], AccumulationChart.prototype, "seriesRender", void 0);
    __decorate([
        ej2_base_2.Event()
    ], AccumulationChart.prototype, "legendRender", void 0);
    __decorate([
        ej2_base_2.Event()
    ], AccumulationChart.prototype, "textRender", void 0);
    __decorate([
        ej2_base_2.Event()
    ], AccumulationChart.prototype, "tooltipRender", void 0);
    __decorate([
        ej2_base_2.Event()
    ], AccumulationChart.prototype, "pointRender", void 0);
    __decorate([
        ej2_base_2.Event()
    ], AccumulationChart.prototype, "annotationRender", void 0);
    __decorate([
        ej2_base_2.Event()
    ], AccumulationChart.prototype, "beforePrint", void 0);
    __decorate([
        ej2_base_2.Event()
    ], AccumulationChart.prototype, "chartMouseMove", void 0);
    __decorate([
        ej2_base_2.Event()
    ], AccumulationChart.prototype, "chartMouseClick", void 0);
    __decorate([
        ej2_base_2.Event()
    ], AccumulationChart.prototype, "chartDoubleClick", void 0);
    __decorate([
        ej2_base_2.Event()
    ], AccumulationChart.prototype, "pointClick", void 0);
    __decorate([
        ej2_base_2.Event()
    ], AccumulationChart.prototype, "pointMove", void 0);
    __decorate([
        ej2_base_2.Event()
    ], AccumulationChart.prototype, "animationComplete", void 0);
    __decorate([
        ej2_base_2.Event()
    ], AccumulationChart.prototype, "chartMouseDown", void 0);
    __decorate([
        ej2_base_2.Event()
    ], AccumulationChart.prototype, "chartMouseLeave", void 0);
    __decorate([
        ej2_base_2.Event()
    ], AccumulationChart.prototype, "chartMouseUp", void 0);
    __decorate([
        ej2_base_2.Event()
    ], AccumulationChart.prototype, "beforeResize", void 0);
    __decorate([
        ej2_base_2.Event()
    ], AccumulationChart.prototype, "resized", void 0);
    __decorate([
        ej2_base_2.Event()
    ], AccumulationChart.prototype, "afterExport", void 0);
    __decorate([
        ej2_base_2.Event()
    ], AccumulationChart.prototype, "selectionComplete", void 0);
    __decorate([
        ej2_base_1.Property('USD')
    ], AccumulationChart.prototype, "currencyCode", void 0);
    AccumulationChart = __decorate([
        ej2_base_1.NotifyPropertyChanges
    ], AccumulationChart);
    exports.AccumulationChart = AccumulationChart;
});
