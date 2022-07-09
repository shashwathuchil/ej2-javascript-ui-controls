define(["require", "exports", "../../smithchart/utils/utils", "@syncfusion/ej2-svg-base", "@syncfusion/ej2-base"], function (require, exports, utils_1, ej2_svg_base_1, ej2_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TooltipRender = (function () {
        function TooltipRender() {
        }
        TooltipRender.prototype.smithchartMouseMove = function (smithchart, e) {
            var touchArg;
            var pageX;
            var pageY;
            if (e.type === 'touchend' || e.type === 'touchmove') {
                touchArg = e;
                pageX = touchArg.changedTouches[0].clientX;
                pageY = touchArg.changedTouches[0].clientY;
                this.tooltipElement = undefined;
            }
            else {
                pageY = e.clientY;
                pageX = e.clientX;
            }
            this.setMouseXY(smithchart, pageX, pageY);
            for (var i = 0; i < smithchart.series.length; i++) {
                var series = smithchart.series[i];
                var seriesIndex = i;
                var closestPoint = new utils_1.ClosestPoint();
                closestPoint = this.closestPointXY(smithchart, this.mouseX, this.mouseY, series, seriesIndex);
                if (closestPoint.location && series.tooltip.visible && series.visibility === 'visible') {
                    this.createTooltip(smithchart, e, closestPoint.index, seriesIndex, series);
                    break;
                }
                else if (this.tooltipElement) {
                    if (this.tooltipElement.enable && !series.tooltip.template) {
                        this.tooltipElement.enable = false;
                    }
                    this.tooltipElement.fadeOut();
                }
            }
            return this.tooltipElement;
        };
        TooltipRender.prototype.setMouseXY = function (smithchart, pageX, pageY) {
            var svgRectElement = document.getElementById(smithchart.element.id + '_svg');
            if (smithchart.element && svgRectElement) {
                var rect = smithchart.element.getBoundingClientRect();
                var svgRect = svgRectElement.getBoundingClientRect();
                this.mouseX = (pageX - rect.left) - Math.max(svgRect.left - rect.left, 0);
                this.mouseY = (pageY - rect.top) - Math.max(svgRect.top - rect.top, 0);
            }
        };
        TooltipRender.prototype.createTooltip = function (smithchart, e, pointindex, seriesindex, series) {
            var _this = this;
            var currentPoint = series.points[pointindex];
            var pointX = currentPoint.resistance;
            var pointY = currentPoint.reactance;
            var tooltip = currentPoint.tooltip ? [currentPoint.tooltip] : null;
            var tooltipText = [pointX + ' ' + ':' + ' ' + '<b>' + pointY + '</b>'];
            var argsData = {
                cancel: false, name: 'tooltipRender',
                text: tooltip || tooltipText,
                headerText: '<b>' + series.name + '</b>',
                template: series.tooltip.template,
                point: currentPoint
            };
            var smithChartTooltipSuccess = function (argsData) {
                var markerHeight = smithchart.series[seriesindex].marker.height / 2;
                var div = document.getElementById(smithchart.element.id + '_smithchart_tooltip_div');
                if (ej2_base_1.isNullOrUndefined(div)) {
                    div = ej2_base_1.createElement('div', {
                        id: smithchart.element.id + '_smithchart_tooltip_div',
                        styles: 'pointer-events: none; position: absolute;z-index:1;'
                    });
                    document.getElementById(smithchart.element.id + '_Secondary_Element').appendChild(div);
                }
                _this.tooltipElement = new ej2_svg_base_1.Tooltip({
                    enable: true,
                    header: argsData.headerText,
                    content: argsData.text,
                    border: series.tooltip.border,
                    fill: series.tooltip.fill || smithchart.themeStyle.tooltipFill,
                    opacity: series.tooltip.opacity,
                    data: currentPoint,
                    template: argsData.template,
                    location: {
                        x: _this.locationX + smithchart.element.offsetLeft,
                        y: _this.locationY - markerHeight + smithchart.element.offsetTop
                    },
                    shared: false,
                    areaBounds: new utils_1.SmithchartRect(smithchart.bounds.x, smithchart.bounds.y, smithchart.bounds.width, smithchart.bounds.height),
                    palette: [series.fill || smithchart.seriesColors[seriesindex % smithchart.seriesColors.length]],
                    shapes: ['Circle'],
                    availableSize: smithchart.availableSize,
                    theme: smithchart.theme
                });
                _this.tooltipElement.opacity = smithchart.themeStyle.tooltipFillOpacity || _this.tooltipElement.opacity;
                _this.tooltipElement.textStyle.fontFamily = smithchart.themeStyle.fontFamily || 'Roboto, Segoe UI, Noto, Sans-serif';
                _this.tooltipElement.textStyle.opacity = smithchart.themeStyle.tooltipTextOpacity || _this.tooltipElement.textStyle.opacity;
                _this.tooltipElement.textStyle.color = smithchart.themeStyle.tooltipBoldLabel || _this.tooltipElement.textStyle.color;
                _this.tooltipElement.appendTo(div);
            };
            smithChartTooltipSuccess.bind(this, smithchart);
            smithchart.trigger('tooltipRender', argsData, smithChartTooltipSuccess);
        };
        TooltipRender.prototype.closestPointXY = function (smithchart, x, y, series, seriesindex) {
            var pointIndex;
            var chartPoint;
            var closePoint;
            for (var j = 0; j < series.points.length; j++) {
                chartPoint = smithchart.seriesrender.getLocation(seriesindex, j);
                this.locationX = chartPoint.x;
                this.locationY = chartPoint.y;
                pointIndex = j;
                var a = x - chartPoint.x;
                var b = y - chartPoint.y;
                var distance = Math.abs(Math.sqrt((a * a) + (b * b)));
                if (distance < series.marker.width) {
                    closePoint = chartPoint;
                    pointIndex = j;
                    break;
                }
            }
            return { location: closePoint, index: pointIndex };
        };
        TooltipRender.prototype.getModuleName = function () {
            return 'TooltipRender';
        };
        TooltipRender.prototype.destroy = function () {
        };
        return TooltipRender;
    }());
    exports.TooltipRender = TooltipRender;
});
