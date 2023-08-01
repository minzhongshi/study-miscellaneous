//WeaakMap:是区别于map的弱映射，也就是说，在创建弱引用对象时，不需要手动删除，它会自动被回收
//而map属于强映射，引用时需要手动删除，不然不会释放

//ES2023让WeakMap支持Symbol作为键值
//Symbol基本数据类型，每个symbol都是独一无二的
const weak = new WeakMap()
const key = Symbol("symbol")
weak.set(key, "ES2023")
const result = weak.get(key)