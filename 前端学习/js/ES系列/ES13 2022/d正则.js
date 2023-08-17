// 通过/d正则可以返回匹配的字符串开始和结束索引
// 存在indices属性中，是一个数组
const str = 'Hello world!';
//查找"Hello"
const patt = /Hello/;
const res = patt.exec(str);
console.log(res); // ['Hello', index: 0, input: 'Hello world!', groups: undefined]

// 加上 d
const patt2 = /Hello/d;
const res2 = patt2.exec(str);
console.log(res2); // ['Hello', index: 0, input: 'Hello world!', groups: undefined, indices: [[0, 5], groups: undefined]]
console.log(res2.indices); // [[0, 5], groups: undefined]

