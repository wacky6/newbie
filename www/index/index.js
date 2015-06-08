"use strict";

function getStyle(node) {
    return window.getComputedStyle(node).height;
}

function Id(id) {
    return document.getElementById(id);
}

var tContentLoaded;
var tLoaded;
var bgDelayMs = 900;

window.addEventListener("load", function(ev) {
    function fadeInBg(){
        getStyle(Id("bg"));
        Id("bg").className += " shown";
    }
    tLoaded = new Date().getTime();
    var delay = bgDelayMs - (tLoaded-tContentLoaded);
    setTimeout(fadeInBg, delay>0?delay:0);
    console.log(delay);
});

window.addEventListener("DOMContentLoaded", function(ev) {
    tContentLoaded = new Date().getTime();
});
