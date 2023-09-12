<script setup lang="ts">

import {
  getCurrentInstance,
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  onRenderTracked,
  onRenderTriggered,
  onUnmounted,
  onUpdated
} from "vue";

/**
 * 在Vue3 的生命周期中 beforeCreate 和 created setup语法糖模式是没有的 用setup代替
 * onBeforeMount读不到dom onMounted可以
 * onBeforeUpdate获取的是更新之前的dom onUpdated是更新之后的
 * onRenderTracked 和 onRenderTriggered 用于调试依赖的收集与更新
 * getCurrentInstance 获取当前组件实例
 * 源码位置：core/packages/runtime-core/src/apiLifecycle.ts
 */
const instace = getCurrentInstance()
console.log(instace)
// 创建前
onBeforeMount(()=>{
  console.log('创建前====>')
})
//创建完成
onMounted(()=>{
  console.log('创建完成====>')
})
//更新前
onBeforeUpdate(()=>{
  console.log('更新组件之前====>')
})
//更新完成
onUpdated(()=>{
  console.log('更新组件完成====>')
})
//卸载前
onBeforeUnmount(()=>{
  console.log('销毁之前====>')
})
//卸载后
onUnmounted(()=>{
  console.log('销毁完成====>')
})
//收集依赖
onRenderTracked((e)=>{
  console.log(e)
})
//触发依赖更新
onRenderTriggered((e)=>{
  console.log(e)
})
</script>

<template>

</template>

<style scoped>

</style>
