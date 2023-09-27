import {axios} from "axios";

//实例创建
const request  = axios.create({
  // 请求公共地址
    baseURL:import.meta.env.VITE_APP_BASE_API,
    timeout:2000
})

// axios请求拦截器
request.interceptors.request.use(config=>{
    // config ：请求信息
    return config
},err=>{
    // 抛出错误
    Promise.reject(err)
})

//响应拦截器
request.interceptors.response.use(res=>{
    return Promise.resolve(res)
},err=>{
    // 抛出错误
    Promise.reject(err)
})

export default request