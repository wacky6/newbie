'use strict'

const {blue} = require('chalk')

const re_trail_whitespace = /[\s\n\r]+$/

function metaDescription(meta, ctx) {
    if (!meta.description)
        ctx.warn(blue('description')+' not set')
    meta.description = String(meta.description).replace(re_trail_whitespace, '')
    return meta
}

module.exports = metaDescription
