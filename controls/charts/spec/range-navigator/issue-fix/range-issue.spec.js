define(["require", "exports", "../../../src/index", "@syncfusion/ej2-base", "@syncfusion/ej2-data"], function (require, exports, index_1, ej2_base_1, ej2_data_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    index_1.RangeNavigator.Inject(index_1.DateTime);
    describe('Range Navigator Issue fixes', function () {
        describe('DataSource', function () {
            var rangeControl;
            var rangeElement;
            var testElement;
            var data = [{ x: new Date(2000, 2, 4), y: 23 }, { x: new Date(2010, 2, 4), y: 23 }];
            rangeElement = ej2_base_1.createElement('div', { id: 'rangeContainer' });
            document.body.appendChild(rangeElement);
            beforeAll(function () {
                rangeControl = new index_1.RangeNavigator();
            });
            afterAll(function () {
                rangeControl.destroy();
                rangeElement.remove();
            });
            it('checking with lightweight', function (done) {
                rangeControl.loaded = function (args) {
                    testElement = document.getElementById('rangeContainer');
                    expect(testElement.classList.contains('e-control')).toBe(true);
                    expect(testElement.classList.contains('e-rangenavigator')).toBe(true);
                    testElement = document.getElementById('rangeContainer_FirstLevelAxisLabels');
                    expect(testElement.firstChild.textContent).toEqual('0');
                    expect(testElement.lastChild.textContent).toEqual('5');
                    done();
                };
                rangeControl.appendTo('#rangeContainer');
            });
            it('checking with dataManager in direct', function (done) {
                rangeControl.loaded = function (args) {
                    testElement = document.getElementById('rangeContainer_chart');
                    expect(testElement.childElementCount).toEqual(0);
                    done();
                };
                rangeControl.valueType = 'DateTime';
                rangeControl.dataSource = new ej2_data_1.DataManager(data);
                rangeControl.xName = 'x';
                rangeControl.yName = 'y';
                rangeControl.refresh();
            });
            it('checking with dataManager in series', function (done) {
                rangeControl.loaded = function (args) {
                    testElement = document.getElementById('rangeContainer');
                    expect(args.rangeNavigator.element.childElementCount).not.toEqual(0);
                    done();
                };
                rangeControl.valueType = 'DateTime';
                rangeControl.series = [{ dataSource: new ej2_data_1.DataManager(data), xName: 'x', yName: 'y' }];
                rangeControl.refresh();
            });
            it('checking with background color', function (done) {
                rangeControl.loaded = function (args) {
                    rangeElement = document.getElementById('rangeContainer_ChartBorder');
                    expect(rangeElement.getAttribute("fill")).toEqual("red");
                    done();
                };
                rangeControl.background = 'red';
                rangeControl.refresh();
            });
        });
    });
});
