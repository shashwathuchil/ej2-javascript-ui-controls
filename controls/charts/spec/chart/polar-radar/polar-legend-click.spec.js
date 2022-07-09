define(["require", "exports", "../../../src/chart/index", "../../../src/chart/index", "../../../src/chart/index", "../../../src/chart/index", "@syncfusion/ej2-base", "../base/events.spec", "../../common.spec"], function (require, exports, index_1, index_2, index_3, index_4, ej2_base_1, events_spec_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    index_1.Chart.Inject(index_1.Legend, index_1.LineSeries, index_1.ColumnSeries, index_2.BarSeries, index_2.SplineSeries, index_2.DataLabel, index_2.AreaSeries);
    index_1.Chart.Inject(index_2.StackingColumnSeries, index_4.ScatterSeries, index_2.StackingAreaSeries, index_4.ScatterSeries);
    index_1.Chart.Inject(index_3.PolarSeries, index_3.RadarSeries, index_3.DateTime, index_3.Category, index_3.Logarithmic, index_4.DateTimeCategory, index_4.RangeColumnSeries, index_4.RangeAreaSeries);
    var i;
    var currentPoint;
    var value = 0;
    var data = [];
    var seriesCollection = [];
    var colors = ['#663AB6', '#EB3F79', '#F8AB1D', '#B82E3D', '#049CB1', '#F2424F', '#C2C924', '#3DA046', '#074D67', '#02A8F4'];
    var toggle = true;
    for (var j = 0; j < 20; j++) {
        for (i = 0; i < 10; i++) {
            value = i * j + (10 * (j + 1));
            currentPoint = { x: i, y: value, date: new Date(value), z: value + 10 };
            data.push(currentPoint);
        }
        if (j % 5 === 0 && j !== 0) {
            toggle = false;
        }
        else {
            toggle = true;
        }
        seriesCollection[j] = {
            name: 'Series ' + j, fill: colors[j % 9], dataSource: data,
            xName: 'x', yName: 'y',
            marker: { visible: true, shape: 'Circle', dataLabel: { visible: true, border: { color: 'red', width: 2 } } },
            animation: { enable: false },
            legendShape: 'SeriesType', visible: toggle,
            type: 'Polar'
        };
        data = [];
    }
    describe('Legend Checking Polar Radar Series ', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        var chart;
        var loaded;
        var legendId = 'legendClick' + '_chart_legend';
        var legendElement;
        var id = 'legendClick';
        var series = [seriesCollection[0], seriesCollection[1], seriesCollection[2], seriesCollection[3], seriesCollection[4]];
        var trigger = new events_spec_1.MouseEvents();
        var value;
        var ele = ej2_base_1.createElement('div', { id: id });
        var seriesElement;
        var lastLabel;
        var seriesCollectionEle;
        var symbolElement;
        var textElement;
        var shapeElement;
        document.body.appendChild(ele);
        beforeAll(function () {
            chart = new index_1.Chart({
                series: series,
                legendSettings: { border: { color: 'red' }, visible: true },
            });
            chart.appendTo(ele);
        });
        afterAll(function () {
            chart.destroy();
            ele.remove();
        });
        it('checked before legend click', function () {
            seriesCollectionEle = index_1.getElement(ele.id + 'SeriesCollection');
            seriesElement = index_1.getElement('legendClickSeriesGroup2');
            lastLabel = index_1.getElement(ele.id + 'AxisLabels1');
            expect(seriesElement).not.toEqual(null);
            expect(seriesCollectionEle.childElementCount).toEqual(12);
            expect(lastLabel.lastElementChild.innerHTML).toEqual('100');
        });
        it('checking with legend click series deselect', function (done) {
            legendElement = index_1.getElement('legendClick_chart_legend_text_4');
            trigger.clickEvent(legendElement);
            setTimeout(function () {
                seriesElement = index_1.getElement('legendClickSeriesGroup4');
                symbolElement = index_1.getElement('legendClickSeriesGroup4');
                shapeElement = index_1.getElement('legendClickShapeGroup4');
                textElement = index_1.getElement('legendClickTextGroup4');
                seriesCollectionEle = index_1.getElement('legendClickSeriesCollection');
                expect(seriesElement).toEqual(null);
                expect(symbolElement).toEqual(null);
                expect(shapeElement).toEqual(null);
                expect(textElement).toEqual(null);
                lastLabel = index_1.getElement(ele.id + 'AxisLabels1');
                expect(lastLabel.lastElementChild.innerHTML).toEqual('80');
                expect(seriesCollectionEle.childElementCount).toEqual(10);
                done();
            }, 301);
        });
        it('checking with legend click series select', function (done) {
            legendElement = index_1.getElement('legendClick_chart_legend_text_4');
            trigger.clickEvent(legendElement);
            setTimeout(function () {
                seriesElement = index_1.getElement('legendClickSeriesGroup4');
                symbolElement = index_1.getElement('legendClickSeriesGroup4');
                shapeElement = index_1.getElement('legendClickShapeGroup4');
                textElement = index_1.getElement('legendClickTextGroup4');
                expect(seriesElement).not.toEqual(null);
                expect(symbolElement).not.toEqual(null);
                expect(shapeElement).not.toEqual(null);
                expect(textElement).not.toEqual(null);
                lastLabel = index_1.getElement(ele.id + 'AxisLabels1');
                expect(lastLabel.lastElementChild.innerHTML).toEqual('100');
                expect(seriesCollectionEle.childElementCount).toEqual(10);
                done();
            }, 301);
        });
        it('changed to seriesType as Spline', function () {
            for (var _i = 0, _a = chart.series; _i < _a.length; _i++) {
                var value_1 = _a[_i];
                value_1.drawType = 'Spline';
            }
            chart.refresh();
            expect(index_1.getElement('legendClick_Series_4').getAttribute('d').indexOf('C') > -1).toBe(true);
            lastLabel = index_1.getElement(ele.id + 'AxisLabels1');
            expect(lastLabel.lastElementChild.innerHTML).toEqual('100');
        });
        it('checking with spline legend click series deselect', function (done) {
            legendElement = index_1.getElement('legendClick_chart_legend_text_4');
            trigger.clickEvent(legendElement);
            setTimeout(function () {
                seriesElement = index_1.getElement('legendClickSeriesGroup4');
                symbolElement = index_1.getElement('legendClickSeriesGroup4');
                shapeElement = index_1.getElement('legendClickShapeGroup4');
                textElement = index_1.getElement('legendClickTextGroup4');
                expect(seriesElement).toEqual(null);
                expect(symbolElement).toEqual(null);
                expect(shapeElement).toEqual(null);
                expect(textElement).toEqual(null);
                lastLabel = index_1.getElement(ele.id + 'AxisLabels1');
                expect(lastLabel.lastElementChild.innerHTML).toEqual('80');
                done();
            }, 301);
        });
        it('checking with spline legend click series select', function (done) {
            legendElement = index_1.getElement('legendClick_chart_legend_text_2');
            trigger.clickEvent(legendElement);
            setTimeout(function () {
                seriesElement = index_1.getElement('legendClickSeriesGroup2');
                symbolElement = index_1.getElement('legendClickSeriesGroup2');
                shapeElement = index_1.getElement('legendClickShapeGroup2');
                textElement = index_1.getElement('legendClickTextGroup2');
                expect(seriesElement).toEqual(null);
                expect(symbolElement).toEqual(null);
                expect(shapeElement).toEqual(null);
                expect(textElement).toEqual(null);
                done();
            }, 301);
        });
        it('checking with Area series legend click series select', function (done) {
            for (var _i = 0, _a = chart.series; _i < _a.length; _i++) {
                var series_1 = _a[_i];
                series_1.drawType = 'Area';
            }
            chart.refresh();
            legendElement = index_1.getElement('legendClick_chart_legend_text_1');
            trigger.clickEvent(legendElement);
            setTimeout(function () {
                seriesElement = index_1.getElement('legendClickSeriesGroup1');
                symbolElement = index_1.getElement('legendClickSeriesGroup1');
                shapeElement = index_1.getElement('legendClickShapeGroup1');
                textElement = index_1.getElement('legendClickTextGroup1');
                expect(seriesElement).toEqual(null);
                expect(symbolElement).toEqual(null);
                expect(shapeElement).toEqual(null);
                expect(textElement).toEqual(null);
                lastLabel = index_1.getElement(ele.id + 'AxisLabels1');
                expect(lastLabel.lastElementChild.innerHTML).toEqual('80');
                done();
            }, 301);
        });
        it('checking with StackingArea series legend click series select', function (done) {
            for (var _i = 0, _a = chart.series; _i < _a.length; _i++) {
                var series_2 = _a[_i];
                series_2.drawType = 'StackingArea';
            }
            chart.refresh();
            lastLabel = index_1.getElement(ele.id + 'AxisLabels1');
            expect(lastLabel.lastElementChild.innerHTML).toEqual('100');
            legendElement = index_1.getElement('legendClick_chart_legend_text_2');
            trigger.clickEvent(legendElement);
            setTimeout(function () {
                seriesElement = index_1.getElement('legendClickSeriesGroup2');
                symbolElement = index_1.getElement('legendClickSeriesGroup2');
                shapeElement = index_1.getElement('legendClickShapeGroup2');
                textElement = index_1.getElement('legendClickTextGroup2');
                expect(seriesElement).not.toEqual(null);
                expect(symbolElement).not.toEqual(null);
                expect(shapeElement).not.toEqual(null);
                expect(textElement).not.toEqual(null);
                lastLabel = index_1.getElement(ele.id + 'AxisLabels1');
                expect(lastLabel.lastElementChild.innerHTML).toEqual('150');
                done();
            }, 301);
        });
        it('checking with StackingColumn series legend click series select', function (done) {
            for (var _i = 0, _a = chart.series; _i < _a.length; _i++) {
                var series_3 = _a[_i];
                series_3.drawType = 'StackingColumn';
            }
            chart.refresh();
            legendElement = index_1.getElement('legendClick_chart_legend_text_2');
            trigger.clickEvent(legendElement);
            setTimeout(function () {
                seriesElement = index_1.getElement('legendClickSeriesGroup2');
                symbolElement = index_1.getElement('legendClickSeriesGroup2');
                shapeElement = index_1.getElement('legendClickShapeGroup2');
                textElement = index_1.getElement('legendClickTextGroup2');
                expect(seriesElement).toEqual(null);
                expect(symbolElement).toEqual(null);
                expect(shapeElement).toEqual(null);
                expect(textElement).toEqual(null);
                expect(index_1.getElement('legendClick1_AxisLabel_3').innerHTML).toEqual('60');
                done();
            }, 301);
        });
        it('checking with Scatter series legend click series select', function (done) {
            for (var _i = 0, _a = chart.series; _i < _a.length; _i++) {
                var series_4 = _a[_i];
                series_4.drawType = 'Scatter';
                series_4.marker.dataLabel.visible = false;
            }
            chart.refresh();
            legendElement = index_1.getElement('legendClick_chart_legend_text_3');
            trigger.clickEvent(legendElement);
            setTimeout(function () {
                seriesElement = index_1.getElement('legendClickSeriesGroup3');
                symbolElement = index_1.getElement('legendClickSeriesGroup3');
                shapeElement = index_1.getElement('legendClickShapeGroup3');
                textElement = index_1.getElement('legendClickTextGroup3');
                expect(seriesElement).toEqual(null);
                expect(symbolElement).toEqual(null);
                expect(shapeElement).toEqual(null);
                expect(textElement).toEqual(null);
                expect(index_1.getElement('legendClick1_AxisLabel_3').innerHTML).toEqual('10.000');
                done();
            }, 301);
        });
        it('checking with RangeColumn series legend click series select', function (done) {
            for (var _i = 0, _a = chart.series; _i < _a.length; _i++) {
                var series_5 = _a[_i];
                series_5.drawType = 'RangeColumn';
                series_5.high = 'y';
                series_5.low = 'z';
            }
            chart.refresh();
            legendElement = index_1.getElement('legendClick_chart_legend_text_2');
            trigger.clickEvent(legendElement);
            setTimeout(function () {
                seriesElement = index_1.getElement('legendClickSeriesGroup2');
                expect(seriesElement).not.toEqual(null);
                expect(index_1.getElement('legendClick1_AxisLabel_3').innerHTML).toEqual('60');
                done();
            }, 301);
        });
        it('memory leak', function () {
            common_spec_1.profile.sample();
            var average = common_spec_1.inMB(common_spec_1.profile.averageChange);
            expect(average).toBeLessThan(10);
            var memory = common_spec_1.inMB(common_spec_1.getMemoryProfile());
            expect(memory).toBeLessThan(common_spec_1.profile.samples[0] + 0.25);
        });
    });
});
