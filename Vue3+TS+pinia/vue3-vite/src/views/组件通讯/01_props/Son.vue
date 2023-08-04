<script setup lang="ts">
//需要用defineProps方法接收父组件传递的数据
//该方法不用引入，为Vue3自带，直接使用
//通过props获取的数据是代理对象
//props的数据是只读的，不可修改
let props = defineProps(['info','money'])
console.log(props)
</script>

<template>
  <div>
    <p>{{info}}</p>
    <p>{{money}}</p>
  </div>
</template>

<style scoped>

</style>