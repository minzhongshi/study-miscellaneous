let data = [
    {name:'赵四',sex: '男',age: 18},
    {name:'王五',sex: '男',age: 18},
    {name:'李四',sex: '男',age: 19},
    {name:'赵日天',sex: '女',age: 10},
    {name:'王的佛',sex: '男',age: 60},
    {name:'西门吹雪',sex: '男',age: 23},
]
console.log(countBy(data,(u)=> u.sex))
console.log(countBy(data,(u)=> u.age))
console.log(countBy(data,(u)=> u.name.length))
console.log(countBy(data,(u)=> u.age >= 18 ? '成年' : '未成年'))

function countBy(array,generateKey){
    let map = new Map()
    for(let i = 0;i<array.length;i++){
        let key = generateKey(array[i])
        if(map.has(key)){
            map.set(key,map.get(key)+1)
        }else{
            map.set(key,1)
        }
    }
    return map
}