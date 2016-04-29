'use strict'

const isGenerator = require('is-generator-function')

module.exports = function(koa) {
    /*
     * route: app.use sugar
     *   name: depends on type
     *      string:    => this.mount( require(name), opts )
     *      generator: => this.use( name )
     *      function:  => this.use( name(...opts) )
     *                    if name(...opts) returns undefined, skip
     *      undefined  => skip
     *  opts: constructor arguments
     */

    koa.prototype.route = function(name, ...opts) {
        if (typeof name === 'string')
            return this.route( require(name), ...opts )
        if (isGenerator(name))
            return this.use( name )
        if (typeof name === 'function')
            return this.use( name(...opts) )
        if (typeof name === 'undefined')
            return this
        throw new Error('Router mount argument not supported, get: '+typeof name)
    }
    return koa
}
