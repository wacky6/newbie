[](~
    ctime: 2016-04-11
    mtime: 2016-04-11
    tags:  JavaScript
    keywords: JavaScript, ECMAScript6, basis, tutorial
    description: 'Learn ECMAScript 6: Basis about JavaScript: Object, Prototype, Functional Programming.'
    brief: |
            JavaScript基础：对象、原型、函数式编程。
~)

ES6/New JS：基础（2）
===


## 对象 – object
对象是什么？在Java/C++中：对象是类型的实例化。然而，JS世界中的对象却不能这样定义的（因为JS没有类的概念），它有一个更简单的定义：**［名字–值］的集合（Collection of name-value pair)**，即［名字–值］的对应关系。名字（name），也被称为**键（key，哈希表中的说法）**，是任意字符串或Symbol（ES6）；值（value）是任意对象。；两者在JS标准中，合称为**属性（Property）**，属性还包括一些特性值（attribute），这些值决定属性的操作方式（是否可写、是否可被枚举……）。

写法：由`{}`花括号包裹的若干个以`,`分隔的键值对。键值对用`'key': value`表示。键的名称是合法标识符时，可以省略引号。

键：**任意字符串**。键的名称是合法的JS标识符或关键字时，可以像Java/C++一样用`.`操作符访问。还可以像数组一样用`[]`操作符访问，这种方式可以动态计算键的名称，也可以访问不是合法标识符的键。

值：**任意值**（包括函数）。

```JavaScript
let emptyObject = {}   // 空的对象，不是null
  , obj = { a: 1 }     // 通常都这么写
  , obj2 = {           // 任何字符串都可以做为键
        '': 'key is empty string',
        '😂': 'laugh',
        'attr-key': 'key name with -'
    }

obj.a    // => 1
obj2.attr-key    // (obj2.attr) - (key) => undefined
obj2['attr-key']    // => 'key name with -'
```

ES6引入了Getter/Setter、对象方法、键名计算的缩略写法，会在以后的文章中叙述（也可能弃坑）。

> 如果你熟悉C++/Java，不要用它们的概念来理解JavaScript中的对象，两者是完全不同的。前者是类（Class）的实例化，必须和类一同出现才有意义；否则，它们仅仅是一些二进制数，你无法知道它们的含义。

## 函数


## 原型链 – prototype


## Put them Together
```JavaScript
let GoodStudent = {
    name:  '学霸',
    gotoClass: function(courseName) {
        console.log(`${this.name}去上${courseName}课了`)
    }
}

// 然而，我并不是好学生 xD
let me = { name: 'std::weak' }
me.prototype = GoodStudent
me.gotoClass = function(courseName) {
    if (courseName === 'SQL')
        console.log(`${this.name}拒绝去上没用的课`)
    else
        GoodStudent.gotoClass.call(this, courseName)
}

GoodStudent.gotoClass('SQL')
GoodStudent.gotoClass('软件工程')
// => 学霸去上SQL课了
// => 学霸去上软件工程课了

me.gotoClass('SQL')
me.gotoClass('软件工程')
// => std::weak拒绝去上没用的课
// => std::weak去上软件工程课了
```

