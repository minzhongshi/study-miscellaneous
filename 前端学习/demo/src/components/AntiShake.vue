<script setup>

import {debounceRef} from "../../../../Vue3+TS+pinia/vue3-学习/src/views/vue3_响应式/ref全家桶/customRef实现防抖/自定义ref实现防抖";
const text = debounceRef('', 1000);

</script>

<template>
  <div>
    <input style="width: 400px;height: 50px" v-model="text"/>
    <div style="width: 400px;height: 50px;border-bottom:2px solid #181818;line-height: 50px">{{text}}</div>
  </div>
</template>
