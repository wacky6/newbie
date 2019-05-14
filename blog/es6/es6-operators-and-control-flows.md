[](~
    ctime: 2016-04-11
    mtime: 2016-04-11
    tags:  JavaScript
    keywords: JavaScript, ECMAScript6, basis, tutorial
    description: 'Learn ECMAScript 6: Basis about JavaScript: Operator, Control Flow.'
    brief: |
            JavaScript基础：运算符、控制语句
~)



#### 自动类型转换（Automatic Type Conversion）
当操作符的操作数类型不匹配时，会发生自动类型转换。

大多数操作符有**期望类型**，操作数会被自动转换到该类型。

* `+`：两个操作数都是数字或布尔值时，转换成数字，进行加法运算。否则，转换为字符串，然后连接。
* `-`、`*`、`/`：转换为数字
* `&&`、`!`：转换为布尔值
* `||`：没有要求
* `<<`、`>>`、`>>>`：转换为32位整数，小数会被截断


类型转换会按照以下规则：（参考[w3schools.com](http://www.w3schools.com/js/js_type_conversion.asp)）

[](< .ul-align >)
| 原始值      | => number | => string   |
|------------|-----------|-------------|
| `false`    | `0`       | `'false'`   |
| `true`     | `1`       | `'true'`    |
| `NaN`      | `NaN`     | `'NaN'`     |
| `Infinity` | `Infinity`| `'Infinity` |
| `123`      | `123`     | `'123'`     | 
| `''`       | `0`       | `""`        |
| `'123'`    | `123`     | `'123'`     |
| `'str'`    | `NaN`     | `'str'`     |
| `null`     | `0`       | `'null'`    |
| `undefined`| `NaN`     | `'undefined'` |



## 操作符
// TODO:: !!!!
JS的操作符与Java/C++中的操作符基本相同。在前面各基本类型的说明中已经讲了一些。这里重新说明一下需要注意的几个：

* `+`（二元操作符）与字符串运算时（除了undefined），总是返回字符串。不是字符串的操作数会被转换为字符串。相当于字符串连接操作
* `+`（一元操作符）可以把字符串转换为数字
* `=`赋值操作；`==`相等判定，**进行类型转换**；`===`全等判定（也称**强相等**、身份判定–Identity），**不进行类型转换**
* `>>`保留符号位（算数右移）；`>>>`不保留符号位（逻辑右移）
* `||`返回第一个真值，不一定是`true`或`false`

运算符规则、优先级、作用与Java/C++相同。但注意以下几点：

* 两个整数相除，结果为浮点数时，不会截断为整数
* `>>`表示**带符号位右移**：相当于对`int32_t`做`>>`操作
* `>>>`表示**0填充右移**：相当于对`uint32_t`做`>>`操作，再类型转换回`int32_t`

```JavaScript
3 / 2       // => 1.5
(1<<31) >>  1  // => -1073741824
(1<<31) >>> 1  // => 1073741824
```

你也可以使用一元操作符`+`将字符串转换成数字（注意与二元`+`的区别）：

````
(+'2') + 3  // => 5
````

`===`（强相等）：操作数类型不同时，结果为false；操作数为数字、字符串、布尔值、null、undefined时，判断两者值是否相等（`NaN===NaN`为false）。操作数为对象时，判断操作数是否是同一个对象。

`==`（相等）：操作数类型相同时，等价于`===`；操作数类型不同，但不是`null`或`undefined`时，将两者转换成number，然后进行`===`。

因为JS弱类型的特点，使用`==`会产生令人误解的结果。在涉及比较操作时，应全部使用`===`进行强相等比较。（事实上很多人觉得JS不应该设计这样的`==`操作符）

```JavaScript
// 为什么不要用==进行相等性比较
0 == ''              // => true
1 == '1'             // => true
null == undefined    // => true
true == 1            // => true
true == 2            // => false !!

// 下面三行只是一个例子，请不要使用new String()！
// 两个值为'a'的String对象不是同一个对象
new String('a') == a    // => true
a == new String('a')    // => true
new String('a') == new String('a')  // => false !!

// 应该用强相等进行比较，这通常是我们期望的语义
0 === ''             // => false
1 === '1'            // => false
null === undefined   // => false
true === 1           // => false
true === 2           // => false

// 判断标识符是否指同一对象
let a = {}, b = {}
let alias = a
a === alias    // => true
a === b        // => false
```

`<`、`>`（优先次序判定，Precedence Predict）：如果操作数都是数字，比较数字大小；如果操作书都是字符串，按照字典序比较（与C中的strcmp()相同）；否则，将操作数转换为数字，然后进行比较。如果与`NaN`比较，结果为`undefined`。

```JavaScript
1 < 2           // => true
1 < Infinity    // => true
1 < NaN         // => undefined ~= false
Infinity < Infinity     // => false
-Infinity < -Infinity   // => false

'abc' < 'abcd'   // => true
'ab' < 'cd'      // => true
'9' < '10'       // => false  字典序比较
'09' < '10'      // => true
```

关于比较运算、优先级运算（关系比较运算）的准确定义请参考[ECMAScript标准](http://www.ecma-international.org/ecma-262/5.1/)。


## 控制语句
`if`–`else`、`for`、`while`、`do`–`while`与Java/C++的完全相同。`switch`–`case`支持字符串，其他部分与Java/C++相同（包括break和fall-through）。

JS还支持`for-in`、`for-of`循环，会在以后介绍。


