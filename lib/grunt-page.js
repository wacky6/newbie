'use strict'

const grunt = require('grunt')
const swig  = require('./swig-loader')
const resolve = require('path').resolve
const rootDir = require('../conf-loader').root
const join = require('path').join

const re_dest_directive = /\{# dest: (.+) #\}/i

module.exports = function() {
    let opts = grunt.config.get('page')
    let outputDir = opts.outputDir

    if (!outputDir) return grunt.fatal('outputDir not set')

    let srcMode = grunt.config.get('page.src')
    let src = srcMode ? [srcMode] : grunt.file.expand(opts.files)

    src.forEach( file => {
        let content = grunt.file.read(file)
        let m = re_dest_directive.exec(content)
        if (!m) return
        let dest = join(outputDir, m[1])
        grunt.log.writeln(`render: ${file} => ${m[1]}`)
        grunt.file.write(dest, swig.renderFile(resolve(rootDir, file)))
    })
}
