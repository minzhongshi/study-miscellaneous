/**
 * 恶魔们抓住了公主并将她关在了地下城 dungeon 的 右下角 。地下城是由 m x n 个房间组成的二维网格。我们英勇的骑士最初被安置在 左上角 的房间里，他必须穿过地下城并通过对抗恶魔来拯救公主。
 *
 * 骑士的初始健康点数为一个正整数。如果他的健康点数在某一时刻降至 0 或以下，他会立即死亡。
 *
 * 有些房间由恶魔守卫，因此骑士在进入这些房间时会失去健康点数（若房间里的值为负整数，则表示骑士将损失健康点数）；其他房间要么是空的（房间里的值为 0），要么包含增加骑士健康点数的魔法球（若房间里的值为正整数，则表示骑士将增加健康点数）。
 *
 * 为了尽快解救公主，骑士决定每次只 向右 或 向下 移动一步。
 *
 * 返回确保骑士能够拯救到公主所需的最低初始健康点数。
 *
 * 注意：任何房间都可能对骑士的健康点数造成威胁，也可能增加骑士的健康点数，包括骑士进入的左上角房间以及公主被监禁的右下角房间。
 *
 * 输入：dungeon = [[-2,-3,3],[-5,-10,1],[10,30,-5]]
 * 输出：7
 * 解释：如果骑士遵循最佳路径：右 -> 右 -> 下 -> 下 ，则骑士的初始健康点数至少为 7 。
 */

/**
 * 分析：
 *     动态规划：
 *     从起始格子DP存在误区，DP只考虑上一步计算结果，最终并不是最优解
 *     该题存在正向条件，导致DP不仅仅需要考虑上一步计算结果，还需要计算过程，存在后效性
 *
 *     反向DP：
 *          从末尾计算每个格子最少的血量
 *          当某个格子最少血量为0时，改为1，因为血量不能低于1
 *          最终起始格子就为正解
 *
 *     考虑边界：
 *           为dp表多加一行一列，设为无穷大
 *           在到达格子需要比较的两个格子设为1
 *           使状态转移方程能够适用所有格子
 * [
 *   [-2,-3,3],
 *   [-5,-10,1],
 *   [10,30,-5]
 * ]
 * DP表：
 * [
 *   [ Infinity, Infinity, Infinity, Infinity ],
 *   [ Infinity, Infinity, Infinity, Infinity ],
 *   [ Infinity, Infinity, Infinity, 1 ],
 *   [ Infinity, Infinity, 1, Infinity ]
 * ]
 *
 *     状态转移方程：dp(i,j) = max(min(dp(i+1,j),dp(i,j+1) - nums[i][j],1)
 */

/**
 * Array.from() 静态方法从可迭代或类数组对象创建一个新的浅拷贝的数组实例。
 */

/**
 * @param {number[][]} dungeon
 * @return {number}
 */
var calculateMinimumHP = function(dungeon) {
    const r = dungeon.length // 行数
    const c = dungeon[0].length // 列数
    const dp = Array.from(// dp表
         {length: r+1},()=>
            new Array(c+1).fill(Infinity)
    )
    dp[r][c-1] = dp[r-1][c] = 1 // 边界处理
    for (let i  = r-1;i>=0;i--){
        for (let j = c-1;j>=0;j--){
            dp[i][j] = Math.max(Math.min(dp[i+1][j],dp[i][j+1]) - dungeon[i][j],1) // 状态转移方程
        }
    }
    return dp[0][0]
};

console.log(calculateMinimumHP([[-2,-3,3],[-5,-10,1],[10,30,-5]]))