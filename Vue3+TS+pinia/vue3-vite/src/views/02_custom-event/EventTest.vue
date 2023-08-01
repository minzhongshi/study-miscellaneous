<script setup lang="ts">
import Event1 from "./Event1.vue";
import Event2 from "./Event2.vue";

const handler2 = (event) => {
  //event为事件对象
  console.log(event)
}

const handler3 = (param) => {
  console.log('接收到子组件1的值:'+param)
}
const handler4 = (param) => {
  console.log('接收到子组件2的值:'+param)
}
</script>

<!--在vue2中在子组件添加原生事件时默认为自定义事件，需要通过.native修饰符变为原生DOM事件-->
<!--在Vue3中组件添加原生事件时为原生事件,当子组件绑定时变为自定义事件-->
<template>
  <div>
    <h1>事件</h1>
    <pre @click="handler2">
      点击原生事件event
    </pre>
  </div>

  <hr>
  <Event1 @click="handler3"/>
  <hr>
  <Event2 @event2="handler4"/>
</template>

<style scoped>

</style>