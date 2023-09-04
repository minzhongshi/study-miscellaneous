/**
 * any：可以被任意类型赋值，也可以赋值任意类型
 * unknown:只能被赋值，不能赋值别人
 *   unknown应用场景：
 *      1、现有一个变量A：unknown，只会接收未来要定义的值，但是现在后台给予的字段还不确定
 *      2、这个变量永远不会直接赋值给其他变量，如：
 *          axios post请求中的body，不确定参数，先将body定义为unknown
 */

let any_A:any
let unknown_B:unknown

any_A = '12345'
unknown_B = '12345'
any_A = 1234
unknown_B = 1234

let count:number = 0
count = any_A

// count = unknown_B //报错,不能赋值给别人