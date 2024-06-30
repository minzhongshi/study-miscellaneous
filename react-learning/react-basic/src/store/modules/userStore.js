import {createSlice} from "@reduxjs/toolkit";
import { loginAPI, getProfileAPI } from '@/apis/user'


const userStore = createSlice({
    name : 'user',
    initialState:{
        token: '',
        userInfo:{}
    },
    reducers: {
        setToken(state,action){
            // 简写
            state.token = action.payload
            // _setToken(action.payload)
            // 正统写法
            // return {
            //     ...state,
            //     token: action.payload
            // }
        },
        setUserInfo (state, action) {
            state.userInfo = action.payload
        },
        clearUserInfo (state) {
            state.token = ''
            state.userInfo = {}
        }
    }
})

const {setToken,setUserInfo, clearUserInfo} = userStore.actions

const userReducer = userStore.reducer


// 异步方法 获取Token
const fetchLogin = (loginForm)=>{
    return async (dispatch)=>{
        // 发送异步请求
        const res =await loginAPI(loginForm)
        //提交同步action进行token的存入
        dispatch(setToken(res.data.token))
    }
}

// 获取个人用户信息异步方法
const fetchUserInfo = () => {
    return async (dispatch) => {
        const res = await getProfileAPI()
        dispatch(setUserInfo(res.data))
    }
}


export {fetchLogin,fetchUserInfo,setToken,clearUserInfo}

export default userReducer