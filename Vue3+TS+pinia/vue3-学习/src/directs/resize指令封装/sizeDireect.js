/**
 * 全局绑定指令:
 *    在main.ts文件中添加以下代码
 *    app.directive('size-ob', sizeDireect)
 *  使用：
 *      在需要监听的标签上使用命令 v-size-ob="handle"，其中handle为回调函数，其中返回的参数为尺寸信息
 *       <div class="dir"  v-size-ob="handle">
 */

/**
 * @ResizeObserver 监听元素变化的API
 * @entries 元素变化的数组集合
 * @entry 每个被监听的元素 其中包含的属性有：
 *    borderBoxSize：边框盒尺寸
 *    contentBoxSize：内容盒尺寸
 *    contentRect:内容区域矩形信息 => DOMRectReadOnly {x: 0, y: 0, width: 3800, height: 3800, top: 0, …}
 *    devicePixelContentBoxSize:DPR尺寸
 *    target：哪一个元素发生变化
 */
const ob = new ResizeObserver((entries)=>{
    for (const entry of entries) {
        // 获取dom元素的回调
        const handler = map.get(entry.target)
        //存在回调函数
        if (handler){
            // 将监听的值给回调函数
            handler({
                width: entry.borderBoxSize[0].inlineSize,
                height: entry.borderBoxSize[0].blockSize
            })
        }
    }
})
/**
 * map:存储dom与回调函数的映射关系
 * 使用WeakMap，防止内存溢出
 */
const map = new WeakMap();
/**
 * el:监听的dom元素
 * binding: 回调事件
 */
export default {
    mounted(el,binding) {
        //将dom与回调的关系塞入map
        map.set(el,binding.value)
        //监听el元素的变化
        ob.observe(el)
    },
    unmounted(el) {
        //取消监听
        ob.unobserve(el)
    }
}