//安装 ws
const ws =require('ws')
// 创建socket服务
const wss = new ws.Server({port:8080},()=>{
    console.log('socket服务启动成功')
})

//心跳枚举
const state = {
    HEART:1,
    MESSAGE:2
}

// 监听客户端连接
wss.on('connection',(socket)=>{
    //监听客户端消息
    console.log('客户端连接成功')
    socket.on('message',(e)=>{
        console.log(e.toString())
        // 广播消息
        wss.clients.forEach((client)=>{
            client.send(JSON.stringify({
                type:state.MESSAGE,
                message:e.toString()
            }))
        })
    })
    let heartInreaval = null
    const heartCheck = () =>{
        // 等于open 发送心跳
        if (socket.readyState === ws.OPEN){
            socket.send(JSON.stringify({
                type:state.HEART,
                message:'心跳检测'
            }))
        }else {
            clearInterval(heartInreaval)
        }
    }
    setInterval(heartCheck,5000)
})