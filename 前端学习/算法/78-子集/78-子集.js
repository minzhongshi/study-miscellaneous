/**
 * 给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。
 *
 * 解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。
 *
 *
 * 示例 1：
 * 输入：nums = [1,2,3]
 * 输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
 *
 * 示例 2：
 * 输入：nums = [0]
 * 输出：[[],[0]]
 *
 * 回溯：
 *   分别寻找从0到nums.length的所有长度的子集
 *   定义一个辅助函数combine(start,k,arr,nums)
 *   start: 开始位置
 *   k: 长度
 *   arr: 当前子集
 *   nums: 原数组
 *   当k为0时，将当前子集加入结果集
 *   当k不为0时，从start开始遍历nums，将当前元素加入子集，递归combine(start+1,k-1,arr,nums)，直到找到了k个元素，递归结束后将当前元素从子集中删除
 *
 *
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    let result = []
    for (let i = 0;i<=nums.length;i++) {// 从0开始，寻找长度为i的子集
        combine(0,i,[])
    }
    return result
    function combine(start,k,arr) {// start: 开始位置，k: 长度，arr: 当前子集，nums: 原数组
        if (k === 0) {// 当k为0时，将当前子集加入结果集
            result.push(arr)
            return
        }
        for (let i = start;i<nums.length;i++) {// 从start开始遍历nums
            arr.push(nums[i])// 将当前元素加入子集
            combine(i+1,k-1,[...arr])// 递归，寻找长度为k-1的子集
            arr.pop()// 递归结束后将当前元素从子集中删除
        }
    }
};


console.log(subsets([1,2,3]))