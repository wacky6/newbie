'use strict'

const re_line_split = /\s*[；;]\s*/g
const re_newlines = /\s*[\n\r]{2,}\s*/g
const re_trail_whitespace = /[\s\n\r]+$/

const marked = require('marked')

function metaBrief(meta, ctx) {
    if ( !meta.brief ) {
        meta.brief = (meta.description || meta.title || '')
                     .replace(re_line_split, '\n')
                     .replace(re_newlines, '\n')
    }
    meta.brief = meta.brief.replace(re_trail_whitespace, '')

    meta.briefHTML = marked(meta.brief)

    return meta
}

module.exports = metaBrief
