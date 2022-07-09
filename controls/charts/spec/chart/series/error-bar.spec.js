define(["require", "exports", "@syncfusion/ej2-base", "../../../src/chart/chart", "../base/data.spec", "../../../src/chart/series/data-label", "../../../src/chart/series/column-series", "../../../src/chart/series/error-bar", "../../../src/chart/series/line-series", "../../../src/chart/series/bar-series", "../../../src/chart/series/stacking-column-series", "../../../src/chart/series/polar-series", "../../../src/chart/axis/date-time-axis", "../../../src/chart/axis/category-axis", "../base/events.spec", "../../../src/chart/user-interaction/tooltip", "../../../src/chart/user-interaction/crosshair", "../../../src/chart/user-interaction/zooming", "../base/data.spec", "../../common.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, chart_1, data_spec_1, data_label_1, column_series_1, error_bar_1, line_series_1, bar_series_1, stacking_column_series_1, polar_series_1, date_time_axis_1, category_axis_1, events_spec_1, tooltip_1, crosshair_1, zooming_1, data_spec_2, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(line_series_1.LineSeries, zooming_1.Zoom, column_series_1.ColumnSeries, polar_series_1.PolarSeries, stacking_column_series_1.StackingColumnSeries, bar_series_1.BarSeries, category_axis_1.Category, date_time_axis_1.DateTime, error_bar_1.ErrorBar, tooltip_1.Tooltip, crosshair_1.Crosshair, data_label_1.DataLabel);
    var data = data_spec_2.tooltipData1;
    var data2 = data_spec_2.tooltipData2;
    var data3 = data_spec_2.tool1;
    var datetime = data_spec_2.datetimeData;
    var chartData = data_spec_2.tooltipData21;
    var chartData1 = data_spec_2.tooltipData21;
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
        describe('Error Bar for series', function () {
            var chartObj;
            var elem;
            var svg;
            var marker;
            var datalabel;
            var targetElement;
            var loaded;
            beforeAll(function () {
                elem = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis', interval: 2000 },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal' },
                    series: [{
                            dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Line',
                            name: 'ChartSeriesNameGold', fill: 'green', errorBar: { visible: false, errorBarCap: { length: 0 } },
                            marker: { visible: false, dataLabel: { visible: false, position: 'Top' } },
                        },
                    ], width: '800',
                    title: 'Chart TS Title', legendSettings: { visible: false },
                    zoomSettings: { enableSelectionZooming: true }
                });
                chartObj.appendTo('#container');
                data_spec_1.unbindResizeEvents(chartObj);
            });
            afterAll(function () {
                elem.remove();
                chartObj.destroy();
            });
            it('Checking with errorBar visibilty false', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series__ErrorBarGroup_0_Point_0');
                    expect(svg === null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].errorBar.visible = false;
                chartObj.refresh();
            });
            it('Checking with errorBar visibilty', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series__ErrorBarGroup_0_Point_0');
                    expect(svg != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].errorBar.visible = true;
                chartObj.refresh();
            });
            it('Checking with errorBarCap visibilty', function (done) {
                loaded = function (args) {
                    var cap = document.getElementById('container_Series__ErrorBarGroup_0_Point_0');
                    expect(cap != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].errorBar.visible = true;
                chartObj.series[0].errorBar.errorBarCap.length = 10;
                chartObj.refresh();
            });
            it('Checking with errorBar Fixed type', function (done) {
                loaded = function (args) {
                    var fixElem = document.getElementById('container_Series__ErrorBarGroup_0_Point_1');
                    var heightElement = fixElem.getAttribute('d').split(' ');
                    var value1 = (parseInt(heightElement[2]) - parseInt(heightElement[5]));
                    var value2 = (parseInt(heightElement[11]) - parseInt(heightElement[8]));
                    var errorHeight = value1 + value2;
                    var fixElem1 = document.getElementById('container_Series__ErrorBarGroup_0_Point_2');
                    var heightElement1 = fixElem1.getAttribute('d').split(' ');
                    var value21 = (parseInt(heightElement[2]) - parseInt(heightElement[5]));
                    var value22 = (parseInt(heightElement[11]) - parseInt(heightElement[8]));
                    var errorHeight1 = value21 + value22;
                    expect(fixElem.getAttribute('errorHeight') == fixElem1.getAttribute('errorHeight')).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].errorBar.visible = true;
                chartObj.series[0].errorBar.type = 'Fixed';
                chartObj.series[0].errorBar.errorBarCap.length = 10;
                chartObj.refresh();
            });
            it('Checking with errorBar percentage type', function (done) {
                loaded = function (args) {
                    var percent = document.getElementById('container_Series__ErrorBarGroup_0_Point_0');
                    var heightEle = percent.getAttribute('d').split(' ');
                    var value1 = (parseInt(heightEle[2]) - parseInt(heightEle[5]));
                    var value2 = (parseInt(heightEle[11]) - parseInt(heightEle[8]));
                    var errorHeight = value1 + value2;
                    var percent1 = document.getElementById('container_Series__ErrorBarGroup_0_Point_1');
                    var heightEle1 = percent1.getAttribute('d').split(' ');
                    var value11 = (parseInt(heightEle1[2]) - parseInt(heightEle1[5]));
                    var value22 = (parseInt(heightEle1[11]) - parseInt(heightEle1[8]));
                    var errorHeight1 = value1 + value2;
                    expect(percent.getAttribute('errorHeight') == percent1.getAttribute('errorHeight1'));
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].errorBar.visible = true;
                chartObj.series[0].errorBar.type = 'Percentage';
                chartObj.series[0].errorBar.errorBarCap.length = 10;
                chartObj.refresh();
            });
            it('Checking with errorBar standard deviation type', function (done) {
                loaded = function (args) {
                    var sdElem = document.getElementById('container_Series__ErrorBarGroup_0_Point_1');
                    var sdHeight = sdElem.getAttribute('d').split(' ');
                    expect(sdElem != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].errorBar.visible = true;
                chartObj.series[0].errorBar.type = 'StandardDeviation';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with errorBar standard error type', function (done) {
                loaded = function (args) {
                    var sdErrorElem = document.getElementById('container_Series__ErrorBarGroup_0_Point_0');
                    expect(sdErrorElem != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].errorBar.visible = true;
                chartObj.series[0].errorBar.type = 'StandardError';
                chartObj.refresh();
            });
            it('Checking with errorBar custom type', function (done) {
                loaded = function (args) {
                    var customElem = document.getElementById('container_Series__ErrorBarGroup_0_Point_0');
                    expect(customElem != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].errorBar.visible = true;
                chartObj.series[0].errorBar.type = 'Custom';
                chartObj.refresh();
            });
            it('Checking with errorBar custom type in verticalChart', function (done) {
                loaded = function (args) {
                    var customElem = document.getElementById('container_Series__ErrorBarGroup_0_Point_0');
                    expect(customElem != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.isTransposed = true;
                chartObj.series[0].errorBar.visible = true;
                chartObj.series[0].errorBar.type = 'Custom';
                chartObj.refresh();
            });
            it('Checking with errorBar vertical mode', function (done) {
                loaded = function (args) {
                    var fixElem = document.getElementById('container_Series__ErrorBarGroup_0_Point_1');
                    var heightElement = fixElem.getAttribute('d').split(' ');
                    var value1 = (parseInt(heightElement[2]) - parseInt(heightElement[5]));
                    var fixElem1 = document.getElementById('container_Series__ErrorBarGroup_0_Point_2');
                    var heightElement1 = fixElem1.getAttribute('d').split(' ');
                    var value21 = (parseInt(heightElement[2]) - parseInt(heightElement[5]));
                    expect(fixElem.getAttribute('value1') == fixElem1.getAttribute('value21')).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.isTransposed = false;
                chartObj.series[0].errorBar.visible = true;
                chartObj.series[0].errorBar.type = 'Fixed';
                chartObj.series[0].errorBar.mode = 'Vertical';
                chartObj.refresh();
            });
            it('Checking with errorBar horizontal mode', function (done) {
                loaded = function (args) {
                    var percent = document.getElementById('container_Series__ErrorBarGroup_0_Point_0');
                    var heightEle = percent.getAttribute('d').split(' ');
                    var value1 = (parseInt(heightEle[2]) - parseInt(heightEle[5]));
                    var value2 = (parseInt(heightEle[11]) - parseInt(heightEle[8]));
                    var errorHeight = value1 + value2;
                    var percent1 = document.getElementById('container_Series__ErrorBarGroup_0_Point_1');
                    var heightEle1 = percent1.getAttribute('d').split(' ');
                    var value11 = (parseInt(heightEle1[2]) - parseInt(heightEle1[5]));
                    var value22 = (parseInt(heightEle1[11]) - parseInt(heightEle1[8]));
                    var errorHeight1 = value1 + value2;
                    expect(percent.getAttribute('errorHeight') == percent1.getAttribute('errorHeight1'));
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].errorBar.visible = true;
                chartObj.series[0].errorBar.type = 'Percentage';
                chartObj.series[0].errorBar.mode = 'Horizontal';
                chartObj.refresh();
            });
            it('Checking with errorBar horizontal mode direction plus', function (done) {
                loaded = function (args) {
                    var percent = document.getElementById('container_Series__ErrorBarGroup_0_Point_0');
                    var heightEle = percent.getAttribute('d').split(' ');
                    var value1 = (parseInt(heightEle[2]) - parseInt(heightEle[5]));
                    var value2 = (parseInt(heightEle[11]) - parseInt(heightEle[8]));
                    var errorHeight = value1 + value2;
                    var percent1 = document.getElementById('container_Series__ErrorBarGroup_0_Point_1');
                    var heightEle1 = percent1.getAttribute('d').split(' ');
                    var value11 = (parseInt(heightEle1[2]) - parseInt(heightEle1[5]));
                    var value22 = (parseInt(heightEle1[11]) - parseInt(heightEle1[8]));
                    var errorHeight1 = value1 + value2;
                    expect(percent.getAttribute('errorHeight') == percent1.getAttribute('errorHeight1'));
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].errorBar.visible = true;
                chartObj.series[0].errorBar.type = 'Percentage';
                chartObj.series[0].errorBar.mode = 'Horizontal';
                chartObj.series[0].errorBar.direction = 'Plus';
                chartObj.refresh();
            });
            it('Checking with errorBar horizontal mode direction minus', function (done) {
                loaded = function (args) {
                    var percent = document.getElementById('container_Series__ErrorBarGroup_0_Point_0');
                    var heightEle = percent.getAttribute('d').split(' ');
                    var value1 = (parseInt(heightEle[2]) - parseInt(heightEle[5]));
                    var value2 = (parseInt(heightEle[11]) - parseInt(heightEle[8]));
                    var errorHeight = value1 + value2;
                    var percent1 = document.getElementById('container_Series__ErrorBarGroup_0_Point_1');
                    var heightEle1 = percent1.getAttribute('d').split(' ');
                    var value11 = (parseInt(heightEle1[2]) - parseInt(heightEle1[5]));
                    var value22 = (parseInt(heightEle1[11]) - parseInt(heightEle1[8]));
                    var errorHeight1 = value1 + value2;
                    expect(percent.getAttribute('errorHeight') == percent1.getAttribute('errorHeight1'));
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].errorBar.visible = true;
                chartObj.series[0].errorBar.type = 'Percentage';
                chartObj.series[0].errorBar.mode = 'Horizontal';
                chartObj.series[0].errorBar.direction = 'Minus';
                chartObj.refresh();
            });
            it('Checking with errorBar both mode', function (done) {
                loaded = function (args) {
                    var percent = document.getElementById('container_Series__ErrorBarGroup_0_Point_0');
                    var heightEle = percent.getAttribute('d').split(' ');
                    var value1 = (parseInt(heightEle[2]) - parseInt(heightEle[5]));
                    var value2 = (parseInt(heightEle[11]) - parseInt(heightEle[8]));
                    var errorHeight = value1 + value2;
                    var percent1 = document.getElementById('container_Series__ErrorBarGroup_0_Point_1');
                    var heightEle1 = percent1.getAttribute('d').split(' ');
                    var value11 = (parseInt(heightEle1[2]) - parseInt(heightEle1[5]));
                    var value22 = (parseInt(heightEle1[11]) - parseInt(heightEle1[8]));
                    var errorHeight1 = value1 + value2;
                    expect(percent.getAttribute('errorHeight') == percent1.getAttribute('errorHeight1'));
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].errorBar.visible = true;
                chartObj.series[0].errorBar.type = 'Percentage';
                chartObj.series[0].errorBar.mode = 'Both';
                chartObj.refresh();
            });
            it('Checking with errorBar Plus direction', function (done) {
                loaded = function (args) {
                    var fixElem = document.getElementById('container_Series__ErrorBarGroup_0_Point_1');
                    var heightElement = fixElem.getAttribute('d').split(' ');
                    var value1 = (parseInt(heightElement[2]) - parseInt(heightElement[5]));
                    var fixElem1 = document.getElementById('container_Series__ErrorBarGroup_0_Point_2');
                    var heightElement1 = fixElem1.getAttribute('d').split(' ');
                    var value21 = (parseInt(heightElement[2]) - parseInt(heightElement[5]));
                    expect(fixElem.getAttribute('value1') == fixElem1.getAttribute('value21')).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].errorBar.visible = true;
                chartObj.series[0].errorBar.type = 'Fixed';
                chartObj.series[0].errorBar.direction = 'Plus';
                chartObj.refresh();
            });
            it('Checking with errorBar Minus direction', function (done) {
                loaded = function (args) {
                    var fixElem = document.getElementById('container_Series__ErrorBarGroup_0_Point_1');
                    var heightElement = fixElem.getAttribute('d').split(' ');
                    var value1 = (parseInt(heightElement[2]) - parseInt(heightElement[5]));
                    var fixElem1 = document.getElementById('container_Series__ErrorBarGroup_0_Point_2');
                    var heightElement1 = fixElem1.getAttribute('d').split(' ');
                    var value21 = (parseInt(heightElement[2]) - parseInt(heightElement[5]));
                    expect(fixElem.getAttribute('value1') == fixElem1.getAttribute('value21')).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].errorBar.visible = true;
                chartObj.series[0].errorBar.type = 'Fixed';
                chartObj.series[0].errorBar.direction = 'Minus';
                chartObj.refresh();
            });
            it('Checking with errorBar both direction', function (done) {
                loaded = function (args) {
                    var fixElem = document.getElementById('container_Series__ErrorBarGroup_0_Point_1');
                    var heightElement = fixElem.getAttribute('d').split(' ');
                    var value1 = (parseInt(heightElement[2]) - parseInt(heightElement[5]));
                    var value2 = (parseInt(heightElement[11]) - parseInt(heightElement[8]));
                    var errorHeight = value1 + value2;
                    var fixElem1 = document.getElementById('container_Series__ErrorBarGroup_0_Point_2');
                    var heightElement1 = fixElem1.getAttribute('d').split(' ');
                    var value21 = (parseInt(heightElement[2]) - parseInt(heightElement[5]));
                    var value22 = (parseInt(heightElement[11]) - parseInt(heightElement[8]));
                    var errorHeight1 = value21 + value22;
                    expect(fixElem.getAttribute('errorHeight') == fixElem1.getAttribute('errorHeight1')).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].errorBar.visible = true;
                chartObj.series[0].errorBar.type = 'Fixed';
                chartObj.series[0].errorBar.direction = 'Both';
                chartObj.refresh();
            });
            it('Checking with marker visible', function (done) {
                loaded = function (args) {
                    datalabel = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(datalabel != null).toBe(true);
                    var fixElement = document.getElementById('container_Series__ErrorBarGroup_0_Point_0');
                    expect(fixElement != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.visible = true;
                chartObj.series[0].errorBar.visible = true;
                chartObj.refresh();
            });
            it('With Label position Auto', function (done) {
                loaded = function (args) {
                    var dataLabelY = +document.getElementById('container_Series_0_Point_1_Text_0').getAttribute('y');
                    var pointY = chartObj.series[0].points[2].symbolLocations[0].y;
                    expect(dataLabelY > pointY).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.visible = true;
                chartObj.refresh();
            });
            it('With Label position Top', function (done) {
                loaded = function (args) {
                    var dataLabelY = +document.getElementById('container_Series_0_Point_2_Text_0').getAttribute('y');
                    var pointY = chartObj.series[0].points[2].symbolLocations[0].y;
                    expect(dataLabelY < pointY).toBe(true);
                    dataLabelY = +document.getElementById('container_Series_0_Point_5_Text_0').getAttribute('y');
                    pointY = chartObj.series[0].points[5].symbolLocations[0].y;
                    expect(dataLabelY < pointY).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Top';
                chartObj.series[0].marker.dataLabel.alignment = 'Center';
                chartObj.series[0].errorBar.mode = 'Vertical';
                chartObj.refresh();
            });
            it('With Label position Bottom', function (done) {
                loaded = function (args) {
                    var dataLabelY = +document.getElementById('container_Series_0_Point_2_Text_0').getAttribute('y');
                    var pointY = chartObj.series[0].points[2].symbolLocations[0].y;
                    expect(dataLabelY > pointY).toBe(true);
                    dataLabelY = +document.getElementById('container_Series_0_Point_5_Text_0').getAttribute('y');
                    pointY = chartObj.series[0].points[5].symbolLocations[0].y;
                    expect(dataLabelY > pointY).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Bottom';
                chartObj.series[0].errorBar.mode = 'Horizontal';
                chartObj.refresh();
            });
            it('With Label position Bottom plus direction', function (done) {
                loaded = function (args) {
                    var dataLabelY = +document.getElementById('container_Series_0_Point_2_Text_0').getAttribute('y');
                    var pointY = chartObj.series[0].points[2].symbolLocations[0].y;
                    expect(dataLabelY > pointY).toBe(true);
                    dataLabelY = +document.getElementById('container_Series_0_Point_5_Text_0').getAttribute('y');
                    pointY = chartObj.series[0].points[5].symbolLocations[0].y;
                    expect(dataLabelY > pointY).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Bottom';
                chartObj.series[0].errorBar.mode = 'Vertical';
                chartObj.series[0].errorBar.direction = 'Plus';
                chartObj.refresh();
            });
            it('With Label position Bottom in both mode', function (done) {
                loaded = function (args) {
                    var dataLabelY = +document.getElementById('container_Series_0_Point_2_Text_0').getAttribute('y');
                    var pointY = chartObj.series[0].points[2].symbolLocations[0].y;
                    expect(dataLabelY > pointY).toBe(true);
                    dataLabelY = +document.getElementById('container_Series_0_Point_5_Text_0').getAttribute('y');
                    pointY = chartObj.series[0].points[5].symbolLocations[0].y;
                    expect(dataLabelY > pointY).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Bottom';
                chartObj.series[0].errorBar.mode = 'Both';
                chartObj.refresh();
            });
            it('Checking with category axis', function (done) {
                loaded = function (args) {
                    marker = document.getElementById('container_Series_0_Point_0_Symbol');
                    expect(marker != null).toBe(true);
                    var fixElement = document.getElementById('container_Series__ErrorBarGroup_0_Point_0');
                    expect(fixElement != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.series[0].dataSource = data_spec_2.categoryData;
                chartObj.series[0].marker.visible = true;
                chartObj.series[0].errorBar.visible = true;
                chartObj.series[0].errorBar.errorBarCap.length = 10;
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
                    var fixElement = document.getElementById('container_Series__ErrorBarGroup_0_Point_0');
                    expect(fixElement != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.tooltip.enable = true;
                chartObj.series[0].errorBar.visible = true;
                chartObj.series[0].errorBar.errorBarCap.length = 10;
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
                    var fixElement = document.getElementById('container_Series__ErrorBarGroup_0_Point_0');
                    expect(fixElement != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.tooltip.shared = true;
                chartObj.series[0].errorBar.visible = true;
                chartObj.series[0].errorBar.errorBarCap.length = 10;
                chartObj.refresh();
            });
            it('Checking with errorBar visibilty in polarseries', function (done) {
                loaded = function (args) {
                    var errorElem = document.getElementById('container_Series__ErrorBarGroup_0_Point_0');
                    expect(errorElem == null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].type = 'Polar';
                chartObj.series[0].errorBar.visible = true;
                chartObj.refresh();
            });
        });
        describe('Chart Bar series', function () {
            var chartObj;
            var elem;
            var point;
            var svg;
            var targetElement;
            var loaded;
            var done;
            var dataLabel;
            var trigger = new events_spec_1.MouseEvents();
            var x;
            var y;
            var animationComplete;
            beforeAll(function () {
                elem = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis', },
                    primaryYAxis: { title: 'PrimaryYAxis', },
                    series: [{
                            dataSource: data, xName: 'x', yName: 'y', animation: { enable: false }, type: 'Bar',
                            name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
                        },
                    ], width: '800',
                    tooltip: { enable: true, fill: 'rgba(247,247,247,0.85)', textStyle: { size: '12px' }, format: '${series.name} : ${point.x} <br/> : ${point.y}' },
                    legendSettings: { visible: false },
                    title: 'Chart TS Title'
                });
                chartObj.appendTo('#container');
                data_spec_1.unbindResizeEvents(chartObj);
            });
            afterAll(function () {
                chartObj.destroy();
                elem.remove();
            });
            it('Checking with errorBar visibilty false', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series__ErrorBarGroup_0_Point_0');
                    expect(svg === null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].errorBar.visible = false;
                chartObj.refresh();
            });
            it('Checking with errorBar visibilty', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series__ErrorBarGroup_0_Point_0');
                    expect(svg != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].errorBar.visible = true;
                chartObj.refresh();
            });
            it('Checking with errorBarCap visibilty', function (done) {
                loaded = function (args) {
                    var cap = document.getElementById('container_Series__ErrorBarGroup_0_Point_0');
                    expect(cap != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].errorBar.visible = true;
                chartObj.series[0].errorBar.errorBarCap.length = 10;
                chartObj.refresh();
            });
            it('Checking with errorBar Fixed type', function (done) {
                loaded = function (args) {
                    var fixElem = document.getElementById('container_Series__ErrorBarGroup_0_Point_1');
                    var heightElement = fixElem.getAttribute('d').split(' ');
                    var value1 = (parseInt(heightElement[2]) - parseInt(heightElement[5]));
                    var value2 = (parseInt(heightElement[11]) - parseInt(heightElement[8]));
                    var errorHeight = value1 + value2;
                    var fixElem1 = document.getElementById('container_Series__ErrorBarGroup_0_Point_2');
                    var heightElement1 = fixElem1.getAttribute('d').split(' ');
                    var value21 = (parseInt(heightElement[2]) - parseInt(heightElement[5]));
                    var value22 = (parseInt(heightElement[11]) - parseInt(heightElement[8]));
                    var errorHeight1 = value21 + value22;
                    expect(fixElem.getAttribute('errorHeight') == fixElem1.getAttribute('errorHeight')).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].errorBar.visible = true;
                chartObj.series[0].errorBar.type = 'Fixed';
                chartObj.refresh();
            });
            it('Checking with errorBar percentage type', function (done) {
                loaded = function (args) {
                    var percent = document.getElementById('container_Series__ErrorBarGroup_0_Point_0');
                    var heightEle = percent.getAttribute('d').split(' ');
                    var value1 = (parseInt(heightEle[2]) - parseInt(heightEle[5]));
                    var value2 = (parseInt(heightEle[11]) - parseInt(heightEle[8]));
                    var errorHeight = value1 + value2;
                    var percent1 = document.getElementById('container_Series__ErrorBarGroup_0_Point_1');
                    var heightEle1 = percent1.getAttribute('d').split(' ');
                    var value11 = (parseInt(heightEle1[2]) - parseInt(heightEle1[5]));
                    var value22 = (parseInt(heightEle1[11]) - parseInt(heightEle1[8]));
                    var errorHeight1 = value1 + value2;
                    expect(percent.getAttribute('errorHeight') == percent1.getAttribute('errorHeight1'));
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].errorBar.visible = true;
                chartObj.series[0].errorBar.type = 'Percentage';
                chartObj.refresh();
            });
            it('Checking with errorBar standard deviation type', function (done) {
                loaded = function (args) {
                    var sdElem = document.getElementById('container_Series__ErrorBarGroup_0_Point_1');
                    var sdHeight = sdElem.getAttribute('d').split(' ');
                    expect(sdElem != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].errorBar.visible = true;
                chartObj.series[0].errorBar.type = 'StandardDeviation';
                chartObj.refresh();
            });
            it('Checking with errorBar standard error type', function (done) {
                loaded = function (args) {
                    var sdErrorElem = document.getElementById('container_Series__ErrorBarGroup_0_Point_0');
                    expect(sdErrorElem != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].errorBar.visible = true;
                chartObj.series[0].errorBar.type = 'StandardError';
                chartObj.refresh();
            });
            it('Checking with errorBar standard error type in horizontal mode', function (done) {
                loaded = function (args) {
                    var sdErrorElem = document.getElementById('container_Series__ErrorBarGroup_0_Point_0');
                    expect(sdErrorElem != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].errorBar.visible = true;
                chartObj.series[0].errorBar.type = 'StandardError';
                chartObj.series[0].errorBar.mode = 'Horizontal';
                chartObj.refresh();
            });
            it('Checking with errorBar custom type', function (done) {
                loaded = function (args) {
                    var customElem = document.getElementById('container_Series__ErrorBarGroup_0_Point_0');
                    expect(customElem != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].errorBar.visible = true;
                chartObj.series[0].errorBar.type = 'Custom';
                chartObj.refresh();
            });
            it('Checking with errorBar vertical mode', function (done) {
                loaded = function (args) {
                    var percent = document.getElementById('container_Series__ErrorBarGroup_0_Point_0');
                    var heightEle = percent.getAttribute('d').split(' ');
                    var value1 = (parseInt(heightEle[2]) - parseInt(heightEle[5]));
                    var value2 = (parseInt(heightEle[11]) - parseInt(heightEle[8]));
                    var errorHeight = value1 + value2;
                    var percent1 = document.getElementById('container_Series__ErrorBarGroup_0_Point_1');
                    var heightEle1 = percent1.getAttribute('d').split(' ');
                    var value11 = (parseInt(heightEle1[2]) - parseInt(heightEle1[5]));
                    var value22 = (parseInt(heightEle1[11]) - parseInt(heightEle1[8]));
                    var errorHeight1 = value1 + value2;
                    expect(percent.getAttribute('errorHeight') == percent1.getAttribute('errorHeight1'));
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].errorBar.visible = true;
                chartObj.series[0].errorBar.type = 'Percentage';
                chartObj.series[0].errorBar.mode = 'Vertical';
                chartObj.refresh();
            });
            it('Checking with errorBar horizontal mode', function (done) {
                loaded = function (args) {
                    var percent = document.getElementById('container_Series__ErrorBarGroup_0_Point_0');
                    var heightEle = percent.getAttribute('d').split(' ');
                    var value1 = (parseInt(heightEle[2]) - parseInt(heightEle[5]));
                    var value2 = (parseInt(heightEle[11]) - parseInt(heightEle[8]));
                    var errorHeight = value1 + value2;
                    var percent1 = document.getElementById('container_Series__ErrorBarGroup_0_Point_1');
                    var heightEle1 = percent1.getAttribute('d').split(' ');
                    var value11 = (parseInt(heightEle1[2]) - parseInt(heightEle1[5]));
                    var value22 = (parseInt(heightEle1[11]) - parseInt(heightEle1[8]));
                    var errorHeight1 = value1 + value2;
                    expect(percent.getAttribute('errorHeight') == percent1.getAttribute('errorHeight1'));
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].errorBar.visible = true;
                chartObj.series[0].errorBar.type = 'Percentage';
                chartObj.series[0].errorBar.mode = 'Horizontal';
                chartObj.refresh();
            });
            it('Checking with errorBar horizontal mode plus direction', function (done) {
                loaded = function (args) {
                    var percent = document.getElementById('container_Series__ErrorBarGroup_0_Point_0');
                    var heightEle = percent.getAttribute('d').split(' ');
                    var value1 = (parseInt(heightEle[2]) - parseInt(heightEle[5]));
                    var value2 = (parseInt(heightEle[11]) - parseInt(heightEle[8]));
                    var errorHeight = value1 + value2;
                    var percent1 = document.getElementById('container_Series__ErrorBarGroup_0_Point_1');
                    var heightEle1 = percent1.getAttribute('d').split(' ');
                    var value11 = (parseInt(heightEle1[2]) - parseInt(heightEle1[5]));
                    var value22 = (parseInt(heightEle1[11]) - parseInt(heightEle1[8]));
                    var errorHeight1 = value1 + value2;
                    expect(percent.getAttribute('errorHeight') == percent1.getAttribute('errorHeight1'));
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].errorBar.visible = true;
                chartObj.series[0].errorBar.type = 'Percentage';
                chartObj.series[0].errorBar.mode = 'Horizontal';
                chartObj.series[0].errorBar.direction = 'Plus';
                chartObj.refresh();
            });
            it('Checking with errorBar horizontal mode minus direction', function (done) {
                loaded = function (args) {
                    var percent = document.getElementById('container_Series__ErrorBarGroup_0_Point_0');
                    var heightEle = percent.getAttribute('d').split(' ');
                    var value1 = (parseInt(heightEle[2]) - parseInt(heightEle[5]));
                    var value2 = (parseInt(heightEle[11]) - parseInt(heightEle[8]));
                    var errorHeight = value1 + value2;
                    var percent1 = document.getElementById('container_Series__ErrorBarGroup_0_Point_1');
                    var heightEle1 = percent1.getAttribute('d').split(' ');
                    var value11 = (parseInt(heightEle1[2]) - parseInt(heightEle1[5]));
                    var value22 = (parseInt(heightEle1[11]) - parseInt(heightEle1[8]));
                    var errorHeight1 = value1 + value2;
                    expect(percent.getAttribute('errorHeight') == percent1.getAttribute('errorHeight1'));
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].errorBar.visible = true;
                chartObj.series[0].errorBar.type = 'Percentage';
                chartObj.series[0].errorBar.mode = 'Horizontal';
                chartObj.series[0].errorBar.direction = 'Minus';
                chartObj.refresh();
            });
            it(' Standard deviation type errorBar horizontal mode', function (done) {
                loaded = function (args) {
                    var percent = document.getElementById('container_Series__ErrorBarGroup_0_Point_0');
                    var heightEle = percent.getAttribute('d').split(' ');
                    var value1 = (parseInt(heightEle[2]) - parseInt(heightEle[5]));
                    var value2 = (parseInt(heightEle[11]) - parseInt(heightEle[8]));
                    var errorHeight = value1 + value2;
                    var percent1 = document.getElementById('container_Series__ErrorBarGroup_0_Point_1');
                    var heightEle1 = percent1.getAttribute('d').split(' ');
                    var value11 = (parseInt(heightEle1[2]) - parseInt(heightEle1[5]));
                    var value22 = (parseInt(heightEle1[11]) - parseInt(heightEle1[8]));
                    var errorHeight1 = value1 + value2;
                    expect(percent.getAttribute('errorHeight') == percent1.getAttribute('errorHeight1'));
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].errorBar.visible = true;
                chartObj.series[0].errorBar.type = 'StandardDeviation';
                chartObj.series[0].errorBar.mode = 'Horizontal';
                chartObj.refresh();
            });
            it('Checking with errorBar custom type', function (done) {
                loaded = function (args) {
                    var customElem = document.getElementById('container_Series__ErrorBarGroup_0_Point_0');
                    expect(customElem != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].errorBar.visible = true;
                chartObj.series[0].errorBar.type = 'Custom';
                chartObj.series[0].errorBar.mode = 'Both';
                chartObj.refresh();
                data_spec_1.unbindResizeEvents(chartObj);
            });
            it('Checking with errorBar both mode', function (done) {
                loaded = function (args) {
                    var percent = document.getElementById('container_Series__ErrorBarGroup_0_Point_0');
                    var heightEle = percent.getAttribute('d').split(' ');
                    var value1 = (parseInt(heightEle[2]) - parseInt(heightEle[5]));
                    var value2 = (parseInt(heightEle[11]) - parseInt(heightEle[8]));
                    var errorHeight = value1 + value2;
                    var percent1 = document.getElementById('container_Series__ErrorBarGroup_0_Point_1');
                    var heightEle1 = percent1.getAttribute('d').split(' ');
                    var value11 = (parseInt(heightEle1[2]) - parseInt(heightEle1[5]));
                    var value22 = (parseInt(heightEle1[11]) - parseInt(heightEle1[8]));
                    var errorHeight1 = value1 + value2;
                    expect(percent.getAttribute('errorHeight') == percent1.getAttribute('errorHeight1'));
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].errorBar.visible = true;
                chartObj.series[0].errorBar.type = 'Percentage';
                chartObj.series[0].errorBar.mode = 'Both';
                chartObj.refresh();
            });
            it('Checking with errorBar Plus direction', function (done) {
                loaded = function (args) {
                    var fixElem = document.getElementById('container_Series__ErrorBarGroup_0_Point_1');
                    var heightElement = fixElem.getAttribute('d').split(' ');
                    var value1 = (parseInt(heightElement[2]) - parseInt(heightElement[5]));
                    var fixElem1 = document.getElementById('container_Series__ErrorBarGroup_0_Point_2');
                    var heightElement1 = fixElem1.getAttribute('d').split(' ');
                    var value21 = (parseInt(heightElement[2]) - parseInt(heightElement[5]));
                    expect(fixElem.getAttribute('value1') == fixElem1.getAttribute('value21')).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].errorBar.visible = true;
                chartObj.series[0].errorBar.type = 'Fixed';
                chartObj.series[0].errorBar.direction = 'Plus';
                chartObj.refresh();
            });
            it('Checking with errorBar Minus direction', function (done) {
                loaded = function (args) {
                    var fixElem = document.getElementById('container_Series__ErrorBarGroup_0_Point_1');
                    var heightElement = fixElem.getAttribute('d').split(' ');
                    var value1 = (parseInt(heightElement[2]) - parseInt(heightElement[5]));
                    var fixElem1 = document.getElementById('container_Series__ErrorBarGroup_0_Point_2');
                    var heightElement1 = fixElem1.getAttribute('d').split(' ');
                    var value21 = (parseInt(heightElement[2]) - parseInt(heightElement[5]));
                    expect(fixElem.getAttribute('value1') == fixElem1.getAttribute('value21')).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].errorBar.visible = true;
                chartObj.series[0].errorBar.type = 'Fixed';
                chartObj.series[0].errorBar.direction = 'Minus';
                chartObj.refresh();
            });
            it('Checking with errorBar both direction', function (done) {
                loaded = function (args) {
                    var fixElem = document.getElementById('container_Series__ErrorBarGroup_0_Point_1');
                    var heightElement = fixElem.getAttribute('d').split(' ');
                    var value1 = (parseInt(heightElement[2]) - parseInt(heightElement[5]));
                    var value2 = (parseInt(heightElement[11]) - parseInt(heightElement[8]));
                    var errorHeight = value1 + value2;
                    var fixElem1 = document.getElementById('container_Series__ErrorBarGroup_0_Point_2');
                    var heightElement1 = fixElem1.getAttribute('d').split(' ');
                    var value21 = (parseInt(heightElement[2]) - parseInt(heightElement[5]));
                    var value22 = (parseInt(heightElement[11]) - parseInt(heightElement[8]));
                    var errorHeight1 = value21 + value22;
                    expect(fixElem.getAttribute('errorHeight') == fixElem1.getAttribute('errorHeight1')).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].errorBar.visible = true;
                chartObj.series[0].errorBar.type = 'Fixed';
                chartObj.series[0].errorBar.direction = 'Both';
                chartObj.refresh();
            });
            it('With Label position Auto', function (done) {
                loaded = function (args) {
                    var dataLabelY = +document.getElementById('container_Series_0_Point_1_Text_0').getAttribute('y');
                    var pointY = chartObj.series[0].points[2].symbolLocations[0].y;
                    expect(dataLabelY > pointY).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.visible = true;
                chartObj.refresh();
            });
            it('With Label position Bottom horizontal mode', function (done) {
                loaded = function (args) {
                    var dataLabelY = +document.getElementById('container_Series_0_Point_2_Text_0').getAttribute('y');
                    var pointY = chartObj.series[0].points[2].symbolLocations[0].y;
                    expect(dataLabelY > pointY).toBe(true);
                    dataLabelY = +document.getElementById('container_Series_0_Point_5_Text_0').getAttribute('y');
                    pointY = chartObj.series[0].points[5].symbolLocations[0].y;
                    expect(dataLabelY > pointY).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Bottom';
                chartObj.series[0].errorBar.mode = 'Horizontal';
                chartObj.refresh();
            });
            it('With Label position Bottom horizontal mode minus direction', function (done) {
                loaded = function (args) {
                    var dataLabelY = +document.getElementById('container_Series_0_Point_2_Text_0').getAttribute('y');
                    var pointY = chartObj.series[0].points[2].symbolLocations[0].y;
                    expect(dataLabelY > pointY).toBe(true);
                    dataLabelY = +document.getElementById('container_Series_0_Point_5_Text_0').getAttribute('y');
                    pointY = chartObj.series[0].points[5].symbolLocations[0].y;
                    expect(dataLabelY > pointY).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Bottom';
                chartObj.series[0].errorBar.mode = 'Horizontal';
                chartObj.series[0].errorBar.direction = 'Minus';
                chartObj.refresh();
            });
            it('With Label position Bottom vertical mode', function (done) {
                loaded = function (args) {
                    var dataLabelY = +document.getElementById('container_Series_0_Point_2_Text_0').getAttribute('y');
                    var pointY = chartObj.series[0].points[2].symbolLocations[0].y;
                    expect(dataLabelY > pointY).toBe(true);
                    dataLabelY = +document.getElementById('container_Series_0_Point_5_Text_0').getAttribute('y');
                    pointY = chartObj.series[0].points[5].symbolLocations[0].y;
                    expect(dataLabelY > pointY).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].marker.dataLabel.position = 'Bottom';
                chartObj.series[0].errorBar.mode = 'Vertical';
                chartObj.series[0].errorBar.direction = 'Plus';
                chartObj.refresh();
            });
            it('checking with animation', function (done) {
                loaded = function (args) {
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].animation.enable = true;
                chartObj.refresh();
            });
        });
        describe('Chart StackingColumn series', function () {
            var chartObj;
            var elem;
            var svg;
            var targetElement;
            var loaded;
            var dataLabel;
            var marker;
            beforeAll(function () {
                elem = ej2_base_1.createElement('div', { id: 'container' });
                document.body.appendChild(elem);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal' },
                    series: [{
                            dataSource: chartData, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingColumn',
                            name: 'ChartSeriesNameGold', fill: 'rgba(135,206,235,1)',
                        },
                        {
                            dataSource: chartData1, xName: 'x', yName: 'y', animation: { enable: false }, type: 'StackingColumn',
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
            it('Checking with errorBar  vertical mode', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series__ErrorBarGroup_0_Point_0');
                    expect(svg != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].errorBar.visible = true;
                chartObj.series[1].errorBar.visible = true;
                chartObj.refresh();
            });
            it('Checking with errorBar  fixed type horizontal mode', function (done) {
                loaded = function (args) {
                    var svg = document.getElementById('container_Series__ErrorBarGroup_0_Point_0');
                    expect(svg != null).toBe(true);
                    var svg1 = document.getElementById('container_Series__ErrorBarGroup_1_Point_1');
                    expect(svg1 != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].errorBar.visible = true;
                chartObj.series[0].errorBar.mode = 'Horizontal';
                chartObj.series[1].errorBar.visible = true;
                chartObj.series[1].errorBar.mode = 'Horizontal';
                chartObj.refresh();
            });
            it('Checking with horizontal mode', function (done) {
                loaded = function (args) {
                    var sdErrorElem = document.getElementById('container_Series__ErrorBarGroup_0_Point_0');
                    expect(sdErrorElem != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].errorBar.visible = true;
                chartObj.series[0].errorBar.type = 'StandardError';
                chartObj.series[0].errorBar.mode = 'Horizontal';
                chartObj.series[1].errorBar.visible = true;
                chartObj.series[1].errorBar.type = 'StandardError';
                chartObj.series[1].errorBar.mode = 'Horizontal';
                chartObj.refresh();
            });
            it('Checking with both mode', function (done) {
                loaded = function (args) {
                    var sdErrorElem = document.getElementById('container_Series__ErrorBarGroup_0_Point_0');
                    expect(sdErrorElem != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].errorBar.visible = true;
                chartObj.series[0].errorBar.type = 'StandardError';
                chartObj.series[0].errorBar.mode = 'Both';
                chartObj.series[1].errorBar.visible = true;
                chartObj.series[1].errorBar.type = 'StandardError';
                chartObj.series[1].errorBar.mode = 'Both';
                chartObj.refresh();
            });
            it('Checking with custom type vertical mode', function (done) {
                loaded = function (args) {
                    var cusErrorElem = document.getElementById('container_Series__ErrorBarGroup_0_Point_0');
                    expect(cusErrorElem != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].errorBar.visible = true;
                chartObj.series[0].errorBar.type = 'Custom';
                chartObj.series[0].errorBar.mode = 'Vertical';
                chartObj.series[1].errorBar.visible = true;
                chartObj.series[1].errorBar.type = 'Custom';
                chartObj.series[0].errorBar.mode = 'Vertical';
                chartObj.refresh();
            });
            it('Checking with custom type', function (done) {
                loaded = function (args) {
                    var cusErrorElem = document.getElementById('container_Series__ErrorBarGroup_0_Point_0');
                    expect(cusErrorElem != null).toBe(true);
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.series[0].errorBar.visible = true;
                chartObj.series[0].errorBar.type = 'Custom';
                chartObj.series[0].errorBar.mode = 'Horizontal';
                chartObj.series[1].errorBar.visible = true;
                chartObj.series[1].errorBar.type = 'Custom';
                chartObj.series[0].errorBar.mode = 'Horizontal';
                chartObj.zoomSettings.enableSelectionZooming = true;
                chartObj.refresh();
            });
            it('Checking pinch zooming with label', function (done) {
                loaded = function (args) {
                    chartObj.loaded = null;
                    var touchStartArgs;
                    var content;
                    var areaElement = document.getElementById('container_ChartAreaBorder');
                    chartObj.chartOnMouseDown(trigger.onTouchStart(areaElement, 608, 189, 504, 289, 504, 289));
                    chartObj.mouseMove(trigger.onTouchMove(areaElement, 728, 389, 404, 289, 404, 189));
                    chartObj.mouseMove(trigger.onTouchMove(areaElement, 748, 129, 304, 289, 304, 289));
                    content = chartObj.primaryXAxis.zoomFactor.toFixed(2);
                    expect(content == '0.23').toBe(true);
                    content = chartObj.primaryYAxis.zoomFactor.toFixed(2);
                    expect(content == '0.63').toBe(true);
                    chartObj.mouseLeave(trigger.onTouchLeave(areaElement, 748, 129, 304, 289, 304, 289));
                    done();
                };
                chartObj.loaded = loaded;
                chartObj.zoomSettings.enableSelectionZooming = true;
                chartObj.zoomSettings.enablePinchZooming = true;
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
