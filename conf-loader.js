'use strict'

const readFileSync = require('fs').readFileSync
    , winston = require('winston')
    , resolve = require('path').resolve

const DEFAULT_CONF = {
    stsAge: 181*24*60*60*1000,
    maxAge: 24*60*60*1000
}

const conf = Object.assign(DEFAULT_CONF, require('./conf'))

conf.root = __dirname

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
            winston.info(`load SNI: ${hostname}`)
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
        ctxs.forEach( (ctx) => tlsServer.addContext(ctx.hostname, ctx.options) )
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
