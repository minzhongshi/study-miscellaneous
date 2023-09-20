<script setup lang="ts">

import Child from "./child.vue";
</script>

<template>
<div>
  <Child :name="[3]"></Child>
</div>
</template>

<style scoped>

</style>