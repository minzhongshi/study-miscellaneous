/**
 * 协变 （鸭子类型）
 * 两个不同的对象，其中子类型包含了主类型所有的属性
 * 子类型对象就可以赋值给主类型对象
 */

// 主类型
interface A {
    name:string
    age:number
}

//子类型
interface B {
    name:string
    age:number
    sex:string
}

let a:A = {
    name:"smz",
    age:33
}

let b:B = {
    name:"smz2",
    age:33,
    sex:"男"
}
a = b // 协变
