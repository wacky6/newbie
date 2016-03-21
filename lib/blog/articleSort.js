'use strict'

function strcmp(a, b) {
    if (a>b)    return 1
    if (a===b)  return 0
    if (a<b)    return -1
}

function dateVal(input) {
    return new Date(input).valueOf()
}

function articleSort(a, b) {
    let featured = (a.featured ? 1 : 0) + (b.featured ? 2 : 0)
    switch (featured) {
        case 3:  return dateVal(b.ctime) - dateVal(a.ctime) || strcmp(a.title, b.title)  // both are featured
        case 2:  return 1
        case 1:  return -1
        case 0:  return dateVal(b.ctime) - dateVal(a.ctime) || strcmp(a.title, b.title)  // both are non featured
        default: return 0
    }
}

module.exports = articleSort
