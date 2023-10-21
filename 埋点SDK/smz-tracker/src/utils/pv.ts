/**
 * hash:可以通过hashchange事件来监听hash变化，然后上报
 * history:可以通过popstate事件来监听history变化（前进后退历史记录），无法监听页面跳转pushState、replaceState
 *         需要重写pushState、replaceState方法，然后上报
 * @description: pv统计
 */
export const createHistoryEvent = <T extends keyof History>(type: T) => {
    const origin = history[type] // 保存原始方法
    return function (this:any) {
        const res = origin.apply(this, arguments) // 重写history的pushState、replaceState方法
        const e = new Event(type)// 创建自定义事件
        window.dispatchEvent(e)// 触发自定义事件
        return res
    }
}
