
### 脚本功能
主要是用于屏蔽一些网站的APP引导，读取或查看更多的文章或视频时就需要去APP上看，本脚本就是为了屏蔽非得下载APP的；但由于有些不是很好屏蔽，所以只是在点击的条目上添加了`浏览器打开`的选项来避开下载APP的方式
### 安装脚本
1. 首先安装浏览器插件`Tampermonkey`（脚本管理器）
    * Tampermonkey: [官网地址](https://www.tampermonkey.net/index.php)
    * chrome插件地址：[官方地址](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) [国内下载地址](https://zml2015.lanzous.com/b07a4yidc)
    * firefox插件地址：[官方地址](https://addons.mozilla.org/zh-CN/firefox/addon/tampermonkey/?utm_source=addons.mozilla.org&utm_medium=referral&utm_content=search)
2. 安装脚本
    * [去 Greasy Fork 安装](https://greasyfork.org/zh-CN/scripts/414010-阅读全文)
### 屏蔽原理
* 并未直接移除原来的点击去APP查看的事件
* 添加新的点击选项`浏览器打开`来查看详情
* 移除部分APP打开的标签

### 新增网站反馈 
* [github反馈](https://github.com/zhengmingliang/monkeyScripts/issues/new?assignees=zhengmingliang&labels=help+wanted&template=support-read-all-template.md&title=)
* 反馈邮箱：zml@alianga.com

### 目前支持的网站
* 新浪新闻
* 持续支持中...
