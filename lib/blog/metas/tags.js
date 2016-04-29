'use strict'

const {blue} = require('chalk')

function metaTags(meta, ctx) {

    if ( meta.tag ) {
        ctx.warn(blue('tag')+' is deprecated')
        if ( !meta.tags )
            meta.tags = meta.tag
        delete meta.tag
    }

    if ( !meta.tags )
        meta.tags = []

    if ( typeof meta.tags === 'string' )
        meta.tags = meta.tags.split(/\s*,\s*/)

    if ( ! (meta.tags instanceof Array))
        ctx.warn(blue('tags')+': can not normalize to Array: '+meta.tags)

    return meta
}

module.exports = metaTags
