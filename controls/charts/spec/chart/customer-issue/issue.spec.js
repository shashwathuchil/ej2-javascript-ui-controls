define(["require", "exports", "../../../src/index", "@syncfusion/ej2-base", "@syncfusion/ej2-data", "../base/events.spec"], function (require, exports, index_1, ej2_base_1, ej2_data_1, events_spec_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    index_1.Chart.Inject(index_1.Category, index_1.LineSeries, index_1.Legend);
    describe('Chart Issue fixes', function () {
        describe('Axis hide while legend click', function () {
            var legendChart;
            var rangeElement;
            var testElement;
            var data = [{ x: 2000, y: 1 }, { x: 2001, y: 2.0 }, { x: 2002, y: 3.0 }, { x: 2003, y: 4.4 }];
            rangeElement = ej2_base_1.createElement('div', { id: 'rangeContainer' });
            document.body.appendChild(rangeElement);
            var trigger = new events_spec_1.MouseEvents();
            beforeAll(function () {
                legendChart = new index_1.Chart({
                    primaryXAxis: { isInversed: true, interval: 1, valueType: 'Category' },
                    primaryYAxis: { title: 'Revenue in Millions', labelFormat: '{value}M', isInversed: true },
                    axes: [
                        { name: 'secondXAxis', title: 'secondXAxis', valueType: 'Category', opposedPosition: true },
                        { name: 'secondYAxis', title: 'secondYAxis', opposedPosition: true }
                    ],
                    series: [
                        {
                            xName: 'x', width: 2, yName: 'y', name: 'Product A',
                            dataSource: new ej2_data_1.DataManager(data), animation: { enable: false }
                        },
                        {
                            xName: 'x', width: 2, yName: 'y', name: 'Product B', xAxisName: 'secondXAxis', yAxisName: 'secondYAxis',
                            dataSource: new ej2_data_1.DataManager(data), animation: { enable: false }
                        }
                    ],
                    tooltip: { enable: true }, title: 'LegendClick-Axis hide',
                });
            });
            afterAll(function () {
                legendChart.destroy();
                rangeElement.remove();
            });
            it('checking with lightweight', function (done) {
                legendChart.loaded = function (args) {
                    testElement = document.getElementById('rangeContainer');
                    expect(testElement.classList.contains('e-control')).toBe(true);
                    expect(testElement.classList.contains('e-chart')).toBe(true);
                    done();
                };
                legendChart.appendTo('#rangeContainer');
            });
            it('checking after legend click hide for series with primary axis', function (done) {
                legendChart.loaded = function (args) {
                    testElement = document.getElementById('rangeContainer_chart_legend_text_0');
                    legendChart.loaded = null;
                    trigger.clickEvent(testElement);
                    testElement = document.getElementById('rangeContainerAxisInsideCollection').childNodes[2];
                    expect(testElement.childElementCount).not.toBe(0);
                    done();
                };
                legendChart.enableAnimation = false;
                legendChart.refresh();
            });
            it('checking chart click unhide for series with primary axis', function () {
                testElement = document.getElementById('rangeContainer_chart_legend_text_0');
                trigger.clickEvent(testElement);
                testElement = document.getElementById('rangeContainerAxisInsideCollection');
                expect(testElement.childElementCount).toBe(5);
            });
            it('checking chart click hide for series with secondary axis', function () {
                testElement = document.getElementById('rangeContainer_chart_legend_text_1');
                trigger.clickEvent(testElement);
                testElement = document.getElementById('rangeContainerAxisInsideCollection').childNodes[2];
                expect(testElement.childElementCount).toBe(0);
            });
            it('checking chart click unhide for series with secondary axis', function () {
                testElement = document.getElementById('rangeContainer_chart_legend_text_1');
                trigger.clickEvent(testElement);
                testElement = document.getElementById('rangeContainerAxisInsideCollection');
                expect(testElement.childElementCount).toBe(5);
            });
            it('checking with multiple series sharing the same axis', function (done) {
                legendChart.loaded = function (args) {
                    testElement = document.getElementById('rangeContainer_chart_legend_text_1');
                    trigger.clickEvent(testElement);
                    testElement = document.getElementById('rangeContainerAxisInsideCollection');
                    expect(testElement.childElementCount).toBe(5);
                    done();
                };
                legendChart.series = [
                    {
                        xName: 'x', width: 2, yName: 'y', name: 'Product A',
                        dataSource: [{ x: 2000, y: 1 }, { x: 2001, y: 2.0 }, { x: 2002, y: 3.0 }, { x: 2003, y: 4.4 }],
                    },
                    {
                        xName: 'x', width: 2, yName: 'y', name: 'Product B', xAxisName: 'secondXAxis', yAxisName: 'secondYAxis',
                        dataSource: [{ x: 2000, y: 1 }, { x: 2001, y: 2.0 }, { x: 2002, y: 3.0 }, { x: 2003, y: 4.4 }],
                    },
                    {
                        xName: 'x', width: 2, yName: 'y', name: 'Product C', xAxisName: 'secondXAxis', yAxisName: 'secondYAxis',
                        dataSource: [{ x: 2000, y: 2 }, { x: 2001, y: -2.3 }, { x: 2002, y: 0 }, { x: 2003, y: 3.4 }],
                    }
                ];
                legendChart.refresh();
            });
        });
    });
});
