[](~
    ctime: 2016-04-02
    mtime: 2016-04-04
    tags:  JavaScript
    keywords: JavaScript, ECMAScript6, eslint, style
    description: 'Learn ECMAScript 6: Coding Conventions & Styles.'
    brief: |
            JavaScript基础：编码风格与习惯
~)

## 代码风格、习惯
在写代码之前，有必要了解一下JavaScript的编码习惯和约定。这些内容不是必须遵守的，但请在项目中保持一致。或者遵循项目已有的习惯。

我个人的观点：在**高可读性**的前提下：尽量简洁，减少符号（Token）数量；同类变量命名方式一致，可使用多种命名规则；少按Shift键；

如果你感兴趣，可以去[ESLint](http://eslint.org)了解更多。你可以在我网站代码库中找到[我使用的ESLint配置](https://github.com/wacky6/newbie/blob/master/.eslintrc.yml)。

#### 语句末分号`;`
按照Java/C++的习惯，JS用分号表示语句分界。但这个分号是**可选的**。如果没有写分号，JS解释器会根据语法自动补上。

根据Isaac Schlueter的解释：

> JS解释器认为行末（回车符`\n`)总是语句的结束，除非：
> 
> * 括号未配对，或不能形成合法语句
> * 这一行是：`++`、`--`
> * 这一行是：`for()`、`while()`、`do`、`if()`、`else`，并且没有`{`
> * 下一行开头是以下之一：`[(*+-/,.`

我的习惯：不写分号，**但在以`[`、`(`开始的行首加上`;`**（遵守这个规则，一般不会遇到问题）。不写分号比漏写分号要好。

#### 缩进
缩进宽度没有统一的惯例，一般有两空格、四空格、tab键这三种。

我的习惯：四空格。能很清楚的看出缩进；有助于防止过多层回调（假设遵循每行80个字符的习惯）。

#### 单引号`'`、双引号`"`、反引号<code>`</code>

JS中，单引号、双引号都可以用来表示字符串，两者**没有任何差异**。反引号用来表示模版字符串（Template String），可以当作普通字符串使用，也可以用来嵌入表达式的值。

我的习惯：单引号。避免`\'`转义时用`"`；反引号仅用来表示模版字符串。

```JavaScript
let string = 'Hello World!'
let avoid_escape = "That's JavaScript"
```

#### 标识符
标识符命名规则和Java、C++基本相同。除此以外，可以用`$`作为标识符开头。
```JavaScript
let $jQuery
  , _internal
  , c_style_identifier
  , withNumbers123
```

通常遵循以下的命名规则：

* 常量：下划线和大写单词 – UNDERSCORE_CAPITAlIZED
* 变量、成员函数：驼峰 – camelCase
* 对象构造函数：单词首字母大写 – CapitalizeFirstCharacter
* 内部变量：下划线开头 – _startWithUnderscore

