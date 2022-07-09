define(["require", "exports", "@syncfusion/ej2-base", "@syncfusion/ej2-data", "../../../src/index", "../../chart/base/data.spec", "../../chart/base/events.spec", "../../common.spec", "../../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_base_1, ej2_data_1, index_1, data_spec_1, events_spec_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    index_1.AccumulationChart.Inject(index_1.AccumulationLegend, index_1.AccumulationSelection, index_1.AccumulationTooltip, index_1.AccumulationAnnotation, index_1.AccumulationDataLabel);
    describe('Accumulation Chart Control', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('accumulation on-property-change checking on', function () {
            var element;
            var loaded;
            var svgObject;
            var text;
            var id = 'acc-chart';
            var accumulation;
            var dataManager = new ej2_data_1.DataManager({
                url: 'http://mvc.syncfusion.com/Services/Northwnd.svc/Tasks/'
            });
            var query = new ej2_data_1.Query().take(5).where('Estimate', 'greaterThan', 0, false);
            var trigger = new events_spec_1.MouseEvents();
            var colors = ['blue', 'green', 'orange', 'purple', 'yellow', 'red'];
            beforeAll(function () {
                element = ej2_base_1.createElement('div', { id: id });
                document.body.appendChild(element);
                accumulation = new index_1.AccumulationChart({
                    title: 'Accumulation',
                    enableSmartLabels: false,
                    series: [
                        {
                            type: 'Pie', palettes: colors,
                            dataLabel: { visible: false, name: 'text' },
                            dataSource: data_spec_1.piedata.slice(0, 5), animation: { enable: false }, xName: 'x', yName: 'y'
                        }
                    ], width: '600', height: '400', legendSettings: { visible: false }
                });
            });
            afterAll(function () {
                accumulation.destroy();
                index_1.removeElement(id);
            });
            it('Point checking on loaded event', function (done) {
                accumulation.loaded = function (args) {
                    expect(accumulation.visibleSeries[0].points.length).toBe(5);
                    expect(accumulation.visibleSeries[0].points[0].color).toBe('blue');
                    done();
                };
                accumulation.appendTo('#' + id);
            });
            it('Title change checking', function (done) {
                accumulation.title = '';
                accumulation.loaded = null;
                var clipRect = accumulation.initialClipRect;
                accumulation.dataBind();
                expect(accumulation.initialClipRect).not.toBe(clipRect);
                done();
            });
            it('height, width, margin change checking', function (done) {
                accumulation.height = '500';
                accumulation.width = '500';
                accumulation.margin.left = accumulation.margin.right = accumulation.margin.top = accumulation.margin.bottom = 5;
                expect(accumulation.initialClipRect.x).not.toBe(5);
                expect(accumulation.initialClipRect.y).not.toBe(5);
                expect(accumulation.initialClipRect.height).not.toBe(490);
                expect(accumulation.initialClipRect.width).not.toBe(490);
                accumulation.dataBind();
                expect(accumulation.initialClipRect.x).toBe(5);
                expect(accumulation.initialClipRect.y).toBe(5);
                expect(accumulation.initialClipRect.height).toBe(490);
                expect(accumulation.initialClipRect.width).toBe(490);
                done();
            });
            it('background, border change checking', function (done) {
                accumulation.background = 'lightgray';
                accumulation.border = { color: '#33CCFF', width: 2 };
                accumulation.dataBind();
                var border = index_1.getElement('acc-chart_border');
                expect(border.getAttribute('fill')).toBe('lightgray');
                expect(border.getAttribute('stroke')).toBe('#33CCFF');
                expect(border.getAttribute('stroke-width')).toBe('2');
                done();
            });
            it('dataLabel visible change checking', function (done) {
                accumulation.series[0].dataLabel.visible = true;
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    var dataLabel = index_1.getElement('acc-chart_datalabel_Series_0_text_1');
                    expect(dataLabel.textContent).toBe('Bison : 23');
                    done();
                };
                accumulation.refresh();
            });
            it('datasource change and datalabel changed checking', function (done) {
                accumulation.series[0].dataSource = data_spec_1.piedata;
                expect(accumulation.visibleSeries[0].points.length).toBe(5);
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    expect(accumulation.visibleSeries[0].points.length).toBe(10);
                    var dataLabel = index_1.getElement('acc-chart_datalabel_Series_0_text_9');
                    expect(dataLabel.textContent).toBe('Beaver : 102');
                    done();
                };
                accumulation.refresh();
            });
            it('enableSmartLabels change checking', function (done) {
                accumulation.enableSmartLabels = true;
                var dataLabel = index_1.getElement('acc-chart_datalabel_Series_0_text_0');
                var temp = parseInt(dataLabel.getAttribute('x'), 10);
                expect(temp === 225 || temp === 226).toBe(true);
                temp = parseInt(dataLabel.getAttribute('y'), 10);
                expect(temp === 157 || temp === 156).toBe(true);
                dataLabel = index_1.getElement('acc-chart_datalabel_Series_0_text_1');
                temp = parseInt(dataLabel.getAttribute('x'), 10);
                expect(temp === 257 || temp === 258).toBe(true);
                temp = parseInt(dataLabel.getAttribute('y'), 10);
                expect(temp === 161 || temp === 160).toBe(true);
                accumulation.dataBind();
                dataLabel = index_1.getElement('acc-chart_datalabel_Series_0_text_0');
                temp = parseInt(dataLabel.getAttribute('x'), 10);
                expect(temp === 225 || temp === 226).toBe(true);
                temp = parseInt(dataLabel.getAttribute('y'), 10);
                expect(temp === 157 || temp === 156).toBe(true);
                dataLabel = index_1.getElement('acc-chart_datalabel_Series_0_text_1');
                temp = parseInt(dataLabel.getAttribute('x'), 10);
                expect(temp === 326 || temp === 327).toBe(true);
                temp = parseInt(dataLabel.getAttribute('y'), 10);
                expect(temp === 60 || temp === 59).toBe(true);
                done();
            });
            it('Selection change checking', function (done) {
                accumulation.selectedDataIndexes = [
                    {
                        series: 0, point: 3
                    }, {
                        series: 0, point: 7
                    }
                ];
                accumulation.selectionMode = 'Point';
                accumulation.isMultiSelect = true;
                accumulation.dataBind();
                var slice = index_1.getElement('acc-chart_Series_0_Point_3');
                expect(slice.getAttribute('class')).toBe('acc-chart_ej2_chart_selection_series_0');
                slice = index_1.getElement('acc-chart_Series_0_Point_5');
                expect(slice.getAttribute('class')).toBe('acc-chart_ej2_deselected');
                slice = index_1.getElement('acc-chart_Series_0_Point_7');
                expect(slice.getAttribute('class')).toBe('acc-chart_ej2_chart_selection_series_0');
                done();
            });
            it('Multiple Selection false change checking', function (done) {
                accumulation.isMultiSelect = false;
                accumulation.dataBind();
                var slice = index_1.getElement('acc-chart_Series_0_Point_3');
                expect(slice.getAttribute('class')).toBe('acc-chart_ej2_deselected');
                slice = index_1.getElement('acc-chart_Series_0_Point_7');
                expect(slice.getAttribute('class')).toBe('acc-chart_ej2_chart_selection_series_0');
                done();
            });
            it('Annotation change checking', function (done) {
                accumulation.annotations = [
                    {
                        content: '<div>Accumulation-Annotation</div>'
                    }
                ];
                accumulation.locale = 'de';
                var annotation = index_1.getElement('acc-chart_Secondary_Element');
                expect(annotation.childElementCount).toBe(0);
                accumulation.dataBind();
                annotation = index_1.getElement('acc-chart_Secondary_Element');
                expect(annotation.childElementCount).toBe(1);
                annotation = index_1.getElement('acc-chart_Secondary_Element');
                expect(annotation.children[0].id).toBe('acc-chart_Annotation_Collections');
                expect(annotation.children[0].children[0].id).toBe('acc-chart_Annotation_0');
                done();
            });
            it('Legend change checking', function (done) {
                accumulation.annotations = [];
                accumulation.legendSettings.visible = true;
                accumulation.legendSettings.opacity = 0.7;
                accumulation.legendSettings.background = 'white';
                expect(accumulation.initialClipRect.x).toBe(5);
                expect(accumulation.initialClipRect.y).toBe(5);
                expect(accumulation.initialClipRect.height).toBe(490);
                expect(accumulation.initialClipRect.width).toBe(490);
                accumulation.dataBind();
                expect(accumulation.initialClipRect.x).toBe(5);
                expect(accumulation.initialClipRect.y).toBe(5);
                expect(accumulation.initialClipRect.height).not.toBe(490);
                expect(accumulation.initialClipRect.width).toBe(490);
                var legend = index_1.getElement('acc-chart_chart_legend_translate_g');
                expect(legend.childNodes.length).toBe(10);
                done();
            });
            it('Legend shape change checking', function (done) {
                accumulation.series[0].legendShape = 'Diamond';
                var path = index_1.getElement('acc-chart_chart_legend_shape_0').getAttribute('d');
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    var path1 = index_1.getElement('acc-chart_chart_legend_shape_0').getAttribute('d');
                    expect(path1).not.toBe(path);
                    expect(path1.split('L').length).toBe(5);
                    var legend = index_1.getElement('acc-chart_chart_legend_translate_g');
                    expect(legend.childNodes.length).toBe(10);
                    done();
                };
                accumulation.refresh();
            });
            it('Series palettes change checking', function (done) {
                accumulation.selectionMode = 'None';
                accumulation.series[0].palettes = ['skyblue', 'lightgreen', 'turquoise', 'teal', 'indigo', 'coral'];
                var slice = index_1.getElement('acc-chart_Series_0_Point_3');
                expect(slice.getAttribute('fill')).toBe('purple');
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    slice = index_1.getElement('acc-chart_Series_0_Point_3');
                    expect(slice.getAttribute('fill')).toBe('teal');
                    done();
                };
                accumulation.refresh();
            });
            it('Empty point data changing', function (done) {
                accumulation.series[0].dataSource = [
                    { x: 1, y: 15 }, { x: 2, y: 25 }, { x: 3, y: null }, { x: 4, y: 12 }, { x: 5, y: 18 },
                ];
                var slice = index_1.getElement('acc-chart_Series_0_Point_2');
                expect(slice).not.toBe(null);
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    slice = index_1.getElement('acc-chart_Series_0_Point_2');
                    expect(slice.getAttribute('d')).toBe('');
                    done();
                };
                accumulation.refresh();
            });
            it('Empty point mode changing', function (done) {
                accumulation.series[0].emptyPointSettings.mode = 'Average';
                var slice = index_1.getElement('acc-chart_Series_0_Point_2');
                expect(slice.getAttribute('d')).toBe('');
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    slice = index_1.getElement('acc-chart_Series_0_Point_2');
                    expect(slice.getAttribute('d')).not.toBe(null);
                    var label = index_1.getElement('acc-chart_datalabel_Series_0_text_2');
                    expect(label.textContent).toBe('18.5');
                    done();
                };
                accumulation.refresh();
            });
            it('Group To value changing', function (done) {
                accumulation.series[0].groupTo = '15';
                var slice = index_1.getElement('acc-chart_Series_0');
                expect(slice.childNodes.length).toBe(5);
                accumulation.loaded = function (args) {
                    accumulation.loaded = null;
                    slice = index_1.getElement('acc-chart_Series_0');
                    expect(slice.childNodes.length).toBe(4);
                    var label = index_1.getElement('acc-chart_datalabel_Series_0_text_3');
                    expect(label.textContent).toBe('Others: 27');
                    done();
                };
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
    });
});
