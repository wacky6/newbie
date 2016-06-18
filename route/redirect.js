'use strict'

module.exports = function(regExp, replaceStr, reason) {
    return function*(next) {
        if (this.request.href.match(regExp)) {
            let location = this.request.href.replace(regExp, replaceStr)
            this.response.status = 301
            this.response.set('Location', location)
            if (reason)
                this.response.set('X-Reason', reason)
            this.response.body = 'Redirecting to '+location
        }else{
            yield next
        }
    }
}