// 获取canvas 元素
const cvs = document.getElementById('bg')
// 获取窗口尺寸
const width = window.innerWidth * devicePixelRatio,
    height = window.innerHeight * devicePixelRatio
// 设置canvas尺寸为窗口尺寸
cvs.width = width
cvs.height = height

// 获取绘制上下文
const ctx = cvs.getContext('2d');
// 字体大小
const fontSize = 20* devicePixelRatio
// 列宽
const columnWidth = fontSize;
// 列数
const columnCount = Math.floor(width / columnWidth)
// 每一列下一个文字是第几个字
const nextChar = new Array(columnCount).fill(0)

// 画一行字
function draw() {
    ctx.fillStyle = 'rgba(240, 240, 240, 0.1)'
    ctx.fillRect(0,0,width,height)
    for (let i=0;i<columnCount; i++){
        // 位置 颜色 字符 字体
        ctx.fillStyle = getRandomColor()
        const char = getRandomChar()
        ctx.font = `${fontSize}px "Roboto Mono"`
        const x = i * columnWidth
        const s = nextChar[i]
        const y = (s+1) *fontSize
        ctx.fillText(char, x, y)
        if (y > height && Math.random() > 0.99){
            nextChar[i] = 0
        }else {
            nextChar[i]++
        }

    }
}

//随机颜色
function getRandomColor() {
    const fontColors = [
        '#33B5E5',
        '#0099CC',
        '#AA66CC',
        '#9933CC',
        '#99CC00',
        '#669900',
        '#FFBB33',
        '#FF8800',
        '#FF4444',
        '#CC0000',
    ]
    return fontColors[Math.floor(Math.random() *fontColors.length)]
}

//随机文字
function getRandomChar() {
    const str = 'console.log("hello world")'
    return str[Math.floor(Math.random() * str.length)]
}

draw()
setInterval(draw,30)