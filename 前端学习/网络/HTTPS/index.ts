const https = require('https')
const fs = require('node:fs')
// http端口默认80 ， https端口默认443
https.createServer({
    key:fs.readFileSync('private-key.pem'),
    cert:fs.readFileSync('certificate.pem'),
    //密码短语
    passphrase: '123456'
},(req,res)=>{
    res.writeHead(200)
    res.end('success')
}).listen(443,()=>{
    console.log('https server is running at https://localhost:443')
})