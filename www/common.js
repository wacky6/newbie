/* common functions 
 * Id(id):            getElementById,          return Element
 * Tag(tag):          getElementsByTagName,    return Array
 * Class(className):  getElementsByClassName,  return Array
 * getComputedHeight(node),                    return String
 * injectHeight(node, callback, reinject)
 * injectGradualFadeInDelay(node, interval)
 */

"use strict";

/* DOM querySelector */
(function(){
    window.$ = function(selector, element) {
        return (element||document).querySelector(selector)
    }
    window.$$ = function(selector, element) {
        return (element||document).querySelectorAll(selector)
    }
    window.forEachIn = function (elems, callback) {
        Array.prototype.forEach.call(elems, callback)
    }
})();

/* Height Injection */
(function(){
    /* equiv: window.getComputedStyle(node).height
     * can be used to force refresh element's computed style
     */
    window.getComputedHeight = function(elem) {
        return window.getComputedStyle(elem).height;
    }

    /* table of nodes that need height injected,
     * update height information when 'resize'
     */
    var injectTable      = [];
    /* throttle ms, number of ms delay that height will be re-injected */
    var resizeThrottleMs = 10;

    /* Inject calculated height to node's expanded attribute
     * used for css-transition simulated animation,
     *   element:  DOM element
     *   callback: called when inject complete, function(elem, injectedHeight)
     *   reinject: add to reInject table, so when 'resize', reinject Height */
    window.injectHeight = function(elem, callback, reinject) {
        if (!elem) return;
        if (reinject===undefined) reinject=true;
        // override styles that may affact height calculation
        var s = elem.style;
        var t = s.transition;
        var h = s.height;
        s.transition = "none";
        s.height     = "auto";
        elem.removeAttribute('expanded');
        var ih = getComputedHeight(elem);
        elem.setAttribute('expanded', ih);
        elem.style.height = h;
        getComputedHeight(elem);
        s.transition = t;
        if (reinject) injectTable.push([elem, callback]);
        if (callback) callback(elem, ih);
    }

    /* inject height for elements in injectTable */
    function reInject() {
        injectTable.forEach(function(e, i){
            try      { injectHeight(e[0], e[1], false) }
            catch(e) { injectTable[i]=undefined }
        });
        // remove failed elements, assume they no longer exist
        injectTable = injectTable.filter(function(e){return e});
    }

    var resizeTimer = undefined;
    window.addEventListener('resize', function(){
        // throttle resize event, so we don't inject height too often
        if (resizeTimer) clearTimeout(resizeTimer)
        resizeTimer = setTimeout(reInject, resizeThrottleMs);
    });
})();

/* Gradual Fadein CSS-Animation delay injection */
(function(){
    window.injectGradualFadeInDelay = function(elements, interval) {
        forEachIn(elements, function(e,i){
            var ms = i*interval+"ms";
            e.style['-webkit-animation-delay'] = ms;
            e.style['animation-delay']         = ms;
        });
    }
})();
