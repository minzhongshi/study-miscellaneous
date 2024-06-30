import {createSlice} from '@reduxjs/toolkit'

const counterStore = createSlice({
    name: 'counter',
    //初始化
    initialState:{
        count: 0
    },
    //修改数据同步方法
    reducers: {
        increment (state){
            state.count++
        },
        decrement (state){
            state.count--
        },
        addToNum(state,action){
            state.count = action.payload;
        }
    }
})

// 解构创建action对象函数
const {increment,decrement,addToNum} =counterStore.actions
//获取reducer函数
const counterReducer = counterStore.reducer;
//导出修改状态方法
export {increment,decrement,addToNum}
export default counterReducer