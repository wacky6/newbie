'use strict'

const statSync = require('fs').statSync
require('date-format-lite')

function inferCtime(meta, ctx) {
    if ( !meta.ctime ) {
        if (meta.date)
            meta.ctime = meta.date
        else
            meta.ctime = statSync(ctx.path).ctime
    }
    meta.ctimeStr = meta.ctime.format('YYYY-MM-DD')
    return meta
}

module.exports = inferCtime
