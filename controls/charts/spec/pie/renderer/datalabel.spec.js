define(["require", "exports", "@syncfusion/ej2-base", "../../../src/accumulation-chart/renderer/pie-series", "../../../src/accumulation-chart/accumulation", "../../../src/accumulation-chart/renderer/legend", "../../../src/common/utils/helper", "../../../src/accumulation-chart/renderer/dataLabel", "../../chart/base/data.spec", "../../../src/accumulation-chart/renderer/pyramid-series", "../../chart/base/events.spec", "../../common.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, pie_series_1, accumulation_1, legend_1, helper_1, dataLabel_1, data_spec_1, pyramid_series_1, events_spec_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    accumulation_1.AccumulationChart.Inject(pie_series_1.PieSeries, legend_1.AccumulationLegend, dataLabel_1.AccumulationDataLabel, pyramid_series_1.PyramidSeries);
    describe('Accumulation Chart Control', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('Data Label checking for the pie doughnut series', function () {
            var ele;
            var slice;
            var loaded;
            var id = 'ej2container';
            var pieGroupId = id + 'SeriesGroup0';
            var sliceid = id + '_Series_0' + '_Point_';
            var slicepath;
            var datalabel;
            var legendId = id + '_chart_legend_text_';
            var y;
            var labelId = id + '_datalabel_Series_0_text_';
            var shapeId = id + '_datalabel_Series_0_shape_';
            var connectorId = id + '_datalabel_Series_0_connector_';
            var i = 0;
            var j = 0;
            var overlap;
            var variousPie = [
                { y: 18, x: 1, name: 'Bald Eagle', text: 'Bald Eagle : 18', radius: '50%' }, { y: 23, x: 2, name: 'Bison', text: 'Bison : 23', radius: '60%' },
                { y: 30, x: 3, name: 'Brown Bear', text: 'Brown Bear : 30', radius: '70%' }, { y: 44, x: 4, name: 'Elk', text: 'Elk : 44', radius: '100%' },
                { y: 52, x: 5, name: 'Pronghorn', text: 'Pronghorn : 52', radius: '80%' }, { y: 62, x: 6, name: 'Turkey', text: 'Turkey : 62', radius: '80%' },
                { y: 74, x: 7, name: 'Alligator', text: 'Alligator : 74', radius: '80%' }, { y: 85, x: 8, name: 'Prairie Dog', text: 'Prairie Dog : 85', radius: '80%' },
                { y: 96, x: 9, name: 'Mountain Lion', text: 'Mountain Lion : 96', radius: '80%' }, { y: 102, x: 10, name: 'Beaver', text: 'Beaver : 102', radius: '80%' }
            ];
            var accumulation;
            var points;
            var trigger = new events_spec_1.MouseEvents();
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: id });
                var template = ej2_base_1.createElement('div', { id: 'template', styles: 'display: none;' });
                document.body.appendChild(template);
                template.innerHTML = '<div>80</div>';
                var template1 = ej2_base_1.createElement('div', { id: 'template1', styles: 'display: none;' });
                document.body.appendChild(template1);
                template1.innerHTML = '<div>${point.y}</div>';
                var template2 = ej2_base_1.createElement('div', { id: 'template2', styles: 'display: none;' });
                document.body.appendChild(template2);
                template2.innerHTML = '<div>${point.label}</div>';
                document.body.appendChild(ele);
                accumulation = new accumulation_1.AccumulationChart({
                    title: 'Datalabel Spec',
                    enableSmartLabels: false,
                    series: [
                        {
                            type: 'Pie',
                            dataLabel: { visible: false, name: 'text' },
                            dataSource: data_spec_1.piedata, animation: { enable: false }, xName: 'x', yName: 'y'
                        }
                    ], width: '600', height: '400', legendSettings: { visible: true }
                });
                accumulation.appendTo('#' + id);
            });
            afterAll(function () {
                accumulation.destroy();
                helper_1.removeElement(id);
                helper_1.removeElement('template');
                helper_1.removeElement('template1');
            });
            it('Datalabel visibility false checking', function (done) {
                accumulation.loaded = function (args) {
                    datalabel = document.getElementById(id + '_datalabel_Series_0');
                    expect(datalabel).toBe(null);
                    done();
                };
                accumulation.refresh();
            });
            it('Datalabel visibility visible checking', function (done) {
                accumulation.loaded = function (args) {
                    datalabel = document.getElementById(id + '_datalabel_Series_0');
                    expect(datalabel.childNodes.length).toBe(10);
                    done();
                };
                accumulation.series[0].dataLabel.visible = true;
                accumulation.refresh();
            });
            it('Datalabel common options', function (done) {
                accumulation.loaded = function (args) {
                    datalabel = helper_1.getElement(labelId + 1);
                    expect(datalabel.getAttribute('fill')).toBe('#ffffff');
                    expect(datalabel.getAttribute('font-size')).toBe('18px');
                    expect(datalabel.getAttribute('font-family')).toBe('courier');
                    expect(datalabel.getAttribute('font-style')).toBe('italic');
                    expect(datalabel.getAttribute('font-weight')).toBe('bold');
                    datalabel = helper_1.getElement(shapeId + 1);
                    expect(datalabel.getAttribute('fill')).toBe('blue');
                    expect(datalabel.getAttribute('stroke')).toBe('red');
                    expect(datalabel.getAttribute('stroke-width')).toBe('2');
                    expect(datalabel.getAttribute('rx')).toBe('5');
                    expect(datalabel.getAttribute('ry')).toBe('5');
                    done();
                };
                accumulation.series[0].dataLabel = {
                    border: { color: 'red', width: 2 }, fill: 'blue', rx: 5, ry: 5,
                    font: {
                        color: '#ffffff',
                        size: '18px',
                        fontFamily: 'courier',
                        fontStyle: 'italic',
                        fontWeight: 'bold'
                    }
                };
                accumulation.refresh();
            });
            it('Datalabel Inside checking', function (done) {
                accumulation.loaded = function (args) {
                    points = accumulation.visibleSeries[0].points;
                    expect(helper_1.withInBounds(points[3].labelRegion.x, points[3].labelRegion.y, accumulation.visibleSeries[0].accumulationBound, points[3].labelRegion.width, points[3].labelRegion.height)).toBe(true);
                    done();
                };
                accumulation.series[0].dataLabel.position = 'Inside';
                accumulation.refresh();
            });
            it('Datalabel Outside checking', function (done) {
                accumulation.loaded = function (args) {
                    datalabel = document.getElementById(connectorId + 0);
                    expect(datalabel).not.toBe(null);
                    done();
                };
                accumulation.series[0].dataLabel.position = 'Outside';
                accumulation.refresh();
            });
            it('Datalabel Outside connector line length', function () {
                var path = document.getElementById(connectorId + 3).getAttribute('d').split(' ');
                var start = new helper_1.ChartLocation(+path[1], +path[2]);
                var end = new helper_1.ChartLocation(+path[7], +path[8]);
                expect(data_spec_1.getDistance(start, end)).toBeGreaterThan(10);
            });
            it('Datalabel Outside connector dasharray', function (done) {
                accumulation.loaded = function (args) {
                    datalabel = document.getElementById(connectorId + 0);
                    expect(datalabel.getAttribute('stroke-dasharray') === '5,3').toBe(true);
                    done();
                };
                accumulation.series[0].dataLabel.connectorStyle.dashArray = '5,3';
                accumulation.refresh();
            });
            it('Datalabel angle checking', function (done) {
                accumulation.loaded = function (args) {
                    datalabel = document.getElementById(labelId + 0);
                    expect(datalabel.getAttribute('labelRotation') === '45').toBe(true);
                    done();
                };
                accumulation.series[0].dataLabel.angle = 45;
                accumulation.refresh();
            });
            it('Datalabel angle checking with enable rotation', function (done) {
                accumulation.loaded = function (args) {
                    datalabel = document.getElementById(labelId + 0);
                    expect(datalabel.getAttribute('labelRotation') !== null).toBe(true);
                    done();
                };
                accumulation.series[0].dataLabel.enableRotation = true;
                accumulation.refresh();
            });
            it('Datalabel checking for click on a legend point', function (done) {
                accumulation.loaded = function (args) {
                    points = accumulation.visibleSeries[0].points;
                    accumulation.loaded = null;
                    trigger.clickEvent(helper_1.getElement(legendId + 2));
                    expect(points[2].labelRegion).toBe(null);
                    done();
                };
                accumulation.series[0].dataLabel.connectorStyle.dashArray = '';
                accumulation.refresh();
            });
            it('Datalabel Inside Smart Labels checking with title bound', function (done) {
                accumulation.loaded = function (args) {
                    points = args.accumulation.visibleSeries[0].points;
                    expect(helper_1.isOverlap(points[0].labelRegion, points[5].labelRegion)).toBe(false);
                    expect(helper_1.isOverlap(points[0].labelRegion, accumulation.accumulationDataLabelModule.titleRect)).toBe(false);
                    done();
                };
                accumulation.enableSmartLabels = true;
                accumulation.series[0].dataLabel.position = 'Inside';
                accumulation.refresh();
            });
            it('Datalabel Outside Smart Labels checking with title bound', function (done) {
                accumulation.loaded = function (args) {
                    points = args.accumulation.visibleSeries[0].points;
                    expect(helper_1.isOverlap(points[2].labelRegion, points[5].labelRegion)).toBe(false);
                    expect(helper_1.isOverlap(points[2].labelRegion, accumulation.accumulationDataLabelModule.titleRect)).toBe(false);
                    done();
                };
                accumulation.series[0].dataLabel.position = 'Outside';
                accumulation.refresh();
            });
            it('Datalabel trimmed label mouse move tooltip', function () {
                datalabel = helper_1.getElement(labelId + 4);
                trigger.mousemoveEvent(datalabel, 0, 0, 530, 210);
                var tooltip = helper_1.getElement('ej2container_EJ2_Datalabel_Tooltip');
                expect(tooltip).not.toBe(null);
                expect(tooltip.textContent).toBe('Pronghorn : 52');
                datalabel = helper_1.getElement(labelId + 0);
                trigger.mousemoveEvent(datalabel, 0, 0, 400, 70);
                expect(helper_1.getElement('ej2container_EJ2_Datalabel_Tooltip')).toBe(null);
                datalabel = helper_1.getElement(labelId + 4);
                accumulation.accumulationMouseEnd(trigger.onTouchEnd(datalabel, 0, 0, 210, 480, 210, 480));
                tooltip = helper_1.getElement('ej2container_EJ2_Datalabel_Tooltip');
                expect(tooltip).not.toBe(null);
                expect(tooltip.textContent).toBe('Pronghorn : 52');
                helper_1.removeElement('ej2container_EJ2_Datalabel_Tooltip');
            });
            it('Datalabel connector length and smart label visible', function (done) {
                accumulation.loaded = function (args) {
                    datalabel = document.getElementById(connectorId + 2);
                    expect(datalabel).not.toBe(null);
                    datalabel = document.getElementById(connectorId + 0);
                    expect(datalabel).toBe(null);
                    done();
                };
                accumulation.series[0].dataLabel.position = 'Outside';
                accumulation.series[0].dataLabel.connectorStyle = { length: '40px' };
                accumulation.refresh();
            });
            it('Datalabel animation', function (done) {
                accumulation.loaded = function (args) {
                    datalabel = document.getElementById(connectorId + 2);
                    expect(datalabel).not.toBe(null);
                    datalabel = document.getElementById(connectorId + 0);
                    expect(datalabel).toBe(null);
                    done();
                };
                accumulation.series[0].dataLabel.connectorStyle = { length: '10px' };
                accumulation.series[0].animation.enable = true;
                accumulation.series[0].radius = '100%';
                accumulation.refresh();
            });
            it('Datalabel color saturation checking', function (done) {
                accumulation.loaded = function (args) {
                    datalabel = helper_1.getElement(labelId + 2);
                    expect(datalabel.getAttribute('fill')).toBe('white');
                    datalabel = helper_1.getElement(labelId + 0);
                    expect(datalabel.getAttribute('fill')).toBe('black');
                    done();
                };
                accumulation.series[0].dataLabel = {
                    position: 'Inside',
                    visible: true,
                    fill: 'transparent',
                    border: {
                        width: null,
                        color: null
                    },
                    font: {
                        color: null,
                        size: '12px'
                    }
                };
                accumulation.background = 'black';
                accumulation.series[0].animation.enable = false;
                accumulation.series[0].radius = '60%';
                accumulation.refresh();
            });
            it('checking text render event', function (done) {
                accumulation.loaded = function (args) {
                    var element = document.getElementById('ej2container_datalabel_Series_0_shape_1');
                    expect(+element.getAttribute('stroke-width')).toEqual(2);
                    element = document.getElementById('ej2container_datalabel_Series_0_shape_2');
                    expect(element.getAttribute('stroke-width')).toEqual('null');
                    done();
                };
                accumulation.pointRender = null;
                accumulation.textRender = function (args) {
                    if (args.point.index === 1) {
                        args.border.color = 'red';
                        args.border.width = 2;
                    }
                };
                accumulation.refresh();
            });
            it('Checking font color change using text render event', function (done) {
                accumulation.loaded = function (args) {
                    var textElement = document.getElementById('ej2container_datalabel_Series_0_text_1');
                    expect(textElement.getAttribute('fill')).toEqual('green');
                    expect(textElement.getAttribute('font-size')).toEqual('15px');
                    expect(textElement.getAttribute('font-style')).toEqual('bold');
                    expect(textElement.getAttribute('font-family')).toEqual('Segoe UI');
                    expect(textElement.getAttribute('font-weight')).toEqual('400');
                    textElement = document.getElementById('ej2container_datalabel_Series_0_text_2');
                    expect(textElement.getAttribute('fill')).toEqual('red');
                    done();
                };
                accumulation.pointRender = null;
                accumulation.series[0].dataLabel = {
                    position: 'Inside',
                    visible: true,
                    name: 'text',
                    font: {
                        color: 'red',
                        size: '12px',
                    }
                };
                accumulation.textRender = function (args) {
                    if (args.text.indexOf('Bison : 23') > -1) {
                        args.font.color = 'green';
                        args.font.size = '15px';
                        args.font.fontStyle = 'bold';
                        args.font.fontWeight = '400';
                        args.font.fontFamily = 'Segoe UI',
                            args.color = 'yellow';
                        args.border.width = 1;
                        args.border.color = 'blue';
                    }
                };
                accumulation.refresh();
            });
            it('checking elements counts without using template', function (done) {
                accumulation.loaded = function (args) {
                    var element = document.getElementById('ej2container_datalabel_Series_0_text_0');
                    expect(element != null).toBe(true);
                    element = document.getElementById('ej2container_Secondary_Element');
                    expect(element.childElementCount).toBe(0);
                    done();
                };
                accumulation.textRender = null;
                accumulation.background = 'transparent';
                accumulation.series[0].dataLabel.font.color = 'black';
                accumulation.series[0].animation.enable = false;
                accumulation.series[0].dataLabel.visible = true;
                accumulation.refresh();
            });
            it('checking elements counts with using template without element', function (done) {
                accumulation.loaded = function (args) {
                    var element = document.getElementById('ej2container_datalabel_Series_0_text_4');
                    expect(element).toBe(null);
                    element = document.getElementById('ej2container_Secondary_Element');
                    expect(element.childElementCount).toBe(0);
                    element = document.getElementById('ej2container_Series_0_DataLabelCollections');
                    expect(element).toBe(null);
                    done();
                };
                accumulation.series[0].dataLabel.template = 'label';
                accumulation.refresh();
            });
            it('checking elements counts and datalabel with using template as html string', function (done) {
                accumulation.loaded = function (args) {
                    var element = document.getElementById('ej2container_datalabel_Series_0_text_4');
                    expect(element).toBe(null);
                    element = document.getElementById('ej2container_Secondary_Element');
                    expect(element.childElementCount).toBe(1);
                    expect(element.children[0].id).toBe('ej2container_Series_0_DataLabelCollections');
                    element = document.getElementById('ej2container_Series_0_DataLabelCollections');
                    expect(element.childElementCount).toBe(10);
                    element = document.getElementById('ej2container_Series_0_DataLabel_5');
                    expect(element.children[0].innerHTML).toBe('62');
                    done();
                };
                accumulation.series[0].dataLabel.template = '<div>${point.y}</div>';
                accumulation.refresh();
            });
            it('checking template as point x value and cheecking style', function (done) {
                accumulation.loaded = function (args) {
                    var element = document.getElementById('ej2container_Series_0_DataLabel_1');
                    expect(element.children[0].innerHTML).toBe('2 : 23');
                    expect(element.style.backgroundColor).toBe('red');
                    expect(element.style.color).toBe('white');
                    done();
                };
                accumulation.series[0].dataLabel.fill = 'red';
                accumulation.series[0].dataLabel.font.color = null;
                accumulation.series[0].dataLabel.template = '<div>${point.x} : ${point.y}</div>';
                accumulation.refresh();
            });
            it('checking template using script element', function (done) {
                accumulation.loaded = function (args) {
                    var element = document.getElementById('ej2container_Series_0_DataLabel_1');
                    expect(element.children[0].innerHTML).toBe('80');
                    expect(element.style.backgroundColor).toBe('red');
                    expect(element.style.color).toBe('white');
                    done();
                };
                accumulation.series[0].dataLabel.template = '#template';
                accumulation.refresh();
            });
            it('checking template using script element as format', function (done) {
                accumulation.loaded = function (args) {
                    var element = document.getElementById('ej2container_datalabel_Series_0_text_4');
                    expect(element).toBe(null);
                    element = document.getElementById('ej2container_Secondary_Element');
                    expect(element.childElementCount).toBe(1);
                    expect(element.children[0].id).toBe('ej2container_Series_0_DataLabelCollections');
                    element = document.getElementById('ej2container_Series_0_DataLabelCollections');
                    expect(element.childElementCount).toBe(10);
                    element = document.getElementById('ej2container_Series_0_DataLabel_5');
                    expect(element.children[0].innerHTML).toBe('62');
                    done();
                };
                accumulation.series[0].dataLabel.template = '#template1';
                accumulation.series[0].animation.enable = true;
                accumulation.refresh();
            });
            it('Pie series Datalabel count with radius mapping(Datalabel inside)', function (done) {
                accumulation.loaded = function (args) {
                    var element = document.getElementById('ej2container_datalabel_Series_0');
                    expect(element.childElementCount == 10).toBe(true);
                    done();
                };
                accumulation.series[0].dataLabel = {
                    visible: true, position: 'Inside'
                };
                accumulation.series[0].dataSource = variousPie;
                accumulation.series[0].radius = 'radius';
                accumulation.enableSmartLabels = false;
                accumulation.refresh();
            });
            it('Donut series Datalabel count with radius mapping(Datalabel inside)', function (done) {
                accumulation.loaded = function (args) {
                    var element = document.getElementById('ej2container_datalabel_Series_0');
                    expect(element.childElementCount == 10).toBe(true);
                    done();
                };
                accumulation.series[0].dataLabel = {
                    visible: true, position: 'Inside'
                };
                accumulation.series[0].dataSource = data_spec_1.piedata;
                accumulation.series[0].radius = 'radius';
                accumulation.series[0].innerRadius = '30%';
                accumulation.enableSmartLabels = false;
                accumulation.refresh();
            });
            it('Pie series Datalabel count with radius mapping(Datalabel outside)', function (done) {
                accumulation.loaded = function (args) {
                    var element = document.getElementById('ej2container_datalabel_Series_0');
                    expect(element.childElementCount == 10).toBe(true);
                    done();
                };
                accumulation.series[0].dataLabel = {
                    visible: true, position: 'Outside'
                };
                accumulation.series[0].dataSource = data_spec_1.piedata;
                accumulation.series[0].radius = 'radius';
                accumulation.enableSmartLabels = false;
                accumulation.refresh();
            });
            it('Donut series Datalabel count with radius mapping(Datalabel outside)', function (done) {
                accumulation.loaded = function (args) {
                    var element = document.getElementById('ej2container_datalabel_Series_0');
                    expect(element.childElementCount == 10).toBe(true);
                    done();
                };
                accumulation.series[0].dataLabel = {
                    visible: true, position: 'Outside'
                };
                accumulation.series[0].dataSource = variousPie;
                accumulation.series[0].radius = 'radius';
                accumulation.series[0].innerRadius = '30%';
                accumulation.enableSmartLabels = false;
                accumulation.refresh();
            });
            it('Pie series smart label with radius mapping(Datalabel outside)', function (done) {
                accumulation.loaded = function (args) {
                    var element = document.getElementById('ej2container_datalabel_Series_0');
                    expect(element.childElementCount == 10).toBe(true);
                    done();
                };
                accumulation.series[0].dataLabel = {
                    visible: true, position: 'Outside'
                };
                accumulation.series[0].dataSource = variousPie;
                accumulation.series[0].radius = 'radius';
                accumulation.enableSmartLabels = true;
                accumulation.refresh();
            });
            it('Donut series smart label with radius mapping(Datalabel outside)', function (done) {
                accumulation.loaded = function (args) {
                    var element = document.getElementById('ej2container_datalabel_Series_0');
                    expect(element.childElementCount == 10).toBe(true);
                    done();
                };
                accumulation.series[0].dataLabel = {
                    visible: true, position: 'Outside'
                };
                accumulation.series[0].dataSource = variousPie;
                accumulation.series[0].radius = 'radius';
                accumulation.series[0].innerRadius = '30%';
                accumulation.enableSmartLabels = true;
                accumulation.refresh();
            });
            it('Datalabel bounds check with radius mapping', function (done) {
                accumulation.loaded = function (args) {
                    points = accumulation.visibleSeries[0].points;
                    expect(helper_1.withInBounds(points[0].labelRegion.x, points[0].labelRegion.y, accumulation.visibleSeries[0].accumulationBound, points[0].labelRegion.width, points[0].labelRegion.height)).toBe(true);
                    done();
                };
                accumulation.series[0].dataSource = variousPie;
                accumulation.series[0].dataLabel.position = 'Inside';
                accumulation.series[0].radius = 'radius';
                accumulation.series[0].innerRadius = '30%';
                accumulation.refresh();
            });
            it('Checking datalabel text after enable group separator', function (done) {
                accumulation.loaded = function (args) {
                    var element = document.getElementById('ej2container_datalabel_Series_0_text_0');
                    expect(element.textContent).toEqual('18,000');
                    var element1 = document.getElementById('ej2container_datalabel_Series_0_text_1');
                    expect(element1.textContent).toEqual('feb: 10000');
                    var element2 = document.getElementById('ej2container_datalabel_Series_0_text_3');
                    expect(element2.textContent).toEqual('70,000');
                    done();
                };
                accumulation.series = [
                    {
                        dataSource: [{ x: 'Labour', y: 18000 }, { x: 'Legal', y: 8000, text: 'feb: 10000' },
                            { x: 'Production', y: 15000 }, { x: 'License', y: 11000, text: '70000' },
                            { x: 'Facilities', y: 18000 }, { x: 'Taxes', y: 14000 },
                            { x: 'Insurance', y: 16000 }],
                        dataLabel: {
                            visible: true,
                            name: 'text',
                            position: 'Inside',
                            font: {
                                fontWeight: '600',
                                color: '#ffffff'
                            },
                        },
                        radius: '70%', xName: 'x',
                        yName: 'y', startAngle: 0,
                        endAngle: 360, innerRadius: '40%', name: 'Project',
                        explode: true, explodeOffset: '10%', explodeIndex: 3,
                    }
                ];
                accumulation.useGroupingSeparator = true;
                accumulation.refresh();
            });
            it('Checking datalabel text after enable group separator with template', function (done) {
                accumulation.loaded = function (args) {
                    var element = document.getElementById('ej2container_Series_0_DataLabel_0');
                    expect(element.children[0].innerHTML).toBe('18,000');
                    done();
                };
                accumulation.series[0].dataSource = [{ x: 'Labour', y: 18000 }, { x: 'Legal', y: 8000, text: 'feb: 10000' },
                    { x: 'Production', y: 15000 }, { x: 'License', y: 11000, text: '70000' },
                    { x: 'Facilities', y: 18000 }, { x: 'Taxes', y: 14000 },
                    { x: 'Insurance', y: 16000 }];
                accumulation.useGroupingSeparator = true;
                accumulation.series[0].dataLabel.template = '#template2';
                accumulation.refresh();
            });
        });
        describe('Data label with dynamic changing legend', function () {
            var ele;
            var id = 'ej2-container';
            var accumulation;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: id });
                document.body.appendChild(ele);
                accumulation = new accumulation_1.AccumulationChart({
                    series: [
                        {
                            type: 'Pie',
                            dataLabel: {
                                visible: true,
                                font: { color: '#636363', size: '12px' },
                                name: "text",
                                position: "Outside"
                            },
                            dataSource: [
                                { x: "Industrial", y: 554.1, text: "554  defect(s)" },
                                { x: "Engineering & Non-Residential", y: 539.1, text: "539  defect(s)" },
                                { x: "Commercial", y: 465.9, text: "466  defect(s)" },
                                { x: "Residential (New & Renovations)", y: 348.3, text: "348  defect(s)" },
                                { x: "Institutional", y: 241.2, text: "241  defect(s)" },
                                { x: "Highway", y: 207, text: "207  defect(s)" },
                                { x: "Industrial", y: 554.1, text: "554  defect(s)" },
                                { x: "Engineering & Non-Residential", y: 539.1, text: "539  defect(s)" },
                                { x: "Commercial", y: 465.9, text: "466  defect(s)" },
                                { x: "Residential (New & Renovations)", y: 348.3, text: "348  defect(s)" },
                                { x: "Institutional", y: 241.2, text: "241  defect(s)" },
                                { x: "Highway", y: 207, text: "207  defect(s)" },
                                { x: "Industrial", y: 554.1, text: "554  defect(s)" },
                                { x: "Engineering & Non-Residential", y: 539.1, text: "539  defect(s)" },
                                { x: "Commercial", y: 465.9, text: "466  defect(s)" },
                                { x: "Residential (New & Renovations)", y: 348.3, text: "348  defect(s)" },
                                { x: "Institutional", y: 241.2, text: "241  defect(s)" },
                                { x: "Highway", y: 207, text: "207  defect(s)" }
                            ],
                            animation: { enable: false },
                            xName: 'x', yName: 'y',
                        }
                    ],
                    center: { x: '50%', y: '50%' },
                    width: '400', height: '400', legendSettings: {
                        title: 'Conditional Range Mode',
                        visible: false,
                        toggleVisibility: true,
                        position: 'Left',
                        enablePages: false,
                        alignment: 'Center',
                        mode: 'Series', padding: 10, shapePadding: 8, shapeHeight: 12, shapeWidth: 12
                    }
                });
                accumulation.appendTo('#' + id);
            });
            afterAll(function () {
                accumulation.accumulationLegendModule.destroy();
                accumulation.destroy();
                accumulation.loaded = null;
                helper_1.removeElement(id);
            });
            it('Checking datalabel text without legend', function (done) {
                accumulation.loaded = function (args) {
                    var element = document.getElementById('ej2-container_datalabel_Series_0_text_13');
                    expect(element != null).toBe(true);
                    done();
                };
                accumulation.refresh();
            });
            it('Checking datalabel text after enable legend', function (done) {
                accumulation.loaded = function (args) {
                    var element = document.getElementById('ej2-container_datalabel_Series_0_text_13');
                    expect(element == null).toBe(true);
                    done();
                };
                accumulation.legendSettings.visible = true;
                accumulation.refresh();
            });
            it('Checking datalabel text after disble legend', function (done) {
                accumulation.loaded = function (args) {
                    var element = document.getElementById('ej2-container_datalabel_Series_0_text_13');
                    expect(element != null).toBe(true);
                    done();
                };
                accumulation.legendSettings.visible = false;
                accumulation.refresh();
            });
            it('Checking datalabel text and legend position left and pyrmaid series', function (done) {
                accumulation.loaded = function (args) {
                    var element = document.getElementById('ej2-container_datalabel_Series_0_text_0');
                    expect(element.textContent == "55...").toBe(true);
                    done();
                };
                accumulation.legendSettings.visible = true;
                accumulation.legendSettings.position = 'Left';
                accumulation.series[0].type = 'Pyramid';
                accumulation.refresh();
            });
        });
        it('memory leak', function () {
            common_spec_1.profile.sample();
            var average = common_spec_1.inMB(common_spec_1.profile.averageChange);
            expect(average).toBeLessThan(10);
            var memory = common_spec_1.inMB(common_spec_1.getMemoryProfile());
            expect(memory).toBeLessThan(common_spec_1.profile.samples[0] + 0.25);
        });
        describe('Checking RTL Behaviour for datalabel', function () {
            var ele;
            var id = 'ej2-container';
            var textEle;
            var dataLableId = id + '_datalabel_Series_0_text_0';
            var accumulation;
            var anchor;
            var loaded;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: id });
                document.body.appendChild(ele);
                accumulation = new accumulation_1.AccumulationChart({
                    border: { width: 1, color: 'blue' },
                    series: [
                        {
                            type: 'Pie',
                            dataSource: data_spec_1.piedata, animation: { enable: false }, xName: 'x', yName: 'y',
                            dataLabel: { visible: true, position: 'Outside' }
                        }
                    ],
                    width: '600',
                    height: '400',
                    legendSettings: { visible: false },
                });
                accumulation.appendTo('#' + id);
            });
            afterAll(function () {
                accumulation.loaded = null;
                accumulation.destroy();
                helper_1.removeElement(id);
            });
            it('Default dataLabel anchor', function (done) {
                loaded = function (args) {
                    textEle = helper_1.getElement(dataLableId);
                    anchor = textEle.getAttribute('text-anchor');
                    expect(anchor === 'start').toBe(true);
                    done();
                };
                accumulation.loaded = loaded;
                accumulation.refresh();
            });
            it('DataLabel anchor With RTL', function (done) {
                loaded = function (args) {
                    textEle = helper_1.getElement(dataLableId);
                    anchor = textEle.getAttribute('text-anchor');
                    expect(anchor === 'end').toBe(true);
                    done();
                };
                accumulation.loaded = loaded;
                accumulation.enableRtl = true;
                accumulation.refresh();
            });
        });
    });
});
