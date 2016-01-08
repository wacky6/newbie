'use strict'

let grunt = require('grunt')
let chalk = require('chalk')
let yellow = chalk.yellow
let blue   = chalk.blue
let green  = chalk.green
let red    = chalk.red

function metaParse(meta, hint) {
    hint = hint ? blue(hint)+': ' : ''
    let warn       = (str) => grunt.log.writeln(yellow('warn: ')+hint+str)
    let canonical  = (str) => grunt.log.writeln(yellow('cano: ')+hint+str)

    if (!!meta.keyword) {
        if (!!meta.keywords) {
            warn( blue('keywords')+' takes precedence over '+blue('keyword') )
        }else{
            canonical( blue('keyword')+' => '+blue('keywords') )
            meta.keywords = meta.keyword
            delete meta.keyword
        }
    }

    if (!!meta.keywords) {
        if (typeof meta.keywords === 'string')
            meta.keywords = meta.keywords.split(/\s*,\s*/)
        if ( ! (meta.keywords instanceof Array))
            warn('keywords: can not normalize '+blue(keywords)+' to Array: '+meta.keywords)

        // complain about mistakes, such as "，"
        let complaints = {
            '，':  'Chinese comma in keyword',
            '\\s': 'Space in keyword'
        }
        meta.keywords.forEach( kwd => {
            for (let reStr in complaints) {
                let re = new RegExp(reStr, 'g')
                let highlight = kwd.replace(re, (s)=>''+red(s) )
                if (highlight !== kwd)
                    warn(complaints[reStr]+': '+highlight)
            }
        })

        // normalize to ', ' separator
        meta.keywords = meta.keywords.join(', ')
    }

    return meta
}

module.exports = metaParse
