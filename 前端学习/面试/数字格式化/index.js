/**
 * 将字符串格式化成指定格式并返回
 *   1234567890 => 1,234,567,890
 * @file 数字格式化
 */
const str = '1234567890';

// 1. 正则
//    \B :非字符串边界
//    (?=exp) :匹配exp前面的位置
//    +$ :匹配到字符串末尾
function format1(str) {
  return str.replace(/\B(?=(\d{3})+$)/g, ',');
}

// 2. toLocaleString
//       转换成数字
function format2(str) {
  return (+str).toLocaleString();
}


// 3. 递归
//    分为两部分，一部分是截取字符串最后三位，另外一部分为剩余字符串，递归分割最后三位，拼接 ',' 和 剩余字符串
function format3(str) {
  if (str.length <= 3) return str;
  return format3(str.slice(0, -3)) + ',' + str.slice(-3);
}