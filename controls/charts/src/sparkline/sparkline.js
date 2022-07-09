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
define(["require", "exports", "@syncfusion/ej2-base", "@syncfusion/ej2-base", "@syncfusion/ej2-base", "./model/base", "./model/base", "./utils/helper", "./rendering/sparkline-renderer", "./utils/helper"], function (require, exports, ej2_base_1, ej2_base_2, ej2_base_3, base_1, base_2, helper_1, sparkline_renderer_1, helper_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Sparkline = (function (_super) {
        __extends(Sparkline, _super);
        function Sparkline(options, element) {
            var _this = _super.call(this, options, element) || this;
            _this.isDevice = ej2_base_3.Browser.isDevice;
            _this.intervalDivs = [10, 5, 2, 1];
            return _this;
        }
        Sparkline.prototype.preRender = function () {
            this.allowServerDataBinding = false;
            this.unWireEvents();
            this.trigger('load', { sparkline: this });
            this.sparkTheme = helper_2.getThemeColor(this.theme);
            this.sparklineRenderer = new sparkline_renderer_1.SparklineRenderer(this);
            this.createSVG();
            this.wireEvents();
            this.setCulture();
        };
        Sparkline.prototype.render = function () {
            this.sparklineRenderer.processDataManager();
            this.renderComplete();
            this.allowServerDataBinding = true;
        };
        Sparkline.prototype.processSparklineData = function () {
            this.sparklineRenderer.processData();
            this.renderSparkline();
            this.element.appendChild(this.svgObject);
            this.setSecondaryElementPosition();
            this.trigger('loaded', { sparkline: this });
        };
        Sparkline.prototype.renderSparkline = function () {
            this.renderBorder();
            this.createDiv();
            this.sparklineRenderer.renderSeries();
        };
        Sparkline.prototype.createDiv = function () {
            var tooltipDiv = document.createElement('div');
            tooltipDiv.id = this.element.id + '_Secondary_Element';
            tooltipDiv.style.position = 'relative';
            this.element.appendChild(tooltipDiv);
            this.element.style.display = 'block';
            this.element.style.position = 'relative';
        };
        Sparkline.prototype.setSecondaryElementPosition = function () {
            var element = helper_1.getIdElement(this.element.id + '_Secondary_Element');
            if (!element) {
                return;
            }
            var rect = this.element.getBoundingClientRect();
            var svgRect = helper_1.getIdElement(this.element.id + '_svg').getBoundingClientRect();
            element.style.left = Math.max(svgRect.left - rect.left, 0) + 'px';
            element.style.top = Math.max(svgRect.top - rect.top, 0) + 'px';
        };
        Sparkline.prototype.renderBorder = function () {
            var width = this.containerArea.border.width;
            var borderRect;
            if (width > 0 || this.containerArea.background !== 'transparent') {
                borderRect = new helper_1.RectOption(this.element.id + '_SparklineBorder', this.sparkTheme.background, this.containerArea.border, 1, new helper_1.Rect(width / 2, width / 2, this.availableSize.width - width, this.availableSize.height - width));
                this.svgObject.appendChild(helper_1.drawRectangle(this, borderRect));
            }
            var padding = this.padding;
            if (this.markerSettings.visible.length) {
                padding.left = 0;
                padding.right = 0;
                padding.bottom = 0;
                padding.top = 0;
            }
            borderRect = new helper_1.RectOption(this.element.id + '_sparkline_clip_rect', 'transparent', { color: 'transparent', width: 0 }, 1, new helper_1.Rect(padding.left, padding.top, this.availableSize.width - (padding.left + padding.right), this.availableSize.height - (padding.top + padding.bottom)));
            var clipPath = this.renderer.createClipPath({ id: this.element.id + '_sparkline_clip_path' });
            helper_1.drawRectangle(this, borderRect, clipPath);
            this.svgObject.appendChild(clipPath);
        };
        Sparkline.prototype.createSVG = function () {
            this.removeSvg();
            helper_1.createSvg(this);
        };
        Sparkline.prototype.removeSvg = function () {
            if (this.svgObject) {
                while (this.svgObject.childNodes.length > 0) {
                    this.svgObject.removeChild(this.svgObject.firstChild);
                }
                if (!this.svgObject.hasChildNodes() && this.svgObject.parentNode) {
                    ej2_base_2.remove(this.svgObject);
                }
            }
            helper_1.removeElement(this.element.id + '_Secondary_Element');
            if (this.sparklineTooltipModule) {
                this.sparklineTooltipModule.removeTooltipElements();
            }
        };
        Sparkline.prototype.setCulture = function () {
            this.intl = new ej2_base_2.Internationalization();
            this.localeObject = new ej2_base_2.L10n(this.getModuleName(), this.defaultLocalConstants, this.locale);
        };
        Sparkline.prototype.requiredModules = function () {
            var modules = [];
            if (this.tooltipSettings.visible || this.tooltipSettings.trackLineSettings.visible) {
                modules.push({
                    member: 'SparklineTooltip',
                    args: [this]
                });
            }
            return modules;
        };
        Sparkline.prototype.unWireEvents = function () {
            var move = ej2_base_3.Browser.touchMoveEvent;
            var cancel = ej2_base_3.Browser.isPointer ? 'pointerleave' : 'mouseleave';
            ej2_base_3.EventHandler.remove(this.element, ej2_base_3.Browser.touchMoveEvent, this.sparklineMove);
            ej2_base_3.EventHandler.remove(this.element, cancel, this.sparklineMouseLeave);
            ej2_base_3.EventHandler.remove(this.element, ej2_base_3.Browser.touchEndEvent, this.sparklineMouseEnd);
            window.removeEventListener((ej2_base_3.Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.sparklineResize);
        };
        Sparkline.prototype.wireEvents = function () {
            var cancel = ej2_base_3.Browser.isPointer ? 'pointerleave' : 'mouseleave';
            ej2_base_3.EventHandler.add(this.element, ej2_base_3.Browser.touchMoveEvent, this.sparklineMove, this);
            ej2_base_3.EventHandler.add(this.element, 'click', this.sparklineClick, this);
            ej2_base_3.EventHandler.add(this.element, cancel, this.sparklineMouseLeave, this);
            ej2_base_3.EventHandler.add(this.element, ej2_base_3.Browser.touchEndEvent, this.sparklineMouseEnd, this);
            window.addEventListener((ej2_base_3.Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.sparklineResize.bind(this));
            new ej2_base_3.Touch(this.element);
        };
        Sparkline.prototype.sparklineResize = function (e) {
            var _this = this;
            var args = {
                name: 'resize',
                previousSize: this.availableSize,
                sparkline: this,
                currentSize: new helper_1.Size(0, 0)
            };
            if (this.resizeTo) {
                clearTimeout(this.resizeTo);
            }
            this.resizeTo = +setTimeout(function () {
                if (_this.isDestroyed) {
                    clearTimeout(_this.resizeTo);
                    return;
                }
                _this.unWireEvents();
                _this.createSVG();
                _this.refreshing = true;
                _this.wireEvents();
                args.currentSize = _this.availableSize;
                _this.trigger('resize', args);
                _this.render();
            }, 500);
            return false;
        };
        Sparkline.prototype.sparklineMove = function (e) {
            this.setSparklineMouseXY(e);
            this.notify(ej2_base_3.Browser.touchMoveEvent, e);
            var args = {
                name: 'sparklineMouseMove', cancel: false,
                sparkline: this, event: e
            };
            this.trigger(args.name, args);
            var pointClick = this.isPointRegion(e);
            if (pointClick.isPointRegion) {
                var pointArgs = {
                    name: 'pointRegionMouseMove', cancel: false,
                    event: e, sparkline: this,
                    pointIndex: pointClick.pointIndex
                };
                this.trigger(pointArgs.name, pointArgs);
            }
            return false;
        };
        Sparkline.prototype.sparklineClick = function (e) {
            this.setSparklineMouseXY(e);
            var args = {
                name: 'sparklineMouseClick', cancel: false,
                sparkline: this, event: e
            };
            this.trigger(args.name, args);
            var pointClick = this.isPointRegion(e);
            if (pointClick.isPointRegion) {
                var pointArgs = {
                    name: 'pointRegionMouseClick', cancel: false,
                    event: e, sparkline: this,
                    pointIndex: pointClick.pointIndex
                };
                this.trigger(pointArgs.name, pointArgs);
            }
            return false;
        };
        Sparkline.prototype.isPointRegion = function (e) {
            var _this = this;
            var startId = this.element.id + '_';
            var id = e.target.id.replace(startId, '').split('_');
            if (id[1] === this.type.toLowerCase()) {
                var index_1 = parseInt(id[2], 10);
                if ((ej2_base_2.isNullOrUndefined(index_1) || isNaN(index_1)) && (this.type === 'Line' || this.type === 'Area')) {
                    this.sparklineRenderer.visiblePoints.forEach(function (point, i) {
                        if (helper_1.withInBounds(_this.mouseX, _this.mouseY, new helper_1.Rect(point.x - 5, point.y - 5, 10, 10))) {
                            index_1 = i;
                            return;
                        }
                    });
                }
                return { isPointRegion: true, pointIndex: index_1 };
            }
            return { isPointRegion: false, pointIndex: null };
        };
        Sparkline.prototype.sparklineMouseEnd = function (e) {
            this.setSparklineMouseXY(e);
            this.notify(ej2_base_3.Browser.touchEndEvent, e);
            return false;
        };
        Sparkline.prototype.sparklineMouseLeave = function (e) {
            this.setSparklineMouseXY(e);
            this.notify(ej2_base_3.Browser.isPointer ? 'pointerleave' : 'mouseleave', e);
            return false;
        };
        Sparkline.prototype.setSparklineMouseXY = function (e) {
            var pageY;
            var pageX;
            if (e.type.indexOf('touch') > -1) {
                this.isTouch = true;
                var touchArg = e;
                pageX = touchArg.changedTouches[0].clientX;
                pageY = touchArg.changedTouches[0].clientY;
            }
            else {
                this.isTouch = e.pointerType === 'touch' || e.pointerType === '2';
                pageY = e.clientY;
                pageX = e.clientX;
            }
            var rect = this.element.getBoundingClientRect();
            var svgRect = helper_1.getIdElement(this.element.id + '_svg').getBoundingClientRect();
            this.mouseY = (pageY - rect.top) - Math.max(svgRect.top - rect.top, 0);
            this.mouseX = (pageX - rect.left) - Math.max(svgRect.left - rect.left, 0);
        };
        Sparkline.prototype.onPropertyChanged = function (newProp, oldProp) {
            var render = false;
            var refresh = false;
            for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
                var prop = _a[_i];
                switch (prop) {
                    case 'xName':
                    case 'yName':
                    case 'axisSettings':
                    case 'rangeBandSettings':
                    case 'type':
                    case 'valueType':
                    case 'enableRtl':
                        refresh = true;
                        break;
                    case 'dataSource':
                        refresh = true;
                        break;
                    case 'border':
                    case 'markerSettings':
                    case 'dataLabelSettings':
                    case 'tooltipSettings':
                    case 'startPointColor':
                    case 'highPointColor':
                    case 'lowPointColor':
                    case 'endPointColor':
                    case 'negativePointColor':
                    case 'theme':
                        render = true;
                        break;
                }
            }
            if (refresh) {
                this.createSVG();
                this.sparklineRenderer.processData();
                this.refreshSparkline();
            }
            else if (render) {
                this.createSVG();
                this.refreshSparkline();
            }
        };
        Sparkline.prototype.refreshSparkline = function () {
            this.renderSparkline();
            this.element.appendChild(this.svgObject);
            this.setSecondaryElementPosition();
        };
        Sparkline.prototype.getModuleName = function () {
            return 'sparkline';
        };
        Sparkline.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
        };
        Sparkline.prototype.getPersistData = function () {
            return '';
        };
        return Sparkline;
    }(ej2_base_1.Component));
    __decorate([
        ej2_base_1.Property(null)
    ], Sparkline.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Sparkline.prototype, "height", void 0);
    __decorate([
        ej2_base_1.Complex({}, base_1.SparklineBorder)
    ], Sparkline.prototype, "border", void 0);
    __decorate([
        ej2_base_1.Property('Line')
    ], Sparkline.prototype, "type", void 0);
    __decorate([
        ej2_base_1.Property('None')
    ], Sparkline.prototype, "rangePadding", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Sparkline.prototype, "dataSource", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Sparkline.prototype, "query", void 0);
    __decorate([
        ej2_base_1.Property('Numeric')
    ], Sparkline.prototype, "valueType", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Sparkline.prototype, "xName", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Sparkline.prototype, "yName", void 0);
    __decorate([
        ej2_base_1.Property('#00bdae')
    ], Sparkline.prototype, "fill", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], Sparkline.prototype, "highPointColor", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], Sparkline.prototype, "lowPointColor", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], Sparkline.prototype, "startPointColor", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], Sparkline.prototype, "endPointColor", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], Sparkline.prototype, "negativePointColor", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], Sparkline.prototype, "tiePointColor", void 0);
    __decorate([
        ej2_base_1.Property([])
    ], Sparkline.prototype, "palette", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], Sparkline.prototype, "lineWidth", void 0);
    __decorate([
        ej2_base_1.Property(1)
    ], Sparkline.prototype, "opacity", void 0);
    __decorate([
        ej2_base_1.Property(null)
    ], Sparkline.prototype, "format", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], Sparkline.prototype, "useGroupingSeparator", void 0);
    __decorate([
        ej2_base_1.Complex({}, base_1.SparklineTooltipSettings)
    ], Sparkline.prototype, "tooltipSettings", void 0);
    __decorate([
        ej2_base_1.Complex({}, base_1.ContainerArea)
    ], Sparkline.prototype, "containerArea", void 0);
    __decorate([
        ej2_base_3.Collection([], base_2.RangeBandSettings)
    ], Sparkline.prototype, "rangeBandSettings", void 0);
    __decorate([
        ej2_base_1.Complex({}, base_1.AxisSettings)
    ], Sparkline.prototype, "axisSettings", void 0);
    __decorate([
        ej2_base_1.Complex({}, base_1.SparklineMarkerSettings)
    ], Sparkline.prototype, "markerSettings", void 0);
    __decorate([
        ej2_base_1.Complex({}, base_2.SparklineDataLabelSettings)
    ], Sparkline.prototype, "dataLabelSettings", void 0);
    __decorate([
        ej2_base_1.Complex({}, base_1.Padding)
    ], Sparkline.prototype, "padding", void 0);
    __decorate([
        ej2_base_1.Property('Material')
    ], Sparkline.prototype, "theme", void 0);
    __decorate([
        ej2_base_2.Event()
    ], Sparkline.prototype, "loaded", void 0);
    __decorate([
        ej2_base_2.Event()
    ], Sparkline.prototype, "load", void 0);
    __decorate([
        ej2_base_2.Event()
    ], Sparkline.prototype, "tooltipInitialize", void 0);
    __decorate([
        ej2_base_2.Event()
    ], Sparkline.prototype, "seriesRendering", void 0);
    __decorate([
        ej2_base_2.Event()
    ], Sparkline.prototype, "axisRendering", void 0);
    __decorate([
        ej2_base_2.Event()
    ], Sparkline.prototype, "pointRendering", void 0);
    __decorate([
        ej2_base_2.Event()
    ], Sparkline.prototype, "pointRegionMouseMove", void 0);
    __decorate([
        ej2_base_2.Event()
    ], Sparkline.prototype, "pointRegionMouseClick", void 0);
    __decorate([
        ej2_base_2.Event()
    ], Sparkline.prototype, "sparklineMouseMove", void 0);
    __decorate([
        ej2_base_2.Event()
    ], Sparkline.prototype, "sparklineMouseClick", void 0);
    __decorate([
        ej2_base_2.Event()
    ], Sparkline.prototype, "dataLabelRendering", void 0);
    __decorate([
        ej2_base_2.Event()
    ], Sparkline.prototype, "markerRendering", void 0);
    __decorate([
        ej2_base_2.Event()
    ], Sparkline.prototype, "resize", void 0);
    Sparkline = __decorate([
        ej2_base_1.NotifyPropertyChanges
    ], Sparkline);
    exports.Sparkline = Sparkline;
});
