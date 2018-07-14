'use strict'

require('date-format-lite')
const swig = require('swig')
const {join, resolve} = require('path')
const root = resolve(__dirname, '..')

swig.setDefaults({
    loader: swig.loaders.fs(join(root, 'page')),
    cache:  false
})

swig.setFilter('date', (input)=>new Date(input).format('YYYY-MM-DD'))
swig.setFilter('ISOString', (input)=>new Date(input).toISOString())

swig.coRenderFile = function(pathname, locals) {
    return (cb)=>swig.renderFile(pathname, locals||{}, cb)
}

module.exports = swig
