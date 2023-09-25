<script setup lang="ts">
import userInfoStore from "../../../store/modules/info";

let infoStore = userInfoStore()
const updateCount=()=>{
  // infoStore.count++
  // infoStore.$patch({
  //   count:222
  // })
  infoStore.updateNum(2,4)
}
</script>

<template>
<div class="child">
<h1>{{ infoStore.count }}</h1>
  <button @click="updateCount">修改仓库数据</button>
</div>
</template>

<style scoped>
.child{
  width: 200px;
  height: 200px;
  background-color: yellowgreen;
}
</style>