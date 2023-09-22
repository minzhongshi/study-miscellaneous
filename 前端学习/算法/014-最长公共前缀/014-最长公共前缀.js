/**
 * 编写一个函数来查找字符串数组中的最长公共前缀。
 *
 * 如果不存在公共前缀，返回空字符串 ""。
 *
 * 示例 1：
 *
 * 输入：strs = ["flower","flow","flight"]
 * 输出："fl"
 * 示例 2：
 *
 * 输入：strs = ["dog","racecar","car"]
 * 输出：""
 * 解释：输入不存在公共前缀。
 */

/**
 * 分析：
 *    边界：
 *       长度为0则返回“”
 *       长度为1返回第一个字符串
 *    将字符数组sort排序，则字符数组最长公共前缀只能是第一个，与最后一个一一比较，
 *    直到不同就能找到最长公共前缀
 */

/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    if (strs.length === 0)return ""
    if (strs.length === 1)return strs[0]
    strs.sort() // ['a','ab','abc','abcd']
    const first = strs[0]
    const last = strs[strs.length-1]
    let i = 0;
    while (i< first.length && first[i] === last[i]){
        i++
    }
    return first.substring(0,i)
};

console.log(longestCommonPrefix(["dog","racecar","car"]))
