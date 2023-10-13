/**
 * KMP算法流程
 * 1. 计算前缀表：前缀表的值表示当前字符之前的字符串中，有多大长度的相同前缀后缀
 * 2. 遍历str，如果不匹配，j回退，如果匹配，j加1
 * 3. 如果j等于pattern的长度，说明匹配成功
 *
 * 前缀表的计算
 * 1.前缀表第一个值为0
 * 2.前缀不能和自己匹配
 * 3.前缀表值要找最长可匹配前缀子串的结尾字符下标
 *
 *
 * @param str
 * @param pattern
 * @return {boolean}
 */
const kmp = (str, pattern) => {
    const getPrefix = (pattern) => {// 计算前缀表
        const prefix = []// 前缀表
        let len = 0// 前缀表中的值
        prefix[0] = 0// 第一个字符的前缀表值为0
        for (let i = 1; i < pattern.length; i++) {// 遍历pattern
            while (len > 0 && pattern[len] !== pattern[i]) {
                len = prefix[len - 1]
            }
            if (pattern[len] === pattern[i]) {
                len++
            }
            prefix[i] = len
        }
        return prefix
    }
    const prefix = getPrefix(pattern)
    let j = 0// pattern的下标
    for (let i = 0; i < str.length; i++) {// 遍历str
        while (j > 0 && str[i] !== pattern[j]) {// 如果不匹配，j回退
            j = prefix[j - 1]
        }
        if (str[i] === pattern[j]) {// 如果匹配，j加1
            j++
        }
        if (j === pattern.length) {// 如果j等于pattern的长度，说明匹配成功
            return true
        }
    }
    return false
}