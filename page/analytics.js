'use strict'
window.addEventListener('load', function() {
    var noAnalytics = localStorage && localStorage.getItem('no-analytics')
    var doNotTrack  =    navigator.doNotTrack === 'yes'
                      || navigator.doNotTrack === '1'
                      || navigator.msDoNotTrack === '1'
                      || window.doNotTrack === '1'

    if ( !doNotTrack && !noAnalytics ) {
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
