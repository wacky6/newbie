'use strict'
;(function(){

const HEARTBEAT_INNER_HTML = `
    <div class="content-wrap">
        <h3 class="regards">
            <ruby>我尚未遇见的<emph>你</emph>也一定，<rt>Dedicated to <i>the one</i> yet to be discovered:</rt></ruby>
        </h3>

        <div class="text-wrap" onclick="">
            <p class="text">
                <ruby>正在这个世界<emph>闪闪发光</emph>。<rt>for your <emph>lonely heart</emph>.</rt></ruby>
            </p>
        </div>
    </div>
`

document.addEventListener('DOMContentLoaded', function(){
    const $ = (sel) => document.querySelector(sel)
    const writeInnerHTML = ()=> {
        window.ga && window.ga('send', 'event', 'Features', 'heartbeat')

        $('#heartbeat').innerHTML = HEARTBEAT_INNER_HTML
        $('#suki-desu').removeEventListener('click', writeInnerHTML)
    }

    const toggleState = () => {
        $('#suki-desu').toggleState('aria-pressed')
        $('.carousal .content').toggleState('aria-hidden')
        $('#heartbeat').toggleState('aria-hidden')

        if ($('#heartbeat').getAttribute('aria-hidden') === 'true') {
            setTimeout(_ => {
                window.location.hash = '#'
            }, 100)
        }
    }

    $('#suki-desu').addEventListener('click', toggleState)

    if (window.location.hash.indexOf('#heartbeat') >= 0) {
        writeInnerHTML()
        toggleState()
    } else {
        $('#suki-desu').addEventListener('click', writeInnerHTML)
    }
})

HTMLElement.prototype.toggleState = function(attr) {
    let newState
    if (this.getAttribute(attr)==='true')
        newState=false
    else
        newState=true
    this.setAttribute(attr, ''+newState)
    return newState
}

})()
