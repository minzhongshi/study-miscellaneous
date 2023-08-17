Event1.vue<script setup lang="ts">

//利用defineEmits方法返回函数触发自定义事件
//该方法不需要引入
// let emit = defineEmits(['event2']);
//TS语法
const emit = defineEmits<{
  (e:"event2",name:string):void
}>()
const handler = () => {
  emit('event2','传给父组件2')
}
</script>

<template>
  <div class="event2">我是子组件2</div>
  <button @click="handler">点击触发自定义事件</button>
</template>

<style scoped>
.event2{
  width: 200px;
  height: 200px;
  background: #535bf2;
}
</style>