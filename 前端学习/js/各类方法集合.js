// 数组去重
const uniqueArr= (arr)=> [...new Set(arr)];
console.log(uniqueArr(["前端","js","html","js","css","html"]));

//获取请求参数对象
const getParameters = URL => JSON.parse
(`{"${decodeURI(URL.split("?")[1]).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"')}"}`);
getParameters("https://www.google.com.hk/search?q=js+md&newwindow=1");

//检查对象是否为空
const isEmpty = obj => Reflect.ownKeys(obj).length === 0 && obj.constructor === Object;
isEmpty({}) // true
isEmpty({a:"not empty"}) //false

//反转字符串
const reverse = str => str.split('').reverse().join('');
reverse('this is reverse');
// esrever si siht

//生成十六进制
const randomHexColor = () => `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0")}`
console.log(randomHexColor());
// #a2ce5b

//检查当前网页是否在后台（用户有没有在浏览）
const isTabActive = () => !document.hidden;
isTabActive()
// true|false

//检测元素是否处于焦点
//document.activeElement： uoqu当前获得焦点的元素
const elementIsInFocus = (el) => (el === document.activeElement);
elementIsInFocus('需判断的元素')
// 元素处于焦点返回true，反之返回false

//检查设备类型
//navigator.userAgent：判断是移动还是PC设备
const judgeDeviceType =
    () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(navigator.userAgent) ? 'Mobile' : 'PC';
judgeDeviceType()  // PC | Mobile

//将内容复制到剪切板
const copyText = async (text) => await navigator.clipboard.writeText(text);
copyText('单行代码 前端世界')

//获取用户选定的文本
const getSelectedText = () => window.getSelection().toString();
getSelectedText();

//查询某天是否为工作日
const isWeekday = (date) => date.getDay() % 6 !== 0;
isWeekday(new Date(2022, 3, 11));

//转换华氏/摄氏
//转摄氏
const fahrenheitToCelsius = (fahrenheit) => (fahrenheit - 32) * 5/9;
fahrenheitToCelsius(50);
//转华氏
const celsiusToFahrenheit = (celsius) => celsius * 9/5 + 32;
celsiusToFahrenheit(100)

//两日期之间相差的天数
const dayDiff = (date1, date2) => Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000);
dayDiff(new Date("2021-10-21"), new Date("2022-02-12"))

//将 RGB 转换为十六进制
const rgbToHex = (r, g, b) =>   "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
rgbToHex(255, 255, 255);

//计算数组平均值
const average = (arr) => arr.reduce((a, b) => a + b) / arr.length;
average([1,9,18,36]) //16
