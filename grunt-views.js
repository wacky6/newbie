'use strict'

var grunt = require('grunt')
var swig  = require('swig')

var regexStaticDirective = /\{# static, (.+) #\}/i

module.exports = function() {
    var opts = grunt.config.get('views')
    var outputDir = opts.outputDir

    if (!outputDir) return grunt.fatal('outputDir not set')

    var srcMode = grunt.config.get('views.src')
    var src = srcMode ? [srcMode] : grunt.file.expand(opts.files)

    src.forEach( file => {
        var content = grunt.file.read(file)
        var m = regexStaticDirective.exec(content)
        if (!m) return
        var dest = outputDir+m[1]
        grunt.log.writeln(`render static: ${file} => ${m[1]}`)
        var html = swig.renderFile(file)
        grunt.file.write(dest, html)
    })
}
