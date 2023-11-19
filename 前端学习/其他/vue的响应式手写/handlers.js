import {track, trigger, pauseTracking, resumeTracking} from "./effect.js";
import {hasChanged, isObject} from "./utils.js";
import {reactive} from "./reactive.js";
import {TrackOpTypes, TriggerOpTypes} from "./operations.js";

const arrayInstrumentations = {};
const RAW= Symbol('raw');

['includes', 'indexOf', 'lastIndexOf'].forEach((key) => {
    arrayInstrumentations[key] = function (...args) {
        // 正常找
        const res = Array.prototype[key].apply(this, args)
        // 找不到，去原始对象找
        if (res < 0 || res === false) {
            return Array.prototype[key].apply(this[RAW], args)
        }

        return res
    }
});

['push', 'pop', 'shift', 'unshift', 'splice'].forEach((key) => {
    arrayInstrumentations[key] = function (...args) {
        pauseTracking() // 暂停依赖收集
        const res = Array.prototype[key].apply(this, args)
        resumeTracking() // 恢复依赖收集
        return res
    }
})

/**
 * 代理细节
 * @name: handlers.js
 * @description: 依赖收集
 * @param {*} target
 * @param {*} key
 * @return {*}
 */
export const handlers = {
    get(target, key, receiver) {
        if (key === RAW) return target // 如果是原始对象，直接返回
        // 依赖收集
        track(target, TrackOpTypes.GET, key)
        // 数组的特殊处理
        if (arrayInstrumentations.hasOwnProperty(key) && Array.isArray(target)) {
            return arrayInstrumentations[key];
        }
        const res = Reflect.get(target, key, receiver);
        if (isObject(res)) {
            return reactive(res);
        }
        return res;
    },
    set(target, key, val, receiver) {
        // 派发更新
        // key in target 为什么不用这个判断，因为这个判断只能判断自身属性，不能判断原型链上的属性
        const type = target.hasOwnProperty(key) ? TriggerOpTypes.SET : TriggerOpTypes.ADD
        const oldValue = target[key]
        const oldLength = Array.isArray(target) ? target.length: undefined;
        const res = Reflect.set(target, key, val, receiver);
        if (!res){ // 如果设置失败比如:冻结对象和没有set方法的对象，直接返回
            return res
        }
        const newLength = Array.isArray(target) ? target.length: undefined;
        if (hasChanged(oldValue, val) || type === TriggerOpTypes.ADD) {
            trigger(target,type, key)
            if (Array.isArray(target) && newLength !== oldLength) {
                if (key !== 'length'){
                    trigger(target, TriggerOpTypes.SET, 'length')
                }else { // 当设置数组length属性时，数组元素的删除与新增不会触发依赖收集，所以需要手动触发派发更新
                    if (newLength < oldLength){
                        for (let i = newLength; i < oldLength; i++) {
                            trigger(target, TriggerOpTypes.DELETE, i.toString())
                        }
                    }else{
                        for (let i = oldLength; i < newLength; i++) {
                            trigger(target, TriggerOpTypes.ADD, i.toString())
                        }
                    }
                }
            }
        }

        return res;
    },
    deleteProperty(target, key) {
        const hadKey = target.hasOwnProperty(key)
        const res = Reflect.deleteProperty(target, key);
        if (hadKey && res) {
            // 派发更新
            trigger(target,TriggerOpTypes.DELETE, key)
        }
        return res;
    },
    has(target, key) {
        track(target, TrackOpTypes.HAS, key)
        return Reflect.has(target, key);
    },
    ownKeys(target) {
        track(target, TrackOpTypes.ITERATE, '')
        return Reflect.ownKeys(target);
    }
}