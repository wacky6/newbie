'use strict'

const {exists, read, write} = require('./fs-util.js')

function compare(src, dest) {
    return Buffer.compare(read(src), read(dest))===0
}

function updateFileSync(dest, src) {
    if ( !exists(src) )
        return undefined

    if ( !exists(dest) || !compare(src, dest) ) {
        write(dest, read(src))
        return true
    }
    return false
}

module.exports = updateFileSync
