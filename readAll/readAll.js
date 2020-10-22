// ==UserScript==
// @name         阅读全文
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  【非自动关注】【自用，长期维护】【功能有】1. 阅读全文网站支持：CSDN、github.io、xz577.com
// @author       zhengmingliang
// @match        https://blog.csdn.net/*
// @match        *://*.github.io/*
// @match        *://*.xz577.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    /**
     * 阅读全文 规则1
     * @param readMoreSelector
     * @param contentSelector
     */
    function readAllRule1(readMoreSelector,contentSelector){
        if ($(readMoreSelector).length > 0) {
            console.log("检测到有阅读全文关注限制。。。。")
            // 移除阅读全文
            $(readMoreSelector).parent().remove();
            // 使滚动条可见
            // $("#article_content").css('overflow','auto')
            // 优化后：直接将style置为空
            $(contentSelector).prop('style', '')
            console.log("已解除阅读全文关注限制。。。。")
        }
    }


    var $ = $ || window.$;
    var href = window.location.href
    // csdn
    if (href.indexOf('csdn') != -1) {
        console.log("检测到CSDN。。。。")
        // 已登录
        readAllRule1("#btn-readmore-zk","#article_content")
        // 未登录
        readAllRule1(".btn-readmore","#article_content")

    } else if (href.indexOf('github.io') != -1) { //hoxis.github.io
        console.log("检测到github.io。。。。")
        readAllRule1("#read-more-btn","#container")
    }else if (href.indexOf('xz577') != -1) { //www.xz577.com
        console.log("检测到xz577。。。。")
        readAllRule1(".m-zk","#mewsmian")
        // Your code here...
    }
})();