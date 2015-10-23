'use strict'

let conf = require('./conf')
let createSecureContext = require('tls').createSecureContext
let readFileSync = require('fs').readFileSync
let resolve = require('path').resolve
let chalk = require('chalk')


// create base parsedConf
let parsedConf = Object.assign({}, conf)
deprecate(conf, 'sslKey', 'sslCrt')  // complain about deprecated stuff

// delete unnecessary fields
delete parsedConf.tls
delete parsedConf.sni
delete parsedConf.sslKey
delete parsedConf.sslCrt


if (conf.tls)
    parsedConf.tls = parseTLS(conf.tls)

if (conf.tls && conf.sni)
    parsedConf.tls.SNICallback = parseSNI(conf.sni)


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
            console.log(chalk.yellow('error: ')+'unsupported SNI matcher')
            process.exit(1)
        }

        secCtx.push([re, createSecureContext(parseTLS(sni[match]))])
    }

    // return TLS options that will be passed to TLS.createServer
    return function SNICallback(servername, cb){
        let decl = secCtx.find( (decl)=>servername.match(decl[0]) )
        if (decl===undefined)
            console.log(chalk.yellow('warn: ')+'no match for SNI '+servername)
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
            console.log(chalk.red('error: ')+`${field} is required!`)
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
            console.log(chalk.yellow('warn: ')+`${field} is deprecated!`)
    })
}
