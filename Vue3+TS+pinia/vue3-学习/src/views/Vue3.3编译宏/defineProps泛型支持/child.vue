<script generic="T" setup lang="ts">
/**
 * Vue3.3对defineProps的改进
 * 新增泛型支持，在script标签添加generic="T“ 接收父组件传过来的类型
 */
defineProps<{
  name:T[]
}>()
</script>

<template>
<div>{{name}}</div>
</template>

<style scoped>

</style>