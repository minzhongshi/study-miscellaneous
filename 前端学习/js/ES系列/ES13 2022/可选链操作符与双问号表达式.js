/**
 * 用于在访问对象属性或方法时避免出现空引用错误。
 * 它的语法是?.，它可以用于检查一个对象是否为null或undefined，
 * 如果是，则不会执行后续的操作。这个操作符在JavaScript中被广泛使用，
 * 特别是在处理复杂的数据结构时，可以使代码更加简洁和安全。
 *
 */

// 它的出现是为了解决在访问对象属性时出现空引用错误的问题。
// 在过去，如果我们访问一个对象的属性，
// 而该属性的值为null或undefined，就会抛出一个错误。例如：
const obj = {
    prop: null
};

console.log(obj.prop.foo); // TypeError: Cannot read property 'foo' of null

// 为了避免这个错误，我们需要在访问属性之前检查该属性是否存在。例如：
const obj2 = {
    prop: null
};

if (obj2.prop && obj2.prop.foo) {
    console.log(obj2.prop.foo);
} else {
    console.log('prop is null or undefined');
}

// 可选链操作符的出现就是为了避免这种繁琐的检查和错误处理。
// 它的语法是通过问号（?）来表示的，
// 它可以让我们在访问属性之前检查该属性是否存在，
// 如果不存在，则返回undefined而不是抛出错误。例如

const obj3 = {
    prop: null
};

console.log(obj3?.prop?.foo); // undefined

/**
 * 双问号表达式（??）用于判断选择正确的值，
 * 如果在双问号前的条件为null/undefined时，会选择后面的值
 */
const obj4 = {
    prop: null
};

console.log(obj4?.prop?.foo ?? '没有值'); // 没有值

