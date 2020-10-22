// ==UserScript==
// @name         阅读全文
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  【非自动关注】【自用，长期维护】【功能有】1. 阅读全文网站支持：CSDN、github.io、xz577.com
// @author       zhengmingliang
// @match        https://blog.csdn.net/*
// @match        *://*.github.io/*
// @match        *://*.xz577.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    var $ = $ || window.$;
    var href = window.location.href
    // csdn
    if (href.indexOf('csdn') != -1) {
        console.log("检测到CSDN。。。。")
        if ($("#btn-readmore-zk").length > 0) {  // 已登录
            console.log("检测到有阅读全文关注限制。。。。")
            // 移除阅读全文
            $("#btn-readmore-zk").parent().remove();
            // 使滚动条可见
            // $("#article_content").css('overflow','auto')
            // 优化后：直接将style置为空
            $("#article_content").prop('style', '')
            console.log("已解除阅读全文关注限制。。。。")
        }else if($(".btn-readmore").length > 0){ // 未登录
            $(".btn-readmore").parent().remove();
            // 使滚动条可见
            // $("#article_content").css('overflow','auto')
            // 优化后：直接将style置为空
            $("#article_content").prop('style', '')
        }
    } else if (href.indexOf('github.io') != -1) {
        console.log("检测到github.io。。。。")
        if ($("#read-more-btn").length > 0) {
            console.log("检测到有阅读全文关注限制。。。。")
            // 移除阅读全文
            $("#read-more-btn").parent().remove();
            // 使滚动条可见
            // $("#container").css('overflow','auto')
            // 优化后：直接将style置为空
            $("#container").prop('style', '')
            console.log("已解除阅读全文关注限制。。。。")

        }
    }else if (href.indexOf('xz577') != -1) { //www.xz577.com
        console.log("检测到xz577。。。。")
        if ($(".m-zk").length > 0) {
            console.log("检测到有阅读全文关注限制。。。。")
            // 移除阅读全文
            $(".m-zk").parent().remove();
            // 使滚动条可见
            // $("#container").css('overflow','auto')
            // 优化后：直接将style置为空
            $("#mewsmian").prop('style', '')
            console.log("已解除阅读全文关注限制。。。。")

        }
        // Your code here...
    }
})();