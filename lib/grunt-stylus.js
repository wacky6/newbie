'use strict'

const {
      config
    , file: {write, expand}
    , fatal
    , log:  {writeln: writeLog}
} = require('grunt')
const {basename, join} = require('path')
const {readFile} = require('co-fs')
const {yellow} = require('chalk')
const co = require('co')
    , stylus = require('stylus')
    , autoprefixer = require('autoprefixer')

const re_dest_directive = /\/\* dest: (.+) \*\//i
const postcss = require('postcss')([autoprefixer({browsers: '> 5%, last 2 versions'})])

module.exports = function() {
    let done = this.async()

    let {outputDir, files, includes} = config.get('stylus')

    if (!outputDir) return fatal('outputDir not set')

    let src = config.get('stylus.src')
    let srcs = src ? [src] : expand(files)

    co(function*(){
        let contents = yield srcs.map( file => readFile(file, 'utf8') )
        let dests    = contents.map( content => re_dest_directive.exec(content) )
                               .map( m => m ? join(outputDir, m[1]) : null )
        dests.forEach( (dest, idx)=> {
            writeLog(`stylus: ${basename(srcs[idx])} => ${dest ? dest : yellow('ignored')}`)
        } )

        let cssSrcs  = yield contents.map(
            (content, idx) =>
                (cbk) => stylus(content)
                         .set('filename', basename(srcs[idx]))
                         .set('paths',    includes)
                         .render(cbk)
        )

        let results  = yield cssSrcs.map( css=>postcss.process(css) )

        results.forEach( (result, idx)=> {
            if (dests[idx])
                write(dests[idx], result.css)
        } )

    }).then( ()=>{
        done()
    }).catch( (err)=>{
        writeLog(yellow(err.message))
        done()
    })

}
