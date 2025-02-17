/**
 * 给定一个含有 n 个正整数的数组和一个正整数 target 。
 *
 * 找出该数组中满足其总和大于等于 target 的长度最小的 连续子数组 [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。如果不存在符合条件的子数组，返回 0 。
 *
 * 滑动窗口算法：
 *  1. 用两个指针表示窗口的左右边界，右指针不断向右移，直到窗口内的数字和大于等于了 target，停止移动，记录此时的长度
 *  2. 然后左指针向右移，缩小窗口，每次移动都要更新最小长度
 *  3. 直到窗口内的数字和小于了 target，停止移动，再次从步骤 1 开始移动右指针
 *  4. 重复这个过程，直到右指针到达数组的末尾，且窗口内的数字和仍然小于 target，此时返回最小长度
 *  5. 如果右指针到达了数组的末尾，窗口内的数字和仍然大于等于 target，那么左指针向右移动，缩小窗口，直到窗口内的数字和小于了 target，此时返回最小长度
 *
 *
 * 示例 1：
 * 输入：target = 7, nums = [2,3,1,2,4,3]
 * 输出：2
 * 解释：子数组 [4,3] 是该条件下的长度最小的子数组。
 *
 * 示例 2：
 * 输入：target = 4, nums = [1,4,4]
 * 输出：1
 * 示例 3：
 *
 * 输入：target = 11, nums = [1,1,1,1,1,1,1,1]
 * 输出：0
 */

/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(target, nums) {
    let left = 0
    let right = 0
    let min = Infinity
    let sum = 0
    for(right;right<nums.length;right++){
        sum += nums[right]
        while(sum>=target){
            min = Math.min(min,right - left + 1)
            sum-=nums[left]
            left++
        }
    }
    return min | 0
};