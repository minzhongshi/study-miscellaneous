/**
 * 给你一棵 完全二叉树 的根节点 root ，求出该树的节点个数。
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
 * @return {number}
 */
var countNodes = function(root) {
    if (!root) return 0
    let treeH = 1
    let leftNode = root
    while (leftNode.left){
        treeH++
        if (leftNode.left){
            leftNode = leftNode.left
        }
    }
    let minNode = (1<<(treeH-1)) // 最小
    let maxNode = (1<<treeH) -1 // 最大
    while (minNode<maxNode){
        const mid = Math.floor((maxNode-minNode+1)/2) + minNode // 中值
        // 是否存在该节点
        if (place(root,mid)){
            minNode = mid
        }else{
            maxNode = mid - 1
        }
    }
    return minNode

    //二分
    function place(root,mid) {
        let node =root
        let bits = mid
        let temp = []
        // 找位置 0：左  1：右
        while ( bits >= 2){
            temp.push(bits%2)
            bits >>=1
        }
        // 查找是否存在
        for (let i = temp.length-1;i>=0;i--){
            if (temp[i]===0){
                node=node.left
            }else {
                node = node.right
            }
        }
        return node !==null
    }
};