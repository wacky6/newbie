'use strict'

;(function(){

var articles = []     // parse DOM

function parseDirectives() {
    var re_directive_separator = /\b(?=[#\/])/g
    return window.getHash()
                 .split( re_directive_separator )
                 .filter( function(s){return s.length>1} )
}

function updateTags(directives) {
    var tags = directives.filter( function(d) {
        return d[0]==='#'        // tag denotion
    } ).map( function(d) {
        return d.substring(1)
    } )

    $$('.tag').forEach( function(el) {
        var tagSelected = tags.indexOf(el.getAttribute('value'))!==-1   // => Array.prototype.{includes, find}
        el.setAttribute('aria-checked', tagSelected ? 'true' : 'false')
    } )

    articles.forEach( function(article) {
        var isTagged = true
        if (tags.length > 0)
            isTagged = article.tags.find( function(tag){ return tags.indexOf(tag)!==-1 } )
        article.DOMNode.setAttribute('aria-hidden', isTagged ? 'false' : 'true')
    } )

}

function writeTagsToDOM(node, tags) {
    node.innerHTML = ''
    $.contents(node, tags.map( function(tagStr){
        return {
            tag:   'div',
            class: 'mobile-w50',
            contents: {
                tag:   'button',
                class: 'dark checkbox tag icon-tag',
                role:  'menuitemcheckbox',
                value: tagStr,
                textContent: tagStr,
                events: {
                    click: function(ev) {
                        if (ev.cancellable)
                            ev.preventDefault()
                        var hash = window.getHash()
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
            }
        }
    } ) )
}

function extractTags(articles) {
    var tagsMap = {}
    articles.forEach( function(article){
        article.tags.forEach( function(tag){
            tagsMap[tag] = 1
        })
    })
    return Object.keys(tagsMap)
}

window.addEventListener("DOMContentLoaded", function() {
    updateTags( parseDirectives() )
    window.initDropdown( $('.mobile-dropdown') )
})

// blocks rendering and injects tag-list
articles = $$('.post-entry').map( window.blogIndex.parsePostEntryDOM )
writeTagsToDOM( $('.tag-list'), extractTags( articles ) )

})()
