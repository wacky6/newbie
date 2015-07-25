'use strict'

var bfm  = require('bfm')
var swig = require('swig')

// cache blog template
var template = fs.readFileSync('./template/blog-article.swig')

/* src: string, source file
 * callback: function(html)
 */
function parseBlog(src, callback) {
	var _ = bfm(src)
	var html = _.html
	var meta = _.meta

	// process meta, so it can be directly processed by swig

	swig.render(template, src, {
		article: html,
		meta:    meta
	})

	callback(html)
}

module.export = praseBlog