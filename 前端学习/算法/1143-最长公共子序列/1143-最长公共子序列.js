/**
 * 给定两个字符串 text1 和 text2，返回这两个字符串的最长 公共子序列 的长度。如果不存在 公共子序列 ，返回 0 。
 *
 * 一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。
 *
 * 例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。
 * 两个字符串的 公共子序列 是这两个字符串所共同拥有的子序列。
 *
 * 示例 1：
 *
 * 输入：text1 = "abcde", text2 = "ace"
 * 输出：3
 * 解释：最长公共子序列是 "ace" ，它的长度为 3 。
 * 示例 2：
 *
 * 输入：text1 = "abc", text2 = "abc"
 * 输出：3
 * 解释：最长公共子序列是 "abc" ，它的长度为 3 。
 * 示例 3：
 *
 * 输入：text1 = "abc", text2 = "def"
 * 输出：0
 * 解释：两个字符串没有公共子序列，返回 0 。
 */

/**
 * 分析：
 *    动态规划，当两个字符串寻找公共子序列的时候，分为两种情况
 *      1、当最后一个字符相同时，当前最长公共子序列长度为：text1[i-1]和text2[j-1]的最长公共子序列的值 + 1
 *         也就是两段文字分别少一个字符的公共子序列长度 + 1
 *      2、当最后一个字符不同时，取两段字符分别少一个字符的最长公共子序列值的较大的值
 *         也就是，最后一个字符不同肯定不能作为公共子序列，应该和之前最长的保持一致
 *      状态转移方程：
 *         dp[i,j] = dp[i-1,j-1] + 1   text1[i] === text[j]
 *         dp[i,j] = max(dp[i-1,j],dp[i,j-1]) text1[i] !== text[j]
 *    边界：
 *       其中一个字符串字符为空的时候，最长公共子序列为0：dp[0,0~j] = 0,dp[0~i,0] = 0
 */

/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function(text1, text2) {
    const r = text1.length // 行数
    const c = text2.length // 列数
    const dp = Array.from(// dp表
        {length: r+1},()=>
            new Array(c+1).fill(0)
    )
    for (let i = 1;i<=r;i++){
        for (let j = 1;j<=c;j++){
            if (text1[i-1] === text2[j-1] ){ // 字符串需从下标0开始
                dp[i][j] = dp[i-1][j-1] +1
            }else {
                dp[i][j] = Math.max(dp[i-1][j],dp[i][j-1])
            }
        }
    }
    return dp[r][c]
};
console.log(longestCommonSubsequence( "abc",  "def"))