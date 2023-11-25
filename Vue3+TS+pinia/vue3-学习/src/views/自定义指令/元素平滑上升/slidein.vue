<template>
  <div class="container">
    <div v-slide-in="{skew:300,time:1000}" v-for="n in 5" class="item">
      {{n}}
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.container{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.item{
  width: 80vw;
  height: 40vh;
  text-align: center;
  line-height: 40vh;
  font-size: 50px;
  margin: 100px;
}
.item:nth-child(odd){
  background-color: #FFB52A;
}
.item:nth-child(even){
  background-color: #229342;
}
</style>