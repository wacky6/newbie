'use strict'

var readFileSync = require("fs").readFileSync
var resolve      = require("path").resolve
var koa   = require("koa")
var conf  = require("./conf")
var isGenerator = require("is-generator-function")

var app = koa()

/* koa App initialize
 * `route` is sugar to add router to `app`
 */
function route(name) {
    let routeCtor
    if (name === undefined || name === null)
        return
    if (typeof name === 'string')
        name = require(name)
    if (typeof name === 'function')
        routeCtor = name
    if (isGenerator(name))
        routeCtor = function(){ return name }
    if (routeCtor === undefined)
        throw new Error('Not supported route declaration: type=' + typeof name)

    let args = []
    if (arguments.length > 1)
        args = Array.prototype.slice.call(arguments, 1)

    app.use( routeCtor.apply(app, args) )
}

/* sugar for app.use() */
function appUse(router) {
    if (router === undefined)
        return
    app.use(router)
}

/* initialize TLS certificate, key */
function mapContent(obj, prop) {
	if (obj[prop] === undefined) return undefined
	if ( ! (obj[prop] instanceof Array) ) obj[prop]=[ obj[prop] ]
	obj[prop] = obj[prop].map( function(name){ return readFileSync(resolve(__dirname, name)) } )
	return obj[prop]
}
var tlsOpts = Object.assign({}, conf.tls)
mapContent(tlsOpts, 'ca')
mapContent(tlsOpts, 'key')
mapContent(tlsOpts, 'cert')

module.exports = route
module.exports.use = appUse
module.exports.app = app
module.exports.tls = tlsOpts
module.exports.tls.extend = function(obj) { return Object.assign({}, tlsOpts, obj) }
