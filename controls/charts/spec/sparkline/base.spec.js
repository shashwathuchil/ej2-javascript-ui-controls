define(["require", "exports", "../../src/sparkline/index", "@syncfusion/ej2-base", "../../src/sparkline/utils/helper", "../common.spec", "@syncfusion/ej2-data"], function (require, exports, index_1, ej2_base_1, helper_1, common_spec_1, ej2_data_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    index_1.Sparkline.Inject(index_1.SparklineTooltip);
    describe('Sparkline Component Base Spec', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('Sparkline Testing spec', function () {
            var element;
            var sparkline;
            var id = 'spark-container';
            var ele;
            var d;
            var dataManager = new ej2_data_1.DataManager({
                url: 'https://ej2services.syncfusion.com/production/web-services/api/Orders'
            });
            beforeAll(function () {
                element = ej2_base_1.createElement('div', { id: id });
                element.style.width = '400px';
                element.style.height = '100px';
                document.body.appendChild(element);
                sparkline = new index_1.Sparkline({
                    height: '40%',
                    width: '20%',
                    containerArea: {
                        background: 'green',
                        border: { color: 'yellow', width: 3 },
                    },
                    tooltipSettings: { visible: true }
                });
            });
            afterAll(function () {
                sparkline.destroy();
                sparkline.sparklineResize(null);
                helper_1.removeElement(id);
            });
            it('Sparkline height and width percentage checking', function () {
                sparkline.loaded = function () {
                    ele = helper_1.getIdElement(id + '_SparklineBorder');
                    d = ele.getAttribute('d').split(' ');
                    var x = Number(d[1]);
                    var y = Number(d[2]);
                    var width = Number(d[9]) - x;
                    var height = Number(d[18]) - y;
                    expect(x).toBe(1.5);
                    expect(y).toBe(1.5);
                    expect(width).toBe(77);
                    expect(height).toBe(37);
                    helper_1.removeElement('nothing');
                };
                sparkline.appendTo('#' + id);
            });
            it('Sparkline background and border checking', function () {
                var fill = ele.getAttribute('fill');
                expect(fill).toBe('#FFFFFF');
                var stroke = ele.getAttribute('stroke');
                expect(stroke).toBe('yellow');
                var strwid = ele.getAttribute('stroke-width');
                expect(strwid).toBe('3');
            });
            it('Sparkline height and width pixel checking', function () {
                sparkline.loaded = function () {
                    ele = helper_1.getIdElement(id + '_SparklineBorder');
                    d = ele.getAttribute('d').split(' ');
                    var x = Number(d[1]);
                    var y = Number(d[2]);
                    var width = Number(d[9]) - x;
                    var height = Number(d[18]) - y;
                    expect(x).toBe(1.5);
                    expect(y).toBe(1.5);
                    expect(width).toBe(117);
                    expect(height).toBe(57);
                };
                sparkline.height = '60px';
                sparkline.width = '120px';
                sparkline.refresh();
            });
            it('Sparkline height and width default checking', function () {
                sparkline.loaded = function () {
                    ele = helper_1.getIdElement(id + '_SparklineBorder');
                    d = ele.getAttribute('d').split(' ');
                    var x = Number(d[1]);
                    var y = Number(d[2]);
                    var width = Number(d[9]) - x;
                    var height = Number(d[18]) - y;
                    expect(x).toBe(1.5);
                    expect(y).toBe(1.5);
                    expect(width).toBe(397);
                    expect(height).toBe(97);
                };
                sparkline.height = null;
                sparkline.width = null;
                sparkline.refresh();
            });
            it('Sparkline tooltip module checking', function () {
                sparkline.sparklineRenderer.processData();
                expect(sparkline.sparklineTooltipModule).not.toBe(null);
                expect(sparkline.sparklineTooltipModule).not.toBe(undefined);
            });
            it('Sparkline tooltip module checking', function () {
                sparkline.dataSource = dataManager;
                sparkline.sparklineRenderer.processDataManager();
            });
        });
        describe('Sparkline other scenario spec', function () {
            var element;
            var sparkline;
            var id = 'spark-container';
            var ele;
            var d;
            beforeAll(function () {
                element = ej2_base_1.createElement('div', { id: id });
                element.style.width = '400px';
                element.style.height = '100px';
                document.body.appendChild(element);
                sparkline = new index_1.Sparkline({
                    containerArea: {
                        background: 'blue',
                        border: { color: 'orange', width: 1 },
                    },
                    dataSource: [
                        { xDate: new Date(2017, 1, 1), yval: 2900 },
                        { xDate: new Date(2017, 1, 2), yval: 3900 },
                        { xDate: new Date(2017, 1, 3), yval: 3500 },
                        { xDate: new Date(2017, 1, 4), yval: 3800 },
                        { xDate: new Date(2017, 1, 5), yval: 2500 },
                        { xDate: new Date(2017, 1, 6), yval: 3200 }
                    ], yName: 'yval',
                });
            });
            afterAll(function () {
                sparkline.destroy();
                helper_1.removeElement(id);
            });
            it('Sparkline height and width parent size checking', function () {
                sparkline.loaded = function (args) {
                    ele = helper_1.getIdElement(id + '_SparklineBorder');
                    d = ele.getAttribute('d').split(' ');
                    var x = Number(d[1]);
                    var y = Number(d[2]);
                    var width = Number(d[9]) - x;
                    var height = Number(d[18]) - y;
                    expect(x).toBe(0.5);
                    expect(y).toBe(0.5);
                    expect(width).toBe(399);
                    expect(height).toBe(99);
                    args.sparkline.loaded = null;
                };
                sparkline.appendTo('#' + id);
                sparkline.getPersistData();
            });
            it('Sparkline value type Category and series type Pie coverage', function () {
                sparkline.loaded = function (args) {
                    args.sparkline.loaded = null;
                    expect(args.sparkline.valueType).toBe('Category');
                    expect(args.sparkline.type).toBe('Pie');
                };
                sparkline.valueType = 'Category';
                sparkline.type = 'Pie';
                sparkline.refresh();
            });
            it('Sparkline value type DateTime and series type WinLoss coverage', function () {
                sparkline.loaded = function (args) {
                    args.sparkline.loaded = null;
                    expect(args.sparkline.valueType).toBe('DateTime');
                    expect(args.sparkline.type).toBe('WinLoss');
                };
                sparkline.valueType = 'DateTime';
                sparkline.type = 'WinLoss';
                sparkline.xName = 'xDate';
                sparkline.refresh();
            });
            it('Sparkline value type Numeric and series type Pie coverage array data', function () {
                sparkline.loaded = function (args) {
                    args.sparkline.loaded = null;
                    expect(args.sparkline.valueType).toBe('Numeric');
                    expect(args.sparkline.type).toBe('Pie');
                };
                sparkline.valueType = 'Numeric';
                sparkline.type = 'Pie';
                sparkline.dataSource = [5, 6, 7, 8, 3];
                sparkline.refresh();
            });
            it('Sparkline value type Numeric and series type Column coverage array data', function () {
                sparkline.loaded = function (args) {
                    args.sparkline.loaded = null;
                    expect(args.sparkline.valueType).toBe('Numeric');
                    expect(args.sparkline.type).toBe('Column');
                };
                sparkline.valueType = 'Numeric';
                sparkline.type = 'Column';
                sparkline.dataSource = [1, 0, 1, -1, 0, -1, 1];
                sparkline.refresh();
            });
            it('Sparkline single array data', function () {
                sparkline.loaded = function (args) {
                    args.sparkline.loaded = null;
                    expect(args.sparkline.valueType).toBe('Numeric');
                    expect(args.sparkline.type).toBe('Column');
                };
                sparkline.dataSource = [5];
                sparkline.refresh();
            });
            it('Sparkline Column array minus data', function () {
                sparkline.loaded = function (args) {
                    args.sparkline.loaded = null;
                    expect(args.sparkline.valueType).toBe('Numeric');
                    expect(args.sparkline.type).toBe('Column');
                };
                sparkline.dataSource = [-5, -4, -7, -9];
                sparkline.refresh();
            });
            it('Sparkline WinLoss array minus data', function () {
                sparkline.loaded = function (args) {
                    args.sparkline.loaded = null;
                    expect(args.sparkline.valueType).toBe('Numeric');
                    expect(args.sparkline.type).toBe('WinLoss');
                };
                sparkline.type = 'WinLoss';
                sparkline.refresh();
            });
            it('Sparkline WinLoss array tristate data', function () {
                sparkline.loaded = function (args) {
                    args.sparkline.loaded = null;
                    expect(args.sparkline.valueType).toBe('Numeric');
                    expect(args.sparkline.type).toBe('WinLoss');
                };
                sparkline.dataSource = [-5, -4, 0, 7, -9];
                sparkline.refresh();
            });
            it('Sparkline Line with single data', function () {
                sparkline.loaded = function (args) {
                    args.sparkline.loaded = null;
                    expect(args.sparkline.valueType).toBe('Numeric');
                    expect(args.sparkline.type).toBe('Line');
                    new helper_1.TextOption('sdad', 0, 0, 'middle', 'coverage', 'middle', 'translate(90, 0)');
                };
                sparkline.dataSource = [5];
                sparkline.type = 'Line';
                sparkline.refresh();
            });
            it('Sparkline resize event checking', function (done) {
                sparkline.sparklineResize(null);
                sparkline.resize = function (args) {
                    expect(args.name).toBe('resize');
                    sparkline.resize = null;
                    done();
                };
                sparkline.sparklineResize(null);
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
