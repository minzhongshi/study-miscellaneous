const obj = { name: 'breeze' };
// 原先用法
Object.prototype.hasOwnProperty.call(obj, 'name'); // true
obj.hasOwnProperty('name')// true
// 现在
Object.hasOwn(obj, 'name');// true

console.log(Object.hasOwn(obj, 'name'))
