<script setup lang="ts">
/**
 * <Transition>为组件或者元素提供动画过度效果，内部提供了6个过度类，用name属性定义类前缀
 *    1、fade-enter-from:显示过度开始前
 *    2、fade-enter-active：变化曲线
 *    3、fade-enter-to：显示过度结束（与最终保持，或不写）
 *    4、fade-leave-from: 消失过度开始
 *    5、fade-leave-active：变化曲线
 *    6、fade-leave-to：消失过度结束
 *
 * transition(css3动画变化样式属性)
 *   使用：transition all 1.5s ease
 *   all 表示全部样式
 *   1.5 表示时间
 *   ease 表示变化曲线
 *
 * 自定义lass类名
 *   在模板中使用短横线命名，例如：enter-from-class="xxx"
 *   enterFromClass?: string
 *   enterActiveClass?: string
 *   enterToClass?: string
 *   appearFromClass?: string
 *   appearActiveClass?: string
 *   appearToClass?: string
 *   leaveFromClass?: string
 *   leaveActiveClass?: string
 *   leaveToClass?: string
 *  搭配 animate.css 动画库可以快速实现动画
 *     animate.css 4版本需要添加前缀“animate__animated xxx”
 *   注：animation.css如果不生效可以看看“系统轻松使用”是否打开“在Windows中显示动画”
 */

/**
 * name?: string
 * 用于自动生成过渡 CSS class 名。
 * 例如 `name: 'fade'` 将自动扩展为 `.fade-enter`、
 * `.fade-enter-active` 等。
 */

/**
 * css?: boolean
 * 是否应用 CSS 过渡 class。
 * 默认：true
 */

/**
 * type?: 'transition' | 'animation'
 * 指定要等待的过渡事件类型
 * 来确定过渡结束的时间。
 * 默认情况下会自动检测
 * 持续时间较长的类型。
 */

/**
 * duration?: number | { enter: number; leave: number }
 * 显式指定过渡的持续时间。
 * 默认情况下是等待过渡效果的根元素的第一个 `transitionend`
 * 或`animationend`事件。
 */

/**
 * mode?: 'in-out' | 'out-in' | 'default'
 * 控制离开/进入过渡的时序。
 * 默认情况下是同时的。
 */

/**
 * appear?: boolean
 * 是否对初始渲染使用过渡。
 * 默认：false
 */

/**
 * <Transition>有11个事件
 * @before-enter 执行前
 * @before-leave
 * @enter 添加曲线
 * @leave
 * @appear
 * @after-enter 执行结束
 * @after-leave 页面关闭时
 * @after-appear 页面加载完成时
 * @enter-cancelled 执行被打断
 * @leave-cancelled (v-show only)
 * @appear-cancelled
 */

import {ref} from "vue";
import 'animate.css'
const flag = ref<boolean>(true)
const EnterFrom = (el:Element) =>{
  console.log("进入前")
}
const EnterActive = (el:Element,done) =>{
  console.log("过度曲线")
  setTimeout(()=>{
    done()
  },3000)
}
const EnterTo = (el:Element) =>{
  console.log("过度完成")
}
const EnterCance = (el:Element) =>{
  console.log("过渡效果被打断被打断")
}
</script>

<template>
  <div>
    <button @click="flag = !flag">switch</button>
    <transition
        :duration="{enter: 5000, leave: 5000}"
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
        @before-enter="EnterFrom"
        @enter="EnterActive"
        @after-enter="EnterTo"
        @enter-cancelled="EnterCance"
    >
      <div v-if="flag" class="box"></div>
    </transition>
  </div>
</template>

<style scoped>
.box{
  width: 200px;
  height: 200px;
  background-color: cyan;
}
</style>