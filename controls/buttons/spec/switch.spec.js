define(["require", "exports", "./../src/switch/switch", "@syncfusion/ej2-base", "./common.spec"], function (require, exports, switch_1, ej2_base_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    function copyObject(source, destination) {
        for (var prop in source) {
            destination[prop] = source[prop];
        }
        return destination;
    }
    function setMouseCoordinates(eventarg, x, y) {
        eventarg.pageX = x;
        eventarg.pageY = y;
        eventarg.clientX = x;
        eventarg.clientY = y;
        return eventarg;
    }
    function getEventObject(eventType, eventName) {
        var tempEvent = document.createEvent(eventType);
        tempEvent.initEvent(eventName, true, true);
        var returnObject = copyObject(tempEvent, {});
        returnObject.preventDefault = function () { return true; };
        return returnObject;
    }
    exports.getEventObject = getEventObject;
    describe('Switch', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log('Unsupported environment, window.performance.memory is unavailable');
                _this.skip();
                return;
            }
        });
        var specSwitch;
        var element = ej2_base_1.createElement('input', { id: 'specSwitch' });
        element.setAttribute('type', 'checkbox');
        document.body.appendChild(element);
        describe('DOM', function () {
            var i = 0;
            function changeFn() {
                i = 1;
            }
            afterEach(function () {
                specSwitch.destroy();
            });
            it('Normal Switch', function () {
                specSwitch = new switch_1.Switch({}, '#specSwitch');
                expect(element.classList.contains('e-switch')).toEqual(true);
                expect(element.parentElement.classList.contains('e-switch-wrapper')).toEqual(true);
                expect(element.parentElement.classList.contains('e-wrapper')).toEqual(true);
                expect(element.parentElement.children[1].classList.contains('e-switch-inner')).toEqual(true);
                expect(element.parentElement.children[1].children[0].classList.contains('e-switch-on')).toEqual(true);
                expect(element.parentElement.children[1].children[1].classList.contains('e-switch-off')).toEqual(true);
                expect(element.parentElement.children[2].classList.contains('e-switch-handle')).toEqual(true);
            });
            it('Switch with on and off label', function () {
                specSwitch = new switch_1.Switch({ onLabel: 'ON', offLabel: 'OFF' }, '#specSwitch');
                expect(element.nextElementSibling.children[0].textContent).toEqual('ON');
                expect(element.nextElementSibling.children[1].textContent).toEqual('OFF');
            });
            it('Switch with checked state', function () {
                specSwitch = new switch_1.Switch({ checked: true }, '#specSwitch');
                expect(element.parentElement.children[1].classList.contains('e-switch-active')).toEqual(true);
                expect(element.parentElement.children[2].classList.contains('e-switch-active')).toEqual(true);
            });
            it('Switch with disabled state', function () {
                specSwitch = new switch_1.Switch({ disabled: true }, '#specSwitch');
                expect(element.disabled).toEqual(true);
                expect(element.parentElement.classList.contains('e-switch-disabled')).toEqual(true);
            });
            it('Switch with disabled state false', function () {
                specSwitch = new switch_1.Switch({ disabled: false }, '#specSwitch');
                expect(element.disabled).toEqual(false);
                expect(element.parentElement.classList.contains('e-switch-disabled')).toEqual(false);
            });
            it('Switch with RTL', function () {
                specSwitch = new switch_1.Switch({ enableRtl: true }, '#specSwitch');
                expect(element.parentElement.classList.contains('e-rtl')).toEqual(true);
            });
            it('Switch with RTL disabled', function () {
                specSwitch = new switch_1.Switch({ enableRtl: false }, '#specSwitch');
                expect(element.parentElement.classList.contains('e-rtl')).toEqual(false);
            });
            it('Switch with name property', function () {
                specSwitch = new switch_1.Switch({ name: 'Wifi' }, '#specSwitch');
                expect(element.getAttribute('name')).toEqual('Wifi');
            });
            it('Switch with value property', function () {
                specSwitch = new switch_1.Switch({ value: 'on' }, '#specSwitch');
                expect(element.getAttribute('value')).toEqual('on');
            });
            it('Switch with cssClass', function () {
                specSwitch = new switch_1.Switch({ cssClass: 'custom' }, '#specSwitch');
                expect(element.parentElement.classList.contains('custom')).toEqual(true);
            });
            it('Switch with change event', function () {
                specSwitch = new switch_1.Switch({ change: changeFn }, '#specSwitch');
                element.parentElement.click();
                expect(i).toEqual(1);
            });
            it('Switch with ARIA property', function () {
                specSwitch = new switch_1.Switch({}, '#specSwitch');
                expect(element.parentElement.getAttribute('aria-checked')).toEqual('false');
            });
            it('Mouse click test', function () {
                specSwitch = new switch_1.Switch({}, '#specSwitch');
                element.parentElement.click();
                expect(element.parentElement.children[1].classList.contains('e-switch-active')).toEqual(true);
                expect(element.parentElement.children[2].classList.contains('e-switch-active')).toEqual(true);
                element.parentElement.click();
                expect(element.parentElement.children[1].classList.contains('e-switch-active')).toEqual(false);
                expect(element.parentElement.children[2].classList.contains('e-switch-active')).toEqual(false);
            });
            it('Wrapper touch', function () {
                specSwitch = new switch_1.Switch({}, '#specSwitch');
                var start = document.createEvent('MouseEvent');
                start.initEvent('touchstart', true, true);
                element.parentElement.dispatchEvent(start);
                var move = document.createEvent('MouseEvent');
                move.initEvent('touchmove', true, true);
                element.parentElement.dispatchEvent(move);
                var end = document.createEvent('MouseEvent');
                end.initEvent('touchend', true, true);
                element.parentElement.dispatchEvent(end);
                expect(element.parentElement.children[1].classList.contains('e-switch-active')).toEqual(true);
                var up = document.createEvent('MouseEvent');
                up.initEvent('mouseup', true, true);
                element.parentElement.parentElement.dispatchEvent(up);
            });
            it('Wrapper Mouse', function () {
                specSwitch = new switch_1.Switch({}, '#specSwitch');
                var event = document.createEvent('MouseEvent');
                event.initEvent('mousedown', true, true);
                element.parentElement.dispatchEvent(event);
                expect(specSwitch.isFocused).toEqual(false);
                var up = document.createEvent('MouseEvent');
                up.initEvent('mouseup', true, true);
                element.parentElement.dispatchEvent(up);
                var events = document.createEvent('MouseEvent');
                events.initEvent('mousedown', true, true);
                document.dispatchEvent(events);
            });
            it('Hidden input', function () {
                ej2_base_1.attributes(element, { 'ejs-for': 'true', 'name': 'check' });
                specSwitch = new switch_1.Switch({}, '#specSwitch');
                expect(element.parentElement.children[1].tagName).toEqual('INPUT');
                expect(element.parentElement.children[1].getAttribute('name')).toEqual('check');
                expect(element.parentElement.children[1].getAttribute('type')).toEqual('hidden');
                expect(element.parentElement.children[1].getAttribute('value')).toEqual('false');
                element.removeAttribute('ejs-for');
            });
        });
        describe('property', function () {
            function changeFn() {
                console.log("changed");
            }
            afterEach(function () {
                specSwitch.destroy();
            });
            it('Switch with on and off label', function () {
                specSwitch = new switch_1.Switch({ onLabel: 'ON', offLabel: 'OFF' }, '#specSwitch');
                expect(specSwitch.onLabel).toEqual('ON');
                expect(specSwitch.offLabel).toEqual('OFF');
            });
            it('Switch with checked state', function () {
                specSwitch = new switch_1.Switch({ checked: true }, '#specSwitch');
                expect(specSwitch.checked).toEqual(true);
            });
            it('Switch with checked state false', function () {
                specSwitch = new switch_1.Switch({ checked: false }, '#specSwitch');
                expect(specSwitch.checked).toEqual(false);
            });
            it('Switch with disabled state', function () {
                specSwitch = new switch_1.Switch({ disabled: true }, '#specSwitch');
                expect(specSwitch.disabled).toEqual(true);
            });
            it('Switch with disabled state', function () {
                specSwitch = new switch_1.Switch({ disabled: false }, '#specSwitch');
                expect(specSwitch.disabled).toEqual(false);
            });
            it('Switch with RTL', function () {
                specSwitch = new switch_1.Switch({ enableRtl: true }, '#specSwitch');
                expect(specSwitch.enableRtl).toEqual(true);
            });
            it('Switch with name property', function () {
                specSwitch = new switch_1.Switch({ name: 'Wifi' }, '#specSwitch');
                expect(specSwitch.name).toEqual('Wifi');
            });
            it('Switch with value property', function () {
                specSwitch = new switch_1.Switch({ value: 'on' }, '#specSwitch');
                expect(specSwitch.value).toEqual('on');
            });
            it('Switch with cssClass', function () {
                specSwitch = new switch_1.Switch({ cssClass: 'custom' }, '#specSwitch');
                expect(specSwitch.cssClass).toEqual('custom');
            });
            it('Switch with change event', function () {
                specSwitch = new switch_1.Switch({ change: changeFn }, '#specSwitch');
                expect(specSwitch.change).toEqual(changeFn);
            });
            it('Switch with persistence', function () {
                specSwitch = new switch_1.Switch({ enablePersistence: true }, '#specSwitch');
                expect(specSwitch.enablePersistence).toEqual(true);
            });
        });
        describe('Notify property Changes', function () {
            afterEach(function () {
                specSwitch.destroy();
            });
            it('onLabel checking', function () {
                specSwitch = new switch_1.Switch({}, '#specSwitch');
                specSwitch.onLabel = 'ON';
                specSwitch.dataBind();
                expect(specSwitch.onLabel).toEqual('ON');
                expect(element.parentElement.children[1].children[0].textContent).toEqual('ON');
            });
            it('offLabel checking', function () {
                specSwitch = new switch_1.Switch({}, '#specSwitch');
                specSwitch.offLabel = 'NO';
                specSwitch.dataBind();
                expect(specSwitch.offLabel).toEqual('NO');
                expect(element.parentElement.children[1].children[1].textContent).toEqual('NO');
            });
            it('Switch with checked state', function () {
                specSwitch = new switch_1.Switch({}, '#specSwitch');
                specSwitch.checked = true;
                specSwitch.dataBind();
                expect(specSwitch.checked).toEqual(true);
                expect(element.parentElement.children[1].classList.contains('e-switch-active')).toEqual(true);
                expect(element.parentElement.children[2].classList.contains('e-switch-active')).toEqual(true);
                specSwitch.checked = false;
                specSwitch.dataBind();
                expect(specSwitch.checked).toEqual(false);
                expect(element.parentElement.children[1].classList.contains('e-switch-active')).toEqual(false);
                expect(element.parentElement.children[2].classList.contains('e-switch-active')).toEqual(false);
            });
            it('Switch with disabled state', function () {
                specSwitch = new switch_1.Switch({}, '#specSwitch');
                specSwitch.disabled = true;
                specSwitch.dataBind();
                expect(specSwitch.disabled).toEqual(true);
                expect(element.parentElement.classList.contains('e-switch-disabled')).toEqual(true);
                specSwitch.disabled = false;
                specSwitch.dataBind();
                expect(specSwitch.disabled).toEqual(false);
                expect(element.parentElement.classList.contains('e-switch-disabled')).toEqual(false);
            });
            it('Switch with RTL', function () {
                specSwitch = new switch_1.Switch({}, '#specSwitch');
                specSwitch.enableRtl = true;
                specSwitch.dataBind();
                expect(specSwitch.enableRtl).toEqual(true);
                expect(element.parentElement.classList.contains('e-rtl')).toEqual(true);
                specSwitch.enableRtl = false;
                specSwitch.dataBind();
                expect(specSwitch.enableRtl).toEqual(false);
                expect(element.parentElement.classList.contains('e-rtl')).toEqual(false);
            });
            it('Switch with name', function () {
                specSwitch = new switch_1.Switch({}, '#specSwitch');
                specSwitch.name = 'Wifi';
                specSwitch.dataBind();
                expect(specSwitch.name).toEqual('Wifi');
                expect(element.getAttribute('name')).toEqual('Wifi');
            });
            it('Switch with value', function () {
                specSwitch = new switch_1.Switch({}, '#specSwitch');
                specSwitch.value = 'on';
                specSwitch.dataBind();
                expect(specSwitch.value).toEqual('on');
                expect(element.getAttribute('value')).toEqual('on');
            });
            it('Switch with cssClass', function () {
                specSwitch = new switch_1.Switch({}, '#specSwitch');
                specSwitch.cssClass = 'customCSS';
                specSwitch.dataBind();
                expect(specSwitch.cssClass).toEqual('customCSS');
                expect(element.parentElement.classList.contains('customCSS')).toEqual(true);
                specSwitch.cssClass = 'newClass';
                specSwitch.dataBind();
                expect(element.parentElement.classList.contains('newClass')).toEqual(true);
            });
        });
        describe('Methods test', function () {
            it('Destroy method', function () {
                specSwitch = new switch_1.Switch({
                    checked: true, onLabel: 'YES', offLabel: 'NO', name: 'switch', value: 'true', disabled: true
                }, '#specSwitch');
                specSwitch.destroy();
                expect(element.parentElement.classList.contains('e-switch-wrapper')).toEqual(false);
                expect(specSwitch.checked).toEqual(true);
                expect(specSwitch.onLabel).toEqual('YES');
                expect(specSwitch.offLabel).toEqual('NO');
                expect(specSwitch.name).toEqual('switch');
                expect(specSwitch.value).toEqual('true');
                expect(specSwitch.disabled).toEqual(true);
                expect(element.getAttribute('name')).toEqual(null);
                expect(element.getAttribute('value')).toEqual(null);
            });
            it('Keyboard Event', function () {
                specSwitch = new switch_1.Switch({}, '#specSwitch');
                element.parentElement.focus();
                specSwitch.focusHandler();
                specSwitch.switchFocusHandler();
                expect(element.parentElement.classList.contains('e-focus')).toEqual(true);
                specSwitch.isFocused = false;
                specSwitch.focusOutHandler();
                expect(element.parentElement.classList.contains('e-focus')).toEqual(false);
            });
            it('Pre render method', function () {
                document.body.appendChild(ej2_base_1.createElement('EJS-SWITCH', { id: 'ngswitch' }));
                specSwitch = new switch_1.Switch({}, '#ngswitch');
                expect(specSwitch.element.parentElement.tagName).toEqual('EJS-SWITCH');
                expect(specSwitch.element.parentElement.children[0].tagName).toEqual('INPUT');
                specSwitch.destroy();
                expect((document.getElementById('ngswitch')).tagName).toBe('EJS-SWITCH');
                specSwitch = new switch_1.Switch({}, document.body.appendChild(ej2_base_1.createElement('input')));
                expect(specSwitch.element.classList).toContain('e-switch');
                expect(specSwitch.element.type).toEqual('checkbox');
            });
            it('toggle method', function () {
                specSwitch = new switch_1.Switch({}, '#specSwitch');
                specSwitch.toggle();
                expect(specSwitch.checked).toEqual(true);
                specSwitch.toggle();
                expect(specSwitch.checked).toEqual(false);
            });
            it('Native methods - Click and Focus ', function () {
                specSwitch = new switch_1.Switch({}, '#specSwitch');
                specSwitch.click();
                specSwitch.focusIn();
            });
        });
        describe('Switch in HTML5 forms', function () {
            var input;
            var input1;
            var formElement;
            var switch1;
            var switch2;
            beforeEach(function () {
                formElement = ej2_base_1.createElement('form', {
                    id: 'form'
                });
                input = ej2_base_1.createElement('input', { id: 'switch1' });
                input.setAttribute('type', 'checkbox');
                input1 = ej2_base_1.createElement('input', { id: 'switch2' });
                input1.setAttribute('type', 'checkbox');
                formElement.appendChild(input);
                formElement.appendChild(input1);
                document.body.appendChild(formElement);
            });
            afterEach(function () {
                switch1.destroy();
                switch2.destroy();
                formElement.remove();
            });
            it('form reset should make switch to its initial value', function () {
                switch1 = new switch_1.Switch({
                    checked: true
                }, '#switch1');
                switch2 = new switch_1.Switch({
                    checked: false
                }, '#switch2');
                switch1.checked = false;
                expect(switch1.checked).toBeFalsy();
                expect(switch2.checked).toBeFalsy();
                formElement.reset();
                expect(switch1.checked).toBeTruthy();
                expect(switch2.checked).toBeFalsy();
            });
            it('form reset should make switch to its default value', function () {
                switch1 = new switch_1.Switch({}, '#switch1');
                switch2 = new switch_1.Switch({}, '#switch2');
                switch1.checked = true;
                switch2.checked = true;
                expect(switch1.checked).toBeTruthy();
                expect(switch2.checked).toBeTruthy();
                formElement.reset();
                expect(switch1.checked).toBeFalsy();
                expect(switch2.checked).toBeFalsy();
            });
            it('form reset with initial value and default value', function () {
                switch1 = new switch_1.Switch({}, '#switch1');
                switch2 = new switch_1.Switch({ checked: false }, '#switch2');
                switch1.checked = true;
                switch2.checked = false;
                expect(switch1.checked).toBeTruthy();
                expect(switch2.checked).toBeFalsy();
                formElement.reset();
                expect(switch1.checked).toBeFalsy();
                expect(switch2.checked).toBeFalsy();
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
