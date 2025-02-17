const cvs = document.querySelector('canvas')
const ctx = cvs.getContext('2d')

function init() { // 让canvas更清晰，添加额外像素密度
    cvs.width = window.innerWidth * window.devicePixelRatio
    cvs.height = window.innerHeight * window.devicePixelRatio
}
init()

function getRandom(min,max) {
    return Math.floor(Math.random() * (max + 1 -min) + min)
}
class Point {
    constructor() {
        this.r = 6 // 半径
        this.x = getRandom(0,cvs.width - this.r/2) // 横坐标
        this.y = getRandom(0,cvs.height - this.r/2)// 纵坐标
        this.xSpeed = getRandom(-50,50) //横向移动
        this.ySpeed = getRandom(-50,50)// 纵向移动
        this.lastDrawTime = null // 运动时间
    }
    draw() {
        if (this.lastDrawTime){ // 根据运动时间，计算当前位置
            const now = Date.now()
            const t = (now - this.lastDrawTime)/1000
            let x = this.x +this.xSpeed * t
            let y = this.y + this.ySpeed * t
            if (x<this.r || x >= cvs.width -this.r){
                this.xSpeed *= -1
            }
            if (y<this.r || y >= cvs.height -this.r){
                this.ySpeed *= -1
            }
            this.x = x
            this.y = y
        }
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.r,0,2 * Math.PI)
        ctx.fillStyle = 'rgb(200,200,200)'
        ctx.fill()
        this.lastDrawTime = Date.now()
    }
}

class Graph {
    constructor(pointNumber = 30,maxDis = 500) {
        this.points = new Array(pointNumber).fill(0).map(()=>
            new Point()
        )
        this.maxDis = maxDis
    }
    draw(){
        //不断地画
        requestAnimationFrame(()=>{
            this.draw()
        })
        //清除之前的
        ctx.clearRect(0,0,cvs.width,cvs.height)
        for (let i = 0;i<this.points.length;i++){
            const p1 = this.points[i] // 画点
            p1.draw()
            for (let j = i+1;j<this.points.length;j++){ // 连线，设置透明度
                const p2 = this.points[j]
                const d =Math.sqrt((p1.x - p2.x) ** 2 + (p1.y -p2.y) **2)
                if (d> this.maxDis){
                    continue
                }
                ctx.beginPath()
                ctx.moveTo(p1.x,p1.y)
                ctx.lineTo(p2.x,p2.y)
                ctx.closePath()
                ctx.strokeStyle = `rgba(200,200,200,${d/this.maxDis})`
                ctx.stroke()
            }
        }
    }
}

const g = new Graph()
g.draw()