// import('module') ，动态导入返回一个 Promise。为了支持这种方式，需要在 webpack 中做相应的配置处理。
const promise = import('./重定向导出/module.mjs')

promise.then(res=>{
    console.log(res)
})
// import() 可以动态使用，加载模块。
// import() 返回一个 Promise ，成功回调 then 中可以获取模块对应的信息。
// name 对应 name 属性， default 代表 export default 。__esModule 为 es module 的标识。
// import() 动态加载一些内容，可以放在条件语句或者函数执行上下文中
// import() 可以实现懒加载，举个例子 vue 中的路由懒加载:
//     [
//     {
//         path: 'home',
//         name: '首页',
//         component: ()=> import('./home') ,
//     },
//     ]

// import() 这种加载效果，可以很轻松的实现代码分割。避免一次性加载大量 js 文件，造成首次加载白屏时间过长的情况。

