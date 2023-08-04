<script setup>

import {debounceRef} from "./自定义ref实现防抖.js";
const text = debounceRef('', 1000);
</script>

<template>
  <h3>-------------自定义ref实现防抖---------------</h3>
  <div>
    <input v-model="text"/>
    <p>{{text}}</p>
  </div>
</template>
