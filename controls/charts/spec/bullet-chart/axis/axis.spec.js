define(["require", "exports", "../../../src/bullet-chart/index", "@syncfusion/ej2-base"], function (require, exports, index_1, ej2_base_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Bullet Chat Axis', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log("Unsupported environment, window.performance.memory is unavailable");
                _this.skip();
                return;
            }
        });
        describe('with default case', function () {
            var bullet;
            var svg;
            var bulletElement = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(bulletElement);
                bullet = new index_1.BulletChart({
                    dataSource: [{ value: 4, target: 4 }],
                    valueField: 'value', targetField: 'target',
                    minimum: 0, maximum: 20,
                    animation: { enable: false }
                });
                bullet.appendTo('#container');
            });
            afterAll(function () {
                bullet.destroy();
                bulletElement.remove();
            });
            it('Checking module name', function () {
                expect(bullet.getModuleName()).toBe('bulletChart');
            });
            it('Checking Major TickLine', function () {
                bullet.majorTickLines = { width: 2, color: '#424242' };
                bullet.dataBind();
                svg = document.getElementById('container_svg_MajorTickLine_0');
                expect(svg.getAttribute('stroke') == '#424242').toBe(true);
                expect(svg.getAttribute('stroke-width') == '2').toBe(true);
            });
            it('checking with Minimum and Maximum', function (done) {
                bullet.minimum = 0;
                bullet.maximum = 25;
                bullet.interval = 5;
                bullet.dataBind();
                svg = document.getElementById('container_svg_AxisLabel_25');
                svg = document.getElementById('container_svg_axisLabelGroup');
                expect(svg.childNodes[5].lastChild.textContent).toEqual('25');
                done();
            });
            it('checking with Title', function (done) {
                bullet.title = 'Testing Sample';
                bullet.ranges = [{ end: 6 }, { end: 8 }, { end: 25 }];
                bullet.dataBind();
                svg = document.getElementById('container_BulletChartTitle');
                expect(svg.getAttribute('fill') == 'rgba(0,0,0,0.87)').toBe(true);
                expect(svg.getAttribute('text-anchor') == 'middle').toBe(true);
                expect(svg.getAttribute('y') == '28.5').toBe(true);
                done();
            });
            it('checking with Title Postion Bottom and alignment near', function (done) {
                bullet.titlePosition = 'Bottom';
                bullet.titleStyle.textAlignment = 'Near';
                bullet.dataBind();
                svg = document.getElementById('container_BulletChartTitle');
                expect(svg.getAttribute('x') == '15').toBe(true);
                expect(svg.getAttribute('fill') == 'rgba(0,0,0,0.87)').toBe(true);
                expect(svg.getAttribute('text-anchor') == 'start').toBe(true);
                done();
            });
            it('checking with Title Postion Bottom and alignment far', function (done) {
                bullet.titlePosition = 'Bottom';
                bullet.titleStyle.textAlignment = 'Far';
                bullet.dataBind();
                svg = document.getElementById('container_BulletChartTitle');
                expect(svg.getAttribute('fill') == 'rgba(0,0,0,0.87)').toBe(true);
                expect(svg.getAttribute('text-anchor') == 'end').toBe(true);
                done();
            });
            it('checking with Title Postion Bottom and alignment center', function (done) {
                bullet.titlePosition = 'Bottom';
                bullet.titleStyle.textAlignment = 'Center';
                bullet.dataBind();
                svg = document.getElementById('container_BulletChartTitle');
                expect(svg.getAttribute('fill') == 'rgba(0,0,0,0.87)').toBe(true);
                expect(svg.getAttribute('text-anchor') == 'middle').toBe(true);
                done();
            });
            it('checking with Title Postion Top and alignment near', function (done) {
                bullet.titlePosition = 'Top';
                bullet.titleStyle.textAlignment = 'Near';
                bullet.dataBind();
                svg = document.getElementById('container_BulletChartTitle');
                expect(svg.getAttribute('x')).toBe('15');
                expect(svg.getAttribute('text-anchor') == 'start').toBe(true);
                done();
            });
            it('checking with Title maximum width', function (done) {
                bullet.titleStyle.maximumTitleWidth = 12;
                bullet.dataBind();
                svg = document.getElementById('container_BulletChartTitle');
                expect(svg.getAttribute('x')).toBe('15');
                expect(svg.getAttribute('text-anchor') == 'start').toBe(true);
                done();
            });
            it('checking with Title Postion Top and alignment far', function (done) {
                bullet.titlePosition = 'Top';
                bullet.titleStyle.textAlignment = 'Far';
                bullet.dataBind();
                svg = document.getElementById('container_BulletChartTitle');
                expect(svg.getAttribute('text-anchor') == 'end').toBe(true);
                done();
            });
            it('checking with Title Postion Top and alignment center', function (done) {
                bullet.titlePosition = 'Top';
                bullet.titleStyle.textAlignment = 'Center';
                bullet.dataBind();
                svg = document.getElementById('container_BulletChartTitle');
                expect(svg.getAttribute('text-anchor') == 'middle').toBe(true);
                done();
            });
            it('checking with Title Postion Bottom and TickPostion Inside', function (done) {
                bullet.titlePosition = 'Bottom';
                bullet.titleStyle.textAlignment = 'Center';
                bullet.tickPosition = 'Inside';
                bullet.labelPosition = 'Inside';
                bullet.dataBind();
                svg = document.getElementById('container_BulletChartTitle');
                expect(svg.getAttribute('text-anchor') == 'middle').toBe(true);
                done();
            });
            it('checking with Title Postion Top label and TickPostion Inside', function (done) {
                bullet.titlePosition = 'Bottom';
                bullet.titleStyle.textAlignment = 'Center';
                bullet.tickPosition = 'Inside';
                bullet.labelPosition = 'Inside';
                bullet.dataBind();
                svg = document.getElementById('container_BulletChartTitle');
                expect(svg.getAttribute('text-anchor') == 'middle').toBe(true);
                done();
            });
            it('checking with Title Postion Top and Opposed Postion', function (done) {
                bullet.titlePosition = 'Top';
                bullet.tickPosition = 'Inside';
                bullet.labelPosition = 'Inside';
                bullet.opposedPosition = true;
                bullet.dataBind();
                svg = document.getElementById('container_BulletChartTitle');
                expect(svg.getAttribute('text-anchor') == 'middle').toBe(true);
                done();
            });
            it('checking with Title and subTitle', function (done) {
                bullet.subtitle = 'KWH';
                bullet.titlePosition = 'Top';
                bullet.tickPosition = 'Outside';
                bullet.labelPosition = 'Outside';
                bullet.opposedPosition = true;
                bullet.dataBind();
                svg = document.getElementById('container_BulletChartSubTitle');
                expect(svg.getAttribute('text-anchor') == 'middle').toBe(true);
                done();
            });
            it('checking with range color in ticks', function (done) {
                bullet.titlePosition = 'Top';
                bullet.opposedPosition = false;
                bullet.ranges = [{ end: 5.2, opacity: 1, color: 'red' },
                    { end: 7.3, opacity: 1, color: 'yellow' },
                    { end: 25, opacity: 1, color: 'blue' }
                ];
                bullet.majorTickLines = { useRangeColor: true };
                bullet.minorTickLines = { useRangeColor: true };
                bullet.dataBind();
                svg = document.getElementById('container_svg_MajorTickLine_15');
                expect(svg.getAttribute('stroke') == 'blue').toBe(true);
                done();
            });
            it('checking with range color in labels', function (done) {
                bullet.titlePosition = 'Top';
                bullet.opposedPosition = false;
                bullet.ranges = [{ end: 5.2, opacity: 1, color: 'red' },
                    { end: 7.3, opacity: 1, color: 'yellow' },
                    { end: 20, opacity: 1, color: 'blue' }
                ];
                bullet.majorTickLines = { useRangeColor: false };
                bullet.labelStyle.useRangeColor = true;
                bullet.dataBind();
                svg = document.getElementById('container_svg_AxisLabel_15');
                expect(svg.getAttribute('text-anchor') == 'middle').toBe(true);
                expect(svg.getAttribute('fill') == 'blue').toBe(true);
                done();
            });
            it('checking with axis label custom format', function (done) {
                bullet.majorTickLines = { useRangeColor: false };
                bullet.labelFormat = '{value}%';
                bullet.dataBind();
                svg = document.getElementById('container_BulletChartTitle');
                expect(svg.getAttribute('text-anchor') == 'middle').toBe(true);
                done();
            });
            it('checking with axis in rtl mode', function (done) {
                bullet.majorTickLines = { useRangeColor: false };
                bullet.labelFormat = '{value}%';
                bullet.dataBind();
                svg = document.getElementById('container_BulletChartTitle');
                expect(svg.getAttribute('text-anchor') == 'middle').toBe(true);
                done();
            });
            it('checking with title position as left', function (done) {
                bullet.titlePosition = 'Left';
                bullet.refresh();
                svg = document.getElementById('container_BulletChartTitle');
                expect(svg.getAttribute('text-anchor') == 'end').toBe(true);
                done();
            });
            it('checking with title position as right', function (done) {
                bullet.titlePosition = 'Right';
                bullet.refresh();
                svg = document.getElementById('container_BulletChartTitle');
                expect(svg.getAttribute('text-anchor') == 'start').toBe(true);
                done();
            });
        });
        describe('Vertical orientation', function () {
            var bullet;
            var svg;
            var value;
            var bulletElement = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(bulletElement);
                bullet = new index_1.BulletChart({
                    dataSource: [{ value: 4, target: 4 }],
                    valueField: 'value', targetField: 'target',
                    animation: { enable: false },
                    interval: 10,
                    orientation: 'Vertical'
                });
                bullet.appendTo('#container');
            });
            afterAll(function () {
                bullet.destroy();
                bulletElement.remove();
            });
            it('checking without Maximum', function (done) {
                bullet.minimum = 0;
                bullet.dataBind();
                svg = document.getElementById('container_svg_AxisLabel_25');
                svg = document.getElementById('container_svg_axisLabelGroup');
                expect(svg.lastElementChild.textContent).toEqual('10');
                done();
            });
            it('checking without Minimum', function (done) {
                bullet.maximum = 25;
                bullet.interval = 5;
                bullet.dataBind();
                svg = document.getElementById('container_svg_axisLabelGroup');
                expect(svg.firstElementChild.textContent).toBe('0');
                done();
            });
            it('checking with minimum and maximum', function (done) {
                bullet.minimum = 10;
                bullet.maximum = 25;
                bullet.interval = 5;
                bullet.dataBind();
                svg = document.getElementById('container_svg_AxisLabel_25');
                svg = document.getElementById('container_svg_axisLabelGroup');
                expect(svg.childNodes[3].lastChild.textContent).toEqual('25');
                done();
            });
            it('checking with datalabel', function (done) {
                bullet.dataLabel = { enable: true };
                bullet.dataSource = [{ value: 15, target: 17 }];
                bullet.dataBind();
                svg = document.getElementById('container_svg_AxisLabel_25');
                svg = document.getElementById('container_svg_axisLabelGroup');
                expect(svg.childNodes[3].lastChild.textContent).toEqual('25');
                done();
            });
            it('checking with label format', function (done) {
                bullet.labelFormat = '{value}%';
                bullet.dataBind();
                svg = document.getElementById('container_svg_AxisLabel_25');
                svg = document.getElementById('container_svg_axisLabelGroup');
                expect(svg.childNodes[3].lastChild.textContent).toEqual('25');
                done();
            });
            it('checking with ranges in vertical mode', function (done) {
                bullet.ranges = [{ end: 6, color: 'red' }, { end: 8, color: 'yellow' }, { end: 25, color: 'green' }];
                bullet.dataSource = [{ value: 15, target: 16 }];
                bullet.dataBind();
                svg = document.getElementById('container_svg_range_0');
                expect(svg != null).toBe(true);
                done();
            });
            it('checking with title in vertical mode', function (done) {
                bullet.title = 'Vertical Orientation';
                bullet.dataBind();
                svg = document.getElementById('container_BulletChartTitle');
                expect(svg.textContent).toEqual('Vertical Orientation');
                done();
            });
            it('Title as Top', function (done) {
                bullet.titlePosition = 'Top';
                bullet.dataBind();
                svg = document.getElementById('container_BulletChartTitle');
                expect(svg.getAttribute('y')).toBe('28.5');
                done();
            });
            it('Title as Left', function (done) {
                bullet.titlePosition = 'Left';
                bullet.dataBind();
                svg = document.getElementById('container_BulletChartTitle');
                value = svg.getAttribute('x');
                expect(value === '20.666666666666668' || value === '15').toBe(true);
                done();
            });
            it('Title as Bottom', function (done) {
                bullet.titlePosition = 'Bottom';
                bullet.titleStyle.textAlignment = 'Far';
                bullet.dataBind();
                svg = document.getElementById('container_BulletChartTitle');
                expect(svg.getAttribute('y')).toEqual('444.3333333333333');
                done();
            });
            it('Title as Right', function (done) {
                bullet.titlePosition = 'Right';
                bullet.dataBind();
                svg = document.getElementById('container_BulletChartTitle');
                var text = svg.getAttribute('transform');
                var degree = text.split('')[7].concat(text.split('')[8]);
                expect(degree).toBe('90');
                done();
            });
            it('checking with title and subtitle', function (done) {
                bullet.subtitle = '(in px)';
                bullet.titleStyle.textAlignment = 'Center';
                bullet.dataBind();
                svg = document.getElementById('container_BulletChartSubTitle');
                expect(svg.textContent).toEqual('(in px)');
                done();
            });
            it('checking subtitle position as Left', function (done) {
                bullet.titlePosition = 'Left';
                bullet.dataBind();
                svg = document.getElementById('container_BulletChartSubTitle');
                expect(svg.textContent).toEqual('(in px)');
                done();
            });
            it('checking subtitle position as Right', function (done) {
                bullet.titlePosition = 'Right';
                bullet.dataBind();
                svg = document.getElementById('container_BulletChartSubTitle');
                expect(svg.textContent).toEqual('(in px)');
                expect(svg.getAttribute('font-size')).toBe('13px');
                done();
            });
            it('checking subtitle position as Top', function (done) {
                bullet.titlePosition = 'Top';
                bullet.dataBind();
                svg = document.getElementById('container_BulletChartSubTitle');
                expect(svg.textContent).toEqual('(in px)');
                expect(svg.getAttribute('font-size')).toBe('13px');
                done();
            });
            it('checking subtitle position as Bottom', function (done) {
                bullet.titlePosition = 'Bottom';
                bullet.dataBind();
                svg = document.getElementById('container_BulletChartSubTitle');
                expect(svg.textContent).toEqual('(in px)');
                done();
            });
            it('checking with title and subtitleStyle', function (done) {
                bullet.subtitle = '(in px)';
                bullet.subtitleStyle = { size: '20px', color: 'red' };
                bullet.dataBind();
                svg = document.getElementById('container_BulletChartSubTitle');
                expect(svg.textContent).toEqual('(in px)');
                expect(svg.getAttribute('font-size')).toBe('20px');
                expect(svg.getAttribute('fill')).toBe('red');
                done();
            });
            it('checking with chart area border', function (done) {
                bullet.border = { width: 4, color: 'red' };
                bullet.refresh();
                svg = document.getElementById('container_ChartBorder');
                expect(svg.getAttribute('stroke')).toEqual('red');
                done();
            });
            it('checking with tick position and label position inside', function (done) {
                bullet.tickPosition = 'Inside';
                bullet.labelPosition = 'Inside';
                bullet.refresh();
                svg = document.getElementById('container_svg_AxisLabel_10');
                expect(svg.getAttribute('x')).toEqual('41');
                done();
            });
            it('checking with Title maximum width', function (done) {
                bullet.titleStyle.maximumTitleWidth = 70;
                bullet.refresh();
                svg = document.getElementById('container_BulletChartSubTitle');
                expect(svg.getAttribute('y')).toBe('437.3333333333333');
                expect(svg.getAttribute('text-anchor') == 'middle').toBe(true);
                done();
            });
            it('checking with rtl mode', function (done) {
                bullet.enableRtl = true;
                bullet.refresh();
                svg = document.getElementById('container_svg_range_0');
                expect(svg.getAttribute('x')).toBe('20');
                expect(svg.getAttribute('fill') == 'red').toBe(true);
                done();
            });
            it('checking with opposed position', function (done) {
                bullet.opposedPosition = true;
                bullet.refresh();
                svg = document.getElementById('container_svg_AxisLabel_20');
                expect(svg.textContent).toEqual('20%');
                expect(svg.getAttribute('y') == '269.66666666666663' || svg.getAttribute('y') == '270').toBe(true);
                done();
            });
        });
    });
});
