define(["require", "exports", "@syncfusion/ej2-base", "../../../src/common/utils/helper", "../../../src/chart/chart", "../../../src/chart/series/line-series", "../../../src/chart/series/column-series", "../../../src/chart/series/bar-series", "../../../src/chart/annotation/annotation", "../../../src/chart/axis/category-axis", "../../../src/chart/axis/date-time-axis", "../../../src/chart/axis/logarithmic-axis", "../base/data.spec", "../base/data.spec", "../../common.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, helper_1, chart_1, line_series_1, column_series_1, bar_series_1, annotation_1, category_axis_1, date_time_axis_1, logarithmic_axis_1, data_spec_1, data_spec_2, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    chart_1.Chart.Inject(line_series_1.LineSeries, bar_series_1.BarSeries, column_series_1.ColumnSeries, category_axis_1.Category, date_time_axis_1.DateTime, logarithmic_axis_1.Logarithmic, annotation_1.ChartAnnotation);
    describe('Chart Control', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('Annotation for Chart', function () {
            var chartObj;
            var element;
            var chartElement;
            chartElement = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                if (document.getElementById('template')) {
                    ej2_base_1.remove(document.getElementById('template'));
                }
                var template = ej2_base_1.createElement('div', { id: 'template', styles: 'display: none;border: 2px solid red' });
                document.body.appendChild(template);
                template.innerHTML = "<img src='../base/spec/img/img1.jpg' style='border-radius: 30px;width: 30px;height: 30px;margin: 0 auto;' />";
                document.body.appendChild(chartElement);
                chartObj = new chart_1.Chart({
                    primaryXAxis: { title: 'PrimaryXAxis' },
                    primaryYAxis: { title: 'PrimaryYAxis', rangePadding: 'Normal' },
                    series: [{
                            animation: { enable: false },
                            name: 'ChartSeriesNameGold', dataSource: [{ x: 1000, y: 70 }, { x: 2000, y: -40 },
                                { x: 3000, y: 70 }, { x: 4000, y: 60 },
                                { x: 5000, y: -50 }, { x: 6000, y: -40 },
                                { x: 7000, y: 40 }, { x: 8000, y: 70 }], xName: 'x', yName: 'y',
                            type: 'Bar', fill: 'rgba(135,206,235,1)',
                            marker: { visible: true }
                        }],
                    width: '800',
                    title: 'Chart TS Title',
                    legendSettings: { visible: false }
                });
                chartObj.appendTo('#container');
                data_spec_1.unbindResizeEvents(chartObj);
            });
            afterAll(function () {
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
                    expect(element.style.left == '55.5px' || element.style.left == '50.5px').toBe(true);
                    expect(element.style.top == '25.25px' || element.style.top == '28.25px').toBe(true);
                    done();
                };
                chartObj.annotations[0].region = 'Series';
                chartObj.refresh();
            });
            it('Checking annotaiton region as series with near and top', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element.style.left == '40.5px' || element.style.left == '35.5px').toBe(true);
                    expect(element.style.top == '8.25px' || element.style.top == '11.25px').toBe(true);
                    done();
                };
                chartObj.annotations[0].horizontalAlignment = 'Near';
                chartObj.annotations[0].verticalAlignment = 'Top';
                chartObj.refresh();
            });
            it('Checking annotaiton region as series with near and middle ', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element.style.left == '40.5px' || element.style.left == '35.5px').toBe(true);
                    expect(element.style.top == '25.25px' || element.style.top == '28.25px').toBe(true);
                    done();
                };
                chartObj.annotations[0].horizontalAlignment = 'Near';
                chartObj.annotations[0].verticalAlignment = 'Middle';
                chartObj.refresh();
            });
            it('Checking annotaiton region as series with near and bottom', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element.style.left == '40.5px' || element.style.left == '35.5px').toBe(true);
                    expect(element.style.top == '42.25px' || element.style.top == '45.25px').toBe(true);
                    done();
                };
                chartObj.annotations[0].horizontalAlignment = 'Near';
                chartObj.annotations[0].verticalAlignment = 'Bottom';
                chartObj.refresh();
            });
            it('Checking annotaiton region as series with far and top', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element.style.left == '70.5px' || element.style.left == '65.5px').toBe(true);
                    expect(element.style.top == '8.25px' || element.style.top == '11.25px').toBe(true);
                    done();
                };
                chartObj.annotations[0].horizontalAlignment = 'Far';
                chartObj.annotations[0].verticalAlignment = 'Top';
                chartObj.refresh();
            });
            it('Checking annotaiton region as series with far and middle', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element.style.left == '70.5px' || element.style.left == '65.5px').toBe(true);
                    expect(element.style.top == '25.25px' || element.style.top == '28.25px').toBe(true);
                    done();
                };
                chartObj.annotations[0].horizontalAlignment = 'Far';
                chartObj.annotations[0].verticalAlignment = 'Middle';
                chartObj.refresh();
            });
            it('Checking annotaiton region as series with far and bottom', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element.style.left == '70.5px' || element.style.left == '65.5px').toBe(true);
                    expect(element.style.top == '42.25px' || element.style.top == '45.25px').toBe(true);
                    done();
                };
                chartObj.annotations[0].horizontalAlignment = 'Far';
                chartObj.annotations[0].verticalAlignment = 'Bottom';
                chartObj.refresh();
            });
            it('Checking annotaiton region as series with center and top', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element.style.left == '55.5px' || element.style.left == '50.5px').toBe(true);
                    expect(element.style.top == '8.25px' || element.style.top == '11.25px').toBe(true);
                    done();
                };
                chartObj.annotations[0].horizontalAlignment = 'Center';
                chartObj.annotations[0].verticalAlignment = 'Top';
                chartObj.refresh();
            });
            it('Checking annotaiton region as series with center and bottom', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element.style.left == '55.5px' || element.style.left == '50.5px').toBe(true);
                    expect(element.style.top == '42.25px' || element.style.top == '45.25px').toBe(true);
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
                chartObj.annotations[0].horizontalAlignment = 'Center';
                chartObj.annotations[0].verticalAlignment = 'Middle';
                chartObj.annotations[0].region = 'Chart';
                chartObj.annotations[0].x = '50%';
                chartObj.annotations[0].y = '50%';
                chartObj.refresh();
            });
            it('Checking annotaiton unit as pixel, region as chart with number', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element.style.left).toBe('370px');
                    expect(element.style.top).toBe('191px');
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
                chartObj.annotations[0].x = new Date(2017, 9, 5);
                chartObj.annotations[0].y = 208;
                chartObj.refresh();
            });
            it('Checking annotaiton unit as point with numeric value type - negative - inverted axis', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element.style.left == '100.469px' || element.style.left == '95.7812px').toBe(true);
                    expect(element.style.top == '135.016px' || element.style.top == '135.828px').toBe(true);
                    done();
                };
                chartObj.annotations[0].coordinateUnits = 'Point';
                chartObj.annotations[0].x = 6000;
                chartObj.annotations[0].y = -50;
                chartObj.refresh();
            });
            it('Checking annotaiton unit as point with numeric value type exceed the visible range', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element).toBe(null);
                    done();
                };
                chartObj.annotations[0].coordinateUnits = 'Point';
                chartObj.annotations[0].x = 6000;
                chartObj.annotations[0].y = -150;
                chartObj.refresh();
            });
            it('Checking annotaiton unit as point with numeric value type - positive - inverted axis', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element.style.left == '550.156px' || element.style.left == '548.594px').toBe(true);
                    done();
                };
                chartObj.annotations[0].y = 50;
                chartObj.refresh();
            });
            it('Checking annotaiton unit as point with numeric value type - negative', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element.style.left == '567.429px' || element.style.left == '566.286px').toBe(true);
                    expect(element.style.top == '354.547px' || element.style.top == '350.984px').toBe(true);
                    done();
                };
                chartObj.series[0].type = 'Line';
                chartObj.annotations[0].y = -50;
                chartObj.refresh();
            });
            it('Checking annotaiton unit as point with numeric value type - out of range', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element).toBe(null);
                    done();
                };
                chartObj.annotations[0].y = -250;
                chartObj.refresh();
            });
            it('Checking annotaiton unit as point with numeric value type - positive', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element.style.left == '567.429px' || element.style.left == '566.286px').toBe(true);
                    expect(element.style.top == '135.016px' || element.style.top == '135.828px').toBe(true);
                    done();
                };
                chartObj.annotations[0].y = 50;
                chartObj.refresh();
            });
            it('Checking annotaiton unit as point with numeric value type as string', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element.style.left == '567.429px' || element.style.left == '566.286px').toBe(true);
                    expect(element.style.top == '135.016px' || element.style.top == '135.828px').toBe(true);
                    done();
                };
                chartObj.annotations[0].x = '6000';
                chartObj.annotations[0].y = 50;
                chartObj.refresh();
            });
            it('Checking annotaiton unit as point with date time value type', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element.style.left == '481.174px' || element.style.left == '479.556px').toBe(true);
                    expect(element.style.top == '130.625px' || element.style.top == '131.525px').toBe(true);
                    done();
                };
                chartObj.series[0].dataSource = data_spec_2.datetimeData;
                chartObj.primaryXAxis.valueType = 'DateTime';
                chartObj.annotations[0].x = new Date(2006, 3, 30);
                chartObj.annotations[0].y = 70;
                chartObj.refresh();
            });
            it('Checking annotaiton unit as point with date time value as string', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element != null).toBe(true);
                    done();
                };
                chartObj.annotations[0].x = new Date(2006, 3, 30).toDateString();
                chartObj.refresh();
            });
            it('Checking annotaiton unit as point with category value type', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element.style.left == '546.094px' || element.style.left == '544.844px').toBe(true);
                    expect(element.style.top == '69.1562px' || element.style.top == '71.2813px').toBe(true);
                    done();
                };
                chartObj.series[0].dataSource = data_spec_2.categoryData;
                chartObj.primaryXAxis.valueType = 'Category';
                chartObj.annotations[0].x = 'Germany';
                chartObj.annotations[0].y = 70;
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
                chartObj = new chart_1.Chart({
                    primaryXAxis: { valueType: 'Category' },
                    rows: [{ height: '50%' }, { height: '50%' }],
                    columns: [{ width: '50%' }, { width: '50%' }],
                    axes: [
                        { rowIndex: 1, name: 'yAxis' },
                        { rowIndex: 1, name: 'xAxis', valueType: 'Category', opposedPosition: true },
                        { rowIndex: 1, columnIndex: 1, name: 'yAxis1', opposedPosition: true },
                        { rowIndex: 1, columnIndex: 1, name: 'xAxis1', valueType: 'Category', opposedPosition: true },
                        { rowIndex: 0, columnIndex: 1, name: 'yAxis2', opposedPosition: true },
                        { rowIndex: 0, columnIndex: 1, name: 'xAxis2', valueType: 'Category' }
                    ],
                    series: [
                        {
                            type: 'Column',
                            dataSource: [
                                { x: 'Jan', y: 15 }, { x: 'Feb', y: 20 }, { x: 'Mar', y: 35 }, { x: 'Apr', y: 40 },
                                { x: 'May', y: 80 }, { x: 'Jun', y: 70 }, { x: 'Jul', y: 65 }, { x: 'Aug', y: 55 },
                                { x: 'Sep', y: 50 }, { x: 'Oct', y: 30 }, { x: 'Nov', y: 35 }, { x: 'Dec', y: 35 }
                            ], animation: { enable: false },
                            xName: 'x', yName: 'y'
                        },
                        {
                            type: 'Line',
                            dataSource: [
                                { x: 'Jan', y: 33 }, { x: 'Feb', y: 31 }, { x: 'Mar', y: 30 }, { x: 'Apr', y: 28 },
                                { x: 'May', y: 29 }, { x: 'Jun', y: 30 }, { x: 'Jul', y: 33 }, { x: 'Aug', y: 32 },
                                { x: 'Sep', y: 34 }, { x: 'Oct', y: 32 }, { x: 'Nov', y: 32 }, { x: 'Dec', y: 31 }
                            ],
                            xName: 'x', yName: 'y',
                            yAxisName: 'yAxis', xAxisName: 'xAxis',
                            name: 'Japan', animation: { enable: false },
                            marker: { visible: true, width: 10, height: 10, border: { width: 2, color: '#F8AB1D' } }
                        },
                        {
                            type: 'Line',
                            dataSource: [
                                { x: 'Jan', y: 33 }, { x: 'Feb', y: 31 }, { x: 'Mar', y: 30 }, { x: 'Apr', y: 28 },
                                { x: 'May', y: 29 }, { x: 'Jun', y: 30 }, { x: 'Jul', y: 33 }, { x: 'Aug', y: 32 },
                                { x: 'Sep', y: 34 }, { x: 'Oct', y: 32 }, { x: 'Nov', y: 32 }, { x: 'Dec', y: 31 }
                            ],
                            xName: 'x', yName: 'y',
                            yAxisName: 'yAxis1', xAxisName: 'xAxis1',
                            name: 'Japan', animation: { enable: false },
                            marker: { visible: true, width: 10, height: 10, border: { width: 2, color: '#F8AB1D' } }
                        },
                        {
                            type: 'Line',
                            dataSource: [
                                { x: 'Jan', y: 33 }, { x: 'Feb', y: 31 }, { x: 'Mar', y: 30 }, { x: 'Apr', y: 28 },
                                { x: 'May', y: 29 }, { x: 'Jun', y: 30 }, { x: 'Jul', y: 33 }, { x: 'Aug', y: 32 },
                                { x: 'Sep', y: 34 }, { x: 'Oct', y: 32 }, { x: 'Nov', y: 32 }, { x: 'Dec', y: 31 }
                            ],
                            xName: 'x', yName: 'y',
                            yAxisName: 'yAxis2', xAxisName: 'xAxis2',
                            name: 'Japan', animation: { enable: false },
                            marker: { visible: true, width: 10, height: 10, border: { width: 2, color: '#F8AB1D' } }
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
                data_spec_1.unbindResizeEvents(chartObj);
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
                    expect(element.style.left == '367px' || element.style.left == '372.5px').toBe(true);
                    expect(element.style.top == '208.625px' || element.style.top == '207.625px').toBe(true);
                    element = helper_1.getElement('container_Annotation_1');
                    expect(element.style.left == '342.891px' || element.style.left == '348.391px').toBe(true);
                    expect(element.style.top == '216.625px' || element.style.top == '215.625px').toBe(true);
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
                    expect(element.style.left == '38.7708px' || element.style.left == '38.0417px').toBe(true);
                    expect(element.style.top == '331.725px' || element.style.top == '333.125px').toBe(true);
                    element = helper_1.getElement('container_Annotation_1');
                    expect(element.style.left == '14.6615px' || element.style.left == '13.9323px').toBe(true);
                    expect(element.style.top == '339.725px' || element.style.top == '341.125px').toBe(true);
                    done();
                };
                chartObj.annotations[0].coordinateUnits = 'Point';
                chartObj.annotations[1].coordinateUnits = 'Point';
                chartObj.annotations[0].x = 'Jan';
                chartObj.annotations[0].y = 20;
                chartObj.annotations[1].x = 'Jan';
                chartObj.annotations[1].y = 20;
                chartObj.refresh();
            });
            it('Checking annotaiton in point units with xAxis', function (done) {
                var template1 = helper_1.getElement('template1');
                template1.innerHTML = '<div>${chart.title}</div>';
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element.style.left == '152.938px' || element.style.left == '154.375px').toBe(true);
                    expect(element.style.top == '131.688px' || element.style.top == '129.188px').toBe(true);
                    element = helper_1.getElement('container_Annotation_1');
                    expect(element.style.left == '471.328px' || element.style.left == '479.266px').toBe(true);
                    expect(element.style.top == '139.688px' || element.style.top == '137.188px').toBe(true);
                    done();
                };
                chartObj.annotations[0].xAxisName = 'xAxis';
                chartObj.annotations[0].yAxisName = 'yAxis';
                chartObj.annotations[0].x = 'May';
                chartObj.annotations[1].xAxisName = 'xAxis1';
                chartObj.annotations[1].yAxisName = 'yAxis1';
                chartObj.annotations[1].x = 'May';
                chartObj.refresh();
            });
            it('Checking annotaiton in point units with yAxis', function (done) {
                var template1 = helper_1.getElement('template1');
                template1.innerHTML = '<div>${chart.title}</div>';
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element.style.left == '324.188px' || element.style.left == '328.875px').toBe(true);
                    expect(element.style.top == '331.725px' || element.style.top == '333.125px').toBe(true);
                    element = helper_1.getElement('container_Annotation_1');
                    expect(element.style.left == '528.411px' || element.style.left == '537.432px').toBe(true);
                    expect(element.style.top == '293.563px' || element.style.top == '294.062px').toBe(true);
                    done();
                };
                chartObj.annotations[0].xAxisName = 'primaryXAxis';
                chartObj.annotations[0].yAxisName = 'primaryYAxis';
                chartObj.annotations[0].x = 'Nov';
                chartObj.annotations[1].xAxisName = 'xAxis2';
                chartObj.annotations[1].yAxisName = 'yAxis2';
                chartObj.annotations[1].x = 'Jul';
                chartObj.refresh();
            });
            it('Checking annotaiton in point units with yAxis out of x axis label', function (done) {
                var template1 = helper_1.getElement('template1');
                template1.innerHTML = '<div>${chart.title}</div>';
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element).toBe(null);
                    element = helper_1.getElement('container_Annotation_1');
                    expect(element.style.left == '528.411px' || element.style.left == '537.432px').toBe(true);
                    expect(element.style.top == '293.563px' || element.style.top == '294.062px').toBe(true);
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
            it('Checking axis name with out initialize the axis', function (done) {
                var template1 = helper_1.getElement('template1');
                template1.innerHTML = '<div>${chart.title}</div>';
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element).toBe(null);
                    done();
                };
                chartObj.annotations[0].y = 15;
                chartObj.annotations[0].xAxisName = 'xAxisName';
                chartObj.annotations[0].yAxisName = 'yAxisName';
                chartObj.annotationRender = null;
                chartObj.refresh();
            });
        });
        describe('Annotation for Chart - logarithmic axis', function () {
            var chartObj;
            var element;
            var chartElement;
            chartElement = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                var template = ej2_base_1.createElement('div', { id: 'template', styles: 'display: none;border: 2px solid red' });
                document.body.appendChild(template);
                template.innerHTML = "<img src='../base/spec/img/img1.jpg' style='border-radius: 30px;width: 30px;height: 30px;margin: 0 auto;' />";
                document.body.appendChild(chartElement);
                chartObj = new chart_1.Chart({
                    primaryXAxis: {
                        title: 'PrimaryXAxis',
                        valueType: 'Logarithmic'
                    },
                    primaryYAxis: { title: 'PrimaryYAxis', valueType: 'Logarithmic' },
                    series: [{
                            dataSource: [{ y: 80 }, { y: 200 }, { y: 400 },
                                { y: 600 }, { y: 700 }, { y: 1400 },
                                { y: 2000 }, { y: 4000 },
                                { y: 6000 }, { y: 8000 }, { y: 11000 }],
                            xName: 'y', yName: 'y', animation: { enable: false }, type: 'Line',
                            name: 'ChartSeriesNameGold', fill: 'green',
                        },
                    ],
                    annotations: [{
                            content: 'default_content',
                            x: 400,
                            y: 400,
                            coordinateUnits: 'Point'
                        }], title: 'Annotations', load: (function (args) {
                        args.chart.annotations[0].content = '#template';
                    })
                });
                chartObj.appendTo('#container');
                data_spec_1.unbindResizeEvents(chartObj);
            });
            afterAll(function () {
                chartObj.destroy();
                chartElement.remove();
                ej2_base_1.remove(document.getElementById('template'));
            });
            it('Checking Secondary element child count with error', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Secondary_Element');
                    expect(element.children[0].childElementCount).toBe(1);
                    done();
                };
                chartObj.refresh();
            });
            it('Checking annotation within x axis', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element.style.left == '400.75px' || element.style.left == '403.25px').toBe(true);
                    expect(element.style.top == '214.24px' || element.style.top == '216.036px').toBe(true);
                    done();
                };
                chartObj.annotations[0].x = '1000';
                chartObj.refresh();
            });
            it('Checking annotation within y axis', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element.style.left == '400.75px' || element.style.left == '403.25px').toBe(true);
                    expect(element.style.top == '105.813px' || element.style.top == '104.812px').toBe(true);
                    done();
                };
                chartObj.annotations[0].y = '10000';
                chartObj.refresh();
            });
            it('Checking annotation outside of the y axis', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element).toBe(null);
                    done();
                };
                chartObj.annotations[0].y = '1000000';
                chartObj.refresh();
            });
            it('Checking annotation outside of the x axis', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element).toBe(null);
                    done();
                };
                chartObj.annotations[0].x = '1000000';
                chartObj.refresh();
            });
            it('Checking annotation within y axis - inverted axis', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    var left = element.style.left;
                    var top = element.style.top;
                    expect(left == '566.875px' || left == '573.625px' || left == '607.7px').toBe(true);
                    expect(top == '183.375px' || top == '184.375px').toBe(true);
                    done();
                };
                chartObj.annotations[0].y = '10000';
                chartObj.annotations[0].x = '1000';
                chartObj.series[0].type = 'Bar';
                chartObj.refresh();
            });
            it('Checking annotation outside of the y axis  - inverted axis', function (done) {
                chartObj.loaded = function (args) {
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element).toBe(null);
                    done();
                };
                chartObj.annotations[0].y = '1000000';
                chartObj.refresh();
            });
            it('Checking set annotation method  - inverted axis', function () {
                chartObj.setAnnotationValue(0, '<div>Annotation has been changed</div>');
                element = helper_1.getElement('container_Annotation_0');
                expect(element).toBe(null);
            });
            it('Checking set annotation method for null parent', function (done) {
                chartObj.loaded = function (args) {
                    chartObj.setAnnotationValue(0, '#template');
                    element = helper_1.getElement('container_Annotation_0');
                    expect(element).toBe(null);
                    done();
                };
                chartObj.annotations[0].content = 'y';
                chartObj.annotations[0].y = '1000000';
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
