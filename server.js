"use strict"

var join     = require("path").join
var conf     = require("./conf")
var route    = require("./app-init")

/* koa Router Tables:
 *
 * route( name || function*, option... )
 *   name:     name of module, pass to require()
 *   function: koa Router Constructor:         opts => function*(){}
 *             koa Router GeneratorFunction:   function*(){}
 *             undefined, null:                [ no router is added, sugar for `if(...) route()` ]
 *
 * Security Policy / HSTS / XFrame configuration in "app-init.js"
 *
 * Useful Routers:
 *   koa-sub-domain:   domain based router
 *   koa-ip:           ip filter
 *   koa-compressor:   spdy/h2 compression
 */

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



/* uncomment following lines to redirect HTTP to HTTPS
 * don't enable it unless you are sure you need it
 */

// require('koa')()
// .use( require('koa-force-ssl')(conf.httpsPort || 443) )
// .use( require('koa-lusca').xframe("SAMEORIGIN") )
// .listen(conf.httpPort || 80)
