'use strict'

require('date-format-lite')
const grunt = require('grunt')
const read  = grunt.file.read
const write = grunt.file.write
const exists = grunt.file.exists
const config = grunt.config.get
const readJSON = grunt.file.readJSON

const join     = require('path').join
const basename = require('path').basename
const extname  = require('path').extname
const dirname  = require('path').dirname

const swig = require('./swig-loader')
const flavorMd = require('flavor-marked').process

const updateFile    = require('./lib/updateFile')
const strip         = require('./lib/blog/stripBloglist')
const metaParse     = require('./lib/blog/meta-parse')
const articleSort   = require('./lib/blog/articleSort')
const processBubble = require('./lib/blog/bubble-proc')

const chalk  = require('chalk')
const red    = chalk.red
const blue   = chalk.blue
const green  = chalk.green
const yellow = chalk.yellow

const INFO = (str) => grunt.log.writeln(''+green('info')+': '+str)
const WARN = (str) => grunt.log.writeln(''+yellow('warn')+': '+str)

let outputDir, articleTemplate, indexTemplate, bloglist, files

module.exports = function blog(){
    loadConfig()

    let blogList = exists(bloglist) ? readJSON(bloglist) : []

    files.forEach( (path) => {
        let entry = processArticle(path)
        let index = blogList.findIndex( indexed => indexed.name===entry.name )
        if (index===-1) blogList.push(entry)
        else            blogList[index]=entry
    })

    // update bloglist, blog-index, if necessary
    let strBlogList = JSON.stringify(strip(blogList), null, '  ')
    let updateIndex = !exists(bloglist) || read(bloglist)!==strBlogList
    if (updateIndex) {
        write(bloglist, strBlogList)
        renderIndex(blogList)
    }
}

/* file: path to markdown
 * return: on success, blogEntry Object
 *         on failure, null
 */
function processArticle(file) {
    let content = read(file)
    let _ = flavorMd(content)
    let html    = _.html,
        bubbles = _.bubbles.map(processBubble),
        meta    = metaParse(_.meta, file, _.html)

    let dest = outputDir + meta.name + '/index.html'
    let entry = Object.assign({}, meta, {
        src:  file,
        dest: dest,
        html: html,
        bubbles: bubbles
    })

    write(dest, swig.renderFile(articleTemplate, entry))

    // process linked resources, print errors
    entry.resources.map( $ => ({
            rcFile: basename($.path),
            result: updateFile(join(dirname(dest), $.path), join(dirname(file), $.path))
        })
    ).filter( $ => $.result===undefined )
     .forEach( rcFile => WARN(basename(file)+': '+blue('resource')+': '+red('NOENT')+' '+rcFile ) )

    return entry
}

function renderIndex(blogList) {
    let articles = blogList.filter( _ => _.index )
                           .sort( articleSort )
                           .map( _ => {    // add date strings
                               _.ctimeStr = new Date(_.ctime).format('YYYY-MM-DD')
                               _.mtimeStr = new Date(_.mtime).format('YYYY-MM-DD')
                               return _
                           } )

    write(
        outputDir+'index.html',
        swig.renderFile(indexTemplate, {
            articles: articles
        })
    )

    INFO(green('indexed '+articles.length+' posts'))
}

function checkConfig(opts, args) {
    for (let i=1; i!==arguments.length; ++i)
        if ( !opts[arguments[i]] )
            grunt.fatal(`${arguments[i]} not set`)
    return opts
}

function loadConfig() {
    const opts = checkConfig(
        config('blog'),
        'outputDir', 'articleTemplate', 'indexTemplate', 'bloglist'
    )
    outputDir       = opts.outputDir
    articleTemplate = opts.articleTemplate
    indexTemplate   = opts.indexTemplate
    bloglist        = opts.bloglist
    files           = grunt.file.expand(opts.src || opts.files)
    return opts
}
