'use strict'

const re_h1 = /<h1(?:(?:\s+\w+(?:\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)>(.+?)<\/h1>/

function metaTitle(meta, ctx) {
    if ( !meta.title ) {
        let m = re_h1.exec(ctx.html)
        if (m)
            meta.title = m[1]
    }
    return meta
}

module.exports = metaTitle
