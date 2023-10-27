/**
 * 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。
 *
 * 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

 * 示例 1：
 * 输入：digits = "23"
 * 输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]
 *
 * 示例 2：
 * 输入：digits = ""
 * 输出：[]
 *
 * 示例 3：
 * 输入：digits = "2"
 * 输出：["a","b","c"]
 */

/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    const assembly = (arr1,arr2) =>{
        if (arr1.length === 0)return arr2
        if (arr2.length === 0)return arr1
        const result = []
        for (let i=0;i<arr1.length;i++){
            for (let j = 0;j<arr2.length;j++){
                result.push(arr1[i] + arr2[j])
            }
        }
        return result
    }
    const map = ['','','abc','def','ghi','jkl','mno','pqrs','tuv','wxyz']
    return digits.split('')
        .map(it => map[it])
        .reduce((r, it) =>
                assembly(r, it.split(''))
            , [])
};