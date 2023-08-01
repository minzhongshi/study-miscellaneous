let START = 2 ** 53
let END = START + 100
for (let i =START; i < END; i++) {
    console.log('loop')
}

// 无法预测 死循环
// 超过安全范围 START + 1 的值不会改变

