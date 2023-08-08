async function asy(){
    console.log(1)
    await asy2()
    console.log(2)
}
async function asy2(){
    console.log(3)
}
console.log(4)
setTimeout(function () {
    console.log(5)
},0)
asy()
new Promise(function (resolve) {
    console.log(6)
    resolve()
    console.log(7)
}).then(function () {
    console.log(8)
})
console.log(9)
