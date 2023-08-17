// export default anything 导入 module 的默认导出。 anything 可以是函数，属性方法，或者对象。
const name = 'smz'
const age = '18'
const say = function (){
    console.log('hello , world')
}
export default {
    name,
    age,
    say
}
