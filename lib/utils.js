// Native Javascript for Bootstrap 3 | Internal Utility Functions
// by dnp_theme
// ES6 and bootstrap 4 in progress

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

const ieRegex = "MSIE ([0-9]{1,}[\.0-9]{0,})";
export const isIE = (new RegExp(ieRegex).exec(navigator.userAgent) != null) ? parseFloat(RegExp.$1) : false;

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

export default {addClass, removeClass, getScroll, isElementInViewport, getClosest, isIE, mouseHover, tipPositions} ;