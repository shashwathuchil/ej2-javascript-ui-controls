define(["require", "exports", "../../../src/range-navigator/index", "../../../src/chart/index", "@syncfusion/ej2-base", "@syncfusion/ej2-data", "../../common.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, index_1, index_2, ej2_base_1, ej2_data_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    index_1.RangeNavigator.Inject(index_2.AreaSeries);
    var value = 0;
    var point;
    var data = [];
    var dateTime = [];
    for (var j = 0; j < 100; j++) {
        value += (Math.random() * 10 - 5);
        point = { x: j, y: value, y1: value + 10 };
        data.push(point);
    }
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
            var rangeElement = ej2_base_1.createElement('div', { id: 'container' });
            var axisLabel;
            var dataManager = new ej2_data_1.DataManager({
                url: 'http://mvc.syncfusion.com/Services/Northwnd.svc/Tasks/'
            });
            var query = new ej2_data_1.Query().take(5).where('Estimate', 'lessThan', 3, false);
            beforeAll(function () {
                document.body.appendChild(rangeElement);
                range = new index_1.RangeNavigator({
                    dataSource: data, xName: 'x', yName: 'y', value: [20, 30]
                });
                range.appendTo('#container');
            });
            afterAll(function () {
                range.destroy();
                rangeElement.remove();
            });
            it('empty options control class names', function () {
                element = document.getElementById('container');
                expect(element.classList.contains('e-control')).toBe(true);
                expect(element.classList.contains('e-rangenavigator')).toBe(true);
            });
            it('checking with numeric lightweight', function () {
                var container = document.getElementById('container_svg');
                var selectedElement = document.getElementById('container_SelectedArea');
                expect(selectedElement.getAttribute('fill')).toEqual('#FF4081');
                expect(container.getAttribute('height')).toEqual('50');
                expect(range != null).toBe(true);
            });
            it('checking with fabric theme', function (done) {
                range.loaded = function (args) {
                    var selectedElement = document.getElementById('container_SelectedArea');
                    expect(selectedElement.getAttribute('fill')).toEqual('#007897');
                    done();
                };
                range.theme = 'Fabric';
                range.refresh();
            });
            it('checking with Bootstrap4 theme', function (done) {
                range.loaded = function (args) {
                    var selectedElement = document.getElementById('container_SelectedArea');
                    expect(selectedElement.getAttribute('fill')).toEqual('#FFD939');
                    done();
                };
                range.theme = 'Bootstrap4';
                range.refresh();
            });
            it('checking with bootstrap theme', function (done) {
                range.loaded = function (args) {
                    var selectedElement = document.getElementById('container_SelectedArea');
                    expect(selectedElement.getAttribute('fill')).toEqual('#428BCA');
                    done();
                };
                range.theme = 'Bootstrap';
                range.refresh();
            });
            it('checking with highContrast theme', function (done) {
                range.loaded = function (args) {
                    var selectedElement = document.getElementById('container_SelectedArea');
                    expect(selectedElement.getAttribute('fill')).toEqual('#FFD939');
                    done();
                };
                range.theme = 'HighContrastLight';
                range.refresh();
            });
            it('checking with tailwind theme', function (done) {
                range.loaded = function (args) {
                    var selectedElement = document.getElementById('container_SelectedArea');
                    expect(selectedElement.getAttribute('fill')).toEqual('#4F46E5');
                    done();
                };
                range.theme = 'Tailwind';
                range.refresh();
            });
            it('checking with tailwind dark theme', function (done) {
                range.loaded = function (args) {
                    var selectedElement = document.getElementById('container_SelectedArea');
                    expect(selectedElement.getAttribute('fill')).toEqual('#22D3EE');
                    done();
                };
                range.theme = 'TailwindDark';
                range.refresh();
            });
            it('checking with custom width', function (done) {
                range.loaded = function (args) {
                    var container = document.getElementById('container_svg');
                    expect(container.getAttribute('width')).toEqual('200');
                    expect(range != null).toBe(true);
                    done();
                };
                range.theme = 'Material';
                range.width = '200';
                range.refresh();
            });
            it('checking with numeric axis with minimum only', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('container_AxisLabel_0');
                    expect(element.textContent).toEqual('10');
                    expect(range != null).toBe(true);
                    done();
                };
                range.series = [{ dataSource: data, xName: 'x', yName: 'y', type: 'Line' }];
                range.minimum = 10;
                range.height = '';
                range.width = '';
                range.refresh();
            });
            it('checking with numeric axis with maximum only', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('container_AxisLabels');
                    expect(element.childNodes[0].lastChild.textContent).toEqual('1000');
                    done();
                };
                range.minimum = null;
                range.maximum = 1000;
                range.refresh();
            });
            it('checking with numeric axis with interval only', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('container_AxisLabel_0');
                    expect(element.textContent).toEqual('0');
                    element = document.getElementById('container_AxisLabel_1');
                    expect(element.textContent).toEqual('50');
                    done();
                };
                range.minimum = null;
                range.interval = 50;
                range.maximum = 1000;
                range.refresh();
            });
            it('checking with numeric axis with range', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('container_AxisLabel_0');
                    expect(element.textContent).toEqual('20');
                    element = document.getElementById('container_AxisLabel_1');
                    expect(element.textContent).toEqual('40');
                    done();
                };
                range.minimum = 20;
                range.interval = 20;
                range.maximum = 100;
                range.refresh();
            });
            it('checking with label position inside', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('container_AxisLabel_0');
                    expect(element.getAttribute('y') === '102').toBe(true);
                    done();
                };
                range.labelPosition = 'Inside';
                range.refresh();
            });
            it('checking with label position outside', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('container_AxisLabel_0');
                    expect(element.getAttribute('y') === '111' || element.getAttribute('y') === '111.25').toBe(true);
                    done();
                };
                range.labelPosition = 'Outside';
                range.refresh();
            });
            it('checking with interval', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('container_AxisLabel_0');
                    expect(element.textContent).toEqual('20');
                    element = document.getElementById('container_AxisLabel_1');
                    expect(element.textContent).toEqual('25');
                    done();
                };
                range.interval = 5;
                range.refresh();
            });
            it('checking with custom label format', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('container_AxisLabel_1');
                    expect(element.textContent.indexOf('K') > -1).toBe(true);
                    done();
                };
                range.labelFormat = '{value}K';
                range.refresh();
            });
            it('checking with area series', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('container_Series_0');
                    expect(element.getAttribute('fill')).toBe('#00bdae');
                    expect(element.getAttribute('stroke-width')).toBe('2');
                    done();
                };
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
                range.minimum = 10;
                range.maximum = 50;
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
            it('checking with fabric theme', function (done) {
                range.loaded = function (args) {
                    var selectedElement = document.getElementById('container_SelectedArea');
                    expect(selectedElement.getAttribute('fill')).toEqual('transparent');
                    done();
                };
                range.theme = 'Fabric';
                range.refresh();
            });
            it('checking with bootstrap theme', function (done) {
                range.loaded = function (args) {
                    var selectedElement = document.getElementById('container_SelectedArea');
                    expect(selectedElement.getAttribute('fill')).toEqual('transparent');
                    done();
                };
                range.theme = 'Bootstrap';
                range.refresh();
            });
            it('checking with highcontrast theme', function (done) {
                range.loaded = function (args) {
                    var selectedElement = document.getElementById('container_SelectedArea');
                    expect(selectedElement.getAttribute('fill')).toEqual('transparent');
                    done();
                };
                range.theme = 'HighContrastLight';
                range.refresh();
            });
            it('checking with area series', function (done) {
                range.loaded = function (args) {
                    element = document.getElementById('container_Series_0');
                    expect(element.getAttribute('fill')).toBe('#00bdae');
                    expect(element.getAttribute('stroke-width')).toBe('2');
                    done();
                };
                range.theme = 'Material';
                range.series[0].type = 'Area';
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
                range.minimum = 10;
                range.maximum = 50;
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
                range.value = [20, 50];
                range.series = [{ dataSource: data, xName: 'x', yName: 'y' },
                    { dataSource: data, xName: 'x', yName: 'y1', type: 'Area' }];
                range.refresh();
            });
            it('checking with remote date lightweight', function () {
                range.loaded = function (args) {
                    element = document.getElementById('container_chart');
                };
                range.dataSource = dataManager;
                range.xName = 'Id';
                range.yName = 'Estimate';
                range.query = query;
                range.series = [];
                range.refresh();
            });
            it('checking with remote date lightweight', function () {
                range.loaded = function (args) {
                    element = document.getElementById('container_chart');
                };
                range.series = [{
                        dataSource: dataManager, xName: 'Id', yName: 'Estimate',
                        query: query
                    }];
                range.getPersistData();
                range.refresh();
            });
            it('checking with margin', function () {
                range.loaded = function (args) {
                    var container = document.getElementById('containerSeriesGroup0');
                };
                range.margin = { top: 10, left: 10, right: 10, bottom: 10 };
                range.refresh();
            });
            it('checking materialdark', function () {
                range.loaded = function (args) {
                    var container = document.getElementById('containerSeriesGroup0');
                };
                range.theme = 'MaterialDark';
                range.refresh();
            });
            it('checking fabricdark', function () {
                range.loaded = function (args) {
                    var container = document.getElementById('containerSeriesGroup0');
                };
                range.theme = 'FabricDark';
                range.refresh();
            });
            it('checking Bootstrapdark', function () {
                range.loaded = function (args) {
                    var container = document.getElementById('containerSeriesGroup0');
                };
                range.theme = 'BootstrapDark';
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
