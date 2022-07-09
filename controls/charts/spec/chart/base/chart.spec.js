define(["require", "exports", "@syncfusion/ej2-base", "../../../src/chart/chart", "../../../src/chart/user-interaction/zooming", "../../../src/chart/series/line-series", "../../../src/chart/series/column-series", "../../../src/chart/series/data-label", "../base/data.spec", "../../chart/base/events.spec", "../../common.spec", "../../../src/index", "./data.spec", "@syncfusion/ej2-data"], function (require, exports, ej2_base_1, chart_1, zooming_1, line_series_1, column_series_1, data_label_1, data_spec_1, events_spec_1, common_spec_1, index_1, data_spec_2, ej2_data_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(line_series_1.LineSeries, zooming_1.Zoom, column_series_1.ColumnSeries, data_label_1.DataLabel, index_1.Legend, index_1.Category);
    describe('Chart Control', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('Chart direct properties and its behavior', function () {
            var chart;
            var ele;
            var svg;
            var text;
            var trigger = new events_spec_1.MouseEvents();
            var loaded;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(ele);
                chart = new chart_1.Chart();
            });
            afterAll(function () {
                chart.destroy();
                ele.remove();
            });
            it('Checking chart instance creation', function (done) {
                loaded = function (args) {
                    expect(chart != null).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.appendTo('#container');
            });
            it('Checking with empty options', function () {
                var className = document.getElementById('container').className;
                expect(className).toEqual('e-control e-chart e-lib e-chart-focused e-touch');
            });
            it('Checking module name', function () {
                expect(chart.getModuleName()).toBe('chart');
            });
            it('Checking with empty size property', function () {
                svg = document.getElementById('container_svg');
                expect(svg.getAttribute('width') != null).toBe(true);
            });
            it('Checking the null height of the chart', function () {
                svg = document.getElementById('container_svg');
                expect(svg.getAttribute('height')).toEqual('450');
            });
            it('Checking the null width of the chart', function (done) {
                chart.width = null;
                ele.setAttribute('style', 'width:0px');
                chart.loaded = function (args) {
                    svg = document.getElementById('container_svg');
                    expect(svg.getAttribute('width')).toEqual('600');
                    done();
                };
                chart.getPersistData();
                chart.refresh();
            });
            it('Checking the percentage size of the chart', function (done) {
                chart.width = '50%';
                ele.setAttribute('style', 'width:900px');
                chart.loaded = function (args) {
                    svg = document.getElementById('container_svg');
                    expect(svg.getAttribute('width')).toEqual('450');
                    done();
                };
                chart.refresh();
            });
            it('Checking the width of the chart', function () {
                chart.width = '500';
                chart.loaded = null;
                chart.dataBind();
                svg = document.getElementById('container_svg');
                expect(svg.getAttribute('width')).toEqual('500');
            });
            it('Checking the height of the chart', function () {
                chart.height = '500';
                chart.dataBind();
                svg = document.getElementById('container_svg');
                expect(svg.getAttribute('height')).toEqual('500');
            });
            it('Checking both height and width of the chart', function () {
                chart.width = '500';
                chart.height = '300';
                chart.dataBind();
                svg = document.getElementById('container_svg');
                expect(svg.getAttribute('width')).toEqual('500');
                expect(svg.getAttribute('height')).toEqual('300');
            });
            it('Checking with empty title', function () {
                text = document.getElementById('container_ChartTitle');
                expect(text == null).toBe(true);
            });
            it('Checking with  title', function () {
                chart.title = 'Syncfusion Chart Title';
                chart.dataBind();
                text = document.getElementById('container_ChartTitle');
                expect(text.textContent == 'Syncfusion Chart Title').toBe(true);
                expect(text.getAttribute('y') == '25' || text.getAttribute('y') == '22.75').toBe(true);
            });
            it('Checking textoverflow title none', function () {
                chart.width = '100px';
                chart.title = 'Efficiency of oil-fired power production';
                chart.titleStyle.textOverflow = 'None';
                chart.dataBind();
                text = document.getElementById('container_ChartTitle');
                expect(text.getAttribute('text-anchor')).toBe('middle');
                expect(text.getAttribute('y') == '25' || text.getAttribute('y') == '22.75').toBe(true);
            });
            it('Checking textoverflow title wrap', function () {
                chart.titleStyle.textOverflow = 'Wrap';
                chart.dataBind();
                text = document.getElementById('container_ChartTitle');
                expect(text.getAttribute('y') == '25' || text.getAttribute('y') == '22.75').toBe(true);
            });
            it('Checking textoverflow title wrapwithtrim', function () {
                chart.title = 'Efficiency of oil-fired power productionchart';
                chart.dataBind();
                text = document.getElementById('container_ChartTitle');
                expect(text.textContent.indexOf('...') != -1).toBe(true);
                expect(text.getAttribute('y') == '25' || text.getAttribute('y') == '22.75').toBe(true);
            });
            it('Checking textoverflow title trim', function () {
                chart.titleStyle.textOverflow = 'Trim';
                chart.dataBind();
                text = document.getElementById('container_ChartTitle');
                expect(text.textContent.indexOf('...') != -1).toBe(true);
                expect(text.getAttribute('text-anchor')).toBe('middle');
                expect(text.getAttribute('y') == '25' || text.getAttribute('y') == '22.75').toBe(true);
            });
            it('Checking title trim', function () {
                chart.title = 'candidate joined in a year syncfusion Chart Title';
                chart.width = '100';
                chart.dataBind();
                text = document.getElementById('container_ChartTitle');
                expect(text.textContent.indexOf('...') != -1).toBe(true);
            });
            it('Trimmed text and mouse over and out', function (done) {
                loaded = function (args) {
                    chart.loaded = null;
                    text = document.getElementById('container_ChartTitle');
                    trigger.mousemoveEvent(text, 0, 0, 77, 25);
                    var tooltip = document.getElementById('container_EJ2_Title_Tooltip');
                    expect(tooltip.textContent).toBe('candidate joined in a year syncfusion Chart Title');
                    expect(text.textContent.split('...').length).toEqual(2);
                    tooltip.remove();
                    chart.mouseEnd(trigger.onTouchEnd(text, 0, 0, null, null, 77, 25));
                    tooltip = document.getElementById('container_EJ2_Title_Tooltip');
                    expect(tooltip.textContent).toBe('candidate joined in a year syncfusion Chart Title');
                    expect(text.textContent.split('...').length).toEqual(2);
                    tooltip.remove();
                    done();
                };
                chart.width = '80';
                chart.title = 'candidate joined in a year syncfusion Chart Title';
                chart.loaded = loaded;
                chart.refresh();
            });
            it('Trimmed text and mouse over and out for subtitle', function (done) {
                loaded = function (args) {
                    chart.loaded = null;
                    text = document.getElementById('container_ChartSubTitle');
                    trigger.mousemoveEvent(text, 0, 0, 77, 25);
                    var tooltip = document.getElementById('container_EJ2_Title_Tooltip');
                    expect(tooltip.textContent).toBe('syncfusion Chart SubTitle');
                    tooltip.remove();
                    done();
                };
                chart.width = '80';
                chart.subTitle = 'syncfusion Chart SubTitle';
                chart.isTouch = false;
                chart.loaded = loaded;
                chart.refresh();
            });
            it('Checking the title font size', function () {
                chart.title = 'Chart Title';
                chart.titleStyle.size = '24px';
                chart.dataBind();
                text = document.getElementById('container_ChartTitle');
                expect(text.getAttribute('font-size')).toEqual('24px');
            });
            it('Checking with  subtitle', function () {
                chart.width = '500px';
                chart.subTitle = 'Chart SubTitle';
                chart.dataBind();
                text = document.getElementById('container_ChartSubTitle');
                expect(text.textContent == 'Chart SubTitle').toBe(true);
                expect(text.getAttribute('y') == '55.25' || text.getAttribute('y') == '49.25').toBe(true);
            });
            it('Checking textoverflow subtitle none', function () {
                chart.subTitle = 'SubTitle';
                chart.titleStyle.textOverflow = 'None';
                chart.dataBind();
                text = document.getElementById('container_ChartSubTitle');
                expect(text.textContent == 'SubTitle').toBe(true);
                expect(text.getAttribute('y') == '55.25' || text.getAttribute('y') == '49.25').toBe(true);
            });
            it('Checking textoverflow subtitle trim', function () {
                chart.width = '100px';
                chart.subTitle = 'Syncfusion Chart SubTitle';
                chart.subTitleStyle.textOverflow = 'Trim';
                chart.dataBind();
                text = document.getElementById('container_ChartSubTitle');
                expect(text.textContent.indexOf('...') != -1).toBe(true);
                expect(text.getAttribute('y') == '55.25' || text.getAttribute('y') == '49.25').toBe(true);
            });
            it('Checking textoverflow subtitle wrap', function () {
                chart.subTitleStyle.textOverflow = 'Wrap';
                chart.dataBind();
                text = document.getElementById('container_ChartSubTitle');
                expect(text.childNodes.length == 2).toBe(true);
                expect(text.getAttribute('y') == '55.25' || text.getAttribute('y') == '49.25').toBe(true);
            });
            it('Checking textAlignment subtitle center and subtitle is in Title width', function () {
                chart.width = '500px';
                chart.title = 'Syncfusion Chart SubTitle';
                chart.subTitle = 'Checking Syncfusion Chart SubTitle width should be in Chart Title width';
                chart.subTitleStyle.textOverflow = 'Trim';
                chart.titleStyle.textOverflow = 'Wrap';
                chart.dataBind();
                text = document.getElementById('container_ChartSubTitle');
                expect(text.textContent.indexOf('...') != -1).toBe(true);
                expect(text.getAttribute('text-anchor')).toBe('middle');
            });
            it('Checking textAlignment subtitle Far', function () {
                chart.subTitleStyle.textAlignment = 'Far';
                chart.dataBind();
                text = document.getElementById('container_ChartSubTitle');
                expect(text.getAttribute('text-anchor')).toBe('end');
            });
            it('Checking textAlignment subtitle Near', function () {
                chart.subTitleStyle.textAlignment = 'Near';
                chart.dataBind();
                text = document.getElementById('container_ChartSubTitle');
                expect(text.getAttribute('text-anchor')).toBe('start');
            });
            it('Checking the subtitle font size', function () {
                chart.subTitleStyle.size = '20px';
                chart.dataBind();
                text = document.getElementById('container_ChartSubTitle');
                expect(text.getAttribute('font-size')).toEqual('20px');
            });
            it('Checking with empty subtitle', function () {
                chart.subTitle = '';
                chart.dataBind();
                text = document.getElementById('container_ChartSubTitle');
                expect(text == null).toBe(true);
            });
            it('Checking the border color', function () {
                chart.border.width = 2;
                chart.border.color = 'green';
                chart.dataBind();
                svg = document.getElementById('container_ChartBorder');
                expect(svg.getAttribute('stroke') == 'green').toBe(true);
                expect(svg.getAttribute('stroke-width') == '2').toBe(true);
            });
            it('Checking the Chart Area border color', function () {
                chart.chartArea.border.color = 'red';
                chart.chartArea.background = 'green';
                chart.chartArea.opacity = 0.5;
                chart.dataBind();
                svg = document.getElementById('container_ChartAreaBorder');
                expect(svg.getAttribute('stroke') == 'red').toBe(true);
                expect(svg.getAttribute('fill') == 'green').toBe(true);
                expect(svg.getAttribute('opacity') == '0.5').toBe(true);
            });
            it('Checking the Chart background', function () {
                chart.background = 'yellow';
                chart.dataBind();
                svg = document.getElementById('container_ChartBorder');
                expect(svg.getAttribute('fill') == 'yellow').toBe(true);
            });
            it('Checking context menu event', function () {
                var menu = document.createEvent('MouseEvent');
                menu.initEvent('contextmenu', true, false);
                ele.dispatchEvent(menu);
                expect(ele).not.toBe(null);
            });
            it('Checking the chart Orientation', function () {
                expect(chart.isOrientation()).toBe(false);
            });
            it('checking with title alignment default', function (done) {
                loaded = function (args) {
                    text = document.getElementById('container_ChartTitle');
                    expect(text.getAttribute('text-anchor')).toBe('middle');
                    expect(text.getAttribute('x') == text.children[0].getAttribute('x')).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.title = 'EfficiencyChart of oil power productionchart';
                chart.titleStyle.textOverflow = 'Wrap';
                chart.width = '300';
                chart.refresh();
            });
            it('checking with title alignment Far', function () {
                chart.titleStyle.textAlignment = 'Far';
                chart.loaded = null;
                chart.dataBind();
                text = document.getElementById('container_ChartTitle');
                expect(text.getAttribute('text-anchor')).toBe('end');
                expect(text.getAttribute('x') == text.children[0].getAttribute('x')).toBe(true);
            });
            it('checking with title alignment Near', function () {
                chart.titleStyle.textAlignment = 'Near';
                chart.dataBind();
                text = document.getElementById('container_ChartTitle');
                expect(text.getAttribute('text-anchor')).toBe('start');
                expect(text.getAttribute('x') == text.children[0].getAttribute('x')).toBe(true);
            });
            it('checking chart area background image', function (done) {
                setTimeout(function () {
                    var background = document.getElementById('container_ChartAreaBackground');
                    expect(background.getAttribute('href') != null).toBe(true);
                    done();
                }, 500);
                chart.chartArea.backgroundImage =
                    'https://cdn.syncfusion.com/content/images/freetrials/essential-studio.png?v=03102019101652';
                chart.refresh();
            });
            it('checking chart background image', function (done) {
                setTimeout(function () {
                    var background = document.getElementById('container_ChartBackground');
                    expect(background.getAttribute('href') != null).toBe(true);
                    done();
                }, 500);
                chart.backgroundImage = 'https://cdn.syncfusion.com/content/images/freetrials/essential-studio.png?v=03102019101652';
                chart.refresh();
            });
        });
        describe('Chart checking localization', function () {
            ej2_base_1.L10n.load({
                'de-DE': {
                    'chart': {
                        ZoomIn: 'تكبير',
                        ZoomOut: 'تصغير',
                        Zoom: 'زوم',
                        Pan: 'مقلاة',
                        Reset: 'إعادة تعيين'
                    },
                }
            });
            var chart;
            var ele;
            var svg;
            var text;
            var trigger = new events_spec_1.MouseEvents();
            var loaded;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(ele);
                chart = new chart_1.Chart();
                chart.appendTo('#container');
            });
            afterAll(function () {
                chart.destroy();
                ele.remove();
            });
            it('checking zooming tooltit with localization', function (done) {
                loaded = function (args) {
                    chart.loaded = null;
                    trigger.draganddropEvent(ele, 100, 100, 400, 400);
                    var targetElement = document.getElementById('container_Zooming_KitCollection');
                    trigger.mousemoveEvent(targetElement, 800, 10, 805, 15);
                    targetElement = document.getElementById('container_Zooming_Zoom');
                    trigger.mouseoverEvent(targetElement);
                    expect(document.getElementById('EJ2_Chart_ZoomTip').innerHTML).toEqual("&nbsp;زوم&nbsp;");
                    done();
                };
                chart.loaded = loaded;
                chart.zoomSettings = {
                    enablePinchZooming: true, enableDeferredZooming: true,
                    enableMouseWheelZooming: true, enableSelectionZooming: true
                };
                chart.locale = 'de-DE';
                chart.refresh();
            });
            it('checking zooming tooltit without localization', function () {
                ej2_base_1.remove(document.getElementById('EJ2_Chart_ZoomTip'));
                chart.locale = '';
                chart.dataBind();
                trigger.draganddropEvent(ele, 100, 100, 400, 400);
                var targetElement = document.getElementById('container_Zooming_KitCollection');
                trigger.mousemoveEvent(targetElement, 800, 10, 805, 15);
                targetElement = document.getElementById('container_Zooming_Zoom');
                trigger.mouseoverEvent(targetElement);
                expect(document.getElementById('EJ2_Chart_ZoomTip').innerHTML).toEqual("&nbsp;Zoom&nbsp;");
            });
        });
        describe('Chart checking center aligned div', function () {
            var chart;
            var ele;
            var svg;
            var text;
            var trigger = new events_spec_1.MouseEvents();
            var loaded;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: 'container' });
                ele.setAttribute('align', 'center');
                document.body.appendChild(ele);
                chart = new chart_1.Chart({
                    primaryYAxis: {
                        rangePadding: 'Round'
                    },
                    series: [
                        {
                            dataSource: data_spec_1.seriesData1, xName: 'x', yName: 'y', fill: 'orange', opacity: 0.7,
                            type: 'Column',
                            animation: { enable: false },
                            marker: {
                                dataLabel: {
                                    visible: true,
                                    position: 'Top',
                                    template: '<div style="background-color:#ed7d31;border-radius: 3px;">${point.y}Million</div>'
                                }
                            }
                        }
                    ],
                    zoomSettings: {
                        enableSelectionZooming: true,
                        enableMouseWheelZooming: true,
                    },
                    width: '400px'
                });
                chart.appendTo('#container');
            });
            afterAll(function () {
                chart.destroy();
                ele.remove();
            });
            it('checking data label template and zooming', function (done) {
                var wheelArgs = {
                    preventDefault: function () {
                    },
                    wheelDelta: 120,
                    detail: 3,
                    clientX: 210,
                    clientY: 100
                };
                loaded = function (args) {
                    chart.loaded = null;
                    var secondaryElement = document.getElementById('container_Secondary_Element');
                    expect(parseInt(secondaryElement.style.top, 10)).toBe(0);
                    expect(parseInt(secondaryElement.style.left, 10) === 179 || parseInt(secondaryElement.style.left, 10) === 184).toBe(true);
                    var datalabel = document.getElementById('container_Series_0_DataLabel_4');
                    expect(parseInt(datalabel.style.top, 10) === 227 || parseInt(datalabel.style.top, 10) === 228).toBe(true);
                    expect(parseInt(datalabel.style.left, 10)).toBe(174);
                    trigger.draganddropEvent(ele, 20, 100, 120, 300);
                    expect(chart.primaryXAxis.zoomFactor).toBe(1);
                    expect(chart.primaryYAxis.zoomFactor).toBe(1);
                    expect(chart.primaryXAxis.zoomPosition).toBe(0);
                    expect(chart.primaryYAxis.zoomPosition).toBe(0);
                    trigger.draganddropEvent(ele, 480, 100, 580, 300);
                    expect(chart.primaryXAxis.zoomFactor.toFixed(2)).toBe('0.28');
                    expect(chart.primaryYAxis.zoomFactor.toFixed(2) === '0.50' || chart.primaryYAxis.zoomFactor.toFixed(2) === '0.49').toBe(true);
                    expect(chart.primaryXAxis.zoomPosition.toFixed(2) === '0.72' || chart.primaryXAxis.zoomPosition.toFixed(2) === '0.71').toBe(true);
                    expect(chart.primaryYAxis.zoomPosition.toFixed(2)).toBe('0.30');
                    chart.zoomModule.chartMouseWheel(wheelArgs);
                    expect(chart.primaryXAxis.zoomFactor.toFixed(2)).toBe('0.28');
                    var temp = chart.primaryYAxis.zoomFactor.toFixed(2);
                    expect(temp === '0.50' || temp === '0.49').toBe(true);
                    temp = chart.primaryXAxis.zoomPosition.toFixed(2);
                    expect(temp === '0.72' || temp === '0.71').toBe(true);
                    expect(chart.primaryYAxis.zoomPosition.toFixed(2)).toBe('0.30');
                    done();
                };
                chart.loaded = loaded;
                chart.refresh();
            });
        });
        it('memory leak', function () {
            common_spec_1.profile.sample();
            var average = common_spec_1.inMB(common_spec_1.profile.averageChange);
            expect(average).toBeLessThan(10);
            var memory = common_spec_1.inMB(common_spec_1.getMemoryProfile());
            expect(memory).toBeLessThan(common_spec_1.profile.samples[0] + 0.25);
        });
        describe('Customer issue: series DataBind', function () {
            var chart;
            var ele;
            var loaded;
            var element;
            var trigger = new events_spec_1.MouseEvents();
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: 'seriesData' });
                document.body.appendChild(ele);
                chart = new chart_1.Chart({
                    primaryXAxis: { valueType: 'Category', rangePadding: 'Normal' },
                    primaryYAxis: { title: 'PrimaryYAxis' },
                    series: [{ dataSource: data_spec_2.categoryData, xName: 'x', yName: 'y', name: 'Gold', fill: 'red', animation: { enable: false }, type: 'Column' }],
                    height: '400', width: '900',
                    legendSettings: { visible: true, position: 'Right' }
                });
            });
            afterAll(function () {
                chart.destroy();
                ele.remove();
            });
            it('checking default fill property', function (done) {
                loaded = function (args) {
                    element = document.getElementById('seriesData_Series_0_Point_1');
                    expect(element.getAttribute('fill')).toEqual('red');
                    done();
                };
                chart.loaded = loaded;
                chart.appendTo(ele);
            });
            it('checking with changing fill', function (done) {
                loaded = function (args) {
                    element = document.getElementById('seriesData_Series_0_Point_1');
                    expect(element.getAttribute('fill')).toEqual('blue');
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].fill = 'blue';
                chart.dataBind();
            });
            it('checking before the legend name chage', function () {
                element = document.getElementById('seriesData_chart_legend_element');
                expect(element.getAttribute('x') === '832' || element.getAttribute('x') === '833').toBe(true);
                element = document.getElementById('seriesData_chart_legend_text_0');
                expect(element.textContent).toEqual('Gold');
            });
            it('checking with changing name', function (done) {
                loaded = function (args) {
                    element = document.getElementById('seriesData_chart_legend_element');
                    expect(element.getAttribute('x') === '743' || element.getAttribute('x') === '752').toBe(true);
                    element = document.getElementById('seriesData_chart_legend_text_0');
                    expect(element.textContent).toEqual('Olymbic gold medal');
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].name = 'Olymbic gold medal';
                chart.dataBind();
            });
            it('checking with local dataSource with query', function (done) {
                loaded = function (args) {
                    element = document.getElementById('seriesDataSeriesGroup0');
                    expect(element.childElementCount).toEqual(3);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].query = new ej2_data_1.Query().take(2);
                chart.refresh();
            });
            it('checking materialDark', function (done) {
                loaded = function (args) {
                    element = document.getElementById('seriesDataSeriesGroup0');
                    expect(element.childElementCount).toEqual(3);
                    done();
                };
                chart.loaded = loaded;
                chart.theme = 'MaterialDark';
                chart.refresh();
            });
            it('checking fabricDark', function (done) {
                loaded = function (args) {
                    element = document.getElementById('seriesDataSeriesGroup0');
                    expect(element.childElementCount).toEqual(3);
                    done();
                };
                chart.loaded = loaded;
                chart.theme = 'FabricDark';
                chart.refresh();
            });
            it('checking bootstrapDark', function (done) {
                loaded = function (args) {
                    element = document.getElementById('seriesDataSeriesGroup0');
                    expect(element.childElementCount).toEqual(3);
                    done();
                };
                chart.loaded = loaded;
                chart.theme = 'BootstrapDark';
                chart.refresh();
            });
            it('checking chart double click event', function (done) {
                loaded = function (args) {
                    element = document.getElementById(args.chart.element.id);
                    trigger.doubleClickEvent(element);
                };
                chart.chartDoubleClick = function (args) {
                    expect(args.name).toEqual('chartDoubleClick');
                    done();
                };
                chart.loaded = loaded;
                chart.refresh();
            });
        });
        describe('Fixed chart area width', function () {
            var chart;
            var ele;
            var loaded;
            var element;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: 'seriesData' });
                document.body.appendChild(ele);
                chart = new chart_1.Chart({
                    primaryXAxis: { valueType: 'Category', rangePadding: 'Normal' },
                    primaryYAxis: { title: 'PrimaryYAxis' },
                    series: [{ dataSource: data_spec_2.categoryData, xName: 'x', yName: 'y', name: 'Gold', fill: 'red', animation: { enable: false }, type: 'Column' }],
                    height: '400', width: '900',
                    chartArea: {
                        width: '600'
                    },
                    legendSettings: { visible: true }
                });
            });
            afterAll(function () {
                chart.destroy();
                ele.remove();
            });
            it('checking default with pixel width for chart area', function (done) {
                loaded = function (args) {
                    element = document.getElementById('seriesData_ChartAreaBorder');
                    expect(element.getAttribute('width') === '600').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.appendTo(ele);
            });
            it('checking with legend right position', function (done) {
                loaded = function (args) {
                    element = document.getElementById('seriesData_ChartAreaBorder');
                    expect(element.getAttribute('width') === '600').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.legendSettings.position = "Right";
                chart.primaryYAxis.opposedPosition = false;
                chart.dataBind();
            });
        });
        describe('Check the RTL behaviour for title', function () {
            var chart;
            var ele;
            var loaded;
            var element;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(ele);
                chart = new chart_1.Chart({
                    primaryXAxis: { valueType: 'Category', rangePadding: 'Normal' },
                    primaryYAxis: { title: 'PrimaryYAxis' },
                    series: [{ dataSource: data_spec_2.categoryData, xName: 'x', yName: 'y', fill: 'red', animation: { enable: false } }],
                    height: '400px', width: '900px',
                    title: 'Syncfusion Chart',
                    titleStyle: {
                        textAlignment: 'Near'
                    },
                    subTitle: 'Since 2012',
                    subTitleStyle: {
                        textAlignment: 'Far'
                    }
                });
            });
            afterAll(function () {
                chart.destroy();
                ele.remove();
            });
            it('Checking the title with out RTL', function (done) {
                loaded = function (args) {
                    element = document.getElementById('container_ChartTitle');
                    expect(element.getAttribute('text-anchor') == 'start').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.appendTo('#container');
            });
            it('Checking the SubTitle with out RTL', function (done) {
                loaded = function (args) {
                    element = document.getElementById('container_ChartSubTitle');
                    expect(element.getAttribute('text-anchor') == 'end').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.appendTo('#container');
            });
            it('Checking the title with RTL', function (done) {
                loaded = function (args) {
                    element = document.getElementById('container_ChartTitle');
                    expect(element.getAttribute('text-anchor') == 'end').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.enableRtl = true;
                chart.appendTo('#container');
            });
            it('Checking the SubTitle with RTL', function (done) {
                loaded = function (args) {
                    element = document.getElementById('container_ChartSubTitle');
                    expect(element.getAttribute('text-anchor') == 'start').toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.appendTo('#container');
            });
        });
    });
});
