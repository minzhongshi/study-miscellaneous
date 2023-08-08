/**
 * Flux架构模式 核心理念是：单项数据流
 * 应用：状态管理=> Redux VueX Pinia
 * 全局Store存储所有状态
 * 在VeuX中 Store是一个单一状态树  state是单一数据源
 */

/**
 * 在VueX Store的constructor中并没有有关单例的判断 可以通过new关键字创建多个Store实例
 * 这是因为VueX在整体设计上保证了Store在同一个Vue应用的唯一性
 * 在VueX中实现了install方法，在插件安装时触发该方法，将Store注入到Vue应用中。
 * 在install方法中，会判断Vue实例是否已经安装过插件（是否有了唯一的store）
 * 这就让Store实现了单一性
 * applyMixin(Vue)触发时在 beforeCreate 生命周期钩子中，将 Store 实例通过vuexInit()方法挂载到 Vue 实例上
 *
 */
let Vue
export function install (_Vue) {
    // 判断传入的Vue实例对象是否已经被install过Vuex插件（是否有了唯一的 store）
    if (Vue && _Vue === Vue) {
        if (process.env.NODE_ENV !== 'production') {
            console.error(
                '[vuex] already installed. Vue.use(Vuex) should be called only once.'
            )
        }
        return
    }
    // 若没有，则为这个Vue实例对象install一个唯一的Vuex
    Vue = _Vue
    // 将Vuex的初始化逻辑写进Vue的钩子函数里
    applyMixin(Vue)
}

/**
 * vuexInit ()方法
 * 让子组件访问到同一个Store实例（根组件Store实例）
 */
function vuexInit () {
    const options = this.$options
    // 将 store 实例挂载到 Vue 实例上
    if (options.store) { // 根组件
        this.$store = typeof options.store === 'function'
            ? options.store()
            : options.store
    } else if (options.parent && options.parent.$store) { //当子组件实例不存在store 并且父组件存在且有$store属性
        this.$store = options.parent.$store //继承父组件Store
    }
}

