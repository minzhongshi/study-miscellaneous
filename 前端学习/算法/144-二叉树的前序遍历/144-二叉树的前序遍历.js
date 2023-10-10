/**
 * 给你二叉树的根节点 root ，返回它节点值的 前序 遍历。
 *
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
    let temp = []
    function f(node) {
        if (!node) return
        temp.push(node.val)
        f(node.left)
        f(node.right)
        return temp
    }
    f(root)
    return temp
};