// 想要对数组进行一些如排序分割等操作时，使用sort、splice方法会对原数组造成影响
// ES2023 推出了不破坏原数组的方法
const  arr = [3,2,1]
//const sortArr = arr.sort()
//sortArr[1,2,3]
//arr[1,2,3]

// 1.toSorted() 排序
const sortedArr = arr.toSorted()

// 2.toReversed() 反转
const reversedArr = arr.toReversed()

// 3.toSplice() 分割
// const spliceArr = arr.toSplice()

// 4.with() 修改指定索引返回新数组
const withArr = arr.with(1, 4);

// 5.findLast() 从数组尾部查找
const result = arr.findLast((element) => element > 2);

// 6.findLastIndex() 从数组尾部查找返回索引
const resultIndex = arr.findLastIndex((element) => element > 2);

