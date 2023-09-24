/**
 * 发出请求，返回Promise
 * @param url 请求地址
 * @param maxCount 最大重试次数
 */
function request(url, maxCount = 5) {
    return fetch(url).catch(err=>
    maxCount<=0?
    Promise.reject(err): // 重试次数耗尽后在Promise失败回调中返回err
        request(url,maxCount- 1) //重试次数还有则重新调用请求方法，并将重试次数减一
    )
}

request('https://asdfas.asdfa3432sdf.com/tod')
.then((resp)=>{
    console.log(resp)
})
.catch((err)=>{
    console.log(err)
})