<script setup lang="ts">

</script>

<template>
  <div class="sk">
    <div class="sk-2">
      <div class="sk-2-1"></div>
      <div></div>
    </div>
    <hr>
    <div class="sk-3"></div>
    <div class="sk-3"></div>
  </div>
</template>

<style lang="less" scoped>
@bgColor: #eee;
@conColor: #ccc;
.sk {
  background-color: @bgColor;
  width: 60%;
  height: 300px;
  margin: auto;
  padding: 20px;
  .sk-2 {
    display: flex;
    height: 100px;
    width: 2000px;
    align-items: center;
    .sk-2-1 {
      margin-left: 10px;
      border-radius: 50%;
      width: 5%;
      height: 100%;
      background-color: @conColor;
    }
    div {
      width: 10%;
      height: 20px;
      margin-left: 10px;
      background-color: @conColor;
    }
  }
  .sk-3 {
    margin-top: 10px;
    width: 100%;
    height: 30px;
    background-color: @conColor;
  }
}
</style>