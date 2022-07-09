define(["require", "exports", "@syncfusion/ej2-base", "@syncfusion/ej2-base"], function (require, exports, ej2_base_1, ej2_base_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function wrapperInitialize(createElement, tag, type, element, WRAPPER, role) {
        var input = element;
        if (element.tagName === tag) {
            var ejInstance = ej2_base_2.getValue('ej2_instances', element);
            input = createElement('input', { attrs: { 'type': type } });
            var props = ['change', 'cssClass', 'label', 'labelPosition', 'id'];
            for (var index = 0, len = element.attributes.length; index < len; index++) {
                if (props.indexOf(element.attributes[index].nodeName) === -1) {
                    input.setAttribute(element.attributes[index].nodeName, element.attributes[index].nodeValue);
                }
            }
            ej2_base_1.attributes(element, { 'class': WRAPPER, 'aria-checked': 'false' });
            element.appendChild(input);
            ej2_base_1.setValue('ej2_instances', ejInstance, input);
            ej2_base_2.deleteObject(element, 'ej2_instances');
        }
        return input;
    }
    exports.wrapperInitialize = wrapperInitialize;
    function getTextNode(element) {
        var node;
        var childnode = element.childNodes;
        for (var i = 0; i < childnode.length; i++) {
            node = childnode[i];
            if (node.nodeType === 3) {
                return node;
            }
        }
        return null;
    }
    exports.getTextNode = getTextNode;
    function destroy(ejInst, wrapper, tagName) {
        if (tagName === 'INPUT') {
            wrapper.parentNode.insertBefore(ejInst.element, wrapper);
            ej2_base_1.detach(wrapper);
            ejInst.element.checked = false;
            ['name', 'value', 'disabled'].forEach(function (key) {
                ejInst.element.removeAttribute(key);
            });
        }
        else {
            ['role', 'aria-checked', 'class'].forEach(function (key) {
                wrapper.removeAttribute(key);
            });
            wrapper.innerHTML = '';
        }
    }
    exports.destroy = destroy;
    function preRender(proxy, control, wrapper, element, moduleName) {
        element = wrapperInitialize(proxy.createElement, control, 'checkbox', element, wrapper, moduleName);
        proxy.element = element;
        if (proxy.element.getAttribute('type') !== 'checkbox') {
            proxy.element.setAttribute('type', 'checkbox');
        }
        if (!proxy.element.id) {
            proxy.element.id = ej2_base_1.getUniqueID('e-' + moduleName);
        }
    }
    exports.preRender = preRender;
    function createCheckBox(createElement, enableRipple, options) {
        if (enableRipple === void 0) { enableRipple = false; }
        if (options === void 0) { options = {}; }
        var wrapper = createElement('div', { className: 'e-checkbox-wrapper e-css' });
        if (options.cssClass) {
            ej2_base_2.addClass([wrapper], options.cssClass.split(' '));
        }
        if (options.enableRtl) {
            wrapper.classList.add('e-rtl');
        }
        if (enableRipple) {
            var rippleSpan = createElement('span', { className: 'e-ripple-container' });
            ej2_base_1.rippleEffect(rippleSpan, { isCenterRipple: true, duration: 400 });
            wrapper.appendChild(rippleSpan);
        }
        var frameSpan = createElement('span', { className: 'e-frame e-icons' });
        if (options.checked) {
            frameSpan.classList.add('e-check');
        }
        wrapper.appendChild(frameSpan);
        if (options.label) {
            var labelSpan = createElement('span', { className: 'e-label' });
            if (options.disableHtmlEncode) {
                labelSpan.textContent = options.label;
            }
            else {
                labelSpan.innerHTML = options.label;
            }
            wrapper.appendChild(labelSpan);
        }
        return wrapper;
    }
    exports.createCheckBox = createCheckBox;
    function rippleMouseHandler(e, rippleSpan) {
        if (rippleSpan) {
            var event_1 = document.createEvent('MouseEvents');
            event_1.initEvent(e.type, false, true);
            rippleSpan.dispatchEvent(event_1);
        }
    }
    exports.rippleMouseHandler = rippleMouseHandler;
    function setHiddenInput(proxy, wrap) {
        if (proxy.element.getAttribute('ejs-for')) {
            wrap.appendChild(proxy.createElement('input', {
                attrs: { 'name': proxy.name || proxy.element.name, 'value': 'false', 'type': 'hidden' }
            }));
        }
    }
    exports.setHiddenInput = setHiddenInput;
});
