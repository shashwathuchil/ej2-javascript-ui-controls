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
    var CHECK = 'e-check';
    var DISABLED = 'e-checkbox-disabled';
    var FRAME = 'e-frame';
    var INDETERMINATE = 'e-stop';
    var LABEL = 'e-label';
    var RIPPLE = 'e-ripple-container';
    var RIPPLECHECK = 'e-ripple-check';
    var RIPPLEINDETERMINATE = 'e-ripple-stop';
    var RTL = 'e-rtl';
    var WRAPPER = 'e-checkbox-wrapper';
    var containerAttr = ['title', 'class', 'style', 'disabled', 'readonly', 'name', 'value'];
    var CheckBox = (function (_super) {
        __extends(CheckBox, _super);
        function CheckBox(options, element) {
            var _this = _super.call(this, options, element) || this;
            _this.isFocused = false;
            _this.isMouseClick = false;
            _this.clickTriggered = false;
            _this.validCheck = true;
            return _this;
        }
        CheckBox.prototype.changeState = function (state) {
            var ariaState;
            var rippleSpan;
            var frameSpan = this.getWrapper().getElementsByClassName(FRAME)[0];
            if (ej2_base_3.isRippleEnabled) {
                rippleSpan = this.getWrapper().getElementsByClassName(RIPPLE)[0];
            }
            if (state === 'check') {
                frameSpan.classList.remove(INDETERMINATE);
                frameSpan.classList.add(CHECK);
                if (rippleSpan) {
                    rippleSpan.classList.remove(RIPPLEINDETERMINATE);
                    rippleSpan.classList.add(RIPPLECHECK);
                }
                ariaState = 'true';
                this.element.checked = true;
                if (this.element.required && this.validCheck) {
                    this.element.checked = false;
                    this.validCheck = false;
                }
                else if (this.element.required) {
                    this.validCheck = true;
                }
            }
            else if (state === 'uncheck') {
                ej2_base_3.removeClass([frameSpan], [CHECK, INDETERMINATE]);
                if (rippleSpan) {
                    ej2_base_3.removeClass([rippleSpan], [RIPPLECHECK, RIPPLEINDETERMINATE]);
                }
                ariaState = 'false';
                this.element.checked = false;
                if (this.element.required && this.validCheck) {
                    this.element.checked = true;
                    this.validCheck = false;
                }
                else if (this.element.required) {
                    this.validCheck = true;
                }
            }
            else {
                frameSpan.classList.remove(CHECK);
                frameSpan.classList.add(INDETERMINATE);
                if (rippleSpan) {
                    rippleSpan.classList.remove(RIPPLECHECK);
                    rippleSpan.classList.add(RIPPLEINDETERMINATE);
                }
                ariaState = 'mixed';
                this.element.indeterminate = true;
            }
        };
        CheckBox.prototype.clickHandler = function (event) {
            if (event.target.tagName === 'INPUT' && this.clickTriggered) {
                this.clickTriggered = false;
                return;
            }
            if (event.target.tagName === 'SPAN' || event.target.tagName === 'LABEL') {
                this.clickTriggered = true;
            }
            if (this.isMouseClick) {
                this.focusOutHandler();
                this.isMouseClick = false;
            }
            if (this.indeterminate) {
                this.changeState(this.checked ? 'check' : 'uncheck');
                this.indeterminate = false;
                this.element.indeterminate = false;
            }
            else if (this.checked) {
                this.changeState('uncheck');
                this.checked = false;
            }
            else {
                this.changeState('check');
                this.checked = true;
            }
            var changeEventArgs = { checked: this.updateVueArrayModel(false), event: event };
            this.trigger('change', changeEventArgs);
            event.stopPropagation();
        };
        CheckBox.prototype.destroy = function () {
            var _this = this;
            var wrapper = this.getWrapper();
            _super.prototype.destroy.call(this);
            if (this.wrapper) {
                wrapper = this.wrapper;
                if (!this.disabled) {
                    this.unWireEvents();
                }
                if (this.tagName === 'INPUT') {
                    if (this.getWrapper() && wrapper.parentNode) {
                        wrapper.parentNode.insertBefore(this.element, wrapper);
                    }
                    ej2_base_3.detach(wrapper);
                    this.element.checked = false;
                    if (this.indeterminate) {
                        this.element.indeterminate = false;
                    }
                    ['name', 'value', 'disabled'].forEach(function (key) {
                        _this.element.removeAttribute(key);
                    });
                }
                else {
                    ['class'].forEach(function (key) {
                        wrapper.removeAttribute(key);
                    });
                    wrapper.innerHTML = '';
                }
            }
        };
        CheckBox.prototype.focusHandler = function () {
            this.isFocused = true;
        };
        CheckBox.prototype.focusOutHandler = function () {
            var wrapper = this.getWrapper();
            if (wrapper) {
                wrapper.classList.remove('e-focus');
            }
            this.isFocused = false;
        };
        CheckBox.prototype.getModuleName = function () {
            return 'checkbox';
        };
        CheckBox.prototype.getPersistData = function () {
            return this.addOnPersist(['checked', 'indeterminate']);
        };
        CheckBox.prototype.getWrapper = function () {
            if (this.element && this.element.parentElement) {
                return this.element.parentElement.parentElement;
            }
            else {
                return null;
            }
        };
        CheckBox.prototype.initialize = function () {
            if (ej2_base_2.isNullOrUndefined(this.initialCheckedValue)) {
                this.initialCheckedValue = this.checked;
            }
            if (this.name) {
                this.element.setAttribute('name', this.name);
            }
            if (this.value) {
                this.element.setAttribute('value', this.value);
                if (this.isVue && typeof this.value === 'boolean' && this.value === true) {
                    this.setProperties({ 'checked': true }, true);
                }
            }
            if (this.checked) {
                this.changeState('check');
            }
            if (this.indeterminate) {
                this.changeState();
            }
            if (this.disabled) {
                this.setDisabled();
            }
        };
        CheckBox.prototype.initWrapper = function () {
            var wrapper = this.element.parentElement;
            if (!wrapper.classList.contains(WRAPPER)) {
                wrapper = this.createElement('div', {
                    className: WRAPPER
                });
                this.element.parentNode.insertBefore(wrapper, this.element);
            }
            var label = this.createElement('label', { attrs: { for: this.element.id } });
            var frameSpan = this.createElement('span', { className: 'e-icons ' + FRAME });
            wrapper.classList.add('e-wrapper');
            if (this.enableRtl) {
                wrapper.classList.add(RTL);
            }
            if (this.cssClass) {
                ej2_base_3.addClass([wrapper], this.cssClass.split(' '));
            }
            wrapper.appendChild(label);
            label.appendChild(this.element);
            common_1.setHiddenInput(this, label);
            label.appendChild(frameSpan);
            if (ej2_base_3.isRippleEnabled) {
                var rippleSpan = this.createElement('span', { className: RIPPLE });
                if (this.labelPosition === 'Before') {
                    label.appendChild(rippleSpan);
                }
                else {
                    label.insertBefore(rippleSpan, frameSpan);
                }
                ej2_base_3.rippleEffect(rippleSpan, { duration: 400, isCenterRipple: true });
            }
            if (this.label) {
                this.setText(this.label);
            }
        };
        CheckBox.prototype.keyUpHandler = function () {
            if (this.isFocused) {
                this.getWrapper().classList.add('e-focus');
            }
        };
        CheckBox.prototype.labelMouseDownHandler = function (e) {
            this.isMouseClick = true;
            var rippleSpan = this.getWrapper().getElementsByClassName(RIPPLE)[0];
            common_1.rippleMouseHandler(e, rippleSpan);
        };
        CheckBox.prototype.labelMouseUpHandler = function (e) {
            this.isMouseClick = true;
            var rippleSpan = this.getWrapper().getElementsByClassName(RIPPLE)[0];
            if (rippleSpan) {
                var rippleElem = rippleSpan.querySelectorAll('.e-ripple-element');
                for (var i = 0; i < rippleElem.length - 1; i++) {
                    rippleSpan.removeChild(rippleSpan.childNodes[i]);
                }
                common_1.rippleMouseHandler(e, rippleSpan);
            }
        };
        CheckBox.prototype.onPropertyChanged = function (newProp, oldProp) {
            var wrapper = this.getWrapper();
            for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
                var prop = _a[_i];
                switch (prop) {
                    case 'checked':
                        this.indeterminate = false;
                        this.element.indeterminate = false;
                        this.changeState(newProp.checked ? 'check' : 'uncheck');
                        break;
                    case 'indeterminate':
                        if (newProp.indeterminate) {
                            this.changeState();
                        }
                        else {
                            this.element.indeterminate = false;
                            this.changeState(this.checked ? 'check' : 'uncheck');
                        }
                        break;
                    case 'disabled':
                        if (newProp.disabled) {
                            this.setDisabled();
                            this.wrapper = this.getWrapper();
                            this.unWireEvents();
                        }
                        else {
                            this.element.disabled = false;
                            wrapper.classList.remove(DISABLED);
                            wrapper.setAttribute('aria-disabled', 'false');
                            this.wireEvents();
                        }
                        break;
                    case 'cssClass':
                        if (oldProp.cssClass) {
                            ej2_base_3.removeClass([wrapper], oldProp.cssClass.split(' '));
                        }
                        if (newProp.cssClass) {
                            ej2_base_3.addClass([wrapper], newProp.cssClass.split(' '));
                        }
                        break;
                    case 'enableRtl':
                        if (newProp.enableRtl) {
                            wrapper.classList.add(RTL);
                        }
                        else {
                            wrapper.classList.remove(RTL);
                        }
                        break;
                    case 'label':
                        this.setText(newProp.label);
                        break;
                    case 'labelPosition': {
                        var label = wrapper.getElementsByClassName(LABEL)[0];
                        var labelWrap = wrapper.getElementsByTagName('label')[0];
                        ej2_base_3.detach(label);
                        if (newProp.labelPosition === 'After') {
                            labelWrap.appendChild(label);
                        }
                        else {
                            labelWrap.insertBefore(label, wrapper.getElementsByClassName(FRAME)[0]);
                        }
                        break;
                    }
                    case 'name':
                        this.element.setAttribute('name', newProp.name);
                        break;
                    case 'value':
                        if (this.isVue && typeof newProp.value === 'object') {
                            break;
                        }
                        this.element.setAttribute('value', newProp.value);
                        break;
                    case 'htmlAttributes':
                        this.updateHtmlAttributeToWrapper();
                        break;
                }
            }
        };
        CheckBox.prototype.preRender = function () {
            var element = this.element;
            this.tagName = this.element.tagName;
            element = common_1.wrapperInitialize(this.createElement, 'EJS-CHECKBOX', 'checkbox', element, WRAPPER, 'checkbox');
            this.element = element;
            if (this.element.getAttribute('type') !== 'checkbox') {
                this.element.setAttribute('type', 'checkbox');
            }
            if (!this.element.id) {
                this.element.id = ej2_base_3.getUniqueID('e-' + this.getModuleName());
            }
        };
        CheckBox.prototype.render = function () {
            this.initWrapper();
            this.initialize();
            if (!this.disabled) {
                this.wireEvents();
            }
            this.updateHtmlAttributeToWrapper();
            this.updateVueArrayModel(true);
            this.renderComplete();
            this.wrapper = this.getWrapper();
        };
        CheckBox.prototype.setDisabled = function () {
            var wrapper = this.getWrapper();
            this.element.disabled = true;
            wrapper.classList.add(DISABLED);
            wrapper.setAttribute('aria-disabled', 'true');
        };
        CheckBox.prototype.setText = function (text) {
            var wrapper = this.getWrapper();
            if (!wrapper) {
                return;
            }
            var label = wrapper.getElementsByClassName(LABEL)[0];
            if (label) {
                label.textContent = text;
            }
            else {
                text = (this.enableHtmlSanitizer) ? ej2_base_2.SanitizeHtmlHelper.sanitize(text) : text;
                label = this.createElement('span', { className: LABEL, innerHTML: text });
                var labelWrap = wrapper.getElementsByTagName('label')[0];
                if (this.labelPosition === 'Before') {
                    labelWrap.insertBefore(label, wrapper.getElementsByClassName(FRAME)[0]);
                }
                else {
                    labelWrap.appendChild(label);
                }
            }
        };
        CheckBox.prototype.changeHandler = function (e) {
            e.stopPropagation();
        };
        CheckBox.prototype.formResetHandler = function () {
            this.checked = this.initialCheckedValue;
            this.element.checked = this.initialCheckedValue;
        };
        CheckBox.prototype.unWireEvents = function () {
            var wrapper = this.wrapper;
            ej2_base_2.EventHandler.remove(wrapper, 'click', this.clickHandler);
            ej2_base_2.EventHandler.remove(this.element, 'keyup', this.keyUpHandler);
            ej2_base_2.EventHandler.remove(this.element, 'focus', this.focusHandler);
            ej2_base_2.EventHandler.remove(this.element, 'focusout', this.focusOutHandler);
            var label = wrapper.getElementsByTagName('label')[0];
            ej2_base_2.EventHandler.remove(label, 'mousedown', this.labelMouseDownHandler);
            ej2_base_2.EventHandler.remove(label, 'mouseup', this.labelMouseUpHandler);
            var formElem = ej2_base_3.closest(this.element, 'form');
            if (formElem) {
                ej2_base_2.EventHandler.remove(formElem, 'reset', this.formResetHandler);
            }
            if (this.tagName === 'EJS-CHECKBOX') {
                ej2_base_2.EventHandler.remove(this.element, 'change', this.changeHandler);
            }
        };
        CheckBox.prototype.wireEvents = function () {
            var wrapper = this.getWrapper();
            ej2_base_2.EventHandler.add(wrapper, 'click', this.clickHandler, this);
            ej2_base_2.EventHandler.add(this.element, 'keyup', this.keyUpHandler, this);
            ej2_base_2.EventHandler.add(this.element, 'focus', this.focusHandler, this);
            ej2_base_2.EventHandler.add(this.element, 'focusout', this.focusOutHandler, this);
            var label = wrapper.getElementsByTagName('label')[0];
            ej2_base_2.EventHandler.add(label, 'mousedown', this.labelMouseDownHandler, this);
            ej2_base_2.EventHandler.add(label, 'mouseup', this.labelMouseUpHandler, this);
            var formElem = ej2_base_3.closest(this.element, 'form');
            if (formElem) {
                ej2_base_2.EventHandler.add(formElem, 'reset', this.formResetHandler, this);
            }
            if (this.tagName === 'EJS-CHECKBOX') {
                ej2_base_2.EventHandler.add(this.element, 'change', this.changeHandler, this);
            }
        };
        CheckBox.prototype.updateVueArrayModel = function (init) {
            if (this.isVue && typeof this.value === 'object') {
                var value = this.element.value;
                if (value && this.value) {
                    if (init) {
                        for (var i = 0; i < this.value.length; i++) {
                            if (value === this.value[i]) {
                                this.changeState('check');
                                this.setProperties({ 'checked': true }, true);
                            }
                        }
                    }
                    else {
                        var index = this.value.indexOf(value);
                        if (this.checked) {
                            if (index < 0) {
                                this.value.push(value);
                            }
                        }
                        else {
                            if (index > -1) {
                                this.value.splice(index, 1);
                            }
                        }
                        return this.value;
                    }
                }
            }
            return this.validCheck ? this.element.checked : !this.element.checked;
        };
        CheckBox.prototype.updateHtmlAttributeToWrapper = function () {
            if (!ej2_base_2.isNullOrUndefined(this.htmlAttributes)) {
                for (var _i = 0, _a = Object.keys(this.htmlAttributes); _i < _a.length; _i++) {
                    var key = _a[_i];
                    if (containerAttr.indexOf(key) > -1) {
                        var wrapper = this.getWrapper();
                        if (key === 'class') {
                            ej2_base_3.addClass([wrapper], this.htmlAttributes[key].split(' '));
                        }
                        else if (key === 'title') {
                            wrapper.setAttribute(key, this.htmlAttributes[key]);
                        }
                        else if (key === 'style') {
                            var frameSpan = this.getWrapper().getElementsByClassName(FRAME)[0];
                            frameSpan.setAttribute(key, this.htmlAttributes[key]);
                        }
                        else {
                            this.element.setAttribute(key, this.htmlAttributes[key]);
                        }
                    }
                }
            }
        };
        CheckBox.prototype.click = function () {
            this.element.click();
        };
        CheckBox.prototype.focusIn = function () {
            this.element.focus();
        };
        return CheckBox;
    }(ej2_base_1.Component));
    __decorate([
        ej2_base_2.Event()
    ], CheckBox.prototype, "change", void 0);
    __decorate([
        ej2_base_2.Event()
    ], CheckBox.prototype, "created", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], CheckBox.prototype, "checked", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], CheckBox.prototype, "cssClass", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], CheckBox.prototype, "disabled", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], CheckBox.prototype, "indeterminate", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], CheckBox.prototype, "label", void 0);
    __decorate([
        ej2_base_1.Property('After')
    ], CheckBox.prototype, "labelPosition", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], CheckBox.prototype, "name", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], CheckBox.prototype, "value", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], CheckBox.prototype, "enableHtmlSanitizer", void 0);
    __decorate([
        ej2_base_1.Property({})
    ], CheckBox.prototype, "htmlAttributes", void 0);
    CheckBox = __decorate([
        ej2_base_1.NotifyPropertyChanges
    ], CheckBox);
    exports.CheckBox = CheckBox;
});
