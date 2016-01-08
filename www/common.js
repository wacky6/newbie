"use strict";

;(function(){


/* urlencode(obj)
 * Encode `obj` to querystring
 */
window.urlencode = urlencode

/* Prepend Q-Zone Share link
 * This is meant to be used by webmaster to share this page,
 * If you are kind enough to help me spread my homepage, call this function in console
 * then click the prepended <a> right before <article>
 */
window.prependQZoneShareLink = prependQZoneShareLink


function urlencode(obj){
    var arr = []
    for (var key in obj)
        arr.push(key+'='+encodeURIComponent(obj[key]||''))
    return arr.join('&')
}

function prependQZoneShareLink() {
    // try to read article specific information ??
    var q = {
        url:       location.href,
        showcount: '1',             /*是否显示分享总数,显示：'1'，不显示：'0' */
        desc:      '@个人站',        /*默认分享理由(可选)*/
        title:     document.title,  /*分享标题(可选)*/
        summary:   $('meta[name=description]').content || ' ',     /*分享摘要(可选)*/
        site:      'Blog @ '+(location.hostname||'std-aries.xyz'), /*分享来源 如：腾讯网(可选)*/
        pics:      ($('img') || {src:''}).src,                     /*分享图片的路径(可选)*/
        style:     '203',
        width:     98,
        height:    22
    }
    $.before(
        $.create('a', {
            textContent: 'Share to QZone',
            properties: {
                className: 'webmaster-internal',
                target:    '_blank',
                href:      'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?'+urlencode(q)
            }
        }),
        $('article')
    )
    $.before(
        $.create('pre', {
            textContent: JSON.stringify(q, null, '  ')
        }),
        $('article')
    )
}


})();
