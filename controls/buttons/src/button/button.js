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
define(["require", "exports", "@syncfusion/ej2-base", "@syncfusion/ej2-base", "@syncfusion/ej2-base", "../common/common"], function (require, exports, ej2_base_1, ej2_base_2, ej2_base_3, common_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.buttonObserver = new ej2_base_3.Observer();
    var cssClassName = {
        RTL: 'e-rtl',
        BUTTON: 'e-btn',
        PRIMARY: 'e-primary',
        ICONBTN: 'e-icon-btn'
    };
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button(options, element) {
            return _super.call(this, options, element) || this;
        }
        Button.prototype.preRender = function () {
        };
        Button.prototype.render = function () {
            this.initialize();
            this.removeRippleEffect = ej2_base_3.rippleEffect(this.element, { selector: '.' + cssClassName.BUTTON });
            this.renderComplete();
        };
        Button.prototype.initialize = function () {
            if (this.cssClass) {
                ej2_base_2.addClass([this.element], this.cssClass.split(' '));
            }
            if (this.isPrimary) {
                this.element.classList.add(cssClassName.PRIMARY);
            }
            if (!ej2_base_1.isBlazor() || (ej2_base_1.isBlazor() && this.getModuleName() !== 'progress-btn')) {
                if (this.content) {
                    var tempContent = (this.enableHtmlSanitizer) ? ej2_base_3.SanitizeHtmlHelper.sanitize(this.content) : this.content;
                    this.element.innerHTML = tempContent;
                }
                this.setIconCss();
            }
            if (this.enableRtl) {
                this.element.classList.add(cssClassName.RTL);
            }
            if (this.disabled) {
                this.controlStatus(this.disabled);
            }
            else {
                this.wireEvents();
            }
        };
        Button.prototype.controlStatus = function (disabled) {
            this.element.disabled = disabled;
        };
        Button.prototype.setIconCss = function () {
            if (this.iconCss) {
                var span = this.createElement('span', { className: 'e-btn-icon ' + this.iconCss });
                if (!this.element.textContent.trim()) {
                    this.element.classList.add(cssClassName.ICONBTN);
                }
                else {
                    span.classList.add('e-icon-' + this.iconPosition.toLowerCase());
                    if (this.iconPosition === 'Top' || this.iconPosition === 'Bottom') {
                        this.element.classList.add('e-' + this.iconPosition.toLowerCase() + '-icon-btn');
                    }
                }
                var node = this.element.childNodes[0];
                if (node && (this.iconPosition === 'Left' || this.iconPosition === 'Top')) {
                    this.element.insertBefore(span, node);
                }
                else {
                    this.element.appendChild(span);
                }
            }
        };
        Button.prototype.wireEvents = function () {
            if (this.isToggle) {
                ej2_base_3.EventHandler.add(this.element, 'click', this.btnClickHandler, this);
            }
        };
        Button.prototype.unWireEvents = function () {
            if (this.isToggle) {
                ej2_base_3.EventHandler.remove(this.element, 'click', this.btnClickHandler);
            }
        };
        Button.prototype.btnClickHandler = function () {
            if (this.element.classList.contains('e-active')) {
                this.element.classList.remove('e-active');
            }
            else {
                this.element.classList.add('e-active');
            }
        };
        Button.prototype.destroy = function () {
            var classList = [cssClassName.PRIMARY, cssClassName.RTL, cssClassName.ICONBTN, 'e-success', 'e-info', 'e-danger',
                'e-warning', 'e-flat', 'e-outline', 'e-small', 'e-bigger', 'e-active', 'e-round',
                'e-top-icon-btn', 'e-bottom-icon-btn'];
            if (this.cssClass) {
                classList = classList.concat(this.cssClass.split(' '));
            }
            _super.prototype.destroy.call(this);
            ej2_base_2.removeClass([this.element], classList);
            if (!this.element.getAttribute('class')) {
                this.element.removeAttribute('class');
            }
            if (this.disabled) {
                this.element.removeAttribute('disabled');
            }
            if (this.content) {
                this.element.innerHTML = this.element.innerHTML.replace(this.content, '');
            }
            var span = this.element.querySelector('span.e-btn-icon');
            if (span) {
                ej2_base_2.detach(span);
            }
            this.unWireEvents();
            if (ej2_base_1.isRippleEnabled) {
                this.removeRippleEffect();
            }
        };
        Button.prototype.getModuleName = function () {
            return 'btn';
        };
        Button.prototype.getPersistData = function () {
            return this.addOnPersist([]);
        };
        Button.Inject = function () {
        };
        Button.prototype.onPropertyChanged = function (newProp, oldProp) {
            var span = this.element.querySelector('span.e-btn-icon');
            for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
                var prop = _a[_i];
                switch (prop) {
                    case 'isPrimary':
                        if (newProp.isPrimary) {
                            this.element.classList.add(cssClassName.PRIMARY);
                        }
                        else {
                            this.element.classList.remove(cssClassName.PRIMARY);
                        }
                        break;
                    case 'disabled':
                        this.controlStatus(newProp.disabled);
                        break;
                    case 'iconCss': {
                        if (span) {
                            if (newProp.iconCss) {
                                span.className = 'e-btn-icon ' + newProp.iconCss;
                                if (this.element.textContent.trim()) {
                                    if (this.iconPosition === 'Left') {
                                        span.classList.add('e-icon-left');
                                    }
                                    else {
                                        span.classList.add('e-icon-right');
                                    }
                                }
                            }
                            else {
                                ej2_base_2.detach(span);
                            }
                        }
                        else {
                            this.setIconCss();
                        }
                        break;
                    }
                    case 'iconPosition':
                        ej2_base_2.removeClass([this.element], ['e-top-icon-btn', 'e-bottom-icon-btn']);
                        span = this.element.querySelector('span.e-btn-icon');
                        if (span) {
                            ej2_base_2.detach(span);
                        }
                        this.setIconCss();
                        break;
                    case 'cssClass':
                        if (oldProp.cssClass) {
                            ej2_base_2.removeClass([this.element], oldProp.cssClass.split(' '));
                        }
                        if (newProp.cssClass) {
                            ej2_base_2.addClass([this.element], newProp.cssClass.split(' '));
                        }
                        break;
                    case 'enableRtl':
                        if (newProp.enableRtl) {
                            this.element.classList.add(cssClassName.RTL);
                        }
                        else {
                            this.element.classList.remove(cssClassName.RTL);
                        }
                        break;
                    case 'content': {
                        var node = common_1.getTextNode(this.element);
                        if (!node) {
                            this.element.classList.remove(cssClassName.ICONBTN);
                        }
                        if (!ej2_base_1.isBlazor() || (ej2_base_1.isBlazor() && !this.isServerRendered && this.getModuleName() !== 'progress-btn')) {
                            if (this.enableHtmlSanitizer) {
                                newProp.content = ej2_base_3.SanitizeHtmlHelper.sanitize(newProp.content);
                            }
                            this.element.innerHTML = newProp.content;
                            this.setIconCss();
                        }
                        break;
                    }
                    case 'isToggle':
                        if (newProp.isToggle) {
                            ej2_base_3.EventHandler.add(this.element, 'click', this.btnClickHandler, this);
                        }
                        else {
                            ej2_base_3.EventHandler.remove(this.element, 'click', this.btnClickHandler);
                            ej2_base_2.removeClass([this.element], ['e-active']);
                        }
                        break;
                }
            }
        };
        Button.prototype.click = function () {
            this.element.click();
        };
        Button.prototype.focusIn = function () {
            this.element.focus();
        };
        return Button;
    }(ej2_base_1.Component));
    __decorate([
        ej2_base_1.Property('Left')
    ], Button.prototype, "iconPosition", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], Button.prototype, "iconCss", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], Button.prototype, "disabled", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], Button.prototype, "isPrimary", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], Button.prototype, "cssClass", void 0);
    __decorate([
        ej2_base_1.Property('')
    ], Button.prototype, "content", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], Button.prototype, "isToggle", void 0);
    __decorate([
        ej2_base_1.Property()
    ], Button.prototype, "locale", void 0);
    __decorate([
        ej2_base_1.Property(false)
    ], Button.prototype, "enableHtmlSanitizer", void 0);
    __decorate([
        ej2_base_2.Event()
    ], Button.prototype, "created", void 0);
    Button = __decorate([
        ej2_base_1.NotifyPropertyChanges
    ], Button);
    exports.Button = Button;
});
