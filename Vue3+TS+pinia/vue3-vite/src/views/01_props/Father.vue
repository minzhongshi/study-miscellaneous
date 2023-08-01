<script setup lang="ts">
import Son from "./Son.vue";
import {ref} from "vue";
let money = ref<Number>(1000)
</script>

<template>
  <Son info="我是父组件" :money="money"/>
</template>

<style scoped>

</style>