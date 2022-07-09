define(["require", "exports", "@syncfusion/ej2-base", "../../../src/chart/chart", "../../../src/chart/series/histogram-series", "../../../src/chart/series/column-series", "../../../src/chart/user-interaction/tooltip", "../../../src/chart/user-interaction/crosshair", "../../../src/chart/series/data-label", "../base/events.spec", "../../common.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, chart_1, histogram_series_1, column_series_1, tooltip_1, crosshair_1, data_label_1, events_spec_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(column_series_1.ColumnSeries, tooltip_1.Tooltip, crosshair_1.Crosshair, data_label_1.DataLabel, histogram_series_1.HistogramSeries);
    describe('Chart Control', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('Chart Histogram series', function () {
            var chartObj;
            var elem;
            var point;
            var histo;
            var svg;
            var targetElement;
            var loaded;
            var done;
            var dataLabel;
            var trigger = new events_spec_1.MouseEvents();
            var x;
            var y;
            var animationComplete;
            var values = [23, 34, 23, 45, 56, 67, 12, 12, 43, 34, 23, 34, 23, 45, 56, 67, 12, 12, 43, 34, 23, 34, 23, 45, 56, 67, 12, 12, 43, 34,
                23, 34, 23, 45, 56, 67, 12, 12, 43, 34, 23, 34, 23, 45, 56, 67, 12, 12, 43, 34];
            var chartData = [];
            for (var i = 0; i < values.length; i++) {
                chartData.push({ y: values[i] });
            }
            beforeAll(function () {
                elem = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    series: [{
                            dataSource: chartData, yName: 'y', animation: { enable: false },
                            type: 'Histogram',
                            name: 'AgeCollections', fill: 'rgba(135,206,235,1)',
                        },
                    ], width: '800',
                    tooltip: { enable: true, textStyle: { size: '12px' } },
                    legendSettings: { visible: false },
                    title: 'Histogram agecollections'
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                elem.remove();
            });
            it('Checking with default histogram series', function (done) {
                loaded = function (args) {
                    histo = document.getElementById('container_Series_0_Point_0');
                    expect(histo != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'Histogram';
                chartObj.refresh();
            });
            it('Checking with series visibility', function (done) {
                loaded = function (args) {
                    histo = document.getElementById('container_Series_0_Point_0');
                    expect(histo != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'Histogram';
                chartObj.refresh();
            });
            it('Checking with numeric axis', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_3');
                    expect(svg.getAttribute('d') != '').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = chartData;
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.refresh();
            });
            it('Checking with default interval', function (done) {
                loaded = function (args) {
                    var svg1 = document.getElementById('container_Series_0_Point_0');
                    expect(svg1 != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking with given interval', function (done) {
                loaded = function (args) {
                    var svg1 = document.getElementById('container_Series_0_Point_0');
                    expect(svg1 != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.interval = 4;
                chartObj.refresh();
            });
            it('Checking with X-axis inversed', function (done) {
                loaded = function (args) {
                    var point1 = document.getElementById('container_Series_0_Point_0');
                    expect(point1 != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.isInversed = true;
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.refresh();
            });
            it('Checking with Y-axis inversed', function (done) {
                loaded = function (args) {
                    var svg1 = document.getElementById('container_Series_0_Point_0');
                    expect(svg1 != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryYAxis.isInversed = true;
                chartObj.refresh();
            });
            it('Checking with opposed position', function (done) {
                loaded = function (args) {
                    var svg1 = document.getElementById('container_Series_0_Point_0');
                    expect(svg1 != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.opposedPosition = true;
                chartObj.refresh();
            });
            it('checking with border', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_1');
                    expect(svg.getAttribute('stroke') === 'red').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].border.color = 'red';
                chartObj.series[0].border.width = 2;
                chartObj.primaryXAxis.opposedPosition = false;
                chartObj.primaryYAxis.isInversed = false;
                chartObj.refresh();
            });
            it('checking with point fill', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_1');
                    expect(svg.getAttribute('stroke') === 'red').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].fill = 'red';
                chartObj.refresh();
            });
            it('checking with default Tooltip', function (done) {
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_1');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = series.points[1].regions[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = series.points[1].regions[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    expect(target.getAttribute('opacity') == '0.5').toBe(true);
                    expect(parseFloat(tooltip.style.left) > series.points[1].regions[0].y + parseFloat(chartArea.getAttribute('y')));
                    target = document.getElementById('container_Series_0_Point_3');
                    series = chartObj.series[0];
                    y = series.points[3].regions[0].y + parseFloat(chartArea.getAttribute('y')) + 30 + elem.offsetTop;
                    x = series.points[3].regions[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    expect(target.getAttribute('opacity') == '0.5').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'Histogram';
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.series[0].dataSource = chartData;
                chartObj.refresh();
            });
            it('checking with track ball', function (done) {
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_2');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    series = chartObj.series[0];
                    y = series.points[3].regions[0].y + parseFloat(chartArea.getAttribute('y')) + 30 + elem.offsetTop;
                    x = series.points[3].regions[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    expect(target.getAttribute('opacity') == '1').toBe(true);
                    done();
                };
                chartObj.series[0].type = 'Histogram';
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.crosshairTooltip.enable = true;
                chartObj.primaryYAxis.crosshairTooltip.enable = true;
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.crosshair.enable = true;
                chartObj.tooltip.shared = true;
                chartObj.refresh();
            });
            it('checking with cross hair', function (done) {
                loaded = function (args) {
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var series = chartObj.series[0];
                    y = series.points[2].regions[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    x = series.points[2].regions[0].x + series.points[2].regions[0].width / 2 + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(chartArea, Math.ceil(x), Math.ceil(y));
                    var crosshair = document.getElementById('container_svg').childNodes[4];
                    var element1;
                    expect(crosshair.childNodes.length == 3).toBe(true);
                    element1 = crosshair.childNodes[0];
                    expect(element1.getAttribute('d').indexOf(chartArea.getAttribute('x')) > 0).toBe(true);
                    element1 = crosshair.childNodes[1];
                    expect(element1.getAttribute('d').indexOf(chartArea.getAttribute('y')) > 0).toBe(true);
                    expect(crosshair.childNodes[2].childNodes.length == 4).toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[0];
                    expect(element1.getAttribute('d') !== '').toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[2];
                    expect(element1.getAttribute('d') !== '').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = chartData;
                chartObj.series[0].type = 'Histogram';
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.crosshair.enable = true;
                chartObj.refresh();
            });
            it('checking with legend visbility', function (done) {
                loaded = function (args) {
                    var svg1 = document.getElementById('container_Series_0_Point_0');
                    expect(svg1 != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.legendSettings.visible = true;
                chartObj.refresh();
            });
            it('Checking with normal distribution', function (done) {
                loaded = function (args) {
                    histo = document.getElementById('container_Series_0_Point_0');
                    expect(histo != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'Histogram';
                chartObj.series[0].showNormalDistribution = true;
                chartObj.refresh();
            });
            it('checking with bin interval', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_2');
                    expect(svg.getAttribute('d') != '').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.series[0].dataSource = chartData;
                chartObj.series[0].binInterval = 4;
                chartObj.refresh();
            });
            it('Checking with normal distribution is transposed', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_2');
                    expect(svg.getAttribute('d') != '').toBe(true);
                    histo = document.getElementById('container_Series_0_Point_0');
                    expect(histo != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'Histogram';
                chartObj.series[0].showNormalDistribution = true;
                chartObj.isTransposed = true;
                chartObj.refresh();
            });
            it('checking with multiple axes and panes', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_2');
                    expect(svg.getAttribute('d') != '').toBe(true);
                    histo = document.getElementById('container_Series_0_Point_0');
                    expect(histo != null).toBe(true);
                    done();
                };
                chartObj.primaryXAxis = { title: 'pyXAxis' };
                chartObj.loaded = loaded;
                chartObj.isTransposed = false;
                chartObj.rows = [{ height: '50%' }, { height: '50%' }];
                chartObj.axes = [{
                        rowIndex: 1, opposedPosition: true,
                        name: 'yAxis'
                    }];
                chartObj.series = [
                    {
                        type: 'Histogram', animation: { enable: false }, dataSource: chartData,
                        yName: 'y', name: 'Germany'
                    },
                    {
                        type: 'Histogram', animation: { enable: false }, dataSource: chartData,
                        yName: 'y', yAxisName: 'yAxis', name: 'Japan'
                    }
                ];
                chartObj.refresh();
            });
            it('Checking with animation', function (done) {
                animationComplete = function (args) {
                    var point = document.getElementById('container_Series_' + args.series.index + '_Point_0');
                    expect(point.getAttribute('transform') === 'translate(0,0)').toBe(true);
                    var elem = document.getElementById('container_Series_' + args.series.index + '_NDLine');
                    expect(elem.style.visibility).toBe('hidden');
                    done();
                };
                chartObj.series[0].showNormalDistribution = true;
                chartObj.series[0].animation.enable = true;
                chartObj.animationComplete = animationComplete;
                chartObj.refresh();
            });
        });
        describe('Histogram Series with data label', function () {
            var chartObj;
            var loaded;
            var animationComplete;
            var element;
            var values = [23, 34, 23, 45, 56, 67, 12, 12, 43, 34, 23, 34, 23, 45, 56, 67, 12, 12, 43, 34, 23, 34, 23, 45, 56, 67, 12, 12, 43, 34,
                23, 34, 23, 45, 56, 67, 12, 12, 43, 34, 23, 34, 23, 45, 56, 67, 12, 12, 43, 34];
            var chartData = [];
            for (var i = 0; i < values.length; i++) {
                chartData.push({ y: values[i] });
            }
            beforeAll(function () {
                element = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(element);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal' },
                    series: [{
                            animation: { enable: false },
                            name: 'AgeCollections', dataSource: chartData, yName: 'y',
                            type: 'Histogram',
                            fill: 'rgba(135,206,235,1)',
                            marker: { visible: false, dataLabel: { visible: true, fill: 'violet' } }
                        }],
                    width: '800',
                    title: 'Hisogram Age collections', loaded: loaded,
                    legendSettings: { visible: false }
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                element.remove();
            });
            it('With Label position Auto', function (done) {
                loaded = function (args) {
                    var svg = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('x');
                    var point0Location = chartObj.series[0].points[1].symbolLocations[0].x;
                    expect(svg < point0Location).toBe(true);
                    var svg1 = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('x');
                    var pointLocation1 = chartObj.series[0].points[0].symbolLocations[0].x;
                    expect(svg > pointLocation1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Auto';
                chartObj.refresh();
            });
            it('With Label position Bottom', function (done) {
                loaded = function (args) {
                    var svg = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('x');
                    var point0Location = (chartObj.series[0].points[1].regions[0].x +
                        chartObj.series[0].points[1].regions[0].width);
                    expect(svg < point0Location).toBe(true);
                    var svg1 = +document.getElementById('container_Series_0_Point_0_TextShape_0').getAttribute('x');
                    var point0Location1 = chartObj.series[0].points[0].regions[0].x;
                    expect(svg1 > point0Location1).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Bottom';
                chartObj.refresh();
            });
            it('Color saturation with data label fill color', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_1_TextShape_0');
                    expect(element.getAttribute('fill') === 'red').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.fill = 'red';
                chartObj.series[0].marker.dataLabel.position = 'Outer';
                chartObj.series[0].type = 'Histogram';
                chartObj.refresh();
            });
            it('Checking Events', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_2');
                    expect(element.getAttribute('fill') == 'brown').toBe(true);
                    done();
                };
                chartObj.pointRender = function (args) {
                    if (args.point.index === 2) {
                        args.fill = 'brown';
                    }
                };
                chartObj.loaded = loaded;
                chartObj.title = 'Events Changed';
                chartObj.dataBind();
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
