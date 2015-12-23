/* common functions
 * Id(id):            getElementById,          return Element
 * Tag(tag):          getElementsByTagName,    return Array
 * Class(className):  getElementsByClassName,  return Array
 * getComputedHeight(node),                    return String
 * injectHeight(node, callback, reinject)
 * injectGradualFadeInDelay(node, interval)
 */

"use strict";

/* DOM querySelector */
(function(){
    window.$ = function(selector, element) {
        return (element||document).querySelector(selector)
    }
    window.$$ = function(selector, element) {
        return (element||document).querySelectorAll(selector)
    }
    window.forEachIn = function (elems, callback) {
        Array.prototype.forEach.call(elems, callback)
    }
})();

/* Height Injection */
(function(){
    /* equiv: window.getComputedStyle(node).height
     * can be used to force refresh element's computed style
     */
    window.getComputedHeight = function(elem) {
        return window.getComputedStyle(elem).height;
    }

    /* table of nodes that need height injected,
     * update height information when 'resize'
     */
    var injectTable      = [];
    /* throttle ms, number of ms delay that height will be re-injected */
    var resizeThrottleMs = 10;

    /* Inject calculated height to node's expanded attribute
     * used for css-transition simulated animation,
     *   element:  DOM element
     *   callback: called when inject complete, function(elem, injectedHeight)
     *   reinject: add to reInject table, so when 'resize', reinject Height */
    window.injectHeight = function(elem, callback, reinject) {
        if (!elem) return;
        if (reinject===undefined) reinject=true;
        // override styles that may affact height calculation
        var s = elem.style;
        var t = s.transition;
        var h = s.height;
        s.transition = "none";
        s.height     = "auto";
        elem.removeAttribute('expanded');
        var ih = getComputedHeight(elem);
        elem.setAttribute('expanded', ih);
        elem.style.height = h;
        getComputedHeight(elem);
        s.transition = t;
        if (reinject) injectTable.push([elem, callback]);
        if (callback) callback(elem, ih);
    }

    /* inject height for elements in injectTable */
    function reInject() {
        injectTable.forEach(function(e, i){
            try      { injectHeight(e[0], e[1], false) }
            catch(x) { injectTable[i]=undefined }
        });
        // remove failed elements, assume they no longer exist
        injectTable = injectTable.filter(function(e){return e});
    }

    var resizeTimer;
    window.addEventListener('resize', function(){
        // throttle resize event, so we don't inject height too often
        if (resizeTimer) clearTimeout(resizeTimer)
        resizeTimer = setTimeout(reInject, resizeThrottleMs);
    });

    /* Prepend Q-Zone Share link
     * This is meant to be used by webmaster to share this page,
     * If you are kind enough to help me spread my homepage, call this function in console
     * then click the prepended <a> right before <article>
     */
    window.prependQZoneShareLink = function() {
        // try to read article specific information ??
        var q = {
            url:       location.href,
            showcount: '1',             /*是否显示分享总数,显示：'1'，不显示：'0' */
            desc:      '@个人站',        /*默认分享理由(可选)*/
            summary:   $('meta[name=description]').content || ' ',   /*分享摘要(可选)*/
            title:     document.title,                               /*分享标题(可选)*/
            site:      'blog@'+(location.hostname||'std-aries.xyz'), /*分享来源 如：腾讯网(可选)*/
            pics:      $('img').src,                                 /*分享图片的路径(可选)*/
            style:     '203',
            width:     98,
            height:    22
        };
        var s = [];
        for(var i in q)
            s.push(i + '=' + encodeURIComponent(q[i]||''));
        var a = document.createElement('a')
        a.href      = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?'+s.join('&')
        a.target    = '_blank'
        a.innerHTML = 'Share to QZone'
        a.className = 'webmaster-internal'
        $('article').parentNode.insertBefore(a, $('article'))
        var pre = document.createElement('pre')
        pre.innerHTML = JSON.stringify(q,null,'  ')
        $('article').parentNode.insertBefore(pre, $('article'))
    }
})();
