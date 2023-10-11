/**
 * 给你一个二叉树的根节点 root ，按 任意顺序 ，返回所有从根节点到叶子节点的路径。
 * 叶子节点 是指没有子节点的节点。
 *
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 *
 * 输入：root = [1,2,3,null,5]
 * 输出：["1->2->5","1->3"]
 *
 * 输入：root = [1]
 * 输出：["1"]
 *
 */

/**
 * @param {TreeNode} root
 * @return {string[]}
 */
var binaryTreePaths = function(root) {
    let paths = []
    const route = (node,path) =>{
        if (!node) return null
        path += node.val
        if (node.left === null && node.right === null){// 当前节点为叶子节点
            paths.push(path)
        }else {// 不是叶子节点递归
            path+='->'
            route(node.left,path)
            route(node.right,path)
        }
    }
    route(root,"")
    return paths
};