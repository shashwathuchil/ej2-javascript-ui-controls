define(["require", "exports", "../src/button/button", "@syncfusion/ej2-base", "./common.spec"], function (require, exports, button_1, ej2_base_1, common_spec_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Button', function () {
        beforeAll(function () {
            var isDef = function (o) { return o !== undefined && o !== null; };
            if (!isDef(window.performance)) {
                console.log('Unsupported environment, window.performance.memory is unavailable');
                _this.skip();
                return;
            }
        });
        var button;
        var element = ej2_base_1.createElement('button', { id: 'button' });
        document.body.appendChild(element);
        describe('DOM', function () {
            afterEach(function () {
                button.destroy();
            });
            it('Normal button testing', function () {
                button = new button_1.Button();
                button.appendTo('#button');
                expect(element.classList.contains('e-btn')).toEqual(true);
            });
            it('Primary button testing', function () {
                button = new button_1.Button({ isPrimary: true });
                button.appendTo('#button');
                expect(element.classList.contains('e-primary')).toEqual(true);
            });
            it('Disable state testing', function () {
                button = new button_1.Button({ disabled: true });
                button.appendTo('#button');
                expect(element.getAttribute('disabled')).toEqual('');
            });
            it('Small button testing', function () {
                button = new button_1.Button({ cssClass: 'e-small' });
                button.appendTo('#button');
                expect(element.classList.contains('e-small')).toEqual(true);
            });
            it('Icon button testing', function () {
                button = new button_1.Button({ iconCss: 'iconcss' });
                button.appendTo('#button');
                expect(element.children[0].classList.contains('iconcss')).toEqual(true);
            });
            it('Icon and text button testing', function () {
                element.textContent = 'Button';
                button = new button_1.Button({ iconCss: 'iconcss' });
                button.appendTo('#button');
                expect(element.children[0].classList.contains('iconcss')).toEqual(true);
                expect(element.textContent).toEqual('Button');
            });
            it('Text and Icon button testing', function () {
                element.textContent = 'Button';
                button = new button_1.Button({ iconCss: 'iconcss', iconPosition: 'Right' });
                button.appendTo('#button');
                expect(element.textContent).toEqual('Button');
                expect(element.children[0].classList.contains('iconcss')).toEqual(true);
            });
            it('Text and Top Icon button testing', function () {
                element.textContent = 'Button';
                button = new button_1.Button({ iconCss: 'iconcss', iconPosition: 'Top' });
                button.appendTo('#button');
                expect(element.classList).toContain('e-top-icon-btn');
                expect(element.childNodes[0].classList).toContain('e-icon-top');
            });
            it('Text and Bottom Icon button testing', function () {
                element.textContent = 'Button';
                button = new button_1.Button({ iconCss: 'iconcss', iconPosition: 'Bottom' });
                button.appendTo('#button');
                expect(element.classList).toContain('e-bottom-icon-btn');
                expect(element.childNodes[1].classList).toContain('e-icon-bottom');
            });
            it('RTL testing', function () {
                button = new button_1.Button({ enableRtl: true });
                button.appendTo('#button');
                expect(element.classList.contains('e-rtl')).toEqual(true);
            });
            it('CSS class testing', function () {
                button = new button_1.Button({ cssClass: 'e-secondary' });
                button.appendTo('#button');
                expect(element.classList.contains('e-secondary')).toEqual(true);
            });
            it('Content testing', function () {
                button = new button_1.Button({ content: '<span class="e-icons e-btn-icon e-add-icon e-icon-left"></span>Button' }, '#button');
                expect(element.childNodes[0].nodeName).toEqual('SPAN');
                expect(element.textContent).toEqual('Button');
            });
            it('Content and IconCss Testing', function () {
                button = new button_1.Button({ content: 'Button', iconCss: 'e-icons e-add-icon' }, '#button');
                expect(element.childNodes[0].nodeName).toEqual('SPAN');
                expect(element.textContent).toEqual('Button');
                button.destroy();
                button = new button_1.Button({ content: '<div>Button</div>', iconCss: 'e-icons e-add-icon', iconPosition: 'Right' }, '#button');
                expect(element.childNodes[0].nodeName).toEqual('DIV');
                expect(element.childNodes[1].nodeName).toEqual('SPAN');
                expect(element.textContent).toEqual('Button');
            });
            it('Toggle Button Testing', function () {
                button = new button_1.Button({ content: 'Button', isToggle: true }, '#button');
                button.element.click();
                expect(element.classList).toContain('e-active');
                button.element.click();
                expect(element.classList).not.toContain('e-active');
            });
        });
        describe('Property', function () {
            afterEach(function () {
                button.destroy();
            });
            it('Primary button testing', function () {
                button = new button_1.Button({ isPrimary: true });
                button.appendTo('#button');
                expect(button.isPrimary).toEqual(true);
            });
            it('Disable state testing', function () {
                button = new button_1.Button({ disabled: true });
                button.appendTo('#button');
                expect(button.disabled).toEqual(true);
            });
            it('Icon button testing', function () {
                button = new button_1.Button({ iconCss: 'iconcss' });
                button.appendTo('#button');
                expect(button.iconCss).toEqual('iconcss');
            });
            it('Icon and text button testing', function () {
                element.textContent = 'Button';
                button = new button_1.Button({ iconCss: 'iconcss' });
                button.appendTo('#button');
                expect(button.iconCss).toEqual('iconcss');
                expect(button.iconPosition).toEqual('Left');
            });
            it('Text and Icon button testing', function () {
                element.textContent = 'Button';
                button = new button_1.Button({ iconCss: 'iconcss', iconPosition: 'Right' });
                button.appendTo('#button');
                expect(button.iconCss).toEqual('iconcss');
                expect(button.iconPosition).toEqual('Right');
            });
            it('RTL testing', function () {
                button = new button_1.Button({ enableRtl: true });
                button.appendTo('#button');
                expect(button.enableRtl).toEqual(true);
            });
            it('CSS class testing', function () {
                button = new button_1.Button({ cssClass: 'e-secondary' });
                button.appendTo('#button');
                expect(button.cssClass).toEqual('e-secondary');
            });
            it('Content testing', function () {
                button = new button_1.Button({ content: '<span class="e-icons e-btn-icon e-add-icon e-icon-left"></span>Button' }, '#button');
                expect(button.content).toEqual('<span class="e-icons e-btn-icon e-add-icon e-icon-left"></span>Button');
            });
            it('Toggle Button Testing', function () {
                button = new button_1.Button({ isToggle: true }, '#button');
                expect(button.isToggle).toEqual(true);
            });
            it('Enable Html Sanitizer testing', function () {
                button = new button_1.Button({ content: 'Button<style>body{background:rgb(0, 0, 255)}</style>', enableHtmlSanitizer: true }, '#button');
                var htmlele = document.body;
                expect(button.content).toEqual('Button<style>body{background:rgb(0, 0, 255)}</style>');
                expect(window.getComputedStyle(htmlele).backgroundColor).not.toBe('rgb(0, 0, 255)');
            });
            it('Enable Html Sanitizer disabled testing', function () {
                button = new button_1.Button({ content: '<style>body{background:rgb(0, 0, 255)}</style>' }, '#button');
                var htmlele = document.body;
                expect(window.getComputedStyle(htmlele).backgroundColor).toBe('rgb(0, 0, 255)');
            });
        });
        describe('notify property changes of', function () {
            afterEach(function () {
                button.destroy();
            });
            it('Primary in onPropertyChanged', function () {
                button = new button_1.Button();
                button.appendTo('#button');
                button.isPrimary = true;
                button.dataBind();
                expect(element.classList.contains('e-primary')).toEqual(true);
                button.isPrimary = false;
                button.dataBind();
                expect(element.classList.contains('e-primary')).toEqual(false);
            });
            it('Disabled in onPropertyChanged', function () {
                button = new button_1.Button();
                button.appendTo('#button');
                button.disabled = true;
                button.dataBind();
                expect(element.getAttribute('disabled')).toEqual('');
                button.disabled = false;
                button.dataBind();
                expect(element.getAttribute('disabled')).toEqual(null);
            });
            it('IconCss in onPropertyChanged', function () {
                button = new button_1.Button({ iconCss: 'icon', content: 'iconcss' });
                button.appendTo('#button');
                button.iconCss = 'iconcss';
                button.dataBind();
                expect(element.children[0].classList.contains('iconcss')).toEqual(true);
                element.innerHTML = '';
                button.iconCss = 'iconclass';
                button.dataBind();
                expect(element.children[0].classList.contains('iconclass')).toEqual(true);
                button.destroy();
                button.iconPosition = 'Right';
                button.iconCss = 'iconcss';
                button.dataBind();
                expect(element.children[0].classList.contains('iconcss')).toEqual(true);
            });
            it('IconPosition right in onPropertyChanged', function () {
                element.textContent = 'Button';
                button = new button_1.Button({ iconCss: 'iconcss' });
                button.appendTo('#button');
                button.iconCss = 'icon-right';
                button.iconPosition = 'Right';
                button.dataBind();
                expect(element.textContent).toEqual('Button');
                expect(element.children[0].classList.contains('icon-right')).toEqual(true);
                expect(element.children[0].classList.contains('e-icon-right')).toEqual(true);
            });
            it('IconPosition left in onPropertyChanged', function () {
                element.textContent = 'Button';
                button = new button_1.Button({ iconCss: 'iconcss', iconPosition: 'Right' });
                button.appendTo('#button');
                button.iconPosition = 'Left';
                button.dataBind();
                expect(element.children[0].classList.contains('iconcss')).toEqual(true);
                expect(element.textContent).toEqual('Button');
                button.destroy();
                button.element.innerHTML = '';
                button.element.textContent = 'Button';
                button = new button_1.Button({ iconCss: 'iconcss' });
                button.appendTo('#button');
                ej2_base_1.detach(button.element.getElementsByTagName('span')[0]);
                button.iconPosition = 'Right';
                button.dataBind();
                expect(element.children[0].classList.contains('iconcss')).toEqual(true);
                expect(element.textContent).toEqual('Button');
            });
            it('CssClass in onPropertyChanged', function () {
                button = new button_1.Button({ cssClass: 'class' });
                button.appendTo('#button');
                button.cssClass = 'styleclass';
                button.dataBind();
                expect(element.classList.contains('styleclass')).toEqual(true);
                button = new button_1.Button();
                button.appendTo('#button');
                button.cssClass = 'styleclass';
                button.dataBind();
                expect(element.classList.contains('styleclass')).toEqual(true);
            });
            it('EnableRtl in onPropertyChanged', function () {
                button = new button_1.Button();
                button.appendTo('#button');
                button.enableRtl = true;
                button.dataBind();
                expect(element.classList.contains('e-rtl')).toEqual(true);
                button.enableRtl = false;
                button.dataBind();
                expect(element.classList.contains('e-rtl')).toEqual(false);
            });
            it('Content in onPropertyChanged', function () {
                button = new button_1.Button();
                button.appendTo('#button');
                button.content = 'play';
                button.dataBind();
                expect(element.textContent).toEqual('play');
                button.iconCss = 'e-icons e-add-icon';
                button.iconPosition = 'Left';
                button.dataBind();
                expect(element.childNodes[0].nodeName).toEqual('SPAN');
                expect(element.childNodes[1].nodeName).toEqual('#text');
                expect(element.textContent).toEqual('play');
                button.element.innerHTML = '';
                button.content = 'Content';
                button.dataBind();
                expect(element.childNodes[0].nodeName).toEqual('SPAN');
                expect(element.textContent).toEqual('Content');
            });
            it('Toggle in onPropertyChanged', function () {
                button = new button_1.Button({}, '#button');
                button.isToggle = true;
                button.dataBind();
                button.element.click();
                expect(element.classList).toContain('e-active');
                button.isToggle = false;
                button.dataBind();
                button.element.click();
                expect(element.classList).not.toContain('e-active');
            });
        });
        describe('methods', function () {
            it('destroy method', function () {
                button = new button_1.Button();
                button.appendTo('#button');
                button.destroy();
                expect(element.classList.contains('e-btn')).toEqual(false);
            });
            it('getModuleName method', function () {
                button = new button_1.Button();
                button.appendTo('#button');
                expect(button.getModuleName()).toEqual('btn');
            });
            it('getPersistData & inject method', function () {
                button = new button_1.Button({ enablePersistence: true });
                button.appendTo('#button');
                expect(button.getPersistData()).toEqual('{}');
                button_1.Button.Inject();
            });
            it('Native methods - Click and Focus ', function () {
                button = new button_1.Button();
                button.appendTo('#button');
                button.click();
                button.focusIn();
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
