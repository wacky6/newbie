'use strict'

var readFileSync = require("fs").readFileSync
var resolve      = require("path").resolve
var koa   = require("koa")
var conf  = require("./conf-loader")
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

module.exports = route
module.exports.use = appUse
module.exports.app = app
module.exports.tls = conf.tls
module.exports.tls.extend = function(obj) { return Object.assign({}, conf.tls, obj) }
