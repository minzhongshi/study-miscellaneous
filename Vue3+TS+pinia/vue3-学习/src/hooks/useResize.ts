/**
 * interSectionObserver 主要监听元素是否在视口内
 * MutationObserver 主要监听子集的变化 以及 元素的增删改查
 * ResizeObserver 主要监听元素宽高的变化
 */
// @ts-ignore
import type { APP } from 'vue'

/**
 * 自定义Hooks监听元素宽高变化
 * @param el
 * @param callback
 */
function useResize(el:HTMLElement,callback:Function) {
    let resize = new ResizeObserver((entries)=>{
        callback(entries[0].contentRect)
    })
    resize.observe(el)
}

/**
 * 自定义指令
 * vue插件 必须要有install方法，在app.use()时会调用该方法
 * @param app
 */
const install = (app:APP) => {
    app.directive('resize', {
        mounted(el,binding) {
            useResize(el,binding.value)
        }
    })
}
// 将install 挂载到useResize上的install上
useResize.install = install
export default useResize