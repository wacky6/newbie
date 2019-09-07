'use strict'
;(function(){

const HEARTBEAT_INNER_HTML = `
    <div class="content-wrap">
        <h3 class="regards">
            <ruby>尚未发现的<emph>你</emph>也一定，<rt>Dedicated to <i>the one</i> yet to be discovered,</rt></ruby>
        </h3>

        <div class="text-wrap" onclick="">
            <p class="text">
                <ruby><emph>光辉</emph>耀目。<rt>for your <emph>lonely</emph> heart.</rt></ruby>
            </p>

            <p class="origin">
                <ruby>还未了解这样的恋爱<rt>こんな恋知らないから</rt></ruby>
            </p>
        </div>

        <code>🎂  <span class="hint">0x</span>130df62   🎂</code>
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
