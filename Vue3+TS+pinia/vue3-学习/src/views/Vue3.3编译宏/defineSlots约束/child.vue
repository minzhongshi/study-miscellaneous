<script setup lang="ts" generic="T">
import {defineModel} from "vue";

/**
 * 使用 defineSlots 自己定义插槽的类型,约束slot
 */
defineProps<{
  data: T[]
}>()

defineSlots<{
  default(props: { item: T ,index:number}): any
}>()
</script>

<template>
<div v-for="(item,index) in data">
  <slot :item="item" :index="index"></slot>
</div>
</template>

<style scoped>

</style>