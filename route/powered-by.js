'use strict'

const {readFileSync} = require('fs')
    , {join} = require('path')
    , {root} = require('../conf-loader')

const nodeVersion = require('process').version

function poweredBy(override) {
    try{
        let {name, version} = JSON.parse( readFileSync( join(root, 'package.json') ) )
        let poweredByStr = override || `${name}/${version}@${nodeVersion}`
        return function*(next){
            this.set('X-Powered-By', poweredByStr)
            yield next
        }
    }catch(e){
        return undefined
    }
}

module.exports = poweredBy
