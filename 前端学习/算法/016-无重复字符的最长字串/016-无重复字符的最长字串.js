/**
 * 给定一个字符串 s ，请你找出其中不含有重复字符的 最长连续子字符串 的长度。
 *
 *
 *
 * 示例 1:
 * 输入: s = "abcabcbb"
 * 输出: 3
 * 解释: 因为无重复字符的最长子字符串是 "abc"，所以其长度为 3。
 *
 * 示例 2:
 * 输入: s = "bbbbb"
 * 输出: 1
 * 解释: 因为无重复字符的最长子字符串是 "b"，所以其长度为 1。
 *
 * 示例 3:
 * 输入: s = "pwwkew"
 * 输出: 3
 * 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
 *      请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
 *
 * 示例 4:
 * 输入: s = ""
 * 输出: 0
 */

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let len = s.length
    let map = new Map()
    let maxLen = 0 // maxLen表示最长无重复子串的长度
    let left = 0 // left表示当前无重复子串的左边界
    for (let i = 0; i < len; i++) {
        if (map.has(s[i])) {// 如果map中有当前字符，说明当前字符重复了
            left = Math.max(left, map.get(s[i]) + 1)// 收缩左边界，左边界移动到重复字符的下一个位置
        }
        map.set(s[i], i)
        maxLen = Math.max(maxLen, i - left + 1)
    }
    return maxLen
};