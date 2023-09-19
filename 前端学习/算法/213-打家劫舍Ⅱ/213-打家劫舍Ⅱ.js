/**
 * 你是一个专业的小偷，计划偷窃沿街的房屋，每间房内都藏有一定的现金。这个地方所有的房屋都 围成一圈 ，这意味着第一个房屋和最后一个房屋是紧挨着的。同时，相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警 。
 *
 * 给定一个代表每个房屋存放金额的非负整数数组，计算你 在不触动警报装置的情况下 ，今晚能够偷窃到的最高金额。
 *
 * 示例 1：
 *
 * 输入：nums = [2,3,2]
 * 输出：3
 * 解释：你不能先偷窃 1 号房屋（金额 = 2），然后偷窃 3 号房屋（金额 = 2）, 因为他们是相邻的。
 * 示例 2：
 *
 * 输入：nums = [1,2,3,1]
 * 输出：4
 * 解释：你可以先偷窃 1 号房屋（金额 = 1），然后偷窃 3 号房屋（金额 = 3）。
 *      偷窃到的最高金额 = 1 + 3 = 4 。
 * 示例 3：
 *
 * 输入：nums = [1,2,3]
 * 输出：3
 */

/**
 * 分析：
 *     需要考虑的是，如果偷了第一家那么就不能偷最后一家
 *     反过来同理，偷了最后一家就不能偷第一家
 *     那么，偷了第一家，就应该直接将最后一家排除，也就是dp范围应该是[0,nums.length - 2]
 *     偷了最后一家，就将第一家排除，dp范围为[1,nums.length - 1]
 *     最后将两个得到的金额取最大值就是正解
 *
 *     边界处理：
 *          当只有一家或者两家的时候不用考虑首尾
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    if (nums.length === 0){
        return 0
    }
    if (nums.length === 1){
        return nums[0]
    }
    let dp1 = []
    let dp2 = []
    for (let i = 0;i<nums.length - 1;i++){
        if (i === 0){
            dp1[0] = nums[0]
        }else if (i === 1){
            dp1[1] = Math.max(nums[0],nums[1])
        }else{
            dp1[i] = Math.max(dp1[i-2] + nums[i],dp1[i-1])
        }
    }
    for (let i = 1;i<nums.length;i++){
        if (i === 1){
            dp2[1] = nums[1]
        }else if (i === 2){
            dp2[2] = Math.max(nums[1],nums[2])
        }else{
            dp2[i] = Math.max(dp2[i-2] +nums[i],dp2[i-1])
        }
    }
    return Math.max(dp1[nums.length - 2],dp2[nums.length -1])
};

console.log(rob([1,2,1,1]))