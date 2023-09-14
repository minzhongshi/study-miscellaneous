/**
 * 不改变代码，修改obj对象
 * @type {{get: (function(*): *)}}
 */
let o = (function () {
    let obj = {
        a:1,
        b:2
    }
    return {
        get: function (k) {
            return obj[k]
        }
    }
})()


Object.defineProperty(Object.prototype,'smz',{
    get(){
        return this
    }
})
const obj = o.get('smz')
obj.a= '1234'
console.log(o.get('a'))

// 防护
// 将对象原型置为null
Object.setPrototypeOf(obj,null)
//创建一个没有原型的纯对象
let obj2 = Object.create(null)
// 保留原型链，判断自身是否有属性
// if(obj.hasOwnProperty(k)){
//     return obj[k]
// }
