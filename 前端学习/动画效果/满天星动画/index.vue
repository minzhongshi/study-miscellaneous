<script setup>
import {computed} from 'vue'
const nums = computed(() => {
  return Math.floor(window.innerWidth / 10)
})
</script>

<template>
<div class="star">
  <div class="dot"
  v-for="item in nums"
       :key="item"
       :style="`--delay:${Math.random() * 2}s;
       --color:hsl(${Math.random()*360},50%,50%)`"
  ></div>
</div>
</template>

<style lang="scss" scoped>
.star {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: #000;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.dot {
  width: 5px;
  height: 5px;
  background-color: var(--color);
  border-radius: 50%;
  animation: up 2s ease-in infinite;
  animation-delay: var(--delay);
}
@keyframes up {
  to{
    transform: translateY(-100vh);
  }
}
</style>