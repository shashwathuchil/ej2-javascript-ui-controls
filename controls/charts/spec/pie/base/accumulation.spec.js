define(["require", "exports", "@syncfusion/ej2-base", "@syncfusion/ej2-data", "../../../src/accumulation-chart/accumulation", "../../../src/accumulation-chart/user-interaction/tooltip", "../../../src/accumulation-chart/renderer/dataLabel", "../../../src/common/utils/helper", "../../chart/base/data.spec", "../../chart/base/events.spec", "../../common.spec", "../../chart/base/data.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, ej2_data_1, accumulation_1, tooltip_1, dataLabel_1, helper_1, data_spec_1, events_spec_1, common_spec_1, data_spec_2) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    accumulation_1.AccumulationChart.Inject(tooltip_1.AccumulationTooltip, dataLabel_1.AccumulationDataLabel);
    describe('Accumulation Chart Control', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('accumulation and Doughnut Control Checking', function () {
            var element;
            var loaded;
            var svgObject;
            var text;
            var id = 'ej2container';
            var accumulation;
            var dataManager = new ej2_data_1.DataManager({
                url: 'http://mvc.syncfusion.com/Services/Northwnd.svc/Tasks/'
            });
            var query = new ej2_data_1.Query().take(7).where('Estimate', 'greaterThan', 1, false);
            var trigger = new events_spec_1.MouseEvents();
            beforeAll(function () {
                element = ej2_base_1.createElement('div', { id: id });
                document.body.appendChild(element);
                accumulation = new accumulation_1.AccumulationChart();
            });
            afterAll(function () {
                accumulation.destroy();
                helper_1.removeElement(id);
                helper_1.removeElement(id + '_0_content');
            });
            it('Checking accumulation instance creation', function (done) {
                accumulation.loaded = function (args) {
                    expect(accumulation != null).toBe(true);
                    done();
                };
                accumulation.appendTo('#' + id);
            });
            it('empty options control class names', function () {
                element = helper_1.getElement(id);
                expect(element.classList.contains('e-control')).toBe(true);
                expect(element.classList.contains('e-accumulationchart')).toBe(true);
            });
            it('empty option accumulation height and width', function () {
                svgObject = helper_1.getElement(id + '_svg');
                expect(svgObject.getAttribute('height')).toBe('450');
                expect(svgObject.getAttribute('width')).not.toBe(null);
            });
            it('Checking module name', function () {
                expect(accumulation.getModuleName()).toBe('accumulationchart');
            });
            it('Checking the null width of the accumulation', function (done) {
                accumulation.width = null;
                element.setAttribute('style', 'width:0px');
                accumulation.loaded = function (args) {
                    svgObject = helper_1.getElement(id + '_svg');
                    expect(svgObject.getAttribute('width')).toEqual('600');
                    done();
                };
                accumulation.refresh();
            });
            it('Checking the percentage size of the accumulation width', function (done) {
                accumulation.width = '50%';
                element.setAttribute('style', 'width:900px');
                accumulation.loaded = function (args) {
                    svgObject = helper_1.getElement(id + '_svg');
                    expect(svgObject.getAttribute('width')).toEqual('450');
                    done();
                };
                accumulation.refresh();
            });
            it('Checking the percentage size of the accumulation height', function (done) {
                accumulation.height = '50%';
                element.setAttribute('style', 'height:900px');
                accumulation.loaded = function (args) {
                    svgObject = helper_1.getElement(id + '_svg');
                    expect(svgObject.getAttribute('height')).toEqual('450');
                    done();
                };
                accumulation.refresh();
            });
            it('Checking the height of the accumulation', function () {
                accumulation.height = '500';
                accumulation.loaded = null;
                accumulation.dataBind();
                svgObject = helper_1.getElement(id + '_svg');
                expect(svgObject.getAttribute('height')).toEqual('500');
            });
            it('Checking both height and width of the accumulation', function () {
                accumulation.width = '500';
                accumulation.height = '300';
                accumulation.dataBind();
                svgObject = helper_1.getElement(id + '_svg');
                expect(svgObject.getAttribute('width')).toEqual('500');
                expect(svgObject.getAttribute('height')).toEqual('300');
            });
            it('Checking with empty title', function () {
                text = helper_1.getElement(id + '_title');
                expect(text).toBeNull();
            });
            it('Checking with empty subtitle', function () {
                text = helper_1.getElement(id + '_subTitle');
                expect(text).toBeNull();
            });
            it('Checking with  title', function () {
                accumulation.title = 'Syncfusion accumulation Title';
                accumulation.dataBind();
                text = helper_1.getElement(id + '_title');
                expect(text.textContent).toBe('Syncfusion accumulation Title');
                expect(text.getAttribute('y') === '25' || text.getAttribute('y') === '22.75').toEqual(true);
            });
            it('checking chart title with different radius', function () {
                accumulation.title = 'Empty Point as average';
                accumulation.dataBind();
                text = helper_1.getElement(id + '_title');
                expect(text.textContent).toBe('Empty Point as average');
                if (parseInt(accumulation.series[0].radius) >= 80) {
                    expect(text.getAttribute('y') === '25' || text.getAttribute('y') === '22.75').toEqual(true);
                }
            });
            it('Checking with  subtitle', function () {
                accumulation.subTitle = 'accumulation SubTitle';
                accumulation.dataBind();
                text = helper_1.getElement(id + '_subTitle');
                expect(text.textContent).toBe('accumulation SubTitle');
                expect(text.getAttribute('y') === '46.25' || text.getAttribute('y') === '41.75').toEqual(true);
            });
            it('Checking with title', function () {
                accumulation.titleStyle.textOverflow = 'Wrap',
                    accumulation.title = 'Syncfusion accumulation TitleSyncfusionaccumulationTitleSyncfusionaccumulationTitleSyncfusionaccumulation Title';
                accumulation.dataBind();
                text = helper_1.getElement(id + '_title');
                expect(text.textContent.indexOf('...') > -1).toBe(true);
            });
            it('checking chart title with different radius', function () {
                accumulation.title = 'Empty Point as average';
                accumulation.dataBind();
                text = helper_1.getElement(id + '_title');
                expect(text.textContent).toBe('Empty Point as average');
                if (parseInt(accumulation.series[0].radius) >= 80) {
                    expect(text.getAttribute('y') === '25' || text.getAttribute('y') === '22.75').toEqual(true);
                }
            });
            it('Checking with subtitle Overflow is Wrap', function () {
                accumulation.subTitleStyle.textOverflow = 'Wrap',
                    accumulation.title = 'Syncfusion accumulation Title';
                accumulation.subTitle = 'Syncfusion accumulation subTitleSyncfusionaccumulationTitleSyncfusion';
                accumulation.dataBind();
                text = helper_1.getElement(id + '_subTitle');
                expect(text.childNodes.length == 2).toBe(true);
            });
            it('Checking the title font size', function () {
                accumulation.title = 'accumulation Title';
                accumulation.titleStyle.size = '24px';
                accumulation.dataBind();
                text = helper_1.getElement(id + '_title');
                expect(text.getAttribute('font-size')).toEqual('24px');
            });
            it('Checking the subtitle font size', function () {
                accumulation.subTitle = 'Sub Title';
                accumulation.subTitleStyle.size = '24px';
                accumulation.dataBind();
                text = helper_1.getElement(id + '_subTitle');
                expect(text.getAttribute('font-size')).toEqual('24px');
            });
            it('Checking the subtitle Alingnment is Near', function () {
                accumulation.subTitleStyle.textAlignment = 'Near';
                accumulation.dataBind();
                text = helper_1.getElement(id + '_subTitle');
                expect(text.getAttribute('text-anchor')).toEqual('start');
            });
            it('Checking the subtitle Alingnment is End', function () {
                accumulation.subTitleStyle.textAlignment = 'Far';
                accumulation.dataBind();
                text = helper_1.getElement(id + '_subTitle');
                expect(text.getAttribute('text-anchor')).toEqual('end');
            });
            it('Checking the subtitle Trim', function () {
                accumulation.subTitle = 'Accumulation SubTitle Trim';
                accumulation.subTitleStyle.textOverflow = 'Trim';
                accumulation.dataBind();
                text = helper_1.getElement(id + '_subTitle');
                expect(text.textContent.indexOf('...') != -1).toBe(true);
            });
            it('Checking the border color', function () {
                accumulation.border.width = 2;
                accumulation.border.color = 'green';
                accumulation.dataBind();
                svgObject = helper_1.getElement(id + '_border');
                expect(svgObject.getAttribute('stroke')).toBe('green');
                expect(svgObject.getAttribute('stroke-width')).toBe('2');
            });
            it('Checking the accumulation background', function () {
                accumulation.background = 'yellow';
                accumulation.dataBind();
                svgObject = helper_1.getElement(id + '_border');
                expect(svgObject.getAttribute('fill')).toBe('yellow');
            });
            it('Checking the accumulation Margin with out title ', function () {
                accumulation.margin = { left: 20, right: 10, top: 20, bottom: 30 };
                accumulation.title = '';
                accumulation.subTitle = '';
                accumulation.dataBind();
                var rect = accumulation.initialClipRect;
                expect(rect.width).toEqual(469);
                expect(rect.height).toEqual(250);
                expect(rect.x).toEqual(20);
                expect(rect.y).toEqual(20);
            });
            it('Checking the accumulation Margin with title', function () {
                accumulation.title = 'accumulation Title';
                accumulation.dataBind();
                var rect = accumulation.initialClipRect;
                expect(rect.width).toEqual(469);
                expect(rect.height === 218 || rect.height === 223).toEqual(true);
                expect(rect.x).toEqual(20);
                expect(rect.y === 52 || rect.y === 47).toEqual(true);
            });
            it('Checking the accumulation with Series datapoints', function (done) {
                loaded = function (args) {
                    var points = args.accumulation.series[0].points;
                    expect(points.length).toBe(15);
                    done();
                };
                accumulation.series = [{
                        dataSource: data_spec_1.data,
                        xName: 'x', yName: 'y'
                    }];
                accumulation.loaded = loaded;
                accumulation.refresh();
            });
            it('Checking the accumulation with DataTime Values', function (done) {
                loaded = function (args) {
                    var points = args.accumulation.series[0].points;
                    expect(points.length).toBe(6);
                    done();
                };
                accumulation.series = [{
                        dataSource: data_spec_1.datetimeData1,
                        xName: 'x', yName: 'y',
                        animation: { enable: false },
                        groupTo: '1'
                    }];
                accumulation.loaded = loaded;
                accumulation.refresh();
            });
            it('Mouse events checking', function () {
                element = helper_1.getElement(id);
                trigger.mousedownEvent(element, 100, 50, 100, 50);
                trigger.mouseupEvent(element, 100, 50, 100, 50);
                trigger.mouseoutEvent(element);
                var tapHold = document.createEvent('MouseEvent');
                tapHold['pointerType'] = 'touch';
                accumulation.accumulationRightClick(tapHold);
                var menu = document.createEvent('MouseEvent');
                menu.initEvent('contextmenu', true, false);
                element.dispatchEvent(menu);
                accumulation.getPersistData();
            });
            it('resize checking', function () {
                window.dispatchEvent(new Event('resize'));
                svgObject = helper_1.getElement(id + '_svg');
                expect(svgObject).not.toBe(null);
                expect(svgObject.getAttribute('width')).toBe('500');
                expect(svgObject.getAttribute('height')).toBe('300');
            });
            it('club points value change check', function () {
                accumulation.series[0].groupTo = '20';
                accumulation.loaded = null;
                accumulation.refreshChart();
                var points = accumulation.series[0].points;
                expect(points.length).toBe(4);
            });
            it('theme checking', function () {
                accumulation.theme = 'Fabric';
                accumulation.dataBind();
                var points = accumulation.series[0].points;
                expect(points[1].color).toBe('#404041');
            });
            it('Checking title trim', function () {
                accumulation.title = 'candidate joined in a year syncfusion Chart Title';
                accumulation.width = '80';
                accumulation.dataBind();
                text = helper_1.getElement(id + '_title');
                expect(text.textContent.indexOf('...') != -1).toBe(true);
            });
            it('title tooltip feature checking', function (done) {
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    text = helper_1.getElement(id + '_title');
                    trigger.mousemoveEvent(text, 0, 0, 75, 20);
                    var tooltip = helper_1.getElement(id + '_EJ2_Title_Tooltip');
                    expect(tooltip.textContent).toBe('Single Point legend long text trimming feature checking');
                    tooltip.remove();
                    done();
                };
                accumulation.title = 'Single Point legend long text trimming feature checking';
                accumulation.width = '80';
                accumulation.refresh();
            });
            it('subtitle tooltip feature checking', function (done) {
                accumulation.loaded = function (args) {
                    text = helper_1.getElement(id + '_subTitle');
                    trigger.mousemoveEvent(text, 0, 0, 75, 120);
                    var tooltip = helper_1.getElement(id + '_EJ2_Title_Tooltip');
                    expect(tooltip.textContent).toBe('subtitle text');
                    tooltip.remove();
                    done();
                };
                accumulation.title = 'title text';
                accumulation.subTitle = 'subtitle text';
                accumulation.width = '80';
                accumulation.refresh();
            });
            it('remote data checking', function (done) {
                accumulation.loaded = function (args) {
                    expect(accumulation.series[0].points.length).toBe(7);
                    expect(helper_1.getElement(id + '_Series_0_Point_3').getAttribute('opacity')).toBe('0.2');
                    done();
                };
                accumulation.series[0].dataSource = data_spec_1.remoteData;
                accumulation.series[0].xName = 'Id';
                accumulation.series[0].opacity = 0.2;
                accumulation.series[0].yName = 'Estimate';
                accumulation.series[0].groupTo = null;
                accumulation.title = '';
                accumulation.refresh();
            });
            it('Background image checking', function (done) {
                setTimeout(function () {
                    var background = document.getElementById(id + '_background');
                    expect(background.getAttribute('href') != null).toBe(true);
                    done();
                }, 500);
                accumulation.backgroundImage = 'https://cdn.syncfusion.com/content/images/freetrials/essential-studio.png?v=03102019101652';
                accumulation.refresh();
            });
            it('checking accumulation chart double click event', function (done) {
                loaded = function (args) {
                    element = document.getElementById(args.chart.element.id);
                    trigger.doubleClickEvent(element);
                };
                accumulation.chartDoubleClick = function (args) {
                    expect(args.name).toEqual('chartDoubleClick');
                    done();
                };
                accumulation.loaded = loaded;
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
        describe('Checking RTL Behaviour for Title', function () {
            var ele;
            var id = 'ej2-container';
            var textEle;
            var titleId = id + '_title';
            var subTitleId = id + '_subTitle';
            var accumulation;
            var anchor;
            beforeAll(function () {
                ele = ej2_base_1.createElement('div', { id: id });
                document.body.appendChild(ele);
                accumulation = new accumulation_1.AccumulationChart({
                    border: { width: 1, color: 'blue' },
                    series: [
                        {
                            type: 'Pie',
                            dataSource: data_spec_2.piedata, animation: { enable: false }, xName: 'x', yName: 'y'
                        }
                    ],
                    width: '600',
                    height: '400',
                    legendSettings: { visible: false },
                    title: 'Syncfusion مخططات',
                    subTitle: 'Since 2012',
                    titleStyle: {
                        textAlignment: 'Near'
                    },
                    subTitleStyle: {
                        textAlignment: 'Far'
                    }
                });
                accumulation.appendTo('#' + id);
            });
            afterAll(function () {
                accumulation.loaded = null;
                accumulation.destroy();
                helper_1.removeElement(id);
            });
            it('Default title anchor', function (done) {
                accumulation.loaded = function (args) {
                    textEle = helper_1.getElement(titleId);
                    anchor = textEle.getAttribute('text-anchor');
                    expect(anchor === 'start').toBe(true);
                    done();
                };
                accumulation.refresh();
            });
            it('Default subtitle anchor', function (done) {
                accumulation.loaded = function (args) {
                    textEle = helper_1.getElement(subTitleId);
                    anchor = textEle.getAttribute('text-anchor');
                    expect(anchor === 'end').toBe(true);
                    done();
                };
                accumulation.refresh();
            });
            it('Title anchor with RTL', function (done) {
                accumulation.loaded = function (args) {
                    textEle = helper_1.getElement(titleId);
                    anchor = textEle.getAttribute('text-anchor');
                    expect(anchor === 'end').toBe(true);
                    done();
                };
                accumulation.enableRtl = true;
                accumulation.refresh();
            });
            it('Subtitle anchor with RTL', function (done) {
                accumulation.loaded = function (args) {
                    textEle = helper_1.getElement(subTitleId);
                    anchor = textEle.getAttribute('text-anchor');
                    expect(anchor === 'start').toBe(true);
                    done();
                };
                accumulation.refresh();
            });
        });
    });
});
