define(["require", "exports", "@syncfusion/ej2-base", "../../../src/accumulation-chart/accumulation", "../../../src/common/utils/helper", "../../../src/accumulation-chart/renderer/legend", "../../chart/base/data.spec", "../../chart/base/events.spec", "../../../src/accumulation-chart/renderer/dataLabel", "../../../src/accumulation-chart/annotation/annotation", "../../common.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, accumulation_1, helper_1, legend_1, data_spec_1, events_spec_1, dataLabel_1, annotation_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    accumulation_1.AccumulationChart.Inject(annotation_1.AccumulationAnnotation, legend_1.AccumulationLegend, dataLabel_1.AccumulationDataLabel);
    describe('Accumumation Control', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('Annotation for Accumulation', function () {
            var chartObj;
            var element;
            var chartElement;
            var trigger = new events_spec_1.MouseEvents();
            chartElement = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                var template = ej2_base_1.createElement('div', { id: 'template', styles: 'display: none;border: 2px solid red' });
                document.body.appendChild(template);
                template.innerHTML = "<img src='../base/spec/img/img1.jpg' style='border-radius: 30px;width: 30px;height: 30px;margin: 0 auto;' />";
                document.body.appendChild(chartElement);
                chartObj = new accumulation_1.AccumulationChart({
                    series: [{
                            animation: { enable: false },
                            name: 'ChartSeriesNameGold', dataSource: [{ x: 1000, y: 70 }, { x: 2000, y: -40 },
                                { x: 3000, y: 70 }, { x: 4000, y: 60 },
                                { x: 5000, y: -50 }, { x: 6000, y: -40 },
                                { x: 7000, y: 40 }, { x: 8000, y: 70 }], xName: 'x', yName: 'y'
                        }],
                    width: '800',
                    title: 'Chart TS Title',
                    legendSettings: { visible: false }
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.annotationModule.destroy();
                chartObj.destroy();
                chartElement.remove();
                ej2_base_1.remove(document.getElementById('template'));
                ej2_base_1.remove(document.getElementById('template1'));
            });
            it('Checking Secondary element child count', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Secondary_Element');
                    expect(element.childElementCount).toBe(0);
                    done();
                };
                chartObj.refresh();
            });
            it('Checking annotaiton as default', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Secondary_Element');
                    expect(element.childElementCount).toBe(1);
                    expect(element.children[0].id).toBe('container_Annotation_Collections');
                    expect(element.children[0].children[0].id).toBe('container_Annotation_0');
                    done();
                };
                chartObj.annotations = [{
                        content: '#template'
                    }];
                chartObj.refresh();
            });
            it('Checking default annotation position', function () {
                element = helper_1.getElement('container_Annotation_0');
                expect(element.style.left).toBe('-15px');
                expect(element.style.top).toBe('-17px');
            });
            it('Checking annotaiton region as series', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element.style.left == '221px' || element.style.left == '219.8px').toBe(true);
                    expect(element.style.top == '54px' || element.style.top == '51.3px').toBe(true);
                    done();
                };
                chartObj.annotations[0].region = 'Series';
                chartObj.refresh();
            });
            it('Checking annotaiton region as series with near and top', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element.style.left == '206px' || element.style.left == '204.8px').toBe(true);
                    expect(element.style.top == '34.3px' || element.style.top == '37px').toBe(true);
                    done();
                };
                chartObj.annotations[0].horizontalAlignment = 'Near';
                chartObj.annotations[0].verticalAlignment = 'Top';
                chartObj.refresh();
            });
            it('Checking annotaiton region as series with near and middle', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element.style.left == '206px' || element.style.left == '204.8px').toBe(true);
                    expect(element.style.top == '51.3px' || element.style.top == '54px').toBe(true);
                    done();
                };
                chartObj.annotations[0].horizontalAlignment = 'Near';
                chartObj.annotations[0].verticalAlignment = 'Middle';
                chartObj.refresh();
            });
            it('Checking annotaiton region as series with near and bottom', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element.style.left == '206px' || element.style.left == '204.8px').toBe(true);
                    expect(element.style.top == '71px' || element.style.top == '68.3px').toBe(true);
                    done();
                };
                chartObj.annotations[0].horizontalAlignment = 'Near';
                chartObj.annotations[0].verticalAlignment = 'Bottom';
                chartObj.refresh();
            });
            it('Checking annotaiton region as series with far and top', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element.style.left == '234.8px' || element.style.left == '236px').toBe(true);
                    expect(element.style.top == '34.3px' || element.style.top == '37px').toBe(true);
                    done();
                };
                chartObj.annotations[0].horizontalAlignment = 'Far';
                chartObj.annotations[0].verticalAlignment = 'Top';
                chartObj.refresh();
            });
            it('Checking annotaiton region as series with far and middle', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element.style.left == '234.8px' || element.style.left == '236px').toBe(true);
                    expect(element.style.top == '51.3px' || element.style.top == '54px').toBe(true);
                    done();
                };
                chartObj.annotations[0].horizontalAlignment = 'Far';
                chartObj.annotations[0].verticalAlignment = 'Middle';
                chartObj.refresh();
            });
            it('Checking annotaiton region as series with far and bottom', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element.style.left == '234.8px' || element.style.left == '236px').toBe(true);
                    expect(element.style.top == '71px' || element.style.top == '68.3px').toBe(true);
                    done();
                };
                chartObj.annotations[0].horizontalAlignment = 'Far';
                chartObj.annotations[0].verticalAlignment = 'Bottom';
                chartObj.refresh();
            });
            it('Checking annotaiton region as series with center and top', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element.style.left == '219.8px' || element.style.left == '221px').toBe(true);
                    expect(element.style.top == '34.3px' || element.style.top == '37px').toBe(true);
                    done();
                };
                chartObj.annotations[0].horizontalAlignment = 'Center';
                chartObj.annotations[0].verticalAlignment = 'Top';
                chartObj.refresh();
            });
            it('Checking annotaiton region as series with center and bottom', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element.style.left == '219.8px' || element.style.left == '221px').toBe(true);
                    expect(element.style.top == '71px' || element.style.top == '68.3px').toBe(true);
                    done();
                };
                chartObj.annotations[0].horizontalAlignment = 'Center';
                chartObj.annotations[0].verticalAlignment = 'Bottom';
                chartObj.refresh();
            });
            it('Checking annotaiton unit as pixel, region as chart with percentage', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element.style.left).toBe('385px');
                    expect(element.style.top).toBe('208px');
                    done();
                };
                chartObj.series[0].innerRadius = '30%';
                chartObj.annotations[0].horizontalAlignment = 'Center';
                chartObj.annotations[0].verticalAlignment = 'Middle';
                chartObj.annotations[0].region = 'Chart';
                chartObj.annotations[0].x = '50%';
                chartObj.annotations[0].y = '50%';
                chartObj.refresh();
            });
            it('Checking annotaiton unit as pixel, region as series with percentage', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element.style.left).toBe('385px');
                    expect(element.style.top == '218px' || element.style.top == '216.5px').toBe(true);
                    done();
                };
                chartObj.annotations[0].region = 'Series';
                chartObj.refresh();
            });
            it('Checking annotaiton unit as pixel, region as series with number', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element.style.left == '606px' || element.style.left == '604.8px').toBe(true);
                    expect(element.style.top == '262px' || element.style.top == '259.3px').toBe(true);
                    done();
                };
                chartObj.annotations[0].x = 385;
                chartObj.annotations[0].y = 208;
                chartObj.refresh();
            });
            it('Checking annotaiton unit as pixel, region as chart with date', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element.style.left).toBe('-15px');
                    expect(element.style.top).toBe('191px');
                    done();
                };
                chartObj.annotations[0].region = 'Chart';
                chartObj.annotations[0].x = new Date(2017, 9, 5);
                chartObj.annotations[0].y = 208;
                chartObj.refresh();
            });
            it('Checking annotaiton unit as pixel, region as series with date', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element.style.left == '221px' || element.style.left == '219.8px').toBe(true);
                    expect(element.style.top == '262px' || element.style.top == '259.3px').toBe(true);
                    done();
                };
                chartObj.annotations[0].region = 'Series';
                chartObj.refresh();
            });
            it('Checking annotaiton unit as point with unwanted data', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element).toBe(null);
                    done();
                };
                chartObj.annotations[0].coordinateUnits = 'Point';
                chartObj.annotations[0].x = 6000;
                chartObj.annotations[0].y = -50;
                chartObj.refresh();
            });
            it('Checking annotaiton unit as point with exact data', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element.style.left == '252.718px' || element.style.left == '252.97px').toBe(true);
                    expect(element.style.top == '248.034px' || element.style.top == '246.754px').toBe(true);
                    var legendEle = helper_1.getElement('container_chart_legend_text_0');
                    chartObj.loaded = null;
                    trigger.clickEvent(legendEle);
                    setTimeout(function () {
                        expect(element).not.toBe(null);
                        done();
                    }, 300);
                };
                chartObj.legendSettings.visible = true;
                chartObj.enableAnimation = true;
                chartObj.annotations[0].y = -40;
                chartObj.refresh();
            });
            it('Checking annotaiton unit as point with numeric value type as string', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element !== null).toBe(true);
                    done();
                };
                chartObj.legendSettings.visible = false;
                chartObj.enableAnimation = false;
                chartObj.annotations[0].x = '6000';
                chartObj.refresh();
            });
            it('Checking annotaiton unit as point with date time value type', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element.style.left == '400.103px' || element.style.left == '400.213px').toBe(true);
                    expect(element.style.top == '112.475px' || element.style.top == '110.203px').toBe(true);
                    done();
                };
                chartObj.series[0].dataLabel.visible = true;
                chartObj.series[0].dataSource = data_spec_1.datetimeData1;
                chartObj.annotations[0].x = new Date(2000, 3, 21);
                chartObj.annotations[0].y = 10;
                chartObj.refresh();
            });
            it('Checking annotaiton unit as point with date time value type and numeric value', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element).toBe(null);
                    done();
                };
                chartObj.annotations[0].x = 2000;
                chartObj.refresh();
            });
            it('Checking annotaiton unit as point with date time value as string', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element).toBe(null);
                    done();
                };
                chartObj.annotations[0].x = 'new Date(2000, 3, 21)';
                chartObj.refresh();
            });
        });
        describe('Annotation for Chart', function () {
            var chartObj;
            var element;
            var chartElement;
            chartElement = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                var template = ej2_base_1.createElement('div', { id: 'template', styles: 'display: none;border: 2px solid red' });
                document.body.appendChild(template);
                template.innerHTML = "<img src='../base/spec/img/img1.jpg' style='border-radius: 30px;width: 30px;height: 30px;margin: 0 auto;' />";
                var template1 = ej2_base_1.createElement('div', { id: 'template1', styles: 'display: none;' });
                document.body.appendChild(template1);
                template1.innerHTML = '<div>${point.y}</div>';
                document.body.appendChild(chartElement);
                chartObj = new accumulation_1.AccumulationChart({
                    series: [
                        {
                            dataSource: [
                                { x: { xValue: 'Jan' }, y: 15 }, { x: { xValue: 'Feb' }, y: 20 }, { x: { xValue: 'Mar' }, y: 35 }, { x: { xValue: 'Apr' }, y: 40 },
                                { x: { xValue: 'May' }, y: 80 }, { x: { xValue: 'Jun' }, y: 70 }, { x: { xValue: 'Jul' }, y: 65 }, { x: { xValue: 'Aug' }, y: 55 },
                                { x: { xValue: 'Sep' }, y: 50 }, { x: { xValue: 'Oct' }, y: 30 }, { x: { xValue: 'Nov' }, y: 35 }, { x: { xValue: 'Dec' }, y: 35 }
                            ], animation: { enable: false },
                            xName: 'x.xValue', yName: 'y'
                        }
                    ],
                    annotations: [{
                            content: '#template',
                            x: '50%',
                            y: '50%'
                        }, {
                            content: '#template1',
                            x: '50%',
                            y: '50%',
                            region: 'Series'
                        }], title: 'Annotations'
                });
                chartObj.appendTo('#container');
            });
            afterAll(function () {
                chartObj.destroy();
                chartElement.remove();
                ej2_base_1.remove(document.getElementById('template'));
                ej2_base_1.remove(document.getElementById('template1'));
            });
            it('Checking Secondary element child count with error', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Secondary_Element');
                    expect(element.children[0].childElementCount).toBe(1);
                    done();
                };
                chartObj.refresh();
            });
            it('Checking Secondary element child count without error', function (done) {
                var template1 = helper_1.getElement('template1');
                template1.innerHTML = '<div>${chart.title}</div>';
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Secondary_Element');
                    expect(element.children[0].childElementCount).toBe(2);
                    done();
                };
                chartObj.refresh();
            });
            it('Checking annotaiton in series region', function (done) {
                var template1 = helper_1.getElement('template1');
                template1.innerHTML = '<div>${chart.title}</div>';
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Secondary_Element');
                    expect(element.children[0].childElementCount).toBe(2);
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element.style.left == '335.5px' || element.style.left == '341.5px').toBe(true);
                    expect(element.style.top == '218px' || element.style.top == '216.5px').toBe(true);
                    element = helper_1.getElement('container_Annotation_1');
                    expect(element.style.left == '311.391px' || element.style.left == '317.391px').toBe(true);
                    expect(element.style.top == '226px' || element.style.top == '224.5px').toBe(true);
                    done();
                };
                chartObj.annotations[0].region = 'Series';
                chartObj.refresh();
            });
            it('Checking annotaiton in point units', function (done) {
                var template1 = helper_1.getElement('template1');
                template1.innerHTML = '<div>${chart.title}</div>';
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element.style.left == '342.781px' || element.style.left == '348.835px').toBe(true);
                    expect(element.style.top == '136.324px' || element.style.top == '134.226px').toBe(true);
                    element = helper_1.getElement('container_Annotation_1');
                    expect(element.style.left == '318.672px' || element.style.left == '324.725px').toBe(true);
                    expect(element.style.top == '144.324px' || element.style.top == '142.226px').toBe(true);
                    done();
                };
                chartObj.annotations[0].coordinateUnits = 'Point';
                chartObj.annotations[1].coordinateUnits = 'Point';
                chartObj.annotations[0].x = 'Jan';
                chartObj.annotations[0].y = 15;
                chartObj.annotations[1].x = 'Jan';
                chartObj.annotations[1].y = 15;
                chartObj.refresh();
            });
            it('Checking annotaiton in point units with yAxis out of x axis label', function (done) {
                var template1 = helper_1.getElement('template1');
                template1.innerHTML = '<div>${chart.title}</div>';
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element).toBe(null);
                    element = helper_1.getElement('container_Annotation_1');
                    expect(element.style.left == '318.672px' || element.style.left == '324.725px').toBe(true);
                    expect(element.style.top == '144.324px' || element.style.top == '142.226px').toBe(true);
                    done();
                };
                chartObj.annotations[0].x = 'Annotation';
                chartObj.refresh();
            });
            it('Checking annotation render event', function (done) {
                var template1 = helper_1.getElement('template1');
                template1.innerHTML = '<div>${chart.title}</div>';
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element.style.left).toBe('35px');
                    expect(element.style.top).toBe('33px');
                    element = helper_1.getElement('container_Annotation_1');
                    expect(element.style.left).toBe('10.8906px');
                    expect(element.style.top).toBe('41px');
                    done();
                };
                chartObj.annotations[0].x = 'Jan';
                chartObj.annotationRender = function (args) {
                    args.location.x = 50;
                    args.location.y = 50;
                };
                chartObj.refresh();
            });
            it('Checking annotation render event with cancel', function (done) {
                var template1 = helper_1.getElement('template1');
                template1.innerHTML = '<div>${chart.title}</div>';
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element).toBe(null);
                    element = helper_1.getElement('container_Annotation_1');
                    expect(element).toBe(null);
                    done();
                };
                chartObj.annotations[0].x = 'Jan';
                chartObj.annotationRender = function (args) {
                    args.cancel = true;
                };
                chartObj.refresh();
            });
            it('Checking set Annotation method', function (done) {
                var template1 = helper_1.getElement('template1');
                template1.innerHTML = '<div>${chart.title}</div>';
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element).toBe(null);
                    element = helper_1.getElement('container_Annotation_1');
                    chartObj.setAnnotationValue(1, '<div>Annotation has been changed</div>');
                    element = helper_1.getElement('container_Annotation_1');
                    expect(element.children[0].innerHTML).toBe('Annotation has been changed');
                    done();
                };
                chartObj.annotationRender = null;
                chartObj.annotations[0].x = 'Annotation';
                chartObj.refresh();
            });
            it('Checking set annotation method for null parent', function (done) {
                var template1 = helper_1.getElement('template1');
                template1.innerHTML = '<div>${chart.title}</div>';
                chartObj.loaded = function (args) {
                    chartObj.setAnnotationValue(0, '#template1');
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element.children[0].innerHTML).toBe('Annotations');
                    done();
                };
                chartObj.annotations[0].content = 'y';
                chartObj.annotations[0].x = 'Jan';
                chartObj.annotations[0].y = 15;
                chartObj.annotations[1].content = 'y';
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
