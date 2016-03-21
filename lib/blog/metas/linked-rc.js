'use strict'

const sax = require('sax')

function linkedResourceParser() {
    let rc = []
    let rcInfo = (type, path) => ({type: type, path: path})
    let parser = sax.parser(false)
    parser.onerror = (e) => {}
    parser.onopentag = (node) => {
        let tag   = node.name
        let attrs = node.attributes
        let type  = attrs['TYPE'],
            href  = attrs['HREF'],
            src   = attrs['SRC']
        if (tag==='SCRIPT' && src)
            rc.push(rcInfo('script', src))
        if (tag==='LINK' && type==='stylesheet' && href)
            rc.push(rcInfo('css', href))
        if (tag==='IMG' && src)
            rc.push(rcInfo('img', src))
    }
    return (s)=>{
        parser.write('<html>'+s+'</html>').end()
        return rc.filter( (info)=>info.path.startsWith('./') )
    }
}

function metaLinkedResource(meta, ctx) {
    meta.resources = linkedResourceParser()(ctx.html)
    return meta
}

module.exports = metaLinkedResource
