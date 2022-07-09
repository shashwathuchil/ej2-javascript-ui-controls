define(["require", "exports", "../../../src/bullet-chart/index", "@syncfusion/ej2-base"], function (require, exports, index_1, ej2_base_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
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
            var svg;
            var range1;
            var range2;
            var range3;
            var bulletElement = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(bulletElement);
                bullet = new index_1.BulletChart({
                    dataSource: [{ value: 7, target: 8 }],
                    minimum: 0, maximum: 20, interval: 5,
                    valueField: 'value', targetField: 'target',
                    animation: { enable: false }
                });
                bullet.appendTo('#container');
            });
            afterAll(function () {
                bullet.destroy();
                bulletElement.remove();
            });
            it('Checking without ranges', function () {
                bullet.majorTickLines = { width: 2, color: '#424242' };
                bullet.dataBind();
                svg = document.getElementById('container_svg_range_0');
                expect(svg.getAttribute('width') == '0').toBe(true);
                expect(svg.getAttribute('height') == '79').toBe(true);
            });
            it('checking ranges with default color', function (done) {
                bullet.title = 'Testing Sample';
                bullet.ranges = [{ end: 5.2, opacity: 1 },
                    { end: 7.3, opacity: 1 },
                    { end: 20, opacity: 1 }
                ];
                bullet.dataBind();
                range1 = document.getElementById('container_svg_range_0');
                expect(range1.getAttribute('fill') == '#959595').toBe(true);
                range2 = document.getElementById('container_svg_range_1');
                expect(range2.getAttribute('fill') == '#BDBDBD').toBe(true);
                range3 = document.getElementById('container_svg_range_2');
                expect(range3.getAttribute('fill') == '#E3E2E2').toBe(true);
                done();
            });
            it('checking default feature bar and comparative bar', function (done) {
                bullet.title = 'Testing Sample';
                bullet.ranges = [{ end: 5.2, opacity: 1 },
                    { end: 7.3, opacity: 1 },
                    { end: 20, opacity: 1 }
                ];
                bullet.dataBind();
                range1 = document.getElementById('container_svg_FeatureMeasure_0');
                expect(range1.getAttribute('x') == '15').toBe(true);
                expect(range1.getAttribute('fill') == 'null').toBe(true);
                range2 = document.getElementById('container_svg_ComparativeMeasure_0');
                expect(range2.getAttribute('stroke-width') == '5').toBe(true);
                expect(range2.getAttribute('stroke') == '#191919').toBe(true);
                done();
            });
            it('Customization of feature bar', function (done) {
                bullet.title = 'Testing Sample';
                bullet.ranges = [{ end: 5.2, opacity: 1 },
                    { end: 7.3, opacity: 1 },
                    { end: 20, opacity: 1 }
                ];
                bullet.valueBorder.width = 4;
                bullet.valueBorder.color = 'red';
                bullet.valueFill = 'orange';
                bullet.valueHeight = 10;
                bullet.refresh();
                range1 = document.getElementById('container_svg_FeatureMeasure_0');
                expect(range1.getAttribute('x') == '15').toBe(true);
                expect(range1.getAttribute('fill') == 'orange').toBe(true);
                expect(range1.getAttribute('stroke-width') == '4').toBe(true);
                expect(range1.getAttribute('stroke') == 'red').toBe(true);
                done();
            });
            it('Customization of target bar', function (done) {
                bullet.title = 'Testing Sample';
                bullet.ranges = [{ end: 5.2, opacity: 1 },
                    { end: 7.3, opacity: 1 },
                    { end: 20, opacity: 1 }
                ];
                bullet.targetColor = 'green';
                bullet.targetWidth = 12;
                bullet.refresh();
                range1 = document.getElementById('container_svg_ComparativeMeasure_0');
                expect(range1.getAttribute('stroke') == 'green').toBe(true);
                expect(range1.getAttribute('stroke-width') == '12').toBe(true);
                done();
            });
            it('Checking with target and value bar type', function (done) {
                bullet.title = 'Testing Sample';
                bullet.ranges = [{ end: 5.2, opacity: 1 },
                    { end: 7.3, opacity: 1 },
                    { end: 20, opacity: 1 }
                ];
                bullet.type = 'Dot';
                bullet.refresh();
                range1 = document.getElementById('container_svg_FeatureMeasure_0');
                expect(range1.getAttribute('width') == '6').toBe(true);
                expect(range1.getAttribute('height') == '10').toBe(true);
                done();
            });
            it('Checking with range greater than maximum', function (done) {
                bullet.title = 'Testing Sample';
                bullet.ranges = [{ end: 5.2, opacity: 1 },
                    { end: 7.3, opacity: 1 },
                    { end: 20, opacity: 1 }
                ];
                bullet.dataSource = [{ value: 12, target: 8 }];
                bullet.valueField = 'value';
                bullet.targetField = 'target';
                bullet.maximum = 10;
                bullet.type = 'Rect';
                bullet.refresh();
                range1 = document.getElementById('container_svg_FeatureMeasure_0');
                expect(range1.getAttribute('height') == '10').toBe(true);
                done();
            });
            it('checking with scale in rtl mode', function (done) {
                bullet.title = 'Testing Sample';
                bullet.ranges = [{ end: 5.2, opacity: 1, color: 'red' },
                    { end: 7.3, opacity: 1, color: 'yellow' },
                    { end: 20, opacity: 1, color: 'blue' }
                ];
                bullet.enableRtl = true;
                bullet.minimum = -20;
                bullet.maximum = 20;
                bullet.majorTickLines.useRangeColor = true;
                bullet.minorTickLines.useRangeColor = true;
                bullet.labelStyle.useRangeColor = true;
                bullet.refresh();
                svg = document.getElementById('container_svg_range_0');
                range1 = document.getElementById('container_svg_AxisLabel_20');
                range2 = document.getElementById('container_svg_AxisLabel_0');
                expect(+range2.getAttribute('x')).toBeGreaterThan(+range1.getAttribute('x'));
                done();
            });
        });
        describe('with multiple data', function () {
            var bullet;
            var svg;
            var range1;
            var range2;
            var range3;
            var bulletElement = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(bulletElement);
                bullet = new index_1.BulletChart({
                    dataSource: multipleData,
                    valueField: 'value',
                    targetField: 'comparativeMeasureValue',
                    categoryField: 'category',
                    height: '400',
                    minimum: 0, maximum: 20, interval: 4,
                    animation: { enable: false }
                });
                bullet.appendTo('#container');
            });
            afterAll(function () {
                bullet.destroy();
                bulletElement.remove();
            });
            it('Checking without ranges', function () {
                bullet.majorTickLines = { width: 2, color: '#424242' };
                bullet.dataBind();
                svg = document.getElementById('container_svg_range_0');
                expect(svg.getAttribute('width') == '0').toBe(true);
                expect(svg.getAttribute('height') == '353').toBe(true);
                svg = document.getElementById('container_svg_range_1');
                expect(svg.getAttribute('width') == '0').toBe(true);
                expect(svg.getAttribute('height') == '353').toBe(true);
                svg = document.getElementById('container_svg_range_2');
                expect(svg.getAttribute('width') == '0').toBe(true);
                expect(svg.getAttribute('height') == '353').toBe(true);
            });
            it('checking with ranges', function (done) {
                bullet.title = 'Testing Sample';
                bullet.ranges = [{ end: 5.2, opacity: 1, color: 'skyblue' },
                    { end: 7.3, opacity: 1, color: 'lawngreen' },
                    { end: 20, opacity: 1, color: 'red' }
                ];
                bullet.dataBind();
                svg = document.getElementById('container_svg_range_0');
                expect(svg.getAttribute('fill') == 'skyblue').toBe(true);
                expect(svg.getAttribute('height') == '331').toBe(true);
                svg = document.getElementById('container_svg_range_1');
                expect(svg.getAttribute('fill') == 'lawngreen').toBe(true);
                expect(svg.getAttribute('height') == '331').toBe(true);
                svg = document.getElementById('container_svg_range_2');
                expect(svg.getAttribute('fill') == 'red').toBe(true);
                expect(svg.getAttribute('height') == '331').toBe(true);
                done();
            });
            it('checking with multiple feature bar and comparative bar', function (done) {
                bullet.title = 'Testing Sample';
                bullet.ranges = [{ end: 5.2, opacity: 1, color: 'skyblue' },
                    { end: 7.3, opacity: 1, color: 'lawngreen' },
                    { end: 20, opacity: 1, color: 'red' }
                ];
                bullet.dataBind();
                svg = document.getElementById('container_svg_featureGroup');
                expect(svg.childElementCount).toBe(6);
                svg = document.getElementById('container_svg_comparativeGroup');
                done();
            });
            it('Customization of multiple feature bar', function (done) {
                bullet.title = 'Testing Sample';
                bullet.ranges = [{ end: 5.2, opacity: 1, color: 'skyblue' },
                    { end: 7.3, opacity: 1, color: 'lawngreen' },
                    { end: 20, opacity: 1, color: 'red' }
                ];
                bullet.valueFill = 'blue';
                bullet.valueBorder.width = 1;
                bullet.valueBorder.color = 'black';
                bullet.refresh();
                svg = document.getElementById('container_svg_FeatureMeasure_0');
                expect(svg.getAttribute('fill') == 'blue').toBe(true);
                expect(svg.getAttribute('stroke-width') == '1').toBe(true);
                done();
            });
            it('Customization of comaparative bar', function (done) {
                bullet.title = 'Testing Sample';
                bullet.ranges = [{ end: 5.2, opacity: 1, color: 'skyblue' },
                    { end: 7.3, opacity: 1, color: 'lawngreen' },
                    { end: 20, opacity: 1, color: 'red' }
                ];
                bullet.targetColor = 'violet';
                bullet.targetWidth = 12;
                bullet.refresh();
                svg = document.getElementById('container_svg_ComparativeMeasure_0');
                expect(svg.getAttribute('stroke') == 'violet').toBe(true);
                expect(svg.getAttribute('stroke-width') == '12').toBe(true);
                done();
            });
            it('Checking theme as Material', function (done) {
                bullet.theme = 'Material';
                bullet.refresh();
                svg = document.getElementById('container_svg_FeatureMeasure_0');
                expect(svg.getAttribute('fill') == 'blue').toBe(true);
                expect(svg.getAttribute('stroke-width') == '1').toBe(true);
                done();
            });
            it('Checking theme as BootstrapDark', function (done) {
                bullet.theme = 'BootstrapDark';
                bullet.refresh();
                svg = document.getElementById('container_ChartBorder');
                expect(svg.getAttribute('fill') == '#1b1b1b').toBe(true);
                expect(svg.getAttribute('stroke') == 'transparent').toBe(true);
                done();
            });
            it('Checking theme as MaterialDark', function (done) {
                bullet.theme = 'MaterialDark';
                bullet.refresh();
                svg = document.getElementById('container_ChartBorder');
                expect(svg.getAttribute('fill') == '#383838').toBe(true);
                expect(svg.getAttribute('stroke') == 'transparent').toBe(true);
                done();
            });
            it('Checking theme as FabricDark', function (done) {
                bullet.theme = 'FabricDark';
                bullet.refresh();
                svg = document.getElementById('container_ChartBorder');
                expect(svg.getAttribute('fill') == '#242424').toBe(true);
                expect(svg.getAttribute('stroke') == 'transparent').toBe(true);
                done();
            });
            it('Checking theme as Bootstrap', function (done) {
                bullet.theme = 'Bootstrap';
                bullet.refresh();
                svg = document.getElementById('container_ChartBorder');
                expect(svg.getAttribute('fill') == '#FFFFFF').toBe(true);
                expect(svg.getAttribute('stroke-width') == '0').toBe(true);
                done();
            });
            it('Checking theme as Bootstrap4', function (done) {
                bullet.theme = 'Bootstrap4';
                bullet.refresh();
                svg = document.getElementById('container_ChartBorder');
                expect(svg.getAttribute('fill') == '#FFFFFF').toBe(true);
                expect(svg.getAttribute('stroke-width') == '0').toBe(true);
                done();
            });
            it('Checking theme as HighContrast', function (done) {
                bullet.theme = 'HighContrast';
                bullet.refresh();
                svg = document.getElementById('container_ChartBorder');
                expect(svg.getAttribute('fill') == '#000000').toBe(true);
                expect(svg.getAttribute('stroke') == 'transparent').toBe(true);
                done();
            });
            it('Checking theme as Fabric', function (done) {
                bullet.theme = 'Fabric';
                bullet.refresh();
                svg = document.getElementById('container_BulletChartTitle');
                expect(svg.getAttribute('fill') == '#333333').toBe(true);
                done();
            });
            it('Customization of comaparative bar type as Circle', function (done) {
                bullet.targetTypes = ['Circle'];
                bullet.refresh();
                svg = document.getElementById('container_svg_ComparativeMeasure_0');
                expect(svg.getAttribute('stroke') == 'violet').toBe(true);
                expect(svg.getAttribute('r') == '11').toBe(true);
                done();
            });
            it('Customization of comaparative bar type as Cross', function (done) {
                bullet.targetTypes = ['Cross'];
                bullet.targetColor = 'red';
                bullet.refresh();
                svg = document.getElementById('container_svg_ComparativeMeasure_0');
                expect(svg.getAttribute('stroke') == 'red').toBe(true);
                done();
            });
            it('checking with scale in rtl mode', function (done) {
                bullet.targetTypes = ['Rect'];
                bullet.enableRtl = true;
                bullet.refresh();
                range1 = document.getElementById('container_svg_range_0');
                range2 = document.getElementById('container_svg_range_2');
                expect(+range1.getAttribute('x')).toBeGreaterThan(+range2.getAttribute('x'));
                done();
            });
            it('checking with animation', function (done) {
                bullet.enableRtl = false;
                bullet.animation.enable = true;
                bullet.refresh();
                svg = document.getElementById('container_svg_MajorTickLine_0');
                expect(svg.getAttribute('stroke') == '#424242').toBe(true);
                expect(svg.getAttribute('stroke-width') == '2').toBe(true);
                done();
            });
            it('category label in vertical mode', function (done) {
                bullet.orientation = 'Vertical';
                bullet.animation.enable = false;
                bullet.refresh();
                svg = document.getElementById('container_svg_ComparativeMeasure_0');
                expect(svg.getAttribute('stroke') == 'red').toBe(true);
                expect(svg.getAttribute('stroke-width') == '12').toBe(true);
                done();
            });
        });
    });
});
