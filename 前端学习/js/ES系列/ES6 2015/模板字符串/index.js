/**
 * 模板字符串 可以将一些参数写入用${}方式包裹，将文字与参数写在一起，不再用拼接的方式，提高可读性和维护性
 * 模板字符串前面可以添加标记，这个标记相当于函数名，可以运行，其中传入的参数分别为，未被${}包裹的，以及被包裹的
 */
/**
 * 使用场景，可以创建带样式的标签（styled components ：react的一个样式话组件库）
 */
const user = {
    name: 'smz',
    age: 18
}
const hi = tag`姓名： ${user.name},年龄：${user.age}`
function tag() {
    console.log(arguments) // [Arguments] { '0': [ '姓名： ', ',年龄：', '' ], '1': 'smz', '2': 18 }
}

