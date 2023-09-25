import {createPinia,PiniaVuePlugin} from "pinia";
/**
 * 利用createPinia方法创建大仓库(在Vue2中使用PiniaVuePlugin)
 * 并对外暴露该仓库
 * 在全局引入
 */
let store = createPinia()
// pinia 持久化
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
store.use(piniaPluginPersistedstate)
export default store