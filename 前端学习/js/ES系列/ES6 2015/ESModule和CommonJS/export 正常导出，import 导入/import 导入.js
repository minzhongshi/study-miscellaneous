// import { } from 'module'， 导入 module 的命名导出 ，module 为如上的 ./a.js
// 这种情况下 import { } 内部的变量名称，要与 export { } 完全匹配。
import {name,age,say} from "./export 正常导出.js";
console.log(name,age,say())
