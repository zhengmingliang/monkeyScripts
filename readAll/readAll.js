// ==UserScript==
// @name         阅读全文
// @namespace    http://tampermonkey.net/
// @version      1.7
// @require      https://cdn.jsdelivr.net/npm/jquery@3.2.1/dist/jquery.min.js
// @description  【非自动关注】【自用，长期维护】【功能有】1. 阅读全文网站支持：CSDN、github.io、xz577.com、iteye.com、720ui.com、cloud.tencent.com
// @author       zhengmingliang
// @match        https://*.csdn.net/*
// @match        *://*.github.io/*
// @match        *://*.xz577.com/*
// @match        *://*.iteye.com/*
// @match        *://*.720ui.com/*
// @match        *://cloud.tencent.com/*
// @match        *://*.didispace.com/*
// @match        *://*.sina.cn/*
// @match        *://*.toutiao.com/*

// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    /**
     * 阅读全文 规则1(openwrite.cn 插件规则)
     * @param readMoreSelector
     * @param contentSelector
     */
    function readAllRule1(readMoreSelector, contentSelector) {
        if ($(readMoreSelector).length > 0) {
            console.log("检测到有阅读全文关注限制。。。。")
            // 移除阅读全文
            $(readMoreSelector).parent().remove();
            // 使滚动条可见
            // $("#article_content").css('overflow','auto')
            // 优化后：直接将style置为空
            console.log("style:%s", $(contentSelector).prop('style'))
            $(contentSelector).prop('style', '')
            $(contentSelector).attr('style', '')
            console.log("已解除阅读全文关注限制。。。。")
        }
    }

    /**
     * 阅读全文 规则1(openwrite.cn 插件规则)
     * @param readMoreSelector
     * @param contentSelector
     */
    function readAllRule1ByOrigin(readMoreSelector, contentSelector) {
        var dom;
        var parentElement, contentElement;
        if (readMoreSelector.startsWith("#")) {
            dom = document.getElementById(readMoreSelector.substring(1))
            parentElement = dom.parentElement;
        } else if (readMoreSelector.startsWith(".")) {
            dom = document.getElementsByClassName(readMoreSelector.substring(1))
            if (dom.length > 0) {
                parentElement = dom[0].parentElement;
            }


        } else {
            dom = document.getElementsByTagName(readMoreSelector)
            parentElement = document.getElementsByClassName(readMoreSelector)[0].parentElement;
        }

        if (contentSelector.startsWith("#")) {
            contentElement = document.getElementById(contentSelector.substring(1))
            contentElement.style = ''
        } else if (contentSelector.startsWith(".")) {
            contentElement = document.getElementsByClassName(contentSelector.substring(1))
            contentElement[0].style = ''

        } else {
            contentElement = document.getElementsByTagName(contentSelector)
            contentElement[0].style = ''
        }
        console.log(111)
        parentElement.parentElement.removeChild(parentElement);
    }

    /**
     * 规则2：移除指定标签的某个class样式
     * @param readMoreSelector
     * @param removeSelector
     * @param removeClass
     */
    function readAllRule2(readMoreSelector, removeSelector, removeClass) {
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
    function readAllRule3(clickSelector) {
        var selector = $(clickSelector);
        if (!selector) {
            selector = jQuery(clickSelector);
        }
        if (selector.length > 0) {
            console.log("检测到有阅读全文关注限制。。。。")
            // 点击展开
            selector.trigger("click")
            console.log("已解除阅读全文关注限制。。。。")
        }
    }

    /**
     * 使用openwrite.cn策略的个人博客或其他使用类似的规则
     */
    function readAllRule4(removeSelector) {
        console.log("检测到有阅读全文关注限制。。。。")
        // 移除阅读全文
        $(removeSelector).parent().remove();
        var zIndexArray = [];
        var parentSelector = "div[style]"
        if ($("article[style]").length > 0) {
            parentSelector = "article[style]"
        }
        var flag = false
        //存放只有height属性的节点
        let heightArray = [];
        findElements();
        if (flag) {
            console.log("已解除阅读全文关注限制。。。")
        } else {

            if (parentSelector == "div[style]" && heightArray.length == 1) {
                heightArray[0].prop("style", "")
                console.log("已解除阅读全文关注限制。。。。")
            } else {
                parentSelector = "div[style]"
                heightArray = [];
                findElements();
                if (heightArray.length == 1) {
                    heightArray[0].prop("style", "")
                    console.log("已解除阅读全文关注限制。。。。。")
                }
            }
        }

        function findElements() {
            $(parentSelector).each(function (index) {
                var attr = $(this).attr('style');
                if (attr.indexOf("overflow") != -1 && attr.indexOf("height") != -1) {
                    var overflow = $(this).css("overflow");
                    if ('hidden' == overflow) {
                        $(this).prop("style", "")
                        flag = true
                    }
                } else if (attr.indexOf("height") != -1) {
                    console.log("index:", index, $(this))
                    heightArray.push($(this))
                }
                let text = $(this).text();
                if (attr.indexOf("z-index") != -1 && (text.indexOf("首次访问") != -1 || text.indexOf("人机检测") != -1)) {
                    let zIndex = $(this).css("z-index");
                    console.log("zIndex:", zIndex)
                    let lastDiv = $("div[style]").filter(function () {
                        return $(this).attr('style').indexOf("z-index") != -1 && $(this).css("z-index") == zIndex - 1
                    })
                    console.log("lastDiv:", lastDiv)
                    if (lastDiv && lastDiv.length > 0) {
                        lastDiv.remove();
                    }
                }

            })
        }
    }

    /**
     * java学习 javazhiyin.com
     */
    function removeFirstLayer() {
        if ($(".layui-layer-page").length > 0) {
            var text = $(".layui-layer-page").text();
            if (text.indexOf('首次访问') != -1 || text.indexOf('人机识别')) {

            }

            $(".layui-layer-page").remove();
            $(".layui-layer-shade").remove();
        }
        $("div[index]")

    }

    function removeAlertRule1() {
        $("div[style]").each(function (index) {
            let attr = $(this).attr('style');
            let text = $(this).text();
            if (attr.indexOf("z-index") != -1 && (text.indexOf("首次访问") != -1 || text.indexOf("人机检测") != -1)) {
                let zIndex = $(this).css("z-index");
                console.log("zIndex:", zIndex)
                let lastDiv = $("div[style]").filter(function () {
                    return $(this).attr('style').indexOf("z-index") != -1 && $(this).css("z-index") == zIndex - 1
                })
                console.log("lastDiv:", lastDiv)
                if (lastDiv && lastDiv.length > 0) {
                    lastDiv.remove();
                }
                $(this).remove();
                $('body').css("overflow", 'auto');
            }

        })
    }

    var $ = $ || window.$ || jQuery;
    var href = window.location.href

    function intervalReadAllRule2(checkSelector, removeSelector, removeClass) {
        let interval = setInterval(function () {
            console.log("轮训检测...")
            if ($(checkSelector).length > 0) {
                readAllRule2(checkSelector, removeSelector, removeClass)
                clearInterval(interval)
            }

        }, 1000)
    }

// csdn
    if (href.indexOf('csdn') != -1) {
        console.log("检测到CSDN。。。。")
        // 已登录
        readAllRule1("#btn-readmore-zk", "#article_content")
        // 未登录
        readAllRule1(".btn-readmore", "#article_content")
        // 移动端处理
        readAllRule1(".btn_mod", ".article_content")

    } else if (href.indexOf('github.io') != -1) { //hoxis.github.io
        console.log("检测到github.io。。。。")
        readAllRule1("#read-more-btn", "#container")
    } else if (href.indexOf('xz577') != -1) { //www.xz577.com
        console.log("检测到xz577。。。。")
        readAllRule1(".m-zk", "#mewsmian")
        // Your code here...
    } else if (href.indexOf('cloud.tencent.com') != -1) { //cloud.tencent.com
        console.log("检测到tencent。。。。")
        readAllRule2(".com-markdown-collpase-toggle", ".com-markdown-collpase-hide", "com-markdown-collpase-hide")
        // Your code here...
    } else if (href.indexOf('iteye.com') != -1) { //iteye.com
        console.log("检测到iteye.com。。。。")
        readAllRule3("#btn-readmore")
        // Your code here...
    } else if (href.indexOf('720ui.com') != -1) { // 720ui.com
        console.log("检测到720ui.com。。。。")
        readAllRule1("#read-more-btn", "#main")
    } else if (href.indexOf('sina.cn') != -1) { // k.sina.cn
        console.log("检测到sina.cn。。。。")
        let interval = setInterval(function () {
            console.log("轮训检测...")
            if ($(".foldBtn").length > 0) {
                readAllRule1ByOrigin(".foldBtn", ".s_card z_c1")
                clearInterval(interval)
            }
        }, 1000)
    } else if (href.indexOf('toutiao') != -1) { // k.sina.cn
        console.log("检测到toutiao。。。。")
        // 循环检测
        intervalReadAllRule2(".fold-btn", ".fold-btn-content", "fold-btn-content-fold");
        // document.removeEventListener('click',getEventListeners($(document).get(0)).click[0].listener)


    } else if ($("#read-more-btn").length > 0) {
        console.log("检测到可能使用了openwrite推广工具。。。。")
        readAllRule4("#read-more-btn");
    } else if ($(".mask").length > 0 && $(".info").length > 0) { // cmsblogs.com
        console.log("检测到%s。。。。", href)
        readAllRule4(".info");
    } else if (href.indexOf("iocoder") != -1) {
        setInterval(removeAlertRule1(), 10000);
    } else if (href.indexOf("javazhiyin") != -1) {
        // 每隔10s移除弹出的关注检测弹框
        setInterval(removeFirstLayer(), 10000)
    } else {


    }
})();
