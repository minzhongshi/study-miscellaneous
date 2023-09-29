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

/**
 * 路由元信息：
 *    在路由中添加 meta对象，在里面可以定义一些值让路由更具表达性，如：
 *      权限校验标识，路由组件过度名称，持久化缓存keep-alive配置，标题名称
 *    可以在导航守卫或者路由对象中读取路由元信息
 */

/**
 * 路由过渡动效
 *    利用meta定义 transition 属性来指定进入该路由的过渡css样式
 *    这里采用了animate.css 来做动效
 *    改造<router-view>标签，利用插槽和过度组件：
 *        router:当前路由信息,
 *        Component：当前VNode
 *
 *        <router-view v-slot="{ router,Component }">
 *             <transition :name="route.meta.transition">
 *               <component :is="Component" />
 *             </transition>
 *        </router-view>
 */

/**
 * 滚动行为
 *    在跳转路由时,想要页面滚动到顶部，或者保持原先位置，vue-router提供了方法scrollBehavior
 *    方法接收三个参数：
 *       to: 路由到哪
 *       from: 当前路由
 *       savePosition: 通过浏览器前进和后退能使用该参数，记录上一次位置
 *                     vue-router3中是x和y， vue-router4中是top和left
 *
 *    return 期望滚动到哪个的位置
 *    在官网中也列举了几种特殊的滚动条件，如滚动到锚点、滚动到某个元素、延迟滚动等
 *    https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html
 */

/**
 * 动态路由：
 *    一般动态路由是用来做权限控制的，路由由后端返回，在这里就需要将后端返回的路由添加到路由中，
 *    其中使用router.addRoute()和router.removeRoute()方法来添加路由和删除路由
 *    这样就要使用 router.push()或者router.replace()手动导航，才能显示新路由
 */
declare module 'vue-router'{
    interface RouteMeta {
        title: string,
        transition: string
    }
}
export const router = createRouter({
    history:createWebHashHistory(import.meta.env.BASE_URL),
    // routes, // `routes: routes` 的缩写
    // 滚动
    scrollBehavior:(to,from,savePosition)=>{
        return {
            top:0
        }
    },
    routes:[
        {
            path:'/',
            component:()=>import('@/views/路由/前置守卫/Login.vue'),
            meta:{
                title: '登录',
                transition:"animate__fadeIn"
            }
        },
        {
            path:'/home',
            component:()=>import('@/views/路由/前置守卫/Home.vue'),
            meta:{
                title: '主页',
                transition:"animate__bounceIn"
            }
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
 *    场景：权限判断
 */
// 白名单
import {Vnode} from "../src/components/路由/后置守卫/loadingB";
import {render} from 'vue'
render(Vnode,document.body)

const whileList = ['/']
router.beforeEach((to,from,next)=>{
    document.title = to.meta.title
   Vnode.component.extends?.startLoading()
    if (whileList.includes(to.path) || localStorage.getItem('token')){
        next()
    }else {
        next('/')
    }
})

/**
 * 全局后置守卫：router.afterEach()
 *    用来在路由跳转后，做的一些操作，比如加载条,与前置守卫有相同的参数，但是next对路由没影响
 *      to: 跳转到哪个路由
 *      from: 从哪个路由跳转
 *    场景：做loadingBar
 */
router.afterEach( (to,from)=>{
    Vnode.component.extends?.endLoading()
})

router.beforeResolve((to)=>{
    Vnode.component?.extends?.startLoading()
})

