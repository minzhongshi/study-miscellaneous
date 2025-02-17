/**
 * 根据数字按键，得到所有字母排列组合（九键）
 * @param {string} digits 数字按键，例如：'23‘
 * @return {string[]} 按键的所有排列组合
 */
function keyboardMap(digits) {
    /**
     *
     * @param arr1 第一个字母集合
     * @param arr2 第二个字母集合
     * @return {*|*[]} 组合笛卡尔积
     * @private
     */
    function _compose(arr1,arr2) {
        if (arr1.length === 0)return arr2
        if (arr2.length === 0)return  arr1
        const result = []
        for (let i =0;i<arr1.length;i++){
            for (let j =0;j<arr2.length;j++){
                result.push(arr1[i] + arr2[j])
            }
        }
        return result
    }
    // 字母映射表
    const map = ['','abc','def','ghi','jkl','mno','pqrs','tuv','wxyz']
    const result = digits.split('')
        .map(it=>map[it])
        .reduce((r,it)=>
        _compose(r,it.split(''))
    ,[])
    return result

}

console.log(keyboardMap('2347'))
