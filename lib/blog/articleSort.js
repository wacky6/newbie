'use strict'

function strcmp(a,b) {
    if (a>b)    return 1
    if (a===b)  return 0
    if (a<b)    return -1
}

function articleSort(a, b) {
    let featured = (a.featured ? 1 : 0) + (b.featured ? 2 : 0)
    switch (featured) {
        case 3: return b.ctime - a.ctime || strcmp(a.title, b.title)  // both are featured
        case 2: return 1
        case 1: return -1
        case 0: return b.ctime - a.ctime || strcmp(a.title, b.title)  // both are non featured
    }
}

module.exports = articleSort
