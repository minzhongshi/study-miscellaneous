class Breeze {
    constructor() {
        this.age = 18;
    }
    name = 'zhang';
    #girl = 'bao';
    #eat() {
        console.log('eating');
    }
    testEat() {
        return #eat in this;
    }
}
const boy = new Breeze();
console.log(boy.testEat()) // true
console.log('name' in boy) // true
