<script setup lang="ts">

import Child1 from "./Child1.vue";
import Child2 from "./Child2.vue";
</script>

<!--在Vue3中没有全局事件总线，可通过插件mitt来实现全局总线事件-->

<template>
  <div class="box">
    <h1>全局事件总线$bus事件</h1>
    <div class="box2">
      <Child1/>
      <child2/>
    </div>

  </div>

</template>

<style  scoped>
.box {
  width: 100vw;
  height: 400px;
background: yellowgreen;
}
.box2{
  display: flex;
  justify-content: space-between;
}
</style>