define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MouseEvents = (function () {
        function MouseEvents() {
        }
        MouseEvents.prototype.mousemoveEvent = function (element, sx, sy, cx, cy) {
            var mousemove = document.createEvent('MouseEvent');
            mousemove.initMouseEvent('mousemove', true, false, window, 1, sx, sy, cx, cy, false, false, false, false, 0, null);
            element.dispatchEvent(mousemove);
        };
        MouseEvents.prototype.mouseLeaveEvent = function (element) {
            var click = document.createEvent('MouseEvent');
            click.initEvent('mouseleave', false, false);
            element.dispatchEvent(click);
        };
        MouseEvents.prototype.mouseupEvent = function (element, sx, sy, cx, cy) {
            var mouseup = document.createEvent('MouseEvent');
            mouseup.initMouseEvent('mouseup', true, false, window, 1, sx, sy, cx, cy, false, false, false, false, 0, null);
            element.dispatchEvent(mouseup);
        };
        MouseEvents.prototype.mouseclickEvent = function (element, sx, sy, cx, cy) {
            var click = document.createEvent('MouseEvent');
            click.initMouseEvent('click', true, false, window, 1, sx, sy, cx, cy, false, false, false, false, 0, null);
            element.dispatchEvent(click);
        };
        return MouseEvents;
    }());
    exports.MouseEvents = MouseEvents;
});
