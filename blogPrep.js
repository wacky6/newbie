'use strict'

/* generate blogListing to blog.cache */

var bfm = require('bfm')
var fs  = require('fs')
var swig = require('swig')
var join = require('path').join
var basename = require('path').basename
var extname  = require('path').extname
var blogRender = require('./blogRender')

var baseDir    = join(__dirname, require('./conf').blogMarkdownDir)
var wwwBlogDir = join(__dirname, 'www', 'Blog')

var linkedResourceRegex = /href=".\/(.+?)"|'.\/(.+?)'/g
var h1Regex = /<h1(?:(?:\s+\w+(?:\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)>(.+?)<\/h1>/

function mkdirPSync(path) {
	try {
		fs.mkdirSync(path)
	} catch(e) {
		if (e.code!='EEXIST') throw e
	}
}

function getMTime(path) {
	var time = new Date()
	try {
		var stat = fs.statSync(fpath).mtime
	}catch(e){}
	return time
}

function blogCache() {
	
	var ls  = fs.readdirSync(baseDir).filter(function(fname){
		return extname(fname)=='.md'
	})

	// render BFM to html + meta
	var json = ls.map(function(fname){
		var fpath = join(baseDir, fname)
		var md = fs.readFileSync(fpath, 'utf-8')
		var _ = bfm(md)
		if (!_) {
			console.log('Probably invalid yaml: '+fname)
			return null
		}
		_.name = fname.replace('.md', '')
		_.date = new Date(_.meta.date || getMTime(fpath)).getTime()
		return _
	}).filter(function(e){return e!==null})
	
	mkdirPSync(wwwBlogDir)

	// render www/blog/* static page
	json.forEach(function(_){
		if (!_) {
			console.log('Probably invalid yaml meta')
			return
		}

		var dirName = _.name.toLowerCase().replace(/\s/g, '-')
		var blogPostDir  = join(wwwBlogDir, dirName)
		mkdirPSync(blogPostDir)

		// infer _.meta if necessary
		_.meta.title = _.meta.title || (h1Regex.exec(_.html) || ['',''])[1]

		// render static page
		blogRender(_.html, _.meta, function(err,output){
			console.log('Rendered: '+_.name)
			fs.writeFileSync(join(blogPostDir, 'index.html'), output)
		})

		// copy linked resources (start with ./) to www/blog
		var m
		while ((m=linkedResourceRegex.exec(_.html))!==null) {
			var rcName = m[1] || m[2]
			try {
				fs.copySync(join(baseDir, rcName))
				console.log('  RC Copy: '+rcName)
			} catch(e) {
				var msg = '  Fail to copy linked resource:\n'
				        + '    '+fname+' -> \n'
				        + '    '+rcName
				console.log(msg)
			}
		}

	})

	// sort for blog index
	json.sort(function(a,b){ 
		var t
		if (a.top) t|=2
		if (b.top) t|=1
		if (t==0 || t==3) return a.time-b.time
		if (t==1) return 1
		if (t==2) return -1
	})

	// render www/blog index page
	swig.renderFile(join(__dirname, 'view/blog-index.swig'), {
		articles: json.filter(function(_){
			return !_.noindex
		}).map(function(_){
			var r = _.meta
			r.date = _.date
			r.href = _.name+'/'
			r.title = r.title || _.title
			r.brief = r.brief || r.title
			return r
		})
	}, function(err, out){
		if (err) console.log('Error rendering index page: '+err)
		fs.writeFileSync(join(wwwBlogDir, 'index.html'), out)
		console.log('Blog index rendered.')
	})

}

blogCache()

module.exports = blogCache