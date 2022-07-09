define(["require", "exports", "@syncfusion/ej2-base", "../../../src/chart/chart", "../../../src/chart/series/step-area-series", "../../../src/chart/legend/legend", "../../../src/chart/axis/category-axis", "../../../src/chart/axis/date-time-axis", "../../../src/chart/axis/logarithmic-axis", "../../../src/chart/series/data-label", "../base/data.spec", "../base/data.spec", "../base/events.spec", "../../../src/chart/user-interaction/data-editing", "../../../src/chart/user-interaction/tooltip", "../../../src/chart/user-interaction/crosshair", "../../common.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, chart_1, step_area_series_1, legend_1, category_axis_1, date_time_axis_1, logarithmic_axis_1, data_label_1, data_spec_1, data_spec_2, events_spec_1, data_editing_1, tooltip_1, crosshair_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(step_area_series_1.StepAreaSeries, category_axis_1.Category, data_editing_1.DataEditing, legend_1.Legend, date_time_axis_1.DateTime, tooltip_1.Tooltip, logarithmic_axis_1.Logarithmic, data_label_1.DataLabel, legend_1.Legend, crosshair_1.Crosshair);
    var data = data_spec_2.tooltipData1;
    var data2 = data_spec_2.tooltipData2;
    var negativPoint = data_spec_2.negativeDataPoint;
    var datetime = data_spec_2.datetimeData;
    var trigger = new events_spec_1.MouseEvents();
    describe('Chart Control', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        var elem;
        describe('Chart Steparea series', function () {
            var chartObj;
            var svg;
            var marker;
            var targetElement;
            var datalabel;
            var loaded;
            beforeAll(function () {
                elem = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal' },
                    series: [{
                            dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StepArea',
                            name: 'ChartSeriesNameGold', fill: 'skyblue', marker: { visible: true, dataLabel: { visible: false } }
                        },
                    ], width: '800',
                    title: 'Chart TS Title', legendSettings: { visible: false, },
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                elem.remove();
                chartObj.destroy();
            });
            it('Checking with fill', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series_0');
                    expect(svg.getAttribute('fill') === 'skyblue').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Showing default data label', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_2_Text_0');
                    expect(document.getElementById('containerShapeGroup0').childNodes.length == 0).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.visible = true;
                chartObj.refresh();
            });
            it('Checking dataLabel positions Bottom', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_2_Text_0');
                    expect(document.getElementById('containerShapeGroup0').childNodes.length == 0).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Bottom';
                chartObj.refresh();
            });
            it('Checking dataLabel positions Middle', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_2_Text_0');
                    expect(document.getElementById('containerShapeGroup0').childNodes.length == 0).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Middle';
                chartObj.refresh();
            });
            it('Checking dataLabel positions Top', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_2_Text_0');
                    expect(document.getElementById('containerShapeGroup0').childNodes.length == 0).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Top';
                chartObj.refresh();
            });
            it('Checking dataLabel positions Auto', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_2_Text_0');
                    expect(document.getElementById('containerShapeGroup0').childNodes.length == 0).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Auto';
                chartObj.refresh();
            });
            it('Checking dataLabel positions Outer', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_2_Text_0');
                    expect(document.getElementById('containerShapeGroup0').childNodes.length == 0).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Outer';
                chartObj.refresh();
            });
            it('Checking dataLabel Alignment Far', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_2_Text_0');
                    expect(document.getElementById('containerShapeGroup0').childNodes.length == 0).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.alignment = 'Far';
                chartObj.refresh();
            });
            it('Checking dataLabel positions Near', function (done) {
                loaded = function (args) {
                    var element = document.getElementById('container_Series_0_Point_2_Text_0');
                    expect(document.getElementById('containerShapeGroup0').childNodes.length == 0).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.alignment = 'Near';
                chartObj.refresh();
            });
            it('with marker size without marker visibility', function (done) {
                loaded = function (args) {
                    var marker = document.getElementById('container_Series_0_Point_3_Symbol');
                    expect(marker == null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.visible = false;
                chartObj.series[0].marker.width = 10;
                chartObj.series[0].marker.height = 10;
                chartObj.series[0].marker.dataLabel.visible = true;
                chartObj.refresh();
            });
            it('Checking with empty data Points', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_3_Symbol');
                    expect(svg == null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource[3].y = null;
                chartObj.series[0].marker.visible = true;
                chartObj.refresh();
            });
            it('Checking with negative points', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container1_AxisLabel_4');
                    var series = args.chart.series[0];
                    expect(parseFloat(svg.getAttribute('y')) < series.points[1].symbolLocations[0].y).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = data_spec_2.negativeDataPoint;
                chartObj.series[0].marker.visible = true;
                chartObj.tooltip.enable = true;
                chartObj.refresh();
            });
            it('Checking with negative points tooltip', function (done) {
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_1_Symbol');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = series.points[1].regions[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    var x = series.points[1].regions[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = data_spec_2.negativeDataPoint;
                chartObj.tooltip.enable = true;
                chartObj.refresh();
            });
            it('Checking with single Points', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(svg != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = null;
                chartObj.series[0].dataSource = [{ x: 1, y: 10 }];
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Legend Shape type', function (done) {
                loaded = function (args) {
                    var legendShape = document.getElementById('container_chart_legend_shape_0');
                    expect(legendShape.tagName).toEqual('path');
                    expect(legendShape.getAttribute('d') !== null).toBe(true);
                    done();
                };
                chartObj.animationComplete = null;
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'StepArea';
                chartObj.legendSettings = { visible: true };
                chartObj.refresh();
            });
            it('checking with marker shape diamond', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(marker.getAttribute('fill') === 'black').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Diamond';
                chartObj.series[0].marker.fill = 'black';
                chartObj.refresh();
            });
            it('Checking with marker shape Circle', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(marker.getAttribute('fill') === 'black').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Circle';
                chartObj.series[0].marker.fill = 'black';
                chartObj.series[0].dataSource = data;
                chartObj.refresh();
            });
            it('checking with marker shape HorizontalLine', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(marker.getAttribute('fill') === 'black').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'HorizontalLine';
                chartObj.refresh();
            });
            it('checking with marker shape InvertedTriangle', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(marker.getAttribute('fill') === 'black').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'InvertedTriangle';
                chartObj.refresh();
            });
            it('checking with marker shape Pentagon', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(marker.getAttribute('fill') === 'black').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Pentagon';
                chartObj.refresh();
            });
            it('checking with marker shape Triangle', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(marker.getAttribute('fill') === 'black').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Triangle';
                chartObj.refresh();
            });
            it('checking with marker shape rectangle', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(marker.getAttribute('fill') === 'black').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Rectangle';
                chartObj.refresh();
            });
            it('Checking with marker visible false', function (done) {
                loaded = function (args) {
                    datalabel = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(datalabel === null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.visible = false;
                chartObj.refresh();
            });
            it('Checking with multiple series', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0');
                    expect(svg.getAttribute('fill') === 'red').toBe(true);
                    svg = document.getElementById('container_Series_1');
                    expect(svg.getAttribute('fill') === 'rgba(135,206,235,1)').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series = [{ dataSource: data, xName: 'x', yName: 'y', name: 'Gold', fill: 'red', type: 'StepArea', animation: { enable: false } },
                    { dataSource: data2, xName: 'x', name: 'silver', yName: 'y', fill: 'rgba(135,206,235,1)', type: 'StepArea', animation: { enable: false } },
                    { dataSource: data, xName: 'x', name: 'diamond', yName: 'y', fill: 'blue', type: 'StepArea', animation: { enable: false } }];
                chartObj.series[0].marker.visible = true;
                chartObj.series[1].marker.visible = true;
                chartObj.series[2].marker.visible = true;
                chartObj.series[0].animation.enable = false;
                chartObj.series[1].animation.enable = false;
                chartObj.series[2].animation.enable = false;
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with category axis', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(marker != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.series[0].dataSource = data_spec_2.categoryData;
                chartObj.series[0].marker.visible = true;
                chartObj.refresh();
            });
            it('Checking with category axis BetweenTicks', function (done) {
                loaded = function (args) {
                    var axisLabel = document.getElementById('container0_AxisLabel_0');
                    expect(axisLabel.textContent == 'USA').toBe(true);
                    var axisStart = document.getElementById('containerAxisLine_0');
                    expect(parseInt(axisLabel.getAttribute('x')) > parseInt(axisStart.getAttribute('d').split(' ')[1])).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.primaryXAxis.labelPlacement = 'BetweenTicks';
                chartObj.series[0].dataSource = data_spec_2.categoryData;
                chartObj.refresh();
            });
            it('Checking with category axis OnTicks', function (done) {
                loaded = function (args) {
                    var axisLabel = document.getElementById('container0_AxisLabel_0');
                    expect(axisLabel.textContent == 'USA').toBe(true);
                    var axisStart = document.getElementById('containerAxisLine_0');
                    expect(parseInt(axisLabel.getAttribute('x')) < parseInt(axisStart.getAttribute('d').split(' ')[1])).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.primaryXAxis.labelPlacement = 'OnTicks';
                chartObj.series[0].dataSource = data_spec_2.categoryData;
                chartObj.refresh();
            });
            it('checking with dateTime', function (done) {
                loaded = function (args) {
                    var axislabel = document.getElementById('container0_AxisLabel_3');
                    expect(axislabel.textContent === '2003').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = datetime;
                chartObj.series[1].dataSource = datetime;
                chartObj.series[2].dataSource = datetime;
                chartObj.primaryXAxis.valueType = 'DateTime';
                chartObj.refresh();
            });
            it('checking with tooltip', function (done) {
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_1_Symbol');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = series.points[1].regions[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    var x = series.points[1].regions[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.tooltip.enable = true;
                chartObj.refresh();
            });
            it('checking with trackball', function (done) {
                loaded = function (args) {
                    var target = document.getElementById('container_Series_0_Point_1_Symbol');
                    var series = chartObj.series[0];
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var y = series.points[1].regions[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    var x = series.points[1].regions[0].x + parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    var tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.tooltip.shared = true;
                chartObj.refresh();
            });
            it('checking with cross hair', function (done) {
                loaded = function (args) {
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    var series = chartObj.series[0];
                    var y = series.points[2].regions[0].y + parseFloat(chartArea.getAttribute('y')) + elem.offsetTop;
                    var x = series.points[2].regions[0].x + series.points[2].regions[0].width / 2 +
                        parseFloat(chartArea.getAttribute('x')) + elem.offsetLeft;
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
                    expect(element1.getAttribute('d') != '').toBe(true);
                    element1 = crosshair.childNodes[2].childNodes[2];
                    expect(element1.getAttribute('d') != '').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.crosshair.enable = true;
                chartObj.series[0].animation.enable = false;
                chartObj.primaryXAxis.crosshairTooltip.enable = true;
                chartObj.primaryYAxis.crosshairTooltip.enable = true;
                chartObj.refresh();
            });
            it('checking with log axis with dataTime axis', function (done) {
                loaded = function (args) {
                    var axisLabelLast = document.getElementById('container1_AxisLabel_3');
                    expect(axisLabelLast.textContent == '10000').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'DateTime';
                chartObj.primaryYAxis.valueType = 'Logarithmic';
                chartObj.series = [
                    {
                        type: 'StepArea', name: 'ProductX', xName: 'x', yName: 'y',
                        dataSource: [
                            { x: new Date(1995, 0, 1), y: 80 }, { x: new Date(1996, 0, 1), y: 200 },
                            { x: new Date(1997, 0, 1), y: 400 }, { x: new Date(1998, 0, 1), y: 600 },
                            { x: new Date(1999, 0, 1), y: 700 }, { x: new Date(2000, 0, 1), y: 1400 },
                            { x: new Date(2001, 0, 1), y: 2000 }, { x: new Date(2002, 0, 1), y: 4000 },
                            { x: new Date(2003, 0, 1), y: 6000 }, { x: new Date(2004, 0, 1), y: 8000 },
                            { x: new Date(2005, 0, 1), y: 10000 }
                        ]
                    }
                ];
                chartObj.series[0].animation.enable = false;
                chartObj.refresh();
            });
            it('Checking animation', function (done) {
                var animate = function (args) {
                    var point = document.getElementById('container_ChartSeriesClipRect_' + args.series.index).childNodes[0];
                    expect(point.getAttribute('width') === document.getElementById('container_ChartAreaBorder').getAttribute('width')).toBe(true);
                    done();
                };
                chartObj.series[0].animation.enable = true;
                chartObj.animationComplete = animate;
                chartObj.refresh();
            });
        });
        describe('Step Area Series Inversed axis', function () {
            var chart;
            var loaded;
            var element;
            var dataLabelY;
            var pointY;
            element = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(element);
                chart = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis' },
                    primaryYAxis: { title: 'PrimaryYAxis', isInversed: true },
                    series: [{
                            animation: { enable: false },
                            name: 'Series1', dataSource: data, xName: 'x', yName: 'y', size: 'size',
                            type: 'StepArea', marker: { visible: false, dataLabel: { visible: true, fill: 'violet' } }
                        }],
                    width: '800',
                    title: 'Chart TS Title', loaded: loaded,
                    legendSettings: { visible: false }
                });
                chart.appendTo('#container');
            });
            afterAll(function () {
                chart.destroy();
                element.remove();
            });
            it('With Label position Top', function (done) {
                loaded = function (args) {
                    dataLabelY = +document.getElementById('container_Series_0_Point_2_TextShape_0').getAttribute('y');
                    pointY = chart.series[0].points[2].symbolLocations[0].y;
                    expect(dataLabelY > pointY).toBe(true);
                    dataLabelY = +document.getElementById('container_Series_0_Point_6_TextShape_0').getAttribute('y');
                    pointY = chart.series[0].points[6].symbolLocations[0].y;
                    expect(dataLabelY > pointY).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].marker.dataLabel.position = 'Top';
                chart.series[0].marker.dataLabel.alignment = 'Center';
                chart.refresh();
            });
            it('With Label position Bottom', function (done) {
                loaded = function (args) {
                    dataLabelY = +document.getElementById('container_Series_0_Point_2_TextShape_0').getAttribute('y');
                    pointY = chart.series[0].points[2].symbolLocations[0].y;
                    expect(dataLabelY < pointY).toBe(true);
                    dataLabelY = +document.getElementById('container_Series_0_Point_6_TextShape_0').getAttribute('y');
                    pointY = chart.series[0].points[6].symbolLocations[0].y;
                    expect(dataLabelY < pointY).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].marker.dataLabel.position = 'Bottom';
                chart.refresh();
            });
            it('With Label position Middle', function (done) {
                loaded = function (args) {
                    var labelY = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('y');
                    var labelHeight = +document.getElementById('container_Series_0_Point_1_TextShape_0').getAttribute('height');
                    var point = chart.series[0].points[1];
                    expect(labelY + labelHeight / 2).toEqual(point.regions[0].y + point.regions[0].height / 2);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].marker.dataLabel.position = 'Middle';
                chart.refresh();
            });
        });
        describe('checking rotated step area chart', function () {
            var chart;
            var loaded;
            var element = ej2_base_1.createElement('div', { id: 'container' });
            var dataLabel;
            var point;
            var trigger = new events_spec_1.MouseEvents();
            var x;
            var y;
            var tooltip;
            var chartArea;
            var series;
            beforeAll(function () {
                document.body.appendChild(element);
                chart = new chart_1.Chart({
                    primaryXAxis: { title: 'primaryXAxis', valueType: 'DateTime' },
                    primaryYAxis: { title: 'PrimaryYAxis' },
                    series: [
                        { type: 'StepLine', name: 'series1', dataSource: data_spec_2.rotateData1, xName: 'x', yName: 'y', animation: { enable: false },
                            marker: { visible: true } },
                        { type: 'StepLine', name: 'series2', dataSource: data_spec_2.rotateData2, xName: 'x', yName: 'y', animation: { enable: false },
                            marker: { visible: true } }
                    ],
                    title: 'rotated stepline Chart'
                });
                chart.appendTo('#container');
            });
            afterAll(function () {
                chart.destroy();
                element.remove();
            });
            it('checking without rotated', function (done) {
                loaded = function (args) {
                    var axis = chart.primaryXAxis;
                    expect(axis.orientation).toEqual('Horizontal');
                    axis = chart.primaryYAxis;
                    expect(axis.orientation).toEqual('Vertical');
                    done();
                };
                chart.loaded = loaded;
                chart.refresh();
            });
            it('checking with rotated', function (done) {
                loaded = function (args) {
                    var axis = chart.primaryYAxis;
                    expect(axis.orientation).toEqual('Horizontal');
                    axis = chart.primaryXAxis;
                    expect(axis.orientation).toEqual('Vertical');
                    done();
                };
                chart.loaded = loaded;
                chart.isTransposed = true;
                chart.refresh();
            });
            it('checking with datalabel Auto position', function (done) {
                loaded = function (args) {
                    dataLabel = document.getElementById('container_Series_0_Point_2_Text_0');
                    point = chart.series[0].points[2];
                    expect(+(dataLabel.getAttribute('y')) < point.symbolLocations[0].y).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].marker.dataLabel.visible = true;
                chart.refresh();
            });
            it('checking with datalabel Top position', function (done) {
                loaded = function (args) {
                    dataLabel = document.getElementById('container_Series_0_Point_2_Text_0');
                    point = chart.series[0].points[2];
                    expect(+(dataLabel.getAttribute('y')) < point.symbolLocations[0].y).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].marker.dataLabel.position = 'Top';
                chart.refresh();
            });
            it('checking with datalabel Middle position', function (done) {
                loaded = function (args) {
                    dataLabel = document.getElementById('container_Series_0_Point_2_Text_0');
                    point = chart.series[0].points[2];
                    expect(+(dataLabel.getAttribute('y')) > (point.symbolLocations[0].y - point.regions[0].height / 2)).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].marker.dataLabel.position = 'Middle';
                chart.refresh();
            });
            it('checking with datalabel bottom position', function (done) {
                loaded = function (args) {
                    dataLabel = document.getElementById('container_Series_0_Point_2_Text_0');
                    point = chart.series[0].points[2];
                    expect(+(dataLabel.getAttribute('y')) > point.symbolLocations[0].y).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].marker.dataLabel.position = 'Bottom';
                chart.refresh();
            });
            it('checking with tooltip positive values', function (done) {
                loaded = function (args) {
                    dataLabel = document.getElementById('container_Series_0_Point_2_Symbol');
                    series = chart.series[0];
                    chartArea = document.getElementById('container_ChartAreaBorder');
                    y = series.points[2].regions[0].y + parseFloat(chartArea.getAttribute('y')) + element.offsetTop;
                    x = series.points[2].regions[0].x + parseFloat(chartArea.getAttribute('x')) + element.offsetLeft;
                    trigger.mousemovetEvent(dataLabel, Math.ceil(x), Math.ceil(y));
                    tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    expect(parseFloat(tooltip.style.left) > series.points[2].regions[0].y + parseFloat(chartArea.getAttribute('y')));
                    done();
                };
                chart.loaded = loaded;
                chart.tooltip.enable = true;
                chart.refresh();
            });
            it('checking with track ball', function (done) {
                loaded = function (args) {
                    dataLabel = document.getElementById('container_Series_0_Point_1_Symbol');
                    y = series.points[1].regions[0].y + parseFloat(chartArea.getAttribute('y')) + element.offsetTop;
                    x = series.points[1].regions[0].x + parseFloat(chartArea.getAttribute('x')) + element.offsetLeft;
                    trigger.mousemovetEvent(dataLabel, Math.ceil(x), Math.ceil(y));
                    tooltip = document.getElementById('container_tooltip');
                    expect(tooltip != null).toBe(true);
                    expect(parseFloat(tooltip.style.top) > series.points[1].regions[0].y + parseFloat(chartArea.getAttribute('y')));
                    done();
                };
                chart.loaded = loaded;
                chart.tooltip.shared = true;
                chart.refresh();
            });
            it('checking with animation', function (done) {
                loaded = function (args) {
                    done();
                };
                chart.loaded = loaded;
                chart.series[0].animation.enable = true;
                chart.series[1].animation.enable = true;
                chart.refresh();
            });
        });
        describe('Step area series with drag and drop support', function () {
            var chartObj;
            var x;
            var y;
            var loaded;
            var trigger = new events_spec_1.MouseEvents();
            var element1 = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(element1);
                chartObj = new chart_1.Chart({
                    primaryXAxis: {
                        valueType: 'DateTime',
                        labelFormat: 'y',
                        intervalType: 'Years',
                        edgeLabelPlacement: 'Shift',
                        majorGridLines: { width: 0 }
                    },
                    primaryYAxis: {
                        labelFormat: '{value}%',
                        rangePadding: 'None',
                        minimum: 0,
                        maximum: 100,
                        interval: 20,
                        lineStyle: { width: 0 },
                        majorTickLines: { width: 0 },
                        minorTickLines: { width: 0 }
                    },
                    chartArea: {
                        border: {
                            width: 0
                        }
                    },
                    series: [
                        {
                            type: 'StepArea',
                            dataSource: [
                                { x: new Date(2005, 0, 1), y: 21 }, { x: new Date(2006, 0, 1), y: 24 },
                                { x: new Date(2007, 0, 1), y: 36 }, { x: new Date(2008, 0, 1), y: 38 },
                                { x: new Date(2009, 0, 1), y: 54 }, { x: new Date(2010, 0, 1), y: 57 },
                                { x: new Date(2011, 0, 1), y: 70 }
                            ],
                            animation: { enable: false },
                            xName: 'x', width: 2, marker: {
                                visible: true,
                                width: 20,
                                height: 20
                            },
                            yName: 'y', name: 'Germany', dragSettings: { enable: true }
                        }
                    ],
                    title: 'Inflation - Consumer Price',
                    tooltip: {
                        enable: true
                    },
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                element1.remove();
            });
            it('Step area series drag and drop with marker true', function (done) {
                loaded = function () {
                    var target = document.getElementById('container_Series_0_Point_3_Symbol');
                    var chartArea = document.getElementById('container_ChartAreaBorder');
                    y = parseFloat(target.getAttribute('cy')) + parseFloat(chartArea.getAttribute('y')) + element1.offsetTop;
                    x = parseFloat(target.getAttribute('cx')) + parseFloat(chartArea.getAttribute('x')) + element1.offsetLeft;
                    trigger.mousemovetEvent(target, Math.ceil(x), Math.ceil(y));
                    trigger.draganddropEvent(element1, Math.ceil(x), Math.ceil(y), Math.ceil(x), Math.ceil(y) - 208);
                    var yValue = chartObj.visibleSeries[0].points[3].yValue;
                    expect(yValue == 100 || yValue == 99.12).toBe(true);
                    chartObj.loaded = null;
                    done();
                };
                chartObj.loaded = loaded;
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
