define(["require", "exports", "../src/chips/index", "@syncfusion/ej2-base"], function (require, exports, index_1, ej2_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function deepCloning(data) {
        return ej2_base_1.extend([], data, [], true);
    }
    function fireEvent(ele, type, key) {
        var event = document.createEvent('Events');
        event.initEvent(type, true, false);
        ele.dispatchEvent(event);
    }
    var stringArray = ['chip1', 'chip2', 'chip3'];
    var numberArray = [1, 2, 3];
    var jsonArray = [{ text: 'chip1' }, { text: 'chip2' }, { text: 'chip3' }];
    var jsonArrayValue = [{ text: 'chip1', value: '11' }, { text: 'chip2', value: '22' }, { text: 'chip3', value: '33' }];
    describe('Chips', function () {
        var chips;
        var element = ej2_base_1.createElement('div', { id: 'chip' });
        document.body.appendChild(element);
        describe('DOM Structure', function () {
            describe('Chip component (single)', function () {
                afterEach(function () {
                    chips.destroy();
                    element.innerText = '';
                });
                it('Chip component with text property', function () {
                    chips = new index_1.ChipList({ text: 'chip content' }, '#chip');
                    expect(element.classList.contains('e-chip-list')).toBe(true);
                    expect(element.classList.contains('e-chip')).toBe(true);
                    expect(element.classList.contains('e-chip-set')).toBe(false);
                    expect(element.getAttribute('tabindex')).toBe('0');
                    expect(element.getAttribute('role')).toBe('option');
                    expect(element.getAttribute('aria-label')).toBe('chip content');
                    expect(element.innerText).toBe('chip content');
                });
                it('Chip component with innertext', function () {
                    element.innerText = 'chip innertext';
                    chips = new index_1.ChipList({ text: 'chip content' }, '#chip');
                    expect(element.classList.contains('e-chip-list')).toBe(true);
                    expect(element.classList.contains('e-chip')).toBe(true);
                    expect(element.classList.contains('e-chip-set')).toBe(false);
                    expect(element.innerText).toBe('chip innertext');
                    expect(element.getAttribute('tabindex')).toBe('0');
                    expect(element.getAttribute('role')).toBe('option');
                    expect(element.getAttribute('aria-label')).toBe('chip innertext');
                    expect(element.innerText).toBe('chip innertext');
                });
                it('Chip component - Text Element', function () {
                    chips = new index_1.ChipList({ text: 'chip content' }, '#chip');
                    expect(element.children.length).toBe(1);
                    var textElement = element.children[0];
                    expect(textElement.tagName).toBe('SPAN');
                    expect(textElement.classList.contains('e-chip-text')).toBe(true);
                    expect(textElement.innerText).toBe('chip content');
                });
                it('Chip component - leadingicon Element', function () {
                    chips = new index_1.ChipList({ text: 'chip content', leadingIconCss: 'icon' }, '#chip');
                    expect(element.children.length).toBe(2);
                    expect(element.classList.contains('e-chip-icon-wrap')).toBe(true);
                    var leadingIconElement = element.children[0];
                    expect(leadingIconElement.tagName).toBe('SPAN');
                    expect(leadingIconElement.classList.contains('e-chip-icon')).toBe(true);
                    expect(leadingIconElement.classList.contains('icon')).toBe(true);
                });
                it('Chip component - Avatar Element', function () {
                    chips = new index_1.ChipList({ text: 'chip content', leadingIconCss: 'icon', avatarIconCss: 'avatar' }, '#chip');
                    expect(element.children.length).toBe(2);
                    expect(element.classList.contains('e-chip-avatar-wrap')).toBe(true);
                    var avatarElement = element.children[0];
                    expect(avatarElement.tagName).toBe('SPAN');
                    expect(avatarElement.classList.contains('e-chip-avatar')).toBe(true);
                    expect(avatarElement.classList.contains('avatar')).toBe(true);
                    expect(avatarElement.classList.contains('icon')).toBe(false);
                });
                it('Chip component - AvatarLetter Element', function () {
                    chips = new index_1.ChipList({ text: 'chip content', leadingIconCss: 'icon', avatarIconCss: 'avatar', avatarText: 'MR' }, '#chip');
                    expect(element.children.length).toBe(2);
                    expect(element.classList.contains('e-chip-avatar-wrap')).toBe(true);
                    var avatarElement = element.children[0];
                    expect(avatarElement.tagName).toBe('SPAN');
                    expect(avatarElement.classList.contains('e-chip-avatar')).toBe(true);
                    expect(avatarElement.classList.contains('avatar')).toBe(true);
                    expect(avatarElement.classList.contains('icon')).toBe(false);
                    expect(avatarElement.innerText).toBe('MR');
                });
                it('Chip component - trailingicon Element', function () {
                    chips = new index_1.ChipList({ text: 'chip content', trailingIconCss: 'icon' }, '#chip');
                    expect(element.children.length).toBe(2);
                    var trailingicon = element.children[1];
                    expect(trailingicon.tagName).toBe('SPAN');
                    expect(trailingicon.classList.contains('e-chip-delete')).toBe(true);
                    expect(trailingicon.classList.contains('icon')).toBe(true);
                });
                it('Chip component - combined', function () {
                    chips = new index_1.ChipList({ text: 'chip content', leadingIconCss: 'icon', avatarIconCss: 'avatar', avatarText: 'MR', trailingIconCss: 'icon' }, '#chip');
                    expect(element.children.length).toBe(3);
                    expect(element.classList.contains('e-chip-avatar-wrap')).toBe(true);
                    expect(element.classList.contains('e-chip-icon-wrap')).toBe(false);
                    expect(element.children[0].classList.contains('e-chip-avatar')).toBe(true);
                    expect(element.children[1].classList.contains('e-chip-text')).toBe(true);
                    expect(element.children[2].classList.contains('e-chip-delete')).toBe(true);
                });
                it('Chip component - combined without avatar', function () {
                    chips = new index_1.ChipList({ text: 'chip content', leadingIconCss: 'icon', trailingIconCss: 'icon' }, '#chip');
                    expect(element.children.length).toBe(3);
                    expect(element.classList.contains('e-chip-icon-wrap')).toBe(true);
                    expect(element.classList.contains('e-chip-avatar-wrap')).toBe(false);
                    expect(element.children[0].classList.contains('e-chip-icon')).toBe(true);
                    expect(element.children[1].classList.contains('e-chip-text')).toBe(true);
                    expect(element.children[2].classList.contains('e-chip-delete')).toBe(true);
                });
            });
            describe('ChipList component (set)', function () {
                afterEach(function () {
                    chips.destroy();
                });
                it('Chips without text content should act as chipset', function () {
                    chips = new index_1.ChipList({}, '#chip');
                    expect(element.classList.contains('e-chip-list')).toBe(true);
                    expect(element.classList.contains('e-chip')).toBe(false);
                    expect(element.classList.contains('e-chip-set')).toBe(true);
                    expect(element.getAttribute('role')).toBe('listbox');
                    expect(element.getAttribute('aria-multiselectable')).toBe('false');
                    expect(element.innerText).toBe('');
                    ;
                });
                it('Chip component - class', function () {
                    chips = new index_1.ChipList({ chips: stringArray.slice() }, '#chip');
                    expect(element.classList.contains('e-chip-list')).toBe(true);
                    expect(element.classList.contains('e-chip')).toBe(false);
                    expect(element.classList.contains('e-chip-set')).toBe(true);
                    var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    expect(chipCollection.length).toBe(3);
                    expect(chipCollection[0].classList.contains('e-chip')).toBe(true);
                });
                it('Chip component - attribute', function () {
                    chips = new index_1.ChipList({ chips: stringArray.slice() }, '#chip');
                    expect(element.getAttribute('role')).toBe('listbox');
                    expect(element.getAttribute('aria-multiselectable')).toBe('false');
                    var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    expect(chipCollection.length).toBe(3);
                    expect(chipCollection[0].getAttribute('role')).toBe('option');
                    expect(chipCollection[0].getAttribute('aria-label')).toBe('chip1');
                    expect(chipCollection[0].getAttribute('tabindex')).toBe('0');
                });
                it('Chip component - Text Element', function () {
                    chips = new index_1.ChipList({ chips: stringArray.slice() }, '#chip');
                    var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    var firstChipTextElement = chipCollection[0].children[0];
                    expect(firstChipTextElement.tagName).toBe('SPAN');
                    expect(firstChipTextElement.classList.contains('e-chip-text')).toBe(true);
                    expect(firstChipTextElement.innerText).toBe('chip1');
                });
                it('Chip component - leadingicon Element', function () {
                    chips = new index_1.ChipList({ chips: stringArray.slice(), leadingIconCss: 'icon' }, '#chip');
                    var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    expect(chipCollection[0].children.length).toBe(2);
                    expect(chipCollection[0].classList.contains('e-chip-icon-wrap')).toBe(true);
                    var leadingIconElement = chipCollection[0].children[0];
                    expect(leadingIconElement.tagName).toBe('SPAN');
                    expect(leadingIconElement.classList.contains('e-chip-icon')).toBe(true);
                    expect(leadingIconElement.classList.contains('icon')).toBe(true);
                });
                it('Chip component - Avatar Element', function () {
                    chips = new index_1.ChipList({ chips: stringArray.slice(), leadingIconCss: 'icon', avatarIconCss: 'avatar' }, '#chip');
                    var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    expect(chipCollection[0].children.length).toBe(2);
                    expect(chipCollection[0].classList.contains('e-chip-avatar-wrap')).toBe(true);
                    var avatarElement = chipCollection[0].children[0];
                    expect(avatarElement.tagName).toBe('SPAN');
                    expect(avatarElement.classList.contains('e-chip-avatar')).toBe(true);
                    expect(avatarElement.classList.contains('avatar')).toBe(true);
                    expect(avatarElement.classList.contains('icon')).toBe(false);
                });
                it('Chip component - AvatarLetter Element', function () {
                    chips = new index_1.ChipList({ chips: stringArray.slice(), leadingIconCss: 'icon', avatarIconCss: 'avatar', avatarText: 'MR' }, '#chip');
                    var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    expect(chipCollection[0].children.length).toBe(2);
                    expect(chipCollection[0].classList.contains('e-chip-avatar-wrap')).toBe(true);
                    var avatarElement = chipCollection[0].children[0];
                    expect(avatarElement.tagName).toBe('SPAN');
                    expect(avatarElement.classList.contains('e-chip-avatar')).toBe(true);
                    expect(avatarElement.classList.contains('avatar')).toBe(true);
                    expect(avatarElement.classList.contains('icon')).toBe(false);
                    expect(avatarElement.innerText).toBe('MR');
                });
                it('Chip component - trailingicon Element', function () {
                    chips = new index_1.ChipList({ chips: stringArray.slice(), trailingIconCss: 'icon' }, '#chip');
                    var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    expect(chipCollection[0].children.length).toBe(2);
                    var trailingicon = chipCollection[0].children[1];
                    expect(trailingicon.tagName).toBe('SPAN');
                    expect(trailingicon.classList.contains('e-chip-delete')).toBe(true);
                    expect(trailingicon.classList.contains('icon')).toBe(true);
                });
                it('Chip component - combined', function () {
                    chips = new index_1.ChipList({ chips: stringArray.slice(), leadingIconCss: 'icon', avatarIconCss: 'avatar', avatarText: 'MR', trailingIconCss: 'icon' }, '#chip');
                    var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    expect(chipCollection[0].children.length).toBe(3);
                    expect(chipCollection[0].classList.contains('e-chip-avatar-wrap')).toBe(true);
                    expect(chipCollection[0].classList.contains('e-chip-icon-wrap')).toBe(false);
                    expect(chipCollection[0].children[0].classList.contains('e-chip-avatar')).toBe(true);
                    expect(chipCollection[0].children[1].classList.contains('e-chip-text')).toBe(true);
                    expect(chipCollection[0].children[2].classList.contains('e-chip-delete')).toBe(true);
                });
                it('Chip component - combined without avatar', function () {
                    chips = new index_1.ChipList({ chips: stringArray.slice(), leadingIconCss: 'icon', trailingIconCss: 'icon' }, '#chip');
                    var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    expect(chipCollection[0].children.length).toBe(3);
                    expect(chipCollection[0].classList.contains('e-chip-icon-wrap')).toBe(true);
                    expect(chipCollection[0].classList.contains('e-chip-avatar-wrap')).toBe(false);
                    expect(chipCollection[0].children[0].classList.contains('e-chip-icon')).toBe(true);
                    expect(chipCollection[0].children[1].classList.contains('e-chip-text')).toBe(true);
                    expect(chipCollection[0].children[2].classList.contains('e-chip-delete')).toBe(true);
                });
            });
        });
        describe('chips dataSource', function () {
            describe('chip(single) - dataSource', function () {
                afterEach(function () {
                    chips.destroy();
                    element.innerText = '';
                });
                it('Chip component - text property', function () {
                    chips = new index_1.ChipList({ text: 'chip content' }, '#chip');
                    expect(element.innerText).toBe('chip content');
                });
                it('Chip component - inner text', function () {
                    element.innerText = 'chip innertext';
                    chips = new index_1.ChipList({ text: 'chip content' }, '#chip');
                    expect(element.innerText).toBe('chip innertext');
                });
            });
            describe('chiplist(set) - dataSource', function () {
                afterEach(function () {
                    chips.destroy();
                });
                it('Chip component - Array of string', function () {
                    chips = new index_1.ChipList({ chips: stringArray.slice() }, '#chip');
                    var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    expect(chipCollection[0].innerText).toBe('chip1');
                    expect(chipCollection[1].innerText).toBe('chip2');
                    expect(chipCollection[2].innerText).toBe('chip3');
                });
                it('Chip component - Array of string', function () {
                    chips = new index_1.ChipList({ chips: numberArray.slice() }, '#chip');
                    var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    expect(chipCollection[0].innerText).toBe('1');
                    expect(chipCollection[1].innerText).toBe('2');
                    expect(chipCollection[2].innerText).toBe('3');
                });
                it('Chip component - Array of string', function () {
                    chips = new index_1.ChipList({ chips: deepCloning(jsonArray) }, '#chip');
                    var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    expect(chipCollection[0].innerText).toBe('chip1');
                    expect(chipCollection[1].innerText).toBe('chip2');
                    expect(chipCollection[2].innerText).toBe('chip3');
                });
            });
        });
        describe('chips property', function () {
            describe('chip(single) - property', function () {
                afterEach(function () {
                    chips.destroy();
                    element.innerText = '';
                });
                it('Chip component - text', function () {
                    chips = new index_1.ChipList({ text: 'chip content' }, '#chip');
                    expect(element.innerText).toBe('chip content');
                    chips.text = 'chip3';
                    chips.dataBind();
                    expect(element.innerText).toBe('chip3');
                });
                it('Chip component - avatarIconCss', function () {
                    chips = new index_1.ChipList({ text: 'chip content', avatarIconCss: 'avataricon icon1' }, '#chip');
                    var avatarIconelement = element.querySelector('.e-chip-avatar');
                    expect(avatarIconelement.classList.contains('avataricon')).toBe(true);
                    expect(avatarIconelement.classList.contains('icon1')).toBe(true);
                    chips.avatarIconCss = 'avataricon3 io';
                    chips.dataBind();
                    avatarIconelement = element.querySelector('.e-chip-avatar');
                    expect(avatarIconelement.classList.contains('avataricon3')).toBe(true);
                    expect(avatarIconelement.classList.contains('avataricon')).toBe(false);
                    expect(avatarIconelement.classList.contains('icon1')).toBe(false);
                    expect(avatarIconelement.classList.contains('io')).toBe(true);
                });
                it('Chip component - avatarText', function () {
                    chips = new index_1.ChipList({ text: 'chip content', avatarIconCss: 'avataricon icon1', avatarText: 'MR' }, '#chip');
                    var avatarIconelement = element.querySelector('.e-chip-avatar');
                    expect(avatarIconelement.classList.contains('avataricon')).toBe(true);
                    expect(avatarIconelement.classList.contains('icon1')).toBe(true);
                    expect(avatarIconelement.innerText).toBe('MR');
                    chips.avatarIconCss = 'avataricon3 io';
                    chips.avatarText = 'AC';
                    chips.dataBind();
                    avatarIconelement = element.querySelector('.e-chip-avatar');
                    expect(avatarIconelement.classList.contains('avataricon3')).toBe(true);
                    expect(avatarIconelement.classList.contains('io')).toBe(true);
                    expect(avatarIconelement.classList.contains('avataricon')).toBe(false);
                    expect(avatarIconelement.classList.contains('icon1')).toBe(false);
                    expect(avatarIconelement.innerText).toBe('AC');
                });
                it('Chip component - leadingIconCss', function () {
                    chips = new index_1.ChipList({ text: 'chip content', leadingIconCss: 'leadingicon icon1' }, '#chip');
                    var leadingIconelement = element.querySelector('.e-chip-icon');
                    expect(leadingIconelement.classList.contains('leadingicon')).toBe(true);
                    expect(leadingIconelement.classList.contains('icon1')).toBe(true);
                    chips.leadingIconCss = 'leadingicon3 io';
                    chips.dataBind();
                    leadingIconelement = element.querySelector('.e-chip-icon');
                    expect(leadingIconelement.classList.contains('leadingicon3')).toBe(true);
                    expect(leadingIconelement.classList.contains('io')).toBe(true);
                    expect(leadingIconelement.classList.contains('leadingicon')).toBe(false);
                    expect(leadingIconelement.classList.contains('icon1')).toBe(false);
                });
                it('Chip component - trailingIconCss', function () {
                    chips = new index_1.ChipList({ text: 'chip content', trailingIconCss: 'trailingicon icon1' }, '#chip');
                    var trailingIconelement = element.querySelector('.e-chip-delete');
                    expect(trailingIconelement.classList.contains('trailingicon')).toBe(true);
                    expect(trailingIconelement.classList.contains('icon1')).toBe(true);
                    chips.trailingIconCss = 'trailingicon3 io';
                    chips.dataBind();
                    trailingIconelement = element.querySelector('.e-chip-delete');
                    expect(trailingIconelement.classList.contains('trailingicon3')).toBe(true);
                    expect(trailingIconelement.classList.contains('io')).toBe(true);
                    expect(trailingIconelement.classList.contains('trailingicon')).toBe(false);
                    expect(trailingIconelement.classList.contains('icon1')).toBe(false);
                });
                it('Chip component - iconCss', function () {
                    chips = new index_1.ChipList({ text: 'chip content', cssClass: 'iconcss icon1' }, '#chip');
                    expect(element.classList.contains('iconcss')).toBe(true);
                    expect(element.classList.contains('icon1')).toBe(true);
                    chips.cssClass = 'iconcss3 io';
                    chips.dataBind();
                    expect(element.classList.contains('iconcss3')).toBe(true);
                    expect(element.classList.contains('io')).toBe(true);
                    expect(element.classList.contains('iconcss')).toBe(false);
                    expect(element.classList.contains('icon1')).toBe(false);
                });
                it('Chip component - enableRTL', function () {
                    chips = new index_1.ChipList({ text: 'chip content', enableRtl: true }, '#chip');
                    expect(element.classList.contains('e-rtl')).toBe(true);
                    chips.enableRtl = false;
                    chips.dataBind();
                    expect(element.classList.contains('e-rtl')).toBe(false);
                });
                it('Chip component - enabled', function () {
                    chips = new index_1.ChipList({ text: 'chip content', enabled: false }, '#chip');
                    expect(element.classList.contains('e-disabled')).toBe(true);
                    chips.enabled = true;
                    chips.dataBind();
                    expect(element.classList.contains('e-disabled')).toBe(false);
                });
                it('Chip component - enableDelete should not work', function () {
                    chips = new index_1.ChipList({ text: 'chip content', enableDelete: true }, '#chip');
                    var deleteElement = element.querySelector('.e-chip-delete');
                    expect(deleteElement).toBe(null);
                });
                it('Chip component - selection(Single) should not work', function () {
                    chips = new index_1.ChipList({ text: 'chip content', selection: 'Single' }, '#chip');
                    expect(element.getAttribute('aria-multiselectable')).toBe(null);
                    fireEvent(element, 'click');
                    var activeElement = element.querySelector('.e-active');
                    expect(activeElement).toBe(null);
                });
                it('Chip component - selection(Multiple) should not work', function () {
                    chips = new index_1.ChipList({ text: 'chip content', selection: "Multiple" }, '#chip');
                    expect(element.getAttribute('aria-multiselectable')).toBe(null);
                    fireEvent(element, 'click');
                    var activeElement = element.querySelector('.e-active');
                    expect(activeElement).toBe(null);
                });
                it('Chip component - selectedChips should not work', function () {
                    chips = new index_1.ChipList({ text: 'chip content', selection: "Single", selectedChips: 0 }, '#chip');
                    expect(element.getAttribute('aria-multiselectable')).toBe(null);
                    var activeElement = element.querySelector('.e-active');
                    expect(activeElement).toBe(null);
                });
                it('Chip component - enablePersistance', function () {
                    chips = new index_1.ChipList({ text: 'chip content', enablePersistence: true }, '#chip');
                });
            });
            describe('chiplist(set) - property', function () {
                afterEach(function () {
                    chips.destroy();
                    element.innerText = '';
                });
                it('Chip component - text', function () {
                    chips = new index_1.ChipList({ text: 'chip content', chips: deepCloning(jsonArray) }, '#chip');
                    var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    expect(chipCollection.length).toBe(3);
                    expect(chipCollection[0].innerText).toBe('chip1');
                    expect(chipCollection[1].innerText).toBe('chip2');
                    expect(chipCollection[2].innerText).toBe('chip3');
                    chips.chips = [{ text: 'newchip' }];
                    chips.dataBind();
                    chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    expect(chipCollection.length).toBe(1);
                    expect(chipCollection[0].innerText).toBe('newchip');
                });
                it('Chip component - avatarIconCss (common)', function () {
                    chips = new index_1.ChipList({ text: 'chip content', chips: stringArray.slice(), avatarIconCss: 'avataricon icon1' }, '#chip');
                    var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    var avatarIconelement = chipCollection[0].querySelector('.e-chip-avatar');
                    expect(avatarIconelement.classList.contains('avataricon')).toBe(true);
                    expect(avatarIconelement.classList.contains('icon1')).toBe(true);
                    chips.avatarIconCss = 'avataricon3 io';
                    chips.dataBind();
                    chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    avatarIconelement = chipCollection[0].querySelector('.e-chip-avatar');
                    expect(avatarIconelement.classList.contains('avataricon3')).toBe(true);
                    expect(avatarIconelement.classList.contains('avataricon')).toBe(false);
                    expect(avatarIconelement.classList.contains('icon1')).toBe(false);
                    expect(avatarIconelement.classList.contains('io')).toBe(true);
                });
                it('Chip component - avatarIconCss (Json)', function () {
                    var ds = [{ text: 'chip1' }, { text: 'chip2', avatarIconCss: 'avataricon2 icon2' }];
                    chips = new index_1.ChipList({ text: 'chip content', chips: ds, avatarIconCss: 'avataricon icon' }, '#chip');
                    var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    var avatarIconelement1 = chipCollection[0].querySelector('.e-chip-avatar');
                    var avatarIconelement2 = chipCollection[1].querySelector('.e-chip-avatar');
                    expect(avatarIconelement1.classList.contains('avataricon')).toBe(true);
                    expect(avatarIconelement1.classList.contains('icon')).toBe(true);
                    expect(avatarIconelement2.classList.contains('avataricon2')).toBe(true);
                    expect(avatarIconelement2.classList.contains('icon2')).toBe(true);
                });
                it('Chip component - avatarText (common)', function () {
                    chips = new index_1.ChipList({ text: 'chip content', chips: stringArray.slice(), avatarIconCss: 'avataricon icon1', avatarText: 'MR' }, '#chip');
                    var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    var avatarIconelement = chipCollection[0].querySelector('.e-chip-avatar');
                    expect(avatarIconelement.classList.contains('avataricon')).toBe(true);
                    expect(avatarIconelement.classList.contains('icon1')).toBe(true);
                    expect(avatarIconelement.innerText).toBe('MR');
                    chips.avatarIconCss = 'avataricon3 io';
                    chips.avatarText = 'AC';
                    chips.dataBind();
                    chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    avatarIconelement = chipCollection[0].querySelector('.e-chip-avatar');
                    expect(avatarIconelement.classList.contains('avataricon3')).toBe(true);
                    expect(avatarIconelement.classList.contains('io')).toBe(true);
                    expect(avatarIconelement.classList.contains('avataricon')).toBe(false);
                    expect(avatarIconelement.classList.contains('icon1')).toBe(false);
                    expect(avatarIconelement.innerText).toBe('AC');
                });
                it('Chip component - avatarText (Json)', function () {
                    var ds = [{ text: 'chip1' }, { text: 'chip2', avatarIconCss: 'avataricon2 icon2', avatarText: 'AR' }];
                    chips = new index_1.ChipList({ text: 'chip content', chips: ds, avatarIconCss: 'avataricon icon', avatarText: 'MR' }, '#chip');
                    var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    var avatarIconelement1 = chipCollection[0].querySelector('.e-chip-avatar');
                    var avatarIconelement2 = chipCollection[1].querySelector('.e-chip-avatar');
                    expect(avatarIconelement1.classList.contains('avataricon')).toBe(true);
                    expect(avatarIconelement1.classList.contains('icon')).toBe(true);
                    expect(avatarIconelement1.innerText).toBe('MR');
                    expect(avatarIconelement2.classList.contains('avataricon2')).toBe(true);
                    expect(avatarIconelement2.classList.contains('icon2')).toBe(true);
                    expect(avatarIconelement2.innerText).toBe('AR');
                });
                it('Chip component - leadingIconCss (common)', function () {
                    chips = new index_1.ChipList({ text: 'chip content', chips: stringArray.slice(), leadingIconCss: 'leadingicon icon1' }, '#chip');
                    var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    var leadingIconelement = chipCollection[0].querySelector('.e-chip-icon');
                    expect(leadingIconelement.classList.contains('leadingicon')).toBe(true);
                    expect(leadingIconelement.classList.contains('icon1')).toBe(true);
                    chips.leadingIconCss = 'leadingicon3 io';
                    chips.dataBind();
                    chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    leadingIconelement = chipCollection[0].querySelector('.e-chip-icon');
                    expect(leadingIconelement.classList.contains('leadingicon3')).toBe(true);
                    expect(leadingIconelement.classList.contains('io')).toBe(true);
                    expect(leadingIconelement.classList.contains('leadingicon')).toBe(false);
                    expect(leadingIconelement.classList.contains('icon1')).toBe(false);
                });
                it('Chip component - leadingIconCss (Json)', function () {
                    var ds = [{ text: 'chip1' }, { text: 'chip2', leadingIconCss: 'leadingicon2 icon2' }];
                    chips = new index_1.ChipList({ text: 'chip content', chips: ds, leadingIconCss: 'leadingicon icon' }, '#chip');
                    var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    var leadingIconelement1 = chipCollection[0].querySelector('.e-chip-icon');
                    var leadingIconelement2 = chipCollection[1].querySelector('.e-chip-icon');
                    expect(leadingIconelement1.classList.contains('leadingicon')).toBe(true);
                    expect(leadingIconelement1.classList.contains('icon')).toBe(true);
                    expect(leadingIconelement2.classList.contains('leadingicon2')).toBe(true);
                    expect(leadingIconelement2.classList.contains('icon2')).toBe(true);
                });
                it('Chip component - trailingIconCss (common)', function () {
                    chips = new index_1.ChipList({ text: 'chip content', chips: stringArray.slice(), trailingIconCss: 'trailingicon icon1' }, '#chip');
                    var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    var trailingIconelement = chipCollection[0].querySelector('.e-chip-delete');
                    expect(trailingIconelement.classList.contains('trailingicon')).toBe(true);
                    expect(trailingIconelement.classList.contains('icon1')).toBe(true);
                    chips.trailingIconCss = 'trailingicon3 io';
                    chips.dataBind();
                    chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    trailingIconelement = chipCollection[0].querySelector('.e-chip-delete');
                    expect(trailingIconelement.classList.contains('trailingicon3')).toBe(true);
                    expect(trailingIconelement.classList.contains('io')).toBe(true);
                    expect(trailingIconelement.classList.contains('trailingicon')).toBe(false);
                    expect(trailingIconelement.classList.contains('icon1')).toBe(false);
                });
                it('Chip component - trailingIconCss (Json)', function () {
                    var ds = [{ text: 'chip1' }, { text: 'chip2', trailingIconCss: 'trailingicon2 icon2' }];
                    chips = new index_1.ChipList({ text: 'chip content', chips: ds, trailingIconCss: 'trailingicon icon' }, '#chip');
                    var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    var trailingIconelement1 = chipCollection[0].querySelector('.e-chip-delete');
                    var trailingIconelement2 = chipCollection[1].querySelector('.e-chip-delete');
                    expect(trailingIconelement1.classList.contains('trailingicon')).toBe(true);
                    expect(trailingIconelement1.classList.contains('icon')).toBe(true);
                    expect(trailingIconelement2.classList.contains('trailingicon2')).toBe(true);
                    expect(trailingIconelement2.classList.contains('icon2')).toBe(true);
                });
                it('Chip component - cssClass (common)', function () {
                    chips = new index_1.ChipList({ text: 'chip content', chips: stringArray.slice(), cssClass: 'iconcss icon1' }, '#chip');
                    var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    expect(chipCollection[0].classList.contains('iconcss')).toBe(true);
                    expect(chipCollection[0].classList.contains('icon1')).toBe(true);
                    chips.cssClass = 'iconcss3 io';
                    chips.dataBind();
                    chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    expect(chipCollection[0].classList.contains('iconcss3')).toBe(true);
                    expect(chipCollection[0].classList.contains('io')).toBe(true);
                    expect(chipCollection[0].classList.contains('iconcss')).toBe(false);
                    expect(chipCollection[0].classList.contains('icon1')).toBe(false);
                });
                it('Chip component - cssClass (Json)', function () {
                    var ds = [{ text: 'chip1' }, { text: 'chip2', cssClass: 'iconcss2 icon2' }];
                    chips = new index_1.ChipList({ text: 'chip content', chips: ds, cssClass: 'iconcss icon' }, '#chip');
                    var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    expect(chipCollection[0].classList.contains('iconcss')).toBe(true);
                    expect(chipCollection[0].classList.contains('icon')).toBe(true);
                    expect(chipCollection[1].classList.contains('iconcss2')).toBe(true);
                    expect(chipCollection[1].classList.contains('icon2')).toBe(true);
                });
                it('Chip component - enabled (common)', function () {
                    chips = new index_1.ChipList({ text: 'chip content', chips: stringArray.slice(), enabled: false }, '#chip');
                    var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    expect(chipCollection[0].classList.contains('e-disabled')).toBe(true);
                    chips.enabled = true;
                    chips.dataBind();
                    chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    expect(chipCollection[0].classList.contains('e-disabled')).toBe(false);
                });
                it('Chip component - enabled (Json)', function () {
                    var ds = [{ text: 'chip1' }, { text: 'chip2', enabled: true }, { text: 'chip2', enabled: false }];
                    chips = new index_1.ChipList({ text: 'chip content', chips: ds, enabled: false }, '#chip');
                    var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    expect(chipCollection[0].classList.contains('e-disabled')).toBe(true);
                    expect(chipCollection[1].classList.contains('e-disabled')).toBe(false);
                    expect(chipCollection[2].classList.contains('e-disabled')).toBe(true);
                });
                it('Chip component - enableRTL', function () {
                    chips = new index_1.ChipList({ text: 'chip content', chips: stringArray.slice(), enableRtl: true }, '#chip');
                    expect(element.classList.contains('e-rtl')).toBe(true);
                    chips.enableRtl = false;
                    chips.dataBind();
                    expect(element.classList.contains('e-rtl')).toBe(false);
                });
                it('Chip component - enableDelete', function () {
                    chips = new index_1.ChipList({ text: 'chip content', chips: stringArray.slice(), enableDelete: true }, '#chip');
                    var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    expect(chipCollection.length).toBe(3);
                    var deleteElement = chipCollection[0].querySelector('.e-chip-delete');
                    expect(deleteElement.classList.contains('e-dlt-btn')).toBe(true);
                    fireEvent(deleteElement, 'click');
                    chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    expect(chipCollection.length).toBe(2);
                });
                it('Chip component - selection(Single)', function () {
                    chips = new index_1.ChipList({ text: 'chip content', chips: stringArray.slice(), selection: 'Single' }, '#chip');
                    var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    expect(element.getAttribute('aria-multiselectable')).toBe('false');
                    expect(chipCollection.length).toBe(3);
                    fireEvent(chipCollection[0], 'click');
                    var activeElement = Array.prototype.slice.call(element.querySelectorAll('.e-active'));
                    expect(activeElement.length).toBe(1);
                    expect(activeElement[0]).toBe(chipCollection[0]);
                    fireEvent(chipCollection[1], 'click');
                    activeElement = Array.prototype.slice.call(element.querySelectorAll('.e-active'));
                    expect(activeElement.length).toBe(1);
                    expect(activeElement[0]).toBe(chipCollection[1]);
                });
                it('Chip component - selection(Multiple)', function () {
                    chips = new index_1.ChipList({ text: 'chip content', chips: stringArray.slice(), selection: 'Multiple' }, '#chip');
                    var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    expect(element.getAttribute('aria-multiselectable')).toBe('true');
                    expect(chipCollection.length).toBe(3);
                    fireEvent(chipCollection[0], 'click');
                    var activeElement = Array.prototype.slice.call(element.querySelectorAll('.e-active'));
                    expect(activeElement.length).toBe(1);
                    expect(activeElement[0]).toBe(chipCollection[0]);
                    fireEvent(chipCollection[1], 'click');
                    activeElement = Array.prototype.slice.call(element.querySelectorAll('.e-active'));
                    expect(activeElement.length).toBe(2);
                    expect(activeElement[0]).toBe(chipCollection[0]);
                    expect(activeElement[1]).toBe(chipCollection[1]);
                });
                it('Chip component - selectedChips(Single)', function () {
                    chips = new index_1.ChipList({ text: 'chip content', chips: stringArray.slice(), selection: "Single", selectedChips: 0 }, '#chip');
                    var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    var activeElement = Array.prototype.slice.call(element.querySelectorAll('.e-active'));
                    expect(activeElement.length).toBe(1);
                    expect(activeElement[0]).toBe(chipCollection[0]);
                    chips.selectedChips = [1, 2];
                    chips.dataBind();
                    chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    activeElement = Array.prototype.slice.call(element.querySelectorAll('.e-active'));
                    expect(activeElement.length).toBe(1);
                    expect(activeElement[0]).toBe(chipCollection[2]);
                    var resultantdata = chips.getSelectedChips();
                    expect(resultantdata.index).toBe(2);
                });
                it('Chip component - selectedChips(Single) with aria-label', function () {
                    chips = new index_1.ChipList({ text: 'chip content', chips: stringArray.slice(), selection: "Single", selectedChips: 0 }, '#chip');
                    var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    var activeElement = Array.prototype.slice.call(element.querySelectorAll('.e-active'));
                    expect(activeElement.length).toBe(1);
                    var chipSelected = activeElement[0];
                    expect(activeElement[0]).toBe(chipCollection[0]);
                    expect(chipSelected.getAttribute("aria-selected")).toBe('true');
                    chips.selectedChips = [1, 2];
                    chips.dataBind();
                    chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    activeElement = Array.prototype.slice.call(element.querySelectorAll('.e-active'));
                    expect(activeElement.length).toBe(1);
                    expect(chipSelected.getAttribute("aria-selected")).toBe('false');
                    expect(activeElement[0].getAttribute("aria-selected")).toBe('true');
                    expect(activeElement[0]).toBe(chipCollection[2]);
                    var resultantdata = chips.getSelectedChips();
                    expect(resultantdata.index).toBe(2);
                });
                it('Chip component - selectedChips(Multiple)', function () {
                    chips = new index_1.ChipList({ text: 'chip content', chips: stringArray.slice(), selection: "Multiple", selectedChips: 0 }, '#chip');
                    var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    var activeElement = Array.prototype.slice.call(element.querySelectorAll('.e-active'));
                    expect(activeElement.length).toBe(1);
                    expect(activeElement[0]).toBe(chipCollection[0]);
                    chips.selectedChips = [0, 1, 2];
                    chips.dataBind();
                    chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    activeElement = Array.prototype.slice.call(element.querySelectorAll('.e-active'));
                    expect(activeElement.length).toBe(3);
                    expect(activeElement[0]).toBe(chipCollection[0]);
                    expect(activeElement[1]).toBe(chipCollection[1]);
                    expect(activeElement[2]).toBe(chipCollection[2]);
                    chips.selectedChips = [0, 1];
                    chips.dataBind();
                    chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    activeElement = Array.prototype.slice.call(element.querySelectorAll('.e-active'));
                    expect(activeElement.length).toBe(2);
                    expect(activeElement[0]).toBe(chipCollection[0]);
                    expect(activeElement[1]).toBe(chipCollection[1]);
                    var resultantdata = chips.getSelectedChips();
                    var indexes = resultantdata.Indexes;
                    var selectedChips = chips.selectedChips;
                    expect(indexes[0]).toBe(selectedChips[0]);
                    expect(indexes[1]).toBe(selectedChips[1]);
                    chips.select(0);
                    expect(chips.selectedChips[0]).toBe(1);
                });
            });
        });
        describe('chips APIs', function () {
            describe('chip(single) - APIs', function () {
                afterEach(function () {
                    chips.destroy();
                    element.innerText = '';
                });
                it('Add method - should not work', function () {
                    chips = new index_1.ChipList({ text: 'chip content' }, '#chip');
                    chips.add(2);
                    var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    expect(chipCollection.length).toBe(0);
                    expect(chips.chips.length).toBe(0);
                });
                it('Remove method - should not work', function () {
                    chips = new index_1.ChipList({ text: 'chip content' }, '#chip');
                    chips.remove(2);
                    var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    expect(chipCollection.length).toBe(0);
                    expect(chips.chips.length).toBe(0);
                });
                it('Find method - should not work', function () {
                    chips = new index_1.ChipList({ text: 'chip content' }, '#chip');
                    var resultantdata = chips.find(0);
                    expect(resultantdata).toBe(undefined);
                });
                it('select & getSelectedChips method - should not work', function () {
                    chips = new index_1.ChipList({ text: 'chip content' }, '#chip');
                    chips.select(0);
                    var resultantdata = chips.getSelectedChips();
                    expect(resultantdata).toBe(undefined);
                });
            });
            describe('chiplist(set)  - APIs', function () {
                afterEach(function () {
                    chips.destroy();
                });
                it('Add method - string[] data', function () {
                    chips = new index_1.ChipList({ chips: stringArray.slice(), cssClass: 'newchip', avatarIconCss: 'avatar', trailingIconCss: 'icon' }, '#chip');
                    var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    expect(chipCollection.length).toBe(3);
                    expect(chips.chips.length).toBe(3);
                    chips.add('chip4');
                    chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    expect(chipCollection.length).toBe(4);
                    expect(chips.chips.length).toBe(4);
                    expect(chips.chips[3]).toBe('chip4');
                    expect(chipCollection[3].innerText).toBe('chip4');
                    expect(chipCollection[3].classList.contains('newchip')).toBe(true);
                    chips.add(['chip5', 'chip6']);
                    chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    expect(chipCollection.length).toBe(6);
                    expect(chips.chips.length).toBe(6);
                    expect(chips.chips[4]).toBe('chip5');
                    expect(chipCollection[4].innerText).toBe('chip5');
                    expect(chipCollection[4].children[0].classList.contains('avatar')).toBe(true);
                    expect(chips.chips[5]).toBe('chip6');
                    expect(chipCollection[5].innerText).toBe('chip6');
                    expect(chipCollection[5].children[2].classList.contains('icon')).toBe(true);
                });
                it('Add method - numbber[] data', function () {
                    chips = new index_1.ChipList({ chips: numberArray.slice(), cssClass: 'newchip', avatarIconCss: 'avatar', trailingIconCss: 'icon' }, '#chip');
                    var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    expect(chipCollection.length).toBe(3);
                    expect(chips.chips.length).toBe(3);
                    chips.add(4);
                    chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    expect(chipCollection.length).toBe(4);
                    expect(chips.chips.length).toBe(4);
                    expect(chips.chips[3]).toBe(4);
                    expect(chipCollection[3].innerText).toBe('4');
                    expect(chipCollection[3].classList.contains('newchip')).toBe(true);
                    chips.add([5, 6]);
                    chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    expect(chipCollection.length).toBe(6);
                    expect(chips.chips.length).toBe(6);
                    expect(chips.chips[4]).toBe(5);
                    expect(chipCollection[4].innerText).toBe('5');
                    expect(chipCollection[4].children[0].classList.contains('avatar')).toBe(true);
                    expect(chips.chips[5]).toBe(6);
                    expect(chipCollection[5].innerText).toBe('6');
                    expect(chipCollection[5].children[2].classList.contains('icon')).toBe(true);
                });
                it('Add method - json data', function () {
                    chips = new index_1.ChipList({ chips: deepCloning(jsonArray) }, '#chip');
                    var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    expect(chipCollection.length).toBe(3);
                    expect(chips.chips.length).toBe(3);
                    chips.add({ text: 'chip4', cssClass: 'newchip' });
                    chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    expect(chipCollection.length).toBe(4);
                    expect(chips.chips.length).toBe(4);
                    expect(chips.chips[3].text).toBe('chip4');
                    expect(chipCollection[3].innerText).toBe('chip4');
                    expect(chipCollection[3].classList.contains('newchip')).toBe(true);
                    chips.add([{ text: 'chip5', avatarIconCss: 'avatar' }, { text: 'chip6', trailingIconCss: 'icon' }]);
                    chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    expect(chipCollection.length).toBe(6);
                    expect(chips.chips.length).toBe(6);
                    expect(chips.chips[4].text).toBe('chip5');
                    expect(chipCollection[4].innerText).toBe('chip5');
                    expect(chipCollection[4].children[0].classList.contains('avatar')).toBe(true);
                    expect(chips.chips[5].text).toBe('chip6');
                    expect(chipCollection[5].innerText).toBe('chip6');
                    expect(chipCollection[5].children[1].classList.contains('icon')).toBe(true);
                });
                it('Remove method using index', function () {
                    var ds = stringArray.slice();
                    ds.push('chip4');
                    ds.push('chip5');
                    chips = new index_1.ChipList({ chips: ds }, '#chip');
                    var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    expect(chipCollection.length).toBe(5);
                    expect(chips.chips.length).toBe(5);
                    expect(chips.chips[2]).toBe('chip3');
                    chips.remove(2);
                    chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    expect(chipCollection.length).toBe(4);
                    expect(chips.chips.length).toBe(4);
                    expect(chips.chips[2]).toBe('chip4');
                    expect(chips.chips[3]).toBe('chip5');
                    chips.remove([1, 3]);
                    chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    expect(chipCollection.length).toBe(2);
                    expect(chips.chips.length).toBe(2);
                    expect(chips.chips[1]).toBe('chip4');
                    chips.remove(6);
                    expect(chipCollection.length).toBe(2);
                });
                it('Remove method using htmlElement', function () {
                    var ds = deepCloning(jsonArray);
                    ds.push({ text: 'chip4' });
                    ds.push({ text: 'chip5' });
                    chips = new index_1.ChipList({ chips: ds }, '#chip');
                    var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    expect(chipCollection.length).toBe(5);
                    expect(chips.chips.length).toBe(5);
                    expect(chips.chips[2].text).toBe('chip3');
                    chips.remove(chipCollection[2]);
                    chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    expect(chipCollection.length).toBe(4);
                    expect(chips.chips.length).toBe(4);
                    expect(chips.chips[2].text).toBe('chip4');
                    expect(chips.chips[3].text).toBe('chip5');
                    chips.remove([chipCollection[1], chipCollection[3]]);
                    chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    expect(chipCollection.length).toBe(2);
                    expect(chips.chips.length).toBe(2);
                    expect(chips.chips[1].text).toBe('chip4');
                });
                it('Find method using index', function () {
                    chips = new index_1.ChipList({ chips: deepCloning(jsonArray) }, '#chip');
                    var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    var resultantData = chips.find(1);
                    expect(resultantData.data.text).toBe('chip2');
                    expect(resultantData.element).toBe(chipCollection[1]);
                    expect(resultantData.index).toBe(1);
                    expect(resultantData.text).toBe('chip2');
                    resultantData = chips.find(8);
                    expect(resultantData).toBe(undefined);
                });
                it('Find method using htmlElement', function () {
                    chips = new index_1.ChipList({ chips: stringArray.slice() }, '#chip');
                    var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    var resultantData = chips.find(chipCollection[1]);
                    expect(resultantData.data).toBe('chip2');
                    expect(resultantData.element).toBe(chipCollection[1]);
                    expect(resultantData.index).toBe(1);
                    expect(resultantData.text).toBe('chip2');
                });
                it('Find method without text', function () {
                    chips = new index_1.ChipList({ chips: [{ leadingIconCss: 'icon1' }, { leadingIconCss: 'icon2' }] }, '#chip');
                    var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    var resultantData = chips.find(0);
                    expect(resultantData.data.text).toBe(undefined);
                    expect(resultantData.data.leadingIconCss).toBe('icon1');
                    expect(resultantData.element).toBe(chipCollection[0]);
                    expect(resultantData.index).toBe(0);
                    expect(resultantData.text).toBe('');
                    resultantData = chips.find(8);
                    expect(resultantData).toBe(undefined);
                });
                it('select & getSelectedChips method using index [Single selection]', function () {
                    chips = new index_1.ChipList({ chips: deepCloning(jsonArray), selection: 'Single' }, '#chip');
                    var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    chips.select(1);
                    var resultantData = chips.getSelectedChips();
                    expect(resultantData.data.text).toBe('chip2');
                    expect(resultantData.element).toBe(chipCollection[1]);
                    expect(resultantData.index).toBe(1);
                    expect(resultantData.text).toBe('chip2');
                    chips.select(1);
                    resultantData = chips.getSelectedChips();
                    expect(resultantData).toBe(undefined);
                    chips.select([1, 2]);
                    resultantData = chips.getSelectedChips();
                    expect(resultantData.data.text).toBe('chip3');
                    expect(resultantData.element).toBe(chipCollection[2]);
                    expect(resultantData.index).toBe(2);
                    expect(resultantData.text).toBe('chip3');
                    chips.select(7);
                    resultantData = chips.getSelectedChips();
                    expect(resultantData.data.text).toBe('chip3');
                });
                it('select & getSelectedChips method using htmlElement [Single selection]', function () {
                    chips = new index_1.ChipList({ chips: stringArray.slice(), selection: 'Single' }, '#chip');
                    var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    chips.select(chipCollection[1]);
                    var resultantData = chips.getSelectedChips();
                    expect(resultantData.data).toBe('chip2');
                    expect(resultantData.element).toBe(chipCollection[1]);
                    expect(resultantData.index).toBe(1);
                    expect(resultantData.text).toBe('chip2');
                    chips.select(chipCollection[1]);
                    resultantData = chips.getSelectedChips();
                    expect(resultantData).toBe(undefined);
                    chips.select([chipCollection[1], chipCollection[2]]);
                    resultantData = chips.getSelectedChips();
                    expect(resultantData.data).toBe('chip3');
                    expect(resultantData.element).toBe(chipCollection[2]);
                    expect(resultantData.index).toBe(2);
                    expect(resultantData.text).toBe('chip3');
                });
                it('select & getSelectedChips method using index [Multiple selection]', function () {
                    chips = new index_1.ChipList({ chips: stringArray.slice(), selection: 'Multiple' }, '#chip');
                    var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    chips.select(1);
                    var resultantData = chips.getSelectedChips();
                    expect(resultantData.Indexes.length).toBe(1);
                    expect(resultantData.data[0]).toBe('chip2');
                    expect(resultantData.elements[0]).toBe(chipCollection[1]);
                    expect(resultantData.Indexes[0]).toBe(1);
                    expect(resultantData.texts[0]).toBe('chip2');
                    chips.select(1);
                    resultantData = chips.getSelectedChips();
                    expect(resultantData).toBe(undefined);
                    chips.select([1, 2]);
                    resultantData = chips.getSelectedChips();
                    expect(resultantData.Indexes.length).toBe(2);
                    expect(resultantData.data[0]).toBe('chip2');
                    expect(resultantData.elements[0]).toBe(chipCollection[1]);
                    expect(resultantData.Indexes[0]).toBe(1);
                    expect(resultantData.texts[0]).toBe('chip2');
                    expect(resultantData.data[1]).toBe('chip3');
                    expect(resultantData.elements[1]).toBe(chipCollection[2]);
                    expect(resultantData.Indexes[1]).toBe(2);
                    expect(resultantData.texts[1]).toBe('chip3');
                });
                it('select & getSelectedChips method using htmlElement [Multiple selection]', function () {
                    chips = new index_1.ChipList({ chips: deepCloning(jsonArray), selection: 'Multiple' }, '#chip');
                    var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    chips.select(chipCollection[1], "index");
                    var resultantData = chips.getSelectedChips();
                    expect(resultantData.Indexes.length).toBe(1);
                    expect(resultantData.data[0].text).toBe('chip2');
                    expect(resultantData.elements[0]).toBe(chipCollection[1]);
                    expect(resultantData.Indexes[0]).toBe(1);
                    expect(resultantData.texts[0]).toBe('chip2');
                    chips.select(chipCollection[1], "index");
                    resultantData = chips.getSelectedChips();
                    expect(resultantData).toBe(undefined);
                    chips.select([chipCollection[1], chipCollection[2]], "index");
                    resultantData = chips.getSelectedChips();
                    expect(resultantData.Indexes.length).toBe(2);
                    expect(resultantData.data[0].text).toBe('chip2');
                    expect(resultantData.elements[0]).toBe(chipCollection[1]);
                    expect(resultantData.Indexes[0]).toBe(1);
                    expect(resultantData.texts[0]).toBe('chip2');
                    expect(resultantData.data[1].text).toBe('chip3');
                    expect(resultantData.elements[1]).toBe(chipCollection[2]);
                    expect(resultantData.Indexes[1]).toBe(2);
                    expect(resultantData.texts[1]).toBe('chip3');
                    chips.select(['chip1'], "text");
                    resultantData = chips.getSelectedChips();
                    expect(resultantData.texts[0]).toBe('chip1');
                });
                it('Multiple selection without value property', function () {
                    chips = new index_1.ChipList({ chips: deepCloning(jsonArray), selection: 'Multiple' }, '#chip');
                    var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    chips.select(chipCollection[1]);
                    var resultantData = chips.getSelectedChips();
                    expect((resultantData.Indexes[0])).toBe(1);
                });
                it('Multiple selection using value property', function () {
                    chips = new index_1.ChipList({ chips: deepCloning(jsonArrayValue), selection: 'Multiple' }, '#chip');
                    var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                    chips.select(chipCollection[1], "index");
                    var selectedValule1 = "" + chips.selectedChips;
                    expect(selectedValule1).toBe('22');
                    chips.select([11], "value");
                    selectedValule1 = "" + chips.selectedChips;
                    expect(selectedValule1).toBe('11,22');
                });
            });
        });
        describe('chip - Events', function () {
            describe('chip component - Mouse', function () {
                describe('Click Event', function () {
                    afterEach(function () {
                        chips.destroy();
                        element.innerText = "";
                    });
                    it('click event (Chip)- selection(none)', function () {
                        chips = new index_1.ChipList({ text: 'chip content', click: onClick }, '#chip');
                        fireEvent(element, 'click');
                        function onClick(e) {
                            expect(e.data).toBe('chip content');
                            expect(e.element).toBe(element);
                            expect(e.text).toBe('chip content');
                        }
                    });
                    it('click event (Chip)- selection(none)', function () {
                        element.innerText = "chiptext";
                        chips = new index_1.ChipList({ text: 'chip content', click: onClick }, '#chip');
                        fireEvent(element, 'click');
                        function onClick(e) {
                            expect(e.data).toBe('chip content');
                            expect(e.element).toBe(element);
                            expect(e.text).toBe('chiptext');
                        }
                    });
                    it('click event (Chipset)- selection(none)', function () {
                        chips = new index_1.ChipList({ text: 'chip content', chips: deepCloning(jsonArray), click: onClick }, '#chip');
                        var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                        fireEvent(chipCollection[1], 'click');
                        function onClick(e) {
                            expect(e.data.text).toBe('chip2');
                            expect(e.element).toBe(chipCollection[1]);
                            expect(e.text).toBe('chip2');
                        }
                    });
                    it('click event (Chipset)- selection(Single)', function () {
                        chips = new index_1.ChipList({ text: 'chip content', chips: stringArray.slice(), selection: "Single", click: onClick }, '#chip');
                        var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                        fireEvent(chipCollection[1], 'click');
                        function onClick(e) {
                            expect(e.data).toBe('chip2');
                            expect(e.element).toBe(chipCollection[1]);
                            expect(e.text).toBe('chip2');
                            expect(e.index).toBe(1);
                            expect(e.selected).toBe(true);
                        }
                    });
                    it('click event (Chipset)- selection(Multiple)', function () {
                        chips = new index_1.ChipList({ text: 'chip content', chips: deepCloning(jsonArray), selection: "Multiple", click: onClick }, '#chip');
                        var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                        fireEvent(chipCollection[1], 'click');
                        function onClick(e) {
                            expect(e.data.text).toBe('chip2');
                            expect(e.element).toBe(chipCollection[1]);
                            expect(e.text).toBe('chip2');
                            expect(e.index).toBe(1);
                            expect(e.selected).toBe(true);
                        }
                    });
                    it('clicking wrong wrapper', function () {
                        chips = new index_1.ChipList({ text: 'chip content', chips: deepCloning(jsonArray), selection: "Multiple" }, '#chip');
                        var clickfunction = jasmine.createSpy('clickfunction');
                        chips.click = clickfunction;
                        fireEvent(element, 'click');
                        expect(clickfunction).not.toHaveBeenCalled();
                    });
                });
                describe('Delete Event', function () {
                    afterEach(function () {
                        chips.destroy();
                    });
                    it('delete event (Chipset)', function () {
                        chips = new index_1.ChipList({ text: 'chip content', chips: deepCloning(jsonArray), selection: "Single", enableDelete: true, delete: onDelete }, '#chip');
                        var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                        expect(chipCollection.length).toBe(3);
                        fireEvent(chipCollection[1].querySelector('.e-chip-delete'), 'click');
                        function onDelete(e) {
                            expect(e.data.text).toBe('chip2');
                            expect(e.element).toBe(chipCollection[1]);
                            expect(e.text).toBe('chip2');
                            expect(e.index).toBe(1);
                            expect(e.cancel).toBe(false);
                        }
                        chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                        expect(chipCollection.length).toBe(2);
                    });
                    it('delete event - cancel (Chipset)', function () {
                        chips = new index_1.ChipList({ text: 'chip content', chips: deepCloning(jsonArray), selection: "Single", enableDelete: true, delete: onDelete }, '#chip');
                        var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                        expect(chipCollection.length).toBe(3);
                        fireEvent(chipCollection[1].querySelector('.e-chip-delete'), 'click');
                        function onDelete(e) {
                            expect(e.data.text).toBe('chip2');
                            expect(e.element).toBe(chipCollection[1]);
                            expect(e.text).toBe('chip2');
                            expect(e.index).toBe(1);
                            expect(e.cancel).toBe(false);
                            e.cancel = true;
                        }
                        chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                        expect(chipCollection.length).toBe(3);
                    });
                });
                describe('Deleted Event', function () {
                    afterEach(function () {
                        chips.destroy();
                    });
                    it('deleted event (Chipset)', function () {
                        chips = new index_1.ChipList({ text: 'chip content', chips: deepCloning(jsonArray), selection: "Single", enableDelete: true, deleted: onDeleted }, '#chip');
                        var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                        expect(chipCollection.length).toBe(3);
                        fireEvent(chipCollection[0].querySelector('.e-chip-delete'), 'click');
                        function onDeleted(e) {
                            expect(e.data.text).toBe('chip1');
                            expect(e.text).toBe('chip1');
                            expect(e.index).toBe(0);
                        }
                        chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                        expect(chipCollection.length).toBe(2);
                    });
                });
            });
            describe('chip - keyboardEvents', function () {
                describe('Click Event', function () {
                    afterEach(function () {
                        chips.destroy();
                        element.innerText = "";
                    });
                    it('click event (Chip)- selection(none)', function () {
                        chips = new index_1.ChipList({ text: 'chip content', click: onClick }, '#chip');
                        chips.keyHandler({ target: element, keyCode: 13, type: 'keydown' });
                        function onClick(e) {
                            expect(e.data).toBe('chip content');
                            expect(e.element).toBe(element);
                            expect(e.text).toBe('chip content');
                        }
                    });
                    it('click event (Chip)- selection(none)', function () {
                        element.innerText = "chiptext";
                        chips = new index_1.ChipList({ text: 'chip content', click: onClick }, '#chip');
                        chips.keyHandler({ target: element, keyCode: 13, type: 'keydown' });
                        function onClick(e) {
                            expect(e.data).toBe('chip content');
                            expect(e.element).toBe(element);
                            expect(e.text).toBe('chiptext');
                        }
                    });
                    it('click event (Chipset)- selection(none)', function () {
                        chips = new index_1.ChipList({ text: 'chip content', chips: deepCloning(jsonArray), click: onClick }, '#chip');
                        var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                        chips.keyHandler({ target: chipCollection[1], keyCode: 13, type: 'keydown' });
                        function onClick(e) {
                            expect(e.data.text).toBe('chip2');
                            expect(e.element).toBe(chipCollection[1]);
                            expect(e.text).toBe('chip2');
                        }
                    });
                    it('click event (Chipset)- selection(Single)', function () {
                        chips = new index_1.ChipList({ text: 'chip content', chips: stringArray.slice(), selection: "Single", click: onClick }, '#chip');
                        var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                        chips.keyHandler({ target: chipCollection[1], keyCode: 13, type: 'keydown' });
                        function onClick(e) {
                            expect(e.data).toBe('chip2');
                            expect(e.element).toBe(chipCollection[1]);
                            expect(e.text).toBe('chip2');
                            expect(e.index).toBe(1);
                            expect(e.selected).toBe(true);
                        }
                    });
                    it('click event (Chipset)- selection(Multiple)', function () {
                        chips = new index_1.ChipList({ text: 'chip content', chips: deepCloning(jsonArray), selection: "Multiple", click: onClick }, '#chip');
                        var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                        chips.keyHandler({ target: chipCollection[1], keyCode: 13, type: 'keydown' });
                        function onClick(e) {
                            expect(e.data.text).toBe('chip2');
                            expect(e.element).toBe(chipCollection[1]);
                            expect(e.text).toBe('chip2');
                            expect(e.index).toBe(1);
                            expect(e.selected).toBe(true);
                        }
                    });
                    it('click event (Chipset) with space key- selection(Multiple)', function () {
                        chips = new index_1.ChipList({ text: 'chip content', chips: deepCloning(jsonArray), selection: "Multiple", click: onClick }, '#chip');
                        var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                        chips.keyHandler({ target: chipCollection[1], keyCode: 32, type: 'keydown' });
                        function onClick(e) {
                            expect(e.data.text).toBe('chip2');
                            expect(e.element).toBe(chipCollection[1]);
                            expect(e.text).toBe('chip2');
                            expect(e.index).toBe(1);
                            expect(e.selected).toBe(true);
                        }
                    });
                    it('Pressing wrong key', function () {
                        chips = new index_1.ChipList({ text: 'chip content', chips: deepCloning(jsonArray), selection: "Multiple" }, '#chip');
                        var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                        var clickfunction = jasmine.createSpy('clickfunction');
                        chips.click = clickfunction;
                        chips.keyHandler({ target: chipCollection[1], keyCode: 34, type: 'keydown' });
                        expect(clickfunction).not.toHaveBeenCalled();
                    });
                    it('wrong target', function () {
                        chips = new index_1.ChipList({ text: 'chip content', chips: deepCloning(jsonArray), selection: "Multiple" }, '#chip');
                        var clickfunction = jasmine.createSpy('clickfunction');
                        chips.click = clickfunction;
                        chips.keyHandler({ target: element, keyCode: 13, type: 'keydown' });
                        expect(clickfunction).not.toHaveBeenCalled();
                    });
                });
                describe('Delete Event', function () {
                    afterEach(function () {
                        chips.destroy();
                    });
                    it('delete event (Chipset)', function () {
                        chips = new index_1.ChipList({ text: 'chip content', chips: deepCloning(jsonArray), selection: "Single", enableDelete: true, delete: onDelete }, '#chip');
                        var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                        expect(chipCollection.length).toBe(3);
                        chips.keyHandler({ target: chipCollection[1], keyCode: 46, type: 'keydown' });
                        function onDelete(e) {
                            expect(e.data.text).toBe('chip2');
                            expect(e.element).toBe(chipCollection[1]);
                            expect(e.text).toBe('chip2');
                            expect(e.index).toBe(1);
                            expect(e.cancel).toBe(false);
                        }
                        chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                        expect(chipCollection.length).toBe(2);
                        expect(chipCollection[1].classList.contains('e-focused')).toBe(true);
                    });
                    it('delete event - cancel (Chipset)', function () {
                        chips = new index_1.ChipList({ text: 'chip content', chips: deepCloning(jsonArray), selection: "Single", enableDelete: true, delete: onDelete }, '#chip');
                        var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                        expect(chipCollection.length).toBe(3);
                        chips.keyHandler({ target: chipCollection[1], keyCode: 46, type: 'keydown' });
                        function onDelete(e) {
                            expect(e.data.text).toBe('chip2');
                            expect(e.element).toBe(chipCollection[1]);
                            expect(e.text).toBe('chip2');
                            expect(e.index).toBe(1);
                            expect(e.cancel).toBe(false);
                            e.cancel = true;
                        }
                        chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                        expect(chipCollection.length).toBe(3);
                    });
                });
                describe('Focus handler', function () {
                    afterEach(function () {
                        chips.destroy();
                    });
                    it('chip(single) focus - kewyboard', function () {
                        chips = new index_1.ChipList({ text: 'chip content', leadingIconUrl: 'http://ej2.syncfusion.com/demos/src/chips/images/anne.png',
                            trailingIconUrl: 'http://ej2.syncfusion.com/demos/src/chips/images/anne.png' }, '#chip');
                        chips.keyHandler({ target: element, type: 'keyup', keyCode: 9 });
                        chips.keyHandler({ target: element, type: 'keyup', keyCode: 9 });
                        expect(element.classList.contains('e-focused')).toBe(true);
                        chips.focusOutHandler({ target: element });
                        expect(element.classList.contains('e-focused')).toBe(false);
                    });
                    it('chipset focus', function () {
                        chips = new index_1.ChipList({ text: 'chip content', chips: stringArray.slice() }, '#chip');
                        var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                        chips.keyHandler({ target: chipCollection[1], type: 'keyup', keyCode: 9 });
                        expect(chipCollection[1].classList.contains('e-focused')).toBe(true);
                        chips.focusOutHandler({ target: chipCollection[1] });
                        expect(chipCollection[2].classList.contains('e-focused')).toBe(false);
                    });
                    it('Wrong key focus code - chip', function () {
                        new index_1.Chip();
                        chips = new index_1.ChipList({ text: 'chip content' }, '#chip');
                        chips.keyHandler({ target: element, type: 'keyup', keyCode: 19 });
                        expect(element.classList.contains('e-focused')).toBe(false);
                    });
                    it('Wrong wrapper focus -  chip', function () {
                        new index_1.Chip();
                        chips = new index_1.ChipList({ text: 'chip content' }, '#chip');
                        chips.keyHandler({ target: element.firstElementChild, type: 'keyup', keyCode: 9 });
                        expect(element.classList.contains('e-focused')).toBe(false);
                        chips.focusOutHandler({ target: element.firstElementChild });
                        expect(element.classList.contains('e-focused')).toBe(false);
                    });
                    it('Wrong wrapper focus - chipset', function () {
                        new index_1.Chip();
                        chips = new index_1.ChipList({ text: 'chip content', chips: stringArray.slice() }, '#chip');
                        var chipCollection = Array.prototype.slice.call(element.querySelectorAll('.e-chip'));
                        chips.keyHandler({ target: element, type: 'keyup', keyCode: 9 });
                        expect(chipCollection[1].classList.contains('e-focused')).toBe(false);
                        chips.focusOutHandler({ target: chipCollection[1] });
                        expect(chipCollection[1].classList.contains('e-focused')).toBe(false);
                    });
                });
            });
        });
    });
});
