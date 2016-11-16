// Native Javascript for Bootstrap 4 | Dropdown
// by dnp_theme (v3) and noBlubb (v4)

import {removeClass, addClass} from './utils';

// DROPDOWN DEFINITION
// ===================
const Dropdown = class {
    constructor(element) {
        this.menu = typeof element === 'object' ? element : document.querySelector(element);
        this.menu.setAttribute('tabindex', '0');
        document.addEventListener('click', this.handle, false);
    }

    handle(e) {
        let target = e.target || e.currentTarget;
        let children = Object.from(this.menu.parentNode.getElementsByTagName('*')).slice(1);

        if (/\#$/g.test(target.href) || /\#$/g.test(target.parentNode.href)) {
            e.preventDefault();
        }

        if ([target, target.parentNode, target.parentNode.parentNode].includes(this.menu)) {
            this.toggle();
        } else if (!(children && children.indexOf(target) > -1)) {
            this.close();
        }
    }

    toggle() {
        if (/\bopen/.test(this.menu.parentNode.className)) {
            document.removeEventListener('keydown', this.key, false);
            this.close();
        } else {
            addClass(this.menu.parentNode, 'open');
            this.menu.setAttribute('aria-expanded', true);
            document.addEventListener('keydown', this.key, false);
        }
    }

    key(e) {
        if (e.which == 27) {
            this.close();
        }
    }

    close() {
        removeClass(this.menu.parentNode, 'open');
        this.menu.setAttribute('aria-expanded', false);
    };
};

// DROPDOWN DATA API
// =================
for (let element of document.querySelectorAll('[data-toggle=dropdown]')) {
    new Dropdown(element);
}