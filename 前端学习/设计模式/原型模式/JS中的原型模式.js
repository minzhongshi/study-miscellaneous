/**
 * 在原型模式下，当我们想要创建一个对象时，会先找到一个对象作为原型，
 * 然后通过克隆原型的方式来创建出一个与原型一样（共享一套数据/方法）的对象。
 * 得到一个与需要的对象一样的，互不干扰的实例，且不影响性能
 * 在 JavaScript 里，Object.create方法就是原型模式的天然实现——准确地说，
 * 只要我们还在借助Prototype来实现对象的创建和原型的继承，那么我们就是在应用原型模式。
 * 在ES6后出现了class关键字用来支持类，但是JS引入的类都是基于原型的继承语法糖
 */

/**
 * Object.create() 静态方法以一个现有对象作为原型，创建一个新对象。
 */

/**
 * Personnel 和 Personnel2 两者是等价的
 */
class Personnel {
    constructor(name,age) {
        this.name = name
        this.age = age
    }
    show() {
        console.log("这是一个类")
    }
}
function Personnel2(name ,age) {
    this.name = name
    this.age = age
}
Personnel2.prototype.show = function () {
    console.log("这是一个类")
}

/**
 * 原型：
 * 每个构造函数都拥有一个prototype属性，它指向构造函数的原型对象，
 * 这个原型对象中有一个 constructor 属性指回构造函数；
 * 每个实例都有一个__proto__属性，当我们使用构造函数去创建实例时，
 * 实例的__proto__属性就会指向构造函数的原型对象。
 * 如图 ：原型.png
 */

/**
 * 原型链
 * 当访问实例属性或者方法时，先在自身找，如果这个属性或方法自身不存在，就去找自身的原型对象，以此类推
 * 最后找到Object对象后如果没有，就没有这个属性或者方法
 * 最终形成了一条prototype原型链
 * 如图：原型链.png
 */


