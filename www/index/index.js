"use strict";
(function(){

var tContentLoaded;
var tLoaded;
var bgDelayMs = 900;

window.addEventListener("load", function(ev) {
    function fadeInBg(){
        Id("bg").className += " fadein";
        Id("bg").style.visibility='';
    }
    tLoaded = new Date().getTime();
    var delay = bgDelayMs - (tLoaded-tContentLoaded);
    setTimeout(fadeInBg, delay>0?delay:0);
});

window.addEventListener("DOMContentLoaded", function(ev) {
    tContentLoaded = new Date().getTime();
    Id("bg").style.visibility="hidden";
});

})();
