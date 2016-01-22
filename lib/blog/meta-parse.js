'use strict'

const grunt = require('grunt')
const chalk = require('chalk')
const pipes = require('pipe-through')
const basename = require('path').basename
const yellow = chalk.yellow
const red    = chalk.red
const green  = chalk.green

const logLine = (s) => grunt.log.writeln(s)

function metaParse(meta, filePath, html) {
    const hint = filePath ? basename(filePath)+': ' : ''
    const ctx = {
        error:     (str) => logLine(red('error: ')+hint+str),
        warn:      (str) => logLine(yellow('warn: ')+hint+str),
        canonical: (str) => logLine(yellow('cano: ')+hint+str),
        info:      (str) => logLine(green('info: ')+hint+str),
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
