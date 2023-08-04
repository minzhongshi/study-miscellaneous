<script setup lang="ts">
import $bus from "../../../../../Vue3+TS+pinia/vue3-vite/src/bus";
const handler = () => {
  $bus.emit('car',{car:"法拉利"})
}
</script>

<template>
  <div class="child2">
    <p>我是子组件2</p>
    <button @click="handler">点击给兄弟组件1传值</button>
  </div>
  <div></div>
</template>

<style scoped>
.child2{
  width: 300px;
  height: 300px;
  background: #535bf2;
}
</style>