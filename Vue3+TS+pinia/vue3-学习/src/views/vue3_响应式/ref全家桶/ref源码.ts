import {isReadonly, isRef, isShallow, Ref, toRaw, UnwrapRef} from "vue";

/**
 * 函数重载 支持多种传入类型
 *
 */
export function ref<T extends Ref>(value: T): T
export function ref<T>(value: T): Ref<UnwrapRef<T>>
export function ref<T = any>(): Ref<T | undefined>
export function ref(value?: unknown) {
    return createRef(value, false)
}


/**
 *
 * @param rawValue 传入的对象
 * @param shallow 是否为引用类型 arr/obj
 */
function createRef(rawValue: unknown, shallow: boolean) {
    if (isRef(rawValue)) { // 是否为ref对象
        return rawValue
    }
    return new RefImpl(rawValue, shallow) // 没有就创建一个
}


/**
 * ref引用类型处理
 */
class RefImpl<T> {
    private _value: T
    private _rawValue: T

    public dep?: Dep = undefined
    public readonly __v_isRef = true

    constructor(value: T, public readonly __v_isShallow: boolean) { // 接收
        this._rawValue = __v_isShallow ? value : toRaw(value)
        this._value = __v_isShallow ? value : toReactive(value) // 判断是否引用类型
    }

    get value() {
        trackRefValue(this)
        return this._value
    }

    set value(newVal) {
        const useDirectValue =
            this.__v_isShallow || isShallow(newVal) || isReadonly(newVal)
        newVal = useDirectValue ? newVal : toRaw(newVal)
        if (hasChanged(newVal, this._rawValue)) { //比较是否相等
            this._rawValue = newVal
            this._value = useDirectValue ? newVal : toReactive(newVal)
            triggerRefValue(this, newVal) // 分发依赖时 使用 triggerRefValue 中 强制更新
        }
    }
}

/**
 *
 * 引用类型调用reactive实现响应式
 */
export const toReactive = <T extends unknown>(value: T): T =>
    isObject(value) ? reactive(value) : value


/**
 * shallowRef 将createRef(value, true) shallow置为true，保证直接返回值，所以是浅的
 */
export function shallowRef(value?: unknown) {
    return createRef(value, true)
}

/**
 * triggerRefValue 调用 triggerEffects 更新
 */
export function triggerRefValue(ref: RefBase<any>, newVal?: any) {
    ref = toRaw(ref)
    const dep = ref.dep
    if (dep) {
        if (__DEV__) {
            triggerEffects(dep, {
                target: ref,
                type: TriggerOpTypes.SET,
                key: 'value',
                newValue: newVal
            })
        } else {
            triggerEffects(dep)
        }
    }
}