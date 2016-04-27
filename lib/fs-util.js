'use strict'

const {accessSync, readFileSync, writeFileSync, F_OK} = require('fs')

function existsSync(src) {
    try {
        accessSync(src, F_OK)
    }catch (e) {
        return false
    }
    return true
}

function readSync(path) {
    return readFileSync(path)
}

function writeSync(path, data) {
    return writeFileSync(path, data)
}

module.exports = {
    read:   readSync,
    write:  writeSync,
    exists: existsSync
}
