'use strict'

const {readFileSync} = require('fs')
    , {version} = require('process').version
    , {join} = require('path')
    , {root} = require('../conf-loader')

function poweredBy(override) {
    try{
        let pkg = JSON.parse( readFileSync( join(root, 'package.json') ) )
        let poweredByStr = override || `${pkg.name}/${pkg.version}@${nodeVersion}`
        return function*(next){
            this.set('X-Powered-By', poweredByStr)
            yield next
        }
    }catch(e){
        return function*(next){
            yield next
        }
    }
}

module.exports = poweredBy
