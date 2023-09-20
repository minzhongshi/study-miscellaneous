<script setup lang="ts">

import Child from "./child.vue";
const getName = (name:string) => {
  console.log(name)
}
</script>

<template>
<div>
  <child @send="getName"></child>
</div>
</template>

<style scoped>

</style>