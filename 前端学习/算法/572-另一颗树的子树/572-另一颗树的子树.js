/**
 * 给你两棵二叉树 root 和 subRoot 。检验 root 中是否包含和 subRoot 具有相同结构和节点值的子树。如果存在，返回 true ；否则，返回 false 。
 * 二叉树 tree 的一棵子树包括 tree 的某个节点和这个节点的所有后代节点。tree 也可以看做它自身的一棵子树。
 *
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 *
 * 示例 1：
 *
 *
 * 输入：root = [3,4,5,1,2], subRoot = [4,1,2]
 * 输出：true
 *
 *
 * 示例 2：
 * 输入：root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]
 * 输出：false
 *
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
var isSubtree = function(root, subRoot) {
    let traverseRoot = []
    let traverseSubRoot = []
    // 二叉树先序遍历
    const traverse = (node, arr) => {
        if (node === null) {
            arr.push('-null')
            return
        }
        arr.push(`-${node.val}`)
        traverse(node.left, arr)
        traverse(node.right, arr)
    }
    traverse(root, traverseRoot)
    traverse(subRoot, traverseSubRoot)
    // 判断是否包含
    // 暴力
     return traverseRoot.join(',').includes(traverseSubRoot.join(','))

    // KMP 算法
    const kmp = (str, pattern) => {
        const getPrefix = (pattern) => {
            const next = [] // 前缀表
            let len = 0 //最长前后缀长度
            next[0] = 0
            for (let i = 1; i<pattern.length;i++){
                while (len > 0 && pattern[i]!==pattern[len]){
                    len = next[len-1]
                }
                if (pattern[i]===pattern[len]){
                    len++
                }
                next[i] = len
            }
            return next
        }
        const prefix = getPrefix(pattern)
        let j = 0 // 前缀表值
        for (let i = 0;i<str.length;i++){
            while (j > 0 && str[i] !== pattern[j]){
                j=prefix[j-1]
            }
            if (str[i] === pattern[j]){// 字符相等
                j++ // 往后移
            }
            if(j === pattern.length){
                return true
            }
        }
        return false
    }
    return kmp(traverseRoot, traverseSubRoot)
};