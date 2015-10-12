'use strict'

function* routeMainPage(next){

    switch (this.path) {
        case '/':
        case '/index.html':
            yield this.render('index')
            break
        case '/about/':
            yield this.render('about')
            break
        case '/500':
            this.status = 500
            this.throw('URL Triggered Internal Error 500')
            break
        case '/502':
            this.status = 502
            this.throw('URL Triggered Internal Error 502')
            break
        default:
            yield next
    }

}

module.exports = function(){
    var join  = require("path").join
    var kswig = require("koa-swig")

    this.context.render = kswig({
        root: join(__dirname, "view"),
        autoescape: true,
        cache: false,
        ext:   "swig",
        locals: {}
    })

	return routeMainPage
}