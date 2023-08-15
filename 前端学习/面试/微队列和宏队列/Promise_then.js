const p = new Promise(resolve =>{
    console.log('a')
    resolve()
    console.log('b')
})
p.then(()=>{
    console.log('c')
})
console.log('d')