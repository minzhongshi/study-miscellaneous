<script setup lang="ts">
defineProps(['todos'])
</script>

<template>
<div class="box">
<h1>作用域插槽</h1>
  <ul>
    <li v-for="(item,index) in todos" :key="item.id">
      <slot :row="item" :index="index"></slot>
    </li>
  </ul>
</div>
</template>

<style scoped>
.box{
  width: 100vw;
  height: 400px;
  background-color: hotpink;
}
</style>