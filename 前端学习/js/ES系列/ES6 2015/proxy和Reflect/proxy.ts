

let person = {name:"smz",age:20}
/**
 * proxy 代理 13个拦截方法
 * Reflect的静态方法与proxy13个拦截方法对应（参数、方法一致）
 * Reflect（反射）不是一个函数对象，因此它是不可构造的
 * Reflect与Object方法类似
 * Reflect.defineProperty和Object.defineProperty的返回有区别，前者返回true或者false，后者直接抛出异常
 * 支持 对象、数组、函数、set、map
 * 接收两个参数
 * target: 需要代理的对象
 * handler：监听的行为
 *
 */
// @ts-ignore
let personProxy = new Proxy(person, {
    // 赋值
    get(target, key, receiver) {
        if (target.age <= 19) {
            // @ts-ignore
            return Reflect.get(target, key, receiver)
        } else {
            return "未到年龄"
        }
    },
    // 赋值
    set(target, key, value, receiver) {
        return true
    },
    // // 拦截函数调用
    // apply(){
    //
    // },
    // // 拦截in操作符
    // has() {
    //
    // },
    // // 拦截new操作符
    // construct() {
    //
    // },
    // // 拦截forin
    // ownKeys(){
    //
    // },
    // // 拦截Object.defineProperty()
    // defineProperty(){
    //
    // },
    // // 拦截删除操作
    // deleteProperty() {
    //
    // },
    // // 拦截Object.getOwnPropertyDescriptor()
    // getOwnPropertyDescriptor() {
    //
    // },
    // // 拦截Object.isExtensible()
    // isExtensible() {
    //
    // },
    // // 拦截Object.preventExtensions()
    // preventExtensions() {
    //
    // },
    // // 拦截Object.setPrototypeOf()
    // setPrototypeOf() {
    //
    // },
    // getPrototypeOf() {
    //
    // }
});

console.log(personProxy.age)


/**
 * mobx observable 观察者模式
 * react redux Vue VueX 状态管理器
 * observable 观察者
 * autorun 订阅者
 */
// @ts-ignore
const list:Set<Function> = new Set()
const autorun = (cb:Function) => {
    if (!list.has(cb)){
        list.add(cb)
    }
}
const observable = <T extends object>(params: T) => {
    // @ts-ignore
    return new Proxy(params,{
        set(target, key, value, receiver) {
            // @ts-ignore
            const result = Reflect.set(target, key , value, receiver)
            list.forEach(fn => fn())
            return  result
        }
    })
}
