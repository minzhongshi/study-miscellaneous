<template>
  <input type="text" v-model="msg">
</template>
<script setup>
import { defineModel } from 'vue'
let msg = defineModel('msg')
</script>


<style scoped>

</style>