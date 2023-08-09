/**
 * weakmap weakset
 * 弱引用 不会进入垃圾回收机制，没有引用后便会被释放
 * weakmap的Key只能是引用类型 weakset也只能存引用类型
 *  方法：由于其不稳定性其方法只有四个
 *  get、set、has、delete
 *
 */
var obj = { name: "smz" };
var ahph = obj;
// @ts-ignore
var weakmap = new WeakMap;
weakmap.set(obj, 'smz2');
//当前两个的引用清除后，weakmap就会自动释放
ahph = null;
obj = null;
console.log(weakmap.get(obj));
weakmap.get(obj);
weakmap.set(obj, "smz3");
weakmap.has(obj);
weakmap.delete(obj);
