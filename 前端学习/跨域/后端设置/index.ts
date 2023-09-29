const express = require('express')
const app = express()


app.get('/api/json',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.send({name:'smz'})
})


app.listen(4000,()=>{
    console.log('server is running')
})