'use strict'

const {
      config
    , fatal
    , file: {expand, read, write}
    , log:  {writeln: writeLog}
} = require('grunt')
const {resolve, join} = require('path')
const swig  = require('./swig-loader')

const rootDir = resolve(__dirname, '..')

const re_dest_directive = /\{# dest: (.+) #\}/i

module.exports = function() {
    let {files, outputDir, src} = config.get('page')
    let srcs = src ? [src] : expand(files)

    if (!outputDir) return fatal('outputDir not set')

    srcs.forEach( file => {
        let content = read(file)
        let m = re_dest_directive.exec(content)
        if (!m) return
        let dest = join(outputDir, m[1])
        writeLog(`render: ${file} => ${m[1]}`)
        write(dest, swig.renderFile(resolve(rootDir, file)))
    })
}
