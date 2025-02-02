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
define(["require", "exports", "@syncfusion/ej2-svg-base", "../../common/utils/helper", "../renderer/pie-base", "@syncfusion/ej2-base"], function (require, exports, ej2_svg_base_1, helper_1, pie_base_1, ej2_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PieSeries = (function (_super) {
        __extends(PieSeries, _super);
        function PieSeries() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PieSeries.prototype.renderPoint = function (point, series, chart, option, seriesGroup, redraw) {
            var sum = series.sumOfPoints;
            point.startAngle = this.startAngle;
            var yValue = point.visible ? point.y : 0;
            var degree = (sum) ? ((Math.abs(yValue) / sum) * (this.totalAngle)) : null;
            var start = Math.PI / 180 * ((90 - (360 - this.startAngle)) - 90);
            this.radius = this.isRadiusMapped ? helper_1.stringToNumber(point.sliceRadius, this.seriesRadius) : this.radius;
            option.d = this.getPathOption(point, degree, this.startAngle % 360);
            point.midAngle = (this.startAngle - (degree / 2)) % 360;
            point.endAngle = this.startAngle % 360;
            point.symbolLocation = helper_1.degreeToLocation(point.midAngle, (this.radius + this.innerRadius) / 2, this.center);
            if (!redraw) {
                var element = chart.renderer.drawPath(option);
                element.setAttribute("tabindex", point.index === 0 ? "0" : "");
                seriesGroup.appendChild(element);
                point.degree = degree;
                point.start = start;
            }
            else {
                var element = chart.renderer.drawPath(option);
                element.setAttribute("tabindex", point.index === 0 ? "0" : "");
                seriesGroup.appendChild(element);
                this.refresh(point, degree, start, chart, option);
            }
        };
        PieSeries.prototype.findSeries = function (e) {
            var borderGap = 3;
            var width = 2;
            var radius = this.innerRadius === 0 ? this.radius + borderGap : this.innerRadius - borderGap;
            var innerRadius = this.innerRadius === 0 ? radius + width : radius - width;
            this.toggleInnerPoint(e, radius, innerRadius);
        };
        PieSeries.prototype.toggleInnerPoint = function (event, radius, innerRadius) {
            var target = event.target;
            var id = helper_1.indexFinder(target.id, true);
            var accumulationId = event.target.id.substring(0, (event.target.id.indexOf('Series') - 1));
            var borderElement = document.getElementById(this.accumulation.element.id + 'PointHover_Border');
            var createBorderEle;
            var seriesIndex = id.series;
            var pointIndex = id.point;
            var srcElem = helper_1.getElement(accumulationId + '_Series_' + seriesIndex + '_Point_' + pointIndex);
            if (!isNaN(id.series) && srcElem) {
                if (!ej2_base_1.isNullOrUndefined(seriesIndex) && !isNaN(seriesIndex) && !ej2_base_1.isNullOrUndefined(pointIndex) && !isNaN(pointIndex)) {
                    var point = this.accumulation.visibleSeries[0].points[pointIndex];
                    var opacity = srcElem.getAttribute('class') === accumulationId + '_ej2_deselected' ?
                        this.accumulation.tooltip.enable ? 0.5 : 0.3 : this.accumulation.tooltip.enable ? 0.5 : 1;
                    var innerPie = this.getPathArc(this.accumulation.pieSeriesModule.center, point.startAngle % 360, (point.startAngle + point.degree) % 360, radius, innerRadius);
                    if ((borderElement) && (accumulationId === this.accumulation.element.id) &&
                        (borderElement.getAttribute('d') !== innerPie || point.isExplode)) {
                        borderElement.parentNode.removeChild(borderElement);
                        borderElement = null;
                    }
                    var seriousGroup = helper_1.getElement(accumulationId + '_Series_' + seriesIndex);
                    if (!borderElement && ((!point.isExplode) || (point.isExplode && event.type !== 'click'))) {
                        var path = new ej2_svg_base_1.PathOption(accumulationId + 'PointHover_Border', point.color, 1, point.color, opacity, '', innerPie);
                        createBorderEle = this.accumulation.renderer.drawPath(path);
                        createBorderEle.removeAttribute('transform');
                        if (this.accumulation.selectionMode !== 'None' && event.target.hasAttribute('class')) {
                            this.accumulation.accumulationSelectionModule.addSvgClass(createBorderEle, event.target.getAttribute('class'));
                        }
                        seriousGroup.appendChild(createBorderEle);
                        if (point.isExplode && createBorderEle) {
                            var borderExplode = srcElem.getAttribute('transform');
                            createBorderEle.setAttribute('transform', borderExplode);
                        }
                    }
                }
            }
            else if (borderElement) {
                this.removeBorder(borderElement, 1000);
                borderElement = null;
            }
        };
        PieSeries.prototype.removeBorder = function (borderElement, duration) {
            if (borderElement) {
                setTimeout(function () {
                    if (borderElement.parentNode) {
                        borderElement.parentNode.removeChild(borderElement);
                    }
                }, duration);
            }
        };
        PieSeries.prototype.refresh = function (point, degree, start, chart, option) {
            var _this = this;
            var seriesElement = helper_1.getElement(option.id);
            var duration = chart.duration ? chart.duration : 300;
            new ej2_base_1.Animation({}).animate(ej2_base_1.createElement('div'), {
                duration: duration,
                delay: 0,
                progress: function (args) {
                    var curentDegree = helper_1.linear(args.timeStamp, point.degree, (degree - point.degree), args.duration);
                    var currentStartAngle = helper_1.linear(args.timeStamp, point.start, start - point.start, args.duration);
                    currentStartAngle = ((currentStartAngle / (Math.PI / 180)) + 360) % 360;
                    seriesElement.setAttribute('d', _this.getPathOption(point, curentDegree, currentStartAngle));
                    if (point.isExplode) {
                        chart.accBaseModule.explodePoints(point.index, chart, true);
                    }
                    seriesElement.style.visibility = 'visible';
                },
                end: function () {
                    seriesElement.style.visibility = point.visible ? 'visible' : 'hidden';
                    seriesElement.setAttribute('d', option.d);
                    point.degree = degree;
                    point.start = start;
                }
            });
        };
        PieSeries.prototype.getPathOption = function (point, degree, startAngle) {
            if (!degree) {
                return '';
            }
            var path = this.getPathArc(this.center, startAngle % 360, (startAngle + degree) % 360, this.isRadiusMapped ? helper_1.stringToNumber(point.sliceRadius, this.seriesRadius) : this.radius, this.innerRadius);
            this.startAngle += degree;
            return path;
        };
        PieSeries.prototype.animateSeries = function (accumulation, option, series, slice) {
            var groupId = accumulation.element.id + 'SeriesGroup' + series.index;
            if (series.animation.enable && accumulation.animateSeries) {
                var clippath = accumulation.renderer.createClipPath({ id: groupId + '_clipPath' });
                var path = new ej2_svg_base_1.PathOption(groupId + '_slice', 'transparent', 1, 'transparent', 1, '', '');
                var clipslice = accumulation.renderer.drawPath(path);
                clippath.appendChild(clipslice);
                accumulation.svgObject.appendChild(clippath);
                slice.style.cssText = 'clip-path:url(#' + clippath.id + '); -webkit-clip-path:url(#' + clippath.id + ');';
                this.doAnimation(clipslice, series);
            }
        };
        PieSeries.prototype.getModuleName = function () {
            return 'PieSeries';
        };
        PieSeries.prototype.destroy = function () {
        };
        return PieSeries;
    }(pie_base_1.PieBase));
    exports.PieSeries = PieSeries;
});
