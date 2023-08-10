/**
 * 对象的深拷贝
 * 可以使用 JSON.stringify()但是他不能正常处理 undefined、function、symbol、set、map
 * 在JSON标准化过程中过滤掉了不安全的undefined、function、symbol，将set、map处理成空对象了
 * JSON.parse()解析JSON字符串位对象或者值
 */
let test = {  name: "test"};
let data = {  a: "123",
    b: 123,
    c: true,
    d: [43, 2],
    e: undefined,
    f: null,
    g: function() {    console.log("g");  },
    h: new Set([3, 2, null]),
    i: Symbol("fsd"),
    j: test,
    k: new Map([    ["name", "张三"],    ["title", "Author"]  ])
};
JSON.stringify(data)
const liLeiStr = JSON.stringify(data)
const liLeiCopy = JSON.parse(liLeiStr)

console.log(liLeiCopy)

/**
 * Object.assign()实现
 * 将一个或者多个源对象中所有可枚举的自有属性复制到目标对象，并返回修改后的目标对象。
 */
const newData = Object.assign({},data)
console.log(newData)

/**
 * 递归调用
 */
function deepClone(obj) {
    // 如果是 值类型 或 null，则直接return
    if(typeof obj !== 'object' || obj === null) {
        return obj
    }

    // 定义结果对象
    let copy = {}

    // 如果对象是数组，则定义结果数组
    if(obj.constructor === Array) {
        copy = []
    }

    // 遍历对象的key
    for(let key in obj) {
        // 如果key是对象的自有属性
        if(obj.hasOwnProperty(key)) {
            // 递归调用深拷贝方法
            copy[key] = deepClone(obj[key])
        }
    }

    return copy
}

console.log(deepClone(data))

