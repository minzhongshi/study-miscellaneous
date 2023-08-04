<script setup lang="ts">
//ref:获取真实DOM结点，可以获取到子组件实例VC
//$parent:可以在子组件内部获取到父组件的实例
import {ref} from 'vue'
import Son from "./Son.vue";
import Daughter from "./Daughter.vue";
let money = ref(100000000)
//获取子组件实例
let son = ref()
const handler = () => {
  money.value+=10;
  console.log(son)
  //操作子组件数据
  son.value.money-=10
  son.value.fly()
}
//对外暴露
defineExpose({
  money
})

</script>

<template>
<div class="box">
  <h1>ref与$parent</h1>
  <h2>我是父组件:{{money}}</h2>
  <button @click="handler">增加父组件数值减少子组件数值</button>
  <hr>
<!--  ref形式-->
  <Son ref="son"/>
  <hr>
<!--  $parent形式-->
  <Daughter />
</div>
</template>

<style scoped>
.box{
  width: 100vw;
  height: 500px;
  background: skyblue;
}
</style>