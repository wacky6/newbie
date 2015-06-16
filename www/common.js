/* common functions 
 * Id(id):            getElementById,          return Element
 * Tag(tag):          getElementsByTagName,    return Array
 * Class(className):  getElementsByClassName,  return Array
 */

"use strict";

(function(){

function mkArray(coll) {
    var arr = [];
    for (var i=0; i!=coll.length; ++i)
        arr.push(coll.item(i));
    return arr;
}

window.Id = function(id) {
    return document.getElementById(id);
}

window.Tag = function(tagName) {
    return mkArray(document.getElementsByTagName(tagName));
}

window.Class = function(className, parentNode) {
    parentNode = parentNode || document.body;
    return mkArray(parentNode.getElementsByClassName(className));
}

})();
