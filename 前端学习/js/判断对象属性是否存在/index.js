const obj = {};

/**
 * 直接判断值是否为undefined
 */
console.log('-------------------------')
console.log('方式1：对比属性是否为undefined');
if (obj.a !== undefined) {
    console.log('存在');
}else {
    console.log('不存在');
}

/**
 * 拿到属性名，判断属性名是否存在
 * 对象自有可枚举属性
 */
console.log('-------------------------')
console.log('方式2：使用Object.keys()');
if (Object.keys(obj).includes('a')) {
    console.log('存在');
}else {
    console.log('不存在');
}

/**
 * 只能判断自有属性，不能判断继承属性
 */
console.log('-------------------------')
console.log('方式3：使用hasOwnProperty()');
if (obj.hasOwnProperty('a')) {
    console.log('存在');
}else {
    console.log('不存在');
}

/**
 * 可以判断自有属性和继承属性
 */
console.log('-------------------------')
console.log('方式4：使用in');
if ('a' in obj) {
    console.log('存在');
}else {
    console.log('不存在');
}