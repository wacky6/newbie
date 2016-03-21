'use strict'

const grunt = require('grunt')
    , co = require('co')
    , stylus = require('stylus')
    , autoprefixer = require('autoprefixer')
    , basename = require('path').basename
    , join = require('path').join
    , readFile = require('co-fs').readFile
    , yellow = require('chalk').yellow

const re_dest_directive = /\/\* dest: (.+) \*\//i
const postcss = require('postcss')([autoprefixer({browsers: '> 5%, last 2 versions'})])

// TODO: refactor with object-manipulate

module.exports = function() {
    let done = this.async()

    let opts = grunt.config.get('stylus')

    if (!opts.outputDir) return grunt.fatal('outputDir not set')

    let srcMode = grunt.config.get('stylus.src')
    let src = srcMode ? [srcMode] : grunt.file.expand(opts.files)

    co(function*(){
        let dests = {}
          , readFileThunks = {}

        src.forEach( (file)=>readFileThunks[file]=readFile(file, 'utf-8') )

        let contents = yield readFileThunks
        // solve destinations
        for (let file in contents) {
            let m = re_dest_directive.exec(contents[file])
            if (!m) {
                grunt.log.writeln(yellow('warn: ')+`${basename(file)}: dest directive not found`)
                delete contents[file]
            }else{
                dests[file] = join(opts.outputDir, m[1])
            }
        }

        grunt.log.writeln('stylus: '+JSON.stringify(dests, null, '    '))

        // create stylus render thunks
        let compileThunks = {}
        for (let file in contents)
            compileThunks[file] = (cbk)=>stylus(contents[file])
                                        .set('filename', basename(file))
                                        .set('paths',    opts.includes)
                                        .render(cbk)

        let compiled = yield compileThunks
        // console.log(compiled)

        // create postcss thunks
        let postcssThunks = {}
        for (let file in compiled)
            postcssThunks[file] = postcss.process(compiled[file])


        let postcssResults = yield postcssThunks
        // write to destination file
        for (let file in postcssResults)
            grunt.file.write(dests[file], postcssResults[file].css)

    }).then( ()=>{
        done()
    }).catch( (err)=>{
        grunt.warn('grunt-stylus: '+err.stack)
    })

}
