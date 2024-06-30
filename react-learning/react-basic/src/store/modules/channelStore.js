import {createSlice}   from "@reduxjs/toolkit";
import axios from "axios";
const channelStore = createSlice({
    name: 'channel',
    initialState:{
        channelList: []
    },
    reducers:{
        setChannels (state, action){
            state.channelList = action.payload;
        }
    }
})


// 异步请求
const {setChannels}= channelStore.actions
const fetchChannlList = ()=>{
    return async (dispatch)=>{
       const res =await axios.get('http://localhost:5000/list');
        dispatch(setChannels(res.data));
    }
}

export {fetchChannlList}

const reducer = channelStore.reducer;

export default reducer;