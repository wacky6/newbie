'use strict'

;(function(){

/* urlencode(obj)
 * Encode `obj` to querystring */
window.urlencode = urlencode

window.prependQZoneShareLink

/* getHash()       => URL hash
 * setHash(str)    */
window.getHash = getHash
window.setHash = setHash

/* setCurrentNavItem(navId)
 * set navId's state to active, providing visual cue of current page
 * navId is set in <nav>'s <a nav-id="xxx">  */
window.setCurrentNavItem = setCurrentNavItem

/* el.toggleState(attr) => true/false
 * toggle attribute true/false, * used with aria-{state}
 * if attr does not exist, it is set to 'true'  */
HTMLElement.prototype.toggleState = HTMLElement_toggleState
/* el.attr(key, val) => value / el
 * similar to jQuery.attr
 * if val is omitted, return attr(key)
 * if val is present, set element's key to value, return element */
HTMLElement.prototype.attr = HTMLElement_attr

function prependQZoneShareLink() {
    // try to read article specific information ??
    let q = {
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

function urlencode(obj) {
    let arr = []
    for (let key in obj)
        arr.push(key+'='+encodeURIComponent(obj[key]||''))
    return arr.join('&')
}

function setHash(str, newState) {
    var method = newState ? 'pushState' : 'replaceState'
    if (str==='#' || str==='' || str===null || str===undefined)
        str = location.href.substring(0, location.href.search(/#|$/))
    window.history[method]({}, document.title, str)
}

function getHash() {
    return decodeURIComponent(window.location.hash)
}

function HTMLElement_toggleState(attr) {
    let newState
    if (this.getAttribute(attr)==='true')
        newState=false
    else
        newState=true
    this.setAttribute(attr, ''+newState)
    return newState
}

function HTMLElement_attr(key, value) {
    if (value===undefined) {
        return this.getAttribute(key)
    }else{
        this.setAttribute(value)
        return this
    }
}

function setCurrentNavItem(navId) {
    document.addEventListener('DOMContentLoaded', ()=>{
        var el = $(`nav [nav-id="${navId}"]`)
        if (el)
            el.toggleState('aria-pressed')
    })
}

})()
