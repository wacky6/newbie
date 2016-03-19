'use strict'

const swig = require('swig')
const conf = require('./conf-loader')

swig.setDefaults({
    loader: swig.loaders.fs(__dirname+'/view'),
    cache:  !conf.dev&&conf.cache,
    locals: {
        google_analytics: !conf.dev
    }
})

swig.coRenderFile = function(pathname, locals) {
    return (cb)=>swig.renderFile(pathname, locals||{}, cb)
}

module.exports = swig
