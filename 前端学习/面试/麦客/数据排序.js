/**
 * 数据排序
 *
 * 假设有如下字符串“A12”，其中“A”表示数据类型（A-Z），“12”表示数据序号（0-9）。
 * 现在需要对一组数据先按照数据序号再按照数据类型进行排序。
 * 例如：["B3","D2","F1","A9","D12","A2","C1","Z0","B1"]=>["Z0","B1","C1","F1","A2","D2","B3","A9","D12"]
 */
function sortData(data) {
    let arr = data.map(item => { // 将数据转换为对象数组
        return {
            type: item[0],
            num: item.slice(1)
        }
    })
    arr.sort((a, b) => {
        if (a.num === b.num) {
            return a.type.charCodeAt() - b.type.charCodeAt()
        }
        return a.num - b.num
    })
    return arr.map(item => item.type + item.num)
}
let arr = ["B3","D2","F1","A9","D12","A2","C1","Z0","B1"]
console.log(sortData(arr))