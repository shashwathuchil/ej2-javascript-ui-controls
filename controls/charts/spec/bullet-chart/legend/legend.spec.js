define(["require", "exports", "../../../src/bullet-chart/index", "@syncfusion/ej2-base", "../../chart/base/events.spec"], function (require, exports, index_1, ej2_base_1, events_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    index_1.BulletChart.Inject(index_1.BulletChartLegend);
    var multipleData = [
        {
            value: 9.5, comparativeMeasureValue: 7.5,
            category: '2001'
        },
        {
            value: 9.5, comparativeMeasureValue: 5,
            category: '2002'
        },
        {
            value: 9.5, comparativeMeasureValue: 6,
            category: '2003'
        },
        {
            value: 9.5, comparativeMeasureValue: 8,
            category: '2004'
        },
        {
            value: 9.5, comparativeMeasureValue: 5,
            category: '2005'
        },
        {
            value: 9.5, comparativeMeasureValue: 6,
            category: '2006'
        }
    ];
    var multiTarget = [{ value: 7, target: [8, 12, 15, 16] }];
    var rangeCollection = [{ end: 5.2, opacity: 1, color: 'skyblue', name: 'Poor' },
        { end: 7.3, opacity: 1, color: 'lawngreen', name: 'AVG ' },
        { end: 20, opacity: 1, color: 'red', name: 'Good ' }
    ];
    describe('Bullet Chart Scale', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('with default rendering', function () {
            var bullet;
            var legendElement;
            var range1;
            var range2;
            var range3;
            var value;
            var count = 0;
            var loaded;
            var trigger = new events_spec_1.MouseEvents();
            var bulletElement = ej2_base_1.createElement('div', { id: 'container' });
            var legendId = bulletElement.id + '_chart_legend';
            beforeAll(function () {
                document.body.appendChild(bulletElement);
                bullet = new index_1.BulletChart({
                    dataSource: [{ value: 7, target: 8 }],
                    ranges: [{ end: 5.2, opacity: 1, color: 'skyblue', name: 'Poor' },
                        { end: 7.3, opacity: 1, color: 'lawngreen', name: 'AVG ' },
                        { end: 20, opacity: 1, color: 'red', name: 'Good ' }
                    ],
                    minimum: 0, maximum: 20, interval: 5,
                    valueField: 'value', targetField: 'target',
                    animation: { enable: false },
                    legendSettings: { visible: true }
                });
                bullet.appendTo('#container');
            });
            afterAll(function () {
                bullet.destroy();
                bulletElement.remove();
            });
            it('Single Series Static Name and Multiple series legend text', function (done) {
                loaded = function (args) {
                    bullet.loaded = null;
                    legendElement = document.getElementById(legendId + '_text_0');
                    expect(legendElement.textContent).toEqual('RangeOnetesting');
                    for (var i = 0, length_1 = bullet.ranges.length; i < length_1; i++) {
                        legendElement = document.getElementById(legendId + '_text_' + i);
                        expect(legendElement.textContent).toEqual(bullet.ranges[i].name);
                    }
                    done();
                };
                bullet.ranges[0].name = 'RangeOnetesting';
                bullet.loaded = loaded;
                bullet.refresh();
            });
            it('Style fill, height, width', function (done) {
                loaded = function (args) {
                    bullet.loaded = null;
                    for (var i = 0, length_2 = bullet.ranges.length; i < length_2; i++) {
                        legendElement = document.getElementById(legendId + '_shape_' + i);
                        if (i % 5 === 0 && i !== 0) {
                            expect(legendElement.getAttribute('fill')).toEqual('lightgray');
                        }
                        else {
                            expect(legendElement.getAttribute('fill')).toEqual(bullet.ranges[i].color);
                        }
                        expect(legendElement.getAttribute('d')).not.toEqual('');
                    }
                    done();
                };
                bullet.legendSettings = {
                    border: { color: 'red', width: 1 },
                    shapePadding: 8, shapeHeight: 10, shapeWidth: 10,
                    position: 'Right'
                };
                bullet.loaded = loaded;
                bullet.refresh();
            });
            it('Style font, background, padding', function (done) {
                loaded = function (args) {
                    bullet.loaded = null;
                    var legendgroup = document.getElementById(legendId + '_element');
                    expect(legendgroup.getAttribute('fill')).toEqual('gray');
                    legendElement = document.getElementById(legendId + '_shape_0');
                    var d = legendElement.getAttribute('d').split(' ');
                    expect(Number(d[7]) - Number(d[1])).toBe(10);
                    expect(Number(d[8]) - Number(d[2])).toBe(10);
                    legendElement = document.getElementById(legendId + '_text_0');
                    expect(legendElement.getAttribute('x')).toEqual('39');
                    expect(legendElement.getAttribute('font-size')).toEqual(bullet.legendSettings.textStyle.size);
                    expect(legendElement.getAttribute('fill')).toEqual(bullet.legendSettings.textStyle.color);
                    expect(parseFloat(legendElement.getAttribute('opacity'))).toEqual(bullet.legendSettings.textStyle.opacity);
                    expect(legendElement.getAttribute('font-style')).toEqual(bullet.legendSettings.textStyle.fontStyle);
                    expect(legendElement.getAttribute('font-family')).toEqual(bullet.legendSettings.textStyle.fontFamily);
                    expect(legendElement.getAttribute('font-weight')).toEqual(bullet.legendSettings.textStyle.fontWeight);
                    done();
                };
                bullet.legendSettings = {
                    shapePadding: 4, border: { color: 'red', width: 5 }, padding: 10,
                    textStyle: {
                        size: '12px', color: 'Blue', opacity: 0.5, fontStyle: 'italic', fontFamily: 'Lucida Console',
                        fontWeight: 'bold'
                    },
                    background: 'gray', alignment: 'Near',
                    position: 'Bottom',
                };
                bullet.ranges[0].shape = 'Rectangle';
                bullet.loaded = loaded;
                bullet.refresh();
            });
            it('Bottom Position', function (done) {
                loaded = function (args) {
                    bullet.loaded = null;
                    legendElement = document.getElementById(legendId + '_element');
                    value = parseInt(legendElement.getAttribute('x'), 10);
                    expect(value === 439.5 || value === 439 || value === 187 || value === 219).toBe(true);
                    value = parseInt(legendElement.getAttribute('y'), 10);
                    expect(value === 89 || value === 99 || value === 96).toBe(true);
                    done();
                };
                bullet.legendSettings = {
                    position: 'Bottom', alignment: 'Center',
                };
                bullet.loaded = loaded;
                bullet.refresh();
            });
            it('Custom X and Y Position', function (done) {
                loaded = function (args) {
                    bullet.loaded = null;
                    legendElement = document.getElementById(legendId + '_element');
                    var container = document.getElementById(bulletElement.id + '_svg');
                    expect(parseInt(legendElement.getAttribute('x'), 10)).toBe(100);
                    expect(parseInt(legendElement.getAttribute('y'), 10)).toBe(100);
                    done();
                };
                bullet.legendSettings = {
                    position: 'Custom',
                    location: { x: 100, y: 100 }
                };
                bullet.loaded = loaded;
                bullet.refresh();
            });
            it('Right Position', function (done) {
                loaded = function (args) {
                    bullet.loaded = null;
                    legendElement = document.getElementById(legendId + '_element');
                    value = parseInt(legendElement.getAttribute('x'), 10);
                    expect(value === 597 || value === 1103 || value === 635).toBe(true);
                    expect(parseInt(legendElement.getAttribute('y'), 10)).toBe(26);
                    done();
                };
                bullet.legendSettings = {
                    position: 'Right',
                };
                bullet.loaded = loaded;
                bullet.refresh();
            });
            it('Top Position', function (done) {
                loaded = function (args) {
                    bullet.loaded = null;
                    legendElement = document.getElementById(legendId + '_element');
                    value = parseInt(legendElement.getAttribute('x'), 10);
                    expect(value == 439.5 || value === 439 || value === 187 || value === 219).toBe(true);
                    expect(parseInt(legendElement.getAttribute('y'), 10)).toBe(20);
                    done();
                };
                bullet.legendSettings = {
                    position: 'Top',
                };
                bullet.loaded = loaded;
                bullet.refresh();
            });
            it('Top Position With Title', function (done) {
                loaded = function (args) {
                    bullet.loaded = null;
                    legendElement = document.getElementById(legendId + '_element');
                    value = parseInt(legendElement.getAttribute('x'), 10);
                    console.log(value);
                    expect(value == 439.5 || value === 439 || value == 187 || value === 219).toBe(true);
                    value = parseInt(legendElement.getAttribute('y'), 10);
                    expect(value === 42 || value === 50).toBe(true);
                    done();
                };
                bullet.title = 'Chart Legend Spec Title';
                bullet.legendSettings = {
                    position: 'Top',
                };
                bullet.loaded = loaded;
                bullet.refresh();
            });
            it('Left Position', function (done) {
                loaded = function (args) {
                    bullet.loaded = null;
                    legendElement = document.getElementById(legendId + '_element');
                    expect(parseInt(legendElement.getAttribute('x'), 10)).toBe(15);
                    var y = parseInt(legendElement.getAttribute('y'), 10);
                    expect(y === 166 || y === 48).toBe(true);
                    done();
                };
                bullet.legendSettings = {
                    position: 'Left',
                };
                bullet.loaded = loaded;
                bullet.refresh();
            });
            it('Legend Page Navigation Down and Up for vertical orientation', function (done) {
                loaded = function (args) {
                    bullet.loaded = null;
                    legendElement = document.getElementById(legendId + '_pagedown');
                    var pagenumber;
                    var downclick = 3;
                    for (var i = 1; i < downclick; i++) {
                        trigger.clickEvent(legendElement);
                        pagenumber = parseInt((document.getElementById(legendId + '_pagenumber').textContent.split('/')[0]), 10);
                    }
                    legendElement = document.getElementById(legendId + '_pageup');
                    var upclick = 1;
                    for (var i = 1; i <= upclick; i++) {
                        trigger.clickEvent(legendElement);
                        pagenumber = parseInt((document.getElementById(legendId + '_pagenumber').textContent.split('/')[0]), 10);
                    }
                    expect(pagenumber).toBe(downclick - upclick);
                    trigger.clickEvent(legendElement);
                    done();
                };
                bullet.ranges = rangeCollection;
                bullet.legendSettings = {
                    position: 'Right', alignment: 'Near',
                };
                bullet.loaded = loaded;
                bullet.refresh();
            });
            it('Legend Page Navigation Down and Up for horizontal orientation', function () {
                bullet.legendSettings = {
                    position: 'Bottom', alignment: 'Near',
                };
                bullet.dataBind();
                legendElement = document.getElementById(legendId + '_pagedown');
                var pagenumber;
                var downclick = 3;
                for (var i = 1; i < downclick; i++) {
                    trigger.clickEvent(legendElement);
                    pagenumber = parseInt((document.getElementById(legendId + '_pagenumber').textContent.split('/')[0]), 10);
                }
                legendElement = document.getElementById(legendId + '_pageup');
                var upclick = 1;
                for (var i = 1; i <= upclick; i++) {
                    trigger.clickEvent(legendElement);
                    pagenumber = parseInt((document.getElementById(legendId + '_pagenumber').textContent.split('/')[0]), 10);
                }
                trigger.clickEvent(legendElement);
            });
            it('Legend Alignment Far placing for Horizontal', function (done) {
                loaded = function (args) {
                    bullet.loaded = null;
                    legendElement = document.getElementById(legendId + '_element');
                    value = parseInt(legendElement.getAttribute('x'), 10);
                    expect(value === 441 || value === 946 || value === 484).toBe(true);
                    value = parseInt(legendElement.getAttribute('y'), 10);
                    expect(value === 89 || value === 99 || value === 96).toBe(true);
                    done();
                };
                bullet.legendSettings = { position: 'Bottom', alignment: 'Far' };
                bullet.loaded = loaded;
                bullet.refresh();
            });
            it('Legend Alignment Far placing for Vertical', function (done) {
                loaded = function (args) {
                    bullet.loaded = null;
                    legendElement = document.getElementById(legendId + '_element');
                    expect(parseInt(legendElement.getAttribute('x'), 10)).toBe(15);
                    expect(parseInt(legendElement.getAttribute('y'), 10)).toBe(59);
                    done();
                };
                bullet.legendSettings = { position: 'Left', alignment: 'Far' };
                bullet.loaded = loaded;
                bullet.refresh();
            });
            it('Veritcal orientation bullet chart with Legend', function (done) {
                loaded = function (args) {
                    bullet.loaded = null;
                    legendElement = document.getElementById(legendId + '_element');
                    value = parseInt(legendElement.getAttribute('x'), 10);
                    expect(value === 44 || value === 15).toBe(true);
                    value = parseInt(legendElement.getAttribute('y'), 10);
                    expect(value === 178.5 || value === 178 || value === 171).toBe(true);
                    done();
                };
                bullet.legendSettings = { position: 'Left', alignment: 'Center' };
                bullet.orientation = 'Vertical';
                bullet.loaded = loaded;
                bullet.refresh();
            });
            it('Legend with background', function (done) {
                loaded = function (args) {
                    bullet.loaded = null;
                    legendElement = document.getElementById(legendId + '_element');
                    expect((legendElement.getAttribute('stroke'))).toBe('red');
                    done();
                };
                bullet.legendSettings = { position: 'Left', alignment: 'Center', background: 'red' };
                bullet.orientation = 'Vertical';
                bullet.loaded = loaded;
                bullet.refresh();
            });
            it('Checking with multiple target types', function (done) {
                loaded = function (args) {
                    bullet.loaded = null;
                    legendElement = document.getElementById('container_chart_legend_translate_g');
                    expect(legendElement.lastElementChild.childElementCount).toBe(2);
                    legendElement = document.getElementById('container_chart_legend_shape_6');
                    expect(legendElement.getAttribute('rx')).toBe('4');
                    done();
                };
                bullet.orientation = 'Vertical';
                bullet.dataSource = multiTarget;
                bullet.loaded = loaded;
                bullet.refresh();
            });
            it('Checking with multiple data', function (done) {
                loaded = function (args) {
                    bullet.loaded = null;
                    legendElement = document.getElementById('container_chart_legend_translate_g');
                    expect(legendElement.childElementCount).toBe(5);
                    done();
                };
                bullet.dataSource = multipleData;
                bullet.targetField = 'comparativeMeasureValue';
                bullet.loaded = loaded;
                bullet.refresh();
            });
            it('Checking with multiple target types in horizontal mode', function (done) {
                loaded = function (args) {
                    bullet.loaded = null;
                    legendElement = document.getElementById('container_chart_legend_pagenumber');
                    expect(legendElement.textContent === '1/2' || legendElement.textContent === '1/4').toBe(true);
                    legendElement = document.getElementById('container_chart_legend_shape_3');
                    expect(legendElement.getAttribute('rx')).toBe('4');
                    done();
                };
                bullet.orientation = 'Horizontal';
                bullet.dataSource = multiTarget;
                bullet.targetField = 'target';
                bullet.ranges = [{ end: 10 }, { end: 12 }, { end: 20 }];
                bullet.legendSettings.position = 'Right';
                bullet.loaded = loaded;
                bullet.refresh();
            });
            it('Checking with target color as empty', function (done) {
                loaded = function (args) {
                    bullet.loaded = null;
                    legendElement = document.getElementById('container_chart_legend_shape_0');
                    expect(legendElement.getAttribute('fill')).toBe('black');
                    done();
                };
                bullet.targetColor = null;
                bullet.legendSettings.background = 'transparent';
                bullet.loaded = loaded;
                bullet.refresh();
            });
            it('Checking with range color as empty', function (done) {
                loaded = function (args) {
                    bullet.loaded = null;
                    legendElement = document.getElementById('container_chart_legend_shape_0');
                    expect(legendElement.getAttribute('fill')).toBe('black');
                    done();
                };
                bullet.ranges = [{ end: 10, color: null }, { end: 12, color: null }, { end: 20, color: null }];
                bullet.loaded = loaded;
                bullet.refresh();
            });
        });
    });
});
