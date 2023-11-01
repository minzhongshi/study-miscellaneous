/**
 * 给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。
 *
 * 你可以按 任何顺序 返回答案。
 *
 * 示例 1：
 * 输入：n = 4, k = 2
 * 输出：
 * [
 *   [2,4],
 *   [3,4],
 *   [2,3],
 *   [1,2],
 *   [1,3],
 *   [1,4],
 * ]
 *
 * 示例 2：
 * 输入：n = 1, k = 1
 * 输出：[[1]]
 */

/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 *
 * 回溯 + 减支
 * 时间复杂度：O(n^k)
 *
 */
var combine = function(n, k) {
    if (k<=0 || n<k) return []
    let res = [] // 结果
    let path = [] // 路径
    // 从1开始遍历
    function traverse(startIndex) {
        if(path.length === k){ // 路径长度等于k
            res.push([...path])
            return
        }
        // 搜索起点的上界 + 接下来要选择的元素个数 - 1 = n
        // 接下来要选择的元素个数 = k - path.length
        // 搜索起点的上界 = n - (k - path.length) + 1
        for(let i = startIndex;i<=n-(k-path.length)+1;i++){ // 遍历所有可能的选项,并进行减支
            path.push(i)
            traverse(i+1)
            path.pop()
        }
    }
    traverse(1)
    return res
};