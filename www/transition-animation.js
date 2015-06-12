"use strict";
(function() {
/* after [delay] ms, remove startClassName from node,
   and node will appears to be animating using transition
   only startClassName is used in case script is disabled,
   and node will display properly, because node's css is set to normal state

   in CSS:
       node {normal-css}
       node.[startClassName] {animation start css}

   node: DOM node,
   startClassName: className
   delay: ms, delay
*/
window.transitionAnimation = function(node, startClassName, delay) {
    if (!node) return;
    delay = delay || 0;
    var t = node.style.transition;
    node.style.transition = "none";
    node.className += " "+startClassName;
    getComputedHeight(node);
    node.style.transition = t;
    setTimeout(function(){
        node.className = node.className.replace(" "+startClassName, "");
    }, delay);
}

})();


