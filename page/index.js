'use strict'
;(function(){

const HEARTBEAT_INNER_HTML = `
    <div class="content-wrap">
        <h3 class="regards">
            <ruby>致尚未发现的<emph>你</emph>，<rt>Dedicated to <i>the one</i> yet to be discovered,</rt></ruby>
        </h3>

        <code>170a21e    @    258_6515    /    e11bd - 2c5</code>
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
