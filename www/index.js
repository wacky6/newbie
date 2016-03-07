'use strict'
;(function(){

document.addEventListener('DOMContentLoaded', function(){
    let $ = (sel, ctx) => document.querySelector(sel, ctx)

    $('#suki-desu').addEventListener('click', ()=>{
        $('#suki-desu').toggleState('aria-pressed')
        $('.carousal .content').toggleState('aria-hidden')
        $('#not-be-found').toggleState('aria-hidden')
    })

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
