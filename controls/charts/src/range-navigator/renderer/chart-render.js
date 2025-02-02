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
define(["require", "exports", "../../common/utils/helper", "../../chart/axis/axis-helper", "@syncfusion/ej2-data", "../utils/helper", "@syncfusion/ej2-base", "../../common/model/theme", "@syncfusion/ej2-svg-base", "../../common/model/data"], function (require, exports, helper_1, axis_helper_1, ej2_data_1, helper_2, ej2_base_1, theme_1, ej2_svg_base_1, data_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RangeSeries = (function (_super) {
        __extends(RangeSeries, _super);
        function RangeSeries(range) {
            var _this = _super.call(this) || this;
            _this.dataSource = range.dataSource;
            _this.xName = range.xName;
            _this.yName = range.yName;
            _this.query = range.query;
            _this.xMin = Infinity;
            _this.xMax = -Infinity;
            _this.yMin = Infinity;
            _this.yMax = -Infinity;
            return _this;
        }
        RangeSeries.prototype.renderChart = function (control) {
            var _this = this;
            var dataSource;
            var query;
            this.seriesLength = 0;
            control.rangeSlider.points = [];
            if (control.series.length) {
                control.series.map(function (series) {
                    dataSource = series.dataSource || control.dataSource;
                    query = series.query || control.query;
                    series.points = [];
                    _this.processDataSource(dataSource, query, control, series);
                });
            }
            else {
                this.processDataSource(control.dataSource, control.query, control);
            }
        };
        RangeSeries.prototype.processDataSource = function (dataSource, query, control, series) {
            var _this = this;
            if (!(dataSource instanceof ej2_data_1.DataManager) && !ej2_base_1.isNullOrUndefined(dataSource) && ej2_base_1.isNullOrUndefined(query)) {
                this.dataManagerSuccess({ result: dataSource, count: dataSource.length }, control, series);
                return;
            }
            control.dataModule = new data_1.Data(dataSource, query);
            var dataManager = control.dataModule.getData(control.dataModule.generateQuery().requiresCount());
            dataManager.then(function (e) { return _this.dataManagerSuccess(e, control, series); });
        };
        RangeSeries.prototype.dataManagerSuccess = function (e, control, series) {
            var viewData = e.count ? e.result : [];
            control.allowServerDataBinding = false;
            this.processJsonData(viewData, control, Object.keys(viewData).length, series);
            this.seriesLength += series ? 1 : this.seriesLength;
            if (!series || this.seriesLength === control.series.length) {
                this.processXAxis(control);
                this.calculateGroupingBounds(control);
                this.processYAxis(control);
                control.renderChart();
            }
        };
        RangeSeries.prototype.processJsonData = function (viewData, control, len, series) {
            var i = 0;
            var point;
            var xName = (series && series.xName) || control.xName;
            var yName = (series && series.yName) || control.yName;
            while (i < len) {
                point = new helper_2.DataPoint(ej2_base_1.getValue(xName, viewData[i]), ej2_base_1.getValue(yName, viewData[i]));
                point.yValue = +point.y;
                if (control.valueType === 'DateTime') {
                    var dateParser = control.intl.getDateParser({ skeleton: 'full', type: 'dateTime' });
                    var dateFormatter = control.intl.getDateFormat({ skeleton: 'full', type: 'dateTime' });
                    point.x = new Date(ej2_data_1.DataUtil.parse.parseJson({ val: point.x }).val);
                    point.xValue = Date.parse(dateParser(dateFormatter(point.x)));
                }
                else {
                    point.xValue = +point.x;
                }
                if (series) {
                    series.points.push(point);
                }
                this.xMin = Math.min(this.xMin, point.xValue);
                this.yMin = Math.min(this.yMin, point.yValue);
                this.xMax = Math.max(this.xMax, point.xValue);
                this.yMax = Math.max(this.yMax, point.yValue);
                control.rangeSlider.points.push(point);
                i++;
            }
        };
        RangeSeries.prototype.processXAxis = function (control) {
            var axis = {
                minimum: control.minimum, maximum: control.maximum,
                interval: control.interval, valueType: control.valueType,
                isInversed: control.enableRtl, labelFormat: control.labelFormat,
                logBase: control.logBase, skeleton: control.skeleton, skeletonType: control.skeletonType
            };
            this.xAxis = axis;
            this.xAxis.intervalType = control.intervalType;
            this.xAxis.maximumLabels = 3;
            this.xAxis.skeleton = control.skeleton;
            this.xAxis.intervalDivs = [10, 5, 2, 1];
            this.xAxis.rect = control.bounds;
            this.xAxis.visibleLabels = [];
            this.xAxis.orientation = 'Horizontal';
            var axisModule = control[helper_1.firstToLowerCase(control.valueType) + 'Module'];
            axisModule.min = this.xMin;
            axisModule.max = this.xMax;
            axisModule.getActualRange(this.xAxis, control.bounds);
            if (this.xAxis.valueType === 'Double' || this.xAxis.valueType === 'DateTime') {
                axisModule.updateActualRange(this.xAxis, this.xAxis.actualRange.min, this.xAxis.actualRange.max, this.xAxis.actualRange.interval);
            }
            this.xAxis.actualRange.delta = this.xAxis.actualRange.max - this.xAxis.actualRange.min;
            this.xAxis.visibleRange = this.xAxis.actualRange;
            axisModule.calculateVisibleLabels(this.xAxis, control);
        };
        RangeSeries.prototype.processYAxis = function (control) {
            var axis = {
                majorGridLines: { width: 0 }, rangePadding: 'None',
                majorTickLines: { width: 0 }, labelStyle: { size: '0' },
                visible: false, valueType: 'Double', minimum: null, maximum: null,
                interval: null
            };
            this.yAxis = axis;
            this.yAxis.rect = control.bounds;
            this.yAxis.maximumLabels = 3;
            this.yAxis.intervalDivs = [10, 5, 2, 1];
            this.yAxis.orientation = 'Vertical';
            control.doubleModule.min = this.yMin;
            control.doubleModule.max = this.yMax;
            control.doubleModule.getActualRange(this.yAxis, control.bounds);
            control.doubleModule.updateActualRange(this.yAxis, this.yAxis.actualRange.min, this.yAxis.actualRange.max, this.yAxis.actualRange.interval);
            this.yAxis.actualRange.delta = this.yAxis.actualRange.max - this.yAxis.actualRange.min;
            this.yAxis.visibleRange = this.yAxis.actualRange;
        };
        RangeSeries.prototype.renderSeries = function (control) {
            var _this = this;
            this.chartGroup = control.renderer.createGroup({ id: control.element.id + '_chart' });
            var colors = theme_1.getSeriesColor(control.theme);
            control.series.map(function (series, index) {
                var isSeriesVisible = control.stockChart ? control.stockChart.series[index].visible : true;
                if (isSeriesVisible) {
                    series.xAxis = _this.xAxis;
                    series.yAxis = _this.yAxis;
                    series.chart = control;
                    series.index = index;
                    series.xAxis.isInversed = control.enableRtl;
                    series.interior = series.fill || colors[index % colors.length];
                    _this.createSeriesElement(control, series, index);
                    if (control[helper_1.firstToLowerCase(series.type) + 'SeriesModule']) {
                        control[helper_1.firstToLowerCase(series.type) + 'SeriesModule'].render(series, _this.xAxis, _this.yAxis, false);
                    }
                    else {
                        control['line' + 'SeriesModule'].render(series, _this.xAxis, _this.yAxis, false);
                    }
                    _this.chartGroup.appendChild(series.seriesElement);
                    if (series.animation.enable && control.animateSeries) {
                        if (control[helper_1.firstToLowerCase(series.type) + 'SeriesModule']) {
                            control[helper_1.firstToLowerCase(series.type) + 'SeriesModule'].doAnimation(series);
                        }
                        else {
                        }
                    }
                }
            });
        };
        RangeSeries.prototype.appendSeriesElements = function (control) {
            control.svgObject.appendChild(this.chartGroup);
            if (control.series.length) {
                this.drawSeriesBorder(control);
            }
        };
        RangeSeries.prototype.createSeriesElement = function (control, series, index) {
            var elementId = control.element.id;
            series.clipRect = new ej2_svg_base_1.Rect(this.xAxis.rect.x, this.yAxis.rect.y, this.xAxis.rect.width, this.yAxis.rect.height);
            series.clipRectElement = control.renderer.drawClipPath(new helper_1.RectOption(elementId + '_RangeSeriesClipRect_' + index, 'transparent', { width: 1, color: 'Gray' }, 1, {
                x: 0, y: 0,
                width: series.clipRect.width,
                height: series.clipRect.height
            }));
            series.seriesElement = control.renderer.createGroup({
                'id': elementId + 'SeriesGroup' + index,
                'transform': 'translate(' + series.clipRect.x + ',' + (series.clipRect.y) + ')',
                'clip-path': 'url(#' + elementId + '_RangeSeriesClipRect_' + index + ')'
            });
            series.seriesElement.appendChild(series.clipRectElement);
        };
        RangeSeries.prototype.calculateGroupingBounds = function (control) {
            var padding = control.margin.bottom;
            var labelHeight = ej2_svg_base_1.measureText('string', control.labelStyle).height;
            this.calculateDateTimeNiceInterval(this.xAxis, new ej2_svg_base_1.Size(control.bounds.width, control.bounds.height), this.xMin, this.xMax, false);
            if (control.enableGrouping && control.valueType === 'DateTime'
                && (this.xAxis.actualIntervalType !== 'Years' || !control.series.length)) {
                control.bounds.height -= (control.labelPosition === 'Outside' || control.series.length === 0) ? padding + labelHeight :
                    (labelHeight + 2 * padding);
            }
            if (!control.series.length) {
                control.bounds.y += control.bounds.height / 4;
                control.bounds.height = control.bounds.height / 2;
            }
        };
        RangeSeries.prototype.drawSeriesBorder = function (control) {
            var start = control.stockChart ? 'M' : 'L';
            var close = control.stockChart ? '' : 'Z';
            var options = new ej2_svg_base_1.PathOption(control.element.id + '_SeriesBorder', 'transparent', control.navigatorBorder.width, control.navigatorBorder.color, 1, '', ('M ' + (control.bounds.x) + ' ' + (control.bounds.y) +
                ' L ' + (control.bounds.x + control.bounds.width) + ' ' + control.bounds.y +
                start + (control.bounds.x + control.bounds.width) + ' ' + (control.bounds.y + control.bounds.height) +
                ' L ' + (control.bounds.x) + ' ' + (control.bounds.y + control.bounds.height) + close));
            var htmlObject = control.renderer.drawPath(options);
            control.svgObject.appendChild(htmlObject);
        };
        return RangeSeries;
    }(axis_helper_1.NiceInterval));
    exports.RangeSeries = RangeSeries;
});
