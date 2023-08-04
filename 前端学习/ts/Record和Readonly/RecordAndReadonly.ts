type Person = {
    name:string,
    age:number,
    text:string
}


/**
 * Readonly 让对象内属性变为不可更改
 * type Readonly<T> = {
 *     readonly [P in keyof T]: T[P];
 * }
 */
type man = Readonly<Person>

/**
 * K 相当于键的约束 string | number | symbol
 * T 每个键的值
 * type Record<K extends keyof any, T> = {
 *     [P in K]: T;
 * }
 */
type K = 1 | 2 | 3
type B = Record<K, Person>

let obj:B = {
    1:{name:"smz",age:18,text:"wu"},
    2:{name:"smz",age:18,text:"wu"},
    3:{name:"smz",age:18,text:"wu"}
}
