let obj = {
    name: 'smz',
    age: 18,
    other: {
        type: '无',
        other: {
            type: '无',
            other: {
                type: '无'
            }
        }
    }
}
//JSON.parse() 解析JSON字符串，得到对应的JavaScript值或对象
//JSON.stringify() 将一个JavaScript对象或值转换为JSON格式字符串。
let cloneObj = JSON.parse(JSON.stringify(obj));

console.log(cloneObj)

if (Object.is(obj,cloneObj)) console.log("内存地址相同，为浅拷贝")
else console.log("内存地址不同，为深拷贝")