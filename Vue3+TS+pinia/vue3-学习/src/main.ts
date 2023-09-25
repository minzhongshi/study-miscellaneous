// @ts-ignore
// @ts-ignore

import { createApp } from 'vue'
const app = createApp(App)
import './style.css'
import ElementPlus from "element-plus";
// @ts-ignore
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// @ts-ignore
import sizeDireect from '../src/directs/resize指令封装/sizeDireect'
// pinia
import store from "./store";
app.use(store)
// 全局挂载组件
// @ts-ignore
import Card from './components/组件/全局组件/Card.vue';
// tailwindcss
import './tailwindcss.css'
import lazyDireect from "./directs/视口监控指令/lazyDireect";


// 循环挂载Icon图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
// mitt
import $bus from '../src/bus/index'
app.config.globalProperties.$bus = $bus
// 全局变量和方法
app.config.globalProperties.$env = 'dev'
app.config.globalProperties.$filters = {
    format<T>(str:T) {
        return`smz-${str}`
    }
}
// 声明扩充
type Filter = {
    format<T>(str:T):string
}
// @ts-ignore
declare module 'vue'{
    export interface ComponentCustomProperties {
        $filters: Filter,
        env:string,
        $bus:any
    }
}

//挂载组件
app.component('Card',Card)
//挂载指令，省略‘v-’前缀
app.directive('size-ob', sizeDireect)
app.directive('lazy-ob', lazyDireect)
// 自定义Hooks + 自定义指令
import useResize from "../src/hooks/useResize";
import {Emitter, EventType} from "mitt";
// @ts-ignore
app.use(useResize)



app.use(ElementPlus).mount('#app')
