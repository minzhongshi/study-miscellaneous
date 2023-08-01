/**
 * if判断同时满足
 * @type {{valueOf(): *, [Symbol.toPrimitive](): *, toString(): *, value: number}}
 */
const a ={
    value:1,
    toString() {
        return a.value++;
    },
    valueOf(){
        return a.value++;
    },
    [Symbol.toPrimitive]() {
        return a.value++;
    }
}

if(a == 1 && a==2 && a==3){
    console.log("你好")
}
