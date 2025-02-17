/**
 * 给定二叉树的根节点 root ，返回所有左叶子之和。
 *
 * 示例 1：
 * 输入: root = [3,9,20,null,null,15,7]
 * 输出: 24
 * 解释: 在这个二叉树中，有两个左叶子，分别是 9 和 15，所以返回 24
 *
 * 示例 2:
 * 输入: root = [1]
 * 输出: 0
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumOfLeftLeaves = function(root) {
    let num = 0
    function dfs(node) {
        if (node){
            if (node.left && !node.left.left && !node.left.right){
                num += node.left.val
            }
            dfs(node.left)
            dfs(node.right)
        }
    }
    dfs(root)
    return num
};