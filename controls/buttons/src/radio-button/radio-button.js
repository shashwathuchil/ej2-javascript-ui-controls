var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "@syncfusion/ej2-base", "@syncfusion/ej2-base", "@syncfusion/ej2-base", "./../common/common"], function (require, exports, ej2_base_1, ej2_base_2, ej2_base_3, common_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LABEL = 'e-label';
    var RIPPLE = 'e-ripple-container';
    var RTL = 'e-rtl';
    var WRAPPER = 'e-radio-wrapper';
    var ATTRIBUTES = ['title', 'class', 'style', 'disabled', 'readonly', 'name', 'value'];
    var RadioButton = RadioButton_1 = (function (_super) {
        __extends(RadioButton, _super);
        function RadioButton(options, element) {
            var _this = _super.call(this, options, element) || this;
            _this.isFocused = false;
            return _this;
        }
        RadioButton.prototype.changeHandler = function (event) {
            this.checked = true;
            this.dataBind();
            var value = this.element.getAttribute('value');
            value = this.isVue && value ? this.element.value : this.value;
            this.trigger('change', { value: value, event: event });
            if (this.tagName === 'EJS-RADIOBUTTON') {
                event.stopPropagation();
            }
        };
        RadioButton.prototype.updateChange = function () {
            var input;
            var instance;
            var radioGrp = this.getRadioGroup();
            for (var i = 0; i < radioGrp.length; i++) {
                input = radioGrp[i];
                if (input !== this.element) {
                    instance = ej2_base_2.getInstance(input, RadioButton_1);
                    instance.checked = false;
                    if (this.tagName === 'EJS-RADIOBUTTON') {
                        instance.angularValue = this.value;
                    }
                }
            }
        };
        RadioButton.prototype.destroy = function () {
            var _this = this;
            var radioWrap = this.wrapper;
            _super.prototype.destroy.call(this);
            if (radioWrap) {
                if (!this.disabled) {
                    this.unWireEvents();
                }
                if (this.tagName === 'INPUT') {
                    if (radioWrap.parentNode) {
                        radioWrap.parentNode.insertBefore(this.element, radioWrap);
                    }
                    ej2_base_3.detach(radioWrap);
                    this.element.checked = false;
                    ['name', 'value', 'disabled'].forEach(function (key) {
                        _this.element.removeAttribute(key);
                    });
                }
                else {
                    ['role', 'aria-checked', 'class'].forEach(function (key) {
                        radioWrap.removeAttribute(key);
                    });
                    radioWrap.innerHTML = '';
                }
            }
        };
        RadioButton.prototype.focusHandler = function () {
            this.isFocused = true;
        };
        RadioButton.prototype.focusOutHandler = function () {
            var label = this.getLabel();
            if (label) {
                label.classList.remove('e-focus');
            }
        };
        RadioButton.prototype.getModuleName = function () {
            return 'radio';
        };
        RadioButton.prototype.getSelectedValue = function () {
            var input;
            var radioGrp = this.getRadioGroup();
            for (var i = 0, len = radioGrp.length; i < len; i++) {
                input = radioGrp[i];
                if (input.checked) {
                    return input.value;
                }
            }
            return '';
        };
        RadioButton.prototype.getRadioGroup = function () {
            return document.querySelectorAll('input.e-radio[name="' + this.element.getAttribute('name') + '"]');
        };
        RadioButton.prototype.getPersistData = function () {
            return this.addOnPersist(['checked']);
        };
        RadioButton.prototype.getWrapper = function () {
            if (this.element) {
                return this.element.parentElement;
            }
            else {
                return null;
            }
        };
        RadioButton.prototype.getLabel = function () {
            if (this.element) {
                return this.element.nextElementSibling;
            }
            else {
                return null;
            }
        };
        RadioButton.prototype.initialize = function () {
            if (ej2_base_2.isNullOrUndefined(this.initialCheckedValue)) {
                this.initialCheckedValue = this.checked;
            }
            this.initWrapper();
            this.updateHtmlAttribute();
            if (this.name) {
                this.element.setAttribute('name', this.name);
            }
            var value = this.element.getAttribute('value');
            if (this.isVue && value && value === this.value) {
                this.checked = true;
            }
            if (this.isVue ? this.value && !value : this.value) {
                this.element.setAttribute('value', this.value);
            }
            if (this.checked) {
                this.element.checked = true;
            }
            if (this.disabled) {
                this.setDisabled();
            }
        };
        RadioButton.prototype.initWrapper = function () {
            var rippleSpan;
            var wrapper = this.element.parentElement;
            if (!wrapper.classList.contains(WRAPPER)) {
                wrapper = this.createElement('div', { className: WRAPPER });
                this.element.parentNode.insertBefore(wrapper, this.element);
            }
            var label = this.createElement('label', { attrs: { for: this.element.id } });
            wrapper.appendChild(this.element);
            wrapper.appendChild(label);
            if (ej2_base_2.isRippleEnabled) {
                rippleSpan = this.createElement('span', { className: (RIPPLE) });
                label.appendChild(rippleSpan);
                ej2_base_1.rippleEffect(rippleSpan, {
                    duration: 400,
                    isCenterRipple: true
                });
            }
            wrapper.classList.add('e-wrapper');
            if (this.enableRtl) {
                label.classList.add(RTL);
            }
            if (this.cssClass) {
                ej2_base_2.addClass([wrapper], this.cssClass.split(' '));
            }
            if (this.label) {
                this.setText(this.label);
            }
        };
        RadioButton.prototype.keyUpHandler = function () {
            if (this.isFocused) {
                this.getLabel().classList.add('e-focus');
            }
        };
        RadioButton.prototype.labelRippleHandler = function (e) {
            var ripple = this.getLabel().getElementsByClassName(RIPPLE)[0];
            common_1.rippleMouseHandler(e, ripple);
        };
        RadioButton.prototype.formResetHandler = function () {
            this.checked = this.initialCheckedValue;
            if (this.initialCheckedValue) {
                ej2_base_2.attributes(this.element, { 'checked': 'true' });
            }
        };
        RadioButton.prototype.onPropertyChanged = function (newProp, oldProp) {
            var wrap = this.getWrapper();
            var label = this.getLabel();
            for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
                var prop = _a[_i];
                switch (prop) {
                    case 'checked':
                        if (newProp.checked) {
                            this.updateChange();
                        }
                        this.element.checked = newProp.checked;
                        break;
                    case 'disabled':
                        if (newProp.disabled) {
                            this.setDisabled();
                            this.unWireEvents();
                        }
                        else {
                            this.element.disabled = false;
                            this.wireEvents();
                        }
                        break;
                    case 'cssClass':
                        if (oldProp.cssClass) {
                            ej2_base_2.removeClass([wrap], oldProp.cssClass.split(' '));
                        }
                        if (newProp.cssClass) {
                            ej2_base_2.addClass([wrap], newProp.cssClass.split(' '));
                        }
                        break;
                    case 'enableRtl':
                        if (newProp.enableRtl) {
                            label.classList.add(RTL);
                        }
                        else {
                            label.classList.remove(RTL);
                        }
                        break;
                    case 'label':
                        this.setText(newProp.label);
                        break;
                    case 'labelPosition':
                        if (newProp.labelPosition === 'Before') {
                            label.classList.add('e-right');
                        }
                        else {
                            label.classList.remove('e-right');
                        }
                        break;
                    case 'name':
                        this.element.setAttribute('name', newProp.name);
                        break;
                    case 'value':
                        if (!ej2_base_2.isNullOrUndefined(this.htmlAttributes) && this.htmlAttributes.value) {
                            break;
                        }
                        this.element.setAttribute('value', newProp.value);
                        break;
                    case 'htmlAttributes':
                        this.updateHtmlAttribute();
                        break;
                }
            }
        };
        RadioButton.prototype.preRender = function () {
            var element = this.element;
            this.formElement = ej2_base_1.closest(this.element, 'form');
            this.tagName = this.element.tagName;
            element = common_1.wrapperInitialize(this.createElement, 'EJS-RADIOBUTTON', 'radio', element, WRAPPER, 'radio');
            this.element = element;
            if (this.element.getAttribute('type') !== 'radio') {
                this.element.setAttribute('type', 'radio');
            }
            if (!this.element.id) {
                this.element.id = ej2_base_2.getUniqueID('e-' + this.getModuleName());
            }
            if (this.tagName === 'EJS-RADIOBUTTON') {
                var formControlName = this.element.getAttribute('formcontrolname');
                if (formControlName) {
                    this.setProperties({ 'name': formControlName }, true);
                    this.element.setAttribute('name', formControlName);
                }
            }
        };
        RadioButton.prototype.render = function () {
            this.initialize();
            if (!this.disabled) {
                this.wireEvents();
            }
            this.renderComplete();
            this.wrapper = this.getWrapper();
        };
        RadioButton.prototype.setDisabled = function () {
            this.element.disabled = true;
        };
        RadioButton.prototype.setText = function (text) {
            var label = this.getLabel();
            var textLabel = label.getElementsByClassName(LABEL)[0];
            if (textLabel) {
                textLabel.textContent = text;
            }
            else {
                text = (this.enableHtmlSanitizer) ? ej2_base_3.SanitizeHtmlHelper.sanitize(text) : text;
                textLabel = this.createElement('span', { className: LABEL, innerHTML: text });
                label.appendChild(textLabel);
            }
            if (this.labelPosition === 'Before') {
                this.getLabel().classList.add('e-right');
            }
            else {
                this.getLabel().classList.remove('e-right');
            }
        };
        RadioButton.prototype.updateHtmlAttribute = function () {
            if (!ej2_base_2.isNullOrUndefined(this.htmlAttributes)) {
                for (var _i = 0, _a = Object.keys(this.htmlAttributes); _i < _a.length; _i++) {
                    var key = _a[_i];
                    if (ATTRIBUTES.indexOf(key) > -1) {
                        var wrapper = this.element.parentElement;
                        if (key === 'class') {
                            ej2_base_2.addClass([wrapper], this.htmlAttributes[key].split(' '));
                        }
                        else if (key === 'title' || key === 'style') {
                            wrapper.setAttribute(key, this.htmlAttributes[key]);
                        }
                        else {
                            this.element.setAttribute(key, this.htmlAttributes[key]);
                        }
                    }
                }
            }
        };
        RadioButton.prototype.unWireEvents = function () {
            var label = this.wrapper;
            ej2_base_3.EventHandler.remove(this.element, 'change', this.changeHandler);
            ej2_base_3.EventHandler.remove(this.element, 'focus', this.focusHandler);
            ej2_base_3.EventHandler.remove(this.element, 'focusout', this.focusOutHandler);
            ej2_base_3.EventHandler.remove(this.element, 'keyup', this.keyUpHandler);
            var rippleLabel = label.getElementsByTagName('label')[0];
            if (rippleLabel) {
                ej2_base_3.EventHandler.remove(rippleLabel, 'mousedown', this.labelRippleHandler);
                ej2_base_3.EventHandler.remove(rippleLabel, 'mouseup', this.labelRippleHandler);
            }
            if (this.formElement) {
                ej2_base_3.EventHandler.remove(this.formElement, 'reset', this.formResetHandler);
            }
        };
        RadioButton.prototype.wireEvents = function () {
            var label = this.getLabel();
            ej2_base_3.EventHandler.add(this.element, 'change', this.changeHandler, this);
            ej2_base_3.EventHandler.add(this.element, 'keyup', this.keyUpHandler, this);
            ej2_base_3.EventHandler.add(this.element, 'focus', this.focusHandler, this);
            ej2_base_3.EventHandler.add(this.element, 'focusout', this.focusOutHandler, this);
            var rippleLabel = label.getElementsByClassName(LABEL)[0];
            if (rippleLabel) {
                ej2_base_3.EventHandler.add(rippleLabel, 'mousedown', this.labelRippleHandler, this);
                ej2_base_3.EventHandler.add(rippleLabel, 'mouseup', this.labelRippleHandler, this);
            }
            if (this.formElement) {
                ej2_base_3.EventHandler.add(this.formElement, 'reset', this.formResetHandler, this);
            }
        };
        RadioButton.prototype.click = function () {
            this.element.click();
        };
        RadioButton.prototype.focusIn = function () {
            this.element.focus();
        };
        return RadioButton;
    }(ej2_base_1.Component));
    __decorate([
        ej2_base_3.Event()
    ], RadioButton.prototype, "change", void 0);
    __decorate([
        ej2_base_3.Event()
    ], RadioButton.prototype, "created", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], RadioButton.prototype, "checked", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], RadioButton.prototype, "cssClass", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], RadioButton.prototype, "disabled", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], RadioButton.prototype, "label", void 0);
    __decorate([
        ej2_base_1.Property('After')
    ], RadioButton.prototype, "labelPosition", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], RadioButton.prototype, "name", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], RadioButton.prototype, "value", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], RadioButton.prototype, "enableHtmlSanitizer", void 0);
    __decorate([
        ej2_base_1.Property({})
    ], RadioButton.prototype, "htmlAttributes", void 0);
    RadioButton = RadioButton_1 = __decorate([
        ej2_base_1.NotifyPropertyChanges
    ], RadioButton);
    exports.RadioButton = RadioButton;
    var RadioButton_1;
});
