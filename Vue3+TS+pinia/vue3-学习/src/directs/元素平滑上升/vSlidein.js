const DISTANCE = 150 // 默认元素移动距离
const DURATION = 500 // 默认元素移动时间
const animationMap = new WeakMap() // 缓存动画
const ob = new IntersectionObserver((entries) => {
    for (const entry of entries) {
        const animation = animationMap.get(entry.target)
        if (entry.isIntersecting) {
            animation.play() // 播放动画
            ob.unobserve(entry.target) // 移除监听
        }
    }
})

// 判断元素是否在视口下方
function isBelowViewport(el,bind) {
    const rect = el.getBoundingClientRect()
    return rect.top > window.innerHeight
}

export default {
    mounted(el, binding) {
        if (!isBelowViewport(el,binding)) return // 判断元素是否在视口下方,一开始在视口中的元素不需要动画，只有在视口下面的元素才需要动画
        const animation = el.animate([
            // 关键帧
            {
            transform: `translateY(${binding.value?.skew ?? DISTANCE}px)`,
            opacity: 0.5
            },
            {
            transform: `translateY(0)`,
            opacity: 1
            },
        ],{
            duration: binding.value?.time ?? DURATION,
            fill: 'forwards',// 动画结束后保持最后的状态
            easing: 'ease-in-out' // 动画效果
        });
        animation.pause(); // 暂停动画
        ob.observe(el) // 监听元素
        animationMap.set(el, animation) // 缓存动画
    },
    unmounted(el) {
        ob.unobserve(el) // 移除监听
    }
}