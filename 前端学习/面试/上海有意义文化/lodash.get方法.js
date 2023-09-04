/**
 * object (Object): 要检索的对象。
 * path (string): 要获取属性的路径。
 * [defaultValue] (*): 如果解析值不存在，会返回 default。
 *
 * 分析：
 *    lodash.get是用来解决一些链路调用问题，使其能够在各种情况下都返回正确的值，而不是报错
 *    官方API中path不止是string还可以是Array,也就是使用连续字符串也可以使用
 *    在这里先将path进行处理，处理成数组['a', '0', 'b', 'c']形式，然后通过迭代去取值
 */
function _get(object, path, defaultVal='default') {
    // 在这里实现
    let newPath = [] //存放预处理的path
    if (Array.isArray(path)){// 如果传入路径为数组形式直接赋值不用处理
        newPath = path
    }else {// 处理path为数组,利用replace替换'[]'为'.',利用split将字符串分割成字符数组
        newPath  = path.replace(/\[/g,'.').replace(/\]/g,'').split('.')
    }
    return newPath.reduce((o,k)=>{//通过reduce迭代newPath找路径没找到则返回defaultVal
        // { a: [ { b: [Object] } ] } a
        // [ { b: { c: 3 } } ] 0
        // { b: { c: 3 } } b
        // { c: 3 } c
        return (o ||{})[k]
    },object) || defaultVal
}

// === 用例 ===

const object = { 'a': [{ 'b': { 'c': 3 } }] };

console.log(_get(object, 'a[0].b.c'));
// => 3

console.log(_get(object, ['a', '0', 'b', 'c']));
// => 3

console.log(_get(object, 'a.b.c', 'default'));
// => 'default'