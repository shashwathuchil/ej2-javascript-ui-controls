define(["require", "exports", "../../../src/range-navigator/index", "../../../src/chart/index", "../../../src/chart/index", "@syncfusion/ej2-base", "../../common.spec"], function (require, exports, index_1, index_2, index_3, ej2_base_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    index_1.RangeNavigator.Inject(index_3.Logarithmic, index_3.DateTime, index_3.LineSeries, index_2.AreaSeries);
    var value = 0;
    var point;
    var data = [];
    var dateTime = [];
    for (var j = 0; j < 1200; j++) {
        value += (Math.random() * 10 - 5);
        value = value < 0 ? Math.abs(value) : value;
        point = { x: new Date(2000, 2, j), y: value, y1: value + 10 };
        data.push(point);
    }
    dateTime = [{ x: new Date(2000, 3), y: 34 }, { x: new Date(2000, 6), y: 32 },
        { x: new Date(2000, 11), y: 23 }, { x: new Date(2001, 3), y: 12 },
        { x: new Date(2001, 6), y: 83 }, { x: new Date(2001, 11), y: 76 },
        { x: new Date(2002, 3), y: 34 }, { x: new Date(2002, 6), y: 32 },
        { x: new Date(2002, 11), y: 65 }, { x: new Date(2003, 3), y: 98 },
        { x: new Date(2003, 6), y: 10 }, { x: new Date(2003, 11), y: 34 }];
    describe('Range navigator', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('with default case', function () {
            var element;
            var range;
            var chart;
            var rangeElement = ej2_base_1.createElement('div', { id: 'container' });
            var axisLabel;
            beforeAll(function () {
                document.body.appendChild(rangeElement);
                range = new index_1.RangeNavigator({
                    series: [{
                            dataSource: dateTime,
                            xName: 'x', yName: 'y', type: 'Line'
                        }],
                    value: [new Date(2000, 8), new Date(2001, 10)],
                    valueType: 'DateTime',
                    width: '800'
                });
                range.appendTo('#container');
            });
            afterAll(function () {
                range.destroy();
                rangeElement.remove();
            });
            it('Checking module name', function () {
                expect(range.getModuleName()).toBe('rangeNavigator');
            });
            it('checking with minimum only', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('container_AxisLabels');
                    expect(element.childNodes[0].childNodes[0].firstChild.textContent).toEqual('Dec');
                    done();
                };
                range.minimum = new Date(2001, 23);
                range.refresh();
            });
            it('checking with maximum only', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('container_AxisLabels');
                    expect(element.childNodes[0].lastChild.textContent).toEqual('Q3 2003');
                    done();
                };
                range.minimum = null;
                range.maximum = new Date(2003, 10);
                range.refresh();
            });
            it('checking auto interval quarter type', function () {
                expect(element.childNodes[0].childNodes[0].firstChild.textContent).toEqual('Q2 2000');
            });
            it('checking with range only', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('container_AxisLabels');
                    expect(element.childNodes[0].firstChild.textContent).toEqual('Q1 2001');
                    expect(element.childNodes[0].lastChild.textContent).toEqual('Q1 2004');
                    done();
                };
                range.minimum = new Date(2001, 0, 1);
                range.maximum = new Date(2004, 4, 10);
                range.labelPosition = 'Inside';
                range.refresh();
            });
            it('checking with label position inside, tick position outside', function (done) {
                range.loaded = function (args) {
                    var element = document.getElementById('container_AxisLabel_0');
                    expect(+element.getAttribute('x') >= 43 && +element.getAttribute('x') <= 45).toBe(true);
                    done();
                };
                range.labelPosition = 'Inside';
                range.refresh();
            });
            it('checking with label position inside, tick position inside', function (done) {
                range.loaded = function (args) {
                    var element = document.getElementById('container_AxisLabel_0');
                    expect(+element.getAttribute('x') >= 43 && +element.getAttribute('x') <= 45).toBe(true);
                    expect(element.getAttribute('y')).toEqual('102');
                    done();
                };
                range.tickPosition = 'Inside';
                range.refresh();
            });
            it('checking with label position outside, tick position inside', function (done) {
                range.loaded = function (args) {
                    var element = document.getElementById('container_AxisLabel_0');
                    expect((+element.getAttribute('y') > 100 && +element.getAttribute('y') < 115)).toBe(true);
                    done();
                };
                range.labelPosition = 'Outside';
                range.refresh();
            });
            it('checking with default grouping', function (done) {
                range.loaded = function (args) {
                    axisLabel = document.getElementById('container_AxisLabels');
                    expect(axisLabel.childElementCount).toEqual(2);
                    expect(axisLabel.childNodes[1].lastChild.textContent).toBe('2003');
                    done();
                };
                range.enableGrouping = true;
                range.tickPosition = 'Inside';
                range.minimum = null;
                range.maximum = null;
                range.refresh();
            });
            it('checking with grouped label position inside, tick position outside', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('container_AxisLabel_0');
                    expect((element.getAttribute('y') === '76' || element.getAttribute('y') === '77')).toBe(true);
                    done();
                };
                range.labelPosition = 'Inside';
                range.tickPosition = 'Outside';
                range.refresh();
            });
            it('checking with grouped labels, label position outside, tickposition outside', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('container_AxisLabel_0');
                    expect(element.getAttribute('y') === '83' || element.getAttribute('y') === '84.25').toEqual(true);
                    done();
                };
                range.labelPosition = 'Outside';
                range.refresh();
            });
            it('checked with quarter as label type', function (done) {
                range.loaded = function (args) {
                    axisLabel = document.getElementById('container_AxisLabels');
                    expect(axisLabel.lastChild.lastChild.textContent).toBe('2018');
                    done();
                };
                range.series[0].dataSource = [{ x: new Date(2018, 0, 1), y: 23 }, { x: new Date(2018, 4, 12), y: 34 },
                    { x: new Date(2018, 8, 23), y: 32 }, { x: new Date(2018, 10, 45), y: 56 }];
                range.intervalType = 'Quarter';
                range.refresh();
            });
            it('checked with quarter as label type started Quarter3', function (done) {
                range.loaded = function (args) {
                    axisLabel = document.getElementById('container_AxisLabels');
                    expect(axisLabel.childNodes[1].lastChild.textContent).toBe('2018');
                    done();
                };
                range.series[0].dataSource = [{ x: new Date(2018, 7, 1), y: 23 }, { x: new Date(2018, 8, 12), y: 34 },
                    { x: new Date(2018, 8, 23), y: 32 }, { x: new Date(2018, 10, 45), y: 56 }];
                range.intervalType = 'Quarter';
                range.refresh();
            });
            it('checked with quarter as label type started as quarter4', function (done) {
                range.loaded = function (args) {
                    axisLabel = document.getElementById('container_AxisLabels');
                    expect(axisLabel.childNodes[1].lastChild.textContent).toBe('2019');
                    done();
                };
                range.series[0].dataSource = [{ x: new Date(2018, 10, 1), y: 23 }, { x: new Date(2018, 10, 12), y: 34 },
                    { x: new Date(2019, 1, 23), y: 32 }, { x: new Date(2019, 10, 45), y: 56 }];
                range.intervalType = 'Quarter';
                range.refresh();
            });
            it('checked with secondary axis label alignment far', function (done) {
                range.loaded = function (args) {
                    axisLabel = document.getElementById('container_AxisLabels');
                    done();
                };
                range.series[0].dataSource = [{ x: new Date(2018, 10, 1), y: 23 }, { x: new Date(2018, 10, 12), y: 34 },
                    { x: new Date(2018, 11, 23), y: 32 }, { x: new Date(2018, 11, 45), y: 56 }];
                range.intervalType = 'Quarter';
                range.secondaryLabelAlignment = 'Far';
                range.refresh();
            });
            it('checked with secondary axis label alignment near', function (done) {
                range.loaded = function (args) {
                    axisLabel = document.getElementById('container_AxisLabels');
                    done();
                };
                range.series[0].dataSource = [{ x: new Date(2018, 10, 1), y: 23 }, { x: new Date(2018, 10, 12), y: 34 },
                    { x: new Date(2018, 11, 23), y: 32 }, { x: new Date(2018, 11, 45), y: 56 }];
                range.intervalType = 'Quarter';
                range.secondaryLabelAlignment = 'Near';
                range.refresh();
            });
            it('checked with month as label type', function (done) {
                range.loaded = function (args) {
                    var axisLabel = document.getElementById('container_AxisLabels');
                    expect(axisLabel.childNodes[0].firstChild.textContent).toBe('Jan');
                    expect(axisLabel.childNodes[1].lastChild.textContent).toBe('Quarter3 2018');
                    done();
                };
                range.series[0].dataSource = [{ x: new Date(2018, 0, 1), y: 23 }, { x: new Date(2018, 2, 12), y: 34 },
                    { x: new Date(2018, 4, 23), y: 32 }, { x: new Date(2018, 6, 45), y: 56 }];
                range.intervalType = 'Months';
                range.refresh();
            });
            it('checked with weeks as label type', function (done) {
                range.loaded = function (args) {
                    axisLabel = document.getElementById('container_AxisLabels');
                    expect(axisLabel.childNodes[0].firstChild.textContent).toBe('Week1');
                    expect(axisLabel.childNodes[1].lastChild.textContent).toBe('Feb');
                    done();
                };
                range.series[0].dataSource = [{ x: new Date(2018, 0, 12), y: 23 }, { x: new Date(2018, 0, 23), y: 34 },
                    { x: new Date(2018, 1, 23), y: 32 }, { x: new Date(2018, 1, 25), y: 56 }];
                range.intervalType = 'Weeks';
                range.refresh();
            });
            it('checked with week formats', function (done) {
                range.loaded = function (args) {
                    axisLabel = document.getElementById('container_AxisLabels');
                    expect(axisLabel.childNodes[0].firstChild.textContent).toBe('W1');
                    expect(axisLabel.childNodes[1].lastChild.textContent).toBe('Feb');
                    done();
                };
                range.width = '200';
                range.refresh();
            });
            it('checked with days as label type', function (done) {
                range.loaded = function (args) {
                    axisLabel = document.getElementById('container_AxisLabels');
                    expect(axisLabel.childNodes[0].firstChild.textContent).toBe('Jan 1');
                    expect(axisLabel.childNodes[1].lastChild.textContent).toBe('Week6');
                    done();
                };
                range.series[0].dataSource = [{ x: new Date(2018, 0, 1), y: 23 }, { x: new Date(2018, 0, 2), y: 34 },
                    { x: new Date(2018, 1, 3), y: 32 }, { x: new Date(2018, 1, 10), y: 56 }];
                range.intervalType = 'Days';
                range.width = '800';
                range.refresh();
            });
            it('checked with hours as label type', function (done) {
                range.loaded = function (args) {
                    axisLabel = document.getElementById('container_AxisLabels');
                    expect(axisLabel.childNodes[0].firstChild.textContent).toBe('4 AM');
                    done();
                };
                range.series[0].dataSource = [{ x: new Date(2018, 0, 1, 4), y: 23 }, { x: new Date(2018, 0, 1, 5), y: 34 },
                    { x: new Date(2018, 0, 1, 8), y: 32 }, { x: new Date(2018, 0, 1, 9), y: 56 }];
                range.intervalType = 'Hours';
                range.refresh();
            });
            it('checked with Minutes as label type', function (done) {
                range.loaded = function (args) {
                    axisLabel = document.getElementById('container_AxisLabels');
                    expect(axisLabel.childNodes[0].lastChild.textContent).toBe('10:42 AM');
                    expect(axisLabel.childNodes[1].lastChild.textContent).toBe('10 AM');
                    done();
                };
                range.series[0].dataSource = [{ x: new Date(2018, 0, 1, 10, 12), y: 23 }, { x: new Date(2018, 0, 1, 10, 22), y: 34 },
                    { x: new Date(2018, 0, 1, 10, 33), y: 32 }, { x: new Date(2018, 0, 1, 10, 42), y: 56 }];
                range.intervalType = 'Minutes';
                range.refresh();
            });
            it('checked with seconds as label type', function (done) {
                range.loaded = function (args) {
                    axisLabel = document.getElementById('container_AxisLabels');
                    expect(axisLabel.childNodes[0].lastChild.textContent).toBe('10:12:40 AM');
                    expect(axisLabel.childNodes[1].lastChild.textContent).toBe('10:12 AM');
                    done();
                };
                range.series[0].dataSource = [{ x: new Date(2018, 0, 1, 10, 12, 10), y: 23 }, { x: new Date(2018, 0, 1, 10, 12, 20), y: 34 },
                    { x: new Date(2018, 0, 1, 10, 12, 30), y: 32 }, { x: new Date(2018, 0, 1, 10, 12, 40), y: 56 }];
                range.intervalType = 'Seconds';
                range.interval = 10;
                range.refresh();
            });
            it('checked edge label placements checking first labels', function (done) {
                range.loaded = function (args) {
                    done();
                };
                range.series[0].dataSource = data;
                range.secondaryLabelAlignment = 'Middle';
                range.intervalType = 'Quarter';
                range.interval = null;
                range.refresh();
            });
            it('checking with last labels', function () {
                axisLabel = document.getElementById('container_AxisLabel_13');
            });
            it('checcking with Years and enable grouping', function (done) {
                range.loaded = function (args) {
                    axisLabel = document.getElementById('container_AxisLabels');
                    expect(axisLabel.childNodes[1].childNodes.length).toEqual(0);
                    done();
                };
                range.dataSource = [{ x: new Date(2000, 2), y: 23 }, { x: new Date(2002, 4), y: 45 }, { x: new Date(2010, 3), y: 12 }];
                range.intervalType = 'Years';
                range.refresh();
            });
            it('checking with lightweight interval type as Auto(year)', function (done) {
                range.loaded = function (args) {
                    chart = document.getElementById('container_chart');
                    axisLabel = document.getElementById('container_AxisLabels');
                    expect(chart.childElementCount).toEqual(0);
                    expect(axisLabel.childNodes[0].firstChild.textContent).toEqual('2000');
                    done();
                };
                range.dataSource = [{ x: new Date(2000, 0), y: 23 }, { x: new Date(2005, 0), y: 34 },
                    { x: new Date(2006, 0), y: 45 }, { x: new Date(2010, 0), y: 23 }];
                range.series = [];
                range.intervalType = 'Auto';
                range.xName = 'x';
                range.yName = 'y';
                range.refresh();
            });
            it('checking with lightweight interval type as year', function (done) {
                range.loaded = function (args) {
                    chart = document.getElementById('container_chart');
                    axisLabel = document.getElementById('container_AxisLabels');
                    expect(axisLabel.childNodes[1].childNodes.length).toEqual(0);
                    expect(chart.childElementCount).toEqual(0);
                    done();
                };
                range.intervalType = 'Years';
                range.refresh();
            });
            it('checking with lightweight interval type as Auto(quarter)', function (done) {
                range.loaded = function (args) {
                    chart = document.getElementById('container_chart');
                    axisLabel = document.getElementById('container_AxisLabels');
                    expect(chart.childElementCount).toEqual(0);
                    expect(axisLabel.childNodes[0].firstChild.textContent).toEqual('Quarter1');
                    done();
                };
                range.dataSource = [{ x: new Date(2000, 0), y: 23 }, { x: new Date(2001, 0), y: 34 },
                    { x: new Date(2002, 0), y: 45 }];
                range.series = [];
                range.intervalType = 'Auto';
                range.xName = 'x';
                range.yName = 'y';
                range.refresh();
            });
            it('checking with lightweight interval type as quarter', function (done) {
                range.loaded = function (args) {
                    expect(axisLabel.childNodes[0].firstChild.textContent.indexOf('Q') > -1).toBe(true);
                    done();
                };
                range.intervalType = 'Quarter';
                range.refresh();
            });
            it('checking with lightweight interval type as Auto(Month)', function (done) {
                range.loaded = function (args) {
                    axisLabel = document.getElementById('container_AxisLabels');
                    expect(axisLabel.childNodes[0].firstChild.textContent).toEqual('Jan');
                    done();
                };
                range.dataSource = [{ x: new Date(2000, 0), y: 23 }, { x: new Date(2001, 0), y: 34 }];
                range.series = [];
                range.intervalType = 'Auto';
                range.xName = 'x';
                range.yName = 'y';
                range.refresh();
            });
            it('checking with lightweight interval type as Month', function (done) {
                range.loaded = function (args) {
                    axisLabel = document.getElementById('container_AxisLabels');
                    expect(axisLabel.childNodes[0].firstChild.textContent).toEqual('Jan');
                    done();
                };
                range.intervalType = 'Months';
                range.refresh();
            });
            it('checking with lightweight interval type as Auto(Weeks)', function (done) {
                range.loaded = function (args) {
                    axisLabel = document.getElementById('container_AxisLabels');
                    expect(axisLabel.childNodes[0].firstChild.textContent).toEqual('W1');
                    done();
                };
                range.dataSource = [{ x: new Date(2000, 0), y: 23 }, { x: new Date(2000, 4), y: 34 }];
                range.series = [];
                range.intervalType = 'Auto';
                range.xName = 'x';
                range.yName = 'y';
                range.refresh();
            });
            it('checking with lightweight interval type as Weeks', function (done) {
                range.loaded = function (args) {
                    done();
                };
                range.intervalType = 'Weeks';
                range.refresh();
            });
            it('checking with lightweight interval type as Auto(Days)', function (done) {
                range.loaded = function (args) {
                    axisLabel = document.getElementById('container_AxisLabels');
                    expect(axisLabel.childNodes[0].firstChild.textContent).toEqual('12 AM');
                    done();
                };
                range.dataSource = [{ x: new Date(2000, 0, 23), y: 23 }, { x: new Date(2000, 0, 25), y: 34 }];
                range.series = [];
                range.intervalType = 'Auto';
                range.xName = 'x';
                range.yName = 'y';
                range.refresh();
            });
            it('checking with lightweight interval type as days', function (done) {
                range.loaded = function (args) {
                    axisLabel = document.getElementById('container_AxisLabels');
                    expect(axisLabel.childNodes[0].firstChild.textContent).toEqual('Jan 23');
                    done();
                };
                range.intervalType = 'Days';
                range.refresh();
            });
            it('checking with lightweight interval type as Auto(Hours)', function (done) {
                range.loaded = function (args) {
                    axisLabel = document.getElementById('container_AxisLabels');
                    expect(axisLabel.childNodes[0].firstChild.textContent).toEqual('1 AM');
                    done();
                };
                range.dataSource = [{ x: new Date(2000, 0, 23, 1), y: 23 }, { x: new Date(2000, 0, 23, 20), y: 34 }];
                range.series = [];
                range.intervalType = 'Auto';
                range.xName = 'x';
                range.yName = 'y';
                range.refresh();
            });
            it('checking with lightweight interval type as hours', function (done) {
                range.loaded = function (args) {
                    done();
                };
                range.intervalType = 'Hours';
                range.refresh();
            });
            it('checking with lightweight interval type as Auto(Minutes)', function (done) {
                range.loaded = function (args) {
                    axisLabel = document.getElementById('container_AxisLabels');
                    expect(axisLabel.childNodes[0].firstChild.textContent).toEqual('1:20 AM');
                    done();
                };
                range.dataSource = [{ x: new Date(2000, 0, 23, 1, 20), y: 23 }, { x: new Date(2000, 0, 23, 1, 30), y: 34 }];
                range.series = [];
                range.intervalType = 'Auto';
                range.xName = 'x';
                range.yName = 'y';
                range.refresh();
            });
            it('checking with lightweight interval type as hours', function (done) {
                range.loaded = function (args) {
                    axisLabel = document.getElementById('container_AxisLabels');
                    expect(axisLabel.childNodes[0].firstChild.textContent).toEqual('1:20 AM');
                    done();
                };
                range.intervalType = 'Minutes';
                range.refresh();
            });
            it('checking with lightweight interval type as Auto(Seconds)', function (done) {
                range.loaded = function (args) {
                    axisLabel = document.getElementById('container_AxisLabels');
                    expect(axisLabel.childNodes[0].firstChild.textContent).toEqual('1:20:10 AM');
                    done();
                };
                range.dataSource = [{ x: new Date(2000, 0, 23, 1, 20, 10), y: 23 }, { x: new Date(2000, 0, 23, 1, 20, 40), y: 34 }];
                range.series = [];
                range.intervalType = 'Auto';
                range.xName = 'x';
                range.yName = 'y';
                range.refresh();
            });
            it('checking with skeleton type', function (done) {
                range.loaded = function (args) {
                    done();
                };
                range.skeletonType = 'Date';
                range.refresh();
            });
            it('checking with skeleton formats', function (done) {
                range.loaded = function (args) {
                    axisLabel = document.getElementById('container_AxisLabels');
                    expect(axisLabel.childNodes[0].firstChild.textContent).toEqual('1/23/2000');
                    done();
                };
                range.skeleton = 'yMd';
                range.refresh();
            });
            it('checking with label styles', function (done) {
                range.loaded = function (args) {
                    axisLabel = document.getElementById('container_AxisLabels');
                    expect(axisLabel.childNodes[0].firstChild.getAttribute('fill')).toEqual('red');
                    done();
                };
                range.skeleton = '';
                range.labelStyle = { color: 'red', fontFamily: 'Calibri', fontStyle: 'italic', fontWeight: 'normal', opacity: 0.6 };
                range.refresh();
            });
            it('checking with font family', function () {
                axisLabel = document.getElementById('container_AxisLabels');
                expect(axisLabel.childNodes[0].firstChild.getAttribute('font-family')).toEqual('Calibri');
            });
            it('checking with font family', function () {
                axisLabel = document.getElementById('container_AxisLabels');
                expect(axisLabel.childNodes[0].firstChild.getAttribute('font-weight')).toEqual('normal');
            });
            it('checking with opacity', function () {
                axisLabel = document.getElementById('container_AxisLabels');
                expect(axisLabel.childNodes[0].firstChild.getAttribute('font-style')).toEqual('italic');
            });
            it('checking with font style', function () {
                axisLabel = document.getElementById('container_AxisLabels');
                expect(axisLabel.childNodes[0].firstChild.getAttribute('font-family')).toEqual('Calibri');
            });
            it('checking light weight without grouping Year', function (done) {
                range.loaded = function (args) {
                    axisLabel = document.getElementById('container_AxisLabels');
                    expect(axisLabel.childNodes[1].childNodes.length).toEqual(0);
                    expect(axisLabel.childNodes[0].firstChild.textContent).toEqual('2000');
                    expect(axisLabel.childNodes[0].lastChild.textContent).toEqual('2010');
                    done();
                };
                range.dataSource = [{ x: new Date(2000, 2, 4), y: 23 }, { x: new Date(2010, 2, 4), y: 23 }];
                range.enableGrouping = false;
                range.intervalType = 'Years';
                range.refresh();
            });
            it('checking light weight without grouping Quarter', function (done) {
                range.loaded = function (args) {
                    axisLabel = document.getElementById('container_AxisLabels');
                    expect(axisLabel.childNodes[1].childNodes.length).toEqual(0);
                    expect(axisLabel.childNodes[0].firstChild.textContent).toEqual('Quarter1 2000');
                    done();
                };
                range.dataSource = [{ x: new Date(2000, 2, 4), y: 23 }, { x: new Date(2001, 2, 4), y: 23 }];
                range.enableGrouping = false;
                range.intervalType = 'Quarter';
                range.refresh();
            });
            it('checking light weight without grouping Months', function (done) {
                range.loaded = function (args) {
                    axisLabel = document.getElementById('container_AxisLabels');
                    expect(axisLabel.childNodes[1].childNodes.length).toEqual(0);
                    expect(axisLabel.childNodes[0].firstChild.textContent).toEqual('Mar');
                    expect(axisLabel.childNodes[0].lastChild.textContent).toEqual('Nov');
                    done();
                };
                range.dataSource = [{ x: new Date(2000, 2, 4), y: 23 }, { x: new Date(2000, 10, 4), y: 23 }];
                range.enableGrouping = false;
                range.intervalType = 'Months';
                range.refresh();
            });
            it('checking light weight without grouping Weeks', function (done) {
                range.loaded = function (args) {
                    axisLabel = document.getElementById('container_AxisLabels');
                    expect(axisLabel.childNodes[1].childNodes.length).toEqual(0);
                    expect(axisLabel.childNodes[0].firstChild.textContent).toEqual('W1');
                    expect(axisLabel.childNodes[0].lastChild.textContent === 'W36' ||
                        axisLabel.childNodes[0].lastChild.textContent === 'W35').toBe(true);
                    done();
                };
                range.dataSource = [{ x: new Date(2000, 2, 4), y: 23 }, { x: new Date(2000, 10, 4), y: 23 }];
                range.intervalType = 'Weeks';
                range.refresh();
            });
            it('checking light weight without grouping Days', function (done) {
                range.loaded = function (args) {
                    axisLabel = document.getElementById('container_AxisLabels');
                    expect(axisLabel.childNodes[1].childNodes.length).toEqual(0);
                    expect(axisLabel.childNodes[0].firstChild.textContent).toEqual('Mar 4');
                    expect(axisLabel.childNodes[0].lastChild.textContent === 'Nov 6' || axisLabel.childNodes[0].lastChild.textContent === 'Nov 1' ||
                        axisLabel.childNodes[0].lastChild.textContent === 'Nov 2').toBe(true);
                    done();
                };
                range.dataSource = [{ x: new Date(2000, 2, 4), y: 23 }, { x: new Date(2000, 10, 10), y: 23 }];
                range.intervalType = 'Days';
                range.refresh();
            });
            it('checking with area series', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('container_Series_0');
                    expect(element.getAttribute('fill')).toBe('#00bdae');
                    expect(element.getAttribute('stroke-width')).toBe('2');
                    done();
                };
                range.intervalType = 'Auto';
                range.series = [{ dataSource: data, xName: 'x', yName: 'y', type: 'Area' }];
                range.refresh();
            });
            it('checking with line series', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('container_Series_0');
                    expect(element.getAttribute('fill')).toBe('none');
                    expect(element.getAttribute('stroke-width')).toBe('1');
                    expect(element.getAttribute('stroke')).toBe('#00bdae');
                    done();
                };
                range.series[0].type = 'Line';
                range.refresh();
            });
            it('checking with multiple series', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('container_chart');
                    expect(element.childElementCount).toEqual(2);
                    done();
                };
                range.series = [{ dataSource: data, xName: 'x', yName: 'y' },
                    { dataSource: data, xName: 'x', yName: 'y1' }];
                range.refresh();
            });
            it('checking with combination series', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('container_chart');
                    expect(element.childElementCount).toEqual(2);
                    element = document.getElementById('container_Series_0');
                    expect(element.getAttribute('fill')).toBe('none');
                    expect(element.getAttribute('stroke-width')).toBe('1');
                    expect(element.getAttribute('stroke')).toBe('#00bdae');
                    element = document.getElementById('container_Series_1');
                    expect(element.getAttribute('fill')).toBe('#404041');
                    done();
                };
                range.series = [{ dataSource: data, xName: 'x', yName: 'y' },
                    { dataSource: data, xName: 'x', yName: 'y1', type: 'Area' }];
                range.refresh();
            });
            it('checking with render event', function (done) {
                range.loaded = function (args) {
                    axisLabel = document.getElementById('container_AxisLabel_2');
                    expect(axisLabel).toEqual(null);
                    done();
                };
                range.labelRender = function (args) {
                    if (args.text === 'Q3 2000') {
                        args.cancel = true;
                    }
                };
                range.refresh();
            });
            it('checking with render event', function (done) {
                range.loaded = function (args) {
                    axisLabel = document.getElementById('container_AxisLabel_0');
                    expect(axisLabel).not.toEqual(null);
                    done();
                };
                range.labelRender = null;
                range.refresh();
            });
            it('checking with render event with styles', function (done) {
                range.loaded = function (args) {
                    axisLabel = document.getElementById('container_AxisLabel_0');
                    expect(axisLabel.getAttribute('fill')).toEqual('black');
                    done();
                };
                range.labelRender = function (args) {
                    if (args.text === 'Q1 2000') {
                        args.labelStyle.color = 'black';
                        args.text = 'firstLabel';
                    }
                };
                range.refresh();
            });
            it('checking with label change in event', function () {
                axisLabel = document.getElementById('container_AxisLabel_0');
                expect(axisLabel.textContent).toEqual('firstLabel');
                ej2_base_1.EventHandler.remove(window, 'resize', range.resized);
            });
            it('checking with hide', function (done) {
                range.loaded = function (args) {
                    axisLabel = document.getElementById('container_FirstLevelAxisLabels');
                    expect(axisLabel.childElementCount).toEqual(33);
                    done();
                };
                range.labelRender = null;
                range.intervalType = 'Months';
                range.refresh();
            });
            it('checking with none', function (done) {
                range.loaded = function (args) {
                    axisLabel = document.getElementById('container_FirstLevelAxisLabels');
                    expect(axisLabel.childElementCount).toEqual(41);
                    done();
                };
                range.labelIntersectAction = 'None';
                range.refresh();
            });
            it('checking with date value as string', function (done) {
                range.loaded = function (args) {
                    axisLabel = document.getElementById('container_FirstLevelAxisLabels');
                    expect(axisLabel.firstElementChild.textContent).toEqual('Feb');
                    done();
                };
                range.series[0].dataSource = [{ x: '2018/01/01 00:00:00', y: 21 },
                    { x: '2018/02/01 00:00:00', y: 70 }, { x: '2019/02/01 00:00:00', y: 70 }];
                range.labelIntersectAction = 'Hide';
                range.refresh();
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
