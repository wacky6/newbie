"use strict";

var koa      = require("koa");
var kswig    = require("koa-swig");
var join     = require("path").join;
var serve    = require("koa-static");
var compress = require("koa-compress");

var app = koa();
app.context.render = kswig({
    root: join(__dirname, "view"),
    autoescape: true,
    cache: false,
    ext:   "swig",
    locals: {}
});

app.use(compress());
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
app.use(function *error500)(next){
    try {
        yield next;
    }catch (err) {
        this.status = err.status || 500;
        this.render('500');
    }
});

app.use(function *(next){
    if (this.path=='/')
        yield this.render('index');
    else
        yield next;
});

app.use(serve(join(__dirname, "www")));

app.listen(1300);
