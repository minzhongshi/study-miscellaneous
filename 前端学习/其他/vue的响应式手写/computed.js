import {effect, track, trigger} from "./effect.js";
import {TrackOpTypes, TriggerOpTypes} from "./operations.js";

/**
 * 判断是否是函数
 * @param getterOrOptions
 * @return {boolean}
 */
function isFunction(getterOrOptions) {
    return typeof getterOrOptions === 'function';

}

/**
 * 参数归一化
 * @param getterOrOptions
 * @return {{getter, setter}}
 */
function normalizeParameter(getterOrOptions) {
    let getter
    let setter
    if (isFunction(getterOrOptions)) {
        getter = getterOrOptions
        setter = () => {
            console.warn('computed value can not be set')
        }
    } else {
        getter = getterOrOptions.get
        setter = getterOrOptions.set
    }
    return {
        getter,
        setter
    }

}

export function computed(getterOrOptions){
    let value , dirty = true
    const {getter, setter} = normalizeParameter(getterOrOptions)
    const effectFn = effect(getter, { // 延迟执行 干净数据转换为脏数据时执行scheduler,并重新派发更新
        lazy:true,
        scheduler(){
            dirty = true
            trigger(obj,TriggerOpTypes.SET,'value')
        }
    })
    const obj = {
        get value(){
            track(obj,TrackOpTypes.GET,'value')
            if (dirty){
                value = effectFn()
                dirty = false
            }
            return value
        },
        set value(newValue){
            setter(newValue)
        }
    }
    return obj
}