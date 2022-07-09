define(["require", "exports", "@syncfusion/ej2-base", "../../src/index", "../../src/stock-chart/index", "./indicatordata.spec", "../chart/base/events.spec", "../common.spec"], function (require, exports, ej2_base_1, index_1, index_2, indicatordata_spec_1, events_spec_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    index_2.StockChart.Inject(index_1.CandleSeries, index_1.DateTime, index_1.Tooltip, index_1.RangeTooltip, index_1.Zoom, index_2.StockLegend);
    index_2.StockChart.Inject(index_2.HiloOpenCloseSeries, index_2.HiloSeries, index_2.SplineAreaSeries, index_2.SplineSeries, index_2.LineSeries);
    describe('Stock Chart with Legend', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('stock chart', function () {
            var chart;
            var chartElement = ej2_base_1.createElement('div', { id: 'stock' });
            var trigger = new events_spec_1.MouseEvents();
            var seriesCollection;
            var seriesElement;
            var textElement;
            var shapeElement;
            var element;
            var titleElement;
            var xValue;
            var yValue;
            var id = 'stock';
            var legendId = id + '_chart_legend';
            var legendElement;
            var prevent = function () {
            };
            beforeAll(function () {
                document.body.appendChild(chartElement);
                chart = new index_2.StockChart({
                    primaryXAxis: { valueType: 'DateTime' },
                    series: [{
                            xName: 'x', high: 'high', low: 'low', open: 'open', close: 'close',
                            dataSource: indicatordata_spec_1.chartData, type: 'Candle', yName: 'close'
                        }],
                });
            });
            afterAll(function () {
                chart.destroy();
                chartElement.remove();
            });
            it('Checking accumulation instance creation', function (done) {
                chart.loaded = function (args) {
                    expect(chart != null).toBe(true);
                    done();
                };
                chart.appendTo('#stock');
            });
            it('checking with legend visible as False', function (done) {
                chart.loaded = function (args) {
                    element = index_1.getElement('stock_stockChart_svg');
                    expect(element.childElementCount).toEqual(2);
                    done();
                };
                chart.series = [{
                        xName: 'x', high: 'high', low: 'low', open: 'open', close: 'close',
                        dataSource: indicatordata_spec_1.chartData, type: 'Candle', yName: 'close'
                    }];
                chart.legendSettings.visible = false;
                chart.refresh();
            });
            it('checking with legend visible as True', function (done) {
                chart.loaded = function (args) {
                    element = index_1.getElement('stock_stockChart_svg');
                    expect(element.childElementCount).toEqual(4);
                    done();
                };
                chart.series = [{
                        xName: 'x', high: 'high', low: 'low', open: 'open', close: 'close',
                        dataSource: indicatordata_spec_1.chartData, type: 'Candle', yName: 'close', name: 'StockChart'
                    }];
                chart.legendSettings.visible = true;
                chart.refresh();
            });
            it('checking with series type as Candle', function (done) {
                chart.loaded = function (args) {
                    element = index_1.getElement('stock_stockChart_svg');
                    expect(element.childElementCount).toEqual(4);
                    done();
                };
                chart.series = [{
                        xName: 'x', high: 'high', low: 'low', open: 'open', close: 'close',
                        dataSource: indicatordata_spec_1.chartData, type: 'Candle', yName: 'close', name: 'StockChart'
                    }];
                chart.refresh();
            });
            it('checking with series type as Hilo', function (done) {
                chart.loaded = function (args) {
                    element = index_1.getElement('stock_stockChart_svg');
                    expect(element.childElementCount).toEqual(4);
                    done();
                };
                chart.series = [{
                        xName: 'x', high: 'high', low: 'low', open: 'open', close: 'close',
                        dataSource: indicatordata_spec_1.chartData, type: 'Hilo', yName: 'close', name: 'StockChart'
                    }];
                chart.refresh();
            });
            it('checking with series type as HiloOpenClose', function (done) {
                chart.loaded = function (args) {
                    element = index_1.getElement('stock_stockChart_svg');
                    expect(element.childElementCount).toEqual(4);
                    done();
                };
                chart.series = [{
                        xName: 'x', high: 'high', low: 'low', open: 'open', close: 'close',
                        dataSource: indicatordata_spec_1.chartData, type: 'HiloOpenClose', yName: 'close', name: 'StockChart'
                    }];
                chart.refresh();
            });
            it('checking with series type as Line', function (done) {
                chart.loaded = function (args) {
                    element = index_1.getElement('stock_stockChart_svg');
                    expect(element.childElementCount).toEqual(4);
                    done();
                };
                chart.series = [{
                        xName: 'x', high: 'high', low: 'low', open: 'open', close: 'close',
                        dataSource: indicatordata_spec_1.chartData, type: 'Line', yName: 'close', name: 'StockChart'
                    }];
                chart.refresh();
            });
            it('checking with series type as Spline', function (done) {
                chart.loaded = function (args) {
                    element = index_1.getElement('stock_stockChart_svg');
                    expect(element.childElementCount).toEqual(4);
                    done();
                };
                chart.series = [{
                        xName: 'x', high: 'high', low: 'low', open: 'open', close: 'close',
                        dataSource: indicatordata_spec_1.chartData, type: 'Spline', yName: 'close', name: 'StockChart'
                    }];
                chart.refresh();
            });
            it('checking with series type as SplineArea', function (done) {
                chart.loaded = function (args) {
                    element = index_1.getElement('stock_stockChart_svg');
                    expect(element.childElementCount).toEqual(4);
                    done();
                };
                chart.series = [{
                        xName: 'x', high: 'high', low: 'low', open: 'open', close: 'close',
                        dataSource: indicatordata_spec_1.chartData, type: 'SplineArea', yName: 'close', name: 'StockChart'
                    }];
                chart.refresh();
            });
            it('checking with multiple series', function (done) {
                chart.loaded = function (args) {
                    element = index_1.getElement('stock_stockChart_svg');
                    expect(element.childElementCount).toEqual(4);
                    done();
                };
                chart.series = [{
                        xName: 'x', high: 'high', low: 'low', open: 'open', close: 'close',
                        dataSource: indicatordata_spec_1.chartData, type: 'Line', yName: 'high', name: 'StockChart-1'
                    },
                    {
                        xName: 'x', high: 'high', low: 'low', open: 'open', close: 'close',
                        dataSource: indicatordata_spec_1.chartData, type: 'Spline', yName: 'close', name: 'StockChart-2'
                    }];
                chart.refresh();
            });
            it('checking with legend shape as Circle ', function (done) {
                chart.loaded = function (args) {
                    legendElement = document.getElementById(legendId + '_shape_0');
                    expect(legendElement.tagName).toEqual('ellipse');
                    expect(legendElement.getAttribute('rx')).toEqual('5');
                    expect(legendElement.getAttribute('ry')).toEqual('5');
                    done();
                };
                chart.series = [{
                        xName: 'x', high: 'high', low: 'low', open: 'open', close: 'close',
                        dataSource: indicatordata_spec_1.chartData, type: 'Spline', yName: 'close', name: 'StockChart'
                    }];
                chart.series[0].legendShape = 'Circle';
                chart.refresh();
            });
            it('checking with legend shape as Rectangle ', function (done) {
                chart.loaded = function (args) {
                    legendElement = document.getElementById(legendId + '_shape_0');
                    expect(legendElement.tagName).toEqual('path');
                    expect(legendElement.getAttribute('d')).not.toEqual(null);
                    done();
                };
                chart.series[0].legendShape = 'Rectangle';
                chart.refresh();
            });
            it('checking with legend shape as Cross ', function (done) {
                chart.loaded = function (args) {
                    legendElement = document.getElementById(legendId + '_shape_0');
                    expect(legendElement.tagName).toEqual('path');
                    expect(legendElement.getAttribute('d')).not.toEqual(null);
                    done();
                };
                chart.series[0].legendShape = 'Cross';
                chart.refresh();
            });
            it('checking with legend shape as Diamond ', function (done) {
                chart.loaded = function (args) {
                    legendElement = document.getElementById(legendId + '_shape_0');
                    expect(legendElement.tagName).toEqual('path');
                    expect(legendElement.getAttribute('d')).not.toEqual(null);
                    done();
                };
                chart.series[0].legendShape = 'Diamond';
                chart.refresh();
            });
            it('checking with legend shape as HorizontalLine ', function (done) {
                chart.loaded = function (args) {
                    legendElement = document.getElementById(legendId + '_shape_0');
                    expect(legendElement.tagName).toEqual('path');
                    expect(legendElement.getAttribute('d')).not.toEqual(null);
                    done();
                };
                chart.series[0].legendShape = 'HorizontalLine';
                chart.refresh();
            });
            it('checking with legend shape as VerticalLine ', function (done) {
                chart.loaded = function (args) {
                    legendElement = document.getElementById(legendId + '_shape_0');
                    expect(legendElement.tagName).toEqual('path');
                    expect(legendElement.getAttribute('d')).not.toEqual(null);
                    done();
                };
                chart.series[0].legendShape = 'VerticalLine';
                chart.refresh();
            });
            it('checking with legend shape as Triangle ', function (done) {
                chart.loaded = function (args) {
                    legendElement = document.getElementById(legendId + '_shape_0');
                    expect(legendElement.tagName).toEqual('path');
                    expect(legendElement.getAttribute('d')).not.toEqual(null);
                    done();
                };
                chart.series[0].legendShape = 'Triangle';
                chart.refresh();
            });
            it('checking with legend shape as InvertedTriangle ', function (done) {
                chart.loaded = function (args) {
                    legendElement = document.getElementById(legendId + '_shape_0');
                    expect(legendElement.tagName).toEqual('path');
                    expect(legendElement.getAttribute('d')).not.toEqual(null);
                    done();
                };
                chart.series[0].legendShape = 'InvertedTriangle';
                chart.refresh();
            });
            it('checking with legend shape as Pentagon ', function (done) {
                chart.loaded = function (args) {
                    legendElement = document.getElementById(legendId + '_shape_0');
                    expect(legendElement.tagName).toEqual('path');
                    expect(legendElement.getAttribute('d')).not.toEqual(null);
                    done();
                };
                chart.series[0].legendShape = 'Pentagon';
                chart.refresh();
            });
            it('checking with legend with Height only ', function (done) {
                chart.loaded = function (args) {
                    legendElement = document.getElementById(legendId + '_element');
                    expect(parseInt(legendElement.getAttribute('height'), 10)).toEqual(100);
                    done();
                };
                chart.series[0].legendShape = 'SeriesType';
                chart.legendSettings.border.color = 'red';
                chart.legendSettings.border.width = 1;
                chart.legendSettings = { height: '100' };
                chart.refresh();
            });
            it('checking with legend with Width only ', function (done) {
                chart.loaded = function (args) {
                    legendElement = document.getElementById(legendId + '_element');
                    expect(parseInt(legendElement.getAttribute('width'), 10)).toEqual(240);
                    done();
                };
                chart.legendSettings = { height: null, width: '240' };
                chart.refresh();
            });
            it('checking with legend with Width and Height ', function (done) {
                chart.loaded = function (args) {
                    legendElement = document.getElementById(legendId + '_element');
                    expect(parseInt(legendElement.getAttribute('width'), 10)).toEqual(240);
                    expect(parseInt(legendElement.getAttribute('height'), 10)).toEqual(100);
                    done();
                };
                chart.legendSettings = { height: '100', width: '240' };
                chart.refresh();
            });
            it('checking with legend in position Bottom and alignment Near ', function (done) {
                chart.loaded = function (args) {
                    legendElement = document.getElementById(legendId + '_element');
                    xValue = legendElement.getAttribute('x');
                    yValue = legendElement.getAttribute('y');
                    expect(xValue === '0.5' || xValue === '1').toBe(true);
                    expect(yValue === '374' || yValue === '375').toBe(true);
                    done();
                };
                chart.legendSettings = { height: null, width: null };
                chart.legendSettings.border.color = '';
                chart.legendSettings.position = 'Bottom';
                chart.legendSettings.alignment = 'Near';
                chart.refresh();
            });
            it('checking with legend in position Bottom and alignment Center ', function (done) {
                chart.loaded = function (args) {
                    legendElement = document.getElementById(legendId + '_element');
                    xValue = legendElement.getAttribute('x');
                    yValue = legendElement.getAttribute('y');
                    expect(xValue === '585.5' || xValue === '332.5' || xValue === '339.5').toBe(true);
                    expect(yValue === '374' || yValue === '375').toBe(true);
                    done();
                };
                chart.legendSettings.position = 'Bottom';
                chart.legendSettings.alignment = 'Center';
                chart.refresh();
            });
            it('checking with legend in position Bottom and alignment Far ', function (done) {
                chart.loaded = function (args) {
                    legendElement = document.getElementById(legendId + '_element');
                    xValue = legendElement.getAttribute('x');
                    yValue = legendElement.getAttribute('y');
                    expect(xValue === '1170' || xValue === '664' || xValue === '678').toBe(true);
                    expect(yValue === '374' || yValue === '375').toBe(true);
                    done();
                };
                chart.legendSettings.position = 'Bottom';
                chart.legendSettings.alignment = 'Far';
                chart.refresh();
            });
            it('checking with legend in position Top and alignment Near ', function (done) {
                chart.loaded = function (args) {
                    legendElement = document.getElementById(legendId + '_element');
                    xValue = legendElement.getAttribute('x');
                    yValue = legendElement.getAttribute('y');
                    expect(xValue === '1').toBe(true);
                    expect(yValue === '2.5').toBe(true);
                    done();
                };
                chart.legendSettings.position = 'Top';
                chart.legendSettings.alignment = 'Near';
                chart.refresh();
            });
            it('checking with legend in position Top and alignment Center ', function (done) {
                chart.loaded = function (args) {
                    legendElement = document.getElementById(legendId + '_element');
                    xValue = legendElement.getAttribute('x');
                    yValue = legendElement.getAttribute('y');
                    expect(xValue === '585.5' || xValue === '332.5' || xValue === '339.5').toBe(true);
                    expect(yValue === '2.5').toBe(true);
                    done();
                };
                chart.legendSettings.position = 'Top';
                chart.legendSettings.alignment = 'Center';
                chart.refresh();
            });
            it('checking with legend in position Top and alignment Far ', function (done) {
                chart.loaded = function (args) {
                    legendElement = document.getElementById(legendId + '_element');
                    xValue = legendElement.getAttribute('x');
                    yValue = legendElement.getAttribute('y');
                    expect(xValue === '1170' || xValue === '664' || xValue === '678').toBe(true);
                    expect(yValue === '2.5').toBe(true);
                    done();
                };
                chart.legendSettings.position = 'Top';
                chart.legendSettings.alignment = 'Far';
                chart.refresh();
            });
            it('checking with legend in position Left and alignment Near ', function (done) {
                chart.loaded = function (args) {
                    legendElement = document.getElementById(legendId + '_element');
                    xValue = legendElement.getAttribute('x');
                    yValue = legendElement.getAttribute('y');
                    expect(xValue === '1').toBe(true);
                    expect(yValue === '1.5').toBe(true);
                    done();
                };
                chart.legendSettings.position = 'Left';
                chart.legendSettings.alignment = 'Near';
                chart.refresh();
            });
            it('checking with legend in position Left and alignment Center ', function (done) {
                chart.loaded = function (args) {
                    legendElement = document.getElementById(legendId + '_element');
                    xValue = legendElement.getAttribute('x');
                    yValue = legendElement.getAttribute('y');
                    expect(xValue === '1').toBe(true);
                    expect(yValue === '183.25' || yValue === '183.75').toBe(true);
                    done();
                };
                chart.legendSettings.position = 'Left';
                chart.legendSettings.alignment = 'Center';
                chart.refresh();
            });
            it('checking with legend in position Left and alignment Far ', function (done) {
                chart.loaded = function (args) {
                    legendElement = document.getElementById(legendId + '_element');
                    xValue = legendElement.getAttribute('x');
                    yValue = legendElement.getAttribute('y');
                    expect(xValue === '1').toBe(true);
                    expect(yValue === '365' || yValue === '366').toBe(true);
                    done();
                };
                chart.legendSettings.position = 'Left';
                chart.legendSettings.alignment = 'Far';
                chart.refresh();
            });
            it('checking with legend in position Right and alignment Near ', function (done) {
                chart.loaded = function (args) {
                    legendElement = document.getElementById(legendId + '_element');
                    xValue = legendElement.getAttribute('x');
                    yValue = legendElement.getAttribute('y');
                    expect(xValue === '1170' || xValue === '665' || xValue === '678').toBe(true);
                    expect(yValue === '1.5').toBe(true);
                    done();
                };
                chart.legendSettings.position = 'Right';
                chart.legendSettings.alignment = 'Near';
                chart.refresh();
            });
            it('checking with legend in position Right and alignment Center ', function (done) {
                chart.loaded = function (args) {
                    legendElement = document.getElementById(legendId + '_element');
                    xValue = legendElement.getAttribute('x');
                    yValue = legendElement.getAttribute('y');
                    expect(xValue === '1170' || xValue === '665' || xValue === '678').toBe(true);
                    expect(yValue === '183.25' || yValue === '183.75').toBe(true);
                    done();
                };
                chart.legendSettings.position = 'Right';
                chart.legendSettings.alignment = 'Center';
                chart.refresh();
            });
            it('checking with legend in position Right and alignment Far ', function (done) {
                chart.loaded = function (args) {
                    legendElement = document.getElementById(legendId + '_element');
                    xValue = legendElement.getAttribute('x');
                    yValue = legendElement.getAttribute('y');
                    expect(xValue === '1170' || xValue === '665' || xValue === '678').toBe(true);
                    expect(yValue === '365' || yValue === '366').toBe(true);
                    done();
                };
                chart.legendSettings.position = 'Right';
                chart.legendSettings.alignment = 'Far';
                chart.refresh();
            });
            it('checking with legend title content ', function (done) {
                chart.loaded = function (args) {
                    titleElement = document.getElementById('stock_chart_legend_title');
                    expect(titleElement.textContent === 'Legend Title').toBe(true);
                    done();
                };
                chart.legendSettings.position = 'Bottom';
                chart.legendSettings.alignment = 'Center';
                chart.legendSettings.title = 'Legend Title';
                chart.legendSettings.titlePosition = 'Top';
                chart.refresh();
            });
            it('checking with legend bottom and title Top ', function (done) {
                chart.loaded = function (args) {
                    titleElement = document.getElementById('stock_chart_legend_title');
                    xValue = titleElement.getAttribute('x');
                    yValue = titleElement.getAttribute('y');
                    expect(xValue === '632' || xValue === '379' || xValue === '384.5').toBe(true);
                    expect(yValue === '369' || yValue === '370').toBe(true);
                    done();
                };
                chart.legendSettings.position = 'Bottom';
                chart.legendSettings.titlePosition = 'Top';
                chart.refresh();
            });
            it('checking with legend bottom and title Right ', function (done) {
                chart.loaded = function (args) {
                    titleElement = document.getElementById('stock_chart_legend_title');
                    xValue = titleElement.getAttribute('x');
                    yValue = titleElement.getAttribute('y');
                    expect(xValue === '643.5' || xValue === '390.5' || xValue === '396.5').toBe(true);
                    expect(yValue === '394.75' || yValue === '395').toBe(true);
                    done();
                };
                chart.legendSettings.position = 'Bottom';
                chart.legendSettings.titlePosition = 'Right';
                chart.refresh();
            });
            it('checking with legend bottom and title Left ', function (done) {
                chart.loaded = function (args) {
                    titleElement = document.getElementById('stock_chart_legend_title');
                    xValue = titleElement.getAttribute('x');
                    yValue = titleElement.getAttribute('y');
                    expect(xValue === '550.5' || xValue === '297.5' || xValue === '306.5').toBe(true);
                    expect(yValue === '394.75' || yValue === '395').toBe(true);
                    done();
                };
                chart.legendSettings.position = 'Bottom';
                chart.legendSettings.titlePosition = 'Left';
                chart.refresh();
            });
            it('checking with legend Top and title Top ', function (done) {
                chart.loaded = function (args) {
                    titleElement = document.getElementById('stock_chart_legend_title');
                    xValue = titleElement.getAttribute('x');
                    yValue = titleElement.getAttribute('y');
                    expect(xValue === '632' || xValue === '379' || xValue === '384.5').toBe(true);
                    expect(yValue === '18.5' || yValue === '19.5').toBe(true);
                    done();
                };
                chart.legendSettings.position = 'Top';
                chart.legendSettings.titlePosition = 'Top';
                chart.refresh();
            });
            it('checking with legend Top and title Left ', function (done) {
                chart.loaded = function (args) {
                    titleElement = document.getElementById('stock_chart_legend_title');
                    xValue = titleElement.getAttribute('x');
                    yValue = titleElement.getAttribute('y');
                    expect(xValue === '550.5' || xValue === '297.5' || xValue === '306.5').toBe(true);
                    expect(yValue === '22.25' || yValue === '23.25' || yValue === '22.5').toBe(true);
                    done();
                };
                chart.legendSettings.position = 'Top';
                chart.legendSettings.titlePosition = 'Left';
                chart.refresh();
            });
            it('checking with legend Top and title Right ', function (done) {
                chart.loaded = function (args) {
                    titleElement = document.getElementById('stock_chart_legend_title');
                    xValue = titleElement.getAttribute('x');
                    yValue = titleElement.getAttribute('y');
                    expect(xValue === '643.5' || xValue === '390.5' || xValue === '396.5').toBe(true);
                    expect(yValue === '22.25' || yValue === '23.25' || yValue === '22.5').toBe(true);
                    done();
                };
                chart.legendSettings.position = 'Top';
                chart.legendSettings.titlePosition = 'Right';
                chart.refresh();
            });
            it('checking with legend Right and title Top ', function (done) {
                chart.loaded = function (args) {
                    titleElement = document.getElementById('stock_chart_legend_title');
                    xValue = titleElement.getAttribute('x');
                    yValue = titleElement.getAttribute('y');
                    expect(xValue === '1216.5' || xValue === '710.5' || xValue === '723').toBe(true);
                    expect(yValue === '189.25').toBe(true);
                    done();
                };
                chart.legendSettings.position = 'Right';
                chart.legendSettings.titlePosition = 'Top';
                chart.refresh();
            });
            it('checking with legend Right and title Left ', function (done) {
                chart.loaded = function (args) {
                    titleElement = document.getElementById('stock_chart_legend_title');
                    xValue = titleElement.getAttribute('x');
                    yValue = titleElement.getAttribute('y');
                    expect(xValue === '1216.5' || xValue === '710.5' || xValue === '723').toBe(true);
                    expect(yValue === '189.25').toBe(true);
                    done();
                };
                chart.legendSettings.position = 'Right';
                chart.legendSettings.titlePosition = 'Left';
                chart.refresh();
            });
            it('checking with legend Right and title Right ', function (done) {
                chart.loaded = function (args) {
                    titleElement = document.getElementById('stock_chart_legend_title');
                    xValue = titleElement.getAttribute('x');
                    yValue = titleElement.getAttribute('y');
                    expect(xValue === '1216.5' || xValue === '710.5' || xValue === '723').toBe(true);
                    expect(yValue === '189.25').toBe(true);
                    done();
                };
                chart.legendSettings.position = 'Right';
                chart.legendSettings.titlePosition = 'Right';
                chart.refresh();
            });
            it('checking with legend Left and title Top ', function (done) {
                chart.loaded = function (args) {
                    titleElement = document.getElementById('stock_chart_legend_title');
                    xValue = titleElement.getAttribute('x');
                    yValue = titleElement.getAttribute('y');
                    expect(xValue === '46.5' || xValue === '47.5' || xValue === '46').toBe(true);
                    expect(yValue === '188.75' || yValue === '189.25').toBe(true);
                    done();
                };
                chart.legendSettings.position = 'Left';
                chart.legendSettings.titlePosition = 'Top';
                chart.refresh();
            });
            it('checking with legend Left and title Left ', function (done) {
                chart.loaded = function (args) {
                    titleElement = document.getElementById('stock_chart_legend_title');
                    xValue = titleElement.getAttribute('x');
                    yValue = titleElement.getAttribute('y');
                    expect(xValue === '46.5' || xValue === '47.5' || xValue === '46').toBe(true);
                    expect(yValue === '188.75' || yValue === '189.25').toBe(true);
                    done();
                };
                chart.legendSettings.position = 'Left';
                chart.legendSettings.titlePosition = 'Left';
                chart.refresh();
            });
            it('checking with legend Left and title Right ', function (done) {
                chart.loaded = function (args) {
                    titleElement = document.getElementById('stock_chart_legend_title');
                    xValue = titleElement.getAttribute('x');
                    yValue = titleElement.getAttribute('y');
                    expect(xValue === '46.5' || xValue === '47.5' || xValue === '46').toBe(true);
                    expect(yValue === '188.75' || yValue === '189.25').toBe(true);
                    done();
                };
                chart.legendSettings.position = 'Left';
                chart.legendSettings.titlePosition = 'Right';
                chart.refresh();
            });
            it('checking with legend in Inversed ', function (done) {
                chart.loaded = function (args) {
                    var legendText = document.getElementById('stock_chart_legend_text_0');
                    xValue = legendText.getAttribute('x');
                    yValue = legendText.getAttribute('y');
                    expect(xValue === '593.5' || xValue === '340.5' || xValue === '347.5').toBe(true);
                    expect(yValue === '394.75' || yValue === '395').toBe(true);
                    done();
                };
                chart.legendSettings.position = 'Auto';
                chart.legendSettings.title = null;
                chart.legendSettings.isInversed = true;
                chart.refresh();
            });
            it('checking series before legend click ', function (done) {
                chart.loaded = function (args) {
                    seriesElement = document.getElementById('stock_stockChart_chartSeriesGroup1');
                    seriesCollection = document.getElementById('stock_stockChart_chartSeriesCollection');
                    done();
                };
                chart.series = [{
                        xName: 'x', high: 'high', low: 'low', open: 'open', close: 'close',
                        dataSource: indicatordata_spec_1.chartData, type: 'Line', yName: 'high', name: 'StockChart-1'
                    },
                    {
                        xName: 'x', high: 'high', low: 'low', open: 'open', close: 'close',
                        dataSource: indicatordata_spec_1.chartData, type: 'Spline', yName: 'close', name: 'StockChart-2'
                    }];
                chart.legendSettings.isInversed = false;
                chart.refresh();
            });
            it('checking with legend click to deselect series', function (done) {
                legendElement = document.getElementById('stock_chart_legend_text_1');
                trigger.clickEvent(legendElement);
                setTimeout(function () {
                    seriesElement = document.getElementById('stock_stockChart_chartSeriesGroup1');
                    seriesCollection = document.getElementById('stock_stockChart_chartSeriesCollection');
                    expect(seriesCollection.childElementCount).toEqual(2);
                    expect(seriesElement).toEqual(null);
                    done();
                }, 301);
            });
            it('checking with legend click to deselect series', function (done) {
                legendElement = document.getElementById('stock_chart_legend_text_1');
                trigger.clickEvent(legendElement);
                setTimeout(function () {
                    seriesElement = document.getElementById('stock_stockChart_chartSeriesGroup1');
                    seriesCollection = document.getElementById('stock_stockChart_chartSeriesCollection');
                    expect(seriesCollection.childElementCount).toEqual(3);
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
