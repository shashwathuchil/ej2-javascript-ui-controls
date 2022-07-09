define(["require", "exports", "./../src/common/common", "./../src/check-box/check-box", "@syncfusion/ej2-base", "./common.spec"], function (require, exports, common_1, check_box_1, ej2_base_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    function copyObject(source, destination) {
        for (var prop in source) {
            destination[prop] = source[prop];
        }
        return destination;
    }
    function setMouseCoordinates(eventarg, x, y, target) {
        eventarg.pageX = x;
        eventarg.pageY = y;
        eventarg.clientX = x;
        eventarg.clientY = y;
        eventarg.target = target;
        return eventarg;
    }
    function getEventObject(eventType, eventName) {
        var tempEvent = document.createEvent(eventType);
        tempEvent.initEvent(eventName, true, true);
        var returnObject = copyObject(tempEvent, {});
        returnObject.preventDefault = function () { return true; };
        return returnObject;
    }
    describe('CheckBox', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log('Unsupported environment, window.performance.memory is unavailable');
                _this.skip();
                return;
            }
        });
        var checkbox;
        var element = ej2_base_1.createElement('input', { id: 'checkbox' });
        element.setAttribute('type', 'checkbox');
        document.body.appendChild(element);
        describe('DOM', function () {
            var i = 0;
            function changeFn() {
                i = 1;
            }
            afterEach(function () {
                checkbox.destroy();
            });
            it('Normal CheckBox Testing', function () {
                checkbox = new check_box_1.CheckBox({}, '#checkbox');
                expect(element.classList.contains('e-checkbox')).toEqual(true);
                expect(element.parentElement.tagName).toEqual('LABEL');
                expect(element.parentElement.parentElement.classList.contains('e-checkbox-wrapper')).toEqual(true);
                expect(element.nextElementSibling.classList.contains('e-frame')).toEqual(true);
            });
            it('CheckBox with Label', function () {
                checkbox = new check_box_1.CheckBox({ label: 'checkbox' }, '#checkbox');
                expect(element.parentElement.children[2].classList.contains('e-label')).toEqual(true);
                expect(element.parentElement.children[2].textContent).toEqual('checkbox');
                checkbox.labelMouseDownHandler({ type: 'mousedown' });
                checkbox.labelMouseUpHandler({ type: 'mouseup' });
            });
            it('CheckBox with checked state', function () {
                checkbox = new check_box_1.CheckBox({ checked: true }, '#checkbox');
                expect(element.parentElement.children[1].classList.contains('e-check')).toEqual(true);
                checkbox.element.click();
                expect(element.parentElement.children[1].classList.contains('e-check')).toEqual(false);
            });
            it('CheckBox with disabled state', function () {
                checkbox = new check_box_1.CheckBox({ disabled: true }, '#checkbox');
                expect(element.disabled).toEqual(true);
                expect(element.parentElement.parentElement.classList.contains('e-checkbox-disabled')).toEqual(true);
            });
            it('CheckBox with RTL', function () {
                checkbox = new check_box_1.CheckBox({ enableRtl: true }, '#checkbox');
                expect(element.parentElement.parentElement.classList.contains('e-rtl')).toEqual(true);
            });
            it('CheckBox with labelPosition', function () {
                checkbox = new check_box_1.CheckBox({ label: 'CheckBox', labelPosition: 'Before' }, '#checkbox');
                expect(element.parentElement.children[1].nodeName).toEqual('SPAN');
            });
            it('CheckBox with indeterminate state', function () {
                checkbox = new check_box_1.CheckBox({ indeterminate: true }, '#checkbox');
                expect(element.parentElement.children[1].classList.contains('e-stop')).toEqual(true);
                element.parentElement.click();
                expect(element.parentElement.children[1].classList.contains('e-stop')).toEqual(false);
                checkbox.checked = true;
                checkbox.dataBind();
                checkbox.indeterminate = true;
                checkbox.dataBind();
                element.parentElement.click();
                expect(element.parentElement.children[1].classList.contains('e-check')).toEqual(true);
            });
            it('CheckBox with name property', function () {
                checkbox = new check_box_1.CheckBox({ name: 'gender' }, '#checkbox');
                expect(element.getAttribute('name')).toEqual('gender');
            });
            it('CheckBox with value property', function () {
                checkbox = new check_box_1.CheckBox({ value: 'male' }, '#checkbox');
                expect(element.getAttribute('value')).toEqual('male');
            });
            it('CheckBox with cssClass', function () {
                checkbox = new check_box_1.CheckBox({ cssClass: 'class' }, '#checkbox');
                expect(element.parentElement.parentElement.classList.contains('class')).toEqual(true);
            });
            it('CheckBox with change event', function () {
                checkbox = new check_box_1.CheckBox({ change: changeFn }, '#checkbox');
                element.parentElement.click();
                expect(i).toEqual(1);
            });
            it('CheckBox with persistence', function () {
                checkbox = new check_box_1.CheckBox({ enablePersistence: true }, '#checkbox');
                checkbox.checked = true;
                checkbox.dataBind();
                checkbox.refresh();
                expect(element.parentElement.children[1].classList.contains('e-check')).toEqual(true);
                checkbox.indeterminate = true;
                checkbox.dataBind();
                checkbox.refresh();
                expect(element.parentElement.children[1].classList.contains('e-stop')).toEqual(true);
            });
            it('Hidden input', function () {
                ej2_base_1.attributes(element, { 'ejs-for': 'true', 'name': 'check' });
                checkbox = new check_box_1.CheckBox({}, '#checkbox');
                expect(element.parentElement.children[1].tagName).toEqual('INPUT');
                expect(element.parentElement.children[1].getAttribute('name')).toEqual('check');
                expect(element.parentElement.children[1].getAttribute('type')).toEqual('hidden');
                expect(element.parentElement.children[1].getAttribute('value')).toEqual('false');
                element.removeAttribute('ejs-for');
            });
            it('Enable Html Sanitizer testing', function () {
                checkbox = new check_box_1.CheckBox({ label: '<style>body{background:rgb(0, 0, 255)}</style>', enableHtmlSanitizer: true, }, '#checkbox');
                var htmlele = document.body;
                expect(window.getComputedStyle(htmlele).backgroundColor).not.toBe('rgb(0, 0, 255)');
            });
            it('Enable Html Sanitizer disabled testing', function () {
                checkbox = new check_box_1.CheckBox({ label: 'Banking<style>body{background:rgb(0, 0, 255)}</style>' }, '#checkbox');
                var htmlele = document.body;
                expect(window.getComputedStyle(htmlele).backgroundColor).toBe('rgb(0, 0, 255)');
            });
        });
        describe('Property', function () {
            function changeFn() {
                console.log("changed");
            }
            afterEach(function () {
                checkbox.destroy();
            });
            it('CheckBox with Label', function () {
                checkbox = new check_box_1.CheckBox({ label: 'checkbox' }, '#checkbox');
                expect(checkbox.label).toEqual('checkbox');
            });
            it('CheckBox with checked state', function () {
                checkbox = new check_box_1.CheckBox({ checked: true }, '#checkbox');
                expect(checkbox.checked).toEqual(true);
            });
            it('CheckBox with disabled state', function () {
                checkbox = new check_box_1.CheckBox({ disabled: true }, '#checkbox');
                expect(checkbox.disabled).toEqual(true);
            });
            it('CheckBox with RTL', function () {
                checkbox = new check_box_1.CheckBox({ enableRtl: true }, '#checkbox');
                expect(checkbox.enableRtl).toEqual(true);
            });
            it('CheckBox with label position', function () {
                checkbox = new check_box_1.CheckBox({ labelPosition: 'Before' }, '#checkbox');
                expect(checkbox.labelPosition).toEqual('Before');
            });
            it('CheckBox with indeterminate state', function () {
                checkbox = new check_box_1.CheckBox({ indeterminate: true }, '#checkbox');
                expect(checkbox.indeterminate).toEqual(true);
            });
            it('CheckBox with name', function () {
                checkbox = new check_box_1.CheckBox({ name: 'gender' }, '#checkbox');
                expect(checkbox.name).toEqual('gender');
            });
            it('CheckBox with value', function () {
                checkbox = new check_box_1.CheckBox({ value: 'male' }, '#checkbox');
                expect(checkbox.value).toEqual('male');
            });
            it('CheckBox with cssClass', function () {
                checkbox = new check_box_1.CheckBox({ cssClass: 'class' }, '#checkbox');
                expect(checkbox.cssClass).toEqual('class');
            });
            it('CheckBox with change event', function () {
                checkbox = new check_box_1.CheckBox({ change: changeFn }, '#checkbox');
                expect(checkbox.change).toEqual(changeFn);
            });
            it('CheckBox with persistence', function () {
                checkbox = new check_box_1.CheckBox({ enablePersistence: true }, '#checkbox');
                expect(checkbox.enablePersistence).toEqual(true);
            });
        });
        describe('Notify property changes of', function () {
            afterEach(function () {
                checkbox.destroy();
            });
            it('CheckBox with Label', function () {
                checkbox = new check_box_1.CheckBox({ label: 'checkbox' }, '#checkbox');
                checkbox.label = 'checkbox1';
                checkbox.dataBind();
                expect(checkbox.label).toEqual('checkbox1');
                expect(element.parentElement.children[2].textContent).toEqual('checkbox1');
            });
            it('CheckBox with checked state', function () {
                checkbox = new check_box_1.CheckBox({}, '#checkbox');
                checkbox.checked = true;
                checkbox.dataBind();
                expect(checkbox.checked).toEqual(true);
                expect(element.parentElement.children[1].classList.contains('e-check')).toEqual(true);
                checkbox.checked = false;
                checkbox.dataBind();
                expect(checkbox.checked).toEqual(false);
                expect(element.parentElement.children[1].classList.contains('e-check')).toEqual(false);
            });
            it('CheckBox with disabled state', function () {
                checkbox = new check_box_1.CheckBox({}, '#checkbox');
                checkbox.disabled = true;
                checkbox.dataBind();
                expect(checkbox.disabled).toEqual(true);
                expect(element.disabled).toEqual(true);
                expect(element.parentElement.parentElement.classList.contains('e-checkbox-disabled')).toEqual(true);
                checkbox.disabled = false;
                checkbox.dataBind();
                expect(checkbox.disabled).toEqual(false);
                expect(element.disabled).toEqual(false);
                expect(element.parentElement.parentElement.classList.contains('e-checkbox-disabled')).toEqual(false);
            });
            it('CheckBox with RTL', function () {
                checkbox = new check_box_1.CheckBox({}, '#checkbox');
                checkbox.enableRtl = true;
                checkbox.dataBind();
                expect(checkbox.enableRtl).toEqual(true);
                expect(element.parentElement.parentElement.classList.contains('e-rtl')).toEqual(true);
                checkbox.enableRtl = false;
                checkbox.dataBind();
                expect(checkbox.enableRtl).toEqual(false);
                expect(element.parentElement.parentElement.classList.contains('e-rtl')).toEqual(false);
            });
            it('CheckBox with labelPosition', function () {
                checkbox = new check_box_1.CheckBox({ label: 'CheckBox' }, '#checkbox');
                checkbox.labelPosition = 'Before';
                checkbox.dataBind();
                expect(element.parentElement.children[1].nodeName).toEqual('SPAN');
                checkbox.labelPosition = 'After';
                checkbox.dataBind();
                expect(element.parentElement.children[2].nodeName).toEqual('SPAN');
            });
            it('CheckBox with indeterminate state', function () {
                checkbox = new check_box_1.CheckBox({ checked: true, indeterminate: true }, '#checkbox');
                checkbox.indeterminate = false;
                checkbox.dataBind();
                expect(element.parentElement.children[1].classList.contains('e-stop')).toEqual(false);
                expect(element.parentElement.children[1].classList.contains('e-check')).toEqual(true);
                checkbox.indeterminate = true;
                checkbox.dataBind();
                expect(element.parentElement.children[1].classList.contains('e-stop')).toEqual(true);
                expect(element.parentElement.children[1].classList.contains('e-check')).toEqual(false);
                checkbox.checked = false;
                checkbox.indeterminate = false;
                checkbox.dataBind();
                expect(element.parentElement.children[1].classList.contains('e-stop')).toEqual(false);
                expect(element.parentElement.children[1].classList.contains('e-check')).toEqual(false);
            });
            it('CheckBox with name', function () {
                checkbox = new check_box_1.CheckBox({}, '#checkbox');
                checkbox.name = 'gender';
                checkbox.dataBind();
                expect(element.getAttribute('name')).toEqual('gender');
            });
            it('CheckBox with value', function () {
                checkbox = new check_box_1.CheckBox({}, '#checkbox');
                checkbox.value = 'male';
                checkbox.dataBind();
                expect(element.getAttribute('value')).toEqual('male');
            });
            it('CheckBox with cssClass', function () {
                checkbox = new check_box_1.CheckBox({}, '#checkbox');
                checkbox.cssClass = 'class';
                checkbox.dataBind();
                expect(element.parentElement.parentElement.classList.contains('class')).toEqual(true);
                checkbox.cssClass = 'newClass';
                checkbox.dataBind();
                expect(element.parentElement.parentElement.classList.contains('newClass')).toEqual(true);
            });
        });
        describe('Methods', function () {
            it('Destroy method', function () {
                checkbox = new check_box_1.CheckBox({ checked: true, indeterminate: true, name: 'Check', value: '1', disabled: true }, '#checkbox');
                checkbox.destroy();
                expect(element.parentElement.parentElement.classList.contains('e-checkbox-wrapper')).toEqual(false);
                expect(element.checked).toEqual(false);
                expect(element.indeterminate).toEqual(false);
                expect(element.getAttribute('name')).toEqual(null);
                expect(element.getAttribute('value')).toEqual(null);
                expect(element.disabled).toEqual(false);
            });
            it('Keyboard Event', function () {
                checkbox = new check_box_1.CheckBox({}, '#checkbox');
                element.parentElement.parentElement.focus();
                checkbox.focusHandler();
                checkbox.keyUpHandler();
                expect(element.parentElement.parentElement.classList.contains('e-focus')).toEqual(true);
                checkbox.focusHandler();
                var wrapper = checkbox.element.parentElement.parentElement;
                var label = wrapper.getElementsByTagName('label')[0];
                var cbox = getEventObject('MouseEvents', 'mouseup');
                cbox = setMouseCoordinates(checkbox, 5, 5, label);
                ej2_base_1.EventHandler.trigger(label, 'mouseup', cbox);
                checkbox.element.click();
                expect(element.parentElement.parentElement.classList.contains('e-focus')).toEqual(false);
            });
            it('Pre render method', function () {
                document.body.appendChild(ej2_base_1.createElement('EJS-CHECKBOX', { id: 'ngcheckbox', attrs: { label: 'Checkbox' } }));
                checkbox = new check_box_1.CheckBox({}, '#ngcheckbox');
                expect(checkbox.element.parentElement.parentElement.tagName).toEqual('EJS-CHECKBOX');
                expect(checkbox.element.parentElement.children[0].tagName).toEqual('INPUT');
                expect(checkbox.element.parentElement.children[1].classList.contains('e-frame')).toEqual(true);
                expect(checkbox.element.getAttribute('label')).toEqual(null);
                checkbox.element.click();
                checkbox.destroy();
                expect((document.getElementById('ngcheckbox')).tagName).toBe('EJS-CHECKBOX');
                checkbox = new check_box_1.CheckBox({}, document.body.appendChild(ej2_base_1.createElement('input')));
                expect(checkbox.element.id).toContain('e-checkbox');
                expect(checkbox.element.type).toEqual('checkbox');
            });
            it('Native methods - Click and Focus ', function () {
                document.body.appendChild(ej2_base_1.createElement('EJS-CHECKBOX', { id: 'ngcheckbox', attrs: { label: 'Checkbox' } }));
                checkbox = new check_box_1.CheckBox({}, '#ngcheckbox');
                checkbox.click();
                checkbox.focusIn();
            });
        });
        describe('creation by util function', function () {
            it('', function () {
                var checkboxElem = common_1.createCheckBox(ej2_base_1.createElement);
                expect(checkboxElem.classList.contains('e-checkbox-wrapper')).toBe(true);
                expect(checkboxElem.querySelector('.e-frame')).not.toBeNull();
            });
            it('with ripple effect', function () {
                var checkboxElem = common_1.createCheckBox(ej2_base_1.createElement, true);
                expect(checkboxElem.querySelector('.e-ripple-container')).not.toBeNull();
            });
            it('with checked', function () {
                var checkboxElem = common_1.createCheckBox(ej2_base_1.createElement, false, { checked: true, cssClass: 'e-small' });
                expect(checkboxElem.querySelector('.e-check')).not.toBeNull();
                expect(checkboxElem.classList.contains('e-small')).toBe(true);
            });
            it('with label and without rtl', function () {
                var checkboxElem = common_1.createCheckBox(ej2_base_1.createElement, true, { label: 'checkbox' });
                expect(checkboxElem.querySelector('.e-label')).not.toBeNull();
                expect(checkboxElem.classList.contains('e-rtl')).toBe(false);
            });
            it('with label and rtl', function () {
                var checkboxElem = common_1.createCheckBox(ej2_base_1.createElement, true, { label: 'checkbox', enableRtl: true });
                expect(checkboxElem.classList.contains('e-rtl')).toBe(true);
            });
        });
        describe('CheckBox in HTML5 forms', function () {
            var input;
            var input1;
            var formElement;
            var cbox;
            var cbox1;
            beforeEach(function () {
                formElement = ej2_base_1.createElement('form', {
                    id: 'form'
                });
                input = ej2_base_1.createElement('input', { id: 'checkbox1' });
                input.setAttribute('type', 'checkbox');
                input1 = ej2_base_1.createElement('input', { id: 'checkbox2' });
                input1.setAttribute('type', 'checkbox');
                formElement.appendChild(input);
                formElement.appendChild(input1);
                document.body.appendChild(formElement);
            });
            afterEach(function () {
                cbox.destroy();
                cbox1.destroy();
                formElement.remove();
            });
            it('form reset should make checkbox to its initial value', function () {
                cbox = new check_box_1.CheckBox({
                    checked: true
                }, '#checkbox1');
                cbox1 = new check_box_1.CheckBox({
                    checked: false
                }, '#checkbox2');
                cbox.checked = false;
                expect(cbox.checked).toBeFalsy();
                expect(cbox1.checked).toBeFalsy();
                formElement.reset();
                expect(cbox.checked).toBeTruthy();
                expect(cbox1.checked).toBeFalsy();
            });
            it('form reset should make checkbox to its default value', function () {
                cbox = new check_box_1.CheckBox({}, '#checkbox1');
                cbox1 = new check_box_1.CheckBox({}, '#checkbox2');
                cbox.checked = true;
                cbox1.checked = true;
                expect(cbox.checked).toBeTruthy();
                expect(cbox1.checked).toBeTruthy();
                formElement.reset();
                expect(cbox.checked).toBeFalsy();
                expect(cbox1.checked).toBeFalsy();
            });
            it('form reset with initial value and default value', function () {
                cbox = new check_box_1.CheckBox({}, '#checkbox1');
                cbox1 = new check_box_1.CheckBox({ checked: false }, '#checkbox2');
                cbox.checked = true;
                cbox1.checked = false;
                expect(cbox.checked).toBeTruthy();
                expect(cbox1.checked).toBeFalsy();
                formElement.reset();
                expect(cbox.checked).toBeFalsy();
                expect(cbox1.checked).toBeFalsy();
            });
        });
        describe('Notify Html Attributes property changes of', function () {
            afterEach(function () {
                checkbox.destroy();
            });
            it('CheckBox with Style', function () {
                checkbox = new check_box_1.CheckBox({ label: 'checkbox', htmlAttributes: { style: 'background-color:red' } }, '#checkbox');
                expect(element.parentElement.children[1].getAttribute("style").indexOf("background-color:red")).toEqual(0);
                checkbox.htmlAttributes = { style: "background-color:#d3d3d3" };
                checkbox.dataBind();
                expect(element.parentElement.children[1].getAttribute("style").indexOf("background-color:#d3d3d3")).toEqual(0);
            });
            it('CheckBox with Class', function () {
                checkbox = new check_box_1.CheckBox({ htmlAttributes: { class: 'e-checkbox-syncfusion' } }, '#checkbox');
                expect(element.parentElement.parentElement.classList.contains('e-checkbox-syncfusion')).toEqual(true);
                checkbox.htmlAttributes = { class: "e-new-checkbox" };
                checkbox.dataBind();
                expect(element.parentElement.parentElement.classList.contains('e-new-checkbox')).toEqual(true);
            });
            it('CheckBox with Title', function () {
                checkbox = new check_box_1.CheckBox({ htmlAttributes: { title: 'ejcheckbox' } }, '#checkbox');
                expect(element.parentElement.parentElement.getAttribute("title").indexOf("ejcheckbox")).toEqual(0);
                checkbox.htmlAttributes = { title: "e-new-checkbox" };
                checkbox.dataBind();
                expect(element.parentElement.parentElement.getAttribute("title").indexOf("e-new-checkbox")).toEqual(0);
            });
            it('CheckBox with disabled state', function () {
                checkbox = new check_box_1.CheckBox({ htmlAttributes: { disabled: "true" } }, '#checkbox');
                expect(element.parentElement.children[0].getAttribute("disabled").indexOf("true")).toEqual(0);
                checkbox.htmlAttributes = { readonly: "true" };
                checkbox.dataBind();
                expect(element.parentElement.children[0].getAttribute("readonly").indexOf("true")).toEqual(0);
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
