/**
 * infer关键字 充当占位符
 */
// 定义一个类型 如果是数组类型就返回数组元素的类型 否则就传入什么类型就返回什么类型
type TYPE<T> = T extends Array<any>? T[number] : never
type TYPE2<T> = T extends Array<infer U>? U : never

type T = [string,number]

type uni = TYPE<(string | number)[]>

//提取数组内的元素
type Arr = [1,2,3]
type First<T extends any[]> = T extends [infer one,...any[]] ? one : []
type a = First<Arr>

//递归 翻转数组内容
type Arr2 = [1, 2, 3, 4]
type ReverArr<T extends any[]> = T extends [infer First,...infer rest] ? [...ReverArr<rest>,First] : T
type Arrb = ReverArr<Arr2>
