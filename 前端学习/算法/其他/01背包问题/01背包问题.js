/**
 * 动态规划
 * 给你一个背包，里面能装固定的容量，有一堆物品，每个物品有重量和价值，问你怎么装能装最大价值的物品
 *
 * 定义DP表：
 *    DP[i][j] 表示前i个物品，背包容量为j时，最大价值
 *
 * 状态转换方程：
 * 判断两个条件，当前物品是否装进背包，装进背包后的价值是否大于不装进背包的价值。
 * 不装进背包的价值就是上一个物品的价值（DP[i-1][j]）
 * 装进背包的价值就是背包减去当前物品重量的最大价值加上当前物品的价值（DP[i-1][j-w[i]]+v[i]）
 *    DP[i][j] = max(DP[i-1][j],DP[i-1][j-w[i]]+v[i])
 *
 * 降维优化：
 * 由于DP[i][j]只与上一行的DP[i-1][j]和DP[i-1][j-w[i]]有关，所以可以将DP表降维
 * 降维后的DP[j]表示背包容量为j时的最大价值
 *   DP[j] = max(DP[j],DP[j-w[i]]+v[i])
 *
 * @param {number} capacity 背包容量
 * @param {number[]} weights 物品重量
 * @param {number[]} values 物品价值
 * @return {number} 最大价值
 * @example
 *
 * 例子：
 * const capacity = 4
 * const weights = [1,2,3]
 * const values = [2,4,4]
 * const result = knapsack(capacity,weights,values)
 * console.log(result) // 6
 *
 */
function package(capacity, weights, values) {
    let result = []
    // 第一行
    for (let i = 0; i <= capacity; i++) {
        result[i] = i < weights[0] ? 0 : values[0]// 背包容量小于第一个物品重量时，价值为0，否则为第一个物品的价值
    }
    // 其他行
    for (let i = 1; i < weights.length; i++) {// 从第二个物品开始
        for (let j = capacity; j >= weights[i]; j--) {// 从后往前遍历，避免使用上一行的值
            result[j] = Math.max(result[j], result[j - weights[i]] + values[i])
        }
    }
    return result[capacity]
}
const result = package(4,[1,2,3],[2,4,4])// 6
const result2 = package(6,[2,5,1,4,3],[5,10,3,6,3]) // 13
console.log(result2) // 13
