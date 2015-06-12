"use strict";
(function() {
function Id(id) {
    return document.getElementById(id);
}

var gradualFadeInInterval = 500;

function mkArray(coll) {
    var arr = [];
    for (var i=0; i!=coll.length; ++i)
        arr.push(coll.item(i));
    return arr;
}

function injectGrpDetailHeight(grpNode) {
    var grp = grpNode.getElementsByClassName("g_dtl");
    mkArray(grp).forEach(function(e){
        injectHeight(e, function(node, height){
            node.style.height = height;
        });
    });
}

function gradualFadeInSection(grpNode) {
    var grp = grpNode.getElementsByTagName("section");
    mkArray(grp).forEach(function(e,i){
        transitionAnimation(e, "t-fadein-start", gradualFadeInInterval*i);
    });
}

/* NOTE:
 *   in Webkit/Firefox/IE, or HTML5 compliant browser
 *     execution of external script is blocked by CSS
 *     so we can figure out desired rendered height in DOMContentLoaded,
 *     therefore no need to wait for 'load' event
 *   in Opera, 
 *     execution of external script is NOT blocked by CSS
 *     but, considering the amount of Opera users, no extra measure is taken
 *   Reference: molily.de/comcontentloaded/
 *   
 *   background image used in sec_edu does not affact text's height;
 */
window.addEventListener('DOMContentLoaded', function(ev){
    injectGrpDetailHeight(Id("sec_edu"), "t-height");  
    gradualFadeInSection(document.body.getElementsByTagName("article")[0]);
});

})();
