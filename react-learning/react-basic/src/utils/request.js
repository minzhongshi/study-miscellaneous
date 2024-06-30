/**
 * 1. 根域名配置
 * 2. 超时时间
 * 3. 请求拦截器 / 响应拦截器
 */

import axios  from "axios";
import {useSetToken,getToken,useRemoveToken} from "@/utils";
import {useNavigate} from "react-router-dom";
import router from "../router";


const request = axios.create({
    baseURL : 'http://geek.itheima.net/v1_0', // 根域名
    timeout: 5000 //超时
})

// 请求拦截器
request.interceptors.request.use((config) =>{
    // 注入TOKEN
    const token = getToken();
    console.log(token);
    if (token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
},(error)=>{
    return Promise.reject(error);
})

//响应拦截器
request.interceptors.response.use((response)=>{
    return response.data
},(error)=>{
    // token失效
    if (error.response.status === 401){
        router.navigate('/login');
        // 强制刷新
        window.location.reload();
    }
    return Promise.reject(error);
})

export {request}