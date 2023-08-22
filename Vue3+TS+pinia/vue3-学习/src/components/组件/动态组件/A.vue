<script setup lang="ts">
/**
 * 动态组件，作用场景 tab切换（也可以用动态路由）
 * markRaw : 标记一个对象，使其永远不会成为响应式对象
 */
</script>

<template>
  <div class="com">
    我是A
  </div>
</template>

<style scoped>
.com{
  height: 300px;
  border: 2px solid #ccc;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
}
</style>