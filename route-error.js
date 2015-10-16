'use strict'

/*jshint -W040 */   // supress warning: possible strict violation

var join = require("path").join

function* routeError(next) {

	try{
		yield next
	}catch(e) {
		console.log(e)
	}

	if (this.status>=200 && this.status<300) return
	if (!this.status) this.status=500

    switch(this.accepts('html','json')) {
        case 'html':
        	try{
            	yield this.renderErrorPage( ''+this.status )
            }catch(e){
            	console.log(`Error page: ${this.status} not provided`)
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
        ext:   "swig",
        locals: {}
    })
	return routeError
}
