"use strict";
(function() {

var gradualFadeInInterval = 500;

function injectGrpDetailHeight(grp) {
    forEachIn($$(".g_dtl", grp), function(e){
        injectHeight(e, function(e, height){
            e.style.height = height;
        });
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
window.addEventListener('DOMContentLoaded', function(){
    injectGrpDetailHeight($("#sec_edu"));
    injectGradualFadeInDelay($$("section"), 500);
});

})();
