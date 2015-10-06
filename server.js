"use strict";

var koa      = require("koa")
var kswig    = require("koa-swig")
var join     = require("path").join
var serve    = require("koa-static")
var compress = require("koa-compress")
var lusca    = require("koa-lusca")
var forceSSL = require("koa-force-ssl")
var conf     = require("./conf.js")

/* for HTTP2, sslKey, sslCrt are mandatory
 * throw a Error if these fields are not set
 */
if (!conf.sslKey || !conf.sslCrt) {
    throw new Error('SSL Certificate & Key are required for HTTP2')
    process.exit(2)
}

var app = koa();
app.context.render = kswig({
    root: join(__dirname, "view"),
    autoescape: true,
    cache: false,
    ext:   "swig",
    locals: {}
})

if (conf.enforceSecurity) {
    app.use(forceSSL())
    app.use(lusca({
        csrf: false,
        csp:  false,
        xframe: 'SAMEORIGIN',
        hsts: {maxAge: 24*60*60*30, includeSubDomains: false},
        xssProtection: false
    }))
}

app.use(compress());
app.use(function *errorHandling(next){
    try {
        yield next
    }catch (err) {
        console.log(err)
        var pageId = '500'
        switch(err.code) {
            case 'ENOENT':
                pageId = '404'
                break
            default:
                pageId = '500'
        }
        this.status = err.status || parseInt(pageId)
        switch(this.accepts('html','json')) {
            case 'html':
                yield this.render(pageId)
                break
            case 'json':
                yield this.json({error: parseInt(pageId)})
                break
            default:
                this.body = `error ${pageId}`
        }
    }
})
app.use(function *error404(next){
    yield next
    if (this.status && this.status!=404) return
    var e = new Error('Entity not found')
    e.code = 'ENOENT'
    throw e
})

app.use(serve(join(__dirname, "www"), {maxage: conf.cache?24*60*60*1000:0}))

app.use(function *(next){
    switch (this.path) {
        case '/':
        case '/index.html':
            yield this.render('index')
            break
        case '/about/':
            yield this.render('about')
        default:
            yield next;
    }
})


var fs = require('fs')
var opts = {
    key:  fs.readFileSync(conf.sslKey),
    cert: fs.readFileSync(conf.sslCrt),
    ca:   conf.sslCA ? fs.readFileSync(conf.sslCA) : undefined
}
require('spdy').createServer(opts, app.callback()).listen(conf.httpsPort || 443)

// server hi-future for plain text HTTP 1 requests
//var appHttp1 = new koa()
//appHttp1.use(serve(join(__dirname, 'www-hi-future'), {maxage: conf.cache?10*60*1000:0}))
//require('http').createServer(appHttp1.callback()).listen(conf.httpPort || 80)
