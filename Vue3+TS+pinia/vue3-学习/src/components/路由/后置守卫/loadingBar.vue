<template>
<div class="wraps">
  <div ref="bar" class="bar"></div>
</div>
</template>

<script setup lang="ts">
/**
 * requestAnimationFrame:
 *       这里使用该定时器的原因在于采用系统时间，和setTimeout和setInterval不精确，
 *       会导致动画卡顿或者过度绘制，该定时器会将回流与重绘收集起来一起执行。以60帧来渲染
 */
import {ref,onMounted} from 'vue'
// 进度
let speed =ref<number>(1)
let bar = ref<HTMLElement>()
let timer = ref<number>(0)


// 开始加载
const startLoading = () =>{
  speed.value = 0
  let dom = bar.value as HTMLElement
  timer.value = window.requestAnimationFrame(function fn() {
    if (speed.value < 90){
      speed.value +=0.5
      dom.style.width = speed.value + '%'
      timer.value = window.requestAnimationFrame(fn)
    }else {
      // 清除定时器
      speed.value = 0
      window.cancelAnimationFrame(timer.value)
    }
  })
}

// 结束加载
const endLoading= () =>{
  let dom = bar.value as HTMLElement;
  setTimeout(()=>{
    timer.value =  window.requestAnimationFrame(()=>{
      speed.value = 100
      dom.style.width = speed.value + '%'
    })
  },2000)
}

defineExpose({
  startLoading,
  endLoading
})
onMounted(()=>{
  startLoading()
  endLoading()
})


</script>

<style lang="less" scoped>
.wraps{
  position: fixed;
  top: 0;
  width: 100%;
  height: 3px;
  .bar{
    height: inherit;
    width: 0%;
    background: blue;
  }
}
</style>