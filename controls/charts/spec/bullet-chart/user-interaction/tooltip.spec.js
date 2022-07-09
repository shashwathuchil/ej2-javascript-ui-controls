define(["require", "exports", "../../../src/bullet-chart/index", "../../../src/bullet-chart/index", "../../chart/base/events.spec", "@syncfusion/ej2-base"], function (require, exports, index_1, index_2, events_spec_1, ej2_base_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    index_1.BulletChart.Inject(index_2.BulletTooltip);
    describe('Bullet Chart Scale', function () {
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
            var segement;
            var id = 'container';
            var tooltipid = 'tooltipDiv' + id;
            var sliceid = id + '_svg_ComparativeMeasure_0';
            var trigger = new events_spec_1.MouseEvents();
            var bulletElement = ej2_base_1.createElement('div', { id: 'container' });
            beforeAll(function () {
                document.body.appendChild(bulletElement);
                bullet = new index_1.BulletChart({
                    dataSource: [{ value: 4, target: 4 }],
                    valueField: 'value', targetField: 'target',
                    tooltip: { enable: true },
                    minimum: 0, maximum: 20, interval: 5,
                    animation: { enable: false },
                });
                bullet.appendTo('#container');
            });
            afterAll(function () {
                bullet.destroy();
                bulletElement.remove();
            });
            it('Bullet chart tooltip visibility checking', function (done) {
                bullet.tooltip.enable = true;
                bullet.refresh();
                segement = document.getElementById(sliceid);
                trigger.mousemoveEvent(segement, 0, 0, 200, 35);
                var tooltip = document.getElementById('tooltipDivcontainer');
                expect(tooltip != null).toBe(true);
                segement = document.getElementById('container_svg_ComparativeMeasure_0');
                trigger.mousemoveEvent(segement, 0, 0, 200, 200);
                done();
            });
            it('Checking with tooltiprender event', function (done) {
                bullet.tooltip.enable = true;
                bullet.tooltipRender = function (args) {
                    args.text += 'K';
                    args.name = 'Revenue';
                };
                bullet.refresh();
                segement = document.getElementById(sliceid);
                trigger.mousemoveEvent(segement, 0, 0, 200, 35);
                var tooltip = document.getElementById('tooltipDivcontainer');
                expect(tooltip != null).toBe(true);
                segement = document.getElementById('container_svg_ComparativeMeasure_0');
                trigger.mousemoveEvent(segement, 0, 0, 200, 35);
                done();
            });
            it('Checking with tooltip border and fill customization', function (done) {
                bullet.tooltip.enable = true;
                bullet.tooltip.border = { width: 4, color: 'green' };
                bullet.tooltip.fill = 'red';
                bullet.refresh();
                segement = document.getElementById(sliceid);
                trigger.mousemoveEvent(segement, 0, 0, 200, 35);
                var tooltip = document.getElementById('tooltipDivcontainer');
                expect(tooltip != null).toBe(true);
                expect(tooltip.style.getPropertyValue('background-color')).toBe('red');
                segement = document.getElementById('container_svg_ComparativeMeasure_0');
                trigger.mousemoveEvent(segement, 0, 0, 200, 200);
                done();
            });
            it('Checking with tooltip template', function (done) {
                bullet.tooltip.enable = true;
                bullet.tooltip.template = '<div>Target   : ${target}K</div><br/><div>Current : ${value}K</div>';
                bullet.refresh();
                segement = document.getElementById(sliceid);
                trigger.mousemoveEvent(segement, 0, 0, 200, 35);
                var tooltip = document.getElementById('containerparent_template');
                expect(tooltip != null).toBe(true);
                segement = document.getElementById('container_svg_ComparativeMeasure_0');
                trigger.mousemoveEvent(segement, 0, 0, 200, 200);
                done();
            });
            it('Checking with title tooltip', function (done) {
                bullet.tooltip.enable = true;
                bullet.tooltip.template = '';
                bullet.title = 'Revenue';
                bullet.subtitle = 'in %';
                bullet.refresh();
                segement = document.getElementById(sliceid);
                trigger.mousemoveEvent(segement, 0, 0, 200, 46);
                var tooltip = document.getElementById('tooltipDivcontainer');
                expect(tooltip != null).toBe(true);
                expect(tooltip.style.getPropertyValue('background-color')).toBe('red');
                segement = document.getElementById('container_BulletChartSubTitle');
                trigger.mousemoveEvent(segement, 0, 0, 200, 200);
                done();
            });
        });
    });
});
