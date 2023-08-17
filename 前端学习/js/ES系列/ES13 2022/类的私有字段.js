// 通过 # 关键字，可以创建私有字段或者方法，不可以在外部访问到，内部可以访问
class Breeze {
    constructor() { //用于创建和初始化class创建的对象的特殊方法
        this.age = 18
    }
    name = 'zhang';
    #girl = 'san';
    #eat() {
        console.log('eating');
    }
    miss() {
        console.log(this.#girl);
    }
    meet() {
        this.#eat();
    }
}
const boy = new Breeze();
console.log(boy.miss())
console.log(boy.meet())
console.log(boy.#eat())
console.log(boy.#girl);// Uncaught SyntaxError: Private field '#girl' must be declared in an enclosing class
