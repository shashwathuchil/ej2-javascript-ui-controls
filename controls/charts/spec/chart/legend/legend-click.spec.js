define(["require", "exports", "../../../src/index", "../../../src/index", "../../../src/index", "../../../src/index", "../../../src/index", "@syncfusion/ej2-base", "../base/events.spec", "../../common.spec"], function (require, exports, index_1, index_2, index_3, index_4, index_5, ej2_base_1, events_spec_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    index_1.Chart.Inject(index_1.Legend, index_1.LineSeries, index_1.ColumnSeries, index_2.BarSeries, index_2.SplineSeries, index_2.DataLabel, index_2.AreaSeries, index_4.ScatterSeries);
    index_1.Chart.Inject(index_2.StackingColumnSeries, index_3.StackingBarSeries, index_2.StackingAreaSeries, index_3.ErrorBar, index_3.StripLine, index_3.ChartAnnotation);
    index_1.Chart.Inject(index_3.DateTime, index_4.CandleSeries, index_4.HiloOpenCloseSeries, index_4.HiloSeries, index_4.RangeAreaSeries, index_4.RangeColumnSeries);
    index_1.Chart.Inject(index_3.AccumulationDistributionIndicator, index_5.Logarithmic, index_1.Category, index_5.DateTimeCategory);
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
            currentPoint = { x: i, y: value };
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
            marker: { visible: false, shape: 'Circle', dataLabel: { visible: true, border: { color: 'red', width: 2 } } },
            animation: { enable: false },
            legendShape: 'SeriesType', visible: toggle,
            type: 'Line'
        };
        data = [];
    }
    describe('Chart Control', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('Chart Control Legend Checking', function () {
            var chart;
            var loaded;
            var legendClick;
            var legendId = 'cartesianChart' + '_chart_legend';
            var legendElement;
            var series = [seriesCollection[0], seriesCollection[1], seriesCollection[2], seriesCollection[3], seriesCollection[4]];
            var trigger = new events_spec_1.MouseEvents();
            var value;
            var ele = ej2_base_1.createElement('div', { id: 'cartesianChart' });
            var seriesElement;
            var lastLabel;
            var dataLabel;
            var svg;
            document.body.appendChild(ele);
            beforeAll(function () {
                chart = new index_1.Chart({
                    height: '400', width: '800', series: series,
                    legendSettings: { border: { color: 'red' }, visible: true },
                });
                chart.appendTo(ele);
            });
            afterAll(function () {
                chart.destroy();
                document.getElementById('cartesianChart').remove();
            });
            it('checking with before legend click', function () {
                seriesElement = index_1.getElement(ele.id + 'SeriesCollection');
                lastLabel = index_1.getElement('cartesianChart1_AxisLabel_5');
                expect(seriesElement.childElementCount).toEqual(7);
                expect(seriesElement.style.visibility).toEqual('');
                expect(lastLabel.innerHTML).toEqual('100');
            });
            it('checking with datalabel before legend click', function () {
                dataLabel = index_1.getElement('cartesianChart_Series_3_Point_0_Text_0');
                expect(parseFloat(dataLabel.getAttribute('y')) == 175.79999999999998 || parseFloat(dataLabel.getAttribute('y')) == 213.75).toBe(true);
            });
            it('checking with line series legend deselect', function (done) {
                legendElement = index_1.getElement('cartesianChart_chart_legend_text_4');
                trigger.clickEvent(legendElement);
                seriesElement = index_1.getElement(ele.id + 'SeriesCollection');
                lastLabel = index_1.getElement('cartesianChartAxisLabels1');
                setTimeout(function () {
                    expect(seriesElement.childElementCount).toEqual(6);
                    expect(lastLabel.lastChild.innerHTML).toEqual('80');
                    done();
                }, 301);
            });
            it('checking with datalabel after legend click', function () {
                dataLabel = index_1.getElement('cartesianChart_Series_3_Point_0_Text_0');
                expect(parseFloat(dataLabel.getAttribute('y'))).toBeGreaterThanOrEqual(181.625);
            });
            it('checking with line series legend again selected', function (done) {
                legendElement = index_1.getElement('cartesianChart_chart_legend_text_4');
                trigger.clickEvent(legendElement);
                seriesElement = index_1.getElement(ele.id + 'SeriesCollection');
                lastLabel = index_1.getElement('cartesianChartAxisLabels1');
                setTimeout(function () {
                    expect(lastLabel.lastChild.innerHTML).toEqual('100');
                    expect(seriesElement.childElementCount).toEqual(7);
                    done();
                }, 301);
            });
            it('checking with datalabel before legend selected', function () {
                dataLabel = index_1.getElement('cartesianChart_Series_3_Point_0_Text_0');
                expect(+(dataLabel.getAttribute('y'))).toBeLessThanOrEqual(213.75);
            });
            it('checking with column series legend deselect', function (done) {
                chart.animateSeries = false;
                chart.series.every(function (value) {
                    value.type = 'Column';
                    return true;
                });
                chart.refresh();
                legendElement = index_1.getElement('cartesianChart_chart_legend_text_4');
                trigger.clickEvent(legendElement);
                seriesElement = index_1.getElement(ele.id + 'SeriesCollection');
                lastLabel = index_1.getElement('cartesianChartAxisLabels1');
                setTimeout(function () {
                    expect(seriesElement.childElementCount).toEqual(6);
                    expect(lastLabel.lastChild.innerHTML).toEqual('80');
                    done();
                }, 301);
            });
            it('checking with column series changed to bar series and check select', function (done) {
                chart.animateSeries = false;
                chart.series.every(function (value) {
                    value.type = 'Bar';
                    return true;
                });
                chart.refresh();
                legendElement = index_1.getElement('cartesianChart_chart_legend_text_4');
                trigger.clickEvent(legendElement);
                seriesElement = index_1.getElement(ele.id + 'SeriesCollection');
                lastLabel = index_1.getElement('cartesianChartAxisLabels1');
                setTimeout(function () {
                    expect(seriesElement.childElementCount).toEqual(7);
                    expect(lastLabel.lastChild.innerHTML).toEqual('100');
                    done();
                }, 301);
            });
            it('checking with spline series and check deselect', function (done) {
                chart.series.every(function (value) {
                    value.type = 'Spline';
                    return true;
                });
                chart.refresh();
                legendElement = index_1.getElement('cartesianChart_chart_legend_text_4');
                trigger.clickEvent(legendElement);
                lastLabel = index_1.getElement('cartesianChartAxisLabels1');
                seriesElement = index_1.getElement(ele.id + 'SeriesCollection');
                setTimeout(function () {
                    expect(seriesElement.childElementCount).toEqual(6);
                    expect(seriesElement.contains(index_1.getElement(ele.id + 'SeriesGroup4'))).toEqual(false);
                    expect(lastLabel.lastChild.innerHTML).toEqual('80');
                    done();
                }, 301);
            });
            it('checking with area series with select', function (done) {
                chart.series.every(function (value) {
                    value.type = 'Area';
                    return true;
                });
                chart.refresh();
                legendElement = index_1.getElement('cartesianChart_chart_legend_text_1');
                trigger.clickEvent(legendElement);
                seriesElement = index_1.getElement(ele.id + 'SeriesCollection');
                lastLabel = index_1.getElement('cartesianChartAxisLabels1');
                setTimeout(function () {
                    expect(seriesElement.childElementCount).toEqual(5);
                    expect(seriesElement.contains(index_1.getElement(ele.id + 'SeriesGroup1'))).toEqual(false);
                    expect(seriesElement.childElementCount).toEqual(5);
                    expect(lastLabel.lastElementChild.innerHTML).toEqual('80');
                    done();
                }, 301);
            });
            it('checking with area series with deselect', function (done) {
                chart.series.every(function (value) {
                    value.type = 'Area';
                    return true;
                });
                chart.refresh();
                legendElement = index_1.getElement('cartesianChart_chart_legend_text_0');
                trigger.clickEvent(legendElement);
                seriesElement = index_1.getElement(ele.id + 'SeriesCollection');
                lastLabel = index_1.getElement('cartesianChartAxisLabels1');
                setTimeout(function () {
                    expect(seriesElement.childElementCount).toEqual(4);
                    expect(lastLabel.lastElementChild.innerHTML).toEqual('80');
                    expect(seriesElement.contains(index_1.getElement(ele.id + 'SeriesGroup1'))).toEqual(false);
                    done();
                }, 301);
            });
            it('checking with area Stacked Column series', function (done) {
                chart.series.every(function (value) {
                    value.type = 'StackingColumn';
                    return true;
                });
                chart.refresh();
                legendElement = index_1.getElement('cartesianChart_chart_legend_text_0');
                trigger.clickEvent(legendElement);
                legendElement = index_1.getElement('cartesianChart_chart_legend_text_1');
                trigger.clickEvent(legendElement);
                legendElement = index_1.getElement('cartesianChart_chart_legend_text_4');
                trigger.clickEvent(legendElement);
                seriesElement = index_1.getElement(ele.id + 'SeriesCollection');
                lastLabel = index_1.getElement('cartesianChartAxisLabels1');
                setTimeout(function () {
                    expect(seriesElement.childElementCount).toEqual(7);
                    expect(lastLabel.lastElementChild.innerHTML).toEqual('300');
                    done();
                }, 301);
            });
            it('checking with Stacking bar', function (done) {
                chart.series.every(function (value) {
                    value.type = 'StackingBar';
                    return true;
                });
                chart.refresh();
                seriesElement = index_1.getElement(ele.id + 'SeriesCollection');
                lastLabel = index_1.getElement('cartesianChartAxisLabels1');
                setTimeout(function () {
                    dataLabel = index_1.getElement('cartesianChart_Series_3_Point_0_Text_0');
                    expect(dataLabel.getAttribute('x') == '236.5' || dataLabel.getAttribute('x') == '237').toBe(true);
                    expect(seriesElement.childElementCount).toEqual(7);
                    expect(lastLabel.lastElementChild.innerHTML).toEqual('300');
                    done();
                }, 301);
            });
            it('checking with marker', function () {
                chart.series.every(function (value) {
                    value.type = 'Line';
                    value.marker.visible = true;
                    return true;
                });
                chart.refresh();
                seriesElement = index_1.getElement(ele.id + 'SeriesCollection');
                dataLabel = index_1.getElement('cartesianChart_Series_2_Point_0_Symbol');
                expect(parseFloat(dataLabel.getAttribute('cy')) == 223.475 || parseFloat(dataLabel.getAttribute('cy')) == 224.87499999999997).toBe(true);
                expect(seriesElement.contains(index_1.getElement(ele.id + 'SymbolGroup4'))).toBe(true);
            });
            it('checking with marker after legend click', function (done) {
                seriesElement = index_1.getElement(ele.id + 'SeriesCollection');
                legendElement = index_1.getElement('cartesianChart_chart_legend_text_4');
                expect(seriesElement.childElementCount).toEqual(12);
                trigger.clickEvent(legendElement);
                setTimeout(function () {
                    expect(seriesElement.contains(index_1.getElement(ele.id + 'SymbolGropu4'))).toBe(false);
                    dataLabel = index_1.getElement('cartesianChart_Series_2_Point_0_Symbol');
                    expect(parseFloat(dataLabel.getAttribute('cy')) == 199.53125 || parseFloat(dataLabel.getAttribute('cy')) == 200.78125).toBe(true);
                    expect(seriesElement.childElementCount).toEqual(12);
                    done();
                }, 301);
            });
            it('checked with errorBar', function () {
                for (var _i = 0, _a = chart.series; _i < _a.length; _i++) {
                    var value_1 = _a[_i];
                    value_1.errorBar.visible = true;
                }
                chart.refresh();
                seriesElement = index_1.getElement(ele.id + 'SeriesCollection');
                var errorBar = index_1.getElement('cartesianChart_Series__ErrorBarGroup_0_Point_0');
                expect(seriesElement.childElementCount).toEqual(14);
                var path = errorBar.getAttribute('d').split(' ')[2];
                expect(path == '275.35312500000003' || path == '277.078125').toBe(true);
            });
            it('checked with error bar after legend Click', function (done) {
                legendElement = index_1.getElement('cartesianChart_chart_legend_text_4');
                trigger.clickEvent(legendElement);
                setTimeout(function () {
                    var errorBar = index_1.getElement('cartesianChart_Series__ErrorBarGroup_0_Point_0');
                    seriesElement = index_1.getElement(ele.id + 'SeriesCollection');
                    expect((errorBar.getAttribute('d').split(' ')[2])).toBeLessThanOrEqual(285.9125);
                    expect(seriesElement.childElementCount).toEqual(17);
                    done();
                }, 301);
            });
            it('checked with stripline', function () {
                chart.primaryYAxis.stripLines = [
                    {
                        start: 20, end: 50, visible: true
                    }
                ];
                chart.refresh();
                var stripLine = index_1.getElement('cartesianChart_stripline_Behind_rect_primaryYAxis_0');
                expect(stripLine.getAttribute('y') == '169.875' || stripLine.getAttribute('y') == '170.875').toBe(true);
            });
            it('checked with stripline after legend click', function (done) {
                legendElement = index_1.getElement('cartesianChart_chart_legend_text_4');
                trigger.clickEvent(legendElement);
                setTimeout(function () {
                    var stripLine = index_1.getElement('cartesianChart_stripline_Behind_rect_primaryYAxis_0');
                    expect(stripLine.getAttribute('y') == '129.96875' || stripLine.getAttribute('y') == '130.71875').toBe(true);
                    console.log("stripline_legend = " + stripLine.getAttribute('y'));
                    done();
                }, 301);
            });
            it('checking with Scatter Series', function (done) {
                chart.series.every(function (value) {
                    value.type = 'Scatter';
                    return true;
                });
                chart.refresh();
                legendElement = index_1.getElement('cartesianChart_chart_legend_text_3');
                trigger.clickEvent(legendElement);
                setTimeout(function () {
                    seriesElement = index_1.getElement(ele.id + 'SeriesCollection');
                    expect(seriesElement.childElementCount).toEqual(8);
                    done();
                }, 301);
            });
            it('checking series color without giving fill color in legendClick event', function (done) {
                loaded = function (args) {
                    chart.loaded = null;
                    legendElement = document.getElementById(legendId + '_shape_0');
                    trigger.clickEvent(legendElement);
                    expect(legendElement.getAttribute('d').split('L').length).toBe(4);
                    trigger.clickEvent(legendElement);
                    svg = document.getElementById('cartesianChart_Series_0_Point_0');
                    expect(svg.getAttribute('fill') == '#663AB6').toBe(true);
                    done();
                };
                legendClick = function (args) {
                    args.legendShape = 'Triangle';
                };
                chart.legendClick = legendClick;
                chart.loaded = loaded;
                chart.refresh();
            });
            it('checking with legend shape after legendClick event', function (done) {
                loaded = function (args) {
                    chart.loaded = null;
                    legendElement = document.getElementById(legendId + '_text_' + 0);
                    trigger.clickEvent(legendElement);
                    expect(legendElement.textContent).toBe('Series 0');
                    legendElement = document.getElementById(legendId + '_shape_0');
                    trigger.clickEvent(legendElement);
                    expect(legendElement.getAttribute('d').split('L').length).toBe(5);
                    svg = document.getElementById('cartesianChart_Series_0_Point_0');
                    trigger.clickEvent(legendElement);
                    expect(svg.getAttribute('fill') == 'red').toBe(true);
                    done();
                };
                legendClick = function (args) {
                    args.legendShape = 'Diamond';
                    args.chart.series[0].fill = "red";
                };
                chart.legendClick = legendClick;
                chart.loaded = loaded;
                chart.refresh();
            });
        });
        var dateTimeData = [
            { x: new Date(2000, 1, 12), high: 125, low: 70, open: 115, close: 90, volume: 1000 },
            { x: new Date(2002, 1, 12), high: 150, low: 60, open: 120, close: 70, volume: 2000 },
            { x: new Date(2006, 1, 12), high: 170, low: 90, open: 140, close: 110, volume: 1500 },
            { x: new Date(2008, 1, 12), high: 200, low: 100, open: 180, close: 120, volume: 2500 }
        ];
        var chartData = [
            { x: new Date(2000, 1, 12), high: 70, low: 30, open: 40, close: 60, volume: 2000 },
            { x: new Date(2002, 1, 12), high: 200, low: 100, open: 80, close: 180, volume: 1500 },
            { x: new Date(2006, 1, 12), high: 50, low: 10, open: 40, close: 30, volume: 1000 },
            { x: new Date(2008, 1, 12), high: 200, low: 100, open: 180, close: 120, volume: 2700 }
        ];
        describe('Financial chart', function () {
            var chart;
            var loaded;
            var legendId = 'cartesianChart' + '_chart_legend';
            var legendElement;
            var trigger = new events_spec_1.MouseEvents();
            var value;
            var ele = ej2_base_1.createElement('div', { id: 'cartesianChart' });
            var seriesCollection;
            var seriesElement;
            var textElement;
            var shapeElement;
            document.body.appendChild(ele);
            beforeAll(function () {
                chart = new index_1.Chart({
                    primaryXAxis: { valueType: 'DateTime' },
                    height: '400', width: '800',
                    series: [{
                            dataSource: chartData, width: 2,
                            xName: 'x', yName: 'y', low: 'low', high: 'high', close: 'close', volume: 'volume', open: 'open',
                            name: 'Apple Inc', marker: { dataLabel: { visible: true } },
                            type: 'Candle', animation: { enable: false }
                        },
                        {
                            dataSource: dateTimeData, width: 2,
                            xName: 'x', yName: 'y', low: 'low', high: 'high', close: 'close', volume: 'volume', open: 'open',
                            name: 'Apple Inc1', marker: { dataLabel: { visible: true } },
                            type: 'Candle', animation: { enable: false }
                        }],
                    legendSettings: { border: { color: 'red' }, visible: true },
                });
                chart.appendTo(ele);
            });
            afterAll(function () {
                chart.destroy();
                document.getElementById('cartesianChart').remove();
            });
            it('checked before legend click', function () {
                seriesElement = index_1.getElement('cartesianChartSeriesGroup1');
                seriesCollection = index_1.getElement(ele.id + 'SeriesCollection');
            });
            it('checking with legend click series deselect', function (done) {
                legendElement = index_1.getElement('cartesianChart_chart_legend_text_1');
                trigger.clickEvent(legendElement);
                setTimeout(function () {
                    seriesCollection = index_1.getElement(ele.id + 'SeriesCollection');
                    seriesElement = index_1.getElement('cartesianChartSeriesGroup1');
                    shapeElement = index_1.getElement('cartesianChartShapeGroup1');
                    textElement = index_1.getElement('cartesianChartTextGroup1');
                    var dataLabelCollection = index_1.getElement(ele.id + 'DataLabelCollection');
                    expect(seriesCollection.childElementCount).toEqual(3);
                    expect(seriesElement).toEqual(null);
                    expect(shapeElement).toEqual(null);
                    expect(textElement).toEqual(null);
                    expect(dataLabelCollection.contains(shapeElement)).toEqual(false);
                    done();
                }, 301);
            });
            it('checking with legend click series select', function (done) {
                legendElement = index_1.getElement('cartesianChart_chart_legend_text_1');
                trigger.clickEvent(legendElement);
                setTimeout(function () {
                    seriesCollection = index_1.getElement(ele.id + 'SeriesCollection');
                    seriesElement = index_1.getElement('cartesianChartSeriesGroup1');
                    shapeElement = index_1.getElement('cartesianChartShapeGroup1');
                    textElement = index_1.getElement('cartesianChartTextGroup1');
                    var dataLabelCollection = index_1.getElement(ele.id + 'DataLabelCollection');
                    expect(seriesCollection.childElementCount).toEqual(4);
                    expect(dataLabelCollection.contains(shapeElement)).toEqual(true);
                    done();
                }, 301);
            });
            it('checking with legend click series select hilo series', function (done) {
                for (var _i = 0, _a = chart.series; _i < _a.length; _i++) {
                    var series = _a[_i];
                    series.type = 'Hilo';
                }
                chart.refresh();
                legendElement = index_1.getElement('cartesianChart_chart_legend_text_0');
                trigger.clickEvent(legendElement);
                setTimeout(function () {
                    seriesCollection = index_1.getElement(ele.id + 'SeriesCollection');
                    seriesElement = index_1.getElement('cartesianChartSeriesGroup0');
                    shapeElement = index_1.getElement('cartesianChartShapeGroup0');
                    textElement = index_1.getElement('cartesianChartTextGroup0');
                    var dataLabelCollection = index_1.getElement(ele.id + 'DataLabelCollection');
                    expect(seriesCollection.childElementCount).toEqual(3);
                    expect(seriesElement).toEqual(null);
                    expect(shapeElement).toEqual(null);
                    expect(textElement).toEqual(null);
                    expect(dataLabelCollection.contains(shapeElement)).toEqual(false);
                    done();
                }, 301);
            });
            it('checking with legend click series select hiloOpenClose series', function (done) {
                for (var _i = 0, _a = chart.series; _i < _a.length; _i++) {
                    var series = _a[_i];
                    series.type = 'HiloOpenClose';
                }
                chart.refresh();
                legendElement = index_1.getElement('cartesianChart_chart_legend_text_0');
                trigger.clickEvent(legendElement);
                setTimeout(function () {
                    seriesCollection = index_1.getElement(ele.id + 'SeriesCollection');
                    seriesElement = index_1.getElement('cartesianChartSeriesGroup0');
                    shapeElement = index_1.getElement('cartesianChartShapeGroup0');
                    textElement = index_1.getElement('cartesianChartTextGroup0');
                    var dataLabelCollection = index_1.getElement(ele.id + 'DataLabelCollection');
                    expect(seriesCollection.childElementCount).toEqual(4);
                    expect(seriesElement).not.toEqual(null);
                    expect(shapeElement).not.toEqual(null);
                    expect(textElement).not.toEqual(null);
                    expect(dataLabelCollection.contains(shapeElement)).toEqual(true);
                    done();
                }, 301);
            });
            it('checking with legend click series select RangeColumn series', function (done) {
                for (var _i = 0, _a = chart.series; _i < _a.length; _i++) {
                    var series = _a[_i];
                    series.type = 'RangeColumn';
                }
                chart.refresh();
                legendElement = index_1.getElement('cartesianChart_chart_legend_text_1');
                trigger.clickEvent(legendElement);
                setTimeout(function () {
                    seriesCollection = index_1.getElement(ele.id + 'SeriesCollection');
                    seriesElement = index_1.getElement('cartesianChartSeriesGroup1');
                    shapeElement = index_1.getElement('cartesianChartShapeGroup1');
                    textElement = index_1.getElement('cartesianChartTextGroup1');
                    var dataLabelCollection = index_1.getElement(ele.id + 'DataLabelCollection');
                    expect(seriesCollection.childElementCount).toEqual(3);
                    expect(seriesElement).toEqual(null);
                    expect(shapeElement).toEqual(null);
                    expect(textElement).toEqual(null);
                    expect(dataLabelCollection.contains(shapeElement)).toEqual(false);
                    done();
                }, 301);
            });
            it('checking with legend click series select RangeArea series', function (done) {
                for (var _i = 0, _a = chart.series; _i < _a.length; _i++) {
                    var series = _a[_i];
                    series.type = 'RangeArea';
                }
                chart.refresh();
                legendElement = index_1.getElement('cartesianChart_chart_legend_text_1');
                trigger.clickEvent(legendElement);
                setTimeout(function () {
                    seriesCollection = index_1.getElement(ele.id + 'SeriesCollection');
                    seriesElement = index_1.getElement('cartesianChartSeriesGroup1');
                    shapeElement = index_1.getElement('cartesianChartShapeGroup1');
                    textElement = index_1.getElement('cartesianChartTextGroup1');
                    var dataLabelCollection = index_1.getElement(ele.id + 'DataLabelCollection');
                    expect(seriesCollection.childElementCount).toEqual(4);
                    expect(seriesElement).not.toEqual(null);
                    expect(shapeElement).not.toEqual(null);
                    expect(textElement).not.toEqual(null);
                    done();
                }, 301);
            });
            it('checking with legend click series select RangeArea series', function (done) {
                chart.primaryXAxis.valueType = 'DateTimeCategory';
                chart.refresh();
                legendElement = index_1.getElement('cartesianChart_chart_legend_text_1');
                trigger.clickEvent(legendElement);
                setTimeout(function () {
                    seriesCollection = index_1.getElement(ele.id + 'SeriesCollection');
                    seriesElement = index_1.getElement('cartesianChartSeriesGroup1');
                    shapeElement = index_1.getElement('cartesianChartShapeGroup1');
                    textElement = index_1.getElement('cartesianChartTextGroup1');
                    var dataLabelCollection = index_1.getElement(ele.id + 'DataLabelCollection');
                    expect(seriesCollection.childElementCount).toEqual(3);
                    expect(seriesElement).toEqual(null);
                    expect(shapeElement).toEqual(null);
                    expect(textElement).toEqual(null);
                    done();
                }, 301);
            });
            it('checking without series', function (done) {
                legendElement = index_1.getElement('cartesianChart_chart_legend_text_0');
                trigger.clickEvent(legendElement);
                setTimeout(function () {
                    seriesCollection = index_1.getElement(ele.id + 'SeriesCollection');
                    seriesElement = index_1.getElement('cartesianChartSeriesGroup0');
                    shapeElement = index_1.getElement('cartesianChartShapeGroup0');
                    textElement = index_1.getElement('cartesianChartTextGroup0');
                    var dataLabelCollection = index_1.getElement(ele.id + 'DataLabelCollection');
                    expect(seriesCollection.childElementCount).toEqual(1);
                    expect(seriesElement).toEqual(null);
                    expect(shapeElement).toEqual(null);
                    expect(textElement).toEqual(null);
                    seriesElement = index_1.getElement('cartesianChartSeriesGroup1');
                    shapeElement = index_1.getElement('cartesianChartShapeGroup1');
                    textElement = index_1.getElement('cartesianChartTextGroup1');
                    expect(seriesElement).toEqual(null);
                    expect(shapeElement).toEqual(null);
                    expect(textElement).toEqual(null);
                    var lastLabel = index_1.getElement(ele.id + 'AxisLabels1');
                    expect(lastLabel.lastChild.innerHTML).toEqual('6');
                    done();
                }, 301);
            });
            it('checking with category axis', function (done) {
                chart.primaryXAxis.valueType = 'Category';
                chart.series = [
                    { dataSource: [{ x: 'IND', y: 60 }, { x: 'AUS', y: 180 }], xName: 'x', yName: 'y', name: 'series2', animation: { enable: false } },
                    { dataSource: [{ x: 'IND', y: 45 }, { x: 'AUS', y: 56 }], xName: 'x', yName: 'y', name: 'series1', animation: { enable: false } }
                ];
                chart.refresh();
                legendElement = index_1.getElement('cartesianChart_chart_legend_text_0');
                trigger.clickEvent(legendElement);
                setTimeout(function () {
                    seriesCollection = index_1.getElement(ele.id + 'SeriesCollection');
                    seriesElement = index_1.getElement('cartesianChartSeriesGroup0');
                    shapeElement = index_1.getElement('cartesianChartShapeGroup0');
                    textElement = index_1.getElement('cartesianChartTextGroup0');
                    expect(seriesElement).toEqual(null);
                    expect(shapeElement).toEqual(null);
                    expect(textElement).toEqual(null);
                    var lastLabel = index_1.getElement(ele.id + 'AxisLabels1');
                    expect(lastLabel.lastChild.innerHTML).toEqual('60');
                    expect((lastLabel.firstElementChild.innerHTML)).toEqual('0');
                    done();
                }, 301);
            });
            it('checking with log axis', function (done) {
                chart.primaryXAxis.valueType = 'Category';
                chart.primaryYAxis.valueType = 'Logarithmic';
                chart.series = [
                    { dataSource: [{ x: 'IND', y: 600 }, { x: 'AUS', y: 180 }], xName: 'x', yName: 'y', name: 'series2', animation: { enable: false } },
                    { dataSource: [{ x: 'IND', y: 45 }, { x: 'AUS', y: 5006 }], xName: 'x', yName: 'y', name: 'series1', animation: { enable: false } }
                ];
                chart.refresh();
                legendElement = index_1.getElement('cartesianChart_chart_legend_text_1');
                trigger.clickEvent(legendElement);
                setTimeout(function () {
                    seriesCollection = index_1.getElement(ele.id + 'SeriesCollection');
                    seriesElement = index_1.getElement('cartesianChartSeriesGroup1');
                    shapeElement = index_1.getElement('cartesianChartShapeGroup1');
                    textElement = index_1.getElement('cartesianChartTextGroup1');
                    expect(seriesElement).toEqual(null);
                    expect(shapeElement).toEqual(null);
                    expect(textElement).toEqual(null);
                    var lastLabel = index_1.getElement(ele.id + 'AxisLabels1');
                    expect(lastLabel.lastChild.innerHTML).toEqual('1000');
                    done();
                }, 301);
            });
            it('checking multiple axes', function (done) {
                chart.primaryXAxis.valueType = 'Double';
                chart.rows = [{ height: '50%', border: { width: 1, color: 'red' } }, { height: '50%', border: { width: 1, color: 'blue' } }];
                chart.axes = [{ rowIndex: 1, name: 'secondaryY' }];
                chart.series = [
                    { dataSource: [{ x: 2, y: 34 }, { x: 4, y: 45 }], xName: 'x', yName: 'y', type: 'Line', name: 'Ser1', animation: { enable: false } },
                    { dataSource: [{ x: 1, y: 50 }, { x: 5, y: 12 }], xName: 'x', yName: 'y', type: 'Line', name: 'Ser2', animation: { enable: false } },
                    { dataSource: [{ x: 1, y: 50 }, { x: 5, y: 12 }], xName: 'x', yName: 'y', type: 'Line', name: 'Ser3', yAxisName: 'secondaryY', animation: { enable: false } },
                    { dataSource: [{ x: 1, y: 50 }, { x: 5, y: 112 }], xName: 'x', yName: 'y', type: 'Line', name: 'Ser4', yAxisName: 'secondaryY', animation: { enable: false } },
                ];
                chart.refresh();
                seriesCollection = index_1.getElement(ele.id + 'SeriesCollection');
                legendElement = index_1.getElement('cartesianChart_chart_legend_text_3');
                expect(seriesCollection.childElementCount).toEqual(5);
                trigger.clickEvent(legendElement);
                setTimeout(function () {
                    seriesCollection = index_1.getElement(ele.id + 'SeriesCollection');
                    var lastLabel = index_1.getElement(ele.id + 'AxisLabels2');
                    expect(lastLabel.lastChild.innerHTML).toEqual('60');
                    expect(lastLabel.firstChild.innerHTML).toEqual('0');
                    expect(seriesCollection.childElementCount).toEqual(4);
                    done();
                }, 301);
            });
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
