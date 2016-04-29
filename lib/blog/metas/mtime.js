'use strict'

const {statSync} = require('fs')

function inferMtime(meta, ctx) {
    if ( !meta.mtime )
        if (meta.date)
            meta.mtime = meta.date
        else
            meta.mtime = statSync(ctx.path).mtime

    return meta
}

module.exports = inferMtime
