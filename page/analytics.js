'use strict'
window.addEventListener('load', function() {
    var noAnalytics = window.localStorage && window.localStorage.getItem('no-analytics')
    var isLocalhost = /localhost|127\.0\.0\.1|::1/i.test(window.location.hostname)
    var doNotTrack  =    navigator.doNotTrack === 'yes'
                      || navigator.doNotTrack === '1'
                      || navigator.msDoNotTrack === '1'
                      || window.doNotTrack === '1'

    if ( !doNotTrack && !noAnalytics && !isLocalhost ) {
        // track & analytics
        window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date
        ga('create', 'UA-72435418-1', 'auto')
        ga('send', 'pageview')

        // insert analytics code
        var s = document.createElement('script')
        s.setAttribute('src', '//www.google-analytics.com/analytics.js')
        document.body.appendChild(s)
    }
})
