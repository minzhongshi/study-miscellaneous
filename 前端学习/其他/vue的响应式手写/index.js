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
 *      2. 依赖收集和派发更新（如何知晓数据对应的函数） effect.js
 *         2.1 依赖收集
 *         依赖收集的时机：在读取数据的时候，会触发依赖收集，将数据和对应的函数建立关系
 *         建立关系数据结构：利用weakMap存储数据和对应的函数，在读取数据时，建立关系数据结构 如图：./数据和函数对应数据结构.png
 *                     在vue中少了一个结构是操作类型的结构（typeMap）。
 *         如何找到对应的函数：在执行某个函数时，将函数交给副作用函数（effect），将当前函数赋值给全局变量activeEffect，在执行完函数后，将activeEffect置为undefined，保证在函数运行期间，activeEffect是有值的，并且是唯一的，会触发依赖收集。
 *                         但是，在派发更新时，直接执行了对应函数，activeEffect是没有值的，导致触发不了依赖的重新收集，所以需要在副作用函数中将整个过程放到一个函数中，并将activeEffect赋值为这个函数，保证在派发更新时，activeEffect是有值的，并且是唯一的，会触发依赖收集。
 *         2.2 派发更新
 *         派发更新的时机：在修改数据的时候，会触发派发更新，找到对应的函数，执行函数
 *         寻找对应的函数：在修改数据或遍历时，会触发派发更新，找到对应的函数，执行函数，注意的是，在删除、新增时，会额外触发迭代属性的派发更新，在getEffectFns函数中，寻找了对应数据操作的函数并返回，在trigger中重新执行函数
 *
 *         2.3 对依赖收集做优化
 *         在重新执行依赖收集时，需要将数据之前对应的函数清空，重新建立关系，这样需要在依赖收集的时候遍历整个关系表去清除，浪费性能
 *         所以在副作用函数effect中为每个effectFn函数添加一个deps属性数组，用来记录该函数在哪些集合里面应用，在依赖收集的时候，将集合传入该属性中，在effectFn 函数内部执行清除依赖函数cleanup，遍历deps数组，清除依赖，最后将dep数组清空，保证在重新执行依赖收集时，只需要清除deps数组即可
 *
 *         2.4 嵌套依赖收集
 *         在父组件嵌套子组件时，子组件在依赖收集结束时，会将 activeEffect 置空，导致后续父组件在修改数据时，无法触发依赖收集。
 *         所以，在这里维护一个执行栈，将当前执行的函数放入栈中，当执行完函数后，将函数从栈中移除，将栈顶函数赋值给activeEffect，保证在执行完子组件依赖收集后，activeEffect是当前父组件的函数。
 *
 *         2.5 依赖收集导致副作用函数栈溢出
 *         在一个函数中，在依赖收集的过程中，反复更新数据，会反复重新执行同一个函数，导致副作用函数栈溢出，所以需要在派发更新的函数中判断是不是同一个副作用函数，如果是，不需要重新执行函数，进行下一次循环
 *
 *         2.6 功能增强
 *         1. 延迟执行，只有在真正需要的时候才执行，在effect函数中增加options属性，在options中增加lazy属性，当lazy为true时，不会在effect函数中执行fn函数，需要手动执行effectFn函数
 *         2. 控制执行的函数，当需要执行的函数很多时，可以通过effect函数options中，配置scheduler属性，将需要执行的函数放入scheduler中，当需要执行函数时，只需要执行scheduler函数即可
 *         3. ref函数，就是在内部，get和set中，调用了effect函数中的track和trigger函数，实现了响应式，所以ref函数返回的是一个对象，对象中有value属性，value属性是一个响应式数据，当修改value属性时，会触发依赖收集和派发更新，这也就解释了为什么在模板中使用ref数据时，不需要.value，而在js中使用时，需要.value。
 *            ref函数在内部判断了数据类型并调用了reactive函数，所以ref函数可以接收对象和基本数据类型
 *         4. computed函数，接收一个函数或者对象，这个参数就是一个副作用函数，对参数进行归一化，需要对副作用函数进行延迟执行，最终返回一个对象，对象中有value属性，value属性就是这个副作用函数执行结果，这也就解释了为什么计算属性需要使用.value进行获取值。
 *            还需要做缓存的操作,定义了value , dirty两个变量，用来记录之前的值和有没有发生变化，在内部判断dirty是否为true，如果为true，执行副作用函数，将结果赋值给value，并将dirty置为false，如果为false，直接返回value
 *            在副作用函数中，需要在scheduler中，将dirty置为true，并触发派发更新，这样在下一次获取值时，会重新执行副作用函数,但在effect函数中，执行render函数时，使用了响应式数据，只会将dirty置为true，并没有建立数据与render函数的响应式关系，所以需要手动建立关系，在get函数中，手动执行副作用函数，建立数据与函数的响应式关系，在dirty置为true之前，需要先将dirty置为false，保证在执行副作用函数时，dirty为true时，派发更新。
 *
 *
 */
