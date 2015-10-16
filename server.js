"use strict"

var join     = require("path").join
var conf     = require("./conf")
var route    = require("./app-init")

/* koa Router Tables:
 *
 * route( name || function*, option... )
 *   name:     name of module, require(name), then as following
 *   function: koa Router Constructor:         opts => function*(){}
 *             koa Router GeneratorFunction:   function*(){}
 *             undefined, null:                [ no router is added, sugar for `if(...) route()` ]
 *   option:   Router Constructor arguments, ignored for GeneratorFunction/undefined type
 *
 * route.use()
 *   same as koa-app.use()
 *
 * Useful Routers:
 *   koa-sub-domain:   domain based router
 *   koa-ip:           ip filter
 *   koa-compressor:   spdy/h2 compression
 */

// Security Related Headers
route.use( require('koa-lusca').xframe("SAMEORIGIN") )
route.use( require('koa-lusca').hsts({maxAge: 24*60*60*30, includeSubDomains: false}) )

// Application Routers
route( 'koa-compress'  )
route( './route-error' )
route( 'koa-static', join(__dirname, 'www-bin'), {maxage: conf.cache ? 24*60*60*1000 : 0})
route( 'koa-static', join(__dirname, 'www'), {maxage: conf.cache ? 24*60*60*1000 : 0})
route( './route-dev'   )



/* server creation
 *
 * route.app                   koa app initialized in "app-init.js"
 * route.tls                   tls options initialized in "app-init.js"
 * route.tls.extend(svrOpts)   extends `route.tls`, return extended object
 */

require('spdy').createServer(
    route.tls.extend({ /* spdy option */ }),
    route.app.callback()
).listen(conf.httpsPort || 443)



/* uncomment following lines to redirect HTTP to HTTPS */
require('koa')()
.use( require('koa-lusca').xframe("SAMEORIGIN") )
.use( require('koa-force-ssl')(conf.httpsPort || 443) )
.listen(conf.httpPort || 80)
