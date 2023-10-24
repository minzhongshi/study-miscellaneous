/**
 * 封装动画函数（内容跳动）
 * @param duration: 动画持续时间
 * @param from: 起始值
 * @param to: 结束值
 * @param delay: 延迟时间
 * @param callback: 回调函数
 * @returns {undefined}
 * @example
 * animation(1000, 0, 100, 0, (value) => {
 *    console.log(value);
 *     })
 */
function animation(duration, from, to, delay, callback) {
    const start = Date.now() + delay;
    const end = start + duration;
    const range = to - from;
    const step = () => {
        const current = Date.now();
        if (current >= end) {
            callback(to);
            return;
        }
        const percent = (current - start) / duration;
        const value = from + range * percent;
        callback(value);
        requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}
// animation(1000, 0, 100, 0, (value) => {
//     console.log(value);
// })