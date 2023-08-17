//该方法支持相对索引
//可以通过该方法快速拿到最后一项
// 支持数组的同时，也支持字符串
const arr = [1, 2, 3, 4, 5];
arr.at(0); // 1
arr.at(-1); // 5

const str = 'hello';
str.at(0); // h
str.at(-1); // o

