"use strict";
(function(){

function Id(id) {
    return document.getElementById(id);
}

var tContentLoaded;
var tLoaded;
var bgDelayMs = 900;

window.addEventListener("load", function(ev) {
    function fadeInBg(){
        getComputedHeight(Id("bg"));
        Id("bg").className += " shown";
    }
    tLoaded = new Date().getTime();
    var delay = bgDelayMs - (tLoaded-tContentLoaded);
    setTimeout(fadeInBg, delay>0?delay:0);
});

window.addEventListener("DOMContentLoaded", function(ev) {
    tContentLoaded = new Date().getTime();
    var menu = Id("menu_wrap");
    injectHeight(menu, function(node, height){
        node.style.height = height;
    });
    transitionAnimation(menu, "t-fadein-start");
    transitionAnimation(menu, "t-before-expand", 900);
});

})();
