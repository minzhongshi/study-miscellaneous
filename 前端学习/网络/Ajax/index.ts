const fs = require('fs')

const express = require('express')
const app = express()
const multer = require('multer')

const single = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './upload')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})
const upload = multer({
    single
})

app.get('/api/txt',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    const {name} = req.query // 函数名
    let text = ''
    for(let i=0;i<10000;i++){
        text += `${name}Ajax`
    }
    res.send( text)
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))
// post请求
app.post('/api/post',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    console.log(req.body)
    res.json({
        code:200,
        data:{
            name: req.body.name
        }
    })
})
app.options('/api/*', (req,res) => {
    res.setHeader("Access-Control-Allow-Origin","*")
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.end()
})

//传文件
app.post('/api/upload',upload.single('file'),(req,res)=>{
    console.log(req.file)
    res.setHeader('Access-Control-Allow-Origin','*')
    res.json({
        code:200
    })
})

//SSE
app.get('/api/sse',(req,res)=>{
    res.writeHead(200,{
        'Content-Type': 'text/event-stream',
        'Access-Control-Allow-Origin': '*'
    })
    // 读取本地文件
    const txt =  fs.readFileSync('../SSE/index.txt','utf8')
    // 分割成字符数组
    const arr = txt.split('')
    let currnet = 0
    let timer = setInterval(()=>{
        if (currnet < arr.length){
            // 设置返回事件名称
            // res.write(`event:dg\n`)
            res.write(`data:${arr[currnet]}\n\n`)
            currnet++
        }else{
            clearTimeout(timer)
        }
    },300)

})

// navigator.sendBeacon
app.post('/api/b',(req,res)=>{
    console.log(req.body)
    res.send('ok')
})

app.listen(3000,()=>{
    console.log('server is running')
})