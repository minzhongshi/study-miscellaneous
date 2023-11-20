import {TrackOpTypes, TriggerOpTypes} from "./operations.js";

const targetMap = new WeakMap(); // 依赖收集表
const ITERATE_KEY = Symbol('iterate');// 迭代自定义属性key
let shouldTrack = true; // 依赖收集开关
let activeEffect = undefined; // 当前副作用函数
const effectStack = []; // 副作用函数栈

/**
 * 副作用函数
 * @param fn 函数
 * @param options 功能增强
 */
export function effect(fn,options = {}) {
    const {lazy = false} = options; // 功能增强
    // activeEffect = fn;
    // fn();
    // activeEffect = undefined;
    const effectFn = () =>{
        try {
            activeEffect = effectFn;
            effectStack.push(effectFn); // 将函数放入栈中
            cleanup(effectFn) // 清除依赖
            return fn();
        }
        finally {
            effectStack.pop(); // 将函数从栈中移除
            activeEffect = effectStack[effectStack.length - 1]; // 将栈顶函数赋值给activeEffect
        }
    }
    effectFn.deps = []; // 依赖集合
    effectFn.options = options; // 功能增强
    if (!lazy){
        effectFn();
    }
    return effectFn;
}

/**
 * 清除依赖
 * @param effectFn
 */
export function cleanup(effectFn) {
    const {deps} = effectFn;
      if (!deps.length){
            return;
      }
      for (const dep of deps) {
          dep.delete(effectFn); // 清除集合中对应的函数
      }
      deps.length = 0; // 需要重新收集依赖，再更新dep，所以清空
}

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
    if (!shouldTrack || !activeEffect){
        return;
    }
    let propMap = targetMap.get(target);
    if (!propMap){
        propMap = new Map();
        targetMap.set(target, propMap);
    }
    if (type === TrackOpTypes.ITERATE){
        key = ITERATE_KEY;
    }
    let typeMap = propMap.get(key);
    if (!typeMap){
        typeMap = new Map();
        propMap.set(key, typeMap);
    }
    let depSet = typeMap.get(type);
    if (!depSet){
        depSet = new Set();
        typeMap.set(type, depSet);
    }
    if (!depSet.has(activeEffect)){
        depSet.add(activeEffect);
        activeEffect.deps.push(depSet); // 将集合加入到deps中，用于清除依赖
    }
    // console.log(targetMap)
}

/**
 *
 * 获取副作用函数集合
 * @param target
 * @param type
 * @param key
 * @return {Set<any>}
 */
function getEffectFns(target, type ,key) {
    const propMap = targetMap.get(target);
    if (!propMap){
        return ;
    }
    const keys = [key];
    if (type === TriggerOpTypes.ADD || type === TriggerOpTypes.DELETE){ // 添加或删除属性 会额外触发迭代属性的更新
        keys.push(ITERATE_KEY);
    }
    const effectFns = new Set(); // 副作用函数集合
    const triggerOpType = { // 派发更新操作类型对应的依赖收集操作类型
        [TriggerOpTypes.SET]: [TrackOpTypes.GET],
        [TriggerOpTypes.ADD]: [TrackOpTypes.GET, TrackOpTypes.ITERATE, TrackOpTypes.HAS],
        [TriggerOpTypes.DELETE]: [TrackOpTypes.GET, TrackOpTypes.ITERATE, TrackOpTypes.HAS]
    }
    for (const key of keys) {
        const typeMap = propMap.get(key);
        if (!typeMap){
            continue;
        }
        const trackTypes =  triggerOpType[type];
        for (const trackType of trackTypes) {
            const dep = typeMap.get(trackType);
            if (!dep){
                continue;
            }
            for (const effectFn of dep) {
                effectFns.add(effectFn)
            }
        }
    }
    return effectFns;
}

/**
 * 派发更新
 * @param target 目标对象
 * @param type 操作类型
 * @param key 操作的key
 */
export function trigger(target, type, key) {
    const effectFns = getEffectFns(target, type, key)
    if (!effectFns){ // 没有副作用函数，不需要执行
        return;
    }
    for (const effectFn of effectFns) {// 如果是同一个副作用函数，不需要重新执行函数
        if (effectFn === activeEffect){
            continue;
        }
        if (effectFn.options.scheduler){
            effectFn.options.scheduler(effectFn)
        }else {
            effectFn();
        }
    }
}