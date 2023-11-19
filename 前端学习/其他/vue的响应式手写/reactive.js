import { isObject } from './utils.js';
import { handlers } from './handlers.js';

const targetMap = new WeakMap();
export function reactive(target) {
    // 判断是否已经代理过
    if (targetMap.has(target)) {
        return targetMap.get(target);
    }
    if (!isObject(target) && target !== null) {
        // if (Array.isArray(target)) {
        //     // 数组
        //     target.forEach((item, index) => {
        //         target[index] = reactive(item);
        //     });
        // } else {
        //     // 对象
        //     Object.keys(target).forEach(key => {
        //         target[key] = reactive(target[key]);
        //     });
        // }
    }
  const proxy =  new Proxy(target, handlers);
  targetMap.set(target, proxy);
  return proxy;
}