'use strict'
;(function(){

const NOT_BE_FOUND_INNER_HTML = `
    <h3>Not.Be.Found</h3>
`

document.addEventListener('DOMContentLoaded', function(){
    let $ = (sel) => document.querySelector(sel)
    let writeInnerHTML = ()=> {
        window.ga && window.ga('send', 'event', 'Features', 'kimi-ga-suki-desu')

        $('#not-be-found').innerHTML = NOT_BE_FOUND_INNER_HTML
        $('#suki-desu').removeEventListener('click', writeInnerHTML)
    }

    $('#suki-desu').addEventListener('click', ()=>{
        $('#suki-desu').toggleState('aria-pressed')
        $('.carousal .content').toggleState('aria-hidden')
        $('#not-be-found').toggleState('aria-hidden')
    })

    $('#suki-desu').addEventListener('click', writeInnerHTML)

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
