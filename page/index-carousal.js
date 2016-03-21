'use strict'

let $  = (sel, ctx) => document.querySelector(sel, ctx)
let $$ = (sel, ctx) => Array.prototype.slice.call(document.querySelectorAll(sel, ctx), 0)

let script = ()=>{
    const attr_name = 'carousal-id'
    const default_carousal_id = '0'
    $$('nav a').forEach( (el)=>{
        el.addEventListener('mouseenter', (ev)=>{
            let showId = el.getAttribute(attr_name) || default_carousal_id
            $(`[${attr_name}="${showId}"]`, $('.carousal')).classList.add('show')
        })
        el.addEventListener('mouseleave', (ev)=>{
            let showId = el.getAttribute(attr_name) || default_carousal_id
            if (showId !== default_carousal_id)
                $(`[${attr_name}="${showId}"]`, $('.carousal')).classList.remove('show')
        })
    })
}

if (document.readyState==='interactive' || document.readyState==='complete')
    script()
else
    document.addEventListener('DOMContentLoaded', script)
