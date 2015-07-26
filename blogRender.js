'use strict'

var bfm  = require('bfm')
var swig = require('swig')
var join = require('path').join

/* src: string, source file */
function renderBlog(html, meta, callback) {

	// HTML meta 
	var title       = meta.title
	var description = meta.description || title
	var keywords    = meta.keywords    || []
	var author      = meta.author

	// process meta, so it can be directly processed by swig
	swig.renderFile(join(__dirname, '/view/blog-article.swig'), {
		article:  html,
		meta:     meta,
		title:    title,
		author:   author,
		keywords: keywords,
		description: description
	}, callback)

}

module.exports = renderBlog