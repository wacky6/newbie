"use strict";

var koa      = require("koa")
var kswig    = require("koa-swig")
var join     = require("path").join
var serve    = require("koa-static")
var compress = require("koa-compress")
var conf     = require("./conf.js")

var app = koa();
app.context.render = kswig({
    root: join(__dirname, "view"),
    autoescape: true,
    cache: false,
    ext:   "swig",
    locals: {}
});

app.use(compress());
app.use(function *error500(next){
    try {
        yield next;
    }catch (err) {
        console.log(err);
        this.status = err.status || 500;
        yield this.render('500');
    }
});
app.use(function *error404(next){
    yield next;
    if (this.status!=404) return;
    this.status=404;
    switch(this.accepts('html', 'json')) {
        case 'html':
            yield this.render('404');
            break;
        case 'json':
            this.body = {error: 404};
            break;
        default:
            this.body = "error 404";
    }
});

app.use(serve(join(__dirname, "www"), {maxage: conf.cache?10*60*1000:0}));

app.use(function *(next){
    switch (this.path) {
        case '/': 
        case '/index.html':
            yield this.render('index');
            break;
        case '/about/':
            yield this.render('about');
            break;
        case '/play-healthy/':
            yield this.render('play-healthy');
        default:
            yield next;
    }
});


require('http').createServer(app.callback()).listen(conf.httpPort || 80)
if (conf.sslKey && conf.sslCrt) {
    var fs = require('fs')
    var opts = {
        key:  fs.readFileSync(conf.sslKey),
        cert: fs.readFileSync(conf.sslCrt)
    }
    require('https').createServer(opts, app.callback()).listen(conf.httpsPort || 443)
}

app.listen(conf.port);
