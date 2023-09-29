const express = require('express')
const app = express()
app.get('/api/jsonp',(req,res)=>{
    const {callback} = req.query // 函数名
    res.send(`${callback}('hello jsonp')`) //返回并将数据充当函数参数返回
})

// 产生跨域
app.get('/api/json',(req,res)=>{
    res.send({name:'smz'})
})

app.listen(3000,()=>{
    console.log('server is running')
})