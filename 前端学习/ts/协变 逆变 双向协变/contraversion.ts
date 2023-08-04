/**
 * 逆变
 * 通常发生在函数上
 */
interface A {
    name:string
    age:number
}

//子类型
interface B {
    name:string
    age:number
    sex:string
}

let fna = (params:A) =>{

}

let fnb = (params:B) =>{

}
// 这样一定是安全的
fnb = fna

fna = fnb
