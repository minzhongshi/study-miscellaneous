<script setup lang="ts">

import Child from "./child.vue";
</script>

<template>
<child :data="[1,2,3]">
  <template #default="{item,index}">{{item}}</template>
</child>
</template>

<style scoped>

</style>