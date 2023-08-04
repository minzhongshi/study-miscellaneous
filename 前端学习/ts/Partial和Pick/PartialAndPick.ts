type Person = {
    name:string,
    age:number,
    text:string
}
/**
 * Partial将某个对象内属性变为可选
 * T 传入对象
 * Partial源码
 * type Partial<T> = {
 *     [P in keyof T]?: T[P];
 * };
 */
type p = Partial<Person>

const obj:p = {
    name: "smz"
}
console.log(obj)

/**
 * Pick将某个对象中的属性取出部分
 * T 传入的对象
 * K 传入属性
 * 将K约束为T的属性
 * Pick源码
 * type Pick<T, K extends keyof T> = {
 *     [P in K]: T[P];
 * }
 */
type p2 = Pick<Person, 'age' | 'name'>

const obj2:p2 = {
    name: "smz",
    age: 18
}
console.log(obj2)
