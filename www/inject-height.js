"use strict";

/* equiv: window.getComputedStyle(node).height
 * can be used to force refresh element's computed style
 */
window.getComputedHeight = function(node) {
    return window.getComputedStyle(node).height;
}

/* Inject calculated height to node's expanded attribute
 * used for css-transition simulated animation    */
window.injectHeight = function(node) {
    if (!node) return;
    // override styles that may affact height calculation
    var style = node.style;
    var t = style.transition;
    var h = style.height;
    style.transition = "none";
    style.height     = "auto";
    node.setAttribute('expanded', getComputedHeight(node));
    node.style.height = h;
    getComputedHeight(node);
    node.style.transition = t;
}
