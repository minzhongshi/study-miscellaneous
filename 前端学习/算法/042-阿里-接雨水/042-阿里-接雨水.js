/**
 * 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
 * 示例 1：
 * 输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
 * 输出：6
 * 解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。
 */
/**
 * 分析：
 *    达到存水的条件在于，某个位置左右两侧存在有比当前位置高的柱子
 *    存水的多少由短的柱子决定
 */

/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    let left = 0;let right = height.length -1// 双指针
    let maxLeft = 0;let maxRight = 0// 左右最高柱子高度
    let water = 0 // 存水量
    while (left<=right){
        if (maxLeft<=maxRight){// 左边最高柱子高度小于右边最高柱子
            maxLeft = Math.max(maxLeft,height[left])// 当前位置是否比左边最高柱子高
            water += maxLeft - height[left] // 计算水量，左边最高柱子 - 当前位置柱子高度
            left++
        }else {
            maxRight = Math.max(maxRight,height[right])
            water += maxRight - height[right]
            right--
        }
    }
    return water
};

console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1]))