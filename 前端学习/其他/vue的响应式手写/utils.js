/**
 * 判断是否是对象
 * @param value
 * @return {boolean}
 */
export function isObject(value) {
    return typeof value === 'object' && value !== null;
}


/**
 * 判断新值和旧值是否相等
 * @param oldValue
 * @param newValue
 * @return {boolean}
 */

export function hasChanged(oldValue, newValue) {
    return !Object.is(oldValue, newValue)
}