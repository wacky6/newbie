'use strict'

/* this router/middleware is development use only,
 * published site should render markdowns to static html in www/
 */

var conf = require('./conf.js')
var fs   = require('fs')
var path = require('path')
var blogRender = require('./blogRender')

var blogPath = __dirname + conf.blogMarkdownDir

function blog(req, res, next) {
	console.log(req.path)
	// solve Markdown file's path
	var md = path.normalize(req.path)
	// read, render Markdown
	fs.readFile(md, function(data,err){
		if (err) { 
			next()
			return
		}
		blogRender(data.toString('utf-8'), function(html){
			res.status(200)
			res.header('Content-Type', 'text/html; charset=UTF-8')
			res.send(html)
			res.end()
		})
	})
}


module.exports = blog