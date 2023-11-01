let Goods = {
    pic: '商品图片',
    title: '商品标题',
    desc: '商品描述',
    sellNumber: '销量',
    favorRate: '好评率',
    price: '价格',
}

class UIGoods {
    constructor(g) {
        // this.data = g
        g = {...g} // 对象克隆
        Object.freeze(g) // 对象冻结，防止修改原对象属性
        Object.defineProperty(this, 'data', {
            enumerable: true,
            configurable: true,
            // writable: false,
            get() {
                return g
            },
            set(value) {
                console.log('不能更改')
                // g = value
            }
        })
        Object.freeze(this) // 对象冻结，防止修改原对象属性
        Object.seal(this) // 对象密封，防止删除属性
    }
}

// 在其中可以通过重新赋值的方式改变data的值
let g = new UIGoods(Goods)
g.data = 'abc'
console.log(g.data)