/**
 * 插入排序
 * 1. 从第一个元素开始，该元素可以认为已经被排序；
 * 2. 取出下一个元素，在已经排序的元素序列中从后向前扫描；
 * 3. 如果该元素（已排序）大于新元素，将该元素移到下一位置；
 * 4. 重复步骤 3，直到找到已排序的元素小于或者等于新元素的位置；
 * 5. 将新元素插入到该位置后；
 * 6. 重复步骤 2~5。
 */
const arr = [9,5,7,2,4,1]
function insertionSort(arr) {
    for(let i = 0;i<arr.length;i++){
        let preIndex = i - 1// 前一个元素的索引
        let current = arr[i]// 当前元素
        while(current<arr[preIndex] && preIndex >=0){// 循环当前排好序的元素，找需要插入的位置
            arr[preIndex + 1] = arr[preIndex]// 将大于当前元素的元素后移一位
            preIndex--
        }
        arr[preIndex + 1] = current // 将当前元素插入到合适的位置
    }
    return arr
}
console.log(insertionSort(arr));