'use strict'

;(function(){

let articles = []     // parse DOM

const cmpStrLength = (a, b) => {
    let l = a.length - b.length
    if (l!=0)
        return -l
    else
        return a.localeCompare(b)
}

function parseDirectives() {
    let re_directive_separator = /\B(?=#|\/)/g
    return window.getHash()
                 .split( re_directive_separator )
                 .filter( (s) => s.length>1 )
}

function updateTags(directives) {
    let tags = directives.filter( (d)=>d[0]==='#' )
                         .map( (d)=>d.substring(1) )

    $$('.tag').forEach( (el) => {
        let tagSelected = tags.indexOf(el.getAttribute('value'))!==-1   // => Array.prototype.{includes, find}
        el.setAttribute('aria-checked', tagSelected ? 'true' : 'false')
    } )

    let selected = 0  // selected count
    articles.forEach( (article) => {
        let isTagged = tags.length
                       ? article.tags.find( (tag) => tags.indexOf(tag)!==-1 )
                       : true

        let isSelected = isTagged
        if (isSelected)
            ++selected
        article.DOMNode.setAttribute('aria-hidden', ''+(!isSelected))
    } )

    $('.search').setAttribute('aria-hidden', ''+(selected===0))
    $('.post-list').setAttribute('aria-hidden', ''+(selected===0))
    $('.no-match').setAttribute('aria-hidden', ''+(selected!==0))

}

function writeTagsToDOM(node, tags) {
    node.innerHTML = ''
    $.contents(node, tags.map( (tagStr) => ({
        tag:   'button',
        class: 'dark checkbox tag icon-tag',
        role:  'menuitemcheckbox',
        value: tagStr,
        textContent: tagStr,
        events: {
            click: (ev) => {
                if (ev.cancellable)
                    ev.preventDefault()
                let hash = window.getHash()
                if (hash.indexOf('#'+tagStr)!==-1) {
                    /* use while-replace to avoid new RegExp(str),
                     * str may be invalid for some tag string */
                    while (hash.indexOf('#'+tagStr)!==-1)
                        hash = hash.replace('#'+tagStr, '')
                }else{
                    hash = hash+'#'+tagStr
                }
                window.setHash(hash)
                updateTags(parseDirectives())
            }
        }
    }) ) )
}

function extractTags(articles) {
    let tagsMap = {}
    articles.forEach( (article) =>
        article.tags.forEach(
            (tag)=>tagsMap[tag]=1
        )
    )
    return Object.keys(tagsMap).sort()
}

window.addEventListener("DOMContentLoaded", () => {
    updateTags( parseDirectives() )
    $('.view-all')._.events({
        click: (ev)=>{
            window.setHash()
            updateTags(parseDirectives())
        }
    })
})
window.addEventListener("hashchange", () => {
    updateTags(parseDirectives())
})

// blocks rendering and injects tag-list
articles = $$('.post-entry').map( window.blogIndex.parsePostEntryDOM )
writeTagsToDOM( $('.tag-list'), extractTags( articles ) )

})()
