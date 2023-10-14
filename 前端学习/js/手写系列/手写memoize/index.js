/**
 * memoize:
 *   缓存函数的运算结果,在之后更改传入参数的值时,只要参数不变，就会返回之前的缓存结果
 *   函数式编程中，函数的运算过程是没有副作用的，相同的输入永远会得到相同的输出
 *   适用于纯函数：相同的输入永远会得到相同的输出
 *   适用于单参数函数：因为缓存的是参数值，如果是多参数函数，会导致缓存失效
 *
 * @name: memoize
 * @description: 缓存函数的运算结果
 * @type {{a: number, b: number}}
 */

class MemoizeMap {// 缓存类
    constructor() {
        this._map = new Map()
        this._weakMap = new WeakMap()
    }

    _isObject(key) {
        return typeof key === 'object' && key !== null
    }
    set(key, value) {
        if (this._isObject(key)) {
            this._weakMap.set(key, value)
        } else {
            this._map.set(key, value)
        }
    }
    get(key) {
        if (this._isObject(key)) {
            return this._weakMap.get(key)
        } else {
            return this._map.get(key)
        }
    }
    has(key) {
        if (this._isObject(key)) {
            return this._weakMap.has(key)
        } else {
            return this._map.has(key)
        }
    }
}
function memoize(func) {
    function memoized(...args) {
        let key = args[0]// 第一个参数作为kety
        let cacheValue = memoized.cache
        if (cacheValue.has(key)) { // 如果缓存中有key，直接返回
            return cacheValue.get(key)
        }
        let result = func.apply(this, args)
        cacheValue.set(key, result)// 将结果缓存
        return result
    }
    memoized.cache = new MemoizeMap()
    return memoized
}

let object = {a:1,b:2}
let other = {c:3,d:4}

let values = memoize((obj)=>Object.values(obj))
console.log(values(object)) // [1,2]

object.a = 2
console.log(values(object)) // [1,2]
console.log(values(other)) // [3,4]


// 手动更新缓存
values.cache.set(object,['a','b'])
console.log(values(object)) // ['a','b']