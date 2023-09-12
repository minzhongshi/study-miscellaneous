<script setup lang="ts">
let imageList: Record<string,{default: string}> = import.meta.glob('../../../assets/images/*.*',{eager:true})
let arr = Object.values(imageList).map(v=>v.default)
console.log(arr)
</script>

<template>
  <div>
    <div  >
      <img width="360" height="500" v-for="item of arr" v-lazy-ob="item" alt="">
    </div>

  </div>

</template>

<style scoped>

</style>