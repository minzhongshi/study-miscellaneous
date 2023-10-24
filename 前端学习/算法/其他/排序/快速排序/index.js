/**
 * 快速排序
 * 1. 从数列中挑出一个元素，称为 “基准”（pivot）；
 * 2. 重新排序数列，所有元素比基准值小的摆放在基准前面，
 *   所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。
 *   在这个分区退出之后，该基准就处于数列的中间位置。
 *   这个称为分区（partition）操作；
 * 3. 递归地（recursive）把小于基准值元素的子数列和大于基准值
 *   元素的子数列排序。
 * 4. 递归到最底部时，数列的大小是零或一，也就是已经排序
 *   好了。这个算法一定会结束，因为在每次的迭代（iteration）
 *   中，它至少会把一个元素摆到它最后的位置去。
 *
 * 优化：
 *    1、三数取中
 *       int mid = left + (right - left) / 2;
 *    2、随机取数
 *       int randomNum = left + (int) (Math.random() * (right - left + 1));
 *    4、小数组使用插入排序
 *       if (right - left + 1 <= 15) {
 *       insertionSort(arr, left, right);
 *       return;
 *       }
 *    5、尾递归优化
 *    6、多路快排
 *       三路快排：将数组分为三部分，小于基准值、等于基准值、大于基准值
 *       双路快排：将数组分为两部分，小于基准值、大于基准值
 *
 * @type {number[]}
 */
const arr = [9,5,7,2,4,1]
function quickSort(arr) {
    // 长度小于1直接返回
    if(arr.length <= 1)return arr
    // 向下取整 找到基准值
    let pivotIndex = Math.floor(arr.length / 2)
    // 将基准点取出并存储
    let pivot = arr.splice(pivotIndex, 1)[0]
    // 左右存储基于基准点
    let left = []
    let right = []
    for(let i =0;i<arr.length;i++){
        if(arr[i]< pivot){
            left.push(arr[i])
        }else{
            right.push(arr[i])
        }
    }
    //尾递归优化
    return quickSort(left).concat([pivot],quickSort(right))
}
console.log(quickSort(arr));