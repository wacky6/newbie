'use strict'

const fs = require('fs')
const accessSync    = fs.accessSync
const readFileSync  = fs.readFileSync
const writeFileSync = fs.writeFileSync

function existsSync(src) {
    try {
        accessSync(src, fs.F_OK)
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
