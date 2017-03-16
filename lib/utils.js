/* Native Javascript for Bootstrap 4 | Internal Utility Functions
 ----------------------------------------------------------------*/

// globals
const doc = document.documentElement;
const body = document.body;

// function toggle attributes
const dataToggle = 'data-toggle',
    dataDismiss = 'data-dismiss',
    dataSpy = 'data-spy',
    dataRide = 'data-ride',

    // components
    stringAlert = 'Alert',
    stringButton = 'Button',
    stringCarousel = 'Carousel',
    stringCollapse = 'Collapse',
    stringDropdown = 'Dropdown',
    stringModal = 'Modal',
    stringPopover = 'Popover',
    stringScrollSpy = 'ScrollSpy',
    stringTab = 'Tab',
    stringTooltip = 'Tooltip',

    // options DATA API
    databackdrop = 'data-backdrop',
    dataKeyboard = 'data-keyboard',
    dataTarget = 'data-target',
    dataInterval = 'data-interval',
    dataHeight = 'data-height',
    dataPause = 'data-pause',
    dataOriginalTitle = 'data-original-title',
    dataOriginalText = 'data-original-text',
    dataDismissible = 'data-dismissible',
    dataTrigger = 'data-trigger',
    dataAnimation = 'data-animation',
    dataContainer = 'data-container',
    dataPlacement = 'data-placement',
    dataDelay = 'data-delay',
    dataOffsetTop = 'data-offset-top',
    dataOffsetBottom = 'data-offset-bottom',

    // option keys
    backdrop = 'backdrop', keyboard = 'keyboard', delay = 'delay',
    content = 'content', target = 'target',
    interval = 'interval', pause = 'pause', animation = 'animation',
    placement = 'placement', container = 'container',

    // box model
    offsetTop = 'offsetTop', offsetBottom = 'offsetBottom',
    offsetLeft = 'offsetLeft',
    scrollTop = 'scrollTop', scrollLeft = 'scrollLeft',
    clientWidth = 'clientWidth', clientHeight = 'clientHeight',
    offsetWidth = 'offsetWidth', offsetHeight = 'offsetHeight',
    innerWidth = 'innerWidth', innerHeight = 'innerHeight',
    scrollHeight = 'scrollHeight', height = 'height',

    // aria
    ariaExpanded = 'aria-expanded',
    ariaHidden = 'aria-hidden',

    // event names
    clickEvent = 'click',
    hoverEvent = 'hover',
    keydownEvent = 'keydown',
    resizeEvent = 'resize',
    scrollEvent = 'scroll',
    // originalEvents
    showEvent = 'show',
    shownEvent = 'shown',
    hideEvent = 'hide',
    hiddenEvent = 'hidden',
    closeEvent = 'close',
    closedEvent = 'closed',
    slidEvent = 'slid',
    slideEvent = 'slide',
    changeEvent = 'change',

    // other
    getAttribute = 'getAttribute',
    setAttribute = 'setAttribute',
    hasAttribute = 'hasAttribute',
    getElementsByTagName = 'getElementsByTagName',
    getBoundingClientRect = 'getBoundingClientRect',
    getElementsByCLASSNAME = 'getElementsByClassName',

    indexOf = 'indexOf',
    parentNode = 'parentNode',
    length = 'length',
    toLowerCase = 'toLowerCase',
    Transition = 'Transition',
    Webkit = 'Webkit',
    style = 'style',

    active = 'active',
    showClass = 'show',
    collapsing = 'collapsing',
    disabled = 'disabled',
    loading = 'loading',
    left = 'left',
    right = 'right',
    top = 'top',
    bottom = 'bottom',

    // tooltip / popover
    fixedTop = '.fixed-top',
    fixedBottom = '.fixed-bottom',
    mouseHover = ('onmouseleave' in document) ? ['mouseenter', 'mouseleave'] : ['mouseover', 'mouseout'],
    tipPositions = /\b(top|bottom|left|top)+/,

    // transitionEnd since 2.0.4
    supportTransitions = Webkit + Transition in doc[style] || Transition[toLowerCase]() in doc[style],
    transitionEndEvent = Webkit + Transition in doc[style] ? Webkit[toLowerCase]() + Transition + 'End' : Transition[toLowerCase]() + 'end';

export {
    mouseHover, getElementsByClassName, showClass, ariaExpanded,
    hiddenEvent, getMaxHeight, showEvent, shownEvent, hideEvent, dataTarget
};

// set new focus element since 2.0.3
export function setFocus(element) {
    //element.focus ? element.focus() : element.setActive();
    element.focus();
}

// class manipulation, since 2.0.0 requires polyfill.js
export function addClass(element, className) {
    element.classList.add(className);
}

export function removeClass(element, className) {
    element.classList.remove(className);
}

export function hasClass(element, classNAME) { // since 2.0.0
    return element.classList.contains(classNAME);
}

// selection methods
export function getElementsByClassName(element, classNAME) { // returns Array
    return [].slice.call(element[getElementsByCLASSNAME](classNAME));
}

export function queryElement(selector, parent) {
    let lookUp = parent ? parent : document;
    return typeof selector === 'object' ? selector : lookUp.querySelector(selector);
}

