'use strict'

const {readFileSync} = require('fs')
    , {resolve} = require('path')
    , winston = require('winston')

const DEFAULT_CONF = {
    stsAge: 181*24*60*60*1000,
    maxAge: 24*60*60*1000
}

const conf = Object.assign(DEFAULT_CONF, require('./conf'), {root: __dirname})

if (conf.dev)
    conf.maxAge = 0

// read TLS certificates
if (conf.tls) {
    conf.tls.ca   = readPEM(conf.tls.ca)
    conf.tls.key  = readPEM(conf.tls.key)
    conf.tls.cert = readPEM(conf.tls.cert)
}

// export SNI contextify function
if (conf.sni) {
    let ctxs = []    // array of SecureContext options
    for (let hostnameDecl in conf.sni)
        hostnameDecl.split(/\s*,\s*/).forEach( (hostname)=>{
            ctxs.push({
                hostname: hostname,
                options:  {
                    ca:   readPEM(conf.sni[hostnameDecl].ca),
                    key:  readPEM(conf.sni[hostnameDecl].key),
                    cert: readPEM(conf.sni[hostnameDecl].cert),
                }
            })
        })
    conf.addSecureContext = (tlsServer) => {
        ctxs.forEach( (ctx) => {
            winston.info(`load SNI: ${ctx.hostname}`)
            tlsServer.addContext(ctx.hostname, ctx.options)
        } )
        return tlsServer
    }
}else{
    conf.addSecureContext = (tlsServer)=>tlsServer
}

module.exports = conf

function readPEM(path) {
    if (typeof path === 'string')
        return readFileSync(resolve(__dirname, path), 'utf8')
    if (path instanceof Array)
        return path.map( readPEM )
    return undefined
}
