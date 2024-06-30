import {configureStore} from '@reduxjs/toolkit'
import counterReducer  from "./modules/counterStore";
import channelReducer from "./modules/channelStore";
import userReducer from "./modules/userStore";

import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
// import thunk from 'redux-thunk';

// combineReducers合并reducer
const reducers = combineReducers({
    counter: counterReducer,
    channel: channelReducer,
    user: userReducer
});

// 持久化配置信息
const persistConfig = {
    key: 'user',
    storage,
    // 黑名单 不缓存的
     blacklist:['channel','counter'],
    whitelist: ['user']
};

const persistedReducer = persistReducer(persistConfig, reducers);

//创建store组合子模块
const store = configureStore({
    reducer: persistedReducer,
    /**
     * A single reducer function that will be used as the root reducer, or an
     * object of slice reducers that will be passed to `combineReducers()`.
     */
//  reducer: Reducer<S, A, P> | ReducersMapObject<S, A, P>

/**
 * 要安装的Redux中间件数组。如果未提供，默认为 ' getDefaultMiddleware() '返回的中间件集合。
 */
// middleware?: ((getDefaultMiddleware: CurriedGetDefaultMiddleware<S>) => M) | M
    middleware:getDefaultMiddleware => getDefaultMiddleware({
        //关闭redux序列化检测
        serializableCheck:false
    })

/**
 * 是否集成Redux DevTools。默认为“true”。
 *
 * 额外的配置可以通过传递Redux DevTools选项来完成
 */
// devTools?: boolean | DevToolsOptions

/**
 * 初始状态，与Redux的createStore相同。
 * 您可以选择指定它来水合物状态
 * 从服务器中通用的应用程序，或者恢复一个以前序列化的
 * 用户会话。如果你使用' combineReducers() '来生成根减速器
 * 函数(直接或间接通过传递一个对象作为' reducer ')，
 * 这个对象必须与reducer映射键具有相同的形状。
 */
// preloadedState?: P

/**
 * 初始状态，与Redux的createStore相同。
 * 您可以选择指定它来水合物状态
 * 从服务器中通用的应用程序，或者恢复一个以前序列化的
 * 用户会话。如果你使用' combineReducers() '来生成根减速器
 * 函数(直接或间接通过传递一个对象作为' reducer ')，
 * 这个对象必须与reducer映射键具有相同的形状。
 */
// enhancers?: (getDefaultEnhancers: GetDefaultEnhancers<M>) => E | E
})

export default store