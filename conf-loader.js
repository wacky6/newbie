'use strict'

const {readFileSync} = require('fs')
    , {resolve} = require('path')
    , {isString, isArray} = require('util')

const DEFAULT_CONF = {
    stsAge: 181*24*60*60*1000,
    maxAge: 24*60*60*1000
}

const conf = Object.assign(DEFAULT_CONF, require('./conf'), {root: __dirname})

const concat = (acc, cur) => Buffer.concat([acc, cur])

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
    if ( isString(path) )
        return readFileSync( resolve(__dirname, path) )
    if ( isArray(path) )
        return path.map( readPEM ).reduce( concat )
    return undefined
}
