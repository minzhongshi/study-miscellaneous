/**
 * 函数防抖
 * @author SMZ <2240941938@qq.com>
 * @param {Function} func 防抖目标函数
 * @param {Number} duration 执行前等待时间
 * @return {Function} 返回一个防抖后的函数
 * @example
 * f(a,2000);
 */
function debounce(func, duration = 1000) {
    let timer;
    return function (...args) {
        clearTimeout(timer); //清除之前的计时器
        timer = setTimeout( ()=> {
            func.apply(this);
        },duration)
    }
}

