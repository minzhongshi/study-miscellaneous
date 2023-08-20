<script setup lang="ts">

import GrandChild from "./GrandChild.vue";
</script>

<template>
  <div class="child">
    <h1>我是子组件1</h1>
    <hr>
    <GrandChild/>
  </div>
</template>

<style scoped>
.child{
  width: 300px;
  height: 400px;
  background-color: yellowgreen;
}
</style>