'use strict'

const blue = require('chalk').blue
const re_trail_whitespace = /[\s\n\r]+$/

function metaDescription(meta, ctx) {
    if (!meta.description)
        ctx.warn(blue('description')+' not set')
    meta.description = meta.description.replace(re_trail_whitespace, '')
    return meta
}

module.exports = metaDescription
