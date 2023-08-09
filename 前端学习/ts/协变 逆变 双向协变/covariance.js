"use strict";
/**
 * 协变 （鸭子类型）
 * 两个不同的对象，其中子类型包含了主类型所有的属性
 * 子类型对象就可以赋值给主类型对象
 */
var a = {
    name: "smz",
    age: 33
};
var b = {
    name: "smz2",
    age: 33,
    sex: "男"
};
a = b; // 协变
