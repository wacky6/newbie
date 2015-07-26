"use strict";

var koa      = require("koa");
var kswig    = require("koa-swig");
var join     = require("path").join;
var serve    = require("koa-static");
var compress = require("koa-compress");
var conf     = require("./conf.js");
var blog     = require("./blog")

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
});

app.use(serve(join(__dirname, "www"), {maxage: conf.cache?10*60*1000:0}));

app.use(function *(next){
    const pathPrefix = '/blog/'
    if (this.path.indexOf(pathPrefix)==0) {
        this.path = this.path.substr(pathPrefix.length-1)
        yield blog
    }else{
        yield next
    }
})

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


app.listen(conf.port);
