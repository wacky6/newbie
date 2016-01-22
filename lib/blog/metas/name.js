'use strict'

const blue = require('chalk').blue
const red  = require('chalk').red
const basename = require('path').basename
const extname  = require('path').extname

const re_invalid_chars = /[^-_A-Za-z0-9']/g

function stripFilename(path) {
    let name
    name = basename(path)
    name = name.substr(0, name.length - extname(name).length)
    name = name.replace(/\s+/g, '-')
    return name
}

function metaName(meta, ctx) {
    let inferred = false
    if ( !meta.name ) {
        meta.name = stripFilename(ctx.path)
        inferred = true
    }else {
        meta.name = meta.name.trim()
    }
    // check invalid url characters
    let highlighted = meta.name.replace(re_invalid_chars, (s)=>''+red(s))
    if (meta.name !== highlighted) {
        if (inferred) {
            ctx.error("Can't infer a valid url path-name!")
            ctx.error("Please override meta: 'name'")
        }else{
            ctx.error("Invalid characters in url path-name!")
            ctx.error("Given: "+highlighted)
            ctx.error("Please check meta: 'name'")
        }
    }
    return meta
}

module.exports = metaName
