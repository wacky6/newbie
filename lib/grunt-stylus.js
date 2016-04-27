'use strict'

const {
      config
    , file: {write, expand}
    , fatal
    , warn
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

// TODO: refactor with object-manipulate

module.exports = function() {
    let done = this.async()

    let {outputDir, files, includes} = config.get('stylus')

    if (!outputDir) return fatal('outputDir not set')

    let src = config.get('stylus.src')
    let srcs = src ? [src] : expand(files)

    co(function*(){
        let dests = {}
          , readFileThunks = {}

        srcs.forEach( (file)=>readFileThunks[file]=readFile(file, 'utf-8') )

        let contents = yield readFileThunks
        // solve destinations
        for (let file in contents) {
            let m = re_dest_directive.exec(contents[file])
            if (!m) {
                writeLog(yellow('warn: ')+`${basename(file)}: dest directive not found`)
                delete contents[file]
            }else{
                dests[file] = join(outputDir, m[1])
            }
        }

        writeLog('stylus: '+JSON.stringify(dests, null, '    '))

        // create stylus render thunks
        let compileThunks = {}
        for (let file in contents)
            compileThunks[file] = (cbk)=>stylus(contents[file])
                                        .set('filename', basename(file))
                                        .set('paths',    includes)
                                        .render(cbk)

        let compiled = yield compileThunks

        // create postcss thunks
        let postcssThunks = {}
        for (let file in compiled)
            postcssThunks[file] = postcss.process(compiled[file])

        let postcssResults = yield postcssThunks
        // write to destination file
        for (let file in postcssResults)
            write(dests[file], postcssResults[file].css)

    }).then( ()=>{
        done()
    }).catch( (err)=>{
        warn('grunt-stylus: '+err.stack)
    })

}
