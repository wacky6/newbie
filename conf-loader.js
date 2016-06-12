'use strict'

const {readFileSync} = require('fs')
    , {resolve} = require('path')
    , {isString, isArray} = require('util')

const DEFAULT_CONF = {
    stsAge: 181*24*60*60*1000,
    maxAge: 24*60*60*1000
}

const conf = Object.assign(DEFAULT_CONF, require('./conf'), {root: __dirname})

const concat = (acc, cur) => acc.concat(cur)

if (conf.dev)
    conf.maxAge = 0

// read TLS certificates
if (conf.tls) {
    conf.tls.ca   = readPEM(conf.tls.ca)
    conf.tls.key  = readPEM(conf.tls.key)
    conf.tls.cert = readPEM(conf.tls.cert)
}

module.exports = conf

function readPEM(path) {
    if (typeof path === 'string')
        return readFileSync( resolve(__dirname, path) )
    if (path instanceof Array)
        return path.map( readPEM ).reduce( concat )
    return undefined
}
