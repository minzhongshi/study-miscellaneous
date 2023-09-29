const express = require('express')
const app = express()

app.get('/api/json',(req,res)=>{
    res.send({name:'smz'})
})

app.listen(3000,()=>{
    console.log('server is running')
})