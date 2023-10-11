<template>
  <div id="box">
    <div class="grid">
      <div class="item" v-for="(url,i) in images">
        <img
            crossorigin="anonymous"
            @mouseenter="handleMouseEnter($event.target,i)"
            @mouseleave="handleMouseLeave"
            :src="url"
            :style="{
      opacity: hoverIndex === -1 ? 1 : i ===
      hoverIndex ? 1 : 0.2
        }"
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import ColorThief from "colorthief";
const colorThief = new ColorThief()
const html = document.documentElement;

const images = []
for (let i =1 ; i<=4; i++){
  images.push(`https://picsum.photos/800/800?r=${i}`)
}

const hoverIndex = ref(-1)
async function handleMouseEnter(img,i){
  const box = document.getElementById('box')
  hoverIndex.value = i
  const colors = await colorThief.getPalette(img,3)
  colors.map((c)=> `rgb(${c[0]},${c[1]},${c[2]})`)
  box.setAttribute('style',`background :linear-gradient(rgb(${colors[0]}),rgb(${colors[1]}),rgb(${colors[2]}))`)
}
function handleMouseLeave() {
  hoverIndex.value = -1
  box.setAttribute('style',`background : #fff`)
}
</script>

<style scoped>
#box{
  position : absolute;
  width: 100%;
  height: 150%;
}
.grid{
  width: 70%;
  height: 60vh;
  margin: 50px auto;
  display: grid;
  grid-template-columns: repeat(2,1fr);
}
.item{

  height: 800px;
  width: 800px;
  padding: 20px;
  transition: all 0.6s;
}
.item:hover{
  border: 4px solid #72767b;
  transform: scale(1.2);
}
</style>