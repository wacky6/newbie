'use strict'

var grunt    = require('grunt')
var basename = require('path').basename
var extname  = require('path').extname
var dirname  = require('path').dirname
var bfm      = require('bfm')
var swig     = require('swig')
var co       = require('co')
var chalk    = require('chalk')
var statSync = require('fs').statSync
var strip    = require('./stripBloglist')
var articleSort = require('./articleSort')

var linkedResourceRegex = /(?:href|src)=".\/(.+?)"|'.\/(.+?)'/g
var h1Regex = /<h1(?:(?:\s+\w+(?:\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)>(.+?)<\/h1>/

var opts, outputDir, articleTemplate, indexTemplate, bloglist, srcMode, fileSrc;
var blogList = []

module.exports = function blog(){
    // load configuration
    opts = grunt.config.get('blog')
    checkConfig(opts, 'outputDir', 'articleTemplate', 'indexTemplate', 'bloglist')
    outputDir = opts.outputDir
    bloglist  = opts.bloglist
    articleTemplate = opts.articleTemplate
    indexTemplate   = opts.indexTemplate

    srcMode = grunt.config.get('blog.src')
    if ( srcMode && !grunt.file.exists(bloglist) ) {
        grunt.log.writeln(chalk.yellow('bloglist does not exist, perform full generation!'))
        srcMode = false
    }

    fileSrc  = srcMode ? [srcMode] : grunt.file.expand(opts.files)
    blogList = srcMode ? grunt.file.readJSON(bloglist)  : []

    var src = fileSrc.filter( (path) => {
        if (grunt.file.exists(path)) return true
        grunt.log.writeln(chalk.yellow(`markdown not found: ${path}`))
        return false
    })

    // render blogpost, copy linked resources
    src.forEach( file => {
        grunt.log.writeln(`process:  ${file}`)

        var entry = renderArticle(file)
        if (entry===null) return

        copyLinkedResource(entry)

        var index = blogList.findIndex( entry => entry.name===stripFilename(file) )
        if (index!==-1) blogList[index] = entry
        else            blogList.push(entry)
    })

    grunt.log.writeln('')

    // update bloglist if needed
    var stringified = JSON.stringify(strip(blogList), null, '  ')
    var writeBloglist = grunt.file.exists(bloglist) ? grunt.file.read(bloglist)!==stringified : true;
    if (writeBloglist) {
        grunt.file.write(bloglist, stringified)
        grunt.log.writeln(chalk.green('bloglist updated: '+bloglist))
    }else{
        grunt.log.writeln(chalk.green('bloglist skipped: trivial change'))
    }

    if (!srcMode || writeBloglist) renderIndex(bloglist)
}

/* file: path to markdown
 * return: on success, blogEntry Object
 *         on failure, null
 */
function renderArticle(file) {
    var dest    = outputDir + stripFilename(file) + '/index.html'
    var content = grunt.file.read(file)
    var _ = bfm(content)
    if (!_) {  // TODO:: change bfm to synchroized call, and throw on error
        grunt.log.writeln(chalk.red('  fail!'))
        return null
    }

    var title = _.meta.title || (h1Regex.exec(_.html) || ['',''])[1]
    var mtime = getMTime(file)

    var entry = {
        src:         file,
        dest:        dest,
        title:       title,
        name:        stripFilename(file),
        mtime:       mtime.getTime(),
        resources:   getLinkedResources(_.html),
        date:        new Date(_.meta.date || mtime).getTime(),
        article:     _.html,
        author:      _.meta.author,
        keywords:    _.meta.keywords || [],
        description: _.meta.description || '',
        featured:    _.meta.featued,
        noindex:     _.meta.noindex,
        top:         _.meta.top,
        brief:       _.meta.brief || _.meta.description || title,
        dateStr:     grunt.template.date(_.date, 'yyyy-mm-dd')
    }

    var result = swig.renderFile(articleTemplate, entry)
    grunt.file.write(dest, result)

    return entry
}

function copyLinkedResource(entry) {
    var dirSrc  = dirname(entry.src)
    var dirDest = dirname(entry.dest)
    var resources = entry.resources
    var cpMap = {}
    resources.filter( isBlogResouece )
             .forEach( rc => cpMap[dirSrc+'/'+rc]=dirDest+'/'+rc )

    let count=0, copied=0
    for (let src of Object.keys(cpMap)) {
        count++
        if ( ! compareFile(src, cpMap[src])) {
            grunt.log.writeln(`  ${src} => ${cpMap[src]}`)
            grunt.file.copy(src, cpMap[src])
            copied++
        }
    }

    grunt.log.writeln(`  resource update/total = ${chalk.green(copied)}/${chalk.blue(count)}`)
}

function renderIndex() {
    var articles = blogList.filter( _ => !_.noindex ).sort( articleSort )
    var html = swig.renderFile(indexTemplate, { articles: articles })
    grunt.file.write(outputDir+'index.html', html)

    grunt.log.writeln(chalk.green(`indexed ${articles.length} posts`))
}

function checkConfig(opts, args) {
    for (let i=1; i!==arguments.length; ++i) {
        if ( !opts[arguments[i]] ) {
            grunt.fatal(`${arguments[i]} not set`)
            return false
        }
    }
    return true
}

function getMTime(path) {
    return statSync(path).mtime
}

function stripFilename(path) {
    var name = basename(path)
    return name.substr(0, name.length - extname(name).length)
}

function getLinkedResources(html) {
    var m, r=[]
    while ((m=linkedResourceRegex.exec(html))!==null) {
        var rcName = m[1] || m[2]
        r.push(rcName)
    }
    return r
}

function isBlogResouece(rc_url) {
    return rc_url[0] !== '.' && rc_url.indexOf('//')===-1
}

/* return true:   same content
 *        false:  different content
 */
function compareFile(src, dest) {
    if (!grunt.file.exists(src)) throw 'Source file does not exist'
    if (!grunt.file.exists(dest)) return false
    var bSrc  = grunt.file.read(src,  {encoding: null})
    var bDest = grunt.file.read(dest, {encoding: null})
    return Buffer.compare(bSrc, bDest) === 0
}
