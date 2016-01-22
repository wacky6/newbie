'use strict'

function metaDirectives(meta, ctx) {
    meta.robots   = !meta.norobot && !meta.norobots
    meta.index    = !meta.noindex
    meta.featured = !!meta.featured
    delete meta.norobot
    delete meta.norobots
    delete meta.noindex

    return meta
}

module.exports = metaDirectives
