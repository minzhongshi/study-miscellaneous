<script setup lang="ts">
import {ref} from "vue";

let money = ref(2000)
//事件回调传入参数 $parent 来获取父组件实例
//父组件必须将数据对外暴露
const handler = ($parent) => {
  money.value+=1000
  console.log($parent)
  //操作父组件数据
  $parent.money-=1000
}
</script>

<template>
<div class="dau">
  <h1>我是子组件2</h1>
  <button @click="handler($parent)">我是子组件2按钮</button>
</div>
</template>

<style scoped>
.dau{
  width: 300px;
  height: 300px;
  background: hotpink;
}
</style>