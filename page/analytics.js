'use strict'
window.addEventListener('load', function() {
    let noAnalytics = window.localStorage && window.localStorage.getItem('no-analytics')
    let isLocalhost = /localhost|127\.0\.0\.1|::1/i.test(window.location.hostname)
    let doNotTrack  =    navigator.doNotTrack === 'yes'
                      || navigator.doNotTrack === '1'
                      || navigator.msDoNotTrack === '1'
                      || window.doNotTrack === '1'

    if ( !doNotTrack && !noAnalytics && !isLocalhost ) {
        // Google UA.
        window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date
        ga('create', 'UA-72435418-1', 'auto')
        ga('send', 'pageview')
        let s = document.createElement('script')
        s.setAttribute('src', '//www.google-analytics.com/analytics.js')
        document.body.appendChild(s)
        
        // Google GA4
        s =  document.createElement('script')
        s.setAttribute('src', '//www.googletagmanager.com/gtag/js?id=G-E2RBFS2JSW')
        s.setAttribute('async', 'async')
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-E2RBFS2JSW');
    }
})
