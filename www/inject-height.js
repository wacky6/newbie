"use strict";

/* equiv: window.getComputedStyle(node).height
 * can be used to force refresh element's computed style
 */
window.getComputedHeight = function(node) {
    return window.getComputedStyle(node).height;
}

/* table of nodes that need height injected,
 * update height information when 'resize'
 */
var injectTable      = [];
/* throttle ms, number of ms delay that height will be re-injected */
var resizeThrottleMs = 10;

/* Inject calculated height to node's expanded attribute
 * used for css-transition simulated animation,
 *   node:     DOM node
 *   callback: called when inject complete, function(node, injectedHeight)
 *   reinject: add to reInject table, so when 'resize', reinject Height */
window.injectHeight = function(node, callback, reinject) {
    if (!node) return;
    if (reinject===undefined) reinject=true;
    // override styles that may affact height calculation
    var style = node.style;
    var t = style.transition;
    var h = style.height;
    style.transition = "none";
    style.height     = "auto";
    node.removeAttribute('expanded');
    var ih = getComputedHeight(node);
    node.setAttribute('expanded', ih);
    node.style.height = h;
    getComputedHeight(node);
    node.style.transition = t;
    if (reinject) injectTable.push([node, callback]);
    if (callback) callback(node, ih);
}

/* inject height for nodes in injectTable */
function reInject() {
    injectTable.forEach(function(e, i){
        try      { injectHeight(e[0], e[1], false) }
        catch(e) { injectTable[i]=undefined }
    });
    // remove non-existing nodes
    injectTable = injectTable.filter(function(e){return e});
}

var resizeTimer = undefined;
window.addEventListener('resize', function(){
    // throttle resize event, so we don't inject height too often
    if (resizeTimer) clearTimeout(resizeTimer)
    resizeTimer = setTimeout(reInject, resizeThrottleMs);
});
