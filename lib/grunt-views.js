'use strict'

const grunt = require('grunt')
const swig  = require('./swig-loader')
const resolve = require('path').resolve
const rootDir = require('../conf-loader').root

const re_dest_directive = /\{# dest: (.+) #\}/i

module.exports = function() {
    let opts = grunt.config.get('views')
    let outputDir = opts.outputDir

    if (!outputDir) return grunt.fatal('outputDir not set')

    let srcMode = grunt.config.get('views.src')
    let src = srcMode ? [srcMode] : grunt.file.expand(opts.files)

    src.forEach( file => {
        let content = grunt.file.read(file)
        let m = re_dest_directive.exec(content)
        if (!m) return
        let dest = outputDir+m[1]
        grunt.log.writeln(`render page: ${file} => ${m[1]}`)
        grunt.file.write(dest, swig.renderFile(resolve(rootDir, file)))
    })
}
