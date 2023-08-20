import { createApp } from 'vue'
import './style.css'
import ElementPlus from "element-plus";
// @ts-ignore
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// @ts-ignore
import sizeDireect from '../src/directs/resize指令封装/sizeDireect'
// pinia
import store from "./store";

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.directive('size-ob', sizeDireect)
app.use(store).use(ElementPlus).mount('#app')
