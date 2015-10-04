'use strict'

var readFileSync = require("fs").readFileSync
var resolve      = require('path').resolve
var koa   = require("koa")
var conf  = require("./conf")

var app = koa()

/* koa App initialize
 * `route` is sugar to add router to `app`
 */
function route(name) {
    let routeCtor = undefined
    if (typeof name === 'string')
        routeCtor = require(name)
    if (typeof name === 'function')
        routeCtor = function(){ return name }
    if (routeCtor === undefined)
        throw new Error('Not supported route declaration: type=' + typeof name)

    let args = []
    if (arguments.length > 0)
        args = Array.prototype.slice.call(arguments, 1)

    app.use( routeCtor.apply(app, args) )
}

route( 'koa-lusca', {
    csrf: false,
    csp:  false,
    xframe: 'SAMEORIGIN',
    hsts: {maxAge: 24*60*60*30, includeSubDomains: false},
    xssProtection: false
} )

/* initialize TLS certificate, key */
function mapContent(obj, prop) {
	if (obj[prop] === undefined) return undefined
	if ( ! obj[prop] instanceof Array ) obj[prop]=[ obj[prop] ]
	obj[prop] = obj[prop].map( function(name){ return readFileSync(resolve(__dirname, name)) } )
	return obj[prop]
}
var tlsOpts = Object.assign({}, conf.tls)
mapContent(tlsOpts, 'ca')
mapContent(tlsOpts, 'key')
mapContent(tlsOpts, 'cert')

module.exports = route
module.exports.app = app
module.exports.tls = tlsOpts
module.exports.tls.extend = function(obj) { return Object.assign({}, tlsOpts, obj) }
