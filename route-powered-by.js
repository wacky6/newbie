'use strict'

let readFileSync = require('fs').readFileSync

function poweredBy(override) {
    try{
        let pkg = JSON.parse(readFileSync(__dirname+'/package.json'))
        let poweredByStr = override || `${pkg.name}/${pkg.version}`
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
