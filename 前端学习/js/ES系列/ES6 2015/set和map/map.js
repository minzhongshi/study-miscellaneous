/**
 * map 的Key可以是引用类型
 *
 */
var obj = { name: "smz" };
// @ts-ignore
var map = new Map();
map.set(obj, 'smz');
map.set(2, "smz2");
console.log(map.keys());
