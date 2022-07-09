define(["require", "exports", "@syncfusion/ej2-base", "../../common/utils/helper", "../model/acc-base"], function (require, exports, ej2_base_1, helper_1, acc_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AccumulationBase = (function () {
        function AccumulationBase(accumulation) {
            this.accumulation = accumulation;
        }
        Object.defineProperty(AccumulationBase.prototype, "center", {
            get: function () {
                return this.pieCenter || (this.accumulation.visibleSeries[0].type === 'Pie' ?
                    this.accumulation.pieSeriesModule.pieBaseCenter : null);
            },
            set: function (value) {
                this.pieCenter = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AccumulationBase.prototype, "radius", {
            get: function () {
                return this.pieRadius !== undefined ? this.pieRadius :
                    this.accumulation.pieSeriesModule.pieBaseRadius;
            },
            set: function (value) {
                this.pieRadius = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AccumulationBase.prototype, "labelRadius", {
            get: function () {
                return this.pieLabelRadius !== undefined ? this.pieLabelRadius :
                    this.accumulation.pieSeriesModule.pieBaseLabelRadius;
            },
            set: function (value) {
                this.pieLabelRadius = value;
            },
            enumerable: true,
            configurable: true
        });
        AccumulationBase.prototype.isCircular = function () {
            return this.accumulation.type === 'Pie';
        };
        AccumulationBase.prototype.isVariousRadius = function () {
            return this.accumulation.pieSeriesModule.isRadiusMapped;
        };
        AccumulationBase.prototype.processExplode = function (event) {
            if (event.target.id.indexOf('_Series_') > -1 || event.target.id.indexOf('_datalabel_') > -1) {
                var pointIndex = helper_1.indexFinder(event.target.id).point;
                if (isNaN(pointIndex) || (event.target.id.indexOf('_datalabel_') > -1 &&
                    this.accumulation.visibleSeries[0].points[pointIndex].labelPosition === 'Outside')) {
                    return null;
                }
                this.explodePoints(pointIndex, this.accumulation);
                this.deExplodeAll(pointIndex, this.accumulation.enableAnimation ? 300 : 0);
            }
        };
        AccumulationBase.prototype.invokeExplode = function () {
            var series = this.accumulation.visibleSeries[0];
            var duration = this.accumulation.enableAnimation ? 300 : 0;
            for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
                var point = _a[_i];
                if (point.isExplode && point.y !== 0) {
                    this.pointExplode(point.index, point, duration);
                }
            }
            if (this.accumulation.accumulationSelectionModule && this.accumulation.selectionMode !== 'None' &&
                this.accumulation.accumulationSelectionModule.selectedDataIndexes.length) {
                for (var _b = 0, _c = this.accumulation.accumulationSelectionModule.selectedDataIndexes; _b < _c.length; _b++) {
                    var index = _c[_b];
                    this.explodePoints(index.point, this.accumulation, true);
                    this.deExplodeAll(index.point, duration);
                }
            }
        };
        AccumulationBase.prototype.deExplodeAll = function (index, animationDuration) {
            var pointId = this.accumulation.element.id + '_Series_0_Point_';
            var points = this.accumulation.visibleSeries[0].points;
            for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
                var currentPoint = points_1[_i];
                if ((index !== currentPoint.index && !currentPoint.isSliced) || currentPoint.isClubbed) {
                    currentPoint.isExplode = false;
                    this.deExplodeSlice(currentPoint.index, pointId, animationDuration);
                }
            }
        };
        AccumulationBase.prototype.explodePoints = function (index, chart, explode) {
            if (explode === void 0) { explode = false; }
            var series = chart.visibleSeries[0];
            var points = series.points;
            var point = acc_base_1.pointByIndex(index, points);
            var explodePoints = true;
            var duration = this.accumulation.enableAnimation ? 300 : 0;
            if (ej2_base_1.isNullOrUndefined(point)) {
                return null;
            }
            var clubPointsExploded = !explode &&
                (point.isSliced || (series.clubbedPoints.length &&
                    points[points.length - 1].index === series.clubbedPoints[series.clubbedPoints.length - 1].index));
            if (series.type === 'Pie' && (clubPointsExploded || point.isClubbed)) {
                explodePoints = this.clubPointExplode(index, point, series, points, chart, duration, clubPointsExploded);
            }
            if (explodePoints && point.y !== 0) {
                this.pointExplode(index, point, duration, explode);
            }
        };
        AccumulationBase.prototype.getSum = function (points) {
            var total = 0;
            points.map(function (point) {
                total += point.visible ? point.y : 0;
            });
            return total;
        };
        AccumulationBase.prototype.clubPointExplode = function (index, point, series, points, chart, duration, clubPointsExploded) {
            if (clubPointsExploded === void 0) { clubPointsExploded = false; }
            if (point.isClubbed) {
                chart.animateSeries = false;
                points.splice(points.length - 1, 1);
                series.clubbedPoints.map(function (point) {
                    point.visible = true;
                    point.isExplode = true;
                });
                chart.visibleSeries[0].points = points.concat(series.clubbedPoints);
                this.deExplodeAll(index, duration);
                series.sumOfPoints = this.getSum(chart.visibleSeries[0].points);
                chart.refreshChart();
                return false;
            }
            else if (clubPointsExploded || point.isSliced) {
                chart.animateSeries = false;
                points.splice(points.length - series.clubbedPoints.length, series.clubbedPoints.length);
                var clubPoint = series.generateClubPoint();
                clubPoint.index = points.length;
                clubPoint.color = series.clubbedPoints[0].color;
                points.push(clubPoint);
                series.sumOfPoints = this.getSum(points);
                this.deExplodeAll(index, duration);
                clubPoint.isExplode = false;
                chart.visibleSeries[0].points = points;
                chart.refreshChart();
                this.pointExplode(clubPoint.index, points[clubPoint.index], 0, true);
                clubPoint.isExplode = false;
                this.deExplodeSlice(clubPoint.index, chart.element.id + '_Series_0_Point_', duration);
                if (point.isSliced) {
                    return false;
                }
            }
            return true;
        };
        AccumulationBase.prototype.pointExplode = function (index, point, duration, explode) {
            var translate;
            var pointId = this.accumulation.element.id + '_Series_0_Point_';
            var chart = this.accumulation;
            if (!this.isCircular()) {
                translate = {
                    x: ((point.labelRegion && point.labelRegion.x < point.region.x) ? -chart.explodeDistance :
                        chart.explodeDistance), y: 0
                };
            }
            else {
                translate = helper_1.degreeToLocation(point.midAngle, chart.explodeDistance, this.center);
            }
            if (this.isExplode(pointId + index) || explode) {
                point.isExplode = true;
                this.explodeSlice(index, translate, pointId, this.center || { x: 0, y: 0 }, duration);
            }
            else {
                point.isExplode = false;
                this.deExplodeSlice(index, pointId, duration);
            }
        };
        AccumulationBase.prototype.isExplode = function (id) {
            var element = helper_1.getElement(id);
            var transform = element ? element.getAttribute('transform') : null;
            return (element && (transform === 'translate(0, 0)' || transform === null || transform === 'translate(0)'));
        };
        AccumulationBase.prototype.deExplodeSlice = function (index, sliceId, animationDuration) {
            var element = helper_1.getElement(sliceId + index);
            if (element) {
                var borderElement = element.parentNode.lastChild.hasAttribute('transform');
                if (borderElement) {
                    element.parentNode.lastChild.removeAttribute('transform');
                }
            }
            var transform = element ? element.getAttribute('transform') : null;
            if (this.accumulation.enableAnimation && element && transform &&
                transform !== 'translate(0, 0)' && transform !== 'translate(0)') {
                var result = /translate\((-?\d+\.?\d*),?\s*(-?\d+[.]?\d*)?\)/.exec(transform);
                this.performAnimation(index, sliceId, 0, 0, +result[1], +result[2] || 0, animationDuration, true);
            }
            else {
                this.performAnimation(index, sliceId, 0, 0, 0, 0, animationDuration, true);
            }
        };
        AccumulationBase.prototype.setTranslate = function (index, sliceId, position, transform) {
            this.setElementTransform(sliceId + index, position);
            if (this.accumulation.visibleSeries[0].dataLabel.visible) {
                sliceId = this.accumulation.element.id + '_datalabel_Series_0_';
                this.setElementTransform(sliceId + 'shape_' + index, position);
                this.setElementTransform(sliceId + 'text_' + index, position + transform);
                this.setElementTransform(sliceId + 'connector_' + index, position);
            }
        };
        AccumulationBase.prototype.setElementTransform = function (id, position) {
            var element = helper_1.getElement(id);
            if (element) {
                element.setAttribute('transform', position);
            }
        };
        AccumulationBase.prototype.explodeSlice = function (index, translate, sliceId, center, animationDuration) {
            this.performAnimation(index, sliceId, 0, 0, translate.x - center.x, translate.y - center.y, animationDuration);
        };
        AccumulationBase.prototype.performAnimation = function (index, sliceId, startX, startY, endX, endY, duration, isReverse) {
            var _this = this;
            var chart = this.accumulation;
            var values = sliceId.split('_');
            var seriesIndex = parseInt(sliceId.split('_')[values.length - 3], 10);
            var point = chart.visibleSeries[seriesIndex].points[index];
            if (duration <= 0) {
                this.setTranslate(index, sliceId, 'translate(' + (endX) + ', ' + (endY) + ')', point.transform);
                return null;
            }
            var xValue;
            var yValue;
            new ej2_base_1.Animation({}).animate(ej2_base_1.createElement('div'), {
                duration: duration,
                progress: function (args) {
                    xValue = helper_1.linear(args.timeStamp, startX, endX, args.duration);
                    yValue = helper_1.linear(args.timeStamp, startY, endY, args.duration);
                    _this.setTranslate(index, sliceId, 'translate(' + (isReverse ? endX - xValue : xValue) + ', ' + (isReverse ? endY - yValue : yValue) + ')', point.transform);
                },
                end: function () {
                    _this.setTranslate(index, sliceId, 'translate(' + (isReverse ? startX : endX) + ', ' + (isReverse ? startX : endY) + ')', point.transform);
                }
            });
        };
        return AccumulationBase;
    }());
    exports.AccumulationBase = AccumulationBase;
});
