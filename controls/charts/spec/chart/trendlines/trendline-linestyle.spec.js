define(["require", "exports", "@syncfusion/ej2-base", "../../../src/chart/chart", "../../../src/chart/legend/legend", "../../../src/chart/series/line-series", "../../../src/chart/series/scatter-series", "../../../src/chart/trend-lines/trend-line", "../base/events.spec", "../../../src/chart/axis/category-axis", "../../common.spec"], function (require, exports, ej2_base_1, chart_1, legend_1, line_series_1, scatter_series_1, trend_line_1, events_spec_1, category_axis_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(legend_1.Legend, trend_line_1.Trendlines, line_series_1.LineSeries, scatter_series_1.ScatterSeries, category_axis_1.Category);
    var series1 = [];
    var yValue = [7.66, 8.03, 8.41, 8.97, 8.77, 8.20, 8.16, 7.89, 8.68, 9.48, 10.11, 11.36, 12.34, 12.60, 12.95, 13.91, 16.21, 17.50, 22.72, 28.14, 31.26, 31.39, 32.43, 35.52, 36.36,
        41.33, 43.12, 45.00, 47.23, 48.62, 46.60, 45.28, 44.01, 45.17, 41.20, 43.41, 48.32, 45.65, 46.61, 53.34, 58.53];
    var point1;
    var i;
    var j = 0;
    for (i = 1973; i <= 2013; i++) {
        point1 = { x: i, y: yValue[j] };
        series1.push(point1);
        j++;
    }
    describe('Chart', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        var element;
        describe('LineStyle and Visbility', function () {
            var chartObj;
            var loaded;
            var legendClick;
            var trigger = new events_spec_1.MouseEvents();
            var legendElement;
            element = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(element);
                chartObj = new chart_1.Chart({
                    primaryXAxis: {
                        title: 'Months',
                    },
                    primaryYAxis: {
                        title: 'Rupees against Dollars',
                        interval: 5
                    },
                    series: [{
                            dataSource: series1,
                            xName: 'x', yName: 'y',
                            name: 'Apple Inc',
                            fill: '#0066FF',
                            type: 'Scatter',
                            trendlines: [{ type: 'Linear', forwardForecast: 5, name: 'Linear' }]
                        }],
                    title: 'Online trading'
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                document.getElementById('container').remove();
            });
            it('Trendline with line style', function (done) {
                loaded = function (args) {
                    var dasharray = document.getElementById('container_Series_0_TrendLine_0').getAttribute('stroke-dasharray');
                    expect(dasharray === '4,5');
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].trendlines[0].dashArray = '4,5';
                chartObj.series[0].trendlines[0].fill = 'red';
                chartObj.series[0].trendlines[0].width = 1.5;
                chartObj.refresh();
            });
            it('Trendline visibility', function (done) {
                loaded = function (args) {
                    var stroke = document.getElementById('container_chart_legend_shape_1').getAttribute('stroke');
                    expect(stroke === '#D3D3D3');
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].trendlines[0].visible = false;
                chartObj.refresh();
            });
            it('Checking trendline legend text visibility', function (done) {
                loaded = function (args) {
                    var fill = document.getElementById('container_chart_legend_text_1').getAttribute('fill');
                    expect(fill === '#353535');
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].trendlines[0].visible = true;
                chartObj.refresh();
            });
            it('Check fill color after legend click', function (done) {
                chartObj.loaded = function (args) {
                    chartObj.loaded = null;
                    legendElement = document.getElementById('container_chart_legend_shape_1');
                    trigger.clickEvent(legendElement);
                    expect(legendElement.getAttribute('fill') === '#D3D3D3').toBe(true);
                    done();
                };
                chartObj.refresh();
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
