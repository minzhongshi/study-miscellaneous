/**
 * Reflect（反射）:
 *    调用对象的基本方法
 *    在ES6之前，对象的内部方法是不对外开放的，在ES6之后可以通过Reflect直接调用对象内部方法
 *
 *    在普通语法时，调用对象方法会调用封装的方法，在内部再调用对象函数，其中会有其他的一些判断
 *    传递参数除了值以外，还传递了一个Receiver用来处理this指向。将调用这个属性的对象作为Receiver参数。
 *
 *    通过Reflect反射调用方法时可以传递这个Receiver参数，更改this指向
 *
 *  用处：
 *     代理环境中，直接使用普通语法时，在某个属性下存在调用其他属性,此时this指向原对象，不能触发代理对象中的规则，
 *     就不能监听到整个对象，而是某个属性
 *     想要监听整个对象，就要将将监听的对象的所有this变为代理对象，这里就使用反射来完成
 *     在Vue3响应式数据的完成就是通过反射来完成的
 *
 *     在使用一些方法时，往往有许多限制。比如调用Object.keys()读取对象key时，对象中不可枚举的以及Symboy属性的键值读取不到
 *     因为在调用内部方法[[OwnPropertyKeys]]()时，同时还做了一些判断，将不可枚举和键不是字符串的都剔除了
 *     利用反射的ownKeys()方法就能直接调用对象方法而不做其他判断
 */

const obj ={}
// obj.a = 3 // { a: 3 }
Reflect.set(obj,'a',3) // { a: 3 }
console.log(obj)

const obj2={
    a:1,
    b:2,
    get c(){
        return this.a +this.b
    }
}
console.log(obj2.c) // 3

const r = Reflect.get(obj2,'c',{a:3,b:4})
console.log(r) // 7

const p = new Proxy(obj2,{
    get(target, key, receiver) {
        console.log('read',key)
        // return target[key] // 普通调用形式
        return Reflect.get(target,key,receiver)// 此时在属性c下的a和b都触发了
    }
})
// target[key]===> read c
// Reflect.get(target,key,receiver) ===>read c; read a; read b;
p.c

const obj3 = {
    a:1,
    b:2,
    [Symbol('c')]:3
}
Object.defineProperty(obj3,'d',{
    value: 4,
    enumerable:false
})
console.log(Object.keys(obj3))// [ 'a', 'b' ]
console.log(Reflect.ownKeys(obj3))// [ 'a', 'b', 'd', Symbol(c) ]




