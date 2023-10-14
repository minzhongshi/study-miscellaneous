export class TrafficLight {
    constructor(options) {
        const {// 用于接收参数
            red = 60,
            yellow = 3,
            green = 60,
            initial = 'green',
        } = options || {}

        this._colors = {// 用于存储各个颜色和下一个颜色
            red:{
                seconds: red,
                next: 'yellow'
            },
            yellow:{
                seconds: yellow,
                next: 'green'
            },
            green:{
                seconds: green,
                next: 'yellow'
            }
        }
        this._switchColor(initial)
    }

    _switchColor(color) {// 用于切换到指定颜色
        this._currentColor = color // 当前颜色
        this._seconds = this._colors[color].seconds // 当前颜色的秒数
        this._timer = Date.now() // 当前颜色的开始时间
    }

    _nextColor(color) {// 用于切换到下一个颜色
        if (this._currentColor !== 'red') {
            this._colors.yellow.next = 'green'
        }else if (this._currentColor === 'green') {
            this._colors.yellow.next = 'red'
        }
        this._switchColor(this._colors[this._currentColor].next)
    }
    getCurrentList() {// 用于获取当前颜色和剩余秒数
        const remain = Math.floor(this._seconds - (Date.now() - this._timer) / 1000)
        if (remain <= 0) { // 如果剩余秒数小于等于0，切换到下一个颜色
            this._nextColor()
            return this.getCurrentList()
        }
        return {
            color: this._currentColor,
            time: remain
        }
    }
}
