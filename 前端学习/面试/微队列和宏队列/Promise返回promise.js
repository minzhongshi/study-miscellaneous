/**
 * 当一个promise返回一个promise时 这个promise的完成会在返回的promise的then方法中
 */
Promise.resolve()
.then(()=>{
    console.log(0)
    return Promise.resolve(4)
})
.then((res) =>{
    console.log(res)
})


Promise.resolve()
.then(()=>{
    console.log(1)
})
.then(()=>{
    console.log(2)
})
    .then(()=>{
        console.log(3)
    })
    .then(()=>{
        console.log(5)
    })