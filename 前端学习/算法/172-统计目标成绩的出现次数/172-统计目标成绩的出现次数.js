/**
 * 某班级考试成绩按非严格递增顺序记录于整数数组 scores，请返回目标成绩 target 的出现次数。
 *
 * 示例 1：
 * 输入: scores = [2, 2, 3, 4, 4, 4, 5, 6, 6, 8], target = 4
 * 输出: 3
 *
 * 示例 2：
 * 输入: scores = [1, 2, 3, 5, 7, 9], target = 6
 * 输出: 0
 */

/**
 * @param {number[]} scores
 * @param {number} target
 * @return {number}
 */
var countTarget = function(scores, target) {
    let left = 0
    let right = scores.length - 1
    let mid
    let index
    while(left <= right) {
        mid =left + Math.floor((right - left) / 2)
        if (scores[mid] === target) {
            index = mid
            break
        } else if (scores[mid] < target) {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
    if (index === undefined) return 0
    let count = 1
    let i = index - 1
    while(scores[i] === target) {
        count++
        i--
    }
    i = index + 1
    while(scores[i] === target) {
        count++
        i++
    }
    return count

};