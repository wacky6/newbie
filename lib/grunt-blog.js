'use strict'

const {
      config
    , fatal
    , file: {read, readJSON, write, exists, expand}
    , log:  {writeln: writeLog}
} = require('grunt')
const {join, resolve, basename, dirname} = require('path')
const {red, blue, green, yellow} = require('chalk')
const swig     = require('./swig-loader')
const marked   = require('marked')
const flavorMd = require('flavor-marked').process
const updateFile    = require('./updateFile')
const strip         = require('./blog/stripBloglist')
const metaParse     = require('./blog/meta-parse')
const articleSort   = require('./blog/articleSort')
const processBubble = require('./blog/bubble-proc')

const rootDir = resolve(__dirname, '..')
const {outputDir, articleTemplate, indexTemplate, bloglist, files, src} = loadConfig()

const INFO = (str) => writeLog(''+green('info')+': '+str)
    , WARN = (str) => writeLog(''+yellow('warn')+': '+str)

module.exports = function blog(){

    let blogList = exists(bloglist) ? readJSON(bloglist) : []

    files.forEach( (path) => {
        let entry = processArticle(path)
        let index = blogList.findIndex( indexed => indexed.name===entry.name )
        if (index===-1) blogList.push(entry)
        else            blogList[index]=entry
    })

    // update bloglist, blog-index, if necessary
    let strBlogList = JSON.stringify(strip(blogList), null, '  ')
    let updateIndex = !exists(bloglist) || read(bloglist)!==strBlogList || src===null
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
    let {html, bubbles, meta} = flavorMd( read(file) )

    bubbles = bubbles.map( processBubble )
    meta    = metaParse(meta, file, html)

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
    }) )
    .filter( $ => $.result===undefined )
    .forEach( $ => WARN(basename(file)+': '+blue('resource')+': '+red('NOENT')+' '+$.rcFile ) )

    return entry
}

function renderIndex(blogList) {
    let articles = blogList.filter( $ => $.index )
                           .sort( articleSort )
                           .map( $ => {
                               $.briefHTML = marked($.brief)
                               return $
                           } )

    write(
        join(outputDir, 'index.html'),
        swig.renderFile(resolve(rootDir, indexTemplate), {
            articles: articles
        })
    )

    INFO(green('indexed '+articles.length+' posts'))
}

function loadConfig() {
    const opts = config.get('blog')
    for (let prop of ['outputDir', 'articleTemplate', 'indexTemplate'])
        if (!opts[prop])
            fatal(`${prop} not set`)

    opts.bloglist = join(opts.outputDir, 'list.json')
    opts.files    = expand(opts.src || opts.files)

    return opts
}
