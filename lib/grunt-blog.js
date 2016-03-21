'use strict'

const grunt = require('grunt')
const read  = grunt.file.read
const write = grunt.file.write
const exists = grunt.file.exists
const config = grunt.config.get
const readJSON = grunt.file.readJSON

const join     = require('path').join
const resolve  = require('path').resolve
const basename = require('path').basename
const dirname  = require('path').dirname

const swig = require('./swig-loader')
const flavorMd = require('flavor-marked').process
const marked = require('marked')

const updateFile    = require('./updateFile')
const strip         = require('./blog/stripBloglist')
const metaParse     = require('./blog/meta-parse')
const articleSort   = require('./blog/articleSort')
const processBubble = require('./blog/bubble-proc')

const chalk  = require('chalk')
const red    = chalk.red
const blue   = chalk.blue
const green  = chalk.green
const yellow = chalk.yellow

const INFO = (str) => grunt.log.writeln(''+green('info')+': '+str)
const WARN = (str) => grunt.log.writeln(''+yellow('warn')+': '+str)

const rootDir = require('../conf-loader').root

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
    let updateIndex = !exists(bloglist) || read(bloglist)!==strBlogList || config('blog').src===null
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

    let dest = join(outputDir, meta.name, 'index.html')
    let entry = Object.assign({}, meta, {
        src:  file,
        dest: dest,
        html: html,
        bubbles: bubbles
    })

    write(dest, swig.renderFile(resolve(rootDir, articleTemplate), entry))

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
                           .map( _ => {
                               _.briefHTML = marked(_.brief)
                               return _
                           } )

    write(
        join(outputDir, 'index.html'),
        swig.renderFile(resolve(rootDir, indexTemplate), {
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
        'outputDir', 'articleTemplate', 'indexTemplate'
    )
    outputDir       = opts.outputDir
    articleTemplate = opts.articleTemplate
    indexTemplate   = opts.indexTemplate
    bloglist        = join(outputDir, 'list.json')
    files           = grunt.file.expand(opts.src || opts.files)
    return opts
}
