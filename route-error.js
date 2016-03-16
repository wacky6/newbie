'use strict'

/*jshint -W040 */   // supress warning: possible strict violation

var join = require('path').join
var winston = require('winston')

function* routeError(next) {

    try{
        yield next
    }catch(e) {
        winston.warn('Router throws an Error: ', e.message)
        this.status = 500
    }

    if (this.status>=200 && this.status<400) return
    if (!this.status) this.status=404
    this.response.status = this.status

    winston.warn('HTTP Error '+this.status+': ', {
        url:     this.url,
        remote:  this.req.socket.remoteAddress,
        ua:      this.headers['user-agent'],
        time:    (new Date()).toISOString(),
    })

    switch(this.accepts('html','json')) {
        case 'html':
            try{
                yield this.renderErrorPage( ''+this.status )
            }catch(e){
                winston.warn(`Error page: ${this.status} not provided`)
                yield this.renderErrorPage('500')
            }
            break
        case 'json':
            yield this.json( {error: this.status} )
            break
        default:
            this.body = `error ${this.status}`
    }

}

module.exports = function(){
    var kswig = require("koa-swig")
    this.context.renderErrorPage = kswig({
        root: join(__dirname, "view/error"),
        autoescape: true,
        cache: false,
        ext:   "tmpl",
        locals: {}
    })
    return routeError
}
