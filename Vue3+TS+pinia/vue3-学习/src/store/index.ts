import {createPinia} from "pinia";
/**
 * 利用createPinia方法创建大仓库
 * 并对外暴露该仓库
 * 在全局引入
 */
let store = createPinia()
export default store