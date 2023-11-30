/**
 * 构造函数：
 *
 * 构造函数需要传递一个函数executor，用来表示开启一个任务,该函数的执行需要用try...catch包裹，因为executor中可能会有错误，如果有错误，需要调用reject
 * 注：Promise只能捕获同步错误，不能捕获异步错误。
 *
 * executor调用时传入resolve和reject，不再外层写resolve和reject，而是在构造函数constructor中写，是因为resolve和reject中会使用this，而this指向取决于调用方式
 * resolve和reject的调用方式是直接调用，所以this指向window，而不是该实例，而在constructor中，this指向该实例，如果使用bind绑定this，也会新生成函数，所以不如直接在constructor中定义
 *
 * Promise状态只能改变一次，所以在resolve和reject中需要判断状态，如果状态已经改变，就不再执行，写一个辅助函数#changeState用来判断状态是否改变。
 * resolve和reject的参数是data和reason，data表示成功的数据，reason表示失败的原因，可不传。
 *
 * Promise内部有状态属性state和值属性result，分别表示状态和值，这两个属性都是私有的，外部无法访问，所以用 #标记或者symbol来表示私有属性
 * Promise的状态有三种：pending、fulfilled、rejected
 *   pending：初始状态，既不是成功，也不是失败状态。
 *   fulfilled：意味着操作成功完成。
 *   rejected：意味着操作失败。
 *
 * Promise的状态只能从pending转变为fulfilled或rejected，且状态一旦改变，就不会再变。
 */

/**
 * then方法：
 *
 * then方法接收两个参数，onFulfilled和onRejected，分别表示成功的回调和失败的回调。
 *
 * 返回的依然是一个Promise实例，所以可以链式调用，所以需要在then方法中返回一个Promise实例，该实例的状态和值由onFulfilled和onRejected的返回值决定。
 *
 * 需要解决两个问题：
 *  1、何时调用then方法中的回调函数onFulfilled和onRejected方法？
 *  2、then方法返回的Promise何时完成或失败？
 *
 *
 *   当用了异步代码时，Promise的状态还是pending，所以需要在异步代码执行完后，再调用onFulfilled和onRejected方法，所以需要在then方法中将onFulfilled和onRejected方法存起来，等到异步代码执行完后，再调用。
 *
 *   创建一个属性handlers,用来存储onFulfilled和onRejected方法，该属性是一个数组，因为可能会有多个then方法，每个then方法都会有onFulfilled和onRejected方法。
 *
 *   创建一个run方法，用来执行onFulfilled和onRejected方法，该方法需要在Promise状态改变后执行，所以需要在#changeState和then中调用run方法。
 *   循环handlers数组，取出onFulfilled和onRejected方法，然后执行。
 *   run方法中需要判断Promise的状态，如果是fulfilled，就执行onFulfilled方法，如果是rejected，就执行onRejected方法。并且判断传递的是不是函数，如果不是函数，就忽略。
 *
 *   当传递成功回调和失败回调不是函数时，将当前Promise的状态和值传递给下一个Promise，这样就可以实现状态的穿透。
 *
 *   当传递成功回调和失败回调是函数时，需要处理错误，如果onFulfilled和onRejected方法执行时出错，直接执行reject方法，将错误传递给下一个Promise。
 *
 *   当传递成功回调和失败回调是Promise时，需要将该Promise执行结果传递给当前Promise。
 *
 *   当执行then方法的回调时，需要放在微队列中执行。
 */

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
class MyPromise {
    #static = PENDING // 存储状态
    #result = undefined // 存储成功或失败的值
    #handlers = [] // 存储成功或失败的回调集合
    constructor(executor) {
        const resolve = (data) => {
            this.#changeState(FULFILLED, data)
        };
        const reject = (reason) => {
            this.#changeState(REJECTED, reason)
        };
        try {
            executor(resolve, reject);
        } catch (err) {
            reject(err)
        }
        executor(resolve, reject);
    }

    /**
     * 状态是否改变
     * @param state
     * @param result
     */
    #changeState(state, result) {
        if (this.#static !== PENDING) return;
        this.#static = state;
        this.#result = result;
        this.#run();
    }

    /**
     * then方法中的回调函数放入微队列中执行
     * queueMicrotask()方法将一个函数排队添加到微任务队列中
     */
    #runMicroTask(func) {
        if (typeof func !== 'function') return;
        queueMicrotask(func)
    }

    /**
     * 判断是否为Promise
     */
    #isPromiseLike(value) {
        return value instanceof MyPromise || (typeof value === 'object' && value !== null && typeof value.then === 'function')
    }

    /**
     * 处理回调
     */
    #runOne(callback, resolve, reject){
        this.#runMicroTask(() => {
            if (typeof callback !== 'function') {
                const settled = this.#static === FULFILLED ? resolve : reject;
                settled(this.#result);
                return
            }
            try {
                const result = callback(this.#result);
                if (this.#isPromiseLike(result)) {
                    result.then(resolve, reject)
                }else {
                    resolve(result)
                }
            }catch (err) {
                reject(err)
            }
        })
    }

    /**
     * 执行回调
     */
    #run() {
        if (this.#static === PENDING) return;
        while (this.#handlers.length) {
            const {onFulfilled, onRejected, resolve, reject} = this.#handlers.shift();
            if (this.#static === FULFILLED) {
               this.#runOne(onFulfilled, resolve, reject)
            } else {
                this.#runOne(onRejected, resolve, reject)
            }
        }
    }
    then(onFulfilled, onRejected) {
        return new MyPromise((resolve, reject) => {
            this.#handlers.push({
                onFulfilled,
                onRejected,
                resolve,
                reject
            })
            this.#run();
        })
    }
    catch(onRejected) {
        return this.then(undefined, onRejected)
    }
    finally(onFinally) {
        return this.then(onFinally, onFinally)
    }
}

// const p = new Promise((resolve, reject) => {
//     resolve(1)
// })

const p = new MyPromise((resolve, reject) => {
    resolve(1)
})
p.then((data) => {
    console.log(data)
    return 2
}).then((data) => {
    console.log(data)
    return new MyPromise((resolve, reject) => {
        resolve(3)
    })
}).then((data) => {
    console.log(data)
    throw new Error('error')
}).then((data) => {
    console.log(data)
}).catch((err) => {
    console.log('catch:',err)
}).finally(() => {
    console.log('finally')
})
