'use strict'

const pipes = require('pipe-through')
const {basename} = require('path')
const {yellow, red, green} = require('chalk')
const {log: {writeln: writeLog}} = require('grunt')

function metaParse(meta, filePath, html) {
    const hint = filePath ? basename(filePath)+': ' : ''
    const ctx = {
        error:     (str) => writeLog(red('error: ')+hint+str),
        warn:      (str) => writeLog(yellow('warn: ')+hint+str),
        canonical: (str) => writeLog(yellow('cano: ')+hint+str),
        info:      (str) => writeLog(green('info: ')+hint+str),
        html:      html,
        path:      filePath
    }
    const procs = [
        'keywords',     // parse keywords
        'tags',         // parse tags
        'title',        // infer title if not set
        'mtime',        // infer mtime
        'ctime',        // infer ctime
        'name',         // url path name
        'description',  // <meta> description
        'brief',        // blog index's brief
        'directives',   // directives (index, robots, featured)
        'complaints',   // complain about common mistakes
        'linked-rc',    // linked img, link-stylesheet, srcipt-src
    ].map( name => require('./metas/'+name) )

    return pipes(meta, procs, ctx)
}


module.exports = metaParse
