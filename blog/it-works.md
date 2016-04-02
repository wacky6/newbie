[](~
  title:       Newbie Works!
  description: Introduction to my website generator and repository.
  mtime:       2016-03-21
  ctime:       2015-07-25
  keywords:    introduction, website
  tags:        其它
  brief: |
         这是一个手撸的个人站。
         Powered by node.js.

         这篇日志的创建时间是Newbie原型投入使用的时间。
         当前为第3次重构的版本。  ╮(╯_╰)╭
~)

# Newbie Works!

这个手撸的个人站终于达到了可以放出源码的水平了。这篇日志的创建时间是最初版本投入使用的时间。

13年底就想自己搭网站了，一直觉得自己的网站应该自己写才对。现成方案虽然好，然而对我这个懒癌晚期没有什么吸引力：不想配nginx/a-patchy、不想用数据库、……

14年底，在南大交换，和小伙伴刷爬虫大作业的时候，被node.js妹子勾搭走了，从此入坑JS。随后逛npm，发现不少有趣的库。于是用node撸博客的想法逐渐成型。

严格的来说，Newbie是包括了生成器、网站内容、配置的一个repo。（教科书式的反面教材！）评论功能多半不会有，因为我还没想到一种优雅的、不需要数据库的方案。



## 我很懒的噜

首先，配置服务器的git环境：用[post-receive](https://github.com/wacky6/post-receive-skeleton)实现push后自动部署。

然后，在本地开发。通过[grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch)实现源文件自动编译，在浏览器直接刷新就可以看到修改效果。

博客内容用[我魔改的markdown](https://github.com/wacky6/flavor-marked)书写，它可以：

* 存储元数据
* span语法糖
* [HTML属性mixin](< .mixin @color: rgb(244, 67, 54) >)
* 提取script、style（然后输出到`<head>`）

最后，在本地测试。一切满意后commit并push到服务器。


## Acknowledgement
About/Intro.的时间轴参考了[Rijnx](http://cv.rijnx.com)的思路，然后魔改。

第三次重构对页面进行大量简化，参考了[全能的逆向学弟](https://wangxiyu191.github.io)的设计。

[](<
    @max-width: 100%
    .mixin-img
>) ![Doge](./Doge.png)

[](< @visibility: hidden >)
请不要花式虐狗
