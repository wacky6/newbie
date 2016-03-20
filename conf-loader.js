'use strict'

const conf = require('./conf')
    , createSecureContext = require('tls').createSecureContext
    , readFileSync = require('fs').readFileSync
    , resolve = require('path').resolve
    , chalk = require('chalk')
    , winston = require('winston')

const red    = chalk.red
    , yellow = chalk.yellow

const DEFAULT_CONF = {
    stsAge: 181*24*60*60*1000,
    maxAge: 24*60*60*1000
}


// create base parsedConf
let parsedConf = Object.assign(DEFAULT_CONF, conf)

// complain about deprecated stuff
deprecate(conf, 'sslKey', 'sslCrt')

// delete unnecessary fields
delete parsedConf.sni
delete parsedConf.sslKey
delete parsedConf.sslCrt

if (conf.tls) {
    parsedConf.tls = parseTLS(conf.tls)
    if (conf.sni)
        parsedConf.tls.SNICallback = parseSNI(conf.sni)
}

if (!parsedConf.root)
    parsedConf.root = __dirname

// export parsed configuration
module.exports = parsedConf





/* read pemPath to Buffer, pemPath is relative to __dirname
 * pemPath can be:
 *    string:    a single pem file, return Buffer
 *    [string]:  an Array of pem files, return [Buffer]
 */
function readContent(pemPath) {
    let readPemSync = (path) => readFileSync(resolve(__dirname, path))
    if (pemPath === undefined) return undefined
    if (pemPath instanceof Array) return pemPath.map(readPemSync)
    if (typeof pemPath === 'string') return readPemSync(pemPath)
    throw new Error('Invalid pem path declaration: '+typeof pemPath)
}

/* parseSNI
 *    sni: sni Object
 * return SNICallback, which can be passed to tls.createServer
 */
function parseSNI(sni) {
    let secCtx = [] // Array of [re_match, secCtx]
    for (let match in sni) {
        let re   // regExp used to match SNI servername
        if (match instanceof RegExp)
            re = match
        if (typeof match === 'string')
            re = new RegExp('^('
                            +match.trim()
                                  .replace(/\*/g, '[^.]+')
                                  .replace(/\s*\,\s*/g, '|')
                            +')$' )
        if (re===undefined) {
            winston.error(red('unsupported SNI matcher'))
            process.exit(1)
        }

        secCtx.push([re, createSecureContext(parseTLS(sni[match]))])
    }

    // return TLS options that will be passed to TLS.createServer
    return function SNICallback(servername, cb){
        let decl = secCtx.find( (decl)=>servername.match(decl[0]) )
        if (decl===undefined)
            winston.warn(yellow('no match for SNI '+servername))
        cb(null, decl ? decl[1] : undefined)
    }
}

/* parse TLS options
 *    tls: tls Object (conf.js)
 * return tls Object, which can be passed to tls.createServer
 *
 * reads key, cert, ca
 * pfx is not supported!
 */
function parseTLS(tls) {

    required(tls, 'key', 'cert')

    let ret = Object.assign({}, tls)

    // read key,cert,ca
    ;['key', 'cert', 'ca'].forEach( (field) => {
        ret[field] = readContent(tls[field])
    })

    return ret
}

/* check if obj's fields are present (!== undefined)
 * fields is a placeholder for rest arguments
 * eg: required({}, 'key1', 'key2')
 * print error message if one fiels not exist process.exit(non-zero)
 */
function required(obj, _fields) {
    let fields = Array.prototype.slice.call(arguments, 1)
    fields.forEach( field => {
        if (obj[field]===undefined) {
            winston.error(red(`${field} is required!`))
            process.exit(1)
        }
    })
}

/* complain about deprecated fields
 * eg: deprecated({}, 'key1', 'key2')
 * print warning message
 */
function deprecate(obj, _fields) {
    let fields = Array.prototype.slice.call(arguments, 1)
    fields.forEach( field => {
        if (obj[field]!==undefined)
            winston.warn(yellow(`${field} is deprecated!`))
    })
}
