/**
 * IntersectionObserver:监听元素与视口交叉的API
 * 返回一个监听集合，集合每一项有intersectionRatio表示在视口存在的比例
 */
export default {
    // @ts-ignore
     async mounted(el,binding){
         const def = await import('../../assets/vue.svg')
        el.src = def.default
         let ob = new IntersectionObserver((entries) => {
            if (entries[0].intersectionRatio >0){
                el.src = binding.valueOf()
                ob.unobserve(el)
            }
         })
        ob.observe(el)

    },
    unmounted(el){
    }
}