<script setup lang="ts">

</script>

<template>
<div class="box">
  <h1>我是子组件默认插槽</h1>
  <slot></slot>
  <h1>我是子组件默认插槽</h1>
  <h1>我是子组件具名插槽</h1>
  <slot name="a"></slot>
  <h1>我是子组件具名插槽</h1>
</div>
</template>

<style scoped>
.box{
  width: 100vw;
  height: 400px;
  background-color: skyblue;
}
</style>