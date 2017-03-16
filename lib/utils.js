// Native Javascript for Bootstrap 3 | Internal Utility Functions

var globalObject = typeof global !== 'undefined' ? global : this||window,
    doc = document.documentElement, body = document.body,

    // function toggle attributes
    dataToggle    = 'data-toggle',
    dataDismiss   = 'data-dismiss',
    dataSpy       = 'data-spy',
    dataRide      = 'data-ride',

    // components
    stringAlert     = 'Alert',
    stringButton    = 'Button',
    stringCarousel  = 'Carousel',
    stringCollapse  = 'Collapse',
    stringDropdown  = 'Dropdown',
    stringModal     = 'Modal',
    stringPopover   = 'Popover',
    stringScrollSpy = 'ScrollSpy',
    stringTab       = 'Tab',
    stringTooltip   = 'Tooltip',

    // options DATA API
    databackdrop      = 'data-backdrop',
    dataKeyboard      = 'data-keyboard',
    dataTarget        = 'data-target',
    dataInterval      = 'data-interval',
    dataHeight        = 'data-height',
    dataPause         = 'data-pause',
    dataOriginalTitle = 'data-original-title',
    dataOriginalText  = 'data-original-text',
    dataDismissible   = 'data-dismissible',
    dataTrigger       = 'data-trigger',
    dataAnimation     = 'data-animation',
    dataContainer     = 'data-container',
    dataPlacement     = 'data-placement',
    dataDelay         = 'data-delay',
    dataOffsetTop     = 'data-offset-top',
    dataOffsetBottom  = 'data-offset-bottom',

    // option keys
    backdrop = 'backdrop', keyboard = 'keyboard', delay = 'delay',
    content = 'content', target = 'target',
    interval = 'interval', pause = 'pause', animation = 'animation',
    placement = 'placement', container = 'container',

    // box model
    offsetTop    = 'offsetTop',      offsetBottom   = 'offsetBottom',
    offsetLeft   = 'offsetLeft',
    scrollTop    = 'scrollTop',      scrollLeft     = 'scrollLeft',
    clientWidth  = 'clientWidth',    clientHeight   = 'clientHeight',
    offsetWidth  = 'offsetWidth',    offsetHeight   = 'offsetHeight',
    innerWidth   = 'innerWidth',     innerHeight    = 'innerHeight',
    scrollHeight = 'scrollHeight',   height         = 'height',

    // aria
    ariaExpanded = 'aria-expanded',
    ariaHidden   = 'aria-hidden',

    // event names
    clickEvent    = 'click',
    hoverEvent    = 'hover',
    keydownEvent  = 'keydown',
    resizeEvent   = 'resize',
    scrollEvent   = 'scroll',
    // originalEvents
    showEvent     = 'show',
    shownEvent    = 'shown',
    hideEvent     = 'hide',
    hiddenEvent   = 'hidden',
    closeEvent    = 'close',
    closedEvent   = 'closed',
    slidEvent     = 'slid',
    slideEvent    = 'slide',
    changeEvent   = 'change',

    // other
    getAttribute            = 'getAttribute',
    setAttribute            = 'setAttribute',
    hasAttribute            = 'hasAttribute',
    getElementsByTagName    = 'getElementsByTagName',
    getBoundingClientRect   = 'getBoundingClientRect',
    getElementsByCLASSNAME  = 'getElementsByClassName',

    indexOf      = 'indexOf',
    parentNode   = 'parentNode',
    length       = 'length',
    toLowerCase  = 'toLowerCase',
    Transition   = 'Transition',
    Webkit       = 'Webkit',
    style        = 'style',

    active     = 'active',
    showClass  = 'show',
    collapsing = 'collapsing',
    disabled   = 'disabled',
    loading    = 'loading',
    left       = 'left',
    right      = 'right',
    top        = 'top',
    bottom     = 'bottom',

    // tooltip / popover
    fixedTop = '.fixed-top',
    fixedBottom = '.fixed-bottom',
    mouseHover = ('onmouseleave' in document) ? [ 'mouseenter', 'mouseleave'] : [ 'mouseover', 'mouseout' ],
    tipPositions = /\b(top|bottom|left|top)+/,

    // transitionEnd since 2.0.4
    supportTransitions = Webkit+Transition in doc[style] || Transition[toLowerCase]() in doc[style],
    transitionEndEvent = Webkit+Transition in doc[style] ? Webkit[toLowerCase]()+Transition+'End' : Transition[toLowerCase]()+'end',





//classList polyfills
export function addClass(el, c) {
    if (el.classList) {
        el.classList.add(c);
    } else {
        el.className += " " + c;
    }
}

export function removeClass(el, c) {
    if (el.classList) {
        el.classList.remove(c);
    } else {
        el.className = el.className.replace(c, "").replace(/^\s+|\s+$/g, "");
    }
}

export const isIE = (new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null) ? parseFloat(RegExp.$1) : false;

export function getClosest(el, s) { //el is the element and s the selector of the closest item to find
    // source http://gomakethings.com/climbing-up-and-down-the-dom-tree-with-vanilla-javascript/
    var f = s.charAt(0);
    for (; el && el !== document; el = el.parentNode) {// Get closest match
        if (f === '.') {// If selector is a class
            if (document.querySelector(s) !== undefined) {
                return el;
            }
        }
        if (f === '#') { // If selector is an ID
            if (el.id === s.substr(1)) {
                return el;
            }
        }
    }
    return false;
}


// tooltip / popover stuff
export function isElementInViewport(t) { // check if this.tooltip is in viewport
    var r = t.getBoundingClientRect();
    return (
        r.top >= 0 &&
        r.left >= 0 &&
        r.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        r.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
}

export function getScroll() { // also Affix and scrollSpy uses it
    return {
        y: window.pageYOffset || document.documentElement.scrollTop,
        x: window.pageXOffset || document.documentElement.scrollLeft
    }
}

export const mouseHover = ('onmouseleave' in document) ? ['mouseenter', 'mouseleave'] : ['mouseover', 'mouseout'];
export const tipPositions = /\b(top|bottom|left|top)+/;