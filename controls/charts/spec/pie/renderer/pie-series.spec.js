define(["require", "exports", "@syncfusion/ej2-base", "../../../src/accumulation-chart/renderer/pie-series", "../../../src/accumulation-chart/accumulation", "../../../src/accumulation-chart/renderer/legend", "../../../src/common/utils/helper", "../../../src/accumulation-chart/renderer/dataLabel", "../../chart/base/data.spec", "../base/util.spec", "../../chart/base/events.spec", "../../common.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, pie_series_1, accumulation_1, legend_1, helper_1, dataLabel_1, data_spec_1, util_spec_1, events_spec_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    accumulation_1.AccumulationChart.Inject(pie_series_1.PieSeries, legend_1.AccumulationLegend, dataLabel_1.AccumulationDataLabel);
    describe('Accumulation Chart Control', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('Pie Series checking', function () {
            var ele;
            var slice;
            var loaded;
            var id = 'ej2container';
            var pieGroupId = id + 'SeriesGroup0';
            var sliceid = id + '_Series_0' + '_Point_';
            var slicepath;
            var y;
            var i = 0;
            var length;
            var pie;
            var points;
            var trigger = new events_spec_1.MouseEvents();
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: id });
                document.body.appendChild(ele);
                pie = new accumulation_1.AccumulationChart({
                    series: [
                        {
                            type: 'Pie',
                            dataLabel: { visible: false, name: 'text' },
                            dataSource: data_spec_1.piedata, animation: { enable: false }, xName: 'x', yName: 'y'
                        }
                    ], width: '600', height: '400', legendSettings: { visible: false }
                });
                pie.appendTo('#' + id);
            });
            afterAll(function () {
                pie.loaded = null;
                pie.destroy();
                helper_1.removeElement(id);
            });
            it('Default center of the pie segments', function (done) {
                pie.loaded = function () {
                    slice = helper_1.getElement(sliceid + 0);
                    slicepath = util_spec_1.getLocations(slice.getAttribute('d'));
                    expect(slicepath.center.x).toBe(300);
                    expect(slicepath.center.y).toBe(200);
                    done();
                };
                pie.refresh();
            });
            it('Customize the pie segment center values in percentage', function (done) {
                pie.loaded = function () {
                    slice = helper_1.getElement(sliceid + 0);
                    slicepath = util_spec_1.getLocations(slice.getAttribute('d'));
                    expect(slicepath.center.x).toBe(416);
                    expect(slicepath.center.y).toBe(124);
                    done();
                };
                pie.center.x = "70%";
                pie.center.y = "30%";
                pie.refresh();
            });
            it('Customize the pie segment center values in pixcel', function (done) {
                pie.loaded = function () {
                    slice = helper_1.getElement(sliceid + 0);
                    slicepath = util_spec_1.getLocations(slice.getAttribute('d'));
                    expect(slicepath.center.x).toBe(1010);
                    expect(slicepath.center.y).toBe(210);
                    done();
                };
                pie.center.x = "1000px";
                pie.center.y = "200px";
                pie.refresh();
            });
            it('Given center value and chart title', function (done) {
                pie.loaded = function () {
                    slice = helper_1.getElement(sliceid + 0);
                    slicepath = util_spec_1.getLocations(slice.getAttribute('d'));
                    expect(slicepath.center.x).toBe(310);
                    expect(slicepath.center.y == 52 || slicepath.center.y == 55).toBe(true);
                    done();
                };
                pie.title = 'Pie chart';
                pie.center.x = "300";
                pie.center.y = "25";
                pie.refresh();
            });
            it('Given center value and sub title', function (done) {
                pie.loaded = function () {
                    slice = helper_1.getElement(sliceid + 0);
                    slicepath = util_spec_1.getLocations(slice.getAttribute('d'));
                    expect(slicepath.center.x).toBe(310);
                    expect(slicepath.center.y == 91 || slicepath.center.y == 85).toBe(true);
                    done();
                };
                pie.subTitle = 'sub title';
                pie.center.x = "300";
                pie.center.y = "46.25";
                pie.refresh();
            });
            it('Center (0,0) with series bounds', function (done) {
                pie.loaded = function () {
                    var series = helper_1.getElement(id + '_SeriesCollection');
                    var width = series.getBoundingClientRect().width;
                    var height = series.getBoundingClientRect().height;
                    expect(width >= 276).toBe(true);
                    expect(height >= 276).toBe(true);
                    done();
                };
                pie.center.x = "0";
                pie.center.y = "0";
                pie.refresh();
            });
            it('Given center with legend', function (done) {
                pie.loaded = function () {
                    var legend = helper_1.getElement(id + '_chart_legend_g');
                    var width = legend.getBoundingClientRect().width;
                    var height = legend.getBoundingClientRect().height;
                    expect(width == 45 || width == 44).toBe(true);
                    expect(height == 258 || height == 248).toBe(true);
                    done();
                };
                pie.center.x = "95%";
                pie.center.y = "50%";
                pie.legendSettings.visible = true;
                pie.refresh();
            });
            it('Given center with Data label', function (done) {
                pie.loaded = function () {
                    var label = helper_1.getElement(id + '_datalabel_Series_0');
                    var totalLabel = label.childElementCount;
                    expect(totalLabel).toBe(3);
                    done();
                };
                pie.center.x = "0";
                pie.center.y = "0";
                pie.legendSettings.visible = false;
                pie.series[0].dataLabel.visible = true;
                pie.refresh();
            });
            it('Given center with smart labels', function (done) {
                pie.loaded = function () {
                    var label = helper_1.getElement(id + '_datalabel_Series_0');
                    var totalLabel = label.childElementCount;
                    expect(totalLabel).toBe(5);
                    done();
                };
                pie.center.x = "95%";
                pie.center.y = "50%";
                pie.legendSettings.visible = true;
                pie.series[0].dataLabel.visible = true;
                pie.enableSmartLabels = true;
                pie.refresh();
            });
            it('Given center with donut', function (done) {
                pie.loaded = function () {
                    slice = helper_1.getElement(sliceid + 0);
                    slicepath = util_spec_1.getLocations(slice.getAttribute('d'));
                    expect(slicepath.center.x).toBe(387);
                    expect(slicepath.center.y >= 144).toBe(true);
                    done();
                };
                pie.center.x = "65%";
                pie.center.y = "70%";
                pie.series[0].innerRadius = '50%';
                pie.legendSettings.visible = false;
                pie.series[0].dataLabel.visible = false;
                pie.enableSmartLabels = false;
                pie.refresh();
            });
            it('start angle alone', function (done) {
                pie.loaded = function () {
                    slice = helper_1.getElement(sliceid + 0);
                    slicepath = util_spec_1.getLocations(slice.getAttribute('d'));
                    expect(slicepath.center.x).toBe(300);
                    expect(slicepath.center.y).toBe(200);
                    done();
                };
                pie.title = '';
                pie.subTitle = '';
                pie.series[0].innerRadius = '0%';
                pie.center.x = "50%";
                pie.center.y = "50%";
                pie.series[0].startAngle = 90;
                pie.refresh();
            });
            it('total angle is 180 then start angle is 180 then center point Y is 75%', function (done) {
                pie.series[0].startAngle = 180;
                pie.series[0].endAngle = 360;
                pie.loaded = function () {
                    slice = helper_1.getElement(sliceid + 0);
                    slicepath = util_spec_1.getLocations(slice.getAttribute('d'));
                    expect(slicepath.center.x).toBe(376);
                    expect(slicepath.center.y).toBe(200);
                    done();
                };
                pie.refresh();
            });
            it('total angle is 180 then start angle is 0 then center point Y is 25%', function (done) {
                pie.series[0].startAngle = 0;
                pie.series[0].endAngle = 180;
                pie.loaded = function () {
                    slice = helper_1.getElement(sliceid + 0);
                    slicepath = util_spec_1.getLocations(slice.getAttribute('d'));
                    expect(slicepath.center.x).toBe(224);
                    expect(slicepath.center.y).toBe(200);
                    done();
                };
                pie.refresh();
            });
            it('total angle is 180 then start angle is 90 then center point X is 75%', function (done) {
                pie.series[0].startAngle = 90;
                pie.series[0].endAngle = 270;
                pie.loaded = function () {
                    slice = helper_1.getElement(sliceid + 0);
                    slicepath = util_spec_1.getLocations(slice.getAttribute('d'));
                    expect(slicepath.center.x).toBe(300);
                    expect(slicepath.center.y).toBe(124);
                    done();
                };
                pie.refresh();
            });
            it('total angle is 180 then start angle is 270 then center point X is 25%', function (done) {
                pie.series[0].startAngle = 270;
                pie.series[0].endAngle = 90;
                pie.loaded = function () {
                    slice = helper_1.getElement(sliceid + 0);
                    slicepath = util_spec_1.getLocations(slice.getAttribute('d'));
                    expect(slicepath.center.x).toBe(300);
                    expect(slicepath.center.y).toBe(276);
                    done();
                };
                pie.refresh();
            });
            it('start and end of the pie segments', function (done) {
                pie.series[0].startAngle = 0;
                pie.series[0].endAngle = 360;
                pie.loaded = function () {
                    slice = helper_1.getElement(sliceid + 0);
                    slicepath = util_spec_1.getLocations(slice.getAttribute('d'));
                    var angle = helper_1.getAngle(slicepath.center, slicepath.start);
                    expect(angle).toBe(269.9893826806963);
                    slice = helper_1.getElement(sliceid + 5);
                    slicepath = util_spec_1.getLocations(slice.getAttribute('d'));
                    angle = helper_1.getAngle(slicepath.center, slicepath.start);
                    expect(Math.round(angle)).toBe(13);
                    slice = helper_1.getElement(sliceid + 9);
                    slicepath = util_spec_1.getLocations(slice.getAttribute('d'));
                    angle = helper_1.getAngle(slicepath.center, slicepath.end);
                    expect(Math.round(angle)).toBe(270);
                    done();
                };
                pie.refresh();
            });
            it('start and end angle changing checking for pie segments', function (done) {
                pie.series[0].startAngle = 180;
                pie.series[0].endAngle = 90;
                pie.loaded = function () {
                    slice = helper_1.getElement(sliceid + 0);
                    slicepath = util_spec_1.getLocations(slice.getAttribute('d'));
                    var angle = helper_1.getAngle(slicepath.center, slicepath.start);
                    expect(angle).toBe(90);
                    slice = helper_1.getElement(sliceid + 9);
                    slicepath = util_spec_1.getLocations(slice.getAttribute('d'));
                    angle = helper_1.getAngle(slicepath.center, slicepath.end);
                    expect(Math.round(angle)).toBe(360);
                    done();
                };
                pie.refresh();
            });
            it('checking percentage value for slice', function (done) {
                pie.loaded = function (args) {
                    var point1 = args.accumulation.visibleSeries[0].points[0];
                    expect(point1.percentage != null).toBe(true);
                    expect(point1.percentage).toBe(3.07);
                    done();
                };
                pie.refresh();
            });
            it('checking club point wiht value mode', function (done) {
                pie.series[0].startAngle = 0;
                pie.series[0].endAngle = 360;
                pie.series[0].groupTo = '30';
                pie.loaded = function (args) {
                    var points = args.accumulation.visibleSeries[0].points;
                    expect(points.length).toBe(8);
                    done();
                };
                pie.refresh();
            });
            it('checking  doughnut border with mousemove', function (done) {
                pie.series[0].innerRadius = "50%";
                pie.refresh();
                pie.loaded = function (args) {
                    var pointEle = helper_1.getElement(sliceid + 1);
                    trigger.mousemoveEvent(pointEle, 0, 0, 200, 200);
                    var seriousGroup = helper_1.getElement(pie.element.id + '_Series_' + 0);
                    var borderId = pie.element.id + 'PointHover_Border';
                    expect(seriousGroup.lastElementChild.getAttribute('opacity') === '1').toBe(true);
                    expect(seriousGroup.lastElementChild.getAttribute('id') === borderId).toBe(true);
                    done();
                };
                pie.refresh();
            });
            it('checking  doughnut border with mouseclick', function (done) {
                pie.loaded = function (args) {
                    var pointEle = helper_1.getElement(sliceid + 1);
                    trigger.clickEvent(pointEle);
                    var seriousGroup = helper_1.getElement(pie.element.id + '_Series_' + 0);
                    expect(seriousGroup.lastElementChild.getAttribute('id') === pie.element.id + 'PointHover_Border').toBe(true);
                    done();
                };
                pie.refresh();
            });
            it('checking  doughnut border with explode', function (done) {
                pie.loaded = function (args) {
                    var pointEle = helper_1.getElement(sliceid + 4);
                    trigger.clickEvent(pointEle);
                    var seriousGroup = helper_1.getElement(pie.element.id + '_Series_' + 0);
                    expect(seriousGroup.lastElementChild.getAttribute('id') === sliceid + (args.accumulation.visibleSeries[0].points.length - 1)).toBe(true);
                    done();
                };
                pie.series[0].explode = true;
                pie.series[0].explodeIndex = 3;
                pie.refresh();
            });
            it('checking  pie border with mousemove', function (done) {
                pie.series[0].innerRadius = '0';
                pie.refresh();
                pie.loaded = function (args) {
                    var pointEle = helper_1.getElement(sliceid + 1);
                    trigger.mousemoveEvent(pointEle, 0, 0, 200, 200);
                    var seriousGroup = helper_1.getElement(pie.element.id + '_Series_' + 0);
                    var borderId = pie.element.id + 'PointHover_Border';
                    expect(seriousGroup.lastElementChild.getAttribute('opacity') === '1').toBe(true);
                    expect(seriousGroup.lastElementChild.getAttribute('id') === borderId).toBe(true);
                    done();
                };
                pie.series[0].explode = false;
                pie.refresh();
            });
            it('checking  pie border with mouseclick', function (done) {
                pie.loaded = function (args) {
                    var pointEle = helper_1.getElement(sliceid + 1);
                    trigger.clickEvent(pointEle);
                    var seriousGroup = helper_1.getElement(pie.element.id + '_Series_' + 0);
                    expect(seriousGroup.lastElementChild.getAttribute('id') === pie.element.id + 'PointHover_Border').toBe(true);
                    done();
                };
                pie.refresh();
            });
            it('checking club point with point mode', function (done) {
                pie.series[0].startAngle = 0;
                pie.series[0].endAngle = 360;
                pie.series[0].groupTo = '3';
                pie.series[0].groupMode = 'Point';
                pie.loaded = function (args) {
                    var points = args.accumulation.visibleSeries[0].points;
                    expect(points.length).toBe(4);
                    done();
                };
                pie.refresh();
            });
            it('checking quarter angle', function (done) {
                pie.series[0].startAngle = 0;
                pie.series[0].endAngle = 90;
                pie.series[0].groupTo = '0';
                pie.series[0].groupMode = 'Value';
                pie.loaded = function (args) {
                    var points = args.accumulation.visibleSeries[0].points;
                    expect(points.length).toBe(10);
                    done();
                };
                pie.refresh();
            });
            it('checking quarter angle', function (done) {
                pie.series[0].startAngle = 90;
                pie.series[0].endAngle = 180;
                pie.series[0].groupTo = '0';
                pie.loaded = function (args) {
                    var points = args.accumulation.visibleSeries[0].points;
                    expect(points.length).toBe(10);
                    done();
                };
                pie.refresh();
            });
            it('checking quarter angle', function (done) {
                pie.series[0].startAngle = 180;
                pie.series[0].endAngle = 270;
                pie.series[0].groupTo = '0';
                pie.loaded = function (args) {
                    var points = args.accumulation.visibleSeries[0].points;
                    expect(points.length).toBe(10);
                    done();
                };
                pie.refresh();
            });
            it('checking quarter angle', function (done) {
                pie.series[0].startAngle = 270;
                pie.series[0].endAngle = 360;
                pie.series[0].groupTo = '0';
                pie.loaded = function (args) {
                    var points = args.accumulation.visibleSeries[0].points;
                    expect(points.length).toBe(10);
                    done();
                };
                pie.refresh();
            });
            it('checking lees than quarter angle', function (done) {
                pie.series[0].startAngle = 150;
                pie.series[0].endAngle = 230;
                pie.loaded = function (args) {
                    var points = args.accumulation.visibleSeries[0].points;
                    expect(points.length).toBe(10);
                    done();
                };
                pie.refresh();
            });
            it('checking pie bound', function (done) {
                pie.series[0].startAngle = 0;
                pie.series[0].endAngle = 360;
                pie.series[0].dataLabel.visible = true;
                pie.series[0].dataLabel.position = 'Outside';
                pie.loaded = function (args) {
                    var points = args.accumulation.visibleSeries[0].points;
                    expect(points.length).toBe(10);
                    done();
                };
                pie.refresh();
            });
            it('checking pie explode and deexplode', function (done) {
                pie.visibleSeries[0].explode = true;
                pie.visibleSeries[0].explodeIndex = 2;
                pie.loaded = function (args) {
                    slice = helper_1.getElement(sliceid + 2);
                    expect(slice.getAttribute('transform')).not.toBe(null);
                    slice = helper_1.getElement(sliceid + 0);
                    trigger.clickEvent(slice);
                    expect(slice.getAttribute('transform')).not.toBe(null);
                    slice = helper_1.getElement(sliceid + 2);
                    expect(slice.getAttribute('transform')).toBe('translate(0, 0)');
                    var label = helper_1.getElement(id + '_datalabel_Series_0_text_2');
                    trigger.clickEvent(label);
                    slice = helper_1.getElement(sliceid + 2);
                    expect(slice.getAttribute('transform')).toBe('translate(0, 0)');
                    done();
                };
                pie.enableAnimation = false;
                pie.refresh();
            });
            it('checking pie explode all', function (done) {
                pie.visibleSeries[0].explodeAll = true;
                pie.loaded = function (args) {
                    slice = helper_1.getElement(sliceid + 0);
                    expect(slice.getAttribute('transform')).not.toBe(null);
                    slice = helper_1.getElement(sliceid + 2);
                    expect(slice.getAttribute('transform').indexOf('translate(') > -1).toBe(true);
                    slice = helper_1.getElement(sliceid + 5);
                    expect(slice.getAttribute('transform')).not.toBe('');
                    done();
                };
                pie.refresh();
            });
            it('checking pie zero values', function (done) {
                pie.visibleSeries[0].explode = false;
                pie.loaded = function (args) {
                    slice = helper_1.getElement(sliceid + 1);
                    expect(slice).toBe(null);
                    slice = helper_1.getElement(sliceid + 4);
                    expect(slice).toBe(null);
                    done();
                };
                pie.series[0].dataSource = [
                    { x: 'Jan', y: 0 },
                    { x: 'Feb', y: 0 },
                    { x: 'March', y: 0 },
                    { x: 'April', y: 0 },
                    { x: 'May', y: 0 },
                    { x: 'June', y: 0 },
                    { x: 'July', y: 0 },
                ];
                pie.refresh();
            });
            it('checking pie empty points mode zero', function (done) {
                pie.visibleSeries[0].explode = false;
                pie.loaded = function (args) {
                    slice = helper_1.getElement(sliceid + 1);
                    expect(slice).not.toBe(null);
                    slice = helper_1.getElement(sliceid + 4);
                    expect(slice).not.toBe(null);
                    slice = helper_1.getElement(sliceid + 6);
                    expect(slice.getAttribute('fill')).toBe('lightgray');
                    expect(helper_1.getElement('ej2container_datalabel_Series_0_text_1').textContent).toBe('0');
                    expect(helper_1.getElement('ej2container_datalabel_Series_0_text_4').textContent).toBe('0');
                    expect(helper_1.getElement('ej2container_datalabel_Series_0_text_6').textContent).toBe('0');
                    done();
                };
                pie.series[0].dataSource = [
                    { x: 'Jan', y: 10 },
                    { x: 'Feb', y: null },
                    { x: 'March', y: 30 },
                    { x: 'April', y: 40 },
                    { x: 'May', y: null },
                    { x: 'June', y: 60 },
                    { x: 'July', y: null },
                ];
                pie.series[0].groupTo = null;
                pie.series[0].emptyPointSettings = { fill: 'lightgray', mode: 'Zero' };
                pie.refresh();
            });
            it('checking pie empty points mode average', function (done) {
                pie.visibleSeries[0].explode = false;
                pie.loaded = function (args) {
                    slice = helper_1.getElement(sliceid + 4);
                    var sliceOption = util_spec_1.getLocations(slice.getAttribute('d'));
                    expect(sliceOption.start.x.toFixed(0)).toBe('376');
                    expect(sliceOption.start.y.toFixed(0)).toBe('332');
                    slice = helper_1.getElement(sliceid + 4);
                    expect(slice).not.toBe(null);
                    expect(helper_1.getElement('ej2container_datalabel_Series_0_text_4').textContent).toBe('50');
                    done();
                };
                pie.series[0].emptyPointSettings = { fill: 'lightgray', mode: 'Average' };
                pie.refresh();
            });
            it('checking pie empty points mode Drop', function (done) {
                pie.visibleSeries[0].explode = false;
                pie.loaded = function (args) {
                    slice = helper_1.getElement(sliceid + 3);
                    var sliceOption = util_spec_1.getLocations(slice.getAttribute('d'));
                    expect(sliceOption.start.x.toFixed(0)).toBe('448');
                    expect(sliceOption.start.y.toFixed(0)).toBe('234');
                    slice = helper_1.getElement(sliceid + 4);
                    expect(slice.getAttribute('d')).toBe('');
                    expect(helper_1.getElement('ej2container_datalabel_Series_0_text_3').textContent).toBe('40');
                    done();
                };
                pie.series[0].emptyPointSettings = { fill: 'lightgray', mode: 'Drop' };
                pie.refresh();
            });
            it('checking pie slice with point color mapping', function (done) {
                pie.visibleSeries[0].explode = false;
                pie.loaded = function (args) {
                    slice = helper_1.getElement(sliceid + 0);
                    expect(slice.getAttribute('fill')).toBe('red');
                    slice = helper_1.getElement(sliceid + 1);
                    expect(slice.getAttribute('fill')).toBe('green');
                    slice = helper_1.getElement(sliceid + 2);
                    expect(slice.getAttribute('fill')).toBe('blue');
                    done();
                };
                pie.series[0].dataSource = data_spec_1.pieColorMapping;
                pie.series[0].pointColorMapping = 'color';
                pie.refresh();
            });
            it('checking datasource in pie', function (done) {
                pie.series[0].dataSource = null;
                pie.loaded = function (args) {
                    slice = helper_1.getElement(sliceid + 0);
                    expect(slice.getAttribute('d') != '').toBe(true);
                    done();
                };
                pie.dataSource = data_spec_1.piedata;
                pie.dataBind();
            });
            it('checking explode for club point with value mode', function (done) {
                pie.series[0].startAngle = 0;
                pie.series[0].endAngle = 360;
                pie.series[0].groupTo = '30';
                pie.series[0].explode = true;
                pie.series[0].explodeAll = false;
                pie.series[0].explodeIndex = 7;
                pie.enableAnimation = true;
                pie.loaded = function (args) {
                    setTimeout(function () {
                        var points = args.accumulation.visibleSeries[0].points;
                        expect(points.length).toBe(10);
                        expect(points[7].text).toBe('Bald Eagle : 18');
                        slice = helper_1.getElement(sliceid + 7);
                        expect(slice.getAttribute('transform')).not.toBe(null);
                        done();
                    }, 300);
                };
                pie.series[0].dataSource = data_spec_1.piedata;
                pie.refresh();
            });
            it('checking pie point changes for club point while explode', function (done) {
                pie.series[0].startAngle = 0;
                pie.series[0].endAngle = 360;
                pie.series[0].groupTo = '3';
                pie.series[0].groupMode = 'Point';
                pie.visibleSeries[0].explode = true;
                pie.visibleSeries[0].explodeAll = false;
                pie.enableAnimation = true;
                var execute = false;
                pie.loaded = function (args) {
                    if (execute === false) {
                        var points_1 = args.accumulation.visibleSeries[0].points;
                        slice = helper_1.getElement(sliceid + 3);
                        execute = true;
                        trigger.clickEvent(slice);
                        var legendEle = helper_1.getElement('ej2container_chart_legend_text_0');
                        trigger.clickEvent(legendEle);
                        pie.loaded = null;
                        expect(points_1).not.toBe(null);
                        done();
                    }
                    var points = args.accumulation.visibleSeries[0].points;
                    expect(points[3]).not.toBe(null);
                };
                pie.legendSettings.visible = true;
                pie.series[0].dataSource = data_spec_1.piedata;
                pie.refresh();
            });
            it('checking pie point changes for club point while deExplode', function (done) {
                pie.series[0].startAngle = 0;
                pie.series[0].endAngle = 360;
                pie.series[0].groupTo = '3';
                pie.series[0].groupMode = 'Point';
                pie.visibleSeries[0].explode = true;
                pie.visibleSeries[0].explodeAll = false;
                pie.enableAnimation = false;
                var execute = 0;
                pie.loaded = function (args) {
                    if (execute <= 1) {
                        slice = helper_1.getElement(sliceid + 3);
                        execute = execute + 1;
                        trigger.clickEvent(slice);
                    }
                    var points = args.accumulation.visibleSeries[0].points;
                    expect(points[3]).not.toBe(null);
                    done();
                };
                pie.series[0].dataSource = data_spec_1.piedata;
                pie.refresh();
            });
            it('Default slice radius checking', function (done) {
                pie.loaded = function (args) {
                    points = pie.visibleSeries[0].points;
                    slice = helper_1.getElement(sliceid + 0);
                    var width = slice.getBoundingClientRect().width;
                    expect(Math.round(width) == 29).toBe(true);
                    expect(points[0].sliceRadius == '80%').toBe(true);
                    slice = helper_1.getElement(sliceid + 1);
                    width = slice.getBoundingClientRect().width;
                    expect(Math.round(width) == 65).toBe(true);
                    expect(points[1].sliceRadius == '80%').toBe(true);
                    slice = helper_1.getElement(sliceid + 2);
                    width = slice.getBoundingClientRect().width;
                    expect(Math.round(width) == 105).toBe(true);
                    expect(points[2].sliceRadius == '80%').toBe(true);
                    done();
                };
                pie.series[0].groupTo = null;
                pie.visibleSeries[0].explode = false;
                pie.series[0].radius = '80%';
                pie.series[0].dataSource = data_spec_1.piedata;
                pie.refresh();
            });
            it('slice radius checking with radius mapping', function (done) {
                pie.loaded = function (args) {
                    points = pie.visibleSeries[0].points;
                    slice = helper_1.getElement(sliceid + 0);
                    var width = slice.getBoundingClientRect().width;
                    expect(Math.round(width) == 18).toBe(true);
                    expect(points[0].sliceRadius == '50%').toBe(true);
                    slice = helper_1.getElement(sliceid + 1);
                    width = slice.getBoundingClientRect().width;
                    expect(Math.round(width) == 49).toBe(true);
                    expect(points[1].sliceRadius == '60%').toBe(true);
                    slice = helper_1.getElement(sliceid + 2);
                    width = slice.getBoundingClientRect().width;
                    expect(Math.round(width) == 92).toBe(true);
                    expect(points[2].sliceRadius == '70%').toBe(true);
                    done();
                };
                pie.series[0].groupTo = null;
                pie.visibleSeries[0].explode = false;
                pie.series[0].radius = 'radius';
                pie.series[0].dataSource = data_spec_1.piedata;
                pie.refresh();
            });
            it('Various slice radius with inner radius', function (done) {
                pie.loaded = function (args) {
                    points = pie.visibleSeries[0].points;
                    slice = helper_1.getElement(sliceid + 0);
                    var width = slice.getBoundingClientRect().width;
                    expect(Math.round(width) == 18).toBe(true);
                    expect(points[0].sliceRadius == '50%').toBe(true);
                    slice = helper_1.getElement(sliceid + 1);
                    width = slice.getBoundingClientRect().width;
                    expect(Math.round(width) == 38).toBe(true);
                    expect(points[1].sliceRadius == '60%').toBe(true);
                    slice = helper_1.getElement(sliceid + 2);
                    width = slice.getBoundingClientRect().width;
                    expect(Math.round(width) == 67).toBe(true);
                    expect(points[2].sliceRadius == '70%').toBe(true);
                    done();
                };
                pie.series[0].groupTo = null;
                pie.visibleSeries[0].explode = false;
                pie.series[0].radius = 'radius';
                pie.series[0].innerRadius = '30%';
                pie.series[0].dataSource = data_spec_1.piedata;
                pie.refresh();
            });
        });
        describe('Pie data source update using button click event', function () {
            var ele;
            var btn;
            var id = 'container';
            var pie;
            var trigger = new events_spec_1.MouseEvents();
            var seriesGroupElement;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: id });
                ele.style.width = '500px';
                ele.style.height = '400px';
                ele.style.border = '1px solid red';
                btn = ej2_base_1.createElement('button', { id: 'btn' });
                btn.innerHTML = 'Change Data';
                document.body.appendChild(btn);
                document.body.appendChild(ele);
                pie = new accumulation_1.AccumulationChart({
                    series: [
                        {
                            dataSource: [
                                { x: 'Argentina', y: 505370, r: '100' },
                                { x: 'Belgium', y: 551500, r: '118.7' },
                                { x: 'Cuba', y: 312685, r: '124.6' },
                                { x: 'Dominican Republic', y: 350000, r: '137.5' },
                                { x: 'Egypt', y: 301000, r: '150.8' },
                                { x: 'Kazakhstan', y: 300000, r: '155.5' },
                                { x: 'Somalia', y: 357022, r: '160.6' }
                            ],
                            dataLabel: {
                                visible: true
                            },
                            xName: 'x',
                            yName: 'y',
                            animation: { enable: false }
                        },
                    ],
                    enableSmartLabels: true,
                    tooltip: { enable: false },
                });
                pie.appendTo('#' + id);
                document.getElementById('btn').onclick = function () {
                    pie.series[0].dataSource = [
                        { x: 'Argentina', y: 505, r: '100' },
                        { x: 'Belgium', y: 551, r: '118.7' },
                        { x: 'Cuba', y: 312, r: '124.6' },
                        { x: 'Dominican Republic', y: 350, r: '137.5' },
                    ];
                };
            });
            afterAll(function () {
                pie.loaded = null;
                pie.destroy();
                helper_1.removeElement(id);
                helper_1.removeElement(btn);
            });
            it('Initial datasource checking', function (done) {
                pie.loaded = function () {
                    seriesGroupElement = helper_1.getElement('container_Series_0');
                    expect(seriesGroupElement.childElementCount === 7).toBe(true);
                    done();
                };
                pie.refresh();
            });
            it('Data source is changed using button click event', function (done) {
                pie.loaded = function () {
                    seriesGroupElement = helper_1.getElement('container_Series_0');
                    expect(seriesGroupElement.childElementCount === 4).toBe(true);
                    done();
                };
                trigger.clickEvent(btn);
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
