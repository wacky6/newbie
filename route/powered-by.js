'use strict'

const readFileSync = require('fs').readFileSync
    , nodeVersion  = require('process').version
    , join = require('path').join
    , conf = require('../conf-loader')

function poweredBy(override) {
    try{
        let pkg = JSON.parse(readFileSync(join(conf.root, 'package.json')))
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
