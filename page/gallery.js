'use strict'
;(function(){

// gallery link masquerade
// detect whether instagram is accessible, if yes, replace lofter

const INSTAGRAM_LINK = 'https://www.instagram.com/qjw_wacky6/'
const INSTAGRAM_PROBE = INSTAGRAM_LINK    // act as a prefetch?
const TIMEOUT = 5000

const JSREF_CLASS = 'jsref-gallery'

function fetchWithTimeout(url, timeout) {
    return new Promise((resolve, reject) => {
        let timeout = setTimeout(() => {
            reject(new Error('Timeout'))
        }, TIMEOUT)

        fetch(INSTAGRAM_PROBE).then(
            resp => {
                clearTimeout(timeout)
                timeout = null
                resolve(resp)
            },
            err => {
                if (timeout) {
                    timeout = null
                    reject(err)
                }
            }
        )
    })
}

try {
    fetchWithTimeout(INSTAGRAM_LINK, TIMEOUT).then(
        resp => {
            // check response code
            if (resp.ok) {
                // masquerade all lofter links
                Array.prototype.slice.call(document.getElementsByClassName(JSREF_CLASS))
                    .filter(el => el.tagName.toLowerCase() === 'a')
                    .forEach(el => { el.href = INSTAGRAM_LINK })
                window.ga && window.ga('send', 'event', 'Connectivity', 'instagram', 'success')
            }
        },
        error => {
            window.ga && window.ga('send', 'event', 'Connectivity', 'instagram', 'failure')
        }
    )
} catch(e) {
    // Fetch or Promise not supported, likely IE user -> ignore them
}

})()
