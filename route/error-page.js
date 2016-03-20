'use strict'

/*jshint -W040 */   // supress warning: possible strict violation

const winston = require('winston')
    , conf = require('../conf-loader')
    , swig = require('../lib/swig-loader')

function getErrorPage(code) {
    return 'error/'+code+'.tmpl'
}

function* routeError(next) {
    let params = {   // additional arguments passed to template
        url: this.url,
    }

    try{
        yield next
    }catch(e) {
        winston.warn('Router throws an Error: ', e.message)
        this.status = 500
        params.message = e.message
        if (this.query.debug)
            params.stack = e.stack
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

    if (this.accepts('html') && !this.query.debug) {
        try {
            this.response.body = yield swig.coRenderFile( getErrorPage(this.status), params )
        }catch(e){
            this.response.body = yield swig.coRenderFile( getErrorPage(500), params )
        }
    }else{
        this.response.body = Object.assign({error: this.response.status}, params)
    }

}

module.exports = routeError
