'use strict'

const {statSync} = require('fs')

function inferCtime(meta, ctx) {
    if ( !meta.ctime )
        if (meta.date)
            meta.ctime = meta.date
        else
            meta.ctime = statSync(ctx.path).ctime

    return meta
}

module.exports = inferCtime
