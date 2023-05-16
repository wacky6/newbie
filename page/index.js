'use strict'
;(function(){

const HEARTBEAT_INNER_HTML = `
    <div class="content-wrap">
      <span class="life">Life</span>
      <span>takes</span>
      <span><ruby class="pronoun">me<rt>you</rt></ruby></span>
      <span>→</span>
      <span><ruby class="dest">there<rt>here</rt></ruby></span>
      <span class="tsuzuku">𝄇</span>
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
