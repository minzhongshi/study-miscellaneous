/**
 * null表示无对象
 * undefined表示无值
 * null存在设计层面的缺陷,它的原型对象是object
 */
console.log(typeof null) //object

let a
console.log(a)//undefined

let b= {}
console.log(b.name) // undefined

let c = null// 对象
console.log(c) // null
