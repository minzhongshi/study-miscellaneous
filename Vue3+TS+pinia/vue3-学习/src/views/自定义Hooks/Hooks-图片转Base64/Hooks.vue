<script setup lang="ts">
/**
 * 该Hooks是一个图片转Base64的函数
 */
import useBase64 from '../../../hooks/index'
useBase64({
  el: '#img'
}).then(res=>{
  console.log(res.baseUrl)
})
</script>

<template>
<div>
  <img id="img" width="300" height="300" src="./R-C.jpg" alt="">
</div>
</template>

<style scoped>

</style>