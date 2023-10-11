const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')
let app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

let Key = 'SMZSMZ'// 密钥
let user = {
    name:'admin',
    password:"123456",
    id:1
}
// 1.登录返回token用于授权
app.post('/api/login',(req,res)=>{
    console.log(req.body)
    if (req.body.name === user.name && req.body.password == user.password){
        res.json({
            message:'登陆成功',
            token:jwt.sign({id:user.id},Key,{expiresIn:'1h'})
        })
    }else {
        res.status(403).json({message:'用户名或密码错误'})
    }
})

//2. 列表接口必须授权状态才能访问否则403
app.get('/api/list',(req,res)=>{
    let token = req.headers.authorization// 前端将token存在请求头里面,这是个规范Authorization
    jwt.verify(token,Key,(err,decode)=>{
        if (err){
            // 没有返回正确token
            res.status(403).json({message: '无权限'})
        }else{
            res.json({
                list:[
                    {id:1,title:'标题1'},
                    {id:2,title:'标题2'},
                ]
            })
        }
    })
})
app.listen(3000,()=>{
    console.log('server started')
})

