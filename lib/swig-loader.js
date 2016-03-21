'use strict'

const swig = require('swig')
const conf = require('../conf-loader')
const join = require('path').join

swig.setDefaults({
    loader: swig.loaders.fs(join(conf.root, 'page')),
    cache:  !conf.dev&&conf.cache,
    locals: {
        analytics: !conf.dev
    }
})

swig.coRenderFile = function(pathname, locals) {
    return (cb)=>swig.renderFile(pathname, locals||{}, cb)
}

module.exports = swig
