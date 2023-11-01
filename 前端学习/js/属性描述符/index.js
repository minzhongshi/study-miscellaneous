/**
 * 对象属性的描述由很多，比如：可遍历、可枚举、可写、可配置等等
 * 通过Object.getOwnPropertyDescriptor(obj,prop)可以获取属性描述符
 *    value: 1, ====> 属性值
 *    writable: true, ====> 可写
 *    enumerable: true, =====> 可枚举
 *    configurable: true =====> 可配置
 * 通过Object.defineProperty(obj,prop,desc)可以设置属性描述符
 *    obj: 目标对象
 *    prop: 属性名
 *    desc: 属性描述符(对象)
 *
 *  通过Object.freeze(obj)可以冻结对象，防止修改对象属性
 *  通过Object.seal(obj)可以密封对象，防止删除对象属性
 *  通过Object.preventExtensions(obj)可以阻止对象扩展，防止添加新属性
 *  通过Object.isFrozen(obj)可以判断对象是否冻结
 *  通过Object.isSealed(obj)可以判断对象是否密封
 *  通过Object.isExtensible(obj)可以判断对象是否可以扩展
 *  通过Object.keys(obj)可以获取对象的可枚举属性
 *  通过Object.values(obj)可以获取对象的可枚举属性值
 *  通过Object.entries(obj)可以获取对象的可枚举属性和属性值
 *  通过Object.assign(obj1,obj2)可以将obj2的属性复制到obj1上
 *  通过Object.getOwnPropertyNames(obj)可以获取对象的所有属性
 *  通过Object.getOwnPropertySymbols(obj)可以获取对象的所有Symbol属性
 *  通过Object.getPrototypeOf(obj)可以获取对象的原型对象
 *  通过Object.setPrototypeOf(obj,prototype)可以设置对象的原型对象
 *  通过Object.create(prototype,desc)可以创建一个对象，指定原型和属性描述符
 *
 * @description 属性描述符
 * @type {{a: number, b: number}}
 */
let obj = {
    a:1,
    b:2
}

// 可枚举
// for (let key in obj) {
//     console.log(key)
// }
// 可遍历
// console.log(Object.keys(obj))

// 可写
// obj.a = 2

// 可配置
// delete obj.a

// 属性描述符
let desc = Object.getOwnPropertyDescriptor(obj,'a')
console.log(desc) // { value: 1, writable: true, enumerable: true, configurable: true }

// 设置属性描述符
Object.defineProperty(obj,'a',{
    value: 100,
    writable: false,
    enumerable: false,
    configurable: false,
    get() {
        console.log('get')
    },
    set(value) {
        console.log('set')
    }

})
console.log(obj.a) // 100
