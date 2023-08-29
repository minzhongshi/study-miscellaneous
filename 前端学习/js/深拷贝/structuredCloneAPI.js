/**
 * structuredClone
 * 是 JavaScript 中用于复制对象的 API，它是由 Web 标准提出的，可以在不同的浏览器中使用
 * 适配不了老版本浏览器
 * 是以序列化与反序列化进行拷贝的
 * 将 JavaScript 对象序列化为 JSON 格式，然后再将其反序列化为 JavaScript 对象
 */
const obj = [{a:6,b:"123",f:{g:{h:{i:8}}}},{c:null,d:[]},{e:undefined}]
const obj2 = structuredClone(obj)
console.log(obj == obj2)//false