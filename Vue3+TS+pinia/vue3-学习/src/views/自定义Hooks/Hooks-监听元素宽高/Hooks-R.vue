<script setup lang="ts">

import {onMounted} from "vue";
import useResize from "../../../hooks/useResize";
// 自定义Hooks
onMounted(()=>{
  useResize(document.querySelector('.box') as HTMLElement,(e:any)=>{
    console.log('自定义Hooks',e)
  })
})
// 自定义指令
const aaa = (e)=>{
  console.log('自定义指令',e)
}
</script>

<template>
<div v-resize="aaa" class="box"></div>
</template>

<style scoped>
.box{
  overflow: hidden;
  border: 2px solid black;
  resize: both;
  width: 300px;
  height: 300px;
}
</style>