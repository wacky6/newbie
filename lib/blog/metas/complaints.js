'use strict'

const blue = require('chalk').blue
const red  = require('chalk').red

const keywordComplaints = {
    '，':  'Chinese comma',
    '\\s': 'Space'
}
const tagComplaints = keywordComplaints

function metaComplaints(meta, ctx) {
    if ( !meta.keywords.length )
        ctx.warn(blue('keywords')+' is empty')
    if ( !meta.tags.length )
        ctx.warn(blue('tags')+' is empty')

    let strCheck = (str, complaints, hint) => {
        for (let reStr in complaints) {
            let re = new RegExp(reStr, 'g')
            let hl = str.replace(re, s=>''+red(s))
            if (str!==hl) {
                ctx.warn(complaints[reStr]+' found in '+hint+': '+hl)
                ctx.warn('most likely a mistake')
            }
        }
    }

    meta.keywords.forEach( kwd => strCheck(kwd, keywordComplaints, 'keyword') )
    meta.tags.forEach( tag => strCheck(tag, tagComplaints, 'tag') )

    return meta
}


module.exports = metaComplaints