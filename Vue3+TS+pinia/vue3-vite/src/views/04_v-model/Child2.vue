<script setup lang="ts">
import { defineModel } from 'vue'
let No = defineModel()

// 接收参数
let props = defineProps(['pageNo','pageSize'])
let page = defineEmits(['update:pageNo','update:pageSize'])

// 子组件回调传值
const headler = () => {
  page("update:pageNo",props.pageNo +6)
  page("update:pageSize",props.pageSize +6)
}
</script>

<template>
  <div class="child2">
    <p>同时绑定多个v-model</p>
    <div>{{props.pageNo}}</div>
    <div>{{props.pageSize}}</div>
    <Button @click="headler"></Button>
  </div>
  <div></div>
</template>

<style scoped>
.child2{
  width: 300px;
  height: 300px;
  background: #535bf2;
}
</style>