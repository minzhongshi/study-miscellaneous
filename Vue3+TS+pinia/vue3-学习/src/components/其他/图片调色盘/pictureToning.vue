<template>
<div class="grid">
  <div class="item" v-for="(url,i) in images">
    <img
        crossorigin="anonymous"
        @mouseenter="handleMouseEnter($event.target,i)"
        @mouseleave="handleMouseLeave"
        src="url"
        alt=""
        :style="{
      opacity:hoverIndex === -1 ? 1 : i ===
      hoverIndex ?1: 0.2
        }"
    >
  </div>
</div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const images = []
for (let i =1 ; i<=4; i++){
  images.push(`https://picsum.photos/800/800?r=${i}`)
}
const hoverIndex = ref(-1)
async function handleMouseEnter(img,i){
  hoverIndex.value = i
}
function handleMouseLeave() {
  hoverIndex.value = -1
}
</script>

<style scoped>
.grid{
  width: 80%;
  height: 80vh;
  
}
</style>