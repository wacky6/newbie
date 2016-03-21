'use strict'

const blue = require('chalk').blue

function metaKeywords(meta, ctx) {

    if ( meta.keyword ) {
        ctx.warn(blue('keyword')+' is deprecated')
        if ( !meta.keywords )
            meta.keywords = meta.keyword
        delete meta.keyword
    }

    if ( !meta.keywords )
        meta.keywords = []

    if ( typeof meta.keywords === 'string' )
        meta.keywords = meta.keywords.split(/\s*,\s*/)

    if ( ! (meta.keywords instanceof Array))
        ctx.warn(blue('keywords')+': can not normalize to Array: '+meta.keywords)

    return meta
}

module.exports = metaKeywords
