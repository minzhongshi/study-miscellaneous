import {TrackOpTypes} from "./operations.js";

let shouldTrack = true;

/**
 * 暂停依赖收集
 */
export function pauseTracking() {
    shouldTrack = false;
}

/**
 * 恢复依赖收集
 */
export function resumeTracking() {
    shouldTrack = true;
}


/**
 * 依赖收集
 * @param target 目标对象
 * @param type 操作类型
 * @param key 操作的key
 */
export function track(target,type, key) {
    if (!shouldTrack ) {
        return;
    }
    if (type === TrackOpTypes.ITERATE){
        console.log(`%c依赖收集: ${type}`, 'color: #f00', target);
        return;
    }
    console.log(`%c依赖收集:${type}`, 'color: #f00', key);
}

/**
 * 派发更新
 * @param target 目标对象
 * @param type 操作类型
 * @param key 操作的key
 */
export function trigger(target, type, key) {
    console.log(`%c派发更新:${type}`, 'color: #00f', key);
}