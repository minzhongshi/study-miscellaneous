const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.post('/tracker',(req,res)=>{
    console.log(req.body);
    res.send({
        code:200,
        msg:'上报成功'
    })
})
app.listen(9000,()=>{
    console.log('服务启动成功')
})