export function getClosest(element, selector) { //element is the element and selector is for the closest parent element to find
    // source http://gomakethings.com/climbing-up-and-down-the-dom-tree-with-vanilla-javascript/
    let firstChar = selector.charAt(0);
    for (; element && element !== document; element = element[parentNode]) {// Get closest match
        if (firstChar === '.') {// If selector is a class
            if (queryElement(selector, element[parentNode]) !== null && hasClass(element, selector.replace('.', ''))) {
                return element;
            }
        } else if (firstChar === '#') { // If selector is an ID
            if (element.id === selector.substr(1)) {
                return element;
            }
        }
    }
    return false;
}

// event attach jQuery style / trigger  since 1.2.0
export function on(element, event, handler) {
    element.addEventListener(event, handler, false);
}

export function off(element, event, handler) {
    element.removeEventListener(event, handler, false);
}

export function one(element, event, handler) { // one since 2.0.4
    on(element, event, function handlerWrapper(e) {
        handler(e);
        off(element, event, handlerWrapper);
    });
}

export function emulateTransitionEnd(element, handler) { // emulateTransitionEnd since 2.0.4
    if (supportTransitions) {
        one(element, transitionEndEvent, function (e) {
            handler(e);
        });
    } else {
        handler();
    }
}

export function bootstrapCustomEvent(eventName, componentName, related) {
    let OriginalCustomEvent = new CustomEvent(eventName + '.bs.' + componentName);
    OriginalCustomEvent.relatedTarget = related;
    this.dispatchEvent(OriginalCustomEvent);
}

// reference a live collection of the DOM
const AllDOMElements = document[getElementsByTagName]('*');

// Init DATA API
export function initializeDataAPI(component, constructor, dataAttribute, collection) {
    let lookUp = collection && collection[length] ? collection : AllDOMElements;
    for (let i = 0; i < lookUp[length]; i++) {
        let attrValue = lookUp[i][getAttribute](dataAttribute), expectedAttrValue = component.replace(/spy/i, '')[toLowerCase]();
        if (attrValue && component === stringButton && ( attrValue[indexOf](expectedAttrValue) > -1 ) // data-toggle="buttons"
            || attrValue === expectedAttrValue) { // all other components
            new constructor(lookUp[i]);
        }
    }
}

// tab / collapse stuff
export const targetsReg = /^\#(.)+$/;

export function getOuterHeight(child) {
    let childStyle = child && window.getComputedStyle(child),
        btp = /px/.test(childStyle.borderTopWidth) ? Math.round(childStyle.borderTopWidth.replace('px', '')) : 0,
        btb = /px/.test(childStyle.borderBottomWidth) ? Math.round(childStyle.borderBottomWidth.replace('px', '')) : 0,
        mtp = /px/.test(childStyle.marginTop) ? Math.round(childStyle.marginTop.replace('px', '')) : 0,
        mbp = /px/.test(childStyle.marginBottom) ? Math.round(childStyle.marginBottom.replace('px', '')) : 0;
    return child[clientHeight] + parseInt(btp) + parseInt(btb) + parseInt(mtp) + parseInt(mbp);
}

export function getMaxHeight(parent) { // get collapse trueHeight and border
    let parentHeight = 0;
    for (let k = 0, ll = parent.children[length]; k < ll; k++) {
        parentHeight += getOuterHeight(parent.children[k]);
    }
    return parentHeight;
}


// tooltip / popover stuff
export function isElementInViewport(element) { // check if this.tooltip is in viewport
    let rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || doc.clientHeight) &&
        rect.right <= (window.innerWidth || doc.clientWidth)
    );
}

export function getScroll() { // also Affix and ScrollSpy uses it
    return {
        y: window.pageYOffset || doc.scrollTop,
        x: window.pageXOffset || doc.scrollLeft
    }
}

export function styleTip(link, element, position, parent) { // both popovers and tooltips
    let rect = link[getBoundingClientRect](),
        scroll = parent === body ? getScroll() : {
                x: parent[offsetLeft] + parent[scrollLeft],
                y: parent[offsetTop] + parent[scrollTop]
            },
        linkDimensions = {w: rect[right] - rect[left], h: rect[bottom] - rect[top]},
        elementDimensions = {w: element[offsetWidth], h: element[offsetHeight]};

    // apply styling to tooltip or popover
    if (position === top) { // TOP
        element[style][top] = rect[top] + scroll.y - elementDimensions.h + 'px';
        element[style][left] = rect[left] + scroll.x - elementDimensions.w / 2 + linkDimensions.w / 2 + 'px'

    } else if (position === bottom) { // BOTTOM
        element[style][top] = rect[top] + scroll.y + linkDimensions.h + 'px';
        element[style][left] = rect[left] + scroll.x - elementDimensions.w / 2 + linkDimensions.w / 2 + 'px';

    } else if (position === left) { // LEFT
        element[style][top] = rect[top] + scroll.y - elementDimensions.h / 2 + linkDimensions.h / 2 + 'px';
        element[style][left] = rect[left] + scroll.x - elementDimensions.w + 'px';

    } else if (position === right) { // RIGHT
        element[style][top] = rect[top] + scroll.y - elementDimensions.h / 2 + linkDimensions.h / 2 + 'px';
        element[style][left] = rect[left] + scroll.x + linkDimensions.w + 'px';
    }
    element.className[indexOf](position) === -1 && (element.className = element.className.replace(tipPositions, position));
}

export function updatePlacement(position) {
    return position === top ? bottom : // top
        position === bottom ? top : // bottom
            position === left ? right : // left
                position === right ? left : position; // right
}