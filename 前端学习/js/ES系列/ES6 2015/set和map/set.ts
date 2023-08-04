/**
 *
 * set具有天然去重的效果，引用类型除外
 *  属性：
 *    1.size: 集合数据长度
 *  方法：
 *    1.add(value):添加，返回Set结构本身
 *    2.delete(value):删除，返回布尔值，表示结果
 *    3.has(value)查询，返回布尔值，表示改值是否存在
 *    4.clear()清除所有,无返回
 *
 */
// @ts-ignore
let  set:Set<number> = new Set([1,2,3,4,5,6,6,6,6,6,6])
console.log(set)// Set(6) { 1, 2, 3, 4, 5, 6 }

set.add(7)
set.delete(7)
set.has(7)
set.clear()
set.keys()
