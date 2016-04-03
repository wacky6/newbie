[](~
    ctime: 2016-03-29
    mtime: 2016-04-03
    tags:  JavaScript
    keywords: JavaScript, ECMAScript6, background, information
    description: 'Learn ECMAScript 6: Some background information of ECMAScript 6, the "new" JavaScript.'
    brief: |
            学ECMAScript 6，新时代的JavaScript。
            
            JS、ES6的背景
~)

ES6/New JS: Background
===

最近，几个学弟学妹来问我如何学习JavaScript。然而，适合初学者的ES6资源并不多（阮一峰大神的书虽然好，但对初学者来说还是缺了一些东西）。

很多书籍和资料还是针对ES5甚至ES3的。虽然内容完整，但在ES6的时代，具有相当的误导性：一是让人感觉JS有许多坑、有不少不合理的设计；二是不实用，学的不是将来用到的（无论是找工作还是自己写着玩）。三是把JavaScript和HTML捆绑着学（虽然确实应该这样），但现在JavaScript（ECMAScript）的应用不仅仅在浏览器里。

另外，大多ES6的资料是英文的，考虑到某邮的平均英语水平，硬塞这些资料肯定不合适。

所以我就开坑这篇（系列）文章。内容为JavaScript（ECMAScript）这门语言，不会过多涉及HTML和Web开发的内容。内容假设读者了解Java或C/C++的知识。

<a href="#table-of-content" class="icon-angle-double-right dark button">到目录</a>


## 为什么要学JavaScript
* 这是一门很有特点的语言（函数式、原型链、动态类型）
* 想做前端、Web开发、全栈工程狮
* 想要快速开发网站、小型软件
* JavaScript相关的职业需求近年在快速增加
* 跨平台（无论是Web还是Node.js）、性能足够好、平台逐渐成熟
* 非常活跃的社区，大量的开源库可以使用



## 背景
JavaScript最早由网景公司提出，作为在浏览器中使用的客户端语言。1997年，在ECMA国际的推动下，标准化为ECMAScript。JavaScript最早叫做LiveScript。为了让程序猿对这门语言感到亲切，改名为JavaScript。

虽然名字中有Java这个词，源代码从表面上看也和Java很像，但JS的机制与Java的机制没有什么关系。两者的[编程范型](https://zh.wikipedia.org/wiki/编程范型)（[Programming Paradigm](https://en.wikipedia.org/wiki/Programming_paradigm)）相差甚远：

| JavaScript         | Java          |
|--------------------|---------------|
| 脚本语言            | 编译型语言      |
| 动态类型            | 静态类型        |
| 函数式、命令式       | 命令式          |
| 基于**原型**的OOP   | 基于**类**的OOP  |


严格来说，JavaScript不是一种语言，而是：ECMAScript（语言的语法定义、基本对象）、DOM模型（处理网页内容的方法）、BOM模型（与浏览器进行交互的方法）。在node.js出现前，JS的使用情境几乎全部是浏览器编程，因此人们通常将JS作为ECMAScript的同义词使用。

本文中，JS（JavaScript）、ES（ECMAScript）将被作为同义词使用，均表示ECMAScript这个语言。有时，会附带数字（如ES6）来指明版本。



## 学习路线
就目前JS的应用来看。第一种路线是前端（网页开发），第二种是全栈（什么都能做的Node.js）。个人建议的学习路线如下：

#### 前端 / Web开发
1. ES5语法（仅仅为了兼容）
2. ES6/ES7语法
3. Gulp/Webpack + Babel
4. DOM、BOM模型、方法
5. 事件模型、回调模式
6. 框架（jQuery、Angular、React等）
7. Promise/A+


#### 全栈 / Node.js
1. ES6语法
2. 了解Node支持的ES6语法
3. 事件模型、回调模式
4. Node.js基础库
5. npm与依赖管理
6. "同步化"JS：Promise/A+、Generator/co、async/await
7. 各种库的使用（取决于你想做什么）



#### 如何学：

推荐用Node.js，就像写C语言程序一样（也可以直接在浏览器里面学）。你只要：

* 打开命令提示符/终端，切换到文件夹
* 编辑脚本，保存到文件夹（假设`a.js`）
* 执行`node a.js`

然后：**学好英语！学好英语！！学好英语！！！**重要的事情说三遍。如果你能找到原始的英文文档，请认真阅读它（除非这个库是中国人写的）。我遇到的中文资料翻译质量基本都非常糟糕，包括大站点（比如MDN）。CSDN、某度就更不要说了。

**小心地买JavaScript教程书籍**。目前（2016年）能买到的书大多针对ES5标准，现在的ES6标准与它很大。ES5时代的一些概念、写法已不再适用。而且，随着Babel等转译工具（Transcompiler）的流行，纯ES5的使用会越来越少（如果不是消失的话）。

#### 资源：
* [MDN / Mozilla Developer Network](https://developer.mozilla.org)
* [阮一峰大神的ES6介绍](http://es6.ruanyifeng.com)
* [npm / node世界的包管理库](https://npmjs.org/)
* 你使用的**库的文档**
* Newsletter和博客，了解社区的新动态（比如[JavaScriptWeekly](http://javascriptweekly.com)、[PONYFOO](https://ponyfoo.com)）




[](< #table-of-content >)
## 文章列表
这个坑还没开始填呢（说不定就弃坑了）🙃。

