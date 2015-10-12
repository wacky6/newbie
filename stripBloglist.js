'use strict'

var grunt = require('grunt')
var swig  = require('swig')
var basename = require('path').basename
var dirname  = require('path').dirname
var statSync = require('fs').statSync
var chalk    = require('chalk')

function exposeProperty(obj, props) {
    let ret = {}
    for (let i=1; i!=arguments.length; ++i)
        ret[arguments[i]] = obj[arguments[i]]
    return ret
}

module.exports = function(bloglist){
    return bloglist
        .filter( _ => !_.noindex )
        .map( _ => exposeProperty(_, 'title', 'date', 'description', 'keywords', 'featured', 'brief', 'name') )
}
