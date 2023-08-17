<script setup lang="ts">
//接收
// const emit = defineEmits(['click'])
//TS语法
const emit = defineEmits<{
  (e:"click",name:string):void
}>()
//向父组件传值
const handler =()=>{
  emit('click','向父组件传值1')
}
</script>

<template>
<div class="event1">我是子组件1</div>
  <button @click="handler">点击触发自定义事件</button>
</template>

<style scoped>
.event1{
  width: 200px;
  height: 200px;
  background: red;
}
</style>