[](~
    ctime: 2016-04-11
    mtime: 2016-04-12
    tags:  JavaScript
    keywords: JavaScript, ECMAScript6, basis, tutorial, type
    description: 'Learn ECMAScript 6: Getting quickstarted. Fundamental types: number, boolean, string.'
    brief: |
            JavaScript环境配置、基本类型：number、boolean、string
~)

ES6/New JS：基础（1）
===

## 环境配置
几乎任何文本编辑器都可以编辑JS代码。至于IDE看你自己的喜好。对于初学者，功能越简单越好，支持语法高亮和单词级补全就可以了。

个人推荐：

* [Notepad++(Windows)](https://notepad-plus-plus.org)
* [Github Atom](https://atom.io)

不管使用哪个编辑器，**字符编码必须使用UTF-8**。

对于Windows记事本、Mac的TextEdit：保存时选择编码：UTF-8。其他IDE大多默认为UTF-8，一般在首选项中可以检查或修改。

想要运行JS，你还需要一个运行环境。如果你想在前端、Web发展，建议用最新版的[Chrome](https://www.google.com/chrome/)；如果你想在后端、全栈发展，建议用最新版的[node.js](http://nodejs.org)。

在浏览器环境下，你需要了解HTML的基本结构，知道用`<script>`标签嵌入脚本的方法。在node.js环境下，你需要掌握终端（Shell）的使用，能够通过命令行调用node.js。

下文以node.js/Linux为基础。

## Hello World!
```JavaScript
'use strict'
console.log('Hello World!')
```

1. 把上面两行内容保存到文件。比如`hello-world.js`
2. 打开终端窗口，切换到文件所在目录。比如`cd ~/learn-es6/`
3. 执行：`node hello-world`

你应该看到终端窗口输出：`Hello World!`

#### 解释
JS程序不像C++/Java一样需要main函数标识入口点。执行时，JS解释器会执行文件中的每一条指令，如果完成后，事件循环没有待发生事件，程序终止；否则，等待事件发生。

`'use strict'`是一个特殊的指令。当它是JS源码的**第一个表达式**时，解释器会进入**严格模式（Strict Mode）**。严格模式下，一些”不好的“特性被禁止，语法分析会更严格。这个功能在ES5被引入，方便向新版JS过渡。**要使用ES6或更新的JS版本，必须进入严格模式。**下文所有的代码都需要在严格模式下执行。

`console`是一个全局对象，由JS解释器提供。在浏览器中表示控制台（你可以按F12或Cmd+Opt+I打开开发者工具，切换到Console面板；在node.js中表示标准输出（stdout），也就是终端窗口的输出。

`log`是`console`对象的一个方法（Method，也称作函数，Function），它可以将参数以字符串格式输出。`('Hello World!')`表示以`'Hello World'`为参数，调用方法。

在C++中，上面 Hello World 的实现可能是这样：
```C++
#include <iostream>
using namespace std;
int main() {
    cout<<"Hello World!"<<endl;
}
```

## 基础 / Basis

JS中很多的关键字、控制结构、字面值（Literal Value）写法与C++/Java相同。

你可以在node.js的REPL（Read-Eval-Print-Loop）中玩耍本文的代码（在终端窗口输入`node`并执行）。在REPL中，每个输入表达式会被求值，并输出结果。


#### 标识符（变量/常量）声明
```JavaScript
let   variable = 123
const constant = 'JavaScript'
```

`let`、`const`遵循块作用域（Block Scope），与C++、Java的变量声明相同。

以前（ES5时代），只能用`var`来声明标识符。它遵循函数作用域（与我们熟悉的语言不同！声明会被移到函数或源码的开头）。ES6引入`let`和`const`后，几乎没有什么地方还会使用它。

如果你对var挖出来的坑感兴趣，可以看[这篇文章](http://www.2ality.com/2011/02/javascript-variable-scoping-and-its.html)。

**ES6下，几乎任何时候都应该使用let或const**



#### 基础类型（Primitive Types）
* 数字 – number
* 布尔 – boolean
* 字符串 – string
* 对象 – object
* null
* undefined
* symbol (ES6)

你可以用typeof运算符检查类型，像这样：`typeof someVariable`。结果会是一个表示类型的字符串。

你可以用`Number`、`Boolean`、`String`函数将一个表达式转换成对应的基本值（Primitive）。但加上`new`操作符时，结果是一个对象。**两者不等价！**这个特性会让新手感到困惑，会导致糟糕的问题。通常，不要显示地进行类型转换，JS解释器会在需要的时候自动转换。

```JavaScript
let a = Number(123)      // => 123
let b = new Number(123)  // => 值为123的Number对象
typeof a    // => 'number'
typeof b    // => 'object'
a === b     // => false
```

你可能会感到困惑，函数、数组并不在是基本类型。事实上，它们都是对象：**在`Object`基础上“扩展”出来的对象**。这在对象和原型链部分会进一步解释。

JS的弱类型一方面带来了很高的灵活性（你可以写出很漂亮的代码）；另一方面，也会成为程序员的噩梦（尤其对新手来说）：因为缺少类型检查（也可以说是提示），你可以写出语法正确、但毫无意义的表达式（比如`new Date(true)`、你也不能限定函数参数的类型，如果你需要实现API，在函数内**对参数类型进行检查是必要的**。

[](< .note >)
> 部分JS引擎中`typeof null`是`'object'`，但根据标准应该是`null`。
>
> 如果你很喜欢类型系统，可以去看看[TypeScript](http://typescriptlang.org)。但这个类型系统不过是骗骗自己（与Java模版的类型类似，仅仅是提示作用），所以我不推荐它。

#### null、undefined
`null`表示**已定义，但没有值（刻意留空）**；`undefined`表示**未定义或未初始化的值**。

声明但没有被赋值的标识符的值为`undefined`。

```JavaScript
let a
console.log(a)    // 输出：undefined
```


#### 数字 – number
数字为双精度浮点数（对应Java/C++中的`double`），其绝对值小于`(2^53)`时，可以被精确表示。

你可以用十进制、八进制（**`0o`前缀**）、十六进制（**`0x`或`0X`前缀**）表示整数值，但**不能以`0`开头**（这是ES5中8进制的写法，现在已经不允许使用）：
```JavaScript
let dec =   11    // => 11
let oct = 0o11    // => 9
let hex = 0x11    // => 17
```

浮点数只能用十进制表示。小数点前的0可以省略，但一般建议写上。
```JavaScript
let num1 = 0.5
let num2 =  .5    // this is ok, => 0.5
```

表示是十制数时可以用科学技术法的[E标注（E notion）](https://en.wikipedia.org/wiki/Scientific_notation#E_notation)，用`e`或`E`后缀表示数量级：
```JavaScript
let e_notion_1 = 1e4    // => 10000
let e_notion_2 = 1e-4   // => 0.0001
```

浮点数标准规定了两个特殊值：NaN、Infinity。前者表示**不是数值（Not a Number）**，后者表示**无穷（Infinity）**，可以在前面加上`-`、`+`表示符号。NaN与任何值都不相等（即便`NaN===NaN`）；与任何数值进行计算，结果都是NaN。Infinity与任何数值进行运算操作结果仍是Infinity；Infinity与Infinity进行运算，结果是NaN。
```JavaScript
NaN + 1        // => NaN
NaN === NaN    // => false
Infinity + 1e10         // => Infinity
Infinity - Infinity     // => NaN
-Infinity + 123456      // => -Infinity
```

你可以用`parseInt(str, radix)`函数将一个字符串以**给定进制**转换为整数。如果不提供进制信息，JS会根据字符串推断：
```JavaScript
parseInt(10.1)    // => 10
parseInt(10, 16)  // => 16，先转换为字符串'10'，再按照16进制转换
parseInt('0x10')  // => 16，0x为16进制前缀
parseInt('ff apples', 16)    // => 255，转换到第一个不符合进制规则的字符
parseInt('not a number', 10) // => NaN，不是数字

// 以下两个例子说明radix参数的必要性
parseInt('077') // => 63，	未定义行为。0为8进制前缀
parseInt('087') // => 87，未定义行为。0为8进制前缀
```

你可以用`parseFloat`或`Number`函数将一个字符串转换成浮点值：
```JavaScript
parseFloat('-1e3')    // => -1000
Number('1e-4')        // => 0.0001
```

比较浮点数相等的时候，请务必考虑误差。推荐的方式是：
```JavaScript
function isNumberEqual(a, b) {
    // Number为全局对象，提供了与数字类型相关的方法和常量
    // Number.EPSILON为能表示的浮点数之间最小的间隔
    return (Math.abs(a - b) < Number.EPSILON)
}
```

全局对象`Math`提供了常见的数学计算函数，与C++的cmath头文件类似，比如正弦、乘方。详细说明参见[MDN-Math对象](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math)。

数字支持算数运算（`+`、`-`、`*`、`/`）和位运算（`~`、`&`、`|`、`^`、`<<`、`>>`、`>>>`），运算符与Java/C++中的基本相同。进行位运算时，数字会被当作**32位有符号整数**。

[](< .note >)
> 实际上，大多数JS引擎会先把整数当作32位整数处理（提高运算速度），直到执行了不可能在32位整数上执行的操作，或者超过了范围。
> 
> 如果你想了解`2^53`、`+0`、`-0`、`Infinity`的来历，可以去了解[浮点数的原理和实现](https://en.wikipedia.org/wiki/IEEE_754-2008)。
> 
> 完整的parseInt说明：[MDN-parseInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt)



#### 布尔 – boolean
`true`和`false`分别表示真和假，涉及布尔运算时：

* `false`、`null`、`undefined`、`0`、`NaN`、`''`（空字符串）被视作`false`
* 其他所有值被视作`true`

`!`、`&&`、`||`分别表示逻辑非、逻辑与、逻辑或。`!`、`&&`的结果一定是`true`或`false`，`||`的结果是**第一个真值**（truthy，被视为true的值）。

`||`常用来设置函数参数的默认值。在ES6引入参数默认值后，这种用法逐渐减少。

前面说过，用`Boolean(expr)`可以将表达式转换为布尔值；用`new Boolean(expr)`会创建一个值为`true`或`false`的Boolean对象，这个对象会被视为`true`。

```JavaScript
let a = false, b = null, c = 'truthy', d = true
(a || b || c || d)    // => 选出第一个真值：'truthy'

// 不要这么写：
if ( new Boolean(false) ) { /* 这里的代码 会   执行！ */}
if ( Boolean(false) )     { /* 这里的代码 不会 执行！ */}
```



#### 字符串 – string
根据Unicode标准，**字符**由其**码点（Code Point）**标识，码点是一个整数，最多32位。码点可以用多个长度确定（比如8位，16位）的**码元（Code Unit）**表示。

JS中的字符可以用单引号、双引号、反引号表示，前两者语义上没有任何区别，后者表示模版字符串。模版字符串用来嵌入表达式的值。

JS没有字符类型，通常用包含一个字符的字符串表示它。涉及字符串的方法不区分字符与字符串。

```
// 以下两种写法没有区别
let str1 = 'quoted'
let str2 = "quoted"

let num = 123
let template = `Number is: ${num}`  // => 'Number is: 123'
```

JS中，字符串由UTF-16码元（每个码元占16位）组成。大多数字符占用1个码元，少数罕见的字符、符号占用2个码元。字符串的**`length`属性（不是方法！）**表示**字符串的长度**，是UTF-16码元的数量，与**字符数量**的不同：

```
'word'.length    // 4码元，4字符
'汉字'.length    // 2码元，2字符
'😂'.length      // 2码元，1字符
'𠮷'.length      // 2码元，1字符
```

严格来说，操作字符时要判断双码元字符。但**通常不需考虑**这种情况，UTF-16码元覆盖了**世界上大多数语言的常用字符**（对中文来说，包括了GBK中的所有字符）。因此，一般认为码点和码元是等价的（即一个码元就是一个字符）。

JS字符串最强大的地方在于内建的**正则表达式**功能。利用它你可以方便的进行格式验证、提取信息、查找替换。一些方法仅支持正则表达式，它的参数会被**隐式转换**成正则表达式，新手可能会搞混`indexOf`和`search`方法。两者都返回子串的位置，前者进行字符串查找，后者进行正则表达式匹配。

JS的字符串支持支持大多数Java中的字符串方法。完整的列表可以在[MDN-String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)查阅。所有方法都**不会修改**被操作字符串的值。

常用的方法如下：

```JavaScript
// a为操作的字符串，str为字符串参数，regexp为正则表达式

// 查找、替换：
a.includes(str)    // a是否包含str
a.startsWith(str)  // a是否由str开始
a.endsWith(str)    // a是否由str结束
a.indexOf(str)     // str在a中的位置，如果不在返回-1
a.match(regexp)    // 验证a是否符合regexp的形势
a.search(regexp)   // regexp在a中的位置，如果不在返回-1
a.replace(str, replaceStr)  // 用replaceStr替换str
    // str也可以是正则表达式
    // replaceStr可以是函数： (match)=>result
    //   match为regexp匹配到的字符串，result为替换字串
    //   你可以用这个方法进行复杂的变换

// 子串截取：
//   beg为开始位置，可以为负数
//   end为结束位置，可以为负数
//   start为开始位置，必须 >= 0
//   len为子串常度
//   beg、end为负数时，表示从字符串尾部开始计数
//   以下三个函数的第二个参数可以省略，默认截取到字符串尾部
//   子串不包含end位置的字符，但包括beg位置的字符
//   截取子串，直到满足end、len的条件 或 遇到字符串尾部
//     => 不会像C++一样报越界错误
a.substr(beg, len)
a.slice(beg, end)
a.substring(start, end)

// 变换：
a.trim()    // 去掉两侧的空白字符（正则表达式\s字符组）
            // 包括：空格、tab（\t）、换行符（\n、\r）等
a.toLowerCase()     // 转换为小写
a.toUpperCase()     // 转换为大写
a.split(str|regexp) // 以str或regexp分隔字符串，返回数组
```

UTF-16的设计是效率与正确性的折衷。目前认为，编码最好的方法是使用UTF-8（每个字符需要1-6个码元编码），但因为它是**变长编码（Variable Length Encoding）**，在处理时需要**判定字符边界**，或者转换成**定长编码（Fixed Length Encoding）**。前者对程序猿很不友好，后者占用额外空间。

如果用定长编码表示全部Unicode字符，即UTF-32，每个字符占用4字节空间。单词`word`需要16字节，这是十分浪费的。而日常使用的字符仅占全部Unicode字符的一部分。所以就有了UTF-16这样**包括绝大多数常用字符**的设计方式：在绝大多数情况下保持正确，既对程序猿友好，也不需要太多额外空间。

`+`（连接操作符）可以将字符串与任何对象连接（Concatenation）。**任何值与字符串做`+`操作，结果都是字符串**：
```JavaScript
3 + '2'                  // => '32'
7 + ' apples'            // => '7 apples'
'string ' + undefined    // 'string undefined'

// DOM：没有明显的类型提示，稍不注意就变成字符串连接了
element.getAttribute('data-number') + 1 
```

对象的字符串表示由`toString()`方法提供，你可以修改这个方法。（在对象、原型链中会说明）

[](< .note >)
> 如果你有兴趣了解UTF-16码元的覆盖情况，可以参考[Unicode编码平面](https://en.wikipedia.org/wiki/Plane_%28Unicode%29)。关于Unicode系列编码的比较，可以参考[Unicode编码比较](https://en.wikipedia.org/wiki/Comparison_of_Unicode_encodings)。
>
> UTF-16作为一种数据处理格式是合适的。但在数据传输、存储（比如数据库、HTTP）的时候**必须使用UTF-8**。


