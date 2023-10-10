const express = require('express')
const app = express()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE");
    next();
});

// 解析req.body中的内容
app.use(express.text())
// 心跳包
app.post('/api/heartbeat',(req,res)=>{
    console.log(req.body)
    res.send('ok')
})

// 解析req.body中的内容
app.use(express.json())

// navigator.sendBeacon
app.post('/api/b',(req,res)=>{
    console.log(req.body)
    res.send('ok')
})

app.listen(3001,()=>{
    console.log('server is running')
})