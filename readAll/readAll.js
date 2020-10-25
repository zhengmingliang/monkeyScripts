// ==UserScript==
// @name         阅读全文
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  【非自动关注】【自用，长期维护】【功能有】1. 阅读全文网站支持：CSDN、github.io、xz577.com、iteye.com、720ui.com、cloud.tencent.com
// @author       zhengmingliang
// @match        https://blog.csdn.net/*
// @match        *://*.github.io/*
// @match        *://*.xz577.com/*
// @match        *://*.iteye.com/*
// @match        *://*.720ui.com/*
// @match        *://cloud.tencent.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    /**
     * 阅读全文 规则1(openwrite.cn 插件规则)
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

    /**
     * 规则2：移除指定标签的某个class样式
     * @param readMoreSelector
     * @param removeSelector
     * @param removeClass
     */
function readAllRule2(readMoreSelector,removeSelector,removeClass){
        if ($(readMoreSelector).length > 0) {
            console.log("检测到有阅读全文关注限制。。。。")
            // 移除阅读全文
            $(readMoreSelector).remove();
            // 使滚动条可见
            // $("#article_content").css('overflow','auto')
            // 优化后：直接将style置为空
            $(removeSelector).removeClass(removeClass)
            console.log("已解除阅读全文关注限制。。。。")
        }
    }

    /**
     *  直接点击展开
     * @param clickSelector
     */
function readAllRule3(clickSelector){
        var selector = $(clickSelector);
        if(!selector){
            selector = jQuery(clickSelector);
        }
        if (selector.length > 0) {
            console.log("检测到有阅读全文关注限制。。。。")
            // 点击展开
            selector.trigger("click")
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
        // 移动端处理
        readAllRule1(".btn_mod","#article_content")

    } else if (href.indexOf('github.io') != -1) { //hoxis.github.io
        console.log("检测到github.io。。。。")
        readAllRule1("#read-more-btn","#container")
    }else if (href.indexOf('xz577') != -1) { //www.xz577.com
        console.log("检测到xz577。。。。")
        readAllRule1(".m-zk","#mewsmian")
        // Your code here...
    }else if (href.indexOf('cloud.tencent.com') != -1) { //cloud.tencent.com
        console.log("检测到tencent。。。。")
        readAllRule2(".com-markdown-collpase-toggle",".com-markdown-collpase-hide","com-markdown-collpase-hide")
        // Your code here...
    }else if (href.indexOf('iteye.com') != -1) { //iteye.com
        console.log("检测到iteye.com。。。。")
        readAllRule3("#btn-readmore")
        // Your code here...
    }else if (href.indexOf('720ui.com') != -1) { // 720ui.com
        console.log("检测到720ui.com。。。。")
        readAllRule1("#read-more-btn","#main")
        // Your code here...
    }
})();