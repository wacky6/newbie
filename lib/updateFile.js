'use strict'

const file = require('./fs-util.js')

function compare(src, dest) {
    return Buffer.compare(file.read(src), file.read(dest))===0
}

function updateFileSync(dest, src) {
    if ( !file.exists(src) )
        return undefined

    if ( !file.exists(dest) || !compare(src, dest) ) {
        file.write(dest, file.read(src))
        return true
    }
    return false
}

module.exports = updateFileSync
