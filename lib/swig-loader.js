'use strict'

require('date-format-lite')
const swig = require('swig')
const conf = require('../conf-loader')
const join = require('path').join

swig.setDefaults({
    loader: swig.loaders.fs(join(conf.root, 'page')),
    cache:  !conf.dev && conf.cache,
    locals: {
        includeAnalyticsCode: !conf.dev
    }
})

swig.setFilter('date', (input)=>new Date(input).format('YYYY-MM-DD'))
swig.setFilter('ISOString', (input)=>new Date(input).toISOString())

swig.coRenderFile = function(pathname, locals) {
    return (cb)=>swig.renderFile(pathname, locals||{}, cb)
}

module.exports = swig
