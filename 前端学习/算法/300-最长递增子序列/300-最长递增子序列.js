/**
 * 给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。
 *
 * 子序列 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。
 *
 * 示例 1：
 *
 * 输入：nums = [10,9,2,5,3,7,101,18]
 * 输出：4
 * 解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。
 * 示例 2：
 *
 * 输入：nums = [0,1,0,3,2,3]
 * 输出：4
 * 示例 3：
 *
 * 输入：nums = [7,7,7,7,7,7,7]
 * 输出：1
 */

/**
 * 分析:
 *    贪心，局部最优解，让每个最后面的值尽可能的小，笑了才能拼接更多的值
 *    建立记录表，从头遍历数组，每一项有两种情况
 *      1.当前值大于记录表中的最后一项，则新增这条记录
 *      2.当前值小于最后一项时，找到记录中第一个比该值大的记录，将其改成当前记录
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    if (nums.length === 0)return 0
    const tails = [nums[0]]// 记录表
    for (let i =1;i<nums.length;i++){
        if (nums[i]>tails[tails.length-1]){
            tails.push(nums[i])
        }else {
             getFirstGreater(nums[i])
        }
    }
    console.log(tails)
    return tails.length

    /**
     * 用来找到第一个比当前值大的位置并替换
     * @param target
     */
    function getFirstGreater(target) {
        for (let i=0;i<tails.length;i++){
            if (tails[i]>= target){
                tails[i] = target
                return
            }
        }
    }
};

console.log(lengthOfLIS([4,10,4,3,8,9]))