"use strict";

(function(){

window.injectGradualFadeInDelay = function(nodes, interval) {
    nodes.forEach(function(e,i){
        var ms = i*interval+"ms";
        e.style['-webkit-animation-delay'] = ms;
        e.style['animation-delay']         = ms;
    });
}

})();
