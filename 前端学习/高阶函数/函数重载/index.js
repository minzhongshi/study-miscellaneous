/**
 * 函数重载
 * 1. 函数名相同，可以定义多次
 * 2. 函数参数不同，参数个数不同或者参数类型不同
 * 3. 函数返回值类型不同
 * 4. 函数重载只是类型的重载，函数实现只有一次
 *
 * 实现：
 *   1.在对象上定义多个同名函数，通过参数个数区分（JQ作者方式）
 *     缺陷：（1）需要定义一个对象，（2）无法很好的适配参数默认（fn.length无法读取到有默认值的参数），（3）不能通过类型来区分
 *
 *   2.利用高阶函数，通过参数类型区分
 */

// 1. 通过参数个数来区分
function addMethod(object, name, fn) {
    const old = object[name]; // 保存原来的函数
    object[name] = function () {// 重写object[name]
        if (fn.length === arguments.length) { // 参数个数相同
            return fn.apply(this, arguments); // 调用新的函数
        } else if (typeof old === 'function') { // 参数个数不同，调用原来的函数
            return old.apply(this, arguments);
        }
    }
}

const obj = {};
addMethod(obj, 'add', function (a, b) {
    return a + b;
})
addMethod(obj, 'add', function (a) {
    return a;
})

console.log(obj.add(1, 2)); // 3
console.log(obj.add(1)); // 1

// 2. 通过参数类型来区分
function createOverload() {
    const fnMap = new Map(); // 保存函数
    function overload(...args) {
        const key = args.join(',');// 通过参数类型作为key
        if (fnMap.has(key)) {
            return fnMap.get(key).apply(this, args);
        } else {
            throw new Error('没有找到匹配的函数');
        }
    }
    overload.addImpl = function (...args) {
        const fn = args.pop();
        if (typeof fn !== 'function') {
            throw new TypeError('最后一个参数必须是函数');
        }
        const key = args.join(',');// 通过参数类型作为key
        fnMap.set(key, fn);
    }
    return overload()
}

const overload = createOverload();
overload.addImpl('number,number', function (a, b) {
    return a + b;
})
overload.addImpl('number', function (a) {
    return a;
})

console.log(overload(1, 2)); // 3
console.log(overload(1)); // 1