import {reactive} from "./reactive.js";
import {ref} from "./ref.js";
import {effect} from "./effect.js";
import {computed} from "./computed.js";
// const obj = {
//     a:1,
//     b:2,
//     // Object.defineProperty('obj', 'c', {get(){return this.a + this.b}})
//     get c(){
//          return this.a + this.b
//     },
//     d:123
// }
// const proxyObj = reactive(obj);
// const arr = [1,obj,2,3];
// const proxyObj2 = reactive(arr);

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

// proxyObj2.push(4)
//
// f()


const obj1 = {
    a:1,
    b:2,
    c:2
}

// const proxyObj3 = reactive(obj1);
// function f1() {
//     if (proxyObj3.a === 1) {
//         proxyObj3.b
//     } else if (proxyObj3.a === 2) {
//         proxyObj3.c
//     }
// }
// effect(f1)
// proxyObj3.a = 2
//
// function f2() {
//     console.log('f2')
//     if (proxyObj3.a === 1) {
//         proxyObj3.b
//     } else {
//         proxyObj3.c
//     }
// }
// effect(f2)
// proxyObj3.a = 2
// proxyObj3.b = 3


// const obj2 = {
//     a:1,
//     b:2,
// }
// const proxyObj4 = reactive(obj2);
// function fn2() {
//     console.log('fn2')
//     const a = proxyObj4.a;
//     const b = proxyObj4.b;
//     for (const key in proxyObj4) {
//     }
// }
// effect(fn2)
// proxyObj4.a = 2
// proxyObj4.b = 3

//嵌套
const proxyObj4 = reactive(obj1);
// function f3() {
//     console.log('f3')
//     effect(() => {
//         console.log('inner')
//         proxyObj4.a
//     })
//     proxyObj4.b
// }
// effect(f3)
// // proxyObj4.a = 3
// proxyObj4.b = 4

// 执行栈溢出
// function f4() {
//     console.log('f4')
//     proxyObj4.a++
// }
// effect(f4)
// proxyObj4.a++

//延迟执行
// function f5() {
//     console.log('f5')
//     proxyObj4.a++
// }
// const effectFn = effect(f5,{
//     lazy:true
// })
// effectFn() // 手动控制执行

//控制执行指定函数
// let isRun = false
// function f6() {
//     console.log('f6')
//     proxyObj4.a++
// }
// const effectFn = effect(f6,{
//     lazy:true,
//     scheduler:(eff)=>{
//         Promise.resolve().then(()=>{
//             if (!isRun){
//                 isRun = true
//                 eff()
//             }
//         })
//     }
// })
// effectFn()
//
// proxyObj4.a++
// proxyObj4.a++
// proxyObj4.a++
// proxyObj4.a++
// proxyObj4.a++
// proxyObj4.a++

// ref
// const state = ref(1)
// effect(()=>{
//     console.log('effect',state.value)
// })
//
// state.value++

// computed
const state = reactive({
    a:1,
    b:2
})
const sum = computed(
    //函数
    ()=>{
    console.log('computed')
    return state.a + state.b
}
//对象
// {
//     get(){
//     ()=>{
//         console.log('computed')
//         return state.a + state.b
//     }
// },
//     set(val){
//     const arr = val.split('+')
//     }
// }
)
effect(()=>{
    console.log('render',sum.value)
})

state.a++
state.a++
state.a++






