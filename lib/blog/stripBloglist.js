'use strict'

function exposeProperty(obj, props) {
    let ret = {}
    props.forEach( prop => ret[prop]=obj[prop] )
    return ret
}

const props = ['name', 'title', 'date', 'description',
               'keywords', 'featured', 'tags', 'breif',
               'mtime', 'ctime', 'index', 'robots']

module.exports = function(bloglist){
    return bloglist.filter( _ => _.index )
                   .map( _ => exposeProperty(_, props) )
}
