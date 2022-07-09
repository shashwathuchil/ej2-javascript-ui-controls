define(["require", "exports", "@syncfusion/ej2-base", "../../../src/chart/chart", "../../../src/chart/series/line-series", "../../../src/chart/series/stacking-area-series", "../../../src/chart/series/area-series", "../../../src/chart/axis/date-time-axis", "../../../src/chart/axis/category-axis", "../../../src/chart/series/stacking-column-series", "../../../src/chart/series/data-label", "../base/events.spec", "../base/data.spec", "../../common.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, chart_1, line_series_1, stacking_area_series_1, area_series_1, date_time_axis_1, category_axis_1, stacking_column_series_1, data_label_1, events_spec_1, data_spec_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(line_series_1.LineSeries, stacking_area_series_1.StackingAreaSeries, stacking_column_series_1.StackingColumnSeries, area_series_1.AreaSeries, date_time_axis_1.DateTime, category_axis_1.Category, data_label_1.DataLabel);
    var data = data_spec_1.tooltipData21;
    var data2 = data_spec_1.tooltipData22;
    var datetime = data_spec_1.datetimeData21;
    describe('Chart Control', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('Chart StackingArea series', function () {
            var chartObj;
            var elem;
            var svg;
            var marker;
            var dataLabel;
            var loaded;
            var targetElement;
            beforeAll(function () {
                elem = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal' },
                    series: [{
                            dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingArea',
                            name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
                        },
                        {
                            dataSource: data2, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingArea',
                            name: 'ChartSeriesNameDiamond', fill: 'blue',
                        },
                    ], width: '800',
                    title: 'Chart TS Title', legendSettings: { visible: false }
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                elem.remove();
                chartObj.destroy();
            });
            it('Checking with default points', function (done) {
                loaded = function (args) {
                    var series1 = document.getElementById('container_Series_0');
                    expect(series1.getAttribute('fill') == 'rgba(135,206,235,1)').toBe(true);
                    var series2 = document.getElementById('container_Series_1');
                    expect(series2.getAttribute('fill') == 'blue').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.refresh();
            });
            it('Checking with null Points', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0');
                    expect(svg.childNodes[3] == null).toBe(true);
                    svg = document.getElementById('container_Series_1');
                    expect(svg.childNodes[5] == null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource[3].y = null;
                chartObj.series[1].dataSource[5].y = null;
                chartObj.refresh();
            });
            it('Checking with negative Points', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0');
                    expect(svg.getAttribute('fill') === 'rgba(135,206,235,1)').toBe(true);
                    svg = document.getElementById('container_Series_1');
                    expect(svg.getAttribute('fill') === 'blue').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = data_spec_1.negativeDataPoint;
                chartObj.series[1].dataSource = data_spec_1.negativeDataPoint;
                chartObj.refresh();
            });
            it('Checking with marker visible false', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(svg == null).toBe(true);
                    svg = document.getElementById('container_Series_1_Point_0_Symbol');
                    expect(svg == null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.series[0].dataSource = data;
                chartObj.series[1].dataSource = data2;
                chartObj.series[0].marker.visible = false;
                chartObj.series[1].marker.visible = false;
                chartObj.refresh();
            });
            it('Checking with marker size', function (done) {
                loaded = function (args) {
                    var series1 = args.chart.series[0];
                    var series2 = args.chart.series[1];
                    expect(series1.marker.height === 10).toBe(true);
                    expect(series1.marker.width === 10).toBe(true);
                    expect(series1.marker.offset.x === 10).toBe(true);
                    expect(series2.marker.height === 10).toBe(true);
                    expect(series2.marker.width === 10).toBe(true);
                    expect(series2.marker.offset.y === 10).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.visible = true;
                chartObj.series[0].marker.height = 10;
                chartObj.series[0].marker.width = 10;
                chartObj.series[0].marker.offset.x = 10;
                chartObj.series[1].marker.visible = true;
                chartObj.series[1].marker.height = 10;
                chartObj.series[1].marker.width = 10;
                chartObj.series[1].marker.offset.y = 10;
                chartObj.refresh();
            });
            it('Checking with marker with shape', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(svg.getAttribute('fill') === 'red').toBe(true);
                    svg = document.getElementById('container_Series_1_Point_0_Symbol');
                    expect(svg.getAttribute('fill') === 'black').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Rectangle';
                chartObj.series[0].marker.fill = 'red';
                chartObj.series[0].marker.offset.x = 0;
                chartObj.series[1].marker.shape = 'Diamond';
                chartObj.series[1].marker.fill = 'black';
                chartObj.series[0].marker.offset.x = 0;
                chartObj.refresh();
            });
            it('Checking with marker with shape for stackingareaa100 series', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(svg.getAttribute('fill') === 'red').toBe(true);
                    svg = document.getElementById('container_Series_1_Point_0_Symbol');
                    expect(svg.getAttribute('fill') === 'black').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.shape = 'Rectangle';
                chartObj.series[0].marker.fill = 'red';
                chartObj.series[1].marker.shape = 'Diamond';
                chartObj.series[1].marker.fill = 'black';
                chartObj.series[0].type = 'StackingArea100';
                chartObj.series[1].type = 'StackingArea100';
                chartObj.refresh();
            });
            it('checking with marker shape image', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(svg.getAttribute('href') === 'base/spec/img/img1.jpg').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'StackingArea';
                chartObj.series[1].type = 'StackingArea';
                chartObj.series[0].marker.shape = 'Image';
                chartObj.series[0].marker.imageUrl = 'base/spec/img/img1.jpg';
                chartObj.refresh();
            });
            it('Checking marker with null Points', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_2_Symbol');
                    expect(svg === null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource[2].y = null;
                chartObj.series[0].marker.visible = true;
                chartObj.refresh();
            });
            it('Checking marker with null Points for stackingarea100 series', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_2_Symbol');
                    expect(svg === null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'StackingArea100';
                chartObj.refresh();
            });
            it('Checking with add new element in data', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_8_Symbol');
                    expect(svg != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'StackingArea';
                ej2_base_1.remove(document.getElementById('containerSeriesGroup0'));
                chartObj.series[0].dataSource = null;
                var length = Object.keys(data).length;
                length++;
                data[length - 1] = [];
                data[length - 1].y = 50;
                data[length - 1].x = 10000;
                chartObj.series[0].dataSource = data;
                chartObj.refresh();
            });
            it('Checking with single data', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(svg != null).toBe(true);
                    svg = document.getElementById('container_Series_1_Point_0_Symbol');
                    expect(svg != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.rangePadding = 'Additional';
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.series[0].dataSource = null;
                chartObj.series[0].dataSource = [{ x: 4, y: 30 }];
                chartObj.series[1].dataSource = null;
                chartObj.series[1].dataSource = [{ x: 4, y: 30 }];
                chartObj.refresh();
            });
            it('Checking with single data for stackingarea100 series', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(svg != null).toBe(true);
                    svg = document.getElementById('container_Series_1_Point_0_Symbol');
                    expect(svg != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.rangePadding = 'Additional';
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.series[0].dataSource = null;
                chartObj.series[0].dataSource = [{ x: 4, y: 30 }];
                chartObj.series[1].dataSource = null;
                chartObj.series[1].dataSource = [{ x: 4, y: 30 }];
                chartObj.series[0].type = 'StackingArea100';
                chartObj.series[1].type = 'StackingArea100';
                chartObj.refresh();
            });
            it('Checking with marker without animation', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0');
                    expect(svg.getAttribute('fill') == 'rgba(135,206,235,1)').toBe(true);
                    svg = document.getElementById('container_Series_1');
                    expect(svg.getAttribute('fill') == 'blue').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].dataSource = data;
                chartObj.series[1].dataSource = data2;
                chartObj.series[0].marker.visible = true;
                chartObj.series[1].marker.visible = true;
                chartObj.series[0].type = 'StackingArea';
                chartObj.series[1].type = 'StackingArea';
                chartObj.refresh();
            });
            it('Checking with category axis', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(marker != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.series[0].dataSource = data_spec_1.categoryData;
                chartObj.series[1].dataSource = data_spec_1.categoryData;
                chartObj.series[0].marker.visible = true;
                chartObj.refresh();
            });
            it(' checking with fill and stroke', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0');
                    expect(svg.getAttribute('fill') === 'red').toBe(true);
                    expect(svg.getAttribute('stroke') === 'green').toBe(true);
                    expect(svg.getAttribute('stroke-width') === '4').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.series[0].dataSource = data;
                chartObj.series[1].dataSource = data;
                chartObj.series[0].fill = 'red';
                chartObj.series[0].border.color = 'green';
                chartObj.series[0].border.width = 4;
                chartObj.refresh();
            });
            it(' checking with fill and stroke for stackingarea100 series', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0');
                    expect(svg.getAttribute('fill') === 'red').toBe(true);
                    expect(svg.getAttribute('stroke') === 'green').toBe(true);
                    expect(svg.getAttribute('stroke-width') === '4').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Double';
                chartObj.series[0].dataSource = data;
                chartObj.series[1].dataSource = data;
                chartObj.series[0].fill = 'red';
                chartObj.series[0].border.color = 'green';
                chartObj.series[0].border.width = 4;
                chartObj.series[0].type = 'StackingArea100';
                chartObj.series[1].type = 'StackingArea100';
                chartObj.refresh();
            });
            it('Checking with category axis onticks', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(marker != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.primaryXAxis.labelPlacement = 'OnTicks';
                chartObj.series[0].dataSource = data_spec_1.categoryData;
                chartObj.series[1].dataSource = data_spec_1.categoryData;
                chartObj.series[0].type = 'StackingArea';
                chartObj.series[1].type = 'StackingArea';
                chartObj.refresh();
            });
            it('Checking with multiple series', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_0');
                    expect(svg.getAttribute('fill') == 'rgba(135,206,235,1)').toBe(true);
                    svg = document.getElementById('container_Series_1');
                    expect(svg.getAttribute('fill') == 'red').toBe(true);
                    svg = document.getElementById('container_Series_2');
                    expect(svg.getAttribute('fill') == 'green').toBe(true);
                    svg = document.getElementById('container_Series_3');
                    expect(svg.getAttribute('fill') == 'blue').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series = [{
                        dataSource: data, name: 'Gold', xName: 'x', yName: 'y', fill: 'rgba(135,206,235,1)',
                        type: 'StackingArea', animation: { enable: false },
                    },
                    {
                        dataSource: data2, name: 'silver', xName: 'x', yName: 'y', fill: 'red', type: 'StackingArea',
                        animation: { enable: false },
                    },
                    {
                        dataSource: data, name: 'Diamond', xName: 'x', yName: 'y', fill: 'green', type: 'StackingArea',
                        animation: { enable: false },
                    },
                    {
                        dataSource: data2, name: 'Gold', xName: 'x', yName: 'y', fill: 'blue', type: 'StackingArea',
                        animation: { enable: false },
                    }];
                chartObj.refresh();
            });
            it('Checking with multiple axes ', function (done) {
                loaded = function (args) {
                    svg = document.getElementById('container_Series_1');
                    expect(svg.getAttribute('fill') == 'red').toBe(true);
                    svg = document.getElementById('container_Series_0');
                    expect(svg.getAttribute('fill') == 'rgba(135,206,235,1)').toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.axes = [{
                        rowIndex: 1, name: 'yAxis1', minimum: 0,
                        titleStyle: { size: '14px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' },
                        labelStyle: { size: '12px', fontWeight: 'Regular', color: '#282828', fontStyle: 'Normal', fontFamily: 'Segoe UI' }
                    }];
                chartObj.height = '600';
                chartObj.series[2].yAxisName = 'yAxis1';
                chartObj.rows = [{ height: '300', border: { width: 4, color: 'red' } },
                    { height: '300', border: { width: 4, color: 'blue' } },];
                chartObj.refresh();
            });
            it('Checking animation', function (done) {
                var animate = function (args) {
                    var point = document.getElementById('container_ChartSeriesClipRect_' + args.series.index).childNodes[0];
                    expect(point.getAttribute('width') === document.getElementById('container_ChartAreaBorder').getAttribute('width')).toBe(true);
                    done();
                };
                chartObj.series[0].animation.enable = true;
                chartObj.series[1].animation.enable = true;
                chartObj.series[2].animation.enable = true;
                chartObj.series[3].animation.enable = true;
                chartObj.animationComplete = animate;
                chartObj.refresh();
            });
            it('Checking animation for stackingarea100 series', function (done) {
                var animate = function (args) {
                    var point = document.getElementById('container_ChartSeriesClipRect_' + args.series.index).childNodes[0];
                    expect(point.getAttribute('width') === document.getElementById('container_ChartAreaBorder').getAttribute('width')).toBe(true);
                    done();
                };
                chartObj.series[0].type = 'StackingArea100';
                chartObj.series[1].type = 'StackingArea100';
                chartObj.series[2].type = 'StackingArea100';
                chartObj.series[3].type = 'StackingArea100';
                chartObj.animationComplete = animate;
                chartObj.refresh();
            });
        });
        describe('Stacking Areas Series Inversed axis', function () {
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
                            animation: { enable: false }, name: 'ChartSeriesNameGold', dataSource: data_spec_1.seriesData1, xName: 'x', yName: 'y',
                            type: 'StackingArea', marker: { visible: false, dataLabel: { visible: true, fill: 'violet' } }
                        },
                        {
                            animation: { enable: false }, name: 'ChartSeriesNameSilver', dataSource: data_spec_1.seriesData1, xName: 'x', yName: 'y',
                            type: 'StackingArea', marker: { visible: false, dataLabel: { visible: true, fill: 'violet' } }
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
            it('With Label position Auto', function (done) {
                loaded = function (args) {
                    dataLabelY = +document.getElementById('container_Series_0_Point_2_TextShape_0').getAttribute('y');
                    pointY = chart.series[0].points[2].symbolLocations[0].y;
                    expect(dataLabelY < pointY).toBe(true);
                    dataLabelY = +document.getElementById('container_Series_1_Point_2_TextShape_0').getAttribute('y');
                    pointY = chart.series[0].points[2].symbolLocations[0].y;
                    expect(dataLabelY > pointY).toBe(true);
                    done();
                };
                chart.loaded = loaded;
                chart.refresh();
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
        describe('checking rotated area chart', function () {
            var chart;
            var loaded;
            var element = ej2_base_1.createElement('div', { id: 'container' });
            var dataLabel;
            var point;
            var trigger = new events_spec_1.MouseEvents();
            var animationComplete;
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
                        { type: 'StackingArea', name: 'area', dataSource: data_spec_1.rotateData1, xName: 'x', yName: 'y', animation: { enable: false },
                            marker: { visible: true } },
                        { type: 'StackingArea', name: 'area', dataSource: data_spec_1.rotateData2, xName: 'x', yName: 'y', animation: { enable: false },
                            marker: { visible: true } }
                    ],
                    title: 'rotated stackingarea Chart'
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
            it('checking animation', function (done) {
                animationComplete = function (args) {
                    done();
                };
                chart.series[0].animation.enable = true;
                chart.series[1].animation.enable = true;
                chart.animationComplete = animationComplete;
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
    });
});
