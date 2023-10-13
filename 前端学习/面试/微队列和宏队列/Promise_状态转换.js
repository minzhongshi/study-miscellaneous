/**
 * Promise只有在pending状态下才能转换为其他状态,并且转换之后不再改变
 * Promise的状态转换只能是pending->fulfilled或者pending->rejected
 * Promise的状态转换不受外界影响
 * Promise不发生状态转换，不会执行then方法
 *
 * @type {Promise}
 */
const promise = new Promise((resolve, reject) => {
    console.log(1);
    console.log(2);
})
promise.then(() => {
    console.log(3);
})
console.log(4)