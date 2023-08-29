<script setup lang="ts">
import {inject} from "vue";
let cars = inject<string>('TOKEN')
console.log(cars)
const hander=()=>{
  cars[0].car = '奔驰'
}
</script>

<template>
  <div class="child2">
    <h1>孙子组件</h1>
    <p v-for="item of cars">{{item.car}}</p>
    <button @click="hander">改变</button>
  </div>
</template>

<style scoped>
.child2{
  width: 200px;
  height: 200px;
  background-color: red;
}
</style>