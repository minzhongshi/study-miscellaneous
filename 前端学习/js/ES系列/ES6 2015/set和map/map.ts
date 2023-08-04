/**
 * map 的Key可以是引用类型
 *
 */
let obj = {name:"smz"}
// @ts-ignore
let map:Map<Object,any> = new Map()
map.set(obj,'smz')
map.set(2,"smz2")
console.log(map.keys())
