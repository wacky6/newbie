'use strict'

const join = require('path').join
    , conf = require('./conf-loader')
    , koa  = require('./koa-route-sugar')( require('koa') )
    , spdy = require('spdy')
    , helmet = require('koa-helmet')

/*
 * app.route( name || function* || function, ...args )
 *   name: base on type
 *     string:    => app.route( require(name), ...args )
 *     generator: => app.use( name )
 *     function:  => app.use( name(...opts) )
 *     undefined: => ignored
 *   args:
 *     arguments passed to constructor, if name is function
 *
 *   returns app
 */

let app = koa()
    .route( helmet.xssFilter() )
    .route( helmet.frameguard('deny') )
    .route( helmet.hsts({ force: true, maxAge: conf.stsAge }) )
    .route( helmet.noSniff() )
    .route( conf.pkp ? helmet.hpkp(conf.pkp) : undefined )
    .route( 'koa-compress' )
    .route( './route/powered-by' )
    .route( './route/error-page' )
    .route( './route/rewrite', /^\/(About|Blog)\//, (path)=>path.toLowerCase(), 'Canonicalization' )
    .route( 'koa-static', join(conf.root, 'build'), {maxage: conf.maxAge} )

/* Server creation */
conf.addSecureContext(
    spdy.createServer(
        Object.assign(conf.tls, {}),
        app.callback()
    )
).listen(conf.httpsPort || 443)
