const net = require('net')

const html = `<h1>SMZ</h1>`

// 自定义返回报文
const headers = [
    'HTTP/1.1 200 ok',
    'Content-Type: TEXT/HTML',
    `Content-Length: ${html.length}`,
    'Date: Mon,27 Jul 2009 12:28:53 GMT',
    `\r\n`,
    html
]
const server = net.createServer((socket)=>{
    socket.on('data',(data)=>{
        if (/GET/.test(data.toString())){
            socket.write(headers.join('\r\n'))
            socket.end()
        }
    })
})

server.listen(8080,()=>{
    console.log(server.address())
})