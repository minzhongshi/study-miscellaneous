/**
 * vue的响应式手写
 *  1. 通过Object.defineProperty() 监听对象的属性变化，监听过于狭窄，只能监听对象的属性变化，不能监听数组的变化
 *  2. 通过Proxy监听对象的变化，可以监听对象和数组的变化
 *
 *  vue的响应式：函数运行过程中用到的响应式数据建立对应关系，当数据变化时，执行对应的函数。
 *      1. 监听数据的读取和修改 handlers.js
 *         1.1 监听
 *           (1)判断数据是否是对象，如果是对象，递归监听
 *           (2)判断数据是否是数组，如果是数组，对数组的方法进行重写，重写后的数组进行监听
 *           (3)如果不是对象和数组，直接监听
 *           (4)利用weakMap存储数据和对应的函数
 *           (5)利用proxy监听数据的读取和修改
 *         1.2 读信息
 *            依赖收集时，使用Reflect，对象和数组的方法可能会修改数据，修改数据时，this指向原对象，不会触发依赖收集，所以需要使用Reflect，使this指向代理对象
 *         1.3 写信息
 *            与读信息类似的，需要注意的时，要判断特殊情况，比如：冻结对象和没有set方法的对象
 *         1.4 数组处理
 *            重写数组的方法，由于数组被代理了，所以在调用数组方法的时候，调用的是代理对象中的方法，某些情况需要操作原始数组，比如：'includes', 'indexOf', 'lastIndexOf'
 *             两种方式（vue中使用了第二种）：
 *             (1) 将原始对象变为代理对象
 *             (2) 在使用代理对象方法找到不到的情况下，再到原始对象中查找,弊端：需要遍历完整的代理对象
 *
 *            当满足下面三个条件，length属性不会触发派发更新，所以需要在set方法中判断是否是添加属性，如果是添加属性，需要手动触发length属性的变化,原因是：length的变化在内部是通过隐式方法实现的，不会触发依赖收集 Object.defineProperty(proxyObj2, 'length', {value: 6})
 *            例子：在使用不存在下标添加属性时，如：arr[5] = 5
 *            1.设置对象是一个数组
 *            2.设置前后length发生变化
 *            3.设置的不是length属性
 *
 *            当设置数组length属性时，数组元素的删除与新增不会触发派发更新，所以需要手动触发派发更新
 *
 *            当使用数组的'push', 'pop', 'shift', 'unshift', 'splice'方法时，length属性会触发依赖收集，但这是没有必要的，所以有两种方式解决（Vue使用了第二种）：
 *            1. 重写数组的'push', 'pop', 'shift', 'unshift', 'splice'方法，不触发依赖收集
 *            2. 在触发依赖收集时，判断是否是'push', 'pop', 'shift', 'unshift', 'splice'方法，如果是，不触发依赖收集
 *
 *      2. 派发更新（如何知晓数据对应的函数） effect.js
 */
import {reactive} from "./reactive.js";
const obj = {
    a:1,
    b:2,
    // Object.defineProperty('obj', 'c', {get(){return this.a + this.b}})
    get c(){
         return this.a + this.b
    },
    d:123
}
const proxyObj = reactive(obj);
const arr = [1,obj,2,3];
const proxyObj2 = reactive(arr);

// Object.defineProperty(proxyObj2, 'length', {value: 6})
// proxyObj2[5] = 5
function f() {
    // proxyObj.c;
    // proxyObj.a = 2;
    // 'c' in proxyObj;
    // delete proxyObj.d;
    // Object.keys(proxyObj);
    // proxyObj2.includes(obj)
    // proxyObj2.indexOf(obj)
    // console.log(proxyObj2.length)
}

// proxyObj2.length = 7
// console.log(proxyObj2)

proxyObj2.push(4)

f()