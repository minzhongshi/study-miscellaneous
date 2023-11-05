/**
 * 给你一个字符串 s，请你将 s 分割成一些子串，使每个子串都是 回文串 。返回 s 所有可能的分割方案。
 *
 * 回文串 是正着读和反着读都一样的字符串。
 *
 *
 * 示例 1：
 * 输入：s = "aab"
 * 输出：[["a","a","b"],["aa","b"]]
 *
 * 示例 2：
 * 输入：s = "a"
 * 输出：[["a"]]
 *
 *
 * 思路：
 *    1.求出所有的分割方案
 *      1.1 从0开始，寻找长度为i的子串
 *      1.2 定义一个辅助函数division(start,k,arr)
 *          start: 开始位置
 *          k: 长度
 *          arr: 当前子串
 *          当k为0时，将当前子串加入结果集，也就是某一个分支分割到了最后
 *    2.对每个方案进行判断，如果是回文串，则加入结果集
 */
/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function(s) {
    let result = []
    for (let i  = 0;i<=s.length;i++) { // 从0开始，寻找长度为i的子串,作为分割方案
        division(0,i,[])
    }
    return  result
    function division(start,k,arr){// start: 开始位置，k: 长度，arr: 当前子串
        if (k === 0 && start === s.length){// 当k为0时，以及分割到了最后一个，将当前子串加入结果集
            result.push(arr)
            return
        }
        for (let i = start;i<s.length;i++){// 从start开始遍历s
            let str = s.slice(start,i+1) // 截取当前子串
            if (isPalindrome(str)){ // 如果是回文串
                arr.push(str)
                division(i+1,k-1,[...arr])
                arr.pop()
            }
        }
    }

    function isPalindrome(str) {// 双指针判断是否是回文串
        let i = 0
        let j = str.length-1
        while (i<j){
            if (str[i] !== str[j]){
                return false
            }
            i++
            j--
        }
        return true
    }
};
console.log(partition('aab'))