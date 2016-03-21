'use strict'

const statSync = require('fs').statSync
require('date-format-lite')

function inferMtime(meta, ctx) {
    if ( !meta.mtime )
        if (meta.date)
            meta.mtime = meta.date
        else
            meta.mtime = statSync(ctx.path).mtime

    meta.mtimeStr = meta.mtime.format('YYYY-MM-DD')
    
    return meta
}

module.exports = inferMtime
