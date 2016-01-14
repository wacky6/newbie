'use strict'

const swig = require('swig')
const conf = require('./conf-loader')

swig.setDefaults({
    cache:  conf.dev ? false : undefined,
    locals: {
        google_analytics: !conf.dev
    }
})

module.exports = swig
