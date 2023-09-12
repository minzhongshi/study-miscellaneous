<script setup lang="ts">

</script>

<template>
  <div>这是主应用</div>
  <div class="wujie">
  <WujieVue :props="{name:'smz',age:18}" url="http://localhost:5174/" name="vue3"></WujieVue> 
  <WujieVue url="http://localhost:5175/" name="react"></WujieVue>
  </div>
</template>

<style scoped>
.wujie{
  display: flex;
  justify-content: center;
}
</style>
