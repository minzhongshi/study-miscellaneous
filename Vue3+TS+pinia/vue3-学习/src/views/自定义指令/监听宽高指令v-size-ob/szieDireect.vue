<script setup lang="ts">
import {nextTick, ref} from "vue";

let width = ref()
let height = ref()
function handle(size){
  // 变化后的操作
    width.value = size.width
    height.value = size.height
}
</script>

<template>
  <div class="dir"  v-size-ob="handle">
    <p>宽度:{{width}}</p>
    <dl/>
    <p>高度:{{height}}</p>
  </div>
</template>

<style scoped>
.dir{
  border: #535bf2 1px solid;
  width: 100vmin;
  height: 100vmin;
}
</style>