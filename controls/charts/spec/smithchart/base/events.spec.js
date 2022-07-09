define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var prevent = function () {
    };
    var MouseEvents = (function () {
        function MouseEvents() {
        }
        MouseEvents.prototype.clickEvent = function (element) {
            var click = document.createEvent('MouseEvent');
            click.initEvent('click', true, false);
            element.dispatchEvent(click);
        };
        MouseEvents.prototype.rightClickEvent = function (element) {
            var contextmenu = document.createEvent('MouseEvent');
            contextmenu.initEvent('contextmenu', true, false);
            element.dispatchEvent(contextmenu);
        };
        MouseEvents.prototype.doubleClickEvent = function (element) {
            var double = document.createEvent('MouseEvent');
            double.initEvent('dblclick', true, false);
            element.dispatchEvent(double);
        };
        MouseEvents.prototype.resizeEvent = function () {
            window.dispatchEvent(new Event('resize'));
        };
        MouseEvents.prototype.mousedownEvent = function (element, sx, sy, cx, cy) {
            var mousedown = document.createEvent('MouseEvent');
            mousedown.initMouseEvent('mousedown', false, false, window, 1, sx, sy, cx, cy, false, false, false, false, 0, null);
            element.dispatchEvent(mousedown);
        };
        MouseEvents.prototype.mousemoveEvent = function (element, sx, sy, cx, cy) {
            var mousemove = document.createEvent('MouseEvent');
            mousemove.initMouseEvent('mousemove', true, false, window, 1, sx, sy, cx, cy, false, false, false, false, 0, null);
            element.dispatchEvent(mousemove);
        };
        MouseEvents.prototype.mouseupEvent = function (element, sx, sy, cx, cy) {
            var mouseup = document.createEvent('MouseEvent');
            mouseup.initMouseEvent('mouseup', true, false, window, 1, sx, sy, cx, cy, false, false, false, false, 0, null);
            element.dispatchEvent(mouseup);
        };
        MouseEvents.prototype.mouseLeaveEvent = function (element) {
            var click = document.createEvent('MouseEvent');
            click.initEvent('mouseleave', false, false);
            element.dispatchEvent(click);
        };
        MouseEvents.prototype.mouseoverEvent = function (element) {
            var click = document.createEvent('MouseEvent');
            click.initEvent('mouseover', false, false);
            element.dispatchEvent(click);
        };
        MouseEvents.prototype.mouseoutEvent = function (element) {
            var click = document.createEvent('MouseEvent');
            click.initEvent('mouseout', false, false);
            element.dispatchEvent(click);
        };
        MouseEvents.prototype.onPointerStart = function (elem, x1, y1, pointerId, type) {
            if (type === 'touch') {
                return this.onTouchStart(elem, x1, y1, x1, y1, x1, y1);
            }
            return {
                target: elem,
                pageX: x1,
                preventDefault: prevent,
                pageY: y1, clientX: x1, clientY: y1,
                pointerId: pointerId,
                pointerType: type,
                type: type
            };
        };
        MouseEvents.prototype.onPointerMove = function (elem, x1, y1, pointerId, type) {
            if (type === 'touch') {
                return this.onTouchMove(elem, x1, y1, x1, y1, x1, y1);
            }
            else {
                return {
                    target: elem,
                    pageX: x1,
                    preventDefault: prevent,
                    pageY: y1, clientX: x1, clientY: y1,
                    pointerId: pointerId,
                    pointerType: type,
                    type: type
                };
            }
        };
        MouseEvents.prototype.onPointerEnd = function (elem, x1, y1, pointerId, type) {
            if (type === 'touch') {
                return this.onTouchEnd(elem, x1, y1, x1, y1, x1, y1);
            }
            else {
                return {
                    target: elem,
                    pageX: x1,
                    preventDefault: prevent,
                    pageY: y1, clientX: x1, clientY: y1,
                    pointerId: pointerId,
                    pointerType: type,
                    type: type
                };
            }
        };
        MouseEvents.prototype.onTouchStart = function (elem, x1, y1, x2, y2, x3, y3) {
            var touches = [
                { pageX: x1, pageY: y1, clientX: x1, clientY: y1 }
            ];
            if (x2 && y2) {
                touches.push({ pageX: x2, pageY: y2, clientX: x2, clientY: y2 });
            }
            return {
                target: elem,
                type: 'touchstart',
                preventDefault: prevent,
                touches: touches,
                changedTouches: [
                    { pageX: x3, pageY: y3, clientX: x3, clientY: y3 }
                ]
            };
        };
        MouseEvents.prototype.onTouchMove = function (elem, x1, y1, x2, y2, x3, y3) {
            var touches = [
                { pageX: x1, pageY: y1, clientX: x1, clientY: y1 }
            ];
            if (x2 && y2) {
                touches.push({ pageX: x2, pageY: y2, clientX: x2, clientY: y2 });
            }
            return {
                target: elem,
                type: 'touchmove',
                touches: touches,
                preventDefault: prevent,
                changedTouches: [
                    { pageX: x3, pageY: y3, clientX: x3, clientY: y3 }
                ]
            };
        };
        MouseEvents.prototype.onTouchEnd = function (elem, x1, y1, x2, y2, x3, y3) {
            var touches = [
                { pageX: x1, pageY: y1, clientX: x1, clientY: y1 }
            ];
            if (x2 && y2) {
                touches.push({ pageX: x2, pageY: y2, clientX: x2, clientY: y2 });
            }
            return {
                target: elem,
                type: 'touchend',
                preventDefault: prevent,
                touches: touches,
                changedTouches: [
                    { pageX: x3, pageY: y3, clientX: x3, clientY: y3 }
                ]
            };
        };
        return MouseEvents;
    }());
    exports.MouseEvents = MouseEvents;
});
