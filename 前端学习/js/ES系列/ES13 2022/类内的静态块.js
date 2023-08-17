// 类内的静态块，用于执行每个类的初始化计算
// 可以在类中包含静态块，可以做初始化处理，比如在外部如何获取到内部的私有字段
// 可以声明多个静态块
let getPrivateField;
class Breeze {
    constructor() {
        this.age = 18;
    }
    name = 'zhang';
    #girl = 'bao';
    static {
        console.log(1);
    }
    static {
        console.log(2);
        getPrivateField = (el) => el.#girl; // 内部可以访问到私有属性
    }
}
const boy = new Breeze();
console.log(getPrivateField(boy)); // bao


