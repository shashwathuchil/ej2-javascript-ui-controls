define(["require", "exports", "./../src/radio-button/radio-button", "@syncfusion/ej2-base", "./common.spec"], function (require, exports, radio_button_1, ej2_base_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('RadioButton', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log('Unsupported environment, window.performance.memory is unavailable');
                _this.skip();
                return;
            }
        });
        var radio;
        var element = ej2_base_1.createElement('input', { id: 'radio' });
        element.setAttribute('type', 'radio');
        document.body.appendChild(element);
        describe('DOM', function () {
            var i = 0;
            function changeFn() {
                i = 1;
            }
            afterEach(function () {
                radio.destroy();
            });
            it('RadioButton Testing With State', function () {
                radio = new radio_button_1.RadioButton({}, '#radio');
                expect(element.classList.contains('e-radio')).toEqual(true);
                expect(element.nextElementSibling.tagName).toEqual('LABEL');
                expect(element.parentElement.classList.contains('e-radio-wrapper')).toEqual(true);
            });
            it('RadioButton with Label', function () {
                radio = new radio_button_1.RadioButton({ label: 'radiobutton' }, '#radio');
                expect(element.nextElementSibling.children[0].classList.contains('e-label')).toEqual(true);
                expect(element.nextElementSibling.children[0].textContent).toEqual('radiobutton');
            });
            it('RadioButton with disabled state', function () {
                radio = new radio_button_1.RadioButton({ disabled: true }, '#radio');
                expect(element.disabled).toEqual(true);
            });
            it('RadioButton with RTL', function () {
                radio = new radio_button_1.RadioButton({ enableRtl: true }, '#radio');
                expect(element.nextElementSibling.classList.contains('e-rtl')).toEqual(true);
            });
            it('RadioButton with labelPosition', function () {
                radio = new radio_button_1.RadioButton({ label: 'RadioButton', labelPosition: 'Before' }, '#radio');
                expect(element.parentElement.children[1].nodeName).toEqual('LABEL');
            });
            it('RadioButton with name property', function () {
                radio = new radio_button_1.RadioButton({ name: 'gender' }, '#radio');
                expect(element.getAttribute('name')).toEqual('gender');
            });
            it('RadioButton with value property', function () {
                radio = new radio_button_1.RadioButton({ value: 'male' }, '#radio');
                expect(element.getAttribute('value')).toEqual('male');
            });
            it('RadioButton with cssClass', function () {
                radio = new radio_button_1.RadioButton({ cssClass: 'class' }, '#radio');
                expect(element.parentElement.classList.contains('class')).toEqual(true);
            });
            it('RadioButton with change event', function () {
                radio = new radio_button_1.RadioButton({ change: changeFn }, '#radio');
                element.nextElementSibling.click();
                expect(i).toEqual(1);
            });
        });
        describe('Property', function () {
            function changeFn() {
                console.log("changed");
            }
            afterEach(function () {
                radio.destroy();
            });
            it('RadioButton with Label', function () {
                radio = new radio_button_1.RadioButton({ label: 'radiobutton' }, '#radio');
                expect(radio.label).toEqual('radiobutton');
            });
            it('RadioButton with checked state', function () {
                radio = new radio_button_1.RadioButton({ checked: true }, '#radio');
                expect(radio.checked).toEqual(true);
            });
            it('RadioButton with disabled state', function () {
                radio = new radio_button_1.RadioButton({ disabled: true }, '#radio');
                expect(radio.disabled).toEqual(true);
            });
            it('RadioButton with RTL', function () {
                radio = new radio_button_1.RadioButton({ enableRtl: true }, '#radio');
                expect(radio.enableRtl).toEqual(true);
            });
            it('RadioButton with label position', function () {
                radio = new radio_button_1.RadioButton({ labelPosition: 'Before' }, '#radio');
                expect(radio.labelPosition).toEqual('Before');
            });
            it('RadioButton with name', function () {
                radio = new radio_button_1.RadioButton({ name: 'gender' }, '#radio');
                expect(radio.name).toEqual('gender');
            });
            it('RadioButton with value', function () {
                radio = new radio_button_1.RadioButton({ value: 'male' }, '#radio');
                expect(radio.value).toEqual('male');
            });
            it('RadioButton with cssClass', function () {
                radio = new radio_button_1.RadioButton({ cssClass: 'class' }, '#radio');
                expect(radio.cssClass).toEqual('class');
            });
            it('RadioButton with change event', function () {
                radio = new radio_button_1.RadioButton({ change: changeFn }, '#radio');
                expect(radio.change).toEqual(changeFn);
            });
            it('RadioButton with persistence', function () {
                radio = new radio_button_1.RadioButton({ enablePersistence: true }, '#radio');
                expect(radio.enablePersistence).toEqual(true);
            });
            it('Enable Html Sanitizer testing', function () {
                radio = new radio_button_1.RadioButton({ label: '<style>body{background:rgb(0, 0, 255)}</style>', enableHtmlSanitizer: true }, '#radio');
                var htmlele = document.body;
                expect(window.getComputedStyle(htmlele).backgroundColor).not.toBe('rgb(0, 0, 255)');
            });
            it('Enable Html Sanitizer disabled testing', function () {
                radio = new radio_button_1.RadioButton({ label: '<style>body{background:rgb(0, 0, 255)}</style>' }, '#radio');
                var htmlele = document.body;
                expect(window.getComputedStyle(htmlele).backgroundColor).toBe('rgb(0, 0, 255)');
            });
            it('Enable Html Attributes testing', function () {
                radio = new radio_button_1.RadioButton({ htmlAttributes: { 'title': 'Choose Option' }, label: '<style>body{background:rgb(0, 0, 255)}</style>' }, '#radio');
                var htmlele = document.body;
                expect(window.getComputedStyle(htmlele).backgroundColor).toBe('rgb(0, 0, 255)');
            });
        });
        describe('Notify property changes of', function () {
            afterEach(function () {
                radio.destroy();
            });
            it('RadioButton with Label', function () {
                radio = new radio_button_1.RadioButton({ label: 'radiobutton' }, '#radio');
                radio.label = 'radio';
                radio.dataBind();
                expect(radio.label).toEqual('radio');
                expect(element.nextElementSibling.textContent).toEqual('radio');
            });
            it('RadioButton with checked state', function () {
                radio = new radio_button_1.RadioButton({}, '#radio');
                radio.checked = true;
                radio.dataBind();
                expect(radio.checked).toEqual(true);
                radio.checked = false;
                radio.dataBind();
                expect(radio.checked).toEqual(false);
            });
            it('RadioButton with disabled state', function () {
                radio = new radio_button_1.RadioButton({}, '#radio');
                radio.disabled = true;
                radio.dataBind();
                expect(radio.disabled).toEqual(true);
                expect(element.disabled).toEqual(true);
                radio.disabled = false;
                radio.dataBind();
                expect(radio.disabled).toEqual(false);
                expect(element.disabled).toEqual(false);
            });
            it('RadioButton with RTL', function () {
                radio = new radio_button_1.RadioButton({}, '#radio');
                radio.enableRtl = true;
                radio.dataBind();
                expect(radio.enableRtl).toEqual(true);
                expect(element.nextElementSibling.classList.contains('e-rtl')).toEqual(true);
                radio.enableRtl = false;
                radio.dataBind();
                expect(radio.enableRtl).toEqual(false);
                expect(element.nextElementSibling.classList.contains('e-rtl')).toEqual(false);
            });
            it('RadioButton with labelPosition', function () {
                radio = new radio_button_1.RadioButton({ label: 'RadioButton' }, '#radio');
                radio.labelPosition = 'Before';
                radio.dataBind();
                expect(element.parentElement.children[1].classList.contains('e-right')).toEqual(true);
                radio.labelPosition = 'After';
                radio.dataBind();
                expect(element.parentElement.children[1].classList.contains('e-right')).toEqual(false);
            });
            it('RadioButton with name', function () {
                radio = new radio_button_1.RadioButton({}, '#radio');
                radio.name = 'gender';
                radio.dataBind();
                expect(element.getAttribute('name')).toEqual('gender');
            });
            it('RadioButton with value', function () {
                radio = new radio_button_1.RadioButton({}, '#radio');
                radio.value = 'male';
                radio.dataBind();
                expect(element.getAttribute('value')).toEqual('male');
            });
            it('RadioButton with cssClass', function () {
                radio = new radio_button_1.RadioButton({}, '#radio');
                radio.cssClass = 'class';
                radio.dataBind();
                expect(element.parentElement.classList.contains('class')).toEqual(true);
                radio.cssClass = 'newClass';
                radio.dataBind();
                expect(element.parentElement.classList.contains('newClass')).toEqual(true);
            });
        });
        describe('Methods', function () {
            it('Destroy method', function () {
                radio = new radio_button_1.RadioButton({}, '#radio');
                radio.destroy();
                expect(element.checked).toEqual(false);
                expect(element.getAttribute('name')).toEqual(null);
                expect(element.getAttribute('value')).toEqual(null);
                expect(element.disabled).toEqual(false);
            });
            it('Keyboard Event', function () {
                radio = new radio_button_1.RadioButton({}, '#radio');
                radio.focusHandler();
                radio.keyUpHandler();
                expect(element.nextElementSibling.classList.contains('e-focus')).toEqual(true);
                radio.focusOutHandler();
                radio.focusHandler();
                expect(element.nextElementSibling.classList.contains('e-focus')).toEqual(false);
                radio.focusOutHandler();
            });
            it('Mouse Event', function () {
                radio = new radio_button_1.RadioButton({}, '#radio');
                radio.focusHandler();
                expect(element.nextElementSibling.classList.contains('e-focus')).toEqual(false);
                radio.focusOutHandler();
                radio.focusHandler();
                var event = {
                    preventDefault: function () { },
                    type: 'mousedown'
                };
                radio.labelRippleHandler(event);
                expect(element.parentElement.children[0].classList.contains('e-ripple-container')).toEqual(false);
            });
            it('Pre render method', function () {
                document.body.appendChild(ej2_base_1.createElement('EJS-RADIOBUTTON', { id: 'ngradiobutton', attrs: { label: 'radiobutton' } }));
                radio = new radio_button_1.RadioButton({}, '#ngradiobutton');
                expect(radio.element.parentElement.tagName).toEqual('EJS-RADIOBUTTON');
                expect(radio.element.parentElement.children[0].tagName).toEqual('INPUT');
                expect(radio.element.parentElement.children[1].tagName).toEqual('LABEL');
                expect(radio.element.getAttribute('label')).toEqual(null);
                radio.element.click();
                radio.destroy();
                expect((document.getElementById('ngradiobutton')).tagName).toBe('EJS-RADIOBUTTON');
                radio = new radio_button_1.RadioButton({}, document.body.appendChild(ej2_base_1.createElement('input')));
                expect(radio.element.id).toContain('e-radio');
                expect(radio.element.type).toEqual('radio');
            });
            it('getSelectedValue method', function () {
                document.body.appendChild(ej2_base_1.createElement('input', { id: 'group1', attrs: { 'type': 'radio' } }));
                document.body.appendChild(ej2_base_1.createElement('input', { id: 'group2', attrs: { 'type': 'radio' } }));
                radio = new radio_button_1.RadioButton({ name: 'group', value: '1' }, '#group1');
                var radio2 = new radio_button_1.RadioButton({ name: 'group', value: '2' }, '#group2');
                expect(radio.getSelectedValue()).toEqual('');
                radio.element.click();
                expect(radio2.getSelectedValue()).toEqual('1');
                radio2.element.click();
                expect(radio.getSelectedValue()).toEqual('2');
                radio2.destroy();
            });
            it('Native methods - Click and Focus ', function () {
                document.body.appendChild(ej2_base_1.createElement('input', { id: 'group1', attrs: { 'type': 'radio' } }));
                document.body.appendChild(ej2_base_1.createElement('input', { id: 'group2', attrs: { 'type': 'radio' } }));
                radio = new radio_button_1.RadioButton({ name: 'group', value: '1' }, '#group1');
                radio.click();
                radio.focusIn();
            });
        });
        describe('RadioButton in HTML5 forms', function () {
            var input;
            var input1;
            var formElement;
            var radio;
            var radio1;
            beforeEach(function () {
                formElement = ej2_base_1.createElement('form', {
                    id: 'form'
                });
                input = ej2_base_1.createElement('input', { id: 'radio1' });
                input.setAttribute('type', 'radio');
                input1 = ej2_base_1.createElement('input', { id: 'radio2' });
                input1.setAttribute('type', 'radio');
                formElement.appendChild(input);
                formElement.appendChild(input1);
                document.body.appendChild(formElement);
            });
            afterEach(function () {
                radio.destroy();
                radio1.destroy();
                formElement.remove();
            });
            it('form reset should make radiobutton to its initial value', function () {
                radio = new radio_button_1.RadioButton({
                    name: 'radiogroup',
                    checked: true
                }, '#radio1');
                radio1 = new radio_button_1.RadioButton({
                    name: 'radiogroup',
                }, '#radio2');
                radio1.checked = true;
                radio1.dataBind();
                expect(radio1.checked).toBeTruthy();
                expect(radio.checked).toBeFalsy();
                formElement.reset();
                expect(radio.checked).toBeTruthy();
                expect(radio1.checked).toBeFalsy();
            });
            it('form reset should make radiobutton to its default value', function () {
                radio = new radio_button_1.RadioButton({ name: 'radiogroup' }, '#radio1');
                radio1 = new radio_button_1.RadioButton({ name: 'radiogroup' }, '#radio2');
                radio.checked = true;
                expect(radio.checked).toBeTruthy();
                expect(radio1.checked).toBeFalsy();
                formElement.reset();
                expect(radio.checked).toBeFalsy();
                expect(radio.checked).toBeFalsy();
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
