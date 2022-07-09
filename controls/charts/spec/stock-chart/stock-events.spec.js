define(["require", "exports", "../../src/chart/index", "../../src/stock-chart/index", "@syncfusion/ej2-base", "./indicatordata.spec", "../chart/base/events.spec"], function (require, exports, index_1, index_2, ej2_base_1, indicatordata_spec_1, events_spec_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    index_2.StockChart.Inject(index_1.CandleSeries, index_1.DateTime);
    describe('default stock chart', function () {
        var stockchart;
        var chartElement = ej2_base_1.createElement('div', { id: 'stockEvents' });
        var element;
        var trigger = new events_spec_1.MouseEvents();
        var pointLocation;
        beforeAll(function () {
            document.body.appendChild(chartElement);
            stockchart = new index_2.StockChart({
                primaryXAxis: { valueType: 'DateTime' },
                series: [{
                        xName: 'x', high: 'high', low: 'low', open: 'open', close: 'close',
                        dataSource: indicatordata_spec_1.chartData, type: 'Candle', yName: 'close'
                    }],
            });
        });
        afterAll(function () {
            stockchart.destroy();
            chartElement.remove();
        });
        it('Checking stock chart instance creation', function (done) {
            stockchart.loaded = function (args) {
                expect(stockchart != null).toBe(true);
                done();
            };
            stockchart.appendTo('#stockEvents');
        });
        it('checking with default stock events', function (done) {
            stockchart.loaded = function (args) {
                element = index_1.getElement(chartElement.id + '_StockEvents');
                expect(element.childElementCount).toBe(1);
                done();
            };
            stockchart.stockEvents = [{ date: new Date(2017, 2, 31), text: 'Market' }];
            stockchart.refresh();
        });
        it('checking with stock events with arrow shapes', function (done) {
            stockchart.loaded = function (args) {
                element = index_1.getElement(chartElement.id + '_StockEvents');
                expect(element.childElementCount).toBe(4);
                document.getElementById('stockEvents_Series_0_StockEvents_1_Shape').dispatchEvent(new MouseEvent('mousemove'));
                done();
            };
            stockchart.stockEvents = [
                { date: new Date(2017, 2, 31), text: 'A', type: 'ArrowDown', description: 'Add your text' },
                { date: new Date(2017, 3, 31), text: 'B', type: 'ArrowUp', description: 'Longer text' },
                { date: new Date(2017, 4, 31), text: 'C', type: 'ArrowRight', description: 'Market starts' },
                { date: new Date(2017, 5, 31), text: 'D', type: 'ArrowLeft', description: 'Marker ends' }
            ];
            stockchart.refresh();
        });
        it('checking with stock events tooltip', function (done) {
            stockchart.loaded = function (args) {
                element = index_1.getElement(chartElement.id + '_StockEvents');
                expect(element.childElementCount).toBe(1);
                pointLocation = stockchart.stockEvent.symbolLocations[0][0];
                trigger.mousemovetEvent(element.childNodes[0], pointLocation.x, pointLocation.y + 40);
                expect(index_1.getElement('stockEvents_StockEvents_Tooltip_text').textContent).toEqual('Stock events tooltip');
                done();
            };
            stockchart.stockEvents = [{ date: new Date(2017, 2, 31), text: 'Market', description: 'Stock events tooltip' }];
            stockchart.refresh();
        });
        it('checking with successive tooltip cases', function (done) {
            stockchart.loaded = function (args) {
                element = index_1.getElement(chartElement.id + '_StockEvents');
                expect(element.childElementCount).toBe(4);
                pointLocation = stockchart.stockEvent.symbolLocations[0][13];
                trigger.mousemovetEvent(element.childNodes[0], pointLocation.x, pointLocation.y + 40);
                expect(index_1.getElement('stockEvents_Series_0_StockEvents_13_Text').textContent).toEqual('A');
                expect(index_1.getElement('stockEvents_StockEvents_Tooltip_text').textContent).toEqual('This is event description');
                pointLocation = stockchart.stockEvent.symbolLocations[0][14];
                expect(index_1.getElement('stockEvents_Series_0_StockEvents_14_Text').textContent).toEqual('C');
                trigger.mousemovetEvent(element.childNodes[1], pointLocation.x, pointLocation.y + 40);
                expect(index_1.getElement('stockEvents_StockEvents_Tooltip_text').textContent).toEqual('Add longer text');
                done();
            };
            stockchart.stockEvents = [
                { date: new Date(2012, 3, 1), text: 'Q2', description: '2012 Quarter2 starts', type: 'Square' },
                { date: new Date(2012, 6, 1), text: 'Q3', description: '2012 Quarter3 starts' },
                { date: new Date(2012, 9, 1), text: 'Q4', description: '2012 Quarter3 starts', type: 'Flag' },
                { date: new Date(2012, 12, 0), text: 'Q1', description: '2013 Quarter1 starts', type: 'Pin', showOnSeries: false },
                { date: new Date(2013, 3, 1), text: 'Q2', description: '2013 Quarter2 starts', type: 'Square' },
                { date: new Date(2013, 6, 1), text: 'Q3', description: '2013 Quarter3 starts' },
                { date: new Date(2013, 9, 1), text: 'Q4', description: '2013 Quarter3 starts', type: 'Flag' },
                { date: new Date(2013, 12, 0), text: 'Q1', description: '2014 Quarter1 starts', type: 'Pin', showOnSeries: false },
                { date: new Date(2014, 3, 1), text: 'Q2', description: '2014 Quarter2 starts', type: 'Square' },
                { date: new Date(2014, 6, 1), text: 'Q3', description: '2014 Quarter3 starts' },
                { date: new Date(2014, 9, 1), text: 'Q4', description: '2014 Quarter3 starts', type: 'Flag' },
                { date: new Date(2014, 12, 0), text: 'Q1', description: '2015 Quarter1 starts', type: 'Pin', showOnSeries: false },
                { date: new Date(2014, 2, 2), text: 'End', description: 'Markets closed', type: 'Flag' },
                { date: new Date('2017-01-07'), text: 'A', description: 'This is event description', type: 'Circle' },
                { date: new Date(2017, 1, 2), text: 'C', description: 'Add longer text', type: 'Square' },
                { date: new Date(2017, 2, 2), text: 'D', description: 'Stock events', type: 'Flag' },
                { date: new Date(2017, 2, 12), text: 'Market', description: 'Markets closed', type: 'Pin' },
            ];
            stockchart.series[0].dataSource = indicatordata_spec_1.chartData;
            stockchart.refresh();
        });
        it('checking with mouse move in the same element', function () {
            trigger.mousemovetEvent(element.childNodes[1], pointLocation.x + 10, pointLocation.y + 40);
            expect(index_1.getElement('stockEvents_StockEvents_Tooltip_text').textContent).toEqual('Add longer text');
            trigger.mousemoveEvent(index_1.getElement('stockEvents'), 200, 200, 100, 100);
        });
        it('checking with stock event colors', function (done) {
            stockchart.loaded = function () {
                element = index_1.getElement('stockEvents_Series_0_StockEvents_0_Shape');
                expect(element.getAttribute('fill')).toBe('black');
                expect(element.getAttribute('stroke')).toBe('red');
                done();
            };
            stockchart.series[0].dataSource = indicatordata_spec_1.chartData;
            stockchart.stockEvents = [
                { date: new Date('2017-01-07'), text: 'A', description: 'This is event description', type: 'Triangle',
                    textStyle: { color: 'white' }, background: 'black', border: { color: 'red' } },
                { date: new Date(2017, 1, 2), text: 'C', description: 'Add longer text', type: 'InvertedTriangle' },
                { date: new Date(2017, 2, 2), text: 'D', description: 'Stock events', type: 'Flag' },
                { date: new Date(2017, 2, 12), text: 'Market', description: 'Markets closed', type: 'Text' },
            ];
            stockchart.refresh();
        });
        it('checking with stock event for particular series', function (done) {
            stockchart.loaded = function () {
                element = index_1.getElement('stockEvents_Series_0_StockEvents_0_Shape');
                expect(element.getAttribute('fill')).toBe('black');
                expect(element.getAttribute('stroke')).toBe('red');
                done();
            };
            stockchart.series[0].dataSource = indicatordata_spec_1.chartData;
            stockchart.series[0].type = 'Line';
            stockchart.stockEvents = [
                { date: new Date('2017-01-07'), placeAt: 'y', text: 'A', description: 'This is event description', type: 'Triangle',
                    textStyle: { color: 'white' }, seriesIndexes: [0], background: 'black', border: { color: 'red' } },
                { date: new Date(2017, 1, 2), text: 'C', placeAt: 'y', description: 'Add longer text',
                    seriesIndexes: [0], type: 'InvertedTriangle' }
            ];
            stockchart.refresh();
        });
        it('checking with stock event render', function (done) {
            stockchart.loaded = function () {
                element = index_1.getElement(chartElement.id + '_StockEvents');
                expect(element.childElementCount).toBe(0);
                done();
            };
            stockchart.series[0].dataSource = indicatordata_spec_1.chartData;
            stockchart.stockEventRender = function (args) {
                args.cancel = true;
            };
            stockchart.stockEvents = [
                { date: new Date('2017-01-07'), text: 'A', description: 'This is event description', type: 'Triangle',
                    textStyle: { color: 'white' }, background: 'black', border: { color: 'red' } },
                { date: new Date(2017, 1, 2), text: 'C', description: 'Add longer text', type: 'InvertedTriangle' },
                { date: new Date(2017, 2, 2), text: 'D', description: 'Stock events', type: 'Flag' },
                { date: new Date(2017, 2, 12), text: 'Market', description: 'Markets closed', type: 'Text' },
            ];
            stockchart.refresh();
        });
    });
});
