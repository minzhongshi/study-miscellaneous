import {createRouter,createWebHashHistory,RouteRecordRaw} from 'vue-router'

/**
 * 定义路由映射，每个组件对应一个路由映射
 * 其中路由类型为 RouteRecordRaw
 */
const routes:Array<RouteRecordRaw> = [
    {path: '/A/:id',name:'A',component:()=> import('coms/路由/Router-A.vue')},
    {path: '/B',name:'B',component:()=> import('coms/路由/Router-B.vue')},
    {path: '/C',name:'C',component:()=> import('coms/路由/Router-C.vue')},
    {path: '/D',name:'D',component:{
        defaults:()=> import('coms/路由/Router-C.vue')
        }},
    {path: '/E',name:'E',alias:['/E1','/E2'],redirect: to=>{
        return '/B'
        },component:{
            aaa:()=> import('coms/路由/Router-C.vue'),
            bbb:()=> import('coms/路由/Router-C.vue')
        },children:[
            {path: '/B',name:'B',component:()=> import('coms/路由/Router-B.vue')},
        ]},
]

/**
 * 创建路由实例传递一些配置
 * 配置：
 * 1.history
 *   路由模式存在三种：
 *    vue2--->mode:history ===  vue3--->history:createWebHistory()
 *    vue2--->mode:hash   === vue3--->history:createWebHashHistory()
 *    vue2--->mode:abstact  === vue3--->history:createMemoryHashHistory()
 * 2.routes
 *   路由映射关系
 * 3.scrollBehavior（可选）
 * 4.parseQuery（可选）
 * 5.stringifyQuery（可选）
 * 6.linkActiveClass（可选）
 * 7.linkExactActiveClass（可选）
 */
export const router = createRouter({
    history:createWebHashHistory(import.meta.env.BASE_URL),
    // routes, // `routes: routes` 的缩写
    routes:[
        {
            path:'/',
            component:()=>import('@/views/路由/前置守卫/Login.vue')
        },
        {
            path:'/home',
            component:()=>import('@/views/路由/前置守卫/Home.vue')
        }
    ]
})

/**
 * 全局前置守卫：router.beforeEach()
 *    用来拦截路由跳转，在跳转前做判断有三个参数
 *      to: 跳转到哪个路由
 *      from: 从哪个路由跳转
 *      next(): 执行跳转
 *      next(false):终端导航
 *      next('/'):跳转到不同的地址，中断当前导航，进行新的导航
 */
// 白名单
const whileList = ['/']
router.beforeEach((to,from,next)=>{
    if (whileList.includes(to.path) || localStorage.getItem('token')){
        next()
    }else {
        next('/')
    }
})

/**
 * 全局后置守卫：router.afterEach()
 *    用来在路由跳转后，做的一些操作，比如加载条
 *      to: 跳转到哪个路由
 *      from: 从哪个路由跳转
 */
router.afterEach((to,from)=>{
    
})