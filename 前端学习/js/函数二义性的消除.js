//函数有两种含义（函数二义性）
// （1）流程
// （2）当作构造函数，当作创建对象的过程

// 定义构造函数使用class 关键字，消除构造函数的二义性
// class关键字使得构造函数无法通过普通函数调用，必须new，否则报错
class Fn {}
new Fn()

// 普通函数消除二义性,利用new.target关键字判断
// 当是流程调用时new.target是没有值的
// new方式调用new.target是有值的

function fn() {
    if (new.target){
        throw new Error('只能通过普通函数方式调用')
    }
}
fn()