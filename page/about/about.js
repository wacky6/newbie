'use strict'

const OVERLAY = {
    'alipay': {
        selector: '#alipay-qr-code',
        href:     'https://qr.alipay.com/aex04039win5g8swmisrb94',
        html: `
            <img class="qr-code" width="344" height="344" src='alipay-qr-code.png' alt="std-weak's Alipay QR Code"></img>
            <div class="title">客官赏点零花钱呗</div>
        `
    },
    'wechat': {
        selector: '#wechat-qr-code',
        href:     'https://weixin.qq.com/r/ZEuYgCjElnXprWzj9x52',
        html: `
            <img src='wechat-qr-code.png' alt="std-weak's we-chat QR Code"></img>
            <div class="title">别忘了告诉我你是谁</div>
        `
    }
}

;(function(){
    document.addEventListener('DOMContentLoaded', ()=>{
        let curActive
        let overlay = $('.overlay')
        overlay._.events({
            click: (ev)=>{
                overlay.toggleState('aria-hidden')
                if (curActive)
                    curActive.toggleState('aria-pressed')
                curActive = null
            }
        })
        for (let i in OVERLAY) {
            const decl = OVERLAY[i]
            const initiator = $(decl.selector)
            if (initiator) {
                initiator._.events({
                    click: ()=>{
                        if (decl.href && window.navigator.userAgent.match(/mobile/i)) {
                            window.open(decl.href)
                        }else{
                            initiator.toggleState('aria-pressed')
                            curActive = initiator
                            overlay.querySelector('.content').innerHTML = decl.html
                            overlay.toggleState('aria-hidden')
                        }
                    }
                })
            }
        }
    })
})()
