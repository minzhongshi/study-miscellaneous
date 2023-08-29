<script setup lang="ts">
/**
 * GreenSock动画库
 *   使用：
 *
 */
import {ref} from "vue";
import gsap from "gsap"
const flag = ref<boolean>(true)
const EnterFrom = (el:Element) =>{
  gsap.set(el,{
    width:0,
    height:0
  })
}
const EnterActive = (el:Element,done:gsap.Callback) =>{
  gsap.to(el,{
    width:200,
    height:200,
    onComplete:done
  })
}
const Leave = (el:Element,done:gsap.Callback) =>{
  gsap.to(el,{
    width:0,
    height:0,
    onComplete:done
  })
}
</script>

<template>
  <div>
    <button @click="flag = !flag">GreenSock</button>
    <transition
        @before-enter="EnterFrom"
        @enter="EnterActive"
        @leave="Leave"
    >
      <div v-if="flag" class="box"></div>
    </transition>
  </div>
</template>

<style scoped>
.box{
  width: 200px;
  height: 200px;
  background-color: cyan;
}
</style>