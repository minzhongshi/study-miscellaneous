
// 自定义ref 可对响应式函数进行重写
// customRef的两个参数分别是用于追踪的 track 与用于触发响应的 trigger
import {customRef} from 'vue';

/**
 * 函数防抖
 * @author SMZ <2240941938@qq.com>
 * @param {Number | String} value 响应式数据
 * @param {Number} duration 执行前等待时间
 * @return {Function} 返回一个响应式防抖函数
 * @example
 * debounceRef(a,2000);
 */
export function debounceRef(value, duration = 1000) {
    return customRef((track, trigger) => {
        let timer;
        return {
            get() {
                //收集依赖
                track();
                return value;
            },
            set(val) {
                clearTimeout(timer);
                timer = setTimeout(()=>{
                    //派发更新
                    trigger();
                    value = val;
                },duration)
            }
        }
    })
}

