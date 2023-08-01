<script setup>

import {debounceRef} from "./js/自定义ref实现防抖";
const text = debounceRef('', 1000);
</script>

<template>
  <div>
    <input v-model="text"/>
    <p>{{text}}</p>
  </div>
</template>
