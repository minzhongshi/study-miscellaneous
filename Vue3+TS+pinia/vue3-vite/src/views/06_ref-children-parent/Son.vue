<script setup lang="ts">
import {ref} from "vue";

let money = ref(666)

const fly = ()=>{
  console.log('我是子内部组件方法')
}
//组件内部数据对外是关闭的，其他组件不能访问
//如果想让外部访问需要通过defineExpose方法对外暴露
defineExpose({
  money,
  fly
})
</script>

<template>
<div class="son">
<h2>我是子组件:{{money}}</h2>
</div>
</template>

<style scoped>
.son{
  width: 300px;
  height: 200px;
  background: cyan;
}
</style>