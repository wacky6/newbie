'use strict'

/* this router/middleware is development use only,
 * published site should render markdowns to static html in www/
 */

var conf = require('./conf.js')
var fs   = require('co-fs')
var join = require('path').join
var normalize = require('path').normalize
//var blogRender = require('./blogRender')

var baseDir = join(__dirname, conf.blogMarkdownDir)

function *blogIndex(next) {
	var articles = yield fs.readFile('blogCache.json')
	this.status = 200
	yield this.render('blog-index', {articles: articles})
}

function *blog(next) {
	console.log(this.path)
	if (this.path=='/') {
		yield blogIndex
		return
	}
	// solve Markdown file's path
	var md   = normalize(this.path)
	// read, render Markdown
	var data = yield fs.readFile(md, 'utf-8')
	this.body = data
}


module.exports = blog