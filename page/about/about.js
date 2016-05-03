'use strict'

const OVERLAY = {
    'alipay': {
        selector: '#alipay-qr-code',
        href:     'https://qr.alipay.com/aex04039win5g8swmisrb94',
        html: `
            <img class="qr-code" src='alipay-qr-code.png' alt="std-weak's Alipay QR Code"></img>
            <div class="hint">请用支付宝客户端扫描二维码<br>
                              也可以用支付宝网页版转账喵<br>
                              416707889@qq.com
            </div>
        `
    },
    'wechat-payment': {
        selector: '#wechat-payment-qr-code',
        // wx.tenpay does not launch wechat app
        // href:     'https://wx.tenpay.com/f2f?t=AQAAAIUdo2fsBPH3kDVIzO12BjM%3D',
        html:     `
            <img class="qr-code" src='wechat-payment-qr-code.png' alt="std-weak's we-char payment QR Code"></img>
            <div class="hint">长按二维码，保存到手机相册<br>
                              然后用微信客户端扫描二维码
            </div>
        `
    },
    'wechat': {
        selector: '#wechat-qr-code',
        href:     'https://weixin.qq.com/r/ZEuYgCjElnXprWzj9x52',
        html: `
            <img class="qr-code" src='wechat-qr-code.png' alt="std-weak's we-chat QR Code"></img>
            <div class="title">别忘了告诉我你是谁</div>
            <div class="hint">请用微信客户端扫描二维码</div>
        `
    }
}

;(function(){
    document.addEventListener('DOMContentLoaded', ()=>{
        let curActive
        let overlay = $('.overlay')
        const closeOverlay = ()=>{
            overlay.setAttribute('aria-hidden', 'true')
            if (curActive)
                curActive.setAttribute('aria-pressed', 'false')
            curActive = null
        }
        const showOverlay = (decl)=>{
            if (decl.href && window.navigator.userAgent.match(/mobile/i)) {
                window.open(decl.href)
                return false
            }else{
                let initiator = $(decl.selector)
                initiator.setAttribute('aria-pressed', 'true')
                curActive = initiator
                overlay.querySelector('.content').innerHTML = decl.html
                overlay.setAttribute('aria-hidden', 'false')
                return true
            }
        }
        overlay._.events({ click: ()=>{
            closeOverlay()
            history.pushState({}, undefined, window.location)
        } })
        for (let i in OVERLAY) {
            const decl = OVERLAY[i]
            const initiator = $(decl.selector)
            if (initiator) {
                initiator._.events({ click: ()=>{
                    let shoudPushState = showOverlay(decl)
                    if (shouldPushState)
                        history.pushState({overlay: decl}, undefined, window.location)
                } })
            }
        }
        window.onpopstate = ()=>{
            let state = history.state
            if (state && state.overlay)
                showOverlay(state.overlay)
            else
                closeOverlay()
        }
    })
})()
