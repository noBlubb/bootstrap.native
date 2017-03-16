import {
    removeClass,
    addClass,
    bootstrapCustomEvent,
    hideEvent,
    hiddenEvent,
    showClass,
    hasClass,
    on,
    off,
    queryElement,
    stringDropdown,
    keydownEvent,
    showEvent,
    shownEvent,
    ariaExpanded,
    clickEvent
} from './utils';

const isLink = /\#$/g;

const component = 'dropdown';

// DROPDOWN DEFINITION
// ===================
class Dropdown {
    constructor(element) {
        this.menu = queryElement(element);

        if (!(stringDropdown in this.menu)) { // prevent adding event handlers twice
            this.menu.setAttribute('tabindex', '0'); // Fix onblur on Chrome | Safari
            on(document, clickEvent, (event) => this.clickHandler(event));
        }
        element[stringDropdown] = this;
    }

    toggle() {
        if (hasClass(this.menu.parentNode, showClass)) {
            this.close();
        } else {
            this.show();
        }
    }

    keyHandler(event) {
        if (event.which == 27 || event.keyCode == 27) {
            this.close();
        }
    }

    clickHandler(event) {
        let target = event.target || event.currentTarget;
        let children = Array.from(this.menu.parentNode.getElementsByTagName('*')).slice(1);

        if ([target, target.parentNode, target.parentNode.parentNode].includes(this.menu)) {
            if (isLink.test(target.href) || isLink.test(target.parentNode.href)) {
                event.preventDefault();
            }
            this.toggle();
        } else if (!children.includes(target)) {
            if (isLink.test(target.href) || isLink.test(target.parentNode.href)) {
                event.preventDefault();
            }
            this.hide();
        }
    }

    show() {
        let parent = this.menu.parentNode;
        bootstrapCustomEvent.call(parent, showEvent, component, this.menu);

        addClass(parent, showClass);
        this.menu.setAttribute(ariaExpanded, true);

        bootstrapCustomEvent.call(parent, shownEvent, component, this.menu);
        on(document, keydownEvent, (event) => this.keyHandler(event));
    }

    hide() {
        let parent = this.menu.parentNode;
        bootstrapCustomEvent.call(parent, hideEvent, component, this.menu);

        removeClass(this.menu.parentNode, showClass);
        this.menu.setAttribute(ariaExpanded, false);

        bootstrapCustomEvent.call(parent, hiddenEvent, component, this.menu);
        off(document, keydownEvent, (event) => this.keyHandler(event));
    }
}

// DROPDOWN DATA API
// =================
for (let element of document.querySelectorAll('[data-toggle="dropdown"]')) {
    new Dropdown(element);
}