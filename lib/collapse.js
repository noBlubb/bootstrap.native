import {
    getAttribute,
    collapsing,
    showClass,
    addClass,
    removeClass,
    getMaxHeight,
    ariaExpanded,
    hiddenEvent,
    hideEvent,
    hasClass,
    showEvent,
    shownEvent,
    queryElement,
    getElementsByClassName,
    bootstrapCustomEvent,
    emulateTransitionEnd,
    targetsReg,
    dataTarget,
    on,
    stringCollapse,
    clickEvent

} from './utils'

const component = 'collapse';
const collapsed = 'collapsed';

class Collapse {
    constructor(element, options = []) {
        this.element = queryElement(element);
        this.options = options;
        this.isAnimating = false;
        this.collapse = this.getTarget(this.element);
        this.accordion = null; //queryElement(options.parent) || accordionData && getClosest(element, accordionData);


        if (!(stringCollapse in element)) { // prevent adding event handlers twice
            on(element, clickEvent, (event) => this.toggle(event));
        }

        element[stringCollapse] = this;
    }

    getTarget(element) {
        let href = element.href && element.getAttribute('href'),
            parent = element.getAttribute(dataTarget),
            id = href || ( parent && targetsReg.test(parent) ) && parent;
        return id && queryElement(id);
    };

    show() {
        this.openAction(this.collapse);
        removeClass(this.element, collapsed);

        if (this.accordion !== null) {
            let activeCollapses = getElementsByClassName(this.accordion, component + ' ' + showClass);
            activeCollapses.filter(collapse => collapse !== this.collapse).forEach(collapse => this.closeAction(collapse));
        }
    }

    hide() {
        this.closeAction(this.collapse);
        addClass(this.element, collapsed);
    }

    toggle(event) {
        event.preventDefault();
        if (this.isAnimating) return;
        if (!hasClass(this.collapse, showClass)) {
            this.show();
        }
        else {
            this.hide();
        }
    }

    openAction(collapseElement) {
        bootstrapCustomEvent.call(collapseElement, showEvent, component);
        addClass(collapseElement, collapsing);
        addClass(collapseElement, showClass);
        setTimeout(function () {
            collapseElement.style.height = getMaxHeight(collapseElement) + 'px';

            (function () {
                emulateTransitionEnd(collapseElement, function () {
                    //isAnimating = false;
                    collapseElement.setAttribute(ariaExpanded, 'true');
                    removeClass(collapseElement, collapsing);
                    collapseElement.style.height = '';
                    bootstrapCustomEvent.call(collapseElement, shownEvent, component);
                });
            }());
        }, 20);
    }

    closeAction(collapseElement) {
        bootstrapCustomEvent.call(collapseElement, hideEvent, component);
        collapseElement.style.height = getMaxHeight(collapseElement) + 'px';

        setTimeout(function () {
            addClass(collapseElement, collapsing);
            collapseElement.style.height = '0px';

            (function () {
                emulateTransitionEnd(collapseElement, function () {
                    //isAnimating = false;
                    collapseElement.setAttribute(ariaExpanded, 'false');
                    removeClass(collapseElement, collapsing);
                    removeClass(collapseElement, showClass);
                    collapseElement.style.height = '';
                    bootstrapCustomEvent.call(collapseElement, hiddenEvent, component);
                });
            }());
        }, 20);
    }
}

//export default Collapse;

// COLLAPSE DATA API
// =================
//initializeDataAPI(stringCollapse, Collapse, dataToggle);
for (let collapse of document.querySelectorAll('[data-toggle="collapse"]')) {
    console.log(new Collapse(collapse, {}));
}