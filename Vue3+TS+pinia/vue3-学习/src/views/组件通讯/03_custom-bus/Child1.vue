<script setup lang="ts">
import {getCurrentInstance, onMounted, ref} from "vue";
const app = getCurrentInstance()
const cars = ref()
//组件挂载完成时，为当前组件绑定一个事件，接收兄弟组件传递的数据
onMounted(()=>{
  //第一个参数：事件类型
  //第二个参数：事件回调
  app?.proxy?.$bus.on('car',(car)=>{
    console.log(car)
    cars.value = car
  })
  console.log(app?.proxy?.$bus)
})
</script>

<template>
<div class="child1">我是子组件1
<div>{{cars}}</div>
</div>
</template>

<style scoped>
.child1{
  width: 300px;
  height: 300px;
  background: hotpink;
}
</style>