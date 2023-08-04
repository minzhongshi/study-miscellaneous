<template>
  <div>
    <div>
      {{msg}}
    </div>
    <div>
      {{pageNo}}
    </div>
   <div>
     {{pageSize}}
   </div>
  </div>
  <Child1 v-model="msg"/>
  <Child2 v-model:pageNo="pageNo" v-model:pageSize="pageSize"/>
</template>

<script setup>
import { ref } from 'vue'
import Child1 from "./Child1.vue";
import Child2 from "./Child2.vue";
// 第一次父组件传给子组件1的值
const msg =ref(4)

//传给子组件2的数据
let pageNo = ref(1);
let pageSize = ref(3)
</script>


<style  scoped>
</style>