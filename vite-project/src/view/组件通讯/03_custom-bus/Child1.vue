<script setup lang="ts">
import $bus from '../../../../../Vue3+TS+pinia/vue3-vite/src/bus'
import {onMounted} from "vue";
//组件挂载完成时，为荡秋千组件绑定一个事件，接收兄弟组件传递的数据
onMounted(()=>{
  //第一个参数：事件类型
  //第二个参数：事件回调
  $bus.on('car',(car)=>{
    console.log(car)
  })
  console.log($bus)
})
</script>

<template>
<div class="child1">我是子组件1</div>
</template>

<style scoped>
.child1{
  width: 300px;
  height: 300px;
  background: hotpink;
}
</style>