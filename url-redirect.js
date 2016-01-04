'use strict'

module.exports = function(regExp, replaceStr, reason) {
    return function*(next) {
        if (this.url.match(regExp)) {
            let location = this.url.replace(regExp, replaceStr)
            this.response.status = 301
            this.set('Location', location)
            if (reason)
                this.set('X-Reason', reason)
        }
        yield next;
    }
}
